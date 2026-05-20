"use client";

import React, { useState } from "react";
import { WUXING_CONFIG, WUXING_TIPS, XIYONGSHEN_TEMPLATES, type WuXing } from "../naming-data";

interface BaziPillar {
  label: string;
  gan: string;
  zhi: string;
  ganWuxing: WuXing;
  zhiWuxing: WuXing;
}

interface BaziData {
  pillars: BaziPillar[];
  wuxingScores: Record<WuXing, number>;
  dominant: WuXing[];
  weak: WuXing[];
  xiyongshen: WuXing[];
  diagnosis: string;
}

interface BaziResultProps {
  bazi: BaziData;
  surname: string;
  gender: "male" | "female";
  onContinue?: () => void;
}

const WUXING_ORDER: WuXing[] = ["金", "木", "水", "火", "土"];

export default function BaziResult({ bazi, surname, gender, onContinue }: BaziResultProps) {
  const [showTip, setShowTip] = useState(false);

  const total = Object.values(bazi.wuxingScores).reduce((a, b) => a + b, 0);

  const maxScore = Math.max(...Object.values(bazi.wuxingScores));

  return (
    <div className="bazi-result-container">
      {/* 标题 */}
      <div className="bazi-result-header">
        <div className="bazi-result-badge">八字命盘</div>
        <h2 className="bazi-result-title">
          {surname}家{gender === "male" ? "男" : "女"}宝宝的命局分析
        </h2>
      </div>

      {/* 四柱排盘 */}
      <div className="bazi-pillars-section">
        <h3 className="bazi-section-label">⊞ 生辰四柱</h3>
        <div className="bazi-pillars-grid">
          {bazi.pillars.map((p) => (
            <div key={p.label} className="bazi-pillar-card">
              <div className="bazi-pillar-label">{p.label}</div>
              <div className="bazi-pillar-chars">
                <div className="bazi-pillar-gan-wrap">
                  <span
                    className="bazi-pillar-char"
                    style={{
                      background: WUXING_CONFIG[p.ganWuxing].bg,
                      borderColor: WUXING_CONFIG[p.ganWuxing].border,
                      color: WUXING_CONFIG[p.ganWuxing].color,
                    }}
                  >
                    {p.gan}
                  </span>
                  <span className="bazi-pillar-wuxing">{p.ganWuxing}</span>
                </div>
                <div className="bazi-pillar-gan-wrap">
                  <span
                    className="bazi-pillar-char"
                    style={{
                      background: WUXING_CONFIG[p.zhiWuxing].bg,
                      borderColor: WUXING_CONFIG[p.zhiWuxing].border,
                      color: WUXING_CONFIG[p.zhiWuxing].color,
                    }}
                  >
                    {p.zhi}
                  </span>
                  <span className="bazi-pillar-wuxing">{p.zhiWuxing}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="bazi-pillars-tip">天干在上，地支在下，从左至右依次为年、月、日、时柱</p>
      </div>

      {/* 五行可视化 */}
      <div className="bazi-wuxing-section">
        <h3 className="bazi-section-label">◈ 五行旺衰分析</h3>
        <div className="bazi-wuxing-bars">
          {WUXING_ORDER.map(wx => {
            const score = bazi.wuxingScores[wx] ?? 0;
            const percent = total > 0 ? (score / total) * 100 : 0;
            const barWidth = maxScore > 0 ? (score / maxScore) * 100 : 0;
            const isDominant = bazi.dominant.includes(wx);
            const isWeak = bazi.weak.includes(wx);
            const isXiyong = bazi.xiyongshen.includes(wx);

            return (
              <div key={wx} className="bazi-wx-row">
                <div className="bazi-wx-info">
                  <span
                    className="bazi-wx-dot"
                    style={{ background: WUXING_CONFIG[wx].color }}
                  />
                  <span className="bazi-wx-name">{wx}</span>
                  {isXiyong && <span className="bazi-wx-badge bazi-badge-xi">喜用</span>}
                  {isDominant && !isXiyong && <span className="bazi-wx-badge bazi-badge-strong">旺</span>}
                  {isWeak && !isXiyong && <span className="bazi-wx-badge bazi-badge-weak">弱</span>}
                </div>
                <div className="bazi-wx-bar-track">
                  <div
                    className="bazi-wx-bar-fill"
                    style={{
                      width: `${barWidth}%`,
                      background: WUXING_CONFIG[wx].color,
                      opacity: isXiyong ? 1 : 0.6,
                    }}
                  />
                </div>
                <span className="bazi-wx-percent">{percent.toFixed(0)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 诊断文案 */}
      <div className="bazi-diagnosis-section">
        <h3 className="bazi-section-label">✦ 命局诊断</h3>
        <div className="bazi-diagnosis-card">
          <div
            className="bazi-diagnosis-text"
            dangerouslySetInnerHTML={{
              __html: bazi.diagnosis.replace(/\*\*(.*?)\*\*/g, '<strong class="bazi-emphasis">$1</strong>'),
            }}
          />
        </div>
      </div>

      {/* 喜用神详解 */}
      <div className="bazi-xiyong-section">
        <h3 className="bazi-section-label">
          ◎ 专属喜用神
          <button
            className="bazi-tip-btn"
            onClick={() => setShowTip(!showTip)}
            aria-label="什么是喜用神"
          >
            {showTip ? "收起" : "什么是喜用神？"}
          </button>
        </h3>

        {showTip && (
          <div className="bazi-xiyong-tip-card">
            <p>
              <strong>喜用神</strong>是命局中最需要补充的五行，也是运势的关键所在。
              传统命理中"喜用神"并非简单的"缺啥补啥"，而是根据日主（出生日天干）的强弱，
              结合整体格局综合研判。名字五行契合喜用神，可以起到"补运助势"的效果。
            </p>
            <div className="bazi-wuxing-tips">
              {WUXING_TIPS.map(tip => (
                <div key={tip} className="bazi-wuxing-tip-item">⊙ {tip}</div>
              ))}
            </div>
          </div>
        )}

        <div className="bazi-xiyong-cards">
          {bazi.xiyongshen.map(wx => {
            const tpl = XIYONGSHEN_TEMPLATES[wx];
            return (
              <div
                key={wx}
                className="bazi-xiyong-card"
                style={{
                  borderColor: WUXING_CONFIG[wx].border,
                  background: WUXING_CONFIG[wx].bg,
                }}
              >
                <div
                  className="bazi-xiyong-title"
                  style={{ color: WUXING_CONFIG[wx].color }}
                >
                  {tpl.title}
                </div>
                <div className="bazi-xiyong-desc">{tpl.desc}</div>
                <div className="bazi-xiyong-tip">
                  <span className="bazi-tip-icon">✓</span> {tpl.nameTip}
                </div>
                <div className="bazi-xiyong-avoid">
                  <span className="bazi-avoid-icon">✗</span> {tpl.avoidTip}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 继续按钮 */}
      {onContinue && (
        <button className="bazi-continue-btn" onClick={onContinue}>
          查看专属吉名推荐 →
        </button>
      )}
    </div>
  );
}
