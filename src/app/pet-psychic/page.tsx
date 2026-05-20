"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import "./pet-psychic.css";
import {
  PET_TYPES,
  PET_TYPE_EMOJIS,
  buildPetPsychicResult,
} from "./pet-psychic-data";
import type { PetType, PetPsychicResult } from "./pet-psychic-data";

type Phase = "input" | "loading" | "result";

export default function PetPsychicPage() {
  const [phase, setPhase] = useState<Phase>("input");
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState<PetType | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [result, setResult] = useState<PetPsychicResult | null>(null);
  const [showPoster, setShowPoster] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoUrl(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSubmit = () => {
    // 名字和照片至少填一个，宠物类型必须选
    if ((!petName.trim() && !photoUrl) || !petType) return;
    setPhase("loading");
    setTimeout(() => {
      const r = buildPetPsychicResult(petName.trim() || "我的宝贝", petType);
      setResult(r);
      setPhase("result");
    }, 2200);
  };

  const handleReset = () => {
    setPhase("input");
    setResult(null);
    setPhotoUrl(null);
  };

  return (
    <div className="pet-page">
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

      <div className="pet-hero">
        <div className="pet-hero-bg" />
        <div className="pet-hero-tag">Pet Psychic · 宠物灵语</div>
        <h1 className="pet-hero-title">听懂TA的心声</h1>
        <p className="pet-hero-sub">上传宠物照片，抽一张塔罗牌，解读TA今天的内心世界</p>
      </div>

      <div className="pet-content">
        {phase === "input" && (
          <div className="pet-input-card pet-fade-in">
            <p className="pet-input-title">🐾 告诉我你的宝贝是谁</p>

            {/* 照片上传 */}
            <div className="pet-photo-area" onClick={() => fileInputRef.current?.click()}>
              <div className="pet-photo-circle">
                {photoUrl ? (
                  <img src={photoUrl} alt="宠物照片" className="pet-photo-preview" />
                ) : (
                  <>
                    <span className="pet-photo-emoji">📷</span>
                    <span className="pet-photo-hint">点击上传<br />宠物照片</span>
                  </>
                )}
              </div>
              {photoUrl && (
                <button
                  className="pet-photo-change"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                >
                  ✎
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="pet-photo-input"
                onChange={handlePhotoChange}
              />
            </div>

            {/* 宠物名字 */}
            <div className="pet-field">
              <label className="pet-label">宠物的名字 <span style={{fontSize:"0.75rem",opacity:0.55,fontWeight:400}}>（与照片二选一）</span></label>
              <input
                className="pet-input"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="例如：橘子、团子、小白..."
                maxLength={10}
              />
            </div>

            {/* 宠物类型 */}
            <div className="pet-field">
              <label className="pet-label">TA 是一只…</label>
              <div className="pet-type-grid">
                {PET_TYPES.map((type) => (
                  <button
                    key={type}
                    className={`pet-type-btn ${petType === type ? "selected" : ""}`}
                    onClick={() => setPetType(type)}
                  >
                    {PET_TYPE_EMOJIS[type]} {type}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="pet-submit-btn"
              onClick={handleSubmit}
              disabled={(!petName.trim() && !photoUrl) || !petType}
            >
              🔮 聆听TA的心声
            </button>
          </div>
        )}

        {phase === "loading" && (
          <div className="pet-loading pet-fade-in">
            <span className="pet-loading-paw">🐾</span>
            <p className="pet-loading-text">正在与{petName.trim() || "TA"}的灵魂建立连接…</p>
            <p style={{ fontSize: "0.78rem", color: "rgba(100,200,130,0.35)" }}>
              塔罗牌正在翻动，心声即将传达
            </p>
          </div>
        )}

        {phase === "result" && result && (
          <PetResult
            result={result}
            photoUrl={photoUrl}
            onReset={handleReset}
            onShowPoster={() => setShowPoster(true)}
          />
        )}
      </div>

      {showPoster && result && (
        <PetPoster
          result={result}
          photoUrl={photoUrl}
          onClose={() => setShowPoster(false)}
        />
      )}
    </div>
  );
}

// ===== 结果组件 =====
function PetResult({
  result,
  photoUrl,
  onReset,
  onShowPoster,
}: {
  result: PetPsychicResult;
  photoUrl: string | null;
  onReset: () => void;
  onShowPoster: () => void;
}) {
  const { card } = result;

  return (
    <div className="pet-result pet-fade-in">
      {/* 宠物心声卡 */}
      <div className="pet-voice-card">
        <div className="pet-voice-header">
          <div className="pet-avatar">
            {photoUrl ? (
              <img src={photoUrl} alt={result.petName} />
            ) : (
              PET_TYPE_EMOJIS[result.petType]
            )}
          </div>
          <div className="pet-voice-info">
            <div className="pet-name-line">
              {result.petName}
              <span className="pet-type-badge">{result.petType}</span>
            </div>
            <div className="pet-card-name">今日抽到：{card.name} {card.emoji}</div>
          </div>
          <span className="pet-card-emoji">{card.emoji}</span>
        </div>

        {/* 气泡 */}
        <div className="pet-speech-bubble">
          <div className="pet-bubble-arrow" />
          <p className="pet-voice-text">&ldquo;{card.petVoice}&rdquo;</p>
          <span
            className="pet-mood-label"
            style={{ borderColor: card.moodColor + "44", color: card.moodColor }}
          >
            {card.petMood}
          </span>
        </div>
      </div>

      {/* 状态指数 */}
      <div className="pet-status-card">
        <div className="pet-card-title">📊 今日状态指数</div>
        <div className="pet-status-grid">
          {[
            { label: "❤️ 爱主人", val: result.loveLevel, color: "#E91E8C" },
            { label: "😺 今日心情", val: result.moodLevel, color: "#5dc885" },
            { label: "🍖 饥饿感", val: result.hungerLevel, color: "#C9A84C" },
          ].map(({ label, val, color }) => (
            <div className="pet-status-item" key={label}>
              <span className="pet-status-label">{label}</span>
              <div className="pet-status-bar-wrap">
                <div
                  className="pet-status-bar"
                  style={{ width: `${val}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }}
                />
              </div>
              <span className="pet-status-val">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 今日计划 */}
      <div className="pet-plan-card">
        <div className="pet-card-title">📅 {result.petName} 的今日计划</div>
        <p className="pet-plan-text">{result.todayPlan}</p>
      </div>

      {/* 秘密心愿 */}
      <div className="pet-secret-card">
        <div className="pet-card-title">🌟 TA的小秘密</div>
        <p className="pet-secret-text">&ldquo;{result.secretDesire}&rdquo;</p>
      </div>

      {/* 主人贴士 */}
      <div className="pet-tip-card">
        <div className="pet-card-title">💡 主人小贴士</div>
        <p className="pet-tip-text">{card.petTip}</p>
      </div>

      {/* 操作 */}
      <div className="pet-actions">
        <button className="pet-poster-btn" onClick={onShowPoster}>
          🎴 生成宠物心声卡
        </button>
        <button className="pet-reset-btn" onClick={onReset}>
          ↺ 重新占卜
        </button>
      </div>
    </div>
  );
}

// ===== 海报组件 =====
function PetPoster({
  result,
  photoUrl,
  onClose,
}: {
  result: PetPsychicResult;
  photoUrl: string | null;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 360;
    const H = 560;
    canvas.width = W;
    canvas.height = H;

    const drawContent = () => {
      // 背景
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#0a1a0a");
      bg.addColorStop(1, "#0d2010");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // 光晕
      const glow = ctx.createRadialGradient(W / 2, 80, 0, W / 2, 80, 180);
      glow.addColorStop(0, "rgba(80,200,120,0.12)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // 标题
      ctx.font = "12px sans-serif";
      ctx.fillStyle = "rgba(100,220,140,0.55)";
      ctx.textAlign = "center";
      ctx.fillText("🐾  宠物灵语  🐾", W / 2, 38);

      // 宠物名字
      ctx.font = "bold 24px serif";
      ctx.fillStyle = "#a8f0c0";
      ctx.fillText(result.petName, W / 2, 72);

      // 类型标签
      ctx.font = "11px sans-serif";
      ctx.fillStyle = "rgba(100,200,130,0.5)";
      ctx.fillText(`${PET_TYPE_EMOJIS[result.petType]} ${result.petType}`, W / 2, 90);

      // 圆形照片或 emoji
      ctx.save();
      ctx.beginPath();
      ctx.arc(W / 2, 160, 60, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(30,60,35,0.6)";
      ctx.fill();
      ctx.strokeStyle = "rgba(80,180,100,0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.clip();
      if (photoUrl) {
        const img = new window.Image();
        img.onload = () => {
          ctx.drawImage(img, W / 2 - 60, 100, 120, 120);
          ctx.restore();
          drawAfterPhoto(ctx, W, H, result);
        };
        img.src = photoUrl;
      } else {
        ctx.font = "52px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(PET_TYPE_EMOJIS[result.petType], W / 2, 174);
        ctx.restore();
        drawAfterPhoto(ctx, W, H, result);
      }
    };

    drawContent();
  }, [result, photoUrl]);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${result.petName}的心声卡.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="pet-poster-overlay" onClick={onClose}>
      <div className="pet-poster-wrap" onClick={(e) => e.stopPropagation()}>
        <canvas ref={canvasRef} className="pet-poster-canvas" />
        <div className="pet-poster-actions">
          <button className="pet-poster-save" onClick={handleSave}>📥 保存心声卡</button>
          <button className="pet-poster-close" onClick={onClose}>关闭</button>
        </div>
      </div>
    </div>
  );
}

function drawAfterPhoto(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  result: PetPsychicResult,
) {
  const { card } = result;

  // 卡牌名
  ctx.textAlign = "center";
  ctx.font = "13px sans-serif";
  ctx.fillStyle = card.moodColor;
  ctx.fillText(`${card.emoji} ${card.name}`, W / 2, 250);

  // 心声文字框
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(24, 268, W - 48, 120, 12);
  else ctx.rect(24, 268, W - 48, 120);
  ctx.fill();
  ctx.strokeStyle = "rgba(80,180,100,0.18)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.font = "italic 13px serif";
  ctx.fillStyle = "rgba(200,240,210,0.85)";
  const text = card.petVoice;
  const maxWidth = W - 80;
  let line = "";
  let lineY = 296;
  for (const char of text) {
    const testLine = line + char;
    if (ctx.measureText(testLine).width > maxWidth) {
      ctx.fillText(line, W / 2, lineY);
      line = char;
      lineY += 22;
      if (lineY > 368) { ctx.fillText(line + "…", W / 2, lineY); break; }
    } else {
      line = testLine;
    }
  }
  if (lineY <= 368) ctx.fillText(line, W / 2, lineY);

  // 状态条
  const barY = 412;
  ctx.font = "10px sans-serif";
  ctx.fillStyle = "rgba(100,200,130,0.5)";
  ctx.fillText(`❤️ 爱主人 ${result.loveLevel}  😺 心情 ${result.moodLevel}  🍖 饥饿 ${result.hungerLevel}`, W / 2, barY);

  // 底部
  ctx.font = "11px sans-serif";
  ctx.fillStyle = "rgba(100,200,130,0.25)";
  ctx.fillText("命运密语 · 宠物灵语", W / 2, H - 24);
}
