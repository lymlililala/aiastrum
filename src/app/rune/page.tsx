"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import type { SpreadType, RuneReadingResult } from "./rune-engine";
import { drawRunes } from "./rune-engine";
import { RuneReading } from "./components/RuneReading";
import { RunePoster } from "./components/RunePoster";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";
import "./rune.css";

// ── 三语文案 ────────────────────────────────────────
const T = {
  zh: {
    back:            "返回",
    pageTitle:       "卢恩符文 · RuneWhisper",
    slogan:          "倾听古老石头的低语，洞悉当下的抉择",
    modeLabel:       "— 选择占卜方式 —",
    singleName:      "奥丁之眼",
    singleSubtitle:  "单石占卜",
    singleTags:      ["当日指引", "是/否疑问", "快速洞见"],
    threeName:       "诺伦三女神",
    threeSubtitle:   "三石占卜",
    threeTags:       ["过去", "现在", "未来"],
    startSingle:     "开始单石占卜",
    startThree:      "开始三石占卜",
    descSingle:      "心中默念一个 是/否 问题，或询问今日运势",
    descThree:       "心中默念一件困扰之事，三块符文将揭示其来龙去脉",
    focusHintSingle: "☽  在心中默念你的问题\n长按下方石头，将你的意念注入符文",
    focusHintThree:  "✦  在心中默念困扰之事\n长按下方石头，让诺伦三女神为你揭示命运",
    pressAria:       "长按抽取符文",
    pressing:        "意念注入中...",
    pressIdle:       "长按注入意念",
    holdLead:        "长按石头保持 ",
    holdTail:        " 秒，符文将为你召唤",
    orClick:         "或者 ",
    clickDraw:       "点击直接抽取",
    backToModes:     "← 重新选择模式",
    drawing:         "古老的石头正在低语...",
  },
  tw: {
    back:            "返回",
    pageTitle:       "盧恩符文 · RuneWhisper",
    slogan:          "傾聽古老石頭的低語，洞悉當下的抉擇",
    modeLabel:       "— 選擇占卜方式 —",
    singleName:      "奧丁之眼",
    singleSubtitle:  "單石占卜",
    singleTags:      ["當日指引", "是/否疑問", "快速洞見"],
    threeName:       "諾倫三女神",
    threeSubtitle:   "三石占卜",
    threeTags:       ["過去", "現在", "未來"],
    startSingle:     "開始單石占卜",
    startThree:      "開始三石占卜",
    descSingle:      "心中默念一個 是/否 問題，或詢問今日運勢",
    descThree:       "心中默念一件困擾之事，三塊符文將揭示其來龍去脈",
    focusHintSingle: "☽  在心中默念你的問題\n長按下方石頭，將你的意念注入符文",
    focusHintThree:  "✦  在心中默念困擾之事\n長按下方石頭，讓諾倫三女神為你揭示命運",
    pressAria:       "長按抽取符文",
    pressing:        "意念注入中...",
    pressIdle:       "長按注入意念",
    holdLead:        "長按石頭保持 ",
    holdTail:        " 秒，符文將為你召喚",
    orClick:         "或者 ",
    clickDraw:       "點擊直接抽取",
    backToModes:     "← 重新選擇模式",
    drawing:         "古老的石頭正在低語...",
  },
  en: {
    back:            "Back",
    pageTitle:       "Runes · RuneWhisper",
    slogan:          "Listen to the whispers of ancient stones, and see the choice before you",
    modeLabel:       "— Choose a Reading —",
    singleName:      "Odin's Eye",
    singleSubtitle:  "Single Rune",
    singleTags:      ["Daily guidance", "Yes/No question", "Quick insight"],
    threeName:       "The Three Norns",
    threeSubtitle:   "Three Runes",
    threeTags:       ["Past", "Present", "Future"],
    startSingle:     "Start Single Rune Reading",
    startThree:      "Start Three Rune Reading",
    descSingle:      "Hold a yes/no question in mind, or ask about today's fortune",
    descThree:       "Hold a troubling matter in mind; three runes will reveal how it unfolds",
    focusHintSingle: "☽  Hold your question in mind\nPress and hold the stone below to pour your intent into the runes",
    focusHintThree:  "✦  Hold your troubling matter in mind\nPress and hold the stone below and let the Three Norns reveal your fate",
    pressAria:       "Press and hold to draw a rune",
    pressing:        "Channeling intent...",
    pressIdle:       "Hold to channel intent",
    holdLead:        "Hold the stone for ",
    holdTail:        " seconds, and the runes will answer your call",
    orClick:         "or ",
    clickDraw:       "tap to draw directly",
    backToModes:     "← Choose another mode",
    drawing:         "The ancient stones are whispering...",
  },
};
type Lang = "zh" | "en" | "tw";
// ────────────────────────────────────────────────────

// ===== 状态机 =====
type PagePhase =
  | "select"     // 选择占卜模式
  | "focus"      // 冥想/长按阶段
  | "drawing"    // 抽牌动画
  | "result";    // 展示结果

const HOLD_DURATION = 2000; // 长按触发时间（ms）
const RUNE_SYMBOLS = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ"];

export default function RunePage() {
  const lang = useLocale() as Lang;
  const t = T[lang];

  const [phase, setPhase] = useState<PagePhase>("select");
  const [spreadType, setSpreadType] = useState<SpreadType>("single");
  const [result, setResult] = useState<RuneReadingResult | null>(null);
  const [showPoster, setShowPoster] = useState(false);

  // 长按状态
  const [pressing, setPressing] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0); // 0 ~ 100
  const [drawingRunes, setDrawingRunes] = useState<string[]>([]);

  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ===== 模式选择 =====
  const handleSelectMode = (type: SpreadType) => {
    setSpreadType(type);
  };

  const handleStartFocus = () => {
    setPhase("focus");
  };

  // ===== 长按逻辑 =====
  const startPress = () => {
    if (phase !== "focus") return;
    setPressing(true);
    setHoldProgress(0);

    const startTime = Date.now();
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
      setHoldProgress(progress);
      if (progress >= 100) {
        clearInterval(progressIntervalRef.current!);
        progressIntervalRef.current = null;
      }
    }, 30);

    holdTimerRef.current = setTimeout(() => {
      triggerDraw();
    }, HOLD_DURATION);
  };

  const cancelPress = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setPressing(false);
    setHoldProgress(0);
  };

  const triggerDraw = () => {
    setPressing(false);
    setHoldProgress(0);
    setPhase("drawing");

    // 随机符文闪烁动画
    let count = 0;
    const interval = setInterval(() => {
      setDrawingRunes(
        Array.from({ length: 4 }, () => RUNE_SYMBOLS[Math.floor(Math.random() * RUNE_SYMBOLS.length)]!),
      );
      count++;
      if (count >= 8) {
        clearInterval(interval);
        // 执行抽牌
        const readingResult = drawRunes(spreadType, lang);
        setResult(readingResult);
        setPhase("result");
      }
    }, 120);
  };

  // ===== 重新占卜 =====
  const handleAgain = () => {
    setResult(null);
    setShowPoster(false);
    setPhase("select");
  };

  // ===== 渲染 =====
  return (
    <div className="rune-page">
      {/* 背景 */}
      <div className="rune-bg" aria-hidden="true">
        <div className="rune-bg-layer" />
        <div className="rune-bg-stone1" />
        <div className="rune-bg-stone2" />
        <div className="rune-bg-stone3" />
        <div className="rune-bg-runes" aria-hidden="true">
          ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ
        </div>
      </div>

      {/* 返回首页 —— fixed 左上角，与全站一致 */}
      <Link href="/" style={{
        position: "fixed", top: 16, left: 16, zIndex: 200,
        display: "flex", alignItems: "center", gap: 6,
        padding: "6px 14px", borderRadius: 20,
        background: "rgba(10,6,28,0.75)", backdropFilter: "blur(10px)",
        border: "1px solid rgba(140,185,245,0.25)",
        color: "rgba(140,185,245,0.85)", fontSize: "0.8rem",
        textDecoration: "none", letterSpacing: "0.06em",
        transition: "all 0.18s",
      }}>← {t.back}</Link>

      {/* 语言切换 —— fixed 右上角 */}
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 200 }}>
        <LangSwitcher />
      </div>

      <div className="rune-content">
        {/* 页头 */}
        <header className="rune-page-header">
          <div className="rune-page-emblem">
            <div className="rune-page-emblem-ring">
              <span className="rune-page-symbol">ᚠ</span>
            </div>
          </div>
          <h1 className="rune-page-title">{t.pageTitle}</h1>
          <p className="rune-page-slogan">{t.slogan}</p>
          <div className="rune-page-divider">
            <span className="rune-divider-line" />
            <span className="rune-divider-rune">ᚹ</span>
            <span className="rune-divider-rune">ᚢ</span>
            <span className="rune-divider-rune">ᚱ</span>
            <span className="rune-divider-line" />
          </div>
        </header>

        {/* ===== 选择模式阶段 ===== */}
        {phase === "select" && (
          <>
            <section className="rune-mode-section">
              <p className="rune-mode-label">{t.modeLabel}</p>
              <div className="rune-mode-cards">
                {/* 单石 */}
                <div
                  className={`rune-mode-card ${spreadType === "single" ? "rune-mode-card-active" : ""}`}
                  onClick={() => handleSelectMode("single")}
                >
                  <span className="rune-mode-icon">☽</span>
                  <div className="rune-mode-name">{t.singleName}</div>
                  <div className="rune-mode-subtitle">{t.singleSubtitle}</div>
                  <div className="rune-mode-tags">
                    {t.singleTags.map((tag) => (
                      <span key={tag} className="rune-mode-tag">{tag}</span>
                    ))}
                  </div>
                  {spreadType === "single" && <div className="rune-mode-active-dot" />}
                </div>
                {/* 三石 */}
                <div
                  className={`rune-mode-card ${spreadType === "three" ? "rune-mode-card-active" : ""}`}
                  onClick={() => handleSelectMode("three")}
                >
                  <span className="rune-mode-icon">✦</span>
                  <div className="rune-mode-name">{t.threeName}</div>
                  <div className="rune-mode-subtitle">{t.threeSubtitle}</div>
                  <div className="rune-mode-tags">
                    {t.threeTags.map((tag) => (
                      <span key={tag} className="rune-mode-tag">{tag}</span>
                    ))}
                  </div>
                  {spreadType === "three" && <div className="rune-mode-active-dot" />}
                </div>
              </div>
            </section>

            {/* 开始按钮 */}
            <button
              className="rune-share-btn"
              style={{ width: "100%", marginBottom: 0 }}
              onClick={handleStartFocus}
            >
              <span style={{ fontSize: "1.1rem" }}>
                {spreadType === "single" ? "☽" : "✦"}
              </span>
              <span>
                {spreadType === "single" ? t.startSingle : t.startThree}
              </span>
            </button>

            {/* 模式说明 */}
            <p
              style={{
                textAlign: "center",
                fontSize: "0.75rem",
                color: "rgba(140,180,240,0.35)",
                marginTop: 12,
                lineHeight: 1.6,
              }}
            >
              {spreadType === "single" ? t.descSingle : t.descThree}
            </p>
          </>
        )}

        {/* ===== 冥想/长按阶段 ===== */}
        {phase === "focus" && (
          <section className="rune-focus-section">
            <p className="rune-focus-hint">
              {spreadType === "single" ? t.focusHintSingle : t.focusHintThree}
            </p>

            {/* 符文袋 / 发光石头 */}
            <div className="rune-draw-btn-wrap">
              <div className="rune-draw-btn-ring" />
              <div className="rune-draw-btn-ring2" />
              <button
                className={`rune-draw-btn ${pressing ? "rune-draw-btn-pressing" : ""}`}
                onMouseDown={startPress}
                onMouseUp={cancelPress}
                onMouseLeave={cancelPress}
                onTouchStart={(e) => { e.preventDefault(); startPress(); }}
                onTouchEnd={cancelPress}
                onTouchCancel={cancelPress}
                aria-label={t.pressAria}
              >
                <div className="rune-draw-btn-texture" />
                <span className="rune-draw-btn-symbol">
                  {pressing ? "ᚢ" : "ᚠ"}
                </span>
                <span className="rune-draw-btn-text">
                  {pressing ? t.pressing : t.pressIdle}
                </span>
                {/* 进度条 */}
                {pressing && (
                  <div
                    className="rune-draw-progress"
                    style={{ width: `${holdProgress}%` }}
                  />
                )}
              </button>
            </div>

            <div className="rune-draw-desc">
              <p className="rune-draw-desc-text">
                {t.holdLead}{HOLD_DURATION / 1000}{t.holdTail}
                <br />
                {t.orClick}
                <button
                  onClick={triggerDraw}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(140,185,245,0.6)",
                    cursor: "pointer",
                    fontSize: "inherit",
                    textDecoration: "underline",
                    padding: 0,
                  }}
                >
                  {t.clickDraw}
                </button>
              </p>
            </div>

            {/* 返回选择 */}
            <button
              onClick={() => setPhase("select")}
              style={{
                marginTop: 24,
                background: "none",
                border: "none",
                color: "rgba(140,180,240,0.4)",
                cursor: "pointer",
                fontSize: "0.8rem",
              }}
            >
              {t.backToModes}
            </button>
          </section>
        )}

        {/* ===== 抽牌动画阶段 ===== */}
        {phase === "drawing" && (
          <div className="rune-drawing-state">
            <div className="rune-drawing-runes">
              {drawingRunes.map((r, i) => (
                <span key={i}>{r}</span>
              ))}
            </div>
            <p className="rune-drawing-text">
              {t.drawing}
            </p>
          </div>
        )}

        {/* ===== 结果阶段 ===== */}
        {phase === "result" && result && (
          <RuneReading
            result={result}
            lang={lang}
            onShare={() => setShowPoster(true)}
            onAgain={handleAgain}
          />
        )}
      </div>

      {/* 海报弹窗 */}
      {result && (
        <RunePoster
          result={result}
          lang={lang}
          visible={showPoster}
          onClose={() => setShowPoster(false)}
        />
      )}
    </div>
  );
}
