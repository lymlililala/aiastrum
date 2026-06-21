"use client";

import { useEffect } from "react";
import { LOCALE_LANG, type Locale } from "~/lib/i18n";

/**
 * 客户端兜底：把 <html lang> 校正为文章自身语言。
 *
 * 根 layout 的 <html lang> 来自 middleware 注入的 x-locale（基于 cookie，缺省 zh），
 * 而博客详情页的真实语言以 post.lang 为准。两者可能不一致（例如无 cookie 的爬虫
 * 访问英文文章时 html lang 仍是 zh-CN）。本组件在挂载后将 document.documentElement.lang
 * 设为文章语言对应的 html lang，确保渲染 JS 后的语言标注准确。
 */
export default function SyncHtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const locale: Locale = lang === "en" ? "en" : lang === "tw" ? "tw" : "zh";
    document.documentElement.lang = LOCALE_LANG[locale];
  }, [lang]);
  return null;
}
