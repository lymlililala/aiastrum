"use client";

import { useState, useEffect } from "react";
import { ZIWEI_REVIEWS } from "../ziwei-data";
import type { ZiweiInput } from "../ziwei-engine";
import type { ZiweiT, Lang } from "../ziwei-i18n";

interface ZiweiInputProps {
  onSubmit: (input: ZiweiInput) => void;
  isLoading: boolean;
  t: ZiweiT;
  lang: Lang;
}

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 91 }, (_, i) => CURRENT_YEAR - 16 - i); // 16~106岁
// 时辰为命理术语，保留中文；仅"不确定"为 chrome（value -1，标签由 t 提供）
const HOURS = [
  { value: 0,  label: "子时（23:00-00:59）" },
  { value: 2,  label: "丑时（01:00-02:59）" },
  { value: 4,  label: "寅时（03:00-04:59）" },
  { value: 6,  label: "卯时（05:00-06:59）" },
  { value: 8,  label: "辰时（07:00-08:59）" },
  { value: 10, label: "巳时（09:00-10:59）" },
  { value: 12, label: "午时（11:00-12:59）" },
  { value: 14, label: "未时（13:00-14:59）" },
  { value: 16, label: "申时（15:00-16:59）" },
  { value: 18, label: "酉时（17:00-18:59）" },
  { value: 20, label: "戌时（19:00-20:59）" },
  { value: 22, label: "亥时（21:00-22:59）" },
];

export default function ZiweiInputComponent({ onSubmit, isLoading, t }: ZiweiInputProps) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"female" | "male">("female");
  const [birthYear, setBirthYear]   = useState(1990);
  const [birthMonth, setBirthMonth] = useState(6);
  const [birthDay, setBirthDay]     = useState(15);
  const [birthHour, setBirthHour]   = useState(-1);
  const [isLunar, setIsLunar]       = useState(false);
  const [birthPlace, setBirthPlace] = useState("");
  const [reviewIdx, setReviewIdx]   = useState(0);
  const [showHourHelp, setShowHourHelp] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setReviewIdx(p => (p + 1) % ZIWEI_REVIEWS.length), 3200);
    return () => clearInterval(t);
  }, []);

  const daysInMonth = new Date(birthYear, birthMonth, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleSubmit = () => {
    onSubmit({ name: name || t.anonymous, gender, birthYear, birthMonth, birthDay, birthHour, isLunar, birthPlace });
  };

  const review = ZIWEI_REVIEWS[reviewIdx]!;

  return (
    <div className="zw-input-page">
      {/* Hero */}
      <div className="zw-hero">
        <div className="zw-hero-stars">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="zw-hero-star" style={{
              left: `${(i * 19 + 5) % 100}%`,
              top:  `${(i * 23 + 8) % 100}%`,
              animationDelay: `${(i * 0.35) % 3.5}s`,
            } as React.CSSProperties} />
          ))}
        </div>
        <div className="zw-hero-content">
          <div className="zw-hero-symbol">{t.heroSymbol}</div>
          <h1 className="zw-hero-title">{t.heroTitle}</h1>
          <p className="zw-hero-sub">{t.heroSub}</p>
          <div className="zw-hero-divider">{t.heroDivider}</div>
          <p className="zw-hero-desc">
            {t.heroDescL1}<br />
            {t.heroDescL2}
          </p>
          <div className="zw-hero-stats">
            {[
              { num: "14", label: t.statMainStar },
              { num: "12", label: t.statPalace },
              { num: "四化", label: t.statSiHua },
            ].map(s => (
              <div key={s.label} className="zw-stat">
                <span className="zw-stat-num">{s.num}</span>
                <span className="zw-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 表单 */}
      <div className="zw-form-card">
        <div className="zw-form-title">{t.formTitle}</div>

        {/* 名字 */}
        <div className="zw-field">
          <label className="zw-label">{t.fieldName}</label>
          <input className="zw-text-input" value={name} onChange={e => setName(e.target.value)}
            placeholder={t.namePlaceholder} maxLength={10} />
        </div>

        {/* 性别 */}
        <div className="zw-field">
          <label className="zw-label">{t.fieldGender}</label>
          <div className="zw-gender-row">
            {[{ v: "female", icon: "☽", label: t.genderFemale }, { v: "male", icon: "☉", label: t.genderMale }].map(g => (
              <button key={g.v} onClick={() => setGender(g.v as "female"|"male")}
                className={`zw-gender-btn ${gender === g.v ? "zw-gender-active" : ""}`}>
                <span>{g.icon}</span><span>{g.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 历法切换 */}
        <div className="zw-field">
          <div className="zw-calendar-toggle">
            <span className="zw-label" style={{ marginBottom: 0 }}>{t.fieldBirthDate}</span>
            <div className="zw-toggle-btns">
              <button onClick={() => setIsLunar(false)}
                className={`zw-toggle-btn ${!isLunar ? "zw-toggle-active" : ""}`}>{t.calSolar}</button>
              <button onClick={() => setIsLunar(true)}
                className={`zw-toggle-btn ${isLunar ? "zw-toggle-active" : ""}`}>{t.calLunar}</button>
            </div>
          </div>
          {isLunar && <p className="zw-calendar-note">{t.lunarNote}</p>}
          <div className="zw-date-row">
            <select value={birthYear} onChange={e => setBirthYear(Number(e.target.value))} className="zw-select">
              {YEARS.map(y => <option key={y} value={y}>{y}{t.unitYear}</option>)}
            </select>
            <select value={birthMonth} onChange={e => setBirthMonth(Number(e.target.value))} className="zw-select zw-select-sm">
              {Array.from({ length: 12 }, (_, i) => i + 1).map(m => <option key={m} value={m}>{m}{t.unitMonth}</option>)}
            </select>
            <select value={birthDay} onChange={e => setBirthDay(Number(e.target.value))} className="zw-select zw-select-sm">
              {days.map(d => <option key={d} value={d}>{d}{t.unitDay}</option>)}
            </select>
          </div>
        </div>

        {/* 时辰 */}
        <div className="zw-field">
          <div className="zw-hour-label-row">
            <label className="zw-label" style={{ marginBottom: 0 }}>{t.fieldBirthHour}</label>
            <button className="zw-help-btn" onClick={() => setShowHourHelp(p => !p)}>
              {showHourHelp ? t.hourHelpClose : t.hourHelpOpen}
            </button>
          </div>
          {showHourHelp && (
            <div className="zw-hour-help">
              <p>{t.hourHelpLine0}</p>
              <p>{t.hourHelpLine1}</p>
              <p>{t.hourHelpLine2}</p>
            </div>
          )}
          <select value={birthHour} onChange={e => setBirthHour(Number(e.target.value))} className="zw-select">
            <option value={-1}>{t.hourUnknown}</option>
            {HOURS.map(h => <option key={h.value} value={h.value}>{h.label}</option>)}
          </select>
        </div>

        {/* 出生地 */}
        <div className="zw-field">
          <label className="zw-label">{t.fieldBirthPlace}</label>
          <input className="zw-text-input" value={birthPlace} onChange={e => setBirthPlace(e.target.value)}
            placeholder={t.placePlaceholder} maxLength={20} />
          <p className="zw-field-note">{t.placeNote}</p>
        </div>

        {/* 提交 */}
        <button onClick={handleSubmit} disabled={isLoading} className="zw-submit-btn">
          {isLoading ? (
            <span className="zw-btn-loading"><span className="zw-spin">✦</span>{t.submitLoading}</span>
          ) : t.submit}
        </button>
        <p className="zw-form-note">{t.formNote}</p>
      </div>

      {/* ── 新手说明：怎么排盘（首次进入的用户也能立刻看懂） ── */}
      <div style={{
        margin: "28px auto 0", maxWidth: 480, width: "100%",
        background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.22)",
        borderRadius: 14, padding: "18px 20px", textAlign: "left",
      }}>
        <div style={{
          fontFamily: "var(--font-cinzel), serif", fontSize: "0.95rem",
          color: "#e8d5a3", letterSpacing: "0.06em", marginBottom: 12,
        }}>{t.howToTitle}</div>
        <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {t.howToSteps.map((s, i) => (
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

      {/* 信任背书 */}
      <div className="zw-trust-bar">
        <div className="zw-trust-dot" />
        <span className="zw-trust-name">{review.name}</span>
        <span className="zw-trust-content">&ldquo;{review.text}&rdquo;</span>
      </div>

      {/* 特性说明 */}
      <div className="zw-features">
        {[
          { icon: "🌟", title: t.feat1Title, desc: t.feat1Desc },
          { icon: "⚡", title: t.feat2Title, desc: t.feat2Desc },
          { icon: "💰", title: t.feat3Title, desc: t.feat3Desc },
          { icon: "💫", title: t.feat4Title, desc: t.feat4Desc },
        ].map(f => (
          <div key={f.title} className="zw-feature-item">
            <div className="zw-feature-icon">{f.icon}</div>
            <div>
              <div className="zw-feature-title">{f.title}</div>
              <div className="zw-feature-desc">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <p className="zw-disclaimer">
        {t.disclaimer}
      </p>

      {/* ── SEO 内容区 + FAQ（SSR 输出，爬虫可读） ── */}
      <section style={{ maxWidth: 720, margin: "48px auto 0", padding: "0 4px", textAlign: "left" }}>
        {t.seoSections.map((sec) => (
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
        }}>{t.faqTitle}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {t.faq.map((f) => (
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
  );
}
