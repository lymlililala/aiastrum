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
        throw new Error(data.error ?? "解梦失败，请稍后重试");
      }

      setResult(data);
      setPhase("result");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "网络错误，请重试";
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
            <DreamCategory t={t} lang={lang} onKeywordClick={handleSubmit} />
          </div>
        )}

        {phase === "loading" && <DreamLoading t={t} lang={lang} query={query} />}

        {phase === "result" && result && (
          <DreamResult t={t} lang={lang} data={result} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}
