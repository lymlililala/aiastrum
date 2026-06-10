"use client";

import React from "react";
import {
  ZODIAC_MAP,
  ELEMENT_COLORS,
  type TimePeriod,
} from "../horoscope-data";
import type { HoroscopeResult } from "../horoscope-engine";
import type { HoroT } from "../horoscope-i18n";

interface FortuneDetailProps {
  result: HoroscopeResult;
  onPeriodChange: (period: TimePeriod) => void;
  onShare: () => void;
  t: HoroT;
}

export function FortuneDetail({ result, onPeriodChange, onShare, t }: FortuneDetailProps) {
  const zodiac = ZODIAC_MAP[result.zodiac];
  const elementColor = ELEMENT_COLORS[zodiac.element] ?? "#c9a84c";

  /** 时间段标签 */
  const PERIOD_LABELS: Record<TimePeriod, { label: string; icon: string }> = {
    today: { label: t.periodToday, icon: "☀️" },
    tomorrow: { label: t.periodTomorrow, icon: "🌅" },
    week: { label: t.periodWeek, icon: "📅" },
    month: { label: t.periodMonth, icon: "🗓️" },
  };

  /** 运势维度配置 */
  const SCORE_DIMENSIONS = [
    { key: "overall" as const, label: t.dimOverall, icon: "⭐" },
    { key: "love" as const, label: t.dimLove, icon: "💕" },
    { key: "career" as const, label: t.dimCareer, icon: "💼" },
    { key: "wealth" as const, label: t.dimWealth, icon: "💰" },
    { key: "health" as const, label: t.dimHealth, icon: "🌿" },
  ];

  return (
    <div className="fortune-detail-wrapper">
      {/* 头部：星座信息 */}
      <div
        className="fortune-header"
        style={{ "--theme-color": elementColor } as React.CSSProperties}
      >
        <div className="fortune-header-bg">
          {["✨", "⭐", "🌟", "💫"].map((s, i) => (
            <span
              key={i}
              className="fortune-header-star"
              style={{
                animationDelay: `${i * 0.5}s`,
                left: `${15 + i * 22}%`,
                top: `${10 + (i % 3) * 30}%`,
              }}
            >
              {s}
            </span>
          ))}
        </div>

        <div className="fortune-header-content">
          <div className="fortune-zodiac-symbol">{zodiac.symbol}</div>
          <div className="fortune-zodiac-info">
            <h2 className="fortune-zodiac-name">{t.signLabel[result.zodiac]}</h2>
            <p className="fortune-zodiac-en">{zodiac.enName}</p>
            <p className="fortune-zodiac-date">{zodiac.dateRange}</p>
          </div>
        </div>

        <div className="fortune-title">{result.title}</div>
        <div className="fortune-summary">{result.summary}</div>
      </div>

      {/* 时间段切换 */}
      <div className="fortune-period-tabs">
        {(Object.keys(PERIOD_LABELS) as TimePeriod[]).map((period) => {
          const { label, icon } = PERIOD_LABELS[period];
          const isActive = result.period === period;
          return (
            <button
              key={period}
              className={`fortune-period-tab ${isActive ? "fortune-period-tab-active" : ""}`}
              onClick={() => onPeriodChange(period)}
              style={isActive ? { "--tab-color": elementColor } as React.CSSProperties : undefined}
            >
              <span className="fortune-period-icon">{icon}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* 五维指数 */}
      <div className="fortune-scores-section">
        <h3 className="fortune-section-title">
          <span className="fortune-section-icon">📊</span>
          {t.scoresTitle}
        </h3>
        <div className="fortune-scores-grid">
          {SCORE_DIMENSIONS.map(({ key, label, icon }) => {
            const score = result.scores[key];
            return (
              <div key={key} className="fortune-score-item">
                <div className="fortune-score-header">
                  <span className="fortune-score-icon">{icon}</span>
                  <span className="fortune-score-label">{label}</span>
                  <span className="fortune-score-value">{score}</span>
                </div>
                <div className="fortune-score-bar-bg">
                  <div
                    className="fortune-score-bar-fill"
                    style={{
                      width: `${(score / 5) * 100}%`,
                      backgroundColor: elementColor,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 详细运势文案 */}
      <div className="fortune-texts-section">
        <h3 className="fortune-section-title">
          <span className="fortune-section-icon">🔮</span>
          {t.textsTitle}
        </h3>

        {/* 综合 */}
        <FortuneTextBlock
          icon="⭐"
          title={t.textOverall}
          text={result.content.overall}
          color={elementColor}
          t={t}
        />
        {/* 爱情 */}
        <FortuneTextBlock
          icon="💕"
          title={t.textLove}
          text={result.content.love}
          color="#FF6B9D"
          t={t}
        />
        {/* 事业 */}
        <FortuneTextBlock
          icon="💼"
          title={t.textCareer}
          text={result.content.career}
          color="#4ECDC4"
          t={t}
        />
        {/* 财运 */}
        <FortuneTextBlock
          icon="💰"
          title={t.textWealth}
          text={result.content.wealth}
          color="#FFD93D"
          t={t}
        />
        {/* 健康 */}
        <FortuneTextBlock
          icon="🌿"
          title={t.textHealth}
          text={result.content.health}
          color="#82C46C"
          t={t}
        />
      </div>

      {/* 幸运指南 */}
      <div className="fortune-lucky-section">
        <h3 className="fortune-section-title">
          <span className="fortune-section-icon">🍀</span>
          {t.luckyTitle}
        </h3>
        <div className="fortune-lucky-grid">
          <LuckyItem icon="🎨" label={t.luckyColor} value={result.lucky.color} />
          <LuckyItem icon="🔢" label={t.luckyNumber} value={String(result.lucky.number)} />
          <LuckyItem icon="🧭" label={t.luckyDirection} value={result.lucky.direction} />
          <LuckyItem icon="🎁" label={t.luckyItem} value={result.lucky.item} />
          <LuckyItem
            icon="🤝"
            label={t.luckyAlly}
            value={t.signLabel[result.lucky.ally]}
            sub={ZODIAC_MAP[result.lucky.ally].symbol}
          />
          <LuckyItem
            icon="⭐"
            label={t.luckyNoble}
            value={t.signLabel[result.lucky.noble]}
            sub={ZODIAC_MAP[result.lucky.noble].symbol}
          />
        </div>
      </div>

      {/* 今日建议 */}
      <div className="fortune-advice-section">
        <h3 className="fortune-section-title">
          <span className="fortune-section-icon">💡</span>
          {t.adviceTitle}
        </h3>
        <div className="fortune-advice-card">
          <p className="fortune-advice-text">{result.content.advice}</p>
        </div>
      </div>

      {/* 分享按钮 */}
      <div className="fortune-share-section">
        <button className="fortune-share-btn" onClick={onShare}>
          <span className="fortune-share-icon">🖼️</span>
          {t.sharePoster}
        </button>
      </div>
    </div>
  );
}

/** 运势文案块 */
function FortuneTextBlock({
  icon,
  title,
  text,
  color,
  t,
}: {
  icon: string;
  title: string;
  text: string;
  color: string;
  t: HoroT;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const isLong = text.length > 80;
  const displayText = isLong && !expanded ? text.slice(0, 80) + "..." : text;

  return (
    <div className="fortune-text-block" style={{ "--block-color": color } as React.CSSProperties}>
      <div className="fortune-text-block-header">
        <span className="fortune-text-block-icon">{icon}</span>
        <span className="fortune-text-block-title">{title}</span>
      </div>
      <p className="fortune-text-block-content">{displayText}</p>
      {isLong && (
        <button
          className="fortune-text-expand-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? t.collapse : t.expand}
        </button>
      )}
    </div>
  );
}

/** 幸运项 */
function LuckyItem({
  icon,
  label,
  value,
  sub,
}: {
  icon: string;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="fortune-lucky-item">
      <span className="fortune-lucky-icon">{icon}</span>
      <span className="fortune-lucky-label">{label}</span>
      <span className="fortune-lucky-value">
        {sub && <span className="fortune-lucky-sub">{sub}</span>}
        {value}
      </span>
    </div>
  );
}
