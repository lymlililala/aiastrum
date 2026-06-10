"use client";
import React, { useState } from "react";
import { Sign, Deity, LUCK_COLORS } from "../lingqian-data";
import { DailyRecord, saveRecord, getTodayStr, formatDate, getLunarDayLabel } from "../lingqian-engine";
import { resolveLuckLevel, resolveLuckLabel } from "../lingqian-content-i18n";
import type { LingT, Lang } from "../lingqian-i18n";

interface SignResultProps {
  sign: Sign;
  deity: Deity;
  onShare: () => void;
  onCheckin: () => void;
  onDrawAgain: () => void;
  alreadyCheckedIn: boolean;
  t: LingT;
  lang: Lang;
}

type Tab = "poem" | "career" | "love" | "wealth" | "health";

export default function SignResult({
  sign,
  deity,
  onShare,
  onCheckin,
  onDrawAgain,
  alreadyCheckedIn,
  t,
  lang,
}: SignResultProps) {
  const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: "poem",   label: t.tabPoem,   icon: "📜" },
    { id: "career", label: t.tabCareer, icon: "💼" },
    { id: "love",   label: t.tabLove,   icon: "💕" },
    { id: "wealth", label: t.tabWealth, icon: "💰" },
    { id: "health", label: t.tabHealth, icon: "🌿" },
  ];
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
          <div className="lq-result-sign-num">{t.signNumPrefix} {sign.id} {t.signNumSuffix}</div>
          <div className="lq-result-sign-name">{sign.name}</div>
          <div
            className="lq-result-luck-badge"
            style={{
              background: luckColor.bg,
              color: luckColor.text,
              borderColor: luckColor.border,
            }}
          >
            <span className="lq-luck-level">{resolveLuckLevel(lang, sign.luck)}</span>
            <span className="lq-luck-label">{resolveLuckLabel(lang, sign.luck, luckColor.label)}</span>
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
                <h4 className="lq-plain-title">{t.plainTitle}</h4>
                <p className="lq-plain-content">{sign.plain}</p>
              </div>
              {/* 宜忌 */}
              <div className="lq-yi-ji-row">
                <div className="lq-yi-section">
                  <span className="lq-yi-label">{t.yiLabel}</span>
                  <div className="lq-yi-tags">
                    {sign.yi.map((item) => (
                      <span key={item} className="lq-yi-tag">{item}</span>
                    ))}
                  </div>
                </div>
                <div className="lq-ji-section">
                  <span className="lq-ji-label">{t.jiLabel}</span>
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
              <h3 className="lq-interp-title">{t.interpCareerTitle}</h3>
              <p className="lq-interp-content">{sign.interpretation.career}</p>
            </div>
          )}

          {activeTab === "love" && (
            <div className="lq-tab-interp">
              <div className="lq-interp-icon">💕</div>
              <h3 className="lq-interp-title">{t.interpLoveTitle}</h3>
              <p className="lq-interp-content">{sign.interpretation.love}</p>
            </div>
          )}

          {activeTab === "wealth" && (
            <div className="lq-tab-interp">
              <div className="lq-interp-icon">💰</div>
              <h3 className="lq-interp-title">{t.interpWealthTitle}</h3>
              <p className="lq-interp-content">{sign.interpretation.wealth}</p>
            </div>
          )}

          {activeTab === "health" && (
            <div className="lq-tab-interp">
              <div className="lq-interp-icon">🌿</div>
              <h3 className="lq-interp-title">{t.interpHealthTitle}</h3>
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
          {checkedIn ? t.checkinDone : t.checkinBtn}
        </button>
        <button
          className="lq-share-btn"
          onClick={onShare}
          style={{ "--deity-color": deity.color } as React.CSSProperties}
        >
          {t.shareBtn}
        </button>
      </div>

      {/* 再抽一签（仅当已打卡） */}
      <div className="lq-result-bottom">
        <button className="lq-again-btn" onClick={onDrawAgain}>
          {t.drawAgainBtn}
        </button>
      </div>
    </div>
  );
}
