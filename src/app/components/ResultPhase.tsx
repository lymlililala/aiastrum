"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { DOMAINS } from "../tarot-data";
import { cardSlug } from "../tarot/card-slug";
import type { ReadingState } from "../page";

// ── 双语文案 ──────────────────────────────────────────
const RT = {
  zh: {
    positions:      { single: ["今日指引"], three: ["过去", "现在", "未来"] },
    spreadLabel:    { single: "每日一牌", three: "过去·现在·未来" },
    readingTitle:   "你的塔罗解读",
    readerLabel:    "塔罗师解读",
    reversed:       "逆位",
    generatePoster: "📸 生成分享海报",
    generating:     "生成海报中...",
    newReading:     "🌙 再次占卜",
    backHome:       "✦ 返回首页",
    posterTitle:    "分享海报",
    posterSave:     "💾 保存图片",
    posterShare:    "📤 分享",
    shareTitle:     "我的塔罗解读",
    shareText:      "来自塔罗启示录的神秘指引 🔮",
    posterBrand:    "🔮 塔罗启示录",
    posterFooter:   "✦ 来自 塔罗启示录 · Tarot Oracle ✦",
    dateLocale:     "zh-CN",
  },
  en: {
    positions:      { single: ["Today's Guidance"], three: ["Past", "Present", "Future"] },
    spreadLabel:    { single: "Daily Card", three: "Past · Present · Future" },
    readingTitle:   "Your Tarot Reading",
    readerLabel:    "Oracle Reading",
    reversed:       "Rev.",
    generatePoster: "📸 Generate Share Card",
    generating:     "Creating card...",
    newReading:     "🌙 New Reading",
    backHome:       "✦ Back to Home",
    posterTitle:    "Share Card",
    posterSave:     "💾 Save Image",
    posterShare:    "📤 Share",
    shareTitle:     "My Tarot Reading",
    shareText:      "Mystical guidance from Tarot Oracle 🔮",
    posterBrand:    "🔮 Tarot Oracle",
    posterFooter:   "✦ From Tarot Oracle ✦",
    dateLocale:     "en-US",
  },
};
// ─────────────────────────────────────────────────────

// 简单的 Markdown 渲染（只处理 **bold** 和 *italic* 和 \n）
function renderMarkdown(text: string) {
  const lines = text.split("\n");
  return lines.map((line, lineIdx) => {
    const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    const rendered = parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="text-gold font-semibold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={i} className="text-gold-light italic">{part.slice(1, -1)}</em>;
      }
      return <span key={i}>{part}</span>;
    });
    return (
      <p key={lineIdx} className={line.trim() === "" ? "h-3" : "mb-2 leading-relaxed"}>
        {rendered}
      </p>
    );
  });
}

interface ResultPhaseProps {
  readingState: ReadingState;
  lang?: "zh" | "en" | "tw";
  onRestart: () => void;
  onNewReading: () => void;
}

export function ResultPhase({ readingState, lang = "zh", onRestart, onNewReading }: ResultPhaseProps) {
  // tw fallback to zh dict for static UI labels
  const t = RT[lang === "tw" ? "zh" : lang];
  const [showPoster, setShowPoster] = useState(false);
  const [isGeneratingPoster, setIsGeneratingPoster] = useState(false);
  const [posterDataUrl, setPosterDataUrl] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const domainInfo = DOMAINS.find((d) => d.id === readingState.domain);
  const spreadPositions =
    readingState.spreadType === "single" ? t.positions.single : t.positions.three;

  // 打字机效果
  useEffect(() => {
    if (!readingState.reading) return;
    setDisplayedText("");
    setIsTyping(true);

    let index = 0;
    const text = readingState.reading;
    const interval = setInterval(() => {
      if (index >= text.length) {
        setIsTyping(false);
        clearInterval(interval);
        return;
      }
      const step = Math.floor(Math.random() * 3) + 2;
      index = Math.min(index + step, text.length);
      setDisplayedText(text.slice(0, index));
    }, 30);

    return () => clearInterval(interval);
  }, [readingState.reading]);

  // 生成分享海报（Canvas）
  const handleGeneratePoster = useCallback(async () => {
    setIsGeneratingPoster(true);

    try {
      const canvas = document.createElement("canvas");
      canvas.width = 750;
      canvas.height = 1200;
      const ctx = canvas.getContext("2d")!;

      // 背景渐变
      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGrad.addColorStop(0, "#0f0a1e");
      bgGrad.addColorStop(0.5, "#2d1b69");
      bgGrad.addColorStop(1, "#0f0a1e");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const lineGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      lineGrad.addColorStop(0, "transparent");
      lineGrad.addColorStop(0.5, "#c9a84c");
      lineGrad.addColorStop(1, "transparent");
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 80);
      ctx.lineTo(canvas.width, 80);
      ctx.stroke();

      ctx.font = "bold 28px serif";
      ctx.fillStyle = "#c9a84c";
      ctx.textAlign = "center";
      ctx.fillText(t.posterBrand, canvas.width / 2, 55);

      ctx.font = "18px serif";
      ctx.fillStyle = "rgba(201, 168, 76, 0.5)";
      ctx.fillText(
        new Date().toLocaleDateString(t.dateLocale, { year: "numeric", month: "long", day: "numeric" }),
        canvas.width / 2, 105,
      );

      const domainLabel = lang === "en"
        ? (domainInfo?.id.charAt(0).toUpperCase() ?? "") + (domainInfo?.id.slice(1) ?? "")
        : (domainInfo?.name ?? "");

      ctx.font = "22px serif";
      ctx.fillStyle = "rgba(201, 168, 76, 0.8)";
      ctx.fillText(
        `${domainInfo?.icon} ${domainLabel} · ${t.spreadLabel[readingState.spreadType]}`,
        canvas.width / 2, 145,
      );

      ctx.strokeStyle = lineGrad;
      ctx.beginPath();
      ctx.moveTo(0, 165);
      ctx.lineTo(canvas.width, 165);
      ctx.stroke();

      const cardImages = await Promise.all(
        readingState.cards.map(async ({ card, reversed }) => {
          return new Promise<{ img: HTMLImageElement; reversed: boolean }>((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve({ img, reversed });
            img.onerror = () => resolve({ img: new Image(), reversed });
            img.src = `/images/cards/${card.imageFile}`;
          });
        }),
      );

      const cardW = 160;
      const cardH = 266;
      const cardY = 210;
      const totalCards = readingState.cards.length;
      const spacing = totalCards === 1 ? 0 : 220;
      const startX = canvas.width / 2 - ((totalCards - 1) * spacing) / 2;

      for (let i = 0; i < totalCards; i++) {
        const cx = startX + i * spacing - cardW / 2;
        const { img, reversed } = cardImages[i]!;

        ctx.save();
        ctx.beginPath();
        roundRect(ctx, cx, cardY, cardW, cardH, 12);
        ctx.clip();

        if (reversed) {
          ctx.translate(cx + cardW / 2, cardY + cardH / 2);
          ctx.rotate(Math.PI);
          ctx.drawImage(img, -cardW / 2, -cardH / 2, cardW, cardH);
        } else {
          ctx.drawImage(img, cx, cardY, cardW, cardH);
        }
        ctx.restore();

        const cardName = lang === "en" ? readingState.cards[i]!.card.name : readingState.cards[i]!.card.nameCn;
        const posName = spreadPositions[i] ?? "";
        ctx.font = "16px serif";
        ctx.fillStyle = "rgba(201, 168, 76, 0.7)";
        ctx.textAlign = "center";
        ctx.fillText(posName, startX + i * spacing, cardY + cardH + 25);
        ctx.font = "bold 18px serif";
        ctx.fillStyle = "#e8d5a3";
        ctx.fillText(cardName, startX + i * spacing, cardY + cardH + 50);
        if (reversed) {
          ctx.font = "14px serif";
          ctx.fillStyle = "rgba(255, 100, 100, 0.8)";
          ctx.fillText(t.reversed, startX + i * spacing, cardY + cardH + 72);
        }
      }

      ctx.strokeStyle = lineGrad;
      ctx.beginPath();
      ctx.moveTo(60, cardY + cardH + 100);
      ctx.lineTo(canvas.width - 60, cardY + cardH + 100);
      ctx.stroke();

      const readingLines = readingState.reading
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .split("\n")
        .filter((l) => l.trim())
        .slice(0, 5);

      ctx.font = "18px serif";
      ctx.fillStyle = "rgba(232, 213, 163, 0.85)";
      ctx.textAlign = "left";

      let textY = cardY + cardH + 130;
      for (const line of readingLines) {
        const maxWidth = canvas.width - 120;
        const words = line.split("");
        let currentLine = "";

        for (const char of words) {
          const testLine = currentLine + char;
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && currentLine !== "") {
            ctx.fillText(currentLine, 60, textY);
            currentLine = char;
            textY += 30;
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) {
          ctx.fillText(currentLine, 60, textY);
          textY += 30;
        }
        textY += 8;
        if (textY > canvas.height - 120) break;
      }

      ctx.strokeStyle = lineGrad;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 80);
      ctx.lineTo(canvas.width, canvas.height - 80);
      ctx.stroke();

      ctx.font = "16px serif";
      ctx.fillStyle = "rgba(201, 168, 76, 0.4)";
      ctx.textAlign = "center";
      ctx.fillText(t.posterFooter, canvas.width / 2, canvas.height - 45);

      const dataUrl = canvas.toDataURL("image/png");
      setPosterDataUrl(dataUrl);
      setShowPoster(true);
    } catch (error) {
      console.error("Failed to generate poster:", error);
    } finally {
      setIsGeneratingPoster(false);
    }
  }, [readingState, domainInfo, spreadPositions, t, lang]);

  return (
    <div className="min-h-screen px-4 py-24">
      <div className="max-w-2xl mx-auto">
        {/* 结果页头部 */}
        <div className="text-center mb-8 animate-fade-in-up">
          <p className="text-gold/50 text-sm tracking-widest font-cinzel mb-2">
            {domainInfo?.icon}{" "}
            {lang === "en"
              ? (domainInfo?.id.charAt(0).toUpperCase() ?? "") + (domainInfo?.id.slice(1) ?? "")
              : domainInfo?.name}{" "}
            · {t.spreadLabel[readingState.spreadType]}
          </p>
          <h2
            className="text-3xl font-cinzel mb-2"
            style={{
              background: "linear-gradient(135deg, #e8d5a3, #c9a84c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t.readingTitle}
          </h2>
          <p className="text-gold/40 text-sm">
            {new Date().toLocaleDateString(t.dateLocale, { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* 卡牌展示区 */}
        <div
          className={`flex justify-center gap-8 mb-10 animate-fade-in-up animate-delay-100 ${
            readingState.spreadType === "three" ? "flex-wrap" : ""
          }`}
        >
          {readingState.cards.map(({ card, reversed }, i) => (
            <div key={i} className="flex flex-col items-center gap-3" style={{ animationDelay: `${i * 0.15}s` }}>
              <p className="text-gold/60 text-xs font-cinzel tracking-wider uppercase">
                {spreadPositions[i]}
              </p>
              <Link
                href={`/tarot/${cardSlug(card.name)}`}
                className="relative rounded-xl overflow-hidden shadow-gold block"
                style={{
                  width: readingState.spreadType === "single" ? "9rem" : "7rem",
                  height: readingState.spreadType === "single" ? "15rem" : "11.5rem",
                }}
              >
                <img
                  src={`/images/cards/${card.imageFile}`}
                  alt={card.nameCn}
                  className="w-full h-full object-cover"
                  style={reversed ? { transform: "rotate(180deg)" } : {}}
                />
                {reversed && (
                  <div
                    className="absolute bottom-1 right-1 text-xs px-1.5 py-0.5 rounded-sm"
                    style={{ background: "rgba(220, 60, 60, 0.85)", color: "white", fontSize: "10px" }}
                  >
                    {t.reversed}
                  </div>
                )}
              </Link>
              <div className="text-center">
                <p className="text-gold text-sm font-semibold">
                  <Link href={`/tarot/${cardSlug(card.name)}`} className="hover:underline">
                    {lang === "en" ? card.name : card.nameCn}
                  </Link>
                </p>
                <p className="text-gold/50 text-xs">{lang === "en" ? card.nameCn : card.name}</p>
                <div className="flex flex-wrap justify-center gap-1 mt-1">
                  {lang !== "en" && card.keywords.slice(0, 2).map((kw) => (
                    <span
                      key={kw}
                      className="text-xs px-1.5 py-0.5 rounded-full"
                      style={{
                        background: "rgba(201, 168, 76, 0.12)",
                        color: "rgba(201, 168, 76, 0.7)",
                        border: "1px solid rgba(201, 168, 76, 0.2)",
                        fontSize: "10px",
                      }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mystic-divider" />

        {/* AI 解读内容 */}
        <div className="glass-card rounded-2xl p-6 mb-8 animate-fade-in-up animate-delay-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🔮</span>
            <h3 className="font-cinzel text-gold tracking-wider">{t.readerLabel}</h3>
            {isTyping && (
              <div className="flex gap-1 ml-2">
                <span className="loading-dot w-1.5 h-1.5 bg-gold/60 rounded-full" />
                <span className="loading-dot w-1.5 h-1.5 bg-gold/60 rounded-full" />
                <span className="loading-dot w-1.5 h-1.5 bg-gold/60 rounded-full" />
              </div>
            )}
          </div>
          <div className="text-gold-light/85 leading-relaxed" style={{ fontSize: "1rem", minHeight: "120px" }}>
            {renderMarkdown(displayedText)}
            {isTyping && <span className="inline-block w-0.5 h-4 bg-gold/60 animate-pulse ml-0.5" />}
          </div>
        </div>

        {/* 操作按钮区 */}
        {!isTyping && (
          <div className="space-y-3 animate-fade-in-up">
            <button
              onClick={handleGeneratePoster}
              disabled={isGeneratingPoster}
              className="w-full btn-mystical text-deep-purple py-3 rounded-xl font-cinzel tracking-wider font-semibold flex items-center justify-center gap-2"
              style={{ color: "#0f0a1e" }}
            >
              {isGeneratingPoster ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-deep-purple/30 border-t-deep-purple rounded-full animate-spin" />
                  {t.generating}
                </>
              ) : (
                t.generatePoster
              )}
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onNewReading}
                className="glass-card py-3 rounded-xl text-gold hover:border-gold transition-all font-cinzel tracking-wider text-sm"
              >
                {t.newReading}
              </button>
              <button
                onClick={onRestart}
                className="glass-card py-3 rounded-xl text-gold/70 hover:border-gold/50 transition-all text-sm"
              >
                {t.backHome}
              </button>
            </div>

          </div>
        )}
      </div>

      {/* 海报预览弹窗 */}
      {showPoster && posterDataUrl && (
        <PosterModal t={t} dataUrl={posterDataUrl} onClose={() => setShowPoster(false)} />
      )}
    </div>
  );
}

// ── 分享海报弹窗 ──────────────────────────────────────
function PosterModal({
  t, dataUrl, onClose,
}: {
  t: typeof RT["zh"];
  dataUrl: string;
  onClose: () => void;
}) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = `tarot-reading-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleShare = async () => {
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], "tarot-reading.png", { type: "image/png" });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({ title: t.shareTitle, text: t.shareText, files: [file] });
      } else {
        handleDownload();
      }
    } catch {
      handleDownload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0, 0, 0, 0.85)" }}>
      <div className="modal-content glass-dark rounded-2xl p-6 max-w-sm w-full max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-cinzel text-gold">{t.posterTitle}</h3>
          <button onClick={onClose} className="text-gold/50 hover:text-gold transition-colors">✕</button>
        </div>
        <div className="rounded-xl overflow-hidden mb-4">
          <img src={dataUrl} alt="poster" className="w-full" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleDownload}
            className="btn-mystical py-2.5 rounded-xl font-cinzel text-sm font-semibold"
            style={{ color: "#0f0a1e" }}
          >
            {t.posterSave}
          </button>
          <button
            onClick={handleShare}
            className="glass-card py-2.5 rounded-xl text-gold hover:border-gold transition-all font-cinzel text-sm"
          >
            {t.posterShare}
          </button>
        </div>
      </div>
    </div>
  );
}

// Canvas 圆角矩形辅助函数
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
