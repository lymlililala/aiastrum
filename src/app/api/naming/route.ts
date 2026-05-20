import { type NextRequest, NextResponse } from "next/server";
import { runNamingEngine, calculateBazi, generateNames, type NamingInput } from "~/app/naming/naming-engine";
import { env } from "~/env.js";

type NamingInputBody = {
  surname?: string;
  gender?: string;
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
};

// AI 增强提示词
function buildAIEnhancePrompt(
  surname: string,
  gender: string,
  baziDiagnosis: string,
  xiyongshen: string[],
  freeNames: string[],
): string {
  const genderStr = gender === "male" ? "男孩" : "女孩";
  return `你是一位精通中国传统命理与诗词文化的起名大师。

【宝宝信息】
- 姓氏：${surname}
- 性别：${genderStr}
- 命理诊断：${baziDiagnosis}
- 喜用神五行：${xiyongshen.join("、")}

【已推荐的免费名字】：${freeNames.join("、")}

请在此基础上，额外提供5个高质量的名字，要求：
1. 符合喜用神五行属性
2. 必须出自《诗经》《楚辞》《唐诗》《宋词》等国学经典，标注出处
3. 诗意优美，读音响亮，平仄和谐
4. 避免生僻字、谐音不雅的字
5. 与姓氏"${surname}"搭配和谐

请以JSON格式返回：
{
  "names": [
    {
      "name": "子轩",
      "pinyin": "zǐ xuān",
      "wuxing": ["木", "水"],
      "meaning": "如松柏之坚，如流水之灵",
      "source": "出自《诗经·小雅》",
      "sourceText": "高山仰止，景行行止",
      "recommend_reason": "木水相生，符合喜用神，寓意才智兼备"
    }
  ]
}`;
}

export async function POST(request: NextRequest) {
  let body: NamingInputBody;

  try {
    body = await request.json() as NamingInputBody;
  } catch {
    return NextResponse.json({ error: "请求格式错误" }, { status: 400 });
  }

  const { surname, gender, year, month, day, hour } = body;

  if (!surname || typeof surname !== "string" || surname.trim().length < 1) {
    return NextResponse.json({ error: "请输入姓氏" }, { status: 400 });
  }
  if (gender !== "male" && gender !== "female") {
    return NextResponse.json({ error: "请选择性别" }, { status: 400 });
  }
  if (!year || !month || !day) {
    return NextResponse.json({ error: "请输入完整出生日期" }, { status: 400 });
  }
  if (year < 1900 || year > 2100) {
    return NextResponse.json({ error: "出生年份不合法" }, { status: 400 });
  }
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return NextResponse.json({ error: "出生日期不合法" }, { status: 400 });
  }

  const namingInput: NamingInput = {
    surname: surname.trim(),
    gender: gender as "male" | "female",
    year,
    month,
    day,
    hour: hour ?? 8,
  };

  // 运行起名引擎
  const result = runNamingEngine(namingInput);

  // 尝试 AI 增强（给免费用户的 5 个基础名字上生成额外 AI 推荐）
  let aiNames: Array<{
    name: string;
    pinyin: string;
    wuxing: string[];
    meaning: string;
    source: string;
    sourceText: string;
    recommend_reason: string;
  }> = [];

  const apiKey = env.DEEPSEEK_API_KEY;
  const baseUrl = "https://api.deepseek.com";

  if (apiKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const freeNames = result.freeSuggestions.map(s => s.name);
      const prompt = buildAIEnhancePrompt(
        namingInput.surname,
        namingInput.gender,
        result.bazi.diagnosis,
        result.bazi.xiyongshen,
        freeNames,
      );

      const response = await fetch(`${baseUrl}/v1/chat/completions`, {
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
              content: "你是一位精通中国传统命理学与诗词文化的起名大师，擅长结合八字喜用神推荐出自经典的优美名字。",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.9,
          max_tokens: 1000,
          response_format: { type: "json_object" },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json() as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const content = data?.choices?.[0]?.message?.content;
        if (content) {
          try {
            const parsed = JSON.parse(content) as { names?: typeof aiNames };
            if (parsed?.names && Array.isArray(parsed.names)) {
              aiNames = parsed.names.slice(0, 5);
            }
          } catch { /* JSON 解析失败 */ }
        }
      }
    } catch { /* API 调用失败 */ }
  }

  // 构建返回数据
  return NextResponse.json({
    bazi: {
      pillars: result.bazi.pillars.map(p => ({
        label: p.label,
        gan: p.gan,
        zhi: p.zhi,
        ganWuxing: p.ganWuxing,
        zhiWuxing: p.zhiWuxing,
      })),
      wuxingScores: result.bazi.wuxingScores,
      dominant: result.bazi.dominant,
      weak: result.bazi.weak,
      xiyongshen: result.bazi.xiyongshen,
      diagnosis: result.bazi.diagnosis,
    },
    surname: result.surname,
    gender: result.gender,
    freeSuggestions: result.freeSuggestions,
    premiumCount: 0,
    premiumSuggestions: [],
    aiNames,
  });
}
