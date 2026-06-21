import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "MBTI × Zodiac — Cosmic Personality Profile",
    description: "Combine MBTI and zodiac sign to generate a viral personality report packed with meme culture. Highly shareable cosmic identity card.",
    keywords: ["MBTI zodiac", "personality test", "MBTI astrology", "personality type", "16 personalities"],
  },
  zh: {
    title: "MBTI × 星座 — 人格档案与星球碰撞测试",
    description: "结合 MBTI 与星座,生成充满梗文化的爆款人格报告,打造高度可分享的宇宙身份卡。免费 MBTI 星座测试。",
    keywords: ["MBTI星座", "MBTI测试", "人格测试", "16型人格", "性格测试", "人格档案"],
  },
  tw: {
    title: "MBTI × 星座 — 人格檔案與星球碰撞測試",
    description: "結合 MBTI 與星座,生成充滿梗文化的爆款人格報告,打造高度可分享的宇宙身份卡。免費 MBTI 星座測試。",
    keywords: ["MBTI星座", "MBTI測試", "人格測試", "16型人格", "性格測試", "人格檔案"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/mbti", META, locale);
}

export default async function MbtiLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/${locale}` },
    { name: "MBTI × Zodiac", url: `${BASE_URL}/${locale}/mbti` },
  ]);
  const webApp = webAppJsonLd({
    name: "MBTI × Zodiac Cosmic Personality",
    url: `${BASE_URL}/${locale}/mbti`,
    description: "Combine MBTI and zodiac to generate a viral personality report.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
      <ToolArticleLinks category="mbti" />
    </>
  );
}
