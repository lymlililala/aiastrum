import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Cinzel, Crimson_Text } from "next/font/google";
import { type Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { headers } from "next/headers";
import { LOCALE_LANG, type Locale } from "~/lib/i18n";
import { BASE_URL } from "~/lib/seo";
import { SiteFooter } from "./components/SiteFooter";
import { LocaleProvider } from "./components/LocaleProvider";

// ── 全局默认 metadata（各页面可通过 generateMetadata 覆盖） ──────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    // 站点名统一为 AiAstrum，避免与「命运密语」混排导致 Google 提取出中文站名
    default: "AiAstrum | Tarot, Astrology & Eastern Wisdom",
    template: "%s | AiAstrum",
  },
  description: "Your daily cosmic guide — Tarot readings, birth charts, Bazi destiny, MBTI × Zodiac, AI oracle and more. Ancient wisdom meets modern AI.",
  // Google 搜索要求 favicon 尺寸为 48 的倍数，提供 192x192 PNG 保证 SERP 正常显示
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  // canonical 不在此处硬写，由各页面 generateMetadata 动态设置
  // hreflang alternates 仅首页在此设置，工具页通过 generateMetadata 设置
  openGraph: {
    siteName: "AiAstrum",
    title: "AiAstrum | Destiny Oracle",
    description: "Your daily cosmic guide — Tarot, Astrology, Bazi, AI Mystic & more. Ancient wisdom meets modern AI.",
    type: "website",
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/images/og-cover.png`,
        width: 1200,
        height: 630,
        alt: "AiAstrum — AI Divination & Cosmic Wisdom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AiAstrum | Destiny Oracle",
    description: "Tarot, Astrology, Bazi, AI Mystic & more. Ancient wisdom meets modern AI.",
    images: [`${BASE_URL}/images/og-cover.png`],
  },
  keywords: ["tarot", "astrology", "bazi", "zodiac", "MBTI", "numerology", "I Ching", "feng shui", "destiny", "oracle", "AI divination", "占卜", "八字", "星盘", "塔罗"],
};

// 装饰字体自托管（next/font 自动子集化 + preload，替代外链 Google Fonts 与 CSS @import）
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
});
const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-crimson",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // 从请求头读取 x-locale（middleware 注入），缺省 zh
  const headersList = await headers();
  const localeHeader = headersList.get("x-locale") as Locale | null;
  const locale: Locale = localeHeader ?? "zh";
  const htmlLang = LOCALE_LANG[locale];

  // ── 站点级 JSON-LD（WebSite + Organization）──────────────────────────────
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        "url": BASE_URL,
        "name": "AiAstrum",
        "alternateName": "命运密语",
        "description": "AI-powered divination platform — Tarot, Astrology, Bazi & Eastern Wisdom",
        "inLanguage": ["en", "zh-CN", "zh-TW"],
        // 不声明 SearchAction：站内无搜索功能，虚假目标会被 Google 忽略并损害结构化数据可信度
      },
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        "name": "AiAstrum",
        "alternateName": "命运密语",
        "url": BASE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/images/logo.png`,
          "width": 200,
          "height": 200,
        },
        "sameAs": [],
      },
    ],
  };

  return (
    <html lang={htmlLang} className={`${GeistSans.variable} ${cinzel.variable} ${crimsonText.variable}`}>
      <head>
        {/* 站点级结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google AdSense */}
        <Script
          id="google-adsense"
          async
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6592832176305007"
        />
      </head>
      <body className="font-crimson bg-deep-purple min-h-screen">
        {/* 星空背景 */}
        <div className="stars-bg" />
        {/* 装饰星点 */}
        <Stars />
        <LocaleProvider locale={locale}>
          {children}
          <SiteFooter locale={locale} year={new Date().getFullYear()} />
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}

function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    top: `${((i * 137.508) % 100)}%`,
    left: `${((i * 97.3) % 100)}%`,
    size: i % 10 < 7 ? 1 : i % 10 < 9 ? 2 : 3,
    delay: `${(i * 0.23) % 4}s`,
    duration: `${2 + (i * 0.13) % 3}s`,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: 0.25,
            animation: `twinkle ${star.duration} ease-in-out ${star.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
