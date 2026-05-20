"use client";

import React, { useRef, useState, useCallback } from "react";
import type { QimenChart, GongData } from "../qimen-engine";
import { LUOSHU_LAYOUT, MEN_JIXIONG, XING_JIXIONG, SHEN_JIXIONG } from "../qimen-data";

interface QimenPosterProps {
  chart: QimenChart;
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

async function drawPoster(canvas: HTMLCanvasElement, chart: QimenChart) {
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
  ctx.fillText("极简排盘  ·  精准决断", W / 2, 42);

  ctx.font = "bold 32px serif";
  ctx.fillStyle = COLORS.goldLight;
  ctx.fillText("奇门遁甲 · 排盘结果", W / 2, 82);

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
    { key: "干支", val: `${chart.ganZhiYear}年${chart.ganZhiMonth}月${chart.ganZhiDay}日${chart.ganZhiHour}时` },
    { key: "节气", val: chart.jieQiName },
    { key: "局数", val: chart.yinyangJu },
    { key: "旬空", val: chart.xunKong.join("·") },
    { key: "马星", val: chart.maXing },
    { key: "真太阳时", val: chart.solarTime.replace(" (真太阳时)", "") },
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
    ctx.fillStyle = item.key === "局数" ? COLORS.gold : COLORS.goldLight;
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
        ctx.fillText("空", cx + 6, cy + 14);
      }
      if (gd.isMa) {
        ctx.font = "bold 10px sans-serif";
        ctx.fillStyle = COLORS.gold;
        ctx.fillText("马", cx + CELL_SIZE - 18, cy + 14);
      }

      const midX = cx + CELL_SIZE / 2;
      let lineY = cy + 30;
      const lineH = 20;

      // 八神
      const shenJx = SHEN_JIXIONG[gd.shen] ?? "中平";
      ctx.font = "12px serif";
      ctx.fillStyle = getJixiongColor(shenJx);
      ctx.textAlign = "center";
      ctx.fillText(gd.shen, midX, lineY);
      lineY += lineH;

      // 九星（去"天"字）
      const xingJx = XING_JIXIONG[gd.xing] ?? "中平";
      ctx.font = "12px serif";
      ctx.fillStyle = getJixiongColor(xingJx);
      ctx.fillText(gd.xing.replace("天", ""), midX, lineY);
      lineY += lineH;

      // 天盘天干
      ctx.font = "bold 11px sans-serif";
      ctx.fillStyle = COLORS.gray;
      ctx.fillText("天", midX - 16, lineY);
      ctx.font = "bold 18px serif";
      ctx.fillStyle = COLORS.goldLight;
      ctx.fillText(gd.tianTianGan, midX + 4, lineY);
      lineY += lineH + 2;

      // 八门
      if (gd.men) {
        const menJx = MEN_JIXIONG[gd.men] ?? "中平";
        ctx.font = "bold 14px serif";
        ctx.fillStyle = getJixiongColor(menJx);
        ctx.fillText(gd.men, midX, lineY);
      } else if (isCenter) {
        ctx.font = "12px sans-serif";
        ctx.fillStyle = COLORS.grayDark;
        ctx.fillText("中·五", midX, lineY);
      }
      lineY += lineH;

      // 地盘天干
      ctx.font = "bold 11px sans-serif";
      ctx.fillStyle = COLORS.gray;
      ctx.fillText("地", midX - 16, lineY);
      ctx.font = "bold 18px serif";
      ctx.fillStyle = COLORS.gold;
      ctx.fillText(gd.tiDiTianGan, midX + 4, lineY);
      lineY += lineH - 2;

      // 宫名
      ctx.font = "11px serif";
      ctx.fillStyle = "rgba(150,130,80,0.6)";
      ctx.fillText(gd.gongName.replace("宫", ""), midX, cy + CELL_SIZE - 10);
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
  ctx.fillText("格局提示", 40, GEJU_TOP + 2);

  if (chart.globalGeju.length === 0) {
    ctx.font = "13px serif";
    ctx.fillStyle = COLORS.gray;
    ctx.fillText("本局无特殊格局，诸事平顺。", 40, GEJU_TOP + 26);
  } else {
    let gy = GEJU_TOP + 26;
    chart.globalGeju.slice(0, 4).forEach((g) => {
      const color = getJixiongColor(g.type);
      ctx.font = "bold 13px serif";
      ctx.fillStyle = color;
      ctx.textAlign = "left";
      ctx.fillText(`◆ ${g.name}（${g.type}）`, 40, gy);

      ctx.font = "11px serif";
      ctx.fillStyle = "rgba(200,180,140,0.75)";
      const descText = g.desc.length > 35 ? g.desc.slice(0, 35) + "…" : g.desc;
      ctx.fillText(`   ${descText}`, 40, gy + 16);
      gy += 38;
    });
    if (chart.globalGeju.length > 4) {
      ctx.font = "11px sans-serif";
      ctx.fillStyle = COLORS.gray;
      ctx.fillText(`… 另有 ${chart.globalGeju.length - 4} 个格局`, 40, gy);
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
  ctx.fillText("命运密语 · 奇门遁甲", W / 2, H - 42);

  ctx.font = "11px sans-serif";
  ctx.fillStyle = "rgba(180,160,100,0.4)";
  ctx.fillText("极简排盘 · 精准决断 · tarot.app", W / 2, H - 22);
  ctx.restore();
}

export function QimenPoster({ chart }: QimenPosterProps) {
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
      await drawPoster(canvasRef.current, chart);
      setGenerated(true);
    } finally {
      setGenerating(false);
    }
  }, [chart]);

  const handleDownload = useCallback(() => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `奇门排盘_${chart.ganZhiYear}年${chart.ganZhiMonth}月${chart.ganZhiDay}日_${chart.yinyangJu}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  }, [chart]);

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
                <span>生成中...</span>
              </>
            ) : (
              <>
                <span>📷</span>
                <span>生成排盘海报</span>
              </>
            )}
          </button>
        ) : (
          <div className="qm-poster-btns">
            <button className="qm-poster-dl-btn" onClick={handleDownload}>
              <span>⬇</span>
              <span>下载图片</span>
            </button>
            <button className="qm-poster-regen-btn" onClick={handleGenerate}>
              重新生成
            </button>
          </div>
        )}
        <p className="qm-poster-hint">海报含盘面、格局与网站标识，可直接截图或下载分享</p>
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
