"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import "./pet-psychic.css";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";
import {
  PET_TYPES,
  PET_TYPE_EMOJIS,
  PET_PSYCHIC_CONTENT,
  buildPetPsychicResult,
} from "./pet-psychic-data";
import type { PetType, PetPsychicResult } from "./pet-psychic-data";

// ── 三语文案（仅 UI 外壳；宠物心声内容暂未翻译，保持中文）────────
const T = {
  zh: {
    back: "← 返回",
    heroTag: "Pet Psychic · 宠物灵语",
    heroTitle: "听懂TA的心声",
    heroSub: "上传宠物照片，抽一张塔罗牌，解读TA今天的内心世界",
    inputTitle: "🐾 告诉我你的宝贝是谁",
    photoAlt: "宠物照片",
    photoHintL1: "点击上传",
    photoHintL2: "宠物照片",
    nameLabel: "宠物的名字",
    nameLabelHint: "（与照片二选一）",
    namePlaceholder: "例如：橘子、团子、小白...",
    typeLabel: "TA 是一只…",
    submitBtn: "🔮 聆听TA的心声",
    defaultName: "我的宝贝",
    loadingTa: "TA",
    loadingPre: "正在与",
    loadingPost: "的灵魂建立连接…",
    loadingSub: "塔罗牌正在翻动，心声即将传达",
    cardDrawn: "今日抽到：",
    statusTitle: "📊 今日状态指数",
    statusLove: "❤️ 爱主人",
    statusMood: "😺 今日心情",
    statusHunger: "🍖 饥饿感",
    planTitleSuffix: "的今日计划",
    secretTitle: "🌟 TA的小秘密",
    tipTitle: "💡 主人小贴士",
    posterBtn: "🎴 生成宠物心声卡",
    resetBtn: "↺ 重新占卜",
    posterSave: "📥 保存心声卡",
    posterClose: "关闭",
    posterTitle: "🐾  宠物灵语  🐾",
    posterLove: "❤️ 爱主人",
    posterMood: "😺 心情",
    posterHunger: "🍖 饥饿",
    posterFooter: "命运密语 · 宠物灵语",
    posterFileSuffix: "的心声卡",
    typeLabels: { 猫咪: "猫咪", 狗狗: "狗狗", 兔子: "兔子", 鸟类: "鸟类", 仓鼠: "仓鼠", 其他: "其他" } as Record<PetType, string>,
  },
  tw: {
    back: "← 返回",
    heroTag: "Pet Psychic · 寵物靈語",
    heroTitle: "聽懂TA的心聲",
    heroSub: "上傳寵物照片，抽一張塔羅牌，解讀TA今天的內心世界",
    inputTitle: "🐾 告訴我你的寶貝是誰",
    photoAlt: "寵物照片",
    photoHintL1: "點擊上傳",
    photoHintL2: "寵物照片",
    nameLabel: "寵物的名字",
    nameLabelHint: "（與照片二選一）",
    namePlaceholder: "例如：橘子、糰子、小白...",
    typeLabel: "TA 是一隻…",
    submitBtn: "🔮 聆聽TA的心聲",
    defaultName: "我的寶貝",
    loadingTa: "TA",
    loadingPre: "正在與",
    loadingPost: "的靈魂建立連結…",
    loadingSub: "塔羅牌正在翻動，心聲即將傳達",
    cardDrawn: "今日抽到：",
    statusTitle: "📊 今日狀態指數",
    statusLove: "❤️ 愛主人",
    statusMood: "😺 今日心情",
    statusHunger: "🍖 飢餓感",
    planTitleSuffix: "的今日計畫",
    secretTitle: "🌟 TA的小秘密",
    tipTitle: "💡 主人小貼士",
    posterBtn: "🎴 生成寵物心聲卡",
    resetBtn: "↺ 重新占卜",
    posterSave: "📥 儲存心聲卡",
    posterClose: "關閉",
    posterTitle: "🐾  寵物靈語  🐾",
    posterLove: "❤️ 愛主人",
    posterMood: "😺 心情",
    posterHunger: "🍖 飢餓",
    posterFooter: "命運密語 · 寵物靈語",
    posterFileSuffix: "的心聲卡",
    typeLabels: { 猫咪: "貓咪", 狗狗: "狗狗", 兔子: "兔子", 鸟类: "鳥類", 仓鼠: "倉鼠", 其他: "其他" } as Record<PetType, string>,
  },
  en: {
    back: "← Back",
    heroTag: "Pet Psychic",
    heroTitle: "Hear what they're thinking",
    heroSub: "Upload a photo of your pet, draw a tarot card, and read what's on their mind today",
    inputTitle: "🐾 Tell me about your little one",
    photoAlt: "Pet photo",
    photoHintL1: "Tap to upload",
    photoHintL2: "a pet photo",
    nameLabel: "Pet's name",
    nameLabelHint: "(name or photo, either works)",
    namePlaceholder: "e.g. Mango, Mochi, Snowy...",
    typeLabel: "They are a…",
    submitBtn: "🔮 Listen to their heart",
    defaultName: "My darling",
    loadingTa: "them",
    loadingPre: "Connecting with ",
    loadingPost: "'s soul…",
    loadingSub: "The tarot cards are turning; their message is on its way",
    cardDrawn: "Today's card: ",
    statusTitle: "📊 Today's stats",
    statusLove: "❤️ Loves you",
    statusMood: "😺 Mood today",
    statusHunger: "🍖 Hunger",
    planTitleSuffix: "'s plan for today",
    secretTitle: "🌟 Their little secret",
    tipTitle: "💡 Tips for you",
    posterBtn: "🎴 Create heart card",
    resetBtn: "↺ Read again",
    posterSave: "📥 Save heart card",
    posterClose: "Close",
    posterTitle: "🐾  Pet Psychic  🐾",
    posterLove: "❤️ Loves you",
    posterMood: "😺 Mood",
    posterHunger: "🍖 Hunger",
    posterFooter: "Whispers of Fate · Pet Psychic",
    posterFileSuffix: " heart card",
    typeLabels: { 猫咪: "Cat", 狗狗: "Dog", 兔子: "Rabbit", 鸟类: "Bird", 仓鼠: "Hamster", 其他: "Other" } as Record<PetType, string>,
  },
};
type Lang = "zh" | "en" | "tw";
type PetT = (typeof T)[Lang];
// ────────────────────────────────────────────────────────────────

type Phase = "input" | "loading" | "result";

export default function PetPsychicPage() {
  const lang = useLocale() as Lang;
  const t = T[lang];
  const content = PET_PSYCHIC_CONTENT[lang];

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
      const r = buildPetPsychicResult(petName.trim() || t.defaultName, petType, lang);
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
      }}>{t.back}</a>

      {/* 语言切换 */}
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 200 }}>
        <LangSwitcher />
      </div>

      <div className="pet-hero">
        <div className="pet-hero-bg" />
        <div className="pet-hero-tag">{t.heroTag}</div>
        <h1 className="pet-hero-title">{t.heroTitle}</h1>
        <p className="pet-hero-sub">{t.heroSub}</p>
      </div>

      <div className="pet-content">
        {phase === "input" && (
          <div className="pet-input-card pet-fade-in">
            <p className="pet-input-title">{t.inputTitle}</p>

            {/* 照片上传 */}
            <div className="pet-photo-area" onClick={() => fileInputRef.current?.click()}>
              <div className="pet-photo-circle">
                {photoUrl ? (
                  <img src={photoUrl} alt={t.photoAlt} className="pet-photo-preview" />
                ) : (
                  <>
                    <span className="pet-photo-emoji">📷</span>
                    <span className="pet-photo-hint">{t.photoHintL1}<br />{t.photoHintL2}</span>
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
              <label className="pet-label">{t.nameLabel} <span style={{fontSize:"0.75rem",opacity:0.55,fontWeight:400}}>{t.nameLabelHint}</span></label>
              <input
                className="pet-input"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder={t.namePlaceholder}
                maxLength={10}
              />
            </div>

            {/* 宠物类型 */}
            <div className="pet-field">
              <label className="pet-label">{t.typeLabel}</label>
              <div className="pet-type-grid">
                {PET_TYPES.map((type) => (
                  <button
                    key={type}
                    className={`pet-type-btn ${petType === type ? "selected" : ""}`}
                    onClick={() => setPetType(type)}
                  >
                    {PET_TYPE_EMOJIS[type]} {t.typeLabels[type]}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="pet-submit-btn"
              onClick={handleSubmit}
              disabled={(!petName.trim() && !photoUrl) || !petType}
            >
              {t.submitBtn}
            </button>
          </div>
        )}

        {/* ── 新手引导：怎么玩（输入区旁，首次进入也能看懂流程） ── */}
        {phase === "input" && (
          <div style={{
            marginTop: 20, maxWidth: 480, width: "100%",
            background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.22)",
            borderRadius: 14, padding: "18px 20px", textAlign: "left", boxSizing: "border-box",
          }}>
            <div style={{
              fontFamily: "var(--font-cinzel), serif", fontSize: "0.95rem",
              color: "#e8d5a3", letterSpacing: "0.06em", marginBottom: 12,
            }}>{content.howToTitle}</div>
            <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {content.howToSteps.map((s, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{
                    flexShrink: 0, width: 22, height: 22, borderRadius: "50%",
                    border: "1px solid rgba(201,168,76,0.55)", color: "#c9a84c",
                    fontSize: "0.72rem", display: "inline-flex", alignItems: "center", justifyContent: "center",
                    marginTop: 1,
                  }}>{i + 1}</span>
                  <span style={{ fontSize: "0.85rem", color: "rgba(220,205,175,0.8)", lineHeight: 1.7 }}>{s}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {phase === "loading" && (
          <div className="pet-loading pet-fade-in">
            <span className="pet-loading-paw">🐾</span>
            <p className="pet-loading-text">{t.loadingPre}{petName.trim() || t.loadingTa}{t.loadingPost}</p>
            <p style={{ fontSize: "0.78rem", color: "rgba(100,200,130,0.35)" }}>
              {t.loadingSub}
            </p>
          </div>
        )}

        {phase === "result" && result && (
          <PetResult
            t={t}
            result={result}
            photoUrl={photoUrl}
            onReset={handleReset}
            onShowPoster={() => setShowPoster(true)}
          />
        )}
      </div>

      {/* ── SEO 内容区 + FAQ（SSR 输出，爬虫可读） ── */}
      <section style={{ maxWidth: 720, margin: "40px auto 0", padding: "0 16px 32px", textAlign: "left", boxSizing: "border-box" }}>
        {content.seoSections.map((sec) => (
          <div key={sec.heading} style={{ marginBottom: 28 }}>
            <h2 style={{
              fontFamily: "var(--font-cinzel), serif", fontSize: "1.05rem",
              color: "#e8d5a3", letterSpacing: "0.04em", marginBottom: 10,
              borderLeft: "3px solid rgba(201,168,76,0.6)", paddingLeft: 12,
            }}>{sec.heading}</h2>
            <p style={{ fontSize: "0.88rem", color: "rgba(200,175,140,0.75)", lineHeight: 1.85, margin: 0 }}>{sec.body}</p>
          </div>
        ))}
        <h2 style={{
          fontFamily: "var(--font-cinzel), serif", fontSize: "1.05rem",
          color: "#e8d5a3", letterSpacing: "0.04em", marginBottom: 12,
          borderLeft: "3px solid rgba(201,168,76,0.6)", paddingLeft: 12,
        }}>{content.faqTitle}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {content.faq.map((f) => (
            <details key={f.q} style={{
              background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.18)",
              borderRadius: 12, padding: "12px 16px",
            }}>
              <summary style={{ cursor: "pointer", fontSize: "0.88rem", color: "rgba(232,213,163,0.9)", fontWeight: 600, lineHeight: 1.5 }}>{f.q}</summary>
              <p style={{ fontSize: "0.84rem", color: "rgba(200,175,140,0.72)", lineHeight: 1.8, margin: "10px 0 2px" }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {showPoster && result && (
        <PetPoster
          t={t}
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
  t,
  result,
  photoUrl,
  onReset,
  onShowPoster,
}: {
  t: PetT;
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
              <span className="pet-type-badge">{t.typeLabels[result.petType]}</span>
            </div>
            <div className="pet-card-name">{t.cardDrawn}{card.name} {card.emoji}</div>
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
        <div className="pet-card-title">{t.statusTitle}</div>
        <div className="pet-status-grid">
          {[
            { label: t.statusLove, val: result.loveLevel, color: "#E91E8C" },
            { label: t.statusMood, val: result.moodLevel, color: "#5dc885" },
            { label: t.statusHunger, val: result.hungerLevel, color: "#C9A84C" },
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
        <div className="pet-card-title">📅 {result.petName} {t.planTitleSuffix}</div>
        <p className="pet-plan-text">{result.todayPlan}</p>
      </div>

      {/* 秘密心愿 */}
      <div className="pet-secret-card">
        <div className="pet-card-title">{t.secretTitle}</div>
        <p className="pet-secret-text">&ldquo;{result.secretDesire}&rdquo;</p>
      </div>

      {/* 主人贴士 */}
      <div className="pet-tip-card">
        <div className="pet-card-title">{t.tipTitle}</div>
        <p className="pet-tip-text">{card.petTip}</p>
      </div>

      {/* 操作 */}
      <div className="pet-actions">
        <button className="pet-poster-btn" onClick={onShowPoster}>
          {t.posterBtn}
        </button>
        <button className="pet-reset-btn" onClick={onReset}>
          {t.resetBtn}
        </button>
      </div>
    </div>
  );
}

// ===== 海报组件 =====
function PetPoster({
  t,
  result,
  photoUrl,
  onClose,
}: {
  t: PetT;
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
      ctx.fillText(t.posterTitle, W / 2, 38);

      // 宠物名字
      ctx.font = "bold 24px serif";
      ctx.fillStyle = "#a8f0c0";
      ctx.fillText(result.petName, W / 2, 72);

      // 类型标签
      ctx.font = "11px sans-serif";
      ctx.fillStyle = "rgba(100,200,130,0.5)";
      ctx.fillText(`${PET_TYPE_EMOJIS[result.petType]} ${t.typeLabels[result.petType]}`, W / 2, 90);

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
          drawAfterPhoto(ctx, W, H, result, t);
        };
        img.src = photoUrl;
      } else {
        ctx.font = "52px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(PET_TYPE_EMOJIS[result.petType], W / 2, 174);
        ctx.restore();
        drawAfterPhoto(ctx, W, H, result, t);
      }
    };

    drawContent();
  }, [result, photoUrl, t]);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${result.petName}${t.posterFileSuffix}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="pet-poster-overlay" onClick={onClose}>
      <div className="pet-poster-wrap" onClick={(e) => e.stopPropagation()}>
        <canvas ref={canvasRef} className="pet-poster-canvas" />
        <div className="pet-poster-actions">
          <button className="pet-poster-save" onClick={handleSave}>{t.posterSave}</button>
          <button className="pet-poster-close" onClick={onClose}>{t.posterClose}</button>
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
  t: PetT,
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
  ctx.fillText(`${t.posterLove} ${result.loveLevel}  ${t.posterMood} ${result.moodLevel}  ${t.posterHunger} ${result.hungerLevel}`, W / 2, barY);

  // 底部
  ctx.font = "11px sans-serif";
  ctx.fillStyle = "rgba(100,200,130,0.25)";
  ctx.fillText(t.posterFooter, W / 2, H - 24);
}
