"use client";

import { useState, useEffect, useCallback } from "react";
import DailyAlmanac from "./components/DailyAlmanac";
import HourTimeline from "./components/HourTimeline";
import DateSelector from "./components/DateSelector";
import LuckyDayList from "./components/LuckyDayList";
import type { DayInfo, LuckyDay } from "./almanac-engine";
import type { ShengXiao } from "./almanac-data";
import { SELECT_EVENTS } from "./almanac-data";

type Tab = "daily" | "select";
type SelectStep = "form" | "results";

export default function AlmanacPage() {
  const [tab, setTab] = useState<Tab>("daily");
  const [dayInfo, setDayInfo] = useState<DayInfo | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState<string | null>(null);

  // 择日状态
  const [selectStep, setSelectStep] = useState<SelectStep>("form");
  const [luckyDays, setLuckyDays]   = useState<LuckyDay[]>([]);
  const [selectLoading, setSelectLoading] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState("");

  // 获取当天黄历
  const fetchDayInfo = useCallback(async (date: Date) => {
    setLoading(true);
    setError(null);
    try {
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();
      const res = await fetch(`/api/almanac?action=day&year=${y}&month=${m}&day=${d}`);
      const json = await res.json() as { success: boolean; data: DayInfo; error?: string };
      if (!json.success) throw new Error(json.error ?? "获取失败");
      setDayInfo(json.data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDayInfo(currentDate);
  }, [currentDate, fetchDayInfo]);

  const handleDateChange = (delta: number) => {
    const nd = new Date(currentDate);
    nd.setDate(nd.getDate() + delta);
    setCurrentDate(nd);
  };

  const handleSelect = async (params: {
    event: string;
    startYear: number; startMonth: number;
    endYear: number;   endMonth: number;
    userShengxiao?: ShengXiao;
    partnerShengxiao?: ShengXiao;
    weekendOnly: boolean;
  }) => {
    setSelectLoading(true);
    setError(null);
    try {
      const ev = SELECT_EVENTS.find(e => e.key === params.event);
      setSelectedEventName(ev?.name ?? params.event);

      const res = await fetch("/api/almanac", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      const json = await res.json() as { success: boolean; data: LuckyDay[]; error?: string };
      if (!json.success) throw new Error(json.error ?? "择日失败");
      setLuckyDays(json.data);
      setSelectStep("results");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSelectLoading(false);
    }
  };

  return (
    <div className="al-page">
      {/* 返回首页 —— fixed 左上角，与全站一致 */}
      <a href="/" style={{
        position: "fixed", top: 16, left: 16, zIndex: 200,
        display: "flex", alignItems: "center", gap: 6,
        padding: "6px 14px", borderRadius: 20,
        background: "rgba(10,6,28,0.75)", backdropFilter: "blur(10px)",
        border: "1px solid rgba(201,168,76,0.25)",
        color: "rgba(201,168,76,0.85)", fontSize: "0.8rem",
        textDecoration: "none", letterSpacing: "0.06em",
        transition: "all 0.18s",
      }}>← 返回</a>

      {/* 顶部标题 */}
      <header className="al-header">
        <div className="al-header-center">
          <div className="al-header-icon">📅</div>
          <h1 className="al-header-title">老黄历</h1>
          <p className="al-header-sub">择吉日 · 看宜忌 · 知时辰</p>
        </div>
      </header>

      {/* Tab 切换 */}
      <div className="al-tabs">
        <button className={`al-tab ${tab === "daily" ? "al-tab-active" : ""}`} onClick={() => setTab("daily")}>
          <span>📋</span>今日黄历
        </button>
        <button className={`al-tab ${tab === "select" ? "al-tab-active" : ""}`} onClick={() => setTab("select")}>
          <span>✦</span>定制择日
        </button>
      </div>

      <main className="al-main">
        {tab === "daily" && (
          <div className="al-daily-tab">
            {loading ? (
              <div className="al-loading">
                <div className="al-loading-spinner">◎</div>
                <p>正在推算今日黄历…</p>
              </div>
            ) : error ? (
              <div className="al-error">
                <p>{error}</p>
                <button onClick={() => fetchDayInfo(currentDate)}>重试</button>
              </div>
            ) : dayInfo ? (
              <>
                <DailyAlmanac dayInfo={dayInfo} onDateChange={handleDateChange} />
                <HourTimeline dayInfo={dayInfo} />
              </>
            ) : null}
          </div>
        )}

        {tab === "select" && (
          <div className="al-select-tab">
            {error && selectStep === "form" && (
              <div className="al-error" style={{ marginBottom: 16 }}>
                <p>{error}</p>
                <button onClick={() => setError(null)}>关闭</button>
              </div>
            )}
            {selectStep === "form" ? (
              <DateSelector onSearch={handleSelect} isLoading={selectLoading} />
            ) : (
              <LuckyDayList
                days={luckyDays}
                eventName={selectedEventName}
                onReset={() => setSelectStep("form")}
              />
            )}
          </div>
        )}
      </main>

      {/* 底部装饰 */}
      <footer className="al-footer">
        <p className="al-footer-text">黄历数据仅供参考，请结合实际情况理性使用</p>
      </footer>
    </div>
  );
}
