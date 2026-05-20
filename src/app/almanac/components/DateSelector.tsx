"use client";

import { useState } from "react";
import { SELECT_EVENTS, SHENG_XIAO } from "../almanac-data";
import type { ShengXiao } from "../almanac-data";

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
}

const now = new Date();
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const YEARS  = [now.getFullYear(), now.getFullYear() + 1, now.getFullYear() + 2];

export default function DateSelector({ onSearch, isLoading }: DateSelectorProps) {
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
          <span className="al-step-title">选择办理事项</span>
        </div>
        <div className="al-event-grid">
          {SELECT_EVENTS.map(ev => (
            <button key={ev.key}
              className={`al-event-btn ${selectedEvent === ev.key ? "al-event-btn-active" : ""}`}
              style={selectedEvent === ev.key ? { borderColor: ev.color, color: ev.color } as React.CSSProperties : undefined}
              onClick={() => setSelectedEvent(ev.key)}
            >
              <span className="al-event-btn-icon">{ev.icon}</span>
              <span className="al-event-btn-name">{ev.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 第二步：时间范围 */}
      <div className="al-selector-step">
        <div className="al-step-header">
          <span className="al-step-num">②</span>
          <span className="al-step-title">选择时间范围</span>
        </div>
        <div className="al-time-range">
          <div className="al-time-group">
            <label className="al-time-label">开始</label>
            <div className="al-time-selects">
              <select value={startYear} onChange={e => setStartYear(Number(e.target.value))} className="al-select al-select-year">
                {YEARS.map(y => <option key={y} value={y}>{y}年</option>)}
              </select>
              <select value={startMonth} onChange={e => setStartMonth(Number(e.target.value))} className="al-select">
                {MONTHS.map(m => <option key={m} value={m}>{m}月</option>)}
              </select>
            </div>
          </div>
          <div className="al-time-dash">—</div>
          <div className="al-time-group">
            <label className="al-time-label">结束</label>
            <div className="al-time-selects">
              <select value={endYear} onChange={e => setEndYear(Number(e.target.value))} className="al-select al-select-year">
                {YEARS.map(y => <option key={y} value={y}>{y}年</option>)}
              </select>
              <select value={endMonth} onChange={e => setEndMonth(Number(e.target.value))} className="al-select">
                {MONTHS.map(m => <option key={m} value={m}>{m}月</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 第三步：生肖避冲 */}
      <div className="al-selector-step">
        <div className="al-step-header">
          <span className="al-step-num">③</span>
          <span className="al-step-title">生肖避冲（选填）</span>
          <span className="al-step-hint">系统自动剔除与您相冲的日期</span>
        </div>
        <div className="al-shengxiao-row">
          <div className="al-shengxiao-group">
            <label className="al-sx-label">本人生肖</label>
            <div className="al-sx-grid">
              {SHENG_XIAO.map(sx => (
                <button key={sx}
                  className={`al-sx-btn ${userShengxiao === sx ? "al-sx-active" : ""}`}
                  onClick={() => setUserShengxiao(userShengxiao === sx ? "" : sx)}
                >
                  {sx}
                </button>
              ))}
            </div>
          </div>
          <div className="al-shengxiao-group">
            <label className="al-sx-label">伴侣/同行生肖</label>
            <div className="al-sx-grid">
              {SHENG_XIAO.map(sx => (
                <button key={sx}
                  className={`al-sx-btn ${partnerShengxiao === sx ? "al-sx-active" : ""}`}
                  onClick={() => setPartnerShengxiao(partnerShengxiao === sx ? "" : sx)}
                >
                  {sx}
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
          <span className="al-step-title">其他偏好</span>
        </div>
        <label className="al-checkbox-row" onClick={() => setWeekendOnly(p => !p)}>
          <span className={`al-checkbox ${weekendOnly ? "al-checkbox-checked" : ""}`}>
            {weekendOnly && "✓"}
          </span>
          <span className="al-checkbox-label">仅看周六、周日（适合上班族）</span>
        </label>
      </div>

      {/* 搜索按钮 */}
      <button className="al-search-btn" onClick={handleSearch} disabled={isLoading}>
        {isLoading ? (
          <span className="al-btn-loading"><span className="al-spin">◎</span>择日推算中…</span>
        ) : "✦ 开始择日推算"}
      </button>
    </div>
  );
}
