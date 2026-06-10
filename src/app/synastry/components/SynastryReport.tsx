"use client";

import { useState } from "react";
import type { SynastryResult, SynastryAspect } from "../synastry-engine";
import { getAspectInfo } from "../synastry-engine";
import { getRelationType } from "../synastry-data";
import { PLANET_MAP } from "../../astro/astro-data";
import { getPlanetName, getAspectName } from "../../astro/astro-content-i18n";
import type { SynT, SynLang } from "../synastry-i18n";

interface Props {
  result: SynastryResult;
  onShowPoster: () => void;
  onReset: () => void;
  t: SynT;
  lang: SynLang;
}

export default function SynastryReport({ result, onShowPoster, onReset, t, lang }: Props) {
  const [expandedAspect, setExpandedAspect] = useState<number | null>(null);
  const [showAllAspects, setShowAllAspects] = useState(false);

  const rel = getRelationType(result.input.relationType, lang);
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
        <h3 className="syn-section-title">{t.dimensionsTitle}</h3>
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
        <h3 className="syn-section-title">{t.aspectsTitle}</h3>
        <p className="syn-section-sub">
          {t.aspectsSubPre} <strong>{result.aspects.length}</strong> {t.aspectsSubPost}
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
              t={t}
              lang={lang}
            />
          ))}
        </div>

        {result.topAspects.length > 4 && (
          <button
            className="syn-btn-more"
            onClick={() => setShowAllAspects((v) => !v)}
          >
            {showAllAspects ? t.collapse : `${t.moreAspectsPre}${result.topAspects.length - 4}${t.moreAspectsPost}`}
          </button>
        )}
      </div>

      {/* ===== 行星位置对照 ===== */}
      <div className="syn-planets-compare">
        <h3 className="syn-section-title">{t.planetsTitle}</h3>
        <div className="syn-planets-table">
          <div className="syn-planets-header">
            <span className="syn-planet-col-name">{t.planetColName}</span>
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
                    {pData?.symbol} {getPlanetName(pA.planet, lang)}
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
        <h3 className="syn-section-title">{t.summaryTitle}</h3>
        <div className="syn-summary-card">
          <SummaryText result={result} lang={lang} />
        </div>
      </div>

      {/* ===== 操作按钮 ===== */}
      <div className="syn-report-actions">
        <button
          className="syn-btn-poster"
          onClick={onShowPoster}
          style={{ background: `linear-gradient(135deg, ${rel.gradientFrom}, ${rel.gradientTo})` }}
        >
          {t.btnPoster}
        </button>
        <button className="syn-btn-reset" onClick={onReset}>
          {t.btnReset}
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
  aspect, nameA, nameB, relColor, expanded, onToggle, t, lang,
}: {
  aspect: SynastryAspect;
  nameA: string;
  nameB: string;
  relColor: string;
  expanded: boolean;
  onToggle: () => void;
  t: SynT;
  lang: SynLang;
}) {
  const pAData = PLANET_MAP[aspect.planetA];
  const pBData = PLANET_MAP[aspect.planetB];
  const aspInfo = getAspectInfo(aspect.type);
  const pAName = getPlanetName(aspect.planetA, lang);
  const pBName = getPlanetName(aspect.planetB, lang);
  const aspName = getAspectName(aspect.type, lang);
  const isPos = aspect.score >= 0;

  return (
    <div
      className={`syn-aspect-card ${aspect.isKeyPlanet ? "key" : ""} ${aspect.nature}`}
      style={{ borderColor: aspect.isKeyPlanet ? relColor + "60" : undefined }}
    >
      <div className="syn-aspect-card-header" onClick={onToggle}>
        <div className="syn-aspect-planets">
          <span className="syn-asp-planet" style={{ color: pAData?.color }}>
            {pAData?.symbol} {pAName}
          </span>
          <span
            className="syn-asp-symbol"
            style={{ color: aspInfo?.color ?? "#888" }}
            title={aspName}
          >
            {aspInfo?.symbol ?? "×"}
          </span>
          <span className="syn-asp-planet" style={{ color: pBData?.color }}>
            {pBData?.symbol} {pBName}
          </span>
        </div>
        <div className="syn-aspect-meta">
          <span className="syn-asp-title">{aspect.shortTitle}</span>
          {aspect.isKeyPlanet && <span className="syn-asp-key-badge">{t.aspKeyBadge}</span>}
          <span className={`syn-asp-score ${isPos ? "pos" : "neg"}`}>
            {isPos ? "+" : ""}{aspect.score.toFixed(0)}
          </span>
        </div>
        <span className="syn-asp-toggle">{expanded ? "▲" : "▼"}</span>
      </div>

      {expanded && (
        <div className="syn-aspect-detail">
          <div className="syn-aspect-who">
            <span className="syn-asp-who-a">{nameA}{t.whoSuffix}{pAName}</span>
            <span className="syn-asp-orb">{t.orbPre}{aspect.orb.toFixed(1)}{t.orbPost}</span>
          </div>
          <p className="syn-aspect-desc">{aspect.description}</p>
        </div>
      )}
    </div>
  );
}

// ===== 综合解读文本 =====

type BestCategory = "emotional" | "natural" | "values";

// 将 (关系类型, 维度key) 映射到“最佳维度”文案类别（语言无关）。
// 保持与原中文逻辑一致：
//  情感共鸣(love.d1)/情感支持(friendship.d2) → emotional
//  浪漫吸引(love.d2)/沟通默契(friendship.d1)/沟通效率(work.d1) → natural
//  其余（灵魂契合/共同成长/目标一致/执行默契）→ values
function bestCategory(relationType: string, key: "d1" | "d2" | "d3"): BestCategory {
  if (relationType === "love") {
    if (key === "d1") return "emotional";
    if (key === "d2") return "natural";
    return "values";
  }
  if (relationType === "friendship") {
    if (key === "d2") return "emotional";
    if (key === "d1") return "natural";
    return "values";
  }
  // work
  if (key === "d1") return "natural";
  return "values"; // d2(执行默契) / d3(目标一致)
}

const SUMMARY_T = {
  zh: {
    intro: (nameA: string, nameB: string, relLabel: string) =>
      `${nameA}与${nameB}在${relLabel}关系中的星盘契合度为`,
    scoreUnit: " 分 ",
    dash: "——",
    period: "。",
    bestPre: () => `你们最突出的优势在于`,
    bestLabel: (icon: string, label: string) => `${icon} ${label}`,
    bestScoreParen: (score: number) => `（${score}分），`,
    bestMsg: {
      emotional: "两人在情绪层面高度契合，相处时会感到被深度理解。",
      natural: "你们天生的互动模式轻松愉快，不需要刻意经营。",
      values: "两人的价值观和长期方向高度一致，是可以长久走下去的组合。",
    },
    posPre: "从相位来看，",
    posJoin: "、",
    posPost: "等相位为你们带来了天然的和谐加持。",
    chalPre: "同时也存在一些需要留意的挑战相位（",
    chalJoin: "、",
    chalPost: "），这些张力往往是推动双方成长的契机，值得用心去理解和转化。",
    worst: (score: number) =>
      `（${score}分）是你们需要共同努力的方向，多一些耐心和沟通，会让这段关系更加稳固。`,
    footer: "✨ 星盘解析仅作参考，真正的缘分由你们共同书写。",
  },
  tw: {
    intro: (nameA: string, nameB: string, relLabel: string) =>
      `${nameA}與${nameB}在${relLabel}關係中的星盤契合度為`,
    scoreUnit: " 分 ",
    dash: "——",
    period: "。",
    bestPre: () => `你們最突出的優勢在於`,
    bestLabel: (icon: string, label: string) => `${icon} ${label}`,
    bestScoreParen: (score: number) => `（${score}分），`,
    bestMsg: {
      emotional: "兩人在情緒層面高度契合，相處時會感到被深度理解。",
      natural: "你們天生的互動模式輕鬆愉快，不需要刻意經營。",
      values: "兩人的價值觀和長期方向高度一致，是可以長久走下去的組合。",
    },
    posPre: "從相位來看，",
    posJoin: "、",
    posPost: "等相位為你們帶來了天然的和諧加持。",
    chalPre: "同時也存在一些需要留意的挑戰相位（",
    chalJoin: "、",
    chalPost: "），這些張力往往是推動雙方成長的契機，值得用心去理解和轉化。",
    worst: (score: number) =>
      `（${score}分）是你們需要共同努力的方向，多一些耐心和溝通，會讓這段關係更加穩固。`,
    footer: "✨ 星盤解析僅作參考，真正的緣分由你們共同書寫。",
  },
  en: {
    intro: (nameA: string, nameB: string, relLabel: string) =>
      `In a ${relLabel.toLowerCase()} relationship, the chart compatibility between ${nameA} and ${nameB} is`,
    scoreUnit: " pts ",
    dash: " — ",
    period: ".",
    bestPre: () => `Your standout strength is `,
    bestLabel: (icon: string, label: string) => `${icon} ${label}`,
    bestScoreParen: (score: number) => ` (${score} pts), `,
    bestMsg: {
      emotional: "you're highly attuned on an emotional level, and feel deeply understood when together.",
      natural: "your natural way of interacting is easy and joyful, requiring no forced effort.",
      values: "your values and long-term directions are highly aligned — a pairing that can go the distance.",
    },
    posPre: "In terms of aspects, ",
    posJoin: ", ",
    posPost: " bring you a natural boost of harmony.",
    chalPre: "There are also some challenging aspects to watch (",
    chalJoin: ", ",
    chalPost: "). Such tension is often the catalyst that drives mutual growth — well worth understanding and transforming.",
    worst: (score: number) =>
      ` (${score} pts) is the area you'll need to work on together; a little more patience and communication will make this bond more solid.`,
    footer: "✨ A chart reading is for reference only — the real bond is written by you both.",
  },
} as const;

function SummaryText({ result, lang }: { result: SynastryResult; lang: SynLang }) {
  const { totalScore, input, tier, dimensions } = result;
  const nameA = input.personA.name;
  const nameB = input.personB.name;
  const rel = getRelationType(input.relationType, lang);
  const d = dimensions;
  const st = SUMMARY_T[lang];

  // 找出最高分和最低分维度
  const sorted = [...d].sort((a, b) => b.score - a.score);
  const best = sorted[0]!;
  const worst = sorted[sorted.length - 1]!;

  const positiveAspects = result.topAspects.filter((a) => a.score > 0 && a.nature !== "challenging");
  const challengingAspects = result.topAspects.filter((a) => a.nature === "challenging");

  return (
    <div className="syn-summary-text">
      <p>
        {st.intro(nameA, nameB, rel.label)}
        <strong className="syn-summary-score" style={{ color: tier.color }}>
          {" "}{totalScore}{st.scoreUnit}
        </strong>
        {st.dash}{tier.emoji} {tier.tagline}{st.period}
      </p>

      {best.score >= 60 && (
        <p>
          {st.bestPre()}<strong>{st.bestLabel(best.icon, best.label)}</strong>{st.bestScoreParen(best.score)}
          {st.bestMsg[bestCategory(input.relationType, best.key)]}
        </p>
      )}

      {positiveAspects.length > 0 && (
        <p>
          {st.posPre}
          {positiveAspects.slice(0, 2).map((a) => {
            const pA = getPlanetName(a.planetA, lang);
            const pB = getPlanetName(a.planetB, lang);
            const aspName = getAspectName(a.type, lang);
            return `${pA}-${pB} ${aspName}`;
          }).join(st.posJoin)}
          {st.posPost}
        </p>
      )}

      {challengingAspects.length > 0 && (
        <p>
          {st.chalPre}
          {challengingAspects.slice(0, 2).map((a) => {
            const pA = getPlanetName(a.planetA, lang);
            const pB = getPlanetName(a.planetB, lang);
            return `${pA}-${pB}`;
          }).join(st.chalJoin)}
          {st.chalPost}
        </p>
      )}

      {worst.score < 50 && (
        <p>
          {worst.icon} <strong>{worst.label}</strong>{st.worst(worst.score)}
        </p>
      )}

      <p className="syn-summary-footer">
        {st.footer}
      </p>
    </div>
  );
}
