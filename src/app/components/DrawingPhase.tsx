"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { DOMAINS, drawCards } from "../tarot-data";
import type { TarotCard } from "../tarot-data";
import type { ReadingState } from "../page";

// ── 双语文案 ──────────────────────────────────────────
const DT = {
  zh: {
    meditationTitle:  "请在心中默念你的问题",
    meditationDesc:   (name: string) => `闭上眼睛，深呼吸，将你对「${name}」的疑问凝聚于心...`,
    countdownReady:   "准备好了，洗牌中...",
    countdownSec:     (n: number) => `${n} 秒后自动开始...`,
    shuffling:        "正在洗牌...",
    cardsSpread:      "牌面已展开",
    selectCard:       (n: number) => `请选择第 ${n} 张牌`,
    sensing:          "感应中...",
    remaining:        (n: number) => `还需选择 ${n} 张 · 跟随直觉选择`,
    revealing:        "揭示命运...",
    analyzing:        ["塔罗师正在感应能量...", "解读星象与牌意...", "汇聚宇宙的智慧...", "为你寻找专属指引..."],
    positions:        { single: ["今日指引"], three: ["过去", "现在", "未来"] },
    reversed:         "逆位",
    fallbackReading:  "宇宙的讯息正在传递中，请稍后再试。",
    errorReading:     "宇宙正在沉默中说话，有时候沉默本身就是答案。\n\n你内心深处已经知道答案，塔罗牌只是帮你映照出你自己的智慧。跟随直觉，相信自己。",
  },
  en: {
    meditationTitle:  "Silently focus on your question",
    meditationDesc:   (name: string) => `Close your eyes, breathe deeply, and concentrate your ${name} question in your heart...`,
    countdownReady:   "Ready — shuffling cards...",
    countdownSec:     (n: number) => `Starting in ${n}...`,
    shuffling:        "Shuffling the deck...",
    cardsSpread:      "Cards are spread",
    selectCard:       (n: number) => `Choose card ${n}`,
    sensing:          "Sensing...",
    remaining:        (n: number) => `${n} more card${n > 1 ? "s" : ""} to pick · follow your intuition`,
    revealing:        "Revealing your fate...",
    analyzing:        ["The oracle is sensing energy...", "Reading the stars & cards...", "Gathering cosmic wisdom...", "Finding your personal guidance..."],
    positions:        { single: ["Today's Guidance"], three: ["Past", "Present", "Future"] },
    reversed:         "Rev.",
    fallbackReading:  "The cosmic message is still traveling — please try again.",
    errorReading:     "The universe speaks through silence — sometimes silence itself is the answer.\n\nYou already know the truth within. The cards simply reflect your own wisdom. Trust your intuition.",
  },
};
// ─────────────────────────────────────────────────────

type DrawStep =
  | "meditation"
  | "shuffling"
  | "spread"
  | "selecting"
  | "flipping"
  | "analyzing";

interface DrawnCard {
  card: TarotCard;
  reversed: boolean;
  selected: boolean;
}

interface SelectedCard extends DrawnCard {
  flipped: boolean;
}

interface DrawingPhaseProps {
  domain: string;
  spreadType: "single" | "three";
  lang?: "zh" | "en";
  onComplete: (result: ReadingState) => void;
}

const TOTAL_DISPLAY_CARDS = 12;

export function DrawingPhase({ domain, spreadType, lang = "zh", onComplete }: DrawingPhaseProps) {
  const t = DT[lang];
  const spreadPositions = spreadType === "single" ? t.positions.single : t.positions.three;

  const [step, setStep] = useState<DrawStep>("meditation");
  const [countdown, setCountdown] = useState(3);
  const [displayCards, setDisplayCards] = useState<DrawnCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffleCount, setShuffleCount] = useState(0);
  const [loadingText, setLoadingText] = useState(t.analyzing[0]!);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const selectedCardsRef = useRef<SelectedCard[]>([]);
  selectedCardsRef.current = selectedCards;

  const domainInfo = DOMAINS.find((d) => d.id === domain);
  const cardCount = spreadType === "single" ? 1 : 3;

  // 冥想倒计时
  useEffect(() => {
    if (step !== "meditation") return;
    if (countdown <= 0) {
      setTimeout(() => setStep("shuffling"), 500);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [step, countdown]);

  // 洗牌动画
  useEffect(() => {
    if (step !== "shuffling") return;

    const shuffleInterval = setInterval(() => {
      setIsShuffling(true);
      setShuffleCount((c) => c + 1);
      setTimeout(() => setIsShuffling(false), 400);
    }, 600);

    const timeout = setTimeout(() => {
      clearInterval(shuffleInterval);
      const allDrawn = drawCards(TOTAL_DISPLAY_CARDS);
      setDisplayCards(allDrawn.map((d) => ({ ...d, selected: false })));
      setStep("spread");
    }, 3000);

    return () => {
      clearInterval(shuffleInterval);
      clearTimeout(timeout);
    };
  }, [step]);

  // 展开动画后进入选择步骤
  useEffect(() => {
    if (step !== "spread") return;
    const timer = setTimeout(() => setStep("selecting"), 800);
    return () => clearTimeout(timer);
  }, [step]);

  // 处理选牌
  const handleSelectCard = useCallback(
    (index: number) => {
      if (step !== "selecting") return;
      if (displayCards[index]?.selected) return;
      if (selectedCards.length >= cardCount) return;

      const picked = displayCards[index]!;

      setDisplayCards((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index]!, selected: true };
        return updated;
      });

      const newSelected: SelectedCard[] = [
        ...selectedCards,
        { ...picked, flipped: false },
      ];
      setSelectedCards(newSelected);

      if (newSelected.length >= cardCount) {
        setTimeout(() => {
          setStep("flipping");
          newSelected.forEach((_, i) => {
            setTimeout(() => {
              setSelectedCards((prev) =>
                prev.map((c, idx) => (idx === i ? { ...c, flipped: true } : c)),
              );
            }, i * 700);
          });
          setTimeout(
            () => setStep("analyzing"),
            newSelected.length * 700 + 600,
          );
        }, 300);
      }
    },
    [step, displayCards, selectedCards, cardCount],
  );

  // AI 解析
  useEffect(() => {
    if (step !== "analyzing") return;

    const messages = t.analyzing;
    let idx = 0;
    const msgInterval = setInterval(() => {
      idx = (idx + 1) % messages.length;
      setLoadingText(messages[idx]!);
    }, 1500);

    const callAI = async () => {
      const cards = selectedCardsRef.current;
      try {
        const response = await fetch("/api/reading", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cards: cards.map((c, i) => ({
              name: c.card.name,
              nameCn: c.card.nameCn,
              reversed: c.reversed,
              position: spreadPositions[i],
              meaningUp: c.card.meaningUp,
              meaningRev: c.card.meaningRev,
              keywords: c.card.keywords,
            })),
            domain,
            spreadType,
            lang,
          }),
        });

        const data = (await response.json()) as { reading?: string; error?: string };
        const reading = data.reading ?? t.fallbackReading;

        clearInterval(msgInterval);
        onCompleteRef.current({ domain, spreadType, cards, reading });
      } catch (err) {
        console.error("AI reading error:", err);
        clearInterval(msgInterval);
        onCompleteRef.current({ domain, spreadType, cards, reading: t.errorReading });
      }
    };

    void callAI();
    return () => clearInterval(msgInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // ── 渲染各步骤 ──────────────────────────────────────

  if (step === "meditation") {
    const domainName = lang === "en"
      ? (domain.charAt(0).toUpperCase() + domain.slice(1))
      : (domainInfo?.name ?? domain);

    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="animate-fade-in-up max-w-md">
          <div className="text-6xl mb-8 animate-float">{domainInfo?.icon ?? "🔮"}</div>
          <h2 className="font-cinzel text-2xl text-gold mb-4">
            {t.meditationTitle}
          </h2>
          <p className="text-gold-light/70 mb-8 leading-relaxed">
            {t.meditationDesc(domainName)}
          </p>

          <div className="relative w-24 h-24 mx-auto">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(201, 168, 76, 0.2)" strokeWidth="4" />
              <circle
                cx="50" cy="50" r="45" fill="none" stroke="#c9a84c" strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${283 * ((3 - countdown) / 3)} 283`}
                style={{ transition: "stroke-dasharray 0.9s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-cinzel text-gold text-3xl">
                {countdown === 0 ? "✓" : countdown}
              </span>
            </div>
          </div>

          <p className="mt-6 text-gold/40 text-sm">
            {countdown > 0 ? t.countdownSec(countdown) : t.countdownReady}
          </p>
        </div>
      </div>
    );
  }

  if (step === "shuffling") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="animate-fade-in-up">
          <h2 className="font-cinzel text-2xl text-gold mb-8">{t.shuffling}</h2>

          <div className="relative w-32 h-52 mx-auto mb-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-xl overflow-hidden"
                style={{
                  transform: isShuffling
                    ? `translateX(${(i - 2) * 8}px) rotate(${(i - 2) * 3}deg)`
                    : `translateX(${(shuffleCount % 2 === 0 ? 1 : -1) * (i - 2) * 6}px) rotate(${(shuffleCount % 2 === 0 ? 1 : -1) * (i - 2) * 2}deg)`,
                  transition: "transform 0.3s ease",
                  zIndex: i,
                }}
              >
                <img src="/images/cards/back.jpg" alt="Card back" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            <span className="loading-dot w-2 h-2 bg-gold rounded-full" />
            <span className="loading-dot w-2 h-2 bg-gold rounded-full" />
            <span className="loading-dot w-2 h-2 bg-gold rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (step === "spread" || step === "selecting") {
    const isSelecting = step === "selecting";
    const remaining = cardCount - selectedCards.length;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-24">
        <div className="w-full max-w-3xl animate-fade-in-up">
          <div className="text-center mb-8">
            <h2 className="font-cinzel text-2xl text-gold mb-2">
              {isSelecting
                ? remaining > 0
                  ? t.selectCard(selectedCards.length + 1)
                  : t.sensing
                : t.cardsSpread}
            </h2>
            {spreadType === "three" && isSelecting && remaining > 0 && (
              <div className="flex justify-center gap-4 mt-3">
                {spreadPositions.map((pos, i) => (
                  <span
                    key={pos}
                    className="text-xs px-3 py-1 rounded-full transition-all"
                    style={{
                      background:
                        i < selectedCards.length
                          ? "rgba(201, 168, 76, 0.3)"
                          : i === selectedCards.length
                            ? "rgba(201, 168, 76, 0.15)"
                            : "rgba(255,255,255,0.05)",
                      color:
                        i <= selectedCards.length
                          ? "#c9a84c"
                          : "rgba(255,255,255,0.3)",
                      border: `1px solid ${i === selectedCards.length ? "rgba(201, 168, 76, 0.5)" : "rgba(255,255,255,0.1)"}`,
                    }}
                  >
                    {i < selectedCards.length ? "✓ " : i === selectedCards.length ? "► " : ""}
                    {pos}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 扇形展开的牌 */}
          <div className="relative" style={{ height: "300px" }}>
            <div className="absolute left-1/2 bottom-0" style={{ transform: "translateX(-50%)" }}>
              {displayCards.map((drawnCard, i) => {
                const total = displayCards.length;
                const angle = ((i / (total - 1)) - 0.5) * 120;
                const radius = 300;
                const rad = (angle * Math.PI) / 180;
                const x = radius * Math.sin(rad);
                const y = radius - radius * Math.cos(rad);

                return (
                  <div
                    key={i}
                    onClick={() => handleSelectCard(i)}
                    className="absolute transition-all duration-300"
                    style={{
                      width: "64px", height: "106px",
                      transform: `translateX(calc(-50% + ${x}px)) translateY(${-y}px) rotate(${angle}deg)`,
                      transformOrigin: "bottom center",
                      cursor: isSelecting && !drawnCard.selected ? "pointer" : "default",
                      zIndex: drawnCard.selected ? 20 : i,
                    }}
                  >
                    <div
                      className={`w-full h-full rounded-lg overflow-hidden transition-all duration-300 ${
                        isSelecting && !drawnCard.selected ? "hover:shadow-gold hover:-translate-y-2" : ""
                      } ${drawnCard.selected ? "ring-2 ring-gold shadow-gold-lg" : "border border-white/10"}`}
                    >
                      <img src="/images/cards/back.jpg" alt="Card" className="w-full h-full object-cover" />
                    </div>
                    {drawnCard.selected && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gold/20 rounded-lg">
                        <span className="text-gold text-lg font-bold">✓</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {isSelecting && remaining > 0 && (
            <p className="text-center text-gold/50 text-sm mt-6">
              {t.remaining(remaining)}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (step === "flipping") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <h2 className="font-cinzel text-2xl text-gold text-center mb-10">
          {t.revealing}
        </h2>
        <div className="flex justify-center gap-8 flex-wrap">
          {selectedCards.map((sc, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <p className="text-gold/60 text-sm font-cinzel tracking-wider">
                {spreadPositions[i]}
              </p>
              <CardFlip card={sc.card} reversed={sc.reversed} flipped={sc.flipped} delay={i * 0.7} reversedLabel={t.reversed} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === "analyzing") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-24">
        <div className="w-full max-w-2xl">
          <div className="flex justify-center gap-8 flex-wrap mb-12">
            {selectedCards.map((sc, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <p className="text-gold/60 text-sm font-cinzel tracking-wider">
                  {spreadPositions[i]}
                </p>
                <CardFlip card={sc.card} reversed={sc.reversed} flipped={true} delay={0} reversedLabel={t.reversed} />
              </div>
            ))}
          </div>

          <div className="text-center animate-fade-in-up">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border border-gold/20 spin-slow" />
              <div className="absolute inset-2 rounded-full border border-gold/40" style={{ animation: "spin-slow 5s linear infinite reverse" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">🔮</span>
              </div>
            </div>
            <p className="text-gold font-cinzel tracking-wider">{loadingText}</p>
            <div className="flex justify-center gap-2 mt-4">
              <span className="loading-dot w-2 h-2 bg-gold/60 rounded-full" />
              <span className="loading-dot w-2 h-2 bg-gold/60 rounded-full" />
              <span className="loading-dot w-2 h-2 bg-gold/60 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// ── 卡牌翻转组件 ──────────────────────────────────────
interface CardFlipProps {
  card: TarotCard;
  reversed: boolean;
  flipped: boolean;
  delay: number;
  reversedLabel: string;
}

function CardFlip({ card, reversed, flipped, delay, reversedLabel }: CardFlipProps) {
  return (
    <div className="card-flip-container" style={{ width: "100px", height: "166px" }}>
      <div className={`card-flip w-full h-full ${flipped ? "flipped" : ""}`} style={{ transitionDelay: `${delay}s` }}>
        <div className="card-face card-back w-full h-full rounded-xl overflow-hidden shadow-lg">
          <img src="/images/cards/back.jpg" alt="Card back" className="w-full h-full object-cover" />
        </div>
        <div className="card-face card-front w-full h-full rounded-xl overflow-hidden shadow-gold relative">
          <img
            src={`/images/cards/${card.imageFile}`}
            alt={card.nameCn}
            className="w-full h-full object-cover"
            style={reversed ? { transform: "rotate(180deg)" } : {}}
          />
          {reversed && (
            <div
              className="absolute bottom-1 right-1 px-1 rounded text-white"
              style={{ background: "rgba(220, 60, 60, 0.85)", fontSize: "9px" }}
            >
              {reversedLabel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
