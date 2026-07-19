import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";
import { T } from "./life-path-i18n";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "Life Path Number Calculator — What Is My Number?",
    description: "Free life path number calculator: enter your birth date for your life path number (1–9, 11, 22, 33) with step-by-step math and full meaning.",
    keywords: ["life path number calculator", "life path calculator", "what is my life path number", "numerology calculator free", "life path number meaning", "master number calculator"],
  },
  zh: {
    title: "生命灵数计算器 — 免费计算你的生命道路数字",
    description: "免费生命灵数计算器：输入出生日期，立即算出你的生命灵数（1-9 及卓越数 11、22、33），展示逐步计算过程，附性格特质与人生课题解读。",
    keywords: ["生命灵数计算器", "生命灵数怎么算", "生命道路数字", "数字命理免费", "卓越数 11 22 33"],
  },
  tw: {
    title: "生命靈數計算器 — 免費計算你的生命道路數字",
    description: "免費生命靈數計算器：輸入出生日期，立即算出你的生命靈數（1-9 及卓越數 11、22、33），展示逐步計算過程，附性格特質與人生課題解讀。",
    keywords: ["生命靈數計算器", "生命靈數怎麼算", "生命道路數字", "數字命理免費", "卓越數 11 22 33"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/life-path-calculator", META, locale);
}

export default async function LifePathCalculatorLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/life-path-calculator` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/life-path-calculator`,
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
      <ToolArticleLinks category="numerology" />
    </>
  );
}
