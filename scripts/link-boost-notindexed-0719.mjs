// 0719 未被发现文章入站内链补强：一次性脚本（幂等，可重复运行）
// 背景：GSC URL Inspection 查出 106 篇 /blog/ 文章 "Google 无法识别此网址"（无内链入口）。
// 做法：为每篇未收录文 B，从已索引（verdict=PASS）文章中按 同语言→同分类→关键词重合 选 2 篇源文 A，
//      在 A 正文 FAQ 前插入「延伸阅读」块链到 B。每篇 A 最多新增 3 条链接。
// 用法：
//   node --env-file=.env scripts/link-boost-notindexed-0719.mjs --dry-run   # 只输出计划，不写库
//   node --env-file=.env scripts/link-boost-notindexed-0719.mjs             # 实跑写库
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const DRY_RUN = process.argv.includes("--dry-run");
const MARKER = "linkboost-0719";
const MAX_SOURCES_PER_B = 2;
const MAX_LINKS_PER_A = 3;

const sb = createClient(
  process.env.SUPABASE_URL ?? "https://tixgzezefjjsyuzgdhcd.supabase.co",
  process.env.SUPABASE_SECRET_KEY
);

// ── 1) 读取未收录 blog slug（Google 无法识别此网址）───────────────────────────
const tsv = readFileSync("scripts/out/not-indexed-0719.tsv", "utf8");
const orphans = tsv
  .split("\n")
  .filter((l) => l.startsWith("Google 无法识别此网址\thttps://aiastrum.com/blog/"))
  .map((l) => l.trim().split("\t")[1].replace("https://aiastrum.com/blog/", ""));
console.log(`未收录 blog 文章：${orphans.length} 篇`);

// ── 2) 读取已索引 blog slug（链接源池）────────────────────────────────────────
const csv = readFileSync("scripts/out/index-check-0719.csv", "utf8");
const indexed = new Set(
  csv.split("\n")
    .filter((l) => l.startsWith('"https://aiastrum.com/blog/') && l.includes(',"PASS",'))
    .map((l) => l.match(/^"https:\/\/aiastrum\.com\/blog\/([^"]+)"/)?.[1])
    .filter(Boolean)
);
console.log(`已索引 blog 文章（源池）：${indexed.size} 篇`);

// ── 3) 拉取全部文章元数据（分页，Supabase 默认单页上限 1000 行）────────────────
const posts = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await sb
    .from("mysticai_blog_posts")
    .select("slug, lang, category, keywords, title, title_en")
    .range(from, from + 999);
  if (error) throw new Error(error.message);
  posts.push(...data);
  if (data.length < 1000) break;
}
const bySlug = new Map(posts.map((p) => [p.slug, p]));

const missing = orphans.filter((s) => !bySlug.has(s));
if (missing.length) console.log(`⚠ 库中不存在（跳过）：${missing.join(", ")}`);
const targets = orphans.filter((s) => bySlug.has(s));

const sources = posts.filter((p) => indexed.has(p.slug));
console.log(`可用源文（已索引且在库）：${sources.length} 篇`);

// ── 4) 为每篇 B 选 2 篇源文 A ────────────────────────────────────────────────
const overlap = (a = [], b = []) => {
  const set = new Set(a.map((k) => String(k).toLowerCase()));
  return b.reduce((n, k) => n + (set.has(String(k).toLowerCase()) ? 1 : 0), 0);
};

const plan = new Map(); // A.slug -> [{ slug, anchor }]
const aCount = new Map();
let unassigned = [];

for (const bSlug of targets) {
  const B = bySlug.get(bSlug);
  const candidates = sources
    .filter((A) => A.slug !== bSlug && A.lang === B.lang)
    .map((A) => ({
      A,
      score:
        (A.category === B.category ? 2 : 0) +
        overlap(A.keywords, B.keywords) +
        1 / (1 + (aCount.get(A.slug) ?? 0)), // 已被占用的源降权
    }))
    .sort((x, y) => y.score - x.score);

  let picked = 0;
  for (const { A } of candidates) {
    if (picked >= MAX_SOURCES_PER_B) break;
    if ((aCount.get(A.slug) ?? 0) >= MAX_LINKS_PER_A) continue;
    const anchor = (B.lang === "en" ? B.title_en || B.title : B.title).trim();
    if (!plan.has(A.slug)) plan.set(A.slug, []);
    plan.get(A.slug).push({ slug: bSlug, anchor });
    aCount.set(A.slug, (aCount.get(A.slug) ?? 0) + 1);
    picked++;
  }
  if (picked < MAX_SOURCES_PER_B) unassigned.push(`${bSlug}（仅 ${picked} 篇源）`);
}

console.log(`\n插入计划：${plan.size} 篇源文 A，覆盖 ${targets.length - unassigned.length}/${targets.length} 篇 B`);
if (unassigned.length) console.log(`⚠ 源不足：\n  ${unassigned.join("\n  ")}`);

// ── 5) 生成 HTML 块并写库 ────────────────────────────────────────────────────
const FAQ_H2 = /<h2[^>]*>\s*(Frequently Asked Questions|常见问题|常見問題)\s*<\/h2>/i;
const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function blockHtml(lang, links) {
  const h2 = lang === "en" ? "Further Reading" : "延伸阅读";
  const items = links
    .map((l) => `<li><a href="/blog/${l.slug}" class="blog-inline-link">${escapeHtml(l.anchor)}</a></li>`)
    .join("");
  return `<div id="${MARKER}"><h2>${h2}</h2><ul>${items}</ul></div>`;
}

let done = 0, skipped = 0, failed = 0;
for (const [aSlug, links] of plan) {
  const A = bySlug.get(aSlug);
  if (DRY_RUN) {
    console.log(`\n[A] ${aSlug} (${A.lang}/${A.category})`);
    for (const l of links) console.log(`    → /blog/${l.slug}  「${l.anchor}」`);
    continue;
  }
  const { data, error: selErr } = await sb.from("mysticai_blog_posts").select("content").eq("slug", aSlug).maybeSingle();
  if (selErr || !data) { console.log(`  ✘ ${aSlug}: ${selErr?.message ?? "不存在"}`); failed++; continue; }
  // 幂等：marker 已存在则只补缺失链接；全部已存在则跳过
  const missingLinks = links.filter((l) => !data.content.includes(`/blog/${l.slug}`));
  if (missingLinks.length === 0) { console.log(`  – ${aSlug}（链接已全部存在，跳过）`); skipped++; continue; }
  let content = data.content;
  const html = blockHtml(A.lang, missingLinks);
  if (content.includes(MARKER)) {
    // 已有块：在块的 </ul> 前补 <li>
    const items = missingLinks
      .map((l) => `<li><a href="/blog/${l.slug}" class="blog-inline-link">${escapeHtml(l.anchor)}</a></li>`)
      .join("");
    const markerIdx = content.indexOf(MARKER);
    const ulEnd = content.indexOf("</ul>", markerIdx);
    content = ulEnd !== -1 ? content.slice(0, ulEnd) + items + content.slice(ulEnd) : content + "\n" + html;
  } else {
    const m = FAQ_H2.exec(content);
    content = m ? content.slice(0, m.index) + html + "\n" + content.slice(m.index) : content + "\n" + html;
  }
  const { error: upErr } = await sb.from("mysticai_blog_posts").update({ content, updated_at: new Date().toISOString() }).eq("slug", aSlug);
  if (upErr) { console.log(`  ✘ ${aSlug}: ${upErr.message}`); failed++; }
  else { console.log(`  ✔ ${aSlug}（+${missingLinks.length} 条）`); done++; }
}

console.log(DRY_RUN ? `\n（dry-run，未写库）` : `\n完成：更新 ${done}，跳过 ${skipped}，失败 ${failed}`);
