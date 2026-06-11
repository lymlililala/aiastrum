"use client";

import React from "react";
import { WUXING_CONFIG, WUXING_GENERATE, getWuxingLabel, type WuXing, type Lang } from "../naming-data";
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

interface NameDetailProps {
  suggestion: NameSuggestion;
  surname: string;
  xiyongshen: WuXing[];
  onBack?: () => void;
  t: NamingT;
  lang: Lang;
}

// 五格数理（简化版 - 天格、人格、地格）
function calcWuGe(surname: string, name: string, lang: Lang): Record<string, { val: number; desc: string }> {
  const strCount = (s: string) => {
    let total = 0;
    for (const ch of s) {
      const code = ch.codePointAt(0) ?? 0;
      if (code > 0x4e00) total += 8; // 简化：汉字用8
      else total += 1;
    }
    return total;
  };
  const s = strCount(surname);
  const n = strCount(name);

  const tian = s + 1;
  const ren = s + (name.length > 0 ? strCount(name[0] ?? "") : 0);
  const di = n + 1;

  const WUGE_DESC: Record<Lang, [string, string, string, string, string]> = {
    zh: ["大吉 · 领导之数", "吉 · 文昌之数", "平 · 稳健之数", "平 · 积累之数", "凶 · 变动之数"],
    tw: ["大吉 · 領導之數", "吉 · 文昌之數", "平 · 穩健之數", "平 · 積累之數", "凶 · 變動之數"],
    en: [
      "Very auspicious · number of leadership",
      "Auspicious · number of scholarship",
      "Neutral · number of steadiness",
      "Neutral · number of accumulation",
      "Inauspicious · number of upheaval",
    ],
  };

  const getDesc = (v: number) => {
    const d = WUGE_DESC[lang];
    const mod = v % 10;
    if (mod === 1 || mod === 6) return d[0];
    if (mod === 2 || mod === 7) return d[1];
    if (mod === 3 || mod === 8) return d[2];
    if (mod === 4 || mod === 9) return d[3];
    return d[4];
  };

  return {
    天格: { val: tian, desc: getDesc(tian) },
    人格: { val: ren, desc: getDesc(ren) },
    地格: { val: di, desc: getDesc(di) },
  };
}

// 平仄分析
function getToneAnalysis(chars: NameCharDetail[], surname: string, lang: Lang): string {
  const pinyins = chars.map(c => c.pinyin);
  const flatChar = lang === "en" ? "P" : "平"; // P = level/flat tone
  const obliqueChar = lang === "en" ? "Z" : "仄"; // Z = oblique tone
  const analysis = pinyins.map(p => {
    const isFlat = ["ā", "á", "ē", "é", "ī", "í", "ō", "ó", "ū", "ú", "ǖ", "ǘ"].some(v => p.includes(v));
    return isFlat ? flatChar : obliqueChar;
  });
  const surnameMark = surname.length === 1 ? "—" : "——";
  const pattern = `（${surnameMark}）${analysis.join("")}`;
  const alternate = analysis[0] !== analysis[1];

  if (lang === "en") {
    const desc = alternate
      ? "Level and oblique tones alternate, giving a rhythmic, easy-to-read cadence"
      : `Two ${analysis[0] === flatChar ? "level" : "oblique"} tones in a row — a harmonious sound, ${analysis[0] === flatChar ? "steady and dignified" : "firm and resonant"}`;
    return `${pattern}, ${desc}`;
  }
  if (lang === "tw") {
    const desc = alternate
      ? "平仄相間，抑揚頓挫，讀來朗朗上口"
      : `連續${analysis[0]}聲，音調和諧，${analysis[0] === flatChar ? "平穩大氣" : "鏗鏘有力"}`;
    return `${pattern}，${desc}`;
  }
  const desc = alternate
    ? "平仄相间，抑扬顿挫，读来朗朗上口"
    : `连续${analysis[0]}声，音调和谐，${analysis[0] === flatChar ? "平稳大气" : "铿锵有力"}`;
  return `${pattern}，${desc}`;
}

export default function NameDetail({ suggestion, surname, xiyongshen, onBack, t, lang }: NameDetailProps) {
  const wuGe = calcWuGe(surname, suggestion.name, lang);
  const toneAnalysis = getToneAnalysis(suggestion.charDetails, surname, lang);
  const synergy = buildSynergy(
    suggestion.combinedWuxing[0] ?? "土",
    suggestion.combinedWuxing[1] ?? "土",
    lang,
  );
  const wugeLabel: Record<string, string> = { 天格: t.ndWugeTian, 人格: t.ndWugeRen, 地格: t.ndWugeDi };

  return (
    <div className="namedetail-container">
      {/* 返回按钮 */}
      {onBack && (
        <button className="namedetail-back-btn" onClick={onBack}>
          {t.ndBack}
        </button>
      )}

      {/* 名字大标题 */}
      <div className="namedetail-hero">
        <div className="namedetail-fullname">
          <span className="namedetail-surname">{surname}</span>
          {suggestion.chars.map((ch, i) => (
            <span
              key={i}
              className="namedetail-main-char"
              style={{ color: WUXING_CONFIG[suggestion.combinedWuxing[i] ?? "土"].color }}
            >
              {ch}
            </span>
          ))}
        </div>
        <div className="namedetail-pinyin">
          {suggestion.charDetails.map(d => d.pinyin).join("  ")}
        </div>
        <div className="namedetail-score-ring">
          <svg viewBox="0 0 60 60" className="namedetail-score-svg">
            <circle cx="30" cy="30" r="25" fill="none" stroke="rgba(139,90,43,0.2)" strokeWidth="4" />
            <circle
              cx="30" cy="30" r="25"
              fill="none"
              stroke="#8b5a2b"
              strokeWidth="4"
              strokeDasharray={`${(suggestion.score / 100) * 157} 157`}
              strokeLinecap="round"
              transform="rotate(-90 30 30)"
            />
            <text x="30" y="34" textAnchor="middle" fontSize="14" fill="#8b5a2b" fontWeight="bold">
              {suggestion.score}
            </text>
          </svg>
          <span className="namedetail-score-label">{t.ndScoreLabel}</span>
        </div>
      </div>

      {/* 总寓意 */}
      <div className="namedetail-section">
        <h3 className="namedetail-section-title">{t.ndSecMeaning}</h3>
        <div className="namedetail-meaning-card">
          <p>{suggestion.overallMeaning}</p>
          <div className="namedetail-tags">
            {suggestion.tags.map(t => (
              <span key={t} className="namedetail-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 逐字解析 */}
      <div className="namedetail-section">
        <h3 className="namedetail-section-title">{t.ndSecChars}</h3>
        <div className="namedetail-chars-grid">
          {suggestion.charDetails.map((cd, i) => {
            const isXiyong = xiyongshen.includes(cd.wuxing);
            const generates = Object.entries(WUXING_GENERATE).find(([, v]) => v === cd.wuxing);
            return (
              <div
                key={i}
                className="namedetail-char-card"
                style={{
                  borderColor: WUXING_CONFIG[cd.wuxing].border,
                  background: WUXING_CONFIG[cd.wuxing].bg,
                }}
              >
                <div
                  className="namedetail-char-big"
                  style={{ color: WUXING_CONFIG[cd.wuxing].color }}
                >
                  {cd.char}
                </div>
                <div className="namedetail-char-pinyin">{cd.pinyin}</div>
                <div className="namedetail-char-info">
                  <span className="namedetail-char-strokes">{cd.strokes}{t.ndStrokeSuffix}</span>
                  <span
                    className="namedetail-char-wuxing"
                    style={{ color: WUXING_CONFIG[cd.wuxing].color }}
                  >
                    {getWuxingLabel(cd.wuxing, lang)}{t.ndWxSuffix}
                  </span>
                  {isXiyong && <span className="namedetail-xi-badge">{t.ndXiBadge}</span>}
                </div>
                <p className="namedetail-char-meaning">{cd.meaning}</p>
                {generates && (
                  <p className="namedetail-char-tip">
                    {getWuxingLabel(generates[0] as WuXing, lang)}{t.ndGenMid}{getWuxingLabel(cd.wuxing, lang)}{t.ndGenPost}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* 五行搭配说明 */}
        <div className="namedetail-synergy-card">
          <span className="namedetail-synergy-icon">☯</span>
          <strong>{t.ndSynergyLabel}</strong>{synergy}
        </div>
      </div>

      {/* 国学出处 */}
      {suggestion.source && (
        <div className="namedetail-section">
          <h3 className="namedetail-section-title">{t.ndSecSource}</h3>
          <div className="namedetail-source-card">
            <div className="namedetail-source-from">{t.ndSourceFrom}{suggestion.source}</div>
            {suggestion.sourceText && (
              <blockquote className="namedetail-source-quote">
                「{suggestion.sourceText}」
              </blockquote>
            )}
            {suggestion.sourceExplain && (
              <p className="namedetail-source-explain">{suggestion.sourceExplain}</p>
            )}
          </div>
        </div>
      )}

      {/* 音律分析 */}
      <div className="namedetail-section">
        <h3 className="namedetail-section-title">{t.ndSecTone}</h3>
        <div className="namedetail-tone-card">
          <p className="namedetail-tone-text">{toneAnalysis}</p>
          <div className="namedetail-tone-chars">
            {suggestion.charDetails.map((cd, i) => (
              <div key={i} className="namedetail-tone-item">
                <span className="namedetail-tone-char">{cd.char}</span>
                <span className="namedetail-tone-pinyin">{cd.pinyin}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 五格数理 */}
      <div className="namedetail-section">
        <h3 className="namedetail-section-title">{t.ndSecWuge}</h3>
        <div className="namedetail-wuge-grid">
          {Object.entries(wuGe).map(([k, v]) => (
            <div key={k} className="namedetail-wuge-card">
              <div className="namedetail-wuge-name">{wugeLabel[k] ?? k}</div>
              <div className="namedetail-wuge-val">{v.val}</div>
              <div className="namedetail-wuge-desc">{v.desc}</div>
            </div>
          ))}
        </div>
        <p className="namedetail-wuge-note">
          {t.ndWugeNote}
        </p>
      </div>
    </div>
  );
}
