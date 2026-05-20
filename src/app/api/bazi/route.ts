import { type NextRequest, NextResponse } from "next/server";
import { env } from "~/env.js";
import {
  calculateBazi,
  getDominantElement,
  getMissingElements,
  STEM_ELEMENT,
  BRANCH_ZODIAC,
  type BaziInput,
  type BaziResult,
} from "~/app/bazi/bazi-engine";
import {
  ELEMENT_PERSONALITY,
  DAY_STEM_READING,
  ZODIAC_2026_FORTUNE,
} from "~/app/bazi/bazi-data";

interface BaziRequest extends BaziInput {
  // 额外的分析请求
  focusAspect?: "career" | "wealth" | "love" | "health" | "overall";
}

function buildBaziPrompt(input: BaziRequest, baziResult: BaziResult): string {
  const { yearPillar, monthPillar, dayPillar, hourPillar, elementScores, zodiac, dayStem } = baziResult;
  const dominantElement = getDominantElement(elementScores);
  const missingElements = getMissingElements(elementScores);

  const pillarsDesc = [
    `年柱: ${yearPillar.stem}${yearPillar.branch}（纳音：${yearPillar.nayin}，${yearPillar.stemElement}${yearPillar.branchElement}）`,
    `月柱: ${monthPillar.stem}${monthPillar.branch}（纳音：${monthPillar.nayin}，${monthPillar.stemElement}${monthPillar.branchElement}）`,
    `日柱: ${dayPillar.stem}${dayPillar.branch}（纳音：${dayPillar.nayin}，日主${dayStem}属${STEM_ELEMENT[dayStem]}）`,
    hourPillar
      ? `时柱: ${hourPillar.stem}${hourPillar.branch}（纳音：${hourPillar.nayin}，${hourPillar.stemElement}${hourPillar.branchElement}）`
      : "时柱: 未知",
  ].join("\n");

  const elementDesc = Object.entries(elementScores)
    .map(([el, score]) => `${el}(${score.toFixed(1)}分)`)
    .join("、");

  const zodiacFortune = ZODIAC_2026_FORTUNE[zodiac];
  const focusText = input.focusAspect
    ? { career: "事业运势", wealth: "财运", love: "感情运势", health: "健康运势", overall: "综合命格" }[input.focusAspect]
    : "综合命格与流年运势";

  return `你是一位精通传统命理学的资深命理师，同时具备现代心理咨询的视野。请为以下八字进行专业的命理分析。

【基本信息】
出生时间：${input.year}年${input.month}月${input.day}日 ${input.hour >= 0 ? `${input.hour}时` : "（时辰未知）"}
性别：${input.gender === "male" ? "男" : "女"}
生肖：${zodiac}

【四柱八字】
${pillarsDesc}

【五行能量分布】
${elementDesc}
主导五行：${dominantElement}
${missingElements.length > 0 ? `缺失五行：${missingElements.join("、")}（喜用神方向）` : "五行较为均衡"}

【2026年流年信息】
2026年为丙午年（火马年）
与太岁关系：${baziResult.liuNianRelation}
生肖流年参考：${zodiacFortune ? `${zodiacFortune.taishiRelation}，综合运势${zodiacFortune.overall}星` : "平稳"}

请聚焦于【${focusText}】进行分析，内容包含：

1. **命格印象**（2-3句）：用现代语言描述这个八字呈现出的整体气质与天赋
2. **五行解析**：主导五行带来的性格优势，以及缺失五行可能带来的不足与弥补方向
3. **日主深析**：以日主天干（${dayStem}木/火/土/金/水属性）为核心，分析此人的核心个性与人生课题
4. **2026年流年运势**：结合丙午年的能量，分析今年的机遇与挑战（重点在事业、财运、感情之一）
5. **实用建议**（2-3条）：具体可操作的人生指引，而非泛泛而谈

语气要求：专业而温暖，有传统命理学的厚重感，又不失现代视角的理性。避免消极悲观，多从成长视角看待命理提示。
总字数350-500字，请直接输出报告内容，不需要标题头。`;
}

function generateMockBaziReport(input: BaziRequest, result: BaziResult): string {
  const { zodiac, dayStem, elementScores, liuNianRelation } = result;
  const dominantElement = getDominantElement(elementScores);
  const missingElements = getMissingElements(elementScores);
  const personality = ELEMENT_PERSONALITY[dominantElement];
  const dayStemReading = DAY_STEM_READING[dayStem];
  const zodiacFortune = ZODIAC_2026_FORTUNE[zodiac];

  const missingText = missingElements.length > 0
    ? `命中${missingElements.join("、")}偏弱，生活中适当多接触这些元素所代表的能量——${
        missingElements.includes("水") ? "多学习、思考，培养灵活性；" : ""
      }${missingElements.includes("木") ? "多接触自然、学习计划性；" : ""
      }${missingElements.includes("火") ? "多培养热情与表达能力；" : ""
      }${missingElements.includes("土") ? "加强脚踏实地的执行力；" : ""
      }${missingElements.includes("金") ? "培养果断决策与执行效率；" : ""}以补全能量结构。`
    : "命中五行较为均衡，各方面发展相对全面。";

  const liuNianText = zodiacFortune
    ? `\n**2026年流年运势**\n\n今年${liuNianRelation}，${zodiacFortune.summary}\n\n✦ **事业**：${zodiacFortune.careerDetail}\n\n✦ **财运**：${zodiacFortune.wealthDetail}\n\n✦ **感情**：${zodiacFortune.loveDetail}`
    : "";

  return `**命格印象**

${personality?.title ?? ""}——你的八字呈现出${dominantElement}行偏旺的特质，${personality?.traits.join("，") ?? ""}。这是一个具有鲜明个性色彩的命盘，内在能量充沛而有方向感。

**日主解析**

${dayStemReading?.title ?? ""}。${dayStemReading?.nature ?? ""}

在事业方面，${dayStemReading?.career ?? ""}

在感情方面，${dayStemReading?.relationship ?? ""}

**五行能量分析**

${missingText}

${liuNianText}

**实用建议**

✦ 顺应自身${dominantElement}行特质，发挥天赋优势，而非强行改变自己的本性。
✦ 有意识地弥补偏弱五行${missingElements.length > 0 ? `（${missingElements.join("、")}）` : ""}，使整体能量趋于平衡。
✦ 2026年${liuNianRelation}，宜${zodiacFortune && zodiacFortune.overall >= 4 ? "积极进取，把握机遇" : "谨慎保守，稳中求进"}。

🌸 *命运是起点，选择才是终点。八字揭示的是你的天赋剧本，而翻篇的笔始终在你手中。*`;
}

export async function POST(request: NextRequest) {
  let body: BaziRequest | null = null;

  try {
    body = (await request.json()) as BaziRequest;
  } catch {
    return NextResponse.json({ error: "请求格式错误" }, { status: 400 });
  }

  if (!body.year || !body.month || !body.day || !body.gender) {
    return NextResponse.json({ error: "缺少必要的出生信息" }, { status: 400 });
  }

  // 计算八字排盘
  let baziResult: BaziResult;
  try {
    baziResult = calculateBazi(body);
  } catch (err) {
    console.error("Bazi calculation error:", err);
    return NextResponse.json({ error: "排盘计算失败" }, { status: 500 });
  }

  const apiKey = env.DEEPSEEK_API_KEY;
  const baseUrl = "https://api.deepseek.com";

  // 如果没有配置 API key，返回模拟数据
  if (!apiKey) {
    const mockReport = generateMockBaziReport(body, baziResult);
    return NextResponse.json({ report: mockReport, baziResult });
  }

  try {
    const prompt = buildBaziPrompt(body, baziResult);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20秒超时

    const response = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-v4-flash",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
        temperature: 0.8,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("AI API error:", errorData);
      const mockReport = generateMockBaziReport(body, baziResult);
      return NextResponse.json({ report: mockReport, baziResult });
    }

    const data = (await response.json()) as {
      choices: Array<{ message: { content: string } }>;
    };
    const report = data.choices[0]?.message?.content ?? "无法获取解读";

    return NextResponse.json({ report, baziResult });
  } catch (error) {
    console.error("Bazi API error:", error);
    const mockReport = generateMockBaziReport(body, baziResult);
    return NextResponse.json({ report: mockReport, baziResult });
  }
}
