import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";
import { T } from "./rune-reading-i18n";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Free Rune Reading Online — Single & Three-Rune Casting",
    description: "Free rune reading online: cast Elder Futhark runes instantly — single rune guidance or a three-rune past/present/future spread with meanings.",
    keywords: ["free rune reading", "rune reading online", "free rune reading online", "rune casting", "three rune reading"],
  },
  zh: {
    title: "免费卢恩符文占卜 — 在线单符文/三符文抽取",
    description: "免费在线卢恩符文占卜：随机抽取老弗萨克符文，单符文指引或过去/现在/未来三符文牌阵，含正逆位关键词与详细解读，无需注册。",
    keywords: ["卢恩符文占卜", "免费符文占卜", "在线符文占卜", "符文抽取", "三符文占卜"],
  },
  tw: {
    title: "免費盧恩符文占卜 — 線上單符文/三符文抽取",
    description: "免費線上盧恩符文占卜：隨機抽取老弗薩克符文，單符文指引或過去/現在/未來三符文牌陣，含正逆位關鍵詞與詳細解讀，無需註冊。",
    keywords: ["盧恩符文占卜", "免費符文占卜", "線上符文占卜", "符文抽取", "三符文占卜"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/free-rune-reading", META, locale);
}

export default async function FreeRuneReadingLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/free-rune-reading` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/free-rune-reading`,
    description: m.description,
  });
  // FAQPage 结构化数据（与页面底部 FAQ 区内容一致）
  const faqLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": T[locale].faq.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />
      {children}
      <ToolArticleLinks category="rune" />
    </>
  );
}
