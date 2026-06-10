"use client";

import { useState } from "react";
import type { MeihuaResult } from "../meihua-engine";
import { BA_GUA, QUESTION_CATEGORIES } from "../meihua-data";
import type { Lang, MeihuaT } from "../meihua-i18n";

interface MeihuaResultProps {
  lang: Lang;
  t: MeihuaT;
  result: MeihuaResult;
  aiReading?: string | null;
  onReset: () => void;
}

// 五行颜色映射
const WUXING_COLORS: Record<string, string> = {
  金: "#C9A84C", 木: "#5B8A4A", 水: "#4A7A9B", 火: "#C04851", 土: "#9B6B3A",
};

// 吉凶等级颜色
const LEVEL_COLORS: Record<string, string> = {
  大吉: "#C04851", 中吉: "#E07B39", 吉: "#5B8A4A", 平: "#7A8B8B", 泄气: "#9B6B3A", 凶: "#6B3A4A",
};

export default function MeihuaResultComponent({ t, result, aiReading, onReset }: MeihuaResultProps) {
const [activeTab, setActiveTab] = useState<"overview" | "guaci" | "detail">("overview");
const [showCalc, setShowCalc] = useState(false);
const [copied, setCopied] = useState(false);

  const catLabel = t.catLabels[result.category]
    ?? QUESTION_CATEGORIES.find(c => c.id === result.category)?.label
    ?? t.catLabels.general;
  const catIcon = QUESTION_CATEGORIES.find(c => c.id === result.category)?.icon ?? "☯";

  const tiGuaInfo = result.tiGua === "upper"
    ? BA_GUA[result.mainGua.upper]!
    : BA_GUA[result.mainGua.lower]!;
  const yongGuaInfo = result.yongGua === "upper"
    ? BA_GUA[result.mainGua.upper]!
    : BA_GUA[result.mainGua.lower]!;

  return (
    <div className="meihua-result-container">
      {/* 顶部：吉凶定调 */}
      <div className="meihua-result-header">
        <div className="meihua-result-badge" style={{ "--badge-color": LEVEL_COLORS[result.relation.level] ?? "#7A8B8B" } as React.CSSProperties}>
          <span className="meihua-badge-level">{result.relation.level}</span>
          <span className="meihua-badge-type">{result.relation.type}</span>
        </div>
        <div className="meihua-result-title">
          <h2 className="meihua-result-main-title">{result.mainGua.guaName}</h2>
          <p className="meihua-result-summary">{result.relation.summary}</p>
        </div>
        {result.question && (
          <div className="meihua-result-question">
            <span className="meihua-q-icon">{catIcon}</span>
            <span>{catLabel}：{result.question}</span>
          </div>
        )}
        <p className="meihua-result-time">{result.divineTime}{t.divineSuffix}</p>
      </div>

      {/* 三卦并排展示 */}
      <div className="meihua-three-gua">
        {[
          { gua: result.mainGua, label: t.guaMain, sub: t.guaMainSub, highlight: true },
          { gua: result.huGua, label: t.guaHu, sub: t.guaHuSub, highlight: false },
          { gua: result.changeGua, label: t.guaChange, sub: t.guaChangeSub, highlight: false },
        ].map(({ gua, label, sub, highlight }) => (
          <div key={label} className={`meihua-gua-card ${highlight ? "meihua-gua-main" : ""}`}>
            <div className="meihua-gua-label-row">
              <span className="meihua-gua-label">{label}</span>
              <span className="meihua-gua-sub">{sub}</span>
            </div>
            <div className="meihua-gua-symbol-block">
              <span className="meihua-gua-symbol">{gua.symbol}</span>
            </div>
            <p className="meihua-gua-name">{gua.guaName}</p>
            <div className="meihua-gua-parts">
              <span className="meihua-gua-part">{gua.upperName} ☰</span>
              <span className="meihua-gua-slash">/</span>
              <span className="meihua-gua-part">{gua.lowerName} ☰</span>
            </div>
          </div>
        ))}
      </div>

      {/* 体用标识 */}
      <div className="meihua-tiyong-block">
        <div className="meihua-tiyong-title">
          <span className="meihua-section-dot">◆</span>
          {t.tiyongTitle}
          <span className="meihua-dong-yao">{t.dongYaoPre}{result.dongYao}{t.dongYaoPost}</span>
        </div>
        <div className="meihua-tiyong-cards">
          <div className="meihua-ti-card">
            <div className="meihua-tiyong-tag meihua-ti-tag">{t.tiTag}</div>
            <div className="meihua-tiyong-sym">{tiGuaInfo.symbol}</div>
            <div className="meihua-tiyong-name">{tiGuaInfo.name}（{tiGuaInfo.nature}）</div>
            <div
              className="meihua-tiyong-wx"
              style={{ color: WUXING_COLORS[result.tiWuXing] }}
            >
              ● {result.tiWuXing}
            </div>
            <div className="meihua-tiyong-role">{t.tiRole}</div>
            <div className="meihua-tiyong-pos">
              {result.tiGua === "upper" ? t.posUpper : t.posLower}
            </div>
          </div>

          {/* 关系箭头 */}
          <div className="meihua-tiyong-relation">
            <div
              className="meihua-rel-badge"
              style={{ background: LEVEL_COLORS[result.relation.level] ?? "#7A8B8B" }}
            >
              {result.relation.type}
            </div>
            <div className="meihua-rel-arrow">→</div>
            <div className="meihua-rel-level">{result.relation.level}</div>
          </div>

          <div className="meihua-yong-card">
            <div className="meihua-tiyong-tag meihua-yong-tag">{t.yongTag}</div>
            <div className="meihua-tiyong-sym">{yongGuaInfo.symbol}</div>
            <div className="meihua-tiyong-name">{yongGuaInfo.name}（{yongGuaInfo.nature}）</div>
            <div
              className="meihua-tiyong-wx"
              style={{ color: WUXING_COLORS[result.yongWuXing] }}
            >
              ● {result.yongWuXing}
            </div>
            <div className="meihua-tiyong-role">{t.yongRole}</div>
            <div className="meihua-tiyong-pos">
              {result.yongGua === "upper" ? t.posUpper : t.posLower}
            </div>
          </div>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="meihua-tab-bar">
        {[
          { key: "overview", label: t.tabOverview },
          { key: "guaci",    label: t.tabGuaci },
          { key: "detail",   label: t.tabDetail },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`meihua-tab-btn ${activeTab === tab.key ? "meihua-tab-active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 内容 */}
      <div className="meihua-tab-content">
        {activeTab === "overview" && (
          <div className="meihua-overview">
            {/* 吉凶定论 */}
            <div className="meihua-verdict-block">
              <div
                className="meihua-verdict-bar"
                style={{ background: LEVEL_COLORS[result.relation.level] ?? "#7A8B8B" }}
              />
              <div className="meihua-verdict-content">
                <h3 className="meihua-verdict-title">{result.relation.summary}</h3>
                <p className="meihua-verdict-detail">{result.relation.detail}</p>
              </div>
            </div>

            {/* 行事建议 */}
            <div className="meihua-advice-block">
              <div className="meihua-advice-label">
                <span className="meihua-section-dot">◈</span>
                {t.adviceLabel}
              </div>
              <p className="meihua-advice-text">{result.relation.advice}</p>
            </div>

            {/* 分类断事 */}
            {result.categoryAdvice && (
              <div className="meihua-cat-advice">
                <div className="meihua-advice-label">
                  <span className="meihua-section-dot">◈</span>
                  {catIcon} {catLabel}{t.catAdviceSuffix}
                </div>
                <p className="meihua-advice-text">{result.categoryAdvice}</p>
              </div>
            )}

            {/* AI 增强解读 */}
            {aiReading && (
              <div className="meihua-ai-block">
                <div className="meihua-ai-label">
                  <span className="meihua-ai-badge">{t.aiBadge}</span>
                </div>
                <p className="meihua-ai-text">{aiReading}</p>
              </div>
            )}

            {/* 卦象意象 */}
            <div className="meihua-imagery-block">
              <div className="meihua-advice-label">
                <span className="meihua-section-dot">◈</span>
                {t.imageryLabel}
              </div>
              <p className="meihua-imagery-text">{result.guaCiInfo.overall}</p>
              <div className="meihua-change-gua-hint">
                <span>{t.changeGuaPre}{result.changeGua.guaName}{t.changeGuaColon}</span>
                <span>{result.changeGuaCiInfo.overall}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "guaci" && (
          <div className="meihua-guaci-tab">
            {/* 本卦卦辞 */}
            <div className="meihua-guaci-section">
              <div className="meihua-guaci-header">
                <span className="meihua-guaci-sym">{result.mainGua.symbol}</span>
                <span className="meihua-guaci-name">{result.mainGua.guaName}</span>
                <span className="meihua-guaci-tag">{t.guaciTagMain}</span>
              </div>
              <div className="meihua-guaci-original">
                <span className="meihua-guaci-orig-label">{t.guaciOrigLabel}</span>
                <p className="meihua-guaci-orig-text">{result.guaCiInfo.gua_ci}</p>
              </div>
              <p className="meihua-guaci-baihua">{result.guaCiInfo.gua_ci_baihua}</p>

              {/* 动爻爻辞 */}
              <div className="meihua-yaoci-block">
                <div className="meihua-yaoci-label">
                  {t.yaociPre}{result.dongYao}{t.yaociPost}
                </div>
                <p className="meihua-yaoci-original">{result.guaCiInfo.yao_ci[result.dongYao - 1]}</p>
                <p className="meihua-yaoci-baihua">{result.guaCiInfo.yao_ci_baihua[result.dongYao - 1]}</p>
              </div>
            </div>

            {/* 变卦卦辞 */}
            <div className="meihua-guaci-section meihua-change-section">
              <div className="meihua-guaci-header">
                <span className="meihua-guaci-sym">{result.changeGua.symbol}</span>
                <span className="meihua-guaci-name">{result.changeGua.guaName}</span>
                <span className="meihua-guaci-tag meihua-change-tag">{t.guaciTagChange}</span>
              </div>
              <div className="meihua-guaci-original">
                <span className="meihua-guaci-orig-label">{t.guaciOrigLabel}</span>
                <p className="meihua-guaci-orig-text">{result.changeGuaCiInfo.gua_ci}</p>
              </div>
              <p className="meihua-guaci-baihua">{result.changeGuaCiInfo.gua_ci_baihua}</p>
            </div>
          </div>
        )}

        {activeTab === "detail" && (
          <div className="meihua-detail-tab">
            {/* 五行生克详解 */}
            <div className="meihua-detail-section">
              <div className="meihua-detail-section-title">{t.wuxingDetailTitle}</div>
              <div className="meihua-wuxing-detail">
                <div className="meihua-wuxing-row">
                  <span className="meihua-wuxing-item" style={{ color: WUXING_COLORS[result.tiWuXing] }}>
                    {t.tiPre}{tiGuaInfo.name}·{result.tiWuXing}{t.guaWxClose}
                  </span>
                  <span className="meihua-wuxing-rel">{result.relation.type}</span>
                  <span className="meihua-wuxing-item" style={{ color: WUXING_COLORS[result.yongWuXing] }}>
                    {t.yongPre}{yongGuaInfo.name}·{result.yongWuXing}{t.guaWxClose}
                  </span>
                </div>
                <div className="meihua-wuxing-explains">
                  <p>
                    {result.tiWuXing}{t.wuxingBetweenMid}{result.yongWuXing}{t.wuxingBetweenSuffix}
                    {getWuXingExplain(result.tiWuXing, result.yongWuXing)}
                  </p>
                </div>
              </div>
            </div>

            {/* 三卦详解 */}
            <div className="meihua-detail-section">
              <div className="meihua-detail-section-title">{t.threeGuaTitle}</div>
              {[
                { gua: result.mainGua, label: t.guaMain, desc: t.detailMainDesc },
                { gua: result.huGua,   label: t.guaHu, desc: t.detailHuDesc },
                { gua: result.changeGua, label: t.guaChange, desc: t.detailChangeDesc },
              ].map(({ gua, label, desc }) => (
                <div key={label} className="meihua-gua-detail-row">
                  <div className="meihua-gua-detail-header">
                    <span className="meihua-gua-detail-sym">{gua.symbol}</span>
                    <span className="meihua-gua-detail-name">{gua.guaName}</span>
                    <span className="meihua-gua-detail-tag">{label}</span>
                  </div>
                  <p className="meihua-gua-detail-desc">{desc}</p>
                  <div className="meihua-gua-parts-detail">
                    <div className="meihua-gua-part-item">
                      <span>{BA_GUA[gua.upper]!.symbol} {t.detailUpper} {gua.upperName}</span>
                      <span className="meihua-gua-part-wx" style={{ color: WUXING_COLORS[BA_GUA[gua.upper]!.wuxing] }}>
                        {BA_GUA[gua.upper]!.wuxing} · {BA_GUA[gua.upper]!.nature}
                      </span>
                    </div>
                    <div className="meihua-gua-part-item">
                      <span>{BA_GUA[gua.lower]!.symbol} {t.detailLower} {gua.lowerName}</span>
                      <span className="meihua-gua-part-wx" style={{ color: WUXING_COLORS[BA_GUA[gua.lower]!.wuxing] }}>
                        {BA_GUA[gua.lower]!.wuxing} · {BA_GUA[gua.lower]!.nature}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 起卦计算过程 */}
            <div className="meihua-detail-section">
              <button
                className="meihua-calc-toggle"
                onClick={() => setShowCalc(!showCalc)}
              >
                {showCalc ? "▾" : "▸"} {t.calcToggle}
              </button>
              {showCalc && (
                <div className="meihua-calc-detail">
                  <div className="meihua-calc-row">
                    <span className="meihua-calc-label">{t.calcUpper}</span>
                    <span className="meihua-calc-formula">{result.calcDetail.upperCalc}</span>
                    <span className="meihua-calc-result">→ {result.mainGua.upperName}（{result.mainGua.upper}）</span>
                  </div>
                  <div className="meihua-calc-row">
                    <span className="meihua-calc-label">{t.calcLower}</span>
                    <span className="meihua-calc-formula">{result.calcDetail.lowerCalc}</span>
                    <span className="meihua-calc-result">→ {result.mainGua.lowerName}（{result.mainGua.lower}）</span>
                  </div>
                  <div className="meihua-calc-row">
                    <span className="meihua-calc-label">{t.calcDong}</span>
                    <span className="meihua-calc-formula">{result.calcDetail.dongYaoCalc}</span>
                    <span className="meihua-calc-result">{t.calcDongResult}{result.dongYao}{t.calcDongResultPost}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 底部操作区 */}
      <div className="meihua-result-actions">
        <button className="meihua-action-btn meihua-reset-btn" onClick={onReset}>
          {t.resetBtn}
        </button>
        <button
          className="meihua-action-btn meihua-share-btn"
          onClick={() => {
            const text = `${t.shareTitle}\n${t.shareMainPre}${result.mainGua.guaName} ${result.mainGua.symbol}\n${result.relation.summary}\n${t.shareQuestionPre}${result.question || t.shareQuestionNone}\n${t.shareSource}`;
            if (navigator.clipboard) {
              void navigator.clipboard.writeText(text).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              });
            }
          }}
        >
          {copied ? t.shareCopied : t.shareBtn}
        </button>
      </div>

      {/* 免责声明 */}
      <p className="meihua-disclaimer">
        {t.disclaimer}
      </p>
    </div>
  );
}

function getWuXingExplain(ti: string, yong: string): string {
  const rel: Record<string, string> = {
    "金水": "金生水，用生体，外力相助，事顺人和。",
    "水木": "水生木，用生体，贵人扶持，渐入佳境。",
    "木火": "木生火，用生体，助力充足，前途光明。",
    "火土": "火生土，用生体，天时地利，大有可为。",
    "土金": "土生金，用生体，资源丰富，得天独厚。",
    "水金": "金生水，体生用，自我付出，得不偿失。",
    "木水": "水生木，体生用，耗己助人，量力而行。",
    "火木": "木生火，体生用，输出过多，保存实力。",
    "土火": "火生土，体生用，消耗精力，适可而止。",
    "金土": "土生金，体生用，付出较多，量力而为。",
    "木金": "金克木，用克体，外压较大，守正待时。",
    "水土": "土克水，用克体，阻碍重重，谨慎行事。",
    "火水": "水克火，用克体，寒气逼人，收敛为佳。",
    "金火": "火克金，用克体，逆风而行，暂避锋芒。",
    "土木": "木克土，用克体，根基受损，稳固根本。",
    "金木": "金克木，体克用，主动出击，事在人为。",
    "土水": "土克水，体克用，掌控局面，稳中求进。",
    "水火": "水克火，体克用，压制有余，但需防过度。",
    "火金": "火克金，体克用，热情主导，行动有力。",
    "木土": "木克土，体克用，突破围困，自强有为。",
  };
  return rel[`${ti}${yong}`] ?? `${ti}与${yong}之间形成${ti === yong ? "比和" : "生克"}关系，详参体用断语。`;
}
