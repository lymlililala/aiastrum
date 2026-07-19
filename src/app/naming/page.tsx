"use client";

import React, { useState } from "react";
import NamingInput from "./components/NamingInput";
import NamingLoading from "./components/NamingLoading";
import BaziResult from "./components/BaziResult";
import NameList from "./components/NameList";
import NameDetail from "./components/NameDetail";
import { type WuXing } from "./naming-data";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";
import { T, type Lang, type NamingT } from "./naming-i18n";

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
function StepIndicator({ step, t }: { step: Step; t: NamingT }) {
  const steps: { key: Step; label: string }[] = [
    { key: "input", label: t.stepInput },
    { key: "bazi", label: t.stepBazi },
    { key: "names", label: t.stepNames },
    { key: "detail", label: t.stepDetail },
  ];

  const activeSteps: Step[] = ["bazi", "names", "detail"];
  // "loading" 不是独立步骤，复用 "input" 节点作为当前位置
  const displayStep: Step = step === "loading" ? "input" : step;
  const currentIdx = steps.findIndex(s => s.key === displayStep);

  // 不再 early return null：SSR（step === "input"）也要输出步骤指示器，
  // 让首次进入的用户一眼看到完整流程。

  return (
    <div className="naming-step-indicator">
      {steps.map((s, idx) => {
        const isActive = s.key === displayStep;
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
  const lang = useLocale() as Lang;
  const t = T[lang];

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
        body: JSON.stringify({ ...data, lang }),
      });

      if (!res.ok) {
        const errData = await res.json() as { error?: string };
        throw new Error(errData.error ?? t.reqFailed);
      }

      const result = await res.json() as NamingApiResult;
      setApiResult(result);
      setStep("bazi");
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : t.calcFailed);
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
      {/* SEO H1 — 视觉隐藏，搜索引擎可读 */}
      <h1 style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
        墨韵起名 — 八字五行 AI 智能起名
      </h1>
      {/* 背景纹样 */}
      <div className="naming-page-bg" aria-hidden="true">
        <div className="naming-bg-pattern" />
      </div>

      {/* 顶部导航 */}
      <header className="naming-nav">
        <a href="/" className="naming-nav-back">{t.back}</a>
        <div className="naming-nav-title">{t.brand}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {step !== "input" && (
            <button className="naming-nav-reset" onClick={handleReset}>{t.restart}</button>
          )}
          <LangSwitcher />
        </div>
      </header>

      {/* 步骤指示器 */}
      <StepIndicator step={step} t={t} />

      {/* 内容区 */}
      <div className="naming-page-content">
        {/* 输入页 */}
        {step === "input" && (
          <NamingInput
            onSubmit={handleSubmit}
            isLoading={false}
            t={t}
          />
        )}

        {/* 错误提示 */}
        {errorMsg && step === "input" && (
          <div className="naming-api-error">
            <span>⚠ {errorMsg}</span>
          </div>
        )}

        {/* ── 新手说明：怎么玩（仅输入步展示，SSR 输出） ── */}
        {step === "input" && (
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
        )}

        {/* 加载页 */}
        {step === "loading" && inputData && (
          <NamingLoading
            surname={inputData.surname}
            gender={inputData.gender}
            t={t}
          />
        )}

        {/* 八字解析页 */}
        {step === "bazi" && apiResult && (
          <BaziResult
            bazi={apiResult.bazi}
            surname={apiResult.surname}
            gender={apiResult.gender}
            onContinue={() => setStep("names")}
            t={t}
            lang={lang}
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
            t={t}
            lang={lang}
          />
        )}

        {/* 名字详情页 */}
        {step === "detail" && selectedName && apiResult && (
          <NameDetail
            suggestion={selectedName}
            surname={apiResult.surname}
            xiyongshen={apiResult.bazi.xiyongshen}
            onBack={() => setStep("names")}
            t={t}
            lang={lang}
          />
        )}
      </div>

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

      {/* 底部 */}
      <footer className="naming-footer">
        <p>{t.footerL1}</p>
        <p className="naming-footer-note">{t.footerNote}</p>
      </footer>
    </main>
  );
}
