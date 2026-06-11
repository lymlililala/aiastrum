"use client";

import { useState } from "react";
import { BA_GUA, wuxingLabel, type WuXing } from "../meihua-data";
import type { Lang, MeihuaT } from "../meihua-i18n";

interface MeihuaKnowledgeProps {
  lang: Lang;
  t: MeihuaT;
}

// 体用生克断卦规则表（type/level 中文 KEY → 本地化显示 + 简述）
const TIYONG_RULES: Array<{ type: string; level: string; typeLabel: Record<Lang, string>; levelLabel: Record<Lang, string>; desc: Record<Lang, string> }> = [
  { type: "用生体", level: "大吉", typeLabel: { zh: "用生体", tw: "用生體", en: "Guest→Host" }, levelLabel: { zh: "大吉", tw: "大吉", en: "Very auspicious" }, desc: { zh: "外力相助，事顺人和", tw: "外力相助，事順人和", en: "Outside help; matters go smoothly." } },
  { type: "体克用", level: "中吉", typeLabel: { zh: "体克用", tw: "體剋用", en: "Host controls Guest" }, levelLabel: { zh: "中吉", tw: "中吉", en: "Auspicious" }, desc: { zh: "主动掌控，付出可成", tw: "主動掌控，付出可成", en: "Take command; effort brings success." } },
  { type: "比和", level: "吉", typeLabel: { zh: "比和", tw: "比和", en: "In harmony" }, levelLabel: { zh: "吉", tw: "吉", en: "Favorable" }, desc: { zh: "顺其自然，平稳顺遂", tw: "順其自然，平穩順遂", en: "Let it flow; steady and smooth." } },
  { type: "体生用", level: "泄气", typeLabel: { zh: "体生用", tw: "體生用", en: "Host→Guest" }, levelLabel: { zh: "泄气", tw: "洩氣", en: "Draining" }, desc: { zh: "付出较多，得不偿失", tw: "付出較多，得不償失", en: "Much given for too little gained." } },
  { type: "用克体", level: "凶", typeLabel: { zh: "用克体", tw: "用剋體", en: "Guest controls Host" }, levelLabel: { zh: "凶", tw: "凶", en: "Inauspicious" }, desc: { zh: "外压阻碍，谨慎守正", tw: "外壓阻礙，謹慎守正", en: "Outside pressure; stay cautious and upright." } },
];

// 五行生克图解卡片（wx KEY 中文，显示用 wuxingLabel；箭头方向标签三语）
const WUXING_DIAGRAM: Array<{ wx: WuXing; color: string; sheng: Record<Lang, string>; ke: Record<Lang, string> }> = [
  { wx: "木", color: "#5B8A4A", sheng: { zh: "→ 火", tw: "→ 火", en: "→ Fire" }, ke: { zh: "→ 土", tw: "→ 土", en: "→ Earth" } },
  { wx: "火", color: "#C04851", sheng: { zh: "→ 土", tw: "→ 土", en: "→ Earth" }, ke: { zh: "→ 金", tw: "→ 金", en: "→ Metal" } },
  { wx: "土", color: "#9B6B3A", sheng: { zh: "→ 金", tw: "→ 金", en: "→ Metal" }, ke: { zh: "→ 水", tw: "→ 水", en: "→ Water" } },
  { wx: "金", color: "#C9A84C", sheng: { zh: "→ 水", tw: "→ 水", en: "→ Water" }, ke: { zh: "→ 木", tw: "→ 木", en: "→ Wood" } },
  { wx: "水", color: "#4A7A9B", sheng: { zh: "→ 木", tw: "→ 木", en: "→ Wood" }, ke: { zh: "→ 火", tw: "→ 火", en: "→ Fire" } },
];

export default function MeihuaKnowledge({ lang, t }: MeihuaKnowledgeProps) {
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
                  <span className="meihua-bt-name">{gua.nameLabel[lang]}</span>
                  <span className="meihua-bt-num">{t.knowBaguaPalacePre}{lang === "en" ? gua.number : ["一","二","三","四","五","六","七","八"][gua.number - 1]}{t.knowBaguaPalacePost}</span>
                  <span className={`meihua-bt-wx meihua-wx-${gua.wuxing}`}>{wuxingLabel(gua.wuxing, lang)}</span>
                  <span className="meihua-bt-nature">{gua.nature[lang]}</span>
                  <span className="meihua-bt-family">{gua.family[lang]}</span>
                  <span className="meihua-bt-dir">{gua.direction[lang]}</span>
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
              {WUXING_DIAGRAM.map(item => (
                <div key={item.wx} className="meihua-wx-card" style={{ "--wx-color": item.color } as React.CSSProperties}>
                  <div className="meihua-wx-name">{wuxingLabel(item.wx, lang)}</div>
                  <div className="meihua-wx-relations">
                    <span className="meihua-wx-sheng">{t.knowWxSheng}{item.sheng[lang]}</span>
                    <span className="meihua-wx-ke">{t.knowWxKe}{item.ke[lang]}</span>
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
              {TIYONG_RULES.map(r => (
                <div key={r.type} className="meihua-ty-rule">
                  <span className="meihua-ty-type">{r.typeLabel[lang]}</span>
                  <span className="meihua-ty-level">{r.levelLabel[lang]}</span>
                  <span className="meihua-ty-desc">{r.desc[lang]}</span>
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
