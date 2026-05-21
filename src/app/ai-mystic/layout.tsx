import { type Metadata } from "next";
import { toolMetadata, breadcrumbJsonLd, webAppJsonLd, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = toolMetadata({
  path: "/ai-mystic",
  title: "AI Mystic Chat — Your Personal AI Tarot Reader",
  description: "Share your worries with an AI tarot reader and receive empathetic understanding along with personalized tarot guidance. Available 24/7.",
  keywords: ["AI tarot chat", "AI oracle", "AI解忧馆", "AI塔罗师", "AI占卜聊天", "心理咨询"],
});

export default function AiMysticLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${BASE_URL}/zh` },
    { name: "AI Mystic Chat", url: `${BASE_URL}/ai-mystic` },
  ]);
  const webApp = webAppJsonLd({
    name: "AI Mystic Chat",
    url: `${BASE_URL}/ai-mystic`,
    description: "Share your worries with an AI tarot reader for empathetic guidance and tarot insights.",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
