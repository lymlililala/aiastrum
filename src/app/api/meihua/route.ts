import { NextRequest, NextResponse } from "next/server";
import { runMeihuaEngine, type MeihuaInput } from "../../meihua/meihua-engine";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Partial<MeihuaInput>;

    // 校验起卦方式
    const method = body.method;
    if (!method || !["time", "number", "random"].includes(method)) {
      return NextResponse.json({ error: "无效的起卦方式" }, { status: 400 });
    }

    // 数字起卦校验
    if (method === "number") {
      if (!body.num1 || !body.num2) {
        return NextResponse.json({ error: "数字起卦需要提供两个数字" }, { status: 400 });
      }
    }

    const input: MeihuaInput = {
      method,
      question: body.question ?? "",
      category: body.category ?? "general",
      num1: body.num1,
      num2: body.num2,
      lunarYear: body.lunarYear,
      lunarMonth: body.lunarMonth,
      lunarDay: body.lunarDay,
      hour: body.hour,
    };

    const result = runMeihuaEngine(input);

    // 可选：AI 增强解读
    const apiKey = process.env.DEEPSEEK_API_KEY;
    let aiReading: string | null = null;

    if (apiKey) {
      try {
        const prompt = buildAiPrompt(result);
        const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "deepseek-v4-flash",
            messages: [
              {
                role: "system",
                content: "你是一位精通梅花易数的易学大师，擅长用通俗易懂的语言解读卦象，文风典雅而不晦涩。",
              },
              { role: "user", content: prompt },
            ],
            max_tokens: 400,
            temperature: 0.7,
          }),
          signal: AbortSignal.timeout(8000),
        });

        if (response.ok) {
          const aiData = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
          aiReading = aiData.choices?.[0]?.message?.content ?? null;
        }
      } catch {
        // AI 失败不影响主流程
        aiReading = null;
      }
    }

    return NextResponse.json({
      success: true,
      result,
      aiReading,
    });
  } catch (err) {
    console.error("梅花易数 API 错误:", err);
    return NextResponse.json({ error: "推算失败，请稍后再试" }, { status: 500 });
  }
}

function buildAiPrompt(result: ReturnType<typeof runMeihuaEngine>): string {
  return `请根据以下梅花易数排盘结果，给出一段简洁而富有诗意的解读（200字以内）：

占问：${result.question || "未指明"}
事项分类：${result.category}
本卦：${result.mainGua.guaName}（${result.mainGua.symbol}）
互卦：${result.huGua.guaName}（${result.huGua.symbol}）
变卦：${result.changeGua.guaName}（${result.changeGua.symbol}）
动爻：第${result.dongYao}爻
体卦：${result.tiGua === "upper" ? result.mainGua.upperName : result.mainGua.lowerName}（${result.tiWuXing}）
用卦：${result.yongGua === "upper" ? result.mainGua.upperName : result.mainGua.lowerName}（${result.yongWuXing}）
体用关系：${result.relation.type}（${result.relation.level}）
断语：${result.relation.summary}

请结合体用五行生克、卦象意象，给出针对此次占问的个性化建议。语言优美，引用1-2句相关经典或诗句，结尾以"善易者不卜"作为提醒。`;
}
