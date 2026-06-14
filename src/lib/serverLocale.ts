import { headers } from "next/headers";
import { LOCALES, type Locale } from "./i18n";

/**
 * getServerLocale — 在服务端组件中读取当前语言
 * middleware 会为所有路径注入 x-locale 请求头（含无前缀的工具/信息页）。
 */
export async function getServerLocale(): Promise<Locale> {
  const h = await headers();
  const val = h.get("x-locale");
  return val && LOCALES.includes(val as Locale) ? (val as Locale) : "zh";
}
