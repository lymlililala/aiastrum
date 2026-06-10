"use client";

import React, { useState } from "react";
import type { RuneReadingResult } from "../rune-engine";
import { getActiveReading, getElementColor, formatDrawTime, buildSynthesis } from "../rune-engine";
import { RuneStone } from "./RuneStone";

type Lang = "zh" | "en" | "tw";

// ── 三语文案（仅 UI chrome） ───────────────────────────
const RT = {
  zh: {
    badgeSingle: "☽ 奥丁之眼 · 单石占卜",
    badgeThree:  "✦ 诺伦三女神 · 三石占卜",
    revealSingle: "☽ 在心中默念你的问题，然后点击石头揭晓命运",
    revealThree:  "✦ 心存疑问，点击任意石头，三段命运将为你展开",
    synthesisTitle: "✦ 三石综合解读",
    sharePoster: "生成符文石卡片",
    again:       "再次占卜",
  },
  tw: {
    badgeSingle: "☽ 奧丁之眼 · 單石占卜",
    badgeThree:  "✦ 諾倫三女神 · 三石占卜",
    revealSingle: "☽ 在心中默念你的問題，然後點擊石頭揭曉命運",
    revealThree:  "✦ 心存疑問，點擊任意石頭，三段命運將為你展開",
    synthesisTitle: "✦ 三石綜合解讀",
    sharePoster: "生成符文石卡片",
    again:       "再次占卜",
  },
  en: {
    badgeSingle: "☽ Odin's Eye · Single Rune",
    badgeThree:  "✦ The Three Norns · Three Runes",
    revealSingle: "☽ Hold your question in mind, then tap the stone to reveal your fate",
    revealThree:  "✦ Hold your question close, tap any stone, and three fates will unfold",
    synthesisTitle: "✦ Three-Rune Synthesis",
    sharePoster: "Generate Rune Stone Card",
    again:       "Read Again",
  },
};
// ───────────────────────────────────────────────────────

interface RuneReadingProps {
  result: RuneReadingResult;
  lang: Lang;
  onShare: () => void;
  onAgain: () => void;
}

export function RuneReading({ result, lang, onShare, onAgain }: RuneReadingProps) {
  const t = RT[lang];
  const [allRevealed, setAllRevealed] = useState(false);

  const isSingle = result.spread === "single";
  const mainStone = result.stones[0]!;

  // 自动揭晓：点击任意一颗触发全部
  const handleReveal = () => {
    setAllRevealed(true);
  };

  return (
    <div className="rune-reading-container">
      {/* 顶部：占卜模式标题 */}
      <div className="rune-reading-header">
        <div className="rune-reading-mode-badge">
          {isSingle ? t.badgeSingle : t.badgeThree}
        </div>
        <p className="rune-reading-time">{formatDrawTime(result.drawTime, lang)}</p>
      </div>

      {/* ===== 单石占卜 ===== */}
      {isSingle && (
        <div className="rune-single-layout">
          <RuneStone
            stone={mainStone}
            index={0}
            revealed={allRevealed}
            onReveal={handleReveal}
            showDetail={allRevealed}
            lang={lang}
          />
          {!allRevealed && (
            <p className="rune-reveal-hint">
              {t.revealSingle}
            </p>
          )}
        </div>
      )}

      {/* ===== 三石占卜 ===== */}
      {!isSingle && (
        <div className="rune-three-layout">
          {/* 三颗石头横排 */}
          <div className="rune-three-stones">
            {result.stones.map((stone, i) => (
              <RuneStone
                key={stone.rune.id}
                stone={stone}
                index={i}
                revealed={allRevealed}
                onReveal={handleReveal}
                lang={lang}
                compact
              />
            ))}
          </div>

          {!allRevealed && (
            <p className="rune-reveal-hint">
              {t.revealThree}
            </p>
          )}

          {/* 三石详情区 */}
          {allRevealed && (
            <div className="rune-three-details">
              {result.stones.map((stone, i) => {
                const reading = getActiveReading(stone, lang);
                const colors = getElementColor(stone.rune.element);
                return (
                  <div
                    key={stone.rune.id}
                    className="rune-three-detail-card"
                    style={{
                      borderColor: `${colors.primary}35`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  >
                    {/* 位置标题 */}
                    <div className="rune-three-pos-header">
                      <span className="rune-three-pos-icon">{stone.positionIcon}</span>
                      <div>
                        <div className="rune-three-pos-label">{stone.position}</div>
                        <div className="rune-three-pos-desc">{stone.positionDescription}</div>
                      </div>
                    </div>

                    {/* 符文信息 */}
                    <div className="rune-three-rune-info">
                      <span
                        className="rune-three-symbol"
                        style={{
                          color: colors.secondary,
                          textShadow: `0 0 12px ${colors.primary}`,
                          transform: stone.isReversed ? "rotate(180deg)" : "none",
                          display: "inline-block",
                        }}
                      >
                        {stone.rune.symbol}
                      </span>
                      <div>
                        <div className="rune-three-rune-name">
                          {stone.rune.chineseName}
                          <span
                            className="rune-orientation-badge"
                            style={{
                              background: stone.isReversed ? "rgba(200,80,60,0.12)" : "rgba(80,200,120,0.12)",
                              color: stone.isReversed ? "#F87171" : "#6EE7B7",
                              border: `1px solid ${stone.isReversed ? "rgba(200,80,60,0.25)" : "rgba(80,200,120,0.25)"}`,
                              marginLeft: 8,
                            }}
                          >
                            {reading.orientation}
                          </span>
                        </div>
                        <div className="rune-three-rune-kws">
                          {reading.keywords.slice(0, 3).join(" · ")}
                        </div>
                      </div>
                    </div>

                    {/* 解读 */}
                    <p className="rune-three-meaning">{reading.meaning}</p>

                    {/* 建议 */}
                    <div className="rune-three-advice">
                      <span>⚔</span>
                      <span>{reading.advice}</span>
                    </div>
                  </div>
                );
              })}

              {/* 综合解读 */}
              <div className="rune-synthesis-card">
                <h3 className="rune-synthesis-title">{t.synthesisTitle}</h3>
                <p className="rune-synthesis-text">
                  {buildSynthesis(result, lang)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 底部操作区 */}
      {allRevealed && (
        <div className="rune-reading-actions">
          <button className="rune-share-btn" onClick={onShare}>
            <span>🪨</span>
            <span>{t.sharePoster}</span>
          </button>
          <button className="rune-again-btn" onClick={onAgain}>
            <span>↩</span>
            <span>{t.again}</span>
          </button>
        </div>
      )}
    </div>
  );
}
