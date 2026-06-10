"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  ZODIAC_MAP,
  ELEMENT_COLORS,
} from "../horoscope-data";
import type { HoroscopeResult } from "../horoscope-engine";
import type { HoroT } from "../horoscope-i18n";

interface FortunePosterProps {
  result: HoroscopeResult;
  visible: boolean;
  onClose: () => void;
  t: HoroT;
}

/** 海报画布尺寸 */
const POSTER_WIDTH = 750;
const POSTER_HEIGHT = 1334;

export function FortunePoster({ result, visible, onClose, t }: FortunePosterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const zodiac = ZODIAC_MAP[result.zodiac];
  const elementColor = ELEMENT_COLORS[zodiac.element] ?? "#c9a84c";

  /** 绘制圆角矩形 */
  const roundRect = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number, y: number,
    w: number, h: number, r: number,
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }, []);

  /** 绘制海报 */
  const drawPoster = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsGenerating(true);

    // 设置画布高清
    const dpr = 2;
    canvas.width = POSTER_WIDTH * dpr;
    canvas.height = POSTER_HEIGHT * dpr;
    canvas.style.width = `${POSTER_WIDTH}px`;
    canvas.style.height = `${POSTER_HEIGHT}px`;
    ctx.scale(dpr, dpr);

    // === 背景 ===
    const gradient = ctx.createLinearGradient(0, 0, 0, POSTER_HEIGHT);
    gradient.addColorStop(0, "#0a0a1a");
    gradient.addColorStop(0.5, "#0f0f2e");
    gradient.addColorStop(1, "#0a0a1a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, POSTER_WIDTH, POSTER_HEIGHT);

    // 星星背景
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * POSTER_WIDTH;
      const y = Math.random() * POSTER_HEIGHT;
      const size = Math.random() * 2 + 0.5;
      const alpha = Math.random() * 0.5 + 0.3;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // === 顶部星座区 ===
    // 星座符号
    ctx.fillStyle = elementColor;
    ctx.font = "80px serif";
    ctx.textAlign = "center";
    ctx.fillText(zodiac.symbol, POSTER_WIDTH / 2, 160);

    // 星座名
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 48px sans-serif";
    ctx.fillText(t.signLabel[result.zodiac], POSTER_WIDTH / 2, 230);

    // 英文名 & 日期
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.font = "24px sans-serif";
    ctx.fillText(`${zodiac.enName}  |  ${zodiac.dateRange}`, POSTER_WIDTH / 2, 270);

    // 运势标题
    ctx.fillStyle = elementColor;
    ctx.font = "bold 36px sans-serif";
    ctx.fillText(result.title, POSTER_WIDTH / 2, 330);

    // 日期
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = "22px sans-serif";
    ctx.fillText(result.date, POSTER_WIDTH / 2, 370);

    // === 五维指数区 ===
    const scoresY = 420;
    const dimensions = [
      { key: "overall" as const, label: t.dimOverall, icon: "⭐" },
      { key: "love" as const, label: t.dimLove, icon: "💕" },
      { key: "career" as const, label: t.dimCareer, icon: "💼" },
      { key: "wealth" as const, label: t.dimWealth, icon: "💰" },
      { key: "health" as const, label: t.dimHealth, icon: "🌿" },
    ];

    // 分区标题
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "22px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(t.posterScores, 60, scoresY);

    // 绘制分数条
    dimensions.forEach((dim, index) => {
      const y = scoresY + 40 + index * 50;
      const score = result.scores[dim.key];
      const barWidth = 380;
      const barX = 160;

      // 标签
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.font = "22px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(dim.label, barX - 15, y + 6);

      // 背景条
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      roundRect(ctx, barX, y - 8, barWidth, 16, 8);
      ctx.fill();

      // 填充条
      const fillWidth = (score / 5) * barWidth;
      ctx.fillStyle = elementColor;
      roundRect(ctx, barX, y - 8, fillWidth, 16, 8);
      ctx.fill();

      // 分数
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 20px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`${score}`, barX + barWidth + 15, y + 7);
    });

    // === 幸运指南区 ===
    const luckyY = scoresY + 320;

    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "22px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(t.posterLucky, 60, luckyY);

    const luckyItems = [
      { label: t.luckyColor, value: result.lucky.color },
      { label: t.luckyNumber, value: String(result.lucky.number) },
      { label: t.luckyDirection, value: result.lucky.direction },
      { label: t.luckyItem, value: result.lucky.item },
      { label: t.luckyNoble, value: `${ZODIAC_MAP[result.lucky.noble].symbol} ${t.signLabel[result.lucky.noble]}` },
      { label: t.luckyAlly, value: `${ZODIAC_MAP[result.lucky.ally].symbol} ${t.signLabel[result.lucky.ally]}` },
    ];

    // 2列布局
    luckyItems.forEach((item, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const x = 60 + col * 330;
      const y = luckyY + 40 + row * 50;

      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.font = "20px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(item.label, x, y);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText(item.value, x, y + 30);
    });

    // === 概述区 ===
    const summaryY = luckyY + 240;
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "22px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(t.posterSummary, 60, summaryY);

    // 概述卡片
    ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
    roundRect(ctx, 50, summaryY + 15, POSTER_WIDTH - 100, 120, 16);
    ctx.fill();

    // 概述文字（自动换行）
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "24px sans-serif";
    ctx.textAlign = "left";
    wrapText(ctx, result.content.overall, 75, summaryY + 50, POSTER_WIDTH - 150, 34, 3);

    // === 建议区 ===
    const adviceY = summaryY + 180;
    ctx.fillStyle = elementColor;
    ctx.font = "italic 26px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`💡 ${result.content.advice}`, POSTER_WIDTH / 2, adviceY);

    // === 底部区 ===
    // 分割线
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(60, POSTER_HEIGHT - 160);
    ctx.lineTo(POSTER_WIDTH - 60, POSTER_HEIGHT - 160);
    ctx.stroke();

    // 品牌
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(t.posterBrand, POSTER_WIDTH / 2, POSTER_HEIGHT - 110);

    // 日期
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.font = "18px sans-serif";
    ctx.fillText(result.date, POSTER_WIDTH / 2, POSTER_HEIGHT - 70);

    // 底标
    ctx.fillStyle = elementColor;
    ctx.font = "16px sans-serif";
    ctx.fillText(t.posterSaveHint, POSTER_WIDTH / 2, POSTER_HEIGHT - 30);

    // 导出图片
    const dataUrl = canvas.toDataURL("image/png");
    setPosterUrl(dataUrl);
    setIsGenerating(false);
  }, [result, zodiac, elementColor, roundRect, t]);

  useEffect(() => {
    if (visible && result) {
      void drawPoster();
    }
  }, [visible, result, drawPoster]);

  /** 保存海报到本地 */
  const handleSave = () => {
    if (!posterUrl) return;
    const link = document.createElement("a");
    link.download = `${t.signLabel[result.zodiac]}_${t.posterFileTag}_${result.date}.png`;
    link.href = posterUrl;
    link.click();
  };

  if (!visible) return null;

  return (
    <div className="fortune-poster-overlay" onClick={onClose}>
      <div className="fortune-poster-modal" onClick={(e) => e.stopPropagation()}>
        {/* 隐藏的 canvas */}
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* 预览图 */}
        <div className="fortune-poster-preview">
          {isGenerating ? (
            <div className="fortune-poster-loading">
              <span className="fortune-poster-loading-dots">
                <span>●</span><span>●</span><span>●</span>
              </span>
              <p>{t.posterGenerating}</p>
            </div>
          ) : posterUrl ? (
            <img src={posterUrl} alt={t.posterAlt} className="fortune-poster-img" />
          ) : null}
        </div>

        {/* 操作按钮 */}
        <div className="fortune-poster-actions">
          <button className="fortune-poster-save-btn" onClick={handleSave} disabled={!posterUrl}>
            {t.posterSave}
          </button>
          <button className="fortune-poster-close-btn" onClick={onClose}>
            {t.posterClose}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Canvas 文字自动换行 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number,
) {
  const chars = text.split("");
  let line = "";
  let lineCount = 0;

  for (const ch of chars) {
    const testLine = line + ch;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line.length > 0) {
      lineCount++;
      if (lineCount >= maxLines) {
        ctx.fillText(line.slice(0, -1) + "...", x, y);
        return;
      }
      ctx.fillText(line, x, y);
      line = ch;
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
