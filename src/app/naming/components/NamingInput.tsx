"use client";

import React, { useState } from "react";
import { POPULAR_SURNAMES } from "../naming-data";

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
}

export default function NamingInput({ onSubmit, isLoading = false }: NamingInputProps) {
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

  const hourOptions = [
    { label: "子时 23-01", value: 23 }, { label: "丑时 01-03", value: 1 },
    { label: "寅时 03-05", value: 3 }, { label: "卯时 05-07", value: 5 },
    { label: "辰时 07-09", value: 7 }, { label: "巳时 09-11", value: 9 },
    { label: "午时 11-13", value: 11 }, { label: "未时 13-15", value: 13 },
    { label: "申时 15-17", value: 15 }, { label: "酉时 17-19", value: 17 },
    { label: "戌时 19-21", value: 19 }, { label: "亥时 21-23", value: 21 },
  ];

  const handleSubmit = () => {
    setError(null);
    const trimSurname = surname.trim();
    if (!trimSurname) { setError("请输入姓氏"); return; }
    if (!/^[\u4e00-\u9fff]{1,2}$/.test(trimSurname)) { setError("请输入1-2个汉字的姓氏"); return; }
    if (!year || !month || !day) { setError("请选择完整出生日期"); return; }
    onSubmit({ surname: trimSurname, gender, year: parseInt(year), month: parseInt(month), day: parseInt(day), hour: parseInt(hour) || 8 });
  };

  return (
    <div className="naming-input-container">
      {/* 标题区 */}
      <div className="naming-hero">
        <div className="naming-hero-symbol">墨</div>
        <h1 className="naming-title">墨韵起名</h1>
        <p className="naming-subtitle">结合传统命理与诗词审美的起名神器</p>
        <div className="naming-divider-line" />
        <p className="naming-desc">
          基于生辰八字精算喜用神，结合《诗经》《楚辞》等国学经典，
          <br className="hidden sm:block" />
          为宝宝甄选兼具命理与诗意的美好名字
        </p>
      </div>

      {/* 表单 */}
      <div className="naming-form-card">
        <div className="naming-form-title">
          <span className="naming-form-num">一</span>
          填写宝宝信息
        </div>

        {/* 姓氏 */}
        <div className="naming-field">
          <label className="naming-label">宝宝姓氏</label>
          <div className="naming-surname-row">
            <input
              type="text"
              value={surname}
              onChange={e => setSurname(e.target.value)}
              placeholder="请输入姓氏，如：王"
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
          <label className="naming-label">宝宝性别</label>
          <div className="naming-gender-row">
            <button
              className={`naming-gender-btn ${gender === "male" ? "naming-gender-active naming-male" : ""}`}
              onClick={() => setGender("male")}
              disabled={isLoading}
            >
              <span className="naming-gender-icon">♂</span>
              男宝宝
            </button>
            <button
              className={`naming-gender-btn ${gender === "female" ? "naming-gender-active naming-female" : ""}`}
              onClick={() => setGender("female")}
              disabled={isLoading}
            >
              <span className="naming-gender-icon">♀</span>
              女宝宝
            </button>
          </div>
        </div>

        {/* 出生日期 */}
        <div className="naming-field">
          <label className="naming-label">出生日期（公历）</label>
          <div className="naming-date-row">
            <select
              value={year}
              onChange={e => setYear(e.target.value)}
              className="naming-select naming-select-year"
              disabled={isLoading}
            >
              <option value="">年份</option>
              {years.map(y => (
                <option key={y} value={y}>{y}年</option>
              ))}
            </select>
            <select
              value={month}
              onChange={e => setMonth(e.target.value)}
              className="naming-select naming-select-month"
              disabled={isLoading}
            >
              <option value="">月份</option>
              {months.map(m => (
                <option key={m} value={m}>{m}月</option>
              ))}
            </select>
            <select
              value={day}
              onChange={e => setDay(e.target.value)}
              className="naming-select naming-select-day"
              disabled={isLoading}
            >
              <option value="">日期</option>
              {getDays().map(d => (
                <option key={d} value={d}>{d}日</option>
              ))}
            </select>
          </div>
        </div>

        {/* 出生时辰 */}
        <div className="naming-field">
          <label className="naming-label">
            出生时辰
            <span className="naming-label-tip">（影响时柱，若不确定可选辰时）</span>
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
              推算中...
            </span>
          ) : (
            "✦ 免费测算八字与吉名 ✦"
          )}
        </button>

      </div>

      {/* 功能说明 */}
      <div className="naming-features">
        {[
          { icon: "☯", title: "正宗八字排盘", desc: "天干地支四柱排盘，精算五行旺衰" },
          { icon: "⚡", title: "喜用神分析", desc: "打破误区，专业研判命局所需五行" },
          { icon: "📖", title: "诗词经典出处", desc: "名字出自诗经、楚辞等国学经典" },
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
