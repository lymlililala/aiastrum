/**
 * not-found.tsx
 * Next.js 会自动为此组件返回 HTTP 404 状态码，修复"软 404"问题。
 * 搜索引擎将正确识别不存在的页面，避免浪费抓取配额。
 */
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | AiAstrum",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 24px",
        fontFamily: "Cinzel, serif",
      }}
    >
      <div style={{ fontSize: "4rem", marginBottom: 16 }}>✦</div>
      <h1
        style={{
          fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
          fontWeight: 700,
          background: "linear-gradient(135deg,#e8d5a3,#c9a84c)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: 12,
          letterSpacing: "0.06em",
        }}
      >
        404 — Page Not Found
      </h1>
      <p
        style={{
          fontSize: "0.95rem",
          color: "rgba(210,195,170,0.72)",
          marginBottom: 32,
          lineHeight: 1.6,
          maxWidth: 400,
        }}
      >
        The stars couldn&apos;t find this page. It may have moved or never existed.
      </p>
      <Link
        href="/zh"
        style={{
          display: "inline-block",
          padding: "10px 28px",
          borderRadius: 24,
          border: "1px solid rgba(201,168,76,0.45)",
          background: "rgba(201,168,76,0.1)",
          color: "#c9a84c",
          fontSize: "0.85rem",
          textDecoration: "none",
          letterSpacing: "0.08em",
          transition: "background 0.2s",
        }}
      >
        ← Return Home
      </Link>
    </div>
  );
}
