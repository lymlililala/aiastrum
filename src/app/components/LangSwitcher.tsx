"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LOCALES, LOCALE_LABEL, LOCALE_SHORT, getLocaleFromPath, stripLocale, type Locale } from "~/lib/i18n";

function getCookieLocale(): Locale | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)mystic_locale=([^;]+)/);
  const val = match?.[1];
  return val && LOCALES.includes(val as Locale) ? (val as Locale) : null;
}

export function LangSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 从 URL 路径或 cookie 读取当前语言
  const urlLocale = getLocaleFromPath(pathname);
  const [cookieLocale, setCookieLocale] = useState<Locale | null>(null);

  useEffect(() => {
    setCookieLocale(getCookieLocale());
  }, []);

  const currentLocale: Locale = urlLocale ?? cookieLocale ?? "zh";

  // 点击外部关闭
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(locale: Locale) {
    setOpen(false);
    // 写入 cookie（供 middleware 和工具页面读取）
    document.cookie = `mystic_locale=${locale};path=/;max-age=31536000;samesite=lax`;
    setCookieLocale(locale);

    if (urlLocale) {
      // 当前页面有 locale 前缀（首页 /zh /en /tw）：替换前缀跳转
      const bare = stripLocale(pathname);
      router.push(`/${locale}${bare === "/" ? "" : bare}`);
    } else {
      // 工具页面（/tarot /bazi 等）：无需改变 URL，刷新页面让 middleware 透传新语言
      router.refresh();
    }
  }

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Switch language"
        style={{
          display: "flex", alignItems: "center", gap: 4,
          padding: "5px 10px", borderRadius: 20,
          background: "rgba(10,6,28,0.6)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(201,168,76,0.25)",
          color: "rgba(201,168,76,0.85)", fontSize: "0.75rem",
          cursor: "pointer", letterSpacing: "0.06em",
          transition: "border-color 0.18s",
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.55)")}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)")}
      >
        <span>🌐</span>
        <span>{LOCALE_SHORT[currentLocale]}</span>
        <span style={{ fontSize: "0.6rem", opacity: 0.6 }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", right: 0,
          background: "rgba(10,6,28,0.95)", backdropFilter: "blur(20px)",
          border: "1px solid rgba(201,168,76,0.2)", borderRadius: 12,
          overflow: "hidden", minWidth: 130, zIndex: 200,
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}>
          {LOCALES.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLocale(locale)}
              style={{
                display: "block", width: "100%",
                padding: "10px 16px", textAlign: "left",
                background: locale === currentLocale ? "rgba(201,168,76,0.12)" : "transparent",
                border: "none", cursor: "pointer",
                color: locale === currentLocale ? "rgba(240,210,120,0.95)" : "rgba(200,175,130,0.75)",
                fontSize: "0.8rem",
                borderBottom: locale !== LOCALES[LOCALES.length - 1] ? "1px solid rgba(201,168,76,0.08)" : "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => {
                if (locale !== currentLocale) e.currentTarget.style.background = "rgba(201,168,76,0.07)";
              }}
              onMouseLeave={e => {
                if (locale !== currentLocale) e.currentTarget.style.background = "transparent";
              }}
            >
              {LOCALE_LABEL[locale]}
              {locale === currentLocale && <span style={{ marginLeft: 6, fontSize: "0.65rem", opacity: 0.7 }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
