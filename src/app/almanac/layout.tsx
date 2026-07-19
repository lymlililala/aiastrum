import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Chinese Almanac — Daily Dos & Don'ts Calendar",
    description: "Daily auspicious and inauspicious activities at a glance. Customized date selection for marriage, moving, business opening, and travel.",
    keywords: ["chinese almanac", "tong shu", "lucky days", "date selection", "auspicious dates"],
  },
  zh: {
    title: "老黄历 — 今日宜忌查询与择日吉日",
    description: "每日宜忌一目了然,为嫁娶、搬家、开业、出行提供定制化的择日选吉。免费在线老黄历查询与吉日推算。",
    keywords: ["老黄历", "黄历", "宜忌", "择日", "黄道吉日", "今日宜忌"],
  },
  tw: {
    title: "老黃曆 — 今日宜忌查詢與擇日吉日",
    description: "每日宜忌一目了然,為嫁娶、搬家、開業、出行提供客製化的擇日選吉。免費線上老黃曆查詢與吉日推算。",
    keywords: ["老黃曆", "黃曆", "宜忌", "擇日", "黃道吉日", "今日宜忌"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/almanac", META, locale);
}

export default async function AlmanacLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/almanac` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/almanac`,
    description: m.description,
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
      <ToolArticleLinks category="almanac" />
    </>
  );
}
