import { type Metadata } from "next";
import { toolMetadataI18n, breadcrumbJsonLd, webAppJsonLd, BASE_URL, HOME_NAME, shortToolName, type LocaleMeta } from "~/lib/seo";
import { getServerLocale } from "~/lib/serverLocale";
import { type Locale } from "~/lib/i18n";
import ToolArticleLinks from "~/app/components/ToolArticleLinks";
import { FACE_T } from "./face-reading-i18n";

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "AI Face Reading — Cyber Fortune & Destiny Scan",
    description: "AI neural network scans facial and palm features to decode your hidden talents and destiny blueprint. Ancient physiognomy meets modern AI.",
    keywords: ["face reading", "physiognomy", "AI face reading", "palm reading", "face fortune"],
  },
  zh: {
    title: "AI 面相 — 赛博算命与人脸命运扫描",
    description: "AI 神经网络扫描你的面相与手相特征,解码隐藏的天赋与命运蓝图。古老相术遇见现代 AI,免费在线赛博算命。",
    keywords: ["面相", "赛博算命", "AI算命", "看面相", "手相", "AI看相"],
  },
  tw: {
    title: "AI 面相 — 賽博算命與人臉命運掃描",
    description: "AI 神經網路掃描你的面相與手相特徵,解碼隱藏的天賦與命運藍圖。古老相術遇見現代 AI,免費線上賽博算命。",
    keywords: ["面相", "賽博算命", "AI算命", "看面相", "手相", "AI看相"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/face-reading", META, locale);
}

export default async function FaceReadingLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const m = META[locale];
  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: shortToolName(m.title), url: `${BASE_URL}/${locale}/face-reading` },
  ]);
  const webApp = webAppJsonLd({
    name: shortToolName(m.title),
    url: `${BASE_URL}/${locale}/face-reading`,
    description: m.description,
  });
  const faqLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FACE_T[locale].faq.map((f) => ({
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
      <ToolArticleLinks category="face-reading" />
    </>
  );
}
