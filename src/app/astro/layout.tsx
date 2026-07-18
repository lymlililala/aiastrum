import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Sun, Moon & Rising Sign Calculator — Free Birth Chart Reading",
    description: "Free sun, moon and rising sign calculator: enter your birth date, time and place to find your Big Three, generate your full natal chart, and decode what each placement means.",
    keywords: ["sun moon rising calculator", "sun moon rising", "rising sign calculator", "moon sign calculator", "birth chart", "natal chart", "astrology", "big three astrology"],
  },
  zh: {
    title: "星盘解析 — 免费排个人星盘与占星分析",
    description: "精准计算太阳、月亮与上升星座,生成你的个人星盘,解码命运的宇宙蓝图。免费在线占星星盘排盘解析。",
    keywords: ["星盘", "星盘解析", "上升星座", "月亮星座", "占星", "免费星盘"],
  },
  tw: {
    title: "星盤解析 — 免費排個人星盤與占星分析",
    description: "精準計算太陽、月亮與上升星座,生成你的個人星盤,解碼命運的宇宙藍圖。免費線上占星星盤排盤解析。",
    keywords: ["星盤", "星盤解析", "上升星座", "月亮星座", "占星", "免費星盤"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/astro", META, locale);
}

export default async function AstroLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/${locale}` },
    { name: "Birth Chart", url: `${BASE_URL}/${locale}/astro` },
  ]);
  const webApp = webAppJsonLd({
    name: "Sun, Moon & Rising Sign Calculator",
    url: `${BASE_URL}/${locale}/astro`,
    description: "Free sun, moon and rising sign calculator. Generate your natal chart and let AI decode your cosmic blueprint.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
      <ToolArticleLinks category="astro" />
    </>
  );
}
