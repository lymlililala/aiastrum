import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/naming",
  title: "AI Name Generator — Bazi & Poetry-Inspired Names",
  description: "Calculate your lucky elements through Bazi, then select auspicious names inspired by classical poetry and literature. AI-powered Chinese name generator.",
  keywords: ["name generator", "chinese names", "起名", "墨韵起名", "宝宝起名", "八字起名"],
});

export default function NamingLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "AI Name Generator", url: `${BASE_URL}/naming` },
  ]);
  const webApp = webAppJsonLd({
    name: "AI Name Generator",
    url: `${BASE_URL}/naming`,
    description: "Bazi-based lucky element analysis with poetry-inspired auspicious name suggestions.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
