"use client";

import { useState } from "react";
import ZiweiChartComponent from "./ZiweiChart";
import { STAR_COLORS, MAIN_STARS, resolveElement, resolveYinYang, resolveStarDisplay } from "../ziwei-data";
import type { ZiweiChart } from "../ziwei-engine";
import type { ZiweiT, Lang } from "../ziwei-i18n";

interface ZiweiFullReportProps {
  chart: ZiweiChart;
  onReset: () => void;
  t: ZiweiT;
  lang: Lang;
}

type TabKey = "chart" | "personality" | "wealth" | "career" | "love" | "daxian";

export default function ZiweiFullReport({ chart, onReset, t, lang }: ZiweiFullReportProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("chart");
  const [chartMode, setChartMode] = useState<"modern" | "classic">("modern");
  const [copied, setCopied]       = useState(false);

  const currentYear = new Date().getFullYear();

  const mingColor = STAR_COLORS[chart.mingStarName] ?? "#C77DFF";
  const mingStarData = MAIN_STARS[chart.mingStarName];

  const tabs: { key: TabKey; icon: string; label: string }[] = [
    { key: "chart",       icon: "⊹",  label: t.tabChart },
    { key: "personality", icon: "◆",  label: t.tabPersonality },
    { key: "wealth",      icon: "◈",  label: t.tabWealth },
    { key: "career",      icon: "⟁",  label: t.tabCareer },
    { key: "love",        icon: "◉",  label: t.tabLove },
    { key: "daxian",      icon: "◌",  label: t.tabDaxian },
  ];

  const handleShare = async () => {
    const text = `${t.shareTextL1}\n${chart.mingStarDisplay}${t.shareTextZuo}${chart.wuXingJu}\n${chart.personalityLabels.join(t.shareTextJoin)}\n\n${t.shareTextCTA}`;
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch { /* ignore */ }
  };

  return (
    <div className="zw-full-report">
      {/* 顶部 */}
      <div className="zw-report-header">
        <div className="zw-report-header-glow" />
        <div className="zw-report-header-content">
          <div className="zw-report-unlocked">{t.unlocked}</div>
          <h1 className="zw-report-name">{chart.name}{t.reportNameSuffix}</h1>
          <div className="zw-report-main-star" style={{ color: mingColor }}>
            {chart.mingStarDisplay}{t.zuoMingSuffix}
          </div>
          <p className="zw-report-ganzhi">
            {chart.yearGan}{chart.yearZhi}{t.unitYear} · {chart.monthGan}{chart.monthZhi}{t.unitMonth} · {chart.dayGan}{chart.dayZhi}{t.unitDay}
            {chart.birthHour >= 0 ? ` · ${chart.hourZhi}${t.hourSuffix}` : ""}
          </p>
          <div className="zw-report-tags">
            {chart.personalityLabels.map(l => (
              <span key={l} className="zw-report-tag" style={{ borderColor: mingColor, color: mingColor }}>{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="zw-tabs">
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`zw-tab ${activeTab === tab.key ? "zw-tab-active" : ""}`}>
            <span className="zw-tab-icon">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="zw-tab-content">
        {/* === 星盘 Tab === */}
        {activeTab === "chart" && (
          <div className="zw-tab-pane">
            <ZiweiChartComponent chart={chart} mode={chartMode} onModeChange={setChartMode} t={t} lang={lang} />
          </div>
        )}

        {/* === 命格 Tab === */}
        {activeTab === "personality" && (
          <div className="zw-tab-pane">
            <div className="zw-section-header">
              <div className="zw-section-icon-lg" style={{ color: mingColor }}>◆</div>
              <div>
                <h2 className="zw-section-h2">{t.secPersonalityH}</h2>
                <p className="zw-section-sub">{chart.mingStarDisplay}{t.secPersonalitySubPost}</p>
              </div>
            </div>

            {/* 主星卡片 */}
            <div className="zw-star-card" style={{ borderColor: mingColor }}>
              <div className="zw-star-card-name" style={{ color: mingColor }}>
                {chart.mingStarDisplay}
              </div>
              <div className="zw-star-card-category">{mingStarData?.category[lang]}</div>
              <p className="zw-star-card-personality">{mingStarData?.personality[lang]}</p>
            </div>

            {/* 性格标签 */}
            <div className="zw-personality-grid">
              {(MAIN_STARS[chart.mingStarName] ? [
                { icon: "◆", label: t.piLabelPersonality, value: chart.personalityLabels.join(t.shareTextJoin) },
                { icon: "⚡", label: t.piLabelElement, value: `${resolveElement(mingStarData!.element, lang)}${t.elementSuffix}${resolveYinYang(mingStarData!.yin_yang, lang)}${t.yinyangSuffix}` },
                { icon: "🌟", label: t.piLabelWuxing, value: `${chart.wuXingJu}${t.wuxingValueMid}${chart.startAge}${t.wuxingValuePost}` },
              ] : []).map(item => (
                <div key={item.label} className="zw-personality-item">
                  <div className="zw-pi-icon">{item.icon}</div>
                  <div className="zw-pi-label">{item.label}</div>
                  <div className="zw-pi-value">{item.value}</div>
                </div>
              ))}
            </div>

            {/* 详细解读 */}
            <div className="zw-reading-block">
              <div className="zw-reading-title">{t.readingPersonalityTitle}</div>
              <p className="zw-reading-text">{chart.mingReading}</p>
            </div>

            {chart.aiEnhanced && (
              <div className="zw-ai-block">
                <div className="zw-ai-block-label">{t.aiTitle}</div>
                <p className="zw-ai-block-text">{chart.aiEnhanced}</p>
              </div>
            )}
          </div>
        )}

        {/* === 财富 Tab === */}
        {activeTab === "wealth" && (
          <div className="zw-tab-pane">
            <div className="zw-section-header">
              <div className="zw-section-icon-lg">◈</div>
              <div>
                <h2 className="zw-section-h2">{t.secWealthH}</h2>
                <p className="zw-section-sub">{t.secWealthSub}</p>
              </div>
            </div>

            <div className="zw-reading-block zw-reading-wealth">
              <div className="zw-reading-title">{t.readingWealthTitle}</div>
              <p className="zw-reading-text" style={{ whiteSpace: "pre-line" }}>{chart.wealthReading}</p>
            </div>

            <div className="zw-palace-spotlight">
              <div className="zw-spotlight-title">{t.spotlightWealth}</div>
              {chart.palaces[4] && (
                <>
                  <div className="zw-spotlight-stars">
                    {t.spotlightStars}{chart.palaces[4].mainStars.length > 0 ? chart.palaces[4].mainStars.map(s => resolveStarDisplay(s, lang)).join(t.starsJoin) : t.noMainStar}
                  </div>
                  {chart.palaces[4].siHua.length > 0 && (
                    <div className="zw-spotlight-sihua">
                      {t.spotlightSiHua}{chart.palaces[4].siHua.map(s => `${t.siHuaPrefix}${s}`).join(" ")}
                    </div>
                  )}
                  <p className="zw-spotlight-desc">{chart.palaces[4].mainStars.length > 0
                    ? `${t.wealthSpotPre}${resolveStarDisplay(chart.palaces[4].mainStars[0]!, lang)}${t.wealthSpotMid}${MAIN_STARS[chart.palaces[4].mainStars[0]!]?.wealth_hint[lang] ?? ""}`
                    : t.wealthSpotEmpty}</p>
                </>
              )}
            </div>

            <div className="zw-advice-box">
              <div className="zw-advice-title">{t.adviceWealthTitle}</div>
              <p className="zw-advice-text">
                {t.adviceWealthText}
              </p>
            </div>
          </div>
        )}

        {/* === 事业 Tab === */}
        {activeTab === "career" && (
          <div className="zw-tab-pane">
            <div className="zw-section-header">
              <div className="zw-section-icon-lg">⟁</div>
              <div>
                <h2 className="zw-section-h2">{t.secCareerH}</h2>
                <p className="zw-section-sub">{t.secCareerSub}</p>
              </div>
            </div>

            <div className="zw-reading-block zw-reading-career">
              <div className="zw-reading-title">{t.readingCareerTitle}</div>
              <p className="zw-reading-text" style={{ whiteSpace: "pre-line" }}>{chart.careerReading}</p>
            </div>

            <div className="zw-palace-spotlight">
              <div className="zw-spotlight-title">{t.spotlightCareer}</div>
              {chart.palaces[8] && (
                <>
                  <div className="zw-spotlight-stars">
                    {t.spotlightStars}{chart.palaces[8].mainStars.length > 0 ? chart.palaces[8].mainStars.map(s => resolveStarDisplay(s, lang)).join(t.starsJoin) : t.careerEmptyStars}
                  </div>
                  <p className="zw-spotlight-desc">{mingStarData?.career_hint[lang]}</p>
                </>
              )}
            </div>

            <div className="zw-career-grid">
              {[
                { label: t.careerLabelType, value: ["紫微", "七杀", "破军", "廉贞"].includes(chart.mingStarName) ? t.careerValueLead : t.careerValuePro },
                { label: t.careerLabelWealth, value: ["贪狼", "廉贞", "破军"].includes(chart.mingStarName) ? t.careerValuePian : t.careerValueZheng },
                { label: t.careerLabelField, value: mingStarData?.career_hint[lang]?.split(/[，,]/)[0] ?? t.careerFieldDefault },
              ].map(item => (
                <div key={item.label} className="zw-career-item">
                  <div className="zw-ci-label">{item.label}</div>
                  <div className="zw-ci-value">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === 情感 Tab === */}
        {activeTab === "love" && (
          <div className="zw-tab-pane">
            <div className="zw-section-header">
              <div className="zw-section-icon-lg">◉</div>
              <div>
                <h2 className="zw-section-h2">{t.secLoveH}</h2>
                <p className="zw-section-sub">{t.secLoveSub}</p>
              </div>
            </div>

            <div className="zw-reading-block zw-reading-love">
              <div className="zw-reading-title">{t.readingLoveTitle}</div>
              <p className="zw-reading-text" style={{ whiteSpace: "pre-line" }}>{chart.loveReading}</p>
            </div>

            <div className="zw-palace-spotlight">
              <div className="zw-spotlight-title">{t.spotlightLove}</div>
              {chart.palaces[2] && (
                <>
                  <div className="zw-spotlight-stars">
                    {t.spotlightStars}{chart.palaces[2].mainStars.length > 0 ? chart.palaces[2].mainStars.map(s => resolveStarDisplay(s, lang)).join(t.starsJoin) : t.loveEmptyStars}
                  </div>
                  <p className="zw-spotlight-desc">{mingStarData?.love_hint[lang]}</p>
                </>
              )}
            </div>

            <div className="zw-reading-block">
              <div className="zw-reading-title">{t.readingGuirenTitle}</div>
              <p className="zw-reading-text" style={{ whiteSpace: "pre-line" }}>{chart.guirenReading}</p>
            </div>
          </div>
        )}

        {/* === 大限 Tab === */}
        {activeTab === "daxian" && (
          <div className="zw-tab-pane">
            <div className="zw-section-header">
              <div className="zw-section-icon-lg">◌</div>
              <div>
                <h2 className="zw-section-h2">{t.secDaxianH}</h2>
                <p className="zw-section-sub">{t.secDaxianSubPre}{currentYear}{t.secDaxianSubPost}</p>
              </div>
            </div>

            <div className="zw-reading-block zw-reading-daxian">
              <div className="zw-reading-title">{t.readingDaxianTitle}</div>
              <p className="zw-reading-text">{chart.daxianReading}</p>
            </div>

            <div className="zw-reading-block">
              <div className="zw-reading-title">{t.liunianTitlePre}{currentYear}{t.liunianTitlePost}</div>
              <p className="zw-reading-text">{chart.liunianReading}</p>
            </div>

            {/* 大限时间轴 */}
            <div className="zw-daxian-timeline">
              <div className="zw-timeline-title">{t.timelineTitle}</div>
              {chart.palaces.slice(0, 6).map((pd, i) => {
                const age = currentYear - chart.birthYear;
                const isCurrent = age >= pd.daXian.startAge && age <= pd.daXian.endAge;
                return (
                  <div key={i} className={`zw-timeline-item ${isCurrent ? "zw-timeline-current" : ""}`}>
                    <div className="zw-tl-age">{pd.daXian.startAge}-{pd.daXian.endAge}{t.ageSuffix}</div>
                    <div className="zw-tl-palace">{pd.palace.name[lang]}</div>
                    <div className="zw-tl-stars">
                      {pd.mainStars.length > 0 ? pd.mainStars.map(s => resolveStarDisplay(s, lang)).join(" ") : t.timelineEmpty}
                    </div>
                    {isCurrent && <div className="zw-tl-current-badge">{t.timelineCurrent}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 分享 */}
      <div className="zw-share-section">
        <p className="zw-share-title">{t.shareTitle}</p>
        <div className="zw-share-btns">
          <button onClick={handleShare} className="zw-share-btn zw-share-copy">
            {copied ? t.shareCopied : t.shareCopy}
          </button>
          <button onClick={onReset} className="zw-share-btn zw-share-reset">{t.shareReset}</button>
        </div>
        <p className="zw-share-hint">{t.shareHint}</p>
      </div>

      <p className="zw-disclaimer">
        {t.reportDisclaimer}
      </p>
    </div>
  );
}
