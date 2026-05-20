"use client";

import React, { useState, useEffect } from "react";
import { NAMING_LOADING_TEXTS } from "../naming-data";

interface NamingLoadingProps {
  surname: string;
  gender: "male" | "female";
}

export default function NamingLoading({ surname, gender }: NamingLoadingProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTextIndex(p => (p + 1) % NAMING_LOADING_TEXTS.length), 900);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => p >= 88 ? p : p + Math.random() * 6 + 2);
    }, 500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="naming-loading-container">
      {/* 背景纹样 */}
      <div className="naming-loading-bg" aria-hidden="true">
        {["永", "和", "福", "寿", "德", "仁", "义", "礼"].map((ch, i) => (
          <span
            key={i}
            className="naming-bg-char"
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${15 + Math.floor(i / 4) * 50}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            {ch}
          </span>
        ))}
      </div>

      {/* 主体动画 */}
      <div className="naming-loading-center">
        {/* 毛笔/书法图标 */}
        <div className="naming-loading-seal">
          <div className="naming-seal-ring naming-seal-outer" />
          <div className="naming-seal-ring naming-seal-inner" />
          <div className="naming-seal-content">
            <span className="naming-seal-char">名</span>
          </div>
        </div>

        {/* 宝宝信息 */}
        <div className="naming-loading-info">
          <span className="naming-loading-surname">{surname}</span>
          <span className="naming-loading-gender-tag">
            {gender === "male" ? "男宝宝" : "女宝宝"}
          </span>
        </div>

        {/* 加载文案 */}
        <div className="naming-loading-text-area">
          <p className="naming-loading-text" key={textIndex}>
            {NAMING_LOADING_TEXTS[textIndex]}
          </p>
        </div>

        {/* 进度条 */}
        <div className="naming-progress-track">
          <div
            className="naming-progress-fill"
            style={{ width: `${Math.min(progress, 88)}%` }}
          />
        </div>

        <p className="naming-loading-hint">正在为{surname}家宝宝甄选吉名...</p>
      </div>
    </div>
  );
}
