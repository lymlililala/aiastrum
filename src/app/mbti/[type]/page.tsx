import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerLocale } from "~/lib/serverLocale";
import { withLocale, type Locale } from "~/lib/i18n";
import { HOME_NAME } from "~/lib/seo";
import { TYPE_PROFILES, TYPE_SLUGS, typeFromSlug, LOVE_ARTICLES } from "./type-profiles";

const BASE_URL = "https://aiastrum.com";

// ── 静态生成：仅 16 个类型，未知 slug 直接 404 ────────────────────────────────
export const dynamicParams = false;

export function generateStaticParams() {
  return TYPE_SLUGS.map((type) => ({ type }));
}

// ── UI 文案（三语）───────────────────────────────────────────────────────────
const UI = {
  zh: {
    mbtiHome: "MBTI × 星座",
    traits: "核心特质",
    love: "恋爱模式",
    matches: "最佳配对",
    careers: "职业方向",
    faq: "常见问题",
    toolCta: "🪐 生成我的 MBTI × 星座宇宙档案",
    articleCta: "📖 深度长文：{TYPE} 恋爱模式完全解析",
    allTypes: "探索其他类型",
  },
  tw: {
    mbtiHome: "MBTI × 星座",
    traits: "核心特質",
    love: "戀愛模式",
    matches: "最佳配對",
    careers: "職業方向",
    faq: "常見問題",
    toolCta: "🪐 生成我的 MBTI × 星座宇宙檔案",
    articleCta: "📖 深度長文：{TYPE} 戀愛模式完全解析",
    allTypes: "探索其他類型",
  },
  en: {
    mbtiHome: "MBTI × Zodiac",
    traits: "Core Traits",
    love: "Love Style",
    matches: "Best Matches",
    careers: "Careers",
    faq: "FAQ",
    toolCta: "🪐 Generate my MBTI × Zodiac cosmic profile",
    articleCta: "📖 Deep dive: {TYPE} love patterns, fully analyzed",
    allTypes: "Explore other types",
  },
} as const;

function metaTitle(code: string, locale: Locale): string {
  if (locale === "en") return `${code} Personality: Love Style, Best Matches & Careers`;
  if (locale === "tw") return `${code} 人格解析：戀愛模式、最佳配對與職業 | MBTI`;
  return `${code} 人格解析：恋爱模式、最佳配对与职业 | MBTI`;
}

function metaKeywords(code: string, locale: Locale): string[] {
  const lower = code.toLowerCase();
  if (locale === "en") {
    return [
      `${lower} love`, `${lower} in love`, `${lower} compatibility`,
      `${lower} best match`, `${lower} relationships`, `${lower} love language`,
      `${lower} soulmate`, `${code} personality`,
    ];
  }
  return [
    `${code}恋爱`, `${code}配对`, `${code}爱情`, `${code}灵魂伴侣`,
    `${code}最佳配对`, "16型人格", "MBTI", `${code}人格`,
  ];
}

export async function generateMetadata({ params }: { params: { type: string } }): Promise<Metadata> {
  const code = typeFromSlug(params.type);
  if (!code) return {};
  const locale = await getServerLocale();
  const t = TYPE_PROFILES[code][locale];
  const url = `${BASE_URL}/mbti/${params.type.toLowerCase()}`;
  const title = metaTitle(code, locale);
  return {
    title,
    description: t.metaDesc,
    keywords: metaKeywords(code, locale),
    alternates: { canonical: url },
    openGraph: {
      title,
      description: t.metaDesc,
      type: "article",
      url,
      siteName: "AiAstrum",
      images: [{ url: `${BASE_URL}/images/og-cover.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t.metaDesc,
      images: [`${BASE_URL}/images/og-cover.png`],
    },
  };
}

export default async function MbtiTypePage({ params }: { params: { type: string } }) {
  const code = typeFromSlug(params.type);
  if (!code) notFound();

  const locale = await getServerLocale();
  const profile = TYPE_PROFILES[code];
  const t = profile[locale];
  const ui = UI[locale];
  const url = `${BASE_URL}/mbti/${params.type.toLowerCase()}`;
  const title = metaTitle(code, locale);
  const articlePath = LOVE_ARTICLES[code];

  // ── 结构化数据 ──────────────────────────────────────────────────────────────
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": t.metaDesc,
    "url": url,
    "inLanguage": locale === "en" ? "en" : locale === "tw" ? "zh-TW" : "zh-CN",
    "author": { "@type": "Organization", "name": "AiAstrum", "url": BASE_URL },
    "publisher": {
      "@type": "Organization",
      "name": "AiAstrum",
      "url": BASE_URL,
      "logo": { "@type": "ImageObject", "url": `${BASE_URL}/images/logo.png` },
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": HOME_NAME[locale], "item": `${BASE_URL}/${locale}` },
      { "@type": "ListItem", "position": 2, "name": ui.mbtiHome, "item": `${BASE_URL}${withLocale(locale, "/mbti")}` },
      { "@type": "ListItem", "position": 3, "name": code, "item": url },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": t.faq.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  const sectionTitle: React.CSSProperties = {
    fontFamily: "var(--font-cinzel), serif", fontSize: "1.05rem", fontWeight: 700,
    color: "#e8d5a3", margin: "34px 0 12px", paddingBottom: 8,
    borderBottom: "1px solid rgba(201,168,76,0.15)", letterSpacing: "0.03em",
  };
  const para: React.CSSProperties = {
    fontSize: "0.9rem", color: "rgba(200,175,140,0.82)", lineHeight: 1.85, marginBottom: 12,
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Nav + 面包屑 */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(10,6,28,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(201,168,76,0.12)", padding: "0 20px", height: 52, display: "flex", alignItems: "center", gap: 8, fontSize: "0.78rem" }}>
        <Link href={`/${locale}`} style={{ color: "rgba(201,168,76,0.6)", textDecoration: "none" }}>{HOME_NAME[locale]}</Link>
        <span style={{ color: "rgba(201,168,76,0.3)" }}>›</span>
        <Link href={withLocale(locale, "/mbti")} style={{ color: "rgba(201,168,76,0.75)", textDecoration: "none" }}>{ui.mbtiHome}</Link>
        <span style={{ color: "rgba(201,168,76,0.3)" }}>›</span>
        <span style={{ color: "rgba(232,213,163,0.85)" }}>{code}</span>
      </nav>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "36px 20px 80px" }}>
        {/* Header：类型码 + 昵称 */}
        <header style={{ marginBottom: 8 }}>
          <div style={{ fontSize: "0.68rem", color: "rgba(201,168,76,0.55)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
            MBTI · 16 Personalities
          </div>
          <h1 style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "clamp(1.5rem,4vw,2.1rem)", fontWeight: 700, color: "#e8d5a3", lineHeight: 1.3, marginBottom: 10 }}>
            <span style={{ color: profile.color }}>{code}</span>
            {" "}{t.nickname}
          </h1>
          <p style={{ fontSize: "0.84rem", color: "rgba(200,175,140,0.62)", lineHeight: 1.6, marginBottom: 12 }}>{t.metaDesc}</p>
        </header>

        {/* CTA：回到 MBTI × 星座工具 */}
        <Link href={withLocale(locale, "/mbti")} style={{ textDecoration: "none", display: "block", margin: "20px 0 8px" }}>
          <div style={{ borderRadius: 14, background: "linear-gradient(135deg,rgba(201,168,76,0.14),rgba(100,60,200,0.14))", border: "1px solid rgba(201,168,76,0.35)", padding: "14px 18px", color: "rgba(232,213,163,0.92)", fontWeight: 600, fontSize: "0.88rem", textAlign: "center" }}>
            {ui.toolCta} →
          </div>
        </Link>

        {/* 核心特质 */}
        <h2 style={sectionTitle}>✦ {code} {ui.traits}</h2>
        <ul style={{ margin: "0 0 12px", paddingLeft: 20 }}>
          {t.traits.map((tr, i) => (
            <li key={i} style={{ ...para, marginBottom: 6 }}>{tr}</li>
          ))}
        </ul>

        {/* 恋爱模式 */}
        <h2 style={sectionTitle}>💞 {code} {ui.love}</h2>
        <p style={para}>{t.love}</p>

        {/* 深度文章（有恋爱长文的类型） */}
        {articlePath && (
          <Link href={articlePath} style={{ textDecoration: "none", display: "block", margin: "6px 0 8px" }}>
            <div style={{ borderRadius: 12, background: "rgba(16,10,38,0.8)", border: "1px solid rgba(201,168,76,0.3)", padding: "14px 16px", color: "rgba(232,213,163,0.9)", fontWeight: 600, fontSize: "0.85rem" }}>
              {ui.articleCta.replace("{TYPE}", code)} →
            </div>
          </Link>
        )}

        {/* 最佳配对 */}
        <h2 style={sectionTitle}>💘 {code} {ui.matches}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,220px),1fr))", gap: 10 }}>
          {t.matches.map((m) => (
            <Link key={m.type} href={`/mbti/${m.type.toLowerCase()}`} style={{ textDecoration: "none" }}>
              <div style={{ borderRadius: 12, background: "rgba(16,10,38,0.8)", border: "1px solid rgba(201,168,76,0.15)", padding: "12px 14px", height: "100%" }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: TYPE_PROFILES[m.type].color, marginBottom: 4 }}>
                  {m.type} · {TYPE_PROFILES[m.type][locale].nickname}
                </div>
                <div style={{ fontSize: "0.78rem", color: "rgba(200,175,140,0.75)", lineHeight: 1.6 }}>{m.why}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* 职业方向 */}
        <h2 style={sectionTitle}>💼 {code} {ui.careers}</h2>
        <p style={para}>{t.careers}</p>

        {/* FAQ */}
        <h2 style={sectionTitle}>❓ {ui.faq}</h2>
        {t.faq.map((f, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "rgba(232,213,163,0.88)", marginBottom: 5 }}>{f.q}</h3>
            <p style={para}>{f.a}</p>
          </div>
        ))}

        {/* 其他类型 */}
        <h2 style={sectionTitle}>🧭 {ui.allTypes}</h2>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {TYPE_SLUGS.filter((s) => s !== params.type.toLowerCase()).map((s) => (
            <Link key={s} href={`/mbti/${s}`} style={{ textDecoration: "none" }}>
              <span style={{ display: "inline-block", fontSize: "0.68rem", padding: "4px 12px", borderRadius: 20, border: "1px solid rgba(201,168,76,0.25)", color: "rgba(232,213,163,0.75)", letterSpacing: "0.05em" }}>
                {s.toUpperCase()}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
