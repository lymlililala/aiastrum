import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  // metadataBase 统一使用不带 www 的标准域名，与 sitemap/robots 保持一致
  // Next.js 会据此自动生成每个页面的 canonical 标签
  metadataBase: new URL("https://aiastrum.com"),
  title: "MysticAI · 命运密语 | Tarot, Astrology & Eastern Wisdom",
  description: "Your daily cosmic guide — Tarot readings, birth charts, Bazi destiny, MBTI × Zodiac, AI oracle and more. Ancient wisdom meets modern AI.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  alternates: {
    canonical: "https://aiastrum.com",
  },
  openGraph: {
    title: "MysticAI · 命运密语 | Destiny Oracle",
    description: "Your daily cosmic guide — Tarot, Astrology, Bazi, AI Mystic & more. Ancient wisdom meets modern AI.",
    type: "website",
    url: "https://aiastrum.com",
  },
  keywords: ["tarot", "astrology", "bazi", "zodiac", "MBTI", "numerology", "I Ching", "feng shui", "destiny", "oracle", "AI divination", "占卜", "八字", "星盘", "塔罗"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className={`${GeistSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-crimson bg-deep-purple min-h-screen">
        {/* 星空背景 */}
        <div className="stars-bg" />
        {/* 装饰星点 */}
        <Stars />
        {children}
      </body>
    </html>
  );
}

function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() < 0.7 ? 1 : Math.random() < 0.9 ? 2 : 3,
    delay: `${Math.random() * 4}s`,
    duration: `${2 + Math.random() * 3}s`,
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
            animationDelay: star.delay,
            animationDuration: star.duration,
            animation: `twinkle ${star.duration} ease-in-out ${star.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
