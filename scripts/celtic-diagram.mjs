// 一次性脚本：向 celtic-cross-tarot-spread-complete-guide 正文插入 Celtic Cross 牌位 SVG 示意图
// 幂等：已存在旧图则整块替换。
// 用法：node --env-file=.env scripts/celtic-diagram.mjs
import { createClient } from "@supabase/supabase-js";

const SLUG = "celtic-cross-tarot-spread-complete-guide";
const AFTER_H2 = "<h2>The 10 Celtic Cross Positions Explained</h2>";
const MARKER = "celtic-cross-layout-diagram";

const sb = createClient(
  process.env.SUPABASE_URL ?? "https://tixgzezefjjsyuzgdhcd.supabase.co",
  process.env.SUPABASE_SECRET_KEY
);

// 牌位：cx/cy 为牌中心。竖放 62x86；1-6 十字，7-10 右侧杖列（7 在下，10 在上）
const PW = 62, PH = 86;
function card(n, cx, cy, label, { rotated = false, labelAbove = false } = {}) {
  const w = rotated ? PH : PW, h = rotated ? PW : PH;
  const x = cx - w / 2, y = cy - h / 2;
  const ly = labelAbove ? cy - h / 2 - 8 : cy + h / 2 + 15;
  return (
    `<g>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="rgba(201,168,76,0.10)" stroke="#c9a84c" stroke-opacity="0.55" stroke-width="1.2"/>` +
    `<text x="${cx}" y="${cy + 6}" text-anchor="middle" font-family="Georgia,serif" font-size="17" fill="#e8d5a3">${n}</text>` +
    `<text x="${cx}" y="${ly}" text-anchor="middle" font-size="10" fill="rgba(200,175,140,0.85)">${label}</text>` +
    `</g>`
  );
}

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 400" role="img" aria-label="Celtic Cross tarot spread layout diagram" style="max-width:100%;height:auto;display:inline-block">` +
  // 十字区（中心 150,185）
  card(5, 150, 50, "Crown · Best outcome") +
  card(4, 60, 185, "Recent past") +
  card(1, 150, 185, "Present") +
  card(2, 150, 185, "Challenge", { rotated: true, labelAbove: true }) +
  card(6, 240, 185, "Near future") +
  card(3, 150, 320, "Foundation") +
  // 杖列（右侧 x=375，自下而上 7→10）
  card(7, 375, 330, "Self") +
  card(8, 375, 230, "Environment") +
  card(9, 375, 130, "Hopes &amp; fears") +
  card(10, 375, 45, "Outcome") +
  `</svg>`;

const block =
  `<div id="${MARKER}" style="margin:20px 0 26px;text-align:center">` +
  svg +
  `<p style="font-size:0.72rem;color:rgba(200,175,140,0.55);margin-top:8px">The Celtic Cross layout — positions 1–6 form the cross, positions 7–10 the staff. Cards are read in numbered order.</p>` +
  `</div>`;

const { data, error } = await sb.from("mysticai_blog_posts").select("content").eq("slug", SLUG).single();
if (error) { console.error("读取失败:", error.message); process.exit(1); }

let content = data.content;
const oldBlock = new RegExp(`\\n?<div id="${MARKER}"[\\s\\S]*?</svg>[\\s\\S]*?</div>`);
if (oldBlock.test(content)) {
  content = content.replace(oldBlock, "");
  console.log("已移除旧示意图");
}
if (!content.includes(AFTER_H2)) {
  console.error("未找到插入点 h2"); process.exit(1);
}

content = content.replace(AFTER_H2, AFTER_H2 + "\n" + block);
const { error: upErr } = await sb
  .from("mysticai_blog_posts")
  .update({ content, updated_at: new Date().toISOString() })
  .eq("slug", SLUG);
if (upErr) { console.error("更新失败:", upErr.message); process.exit(1); }
console.log("✔ 已插入牌位示意图 →", SLUG);
