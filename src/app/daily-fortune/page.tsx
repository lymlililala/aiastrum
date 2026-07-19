"use client";

import { useState, useRef, useEffect } from "react";
import "./daily-fortune.css";
import type { DailyFortuneInput, DailyFortuneResult } from "./daily-fortune-engine";
import { buildDailyFortuneResult } from "./daily-fortune-engine";
import { DAILY_FORTUNE_SEO } from "./daily-fortune-seo-i18n";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";

// ── 三语文案 ────────────────────────────────────────
const T = {
  zh: {
    back:           "← 返回",
    heroTag:        "Daily Fortune · 每日开运",
    heroTitle:      "今日专属开运指南",
    dayPillarLabel: "日柱",
    formTitle:      "✨ 输入你的出生信息，获取今日专属开运建议",
    nicknameLabel:  "你的昵称（选填）",
    nicknamePlaceholder: "如：小月",
    yearLabel:      "出生年",
    monthLabel:     "月",
    dayLabel:       "日",
    submitBtn:      "🌟 生成我的今日开运指南",
    loadingText:    "正在推算今日五行能量…",
    loadingSub:     "日柱天干 × 本命五行 × 今日运势",
    elementSuffix:  "命",
    dayPillarSuffix: "日",
    todayElement:   "今日五行：",
    overallLabel:   "今日总运",
    loveScore:      "💕 感情运",
    careerScore:    "💼 事业运",
    wealthScore:    "💰 财运",
    healthScore:    "🌿 健康运",
    luckyTitle:     "✨ 今日幸运要素",
    luckyColor:     "幸运色",
    luckyNumber:    "幸运数字",
    luckyDirection: "幸运方位",
    luckyFood:      "开运食物",
    luckyTime:      "开运时辰",
    accessory:      "开运配饰",
    outfitTitle:    "👗 今日开运穿搭",
    todayLuckyColor: "今日幸运色",
    avoidPrefix:    "避",
    accessoryBoost: "💎 配饰加持：",
    ritualTitle:    "🌅 晨间开运仪式",
    avoidTitle:     "⚠️ 今日禁忌",
    posterBtn:      "🌟 生成今日开运海报",
    resetBtn:       "↺ 更换信息重新测算",
    // poster
    posterSave:     "📥 保存海报",
    posterClose:    "关闭",
    posterDownloadName: "今日开运指南",
  },
  tw: {
    back:           "← 返回",
    heroTag:        "Daily Fortune · 每日開運",
    heroTitle:      "今日專屬開運指南",
    dayPillarLabel: "日柱",
    formTitle:      "✨ 輸入你的出生資訊，獲取今日專屬開運建議",
    nicknameLabel:  "你的暱稱（選填）",
    nicknamePlaceholder: "如：小月",
    yearLabel:      "出生年",
    monthLabel:     "月",
    dayLabel:       "日",
    submitBtn:      "🌟 生成我的今日開運指南",
    loadingText:    "正在推算今日五行能量…",
    loadingSub:     "日柱天干 × 本命五行 × 今日運勢",
    elementSuffix:  "命",
    dayPillarSuffix: "日",
    todayElement:   "今日五行：",
    overallLabel:   "今日總運",
    loveScore:      "💕 感情運",
    careerScore:    "💼 事業運",
    wealthScore:    "💰 財運",
    healthScore:    "🌿 健康運",
    luckyTitle:     "✨ 今日幸運要素",
    luckyColor:     "幸運色",
    luckyNumber:    "幸運數字",
    luckyDirection: "幸運方位",
    luckyFood:      "開運食物",
    luckyTime:      "開運時辰",
    accessory:      "開運配飾",
    outfitTitle:    "👗 今日開運穿搭",
    todayLuckyColor: "今日幸運色",
    avoidPrefix:    "避",
    accessoryBoost: "💎 配飾加持：",
    ritualTitle:    "🌅 晨間開運儀式",
    avoidTitle:     "⚠️ 今日禁忌",
    posterBtn:      "🌟 生成今日開運海報",
    resetBtn:       "↺ 更換資訊重新測算",
    posterSave:     "📥 儲存海報",
    posterClose:    "關閉",
    posterDownloadName: "今日開運指南",
  },
  en: {
    back:           "← Back",
    heroTag:        "Daily Fortune",
    heroTitle:      "Your Daily Fortune Guide",
    dayPillarLabel: "Day Pillar",
    formTitle:      "✨ Enter your birth details for today's personalized fortune",
    nicknameLabel:  "Your nickname (optional)",
    nicknamePlaceholder: "e.g. Luna",
    yearLabel:      "Birth year",
    monthLabel:     "Month",
    dayLabel:       "Day",
    submitBtn:      "🌟 Generate my daily fortune",
    loadingText:    "Calculating today's Five Elements energy…",
    loadingSub:     "Day stem × natal element × today's fortune",
    elementSuffix:  " element",
    dayPillarSuffix: " day",
    todayElement:   "Today's element: ",
    overallLabel:   "Overall",
    loveScore:      "💕 Love",
    careerScore:    "💼 Career",
    wealthScore:    "💰 Wealth",
    healthScore:    "🌿 Health",
    luckyTitle:     "✨ Today's lucky elements",
    luckyColor:     "Lucky color",
    luckyNumber:    "Lucky numbers",
    luckyDirection: "Lucky direction",
    luckyFood:      "Lucky food",
    luckyTime:      "Lucky hour",
    accessory:      "Lucky accessory",
    outfitTitle:    "👗 Today's lucky outfit",
    todayLuckyColor: "Today's lucky color",
    avoidPrefix:    "Avoid ",
    accessoryBoost: "💎 Accessory boost: ",
    ritualTitle:    "🌅 Morning fortune ritual",
    avoidTitle:     "⚠️ Today's taboos",
    posterBtn:      "🌟 Create today's fortune poster",
    resetBtn:       "↺ Change details & redo",
    posterSave:     "📥 Save poster",
    posterClose:    "Close",
    posterDownloadName: "daily-fortune",
  },
};
type Lang = "zh" | "en" | "tw";
type FortuneT = (typeof T)[Lang];
// ────────────────────────────────────────────────────

type Phase = "input" | "loading" | "result";

export default function DailyFortunePage() {
  const lang = useLocale() as Lang;
  const t = T[lang];
  const seo = DAILY_FORTUNE_SEO[lang];

  const [phase, setPhase] = useState<Phase>("input");
  const [result, setResult] = useState<DailyFortuneResult | null>(null);
  const [showPoster, setShowPoster] = useState(false);
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("1995");
  const [birthMonth, setBirthMonth] = useState("8");
  const [birthDay, setBirthDay] = useState("15");

  // 从 localStorage 读取缓存
  useEffect(() => {
    const saved = localStorage.getItem("df_birth");
    if (saved) {
      try {
        const p = JSON.parse(saved) as DailyFortuneInput;
        setBirthYear(String(p.birthYear));
        setBirthMonth(String(p.birthMonth));
        setBirthDay(String(p.birthDay));
        setName(p.name ?? "");
      } catch { /* ignore */ }
    }
  }, []);

  const handleSubmit = () => {
    const y = parseInt(birthYear);
    const m = parseInt(birthMonth);
    const d = parseInt(birthDay);
    if (!y || !m || !d || y < 1900 || y > 2099 || m < 1 || m > 12 || d < 1 || d > 31) return;
    const input: DailyFortuneInput = { birthYear: y, birthMonth: m, birthDay: d, name: name.trim() || undefined };
    localStorage.setItem("df_birth", JSON.stringify(input));
    setPhase("loading");
    setTimeout(() => {
      setResult(buildDailyFortuneResult(input, lang));
      setPhase("result");
    }, 2000);
  };

  return (
    <div className="df-page">
      {/* 顶部语言切换 */}
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 200 }}>
        <LangSwitcher />
      </div>

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

      <div className="df-hero">
        <div className="df-hero-bg" />
        <div className="df-hero-tag">{t.heroTag}</div>
        <h1 className="df-hero-title">{t.heroTitle}</h1>
        {result && (
          <>
            <p className="df-hero-date">{result.date}</p>
            <p className="df-hero-lunar">{result.lunarDate} · {t.dayPillarLabel} {result.heavenlyStem}{result.earthlyBranch}</p>
          </>
        )}
      </div>

      <div className="df-content">
        {phase === "input" && (
          <div className="df-form df-fade-in">
            <p className="df-form-title">{t.formTitle}</p>
            <div className="df-field df-field-full">
              <label className="df-label">{t.nicknameLabel}</label>
              <input
                className="df-input"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={t.nicknamePlaceholder}
                maxLength={10}
              />
            </div>
            <div className="df-form-grid">
              <div className="df-field">
                <label className="df-label">{t.yearLabel}</label>
                <input
                  className="df-input"
                  value={birthYear}
                  onChange={e => setBirthYear(e.target.value)}
                  placeholder="1995"
                  type="number"
                  min="1900"
                  max="2099"
                />
              </div>
              <div className="df-field">
                <label className="df-label">{t.monthLabel}</label>
                <input
                  className="df-input"
                  value={birthMonth}
                  onChange={e => setBirthMonth(e.target.value)}
                  placeholder="8"
                  type="number"
                  min="1"
                  max="12"
                />
              </div>
              <div className="df-field">
                <label className="df-label">{t.dayLabel}</label>
                <input
                  className="df-input"
                  value={birthDay}
                  onChange={e => setBirthDay(e.target.value)}
                  placeholder="15"
                  type="number"
                  min="1"
                  max="31"
                />
              </div>
            </div>
            <button className="df-submit-btn" onClick={handleSubmit}>
              {t.submitBtn}
            </button>

            {/* ── 新手说明：怎么玩（SSR 输出） ── */}
            <div style={{
              marginTop: 28, textAlign: "left",
              background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.22)",
              borderRadius: 14, padding: "18px 20px",
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
          </div>
        )}

        {phase === "loading" && (
          <div className="df-loading df-fade-in">
            <div className="df-loading-spinner" />
            <p className="df-loading-text">{t.loadingText}</p>
            <p style={{ fontSize: "0.8rem", color: "rgba(240,200,120,0.35)" }}>
              {t.loadingSub}
            </p>
          </div>
        )}

        {phase === "result" && result && (
          <FortuneResult
            result={result}
            t={t}
            onReset={() => { setPhase("input"); setResult(null); }}
            onShowPoster={() => setShowPoster(true)}
          />
        )}

        {/* ── SEO 内容区 + FAQ（SSR 输出，爬虫可读） ── */}
        <section style={{ maxWidth: 720, margin: "48px auto 0", padding: "0 4px 48px", textAlign: "left" }}>
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

      {showPoster && result && (
        <FortunePoster result={result} t={t} lang={lang} onClose={() => setShowPoster(false)} />
      )}
    </div>
  );
}

// ===== 结果组件 =====
function FortuneResult({
  result,
  t,
  onReset,
  onShowPoster,
}: {
  result: DailyFortuneResult;
  t: FortuneT;
  onReset: () => void;
  onShowPoster: () => void;
}) {
  const scoreColor = (s: number) => s >= 80 ? "#FFD700" : s >= 60 ? "#C9A84C" : "#8090A8";

  return (
    <div className="df-result df-fade-in">
      {/* 总览卡 */}
      <div className="df-overview-card">
        <div className="df-overview-head">
          <div className="df-element-badge">
            <span>{result.elementEmoji}</span>
            <span className="df-element-label">{result.element}{t.elementSuffix}</span>
          </div>
          <div className="df-overview-info">
            <div className="df-day-pillar">{result.heavenlyStem}{result.earthlyBranch}{t.dayPillarSuffix}</div>
            <div className="df-day-sub">{t.todayElement}{result.dayElement} · {result.lunarDate}</div>
          </div>
          <div className="df-overall-score">
            <div className="df-score-num" style={{ color: scoreColor(result.overallScore) }}>
              {result.overallScore}
            </div>
            <div className="df-score-label">{t.overallLabel}</div>
          </div>
        </div>

        <div className="df-scores-grid">
          {[
            { name: t.loveScore, score: result.loveScore },
            { name: t.careerScore, score: result.careerScore },
            { name: t.wealthScore, score: result.wealthScore },
            { name: t.healthScore, score: result.healthScore },
          ].map(({ name, score }) => (
            <div className="df-score-item" key={name}>
              <div className="df-score-header">
                <span className="df-score-name">{name}</span>
                <span className="df-score-val" style={{ color: scoreColor(score) }}>{score}</span>
              </div>
              <div className="df-score-bar">
                <div className="df-score-fill" style={{ width: `${score}%`, background: `linear-gradient(90deg, ${scoreColor(score)}88, ${scoreColor(score)})` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 幸运要素 */}
      <div className="df-lucky-card">
        <div className="df-card-title">{t.luckyTitle}</div>
        <div className="df-lucky-grid">
          <div className="df-lucky-item">
            <div className="df-lucky-emoji">{result.luckyColorEmoji}</div>
            <div className="df-lucky-label">{t.luckyColor}</div>
            <div className="df-lucky-value">{result.luckyColor}</div>
          </div>
          <div className="df-lucky-item">
            <div className="df-lucky-emoji">🔢</div>
            <div className="df-lucky-label">{t.luckyNumber}</div>
            <div className="df-lucky-value">{result.luckyNumbers.join(" · ")}</div>
          </div>
          <div className="df-lucky-item">
            <div className="df-lucky-emoji">{result.luckyDirectionEmoji}</div>
            <div className="df-lucky-label">{t.luckyDirection}</div>
            <div className="df-lucky-value">{result.luckyDirection}</div>
          </div>
          <div className="df-lucky-item">
            <div className="df-lucky-emoji">🍽️</div>
            <div className="df-lucky-label">{t.luckyFood}</div>
            <div className="df-lucky-value">{result.luckyFood}</div>
          </div>
          <div className="df-lucky-item">
            <div className="df-lucky-emoji">⏰</div>
            <div className="df-lucky-label">{t.luckyTime}</div>
            <div className="df-lucky-value" style={{ fontSize: "0.72rem" }}>{result.luckyTime}</div>
          </div>
          <div className="df-lucky-item">
            <div className="df-lucky-emoji">💎</div>
            <div className="df-lucky-label">{t.accessory}</div>
            <div className="df-lucky-value" style={{ fontSize: "0.72rem" }}>{result.accessory}</div>
          </div>
        </div>
      </div>

      {/* 穿搭建议 */}
      <div className="df-outfit-card">
        <div className="df-card-title">{t.outfitTitle}</div>
        <div className="df-color-strip">
          <div
            className="df-color-dot"
            style={{ backgroundColor: result.luckyColorHex, ["--color" as string]: result.luckyColorHex }}
          />
          <div className="df-color-info">
            <div className="df-color-name">{result.luckyColor}</div>
            <div className="df-color-sub">{t.todayLuckyColor}</div>
          </div>
          <div className="df-avoid-color">{t.avoidPrefix}{result.avoidColor}</div>
        </div>
        <p className="df-outfit-text">{result.outfit}</p>
        <div className="df-accessory">{t.accessoryBoost}{result.accessory}</div>
      </div>

      {/* 晨间仪式 & 咒语 */}
      <div className="df-ritual-card">
        <div className="df-card-title">{t.ritualTitle}</div>
        <p className="df-ritual-text">{result.morningRitual}</p>
        <div className="df-mantra-box">&ldquo;{result.dailyMantra}&rdquo;</div>
      </div>

      {/* 今日禁忌 */}
      <div className="df-avoid-card">
        <div className="df-card-title">{t.avoidTitle}</div>
        <div className="df-avoid-list">
          {result.avoidList.map((item, i) => (
            <div className="df-avoid-item" key={i}>
              <div className="df-avoid-dot" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 祝福语 */}
      <div className="df-blessing-card">
        <p className="df-blessing-text">{result.blessingWord}</p>
      </div>

      {/* 操作 */}
      <div className="df-actions">
        <button className="df-poster-btn" onClick={onShowPoster}>
          {t.posterBtn}
        </button>
        <button className="df-reset-btn" onClick={onReset}>
          {t.resetBtn}
        </button>
      </div>
    </div>
  );
}

// ===== 海报文案（三语） =====
const POSTER_T: Record<Lang, {
  header: string;
  title: string;
  dayPillarSuffix: string;
  overallLabel: string;
  love: string;
  career: string;
  wealth: string;
  health: string;
  luckyTitle: string;
  luckyColor: string;
  luckyNumber: string;
  luckyDirection: string;
  luckyFood: string;
  luckyTime: string;
  accessory: string;
  footer: string;
}> = {
  zh: {
    header: "✦  今日专属开运指南  ✦",
    title: "五行开运日",
    dayPillarSuffix: "日",
    overallLabel: "今日总运指数",
    love: "感情运",
    career: "事业运",
    wealth: "财运",
    health: "健康运",
    luckyTitle: "✨ 今日幸运要素",
    luckyColor: "幸运色",
    luckyNumber: "幸运数字",
    luckyDirection: "幸运方位",
    luckyFood: "开运食物",
    luckyTime: "开运时辰",
    accessory: "开运配饰",
    footer: "命运密语 · 每日开运指南",
  },
  tw: {
    header: "✦  今日專屬開運指南  ✦",
    title: "五行開運日",
    dayPillarSuffix: "日",
    overallLabel: "今日總運指數",
    love: "感情運",
    career: "事業運",
    wealth: "財運",
    health: "健康運",
    luckyTitle: "✨ 今日幸運要素",
    luckyColor: "幸運色",
    luckyNumber: "幸運數字",
    luckyDirection: "幸運方位",
    luckyFood: "開運食物",
    luckyTime: "開運時辰",
    accessory: "開運配飾",
    footer: "命運密語 · 每日開運指南",
  },
  en: {
    header: "✦  Your Daily Fortune Guide  ✦",
    title: "Five Elements Lucky Day",
    dayPillarSuffix: " day",
    overallLabel: "Overall fortune index",
    love: "Love",
    career: "Career",
    wealth: "Wealth",
    health: "Health",
    luckyTitle: "✨ Today's lucky elements",
    luckyColor: "Lucky color",
    luckyNumber: "Lucky numbers",
    luckyDirection: "Lucky direction",
    luckyFood: "Lucky food",
    luckyTime: "Lucky hour",
    accessory: "Lucky accessory",
    footer: "Mystic Whispers · Daily Fortune",
  },
};

// ===== 海报组件 =====
function FortunePoster({ result, t, lang, onClose }: { result: DailyFortuneResult; t: FortuneT; lang: Lang; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pt = POSTER_T[lang];

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
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#0a0518");
    bg.addColorStop(0.5, "#0d0920");
    bg.addColorStop(1, "#080614");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // 光晕
    const glow = ctx.createRadialGradient(W / 2, 60, 0, W / 2, 60, 180);
    glow.addColorStop(0, "rgba(240,165,0,0.15)");
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // 标题
    ctx.font = "bold 14px serif";
    ctx.fillStyle = "rgba(240,165,0,0.6)";
    ctx.textAlign = "center";
    ctx.fillText(pt.header, W / 2, 48);

    ctx.font = "bold 28px serif";
    const titleGrad = ctx.createLinearGradient(0, 0, W, 0);
    titleGrad.addColorStop(0, "#FFD700");
    titleGrad.addColorStop(1, "#F0A500");
    ctx.fillStyle = titleGrad;
    ctx.fillText(pt.title, W / 2, 88);

    // 日期
    ctx.font = "13px sans-serif";
    ctx.fillStyle = "rgba(240,200,120,0.55)";
    ctx.fillText(result.date, W / 2, 114);
    ctx.fillText(result.lunarDate + " · " + result.heavenlyStem + result.earthlyBranch + pt.dayPillarSuffix, W / 2, 132);

    // 分割线
    ctx.strokeStyle = "rgba(240,165,0,0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 148);
    ctx.lineTo(W - 40, 148);
    ctx.stroke();

    // 今日总运
    ctx.font = "bold 56px serif";
    const scoreColor = result.overallScore >= 80 ? "#FFD700" : result.overallScore >= 60 ? "#C9A84C" : "#8090A8";
    ctx.fillStyle = scoreColor;
    ctx.fillText(String(result.overallScore), W / 2, 218);
    ctx.font = "13px sans-serif";
    ctx.fillStyle = "rgba(240,200,120,0.5)";
    ctx.fillText(pt.overallLabel, W / 2, 240);

    // 四维运势
    const scores = [
      { name: pt.love, score: result.loveScore },
      { name: pt.career, score: result.careerScore },
      { name: pt.wealth, score: result.wealthScore },
      { name: pt.health, score: result.healthScore },
    ];
    const barY = 260;
    scores.forEach((s, i) => {
      const x = 40 + (i % 2) * 145;
      const y = barY + Math.floor(i / 2) * 40;
      ctx.font = "11px sans-serif";
      ctx.fillStyle = "rgba(240,200,120,0.6)";
      ctx.textAlign = "left";
      ctx.fillText(s.name, x, y + 12);
      ctx.fillStyle = scoreColor;
      ctx.textAlign = "right";
      ctx.fillText(String(s.score), x + 130, y + 12);
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.beginPath();
      if (ctx.roundRect) { ctx.roundRect(x, y + 18, 130, 4, 2); } else { ctx.rect(x, y + 18, 130, 4); }
      ctx.fill();
      const barGrad = ctx.createLinearGradient(x, 0, x + s.score * 1.3, 0);
      barGrad.addColorStop(0, "rgba(201,168,76,0.8)");
      barGrad.addColorStop(1, "#FFD700");
      ctx.fillStyle = barGrad;
      ctx.fillRect(x, y + 18, s.score * 1.3, 4);
    });

    // 幸运要素区
    ctx.textAlign = "center";
    const elemY = 360;
    ctx.fillStyle = "rgba(240,165,0,0.08)";
    ctx.strokeStyle = "rgba(240,165,0,0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    if (ctx.roundRect) { ctx.roundRect(24, elemY, W - 48, 130, 14); } else { ctx.rect(24, elemY, W - 48, 130); }
    ctx.fill();
    ctx.stroke();

    ctx.font = "11px sans-serif";
    ctx.fillStyle = "rgba(240,165,0,0.7)";
    ctx.fillText(pt.luckyTitle, W / 2, elemY + 20);

    const items = [
      { label: pt.luckyColor, value: result.luckyColor, emoji: result.luckyColorEmoji },
      { label: pt.luckyNumber, value: result.luckyNumbers.join("·"), emoji: "🔢" },
      { label: pt.luckyDirection, value: result.luckyDirection, emoji: result.luckyDirectionEmoji },
      { label: pt.luckyFood, value: result.luckyFood, emoji: "🍽️" },
      { label: pt.luckyTime, value: result.luckyTime.split("(")[0] ?? "", emoji: "⏰" },
      { label: pt.accessory, value: result.accessory.split("、")[0] ?? result.accessory, emoji: "💎" },
    ];
    items.forEach((item, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const ix = 50 + col * 90;
      const iy = elemY + 44 + row * 50;
      ctx.font = "18px sans-serif";
      ctx.fillStyle = "#fff";
      ctx.fillText(item.emoji, ix, iy);
      ctx.font = "9px sans-serif";
      ctx.fillStyle = "rgba(240,200,120,0.45)";
      ctx.fillText(item.label, ix, iy + 14);
      ctx.font = "bold 11px serif";
      ctx.fillStyle = "#e8d5a3";
      ctx.fillText(item.value.slice(0, lang === "en" ? 10 : 5), ix, iy + 26);
    });

    // 咒语
    const mantY = 510;
    ctx.font = "13px serif";
    ctx.fillStyle = "rgba(255,215,0,0.8)";
    const mantraMax = lang === "en" ? 44 : 20;
    const mantraText = result.dailyMantra.length > mantraMax ? result.dailyMantra.slice(0, mantraMax) + "…" : result.dailyMantra;
    ctx.fillText(`"${mantraText}"`, W / 2, mantY);

    // 底部
    ctx.font = "11px sans-serif";
    ctx.fillStyle = "rgba(240,200,120,0.3)";
    ctx.fillText(pt.footer, W / 2, H - 24);
  }, [result, pt, lang]);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    const dateLocale = lang === "en" ? "en-US" : lang === "tw" ? "zh-TW" : "zh-CN";
    link.download = `${t.posterDownloadName}_${new Date().toLocaleDateString(dateLocale).replace(/\//g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="df-poster-overlay" onClick={onClose}>
      <div className="df-poster-wrap" onClick={e => e.stopPropagation()}>
        <canvas ref={canvasRef} className="df-poster-canvas" />
        <div className="df-poster-actions">
          <button className="df-poster-save" onClick={handleSave}>{t.posterSave}</button>
          <button className="df-poster-close" onClick={onClose}>{t.posterClose}</button>
        </div>
      </div>
    </div>
  );
}
