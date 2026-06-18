// 22 个站内 category → CTA + 工具路径映射。
// 取值直接对齐 mysticai_blog_posts 现有文章的真实 cta_href/cta_label/cta_label_en，
// 让流水线产出的文章 CTA 与站内既有文章风格一致。
// 供 2-cluster 校验 category、3-synthesize 生成内链、4-publish 填 CTA 字段。

// 每条：{ href, zh:中文CTA, en:英文CTA }。href 同时用作正文内链目标。
export const CATEGORY_CTA = {
  tarot:          { href: '/tarot',         zh: '👉 立即抽取塔罗牌，AI 为你解读',            en: 'Draw Tarot Cards — AI Reading' },
  dream:          { href: '/dream',         zh: '👉 用 AI 解析你昨晚的梦，探索潜意识',       en: 'Decode Your Dream with AI Now' },
  horoscope:      { href: '/horoscope',     zh: '👉 查看你的星座运势详解',                  en: 'Check Your Horoscope Now' },
  astro:          { href: '/astro',         zh: '👉 免费生成你的专属星盘，AI 深度解读',       en: 'Generate Your Free Birth Chart Now' },
  numerology:     { href: '/numerology',    zh: '👉 输入生日，立即计算你的生命灵数',         en: 'Calculate Your Life Path Number Free' },
  rune:           { href: '/rune',          zh: '👉 立即抽取卢恩符文，获得指引',            en: 'Draw a Free Rune Reading Now' },
  bazi:           { href: '/bazi',          zh: '☯ 输入你的生辰八字，AI 解读运势',          en: 'Read Your Bazi with AI' },
  ziwei:          { href: '/ziwei',         zh: '👉 免费生成你的紫微斗数命盘',              en: 'Get Your Zi Wei Chart Free' },
  naming:         { href: '/naming',        zh: '👉 输入生辰，AI 为你甄选诗意好名字',        en: 'AI Chinese Name Generator' },
  wuge:           { href: '/wuge',          zh: '👉 输入姓名，查看五格数理与吉凶分析',        en: 'Analyze Your Name with Five Pillars' },
  meihua:         { href: '/meihua',        zh: '👉 用梅花心易为当前困惑占一卦',            en: 'Meihua Yi Shu — Cast Your Reading' },
  qimen:          { href: '/qimen',         zh: '👉 一键生成奇门遁甲盘，查看当下吉凶',        en: 'Generate Qi Men Chart — Auspicious Timing' },
  almanac:        { href: '/almanac',       zh: '👉 查看今日老黄历，宜忌一目了然',           en: "Check Today's Chinese Almanac" },
  lingqian:       { href: '/lingqian',      zh: '👉 虔诚求签，获得观音菩萨的指引',           en: 'Draw Your Fortune Stick — Divine Guidance' },
  love:           { href: '/love',          zh: '👉 三维解析你的命中正缘特征与相遇时机',      en: 'Decode Your Soulmate Profile — Love Oracle' },
  'face-reading': { href: '/face-reading',  zh: '👉 上传照片，AI 扫描面相解读你的天赋密码',   en: 'AI Face Reading — Decode Your Destiny' },
  mbti:           { href: '/mbti',          zh: '👉 MBTI × 星座，生成你的专属人格档案',      en: 'MBTI × Zodiac — Your Personality Profile' },
  synastry:       { href: '/synastry',      zh: '👉 输入双方生日，分析星盘爱情契合度',        en: 'Check Love Compatibility — Synastry Chart' },
  'daily-fortune':{ href: '/daily-fortune', zh: '👉 基于你的五行，获取今日开运指南',         en: 'Get Your Daily Fortune — Lucky Color & Number' },
  'daily-card':   { href: '/daily-card',    zh: '👉 抽取今日宇宙提示卡，开启觉知的一天',      en: 'Draw Your Daily Cosmic Card Now' },
  'pet-psychic':  { href: '/pet-psychic',   zh: '👉 上传宠物照片，解读毛孩子的内心世界',      en: "Pet Psychic Reading — What's On Your Pet's Mind?" },
  'ai-mystic':    { href: '/ai-mystic',     zh: '👉 向 AI 塔罗师倾诉烦恼，获得温柔指引',      en: 'Chat with AI Mystic — Empathetic Guidance' },
  // 中文 category（站内既有）
  '风水':         { href: '/almanac',       zh: '👉 查看风水黄历，趋吉避凶',                en: 'Check the Feng Shui Almanac' },
  '水晶':         { href: '/daily-card',    zh: '👉 抽取今日提示卡，连接水晶能量',           en: 'Pull Your Free Daily Card' },
  '冥想':         { href: '/daily-card',    zh: '👉 抽取今日提示卡，开始一次正念冥想',        en: 'Pull Your Free Daily Card' },
}

// 合法 category 列表（聚类必须落在其中）
export const VALID_CATEGORIES = Object.keys(CATEGORY_CTA)

// 兜底：未知 category 归 ai-mystic（站内通用解忧入口）
export function ctaFor(category) {
  return CATEGORY_CTA[category] || CATEGORY_CTA['ai-mystic']
}

// 把任意模型给出的 category 归一到合法集合（小写、去空白；不命中则 ai-mystic）
export function normalizeCategory(c) {
  const k = String(c || '').trim()
  if (CATEGORY_CTA[k]) return k
  const lower = k.toLowerCase()
  if (CATEGORY_CTA[lower]) return lower
  return 'ai-mystic'
}
