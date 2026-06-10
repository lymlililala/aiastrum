"use client";

import { useEffect, useRef, useState } from "react";
import type { SynastryResult } from "../synastry-engine";
import { getRelationType } from "../synastry-data";
import { PLANET_MAP } from "../../astro/astro-data";
import type { SynT, SynLang } from "../synastry-i18n";

interface Props {
  result: SynastryResult;
  onClose: () => void;
  t: SynT;
  lang: SynLang;
}

export default function SynastryPoster({ result, onClose, t, lang }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(true);

  const rel = getRelationType(result.input.relationType, lang);
  const nameA = result.input.personA.name;
  const nameB = result.input.personB.name;
  const tier = result.tier;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawPoster(canvas, result, t, lang);
    setTimeout(() => {
      setDataUrl(canvas.toDataURL("image/png"));
      setGenerating(false);
    }, 200);
  }, [result, t, lang]);

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `synastry-${nameA}-${nameB}.png`;
    a.click();
  };

  return (
    <div className="syn-poster-overlay" onClick={onClose}>
      <div className="syn-poster-modal" onClick={(e) => e.stopPropagation()}>
        <button className="syn-poster-close" onClick={onClose}>✕</button>
        <h3 className="syn-poster-title">{t.posterTitle}</h3>

        {generating ? (
          <div className="syn-poster-loading">
            <div className="syn-spinner" />
            <p>{t.posterGenerating}</p>
          </div>
        ) : (
          <>
            {dataUrl && (
              <img src={dataUrl} alt={t.posterAlt} className="syn-poster-preview" />
            )}
            <div className="syn-poster-actions">
              <button
                className="syn-btn-download"
                onClick={handleDownload}
                style={{ background: `linear-gradient(135deg, ${rel.gradientFrom}, ${rel.gradientTo})` }}
              >
                {t.posterDownload}
              </button>
              <p className="syn-poster-hint">{t.posterHint}</p>
            </div>
          </>
        )}

        {/* 隐藏的 canvas */}
        <canvas ref={canvasRef} width={600} height={900} style={{ display: "none" }} />
      </div>
    </div>
  );
}

// ===== Canvas 绘制函数 =====
function drawPoster(canvas: HTMLCanvasElement, result: SynastryResult, t: SynT, lang: SynLang) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const W = canvas.width;
  const H = canvas.height;
  const rel = getRelationType(result.input.relationType, lang);
  const nameA = result.input.personA.name;
  const nameB = result.input.personB.name;
  const tier = result.tier;

  // ===== 背景 =====
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  bgGrad.addColorStop(0, "#0a0516");
  bgGrad.addColorStop(0.5, "#0f0f2e");
  bgGrad.addColorStop(1, "#0a0516");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // ===== 星星背景 =====
  const rng = seededRandom(42);
  for (let i = 0; i < 120; i++) {
    const x = rng() * W;
    const y = rng() * H;
    const r = 0.5 + rng() * 1.2;
    const alpha = 0.2 + rng() * 0.6;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fill();
  }

  // ===== 顶部光晕 =====
  const glowGrad = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, 300);
  glowGrad.addColorStop(0, rel.gradientFrom + "50");
  glowGrad.addColorStop(1, "transparent");
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, W, 300);

  // ===== 顶部装饰线 =====
  ctx.strokeStyle = `${rel.gradientTo}40`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(40, 80);
  ctx.lineTo(W - 40, 80);
  ctx.stroke();

  // ===== 网站标题 =====
  ctx.font = "bold 16px sans-serif";
  ctx.fillStyle = "#ffffff60";
  ctx.textAlign = "center";
  ctx.fillText("✦ CELESTIAL SYNASTRY ✦", W / 2, 55);

  // ===== 名字 + 关系类型 =====
  ctx.font = "bold 36px sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(`${nameA} ${rel.icon} ${nameB}`, W / 2, 150);

  ctx.font = "18px sans-serif";
  ctx.fillStyle = rel.color;
  ctx.fillText(rel.label, W / 2, 185);

  // ===== 评分圆圈 =====
  const cx = W / 2;
  const cy = 290;
  const R = 70;

  // 外圈渐变
  const ringGrad = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
  ringGrad.addColorStop(0, rel.gradientFrom);
  ringGrad.addColorStop(1, rel.gradientTo);

  // 背景圆环
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.strokeStyle = "#ffffff15";
  ctx.lineWidth = 12;
  ctx.stroke();

  // 进度圆环
  const progress = (result.totalScore / 100) * Math.PI * 2;
  ctx.beginPath();
  ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + progress);
  ctx.strokeStyle = ringGrad;
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.stroke();

  // 分数
  ctx.font = "bold 48px sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(String(result.totalScore), cx, cy + 16);
  ctx.font = "14px sans-serif";
  ctx.fillStyle = "#ffffff80";
  ctx.fillText("/ 100", cx, cy + 36);

  // 评级标签
  ctx.font = "bold 20px sans-serif";
  ctx.fillStyle = tier.color;
  ctx.fillText(`${tier.emoji} ${tier.label}`, cx, 390);
  ctx.font = "14px sans-serif";
  ctx.fillStyle = "#ffffffcc";
  ctx.fillText(tier.tagline, cx, 416);

  // ===== 分割线 =====
  ctx.strokeStyle = "#ffffff18";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(40, 440);
  ctx.lineTo(W - 40, 440);
  ctx.stroke();

  // ===== 维度评分 =====
  ctx.font = "bold 14px sans-serif";
  ctx.fillStyle = "#ffffff80";
  ctx.textAlign = "center";
  ctx.fillText(t.dimensionsTitle, cx, 468);

  const dims = result.dimensions;
  const dimW = (W - 80) / dims.length;

  dims.forEach((dim, i) => {
    const x = 40 + i * dimW + dimW / 2;
    const y = 540;
    const barH = 90;
    const barW = 28;

    // 背景条
    ctx.fillStyle = "#ffffff10";
    ctx.roundRect(x - barW / 2, y - barH, barW, barH, 4);
    ctx.fill();

    // 进度条
    const filledH = (dim.score / 100) * barH;
    const barGrad = ctx.createLinearGradient(x, y, x, y - barH);
    barGrad.addColorStop(0, rel.gradientFrom);
    barGrad.addColorStop(1, rel.gradientTo);
    ctx.fillStyle = barGrad;
    ctx.roundRect(x - barW / 2, y - filledH, barW, filledH, 4);
    ctx.fill();

    // 图标
    ctx.font = "18px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(dim.icon, x, y + 20);

    // 分数
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = rel.color;
    ctx.fillText(String(dim.score), x, y + 40);

    // 标签
    ctx.font = "11px sans-serif";
    ctx.fillStyle = "#ffffff80";
    ctx.fillText(dim.label, x, y + 56);
  });

  // ===== 核心相位 =====
  ctx.strokeStyle = "#ffffff18";
  ctx.beginPath();
  ctx.moveTo(40, 620);
  ctx.lineTo(W - 40, 620);
  ctx.stroke();

  ctx.font = "bold 14px sans-serif";
  ctx.fillStyle = "#ffffff80";
  ctx.textAlign = "center";
  ctx.fillText(t.posterKeyAspects, cx, 648);

  const keyAspects = result.topAspects.filter((a) => a.isKeyPlanet).slice(0, 4);
  keyAspects.forEach((asp, i) => {
    const x = i < 2 ? 40 : W / 2 + 10;
    const y = 680 + Math.floor(i / 2) * 60;
    const pA = PLANET_MAP[asp.planetA];
    const pB = PLANET_MAP[asp.planetB];

    // 背景
    ctx.fillStyle = "#ffffff08";
    ctx.roundRect(x, y, W / 2 - 50, 48, 8);
    ctx.fill();

    // 行星
    ctx.font = "bold 13px sans-serif";
    ctx.fillStyle = pA?.color ?? "#fff";
    ctx.textAlign = "left";
    ctx.fillText(`${pA?.symbol ?? ""} ${pA?.name ?? asp.planetA}`, x + 10, y + 18);

    ctx.fillStyle = "#ffffff60";
    ctx.fillText(`× ${pB?.name ?? asp.planetB}`, x + 10, y + 34);

    // 标题
    ctx.font = "13px sans-serif";
    ctx.fillStyle = rel.color;
    ctx.textAlign = "right";
    ctx.fillText(asp.shortTitle, x + W / 2 - 52, y + 26);
  });

  // ===== 底部装饰 =====
  ctx.strokeStyle = "#ffffff15";
  ctx.beginPath();
  ctx.moveTo(40, H - 80);
  ctx.lineTo(W - 40, H - 80);
  ctx.stroke();

  ctx.font = "12px sans-serif";
  ctx.fillStyle = "#ffffff30";
  ctx.textAlign = "center";
  ctx.fillText(t.posterFooter, cx, H - 52);
  ctx.fillText(new Date().toLocaleDateString(lang === "en" ? "en-US" : lang === "tw" ? "zh-TW" : "zh-CN"), cx, H - 28);
}

// ===== 伪随机数生成器（seeded，用于星星位置稳定）=====
function seededRandom(seed: number) {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}
