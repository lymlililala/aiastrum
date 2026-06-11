"use client";

import { useState, useEffect } from "react";
import { ZIWEI_LOADING_TEXTS } from "../ziwei-data";
import type { ZiweiT, Lang } from "../ziwei-i18n";

interface ZiweiLoadingProps {
  t: ZiweiT;
  lang: Lang;
}

export default function ZiweiLoading({ t: _t, lang }: ZiweiLoadingProps) {
  const loadingTexts = ZIWEI_LOADING_TEXTS[lang];
  const [textIdx, setTextIdx]   = useState(0);
  const [progress, setProgress] = useState(0);
  const [angle, setAngle]       = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTextIdx(p => (p + 1) % loadingTexts.length), 700);
    return () => clearInterval(t);
  }, [loadingTexts.length]);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => p >= 95 ? p : p + Math.random() * 6);
    }, 220);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setAngle(p => (p + 1) % 360), 16);
    return () => clearInterval(t);
  }, []);

  // 14颗主星分布在圆形轨道上
  const STAR_NAMES = ["紫", "机", "阳", "武", "同", "廉", "府", "阴", "狼", "门", "相", "梁", "杀", "军"];
  const COLORS = ["#C77DFF","#48CAE4","#FFB703","#E9C46A","#90E0EF","#E76F51","#74C69D","#B8D8F8","#FF99C8","#9E9E9E","#81B29A","#F4A261","#E63946","#457B9D"];

  return (
    <div className="zw-loading">
      {/* 星盘旋转动画 */}
      <div className="zw-loading-chart">
        {/* 外层星轨 */}
        <div className="zw-orbit-ring zw-orbit-outer" />
        <div className="zw-orbit-ring zw-orbit-mid" />
        <div className="zw-orbit-ring zw-orbit-inner" />

        {/* 十四主星绕轨 */}
        {STAR_NAMES.map((star, i) => {
          const a = (angle + i * (360 / STAR_NAMES.length)) * (Math.PI / 180);
          const r = 85;
          const x = 50 + r * Math.cos(a);
          const y = 50 + r * Math.sin(a);
          return (
            <div
              key={star}
              className="zw-orbit-star-dot"
              style={{
                left: `${x}%`, top: `${y}%`,
                background: COLORS[i],
                boxShadow: `0 0 8px ${COLORS[i]}`,
              } as React.CSSProperties}
            >
              {star}
            </div>
          );
        })}

        {/* 四化中心标志 */}
        <div className="zw-loading-center">
          <div className="zw-loading-ziwei">紫微</div>
          <div className="zw-loading-si">
            {["禄", "权", "科", "忌"].map((s, i) => (
              <span key={s} className="zw-sihua-dot" style={{
                color: ["#FFD700","#FF6B35","#4FC3F7","#EF5350"][i],
                animationDelay: `${i * 0.25}s`,
              } as React.CSSProperties}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 加载文案 */}
      <div className="zw-loading-text-wrap">
        <p className="zw-loading-text">{loadingTexts[textIdx]}</p>
      </div>

      {/* 进度条 */}
      <div className="zw-loading-progress-wrap">
        <div className="zw-loading-progress-bar" style={{ width: `${Math.min(progress, 95)}%` }} />
      </div>
      <p className="zw-loading-progress-num">{Math.min(Math.floor(progress), 95)}%</p>
    </div>
  );
}
