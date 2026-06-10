"use client";

import React, { useState } from "react";
import type { QimenChart } from "../qimen-engine";

type Lang = "zh" | "en" | "tw";

// ── 解析 UI 文案（三语）─────────────────────────────
const AT = {
  zh: {
    overviewJi:     "吉格",
    overviewTotal:  "总格局",
    overviewXiong:  "凶格",
    tabGeju:        "格局总览",
    tabBusiness:    "商业决策",
    tabTravel:      "出行方位",
    gongUnit:       (n: number) => `${n}宫`,
    emptyGeju:      "本局未见明显特殊格局，诸事平顺。",
    bizHead:        "商业决策分析",
    bizSub:         "基于时局门神星神综合研判",
    bizDisclaimer:  "⚠ 格局仅供参考，重大决策请结合实际情况综合研判。",
    travelHead:     "出行方位分析",
    travelSub:      "开休生三吉门方位导引",
    travelDisclaimer: "⚠ 出行方位依据门神旺衰，空亡方位不宜轻动。",
    jxDaji: "大吉", jxJi: "吉", jxZhong: "中平", jxXiong: "凶", jxDaxiong: "大凶",
  },
  tw: {
    overviewJi:     "吉格",
    overviewTotal:  "總格局",
    overviewXiong:  "凶格",
    tabGeju:        "格局總覽",
    tabBusiness:    "商業決策",
    tabTravel:      "出行方位",
    gongUnit:       (n: number) => `${n}宮`,
    emptyGeju:      "本局未見明顯特殊格局，諸事平順。",
    bizHead:        "商業決策分析",
    bizSub:         "基於時局門神星神綜合研判",
    bizDisclaimer:  "⚠ 格局僅供參考，重大決策請結合實際情況綜合研判。",
    travelHead:     "出行方位分析",
    travelSub:      "開休生三吉門方位導引",
    travelDisclaimer: "⚠ 出行方位依據門神旺衰，空亡方位不宜輕動。",
    jxDaji: "大吉", jxJi: "吉", jxZhong: "中平", jxXiong: "凶", jxDaxiong: "大凶",
  },
  en: {
    overviewJi:     "Auspicious",
    overviewTotal:  "Total",
    overviewXiong:  "Inauspicious",
    tabGeju:        "Patterns",
    tabBusiness:    "Business",
    tabTravel:      "Travel",
    gongUnit:       (n: number) => `Palace ${n}`,
    emptyGeju:      "No notable special patterns in this chart — generally smooth.",
    bizHead:        "Business Decision Analysis",
    bizSub:         "Synthesized from time, gates, stars and spirits",
    bizDisclaimer:  "⚠ Patterns are for reference only; weigh major decisions against real circumstances.",
    travelHead:     "Travel Direction Analysis",
    travelSub:      "Guidance from the three auspicious gates: Open, Rest, Life",
    travelDisclaimer: "⚠ Travel directions follow gate strength; avoid moving toward void directions.",
    jxDaji: "Very Auspicious", jxJi: "Auspicious", jxZhong: "Neutral", jxXiong: "Inauspicious", jxDaxiong: "Very Inauspicious",
  },
};

// 吉凶枚举 → 本地化标签
function jixiongLabel(type: string, a: (typeof AT)[Lang]): string {
  switch (type) {
    case "大吉": return a.jxDaji;
    case "吉": return a.jxJi;
    case "中平": return a.jxZhong;
    case "凶": return a.jxXiong;
    case "大凶": return a.jxDaxiong;
    default: return type;
  }
}
// ────────────────────────────────────────────────────

interface QimenAnalysisProps {
  chart: QimenChart;
  lang: Lang;
}

type AnalysisTab = "business" | "travel" | "geju";

// 格局类型 → 颜色
function gejuTypeStyle(type: string): React.CSSProperties {
  switch (type) {
    case "大吉":
      return { color: "#d4a820", borderColor: "rgba(212,168,32,0.5)", background: "rgba(212,168,32,0.08)" };
    case "吉":
      return { color: "#5aaa6a", borderColor: "rgba(90,170,106,0.5)", background: "rgba(90,170,106,0.08)" };
    case "中平":
      return { color: "#8899aa", borderColor: "rgba(136,153,170,0.4)", background: "rgba(136,153,170,0.06)" };
    case "凶":
      return { color: "#cc7744", borderColor: "rgba(204,119,68,0.5)", background: "rgba(204,119,68,0.08)" };
    case "大凶":
      return { color: "#c03030", borderColor: "rgba(192,48,48,0.55)", background: "rgba(192,48,48,0.1)" };
    default:
      return { color: "#aaa", borderColor: "rgba(170,170,170,0.3)", background: "rgba(170,170,170,0.05)" };
  }
}

function gejuTypeIcon(type: string): string {
  switch (type) {
    case "大吉": return "◆";
    case "吉": return "▲";
    case "中平": return "●";
    case "凶": return "▼";
    case "大凶": return "✖";
    default: return "·";
  }
}

// 单个格局卡片
function GejuCard({ name, type, desc, gongNums, a }: {
  name: string;
  type: string;
  desc: string;
  gongNums: number[];
  a: (typeof AT)[Lang];
}) {
  const [expanded, setExpanded] = useState(false);
  const style = gejuTypeStyle(type);

  return (
    <div
      className="qm-geju-card"
      style={{
        border: `1px solid ${style.borderColor}`,
        background: style.background,
      }}
      onClick={() => setExpanded(v => !v)}
    >
      <div className="qm-geju-card-head">
        <div className="qm-geju-name-row">
          <span className="qm-geju-icon" style={{ color: style.color }}>
            {gejuTypeIcon(type)}
          </span>
          <span className="qm-geju-name" style={{ color: style.color }}>{name}</span>
          <span className="qm-geju-type-badge" style={{
            color: style.color,
            border: `1px solid ${style.borderColor}`,
          }}>
            {jixiongLabel(type, a)}
          </span>
        </div>
        {gongNums.length > 0 && (
          <div className="qm-geju-gongs">
            {gongNums.map(n => (
              <span key={n} className="qm-geju-gong-num" style={{ color: style.color }}>
                {a.gongUnit(n)}
              </span>
            ))}
          </div>
        )}
        <span className="qm-geju-expand" style={{ color: style.color, opacity: 0.6 }}>
          {expanded ? "▲" : "▼"}
        </span>
      </div>
      {expanded && (
        <div className="qm-geju-desc" style={{ borderTopColor: style.borderColor }}>
          {desc}
        </div>
      )}
    </div>
  );
}

// 分析提示行
function AnalysisTip({ tip }: { tip: string }) {
  // 解析 【xxx】 开头的格式
  const match = tip.match(/^【(.+?)】(.*)$/s);
  if (match) {
    const [, label, rest] = match;
    // 判断是否含凶性关键词
    const isXiong = (rest?.includes("凶") ?? false) || (rest?.includes("防") ?? false) || (rest?.includes("大凶") ?? false);
    const isJi = (rest?.includes("大吉") ?? false) || (rest?.includes("吉") ?? false) || (rest?.includes("利于") ?? false);
    const color = isXiong ? "#cc6644" : isJi ? "#d4a820" : "#8899bb";

    return (
      <div className="qm-analysis-tip">
        <span className="qm-analysis-label" style={{ color }}>
          {label}
        </span>
        <span className="qm-analysis-text">{rest}</span>
      </div>
    );
  }
  return (
    <div className="qm-analysis-tip">
      <span className="qm-analysis-text">{tip}</span>
    </div>
  );
}

export function QimenAnalysis({ chart, lang }: QimenAnalysisProps) {
  const a = AT[lang];
  const [tab, setTab] = useState<AnalysisTab>(
    chart.input.event === "travel" ? "travel"
      : chart.input.event === "business" ? "business"
        : "geju"
  );

  const gejuCount = chart.globalGeju.length;
  const jiCount = chart.globalGeju.filter(g => g.type === "大吉" || g.type === "吉").length;
  const xiongCount = chart.globalGeju.filter(g => g.type === "凶" || g.type === "大凶").length;

  return (
    <div className="qm-analysis-wrapper">
      {/* 格局总览徽标 */}
      <div className="qm-analysis-overview">
        <div className="qm-overview-item" style={{ color: "#d4a820" }}>
          <span className="qm-overview-num">{jiCount}</span>
          <span className="qm-overview-label">{a.overviewJi}</span>
        </div>
        <div className="qm-overview-sep" />
        <div className="qm-overview-item" style={{ color: "#8899aa" }}>
          <span className="qm-overview-num">{gejuCount}</span>
          <span className="qm-overview-label">{a.overviewTotal}</span>
        </div>
        <div className="qm-overview-sep" />
        <div className="qm-overview-item" style={{ color: "#c03030" }}>
          <span className="qm-overview-num">{xiongCount}</span>
          <span className="qm-overview-label">{a.overviewXiong}</span>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="qm-analysis-tabs">
        <button
          className={`qm-analysis-tab ${tab === "geju" ? "active" : ""}`}
          onClick={() => setTab("geju")}
        >
          <span>☯</span>
          <span>{a.tabGeju}</span>
          {gejuCount > 0 && (
            <span className="qm-tab-badge">{gejuCount}</span>
          )}
        </button>
        <button
          className={`qm-analysis-tab ${tab === "business" ? "active" : ""}`}
          onClick={() => setTab("business")}
        >
          <span>💼</span>
          <span>{a.tabBusiness}</span>
        </button>
        <button
          className={`qm-analysis-tab ${tab === "travel" ? "active" : ""}`}
          onClick={() => setTab("travel")}
        >
          <span>🧭</span>
          <span>{a.tabTravel}</span>
        </button>
      </div>

      {/* 内容区 */}
      <div className="qm-analysis-content">
        {/* 格局总览 */}
        {tab === "geju" && (
          <div className="qm-geju-list">
            {chart.globalGeju.length === 0 ? (
              <div className="qm-analysis-empty">
                <span>·</span>
                <p>{a.emptyGeju}</p>
              </div>
            ) : (
              chart.globalGeju.map((g, i) => (
                <GejuCard
                  key={i}
                  name={g.name}
                  type={g.type}
                  desc={g.desc}
                  gongNums={g.gongNums}
                  a={a}
                />
              ))
            )}
          </div>
        )}

        {/* 商业分析 */}
        {tab === "business" && (
          <div className="qm-analysis-tips">
            <div className="qm-analysis-section-head">
              <span className="qm-section-head-icon" style={{ color: "#d4a820" }}>◆</span>
              <span className="qm-section-head-title">{a.bizHead}</span>
              <span className="qm-section-head-sub">{a.bizSub}</span>
            </div>
            {chart.businessAnalysis.map((tip, i) => (
              <AnalysisTip key={i} tip={tip} />
            ))}
            <div className="qm-analysis-disclaimer">
              {a.bizDisclaimer}
            </div>
          </div>
        )}

        {/* 出行分析 */}
        {tab === "travel" && (
          <div className="qm-analysis-tips">
            <div className="qm-analysis-section-head">
              <span className="qm-section-head-icon" style={{ color: "#5aaa6a" }}>◆</span>
              <span className="qm-section-head-title">{a.travelHead}</span>
              <span className="qm-section-head-sub">{a.travelSub}</span>
            </div>
            {chart.travelAnalysis.map((tip, i) => (
              <AnalysisTip key={i} tip={tip} />
            ))}
            <div className="qm-analysis-disclaimer">
              {a.travelDisclaimer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
