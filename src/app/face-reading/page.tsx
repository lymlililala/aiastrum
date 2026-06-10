"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import type { AnalysisMode, FaceReadingReport } from "./face-reading-data";
import type { ScanProgress } from "./face-reading-engine";
import { analyzeImage, saveToHistory, preprocessImage } from "./face-reading-engine";
import { UploadPhoto } from "./components/UploadPhoto";
import { ScanAnimation } from "./components/ScanAnimation";
import { FaceReport } from "./components/FaceReport";
import { FacePoster } from "./components/FacePoster";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";
import { FACE_T, type FaceLang } from "./face-reading-i18n";

type Phase = "landing" | "upload" | "scanning" | "result";

export default function FaceReadingPage() {
  const lang = useLocale() as FaceLang;
  const t = FACE_T[lang];

  const [phase, setPhase] = useState<Phase>("landing");
  const [mode, setMode] = useState<AnalysisMode>("face");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [processedImageUrl, setProcessedImageUrl] = useState<string>("");
  const [scanProgress, setScanProgress] = useState<ScanProgress>({
    phase: "uploading",
    progress: 0,
    message: "准备中...",
  });
  const [report, setReport] = useState<FaceReadingReport | null>(null);
  const [showPoster, setShowPoster] = useState(false);
  const [error, setError] = useState<string>("");

  // 选择图片后开始分析
  const handleImageSelect = useCallback(
    async (file: File, previewUrl: string) => {
      setImageFile(file);
      setImageUrl(previewUrl);
      setError("");
      setPhase("scanning");

      try {
        // 预处理图片（压缩）
        const processed = await preprocessImage(file);
        setProcessedImageUrl(processed);

        // 开始 AI 分析
        const result = await analyzeImage(file, mode, (progress) => {
          setScanProgress(progress);
        }, lang);

        if (result.success && result.report) {
          setReport(result.report);
          saveToHistory(result.report);
          setPhase("result");
        } else {
          setError(result.error ?? t.analyzeFailed);
          setPhase("upload");
        }
      } catch (err) {
        console.error("Analysis failed:", err);
        setError(t.analyzeError);
        setPhase("upload");
      }
    },
    [mode, t, lang]
  );

  // 重新分析
  const handleRetry = useCallback(() => {
    setReport(null);
    setImageFile(null);
    setImageUrl("");
    setProcessedImageUrl("");
    setError("");
    setPhase("upload");
  }, []);

  // Landing 页
  if (phase === "landing") {
    return <LandingPage t={t} onStart={() => setPhase("upload")} />;
  }

  return (
    <div className="fr-page">
      {/* 顶部导航 */}
      <nav className="fr-nav">
        <Link href="/" className="fr-nav-back">
          {t.navBack}
        </Link>
        <div className="fr-nav-title">
          <span className="fr-nav-icon">🔬</span>
          <span>{mode === "face" ? t.navFace : t.navPalm}</span>
        </div>
        <div className="fr-nav-placeholder">
          <LangSwitcher />
        </div>
      </nav>

      {/* 错误提示 */}
      {error && (
        <div className="fr-error-toast">
          ⚠️ {error}
        </div>
      )}

      {/* 主内容 */}
      <main className="fr-main">
        {phase === "upload" && (
          <UploadPhoto
            t={t}
            mode={mode}
            onModeChange={setMode}
            onImageSelect={handleImageSelect}
          />
        )}

        {phase === "scanning" && imageUrl && (
          <ScanAnimation
            t={t}
            imageUrl={processedImageUrl || imageUrl}
            progress={scanProgress}
            mode={mode}
          />
        )}

        {phase === "result" && report && (
          <FaceReport
            t={t}
            report={report}
            imageUrl={processedImageUrl || imageUrl}
            onShare={() => setShowPoster(true)}
            onRetry={handleRetry}
          />
        )}
      </main>

      {/* 分享海报弹窗 */}
      {showPoster && report && (
        <FacePoster
          t={t}
          lang={lang}
          report={report}
          imageUrl={processedImageUrl || imageUrl}
          onClose={() => setShowPoster(false)}
        />
      )}
    </div>
  );
}

// ===== Landing 页 =====
function LandingPage({ t, onStart }: { t: (typeof FACE_T)[FaceLang]; onStart: () => void }) {
  return (
    <div className="fr-landing">
      {/* 返回按钮 */}
      <Link href="/" className="fr-landing-back">
        {t.landBack}
      </Link>

      {/* 语言切换 */}
      <div className="fr-landing-lang" style={{ position: "absolute", top: 16, right: 16, zIndex: 50 }}>
        <LangSwitcher />
      </div>

      {/* 主标题区 */}
      <div className="fr-landing-hero">
        {/* 扫描动效装饰 */}
        <div className="fr-landing-scan-demo">
          <div className="fr-demo-circle">
            <div className="fr-demo-ring ring1" />
            <div className="fr-demo-ring ring2" />
            <div className="fr-demo-ring ring3" />
            <div className="fr-demo-icon">🔬</div>
          </div>
        </div>

        <div className="fr-landing-badge">
          <span className="fr-landing-badge-dot" />
          {t.landBadge}
        </div>

        <h1 className="fr-landing-title">
          <span className="fr-landing-title-main">{t.landTitleMain}</span>
          <span className="fr-landing-title-sub">{t.landTitleSub}</span>
        </h1>

        <p className="fr-landing-slogan">
          {t.landSlogan}
        </p>

        <div className="fr-landing-features">
          {[
            { icon: "⚡", text: t.landFeat1 },
            { icon: "🧬", text: t.landFeat2 },
            { icon: "🔒", text: t.landFeat3 },
          ].map((f) => (
            <div key={f.text} className="fr-landing-feature">
              <span className="fr-lf-icon">{f.icon}</span>
              <span className="fr-lf-text">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 示例报告展示 */}
      <div className="fr-landing-preview">
        <div className="fr-preview-card">
          <div className="fr-preview-header">{t.previewHeader}</div>
          <div className="fr-preview-talent">
            <div
              className="fr-preview-talent-badge"
              style={{ background: "linear-gradient(135deg, #FFD700, #FFA500)" }}
            >
              <span>{t.previewRarity}</span>
              <span>{t.previewTalent}</span>
            </div>
          </div>
          <div className="fr-preview-score">
            <span className="fr-preview-score-num">92</span>
            <span className="fr-preview-score-label">{t.previewScoreLabel}</span>
          </div>
          <div className="fr-preview-dims">
            {[
              { name: t.previewDimCareer, score: 95, icon: "💼" },
              { name: t.previewDimWealth, score: 88, icon: "💰" },
              { name: t.previewDimNoble, score: 91, icon: "🤝" },
            ].map((d) => (
              <div key={d.name} className="fr-preview-dim">
                <span>{d.icon} {d.name}</span>
                <div className="fr-preview-dim-bar">
                  <div style={{ width: `${d.score}%`, background: "linear-gradient(90deg, #00F5FF, #7B2FFF)" }} />
                </div>
                <span>{d.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA 按钮 */}
      <div className="fr-landing-cta">
        <button className="fr-landing-btn" onClick={onStart}>
          <span className="fr-landing-btn-icon">📸</span>
          <span className="fr-landing-btn-text">{t.ctaTitle}</span>
          <span className="fr-landing-btn-sub">{t.ctaSub}</span>
        </button>

        <p className="fr-landing-disclaimer">
          {t.landDisclaimer}
        </p>

        <p className="fr-landing-privacy">
          {t.landPrivacy}
        </p>
      </div>

      {/* 用户证言（社交证明）*/}
      <div className="fr-landing-testimonials">
        {[
          { avatar: "👩‍💼", text: t.testimonial1, name: t.testimonialName1 },
          { avatar: "👨‍💻", text: t.testimonial2, name: t.testimonialName2 },
          { avatar: "👩‍🎨", text: t.testimonial3, name: t.testimonialName3 },
        ].map((tm, i) => (
          <div key={i} className="fr-testimonial">
            <span className="fr-testimonial-avatar">{tm.avatar}</span>
            <div className="fr-testimonial-content">
              <p className="fr-testimonial-text">{tm.text}</p>
              <p className="fr-testimonial-name">— {tm.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
