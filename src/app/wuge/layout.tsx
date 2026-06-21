import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Name Five-Grid Analysis — Stroke Count Numerology",
    description: "Kangxi dictionary stroke counts with five-grid analysis and 81-number theory to decode the relationship between your name and destiny.",
    keywords: ["name numerology", "five grid", "name analysis", "chinese name meaning", "stroke numerology"],
  },
  zh: {
    title: "姓名五格 — 免费测试姓名笔画与命理",
    description: "以康熙字典笔画数搭配五格剖象与八十一数理,解读你的姓名与命运的关系。免费在线姓名五格测试分析。",
    keywords: ["姓名五格", "姓名学", "姓名测试", "笔画", "姓名命理", "名字打分"],
  },
  tw: {
    title: "姓名五格 — 免費測試姓名筆畫與命理",
    description: "以康熙字典筆畫數搭配五格剖象與八十一數理,解讀你的姓名與命運的關係。免費線上姓名五格測試分析。",
    keywords: ["姓名五格", "姓名學", "姓名測試", "筆畫", "姓名命理", "名字打分"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/wuge", META, locale);
}

export default async function WugeLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/${locale}` },
    { name: "Name Five-Grid Analysis", url: `${BASE_URL}/${locale}/wuge` },
  ]);
  const webApp = webAppJsonLd({
    name: "Name Five-Grid Analysis",
    url: `${BASE_URL}/${locale}/wuge`,
    description: "Decode the relationship between your name and destiny through stroke count numerology.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
      <ToolArticleLinks category="wuge" />
    </>
  );
}
