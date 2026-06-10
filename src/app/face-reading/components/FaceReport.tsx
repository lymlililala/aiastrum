"use client";

import React, { useState } from "react";
import type { FaceReadingReport } from "../face-reading-data";
import type { FaceT } from "../face-reading-i18n";

interface FaceReportProps {
  t: FaceT;
  report: FaceReadingReport;
  imageUrl: string;
  onShare: () => void;
  onRetry: () => void;
}

// 分数弧形组件
function ScoreArc({ score, label }: { score: number; label: string }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="fr-score-arc-wrapper">
      <svg width="140" height="140" viewBox="0 0 140 140" className="fr-score-svg">
        {/* 背景圆弧 */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="8"
        />
        {/* 进度圆弧 */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 70 70)"
          className="fr-score-arc-progress"
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F5FF" />
            <stop offset="100%" stopColor="#7B2FFF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="fr-score-center">
        <span className="fr-score-number">{score}</span>
        <span className="fr-score-label">{label}</span>
      </div>
    </div>
  );
}

// 维度条形图
function DimensionBar({ name, icon, score, label, insight, index }: {
  name: string;
  icon: string;
  score: number;
  label: string;
  insight: string;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="fr-dimension-item"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="fr-dim-header">
        <div className="fr-dim-left">
          <span className="fr-dim-icon">{icon}</span>
          <span className="fr-dim-name">{name}</span>
        </div>
        <div className="fr-dim-right">
          <span className="fr-dim-label">{label}</span>
          <span className="fr-dim-score">{score}</span>
          <span className="fr-dim-arrow">{expanded ? "▲" : "▼"}</span>
        </div>
      </div>
      <div className="fr-dim-bar">
        <div
          className="fr-dim-fill"
          style={{ width: `${score}%` }}
        />
      </div>
      {expanded && (
        <div className="fr-dim-insight">
          <p>{insight}</p>
        </div>
      )}
    </div>
  );
}

export function FaceReport({ t, report, imageUrl, onShare, onRetry }: FaceReportProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "dimensions" | "advice">("overview");
  const modeName = report.mode === "face" ? t.reportFace : t.reportPalm;

  return (
    <div className="fr-report-container">
      {/* 顶部英雄区 */}
      <div className="fr-report-hero">
        {/* 背景光晕 */}
        <div
          className="fr-hero-glow"
          style={{ background: report.talentLabel.gradient }}
        />

        {/* 照片 + 天赋标签 */}
        <div className="fr-hero-photo-wrapper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={t.photoAlt} className="fr-hero-photo" />
          <div className="fr-hero-photo-ring" />
        </div>

        {/* 天赋标签卡片 */}
        <div
          className="fr-talent-card"
          style={{ background: report.talentLabel.gradient }}
        >
          <div className="fr-talent-rarity">
            {report.talentLabel.rarity === "传说" && "⚡"}
            {report.talentLabel.rarity === "史诗" && "💎"}
            {report.talentLabel.rarity === "稀有" && "✨"}
            {report.talentLabel.rarity === "普通" && "🌟"}
            {report.talentLabel.rarity === "传说" && t.rarityLegend}
            {report.talentLabel.rarity === "史诗" && t.rarityEpic}
            {report.talentLabel.rarity === "稀有" && t.rarityRare}
            {report.talentLabel.rarity === "普通" && t.rarityCommon}
          </div>
          <div className="fr-talent-icon">{report.talentLabel.icon}</div>
          <div className="fr-talent-name">{report.talentLabel.name}</div>
        </div>

        {/* 总分 */}
        <ScoreArc score={report.overallScore} label={t.previewScoreLabel} />

        {/* 标题 */}
        <div className="fr-hero-title">
          <h2>{t.reportTitlePre}{modeName}{t.reportTitlePost}</h2>
          <p className="fr-hero-subtitle">{report.talentLabel.description}</p>
        </div>
      </div>

      {/* Tab 导航 */}
      <div className="fr-report-tabs">
        {[
          { id: "overview", label: t.tabOverview },
          { id: "dimensions", label: t.tabDimensions },
          { id: "advice", label: t.tabAdvice },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`fr-tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 内容 */}
      <div className="fr-tab-content">
        {/* 总览 */}
        {activeTab === "overview" && (
          <div className="fr-overview">
            {/* AI 解读 */}
            <div className="fr-overview-card">
              <div className="fr-card-title">
                <span>🤖</span> {t.cardAiTitle}
              </div>
              <p className="fr-overview-text">{report.overview}</p>
            </div>

            {/* 三大优势 */}
            <div className="fr-overview-card">
              <div className="fr-card-title">
                <span>⚡</span> {t.cardStrengths}
              </div>
              <div className="fr-strengths-list">
                {report.strengths.map((s, i) => (
                  <div key={i} className="fr-strength-item">
                    <span className="fr-strength-num">0{i + 1}</span>
                    <span className="fr-strength-text">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 专属格言 */}
            <div className="fr-quote-card">
              <div className="fr-quote-mark">"</div>
              <p className="fr-quote-text">{report.lifeQuote}</p>
              <div className="fr-quote-mark closing">"</div>
            </div>
          </div>
        )}

        {/* 维度评分 */}
        {activeTab === "dimensions" && (
          <div className="fr-dimensions">
            <p className="fr-dimensions-hint">
              {t.dimensionsHint}
            </p>
            {report.dimensions.map((dim, i) => (
              <DimensionBar
                key={dim.name}
                {...dim}
                index={i}
              />
            ))}
          </div>
        )}

        {/* 天赋解析 */}
        {activeTab === "advice" && (
          <div className="fr-advice">
            {/* 机遇提示 */}
            <div className="fr-overview-card">
              <div className="fr-card-title">
                <span>🌟</span> {t.cardOpportunities}
              </div>
              <div className="fr-opportunities-list">
                {report.opportunities.map((opp, i) => (
                  <div key={i} className="fr-opportunity-item">
                    <span className="fr-opp-icon">▶</span>
                    <span className="fr-opp-text">{opp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 免责声明 */}
            <div className="fr-disclaimer-card">
              {report.disclaimer}
            </div>
          </div>
        )}
      </div>

      {/* 底部操作区 */}
      <div className="fr-report-actions">
        {/* 分享文案预览 */}
        <div className="fr-share-preview">
          <span className="fr-share-preview-icon">💬</span>
          <p>{report.shareText}</p>
        </div>

        {/* 分享按钮 */}
        <button className="fr-btn-share" onClick={onShare}>
          <span>📤</span>
          <span>{t.btnSharePoster}</span>
        </button>

        {/* 重测按钮 */}
        <button className="fr-btn-retry" onClick={onRetry}>
          <span>🔄</span>
          <span>{t.btnRetryPre}{report.mode === "face" ? t.btnRetryFace : t.btnRetryPalm}{t.btnRetryPost}</span>
        </button>
      </div>
    </div>
  );
}
