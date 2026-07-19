"use client";

import React, { useState } from "react";
import type { SpreadType } from "~/app/rune/rune-engine";
import type { RuneT } from "../rune-reading-i18n";

interface RuneCastInputProps {
  t: RuneT;
  onCast: (spread: SpreadType) => void;
  isLoading?: boolean;
}

export function RuneCastInput({ t, onCast, isLoading = false }: RuneCastInputProps) {
  const [spread, setSpread] = useState<SpreadType>("single");
  const [animateBtn, setAnimateBtn] = useState(false);

  const handleSubmit = () => {
    setAnimateBtn(true);
    setTimeout(() => setAnimateBtn(false), 600);
    onCast(spread);
  };

  const modes: Array<{ key: SpreadType; icon: string; name: string; subtitle: string; tags: string[]; desc: string }> = [
    { key: "single", icon: "☽", name: t.singleName, subtitle: t.singleSubtitle, tags: t.singleTags, desc: t.singleDesc },
    { key: "three", icon: "✦", name: t.threeName, subtitle: t.threeSubtitle, tags: t.threeTags, desc: t.threeDesc },
  ];

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
        <div className="num-input-icon">ᚠ</div>
        <h2 className="num-input-title">{t.modeLabel}</h2>
        <p className="num-input-subtitle">{t.focusHint}</p>
      </div>

      {/* 牌阵选择 */}
      <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
        {modes.map((m) => {
          const active = spread === m.key;
          return (
            <button
              type="button"
              key={m.key}
              onClick={() => setSpread(m.key)}
              style={{
                flex: 1, padding: "14px 12px", borderRadius: 14, cursor: "pointer",
                background: active ? "rgba(201,168,76,0.10)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${active ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.15)"}`,
                color: "#e8d5a3", transition: "all 0.18s", textAlign: "center",
              }}
            >
              <div style={{ fontSize: "1.4rem", lineHeight: 1 }}>{m.icon}</div>
              <div style={{ fontSize: "0.86rem", fontWeight: 700, marginTop: 8 }}>{m.name}</div>
              <div style={{ fontSize: "0.68rem", color: "rgba(201,168,76,0.6)", letterSpacing: "0.08em", marginTop: 3 }}>
                {m.subtitle}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center", marginTop: 8 }}>
                {m.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "0.62rem", padding: "2px 8px", borderRadius: 10,
                      background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)",
                      color: "rgba(220,205,175,0.7)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div style={{ fontSize: "0.7rem", color: "rgba(200,175,140,0.55)", lineHeight: 1.6, marginTop: 8 }}>
                {m.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* 施法按钮 */}
      <button
        className={`num-calc-btn ${animateBtn ? "num-calc-btn-active" : ""}`}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="num-calc-loading">
            <span className="num-loading-dot" />
            <span className="num-loading-dot" />
            <span className="num-loading-dot" />
          </span>
        ) : (
          <>
            <span className="num-calc-btn-icon">ᚱ</span>
            <span>{t.castBtn}</span>
          </>
        )}
      </button>

      {/* 说明文字 */}
      <p className="num-input-note">{t.inputNote}</p>
    </div>
  );
}
