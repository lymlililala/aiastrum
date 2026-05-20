"use client";

import React, { useState } from "react";
import type { RuneReadingResult } from "../rune-engine";
import { getActiveReading, getElementColor, formatDrawTime } from "../rune-engine";
import { RuneStone } from "./RuneStone";

interface RuneReadingProps {
  result: RuneReadingResult;
  onShare: () => void;
  onAgain: () => void;
}

export function RuneReading({ result, onShare, onAgain }: RuneReadingProps) {
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
          {isSingle ? "☽ 奥丁之眼 · 单石占卜" : "✦ 诺伦三女神 · 三石占卜"}
        </div>
        <p className="rune-reading-time">{formatDrawTime(result.drawTime)}</p>
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
          />
          {!allRevealed && (
            <p className="rune-reveal-hint">
              ☽ 在心中默念你的问题，然后点击石头揭晓命运
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
                compact
              />
            ))}
          </div>

          {!allRevealed && (
            <p className="rune-reveal-hint">
              ✦ 心存疑问，点击任意石头，三段命运将为你展开
            </p>
          )}

          {/* 三石详情区 */}
          {allRevealed && (
            <div className="rune-three-details">
              {result.stones.map((stone, i) => {
                const reading = getActiveReading(stone);
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
                <h3 className="rune-synthesis-title">✦ 三石综合解读</h3>
                <p className="rune-synthesis-text">
                  {buildSynthesis(result)}
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
            <span>生成符文石卡片</span>
          </button>
          <button className="rune-again-btn" onClick={onAgain}>
            <span>↩</span>
            <span>再次占卜</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ===== 三石综合解读生成 =====
function buildSynthesis(result: RuneReadingResult): string {
  const [past, present, future] = result.stones;
  if (!past || !present || !future) return "";

  const pastR = getActiveReading(past);
  const presentR = getActiveReading(present);
  const futureR = getActiveReading(future);

  return `【${past.rune.chineseName}】在过去的位置揭示了「${pastR.keywords[0]}」的根源，`
    + `与当前【${present.rune.chineseName}】所呈现的「${presentR.keywords[0]}」状态相呼应。`
    + `若顺应此能量流动，未来【${future.rune.chineseName}】将带来「${futureR.keywords[0]}」的趋势。`
    + `三石提示你：${futureR.advice}`;
}
