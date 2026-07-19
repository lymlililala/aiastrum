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
            {/* ── 新手说明：怎么玩（直接进入的用户也能立刻看懂） ── */}
            <div style={{
              margin: "0 auto 28px", maxWidth: 480, width: "100%",
              background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.22)",
              borderRadius: 14, padding: "18px 20px", textAlign: "left",
              boxSizing: "border-box",
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

      {/* ── SEO 内容区 + FAQ（SSR 输出，爬虫可读） ── */}
      <section style={{ maxWidth: 720, margin: "48px auto 0", padding: "0 20px 32px", textAlign: "left", boxSizing: "border-box", width: "100%" }}>
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
