"use client";

import React, { useState } from "react";
import { POPULAR_SURNAMES } from "../naming-data";
import { type NamingT } from "../naming-i18n";

interface NamingInputProps {
  onSubmit: (data: {
    surname: string;
    gender: "male" | "female";
    year: number;
    month: number;
    day: number;
    hour: number;
  }) => void;
  isLoading?: boolean;
  t: NamingT;
}

export default function NamingInput({ onSubmit, isLoading = false, t }: NamingInputProps) {
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [hour, setHour] = useState<string>("8");
  const [error, setError] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2020 + 2 }, (_, i) => 2020 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const getDays = () => {
    const m = parseInt(month);
    const y = parseInt(year);
    if (!m || !y) return Array.from({ length: 31 }, (_, i) => i + 1);
    const days = new Date(y, m, 0).getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
  };

  const hourValues = [23, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21];
  const hourOptions = hourValues.map((value, i) => ({ label: t.shichen[i] ?? "", value }));

  const handleSubmit = () => {
    setError(null);
    const trimSurname = surname.trim();
    if (!trimSurname) { setError(t.errSurnameEmpty); return; }
    if (!/^[\u4e00-\u9fff]{1,2}$/.test(trimSurname)) { setError(t.errSurnameFmt); return; }
    if (!year || !month || !day) { setError(t.errDate); return; }
    onSubmit({ surname: trimSurname, gender, year: parseInt(year), month: parseInt(month), day: parseInt(day), hour: parseInt(hour) || 8 });
  };

  return (
    <div className="naming-input-container">
      {/* 标题区 */}
      <div className="naming-hero">
        <div className="naming-hero-symbol">墨</div>
        <h1 className="naming-title">{t.heroTitle}</h1>
        <p className="naming-subtitle">{t.heroSubtitle}</p>
        <div className="naming-divider-line" />
        <p className="naming-desc">
          {t.heroDescL1}
          <br className="hidden sm:block" />
          {t.heroDescL2}
        </p>
      </div>

      {/* 表单 */}
      <div className="naming-form-card">
        <div className="naming-form-title">
          <span className="naming-form-num">{t.formNum}</span>
          {t.formTitle}
        </div>

        {/* 姓氏 */}
        <div className="naming-field">
          <label className="naming-label">{t.labelSurname}</label>
          <div className="naming-surname-row">
            <input
              type="text"
              value={surname}
              onChange={e => setSurname(e.target.value)}
              placeholder={t.surnamePlaceholder}
              className="naming-input"
              maxLength={2}
              disabled={isLoading}
            />
          </div>
          {/* 热门姓氏快选 */}
          <div className="naming-surname-tags">
            {POPULAR_SURNAMES.slice(0, 16).map(s => (
              <button
                key={s}
                className={`naming-surname-tag ${surname === s ? "naming-tag-active" : ""}`}
                onClick={() => setSurname(s)}
                disabled={isLoading}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* 性别 */}
        <div className="naming-field">
          <label className="naming-label">{t.labelGender}</label>
          <div className="naming-gender-row">
            <button
              className={`naming-gender-btn ${gender === "male" ? "naming-gender-active naming-male" : ""}`}
              onClick={() => setGender("male")}
              disabled={isLoading}
            >
              <span className="naming-gender-icon">♂</span>
              {t.genderMale}
            </button>
            <button
              className={`naming-gender-btn ${gender === "female" ? "naming-gender-active naming-female" : ""}`}
              onClick={() => setGender("female")}
              disabled={isLoading}
            >
              <span className="naming-gender-icon">♀</span>
              {t.genderFemale}
            </button>
          </div>
        </div>

        {/* 出生日期 */}
        <div className="naming-field">
          <label className="naming-label">{t.labelBirth}</label>
          <div className="naming-date-row">
            <select
              value={year}
              onChange={e => setYear(e.target.value)}
              className="naming-select naming-select-year"
              disabled={isLoading}
            >
              <option value="">{t.optYear}</option>
              {years.map(y => (
                <option key={y} value={y}>{y}{t.yearSuffix}</option>
              ))}
            </select>
            <select
              value={month}
              onChange={e => setMonth(e.target.value)}
              className="naming-select naming-select-month"
              disabled={isLoading}
            >
              <option value="">{t.optMonth}</option>
              {months.map(m => (
                <option key={m} value={m}>{m}{t.monthSuffix}</option>
              ))}
            </select>
            <select
              value={day}
              onChange={e => setDay(e.target.value)}
              className="naming-select naming-select-day"
              disabled={isLoading}
            >
              <option value="">{t.optDay}</option>
              {getDays().map(d => (
                <option key={d} value={d}>{d}{t.daySuffix}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 出生时辰 */}
        <div className="naming-field">
          <label className="naming-label">
            {t.labelHour}
            <span className="naming-label-tip">{t.hourTip}</span>
          </label>
          <div className="naming-shichen-grid">
            {hourOptions.map(opt => (
              <button
                key={opt.value}
                className={`naming-shichen-btn ${parseInt(hour) === opt.value ? "naming-shichen-active" : ""}`}
                onClick={() => setHour(String(opt.value))}
                disabled={isLoading}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="naming-error">{error}</div>
        )}

        {/* 提交按钮 */}
        <button
          className="naming-submit-btn"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="naming-btn-loading">
              <span className="naming-loading-dot" />
              <span className="naming-loading-dot" />
              <span className="naming-loading-dot" />
              {t.submitLoading}
            </span>
          ) : (
            t.submitBtn
          )}
        </button>

      </div>

      {/* 功能说明 */}
      <div className="naming-features">
        {[
          { icon: "☯", title: t.feat1Title, desc: t.feat1Desc },
          { icon: "⚡", title: t.feat2Title, desc: t.feat2Desc },
          { icon: "📖", title: t.feat3Title, desc: t.feat3Desc },
        ].map(f => (
          <div key={f.title} className="naming-feature-card">
            <div className="naming-feature-icon">{f.icon}</div>
            <div className="naming-feature-title">{f.title}</div>
            <div className="naming-feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
