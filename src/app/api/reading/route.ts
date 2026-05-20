import { type NextRequest, NextResponse } from "next/server";
import { env } from "~/env.js";

interface CardInfo {
  name: string;
  nameCn: string;
  reversed: boolean;
  position?: string;
  meaningUp: string;
  meaningRev: string;
  keywords: string[];
}

interface ReadingRequest {
  cards: CardInfo[];
  domain: string;
  spreadType: "single" | "three";
  question?: string;
  lang?: "zh" | "en";
}

const DOMAIN_NAMES: Record<string, Record<string, string>> = {
  love:    { zh: "爱情感情", en: "Love & Relationships" },
  career:  { zh: "事业工作", en: "Career & Work" },
  wealth:  { zh: "财富金钱", en: "Wealth & Finance" },
  general: { zh: "综合人生", en: "General Life" },
};

function buildPrompt(request: ReadingRequest): string {
  const lang = request.lang ?? "zh";
  const domainName = DOMAIN_NAMES[request.domain]?.[lang] ?? (lang === "en" ? "General Life" : "综合人生");

  let cardDescriptions = "";

  if (lang === "en") {
    if (request.spreadType === "single") {
      const card = request.cards[0]!;
      cardDescriptions = `Card drawn: ${card.name} — ${card.reversed ? "Reversed" : "Upright"}
Meaning: ${card.reversed ? card.meaningRev : card.meaningUp}
Keywords: ${card.keywords.join(", ")}`;
    } else {
      cardDescriptions = request.cards
        .map(
          (card, i) =>
            `[${card.position ?? `Card ${i + 1}`}] ${card.name} — ${card.reversed ? "Reversed" : "Upright"}
  Meaning: ${card.reversed ? card.meaningRev : card.meaningUp}
  Keywords: ${card.keywords.join(", ")}`,
        )
        .join("\n\n");
    }

    const questionPart = request.question ? `\nUser's question: ${request.question}\n` : "";

    return `You are a warm, insightful professional tarot reader with a background in psychology. Please provide a ${domainName} tarot reading for the user.
${questionPart}
${cardDescriptions}

Note: The "Meaning" and "Keywords" references above may be in Chinese — use them as inspiration only. Your entire response MUST be written in English.

Please structure your reading as follows:

1. **Opening Sense** (1-2 sentences): Describe the overall energy of the spread
2. **Card Interpretation**: Interpret each card (${request.spreadType === "single" ? "today's card" : "Past / Present / Future"}) in detail with warmth
3. **Overall Guidance** (2-3 sentences): Give focused advice related to ${domainName}
4. **Closing Blessing**: End with one beautiful, empowering message

Tone: warm, empathetic, specific, personal — like a wise friend, not a robot.
Total length: 200-350 words.
Output the reading directly in English — no Chinese characters, no title.`;
  }

  // Chinese prompt
  if (request.spreadType === "single") {
    const card = request.cards[0]!;
    cardDescriptions = `抽到的牌：${card.nameCn}（${card.name}）- ${card.reversed ? "逆位" : "正位"}
牌意参考：${card.reversed ? card.meaningRev : card.meaningUp}
关键词：${card.keywords.join("、")}`;
  } else {
    cardDescriptions = request.cards
      .map(
        (card, i) =>
          `【${card.position ?? `第${i + 1}张`}】${card.nameCn}（${card.name}）- ${card.reversed ? "逆位" : "正位"}
  牌意参考：${card.reversed ? card.meaningRev : card.meaningUp}
  关键词：${card.keywords.join("、")}`,
      )
      .join("\n\n");
  }

  const questionPart = request.question ? `\n用户的问题：${request.question}\n` : "";

  return `你是一位温柔而有洞察力的专业塔罗牌师，有着丰富的心理咨询经验。请为用户进行一次${domainName}方面的塔罗牌解读。
${questionPart}
${cardDescriptions}

请按照以下要求进行解读：

1. **开场感知**（1-2句）：先感受一下牌阵整体传递的能量氛围
2. **牌意解析**：针对每张牌（${request.spreadType === "single" ? "今日这张牌" : "过去/现在/未来三张牌"}）进行详细、有温度的中文解读
3. **综合指引**（2-3句）：结合${domainName}领域，给出一段有针对性的综合建议
4. **一句话寄语**：最后给出一句优美、有力量的寄语

语气要求：温柔、有同理心、具体而不模板化、像朋友而非机器人。
总字数控制在300-500字之间。
请直接输出解读内容，不需要标题头。`;
}

export async function POST(request: NextRequest) {
  let body: ReadingRequest | null = null;

  try {
    body = (await request.json()) as ReadingRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request format" }, { status: 400 });
  }

  if (!body.cards || body.cards.length === 0) {
    return NextResponse.json({ error: "Missing card data" }, { status: 400 });
  }

  const apiKey = env.DEEPSEEK_API_KEY;
  const baseUrl = "https://api.deepseek.com";

  // 如果没有配置 API key，返回模拟数据
  if (!apiKey) {
    const mockReading = generateMockReading(body);
    return NextResponse.json({ reading: mockReading });
  }

  try {
    const prompt = buildPrompt(body);

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
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800,
        temperature: 0.85,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.text();
      console.warn("AI API error (falling back to mock):", errorData);
      // 降级到模拟数据
      const mockReading = generateMockReading(body);
      return NextResponse.json({ reading: mockReading });
    }

    const data = (await response.json()) as {
      choices: Array<{ message: { content: string } }>;
    };
    const reading = data.choices[0]?.message?.content ?? (body.lang === "en" ? "Unable to retrieve reading." : "无法获取解读");

    return NextResponse.json({ reading });
  } catch (error) {
    console.warn("Reading API error (falling back to mock):", error);
    const mockReading = generateMockReading(body);
    return NextResponse.json({ reading: mockReading });
  }
}

function generateMockReading(body: ReadingRequest): string {
  const lang = body.lang ?? "zh";
  const domainName = DOMAIN_NAMES[body.domain]?.[lang] ?? (lang === "en" ? "General Life" : "综合人生");
  const firstCard = body.cards[0]!;
  const isReversed = firstCard.reversed;
  const meaning = isReversed ? firstCard.meaningRev : firstCard.meaningUp;

  if (lang === "en") {
    const cardLabel = `${firstCard.name}${isReversed ? " (Reversed)" : ""}`;
    if (body.spreadType === "single") {
      return `The energy of today's card carries a ${isReversed ? "reflective, inward-looking" : "vibrant and possibility-filled"} quality...

✨ **${cardLabel}**

${firstCard.name} ${isReversed ? "reversed" : "upright"} invites you to look deeper. In the realm of ${domainName}, this card reminds you: ${isReversed ? "this may be a moment to pause and look inward — some things may need to be reconsidered and redirected" : "the universe is opening a door for you, and your focus and effort will soon bear beautiful fruit"}.

**Overall Guidance:** When it comes to ${domainName}, there's no need for anxiety. Trust the inner compass, move forward one step at a time. ${isReversed ? "Give yourself space and time — slowing down often brings greater clarity." : "Trust your judgment; this is a good moment to act."}

🌙 *May you find the light that is uniquely yours in every present moment.*`;
    } else {
      const [past, present, future] = body.cards;
      return `The spread speaks of a story unfolding in ${domainName}, with a deep inner connection between all three cards...

🌑 **Past — ${past!.name}${past!.reversed ? " (Reversed)" : ""}**
This card in the past position reflects experiences that have deeply shaped you. Whatever happened, it is the soil from which you've grown.

🌕 **Present — ${present!.name}${present!.reversed ? " (Reversed)" : ""}**
Right now, this card describes your current state of being. The stirrings you feel are the prelude to a turning point.

🌟 **Future — ${future!.name}${future!.reversed ? " (Reversed)" : ""}**
The future holds significant potential. This is not a fixed fate — it's the most likely direction when you align with the present energy.

**Overall Guidance:** You stand at an important crossroads in ${domainName}. The past gave you wisdom, the present calls for a choice, and the future will reflect your actions and intentions today. Trust yourself — you are stronger than you know.

🌙 *Every moment of uncertainty is a doorway to deeper wisdom.*`;
    }
  }

  // 中文 mock
  const cardName = firstCard.nameCn;
  if (body.spreadType === "single") {
    return `今天的牌阵透出一股${isReversed ? "需要反思与内省" : "充满活力与可能"}的气息...

✨ **${cardName}（${isReversed ? "逆位" : "正位"}）**

${cardName}在${isReversed ? "逆位" : "正位"}时，传递着"${meaning}"的讯息。在${domainName}方面，这张牌提醒你：${isReversed ? "此刻或许需要停下来审视自己内心真正的渴望，有些事情需要重新考量和调整方向" : "宇宙正在为你敞开一扇门，你的努力与专注将会在不久后显现出美好的结果"}。

关键词"${firstCard.keywords.slice(0, 2).join("与")}"是这段时期你需要特别关注的能量。

**综合指引：** 在${domainName}这件事上，不必过于焦虑，顺应内心的指引，一步一步前行。${isReversed ? "记得给自己一些空间和时间，慢下来往往能看得更清楚。" : "相信自己的判断，此刻正是行动的好时机。"}

🌙 *愿你在每一个当下，都能找到属于自己的光。*`;
  } else {
    const [past, present, future] = body.cards;
    return `牌阵的能量在诉说着一段关于${domainName}的故事，三张牌之间有着深刻的内在联系...

🌑 **过去 - ${past!.nameCn}（${past!.reversed ? "逆位" : "正位"}）**
过去的经历中，"${past!.reversed ? past!.meaningRev : past!.meaningUp}"的能量曾深深影响着你。这段过去塑造了今天的你，无论好坏，它都是你成长的土壤。

🌕 **现在 - ${present!.nameCn}（${present!.reversed ? "逆位" : "正位"}）**
此刻，"${present!.reversed ? present!.meaningRev : present!.meaningUp}"正是你所处的能量状态。你可能正在经历一些内心的挣扎或思考，而这正是转机来临前的前奏。

🌟 **未来 - ${future!.nameCn}（${future!.reversed ? "逆位" : "正位"}）**
未来的方向显示出"${future!.reversed ? future!.meaningRev : future!.meaningUp}"的潜力。这不是命中注定的结果，而是当你顺应当前能量时最可能发展的方向。

**综合指引：** 在${domainName}这件事上，你正处于一个重要的转折点。过去给了你经验，现在需要你做出选择，而未来的结果将取决于你今天的行动与态度。信任自己，你比你想象中更有力量。

🌙 *每一次迷茫，都是通向更深智慧的入口。*`;
  }
}
