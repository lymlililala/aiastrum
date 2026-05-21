import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/daily-fortune",
  title: "Daily Fortune Guide — Lucky Color, Number & Direction",
  description: "Based on your birth elements, get today's lucky color, lucky number, auspicious direction, and outfit suggestions. A personalized daily fortune guide.",
  keywords: ["daily fortune", "lucky color", "每日开运", "幸运色", "幸运数字", "开运指南"],
});

export default function DailyFortuneLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "Daily Fortune Guide", url: `${BASE_URL}/daily-fortune` },
  ]);
  const webApp = webAppJsonLd({
    name: "Daily Fortune Guide",
    url: `${BASE_URL}/daily-fortune`,
    description: "Personalized daily lucky color, number, direction, and outfit based on your birth elements.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
