// 玄学配图 —— 按关键词搜图（热链 CDN），含相关性校验 + 关键词降级 + 缓存。
// 主力 Pexels（覆盖广、配额大），未命中回退 Unsplash；两家都搜不到/不相关时返回 null，
// 由调用方回退到写死玄学图池，保证文章一定有图、且不塞错图。
// 公众号 mmbiz 图防盗链，无法在本站显示，故一律不用。

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { loadEnv, DATA_DIR } from './env.mjs'

const CACHE_FILE = join(DATA_DIR, 'image-cache.json')

// 相关性校验时忽略的停用词（只看实义词：tarot/moon/crystal/zodiac… 是否命中）
const STOPWORDS = new Set(['the', 'a', 'an', 'of', 'in', 'at', 'on', 'and', 'to', 'view', 'with',
  'photo', 'image', 'background', 'beautiful', 'mystic', 'mystical', 'spiritual', 'magic', 'magical',
  'summer', 'winter', 'autumn', 'spring', 'sunset', 'sunrise', 'night', 'day', 'dark', 'light'])

function loadCache() {
  if (!existsSync(CACHE_FILE)) return {}
  try { return JSON.parse(readFileSync(CACHE_FILE, 'utf8')) } catch { return {} }
}
function saveCache(c) {
  mkdirSync(DATA_DIR, { recursive: true })
  writeFileSync(CACHE_FILE, JSON.stringify(c, null, 2))
}

function terms(s) {
  return (s || '').toLowerCase().match(/[a-z]{3,}/g)?.filter(w => !STOPWORDS.has(w)) || []
}

/** 相关性：查询里的实义词，至少有一个出现在结果描述里，才算真命中 */
function isRelevant(query, desc) {
  const qt = terms(query)
  if (!qt.length) return false
  const dt = new Set(terms(desc))
  return qt.some(w => dt.has(w))
}

const sleep = ms => new Promise(r => setTimeout(r, ms))

// ── 各图源适配器：search(query) → [{ url, desc, credit?, downloadLocation? }] ──

class PexelsSource {
  constructor(key) { this.key = key; this.name = 'pexels' }
  async search(query) {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=8&orientation=landscape`
    const res = await fetch(url, { headers: { Authorization: this.key } })
    if (res.status === 429) throw { rateLimited: true }
    if (!res.ok) return []
    const json = await res.json()
    return (json.photos || []).map(p => ({
      url: p.src?.large || p.src?.original,
      desc: p.alt || '',
      credit: p.photographer || ''
    })).filter(p => p.url)
  }
}

class UnsplashSource {
  constructor(key) { this.key = key; this.name = 'unsplash' }
  async search(query) {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=8&orientation=landscape`
    const res = await fetch(url, { headers: { Authorization: `Client-ID ${this.key}` } })
    if (res.status === 403 || res.status === 429) throw { rateLimited: true }
    if (!res.ok) return []
    const json = await res.json()
    return (json.results || []).map(p => {
      const base = p.urls?.raw || p.urls?.regular || ''
      const url = base ? `${base}${base.includes('?') ? '&' : '?'}w=1200&q=85&fit=crop` : ''
      return {
        url,
        desc: p.description || p.alt_description || '',
        credit: p.user?.name || '',
        downloadLocation: p.links?.download_location || ''
      }
    }).filter(p => p.url)
  }
}

/**
 * 统一配图客户端：Pexels 优先 → Unsplash 回退。
 * find(keyword, alt) → { url, source, credit } | null
 */
export class ImageFinder {
  constructor(opts = {}) {
    loadEnv()
    const pk = opts.pexelsKey || process.env.PEXELS_API_KEY
    const uk = opts.unsplashKey || process.env.UNSPLASH_ACCESS_KEY
    this.sources = []
    if (pk) this.sources.push(new PexelsSource(pk))
    if (uk) this.sources.push(new UnsplashSource(uk))
    this.enabled = this.sources.length > 0
    this.unsplashKey = uk || null
    this.cache = loadCache()
    this.used = new Set()
    this.disabled = new Set()
    this.stats = { pexels: 0, unsplash: 0, miss: 0, calls: 0 }
  }

  async _search(source, query) {
    const ck = `${source.name}:${query}`
    if (this.cache[ck]) return this.cache[ck]
    let photos = []
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        this.stats.calls++
        photos = await source.search(query)
        break
      } catch (e) {
        if (e && e.rateLimited) { this.disabled.add(source.name); return [] }
        await sleep(700 * (attempt + 1))
      }
    }
    this.cache[ck] = photos
    saveCache(this.cache)
    return photos
  }

  /** 合规：Unsplash 用图前 ping 一次 download_location（失败不影响展示） */
  async _pingDownload(loc) {
    if (!loc || !this.unsplashKey) return
    try { await fetch(`${loc}&client_id=${this.unsplashKey}`) } catch { /* 忽略 */ }
  }

  /**
   * @param {string} keyword  IMG: 后的关键词（如 "tarot cards spread"）
   * @param {string} [alt]    alt 文本，用于降级查询与相关性判断
   * @returns {Promise<{url,source,credit}|null>}
   */
  async find(keyword, alt = '') {
    if (!this.enabled) return null
    const kw = (keyword || '').trim()
    const core = terms(kw).slice(0, 2).join(' ')
    const altCore = terms(alt).slice(0, 2).join(' ')
    const queries = [...new Set([kw, core, altCore].filter(q => q && q.length >= 3))]

    for (const source of this.sources) {
      if (this.disabled.has(source.name)) continue
      for (const q of queries) {
        const photos = await this._search(source, q)
        const pick = photos.find(p => !this.used.has(p.url) && isRelevant(kw, p.desc))
        if (pick) {
          this.used.add(pick.url)
          this.stats[source.name]++
          if (source.name === 'unsplash') await this._pingDownload(pick.downloadLocation)
          return { url: pick.url, source: source.name, credit: pick.credit }
        }
      }
    }
    this.stats.miss++
    return null
  }
}

// ── 写死玄学图池（全部 Unsplash photo ID，已逐个 fetch 验证返回 200）──────────
// 用于搜图未命中时兜底，保证文章一定有图。按主题分组，输出端按关键词匹配主题。
export const IMG_THEMES = {
  moon:    ['1419242902214-272b3f66ee7a', '1502134249126-9f3755a50d78', '1532968961962-8a0cb3a2d4f5', '1444703686981-a3abbc4d4fe3'],
  tarot:   ['1551582045-6ec9c11d8697', '1505506874110-6a7a69069a08', '1610296669228-602fa827fc1f'],
  crystal: ['1518621736915-f3b1c41bfd00', '1454496522488-7a8e488e8606', '1528459801416-a9e53bbf4e17'],
  candle:  ['1507272931001-fc06c17e4f43', '1513151233558-d860c5398176', '1543722530-d2c3201371e7'],
  zodiac:  ['1499728603263-13726abce5fd', '1462331940025-496dfbfc7564', '1531686264889-56fdcabd163f'],
  temple:  ['1519681393784-d120267933ba', '1516483638261-f4dbaf036963', '1564466809058-bf4114d55352'],
  nature:  ['1490750967868-88aa4486c946', '1534447677768-be436bb09401', '1485827404703-89b55fcc595e', '1446776811953-b23d57bd21aa'],
  hands:   ['1507400492013-162706c8c05e', '1533294455009-a77b7557d2d1', '1499209974431-9dddcece7f88', '1472552944129-b035e9ea3744', '1513279922550-250c2129b13a'],
}
// 关键词 → 主题（占位 IMG 关键词或 alt 命中其一即归入该主题）
export const KEYWORD_THEME = [
  [/moon|star|cosmos|cosmic|galaxy|night sky|celestial|universe|nebula/i, 'moon'],
  [/tarot|card|oracle|divination|deck|arcana/i, 'tarot'],
  [/crystal|gem|amethyst|quartz|stone|chakra|healing/i, 'crystal'],
  [/candle|incense|altar|ritual|ceremony|offering|joss/i, 'candle'],
  [/zodiac|astrolog|horoscope|constellation|birth chart|natal|planet/i, 'zodiac'],
  [/temple|buddh|shrine|pagoda|monastery|guanyin|taoist|deity|god/i, 'temple'],
  [/mountain|mist|fog|forest|water|river|feng.?shui|landscape|nature|element/i, 'nature'],
  [/hand|palm|meditat|spiritual|energy|aura|prayer|zen|mindful/i, 'hands'],
]
const ALL_IDS = [...new Set(Object.values(IMG_THEMES).flat())]

export function imgUrl(id) { return `https://images.unsplash.com/photo-${id}?w=1200&q=85` }

export function themeFor(text) {
  for (const [re, theme] of KEYWORD_THEME) if (re.test(text)) return theme
  return null
}

/** 写死池兜底：给一段关键词/alt 文本挑一张不重复的图 URL（按 used 去重，确定性） */
export function fallbackImageUrl(text, used = new Set(), seed = 0) {
  const theme = themeFor(text)
  const pool = (theme && IMG_THEMES[theme]) || ALL_IDS
  const fresh = pool.filter(id => !used.has(id))
  const pickFrom = fresh.length ? fresh : pool
  const id = pickFrom[seed % pickFrom.length]
  used.add(id)
  return imgUrl(id)
}

export { ALL_IDS }
export default ImageFinder
