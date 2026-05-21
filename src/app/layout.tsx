import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { headers } from "next/headers";
import { LOCALE_LANG, getLocaleFromPath, type Locale } from "~/lib/i18n";

const BASE_URL = "https://aiastrum.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "AiAstrum · 命运密语 | Tarot, Astrology & Eastern Wisdom",
  description: "Your daily cosmic guide — Tarot readings, birth charts, Bazi destiny, MBTI × Zodiac, AI oracle and more. Ancient wisdom meets modern AI.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en":    `${BASE_URL}/en`,
      "zh-CN": `${BASE_URL}/zh`,
      "zh-TW": `${BASE_URL}/tw`,
      "x-default": `${BASE_URL}/zh`,
    },
  },
  openGraph: {
    title: "AiAstrum · 命运密语 | Destiny Oracle",
    description: "Your daily cosmic guide — Tarot, Astrology, Bazi, AI Mystic & more. Ancient wisdom meets modern AI.",
    type: "website",
    url: BASE_URL,
  },
  keywords: ["tarot", "astrology", "bazi", "zodiac", "MBTI", "numerology", "I Ching", "feng shui", "destiny", "oracle", "AI divination", "占卜", "八字", "星盘", "塔罗"],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // 从请求头读取 x-locale（middleware 注入），或解析路径
  const headersList = await headers();
  const localeHeader = headersList.get("x-locale") as Locale | null;
  const xPathname = headersList.get("x-pathname") ?? headersList.get("x-invoke-path") ?? "/";
  const locale: Locale = localeHeader ?? getLocaleFromPath(xPathname) ?? "zh";
  const htmlLang = LOCALE_LANG[locale];

  return (
    <html lang={htmlLang} className={`${GeistSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
        {/* hreflang SEO 标签 */}
        <link rel="alternate" hrefLang="en"      href={`${BASE_URL}/en`} />
        <link rel="alternate" hrefLang="zh-CN"   href={`${BASE_URL}/zh`} />
        <link rel="alternate" hrefLang="zh-TW"   href={`${BASE_URL}/tw`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/zh`} />
      </head>
      <body className="font-crimson bg-deep-purple min-h-screen">
        {/* 星空背景 */}
        <div className="stars-bg" />
        {/* 装饰星点 */}
        <Stars />
        {children}
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
            opacity: 0.4,
            animation: `twinkle ${star.duration} ease-in-out ${star.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}


