"use client";

import { useState } from "react";
import type { DayInfo, HourInfo } from "../almanac-engine";
import type { AlmanacT, Lang } from "../almanac-i18n";
import { SHENGXIAO_L } from "../almanac-data";

interface HourTimelineProps {
  dayInfo: DayInfo;
  t: AlmanacT;
  lang: Lang;
}

export default function HourTimeline({ dayInfo, t, lang }: HourTimelineProps) {
  const [selectedHour, setSelectedHour] = useState<HourInfo | null>(null);

  const luckLabel: Record<string, string> = { 吉: t.luckJi, 凶: t.luckXiong, 平: t.luckPing };

  // 获取当前时辰
  const now = new Date();
  const isToday = (
    dayInfo.solar.year === now.getFullYear() &&
    dayInfo.solar.month === now.getMonth() + 1 &&
    dayInfo.solar.day === now.getDate()
  );
  const currentHour = now.getHours();
  const getCurrentPeriodIdx = (): number => {
    for (let i = 0; i < dayInfo.hours.length; i++) {
      const p = dayInfo.hours[i]!.period;
      const s = p.startHour; const e = p.endHour;
      if (s > e) { // 跨午夜（子时）
        if (currentHour >= s || currentHour < e) return i;
      } else {
        if (currentHour >= s && currentHour < e) return i;
      }
    }
    return 0;
  };
  const currentPeriodIdx = isToday ? getCurrentPeriodIdx() : -1;

  return (
    <div className="al-timeline">
      <div className="al-timeline-title">
        <span className="al-section-icon">◷</span>
        {t.hourTitle}
        <span className="al-timeline-hint">{t.hourHint}</span>
      </div>

      {/* 时辰轴 */}
      <div className="al-hour-grid">
        {dayInfo.hours.map((h, i) => {
          const isCurrent = i === currentPeriodIdx;
          const bgMap = { 吉: "#FFF5F5", 凶: "#F5F5F5", 平: "#FAFAFA" };
          const borderMap = { 吉: "#E74C3C", 凶: "#BDC3C7", 平: "#D5C9B0" };

          return (
            <button key={h.period.name}
              className={`al-hour-cell ${selectedHour?.period.name === h.period.name ? "al-hour-selected" : ""} ${isCurrent ? "al-hour-current" : ""}`}
              style={{
                borderColor: selectedHour?.period.name === h.period.name ? borderMap[h.luck] : undefined,
              } as React.CSSProperties}
              onClick={() => setSelectedHour(selectedHour?.period.name === h.period.name ? null : h)}
            >
              <div className="al-hour-name">{h.period.name}</div>
              <div className="al-hour-range">
                {String(h.period.startHour).padStart(2, "0")}:00
              </div>
              <div className={`al-hour-luck al-luck-${h.luck}`}>{luckLabel[h.luck]}</div>
              {isCurrent && <div className="al-hour-now-dot" />}
            </button>
          );
        })}
      </div>

      {/* 时辰详情 */}
      {selectedHour && (
        <div className={`al-hour-detail al-detail-${selectedHour.luck}`}>
          <div className="al-hour-detail-header">
            <span className="al-hour-detail-name">{selectedHour.period.name}</span>
            <span className="al-hour-detail-animal">({SHENGXIAO_L[selectedHour.period.animal]?.[lang] ?? selectedHour.period.animal})</span>
            <span className={`al-hour-detail-luck al-luck-${selectedHour.luck}`}>
              {luckLabel[selectedHour.luck]}
            </span>
          </div>
          <p className="al-hour-detail-desc">{selectedHour.desc}</p>
          <div className="al-hour-detail-time">
            {String(selectedHour.period.startHour).padStart(2,"0")}:00 — {String(selectedHour.period.endHour).padStart(2,"0")}:00
          </div>
        </div>
      )}

      {/* 图例 */}
      <div className="al-hour-legend">
        {[
          { luck: "吉", label: t.luckJi, color: "#E74C3C" },
          { luck: "平", label: t.luckPing, color: "#D5C9B0" },
          { luck: "凶", label: t.luckXiong, color: "#BDC3C7" },
        ].map(l => (
          <div key={l.luck} className="al-legend-item">
            <span className="al-legend-dot" style={{ background: l.color } as React.CSSProperties} />
            <span className="al-legend-label">{l.label}</span>
          </div>
        ))}
        {isToday && (
          <div className="al-legend-item">
            <span className="al-legend-now" />
            <span className="al-legend-label">{t.legendNow}</span>
          </div>
        )}
      </div>
    </div>
  );
}
