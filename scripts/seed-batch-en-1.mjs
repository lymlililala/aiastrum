// ─── 英文 cornerstone 文章入库（首批 24 篇）──────────────────────────────────────
// 用法：SUPABASE_SECRET_KEY=sb_secret_xxx node scripts/seed-batch-en-1.mjs
//
// 前置：先在 Supabase SQL Editor 执行 scripts/migrate-add-lang.sql（加 lang 列）。
// 幂等：按 slug upsert，可重复运行。所有文章 lang:"en"，按语言过滤后只在英文模式出现。
import { createClient } from "@supabase/supabase-js";
import { POSTS_1 } from "./en-fill-1.mjs";
import { POSTS_2 } from "./en-fill-2.mjs";
import { POSTS_3 } from "./en-fill-3.mjs";
import { POSTS_4 } from "./en-fill-4.mjs";
import { POSTS_5 } from "./en-fill-5.mjs";
import { POSTS_6 } from "./en-fill-6.mjs";
import { POSTS_7 } from "./en-fill-7.mjs";
import { POSTS_8 } from "./en-fill-8.mjs";

const SECRET = process.env.SUPABASE_SECRET_KEY;
if (!SECRET) {
  console.error("缺少 SUPABASE_SECRET_KEY。用法：SUPABASE_SECRET_KEY=sb_secret_xxx node scripts/seed-batch-en-1.mjs");
  process.exit(1);
}

const supabase = createClient("https://tixgzezefjjsyuzgdhcd.supabase.co", SECRET);

const posts = [
  ...POSTS_1, ...POSTS_2, ...POSTS_3, ...POSTS_4,
  ...POSTS_5, ...POSTS_6, ...POSTS_7, ...POSTS_8,
];

// 基本校验：必填字段 + lang=en + slug 唯一
const REQUIRED = ["slug", "category", "lang", "title", "title_en", "description", "keywords", "published_at", "reading_time", "cta_href", "cta_label", "cta_label_en", "content"];
const slugs = new Set();
for (const p of posts) {
  for (const f of REQUIRED) {
    if (p[f] === undefined || p[f] === null || p[f] === "") {
      console.error(`❌ ${p.slug ?? "(无 slug)"} 缺字段：${f}`); process.exit(1);
    }
  }
  if (p.lang !== "en") { console.error(`❌ ${p.slug} lang 不是 en`); process.exit(1); }
  if (slugs.has(p.slug)) { console.error(`❌ slug 重复：${p.slug}`); process.exit(1); }
  slugs.add(p.slug);
}

console.log(`准备 upsert ${posts.length} 篇英文文章…`);

let ok = 0, fail = 0;
for (const p of posts) {
  const { error } = await supabase.from("mysticai_blog_posts").upsert(p, { onConflict: "slug" });
  if (error) { console.log(`❌ ${p.slug}: ${error.message}`); fail++; }
  else { console.log(`✅ ${p.slug}`); ok++; }
}

console.log(`\n完成：成功 ${ok} / 失败 ${fail} / 共 ${posts.length}`);
process.exit(fail > 0 ? 1 : 0);
