import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/almanac",
  title: "Chinese Almanac — Daily Dos & Don'ts Calendar",
  description: "Daily auspicious and inauspicious activities at a glance. Customized date selection for marriage, moving, business opening, and travel.",
  keywords: ["chinese almanac", "tong shu", "老黄历", "黄历", "宜忌", "择日"],
});

export default function AlmanacLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "Chinese Almanac", url: `${BASE_URL}/almanac` },
  ]);
  const webApp = webAppJsonLd({
    name: "Chinese Almanac",
    url: `${BASE_URL}/almanac`,
    description: "Daily auspicious and inauspicious activities for marriage, moving, business, and travel.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
