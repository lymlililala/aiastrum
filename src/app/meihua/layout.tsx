import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/meihua",
  title: "Mei Hua Yi Shu — Ancient Chinese Divination",
  description: "The timeless method of Shao Yong from the Northern Song Dynasty. Observe objects and derive meaning through body-use relationship to predict fortune.",
  keywords: ["meihua", "plum blossom divination", "梅花心易", "梅花易数", "邵雍", "易经占卜"],
});

export default function MeihuaLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "Mei Hua Yi Shu", url: `${BASE_URL}/meihua` },
  ]);
  const webApp = webAppJsonLd({
    name: "Mei Hua Yi Shu",
    url: `${BASE_URL}/meihua`,
    description: "Ancient Chinese divination based on Shao Yong's plum blossom numerology method.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
