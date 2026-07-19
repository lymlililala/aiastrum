import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
const s = createClient("https://tixgzezefjjsyuzgdhcd.supabase.co", process.env.SUPABASE_SECRET_KEY);
const files = ["angel","chakra-mercury","dream-animals","moon-a","moon-b","rising-a","rising-b"];
const targets = new Set(["dream-about-spider-meaning","taurus-moon-sign-meaning","taurus-rising-sign-meaning","libra-rising-sign-meaning"]);
const updates = [];
for (const f of files) {
  for (const u of JSON.parse(readFileSync(`scripts/p0719-updates/${f}.json`,"utf8"))) {
    if (targets.has(u.slug)) updates.push({...u, faqHtml: u.faqHtml ?? u.faqHtmlSuggested});
  }
}
console.log("found updates:", updates.map(u=>u.slug).join(", "));
for (const u of updates) {
  const { data: post, error: e1 } = await s.from("mysticai_blog_posts").select("slug,content,keywords").eq("slug", u.slug).single();
  if (e1 || !post) { console.log("❌ read", u.slug, e1?.message); continue; }
  let content = post.content;
  const block = `${u.sectionsHtml ?? ""}\n<h2>Frequently Asked Questions</h2>\n${u.faqHtml ?? ""}`;
  // 若结尾是 related-links div，插到它前面；否则追加到末尾
  const tail = content.match(/<div[^>]*>(?:(?!<div)[\s\S])*blog\/[\s\S]*<\/div>\s*$/);
  if (tail) content = content.slice(0, tail.index) + block + "\n" + tail[0];
  else content = content + "\n" + block;
  const keywords = [...new Set([...(post.keywords ?? []), ...(u.addKeywords ?? [])])].slice(0, 12);
  const { error: e2 } = await s.from("mysticai_blog_posts").update({ content, keywords, updated_at: new Date().toISOString() }).eq("slug", u.slug);
  console.log(e2 ? `❌ ${u.slug}: ${e2.message}` : `✅ ${u.slug}`);
}
