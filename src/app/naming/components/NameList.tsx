"use client";

import React from "react";
import { WUXING_CONFIG, getWuxingLabel, type WuXing, type Lang } from "../naming-data";
import { buildSynergy } from "../naming-engine";
import { type NamingT } from "../naming-i18n";

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
  t: NamingT;
  lang: Lang;
}

function NameCard({
  suggestion,
  surname,
  onClick,
  t,
  lang,
}: {
  suggestion: NameSuggestion;
  surname: string;
  onClick?: () => void;
  t: NamingT;
  lang: Lang;
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
          <span className="name-card-score-unit">{t.nlScoreUnit}</span>
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
            {suggestion.chars[i]}{getWuxingLabel(wx, lang)}{t.nlWxSuffix}
          </span>
        ))}
        <span className="name-card-synergy">
          {buildSynergy(
            suggestion.combinedWuxing[0] ?? "土",
            suggestion.combinedWuxing[1] ?? "土",
            lang,
          )}
        </span>
      </div>

      {/* 寓意 */}
      <div className="name-card-meaning">{suggestion.overallMeaning}</div>

      {/* 出处 */}
      {suggestion.source && (
        <div className="name-card-source">
          <span className="name-card-source-icon">📖</span>
          {t.nlSourcePre}{suggestion.source}
        </div>
      )}

      {/* 标签 */}
      <div className="name-card-tags">
        {suggestion.tags.map(t2 => (
          <span key={t2} className="name-card-tag">{t2}</span>
        ))}
        {onClick && <span className="name-card-detail-link">{t.nlDetailLink}</span>}
      </div>
    </div>
  );
}

function AINameCard({ aiName, surname, t, lang }: { aiName: AIName; surname: string; t: NamingT; lang: Lang }) {
  return (
    <div className="name-card name-card-ai">
      <div className="name-card-ai-badge">{t.nlAiBadge}</div>
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
                {getWuxingLabel(wxKey, lang)}{t.nlWxSuffix}
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
  t,
  lang,
}: NameListProps) {

  return (
    <div className="namelist-container">
      {/* 标题 */}
      <div className="namelist-header">
        <div className="namelist-header-badge">{t.nlBadge}</div>
        <h2 className="namelist-title">
          {t.nlTitlePre}{surname}{t.nlTitleMid}{gender === "male" ? t.nlTitleMale : t.nlTitleFemale}{t.nlTitlePost}
        </h2>
        <p className="namelist-subtitle">
          {t.nlSubtitle}
        </p>
      </div>

      {/* 推荐名字区 */}
      <section className="namelist-free-section">
        <div className="namelist-section-title">
          <span className="namelist-section-icon">✦</span>
          {t.nlSectionFree}
          <span className="namelist-section-count">{freeSuggestions.length} {t.nlCount}</span>
        </div>
        <div className="namelist-grid">
          {freeSuggestions.map(s => (
            <NameCard
              key={s.name}
              suggestion={s}
              surname={surname}
              onClick={onSelectName ? () => onSelectName(s) : undefined}
              t={t}
              lang={lang}
            />
          ))}
        </div>
      </section>

      {/* AI 精选区（如果有 AI 结果）*/}
      {aiNames.length > 0 && (
        <section className="namelist-ai-section">
          <div className="namelist-section-title">
            <span className="namelist-section-icon">✨</span>
            {t.nlSectionAi}
            <span className="namelist-section-count">{aiNames.length} {t.nlCount}</span>
            <span className="namelist-ai-tag">GPT-4o</span>
          </div>
          <div className="namelist-grid">
            {aiNames.map(n => (
              <AINameCard key={n.name} aiName={n} surname={surname} t={t} lang={lang} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
