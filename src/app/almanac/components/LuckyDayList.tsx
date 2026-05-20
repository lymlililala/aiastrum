"use client";

import { useState } from "react";
import { WEEK_DAYS, ALMANAC_EVENTS } from "../almanac-data";
import type { LuckyDay } from "../almanac-engine";
import DailyAlmanac from "./DailyAlmanac";
import HourTimeline from "./HourTimeline";

interface LuckyDayListProps {
  days: LuckyDay[];
  eventName: string;
  onReset: () => void;
}

export default function LuckyDayList({ days, eventName, onReset }: LuckyDayListProps) {
  const [selectedDay, setSelectedDay] = useState<LuckyDay | null>(null);
  const [shared, setShared] = useState(false);

  if (selectedDay) {
    return (
      <div className="al-day-detail-page">
        <button className="al-back-btn" onClick={() => setSelectedDay(null)}>
          ← 返回列表
        </button>
        <div className="al-day-detail-title">
          <span className="al-dd-score" style={{ color: selectedDay.overallScore >= 4 ? "#C0392B" : "#E67E22" } as React.CSSProperties}>
            {"★".repeat(Math.round(selectedDay.overallScore))}
          </span>
          <span className="al-dd-headline">
            {selectedDay.solar.year}年{selectedDay.solar.month}月{selectedDay.solar.day}日
          </span>
        </div>

        {selectedDay.shengxiaoTip && (
          <div className="al-shengxiao-tip">
            ✦ {selectedDay.shengxiaoTip}
          </div>
        )}

        <DailyAlmanac dayInfo={selectedDay} onDateChange={() => {}} />
        <HourTimeline dayInfo={selectedDay} />

        {/* 生成分享文案 */}
        <div className="al-share-card">
          <div className="al-share-card-title">✦ 择日吉日海报</div>
          <div className="al-share-poster">
            <div className="al-poster-top">老黄历 · 择吉日</div>
            <div className="al-poster-event">{eventName}</div>
            <div className="al-poster-date">
              {selectedDay.solar.year}年{selectedDay.solar.month}月{selectedDay.solar.day}日
            </div>
            <div className="al-poster-lunar">
              {selectedDay.yearGan}{selectedDay.yearZhi}年 {selectedDay.lunar.monthName}{selectedDay.lunar.dayName}
            </div>
            <div className="al-poster-ganzhi">
              {selectedDay.dayGan}{selectedDay.dayZhi}日 · {selectedDay.jianShen}日
            </div>
            <div className="al-poster-luck">
              {selectedDay.isHuangDao ? "🌟 黄道吉日" : ""}
            </div>
            <div className="al-poster-yi">
              宜：{selectedDay.yi.slice(0, 4).map(k => ALMANAC_EVENTS.find(e => e.key === k)?.name ?? k).join(" ")}
            </div>
            {selectedDay.shengxiaoTip && (
              <div className="al-poster-sx">{selectedDay.shengxiaoTip}</div>
            )}
          </div>
          <button className="al-copy-btn" onClick={async () => {
            const text = `择吉日通知\n${eventName} 吉日：${selectedDay.solar.year}年${selectedDay.solar.month}月${selectedDay.solar.day}日（${selectedDay.lunar.monthName}${selectedDay.lunar.dayName}）\n${selectedDay.isHuangDao ? "🌟 黄道吉日 " : ""}宜：${selectedDay.yi.slice(0,3).map(k => ALMANAC_EVENTS.find(e=>e.key===k)?.name ?? k).join("、")}\n${selectedDay.shengxiaoTip ?? ""}`;
            await navigator.clipboard.writeText(text).catch(() => {});
            setShared(true);
            setTimeout(() => setShared(false), 2000);
          }}>
            {shared ? "✓ 已复制" : "📋 复制分享文案"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="al-list-page">
      {/* 结果头部 */}
      <div className="al-list-header">
        <div className="al-list-title">
          <span className="al-list-event">{eventName}</span>
          <span className="al-list-count">共找到 {days.length} 个吉日</span>
        </div>
        <button className="al-reselect-btn" onClick={onReset}>重新选择</button>
      </div>

      {days.length === 0 ? (
        <div className="al-empty">
          <div className="al-empty-icon">🔍</div>
          <p className="al-empty-text">在所选范围内未找到符合条件的吉日</p>
          <p className="al-empty-hint">建议扩大时间范围，或取消周末限制</p>
          <button className="al-reselect-btn" onClick={onReset}>重新设置</button>
        </div>
      ) : (
        <div className="al-day-cards">
          {days.map((d, i) => {
            const scoreColor = d.overallScore >= 4 ? "#C0392B" : d.overallScore >= 3 ? "#E67E22" : "#7F8C8D";
            return (
              <button key={`${d.solar.year}-${d.solar.month}-${d.solar.day}`}
                className="al-day-card"
                onClick={() => setSelectedDay(d)}
              >
                {/* 排名 */}
                {i < 3 && (
                  <div className={`al-rank-badge al-rank-${i + 1}`}>
                    {i === 0 ? "最佳" : i === 1 ? "次佳" : "推荐"}
                  </div>
                )}

                {/* 左侧：日期 */}
                <div className="al-card-date">
                  <div className="al-card-month">{d.solar.month}月</div>
                  <div className="al-card-day-num">{d.solar.day}</div>
                  <div className="al-card-week">周{WEEK_DAYS[d.solar.weekDay]}</div>
                  <div className="al-card-lunar">{d.lunar.dayName}</div>
                </div>

                {/* 中间：信息 */}
                <div className="al-card-info">
                  <div className="al-card-ganzhi">
                    {d.dayGan}{d.dayZhi}日 · {d.jianShen}
                    {d.isHuangDao && <span className="al-card-hd">黄道</span>}
                  </div>
                  <div className="al-card-tags">
                    {d.matchReason.slice(0, 4).map(r => (
                      <span key={r} className="al-card-tag">{r}</span>
                    ))}
                  </div>
                  {d.shengxiaoTip && (
                    <div className="al-card-sx-tip">{d.shengxiaoTip}</div>
                  )}
                  <div className="al-card-yi">
                    宜：{d.yi.slice(0, 4).map(k => ALMANAC_EVENTS.find(e => e.key === k)?.name ?? k).join(" · ")}
                  </div>
                </div>

                {/* 右侧：评分 */}
                <div className="al-card-score">
                  <div className="al-card-score-num" style={{ color: scoreColor } as React.CSSProperties}>
                    {d.overallScore.toFixed(1)}
                  </div>
                  <div className="al-card-score-stars" style={{ color: scoreColor } as React.CSSProperties}>
                    {"★".repeat(Math.round(d.overallScore))}
                  </div>
                  <div className="al-card-arrow">›</div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
