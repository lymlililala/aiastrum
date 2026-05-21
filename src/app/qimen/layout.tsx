import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/qimen",
  title: "Qi Men Dun Jia — Advanced Chinese Metaphysics",
  description: "True solar time calibration with 9-palace grid layout. Precise auspicious and inauspicious predictions for business decisions and travel planning.",
  keywords: ["qi men dun jia", "qimen", "奇门遁甲", "奇门", "玄学", "择时"],
});

export default function QimenLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "Qi Men Dun Jia", url: `${BASE_URL}/qimen` },
  ]);
  const webApp = webAppJsonLd({
    name: "Qi Men Dun Jia",
    url: `${BASE_URL}/qimen`,
    description: "9-palace grid layout with true solar time for business and travel fortune predictions.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
