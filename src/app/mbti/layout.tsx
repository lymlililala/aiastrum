import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/mbti",
  title: "MBTI × Zodiac — Cosmic Personality Profile",
  description: "Combine MBTI and zodiac sign to generate a viral personality report packed with meme culture. Highly shareable cosmic identity card.",
  keywords: ["MBTI zodiac", "personality test", "MBTI星座", "人格档案", "MBTI星球碰撞"],
});

export default function MbtiLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "MBTI × Zodiac", url: `${BASE_URL}/mbti` },
  ]);
  const webApp = webAppJsonLd({
    name: "MBTI × Zodiac Cosmic Personality",
    url: `${BASE_URL}/mbti`,
    description: "Combine MBTI and zodiac to generate a viral personality report.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
