// ─── 2026-07-19 P0 扩展批次入库（30 篇）────────────────────────────────────────
// 构成：luckiest 2026(1) + 符文 isa/inguz(2) + 火马年(2) + 长尾天使数字(5)
//      + 风水卧室(1) + 解梦宗教视角(8) + 八字日主系列(9) + 十二长生/紫微vs八字(2)
// 用法：set -a; source .env; set +a; node scripts/seed-batch-p0719.mjs
import { createClient } from "@supabase/supabase-js";
import { POSTS_HOROSCOPE } from "./p0719-fill-horoscope.mjs";
import { POSTS_RUNES } from "./p0719-fill-runes.mjs";
import { POSTS_HORSE } from "./p0719-fill-horse.mjs";
import { POSTS_ANGEL_A } from "./p0719-fill-angel-a.mjs";
import { POSTS_ANGEL_B } from "./p0719-fill-angel-b.mjs";
import { POSTS_DREAM_A } from "./p0719-fill-dream-a.mjs";
import { POSTS_DREAM_B } from "./p0719-fill-dream-b.mjs";
import { POSTS_BAZI_A } from "./p0719-fill-bazi-a.mjs";
import { POSTS_BAZI_B } from "./p0719-fill-bazi-b.mjs";
import { POSTS_BAZI_C } from "./p0719-fill-bazi-c.mjs";

const SECRET = process.env.SUPABASE_SECRET_KEY;
if (!SECRET) { console.error("缺少 SUPABASE_SECRET_KEY"); process.exit(1); }
const supabase = createClient("https://tixgzezefjjsyuzgdhcd.supabase.co", SECRET);

const posts = [
  ...POSTS_HOROSCOPE, ...POSTS_RUNES, ...POSTS_HORSE,
  ...POSTS_ANGEL_A, ...POSTS_ANGEL_B,
  ...POSTS_DREAM_A, ...POSTS_DREAM_B,
  ...POSTS_BAZI_A, ...POSTS_BAZI_B, ...POSTS_BAZI_C,
];
const REQUIRED = ["slug","category","lang","title","title_en","description","keywords","published_at","reading_time","cta_href","cta_label","cta_label_en","content"];
const slugs = new Set();
for (const p of posts) {
  for (const f of REQUIRED) { if (p[f]===undefined||p[f]===null||p[f]===""){console.error(`❌ ${p.slug} 缺 ${f}`);process.exit(1);} }
  if (p.lang!=="en"){console.error(`❌ ${p.slug} lang`);process.exit(1);}
  if (!/Frequently Asked Questions/.test(p.content)){console.error(`❌ ${p.slug} 缺FAQ`);process.exit(1);}
  if (/&amp;/.test(p.title)||/&amp;/.test(p.title_en)){console.error(`❌ ${p.slug} title&amp;`);process.exit(1);}
  if (slugs.has(p.slug)){console.error(`❌ dup ${p.slug}`);process.exit(1);} slugs.add(p.slug);
}
console.log(`准备 upsert ${posts.length} 篇…`);
let ok=0,fail=0;
for (const p of posts){ const {error}=await supabase.from("mysticai_blog_posts").upsert(p,{onConflict:"slug"}); if(error){console.log(`❌ ${p.slug}: ${error.message}`);fail++;}else{console.log(`✅ ${p.slug}`);ok++;} }
console.log(`\n完成：成功 ${ok} / 失败 ${fail} / 共 ${posts.length}`);
process.exit(fail>0?1:0);
