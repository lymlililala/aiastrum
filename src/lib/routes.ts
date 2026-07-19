/**
 * routes.ts — 带语言前缀的"基路径"登记表
 *
 * Phase 2:工具页、信息页、博客列表拥有 /zh /en /tw 独立 URL。
 * middleware 用 isPrefixedRoute() 决定哪些无前缀路径要 301 到带前缀版、
 * 哪些带前缀路径要 rewrite 回物理无前缀页面;sitemap 用这些列表展开三语 URL。
 *
 * 注意:博客详情 /blog/{slug} 与 topic pillar /blog/topic/... 不在此列(本阶段保持无前缀)。
 */

/** 28 个工具页(与 sitemap toolRoutes 对齐,不含 /blog 与信息页) */
export const TOOL_PATHS = [
  "/tarot",
  "/horoscope",
  "/daily-fortune",
  "/daily-card",
  "/bazi",
  "/ziwei",
  "/astro",
  "/moon-sign-calculator",
  "/rising-sign-calculator",
  "/venus-sign-calculator",
  "/life-path-calculator",
  "/yes-no-tarot",
  "/free-rune-reading",
  "/ai-mystic",
  "/synastry",
  "/love",
  "/naming",
  "/numerology",
  "/mbti",
  "/dream",
  "/face-reading",
  "/meihua",
  "/qimen",
  "/wuge",
  "/rune",
  "/lingqian",
  "/almanac",
  "/pet-psychic",
] as const;

/** 信息 / 法律页面 */
export const INFO_PATHS = ["/about", "/contact", "/privacy", "/terms"] as const;

/**
 * 所有需要语言前缀的基路径。`/blog` 仅指列表页(精确匹配),
 * `/blog/{slug}`、`/blog/topic/...` 不在内。
 */
export const PREFIXED_BASE: readonly string[] = [
  ...TOOL_PATHS,
  ...INFO_PATHS,
  "/blog",
];

/** 该无前缀路径是否应迁移到带语言前缀的规范 URL */
export function isPrefixedRoute(path: string): boolean {
  return PREFIXED_BASE.includes(path);
}
