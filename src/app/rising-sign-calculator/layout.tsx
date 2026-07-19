import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";
import { T } from "./rising-i18n";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Rising Sign Calculator — What Is My Rising Sign?",
    description: "Free rising sign calculator: enter your birth date, exact time and city to find your ascendant sign and degree. No birth time? Get a noon estimate.",
    keywords: ["rising sign calculator", "ascendant calculator", "rising sign calculator free", "what is my rising sign", "ascendant sign calculator"],
  },
  zh: {
    title: "上升星座计算器 — 免费查询你的上升星座与度数",
    description: "免费上升星座（Ascendant）计算器：输入出生日期、精确时间与出生城市，立即算出你的上升星座与度数。不知道出生时间可用正午估算，附上升星座含义解读。",
    keywords: ["上升星座计算器", "上升星座查询", "上升星座怎么算", "免费上升星座", "上升星座含义"],
  },
  tw: {
    title: "上升星座計算器 — 免費查詢你的上升星座與度數",
    description: "免費上升星座（Ascendant）計算器：輸入出生日期、精確時間與出生城市，立即算出你的上升星座與度數。不知道出生時間可用正午估算，附上升星座含義解讀。",
    keywords: ["上升星座計算器", "上升星座查詢", "上升星座怎麼算", "免費上升星座", "上升星座意思"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/rising-sign-calculator", META, locale);
}

export default async function RisingSignCalculatorLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/rising-sign-calculator` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/rising-sign-calculator`,
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
