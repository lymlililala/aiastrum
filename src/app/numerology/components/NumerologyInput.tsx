"use client";

import React, { useState, useEffect } from "react";
import { getYearOptions, getMonthOptions, getDayOptions } from "../numerology-engine";

interface NumerologyInputProps {
  onCalculate: (year: number, month: number, day: number) => void;
  isLoading?: boolean;
}

export function NumerologyInput({ onCalculate, isLoading = false }: NumerologyInputProps) {
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
        <h2 className="num-input-title">输入你的出生日期</h2>
        <p className="num-input-subtitle">
          生命灵数通过你的生日数字计算而来，
          <br />
          揭示你灵魂选择降生的密码
        </p>
      </div>

      {/* 日期选择器 */}
      <div className="num-date-picker">
        {/* 年份 */}
        <div className="num-date-field">
          <label className="num-date-label">年</label>
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
          <label className="num-date-label">月</label>
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
          <label className="num-date-label">日</label>
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
          {year}年{month.toString().padStart(2, "0")}月{day.toString().padStart(2, "0")}日
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
            <span>揭示我的生命灵数</span>
          </>
        )}
      </button>

      {/* 说明文字 */}
      <p className="num-input-note">
        * 生命灵数基于皮格塔斯数字命理学体系 · 仅供探索与娱乐
      </p>
    </div>
  );
}
