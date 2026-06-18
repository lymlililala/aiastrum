// 合成前判重 —— 防止生成与站内已有文章（mysticai_blog_posts）重复的选题。
//   ① 归一化 slug/标题精确查（零成本）。
//   ② DeepSeek 近似判重：候选选题 vs 库内同类目标题列表，问是否“实质重复”。
// 无 Supabase（本地无 key）时返回 null，永不阻断流程（由质量闸门兜底）。

import { hasSupabase, getSupabase } from './supabase.mjs'
import { slugify } from './slug.mjs'

/** 取库内已有文章的 {slug,title,title_en,category}[]。无库返回 null。 */
export async function loadExistingPosts() {
  if (!hasSupabase()) return null
  const sb = getSupabase()
  const out = []
  for (let from = 0; ; from += 1000) {
    const { data, error } = await sb
      .from('mysticai_blog_posts')
      .select('slug,title,title_en,category')
      .range(from, from + 999)
    if (error) throw new Error(`mysticai_blog_posts 读取失败: ${error.message}`)
    out.push(...data)
    if (data.length < 1000) break
  }
  return out
}

function normTitle(t) {
  return (t || '').toLowerCase().replace(/[^a-z0-9一-龥]+/g, ' ').trim()
}

/**
 * 判断候选选题是否与库内已有文章重复。
 * @param {object} cluster   { working_title, working_title_en, topic, suggested_category }
 * @param {Array}  existing  loadExistingPosts() 结果
 * @param {object} ds        DeepSeek 实例（近似判重；可空 → 仅精确查）
 * @returns {Promise<{dup, reason?, match?}>}
 */
export async function isDuplicate(cluster, existing, ds) {
  if (!existing || !existing.length) return { dup: false }
  const titles = [cluster.working_title, cluster.working_title_en, cluster.topic].filter(Boolean)
  const candSlug = slugify(cluster.working_title_en || cluster.working_title || cluster.topic || '')
  const candNorms = titles.map(normTitle).filter(Boolean)

  // ① 精确查（slug + 中/英标题）
  for (const p of existing) {
    if (candSlug && p.slug === candSlug) return { dup: true, reason: 'slug-exact', match: p.slug }
    const pn = normTitle(p.title)
    const pne = normTitle(p.title_en)
    if (candNorms.some(c => c && (c === pn || c === pne))) return { dup: true, reason: 'title-exact', match: p.title }
  }

  // ② DeepSeek 近似判重（仅与同类目、标题词有重叠的候选比，省 token）
  if (!ds) return { dup: false }
  const cat = cluster.suggested_category
  const candWords = new Set(candNorms.flatMap(c => c.split(' ')).filter(w => w.length > 2))
  const shortlist = existing
    .filter(p => !cat || p.category === cat)
    .map(p => {
      const words = (normTitle(p.title) + ' ' + normTitle(p.title_en)).split(' ')
      return { p, overlap: words.filter(w => candWords.has(w)).length }
    })
    .filter(x => x.overlap >= 2)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 25)
    .map(x => x.p.title_en || x.p.title)
  if (!shortlist.length) return { dup: false }

  const sys = `You are a content de-duplication checker for a mysticism / Chinese-metaphysics site ` +
    `(tarot, astrology, bazi, dream interpretation, etc.). Decide if a PROPOSED new article would ` +
    `substantially duplicate any EXISTING article (same subject + same angle). A different subject, ` +
    `card, sign, or angle is NOT a duplicate. Return ONLY JSON: ` +
    `{"duplicate":boolean,"match":"the existing title or empty","why":"short"}`
  const user = `PROPOSED title: ${cluster.working_title || cluster.working_title_en}\n` +
    `PROPOSED topic: ${cluster.topic}\nCategory: ${cat || ''}\n\n` +
    `EXISTING titles:\n${shortlist.map((t, i) => `${i + 1}. ${t}`).join('\n')}`
  try {
    const r = await ds.chatJSON([{ role: 'system', content: sys }, { role: 'user', content: user }], { maxTokens: 200 })
    if (r && r.duplicate) return { dup: true, reason: `llm:${r.why || 'similar'}`, match: r.match || '' }
  } catch {
    // 判重失败不阻断（宁可生成、由质量闸门兜底）
  }
  return { dup: false }
}
