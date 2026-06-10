"use client";

import React, { useState, useRef, useCallback } from "react";
import type { AnalysisMode } from "../face-reading-data";
import type { FaceT } from "../face-reading-i18n";

interface UploadPhotoProps {
  t: FaceT;
  onImageSelect: (file: File, previewUrl: string) => void;
  onModeChange: (mode: AnalysisMode) => void;
  mode: AnalysisMode;
}

export function UploadPhoto({ t, onImageSelect, onModeChange, mode }: UploadPhotoProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    (file: File) => {
      const previewUrl = URL.createObjectURL(file);
      onImageSelect(file, previewUrl);
    },
    [onImageSelect]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className="fr-upload-container">
      {/* 模式选择 */}
      <div className="fr-mode-tabs">
        <button
          className={`fr-mode-tab ${mode === "face" ? "active" : ""}`}
          onClick={() => onModeChange("face")}
        >
          <span className="fr-mode-icon">👁️</span>
          <span>{t.tabFace}</span>
        </button>
        <button
          className={`fr-mode-tab ${mode === "palm" ? "active" : ""}`}
          onClick={() => onModeChange("palm")}
        >
          <span className="fr-mode-icon">✋</span>
          <span>{t.tabPalm}</span>
        </button>
      </div>

      {/* 模式提示 */}
      <div className="fr-mode-hint">
        {mode === "face" ? (
          <p>{t.hintFacePre}<strong>{t.hintFaceStrong}</strong>{t.hintFacePost}</p>
        ) : (
          <p>{t.hintPalmPre}<strong>{t.hintPalmStrong}</strong>{t.hintPalmPost}</p>
        )}
      </div>

      {/* 上传区域 */}
      <div
        className={`fr-drop-zone ${isDragging ? "dragging" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="hidden"
          onChange={handleInputChange}
        />

        {/* 扫描框装饰 */}
        <div className="fr-scan-frame">
          <div className="fr-scan-corner tl" />
          <div className="fr-scan-corner tr" />
          <div className="fr-scan-corner bl" />
          <div className="fr-scan-corner br" />
          <div className="fr-scan-line" />
        </div>

        <div className="fr-drop-content">
          <div className="fr-upload-icon">
            {mode === "face" ? "🤳" : "🖐️"}
          </div>
          <p className="fr-upload-title">{t.uploadTitle}</p>
          <p className="fr-upload-subtitle">{t.uploadSubtitle}</p>
          <p className="fr-upload-format">{t.uploadFormat}</p>
        </div>
      </div>

      {/* 示例提示 */}
      <div className="fr-tips-grid">
        <div className="fr-tip-item good">
          <span className="fr-tip-icon">✅</span>
          <div>
            <p className="fr-tip-title">{t.tipBest}</p>
            <p className="fr-tip-desc">
              {mode === "face" ? t.tipBestFace : t.tipBestPalm}
            </p>
          </div>
        </div>
        <div className="fr-tip-item bad">
          <span className="fr-tip-icon">❌</span>
          <div>
            <p className="fr-tip-title">{t.tipAvoid}</p>
            <p className="fr-tip-desc">
              {mode === "face" ? t.tipAvoidFace : t.tipAvoidPalm}
            </p>
          </div>
        </div>
      </div>

      {/* 隐私声明 */}
      <div className="fr-privacy-notice">
        <span className="fr-privacy-icon">🔒</span>
        <p>
          {t.privacyNoticePre}<strong>{t.privacyNoticeStrong}</strong>{t.privacyNoticePost}
        </p>
      </div>

      {/* 免责声明 */}
      <div className="fr-disclaimer">
        {t.uploadDisclaimer}
      </div>
    </div>
  );
}
