import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";
import { T } from "./dream-i18n";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Dream Interpretation — Zhou Gong & Jungian Analysis",
    description: "Traditional Chinese dream interpretation meets Jungian psychology. Dual-track analysis of your dreams and subconscious mind.",
    keywords: ["dream interpretation", "dream meaning", "dream dictionary", "dream analysis", "dream symbols"],
  },
  zh: {
    title: "周公解梦 — AI 解梦大全与梦境含义查询",
    description: "传统周公解梦结合荣格心理学,双轨解析你的梦境与潜意识。免费在线解梦大全,查询各类梦境含义。",
    keywords: ["周公解梦", "解梦", "解梦大全", "梦境分析", "梦境含义", "做梦"],
  },
  tw: {
    title: "周公解夢 — AI 解夢大全與夢境含義查詢",
    description: "傳統周公解夢結合榮格心理學,雙軌解析你的夢境與潛意識。免費線上解夢大全,查詢各類夢境含義。",
    keywords: ["周公解夢", "解夢", "解夢大全", "夢境分析", "夢境含義", "做夢"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/dream", META, locale);
}

export default async function DreamLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/dream` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/dream`,
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
      <ToolArticleLinks category="dream" />
    </>
  );
}
