"use client";

import { useState } from "react";
import { STAR_COLORS, SI_HUA } from "../ziwei-data";
import type { ZiweiChart, PalaceData } from "../ziwei-engine";

interface ZiweiChartProps {
  chart: ZiweiChart;
  mode: "modern" | "classic";
  onModeChange: (mode: "modern" | "classic") => void;
}

// 十二宫在标准方格中的位置（传统样式：3x4布局，命宫在右下）
// 宫位顺序：命(0)兄(1)夫(2)子(3)财(4)疾(5)迁(6)友(7)官(8)田(9)福(10)父(11)
// 方格位置映射（行列）：
const GRID_POSITIONS: [number, number][] = [
  [3, 2], // 0 命宫
  [3, 1], // 1 兄弟宫
  [3, 0], // 2 夫妻宫
  [2, 0], // 3 子女宫
  [1, 0], // 4 财帛宫
  [0, 0], // 5 疾厄宫
  [0, 1], // 6 迁移宫
  [0, 2], // 7 交友宫
  [0, 3], // 8 官禄宫
  [1, 3], // 9 田宅宫
  [2, 3], // 10 福德宫
  [3, 3], // 11 父母宫
];

// 三合色
const SANFANG_COLORS = ["#C77DFF", "#FFB703", "#48CAE4", "#FF99C8"];

export default function ZiweiChartComponent({ chart, mode, onModeChange }: ZiweiChartProps) {
  const [selectedPalace, setSelectedPalace] = useState<number | null>(null);
  const [expandedPalace, setExpandedPalace] = useState<number | null>(null);

  const handlePalaceClick = (idx: number) => {
    if (selectedPalace === idx) {
      setSelectedPalace(null);
      setExpandedPalace(null);
    } else {
      setSelectedPalace(idx);
      setExpandedPalace(idx);
    }
  };

  const isSanFang = (palaceIdx: number): boolean => {
    if (selectedPalace === null) return false;
    const sanfang = chart.palaces[selectedPalace]?.sanFang ?? [];
    return sanfang.includes(palaceIdx);
  };

  return (
    <div className="zw-chart-container">
      {/* 模式切换 */}
      <div className="zw-mode-toggle">
        <span className="zw-mode-label">显示模式</span>
        <div className="zw-mode-btns">
          <button
            onClick={() => onModeChange("modern")}
            className={`zw-mode-btn ${mode === "modern" ? "zw-mode-active" : ""}`}
          >
            🌟 小白模式
          </button>
          <button
            onClick={() => onModeChange("classic")}
            className={`zw-mode-btn ${mode === "classic" ? "zw-mode-active" : ""}`}
          >
            ☰ 专业模式
          </button>
        </div>
      </div>

      {/* 星盘信息 */}
      <div className="zw-chart-info">
        <span>{chart.yearGan}{chart.yearZhi}年生</span>
        <span>·</span>
        <span>{chart.gender === "female" ? "坤命" : "乾命"}</span>
        <span>·</span>
        <span>{chart.wuXingJu} {chart.startAge}岁起运</span>
        {chart.birthHour >= 0 && <><span>·</span><span>{chart.hourZhi}时</span></>}
      </div>

      {/* 模式说明 */}
      {mode === "modern" ? (
        <p className="zw-chart-mode-desc">
          🌟 小白模式：以现代语言展示宫位含义，点击任意宫位查看三方四正
        </p>
      ) : (
        <p className="zw-chart-mode-desc">
          ☰ 专业模式：传统十二宫格，完整星曜与四化，点击宫位高亮三方四正
        </p>
      )}

      {/* 十二宫格 */}
      <div className="zw-palace-grid">
        {/* 中间区域：命主信息 */}
        <div className="zw-palace-center">
          <div className="zw-center-name">{chart.name}</div>
          <div className="zw-center-star" style={{ color: STAR_COLORS[chart.mingStarName] }}>
            {chart.mingStarName}
          </div>
          <div className="zw-center-labels">
            {chart.personalityLabels.map(l => (
              <span key={l} className="zw-center-label">{l}</span>
            ))}
          </div>
          {selectedPalace !== null && (
            <div className="zw-center-selected">
              <div className="zw-center-selected-name">
                {mode === "modern"
                  ? chart.palaces[selectedPalace]?.palace.modernName
                  : chart.palaces[selectedPalace]?.palace.name}
              </div>
              <div className="zw-center-selected-desc">
                {mode === "modern"
                  ? chart.palaces[selectedPalace]?.palace.modernDesc
                  : chart.palaces[selectedPalace]?.palace.description}
              </div>
            </div>
          )}
        </div>

        {/* 十二宫格子 */}
        {chart.palaces.map((pd, i) => {
          const [row, col] = GRID_POSITIONS[i]!;
          const isSel = selectedPalace === i;
          const isSF = isSanFang(i);
          const isMing = pd.isMingPalace;
          const isShen = pd.isBodyPalace;

          return (
            <div
              key={i}
              className={`zw-palace-cell
                ${isSel ? "zw-palace-selected" : ""}
                ${isSF ? "zw-palace-sanfang" : ""}
                ${isMing ? "zw-palace-ming" : ""}
              `}
              style={{ gridRow: row + 1, gridColumn: col + 1 } as React.CSSProperties}
              onClick={() => handlePalaceClick(i)}
            >
              {/* 宫名 */}
              <div className="zw-palace-name">
                {mode === "modern" ? pd.palace.modernName : pd.palace.name}
                {isMing && <span className="zw-palace-tag zw-tag-ming">命</span>}
                {isShen && <span className="zw-palace-tag zw-tag-shen">身</span>}
              </div>

              {/* 大限 */}
              <div className="zw-palace-daxian">
                {pd.daXian.startAge}-{pd.daXian.endAge}岁
              </div>

              {/* 主星 */}
              <div className="zw-palace-stars">
                {pd.mainStars.map(s => (
                  <span key={s} className="zw-main-star"
                    style={{ color: STAR_COLORS[s] ?? "#e8d5a3" }}>
                    {s}
                  </span>
                ))}
              </div>

              {/* 专业模式：辅星 */}
              {mode === "classic" && pd.auxStars.length > 0 && (
                <div className="zw-palace-aux-stars">
                  {pd.auxStars.slice(0, 3).map(s => (
                    <span key={s} className="zw-aux-star">{s}</span>
                  ))}
                </div>
              )}

              {/* 四化标签 */}
              {pd.siHua.length > 0 && (
                <div className="zw-palace-sihua">
                  {pd.siHua.map(sh => (
                    <span key={sh} className="zw-sihua-badge"
                      style={{ color: SI_HUA[sh]?.color, borderColor: SI_HUA[sh]?.color }}>
                      化{sh}
                    </span>
                  ))}
                </div>
              )}

              {/* 三方四正标识 */}
              {isSF && <div className="zw-sanfang-mark">三方</div>}
            </div>
          );
        })}
      </div>

      {selectedPalace !== null && (
        <p className="zw-chart-tip">已选中「{mode === "modern"
          ? chart.palaces[selectedPalace]?.palace.modernName
          : chart.palaces[selectedPalace]?.palace.name}」，高亮显示三方四正宫位</p>
      )}
    </div>
  );
}
