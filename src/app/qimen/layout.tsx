import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";
import { QIMEN_PAGE_SEO } from "./qimen-data";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Qi Men Dun Jia — Advanced Chinese Metaphysics",
    description: "True solar time calibration with 9-palace grid layout. Precise auspicious and inauspicious predictions for business decisions and travel planning.",
    keywords: ["qi men dun jia", "qimen", "chinese metaphysics", "qimen divination", "feng shui timing"],
  },
  zh: {
    title: "奇门遁甲 — 在线排盘与择时占卜",
    description: "真太阳时校正配合九宫格局排盘,为商业决策与出行规划提供精准的吉凶预测。免费在线奇门遁甲排盘。",
    keywords: ["奇门遁甲", "奇门排盘", "择时", "玄学", "奇门占卜", "在线排盘"],
  },
  tw: {
    title: "奇門遁甲 — 線上排盤與擇時占卜",
    description: "真太陽時校正配合九宮格局排盤,為商業決策與出行規劃提供精準的吉凶預測。免費線上奇門遁甲排盤。",
    keywords: ["奇門遁甲", "奇門排盤", "擇時", "玄學", "奇門占卜", "線上排盤"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/qimen", META, locale);
}

export default async function QimenLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/qimen` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/qimen`,
    description: m.description,
  });
  const faqLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: QIMEN_PAGE_SEO[locale].faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />
      {children}
      <ToolArticleLinks category="qimen" />
    </>
  );
}
