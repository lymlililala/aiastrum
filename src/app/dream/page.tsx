"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";
import { T, type Lang } from "./dream-i18n";
import DreamInput from "./components/DreamInput";
import DreamLoading from "./components/DreamLoading";
import DreamResult, { type DreamResultData } from "./components/DreamResult";
import DreamCategory from "./components/DreamCategory";

type DreamPhase = "input" | "loading" | "result";

export default function DreamPage() {
  const lang = useLocale() as Lang;
  const t = T[lang];

  const [phase, setPhase] = useState<DreamPhase>("input");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<DreamResultData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (inputQuery: string) => {
    setQuery(inputQuery);
    setError(null);
    setPhase("loading");

    try {
      const response = await fetch("/api/dream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: inputQuery, lang }),
      });

      const data = await response.json() as DreamResultData & { error?: string };

      if (!response.ok || data.error) {
        throw new Error(data.error ?? (lang === "en" ? "Interpretation failed, please try again" : lang === "tw" ? "解夢失敗，請稍後重試" : "解梦失败，请稍后重试"));
      }

      setResult(data);
      setPhase("result");
    } catch (err) {
      const fallback = lang === "en" ? "Network error, please try again" : lang === "tw" ? "網絡錯誤，請重試" : "网络错误，请重试";
      const msg = err instanceof Error ? err.message : fallback;
      setError(msg);
      setPhase("input");
    }
  }, [lang]);

  const handleReset = useCallback(() => {
    setPhase("input");
    setResult(null);
    setQuery("");
    setError(null);
  }, []);

  return (
    <div className="dream-page">
      {/* SEO H1 — 视觉隐藏，搜索引擎可读 */}
      <h1 style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
        周公解梦 — AI 梦境解析与潜意识探索
      </h1>
      {/* 星空背景 */}
      <div className="dream-bg" aria-hidden="true">
        <div className="dream-bg-gradient" />
        <div className="dream-nebula dream-nebula-1" />
        <div className="dream-nebula dream-nebula-2" />
        <div className="dream-nebula dream-nebula-3" />
      </div>

      {/* 顶部导航 */}
      <nav className="dream-nav">
        <Link href="/" className="dream-nav-back">
          {t.back}
        </Link>
        <div className="dream-nav-brand">
          <span className="dream-nav-moon">🌙</span>
          <span className="dream-nav-title">{t.brand}</span>
        </div>
        <div className="dream-nav-right">
          <LangSwitcher />
        </div>
      </nav>

      {/* 主内容 */}
      <main className="dream-main">
        {phase === "input" && (
          <div className="dream-content-wrap">
            {error && (
              <div className="dream-error-banner">
                ⚠️ {error}
              </div>
            )}
            <DreamInput t={t} lang={lang} onSubmit={handleSubmit} isLoading={false} />

            {/* ── 新手说明：怎么解梦（首次进入也能立刻看懂） ── */}
            <div style={{
              margin: "28px auto 0", maxWidth: 480, width: "100%",
              background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.22)",
              borderRadius: 14, padding: "18px 20px", textAlign: "left",
            }}>
              <div style={{
                fontFamily: "var(--font-cinzel), serif", fontSize: "0.95rem",
                color: "#e8d5a3", letterSpacing: "0.06em", marginBottom: 12,
              }}>{t.howToTitle}</div>
              <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {t.howToSteps.map((s, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{
                      flexShrink: 0, width: 22, height: 22, borderRadius: "50%",
                      border: "1px solid rgba(201,168,76,0.55)", color: "#c9a84c",
                      fontSize: "0.72rem", display: "inline-flex", alignItems: "center", justifyContent: "center",
                      marginTop: 1,
                    }}>{i + 1}</span>
                    <span style={{ fontSize: "0.85rem", color: "rgba(220,205,175,0.8)", lineHeight: 1.7 }}>{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            <DreamCategory t={t} lang={lang} onKeywordClick={handleSubmit} />
          </div>
        )}

        {phase === "loading" && <DreamLoading t={t} lang={lang} query={query} />}

        {phase === "result" && result && (
          <DreamResult t={t} lang={lang} data={result} onReset={handleReset} />
        )}

        {/* ── SEO 内容区 + FAQ（SSR 输出，爬虫可读） ── */}
        <section style={{ maxWidth: 720, margin: "48px auto 0", padding: "0 20px", textAlign: "left" }}>
          {t.seoSections.map((sec) => (
            <div key={sec.heading} style={{ marginBottom: 28 }}>
              <h2 style={{
                fontFamily: "var(--font-cinzel), serif", fontSize: "1.05rem",
                color: "#e8d5a3", letterSpacing: "0.04em", marginBottom: 10,
                borderLeft: "3px solid rgba(201,168,76,0.6)", paddingLeft: 12,
              }}>{sec.heading}</h2>
              <p style={{ fontSize: "0.88rem", color: "rgba(200,175,140,0.75)", lineHeight: 1.85, margin: 0 }}>{sec.body}</p>
            </div>
          ))}
          <h2 style={{
            fontFamily: "var(--font-cinzel), serif", fontSize: "1.05rem",
            color: "#e8d5a3", letterSpacing: "0.04em", marginBottom: 12,
            borderLeft: "3px solid rgba(201,168,76,0.6)", paddingLeft: 12,
          }}>{t.faqTitle}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {t.faq.map((f) => (
              <details key={f.q} style={{
                background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.18)",
                borderRadius: 12, padding: "12px 16px",
              }}>
                <summary style={{ cursor: "pointer", fontSize: "0.88rem", color: "rgba(232,213,163,0.9)", fontWeight: 600, lineHeight: 1.5 }}>{f.q}</summary>
                <p style={{ fontSize: "0.84rem", color: "rgba(200,175,140,0.72)", lineHeight: 1.8, margin: "10px 0 2px" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
