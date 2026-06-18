// 发布前质量闸门 —— 面向**HTML 玄学/命理**文章（中英双语）。命中任一硬性问题 → 不过线。
// 与 chinatravel 不同：正文是 HTML（非 markdown），内链是站内工具路径（非 /tags），双语各一套。

// 已知劣质模板指纹（AI 套话 / 洗稿痕迹），新内容绝不能命中
const FINGERPRINTS_EN = [
  [/covers everything you need to know/i, 'FP-everything'],
  [/in (this|the following) (comprehensive )?(guide|article),? (we'?ll|you'?ll|i'?ll)/i, 'FP-in-this-guide'],
  [/whether you'?re a (seasoned|first-time|beginner|complete)/i, 'FP-whether-youre'],
  [/look no further/i, 'FP-look-no-further'],
  [/as an ai language model/i, 'FP-ai-disclaimer'],
  [/(unlock|unleash|elevate|delve into) your/i, 'FP-unlock-your'],
]
const FINGERPRINTS_ZH = [
  [/作为(一个)?(AI|人工智能|语言模型)/i, 'FP-ai-disclaimer'],
  [/本文将(带你|为你|为您)/, 'FP-本文将'],
  [/在这篇文章中[，,]/, 'FP-在这篇文章中'],
  [/小编|公众号|关注我们|点击(关注|上方|蓝字)|扫码|二维码|原文链接|阅读原文/, 'FP-公众号残留'],
  [/转发(朋友圈|分享)|点赞(在看|关注)/, 'FP-引流'],
  [/添加(微信|VX|vx|威信)|私(信|聊)|加(老师|大师)(微信)?/, 'FP-导流私单'],
]

function cjkCount(s) { return (s.match(/[一-龥]/g) || []).length }

/** 正文 HTML 里 FAQ 区（## 常见问题 / FAQ 之后）的 <h3> 问答对数量 */
export function countFaqPairs(html) {
  if (!html) return 0
  // FAQ 标题（h2）之后到下一个 h2/article 结束之间的 <h3> 计数
  const m = html.match(/<h2[^>]*>\s*(?:FAQ|Frequently Asked Questions|常见问题|常见疑问)[\s\S]*?<\/h2>([\s\S]*?)(?=<h2|<\/article>|$)/i)
  const region = m ? m[1] : ''
  const h3 = (region.match(/<h3[^>]*>.*?<\/h3>/gi) || []).length
  return h3
}

/**
 * 检查一篇合成文（单语）是否达标。
 * @param {object} doc   { title, content(HTML), description, lang }
 * @param {object} [opts]
 * @returns {{ pass, reasons[], faqPairs, len, images, links }}
 */
export function checkQuality(doc, opts = {}) {
  const lang = doc.lang || (cjkCount(doc.content || '') > (doc.content || '').length * 0.2 ? 'zh' : 'en')
  const content = doc.content || ''
  const reasons = []

  // 文本长度（剥标签后）
  const textLen = content.replace(/<[^>]+>/g, '').length
  // 中文按字符数（~1200 字），英文按字符数（~1500 词 → ~7000 字符）
  const minText = opts.minText ?? (lang === 'zh' ? 1200 : 6000)
  if (textLen < minText) reasons.push(`THIN:${textLen}<${minText}`)

  // 指纹：zh 文查中文套话；en 文查英文套话 + 中文残留（公众号引流/洗稿痕迹）
  const fps = lang === 'zh' ? FINGERPRINTS_ZH : [...FINGERPRINTS_EN, ...FINGERPRINTS_ZH]
  for (const [re, name] of fps) {
    if (re.test(content)) reasons.push(`FINGERPRINT:${name}`)
  }
  // 英文文残留过多中文 → 翻译不彻底
  if (lang === 'en') {
    const cjk = cjkCount(content)
    if (cjk > textLen * 0.05) reasons.push(`HIGH-CJK:${cjk}`)
  }

  // FAQ：正文 <h2>FAQ/常见问题</h2> 下 <h3> ≥2；或 frontmatter faq[] ≥2
  const fmFaq = Array.isArray(doc.faq)
    ? doc.faq.filter(f => f && (f.question || '').length >= 3 && (f.answer || '').length >= 8).length
    : 0
  const bodyFaq = countFaqPairs(content)
  const faqPairs = Math.max(fmFaq, bodyFaq)
  if (opts.requireFaq !== false && faqPairs < 2) reasons.push(`FAQ:${faqPairs}<2`)

  // 标题 / 描述
  if (!doc.title || doc.title.length < 6) reasons.push('TITLE:too-short')
  const desc = doc.description || ''
  if (desc.length < 40) reasons.push('DESC:too-short')
  if (desc.length > 170) reasons.push(`DESC:too-long:${desc.length}`)

  // 配图占位：<img src="IMG:..."> ≥3
  const imgPlaceholders = (content.match(/<img[^>]+src=["']\s*IMG:[^"']*["']/gi) || []).length
  if (opts.requireImages !== false && imgPlaceholders < 3) reasons.push(`IMG:${imgPlaceholders}<3`)

  // 站内工具内链：href="/<tool>" ≥1（排除 http 外链）
  const internalLinks = (content.match(/href=["']\/(tarot|dream|horoscope|astro|numerology|rune|bazi|ziwei|naming|wuge|meihua|qimen|almanac|lingqian|love|face-reading|mbti|synastry|daily-fortune|daily-card|pet-psychic|ai-mystic|blog)[^"']*["']/gi) || []).length
  if (opts.requireLinks !== false && internalLinks < 1) reasons.push(`LINKS:${internalLinks}<1`)

  return { pass: reasons.length === 0, reasons, faqPairs, len: textLen, images: imgPlaceholders, links: internalLinks }
}
