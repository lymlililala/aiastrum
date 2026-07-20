import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";
import { T as NUM_T } from "./numerology-i18n";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Numerology — Life Path Number Reading",
    description: "Enter your birthdate to calculate your personal life path number (1-9, 11, 22, 33). Decode your personality, talents, and destiny through numerology.",
    keywords: ["numerology", "life path number", "numerology calculator", "destiny number", "master numbers"],
  },
  zh: {
    title: "生命灵数 — 免费计算你的生命数字与命格",
    description: "输入生日,计算你的生命灵数(1-9、11、22、33),透过数字命理解读你的性格、天赋与人生使命。免费占卜。",
    keywords: ["生命灵数", "生命数字", "灵数占卜", "命理数字", "数字命理", "免费测算", "数字人生算法", "生命数字九宫格", "生命数字计算"],
  },
  tw: {
    title: "生命靈數 — 免費計算你的生命數字與命格",
    description: "輸入生日,計算你的生命靈數(1-9、11、22、33),透過數字命理解讀你的性格、天賦與人生使命。免費占卜。",
    keywords: ["生命靈數", "生命數字", "靈數占卜", "命理數字", "數字命理", "免費測算", "數字人生算法", "生命數字九宮格", "生命數字計算"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/numerology", META, locale);
}

export default async function NumerologyLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/numerology` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/numerology`,
    description: m.description,
  });
  const faqLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: NUM_T[locale].faq.map((f) => ({
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
      <ToolArticleLinks category="numerology" />
    </>
  );
}
