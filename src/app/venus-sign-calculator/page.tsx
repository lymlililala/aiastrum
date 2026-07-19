"use client";

import React, { useState } from "react";
import { VenusSignInput } from "./components/VenusSignInput";
import { VenusSignResultPanel } from "./components/VenusSignResult";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";
import { T, type Lang } from "./venus-i18n";
import { calcVenusSign, DEFAULT_CITY, type VenusSignResult } from "./venus-engine";
import type { CityData } from "~/app/astro/astro-engine";
// 复用 numerology 页的视觉样式（深色神秘风 + 金色点缀 #c9a84c）
import "../numerology/numerology.css";

type PageStep = "input" | "result";

export default function VenusSignCalculatorPage() {
  const lang = useLocale() as Lang;
  const t = T[lang];

  const [step, setStep] = useState<PageStep>("input");
  const [result, setResult] = useState<VenusSignResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = (birthDate: string, birthTime: string, city: CityData | null) => {
    setIsLoading(true);
    // 模拟计算动画（给用户仪式感）
    setTimeout(() => {
      const r = calcVenusSign({ birthDate, birthTime, city: city ?? DEFAULT_CITY, lang });
      setResult(r);
      setStep("result");
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  };

  const handleRecalculate = () => {
    setStep("input");
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
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
          <div className="num-page-icon">💘</div>
          <h1 className="num-page-title">{t.pageTitle}</h1>
          <p className="num-page-subtitle">
            {t.pageSubtitle1}
            <br />
            {t.pageSubtitle2}
          </p>
        </div>

        {/* 如何使用（仅输入步骤显示） */}
        {step === "input" && (
          <div style={{
            maxWidth: 560, margin: "0 auto 28px", padding: "18px 22px",
            borderRadius: 14,
            background: "rgba(16,10,38,0.7)",
            border: "1px solid rgba(201,168,76,0.22)",
          }}>
            <h2 style={{
              fontFamily: "var(--font-cinzel), serif",
              fontSize: "1rem", color: "#e8d5a3",
              letterSpacing: "0.04em", marginBottom: 14,
              borderLeft: "3px solid rgba(201,168,76,0.6)", paddingLeft: 12,
            }}>
              {t.howToTitle}
            </h2>
            <ol style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {t.howToSteps.map((s, i) => (
                <li key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  fontSize: "0.85rem", lineHeight: 1.7,
                  color: "rgba(220,205,175,0.78)",
                }}>
                  <span style={{
                    flexShrink: 0,
                    width: 22, height: 22, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(201,168,76,0.12)",
                    border: "1px solid rgba(201,168,76,0.45)",
                    color: "#c9a84c", fontSize: "0.72rem", fontWeight: 600,
                  }}>
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* 步骤：输入 or 结果 */}
        {step === "input" ? (
          <VenusSignInput
            t={t}
            lang={lang}
            onCalculate={handleCalculate}
            isLoading={isLoading}
          />
        ) : (
          result && (
            <VenusSignResultPanel
              t={t}
              lang={lang}
              result={result}
              onRecalculate={handleRecalculate}
            />
          )
        )}

        {/* ── SEO 内容区（SSR 输出，爬虫可读） ── */}
        <section style={{ maxWidth: 720, margin: "48px auto 0", padding: "0 4px" }}>
          {t.seo.map((sec) => (
            <div key={sec.heading} style={{ marginBottom: 32 }}>
              <h2 style={{
                fontFamily: "var(--font-cinzel), serif",
                fontSize: "1.15rem", color: "#e8d5a3",
                letterSpacing: "0.04em", marginBottom: 12,
                borderLeft: "3px solid rgba(201,168,76,0.6)", paddingLeft: 12,
              }}>
                {sec.heading}
              </h2>
              {sec.paragraphs.map((p, i) => (
                <p key={i} style={{
                  fontSize: "0.85rem", lineHeight: 1.85,
                  color: "rgba(220,205,175,0.72)", marginBottom: 10,
                }}>
                  {p}
                </p>
              ))}
            </div>
          ))}

          {/* FAQ（与 layout 的 FAQPage JSON-LD 对应） */}
          <h2 style={{
            fontFamily: "var(--font-cinzel), serif",
            fontSize: "1.15rem", color: "#e8d5a3",
            letterSpacing: "0.04em", marginBottom: 16,
            borderLeft: "3px solid rgba(201,168,76,0.6)", paddingLeft: 12,
          }}>
            {t.faqTitle}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {t.faq.map((f) => (
              <details
                key={f.q}
                style={{
                  borderRadius: 12, padding: "13px 16px",
                  background: "rgba(16,10,38,0.7)",
                  border: "1px solid rgba(201,168,76,0.12)",
                }}
              >
                <summary style={{
                  cursor: "pointer", fontSize: "0.86rem", fontWeight: 600,
                  color: "#e8d5a3", lineHeight: 1.5,
                }}>
                  {f.q}
                </summary>
                <p style={{
                  fontSize: "0.82rem", lineHeight: 1.8,
                  color: "rgba(220,205,175,0.7)", marginTop: 10,
                }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
