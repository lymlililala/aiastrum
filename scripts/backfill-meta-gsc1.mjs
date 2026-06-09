// ─── 回填空 description / keywords（P0 CTR + 内链可达性）──────────────────────
// 240 篇文章 description/keywords 为空 → Google 自动生成劣质摘要 + 无法被正文内链命中。
// 程序化回填：description=正文首段清洗截断；keywords=标题核心短语派生。
// 用法：DRY=1 预览； SUPABASE_SECRET_KEY=xxx node scripts/backfill-meta-gsc1.mjs 执行
import { createClient } from "@supabase/supabase-js";

const SECRET = process.env.SUPABASE_SECRET_KEY;
const DRY = process.env.DRY === "1";
if (!SECRET && !DRY) { console.error("缺少 SUPABASE_SECRET_KEY"); process.exit(1); }
const supabase = SECRET ? createClient("https://tixgzezefjjsyuzgdhcd.supabase.co", SECRET) : null;

function clean(s) {
  return s.replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim();
}
// 正文首段作为描述，按字界截到 ~155 字符
function makeDescription(html) {
  const paras = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(m => clean(m[1]));
  const first = paras.find(t => t.length >= 40) ?? paras[0] ?? "";
  if (!first) return "";
  if (first.length <= 158) return first;
  const cut = first.slice(0, 158);
  const isCjk = /[一-鿿぀-ヿ]/.test(first);
  if (isCjk) return cut.replace(/[，、。；：,.;:]?$/, "") + "…";
  const sp = cut.lastIndexOf(" ");
  return (sp > 100 ? cut.slice(0, sp) : cut).replace(/[,.;:]$/, "") + "…";
}
// 从标题派生关键词（核心短语 + 短变体），供 SEO 与内链锚词
function makeKeywords(title, slug) {
  const core = title.split(/[：:—\-|·？?！!,，]/)[0].trim();
  const set = new Set();
  if (core && core.length <= 40) set.add(core);
  // 英文：核心短语前 3 个词作为更易被命中的锚词
  if (/^[\x00-\x7F\s]+$/.test(core)) {
    const w = core.split(/\s+/);
    if (w.length >= 4) set.add(w.slice(0, 3).join(" "));
  }
  set.add(slug.replace(/-/g, " "));
  return [...set].filter(Boolean).slice(0, 5);
}

async function fetchAllEmpty() {
  const headers = { apikey: SECRET, Authorization: `Bearer ${SECRET}` };
  const out = []; let from = 0;
  for (;;) {
    const res = await fetch(`https://tixgzezefjjsyuzgdhcd.supabase.co/rest/v1/mysticai_blog_posts?select=slug,title,description,keywords,content&limit=1000&offset=${from}`, { headers });
    const d = await res.json();
    out.push(...d);
    if (d.length < 1000) break;
    from += 1000;
  }
  return out.filter(p => !(p.description || "").trim() || !(p.keywords || []).length);
}

async function run() {
  const targets = await fetchAllEmpty();
  console.log(`待回填: ${targets.length} 篇  ${DRY ? "(DRY RUN 预览前 8)" : ""}`);
  let i = 0;
  for (const p of targets) {
    const patch = {};
    if (!(p.description || "").trim()) patch.description = makeDescription(p.content);
    if (!(p.keywords || []).length) patch.keywords = makeKeywords(p.title, p.slug);
    if (!Object.keys(patch).length) continue;
    if (DRY) {
      if (i < 8) { console.log(`\n• ${p.slug}`); console.log(`  D: ${patch.description}`); console.log(`  K: ${JSON.stringify(patch.keywords)}`); }
    } else {
      const { error } = await supabase.from("mysticai_blog_posts").update(patch).eq("slug", p.slug);
      if (error) console.log(`❌ ${p.slug}: ${error.message}`);
    }
    i++;
  }
  console.log(DRY ? `\n（预览结束，共 ${i} 篇将被更新）` : `✅ 已更新 ${i} 篇`);
}
run();
