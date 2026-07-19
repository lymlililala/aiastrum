"use client";

import { useState, useEffect, useCallback } from "react";
import DailyAlmanac from "./components/DailyAlmanac";
import HourTimeline from "./components/HourTimeline";
import DateSelector from "./components/DateSelector";
import LuckyDayList from "./components/LuckyDayList";
import type { DayInfo, LuckyDay } from "./almanac-engine";
import type { ShengXiao } from "./almanac-data";
import { SELECT_EVENTS } from "./almanac-data";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";
import { T, type Lang } from "./almanac-i18n";

type Tab = "daily" | "select";
type SelectStep = "form" | "results";

export default function AlmanacPage() {
  const lang = useLocale() as Lang;
  const t = T[lang];

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
      const res = await fetch(`/api/almanac?action=day&year=${y}&month=${m}&day=${d}&lang=${lang}`);
      const json = await res.json() as { success: boolean; data: DayInfo; error?: string };
      if (!json.success) throw new Error(json.error ?? t.fetchFailed);
      setDayInfo(json.data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [t, lang]);

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
      setSelectedEventName(ev?.name[lang] ?? params.event);

      const res = await fetch("/api/almanac", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...params, lang }),
      });
      const json = await res.json() as { success: boolean; data: LuckyDay[]; error?: string };
      if (!json.success) throw new Error(json.error ?? t.selectFailed);
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
      }}>{t.back}</a>

      {/* 语言切换 —— fixed 右上角 */}
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 200 }}>
        <LangSwitcher />
      </div>

      {/* 顶部标题 */}
      <header className="al-header">
        <div className="al-header-center">
          <div className="al-header-icon">📅</div>
          <h1 className="al-header-title">{t.title}</h1>
          <p className="al-header-sub">{t.subtitle}</p>
        </div>
      </header>

      {/* Tab 切换 */}
      <div className="al-tabs">
        <button className={`al-tab ${tab === "daily" ? "al-tab-active" : ""}`} onClick={() => setTab("daily")}>
          <span>📋</span>{t.tabDaily}
        </button>
        <button className={`al-tab ${tab === "select" ? "al-tab-active" : ""}`} onClick={() => setTab("select")}>
          <span>✦</span>{t.tabSelect}
        </button>
      </div>

      {/* ── 新手引导：怎么查黄历（SSR 输出，首次进入也能看懂流程） ── */}
      <div style={{
        margin: "4px auto 0", maxWidth: 720, width: "calc(100% - 32px)",
        background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.22)",
        borderRadius: 14, padding: "18px 20px", textAlign: "left", boxSizing: "border-box",
      }}>
        <div style={{
          fontFamily: "var(--font-cinzel), serif", fontSize: "0.95rem",
          color: "#e8d5a3", letterSpacing: "0.06em", marginBottom: 12,
        }}>{t.howToTitle}</div>
        <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {t.howToSteps.map((s, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{
                flexShrink: 0, width: 22, height: 22, borderRadius: "50%",
                border: "1px solid rgba(201,168,76,0.55)", color: "#c9a84c",
                fontSize: "0.72rem", display: "inline-flex", alignItems: "center", justifyContent: "center",
                marginTop: 1,
              }}>{i + 1}</span>
              <span style={{ fontSize: "0.85rem", color: "rgba(220,205,175,0.8)", lineHeight: 1.7 }}>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <main className="al-main">
        {tab === "daily" && (
          <div className="al-daily-tab">
            {loading ? (
              <div className="al-loading">
                <div className="al-loading-spinner">◎</div>
                <p>{t.dailyLoading}</p>
              </div>
            ) : error ? (
              <div className="al-error">
                <p>{error}</p>
                <button onClick={() => fetchDayInfo(currentDate)}>{t.retry}</button>
              </div>
            ) : dayInfo ? (
              <>
                <DailyAlmanac dayInfo={dayInfo} onDateChange={handleDateChange} t={t} lang={lang} />
                <HourTimeline dayInfo={dayInfo} t={t} lang={lang} />
              </>
            ) : null}
          </div>
        )}

        {tab === "select" && (
          <div className="al-select-tab">
            {error && selectStep === "form" && (
              <div className="al-error" style={{ marginBottom: 16 }}>
                <p>{error}</p>
                <button onClick={() => setError(null)}>{t.close}</button>
              </div>
            )}
            {selectStep === "form" ? (
              <DateSelector onSearch={handleSelect} isLoading={selectLoading} t={t} lang={lang} />
            ) : (
              <LuckyDayList
                days={luckyDays}
                eventName={selectedEventName}
                onReset={() => setSelectStep("form")}
                t={t}
                lang={lang}
              />
            )}
          </div>
        )}
      </main>

      {/* ── SEO 内容区 + FAQ（SSR 输出，爬虫可读） ── */}
      <section style={{ maxWidth: 720, margin: "40px auto 0", padding: "0 16px 8px", textAlign: "left", boxSizing: "border-box" }}>
        {t.seoSections.map((sec) => (
          <div key={sec.heading} style={{ marginBottom: 28 }}>
            <h2 style={{
              fontFamily: "var(--font-cinzel), serif", fontSize: "1.05rem",
              color: "#e8d5a3", letterSpacing: "0.04em", marginBottom: 10,
              borderLeft: "3px solid rgba(201,168,76,0.6)", paddingLeft: 12,
            }}>{sec.heading}</h2>
            <p style={{ fontSize: "0.88rem", color: "rgba(200,175,140,0.75)", lineHeight: 1.85, margin: 0 }}>{sec.body}</p>
          </div>
        ))}
        <h2 style={{
          fontFamily: "var(--font-cinzel), serif", fontSize: "1.05rem",
          color: "#e8d5a3", letterSpacing: "0.04em", marginBottom: 12,
          borderLeft: "3px solid rgba(201,168,76,0.6)", paddingLeft: 12,
        }}>{t.faqTitle}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {t.faq.map((f) => (
            <details key={f.q} style={{
              background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.18)",
              borderRadius: 12, padding: "12px 16px",
            }}>
              <summary style={{ cursor: "pointer", fontSize: "0.88rem", color: "rgba(232,213,163,0.9)", fontWeight: 600, lineHeight: 1.5 }}>{f.q}</summary>
              <p style={{ fontSize: "0.84rem", color: "rgba(200,175,140,0.72)", lineHeight: 1.8, margin: "10px 0 2px" }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 底部装饰 */}
      <footer className="al-footer">
        <p className="al-footer-text">{t.footer}</p>
      </footer>
    </div>
  );
}
