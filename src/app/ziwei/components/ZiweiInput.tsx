"use client";

import { useState, useEffect } from "react";
import { ZIWEI_REVIEWS } from "../ziwei-data";
import type { ZiweiInput } from "../ziwei-engine";

interface ZiweiInputProps {
  onSubmit: (input: ZiweiInput) => void;
  isLoading: boolean;
}

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 91 }, (_, i) => CURRENT_YEAR - 16 - i); // 16~106岁
const HOURS = [
  { value: -1, label: "不确定（选此项提供前三柱排盘）" },
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

export default function ZiweiInputComponent({ onSubmit, isLoading }: ZiweiInputProps) {
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
    onSubmit({ name: name || "匿名", gender, birthYear, birthMonth, birthDay, birthHour, isLunar, birthPlace });
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
          <div className="zw-hero-symbol">紫</div>
          <h1 className="zw-hero-title">探索你的东方星盘</h1>
          <p className="zw-hero-sub">预见人生的具象轨迹</p>
          <div className="zw-hero-divider">— 紫微斗数 · 东方占星术 —</div>
          <p className="zw-hero-desc">
            比八字更具象，比星座更全面<br />
            十四主星解析你的财富、事业与姻缘密码
          </p>
          <div className="zw-hero-stats">
            {[
              { num: "14", label: "主星" },
              { num: "12", label: "宫位" },
              { num: "四化", label: "飞星" },
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
        <div className="zw-form-title">✦ 填写出生信息排盘</div>

        {/* 名字 */}
        <div className="zw-field">
          <label className="zw-label">称呼（可填化名）</label>
          <input className="zw-text-input" value={name} onChange={e => setName(e.target.value)}
            placeholder="如：子晴、阿墨…" maxLength={10} />
        </div>

        {/* 性别 */}
        <div className="zw-field">
          <label className="zw-label">性别</label>
          <div className="zw-gender-row">
            {[{ v: "female", icon: "☽", label: "坤命（女）" }, { v: "male", icon: "☉", label: "乾命（男）" }].map(g => (
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
            <span className="zw-label" style={{ marginBottom: 0 }}>出生日期</span>
            <div className="zw-toggle-btns">
              <button onClick={() => setIsLunar(false)}
                className={`zw-toggle-btn ${!isLunar ? "zw-toggle-active" : ""}`}>公历</button>
              <button onClick={() => setIsLunar(true)}
                className={`zw-toggle-btn ${isLunar ? "zw-toggle-active" : ""}`}>农历</button>
            </div>
          </div>
          {isLunar && <p className="zw-calendar-note">⚠ 农历转换中，若有闰月请选择后一个月</p>}
          <div className="zw-date-row">
            <select value={birthYear} onChange={e => setBirthYear(Number(e.target.value))} className="zw-select">
              {YEARS.map(y => <option key={y} value={y}>{y}年</option>)}
            </select>
            <select value={birthMonth} onChange={e => setBirthMonth(Number(e.target.value))} className="zw-select zw-select-sm">
              {Array.from({ length: 12 }, (_, i) => i + 1).map(m => <option key={m} value={m}>{m}月</option>)}
            </select>
            <select value={birthDay} onChange={e => setBirthDay(Number(e.target.value))} className="zw-select zw-select-sm">
              {days.map(d => <option key={d} value={d}>{d}日</option>)}
            </select>
          </div>
        </div>

        {/* 时辰 */}
        <div className="zw-field">
          <div className="zw-hour-label-row">
            <label className="zw-label" style={{ marginBottom: 0 }}>出生时辰</label>
            <button className="zw-help-btn" onClick={() => setShowHourHelp(p => !p)}>
              {showHourHelp ? "收起" : "? 不知道时辰"}
            </button>
          </div>
          {showHourHelp && (
            <div className="zw-hour-help">
              <p>不知道出生时辰？有以下两个方案：</p>
              <p>① 选择&ldquo;不确定&rdquo;，系统将提供前三柱（年月日）的基础排盘；</p>
              <p>② 询问父母或查看出生医院记录，时辰对命宫定位至关重要。</p>
            </div>
          )}
          <select value={birthHour} onChange={e => setBirthHour(Number(e.target.value))} className="zw-select">
            {HOURS.map(h => <option key={h.value} value={h.value}>{h.label}</option>)}
          </select>
        </div>

        {/* 出生地 */}
        <div className="zw-field">
          <label className="zw-label">出生地（选填，用于真太阳时校准）</label>
          <input className="zw-text-input" value={birthPlace} onChange={e => setBirthPlace(e.target.value)}
            placeholder="如：北京、上海、广州…" maxLength={20} />
          <p className="zw-field-note">填写出生地可提升时辰精准度，体现专业排盘品质</p>
        </div>

        {/* 提交 */}
        <button onClick={handleSubmit} disabled={isLoading} className="zw-submit-btn">
          {isLoading ? (
            <span className="zw-btn-loading"><span className="zw-spin">✦</span>排盘中…</span>
          ) : "✦ 免费生成我的东方星盘"}
        </button>
        <p className="zw-form-note">星盘包含：十二宫排盘 · 命格总评 · 性格标签（完整解读需解锁）</p>
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
          { icon: "🌟", title: "精准十四主星排盘", desc: "还原完整的十二宫格，呈现命运格局的核心骨架" },
          { icon: "⚡", title: "四化飞星分析", desc: "禄权科忌飞布各宫，揭示人生的机遇与挑战" },
          { icon: "💰", title: "财富事业深度解读", desc: "命盘揭示你的财富密码与最适合的事业赛道" },
          { icon: "💫", title: "大限流年运势", desc: "十年大限与当年流年，预见人生的具象轨迹" },
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
        ⚠ 本测算结果仅供传统文化参考与个人探索，请理性看待，切勿过度依赖命理结果进行重大决策。
      </p>
    </div>
  );
}
