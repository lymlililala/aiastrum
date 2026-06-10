"use client";

import { useState } from "react";
import { BA_GUA } from "../meihua-data";
import type { MeihuaT } from "../meihua-i18n";

interface MeihuaKnowledgeProps {
  t: MeihuaT;
}

export default function MeihuaKnowledge({ t }: MeihuaKnowledgeProps) {
  const [activeSection, setActiveSection] = useState<"bagua" | "wuxing" | "method" | null>(null);

  const toggle = (s: typeof activeSection) => setActiveSection(prev => prev === s ? null : s);

  return (
    <div className="meihua-knowledge">
      <div className="meihua-knowledge-title">
        <span className="meihua-section-dot">✦</span>
        {t.knowTitle}
      </div>

      {/* 先天八卦 */}
      <div className="meihua-know-section">
        <button className="meihua-know-header" onClick={() => toggle("bagua")}>
          <span className="meihua-know-icon">☰</span>
          <span className="meihua-know-label">{t.knowBaguaLabel}</span>
          <span className="meihua-know-arrow">{activeSection === "bagua" ? "▾" : "▸"}</span>
        </button>
        {activeSection === "bagua" && (
          <div className="meihua-know-body">
            <p className="meihua-know-intro">
              {t.knowBaguaIntroPre}<strong>{t.knowBaguaIntroBold}</strong>
            </p>
            <div className="meihua-bagua-table">
              {Object.values(BA_GUA).map(gua => (
                <div key={gua.name} className="meihua-bagua-row">
                  <span className="meihua-bt-sym">{gua.symbol}</span>
                  <span className="meihua-bt-name">{gua.name}</span>
                  <span className="meihua-bt-num">{t.knowBaguaPalacePre}{["一","二","三","四","五","六","七","八"][gua.number - 1]}{t.knowBaguaPalacePost}</span>
                  <span className={`meihua-bt-wx meihua-wx-${gua.wuxing}`}>{gua.wuxing}</span>
                  <span className="meihua-bt-nature">{gua.nature}</span>
                  <span className="meihua-bt-family">{gua.family}</span>
                  <span className="meihua-bt-dir">{gua.direction}</span>
                </div>
              ))}
            </div>
            <p className="meihua-know-note">
              {t.knowBaguaNote}
            </p>
          </div>
        )}
      </div>

      {/* 五行生克 */}
      <div className="meihua-know-section">
        <button className="meihua-know-header" onClick={() => toggle("wuxing")}>
          <span className="meihua-know-icon">☯</span>
          <span className="meihua-know-label">{t.knowWuxingLabel}</span>
          <span className="meihua-know-arrow">{activeSection === "wuxing" ? "▾" : "▸"}</span>
        </button>
        {activeSection === "wuxing" && (
          <div className="meihua-know-body">
            <div className="meihua-wuxing-diagram">
              <div className="meihua-wx-center">{t.knowWxCenter}</div>
              {[
                { wx: "木", color: "#5B8A4A", sheng: "→ 火", ke: "→ 土", bei_sheng: "← 水", bei_ke: "← 金" },
                { wx: "火", color: "#C04851", sheng: "→ 土", ke: "→ 金", bei_sheng: "← 木", bei_ke: "← 水" },
                { wx: "土", color: "#9B6B3A", sheng: "→ 金", ke: "→ 水", bei_sheng: "← 火", bei_ke: "← 木" },
                { wx: "金", color: "#C9A84C", sheng: "→ 水", ke: "→ 木", bei_sheng: "← 土", bei_ke: "← 火" },
                { wx: "水", color: "#4A7A9B", sheng: "→ 木", ke: "→ 火", bei_sheng: "← 金", bei_ke: "← 土" },
              ].map(item => (
                <div key={item.wx} className="meihua-wx-card" style={{ "--wx-color": item.color } as React.CSSProperties}>
                  <div className="meihua-wx-name">{item.wx}</div>
                  <div className="meihua-wx-relations">
                    <span className="meihua-wx-sheng">{t.knowWxSheng}{item.sheng}</span>
                    <span className="meihua-wx-ke">{t.knowWxKe}{item.ke}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="meihua-wx-rules">
              <div className="meihua-wx-rule">
                <span className="meihua-rule-icon meihua-sheng">{t.knowShengTag}</span>
                <span>{t.knowShengRule}</span>
              </div>
              <div className="meihua-wx-rule">
                <span className="meihua-rule-icon meihua-ke">{t.knowKeTag}</span>
                <span>{t.knowKeRule}</span>
              </div>
            </div>
            <div className="meihua-tiyong-rules">
              <div className="meihua-tiyong-rule-title">{t.knowTiyongTitle}</div>
              {[
                { type: "用生体", level: "大吉", desc: "外力相助，事顺人和" },
                { type: "体克用", level: "中吉", desc: "主动掌控，付出可成" },
                { type: "比和",   level: "吉",   desc: "顺其自然，平稳顺遂" },
                { type: "体生用", level: "泄气", desc: "付出较多，得不偿失" },
                { type: "用克体", level: "凶",   desc: "外压阻碍，谨慎守正" },
              ].map(r => (
                <div key={r.type} className="meihua-ty-rule">
                  <span className="meihua-ty-type">{r.type}</span>
                  <span className="meihua-ty-level">{r.level}</span>
                  <span className="meihua-ty-desc">{r.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 起卦方法 */}
      <div className="meihua-know-section">
        <button className="meihua-know-header" onClick={() => toggle("method")}>
          <span className="meihua-know-icon">✦</span>
          <span className="meihua-know-label">{t.knowMethodLabel}</span>
          <span className="meihua-know-arrow">{activeSection === "method" ? "▾" : "▸"}</span>
        </button>
        {activeSection === "method" && (
          <div className="meihua-know-body">
            <div className="meihua-method-intro">
              <p>{t.knowMethodIntroL1}<strong>{t.knowMethodIntroBold}</strong>{t.knowMethodIntroL2}</p>
              <p>{t.knowMethodIntroL3}</p>
            </div>
            <div className="meihua-method-steps">
              <div className="meihua-method-step">
                <span className="meihua-step-num">①</span>
                <div>
                  <strong>{t.knowStep1Title}</strong>{t.knowStep1Note}<br />
                  {t.knowStep1L1}<br />
                  {t.knowStep1L2}<br />
                  {t.knowStep1L3}
                </div>
              </div>
              <div className="meihua-method-step">
                <span className="meihua-step-num">②</span>
                <div>
                  <strong>{t.knowStep2Title}</strong>{t.knowStep2Note}<br />
                  {t.knowStep2L1}<br />
                  {t.knowStep2L2}<br />
                  {t.knowStep2L3}
                </div>
              </div>
              <div className="meihua-method-step">
                <span className="meihua-step-num">③</span>
                <div>
                  <strong>{t.knowStep3Title}</strong>{t.knowStep3Note}<br />
                  {t.knowStep3L1}<br />
                  {t.knowStep3L2}
                </div>
              </div>
            </div>
            <div className="meihua-method-quote">
              <p>{t.knowMethodQuote}</p>
              <p className="meihua-quote-source">{t.knowMethodQuoteSrc}</p>
            </div>
          </div>
        )}
      </div>

      {/* 免责声明 */}
      <div className="meihua-disclaimer-card">
        <span className="meihua-disclaimer-icon">⚠</span>
        <p>
          <strong>{t.knowDisclaimerBold}</strong>
          {t.knowDisclaimer}
        </p>
      </div>
    </div>
  );
}
