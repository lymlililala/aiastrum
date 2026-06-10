"use client";

import { useState } from "react";
import type { LoveReport } from "../love-data";
import type { LoveLang, LoveT } from "../love-i18n";

interface LoveFullReportProps {
  lang: LoveLang;
  t: LoveT;
  report: LoveReport;
  onReset: () => void;
}

type TabKey = "forecast" | "soulmate" | "advice" | "ai";

export default function LoveFullReport({ lang, t, report, onReset }: LoveFullReportProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("forecast");
  const [copied, setCopied] = useState(false);

  const { zodiac, score, peachForecast, soulmate, loveAdvice, aiEnhanced } = report;

  const birthDateText = new Date(report.birthYear, report.birthMonth - 1, report.birthDay)
    .toLocaleDateString(lang === "en" ? "en-US" : lang === "tw" ? "zh-TW" : "zh-CN", {
      year: "numeric", month: "long", day: "numeric",
    });

  const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: "forecast", label: t.tabForecast, icon: "🌸" },
    { key: "soulmate", label: t.tabSoulmate, icon: "💫" },
    { key: "advice",   label: t.tabAdvice, icon: "✨" },
    ...(aiEnhanced ? [{ key: "ai" as TabKey, label: t.tabAi, icon: "🔮" }] : []),
  ];

  const handleShare = async () => {
    const text = `${t.shareTextPre}${score.overall}${t.shareTextScoreL}${score.label}${t.shareTextScoreR}${score.shortComment}${t.shareTextPost}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="love-full-report">
      {/* 顶部概览 */}
      <div className="love-report-header">
        <div className="love-report-header-bg" />
        <div className="love-report-header-content">
          <div className="love-report-unlocked-badge">{t.unlockedBadge}</div>
          <div className="love-report-name">{report.name}{t.reportNameSuffix}</div>
          <div className="love-report-zodiac">
            {zodiac.symbol} {zodiac.name} · {birthDateText}
          </div>
          <div className="love-report-score-row">
            <span className="love-report-score-num" style={{ color: score.labelColor }}>
              {score.overall}
            </span>
            <span className="love-report-score-label" style={{ color: score.labelColor }}>
              {score.label}
            </span>
          </div>
          <p className="love-report-comment">{score.shortComment}</p>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="love-report-tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`love-tab-btn ${activeTab === tab.key ? "love-tab-active" : ""}`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 内容 */}
      <div className="love-report-content">
        {/* === 桃花运势 === */}
        {activeTab === "forecast" && (
          <div className="love-tab-pane">
            <div className="love-section-header">
              <div className="love-section-icon-lg">🌸</div>
              <div>
                <h2 className="love-section-h2">{t.forecastH2}</h2>
                <p className="love-section-desc">{t.forecastDesc}</p>
              </div>
            </div>

            <div className="love-forecast-list">
              {[
                { label: t.monthThis, text: peachForecast.month1 },
                { label: t.monthNext, text: peachForecast.month2 },
                { label: t.monthThird, text: peachForecast.month3 },
              ].map((item, i) => (
                <div key={i} className="love-forecast-item">
                  <div className="love-forecast-month">{item.label}</div>
                  <p className="love-forecast-text">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="love-peak-card">
              <div className="love-peak-title">{t.peakTitle}</div>
              <p className="love-peak-text">
                {t.peakTextPre}<strong>{peachForecast.peak}</strong>{t.peakTextPost}
              </p>
            </div>

            <div className="love-advice-box">
              <div className="love-advice-box-title">{t.forecastAdviceTitle}</div>
              <p className="love-advice-box-text">{peachForecast.advice}</p>
            </div>
          </div>
        )}

        {/* === 正缘画像 === */}
        {activeTab === "soulmate" && (
          <div className="love-tab-pane">
            <div className="love-section-header">
              <div className="love-section-icon-lg">💫</div>
              <div>
                <h2 className="love-section-h2">{t.soulmateH2}</h2>
                <p className="love-section-desc">{t.soulmateDesc}</p>
              </div>
            </div>

            {[
              { icon: "👤", title: t.soulAppearance, text: soulmate.appearance },
              { icon: "💭", title: t.soulPersonality, text: soulmate.personality },
              { icon: "💼", title: t.soulCareer, text: soulmate.career },
              { icon: "🗺️", title: t.soulMeetScene, text: soulmate.meetScene },
              { icon: "⏰", title: t.soulMeetTiming, text: soulmate.meetTiming },
            ].map(item => (
              <div key={item.title} className="love-soulmate-card">
                <div className="love-soulmate-card-header">
                  <span className="love-soulmate-icon">{item.icon}</span>
                  <span className="love-soulmate-title">{item.title}</span>
                </div>
                <p className="love-soulmate-text">{item.text}</p>
              </div>
            ))}

            <div className="love-note-box">
              <p>{t.soulmateNote}</p>
            </div>
          </div>
        )}

        {/* === 情感建议 === */}
        {activeTab === "advice" && (
          <div className="love-tab-pane">
            <div className="love-section-header">
              <div className="love-section-icon-lg">✨</div>
              <div>
                <h2 className="love-section-h2">{t.adviceH2}</h2>
                <p className="love-section-desc">{t.adviceDesc}</p>
              </div>
            </div>

            <div className="love-advice-card love-advice-strength">
              <div className="love-advice-card-title">
                <span>💪</span> {t.adviceStrength}
              </div>
              <p className="love-advice-card-text">{loveAdvice.strength}</p>
            </div>

            <div className="love-advice-card love-advice-weakness">
              <div className="love-advice-card-title">
                <span>🌱</span> {t.adviceWeakness}
              </div>
              <p className="love-advice-card-text">{loveAdvice.weakness}</p>
            </div>

            <div className="love-advice-card love-advice-action">
              <div className="love-advice-card-title">
                <span>🚀</span> {t.adviceAction}
              </div>
              <p className="love-advice-card-text">{loveAdvice.action}</p>
            </div>

            {/* 专属肯定语 */}
            <div className="love-affirmation">
              <div className="love-affirmation-icon">✦</div>
              <p className="love-affirmation-text">{loveAdvice.affirmation}</p>
            </div>

            {/* 星座特质回顾 */}
            <div className="love-zodiac-recap">
              <div className="love-zodiac-recap-symbol">{zodiac.symbol}</div>
              <div>
                <div className="love-zodiac-recap-name">{zodiac.name}{t.zodiacRecapSuffix}</div>
                <p className="love-zodiac-recap-text">{zodiac.loveStyle}</p>
              </div>
            </div>
          </div>
        )}

        {/* === AI 星盘寄语 === */}
        {activeTab === "ai" && aiEnhanced && (
          <div className="love-tab-pane">
            <div className="love-section-header">
              <div className="love-section-icon-lg">🔮</div>
              <div>
                <h2 className="love-section-h2">{t.aiH2}</h2>
                <p className="love-section-desc">{t.aiDesc}</p>
              </div>
            </div>
            <div className="love-ai-message">
              <div className="love-ai-message-content">{aiEnhanced}</div>
              <div className="love-ai-badge">{t.aiBadge}</div>
            </div>
          </div>
        )}
      </div>

      {/* 分享区域 */}
      <div className="love-share-section">
        <p className="love-share-title">{t.shareTitle}</p>
        <div className="love-share-btns">
          <button onClick={handleShare} className="love-share-btn love-share-copy">
            {copied ? t.shareCopied : t.shareCopy}
          </button>
          <button
            onClick={onReset}
            className="love-share-btn love-share-retest"
          >
            {t.shareRetest}
          </button>
        </div>
        <p className="love-share-hint">{t.shareHint}</p>
      </div>

      {/* 免责声明 */}
      <p className="love-disclaimer" style={{ marginTop: "2rem" }}>
        {t.reportDisclaimer}
      </p>
    </div>
  );
}
