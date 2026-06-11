"use client";

import React, { useState } from "react";
import { WUXING_CONFIG, getWuxingTips, getXiyongTemplate, getWuxingLabel, type WuXing, type Lang } from "../naming-data";
import { getPillarLabel, buildDiagnosisI18n } from "../naming-engine";
import { type NamingT } from "../naming-i18n";

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
  t: NamingT;
  lang: Lang;
}

const WUXING_ORDER: WuXing[] = ["金", "木", "水", "火", "土"];

export default function BaziResult({ bazi, surname, gender, onContinue, t, lang }: BaziResultProps) {
  const [showTip, setShowTip] = useState(false);

  const total = Object.values(bazi.wuxingScores).reduce((a, b) => a + b, 0);

  const maxScore = Math.max(...Object.values(bazi.wuxingScores));

  // 诊断文案按 lang 由结构化字段重建（引擎在 API 端生成的中文 diagnosis 不直接使用）
  const diagnosis = buildDiagnosisI18n(bazi.dominant, bazi.weak, bazi.xiyongshen, lang);

  return (
    <div className="bazi-result-container">
      {/* 标题 */}
      <div className="bazi-result-header">
        <div className="bazi-result-badge">{t.bzBadge}</div>
        <h2 className="bazi-result-title">
          {t.bzTitlePre}{surname}{t.bzTitleMid}{gender === "male" ? t.nlTitleMale : t.nlTitleFemale}{t.bzTitlePost}
        </h2>
      </div>

      {/* 四柱排盘 */}
      <div className="bazi-pillars-section">
        <h3 className="bazi-section-label">{t.bzPillars}</h3>
        <div className="bazi-pillars-grid">
          {bazi.pillars.map((p, pi) => (
            <div key={p.label} className="bazi-pillar-card">
              <div className="bazi-pillar-label">{getPillarLabel(pi, lang)}</div>
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
                  <span className="bazi-pillar-wuxing">{getWuxingLabel(p.ganWuxing, lang)}</span>
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
                  <span className="bazi-pillar-wuxing">{getWuxingLabel(p.zhiWuxing, lang)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="bazi-pillars-tip">{t.bzPillarsTip}</p>
      </div>

      {/* 五行可视化 */}
      <div className="bazi-wuxing-section">
        <h3 className="bazi-section-label">{t.bzWuxing}</h3>
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
                  <span className="bazi-wx-name">{getWuxingLabel(wx, lang)}</span>
                  {isXiyong && <span className="bazi-wx-badge bazi-badge-xi">{t.bzBadgeXi}</span>}
                  {isDominant && !isXiyong && <span className="bazi-wx-badge bazi-badge-strong">{t.bzBadgeStrong}</span>}
                  {isWeak && !isXiyong && <span className="bazi-wx-badge bazi-badge-weak">{t.bzBadgeWeak}</span>}
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
        <h3 className="bazi-section-label">{t.bzDiagnosis}</h3>
        <div className="bazi-diagnosis-card">
          <div
            className="bazi-diagnosis-text"
            dangerouslySetInnerHTML={{
              __html: diagnosis.replace(/\*\*(.*?)\*\*/g, '<strong class="bazi-emphasis">$1</strong>'),
            }}
          />
        </div>
      </div>

      {/* 喜用神详解 */}
      <div className="bazi-xiyong-section">
        <h3 className="bazi-section-label">
          {t.bzXiyongTitle}
          <button
            className="bazi-tip-btn"
            onClick={() => setShowTip(!showTip)}
            aria-label={t.bzTipOpen}
          >
            {showTip ? t.bzTipCollapse : t.bzTipOpen}
          </button>
        </h3>

        {showTip && (
          <div className="bazi-xiyong-tip-card">
            <p dangerouslySetInnerHTML={{ __html: t.bzXiyongIntro }} />
            <div className="bazi-wuxing-tips">
              {getWuxingTips(lang).map(tip => (
                <div key={tip} className="bazi-wuxing-tip-item">⊙ {tip}</div>
              ))}
            </div>
          </div>
        )}

        <div className="bazi-xiyong-cards">
          {bazi.xiyongshen.map(wx => {
            const tpl = getXiyongTemplate(wx, lang);
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
          {t.bzContinue}
        </button>
      )}
    </div>
  );
}
