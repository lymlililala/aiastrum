import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";
import { LOVE_T } from "./love-i18n";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Love Oracle — Birth Chart & Destiny Love Analysis",
    description: "Three-dimensional analysis combining star chart, destiny, and numerology. Reveal your destined partner's traits and the timing of your fateful encounter.",
    keywords: ["love oracle", "relationship astrology", "love compatibility", "soulmate reading", "love fortune"],
  },
  zh: {
    title: "姻缘占卜 — AI 测正缘与脱单桃花运",
    description: "结合星盘、命理与灵数三维分析,揭示你命定另一半的特质与正缘出现的时机。免费在线姻缘爱情占卜。",
    keywords: ["姻缘占卜", "爱情占卜", "正缘", "桃花运", "缘分测试", "脱单"],
  },
  tw: {
    title: "姻緣占卜 — AI 測正緣與脫單桃花運",
    description: "結合星盤、命理與靈數三維分析,揭示你命定另一半的特質與正緣出現的時機。免費線上姻緣愛情占卜。",
    keywords: ["姻緣占卜", "愛情占卜", "正緣", "桃花運", "緣分測試", "脫單"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/love", META, locale);
}

export default async function LoveLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/love` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/love`,
    description: m.description,
  });
  const faqLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: LOVE_T[locale].faq.map((f) => ({
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
      <ToolArticleLinks category="love" />
    </>
  );
}
