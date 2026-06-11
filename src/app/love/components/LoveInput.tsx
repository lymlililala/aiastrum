"use client";

import { useState, useEffect, useRef } from "react";
import { TRUST_REVIEWS, resolveTrustReview, type Lang } from "../love-data";
import type { LoveInput } from "../love-engine";
import type { LoveT } from "../love-i18n";

interface LoveInputProps {
  t: LoveT;
  lang: Lang;
  onSubmit: (input: LoveInput) => void;
  isLoading: boolean;
}

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 61 }, (_, i) => CURRENT_YEAR - 16 - i); // 16~76岁

export default function LoveInputComponent({ t, lang, onSubmit, isLoading }: LoveInputProps) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"female" | "male">("female");
  const [birthYear, setBirthYear] = useState(1995);
  const [birthMonth, setBirthMonth] = useState(6);
  const [birthDay, setBirthDay] = useState(15);
  const [reviewIdx, setReviewIdx] = useState(0);
  const reviewRef = useRef<HTMLDivElement>(null);

  // 信任背书滚动
  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIdx(prev => (prev + 1) % TRUST_REVIEWS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // 动态天数
  const daysInMonth = new Date(birthYear, birthMonth, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleSubmit = () => {
    onSubmit({ name: name || t.anonName, gender, birthYear, birthMonth, birthDay });
  };

  const review = resolveTrustReview(TRUST_REVIEWS[reviewIdx]!, lang);

  return (
    <div className="love-input-page">
      {/* Hero 区域 */}
      <div className="love-hero">
        {/* 星空粒子背景 */}
        <div className="love-stars">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="love-star"
              style={{
                left: `${(i * 17 + 7) % 100}%`,
                top:  `${(i * 23 + 11) % 100}%`,
                animationDelay: `${(i * 0.3) % 3}s`,
                width:  i % 3 === 0 ? "3px" : "2px",
                height: i % 3 === 0 ? "3px" : "2px",
              } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="love-hero-content">
          <div className="love-hero-symbol">✦</div>
          <h1 className="love-hero-title">{t.heroTitle}</h1>
          <p className="love-hero-subtitle">{t.heroSubtitle}</p>
          <div className="love-hero-divider">— ✦ —</div>
          <p className="love-hero-desc">
            {t.heroDescL1}
            <br />
            {t.heroDescL2}
          </p>

          {/* 数据标签 */}
          <div className="love-hero-stats">
            {[
              { num: "98.6%", label: t.statAccurate },
              { num: "10W+", label: t.statUsers },
              { num: "4.9★", label: t.statRating },
            ].map(s => (
              <div key={s.label} className="love-stat-item">
                <span className="love-stat-num">{s.num}</span>
                <span className="love-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 表单卡片 */}
      <div className="love-form-card">
        <div className="love-form-title">
          <span className="love-form-icon">✦</span>
          {t.formTitle}
        </div>
        <p className="love-form-subtitle">{t.formSubtitle}</p>

        {/* 姓名 */}
        <div className="love-field">
          <label className="love-label">{t.labelName}</label>
          <input
            type="text"
            placeholder={t.namePlaceholder}
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={10}
            className="love-text-input"
          />
        </div>

        {/* 性别 */}
        <div className="love-field">
          <label className="love-label">{t.labelGender}</label>
          <div className="love-gender-row">
            {[
              { value: "female", label: t.genderFemale, icon: "🌸" },
              { value: "male",   label: t.genderMale, icon: "🌙" },
            ].map(g => (
              <button
                key={g.value}
                onClick={() => setGender(g.value as "female" | "male")}
                className={`love-gender-btn ${gender === g.value ? "love-gender-active" : ""}`}
              >
                <span className="love-gender-icon">{g.icon}</span>
                <span>{g.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 出生日期 */}
        <div className="love-field">
          <label className="love-label">{t.labelBirth}</label>
          <div className="love-date-row">
            <div className="love-date-field">
              <select
                value={birthYear}
                onChange={e => setBirthYear(Number(e.target.value))}
                className="love-select"
              >
                {YEARS.map(y => (
                  <option key={y} value={y}>{y}{t.unitYear}</option>
                ))}
              </select>
            </div>
            <div className="love-date-field love-date-small">
              <select
                value={birthMonth}
                onChange={e => setBirthMonth(Number(e.target.value))}
                className="love-select"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                  <option key={m} value={m}>{m}{t.unitMonth}</option>
                ))}
              </select>
            </div>
            <div className="love-date-field love-date-small">
              <select
                value={birthDay}
                onChange={e => setBirthDay(Number(e.target.value))}
                className="love-select"
              >
                {days.map(d => (
                  <option key={d} value={d}>{d}{t.unitDay}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 提交按钮 */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="love-submit-btn"
        >
          {isLoading ? (
            <span className="love-btn-loading">
              <span className="love-spin">✦</span>
              {t.submitting}
            </span>
          ) : (
            t.submitBtn
          )}
        </button>

        <p className="love-form-note">
          {t.formNote}
        </p>
      </div>

      {/* 信任背书滚动条 */}
      <div className="love-trust-bar">
        <div className="love-trust-dot" />
        <div className="love-trust-text" ref={reviewRef}>
          <span className="love-trust-name">{review.name}</span>
          <span className="love-trust-time">{review.time}</span>
          <span className="love-trust-content">"{review.text}"</span>
        </div>
      </div>

      {/* 特性说明 */}
      <div className="love-features">
        {[
          { icon: "🔮", title: t.feat1Title, desc: t.feat1Desc },
          { icon: "💫", title: t.feat2Title, desc: t.feat2Desc },
          { icon: "🌸", title: t.feat3Title, desc: t.feat3Desc },
          { icon: "✨", title: t.feat4Title, desc: t.feat4Desc },
        ].map(f => (
          <div key={f.title} className="love-feature-item">
            <div className="love-feature-icon">{f.icon}</div>
            <div>
              <div className="love-feature-title">{f.title}</div>
              <div className="love-feature-desc">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 底部免责 */}
      <p className="love-disclaimer">
        {t.disclaimer}
      </p>
    </div>
  );
}
