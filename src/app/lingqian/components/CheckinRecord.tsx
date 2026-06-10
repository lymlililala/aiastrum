"use client";
import React, { useEffect, useState } from "react";
import { CheckinState, getCheckinState, formatDate } from "../lingqian-engine";
import { LUCK_COLORS, type LuckLevel } from "../lingqian-data";
import { resolveLuckLevel } from "../lingqian-content-i18n";
import type { LingT, Lang } from "../lingqian-i18n";

interface CheckinRecordProps {
  onClose: () => void;
  t: LingT;
  lang: Lang;
}

const LUCK_ICONS: Record<string, string> = {
  上上: "🌟",
  上吉: "✨",
  中吉: "🔮",
  中平: "☯️",
  下下: "🌑",
};

export default function CheckinRecord({ onClose, t, lang }: CheckinRecordProps) {
  const [state, setState] = useState<CheckinState | null>(null);

  useEffect(() => {
    setState(getCheckinState());
  }, []);

  if (!state) return null;

  const hasRecords = state.records.length > 0;

  return (
    <div className="lq-record-overlay" onClick={onClose}>
      <div className="lq-record-modal" onClick={(e) => e.stopPropagation()}>
        <button className="lq-record-close" onClick={onClose}>✕</button>
        <h2 className="lq-record-title">{t.recordTitle}</h2>

        {/* 统计卡片 */}
        <div className="lq-record-stats">
          <div className="lq-stat-card lq-stat-streak">
            <div className="lq-stat-num">{state.streakDays}</div>
            <div className="lq-stat-label">{t.recordStreakLabel}</div>
            <div className="lq-stat-unit">{t.recordStreakUnit}</div>
          </div>
          <div className="lq-stat-card lq-stat-total">
            <div className="lq-stat-num">{state.totalDays}</div>
            <div className="lq-stat-label">{t.recordTotalLabel}</div>
            <div className="lq-stat-unit">{t.recordTotalUnit}</div>
          </div>
          <div className="lq-stat-card lq-stat-luck">
            <div className="lq-stat-num lq-stat-num-sm">
              {hasRecords
                ? LUCK_ICONS[state.records[0]!.luck] || "☯️"
                : "—"}
            </div>
            <div className="lq-stat-label">{t.recordLuckLabel}</div>
            <div className="lq-stat-unit">{hasRecords ? resolveLuckLevel(lang, state.records[0]!.luck as LuckLevel) : t.recordLuckNone}</div>
          </div>
        </div>

        {/* 打卡激励语 */}
        {state.streakDays > 0 && (
          <div className="lq-record-encourage">
            {t.recordEncourage(state.streakDays)}
          </div>
        )}

        {/* 历史记录列表 */}
        <div className="lq-record-list-wrap">
          <h3 className="lq-record-list-title">{t.recordListTitle}</h3>
          {!hasRecords ? (
            <div className="lq-record-empty">
              <span className="lq-record-empty-icon">🪔</span>
              <p>{t.recordEmptyText}</p>
              <p className="lq-record-empty-hint">{t.recordEmptyHint}</p>
            </div>
          ) : (
            <div className="lq-record-list">
              {state.records.slice(0, 30).map((rec, idx) => {
                const lc = LUCK_COLORS[rec.luck as keyof typeof LUCK_COLORS];
                const icon = LUCK_ICONS[rec.luck] || "☯️";
                return (
                  <div key={`${rec.date}-${rec.deityId}`} className="lq-record-item">
                    <div className="lq-record-item-date">{formatDate(rec.date)}</div>
                    <div className="lq-record-item-sign">
                      <span className="lq-record-luck-icon">{icon}</span>
                      <span className="lq-record-sign-name">{rec.signName}</span>
                    </div>
                    <div
                      className="lq-record-item-luck"
                      style={{ color: lc?.text, background: lc?.bg, borderColor: lc?.border }}
                    >
                      {resolveLuckLevel(lang, rec.luck as LuckLevel)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
