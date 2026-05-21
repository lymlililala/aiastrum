import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/astro",
  title: "Birth Chart Reading — Natal Chart & Astrology Analysis",
  description: "Precisely calculate your Sun, Moon, and Ascendant. Generate your personal birth chart and decode the cosmic blueprint of your destiny.",
  keywords: ["birth chart", "natal chart", "astrology", "星盘", "星盘解析", "上升星座", "月亮星座"],
});

export default function AstroLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "Birth Chart", url: `${BASE_URL}/astro` },
  ]);
  const webApp = webAppJsonLd({
    name: "Birth Chart Reading",
    url: `${BASE_URL}/astro`,
    description: "Calculate your natal chart with Sun, Moon, and Ascendant. AI decodes your cosmic blueprint.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
