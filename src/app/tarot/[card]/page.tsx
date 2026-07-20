import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TAROT_CARDS, type TarotCard } from "~/app/tarot-data";
import { CARD_MEANINGS } from "../card-meanings";
import { type CardMeaningLocale } from "../card-meanings/types";
import { CARD_BY_SLUG, cardSlug } from "../card-slug";
import { getServerLocale } from "~/lib/serverLocale";
import { withLocale, type Locale } from "~/lib/i18n";
import { HOME_NAME } from "~/lib/seo";

const BASE_URL = "https://aiastrum.com";

// ── 静态生成：仅 78 张牌，未知 slug 直接 404 ──────────────────────────────────
export const dynamicParams = false;

export function generateStaticParams() {
  return [...CARD_BY_SLUG.keys()].map((card) => ({ card }));
}

// ── UI 文案（三语；繁体复用简体牌意正文，仅 chrome 用繁体）─────────────────────
const UI = {
  zh: {
    overview: "牌面与核心含义", upright: "正位解读", reversed: "逆位解读",
    general: "综合", love: "爱情", career: "事业", finance: "财运",
    advice: "这张牌给你的建议", faq: "常见问题", related: "相关牌",
    tarotHome: "塔罗占卜", drawCta: "🔮 立即免费抽一张塔罗牌",
    uprightTag: "正位", reversedTag: "逆位",
    keywords: "关键词",
  },
  tw: {
    overview: "牌面與核心含義", upright: "正位解讀", reversed: "逆位解讀",
    general: "綜合", love: "愛情", career: "事業", finance: "財運",
    advice: "這張牌給你的建議", faq: "常見問題", related: "相關牌",
    tarotHome: "塔羅占卜", drawCta: "🔮 立即免費抽一張塔羅牌",
    uprightTag: "正位", reversedTag: "逆位",
    keywords: "關鍵詞",
  },
  en: {
    overview: "Imagery & Core Meaning", upright: "Upright Meaning", reversed: "Reversed Meaning",
    general: "General", love: "Love", career: "Career", finance: "Money",
    advice: "Advice from This Card", faq: "FAQ", related: "Related Cards",
    tarotHome: "Tarot Reading", drawCta: "🔮 Draw a Free Tarot Card Now",
    uprightTag: "Upright", reversedTag: "Reversed",
    keywords: "Keywords",
  },
} as const;

const SUIT_LABEL: Record<string, { zh: string; tw: string; en: string }> = {
  wands: { zh: "权杖", tw: "權杖", en: "Wands" },
  cups: { zh: "圣杯", tw: "聖杯", en: "Cups" },
  swords: { zh: "宝剑", tw: "寶劍", en: "Swords" },
  pentacles: { zh: "星币", tw: "星幣", en: "Pentacles" },
};

function pickLocale(locale: Locale, m: { zh: CardMeaningLocale; en: CardMeaningLocale }): CardMeaningLocale {
  return locale === "en" ? m.en : m.zh; // tw 回退简体牌意
}

export async function generateMetadata({ params }: { params: { card: string } }): Promise<Metadata> {
  const meaning = CARD_MEANINGS[params.card];
  const base = CARD_BY_SLUG.get(params.card);
  if (!meaning || !base) return {};
  const locale = await getServerLocale();
  const t = pickLocale(locale, meaning);
  const url = `${BASE_URL}/tarot/${params.card}`;
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    keywords: locale === "en"
      ? [...base.keywords, base.name, base.nameCn, `${base.name} tarot`, `${base.name} reversed`, `${base.name} tarot card meaning`]
      : [...base.keywords, base.name, base.nameCn],
    alternates: { canonical: url },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      type: "article",
      url,
      siteName: "AiAstrum",
      images: [{ url: `${BASE_URL}/images/og-cover.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.metaTitle,
      description: t.metaDesc,
      images: [`${BASE_URL}/images/og-cover.png`],
    },
  };
}

// 相关牌：同花色按序号相邻（大阿尔卡纳按编号相邻），最多 4 张
function relatedCards(base: TarotCard): TarotCard[] {
  const v = parseInt(base.value, 10);
  const same = TAROT_CARDS.filter(
    (c) => c.id !== base.id && c.type === base.type && (base.type === "major" || c.suit === base.suit),
  );
  const byDist = same
    .map((c) => ({ c, d: Math.abs(parseInt(c.value, 10) - v) }))
    .sort((a, b) => a.d - b.d);
  return byDist.slice(0, 4).map((x) => x.c);
}

function cardDisplayName(base: TarotCard, locale: Locale): string {
  return locale === "en" ? base.name : `${base.nameCn}（${base.name}）`;
}

export default async function TarotCardPage({ params }: { params: { card: string } }) {
  const meaning = CARD_MEANINGS[params.card];
  const base = CARD_BY_SLUG.get(params.card);
  if (!meaning || !base) notFound();

  const locale = await getServerLocale();
  const t = pickLocale(locale, meaning);
  const ui = UI[locale];
  const url = `${BASE_URL}/tarot/${params.card}`;
  const name = cardDisplayName(base, locale);
  const related = relatedCards(base);

  // ── 结构化数据 ──────────────────────────────────────────────────────────────
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t.metaTitle,
    "description": t.metaDesc,
    "url": url,
    "inLanguage": locale === "en" ? "en" : "zh-CN",
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
      { "@type": "ListItem", "position": 2, "name": ui.tarotHome, "item": `${BASE_URL}${withLocale(locale, "/tarot")}` },
      { "@type": "ListItem", "position": 3, "name": locale === "en" ? base.name : base.nameCn, "item": url },
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
  const subTitle: React.CSSProperties = {
    fontSize: "0.82rem", fontWeight: 600, color: "rgba(232,213,163,0.8)", margin: "16px 0 6px",
  };
  const para: React.CSSProperties = {
    fontSize: "0.9rem", color: "rgba(200,175,140,0.82)", lineHeight: 1.85, marginBottom: 12,
  };
  const aspectBlock = (a: { general: string[]; love: string; career: string; finance: string }) => (
    <>
      {a.general.map((p, i) => <p key={i} style={para}>{p}</p>)}
      <h3 style={subTitle}>💞 {ui.love}</h3><p style={para}>{a.love}</p>
      <h3 style={subTitle}>💼 {ui.career}</h3><p style={para}>{a.career}</p>
      <h3 style={subTitle}>💰 {ui.finance}</h3><p style={para}>{a.finance}</p>
    </>
  );

  return (
    <div style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Nav + 面包屑 */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(10,6,28,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(201,168,76,0.12)", padding: "0 20px", height: 52, display: "flex", alignItems: "center", gap: 8, fontSize: "0.78rem" }}>
        <Link href={`/${locale}`} style={{ color: "rgba(201,168,76,0.6)", textDecoration: "none" }}>{HOME_NAME[locale]}</Link>
        <span style={{ color: "rgba(201,168,76,0.3)" }}>›</span>
        <Link href={withLocale(locale, "/tarot")} style={{ color: "rgba(201,168,76,0.75)", textDecoration: "none" }}>{ui.tarotHome}</Link>
        <span style={{ color: "rgba(201,168,76,0.3)" }}>›</span>
        <span style={{ color: "rgba(232,213,163,0.85)" }}>{locale === "en" ? base.name : base.nameCn}</span>
      </nav>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "36px 20px 80px" }}>
        {/* Header：牌面 + 标题 */}
        <header style={{ display: "flex", gap: 24, alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/images/cards/${base.imageFile}`}
            alt={locale === "en" ? `${base.name} tarot card` : `${base.nameCn}塔罗牌`}
            width={180} height={300}
            style={{ width: 160, height: "auto", borderRadius: 12, border: "1px solid rgba(201,168,76,0.35)", boxShadow: "0 8px 32px rgba(100,60,200,0.25)", flexShrink: 0 }}
          />
          <div style={{ flex: 1, minWidth: 240 }}>
            {base.suit && (
              <div style={{ fontSize: "0.68rem", color: "rgba(201,168,76,0.55)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
                {SUIT_LABEL[base.suit]?.[locale]}
              </div>
            )}
            <h1 style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "clamp(1.5rem,4vw,2.1rem)", fontWeight: 700, color: "#e8d5a3", lineHeight: 1.3, marginBottom: 10 }}>
              {name}
            </h1>
            <p style={{ fontSize: "0.84rem", color: "rgba(200,175,140,0.62)", lineHeight: 1.6, marginBottom: 12 }}>{t.metaDesc}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {base.keywords.map((k) => (
                <span key={k} style={{ fontSize: "0.66rem", padding: "3px 10px", borderRadius: 20, border: "1px solid rgba(201,168,76,0.25)", color: "rgba(232,213,163,0.7)" }}>{k}</span>
              ))}
            </div>
          </div>
        </header>

        {/* CTA */}
        <Link href={withLocale(locale, "/tarot")} style={{ textDecoration: "none", display: "block", margin: "20px 0 8px" }}>
          <div style={{ borderRadius: 14, background: "linear-gradient(135deg,rgba(201,168,76,0.14),rgba(100,60,200,0.14))", border: "1px solid rgba(201,168,76,0.35)", padding: "14px 18px", color: "rgba(232,213,163,0.92)", fontWeight: 600, fontSize: "0.88rem", textAlign: "center" }}>
            {ui.drawCta} →
          </div>
        </Link>

        {/* 概述 */}
        <h2 style={sectionTitle}>{ui.overview}</h2>
        {t.overview.map((p, i) => <p key={i} style={para}>{p}</p>)}

        {/* 正位 */}
        <h2 style={sectionTitle}>▲ {locale === "en" ? `${base.name} ${ui.upright}` : ui.upright}</h2>
        {aspectBlock(t.upright)}

        {/* 逆位 */}
        <h2 style={sectionTitle}>▽ {locale === "en" ? `${base.name} ${ui.reversed}` : ui.reversed}</h2>
        {aspectBlock(t.reversed)}

        {/* 建议 */}
        <h2 style={sectionTitle}>✦ {ui.advice}</h2>
        <p style={para}>{t.advice}</p>

        {/* FAQ */}
        <h2 style={sectionTitle}>❓ {ui.faq}</h2>
        {t.faq.map((f, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "rgba(232,213,163,0.88)", marginBottom: 5 }}>{f.q}</h3>
            <p style={para}>{f.a}</p>
          </div>
        ))}

        {/* 相关牌 */}
        <h2 style={sectionTitle}>🃏 {ui.related}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,160px),1fr))", gap: 10 }}>
          {related.map((r) => {
            const rSlug = cardSlug(r.name);
            return (
              <Link key={r.id} href={`/tarot/${rSlug}`} style={{ textDecoration: "none" }}>
                <div style={{ borderRadius: 12, background: "rgba(16,10,38,0.8)", border: "1px solid rgba(201,168,76,0.15)", padding: "12px 10px", textAlign: "center" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/cards/${r.imageFile}`}
                    alt={locale === "en" ? `${r.name} tarot card` : `${r.nameCn}塔罗牌`}
                    width={64} height={107}
                    loading="lazy"
                    style={{ width: 56, height: "auto", borderRadius: 6, margin: "0 auto 8px", display: "block" }}
                  />
                  <div style={{ fontSize: "0.76rem", color: "#e8d5a3", fontWeight: 600 }}>{cardDisplayName(r, locale)}</div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 延伸阅读：牌阵学习（助力 celtic-cross 停滞排名） */}
        <div style={{ marginTop: 28, fontSize: "0.8rem", lineHeight: 2 }}>
          <span style={{ color: "rgba(201,168,76,0.5)" }}>✦ </span>
          <Link href="/blog/celtic-cross-tarot-spread-complete-guide" style={{ color: "rgba(232,201,106,0.85)", textDecoration: "underline", textDecorationColor: "rgba(201,168,76,0.35)", textUnderlineOffset: 3 }}>
            {locale === "en" ? "Learn the Celtic Cross spread" : "学习凯尔特十字牌阵"}
          </Link>
          <span style={{ color: "rgba(201,168,76,0.3)", margin: "0 10px" }}>·</span>
          <Link href="/blog/topic/tarot-spreads" style={{ color: "rgba(232,201,106,0.85)", textDecoration: "underline", textDecorationColor: "rgba(201,168,76,0.35)", textUnderlineOffset: 3 }}>
            {locale === "en" ? "All tarot spreads" : "塔罗牌阵大全"}
          </Link>
        </div>
      </div>
    </div>
  );
}
