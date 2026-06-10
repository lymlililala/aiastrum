"use client";
import React, { useRef, useState, useEffect } from "react";
import { Sign, Deity, LUCK_COLORS } from "../lingqian-data";
import { formatDate, getTodayStr, getLunarDayLabel } from "../lingqian-engine";
import { resolveLuckLevel, resolveLuckLabel } from "../lingqian-content-i18n";
import type { LingT, Lang } from "../lingqian-i18n";

interface SharePosterProps {
  sign: Sign;
  deity: Deity;
  onClose: () => void;
  t: LingT;
  lang: Lang;
}

export default function SharePoster({ sign, deity, onClose, t, lang }: SharePosterProps) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadErr, setDownloadErr] = useState(false);
  const luckColor = LUCK_COLORS[sign.luck];
  const luckLevelText = resolveLuckLevel(lang, sign.luck);
  const luckLabelText = resolveLuckLabel(lang, sign.luck, luckColor.label);

  const handleDownload = async () => {
    if (!posterRef.current) return;
    setDownloading(true);

    try {
      // 动态加载 html2canvas
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(posterRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.download = `${t.posterFilePrefix}_${deity.name}_${sign.name}_${getTodayStr()}.png`;
      a.href = url;
      a.click();
    } catch (err) {
      console.warn("海报生成失败:", err);
      setDownloadErr(true);
      setTimeout(() => setDownloadErr(false), 4000);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyText = async () => {
    const text = `【${deity.name}${t.copyDeitySuffix}】${t.copySignPrefix}${sign.id}${t.copySignSuffix}·${sign.name}\n${luckLevelText}·${luckLabelText}\n\n${sign.poem.join("，")}\n\n${sign.plain}\n\n🪔 ${sign.zen}\n\n— ${formatDate(getTodayStr())} ${getLunarDayLabel()} —`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 降级
    }
  };

  return (
    <div className="lq-poster-overlay" onClick={onClose}>
      <div className="lq-poster-modal" onClick={(e) => e.stopPropagation()}>
        <button className="lq-poster-close" onClick={onClose}>✕</button>

        {/* 海报预览区 */}
        <div className="lq-poster-preview-wrap">
          <div
            ref={posterRef}
            className="lq-poster-card"
            style={{ "--deity-color": deity.color } as React.CSSProperties}
          >
            {/* 背景装饰 */}
            <div className="lq-poster-bg-pattern" />

            {/* 头部 */}
            <div className="lq-poster-header">
              <div className="lq-poster-site">{t.posterSite}</div>
              <div className="lq-poster-date-row">
                <span className="lq-poster-date">{formatDate(getTodayStr())}</span>
                <span className="lq-poster-lunar">{getLunarDayLabel()}</span>
              </div>
            </div>

            {/* 神明 */}
            <div className="lq-poster-deity">
              <span className="lq-poster-deity-icon">{deity.icon}</span>
              <span className="lq-poster-deity-name">{deity.fullName}</span>
            </div>

            {/* 分割线 */}
            <div className="lq-poster-divider">
              <span>✦</span><span>✦</span><span>✦</span>
            </div>

            {/* 签号与吉凶 */}
            <div className="lq-poster-sign-id">
              <span>{t.posterSignPrefix} {sign.id} {t.posterSignSuffix}</span>
              <span className="lq-poster-sign-name">·{sign.name}·</span>
            </div>

            {/* 吉凶印章 */}
            <div
              className="lq-poster-luck-stamp"
              style={{ borderColor: luckColor.border, color: luckColor.text }}
            >
              <div className="lq-stamp-level">{luckLevelText}</div>
              <div className="lq-stamp-label">{luckLabelText}</div>
            </div>

            {/* 签诗 */}
            <div className="lq-poster-poem">
              {sign.poem.map((line, i) => (
                <p key={i} className="lq-poster-poem-line">{line}</p>
              ))}
            </div>

            {/* 分割线 */}
            <div className="lq-poster-divider">
              <span>— — —</span>
            </div>

            {/* 禅语 */}
            <div className="lq-poster-zen">
              <span className="lq-poster-zen-icon">🪔</span>
              <span className="lq-poster-zen-text">{sign.zen}</span>
            </div>

            {/* 底部 */}
            <div className="lq-poster-footer">
              <span className="lq-poster-url">{t.posterFooter}</span>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="lq-poster-actions">
          <button
            className="lq-poster-download-btn"
            onClick={handleDownload}
            disabled={downloading}
            style={{ "--deity-color": deity.color } as React.CSSProperties}
          >
            {downloading ? t.posterDownloading : downloadErr ? t.posterDownloadErr : t.posterDownloadBtn}
          </button>
          <button
            className="lq-poster-copy-btn"
            onClick={handleCopyText}
          >
            {copied ? t.posterCopied : t.posterCopyBtn}
          </button>
        </div>

        <p className="lq-poster-tip">{t.posterTip}</p>
      </div>
    </div>
  );
}
