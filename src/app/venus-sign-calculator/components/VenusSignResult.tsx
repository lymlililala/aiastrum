"use client";

import React from "react";
import { ZODIAC_MAP } from "~/app/astro/astro-data";
import { getZodiacName } from "~/app/astro/astro-content-i18n";
import type { VenusSignResult } from "../venus-engine";
import type { VenusT, Lang } from "../venus-i18n";

interface VenusSignResultPanelProps {
  t: VenusT;
  lang: Lang;
  result: VenusSignResult;
  onRecalculate: () => void;
}

export function VenusSignResultPanel({ t, lang, result, onRecalculate }: VenusSignResultPanelProps) {
  const zodiac = ZODIAC_MAP[result.sign];
  const signName = getZodiacName(result.sign, lang);
  const altName = result.altSign ? getZodiacName(result.altSign, lang) : null;

  return (
    <div className="num-result-container">
      {/* 结果头部：星座符号 + 名称 */}
      <div className="num-result-hero">
        <div className="num-hero-glow" style={{ background: `radial-gradient(circle, ${zodiac.color}33 0%, transparent 70%)` }} />
        <div style={{ fontSize: "0.72rem", letterSpacing: "0.18em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase", position: "relative" }}>
          {t.resultEyebrow}
        </div>
        <div
          className="num-hero-symbol"
          style={{
            color: zodiac.color, fontSize: "4.5rem", lineHeight: 1.1, opacity: 1, margin: "10px 0 6px",
            filter: `drop-shadow(0 0 24px ${zodiac.color}88)`,
          }}
        >
          {zodiac.symbol}
        </div>
        <div className="num-hero-name">{signName}</div>
        <div className="num-hero-tagline">
          💘 {t.venusIn} {signName} · {result.degree}°{`${result.minute}`.padStart(2, "0")}′
        </div>

        {/* 元信息：度数 / 元素 / 守护星 */}
        <div className="num-hero-meta">
          <div className="num-meta-item">
            <div className="num-meta-label">{t.degreeLabel}</div>
            <div className="num-meta-value">{result.degree}°{`${result.minute}`.padStart(2, "0")}′</div>
          </div>
          <div className="num-meta-divider" />
          <div className="num-meta-item">
            <div className="num-meta-label">{t.elementLabel}</div>
            <div className="num-meta-value">{t.elements[zodiac.element] ?? zodiac.element}</div>
          </div>
          <div className="num-meta-divider" />
          <div className="num-meta-item">
            <div className="num-meta-label">{t.rulerLabel}</div>
            <div className="num-meta-value">{t.planets[zodiac.ruler] ?? zodiac.ruler}</div>
          </div>
        </div>
      </div>

      {/* 恋爱风格解读 */}
      <div className="num-trait-card" style={{ marginTop: 20 }}>
        <div className="num-trait-card-header">
          <span className="num-trait-card-dot" style={{ background: zodiac.color }} />
          <span className="num-trait-card-title">{t.interpLabel}</span>
        </div>
        <p className="num-trait-card-desc">{result.interpretation}</p>
      </div>

      {/* 极少数跨座日：给出另一种可能 */}
      {altName && (
        <div
          style={{
            marginTop: 14, padding: "12px 16px", borderRadius: 12,
            background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.2)",
            fontSize: "0.8rem", color: "rgba(232,213,163,0.85)", lineHeight: 1.7,
          }}
        >
          ⏳ {t.altSignNote(altName)}
        </div>
      )}

      {/* 深入阅读：对应博客解读文章 */}
      <a
        href={`/blog/${result.blogSlug}`}
        style={{
          display: "block", marginTop: 14, padding: "13px 16px", borderRadius: 12,
          background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.15)",
          color: "#e8d5a3", fontSize: "0.84rem", fontWeight: 600, textDecoration: "none",
        }}
      >
        📖 {t.readArticle(signName)}
      </a>

      {/* CTA：完整星盘 */}
      <a
        href={`/${lang}/astro`}
        style={{
          display: "block", marginTop: 10, padding: "13px 16px", borderRadius: 12,
          background: "linear-gradient(135deg, rgba(201,168,76,0.18), rgba(201,168,76,0.08))",
          border: "1px solid rgba(201,168,76,0.35)",
          color: "#e8d5a3", fontSize: "0.84rem", fontWeight: 600, textDecoration: "none",
          textAlign: "center",
        }}
      >
        ✦ {t.fullChartCta}
      </a>

      {/* CTA：爱情解读 */}
      <a
        href={`/${lang}/love`}
        style={{
          display: "block", marginTop: 10, padding: "13px 16px", borderRadius: 12,
          background: "linear-gradient(135deg, rgba(224,112,138,0.16), rgba(201,168,76,0.06))",
          border: "1px solid rgba(224,112,138,0.3)",
          color: "#e8d5a3", fontSize: "0.84rem", fontWeight: 600, textDecoration: "none",
          textAlign: "center",
        }}
      >
        💕 {t.loveCta}
      </a>

      {/* 操作按钮 */}
      <div className="num-result-actions">
        <button className="num-recalc-btn" onClick={onRecalculate}>
          {t.recalcBtn}
        </button>
      </div>
    </div>
  );
}
