"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  getYearOptions,
  getMonthOptions,
  getDayOptions,
  getHourOptions,
  getMinuteOptions,
} from "../rising-engine";
import { searchCities, cityLabel, countryLabel, type CityData } from "~/app/astro/astro-data";
import type { RisingT, Lang } from "../rising-i18n";

interface RisingSignInputProps {
  t: RisingT;
  lang: Lang;
  onCalculate: (birthDate: string, birthTime: string, unknownTime: boolean, city: CityData) => void;
  isLoading?: boolean;
}

export function RisingSignInput({ t, lang, onCalculate, isLoading = false }: RisingSignInputProps) {
  const [year, setYear] = useState<number>(1990);
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [hour, setHour] = useState<number>(12);
  const [minute, setMinute] = useState<number>(0);
  const [unknownTime, setUnknownTime] = useState(false);
  const [dayOptions, setDayOptions] = useState(getDayOptions(1990, 1));
  const [animateBtn, setAnimateBtn] = useState(false);

  // 城市搜索（复用 astro 页的城市库与交互）
  const [cityQuery, setCityQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [cityResults, setCityResults] = useState<CityData[]>([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [error, setError] = useState("");
  const cityInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const yearOptions = getYearOptions();
  const monthOptions = getMonthOptions();
  const hourOptions = getHourOptions();
  const minuteOptions = getMinuteOptions();

  // 当年月改变时，更新日期选项（溢出则收回到当月最后一天）
  useEffect(() => {
    const options = getDayOptions(year, month);
    setDayOptions(options);
    if (day > options.length) setDay(options.length);
  }, [year, month, day]);

  // 已选城市显示名随语言切换同步
  useEffect(() => {
    if (selectedCity) setCityQuery(cityLabel(selectedCity, lang));
  }, [lang, selectedCity]);

  // 城市搜索
  useEffect(() => {
    if (cityQuery.length > 0) {
      setCityResults(searchCities(cityQuery));
    } else {
      setCityResults([]);
    }
  }, [cityQuery]);

  // 点击外部关闭城市下拉框
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        cityInputRef.current && !cityInputRef.current.contains(e.target as Node)
      ) {
        setShowCityDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCitySelect = (city: CityData) => {
    setSelectedCity(city);
    setCityQuery(cityLabel(city, lang));
    setShowCityDropdown(false);
    setError("");
  };

  const handleSubmit = () => {
    if (!selectedCity) {
      setError(t.errCity);
      return;
    }
    setAnimateBtn(true);
    setTimeout(() => setAnimateBtn(false), 600);
    const birthDate = `${year}-${`${month}`.padStart(2, "0")}-${`${day}`.padStart(2, "0")}`;
    const birthTime = `${`${hour}`.padStart(2, "0")}:${`${minute}`.padStart(2, "0")}`;
    onCalculate(birthDate, unknownTime ? "" : birthTime, unknownTime, selectedCity);
  };

  const selectNum = (val: string) => {
    const n = parseInt(val, 10);
    return isNaN(n) ? 0 : n;
  };

  return (
    <div className="num-input-card">
      {/* 星光装饰 */}
      <div className="num-input-stars">
        {["✦", "✧", "✦", "✧", "✦"].map((s, i) => (
          <span key={i} className="num-star" style={{ animationDelay: `${i * 0.4}s` }}>
            {s}
          </span>
        ))}
      </div>

      {/* 标题 */}
      <div className="num-input-header">
        <div className="num-input-icon">🌅</div>
        <h2 className="num-input-title">{t.inputTitle}</h2>
        <p className="num-input-subtitle">
          {t.inputSubtitle1}
          <br />
          {t.inputSubtitle2}
        </p>
      </div>

      {/* 出生日期 */}
      <div className="num-date-picker">
        <div className="num-date-field">
          <label className="num-date-label">{t.labelYear}</label>
          <div className="num-select-wrapper">
            <select className="num-select" value={year} onChange={(e) => setYear(selectNum(e.target.value))}>
              {yearOptions.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <span className="num-select-arrow">▾</span>
          </div>
        </div>

        <span className="num-date-sep">·</span>

        <div className="num-date-field">
          <label className="num-date-label">{t.labelMonth}</label>
          <div className="num-select-wrapper">
            <select className="num-select num-select-sm" value={month} onChange={(e) => setMonth(selectNum(e.target.value))}>
              {monthOptions.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
            <span className="num-select-arrow">▾</span>
          </div>
        </div>

        <span className="num-date-sep">·</span>

        <div className="num-date-field">
          <label className="num-date-label">{t.labelDay}</label>
          <div className="num-select-wrapper">
            <select className="num-select num-select-sm" value={day} onChange={(e) => setDay(selectNum(e.target.value))}>
              {dayOptions.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
            <span className="num-select-arrow">▾</span>
          </div>
        </div>
      </div>

      {/* 出生时间（可勾选不知道） */}
      <div className="num-date-picker" style={{ opacity: unknownTime ? 0.4 : 1, transition: "opacity 0.2s" }}>
        <div className="num-date-field">
          <label className="num-date-label">{t.labelHour}</label>
          <div className="num-select-wrapper">
            <select
              className="num-select num-select-sm"
              value={hour}
              disabled={unknownTime}
              onChange={(e) => setHour(selectNum(e.target.value))}
            >
              {hourOptions.map((h) => (
                <option key={h.value} value={h.value}>{h.label}</option>
              ))}
            </select>
            <span className="num-select-arrow">▾</span>
          </div>
        </div>

        <span className="num-date-sep">:</span>

        <div className="num-date-field">
          <label className="num-date-label">{t.labelMinute}</label>
          <div className="num-select-wrapper">
            <select
              className="num-select num-select-sm"
              value={minute}
              disabled={unknownTime}
              onChange={(e) => setMinute(selectNum(e.target.value))}
            >
              {minuteOptions.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
            <span className="num-select-arrow">▾</span>
          </div>
        </div>
      </div>

      {/* 不知道时间开关 */}
      <button
        type="button"
        onClick={() => setUnknownTime((v) => !v)}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          margin: "4px auto 0", padding: "6px 14px", borderRadius: 20,
          background: unknownTime ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${unknownTime ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.2)"}`,
          color: unknownTime ? "#e8d5a3" : "rgba(200,175,140,0.6)",
          fontSize: "0.78rem", cursor: "pointer", transition: "all 0.18s",
        }}
      >
        <span style={{ fontSize: "0.85rem" }}>{unknownTime ? "☑" : "☐"}</span>
        {t.unknownTime}
      </button>
      {unknownTime && (
        <p style={{ fontSize: "0.72rem", color: "rgba(200,175,140,0.55)", textAlign: "center", margin: "8px 0 0", lineHeight: 1.6 }}>
          {t.unknownTimeNotice}
        </p>
      )}

      {/* 出生城市 */}
      <div style={{ marginTop: 16, position: "relative" }}>
        <label className="num-date-label" style={{ display: "block", textAlign: "center", marginBottom: 6 }}>
          {t.labelCity}
        </label>
        <div className="num-select-wrapper">
          <input
            ref={cityInputRef}
            type="text"
            value={cityQuery}
            onChange={(e) => {
              setCityQuery(e.target.value);
              setShowCityDropdown(true);
              setSelectedCity(null);
            }}
            onFocus={() => setShowCityDropdown(true)}
            placeholder={t.cityPlaceholder}
            className="num-select"
            style={{ width: "100%", textAlign: "center" }}
          />
        </div>
        {showCityDropdown && cityResults.length > 0 && (
          <div
            ref={dropdownRef}
            style={{
              position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50,
              marginTop: 4, borderRadius: 12, overflow: "hidden",
              background: "rgba(16,10,38,0.97)", border: "1px solid rgba(201,168,76,0.25)",
              boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
            }}
          >
            {cityResults.map((city) => (
              <button
                type="button"
                key={`${city.name}-${city.lat}`}
                onClick={() => handleCitySelect(city)}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  width: "100%", padding: "10px 14px", border: "none", cursor: "pointer",
                  background: "transparent", color: "#e8d5a3", fontSize: "0.82rem",
                  borderBottom: "1px solid rgba(201,168,76,0.08)",
                }}
              >
                <span>{cityLabel(city, lang)}</span>
                <span style={{ fontSize: "0.68rem", color: "rgba(200,175,140,0.5)" }}>
                  {countryLabel(city.country, lang)}
                </span>
              </button>
            ))}
          </div>
        )}
        {error && (
          <p style={{ fontSize: "0.72rem", color: "#e0705a", textAlign: "center", margin: "6px 0 0" }}>
            ⚠️ {error}
          </p>
        )}
      </div>

      {/* 计算按钮 */}
      <button
        className={`num-calc-btn ${animateBtn ? "num-calc-btn-active" : ""}`}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="num-calc-loading">
            <span className="num-loading-dot" />
            <span className="num-loading-dot" />
            <span className="num-loading-dot" />
          </span>
        ) : (
          <>
            <span className="num-calc-btn-icon">🌅</span>
            <span>{t.calcBtn}</span>
          </>
        )}
      </button>

      {/* 说明文字 */}
      <p className="num-input-note">{t.inputNote}</p>
    </div>
  );
}
