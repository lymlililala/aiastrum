"use client";

import React from "react";
import { WUXING_CONFIG, type WuXing } from "../naming-data";

interface NameCharDetail {
  char: string;
  wuxing: WuXing;
  meaning: string;
  pinyin: string;
  strokes: number;
}

interface NameSuggestion {
  name: string;
  chars: string[];
  charDetails: NameCharDetail[];
  combinedWuxing: WuXing[];
  synergy: string;
  overallMeaning: string;
  source?: string;
  sourceText?: string;
  sourceExplain?: string;
  tonePattern: string;
  gender: "male" | "female" | "neutral";
  score: number;
  isPremium: boolean;
  tags: string[];
}

interface AIName {
  name: string;
  pinyin: string;
  wuxing: string[];
  meaning: string;
  source: string;
  sourceText: string;
  recommend_reason: string;
}

interface NameListProps {
  surname: string;
  gender: "male" | "female";
  freeSuggestions: NameSuggestion[];
  premiumCount: number;
  premiumSuggestions: NameSuggestion[];
  aiNames?: AIName[];
  onUnlock?: () => void;
  onSelectName?: (name: NameSuggestion) => void;
}

function NameCard({
  suggestion,
  surname,
  onClick,
}: {
  suggestion: NameSuggestion;
  surname: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`name-card ${onClick ? "name-card-clickable" : ""}`}
      onClick={onClick}
    >
      {/* 名字主体 */}
      <div className="name-card-top">
        <div className="name-card-fullname">
          <span className="name-card-surname">{surname}</span>
          {suggestion.chars.map((ch, i) => (
            <span
              key={i}
              className="name-card-char"
              style={{
                color: WUXING_CONFIG[suggestion.combinedWuxing[i] ?? "土"].color,
              }}
            >
              {ch}
            </span>
          ))}
        </div>
        <div className="name-card-pinyin">
          {surname[0]?.toLowerCase() ?? ""} ·{" "}
          {suggestion.charDetails.map(d => d.pinyin).join(" ")}
        </div>
        <div className="name-card-score">
          <span className="name-card-score-val">{suggestion.score}</span>
          <span className="name-card-score-unit">分</span>
        </div>
      </div>

      {/* 五行标签 */}
      <div className="name-card-wuxing-row">
        {suggestion.combinedWuxing.map((wx, i) => (
          <span
            key={i}
            className="name-card-wx-tag"
            style={{
              background: WUXING_CONFIG[wx].bg,
              borderColor: WUXING_CONFIG[wx].border,
              color: WUXING_CONFIG[wx].color,
            }}
          >
            {suggestion.chars[i]}{wx}行
          </span>
        ))}
        <span className="name-card-synergy">{suggestion.synergy}</span>
      </div>

      {/* 寓意 */}
      <div className="name-card-meaning">{suggestion.overallMeaning}</div>

      {/* 出处 */}
      {suggestion.source && (
        <div className="name-card-source">
          <span className="name-card-source-icon">📖</span>
          出自 {suggestion.source}
        </div>
      )}

      {/* 标签 */}
      <div className="name-card-tags">
        {suggestion.tags.map(t => (
          <span key={t} className="name-card-tag">{t}</span>
        ))}
        {onClick && <span className="name-card-detail-link">查看详情 →</span>}
      </div>
    </div>
  );
}

function AINameCard({ aiName, surname }: { aiName: AIName; surname: string }) {
  return (
    <div className="name-card name-card-ai">
      <div className="name-card-ai-badge">AI 精选</div>
      <div className="name-card-top">
        <div className="name-card-fullname">
          <span className="name-card-surname">{surname}</span>
          {aiName.name.split("").map((ch, i) => (
            <span key={i} className="name-card-char name-card-char-ai">{ch}</span>
          ))}
        </div>
        <div className="name-card-pinyin">{aiName.pinyin}</div>
      </div>

      {/* 五行 */}
      {aiName.wuxing.length > 0 && (
        <div className="name-card-wuxing-row">
          {aiName.wuxing.map((wx, i) => {
            const wxKey = wx as WuXing;
            return WUXING_CONFIG[wxKey] ? (
              <span
                key={i}
                className="name-card-wx-tag"
                style={{
                  background: WUXING_CONFIG[wxKey].bg,
                  borderColor: WUXING_CONFIG[wxKey].border,
                  color: WUXING_CONFIG[wxKey].color,
                }}
              >
                {wx}行
              </span>
            ) : null;
          })}
        </div>
      )}

      <div className="name-card-meaning">{aiName.meaning}</div>
      {aiName.source && (
        <div className="name-card-source">
          <span className="name-card-source-icon">📖</span>
          {aiName.source} · {aiName.sourceText}
        </div>
      )}
      <div className="name-card-ai-reason">{aiName.recommend_reason}</div>
    </div>
  );
}

export default function NameList({
  surname,
  gender,
  freeSuggestions,
  premiumCount,
  premiumSuggestions,
  aiNames = [],
  onUnlock,
  onSelectName,
}: NameListProps) {

  return (
    <div className="namelist-container">
      {/* 标题 */}
      <div className="namelist-header">
        <div className="namelist-header-badge">吉名推荐</div>
        <h2 className="namelist-title">
          为{surname}家{gender === "male" ? "男" : "女"}宝宝精选的吉名
        </h2>
        <p className="namelist-subtitle">
          每一个名字都经过五行契合度、诗意品格、音律和谐三重甄选
        </p>
      </div>

      {/* 推荐名字区 */}
      <section className="namelist-free-section">
        <div className="namelist-section-title">
          <span className="namelist-section-icon">✦</span>
          精选吉名
          <span className="namelist-section-count">{freeSuggestions.length} 个</span>
        </div>
        <div className="namelist-grid">
          {freeSuggestions.map(s => (
            <NameCard
              key={s.name}
              suggestion={s}
              surname={surname}
              onClick={onSelectName ? () => onSelectName(s) : undefined}
            />
          ))}
        </div>
      </section>

      {/* AI 精选区（如果有 AI 结果）*/}
      {aiNames.length > 0 && (
        <section className="namelist-ai-section">
          <div className="namelist-section-title">
            <span className="namelist-section-icon">✨</span>
            AI 精选推荐
            <span className="namelist-section-count">{aiNames.length} 个</span>
            <span className="namelist-ai-tag">GPT-4o</span>
          </div>
          <div className="namelist-grid">
            {aiNames.map(n => (
              <AINameCard key={n.name} aiName={n} surname={surname} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
