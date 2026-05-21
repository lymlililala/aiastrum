"use client";

import { useState } from "react";
import WugeInput from "./components/WugeInput";
import WugeLoading from "./components/WugeLoading";
import WugeReport from "./components/WugeReport";

type Phase = "input" | "loading" | "result";

interface WugeApiResponse {
  name: string;
  gender: "male" | "female";
  chars: string[];
  strokes: number[];
  score: number;
  scoreLevel: string;
  wuge: {
    tian: { strokes: number; level: "大吉" | "吉" | "半吉" | "凶" | "大凶"; score: number; title: string; shortDesc: string; fullDesc: string };
    ren:  { strokes: number; level: "大吉" | "吉" | "半吉" | "凶" | "大凶"; score: number; title: string; shortDesc: string; fullDesc: string };
    di:   { strokes: number; level: "大吉" | "吉" | "半吉" | "凶" | "大凶"; score: number; title: string; shortDesc: string; fullDesc: string };
    wai:  { strokes: number; level: "大吉" | "吉" | "半吉" | "凶" | "大凶"; score: number; title: string; shortDesc: string; fullDesc: string };
    zong: { strokes: number; level: "大吉" | "吉" | "半吉" | "凶" | "大凶"; score: number; title: string; shortDesc: string; fullDesc: string };
  };
  sanCai: string;
  sanCaiDesc: string;
  specialTags: string[];
  analysis: {
    personality: string;
    career: string;
    love: string;
    health: string;
  };
  lifeQuote: string;
}

export default function WugePage() {
  const [phase, setPhase] = useState<Phase>("input");
  const [currentName, setCurrentName] = useState("");
  const [reportData, setReportData] = useState<WugeApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (name: string, gender: "male" | "female") => {
    setCurrentName(name);
    setPhase("loading");
    setError(null);

    // 最少显示加载动画 2.5 秒，增加仪式感
    const minLoadTime = new Promise<void>((resolve) => setTimeout(resolve, 2500));

    const fetchPromise = fetch("/api/wuge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, gender }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json() as { error?: string };
          throw new Error(err.error ?? "测算失败，请稍后重试");
        }
        return res.json() as Promise<WugeApiResponse>;
      });

    try {
      const [data] = await Promise.all([fetchPromise, minLoadTime]);
      setReportData(data);
      setPhase("result");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "测算失败，请稍后重试";
      setError(msg);
      setPhase("input");
    }
  };

  const handleReset = () => {
    setPhase("input");
    setReportData(null);
    setError(null);
    setCurrentName("");
  };

  return (
    <div className="wuge-page">
      {/* SEO H1 — 视觉隐藏，搜索引擎可读 */}
      <h1 style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
        姓名五格测算 — 笔画数理 AI 姓名分析
      </h1>
      {/* 背景纹理层 */}
      <div className="wuge-bg-layer" aria-hidden="true">
        <div className="wuge-bg-texture" />
        <div className="wuge-bg-vignette" />
      </div>

      {/* 顶部导航 */}
      <nav className="wuge-nav">
        <a href="/" className="wuge-nav-back">
          <span className="wuge-nav-back-icon">←</span>
          返回首页
        </a>
        <div className="wuge-nav-title">
          <span className="wuge-nav-logo">☯</span>
          <span>姓名五格</span>
        </div>
        <div className="wuge-nav-right">
          {phase === "result" && (
            <button onClick={handleReset} className="wuge-nav-new-btn">
              重新测算
            </button>
          )}
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="wuge-main">
        {phase === "input" && (
          <div className="wuge-phase-container">
            {error && (
              <div className="wuge-error-banner">
                <span>⚠ {error}</span>
                <button onClick={() => setError(null)}>×</button>
              </div>
            )}
            <WugeInput onSubmit={handleSubmit} isLoading={false} />
          </div>
        )}

        {phase === "loading" && (
          <div className="wuge-phase-container">
            <WugeLoading name={currentName} />
          </div>
        )}

        {phase === "result" && reportData && (
          <div className="wuge-phase-container wuge-result-phase">
            <WugeReport data={reportData} onReset={handleReset} />
          </div>
        )}
      </main>
    </div>
  );
}
