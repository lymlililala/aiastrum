"use client";

import { useState } from "react";
import ZiweiChartComponent from "./ZiweiChart";
import { STAR_COLORS, MAIN_STARS } from "../ziwei-data";
import type { ZiweiChart } from "../ziwei-engine";

interface ZiweiFullReportProps {
  chart: ZiweiChart;
  onReset: () => void;
}

type TabKey = "chart" | "personality" | "wealth" | "career" | "love" | "daxian";

export default function ZiweiFullReport({ chart, onReset }: ZiweiFullReportProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("chart");
  const [chartMode, setChartMode] = useState<"modern" | "classic">("modern");
  const [copied, setCopied]       = useState(false);

  const mingColor = STAR_COLORS[chart.mingStarName] ?? "#C77DFF";
  const mingStarData = MAIN_STARS[chart.mingStarName];

  const tabs: { key: TabKey; icon: string; label: string }[] = [
    { key: "chart",       icon: "⊹",  label: "星盘" },
    { key: "personality", icon: "◆",  label: "命格" },
    { key: "wealth",      icon: "◈",  label: "财富" },
    { key: "career",      icon: "⟁",  label: "事业" },
    { key: "love",        icon: "◉",  label: "情感" },
    { key: "daxian",      icon: "◌",  label: "大限" },
  ];

  const handleShare = async () => {
    const text = `我的东方星盘 ✦\n${chart.mingStarName}坐命 · ${chart.wuXingJu}\n${chart.personalityLabels.join(" · ")}\n\n👉 测测你的紫微斗数：`;
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch { /* ignore */ }
  };

  return (
    <div className="zw-full-report">
      {/* 顶部 */}
      <div className="zw-report-header">
        <div className="zw-report-header-glow" />
        <div className="zw-report-header-content">
          <div className="zw-report-unlocked">✦ 完整星盘已解锁</div>
          <h1 className="zw-report-name">{chart.name} 的东方星盘</h1>
          <div className="zw-report-main-star" style={{ color: mingColor }}>
            {chart.mingStarName}坐命
          </div>
          <p className="zw-report-ganzhi">
            {chart.yearGan}{chart.yearZhi}年 · {chart.monthGan}{chart.monthZhi}月 · {chart.dayGan}{chart.dayZhi}日
            {chart.birthHour >= 0 ? ` · ${chart.hourZhi}时` : ""}
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
            <ZiweiChartComponent chart={chart} mode={chartMode} onModeChange={setChartMode} />
          </div>
        )}

        {/* === 命格 Tab === */}
        {activeTab === "personality" && (
          <div className="zw-tab-pane">
            <div className="zw-section-header">
              <div className="zw-section-icon-lg" style={{ color: mingColor }}>◆</div>
              <div>
                <h2 className="zw-section-h2">命宫 · 核心人格</h2>
                <p className="zw-section-sub">{chart.mingStarName}坐命 · 天赋格局解析</p>
              </div>
            </div>

            {/* 主星卡片 */}
            <div className="zw-star-card" style={{ borderColor: mingColor }}>
              <div className="zw-star-card-name" style={{ color: mingColor }}>
                {chart.mingStarName}
              </div>
              <div className="zw-star-card-category">{mingStarData?.category}</div>
              <p className="zw-star-card-personality">{mingStarData?.personality}</p>
            </div>

            {/* 性格标签 */}
            <div className="zw-personality-grid">
              {(MAIN_STARS[chart.mingStarName] ? [
                { icon: "◆", label: "人格标签", value: chart.personalityLabels.join(" · ") },
                { icon: "⚡", label: "元素能量", value: `${mingStarData?.element}行 · ${mingStarData?.yin_yang}性` },
                { icon: "🌟", label: "五行局", value: `${chart.wuXingJu}，${chart.startAge}岁起运` },
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
              <div className="zw-reading-title">☽ 命格深度解读</div>
              <p className="zw-reading-text">{chart.mingReading}</p>
            </div>

            {chart.aiEnhanced && (
              <div className="zw-ai-block">
                <div className="zw-ai-block-label">✦ AI 命格总评</div>
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
                <h2 className="zw-section-h2">财帛宫 · 财富基因</h2>
                <p className="zw-section-sub">你天生的财富密码与赚钱方式</p>
              </div>
            </div>

            <div className="zw-reading-block zw-reading-wealth">
              <div className="zw-reading-title">💰 财富格局</div>
              <p className="zw-reading-text" style={{ whiteSpace: "pre-line" }}>{chart.wealthReading}</p>
            </div>

            <div className="zw-palace-spotlight">
              <div className="zw-spotlight-title">财帛宫概况</div>
              {chart.palaces[4] && (
                <>
                  <div className="zw-spotlight-stars">
                    主星：{chart.palaces[4].mainStars.length > 0 ? chart.palaces[4].mainStars.join("、") : "无主星（空宫）"}
                  </div>
                  {chart.palaces[4].siHua.length > 0 && (
                    <div className="zw-spotlight-sihua">
                      四化：{chart.palaces[4].siHua.map(s => `化${s}`).join(" ")}
                    </div>
                  )}
                  <p className="zw-spotlight-desc">{chart.palaces[4].mainStars.length > 0
                    ? `财帛宫有${chart.palaces[4].mainStars[0]}，${MAIN_STARS[chart.palaces[4].mainStars[0]!]?.wealth_hint ?? "财运格局稳健。"}`
                    : "财帛宫空宫，财运通过对宫田宅宫来引动，需关注田宅宫的星曜能量。"}</p>
                </>
              )}
            </div>

            <div className="zw-advice-box">
              <div className="zw-advice-title">🚀 财富提升建议</div>
              <p className="zw-advice-text">
                根据你的命盘格局，建议将重心放在自身专业技能的深度积累，
                财富往往在你专注某件事并达到精深程度后，如约而至。
                同时留意贵人财，人际圈子的升级是你财富格局突破的关键。
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
                <h2 className="zw-section-h2">官禄宫 · 事业赛道</h2>
                <p className="zw-section-sub">你最适合的事业格局与职业方向</p>
              </div>
            </div>

            <div className="zw-reading-block zw-reading-career">
              <div className="zw-reading-title">⚡ 事业格局</div>
              <p className="zw-reading-text" style={{ whiteSpace: "pre-line" }}>{chart.careerReading}</p>
            </div>

            <div className="zw-palace-spotlight">
              <div className="zw-spotlight-title">官禄宫概况</div>
              {chart.palaces[8] && (
                <>
                  <div className="zw-spotlight-stars">
                    主星：{chart.palaces[8].mainStars.length > 0 ? chart.palaces[8].mainStars.join("、") : "空宫（通过对宫奴仆宫引动）"}
                  </div>
                  <p className="zw-spotlight-desc">{mingStarData?.career_hint}</p>
                </>
              )}
            </div>

            <div className="zw-career-grid">
              {[
                { label: "创业 vs 打工", value: ["紫微", "七杀", "破军", "廉贞"].includes(chart.mingStarName) ? "更适合创业/领导岗位" : "适合专业型/打工路线" },
                { label: "正财 vs 偏财", value: ["贪狼", "廉贞", "破军"].includes(chart.mingStarName) ? "偏财运较旺" : "正财格局稳健" },
                { label: "行业方向", value: mingStarData?.career_hint?.split("，")[0] ?? "多元发展" },
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
                <h2 className="zw-section-h2">夫妻宫 · 正缘画像</h2>
                <p className="zw-section-sub">命中注定的那个人是什么样</p>
              </div>
            </div>

            <div className="zw-reading-block zw-reading-love">
              <div className="zw-reading-title">💫 正缘与感情</div>
              <p className="zw-reading-text" style={{ whiteSpace: "pre-line" }}>{chart.loveReading}</p>
            </div>

            <div className="zw-palace-spotlight">
              <div className="zw-spotlight-title">夫妻宫概况</div>
              {chart.palaces[2] && (
                <>
                  <div className="zw-spotlight-stars">
                    主星：{chart.palaces[2].mainStars.length > 0 ? chart.palaces[2].mainStars.join("、") : "空宫"}
                  </div>
                  <p className="zw-spotlight-desc">{mingStarData?.love_hint}</p>
                </>
              )}
            </div>

            <div className="zw-reading-block">
              <div className="zw-reading-title">🔮 贵人指南</div>
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
                <h2 className="zw-section-h2">大限流年 · 人生轨迹</h2>
                <p className="zw-section-sub">十年大限与{new Date().getFullYear()}年流年运势</p>
              </div>
            </div>

            <div className="zw-reading-block zw-reading-daxian">
              <div className="zw-reading-title">⏳ 当前大限</div>
              <p className="zw-reading-text">{chart.daxianReading}</p>
            </div>

            <div className="zw-reading-block">
              <div className="zw-reading-title">🌟 {new Date().getFullYear()}年流年运势</div>
              <p className="zw-reading-text">{chart.liunianReading}</p>
            </div>

            {/* 大限时间轴 */}
            <div className="zw-daxian-timeline">
              <div className="zw-timeline-title">大限时间轴</div>
              {chart.palaces.slice(0, 6).map((pd, i) => {
                const age = new Date().getFullYear() - chart.birthYear;
                const isCurrent = age >= pd.daXian.startAge && age <= pd.daXian.endAge;
                return (
                  <div key={i} className={`zw-timeline-item ${isCurrent ? "zw-timeline-current" : ""}`}>
                    <div className="zw-tl-age">{pd.daXian.startAge}-{pd.daXian.endAge}岁</div>
                    <div className="zw-tl-palace">{pd.palace.name}</div>
                    <div className="zw-tl-stars">
                      {pd.mainStars.length > 0 ? pd.mainStars.join(" ") : "空宫"}
                    </div>
                    {isCurrent && <div className="zw-tl-current-badge">当前</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 分享 */}
      <div className="zw-share-section">
        <p className="zw-share-title">分享你的东方星盘</p>
        <div className="zw-share-btns">
          <button onClick={handleShare} className="zw-share-btn zw-share-copy">
            {copied ? "✓ 已复制" : "📋 复制分享文案"}
          </button>
          <button onClick={onReset} className="zw-share-btn zw-share-reset">↺ 重新排盘</button>
        </div>
        <p className="zw-share-hint">分享给朋友，一起探索东方星盘的奥秘</p>
      </div>

      <p className="zw-disclaimer">
        ⚠ 紫微斗数为传统文化参考工具，请理性看待排盘结果，切勿将其作为重大决策的唯一依据。
      </p>
    </div>
  );
}
