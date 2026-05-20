"use client";

import { useState } from "react";

interface WugeInputProps {
  onSubmit: (name: string, gender: "male" | "female") => void;
  isLoading?: boolean;
}

export default function WugeInput({ onSubmit, isLoading = false }: WugeInputProps) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmed = name.trim();
    if (!trimmed) {
      setError("请输入您的姓名");
      return;
    }
    if (trimmed.length < 2) {
      setError("姓名至少需要两个字");
      return;
    }
    if (trimmed.length > 5) {
      setError("姓名最多五个字");
      return;
    }
    if (!/^[\u4e00-\u9fff]+$/.test(trimmed)) {
      setError("请输入纯中文姓名");
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
          <span className="wuge-title-char">姓</span>
          <span className="wuge-title-char">名</span>
          <span className="wuge-title-divider">·</span>
          <span className="wuge-title-char">五</span>
          <span className="wuge-title-char">格</span>
        </h1>
        <p className="wuge-subtitle">笔画藏玄机，五格测人生</p>
      </div>

      {/* 输入表单 */}
      <form onSubmit={handleSubmit} className="wuge-form">
        {/* 姓名输入 */}
        <div className="wuge-field">
          <label className="wuge-label">
            <span className="wuge-label-icon">✦</span>
            请输入您的姓名
          </label>
          <div className="wuge-name-input-wrapper">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="请输入真实姓名（2-5个字）"
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
            性别
          </label>
          <div className="wuge-gender-row">
            <button
              type="button"
              onClick={() => setGender("male")}
              className={`wuge-gender-btn ${gender === "male" ? "wuge-gender-active" : ""}`}
              disabled={isLoading}
            >
              <span className="wuge-gender-icon">乾</span>
              <span className="wuge-gender-text">男</span>
              <span className="wuge-gender-sub">☰ 阳</span>
            </button>
            <button
              type="button"
              onClick={() => setGender("female")}
              className={`wuge-gender-btn ${gender === "female" ? "wuge-gender-active" : ""}`}
              disabled={isLoading}
            >
              <span className="wuge-gender-icon">坤</span>
              <span className="wuge-gender-text">女</span>
              <span className="wuge-gender-sub">☷ 阴</span>
            </button>
          </div>
        </div>

        {/* 提示文案 */}
        <div className="wuge-tips">
          <p className="wuge-tip-item">
            <span className="wuge-tip-dot">◦</span>
            本测算严格依照康熙字典笔画标准
          </p>
          <p className="wuge-tip-item">
            <span className="wuge-tip-dot">◦</span>
            五格剖象法为中华传统命名文化，仅供参考
          </p>
          <p className="wuge-tip-item">
            <span className="wuge-tip-dot">◦</span>
            建议输入真实姓名以获得最准确解读
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
              推演中...
            </span>
          ) : (
            <span className="wuge-btn-content">
              <span className="wuge-btn-icon">☯</span>
              开始测算
            </span>
          )}
        </button>
      </form>

      {/* 底部装饰 */}
      <div className="wuge-footer-deco">
        <div className="wuge-deco-line" />
        <p className="wuge-footer-text">天格 · 人格 · 地格 · 外格 · 总格</p>
      </div>
    </div>
  );
}
