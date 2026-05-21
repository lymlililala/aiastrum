import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/synastry",
  title: "Synastry Chart — Love & Friendship Compatibility",
  description: "Input two birth dates to analyze cross-chart planetary aspects and calculate love or friendship compatibility. Discover your cosmic connection.",
  keywords: ["synastry", "birth chart compatibility", "合盘", "星盘合盘", "爱情合盘", "配对"],
});

export default function SynastryLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "Synastry Chart", url: `${BASE_URL}/synastry` },
  ]);
  const webApp = webAppJsonLd({
    name: "Synastry Chart",
    url: `${BASE_URL}/synastry`,
    description: "Analyze cross-chart planetary aspects and calculate love or friendship compatibility.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
