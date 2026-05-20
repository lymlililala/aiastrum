"use client";

import React, { useState } from "react";
import type { QimenChart, GongData } from "../qimen-engine";
import { LUOSHU_LAYOUT } from "../qimen-data";
import { MEN_JIXIONG, XING_JIXIONG, SHEN_JIXIONG } from "../qimen-data";

interface QimenChartProps {
  chart: QimenChart;
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
}: {
  gongData: GongData;
  isCenter: boolean;
  onClick: () => void;
}) {
  const menJx = gongData.men ? MEN_JIXIONG[gongData.men] ?? "中平" : null;
  const xingJx = XING_JIXIONG[gongData.xing] ?? "中平";
  const shenJx = SHEN_JIXIONG[gongData.shen] ?? "中平";

  return (
    <div
      className={`qm-gong-cell ${isCenter ? "center" : ""} ${gongData.isKong ? "kong" : ""}`}
      onClick={onClick}
      title={`点击查看${gongData.gongName}详情`}
    >
      {/* 宫位序号角标 */}
      <div className="qm-gong-num">{gongData.gongNum}</div>

      {/* 旬空标记 */}
      {gongData.isKong && <div className="qm-kong-mark">空</div>}
      {/* 马星标记 */}
      {gongData.isMa && <div className="qm-ma-mark">马</div>}

      {/* 八神 */}
      <div className={`qm-shen ${jixiongClass(shenJx)}`}>
        {gongData.shen}
      </div>

      {/* 九星 */}
      <div className={`qm-xing ${jixiongClass(xingJx)}`}>
        {gongData.xing.replace("天", "")}
      </div>

      {/* 天盘天干 */}
      <div className="qm-tian-gan">
        <span className="qm-gan-label">天</span>
        <span className="qm-gan-value">{gongData.tianTianGan}</span>
      </div>

      {/* 八门 */}
      {gongData.men ? (
        <div className={`qm-men ${jixiongClass(menJx ?? "中平")}`}>
          {gongData.men}
        </div>
      ) : (
        isCenter && <div className="qm-men qm-center-label">中五</div>
      )}

      {/* 地盘天干 */}
      <div className="qm-di-gan">
        <span className="qm-gan-label">地</span>
        <span className="qm-gan-value">{gongData.tiDiTianGan}</span>
      </div>

      {/* 宫名 */}
      <div className="qm-gong-name">{gongData.gongName.replace("宫", "")}</div>
    </div>
  );
}

// 宫位详情弹窗
function GongDetail({ gongData, onClose }: { gongData: GongData; onClose: () => void }) {
  return (
    <div className="qm-detail-overlay" onClick={onClose}>
      <div className="qm-detail-modal" onClick={e => e.stopPropagation()}>
        <div className="qm-detail-header">
          <h3>{gongData.gongName} · {gongData.fangwei}方</h3>
          <button className="qm-detail-close" onClick={onClose}>✕</button>
        </div>
        <div className="qm-detail-body">
          <div className="qm-detail-row">
            <span className="qm-detail-key">八卦</span>
            <span className="qm-detail-val">{gongData.bagua}</span>
          </div>
          <div className="qm-detail-row">
            <span className="qm-detail-key">五行</span>
            <span className="qm-detail-val">{gongData.wuxing}</span>
          </div>
          <div className="qm-detail-row">
            <span className="qm-detail-key">地盘</span>
            <span className="qm-detail-val qm-detail-highlight">{gongData.tiDiTianGan}</span>
          </div>
          <div className="qm-detail-row">
            <span className="qm-detail-key">天盘</span>
            <span className="qm-detail-val qm-detail-highlight">{gongData.tianTianGan}</span>
          </div>
          {gongData.men && (
            <div className="qm-detail-row">
              <span className="qm-detail-key">八门</span>
              <span className={`qm-detail-val ${jixiongClass(MEN_JIXIONG[gongData.men] ?? "中平")}`}>
                {gongData.men}（{MEN_JIXIONG[gongData.men]}）
              </span>
            </div>
          )}
          <div className="qm-detail-row">
            <span className="qm-detail-key">九星</span>
            <span className={`qm-detail-val ${jixiongClass(XING_JIXIONG[gongData.xing] ?? "中平")}`}>
              {gongData.xing}（{XING_JIXIONG[gongData.xing]}）
            </span>
          </div>
          <div className="qm-detail-row">
            <span className="qm-detail-key">八神</span>
            <span className={`qm-detail-val ${jixiongClass(SHEN_JIXIONG[gongData.shen] ?? "中平")}`}>
              {gongData.shen}（{SHEN_JIXIONG[gongData.shen]}）
            </span>
          </div>
          {gongData.isKong && (
            <div className="qm-detail-warn">⚠ 此宫旬空，主落空或延迟</div>
          )}
          {gongData.isMa && (
            <div className="qm-detail-good">✦ 马星临此，利于出行疾行</div>
          )}
        </div>
      </div>
    </div>
  );
}

export function QimenChartView({ chart }: QimenChartProps) {
  const [selectedGong, setSelectedGong] = useState<GongData | null>(null);

  // 按九宫洛书布局获取宫位数据
  const getGong = (gongNum: number): GongData =>
    chart.gongs.find(g => g.gongNum === gongNum) ?? chart.gongs[0]!;

  return (
    <div className="qm-chart-wrapper">
      {/* 基础信息栏 */}
      <div className="qm-info-bar">
        <div className="qm-info-item">
          <span className="qm-info-key">干支</span>
          <span className="qm-info-val">
            {chart.ganZhiYear}年 {chart.ganZhiMonth}月 {chart.ganZhiDay}日 {chart.ganZhiHour}时
          </span>
        </div>
        <div className="qm-info-item">
          <span className="qm-info-key">节气</span>
          <span className="qm-info-val">{chart.jieQiName}</span>
        </div>
        <div className="qm-info-item qm-info-ju">
          <span className="qm-info-key">局数</span>
          <span className="qm-info-val qm-info-ju-val">{chart.yinyangJu}</span>
        </div>
        <div className="qm-info-item">
          <span className="qm-info-key">旬空</span>
          <span className="qm-info-val">{chart.xunKong.join("、")}</span>
        </div>
        <div className="qm-info-item">
          <span className="qm-info-key">马星</span>
          <span className="qm-info-val">{chart.maXing}</span>
        </div>
        <div className="qm-info-item">
          <span className="qm-info-key">真太阳时</span>
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
            />
          ))
        )}
      </div>

      {/* 方位指示 */}
      <div className="qm-compass">
        <div className="qm-compass-row top">
          <span className="qm-compass-dir">西北</span>
          <span className="qm-compass-dir highlight">南 ☲</span>
          <span className="qm-compass-dir">西南</span>
        </div>
        <div className="qm-compass-row mid">
          <span className="qm-compass-dir highlight">西 ☱</span>
          <span className="qm-compass-dir center-mark">中</span>
          <span className="qm-compass-dir highlight">东 ☳</span>
        </div>
        <div className="qm-compass-row bot">
          <span className="qm-compass-dir">东北</span>
          <span className="qm-compass-dir highlight">北 ☵</span>
          <span className="qm-compass-dir">东南</span>
        </div>
      </div>

      {/* 图例 */}
      <div className="qm-legend">
        <div className="qm-legend-item jx-daji">大吉</div>
        <div className="qm-legend-item jx-ji">吉</div>
        <div className="qm-legend-item jx-zhong">中平</div>
        <div className="qm-legend-item jx-xiong">凶</div>
        <div className="qm-legend-item jx-daxiong">大凶</div>
        <div className="qm-legend-sep" />
        <div className="qm-legend-item qm-kong-mark" style={{ position: "static" }}>空</div>
        <div className="qm-legend-item qm-ma-mark" style={{ position: "static" }}>马</div>
      </div>

      {/* 宫位详情弹窗 */}
      {selectedGong && (
        <GongDetail
          gongData={selectedGong}
          onClose={() => setSelectedGong(null)}
        />
      )}
    </div>
  );
}
