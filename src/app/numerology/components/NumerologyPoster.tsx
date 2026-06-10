"use client";

import React, { useRef, useEffect, useState } from "react";
import type { NumerologyResult } from "../numerology-engine";
import { formatBirthdate } from "../numerology-engine";
import type { NumT, Lang } from "../numerology-i18n";

interface NumerologyPosterProps {
  t: NumT;
  lang: Lang;
  result: NumerologyResult;
  visible: boolean;
  onClose: () => void;
}

export function NumerologyPoster({ t, lang, result, visible, onClose }: NumerologyPosterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (visible && result) {
      setIsGenerating(true);
      void drawPoster();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, result]);

  async function drawPoster() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = 750;
    const H = 1200;
    canvas.width = W;
    canvas.height = H;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { profile, number, isMaster, birthdate, keywords } = result;
    const primaryColor = profile.colorHex;
    const secondaryColor = profile.secondaryColorHex;

    // ===== 背景 =====
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, "#0a0618");
    bgGrad.addColorStop(0.4, "#120a2e");
    bgGrad.addColorStop(1, "#0d0521");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 微粒星点
    ctx.save();
    for (let i = 0; i < 120; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      const r = Math.random() * 1.5 + 0.3;
      const alpha = Math.random() * 0.5 + 0.1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    }
    ctx.restore();

    // ===== 顶部光晕 =====
    const glowGrad = ctx.createRadialGradient(W / 2, 300, 0, W / 2, 300, 350);
    glowGrad.addColorStop(0, `${primaryColor}30`);
    glowGrad.addColorStop(0.5, `${primaryColor}10`);
    glowGrad.addColorStop(1, "transparent");
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, W, H);

    // ===== 顶部装饰线 =====
    ctx.save();
    ctx.strokeStyle = `${primaryColor}60`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 60);
    ctx.lineTo(W - 40, 60);
    ctx.stroke();
    ctx.restore();

    // ===== 网站名称 =====
    ctx.save();
    ctx.font = "bold 22px serif";
    ctx.fillStyle = "rgba(201,168,76,0.7)";
    ctx.textAlign = "center";
    ctx.fillText(t.posterBrand, W / 2, 44);
    ctx.restore();

    // ===== 卓越数标识 =====
    if (isMaster) {
      ctx.save();
      const badgeW = 220;
      const badgeX = W / 2 - badgeW / 2;
      const badgeY = 75;
      const badgeGrad = ctx.createLinearGradient(badgeX, badgeY, badgeX + badgeW, badgeY);
      badgeGrad.addColorStop(0, `${primaryColor}50`);
      badgeGrad.addColorStop(1, `${secondaryColor}50`);
      roundRect(ctx, badgeX, badgeY, badgeW, 32, 16, true, false);
      ctx.fillStyle = badgeGrad;
      ctx.fill();
      ctx.font = "bold 13px sans-serif";
      ctx.fillStyle = secondaryColor;
      ctx.textAlign = "center";
      ctx.fillText(t.posterMaster, W / 2, 97);
      ctx.restore();
    }

    // ===== 核心大数字 =====
    const numY = isMaster ? 280 : 260;

    // 数字外圈
    ctx.save();
    const circleGrad = ctx.createRadialGradient(W / 2, numY, 0, W / 2, numY, 110);
    circleGrad.addColorStop(0, `${primaryColor}25`);
    circleGrad.addColorStop(0.7, `${primaryColor}10`);
    circleGrad.addColorStop(1, "transparent");
    ctx.fillStyle = circleGrad;
    ctx.beginPath();
    ctx.arc(W / 2, numY, 110, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = `${primaryColor}50`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(W / 2, numY, 95, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 数字主体
    ctx.save();
    const numGrad = ctx.createLinearGradient(W / 2 - 60, numY - 80, W / 2 + 60, numY + 80);
    numGrad.addColorStop(0, "#ffffff");
    numGrad.addColorStop(0.4, secondaryColor);
    numGrad.addColorStop(1, primaryColor);
    ctx.font = `bold ${number > 9 ? "100px" : "120px"} serif`;
    ctx.fillStyle = numGrad;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(number.toString(), W / 2, numY);
    ctx.restore();

    // 符号
    ctx.save();
    ctx.font = "24px serif";
    ctx.fillStyle = `${primaryColor}80`;
    ctx.textAlign = "center";
    ctx.fillText(profile.symbol, W / 2, numY - 80);
    ctx.restore();

    // ===== 灵数名称 =====
    const nameY = numY + 140;
    ctx.save();
    ctx.font = "bold 36px serif";
    const nameGrad = ctx.createLinearGradient(W / 2 - 80, nameY, W / 2 + 80, nameY);
    nameGrad.addColorStop(0, secondaryColor);
    nameGrad.addColorStop(1, primaryColor);
    ctx.fillStyle = nameGrad;
    ctx.textAlign = "center";
    ctx.fillText(profile.name, W / 2, nameY);
    ctx.restore();

    // ===== 出生日期 =====
    const dateY = nameY + 45;
    ctx.save();
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "rgba(200,180,140,0.6)";
    ctx.textAlign = "center";
    ctx.fillText(
      `📅 ${formatBirthdate(birthdate.year, birthdate.month, birthdate.day, lang)}`,
      W / 2,
      dateY,
    );
    ctx.restore();

    // ===== 分隔线 =====
    const divY = dateY + 30;
    ctx.save();
    const divGrad = ctx.createLinearGradient(80, divY, W - 80, divY);
    divGrad.addColorStop(0, "transparent");
    divGrad.addColorStop(0.3, `${primaryColor}60`);
    divGrad.addColorStop(0.7, `${secondaryColor}60`);
    divGrad.addColorStop(1, "transparent");
    ctx.strokeStyle = divGrad;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, divY);
    ctx.lineTo(W - 80, divY);
    ctx.stroke();
    ctx.restore();

    // ===== 一句话 tagline =====
    const taglineY = divY + 50;
    ctx.save();
    ctx.font = "italic 20px serif";
    ctx.fillStyle = "rgba(232,213,163,0.85)";
    ctx.textAlign = "center";
    wrapText(ctx, `「${profile.tagline}」`, W / 2, taglineY, W - 100, 32);
    ctx.restore();

    // ===== 关键词标签 =====
    const kwY = taglineY + 80;
    const kwList = keywords;
    const kwPadX = 18;
    ctx.font = "bold 15px sans-serif";
    const kwWidths = kwList.map((kw) => ctx.measureText(kw).width + kwPadX * 2);
    const totalKwW = kwWidths.reduce((a, b) => a + b, 0) + (kwList.length - 1) * 12;
    let kwX = W / 2 - totalKwW / 2;

    for (let i = 0; i < kwList.length; i++) {
      const kw = kwList[i]!;
      const kwW = kwWidths[i]!;
      // 背景
      ctx.save();
      roundRect(ctx, kwX, kwY - 16, kwW, 32, 16, true, false);
      ctx.fillStyle = `${primaryColor}25`;
      ctx.fill();
      ctx.strokeStyle = `${primaryColor}50`;
      ctx.lineWidth = 1;
      ctx.stroke();
      // 文字
      ctx.font = "bold 14px sans-serif";
      ctx.fillStyle = secondaryColor;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(kw, kwX + kwPadX, kwY);
      ctx.restore();
      kwX += kwW + 12;
    }

    // ===== 特质列表 =====
    const traitsY = kwY + 50;
    ctx.save();
    ctx.font = "15px sans-serif";
    ctx.fillStyle = "rgba(200,180,150,0.6)";
    ctx.textAlign = "center";
    const traitsText = profile.traits.slice(0, 5).join("  ·  ");
    ctx.fillText(traitsText, W / 2, traitsY);
    ctx.restore();

    // ===== 三个天赋卡片 =====
    const cardY = traitsY + 40;
    const cardW = (W - 80 - 20) / 3;
    const cardH = 110;
    for (let i = 0; i < 3; i++) {
      const gift = profile.gifts[i];
      if (!gift) continue;
      const cx = 40 + i * (cardW + 10);
      ctx.save();
      roundRect(ctx, cx, cardY, cardW, cardH, 12, true, true);
      ctx.fillStyle = "rgba(20,10,45,0.8)";
      ctx.fill();
      ctx.strokeStyle = `${primaryColor}30`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // 图标
      ctx.font = "26px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(gift.icon, cx + cardW / 2, cardY + 14);

      // 标题
      ctx.font = "bold 13px sans-serif";
      ctx.fillStyle = secondaryColor;
      ctx.textBaseline = "top";
      ctx.fillText(gift.title, cx + cardW / 2, cardY + 50);

      // 描述
      ctx.font = "11px sans-serif";
      ctx.fillStyle = "rgba(200,180,150,0.6)";
      wrapTextFixed(ctx, gift.description, cx + cardW / 2, cardY + 72, cardW - 16, 16, 2);
      ctx.restore();
    }

    // ===== 底部灵性洞见 =====
    const msgY = cardY + cardH + 50;
    ctx.save();
    ctx.font = "italic 17px serif";
    ctx.fillStyle = `${secondaryColor}90`;
    ctx.textAlign = "center";
    wrapText(ctx, profile.spiritualMessage, W / 2, msgY, W - 100, 28);
    ctx.restore();

    // ===== 底部装饰线 =====
    const bottomLineY = H - 60;
    ctx.save();
    const blGrad = ctx.createLinearGradient(80, bottomLineY, W - 80, bottomLineY);
    blGrad.addColorStop(0, "transparent");
    blGrad.addColorStop(0.5, `${primaryColor}40`);
    blGrad.addColorStop(1, "transparent");
    ctx.strokeStyle = blGrad;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, bottomLineY);
    ctx.lineTo(W - 80, bottomLineY);
    ctx.stroke();
    ctx.restore();

    // ===== 网站 URL =====
    ctx.save();
    ctx.font = "13px sans-serif";
    ctx.fillStyle = "rgba(201,168,76,0.4)";
    ctx.textAlign = "center";
    ctx.fillText(t.posterFooter, W / 2, H - 28);
    ctx.restore();

    // 生成图片 URL
    setImageUrl(canvas.toDataURL("image/png"));
    setIsGenerating(false);
  }

  // 文本自动换行（居中对齐）
  function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
  ) {
    const words = text.split("");
    let line = "";
    let currentY = y;

    for (const char of words) {
      const testLine = line + char;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line !== "") {
        ctx.fillText(line, x, currentY);
        line = char;
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
  }

  // 固定行数文本换行（左对齐）
  function wrapTextFixed(
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
    let currentY = y;
    let lineCount = 0;

    for (const char of chars) {
      if (lineCount >= maxLines) break;
      const testLine = line + char;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line !== "") {
        ctx.fillText(line, x, currentY);
        line = char;
        currentY += lineHeight;
        lineCount++;
      } else {
        line = testLine;
      }
    }
    if (lineCount < maxLines && line) {
      ctx.fillText(line, x, currentY);
    }
  }

  function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    fill: boolean,
    stroke: boolean,
  ) {
    ctx.beginPath();
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
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.download = `灵数${result.number}-${result.profile.name}.png`;
    link.href = imageUrl;
    link.click();
  };

  if (!visible) return null;

  return (
    <div className="num-poster-overlay" onClick={onClose}>
      <div className="num-poster-modal" onClick={(e) => e.stopPropagation()}>
        {/* 关闭按钮 */}
        <button className="num-poster-close" onClick={onClose}>✕</button>

        <h3 className="num-poster-title">{t.posterTitle}</h3>

        {/* Canvas（隐藏，用于生成图片） */}
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* 图片预览 */}
        <div className="num-poster-preview">
          {isGenerating ? (
            <div className="num-poster-generating">
              <span className="num-poster-gen-icon">✨</span>
              <p>{t.posterGenerating}</p>
            </div>
          ) : imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={t.posterAlt}
              className="num-poster-image"
            />
          ) : null}
        </div>

        {/* 操作按钮 */}
        {!isGenerating && imageUrl && (
          <div className="num-poster-actions">
            <button className="num-poster-download-btn" onClick={handleDownload}>
              <span>⬇</span>
              <span>{t.posterDownload}</span>
            </button>
            <p className="num-poster-share-tip">
              {t.posterShareTip}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
