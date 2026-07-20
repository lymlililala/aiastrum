// ─── 规范页合并映射（去重 / 防自我蚕食）────────────────────────────────────────
// key = 次要（重复）文章 slug，value = 应作为规范页的主文章 slug。
// 命中后：详情页 canonical 指向主文章、sitemap 排除该次要 slug、JSON-LD 指向主文章。
// 次要文章仍可访问（不 404、不删内容），但把排名信号集中到主文章，消除互相蚕食。
//
// 依据 GSC 2026-06-09：以下两组为真重复（同语言同意图）。
// 注意：英文 dates / survival-guide / per-sign 三篇属不同意图，未纳入。
//
// 2026-07-18 依据 GSC 0718 数据扩充：规范页一律选「该查询集群下展示量最高的页面」。
// 例外说明（有意不映射）：
// - leo-rising-personality-complete-guide 独立排第 19 位（8 展示），与其规范页查询不同，保留
// - taurus-rising 两篇展示量相近且都弱（17 vs 2），暂不映射
// - chiron-healing-wound-astrology 有个词排第 9 位，保留
// - twin-flame-vs-soulmate / twin-flame-tarot-reading-guide / aries|scorpio-rising-*-combinations 属不同意图，保留
export const CANONICAL_OVERRIDES: Record<string, string> = {
  // 中文「2026 水星逆行时间表」两篇 → 合并到 slug 更简洁的主文章
  "mercury-retrograde-2026-guide": "mercury-retrograde-2026",
  // Celtic Cross 两篇 → 合并到 Google 已实际收录/排名（192 展示 pos34）的那篇，保住既有权重
  "celtic-cross-tarot-spread-guide": "celtic-cross-tarot-spread-complete-guide",

  // ── 天使数字：NNN-angel-number-meaning 握有全部展示量 ──
  "333-angel-number-deeper-meaning": "333-angel-number-meaning",
  "angel-number-333-meaning": "333-angel-number-meaning",
  "angel-number-444-meaning": "444-angel-number-meaning",
  "angel-number-555-meaning": "555-angel-number-meaning",
  "angel-number-777-meaning": "777-angel-number-meaning",
  "angel-number-888-meaning": "888-angel-number-meaning",
  "angel-number-999-meaning": "999-angel-number-meaning",
  "angel-number-1111-meaning": "1111-angel-number-meaning",
  "angel-numbers-guide-all-meanings": "angel-numbers-meaning",
  "angel-numbers-guide-meanings": "angel-numbers-meaning",

  // ── 生命灵数：life-path-number-N-meaning-guide 为规范页 ──
  "life-path-1-numerology-meaning": "life-path-number-1-meaning-guide",
  "life-path-2-numerology-meaning": "life-path-number-2-meaning-guide",
  "life-path-3-numerology-meaning": "life-path-number-3-meaning-guide",
  "life-path-4-numerology-meaning": "life-path-number-4-meaning-guide",
  "life-path-5-numerology-meaning": "life-path-number-5-meaning-guide",
  "life-path-6-numerology-meaning": "life-path-number-6-meaning-guide",
  "life-path-7-numerology-meaning": "life-path-number-7-meaning-guide",
  "life-path-8-numerology-meaning": "life-path-number-8-meaning-guide",
  "life-path-9-numerology-meaning": "life-path-number-9-meaning-guide",
  "numerology-life-path-complete-guide": "life-path-number-complete-guide",

  // ── Twin flame：meaning 类合并到 what-is-a-twin-flame；signs 类保留 signs-explained ──
  "twin-flame-meaning-signs-stages": "what-is-a-twin-flame",
  "twin-flame-journey-complete-guide": "what-is-a-twin-flame",
  "twin-flame-signs-and-stages": "twin-flame-signs-explained",

  // ── 上升星座：-rising-sign-meaning 系列为规范页 ──
  // 例外（2026-07-18 批次4）：金牛反向合并——personality-complete 握有全部展示（17 vs 2），作规范页
  "taurus-rising-sign-meaning": "taurus-rising-personality-complete",
  "aries-rising-personality-traits": "aries-rising-sign-meaning",
  "gemini-rising-personality-complete": "gemini-rising-sign-meaning",
  "cancer-rising-personality-complete": "cancer-rising-sign-meaning",
  "virgo-rising-personality-complete": "virgo-rising-sign-meaning",
  "virgo-rising-personality-complete-guide": "virgo-rising-sign-meaning",
  "libra-rising-personality-complete": "libra-rising-sign-meaning",
  "scorpio-rising-personality-traits": "scorpio-rising-sign-meaning",
  "pisces-rising-personality-complete": "pisces-rising-sign-meaning",

  // ── 其他单点重复 ──
  "death-in-dreams-meaning": "death-dream-meaning",
  // 火梦两篇同意图（fire dream meaning + house on fire）：合并到展示量更高的 burning 版
  "dream-about-fire-meaning": "dream-about-fire-house-burning",
  // 透石膏两篇同意图：合并到已扩写的 cleansing 版
  "selenite-crystal-properties-uses": "selenite-crystal-cleansing-properties-guide",
  "taurus-zodiac-sign-personality-traits": "taurus-personality-traits-complete-guide",
  // GSC 0719：capricorn 性格两篇同意图且均零展示，合并到 slug 更简洁的 guide 版（与 taurus 同模式）
  "capricorn-zodiac-sign-personality-traits": "capricorn-personality-traits-guide",
  "chakra-system-seven-chakras-complete": "chakras-explained-beginners-guide",
  "venus-in-scorpio-meaning": "venus-in-scorpio-love-guide",
  "venus-in-scorpio-love-meaning": "venus-in-scorpio-love-guide",
  "black-tourmaline-protection-meaning": "black-tourmaline-protection-grounding-guide",
  "black-tourmaline-protection-guide": "black-tourmaline-protection-grounding-guide",
  "chiron-in-natal-chart-wound-healer": "chiron-in-astrology-complete-guide",
  "chiron-astrology-wounded-healer": "chiron-in-astrology-complete-guide",
  "crystals-for-protection-negative-energy": "crystals-for-protection",
  "meditation-for-beginners": "beginners-guide-to-meditation",
  "beginner-meditation-guide-how-to-start": "beginners-guide-to-meditation",
  "meditation-for-beginners-complete-guide": "beginners-guide-to-meditation",

  // ── GSC 0720：狮子座 2026 年运两篇英文同意图 ──
  // 合并到 slug/keywords 精确命中 "leo 2026 yearly horoscope"(pos 51)的主文章
  "horoscope-leo-2026-annual-complete": "leo-2026-yearly-horoscope",
  // 天蝎座 2026 年运两篇英文同意图（与 leo 同模式）
  "horoscope-scorpio-2026-annual-complete": "scorpio-2026-yearly-horoscope",
  // 南北交点两篇英文同意图：合并到 slug 更简洁的主文章
  "north-node-south-node-astrology-guide": "north-node-south-node-astrology",
  // 冥想对比两篇同意图：合并到精确命中查询词 "mindful meditation vs transcendental"(pos 31)的新文
  "transcendental-meditation-vs-mindfulness": "mindful-meditation-vs-transcendental",
};

/** 返回某 slug 的规范 slug（无映射则返回自身） */
export function canonicalSlug(slug: string): string {
  return CANONICAL_OVERRIDES[slug] ?? slug;
}
