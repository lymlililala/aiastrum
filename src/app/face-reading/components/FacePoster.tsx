"use client";

import React, { useRef, useState, useCallback } from "react";
import type { FaceReadingReport } from "../face-reading-data";
import type { FaceT, FaceLang } from "../face-reading-i18n";

interface FacePosterProps {
  t: FaceT;
  lang: FaceLang;
  report: FaceReadingReport;
  imageUrl: string;
  onClose: () => void;
}

export function FacePoster({ t, lang, report, imageUrl, onClose }: FacePosterProps) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const handleSave = useCallback(async () => {
    if (saving || !posterRef.current) return;
    setSaving(true);

    try {
      // 动态导入 html2canvas
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(posterRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0a0118",
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `${t.posterFileName}_${report.talentLabel.name}_${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.warn("海报生成失败:", err);
      setSaveError(true);
      setTimeout(() => setSaveError(false), 3000);
    } finally {
      setSaving(false);
    }
  }, [saving, report.talentLabel.name, t.posterFileName]);

  const modeName = report.mode === "face" ? t.reportFace : t.reportPalm;
  const today = new Date().toLocaleDateString(
    lang === "en" ? "en-US" : lang === "tw" ? "zh-TW" : "zh-CN",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="fr-poster-overlay" onClick={onClose}>
      <div
        className="fr-poster-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 海报内容 */}
        <div ref={posterRef} className="fr-poster-card">
          {/* 背景装饰 */}
          <div className="fr-poster-bg">
            <div
              className="fr-poster-glow-1"
              style={{ background: report.talentLabel.gradient, opacity: 0.3 }}
            />
            <div className="fr-poster-grid" />
          </div>

          {/* 顶部 LOGO */}
          <div className="fr-poster-header">
            <div className="fr-poster-logo">
              <span className="fr-poster-logo-icon">🔬</span>
              <span className="fr-poster-logo-text">{t.posterLogo}</span>
            </div>
            <div className="fr-poster-subtitle-text">{t.posterSubPre}{modeName}{t.posterSubPost}</div>
          </div>

          {/* 照片区 */}
          <div className="fr-poster-photo-section">
            <div className="fr-poster-photo-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="" className="fr-poster-photo" />
              {/* 扫描线装饰 */}
              <div className="fr-poster-scan-lines" />
              {/* 四角框 */}
              <div className="fr-poster-photo-frame">
                <div className="fr-p-corner tl" />
                <div className="fr-p-corner tr" />
                <div className="fr-p-corner bl" />
                <div className="fr-p-corner br" />
              </div>
            </div>
          </div>

          {/* 天赋标签 */}
          <div
            className="fr-poster-talent"
            style={{ background: report.talentLabel.gradient }}
          >
            <span className="fr-poster-talent-rarity">{report.talentLabel.rarity}</span>
            <span className="fr-poster-talent-icon">{report.talentLabel.icon}</span>
            <span className="fr-poster-talent-name">{report.talentLabel.name}</span>
          </div>

          {/* 分数展示 */}
          <div className="fr-poster-score-row">
            <div className="fr-poster-score-main">
              <span className="fr-poster-score-num">{report.overallScore}</span>
              <span className="fr-poster-score-unit">{t.posterScoreUnit}</span>
            </div>
            <div className="fr-poster-score-label">{t.posterScoreLabel}</div>
          </div>

          {/* 五维评分 */}
          <div className="fr-poster-dims">
            {report.dimensions.map((dim) => (
              <div key={dim.name} className="fr-poster-dim-item">
                <span className="fr-poster-dim-icon">{dim.icon}</span>
                <div className="fr-poster-dim-bar-wrap">
                  <div className="fr-poster-dim-name">{dim.name}</div>
                  <div className="fr-poster-dim-bar">
                    <div
                      className="fr-poster-dim-fill"
                      style={{
                        width: `${dim.score}%`,
                        background: report.talentLabel.gradient,
                      }}
                    />
                  </div>
                </div>
                <span className="fr-poster-dim-score">{dim.score}</span>
              </div>
            ))}
          </div>

          {/* 格言 */}
          <div className="fr-poster-quote">
            <p className="fr-poster-quote-text">"{report.lifeQuote}"</p>
          </div>

          {/* 底部信息 */}
          <div className="fr-poster-footer">
            <div className="fr-poster-date">{today}</div>
            <div className="fr-poster-disclaimer">{t.posterDisclaimer}</div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="fr-poster-actions">
          <button
          className={`fr-poster-save-btn ${saving ? "saving" : ""} ${saved ? "saved" : ""} ${saveError ? "error" : ""}`}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? t.posterGenerating : saveError ? t.posterError : saved ? t.posterSaved : t.posterSave}
        </button>
          <button className="fr-poster-close-btn" onClick={onClose}>
            {t.posterClose}
          </button>
        </div>

        {/* 分享提示 */}
        <p className="fr-poster-share-tip">
          {t.posterShareTip}
        </p>
      </div>
    </div>
  );
}
