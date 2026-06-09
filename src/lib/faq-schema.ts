// ─── 从文章正文提取 FAQ，生成 FAQPage JSON-LD 数据 ───────────────────────────
// 仅在正文存在明确「常见问题/FAQ」小标题时才提取（避免误标导致富媒体被判作弊）。
// 兼容两种历史写法：①<h3>问</h3><p>答</p>  ②<p><strong>问</strong><br>答</p>

const FAQ_HEADING =
  /<h2[^>]*>\s*(?:[^<]*?(?:常見問題|常见问题|よくある質問|Domande frequenti|Preguntas frecuentes|Frequently Asked|FAQ|Q&amp;A|Q&A)[^<]*)<\/h2>/i;

function stripHtml(s: string): string {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** 从正文 HTML 提取 FAQ 问答对；无 FAQ 段或不足 2 条时返回 []。 */
export function extractFaqs(html: string): FaqItem[] {
  if (!html) return [];
  const m = FAQ_HEADING.exec(html);
  if (!m) return [];

  // 从 FAQ 小标题之后，截到下一个 <h2> 或文末
  let slice = html.slice(m.index + m[0].length);
  const nextH2 = slice.search(/<h2[^>]*>/i);
  if (nextH2 !== -1) slice = slice.slice(0, nextH2);

  const items: FaqItem[] = [];

  // 模式 A：<h3>问</h3><p>答</p>
  const reA = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  let a: RegExpExecArray | null;
  while ((a = reA.exec(slice)) !== null) {
    const q = stripHtml(a[1]!), ans = stripHtml(a[2]!);
    if (q && ans) items.push({ question: q, answer: ans });
  }

  // 模式 B：<p><strong>问</strong><br>答</p>
  if (items.length === 0) {
    const reB = /<p[^>]*>\s*<strong>([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>)?([\s\S]*?)<\/p>/gi;
    let b: RegExpExecArray | null;
    while ((b = reB.exec(slice)) !== null) {
      const q = stripHtml(b[1]!), ans = stripHtml(b[2]!);
      if (q && ans && q.length < 200) items.push({ question: q, answer: ans });
    }
  }

  return items.length >= 2 ? items : [];
}

/** 构造 FAQPage JSON-LD 对象；无有效 FAQ 时返回 null。 */
export function buildFaqSchema(html: string): object | null {
  const faqs = extractFaqs(html);
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer },
    })),
  };
}
