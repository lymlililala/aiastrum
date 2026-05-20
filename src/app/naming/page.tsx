"use client";

import React, { useState } from "react";
import NamingInput from "./components/NamingInput";
import NamingLoading from "./components/NamingLoading";
import BaziResult from "./components/BaziResult";
import NameList from "./components/NameList";
import NameDetail from "./components/NameDetail";
import { type WuXing } from "./naming-data";

// ===== 类型定义 =====
type Step = "input" | "loading" | "bazi" | "names" | "detail";

interface NameCharDetail {
  char: string;
  wuxing: WuXing;
  meaning: string;
  pinyin: string;
  strokes: number;
}

interface NameSuggestion {
  name: string;
  chars: string[];
  charDetails: NameCharDetail[];
  combinedWuxing: WuXing[];
  synergy: string;
  overallMeaning: string;
  source?: string;
  sourceText?: string;
  sourceExplain?: string;
  tonePattern: string;
  gender: "male" | "female" | "neutral";
  score: number;
  isPremium: boolean;
  tags: string[];
}

interface AIName {
  name: string;
  pinyin: string;
  wuxing: string[];
  meaning: string;
  source: string;
  sourceText: string;
  recommend_reason: string;
}

interface BaziData {
  pillars: Array<{
    label: string;
    gan: string;
    zhi: string;
    ganWuxing: WuXing;
    zhiWuxing: WuXing;
  }>;
  wuxingScores: Record<WuXing, number>;
  dominant: WuXing[];
  weak: WuXing[];
  xiyongshen: WuXing[];
  diagnosis: string;
}

interface NamingApiResult {
  bazi: BaziData;
  surname: string;
  gender: "male" | "female";
  freeSuggestions: NameSuggestion[];
  premiumCount: number;
  premiumSuggestions: NameSuggestion[];
  aiNames: AIName[];
}

// ===== 进度指示器 =====
function StepIndicator({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "input", label: "填写信息" },
    { key: "bazi", label: "八字解析" },
    { key: "names", label: "吉名推荐" },
    { key: "detail", label: "名字详情" },
  ];

  const activeSteps: Step[] = ["bazi", "names", "detail"];
  const currentIdx = steps.findIndex(s => s.key === step);

  if (step === "input" || step === "loading") return null;

  return (
    <div className="naming-step-indicator">
      {steps.map((s, idx) => {
        const isActive = s.key === step;
        const isDone = idx < currentIdx;
        const isReachable = activeSteps.includes(s.key);
        return (
          <React.Fragment key={s.key}>
            {idx > 0 && <div className={`naming-step-line ${isDone ? "naming-step-line-done" : ""}`} />}
            <div
              className={`naming-step-node ${isActive ? "naming-step-active" : ""} ${isDone ? "naming-step-done" : ""} ${!isReachable ? "naming-step-disabled" : ""}`}
            >
              <span className="naming-step-num">{idx + 1}</span>
              <span className="naming-step-label">{s.label}</span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ===== 主页面 =====
export default function NamingPage() {
  const [step, setStep] = useState<Step>("input");
  const [apiResult, setApiResult] = useState<NamingApiResult | null>(null);
  const [selectedName, setSelectedName] = useState<NameSuggestion | null>(null);
  const [inputData, setInputData] = useState<{
    surname: string;
    gender: "male" | "female";
    year: number;
    month: number;
    day: number;
    hour: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 提交表单 → 调用 API
  const handleSubmit = async (data: typeof inputData) => {
    if (!data) return;
    setInputData(data);
    setStep("loading");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/naming", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json() as { error?: string };
        throw new Error(errData.error ?? "请求失败");
      }

      const result = await res.json() as NamingApiResult;
      setApiResult(result);
      setStep("bazi");
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "推算出错，请稍后再试");
      setStep("input");
    }
  };

  // 重新测算
  const handleReset = () => {
    setStep("input");
    setApiResult(null);
    setSelectedName(null);
    setInputData(null);
    setErrorMsg(null);
  };

  return (
    <main className="naming-page">
      {/* 背景纹样 */}
      <div className="naming-page-bg" aria-hidden="true">
        <div className="naming-bg-pattern" />
      </div>

      {/* 顶部导航 */}
      <header className="naming-nav">
        <a href="/" className="naming-nav-back">← 返回首页</a>
        <div className="naming-nav-title">墨韵起名</div>
        {step !== "input" && (
          <button className="naming-nav-reset" onClick={handleReset}>重新测算</button>
        )}
      </header>

      {/* 步骤指示器 */}
      <StepIndicator step={step} />

      {/* 内容区 */}
      <div className="naming-page-content">
        {/* 输入页 */}
        {step === "input" && (
          <NamingInput
            onSubmit={handleSubmit}
            isLoading={false}
          />
        )}

        {/* 错误提示 */}
        {errorMsg && step === "input" && (
          <div className="naming-api-error">
            <span>⚠ {errorMsg}</span>
          </div>
        )}

        {/* 加载页 */}
        {step === "loading" && inputData && (
          <NamingLoading
            surname={inputData.surname}
            gender={inputData.gender}
          />
        )}

        {/* 八字解析页 */}
        {step === "bazi" && apiResult && (
          <BaziResult
            bazi={apiResult.bazi}
            surname={apiResult.surname}
            gender={apiResult.gender}
            onContinue={() => setStep("names")}
          />
        )}

        {/* 名字推荐页 */}
        {step === "names" && apiResult && (
          <NameList
            surname={apiResult.surname}
            gender={apiResult.gender}
            freeSuggestions={apiResult.freeSuggestions}
            premiumCount={0}
            premiumSuggestions={[]}
            aiNames={apiResult.aiNames}
            onUnlock={() => undefined}
            onSelectName={(name) => {
              setSelectedName(name);
              setStep("detail");
            }}
          />
        )}

        {/* 名字详情页 */}
        {step === "detail" && selectedName && apiResult && (
          <NameDetail
            suggestion={selectedName}
            surname={apiResult.surname}
            xiyongshen={apiResult.bazi.xiyongshen}
            onBack={() => setStep("names")}
          />
        )}
      </div>

      {/* 底部 */}
      <footer className="naming-footer">
        <p>墨韵起名 · 结合传统命理与诗词审美</p>
        <p className="naming-footer-note">本工具仅供参考，名字最终选择以父母意愿为准</p>
      </footer>
    </main>
  );
}
