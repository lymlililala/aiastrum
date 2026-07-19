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

    const horoscopeResult = generateHoroscope(id, period, new Date(), lang);
    setResult(horoscopeResult);
    setStep("detail");
  };

  // 切换时间段
  const handlePeriodChange = (newPeriod: TimePeriod) => {
    setPeriod(newPeriod);
    if (selectedZodiac) {
      const horoscopeResult = generateHoroscope(selectedZodiac, newPeriod, new Date(), lang);
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

            {/* ── 新手说明：怎么玩（SSR 输出） ── */}
            <div style={{
              marginTop: 32, maxWidth: 460, width: "100%",
              background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.22)",
              borderRadius: 14, padding: "18px 20px", textAlign: "left",
            }}>
              <div style={{
                fontFamily: "var(--font-cinzel), serif", fontSize: "0.95rem",
                color: "#e8d5a3", letterSpacing: "0.06em", marginBottom: 12,
              }}>{t.howToTitle}</div>
              <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {t.howToSteps.map((s, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{
                      flexShrink: 0, width: 22, height: 22, borderRadius: "50%",
                      border: "1px solid rgba(201,168,76,0.55)", color: "#c9a84c",
                      fontSize: "0.72rem", display: "inline-flex", alignItems: "center", justifyContent: "center",
                      marginTop: 1,
                    }}>{i + 1}</span>
                    <span style={{ fontSize: "0.85rem", color: "rgba(220,205,175,0.8)", lineHeight: 1.7 }}>{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* 底部提示 */}
            <p className="horoscope-page-footer">
              {t.pageFooter}
            </p>

            {/* 2026 下半年运势专题内链（SEO：高权重工具页向核心长尾页导流） */}
            <a
              href="/blog/2026-second-half-zodiac-horoscope"
              style={{
                display: "inline-block", marginTop: 14,
                fontSize: "0.78rem", color: "rgba(232,213,163,0.8)",
                textDecoration: "none",
                border: "1px solid rgba(201,168,76,0.2)",
                background: "rgba(201,168,76,0.05)",
                borderRadius: 10, padding: "8px 16px",
              }}
            >
              {lang === "zh"
                ? "🔮 2026下半年運勢：十二星座＋生肖流年完整解析 →"
                : "🔮 2026 Second-Half Horoscope: 12 Signs + Chinese Zodiac →"}
            </a>
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

        {/* ── SEO 内容区 + FAQ（SSR 输出，爬虫可读；两个步骤都展示） ── */}
        <section style={{ maxWidth: 720, margin: "48px auto 0", padding: "0 16px 48px", textAlign: "left" }}>
          {t.seoSections.map((sec) => (
            <div key={sec.heading} style={{ marginBottom: 28 }}>
              <h2 style={{
                fontFamily: "var(--font-cinzel), serif", fontSize: "1.05rem",
                color: "#e8d5a3", letterSpacing: "0.04em", marginBottom: 10,
                borderLeft: "3px solid rgba(201,168,76,0.6)", paddingLeft: 12,
              }}>{sec.heading}</h2>
              <p style={{ fontSize: "0.88rem", color: "rgba(200,175,140,0.75)", lineHeight: 1.85, margin: 0 }}>{sec.body}</p>
            </div>
          ))}
          <h2 style={{
            fontFamily: "var(--font-cinzel), serif", fontSize: "1.05rem",
            color: "#e8d5a3", letterSpacing: "0.04em", marginBottom: 12,
            borderLeft: "3px solid rgba(201,168,76,0.6)", paddingLeft: 12,
          }}>{t.faqTitle}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {t.faq.map((f) => (
              <details key={f.q} style={{
                background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.18)",
                borderRadius: 12, padding: "12px 16px",
              }}>
                <summary style={{ cursor: "pointer", fontSize: "0.88rem", color: "rgba(232,213,163,0.9)", fontWeight: 600, lineHeight: 1.5 }}>{f.q}</summary>
                <p style={{ fontSize: "0.84rem", color: "rgba(200,175,140,0.72)", lineHeight: 1.8, margin: "10px 0 2px" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

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
