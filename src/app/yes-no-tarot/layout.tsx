import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";
import { T } from "./yes-no-i18n";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Yes or No Tarot — Free Accurate Yes No Tarot Reading",
    description: "Free yes or no tarot reading: focus on your question, draw 1 or 3 cards and get an instant yes, no or maybe — upright leans yes, reversed leans no. No sign-up.",
    keywords: ["yes or no tarot", "yes no tarot accurate free", "yes no tarot reading", "free yes no tarot", "tarot yes or no answer"],
  },
  zh: {
    title: "是与否塔罗 — 免费在线是非塔罗占卜（是/否/待定）",
    description: "免费是非塔罗占卜：默念你的是否问题，抽 1 张或 3 张牌，立即获得是、否或待定的答案——正位偏是、逆位偏否。无需注册，附牌意解读。",
    keywords: ["是与否塔罗", "是非塔罗", "塔罗牌 是 否", "免费塔罗占卜", "yes or no tarot"],
  },
  tw: {
    title: "是與否塔羅 — 免費線上是非塔羅占卜（是/否/待定）",
    description: "免費是非塔羅占卜：默念你的是非問題，抽 1 張或 3 張牌，立即獲得是、否或待定的答案——正位偏是、逆位偏否。無需註冊，附牌意解讀。",
    keywords: ["是與否塔羅", "是非塔羅", "塔羅牌 是 否", "免費塔羅占卜", "yes or no tarot"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/yes-no-tarot", META, locale);
}

export default async function YesNoTarotLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/yes-no-tarot` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/yes-no-tarot`,
    description: m.description,
  });
  // FAQPage 结构化数据（与页面底部 FAQ 区内容一致）
  const faqLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": T[locale].faq.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />
      {children}
      <ToolArticleLinks category="tarot" />
    </>
  );
}
