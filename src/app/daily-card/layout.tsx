import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/daily-card",
  title: "Daily Cosmic Card — Universe Message of the Day",
  description: "Your daily blind-box card flip — beautiful card animations reveal a soul-touching message from the universe. One card per day.",
  keywords: ["daily card", "cosmic card", "daily tarot", "每日一签", "每日宇宙提示卡", "塔罗日签"],
});

export default function DailyCardLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "Daily Cosmic Card", url: `${BASE_URL}/daily-card` },
  ]);
  const webApp = webAppJsonLd({
    name: "Daily Cosmic Card",
    url: `${BASE_URL}/daily-card`,
    description: "Daily blind-box card flip with beautiful animations — a soul-touching message from the universe.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
