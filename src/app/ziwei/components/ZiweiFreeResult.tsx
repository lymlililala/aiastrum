"use client";

import { useState } from "react";
import ZiweiChartComponent from "./ZiweiChart";
import { PAYWALL_HINTS, STAR_COLORS } from "../ziwei-data";
import type { ZiweiChart } from "../ziwei-engine";
import type { ZiweiT } from "../ziwei-i18n";

interface ZiweiFreeResultProps {
  chart: ZiweiChart;
  onUnlock: () => void;
  onReset: () => void;
  t: ZiweiT;
}

export default function ZiweiFreeResult({ chart, onUnlock, onReset, t }: ZiweiFreeResultProps) {
  const [mode, setMode] = useState<"modern" | "classic">("modern");
  const mingColor = STAR_COLORS[chart.mingStarName] ?? "#C77DFF";

  return (
    <div className="zw-result-page">
      {/* 顶部 */}
      <div className="zw-result-header">
        <div className="zw-result-header-glow" />
        <div className="zw-result-header-content">
          <div className="zw-result-badge" style={{ color: mingColor, borderColor: mingColor }}>
            {t.freeBadgePre}{chart.mingStarName}{t.zuoMingSuffix}
          </div>
          <h1 className="zw-result-title">{chart.name}{t.reportNameSuffix}</h1>
          <p className="zw-result-subtitle">
            {chart.yearGan}{chart.yearZhi}{t.unitYear} · {chart.gender === "female" ? t.palaceFemale : t.palaceMale} · {chart.wuXingJu}
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
      <ZiweiChartComponent chart={chart} mode={mode} onModeChange={setMode} t={t} />

      {/* 命宫解读（免费） */}
      <div className="zw-free-section">
        <div className="zw-section-title">
          <span className="zw-section-icon" style={{ color: mingColor }}>◆</span>
          {t.freeMingReadingPre}{chart.mingStarName}{t.zuoMingSuffix}
        </div>
        <p className="zw-ming-reading">{chart.mingReading}</p>

        {chart.aiEnhanced && (
          <div className="zw-ai-preview">
            <div className="zw-ai-preview-label">{t.aiTitle}</div>
            <p className="zw-ai-preview-text">{chart.aiEnhanced}</p>
          </div>
        )}
      </div>

      {/* 付费墙 - 悬念诱饵 */}
      <div className="zw-paywall">
        <div className="zw-paywall-title">{t.paywallTitle}</div>
        <div className="zw-paywall-hints">
          {Object.entries(PAYWALL_HINTS).map(([key, hint]) => (
            <div key={key} className="zw-paywall-hint-card" onClick={onUnlock}>
              <div className="zw-hint-tag">{key}</div>
              <div className="zw-hint-title">{t.hintLock}{hint.title}</div>
              <div className="zw-hint-teaser">{hint.teaser}</div>
              <div className="zw-hint-unlock">{t.hintUnlock}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="zw-paywall-cta">
          <div className="zw-cta-users">{t.ctaUsersPre}<strong>{t.ctaUsersBold}</strong>{t.ctaUsersPost}</div>
          <button onClick={onUnlock} className="zw-unlock-btn">
            <span className="zw-unlock-price">{t.unlockPrice}</span>
            <span className="zw-unlock-text">{t.unlockText}</span>
            <span className="zw-unlock-arrow">→</span>
          </button>
          <div className="zw-unlock-includes">
            {[t.unlockFeat1, t.unlockFeat2, t.unlockFeat3, t.unlockFeat4].map(f => (
              <span key={f} className="zw-unlock-feature">{f}</span>
            ))}
          </div>
          <p className="zw-unlock-note">{t.unlockNote}</p>
        </div>
      </div>

      {/* 重新排盘 */}
      <button onClick={onReset} className="zw-reset-btn">{t.freeReset}</button>
    </div>
  );
}
