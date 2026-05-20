"use client";

import React, { useState, useEffect, useRef } from "react";
import type { AstroInput } from "../astro-engine";
import { searchCities } from "../astro-data";
import type { CityData } from "../astro-data";

interface AstroInputProps {
  onSubmit: (input: AstroInput) => void;
  isLoading: boolean;
}

export function AstroInputForm({ onSubmit, isLoading }: AstroInputProps) {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [unknownTime, setUnknownTime] = useState(false);
  const [cityQuery, setCityQuery] = useState("北京");
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
    setCityQuery(city.name);
    setShowCityDropdown(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("请输入你的姓名或昵称");
      return;
    }
    if (!birthDate) {
      setError("请选择出生日期");
      return;
    }
    if (!unknownTime && !birthTime) {
      setError("请输入出生时间，或勾选「不知道出生时间」");
      return;
    }
    if (!selectedCity) {
      setError("请选择出生城市");
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
        <h1 className="astro-input-title">遇见宇宙中的自己</h1>
        <p className="astro-input-subtitle">获取你的专属本命星盘</p>
      </div>

      {/* 表单 */}
      <form onSubmit={handleSubmit} className="astro-input-form">
        {/* 姓名 */}
        <div className="astro-form-group">
          <label className="astro-form-label">
            <span className="astro-form-label-icon">✨</span>
            你的名字
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="输入你的姓名或昵称"
            className="astro-form-input"
            maxLength={20}
          />
        </div>

        {/* 出生日期 */}
        <div className="astro-form-group">
          <label className="astro-form-label">
            <span className="astro-form-label-icon">📅</span>
            出生日期
          </label>
          <label className="astro-picker-card" style={{ cursor: "pointer" }}>
            <span className="astro-picker-icon">📅</span>
            <span className="astro-picker-value">
              {birthDate ? birthDate.replace(/-/g, " / ") : "点击选择日期"}
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
            出生时间
            <span className="astro-form-label-hint">（精确时间可计算上升星座）</span>
          </label>
          {/* 时间选择卡片 */}
          <label
            className={`astro-picker-card ${unknownTime ? "astro-picker-card--disabled" : ""}`}
            style={{ cursor: unknownTime ? "not-allowed" : "pointer" }}
          >
            <span className="astro-picker-icon">🕐</span>
            <span className="astro-picker-value" style={{ opacity: unknownTime ? 0.35 : 1 }}>
              {birthTime || "点击选择时间"}
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
              {unknownTime ? "已跳过时间（仅显示行星位置）" : "不知道出生时间"}
            </span>
          </button>
          {unknownTime && (
            <p className="astro-form-notice">
              ⚠️ 不知道出生时间将无法计算上升星座与宫位，星盘仅显示行星位置与相位
            </p>
          )}
        </div>

        {/* 出生地点 */}
        <div className="astro-form-group">
          <label className="astro-form-label">
            <span className="astro-form-label-icon">📍</span>
            出生地点
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
              placeholder="搜索城市（如：上海、北京）"
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
                    <span className="astro-city-name">{city.name}</span>
                    <span className="astro-city-country">{city.country}</span>
                    <span className="astro-city-coords">
                      {city.lat.toFixed(2)}°N, {city.lng.toFixed(2)}°E
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {selectedCity && (
            <div className="astro-city-selected">
              <span>📍 {selectedCity.name}, {selectedCity.country}</span>
              <span className="astro-city-selected-coords">
                {Math.abs(selectedCity.lat).toFixed(2)}{selectedCity.lat >= 0 ? "°N" : "°S"},
                {Math.abs(selectedCity.lng).toFixed(2)}{selectedCity.lng >= 0 ? "°E" : "°W"}
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
              正在解析星空...
            </span>
          ) : (
            <span>✨ 解读我的星盘</span>
          )}
        </button>

        <p className="astro-form-footer">
          星盘在你出生的瞬间定格，此刻为你揭示
        </p>
      </form>
    </div>
  );
}
