import { NextRequest, NextResponse } from "next/server";
import { runZiweiEngine, type ZiweiInput } from "../../ziwei/ziwei-engine";

type ZiweiLang = "zh" | "en" | "tw";

export async function POST(request: NextRequest) {
  let lang: ZiweiLang = "zh";

  try {
    const body = await request.json() as Partial<ZiweiInput> & { lang?: ZiweiLang };
    lang = body.lang ?? "zh";

    // 基础校验
    if (!body.gender || !["female", "male"].includes(body.gender)) {
      return NextResponse.json({ error: ERR_GENDER[lang] }, { status: 400 });
    }
    if (!body.birthYear || !body.birthMonth || !body.birthDay) {
      return NextResponse.json({ error: ERR_DATE_INCOMPLETE[lang] }, { status: 400 });
    }
    const year  = Number(body.birthYear);
    const month = Number(body.birthMonth);
    const day   = Number(body.birthDay);
    if (year < 1920 || year > 2010 || month < 1 || month > 12 || day < 1 || day > 31) {
      return NextResponse.json({ error: ERR_DATE_INVALID[lang] }, { status: 400 });
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

    const chart = runZiweiEngine(input, lang);

    // 可选 AI 增强
    const apiKey = process.env.DEEPSEEK_API_KEY;
    let aiEnhanced: string | null = null;

    if (apiKey) {
      try {
        const prompt = buildAiPrompt(input, chart, lang);
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
                content: SYSTEM_PROMPT[lang],
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
    return NextResponse.json({ error: ERR_CALC_FAILED[lang] }, { status: 500 });
  }
}

const ERR_GENDER: Record<ZiweiLang, string> = {
  zh: "请选择性别",
  en: "Please select a gender",
  tw: "請選擇性別",
};

const ERR_DATE_INCOMPLETE: Record<ZiweiLang, string> = {
  zh: "请填写完整的出生日期",
  en: "Please provide a complete birth date",
  tw: "請填寫完整的出生日期",
};

const ERR_DATE_INVALID: Record<ZiweiLang, string> = {
  zh: "请填写有效的出生日期",
  en: "Please provide a valid birth date",
  tw: "請填寫有效的出生日期",
};

const ERR_CALC_FAILED: Record<ZiweiLang, string> = {
  zh: "排盘失败，请稍后再试",
  en: "Chart calculation failed, please try again later",
  tw: "排盤失敗，請稍後再試",
};

const SYSTEM_PROMPT: Record<ZiweiLang, string> = {
  zh: "你是一位精通紫微斗数的命理师，善于用现代语言解读东方星盘，文风深邃而有温度，既保有传统命理的专业性，又能让年轻人读懂并产生共鸣。",
  en: "You are a master of Zi Wei Dou Shu (Purple Star Astrology) who interprets Eastern birth charts in modern language. Your writing is profound yet warm, preserving the professionalism of traditional astrology while remaining accessible and resonant for young readers. Respond entirely in English.",
  tw: "你是一位精通紫微斗數的命理師，善於用現代語言解讀東方星盤，文風深邃而有溫度，既保有傳統命理的專業性，又能讓年輕人讀懂並產生共鳴。",
};

function buildAiPrompt(input: ZiweiInput, chart: ReturnType<typeof runZiweiEngine>, lang: ZiweiLang): string {
  if (lang === "en") {
    return `As a master of Zi Wei Dou Shu (Purple Star Astrology), write an approximately 150-word overall destiny appraisal for the following birth chart.

Note: The Zi Wei star and palace references below may be in Chinese — use them as inspiration only. Your entire response MUST be written in English.

Native: ${input.gender === "female" ? "female chart" : "male chart"}, born on ${input.birthYear}-${input.birthMonth}-${input.birthDay}
Year stem-branch: ${chart.yearGan}${chart.yearZhi}
Life Palace main star: ${chart.mingStarName}
Five Elements Bureau: ${chart.wuXingJu}, fortune begins at age ${chart.startAge}
Personality tags: ${chart.personalityLabels.join(", ")}

Write a deep yet warm destiny appraisal that carries the professional perspective of traditional astrology while being understandable to modern young readers.
Emphasize this person's talents, overall life pattern, and core traits. End with a powerful sentence that serves as a life motto.`;
  }

  const twNote = lang === "tw"
    ? "\n\n請務必使用繁體中文（台灣用語）輸出全部內容。"
    : "";

  return `请以精通紫微斗数的命理师口吻，为以下命盘写一段约150字的命格总评：

命主：${input.gender === "female" ? "女命" : "男命"}，${input.birthYear}年${input.birthMonth}月${input.birthDay}日生
年干支：${chart.yearGan}${chart.yearZhi}年
命宫主星：${chart.mingStarName}
五行局：${chart.wuXingJu}，${chart.startAge}岁起运
性格标签：${chart.personalityLabels.join("、")}

请写一段有深度、有温度的命格总评，既有传统命理的专业视角，又能让现代年轻人读懂。
重点突出这个人的天赋、人生格局与核心特质。结尾用一句有力量的话作为人生格言。${twNote}`;
}
