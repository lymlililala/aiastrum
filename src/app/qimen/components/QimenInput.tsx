"use client";

import React, { useState, useCallback } from "react";
import type { QimenInput, QimenEvent } from "../qimen-engine";
import { MAJOR_CITIES } from "../qimen-data";
import type { PanType, JuType } from "../qimen-data";

interface QimenInputProps {
  onSubmit: (input: QimenInput) => void;
  loading?: boolean;
}

export function QimenInputForm({ onSubmit, loading }: QimenInputProps) {
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
        <h2 className="qm-input-title">奇门遁甲 · 精准排盘</h2>
        <p className="qm-input-subtitle">极简排盘，精准决断</p>
      </div>

      {/* 时间输入 */}
      <div className="qm-section">
        <div className="qm-section-label">
          <span className="qm-section-icon">⏱</span>
          起局时间
          <button type="button" className="qm-now-btn" onClick={handleNow}>当前时间</button>
        </div>
        <div className="qm-time-grid">
          <div className="qm-field">
            <label className="qm-field-label">年</label>
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
            <label className="qm-field-label">月</label>
            <select className="qm-select" value={month} onChange={e => setMonth(Number(e.target.value))}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                <option key={m} value={m}>{m}月</option>
              ))}
            </select>
          </div>
          <div className="qm-field">
            <label className="qm-field-label">日</label>
            <select className="qm-select" value={day} onChange={e => setDay(Number(e.target.value))}>
              {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                <option key={d} value={d}>{d}日</option>
              ))}
            </select>
          </div>
          <div className="qm-field">
            <label className="qm-field-label">时</label>
            <select className="qm-select" value={hour} onChange={e => setHour(Number(e.target.value))}>
              {Array.from({ length: 24 }, (_, i) => i).map(h => (
                <option key={h} value={h}>{String(h).padStart(2, "0")}时</option>
              ))}
            </select>
          </div>
          <div className="qm-field">
            <label className="qm-field-label">分</label>
            <select className="qm-select" value={minute} onChange={e => setMinute(Number(e.target.value))}>
              {Array.from({ length: 12 }, (_, i) => i * 5).map(m => (
                <option key={m} value={m}>{String(m).padStart(2, "0")}分</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 地点（真太阳时校正用） */}
      <div className="qm-section">
        <div className="qm-section-label">
          <span className="qm-section-icon">📍</span>
          起局地点
          <span className="qm-hint-tag">用于真太阳时校正</span>
        </div>
        <div className="qm-city-wrapper">
          <input
            className="qm-input qm-city-input"
            placeholder="搜索城市..."
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
          起局方式
        </div>
        <div className="qm-options-row">
          <div className="qm-option-group">
            <span className="qm-option-group-label">排盘</span>
            {(["zhuan", "fei"] as PanType[]).map(t => (
              <button
                key={t}
                type="button"
                className={`qm-option-btn ${panType === t ? "active" : ""}`}
                onClick={() => setPanType(t)}
              >
                {t === "zhuan" ? "转盘" : "飞盘"}
              </button>
            ))}
          </div>
          <div className="qm-option-group">
            <span className="qm-option-group-label">定局</span>
            {([["zhe", "拆补"], ["zhi", "置闰"], ["mao", "茅山"]] as [JuType, string][]).map(([t, label]) => (
              <button
                key={t}
                type="button"
                className={`qm-option-btn ${juType === t ? "active" : ""}`}
                onClick={() => setJuType(t)}
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
          占问事由
          <span className="qm-hint-tag">影响格局提示方向</span>
        </div>
        <div className="qm-event-tabs">
          {([
            ["business", "💼", "商业决策"],
            ["travel", "🚀", "出行办事"],
            ["general", "☯", "综合"],
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
          <span>排盘中...</span>
        ) : (
          <>
            <span>立即起局</span>
            <span className="qm-submit-icon">→</span>
          </>
        )}
      </button>
    </form>
  );
}
