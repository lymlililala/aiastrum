"use client";

import { useEffect, useState } from "react";
import type { RelationType } from "../synastry-data";
import { RELATION_TYPES } from "../synastry-data";

interface Props {
  personAName: string;
  personBName: string;
  relationType: RelationType;
}

const LOADING_STEPS = [
  { icon: "🌌", text: "正在读取星图..." },
  { icon: "🪐", text: "计算行星轨迹..." },
  { icon: "✨", text: "分析跨盘相位..." },
  { icon: "💫", text: "测量灵魂频率..." },
  { icon: "🔮", text: "生成专属解析..." },
];

export default function SynastryLoading({ personAName, personBName, relationType }: Props) {
  const [phase, setPhase] = useState(0);
  const [dots, setDots] = useState(1);
  const rel = RELATION_TYPES[relationType];

  useEffect(() => {
    const phaseTimer = setInterval(() => {
      setPhase((p) => (p < LOADING_STEPS.length - 1 ? p + 1 : p));
    }, 800);
    const dotTimer = setInterval(() => {
      setDots((d) => (d % 3) + 1);
    }, 400);
    return () => {
      clearInterval(phaseTimer);
      clearInterval(dotTimer);
    };
  }, []);

  const step = LOADING_STEPS[phase]!;

  return (
    <div className="syn-loading">
      {/* 星空背景粒子 */}
      <div className="syn-stars-bg">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="syn-star-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
            }}
          />
        ))}
      </div>

      {/* 双星盘动画 */}
      <div className="syn-loading-orbs">
        <div
          className="syn-orb syn-orb-a"
          style={{ background: `radial-gradient(circle, ${rel.gradientFrom}, transparent)` }}
        >
          <span className="syn-orb-name">{personAName || "你"}</span>
        </div>
        <div className="syn-orb-connector">
          <div className="syn-orb-beam" />
          <span className="syn-orb-icon">{rel.icon}</span>
        </div>
        <div
          className="syn-orb syn-orb-b"
          style={{ background: `radial-gradient(circle, ${rel.gradientTo}, transparent)` }}
        >
          <span className="syn-orb-name">{personBName || "TA"}</span>
        </div>
      </div>

      {/* 当前步骤 */}
      <div className="syn-loading-status">
        <div className="syn-loading-icon">{step.icon}</div>
        <div className="syn-loading-text">
          {step.text}
          <span className="syn-dots">{".".repeat(dots)}</span>
        </div>
      </div>

      {/* 进度条 */}
      <div className="syn-loading-progress">
        <div
          className="syn-loading-bar"
          style={{
            width: `${((phase + 1) / LOADING_STEPS.length) * 100}%`,
            background: `linear-gradient(90deg, ${rel.gradientFrom}, ${rel.gradientTo})`,
          }}
        />
      </div>

      <p className="syn-loading-sub">
        正在为 <strong>{personAName}</strong> × <strong>{personBName}</strong> 构建专属星盘…
      </p>
    </div>
  );
}
