import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/bazi",
  title: "Bazi Destiny Code — Four Pillars of Destiny",
  description: "Reveal your life map written in the stars. AI analyzes your Four Pillars of Destiny (Bazi) to uncover personality, career, and fortune cycles.",
  keywords: ["bazi", "four pillars of destiny", "chinese astrology", "生辰八字", "八字算命", "四柱"],
});

export default function BaziLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "Bazi Destiny Code", url: `${BASE_URL}/bazi` },
  ]);
  const webApp = webAppJsonLd({
    name: "Bazi Destiny Code",
    url: `${BASE_URL}/bazi`,
    description: "AI analyzes your Four Pillars of Destiny to uncover personality, career, and fortune cycles.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
