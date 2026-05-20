"use client";

import { useState } from "react";
import "./synastry.css";
import SynastryInput from "./components/SynastryInput";
import SynastryLoading from "./components/SynastryLoading";
import SynastryChart from "./components/SynastryChart";
import SynastryReport from "./components/SynastryReport";
import SynastryPoster from "./components/SynastryPoster";
import type { SynastryInput as SynastryInputType, SynastryResult } from "./synastry-engine";
import { buildSynastryResult } from "./synastry-engine";

type Phase = "input" | "loading" | "result";

export default function SynastryPage() {
  const [phase, setPhase] = useState<Phase>("input");
  const [pendingInput, setPendingInput] = useState<SynastryInputType | null>(null);
  const [result, setResult] = useState<SynastryResult | null>(null);
  const [showPoster, setShowPoster] = useState(false);

  const handleSubmit = (data: SynastryInputType) => {
    setPendingInput(data);
    setPhase("loading");

    // 模拟星盘计算延迟（增加仪式感）
    setTimeout(() => {
      const res = buildSynastryResult(data);
      setResult(res);
      setPhase("result");
    }, 3200);
  };

  const handleReset = () => {
    setResult(null);
    setPendingInput(null);
    setPhase("input");
    setShowPoster(false);
  };

  return (
    <div className="syn-page">
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

      {/* 英雄区 */}
      <div className="syn-hero">
        <div className="syn-hero-bg" />
        <div className="syn-hero-tag">Synastry · 星盘合盘</div>
        <h1 className="syn-hero-title">
          你们之间<br />有宇宙级的缘分吗？
        </h1>
        <p className="syn-hero-sub">
          输入双方的出生信息，AI 星盘引擎将分析两人之间的行星相位，
          计算契合度评分，揭示你们关系背后的宇宙密码
        </p>
      </div>

      {/* 主内容区 */}
      <div className="syn-content">
        {phase === "input" && (
          <div className="syn-fade-in">
            <SynastryInput onSubmit={handleSubmit} />
          </div>
        )}

        {phase === "loading" && pendingInput && (
          <SynastryLoading
            personAName={pendingInput.personA.name}
            personBName={pendingInput.personB.name}
            relationType={pendingInput.relationType}
          />
        )}

        {phase === "result" && result && (
          <div className="syn-fade-in">
            {/* 双星盘图 */}
            <SynastryChart result={result} />

            {/* 报告 */}
            <SynastryReport
              result={result}
              onShowPoster={() => setShowPoster(true)}
              onReset={handleReset}
            />
          </div>
        )}
      </div>

      {/* 海报弹窗 */}
      {showPoster && result && (
        <SynastryPoster
          result={result}
          onClose={() => setShowPoster(false)}
        />
      )}
    </div>
  );
}
