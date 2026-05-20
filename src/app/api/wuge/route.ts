import { type NextRequest, NextResponse } from "next/server";
import { calculateWuge } from "~/app/wuge/wuge-engine";
import { getNumDetail } from "~/app/wuge/wuge-data";
import { env } from "~/env.js";

function buildWugePrompt(result: ReturnType<typeof calculateWuge>): string {
  return `你是一位精通中国传统命名学与五格剖象法的命理师，请根据以下姓名五格数理分析，用温和、专业、有温度的语言，为用户生成一份完整的姓名解读报告。

【基本信息】
- 姓名：${result.name}（${result.gender === "male" ? "男" : "女"}）
- 各字笔画：${result.chars.map((c, i) => `${c}(${result.strokes[i]}画)`).join("、")}

【五格数理】
- 天格：${result.tian.strokes}画（${result.tian.level} · ${result.tian.title}）
- 人格：${result.ren.strokes}画（${result.ren.level} · ${result.ren.title}）—— 主运，最重要
- 地格：${result.di.strokes}画（${result.di.level} · ${result.di.title}）
- 外格：${result.wai.strokes}画（${result.wai.level} · ${result.wai.title}）
- 总格：${result.zong.strokes}画（${result.zong.level} · ${result.zong.title}）

【三才配置】${result.sanCai}

【综合评分】${result.score}分（${result.scoreLevel}）

请生成以下四个方面的深度解读（每项100-150字，语气温和亲切，避免过于绝对的负面表述）：

1. **性格特征**：基于人格数理分析核心性格、优势与需要注意的方面
2. **事业财运**：结合人格、总格分析职业发展路径与财运走向
3. **感情婚姻**：基于地格、外格分析感情缘分与婚姻状况
4. **健康养生**：基于五格综合分析健康倾向与养生建议

最后给出一段"人生金句"（30字以内），作为对这个姓名的精华总结。

请以JSON格式返回：
{
  "personality": "性格特征解读",
  "career": "事业财运解读",
  "love": "感情婚姻解读",
  "health": "健康养生解读",
  "lifeQuote": "人生金句"
}`;
}

function generateMockReport(result: ReturnType<typeof calculateWuge>): {
  personality: string;
  career: string;
  love: string;
  health: string;
  lifeQuote: string;
} {
  const renDetail = getNumDetail(result.ren.strokes);
  const zongDetail = getNumDetail(result.zong.strokes);

  const isAuspicious = result.ren.level === "大吉" || result.ren.level === "吉";

  return {
    personality: `${result.name}的人格数理为${result.ren.strokes}画（${result.ren.title}），${renDetail.personality}此数理赋予您${isAuspicious ? "出色的领导力与亲和力" : "坚韧的意志与不屈的精神"}，在面对挑战时能${isAuspicious ? "从容调度，化危机为机遇" : "以坚忍之心渡过难关，在逆境中淬炼成长"}。您的性格中兼具${result.gender === "male" ? "男性的刚毅" : "女性的温柔"}与智慧的灵活，处世时能随机应变。`,

    career: `总格${result.zong.strokes}画（${result.zong.title}），${zongDetail.career}结合您的人格数理，${isAuspicious ? "事业运势明朗，中年后逐渐步入佳境，贵人相助，财运渐丰" : "事业需要脚踏实地，稳中求进，凭借持续努力，后期回报丰厚"}。建议您在职业选择上${isAuspicious ? "可适当进取，勇于承担更高职责" : "先打好基础，积累实力后再图谋拓展"}，财富积累宜以长远规划为主。`,

    love: `您的地格${result.di.strokes}画（${result.di.level}），${isAuspicious ? "感情运势总体良好，有缘分遇见合适的伴侣" : "感情路上可能有些波折，需要多一些耐心与包容"}。在感情中您重视真诚与信任，期待${result.gender === "male" ? "一段稳定踏实的关系" : "一段被理解与珍视的情感"}。建议多主动表达情感，不要过于含蓄。已婚者与伴侣多沟通理解，家庭将是您最温暖的港湾。`,

    health: `综合五格数理来看，您需要特别关注${result.ren.level === "凶" || result.ren.level === "大凶" ? "心理压力的疏导，避免长期紧绷导致身体透支" : "保持规律的作息和适量运动，在旺运期尤需注意劳逸结合"}。建议养成早睡早起的习惯，饮食均衡，减少辛辣刺激食物。适当的冥想或传统养生方式（如太极、八段锦）对您的体质大有裨益，保持积极乐观的心态是最好的养生之道。`,

    lifeQuote: `${result.name}：${result.ren.title}照命，${isAuspicious ? "德才兼备，笑纳人生百味" : "砥砺前行，逆境铸就真金"}。`,
  };
}

export async function POST(request: NextRequest) {
  let body: { name?: string; gender?: string };

  try {
    body = await request.json() as { name?: string; gender?: string };
  } catch {
    return NextResponse.json({ error: "请求格式错误" }, { status: 400 });
  }

  const { name, gender } = body;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "姓名至少需要2个汉字" }, { status: 400 });
  }

  if (gender !== "male" && gender !== "female") {
    return NextResponse.json({ error: "请选择性别" }, { status: 400 });
  }

  // 校验是否为汉字
  const nameClean = name.trim();
  if (!/^[\u4e00-\u9fff]+$/.test(nameClean)) {
    return NextResponse.json({ error: "请输入纯中文姓名" }, { status: 400 });
  }

  // 计算五格
  let wugeResult: ReturnType<typeof calculateWuge>;
  try {
    wugeResult = calculateWuge({ name: nameClean, gender: gender as "male" | "female" });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "计算失败";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  // 尝试调用AI API生成报告
  let aiReport: { personality: string; career: string; love: string; health: string; lifeQuote: string } | null = null;

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
              content: "你是一位精通中国传统命名学与五格剖象法的命理师，能够根据数理分析给出专业、温和、有温度的人生指导。",
            },
            {
              role: "user",
              content: buildWugePrompt(wugeResult),
            },
          ],
          temperature: 0.8,
          max_tokens: 1200,
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
              personality?: string; career?: string; love?: string; health?: string; lifeQuote?: string;
            };
            if (parsed?.personality && parsed?.career) {
              aiReport = parsed as { personality: string; career: string; love: string; health: string; lifeQuote: string };
            }
          } catch {
            // JSON解析失败，使用mock
          }
        }
      }
    } catch {
      // API调用失败（超时或网络错误），使用mock
    }
  }

  const report = aiReport ?? generateMockReport(wugeResult);

  // 构建最终返回数据
  return NextResponse.json({
    name: wugeResult.name,
    gender: wugeResult.gender,
    chars: wugeResult.chars,
    strokes: wugeResult.strokes,
    score: wugeResult.score,
    scoreLevel: wugeResult.scoreLevel,
    wuge: {
      tian:  { strokes: wugeResult.tian.strokes,  level: wugeResult.tian.level,  title: wugeResult.tian.title,  shortDesc: wugeResult.tian.shortDesc,  fullDesc: wugeResult.tian.fullDesc  },
      ren:   { strokes: wugeResult.ren.strokes,   level: wugeResult.ren.level,   title: wugeResult.ren.title,   shortDesc: wugeResult.ren.shortDesc,   fullDesc: wugeResult.ren.fullDesc   },
      di:    { strokes: wugeResult.di.strokes,    level: wugeResult.di.level,    title: wugeResult.di.title,    shortDesc: wugeResult.di.shortDesc,    fullDesc: wugeResult.di.fullDesc    },
      wai:   { strokes: wugeResult.wai.strokes,   level: wugeResult.wai.level,   title: wugeResult.wai.title,   shortDesc: wugeResult.wai.shortDesc,   fullDesc: wugeResult.wai.fullDesc   },
      zong:  { strokes: wugeResult.zong.strokes,  level: wugeResult.zong.level,  title: wugeResult.zong.title,  shortDesc: wugeResult.zong.shortDesc,  fullDesc: wugeResult.zong.fullDesc  },
    },
    sanCai: wugeResult.sanCai,
    sanCaiDesc: wugeResult.sanCaiDesc,
    specialTags: wugeResult.specialTags,
    analysis: {
      personality: report.personality,
      career:      report.career,
      love:        report.love,
      health:      report.health,
    },
    lifeQuote: report.lifeQuote,
  });
}
