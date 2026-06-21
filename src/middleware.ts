import { type NextRequest, NextResponse } from "next/server";
import { LOCALES, detectLocale, getLocaleFromPath, stripLocale, type Locale } from "~/lib/i18n";
import { isPrefixedRoute } from "~/lib/routes";

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

const COOKIE_OPTS = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax" as const,
};

/** 把 x-locale 注入到「传给页面的请求头」,使服务端组件 headers() 能读到。 */
function withLocaleHeader(request: NextRequest, locale: Locale): Headers {
  const h = new Headers(request.headers);
  h.set("x-locale", locale);
  return h;
}

/** 确定性语言判定:cookie → Accept-Language → zh。用于无前缀路径的 301 目标。 */
function resolveLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get("mystic_locale")?.value as Locale | undefined;
  if (cookieLocale && LOCALES.includes(cookieLocale)) return cookieLocale;
  const acceptLang = request.headers.get("accept-language") ?? "";
  const firstLang = acceptLang.split(",")[0]?.trim() ?? "";
  return detectLocale(firstLang);
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 跳过静态资源、API
  if (SKIP_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // ── A. 已有 locale 前缀(/zh /en /tw …) ────────────────────────────────────
  const existingLocale = getLocaleFromPath(pathname);
  if (existingLocale) {
    const bare = stripLocale(pathname); // "/tarot" / "/blog" / "/" / "/blog/slug"

    // 裸前缀(/zh):首页,走 app/[lang]/page.tsx,不 rewrite
    if (bare === "/") {
      const res = NextResponse.next({ request: { headers: withLocaleHeader(request, existingLocale) } });
      res.cookies.set("mystic_locale", existingLocale, COOKIE_OPTS);
      return res;
    }

    // 范围内路径(工具页/信息页/博客列表):rewrite 到物理无前缀页面
    if (isPrefixedRoute(bare)) {
      const url = request.nextUrl.clone();
      url.pathname = bare;
      const res = NextResponse.rewrite(url, { request: { headers: withLocaleHeader(request, existingLocale) } });
      res.cookies.set("mystic_locale", existingLocale, COOKIE_OPTS);
      return res;
    }

    // 范围外却误带前缀(如 /zh/blog/slug):301 收敛到无前缀规范 URL
    const url = request.nextUrl.clone();
    url.pathname = bare;
    return NextResponse.redirect(url, 301);
  }

  // ── B. 无 locale 前缀 ──────────────────────────────────────────────────────

  // 博客详情 / topic pillar:本阶段保持无前缀,只注入 x-locale(cookie,缺省 zh)
  if (pathname.startsWith("/blog/")) {
    const cookieLocale = request.cookies.get("mystic_locale")?.value as Locale | undefined;
    const blogLocale = cookieLocale && LOCALES.includes(cookieLocale) ? cookieLocale : "zh";
    return NextResponse.next({ request: { headers: withLocaleHeader(request, blogLocale) } });
  }

  // 根路径 "/":按浏览器语言重定向到 /{detected}
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${resolveLocale(request)}`, request.url), 307);
  }

  // 范围内的无前缀路径(/tarot、/about、精确 /blog):301 到 /{detected}{path}(保留 query)
  if (isPrefixedRoute(pathname)) {
    const locale = resolveLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    url.search = search;
    return NextResponse.redirect(url, 301);
  }

  // 其余无前缀路径:兜底放行,按 Accept-Language 注入 x-locale
  return NextResponse.next({ request: { headers: withLocaleHeader(request, resolveLocale(request)) } });
}

export const config = {
  matcher: [
    // 匹配所有路径，排除 Next.js 内部路径和静态文件
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
