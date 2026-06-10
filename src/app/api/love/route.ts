import { NextRequest, NextResponse } from "next/server";
import { runLoveEngine, type LoveInput } from "../../love/love-engine";

type LoveLang = "zh" | "en" | "tw";

export async function POST(request: NextRequest) {
  let lang: LoveLang = "zh";
  try {
    const body = await request.json() as Partial<LoveInput> & { lang?: LoveLang };
    lang = body.lang ?? "zh";

    // 基础校验
    if (!body.gender || !["female", "male"].includes(body.gender)) {
      return NextResponse.json({ error: ERR_GENDER[lang] }, { status: 400 });
    }
    if (!body.birthYear || !body.birthMonth || !body.birthDay) {
      return NextResponse.json({ error: ERR_DATE_INCOMPLETE[lang] }, { status: 400 });
    }
    const year = Number(body.birthYear);
    const month = Number(body.birthMonth);
    const day = Number(body.birthDay);
    if (year < 1950 || year > 2010 || month < 1 || month > 12 || day < 1 || day > 31) {
      return NextResponse.json({ error: ERR_DATE_INVALID[lang] }, { status: 400 });
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
        const prompt = buildAiPrompt(input, report, lang);
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
                content: AI_SYSTEM[lang],
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
    return NextResponse.json({ error: ERR_SERVER[lang] }, { status: 500 });
  }
}

const ERR_GENDER: Record<LoveLang, string> = {
  zh: "请选择性别",
  en: "Please select a gender",
  tw: "請選擇性別",
};
const ERR_DATE_INCOMPLETE: Record<LoveLang, string> = {
  zh: "请填写完整的出生日期",
  en: "Please enter a complete date of birth",
  tw: "請填寫完整的出生日期",
};
const ERR_DATE_INVALID: Record<LoveLang, string> = {
  zh: "请填写有效的出生日期",
  en: "Please enter a valid date of birth",
  tw: "請填寫有效的出生日期",
};
const ERR_SERVER: Record<LoveLang, string> = {
  zh: "测算失败，请稍后再试",
  en: "Reading failed, please try again later",
  tw: "測算失敗，請稍後再試",
};

const AI_SYSTEM: Record<LoveLang, string> = {
  zh: "你是一位温柔神秘的占星师，擅长以浪漫唯美的语言为用户解读感情运势，给予积极正向的情感支持。文风细腻、治愈，如诗如画。",
  en: "You are a gentle, mystical astrologer who interprets love and relationship fortunes for users in romantic, lyrical language, offering positive emotional support. Your style is delicate, healing, and poetic.",
  tw: "你是一位溫柔神秘的占星師，擅長以浪漫唯美的語言為用戶解讀感情運勢，給予積極正向的情感支持。文風細膩、治癒，如詩如畫。",
};

function buildAiPrompt(input: LoveInput, report: ReturnType<typeof runLoveEngine>, lang: LoveLang): string {
  if (lang === "en") {
    return `As a gentle, mystical astrologer, write an approximately 100-word love message for the following user (do not repeat existing content; bring a fresh, poetic perspective). Your entire response MUST be written in English — the Chinese references below are inspiration only.

User: ${input.gender === "female" ? "Female" : "Male"}, born ${input.birthYear}-${input.birthMonth}-${input.birthDay}, ${report.zodiac.name}
Overall love index: ${report.score.overall} (${report.score.label})
Soulmate traits: ${report.soulmate.personality}

Write a message that makes the reader feel understood, healed, and full of hope. The tone should be warm and empowering, ending with a single poetic line.`;
  }

  const twNote = lang === "tw" ? "\n\n請務必使用繁體中文（台灣用語）輸出全部內容。" : "";

  return `请以温柔神秘的占星师口吻，为以下用户写一段100字左右的姻缘寄语（不要重复已有内容，要有新的诗意视角）：

用户：${input.gender === "female" ? "女性" : "男性"}，${input.birthYear}年${input.birthMonth}月${input.birthDay}日生，${report.zodiac.name}
姻缘综合指数：${report.score.overall}分（${report.score.label}）
正缘特征：${report.soulmate.personality}

请写一段让人感到被理解、被治愈、充满希望的寄语，语气温暖而有力量，结尾用一句诗意的话收尾。${twNote}`;
}
