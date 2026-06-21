// 一次性运维：把「未来日期」文章的 published_at 修正为真实 created_at。
// 背景：seed 时把 cornerstone 文的 published_at 设成了未来日期(06-22~10-15)，
// 导致 /blog 按 published_at 排序时这些"假未来"文霸占前排、压住 nightly 新文，
// 且未来发布日对 SEO 有害(Google 延迟索引/不信任)。
// 改为真实 created_at 后：排序/显示/sitemap/SEO 全部归正，nightly 新文自然排最前。
//
// 用法：
//   node scripts/fix-future-dates.mjs            # 预览 + 备份，不改库
//   node scripts/fix-future-dates.mjs --apply    # 实际修正

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createClient } from '@supabase/supabase-js'

const APPLY = process.argv.includes('--apply')
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const key = (readFileSync(join(ROOT, '.env'), 'utf8').match(/SUPABASE_SECRET_KEY=(.+)/) || [])[1]?.trim()
if (!key) { console.error('缺少 SUPABASE_SECRET_KEY'); process.exit(1) }
const s = createClient('https://tixgzezefjjsyuzgdhcd.supabase.co', key)

const TODAY = new Date().toISOString().slice(0, 10) // 今天 YYYY-MM-DD

// 拉全部，筛 published_at 在未来的
let all = []
for (let f = 0; ; f += 1000) {
  const { data, error } = await s.from('mysticai_blog_posts').select('slug,published_at,created_at').range(f, f + 999)
  if (error) { console.error('读库失败:', error.message); process.exit(1) }
  all.push(...data); if (data.length < 1000) break
}
const future = all.filter(a => a.published_at && a.published_at.slice(0, 10) > TODAY && a.created_at)
console.log(`今天: ${TODAY}`)
console.log(`文章总数: ${all.length} | 未来日期(待修正): ${future.length}`)
if (!future.length) { console.log('没有未来日期文章，无需修正。'); process.exit(0) }

// 备份当前 published_at（可回滚）
const backupDir = join(ROOT, 'scripts', 'wechat', 'data')
mkdirSync(backupDir, { recursive: true })
const backupFile = join(backupDir, 'future-dates-backup.json')
writeFileSync(backupFile, JSON.stringify(future.map(a => ({ slug: a.slug, old_published_at: a.published_at, new_published_at: a.created_at })), null, 2))
console.log(`备份 → ${backupFile}`)
console.log('\n样例(前8)：')
future.slice(0, 8).forEach(a => console.log(`  ${a.slug}: ${a.published_at?.slice(0, 10)} → ${a.created_at?.slice(0, 10)}`))

if (!APPLY) {
  console.log(`\n[DRY-RUN] 未修改。确认后加 --apply 实改 ${future.length} 篇。`)
  process.exit(0)
}

// 逐条修正 published_at = created_at
let ok = 0, fail = 0
for (const a of future) {
  const { error } = await s.from('mysticai_blog_posts').update({ published_at: a.created_at }).eq('slug', a.slug)
  if (error) { fail++; if (fail <= 5) console.log(`  ✗ ${a.slug}: ${error.message}`) }
  else { ok++; if (ok % 30 === 0) console.log(`  …${ok}/${future.length}`) }
}
console.log(`\n完成：修正 ${ok}，失败 ${fail}`)
// 验证
const { count } = await s.from('mysticai_blog_posts').select('*', { count: 'exact', head: true }).gt('published_at', TODAY + 'T23:59:59Z')
console.log(`修正后未来日期文章剩余: ${count ?? '?'}`)
