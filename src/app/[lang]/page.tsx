/**
 * [lang]/page.tsx
 * 处理 /zh  /en  /tw 三个语言路由，渲染与根路由相同的首页内容。
 * 语言状态通过 URL 路径（usePathname）由 page.tsx 内部读取。
 */
import { type Metadata } from "next";
import { LOCALES, type Locale } from "~/lib/i18n";
import RootPage from "../page";
import { BASE_URL } from "~/lib/seo";

interface Props {
  params: { lang: string };
}

// 静态生成三个语言版本
export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

const LANG_META: Record<string, { title: string; description: string; lang: string }> = {
  zh: {
    title: "AiAstrum · 命运密语 | 塔罗占卜 · 星盘解析 · 东方玄学",
    description: "你的每日宇宙指南 — 塔罗牌解读、生辰八字、星盘分析、紫微斗数、MBTI星座，古老智慧与现代 AI 的交融，探索属于你的命运密码。",
    lang: "zh-CN",
  },
  tw: {
    title: "AiAstrum · 命運密語 | 塔羅占卜 · 星盤解析 · 東方玄學",
    description: "你的每日宇宙指南 — 塔羅牌解讀、生辰八字、星盤分析、紫微斗數、MBTI星座，古老智慧與現代 AI 的交融，探索屬於你的命運密碼。",
    lang: "zh-TW",
  },
  en: {
    title: "AiAstrum — AI Divination & Cosmic Wisdom | Tarot, Astrology & Eastern Wisdom",
    description: "Your daily cosmic guide — AI Tarot readings, birth charts, Bazi destiny, MBTI × Zodiac, and 20+ divination tools. Ancient wisdom meets modern AI.",
    lang: "en",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = LOCALES.includes(params.lang as Locale) ? params.lang : "zh";
  const meta = LANG_META[lang] ?? LANG_META.zh!;
  const canonicalUrl = `${BASE_URL}/${lang}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "zh-CN":     `${BASE_URL}/zh`,
        "zh-TW":     `${BASE_URL}/tw`,
        "en":        `${BASE_URL}/en`,
        "x-default": `${BASE_URL}/zh`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      type: "website",
      siteName: "AiAstrum",
      locale: meta.lang,
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
      title: meta.title,
      description: meta.description,
      images: [`${BASE_URL}/images/og-cover.png`],
    },
  };
}

export default function LangPage({ params }: Props) {
  const isValid = LOCALES.includes(params.lang as Locale);
  if (!isValid) return null;
  return <RootPage />;
}
