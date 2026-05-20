import { type NextRequest, NextResponse } from "next/server";
import { interpretDream } from "~/app/dream/dream-engine";
import { env } from "~/env.js";

type InterpretResult = ReturnType<typeof interpretDream>;

function buildDreamPrompt(result: InterpretResult): string {
  const keywords = result.keywords.join("、");
  const primaryEntry = result.primaryEntry;

  return `你是一位融合了中国传统周公解梦智慧与西方荣格/弗洛伊德心理学理论的释梦大师。

用户梦境描述：「${result.query}」
提取到的核心梦境元素：${keywords}
传统周公解梦初步研判：${primaryEntry.level}（${primaryEntry.omen.slice(0, 60)}...）
心理学参考方向：${primaryEntry.psychologyHint}

请你用温暖、专业、有洞察力的语言，为用户生成一份梦境解读报告。

报告须包含以下内容：

1. **传统周公解梦**：
   - 吉凶判断（大吉/吉/平/凶/大凶）
   - 吉凶预兆（100字左右，基于传统象征学解读，适当引用周公解梦的经典说法）
   - 具体宜忌建议（格式：宜：xxx；忌：xxx）

2. **潜意识心理解析**：
   - 核心心理状态（80字左右，基于荣格原型或弗洛伊德理论，分析梦境背后的心理意义）
   - 现实生活映射（60字左右，将梦境与可能的现实处境相联系）
   - 心灵成长建议（60字左右，给出富有启发性的行动建议）

3. **一句解梦金言**（20-30字，诗意且充满智慧，作为对这个梦的精华总结）

请以JSON格式返回：
{
  "level": "吉凶等级（大吉/吉/平/凶/大凶之一）",
  "traditional": {
    "omen": "吉凶预兆解读",
    "advice": "宜忌建议"
  },
  "psychology": {
    "coreState": "核心心理状态解读",
    "realMapping": "现实生活映射",
    "growthTip": "心灵成长建议"
  },
  "dreamQuote": "解梦金言"
}`;
}

function generateMockInterpretation(result: InterpretResult): {
  level: string;
  traditional: { omen: string; advice: string };
  psychology: { coreState: string; realMapping: string; growthTip: string };
  dreamQuote: string;
} {
  const entry = result.primaryEntry;
  const dreamName = result.keywords[0] ?? result.query.slice(0, 6);

  return {
    level: entry.level,
    traditional: {
      omen: entry.omen,
      advice: entry.advice,
    },
    psychology: {
      coreState: `梦见"${dreamName}"是你潜意识发出的信号。${entry.psychologyHint}此时内心正在经历某种深层的情感处理过程，梦境是你在睡眠中整合日间经历的方式。`,
      realMapping: `结合当下生活来看，这个梦境可能与你近期面临的某个决策、情感状态或压力来源有关。你的潜意识正在以象征性的方式帮助你理清思路，寻找内心真正的答案。`,
      growthTip: `尝试在清醒时回忆梦境细节，用日记记录你的感受。梦境中的情绪往往比情节更有意义，倾听那份情绪，它正在引导你向内看见自己真正的需要。`,
    },
    dreamQuote: `梦境是灵魂的镜子，${entry.level === "大吉" || entry.level === "吉" ? "此刻吉光已至，乘势而为。" : "静待转机，内心自有答案。"}`,
  };
}

export async function POST(request: NextRequest) {
  let body: { query?: string };

  try {
    body = await request.json() as { query?: string };
  } catch {
    return NextResponse.json({ error: "请求格式错误" }, { status: 400 });
  }

  const { query } = body;

  if (!query || typeof query !== "string" || query.trim().length < 1) {
    return NextResponse.json({ error: "请输入梦境内容" }, { status: 400 });
  }

  if (query.trim().length > 500) {
    return NextResponse.json({ error: "梦境描述过长，请控制在500字以内" }, { status: 400 });
  }

  // 运行解梦引擎
  const dreamResult = interpretDream(query.trim());

  // 尝试调用 AI API 生成双轨解析
  let aiReport: ReturnType<typeof generateMockInterpretation> | null = null;

  const apiKey = env.DEEPSEEK_API_KEY;
  const baseUrl = "https://api.deepseek.com";

  if (apiKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

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
              content:
                "你是一位融合中国传统周公解梦与西方荣格心理学的释梦大师，能够为用户提供深刻、温暖且有启发性的梦境解读。",
            },
            {
              role: "user",
              content: buildDreamPrompt(dreamResult),
            },
          ],
          temperature: 0.85,
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
            const parsed = JSON.parse(content) as {
              level?: string;
              traditional?: { omen?: string; advice?: string };
              psychology?: { coreState?: string; realMapping?: string; growthTip?: string };
              dreamQuote?: string;
            };
            if (parsed?.traditional?.omen && parsed?.psychology?.coreState) {
              aiReport = parsed as ReturnType<typeof generateMockInterpretation>;
            }
          } catch {
            // JSON 解析失败，使用 mock
          }
        }
      }
    } catch {
      // API 调用失败，使用 mock
    }
  }

  const report = aiReport ?? generateMockInterpretation(dreamResult);

  return NextResponse.json({
    query: dreamResult.query,
    keywords: dreamResult.keywords,
    level: report.level,
    traditional: report.traditional,
    psychology: report.psychology,
    dreamQuote: report.dreamQuote,
    // 附加分类信息供前端展示
    primaryTitle: dreamResult.primaryEntry.title,
    matchedCount: dreamResult.matched.length,
  });
}
