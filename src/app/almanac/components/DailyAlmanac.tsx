"use client";

import { useState } from "react";
import { ALMANAC_EVENTS, WEEK_DAYS, YI_TIPS } from "../almanac-data";
import type { DayInfo } from "../almanac-engine";

interface DailyAlmanacProps {
  dayInfo: DayInfo;
  onDateChange: (delta: number) => void;
}

export default function DailyAlmanac({ dayInfo, onDateChange }: DailyAlmanacProps) {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [showPengzu, setShowPengzu] = useState(false);

  const { solar, lunar, yearGan, yearZhi, monthGan, monthZhi, dayGan, dayZhi } = dayInfo;
  const weekStr = `星期${WEEK_DAYS[solar.weekDay]}`;

  const getEventIcon = (key: string) => ALMANAC_EVENTS.find(e => e.key === key)?.icon ?? "•";
  const getEventName = (key: string) => ALMANAC_EVENTS.find(e => e.key === key)?.name ?? key;

  const scoreColor = dayInfo.score >= 4 ? "#C0392B" : dayInfo.score >= 3 ? "#E67E22" : "#7F8C8D";
  const scoreStars = "★".repeat(Math.round(dayInfo.score)) + "☆".repeat(5 - Math.round(dayInfo.score));

  return (
    <div className="al-daily">
      {/* 日期导航 */}
      <div className="al-date-nav">
        <button className="al-nav-btn" onClick={() => onDateChange(-1)}>‹</button>
        <div className="al-date-center">
          <div className="al-solar-date">
            <span className="al-solar-year">{solar.year}年</span>
            <span className="al-solar-md">{solar.month}月{solar.day}日</span>
            <span className="al-weekday">{weekStr}</span>
          </div>
          <div className="al-lunar-date">
            {yearGan}{yearZhi}年 · {lunar.monthName}{lunar.dayName}
            {dayInfo.festival && <span className="al-festival-badge">{dayInfo.festival}</span>}
            {dayInfo.solarTerm && <span className="al-term-badge">{dayInfo.solarTerm}</span>}
          </div>
        </div>
        <button className="al-nav-btn" onClick={() => onDateChange(1)}>›</button>
      </div>

      {/* 干支与吉凶等级 */}
      <div className="al-ganzhi-row">
        <div className="al-ganzhi-item">
          <span className="al-gz-label">年柱</span>
          <span className="al-gz-value">{yearGan}{yearZhi}</span>
        </div>
        <div className="al-ganzhi-item">
          <span className="al-gz-label">月柱</span>
          <span className="al-gz-value">{monthGan}{monthZhi}</span>
        </div>
        <div className="al-ganzhi-item">
          <span className="al-gz-label">日柱</span>
          <span className="al-gz-value">{dayGan}{dayZhi}</span>
        </div>
        <div className="al-score-item">
          <div className={`al-jianshen ${dayInfo.isHuangDao ? "al-huangdao" : "al-heidao"}`}>
            {dayInfo.jianShen}日 · {dayInfo.isHuangDao ? "黄道" : "黑道"}
          </div>
          <div className="al-score-stars" style={{ color: scoreColor }}>{scoreStars}</div>
        </div>
      </div>

      {/* 宜忌 */}
      <div className="al-yiji-section">
        {/* 宜 */}
        <div className="al-yi-block">
          <div className="al-yi-header">
            <span className="al-yi-title al-yi-red">宜</span>
            <span className="al-yi-hint">点击事项查看详解</span>
          </div>
          <div className="al-event-list">
            {dayInfo.yi.slice(0, 8).map(key => (
              <button key={key} className={`al-event-tag al-tag-yi ${expandedEvent === key ? "al-tag-active" : ""}`}
                onClick={() => setExpandedEvent(expandedEvent === key ? null : key)}>
                <span>{getEventIcon(key)}</span>
                <span>{getEventName(key)}</span>
              </button>
            ))}
          </div>
          {expandedEvent && dayInfo.yi.includes(expandedEvent) && (
            <div className="al-event-detail">
              <div className="al-event-detail-name">{getEventIcon(expandedEvent)} {getEventName(expandedEvent)}</div>
              <p className="al-event-detail-text">
                {ALMANAC_EVENTS.find(e => e.key === expandedEvent)?.desc ?? YI_TIPS[expandedEvent] ?? "此日宜行此事，顺遂平安。"}
              </p>
            </div>
          )}
        </div>

        {/* 忌 */}
        <div className="al-ji-block">
          <div className="al-ji-header">
            <span className="al-ji-title">忌</span>
          </div>
          <div className="al-event-list">
            {dayInfo.ji.slice(0, 6).map(key => (
              <button key={key} className={`al-event-tag al-tag-ji ${expandedEvent === key ? "al-tag-active-ji" : ""}`}
                onClick={() => setExpandedEvent(expandedEvent === key ? null : key)}>
                <span>{getEventIcon(key)}</span>
                <span>{getEventName(key)}</span>
              </button>
            ))}
          </div>
          {expandedEvent && dayInfo.ji.includes(expandedEvent) && (
            <div className="al-event-detail al-event-detail-ji">
              <div className="al-event-detail-name">{getEventIcon(expandedEvent)} {getEventName(expandedEvent)}</div>
              <p className="al-event-detail-text">
                {ALMANAC_EVENTS.find(e => e.key === expandedEvent)?.desc ?? "此日忌行此事，宜另择吉日。"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 冲煞与方位 */}
      <div className="al-chong-section">
        <div className="al-chong-item">
          <div className="al-chong-label">冲煞</div>
          <div className="al-chong-value">
            冲{dayInfo.chongAnimal}（{dayInfo.chongZhi}）
          </div>
          <div className="al-chong-sub">煞{dayInfo.shaDirection}</div>
        </div>
        <div className="al-direction-item">
          <div className="al-dir-label">财神</div>
          <div className="al-dir-value">{dayInfo.caishenDir}</div>
        </div>
        <div className="al-direction-item">
          <div className="al-dir-label">喜神</div>
          <div className="al-dir-value">{dayInfo.xishenDir}</div>
        </div>
        <div className="al-direction-item">
          <div className="al-dir-label">福神</div>
          <div className="al-dir-value">{dayInfo.fushenDir}</div>
        </div>
      </div>

      {/* 彭祖百忌（折叠）*/}
      <div className="al-pengzu-section">
        <button className="al-pengzu-toggle" onClick={() => setShowPengzu(p => !p)}>
          <span>彭祖百忌</span>
          <span className="al-toggle-icon">{showPengzu ? "▲" : "▼"}</span>
        </button>
        {showPengzu && (
          <div className="al-pengzu-content">
            {dayInfo.pengzuTiangan && <p className="al-pengzu-text">· {dayInfo.pengzuTiangan}</p>}
            {dayInfo.pengzuDizhi   && <p className="al-pengzu-text">· {dayInfo.pengzuDizhi}</p>}
            {!dayInfo.pengzuTiangan && !dayInfo.pengzuDizhi && (
              <p className="al-pengzu-text">今日无彭祖百忌，可放心行事。</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
