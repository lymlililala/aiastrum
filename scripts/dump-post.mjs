// 读取单篇文章完整内容（供内容增强用）
// 用法：set -a; source .env; set +a; node scripts/dump-post.mjs <slug>
import { createClient } from "@supabase/supabase-js";
const slug = process.argv[2];
if (!slug) { console.error("usage: node scripts/dump-post.mjs <slug>"); process.exit(1); }
const s = createClient("https://tixgzezefjjsyuzgdhcd.supabase.co", process.env.SUPABASE_SECRET_KEY);
const { data, error } = await s.from("mysticai_blog_posts").select("*").eq("slug", slug).single();
if (error) { console.error(error.message); process.exit(1); }
console.log(JSON.stringify(data, null, 1));
