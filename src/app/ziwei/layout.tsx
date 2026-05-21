import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/ziwei",
  title: "Emperor's Star Chart — Zi Wei Dou Shu Astrology",
  description: "The king of Eastern astrology. 14 major stars across 12 palaces reveal your life trajectory through the ancient Zi Wei Dou Shu system.",
  keywords: ["ziwei doushu", "紫微斗数", "zi wei", "chinese astrology", "命盘", "紫微命盘"],
});

export default function ZiweiLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "Emperor's Star Chart", url: `${BASE_URL}/ziwei` },
  ]);
  const webApp = webAppJsonLd({
    name: "Emperor's Star Chart (Zi Wei Dou Shu)",
    url: `${BASE_URL}/ziwei`,
    description: "14 major stars across 12 palaces reveal your life trajectory through the ancient Zi Wei Dou Shu system.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
