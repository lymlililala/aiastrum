// ===== AI 面相/手相分析 引擎层 =====

import type { AnalysisMode, FaceReadingReport, Lang } from "./face-reading-data";
import { generateMockReport } from "./face-reading-data";

// ===== 引擎层三语文案 =====
const ENGINE_T: Record<Lang, {
  invalidFormat: string;
  tooLarge: string;
  analyzeFailed: string;
  emptyResult: string;
  preparing: string;
  scanUploading: string;
  scanDetecting: string;
  scanAnalyzing: string;
  scanGenerating: string;
  scanComplete: string;
}> = {
  zh: {
    invalidFormat: "请上传 JPG、PNG 或 WebP 格式的图片",
    tooLarge: "图片大小不能超过 10MB",
    analyzeFailed: "分析失败，请重试",
    emptyResult: "分析结果为空",
    preparing: "准备中...",
    scanUploading: "正在上传图像...",
    scanDetecting: "AI 面部/掌纹特征识别中...",
    scanAnalyzing: "深度分析骨相与纹路...",
    scanGenerating: "生成专属命运报告...",
    scanComplete: "分析完成！",
  },
  tw: {
    invalidFormat: "請上傳 JPG、PNG 或 WebP 格式的圖片",
    tooLarge: "圖片大小不能超過 10MB",
    analyzeFailed: "分析失敗，請重試",
    emptyResult: "分析結果為空",
    preparing: "準備中...",
    scanUploading: "正在上傳圖像...",
    scanDetecting: "AI 面部/掌紋特徵識別中...",
    scanAnalyzing: "深度分析骨相與紋路...",
    scanGenerating: "生成專屬命運報告...",
    scanComplete: "分析完成！",
  },
  en: {
    invalidFormat: "Please upload a JPG, PNG, or WebP image",
    tooLarge: "Image size cannot exceed 10MB",
    analyzeFailed: "Analysis failed, please try again",
    emptyResult: "The analysis result is empty",
    preparing: "Preparing...",
    scanUploading: "Uploading image...",
    scanDetecting: "AI detecting facial / palm features...",
    scanAnalyzing: "Deep-analyzing bone structure and lines...",
    scanGenerating: "Generating your personal destiny report...",
    scanComplete: "Analysis complete!",
  },
};

// ===== 生成分析种子 =====
// 基于上传时间 + 图片文件信息生成唯一种子
export function generateAnalysisSeed(
  file: File,
  mode: AnalysisMode
): string {
  const now = new Date();
  // 使用文件名、大小、修改时间和当前时间戳组合生成种子
  const rawSeed = `${file.name}_${file.size}_${file.lastModified}_${now.getTime()}_${mode}`;
  // 简单哈希
  let hash = 0;
  for (let i = 0; i < rawSeed.length; i++) {
    const char = rawSeed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// ===== 图片验证 =====
export interface ImageValidationResult {
  valid: boolean;
  error?: string;
}

export function validateImage(file: File, lang: Lang = "zh"): ImageValidationResult {
  const tt = ENGINE_T[lang];
  // 类型检查
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: tt.invalidFormat };
  }

  // 大小检查（最大 10MB）
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return { valid: false, error: tt.tooLarge };
  }

  return { valid: true };
}

// ===== 模拟 AI 扫描延迟 =====
// 制造"AI正在分析"的仪式感
export interface ScanProgress {
  phase: "uploading" | "detecting" | "analyzing" | "generating" | "complete";
  progress: number; // 0-100
  message: string;
}

/** 初始扫描进度（本地化 message，供页面初始 state 使用） */
export function initialScanProgress(lang: Lang = "zh"): ScanProgress {
  return { phase: "uploading", progress: 0, message: ENGINE_T[lang].preparing };
}

function getScanPhases(lang: Lang): ScanProgress[] {
  const tt = ENGINE_T[lang];
  return [
    { phase: "uploading", progress: 15, message: tt.scanUploading },
    { phase: "detecting", progress: 35, message: tt.scanDetecting },
    { phase: "analyzing", progress: 60, message: tt.scanAnalyzing },
    { phase: "generating", progress: 85, message: tt.scanGenerating },
    { phase: "complete", progress: 100, message: tt.scanComplete },
  ];
}

export async function runScanAnimation(
  onProgress: (progress: ScanProgress) => void,
  lang: Lang = "zh"
): Promise<void> {
  for (const phase of getScanPhases(lang)) {
    await new Promise<void>((resolve) => setTimeout(resolve, 800));
    onProgress(phase);
  }
  await new Promise<void>((resolve) => setTimeout(resolve, 400));
}

// ===== 主分析函数（调用 API 路由）=====
export interface AnalysisResult {
  success: boolean;
  report?: FaceReadingReport;
  error?: string;
}

export async function analyzeImage(
  file: File,
  mode: AnalysisMode,
  onProgress?: (progress: ScanProgress) => void,
  lang: Lang = "zh"
): Promise<AnalysisResult> {
  const tt = ENGINE_T[lang];
  // 验证图片
  const validation = validateImage(file, lang);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  try {
    // 并行：动画 + API请求
    const seed = generateAnalysisSeed(file, mode);

    // 创建 FormData 上传图片
    const formData = new FormData();
    formData.append("image", file);
    formData.append("mode", mode);
    formData.append("seed", seed);
    formData.append("lang", lang);

    // 动画与请求并行
    const [apiResult] = await Promise.all([
      callAnalysisAPI(formData, lang),
      onProgress ? runScanAnimation(onProgress, lang) : Promise.resolve(),
    ]);

    return apiResult;
  } catch (err) {
    console.error("Analysis error:", err);
    return { success: false, error: tt.analyzeFailed };
  }
}

// ===== 调用分析 API =====
async function callAnalysisAPI(
  formData: FormData,
  lang: Lang = "zh"
): Promise<AnalysisResult> {
  try {
    const response = await fetch("/api/face-reading", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as { report?: FaceReadingReport; error?: string };

    if (data.report) {
      return { success: true, report: data.report };
    } else {
      return { success: false, error: data.error ?? ENGINE_T[lang].emptyResult };
    }
  } catch (err) {
    console.error("API call error:", err);
    // Fallback: 直接生成 mock 报告
    const seed = formData.get("seed") as string ?? "fallback";
    const mode = formData.get("mode") as AnalysisMode ?? "face";
    const report = generateMockReport(mode, seed, lang);
    return { success: true, report };
  }
}

// ===== 图片预处理（压缩）=====
export async function preprocessImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // 最大尺寸 800x800
      const MAX = 800;
      let { width, height } = img;
      if (width > MAX || height > MAX) {
        if (width > height) {
          height = Math.round((height * MAX) / width);
          width = MAX;
        } else {
          width = Math.round((width * MAX) / height);
          height = MAX;
        }
      }
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      resolve(dataUrl);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

// ===== LocalStorage：历史记录 =====
const HISTORY_KEY = "face_reading_history";

export interface FaceReadingHistoryItem {
  id: string;
  date: string;
  mode: AnalysisMode;
  talentLabel: string;
  overallScore: number;
}

export function saveToHistory(report: FaceReadingReport): void {
  try {
    const history = getHistory();
    const item: FaceReadingHistoryItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("zh-CN"),
      mode: report.mode,
      talentLabel: report.talentLabel.name,
      overallScore: report.overallScore,
    };
    history.unshift(item);
    // 最多保存 10 条
    const trimmed = history.slice(0, 10);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch {
    // Ignore storage errors
  }
}

export function getHistory(): FaceReadingHistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as FaceReadingHistoryItem[];
  } catch {
    return [];
  }
}
