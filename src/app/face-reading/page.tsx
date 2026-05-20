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

type Phase = "landing" | "upload" | "scanning" | "result";

export default function FaceReadingPage() {
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
        });

        if (result.success && result.report) {
          setReport(result.report);
          saveToHistory(result.report);
          setPhase("result");
        } else {
          setError(result.error ?? "分析失败，请重试");
          setPhase("upload");
        }
      } catch (err) {
        console.error("Analysis failed:", err);
        setError("分析过程出错，请重试");
        setPhase("upload");
      }
    },
    [mode]
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
    return <LandingPage onStart={() => setPhase("upload")} />;
  }

  return (
    <div className="fr-page">
      {/* 顶部导航 */}
      <nav className="fr-nav">
        <Link href="/" className="fr-nav-back">
          ← 返回
        </Link>
        <div className="fr-nav-title">
          <span className="fr-nav-icon">🔬</span>
          <span>{mode === "face" ? "AI 面相分析" : "AI 手相分析"}</span>
        </div>
        <div className="fr-nav-placeholder" />
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
            mode={mode}
            onModeChange={setMode}
            onImageSelect={handleImageSelect}
          />
        )}

        {phase === "scanning" && imageUrl && (
          <ScanAnimation
            imageUrl={processedImageUrl || imageUrl}
            progress={scanProgress}
            mode={mode}
          />
        )}

        {phase === "result" && report && (
          <FaceReport
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
          report={report}
          imageUrl={processedImageUrl || imageUrl}
          onClose={() => setShowPoster(false)}
        />
      )}
    </div>
  );
}

// ===== Landing 页 =====
function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="fr-landing">
      {/* 返回按钮 */}
      <Link href="/" className="fr-landing-back">
        ← 返回首页
      </Link>

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
          AI 神经网络解析
        </div>

        <h1 className="fr-landing-title">
          <span className="fr-landing-title-main">赛博算命</span>
          <span className="fr-landing-title-sub">AI 面相 · 手相分析</span>
        </h1>

        <p className="fr-landing-slogan">
          用 AI 解码你的隐藏天赋
        </p>

        <div className="fr-landing-features">
          {[
            { icon: "⚡", text: "3秒极速分析" },
            { icon: "🧬", text: "神经网络识别" },
            { icon: "🔒", text: "照片阅后即焚" },
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
          <div className="fr-preview-header">AI 分析结果预览</div>
          <div className="fr-preview-talent">
            <div
              className="fr-preview-talent-badge"
              style={{ background: "linear-gradient(135deg, #FFD700, #FFA500)" }}
            >
              <span>⚡ 传说</span>
              <span>👑 天生领袖</span>
            </div>
          </div>
          <div className="fr-preview-score">
            <span className="fr-preview-score-num">92</span>
            <span className="fr-preview-score-label">命运指数</span>
          </div>
          <div className="fr-preview-dims">
            {[
              { name: "事业运", score: 95, icon: "💼" },
              { name: "财富运", score: 88, icon: "💰" },
              { name: "贵人缘", score: 91, icon: "🤝" },
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
          <span className="fr-landing-btn-text">立即测试</span>
          <span className="fr-landing-btn-sub">面相 / 手相 均可</span>
        </button>

        <p className="fr-landing-disclaimer">
          ⚠️ 本测试仅供娱乐，不代表专业指导意见
        </p>

        <p className="fr-landing-privacy">
          🔒 照片仅用于分析，阅后即焚，不留存任何图像数据
        </p>
      </div>

      {/* 用户证言（社交证明）*/}
      <div className="fr-landing-testimonials">
        {[
          { avatar: "👩‍💼", text: "居然说我是天生领袖！太准了吧 😭", name: "小美" },
          { avatar: "👨‍💻", text: "手相分析说我智慧线极强，真的很有意思", name: "阿杰" },
          { avatar: "👩‍🎨", text: "测出来是创意鬼才，分享给闺蜜们了！", name: "糖糖" },
        ].map((t, i) => (
          <div key={i} className="fr-testimonial">
            <span className="fr-testimonial-avatar">{t.avatar}</span>
            <div className="fr-testimonial-content">
              <p className="fr-testimonial-text">{t.text}</p>
              <p className="fr-testimonial-name">— {t.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
