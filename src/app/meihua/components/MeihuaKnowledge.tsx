"use client";

import { useState } from "react";
import { BA_GUA } from "../meihua-data";

export default function MeihuaKnowledge() {
  const [activeSection, setActiveSection] = useState<"bagua" | "wuxing" | "method" | null>(null);

  const toggle = (s: typeof activeSection) => setActiveSection(prev => prev === s ? null : s);

  return (
    <div className="meihua-knowledge">
      <div className="meihua-knowledge-title">
        <span className="meihua-section-dot">✦</span>
        易学基础
      </div>

      {/* 先天八卦 */}
      <div className="meihua-know-section">
        <button className="meihua-know-header" onClick={() => toggle("bagua")}>
          <span className="meihua-know-icon">☰</span>
          <span className="meihua-know-label">先天八卦数诀</span>
          <span className="meihua-know-arrow">{activeSection === "bagua" ? "▾" : "▸"}</span>
        </button>
        {activeSection === "bagua" && (
          <div className="meihua-know-body">
            <p className="meihua-know-intro">
              梅花易数以先天八卦数为基础：<strong>乾一兑二离三震四，巽五坎六艮七坤八。</strong>
            </p>
            <div className="meihua-bagua-table">
              {Object.values(BA_GUA).map(gua => (
                <div key={gua.name} className="meihua-bagua-row">
                  <span className="meihua-bt-sym">{gua.symbol}</span>
                  <span className="meihua-bt-name">{gua.name}</span>
                  <span className="meihua-bt-num">第{["一","二","三","四","五","六","七","八"][gua.number - 1]}宫</span>
                  <span className={`meihua-bt-wx meihua-wx-${gua.wuxing}`}>{gua.wuxing}</span>
                  <span className="meihua-bt-nature">{gua.nature}</span>
                  <span className="meihua-bt-family">{gua.family}</span>
                  <span className="meihua-bt-dir">{gua.direction}</span>
                </div>
              ))}
            </div>
            <p className="meihua-know-note">
              梅花易数起卦时，以余数对应先天八卦数，余0取8（余数不为0时直接取余）。
            </p>
          </div>
        )}
      </div>

      {/* 五行生克 */}
      <div className="meihua-know-section">
        <button className="meihua-know-header" onClick={() => toggle("wuxing")}>
          <span className="meihua-know-icon">☯</span>
          <span className="meihua-know-label">五行生克图解</span>
          <span className="meihua-know-arrow">{activeSection === "wuxing" ? "▾" : "▸"}</span>
        </button>
        {activeSection === "wuxing" && (
          <div className="meihua-know-body">
            <div className="meihua-wuxing-diagram">
              <div className="meihua-wx-center">五行</div>
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
                    <span className="meihua-wx-sheng">生 {item.sheng}</span>
                    <span className="meihua-wx-ke">克 {item.ke}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="meihua-wx-rules">
              <div className="meihua-wx-rule">
                <span className="meihua-rule-icon meihua-sheng">生</span>
                <span>木生火 · 火生土 · 土生金 · 金生水 · 水生木</span>
              </div>
              <div className="meihua-wx-rule">
                <span className="meihua-rule-icon meihua-ke">克</span>
                <span>木克土 · 土克水 · 水克火 · 火克金 · 金克木</span>
              </div>
            </div>
            <div className="meihua-tiyong-rules">
              <div className="meihua-tiyong-rule-title">体用生克断卦：</div>
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
          <span className="meihua-know-label">梅花易数起卦原理</span>
          <span className="meihua-know-arrow">{activeSection === "method" ? "▾" : "▸"}</span>
        </button>
        {activeSection === "method" && (
          <div className="meihua-know-body">
            <div className="meihua-method-intro">
              <p>梅花易数由北宋易学家<strong>邵雍（1011-1077）</strong>所创，核心在于"观物取象、随心起卦、体用生克"。</p>
              <p>其哲学基础：天地万物皆有象，圣人观象而设卦，人心一动即与天地感应，故任何时间、事物皆可起卦。</p>
            </div>
            <div className="meihua-method-steps">
              <div className="meihua-method-step">
                <span className="meihua-step-num">①</span>
                <div>
                  <strong>时间起卦</strong>（正统法）<br />
                  (年支数+月数+日数) ÷ 8 → 上卦；<br />
                  (年支数+月数+日数+时支数) ÷ 8 → 下卦；<br />
                  总和 ÷ 6 → 动爻
                </div>
              </div>
              <div className="meihua-method-step">
                <span className="meihua-step-num">②</span>
                <div>
                  <strong>数字起卦</strong>（万物起卦）<br />
                  第一数 ÷ 8 → 上卦；<br />
                  第二数 ÷ 8 → 下卦；<br />
                  两数之和 ÷ 6 → 动爻
                </div>
              </div>
              <div className="meihua-method-step">
                <span className="meihua-step-num">③</span>
                <div>
                  <strong>随机起卦</strong>（心易法）<br />
                  模拟邵雍"观梅起卦"，以心动之机感应天地，<br />
                  重在诚心与专注，而非数字本身。
                </div>
              </div>
            </div>
            <div className="meihua-method-quote">
              <p>"天下之事，皆数之所定，而神之所运也。"</p>
              <p className="meihua-quote-source">——邵雍《皇极经世》</p>
            </div>
          </div>
        )}
      </div>

      {/* 免责声明 */}
      <div className="meihua-disclaimer-card">
        <span className="meihua-disclaimer-icon">⚠</span>
        <p>
          <strong>善易者不卜。</strong>
          梅花易数为中国传统国学文化，本工具仅供学习研究与心理参考之用，请勿迷信占卜结果，遇重大决策请理性分析、咨询专业人士。
        </p>
      </div>
    </div>
  );
}
