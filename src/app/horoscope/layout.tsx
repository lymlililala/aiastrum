import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Daily Horoscope — 12 Zodiac Signs Fortune Analysis",
    description: "Daily, weekly, and monthly horoscope for all 12 zodiac signs. Five-dimension fortune index covering love, career, wealth, health, and energy.",
    keywords: ["horoscope", "zodiac", "daily horoscope", "zodiac signs", "astrology forecast"],
  },
  zh: {
    title: "每日星座运势 — 十二星座今日运程分析",
    description: "十二星座每日、每周、每月运势预测,涵盖爱情、事业、财运、健康与能量五大维度指数。免费星座占卜。",
    keywords: ["星座运势", "十二星座", "今日运势", "每日运势", "星座占卜", "星座运程"],
  },
  tw: {
    title: "每日星座運勢 — 十二星座今日運程分析",
    description: "十二星座每日、每週、每月運勢預測,涵蓋愛情、事業、財運、健康與能量五大維度指數。免費星座占卜。",
    keywords: ["星座運勢", "十二星座", "今日運勢", "每日運勢", "星座占卜", "星座運程"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/horoscope", META, locale);
}

export default async function HoroscopeLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/${locale}` },
    { name: "Horoscope", url: `${BASE_URL}/${locale}/horoscope` },
  ]);
  const webApp = webAppJsonLd({
    name: "Daily Horoscope",
    url: `${BASE_URL}/${locale}/horoscope`,
    description: "Daily, weekly, and monthly horoscope for all 12 zodiac signs with five-dimension fortune index.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
      <ToolArticleLinks category="horoscope" />
    </>
  );
}
