"use client";

import React, { useState, useRef, useEffect } from "react";
import { HOT_TAGS, DAILY_DREAMS } from "../dream-data";

interface DreamInputProps {
  onSubmit: (query: string) => void;
  isLoading?: boolean;
}

export default function DreamInput({ onSubmit, isLoading = false }: DreamInputProps) {
  const [query, setQuery] = useState("");
  const [dailyIndex] = useState(() => Math.floor(Math.random() * DAILY_DREAMS.length));
  const [showDaily, setShowDaily] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const dailyDream = DAILY_DREAMS[dailyIndex]!;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    const trimmed = query.trim();
    if (trimmed.length < 1 || isLoading) return;
    onSubmit(trimmed);
  };

  const handleTagClick = (keyword: string) => {
    setQuery(keyword);
    onSubmit(keyword);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="dream-input-container">
      {/* 顶部标题区 */}
      <div className="dream-hero">
        <div className="dream-moon-icon">
          <span className="dream-moon-emoji">🌙</span>
          <div className="dream-moon-glow" />
        </div>
        <h1 className="dream-title">周公解梦</h1>
        <p className="dream-subtitle">解析梦境含义 · 探索潜意识</p>
        <p className="dream-desc">
          输入你梦见的内容，获取传统周公解梦与心理学的双重解析
        </p>
      </div>

      {/* 搜索输入框 */}
      <div className="dream-search-box">
        <div className="dream-search-inner">
          <span className="dream-search-icon">✦</span>
          <textarea
            ref={textareaRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDaily(false);
            }}
            onKeyDown={handleKeyDown}
            placeholder="输入关键词（如：蛇、水、飞翔）或描述你的梦境..."
            className="dream-textarea"
            rows={3}
            maxLength={500}
            disabled={isLoading}
          />
          {query.length > 0 && (
            <button
              className="dream-clear-btn"
              onClick={() => { setQuery(""); setShowDaily(true); }}
              aria-label="清空"
            >
              ✕
            </button>
          )}
        </div>
        <div className="dream-search-footer">
          <span className="dream-char-count">{query.length}/500</span>
          <button
            className="dream-submit-btn"
            onClick={handleSubmit}
            disabled={query.trim().length < 1 || isLoading}
          >
            {isLoading ? (
              <span className="dream-btn-loading">
                <span className="dream-dot-pulse" />
                解梦中
              </span>
            ) : (
              "开始解梦 →"
            )}
          </button>
        </div>
      </div>

      {/* 热门标签 */}
      <div className="dream-hot-section">
        <p className="dream-section-label">
          <span className="dream-label-icon">🔥</span>
          热门梦境
        </p>
        <div className="dream-tags">
          {HOT_TAGS.map((tag) => (
            <button
              key={tag.keyword}
              className="dream-tag"
              onClick={() => handleTagClick(tag.keyword)}
              disabled={isLoading}
            >
              <span className="dream-tag-emoji">{tag.emoji}</span>
              {tag.keyword}
            </button>
          ))}
        </div>
      </div>

      {/* 每日一梦 */}
      {showDaily && (
        <div className="dream-daily-card">
          <div className="dream-daily-header">
            <span className="dream-daily-badge">今日推荐</span>
            <span className="dream-daily-title">{dailyDream.title}</span>
          </div>
          <div className="dream-daily-content">
            <div className="dream-daily-row">
              <span className="dream-daily-tag dream-trad-tag">周公</span>
              <p className="dream-daily-text">{dailyDream.traditional}</p>
            </div>
            <div className="dream-daily-row">
              <span className="dream-daily-tag dream-psych-tag">心理</span>
              <p className="dream-daily-text">{dailyDream.psychology}</p>
            </div>
          </div>
          <button
            className="dream-daily-try"
            onClick={() => handleTagClick(dailyDream.keyword)}
          >
            解析「{dailyDream.keyword}」的梦 →
          </button>
        </div>
      )}
    </div>
  );
}
