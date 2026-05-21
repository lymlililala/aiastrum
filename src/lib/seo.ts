/**
 * seo.ts — 通用 SEO 工具函数
 * 为每个工具页生成正确的 canonical URL、hreflang alternates 和 BreadcrumbList JSON-LD
 */
import { type Metadata } from "next";

export const BASE_URL = "https://aiastrum.com";

interface ToolSeoOptions {
  /** 页面路径，如 "/tarot" */
  path: string;
  /** 页面标题（会自动拼接 " | AiAstrum"） */
  title: string;
  /** 页面描述 */
  description: string;
  /** 页面关键词 */
  keywords?: string[];
  /** 面包屑名称，默认与 title 相同 */
  breadcrumbName?: string;
}

/**
 * 生成工具页面的 Metadata（canonical 指向真实无前缀 URL）
 */
export function toolMetadata({
  path,
  title,
  description,
  keywords,
}: ToolSeoOptions): Metadata {
  const canonicalUrl = `${BASE_URL}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | AiAstrum`,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "AiAstrum",
      images: [
        {
          url: `${BASE_URL}/images/og-cover.png`,
          width: 1200,
          height: 630,
          alt: `${title} — AiAstrum`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | AiAstrum`,
      description,
      images: [`${BASE_URL}/images/og-cover.png`],
    },
  };
}

/**
 * 生成 BreadcrumbList JSON-LD 字符串
 */
export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>): string {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
  return JSON.stringify(ld);
}

/**
 * 生成 WebApplication JSON-LD 字符串（工具页）
 */
export function webAppJsonLd(options: {
  name: string;
  url: string;
  description: string;
  category?: string;
}): string {
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": options.name,
    "url": options.url,
    "description": options.description,
    "applicationCategory": options.category ?? "LifestyleApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "publisher": {
      "@type": "Organization",
      "name": "AiAstrum",
      "url": BASE_URL,
    },
  };
  return JSON.stringify(ld);
}
