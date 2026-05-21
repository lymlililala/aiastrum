import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/horoscope",
  title: "Daily Horoscope — 12 Zodiac Signs Fortune Analysis",
  description: "Daily, weekly, and monthly horoscope for all 12 zodiac signs. Five-dimension fortune index covering love, career, wealth, health, and energy.",
  keywords: ["horoscope", "zodiac", "daily horoscope", "星座运势", "十二星座", "星座占卜"],
});

export default function HoroscopeLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "Horoscope", url: `${BASE_URL}/horoscope` },
  ]);
  const webApp = webAppJsonLd({
    name: "Daily Horoscope",
    url: `${BASE_URL}/horoscope`,
    description: "Daily, weekly, and monthly horoscope for all 12 zodiac signs with five-dimension fortune index.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
