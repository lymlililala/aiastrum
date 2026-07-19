import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "AI Mystic Chat — Your Personal AI Tarot Reader",
    description: "Share your worries with an AI tarot reader and receive empathetic understanding along with personalized tarot guidance. Available 24/7.",
    keywords: ["AI tarot chat", "AI oracle", "AI fortune teller", "tarot chatbot", "AI psychic"],
  },
  zh: {
    title: "AI 解忧馆 — 你的专属 AI 塔罗师聊天",
    description: "向 AI 塔罗师倾诉烦恼,获得温暖的共情理解与个性化塔罗指引。24 小时在线陪伴,免费 AI 占卜聊天。",
    keywords: ["AI解忧馆", "AI塔罗师", "AI占卜", "AI聊天占卜", "情感倾诉", "塔罗聊天"],
  },
  tw: {
    title: "AI 解憂館 — 你的專屬 AI 塔羅師聊天",
    description: "向 AI 塔羅師傾訴煩惱,獲得溫暖的共情理解與個性化塔羅指引。24 小時線上陪伴,免費 AI 占卜聊天。",
    keywords: ["AI解憂館", "AI塔羅師", "AI占卜", "AI聊天占卜", "情感傾訴", "塔羅聊天"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/ai-mystic", META, locale);
}

export default async function AiMysticLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/ai-mystic` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/ai-mystic`,
    description: m.description,
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
      <ToolArticleLinks category="ai-mystic" />
    </>
  );
}
