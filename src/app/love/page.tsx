"use client";

import { useState, useEffect } from "react";
import LoveInputComponent from "./components/LoveInput";
import LoveLoading from "./components/LoveLoading";
import LoveFullReport from "./components/LoveFullReport";
import type { LoveReport } from "./love-data";
import type { LoveInput } from "./love-engine";

type Step = "input" | "loading" | "full-report";

const STORAGE_KEY = "love_order_report";

export default function LovePage() {
  const [step, setStep] = useState<Step>("input");
  const [report, setReport] = useState<LoveReport | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  // 读取 LocalStorage 恢复状态
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedReport = JSON.parse(saved) as LoveReport;
        setReport(parsedReport);
        setStep("full-report");
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = async (input: LoveInput) => {
    setStep("loading");

    try {
      const res = await fetch("/api/love", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      await new Promise(r => setTimeout(r, 3500)); // 最短3.5秒loading，拉满仪式感

      if (!res.ok) {
        const err = await res.json() as { error?: string };
        setErrMsg(err.error ?? "测算失败，请重试");
        setStep("input");
        return;
      }

      const data = await res.json() as { success: boolean; report: LoveReport };
      if (data.success && data.report) {
        setReport(data.report);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.report));
        setStep("full-report");
      } else {
        setErrMsg("测算失败，请重试");
        setStep("input");
      }
    } catch {
      setErrMsg("网络连接失败，请检查网络后重试");
      setStep("input");
    }
  };

  const handleReset = () => {
    setReport(null);
    setStep("input");
    setErrMsg(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <main className="love-main">
      {/* SEO H1 — 视觉隐藏，搜索引擎可读 */}
      <h1 style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
        合婚配对测算 — AI 爱情缘分分析
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

      {/* 全局星空背景 */}
      <div className="love-bg-gradient" />

      {step === "input" && (
        <>
          {errMsg && (
            <div style={{
              position: "fixed", top: 72, left: "50%", transform: "translateX(-50%)",
              zIndex: 300, padding: "10px 20px", borderRadius: 10,
              background: "rgba(180,40,40,0.92)", backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,100,100,0.35)",
              color: "rgba(255,210,200,0.95)", fontSize: "0.82rem",
              display: "flex", alignItems: "center", gap: 10,
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              maxWidth: "calc(100vw - 48px)",
            }}>
              <span>⚠ {errMsg}</span>
              <button onClick={() => setErrMsg(null)} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: "1.1rem", padding: 0, lineHeight: 1 }}>×</button>
            </div>
          )}
          <LoveInputComponent onSubmit={handleSubmit} isLoading={false} />
        </>
      )}

      {step === "loading" && <LoveLoading />}

      {step === "full-report" && report && (
        <LoveFullReport
          report={report}
          onReset={handleReset}
        />
      )}
    </main>
  );
}
