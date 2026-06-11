"use client";

import { useState } from "react";
import MeihuaInputComponent from "./components/MeihuaInput";
import MeihuaLoading from "./components/MeihuaLoading";
import MeihuaResultComponent from "./components/MeihuaResult";
import MeihuaKnowledge from "./components/MeihuaKnowledge";
import type { MeihuaInput } from "./meihua-engine";
import type { MeihuaResult } from "./meihua-engine";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";
import { T, type Lang } from "./meihua-i18n";

type Step = "input" | "loading" | "result";

export default function MeihuaPage() {
  const lang = useLocale() as Lang;
  const t = T[lang];

  const [step, setStep] = useState<Step>("input");
  const [result, setResult] = useState<MeihuaResult | null>(null);
  const [aiReading, setAiReading] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (input: MeihuaInput) => {
    setStep("loading");

    try {
      const response = await fetch("/api/meihua", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, lang }),
      });

      if (!response.ok) {
        throw new Error(t.reqFailed);
      }

      const data = await response.json() as {
        success: boolean;
        result: MeihuaResult;
        aiReading?: string | null;
        error?: string;
      };

      if (data.success) {
        setResult(data.result);
        setAiReading(data.aiReading ?? null);
        // 加载动画至少持续 1.8 秒，增加仪式感
        await new Promise(resolve => setTimeout(resolve, 1800));
        setStep("result");
      } else {
        throw new Error(data.error ?? t.unknownErr);
      }
    } catch (err) {
      console.warn("梅花起卦错误:", err);
      setErrorMsg(t.castFailed);
      setStep("input");
    }
  };

  const handleReset = () => {
    setStep("input");
    setResult(null);
    setAiReading(null);
    setErrorMsg(null);
  };

  return (
    <div className="meihua-page">
      {/* SEO H1 — 视觉隐藏，搜索引擎可读 */}
      <h1 style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
        梅花心易 — AI 梅花易数在线起卦
      </h1>
      {/* 水墨背景装饰 */}
      <div className="meihua-bg-decoration">
        <div className="meihua-bg-plum">✿</div>
        <div className="meihua-bg-taiji">☯</div>
      </div>

      {/* 顶部导航 */}
      <nav className="meihua-nav">
        <a href="/" className="meihua-nav-back">
          {t.back}
        </a>
        <div className="meihua-nav-brand">
          <span className="meihua-nav-icon">✿</span>
          <span className="meihua-nav-title">{t.brand}</span>
        </div>
        <div className="meihua-nav-placeholder">
          <LangSwitcher />
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="meihua-main">
        {step === "input" && (
          <>
            {errorMsg && (
              <div style={{
                margin: "16px 20px 0",
                padding: "12px 16px",
                borderRadius: 10,
                background: "rgba(200,80,80,0.12)",
                border: "1px solid rgba(220,80,80,0.3)",
                color: "rgba(255,160,140,0.9)",
                fontSize: "0.82rem",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span>⚠ {errorMsg}</span>
                <button onClick={() => setErrorMsg(null)} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: "1rem", padding: "0 4px" }}>×</button>
              </div>
            )}
            <MeihuaInputComponent lang={lang} t={t} onSubmit={handleSubmit} isLoading={false} />
            <MeihuaKnowledge lang={lang} t={t} />
          </>
        )}

        {step === "loading" && (
          <MeihuaLoading t={t} />
        )}

        {step === "result" && result && (
          <>
            <MeihuaResultComponent
              lang={lang}
              t={t}
              result={result}
              aiReading={aiReading}
              onReset={handleReset}
            />
            <MeihuaKnowledge lang={lang} t={t} />
          </>
        )}
      </main>

      {/* 底部 */}
      <footer className="meihua-footer">
        <p className="meihua-footer-text">
          {t.footerText}
        </p>
        <p className="meihua-footer-quote">{t.footerQuote}</p>
      </footer>
    </div>
  );
}
