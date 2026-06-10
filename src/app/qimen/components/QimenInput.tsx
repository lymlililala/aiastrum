"use client";

import React, { useState, useCallback } from "react";
import type { QimenInput, QimenEvent } from "../qimen-engine";
import { MAJOR_CITIES } from "../qimen-data";
import type { PanType, JuType } from "../qimen-data";

type Lang = "zh" | "en" | "tw";

// ── 表单 UI 文案（三语）─────────────────────────────
const FT = {
  zh: {
    title:         "奇门遁甲 · 精准排盘",
    subtitle:      "极简排盘，精准决断",
    timeLabel:     "起局时间",
    nowBtn:        "当前时间",
    yearLabel:     "年",
    monthLabel:    "月",
    dayLabel:      "日",
    hourLabel:     "时",
    minuteLabel:   "分",
    monthUnit:     (m: number) => `${m}月`,
    dayUnit:       (d: number) => `${d}日`,
    hourUnit:      (h: string) => `${h}时`,
    minuteUnit:    (m: string) => `${m}分`,
    cityLabel:     "起局地点",
    cityHint:      "用于真太阳时校正",
    citySearch:    "搜索城市...",
    methodLabel:   "起局方式",
    panLabel:      "排盘",
    panZhuan:      "转盘",
    panFei:        "飞盘",
    juLabel:       "定局",
    juZhe:         "拆补",
    juZhi:         "置闰",
    juMao:         "茅山",
    eventLabel:    "占问事由",
    eventHint:     "影响格局提示方向",
    eventBusiness: "商业决策",
    eventTravel:   "出行办事",
    eventGeneral:  "综合",
    loading:       "排盘中...",
    submit:        "立即起局",
  },
  tw: {
    title:         "奇門遁甲 · 精準排盤",
    subtitle:      "極簡排盤，精準決斷",
    timeLabel:     "起局時間",
    nowBtn:        "當前時間",
    yearLabel:     "年",
    monthLabel:    "月",
    dayLabel:      "日",
    hourLabel:     "時",
    minuteLabel:   "分",
    monthUnit:     (m: number) => `${m}月`,
    dayUnit:       (d: number) => `${d}日`,
    hourUnit:      (h: string) => `${h}時`,
    minuteUnit:    (m: string) => `${m}分`,
    cityLabel:     "起局地點",
    cityHint:      "用於真太陽時校正",
    citySearch:    "搜尋城市...",
    methodLabel:   "起局方式",
    panLabel:      "排盤",
    panZhuan:      "轉盤",
    panFei:        "飛盤",
    juLabel:       "定局",
    juZhe:         "拆補",
    juZhi:         "置閏",
    juMao:         "茅山",
    eventLabel:    "占問事由",
    eventHint:     "影響格局提示方向",
    eventBusiness: "商業決策",
    eventTravel:   "出行辦事",
    eventGeneral:  "綜合",
    loading:       "排盤中...",
    submit:        "立即起局",
  },
  en: {
    title:         "Qi Men Dun Jia · Precise Chart",
    subtitle:      "Minimal casting, precise judgment",
    timeLabel:     "Casting Time",
    nowBtn:        "Now",
    yearLabel:     "Year",
    monthLabel:    "Month",
    dayLabel:      "Day",
    hourLabel:     "Hour",
    minuteLabel:   "Min",
    monthUnit:     (m: number) => `${m}`,
    dayUnit:       (d: number) => `${d}`,
    hourUnit:      (h: string) => `${h}:00`,
    minuteUnit:    (m: string) => `:${m}`,
    cityLabel:     "Casting Location",
    cityHint:      "Used for true solar time correction",
    citySearch:    "Search city...",
    methodLabel:   "Casting Method",
    panLabel:      "Plate",
    panZhuan:      "Rotating",
    panFei:        "Flying",
    juLabel:       "Ju",
    juZhe:         "Zhebu",
    juZhi:         "Zhirun",
    juMao:         "Maoshan",
    eventLabel:    "Question Topic",
    eventHint:     "Shapes the pattern guidance focus",
    eventBusiness: "Business",
    eventTravel:   "Travel",
    eventGeneral:  "General",
    loading:       "Casting...",
    submit:        "Cast Now",
  },
};
// ────────────────────────────────────────────────────

interface QimenInputProps {
  onSubmit: (input: QimenInput) => void;
  loading?: boolean;
  lang: Lang;
}

export function QimenInputForm({ onSubmit, loading, lang }: QimenInputProps) {
  const ft = FT[lang];
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [day, setDay] = useState(now.getDate());
  const [hour, setHour] = useState(now.getHours());
  const [minute, setMinute] = useState(Math.floor(now.getMinutes() / 5) * 5);
  const [city, setCity] = useState("北京");
  const [panType, setPanType] = useState<PanType>("zhuan");
  const [juType, setJuType] = useState<JuType>("zhe");
  const [event, setEvent] = useState<QimenEvent>("business");
  const [citySearch, setCitySearch] = useState("");
  const [showCityList, setShowCityList] = useState(false);

  const filteredCities = citySearch
    ? MAJOR_CITIES.filter(c => c.name.includes(citySearch))
    : MAJOR_CITIES;

  const handleNow = useCallback(() => {
    const n = new Date();
    setYear(n.getFullYear());
    setMonth(n.getMonth() + 1);
    setDay(n.getDate());
    setHour(n.getHours());
    setMinute(Math.floor(n.getMinutes() / 5) * 5);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ year, month, day, hour, minute, city, panType, juType, event });
  }, [year, month, day, hour, minute, city, panType, juType, event, onSubmit]);

  return (
    <form className="qm-input-form" onSubmit={handleSubmit}>
      {/* 头部标题 */}
      <div className="qm-input-header">
        <h2 className="qm-input-title">{ft.title}</h2>
        <p className="qm-input-subtitle">{ft.subtitle}</p>
      </div>

      {/* 时间输入 */}
      <div className="qm-section">
        <div className="qm-section-label">
          <span className="qm-section-icon">⏱</span>
          {ft.timeLabel}
          <button type="button" className="qm-now-btn" onClick={handleNow}>{ft.nowBtn}</button>
        </div>
        <div className="qm-time-grid">
          <div className="qm-field">
            <label className="qm-field-label">{ft.yearLabel}</label>
            <input
              className="qm-input"
              type="number"
              value={year}
              min={1900}
              max={2100}
              onChange={e => setYear(Number(e.target.value))}
            />
          </div>
          <div className="qm-field">
            <label className="qm-field-label">{ft.monthLabel}</label>
            <select className="qm-select" value={month} onChange={e => setMonth(Number(e.target.value))}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                <option key={m} value={m}>{ft.monthUnit(m)}</option>
              ))}
            </select>
          </div>
          <div className="qm-field">
            <label className="qm-field-label">{ft.dayLabel}</label>
            <select className="qm-select" value={day} onChange={e => setDay(Number(e.target.value))}>
              {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                <option key={d} value={d}>{ft.dayUnit(d)}</option>
              ))}
            </select>
          </div>
          <div className="qm-field">
            <label className="qm-field-label">{ft.hourLabel}</label>
            <select className="qm-select" value={hour} onChange={e => setHour(Number(e.target.value))}>
              {Array.from({ length: 24 }, (_, i) => i).map(h => (
                <option key={h} value={h}>{ft.hourUnit(String(h).padStart(2, "0"))}</option>
              ))}
            </select>
          </div>
          <div className="qm-field">
            <label className="qm-field-label">{ft.minuteLabel}</label>
            <select className="qm-select" value={minute} onChange={e => setMinute(Number(e.target.value))}>
              {Array.from({ length: 12 }, (_, i) => i * 5).map(m => (
                <option key={m} value={m}>{ft.minuteUnit(String(m).padStart(2, "0"))}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 地点（真太阳时校正用） */}
      <div className="qm-section">
        <div className="qm-section-label">
          <span className="qm-section-icon">📍</span>
          {ft.cityLabel}
          <span className="qm-hint-tag">{ft.cityHint}</span>
        </div>
        <div className="qm-city-wrapper">
          <input
            className="qm-input qm-city-input"
            placeholder={ft.citySearch}
            value={citySearch || city}
            onFocus={() => { setShowCityList(true); setCitySearch(""); }}
            onBlur={() => setTimeout(() => setShowCityList(false), 200)}
            onChange={e => setCitySearch(e.target.value)}
          />
          {showCityList && (
            <div className="qm-city-dropdown">
              {filteredCities.slice(0, 12).map(c => (
                <button
                  key={c.name}
                  type="button"
                  className={`qm-city-item ${city === c.name ? "active" : ""}`}
                  onMouseDown={() => {
                    setCity(c.name);
                    setCitySearch("");
                    setShowCityList(false);
                  }}
                >
                  {c.name}
                  <span className="qm-city-lng">{c.lng.toFixed(1)}°E</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 起局方式 */}
      <div className="qm-section">
        <div className="qm-section-label">
          <span className="qm-section-icon">⚙️</span>
          {ft.methodLabel}
        </div>
        <div className="qm-options-row">
          <div className="qm-option-group">
            <span className="qm-option-group-label">{ft.panLabel}</span>
            {(["zhuan", "fei"] as PanType[]).map(pt => (
              <button
                key={pt}
                type="button"
                className={`qm-option-btn ${panType === pt ? "active" : ""}`}
                onClick={() => setPanType(pt)}
              >
                {pt === "zhuan" ? ft.panZhuan : ft.panFei}
              </button>
            ))}
          </div>
          <div className="qm-option-group">
            <span className="qm-option-group-label">{ft.juLabel}</span>
            {([["zhe", ft.juZhe], ["zhi", ft.juZhi], ["mao", ft.juMao]] as [JuType, string][]).map(([jt, label]) => (
              <button
                key={jt}
                type="button"
                className={`qm-option-btn ${juType === jt ? "active" : ""}`}
                onClick={() => setJuType(jt)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 占问事由 */}
      <div className="qm-section">
        <div className="qm-section-label">
          <span className="qm-section-icon">🎯</span>
          {ft.eventLabel}
          <span className="qm-hint-tag">{ft.eventHint}</span>
        </div>
        <div className="qm-event-tabs">
          {([
            ["business", "💼", ft.eventBusiness],
            ["travel", "🚀", ft.eventTravel],
            ["general", "☯", ft.eventGeneral],
          ] as [QimenEvent, string, string][]).map(([ev, icon, label]) => (
            <button
              key={ev}
              type="button"
              className={`qm-event-tab ${event === ev ? "active" : ""}`}
              onClick={() => setEvent(ev)}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 提交按钮 */}
      <button type="submit" className="qm-submit-btn" disabled={loading}>
        {loading ? (
          <span>{ft.loading}</span>
        ) : (
          <>
            <span>{ft.submit}</span>
            <span className="qm-submit-icon">→</span>
          </>
        )}
      </button>
    </form>
  );
}
