"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPath, LOCALES, type Locale } from "~/lib/i18n";

/**
 * useLocale — 读取当前语言
 * 优先级：URL 路径前缀（/zh /en /tw）> cookie > 默认 zh
 */
export function useLocale(): Locale {
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

  return urlLocale ?? cookieLocale;
}
