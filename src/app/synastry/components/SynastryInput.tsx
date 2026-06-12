"use client";

import { useState, useRef, useEffect } from "react";
import type { PersonInput, SynastryInput } from "../synastry-engine";
import type { RelationType } from "../synastry-data";
import { RELATION_TYPES, getRelationType } from "../synastry-data";
import { searchCities } from "../../astro/astro-data";
import { cityLabel, countryLabel, type CityData } from "../../astro/astro-data";
import type { SynT, SynLang } from "../synastry-i18n";

interface Props {
  onSubmit: (data: SynastryInput) => void;
  loading?: boolean;
  t: SynT;
  lang: SynLang;
}

type Step = "relation" | "personA" | "personB" | "confirm";

const DEFAULT_CITY: CityData = { name: "北京", nameEn: "Beijing", lat: 39.9042, lng: 116.4074, timezone: "Asia/Shanghai", country: "中国" };

const EMPTY_PERSON: PersonInput = {
  name: "",
  birthDate: "",
  birthTime: "",
  unknownTime: false,
  city: DEFAULT_CITY,
};

export default function SynastryInput({ onSubmit, loading, t, lang }: Props) {
  const [step, setStep] = useState<Step>("relation");
  const [relationType, setRelationType] = useState<RelationType>("love");
  const [personA, setPersonA] = useState<PersonInput>({ ...EMPTY_PERSON });
  const [personB, setPersonB] = useState<PersonInput>({ ...EMPTY_PERSON });
  const [cityQuery, setCityQuery] = useState<{ a: string; b: string }>({ a: lang === "en" ? "Beijing" : "北京", b: lang === "en" ? "Beijing" : "北京" });
  const [citySuggestions, setCitySuggestions] = useState<{ a: CityData[]; b: CityData[] }>({ a: [], b: [] });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const cityDropRef = useRef<{ a: boolean; b: boolean }>({ a: false, b: false });

  // 城市输入框显示名随语言切换：useState 初值在首屏 lang 仍为默认 zh 时只取一次，
  // 之后 cookie 把 lang 校正为 en/tw 也不会更新，导致默认「北京」在英文下不变。
  // 用 effect 把输入框同步为「已选城市在当前语言下的名称」（默认北京 → EN 显示 Beijing）。
  useEffect(() => {
    setCityQuery({ a: cityLabel(personA.city, lang), b: cityLabel(personB.city, lang) });
  }, [lang, personA.city, personB.city]);

  // 城市搜索
  const handleCitySearch = (who: "a" | "b", q: string) => {
    setCityQuery((prev) => ({ ...prev, [who]: q }));
    if (q.length < 1) {
      setCitySuggestions((prev) => ({ ...prev, [who]: [] }));
      return;
    }
    const results = searchCities(q).slice(0, 8);
    setCitySuggestions((prev) => ({ ...prev, [who]: results }));
    cityDropRef.current[who] = true;
  };

  const selectCity = (who: "a" | "b", city: CityData) => {
    setCityQuery((prev) => ({ ...prev, [who]: cityLabel(city, lang) }));
    setCitySuggestions((prev) => ({ ...prev, [who]: [] }));
    if (who === "a") setPersonA((p) => ({ ...p, city }));
    else setPersonB((p) => ({ ...p, city }));
  };

  // 验证当前步骤
  const validate = (current: Step): boolean => {
    const errs: Record<string, string> = {};
    if (current === "personA") {
      if (!personA.name.trim()) errs.aName = t.errAName;
      if (!personA.birthDate) errs.aDate = t.errADate;
      if (!personA.unknownTime && !personA.birthTime) errs.aTime = t.errATime;
    }
    if (current === "personB") {
      if (!personB.name.trim()) errs.bName = t.errBName;
      if (!personB.birthDate) errs.bDate = t.errBDate;
      if (!personB.unknownTime && !personB.birthTime) errs.bTime = t.errBTime;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (step === "relation") { setStep("personA"); return; }
    if (step === "personA") {
      if (!validate("personA")) return;
      setStep("personB");
      return;
    }
    if (step === "personB") {
      if (!validate("personB")) return;
      setStep("confirm");
      return;
    }
    if (step === "confirm") {
      onSubmit({ personA, personB, relationType });
    }
  };

  const prevStep = () => {
    if (step === "personA") setStep("relation");
    if (step === "personB") setStep("personA");
    if (step === "confirm") setStep("personB");
  };

  // 步骤指示器
  const steps: { key: Step; label: string }[] = [
    { key: "relation", label: t.stepRelation },
    { key: "personA", label: t.stepYou },
    { key: "personB", label: t.stepTa },
    { key: "confirm", label: t.stepConfirm },
  ];
  const stepIdx = steps.findIndex((s) => s.key === step);

  return (
    <div className="syn-input-container">
      {/* 步骤指示器 */}
      <div className="syn-steps">
        {steps.map((s, i) => (
          <div key={s.key} className={`syn-step ${i <= stepIdx ? "active" : ""} ${s.key === step ? "current" : ""}`}>
            <div className="syn-step-dot">{i < stepIdx ? "✓" : i + 1}</div>
            <span className="syn-step-label">{s.label}</span>
            {i < steps.length - 1 && <div className="syn-step-line" />}
          </div>
        ))}
      </div>

      <div className="syn-input-card">
        {/* ===== STEP 1: 选择关系类型 ===== */}
        {step === "relation" && (
          <div className="syn-step-content">
            <h2 className="syn-step-title">{t.relationTitle}</h2>
            <p className="syn-step-subtitle">{t.relationSubtitle}</p>
            <div className="syn-relation-grid">
              {(Object.keys(RELATION_TYPES) as RelationType[]).map((key) => {
                const rel = getRelationType(key, lang);
                return (
                <button
                  key={key}
                  className={`syn-relation-card ${relationType === key ? "selected" : ""}`}
                  onClick={() => setRelationType(key)}
                  style={{
                    "--rel-color": rel.color,
                    "--rel-from": rel.gradientFrom,
                    "--rel-to": rel.gradientTo,
                  } as React.CSSProperties}
                >
                  <span className="syn-rel-icon">{rel.icon}</span>
                  <span className="syn-rel-label">{rel.label}</span>
                  <span className="syn-rel-desc">{rel.desc}</span>
                </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== STEP 2: 甲方信息 ===== */}
        {step === "personA" && (
          <PersonForm
            who="a"
            label={t.personATitle}
            subtitle={t.personASubtitle}
            person={personA}
            onChange={setPersonA}
            cityQuery={cityQuery.a}
            onCitySearch={(q) => handleCitySearch("a", q)}
            citySuggestions={citySuggestions.a}
            onSelectCity={(c) => selectCity("a", c)}
            errors={errors}
            prefix="a"
            t={t}
            lang={lang}
          />
        )}

        {/* ===== STEP 3: 乙方信息 ===== */}
        {step === "personB" && (
          <PersonForm
            who="b"
            label={t.personBTitle}
            subtitle={t.personBSubtitle}
            person={personB}
            onChange={setPersonB}
            cityQuery={cityQuery.b}
            onCitySearch={(q) => handleCitySearch("b", q)}
            citySuggestions={citySuggestions.b}
            onSelectCity={(c) => selectCity("b", c)}
            errors={errors}
            prefix="b"
            t={t}
            lang={lang}
          />
        )}

        {/* ===== STEP 4: 确认 ===== */}
        {step === "confirm" && (
          <div className="syn-step-content">
            <h2 className="syn-step-title">{t.confirmTitle}</h2>
            <p className="syn-step-subtitle">{t.confirmSubtitle}</p>

            <div className="syn-confirm-cards">
              <ConfirmCard person={personA} side="a" t={t} lang={lang} />
              <div className="syn-confirm-vs">
                <span className="syn-vs-text">{RELATION_TYPES[relationType].icon}</span>
                <span className="syn-vs-label">{getRelationType(relationType, lang).label}</span>
              </div>
              <ConfirmCard person={personB} side="b" t={t} lang={lang} />
            </div>

            <p className="syn-confirm-note">
              {t.confirmNote}
            </p>
          </div>
        )}

        {/* 导航按钮 */}
        <div className="syn-nav-btns">
          {step !== "relation" && (
            <button className="syn-btn-back" onClick={prevStep}>
              {t.btnBack}
            </button>
          )}
          <button
            className="syn-btn-next"
            onClick={nextStep}
            disabled={loading}
            style={{
              background: step === "confirm"
                ? `linear-gradient(135deg, ${RELATION_TYPES[relationType].gradientFrom}, ${RELATION_TYPES[relationType].gradientTo})`
                : undefined,
            }}
          >
            {loading
              ? t.btnCalc
              : step === "confirm"
              ? t.btnStart
              : t.btnNext}
          </button>
        </div>
      </div>
    </div>
  );
}

// ===== 人员信息表单 =====
interface PersonFormProps {
  who: "a" | "b";
  label: string;
  subtitle: string;
  person: PersonInput;
  onChange: (p: PersonInput) => void;
  cityQuery: string;
  onCitySearch: (q: string) => void;
  citySuggestions: CityData[];
  onSelectCity: (c: CityData) => void;
  errors: Record<string, string>;
  prefix: "a" | "b";
  t: SynT;
  lang: SynLang;
}

function PersonForm({
  label, subtitle, person, onChange, cityQuery, onCitySearch, citySuggestions, onSelectCity, errors, prefix, t, lang,
}: PersonFormProps) {
  const [showCityDrop, setShowCityDrop] = useState(false);

  // 关闭下拉框的点击外部监听
  useEffect(() => {
    const handle = () => setShowCityDrop(false);
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);

  return (
    <div className="syn-step-content">
      <h2 className="syn-step-title">{label}</h2>
      <p className="syn-step-subtitle">{subtitle}</p>

      <div className="syn-form">
        {/* 昵称 */}
        <div className="syn-form-row">
          <label className="syn-label">{t.fieldNickname}</label>
          <input
            className={`syn-input ${errors[`${prefix}Name`] ? "error" : ""}`}
            placeholder={t.nicknamePlaceholder}
            value={person.name}
            onChange={(e) => onChange({ ...person, name: e.target.value })}
            maxLength={10}
          />
          {errors[`${prefix}Name`] && <span className="syn-error">{errors[`${prefix}Name`]}</span>}
        </div>

        {/* 出生日期 */}
        <div className="syn-form-row">
          <label className="syn-label">{t.fieldBirthDate}</label>
          <label className={`syn-picker-card ${errors[`${prefix}Date`] ? "error" : ""}`} style={{ cursor: "pointer" }}>
            <span className="syn-picker-icon">📅</span>
            <span className={`syn-picker-value ${!person.birthDate ? "syn-picker-value--placeholder" : ""}`}>
              {person.birthDate ? person.birthDate.replace(/-/g, " / ") : t.pickDate}
            </span>
            <span className="syn-picker-arrow">›</span>
            <input
              type="date"
              value={person.birthDate}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => onChange({ ...person, birthDate: e.target.value })}
              className="syn-picker-hidden-input"
            />
          </label>
          {errors[`${prefix}Date`] && <span className="syn-error">{errors[`${prefix}Date`]}</span>}
        </div>

        {/* 出生时间 */}
        <div className="syn-form-row">
          <label className="syn-label">{t.fieldBirthTime}</label>
          <label
            className={`syn-picker-card ${person.unknownTime ? "disabled" : ""} ${errors[`${prefix}Time`] ? "error" : ""}`}
            style={{ cursor: person.unknownTime ? "not-allowed" : "pointer" }}
          >
            <span className="syn-picker-icon">🕐</span>
            <span className={`syn-picker-value ${!person.birthTime ? "syn-picker-value--placeholder" : ""}`}
              style={{ opacity: person.unknownTime ? 0.35 : 1 }}>
              {person.birthTime || t.pickTime}
            </span>
            <span className="syn-picker-arrow">›</span>
            <input
              type="time"
              value={person.birthTime}
              disabled={person.unknownTime}
              onChange={(e) => onChange({ ...person, birthTime: e.target.value })}
              className="syn-picker-hidden-input"
            />
          </label>
          <button
            type="button"
            className={`syn-toggle-btn ${person.unknownTime ? "active" : ""}`}
            onClick={() => onChange({ ...person, unknownTime: !person.unknownTime, birthTime: "" })}
          >
            <span className={`syn-toggle-dot ${person.unknownTime ? "on" : ""}`} />
            <span className="syn-toggle-label">
              {person.unknownTime ? t.timeSkipped : t.timeUnknown}
            </span>
          </button>
          {!person.unknownTime && (
            <p className="syn-hint">{t.timeHint}</p>
          )}
          {errors[`${prefix}Time`] && <span className="syn-error">{errors[`${prefix}Time`]}</span>}
        </div>

        {/* 出生城市 */}
        <div className="syn-form-row">
          <label className="syn-label">{t.fieldBirthCity}</label>
          <div className="syn-city-wrap" onClick={(e) => e.stopPropagation()}>
            <input
              className="syn-input"
              placeholder={t.cityPlaceholder}
              value={cityQuery}
              onChange={(e) => {
                onCitySearch(e.target.value);
                setShowCityDrop(true);
              }}
              onFocus={() => {
                onCitySearch(cityQuery);
                setShowCityDrop(true);
              }}
            />
            {showCityDrop && citySuggestions.length > 0 && (
              <ul className="syn-city-dropdown">
                {citySuggestions.map((c) => (
                  <li
                    key={`${c.nameEn}-${c.country}`}
                    className="syn-city-option"
                    onMouseDown={() => {
                      onSelectCity(c);
                      setShowCityDrop(false);
                    }}
                  >
                    <span className="syn-city-name">{cityLabel(c, lang)}</span>
                    <span className="syn-city-country">{countryLabel(c.country, lang)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className="syn-hint">{t.cityHint}</p>
        </div>
      </div>
    </div>
  );
}

// ===== 确认卡片 =====
function ConfirmCard({ person, side, t, lang }: { person: PersonInput; side: "a" | "b"; t: SynT; lang: SynLang }) {
  return (
    <div className="syn-confirm-person">
      <div className="syn-confirm-avatar">{side === "a" ? "🌙" : "⭐"}</div>
      <div className="syn-confirm-name">{person.name || t.confirmEmpty}</div>
      <div className="syn-confirm-date">{person.birthDate || "—"}</div>
      {!person.unknownTime && person.birthTime && (
        <div className="syn-confirm-time">{person.birthTime}</div>
      )}
      <div className="syn-confirm-city">{cityLabel(person.city, lang)}</div>
    </div>
  );
}
