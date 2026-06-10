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
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";
import { SYN_T, type SynLang } from "./synastry-i18n";

type Phase = "input" | "loading" | "result";

export default function SynastryPage() {
  const lang = useLocale() as SynLang;
  const t = SYN_T[lang];

  const [phase, setPhase] = useState<Phase>("input");
  const [pendingInput, setPendingInput] = useState<SynastryInputType | null>(null);
  const [result, setResult] = useState<SynastryResult | null>(null);
  const [showPoster, setShowPoster] = useState(false);

  const handleSubmit = (data: SynastryInputType) => {
    setPendingInput(data);
    setPhase("loading");

    // 模拟星盘计算延迟（增加仪式感）
    setTimeout(() => {
      const res = buildSynastryResult(data, lang);
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
      }}>{t.back}</a>

      {/* 语言切换 */}
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 200 }}>
        <LangSwitcher />
      </div>

      {/* 英雄区 */}
      <div className="syn-hero">
        <div className="syn-hero-bg" />
        <div className="syn-hero-tag">{t.heroTag}</div>
        <h1 className="syn-hero-title">
          {t.heroTitleL1}<br />{t.heroTitleL2}
        </h1>
        <p className="syn-hero-sub">
          {t.heroSub}
        </p>
      </div>

      {/* 主内容区 */}
      <div className="syn-content">
        {phase === "input" && (
          <div className="syn-fade-in">
            <SynastryInput onSubmit={handleSubmit} t={t} lang={lang} />
          </div>
        )}

        {phase === "loading" && pendingInput && (
          <SynastryLoading
            personAName={pendingInput.personA.name}
            personBName={pendingInput.personB.name}
            relationType={pendingInput.relationType}
            t={t}
          />
        )}

        {phase === "result" && result && (
          <div className="syn-fade-in">
            {/* 双星盘图 */}
            <SynastryChart result={result} t={t} lang={lang} />

            {/* 报告 */}
            <SynastryReport
              result={result}
              onShowPoster={() => setShowPoster(true)}
              onReset={handleReset}
              t={t}
              lang={lang}
            />
          </div>
        )}
      </div>

      {/* 海报弹窗 */}
      {showPoster && result && (
        <SynastryPoster
          result={result}
          onClose={() => setShowPoster(false)}
          t={t}
          lang={lang}
        />
      )}
    </div>
  );
}
