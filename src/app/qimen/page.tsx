"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { QimenInputForm } from "./components/QimenInput";
import { QimenChartView } from "./components/QimenChart";
import { QimenAnalysis } from "./components/QimenAnalysis";
import { QimenPoster } from "./components/QimenPoster";
import { buildQimenChart, saveQimenHistory, getQimenHistory } from "./qimen-engine";
import type { QimenChart, QimenInput, QimenHistoryItem } from "./qimen-engine";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";

// ── 三语文案 ────────────────────────────────────────
const T = {
  zh: {
    seoTitle:        "奇门遁甲排盘 — AI 奇门格局在线起局",
    back:            "命运密语",
    brand:           "奇门遁甲",
    historyAria:     "历史记录",
    historyTitle:    "近期起局记录",
    historyEmpty:    "暂无排盘记录",
    eventBusiness:   "💼商业",
    eventTravel:     "🧭出行",
    eventGeneral:    "☯综合",
    historyReload:   (date: string, city: string, ju: string) => `${date} · ${city} · ${ju} — 请重新填入具体时间重新起局`,
    calcError:       "排盘计算出现异常，请检查输入参数后重试。",
    restart:         "重新起局",
    sectionGeju:     "格局与吉凶解析",
    sectionPoster:   "生成分享海报",
  },
  tw: {
    seoTitle:        "奇門遁甲排盤 — AI 奇門格局線上起局",
    back:            "命運密語",
    brand:           "奇門遁甲",
    historyAria:     "歷史記錄",
    historyTitle:    "近期起局記錄",
    historyEmpty:    "暫無排盤記錄",
    eventBusiness:   "💼商業",
    eventTravel:     "🧭出行",
    eventGeneral:    "☯綜合",
    historyReload:   (date: string, city: string, ju: string) => `${date} · ${city} · ${ju} — 請重新填入具體時間重新起局`,
    calcError:       "排盤計算出現異常，請檢查輸入參數後重試。",
    restart:         "重新起局",
    sectionGeju:     "格局與吉凶解析",
    sectionPoster:   "生成分享海報",
  },
  en: {
    seoTitle:        "Qi Men Dun Jia Chart — AI Qi Men Online Casting",
    back:            "Mystic Whispers",
    brand:           "Qi Men Dun Jia",
    historyAria:     "History",
    historyTitle:    "Recent Charts",
    historyEmpty:    "No charts yet",
    eventBusiness:   "💼 Business",
    eventTravel:     "🧭 Travel",
    eventGeneral:    "☯ General",
    historyReload:   (date: string, city: string, ju: string) => `${date} · ${city} · ${ju} — please re-enter a specific time to cast again`,
    calcError:       "An error occurred while casting the chart. Please check your inputs and try again.",
    restart:         "New Chart",
    sectionGeju:     "Pattern & Fortune Analysis",
    sectionPoster:   "Create Share Poster",
  },
};
type Lang = "zh" | "en" | "tw";
// ────────────────────────────────────────────────────

type Phase = "input" | "result";

export default function QimenPage() {
  const lang = useLocale() as Lang;
  const t = T[lang];

  const [phase, setPhase] = useState<Phase>("input");
  const [chart, setChart] = useState<QimenChart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<QimenHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [historyHint, setHistoryHint] = useState<string | null>(null);

  // 加载历史记录
  useEffect(() => {
    setHistory(getQimenHistory());
  }, []);

  const handleSubmit = useCallback(async (input: QimenInput) => {
    setLoading(true);
    setError(null);
    try {
      // 直接本地计算（MVP 阶段，无需后端）
      const result = buildQimenChart(input, lang);
      setChart(result);
      saveQimenHistory(result);
      setHistory(getQimenHistory());
      setPhase("result");
    } catch (e) {
      console.error(e);
      setError(t.calcError);
    } finally {
      setLoading(false);
    }
  }, [t, lang]);

  const handleBack = useCallback(() => {
    setPhase("input");
    setError(null);
  }, []);

  const handleHistoryReload = useCallback((item: QimenHistoryItem) => {
    setHistoryHint(t.historyReload(item.date, item.city, item.ju));
    setShowHistory(false);
  }, [t]);

  return (
    <div className="qm-page">
      {/* SEO H1 — 视觉隐藏，搜索引擎可读 */}
      <h1 style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
        {t.seoTitle}
      </h1>
      {/* 星空背景 */}
      <div className="stars-bg" />

      {/* 顶部导航 */}
      <nav className="qm-nav">
        <Link href="/" className="qm-nav-back">
          <span className="qm-nav-back-arrow">←</span>
          <span>{t.back}</span>
        </Link>
        <div className="qm-nav-title">
          <span className="qm-nav-logo">☰</span>
          <span>{t.brand}</span>
        </div>
        <div className="qm-nav-actions" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            className="qm-nav-history-btn"
            onClick={() => setShowHistory(v => !v)}
            aria-label={t.historyAria}
          >
            <span>📜</span>
            {history.length > 0 && (
              <span className="qm-history-badge">{history.length}</span>
            )}
          </button>
          <LangSwitcher />
        </div>
      </nav>

      {/* 历史记录抽屉 */}
      {showHistory && (
        <div className="qm-history-overlay" onClick={() => setShowHistory(false)}>
          <div className="qm-history-drawer" onClick={e => e.stopPropagation()}>
            <div className="qm-history-header">
              <h3>{t.historyTitle}</h3>
              <button onClick={() => setShowHistory(false)}>✕</button>
            </div>
            {history.length === 0 ? (
              <p className="qm-history-empty">{t.historyEmpty}</p>
            ) : (
              <div className="qm-history-list">
                {history.map(item => (
                  <button
                    key={item.id}
                    className="qm-history-item"
                    onClick={() => handleHistoryReload(item)}
                  >
                    <div className="qm-history-item-main">
                      <span className="qm-history-date">{item.date}</span>
                      <span className="qm-history-city">{item.city}</span>
                    </div>
                    <div className="qm-history-item-sub">
                      <span className="qm-history-ju">{item.ju}</span>
                      <span className="qm-history-event">
                        {item.event === "business" ? t.eventBusiness : item.event === "travel" ? t.eventTravel : t.eventGeneral}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 主内容区 */}
      <main className="qm-main">
        {phase === "input" && (
          <div className="qm-input-page">
            {historyHint && (
              <div className="qm-error-msg" style={{ background: "rgba(50,90,50,0.25)", borderColor: "rgba(100,200,120,0.3)", color: "rgba(160,230,160,0.9)", marginBottom: 8 }}>
                <span>📜</span>
                <span>{historyHint}</span>
                <button onClick={() => setHistoryHint(null)} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", marginLeft: "auto", fontSize: "0.9rem" }}>×</button>
              </div>
            )}
            <QimenInputForm onSubmit={handleSubmit} loading={loading} lang={lang} />
            {error && (
              <div className="qm-error-msg">
                <span>⚠</span>
                <span>{error}</span>
              </div>
            )}
          </div>
        )}

        {phase === "result" && chart && (
          <div className="qm-result-page">
            {/* 返回按钮 */}
            <div className="qm-result-topbar">
              <button className="qm-result-back-btn" onClick={handleBack}>
                ← {t.restart}
              </button>
              <div className="qm-result-title-info">
                <span className="qm-result-ju">{chart.yinyangJu}</span>
                <span className="qm-result-city">{chart.input.city}</span>
              </div>
            </div>

            {/* 九宫格主盘 */}
            <section className="qm-section-block">
              <QimenChartView chart={chart} lang={lang} />
            </section>

            {/* 格局分析 */}
            <section className="qm-section-block">
              <div className="qm-section-title">
                <span className="qm-section-title-icon">◈</span>
                {t.sectionGeju}
              </div>
              <QimenAnalysis chart={chart} lang={lang} />
            </section>

            {/* 生成海报 */}
            <section className="qm-section-block">
              <div className="qm-section-title">
                <span className="qm-section-title-icon">◈</span>
                {t.sectionPoster}
              </div>
              <QimenPoster chart={chart} lang={lang} />
            </section>

            {/* 底部留白 */}
            <div style={{ height: 40 }} />
          </div>
        )}
      </main>
    </div>
  );
}
