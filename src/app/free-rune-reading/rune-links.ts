// ── 符文名 → 单符文博客文章 slug 映射 ──────────────────────────────
// slug 来自博客库实际数据（/tmp/db-slugs2.json，category = "rune"）。
// 键为 rune-data.ts 中 name 字段的小写形式；Wyrd（空白符文）无对应文章，
// 解析不到时回退到总览指南。

export const RUNE_GUIDE_SLUG = "elder-futhark-runes-guide";

const RUNE_BLOG_SLUGS: Record<string, string> = {
  fehu:     "fehu-rune-meaning-wealth-abundance",
  uruz:     "uruz-rune-meaning-strength-vitality",
  thurisaz: "thurisaz-rune-meaning-protection-conflict",
  ansuz:    "ansuz-rune-odin-communication-wisdom",
  raidho:   "raidho-rune-meaning-journey-movement",
  kenaz:    "kenaz-rune-meaning-knowledge-creativity",
  gebo:     "gebo-rune-meaning-gift-partnership",
  wunjo:    "wunjo-rune-joy-belonging-wishes-fulfilled",
  hagalaz:  "hagalaz-rune-disruption-transformation",
  nauthiz:  "nauthiz-rune-need-resistance-necessity",
  isa:      "isa-rune-meaning-stillness-clarity",
  jera:     "jera-rune-harvest-patience-natural-cycles",
  eihwaz:   "eihwaz-rune-meaning-transformation-endurance",
  perthro:  "perthro-rune-fate-mystery-luck",
  algiz:    "algiz-rune-protection-spiritual-guidance",
  sowilo:   "sowilo-rune-victory-sun-wholeness",
  tiwaz:    "tiwaz-rune-justice-sacrifice-victory",
  berkano:  "berkano-rune-meaning-birth-growth",
  ehwaz:    "ehwaz-rune-meaning-partnership-trust",
  mannaz:   "mannaz-rune-self-humanity-consciousness",
  laguz:    "laguz-rune-water-intuition-flow",
  ingwaz:   "ingwaz-rune-inner-fire-completion-rest",
  dagaz:    "dagaz-rune-dawn-breakthrough-awakening",
  othala:   "othala-rune-heritage-home-belonging",
};

/** 按符文北欧专名（如 "Fehu"）解析博客文章 slug，无对应文章时返回 null */
export function runeBlogSlug(runeName: string): string | null {
  return RUNE_BLOG_SLUGS[runeName.toLowerCase()] ?? null;
}
