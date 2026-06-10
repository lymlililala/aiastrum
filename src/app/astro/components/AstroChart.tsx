"use client";

import React, { useState } from "react";
import type { AstroChart, PlanetPosition } from "../astro-engine";
import { ZODIAC_LIST, PLANET_MAP, ASPECT_MAP, ASPECT_LIST } from "../astro-data";
import type { ZodiacSign } from "../astro-data";
import type { AstroT } from "../astro-i18n";

interface AstroChartProps {
  chart: AstroChart;
  t: AstroT;
}

// 星座环颜色（元素色）
const ELEMENT_COLORS: Record<string, string> = {
  fire: "#FF6B6B",
  earth: "#A8C87E",
  air: "#87CEEB",
  water: "#6EC5E9",
};

export function AstroChartSVG({ chart, t }: AstroChartProps) {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  // SVG 尺寸参数
  const cx = 250;      // 圆心 X
  const cy = 250;      // 圆心 Y
  const R_outer = 220; // 最外圈（星座符号圆）
  const R_zodiac = 200; // 星座分界圆
  const R_house_outer = 170; // 宫位外圆
  const R_house_inner = 135; // 宫位内圆（宫位编号）
  const R_planet = 105; // 行星轨道圆
  const R_inner = 80;  // 内圈

  // 黄道经度 → SVG 坐标（0°在右，逆时针）
  // 占星图：0° Aries 在 "9点钟方向"（西方），逆时针增大
  function eclipticToXY(longitude: number, radius: number): { x: number; y: number } {
    // 将黄道经度转换为 SVG 角度（从正右方起，顺时针）
    // 占星：0° Aries 在东方（左），逆时针
    const angle = -longitude + 180; // 0°白羊在左方（9点），逆时针
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  }

  // 宫位线（从宫头经度画线）
  function houseLineToXY(longitude: number, r1: number, r2: number) {
    const p1 = eclipticToXY(longitude, r1);
    const p2 = eclipticToXY(longitude, r2);
    return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y };
  }

  // 星座分区（12个扇形）
  function getZodiacSectorPath(startDeg: number, _color: string) {
    const endDeg = startDeg + 30;
    const outerStart = eclipticToXY(startDeg, R_outer);
    const outerEnd = eclipticToXY(endDeg, R_outer);
    const innerStart = eclipticToXY(startDeg, R_zodiac);
    const innerEnd = eclipticToXY(endDeg, R_zodiac);
    const largeArc = 0;
    return `M ${outerStart.x} ${outerStart.y} 
            A ${R_outer} ${R_outer} 0 ${largeArc} 0 ${outerEnd.x} ${outerEnd.y}
            L ${innerEnd.x} ${innerEnd.y}
            A ${R_zodiac} ${R_zodiac} 0 ${largeArc} 1 ${innerStart.x} ${innerStart.y}
            Z`;
  }

  // 绘制相位线
  function renderAspectLines() {
    return chart.aspects
      .filter((a) => a.orb <= 4) // 只画容许度 <= 4° 的相位（图面清洁）
      .map((aspect, i) => {
        const p1Data = chart.planets.find((p) => p.planet === aspect.planet1);
        const p2Data = chart.planets.find((p) => p.planet === aspect.planet2);
        if (!p1Data || !p2Data) return null;
        const pos1 = eclipticToXY(p1Data.longitude, R_inner);
        const pos2 = eclipticToXY(p2Data.longitude, R_inner);
        const aspectInfo = ASPECT_MAP[aspect.type];
        return (
          <line
            key={i}
            x1={pos1.x} y1={pos1.y}
            x2={pos2.x} y2={pos2.y}
            stroke={aspectInfo.color}
            strokeWidth="0.8"
            strokeOpacity="0.5"
            strokeDasharray={aspect.type === "opposition" ? "4,3" : aspect.type === "square" ? "2,2" : "none"}
          />
        );
      });
  }

  // 行星位置图标
  function renderPlanets() {
    return chart.planets.map((planet) => {
      const planetInfo = PLANET_MAP[planet.planet];
      const pos = eclipticToXY(planet.longitude, R_planet);
      const isHovered = hoveredPlanet === planet.planet;

      return (
        <g
          key={planet.planet}
          onMouseEnter={() => setHoveredPlanet(planet.planet)}
          onMouseLeave={() => setHoveredPlanet(null)}
          style={{ cursor: "pointer" }}
        >
          {/* 行星圆点 */}
          <circle
            cx={pos.x} cy={pos.y}
            r={isHovered ? 14 : 11}
            fill={`${planetInfo.color}22`}
            stroke={planetInfo.color}
            strokeWidth={isHovered ? 1.5 : 1}
          />
          {/* 行星符号 */}
          <text
            x={pos.x} y={pos.y + 4}
            textAnchor="middle"
            fontSize={isHovered ? "11" : "9"}
            fill={planetInfo.color}
            fontWeight="bold"
          >
            {planetInfo.symbol}
          </text>
          {/* Hover 详情气泡 */}
          {isHovered && (
            <PlanetTooltip planet={planet} cx={pos.x} cy={pos.y} />
          )}
        </g>
      );
    });
  }

  // 悬浮提示气泡
  function PlanetTooltip({ planet, cx: px, cy: py }: { planet: PlanetPosition; cx: number; cy: number }) {
    const zodiacInfo = ZODIAC_LIST.find((z) => z.id === planet.sign)!;
    const planetInfo = PLANET_MAP[planet.planet];
    // 气泡位置（避免超出边界）
    const tooltipX = px > cx ? px - 90 : px + 15;
    const tooltipY = py > cy ? py - 60 : py + 15;

    return (
      <g>
        <rect
          x={tooltipX} y={tooltipY}
          width="90" height="52"
          rx="6" ry="6"
          fill="rgba(15,10,30,0.95)"
          stroke={planetInfo.color}
          strokeWidth="1"
        />
        <text x={tooltipX + 45} y={tooltipY + 16} textAnchor="middle" fontSize="9" fill={planetInfo.color} fontWeight="bold">
          {planetInfo.symbol} {planetInfo.name}
        </text>
        <text x={tooltipX + 45} y={tooltipY + 29} textAnchor="middle" fontSize="8.5" fill="#e8d5a3">
          {zodiacInfo.symbol} {zodiacInfo.name} {planet.degree}°{planet.minute.toString().padStart(2, "0")}{"'"}
        </text>
        <text x={tooltipX + 45} y={tooltipY + 42} textAnchor="middle" fontSize="8" fill="rgba(232,213,163,0.6)">
          {t.houseLabelPre}{planet.house}{t.houseLabelPost}
        </text>
      </g>
    );
  }

  // 宫位标签（宫位编号）
  function renderHouseNumbers() {
    return chart.houses.map((house) => {
      const nextHouse = chart.houses.find((h) => h.house === (house.house % 12) + 1);
      if (!nextHouse) return null;
      // 宫位中间经度
      let span = nextHouse.longitude - house.longitude;
      if (span < 0) span += 360;
      const midLon = house.longitude + span / 2;
      const pos = eclipticToXY(midLon, (R_house_inner + R_planet - 15) / 2 + 15);
      return (
        <text
          key={house.house}
          x={pos.x} y={pos.y + 4}
          textAnchor="middle"
          fontSize="8.5"
          fill="rgba(201,168,76,0.6)"
          fontFamily="serif"
        >
          {house.house}
        </text>
      );
    });
  }

  return (
    <div className="astro-chart-wrapper">
      <svg
        viewBox="0 0 500 500"
        className="astro-chart-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 渐变定义 */}
        <defs>
          <radialGradient id="chartBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a1035" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0f0a1e" stopOpacity="1" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 背景圆 */}
        <circle cx={cx} cy={cy} r={R_outer + 8} fill="url(#chartBg)" />

        {/* 星座分区（外环）*/}
        {ZODIAC_LIST.map((zodiac) => (
          <path
            key={zodiac.id}
            d={getZodiacSectorPath(zodiac.startDeg, zodiac.color)}
            fill={`${ELEMENT_COLORS[zodiac.element]}18`}
            stroke={`${ELEMENT_COLORS[zodiac.element]}40`}
            strokeWidth="0.5"
          />
        ))}

        {/* 星座符号 */}
        {ZODIAC_LIST.map((zodiac) => {
          const midDeg = zodiac.startDeg + 15;
          const pos = eclipticToXY(midDeg, (R_outer + R_zodiac) / 2);
          return (
            <text
              key={zodiac.id}
              x={pos.x} y={pos.y + 4}
              textAnchor="middle"
              fontSize="11"
              fill={ELEMENT_COLORS[zodiac.element]}
              opacity="0.85"
            >
              {zodiac.symbol}
            </text>
          );
        })}

        {/* 宫位外圆 */}
        <circle cx={cx} cy={cy} r={R_house_outer} fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="0.5" />

        {/* 宫位分割线 */}
        {chart.houses.map((house) => {
          const line = houseLineToXY(house.longitude, R_house_inner, R_house_outer);
          const isAngle = [1, 4, 7, 10].includes(house.house);
          return (
            <line
              key={house.house}
              x1={line.x1} y1={line.y1}
              x2={line.x2} y2={line.y2}
              stroke={isAngle ? "rgba(201,168,76,0.7)" : "rgba(201,168,76,0.2)"}
              strokeWidth={isAngle ? "1.5" : "0.8"}
            />
          );
        })}

        {/* 宫位内圆 */}
        <circle cx={cx} cy={cy} r={R_house_inner} fill="rgba(15,10,30,0.3)" stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" />

        {/* 宫位编号 */}
        {renderHouseNumbers()}

        {/* 行星轨道圆 */}
        <circle cx={cx} cy={cy} r={R_planet} fill="none" stroke="rgba(201,168,76,0.08)" strokeWidth="0.5" strokeDasharray="2,4" />

        {/* 相位线（最内圈内绘制）*/}
        <circle cx={cx} cy={cy} r={R_inner} fill="rgba(10,5,25,0.6)" stroke="rgba(201,168,76,0.12)" strokeWidth="0.5" />
        {renderAspectLines()}

        {/* 行星 */}
        {renderPlanets()}

        {/* 上升点标记（ASC）*/}
        {chart.hasTimeData && (
          <>
            {(() => {
              const ascPos = eclipticToXY(chart.ascendant, R_house_outer + 12);
              return (
                <text
                  x={ascPos.x} y={ascPos.y + 4}
                  textAnchor="middle"
                  fontSize="8"
                  fill="#F39C12"
                  fontWeight="bold"
                >
                  ASC
                </text>
              );
            })()}
          </>
        )}

        {/* 中心装饰 */}
        <circle cx={cx} cy={cy} r="18" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
        <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14" fill="rgba(201,168,76,0.7)">✦</text>
      </svg>

      {/* 相位图例 */}
      <div className="astro-aspect-legend">
        {ASPECT_LIST.map((aspect) => (
          <div key={aspect.id} className="astro-legend-item">
            <div
              className="astro-legend-color"
              style={{ background: aspect.color }}
            />
            <span>{aspect.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 元素分布饼图（简单文字版）
export function ElementBreakdown({ chart, t }: AstroChartProps) {
  const elementCount: Record<string, number> = { fire: 0, earth: 0, air: 0, water: 0 };
  const elementNames: Record<string, string> = {
    fire: t.elemFire,
    earth: t.elemEarth,
    air: t.elemAir,
    water: t.elemWater,
  };

  for (const p of chart.planets) {
    const zodiac = ZODIAC_LIST.find((z) => z.id === p.sign);
    if (zodiac && zodiac.element in elementCount) elementCount[zodiac.element] = (elementCount[zodiac.element] ?? 0) + 1;
  }

  const total = Object.values(elementCount).reduce((a, b) => a + b, 0);

  return (
    <div className="astro-element-breakdown">
      {Object.entries(elementCount).map(([el, count]) => (
        <div key={el} className="astro-element-bar-row">
          <span className="astro-element-name">{elementNames[el]}</span>
          <div className="astro-element-bar-track">
            <div
              className="astro-element-bar-fill"
              style={{
                width: `${(count / total) * 100}%`,
                background: ELEMENT_COLORS[el],
              }}
            />
          </div>
          <span className="astro-element-count">{count}</span>
        </div>
      ))}
    </div>
  );
}

// 根据星座ID获取星座中文名
export function getZodiacName(sign: ZodiacSign): string {
  return ZODIAC_LIST.find((z) => z.id === sign)?.name ?? sign;
}
