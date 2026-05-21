// ─── 多语言核心配置 ──────────────────────────────────────────────────────────
export const LOCALES = ["en", "zh", "tw"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "zh";

/** 每种 locale 对应的 HTML lang 属性 */
export const LOCALE_LANG: Record<Locale, string> = {
  en: "en",
  zh: "zh-CN",
  tw: "zh-TW",
};

/** 切换器显示标签 */
export const LOCALE_LABEL: Record<Locale, string> = {
  en: "English",
  zh: "简体中文",
  tw: "繁體中文",
};

/** 切换器短标签（导航栏用） */
export const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  zh: "简",
  tw: "繁",
};

/** 浏览器语言 -> Locale 映射 */
export function detectLocale(acceptLang: string): Locale {
  const lang = acceptLang.toLowerCase();
  if (lang.startsWith("zh-tw") || lang.startsWith("zh-hk") || lang.startsWith("zh-mo")) {
    return "tw";
  }
  if (lang.startsWith("zh")) {
    return "zh";
  }
  if (lang.startsWith("en")) {
    return "en";
  }
  // 其他语言默认英文
  return "en";
}

/** 从 pathname 提取 locale，如 /en/tarot -> "en" */
export function getLocaleFromPath(pathname: string): Locale | null {
  const seg = pathname.split("/")[1];
  if (seg && LOCALES.includes(seg as Locale)) return seg as Locale;
  return null;
}

/** 给路径加上 locale 前缀 */
export function withLocale(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/** 移除路径中的 locale 前缀，返回干净路径 */
export function stripLocale(pathname: string): string {
  const seg = pathname.split("/")[1];
  if (seg && LOCALES.includes(seg as Locale)) {
    return pathname.slice(seg.length + 1) || "/";
  }
  return pathname;
}
