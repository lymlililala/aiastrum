"use client";

import React, { useState } from "react";
import { DOMAINS } from "../tarot-data";
import type { ReadingRecord } from "../hooks";

// ── 双语文案 ──────────────────────────────────────────
const HT = {
  zh: {
    title:      "📜 占卜记录",
    emptyMsg:   "还没有占卜记录",
    emptyHint:  "快去开始你的第一次占卜吧",
    single:     "每日一牌",
    three:      "三牌阵",
    reversed:   "(逆)",
  },
  en: {
    title:      "📜 Reading History",
    emptyMsg:   "No readings yet",
    emptyHint:  "Start your first reading now",
    single:     "Daily Card",
    three:      "3-Card Spread",
    reversed:   "(Rev.)",
  },
};
// ─────────────────────────────────────────────────────

interface HistoryPanelProps {
  history: ReadingRecord[];
  lang?: "zh" | "en";
  onClose: () => void;
}

export function HistoryPanel({ history, lang = "zh", onClose }: HistoryPanelProps) {
  const t = HT[lang];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div
      className="fixed inset-0 z-50 flex"
      style={{ background: "rgba(0, 0, 0, 0.6)" }}
      onClick={onClose}
    >
      <div
        className="ml-auto w-full max-w-md h-full glass-dark overflow-y-auto"
        style={{
          boxShadow: "-10px 0 40px rgba(0, 0, 0, 0.5)",
          animation: "slide-in-right 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* 头部 */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-cinzel text-gold text-xl">{t.title}</h2>
            <button onClick={onClose} className="text-gold/50 hover:text-gold transition-colors text-xl">
              ✕
            </button>
          </div>

          {history.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4 opacity-30">🔮</div>
              <p className="text-gold/40 text-sm">{t.emptyMsg}</p>
              <p className="text-gold/30 text-xs mt-1">{t.emptyHint}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((record) => {
                const domainInfo = DOMAINS.find((d) => d.id === record.domain);
                const isExpanded = expandedId === record.id;
                const domainName = lang === "en"
                  ? (domainInfo?.id.charAt(0).toUpperCase() ?? "") + (domainInfo?.id.slice(1) ?? "")
                  : domainInfo?.name ?? "";

                return (
                  <div key={record.id} className="glass-card rounded-xl overflow-hidden">
                    <button
                      className="w-full p-4 text-left hover:bg-white/5 transition-colors"
                      onClick={() => setExpandedId(isExpanded ? null : record.id)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span className="text-xl">{domainInfo?.icon}</span>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-gold text-sm font-semibold">{domainName}</span>
                              <span
                                className="text-xs px-1.5 py-0.5 rounded-full"
                                style={{
                                  background: "rgba(201, 168, 76, 0.15)",
                                  color: "rgba(201, 168, 76, 0.7)",
                                }}
                              >
                                {record.spreadType === "single" ? t.single : t.three}
                              </span>
                            </div>
                            <div className="flex gap-1 flex-wrap">
                              {record.cards.map(({ card, reversed }) => (
                                <span key={card.id} className="text-xs text-gold/50">
                                  {lang === "en" ? card.name : card.nameCn}
                                  {reversed ? t.reversed : ""}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-gold/40 text-xs">{record.date}</p>
                          <span className="text-gold/40 text-xs">{isExpanded ? "▲" : "▼"}</span>
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-white/5">
                        <div className="flex gap-2 pt-3 mb-3">
                          {record.cards.map(({ card, reversed }) => (
                            <div
                              key={card.id}
                              className="rounded-lg overflow-hidden"
                              style={{ width: "50px", height: "83px" }}
                            >
                              <img
                                src={`/images/cards/${card.imageFile}`}
                                alt={card.nameCn}
                                className="w-full h-full object-cover"
                                style={reversed ? { transform: "rotate(180deg)" } : {}}
                              />
                            </div>
                          ))}
                        </div>
                        <p
                          className="text-gold-light/60 text-xs leading-relaxed"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {record.reading.replace(/\*\*/g, "").replace(/\*/g, "")}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
