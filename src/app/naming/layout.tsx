import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "AI Name Generator — Bazi & Poetry-Inspired Names",
    description: "Calculate your lucky elements through Bazi, then select auspicious names inspired by classical poetry and literature. AI-powered Chinese name generator.",
    keywords: ["name generator", "chinese names", "baby names", "bazi naming", "auspicious names"],
  },
  zh: {
    title: "AI 起名 — 八字宝宝起名与墨韵取名",
    description: "透过八字测算喜用神,再从诗词典籍中精选吉祥好名。AI 智能起名,为宝宝取一个有寓意的好名字。免费起名。",
    keywords: ["起名", "宝宝起名", "八字起名", "取名", "AI起名", "好听的名字"],
  },
  tw: {
    title: "AI 取名 — 八字寶寶取名與墨韻命名",
    description: "透過八字測算喜用神,再從詩詞典籍中精選吉祥好名。AI 智能取名,為寶寶取一個有寓意的好名字。免費取名。",
    keywords: ["取名", "寶寶取名", "八字取名", "命名", "AI取名", "好聽的名字"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/naming", META, locale);
}

export default async function NamingLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/naming` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/naming`,
    description: m.description,
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
      <ToolArticleLinks category="naming" />
    </>
  );
}
