import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";
import { T } from "./astro-i18n";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Birth Chart Calculator — Free Natal Chart & Sun Moon Rising",
    description: "Free birth chart calculator: enter your birth date, time and city to generate your full natal chart — sun, moon, rising signs, planets and houses.",
    keywords: ["birth chart calculator", "natal chart calculator", "free birth chart", "natal chart", "sun moon rising calculator", "sun moon rising", "rising sign calculator", "moon sign calculator", "birth chart", "big three astrology"],
  },
  zh: {
    title: "星盘查询 — 免费在线星盘排盘与命盘分析",
    description: "免费星盘查询：输入出生日期、时间与城市，在线排个人星盘，精准计算太阳、月亮与上升星座，解码你的星座命盘。",
    keywords: ["星盘查询", "星盘", "星盘排盘", "星座排盘", "星座命盘分析", "星盘测试", "测星盘", "在线星盘", "上升星座", "免费星盘", "占星网站", "太阳星座"],
  },
  tw: {
    title: "星盤查詢 — 免費線上星盤排盤與命盤分析",
    description: "免費星盤查詢：輸入出生日期、時間與城市，線上排個人星盤，精準計算太陽、月亮與上升星座，解碼你的星座命盤。",
    keywords: ["星盤查詢", "星盤", "星盤排盤", "星座排盤", "星座命盤分析", "星盤測試", "測星盤", "線上星盤", "上升星座", "免費星盤", "占星網站", "太陽星座"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/astro", META, locale);
}

export default async function AstroLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/astro` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/astro`,
    description: m.description,
  });
  const faqLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: T[locale].faq.map((f) => ({
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
      <ToolArticleLinks category="astro" />
    </>
  );
}
