"use client";

import { useState, useEffect } from "react";
import ZiweiInputComponent from "./components/ZiweiInput";
import ZiweiLoading from "./components/ZiweiLoading";
import ZiweiFullReport from "./components/ZiweiFullReport";
import type { ZiweiInput, ZiweiChart } from "./ziwei-engine";

type Stage = "input" | "loading" | "full";

const STORAGE_KEY_CHART = "ziwei_chart";

export default function ZiweiPage() {
  const [stage, setStage]   = useState<Stage>("input");
  const [chart, setChart]   = useState<ZiweiChart | null>(null);
  const [error, setError]   = useState<string | null>(null);
  // 从本地存储恢复
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHART);
      if (saved) {
        const parsed = JSON.parse(saved) as ZiweiChart;
        setChart(parsed);
        setStage("full");
      }
    } catch {
      /* ignore */
    }
  }, []);

  const handleSubmit = async (input: ZiweiInput) => {
    setError(null);
    setStage("loading");

    // 模拟最短加载时长（增加仪式感）
    const minDelay = new Promise<void>(r => setTimeout(r, 3200));

    try {
      const [res] = await Promise.all([
        fetch("/api/ziwei", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        }),
        minDelay,
      ]);

      if (!res.ok) {
        const err = await res.json() as { error?: string };
        throw new Error(err.error ?? "排盘失败");
      }

      const data = await res.json() as { success: boolean; chart: ZiweiChart };
      setChart(data.chart);

      // 持久化
      localStorage.setItem(STORAGE_KEY_CHART, JSON.stringify(data.chart));
      setStage("full");
    } catch (e) {
      setError(e instanceof Error ? e.message : "排盘失败，请稍后再试");
      setStage("input");
    }
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY_CHART);
    setChart(null);
    setStage("input");
    setError(null);
  };

  return (
    <main className="zw-page">
      {/* SEO H1 — 视觉隐藏，搜索引擎可读 */}
      <h1 style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
        紫微斗数排盘 — AI 紫微命盘解析
      </h1>
      {/* 返回首页 */}
      <a href="/" style={{
        position: "fixed", top: 16, left: 16, zIndex: 200,
        display: "flex", alignItems: "center", gap: 6,
        padding: "6px 14px", borderRadius: 20,
        background: "rgba(10,6,28,0.75)", backdropFilter: "blur(10px)",
        border: "1px solid rgba(201,168,76,0.25)",
        color: "rgba(201,168,76,0.85)", fontSize: "0.8rem",
        textDecoration: "none", letterSpacing: "0.06em",
        transition: "all 0.18s",
      }}>← 返回</a>

      {error && (
        <div className="zw-error-banner">
          ⚠ {error}
          <button onClick={() => setError(null)} className="zw-error-close">×</button>
        </div>
      )}

      {stage === "input" && (
        <ZiweiInputComponent
          onSubmit={handleSubmit}
          isLoading={false}
        />
      )}

      {stage === "loading" && <ZiweiLoading />}

      {stage === "full" && chart && (
        <ZiweiFullReport
          chart={chart}
          onReset={handleReset}
        />
      )}
    </main>
  );
}
