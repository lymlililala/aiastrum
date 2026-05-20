"use client";

import { useState, useEffect } from "react";
import { MEIHUA_LOADING_TEXTS } from "../meihua-data";

export default function MeihuaLoading() {
  const [textIdx, setTextIdx] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    // 滚动提示文字
    const textTimer = setInterval(() => {
      setTextIdx(prev => (prev + 1) % MEIHUA_LOADING_TEXTS.length);
    }, 800);

    // 省略号动画
    const dotsTimer = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + "·");
    }, 400);

    return () => {
      clearInterval(textTimer);
      clearInterval(dotsTimer);
    };
  }, []);

  return (
    <div className="meihua-loading-container">
      {/* 水墨渲染效果 */}
      <div className="meihua-ink-bg" />

      {/* 梅花绽放动画 */}
      <div className="meihua-plum-bloom">
        <div className="meihua-plum-center">✿</div>
        <div className="meihua-plum-petals">
          {[0, 72, 144, 216, 288].map((deg) => (
            <div
              key={deg}
              className="meihua-petal"
              style={{ "--petal-deg": `${deg}deg` } as React.CSSProperties}
            >
              ✿
            </div>
          ))}
        </div>
      </div>

      {/* 太极旋转 */}
      <div className="meihua-taiji-loading">☯</div>

      {/* 八卦符号轮播 */}
      <div className="meihua-bagua-ring">
        {["☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷"].map((sym, i) => (
          <span
            key={sym}
            className="meihua-ring-sym"
            style={{ "--ring-idx": i } as React.CSSProperties}
          >
            {sym}
          </span>
        ))}
      </div>

      {/* 文字区 */}
      <div className="meihua-loading-text-block">
        <p className="meihua-loading-title">卦象推演中</p>
        <p className="meihua-loading-desc">
          {MEIHUA_LOADING_TEXTS[textIdx]}{dots}
        </p>
        <div className="meihua-loading-steps">
          {MEIHUA_LOADING_TEXTS.map((t, i) => (
            <div
              key={i}
              className={`meihua-step-dot ${i <= textIdx ? "meihua-step-done" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* 底部诗句 */}
      <p className="meihua-loading-quote">
        "一花一世界，一叶一菩提，一卦一天机"
      </p>
    </div>
  );
}
