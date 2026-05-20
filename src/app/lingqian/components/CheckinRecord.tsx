"use client";
import React, { useEffect, useState } from "react";
import { CheckinState, getCheckinState, formatDate } from "../lingqian-engine";
import { LUCK_COLORS } from "../lingqian-data";

interface CheckinRecordProps {
  onClose: () => void;
}

const LUCK_ICONS: Record<string, string> = {
  上上: "🌟",
  上吉: "✨",
  中吉: "🔮",
  中平: "☯️",
  下下: "🌑",
};

export default function CheckinRecord({ onClose }: CheckinRecordProps) {
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
        <h2 className="lq-record-title">📅 求签记录</h2>

        {/* 统计卡片 */}
        <div className="lq-record-stats">
          <div className="lq-stat-card lq-stat-streak">
            <div className="lq-stat-num">{state.streakDays}</div>
            <div className="lq-stat-label">连续打卡</div>
            <div className="lq-stat-unit">天</div>
          </div>
          <div className="lq-stat-card lq-stat-total">
            <div className="lq-stat-num">{state.totalDays}</div>
            <div className="lq-stat-label">累计求签</div>
            <div className="lq-stat-unit">天</div>
          </div>
          <div className="lq-stat-card lq-stat-luck">
            <div className="lq-stat-num lq-stat-num-sm">
              {hasRecords
                ? LUCK_ICONS[state.records[0]!.luck] || "☯️"
                : "—"}
            </div>
            <div className="lq-stat-label">最近签运</div>
            <div className="lq-stat-unit">{hasRecords ? state.records[0]!.luck : "暂无"}</div>
          </div>
        </div>

        {/* 打卡激励语 */}
        {state.streakDays > 0 && (
          <div className="lq-record-encourage">
            {state.streakDays >= 7
              ? `🏆 坚持 ${state.streakDays} 天，福气深厚，神明庇佑！`
              : state.streakDays >= 3
              ? `🎯 已连续 ${state.streakDays} 天，继续保持！`
              : `🌱 第 ${state.streakDays} 天，好的开始！`}
          </div>
        )}

        {/* 历史记录列表 */}
        <div className="lq-record-list-wrap">
          <h3 className="lq-record-list-title">历史记录</h3>
          {!hasRecords ? (
            <div className="lq-record-empty">
              <span className="lq-record-empty-icon">🪔</span>
              <p>还没有求签记录</p>
              <p className="lq-record-empty-hint">今日诚心一签，开启福运之旅</p>
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
                      {rec.luck}
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
