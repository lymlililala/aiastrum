"use client";

import { useState, useEffect } from "react";
import ZiweiInputComponent from "./components/ZiweiInput";
import ZiweiLoading from "./components/ZiweiLoading";
import ZiweiFullReport from "./components/ZiweiFullReport";
import { runZiweiEngine } from "./ziwei-engine";
import type { ZiweiInput, ZiweiChart } from "./ziwei-engine";
import { resolveStarDisplay } from "./ziwei-data";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";
import { T, type Lang } from "./ziwei-i18n";

type Stage = "input" | "loading" | "full";

const STORAGE_KEY_CHART = "ziwei_chart";
// 各语言「默认名」集合：重新本地化时让默认名跟随语言切换（真实姓名保持不动）
const DEFAULT_NAMES = new Set([T.zh.anonymous, T.en.anonymous, T.tw.anonymous]);

export default function ZiweiPage() {
  const lang = useLocale() as Lang;
  const t = T[lang];

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

  // 语言对齐：localStorage 里恢复的盘是「排盘时语言」烤死的（表头主星/五行局/性格标签/
  // 各 Tab 解读都是当时语言的成品字符串）。若与当前语言不一致，用当前语言重新跑一次引擎。
  // 紫微引擎是纯函数且确定性的——同样的出生信息排出的星曜布局与语言无关，只是显示字符串
  // 随语言变化，所以重排只会「换语言」不会「换盘」。判断是否需要重排用纯函数比对主星显示名，
  // 这样连早期没有语言标记的旧存盘也能自动识别纠正。
  useEffect(() => {
    if (!chart) return;
    if (resolveStarDisplay(chart.mingStarName, lang) === chart.mingStarDisplay) return; // 语言已一致
    const regen = runZiweiEngine(
      {
        name:       chart.name,
        gender:     chart.gender,
        birthYear:  chart.birthYear,
        birthMonth: chart.birthMonth,
        birthDay:   chart.birthDay,
        birthHour:  chart.birthHour,
        isLunar:    false, // 引擎不使用此字段，仅为补齐类型
      },
      lang,
    );
    // 默认名（匿名 / Anonymous）跟随当前语言；用户自填的真实姓名原样保留
    if (DEFAULT_NAMES.has(regen.name)) regen.name = t.anonymous;
    setChart(regen);
    try { localStorage.setItem(STORAGE_KEY_CHART, JSON.stringify(regen)); } catch { /* ignore */ }
  }, [chart, lang, t.anonymous]);

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
          body: JSON.stringify({ ...input, lang }),
        }),
        minDelay,
      ]);

      if (!res.ok) {
        const err = await res.json() as { error?: string };
        throw new Error(err.error ?? t.errCalcFailed);
      }

      const data = await res.json() as { success: boolean; chart: ZiweiChart };
      setChart(data.chart);

      // 持久化
      localStorage.setItem(STORAGE_KEY_CHART, JSON.stringify(data.chart));
      setStage("full");
    } catch (e) {
      setError(e instanceof Error ? e.message : t.errCalcRetry);
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
        {t.seoH1}
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
      }}>← {t.back}</a>

      {/* 语言切换 */}
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 200 }}>
        <LangSwitcher />
      </div>

      {error && (
        <div className="zw-error-banner">
          ⚠ {error}
          <button onClick={() => setError(null)} className="zw-error-close" aria-label={t.errClose}>×</button>
        </div>
      )}

      {stage === "input" && (
        <ZiweiInputComponent
          onSubmit={handleSubmit}
          isLoading={false}
          t={t}
          lang={lang}
        />
      )}

      {stage === "loading" && <ZiweiLoading t={t} lang={lang} />}

      {stage === "full" && chart && (
        <ZiweiFullReport
          chart={chart}
          onReset={handleReset}
          t={t}
          lang={lang}
        />
      )}
    </main>
  );
}
