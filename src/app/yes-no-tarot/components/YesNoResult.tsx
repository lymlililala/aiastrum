"use client";

import React from "react";
import type { YesNoResult, Verdict } from "../yes-no-engine";
import type { YesNoT, Lang } from "../yes-no-i18n";

interface YesNoResultPanelProps {
  t: YesNoT;
  lang: Lang;
  result: YesNoResult;
  onRedraw: () => void;
}

const VERDICT_COLOR: Record<Verdict, string> = {
  yes: "#9be39b",
  no: "#e07a5f",
  maybe: "#e8d5a3",
};

export function YesNoResultPanel({ t, lang, result, onRedraw }: YesNoResultPanelProps) {
  const color = VERDICT_COLOR[result.verdict];
  const isThree = result.cards.length === 3;

  return (
    <div className="num-result-container">
      {/* 结果头部：判定词 */}
      <div className="num-result-hero">
        <div className="num-hero-glow" style={{ background: `radial-gradient(circle, ${color}33 0%, transparent 70%)` }} />
        <div style={{ fontSize: "0.72rem", letterSpacing: "0.18em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase", position: "relative" }}>
          {t.resultEyebrow}
        </div>
        <div
          className="num-hero-symbol"
          style={{
            color, fontSize: "3.2rem", lineHeight: 1.1, opacity: 1, margin: "14px 0 4px",
            filter: `drop-shadow(0 0 24px ${color}88)`,
            fontFamily: "var(--font-cinzel), serif", letterSpacing: "0.12em", fontWeight: 700,
          }}
        >
          {t.verdictIcon[result.verdict]} {t.verdict[result.verdict]}
        </div>

        {/* 用户的问题（如填写） */}
        {result.question && (
          <div className="num-hero-tagline">
            {t.yourQuestion}: “{result.question}”
          </div>
        )}

        {/* 整体解读 */}
        <p style={{
          marginTop: 14, fontSize: "0.84rem", lineHeight: 1.8,
          color: "rgba(220,205,175,0.78)", maxWidth: 520, marginLeft: "auto", marginRight: "auto",
          position: "relative",
        }}>
          {t.summary[result.verdict]}
        </p>
      </div>

      {/* 抽到的牌 */}
      <div style={{
        display: "flex", gap: isThree ? 12 : 0, justifyContent: "center",
        flexWrap: "wrap", marginTop: 24,
      }}>
        {result.cards.map((c, i) => {
          const cardName = lang === "en" ? c.card.name : c.card.nameCn;
          return (
            <div key={`${c.card.id}-${i}`} style={{ width: isThree ? 130 : 170, textAlign: "center" }}>
              {isThree && (
                <div style={{ fontSize: "0.68rem", letterSpacing: "0.12em", color: "rgba(201,168,76,0.55)", marginBottom: 6, textTransform: "uppercase" }}>
                  {t.positions3[i]}
                </div>
              )}
              <div style={{
                borderRadius: 12, overflow: "hidden",
                border: "1px solid rgba(201,168,76,0.3)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/cards/${c.card.imageFile}`}
                  alt={cardName}
                  style={{
                    width: "100%", display: "block",
                    transform: c.reversed ? "rotate(180deg)" : "none",
                  }}
                />
              </div>
              <div style={{ marginTop: 8, fontSize: "0.8rem", color: "#e8d5a3", fontWeight: 600 }}>
                {cardName}
              </div>
              <div style={{ fontSize: "0.68rem", color: "rgba(200,175,140,0.6)", marginTop: 2 }}>
                {c.reversed ? t.reversed : t.upright} · {t.leans} {t.verdict[c.verdict]}
              </div>
            </div>
          );
        })}
      </div>

      {/* 牌意解释 */}
      <div className="num-trait-card" style={{ marginTop: 24 }}>
        <div className="num-trait-card-header">
          <span className="num-trait-card-dot" style={{ background: color }} />
          <span className="num-trait-card-title">{t.whyLabel}</span>
        </div>
        {result.cards.map((c, i) => {
          const cardName = lang === "en" ? c.card.name : c.card.nameCn;
          return (
            <p key={`${c.card.id}-m-${i}`} className="num-trait-card-desc" style={{ marginBottom: 10 }}>
              <strong style={{ color: "#e8d5a3" }}>
                {cardName}（{c.reversed ? t.reversed : t.upright}）：
              </strong>
              {c.meaning}
            </p>
          );
        })}
      </div>

      {/* 判定规则说明 / 娱乐声明 */}
      <div
        style={{
          marginTop: 14, padding: "12px 16px", borderRadius: 12,
          background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.2)",
          fontSize: "0.78rem", color: "rgba(232,213,163,0.8)", lineHeight: 1.7,
        }}
      >
        ☽ {t.disclaimerNote}
      </div>

      {/* 深入阅读：相关博客文章 */}
      <a
        href="/blog/tarot-yes-no-quick-methods"
        style={{
          display: "block", marginTop: 14, padding: "13px 16px", borderRadius: 12,
          background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.15)",
          color: "#e8d5a3", fontSize: "0.84rem", fontWeight: 600, textDecoration: "none",
        }}
      >
        📖 {t.articleQuick}
      </a>
      <a
        href="/blog/tarot-yes-no-every-card"
        style={{
          display: "block", marginTop: 10, padding: "13px 16px", borderRadius: 12,
          background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.15)",
          color: "#e8d5a3", fontSize: "0.84rem", fontWeight: 600, textDecoration: "none",
        }}
      >
        📖 {t.articleEvery}
      </a>

      {/* CTA：完整塔罗占卜 */}
      <a
        href={`/${lang}/tarot`}
        style={{
          display: "block", marginTop: 10, padding: "13px 16px", borderRadius: 12,
          background: "linear-gradient(135deg, rgba(201,168,76,0.18), rgba(201,168,76,0.08))",
          border: "1px solid rgba(201,168,76,0.35)",
          color: "#e8d5a3", fontSize: "0.84rem", fontWeight: 600, textDecoration: "none",
          textAlign: "center",
        }}
      >
        ✦ {t.ctaTarot}
      </a>

      {/* 操作按钮 */}
      <div className="num-result-actions">
        <button className="num-recalc-btn" onClick={onRedraw}>
          {t.redrawBtn}
        </button>
      </div>
    </div>
  );
}
