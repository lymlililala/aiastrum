import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";
import { CRYSTALS_UI } from "./crystals-i18n";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Crystal Selector — Find the Right Stone for Your Intention",
    description: "Pick your intention — protection, money, sleep, anxiety relief, love, focus, dreams or vitality — and get the right crystals with concrete ways to use and cleanse them. Free crystal selector.",
    keywords: ["protection stones", "stones that attract money", "sleep stones", "crystals for anxiety", "crystals for love attraction", "dream crystals", "prosperity stones", "crystal selector", "crystal healing"],
  },
  zh: {
    title: "选水晶 — 按需求找到你的水晶",
    description: "选择你的需求——防护、招财、助眠、抗焦虑、爱情、事业、梦境直觉或活力——立即获得适合的水晶推荐与具体使用、净化方法。免费在线选水晶工具。",
    keywords: ["水晶功效", "招财水晶", "守护石", "助眠水晶", "水晶怎么选", "黑碧玺", "黄水晶", "粉晶", "水晶净化", "选水晶"],
  },
  tw: {
    title: "選水晶 — 按需求找到你的水晶",
    description: "選擇你的需求——防護、招財、助眠、抗焦慮、愛情、事業、夢境直覺或活力——立即獲得適合的水晶推薦與具體使用、淨化方法。免費線上選水晶工具。",
    keywords: ["水晶功效", "招財水晶", "守護石", "助眠水晶", "水晶怎麼選", "黑碧璽", "黃水晶", "粉晶", "水晶淨化", "選水晶"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/crystals", META, locale);
}

export default async function CrystalsLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/crystals` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/crystals`,
    description: m.description,
  });
  const faqLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CRYSTALS_UI[locale].faq.map((f) => ({
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
      <ToolArticleLinks category="水晶" />
    </>
  );
}
