"use client";

import { useState } from "react";
import type { WugeT } from "../wuge-i18n";

interface WugeInputProps {
  t: WugeT;
  onSubmit: (name: string, gender: "male" | "female") => void;
  isLoading?: boolean;
}

export default function WugeInput({ t, onSubmit, isLoading = false }: WugeInputProps) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmed = name.trim();
    if (!trimmed) {
      setError(t.errEmpty);
      return;
    }
    if (trimmed.length < 2) {
      setError(t.errMin);
      return;
    }
    if (trimmed.length > 5) {
      setError(t.errMax);
      return;
    }
    if (!/^[\u4e00-\u9fff]+$/.test(trimmed)) {
      setError(t.errChinese);
      return;
    }

    onSubmit(trimmed, gender);
  };

  return (
    <div className="wuge-input-container">
      {/* 顶部装饰 */}
      <div className="wuge-header-deco">
        <div className="wuge-trigram-row">
          {["☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷"].map((t, i) => (
            <span key={i} className="wuge-trigram">{t}</span>
          ))}
        </div>
        <div className="wuge-deco-line" />
      </div>

      {/* 主标题 */}
      <div className="wuge-title-area">
        <h1 className="wuge-main-title">
          <span className="wuge-title-char">{t.inputTitleChars[0]}</span>
          <span className="wuge-title-char">{t.inputTitleChars[1]}</span>
          <span className="wuge-title-divider">·</span>
          <span className="wuge-title-char">{t.inputTitleChars[2]}</span>
          <span className="wuge-title-char">{t.inputTitleChars[3]}</span>
        </h1>
        <p className="wuge-subtitle">{t.inputSubtitle}</p>
      </div>

      {/* 输入表单 */}
      <form onSubmit={handleSubmit} className="wuge-form">
        {/* 姓名输入 */}
        <div className="wuge-field">
          <label className="wuge-label">
            <span className="wuge-label-icon">✦</span>
            {t.nameLabel}
          </label>
          <div className="wuge-name-input-wrapper">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder={t.namePlaceholder}
              className="wuge-name-input"
              maxLength={5}
              disabled={isLoading}
              autoComplete="off"
            />
            {name && (
              <div className="wuge-stroke-preview">
                {Array.from(name).map((char, i) => (
                  <span key={i} className="wuge-stroke-char">{char}</span>
                ))}
              </div>
            )}
          </div>
          {error && (
            <p className="wuge-error-msg">
              <span className="wuge-error-icon">⚠</span> {error}
            </p>
          )}
        </div>

        {/* 性别选择 */}
        <div className="wuge-field">
          <label className="wuge-label">
            <span className="wuge-label-icon">✦</span>
            {t.genderLabel}
          </label>
          <div className="wuge-gender-row">
            <button
              type="button"
              onClick={() => setGender("male")}
              className={`wuge-gender-btn ${gender === "male" ? "wuge-gender-active" : ""}`}
              disabled={isLoading}
            >
              <span className="wuge-gender-icon">乾</span>
              <span className="wuge-gender-text">{t.genderMale}</span>
              <span className="wuge-gender-sub">{t.genderMaleSub}</span>
            </button>
            <button
              type="button"
              onClick={() => setGender("female")}
              className={`wuge-gender-btn ${gender === "female" ? "wuge-gender-active" : ""}`}
              disabled={isLoading}
            >
              <span className="wuge-gender-icon">坤</span>
              <span className="wuge-gender-text">{t.genderFemale}</span>
              <span className="wuge-gender-sub">{t.genderFemaleSub}</span>
            </button>
          </div>
        </div>

        {/* 提示文案 */}
        <div className="wuge-tips">
          <p className="wuge-tip-item">
            <span className="wuge-tip-dot">◦</span>
            {t.tip1}
          </p>
          <p className="wuge-tip-item">
            <span className="wuge-tip-dot">◦</span>
            {t.tip2}
          </p>
          <p className="wuge-tip-item">
            <span className="wuge-tip-dot">◦</span>
            {t.tip3}
          </p>
        </div>

        {/* 提交按钮 */}
        <button
          type="submit"
          disabled={isLoading || !name.trim()}
          className="wuge-submit-btn"
        >
          {isLoading ? (
            <span className="wuge-btn-loading">
              <span className="wuge-spin">⊙</span>
              {t.submitting}
            </span>
          ) : (
            <span className="wuge-btn-content">
              <span className="wuge-btn-icon">☯</span>
              {t.submit}
            </span>
          )}
        </button>
      </form>

      {/* 底部装饰 */}
      <div className="wuge-footer-deco">
        <div className="wuge-deco-line" />
        <p className="wuge-footer-text">{t.geFooter}</p>
      </div>
    </div>
  );
}
