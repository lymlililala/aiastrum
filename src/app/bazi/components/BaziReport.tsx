"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import type { BaziResult } from "../bazi-engine";
import { ELEMENT_PERSONALITY, ZODIAC_2026_FORTUNE, PILLAR_READINGS, DAY_STEM_READING } from "../bazi-data";
import { getDominantElement, getMissingElements } from "../bazi-engine";

type Lang = "zh" | "en" | "tw";

// ── 报告 UI 文案（三语）。注：命理解读/数据派生文案不在此处，保持原文。
const RT = {
  zh: {
    elementChart:   "五行能量图谱",
    fortuneChart:   "2026年运势图谱",
    radarCareer:    "事业",
    radarWealth:    "财运",
    radarLove:      "感情",
    radarHealth:    "健康",
    radarOverall:   "综合",
    mingge:         "命格",
    zodiacPrefix:   "生肖",
    reportTitleFallback: "命理报告",
    maleLife:       "男命",
    femaleLife:     "女命",
    fourPillars:    "四 柱 八 字",
    pillarYear:     "年柱",
    pillarMonth:    "月柱",
    pillarDay:      "日柱",
    pillarHour:     "时柱",
    unknown:        "未知",
    dayMaster:      "日主：",
    fiveElement:    "五行：",
    flourish:       "旺",
    lacking:        "缺：",
    year2026:       "2026：",
    tabOverview:    "命格总览",
    tabPillars:     "四柱解析",
    tabFortune:     "2026运势",
    tabReport:      "AI解读",
    energyPattern:  "五行能量格局",
    personaTitle:   "性格画像",
    traits:         "✦ 性格特质",
    strengths:      "✦ 天赋优势",
    growth:         "✦ 成长课题",
    stemElementPrefix:   "天干",
    branchElementPrefix: "地支",
    nayinPrefix:    "纳音：",
    hourUnknownNote: "※ 未知时辰，时柱无法精准计算",
    bingwuYear:     "2026丙午年 · 生肖",
    overallFortune: "整体运势",
    careerLuck:     "事业运",
    wealthLuck:     "财运",
    loveLuck:       "感情运",
    healthLuck:     "健康运",
    yearSummary:    "年度总结",
    careerDetailLabel: "事业运势",
    wealthDetailLabel: "财运分析",
    loveDetailLabel:   "感情运势",
    healthDetailLabel: "健康运势",
    luckyAdvice:    "2026年开运建议",
    luckyDirection: "幸运方位",
    luckyColor:     "开运颜色",
    luckyNumber:    "幸运数字",
    aiReading:      "AI 命理师解读",
    writing:        "正在书写...",
    savePoster:     "📤 保存海报",
    restart:        "✦ 重新测算",
    posterTitle:    "生辰八字命理报告",
    posterMale:     "男",
    posterFemale:   "女",
    posterLifeSuffix: "命",
    posterPillarSuffix: "柱",
    posterNayin:    "纳音",
    posterZodiac:   "生肖",
    posterDominant: "主导五行",
    posterAISummary: "AI 命理解读摘要",
    posterFooter:   "天命 · 仅供娱乐参考",
    posterFilename: "八字命理报告",
  },
  tw: {
    elementChart:   "五行能量圖譜",
    fortuneChart:   "2026年運勢圖譜",
    radarCareer:    "事業",
    radarWealth:    "財運",
    radarLove:      "感情",
    radarHealth:    "健康",
    radarOverall:   "綜合",
    mingge:         "命格",
    zodiacPrefix:   "生肖",
    reportTitleFallback: "命理報告",
    maleLife:       "男命",
    femaleLife:     "女命",
    fourPillars:    "四 柱 八 字",
    pillarYear:     "年柱",
    pillarMonth:    "月柱",
    pillarDay:      "日柱",
    pillarHour:     "時柱",
    unknown:        "未知",
    dayMaster:      "日主：",
    fiveElement:    "五行：",
    flourish:       "旺",
    lacking:        "缺：",
    year2026:       "2026：",
    tabOverview:    "命格總覽",
    tabPillars:     "四柱解析",
    tabFortune:     "2026運勢",
    tabReport:      "AI解讀",
    energyPattern:  "五行能量格局",
    personaTitle:   "性格畫像",
    traits:         "✦ 性格特質",
    strengths:      "✦ 天賦優勢",
    growth:         "✦ 成長課題",
    stemElementPrefix:   "天干",
    branchElementPrefix: "地支",
    nayinPrefix:    "納音：",
    hourUnknownNote: "※ 未知時辰，時柱無法精準計算",
    bingwuYear:     "2026丙午年 · 生肖",
    overallFortune: "整體運勢",
    careerLuck:     "事業運",
    wealthLuck:     "財運",
    loveLuck:       "感情運",
    healthLuck:     "健康運",
    yearSummary:    "年度總結",
    careerDetailLabel: "事業運勢",
    wealthDetailLabel: "財運分析",
    loveDetailLabel:   "感情運勢",
    healthDetailLabel: "健康運勢",
    luckyAdvice:    "2026年開運建議",
    luckyDirection: "幸運方位",
    luckyColor:     "開運顏色",
    luckyNumber:    "幸運數字",
    aiReading:      "AI 命理師解讀",
    writing:        "正在書寫...",
    savePoster:     "📤 儲存海報",
    restart:        "✦ 重新測算",
    posterTitle:    "生辰八字命理報告",
    posterMale:     "男",
    posterFemale:   "女",
    posterLifeSuffix: "命",
    posterPillarSuffix: "柱",
    posterNayin:    "納音",
    posterZodiac:   "生肖",
    posterDominant: "主導五行",
    posterAISummary: "AI 命理解讀摘要",
    posterFooter:   "天命 · 僅供娛樂參考",
    posterFilename: "八字命理報告",
  },
  en: {
    elementChart:   "Five Elements Energy Map",
    fortuneChart:   "2026 Fortune Map",
    radarCareer:    "Career",
    radarWealth:    "Wealth",
    radarLove:      "Love",
    radarHealth:    "Health",
    radarOverall:   "Overall",
    mingge:         "Destiny",
    zodiacPrefix:   "Zodiac ",
    reportTitleFallback: "Destiny Report",
    maleLife:       "Male",
    femaleLife:     "Female",
    fourPillars:    "F O U R   P I L L A R S",
    pillarYear:     "Year",
    pillarMonth:    "Month",
    pillarDay:      "Day",
    pillarHour:     "Hour",
    unknown:        "Unknown",
    dayMaster:      "Day Master: ",
    fiveElement:    "Element: ",
    flourish:       " strong",
    lacking:        "Lacking: ",
    year2026:       "2026: ",
    tabOverview:    "Overview",
    tabPillars:     "Pillars",
    tabFortune:     "2026 Fortune",
    tabReport:      "AI Reading",
    energyPattern:  "Five Elements Energy Pattern",
    personaTitle:   "Personality Profile",
    traits:         "✦ Traits",
    strengths:      "✦ Strengths",
    growth:         "✦ Growth Areas",
    stemElementPrefix:   "Stem ",
    branchElementPrefix: "Branch ",
    nayinPrefix:    "Na Yin: ",
    hourUnknownNote: "※ Hour unknown — the Hour Pillar cannot be calculated precisely",
    bingwuYear:     "2026 Bing-Wu Year · Zodiac ",
    overallFortune: "Overall Fortune",
    careerLuck:     "Career",
    wealthLuck:     "Wealth",
    loveLuck:       "Love",
    healthLuck:     "Health",
    yearSummary:    "Yearly Summary",
    careerDetailLabel: "Career Fortune",
    wealthDetailLabel: "Wealth Outlook",
    loveDetailLabel:   "Love Fortune",
    healthDetailLabel: "Health Fortune",
    luckyAdvice:    "2026 Lucky Tips",
    luckyDirection: "Lucky Direction",
    luckyColor:     "Lucky Color",
    luckyNumber:    "Lucky Number",
    aiReading:      "AI Master's Reading",
    writing:        "Writing...",
    savePoster:     "📤 Save Poster",
    restart:        "✦ Restart",
    posterTitle:    "BaZi Destiny Report",
    posterMale:     "Male",
    posterFemale:   "Female",
    posterLifeSuffix: "",
    posterPillarSuffix: "",
    posterNayin:    "Na Yin",
    posterZodiac:   "Zodiac",
    posterDominant: "Dominant Element",
    posterAISummary: "AI Reading Summary",
    posterFooter:   "Destiny · For entertainment only",
    posterFilename: "BaZi_Report",
  },
};
// ────────────────────────────────────────────────────

interface BaziReportProps {
  baziResult: BaziResult;
  report: string;
  birthInfo: { year: number; month: number; day: number; hour: number; gender: "male" | "female" };
  onRestart: () => void;
  lang: Lang;
}

// 五行颜色映射
const ELEMENT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  木: { bg: "rgba(34,139,34,0.15)", text: "#4caf50", border: "rgba(34,139,34,0.3)" },
  火: { bg: "rgba(180,60,30,0.15)", text: "#ef5350", border: "rgba(180,60,30,0.3)" },
  土: { bg: "rgba(160,120,50,0.15)", text: "#ffa726", border: "rgba(160,120,50,0.3)" },
  金: { bg: "rgba(180,160,80,0.15)", text: "#d4af37", border: "rgba(180,160,80,0.3)" },
  水: { bg: "rgba(30,100,180,0.15)", text: "#42a5f5", border: "rgba(30,100,180,0.3)" },
};

// 星级组件
function Stars({ count, max = 5 }: { count: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className="text-base"
          style={{ color: i < count ? "var(--vermillion)" : "rgba(200,150,100,0.2)" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// 五行雷达图（SVG 实现）
function ElementRadar({ scores, t }: { scores: Record<string, number>; t: (typeof RT)[Lang] }) {
  const elements = ["木", "火", "土", "金", "水"];
  const maxScore = 4;
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 60;

  // 五个顶点的角度（从上方开始，顺时针）
  const getPoint = (index: number, value: number) => {
    const angle = ((index * 72 - 90) * Math.PI) / 180;
    const r = (value / maxScore) * radius;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  const bgPoints = elements.map((_, i) => getPoint(i, maxScore));
  const dataPoints = elements.map((el, i) => getPoint(i, Math.min(scores[el] ?? 0, maxScore)));

  const toPath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + " Z";

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* 背景网格 */}
        {[1, 2, 3, 4].map((level) => {
          const pts = elements.map((_, i) => getPoint(i, level));
          return (
            <path
              key={level}
              d={toPath(pts)}
              fill="none"
              stroke="rgba(200,150,100,0.1)"
              strokeWidth="1"
            />
          );
        })}

        {/* 轴线 */}
        {elements.map((_, i) => {
          const outer = getPoint(i, maxScore);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={outer.x}
              y2={outer.y}
              stroke="rgba(200,150,100,0.15)"
              strokeWidth="1"
            />
          );
        })}

        {/* 数据区域 */}
        <path
          d={toPath(dataPoints)}
          fill="rgba(180,60,30,0.25)"
          stroke="var(--vermillion)"
          strokeWidth="1.5"
        />

        {/* 数据点 */}
        {dataPoints.map((pt, i) => (
          <circle
            key={i}
            cx={pt.x}
            cy={pt.y}
            r="3"
            fill="var(--vermillion)"
            stroke="#fff8f0"
            strokeWidth="1"
          />
        ))}

        {/* 标签 */}
        {elements.map((el, i) => {
          const pt = getPoint(i, maxScore + 0.8);
          return (
            <text
              key={el}
              x={pt.x}
              y={pt.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={ELEMENT_COLORS[el]?.text ?? "#fff"}
              fontSize="13"
              fontWeight="bold"
            >
              {el}
            </text>
          );
        })}
      </svg>
      <p className="text-xs mt-2" style={{ color: "rgba(200,180,150,0.5)" }}>
        {t.elementChart}
      </p>
    </div>
  );
}

// 运势雷达图
function FortuneRadar({ fortune, t }: { fortune: (typeof ZODIAC_2026_FORTUNE)[string]; t: (typeof RT)[Lang] }) {
  const aspects = [
    { key: "career" as const, label: t.radarCareer },
    { key: "wealth" as const, label: t.radarWealth },
    { key: "love" as const, label: t.radarLove },
    { key: "health" as const, label: t.radarHealth },
    { key: "overall" as const, label: t.radarOverall },
  ];
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 55;

  const getPoint = (index: number, value: number) => {
    const angle = ((index * 72 - 90) * Math.PI) / 180;
    const r = (value / 5) * radius;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const bgPoints = aspects.map((_, i) => getPoint(i, 5));
  const dataPoints = aspects.map((asp, i) => getPoint(i, fortune[asp.key]));
  const toPath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + " Z";

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {[1, 2, 3, 4, 5].map((level) => {
          const pts = aspects.map((_, i) => getPoint(i, level));
          return (
            <path key={level} d={toPath(pts)} fill="none" stroke="rgba(200,150,100,0.1)" strokeWidth="1" />
          );
        })}
        {aspects.map((_, i) => {
          const outer = getPoint(i, 5);
          return <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke="rgba(200,150,100,0.15)" strokeWidth="1" />;
        })}
        <path d={toPath(dataPoints)} fill="rgba(200,150,30,0.2)" stroke="var(--ink-gold)" strokeWidth="1.5" />
        {dataPoints.map((pt, i) => (
          <circle key={i} cx={pt.x} cy={pt.y} r="3" fill="var(--ink-gold)" stroke="#fff8f0" strokeWidth="1" />
        ))}
        {aspects.map((asp, i) => {
          const pt = getPoint(i, 5 + 0.9);
          return (
            <text key={asp.key} x={pt.x} y={pt.y} textAnchor="middle" dominantBaseline="middle" fill="var(--ink-gold)" fontSize="11" fontWeight="bold">
              {asp.label}
            </text>
          );
        })}
      </svg>
      <p className="text-xs mt-2" style={{ color: "rgba(200,180,150,0.5)" }}>
        {t.fortuneChart}
      </p>
    </div>
  );
}

export function BaziReport({ baziResult, report, birthInfo, onRestart, lang }: BaziReportProps) {
  const t = RT[lang];
  const { yearPillar, monthPillar, dayPillar, hourPillar, elementScores, zodiac, dayStem, nayin, liuNianRelation } = baziResult;
  const dominantElement = getDominantElement(elementScores);
  const missingElements = getMissingElements(elementScores);
  const personality = ELEMENT_PERSONALITY[dominantElement];
  const dayStemReading = DAY_STEM_READING[dayStem];
  const zodiacFortune = ZODIAC_2026_FORTUNE[zodiac];

  const [displayedReport, setDisplayedReport] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "pillars" | "fortune" | "report">("overview");
  const [showShareModal, setShowShareModal] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  // 打字机效果
  useEffect(() => {
    if (!report) return;
    let i = 0;
    setDisplayedReport("");
    setIsTyping(true);

    const timer = setInterval(() => {
      if (i < report.length) {
        setDisplayedReport(report.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 18);

    return () => clearInterval(timer);
  }, [report]);

  // 生成分享海报
  const handleShare = useCallback(async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 750;
    canvas.height = 1050;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 背景
    const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bg.addColorStop(0, "#1a0800");
    bg.addColorStop(0.5, "#2d1005");
    bg.addColorStop(1, "#1a0800");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 边框
    ctx.strokeStyle = "rgba(180,100,50,0.4)";
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // 内边框
    ctx.strokeStyle = "rgba(180,100,50,0.2)";
    ctx.lineWidth = 1;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    // 标题
    ctx.font = "bold 36px serif";
    ctx.fillStyle = "#d4832a";
    ctx.textAlign = "center";
    ctx.fillText(t.posterTitle, canvas.width / 2, 90);

    // 分隔线
    ctx.strokeStyle = "rgba(180,100,50,0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, 110);
    ctx.lineTo(670, 110);
    ctx.stroke();

    // 出生信息
    ctx.font = "22px serif";
    ctx.fillStyle = "#c8a878";
    const posterGender = birthInfo.gender === "male" ? t.posterMale : t.posterFemale;
    const posterBirth =
      lang === "en"
        ? `${birthInfo.year}-${birthInfo.month}-${birthInfo.day}  ${posterGender}`
        : `${birthInfo.year}年${birthInfo.month}月${birthInfo.day}日  ${posterGender}${t.posterLifeSuffix}`;
    ctx.fillText(posterBirth, canvas.width / 2, 150);

    // 四柱八字框
    ctx.font = "bold 28px serif";
    ctx.fillStyle = "#e8d5a3";
    const pillarsData = [
      { label: t.pillarYear, stem: yearPillar.stem, branch: yearPillar.branch },
      { label: t.pillarMonth, stem: monthPillar.stem, branch: monthPillar.branch },
      { label: t.pillarDay, stem: dayPillar.stem, branch: dayPillar.branch },
      { label: t.pillarHour, stem: hourPillar?.stem ?? "?", branch: hourPillar?.branch ?? "?" },
    ];

    pillarsData.forEach((pillar, i) => {
      const x = 130 + i * 130;
      const y = 210;
      // 柱框
      ctx.strokeStyle = "rgba(180,100,50,0.5)";
      ctx.lineWidth = 1;
      ctx.strokeRect(x - 40, y - 30, 80, 120);
      // 柱标签
      ctx.font = "16px serif";
      ctx.fillStyle = "rgba(200,150,80,0.7)";
      ctx.fillText(`${pillar.label}${t.posterPillarSuffix}`, x, y - 10);
      // 天干
      ctx.font = "bold 36px serif";
      ctx.fillStyle = "#e8d5a3";
      ctx.fillText(pillar.stem, x, y + 30);
      // 地支
      ctx.fillStyle = "#c9a84c";
      ctx.fillText(pillar.branch, x, y + 70);
    });

    // 纳音和生肖
    ctx.font = "20px serif";
    ctx.fillStyle = "rgba(200,150,80,0.8)";
    ctx.fillText(`${t.posterNayin}：${nayin}  ·  ${t.posterZodiac}：${zodiac}  ·  ${t.posterDominant}：${dominantElement}`, canvas.width / 2, 360);

    // 分隔线
    ctx.strokeStyle = "rgba(180,100,50,0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, 380);
    ctx.lineTo(670, 380);
    ctx.stroke();

    // AI 解读摘要
    ctx.font = "bold 22px serif";
    ctx.fillStyle = "#d4832a";
    ctx.fillText(t.posterAISummary, canvas.width / 2, 420);

    // 报告文字（截取前200字）
    const reportText = report.replace(/\*\*/g, "").replace(/✦/g, "·").slice(0, 220);
    ctx.font = "18px serif";
    ctx.fillStyle = "#c8a878";
    ctx.textAlign = "left";

    const words = reportText.split("");
    let line = "";
    let lineY = 460;
    const lineWidth = 590;
    const startX = 80;

    for (const char of words) {
      const testLine = line + char;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > lineWidth) {
        ctx.fillText(line, startX, lineY);
        line = char;
        lineY += 28;
        if (lineY > 700) {
          ctx.fillText(line + "...", startX, lineY);
          break;
        }
      } else {
        line = testLine;
      }
    }
    if (lineY <= 700) ctx.fillText(line, startX, lineY);

    // 底部信息
    ctx.textAlign = "center";
    ctx.font = "16px serif";
    ctx.fillStyle = "rgba(200,150,80,0.5)";
    ctx.fillText(t.posterFooter, canvas.width / 2, canvas.height - 60);
    ctx.fillText("✦ ✦ ✦", canvas.width / 2, canvas.height - 35);

    try {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${t.posterFilename}_${birthInfo.year}${birthInfo.month}${birthInfo.day}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      console.error("生成海报失败");
    }
  }, [baziResult, birthInfo, report, nayin, zodiac, dominantElement, yearPillar, monthPillar, dayPillar, hourPillar, lang, t]);

  const pillars = [
    { key: "year", data: yearPillar, label: t.pillarYear },
    { key: "month", data: monthPillar, label: t.pillarMonth },
    { key: "day", data: dayPillar, label: t.pillarDay },
    { key: "hour", data: hourPillar, label: t.pillarHour },
  ] as const;

  return (
    <div className="min-h-screen pb-20">
      {/* 顶部命格标识 */}
      <div
        className="text-center pt-24 pb-8 px-4"
        style={{ animation: "bazi-fade-in 0.8s ease-out" }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
          style={{
            background: "rgba(180, 60, 30, 0.15)",
            border: "1px solid rgba(180, 60, 30, 0.3)",
          }}
        >
          <span style={{ color: "var(--vermillion)" }} className="text-sm">{t.mingge}</span>
          <span className="w-px h-3 bg-current opacity-30" style={{ color: "var(--vermillion)" }} />
          <span style={{ color: "var(--ink-gold)" }} className="text-sm font-bold">{nayin}</span>
          <span className="w-px h-3 bg-current opacity-30" style={{ color: "var(--vermillion)" }} />
          <span style={{ color: "var(--vermillion)" }} className="text-sm">{t.zodiacPrefix}{zodiac}</span>
        </div>

        <h1
          className="text-4xl font-bold mb-2"
          style={{
            background: "linear-gradient(135deg, #e8d5a3, #d4832a, #c9a84c)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "serif",
          }}
        >
          {personality?.title ?? t.reportTitleFallback}
        </h1>
        <p className="text-sm" style={{ color: "rgba(200,180,150,0.6)" }}>
          {birthInfo.year}{lang === "en" ? "-" : "年"}{birthInfo.month}{lang === "en" ? "-" : "月"}{birthInfo.day}{lang === "en" ? "" : "日"} · {birthInfo.gender === "male" ? t.maleLife : t.femaleLife}
        </p>
      </div>

      {/* 四柱八字展示卡 */}
      <div className="px-4 mb-6">
        <div
          className="max-w-lg mx-auto rounded-2xl p-5"
          style={{
            background: "rgba(30, 10, 5, 0.8)",
            border: "1px solid rgba(180, 100, 50, 0.3)",
            backdropFilter: "blur(12px)",
          }}
        >
          <p
            className="text-center text-xs mb-4 tracking-widest"
            style={{ color: "rgba(200,180,150,0.5)" }}
          >
            {t.fourPillars}
          </p>
          <div className="grid grid-cols-4 gap-3">
            {pillars.map(({ key, data, label }) => (
              <div key={key} className="text-center">
                <div
                  className="text-xs mb-2"
                  style={{ color: "rgba(200,150,80,0.6)" }}
                >
                  {label}
                </div>
                <div
                  className="rounded-xl py-3 flex flex-col items-center gap-1"
                  style={{
                    background: "rgba(180, 60, 30, 0.1)",
                    border: "1px solid rgba(180, 60, 30, 0.2)",
                  }}
                >
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "var(--ink-light)", fontFamily: "serif" }}
                  >
                    {data ? data.stem : "?"}
                  </span>
                  <div
                    className="w-full h-px"
                    style={{ background: "rgba(180, 60, 30, 0.2)" }}
                  />
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "var(--ink-gold)", fontFamily: "serif" }}
                  >
                    {data ? data.branch : "?"}
                  </span>
                </div>
                <div className="mt-2 text-xs" style={{ color: "rgba(200,180,150,0.4)" }}>
                  {data ? data.nayin : t.unknown}
                </div>
              </div>
            ))}
          </div>
          <div
            className="mt-4 pt-3 flex flex-wrap justify-center gap-3"
            style={{ borderTop: "1px solid rgba(180,100,50,0.2)" }}
          >
            <span className="text-xs" style={{ color: "rgba(200,180,150,0.6)" }}>
              {t.dayMaster}<span style={{ color: "var(--vermillion)" }} className="font-bold">{dayStem}</span>
            </span>
            <span className="text-xs" style={{ color: "rgba(200,180,150,0.6)" }}>
              {t.fiveElement}<span style={{ color: ELEMENT_COLORS[dominantElement]?.text }} className="font-bold">{dominantElement}</span>{t.flourish}
            </span>
            {missingElements.length > 0 && (
              <span className="text-xs" style={{ color: "rgba(200,180,150,0.6)" }}>
                {t.lacking}<span style={{ color: "rgba(200,100,60,0.8)" }}>{missingElements.join("")}</span>
              </span>
            )}
            <span className="text-xs" style={{ color: "rgba(200,180,150,0.6)" }}>
              {t.year2026}<span style={{ color: "var(--ink-gold)" }}>{liuNianRelation}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Tab 导航 */}
      <div className="px-4 mb-6">
        <div className="max-w-lg mx-auto flex gap-1 rounded-xl p-1"
          style={{ background: "rgba(20, 8, 2, 0.6)", border: "1px solid rgba(180,100,50,0.2)" }}
        >
          {[
            { id: "overview" as const, label: t.tabOverview },
            { id: "pillars" as const, label: t.tabPillars },
            { id: "fortune" as const, label: t.tabFortune },
            { id: "report" as const, label: t.tabReport },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 py-2 rounded-lg text-xs font-medium transition-all"
              style={{
                background: activeTab === tab.id ? "rgba(180, 60, 30, 0.6)" : "transparent",
                color: activeTab === tab.id ? "#fff8f0" : "rgba(200,180,150,0.5)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 内容 */}
      <div className="px-4">
        <div className="max-w-lg mx-auto">

          {/* 命格总览 */}
          {activeTab === "overview" && (
            <div style={{ animation: "bazi-fade-in 0.5s ease-out" }}>
              {/* 五行雷达图 */}
              <div
                className="rounded-2xl p-5 mb-4"
                style={{
                  background: "rgba(20, 8, 2, 0.7)",
                  border: "1px solid rgba(180,100,50,0.2)",
                }}
              >
                <p className="text-sm font-bold mb-4" style={{ color: "var(--ink-gold)" }}>
                  {t.energyPattern}
                </p>
                <div className="flex items-center justify-between gap-4">
                  <ElementRadar scores={elementScores} t={t} />
                  <div className="flex-1">
                    {Object.entries(elementScores).map(([el, score]) => (
                      <div key={el} className="flex items-center gap-2 mb-2">
                        <span
                          className="text-sm font-bold w-4"
                          style={{ color: ELEMENT_COLORS[el]?.text ?? "#fff" }}
                        >
                          {el}
                        </span>
                        <div
                          className="flex-1 rounded-full h-1.5 overflow-hidden"
                          style={{ background: "rgba(200,150,100,0.1)" }}
                        >
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${(score / 4) * 100}%`,
                              background: ELEMENT_COLORS[el]?.text ?? "#fff",
                              opacity: 0.8,
                            }}
                          />
                        </div>
                        <span className="text-xs w-6 text-right" style={{ color: "rgba(200,180,150,0.5)" }}>
                          {score.toFixed(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 性格画像 */}
              {personality && (
                <div
                  className="rounded-2xl p-5 mb-4"
                  style={{
                    background: "rgba(20, 8, 2, 0.7)",
                    border: "1px solid rgba(180,100,50,0.2)",
                  }}
                >
                  <p className="text-sm font-bold mb-3" style={{ color: "var(--ink-gold)" }}>
                    {t.personaTitle}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs mb-2" style={{ color: "var(--vermillion)", opacity: 0.8 }}>{t.traits}</p>
                      {personality.traits.map((tr, i) => (
                        <p key={i} className="text-xs mb-1" style={{ color: "var(--ink-light)", opacity: 0.8 }}>
                          · {tr}
                        </p>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs mb-2" style={{ color: "#4caf50", opacity: 0.8 }}>{t.strengths}</p>
                      {personality.strengths.slice(0, 2).map((s, i) => (
                        <p key={i} className="text-xs mb-1" style={{ color: "var(--ink-light)", opacity: 0.8 }}>
                          · {s}
                        </p>
                      ))}
                      <p className="text-xs mb-2 mt-2" style={{ color: "rgba(200,100,60,0.8)" }}>{t.growth}</p>
                      {personality.weaknesses.slice(0, 1).map((w, i) => (
                        <p key={i} className="text-xs mb-1" style={{ color: "var(--ink-light)", opacity: 0.8 }}>
                          · {w}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 日主解读 */}
              {dayStemReading && (
                <div
                  className="rounded-2xl p-5 mb-4"
                  style={{
                    background: "rgba(20, 8, 2, 0.7)",
                    border: "1px solid rgba(180,100,50,0.2)",
                  }}
                >
                  <p className="text-sm font-bold mb-2" style={{ color: "var(--ink-gold)" }}>
                    {dayStemReading.title}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--ink-light)", opacity: 0.8 }}>
                    {dayStemReading.nature}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 四柱解析 */}
          {activeTab === "pillars" && (
            <div style={{ animation: "bazi-fade-in 0.5s ease-out" }}>
              {pillars.map(({ key, data }) => {
                const reading = PILLAR_READINGS[key as keyof typeof PILLAR_READINGS];
                return (
                  <div
                    key={key}
                    className="rounded-2xl p-5 mb-4"
                    style={{
                      background: "rgba(20, 8, 2, 0.7)",
                      border: "1px solid rgba(180,100,50,0.2)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-bold" style={{ color: "var(--ink-gold)" }}>
                          {reading.title}
                        </p>
                      </div>
                      {data && (
                        <div
                          className="text-xl font-bold px-3 py-1 rounded-lg"
                          style={{
                            background: "rgba(180, 60, 30, 0.15)",
                            border: "1px solid rgba(180, 60, 30, 0.3)",
                            color: "var(--ink-light)",
                            fontFamily: "serif",
                          }}
                        >
                          {data.stem}{data.branch}
                        </div>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(200,180,150,0.6)" }}>
                      {reading.description}
                    </p>
                    {data && (
                      <div className="flex flex-wrap gap-2">
                        <span
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            background: ELEMENT_COLORS[data.stemElement]?.bg ?? "rgba(200,150,100,0.1)",
                            color: ELEMENT_COLORS[data.stemElement]?.text ?? "#fff",
                            border: `1px solid ${ELEMENT_COLORS[data.stemElement]?.border ?? "transparent"}`,
                          }}
                        >
                          {t.stemElementPrefix}{data.stemElement}
                        </span>
                        <span
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            background: ELEMENT_COLORS[data.branchElement]?.bg ?? "rgba(200,150,100,0.1)",
                            color: ELEMENT_COLORS[data.branchElement]?.text ?? "#fff",
                            border: `1px solid ${ELEMENT_COLORS[data.branchElement]?.border ?? "transparent"}`,
                          }}
                        >
                          {t.branchElementPrefix}{data.branchElement}
                        </span>
                        <span
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            background: "rgba(200,150,80,0.1)",
                            color: "var(--ink-gold)",
                            border: "1px solid rgba(200,150,80,0.2)",
                          }}
                        >
                          {t.nayinPrefix}{data.nayin}
                        </span>
                      </div>
                    )}
                    {!data && key === "hour" && (
                      <p className="text-xs" style={{ color: "rgba(200,100,60,0.7)" }}>
                        {t.hourUnknownNote}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* 2026运势 */}
          {activeTab === "fortune" && zodiacFortune && (
            <div style={{ animation: "bazi-fade-in 0.5s ease-out" }}>
              {/* 太岁关系 */}
              <div
                className="rounded-2xl p-5 mb-4 text-center"
                style={{
                  background: zodiacFortune.overall >= 4
                    ? "rgba(30, 100, 30, 0.15)"
                    : zodiacFortune.overall <= 2
                    ? "rgba(150, 30, 20, 0.15)"
                    : "rgba(100, 80, 30, 0.15)",
                  border: `1px solid ${zodiacFortune.overall >= 4 ? "rgba(50,150,50,0.3)" : zodiacFortune.overall <= 2 ? "rgba(180,50,30,0.3)" : "rgba(150,120,50,0.3)"}`,
                }}
              >
                <p className="text-xs mb-2" style={{ color: "rgba(200,180,150,0.6)" }}>
                  {t.bingwuYear}{zodiac}
                </p>
                <p
                  className="text-xl font-bold mb-1"
                  style={{ color: zodiacFortune.overall >= 4 ? "#4caf50" : zodiacFortune.overall <= 2 ? "#ef5350" : "var(--ink-gold)" }}
                >
                  {zodiacFortune.taishiRelation}
                </p>
                <p className="text-sm" style={{ color: "var(--ink-light)", opacity: 0.8 }}>
                  {t.overallFortune}
                </p>
                <Stars count={zodiacFortune.overall} />
              </div>

              {/* 运势雷达图 */}
              <div
                className="rounded-2xl p-5 mb-4"
                style={{
                  background: "rgba(20, 8, 2, 0.7)",
                  border: "1px solid rgba(180,100,50,0.2)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {(["career", "wealth", "love", "health"] as const).map((asp) => {
                      const labels = { career: t.careerLuck, wealth: t.wealthLuck, love: t.loveLuck, health: t.healthLuck };
                      return (
                        <div key={asp} className="flex items-center gap-3 mb-3">
                          <span className="text-xs w-12 text-right" style={{ color: "rgba(200,180,150,0.6)" }}>
                            {labels[asp]}
                          </span>
                          <Stars count={zodiacFortune[asp]} />
                        </div>
                      );
                    })}
                  </div>
                  <FortuneRadar fortune={zodiacFortune} t={t} />
                </div>
              </div>

              {/* 运势总结 */}
              <div
                className="rounded-2xl p-5 mb-4"
                style={{
                  background: "rgba(20, 8, 2, 0.7)",
                  border: "1px solid rgba(180,100,50,0.2)",
                }}
              >
                <p className="text-sm font-bold mb-3" style={{ color: "var(--ink-gold)" }}>{t.yearSummary}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-light)", opacity: 0.85 }}>
                  {zodiacFortune.summary}
                </p>
              </div>

              {/* 分类运势详情 */}
              {(["career", "wealth", "love", "health"] as const).map((asp) => {
                const labels = { career: t.careerDetailLabel, wealth: t.wealthDetailLabel, love: t.loveDetailLabel, health: t.healthDetailLabel };
                const details = { career: zodiacFortune.careerDetail, wealth: zodiacFortune.wealthDetail, love: zodiacFortune.loveDetail, health: zodiacFortune.healthDetail };
                return (
                  <div
                    key={asp}
                    className="rounded-2xl p-4 mb-3"
                    style={{
                      background: "rgba(20, 8, 2, 0.6)",
                      border: "1px solid rgba(180,100,50,0.15)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-sm font-bold" style={{ color: "var(--ink-gold)" }}>{labels[asp]}</p>
                      <Stars count={zodiacFortune[asp]} />
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(200,180,150,0.75)" }}>
                      {details[asp]}
                    </p>
                  </div>
                );
              })}

              {/* 开运提示 */}
              <div
                className="rounded-2xl p-4 mb-4"
                style={{
                  background: "rgba(30, 20, 5, 0.8)",
                  border: "1px solid rgba(200,150,60,0.3)",
                }}
              >
                <p className="text-sm font-bold mb-3" style={{ color: "var(--ink-gold)" }}>
                  {t.luckyAdvice}
                </p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-xs mb-1" style={{ color: "rgba(200,180,150,0.5)" }}>{t.luckyDirection}</p>
                    <p className="text-sm font-bold" style={{ color: "var(--vermillion)" }}>
                      {zodiacFortune.luckyDirection}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs mb-1" style={{ color: "rgba(200,180,150,0.5)" }}>{t.luckyColor}</p>
                    <p className="text-sm font-bold" style={{ color: "var(--vermillion)" }}>
                      {zodiacFortune.luckyColor}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs mb-1" style={{ color: "rgba(200,180,150,0.5)" }}>{t.luckyNumber}</p>
                    <p className="text-sm font-bold" style={{ color: "var(--vermillion)" }}>
                      {zodiacFortune.luckyNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI 解读 */}
          {activeTab === "report" && (
            <div style={{ animation: "bazi-fade-in 0.5s ease-out" }}>
              <div
                className="rounded-2xl p-5 mb-4"
                style={{
                  background: "rgba(20, 8, 2, 0.7)",
                  border: "1px solid rgba(180,100,50,0.2)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: "var(--vermillion)",
                      animation: isTyping ? "bazi-pulse 1s ease-in-out infinite" : "none",
                    }}
                  />
                  <p className="text-sm font-bold" style={{ color: "var(--ink-gold)" }}>
                    {t.aiReading}
                  </p>
                  {isTyping && (
                    <span className="text-xs" style={{ color: "rgba(200,180,150,0.5)" }}>
                      {t.writing}
                    </span>
                  )}
                </div>
                <div
                  ref={reportRef}
                  className="text-sm leading-relaxed whitespace-pre-wrap"
                  style={{ color: "var(--ink-light)", opacity: 0.9 }}
                  dangerouslySetInnerHTML={{
                    __html: displayedReport
                      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--ink-gold)">$1</strong>')
                      .replace(/✦/g, '<span style="color:var(--vermillion)">✦</span>')
                      .replace(/🌸/g, "🌸"),
                  }}
                />
                {isTyping && (
                  <span
                    className="inline-block w-0.5 h-4 ml-0.5"
                    style={{
                      background: "var(--vermillion)",
                      animation: "bazi-blink 0.7s step-end infinite",
                      verticalAlign: "middle",
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 底部操作按钮 */}
      <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-3"
        style={{ background: "linear-gradient(transparent, rgba(20,5,0,0.95))" }}
      >
        <div className="max-w-lg mx-auto flex gap-3">
          <button
            onClick={handleShare}
            className="flex-1 py-3 rounded-xl text-sm font-medium tracking-wide transition-all"
            style={{
              background: "rgba(180, 60, 30, 0.2)",
              border: "1px solid rgba(180, 60, 30, 0.5)",
              color: "var(--ink-light)",
            }}
          >
            {t.savePoster}
          </button>
          <button
            onClick={onRestart}
            className="flex-1 py-3 rounded-xl text-sm font-medium tracking-wide btn-vermillion"
          >
            {t.restart}
          </button>
        </div>
      </div>
    </div>
  );
}
