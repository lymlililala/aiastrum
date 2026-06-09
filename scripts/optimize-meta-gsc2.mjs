// D: 把 celtic CTR 优化标题/描述移到 Google 已排名的 complete-guide（成为 canonical 主文）
import { createClient } from "@supabase/supabase-js";
const SECRET = process.env.SUPABASE_SECRET_KEY;
if (!SECRET) { console.error("缺少 SUPABASE_SECRET_KEY"); process.exit(1); }
const supabase = createClient("https://tixgzezefjjsyuzgdhcd.supabase.co", SECRET);
const { error } = await supabase.from("mysticai_blog_posts").update({
  title: "Celtic Cross Tarot Spread: How to Read All 10 Card Positions (Complete Guide)",
  description: "The Celtic Cross is the classic 10-card tarot spread. This complete guide explains what every one of the 10 positions means and how to read them together — with a clear layout diagram and a step-by-step example reading.",
  keywords: ["celtic cross tarot spread", "celtic cross spread", "10 card tarot spread", "how to read celtic cross", "celtic cross position meanings", "celtic cross layout"],
}).eq("slug", "celtic-cross-tarot-spread-complete-guide");
console.log(error ? `❌ ${error.message}` : "✅ complete-guide 已更新为 CTR 优化标题/描述");
