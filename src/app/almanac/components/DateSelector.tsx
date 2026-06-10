"use client";

import { useState } from "react";
import { SELECT_EVENTS, SHENG_XIAO, SHENGXIAO_L } from "../almanac-data";
import type { ShengXiao } from "../almanac-data";
import type { AlmanacT, Lang } from "../almanac-i18n";

interface DateSelectorProps {
  onSearch: (params: {
    event: string;
    startYear: number;
    startMonth: number;
    endYear: number;
    endMonth: number;
    userShengxiao?: ShengXiao;
    partnerShengxiao?: ShengXiao;
    weekendOnly: boolean;
  }) => void;
  isLoading: boolean;
  t: AlmanacT;
  lang: Lang;
}

const now = new Date();
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const YEARS  = [now.getFullYear(), now.getFullYear() + 1, now.getFullYear() + 2];

export default function DateSelector({ onSearch, isLoading, t, lang }: DateSelectorProps) {
  const [selectedEvent, setSelectedEvent] = useState<string>("marriage");
  const [startYear,  setStartYear]  = useState(now.getFullYear());
  const [startMonth, setStartMonth] = useState(now.getMonth() + 1);
  const [endYear,  setEndYear]   = useState(now.getFullYear());
  const [endMonth, setEndMonth]  = useState(Math.min(now.getMonth() + 3, 12));
  const [userShengxiao, setUserShengxiao]       = useState<ShengXiao | "">("");
  const [partnerShengxiao, setPartnerShengxiao] = useState<ShengXiao | "">("");
  const [weekendOnly, setWeekendOnly] = useState(false);

  const handleSearch = () => {
    onSearch({
      event: selectedEvent,
      startYear, startMonth,
      endYear, endMonth,
      userShengxiao:    userShengxiao || undefined,
      partnerShengxiao: partnerShengxiao || undefined,
      weekendOnly,
    });
  };

  return (
    <div className="al-selector">
      {/* 第一步：选择事项 */}
      <div className="al-selector-step">
        <div className="al-step-header">
          <span className="al-step-num">①</span>
          <span className="al-step-title">{t.step1Title}</span>
        </div>
        <div className="al-event-grid">
          {SELECT_EVENTS.map(ev => (
            <button key={ev.key}
              className={`al-event-btn ${selectedEvent === ev.key ? "al-event-btn-active" : ""}`}
              style={selectedEvent === ev.key ? { borderColor: ev.color, color: ev.color } as React.CSSProperties : undefined}
              onClick={() => setSelectedEvent(ev.key)}
            >
              <span className="al-event-btn-icon">{ev.icon}</span>
              <span className="al-event-btn-name">{ev.name[lang]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 第二步：时间范围 */}
      <div className="al-selector-step">
        <div className="al-step-header">
          <span className="al-step-num">②</span>
          <span className="al-step-title">{t.step2Title}</span>
        </div>
        <div className="al-time-range">
          <div className="al-time-group">
            <label className="al-time-label">{t.timeStart}</label>
            <div className="al-time-selects">
              <select value={startYear} onChange={e => setStartYear(Number(e.target.value))} className="al-select al-select-year">
                {YEARS.map(y => <option key={y} value={y}>{y}{t.yearSuffix}</option>)}
              </select>
              <select value={startMonth} onChange={e => setStartMonth(Number(e.target.value))} className="al-select">
                {MONTHS.map(m => <option key={m} value={m}>{m}{t.monthSuffix}</option>)}
              </select>
            </div>
          </div>
          <div className="al-time-dash">—</div>
          <div className="al-time-group">
            <label className="al-time-label">{t.timeEnd}</label>
            <div className="al-time-selects">
              <select value={endYear} onChange={e => setEndYear(Number(e.target.value))} className="al-select al-select-year">
                {YEARS.map(y => <option key={y} value={y}>{y}{t.yearSuffix}</option>)}
              </select>
              <select value={endMonth} onChange={e => setEndMonth(Number(e.target.value))} className="al-select">
                {MONTHS.map(m => <option key={m} value={m}>{m}{t.monthSuffix}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 第三步：生肖避冲 */}
      <div className="al-selector-step">
        <div className="al-step-header">
          <span className="al-step-num">③</span>
          <span className="al-step-title">{t.step3Title}</span>
          <span className="al-step-hint">{t.step3Hint}</span>
        </div>
        <div className="al-shengxiao-row">
          <div className="al-shengxiao-group">
            <label className="al-sx-label">{t.sxUser}</label>
            <div className="al-sx-grid">
              {SHENG_XIAO.map(sx => (
                <button key={sx}
                  className={`al-sx-btn ${userShengxiao === sx ? "al-sx-active" : ""}`}
                  onClick={() => setUserShengxiao(userShengxiao === sx ? "" : sx)}
                >
                  {SHENGXIAO_L[sx][lang]}
                </button>
              ))}
            </div>
          </div>
          <div className="al-shengxiao-group">
            <label className="al-sx-label">{t.sxPartner}</label>
            <div className="al-sx-grid">
              {SHENG_XIAO.map(sx => (
                <button key={sx}
                  className={`al-sx-btn ${partnerShengxiao === sx ? "al-sx-active" : ""}`}
                  onClick={() => setPartnerShengxiao(partnerShengxiao === sx ? "" : sx)}
                >
                  {SHENGXIAO_L[sx][lang]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 第四步：周末偏好 */}
      <div className="al-selector-step">
        <div className="al-step-header">
          <span className="al-step-num">④</span>
          <span className="al-step-title">{t.step4Title}</span>
        </div>
        <label className="al-checkbox-row" onClick={() => setWeekendOnly(p => !p)}>
          <span className={`al-checkbox ${weekendOnly ? "al-checkbox-checked" : ""}`}>
            {weekendOnly && "✓"}
          </span>
          <span className="al-checkbox-label">{t.weekendOnly}</span>
        </label>
      </div>

      {/* 搜索按钮 */}
      <button className="al-search-btn" onClick={handleSearch} disabled={isLoading}>
        {isLoading ? (
          <span className="al-btn-loading"><span className="al-spin">◎</span>{t.searchLoading}</span>
        ) : t.searchBtn}
      </button>
    </div>
  );
}
