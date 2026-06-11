"use client";

import React, { useRef, useState } from "react";
import {
  LEVEL_CONFIG,
  POSTER_QUOTES,
  levelLabel,
  resolveLevelKey,
  isYiAdvice,
  type Lang,
} from "../dream-data";
import type { DreamT } from "../dream-i18n";

export interface DreamResultData {
  query: string;
  keywords: string[];
  level: string;
  traditional: { omen: string; advice: string };
  psychology: { coreState: string; realMapping: string; growthTip: string };
  dreamQuote: string;
  primaryTitle: string;
  matchedCount: number;
}

interface DreamResultProps {
  t: DreamT;
  lang: Lang;
  data: DreamResultData;
  onReset: () => void;
}

export default function DreamResult({ t, lang, data, onReset }: DreamResultProps) {
  const [liked, setLiked] = useState<"up" | "down" | null>(null);
  const [showPosterTip, setShowPosterTip] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // data.level 可能是 zh key（mock）或 AI 返回的本地化等级文案；
  // 归一化为 zh key 以取色/图标，展示则用 levelLabel 本地化。
  const levelKey = resolveLevelKey(data.level ?? "平");
  const levelConf = LEVEL_CONFIG[levelKey];
  const levelText = levelLabel(data.level ?? "平", lang);

  // 拆解宜忌建议
  const adviceParts = data.traditional.advice.split(/[。；;]/).filter(Boolean);

  // 生成分享海报
  const handleGeneratePoster = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 750;
    const H = 1100;
    canvas.width = W;
    canvas.height = H;

    // 背景渐变
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#0d0d2b");
    bg.addColorStop(0.5, "#1a0a3d");
    bg.addColorStop(1, "#0d0d2b");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // 星星
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H * 0.7;
      const r = Math.random() * 1.5 + 0.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.6 + 0.2})`;
      ctx.fill();
    }

    // 顶部装饰圆
    const glow = ctx.createRadialGradient(W / 2, 160, 10, W / 2, 160, 120);
    glow.addColorStop(0, "rgba(139, 92, 246, 0.5)");
    glow.addColorStop(1, "rgba(139, 92, 246, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(W / 2, 160, 120, 0, Math.PI * 2);
    ctx.fill();

    // 月亮
    ctx.font = "80px serif";
    ctx.textAlign = "center";
    ctx.fillText("🌙", W / 2, 200);

    // 品牌名
    ctx.font = "bold 32px sans-serif";
    ctx.fillStyle = "rgba(200,180,255,0.9)";
    ctx.fillText(t.posterBrand, W / 2, 260);

    // 梦境内容
    ctx.font = "24px sans-serif";
    ctx.fillStyle = "rgba(180,160,240,0.7)";
    const shortQuery = data.query.length > 20 ? data.query.slice(0, 20) + "..." : data.query;
    ctx.fillText(`「${shortQuery}」`, W / 2, 310);

    // 吉凶标签
    ctx.font = "bold 28px sans-serif";
    ctx.fillStyle = levelConf.color;
    ctx.fillText(`${levelConf.icon} ${levelText}`, W / 2, 370);

    // 分隔线
    ctx.beginPath();
    ctx.moveTo(100, 400);
    ctx.lineTo(W - 100, 400);
    ctx.strokeStyle = "rgba(139, 92, 246, 0.3)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // 传统解梦段
    ctx.font = "bold 22px sans-serif";
    ctx.fillStyle = "#f59e0b";
    ctx.textAlign = "left";
    ctx.fillText(t.posterTrad, 80, 445);

    ctx.font = "20px sans-serif";
    ctx.fillStyle = "rgba(220,200,255,0.85)";
    const omenLines = wrapText(ctx, data.traditional.omen.slice(0, 120), W - 160, 20);
    omenLines.forEach((line, i) => ctx.fillText(line, 80, 480 + i * 30));

    // 心理学段
    const psychY = 480 + omenLines.length * 30 + 50;
    ctx.font = "bold 22px sans-serif";
    ctx.fillStyle = "#818cf8";
    ctx.fillText(t.posterPsych, 80, psychY);

    ctx.font = "20px sans-serif";
    ctx.fillStyle = "rgba(220,200,255,0.85)";
    const psychLines = wrapText(ctx, data.psychology.coreState.slice(0, 100), W - 160, 20);
    psychLines.forEach((line, i) => ctx.fillText(line, 80, psychY + 35 + i * 30));

    // 金言
    const quoteY = psychY + 35 + psychLines.length * 30 + 50;
    ctx.font = "italic bold 26px sans-serif";
    ctx.fillStyle = "rgba(240, 220, 130, 0.9)";
    ctx.textAlign = "center";
    const posterQuote = POSTER_QUOTES[Math.floor(Math.random() * POSTER_QUOTES.length)]!;
    ctx.fillText(`"${posterQuote}"`, W / 2, quoteY);

    // 解梦金言
    const dreamQ = data.dreamQuote.slice(0, 30);
    ctx.font = "22px sans-serif";
    ctx.fillStyle = "rgba(200,180,255,0.7)";
    ctx.fillText(`— ${dreamQ}`, W / 2, quoteY + 45);

    // 底部
    ctx.font = "18px sans-serif";
    ctx.fillStyle = "rgba(160,140,220,0.4)";
    ctx.fillText(t.posterFooter, W / 2, H - 50);

    // 下载
    const link = document.createElement("a");
    link.download = `${t.posterFileName}-${data.query.slice(0, 6)}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    setShowPosterTip(true);
    setTimeout(() => setShowPosterTip(false), 3000);
  };

  return (
    <div className="dream-result-container">
      {/* 隐藏 canvas */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* 顶部：梦境标题 + 吉凶 */}
      <div className="dream-result-header">
        <div className="dream-result-badge-wrap">
          <span
            className="dream-result-level-badge"
            style={{
              color: levelConf.color,
              background: levelConf.bg,
              border: `1px solid ${levelConf.border}`,
            }}
          >
            {levelConf.icon} {levelText}
          </span>
        </div>
        <h1 className="dream-result-title">{data.primaryTitle}</h1>
        <div className="dream-result-keywords">
          {data.keywords.map((kw) => (
            <span key={kw} className="dream-kw-chip">{kw}</span>
          ))}
        </div>
      </div>

      {/* 双轨解析 */}
      <div className="dream-dual-track">
        {/* 传统周公解梦 */}
        <div className="dream-track-card dream-traditional-card">
          <div className="dream-track-header">
            <span className="dream-track-icon">📜</span>
            <div>
              <h2 className="dream-track-title">{t.tradTitle}</h2>
              <p className="dream-track-sub">{t.tradSub}</p>
            </div>
            <span
              className="dream-level-tag"
              style={{ color: levelConf.color, background: levelConf.bg }}
            >
              {levelText}
            </span>
          </div>

          <div className="dream-track-body">
            <p className="dream-omen-text">{data.traditional.omen}</p>

            <div className="dream-advice-box">
              {adviceParts.map((part, i) => {
                const isYi = isYiAdvice(part);
                return (
                  <div key={i} className="dream-advice-item">
                    <span className={isYi ? "dream-yi" : "dream-ji"}>
                      {isYi ? t.yi : t.ji}
                    </span>
                    <span className="dream-advice-text">
                      {part.replace(/^\s*(?:[宜忌]：?|(?:do|don['’]?t)\s*[:：]?)/i, "").trim()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 潜意识心理解析 */}
        <div className="dream-track-card dream-psychology-card">
          <div className="dream-track-header">
            <span className="dream-track-icon">🧠</span>
            <div>
              <h2 className="dream-track-title">{t.psychTitle}</h2>
              <p className="dream-track-sub">{t.psychSub}</p>
            </div>
          </div>

          <div className="dream-track-body">
            <div className="dream-psych-section">
              <div className="dream-psych-label">
                <span className="dream-psych-dot dream-dot-purple" />
                {t.psychCore}
              </div>
              <p className="dream-psych-text">{data.psychology.coreState}</p>
            </div>

            <div className="dream-psych-section">
              <div className="dream-psych-label">
                <span className="dream-psych-dot dream-dot-blue" />
                {t.psychMap}
              </div>
              <p className="dream-psych-text">{data.psychology.realMapping}</p>
            </div>

            <div className="dream-psych-section">
              <div className="dream-psych-label">
                <span className="dream-psych-dot dream-dot-teal" />
                {t.psychGrow}
              </div>
              <p className="dream-psych-text">{data.psychology.growthTip}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 解梦金言 */}
      <div className="dream-quote-card">
        <div className="dream-quote-deco">✦</div>
        <p className="dream-quote-text">"{data.dreamQuote}"</p>
        <div className="dream-quote-deco">✦</div>
      </div>

      {/* 互动区 */}
      <div className="dream-interaction">
        <p className="dream-interaction-label">{t.feedbackQ}</p>
        <div className="dream-like-btns">
          <button
            className={`dream-like-btn ${liked === "up" ? "dream-liked" : ""}`}
            onClick={() => setLiked(liked === "up" ? null : "up")}
          >
            {t.likeUp}
          </button>
          <button
            className={`dream-like-btn ${liked === "down" ? "dream-disliked" : ""}`}
            onClick={() => setLiked(liked === "down" ? null : "down")}
          >
            {t.likeDown}
          </button>
        </div>
        {liked === "up" && (
          <p className="dream-feedback-msg dream-fb-good">{t.fbGood}</p>
        )}
        {liked === "down" && (
          <p className="dream-feedback-msg dream-fb-bad">{t.fbBad}</p>
        )}
      </div>

      {/* 操作按钮 */}
      <div className="dream-action-btns">
        <button className="dream-poster-btn" onClick={handleGeneratePoster}>
          {t.posterBtn}
        </button>
        <button className="dream-reset-btn" onClick={onReset}>
          {t.resetBtn}
        </button>
      </div>

      {showPosterTip && (
        <div className="dream-poster-tip">{t.posterTip}</div>
      )}
    </div>
  );
}

// 文字换行辅助函数
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  _lineHeight: number,
): string[] {
  const lines: string[] = [];
  let currentLine = "";
  for (const char of text) {
    const testLine = currentLine + char;
    if (ctx.measureText(testLine).width > maxWidth && currentLine.length > 0) {
      lines.push(currentLine);
      currentLine = char;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}
