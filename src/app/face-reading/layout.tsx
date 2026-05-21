import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/face-reading",
  title: "AI Face Reading — Cyber Fortune & Destiny Scan",
  description: "AI neural network scans facial and palm features to decode your hidden talents and destiny blueprint. Ancient physiognomy meets modern AI.",
  keywords: ["face reading", "physiognomy", "AI face reading", "面相", "赛博算命", "AI算命"],
});

export default function FaceReadingLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "AI Face Reading", url: `${BASE_URL}/face-reading` },
  ]);
  const webApp = webAppJsonLd({
    name: "AI Face Reading",
    url: `${BASE_URL}/face-reading`,
    description: "AI scans facial features to decode hidden talents and destiny blueprint.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
