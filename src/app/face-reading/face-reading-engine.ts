// ===== AI 面相/手相分析 引擎层 =====

import type { AnalysisMode, FaceReadingReport } from "./face-reading-data";
import { generateMockReport } from "./face-reading-data";

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

export function validateImage(file: File): ImageValidationResult {
  // 类型检查
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "请上传 JPG、PNG 或 WebP 格式的图片" };
  }

  // 大小检查（最大 10MB）
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return { valid: false, error: "图片大小不能超过 10MB" };
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

const SCAN_PHASES: ScanProgress[] = [
  { phase: "uploading", progress: 15, message: "正在上传图像..." },
  { phase: "detecting", progress: 35, message: "AI 面部/掌纹特征识别中..." },
  { phase: "analyzing", progress: 60, message: "深度分析骨相与纹路..." },
  { phase: "generating", progress: 85, message: "生成专属命运报告..." },
  { phase: "complete", progress: 100, message: "分析完成！" },
];

export async function runScanAnimation(
  onProgress: (progress: ScanProgress) => void
): Promise<void> {
  for (const phase of SCAN_PHASES) {
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
  onProgress?: (progress: ScanProgress) => void
): Promise<AnalysisResult> {
  // 验证图片
  const validation = validateImage(file);
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

    // 动画与请求并行
    const [apiResult] = await Promise.all([
      callAnalysisAPI(formData),
      onProgress ? runScanAnimation(onProgress) : Promise.resolve(),
    ]);

    return apiResult;
  } catch (err) {
    console.error("Analysis error:", err);
    return { success: false, error: "分析失败，请重试" };
  }
}

// ===== 调用分析 API =====
async function callAnalysisAPI(formData: FormData): Promise<AnalysisResult> {
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
      return { success: false, error: data.error ?? "分析结果为空" };
    }
  } catch (err) {
    console.error("API call error:", err);
    // Fallback: 直接生成 mock 报告
    const seed = formData.get("seed") as string ?? "fallback";
    const mode = formData.get("mode") as AnalysisMode ?? "face";
    const report = generateMockReport(mode, seed);
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
