// 给 mysticai_blog_posts 里**已有但无配图**的 HTML 文章批量补图（每篇若干张正文图）。
// 按 category（主题）+ 各 <h2> 章节标题搜图，插在章节标题前，再 upsert 回库。
// 写库前把原 content 备份到 data/img-backup/<slug>.json，可手动还原。
//
// 用法：
//   node scripts/wechat/add-images.mjs --slugs a,b,c            # 指定文章
//   node scripts/wechat/add-images.mjs --all --limit 10         # 取无图文章前 N 篇
//   node scripts/wechat/add-images.mjs --all --category tarot   # 限分类
//   node scripts/wechat/add-images.mjs --slugs a --inline 3 --dry-run

import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ImageFinder, fallbackImageUrl } from './lib/images.mjs'
import { DATA_DIR } from './lib/env.mjs'
import { getSupabase, hasSupabase } from './lib/supabase.mjs'

function arg(name, def) {
  const i = process.argv.indexOf(name)
  if (i === -1) return def
  const v = process.argv[i + 1]
  return v && !v.startsWith('--') ? v : true
}
const DRY = arg('--dry-run', false) === true
const ALL = arg('--all', false) === true
const LIMIT = arg('--limit', null) ? Number(arg('--limit', null)) : null
const INLINE = Number(arg('--inline', 3))
const CATEGORY = arg('--category', null)
const slugsArg = arg('--slugs', null)
const BACKUP_DIR = join(DATA_DIR, 'img-backup')

if (!hasSupabase()) { console.error('缺少 SUPABASE_SECRET_KEY'); process.exit(1) }
const sb = getSupabase()
const TABLE = 'mysticai_blog_posts'

// 选定文章
let rows = []
if (slugsArg && slugsArg !== true) {
  const slugs = String(slugsArg).split(',').map(s => s.trim()).filter(Boolean)
  const { data, error } = await sb.from(TABLE).select('slug,category,lang,title,title_en,content').in('slug', slugs)
  if (error) { console.error(error.message); process.exit(1) }
  rows = data
} else if (ALL) {
  // 分页取，筛无 <img> 的
  for (let from = 0; ; from += 1000) {
    let q = sb.from(TABLE).select('slug,category,lang,title,title_en,content').range(from, from + 999)
    if (CATEGORY) q = q.eq('category', CATEGORY)
    const { data, error } = await q
    if (error) { console.error(error.message); process.exit(1) }
    rows.push(...data)
    if (data.length < 1000) break
  }
  rows = rows.filter(r => r.content && !/<img\b/i.test(r.content))
  if (LIMIT) rows = rows.slice(0, LIMIT)
} else {
  console.error('请用 --slugs a,b,c 指定，或 --all [--limit N] [--category x] 批量。')
  process.exit(1)
}

const finder = new ImageFinder()
if (!finder.enabled) console.log('⚠️  未配置 PEXELS/UNSPLASH key，将全部回退写死玄学图池。')
if (!DRY) mkdirSync(BACKUP_DIR, { recursive: true })

// 不在这些非内容章节前插图
const SKIP_H2 = /常见问题|frequently asked|faq|related|further reading|references?/i

console.log(`处理 ${rows.length} 篇，每篇最多正文 ${INLINE} 张${DRY ? '（dry-run）' : ''}\n`)
let done = 0

for (const r of rows) {
  if (/<img\b/i.test(r.content)) { console.log(`• 已有图，跳过: ${r.slug}`); continue }
  const isZh = (r.lang || 'zh') === 'zh'
  // 主题搜索词：英文标题（搜图命中率高）+ category
  const baseKw = (r.title_en || r.title || '').replace(/[:：|—-].*$/, '').trim()

  // 找 <h2> 位置（排除 FAQ 等）
  const h2s = [...r.content.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)]
    .filter(m => !SKIP_H2.test(m[1]))
  if (!h2s.length) { console.log(`• 无可插入章节，跳过: ${r.slug}`); continue }
  const step = Math.max(1, Math.floor(h2s.length / INLINE))
  const picks = []
  for (let k = 0; k < h2s.length && picks.length < INLINE; k += step) picks.push(h2s[k])

  let content = r.content
  let inserted = 0
  const used = new Set()
  let seed = (r.slug || '').length
  for (const m of picks) {
    const secText = m[1].replace(/<[^>]+>/g, '').trim()
    const query = `${baseKw} ${secText}`.trim()
    let url = null
    if (finder.enabled) { const hit = await finder.find(query, secText); if (hit) url = hit.url }
    if (!url) url = fallbackImageUrl(`${query} ${r.category}`, used, seed++)
    const alt = secText || baseKw
    const imgTag = `<img src="${url}" alt="${alt}" loading="lazy">\n`
    // 插在该 <h2> 之前（只替换首个出现，避免重复 h2 文本误伤）
    content = content.replace(m[0], imgTag + m[0])
    inserted++
  }

  console.log(`${r.slug} [${r.category}/${r.lang}]  插 ${inserted}/${picks.length} 张  (kw: "${baseKw}")`)
  if (DRY) continue

  // 备份原文 + upsert
  writeFileSync(join(BACKUP_DIR, `${r.slug}.json`), JSON.stringify({ slug: r.slug, content: r.content }, null, 2))
  const { error } = await sb.from(TABLE)
    .update({ content, updated_at: new Date().toISOString() })
    .eq('slug', r.slug)
  if (error) { console.log(`  ✗ 更新失败: ${error.message}`); continue }
  done++
}

console.log(`\n完成 ${DRY ? '(dry-run) ' : ''}${done}/${rows.length} 篇`)
if (finder.enabled) console.log('配图来源:', finder.stats)
if (!DRY && done) console.log(`原文已备份到 ${BACKUP_DIR}`)
