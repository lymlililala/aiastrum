"use client";

import { useState, useEffect } from "react";
import { QUESTION_CATEGORIES } from "../meihua-data";
import type { DivinationMethod, MeihuaInput } from "../meihua-engine";
import type { Lang, MeihuaT } from "../meihua-i18n";

interface MeihuaInputProps {
  lang: Lang;
  t: MeihuaT;
  onSubmit: (input: MeihuaInput) => void;
  isLoading: boolean;
}

export default function MeihuaInputComponent({ lang, t, onSubmit, isLoading }: MeihuaInputProps) {
  const [method, setMethod] = useState<DivinationMethod>("time");
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("general");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);

  const dateLocale = lang === "en" ? "en-US" : lang === "tw" ? "zh-TW" : "zh-CN";

  // 实时更新当前时间
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString(dateLocale, {
        month: "long", day: "numeric",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
      }));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [dateLocale]);

  const handleSubmit = () => {
    if (method === "number") {
      const n1 = parseInt(num1);
      const n2 = parseInt(num2);
      if (!num1 || !num2 || isNaN(n1) || isNaN(n2) || n1 <= 0 || n2 <= 0) {
        setInputError(t.numberErr);
        return;
      }
      setInputError(null);
      onSubmit({ method, question, category, num1: n1, num2: n2 });
    } else if (method === "time") {
      const now = new Date();
      onSubmit({
        method, question, category,
        hour: now.getHours(),
        lunarYear: now.getFullYear(),
        lunarMonth: now.getMonth() + 1,
        lunarDay: now.getDate(),
      });
    } else {
      onSubmit({ method, question, category });
    }
  };

  return (
    <div className="meihua-input-container">
      {/* 标题区 */}
      <div className="meihua-title-block">
        <div className="meihua-plum-icon">✿</div>
        <h1 className="meihua-main-title">{t.inputTitle}</h1>
        <p className="meihua-subtitle">{t.inputSubtitle}</p>
        <div className="meihua-divider-ornament">— ✦ —</div>
        <p className="meihua-intro">
          {t.inputIntroL1}<br />
          {t.inputIntroL2}
        </p>
      </div>

      {/* 占问事项（可选） */}
      <div className="meihua-field-group">
        <label className="meihua-label">
          <span className="meihua-label-icon">◎</span>
          {t.questionLabel}
          <span className="meihua-optional">{t.questionOptional}</span>
        </label>
        <input
          type="text"
          placeholder={t.questionPlaceholder}
          value={question}
          onChange={e => setQuestion(e.target.value)}
          maxLength={50}
          className="meihua-text-input"
        />
      </div>

      {/* 事项分类 */}
      <div className="meihua-field-group">
        <label className="meihua-label">
          <span className="meihua-label-icon">◈</span>
          {t.categoryLabel}
        </label>
        <div className="meihua-category-grid">
          {QUESTION_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`meihua-category-btn ${category === cat.id ? "meihua-category-active" : ""}`}
            >
              <span className="meihua-category-icon">{cat.icon}</span>
              <span>{t.catLabels[cat.id] ?? cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 起卦方式 */}
      <div className="meihua-field-group">
        <label className="meihua-label">
          <span className="meihua-label-icon">☯</span>
          {t.methodLabel}
        </label>
        <div className="meihua-method-tabs">
          {[
            { key: "time",   label: t.methodTime,   sub: t.methodTimeSub },
            { key: "number", label: t.methodNumber, sub: t.methodNumberSub },
            { key: "random", label: t.methodRandom, sub: t.methodRandomSub },
          ].map(m => (
            <button
              key={m.key}
              onClick={() => setMethod(m.key as DivinationMethod)}
              className={`meihua-method-tab ${method === m.key ? "meihua-method-active" : ""}`}
            >
              <span className="meihua-method-label">{m.label}</span>
              <span className="meihua-method-sub">{m.sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 方式说明/输入区 */}
      {method === "time" && (
        <div className="meihua-method-info">
          <div className="meihua-time-display">
            <span className="meihua-time-icon">◷</span>
            <span className="meihua-time-text">{currentTime}</span>
          </div>
          <p className="meihua-method-desc">
            {t.timeDesc}<br />
            {t.timeFormula}
          </p>
        </div>
      )}

      {method === "number" && (
        <div className="meihua-method-info">
          <p className="meihua-method-desc">
            {t.numberDesc}
          </p>
          <div className="meihua-number-inputs">
            <div className="meihua-number-field">
              <label className="meihua-number-label">{t.numFirstLabel}</label>
              <input
                type="number"
                min="1"
                placeholder={t.numPlaceholder}
                value={num1}
                onChange={e => setNum1(e.target.value)}
                className="meihua-num-input"
              />
            </div>
            <div className="meihua-number-divider">×</div>
            <div className="meihua-number-field">
              <label className="meihua-number-label">{t.numSecondLabel}</label>
              <input
                type="number"
                min="1"
                placeholder={t.numPlaceholder}
                value={num2}
                onChange={e => setNum2(e.target.value)}
                className="meihua-num-input"
              />
            </div>
          </div>
          {inputError && (
            <p style={{ color: "rgba(255,140,120,0.9)", fontSize: "0.78rem", marginTop: 6 }}>⚠ {inputError}</p>
          )}
          <p className="meihua-method-calc">
            {t.numberCalc}
          </p>
        </div>
      )}

      {method === "random" && (
        <div className="meihua-method-info meihua-random-info">
          <div className="meihua-taiji-spin">☯</div>
          <p className="meihua-method-desc">
            {t.randomDescL1}<br />
            {t.randomDescL2}<br />
            {t.randomDescL3}
          </p>
          <p className="meihua-quote">{t.randomQuote}</p>
        </div>
      )}

      {/* 起卦按钮 */}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="meihua-submit-btn"
      >
        {isLoading ? (
          <span className="meihua-btn-loading">
            <span className="meihua-spin-icon">✿</span>
            {t.casting}
          </span>
        ) : (
          <span>
            {method === "time" ? t.castTime : method === "number" ? t.castNumber : t.castRandom}
          </span>
        )}
      </button>

      {/* 先天八卦数诀小卡 */}
      <div className="meihua-quick-ref">
        <p className="meihua-quick-ref-title">{t.quickRefTitle}</p>
        <div className="meihua-bagua-row">
          {[
            { sym: "☰", name: "乾", num: "一", wx: "金" },
            { sym: "☱", name: "兑", num: "二", wx: "金" },
            { sym: "☲", name: "离", num: "三", wx: "火" },
            { sym: "☳", name: "震", num: "四", wx: "木" },
            { sym: "☴", name: "巽", num: "五", wx: "木" },
            { sym: "☵", name: "坎", num: "六", wx: "水" },
            { sym: "☶", name: "艮", num: "七", wx: "土" },
            { sym: "☷", name: "坤", num: "八", wx: "土" },
          ].map(g => (
            <div key={g.name} className="meihua-bagua-item">
              <span className="meihua-bagua-sym">{g.sym}</span>
              <span className="meihua-bagua-name">{g.name}</span>
              <span className="meihua-bagua-num">{g.num}</span>
              <span className={`meihua-bagua-wx meihua-wx-${g.wx}`}>{g.wx}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
