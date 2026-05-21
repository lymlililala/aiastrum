import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/tarot",
  title: "AI Tarot Reading — Reveal Past, Present & Future",
  description: "Draw tarot cards and let AI interpret the hidden whispers of your past, present, and future. 78-card deck with deep symbolic readings.",
  keywords: ["tarot reading", "AI tarot", "tarot cards", "塔罗牌", "塔罗占卜", "AI占卜"],
});

export default function TarotLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "Tarot Reading", url: `${BASE_URL}/tarot` },
  ]);
  const webApp = webAppJsonLd({
    name: "AI Tarot Reading",
    url: `${BASE_URL}/tarot`,
    description: "Draw tarot cards and let AI interpret the hidden whispers of your past, present, and future.",
    category: "LifestyleApplication",
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
