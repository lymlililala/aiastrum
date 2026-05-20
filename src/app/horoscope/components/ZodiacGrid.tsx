"use client";

import React from "react";
import { ZODIAC_LIST, ELEMENT_COLORS, type ZodiacId } from "../horoscope-data";

interface ZodiacGridProps {
  selected: ZodiacId | null;
  onSelect: (id: ZodiacId) => void;
}

export function ZodiacGrid({ selected, onSelect }: ZodiacGridProps) {
  return (
    <div className="zodiac-grid-wrapper">
      <h2 className="zodiac-grid-title">
        <span className="zodiac-grid-title-icon">✨</span>
        选择你的星座
      </h2>
      <p className="zodiac-grid-subtitle">探索属于你的星座运势密码</p>

      <div className="zodiac-grid">
        {ZODIAC_LIST.map((zodiac) => {
          const isSelected = selected === zodiac.id;
          const elementColor = ELEMENT_COLORS[zodiac.element] ?? "#c9a84c";

          return (
            <button
              key={zodiac.id}
              className={`zodiac-card ${isSelected ? "zodiac-card-selected" : ""}`}
              onClick={() => onSelect(zodiac.id)}
              style={{
                "--zodiac-color": elementColor,
                "--zodiac-bg": zodiac.bgColor,
              } as React.CSSProperties}
            >
              <div className="zodiac-card-symbol">{zodiac.symbol}</div>
              <div className="zodiac-card-name">{zodiac.name}</div>
              <div className="zodiac-card-date">{zodiac.dateRange}</div>
              {isSelected && (
                <div className="zodiac-card-badge">✓</div>
              )}
            </button>
          );
        })}
      </div>

      {/* 元素分组图例 */}
      <div className="zodiac-element-legend">
        {(["fire", "earth", "air", "water"] as const).map((element) => {
          const labels: Record<string, string> = {
            fire: "🔥 火象",
            earth: "🌍 土象",
            air: "💨 风象",
            water: "💧 水象",
          };
          return (
            <span
              key={element}
              className="zodiac-element-tag"
              style={{ color: ELEMENT_COLORS[element] }}
            >
              {labels[element]}
            </span>
          );
        })}
      </div>
    </div>
  );
}
