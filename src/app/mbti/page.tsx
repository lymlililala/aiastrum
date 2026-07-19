"use client";

import { useState, useRef, useEffect } from "react";
import "./mbti.css";
import {
  MBTI_TYPES,
  ZODIAC_SIGNS,
  getMBTIZodiacProfile,
  MBTI_SEO,
} from "./mbti-data";
import type { MBTIType, ZodiacSign, MBTIZodiacProfile } from "./mbti-data";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";

// ── 三语文案 ────────────────────────────────────────
const T = {
  zh: {
    back:           "返回",
    trending:       "🔥 流行",
    heroTitle:      "星球碰撞",
    heroSub:        "当 MBTI 遇上星座，你是什么宇宙限定款？",
    selectTitle:    "✨ 选择你的 MBTI 和星座，解锁专属档案",
    mbtiStep:       "① 你的 MBTI 人格类型",
    zodiacStep:     "② 你的星座",
    generateBtn:    "🪐 解锁我的宇宙档案",
    traitsTitle:    "⚡ 人格特质解析",
    superpower:     "✨ 超能力",
    weakness:       "💀 致命弱点",
    career:         "💼 事业方向",
    love:           "💕 爱情模式",
    friendStyle:    "🤝 友情风格",
    lifeVibe:       "🌌 人生气场",
    moodTitle:      "🧠 今日内心 OS",
    dangerTitle:    "⚠️ 危险模式解锁条件",
    compatLabel:    "💞 最配类型",
    celebsLabel:    "🌟 同类代表人物",
    posterBtn:      "📸 生成专属宇宙海报",
    resetBtn:       "↺ 换一个组合",
    posterSave:     "📥 保存海报",
    posterClose:    "关闭",
    posterCompat:   "最配类型：",
    posterFooter:   "命运密语 · MBTI星球碰撞",
    posterFileName: "MBTI星球碰撞",
    zodiacLabel: {
      "白羊座": "白羊座", "金牛座": "金牛座", "双子座": "双子座", "巨蟹座": "巨蟹座",
      "狮子座": "狮子座", "处女座": "处女座", "天秤座": "天秤座", "天蝎座": "天蝎座",
      "射手座": "射手座", "摩羯座": "摩羯座", "水瓶座": "水瓶座", "双鱼座": "双鱼座",
    } as Record<ZodiacSign, string>,
  },
  tw: {
    back:           "返回",
    trending:       "🔥 流行",
    heroTitle:      "星球碰撞",
    heroSub:        "當 MBTI 遇上星座，你是什麼宇宙限定款？",
    selectTitle:    "✨ 選擇你的 MBTI 和星座，解鎖專屬檔案",
    mbtiStep:       "① 你的 MBTI 人格類型",
    zodiacStep:     "② 你的星座",
    generateBtn:    "🪐 解鎖我的宇宙檔案",
    traitsTitle:    "⚡ 人格特質解析",
    superpower:     "✨ 超能力",
    weakness:       "💀 致命弱點",
    career:         "💼 事業方向",
    love:           "💕 愛情模式",
    friendStyle:    "🤝 友情風格",
    lifeVibe:       "🌌 人生氣場",
    moodTitle:      "🧠 今日內心 OS",
    dangerTitle:    "⚠️ 危險模式解鎖條件",
    compatLabel:    "💞 最配類型",
    celebsLabel:    "🌟 同類代表人物",
    posterBtn:      "📸 生成專屬宇宙海報",
    resetBtn:       "↺ 換一個組合",
    posterSave:     "📥 儲存海報",
    posterClose:    "關閉",
    posterCompat:   "最配類型：",
    posterFooter:   "命運密語 · MBTI星球碰撞",
    posterFileName: "MBTI星球碰撞",
    zodiacLabel: {
      "白羊座": "牡羊座", "金牛座": "金牛座", "双子座": "雙子座", "巨蟹座": "巨蟹座",
      "狮子座": "獅子座", "处女座": "處女座", "天秤座": "天秤座", "天蝎座": "天蠍座",
      "射手座": "射手座", "摩羯座": "摩羯座", "水瓶座": "水瓶座", "双鱼座": "雙魚座",
    } as Record<ZodiacSign, string>,
  },
  en: {
    back:           "Back",
    trending:       "🔥 Trending",
    heroTitle:      "Planet Collision",
    heroSub:        "When MBTI meets the zodiac, which cosmic limited edition are you?",
    selectTitle:    "✨ Pick your MBTI and zodiac sign to unlock your profile",
    mbtiStep:       "① Your MBTI personality type",
    zodiacStep:     "② Your zodiac sign",
    generateBtn:    "🪐 Unlock my cosmic profile",
    traitsTitle:    "⚡ Personality Traits",
    superpower:     "✨ Superpower",
    weakness:       "💀 Fatal Flaw",
    career:         "💼 Career Path",
    love:           "💕 Love Style",
    friendStyle:    "🤝 Friendship Style",
    lifeVibe:       "🌌 Life Vibe",
    moodTitle:      "🧠 Today's Inner OS",
    dangerTitle:    "⚠️ Danger Mode Unlock Conditions",
    compatLabel:    "💞 Best Match",
    celebsLabel:    "🌟 Famous Examples",
    posterBtn:      "📸 Generate cosmic poster",
    resetBtn:       "↺ Try another combo",
    posterSave:     "📥 Save Poster",
    posterClose:    "Close",
    posterCompat:   "Best Match: ",
    posterFooter:   "Mystic Whispers · MBTI Planet Collision",
    posterFileName: "MBTI_PlanetCollision",
    zodiacLabel: {
      "白羊座": "Aries", "金牛座": "Taurus", "双子座": "Gemini", "巨蟹座": "Cancer",
      "狮子座": "Leo", "处女座": "Virgo", "天秤座": "Libra", "天蝎座": "Scorpio",
      "射手座": "Sagittarius", "摩羯座": "Capricorn", "水瓶座": "Aquarius", "双鱼座": "Pisces",
    } as Record<ZodiacSign, string>,
  },
};
type Lang = "zh" | "en" | "tw";
// ────────────────────────────────────────────────────

type Phase = "select" | "result";

export default function MBTIPage() {
  const lang = useLocale() as Lang;
  const t = T[lang];

  const [phase, setPhase] = useState<Phase>("select");
  const [selectedMBTI, setSelectedMBTI] = useState<MBTIType | null>(null);
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacSign | null>(null);
  const [profile, setProfile] = useState<MBTIZodiacProfile | null>(null);
  const [showPoster, setShowPoster] = useState(false);

  const seo = MBTI_SEO[lang];

  const handleGenerate = () => {
    if (!selectedMBTI || !selectedZodiac) return;
    const p = getMBTIZodiacProfile(selectedMBTI, selectedZodiac, lang);
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
      }}>← {t.back}</a>

      {/* 语言切换 */}
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 200 }}>
        <LangSwitcher />
      </div>

      <div className="mbti-hero">
        <div className="mbti-hero-bg" />
        <div className="mbti-hero-tag">
          MBTI × Zodiac
          <span className="mbti-trending">{t.trending}</span>
        </div>
        <h1 className="mbti-hero-title">{t.heroTitle}</h1>
        <p className="mbti-hero-sub">{t.heroSub}</p>
      </div>

      <div className="mbti-content">
        {phase === "select" && (
          <SelectPhase
            t={t}
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
              t={t}
              profile={profile}
              mbti={selectedMBTI}
              zodiac={selectedZodiac}
              onReset={handleReset}
              onShowPoster={() => setShowPoster(true)}
            />
          </>
        )}

        {/* ── 新手说明：怎么玩（仅选择阶段展示，SSR 输出） ── */}
        {phase === "select" && (
          <div style={{
            margin: "28px auto 0", maxWidth: 480, width: "100%",
            background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.22)",
            borderRadius: 14, padding: "18px 20px", textAlign: "left",
          }}>
            <div style={{
              fontFamily: "var(--font-cinzel), serif", fontSize: "0.95rem",
              color: "#e8d5a3", letterSpacing: "0.06em", marginBottom: 12,
            }}>{seo.howToTitle}</div>
            <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {seo.howToSteps.map((s, i) => (
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

        {/* ── SEO 内容区 + FAQ（SSR 输出，爬虫可读） ── */}
        <section style={{ maxWidth: 720, margin: "48px auto 0", padding: "0 4px", textAlign: "left" }}>
          {seo.seoSections.map((sec) => (
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
          }}>{seo.faqTitle}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {seo.faq.map((f) => (
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
      </div>

      {showPoster && profile && selectedMBTI && selectedZodiac && (
        <PosterOverlay
          t={t}
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
  t,
  selectedMBTI,
  selectedZodiac,
  onSelectMBTI,
  onSelectZodiac,
  onGenerate,
}: {
  t: (typeof T)[Lang];
  selectedMBTI: MBTIType | null;
  selectedZodiac: ZodiacSign | null;
  onSelectMBTI: (m: MBTIType) => void;
  onSelectZodiac: (z: ZodiacSign) => void;
  onGenerate: () => void;
}) {
  return (
    <div className="mbti-select-card mbti-fade-in">
      <p className="mbti-select-title">{t.selectTitle}</p>

      {/* MBTI 选择 */}
      <div className="mbti-select-group">
        <span className="mbti-select-label">{t.mbtiStep}</span>
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
        <span className="mbti-select-label">{t.zodiacStep}</span>
        <div className="mbti-zodiac-grid">
          {ZODIAC_SIGNS.map((zodiac) => (
            <button
              key={zodiac}
              className={`mbti-zodiac-btn ${selectedZodiac === zodiac ? "selected" : ""}`}
              onClick={() => onSelectZodiac(zodiac)}
            >
              {t.zodiacLabel[zodiac]}
            </button>
          ))}
        </div>
      </div>

      <button
        className="mbti-generate-btn"
        onClick={onGenerate}
        disabled={!selectedMBTI || !selectedZodiac}
      >
        {t.generateBtn}
      </button>
    </div>
  );
}

// ===== 结果阶段 =====
function ResultPhase({
  t,
  profile,
  mbti,
  zodiac,
  onReset,
  onShowPoster,
}: {
  t: (typeof T)[Lang];
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
        <span className="mbti-combo-label">{mbti} × {t.zodiacLabel[zodiac]}</span>
        <span className="mbti-profile-icon">{profile.icon}</span>
        <div className="mbti-profile-title">{profile.title}</div>
        <div className="mbti-tagline">&ldquo;{profile.tagline}&rdquo;</div>
        <p className="mbti-summary">{profile.summary}</p>
      </div>

      {/* 特质网格 */}
      <div className="mbti-traits-card">
        <div className="mbti-card-title">{t.traitsTitle}</div>
        <div className="mbti-traits-grid">
          <div className="mbti-trait-item">
            <div className="mbti-trait-label">{t.superpower}</div>
            <div className="mbti-trait-value">{profile.superpower}</div>
          </div>
          <div className="mbti-trait-item">
            <div className="mbti-trait-label">{t.weakness}</div>
            <div className="mbti-trait-value">{profile.weakness}</div>
          </div>
          <div className="mbti-trait-item">
            <div className="mbti-trait-label">{t.career}</div>
            <div className="mbti-trait-value">{profile.career}</div>
          </div>
          <div className="mbti-trait-item">
            <div className="mbti-trait-label">{t.love}</div>
            <div className="mbti-trait-value">{profile.love.slice(0, 40)}…</div>
          </div>
          <div className="mbti-trait-item">
            <div className="mbti-trait-label">{t.friendStyle}</div>
            <div className="mbti-trait-value">{profile.friendStyle}</div>
          </div>
          <div className="mbti-trait-item">
            <div className="mbti-trait-label">{t.lifeVibe}</div>
            <div className="mbti-trait-value">{profile.lifeVibe}</div>
          </div>
        </div>
      </div>

      {/* 内心 OS */}
      <div className="mbti-mood-card">
        <div className="mbti-card-title">{t.moodTitle}</div>
        <p className="mbti-mood-text">&ldquo;{profile.dailyMood}&rdquo;</p>
      </div>

      {/* 危险模式 */}
      <div className="mbti-danger-card">
        <div className="mbti-card-title">{t.dangerTitle}</div>
        <p className="mbti-danger-text">{profile.dangerMode}</p>
      </div>

      {/* 最配 & 名人 */}
      <div className="mbti-compat-card">
        <div className="mbti-compat-item">
          <div className="mbti-compat-label">{t.compatLabel}</div>
          <div className="mbti-compat-value">{profile.compatibleWith}</div>
        </div>
        <div className="mbti-compat-divider" />
        <div className="mbti-compat-item">
          <div className="mbti-compat-label">{t.celebsLabel}</div>
          <div className="mbti-compat-value" style={{ fontSize: "0.85rem" }}>
            {profile.celebs.join(" / ")}
          </div>
        </div>
      </div>

      {/* 操作 */}
      <div className="mbti-actions">
        <button className="mbti-poster-btn" onClick={onShowPoster}>
          {t.posterBtn}
        </button>
        <button className="mbti-reset-btn" onClick={onReset}>
          {t.resetBtn}
        </button>
      </div>
    </div>
  );
}

// ===== 海报弹窗 =====
function PosterOverlay({
  t,
  profile,
  mbti,
  zodiac,
  onClose,
}: {
  t: (typeof T)[Lang];
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
    ctx.fillText(`${mbti} × ${t.zodiacLabel[zodiac]}`, W / 2, 48);

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
    ctx.fillText(t.superpower, W / 2 - 80, traitY + 24);
    ctx.fillText(t.weakness, W / 2 + 80, traitY + 24);
    ctx.fillText(t.love, W / 2 - 80, traitY + 72);
    ctx.fillText(t.career, W / 2 + 80, traitY + 72);

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
    ctx.fillText(`${t.posterCompat}${profile.compatibleWith}`, W / 2, compatY);

    // 底部
    ctx.font = "11px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.fillText(t.posterFooter, W / 2, H - 24);
  }, [t, profile, mbti, zodiac]);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${t.posterFileName}_${mbti}x${zodiac}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="mbti-poster-overlay" onClick={onClose}>
      <div className="mbti-poster-wrap" onClick={(e) => e.stopPropagation()}>
        <canvas ref={canvasRef} className="mbti-poster-canvas" />
        <div className="mbti-poster-actions">
          <button className="mbti-poster-save" onClick={handleSave}>
            {t.posterSave}
          </button>
          <button className="mbti-poster-close" onClick={onClose}>
            {t.posterClose}
          </button>
        </div>
      </div>
    </div>
  );
}
