"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import "./daily-card.css";
import {
  getDailyCard,
  getTodayString,
  getFileDateString,
  DAILY_CARD_UI,
} from "./daily-card-data";
import type { DailyCard, DailyCardText, DailyCardUI } from "./daily-card-data";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";
import type { Locale } from "~/lib/i18n";

// 生成随机星点
interface Star {
  left: string;
  top: string;
  size: string;
  dur: string;
  minOp: string;
  maxOp: string;
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${0.5 + Math.random() * 2}px`,
    dur: `${2 + Math.random() * 3}s`,
    minOp: `${0.1 + Math.random() * 0.2}`,
    maxOp: `${0.5 + Math.random() * 0.5}`,
  }));
}

const STARS = generateStars(60);

export default function DailyCardPage() {
  const locale = useLocale();
  const ui = DAILY_CARD_UI[locale];

  const [card, setCard] = useState<DailyCard | null>(null);
  const [dateStr, setDateStr] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showPoster, setShowPoster] = useState(false);

  useEffect(() => {
    setCard(getDailyCard());
    setDateStr(getTodayString(locale));
  }, [locale]);

  const handleFlip = useCallback(() => {
    if (isFlipped) return;
    setIsFlipped(true);
    setTimeout(() => setShowActions(true), 600);
  }, [isFlipped]);

  const handleReset = useCallback(() => {
    setIsFlipped(false);
    setShowActions(false);
  }, []);

  if (!card) return null;

  const text = card.text[locale];

  return (
    <div className="dc-page">
      {/* SEO H1 — 视觉隐藏，搜索引擎可读 */}
      <h1 style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
        每日宇宙提示卡 — Daily Cosmic Card
      </h1>
      {/* 返回首页 */}
      <a href="/" style={{
        position: "fixed", top: 16, left: 16, zIndex: 200,
        display: "flex", alignItems: "center", gap: 6,
        padding: "6px 14px", borderRadius: 20,
        background: "rgba(10,6,28,0.75)", backdropFilter: "blur(10px)",
        border: "1px solid rgba(201,168,76,0.25)",
        color: "rgba(201,168,76,0.85)", fontSize: "0.8rem",
        textDecoration: "none", letterSpacing: "0.06em",
        transition: "all 0.18s",
      }}>{ui.back}</a>

      {/* 语言切换 */}
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 200 }}>
        <LangSwitcher />
      </div>


      {/* 动态背景 */}
      <div
        className="dc-bg"
        style={{ background: `linear-gradient(160deg, ${card.bgFrom} 0%, ${card.bgTo} 100%)` }}
      />

      {/* 星点 */}
      <div className="dc-stars">
        {STARS.map((star, i) => (
          <div
            key={i}
            className="dc-star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              ["--dur" as string]: star.dur,
              ["--min-op" as string]: star.minOp,
              ["--max-op" as string]: star.maxOp,
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>

      <div className="dc-content">
        {/* 日期 */}
        <div className="dc-date-area">
          <div className="dc-date-tag">{ui.dateTag}</div>
          <div className="dc-date-text">{dateStr}</div>
        </div>

        {/* 卡片翻转区 */}
        <div
          className={`dc-card-scene ${isFlipped ? "flipped" : ""}`}
          onClick={handleFlip}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleFlip(); }}
          aria-label={ui.cardAria}
        >
          <div className="dc-card-flipper">
            {/* 卡背 */}
            <div className="dc-card-back">
              <div className="dc-card-back-pattern" />
              <div className="dc-card-back-border" />
              <span className="dc-card-back-star">✦</span>
              <span className="dc-card-back-hint">{ui.backHint}</span>
            </div>

            {/* 卡正面 */}
            <div
              className="dc-card-front"
              style={{
                background: `linear-gradient(160deg, ${card.bgFrom} 0%, ${card.bgTo} 100%)`,
                ["--card-glow" as string]: `${card.accentColor}33`,
              }}
            >
              <span className="dc-front-tag">✦ {ui.frontTag} ✦</span>
              <span className="dc-front-emoji">{card.emoji}</span>
              <span className="dc-front-title" style={{ color: card.accentColor }}>
                {text.title}
              </span>
              <p className="dc-front-message">{text.message}</p>
              <div className="dc-front-divider" />
              <p className="dc-front-sub">{text.subMessage}</p>
              <span
                className="dc-front-category"
                style={{ borderColor: card.accentColor + "44", color: card.accentColor + "bb" }}
              >
                #{text.category}
              </span>
            </div>
          </div>
        </div>

        {/* 翻转提示 */}
        <div className={`dc-flip-hint ${isFlipped ? "hidden" : ""}`}>
          <span className="dc-flip-arrow">👆</span>
          <span className="dc-flip-text">{ui.flipHint}</span>
        </div>

        {/* 操作按钮 */}
        <div className={`dc-actions ${showActions ? "show" : ""}`}>
          <button className="dc-share-btn" onClick={() => setShowPoster(true)}>
            {ui.saveCard}
          </button>
          <button className="dc-again-btn" onClick={handleReset}>
            {ui.again}
          </button>
        </div>

        {/* 塔罗牌意入口（内链） */}
        <a
          href="/tarot"
          style={{
            marginTop: 18, display: "inline-block",
            color: "rgba(201,168,76,0.75)", fontSize: "0.82rem",
            letterSpacing: "0.05em", textDecoration: "none",
            borderBottom: "1px solid rgba(201,168,76,0.3)", paddingBottom: 2,
          }}
        >
          {ui.tarotLink}
        </a>
      </div>

      {/* 海报弹窗 */}
      {showPoster && (
        <CardPoster card={card} text={text} ui={ui} locale={locale} dateStr={dateStr} onClose={() => setShowPoster(false)} />
      )}
    </div>
  );
}

// ===== 海报组件 =====
function CardPoster({
  card,
  text,
  ui,
  locale,
  dateStr,
  onClose,
}: {
  card: DailyCard;
  text: DailyCardText;
  ui: DailyCardUI;
  locale: Locale;
  dateStr: string;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 360;
    const H = 640;
    canvas.width = W;
    canvas.height = H;

    // 背景
    const bg = ctx.createLinearGradient(0, 0, W * 0.7, H);
    bg.addColorStop(0, card.bgFrom);
    bg.addColorStop(1, card.bgTo);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // 光晕
    const glow = ctx.createRadialGradient(W / 2, H * 0.35, 0, W / 2, H * 0.35, 200);
    glow.addColorStop(0, card.accentColor + "33");
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // 随机星点
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    for (let i = 0; i < 50; i++) {
      const sx = Math.random() * W;
      const sy = Math.random() * H;
      const sr = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }

    // 边框
    ctx.strokeStyle = "rgba(255,255,255,0.07)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(20, 20, W - 40, H - 40, 16);
    else ctx.rect(20, 20, W - 40, H - 40);
    ctx.stroke();

    // 顶部标签
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.textAlign = "center";
    ctx.fillText(`✦  ${ui.posterTitle}  ✦`, W / 2, 58);

    // 日期
    ctx.font = "11px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fillText(dateStr, W / 2, 78);

    // 分割线
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, 92);
    ctx.lineTo(W - 80, 92);
    ctx.stroke();

    // 主 emoji
    ctx.font = "60px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(card.emoji, W / 2, 200);

    // 卡片标题
    ctx.font = `13px sans-serif`;
    ctx.fillStyle = card.accentColor;
    ctx.fillText(text.title, W / 2, 235);

    // 分割
    ctx.strokeStyle = card.accentColor + "44";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 30, 248);
    ctx.lineTo(W / 2 + 30, 248);
    ctx.stroke();

    // 主文案（分行）
    const isCJK = locale !== "en";
    ctx.font = "bold 20px serif";
    ctx.fillStyle = "#ffffff";
    const maxW = W - 80;
    let lineY = 290;
    lineY = wrapText(ctx, text.message, W / 2, lineY, maxW, 32, isCJK);

    // 副文案（分行）
    ctx.font = "13px serif";
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    let slineY = lineY + 44;
    slineY = wrapText(ctx, text.subMessage, W / 2, slineY, maxW, 22, isCJK);

    // 分类标签
    ctx.font = "10px sans-serif";
    ctx.fillStyle = card.accentColor + "aa";
    ctx.fillText(`#${text.category}`, W / 2, slineY + 32);

    // 底部
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.fillText(ui.posterFooter, W / 2, H - 32);
  }, [card, text, ui, locale, dateStr]);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${ui.fileName}_${getFileDateString(locale)}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="dc-poster-overlay" onClick={onClose}>
      <div className="dc-poster-wrap" onClick={(e) => e.stopPropagation()}>
        <canvas ref={canvasRef} className="dc-poster-canvas" />
        <div className="dc-poster-actions">
          <button className="dc-poster-save" onClick={handleSave}>{ui.posterSave}</button>
          <button className="dc-poster-close" onClick={onClose}>{ui.posterClose}</button>
        </div>
      </div>
    </div>
  );
}

/**
 * 在 canvas 上换行绘制文本，返回最后一行的 y 坐标。
 * CJK 文本逐字断行；西文（英文）按单词（空格）断行，避免把单词切断。
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  content: string,
  x: number,
  startY: number,
  maxW: number,
  lineHeight: number,
  isCJK: boolean,
): number {
  const tokens = isCJK ? Array.from(content) : content.split(" ");
  const sep = isCJK ? "" : " ";
  let line = "";
  let y = startY;
  for (const token of tokens) {
    const test = line ? line + sep + token : token;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, y);
      line = token;
      y += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, y);
  return y;
}
