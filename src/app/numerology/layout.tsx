import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/numerology",
  title: "Numerology — Life Path Number Reading",
  description: "Enter your birthdate to calculate your personal life path number (1-9, 11, 22, 33). Decode your personality, talents, and destiny through numerology.",
  keywords: ["numerology", "life path number", "生命灵数", "灵数占卜", "命理数字"],
});

export default function NumerologyLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "Numerology", url: `${BASE_URL}/numerology` },
  ]);
  const webApp = webAppJsonLd({
    name: "Life Path Numerology",
    url: `${BASE_URL}/numerology`,
    description: "Calculate your life path number and decode your personality, talents, and destiny.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
