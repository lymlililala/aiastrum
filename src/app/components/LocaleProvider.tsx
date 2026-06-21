"use client";

import { createContext, useContext } from "react";
import { type Locale } from "~/lib/i18n";

/**
 * LocaleContext — 由 root layout 在服务端解析好 locale(读 middleware 注入的 x-locale)
 * 后下发。让 client 组件的 useLocale() 在 SSR 阶段即拿到正确语言,无需依赖
 * usePathname()(rewrite 后前缀不稳)或 cookie(爬虫无 cookie)。
 *
 * value 为 null 表示无 Provider(理论上不会发生,root layout 总会包裹)。
 */
export const LocaleContext = createContext<Locale | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

/** 读取 Provider 下发的 locale;无 Provider 时返回 null。 */
export function useLocaleContext(): Locale | null {
  return useContext(LocaleContext);
}
