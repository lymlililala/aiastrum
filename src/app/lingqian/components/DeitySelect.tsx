"use client";
import React from "react";
import { Deity } from "../lingqian-data";
import { getLocalizedDeities } from "../lingqian-engine";
import type { LingT, Lang } from "../lingqian-i18n";

interface DeitySelectProps {
  onSelect: (deity: Deity) => void;
  dailyZen: string;
  t: LingT;
  lang: Lang;
}

export default function DeitySelect({ onSelect, dailyZen, t, lang }: DeitySelectProps) {
  const deities = getLocalizedDeities(lang);
  return (
    <div className="lq-deity-page">
      {/* 顶部标题区 */}
      <div className="lq-hero">
        <div className="lq-hero-deco">☯</div>
        <h1 className="lq-title">{t.heroTitle}</h1>
        <p className="lq-subtitle">{t.heroSubtitle}</p>
        <div className="lq-zen-banner">
          <span className="lq-zen-icon">🪔</span>
          <span className="lq-zen-text">{dailyZen}</span>
        </div>
      </div>

      {/* 神明选择区 */}
      <div className="lq-deity-section">
        <h2 className="lq-section-title">
          <span className="lq-section-deco">—</span>
          {t.selectTitle}
          <span className="lq-section-deco">—</span>
        </h2>
        <p className="lq-section-hint">{t.selectHint}</p>

        <div className="lq-deity-grid">
          {deities.map((deity) => (
            <button
              key={deity.id}
              className="lq-deity-card"
              onClick={() => onSelect(deity)}
              style={{ "--deity-color": deity.color, "--deity-gradient": deity.bgGradient } as React.CSSProperties}
            >
              <div className="lq-deity-bg" />
              <div className="lq-deity-icon-wrap">
                <span className="lq-deity-icon">{deity.icon}</span>
                <div className="lq-deity-glow" />
              </div>
              <div className="lq-deity-info">
                <h3 className="lq-deity-name">{deity.name}</h3>
                <p className="lq-deity-fullname">{deity.fullName}</p>
                <p className="lq-deity-desc">{deity.desc}</p>
                <div className="lq-deity-count">
                  <span className="lq-count-badge">{deity.signs.length} {t.deityCountUnit}</span>
                </div>
              </div>
              <div className="lq-deity-arrow">→</div>
            </button>
          ))}
        </div>
      </div>

      {/* 底部说明 */}
      <div className="lq-footer-note">
        <div className="lq-divider-ornament">
          <span>✦</span><span>{t.footerOrnament}</span><span>✦</span>
        </div>
        <p className="lq-footer-text">{t.footerText}</p>
      </div>
    </div>
  );
}
