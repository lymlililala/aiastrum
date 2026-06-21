import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "AI Tarot Reading — Reveal Past, Present & Future",
    description: "Draw tarot cards and let AI interpret the hidden whispers of your past, present, and future. 78-card deck with deep symbolic readings.",
    keywords: ["tarot reading", "AI tarot", "tarot cards", "tarot online", "tarot card meanings"],
  },
  zh: {
    title: "AI 塔罗占卜 — 解读你的过去、现在与未来",
    description: "抽取塔罗牌,让 AI 解读你过去、现在与未来的隐秘讯息。78 张完整牌组,深度象征解析,在线免费占卜。",
    keywords: ["塔罗占卜", "AI塔罗", "塔罗牌", "在线塔罗", "塔罗牌意", "免费塔罗"],
  },
  tw: {
    title: "AI 塔羅占卜 — 解讀你的過去、現在與未來",
    description: "抽取塔羅牌,讓 AI 解讀你過去、現在與未來的隱祕訊息。78 張完整牌組,深度象徵解析,線上免費占卜。",
    keywords: ["塔羅占卜", "AI塔羅", "塔羅牌", "線上塔羅", "塔羅牌義", "免費塔羅"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/tarot", META, locale);
}

export default async function TarotLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/${locale}` },
    { name: "Tarot Reading", url: `${BASE_URL}/${locale}/tarot` },
  ]);
  const webApp = webAppJsonLd({
    name: "AI Tarot Reading",
    url: `${BASE_URL}/${locale}/tarot`,
    description: "Draw tarot cards and let AI interpret the hidden whispers of your past, present, and future.",
    category: "LifestyleApplication",
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
      <ToolArticleLinks category="tarot" />
    </>
  );
}
