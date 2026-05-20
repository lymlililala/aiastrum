"use client";

import React, { useState, useEffect } from "react";
import type { DrawnRune } from "../rune-engine";
import { getActiveReading, getElementColor } from "../rune-engine";

interface RuneStoneProps {
  stone: DrawnRune;
  index?: number;
  revealed?: boolean;          // 是否已翻开
  onReveal?: () => void;       // 点击翻开
  showDetail?: boolean;        // 是否显示详情区域
  compact?: boolean;           // 紧凑模式（三石阵）
}

export function RuneStone({
  stone,
  index = 0,
  revealed = false,
  onReveal,
  showDetail = false,
  compact = false,
}: RuneStoneProps) {
  const [flipped, setFlipped] = useState(revealed);
  const [glowing, setGlowing] = useState(false);

  useEffect(() => {
    if (revealed && !flipped) {
      // 延迟翻转，制造逐一揭晓的节奏感
      const timer = setTimeout(() => {
        setFlipped(true);
        setTimeout(() => setGlowing(true), 400);
        setTimeout(() => setGlowing(false), 1800);
      }, index * 350);
      return () => clearTimeout(timer);
    }
  }, [revealed, index, flipped]);

  const reading = getActiveReading(stone);
  const colors = getElementColor(stone.rune.element);
  const isReversed = stone.isReversed;

  const handleClick = () => {
    if (!flipped && onReveal) {
      onReveal();
    }
  };

  return (
    <div
      className={`rune-stone-wrapper ${compact ? "rune-stone-compact" : ""}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* 位置标签（三石阵专用） */}
      {stone.position && (
        <div className="rune-position-label">
          <span className="rune-position-icon">{stone.positionIcon}</span>
          <span>{stone.position}</span>
        </div>
      )}

      {/* 石头本体：3D 翻转卡片 */}
      <div
        className={`rune-stone-scene ${flipped ? "rune-stone-flipped" : ""}`}
        onClick={handleClick}
        style={{ cursor: flipped ? "default" : "pointer" }}
      >
        {/* 正面：符文图案 */}
        <div
          className={`rune-stone-face rune-stone-front ${glowing ? "rune-stone-glow" : ""} ${isReversed ? "rune-stone-reversed" : ""}`}
          style={{
            "--rune-color": colors.primary,
            "--rune-color2": colors.secondary,
          } as React.CSSProperties}
        >
          {/* 石头纹理背景 */}
          <div className="rune-stone-texture" />
          {/* 符文字符 */}
          <span
            className="rune-symbol"
            style={{
              transform: isReversed ? "rotate(180deg)" : "none",
              color: colors.secondary,
              textShadow: `0 0 16px ${colors.primary}`,
            }}
          >
            {stone.rune.symbol}
          </span>
          {/* 逆位标记 */}
          {isReversed && <span className="rune-reversed-badge">↓ 逆位</span>}
        </div>

        {/* 背面：未知状态 */}
        <div className="rune-stone-face rune-stone-back">
          <div className="rune-stone-texture" />
          <div className="rune-back-pattern">
            <span className="rune-back-symbol">ᚠ</span>
            <div className="rune-back-ripple" />
          </div>
          <p className="rune-back-hint">点击翻开</p>
        </div>
      </div>

      {/* 符文名称 */}
      {flipped && (
        <div
          className="rune-stone-name"
          style={{ color: colors.secondary }}
        >
          <span className="rune-name-cn">{stone.rune.chineseName}</span>
          <span className="rune-name-en">{stone.rune.name}</span>
          <span
            className="rune-orientation-badge"
            style={{
              background: isReversed ? "rgba(200,80,60,0.15)" : "rgba(80,200,120,0.15)",
              color: isReversed ? "#F87171" : "#6EE7B7",
              border: `1px solid ${isReversed ? "rgba(200,80,60,0.3)" : "rgba(80,200,120,0.3)"}`,
            }}
          >
            {reading.orientation}
          </span>
        </div>
      )}

      {/* 详情展开（单石模式） */}
      {flipped && showDetail && (
        <div
          className="rune-detail-card"
          style={{
            borderColor: `${colors.primary}40`,
            background: `rgba(${hexToRgb(colors.primary)}, 0.04)`,
          }}
        >
          {/* 关键词 */}
          <div className="rune-detail-keywords">
            {reading.keywords.map((kw) => (
              <span
                key={kw}
                className="rune-keyword"
                style={{
                  background: `rgba(${hexToRgb(colors.primary)}, 0.12)`,
                  color: colors.secondary,
                  borderColor: `${colors.primary}30`,
                }}
              >
                {kw}
              </span>
            ))}
          </div>

          {/* 元素与守护神 */}
          <div className="rune-detail-meta">
            <span>⚡ {stone.rune.element}之力</span>
            <span className="rune-meta-dot" />
            <span>🏛 {stone.rune.deity}</span>
          </div>

          {/* 解读 */}
          <div className="rune-detail-section">
            <h4 className="rune-detail-label">符文启示</h4>
            <p className="rune-detail-text">{reading.meaning}</p>
          </div>

          {/* 建议 */}
          <div className="rune-detail-advice">
            <span className="rune-advice-icon">⚔</span>
            <p className="rune-advice-text">{reading.advice}</p>
          </div>

          {/* 神话背景折叠 */}
          <details className="rune-mythology">
            <summary className="rune-mythology-summary">📜 神话背景</summary>
            <p className="rune-mythology-text">{stone.rune.mythology}</p>
          </details>
        </div>
      )}
    </div>
  );
}

// 辅助：hex 转 rgb 字符串
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "74, 158, 202";
  return `${parseInt(result[1]!, 16)}, ${parseInt(result[2]!, 16)}, ${parseInt(result[3]!, 16)}`;
}
