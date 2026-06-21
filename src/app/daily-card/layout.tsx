import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Daily Cosmic Card — Universe Message of the Day",
    description: "Your daily blind-box card flip — beautiful card animations reveal a soul-touching message from the universe. One card per day.",
    keywords: ["daily card", "cosmic card", "daily tarot", "card of the day", "daily oracle"],
  },
  zh: {
    title: "每日宇宙提示卡 — 今日塔罗日签抽取",
    description: "每天一次的盲盒翻卡,精美卡面动画为你揭晓来自宇宙的暖心讯息。每日一张,免费抽取塔罗日签。",
    keywords: ["每日一签", "宇宙提示卡", "塔罗日签", "每日塔罗", "每日提示卡", "今日运势卡"],
  },
  tw: {
    title: "每日宇宙提示卡 — 今日塔羅日籤抽取",
    description: "每天一次的盲盒翻卡,精美卡面動畫為你揭曉來自宇宙的暖心訊息。每日一張,免費抽取塔羅日籤。",
    keywords: ["每日一籤", "宇宙提示卡", "塔羅日籤", "每日塔羅", "每日提示卡", "今日運勢卡"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/daily-card", META, locale);
}

export default async function DailyCardLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/${locale}` },
    { name: "Daily Cosmic Card", url: `${BASE_URL}/${locale}/daily-card` },
  ]);
  const webApp = webAppJsonLd({
    name: "Daily Cosmic Card",
    url: `${BASE_URL}/${locale}/daily-card`,
    description: "Daily blind-box card flip with beautiful animations — a soul-touching message from the universe.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
      <ToolArticleLinks category="daily-card" />
    </>
  );
}
