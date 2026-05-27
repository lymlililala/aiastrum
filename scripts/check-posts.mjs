import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);
const { data } = await supabase.from("mysticai_blog_posts").select("slug,category,title").order("published_at", { ascending: false });
const cats = {};
data.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; });
console.log("Total:", data.length);
console.log("By category:", JSON.stringify(cats));
data.forEach(p => console.log(`[${p.category}] ${p.slug}`));
