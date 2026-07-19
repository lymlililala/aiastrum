import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";
import { T } from "./venus-i18n";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Venus Sign Calculator — What Is My Venus Sign? Free Lookup",
    description: "Free venus sign calculator: enter your birth date to find your venus sign, exact degree and love style instantly. No birth time needed — plus what your venus sign means in love.",
    keywords: ["venus sign calculator", "venus sign calculator free", "what is my venus sign", "venus sign by birth date", "venus sign love style"],
  },
  zh: {
    title: "金星星座计算器 — 免费查询你的金星星座与恋爱风格",
    description: "免费金星星座计算器：输入出生日期，立即算出你的金星星座、度数与恋爱风格解读。无需出生时间，附金星星座爱情含义详解。",
    keywords: ["金星星座计算器", "金星星座查询", "金星星座怎么算", "免费金星星座", "金星星座恋爱风格"],
  },
  tw: {
    title: "金星星座計算器 — 免費查詢你的金星星座與戀愛風格",
    description: "免費金星星座計算器：輸入出生日期，立即算出你的金星星座、度數與戀愛風格解讀。無需出生時間，附金星星座愛情含義詳解。",
    keywords: ["金星星座計算器", "金星星座查詢", "金星星座怎麼算", "免費金星星座", "金星星座戀愛風格"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/venus-sign-calculator", META, locale);
}

export default async function VenusSignCalculatorLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/venus-sign-calculator` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/venus-sign-calculator`,
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
      <ToolArticleLinks category="astro" />
    </>
  );
}
