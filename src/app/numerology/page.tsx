"use client";

import React, { useState, useMemo } from "react";
import Head from "next/head";
import { NumerologyInput } from "./components/NumerologyInput";
import { NumerologyResultPanel } from "./components/NumerologyResult";
import { NumerologyPoster } from "./components/NumerologyPoster";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";
import { T, type Lang } from "./numerology-i18n";
import "./numerology.css";
import {
  getNumerologyReading,
  generateNumerologyTDK,
  type NumerologyResult,
} from "./numerology-engine";

type PageStep = "input" | "result";

export default function NumerologyPage() {
  const lang = useLocale() as Lang;
  const t = T[lang];

  const [step, setStep] = useState<PageStep>("input");
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [showPoster, setShowPoster] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = (year: number, month: number, day: number) => {
    setIsLoading(true);
    // 模拟计算动画（给用户仪式感）
    setTimeout(() => {
      const reading = getNumerologyReading(year, month, day, lang);
      setResult(reading);
      setStep("result");
      setIsLoading(false);
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  };

  const handleRecalculate = () => {
    setStep("input");
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tdk = useMemo(() => {
    if (result) {
      return generateNumerologyTDK(result.number, lang);
    }
    return generateNumerologyTDK(undefined, lang);
  }, [result, lang]);

  return (
    <>
      <Head>
        <title>{tdk.title}</title>
        <meta name="description" content={tdk.description} />
        <meta name="keywords" content={tdk.keywords} />
        <meta property="og:title" content={tdk.title} />
        <meta property="og:description" content={tdk.description} />
        <meta property="og:type" content="website" />
      </Head>

      <div className="num-page">
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
        }}>← {t.back}</a>

        {/* 语言切换 */}
        <div style={{ position: "fixed", top: 16, right: 16, zIndex: 200 }}>
          <LangSwitcher />
        </div>

        {/* 背景装饰光晕 */}
        <div className="num-bg">
          <div className="num-bg-orb num-bg-orb1" />
          <div className="num-bg-orb num-bg-orb2" />
          <div className="num-bg-orb num-bg-orb3" />
        </div>

        <div className="num-content">
          {/* 页面头部 */}
          <div className="num-page-header">
            <div className="num-page-icon">🔢</div>
            <h1 className="num-page-title">{t.pageTitle}</h1>
            <p className="num-page-subtitle">
              {t.pageSubtitle1}
              <br />
              {t.pageSubtitle2}
            </p>
          </div>

          {/* 步骤：输入 or 结果 */}
          {step === "input" ? (
            <NumerologyInput
              t={t}
              lang={lang}
              onCalculate={handleCalculate}
              isLoading={isLoading}
            />
          ) : (
            result && (
              <NumerologyResultPanel
                t={t}
                lang={lang}
                result={result}
                onShare={() => setShowPoster(true)}
                onRecalculate={handleRecalculate}
              />
            )
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

          {/* ── SEO 内容区 + FAQ（SSR 输出，爬虫可读） ── */}
          <section style={{ maxWidth: 720, margin: "48px auto 0", padding: "0 4px", textAlign: "left" }}>
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
        </div>

        {/* 海报弹窗 */}
        {result && (
          <NumerologyPoster
            t={t}
            lang={lang}
            result={result}
            visible={showPoster}
            onClose={() => setShowPoster(false)}
          />
        )}
      </div>
    </>
  );
}
