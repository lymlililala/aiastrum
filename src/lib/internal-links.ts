// ─── 文章正文自动上下文内链（Internal Linking for SEO）────────────────────────
// 在渲染文章正文前，把「正文中提到的其他文章关键词」自动替换为指向该文章的链接。
// 纯函数、无副作用、可单元测试；仅在纯文本段注入，绝不破坏既有 HTML 结构。

export interface LinkCandidate {
  slug: string;
  title: string;
  keywords: string[] | null;
}

export interface InjectOptions {
  /** 全文最多注入多少条内链 */
  maxLinks?: number;
  /** 参与构建索引的候选文章上限（控制 term 规模/性能） */
  maxCandidates?: number;
}

// 过宽 / 无意义的锚词黑名单（小写）——避免把超热词链得到处都是
const STOPWORDS = new Set([
  "tarot", "astrology", "horoscope", "zodiac", "love", "dream", "dreams",
  "meaning", "meanings", "guide", "signs", "sign", "symbol", "symbols",
  "crystal", "crystals", "rune", "runes", "numerology", "bazi", "feng shui",
  "spiritual", "spirituality", "meditation", "chakra", "chakras",
  "what is", "how to", "the meaning", "in love",
]);

// 跳过这些标签内部的文本（不在标题/链接/代码/表格里注入）
const SKIP_TAGS = new Set(["a", "h1", "h2", "h3", "h4", "h5", "h6", "code", "pre", "script", "style", "table"]);

function isCjk(s: string): boolean {
  return /[一-鿿]/.test(s);
}

/** 候选词是否够「具体」可作锚文本 */
function isUsableTerm(term: string): boolean {
  const t = term.trim().toLowerCase();
  if (!t || STOPWORDS.has(t)) return false;
  if (isCjk(t)) return t.length >= 3;       // 中文短语 ≥3 字
  return t.length >= 6 && /[a-z]/.test(t);   // 英文短语 ≥6 字符且含字母
}

/** 正则转义 */
function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

interface Term {
  term: string;
  lower: string;
  slug: string;
}

/** 从候选文章构建 {term, slug} 索引，长短语优先、去重 */
function buildIndex(candidates: LinkCandidate[], currentSlug: string, maxCandidates: number): Term[] {
  const seen = new Set<string>();
  const terms: Term[] = [];
  let used = 0;
  for (const c of candidates) {
    if (c.slug === currentSlug) continue;
    if (used >= maxCandidates) break;
    used++;
    const raw = [...(c.keywords ?? []), c.title];
    for (const k of raw) {
      if (typeof k !== "string") continue;
      const term = k.trim();
      if (!isUsableTerm(term)) continue;
      const lower = term.toLowerCase();
      if (seen.has(lower)) continue;
      seen.add(lower);
      terms.push({ term, lower, slug: c.slug });
    }
  }
  // 长 term 优先匹配，避免短词抢占
  terms.sort((a, b) => b.lower.length - a.lower.length);
  return terms;
}

/** 取标签名（小写）与是否闭合标签 */
function parseTag(tag: string): { name: string; closing: boolean; selfClosing: boolean } | null {
  const m = /^<\s*(\/?)\s*([a-zA-Z][a-zA-Z0-9]*)/.exec(tag);
  if (!m) return null;
  return {
    name: m[2]!.toLowerCase(),
    closing: m[1] === "/",
    selfClosing: /\/>\s*$/.test(tag),
  };
}

/**
 * 给文章正文 HTML 注入上下文内链。
 * @param html       文章正文 HTML
 * @param candidates 其他文章（提供 slug/title/keywords 作为链接目标与锚词）
 * @param currentSlug 当前文章 slug（排除自链）
 */
export function injectContextualLinks(
  html: string,
  candidates: LinkCandidate[],
  currentSlug: string,
  opts: InjectOptions = {},
): string {
  const maxLinks = opts.maxLinks ?? 6;
  const maxCandidates = opts.maxCandidates ?? 200;
  if (!html || candidates.length === 0 || maxLinks <= 0) return html;

  const terms = buildIndex(candidates, currentSlug, maxCandidates);
  if (terms.length === 0) return html;

  const usedTerms = new Set<string>();
  const usedSlugs = new Set<string>();
  let injected = 0;

  // 切成「标签 / 文本」段；奇数下标为标签
  const parts = html.split(/(<[^>]+>)/);
  const skipStack: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]!;
    const isTag = i % 2 === 1;

    if (isTag) {
      const t = parseTag(part);
      if (t && !t.selfClosing && SKIP_TAGS.has(t.name)) {
        if (t.closing) {
          const idx = skipStack.lastIndexOf(t.name);
          if (idx !== -1) skipStack.splice(idx, 1);
        } else {
          skipStack.push(t.name);
        }
      }
      continue;
    }

    // 文本段：在跳过区内（标题/链接/代码等）不处理
    if (skipStack.length > 0 || injected >= maxLinks) continue;

    const orig = part;
    // 在「不可变的原文」上收集互不重叠的匹配，最后一次性重建，避免改写后误匹配已注入的锚点
    const claims: Array<{ start: number; end: number; slug: string; matched: string }> = [];
    for (const { term, lower, slug } of terms) {
      if (injected >= maxLinks) break;
      if (usedTerms.has(lower) || usedSlugs.has(slug)) continue;

      const re = new RegExp(escapeRegExp(term), "i");
      const m = re.exec(orig);
      if (!m) continue;

      const start = m.index;
      const end = start + m[0].length;
      // 与已认领区间重叠则跳过
      if (claims.some(c => start < c.end && end > c.start)) continue;

      claims.push({ start, end, slug, matched: m[0] });
      usedTerms.add(lower);
      usedSlugs.add(slug);
      injected++;
    }

    if (claims.length === 0) continue;

    claims.sort((a, b) => a.start - b.start);
    let out = "";
    let cursor = 0;
    for (const c of claims) {
      out += orig.slice(cursor, c.start);
      out += `<a href="/blog/${c.slug}" class="blog-inline-link">${c.matched}</a>`;
      cursor = c.end;
    }
    out += orig.slice(cursor);
    parts[i] = out;
  }

  return parts.join("");
}
