"use client";

import React, { useState, useEffect } from "react";
import { getYearOptions, getMonthOptions, getDayOptions } from "../numerology-engine";
import type { NumT, Lang } from "../numerology-i18n";

interface NumerologyInputProps {
  t: NumT;
  lang: Lang;
  onCalculate: (year: number, month: number, day: number) => void;
  isLoading?: boolean;
}

export function NumerologyInput({ t, lang, onCalculate, isLoading = false }: NumerologyInputProps) {
  const [year, setYear] = useState<number>(1990);
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [dayOptions, setDayOptions] = useState(getDayOptions(1990, 1));
  const [animateBtn, setAnimateBtn] = useState(false);

  const yearOptions = getYearOptions();
  const monthOptions = getMonthOptions();

  // 当年月改变时，更新日期选项
  useEffect(() => {
    const options = getDayOptions(year, month);
    setDayOptions(options);
    // 如果当前选择的日期超过了该月最大天数，则重置
    if (day > options.length) {
      setDay(options.length);
    }
  }, [year, month, day]);

  const handleSubmit = () => {
    if (!year || !month || !day) return;
    setAnimateBtn(true);
    setTimeout(() => setAnimateBtn(false), 600);
    onCalculate(year, month, day);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) setYear(val);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) setMonth(val);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) setDay(val);
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
        <div className="num-input-icon">🔢</div>
        <h2 className="num-input-title">{t.inputTitle}</h2>
        <p className="num-input-subtitle">
          {t.inputSubtitle1}
          <br />
          {t.inputSubtitle2}
        </p>
      </div>

      {/* 日期选择器 */}
      <div className="num-date-picker">
        {/* 年份 */}
        <div className="num-date-field">
          <label className="num-date-label">{t.labelYear}</label>
          <div className="num-select-wrapper">
            <select
              className="num-select"
              value={year}
              onChange={handleYearChange}
            >
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <span className="num-select-arrow">▾</span>
          </div>
        </div>

        <span className="num-date-sep">·</span>

        {/* 月份 */}
        <div className="num-date-field">
          <label className="num-date-label">{t.labelMonth}</label>
          <div className="num-select-wrapper">
            <select
              className="num-select num-select-sm"
              value={month}
              onChange={handleMonthChange}
            >
              {monthOptions.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <span className="num-select-arrow">▾</span>
          </div>
        </div>

        <span className="num-date-sep">·</span>

        {/* 日期 */}
        <div className="num-date-field">
          <label className="num-date-label">{t.labelDay}</label>
          <div className="num-select-wrapper">
            <select
              className="num-select num-select-sm"
              value={day}
              onChange={handleDayChange}
            >
              {dayOptions.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
            <span className="num-select-arrow">▾</span>
          </div>
        </div>
      </div>

      {/* 预览 */}
      <div className="num-date-preview">
        <span className="num-date-preview-text">
          {new Date(year, month - 1, day).toLocaleDateString(
            lang === "en" ? "en-US" : lang === "tw" ? "zh-TW" : "zh-CN",
            { year: "numeric", month: "long", day: "numeric" },
          )}
        </span>
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
            <span className="num-calc-btn-icon">✨</span>
            <span>{t.calcBtn}</span>
          </>
        )}
      </button>

      {/* 说明文字 */}
      <p className="num-input-note">
        {t.inputNote}
      </p>
    </div>
  );
}
