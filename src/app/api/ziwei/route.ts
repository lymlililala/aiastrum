import { NextRequest, NextResponse } from "next/server";
import { runZiweiEngine, type ZiweiInput } from "../../ziwei/ziwei-engine";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Partial<ZiweiInput>;

    // 基础校验
    if (!body.gender || !["female", "male"].includes(body.gender)) {
      return NextResponse.json({ error: "请选择性别" }, { status: 400 });
    }
    if (!body.birthYear || !body.birthMonth || !body.birthDay) {
      return NextResponse.json({ error: "请填写完整的出生日期" }, { status: 400 });
    }
    const year  = Number(body.birthYear);
    const month = Number(body.birthMonth);
    const day   = Number(body.birthDay);
    if (year < 1920 || year > 2010 || month < 1 || month > 12 || day < 1 || day > 31) {
      return NextResponse.json({ error: "请填写有效的出生日期" }, { status: 400 });
    }

    const input: ZiweiInput = {
      name:        body.name?.trim() ?? "匿名",
      gender:      body.gender,
      birthYear:   year,
      birthMonth:  month,
      birthDay:    day,
      birthHour:   Number(body.birthHour ?? -1),
      isLunar:     body.isLunar ?? false,
      birthPlace:  body.birthPlace?.trim(),
    };

    const chart = runZiweiEngine(input);

    // 可选 AI 增强
    const apiKey = process.env.DEEPSEEK_API_KEY;
    let aiEnhanced: string | null = null;

    if (apiKey) {
      try {
        const prompt = buildAiPrompt(input, chart);
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
                content: "你是一位精通紫微斗数的命理师，善于用现代语言解读东方星盘，文风深邃而有温度，既保有传统命理的专业性，又能让年轻人读懂并产生共鸣。",
              },
              { role: "user", content: prompt },
            ],
            max_tokens: 350,
            temperature: 0.8,
          }),
          signal: AbortSignal.timeout(10000),
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
      chart.aiEnhanced = aiEnhanced;
    }

    return NextResponse.json({ success: true, chart });
  } catch (err) {
    console.error("紫微斗数 API 错误:", err);
    return NextResponse.json({ error: "排盘失败，请稍后再试" }, { status: 500 });
  }
}

function buildAiPrompt(input: ZiweiInput, chart: ReturnType<typeof runZiweiEngine>): string {
  return `请以精通紫微斗数的命理师口吻，为以下命盘写一段约150字的命格总评：

命主：${input.gender === "female" ? "女命" : "男命"}，${input.birthYear}年${input.birthMonth}月${input.birthDay}日生
年干支：${chart.yearGan}${chart.yearZhi}年
命宫主星：${chart.mingStarName}
五行局：${chart.wuXingJu}，${chart.startAge}岁起运
性格标签：${chart.personalityLabels.join("、")}

请写一段有深度、有温度的命格总评，既有传统命理的专业视角，又能让现代年轻人读懂。
重点突出这个人的天赋、人生格局与核心特质。结尾用一句有力量的话作为人生格言。`;
}
