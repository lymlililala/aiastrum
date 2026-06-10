"use client";

import { useState, useEffect } from "react";
import type { WugeT } from "../wuge-i18n";

interface WugeLoadingProps {
  t: WugeT;
  name: string;
}

export default function WugeLoading({ t, name }: WugeLoadingProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [dots, setDots] = useState("");
  const [progress, setProgress] = useState(0);
  const [visibleChars, setVisibleChars] = useState<string[]>([]);

  const chars = Array.from(name);
  const loadingTexts = t.loadingTexts;

  // 循环显示加载文案
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((i) => (i + 1) % loadingTexts.length);
    }, 800);
    return () => clearInterval(interval);
  }, [loadingTexts.length]);

  // 省略号动画
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "。"));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // 进度条
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 8 + 2, 92));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // 逐字显示姓名字符
  useEffect(() => {
    chars.forEach((char, i) => {
      setTimeout(() => {
        setVisibleChars((prev) => [...prev, char]);
      }, i * 300 + 200);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 天干地支用于动画背景
  const heavenlyStems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  const earthlyBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  const allChars = [...heavenlyStems, ...earthlyBranches];

  return (
    <div className="wuge-loading-container">
      {/* 浮动天干地支背景 */}
      <div className="wuge-float-chars" aria-hidden="true">
        {allChars.map((c, i) => (
          <span
            key={i}
            className="wuge-float-char"
            style={{
              left: `${(i * 4.5) % 95}%`,
              top: `${(i * 7 + 10) % 85}%`,
              animationDelay: `${i * 0.18}s`,
              animationDuration: `${3 + (i % 4)}s`,
              fontSize: `${14 + (i % 3) * 4}px`,
              opacity: 0.12 + (i % 5) * 0.04,
            }}
          >
            {c}
          </span>
        ))}
      </div>

      {/* 中央内容 */}
      <div className="wuge-loading-center">
        {/* 八卦罗盘动画 */}
        <div className="wuge-compass-wrapper">
          <div className="wuge-compass-outer">
            <div className="wuge-compass-inner">
              <div className="wuge-compass-core">
                <span className="wuge-compass-yin-yang">☯</span>
              </div>
            </div>
            {/* 八卦方位 */}
            {["☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷"].map((t, i) => (
              <span
                key={i}
                className="wuge-compass-trigram"
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-56px) rotate(-${i * 45}deg)`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* 姓名笔画展示 */}
        <div className="wuge-name-reveal">
          <div className="wuge-name-chars-row">
            {chars.map((char, i) => (
              <div
                key={i}
                className={`wuge-name-char-card ${visibleChars.includes(char) ? "wuge-char-visible" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span className="wuge-char-glyph">{char}</span>
                <span className="wuge-char-label">{t.charLabelPre}{t.charOrdinals[i] ?? i + 1}{t.charLabelPost}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 加载文案 */}
        <div className="wuge-loading-text-area">
          <p className="wuge-loading-text">
            {loadingTexts[textIndex] ?? loadingTexts[0]}{dots}
          </p>
        </div>

        {/* 进度条 */}
        <div className="wuge-progress-bar-wrap">
          <div className="wuge-progress-bar-bg">
            <div
              className="wuge-progress-bar-fill"
              style={{ width: `${progress}%`, transition: "width 0.6s ease" }}
            />
          </div>
          <span className="wuge-progress-text">{Math.round(progress)}%</span>
        </div>

        {/* 底部步骤提示 */}
        <div className="wuge-loading-steps">
          {t.loadSteps.map((step, i) => (
            <div
              key={i}
              className={`wuge-loading-step ${progress > (i + 1) * 22 ? "wuge-step-done" : progress > i * 22 ? "wuge-step-active" : ""}`}
            >
              <span className="wuge-step-icon">{progress > (i + 1) * 22 ? "✓" : ["◐", "◑", "◒", "◓"][i]}</span>
              <span className="wuge-step-label">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
