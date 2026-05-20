"use client";

import { useState, useRef, useEffect } from "react";
import type { PersonInput, SynastryInput } from "../synastry-engine";
import type { RelationType } from "../synastry-data";
import { RELATION_TYPES } from "../synastry-data";
import { CITY_DATABASE } from "../../astro/astro-data";
import type { CityData } from "../../astro/astro-data";

interface Props {
  onSubmit: (data: SynastryInput) => void;
  loading?: boolean;
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

export default function SynastryInput({ onSubmit, loading }: Props) {
  const [step, setStep] = useState<Step>("relation");
  const [relationType, setRelationType] = useState<RelationType>("love");
  const [personA, setPersonA] = useState<PersonInput>({ ...EMPTY_PERSON });
  const [personB, setPersonB] = useState<PersonInput>({ ...EMPTY_PERSON });
  const [cityQuery, setCityQuery] = useState<{ a: string; b: string }>({ a: "北京", b: "北京" });
  const [citySuggestions, setCitySuggestions] = useState<{ a: CityData[]; b: CityData[] }>({ a: [], b: [] });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const cityDropRef = useRef<{ a: boolean; b: boolean }>({ a: false, b: false });

  // 城市搜索
  const handleCitySearch = (who: "a" | "b", q: string) => {
    setCityQuery((prev) => ({ ...prev, [who]: q }));
    if (q.length < 1) {
      setCitySuggestions((prev) => ({ ...prev, [who]: [] }));
      return;
    }
    const ql = q.toLowerCase();
    const results = CITY_DATABASE.filter(
      (c) => c.name.includes(q) || c.nameEn.toLowerCase().includes(ql) || c.country.includes(q)
    ).slice(0, 8);
    setCitySuggestions((prev) => ({ ...prev, [who]: results }));
    cityDropRef.current[who] = true;
  };

  const selectCity = (who: "a" | "b", city: CityData) => {
    setCityQuery((prev) => ({ ...prev, [who]: city.name }));
    setCitySuggestions((prev) => ({ ...prev, [who]: [] }));
    if (who === "a") setPersonA((p) => ({ ...p, city }));
    else setPersonB((p) => ({ ...p, city }));
  };

  // 验证当前步骤
  const validate = (current: Step): boolean => {
    const errs: Record<string, string> = {};
    if (current === "personA") {
      if (!personA.name.trim()) errs.aName = "请输入你的昵称";
      if (!personA.birthDate) errs.aDate = "请选择出生日期";
      if (!personA.unknownTime && !personA.birthTime) errs.aTime = "请输入出生时间或勾选'不知道'";
    }
    if (current === "personB") {
      if (!personB.name.trim()) errs.bName = "请输入TA的昵称";
      if (!personB.birthDate) errs.bDate = "请选择TA的出生日期";
      if (!personB.unknownTime && !personB.birthTime) errs.bTime = "请输入出生时间或勾选'不知道'";
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
    { key: "relation", label: "关系" },
    { key: "personA", label: "你" },
    { key: "personB", label: "TA" },
    { key: "confirm", label: "确认" },
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
            <h2 className="syn-step-title">你们是什么关系？</h2>
            <p className="syn-step-subtitle">选择想要探索的关系维度，星盘会为你量身解析</p>
            <div className="syn-relation-grid">
              {(Object.entries(RELATION_TYPES) as [RelationType, typeof RELATION_TYPES[RelationType]][]).map(([key, rel]) => (
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
              ))}
            </div>
          </div>
        )}

        {/* ===== STEP 2: 甲方信息 ===== */}
        {step === "personA" && (
          <PersonForm
            who="a"
            label="你的信息"
            subtitle="输入你自己的出生信息"
            person={personA}
            onChange={setPersonA}
            cityQuery={cityQuery.a}
            onCitySearch={(q) => handleCitySearch("a", q)}
            citySuggestions={citySuggestions.a}
            onSelectCity={(c) => selectCity("a", c)}
            errors={errors}
            prefix="a"
          />
        )}

        {/* ===== STEP 3: 乙方信息 ===== */}
        {step === "personB" && (
          <PersonForm
            who="b"
            label="TA 的信息"
            subtitle="输入对方的出生信息"
            person={personB}
            onChange={setPersonB}
            cityQuery={cityQuery.b}
            onCitySearch={(q) => handleCitySearch("b", q)}
            citySuggestions={citySuggestions.b}
            onSelectCity={(c) => selectCity("b", c)}
            errors={errors}
            prefix="b"
          />
        )}

        {/* ===== STEP 4: 确认 ===== */}
        {step === "confirm" && (
          <div className="syn-step-content">
            <h2 className="syn-step-title">开始合盘？</h2>
            <p className="syn-step-subtitle">确认信息无误后，星盘将为你解析两人的宇宙缘分</p>

            <div className="syn-confirm-cards">
              <ConfirmCard person={personA} label="你" />
              <div className="syn-confirm-vs">
                <span className="syn-vs-text">{RELATION_TYPES[relationType].icon}</span>
                <span className="syn-vs-label">{RELATION_TYPES[relationType].label}</span>
              </div>
              <ConfirmCard person={personB} label="TA" />
            </div>

            <p className="syn-confirm-note">
              ✨ 合盘将分析两人的行星相位、计算契合度评分，并生成专属解析
            </p>
          </div>
        )}

        {/* 导航按钮 */}
        <div className="syn-nav-btns">
          {step !== "relation" && (
            <button className="syn-btn-back" onClick={prevStep}>
              ← 上一步
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
              ? "计算中..."
              : step === "confirm"
              ? "✨ 开始合盘"
              : "下一步 →"}
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
}

function PersonForm({
  label, subtitle, person, onChange, cityQuery, onCitySearch, citySuggestions, onSelectCity, errors, prefix,
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
          <label className="syn-label">昵称</label>
          <input
            className={`syn-input ${errors[`${prefix}Name`] ? "error" : ""}`}
            placeholder="输入昵称（如：小雨）"
            value={person.name}
            onChange={(e) => onChange({ ...person, name: e.target.value })}
            maxLength={10}
          />
          {errors[`${prefix}Name`] && <span className="syn-error">{errors[`${prefix}Name`]}</span>}
        </div>

        {/* 出生日期 */}
        <div className="syn-form-row">
          <label className="syn-label">出生日期</label>
          <label className={`syn-picker-card ${errors[`${prefix}Date`] ? "error" : ""}`} style={{ cursor: "pointer" }}>
            <span className="syn-picker-icon">📅</span>
            <span className={`syn-picker-value ${!person.birthDate ? "syn-picker-value--placeholder" : ""}`}>
              {person.birthDate ? person.birthDate.replace(/-/g, " / ") : "点击选择日期"}
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
          <label className="syn-label">出生时间</label>
          <label
            className={`syn-picker-card ${person.unknownTime ? "disabled" : ""} ${errors[`${prefix}Time`] ? "error" : ""}`}
            style={{ cursor: person.unknownTime ? "not-allowed" : "pointer" }}
          >
            <span className="syn-picker-icon">🕐</span>
            <span className={`syn-picker-value ${!person.birthTime ? "syn-picker-value--placeholder" : ""}`}
              style={{ opacity: person.unknownTime ? 0.35 : 1 }}>
              {person.birthTime || "点击选择时间"}
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
              {person.unknownTime ? "已跳过时间（仍可解析核心相位）" : "不知道出生时间"}
            </span>
          </button>
          {!person.unknownTime && (
            <p className="syn-hint">输入时间可计算上升星座，让解析更精准</p>
          )}
          {errors[`${prefix}Time`] && <span className="syn-error">{errors[`${prefix}Time`]}</span>}
        </div>

        {/* 出生城市 */}
        <div className="syn-form-row">
          <label className="syn-label">出生城市</label>
          <div className="syn-city-wrap" onClick={(e) => e.stopPropagation()}>
            <input
              className="syn-input"
              placeholder="搜索城市..."
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
                    <span className="syn-city-name">{c.name}</span>
                    <span className="syn-city-country">{c.country}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className="syn-hint">影响宫位和上升星座的计算</p>
        </div>
      </div>
    </div>
  );
}

// ===== 确认卡片 =====
function ConfirmCard({ person, label }: { person: PersonInput; label: string }) {
  return (
    <div className="syn-confirm-person">
      <div className="syn-confirm-avatar">{label === "你" ? "🌙" : "⭐"}</div>
      <div className="syn-confirm-name">{person.name || "（未填写）"}</div>
      <div className="syn-confirm-date">{person.birthDate || "—"}</div>
      {!person.unknownTime && person.birthTime && (
        <div className="syn-confirm-time">{person.birthTime}</div>
      )}
      <div className="syn-confirm-city">{person.city.name}</div>
    </div>
  );
}
