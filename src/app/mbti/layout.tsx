import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";
import { MBTI_SEO } from "./mbti-data";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "MBTI × Zodiac — Cosmic Personality Profile",
    description: "Combine MBTI and zodiac sign to generate a viral personality report packed with meme culture. Highly shareable cosmic identity card.",
    keywords: ["MBTI zodiac", "personality test", "MBTI astrology", "personality type", "16 personalities", "mbti compatibility", "istj love", "infp best match"],
  },
  zh: {
    title: "MBTI × 星座 — 人格档案与星球碰撞测试",
    description: "结合 MBTI 与星座,生成充满梗文化的爆款人格报告,打造高度可分享的宇宙身份卡。免费 MBTI 星座测试。",
    keywords: ["MBTI星座", "MBTI测试", "人格测试", "16型人格", "性格测试", "人格档案", "MBTI配对", "16型人格配对"],
  },
  tw: {
    title: "MBTI × 星座 — 人格檔案與星球碰撞測試",
    description: "結合 MBTI 與星座,生成充滿梗文化的爆款人格報告,打造高度可分享的宇宙身份卡。免費 MBTI 星座測試。",
    keywords: ["MBTI星座", "MBTI測試", "人格測試", "16型人格", "性格測試", "人格檔案", "MBTI配對", "16型人格配對"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/mbti", META, locale);
}

export default async function MbtiLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/mbti` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/mbti`,
    description: m.description,
  });
  const faqLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: MBTI_SEO[locale].faq.map((f) => ({
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
      <ToolArticleLinks category="mbti" />
    </>
  );
}
