"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { AstroInputForm } from "./components/AstroInput";
import { AstroChartSVG, ElementBreakdown } from "./components/AstroChart";
import { AstroReport } from "./components/AstroReport";
import { AstroPoster } from "./components/AstroPoster";
import { buildAstroChart } from "./astro-engine";
import type { AstroInput, AstroChart } from "./astro-engine";

type Phase = "landing" | "input" | "loading" | "result";

// 加载动画文字
const LOADING_TEXTS = [
  "正在定位你的出生星空…",
  "计算太阳在黄道上的位置…",
  "追踪月亮的轨迹…",
  "计算行星经度…",
  "确定宫位边界…",
  "探索行星间的相位…",
  "解读你的星盘密码…",
  "星盘解析完成，宇宙的秘密即将揭晓…",
];

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
  const [phase, setPhase] = useState<Phase>("landing");
  const [chart, setChart] = useState<AstroChart | null>(null);
  const [error, setError] = useState("");
  const [loadingText, setLoadingText] = useState(LOADING_TEXTS[0]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // 加载历史记录
  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  // 加载动画文字轮播
  useEffect(() => {
    if (phase !== "loading") return;
    let idx = 0;
    const timer = setInterval(() => {
      idx = (idx + 1) % LOADING_TEXTS.length;
      setLoadingText(LOADING_TEXTS[idx]);
    }, 1200);
    return () => clearInterval(timer);
  }, [phase]);

  const handleInputSubmit = useCallback(async (input: AstroInput) => {
    setPhase("loading");
    setError("");

    // 模拟加载感（实际计算很快）
    await new Promise((resolve) => setTimeout(resolve, 2800));

    try {
      const result = buildAstroChart(input);
      setChart(result);
      saveToHistory(result);
      setHistory(loadHistory());
      setPhase("result");
    } catch (err) {
      console.error(err);
      setError("星盘计算失败，请检查输入信息后重试");
      setPhase("input");
    }
  }, []);

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
  if (phase === "landing") {
    return (
      <div className="astro-landing-page">
        <div className="stars-bg" />
        <nav className="astro-nav">
          <Link href="/" className="astro-nav-back">
            ← 返回主页
          </Link>
          {history.length > 0 && (
            <button onClick={() => setShowHistory(true)} className="astro-nav-history">
              📋 历史记录
            </button>
          )}
        </nav>

        {/* 历史面板 */}
        {showHistory && (
          <div className="astro-history-panel">
            <div className="astro-history-content">
              <div className="astro-history-header">
                <h3>历史星盘</h3>
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
                    {new Date(item.generatedAt).toLocaleDateString("zh-CN")}
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
            遇见宇宙中的自己
          </h1>
          <p className="astro-landing-subtitle">
            NATAL CHART · 本命星盘解析
          </p>
          <p className="astro-landing-desc">
            在你出生的那一刻，宇宙中所有星体的排列，
            <br />
            构成了一张独一无二的星空地图——这就是你的本命星盘
          </p>

          {/* 功能特点 */}
          <div className="astro-landing-features">
            {[
              { icon: "☉", title: "精准计算", desc: "VSOP87 天文算法，精确追踪十大星体位置" },
              { icon: "♎", title: "三巨头解读", desc: "太阳·月亮·上升，揭秘你性格的核心密码" },
              { icon: "△", title: "相位分析", desc: "五大核心相位，解析行星间的能量连结" },
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
            ✨ 解读我的本命星盘
          </button>

          <p className="astro-landing-note">
            完全免费 · 无需注册 · 数据不上传
          </p>
        </div>
      </div>
    );
  }

  // ===== 输入页 =====
  if (phase === "input") {
    return (
      <div className="astro-page">
        <div className="stars-bg" />
        <nav className="astro-nav">
          <button onClick={() => setPhase("landing")} className="astro-nav-back">
            ← 返回
          </button>
          {history.length > 0 && (
            <button onClick={() => setShowHistory(true)} className="astro-nav-history">
              📋 历史
            </button>
          )}
        </nav>

        {showHistory && (
          <div className="astro-history-panel">
            <div className="astro-history-content">
              <div className="astro-history-header">
                <h3>历史星盘</h3>
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
          <AstroInputForm onSubmit={handleInputSubmit} isLoading={false} />
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
            ← 重新解盘
          </button>
          <div className="astro-result-nav-title">
            <span className="text-gold">✦</span>
            <span>{chart.input.name} 的星盘</span>
          </div>
          <Link href="/" className="astro-nav-home">🏠</Link>
        </nav>

        <div className="astro-result-content">
          {/* 左侧：星盘图 */}
          <div className="astro-result-left">
            <AstroChartSVG chart={chart} />
            <ElementBreakdown chart={chart} />
          </div>

          {/* 右侧：解析报告 */}
          <div className="astro-result-right">
            <AstroReport chart={chart} />
          </div>
        </div>

        {/* 海报生成区 */}
        <div className="astro-result-poster-section">
          <AstroPoster chart={chart} />
        </div>

        {/* 底部 CTA */}
        <div className="astro-result-footer">
          <button onClick={handleRestart} className="astro-result-restart-btn">
            ✨ 解读另一个人的星盘
          </button>
          <Link href="/" className="astro-result-home-link">
            探索更多命理解析 →
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
