import { NextRequest, NextResponse } from "next/server";
import { generateMockReport } from "~/app/face-reading/face-reading-data";
import type { AnalysisMode } from "~/app/face-reading/face-reading-data";

// ===== AI 面相/手相分析 API 路由 =====
// MVP 策略：
// 1. 接收图片与分析模式
// 2. 优先调用 AI（DeepSeek/OpenAI）生成报告
// 3. AI 不可用时 Fallback 到 Mock 报告（确保可用性）
// ⚠️ 注意：照片仅用于分析，API 处理完成后立即丢弃，不保存任何图像数据

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const mode = (formData.get("mode") as AnalysisMode) ?? "face";
    const seed = (formData.get("seed") as string) ?? String(Date.now());
    // const imageFile = formData.get("image") as File | null;
    // 图片已接收，仅用于本次分析，不保存

    // ===== 尝试调用 AI API =====
    const apiKey = process.env.DEEPSEEK_API_KEY ?? null;

    let aiEnhancedReport = null;

    if (apiKey) {
      try {
        aiEnhancedReport = await callAIForEnhancement(mode, seed, apiKey);
      } catch (aiError) {
        console.error("AI API 调用失败，使用 Mock 报告:", aiError);
      }
    }

    // ===== 生成基础 Mock 报告 =====
    const baseReport = generateMockReport(mode, seed);

    // ===== 如果 AI 增强成功，合并到报告 =====
    const finalReport = aiEnhancedReport
      ? mergeAIContent(baseReport, aiEnhancedReport)
      : baseReport;

    return NextResponse.json({ report: finalReport });
  } catch (error) {
    console.error("Face reading API error:", error);
    return NextResponse.json(
      { error: "分析服务暂时不可用，请稍后重试" },
      { status: 500 }
    );
  }
}

// ===== AI 增强接口（可选）=====
interface AIEnhancement {
  overview?: string;
  lifeQuote?: string;
  shareText?: string;
}

async function callAIForEnhancement(
  mode: AnalysisMode,
  seed: string,
  apiKey: string
): Promise<AIEnhancement | null> {
  const baseUrl = "https://api.deepseek.com";
  const model = "deepseek-v4-flash";

  const modeName = mode === "face" ? "面相" : "手相";
  const prompt = `你是一位融合东方面相学与现代心理学的AI命理师。
请为用户生成一段${modeName}分析报告的核心文案。

要求：
1. overview：总体解读，150字以内，积极正面，使用巴纳姆效应（模糊但让人感觉精准），带有科技感
2. lifeQuote：专属人生格言，一句话，20字以内，充满力量感
3. shareText：朋友圈分享文案，50字以内，让人忍不住转发，包含"AI ${modeName}分析"关键词

分析种子：${seed}（用于保证确定性）

只返回 JSON 格式：
{"overview": "...", "lifeQuote": "...", "shareText": "..."}`;

  const response = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    throw new Error(`AI API error: ${response.status}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{
      message?: { content?: string };
    }>;
  };

  const content = data.choices?.[0]?.message?.content;
  if (!content) return null;

  // 提取 JSON
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return null;

  const parsed = JSON.parse(jsonMatch[0]) as {
    overview?: string;
    lifeQuote?: string;
    shareText?: string;
  };

  if (parsed?.overview && parsed?.lifeQuote) {
    return parsed as AIEnhancement;
  }

  return null;
}

// ===== 合并 AI 内容到报告 =====
function mergeAIContent(
  baseReport: ReturnType<typeof generateMockReport>,
  aiContent: AIEnhancement
): ReturnType<typeof generateMockReport> {
  return {
    ...baseReport,
    overview: aiContent.overview ?? baseReport.overview,
    lifeQuote: aiContent.lifeQuote ?? baseReport.lifeQuote,
    shareText: aiContent.shareText ?? baseReport.shareText,
  };
}
