"use client";

import { useState, useEffect } from "react";
import { LOVE_LOADING_TEXTS } from "../love-data";

export default function LoveLoading() {
  const [textIdx, setTextIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const textTimer = setInterval(() => {
      setTextIdx(prev => (prev + 1) % LOVE_LOADING_TEXTS.length);
    }, 600);
    return () => clearInterval(textTimer);
  }, []);

  useEffect(() => {
    const progTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 8;
      });
    }, 200);
    return () => clearInterval(progTimer);
  }, []);

  return (
    <div className="love-loading">
      {/* 星轨动画 */}
      <div className="love-loading-orbit-wrap">
        {/* 外层星轨 */}
        <div className="love-orbit love-orbit-outer">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="love-orbit-star"
              style={{ "--i": i } as React.CSSProperties}
            />
          ))}
        </div>
        {/* 中层星轨 */}
        <div className="love-orbit love-orbit-mid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="love-orbit-star love-orbit-star-mid"
              style={{ "--i": i } as React.CSSProperties}
            />
          ))}
        </div>
        {/* 内核 */}
        <div className="love-loading-core">
          <div className="love-loading-symbol">✦</div>
        </div>
      </div>

      {/* 加载文案 */}
      <div className="love-loading-text-wrap">
        <p className="love-loading-text">{LOVE_LOADING_TEXTS[textIdx]}</p>
      </div>

      {/* 进度条 */}
      <div className="love-loading-progress-wrap">
        <div
          className="love-loading-progress-bar"
          style={{ width: `${Math.min(progress, 95)}%` }}
        />
      </div>
      <p className="love-loading-progress-label">{Math.min(Math.floor(progress), 95)}%</p>

      {/* 流动的星点 */}
      <div className="love-loading-stars">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="love-loading-particle"
            style={{
              left: `${(i * 19 + 5) % 100}%`,
              animationDelay: `${(i * 0.4) % 4}s`,
              animationDuration: `${2 + (i % 3)}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
