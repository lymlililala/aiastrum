import { type MetadataRoute } from "next";

const BASE_URL = "https://aiastrum.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /_next/static/media/ 下多为字体等静态资源，被抓取后会出现在 GSC「已抓取-未索引」噪音里
        disallow: ["/api/", "/_next/static/media/"],
      },
      // 允许主流 AI 爬虫抓取
      { userAgent: "GPTBot",        allow: "/" },
      { userAgent: "ChatGPT-User",  allow: "/" },
      { userAgent: "Claude-Web",    allow: "/" },
      { userAgent: "ClaudeBot",     allow: "/" },
      { userAgent: "anthropic-ai",  allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Googlebot",     allow: "/" },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
