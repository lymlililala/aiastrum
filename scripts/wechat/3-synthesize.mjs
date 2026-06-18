// 3) 合成：逐簇取成员源文全文（中文），DeepSeek 综合提炼成一篇全新原创**中文 HTML** 命理科普，
//    再翻译/本地化出**英文 HTML** 版 —— 产出中英双语草稿（同一选题，成 hreflang 对）。
// 用法：node scripts/wechat/3-synthesize.mjs
//       node scripts/wechat/3-synthesize.mjs --limit 1   # 只合成前 1 簇试跑
//       node scripts/wechat/3-synthesize.mjs --zh-only   # 只产中文（省一半钱试跑）

import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { DeepSeek } from './deepseek.mjs'
import { truncate } from './lib/clean-html.mjs'
import { slugify } from './lib/slug.mjs'
import { loadExistingPosts, isDuplicate } from './lib/dedup.mjs'
import { fetchSources } from './lib/sources.mjs'
import { DATA_DIR } from './lib/env.mjs'
import { normalizeCategory, ctaFor } from './lib/categories.mjs'

function arg(name, def) {
  const i = process.argv.indexOf(name)
  return i === -1 ? def : process.argv[i + 1]
}
const LIMIT = arg('--limit', null) ? Number(arg('--limit', null)) : null
const ZH_ONLY = process.argv.includes('--zh-only')
const DAYS = Number(arg('--days', 14))

function clampDesc(s, max = 160) {
  const desc = (s || '').trim()
  return desc.length <= max ? desc : desc.slice(0, max).replace(/[\s,;:。，、]+$/, '')
}

const CLU = join(DATA_DIR, 'clusters.json')
const OUT = join(DATA_DIR, 'drafts.json')
if (!existsSync(CLU)) { console.error('缺少 clusters.json，先跑 2-cluster.mjs'); process.exit(1) }

const sources = await fetchSources({ sinceDays: DAYS })
const bySn = new Map(sources.map(s => [s.sn, s]))
let clusters = JSON.parse(readFileSync(CLU, 'utf8'))
if (LIMIT) clusters = clusters.slice(0, LIMIT)

const ds = new DeepSeek()

// ── 中文合成 system prompt ───────────────────────────────────────────────────
const SYS_ZH = (category, ctaHref) => `你是 aiastrum（玄学/命理科普站）的资深作者。
我会给你几篇同一主题的中文公众号文章作为**参考素材**。请综合提炼，写成一篇**全新原创**、结构清晰、专业可信的**中文科普文章**。

铁律：
1. 这是综合再创作，不是逐篇翻译或洗稿。绝不照搬任何一篇的段落或结构，要重新组织、提炼共识、加入自己的逻辑框架。不得出现"本文/小编/公众号/关注/扫码/原文链接/加微信"等字样。
2. 内容要中立、科普、理性：把命理/占卜作为传统文化与自我觉察工具来介绍，不做绝对化的吉凶断言、不承诺改运、不制造焦虑、不诱导付费消灾。
3. 正文用 **HTML**（不是 markdown），严格遵循本站方言：
   - 用 <article> 包裹整篇。开头 <h1>标题</h1>，紧接一段 <p>导语</p>。
   - 章节用 <h2>，子节用 <h3>；要点列表用 <ul><li>…</li></ul>；需要时可用 <p><strong>关键词</strong>…</p>。
   - 不编造事实（不杜撰具体数字、年份、出处）；不确定的用定性描述。
   - 内容要扎实有深度，分多个 <h2> 章节（概念、方法/步骤、含义/释义、常见误区、实践建议等），不要注水。
4. 在正文自然插入 **2-3 个站内工具内链**（HTML <a>），首选与本文最相关的工具页 ${ctaHref}，也可链 /blog。例如：<a href="${ctaHref}">立即体验</a>。不要编造其它路径。
5. 在正文自然位置插入 **3-5 张配图占位**，必须严格用这个语法（真实图片稍后填充，不要自己编 URL）：
   <img src="IMG:英文视觉关键词" alt="对这张图画面的具体中文描述">
   - alt 要像图注一样具体描述画面；IMG: 后给 1-3 个英文关键词命名主体，例如 (IMG:tarot cards spread) (IMG:full moon night sky) (IMG:amethyst crystal)。
   - 不要把图放进表格或 FAQ 里。
6. 结尾必须有 <h2>常见问题</h2>，下面 **≥3 组** <h3>问题</h3><p>答案</p>。
7. 篇幅：中文正文 1200-2000 字，写到上限附近，真有信息量。

只返回 JSON：
{
 "slug":"干净的英文小写连字符 slug，≤6 词，以主题开头，无日期无随机后缀（如 tarot-major-arcana-guide）",
 "title":"中文标题（吸引人、含主题词）",
 "title_en":"对应英文标题",
 "description":"中文 meta 描述，60-150 字，一句话，无省略号",
 "content":"完整 HTML 正文（<article>…，含 3-5 个 <img src=\\"IMG:…\\">，2-3 个站内 <a> 内链，结尾 <h2>常见问题</h2>）",
 "keywords":["3-8 个关键词，中英混合"],
 "reading_time":整数分钟,
 "category":"${category}"
}`

// ── 英文本地化 system prompt（输入：中文 HTML 草稿）───────────────────────────
const SYS_EN = (ctaHref) => `You are a bilingual editor for aiastrum, an English-language mysticism / Chinese-metaphysics site.
You will receive an original Chinese HTML article (tarot / astrology / bazi / dream interpretation, etc.). Produce a faithful but natural **English** version.

RULES:
1. Localize, don't word-for-word translate. The English must read as native, well-structured prose for an international audience curious about these topics. No leftover Chinese characters anywhere in the body.
2. Keep the SAME HTML structure: <article>, <h1>, <h2>/<h3>, <ul>, the FAQ section (translate "常见问题" → "Frequently Asked Questions", keep each <h3>question</h3><p>answer</p>).
3. Keep ALL image placeholders EXACTLY as-is in count and position, but you may rewrite the alt text in English. Format stays: <img src="IMG:english keywords" alt="english caption">.
4. Keep the internal site link(s); the primary tool link is ${ctaHref}. Rewrite anchor text in English. Do not invent other paths.
5. For Chinese-specific terms (八字, 紫微斗数, 奇门遁甲, 梅花易数…) give the English name with pinyin on first mention, e.g. Bazi (八字, the Four Pillars).
6. Same neutral, educational tone — no absolute fortune-telling claims, no fear-mongering.

Return ONLY JSON:
{
 "title_en":"English title (compelling, 40-70 chars)",
 "description_en":"English meta description, 80-155 chars, one sentence, no trailing ellipsis",
 "content_en":"full English HTML body (mirrors the Chinese structure, same image placeholders, FAQ as <h2>Frequently Asked Questions</h2> + <h3>/<p> pairs)"
}`

const drafts = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : []
const doneTopics = new Set(drafts.map(d => d._topic))

const existingPosts = await loadExistingPosts()
if (existingPosts) console.log(`判重库：mysticai_blog_posts 已有 ${existingPosts.length} 篇`)
console.log(`开始合成 ${clusters.length} 簇${ZH_ONLY ? '（仅中文）' : '（中英双发）'} …\n`)
let skippedDup = 0

for (const c of clusters) {
  if (doneTopics.has(c.topic)) { console.log(`✓ 已合成跳过: ${c.topic}`); continue }
  const members = (c.sources || []).map(s => bySn.get(s.sn)).filter(Boolean)
  if (members.length < 2) { console.log(`✗ 源文不足跳过: ${c.topic}`); continue }

  // 判重
  const dup = await isDuplicate(c, existingPosts, ds)
  if (dup.dup) { console.log(`⊘ 判重跳过: ${c.working_title}  [${dup.reason}] ↔ ${dup.match || ''}`); skippedDup++; continue }

  const category = normalizeCategory(c.suggested_category)
  const cta = ctaFor(category)

  const material = members
    .map((m, i) => `### 素材 ${i + 1}：${m.title}（公众号：${m.account}）\n${truncate(m.body_text, 5000)}`)
    .join('\n\n---\n\n')
  const userMsg = `主题：${c.topic}\n建议标题：${c.working_title}\n角度：${c.angle}\n分类：${category}\n建议关键词：${(c.suggested_tags || []).join('、')}\n\n参考素材（中文）：\n\n${material}`

  console.log(`合成中: ${c.working_title}  (${members.length} 源文, ${category})`)
  try {
    // ① 中文 HTML
    const zh = await ds.chatJSON(
      [{ role: 'system', content: SYS_ZH(category, cta.href) }, { role: 'user', content: userMsg }],
      { maxTokens: 12000, temperature: 0.6 }
    )
    zh.category = normalizeCategory(zh.category || category)
    zh.slug = slugify(zh.slug || c.working_title_en || c.working_title)
    zh.description = clampDesc(zh.description)
    zh.keywords = Array.isArray(zh.keywords) && zh.keywords.length ? zh.keywords : (c.suggested_tags || [])
    zh.reading_time = zh.reading_time || Math.max(3, Math.round((zh.content || '').replace(/<[^>]+>/g, '').length / 400))

    const draft = {
      slug_core: zh.slug,
      category: zh.category,
      title_zh: zh.title,
      title_en: zh.title_en,
      description_zh: zh.description,
      content_zh: zh.content,
      keywords: zh.keywords,
      reading_time: zh.reading_time,
      cta_href: cta.href,
      cta_label: cta.zh,
      cta_label_en: cta.en,
      _topic: c.topic,
      _sources: members.map(m => ({ sn: m.sn, account: m.account, title: m.title, url: m.content_url })),
    }

    // ② 英文本地化（除非 --zh-only）
    if (!ZH_ONLY) {
      const en = await ds.chatJSON(
        [{ role: 'system', content: SYS_EN(cta.href) }, { role: 'user', content: `Original Chinese article:\n\n${zh.content}\n\nProposed English title: ${zh.title_en}` }],
        { maxTokens: 12000, temperature: 0.5 }
      )
      draft.title_en = en.title_en || zh.title_en
      draft.description_en = clampDesc(en.description_en)
      draft.content_en = en.content_en
    }

    drafts.push(draft)
    writeFileSync(OUT, JSON.stringify(drafts, null, 2))
    const enLen = draft.content_en ? `${draft.content_en.length} en` : '无英文'
    console.log(`  ✓ ${draft.slug_core}  zh ${(draft.content_zh || '').length} 字符 / ${enLen}`)
  } catch (e) {
    console.log(`  ✗ 合成失败: ${e.message}`)
  }
}

console.log(`\n已写入 ${OUT}（共 ${drafts.length} 条草稿，本次判重跳过 ${skippedDup}）`)
console.log('用量:', ds.costEstimate())
console.log('⚠️  抽查 drafts.json 1 条（中英 HTML 结构 / 原创度 / FAQ / 图片占位 / 内链），再跑 4-publish.mjs')
