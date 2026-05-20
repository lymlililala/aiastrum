"use client";

import React from "react";
import {
  ZODIAC_MAP,
  ELEMENT_COLORS,
  type TimePeriod,
} from "../horoscope-data";
import type { HoroscopeResult } from "../horoscope-engine";

interface FortuneDetailProps {
  result: HoroscopeResult;
  onPeriodChange: (period: TimePeriod) => void;
  onShare: () => void;
}

/** 时间段标签 */
const PERIOD_LABELS: Record<TimePeriod, { label: string; icon: string }> = {
  today: { label: "今日", icon: "☀️" },
  tomorrow: { label: "明日", icon: "🌅" },
  week: { label: "本周", icon: "📅" },
  month: { label: "本月", icon: "🗓️" },
};

/** 运势维度配置 */
const SCORE_DIMENSIONS = [
  { key: "overall" as const, label: "综合", icon: "⭐" },
  { key: "love" as const, label: "爱情", icon: "💕" },
  { key: "career" as const, label: "事业", icon: "💼" },
  { key: "wealth" as const, label: "财运", icon: "💰" },
  { key: "health" as const, label: "健康", icon: "🌿" },
];

export function FortuneDetail({ result, onPeriodChange, onShare }: FortuneDetailProps) {
  const zodiac = ZODIAC_MAP[result.zodiac];
  const elementColor = ELEMENT_COLORS[zodiac.element] ?? "#c9a84c";

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
            <h2 className="fortune-zodiac-name">{zodiac.name}</h2>
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
          运势指数
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
          运势详解
        </h3>

        {/* 综合 */}
        <FortuneTextBlock
          icon="⭐"
          title="综合运势"
          text={result.content.overall}
          color={elementColor}
        />
        {/* 爱情 */}
        <FortuneTextBlock
          icon="💕"
          title="爱情运势"
          text={result.content.love}
          color="#FF6B9D"
        />
        {/* 事业 */}
        <FortuneTextBlock
          icon="💼"
          title="事业运势"
          text={result.content.career}
          color="#4ECDC4"
        />
        {/* 财运 */}
        <FortuneTextBlock
          icon="💰"
          title="财富运势"
          text={result.content.wealth}
          color="#FFD93D"
        />
        {/* 健康 */}
        <FortuneTextBlock
          icon="🌿"
          title="健康运势"
          text={result.content.health}
          color="#82C46C"
        />
      </div>

      {/* 幸运指南 */}
      <div className="fortune-lucky-section">
        <h3 className="fortune-section-title">
          <span className="fortune-section-icon">🍀</span>
          幸运指南
        </h3>
        <div className="fortune-lucky-grid">
          <LuckyItem icon="🎨" label="幸运色" value={result.lucky.color} />
          <LuckyItem icon="🔢" label="幸运数字" value={String(result.lucky.number)} />
          <LuckyItem icon="🧭" label="幸运方位" value={result.lucky.direction} />
          <LuckyItem icon="🎁" label="幸运物品" value={result.lucky.item} />
          <LuckyItem
            icon="🤝"
            label="最佳搭档"
            value={ZODIAC_MAP[result.lucky.ally].name}
            sub={ZODIAC_MAP[result.lucky.ally].symbol}
          />
          <LuckyItem
            icon="⭐"
            label="贵人星座"
            value={ZODIAC_MAP[result.lucky.noble].name}
            sub={ZODIAC_MAP[result.lucky.noble].symbol}
          />
        </div>
      </div>

      {/* 今日建议 */}
      <div className="fortune-advice-section">
        <h3 className="fortune-section-title">
          <span className="fortune-section-icon">💡</span>
          贴心建议
        </h3>
        <div className="fortune-advice-card">
          <p className="fortune-advice-text">{result.content.advice}</p>
        </div>
      </div>

      {/* 分享按钮 */}
      <div className="fortune-share-section">
        <button className="fortune-share-btn" onClick={onShare}>
          <span className="fortune-share-icon">🖼️</span>
          生成运势海报
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
}: {
  icon: string;
  title: string;
  text: string;
  color: string;
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
          {expanded ? "收起 ▲" : "展开全文 ▼"}
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
