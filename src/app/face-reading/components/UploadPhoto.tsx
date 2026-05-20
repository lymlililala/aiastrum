"use client";

import React, { useState, useRef, useCallback } from "react";
import type { AnalysisMode } from "../face-reading-data";

interface UploadPhotoProps {
  onImageSelect: (file: File, previewUrl: string) => void;
  onModeChange: (mode: AnalysisMode) => void;
  mode: AnalysisMode;
}

export function UploadPhoto({ onImageSelect, onModeChange, mode }: UploadPhotoProps) {
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
          <span>AI 面相分析</span>
        </button>
        <button
          className={`fr-mode-tab ${mode === "palm" ? "active" : ""}`}
          onClick={() => onModeChange("palm")}
        >
          <span className="fr-mode-icon">✋</span>
          <span>AI 手相分析</span>
        </button>
      </div>

      {/* 模式提示 */}
      <div className="fr-mode-hint">
        {mode === "face" ? (
          <p>📸 拍摄或上传你的<strong>正面清晰照片</strong>，AI 将深度解析你的面部特征</p>
        ) : (
          <p>✋ 拍摄或上传你的<strong>左手掌心照片</strong>，AI 将解读你的掌纹密码</p>
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
          <p className="fr-upload-title">点击上传照片</p>
          <p className="fr-upload-subtitle">或拖拽图片到此处</p>
          <p className="fr-upload-format">支持 JPG、PNG、WebP · 最大 10MB</p>
        </div>
      </div>

      {/* 示例提示 */}
      <div className="fr-tips-grid">
        <div className="fr-tip-item good">
          <span className="fr-tip-icon">✅</span>
          <div>
            <p className="fr-tip-title">最佳效果</p>
            <p className="fr-tip-desc">
              {mode === "face"
                ? "正面、光线充足、无遮挡"
                : "摊开手掌、光线充足、清晰拍摄"}
            </p>
          </div>
        </div>
        <div className="fr-tip-item bad">
          <span className="fr-tip-icon">❌</span>
          <div>
            <p className="fr-tip-title">避免</p>
            <p className="fr-tip-desc">
              {mode === "face"
                ? "侧脸、戴口罩、过暗"
                : "握拳、反手、模糊"}
            </p>
          </div>
        </div>
      </div>

      {/* 隐私声明 */}
      <div className="fr-privacy-notice">
        <span className="fr-privacy-icon">🔒</span>
        <p>
          照片仅用于本次 AI 分析，<strong>分析完成后立即删除</strong>，不会留存任何图像数据。
        </p>
      </div>

      {/* 免责声明 */}
      <div className="fr-disclaimer">
        ⚠️ 本分析仅供娱乐参考，不代表专业指导意见
      </div>
    </div>
  );
}
