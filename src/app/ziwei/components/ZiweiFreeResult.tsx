"use client";

import { useState } from "react";
import ZiweiChartComponent from "./ZiweiChart";
import { PAYWALL_HINTS, STAR_COLORS } from "../ziwei-data";
import type { ZiweiChart } from "../ziwei-engine";

interface ZiweiFreeResultProps {
  chart: ZiweiChart;
  onUnlock: () => void;
  onReset: () => void;
}

export default function ZiweiFreeResult({ chart, onUnlock, onReset }: ZiweiFreeResultProps) {
  const [mode, setMode] = useState<"modern" | "classic">("modern");
  const mingColor = STAR_COLORS[chart.mingStarName] ?? "#C77DFF";

  return (
    <div className="zw-result-page">
      {/* 顶部 */}
      <div className="zw-result-header">
        <div className="zw-result-header-glow" />
        <div className="zw-result-header-content">
          <div className="zw-result-badge" style={{ color: mingColor, borderColor: mingColor }}>
            ✦ {chart.mingStarName}坐命
          </div>
          <h1 className="zw-result-title">{chart.name} 的东方星盘</h1>
          <p className="zw-result-subtitle">
            {chart.yearGan}{chart.yearZhi}年 · {chart.gender === "female" ? "坤命" : "乾命"} · {chart.wuXingJu}
          </p>
          {/* 性格标签 */}
          <div className="zw-personality-tags">
            {chart.personalityLabels.map(l => (
              <span key={l} className="zw-personality-tag" style={{ borderColor: mingColor, color: mingColor }}>
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 星盘（免费展示完整星盘） */}
      <ZiweiChartComponent chart={chart} mode={mode} onModeChange={setMode} />

      {/* 命宫解读（免费） */}
      <div className="zw-free-section">
        <div className="zw-section-title">
          <span className="zw-section-icon" style={{ color: mingColor }}>◆</span>
          命宫解读 · {chart.mingStarName}坐命
        </div>
        <p className="zw-ming-reading">{chart.mingReading}</p>

        {chart.aiEnhanced && (
          <div className="zw-ai-preview">
            <div className="zw-ai-preview-label">✦ AI 命格总评</div>
            <p className="zw-ai-preview-text">{chart.aiEnhanced}</p>
          </div>
        )}
      </div>

      {/* 付费墙 - 悬念诱饵 */}
      <div className="zw-paywall">
        <div className="zw-paywall-title">✦ 你的命盘还隐藏着更多秘密</div>
        <div className="zw-paywall-hints">
          {Object.entries(PAYWALL_HINTS).map(([key, hint]) => (
            <div key={key} className="zw-paywall-hint-card" onClick={onUnlock}>
              <div className="zw-hint-tag">{key}</div>
              <div className="zw-hint-title">🔒 {hint.title}</div>
              <div className="zw-hint-teaser">{hint.teaser}</div>
              <div className="zw-hint-unlock">点击解锁 →</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="zw-paywall-cta">
          <div className="zw-cta-users">已有 <strong>5W+</strong> 人解锁完整星盘报告</div>
          <button onClick={onUnlock} className="zw-unlock-btn">
            <span className="zw-unlock-price">¥19.9</span>
            <span className="zw-unlock-text">解锁完整东方星盘报告</span>
            <span className="zw-unlock-arrow">→</span>
          </button>
          <div className="zw-unlock-includes">
            {["✦ 财帛宫财富格局", "✦ 官禄宫事业赛道", "✦ 夫妻宫正缘画像", "✦ 大限流年运势"].map(f => (
              <span key={f} className="zw-unlock-feature">{f}</span>
            ))}
          </div>
          <p className="zw-unlock-note">一次性解锁 · 永久查看 · 支持分享精美图片</p>
        </div>
      </div>

      {/* 重新排盘 */}
      <button onClick={onReset} className="zw-reset-btn">← 重新排盘</button>
    </div>
  );
}
