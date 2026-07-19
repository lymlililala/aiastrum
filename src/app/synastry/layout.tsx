import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";
import { SYN_T } from "./synastry-i18n";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Synastry Chart — Love & Friendship Compatibility",
    description: "Input two birth dates to analyze cross-chart planetary aspects and calculate love or friendship compatibility. Discover your cosmic connection.",
    keywords: ["synastry", "birth chart compatibility", "relationship astrology", "love compatibility", "couple chart"],
  },
  zh: {
    title: "星盘合盘 — 免费测两人爱情契合度",
    description: "输入两人生日,分析双方星盘的行星相位,计算爱情或友情契合度,发现你们之间的宇宙连结。免费在线合盘。",
    keywords: ["星盘合盘", "合盘", "爱情合盘", "配对", "契合度", "星座配对"],
  },
  tw: {
    title: "星盤合盤 — 免費測兩人愛情契合度",
    description: "輸入兩人生日,分析雙方星盤的行星相位,計算愛情或友情契合度,發現你們之間的宇宙連結。免費線上合盤。",
    keywords: ["星盤合盤", "合盤", "愛情合盤", "配對", "契合度", "星座配對"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/synastry", META, locale);
}

export default async function SynastryLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/synastry` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/synastry`,
    description: m.description,
  });
  const faqLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SYN_T[locale].faq.map((f) => ({
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
      <ToolArticleLinks category="synastry" />
    </>
  );
}
