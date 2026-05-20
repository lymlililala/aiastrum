import { NextRequest, NextResponse } from "next/server";
import { runLoveEngine, type LoveInput } from "../../love/love-engine";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Partial<LoveInput>;

    // 基础校验
    if (!body.gender || !["female", "male"].includes(body.gender)) {
      return NextResponse.json({ error: "请选择性别" }, { status: 400 });
    }
    if (!body.birthYear || !body.birthMonth || !body.birthDay) {
      return NextResponse.json({ error: "请填写完整的出生日期" }, { status: 400 });
    }
    const year = Number(body.birthYear);
    const month = Number(body.birthMonth);
    const day = Number(body.birthDay);
    if (year < 1950 || year > 2010 || month < 1 || month > 12 || day < 1 || day > 31) {
      return NextResponse.json({ error: "请填写有效的出生日期" }, { status: 400 });
    }

    const input: LoveInput = {
      name: body.name?.trim() ?? "匿名",
      gender: body.gender,
      birthYear: year,
      birthMonth: month,
      birthDay: day,
    };

    const report = runLoveEngine(input);

    // 可选 AI 增强
    const apiKey = process.env.DEEPSEEK_API_KEY;
    let aiEnhanced: string | null = null;

    if (apiKey) {
      try {
        const prompt = buildAiPrompt(input, report);
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
                content: "你是一位温柔神秘的占星师，擅长以浪漫唯美的语言为用户解读感情运势，给予积极正向的情感支持。文风细腻、治愈，如诗如画。",
              },
              { role: "user", content: prompt },
            ],
            max_tokens: 300,
            temperature: 0.85,
          }),
          signal: AbortSignal.timeout(8000),
        });

        if (response.ok) {
          const aiData = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
          aiEnhanced = aiData.choices?.[0]?.message?.content ?? null;
        }
      } catch {
        aiEnhanced = null;
      }
    }

    if (aiEnhanced) {
      report.aiEnhanced = aiEnhanced;
    }

    return NextResponse.json({ success: true, report });
  } catch (err) {
    console.error("姻缘占卜 API 错误:", err);
    return NextResponse.json({ error: "测算失败，请稍后再试" }, { status: 500 });
  }
}

function buildAiPrompt(input: LoveInput, report: ReturnType<typeof runLoveEngine>): string {
  return `请以温柔神秘的占星师口吻，为以下用户写一段100字左右的姻缘寄语（不要重复已有内容，要有新的诗意视角）：

用户：${input.gender === "female" ? "女性" : "男性"}，${input.birthYear}年${input.birthMonth}月${input.birthDay}日生，${report.zodiac.name}
姻缘综合指数：${report.score.overall}分（${report.score.label}）
正缘特征：${report.soulmate.personality}

请写一段让人感到被理解、被治愈、充满希望的寄语，语气温暖而有力量，结尾用一句诗意的话收尾。`;
}
