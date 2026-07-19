"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { AstroInputForm } from "./components/AstroInput";
import { AstroChartSVG, ElementBreakdown } from "./components/AstroChart";
import { AstroReport } from "./components/AstroReport";
import { AstroPoster } from "./components/AstroPoster";
import { buildAstroChart } from "./astro-engine";
import type { AstroInput, AstroChart } from "./astro-engine";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";
import { T, type Lang } from "./astro-i18n";

type Phase = "landing" | "input" | "loading" | "result";

// 历史记录（LocalStorage）
const HISTORY_KEY = "astro_history";
interface HistoryItem {
  name: string;
  birthDate: string;
  cityName: string;
  generatedAt: string;
  chart: AstroChart;
}

function saveToHistory(chart: AstroChart) {
  try {
    const existing = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]") as HistoryItem[];
    const newItem: HistoryItem = {
      name: chart.input.name,
      birthDate: chart.input.birthDate,
      cityName: chart.input.city.name,
      generatedAt: chart.generatedAt,
      chart,
    };
    const updated = [newItem, ...existing].slice(0, 5);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

function loadHistory(): HistoryItem[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]") as HistoryItem[];
  } catch {
    return [];
  }
}

export default function AstroPage() {
  const lang = useLocale() as Lang;
  const t = T[lang];
  const dateLocale = lang === "en" ? "en-US" : lang === "tw" ? "zh-TW" : "zh-CN";

  const [phase, setPhase] = useState<Phase>("landing");
  const [chart, setChart] = useState<AstroChart | null>(null);
  const [error, setError] = useState("");
  const [loadingText, setLoadingText] = useState(t.loadingTexts[0]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // 加载历史记录
  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  // 加载动画文字轮播
  useEffect(() => {
    if (phase !== "loading") return;
    setLoadingText(t.loadingTexts[0]);
    let idx = 0;
    const timer = setInterval(() => {
      idx = (idx + 1) % t.loadingTexts.length;
      setLoadingText(t.loadingTexts[idx]);
    }, 1200);
    return () => clearInterval(timer);
  }, [phase, t]);

  const handleInputSubmit = useCallback(async (input: AstroInput) => {
    setPhase("loading");
    setError("");

    // 模拟加载感（实际计算很快）
    await new Promise((resolve) => setTimeout(resolve, 2800));

    try {
      const result = buildAstroChart(input, lang);
      setChart(result);
      saveToHistory(result);
      setHistory(loadHistory());
      setPhase("result");
    } catch (err) {
      console.error(err);
      setError(t.errCalcFailed);
      setPhase("input");
    }
  }, [t]);

  const handleRestart = useCallback(() => {
    setPhase("input");
    setChart(null);
    setError("");
  }, []);

  const handleLoadHistory = useCallback((item: HistoryItem) => {
    setChart(item.chart);
    setPhase("result");
    setShowHistory(false);
  }, []);

  // ===== Landing Page =====
  // 落地页 JSX 提取为常量、作为末尾默认 return：任何状态（含异常兜底）都有完整页面
  // 外壳输出，不再有 `return null` 式的 SSR 空渲染。
  const landingPage = (
      <div className="astro-landing-page">
        <div className="stars-bg" />
        <nav className="astro-nav">
          <Link href="/" className="astro-nav-back">
            {t.navBackHome}
          </Link>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button onClick={() => setShowHistory(true)} className="astro-nav-history">
                {t.navHistory}
              </button>
            )}
            <LangSwitcher />
          </div>
        </nav>

        {/* 历史面板 */}
        {showHistory && (
          <div className="astro-history-panel">
            <div className="astro-history-content">
              <div className="astro-history-header">
                <h3>{t.historyTitle}</h3>
                <button onClick={() => setShowHistory(false)}>✕</button>
              </div>
              {history.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleLoadHistory(item)}
                  className="astro-history-item"
                >
                  <span className="astro-history-name">{item.name}</span>
                  <span className="astro-history-date">{item.birthDate} · {item.cityName}</span>
                  <span className="astro-history-time">
                    {new Date(item.generatedAt).toLocaleDateString(dateLocale)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="astro-landing-hero">
          {/* 星座漂浮装饰 */}
          <div className="astro-landing-zodiac-ring">
            {["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"].map((s, i) => (
              <span
                key={s}
                className="astro-zodiac-orbit"
                style={{
                  transform: `rotate(${i * 30}deg) translateX(120px) rotate(-${i * 30}deg)`,
                  animationDelay: `${i * 0.25}s`,
                }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* 中心图标 */}
          <div className="astro-landing-icon-wrapper">
            <div className="astro-landing-glow" />
            <div className="astro-landing-icon">✦</div>
          </div>

          {/* 文字区 */}
          <h1 className="astro-landing-title">
            {t.landTitle}
          </h1>
          <p className="astro-landing-subtitle">
            {t.landSubtitle}
          </p>
          <p className="astro-landing-desc">
            {t.landDescL1}
            <br />
            {t.landDescL2}
          </p>

          {/* 功能特点 */}
          <div className="astro-landing-features">
            {[
              { icon: "☉", title: t.feat1Title, desc: t.feat1Desc },
              { icon: "♎", title: t.feat2Title, desc: t.feat2Desc },
              { icon: "△", title: t.feat3Title, desc: t.feat3Desc },
            ].map((f) => (
              <div key={f.title} className="astro-feature-card">
                <div className="astro-feature-icon">{f.icon}</div>
                <div className="astro-feature-title">{f.title}</div>
                <div className="astro-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>

          {/* CTA 按钮 */}
          <button
            onClick={() => setPhase("input")}
            className="astro-landing-cta"
          >
            {t.landCta}
          </button>

          <p className="astro-landing-note">
            {t.landNote}
          </p>

          {/* ── 新手说明：怎么生成星盘（直接进入的用户也能立刻看懂） ── */}
          <div style={{
            marginTop: 36, maxWidth: 480, width: "100%",
            background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.22)",
            borderRadius: 14, padding: "18px 20px", textAlign: "left",
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
        </div>

        {/* ── SEO 内容区 + FAQ（SSR 输出，爬虫可读） ── */}
        <section style={{ maxWidth: 720, margin: "48px auto 0", padding: "0 20px 64px", textAlign: "left", position: "relative", zIndex: 1 }}>
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
      </div>
  );

  // ===== 输入页 =====
  if (phase === "input") {
    return (
      <div className="astro-page">
        <div className="stars-bg" />
        <nav className="astro-nav">
          <button onClick={() => setPhase("landing")} className="astro-nav-back">
            {t.navBack}
          </button>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button onClick={() => setShowHistory(true)} className="astro-nav-history">
                {t.navHistoryShort}
              </button>
            )}
            <LangSwitcher />
          </div>
        </nav>

        {showHistory && (
          <div className="astro-history-panel">
            <div className="astro-history-content">
              <div className="astro-history-header">
                <h3>{t.historyTitle}</h3>
                <button onClick={() => setShowHistory(false)}>✕</button>
              </div>
              {history.map((item, i) => (
                <button key={i} onClick={() => handleLoadHistory(item)} className="astro-history-item">
                  <span className="astro-history-name">{item.name}</span>
                  <span className="astro-history-date">{item.birthDate} · {item.cityName}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="astro-page-content">
          {error && (
            <div className="astro-error-banner">⚠️ {error}</div>
          )}
          <AstroInputForm t={t} lang={lang} onSubmit={handleInputSubmit} isLoading={false} />
        </div>
      </div>
    );
  }

  // ===== 加载页 =====
  if (phase === "loading") {
    return (
      <div className="astro-loading-page">
        <div className="stars-bg" />

        {/* 旋转星盘动画 */}
        <div className="astro-loading-wrapper">
          <div className="astro-loading-ring astro-loading-ring-outer">
            {["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"].map((s, i) => (
              <span
                key={s}
                className="astro-loading-sign"
                style={{ transform: `rotate(${i * 30}deg) translateY(-85px)` }}
              >
                {s}
              </span>
            ))}
          </div>
          <div className="astro-loading-ring astro-loading-ring-inner" />
          <div className="astro-loading-center">✦</div>
        </div>

        <div className="astro-loading-text-area">
          <p className="astro-loading-main-text">{loadingText}</p>
          <div className="astro-loading-progress">
            <div className="astro-loading-progress-bar" />
          </div>
        </div>
      </div>
    );
  }

  // ===== 结果页 =====
  if (phase === "result" && chart) {
    return (
      <div className="astro-result-page">
        <div className="stars-bg" />

        {/* 顶部导航 */}
        <nav className="astro-result-nav">
          <button onClick={handleRestart} className="astro-nav-back">
            {t.navRestart}
          </button>
          <div className="astro-result-nav-title">
            <span className="text-gold">✦</span>
            <span>{chart.input.name}{t.chartOfSuffix}</span>
          </div>
          <div className="flex items-center gap-2">
            <LangSwitcher />
            <Link href="/" className="astro-nav-home">🏠</Link>
          </div>
        </nav>

        <div className="astro-result-content">
          {/* 左侧：星盘图 */}
          <div className="astro-result-left">
            <AstroChartSVG chart={chart} t={t} lang={lang} />
            <ElementBreakdown chart={chart} t={t} lang={lang} />
          </div>

          {/* 右侧：解析报告 */}
          <div className="astro-result-right">
            <AstroReport chart={chart} t={t} lang={lang} />
          </div>
        </div>

        {/* 海报生成区 */}
        <div className="astro-result-poster-section">
          <AstroPoster chart={chart} t={t} lang={lang} />
        </div>

        {/* 底部 CTA */}
        <div className="astro-result-footer">
          <button onClick={handleRestart} className="astro-result-restart-btn">
            {t.resultRestart}
          </button>
          <Link href="/" className="astro-result-home-link">
            {t.resultHomeLink}
          </Link>
        </div>
      </div>
    );
  }

  // 默认分支：phase === "landing"（或 result 无 chart 的异常兜底）渲染完整落地页，
  // 不再有 return null，SSR 首屏始终输出页面外壳。
  return landingPage;
}
