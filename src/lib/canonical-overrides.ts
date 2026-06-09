// ─── 规范页合并映射（去重 / 防自我蚕食）────────────────────────────────────────
// key = 次要（重复）文章 slug，value = 应作为规范页的主文章 slug。
// 命中后：详情页 canonical 指向主文章、sitemap 排除该次要 slug、JSON-LD 指向主文章。
// 次要文章仍可访问（不 404、不删内容），但把排名信号集中到主文章，消除互相蚕食。
//
// 依据 GSC 2026-06-09：以下两组为真重复（同语言同意图）。
// 注意：英文 dates / survival-guide / per-sign 三篇属不同意图，未纳入。
export const CANONICAL_OVERRIDES: Record<string, string> = {
  // 中文「2026 水星逆行时间表」两篇 → 合并到 slug 更简洁的主文章
  "mercury-retrograde-2026-guide": "mercury-retrograde-2026",
  // Celtic Cross 两篇 → 合并到 Google 已实际收录/排名（171 展示）的那篇，保住既有权重
  "celtic-cross-tarot-spread-guide": "celtic-cross-tarot-spread-complete-guide",
};

/** 返回某 slug 的规范 slug（无映射则返回自身） */
export function canonicalSlug(slug: string): string {
  return CANONICAL_OVERRIDES[slug] ?? slug;
}
