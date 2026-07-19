import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";
import { PET_PSYCHIC_CONTENT } from "./pet-psychic-data";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Pet Psychic — What Is Your Pet Thinking Today?",
    description: "Upload your pet's photo and name. Combined with a single tarot card, AI interprets your furry friend's inner world and today's mood.",
    keywords: ["pet psychic", "pet tarot", "pet communication", "pet oracle", "animal psychic"],
  },
  zh: {
    title: "宠物灵语 — AI 解读你家毛孩今天在想什么",
    description: "上传宠物的照片与名字,结合一张塔罗牌,AI 为你解读毛孩的内心世界与今日心情。免费在线宠物占卜。",
    keywords: ["宠物灵语", "宠物占卜", "宠物心理", "宠物解读", "毛孩占卜", "宠物沟通"],
  },
  tw: {
    title: "寵物靈語 — AI 解讀你家毛孩今天在想什麼",
    description: "上傳寵物的照片與名字,結合一張塔羅牌,AI 為你解讀毛孩的內心世界與今日心情。免費線上寵物占卜。",
    keywords: ["寵物靈語", "寵物占卜", "寵物心理", "寵物解讀", "毛孩占卜", "寵物溝通"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/pet-psychic", META, locale);
}

export default async function PetPsychicLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/pet-psychic` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/pet-psychic`,
    description: m.description,
  });
  const faqLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PET_PSYCHIC_CONTENT[locale].faq.map((f) => ({
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
      <ToolArticleLinks category="pet-psychic" />
    </>
  );
}
