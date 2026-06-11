"use client";

import React, { useState } from "react";
import type { AstroChart } from "../astro-engine";
import { ZODIAC_LIST, PLANET_MAP, ASPECT_MAP, HOUSE_LIST, cityLabel } from "../astro-data";
import type { ZodiacSign } from "../astro-data";
import type { AstroT, Lang } from "../astro-i18n";
import {
  getZodiacName,
  getPlanetName,
  getAspectName,
  getPlanetMeaning,
  getHouseDomain,
} from "../astro-content-i18n";

interface AstroReportProps {
  chart: AstroChart;
  t: AstroT;
  lang: Lang;
}

type TabType = "big3" | "planets" | "aspects";

// 星座标签组件
function ZodiacBadge({ sign, lang }: { sign: ZodiacSign; lang: Lang }) {
  const zodiac = ZODIAC_LIST.find((z) => z.id === sign)!;
  const elementColors: Record<string, string> = {
    fire: "#FF6B6B",
    earth: "#A8C87E",
    air: "#87CEEB",
    water: "#6EC5E9",
  };
  return (
    <span
      className="astro-zodiac-badge"
      style={{ borderColor: `${elementColors[zodiac.element]}60`, color: elementColors[zodiac.element] }}
    >
      {zodiac.symbol} {getZodiacName(sign, lang)}
    </span>
  );
}

// Big3 三巨头卡片
function Big3Card({ chart, t, lang }: { chart: AstroChart; t: AstroT; lang: Lang }) {
  const { big3 } = chart;
  const sunPlanet = PLANET_MAP.Sun;
  const moonPlanet = PLANET_MAP.Moon;

  const cards = [
    {
      planet: sunPlanet,
      label: t.big3Sun,
      sublabel: t.big3SunSub,
      sign: big3.sun.sign,
      text: big3.sun.text,
      gradient: "linear-gradient(135deg, rgba(243,156,18,0.15), rgba(243,156,18,0.05))",
      border: "rgba(243,156,18,0.3)",
    },
    {
      planet: moonPlanet,
      label: t.big3Moon,
      sublabel: t.big3MoonSub,
      sign: big3.moon.sign,
      text: big3.moon.text,
      gradient: "linear-gradient(135deg, rgba(189,195,199,0.15), rgba(189,195,199,0.05))",
      border: "rgba(189,195,199,0.3)",
    },
    ...(big3.rising ? [{
      planet: { symbol: "↑", name: t.risingName, color: "#9B59B6", id: "rising" as const },
      label: t.big3Rising,
      sublabel: t.big3RisingSub,
      sign: big3.rising.sign,
      text: big3.rising.text,
      gradient: "linear-gradient(135deg, rgba(155,89,182,0.15), rgba(155,89,182,0.05))",
      border: "rgba(155,89,182,0.3)",
    }] : []),
  ];

  return (
    <div className="astro-big3-section">
      <div className="astro-section-header">
        <h2 className="astro-section-title">{t.big3Title}</h2>
        <p className="astro-section-subtitle">{t.big3Subtitle}</p>
      </div>

      {/* 一句话总结 */}
      <div className="astro-big3-summary">
        {big3.rising
          ? `${getZodiacName(big3.rising.sign, lang)}${t.risingSuffix} · ${getZodiacName(big3.sun.sign, lang)}${t.sunSuffix} · ${getZodiacName(big3.moon.sign, lang)}${t.moonSuffix}`
          : `${getZodiacName(big3.sun.sign, lang)}${t.sunSuffix} · ${getZodiacName(big3.moon.sign, lang)}${t.moonSuffix}`}
      </div>

      <div className="astro-big3-cards">
        {cards.map((card, i) => (
          <div
            key={i}
            className="astro-big3-card"
            style={{ background: card.gradient, borderColor: card.border }}
          >
            <div className="astro-big3-card-header">
              <span className="astro-big3-planet-symbol" style={{ color: card.planet.color }}>
                {card.planet.symbol}
              </span>
              <div>
                <div className="astro-big3-label">{card.label}</div>
                <div className="astro-big3-sublabel">{card.sublabel}</div>
              </div>
              <ZodiacBadge sign={card.sign} lang={lang} />
            </div>
            <p className="astro-big3-text">{card.text}</p>
          </div>
        ))}
      </div>

      {!big3.rising && (
        <div className="astro-no-time-notice">
          {t.big3NoTime}
        </div>
      )}
    </div>
  );
}

// 行星宫位解读
function PlanetHouseSection({ chart, t, lang }: { chart: AstroChart; t: AstroT; lang: Lang }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const mainPlanets = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"] as const;

  return (
    <div className="astro-planets-section">
      <div className="astro-section-header">
        <h2 className="astro-section-title">{t.planetsTitle}</h2>
        <p className="astro-section-subtitle">{t.planetsSubtitle}</p>
      </div>

      <div className="astro-planet-list">
        {mainPlanets.map((pid) => {
          const planetPos = chart.planets.find((p) => p.planet === pid);
          const planetInterpret = chart.planetInterpretations.find((p) => p.planet === pid);
          const planetInfo = PLANET_MAP[pid];
          const zodiacInfo = ZODIAC_LIST.find((z) => z.id === planetPos?.sign);
          const houseInfo = HOUSE_LIST.find((h) => h.num === planetPos?.house);
          const isExpanded = expanded === pid;

          if (!planetPos || !zodiacInfo) return null;

          return (
            <div
              key={pid}
              className={`astro-planet-item ${isExpanded ? "expanded" : ""}`}
              onClick={() => setExpanded(isExpanded ? null : pid)}
            >
              <div className="astro-planet-item-header">
                <div className="astro-planet-icon" style={{ borderColor: `${planetInfo.color}50`, background: `${planetInfo.color}10` }}>
                  <span style={{ color: planetInfo.color, fontSize: "1.2rem" }}>{planetInfo.symbol}</span>
                </div>
                <div className="astro-planet-info">
                  <span className="astro-planet-name">{getPlanetName(pid, lang)}</span>
                  <div className="astro-planet-position">
                    <ZodiacBadge sign={planetPos.sign} lang={lang} />
                    <span className="astro-planet-degree">
                      {planetPos.degree}°{planetPos.minute.toString().padStart(2, "0")}&apos;
                    </span>
                    {chart.hasTimeData && (
                      <span className="astro-planet-house">{t.houseNumPre}{planetPos.house}{t.houseNumPost}</span>
                    )}
                  </div>
                </div>
                <span className={`astro-expand-icon ${isExpanded ? "rotated" : ""}`}>▼</span>
              </div>

              {isExpanded && (
                <div className="astro-planet-detail">
                  <div className="astro-planet-meaning">
                    <span className="astro-detail-label">{t.detailMeaning}</span>
                    <p>{getPlanetMeaning(pid, lang)}</p>
                  </div>
                  {planetInterpret?.signKeyword && (
                    <div className="astro-planet-sign-interp">
                      <span className="astro-detail-label">
                        {t.detailInPre}{getZodiacName(zodiacInfo.id, lang)}
                      </span>
                      <p>{planetInterpret.signKeyword}</p>
                    </div>
                  )}
                  {chart.hasTimeData && planetInterpret?.houseText && houseInfo && (
                    <div className="astro-planet-house-interp">
                      <span className="astro-detail-label">
                        {t.detailHousePre}{planetPos.house}{t.detailHouseMid}{getHouseDomain(houseInfo.num, lang)}{t.detailHousePost}
                      </span>
                      <p>{planetInterpret.houseText}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 外行星简报 */}
      <div className="astro-outer-planets">
        <h3 className="astro-outer-title">{t.outerTitle}</h3>
        <div className="astro-outer-grid">
          {(["Uranus", "Neptune", "Pluto"] as const).map((pid) => {
            const planetPos = chart.planets.find((p) => p.planet === pid);
            const planetInfo = PLANET_MAP[pid];
            const zodiacInfo = ZODIAC_LIST.find((z) => z.id === planetPos?.sign);
            if (!planetPos || !zodiacInfo) return null;
            return (
              <div key={pid} className="astro-outer-planet-card">
                <span style={{ color: planetInfo.color }}>{planetInfo.symbol}</span>
                <span className="astro-outer-planet-name">{getPlanetName(pid, lang)}</span>
                <span className="astro-outer-planet-sign">{zodiacInfo.symbol} {getZodiacName(zodiacInfo.id, lang)}</span>
              </div>
            );
          })}
        </div>
        <p className="astro-outer-note">
          {t.outerNote}
        </p>
      </div>
    </div>
  );
}

// 核心相位解读
function AspectsSection({ chart, t, lang }: { chart: AstroChart; t: AstroT; lang: Lang }) {
  return (
    <div className="astro-aspects-section">
      <div className="astro-section-header">
        <h2 className="astro-section-title">{t.aspectsTitle}</h2>
        <p className="astro-section-subtitle">{t.aspectsSubPre}{chart.topAspects.length}{t.aspectsSubPost}</p>
      </div>

      {chart.topAspects.length === 0 ? (
        <div className="astro-no-aspects">{t.noAspects}</div>
      ) : (
        <div className="astro-aspect-list">
          {chart.topAspects.map((aspect, i) => {
            const p1Info = PLANET_MAP[aspect.planet1];
            const p2Info = PLANET_MAP[aspect.planet2];
            const aspectInfo = ASPECT_MAP[aspect.type];
            return (
              <div key={i} className="astro-aspect-card" style={{ borderLeftColor: aspectInfo.color }}>
                <div className="astro-aspect-header">
                  <div className="astro-aspect-planets">
                    <span style={{ color: p1Info.color }}>{p1Info.symbol} {getPlanetName(aspect.planet1, lang)}</span>
                    <span
                      className="astro-aspect-symbol"
                      style={{ color: aspectInfo.color }}
                    >
                      {aspectInfo.symbol}
                    </span>
                    <span style={{ color: p2Info.color }}>{p2Info.symbol} {getPlanetName(aspect.planet2, lang)}</span>
                  </div>
                  <div className="astro-aspect-meta">
                    <span
                      className="astro-aspect-type-badge"
                      style={{
                        background: `${aspectInfo.color}20`,
                        color: aspectInfo.color,
                        border: `1px solid ${aspectInfo.color}40`,
                      }}
                    >
                      {getAspectName(aspect.type, lang)}
                    </span>
                    <span className="astro-aspect-orb">{aspect.orb.toFixed(1)}°</span>
                    <span
                      className="astro-aspect-nature"
                      style={{
                        color: aspectInfo.nature === "harmonious" ? "#2ECC71"
                          : aspectInfo.nature === "challenging" ? "#E74C3C"
                          : "#F1C40F",
                      }}
                    >
                      {aspectInfo.nature === "harmonious" ? t.natureHarmonious
                        : aspectInfo.nature === "challenging" ? t.natureChallenging
                        : t.natureNeutral}
                    </span>
                  </div>
                </div>
                <p className="astro-aspect-text">{aspect.interpretation}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// 主报告组件
export function AstroReport({ chart, t, lang }: AstroReportProps) {
  const [activeTab, setActiveTab] = useState<TabType>("big3");

  const tabs: Array<{ id: TabType; label: string; icon: string }> = [
    { id: "big3", label: t.tabBig3, icon: "⭐" },
    { id: "planets", label: t.tabPlanets, icon: "🪐" },
    { id: "aspects", label: t.tabAspects, icon: "🔗" },
  ];

  return (
    <div className="astro-report-wrapper">
      {/* 用户信息标题 */}
      <div className="astro-report-header">
        <h1 className="astro-report-name">{chart.input.name}</h1>
        <p className="astro-report-info">
          {chart.input.birthDate.replace(/-/g, " / ")}
          {chart.hasTimeData && ` · ${chart.input.birthTime}`}
          {" · "}{cityLabel(chart.input.city, lang)}
        </p>
        {!chart.hasTimeData && (
          <div className="astro-report-no-time">
            {t.reportNoTime}
          </div>
        )}
      </div>

      {/* Tab 切换 */}
      <div className="astro-report-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`astro-report-tab ${activeTab === tab.id ? "active" : ""}`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 内容 */}
      <div className="astro-report-content">
        {activeTab === "big3" && <Big3Card chart={chart} t={t} lang={lang} />}
        {activeTab === "planets" && <PlanetHouseSection chart={chart} t={t} lang={lang} />}
        {activeTab === "aspects" && <AspectsSection chart={chart} t={t} lang={lang} />}
      </div>
    </div>
  );
}
