"use client";

import React, { useState, useMemo } from "react";
import Head from "next/head";
import { NumerologyInput } from "./components/NumerologyInput";
import { NumerologyResultPanel } from "./components/NumerologyResult";
import { NumerologyPoster } from "./components/NumerologyPoster";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";
import { T, type Lang } from "./numerology-i18n";
import "./numerology.css";
import {
  getNumerologyReading,
  generateNumerologyTDK,
  type NumerologyResult,
} from "./numerology-engine";

type PageStep = "input" | "result";

export default function NumerologyPage() {
  const lang = useLocale() as Lang;
  const t = T[lang];

  const [step, setStep] = useState<PageStep>("input");
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [showPoster, setShowPoster] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = (year: number, month: number, day: number) => {
    setIsLoading(true);
    // 模拟计算动画（给用户仪式感）
    setTimeout(() => {
      const reading = getNumerologyReading(year, month, day, lang);
      setResult(reading);
      setStep("result");
      setIsLoading(false);
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  };

  const handleRecalculate = () => {
    setStep("input");
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tdk = useMemo(() => {
    if (result) {
      return generateNumerologyTDK(result.number, lang);
    }
    return generateNumerologyTDK(undefined, lang);
  }, [result, lang]);

  return (
    <>
      <Head>
        <title>{tdk.title}</title>
        <meta name="description" content={tdk.description} />
        <meta name="keywords" content={tdk.keywords} />
        <meta property="og:title" content={tdk.title} />
        <meta property="og:description" content={tdk.description} />
        <meta property="og:type" content="website" />
      </Head>

      <div className="num-page">
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
        }}>← {t.back}</a>

        {/* 语言切换 */}
        <div style={{ position: "fixed", top: 16, right: 16, zIndex: 200 }}>
          <LangSwitcher />
        </div>

        {/* 背景装饰光晕 */}
        <div className="num-bg">
          <div className="num-bg-orb num-bg-orb1" />
          <div className="num-bg-orb num-bg-orb2" />
          <div className="num-bg-orb num-bg-orb3" />
        </div>

        <div className="num-content">
          {/* 页面头部 */}
          <div className="num-page-header">
            <div className="num-page-icon">🔢</div>
            <h1 className="num-page-title">{t.pageTitle}</h1>
            <p className="num-page-subtitle">
              {t.pageSubtitle1}
              <br />
              {t.pageSubtitle2}
            </p>
          </div>

          {/* 步骤：输入 or 结果 */}
          {step === "input" ? (
            <NumerologyInput
              t={t}
              lang={lang}
              onCalculate={handleCalculate}
              isLoading={isLoading}
            />
          ) : (
            result && (
              <NumerologyResultPanel
                t={t}
                lang={lang}
                result={result}
                onShare={() => setShowPoster(true)}
                onRecalculate={handleRecalculate}
              />
            )
          )}
        </div>

        {/* 海报弹窗 */}
        {result && (
          <NumerologyPoster
            t={t}
            lang={lang}
            result={result}
            visible={showPoster}
            onClose={() => setShowPoster(false)}
          />
        )}
      </div>
    </>
  );
}
