"use client";

import { useEffect, useState } from "react";
import type { RelationType } from "../synastry-data";
import { RELATION_TYPES } from "../synastry-data";
import type { SynT } from "../synastry-i18n";

interface Props {
  personAName: string;
  personBName: string;
  relationType: RelationType;
  t: SynT;
}

const LOADING_ICONS = ["🌌", "🪐", "✨", "💫", "🔮"];

export default function SynastryLoading({ personAName, personBName, relationType, t }: Props) {
  const [phase, setPhase] = useState(0);
  const [dots, setDots] = useState(1);
  const rel = RELATION_TYPES[relationType];

  const loadingSteps = [
    { icon: LOADING_ICONS[0], text: t.loadStep0 },
    { icon: LOADING_ICONS[1], text: t.loadStep1 },
    { icon: LOADING_ICONS[2], text: t.loadStep2 },
    { icon: LOADING_ICONS[3], text: t.loadStep3 },
    { icon: LOADING_ICONS[4], text: t.loadStep4 },
  ];

  useEffect(() => {
    const phaseTimer = setInterval(() => {
      setPhase((p) => (p < loadingSteps.length - 1 ? p + 1 : p));
    }, 800);
    const dotTimer = setInterval(() => {
      setDots((d) => (d % 3) + 1);
    }, 400);
    return () => {
      clearInterval(phaseTimer);
      clearInterval(dotTimer);
    };
  }, [loadingSteps.length]);

  const step = loadingSteps[phase]!;

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
          <span className="syn-orb-name">{personAName || t.loadYou}</span>
        </div>
        <div className="syn-orb-connector">
          <div className="syn-orb-beam" />
          <span className="syn-orb-icon">{rel.icon}</span>
        </div>
        <div
          className="syn-orb syn-orb-b"
          style={{ background: `radial-gradient(circle, ${rel.gradientTo}, transparent)` }}
        >
          <span className="syn-orb-name">{personBName || t.loadTa}</span>
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
            width: `${((phase + 1) / loadingSteps.length) * 100}%`,
            background: `linear-gradient(90deg, ${rel.gradientFrom}, ${rel.gradientTo})`,
          }}
        />
      </div>

      <p className="syn-loading-sub">
        {t.loadSubPre} <strong>{personAName}</strong> × <strong>{personBName}</strong> {t.loadSubPost}
      </p>
    </div>
  );
}
