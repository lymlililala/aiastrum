"use client";

import React, { useState, useEffect } from "react";
import { getYearOptions, getDayOptions } from "../../numerology/numerology-engine";
import type { LpT } from "../life-path-i18n";

interface LifePathInputProps {
  t: LpT;
  onCalculate: (year: number, month: number, day: number) => void;
  isLoading?: boolean;
}

export function LifePathInput({ t, onCalculate, isLoading = false }: LifePathInputProps) {
  const [year, setYear] = useState<number>(1990);
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [dayOptions, setDayOptions] = useState(getDayOptions(1990, 1));
  const [animateBtn, setAnimateBtn] = useState(false);

  const yearOptions = getYearOptions();

  // 当年月改变时，更新日期选项（溢出则收回到当月最后一天）
  useEffect(() => {
    const options = getDayOptions(year, month);
    setDayOptions(options);
    if (day > options.length) setDay(options.length);
  }, [year, month, day]);

  const handleSubmit = () => {
    if (!year || !month || !day) return;
    setAnimateBtn(true);
    setTimeout(() => setAnimateBtn(false), 600);
    onCalculate(year, month, day);
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
        <div className="num-input-icon">🧭</div>
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
              {t.monthNames.map((name, i) => (
                <option key={i + 1} value={i + 1}>{name}</option>
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
                <option key={d.value} value={d.value}>{d.value}</option>
              ))}
            </select>
            <span className="num-select-arrow">▾</span>
          </div>
        </div>
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
            <span className="num-calc-btn-icon">🔢</span>
            <span>{t.calcBtn}</span>
          </>
        )}
      </button>

      {/* 说明文字 */}
      <p className="num-input-note">{t.inputNote}</p>
    </div>
  );
}
