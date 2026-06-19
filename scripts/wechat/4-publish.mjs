// 4) 发布：质量闸门 + DeepSeek 自评分 → 过线的 upsert 进 mysticai_blog_posts（中英双行）。
//    未过线留在 drafts，不入库。绝不 delete 既有文章（按 slug upsert）。
// 用法：
//   node scripts/wechat/4-publish.mjs --dry-run               # 只打印判定，不写库
//   node scripts/wechat/4-publish.mjs                          # 实际 upsert
//   node scripts/wechat/4-publish.mjs --threshold 85 --max-publish 2

import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { DeepSeek } from './deepseek.mjs'
import { checkQuality } from './lib/quality.mjs'
import { ImageFinder, fallbackImageUrl } from './lib/images.mjs'
import { DATA_DIR } from './lib/env.mjs'
import { getSupabase, hasSupabase } from './lib/supabase.mjs'
import { SENSITIVE_CATEGORIES } from './lib/categories.mjs'

function arg(name, def) {
  const i = process.argv.indexOf(name)
  if (i === -1) return def
  const v = process.argv[i + 1]
  return v && !v.startsWith('--') ? v : true
}
const DRY = arg('--dry-run', false) === true
const THRESHOLD = Number(arg('--threshold', 82))
// 敏感品类（面相/风水/奇门/黄历）的发布阈值：评审对玄学主题天然更严，用略低阈值兜底
const SENSITIVE_THRESHOLD = Number(arg('--sensitive-threshold', Math.max(70, THRESHOLD - 7)))
const MAX_PUBLISH = Number(arg('--max-publish', 4)) // 单次最多发布几「组」（zh+en 算一组）

const TABLE = 'mysticai_blog_posts'

// ── 把正文里的 <img src="IMG:keywords" alt="..."> 占位替换为真实图 ──────────────
async function resolveImages(html, finder, seed0 = 0) {
  const used = new Set()
  let seed = seed0
  const firstUrls = []
  let out = html || ''
  const matches = [...out.matchAll(/<img[^>]*\bsrc=["']\s*IMG:\s*([^"']*)["'][^>]*\balt=["']([^"']*)["'][^>]*>|<img[^>]*\balt=["']([^"']*)["'][^>]*\bsrc=["']\s*IMG:\s*([^"']*)["'][^>]*>/gi)]
  for (const m of matches) {
    const kw = (m[1] ?? m[4] ?? '').trim()
    const alt = (m[2] ?? m[3] ?? '').trim()
    let url = null
    if (finder.enabled) {
      const hit = await finder.find(kw, alt)
      if (hit) url = hit.url
    }
    if (!url) url = fallbackImageUrl(`${kw} ${alt}`, used, seed++)
    firstUrls.push(url)
    out = out.replace(m[0], `<img src="${url}" alt="${alt}" loading="lazy">`)
  }
  return { html: out, cover: firstUrls[0] || null, count: matches.length }
}

const DRAFTS = join(DATA_DIR, 'drafts.json')
const OUT = join(DATA_DIR, 'published.json')
// 无草稿（今晚无合格选题）= 正常空运行，优雅退出，不让 CI 标红。
if (!existsSync(DRAFTS)) { console.log('没有 drafts.json（今晚无草稿），跳过发布。'); process.exit(0) }
const drafts = JSON.parse(readFileSync(DRAFTS, 'utf8'))
if (!Array.isArray(drafts) || drafts.length === 0) { console.log('草稿为空（今晚无合格选题），跳过发布。'); process.exit(0) }

if (!DRY && !hasSupabase()) { console.error('缺少 SUPABASE_SECRET_KEY，无法发布（或加 --dry-run 仅预览）'); process.exit(1) }

const ds = new DeepSeek()
const finder = new ImageFinder()
if (!finder.enabled) console.log('⚠️  未配置 PEXELS/UNSPLASH key，正文配图将全部回退写死玄学图池。')

const SCORE_SYS = `You are a content quality reviewer for a Chinese-metaphysics / mysticism site that presents these practices as CULTURAL HERITAGE and entertainment, NOT as science. Score this article (0-100 each) and give an overall:
- originality (original synthesis, not a rewrite/translation patchwork)
- depth (useful, specific, information-dense for someone curious about the topic)
- accuracy (internally consistent; no fabricated specifics like invented dates/prices/sources. IMPORTANT: traditional metaphysical claims — e.g. face-reading "thick earlobes suggest good fortune", feng shui, bazi — are the EXPECTED content of this site; do NOT lower the score merely because such claims are unscientific or lack empirical proof. Only penalize: fear-mongering, pressuring readers to pay to "fix" their fate, absolute doom predictions, or internal contradictions.)
- readability (clear structure, natural language)
Return ONLY JSON: {"originality":int,"depth":int,"accuracy":int,"readability":int,"overall":int,"issues":["short"]}`

// 现有 slug 集合（防撞库）
let existingSlugs = new Set()
if (hasSupabase()) {
  try {
    const sb = getSupabase()
    for (let from = 0; ; from += 1000) {
      const { data, error } = await sb.from(TABLE).select('slug').range(from, from + 999)
      if (error) throw error
      for (const r of data) existingSlugs.add(r.slug)
      if (data.length < 1000) break
    }
    console.log(`库内现有 ${existingSlugs.size} 个 slug（防撞）`)
  } catch (e) { console.log(`⚠️  读现有 slug 失败（继续，但可能撞库）: ${e.message}`) }
}

function uniqueSlug(base) {
  let s = base, n = 2
  while (existingSlugs.has(s)) s = `${base}-${n++}`
  existingSlugs.add(s)
  return s
}

const results = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : []
const donePub = new Set(results.filter(r => r.action && r.action !== 'error').map(r => r.topic))

let pubGroups = 0, skipped = 0
const nowIso = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')

for (const d of drafts) {
  if (donePub.has(d._topic)) { console.log(`✓ 已处理跳过 ${d.slug_core}`); continue }

  // 评估两种语言（en 可能缺，--zh-only）
  const langs = [{ lang: 'zh', title: d.title_zh, content: d.content_zh, description: d.description_zh }]
  if (d.content_en) langs.push({ lang: 'en', title: d.title_en, content: d.content_en, description: d.description_en })

  // 硬闸门：每种语言都要过
  const qByLang = {}
  let gateFail = null
  for (const L of langs) {
    const q = checkQuality({ ...L, faq: [] })
    qByLang[L.lang] = q
    if (!q.pass) gateFail = gateFail || `${L.lang}闸门未过:${q.reasons.join(',')}`
  }

  let score = null, decision, reasonText
  if (gateFail) {
    decision = 'skip'
    reasonText = gateFail
  } else {
    // 软性：AI 自评分（用中文正文评，代表整组）
    try {
      score = await ds.chatJSON(
        [{ role: 'system', content: SCORE_SYS }, { role: 'user', content: `Title: ${d.title_en || d.title_zh}\n\n${(d.content_en || d.content_zh).slice(0, 12000)}` }],
        { maxTokens: 600 }
      )
    } catch (e) { score = { overall: 0, issues: ['评分失败:' + e.message] } }
    const th = SENSITIVE_CATEGORIES.has(d.category) ? SENSITIVE_THRESHOLD : THRESHOLD
    decision = (score.overall ?? 0) >= th ? 'publish' : 'skip'
    const z = qByLang.zh, e = qByLang.en
    reasonText = `overall=${score.overall}(阈${th}${th !== THRESHOLD ? '·敏感' : ''}) zh[faq=${z.faqPairs} len=${z.len} img=${z.images} link=${z.links}]${e ? ` en[faq=${e.faqPairs} len=${e.len}]` : ''}`
  }

  if (decision === 'publish' && pubGroups >= MAX_PUBLISH) {
    decision = 'skip'
    reasonText += ` | 超单次上限 ${MAX_PUBLISH}`
  }

  console.log(`${decision === 'publish' ? '🟢 发布' : '🟡 留草稿'}  ${d.slug_core}`)
  console.log(`     ${reasonText}`)
  if (score?.issues?.length) console.log(`     问题: ${score.issues.join('; ')}`)

  if (decision !== 'publish') {
    skipped++
    results.push({ topic: d._topic, slug: d.slug_core, decision, action: 'skip', score: score?.overall ?? null, reason: reasonText })
    if (!DRY) writeFileSync(OUT, JSON.stringify(results, null, 2))
    continue
  }

  // 解析配图（zh / en 各自替换，但首图作封面用同一搜索池）
  const enSlug = DRY ? d.slug_core : uniqueSlug(d.slug_core)
  const zhSlug = DRY ? `${d.slug_core}-zh` : uniqueSlug(`${d.slug_core}-zh`)

  const zhImg = await resolveImages(d.content_zh, finder, (d.slug_core || '').length)
  const rows = []
  // zh 行
  rows.push({
    slug: zhSlug, category: d.category, lang: 'zh',
    title: d.title_zh, title_en: d.title_en,
    description: d.description_zh, keywords: d.keywords || [],
    published_at: nowIso, reading_time: d.reading_time || 6,
    content: zhImg.html,
    cta_href: d.cta_href, cta_label: d.cta_label, cta_label_en: d.cta_label_en,
    updated_at: new Date().toISOString(),
  })
  // en 行
  if (d.content_en) {
    const enImg = await resolveImages(d.content_en, finder, (d.slug_core || '').length + 1)
    rows.push({
      slug: enSlug, category: d.category, lang: 'en',
      title: d.title_en, title_en: d.title_en,
      description: d.description_en || d.description_zh, keywords: d.keywords || [],
      published_at: nowIso, reading_time: d.reading_time || 6,
      content: enImg.html,
      cta_href: d.cta_href, cta_label: d.cta_label, cta_label_en: d.cta_label_en,
      updated_at: new Date().toISOString(),
    })
  }

  let action = 'publish'
  if (DRY) {
    action = 'publish:dry'
    console.log(`     [dry] 将 upsert ${rows.length} 行: ${rows.map(r => `${r.lang}:${r.slug}`).join(', ')}  图×${zhImg.count}`)
  } else {
    try {
      const sb = getSupabase()
      const { error } = await sb.from(TABLE).upsert(rows, { onConflict: 'slug' })
      if (error) throw error
      action = 'publish:written'
      console.log(`     ✓ upsert ${rows.length} 行: ${rows.map(r => `${r.lang}:${r.slug}`).join(', ')}`)
    } catch (e) {
      action = 'error'
      console.log(`     ✗ upsert 失败: ${e.message}`)
    }
  }

  results.push({
    topic: d._topic, slug: enSlug, zhSlug, decision, action,
    score: score?.overall ?? null, category: d.category,
    sources: d._sources?.map(s => s.url),
  })
  if (!DRY) writeFileSync(OUT, JSON.stringify(results, null, 2))
  if (action.startsWith('publish')) pubGroups++
}

console.log(`\n${DRY ? '[DRY-RUN] ' : ''}完成：发布 ${pubGroups} 组（中英），留草稿 ${skipped}`)
console.log('DeepSeek 用量:', ds.costEstimate())
if (finder.enabled) console.log('配图来源:', finder.stats)
