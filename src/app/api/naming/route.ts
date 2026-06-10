import { type NextRequest, NextResponse } from "next/server";
import { runNamingEngine, calculateBazi, generateNames, type NamingInput } from "~/app/naming/naming-engine";
import { env } from "~/env.js";

type Lang = "zh" | "en" | "tw";

type NamingInputBody = {
  surname?: string;
  gender?: string;
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  lang?: Lang;
};

// AI 增强提示词
function buildAIEnhancePrompt(
  surname: string,
  gender: string,
  baziDiagnosis: string,
  xiyongshen: string[],
  freeNames: string[],
  lang: Lang,
): string {
  if (lang === "en") {
    const genderStr = gender === "male" ? "a boy" : "a girl";
    return `You are a master of Chinese name-giving, deeply versed in traditional Chinese metaphysics (Bazi / Five Elements) and classical poetry.

[Baby Info]
- Surname: ${surname}
- Gender: ${genderStr}
- Destiny diagnosis: ${baziDiagnosis}
- Favorable elements (xiyongshen): ${xiyongshen.join(", ")}

[Free names already recommended]: ${freeNames.join(", ")}

Building on this, please provide 5 additional high-quality names. Requirements:
1. Match the favorable Five-Element attributes (xiyongshen)
2. Each name MUST be drawn from a Chinese classic such as the Book of Songs (诗经), Songs of Chu (楚辞), Tang poetry (唐诗), or Song lyrics (宋词), with the source cited
3. Poetic and beautiful, sonorous in pronunciation, harmonious in tone
4. Avoid obscure characters and characters with unpleasant homophones
5. Harmonize well with the surname "${surname}"

IMPORTANT — language rules: This is a Chinese given-name generator. The "name" field MUST remain in Chinese characters (do NOT romanize or translate the name itself), and "sourceText" (the original quoted classical line) MUST stay in its original Chinese. The "pinyin" field stays as pinyin. ALL explanatory fields — "meaning", "source", and "recommend_reason" — MUST be written in English.

Return in JSON format:
{
  "names": [
    {
      "name": "子轩",
      "pinyin": "zǐ xuān",
      "wuxing": ["木", "水"],
      "meaning": "Steadfast as pine and cypress, spirited as flowing water",
      "source": "From the Book of Songs · Xiaoya",
      "sourceText": "高山仰止，景行行止",
      "recommend_reason": "Wood and Water nourish each other, matching the favorable elements, symbolizing both talent and wisdom"
    }
  ]
}`;
  }

  const genderStr = gender === "male" ? "男孩" : "女孩";
  const twNote = lang === "tw" ? "\n\n請務必使用繁體中文（台灣用語）輸出全部內容（名字本身與引用原文保持原樣）。" : "";
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
}${twNote}`;
}

export async function POST(request: NextRequest) {
  let body: NamingInputBody;

  try {
    body = await request.json() as NamingInputBody;
  } catch {
    return NextResponse.json({ error: "请求格式错误" }, { status: 400 });
  }

  const { surname, gender, year, month, day, hour } = body;
  const lang: Lang = body.lang ?? "zh";

  if (!surname || typeof surname !== "string" || surname.trim().length < 1) {
    return NextResponse.json({ error: lang === "en" ? "Please enter a surname" : "请输入姓氏" }, { status: 400 });
  }
  if (gender !== "male" && gender !== "female") {
    return NextResponse.json({ error: lang === "en" ? "Please select a gender" : "请选择性别" }, { status: 400 });
  }
  if (!year || !month || !day) {
    return NextResponse.json({ error: lang === "en" ? "Please enter a complete birth date" : "请输入完整出生日期" }, { status: 400 });
  }
  if (year < 1900 || year > 2100) {
    return NextResponse.json({ error: lang === "en" ? "Invalid birth year" : "出生年份不合法" }, { status: 400 });
  }
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return NextResponse.json({ error: lang === "en" ? "Invalid birth date" : "出生日期不合法" }, { status: 400 });
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
        lang,
      );

      const systemContent =
        lang === "en"
          ? "You are a master of Chinese name-giving, deeply versed in traditional Chinese metaphysics and classical poetry. You recommend beautiful names drawn from the classics based on the Bazi favorable elements. The names themselves stay in Chinese characters; all explanations are written in English."
          : lang === "tw"
            ? "你是一位精通中國傳統命理學與詩詞文化的起名大師，擅長結合八字喜用神推薦出自經典的優美名字。請使用繁體中文（台灣用語）輸出。"
            : "你是一位精通中国传统命理学与诗词文化的起名大师，擅长结合八字喜用神推荐出自经典的优美名字。";

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
              content: systemContent,
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
