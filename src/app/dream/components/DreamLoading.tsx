"use client";

import React, { useState, useEffect } from "react";
import { getLoadingTexts, type Lang } from "../dream-data";
import type { DreamT } from "../dream-i18n";

interface DreamLoadingProps {
  t: DreamT;
  lang: Lang;
  query: string;
}

export default function DreamLoading({ t, lang, query }: DreamLoadingProps) {
  const loadingTexts = getLoadingTexts(lang);
  const [textIndex, setTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; delay: number; dur: number }>>([]);

  // 生成星星
  useEffect(() => {
    const generated = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      dur: Math.random() * 2 + 2,
    }));
    setStars(generated);
  }, []);

  // 滚动加载文案
  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 800);
    return () => clearInterval(timer);
  }, [loadingTexts.length]);

  // 进度条动画
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 8 + 2;
      });
    }, 400);
    return () => clearInterval(timer);
  }, []);

  const displayText = loadingTexts[textIndex] ?? loadingTexts[0]!;

  return (
    <div className="dream-loading-container">
      {/* 星空背景 */}
      <div className="dream-stars-bg" aria-hidden="true">
        {stars.map((star, i) => (
          <div
            key={i}
            className="dream-star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.dur}s`,
            }}
          />
        ))}
      </div>

      {/* 月亮主体 */}
      <div className="dream-loading-moon-wrap">
        {/* 外光环 */}
        <div className="dream-moon-ring dream-ring-outer" />
        <div className="dream-moon-ring dream-ring-mid" />
        {/* 月亮 */}
        <div className="dream-loading-moon">
          <span className="dream-loading-moon-text">🌕</span>
        </div>
        {/* 旋转符文 */}
        <div className="dream-rune-orbit">
          {["☽", "✦", "◆", "☾", "✧", "◇"].map((rune, i) => (
            <span
              key={i}
              className="dream-rune"
              style={{
                transform: `rotate(${i * 60}deg) translateX(72px) rotate(-${i * 60}deg)`,
                animationDelay: `${i * 0.15}s`,
              }}
            >
              {rune}
            </span>
          ))}
        </div>
      </div>

      {/* 梦境关键词展示 */}
      <div className="dream-loading-keyword">
        <span className="dream-loading-quote">「{query.slice(0, 20)}{query.length > 20 ? "..." : ""}」</span>
      </div>

      {/* 加载文案 */}
      <div className="dream-loading-text-wrap">
        <p className="dream-loading-text" key={textIndex}>
          {displayText}
        </p>
      </div>

      {/* 进度条 */}
      <div className="dream-progress-bar">
        <div
          className="dream-progress-fill"
          style={{ width: `${Math.min(progress, 90)}%` }}
        />
      </div>

      {/* 底部提示 */}
      <p className="dream-loading-hint">
        {t.loadingHint}
      </p>
    </div>
  );
}
