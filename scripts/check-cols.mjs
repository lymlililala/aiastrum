import { createClient } from "@supabase/supabase-js";
const s = createClient("https://tixgzezefjjsyuzgdhcd.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E");
const {data,error} = await s.from("mysticai_blog_posts").select().limit(1);
if(error){console.log("err",error.message)}else{console.log("cols",Object.keys(data[0]))}
