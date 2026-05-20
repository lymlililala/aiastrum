"use client";

import { useState } from "react";
import type { MeihuaResult } from "../meihua-engine";
import { BA_GUA, QUESTION_CATEGORIES } from "../meihua-data";

interface MeihuaResultProps {
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

export default function MeihuaResultComponent({ result, aiReading, onReset }: MeihuaResultProps) {
const [activeTab, setActiveTab] = useState<"overview" | "guaci" | "detail">("overview");
const [showCalc, setShowCalc] = useState(false);
const [copied, setCopied] = useState(false);

  const catLabel = QUESTION_CATEGORIES.find(c => c.id === result.category)?.label ?? "综合";
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
        <p className="meihua-result-time">{result.divineTime} 占</p>
      </div>

      {/* 三卦并排展示 */}
      <div className="meihua-three-gua">
        {[
          { gua: result.mainGua, label: "本卦", sub: "当下之象", highlight: true },
          { gua: result.huGua, label: "互卦", sub: "内在过程", highlight: false },
          { gua: result.changeGua, label: "变卦", sub: "未来走势", highlight: false },
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
          体用分析
          <span className="meihua-dong-yao">动爻：第 {result.dongYao} 爻</span>
        </div>
        <div className="meihua-tiyong-cards">
          <div className="meihua-ti-card">
            <div className="meihua-tiyong-tag meihua-ti-tag">体卦</div>
            <div className="meihua-tiyong-sym">{tiGuaInfo.symbol}</div>
            <div className="meihua-tiyong-name">{tiGuaInfo.name}（{tiGuaInfo.nature}）</div>
            <div
              className="meihua-tiyong-wx"
              style={{ color: WUXING_COLORS[result.tiWuXing] }}
            >
              ● {result.tiWuXing}
            </div>
            <div className="meihua-tiyong-role">代表自身·主体</div>
            <div className="meihua-tiyong-pos">
              {result.tiGua === "upper" ? "上卦（4-6爻）" : "下卦（1-3爻）"}
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
            <div className="meihua-tiyong-tag meihua-yong-tag">用卦</div>
            <div className="meihua-tiyong-sym">{yongGuaInfo.symbol}</div>
            <div className="meihua-tiyong-name">{yongGuaInfo.name}（{yongGuaInfo.nature}）</div>
            <div
              className="meihua-tiyong-wx"
              style={{ color: WUXING_COLORS[result.yongWuXing] }}
            >
              ● {result.yongWuXing}
            </div>
            <div className="meihua-tiyong-role">代表事物·客体</div>
            <div className="meihua-tiyong-pos">
              {result.yongGua === "upper" ? "上卦（4-6爻）" : "下卦（1-3爻）"}
            </div>
          </div>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="meihua-tab-bar">
        {[
          { key: "overview", label: "断卦解析" },
          { key: "guaci",    label: "卦辞爻辞" },
          { key: "detail",   label: "详细说明" },
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
                行事建议
              </div>
              <p className="meihua-advice-text">{result.relation.advice}</p>
            </div>

            {/* 分类断事 */}
            {result.categoryAdvice && (
              <div className="meihua-cat-advice">
                <div className="meihua-advice-label">
                  <span className="meihua-section-dot">◈</span>
                  {catIcon} {catLabel}专项分析
                </div>
                <p className="meihua-advice-text">{result.categoryAdvice}</p>
              </div>
            )}

            {/* AI 增强解读 */}
            {aiReading && (
              <div className="meihua-ai-block">
                <div className="meihua-ai-label">
                  <span className="meihua-ai-badge">✦ AI 解读</span>
                </div>
                <p className="meihua-ai-text">{aiReading}</p>
              </div>
            )}

            {/* 卦象意象 */}
            <div className="meihua-imagery-block">
              <div className="meihua-advice-label">
                <span className="meihua-section-dot">◈</span>
                本卦象意
              </div>
              <p className="meihua-imagery-text">{result.guaCiInfo.overall}</p>
              <div className="meihua-change-gua-hint">
                <span>变卦 {result.changeGua.guaName}：</span>
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
                <span className="meihua-guaci-tag">本卦</span>
              </div>
              <div className="meihua-guaci-original">
                <span className="meihua-guaci-orig-label">《周易》原文：</span>
                <p className="meihua-guaci-orig-text">{result.guaCiInfo.gua_ci}</p>
              </div>
              <p className="meihua-guaci-baihua">{result.guaCiInfo.gua_ci_baihua}</p>

              {/* 动爻爻辞 */}
              <div className="meihua-yaoci-block">
                <div className="meihua-yaoci-label">
                  动爻（第 {result.dongYao} 爻）：
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
                <span className="meihua-guaci-tag meihua-change-tag">变卦</span>
              </div>
              <div className="meihua-guaci-original">
                <span className="meihua-guaci-orig-label">《周易》原文：</span>
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
              <div className="meihua-detail-section-title">五行生克详解</div>
              <div className="meihua-wuxing-detail">
                <div className="meihua-wuxing-row">
                  <span className="meihua-wuxing-item" style={{ color: WUXING_COLORS[result.tiWuXing] }}>
                    体（{tiGuaInfo.name}·{result.tiWuXing}）
                  </span>
                  <span className="meihua-wuxing-rel">{result.relation.type}</span>
                  <span className="meihua-wuxing-item" style={{ color: WUXING_COLORS[result.yongWuXing] }}>
                    用（{yongGuaInfo.name}·{result.yongWuXing}）
                  </span>
                </div>
                <div className="meihua-wuxing-explains">
                  <p>
                    {result.tiWuXing}（体）与{result.yongWuXing}（用）之间：
                    {getWuXingExplain(result.tiWuXing, result.yongWuXing)}
                  </p>
                </div>
              </div>
            </div>

            {/* 三卦详解 */}
            <div className="meihua-detail-section">
              <div className="meihua-detail-section-title">三卦详解</div>
              {[
                { gua: result.mainGua, label: "本卦", desc: "当下的状态与环境，代表事情的本质与现实情况。" },
                { gua: result.huGua,   label: "互卦", desc: "事情发展的内在过程，代表事情的核心与中间阶段。" },
                { gua: result.changeGua, label: "变卦", desc: "动爻变化后的未来走向，代表事情最终的结果与趋势。" },
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
                      <span>{BA_GUA[gua.upper]!.symbol} 上卦 {gua.upperName}</span>
                      <span className="meihua-gua-part-wx" style={{ color: WUXING_COLORS[BA_GUA[gua.upper]!.wuxing] }}>
                        {BA_GUA[gua.upper]!.wuxing} · {BA_GUA[gua.upper]!.nature}
                      </span>
                    </div>
                    <div className="meihua-gua-part-item">
                      <span>{BA_GUA[gua.lower]!.symbol} 下卦 {gua.lowerName}</span>
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
                {showCalc ? "▾" : "▸"} 查看起卦计算过程
              </button>
              {showCalc && (
                <div className="meihua-calc-detail">
                  <div className="meihua-calc-row">
                    <span className="meihua-calc-label">上卦推算</span>
                    <span className="meihua-calc-formula">{result.calcDetail.upperCalc}</span>
                    <span className="meihua-calc-result">→ {result.mainGua.upperName}（{result.mainGua.upper}）</span>
                  </div>
                  <div className="meihua-calc-row">
                    <span className="meihua-calc-label">下卦推算</span>
                    <span className="meihua-calc-formula">{result.calcDetail.lowerCalc}</span>
                    <span className="meihua-calc-result">→ {result.mainGua.lowerName}（{result.mainGua.lower}）</span>
                  </div>
                  <div className="meihua-calc-row">
                    <span className="meihua-calc-label">动爻推算</span>
                    <span className="meihua-calc-formula">{result.calcDetail.dongYaoCalc}</span>
                    <span className="meihua-calc-result">→ 第 {result.dongYao} 爻</span>
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
          ✿ 重新起卦
        </button>
        <button
          className="meihua-action-btn meihua-share-btn"
          onClick={() => {
            const text = `【梅花心易排盘】\n本卦：${result.mainGua.guaName} ${result.mainGua.symbol}\n${result.relation.summary}\n占问：${result.question || "无"}\n来源：梅花心易`;
            if (navigator.clipboard) {
              void navigator.clipboard.writeText(text).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              });
            }
          }}
        >
          {copied ? "✓ 已复制" : "↗ 复制分享"}
        </button>
      </div>

      {/* 免责声明 */}
      <p className="meihua-disclaimer">
        ⚠ 占卜仅供国学文化赏玩与心理参考，切勿迷信。"善易者不卜"——真正懂易的人，用易理指导人生而非迷信卦象。
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
