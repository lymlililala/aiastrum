import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/rune",
  title: "Rune Oracle — Ancient Norse Divination",
  description: "Ancient Norse rune divination. Draw a single stone for Odin's Eye or three stones for the Norns. Let the elder runes guide your path.",
  keywords: ["rune oracle", "norse runes", "rune divination", "卢恩符文", "北欧符文", "符文占卜"],
});

export default function RuneLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "Rune Oracle", url: `${BASE_URL}/rune` },
  ]);
  const webApp = webAppJsonLd({
    name: "Rune Oracle",
    url: `${BASE_URL}/rune`,
    description: "Ancient Norse rune divination with Odin's Eye and Norns spreads.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
