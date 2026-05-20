"use client";

import React, { useRef, useEffect, useState } from "react";
import type { RuneReadingResult } from "../rune-engine";
import { getActiveReading, getElementColor, formatDrawTime } from "../rune-engine";

interface RunePosterProps {
  result: RuneReadingResult;
  visible: boolean;
  onClose: () => void;
}

export function RunePoster({ result, visible, onClose }: RunePosterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (visible && result) {
      setIsGenerating(true);
      setImageUrl("");
      void drawPoster();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, result]);

  async function drawPoster() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = 750;
    const H = result.spread === "single" ? 1100 : 1400;
    canvas.width = W;
    canvas.height = H;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mainStone = result.stones[0]!;
    const mainReading = getActiveReading(mainStone);
    const mainColors = getElementColor(mainStone.rune.element);

    // ===== 背景 =====
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, "#060810");
    bgGrad.addColorStop(0.35, "#0a0f1a");
    bgGrad.addColorStop(0.7, "#080c18");
    bgGrad.addColorStop(1, "#060810");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 石头纹理噪点
    ctx.save();
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      const alpha = Math.random() * 0.04;
      const size = Math.random() * 2;
      ctx.fillStyle = `rgba(180,180,180,${alpha})`;
      ctx.fillRect(x, y, size, size);
    }
    ctx.restore();

    // 星点
    ctx.save();
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      const r = Math.random() * 1.2 + 0.2;
      const alpha = Math.random() * 0.5 + 0.1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(150,200,255,${alpha})`;
      ctx.fill();
    }
    ctx.restore();

    // ===== 主光晕（中心放射，元素颜色） =====
    const glowY = H * 0.28;
    const glowGrad = ctx.createRadialGradient(W / 2, glowY, 0, W / 2, glowY, 400);
    glowGrad.addColorStop(0, `${mainColors.primary}22`);
    glowGrad.addColorStop(0.5, `${mainColors.primary}0a`);
    glowGrad.addColorStop(1, "transparent");
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, W, H);

    // ===== 顶部装饰边框线 =====
    ctx.save();
    const topLineGrad = ctx.createLinearGradient(0, 50, W, 50);
    topLineGrad.addColorStop(0, "transparent");
    topLineGrad.addColorStop(0.2, `${mainColors.primary}80`);
    topLineGrad.addColorStop(0.8, `${mainColors.secondary}80`);
    topLineGrad.addColorStop(1, "transparent");
    ctx.strokeStyle = topLineGrad;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(40, 55);
    ctx.lineTo(W - 40, 55);
    ctx.stroke();

    // 顶部北欧符文装饰排列
    ctx.font = "14px serif";
    ctx.fillStyle = `${mainColors.primary}50`;
    ctx.textAlign = "center";
    const runeRow = "ᚠᚢᚦᚨᚱᚲᚷᚹ";
    for (let i = 0; i < runeRow.length; i++) {
      ctx.fillText(runeRow[i]!, 80 + i * 82, 38);
    }
    ctx.restore();

    // ===== 网站名称 =====
    ctx.save();
    ctx.font = "bold 20px serif";
    ctx.fillStyle = "rgba(180,200,240,0.55)";
    ctx.textAlign = "center";
    ctx.fillText("RuneWhisper · 符文之语", W / 2, 46);
    ctx.restore();

    // ===== 占卜模式标题 =====
    const modeName = result.spread === "single" ? "奥丁之眼  ·  单石占卜" : "诺伦三女神  ·  三石占卜";
    ctx.save();
    ctx.font = "bold 15px sans-serif";
    ctx.fillStyle = `${mainColors.secondary}99`;
    ctx.textAlign = "center";
    ctx.letterSpacing = "0.1em";
    ctx.fillText(modeName, W / 2, 80);
    ctx.restore();

    if (result.spread === "single") {
      await drawSingleLayout(ctx, W, H, mainStone, mainReading, mainColors);
    } else {
      await drawThreeLayout(ctx, W, H);
    }

    // ===== 底部分隔线 + URL =====
    const bottomY = H - 55;
    ctx.save();
    const blGrad = ctx.createLinearGradient(40, bottomY, W - 40, bottomY);
    blGrad.addColorStop(0, "transparent");
    blGrad.addColorStop(0.3, `${mainColors.primary}50`);
    blGrad.addColorStop(0.7, `${mainColors.secondary}50`);
    blGrad.addColorStop(1, "transparent");
    ctx.strokeStyle = blGrad;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, bottomY);
    ctx.lineTo(W - 40, bottomY);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.font = "13px sans-serif";
    ctx.fillStyle = "rgba(140,170,220,0.35)";
    ctx.textAlign = "center";
    ctx.fillText(`✦  符文之语 RuneWhisper  ·  ${formatDrawTime(result.drawTime)}  ✦`, W / 2, H - 26);
    ctx.restore();

    setImageUrl(canvas.toDataURL("image/png"));
    setIsGenerating(false);
  }

  // ===== 单石布局 =====
  function drawSingleLayout(
    ctx: CanvasRenderingContext2D,
    W: number,
    _H: number,
    _stone: (typeof result.stones)[0],
    reading: ReturnType<typeof getActiveReading>,
    colors: ReturnType<typeof getElementColor>,
  ) {
    const { rune, isReversed } = result.stones[0]!;
    const activeReading = reading;
    const activeColors = colors;

    // ===== 符文石圆形区域 =====
    const stoneY = 220;
    const stoneR = 110;

    // 外层光晕
    const outerGlow = ctx.createRadialGradient(W / 2, stoneY, stoneR * 0.5, W / 2, stoneY, stoneR * 1.8);
    outerGlow.addColorStop(0, `${activeColors.primary}35`);
    outerGlow.addColorStop(0.5, `${activeColors.primary}15`);
    outerGlow.addColorStop(1, "transparent");
    ctx.fillStyle = outerGlow;
    ctx.fillRect(0, stoneY - stoneR * 2, W, stoneR * 4);

    // 石头底座
    ctx.save();
    ctx.beginPath();
    ctx.arc(W / 2, stoneY, stoneR, 0, Math.PI * 2);
    const stoneGrad = ctx.createRadialGradient(W / 2 - 20, stoneY - 20, 0, W / 2, stoneY, stoneR);
    stoneGrad.addColorStop(0, "#2a2e3a");
    stoneGrad.addColorStop(0.6, "#1a1e28");
    stoneGrad.addColorStop(1, "#0e111a");
    ctx.fillStyle = stoneGrad;
    ctx.fill();
    // 石头边框
    ctx.strokeStyle = `${activeColors.primary}70`;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    // 内层发光圈
    ctx.beginPath();
    ctx.arc(W / 2, stoneY, stoneR - 10, 0, Math.PI * 2);
    ctx.strokeStyle = `${activeColors.secondary}30`;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    // 符文字符（超大）
    ctx.save();
    ctx.font = `${isReversed ? "" : ""}bold 100px serif`;
    ctx.fillStyle = activeColors.secondary;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = activeColors.primary;
    ctx.shadowBlur = 30;
    if (isReversed) {
      ctx.translate(W / 2, stoneY);
      ctx.rotate(Math.PI);
      ctx.fillText(rune.symbol, 0, 0);
    } else {
      ctx.fillText(rune.symbol, W / 2, stoneY);
    }
    ctx.restore();

    // 正/逆位标记
    const orientationY = stoneY + stoneR + 28;
    ctx.save();
    const badgeW = isReversed ? 80 : 80;
    const badgeX = W / 2 - badgeW / 2;
    roundRect(ctx, badgeX, orientationY - 15, badgeW, 30, 15, true, true);
    ctx.fillStyle = isReversed ? "rgba(200,80,60,0.18)" : "rgba(80,200,120,0.18)";
    ctx.fill();
    ctx.strokeStyle = isReversed ? "rgba(200,80,60,0.5)" : "rgba(80,200,120,0.5)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.font = "bold 13px sans-serif";
    ctx.fillStyle = isReversed ? "#F87171" : "#6EE7B7";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(isReversed ? "↓ 逆位" : "↑ 正位", W / 2, orientationY);
    ctx.restore();

    // ===== 符文名称 =====
    const nameY = orientationY + 50;
    ctx.save();
    ctx.font = "bold 42px serif";
    const nameGrad = ctx.createLinearGradient(W / 2 - 100, nameY, W / 2 + 100, nameY);
    nameGrad.addColorStop(0, activeColors.secondary);
    nameGrad.addColorStop(1, activeColors.primary);
    ctx.fillStyle = nameGrad;
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(rune.chineseName, W / 2, nameY);
    ctx.restore();

    ctx.save();
    ctx.font = "22px sans-serif";
    ctx.fillStyle = "rgba(180,200,240,0.5)";
    ctx.textAlign = "center";
    ctx.fillText(rune.name, W / 2, nameY + 34);
    ctx.restore();

    // 元素 & 神祇
    ctx.save();
    ctx.font = "15px sans-serif";
    ctx.fillStyle = "rgba(160,180,230,0.5)";
    ctx.textAlign = "center";
    ctx.fillText(`${rune.element}之力  ·  守护神：${rune.deity}`, W / 2, nameY + 68);
    ctx.restore();

    // ===== 分隔线 =====
    const divY1 = nameY + 95;
    drawDivider(ctx, W, divY1, activeColors);

    // ===== 关键词 =====
    const kwY = divY1 + 40;
    ctx.font = "bold 16px sans-serif";
    const kwList = activeReading.keywords;
    const kwPadX = 20;
    const kwWidths = kwList.map((kw) => ctx.measureText(kw).width + kwPadX * 2);
    const totalKwW = kwWidths.reduce((a, b) => a + b, 0) + (kwList.length - 1) * 12;
    let kwX = W / 2 - totalKwW / 2;

    for (let i = 0; i < kwList.length; i++) {
      const kw = kwList[i]!;
      const kwW = kwWidths[i]!;
      ctx.save();
      roundRect(ctx, kwX, kwY - 16, kwW, 32, 16, true, true);
      ctx.fillStyle = `${activeColors.primary}20`;
      ctx.fill();
      ctx.strokeStyle = `${activeColors.primary}55`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.font = "bold 15px sans-serif";
      ctx.fillStyle = activeColors.secondary;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(kw, kwX + kwW / 2, kwY);
      ctx.restore();
      kwX += kwW + 12;
    }

    // ===== 解读标题 =====
    const meaningTitleY = kwY + 50;
    ctx.save();
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = `${activeColors.secondary}cc`;
    ctx.textAlign = "left";
    ctx.fillText("符文启示", 60, meaningTitleY);
    ctx.restore();

    // 解读文字（带换行）
    ctx.save();
    ctx.font = "18px serif";
    ctx.fillStyle = "rgba(210,220,240,0.85)";
    ctx.textAlign = "left";
    const meaningY = meaningTitleY + 30;
    wrapTextLeft(ctx, activeReading.meaning, 60, meaningY, W - 120, 30);
    ctx.restore();

    // 估算解读文字高度
    const meaningLines = estimateLines(ctx, activeReading.meaning, W - 120, "18px serif");
    const adviceStartY = meaningY + meaningLines * 30 + 24;

    // ===== 建议 =====
    const adviceBgH = 80;
    ctx.save();
    roundRect(ctx, 40, adviceStartY, W - 80, adviceBgH, 16, true, true);
    ctx.fillStyle = `${activeColors.primary}10`;
    ctx.fill();
    ctx.strokeStyle = `${activeColors.primary}35`;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.font = "bold 14px sans-serif";
    ctx.fillStyle = `${activeColors.secondary}bb`;
    ctx.textAlign = "left";
    ctx.fillText("⚔  行动建议", 64, adviceStartY + 24);
    ctx.restore();

    ctx.save();
    ctx.font = "italic 16px serif";
    ctx.fillStyle = "rgba(200,215,240,0.75)";
    ctx.textAlign = "left";
    wrapTextLeft(ctx, activeReading.advice, 64, adviceStartY + 50, W - 128, 26);
    ctx.restore();

    return Promise.resolve();
  }

  // ===== 三石布局 =====
  function drawThreeLayout(
    ctx: CanvasRenderingContext2D,
    W: number,
    _H: number,
  ) {
    const stones = result.stones;

    // ===== 三颗石头横排 =====
    const stoneAreaY = 110;
    const stoneR = 68;
    const stonePositions = [
      { x: W / 2 - 220, y: stoneAreaY + stoneR + 20 },
      { x: W / 2,       y: stoneAreaY + stoneR + 20 },
      { x: W / 2 + 220, y: stoneAreaY + stoneR + 20 },
    ];

    stonePositions.forEach(({ x, y }, i) => {
      const stone = stones[i];
      if (!stone) return;
      const colors = getElementColor(stone.rune.element);

      // 外层光晕
      const glow = ctx.createRadialGradient(x, y, 0, x, y, stoneR * 2);
      glow.addColorStop(0, `${colors.primary}25`);
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, stoneR * 2, 0, Math.PI * 2);
      ctx.fill();

      // 石头主体
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, stoneR, 0, Math.PI * 2);
      const sg = ctx.createRadialGradient(x - 10, y - 10, 0, x, y, stoneR);
      sg.addColorStop(0, "#252830");
      sg.addColorStop(0.6, "#181c24");
      sg.addColorStop(1, "#0c0e14");
      ctx.fillStyle = sg;
      ctx.fill();
      ctx.strokeStyle = `${colors.primary}65`;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // 符文字符
      ctx.save();
      ctx.font = "bold 60px serif";
      ctx.fillStyle = colors.secondary;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = colors.primary;
      ctx.shadowBlur = 20;
      if (stone.isReversed) {
        ctx.translate(x, y);
        ctx.rotate(Math.PI);
        ctx.fillText(stone.rune.symbol, 0, 0);
      } else {
        ctx.fillText(stone.rune.symbol, x, y);
      }
      ctx.restore();

      // 位置标签（上方）
      if (stone.position) {
        ctx.save();
        ctx.font = "bold 12px sans-serif";
        ctx.fillStyle = `${colors.secondary}bb`;
        ctx.textAlign = "center";
        ctx.fillText(stone.positionIcon ?? "", x, y - stoneR - 24);
        ctx.font = "11px sans-serif";
        ctx.fillStyle = "rgba(160,180,220,0.6)";
        ctx.fillText(stone.position, x, y - stoneR - 8);
        ctx.restore();
      }

      // 符文名称（下方）
      ctx.save();
      ctx.font = "bold 16px serif";
      ctx.fillStyle = colors.secondary;
      ctx.textAlign = "center";
      ctx.fillText(stone.rune.chineseName, x, y + stoneR + 20);
      ctx.font = "12px sans-serif";
      ctx.fillStyle = "rgba(160,180,220,0.5)";
      ctx.fillText(stone.rune.name, x, y + stoneR + 38);
      // 正逆位
      const orientLabel = stone.isReversed ? "逆位" : "正位";
      ctx.font = "11px sans-serif";
      ctx.fillStyle = stone.isReversed ? "#F87171" : "#6EE7B7";
      ctx.fillText(orientLabel, x, y + stoneR + 54);
      ctx.restore();
    });

    // ===== 三石详情区域 =====
    let detailY = stoneAreaY + stoneR * 2 + 130;

    // 分隔线
    const mainColors = getElementColor(stones[1]?.rune.element ?? "风");
    drawDivider(ctx, W, detailY, mainColors);
    detailY += 30;

    // 每个符文详情卡片
    stones.forEach((stone, i) => {
      const colors = getElementColor(stone.rune.element);
      const reading = getActiveReading(stone);

      // 卡片背景
      const cardH = 185;
      ctx.save();
      roundRect(ctx, 36, detailY, W - 72, cardH, 16, true, true);
      ctx.fillStyle = `rgba(12,16,26,0.85)`;
      ctx.fill();
      ctx.strokeStyle = `${colors.primary}35`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // 左侧颜色标记
      ctx.save();
      roundRect(ctx, 36, detailY, 4, cardH, 2, true, false);
      ctx.fillStyle = colors.primary;
      ctx.fill();
      ctx.restore();

      // 位置标题行
      ctx.save();
      ctx.font = "bold 13px sans-serif";
      ctx.fillStyle = `${colors.secondary}cc`;
      ctx.textAlign = "left";
      ctx.fillText(`${stone.positionIcon ?? ""} ${stone.position ?? ""}`, 60, detailY + 26);
      ctx.restore();

      // 符文名 + 正逆位
      ctx.save();
      ctx.font = "bold 20px serif";
      ctx.fillStyle = colors.secondary;
      ctx.textAlign = "left";
      ctx.fillText(`${stone.rune.symbol}  ${stone.rune.chineseName}（${stone.rune.name}）`, 60, detailY + 54);
      // 正逆位标记
      const orientText = reading.orientation;
      const nameMetrics = ctx.measureText(`${stone.rune.symbol}  ${stone.rune.chineseName}（${stone.rune.name}）`);
      ctx.font = "12px sans-serif";
      ctx.fillStyle = stone.isReversed ? "#F87171" : "#6EE7B7";
      ctx.fillText(orientText, 60 + nameMetrics.width + 10, detailY + 54);
      ctx.restore();

      // 关键词（小）
      ctx.save();
      ctx.font = "13px sans-serif";
      ctx.fillStyle = `${colors.primary}cc`;
      ctx.textAlign = "left";
      ctx.fillText(reading.keywords.slice(0, 3).join("  ·  "), 60, detailY + 76);
      ctx.restore();

      // 解读文字
      ctx.save();
      ctx.font = "15px serif";
      ctx.fillStyle = "rgba(200,215,240,0.75)";
      ctx.textAlign = "left";
      wrapTextLeft(ctx, reading.meaning, 60, detailY + 102, W - 110, 24, 2);
      ctx.restore();

      // 建议
      ctx.save();
      ctx.font = "italic 14px serif";
      ctx.fillStyle = "rgba(180,200,230,0.55)";
      ctx.textAlign = "left";
      ctx.fillText(`⚔  ${reading.advice}`, 60, detailY + 158, W - 110);
      ctx.restore();

      detailY += cardH + 12;
      void i;
    });

    // ===== 综合解读卡片 =====
    detailY += 8;
    const synthText = buildSynthesisText();
    const synthLines = estimateLines(ctx, synthText, W - 140, "16px serif");
    const synthH = 60 + synthLines * 26 + 16;

    ctx.save();
    roundRect(ctx, 36, detailY, W - 72, synthH, 16, true, true);
    const synthGrad = ctx.createLinearGradient(36, detailY, W - 36, detailY + synthH);
    synthGrad.addColorStop(0, "rgba(60,40,100,0.5)");
    synthGrad.addColorStop(1, "rgba(20,30,60,0.5)");
    ctx.fillStyle = synthGrad;
    ctx.fill();
    ctx.strokeStyle = "rgba(180,160,240,0.3)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "rgba(200,180,255,0.85)";
    ctx.textAlign = "center";
    ctx.fillText("✦  三石综合解读  ✦", W / 2, detailY + 26);
    ctx.restore();

    ctx.save();
    ctx.font = "16px serif";
    ctx.fillStyle = "rgba(200,215,240,0.75)";
    ctx.textAlign = "left";
    wrapTextLeft(ctx, synthText, 60, detailY + 52, W - 110, 26);
    ctx.restore();

    return Promise.resolve();
  }

  function buildSynthesisText(): string {
    const [past, present, future] = result.stones;
    if (!past || !present || !future) return "";
    const pastR = getActiveReading(past);
    const presentR = getActiveReading(present);
    const futureR = getActiveReading(future);
    return `【${past.rune.chineseName}】在过去揭示了「${pastR.keywords[0]}」的根源，`
      + `与当前【${present.rune.chineseName}】所呈现的「${presentR.keywords[0]}」相呼应。`
      + `若顺应此能量流动，未来【${future.rune.chineseName}】将带来「${futureR.keywords[0]}」的趋势。`
      + `三石提示：${futureR.advice}`;
  }

  // ===== 工具函数 =====

  function drawDivider(
    ctx: CanvasRenderingContext2D,
    W: number,
    y: number,
    colors: ReturnType<typeof getElementColor>,
  ) {
    ctx.save();
    const dGrad = ctx.createLinearGradient(40, y, W - 40, y);
    dGrad.addColorStop(0, "transparent");
    dGrad.addColorStop(0.25, `${colors.primary}55`);
    dGrad.addColorStop(0.75, `${colors.secondary}55`);
    dGrad.addColorStop(1, "transparent");
    ctx.strokeStyle = dGrad;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, y);
    ctx.lineTo(W - 40, y);
    ctx.stroke();
    ctx.restore();
  }

  function wrapTextLeft(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    maxLines?: number,
  ) {
    const chars = text.split("");
    let line = "";
    let currentY = y;
    let lineCount = 0;

    for (const char of chars) {
      if (maxLines !== undefined && lineCount >= maxLines) break;
      const testLine = line + char;
      if (ctx.measureText(testLine).width > maxWidth && line !== "") {
        ctx.fillText(line, x, currentY);
        line = char;
        currentY += lineHeight;
        lineCount++;
      } else {
        line = testLine;
      }
    }
    if (!maxLines || lineCount < maxLines) {
      ctx.fillText(line, x, currentY);
    }
  }

  function estimateLines(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number,
    font: string,
  ): number {
    const prev = ctx.font;
    ctx.font = font;
    const chars = text.split("");
    let line = "";
    let lines = 1;
    for (const char of chars) {
      const testLine = line + char;
      if (ctx.measureText(testLine).width > maxWidth && line !== "") {
        line = char;
        lines++;
      } else {
        line = testLine;
      }
    }
    ctx.font = prev;
    return lines;
  }

  function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number, y: number, w: number, h: number, r: number,
    fill: boolean, stroke: boolean,
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
    const mainStone = result.stones[0]!;
    const spreadName = result.spread === "single" ? "单石" : "三石";
    const link = document.createElement("a");
    link.download = `符文占卜-${mainStone.rune.chineseName}-${spreadName}.png`;
    link.href = imageUrl;
    link.click();
  };

  if (!visible) return null;

  return (
    <div className="rune-poster-overlay" onClick={onClose}>
      <div className="rune-poster-modal" onClick={(e) => e.stopPropagation()}>
        {/* 关闭 */}
        <button className="rune-poster-close" onClick={onClose}>✕</button>

        <h3 className="rune-poster-title">🪨 你的专属符文石卡片</h3>

        {/* Canvas（隐藏，用于生成） */}
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* 预览区 */}
        <div className="rune-poster-preview">
          {isGenerating ? (
            <div className="rune-poster-generating">
              <span className="rune-poster-gen-icon">ᚠ</span>
              <p>古老符文正在刻入石头...</p>
            </div>
          ) : imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt="卢恩符文占卜结果"
              className="rune-poster-image"
            />
          ) : null}
        </div>

        {/* 操作按钮 */}
        {!isGenerating && imageUrl && (
          <div className="rune-poster-actions">
            <button className="rune-poster-download-btn" onClick={handleDownload}>
              <span>⬇</span>
              <span>保存图片</span>
            </button>
            <p className="rune-poster-share-tip">
              长按图片可直接分享到微信、朋友圈等
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
