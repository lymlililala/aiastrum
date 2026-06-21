import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Daily Fortune Guide — Lucky Color, Number & Direction",
    description: "Based on your birth elements, get today's lucky color, lucky number, auspicious direction, and outfit suggestions. A personalized daily fortune guide.",
    keywords: ["daily fortune", "lucky color", "lucky number", "lucky direction", "daily luck"],
  },
  zh: {
    title: "每日开运指南 — 今日幸运色、数字与方位",
    description: "根据你的生辰五行,获取今日幸运色、幸运数字、吉利方位与穿搭建议,量身定制的每日开运指南。免费查询。",
    keywords: ["每日开运", "幸运色", "幸运数字", "开运指南", "吉利方位", "今日开运"],
  },
  tw: {
    title: "每日開運指南 — 今日幸運色、數字與方位",
    description: "根據你的生辰五行,獲取今日幸運色、幸運數字、吉利方位與穿搭建議,量身打造的每日開運指南。免費查詢。",
    keywords: ["每日開運", "幸運色", "幸運數字", "開運指南", "吉利方位", "今日開運"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/daily-fortune", META, locale);
}

export default async function DailyFortuneLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/${locale}` },
    { name: "Daily Fortune Guide", url: `${BASE_URL}/${locale}/daily-fortune` },
  ]);
  const webApp = webAppJsonLd({
    name: "Daily Fortune Guide",
    url: `${BASE_URL}/${locale}/daily-fortune`,
    description: "Personalized daily lucky color, number, direction, and outfit based on your birth elements.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
      <ToolArticleLinks category="daily-fortune" />
    </>
  );
}
