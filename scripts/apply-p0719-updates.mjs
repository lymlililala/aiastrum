// ─── 应用 P1 存量增强更新（2026-07-19）────────────────────────────────────────
// 输入：scripts/p0719-updates/*.json，每条 {slug, sectionsHtml?, faqHtml?, faqHtmlSuggested?, addKeywords?}
// 行为：sectionsHtml 插入到 FAQ h2 之前；faqHtml（h3+p 对）插入到 FAQ h2 之后；
//      原文无 FAQ h2 时，在 </article> 前自动补一个 FAQ h2 再插入；
//      addKeywords 合并进 keywords（去重）；upsert 回库。
// 用法：set -a; source .env; set +a; node scripts/apply-p0719-updates.mjs
import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "fs";

const SECRET = process.env.SUPABASE_SECRET_KEY;
if (!SECRET) { console.error("缺少 SUPABASE_SECRET_KEY"); process.exit(1); }
const supabase = createClient("https://tixgzezefjjsyuzgdhcd.supabase.co", SECRET);

const dir = new URL("./p0719-updates/", import.meta.url).pathname;
const files = readdirSync(dir).filter(f => f.endsWith(".json"));
const updates = [];
for (const f of files) {
  const arr = JSON.parse(readFileSync(dir + f, "utf8"));
  for (const u of arr) updates.push({ ...u, faqHtml: u.faqHtml ?? u.faqHtmlSuggested, _file: f });
}
console.log(`共 ${updates.length} 条更新，来自 ${files.length} 个文件`);

const FAQ_RE = /<h2[^>]*>\s*Frequently Asked Questions\s*<\/h2>/i;
const FAQ_H2 = "<h2>Frequently Asked Questions</h2>";
let ok = 0, fail = 0;
for (const u of updates) {
  const { slug, sectionsHtml, faqHtml, addKeywords } = u;
  if (!slug || (!sectionsHtml && !faqHtml && !addKeywords?.length)) {
    console.log(`❌ ${slug ?? "?"}: 空更新`); fail++; continue;
  }
  const { data: post, error: e1 } = await supabase.from("mysticai_blog_posts").select("slug,content,keywords").eq("slug", slug).single();
  if (e1 || !post) { console.log(`❌ ${slug}: 读取失败 ${e1?.message}`); fail++; continue; }
  let content = post.content;
  let m = FAQ_RE.exec(content);
  if ((sectionsHtml || faqHtml) && !m) {
    // 原文无 FAQ 标题：在 </article> 前补一个，作为插入锚点
    if (/<\/article>\s*$/.test(content)) {
      content = content.replace(/<\/article>\s*$/, `${FAQ_H2}\n</article>`);
      m = FAQ_RE.exec(content);
      console.log(`   ℹ️ ${slug}: 原文无 FAQ 标题，已自动补`);
    } else {
      console.log(`❌ ${slug}: 找不到 FAQ 标题且无 </article> 结尾`); fail++; continue;
    }
  }
  if (sectionsHtml) content = content.slice(0, m.index) + sectionsHtml + "\n" + content.slice(m.index);
  if (faqHtml) {
    const m2 = FAQ_RE.exec(content);
    const insertAt = m2.index + m2[0].length;
    content = content.slice(0, insertAt) + "\n" + faqHtml + content.slice(insertAt);
  }
  const keywords = [...new Set([...(post.keywords ?? []), ...(addKeywords ?? [])])].slice(0, 12);
  const { error: e2 } = await supabase.from("mysticai_blog_posts").update({ content, keywords, updated_at: new Date().toISOString() }).eq("slug", slug);
  if (e2) { console.log(`❌ ${slug}: ${e2.message}`); fail++; }
  else { console.log(`✅ ${slug} (+${addKeywords?.length ?? 0} kw)`); ok++; }
}
console.log(`\n完成：成功 ${ok} / 失败 ${fail}`);
process.exit(fail > 0 ? 1 : 0);
