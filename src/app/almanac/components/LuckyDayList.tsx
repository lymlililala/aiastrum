"use client";

import { useState } from "react";
import { ALMANAC_EVENTS } from "../almanac-data";
import type { LuckyDay } from "../almanac-engine";
import type { AlmanacT, Lang } from "../almanac-i18n";
import DailyAlmanac from "./DailyAlmanac";
import HourTimeline from "./HourTimeline";

interface LuckyDayListProps {
  days: LuckyDay[];
  eventName: string;
  onReset: () => void;
  t: AlmanacT;
  lang: Lang;
}

export default function LuckyDayList({ days, eventName, onReset, t, lang }: LuckyDayListProps) {
  const [selectedDay, setSelectedDay] = useState<LuckyDay | null>(null);
  const [shared, setShared] = useState(false);
  const evName = (k: string) => ALMANAC_EVENTS.find(e => e.key === k)?.name[lang] ?? k;

  if (selectedDay) {
    return (
      <div className="al-day-detail-page">
        <button className="al-back-btn" onClick={() => setSelectedDay(null)}>
          {t.backToList}
        </button>
        <div className="al-day-detail-title">
          <span className="al-dd-score" style={{ color: selectedDay.overallScore >= 4 ? "#C0392B" : "#E67E22" } as React.CSSProperties}>
            {"★".repeat(Math.round(selectedDay.overallScore))}
          </span>
          <span className="al-dd-headline">
            {selectedDay.solar.year}{t.yearSuffix}{selectedDay.solar.month}{t.monthSuffix}{selectedDay.solar.day}{t.daySuffix}
          </span>
        </div>

        {selectedDay.shengxiaoTip && (
          <div className="al-shengxiao-tip">
            ✦ {selectedDay.shengxiaoTip}
          </div>
        )}

        <DailyAlmanac dayInfo={selectedDay} onDateChange={() => {}} t={t} lang={lang} />
        <HourTimeline dayInfo={selectedDay} t={t} lang={lang} />

        {/* 生成分享文案 */}
        <div className="al-share-card">
          <div className="al-share-card-title">{t.shareCardTitle}</div>
          <div className="al-share-poster">
            <div className="al-poster-top">{t.posterTop}</div>
            <div className="al-poster-event">{eventName}</div>
            <div className="al-poster-date">
              {selectedDay.solar.year}{t.yearSuffix}{selectedDay.solar.month}{t.monthSuffix}{selectedDay.solar.day}{t.daySuffix}
            </div>
            <div className="al-poster-lunar">
              {selectedDay.yearGan}{selectedDay.yearZhi}年 {selectedDay.lunar.monthName}{selectedDay.lunar.dayName}
            </div>
            <div className="al-poster-ganzhi">
              {selectedDay.dayGan}{selectedDay.dayZhi}{t.daySuffix} · {selectedDay.jianShen}{t.daySuffix}
            </div>
            <div className="al-poster-luck">
              {selectedDay.isHuangDao ? t.posterHuangdao : ""}
            </div>
            <div className="al-poster-yi">
              {t.posterYiPrefix}{selectedDay.yi.slice(0, 4).map(k => evName(k)).join(" ")}
            </div>
            {selectedDay.shengxiaoTip && (
              <div className="al-poster-sx">{selectedDay.shengxiaoTip}</div>
            )}
          </div>
          <button className="al-copy-btn" onClick={async () => {
            const text = `${t.posterTop}\n${eventName}：${selectedDay.solar.year}${t.yearSuffix}${selectedDay.solar.month}${t.monthSuffix}${selectedDay.solar.day}${t.daySuffix}（${selectedDay.lunar.monthName}${selectedDay.lunar.dayName}）\n${selectedDay.isHuangDao ? t.posterHuangdao + " " : ""}${t.posterYiPrefix}${selectedDay.yi.slice(0,3).map(k => evName(k)).join("、")}\n${selectedDay.shengxiaoTip ?? ""}`;
            await navigator.clipboard.writeText(text).catch(() => {});
            setShared(true);
            setTimeout(() => setShared(false), 2000);
          }}>
            {shared ? t.copiedBtn : t.copyBtn}
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
          <span className="al-list-count">{t.listCountPre}{days.length}{t.listCountPost}</span>
        </div>
        <button className="al-reselect-btn" onClick={onReset}>{t.reselect}</button>
      </div>

      {days.length === 0 ? (
        <div className="al-empty">
          <div className="al-empty-icon">🔍</div>
          <p className="al-empty-text">{t.emptyText}</p>
          <p className="al-empty-hint">{t.emptyHint}</p>
          <button className="al-reselect-btn" onClick={onReset}>{t.emptyReset}</button>
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
                    {i === 0 ? t.rankBest : i === 1 ? t.rankSecond : t.rankRecommend}
                  </div>
                )}

                {/* 左侧：日期 */}
                <div className="al-card-date">
                  <div className="al-card-month">{d.solar.month}{t.monthSuffix}</div>
                  <div className="al-card-day-num">{d.solar.day}</div>
                  <div className="al-card-week">{t.weekShort}{t.weekDays[d.solar.weekDay]}</div>
                  <div className="al-card-lunar">{d.lunar.dayName}</div>
                </div>

                {/* 中间：信息 */}
                <div className="al-card-info">
                  <div className="al-card-ganzhi">
                    {d.dayGan}{d.dayZhi}{t.daySuffix} · {d.jianShen}
                    {d.isHuangDao && <span className="al-card-hd">{t.huangdao}</span>}
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
                    {t.posterYiPrefix}{d.yi.slice(0, 4).map(k => evName(k)).join(" · ")}
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
