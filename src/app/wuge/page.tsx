"use client";

import { useState } from "react";
import WugeInput from "./components/WugeInput";
import WugeLoading from "./components/WugeLoading";
import WugeReport from "./components/WugeReport";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";
import { T, type Lang } from "./wuge-i18n";

type Phase = "input" | "loading" | "result";

interface WugeApiResponse {
  name: string;
  gender: "male" | "female";
  chars: string[];
  strokes: number[];
  score: number;
  scoreLevel: string;
  wuge: {
    tian: { strokes: number; level: string; levelKey: "大吉" | "吉" | "半吉" | "凶" | "大凶"; score: number; title: string; shortDesc: string; fullDesc: string };
    ren:  { strokes: number; level: string; levelKey: "大吉" | "吉" | "半吉" | "凶" | "大凶"; score: number; title: string; shortDesc: string; fullDesc: string };
    di:   { strokes: number; level: string; levelKey: "大吉" | "吉" | "半吉" | "凶" | "大凶"; score: number; title: string; shortDesc: string; fullDesc: string };
    wai:  { strokes: number; level: string; levelKey: "大吉" | "吉" | "半吉" | "凶" | "大凶"; score: number; title: string; shortDesc: string; fullDesc: string };
    zong: { strokes: number; level: string; levelKey: "大吉" | "吉" | "半吉" | "凶" | "大凶"; score: number; title: string; shortDesc: string; fullDesc: string };
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
  const lang = useLocale() as Lang;
  const t = T[lang];

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
      body: JSON.stringify({ name, gender, lang }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json() as { error?: string };
          throw new Error(err.error ?? t.calcFailed);
        }
        return res.json() as Promise<WugeApiResponse>;
      });

    try {
      const [data] = await Promise.all([fetchPromise, minLoadTime]);
      setReportData(data);
      setPhase("result");
    } catch (err) {
      const msg = err instanceof Error ? err.message : t.calcFailed;
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
          {t.back}
        </a>
        <div className="wuge-nav-title">
          <span className="wuge-nav-logo">☯</span>
          <span>{t.brand}</span>
        </div>
        <div className="wuge-nav-right">
          {phase === "result" && (
            <button onClick={handleReset} className="wuge-nav-new-btn">
              {t.restart}
            </button>
          )}
          <LangSwitcher />
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
            <WugeInput t={t} onSubmit={handleSubmit} isLoading={false} />

            {/* ── 新手说明：怎么测算（SSR 输出，直接进入的用户也能看懂） ── */}
            <div style={{
              marginTop: 24, maxWidth: 480, width: "100%", marginLeft: "auto", marginRight: "auto",
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
          </div>
        )}

        {phase === "loading" && (
          <div className="wuge-phase-container">
            <WugeLoading t={t} name={currentName} />
          </div>
        )}

        {phase === "result" && reportData && (
          <div className="wuge-phase-container wuge-result-phase">
            <WugeReport t={t} data={reportData} onReset={handleReset} />
          </div>
        )}

        {/* ── SEO 内容区 + FAQ（SSR 输出，爬虫可读） ── */}
        <section style={{ maxWidth: 720, margin: "48px auto 0", padding: "0 16px", textAlign: "left" }}>
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
          <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 40 }}>
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
      </main>
    </div>
  );
}
