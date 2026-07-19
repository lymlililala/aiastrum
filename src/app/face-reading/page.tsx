"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import type { AnalysisMode, FaceReadingReport } from "./face-reading-data";
import type { ScanProgress } from "./face-reading-engine";
import { analyzeImage, saveToHistory, preprocessImage, initialScanProgress } from "./face-reading-engine";
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
  const [scanProgress, setScanProgress] = useState<ScanProgress>(() =>
    initialScanProgress(lang)
  );
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

      {/* ── 新手说明：怎么测（首次进入也能立刻看懂） ── */}
      <div style={{
        marginTop: 28, maxWidth: 480, width: "100%",
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

      {/* ── SEO 内容区 + FAQ（SSR 输出，爬虫可读） ── */}
      <section style={{ maxWidth: 720, margin: "48px auto 0", padding: "0 4px", textAlign: "left", width: "100%" }}>
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
    </div>
  );
}
