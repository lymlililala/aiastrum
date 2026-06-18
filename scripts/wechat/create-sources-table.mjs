// ─── 一次性建表：mysticai_wx_sources（公众号源文持久化，pg 直连，需 DB 密码）───
// 用法：
//   SUPABASE_DB_PASSWORD="数据库密码" node scripts/wechat/create-sources-table.mjs
//   或 DATABASE_URL="postgresql://postgres:密码@db.tixgzezefjjsyuzgdhcd.supabase.co:5432/postgres" node ...
// 密码获取：Supabase Dashboard → Settings → Database → Database password
// 幂等：CREATE TABLE IF NOT EXISTS，可重复运行。
//
// 建表后，开启 DB 持久化：跑流水线时设 WX_SOURCES_DB=1（CI 已在 workflow 配好）。

const DB_HOST = 'db.tixgzezefjjsyuzgdhcd.supabase.co'
const DB_PASSWORD = process.env.SUPABASE_DB_PASSWORD
const DATABASE_URL = process.env.DATABASE_URL
  ?? (DB_PASSWORD ? `postgresql://postgres:${encodeURIComponent(DB_PASSWORD)}@${DB_HOST}:5432/postgres` : null)

if (!DATABASE_URL) {
  console.error('缺少 SUPABASE_DB_PASSWORD 或 DATABASE_URL。')
  console.error('用法：SUPABASE_DB_PASSWORD="数据库密码" node scripts/wechat/create-sources-table.mjs')
  console.error('密码：Supabase Dashboard → Settings → Database → Database password')
  process.exit(1)
}

const SQL = `
create table if not exists mysticai_wx_sources (
  sn text primary key,
  account text,
  wxid text,
  title text,
  digest text default '',
  content_url text,
  published_at timestamptz,
  body_text text default '',
  updated_at timestamptz default now()
);
create index if not exists idx_wx_sources_published_at on mysticai_wx_sources (published_at desc);
`

const { default: pkg } = await import('pg')
const { Client } = pkg
const client = new Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } })

try {
  await client.connect()
  console.log('🔧 建表 mysticai_wx_sources …')
  await client.query(SQL)
  const { rows } = await client.query('SELECT count(*)::int AS n FROM mysticai_wx_sources;')
  console.log(`✅ 完成。当前源文行数：${rows[0].n}`)
  console.log('   开启 DB 持久化：跑脚本时设环境变量 WX_SOURCES_DB=1')
  await client.end()
  process.exit(0)
} catch (err) {
  console.error('❌ 建表失败：', err.message)
  await client.end().catch(() => {})
  process.exit(1)
}
