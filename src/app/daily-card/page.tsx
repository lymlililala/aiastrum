"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import "./daily-card.css";
import { getDailyCard, getTodayString } from "./daily-card-data";
import type { DailyCard } from "./daily-card-data";

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
  const [card, setCard] = useState<DailyCard | null>(null);
  const [dateStr, setDateStr] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showPoster, setShowPoster] = useState(false);

  useEffect(() => {
    setCard(getDailyCard());
    setDateStr(getTodayString());
  }, []);

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
      }}>← 返回</a>

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
          <div className="dc-date-tag">Daily Cosmic Card</div>
          <div className="dc-date-text">{dateStr}</div>
        </div>

        {/* 卡片翻转区 */}
        <div
          className={`dc-card-scene ${isFlipped ? "flipped" : ""}`}
          onClick={handleFlip}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleFlip(); }}
          aria-label="点击翻开今日宇宙提示卡"
        >
          <div className="dc-card-flipper">
            {/* 卡背 */}
            <div className="dc-card-back">
              <div className="dc-card-back-pattern" />
              <div className="dc-card-back-border" />
              <span className="dc-card-back-star">✦</span>
              <span className="dc-card-back-hint">点击翻开今日提示</span>
            </div>

            {/* 卡正面 */}
            <div
              className="dc-card-front"
              style={{
                background: `linear-gradient(160deg, ${card.bgFrom} 0%, ${card.bgTo} 100%)`,
                ["--card-glow" as string]: `${card.accentColor}33`,
              }}
            >
              <span className="dc-front-tag">✦ 今日宇宙提示 ✦</span>
              <span className="dc-front-emoji">{card.emoji}</span>
              <span className="dc-front-title" style={{ color: card.accentColor }}>
                {card.title}
              </span>
              <p className="dc-front-message">{card.message}</p>
              <div className="dc-front-divider" />
              <p className="dc-front-sub">{card.subMessage}</p>
              <span
                className="dc-front-category"
                style={{ borderColor: card.accentColor + "44", color: card.accentColor + "bb" }}
              >
                #{card.category}
              </span>
            </div>
          </div>
        </div>

        {/* 翻转提示 */}
        <div className={`dc-flip-hint ${isFlipped ? "hidden" : ""}`}>
          <span className="dc-flip-arrow">👆</span>
          <span className="dc-flip-text">轻触卡牌，聆听宇宙的声音</span>
        </div>

        {/* 操作按钮 */}
        <div className={`dc-actions ${showActions ? "show" : ""}`}>
          <button className="dc-share-btn" onClick={() => setShowPoster(true)}>
            📸 保存今日宇宙卡片
          </button>
          <button className="dc-again-btn" onClick={handleReset}>
            ↺ 再看一眼卡背
          </button>
        </div>
      </div>

      {/* 海报弹窗 */}
      {showPoster && (
        <CardPoster card={card} dateStr={dateStr} onClose={() => setShowPoster(false)} />
      )}
    </div>
  );
}

// ===== 海报组件 =====
function CardPoster({
  card,
  dateStr,
  onClose,
}: {
  card: DailyCard;
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
    ctx.fillText("✦  每日宇宙提示卡  ✦", W / 2, 58);

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
    ctx.fillText(card.title, W / 2, 235);

    // 分割
    ctx.strokeStyle = card.accentColor + "44";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 30, 248);
    ctx.lineTo(W / 2 + 30, 248);
    ctx.stroke();

    // 主文案（分行）
    ctx.font = "bold 20px serif";
    ctx.fillStyle = "#ffffff";
    const mainText = card.message;
    const maxW = W - 80;
    let line = "";
    let lineY = 290;
    for (const char of mainText) {
      const test = line + char;
      if (ctx.measureText(test).width > maxW) {
        ctx.fillText(line, W / 2, lineY);
        line = char;
        lineY += 32;
      } else {
        line = test;
      }
    }
    ctx.fillText(line, W / 2, lineY);

    // 副文案（分行）
    ctx.font = "13px serif";
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    const subText = card.subMessage;
    let sline = "";
    let slineY = lineY + 44;
    for (const char of subText) {
      const test = sline + char;
      if (ctx.measureText(test).width > maxW) {
        ctx.fillText(sline, W / 2, slineY);
        sline = char;
        slineY += 22;
      } else {
        sline = test;
      }
    }
    ctx.fillText(sline, W / 2, slineY);

    // 分类标签
    ctx.font = "10px sans-serif";
    ctx.fillStyle = card.accentColor + "aa";
    ctx.fillText(`#${card.category}`, W / 2, slineY + 32);

    // 底部
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.fillText("命运密语 · 每日宇宙提示", W / 2, H - 32);
  }, [card, dateStr]);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `今日宇宙提示卡_${new Date().toLocaleDateString("zh-CN").replace(/\//g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="dc-poster-overlay" onClick={onClose}>
      <div className="dc-poster-wrap" onClick={(e) => e.stopPropagation()}>
        <canvas ref={canvasRef} className="dc-poster-canvas" />
        <div className="dc-poster-actions">
          <button className="dc-poster-save" onClick={handleSave}>📥 保存卡片</button>
          <button className="dc-poster-close" onClick={onClose}>关闭</button>
        </div>
      </div>
    </div>
  );
}
