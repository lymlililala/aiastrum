// ─── CTR 标题/Meta 优化（去重簇主文章）──────────────────────────────────────
// 只更新主文章的 title/description，吸收次要文章关键词、提升点击率。次要文章已 canonical 合并。
// 运行：SUPABASE_SECRET_KEY=sb_secret_xxx node scripts/optimize-meta-gsc1.mjs
import { createClient } from "@supabase/supabase-js";

const SECRET = process.env.SUPABASE_SECRET_KEY;
if (!SECRET) { console.error("缺少环境变量 SUPABASE_SECRET_KEY"); process.exit(1); }
const supabase = createClient("https://tixgzezefjjsyuzgdhcd.supabase.co", SECRET);

const updates = [
  {
    slug: "celtic-cross-tarot-spread-guide",
    // 吸收 "10 card tarot spread" / "how to read" / "position meanings" 等 query 簇
    title: "Celtic Cross Tarot Spread: How to Read All 10 Card Positions (Complete Guide)",
    description: "The Celtic Cross is the classic 10-card tarot spread. This complete guide explains what every one of the 10 positions means and how to read them together — with a clear layout diagram and a step-by-step example reading.",
    keywords: ["celtic cross tarot spread", "celtic cross spread", "10 card tarot spread", "how to read celtic cross", "celtic cross position meanings", "celtic cross layout"],
  },
  {
    slug: "mercury-retrograde-2026",
    // 标题已强，仅优化 description，吸收「水逆时间2026 / 水逆时间」
    description: "2026年水星逆行（水逆）共3次。本文提供完整的2026水逆时间表与每次逆行的起止日期，详解对十二星座的具体影响，并给出实用的应对方法与禁忌，帮你查清水逆时间、平稳度过。",
    keywords: ["2026水星逆行", "水逆时间2026", "水逆时间", "水星逆行时间", "水逆怎么办", "Mercury retrograde 2026"],
  },
];

async function run() {
  for (const u of updates) {
    const { slug, ...patch } = u;
    const { error } = await supabase.from("mysticai_blog_posts").update(patch).eq("slug", slug);
    console.log(error ? `❌ ${slug}: ${error.message}` : `✅ ${slug} 已更新 ${Object.keys(patch).join(",")}`);
  }
}
run();
