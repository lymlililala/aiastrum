"use client";
import React from "react";
import { DEITIES, Deity } from "../lingqian-data";

interface DeitySelectProps {
  onSelect: (deity: Deity) => void;
  dailyZen: string;
}

export default function DeitySelect({ onSelect, dailyZen }: DeitySelectProps) {
  return (
    <div className="lq-deity-page">
      {/* 顶部标题区 */}
      <div className="lq-hero">
        <div className="lq-hero-deco">☯</div>
        <h1 className="lq-title">云端灵签</h1>
        <p className="lq-subtitle">心诚则灵，遇见每日指引</p>
        <div className="lq-zen-banner">
          <span className="lq-zen-icon">🪔</span>
          <span className="lq-zen-text">{dailyZen}</span>
        </div>
      </div>

      {/* 神明选择区 */}
      <div className="lq-deity-section">
        <h2 className="lq-section-title">
          <span className="lq-section-deco">—</span>
          请选择神明
          <span className="lq-section-deco">—</span>
        </h2>
        <p className="lq-section-hint">虔诚礼拜，方得真诀</p>

        <div className="lq-deity-grid">
          {DEITIES.map((deity) => (
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
                  <span className="lq-count-badge">{deity.signs.length} 签</span>
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
          <span>✦</span><span>每日一签·福运相随</span><span>✦</span>
        </div>
        <p className="lq-footer-text">每位神明每天只赐一签，诚心求问，方得指引</p>
      </div>
    </div>
  );
}
