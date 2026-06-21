"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPath, LOCALES, type Locale } from "~/lib/i18n";
import { useLocaleContext } from "~/app/components/LocaleProvider";

/**
 * useLocale — 读取当前语言
 * 优先级：服务端下发的 LocaleContext（SSR 即正确，爬虫友好）
 *         > URL 路径前缀（/zh /en /tw）> cookie > 默认 zh
 *
 * Context 由 root layout 从 middleware 注入的 x-locale 解析得到，故在 SSR 阶段
 * 即为正确语言；client hydration 同值，避免闪烁与 hydration mismatch。
 */
export function useLocale(): Locale {
  const ctxLocale = useLocaleContext();

  const pathname = usePathname();
  const urlLocale = getLocaleFromPath(pathname);

  const [cookieLocale, setCookieLocale] = useState<Locale>("zh");

  useEffect(() => {
    try {
      const match = document.cookie.match(/(?:^|;\s*)mystic_locale=([^;]+)/);
      const val = match?.[1];
      if (val && LOCALES.includes(val as Locale)) {
        setCookieLocale(val as Locale);
      }
    } catch { /* ignore */ }
  }, []);

  return ctxLocale ?? urlLocale ?? cookieLocale;
}

