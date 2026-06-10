"use client";

import React, { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import { ZodiacGrid } from "./components/ZodiacGrid";
import { FortuneDetail } from "./components/FortuneDetail";
import { FortunePoster } from "./components/FortunePoster";
import "./horoscope.css";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";
import { T, type Lang } from "./horoscope-i18n";
import {
  generateHoroscope,
  saveSelectedZodiac,
  loadSelectedZodiac,
  generateTDK,
  type HoroscopeResult,
} from "./horoscope-engine";
import type { ZodiacId, TimePeriod } from "./horoscope-data";

type PageStep = "select" | "detail";

export default function HoroscopePage() {
  const lang = useLocale() as Lang;
  const t = T[lang];

  const [step, setStep] = useState<PageStep>("select");
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacId | null>(null);
  const [period, setPeriod] = useState<TimePeriod>("today");
  const [result, setResult] = useState<HoroscopeResult | null>(null);
  const [showPoster, setShowPoster] = useState(false);

  // 加载记忆的星座
  useEffect(() => {
    const saved = loadSelectedZodiac();
    if (saved) {
      setSelectedZodiac(saved);
    }
  }, []);

  // 选择星座后生成运势
  const handleZodiacSelect = (id: ZodiacId) => {
    setSelectedZodiac(id);
    saveSelectedZodiac(id);

    const horoscopeResult = generateHoroscope(id, period);
    setResult(horoscopeResult);
    setStep("detail");
  };

  // 切换时间段
  const handlePeriodChange = (newPeriod: TimePeriod) => {
    setPeriod(newPeriod);
    if (selectedZodiac) {
      const horoscopeResult = generateHoroscope(selectedZodiac, newPeriod);
      setResult(horoscopeResult);
    }
  };

  // 返回选择页
  const handleBack = () => {
    setStep("select");
  };

  // TDK
  const tdk = useMemo(() => {
    if (selectedZodiac) {
      return generateTDK(selectedZodiac, period);
    }
    return {
      title: "星座运势 - 每日/周/月运势查询 ✨",
      description: "十二星座运势查询，涵盖综合、爱情、事业、财运、健康五维指数，还有幸运色、幸运数字等幸运指南。每日更新，助你趋吉避凶！",
      keywords: "星座运势,每日运势,本周运势,本月运势,十二星座,幸运色,幸运数字",
    };
  }, [selectedZodiac, period]);

  return (
    <>
      <Head>
        <title>{tdk.title}</title>
        <meta name="description" content={tdk.description} />
        <meta name="keywords" content={tdk.keywords} />
        {/* Open Graph */}
        <meta property="og:title" content={tdk.title} />
        <meta property="og:description" content={tdk.description} />
        <meta property="og:type" content="website" />
      </Head>

      <div className="horoscope-page">
        {/* 返回首页 */}
        <a href="/" style={{
          position: "fixed", top: 16, left: 16, zIndex: 200,
          display: "flex", alignItems: "center", gap: 6,
          padding: "6px 14px", borderRadius: 20,
          background: "rgba(10,6,28,0.75)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(201,168,76,0.25)",
          color: "rgba(201,168,76,0.85)", fontSize: "0.8rem",
          textDecoration: "none", letterSpacing: "0.06em",
          transition: "all 0.18s",
        }}>{t.back}</a>

        {/* 语言切换 */}
        <div style={{ position: "fixed", top: 16, right: 16, zIndex: 200 }}>
          <LangSwitcher />
        </div>

        {/* 背景装饰 */}
        <div className="horoscope-bg">
          <div className="horoscope-bg-orb horoscope-bg-orb1" />
          <div className="horoscope-bg-orb horoscope-bg-orb2" />
          <div className="horoscope-bg-orb horoscope-bg-orb3" />
        </div>

        {step === "select" ? (
          <div className="horoscope-select-step">
            {/* 顶部标题 */}
            <div className="horoscope-page-header">
              <div className="horoscope-page-icon">🌌</div>
              <h1 className="horoscope-page-title">{t.pageTitle}</h1>
              <p className="horoscope-page-subtitle">{t.pageSubtitle}</p>
            </div>

            {/* 星座选择器 */}
            <ZodiacGrid selected={selectedZodiac} onSelect={handleZodiacSelect} t={t} />

            {/* 底部提示 */}
            <p className="horoscope-page-footer">
              {t.pageFooter}
            </p>
          </div>
        ) : (
          <div className="horoscope-detail-step">
            {/* 返回按钮 */}
            <button className="horoscope-back-btn" onClick={handleBack}>
              <span className="horoscope-back-arrow">←</span>
              {t.backToSelect}
            </button>

            {/* 运势详情 */}
            {result && (
              <FortuneDetail
                result={result}
                onPeriodChange={handlePeriodChange}
                onShare={() => setShowPoster(true)}
                t={t}
              />
            )}
          </div>
        )}

        {/* 海报弹窗 */}
        {result && (
          <FortunePoster
            result={result}
            visible={showPoster}
            onClose={() => setShowPoster(false)}
            t={t}
          />
        )}
      </div>
    </>
  );
}
