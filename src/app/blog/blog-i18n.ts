// ===== 博客 chrome 三语文案 + 语言助手 =====
// 博客页是服务端组件（middleware 跳过 /blog，无 locale 前缀），
// 语言来源：mystic_locale cookie（列表/专题页）或文章自身 row.lang（详情页，对爬虫友好）。

import { cookies, headers } from "next/headers";
import { LOCALES, type Locale } from "~/lib/i18n";
import { CATEGORY_META, type BlogCategory } from "./blog-data";

/** locale → 文章语言（数据库 lang 列）。暂无 tw 文章，tw 回退中文。 */
export function localeToLang(locale: Locale): "zh" | "en" {
  return locale === "en" ? "en" : "zh";
}

/**
 * 读取博客 chrome 语言（服务端）。
 * 优先 x-locale 请求头(middleware 从 URL 前缀/cookie 注入,爬虫友好),再回退 cookie。
 */
export async function readBlogLocale(): Promise<Locale> {
  try {
    const h = (await headers()).get("x-locale");
    if (h && LOCALES.includes(h as Locale)) return h as Locale;
  } catch { /* ignore */ }
  try {
    const v = (await cookies()).get("mystic_locale")?.value;
    if (v && LOCALES.includes(v as Locale)) return v as Locale;
  } catch { /* ignore */ }
  return "zh";
}

/** 分类显示名：英文用 labelEn。 */
export function catLabel(category: string, locale: Locale): string {
  const meta = (CATEGORY_META as Record<string, (typeof CATEGORY_META)[BlogCategory]>)[category]
    ?? { label: "文章", labelEn: "Article", icon: "✦", color: "#c9a84c" };
  return locale === "en" ? meta.labelEn : meta.label;
}

/** 日期本地化（en → en-US 长格式；zh/tw → 原样 YYYY-MM-DD）。 */
export function fmtDate(dateStr: string, locale: Locale): string {
  if (locale !== "en") return dateStr;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export interface BlogChrome {
  // 列表页
  backHome: string;
  kbTitle: string;
  kbTagline: string;       // 顶部小字（大写装饰）
  kbDesc: string;
  totalArticles: (n: number) => string;
  readFull: string;
  emptyCategory: string;
  catAll: string;
  prevPage: string;
  nextPage: string;
  pageSuffix: (n: number) => string;
  // 通用
  minRead: (n: number) => string;
  aboutMinRead: (n: number) => string;
  // 详情页
  backKB: string;
  home: string;
  relatedArticles: string;
  viewAllCat: (label: string) => string;
  // 列表页 SEO metadata
  metaTitle: string;
  metaDesc: string;
}

export const BLOG_CHROME: Record<Locale, BlogChrome> = {
  zh: {
    backHome: "返回首页",
    kbTitle: "神秘学知识库",
    kbTagline: "MYSTIC KNOWLEDGE BASE",
    kbDesc: "塔罗78张牌意逐一解析 · 周公解梦深度科普 · 星座运势实时指南",
    totalArticles: (n) => `共 ${n} 篇文章`,
    readFull: "阅读全文 →",
    emptyCategory: "该分类暂无文章，敬请期待",
    catAll: "全部",
    prevPage: "上一页",
    nextPage: "下一页",
    pageSuffix: (n) => `第 ${n} 页`,
    minRead: (n) => `${n} 分钟阅读`,
    aboutMinRead: (n) => `约 ${n} 分钟阅读`,
    backKB: "← 返回知识库",
    home: "首页",
    relatedArticles: "相关文章",
    viewAllCat: (l) => `查看全部 ${l} 文章 →`,
    metaTitle: "神秘学知识库 — 塔罗牌意 · 周公解梦 · 星座运势",
    metaDesc: "深度解析塔罗78张牌意、周公解梦大全、十二星座运势指南。结合AI工具，让古老智慧触手可及。",
  },
  tw: {
    backHome: "返回首頁",
    kbTitle: "神祕學知識庫",
    kbTagline: "MYSTIC KNOWLEDGE BASE",
    kbDesc: "塔羅78張牌意逐一解析 · 周公解夢深度科普 · 星座運勢即時指南",
    totalArticles: (n) => `共 ${n} 篇文章`,
    readFull: "閱讀全文 →",
    emptyCategory: "該分類暫無文章，敬請期待",
    catAll: "全部",
    prevPage: "上一頁",
    nextPage: "下一頁",
    pageSuffix: (n) => `第 ${n} 頁`,
    minRead: (n) => `${n} 分鐘閱讀`,
    aboutMinRead: (n) => `約 ${n} 分鐘閱讀`,
    backKB: "← 返回知識庫",
    home: "首頁",
    relatedArticles: "相關文章",
    viewAllCat: (l) => `查看全部 ${l} 文章 →`,
    metaTitle: "神祕學知識庫 — 塔羅牌意 · 周公解夢 · 星座運勢",
    metaDesc: "深度解析塔羅78張牌意、周公解夢大全、十二星座運勢指南。結合 AI 工具，讓古老智慧觸手可及。",
  },
  en: {
    backHome: "Home",
    kbTitle: "Mystic Knowledge Base",
    kbTagline: "MYSTIC KNOWLEDGE BASE",
    kbDesc: "Tarot card meanings · Dream interpretation · Zodiac & astrology guides",
    totalArticles: (n) => `${n} articles`,
    readFull: "Read more →",
    emptyCategory: "No articles in this category yet — stay tuned.",
    catAll: "All",
    prevPage: "Prev",
    nextPage: "Next",
    pageSuffix: (n) => `Page ${n}`,
    minRead: (n) => `${n} min read`,
    aboutMinRead: (n) => `${n} min read`,
    backKB: "← Back to Knowledge Base",
    home: "Home",
    relatedArticles: "Related Articles",
    viewAllCat: (l) => `View all ${l} articles →`,
    metaTitle: "Mystic Knowledge Base — Tarot, Dreams, Astrology & More",
    metaDesc: "In-depth guides on tarot card meanings, dream interpretation, zodiac signs, numerology and more — ancient wisdom meets AI.",
  },
};
