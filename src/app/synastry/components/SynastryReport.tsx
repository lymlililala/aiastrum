"use client";

import { useState } from "react";
import type { SynastryResult, SynastryAspect } from "../synastry-engine";
import { getAspectInfo } from "../synastry-engine";
import { RELATION_TYPES } from "../synastry-data";
import { PLANET_MAP } from "../../astro/astro-data";

interface Props {
  result: SynastryResult;
  onShowPoster: () => void;
  onReset: () => void;
}

export default function SynastryReport({ result, onShowPoster, onReset }: Props) {
  const [expandedAspect, setExpandedAspect] = useState<number | null>(null);
  const [showAllAspects, setShowAllAspects] = useState(false);

  const rel = RELATION_TYPES[result.input.relationType];
  const tier = result.tier;
  const nameA = result.input.personA.name;
  const nameB = result.input.personB.name;

  const displayAspects = showAllAspects ? result.topAspects : result.topAspects.slice(0, 4);

  return (
    <div className="syn-report">
      {/* ===== 总评分头部 ===== */}
      <div className="syn-report-header" style={{ background: `linear-gradient(160deg, ${rel.gradientFrom}30, #0a0516)` }}>
        <div className="syn-score-ring-wrap">
          <ScoreRing
            score={result.totalScore}
            color={rel.color}
            gradientFrom={rel.gradientFrom}
            gradientTo={rel.gradientTo}
          />
        </div>

        <div className="syn-report-header-info">
          <div className="syn-tier-badge" style={{ background: `linear-gradient(135deg, ${rel.gradientFrom}, ${rel.gradientTo})` }}>
            {tier.emoji} {tier.label}
          </div>
          <h2 className="syn-report-names">
            {nameA} <span className="syn-report-x">{rel.icon}</span> {nameB}
          </h2>
          <p className="syn-tier-tagline">{tier.tagline}</p>
        </div>
      </div>

      {/* ===== 维度评分 ===== */}
      <div className="syn-dimensions">
        <h3 className="syn-section-title">契合度维度</h3>
        <div className="syn-dim-grid">
          {result.dimensions.map((dim, i) => (
            <div key={i} className="syn-dim-card">
              <div className="syn-dim-header">
                <span className="syn-dim-icon">{dim.icon}</span>
                <span className="syn-dim-label">{dim.label}</span>
                <span className="syn-dim-score" style={{ color: rel.color }}>{dim.score}</span>
              </div>
              <div className="syn-dim-bar-bg">
                <div
                  className="syn-dim-bar"
                  style={{
                    width: `${dim.score}%`,
                    background: `linear-gradient(90deg, ${rel.gradientFrom}, ${rel.gradientTo})`,
                  }}
                />
              </div>
              <p className="syn-dim-desc">{dim.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== 核心相位解读 ===== */}
      <div className="syn-aspects-section">
        <h3 className="syn-section-title">核心相位解析</h3>
        <p className="syn-section-sub">
          共发现 <strong>{result.aspects.length}</strong> 个跨盘相位，以下为最关键的相位解析
        </p>

        <div className="syn-aspect-list">
          {displayAspects.map((asp, i) => (
            <AspectCard
              key={i}
              aspect={asp}
              nameA={nameA}
              nameB={nameB}
              relColor={rel.color}
              expanded={expandedAspect === i}
              onToggle={() => setExpandedAspect(expandedAspect === i ? null : i)}
            />
          ))}
        </div>

        {result.topAspects.length > 4 && (
          <button
            className="syn-btn-more"
            onClick={() => setShowAllAspects((v) => !v)}
          >
            {showAllAspects ? "收起" : `查看更多相位（${result.topAspects.length - 4} 个）`}
          </button>
        )}
      </div>

      {/* ===== 行星位置对照 ===== */}
      <div className="syn-planets-compare">
        <h3 className="syn-section-title">双方行星位置</h3>
        <div className="syn-planets-table">
          <div className="syn-planets-header">
            <span className="syn-planet-col-name">行星</span>
            <span className="syn-planet-col-a">{nameA} 🌙</span>
            <span className="syn-planet-col-b">{nameB} ⭐</span>
          </div>
          {result.planetsA
            .filter((p) => ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"].includes(p.planet))
            .map((pA) => {
              const pB = result.planetsB.find((p) => p.planet === pA.planet);
              const pData = PLANET_MAP[pA.planet];
              return (
                <div key={pA.planet} className="syn-planets-row">
                  <span className="syn-planet-name" style={{ color: pData?.color }}>
                    {pData?.symbol} {pData?.name}
                  </span>
                  <span className="syn-planet-sign-a">{pA.sign} {pA.degree}°</span>
                  <span className="syn-planet-sign-b">{pB?.sign} {pB?.degree}°</span>
                </div>
              );
            })}
        </div>
      </div>

      {/* ===== 综合建议 ===== */}
      <div className="syn-summary">
        <h3 className="syn-section-title">综合解读</h3>
        <div className="syn-summary-card">
          <SummaryText result={result} />
        </div>
      </div>

      {/* ===== 操作按钮 ===== */}
      <div className="syn-report-actions">
        <button
          className="syn-btn-poster"
          onClick={onShowPoster}
          style={{ background: `linear-gradient(135deg, ${rel.gradientFrom}, ${rel.gradientTo})` }}
        >
          📤 生成分享海报
        </button>
        <button className="syn-btn-reset" onClick={onReset}>
          🔄 重新合盘
        </button>
      </div>
    </div>
  );
}

// ===== 评分圆环 =====
function ScoreRing({
  score, color, gradientFrom, gradientTo,
}: {
  score: number;
  color: string;
  gradientFrom: string;
  gradientTo: string;
}) {
  const R = 52;
  const circumference = 2 * Math.PI * R;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="syn-score-ring">
      <svg width="130" height="130" viewBox="0 0 130 130">
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientFrom} />
            <stop offset="100%" stopColor={gradientTo} />
          </linearGradient>
        </defs>
        {/* 背景圆 */}
        <circle cx="65" cy="65" r={R} fill="none" stroke="#ffffff10" strokeWidth="10" />
        {/* 进度弧 */}
        <circle
          cx="65" cy="65" r={R}
          fill="none"
          stroke="url(#scoreGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 65 65)"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        {/* 分数 */}
        <text x="65" y="60" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#fff">{score}</text>
        <text x="65" y="78" textAnchor="middle" fontSize="10" fill="#ffffff88">/ 100</text>
      </svg>
    </div>
  );
}

// ===== 相位卡片 =====
function AspectCard({
  aspect, nameA, nameB, relColor, expanded, onToggle,
}: {
  aspect: SynastryAspect;
  nameA: string;
  nameB: string;
  relColor: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  const pAData = PLANET_MAP[aspect.planetA];
  const pBData = PLANET_MAP[aspect.planetB];
  const aspInfo = getAspectInfo(aspect.type);
  const isPos = aspect.score >= 0;

  return (
    <div
      className={`syn-aspect-card ${aspect.isKeyPlanet ? "key" : ""} ${aspect.nature}`}
      style={{ borderColor: aspect.isKeyPlanet ? relColor + "60" : undefined }}
    >
      <div className="syn-aspect-card-header" onClick={onToggle}>
        <div className="syn-aspect-planets">
          <span className="syn-asp-planet" style={{ color: pAData?.color }}>
            {pAData?.symbol} {pAData?.name}
          </span>
          <span
            className="syn-asp-symbol"
            style={{ color: aspInfo?.color ?? "#888" }}
            title={aspInfo?.name}
          >
            {aspInfo?.symbol ?? "×"}
          </span>
          <span className="syn-asp-planet" style={{ color: pBData?.color }}>
            {pBData?.symbol} {pBData?.name}
          </span>
        </div>
        <div className="syn-aspect-meta">
          <span className="syn-asp-title">{aspect.shortTitle}</span>
          {aspect.isKeyPlanet && <span className="syn-asp-key-badge">核心</span>}
          <span className={`syn-asp-score ${isPos ? "pos" : "neg"}`}>
            {isPos ? "+" : ""}{aspect.score.toFixed(0)}
          </span>
        </div>
        <span className="syn-asp-toggle">{expanded ? "▲" : "▼"}</span>
      </div>

      {expanded && (
        <div className="syn-aspect-detail">
          <div className="syn-aspect-who">
            <span className="syn-asp-who-a">{nameA}的{pAData?.name}</span>
            <span className="syn-asp-orb">（容许度 {aspect.orb.toFixed(1)}°）</span>
          </div>
          <p className="syn-aspect-desc">{aspect.description}</p>
        </div>
      )}
    </div>
  );
}

// ===== 综合解读文本 =====
function SummaryText({ result }: { result: SynastryResult }) {
  const { totalScore, input, tier, dimensions } = result;
  const nameA = input.personA.name;
  const nameB = input.personB.name;
  const rel = RELATION_TYPES[input.relationType];
  const d = dimensions;

  // 找出最高分和最低分维度
  const sorted = [...d].sort((a, b) => b.score - a.score);
  const best = sorted[0]!;
  const worst = sorted[sorted.length - 1]!;

  const positiveAspects = result.topAspects.filter((a) => a.score > 0 && a.nature !== "challenging");
  const challengingAspects = result.topAspects.filter((a) => a.nature === "challenging");

  return (
    <div className="syn-summary-text">
      <p>
        {nameA}与{nameB}在{rel.label}关系中的星盘契合度为
        <strong className="syn-summary-score" style={{ color: tier.color }}>
          {" "}{totalScore} 分{" "}
        </strong>
        ——{tier.emoji} {tier.tagline}。
      </p>

      {best.score >= 60 && (
        <p>
          你们最突出的优势在于<strong>{best.icon} {best.label}</strong>（{best.score}分），
          {best.label === "情感共鸣" || best.label === "情感支持"
            ? "两人在情绪层面高度契合，相处时会感到被深度理解。"
            : best.label === "浪漫吸引" || best.label === "沟通默契" || best.label === "沟通效率"
            ? "你们天生的互动模式轻松愉快，不需要刻意经营。"
            : "两人的价值观和长期方向高度一致，是可以长久走下去的组合。"}
        </p>
      )}

      {positiveAspects.length > 0 && (
        <p>
          从相位来看，
          {positiveAspects.slice(0, 2).map((a) => {
            const pA = PLANET_MAP[a.planetA]?.name ?? a.planetA;
            const pB = PLANET_MAP[a.planetB]?.name ?? a.planetB;
            const aspInfo = getAspectInfo(a.type);
            return `${pA}-${pB} ${aspInfo?.name ?? ""}`;
          }).join("、")}
          等相位为你们带来了天然的和谐加持。
        </p>
      )}

      {challengingAspects.length > 0 && (
        <p>
          同时也存在一些需要留意的挑战相位（
          {challengingAspects.slice(0, 2).map((a) => {
            const pA = PLANET_MAP[a.planetA]?.name ?? a.planetA;
            const pB = PLANET_MAP[a.planetB]?.name ?? a.planetB;
            return `${pA}-${pB}`;
          }).join("、")}
          ），这些张力往往是推动双方成长的契机，值得用心去理解和转化。
        </p>
      )}

      {worst.score < 50 && (
        <p>
          {worst.icon} <strong>{worst.label}</strong>（{worst.score}分）是你们需要共同努力的方向，
          多一些耐心和沟通，会让这段关系更加稳固。
        </p>
      )}

      <p className="syn-summary-footer">
        ✨ 星盘解析仅作参考，真正的缘分由你们共同书写。
      </p>
    </div>
  );
}
