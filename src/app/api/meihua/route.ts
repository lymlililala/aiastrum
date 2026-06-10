import { NextRequest, NextResponse } from "next/server";
import { runMeihuaEngine, type MeihuaInput } from "../../meihua/meihua-engine";

type Lang = "zh" | "en" | "tw";

export async function POST(request: NextRequest) {
  let lang: Lang = "zh";
  try {
    const body = await request.json() as Partial<MeihuaInput> & { lang?: Lang };

    lang = body.lang ?? "zh";

    // 校验起卦方式
    const method = body.method;
    if (!method || !["time", "number", "random"].includes(method)) {
      return NextResponse.json({ error: errMsg(lang, "invalidMethod") }, { status: 400 });
    }

    // 数字起卦校验
    if (method === "number") {
      if (!body.num1 || !body.num2) {
        return NextResponse.json({ error: errMsg(lang, "needTwoNumbers") }, { status: 400 });
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
        const prompt = buildAiPrompt(result, lang);
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
                content:
                  lang === "en"
                    ? "You are a master of Meihua Yishu (Plum Blossom Numerology / I Ching divination), skilled at interpreting hexagrams in clear, accessible language with an elegant yet unobscure style. Respond entirely in English."
                    : lang === "tw"
                      ? "你是一位精通梅花易數的易學大師，擅長用通俗易懂的語言解讀卦象，文風典雅而不晦澀。"
                      : "你是一位精通梅花易数的易学大师，擅长用通俗易懂的语言解读卦象，文风典雅而不晦涩。",
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
    return NextResponse.json({ error: errMsg(lang, "calcFailed") }, { status: 500 });
  }
}

function errMsg(
  lang: Lang,
  key: "invalidMethod" | "needTwoNumbers" | "calcFailed",
): string {
  const strings: Record<typeof key, Record<Lang, string>> = {
    invalidMethod: {
      zh: "无效的起卦方式",
      tw: "無效的起卦方式",
      en: "Invalid divination method",
    },
    needTwoNumbers: {
      zh: "数字起卦需要提供两个数字",
      tw: "數字起卦需要提供兩個數字",
      en: "Number-based divination requires two numbers",
    },
    calcFailed: {
      zh: "推算失败，请稍后再试",
      tw: "推算失敗，請稍後再試",
      en: "Divination failed. Please try again later.",
    },
  };
  return strings[key][lang];
}

function buildAiPrompt(result: ReturnType<typeof runMeihuaEngine>, lang: Lang): string {
  if (lang === "en") {
    return `Based on the following Meihua Yishu (Plum Blossom Numerology) chart, please provide a concise and poetic interpretation (within 200 words):

Question: ${result.question || "Not specified"}
Category: ${result.category}
Main hexagram: ${result.mainGua.guaName} (${result.mainGua.symbol})
Mutual hexagram: ${result.huGua.guaName} (${result.huGua.symbol})
Changing hexagram: ${result.changeGua.guaName} (${result.changeGua.symbol})
Moving line: line ${result.dongYao}
Body trigram (Ti): ${result.tiGua === "upper" ? result.mainGua.upperName : result.mainGua.lowerName} (${result.tiWuXing})
Function trigram (Yong): ${result.yongGua === "upper" ? result.mainGua.upperName : result.mainGua.lowerName} (${result.yongWuXing})
Ti-Yong relationship: ${result.relation.type} (${result.relation.level})
Verdict: ${result.relation.summary}

Note: The Chinese hexagram names, trigram references, and Five-Element (Wu Xing) terms above are for inspiration only. Your entire response MUST be written in English.

Drawing on the Five-Element generating/overcoming cycle between Ti and Yong and the imagery of the hexagrams, give personalized advice for this question. Use beautiful language, quote 1-2 relevant classics or poetic lines, and close with the reminder "He who truly knows the Yi does not need to divine."`;
  }

  if (lang === "tw") {
    return `請根據以下梅花易數排盤結果，給出一段簡潔而富有詩意的解讀（200字以內）：

占問：${result.question || "未指明"}
事項分類：${result.category}
本卦：${result.mainGua.guaName}（${result.mainGua.symbol}）
互卦：${result.huGua.guaName}（${result.huGua.symbol}）
變卦：${result.changeGua.guaName}（${result.changeGua.symbol}）
動爻：第${result.dongYao}爻
體卦：${result.tiGua === "upper" ? result.mainGua.upperName : result.mainGua.lowerName}（${result.tiWuXing}）
用卦：${result.yongGua === "upper" ? result.mainGua.upperName : result.mainGua.lowerName}（${result.yongWuXing}）
體用關係：${result.relation.type}（${result.relation.level}）
斷語：${result.relation.summary}

請結合體用五行生克、卦象意象，給出針對此次占問的個性化建議。語言優美，引用1-2句相關經典或詩句，結尾以「善易者不卜」作為提醒。請務必使用繁體中文（台灣用語）輸出全部內容。`;
  }

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
