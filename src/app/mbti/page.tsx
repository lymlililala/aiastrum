"use client";

import { useState, useRef, useEffect } from "react";
import "./mbti.css";
import {
  MBTI_TYPES,
  ZODIAC_SIGNS,
  getMBTIZodiacProfile,
} from "./mbti-data";
import type { MBTIType, ZodiacSign, MBTIZodiacProfile } from "./mbti-data";

type Phase = "select" | "result";

export default function MBTIPage() {
  const [phase, setPhase] = useState<Phase>("select");
  const [selectedMBTI, setSelectedMBTI] = useState<MBTIType | null>(null);
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacSign | null>(null);
  const [profile, setProfile] = useState<MBTIZodiacProfile | null>(null);
  const [showPoster, setShowPoster] = useState(false);

  const handleGenerate = () => {
    if (!selectedMBTI || !selectedZodiac) return;
    const p = getMBTIZodiacProfile(selectedMBTI, selectedZodiac);
    setProfile(p);
    setPhase("result");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  const handleReset = () => {
    setPhase("select");
    setProfile(null);
  };

  return (
    <div className="mbti-page">
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

      <div className="mbti-hero">
        <div className="mbti-hero-bg" />
        <div className="mbti-hero-tag">
          MBTI × Zodiac
          <span className="mbti-trending">🔥 流行</span>
        </div>
        <h1 className="mbti-hero-title">星球碰撞</h1>
        <p className="mbti-hero-sub">当 MBTI 遇上星座，你是什么宇宙限定款？</p>
      </div>

      <div className="mbti-content">
        {phase === "select" && (
          <SelectPhase
            selectedMBTI={selectedMBTI}
            selectedZodiac={selectedZodiac}
            onSelectMBTI={setSelectedMBTI}
            onSelectZodiac={setSelectedZodiac}
            onGenerate={handleGenerate}
          />
        )}

        {phase === "result" && profile && selectedMBTI && selectedZodiac && (
          <>
            <ResultPhase
              profile={profile}
              mbti={selectedMBTI}
              zodiac={selectedZodiac}
              onReset={handleReset}
              onShowPoster={() => setShowPoster(true)}
            />
          </>
        )}
      </div>

      {showPoster && profile && selectedMBTI && selectedZodiac && (
        <PosterOverlay
          profile={profile}
          mbti={selectedMBTI}
          zodiac={selectedZodiac}
          onClose={() => setShowPoster(false)}
        />
      )}
    </div>
  );
}

// ===== 选择阶段 =====
function SelectPhase({
  selectedMBTI,
  selectedZodiac,
  onSelectMBTI,
  onSelectZodiac,
  onGenerate,
}: {
  selectedMBTI: MBTIType | null;
  selectedZodiac: ZodiacSign | null;
  onSelectMBTI: (m: MBTIType) => void;
  onSelectZodiac: (z: ZodiacSign) => void;
  onGenerate: () => void;
}) {
  return (
    <div className="mbti-select-card mbti-fade-in">
      <p className="mbti-select-title">✨ 选择你的 MBTI 和星座，解锁专属档案</p>

      {/* MBTI 选择 */}
      <div className="mbti-select-group">
        <span className="mbti-select-label">① 你的 MBTI 人格类型</span>
        <div className="mbti-type-grid">
          {MBTI_TYPES.map((type) => (
            <button
              key={type}
              className={`mbti-type-btn ${selectedMBTI === type ? "selected" : ""}`}
              onClick={() => onSelectMBTI(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 星座选择 */}
      <div className="mbti-select-group">
        <span className="mbti-select-label">② 你的星座</span>
        <div className="mbti-zodiac-grid">
          {ZODIAC_SIGNS.map((zodiac) => (
            <button
              key={zodiac}
              className={`mbti-zodiac-btn ${selectedZodiac === zodiac ? "selected" : ""}`}
              onClick={() => onSelectZodiac(zodiac)}
            >
              {zodiac}
            </button>
          ))}
        </div>
      </div>

      <button
        className="mbti-generate-btn"
        onClick={onGenerate}
        disabled={!selectedMBTI || !selectedZodiac}
      >
        🪐 解锁我的宇宙档案
      </button>
    </div>
  );
}

// ===== 结果阶段 =====
function ResultPhase({
  profile,
  mbti,
  zodiac,
  onReset,
  onShowPoster,
}: {
  profile: MBTIZodiacProfile;
  mbti: MBTIType;
  zodiac: ZodiacSign;
  onReset: () => void;
  onShowPoster: () => void;
}) {
  return (
    <div className="mbti-result mbti-fade-in">
      {/* 主档案卡 */}
      <div
        className="mbti-profile-card"
        style={{ background: `linear-gradient(135deg, ${profile.gradient.from}, ${profile.gradient.to})` }}
      >
        <div
          className="mbti-profile-glow"
          style={{
            background: `radial-gradient(ellipse at 30% 30%, ${profile.color}22 0%, transparent 60%)`,
          }}
        />
        <span className="mbti-combo-label">{mbti} × {zodiac}</span>
        <span className="mbti-profile-icon">{profile.icon}</span>
        <div className="mbti-profile-title">{profile.title}</div>
        <div className="mbti-tagline">&ldquo;{profile.tagline}&rdquo;</div>
        <p className="mbti-summary">{profile.summary}</p>
      </div>

      {/* 特质网格 */}
      <div className="mbti-traits-card">
        <div className="mbti-card-title">⚡ 人格特质解析</div>
        <div className="mbti-traits-grid">
          <div className="mbti-trait-item">
            <div className="mbti-trait-label">✨ 超能力</div>
            <div className="mbti-trait-value">{profile.superpower}</div>
          </div>
          <div className="mbti-trait-item">
            <div className="mbti-trait-label">💀 致命弱点</div>
            <div className="mbti-trait-value">{profile.weakness}</div>
          </div>
          <div className="mbti-trait-item">
            <div className="mbti-trait-label">💼 事业方向</div>
            <div className="mbti-trait-value">{profile.career}</div>
          </div>
          <div className="mbti-trait-item">
            <div className="mbti-trait-label">💕 爱情模式</div>
            <div className="mbti-trait-value">{profile.love.slice(0, 40)}…</div>
          </div>
          <div className="mbti-trait-item">
            <div className="mbti-trait-label">🤝 友情风格</div>
            <div className="mbti-trait-value">{profile.friendStyle}</div>
          </div>
          <div className="mbti-trait-item">
            <div className="mbti-trait-label">🌌 人生气场</div>
            <div className="mbti-trait-value">{profile.lifeVibe}</div>
          </div>
        </div>
      </div>

      {/* 内心 OS */}
      <div className="mbti-mood-card">
        <div className="mbti-card-title">🧠 今日内心 OS</div>
        <p className="mbti-mood-text">&ldquo;{profile.dailyMood}&rdquo;</p>
      </div>

      {/* 危险模式 */}
      <div className="mbti-danger-card">
        <div className="mbti-card-title">⚠️ 危险模式解锁条件</div>
        <p className="mbti-danger-text">{profile.dangerMode}</p>
      </div>

      {/* 最配 & 名人 */}
      <div className="mbti-compat-card">
        <div className="mbti-compat-item">
          <div className="mbti-compat-label">💞 最配类型</div>
          <div className="mbti-compat-value">{profile.compatibleWith}</div>
        </div>
        <div className="mbti-compat-divider" />
        <div className="mbti-compat-item">
          <div className="mbti-compat-label">🌟 同类代表人物</div>
          <div className="mbti-compat-value" style={{ fontSize: "0.85rem" }}>
            {profile.celebs.join(" / ")}
          </div>
        </div>
      </div>

      {/* 操作 */}
      <div className="mbti-actions">
        <button className="mbti-poster-btn" onClick={onShowPoster}>
          📸 生成专属宇宙海报
        </button>
        <button className="mbti-reset-btn" onClick={onReset}>
          ↺ 换一个组合
        </button>
      </div>
    </div>
  );
}

// ===== 海报弹窗 =====
function PosterOverlay({
  profile,
  mbti,
  zodiac,
  onClose,
}: {
  profile: MBTIZodiacProfile;
  mbti: MBTIType;
  zodiac: ZodiacSign;
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

    // 背景渐变
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, profile.gradient.from);
    bg.addColorStop(1, profile.gradient.to);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // 光晕
    const glow = ctx.createRadialGradient(W / 2, 80, 0, W / 2, 80, 200);
    glow.addColorStop(0, profile.color + "33");
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // 星点装饰
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    for (let i = 0; i < 40; i++) {
      const sx = Math.random() * W;
      const sy = Math.random() * H;
      const sr = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }

    // 组合标签
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.textAlign = "center";
    ctx.fillText(`${mbti} × ${zodiac}`, W / 2, 48);

    // 图标
    ctx.font = "40px sans-serif";
    ctx.fillText(profile.icon, W / 2, 100);

    // 标题
    ctx.font = "bold 32px serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(profile.title, W / 2, 148);

    // 彩色分割线
    ctx.strokeStyle = profile.color + "66";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(60, 164);
    ctx.lineTo(W - 60, 164);
    ctx.stroke();

    // 标语（分行处理）
    ctx.font = "13px serif";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    const tagline = profile.tagline;
    const maxWidth = W - 80;
    let line = "";
    let lineY = 190;
    for (const char of tagline) {
      const testLine = line + char;
      if (ctx.measureText(testLine).width > maxWidth) {
        ctx.fillText(line, W / 2, lineY);
        line = char;
        lineY += 22;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, W / 2, lineY);

    // 特质区域
    const traitY = lineY + 32;
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(24, traitY, W - 48, 130, 12);
    } else {
      ctx.rect(24, traitY, W - 48, 130);
    }
    ctx.fill();

    ctx.font = "10px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.fillText("✨ 超能力", W / 2 - 80, traitY + 24);
    ctx.fillText("⚠️ 弱点", W / 2 + 80, traitY + 24);
    ctx.fillText("💕 爱情", W / 2 - 80, traitY + 72);
    ctx.fillText("💼 事业", W / 2 + 80, traitY + 72);

    ctx.font = "bold 11px serif";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    const sp = profile.superpower.slice(0, 14);
    const wk = profile.weakness.slice(0, 14);
    ctx.fillText(sp, W / 2 - 80, traitY + 42);
    ctx.fillText(wk, W / 2 + 80, traitY + 42);
    ctx.font = "10px serif";
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.fillText(profile.love.slice(0, 16), W / 2 - 80, traitY + 90);
    ctx.fillText(profile.career.slice(0, 10), W / 2 + 80, traitY + 90);

    // 内心OS
    const osY = traitY + 152;
    ctx.font = "italic 13px serif";
    ctx.fillStyle = profile.color;
    const osText = `"${profile.dailyMood.slice(0, 30)}…"`;
    ctx.fillText(osText, W / 2, osY);

    // 最配
    const compatY = osY + 32;
    ctx.font = "11px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.fillText(`最配类型：${profile.compatibleWith}`, W / 2, compatY);

    // 底部
    ctx.font = "11px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.fillText("命运密语 · MBTI星球碰撞", W / 2, H - 24);
  }, [profile, mbti, zodiac]);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `MBTI星球碰撞_${mbti}x${zodiac}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="mbti-poster-overlay" onClick={onClose}>
      <div className="mbti-poster-wrap" onClick={(e) => e.stopPropagation()}>
        <canvas ref={canvasRef} className="mbti-poster-canvas" />
        <div className="mbti-poster-actions">
          <button className="mbti-poster-save" onClick={handleSave}>
            📥 保存海报
          </button>
          <button className="mbti-poster-close" onClick={onClose}>
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
