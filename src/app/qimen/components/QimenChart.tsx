"use client";

import React, { useState } from "react";
import type { QimenChart, GongData } from "../qimen-engine";
import { LUOSHU_LAYOUT } from "../qimen-data";
import { MEN_JIXIONG, XING_JIXIONG, SHEN_JIXIONG } from "../qimen-data";
import {
  gateName, starName, starShortName, godName,
  gongName as gongDisplayName, gongShortName, baguaName, wuxingName,
  fangweiName, ganName, ganZhiName, zhiName, jieqiName,
} from "../qimen-data";

type Lang = "zh" | "en" | "tw";

// ── 盘面 UI 文案（三语）─────────────────────────────
const CT = {
  zh: {
    infoGanZhi:   "干支",
    infoJieQi:    "节气",
    infoJu:       "局数",
    infoXunKong:  "旬空",
    infoMaXing:   "马星",
    infoSolar:    "真太阳时",
    yearUnit:     "年", monthUnit: "月", dayUnit: "日", hourUnit: "时",
    detailFangwei: "方",
    detailBagua:  "八卦",
    detailWuxing: "五行",
    detailDiPan:  "地盘",
    detailTianPan: "天盘",
    detailMen:    "八门",
    detailXing:   "九星",
    detailShen:   "八神",
    kongWarn:     "⚠ 此宫旬空，主落空或延迟",
    maGood:       "✦ 马星临此，利于出行疾行",
    dirNW: "西北", dirS: "南", dirSW: "西南",
    dirW: "西", dirCenter: "中", dirE: "东",
    dirNE: "东北", dirN: "北", dirSE: "东南",
    jxDaji: "大吉", jxJi: "吉", jxZhong: "中平", jxXiong: "凶", jxDaxiong: "大凶",
    markKong: "空", markMa: "马",
    detailTianPanShort: "天", detailDiPanShort: "地", centerLabel: "中五",
  },
  tw: {
    infoGanZhi:   "干支",
    infoJieQi:    "節氣",
    infoJu:       "局數",
    infoXunKong:  "旬空",
    infoMaXing:   "馬星",
    infoSolar:    "真太陽時",
    yearUnit:     "年", monthUnit: "月", dayUnit: "日", hourUnit: "時",
    detailFangwei: "方",
    detailBagua:  "八卦",
    detailWuxing: "五行",
    detailDiPan:  "地盤",
    detailTianPan: "天盤",
    detailMen:    "八門",
    detailXing:   "九星",
    detailShen:   "八神",
    kongWarn:     "⚠ 此宮旬空，主落空或延遲",
    maGood:       "✦ 馬星臨此，利於出行疾行",
    dirNW: "西北", dirS: "南", dirSW: "西南",
    dirW: "西", dirCenter: "中", dirE: "東",
    dirNE: "東北", dirN: "北", dirSE: "東南",
    jxDaji: "大吉", jxJi: "吉", jxZhong: "中平", jxXiong: "凶", jxDaxiong: "大凶",
    markKong: "空", markMa: "馬",
    detailTianPanShort: "天", detailDiPanShort: "地", centerLabel: "中五",
  },
  en: {
    infoGanZhi:   "GanZhi",
    infoJieQi:    "Solar Term",
    infoJu:       "Ju",
    infoXunKong:  "Void",
    infoMaXing:   "Horse Star",
    infoSolar:    "True Solar Time",
    yearUnit:     "Y", monthUnit: "M", dayUnit: "D", hourUnit: "H",
    detailFangwei: " sector",
    detailBagua:  "Trigram",
    detailWuxing: "Element",
    detailDiPan:  "Earth Plate",
    detailTianPan: "Heaven Plate",
    detailMen:    "Gate",
    detailXing:   "Star",
    detailShen:   "Spirit",
    kongWarn:     "⚠ This palace is void — may indicate emptiness or delay",
    maGood:       "✦ Horse Star here — favorable for travel and swift action",
    dirNW: "NW", dirS: "S", dirSW: "SW",
    dirW: "W", dirCenter: "C", dirE: "E",
    dirNE: "NE", dirN: "N", dirSE: "SE",
    jxDaji: "Very Auspicious", jxJi: "Auspicious", jxZhong: "Neutral", jxXiong: "Inauspicious", jxDaxiong: "Very Inauspicious",
    markKong: "Void", markMa: "Horse",
    detailTianPanShort: "H", detailDiPanShort: "E", centerLabel: "Center 5",
  },
};

// 吉凶枚举 → 本地化标签
function jixiongLabel(jx: string, c: (typeof CT)[Lang]): string {
  switch (jx) {
    case "大吉": return c.jxDaji;
    case "吉": return c.jxJi;
    case "中平": return c.jxZhong;
    case "凶": return c.jxXiong;
    case "大凶": return c.jxDaxiong;
    default: return jx;
  }
}
// ────────────────────────────────────────────────────

// 局数字符串本地化（解析引擎产出的「阳遁X局 / 阴遁X局」）
function localizeYinyangJu(s: string, lang: Lang): string {
  if (lang === "zh") return s;
  const m = s.match(/^(阳|阴)遁(\d+)局$/);
  if (!m) return s;
  const isYang = m[1] === "阳";
  const num = m[2];
  if (lang === "tw") return `${isYang ? "陽" : "陰"}遁${num}局`;
  return `${isYang ? "Yang" : "Yin"} Dun · Ju ${num}`;
}

interface QimenChartProps {
  chart: QimenChart;
  lang: Lang;
}

// 吉凶 → 颜色类名
function jixiongClass(jx: string): string {
  switch (jx) {
    case "大吉": return "jx-daji";
    case "吉": return "jx-ji";
    case "中平": return "jx-zhong";
    case "凶": return "jx-xiong";
    case "大凶": return "jx-daxiong";
    default: return "";
  }
}

// 单个宫位格子
function GongCell({
  gongData,
  isCenter,
  onClick,
  c,
  lang,
}: {
  gongData: GongData;
  isCenter: boolean;
  onClick: () => void;
  c: (typeof CT)[Lang];
  lang: Lang;
}) {
  const menJx = gongData.men ? MEN_JIXIONG[gongData.men] ?? "中平" : null;
  const xingJx = XING_JIXIONG[gongData.xing] ?? "中平";
  const shenJx = SHEN_JIXIONG[gongData.shen] ?? "中平";

  return (
    <div
      className={`qm-gong-cell ${isCenter ? "center" : ""} ${gongData.isKong ? "kong" : ""}`}
      onClick={onClick}
    >
      {/* 宫位序号角标 */}
      <div className="qm-gong-num">{gongData.gongNum}</div>

      {/* 旬空标记 */}
      {gongData.isKong && <div className="qm-kong-mark">{c.markKong}</div>}
      {/* 马星标记 */}
      {gongData.isMa && <div className="qm-ma-mark">{c.markMa}</div>}

      {/* 八神 */}
      <div className={`qm-shen ${jixiongClass(shenJx)}`}>
        {godName(gongData.shen, lang)}
      </div>

      {/* 九星 */}
      <div className={`qm-xing ${jixiongClass(xingJx)}`}>
        {starShortName(gongData.xing, lang)}
      </div>

      {/* 天盘天干 */}
      <div className="qm-tian-gan">
        <span className="qm-gan-label">{c.detailTianPanShort}</span>
        <span className="qm-gan-value">{ganName(gongData.tianTianGan, lang)}</span>
      </div>

      {/* 八门 */}
      {gongData.men ? (
        <div className={`qm-men ${jixiongClass(menJx ?? "中平")}`}>
          {gateName(gongData.men, lang)}
        </div>
      ) : (
        isCenter && <div className="qm-men qm-center-label">{c.centerLabel}</div>
      )}

      {/* 地盘天干 */}
      <div className="qm-di-gan">
        <span className="qm-gan-label">{c.detailDiPanShort}</span>
        <span className="qm-gan-value">{ganName(gongData.tiDiTianGan, lang)}</span>
      </div>

      {/* 宫名 */}
      <div className="qm-gong-name">{gongShortName(gongData.gongName, lang)}</div>
    </div>
  );
}

// 宫位详情弹窗
function GongDetail({ gongData, onClose, c, lang }: { gongData: GongData; onClose: () => void; c: (typeof CT)[Lang]; lang: Lang }) {
  return (
    <div className="qm-detail-overlay" onClick={onClose}>
      <div className="qm-detail-modal" onClick={e => e.stopPropagation()}>
        <div className="qm-detail-header">
          <h3>{gongDisplayName(gongData.gongName, lang)} · {fangweiName(gongData.fangwei, lang)}{c.detailFangwei}</h3>
          <button className="qm-detail-close" onClick={onClose}>✕</button>
        </div>
        <div className="qm-detail-body">
          <div className="qm-detail-row">
            <span className="qm-detail-key">{c.detailBagua}</span>
            <span className="qm-detail-val">{baguaName(gongData.bagua, lang)}</span>
          </div>
          <div className="qm-detail-row">
            <span className="qm-detail-key">{c.detailWuxing}</span>
            <span className="qm-detail-val">{wuxingName(gongData.wuxing, lang)}</span>
          </div>
          <div className="qm-detail-row">
            <span className="qm-detail-key">{c.detailDiPan}</span>
            <span className="qm-detail-val qm-detail-highlight">{ganName(gongData.tiDiTianGan, lang)}</span>
          </div>
          <div className="qm-detail-row">
            <span className="qm-detail-key">{c.detailTianPan}</span>
            <span className="qm-detail-val qm-detail-highlight">{ganName(gongData.tianTianGan, lang)}</span>
          </div>
          {gongData.men && (
            <div className="qm-detail-row">
              <span className="qm-detail-key">{c.detailMen}</span>
              <span className={`qm-detail-val ${jixiongClass(MEN_JIXIONG[gongData.men] ?? "中平")}`}>
                {gateName(gongData.men, lang)}（{jixiongLabel(MEN_JIXIONG[gongData.men] ?? "中平", c)}）
              </span>
            </div>
          )}
          <div className="qm-detail-row">
            <span className="qm-detail-key">{c.detailXing}</span>
            <span className={`qm-detail-val ${jixiongClass(XING_JIXIONG[gongData.xing] ?? "中平")}`}>
              {starName(gongData.xing, lang)}（{jixiongLabel(XING_JIXIONG[gongData.xing] ?? "中平", c)}）
            </span>
          </div>
          <div className="qm-detail-row">
            <span className="qm-detail-key">{c.detailShen}</span>
            <span className={`qm-detail-val ${jixiongClass(SHEN_JIXIONG[gongData.shen] ?? "中平")}`}>
              {godName(gongData.shen, lang)}（{jixiongLabel(SHEN_JIXIONG[gongData.shen] ?? "中平", c)}）
            </span>
          </div>
          {gongData.isKong && (
            <div className="qm-detail-warn">{c.kongWarn}</div>
          )}
          {gongData.isMa && (
            <div className="qm-detail-good">{c.maGood}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export function QimenChartView({ chart, lang }: QimenChartProps) {
  const c = CT[lang];
  const [selectedGong, setSelectedGong] = useState<GongData | null>(null);

  // 按九宫洛书布局获取宫位数据
  const getGong = (gongNum: number): GongData =>
    chart.gongs.find(g => g.gongNum === gongNum) ?? chart.gongs[0]!;

  return (
    <div className="qm-chart-wrapper">
      {/* 基础信息栏 */}
      <div className="qm-info-bar">
        <div className="qm-info-item">
          <span className="qm-info-key">{c.infoGanZhi}</span>
          <span className="qm-info-val">
            {ganZhiName(chart.ganZhiYear, lang)}{c.yearUnit} {ganZhiName(chart.ganZhiMonth, lang)}{c.monthUnit} {ganZhiName(chart.ganZhiDay, lang)}{c.dayUnit} {ganZhiName(chart.ganZhiHour, lang)}{c.hourUnit}
          </span>
        </div>
        <div className="qm-info-item">
          <span className="qm-info-key">{c.infoJieQi}</span>
          <span className="qm-info-val">{jieqiName(chart.jieQiName, lang)}</span>
        </div>
        <div className="qm-info-item qm-info-ju">
          <span className="qm-info-key">{c.infoJu}</span>
          <span className="qm-info-val qm-info-ju-val">{localizeYinyangJu(chart.yinyangJu, lang)}</span>
        </div>
        <div className="qm-info-item">
          <span className="qm-info-key">{c.infoXunKong}</span>
          <span className="qm-info-val">{chart.xunKong.map(z => zhiName(z, lang)).join(lang === "en" ? ", " : "、")}</span>
        </div>
        <div className="qm-info-item">
          <span className="qm-info-key">{c.infoMaXing}</span>
          <span className="qm-info-val">{zhiName(chart.maXing, lang)}</span>
        </div>
        <div className="qm-info-item">
          <span className="qm-info-key">{c.infoSolar}</span>
          <span className="qm-info-val">{chart.solarTime}</span>
        </div>
      </div>

      {/* 九宫格主盘 */}
      <div className="qm-nine-grid">
        {LUOSHU_LAYOUT.map((row, _rIdx) =>
          row.map((gongNum, _cIdx) => (
            <GongCell
              key={gongNum}
              gongData={getGong(gongNum)}
              isCenter={gongNum === 5}
              onClick={() => setSelectedGong(getGong(gongNum))}
              c={c}
              lang={lang}
            />
          ))
        )}
      </div>

      {/* 方位指示 */}
      <div className="qm-compass">
        <div className="qm-compass-row top">
          <span className="qm-compass-dir">{c.dirNW}</span>
          <span className="qm-compass-dir highlight">{c.dirS} ☲</span>
          <span className="qm-compass-dir">{c.dirSW}</span>
        </div>
        <div className="qm-compass-row mid">
          <span className="qm-compass-dir highlight">{c.dirW} ☱</span>
          <span className="qm-compass-dir center-mark">{c.dirCenter}</span>
          <span className="qm-compass-dir highlight">{c.dirE} ☳</span>
        </div>
        <div className="qm-compass-row bot">
          <span className="qm-compass-dir">{c.dirNE}</span>
          <span className="qm-compass-dir highlight">{c.dirN} ☵</span>
          <span className="qm-compass-dir">{c.dirSE}</span>
        </div>
      </div>

      {/* 图例 */}
      <div className="qm-legend">
        <div className="qm-legend-item jx-daji">{c.jxDaji}</div>
        <div className="qm-legend-item jx-ji">{c.jxJi}</div>
        <div className="qm-legend-item jx-zhong">{c.jxZhong}</div>
        <div className="qm-legend-item jx-xiong">{c.jxXiong}</div>
        <div className="qm-legend-item jx-daxiong">{c.jxDaxiong}</div>
        <div className="qm-legend-sep" />
        <div className="qm-legend-item qm-kong-mark" style={{ position: "static" }}>{c.markKong}</div>
        <div className="qm-legend-item qm-ma-mark" style={{ position: "static" }}>{c.markMa}</div>
      </div>

      {/* 宫位详情弹窗 */}
      {selectedGong && (
        <GongDetail
          gongData={selectedGong}
          onClose={() => setSelectedGong(null)}
          c={c}
          lang={lang}
        />
      )}
    </div>
  );
}
