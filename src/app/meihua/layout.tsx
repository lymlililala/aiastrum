import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Mei Hua Yi Shu — Ancient Chinese I Ching Divination",
    description: "The timeless method of Shao Yong from the Northern Song Dynasty. Observe objects and derive meaning through body-use relationship to predict fortune.",
    keywords: ["meihua", "plum blossom divination", "i ching", "chinese divination", "yi jing oracle"],
  },
  zh: {
    title: "梅花易数 — 在线起卦与易经占卜",
    description: "北宋邵雍流传千年的梅花心易。观物取象、以体用关系推断吉凶祸福。免费在线梅花易数起卦占卜。",
    keywords: ["梅花易数", "梅花心易", "易经占卜", "在线起卦", "邵雍", "周易占卜"],
  },
  tw: {
    title: "梅花易數 — 線上起卦與易經占卜",
    description: "北宋邵雍流傳千年的梅花心易。觀物取象、以體用關係推斷吉凶禍福。免費線上梅花易數起卦占卜。",
    keywords: ["梅花易數", "梅花心易", "易經占卜", "線上起卦", "邵雍", "周易占卜"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/meihua", META, locale);
}

export default async function MeihuaLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/${locale}` },
    { name: "Mei Hua Yi Shu", url: `${BASE_URL}/${locale}/meihua` },
  ]);
  const webApp = webAppJsonLd({
    name: "Mei Hua Yi Shu",
    url: `${BASE_URL}/${locale}/meihua`,
    description: "Ancient Chinese divination based on Shao Yong's plum blossom numerology method.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
      <ToolArticleLinks category="meihua" />
    </>
  );
}
