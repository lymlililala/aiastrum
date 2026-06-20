// sitemap 健康自检：对比「数据库文章数」与「线上 sitemap.xml 实际条数」，
// 校验无文章静默丢失（参考 memory：Supabase key 失效曾致博客部分归零 → 全站 404）。
// 公式：sitemap 总数 应 = DB 文章数 − canonical 合并数 + 固定条目(首页/工具/pillar/blog列表)
//
// 用法：node scripts/wechat/check-sitemap.mjs
//   退出码 0=健康，1=异常（可用于 CI 守护）

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { getSupabase } from './lib/supabase.mjs'

const BASE_URL = 'https://aiastrum.com'
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')

// 解析 src/lib/canonical-overrides.ts 里的 override slug 数（被合并、不进 sitemap）
function canonicalOverrideCount() {
  try {
    const txt = readFileSync(join(ROOT, 'src', 'lib', 'canonical-overrides.ts'), 'utf8')
    // 统计对象字面量里的 "slug": "..." 键（形如  "xxx": "yyy"）
    const m = txt.match(/["'][a-z0-9-]+["']\s*:\s*["'][a-z0-9-]+["']/gi)
    return m ? m.length : 0
  } catch { return 0 }
}

// 1) DB 文章数
const sb = getSupabase()
const { count: dbCount, error } = await sb.from('mysticai_blog_posts').select('*', { count: 'exact', head: true })
if (error) { console.error('❌ 读 DB 失败:', error.message); process.exit(1) }

// 2) 线上 sitemap 实际条数
let sm
try {
  const res = await fetch(`${BASE_URL}/sitemap.xml`, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  sm = await res.text()
} catch (e) { console.error('❌ 拉 sitemap 失败:', e.message); process.exit(1) }

const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
const total = locs.length
const blogPosts = locs.filter(u => /\/blog\/[a-z0-9-]+$/.test(u) && !/\/blog\/topic\//.test(u)).length
const fixed = total - blogPosts // pillar + /blog + 首页 + 工具 + 静态

const overrides = canonicalOverrideCount()
const expectedBlog = dbCount - overrides

console.log('── sitemap 健康自检 ──')
console.log(`DB 文章数:           ${dbCount}`)
console.log(`canonical 合并(排除): ${overrides}`)
console.log(`sitemap 博客文章:     ${blogPosts}  (应 = ${dbCount} − ${overrides} = ${expectedBlog})`)
console.log(`sitemap 固定条目:     ${fixed}  (首页/工具/pillar/blog列表)`)
console.log(`sitemap 总 URL:       ${total}`)

const diff = blogPosts - expectedBlog
if (diff === 0) {
  console.log('\n✅ 健康：博客文章数完全吻合，无丢失。')
  process.exit(0)
} else if (diff < 0) {
  console.log(`\n❌ 异常：sitemap 比预期少 ${-diff} 篇博客文章！可能 Supabase key 失效/查询截断/文章丢失。`)
  console.log('   排查：用 SUPABASE_SECRET_KEY 直连 REST 验证是否 401；检查 fetchAllPosts 分页。')
  process.exit(1)
} else {
  console.log(`\n⚠️ 注意：sitemap 比预期多 ${diff} 篇（可能 canonical-overrides 未同步，或缓存未刷新）。`)
  process.exit(1)
}
