"use client";

import { useState, useEffect } from "react";
import { QUESTION_CATEGORIES, type WuXing } from "../meihua-data";
import type { DivinationMethod, MeihuaInput } from "../meihua-engine";

interface MeihuaInputProps {
  onSubmit: (input: MeihuaInput) => void;
  isLoading: boolean;
}

export default function MeihuaInputComponent({ onSubmit, isLoading }: MeihuaInputProps) {
  const [method, setMethod] = useState<DivinationMethod>("time");
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("general");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);

  // 实时更新当前时间
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString("zh-CN", {
        month: "long", day: "numeric",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
      }));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    if (method === "number") {
      const n1 = parseInt(num1);
      const n2 = parseInt(num2);
      if (!num1 || !num2 || isNaN(n1) || isNaN(n2) || n1 <= 0 || n2 <= 0) {
        setInputError("请输入两个正整数");
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
        <h1 className="meihua-main-title">梅花心易</h1>
        <p className="meihua-subtitle">北宋邵雍传世之法 · 心动即卦 · 随时起占</p>
        <div className="meihua-divider-ornament">— ✦ —</div>
        <p className="meihua-intro">
          梅花易数，观物取象，随心起卦。<br />
          心中默念所问之事，以一念之机，感天地之气。
        </p>
      </div>

      {/* 占问事项（可选） */}
      <div className="meihua-field-group">
        <label className="meihua-label">
          <span className="meihua-label-icon">◎</span>
          占问事项
          <span className="meihua-optional">（可选，心中默念亦可）</span>
        </label>
        <input
          type="text"
          placeholder="如：此次出行是否顺利？/ 感情近况如何？"
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
          事项分类
        </label>
        <div className="meihua-category-grid">
          {QUESTION_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`meihua-category-btn ${category === cat.id ? "meihua-category-active" : ""}`}
            >
              <span className="meihua-category-icon">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 起卦方式 */}
      <div className="meihua-field-group">
        <label className="meihua-label">
          <span className="meihua-label-icon">☯</span>
          起卦方式
        </label>
        <div className="meihua-method-tabs">
          {[
            { key: "time",   label: "时间起卦", sub: "以此刻天时起卦" },
            { key: "number", label: "数字起卦", sub: "输入随心数字" },
            { key: "random", label: "随机起卦", sub: "心动即机" },
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
            以当前时刻的年月日时推算卦象。<br />
            起卦公式：(年支数+农历月+农历日) ÷ 8 为上卦；加时支数 ÷ 8 为下卦；总和 ÷ 6 为动爻。
          </p>
        </div>
      )}

      {method === "number" && (
        <div className="meihua-method-info">
          <p className="meihua-method-desc">
            凭直觉输入两个正整数（如门牌号、车牌数字、随心想到的数），以此起卦。
          </p>
          <div className="meihua-number-inputs">
            <div className="meihua-number-field">
              <label className="meihua-number-label">第一个数（上卦）</label>
              <input
                type="number"
                min="1"
                placeholder="随心输入正整数"
                value={num1}
                onChange={e => setNum1(e.target.value)}
                className="meihua-num-input"
              />
            </div>
            <div className="meihua-number-divider">×</div>
            <div className="meihua-number-field">
              <label className="meihua-number-label">第二个数（下卦）</label>
              <input
                type="number"
                min="1"
                placeholder="随心输入正整数"
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
            第一数 ÷ 8 余数 → 上卦 · 第二数 ÷ 8 余数 → 下卦 · 两数之和 ÷ 6 余数 → 动爻
          </p>
        </div>
      )}

      {method === "random" && (
        <div className="meihua-method-info meihua-random-info">
          <div className="meihua-taiji-spin">☯</div>
          <p className="meihua-method-desc">
            闭目冥想，心中默念所问之事，<br />
            感受内心的感应，点击下方按钮，<br />
            以心动之机起卦，模拟邵雍"观梅起卦"。
          </p>
          <p className="meihua-quote">"天下之事，皆可以一念感之。"——邵雍《梅花易数》</p>
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
            推算中...
          </span>
        ) : (
          <span>
            {method === "time" ? "以此刻起卦" : method === "number" ? "以此数起卦" : "心动即卦"}
          </span>
        )}
      </button>

      {/* 先天八卦数诀小卡 */}
      <div className="meihua-quick-ref">
        <p className="meihua-quick-ref-title">先天八卦数诀</p>
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
