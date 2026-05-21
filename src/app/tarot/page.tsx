"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { DOMAINS, SPREADS } from "../tarot-data";
import { DrawingPhase } from "../components/DrawingPhase";
import { ResultPhase } from "../components/ResultPhase";
import { HistoryPanel } from "../components/HistoryPanel";
import { useReadingHistory, useDailyLimit } from "../hooks";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";
import type { TarotCard } from "../tarot-data";

// ── 三语文案 ────────────────────────────────────────
const T = {
  zh: {
    back:           "← 返回",
    history:        "📜 占卜记录",
    title:          "塔罗启示录",
    subtitle:       "TAROT ORACLE",
    desc:           "用古老的智慧，解读当下的困惑。\n让 AI 塔罗师为你揭示命运的低语。",
    feat1:          "每日一牌",
    feat2:          "三牌阵",
    feat3:          "AI 解析",
    startBtn:       "开启占卜",
    step1:          "STEP 1",
    selectDomain:   "选择占卜领域",
    domainHint:     "你今天想探索哪个方向？",
    step2:          "STEP 2",
    selectSpread:   "选择牌阵方式",
    spreadHint:     "选择你的占卜方式",
    free:           "免费",
    backDomain:     "← 返回选择领域",
    domains: [
      { id: "love",    name: "爱情" },
      { id: "career",  name: "事业" },
      { id: "wealth",  name: "财富" },
      { id: "general", name: "综合" },
    ],
    spreads: [
      { id: "single", name: "每日一牌",      desc: "获取今日指引与运势",      positions: ["今日指引"] },
      { id: "three",  name: "過去·現在·未來", desc: "深度解析你的問題脈絡",    positions: ["過去", "現在", "未來"] },
    ],
  },
  tw: {
    back:           "← 返回",
    history:        "📜 占卜記錄",
    title:          "塔羅啟示錄",
    subtitle:       "TAROT ORACLE",
    desc:           "用古老的智慧，解讀當下的困惑。\n讓 AI 塔羅師為你揭示命運的低語。",
    feat1:          "每日一牌",
    feat2:          "三牌陣",
    feat3:          "AI 解析",
    startBtn:       "開啟占卜",
    step1:          "STEP 1",
    selectDomain:   "選擇占卜領域",
    domainHint:     "你今天想探索哪個方向？",
    step2:          "STEP 2",
    selectSpread:   "選擇牌陣方式",
    spreadHint:     "選擇你的占卜方式",
    free:           "免費",
    backDomain:     "← 返回選擇領域",
    domains: [
      { id: "love",    name: "愛情" },
      { id: "career",  name: "事業" },
      { id: "wealth",  name: "財富" },
      { id: "general", name: "綜合" },
    ],
    spreads: [
      { id: "single", name: "每日一牌",      desc: "獲取今日指引與運勢",      positions: ["今日指引"] },
      { id: "three",  name: "過去·現在·未來", desc: "深度解析你的問題脈絡",    positions: ["過去", "現在", "未來"] },
    ],
  },
  en: {
    back:           "← Back",
    history:        "📜 History",
    title:          "Tarot Oracle",
    subtitle:       "TAROT ORACLE",
    desc:           "Ancient wisdom meets modern AI.\nLet the Tarot guide you through life's whispers.",
    feat1:          "Daily Card",
    feat2:          "3-Card Spread",
    feat3:          "AI Reading",
    startBtn:       "Begin Reading",
    step1:          "STEP 1",
    selectDomain:   "Choose a Domain",
    domainHint:     "What do you want to explore today?",
    step2:          "STEP 2",
    selectSpread:   "Choose a Spread",
    spreadHint:     "Select your reading style",
    free:           "Free",
    backDomain:     "← Back to domains",
    domains: [
      { id: "love",    name: "Love" },
      { id: "career",  name: "Career" },
      { id: "wealth",  name: "Wealth" },
      { id: "general", name: "General" },
    ],
    spreads: [
      { id: "single", name: "Daily Card",        desc: "A single card for today's guidance",        positions: ["Today's Message"] },
      { id: "three",  name: "Past · Now · Future", desc: "Three cards to reveal the full picture",   positions: ["Past", "Present", "Future"] },
    ],
  },
};
type Lang = "zh" | "en" | "tw";
// ────────────────────────────────────────────────────

type Phase = "landing" | "select-domain" | "select-spread" | "drawing" | "result";

export interface ReadingState {
  domain: string;
  spreadType: "single" | "three";
  cards: Array<{ card: TarotCard; reversed: boolean }>;
  reading: string;
}

export default function TarotPage() {
  const lang = useLocale() as Lang;

  const [phase, setPhase] = useState<Phase>("landing");
  const [readingState, setReadingState] = useState<ReadingState | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [selectedSpread, setSelectedSpread] = useState<"single" | "three">("single");
  const [showHistory, setShowHistory] = useState(false);

  const t = T[lang];

  const { history, saveReading } = useReadingHistory();
  const { recordUsage } = useDailyLimit();

  const handleSelectDomain = useCallback((domainId: string) => {
    setSelectedDomain(domainId);
    setPhase("select-spread");
  }, []);

  const handleSelectSpread = useCallback(
    (spreadId: "single" | "three") => {
      setSelectedSpread(spreadId);
      setPhase("drawing");
    },
    [],
  );

  const handleReadingComplete = useCallback(
    (result: ReadingState) => {
      setReadingState(result);
      recordUsage(result.spreadType);
      saveReading({
        date: new Date().toLocaleDateString(lang === "en" ? "en-US" : lang === "tw" ? "zh-TW" : "zh-CN"),
        spreadType: result.spreadType,
        domain: result.domain,
        cards: result.cards,
        reading: result.reading,
      });
      setPhase("result");
    },
    [recordUsage, saveReading, lang],
  );

  const handleRestart = useCallback(() => {
    setPhase("landing");
    setReadingState(null);
    setSelectedDomain("");
  }, []);

  return (
    <main className="relative min-h-screen" style={{ zIndex: 1 }}>
      {showHistory && (
        <HistoryPanel history={history} lang={lang} onClose={() => setShowHistory(false)} />
      )}

      {phase !== "drawing" && (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
              style={{
                padding: "5px 12px", borderRadius: 20,
                background: "rgba(10,6,28,0.6)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(201,168,76,0.2)",
                color: "rgba(201,168,76,0.85)", fontSize: "0.8rem",
                textDecoration: "none", letterSpacing: "0.06em",
              }}
            >{t.back}</Link>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="glass-card px-3 py-1.5 rounded-full text-gold-light text-sm hover:border-gold transition-all"
          >
            {t.history}
          </button>
        </nav>
      )}

      {phase === "landing" && <LandingPage t={t} onStart={() => setPhase("select-domain")} />}
      {phase === "select-domain" && (
        <DomainSelectPage t={t} onSelect={handleSelectDomain} />
      )}
      {phase === "select-spread" && (
        <SpreadSelectPage
          t={t}
          domain={selectedDomain}
          onSelect={handleSelectSpread}
          onBack={() => setPhase("select-domain")}
        />
      )}
      {phase === "drawing" && (
        <DrawingPhase
          domain={selectedDomain}
          spreadType={selectedSpread}
          lang={lang}
          onComplete={handleReadingComplete}
        />
      )}
      {phase === "result" && readingState && (
        <ResultPhase
          readingState={readingState}
          lang={lang}
          onRestart={handleRestart}
          onNewReading={() => setPhase("select-domain")}
        />
      )}
    </main>
  );
}

// ── Landing ──────────────────────────────────────────
function LandingPage({ t, onStart }: { t: typeof T["zh"]; onStart: () => void }) {
  const descLines = t.desc.split("\n");
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
      <div className="mb-8 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mystic-circle spin-slow" style={{ width: 160, height: 160, opacity: 0.15 }} />
        </div>
        <div className="text-7xl animate-float relative z-10">🔮</div>
      </div>

      <h1
        className="font-cinzel text-center mb-3 animate-fade-in-up"
        style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          background: "linear-gradient(135deg, #e8d5a3, #c9a84c, #f0e68c)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "0.1em",
        }}
      >
        {t.title}
      </h1>
      <p className="font-cinzel text-gold/60 text-sm tracking-widest mb-2 animate-fade-in-up animate-delay-100">
        {t.subtitle}
      </p>

      <p
        className="text-center text-gold-light/70 max-w-md leading-relaxed mb-12 animate-fade-in-up animate-delay-200"
        style={{ fontSize: "1.05rem" }}
      >
        {descLines[0]}
        {descLines[1] && <><br />{descLines[1]}</>}
      </p>

      <div className="mystic-divider w-64 mb-12 animate-fade-in-up animate-delay-200" />

      <div className="grid grid-cols-3 gap-6 mb-12 max-w-sm w-full animate-fade-in-up animate-delay-300">
        {[
          { icon: "✨", text: t.feat1 },
          { icon: "🌟", text: t.feat2 },
          { icon: "🤖", text: t.feat3 },
        ].map((feature) => (
          <div key={feature.text} className="text-center">
            <div className="text-2xl mb-1">{feature.icon}</div>
            <div className="text-gold/70 text-xs tracking-wide">{feature.text}</div>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="btn-mystical font-cinzel text-deep-purple px-10 py-4 rounded-full text-lg font-semibold tracking-widest animate-fade-in-up animate-delay-400"
        style={{ color: "#0f0a1e" }}
      >
        {t.startBtn}
      </button>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6 opacity-30">
        {["♈", "♉", "♊", "♋", "♌", "♍"].map((sign, i) => (
          <span
            key={sign}
            className="text-gold text-lg"
            style={{ animation: `twinkle ${2 + i * 0.3}s ease-in-out ${i * 0.2}s infinite` }}
          >
            {sign}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Domain Select ─────────────────────────────────────
function DomainSelectPage({ t, onSelect }: { t: typeof T["zh"]; onSelect: (domain: string) => void }) {
  // 合并图标（来自 DOMAINS 原始数据）和本地化名称
  const domainsWithIcon = DOMAINS.map((d) => ({
    ...d,
    name: t.domains.find((td) => td.id === d.id)?.name ?? d.name,
  }));

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-24">
      <div className="w-full max-w-lg animate-fade-in-up">
        <div className="text-center mb-10">
          <p className="text-gold/50 text-sm tracking-widest font-cinzel mb-2">{t.step1}</p>
          <h2
            className="text-3xl font-cinzel mb-3"
            style={{
              background: "linear-gradient(135deg, #e8d5a3, #c9a84c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t.selectDomain}
          </h2>
          <p className="text-gold-light/60 text-sm">{t.domainHint}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {domainsWithIcon.map((domain, i) => (
            <button
              key={domain.id}
              onClick={() => onSelect(domain.id)}
              className="glass-card rounded-2xl p-6 text-center hover:border-gold transition-all hover:scale-105 group"
              style={{ animationDelay: `${i * 0.1}s`, animation: "fade-in-up 0.6s ease-out forwards" }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{domain.icon}</div>
              <div className="text-gold font-cinzel text-lg tracking-wide">{domain.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Spread Select ─────────────────────────────────────
function SpreadSelectPage({
  t, domain, onSelect, onBack,
}: {
  t: typeof T["zh"];
  domain: string;
  onSelect: (spread: "single" | "three") => void;
  onBack: () => void;
}) {
  const domainInfo = DOMAINS.find((d) => d.id === domain);
  const domainName = t.domains.find((d) => d.id === domain)?.name ?? domainInfo?.name ?? "";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-24">
      <div className="w-full max-w-lg animate-fade-in-up">
        <div className="text-center mb-10">
          <p className="text-gold/50 text-sm tracking-widest font-cinzel mb-2">{t.step2}</p>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">{domainInfo?.icon}</span>
            <h2
              className="text-3xl font-cinzel"
              style={{
                background: "linear-gradient(135deg, #e8d5a3, #c9a84c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {domainName}
            </h2>
          </div>
          <p className="text-gold-light/60 text-sm">{t.spreadHint}</p>
        </div>

        <div className="flex flex-col gap-4">
          {t.spreads.map((spread, i) => {
            const originalSpread = SPREADS.find((s) => s.id === spread.id);

            return (
              <button
                key={spread.id}
                onClick={() => onSelect(spread.id as "single" | "three")}
                className="glass-card rounded-2xl p-6 text-left hover:border-gold transition-all group relative overflow-hidden hover:scale-102 cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{originalSpread?.icon}</span>
                    <div>
                      <div className="text-gold font-cinzel text-xl mb-1">{spread.name}</div>
                      <div className="text-gold-light/60 text-sm">{spread.desc}</div>
                      <div className="flex gap-2 mt-2">
                        {spread.positions.map((pos) => (
                          <span
                            key={pos}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              background: "rgba(201, 168, 76, 0.15)",
                              color: "rgba(201, 168, 76, 0.8)",
                              border: "1px solid rgba(201, 168, 76, 0.2)",
                            }}
                          >
                            {pos}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-cinzel"
                    style={{
                      background: "rgba(74, 222, 128, 0.2)",
                      color: "#4ade80",
                    }}
                  >
                    {t.free}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={onBack}
          className="mt-6 w-full text-center text-gold/50 text-sm hover:text-gold transition-colors"
        >
          {t.backDomain}
        </button>
      </div>
    </div>
  );
}
