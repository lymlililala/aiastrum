"use client";

import React, { useRef, useState } from "react";
import type { AstroChart } from "../astro-engine";
import { ZODIAC_LIST, PLANET_MAP, ASPECT_MAP, cityLabel } from "../astro-data";
import type { AstroT, Lang } from "../astro-i18n";
import {
  getZodiacName,
  getPlanetName,
  getAspectName,
} from "../astro-content-i18n";

interface AstroPosterProps {
  chart: AstroChart;
  t: AstroT;
  lang: Lang;
}

// 在 Canvas 上绘制星盘海报
async function drawAstroPoster(canvas: HTMLCanvasElement, chart: AstroChart, t: AstroT, dateLocale: string, lang: Lang) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const W = 750;
  const H = 1200;
  canvas.width = W;
  canvas.height = H;

  // ===== 背景 =====
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, "#0a051a");
  bgGrad.addColorStop(0.5, "#0f0a1e");
  bgGrad.addColorStop(1, "#0a0520");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // 星点装饰
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  const starPositions = [
    [50, 80], [120, 40], [200, 100], [350, 30], [480, 70], [600, 50],
    [680, 120], [30, 250], [700, 300], [720, 150], [80, 400],
  ];
  for (const pos of starPositions) {
    const x = pos[0] ?? 0;
    const y = pos[1] ?? 0;
    const r = Math.random() * 1.5 + 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // ===== 顶部标题区 =====
  // Logo 区
  ctx.fillStyle = "rgba(201,168,76,0.15)";
  ctx.fillRect(0, 0, W, 110);
  ctx.strokeStyle = "rgba(201,168,76,0.3)";
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, W, 110);

  ctx.fillStyle = "#c9a84c";
  ctx.font = "bold 18px 'serif'";
  ctx.textAlign = "center";
  ctx.fillText(t.posterBrandTop, W / 2, 42);

  ctx.fillStyle = "rgba(201,168,76,0.5)";
  ctx.font = "13px 'sans-serif'";
  ctx.fillText(t.posterBrandSub, W / 2, 68);

  // ===== 用户信息 =====
  ctx.fillStyle = "#e8d5a3";
  ctx.font = "bold 32px 'serif'";
  ctx.textAlign = "center";
  ctx.fillText(chart.input.name, W / 2, 150);

  ctx.fillStyle = "rgba(232,213,163,0.6)";
  ctx.font = "15px 'sans-serif'";
  const birthInfo = `${chart.input.birthDate}${chart.hasTimeData ? " " + chart.input.birthTime : ""}  ·  ${cityLabel(chart.input.city, lang)}`;
  ctx.fillText(birthInfo, W / 2, 178);

  // 分割线
  ctx.strokeStyle = "rgba(201,168,76,0.3)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, 198);
  ctx.lineTo(W - 60, 198);
  ctx.stroke();

  // ===== Big 3 区块 =====
  const big3Y = 220;
  const { big3 } = chart;
  const big3Items = [
    { label: t.posterSun, symbol: "☉", sign: big3.sun.sign, color: "#F39C12" },
    { label: t.posterMoon, symbol: "☽", sign: big3.moon.sign, color: "#BDC3C7" },
    ...(big3.rising ? [{ label: t.posterRising, symbol: "↑", sign: big3.rising.sign, color: "#9B59B6" }] : []),
  ];

  const big3BlockW = big3Items.length === 3 ? 210 : 320;
  const big3StartX = (W - big3BlockW * big3Items.length + 20) / 2;

  for (let i = 0; i < big3Items.length; i++) {
    const item = big3Items[i];
    if (!item) continue;
    const bx = big3StartX + i * (big3BlockW + 10);
    const zodiacInfo = ZODIAC_LIST.find((z) => z.id === item.sign)!;

    // 卡片背景
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.beginPath();
    roundRect(ctx, bx, big3Y, big3BlockW, 90, 10);
    ctx.fill();
    ctx.strokeStyle = `${item.color}50`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    roundRect(ctx, bx, big3Y, big3BlockW, 90, 10);
    ctx.stroke();

    // 内容
    ctx.fillStyle = item.color;
    ctx.font = "bold 22px 'serif'";
    ctx.textAlign = "center";
    ctx.fillText(item.symbol, bx + big3BlockW / 2, big3Y + 30);

    ctx.fillStyle = "rgba(232,213,163,0.6)";
    ctx.font = "11px 'sans-serif'";
    ctx.fillText(item.label, bx + big3BlockW / 2, big3Y + 48);

    ctx.fillStyle = "#e8d5a3";
    ctx.font = "bold 16px 'serif'";
    ctx.fillText(`${zodiacInfo.symbol} ${getZodiacName(item.sign, lang)}`, bx + big3BlockW / 2, big3Y + 72);
  }

  // ===== 星盘图圆形绘制 =====
  const chartCX = W / 2;
  const chartCY = 500;
  const R_outer = 170;
  const R_zodiac = 150;
  const R_house = 120;
  const R_planet = 85;
  const R_inner = 60;

  function eclipticToCanvas(lon: number, r: number): [number, number] {
    const angle = ((-lon + 180) * Math.PI) / 180;
    return [chartCX + r * Math.cos(angle), chartCY + r * Math.sin(angle)];
  }

  // 背景圆
  ctx.fillStyle = "rgba(15,10,30,0.8)";
  ctx.beginPath();
  ctx.arc(chartCX, chartCY, R_outer + 10, 0, Math.PI * 2);
  ctx.fill();

  // 元素色映射
  const elementColors: Record<string, string> = {
    fire: "#FF6B6B", earth: "#A8C87E", air: "#87CEEB", water: "#6EC5E9",
  };

  // 星座扇区
  for (const zodiac of ZODIAC_LIST) {
    const startAngle = ((-zodiac.startDeg + 180) * Math.PI) / 180;
    const endAngle = (-(zodiac.startDeg + 30) + 180) * Math.PI / 180;
    const color = elementColors[zodiac.element] ?? "#ffffff";

    ctx.beginPath();
    ctx.moveTo(chartCX, chartCY);
    ctx.arc(chartCX, chartCY, R_outer, startAngle, endAngle, true);
    ctx.closePath();
    ctx.fillStyle = `${color}15`;
    ctx.fill();
    ctx.strokeStyle = `${color}40`;
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // 星座符号
    const midLon = zodiac.startDeg + 15;
    const [sx, sy] = eclipticToCanvas(midLon, (R_outer + R_zodiac) / 2);
    ctx.fillStyle = color;
    ctx.font = "11px 'serif'";
    ctx.textAlign = "center";
    ctx.fillText(zodiac.symbol, sx, sy + 4);
  }

  // 宫位圆
  ctx.beginPath();
  ctx.arc(chartCX, chartCY, R_house, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(201,168,76,0.2)";
  ctx.lineWidth = 0.5;
  ctx.stroke();

  // 内圆
  ctx.beginPath();
  ctx.arc(chartCX, chartCY, R_inner, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(10,5,25,0.7)";
  ctx.fill();
  ctx.strokeStyle = "rgba(201,168,76,0.15)";
  ctx.lineWidth = 0.5;
  ctx.stroke();

  // 相位线
  for (const aspect of chart.aspects.filter((a) => a.orb <= 3)) {
    const p1 = chart.planets.find((p) => p.planet === aspect.planet1);
    const p2 = chart.planets.find((p) => p.planet === aspect.planet2);
    if (!p1 || !p2) continue;
    const [x1, y1] = eclipticToCanvas(p1.longitude, R_inner);
    const [x2, y2] = eclipticToCanvas(p2.longitude, R_inner);
    const aspectInfo = ASPECT_MAP[aspect.type];
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `${aspectInfo.color}50`;
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }

  // 行星
  for (const planet of chart.planets) {
    const planetInfo = PLANET_MAP[planet.planet];
    const [px, py] = eclipticToCanvas(planet.longitude, R_planet);

    ctx.beginPath();
    ctx.arc(px, py, 10, 0, Math.PI * 2);
    ctx.fillStyle = `${planetInfo.color}20`;
    ctx.fill();
    ctx.strokeStyle = planetInfo.color;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = planetInfo.color;
    ctx.font = "bold 9px 'serif'";
    ctx.textAlign = "center";
    ctx.fillText(planetInfo.symbol, px, py + 3);
  }

  // 中心星
  ctx.fillStyle = "rgba(201,168,76,0.5)";
  ctx.font = "18px 'serif'";
  ctx.textAlign = "center";
  ctx.fillText("✦", chartCX, chartCY + 6);

  // ===== 行星列表 =====
  const listY = 700;
  ctx.fillStyle = "rgba(201,168,76,0.6)";
  ctx.font = "12px 'sans-serif'";
  ctx.textAlign = "left";
  ctx.fillText(t.posterPlanetList, 60, listY);

  ctx.strokeStyle = "rgba(201,168,76,0.2)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, listY + 8);
  ctx.lineTo(W - 60, listY + 8);
  ctx.stroke();

  const mainPlanets = chart.planets.filter((p) =>
    ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"].includes(p.planet),
  );

  const colW = (W - 120) / 4;
  for (let i = 0; i < mainPlanets.length; i++) {
    const p = mainPlanets[i];
    if (!p) continue;
    const planetInfo = PLANET_MAP[p.planet];
    if (!planetInfo) continue;
    const zodiacInfo = ZODIAC_LIST.find((z) => z.id === p.sign)!;
    const col = i % 4;
    const row = Math.floor(i / 4);
    const px = 60 + col * colW;
    const py = listY + 30 + row * 40;

    ctx.fillStyle = planetInfo.color;
    ctx.font = "bold 14px 'serif'";
    ctx.textAlign = "left";
    ctx.fillText(planetInfo.symbol, px, py);

    ctx.fillStyle = "#e8d5a3";
    ctx.font = "12px 'sans-serif'";
    ctx.fillText(getPlanetName(p.planet, lang), px + 18, py);

    ctx.fillStyle = "rgba(232,213,163,0.6)";
    ctx.font = "11px 'sans-serif'";
    ctx.fillText(`${zodiacInfo.symbol}${getZodiacName(p.sign, lang)} ${p.degree}°`, px, py + 16);
  }

  // ===== 顶部核心相位 =====
  const aspectListY = 870;
  ctx.fillStyle = "rgba(201,168,76,0.6)";
  ctx.font = "12px 'sans-serif'";
  ctx.textAlign = "left";
  ctx.fillText(t.posterAspectList, 60, aspectListY);

  ctx.strokeStyle = "rgba(201,168,76,0.2)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, aspectListY + 8);
  ctx.lineTo(W - 60, aspectListY + 8);
  ctx.stroke();

  for (let i = 0; i < Math.min(chart.topAspects.length, 4); i++) {
    const aspect = chart.topAspects[i];
    if (!aspect) continue;
    const p1Info = PLANET_MAP[aspect.planet1];
    const p2Info = PLANET_MAP[aspect.planet2];
    const aspectInfo = ASPECT_MAP[aspect.type];
    if (!p1Info || !p2Info || !aspectInfo) continue;
    const ay = aspectListY + 30 + i * 35;

    ctx.fillStyle = p1Info.color;
    ctx.font = "bold 13px 'serif'";
    ctx.textAlign = "left";
    ctx.fillText(p1Info.symbol, 60, ay);

    ctx.fillStyle = "#e8d5a3";
    ctx.font = "12px 'sans-serif'";
    ctx.fillText(getPlanetName(aspect.planet1, lang), 76, ay);

    ctx.fillStyle = aspectInfo.color;
    ctx.font = "bold 13px 'sans-serif'";
    ctx.fillText(aspectInfo.symbol, 150, ay);

    ctx.fillStyle = "#e8d5a3";
    ctx.font = "12px 'sans-serif'";
    ctx.fillText(getAspectName(aspect.type, lang), 166, ay);

    ctx.fillStyle = p2Info.color;
    ctx.font = "bold 13px 'serif'";
    ctx.fillText(p2Info.symbol, 240, ay);

    ctx.fillStyle = "#e8d5a3";
    ctx.font = "12px 'sans-serif'";
    ctx.fillText(getPlanetName(aspect.planet2, lang), 256, ay);

    ctx.fillStyle = "rgba(232,213,163,0.5)";
    ctx.font = "11px 'sans-serif'";
    ctx.textAlign = "right";
    ctx.fillText(`${aspect.orb.toFixed(1)}°`, W - 60, ay);
    ctx.textAlign = "left";
  }

  // ===== 底部 footer =====
  ctx.fillStyle = "rgba(201,168,76,0.1)";
  ctx.fillRect(0, H - 80, W, 80);
  ctx.strokeStyle = "rgba(201,168,76,0.2)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, H - 80);
  ctx.lineTo(W, H - 80);
  ctx.stroke();

  ctx.fillStyle = "rgba(201,168,76,0.5)";
  ctx.font = "13px 'serif'";
  ctx.textAlign = "center";
  ctx.fillText(t.posterFooter, W / 2, H - 50);

  ctx.fillStyle = "rgba(201,168,76,0.3)";
  ctx.font = "11px 'sans-serif'";
  ctx.fillText(`${t.posterGenBy} · ${new Date().toLocaleDateString(dateLocale)}`, W / 2, H - 28);
}

// 辅助：绘制圆角矩形
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export function AstroPoster({ chart, t, lang }: AstroPosterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const dateLocale = lang === "en" ? "en-US" : lang === "tw" ? "zh-TW" : "zh-CN";

  const handleGenerate = async () => {
    if (!canvasRef.current) return;
    setIsGenerating(true);
    try {
      await drawAstroPoster(canvasRef.current, chart, t, dateLocale, lang);
      setIsGenerated(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${chart.input.name}${t.posterFileSuffix}.png`;
    a.click();
  };

  return (
    <div className="astro-poster-wrapper">
      <div className="astro-poster-header">
        <h3 className="astro-poster-title">{t.posterTitle}</h3>
        <p className="astro-poster-subtitle">{t.posterSubtitle}</p>
      </div>

      {/* 画布预览 */}
      <div className="astro-poster-preview">
        <canvas
          ref={canvasRef}
          className={`astro-poster-canvas ${isGenerated ? "visible" : "hidden"}`}
        />
        {!isGenerated && (
          <div className="astro-poster-placeholder">
            <div className="text-4xl mb-3">🌌</div>
            <p>{t.posterPlaceholder}</p>
          </div>
        )}
      </div>

      <div className="astro-poster-actions">
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="astro-poster-btn astro-poster-btn-generate"
        >
          {isGenerating ? t.posterGenerating : t.posterGenerate}
        </button>
        {isGenerated && (
          <button
            onClick={handleDownload}
            className="astro-poster-btn astro-poster-btn-download"
          >
            {t.posterDownload}
          </button>
        )}
      </div>
    </div>
  );
}
