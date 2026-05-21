import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/love",
  title: "Love Oracle — Birth Chart & Destiny Love Analysis",
  description: "Three-dimensional analysis combining star chart, destiny, and numerology. Reveal your destined partner's traits and the timing of your fateful encounter.",
  keywords: ["love oracle", "relationship astrology", "姻缘占卜", "爱情占卜", "缘分", "合婚"],
});

export default function LoveLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "Love Oracle", url: `${BASE_URL}/love` },
  ]);
  const webApp = webAppJsonLd({
    name: "Love Oracle",
    url: `${BASE_URL}/love`,
    description: "Star chart and destiny analysis to reveal your destined partner's traits and meeting timing.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
