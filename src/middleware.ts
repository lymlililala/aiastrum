import { type NextRequest, NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE, detectLocale, getLocaleFromPath, type Locale } from "~/lib/i18n";

// 不需要 i18n 处理的路径前缀
const SKIP_PREFIXES = [
  "/_next",
  "/api",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
  "/images",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 跳过静态资源和 API
  if (SKIP_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // 已有 locale 前缀则放行
  const existingLocale = getLocaleFromPath(pathname);
  if (existingLocale) {
    const response = NextResponse.next();
    // 在响应头中透传 locale，供 RSC 读取
    response.headers.set("x-locale", existingLocale);
    return response;
  }

  // 读取用户偏好 cookie（手动切换后保存）
  const cookieLocale = request.cookies.get("mystic_locale")?.value as Locale | undefined;
  if (cookieLocale && LOCALES.includes(cookieLocale)) {
    return NextResponse.redirect(new URL(`/${cookieLocale}${pathname}`, request.url));
  }

  // 浏览器语言嗅探
  const acceptLang = request.headers.get("accept-language") ?? "";
  const firstLang = acceptLang.split(",")[0]?.trim() ?? "";
  const detected = detectLocale(firstLang);

  // 只有非默认语言才重定向，默认语言(zh)保持 /zh/ 路径
  const targetLocale = detected ?? DEFAULT_LOCALE;
  return NextResponse.redirect(new URL(`/${targetLocale}${pathname}`, request.url));
}

export const config = {
  matcher: [
    // 匹配所有路径，排除 Next.js 内部路径和静态文件
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
