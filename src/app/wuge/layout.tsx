import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/wuge",
  title: "Name Five-Grid Analysis — Stroke Count Numerology",
  description: "Kangxi dictionary stroke counts with five-grid analysis and 81-number theory to decode the relationship between your name and destiny.",
  keywords: ["name numerology", "five grid", "姓名五格", "姓名学", "笔画", "姓名命理"],
});

export default function WugeLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "Name Five-Grid Analysis", url: `${BASE_URL}/wuge` },
  ]);
  const webApp = webAppJsonLd({
    name: "Name Five-Grid Analysis",
    url: `${BASE_URL}/wuge`,
    description: "Decode the relationship between your name and destiny through stroke count numerology.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
