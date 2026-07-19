import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";
import { T } from "./moon-i18n";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Moon Sign Calculator — What Is My Moon Sign? Free Lookup",
    description: "Free moon sign calculator: enter your birth date, time and city to find your moon sign instantly. No birth time? It still works — with meaning.",
    keywords: ["moon sign calculator", "moon sign calculator free", "what is my moon sign", "moon calculator astrology", "moon sign by birth date"],
  },
  zh: {
    title: "月亮星座计算器 — 免费查询你的月亮星座",
    description: "免费月亮星座计算器：输入出生日期、时间与城市，立即算出你的月亮星座与度数。不知道出生时间也能查，附月亮星座含义解读。",
    keywords: ["月亮星座计算器", "月亮星座查询", "月亮星座怎么算", "免费月亮星座", "月亮星座含义"],
  },
  tw: {
    title: "月亮星座計算器 — 免費查詢你的月亮星座",
    description: "免費月亮星座計算器：輸入出生日期、時間與城市，立即算出你的月亮星座與度數。不知道出生時間也能查，附月亮星座含義解讀。",
    keywords: ["月亮星座計算器", "月亮星座查詢", "月亮星座怎麼算", "免費月亮星座", "月亮星座意思"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/moon-sign-calculator", META, locale);
}

export default async function MoonSignCalculatorLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/moon-sign-calculator` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/moon-sign-calculator`,
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
