// ─── noindex 登记表 ─────────────────────────────────────────────────────────
// 依据 2026-07-18 薄内容审计（scripts/p2-thin-audit.mjs + GSC 0718 交叉）：
// 以下文章 <200 词且 3 个月内 GSC 零展示，属薄内容矩阵残次品，
// 保留 URL 可访问但不参与索引（robots: noindex, follow），避免拉低整站质量评估。
// sun-in-house 等同矩阵但有展示的页面不在此列（留作扩写对象）。
export const NOINDEX_SLUGS: ReadonlySet<string> = new Set([
  // mercury-in-sign 矩阵（11 篇，全部零展示）
  "mercury-in-sagittarius-meaning",
  "mercury-in-aquarius-meaning",
  "mercury-in-leo-meaning",
  "mercury-in-capricorn-meaning",
  "mercury-in-libra-meaning",
  "mercury-in-scorpio-meaning",
  "mercury-in-virgo-meaning",
  "mercury-in-gemini-meaning",
  "mercury-in-cancer-meaning",
  "mercury-in-pisces-meaning",
  "mercury-in-taurus-meaning",
  // jupiter-in-sign（2 篇）
  "jupiter-in-leo-meaning",
  "jupiter-in-virgo-meaning",
  // saturn-in-sign（4 篇）
  "saturn-in-sagittarius-meaning",
  "saturn-in-libra-meaning",
  "saturn-in-virgo-meaning",
  "saturn-in-gemini-meaning",
]);
