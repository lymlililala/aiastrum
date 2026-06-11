// ─── 第六批英文文章入库（24 篇：天使数字 12 + 灵性/显化 12）────────────────────────
// 用法：set -a; source .env; set +a; node scripts/seed-batch-en-6.mjs
import { createClient } from "@supabase/supabase-js";
import { POSTS_1 } from "./en6-fill-1.mjs";
import { POSTS_2 } from "./en6-fill-2.mjs";
import { POSTS_3 } from "./en6-fill-3.mjs";
import { POSTS_4 } from "./en6-fill-4.mjs";
import { POSTS_5 } from "./en6-fill-5.mjs";
import { POSTS_6 } from "./en6-fill-6.mjs";
import { POSTS_7 } from "./en6-fill-7.mjs";
import { POSTS_8 } from "./en6-fill-8.mjs";

const SECRET = process.env.SUPABASE_SECRET_KEY;
if (!SECRET) { console.error("缺少 SUPABASE_SECRET_KEY"); process.exit(1); }
const supabase = createClient("https://tixgzezefjjsyuzgdhcd.supabase.co", SECRET);

const posts = [...POSTS_1, ...POSTS_2, ...POSTS_3, ...POSTS_4, ...POSTS_5, ...POSTS_6, ...POSTS_7, ...POSTS_8];
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
