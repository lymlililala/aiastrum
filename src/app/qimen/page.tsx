"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { QimenInputForm } from "./components/QimenInput";
import { QimenChartView } from "./components/QimenChart";
import { QimenAnalysis } from "./components/QimenAnalysis";
import { QimenPoster } from "./components/QimenPoster";
import { buildQimenChart, saveQimenHistory, getQimenHistory } from "./qimen-engine";
import type { QimenChart, QimenInput, QimenHistoryItem } from "./qimen-engine";

type Phase = "input" | "result";

export default function QimenPage() {
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
      const result = buildQimenChart(input);
      setChart(result);
      saveQimenHistory(result);
      setHistory(getQimenHistory());
      setPhase("result");
    } catch (e) {
      console.error(e);
      setError("排盘计算出现异常，请检查输入参数后重试。");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleBack = useCallback(() => {
    setPhase("input");
    setError(null);
  }, []);

  const handleHistoryReload = useCallback((item: QimenHistoryItem) => {
    setHistoryHint(`${item.date} · ${item.city} · ${item.ju} — 请重新填入具体时间重新起局`);
    setShowHistory(false);
  }, []);

  return (
    <div className="qm-page">
      {/* SEO H1 — 视觉隐藏，搜索引擎可读 */}
      <h1 style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
        奇门遁甲排盘 — AI 奇门格局在线起局
      </h1>
      {/* 星空背景 */}
      <div className="stars-bg" />

      {/* 顶部导航 */}
      <nav className="qm-nav">
        <Link href="/" className="qm-nav-back">
          <span className="qm-nav-back-arrow">←</span>
          <span>命运密语</span>
        </Link>
        <div className="qm-nav-title">
          <span className="qm-nav-logo">☰</span>
          <span>奇门遁甲</span>
        </div>
        <button
          className="qm-nav-history-btn"
          onClick={() => setShowHistory(v => !v)}
          aria-label="历史记录"
        >
          <span>📜</span>
          {history.length > 0 && (
            <span className="qm-history-badge">{history.length}</span>
          )}
        </button>
      </nav>

      {/* 历史记录抽屉 */}
      {showHistory && (
        <div className="qm-history-overlay" onClick={() => setShowHistory(false)}>
          <div className="qm-history-drawer" onClick={e => e.stopPropagation()}>
            <div className="qm-history-header">
              <h3>近期起局记录</h3>
              <button onClick={() => setShowHistory(false)}>✕</button>
            </div>
            {history.length === 0 ? (
              <p className="qm-history-empty">暂无排盘记录</p>
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
                        {item.event === "business" ? "💼商业" : item.event === "travel" ? "🧭出行" : "☯综合"}
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
            <QimenInputForm onSubmit={handleSubmit} loading={loading} />
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
                ← 重新起局
              </button>
              <div className="qm-result-title-info">
                <span className="qm-result-ju">{chart.yinyangJu}</span>
                <span className="qm-result-city">{chart.input.city}</span>
              </div>
            </div>

            {/* 九宫格主盘 */}
            <section className="qm-section-block">
              <QimenChartView chart={chart} />
            </section>

            {/* 格局分析 */}
            <section className="qm-section-block">
              <div className="qm-section-title">
                <span className="qm-section-title-icon">◈</span>
                格局与吉凶解析
              </div>
              <QimenAnalysis chart={chart} />
            </section>

            {/* 生成海报 */}
            <section className="qm-section-block">
              <div className="qm-section-title">
                <span className="qm-section-title-icon">◈</span>
                生成分享海报
              </div>
              <QimenPoster chart={chart} />
            </section>

            {/* 底部留白 */}
            <div style={{ height: 40 }} />
          </div>
        )}
      </main>
    </div>
  );
}
