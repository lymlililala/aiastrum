// 0722 新文章入站内链补强（幂等，可重复运行）
// 为 gsc-0722 批次新建的 2 篇文章从同分类高相关老文引入「Further Reading」链接块。
// 用法：
//   node --env-file=.env scripts/link-boost-0722.mjs --dry-run   # 只输出计划
//   node --env-file=.env scripts/link-boost-0722.mjs             # 实跑写库
import { createClient } from "@supabase/supabase-js";

const DRY_RUN = process.argv.includes("--dry-run");
const MARKER = "linkboost-0722";

const sb = createClient(
  process.env.SUPABASE_URL ?? "https://tixgzezefjjsyuzgdhcd.supabase.co",
  process.env.SUPABASE_SECRET_KEY
);

// B（新文）→ 候选源文 A（按优先级，取前 2 篇存在的）
const PLAN = {
  "car-crash-dream-meaning": [
    "dream-about-water-flooding-meaning",
    "dream-about-snakes-meaning",
    "dream-about-teeth-falling-out-meaning",
  ],
  "7-card-tarot-spread-guide": [
    "horseshoe-tarot-spread-guide",
    "celtic-cross-tarot-spread-guide",
    "three-card-tarot-spread-guide",
  ],
  "astrological-signature-meaning": [
    "sun-moon-rising-signs-explained",
    "what-is-my-rising-sign",
    "natal-chart-houses-guide",
  ],
  "black-crystals-meaning": [
    "black-tourmaline-protection-meaning",
    "obsidian-crystal-shadow-protection",
    "crystals-for-protection",
  ],
  "855-angel-number-meaning": [
    "555-angel-number-meaning",
    "444-angel-number-meaning",
    "222-angel-number-meaning",
  ],
  "1017-angel-number-meaning": [
    "1010-angel-number-meaning",
    "777-angel-number-meaning",
    "angel-numbers-guide-all-meanings",
  ],
};

const FAQ_H2 = /<h2[^>]*>\s*(Frequently Asked Questions|常见问题|常見問題)\s*<\/h2>/i;
const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// 拉取新文标题（锚文本）
const anchors = {};
for (const b of Object.keys(PLAN)) {
  const { data, error } = await sb.from("mysticai_blog_posts").select("slug,title,title_en,lang").eq("slug", b).maybeSingle();
  if (error || !data) { console.log(`⚠ 新文 ${b} 尚不存在（先发布 gsc-0722 批次1）`); continue; }
  anchors[b] = (data.lang === "en" ? data.title_en || data.title : data.title).trim();
}

for (const [b, candidates] of Object.entries(PLAN)) {
  if (!anchors[b]) continue;
  let picked = 0;
  for (const aSlug of candidates) {
    if (picked >= 2) break;
    const { data, error } = await sb.from("mysticai_blog_posts").select("slug,content").eq("slug", aSlug).maybeSingle();
    if (error || !data) { console.log(`  ✘ 源文 ${aSlug} 不存在`); continue; }
    if (data.content.includes(`/blog/${b}`)) { console.log(`  – ${aSlug}（已含链接，跳过）`); picked++; continue; }
    if (DRY_RUN) { console.log(`[A] ${aSlug} → /blog/${b} 「${anchors[b]}」`); picked++; continue; }
    const html = `<div id="${MARKER}"><h2>Further Reading</h2><ul><li><a href="/blog/${b}" class="blog-inline-link">${escapeHtml(anchors[b])}</a></li></ul></div>`;
    let content = data.content;
    const m = FAQ_H2.exec(content);
    content = m ? content.slice(0, m.index) + html + "\n" + content.slice(m.index) : content + "\n" + html;
    const { error: upErr } = await sb.from("mysticai_blog_posts").update({ content, updated_at: new Date().toISOString() }).eq("slug", aSlug);
    console.log(upErr ? `  ✘ ${aSlug}: ${upErr.message}` : `  ✔ ${aSlug} → /blog/${b}`);
    picked++;
  }
}
console.log(DRY_RUN ? "（dry-run，未写库）" : "完成");
