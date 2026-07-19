"use client";

import React from "react";
import { formatBirthdate, type NumerologyResult } from "../../numerology/numerology-engine";
import type { LpT, Lang } from "../life-path-i18n";

interface LifePathResultPanelProps {
  t: LpT;
  lang: Lang;
  result: NumerologyResult;
  onRecalculate: () => void;
}

/** 博客文章 slug：1-9 走 meaning-guide 系列，11/22/33 走 master-number 系列（均已确认在库） */
function blogSlugFor(n: number, isMaster: boolean): string {
  return isMaster ? `master-number-${n}-meaning` : `life-path-number-${n}-meaning-guide`;
}

export function LifePathResultPanel({ t, lang, result, onRecalculate }: LifePathResultPanelProps) {
  const { profile, number, isMaster, birthdate, calculationSteps, keywords } = result;

  return (
    <div className="num-result-container">
      {/* 顶部核心数字展示 */}
      <div
        className="num-result-hero"
        style={{ "--num-color": profile.colorHex, "--num-color2": profile.secondaryColorHex } as React.CSSProperties}
      >
        <div className="num-hero-glow" />

        {isMaster && <div className="num-master-badge">{t.masterBadge}</div>}

        <div style={{ fontSize: "0.72rem", letterSpacing: "0.18em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase", position: "relative" }}>
          {t.resultEyebrow}
        </div>

        {/* 核心数字 */}
        <div className="num-hero-number">
          <span className="num-hero-symbol">{profile.symbol}</span>
          <span className="num-core-number">{number}</span>
        </div>

        <div className="num-hero-name">{profile.name}</div>
        <div className="num-hero-tagline">「{profile.tagline}」</div>

        {/* 关键词标签 */}
        <div className="num-hero-keywords">
          {keywords.map((kw) => (
            <span key={kw} className="num-keyword-tag">{kw}</span>
          ))}
        </div>

        {/* 出生日期 */}
        <div className="num-hero-birthdate">
          <span className="num-birthdate-icon">📅</span>
          {formatBirthdate(birthdate.year, birthdate.month, birthdate.day, lang)}
        </div>

        {/* 元素 / 守护星 / 颜色 */}
        <div className="num-hero-meta">
          <div className="num-meta-item">
            <span className="num-meta-value">{profile.element}</span>
          </div>
          <div className="num-meta-divider" />
          <div className="num-meta-item">
            <span className="num-meta-value">{profile.planet}</span>
          </div>
          <div className="num-meta-divider" />
          <div className="num-meta-item">
            <span className="num-meta-value">{profile.color}</span>
          </div>
        </div>
      </div>

      {/* 逐步计算过程（本页差异化卖点：默认展开、全程透明） */}
      <div className="num-calc-section">
        <div className="num-calc-steps" style={{ display: "block" }}>
          <div style={{ fontSize: "0.86rem", fontWeight: 600, color: "#e8d5a3", marginBottom: 6 }}>
            🧮 {t.calcTitle}
          </div>
          <p style={{ fontSize: "0.74rem", lineHeight: 1.7, color: "rgba(200,175,140,0.6)", margin: "0 0 10px" }}>
            {t.calcNote}
          </p>
          {calculationSteps.map((step, i) => (
            <div key={i} className="num-calc-step">
              <span className="num-step-label">{step.label}</span>
              <span className="num-step-value">{step.value}</span>
            </div>
          ))}
          <div className="num-calc-result">
            <span>{t.calcResultLabel}</span>
            <span className="num-calc-final">{number}</span>
          </div>
        </div>
      </div>

      {/* 卓越数特别说明 */}
      {isMaster && (
        <div
          style={{
            marginTop: 14, padding: "12px 16px", borderRadius: 12,
            background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.2)",
            fontSize: "0.8rem", color: "rgba(232,213,163,0.85)", lineHeight: 1.7,
          }}
        >
          ⚡ {t.masterNote}
        </div>
      )}

      {/* 解读 */}
      <div style={{ marginTop: 20 }}>
        <h3 className="num-section-title">
          <span className="num-section-icon">🔮</span>
          {t.interpLabel}
        </h3>

        <div className="num-traits-cloud">
          {profile.traits.map((trait) => (
            <span key={trait} className="num-trait-tag">{trait}</span>
          ))}
        </div>

        <h3 className="num-section-title" style={{ marginTop: 18 }}>
          <span className="num-section-icon">🌟</span>
          {t.traitsLabel}
        </h3>
        {profile.positiveTraits.map((trait, i) => (
          <div key={i} className="num-trait-card">
            <div className="num-trait-card-header">
              <span className="num-trait-card-dot" />
              <h3 className="num-trait-card-title">{trait.title}</h3>
            </div>
            <p className="num-trait-card-desc">{trait.description}</p>
          </div>
        ))}

        <h3 className="num-section-title" style={{ marginTop: 18 }}>
          <span className="num-section-icon">⚡</span>
          {t.challengesLabel}
        </h3>
        {profile.challenges.map((challenge, i) => (
          <div key={i} className="num-challenge-card">
            <div className="num-challenge-header">
              <span className="num-challenge-dot" />
              <h4 className="num-challenge-title">{challenge.title}</h4>
            </div>
            <p className="num-challenge-desc">{challenge.description}</p>
          </div>
        ))}

        <h3 className="num-section-title" style={{ marginTop: 18 }}>
          <span className="num-section-icon">💗</span>
          {t.loveLabel}
        </h3>
        <div className="num-trait-card">
          <p className="num-trait-card-desc">{profile.loveInsight}</p>
        </div>
      </div>

      {/* 深入阅读：对应博客解读文章 */}
      <a
        href={`/blog/${blogSlugFor(number, isMaster)}`}
        style={{
          display: "block", marginTop: 18, padding: "13px 16px", borderRadius: 12,
          background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.15)",
          color: "#e8d5a3", fontSize: "0.84rem", fontWeight: 600, textDecoration: "none",
        }}
      >
        📖 {isMaster ? t.readMasterArticle(number) : t.readArticle(number)}
      </a>

      {/* CTA：完整灵数解读 */}
      <a
        href={`/${lang}/numerology`}
        style={{
          display: "block", marginTop: 10, padding: "13px 16px", borderRadius: 12,
          background: "linear-gradient(135deg, rgba(201,168,76,0.18), rgba(201,168,76,0.08))",
          border: "1px solid rgba(201,168,76,0.35)",
          color: "#e8d5a3", fontSize: "0.84rem", fontWeight: 600, textDecoration: "none",
          textAlign: "center",
        }}
      >
        ✦ {t.fullReadingCta}
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
