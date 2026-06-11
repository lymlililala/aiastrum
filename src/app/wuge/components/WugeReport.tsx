"use client";

import { useRef, useCallback } from "react";
import { LEVEL_ICONS, LEVEL_COLORS, getPosterQuote } from "../wuge-data";
import type { WugeT } from "../wuge-i18n";

interface WugeGe {
  strokes: number;
  level: string;
  levelKey: "大吉" | "吉" | "半吉" | "凶" | "大凶";
  score: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
}

interface WugeReportData {
  name: string;
  gender: "male" | "female";
  chars: string[];
  strokes: number[];
  score: number;
  scoreLevel: string;
  wuge: {
    tian: WugeGe;
    ren: WugeGe;
    di: WugeGe;
    wai: WugeGe;
    zong: WugeGe;
  };
  sanCai: string;
  sanCaiDesc: string;
  specialTags: string[];
  analysis: {
    personality: string;
    career: string;
    love: string;
    health: string;
  };
  lifeQuote: string;
}

interface WugeReportProps {
  t: WugeT;
  data: WugeReportData;
  onReset: () => void;
}

// 五格雷达图（SVG实现）
function WugeRadarChart({ data, t }: { data: WugeReportData; t: WugeT }) {
  const geKeys: Array<keyof typeof data.wuge> = ["tian", "ren", "di", "wai", "zong"];
  const labels = [t.geLabels.tian, t.geLabels.ren, t.geLabels.di, t.geLabels.wai, t.geLabels.zong];
  const scores = geKeys.map((k) => data.wuge[k].score);

  const cx = 120;
  const cy = 120;
  const maxR = 90;
  const n = 5;

  // 计算多边形顶点
  const getPoint = (i: number, r: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  // 背景五边形（多层）
  const bgPolygons = [0.2, 0.4, 0.6, 0.8, 1.0].map((ratio) => {
    const pts = Array.from({ length: n }, (_, i) => {
      const p = getPoint(i, maxR * ratio);
      return `${p.x},${p.y}`;
    }).join(" ");
    return pts;
  });

  // 数据多边形
  const dataPoints = Array.from({ length: n }, (_, i) => {
    const r = maxR * (scores[i]! / 100);
    const p = getPoint(i, r);
    return `${p.x},${p.y}`;
  }).join(" ");

  // 轴线
  const axes = Array.from({ length: n }, (_, i) => getPoint(i, maxR));
  // 标签位置
  const labelPoints = Array.from({ length: n }, (_, i) => getPoint(i, maxR + 20));

  return (
    <div className="wuge-radar-wrapper">
      <svg viewBox="0 0 240 240" className="wuge-radar-svg">
        {/* 背景网格 */}
        {bgPolygons.map((pts, i) => (
          <polygon
            key={i}
            points={pts}
            fill="none"
            stroke="rgba(160,100,40,0.15)"
            strokeWidth="1"
          />
        ))}
        {/* 轴线 */}
        {axes.map((pt, i) => (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={pt.x} y2={pt.y}
            stroke="rgba(160,100,40,0.2)"
            strokeWidth="1"
          />
        ))}
        {/* 数据面 */}
        <polygon
          points={dataPoints}
          fill="rgba(180,80,30,0.18)"
          stroke="rgba(180,80,30,0.8)"
          strokeWidth="2"
        />
        {/* 数据点 */}
        {Array.from({ length: n }, (_, i) => {
          const r = maxR * (scores[i]! / 100);
          const p = getPoint(i, r);
          return (
            <circle key={i} cx={p.x} cy={p.y} r={3} fill="rgba(180,80,30,0.9)" />
          );
        })}
        {/* 标签 */}
        {labelPoints.map((pt, i) => (
          <text
            key={i}
            x={pt.x}
            y={pt.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="11"
            fill="rgba(100,60,20,0.85)"
            fontWeight="600"
          >
            {labels[i]}
          </text>
        ))}
        {/* 中心 */}
        <circle cx={cx} cy={cy} r={3} fill="rgba(180,80,30,0.5)" />
      </svg>
    </div>
  );
}

// 单个五格卡片
function GeCard({ label, ge, t, isMain = false }: { label: string; ge: WugeGe; t: WugeT; isMain?: boolean }) {
  const colors = LEVEL_COLORS[ge.levelKey] ?? LEVEL_COLORS["半吉"]!;
  const icon = LEVEL_ICONS[ge.levelKey] ?? "○";

  return (
    <div className={`wuge-ge-card ${isMain ? "wuge-ge-card-main" : ""} ${colors.border}`}>
      <div className="wuge-ge-card-header">
        <div className="wuge-ge-label-row">
          <span className="wuge-ge-label">{label}</span>
          {isMain && <span className="wuge-ge-main-badge">{t.mainBadge}</span>}
        </div>
        <div className="wuge-ge-strokes">
          <span className="wuge-ge-num">{ge.strokes}</span>
          <span className="wuge-ge-unit">{t.strokeUnit}</span>
        </div>
      </div>
      <div className="wuge-ge-level-row">
        <span className={`wuge-ge-level-badge ${colors.badge}`}>
          {icon} {ge.level}
        </span>
        <span className="wuge-ge-title">{ge.title}</span>
      </div>
      <p className="wuge-ge-desc">{isMain ? ge.fullDesc : ge.shortDesc}</p>
    </div>
  );
}

export default function WugeReport({ t, data, onReset }: WugeReportProps) {
  const reportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const geList: Array<{ label: string; key: keyof typeof data.wuge; isMain?: boolean }> = [
    { label: t.geLabels.tian, key: "tian" },
    { label: t.geLabels.ren, key: "ren", isMain: true },
    { label: t.geLabels.di, key: "di" },
    { label: t.geLabels.wai, key: "wai" },
    { label: t.geLabels.zong, key: "zong" },
  ];

  // 生成分享海报
  const generatePoster = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 600;
    const H = 900;
    canvas.width = W;
    canvas.height = H;

    // 背景
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, "#1a0f08");
    bgGrad.addColorStop(0.5, "#2a1608");
    bgGrad.addColorStop(1, "#0f0906");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 边框装饰
    ctx.strokeStyle = "rgba(200,130,50,0.6)";
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, W - 40, H - 40);
    ctx.strokeStyle = "rgba(200,130,50,0.3)";
    ctx.lineWidth = 1;
    ctx.strokeRect(28, 28, W - 56, H - 56);

    // 顶部标题
    ctx.fillStyle = "rgba(200,130,50,0.9)";
    ctx.font = "bold 18px serif";
    ctx.textAlign = "center";
    ctx.fillText(t.posterTitle, W / 2, 70);

    // 姓名大字
    ctx.fillStyle = "#f5e6c8";
    ctx.font = `bold ${data.name.length > 3 ? 60 : 72}px serif`;
    ctx.textAlign = "center";
    ctx.fillText(data.name, W / 2, 160);

    // 分割线
    ctx.strokeStyle = "rgba(200,130,50,0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, 185);
    ctx.lineTo(W - 80, 185);
    ctx.stroke();

    // 综合评分
    ctx.fillStyle = "rgba(200,130,50,0.9)";
    ctx.font = "16px serif";
    ctx.textAlign = "center";
    ctx.fillText(`${t.posterScorePre}${data.score}${t.posterScoreUnit}${data.scoreLevel}`, W / 2, 215);

    // 五格笔画
    const geOrder = [
      { label: t.geLabels.tian, val: data.wuge.tian },
      { label: t.geLabels.ren, val: data.wuge.ren },
      { label: t.geLabels.di, val: data.wuge.di },
      { label: t.geLabels.wai, val: data.wuge.wai },
      { label: t.geLabels.zong, val: data.wuge.zong },
    ];

    const geY = 270;
    const geSpacing = 100;
    geOrder.forEach((ge, i) => {
      const x = 80 + i * geSpacing;
      // 格名
      ctx.fillStyle = "rgba(200,130,50,0.8)";
      ctx.font = "13px serif";
      ctx.textAlign = "center";
      ctx.fillText(ge.label, x, geY);
      // 画数
      ctx.fillStyle = "#f5e6c8";
      ctx.font = "bold 24px serif";
      ctx.fillText(`${ge.val.strokes}`, x, geY + 32);
      // 等级
      const levelColors: Record<string, string> = {
        大吉: "#f59e0b", 吉: "#22c55e", 半吉: "#60a5fa", 凶: "#9ca3af", 大凶: "#ef4444"
      };
      ctx.fillStyle = levelColors[ge.val.levelKey] ?? "#9ca3af";
      ctx.font = "12px serif";
      ctx.fillText(ge.val.level, x, geY + 52);
    });

    // 性格金句
    ctx.strokeStyle = "rgba(200,130,50,0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, 345);
    ctx.lineTo(W - 80, 345);
    ctx.stroke();

    // 人格数理
    ctx.fillStyle = "rgba(200,130,50,0.8)";
    ctx.font = "14px serif";
    ctx.textAlign = "center";
    ctx.fillText(`${t.posterRenPre}${data.wuge.ren.strokes}${t.posterRenMid}${data.wuge.ren.title}${t.posterRenPost}`, W / 2, 375);

    // Life Quote
    ctx.fillStyle = "#f5e6c8";
    ctx.font = "bold 20px serif";
    ctx.textAlign = "center";
    const quote = data.lifeQuote;
    const maxWidth = W - 120;
    const words = Array.from(quote);
    let line = "";
    let lineY = 425;
    words.forEach((word) => {
      const testLine = line + word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line) {
        ctx.fillText(line, W / 2, lineY);
        line = word;
        lineY += 32;
      } else {
        line = testLine;
      }
    });
    if (line) ctx.fillText(line, W / 2, lineY);

    // 特殊标签
    const tagY = lineY + 60;
    const tags = data.specialTags.slice(0, 4);
    const tagW = 90;
    const totalTagW = tags.length * tagW + (tags.length - 1) * 10;
    const tagStartX = (W - totalTagW) / 2;
    tags.forEach((tag, i) => {
      const tx = tagStartX + i * (tagW + 10);
      ctx.fillStyle = "rgba(180,80,30,0.6)";
      ctx.roundRect?.(tx, tagY - 18, tagW, 26, 4);
      ctx.fill();
      ctx.fillStyle = "#f5e6c8";
      ctx.font = "13px serif";
      ctx.textAlign = "center";
      ctx.fillText(tag, tx + tagW / 2, tagY);
    });

    // 底部
    ctx.strokeStyle = "rgba(200,130,50,0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, H - 100);
    ctx.lineTo(W - 80, H - 100);
    ctx.stroke();

    ctx.fillStyle = "rgba(200,130,50,0.6)";
    ctx.font = "14px serif";
    ctx.textAlign = "center";
    ctx.fillText(t.posterFooter1, W / 2, H - 65);
    ctx.font = "12px serif";
    ctx.fillStyle = "rgba(200,130,50,0.4)";
    ctx.fillText(t.posterFooter2, W / 2, H - 42);

    // 下载
    const link = document.createElement("a");
    link.download = `${data.name}${t.posterFileSuffix}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [data, t]);

  // 获取综合分数颜色
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-amber-600";
    if (score >= 70) return "text-green-600";
    if (score >= 55) return "text-blue-600";
    return "text-gray-500";
  };

  return (
    <div className="wuge-report-container" ref={reportRef}>
      {/* 隐藏Canvas用于生成海报 */}
      <canvas ref={canvasRef} className="hidden" />

      {/* 顶部姓名 + 评分 */}
      <div className="wuge-report-header">
        <div className="wuge-deco-line" />
        <div className="wuge-report-name-row">
          <div className="wuge-report-chars">
            {data.chars.map((char, i) => (
              <div key={i} className="wuge-report-char-item">
                <span className="wuge-report-char">{char}</span>
                <span className="wuge-report-char-strokes">{data.strokes[i]}{t.strokeUnit}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="wuge-score-row">
          <div className="wuge-score-circle">
            <span className={`wuge-score-num ${getScoreColor(data.score)}`}>{data.score}</span>
            <span className="wuge-score-label">{t.scoreUnit}</span>
          </div>
          <div className="wuge-score-info">
            <p className="wuge-score-level">{data.scoreLevel}</p>
            <p className="wuge-score-sub">{data.gender === "male" ? t.fateMale : t.fateFemale} · {t.scoreSub}</p>
          </div>
        </div>

        {/* 特殊运势标签 */}
        {data.specialTags.length > 0 && (
          <div className="wuge-special-tags">
            {data.specialTags.map((tag, i) => (
              <span key={i} className="wuge-special-tag">{tag}</span>
            ))}
          </div>
        )}
        <div className="wuge-deco-line" />
      </div>

      {/* 五格笔画拆解 */}
      <section className="wuge-section">
        <h2 className="wuge-section-title">
          <span className="wuge-section-icon">☵</span>
          {t.sectionBreakdown}
        </h2>
        <div className="wuge-ge-breakdown">
          <div className="wuge-ge-formula">
            {data.chars.map((char, i) => (
              <span key={i} className="wuge-formula-item">
                <span className="wuge-formula-char">{char}</span>
                <span className="wuge-formula-num">({data.strokes[i]})</span>
                {i < data.chars.length - 1 && <span className="wuge-formula-plus">+</span>}
              </span>
            ))}
          </div>
          <div className="wuge-ge-five-row">
            {geList.map(({ label, key, isMain }) => (
              <div key={key} className={`wuge-ge-mini ${isMain ? "wuge-ge-mini-main" : ""}`}>
                <span className="wuge-ge-mini-label">{label}</span>
                <span className="wuge-ge-mini-num">{data.wuge[key].strokes}</span>
                <span className={`wuge-ge-mini-level ${LEVEL_COLORS[data.wuge[key].levelKey]?.text ?? ""}`}>
                  {data.wuge[key].level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 雷达图 + 三才 */}
      <section className="wuge-section">
        <h2 className="wuge-section-title">
          <span className="wuge-section-icon">⊕</span>
          {t.sectionRadar}
        </h2>
        <div className="wuge-radar-section">
          <WugeRadarChart data={data} t={t} />
          <div className="wuge-sancai-info">
            <div className="wuge-sancai-badge">{t.sanCaiLabel}{data.sanCai}</div>
            <p className="wuge-sancai-desc">{data.sanCaiDesc}</p>
          </div>
        </div>
      </section>

      {/* 五格详解卡片 */}
      <section className="wuge-section">
        <h2 className="wuge-section-title">
          <span className="wuge-section-icon">☰</span>
          {t.sectionGeDetail}
        </h2>
        <div className="wuge-ge-cards-grid">
          {geList.map(({ label, key, isMain }) => (
            <GeCard
              key={key}
              label={label}
              ge={data.wuge[key]}
              t={t}
              isMain={isMain}
            />
          ))}
        </div>
      </section>

      {/* 命理分析 */}
      <section className="wuge-section">
        <h2 className="wuge-section-title">
          <span className="wuge-section-icon">☲</span>
          {t.sectionAnalysis}
        </h2>
        <div className="wuge-analysis-cards">
          {[
            { icon: "✦", label: t.analysisPersonality, content: data.analysis.personality },
            { icon: "◈", label: t.analysisCareer, content: data.analysis.career },
            { icon: "♡", label: t.analysisLove, content: data.analysis.love },
            { icon: "◉", label: t.analysisHealth, content: data.analysis.health },
          ].map((item, i) => (
            <div key={i} className="wuge-analysis-card">
              <div className="wuge-analysis-card-header">
                <span className="wuge-analysis-icon">{item.icon}</span>
                <h3 className="wuge-analysis-title">{item.label}</h3>
              </div>
              <p className="wuge-analysis-content">{item.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 人生金句 */}
      <section className="wuge-quote-section">
        <div className="wuge-quote-deco">☯</div>
        <blockquote className="wuge-life-quote">
          &ldquo;{data.lifeQuote}&rdquo;
        </blockquote>
        <p className="wuge-quote-sub">{t.quoteSubPre}{data.wuge.ren.strokes}{t.quoteSubMid}{data.wuge.ren.title}</p>
      </section>

      {/* 操作按钮 */}
      <div className="wuge-action-row">
        <button onClick={generatePoster} className="wuge-btn-poster">
          <span>⬇</span> {t.btnPoster}
        </button>
        <button onClick={onReset} className="wuge-btn-reset">
          <span>↺</span> {t.btnReset}
        </button>
      </div>

      {/* 免责声明 */}
      <p className="wuge-disclaimer">
        {t.disclaimer}
      </p>
    </div>
  );
}
