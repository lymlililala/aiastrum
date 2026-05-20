"use client";

import { useState, useEffect, useRef } from "react";
import { TRUST_REVIEWS } from "../love-data";
import type { LoveInput } from "../love-engine";

interface LoveInputProps {
  onSubmit: (input: LoveInput) => void;
  isLoading: boolean;
}

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 61 }, (_, i) => CURRENT_YEAR - 16 - i); // 16~76岁

export default function LoveInputComponent({ onSubmit, isLoading }: LoveInputProps) {
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
    onSubmit({ name: name || "匿名", gender, birthYear, birthMonth, birthDay });
  };

  const review = TRUST_REVIEWS[reviewIdx]!;

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
          <h1 className="love-hero-title">揭秘你的命中注定</h1>
          <p className="love-hero-subtitle">星盘 · 八字 · 紫微 · 三维感情解析</p>
          <div className="love-hero-divider">— ✦ —</div>
          <p className="love-hero-desc">
            结合东方命理与西方占星，
            <br />
            为你解读专属姻缘密码，找到命中注定的那个人
          </p>

          {/* 数据标签 */}
          <div className="love-hero-stats">
            {[
              { num: "98.6%", label: "用户觉得准确" },
              { num: "10W+", label: "已测算人数" },
              { num: "4.9★", label: "综合评分" },
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
          填写你的信息
        </div>
        <p className="love-form-subtitle">支持化名，信息仅用于生成专属报告</p>

        {/* 姓名 */}
        <div className="love-field">
          <label className="love-label">称呼/姓名（可填化名）</label>
          <input
            type="text"
            placeholder="如：小鱼、阿晴… 或你的真实姓名"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={10}
            className="love-text-input"
          />
        </div>

        {/* 性别 */}
        <div className="love-field">
          <label className="love-label">性别</label>
          <div className="love-gender-row">
            {[
              { value: "female", label: "♀ 女生", icon: "🌸" },
              { value: "male",   label: "♂ 男生", icon: "🌙" },
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
          <label className="love-label">公历出生日期</label>
          <div className="love-date-row">
            <div className="love-date-field">
              <select
                value={birthYear}
                onChange={e => setBirthYear(Number(e.target.value))}
                className="love-select"
              >
                {YEARS.map(y => (
                  <option key={y} value={y}>{y}年</option>
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
                  <option key={m} value={m}>{m}月</option>
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
                  <option key={d} value={d}>{d}日</option>
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
              正在测算中…
            </span>
          ) : (
            "✦ 免费测算我的姻缘"
          )}
        </button>

        <p className="love-form-note">
          测算结果包含：姻缘指数 · 性格特质 · 近期桃花运 · 正缘画像（部分内容需解锁）
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
          { icon: "🔮", title: "三维星盘解析", desc: "融合东西方命理，多维度精准解读你的姻缘密码" },
          { icon: "💫", title: "专属正缘画像", desc: "基于你的命盘描绘命中注定之人的特征与相遇方式" },
          { icon: "🌸", title: "近期桃花预报", desc: "解析未来3个月感情走势，把握最佳相遇时机" },
          { icon: "✨", title: "情感提升建议", desc: "量身定制的感情修炼方向，帮你遇见更好的自己" },
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
        ⚠ 本测试结果仅供情感心理参考与娱乐，请理性看待，切勿过度依赖占卜结果进行重大决策。
      </p>
    </div>
  );
}
