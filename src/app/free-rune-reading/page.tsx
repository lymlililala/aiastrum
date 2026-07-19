"use client";

import React, { useState } from "react";
import { RuneCastInput } from "./components/RuneCastInput";
import { RuneCastResult } from "./components/RuneCastResult";
import { RunePoster } from "~/app/rune/components/RunePoster";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";
import { T, type Lang } from "./rune-reading-i18n";
import { drawRunes, type SpreadType, type RuneReadingResult } from "~/app/rune/rune-engine";
// 复用 numerology 页的视觉样式（深色神秘风 + 金色点缀 #c9a84c）
import "../numerology/numerology.css";
// 复用 /rune 页解读组件所需的 rune-* 样式
import "../rune/rune.css";

type PageStep = "input" | "casting" | "result";

const RUNE_SYMBOLS = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ"];

export default function FreeRuneReadingPage() {
  const lang = useLocale() as Lang;
  const t = T[lang];

  const [step, setStep] = useState<PageStep>("input");
  const [result, setResult] = useState<RuneReadingResult | null>(null);
  const [showPoster, setShowPoster] = useState(false);
  const [shuffleSymbols, setShuffleSymbols] = useState<string[]>(RUNE_SYMBOLS.slice(0, 4));

  const handleCast = (spread: SpreadType) => {
    setStep("casting");
    // 洗牌动画：符文随机闪烁（给抽取仪式感），然后执行真实抽取
    let count = 0;
    const interval = setInterval(() => {
      setShuffleSymbols(
        Array.from({ length: 4 }, () => RUNE_SYMBOLS[Math.floor(Math.random() * RUNE_SYMBOLS.length)]!),
      );
      count++;
      if (count >= 8) {
        clearInterval(interval);
        setResult(drawRunes(spread, lang));
        setStep("result");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 120);
  };

  const handleAgain = () => {
    setStep("input");
    setResult(null);
    setShowPoster(false);
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
          <div className="num-page-icon">ᚠ</div>
          <h1 className="num-page-title">{t.pageTitle}</h1>
          <p className="num-page-subtitle">
            {t.pageSubtitle1}
            <br />
            {t.pageSubtitle2}
          </p>
        </div>

        {/* 如何使用：步骤说明（仅输入步骤展示） */}
        {step === "input" && (
          <div style={{
            maxWidth: 720, margin: "0 auto 28px",
            borderRadius: 14, padding: "18px 20px",
            background: "rgba(16,10,38,0.7)",
            border: "1px solid rgba(201,168,76,0.18)",
          }}>
            <h2 style={{
              fontFamily: "var(--font-cinzel), serif",
              fontSize: "1.05rem", color: "#e8d5a3",
              letterSpacing: "0.04em", marginBottom: 14,
              borderLeft: "3px solid rgba(201,168,76,0.6)", paddingLeft: 12,
            }}>
              {t.howToTitle}
            </h2>
            <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {t.howToSteps.map((s, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{
                    flexShrink: 0, width: 22, height: 22, borderRadius: "50%",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid rgba(201,168,76,0.55)", color: "#c9a84c",
                    fontSize: "0.72rem", fontWeight: 600, marginTop: 1,
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "rgba(220,205,175,0.78)" }}>
                    {s}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* 步骤：选择牌阵 → 洗牌 → 结果 */}
        {step === "input" && (
          <RuneCastInput t={t} onCast={handleCast} />
        )}

        {step === "casting" && (
          <div className="num-input-card" style={{ textAlign: "center", padding: "48px 24px" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 18, marginBottom: 18 }}>
              {shuffleSymbols.map((s, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "2rem", color: "#e8d5a3",
                    textShadow: "0 0 18px rgba(201,168,76,0.8)",
                    animation: `twinkle 0.6s ease-in-out ${i * 0.12}s infinite alternate`,
                    display: "inline-block",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
            <p style={{ fontSize: "0.82rem", color: "rgba(220,205,175,0.7)", letterSpacing: "0.06em" }}>
              {t.castingText}
            </p>
          </div>
        )}

        {step === "result" && result && (
          <RuneCastResult
            t={t}
            lang={lang}
            result={result}
            onShare={() => setShowPoster(true)}
            onAgain={handleAgain}
          />
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

      {/* 符文石分享卡片弹窗（复用 /rune 页组件） */}
      {result && (
        <RunePoster
          result={result}
          lang={lang}
          visible={showPoster}
          onClose={() => setShowPoster(false)}
        />
      )}
    </div>
  );
}
