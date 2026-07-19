import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";
import { RUNE_PAGE_SEO } from "./rune-data";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Rune Oracle — Ancient Norse Divination",
    description: "Ancient Norse rune divination. Draw a single stone for Odin's Eye or three stones for the Norns. Let the elder runes guide your path.",
    keywords: ["rune oracle", "norse runes", "rune divination", "elder futhark", "rune reading"],
  },
  zh: {
    title: "卢恩符文占卜 — 北欧符文在线解读",
    description: "古老的北欧卢恩符文占卜。抽单颗「奥丁之眼」或三颗「命运三女神」,让古老符文为你指引方向。免费在线占卜。",
    keywords: ["卢恩符文", "北欧符文", "符文占卜", "卢恩占卜", "符文解读", "免费占卜"],
  },
  tw: {
    title: "盧恩符文占卜 — 北歐符文線上解讀",
    description: "古老的北歐盧恩符文占卜。抽單顆「奧丁之眼」或三顆「命運三女神」,讓古老符文為你指引方向。免費線上占卜。",
    keywords: ["盧恩符文", "北歐符文", "符文占卜", "盧恩占卜", "符文解讀", "免費占卜"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/rune", META, locale);
}

export default async function RuneLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/rune` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/rune`,
    description: m.description,
  });
  const faqLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: RUNE_PAGE_SEO[locale].faq.map((f) => ({
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
      <ToolArticleLinks category="rune" />
    </>
  );
}
