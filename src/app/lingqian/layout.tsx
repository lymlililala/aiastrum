import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Ling Qian Oracle — Guanyin & Wong Tai Sin Lots",
    description: "Devoutly draw lots from Guanyin or Wong Tai Sin. Shake the divination cup for confirmation, then receive plain-language fortune analysis across four dimensions.",
    keywords: ["lingqian", "fortune sticks", "guanyin oracle", "chinese fortune lots", "temple oracle"],
  },
  zh: {
    title: "在线求签 — 观音灵签与黄大仙灵签解签",
    description: "诚心求观音灵签或黄大仙灵签,掷筊确认后获得四大维度的白话签文解读。免费在线灵签抽签与解签。",
    keywords: ["灵签", "观音灵签", "黄大仙签", "求签", "解签", "在线抽签"],
  },
  tw: {
    title: "線上求籤 — 觀音靈籤與黃大仙靈籤解籤",
    description: "誠心求觀音靈籤或黃大仙靈籤,擲筊確認後獲得四大維度的白話籤文解讀。免費線上靈籤抽籤與解籤。",
    keywords: ["靈籤", "觀音靈籤", "黃大仙籤", "求籤", "解籤", "線上抽籤"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/lingqian", META, locale);
}

export default async function LingqianLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/lingqian` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/lingqian`,
    description: m.description,
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
      <ToolArticleLinks category="lingqian" />
    </>
  );
}
