"use client";

import React, { useRef, useState, useCallback } from "react";
import type { QimenChart, GongData } from "../qimen-engine";
import { LUOSHU_LAYOUT, MEN_JIXIONG, XING_JIXIONG, SHEN_JIXIONG } from "../qimen-data";
import {
  gateName, starShortName, godName, gongShortName,
  ganName, ganZhiName, zhiName, jieqiName,
} from "../qimen-data";

type Lang = "zh" | "en" | "tw";

// ── 海报 UI 文案（三语）─────────────────────────────
const PT = {
  zh: {
    tagline:     "极简排盘  ·  精准决断",
    posterTitle: "奇门遁甲 · 排盘结果",
    infoGanZhi:  "干支",
    infoJieQi:   "节气",
    infoJu:      "局数",
    infoXunKong: "旬空",
    infoMaXing:  "马星",
    infoSolar:   "真太阳时",
    ganZhi:      (y: string, m: string, d: string, h: string) => `${y}年${m}月${d}日${h}时`,
    solarSuffix: " (真太阳时)",
    centerLabel: "中·五",
    gejuTitle:   "格局提示",
    gejuEmpty:   "本局无特殊格局，诸事平顺。",
    gejuMore:    (n: number) => `… 另有 ${n} 个格局`,
    footerBrand: "命运密语 · 奇门遁甲",
    footerSlogan: "极简排盘 · 精准决断 · tarot.app",
    fileName:    (y: string, m: string, d: string, ju: string) => `奇门排盘_${y}年${m}月${d}日_${ju}.png`,
    genBtn:      "生成排盘海报",
    generating:  "生成中...",
    download:    "下载图片",
    regen:       "重新生成",
    hint:        "海报含盘面、格局与网站标识，可直接截图或下载分享",
    jxDaji: "大吉", jxJi: "吉", jxZhong: "中平", jxXiong: "凶", jxDaxiong: "大凶",
    markKong: "空", markMa: "马",
    planeHeavenShort: "天", planeEarthShort: "地",
  },
  tw: {
    tagline:     "極簡排盤  ·  精準決斷",
    posterTitle: "奇門遁甲 · 排盤結果",
    infoGanZhi:  "干支",
    infoJieQi:   "節氣",
    infoJu:      "局數",
    infoXunKong: "旬空",
    infoMaXing:  "馬星",
    infoSolar:   "真太陽時",
    ganZhi:      (y: string, m: string, d: string, h: string) => `${y}年${m}月${d}日${h}時`,
    solarSuffix: " (真太陽時)",
    centerLabel: "中·五",
    gejuTitle:   "格局提示",
    gejuEmpty:   "本局無特殊格局，諸事平順。",
    gejuMore:    (n: number) => `… 另有 ${n} 個格局`,
    footerBrand: "命運密語 · 奇門遁甲",
    footerSlogan: "極簡排盤 · 精準決斷 · tarot.app",
    fileName:    (y: string, m: string, d: string, ju: string) => `奇門排盤_${y}年${m}月${d}日_${ju}.png`,
    genBtn:      "生成排盤海報",
    generating:  "生成中...",
    download:    "下載圖片",
    regen:       "重新生成",
    hint:        "海報含盤面、格局與網站標識，可直接截圖或下載分享",
    jxDaji: "大吉", jxJi: "吉", jxZhong: "中平", jxXiong: "凶", jxDaxiong: "大凶",
    markKong: "空", markMa: "馬",
    planeHeavenShort: "天", planeEarthShort: "地",
  },
  en: {
    tagline:     "Minimal casting  ·  Precise judgment",
    posterTitle: "Qi Men Dun Jia · Chart Result",
    infoGanZhi:  "GanZhi",
    infoJieQi:   "Solar Term",
    infoJu:      "Ju",
    infoXunKong: "Void",
    infoMaXing:  "Horse Star",
    infoSolar:   "True Solar",
    ganZhi:      (y: string, m: string, d: string, h: string) => `${y} ${m} ${d} ${h}`,
    solarSuffix: " (true solar time)",
    centerLabel: "Center",
    gejuTitle:   "Patterns",
    gejuEmpty:   "No special patterns in this chart — generally smooth.",
    gejuMore:    (n: number) => `… and ${n} more pattern(s)`,
    footerBrand: "Mystic Whispers · Qi Men Dun Jia",
    footerSlogan: "Minimal casting · Precise judgment · tarot.app",
    fileName:    (y: string, m: string, d: string, ju: string) => `qimen_chart_${y}-${m}-${d}_${ju}.png`,
    genBtn:      "Generate Poster",
    generating:  "Generating...",
    download:    "Download",
    regen:       "Regenerate",
    hint:        "The poster includes the chart, patterns and site mark — screenshot or download to share",
    jxDaji: "Very Auspicious", jxJi: "Auspicious", jxZhong: "Neutral", jxXiong: "Inauspicious", jxDaxiong: "Very Inauspicious",
    markKong: "Void", markMa: "Horse",
    planeHeavenShort: "H", planeEarthShort: "E",
  },
};

// 吉凶枚举 → 本地化标签
function jixiongLabel(jx: string, p: (typeof PT)[Lang]): string {
  switch (jx) {
    case "大吉": return p.jxDaji;
    case "吉": return p.jxJi;
    case "中平": return p.jxZhong;
    case "凶": return p.jxXiong;
    case "大凶": return p.jxDaxiong;
    default: return jx;
  }
}

// 局数字符串本地化（解析「阳遁X局 / 阴遁X局」）
function localizeYinyangJu(s: string, lang: Lang): string {
  if (lang === "zh") return s;
  const m = s.match(/^(阳|阴)遁(\d+)局$/);
  if (!m) return s;
  const isYang = m[1] === "阳";
  const num = m[2];
  if (lang === "tw") return `${isYang ? "陽" : "陰"}遁${num}局`;
  return `${isYang ? "Yang" : "Yin"} Dun · Ju ${num}`;
}
// ────────────────────────────────────────────────────

interface QimenPosterProps {
  chart: QimenChart;
  lang: Lang;
}

// ===== Canvas 绘制海报 =====
// 颜色常量
const COLORS = {
  bg: "#0c0a18",
  bgCard: "#12101f",
  border: "rgba(180,150,60,0.35)",
  borderBright: "rgba(220,185,80,0.8)",
  gold: "#c9a84c",
  goldLight: "#e8d5a3",
  white: "#f0eee0",
  gray: "#8899aa",
  grayDark: "#3a3850",
  // 吉凶色
  daji: "#d4a820",
  ji: "#5aaa6a",
  zhong: "#7788aa",
  xiong: "#cc7744",
  daxiong: "#c03030",
  // 宫位底色
  gongBg: "#16142a",
  centerBg: "#1e1828",
};

function getJixiongColor(jx: string): string {
  switch (jx) {
    case "大吉": return COLORS.daji;
    case "吉": return COLORS.ji;
    case "中平": return COLORS.zhong;
    case "凶": return COLORS.xiong;
    case "大凶": return COLORS.daxiong;
    default: return COLORS.gray;
  }
}

async function drawPoster(canvas: HTMLCanvasElement, chart: QimenChart, p: (typeof PT)[Lang], lang: Lang) {
  const W = 750;
  const H = 1080;
  canvas.width = W;
  canvas.height = H;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // --- 背景 ---
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, W, H);

  // 渐变光晕
  const grd = ctx.createRadialGradient(W / 2, H * 0.35, 0, W / 2, H * 0.35, W * 0.55);
  grd.addColorStop(0, "rgba(80,50,160,0.2)");
  grd.addColorStop(1, "transparent");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);

  // --- 顶部标题区 ---
  ctx.save();
  ctx.font = "bold 14px sans-serif";
  ctx.fillStyle = "rgba(180,150,60,0.5)";
  ctx.textAlign = "center";
  ctx.fillText(p.tagline, W / 2, 42);

  ctx.font = "bold 32px serif";
  ctx.fillStyle = COLORS.goldLight;
  ctx.fillText(p.posterTitle, W / 2, 82);

  // 分隔线
  ctx.strokeStyle = "rgba(180,150,60,0.35)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, 100);
  ctx.lineTo(W - 60, 100);
  ctx.stroke();
  ctx.restore();

  // --- 基础信息栏 ---
  const infoY = 118;
  const infoItems = [
    { key: p.infoGanZhi, val: p.ganZhi(ganZhiName(chart.ganZhiYear, lang), ganZhiName(chart.ganZhiMonth, lang), ganZhiName(chart.ganZhiDay, lang), ganZhiName(chart.ganZhiHour, lang)), hl: false },
    { key: p.infoJieQi, val: jieqiName(chart.jieQiName, lang), hl: false },
    { key: p.infoJu, val: localizeYinyangJu(chart.yinyangJu, lang), hl: true },
    { key: p.infoXunKong, val: chart.xunKong.map(z => zhiName(z, lang)).join("·"), hl: false },
    { key: p.infoMaXing, val: zhiName(chart.maXing, lang), hl: false },
    { key: p.infoSolar, val: chart.solarTime.replace(p.solarSuffix, ""), hl: false },
  ];

  ctx.save();
  const colW = (W - 80) / 3;
  infoItems.forEach((item, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 40 + col * colW;
    const y = infoY + row * 32;

    ctx.font = "11px sans-serif";
    ctx.fillStyle = COLORS.gray;
    ctx.textAlign = "left";
    ctx.fillText(item.key, x, y);

    ctx.font = "bold 13px serif";
    ctx.fillStyle = item.hl ? COLORS.gold : COLORS.goldLight;
    ctx.fillText(item.val, x + 52, y);
  });
  ctx.restore();

  // 分隔线
  ctx.save();
  ctx.strokeStyle = "rgba(180,150,60,0.25)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(40, infoY + 68);
  ctx.lineTo(W - 40, infoY + 68);
  ctx.stroke();
  ctx.restore();

  // --- 九宫格 ---
  const GRID_TOP = infoY + 84;
  const GRID_SIZE = Math.min(W - 80, 560);
  const CELL_SIZE = GRID_SIZE / 3;
  const GRID_LEFT = (W - GRID_SIZE) / 2;

  const getGong = (num: number): GongData =>
    chart.gongs.find(g => g.gongNum === num) ?? chart.gongs[0]!;

  ctx.save();
  // 外边框
  ctx.strokeStyle = COLORS.borderBright;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(GRID_LEFT, GRID_TOP, GRID_SIZE, GRID_SIZE);

  LUOSHU_LAYOUT.forEach((row, ri) => {
    row.forEach((gongNum, ci) => {
      const gd = getGong(gongNum);
      const cx = GRID_LEFT + ci * CELL_SIZE;
      const cy = GRID_TOP + ri * CELL_SIZE;
      const isCenter = gongNum === 5;

      // 宫位背景
      ctx.fillStyle = isCenter ? COLORS.centerBg : COLORS.gongBg;
      ctx.fillRect(cx, cy, CELL_SIZE, CELL_SIZE);

      // 格线
      ctx.strokeStyle = COLORS.border;
      ctx.lineWidth = 0.8;
      ctx.strokeRect(cx, cy, CELL_SIZE, CELL_SIZE);

      // 空亡/马星角标
      if (gd.isKong) {
        ctx.font = "bold 10px sans-serif";
        ctx.fillStyle = COLORS.gray;
        ctx.fillText(p.markKong, cx + 6, cy + 14);
      }
      if (gd.isMa) {
        ctx.font = "bold 10px sans-serif";
        ctx.fillStyle = COLORS.gold;
        ctx.fillText(p.markMa, cx + CELL_SIZE - 18, cy + 14);
      }

      const midX = cx + CELL_SIZE / 2;
      let lineY = cy + 30;
      const lineH = 20;

      // 八神
      const shenJx = SHEN_JIXIONG[gd.shen] ?? "中平";
      ctx.font = "12px serif";
      ctx.fillStyle = getJixiongColor(shenJx);
      ctx.textAlign = "center";
      ctx.fillText(godName(gd.shen, lang), midX, lineY);
      lineY += lineH;

      // 九星（去"天"字）
      const xingJx = XING_JIXIONG[gd.xing] ?? "中平";
      ctx.font = "12px serif";
      ctx.fillStyle = getJixiongColor(xingJx);
      ctx.fillText(starShortName(gd.xing, lang), midX, lineY);
      lineY += lineH;

      // 天盘天干
      ctx.font = "bold 11px sans-serif";
      ctx.fillStyle = COLORS.gray;
      ctx.fillText(p.planeHeavenShort, midX - 16, lineY);
      ctx.font = "bold 18px serif";
      ctx.fillStyle = COLORS.goldLight;
      ctx.fillText(ganName(gd.tianTianGan, lang), midX + 4, lineY);
      lineY += lineH + 2;

      // 八门
      if (gd.men) {
        const menJx = MEN_JIXIONG[gd.men] ?? "中平";
        ctx.font = "bold 14px serif";
        ctx.fillStyle = getJixiongColor(menJx);
        ctx.fillText(gateName(gd.men, lang), midX, lineY);
      } else if (isCenter) {
        ctx.font = "12px sans-serif";
        ctx.fillStyle = COLORS.grayDark;
        ctx.fillText(p.centerLabel, midX, lineY);
      }
      lineY += lineH;

      // 地盘天干
      ctx.font = "bold 11px sans-serif";
      ctx.fillStyle = COLORS.gray;
      ctx.fillText(p.planeEarthShort, midX - 16, lineY);
      ctx.font = "bold 18px serif";
      ctx.fillStyle = COLORS.gold;
      ctx.fillText(ganName(gd.tiDiTianGan, lang), midX + 4, lineY);
      lineY += lineH - 2;

      // 宫名
      ctx.font = "11px serif";
      ctx.fillStyle = "rgba(150,130,80,0.6)";
      ctx.fillText(gongShortName(gd.gongName, lang), midX, cy + CELL_SIZE - 10);
    });
  });
  ctx.restore();

  // --- 格局区 ---
  const GEJU_TOP = GRID_TOP + GRID_SIZE + 24;

  ctx.save();
  ctx.strokeStyle = "rgba(180,150,60,0.25)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(40, GEJU_TOP - 12);
  ctx.lineTo(W - 40, GEJU_TOP - 12);
  ctx.stroke();

  ctx.font = "bold 13px sans-serif";
  ctx.fillStyle = COLORS.gray;
  ctx.textAlign = "left";
  ctx.fillText(p.gejuTitle, 40, GEJU_TOP + 2);

  if (chart.globalGeju.length === 0) {
    ctx.font = "13px serif";
    ctx.fillStyle = COLORS.gray;
    ctx.fillText(p.gejuEmpty, 40, GEJU_TOP + 26);
  } else {
    let gy = GEJU_TOP + 26;
    chart.globalGeju.slice(0, 4).forEach((g) => {
      const color = getJixiongColor(g.type);
      ctx.font = "bold 13px serif";
      ctx.fillStyle = color;
      ctx.textAlign = "left";
      ctx.fillText(`◆ ${g.name}（${jixiongLabel(g.type, p)}）`, 40, gy);

      ctx.font = "11px serif";
      ctx.fillStyle = "rgba(200,180,140,0.75)";
      const descText = g.desc.length > 35 ? g.desc.slice(0, 35) + "…" : g.desc;
      ctx.fillText(`   ${descText}`, 40, gy + 16);
      gy += 38;
    });
    if (chart.globalGeju.length > 4) {
      ctx.font = "11px sans-serif";
      ctx.fillStyle = COLORS.gray;
      ctx.fillText(p.gejuMore(chart.globalGeju.length - 4), 40, gy);
    }
  }
  ctx.restore();

  // --- 底部 Logo ---
  ctx.save();
  ctx.strokeStyle = "rgba(180,150,60,0.2)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(40, H - 64);
  ctx.lineTo(W - 40, H - 64);
  ctx.stroke();

  ctx.font = "bold 14px serif";
  ctx.fillStyle = COLORS.gold;
  ctx.textAlign = "center";
  ctx.fillText(p.footerBrand, W / 2, H - 42);

  ctx.font = "11px sans-serif";
  ctx.fillStyle = "rgba(180,160,100,0.4)";
  ctx.fillText(p.footerSlogan, W / 2, H - 22);
  ctx.restore();
}

export function QimenPoster({ chart, lang }: QimenPosterProps) {
  const p = PT[lang];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!canvasRef.current) return;
    setGenerating(true);
    setGenerated(false);

    // 稍作延迟让 UI 更新
    await new Promise(r => setTimeout(r, 80));

    try {
      await drawPoster(canvasRef.current, chart, p, lang);
      setGenerated(true);
    } finally {
      setGenerating(false);
    }
  }, [chart, p, lang]);

  const handleDownload = useCallback(() => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = p.fileName(chart.ganZhiYear, chart.ganZhiMonth, chart.ganZhiDay, chart.yinyangJu);
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  }, [chart, p]);

  return (
    <div className="qm-poster-wrapper">
      {/* 操作按钮区 */}
      <div className="qm-poster-actions">
        {!generated ? (
          <button
            className="qm-poster-gen-btn"
            onClick={handleGenerate}
            disabled={generating}
          >
            {generating ? (
              <>
                <span className="qm-poster-spin">◌</span>
                <span>{p.generating}</span>
              </>
            ) : (
              <>
                <span>📷</span>
                <span>{p.genBtn}</span>
              </>
            )}
          </button>
        ) : (
          <div className="qm-poster-btns">
            <button className="qm-poster-dl-btn" onClick={handleDownload}>
              <span>⬇</span>
              <span>{p.download}</span>
            </button>
            <button className="qm-poster-regen-btn" onClick={handleGenerate}>
              {p.regen}
            </button>
          </div>
        )}
        <p className="qm-poster-hint">{p.hint}</p>
      </div>

      {/* Canvas 预览 */}
      {generated && (
        <div className="qm-poster-preview">
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              maxWidth: 420,
              borderRadius: 12,
              border: "1px solid rgba(180,150,60,0.3)",
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>
      )}

      {/* 隐藏的 canvas（未生成时） */}
      {!generated && (
        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
        />
      )}
    </div>
  );
}
