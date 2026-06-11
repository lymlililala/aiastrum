"use client";

import React, { useState, useEffect, useRef } from "react";
import type { AstroInput } from "../astro-engine";
import { searchCities, cityLabel, countryLabel } from "../astro-data";
import type { CityData } from "../astro-data";
import type { AstroT, Lang } from "../astro-i18n";

interface AstroInputProps {
  onSubmit: (input: AstroInput) => void;
  isLoading: boolean;
  t: AstroT;
  lang: Lang;
}

export function AstroInputForm({ onSubmit, isLoading, t, lang }: AstroInputProps) {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [unknownTime, setUnknownTime] = useState(false);
  const [cityQuery, setCityQuery] = useState(lang === "en" ? "Beijing" : "北京");
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [cityResults, setCityResults] = useState<CityData[]>([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [error, setError] = useState("");
  const cityInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 初始化默认城市
  useEffect(() => {
    const defaultCities = searchCities("北京");
    if (defaultCities.length > 0 && defaultCities[0]) {
      setSelectedCity(defaultCities[0]);
    }
  }, []);

  // 城市搜索
  useEffect(() => {
    if (cityQuery.length > 0) {
      const results = searchCities(cityQuery);
      setCityResults(results);
    } else {
      setCityResults([]);
    }
  }, [cityQuery]);

  // 点击外部关闭下拉框
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError(t.errName);
      return;
    }
    if (!birthDate) {
      setError(t.errDate);
      return;
    }
    if (!unknownTime && !birthTime) {
      setError(t.errTime);
      return;
    }
    if (!selectedCity) {
      setError(t.errCity);
      return;
    }

    onSubmit({
      name: name.trim(),
      birthDate,
      birthTime: unknownTime ? "" : birthTime,
      unknownTime,
      city: selectedCity,
    });
  };

  return (
    <div className="astro-input-wrapper">
      {/* 顶部标题区 */}
      <div className="astro-input-header">
        <div className="astro-input-cosmos">
          {["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"].map((s, i) => (
            <span
              key={s}
              className="astro-zodiac-float"
              style={{
                animationDelay: `${i * 0.3}s`,
                left: `${(i / 12) * 100}%`,
              }}
            >
              {s}
            </span>
          ))}
        </div>
        <div className="text-6xl mb-4 animate-float">✨</div>
        <h1 className="astro-input-title">{t.inputTitle}</h1>
        <p className="astro-input-subtitle">{t.inputSubtitle}</p>
      </div>

      {/* 表单 */}
      <form onSubmit={handleSubmit} className="astro-input-form">
        {/* 姓名 */}
        <div className="astro-form-group">
          <label className="astro-form-label">
            <span className="astro-form-label-icon">✨</span>
            {t.fieldName}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
            className="astro-form-input"
            maxLength={20}
          />
        </div>

        {/* 出生日期 */}
        <div className="astro-form-group">
          <label className="astro-form-label">
            <span className="astro-form-label-icon">📅</span>
            {t.fieldDate}
          </label>
          <label className="astro-picker-card" style={{ cursor: "pointer" }}>
            <span className="astro-picker-icon">📅</span>
            <span className="astro-picker-value">
              {birthDate ? birthDate.replace(/-/g, " / ") : t.pickDate}
            </span>
            <span className="astro-picker-arrow">›</span>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              min="1900-01-01"
              max={new Date().toISOString().split("T")[0]}
              className="astro-picker-hidden-input"
            />
          </label>
        </div>

        {/* 出生时间 */}
        <div className="astro-form-group">
          <label className="astro-form-label">
            <span className="astro-form-label-icon">🕐</span>
            {t.fieldTime}
            <span className="astro-form-label-hint">{t.timeHint}</span>
          </label>
          {/* 时间选择卡片 */}
          <label
            className={`astro-picker-card ${unknownTime ? "astro-picker-card--disabled" : ""}`}
            style={{ cursor: unknownTime ? "not-allowed" : "pointer" }}
          >
            <span className="astro-picker-icon">🕐</span>
            <span className="astro-picker-value" style={{ opacity: unknownTime ? 0.35 : 1 }}>
              {birthTime || t.pickTime}
            </span>
            <span className="astro-picker-arrow">›</span>
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              disabled={unknownTime}
              className="astro-picker-hidden-input"
            />
          </label>
          {/* 不知道时间 Toggle */}
          <button
            type="button"
            onClick={() => {
              setUnknownTime(v => !v);
              if (!unknownTime) setBirthTime("");
            }}
            className={`astro-toggle-btn ${unknownTime ? "astro-toggle-btn--active" : ""}`}
          >
            <span className={`astro-toggle-dot ${unknownTime ? "astro-toggle-dot--on" : ""}`} />
            <span className="astro-toggle-label">
              {unknownTime ? t.timeSkipped : t.timeUnknown}
            </span>
          </button>
          {unknownTime && (
            <p className="astro-form-notice">
              {t.timeNotice}
            </p>
          )}
        </div>

        {/* 出生地点 */}
        <div className="astro-form-group">
          <label className="astro-form-label">
            <span className="astro-form-label-icon">📍</span>
            {t.fieldCity}
          </label>
          <div className="astro-city-wrapper">
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
              className="astro-form-input"
            />
            {showCityDropdown && cityResults.length > 0 && (
              <div ref={dropdownRef} className="astro-city-dropdown">
                {cityResults.map((city) => (
                  <button
                    type="button"
                    key={`${city.name}-${city.lat}`}
                    onClick={() => handleCitySelect(city)}
                    className="astro-city-option"
                  >
                    <span className="astro-city-name">{cityLabel(city, lang)}</span>
                    <span className="astro-city-country">{countryLabel(city.country, lang)}</span>
                    <span className="astro-city-coords">
                      {city.lat.toFixed(2)}{t.coordN}, {city.lng.toFixed(2)}{t.coordE}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {selectedCity && (
            <div className="astro-city-selected">
              <span>📍 {cityLabel(selectedCity, lang)}, {countryLabel(selectedCity.country, lang)}</span>
              <span className="astro-city-selected-coords">
                {Math.abs(selectedCity.lat).toFixed(2)}{selectedCity.lat >= 0 ? t.coordN : t.coordS},
                {Math.abs(selectedCity.lng).toFixed(2)}{selectedCity.lng >= 0 ? t.coordE : t.coordW}
              </span>
            </div>
          )}
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="astro-form-error">
            ⚠️ {error}
          </div>
        )}

        {/* 提交按钮 */}
        <button
          type="submit"
          disabled={isLoading || !selectedCity}
          className="astro-submit-btn"
        >
          {isLoading ? (
            <span className="astro-btn-loading">
              <span className="astro-loading-dots">
                <span>●</span><span>●</span><span>●</span>
              </span>
              {t.submitting}
            </span>
          ) : (
            <span>{t.submit}</span>
          )}
        </button>

        <p className="astro-form-footer">
          {t.formFooter}
        </p>
      </form>
    </div>
  );
}
