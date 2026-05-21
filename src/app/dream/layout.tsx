import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/dream",
  title: "Dream Interpretation — Zhou Gong & Jungian Analysis",
  description: "Traditional Chinese dream interpretation meets Jungian psychology. Dual-track analysis of your dreams and subconscious mind.",
  keywords: ["dream interpretation", "dream meaning", "周公解梦", "解梦", "梦境分析", "潜意识"],
});

export default function DreamLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "Dream Interpretation", url: `${BASE_URL}/dream` },
  ]);
  const webApp = webAppJsonLd({
    name: "Dream Interpretation",
    url: `${BASE_URL}/dream`,
    description: "Traditional Chinese dream interpretation meets Jungian psychology for dual-track dream analysis.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
