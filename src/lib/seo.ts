/**
 * seo.ts — 通用 SEO 工具函数
 * 为每个工具页生成正确的 canonical URL、hreflang alternates 和 BreadcrumbList JSON-LD
 */
import { type Metadata } from "next";
import { type Locale } from "~/lib/i18n";

export const BASE_URL = "https://aiastrum.com";

/**
 * 生成带语言前缀的 canonical + hreflang alternates。
 * canonical 指向当前 locale 的带前缀 URL;languages 覆盖三语 + x-default(zh)。
 * key 集合与首页 src/app/[lang]/page.tsx 保持一致。
 */
export function hreflangFor(path: string, locale: Locale): NonNullable<Metadata["alternates"]> {
  return {
    canonical: `${BASE_URL}/${locale}${path}`,
    languages: {
      "zh-CN": `${BASE_URL}/zh${path}`,
      "zh-TW": `${BASE_URL}/tw${path}`,
      "en": `${BASE_URL}/en${path}`,
      "x-default": `${BASE_URL}/zh${path}`,
    },
  };
}

interface ToolSeoOptions {
  /** 页面路径，如 "/tarot" */
  path: string;
  /** 当前语言（决定 canonical 前缀与 hreflang） */
  locale: Locale;
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
 * 生成工具页面的 Metadata（canonical 指向带语言前缀的规范 URL，并输出 hreflang）
 */
export function toolMetadata({
  path,
  locale,
  title,
  description,
  keywords,
}: ToolSeoOptions): Metadata {
  const alternates = hreflangFor(path, locale);
  const canonicalUrl = alternates.canonical as string;

  return {
    title,
    description,
    keywords,
    alternates,
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

/** 单语言文案(用于三语工具页 metadata） */
export interface LocaleMeta {
  title: string;
  description: string;
  keywords?: string[];
}

/**
 * 三语工具页 Metadata：按当前 locale 选好文案后复用 toolMetadata 渲染。
 * 工具页 layout 用法见 src/app/about/page.tsx 范式。
 */
export function toolMetadataI18n(
  path: string,
  meta: Record<Locale, LocaleMeta>,
  locale: Locale,
): Metadata {
  const m = meta[locale];
  return toolMetadata({ path, locale, title: m.title, description: m.description, keywords: m.keywords });
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

/** 面包屑「首页」三语文案（此前全站硬编码英文 "Home"） */
export const HOME_NAME: Record<Locale, string> = { en: "Home", zh: "首页", tw: "首頁" };

/**
 * 从页面 title 提取短名称（取破折号/竖线前的第一段），
 * 用于面包屑与 WebApplication 名称，随 locale 变化而非硬编码英文。
 */
export function shortToolName(title: string): string {
  return (title.split(/\s*[—–|]\s*/)[0] ?? title).trim();
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
