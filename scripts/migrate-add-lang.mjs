// ─── 迁移执行器：给 mysticai_blog_posts 加 lang 列（pg 直连，需 DB 密码）──────────
// 用法：
//   SUPABASE_DB_PASSWORD="数据库密码" node scripts/migrate-add-lang.mjs
//   或 DATABASE_URL="postgresql://postgres:密码@db.tixgzezefjjsyuzgdhcd.supabase.co:5432/postgres" node scripts/migrate-add-lang.mjs
// 密码获取：Supabase Dashboard → Settings → Database → Database password
// 幂等：IF NOT EXISTS / 固定 slug UPDATE，可重复运行。
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const DB_HOST = "db.tixgzezefjjsyuzgdhcd.supabase.co";
const DB_PASSWORD = process.env.SUPABASE_DB_PASSWORD;
const DATABASE_URL = process.env.DATABASE_URL
  ?? (DB_PASSWORD ? `postgresql://postgres:${encodeURIComponent(DB_PASSWORD)}@${DB_HOST}:5432/postgres` : null);

if (!DATABASE_URL) {
  console.error("缺少 SUPABASE_DB_PASSWORD 或 DATABASE_URL。");
  console.error('用法：SUPABASE_DB_PASSWORD="数据库密码" node scripts/migrate-add-lang.mjs');
  process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const sql = readFileSync(join(__dirname, "migrate-add-lang.sql"), "utf8");

const { default: pkg } = await import("pg");
const { Client } = pkg;
const client = new Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });

try {
  await client.connect();
  console.log("🔧 执行迁移 migrate-add-lang.sql …");
  await client.query(sql);
  const { rows } = await client.query("SELECT lang, count(*)::int AS n FROM mysticai_blog_posts GROUP BY lang ORDER BY lang;");
  console.log("✅ 迁移完成。lang 分布：");
  for (const r of rows) console.log(`   ${r.lang}: ${r.n}`);
  await client.end();
  process.exit(0);
} catch (err) {
  console.error("❌ 迁移失败：", err.message);
  await client.end().catch(() => {});
  process.exit(1);
}
