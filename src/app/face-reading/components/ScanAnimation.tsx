"use client";

import React, { useEffect, useState } from "react";
import type { ScanProgress } from "../face-reading-engine";
import type { AnalysisMode } from "../face-reading-data";
import type { FaceT } from "../face-reading-i18n";

interface ScanAnimationProps {
  t: FaceT;
  imageUrl: string;
  progress: ScanProgress;
  mode: AnalysisMode;
}

export function ScanAnimation({ t, imageUrl, progress, mode }: ScanAnimationProps) {
  const [dots, setDots] = useState(".");
  const [glitchActive, setGlitchActive] = useState(false);

  // 加载动效省略号
  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 400);
    return () => clearInterval(timer);
  }, []);

  // 随机故障特效
  useEffect(() => {
    const timer = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const progressPercent = progress.progress;

  return (
    <div className="fr-scan-container">
      {/* 顶部标题 */}
      <div className="fr-scan-header">
        <div className="fr-scan-badge">
          <span className="fr-scan-badge-dot" />
          {t.scanBadge}
        </div>
        <p className="fr-scan-title">
          {mode === "face" ? t.scanTitleFace : t.scanTitlePalm}
        </p>
      </div>

      {/* 图片扫描区 */}
      <div className="fr-scan-image-wrapper">
        {/* 照片 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={t.scanImageAlt}
          className={`fr-scan-image ${glitchActive ? "glitch" : ""}`}
        />

        {/* 扫描线动画 */}
        <div className="fr-scan-overlay">
          <div
            className="fr-scan-beam"
            style={{ top: `${progressPercent}%` }}
          />
        </div>

        {/* 扫描框 */}
        <div className="fr-scan-frame-overlay">
          <div className="fr-corner-tl" />
          <div className="fr-corner-tr" />
          <div className="fr-corner-bl" />
          <div className="fr-corner-br" />
        </div>

        {/* 识别点位 */}
        {progress.phase === "detecting" && (
          <div className="fr-detection-points">
            {mode === "face" ? (
              <>
                <div className="fr-detect-point" style={{ top: "25%", left: "30%" }} />
                <div className="fr-detect-point" style={{ top: "25%", right: "30%" }} />
                <div className="fr-detect-point" style={{ top: "40%", left: "50%" }} />
                <div className="fr-detect-point" style={{ top: "55%", left: "35%" }} />
                <div className="fr-detect-point" style={{ top: "55%", right: "35%" }} />
                <div className="fr-detect-point" style={{ top: "65%", left: "50%" }} />
              </>
            ) : (
              <>
                <div className="fr-detect-point" style={{ top: "20%", left: "50%" }} />
                <div className="fr-detect-point" style={{ top: "35%", left: "25%" }} />
                <div className="fr-detect-point" style={{ top: "35%", right: "25%" }} />
                <div className="fr-detect-point" style={{ top: "50%", left: "50%" }} />
                <div className="fr-detect-point" style={{ top: "65%", left: "30%" }} />
                <div className="fr-detect-point" style={{ top: "65%", right: "30%" }} />
                <div className="fr-detect-point" style={{ top: "80%", left: "50%" }} />
              </>
            )}
          </div>
        )}

        {/* 数据流矩阵装饰 */}
        <div className="fr-data-matrix">
          {["01", "10", "11", "00"].map((bit, i) => (
            <span
              key={i}
              className="fr-matrix-bit"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {bit}
            </span>
          ))}
        </div>
      </div>

      {/* 进度条 */}
      <div className="fr-progress-section">
        <div className="fr-progress-bar">
          <div
            className="fr-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
          <div
            className="fr-progress-glow"
            style={{ left: `${progressPercent}%` }}
          />
        </div>
        <div className="fr-progress-labels">
          <span className="fr-progress-message">
            {progress.message}{dots}
          </span>
          <span className="fr-progress-percent">{progressPercent}%</span>
        </div>
      </div>

      {/* 分析阶段指示器 */}
      <div className="fr-phases">
        {[
          { phase: "uploading", label: t.phaseUpload },
          { phase: "detecting", label: t.phaseDetect },
          { phase: "analyzing", label: t.phaseAnalyze },
          { phase: "generating", label: t.phaseGenerate },
          { phase: "complete", label: t.phaseComplete },
        ].map(({ phase, label }) => {
          const phases = ["uploading", "detecting", "analyzing", "generating", "complete"];
          const currentIdx = phases.indexOf(progress.phase);
          const thisIdx = phases.indexOf(phase);
          const isDone = thisIdx < currentIdx;
          const isCurrent = thisIdx === currentIdx;

          return (
            <div key={phase} className={`fr-phase-item ${isDone ? "done" : ""} ${isCurrent ? "current" : ""}`}>
              <div className="fr-phase-dot">
                {isDone ? "✓" : isCurrent ? "●" : "○"}
              </div>
              <span className="fr-phase-label">{label}</span>
            </div>
          );
        })}
      </div>

      {/* 科技感文字 */}
      <div className="fr-tech-text">
        <p>NEURAL NETWORK ANALYZING{dots}</p>
        <p className="fr-tech-sub">
          {mode === "face"
            ? "FACIAL TOPOLOGY · BONE STRUCTURE · ENERGY FIELD"
            : "PALM LINES · DERMATOGLYPHICS · DESTINY PATTERN"}
        </p>
      </div>
    </div>
  );
}
