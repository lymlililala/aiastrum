"use client";

import { useMemo } from "react";
import type { SynastryResult } from "../synastry-engine";
import { getAspectInfo } from "../synastry-engine";
import { getRelationType } from "../synastry-data";
import type { Planet, AspectType } from "../synastry-data";
import { ZODIAC_LIST, PLANET_MAP, ASPECT_MAP } from "../../astro/astro-data";
import type { SynT, SynLang } from "../synastry-i18n";

interface Props {
  result: SynastryResult;
  t: SynT;
  lang: SynLang;
}

// ===== 双层星盘 SVG =====
const SIZE = 380;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R_OUTER = 160;   // 外圈（乙方）
const R_INNER = 110;   // 内圈（甲方）
const R_ZODIAC = 175;  // 星座带外径
const R_ZODIAC_IN = 162; // 星座带内径
const R_PLANET_A = 126; // 甲方行星环
const R_PLANET_B = 144; // 乙方行星环

function polarToXY(r: number, angleDeg: number) {
  // 从正上方（0°=Aries）逆时针
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function getAspectColor(type: AspectType): string {
  return ASPECT_MAP[type]?.color ?? "#888";
}

export default function SynastryChart({ result, t, lang }: Props) {
  const rel = getRelationType(result.input.relationType, lang);

  // 重要行星（只显示太阳~土星的行星连线）
  const displayPlanets: Planet[] = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"];

  const planetsA = result.planetsA.filter((p) => displayPlanets.includes(p.planet));
  const planetsB = result.planetsB.filter((p) => displayPlanets.includes(p.planet));

  // 计算行星位置（黄道经度直接映射到角度）
  const getPlanetXY = (longitude: number, r: number) => polarToXY(r, longitude);

  // 星座分割线（30°一段）
  const zodiacDividers = useMemo(() => {
    return ZODIAC_LIST.map((_, i) => {
      const angleDeg = i * 30;
      const inner = polarToXY(R_INNER, angleDeg);
      const outer = polarToXY(R_ZODIAC, angleDeg);
      return { x1: inner.x, y1: inner.y, x2: outer.x, y2: outer.y, angle: angleDeg };
    });
  }, []);

  // 星座标签位置
  const zodiacLabels = useMemo(() => {
    return ZODIAC_LIST.map((z, i) => {
      const angleDeg = i * 30 + 15;
      const pt = polarToXY((R_ZODIAC_IN + R_ZODIAC) / 2, angleDeg);
      return { ...pt, symbol: z.symbol, name: z.name };
    });
  }, []);

  // 合盘连线（topAspects）
  type AspectLine = { x: number; y: number; x2: number; y2: number; color: string; opacity: number; strokeWidth: number; dashArray: string | undefined; asp: typeof result.topAspects[0] };
  const aspectLines = useMemo((): AspectLine[] => {
    return result.topAspects.map((asp) => {
      const pA = result.planetsA.find((p) => p.planet === asp.planetA);
      const pB = result.planetsB.find((p) => p.planet === asp.planetB);
      if (!pA || !pB) return null;
      const ptA = getPlanetXY(pA.longitude, R_PLANET_A);
      const ptB = getPlanetXY(pB.longitude, R_PLANET_B);
      const color = getAspectColor(asp.type);
      const opacity = asp.isKeyPlanet ? 0.9 : 0.5;
      const strokeWidth = asp.isKeyPlanet ? 1.5 : 0.8;
      const dashArray = asp.type === "square" || asp.type === "opposition" ? "4 3" : undefined;
      return { ...ptA, x2: ptB.x, y2: ptB.y, color, opacity, strokeWidth, dashArray, asp };
    }).filter(Boolean) as AspectLine[];
  }, [result]);

  return (
    <div className="syn-chart-wrap">
      <h3 className="syn-section-title">{t.chartTitle}</h3>
      <p className="syn-section-sub">{t.chartSubPre} {result.input.personA.name}{t.chartSubMid}{result.input.personB.name}</p>

      <div className="syn-chart-svg-wrap">
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="syn-chart-svg"
        >
          <defs>
            <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1a0a2e" />
              <stop offset="100%" stopColor="#0a0516" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 背景 */}
          <circle cx={CX} cy={CY} r={R_ZODIAC} fill="url(#bgGrad)" />

          {/* 星座带 */}
          {ZODIAC_LIST.map((z, i) => {
            const startAngle = i * 30 - 90;
            const endAngle = (i + 1) * 30 - 90;
            const r1 = R_ZODIAC_IN;
            const r2 = R_ZODIAC;
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;
            const x1 = CX + r2 * Math.cos(startRad);
            const y1 = CY + r2 * Math.sin(startRad);
            const x2 = CX + r2 * Math.cos(endRad);
            const y2 = CY + r2 * Math.sin(endRad);
            const x3 = CX + r1 * Math.cos(endRad);
            const y3 = CY + r1 * Math.sin(endRad);
            const x4 = CX + r1 * Math.cos(startRad);
            const y4 = CY + r1 * Math.sin(startRad);
            const opacity = i % 2 === 0 ? 0.08 : 0.04;
            return (
              <path
                key={z.id}
                d={`M ${x1} ${y1} A ${r2} ${r2} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${r1} ${r1} 0 0 0 ${x4} ${y4} Z`}
                fill={z.color}
                fillOpacity={opacity}
              />
            );
          })}

          {/* 星座分割线 */}
          {zodiacDividers.map((d, i) => (
            <line key={i} x1={d.x1} y1={d.y1} x2={d.x2} y2={d.y2} stroke="#ffffff18" strokeWidth="0.5" />
          ))}

          {/* 星座符号 */}
          {zodiacLabels.map((l, i) => (
            <text key={i} x={l.x} y={l.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#ffffff55">
              {l.symbol}
            </text>
          ))}

          {/* 外圈（乙方轨道） */}
          <circle cx={CX} cy={CY} r={R_OUTER} fill="none" stroke={rel.gradientTo} strokeWidth="1" strokeOpacity="0.3" />

          {/* 内圈（甲方轨道） */}
          <circle cx={CX} cy={CY} r={R_INNER} fill="none" stroke={rel.gradientFrom} strokeWidth="1" strokeOpacity="0.3" />

          {/* 中心圆 */}
          <circle cx={CX} cy={CY} r={40} fill="#0a0516" stroke="#ffffff08" strokeWidth="1" />
          <text x={CX} y={CY - 8} textAnchor="middle" fontSize="18" fill="#ffffff40">{rel.icon}</text>
          <text x={CX} y={CY + 12} textAnchor="middle" fontSize="8" fill="#ffffff30">SYNASTRY</text>

          {/* 合盘相位连线 */}
          {aspectLines.map((line, i) => (
            <line
              key={i}
              x1={line.x} y1={line.y}
              x2={line.x2} y2={line.y2}
              stroke={line.color}
              strokeWidth={line.strokeWidth}
              strokeOpacity={line.opacity}
              strokeDasharray={line.dashArray}
            />
          ))}

          {/* 甲方行星（内圈） */}
          {planetsA.map((p) => {
            const pt = getPlanetXY(p.longitude, R_PLANET_A);
            const pData = PLANET_MAP[p.planet];
            return (
              <g key={`a-${p.planet}`}>
                <circle cx={pt.x} cy={pt.y} r="8" fill="#1a0a2e" stroke={p.color} strokeWidth="1.5" />
                <text x={pt.x} y={pt.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill={p.color} filter="url(#glow)">
                  {pData?.symbol ?? p.planet[0]}
                </text>
              </g>
            );
          })}

          {/* 乙方行星（外圈） */}
          {planetsB.map((p) => {
            const pt = getPlanetXY(p.longitude, R_PLANET_B);
            const pData = PLANET_MAP[p.planet];
            return (
              <g key={`b-${p.planet}`}>
                <circle cx={pt.x} cy={pt.y} r="8" fill="#0d1a2e" stroke={p.color} strokeWidth="1.5" strokeDasharray="3 2" />
                <text x={pt.x} y={pt.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill={p.color} filter="url(#glow)">
                  {pData?.symbol ?? p.planet[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* 图例 */}
      <div className="syn-chart-legend">
        <div className="syn-legend-item">
          <span className="syn-legend-dot" style={{ borderColor: rel.gradientFrom }} />
          <span>{result.input.personA.name}{t.legendInner}</span>
        </div>
        <div className="syn-legend-item">
          <span className="syn-legend-dot" style={{ borderColor: rel.gradientTo, borderStyle: "dashed" }} />
          <span>{result.input.personB.name}{t.legendOuter}</span>
        </div>
      </div>

      {/* 相位图例 */}
      <div className="syn-aspect-legend">
        {(["conjunction", "trine", "sextile", "square", "opposition"] as AspectType[]).map((type) => {
          const info = getAspectInfo(type);
          if (!info) return null;
          return (
            <div key={type} className="syn-aspect-legend-item">
              <svg width="24" height="14">
                <line
                  x1="0" y1="7" x2="24" y2="7"
                  stroke={info.color}
                  strokeWidth="2"
                  strokeDasharray={type === "square" || type === "opposition" ? "4 3" : undefined}
                />
              </svg>
              <span>{info.name}</span>
            </div>
          );
        })}
      </div>

      {/* 雷达图（维度评分） */}
      <RadarChart result={result} t={t} lang={lang} />
    </div>
  );
}

// ===== 雷达图 =====
function RadarChart({ result, t, lang }: { result: SynastryResult; t: SynT; lang: SynLang }) {
  const dims = result.dimensions;
  const rel = getRelationType(result.input.relationType, lang);
  const n = dims.length;
  const R = 80;
  const cx = 120;
  const cy = 120;

  const points = dims.map((d, i) => {
    const angle = ((i * 360) / n - 90) * (Math.PI / 180);
    const r = (d.score / 100) * R;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), label: d.label, icon: d.icon, score: d.score };
  });

  const polyPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  const labelPoints = dims.map((d, i) => {
    const angle = ((i * 360) / n - 90) * (Math.PI / 180);
    const r = R + 22;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), label: d.label, icon: d.icon, score: d.score };
  });

  // 背景网格（三层）
  const gridLayers = [0.33, 0.66, 1.0].map((ratio) => {
    const gPts = dims.map((_, i) => {
      const angle = ((i * 360) / n - 90) * (Math.PI / 180);
      const r = R * ratio;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(" ");
    return gPts;
  });

  return (
    <div className="syn-radar-wrap">
      <h4 className="syn-radar-title">{t.radarTitle}</h4>
      <svg width={240} height={240} viewBox="0 0 240 240" className="syn-radar-svg">
        <defs>
          <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={rel.gradientFrom} stopOpacity="0.6" />
            <stop offset="100%" stopColor={rel.gradientTo} stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* 背景网格 */}
        {gridLayers.map((pts, i) => (
          <polygon key={i} points={pts} fill="none" stroke="#ffffff15" strokeWidth="0.8" />
        ))}

        {/* 轴线 */}
        {dims.map((_, i) => {
          const angle = ((i * 360) / n - 90) * (Math.PI / 180);
          return (
            <line
              key={i}
              x1={cx} y1={cy}
              x2={cx + R * Math.cos(angle)}
              y2={cy + R * Math.sin(angle)}
              stroke="#ffffff20" strokeWidth="0.8"
            />
          );
        })}

        {/* 数据面 */}
        <polygon
          points={polyPoints}
          fill="url(#radarGrad)"
          stroke={rel.gradientTo}
          strokeWidth="1.5"
        />

        {/* 数据点 */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill={rel.gradientTo} />
        ))}

        {/* 标签 */}
        {labelPoints.map((p, i) => (
          <g key={i}>
            <text x={p.x} y={p.y - 5} textAnchor="middle" fontSize="12">{p.icon}</text>
            <text x={p.x} y={p.y + 9} textAnchor="middle" fontSize="8" fill="#ffffffaa">{p.label}</text>
            <text x={p.x} y={p.y + 20} textAnchor="middle" fontSize="9" fill="#ffffff" fontWeight="bold">{p.score}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
