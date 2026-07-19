import { createClient } from "@supabase/supabase-js";
const s = createClient("https://tixgzezefjjsyuzgdhcd.supabase.co", process.env.SUPABASE_SECRET_KEY);
const all = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await s.from("mysticai_blog_posts")
    .select("slug,category,lang,title,published_at,reading_time")
    .range(from, from + 999);
  if (error) { console.error(error.message); process.exit(1); }
  all.push(...data);
  if (data.length < 1000) break;
}
console.log(JSON.stringify(all, null, 0));
console.error("total:", all.length);
