import { type NextRequest, NextResponse } from "next/server";
import { LOCALES, detectLocale, getLocaleFromPath, type Locale } from "~/lib/i18n";

// 不需要 i18n 处理的路径前缀
const SKIP_PREFIXES = [
  "/_next",
  "/api",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
  "/images",
  "/blog",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 跳过静态资源、API、blog
  if (SKIP_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // 已有 locale 前缀（/zh /en /tw），直接放行
  const existingLocale = getLocaleFromPath(pathname);
  if (existingLocale) {
    const response = NextResponse.next();
    response.headers.set("x-locale", existingLocale);
    // 同步 cookie，让工具页面也能读到当前语言
    response.cookies.set("mystic_locale", existingLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  // 以下处理没有 locale 前缀的路径（工具页面：/tarot, /bazi 等）
  // 工具页面不重定向，只透传语言信息给页面

  // 1. 优先读 cookie（用户手动切换过）
  const cookieLocale = request.cookies.get("mystic_locale")?.value as Locale | undefined;
  if (cookieLocale && LOCALES.includes(cookieLocale)) {
    const response = NextResponse.next();
    response.headers.set("x-locale", cookieLocale);
    return response;
  }

  // 2. 仅对根路径 "/" 做浏览器语言嗅探跳转
  if (pathname === "/") {
    const acceptLang = request.headers.get("accept-language") ?? "";
    const firstLang = acceptLang.split(",")[0]?.trim() ?? "";
    const detected = detectLocale(firstLang);
    return NextResponse.redirect(new URL(`/${detected}`, request.url));
  }

  // 3. 其他无 locale 前缀的路径，直接放行（工具页面保持原 URL）
  const response = NextResponse.next();
  // 从 Accept-Language 推断语言并透传
  const acceptLang = request.headers.get("accept-language") ?? "";
  const firstLang = acceptLang.split(",")[0]?.trim() ?? "";
  const detected = detectLocale(firstLang);
  response.headers.set("x-locale", detected);
  return response;
}

export const config = {
  matcher: [
    // 匹配所有路径，排除 Next.js 内部路径和静态文件
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
