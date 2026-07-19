"use client";

import { useState, useEffect } from "react";
import LoveInputComponent from "./components/LoveInput";
import LoveLoading from "./components/LoveLoading";
import LoveFullReport from "./components/LoveFullReport";
import type { LoveReport } from "./love-data";
import type { LoveInput } from "./love-engine";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";
import { LOVE_T, type LoveLang } from "./love-i18n";

type Step = "input" | "loading" | "full-report";

const STORAGE_KEY = "love_order_report";

export default function LovePage() {
  const lang = useLocale() as LoveLang;
  const t = LOVE_T[lang];

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
        body: JSON.stringify({ ...input, lang }),
      });

      await new Promise(r => setTimeout(r, 3500)); // 最短3.5秒loading，拉满仪式感

      if (!res.ok) {
        const err = await res.json() as { error?: string };
        setErrMsg(err.error ?? t.errCalcFail);
        setStep("input");
        return;
      }

      const data = await res.json() as { success: boolean; report: LoveReport };
      if (data.success && data.report) {
        setReport(data.report);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.report));
        setStep("full-report");
      } else {
        setErrMsg(t.errCalcFail);
        setStep("input");
      }
    } catch {
      setErrMsg(t.errNetwork);
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
      }}>{t.back}</a>

      {/* 语言切换 */}
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 200 }}>
        <LangSwitcher />
      </div>

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
          <LoveInputComponent t={t} lang={lang} onSubmit={handleSubmit} isLoading={false} />

          {/* ── 新手说明：怎么玩（直接进入的用户也能立刻看懂） ── */}
          <div style={{
            margin: "8px auto 0", maxWidth: 480, width: "calc(100% - 32px)",
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
        </>
      )}

      {step === "loading" && <LoveLoading lang={lang} />}

      {step === "full-report" && report && (
        <LoveFullReport
          lang={lang}
          t={t}
          report={report}
          onReset={handleReset}
        />
      )}
    </main>
  );
}
