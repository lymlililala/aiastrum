"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import DreamInput from "./components/DreamInput";
import DreamLoading from "./components/DreamLoading";
import DreamResult, { type DreamResultData } from "./components/DreamResult";
import DreamCategory from "./components/DreamCategory";

type DreamPhase = "input" | "loading" | "result";

export default function DreamPage() {
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
        body: JSON.stringify({ query: inputQuery }),
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
  }, []);

  const handleReset = useCallback(() => {
    setPhase("input");
    setResult(null);
    setQuery("");
    setError(null);
  }, []);

  return (
    <div className="dream-page">
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
          ← 返回
        </Link>
        <div className="dream-nav-brand">
          <span className="dream-nav-moon">🌙</span>
          <span className="dream-nav-title">周公解梦</span>
        </div>
        <div className="dream-nav-right" />
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
            <DreamInput onSubmit={handleSubmit} isLoading={false} />
            <DreamCategory onKeywordClick={handleSubmit} />
          </div>
        )}

        {phase === "loading" && <DreamLoading query={query} />}

        {phase === "result" && result && (
          <DreamResult data={result} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}
