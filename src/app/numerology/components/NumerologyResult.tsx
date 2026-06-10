"use client";

import React, { useState } from "react";
import type { NumerologyResult } from "../numerology-engine";
import { formatBirthdate } from "../numerology-engine";
import type { NumT, Lang } from "../numerology-i18n";

interface NumerologyResultProps {
  t: NumT;
  lang: Lang;
  result: NumerologyResult;
  onShare: () => void;
  onRecalculate: () => void;
}

type TabType = "overview" | "gifts" | "lessons" | "lucky";

export function NumerologyResultPanel({
  t,
  lang,
  result,
  onShare,
  onRecalculate,
}: NumerologyResultProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [showCalc, setShowCalc] = useState(false);

  const { profile, number, isMaster, birthdate, calculationSteps, keywords } = result;

  const tabs: Array<{ id: TabType; label: string; icon: string }> = [
    { id: "overview", label: t.tabOverview, icon: "🌟" },
    { id: "gifts", label: t.tabGifts, icon: "💎" },
    { id: "lessons", label: t.tabLessons, icon: "🔮" },
    { id: "lucky", label: t.tabLucky, icon: "🍀" },
  ];

  return (
    <div className="num-result-container">
      {/* 顶部核心数字展示 */}
      <div className="num-result-hero" style={{ "--num-color": profile.colorHex, "--num-color2": profile.secondaryColorHex } as React.CSSProperties}>
        {/* 光晕背景 */}
        <div className="num-hero-glow" />

        {/* 卓越数标记 */}
        {isMaster && (
          <div className="num-master-badge">
            {t.masterBadge}
          </div>
        )}

        {/* 核心数字 */}
        <div className="num-hero-number">
          <span className="num-hero-symbol">{profile.symbol}</span>
          <span className="num-core-number">{number}</span>
        </div>

        {/* 名称 */}
        <div className="num-hero-name">{profile.name}</div>

        {/* 一句话 */}
        <div className="num-hero-tagline">「{profile.tagline}」</div>

        {/* 关键词标签 */}
        <div className="num-hero-keywords">
          {keywords.map((kw) => (
            <span key={kw} className="num-keyword-tag">
              {kw}
            </span>
          ))}
        </div>

        {/* 出生日期 */}
        <div className="num-hero-birthdate">
          <span className="num-birthdate-icon">📅</span>
          {formatBirthdate(birthdate.year, birthdate.month, birthdate.day, lang)}
        </div>

        {/* 元素信息行 */}
        <div className="num-hero-meta">
          <div className="num-meta-item">
            <span className="num-meta-label">{t.metaElement}</span>
            <span className="num-meta-value">{profile.element}</span>
          </div>
          <div className="num-meta-divider" />
          <div className="num-meta-item">
            <span className="num-meta-label">{t.metaPlanet}</span>
            <span className="num-meta-value">{profile.planet}</span>
          </div>
          <div className="num-meta-divider" />
          <div className="num-meta-item">
            <span className="num-meta-label">{t.metaColor}</span>
            <span className="num-meta-value">{profile.color}</span>
          </div>
        </div>
      </div>

      {/* 计算过程折叠 */}
      <div className="num-calc-section">
        <button
          className="num-calc-toggle"
          onClick={() => setShowCalc(!showCalc)}
        >
          <span>{t.calcToggle}</span>
          <span className={`num-calc-arrow ${showCalc ? "num-calc-arrow-open" : ""}`}>▾</span>
        </button>
        {showCalc && (
          <div className="num-calc-steps">
            {calculationSteps.map((step, i) => (
              <div key={i} className="num-calc-step">
                <span className="num-step-label">{step.label}</span>
                <span className="num-step-value">{step.value}</span>
              </div>
            ))}
            <div className="num-calc-result">
              <span>{t.calcResultLabel}</span>
              <span className="num-calc-final">{number}</span>
            </div>
          </div>
        )}
      </div>

      {/* 标签页导航 */}
      <div className="num-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`num-tab ${activeTab === tab.id ? "num-tab-active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="num-tab-icon">{tab.icon}</span>
            <span className="num-tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 标签页内容 */}
      <div className="num-tab-content">
        {/* 性格特质 */}
        {activeTab === "overview" && (
          <div className="num-overview">
            {/* 特质标签云 */}
            <div className="num-traits-cloud">
              {profile.traits.map((trait) => (
                <span key={trait} className="num-trait-tag">
                  {trait}
                </span>
              ))}
            </div>

            {/* 正向特质 */}
            {profile.positiveTraits.map((trait, i) => (
              <div key={i} className="num-trait-card">
                <div className="num-trait-card-header">
                  <span className="num-trait-card-dot" />
                  <h3 className="num-trait-card-title">{trait.title}</h3>
                </div>
                <p className="num-trait-card-desc">{trait.description}</p>
              </div>
            ))}

            {/* 挑战面 */}
            <div className="num-challenges-section">
              <h3 className="num-section-title">
                <span className="num-section-icon">⚡</span>
                {t.growthChallenge}
              </h3>
              {profile.challenges.map((challenge, i) => (
                <div key={i} className="num-challenge-card">
                  <div className="num-challenge-header">
                    <span className="num-challenge-dot" />
                    <h4 className="num-challenge-title">{challenge.title}</h4>
                  </div>
                  <p className="num-challenge-desc">{challenge.description}</p>
                </div>
              ))}
            </div>

            {/* 感情观 */}
            <div className="num-love-section">
              <h3 className="num-section-title">
                <span className="num-section-icon">💗</span>
                {t.loveView}
              </h3>
              <p className="num-love-text">{profile.loveInsight}</p>
            </div>
          </div>
        )}

        {/* 潜能天赋 */}
        {activeTab === "gifts" && (
          <div className="num-gifts">
            <p className="num-gifts-intro">
              {t.giftsIntro}
            </p>
            {profile.gifts.map((gift, i) => (
              <div key={i} className="num-gift-card">
                <div className="num-gift-icon">{gift.icon}</div>
                <div className="num-gift-content">
                  <h3 className="num-gift-title">{gift.title}</h3>
                  <p className="num-gift-desc">{gift.description}</p>
                </div>
              </div>
            ))}

            {/* 适合方向 */}
            <div className="num-career-section">
              <h3 className="num-section-title">
                <span className="num-section-icon">🚀</span>
                {t.careerDirection}
              </h3>
              <div className="num-career-tags">
                {profile.careerPaths.map((career) => (
                  <span key={career} className="num-career-tag">
                    {career}
                  </span>
                ))}
              </div>
            </div>

            {/* 今年建议 */}
            <div className="num-advice-card">
              <div className="num-advice-header">
                <span>🌙</span>
                <h3 className="num-advice-title">{t.currentAdvice}</h3>
              </div>
              <p className="num-advice-text">{profile.yearAdvice}</p>
            </div>
          </div>
        )}

        {/* 人生课题 */}
        {activeTab === "lessons" && (
          <div className="num-lessons">
            <p className="num-lessons-intro">
              {t.lessonsIntro}
            </p>
            {profile.lifeLessons.map((lesson, i) => (
              <div key={i} className="num-lesson-card">
                <div className="num-lesson-number">{i + 1}</div>
                <div className="num-lesson-content">
                  <h3 className="num-lesson-title">{lesson.title}</h3>
                  <p className="num-lesson-desc">{lesson.description}</p>
                </div>
              </div>
            ))}

            {/* 灵性洞见 */}
            <div className="num-spiritual-card">
              <div className="num-spiritual-icon">{profile.emoji}</div>
              <blockquote className="num-spiritual-quote">
                {profile.spiritualMessage}
              </blockquote>
            </div>

            {/* 名人代表 */}
            <div className="num-celebrities-section">
              <h3 className="num-section-title">
                <span className="num-section-icon">🌟</span>
                {t.sameNumCeleb}
              </h3>
              <div className="num-celebrities-list">
                {profile.celebrities.map((person) => (
                  <span key={person} className="num-celebrity-tag">
                    {person}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 幸运指南 */}
        {activeTab === "lucky" && (
          <div className="num-lucky">
            <div className="num-lucky-grid">
              <div className="num-lucky-item">
                <div className="num-lucky-icon">🔢</div>
                <div className="num-lucky-label">{t.luckyNumber}</div>
                <div className="num-lucky-value">
                  {profile.luckyNumber.join(" · ")}
                </div>
              </div>
              <div className="num-lucky-item">
                <div className="num-lucky-icon">🎨</div>
                <div className="num-lucky-label">{t.luckyColor}</div>
                <div className="num-lucky-value">{profile.luckyColor}</div>
              </div>
              <div className="num-lucky-item">
                <div className="num-lucky-icon">📅</div>
                <div className="num-lucky-label">{t.luckyDay}</div>
                <div className="num-lucky-value">{profile.luckyDay}</div>
              </div>
              <div className="num-lucky-item">
                <div className="num-lucky-icon">💎</div>
                <div className="num-lucky-label">{t.luckyGem}</div>
                <div className="num-lucky-value">{profile.luckyGem}</div>
              </div>
            </div>

            {/* 颜色展示 */}
            <div className="num-color-showcase">
              <div
                className="num-color-block"
                style={{ background: `linear-gradient(135deg, ${profile.colorHex}, ${profile.secondaryColorHex})` }}
              />
              <p className="num-color-desc">{t.colorDescPrefix}{profile.color}</p>
            </div>

            {/* 灵性洞见 */}
            <div className="num-lucky-message">
              <span className="num-lucky-message-icon">{profile.symbol}</span>
              <p>{profile.spiritualMessage}</p>
            </div>
          </div>
        )}
      </div>

      {/* 底部操作区 */}
      <div className="num-result-actions">
        <button className="num-share-btn" onClick={onShare}>
          <span>🎴</span>
          <span>{t.shareBtn}</span>
        </button>
        <button className="num-recalc-btn" onClick={onRecalculate}>
          <span>↩</span>
          <span>{t.recalcBtn}</span>
        </button>
      </div>
    </div>
  );
}
