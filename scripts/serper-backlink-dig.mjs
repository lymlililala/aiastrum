/**
 * serper-backlink-dig.mjs
 * 用 Serper API 挖掘竞对的提及页/外链来源（Google SERP 级，非外链索引）。
 * 用法：node scripts/serper-backlink-dig.mjs
 * 输出：gsc/0719/competitor-backlinks-serper-0719.{json,md}
 */
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../gsc/0719");

// 读取 .env 中的 SERPER_API_KEY（不依赖 dotenv）
const envText = (await import("node:fs")).readFileSync(resolve(__dirname, "../.env"), "utf8");
const KEY = envText.match(/^SERPER_API_KEY=(.+)$/m)?.[1]?.trim();
if (!KEY) { console.error("SERPER_API_KEY not found in .env"); process.exit(1); }

const COMPETITORS = [
  { domain: "tarotap.com", zh: false },
  { domain: "tarotoo.com", zh: false },
  { domain: "tianjiyao.com", zh: true },
  { domain: "lingyuan.ai", zh: true },
  { domain: "astro-seek.com", zh: false },
  { domain: "cafeastrology.com", zh: false },
  { domain: "costarastrology.com", zh: false },
  { domain: "asknebula.com", zh: false },
  { domain: "labyrinthos.co", zh: false },
  { domain: "tarot.com", zh: false },
];

const PAGES_PER_QUERY = 2; // 每查询拉 2 页 × 100 条

async function serper(q, { zh = false, page = 1 } = {}) {
  const res = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: { "X-API-KEY": KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      q,
      num: 100,
      page,
      ...(zh ? { gl: "cn", hl: "zh-cn" } : { gl: "us", hl: "en" }),
    }),
  });
  if (!res.ok) throw new Error(`serper ${res.status}: ${await res.text()}`);
  return res.json();
}

function classify(url, title = "", snippet = "") {
  const s = `${url} ${title} ${snippet}`.toLowerCase();
  if (/reddit\.com|quora\.com|zhihu\.com|douban\.com|v2ex|forum|tieba|discourse/.test(s)) return "社区/论坛";
  if (/review|评测|测评|alternatives|替代品|vs-|comparison|对比/.test(s)) return "评测/对比";
  if (/directory|导航|submit|收录|tools?\b|工具|awesome/.test(s)) return "目录/导航";
  if (/best|top-|排行|榜单|推荐|list/.test(s)) return "榜单/推荐";
  if (/news|pr|release|新闻|资讯/.test(s)) return "新闻/软文";
  if (/blog|博客|article|文章/.test(s)) return "博客/文章";
  return "其他";
}

const results = {}; // domain -> Map(pageUrl -> {title, snippet, type, query})
let credits = 0;

for (const { domain, zh } of COMPETITORS) {
  // 免费账户不允许引号/-site: 等高级语法，改用裸词查询，竞对自有域名在结果处理时过滤
  const name = domain.replace(/\.(com|co|ai|net|org)$/, "");
  const queries = zh
    ? [domain, `${name} 推荐`, `${name} 收录 导航`, `${name} 评测`]
    : [domain, `${name} review`, `${name} alternatives`, `sites like ${domain}`];
  const pages = new Map();
  for (const q of queries) {
    for (let page = 1; page <= PAGES_PER_QUERY; page++) {
      try {
        const data = await serper(q, { zh, page });
        credits++;
        for (const item of data.organic ?? []) {
          if (!item.link || item.link.includes(domain)) continue;
          if (!pages.has(item.link)) {
            pages.set(item.link, {
              title: item.title ?? "",
              snippet: item.snippet ?? "",
              type: classify(item.link, item.title, item.snippet),
              query: q,
            });
          }
        }
      } catch (e) {
        console.error(`[${domain}] query failed: ${e.message}`);
      }
    }
  }
  results[domain] = pages;
  console.log(`${domain}: ${pages.size} pages`);
}

// 按引用域名去重汇总
const byRefDomain = new Map(); // refDomain -> {urls: [], linksTo: Set, types: Set}
for (const [comp, pages] of Object.entries(results)) {
  for (const [url, meta] of pages) {
    let ref;
    try { ref = new URL(url).hostname.replace(/^www\./, ""); } catch { continue; }
    if (!byRefDomain.has(ref)) byRefDomain.set(ref, { urls: [], linksTo: new Set(), types: new Set(), sample: url });
    const entry = byRefDomain.get(ref);
    entry.urls.push(url);
    entry.linksTo.add(comp);
    entry.types.add(meta.type);
  }
}

const sorted = [...byRefDomain.entries()]
  .map(([ref, e]) => ({
    refDomain: ref,
    sampleUrl: e.sample,
    urlCount: e.urls.length,
    linksTo: [...e.linksTo],
    types: [...e.types],
  }))
  .sort((a, b) => b.linksTo.length - a.linksTo.length || b.urlCount - a.urlCount.length);

const stamp = new Date().toISOString().slice(0, 10);
const jsonPath = resolve(OUT_DIR, "competitor-backlinks-serper-0719.json");
writeFileSync(jsonPath, JSON.stringify({ generatedAt: stamp, serperCredits: credits, competitors: COMPETITORS.map(c => c.domain), refDomains: sorted,
  pages: Object.fromEntries(Object.entries(results).map(([k, v]) => [k, [...v.entries()].map(([url, m]) => ({ url, ...m }))])) }, null, 2));

const md = [
  `# 竞对提及页挖掘结果（Serper，${stamp}）`,
  ``,
  `> Serper 查询 ${credits} 次，覆盖 ${COMPETITORS.length} 个竞对域名，去重后 ${sorted.length} 个引用域名。`,
  `> 说明：这是"页面文本提及竞对域名"的搜索结果，≈外链来源的子集；无 DR/dofollow 属性。`,
  ``,
  `## 按引用域名汇总（按链接竞对数排序）`,
  ``,
  `| 引用域名 | 链接的竞对 | 类型 | 页面数 | 示例页 |`,
  `| --- | --- | --- | --- | --- |`,
  ...sorted.map(r => `| ${r.refDomain} | ${r.linksTo.join(", ")} | ${r.types.join("/")} | ${r.urlCount} | ${r.sampleUrl} |`),
  ``,
].join("\n");
const mdPath = resolve(OUT_DIR, "competitor-backlinks-serper-0719.md");
writeFileSync(mdPath, md);

console.log(`\nDone. ${sorted.length} ref domains, ${credits} serper credits.`);
console.log(mdPath);
console.log(jsonPath);
