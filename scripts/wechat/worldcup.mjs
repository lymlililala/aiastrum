// 热点专题：世界杯 × 玄学（娱乐引流向）。独立于 nightly 常青流水线，手动跑。
// 蹭「世界杯+星座/塔罗/生肖/开运」搜索热度，内容走娱乐文化解读（不赌赛果、不碰博彩、明确免责）。
// 搜次幂源文作参考 → DeepSeek 合成中英双语 HTML → 配图 → upsert mysticai_blog_posts。
//
// 用法：
//   node scripts/wechat/worldcup.mjs --dry-run     # 预览（合成+评分，不写库）
//   node scripts/wechat/worldcup.mjs               # 实发
//   node scripts/wechat/worldcup.mjs --limit 1     # 只做第 1 篇

import { writeFileSync, existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { CimiClient } from './cimidata/client.mjs'
import { DeepSeek } from './deepseek.mjs'
import { htmlToText, truncate } from './lib/clean-html.mjs'
import { slugify } from './lib/slug.mjs'
import { checkQuality } from './lib/quality.mjs'
import { ImageFinder, fallbackImageUrl } from './lib/images.mjs'
import { ctaFor } from './lib/categories.mjs'
import { getSupabase, hasSupabase } from './lib/supabase.mjs'
import { DATA_DIR } from './lib/env.mjs'

function arg(name, def) {
  const i = process.argv.indexOf(name)
  if (i === -1) return def
  const v = process.argv[i + 1]
  return v && !v.startsWith('--') ? v : true
}
const DRY = arg('--dry-run', false) === true
const LIMIT = arg('--limit', null) ? Number(arg('--limit', null)) : null
const THRESHOLD = Number(arg('--threshold', 68)) // 娱乐热点文阈值放宽（不按常青严标）
const TABLE = 'mysticai_blog_posts'
const YEAR = '2026'

// 选题：蹭不同搜索词，各归对应 category
const TOPICS = [
  { slug: 'zodiac-world-cup-team-personalities', category: 'horoscope',
    title_zh: `十二星座看世界杯：${YEAR}世界杯32强的“球队星座性格”娱乐观赛指南`,
    title_en: `Zodiac & the World Cup: A Fun Star-Sign Guide to the ${YEAR} Teams`,
    search: ['世界杯 星座', '世界杯 运势'] },
  { slug: 'tarot-world-cup-major-arcana', category: 'tarot',
    title_zh: `塔罗牌看世界杯：用大阿卡纳读懂${YEAR}绿茵场的命运叙事`,
    title_en: `Tarot & the World Cup: Reading the ${YEAR} Pitch Through the Major Arcana`,
    search: ['世界杯 塔罗', '世界杯 占卜'] },
  { slug: 'chinese-zodiac-world-cup-lucky-guide', category: 'daily-fortune',
    title_zh: `生肖球迷的世界杯开运指南：属相、幸运色与观赛仪式感`,
    title_en: `Chinese Zodiac World Cup Lucky Guide: Signs, Colors & Match-Day Rituals`,
    search: ['世界杯 生肖', '世界杯 开运'] },
  { slug: 'world-cup-night-owl-self-care-crystals', category: '水晶',
    title_zh: `世界杯熬夜党的玄学自我关怀：水晶、颜色与作息的趣味开运`,
    title_en: `World Cup Night-Owl Self-Care: Crystals, Colors & Rhythm`,
    search: ['世界杯 风水', '世界杯 水晶'] },
]

// 只取与玄学/球队相关、较新的源文标题作灵感（不照搬，娱乐文更多靠创意框架）
function looksRelevant(it) {
  const t = (it.title || '').replace(/<[^>]+>/g, '')
  if (/星座|塔罗|生肖|占卜|运势|玄学|水晶|风水|属相|开运|球星|球队|世界杯/.test(t)) {
    // 排除纯体育资讯/旧年份
    if (/2014|2018|2022/.test(t)) return false
    return true
  }
  return false
}

const SYS_ZH = (topic, ctaHref) => `你是 aiastrum（玄学/命理科普站）的资深作者，要写一篇**蹭 ${YEAR} 世界杯热点、面向球迷的趣味娱乐文**（中文 HTML）。

定位与铁律：
1. 这是**娱乐文化向**内容：把星座/塔罗/生肖/开运等玄学元素与世界杯结合，写得轻松、有梗、好读、适合球迷转发分享。
2. **明确免责**：正文必须有一处清楚说明——本文纯属星座/玄学文化娱乐，**不预测真实赛果、不构成任何投注或博彩建议**，理性观赛、量力而行。绝不诱导赌球/投注。
3. **不做绝对断言**（不说"某队必夺冠/某星座一定旺"），用"有趣的是""传统说法认为""不妨当个乐子"等娱乐化表述。
4. 标题与正文自然融入"${YEAR}世界杯"等热词，但不堆砌；内容要真有看点（结合星座性格/牌意/生肖特质做有创意的解读），不是空话。
5. 正文用 **HTML**：<article> 包裹，<h1>标题</h1> + 一段导语 <p>，章节 <h2>、子节 <h3>，要点用 <ul><li>；不编造具体比分/赔率/球员隐私。
6. 自然插入 **2-3 个站内工具内链**（<a href="${ctaHref}">…</a> 或 /blog），不编造其它路径。
7. 插入 **3-5 张配图占位**，严格用：<img src="IMG:英文视觉关键词" alt="中文图注">（关键词如 soccer stadium crowd、football pitch night、zodiac wheel）。不放进表格/FAQ。
8. 结尾必须有 <h2>常见问题</h2> + ≥3 组 <h3>问</h3><p>答</p>（含一条"这能预测比赛结果吗？"→明确否、娱乐向）。
9. 篇幅：中文 1200-1800 字。

只返回 JSON：
{"title":"中文标题","title_en":"英文标题","description":"中文meta描述60-150字","content":"完整HTML正文","keywords":["关键词中英混合，含 world cup / 2026"],"reading_time":整数}`

const SYS_EN = (ctaHref) => `You are a bilingual editor for aiastrum. Localize this Chinese World-Cup × astrology FUN article into natural English HTML for an international audience.
RULES: keep the SAME structure (<article>,<h1>,<h2>/<h3>,<ul>, FAQ as <h2>Frequently Asked Questions</h2>+<h3>/<p>); keep ALL <img src="IMG:..."> placeholders (rewrite alt in English); keep the internal link(s) (primary ${ctaHref}); keep the entertainment disclaimer (NOT a prediction, NOT betting advice); no leftover Chinese; light, fun tone.
Return ONLY JSON: {"title_en":"...","description_en":"80-155 chars","content_en":"full English HTML"}`

function clampDesc(s, max = 158) { const d = (s || '').trim(); return d.length <= max ? d : d.slice(0, max).replace(/[\s,;:。，、]+$/, '') }

async function resolveImages(html, finder, seed0 = 0) {
  const used = new Set(); let seed = seed0; let out = html || ''
  const matches = [...out.matchAll(/<img[^>]*\bsrc=["']\s*IMG:\s*([^"']*)["'][^>]*\balt=["']([^"']*)["'][^>]*>|<img[^>]*\balt=["']([^"']*)["'][^>]*\bsrc=["']\s*IMG:\s*([^"']*)["'][^>]*>/gi)]
  for (const m of matches) {
    const kw = (m[1] ?? m[4] ?? '').trim(); const alt = (m[2] ?? m[3] ?? '').trim()
    let url = null
    if (finder.enabled) { const hit = await finder.find(kw, alt); if (hit) url = hit.url }
    if (!url) url = fallbackImageUrl(`${kw} ${alt}`, used, seed++)
    out = out.replace(m[0], `<img src="${url}" alt="${alt}" loading="lazy">`)
  }
  return out
}

let topics = LIMIT ? TOPICS.slice(0, LIMIT) : TOPICS
const cimi = new CimiClient()
const ds = new DeepSeek()
const finder = new ImageFinder()
if (!finder.enabled) console.log('⚠️  未配置图库 key，配图走兜底池。')
if (!DRY && !hasSupabase()) { console.error('缺少 SUPABASE_SECRET_KEY（或加 --dry-run）'); process.exit(1) }

const OUT = join(DATA_DIR, 'worldcup.json')
const done = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : []
const nowIso = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')
let pub = 0

for (const t of topics) {
  console.log(`\n=== ${t.title_zh} (${t.category}) ===`)
  // 1) 搜源文作灵感（拉 2-4 篇正文）
  const refs = []
  for (const kw of t.search) {
    try {
      const items = (await cimi.searchArticles(kw, { page: 1 })).filter(looksRelevant).slice(0, 3)
      for (const it of items) {
        if (refs.length >= 4) break
        try { const html = await cimi.articleBody(it.content_url); const body = htmlToText(html); if (body && body.length > 300) refs.push({ title: (it.title || '').replace(/<[^>]+>/g, ''), body }) } catch {}
      }
    } catch (e) { console.log(`  搜索 ${kw} 失败: ${e.code || e.message}`) }
  }
  console.log(`  参考源文 ${refs.length} 篇，余额 ${cimi.balance}`)
  const cta = ctaFor(t.category)
  const material = refs.length
    ? refs.map((r, i) => `### 参考 ${i + 1}：${r.title}\n${truncate(r.body, 2500)}`).join('\n\n---\n\n')
    : '（无参考源文，请基于星座/塔罗/生肖常识与世界杯背景自由创作）'
  const userMsg = `选题：${t.title_zh}\n分类：${t.category}\n\n参考素材（中文，仅作灵感，不要照搬）：\n\n${material}`

  try {
    // 2) 中文合成
    const zh = await ds.chatJSON([{ role: 'system', content: SYS_ZH(t, cta.href) }, { role: 'user', content: userMsg }], { maxTokens: 9000, temperature: 0.75 })
    zh.description = clampDesc(zh.description)
    // 3) 英文本地化
    const en = await ds.chatJSON([{ role: 'system', content: SYS_EN(cta.href) }, { role: 'user', content: `Original Chinese article:\n\n${zh.content}\n\nProposed English title: ${zh.title_en || t.title_en}` }], { maxTokens: 9000, temperature: 0.65 })

    // 4) 质量闸门（关 requireLinks 严格度不变；娱乐文同样要 FAQ/图/长度）
    const qz = checkQuality({ title: zh.title || t.title_zh, content: zh.content, description: zh.description, lang: 'zh' })
    const qe = checkQuality({ title: en.title_en || t.title_en, content: en.content_en, description: en.description_en, lang: 'en' })
    console.log(`  闸门 zh:${qz.pass ? '✅' : '❌' + qz.reasons.join(',')} en:${qe.pass ? '✅' : '❌' + qe.reasons.join(',')}`)
    if (!qz.pass || !qe.pass) { console.log('  ⚠️ 闸门未过，跳过'); continue }

    // 5) 配图
    const enSlug = t.slug
    const zhSlug = `${t.slug}-zh`
    const zhHtml = await resolveImages(zh.content, finder, t.slug.length)
    const enHtml = await resolveImages(en.content_en, finder, t.slug.length + 1)
    const kw = Array.isArray(zh.keywords) && zh.keywords.length ? zh.keywords : ['world cup 2026', t.category]
    const rt = zh.reading_time || 6

    const rows = [
      { slug: zhSlug, category: t.category, lang: 'zh', title: zh.title || t.title_zh, title_en: en.title_en || t.title_en, description: zh.description, keywords: kw, published_at: nowIso, reading_time: rt, content: zhHtml, cta_href: cta.href, cta_label: cta.zh, cta_label_en: cta.en, updated_at: new Date().toISOString() },
      { slug: enSlug, category: t.category, lang: 'en', title: en.title_en || t.title_en, title_en: en.title_en || t.title_en, description: clampDesc(en.description_en) || zh.description, keywords: kw, published_at: nowIso, reading_time: rt, content: enHtml, cta_href: cta.href, cta_label: cta.zh, cta_label_en: cta.en, updated_at: new Date().toISOString() },
    ]

    if (DRY) {
      console.log(`  [dry] 将 upsert: zh:${zhSlug} / en:${enSlug}  图占位 zh${(zh.content.match(/IMG:/g)||[]).length}`)
    } else {
      const sb = getSupabase()
      const { error } = await sb.from(TABLE).upsert(rows, { onConflict: 'slug' })
      if (error) { console.log(`  ✗ upsert 失败: ${error.message}`); continue }
      console.log(`  ✓ 已发布 zh:${zhSlug} / en:${enSlug}`)
      done.push({ slug: enSlug, zhSlug, category: t.category, at: nowIso }); writeFileSync(OUT, JSON.stringify(done, null, 2))
      pub++
    }
  } catch (e) { console.log(`  ✗ 失败: ${e.message}`) }
}

console.log(`\n${DRY ? '[DRY] ' : ''}完成：发布 ${pub} 组`)
console.log('DeepSeek 用量:', ds.costEstimate(), '| 配图:', finder.stats)
