"use client";

import React, { useEffect, useState } from "react";
import { drawYesNo, type YesNoResult } from "../yes-no-engine";
import type { YesNoT, Lang } from "../yes-no-i18n";

interface YesNoDrawProps {
  t: YesNoT;
  lang: Lang;
  onComplete: (result: YesNoResult) => void;
}

export function YesNoDraw({ t, lang, onComplete }: YesNoDrawProps) {
  const [question, setQuestion] = useState("");
  const [count, setCount] = useState<1 | 3>(1);
  const [shuffling, setShuffling] = useState(false);
  const [shuffleTick, setShuffleTick] = useState(0);

  // 洗牌动画（约 2.2 秒，仪式感复刻 /tarot 抽牌页的洗牌交互）后抽牌判定
  useEffect(() => {
    if (!shuffling) return;
    const iv = setInterval(() => setShuffleTick((c) => c + 1), 350);
    const to = setTimeout(() => {
      clearInterval(iv);
      onComplete(drawYesNo(count, question.trim(), lang));
    }, 2200);
    return () => {
      clearInterval(iv);
      clearTimeout(to);
    };
  }, [shuffling, count, question, lang, onComplete]);

  // ── 洗牌中 ──────────────────────────────────────────
  if (shuffling) {
    return (
      <div className="num-input-card" style={{ textAlign: "center", padding: "48px 24px" }}>
        <h2 className="num-input-title" style={{ marginBottom: 24 }}>{t.shuffling}</h2>
        <div style={{ position: "relative", width: 120, height: 200, margin: "0 auto 24px" }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute", inset: 0, borderRadius: 12, overflow: "hidden",
                transform: `translateX(${(shuffleTick % 2 === 0 ? 1 : -1) * (i - 2) * 7}px) rotate(${(shuffleTick % 2 === 0 ? 1 : -1) * (i - 2) * 2.5}deg)`,
                transition: "transform 0.3s ease",
                zIndex: i,
                boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/cards/back.jpg"
                alt="Tarot card back"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
        <span className="num-calc-loading">
          <span className="num-loading-dot" />
          <span className="num-loading-dot" />
          <span className="num-loading-dot" />
        </span>
      </div>
    );
  }

  // ── 提问 + 选牌数 ────────────────────────────────────
  return (
    <div className="num-input-card">
      {/* 星光装饰 */}
      <div className="num-input-stars">
        {["✦", "✧", "✦", "✧", "✦"].map((s, i) => (
          <span key={i} className="num-star" style={{ animationDelay: `${i * 0.4}s` }}>
            {s}
          </span>
        ))}
      </div>

      {/* 标题 */}
      <div className="num-input-header">
        <div className="num-input-icon">🎴</div>
        <h2 className="num-input-title">{t.inputTitle}</h2>
        <p className="num-input-subtitle">
          {t.inputSubtitle1}
          <br />
          {t.inputSubtitle2}
        </p>
      </div>

      {/* 问题输入（可选） */}
      <div style={{ marginTop: 4 }}>
        <label className="num-date-label" style={{ display: "block", textAlign: "center", marginBottom: 6 }}>
          {t.questionLabel}
        </label>
        <div className="num-select-wrapper">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t.questionPlaceholder}
            maxLength={120}
            className="num-select"
            style={{ width: "100%", textAlign: "center" }}
          />
        </div>
      </div>

      {/* 抽牌方式：1 张 / 3 张 */}
      <div style={{ marginTop: 18 }}>
        <label className="num-date-label" style={{ display: "block", textAlign: "center", marginBottom: 8 }}>
          {t.modeLabel}
        </label>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          {([
            { n: 1 as const, name: t.modeSingle, desc: t.modeSingleDesc },
            { n: 3 as const, name: t.modeThree, desc: t.modeThreeDesc },
          ]).map((m) => (
            <button
              key={m.n}
              type="button"
              onClick={() => setCount(m.n)}
              style={{
                flex: 1, maxWidth: 200, padding: "12px 10px", borderRadius: 14, cursor: "pointer",
                background: count === m.n ? "rgba(201,168,76,0.16)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${count === m.n ? "rgba(201,168,76,0.55)" : "rgba(201,168,76,0.18)"}`,
                color: count === m.n ? "#e8d5a3" : "rgba(200,175,140,0.65)",
                transition: "all 0.18s",
              }}
            >
              <div style={{ fontSize: "0.92rem", fontWeight: 700, letterSpacing: "0.04em" }}>
                {m.n === 1 ? "🂠" : "🂠🂠🂠"} {m.name}
              </div>
              <div style={{ fontSize: "0.7rem", marginTop: 4, opacity: 0.75 }}>{m.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 抽牌按钮 */}
      <button className="num-calc-btn" onClick={() => setShuffling(true)}>
        <span className="num-calc-btn-icon">🔮</span>
        <span>{t.drawBtn}</span>
      </button>

      {/* 说明文字 */}
      <p className="num-input-note">{t.inputNote}</p>
    </div>
  );
}
