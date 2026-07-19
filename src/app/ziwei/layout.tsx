import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";
import { T } from "./ziwei-i18n";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Zi Wei Dou Shu — Emperor's Star Chart Astrology",
    description: "The king of Eastern astrology. 14 major stars across 12 palaces reveal your life trajectory through the ancient Zi Wei Dou Shu system.",
    keywords: ["ziwei doushu", "zi wei", "purple star astrology", "chinese astrology", "emperor star chart"],
  },
  zh: {
    title: "紫微斗数 — 免费在线排盘与命盘解析",
    description: "东方占星之王。十四主星分布十二宫位,透过紫微斗数古法揭示你的人生轨迹。免费在线紫微命盘排盘解析。",
    keywords: ["紫微斗数", "紫微命盘", "紫微排盘", "命盘解析", "斗数算命", "免费排盘"],
  },
  tw: {
    title: "紫微斗數 — 免費線上排盤與命盤解析",
    description: "東方占星之王。十四主星分佈十二宮位,透過紫微斗數古法揭示你的人生軌跡。免費線上紫微命盤排盤解析。",
    keywords: ["紫微斗數", "紫微命盤", "紫微排盤", "命盤解析", "斗數算命", "免費排盤"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/ziwei", META, locale);
}

export default async function ZiweiLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/ziwei` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/ziwei`,
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
      <ToolArticleLinks category="ziwei" />
    </>
  );
}
