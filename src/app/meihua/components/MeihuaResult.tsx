"use client";

import { useState } from "react";
import type { MeihuaResult } from "../meihua-engine";
import { BA_GUA, QUESTION_CATEGORIES, wuxingLabel, type WuXing } from "../meihua-data";
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

export default function MeihuaResultComponent({ lang, t, result, aiReading, onReset }: MeihuaResultProps) {
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
          <span className="meihua-badge-level">{result.relation.levelLabel}</span>
          <span className="meihua-badge-type">{result.relation.typeLabel}</span>
        </div>
        <div className="meihua-result-title">
          <h2 className="meihua-result-main-title">{result.mainGua.guaNameDisplay}</h2>
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
            <p className="meihua-gua-name">{gua.guaNameDisplay}</p>
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
            <div className="meihua-tiyong-name">{tiGuaInfo.nameLabel[lang]}（{tiGuaInfo.nature[lang]}）</div>
            <div
              className="meihua-tiyong-wx"
              style={{ color: WUXING_COLORS[result.tiWuXing] }}
            >
              ● {wuxingLabel(result.tiWuXing, lang)}
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
              {result.relation.typeLabel}
            </div>
            <div className="meihua-rel-arrow">→</div>
            <div className="meihua-rel-level">{result.relation.levelLabel}</div>
          </div>

          <div className="meihua-yong-card">
            <div className="meihua-tiyong-tag meihua-yong-tag">{t.yongTag}</div>
            <div className="meihua-tiyong-sym">{yongGuaInfo.symbol}</div>
            <div className="meihua-tiyong-name">{yongGuaInfo.nameLabel[lang]}（{yongGuaInfo.nature[lang]}）</div>
            <div
              className="meihua-tiyong-wx"
              style={{ color: WUXING_COLORS[result.yongWuXing] }}
            >
              ● {wuxingLabel(result.yongWuXing, lang)}
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
                <span>{t.changeGuaPre}{result.changeGua.guaNameDisplay}{t.changeGuaColon}</span>
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
                <span className="meihua-guaci-name">{result.mainGua.guaNameDisplay}</span>
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
                <span className="meihua-guaci-name">{result.changeGua.guaNameDisplay}</span>
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
                    {t.tiPre}{tiGuaInfo.nameLabel[lang]}·{wuxingLabel(result.tiWuXing, lang)}{t.guaWxClose}
                  </span>
                  <span className="meihua-wuxing-rel">{result.relation.typeLabel}</span>
                  <span className="meihua-wuxing-item" style={{ color: WUXING_COLORS[result.yongWuXing] }}>
                    {t.yongPre}{yongGuaInfo.nameLabel[lang]}·{wuxingLabel(result.yongWuXing, lang)}{t.guaWxClose}
                  </span>
                </div>
                <div className="meihua-wuxing-explains">
                  <p>
                    {wuxingLabel(result.tiWuXing, lang)}{t.wuxingBetweenMid}{wuxingLabel(result.yongWuXing, lang)}{t.wuxingBetweenSuffix}
                    {getWuXingExplain(result.tiWuXing, result.yongWuXing, lang)}
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
                    <span className="meihua-gua-detail-name">{gua.guaNameDisplay}</span>
                    <span className="meihua-gua-detail-tag">{label}</span>
                  </div>
                  <p className="meihua-gua-detail-desc">{desc}</p>
                  <div className="meihua-gua-parts-detail">
                    <div className="meihua-gua-part-item">
                      <span>{BA_GUA[gua.upper]!.symbol} {t.detailUpper} {gua.upperName}</span>
                      <span className="meihua-gua-part-wx" style={{ color: WUXING_COLORS[BA_GUA[gua.upper]!.wuxing] }}>
                        {wuxingLabel(BA_GUA[gua.upper]!.wuxing, lang)} · {BA_GUA[gua.upper]!.nature[lang]}
                      </span>
                    </div>
                    <div className="meihua-gua-part-item">
                      <span>{BA_GUA[gua.lower]!.symbol} {t.detailLower} {gua.lowerName}</span>
                      <span className="meihua-gua-part-wx" style={{ color: WUXING_COLORS[BA_GUA[gua.lower]!.wuxing] }}>
                        {wuxingLabel(BA_GUA[gua.lower]!.wuxing, lang)} · {BA_GUA[gua.lower]!.nature[lang]}
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
            const text = `${t.shareTitle}\n${t.shareMainPre}${result.mainGua.guaNameDisplay} ${result.mainGua.symbol}\n${result.relation.summary}\n${t.shareQuestionPre}${result.question || t.shareQuestionNone}\n${t.shareSource}`;
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

function getWuXingExplain(ti: WuXing, yong: WuXing, lang: Lang): string {
  // KEY 为中文五行配对（金水/水木...），文案三语
  const rel: Record<string, { zh: string; en: string; tw: string }> = {
    "金水": { zh: "金生水，用生体，外力相助，事顺人和。", tw: "金生水，用生體，外力相助，事順人和。", en: "Metal generates Water — Guest nourishes Host; outside forces lend aid, and matters go smoothly." },
    "水木": { zh: "水生木，用生体，贵人扶持，渐入佳境。", tw: "水生木，用生體，貴人扶持，漸入佳境。", en: "Water generates Wood — Guest nourishes Host; a benefactor supports you, and things steadily improve." },
    "木火": { zh: "木生火，用生体，助力充足，前途光明。", tw: "木生火，用生體，助力充足，前途光明。", en: "Wood generates Fire — Guest nourishes Host; support is ample and the road ahead is bright." },
    "火土": { zh: "火生土，用生体，天时地利，大有可为。", tw: "火生土，用生體，天時地利，大有可為。", en: "Fire generates Earth — Guest nourishes Host; time and place are favorable, and much can be achieved." },
    "土金": { zh: "土生金，用生体，资源丰富，得天独厚。", tw: "土生金，用生體，資源豐富，得天獨厚。", en: "Earth generates Metal — Guest nourishes Host; resources are abundant and conditions exceptionally favorable." },
    "水金": { zh: "金生水，体生用，自我付出，得不偿失。", tw: "金生水，體生用，自我付出，得不償失。", en: "Metal generates Water — Host nourishes Guest; you give of yourself for too little return." },
    "木水": { zh: "水生木，体生用，耗己助人，量力而行。", tw: "水生木，體生用，耗己助人，量力而行。", en: "Water generates Wood — Host nourishes Guest; you spend yourself to help others, so act within your means." },
    "火木": { zh: "木生火，体生用，输出过多，保存实力。", tw: "木生火，體生用，輸出過多，保存實力。", en: "Wood generates Fire — Host nourishes Guest; output is excessive, so conserve your strength." },
    "土火": { zh: "火生土，体生用，消耗精力，适可而止。", tw: "火生土，體生用，消耗精力，適可而止。", en: "Fire generates Earth — Host nourishes Guest; energy is drained, so know when to stop." },
    "金土": { zh: "土生金，体生用，付出较多，量力而为。", tw: "土生金，體生用，付出較多，量力而為。", en: "Earth generates Metal — Host nourishes Guest; you give a good deal, so act within your means." },
    "木金": { zh: "金克木，用克体，外压较大，守正待时。", tw: "金剋木，用剋體，外壓較大，守正待時。", en: "Metal controls Wood — Guest controls Host; outside pressure is strong, so hold to what is right and bide your time." },
    "水土": { zh: "土克水，用克体，阻碍重重，谨慎行事。", tw: "土剋水，用剋體，阻礙重重，謹慎行事。", en: "Earth controls Water — Guest controls Host; obstacles abound, so act with caution." },
    "火水": { zh: "水克火，用克体，寒气逼人，收敛为佳。", tw: "水剋火，用剋體，寒氣逼人，收斂為佳。", en: "Water controls Fire — Guest controls Host; a chill bears down on you, so it is best to hold back." },
    "金火": { zh: "火克金，用克体，逆风而行，暂避锋芒。", tw: "火剋金，用剋體，逆風而行，暫避鋒芒。", en: "Fire controls Metal — Guest controls Host; you move against the wind, so step aside from the brunt for now." },
    "土木": { zh: "木克土，用克体，根基受损，稳固根本。", tw: "木剋土，用剋體，根基受損，穩固根本。", en: "Wood controls Earth — Guest controls Host; the foundation is harmed, so shore up the roots." },
    "金木": { zh: "金克木，体克用，主动出击，事在人为。", tw: "金剋木，體剋用，主動出擊，事在人為。", en: "Metal controls Wood — Host controls Guest; take the initiative, for success lies in your effort." },
    "土水": { zh: "土克水，体克用，掌控局面，稳中求进。", tw: "土剋水，體剋用，掌控局面，穩中求進。", en: "Earth controls Water — Host controls Guest; you command the situation, so advance steadily." },
    "水火": { zh: "水克火，体克用，压制有余，但需防过度。", tw: "水剋火，體剋用，壓制有餘，但需防過度。", en: "Water controls Fire — Host controls Guest; you have the upper hand, but guard against overdoing it." },
    "火金": { zh: "火克金，体克用，热情主导，行动有力。", tw: "火剋金，體剋用，熱情主導，行動有力。", en: "Fire controls Metal — Host controls Guest; passion leads and action is forceful." },
    "木土": { zh: "木克土，体克用，突破围困，自强有为。", tw: "木剋土，體剋用，突破圍困，自強有為。", en: "Wood controls Earth — Host controls Guest; break through what surrounds you and act with self-reliant strength." },
  };
  const found = rel[`${ti}${yong}`];
  if (found) return found[lang];
  const same = ti === yong;
  if (lang === "en") {
    return same
      ? `${wuxingLabel(ti, lang)} and ${wuxingLabel(yong, lang)} are in harmony — see the Host-Guest reading.`
      : `Between ${wuxingLabel(ti, lang)} and ${wuxingLabel(yong, lang)} a generating-or-controlling relationship forms — see the Host-Guest reading.`;
  }
  const tiL = wuxingLabel(ti, lang);
  const yongL = wuxingLabel(yong, lang);
  if (lang === "tw") {
    return `${tiL}與${yongL}之間形成${same ? "比和" : "生剋"}關係，詳參體用斷語。`;
  }
  return `${tiL}与${yongL}之间形成${same ? "比和" : "生克"}关系，详参体用断语。`;
}
