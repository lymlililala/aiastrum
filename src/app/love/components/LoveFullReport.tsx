"use client";

import { useState } from "react";
import type { LoveReport } from "../love-data";

interface LoveFullReportProps {
  report: LoveReport;
  onReset: () => void;
}

type TabKey = "forecast" | "soulmate" | "advice" | "ai";

export default function LoveFullReport({ report, onReset }: LoveFullReportProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("forecast");
  const [copied, setCopied] = useState(false);

  const { zodiac, score, peachForecast, soulmate, loveAdvice, aiEnhanced } = report;

  const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: "forecast", label: "桃花运势", icon: "🌸" },
    { key: "soulmate", label: "正缘画像", icon: "💫" },
    { key: "advice",   label: "情感建议", icon: "✨" },
    ...(aiEnhanced ? [{ key: "ai" as TabKey, label: "星盘寄语", icon: "🔮" }] : []),
  ];

  const handleShare = async () => {
    const text = `我的姻缘报告 ✦\n姻缘指数：${score.overall}分（${score.label}）\n${score.shortComment}\n\n👉 测测你的姻缘：`;
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
          <div className="love-report-unlocked-badge">✦ 完整报告已解锁</div>
          <div className="love-report-name">{report.name} 的专属姻缘报告</div>
          <div className="love-report-zodiac">
            {zodiac.symbol} {zodiac.name} · {report.birthYear}年{report.birthMonth}月{report.birthDay}日
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
                <h2 className="love-section-h2">近期桃花运势</h2>
                <p className="love-section-desc">未来3个月感情磁场解析</p>
              </div>
            </div>

            <div className="love-forecast-list">
              {[
                { label: "本月", text: peachForecast.month1 },
                { label: "次月", text: peachForecast.month2 },
                { label: "第三月", text: peachForecast.month3 },
              ].map((item, i) => (
                <div key={i} className="love-forecast-item">
                  <div className="love-forecast-month">{item.label}</div>
                  <p className="love-forecast-text">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="love-peak-card">
              <div className="love-peak-title">✦ 桃花旺盛期</div>
              <p className="love-peak-text">
                你的姻缘磁场将在 <strong>{peachForecast.peak}</strong> 前后迎来最强的感情能量汇聚，
                这段时间主动出击，成功率将大幅提升。
              </p>
            </div>

            <div className="love-advice-box">
              <div className="love-advice-box-title">🌟 提升桃花运建议</div>
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
                <h2 className="love-section-h2">命中正缘画像</h2>
                <p className="love-section-desc">星盘推算你的命定之人特征</p>
              </div>
            </div>

            {[
              { icon: "👤", title: "外貌特征", text: soulmate.appearance },
              { icon: "💭", title: "性格倾向", text: soulmate.personality },
              { icon: "💼", title: "可能职业", text: soulmate.career },
              { icon: "🗺️", title: "相遇场景", text: soulmate.meetScene },
              { icon: "⏰", title: "相遇时机", text: soulmate.meetTiming },
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
              <p>✦ 以上画像基于星盘相位与命理分析推算，描述的是能量层面的匹配特征，而非硬性标准。真实的缘分往往超越预测，请以开放的心态迎接每一段相遇。</p>
            </div>
          </div>
        )}

        {/* === 情感建议 === */}
        {activeTab === "advice" && (
          <div className="love-tab-pane">
            <div className="love-section-header">
              <div className="love-section-icon-lg">✨</div>
              <div>
                <h2 className="love-section-h2">专属情感建议</h2>
                <p className="love-section-desc">为你量身定制的感情功课</p>
              </div>
            </div>

            <div className="love-advice-card love-advice-strength">
              <div className="love-advice-card-title">
                <span>💪</span> 你的感情优势
              </div>
              <p className="love-advice-card-text">{loveAdvice.strength}</p>
            </div>

            <div className="love-advice-card love-advice-weakness">
              <div className="love-advice-card-title">
                <span>🌱</span> 需要关注的方向
              </div>
              <p className="love-advice-card-text">{loveAdvice.weakness}</p>
            </div>

            <div className="love-advice-card love-advice-action">
              <div className="love-advice-card-title">
                <span>🚀</span> 近期行动建议
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
                <div className="love-zodiac-recap-name">{zodiac.name}的爱情宣言</div>
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
                <h2 className="love-section-h2">占星师寄语</h2>
                <p className="love-section-desc">AI 星盘解读 · 专属于你</p>
              </div>
            </div>
            <div className="love-ai-message">
              <div className="love-ai-message-content">{aiEnhanced}</div>
              <div className="love-ai-badge">✦ 由 AI 占星师生成</div>
            </div>
          </div>
        )}
      </div>

      {/* 分享区域 */}
      <div className="love-share-section">
        <p className="love-share-title">分享你的报告</p>
        <div className="love-share-btns">
          <button onClick={handleShare} className="love-share-btn love-share-copy">
            {copied ? "✓ 已复制" : "📋 复制分享文案"}
          </button>
          <button
            onClick={onReset}
            className="love-share-btn love-share-retest"
          >
            ↺ 重新测算
          </button>
        </div>
        <p className="love-share-hint">将分享文案发给朋友，让她们也来测测自己的姻缘！</p>
      </div>

      {/* 免责声明 */}
      <p className="love-disclaimer" style={{ marginTop: "2rem" }}>
        ⚠ 本报告内容仅供情感参考与趣味体验，请理性对待，切勿将占卜结果作为重大决策依据。
      </p>
    </div>
  );
}
