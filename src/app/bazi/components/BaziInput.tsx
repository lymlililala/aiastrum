"use client";

import React, { useState } from "react";
import type { BaziInput } from "../bazi-engine";

type Lang = "zh" | "en" | "tw";

// ── 表单 UI 文案（三语）─────────────────────────────
const FT = {
  zh: {
    solar:        "公历",
    lunar:        "农历",
    lunarTip:     "🌙 农历换算提示：MVP 阶段暂以公历处理，农历功能将在后续版本上线。请将农历日期换算成公历后填写，或直接使用公历。",
    birthDate:    "出生日期",
    yearUnit:     (y: number) => `${y}年`,
    monthUnit:    (m: number) => `${m}月`,
    dayUnit:      (d: number) => `${d}日`,
    birthHour:    "出生时辰",
    unknownHour:  "未知时辰",
    unknownDesc:  "（影响时柱准确度）",
    hourNote:     "※ 不知道出生时辰也可进行分析，但时柱解读将受影响",
    gender:       "性别",
    male:         "男",
    maleSub:      "乾卦 · 阳刚之气",
    female:       "女",
    femaleSub:    "坤卦 · 阴柔之德",
    submit:       "✦ 开始测算",
    disclaimer:   "✦ 仅供娱乐参考，不作为人生决策依据 ✦",
  },
  tw: {
    solar:        "國曆",
    lunar:        "農曆",
    lunarTip:     "🌙 農曆換算提示：MVP 階段暫以國曆處理，農曆功能將在後續版本上線。請將農曆日期換算成國曆後填寫，或直接使用國曆。",
    birthDate:    "出生日期",
    yearUnit:     (y: number) => `${y}年`,
    monthUnit:    (m: number) => `${m}月`,
    dayUnit:      (d: number) => `${d}日`,
    birthHour:    "出生時辰",
    unknownHour:  "未知時辰",
    unknownDesc:  "（影響時柱準確度）",
    hourNote:     "※ 不知道出生時辰也可進行分析，但時柱解讀將受影響",
    gender:       "性別",
    male:         "男",
    maleSub:      "乾卦 · 陽剛之氣",
    female:       "女",
    femaleSub:    "坤卦 · 陰柔之德",
    submit:       "✦ 開始測算",
    disclaimer:   "✦ 僅供娛樂參考，不作為人生決策依據 ✦",
  },
  en: {
    solar:        "Solar",
    lunar:        "Lunar",
    lunarTip:     "🌙 Lunar conversion note: during the MVP, dates are handled as solar. Lunar support is coming in a later version. Please convert your lunar date to solar before entering, or just use the solar calendar.",
    birthDate:    "Birth date",
    yearUnit:     (y: number) => `${y}`,
    monthUnit:    (m: number) => `${m}`,
    dayUnit:      (d: number) => `${d}`,
    birthHour:    "Birth hour",
    unknownHour:  "Unknown hour",
    unknownDesc:  "(affects Hour Pillar accuracy)",
    hourNote:     "※ You can still get a reading without your birth hour, but the Hour Pillar interpretation will be affected",
    gender:       "Gender",
    male:         "Male",
    maleSub:      "Qian · Yang energy",
    female:       "Female",
    femaleSub:    "Kun · Yin energy",
    submit:       "✦ Start Reading",
    disclaimer:   "✦ For entertainment only, not a basis for life decisions ✦",
  },
};
// ────────────────────────────────────────────────────

interface BaziInputProps {
  onSubmit: (input: BaziInput) => void;
  lang: Lang;
}

// 时辰名（天干地支术语，不翻译）；未知时辰为 UI 选项，文案随语言变化
const HOUR_DEFS: Array<{ value: number; label: string | null; desc: string }> = [
  { value: -1, label: null, desc: "" },
  { value: 23, label: "子时", desc: "23:00–01:00" },
  { value: 1, label: "丑时", desc: "01:00–03:00" },
  { value: 3, label: "寅时", desc: "03:00–05:00" },
  { value: 5, label: "卯时", desc: "05:00–07:00" },
  { value: 7, label: "辰时", desc: "07:00–09:00" },
  { value: 9, label: "巳时", desc: "09:00–11:00" },
  { value: 11, label: "午时", desc: "11:00–13:00" },
  { value: 13, label: "未时", desc: "13:00–15:00" },
  { value: 15, label: "申时", desc: "15:00–17:00" },
  { value: 17, label: "酉时", desc: "17:00–19:00" },
  { value: 19, label: "戌时", desc: "19:00–21:00" },
  { value: 21, label: "亥时", desc: "21:00–23:00" },
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => currentYear - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function BaziInputForm({ onSubmit, lang }: BaziInputProps) {
  const t = FT[lang];
  const [year, setYear] = useState<number>(1990);
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [hour, setHour] = useState<number>(-1);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [calendarType, setCalendarType] = useState<"solar" | "lunar">("solar");
  const [showHourPicker, setShowHourPicker] = useState(false);

  // 时辰选项：未知时辰的文案随语言变化，其余为固定术语
  const HOURS = HOUR_DEFS.map((h) =>
    h.value === -1
      ? { value: h.value, label: t.unknownHour, desc: t.unknownDesc }
      : { value: h.value, label: h.label as string, desc: h.desc }
  );

  const maxDays = getDaysInMonth(year, month);
  const days = Array.from({ length: maxDays }, (_, i) => i + 1);

  // 确保 day 不超过当月最大天数
  const safeDay = Math.min(day, maxDays);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ year, month, day: safeDay, hour, gender });
  };

  const selectedHour = HOURS.find((h) => h.value === hour) ?? HOURS[0]!;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      {/* 公历/农历切换 */}
      <div className="flex justify-center mb-8">
        <div className="bazi-toggle-group">
          <button
            type="button"
            onClick={() => setCalendarType("solar")}
            className={`bazi-toggle-btn ${calendarType === "solar" ? "active" : ""}`}
          >
            {t.solar}
          </button>
          <button
            type="button"
            onClick={() => setCalendarType("lunar")}
            className={`bazi-toggle-btn ${calendarType === "lunar" ? "active" : ""}`}
          >
            {t.lunar}
          </button>
        </div>
      </div>

      {calendarType === "lunar" && (
        <div className="text-center mb-6 px-4 py-3 rounded-xl bazi-tip-box">
          <p className="text-sm" style={{ color: "var(--vermillion-light)" }}>
            {t.lunarTip}
          </p>
        </div>
      )}

      {/* 出生年月日 */}
      <div className="mb-6">
        <label className="bazi-label">{t.birthDate}</label>
        <div className="grid grid-cols-3 gap-3">
          {/* 年 */}
          <div className="relative">
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="bazi-select w-full"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>{t.yearUnit(y)}</option>
              ))}
            </select>
          </div>
          {/* 月 */}
          <div className="relative">
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="bazi-select w-full"
            >
              {MONTHS.map((m) => (
                <option key={m} value={m}>{t.monthUnit(m)}</option>
              ))}
            </select>
          </div>
          {/* 日 */}
          <div className="relative">
            <select
              value={safeDay}
              onChange={(e) => setDay(Number(e.target.value))}
              className="bazi-select w-full"
            >
              {days.map((d) => (
                <option key={d} value={d}>{t.dayUnit(d)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 出生时辰 */}
      <div className="mb-6">
        <label className="bazi-label">{t.birthHour}</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowHourPicker(!showHourPicker)}
            className="bazi-select w-full text-left flex items-center justify-between"
          >
            <span>
              <span style={{ color: "var(--vermillion)" }} className="font-medium mr-2">
                {selectedHour.label}
              </span>
              <span style={{ color: "rgba(200,180,150,0.6)" }} className="text-sm">
                {selectedHour.desc}
              </span>
            </span>
            <span style={{ color: "rgba(200,180,150,0.5)" }}>
              {showHourPicker ? "▲" : "▼"}
            </span>
          </button>

          {showHourPicker && (
            <div
              className="absolute z-20 w-full rounded-xl overflow-hidden shadow-2xl mt-1"
              style={{
                background: "rgba(20, 10, 5, 0.98)",
                border: "1px solid rgba(180, 100, 60, 0.3)",
                backdropFilter: "blur(12px)",
              }}
            >
              {HOURS.map((h) => (
                <button
                  key={h.value}
                  type="button"
                  onClick={() => {
                    setHour(h.value);
                    setShowHourPicker(false);
                  }}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
                  style={{
                    borderBottom: "1px solid rgba(180, 100, 60, 0.1)",
                    background: h.value === hour ? "rgba(180, 60, 30, 0.15)" : "transparent",
                  }}
                >
                  <span
                    className="font-medium"
                    style={{ color: h.value === hour ? "var(--vermillion)" : "var(--ink-light)" }}
                  >
                    {h.label}
                  </span>
                  <span className="text-sm" style={{ color: "rgba(200,180,150,0.5)" }}>
                    {h.desc}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
        {hour === -1 && (
          <p className="mt-2 text-xs" style={{ color: "rgba(200,180,150,0.5)" }}>
            {t.hourNote}
          </p>
        )}
      </div>

      {/* 性别选择 */}
      <div className="mb-8">
        <label className="bazi-label">{t.gender}</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setGender("male")}
            className={`bazi-gender-btn ${gender === "male" ? "active" : ""}`}
          >
            <span className="text-2xl mb-1">☰</span>
            <span>{t.male}</span>
            <span className="text-xs opacity-60 mt-0.5">{t.maleSub}</span>
          </button>
          <button
            type="button"
            onClick={() => setGender("female")}
            className={`bazi-gender-btn ${gender === "female" ? "active" : ""}`}
          >
            <span className="text-2xl mb-1">☷</span>
            <span>{t.female}</span>
            <span className="text-xs opacity-60 mt-0.5">{t.femaleSub}</span>
          </button>
        </div>
      </div>

      {/* 提交按钮 */}
      <button
        type="submit"
        className="w-full btn-vermillion py-4 rounded-2xl text-lg font-medium tracking-widest"
      >
        {t.submit}
      </button>

      <p className="text-center mt-4 text-xs" style={{ color: "rgba(200,180,150,0.4)" }}>
        {t.disclaimer}
      </p>
    </form>
  );
}
