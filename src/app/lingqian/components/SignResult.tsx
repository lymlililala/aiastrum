"use client";
import React, { useState } from "react";
import { Sign, Deity, LUCK_COLORS } from "../lingqian-data";
import { DailyRecord, saveRecord, getTodayStr, formatDate, getLunarDayLabel } from "../lingqian-engine";

interface SignResultProps {
  sign: Sign;
  deity: Deity;
  onShare: () => void;
  onCheckin: () => void;
  onDrawAgain: () => void;
  alreadyCheckedIn: boolean;
}

type Tab = "poem" | "career" | "love" | "wealth" | "health";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "poem",   label: "签诗",   icon: "📜" },
  { id: "career", label: "事业",   icon: "💼" },
  { id: "love",   label: "姻缘",   icon: "💕" },
  { id: "wealth", label: "财运",   icon: "💰" },
  { id: "health", label: "健康",   icon: "🌿" },
];

export default function SignResult({
  sign,
  deity,
  onShare,
  onCheckin,
  onDrawAgain,
  alreadyCheckedIn,
}: SignResultProps) {
  const [activeTab, setActiveTab] = useState<Tab>("poem");
  const [checkedIn, setCheckedIn] = useState(alreadyCheckedIn);

  const luckColor = LUCK_COLORS[sign.luck];
  const today = getTodayStr();

  const handleCheckin = () => {
    if (checkedIn) return;
    const record: DailyRecord = {
      date: today,
      deityId: deity.id,
      signId: sign.id,
      luck: sign.luck,
      signName: sign.name,
      zen: sign.zen,
      drawnAt: Date.now(),
    };
    saveRecord(record);
    setCheckedIn(true);
    onCheckin();
  };

  return (
    <div className="lq-result-page">
      {/* 签文主卡 */}
      <div
        className="lq-result-card"
        style={{ "--deity-color": deity.color } as React.CSSProperties}
      >
        {/* 卡片头部 */}
        <div className="lq-result-card-header">
          <div className="lq-result-date-row">
            <span className="lq-result-date">{formatDate(today)}</span>
            <span className="lq-result-lunar">{getLunarDayLabel()}</span>
          </div>
          <div className="lq-result-deity-row">
            <span className="lq-result-deity-icon">{deity.icon}</span>
            <span className="lq-result-deity-name">{deity.name}</span>
          </div>
        </div>

        {/* 签号与吉凶 */}
        <div className="lq-result-sign-header">
          <div className="lq-result-sign-num">第 {sign.id} 签</div>
          <div className="lq-result-sign-name">{sign.name}</div>
          <div
            className="lq-result-luck-badge"
            style={{
              background: luckColor.bg,
              color: luckColor.text,
              borderColor: luckColor.border,
            }}
          >
            <span className="lq-luck-level">{sign.luck}</span>
            <span className="lq-luck-label">{luckColor.label}</span>
          </div>
        </div>

        {/* 签诗 */}
        <div className="lq-result-poem-preview">
          {sign.poem.map((line, i) => (
            <p key={i} className="lq-poem-line-preview">{line}</p>
          ))}
        </div>
      </div>

      {/* 详细解析 Tab */}
      <div className="lq-result-tabs">
        <div className="lq-tabs-nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`lq-tab-btn ${activeTab === tab.id ? "lq-tab-active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              style={{ "--deity-color": deity.color } as React.CSSProperties}
            >
              <span className="lq-tab-icon">{tab.icon}</span>
              <span className="lq-tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="lq-tab-content">
          {activeTab === "poem" && (
            <div className="lq-tab-poem">
              {/* 完整签诗 */}
              <div className="lq-poem-full">
                {sign.poem.map((line, i) => (
                  <p key={i} className="lq-poem-line">{line}</p>
                ))}
              </div>
              {/* 白话解析 */}
              <div className="lq-plain-text">
                <h4 className="lq-plain-title">✦ 白话解析</h4>
                <p className="lq-plain-content">{sign.plain}</p>
              </div>
              {/* 宜忌 */}
              <div className="lq-yi-ji-row">
                <div className="lq-yi-section">
                  <span className="lq-yi-label">宜</span>
                  <div className="lq-yi-tags">
                    {sign.yi.map((item) => (
                      <span key={item} className="lq-yi-tag">{item}</span>
                    ))}
                  </div>
                </div>
                <div className="lq-ji-section">
                  <span className="lq-ji-label">忌</span>
                  <div className="lq-ji-tags">
                    {sign.ji.map((item) => (
                      <span key={item} className="lq-ji-tag">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
              {/* 禅语 */}
              <div className="lq-zen-quote">
                <span className="lq-zen-quote-icon">🪔</span>
                <span className="lq-zen-quote-text">{sign.zen}</span>
              </div>
            </div>
          )}

          {activeTab === "career" && (
            <div className="lq-tab-interp">
              <div className="lq-interp-icon">💼</div>
              <h3 className="lq-interp-title">事业 · 学业</h3>
              <p className="lq-interp-content">{sign.interpretation.career}</p>
            </div>
          )}

          {activeTab === "love" && (
            <div className="lq-tab-interp">
              <div className="lq-interp-icon">💕</div>
              <h3 className="lq-interp-title">姻缘 · 感情</h3>
              <p className="lq-interp-content">{sign.interpretation.love}</p>
            </div>
          )}

          {activeTab === "wealth" && (
            <div className="lq-tab-interp">
              <div className="lq-interp-icon">💰</div>
              <h3 className="lq-interp-title">财运 · 投资</h3>
              <p className="lq-interp-content">{sign.interpretation.wealth}</p>
            </div>
          )}

          {activeTab === "health" && (
            <div className="lq-tab-interp">
              <div className="lq-interp-icon">🌿</div>
              <h3 className="lq-interp-title">健康 · 养生</h3>
              <p className="lq-interp-content">{sign.interpretation.health}</p>
            </div>
          )}
        </div>
      </div>

      {/* 操作按钮区 */}
      <div className="lq-result-actions">
        <button
          className={`lq-checkin-btn ${checkedIn ? "lq-checkin-done" : ""}`}
          onClick={handleCheckin}
          disabled={checkedIn}
          style={{ "--deity-color": deity.color } as React.CSSProperties}
        >
          {checkedIn ? "✓ 已打卡" : "📅 每日打卡"}
        </button>
        <button
          className="lq-share-btn"
          onClick={onShare}
          style={{ "--deity-color": deity.color } as React.CSSProperties}
        >
          🎨 生成日签海报
        </button>
      </div>

      {/* 再抽一签（仅当已打卡） */}
      <div className="lq-result-bottom">
        <button className="lq-again-btn" onClick={onDrawAgain}>
          换个神明问签 →
        </button>
      </div>
    </div>
  );
}
