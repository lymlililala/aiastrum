import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/lingqian",
  title: "Ling Qian Oracle — Guanyin & Wong Tai Sin Divination",
  description: "Devoutly draw lots from Guanyin or Wong Tai Sin. Shake the divination cup for confirmation, then receive plain-language fortune analysis across four dimensions.",
  keywords: ["lingqian", "fortune sticks", "灵签", "云端灵签", "观音灵签", "黄大仙签"],
});

export default function LingqianLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "Ling Qian Oracle", url: `${BASE_URL}/lingqian` },
  ]);
  const webApp = webAppJsonLd({
    name: "Ling Qian Oracle",
    url: `${BASE_URL}/lingqian`,
    description: "Guanyin and Wong Tai Sin fortune stick divination with four-dimension fortune analysis.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
