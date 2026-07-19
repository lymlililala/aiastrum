import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";
import { T } from "./bazi-i18n";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Bazi Destiny Code — Four Pillars of Destiny",
    description: "Reveal your life map written in the stars. AI analyzes your Four Pillars of Destiny (Bazi) to uncover personality, career, and fortune cycles.",
    keywords: ["bazi", "four pillars of destiny", "chinese astrology", "bazi calculator", "destiny reading"],
  },
  zh: {
    title: "AI 生辰八字 — 排盘算命与四柱命理分析",
    description: "AI 解读你的生辰八字四柱命盘,洞悉性格、事业、财运与大运流年。免费在线八字排盘与命理分析。",
    keywords: ["生辰八字", "八字算命", "四柱命理", "八字排盘", "免费算命", "大运流年"],
  },
  tw: {
    title: "AI 生辰八字 — 排盤算命與四柱命理分析",
    description: "AI 解讀你的生辰八字四柱命盤,洞悉性格、事業、財運與大運流年。免費線上八字排盤與命理分析。",
    keywords: ["生辰八字", "八字算命", "四柱命理", "八字排盤", "免費算命", "大運流年"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/bazi", META, locale);
}

export default async function BaziLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/bazi` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/bazi`,
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
      <ToolArticleLinks category="bazi" />
    </>
  );
}
