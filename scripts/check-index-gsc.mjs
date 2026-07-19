#!/usr/bin/env node
/**
 * 用 Google Search Console URL Inspection API 批量检查 sitemap URL 的索引状态。
 *
 * 用法:
 *   node scripts/check-index-gsc.mjs \
 *     --credentials /path/to/client_secret.json \
 *     [--urls scripts/out/sitemap-urls-0719.txt] \
 *     [--site "https://aiastrum.com/"] \
 *     [--out scripts/out/index-check-0719.csv]
 *
 * 首次运行会打开浏览器完成 OAuth 授权，token 缓存在 scripts/out/gsc-token.json。
 * 支持断点续跑：已写入输出 CSV 的 URL 会被跳过。
 */
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, appendFileSync, existsSync } from 'node:fs';
import { exec } from 'node:child_process';
import { google } from 'googleapis';

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const CREDENTIALS = arg('credentials', 'scripts/out/gsc-credentials.json');
const URLS_FILE = arg('urls', 'scripts/out/sitemap-urls-0719.txt');
const SITE = arg('site', 'https://aiastrum.com/');
const OUT = arg('out', 'scripts/out/index-check-0719.csv');
const TOKEN_PATH = 'scripts/out/gsc-token.json';
const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly'];
const DELAY_MS = 150; // URL Inspection API 限额约 600 次/分钟、2000 次/天

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function authorize() {
  const raw = JSON.parse(readFileSync(CREDENTIALS, 'utf8'));
  const conf = raw.installed || raw.web;
  if (!conf) throw new Error('凭据 JSON 中缺少 installed/web 配置');
  const oAuth2 = new google.auth.OAuth2(conf.client_id, conf.client_secret);

  if (existsSync(TOKEN_PATH)) {
    oAuth2.setCredentials(JSON.parse(readFileSync(TOKEN_PATH, 'utf8')));
    return oAuth2;
  }

  // 本地回跳服务器接收授权码
  const code = await new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const u = new URL(req.url, 'http://localhost');
      const c = u.searchParams.get('code');
      if (c) {
        res.end('授权成功，可以关闭此页面。');
        server.close();
        resolve(c);
      } else {
        res.end('缺少 code 参数');
      }
    });
    server.listen(5309, '127.0.0.1', () => {
      oAuth2.redirectUri = 'http://127.0.0.1:5309';
      const url = oAuth2.generateAuthUrl({ access_type: 'offline', scope: SCOPES, prompt: 'consent' });
      console.log(`打开浏览器完成授权:\n${url}`);
      exec(`open "${url}"`);
    });
    setTimeout(() => { server.close(); reject(new Error('授权超时')); }, 15 * 60 * 1000);
  });

  const { tokens } = await oAuth2.getToken(code);
  oAuth2.setCredentials(tokens);
  writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
  return oAuth2;
}

async function inspect(auth, url) {
  const searchconsole = google.searchconsole({ version: 'v1', auth });
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await searchconsole.urlInspection.index.inspect({
        requestBody: { inspectionUrl: url, siteUrl: SITE, languageCode: 'zh-CN' },
      });
      const r = res.data.inspectionResult;
      const idx = r.indexStatusResult || {};
      return {
        verdict: idx.verdict || '',
        coverageState: idx.coverageState || '',
        indexingState: idx.indexingState || '',
        lastCrawlTime: idx.lastCrawlTime || '',
        googleCanonical: idx.googleCanonical || '',
        error: '',
      };
    } catch (e) {
      const status = e.code || e.response?.status;
      if (status === 429 || (status >= 500 && status < 600)) {
        const wait = 5000 * (attempt + 1);
        console.log(`  限流/服务器错误 (${status})，${wait / 1000}s 后重试…`);
        await sleep(wait);
        continue;
      }
      return { verdict: 'ERROR', coverageState: '', indexingState: '', lastCrawlTime: '', googleCanonical: '', error: `${status} ${e.message}`.slice(0, 200) };
    }
  }
  return { verdict: 'ERROR', coverageState: '', indexingState: '', lastCrawlTime: '', googleCanonical: '', error: '重试多次仍被限流' };
}

const csvEscape = (v) => `"${String(v).replaceAll('"', '""')}"`;

async function main() {
  const urls = readFileSync(URLS_FILE, 'utf8').split('\n').map((s) => s.trim()).filter(Boolean);
  const done = new Set();
  if (existsSync(OUT)) {
    for (const line of readFileSync(OUT, 'utf8').split('\n').slice(1)) {
      const m = line.match(/^"((?:[^"]|"")*)"/);
      if (m) done.add(m[1].replaceAll('""', '"'));
    }
  } else {
    writeFileSync(OUT, 'url,verdict,coverageState,indexingState,lastCrawlTime,googleCanonical,error\n');
  }

  const todo = urls.filter((u) => !done.has(u));
  console.log(`共 ${urls.length} 个 URL，已完成 ${done.size} 个，本次检查 ${todo.length} 个`);

  const auth = await authorize();
  const CONCURRENCY = 6;
  let n = 0;
  let idx = 0;
  async function worker() {
    while (idx < todo.length) {
      const url = todo[idx++];
      const r = await inspect(auth, url);
      appendFileSync(OUT, [url, r.verdict, r.coverageState, r.indexingState, r.lastCrawlTime, r.googleCanonical, r.error].map(csvEscape).join(',') + '\n');
      n++;
      if (n % 50 === 0) console.log(`进度 ${n}/${todo.length}`);
      await sleep(DELAY_MS);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`完成，结果写入 ${OUT}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
