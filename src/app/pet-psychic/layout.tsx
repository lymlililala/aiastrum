import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/pet-psychic",
  title: "Pet Psychic — What Is Your Pet Thinking Today?",
  description: "Upload your pet's photo and name. Combined with a single tarot card, AI interprets your furry friend's inner world and today's mood.",
  keywords: ["pet psychic", "pet tarot", "宠物灵语", "宠物占卜", "宠物心理", "宠物解读"],
});

export default function PetPsychicLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "Pet Psychic", url: `${BASE_URL}/pet-psychic` },
  ]);
  const webApp = webAppJsonLd({
    name: "Pet Psychic",
    url: `${BASE_URL}/pet-psychic`,
    description: "Upload pet photo for AI tarot reading of your pet's inner world and today's mood.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
