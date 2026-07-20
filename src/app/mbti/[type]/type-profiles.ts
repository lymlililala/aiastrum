// ===== /mbti/[type] 每类型落地页内容库（三语 zh / tw / en） =====
//
// 复用 mbti-data.ts 的 MBTI_TYPES / 类型主色 / 配对方向 / 职业关键词，
// 本文件补充落地页所需的完整内容：昵称、核心特质、恋爱模式、最佳配对、
// 职业方向与每类型 FAQ。tw 为 zh 的繁体版本（仅用语本地化，不重新撰写）。

import { MBTI_TYPES, type MBTIType } from "../mbti-data";

export interface TypeProfileLocale {
  nickname: string;                             // 类型昵称（物流师 / The Logistician）
  metaDesc: string;                             // SEO description
  traits: string[];                             // 核心特质（4 条）
  love: string;                                 // 恋爱模式段落
  matches: { type: MBTIType; why: string }[];   // 最佳配对（3 个，含一句理由）
  careers: string;                              // 职业方向（一行）
  faq: { q: string; a: string }[];              // 3 条 FAQ
}

export interface TypeProfile {
  color: string; // 与 mbti-data colorMap 一致的类型主色
  zh: TypeProfileLocale;
  tw: TypeProfileLocale;
  en: TypeProfileLocale;
}

/** 全部合法 slug（小写） */
export const TYPE_SLUGS = MBTI_TYPES.map((t) => t.toLowerCase());

/** slug（大小写不敏感）→ MBTIType，非法返回 null */
export function typeFromSlug(slug: string): MBTIType | null {
  const up = slug.toUpperCase();
  return (MBTI_TYPES as readonly string[]).includes(up) ? (up as MBTIType) : null;
}

/** 已发布恋爱深度文章的类型 → 文章路径 */
export const LOVE_ARTICLES: Partial<Record<MBTIType, string>> = {
  ISTJ: "/blog/mbti-istj-love-patterns-analysis",
  INFP: "/blog/mbti-infp-love-patterns-analysis",
  ENFP: "/blog/mbti-enfp-love-patterns-analysis",
  ESTP: "/blog/mbti-estp-love-patterns-analysis",
  ISFJ: "/blog/mbti-isfj-love-patterns-analysis",
};

export const TYPE_PROFILES: Record<MBTIType, TypeProfile> = {
  INTJ: {
    color: "#6C7BFF",
    zh: {
      nickname: "建筑师",
      metaDesc: "INTJ 建筑师人格全解析：核心特质、恋爱模式与爱情语言、最佳配对（ENFP/ENTP/INFJ）与适合的职业方向。",
      traits: [
        "战略思维，凡事都备着 B 计划和 C 计划",
        "独立到近乎孤傲，不屑无效社交",
        "高标准严要求，对己对人一视同仁",
        "表面冷淡，内心世界精确而克制",
      ],
      love: "INTJ 谈恋爱像做项目：先评估匹配度，再决定是否投入。他们对「感觉」存疑，更相信长期兼容性。爱上之后极其忠诚，会把你写进人生五年规划，但表达方式像发邮件——准确、简洁、不煽情。爱情语言是「解决问题」和「规划未来」：你生活里的麻烦，他会默默排进日程一一处理。他们需要一个既聪明到能平等对话、又独立到不粘人的伴侣。被 INTJ 选中，本身就是一种高级认可。",
      matches: [
        { type: "ENFP", why: "热情与可能性，点燃 INTJ 的理性世界" },
        { type: "ENTP", why: "智识对等的辩论，是最好的调情" },
        { type: "INFJ", why: "两个直觉型深度共鸣，精神层面同频" },
      ],
      careers: "战略规划 · 架构设计 · 研究 · 投资分析",
      faq: [
        {
          q: "INTJ 的 soulmate 是哪个类型？",
          a: "经典答案是 ENFP 和 ENTP：他们的热情与即兴能打开 INTJ 的理性世界，而 INTJ 回馈以深度与方向感，互补性极强。",
        },
        {
          q: "INTJ 的爱情语言（love language）是什么？",
          a: "解决问题和规划未来。INTJ 很少说情话，但会默默处理好你生活里的麻烦，并把你写进他的长期计划。",
        },
        {
          q: "INTJ 是怎么爱上一个人的？",
          a: "缓慢而审慎：先观察、分析匹配度，「数据」通过后才允许自己动心——可一旦认定，就几乎不会动摇。",
        },
      ],
    },
    tw: {
      nickname: "建築師",
      metaDesc: "INTJ 建築師人格全解析：核心特質、戀愛模式與愛情語言、最佳配對（ENFP/ENTP/INFJ）與適合的職業方向。",
      traits: [
        "戰略思維，凡事都備著 B 計畫和 C 計畫",
        "獨立到近乎孤傲，不屑無效社交",
        "高標準嚴要求，對己對人一視同仁",
        "表面冷淡，內心世界精確而克制",
      ],
      love: "INTJ 談戀愛像做專案：先評估匹配度，再決定是否投入。他們對「感覺」存疑，更相信長期相容性。愛上之後極其忠誠，會把你寫進人生五年規畫，但表達方式像發郵件——準確、簡潔、不煽情。愛情語言是「解決問題」和「規畫未來」：你生活裡的麻煩，他會默默排進日程一一處理。他們需要一個既聰明到能平等對話、又獨立到不黏人的伴侶。被 INTJ 選中，本身就是一種高級認可。",
      matches: [
        { type: "ENFP", why: "熱情與可能性，點燃 INTJ 的理性世界" },
        { type: "ENTP", why: "智識對等的辯論，是最好的調情" },
        { type: "INFJ", why: "兩個直覺型深度共鳴，精神層面同頻" },
      ],
      careers: "戰略規劃 · 架構設計 · 研究 · 投資分析",
      faq: [
        {
          q: "INTJ 的 soulmate 是哪個類型？",
          a: "經典答案是 ENFP 和 ENTP：他們的熱情與即興能打開 INTJ 的理性世界，而 INTJ 回饋以深度與方向感，互補性極強。",
        },
        {
          q: "INTJ 的愛情語言（love language）是什麼？",
          a: "解決問題和規畫未來。INTJ 很少說情話，但會默默處理好你生活裡的麻煩，並把你寫進他的長期計畫。",
        },
        {
          q: "INTJ 是怎麼愛上一個人的？",
          a: "緩慢而審慎：先觀察、分析匹配度，「數據」通過後才允許自己動心——可一旦認定，就幾乎不會動搖。",
        },
      ],
    },
    en: {
      nickname: "The Architect",
      metaDesc: "INTJ (The Architect) personality decoded: core traits, love style and love language, best matches (ENFP, ENTP, INFJ), and the careers that fit them best.",
      traits: [
        "Strategic mind with a plan B and C for everything",
        "Fiercely independent; allergic to pointless socializing",
        "Equally high standards for themselves and everyone else",
        "Cool exterior over a precise, controlled inner world",
      ],
      love: "An INTJ dates like running a project: assess compatibility first, then decide whether to invest. Skeptical of \"feelings,\" they trust long-term fit. Once in love they are intensely loyal and will write you into their five-year plan — but affection arrives like a well-written email: precise, concise, unsentimental. Their love language is solving your problems and building a future with you. They need a partner smart enough to spar with and independent enough not to cling. Being chosen by an INTJ is itself a high compliment.",
      matches: [
        { type: "ENFP", why: "Their warmth and possibility light up the INTJ's rational world" },
        { type: "ENTP", why: "Intellectually equal debate is the best foreplay" },
        { type: "INFJ", why: "Two intuitives resonating on the same deep frequency" },
      ],
      careers: "Strategy · Systems Architecture · Research · Investment Analysis",
      faq: [
        {
          q: "Who is INTJ's soulmate?",
          a: "ENFP and ENTP are the classic matches: their warmth and spontaneity open up the INTJ's structured world, while the INTJ gives them depth and direction in return.",
        },
        {
          q: "What is INTJ's love language?",
          a: "Problem-solving and future-planning. INTJs rarely say sweet things, but they fix what's broken in your life and quietly write you into their long-term plans.",
        },
        {
          q: "How does an INTJ fall in love?",
          a: "Slowly and deliberately. They observe, analyze compatibility, and only allow themselves to fall once the data says yes — but once committed, they rarely waver.",
        },
      ],
    },
  },

  INTP: {
    color: "#4A9ECA",
    zh: {
      nickname: "逻辑学家",
      metaDesc: "INTP 逻辑学家人格全解析：核心特质、恋爱模式与爱情语言、最佳配对（ENTJ/ENFJ/ENTP）与适合的职业方向。",
      traits: [
        "思维系统精密，沉迷理论与模型",
        "好奇心驱动，对「为什么」上瘾",
        "社交低电量，独处才是充电",
        "想法一箩筐，执行常常断档",
      ],
      love: "INTP 的爱发生在脑子里：先是好奇，再是分析，最后才后知后觉地发现自己陷进去了。他们不擅长读气氛，却会用自己独特的方式认真——记住你随口说过的冷知识、为你的问题研究到深夜。爱情语言是「智识分享」：把脑内最有趣的想法第一个讲给你听，就是 INTP 的告白。他们需要一个给足空间、又能接住跳跃话题的伴侣。对 INTP 来说，把宝贵的独处时间花在你身上，就是最重的承诺。",
      matches: [
        { type: "ENTJ", why: "提供方向与执行力，把 INTP 的点子落地" },
        { type: "ENFJ", why: "用温暖引导 INTP 走出脑内宇宙" },
        { type: "ENTP", why: "同频的思维火花，聊到天亮也不腻" },
      ],
      careers: "理论研究 · 技术突破 · 数据分析 · 哲学",
      faq: [
        {
          q: "INTP 的 soulmate 是哪个类型？",
          a: "ENTJ 和 ENFJ 最常被提名：ENTJ 把 INTP 的点子落地，ENFJ 温柔地把他拉出脑内宇宙，都能平衡 INTP 的内倾。",
        },
        {
          q: "INTP 的爱情语言（love language）是什么？",
          a: "智识分享。把最有趣的想法第一个讲给你听、记住你随口说的冷知识、熬夜研究你的问题——这就是 INTP 的「我爱你」。",
        },
        {
          q: "怎么判断 INTP 喜欢你？",
          a: "他会为你破例：主动开启话题、分享稀奇古怪的发现、甚至愿意出门见面。对 INTP 来说，把宝贵的独处时间花在你身上就是告白。",
        },
      ],
    },
    tw: {
      nickname: "邏輯學家",
      metaDesc: "INTP 邏輯學家人格全解析：核心特質、戀愛模式與愛情語言、最佳配對（ENTJ/ENFJ/ENTP）與適合的職業方向。",
      traits: [
        "思維系統精密，沉迷理論與模型",
        "好奇心驅動，對「為什麼」上癮",
        "社交低電量，獨處才是充電",
        "想法一籮筐，執行常常斷檔",
      ],
      love: "INTP 的愛發生在腦子裡：先是好奇，再是分析，最後才後知後覺地發現自己陷進去了。他們不擅長讀氣氛，卻會用自己獨特的方式認真——記住你隨口說過的冷知識、為你的問題研究到深夜。愛情語言是「智識分享」：把腦內最有趣的想法第一個講給你聽，就是 INTP 的告白。他們需要一個給足空間、又能接住跳躍話題的伴侶。對 INTP 來說，把寶貴的獨處時間花在你身上，就是最重的承諾。",
      matches: [
        { type: "ENTJ", why: "提供方向與執行力，把 INTP 的點子落地" },
        { type: "ENFJ", why: "用溫暖引導 INTP 走出腦內宇宙" },
        { type: "ENTP", why: "同頻的思維火花，聊到天亮也不膩" },
      ],
      careers: "理論研究 · 技術突破 · 數據分析 · 哲學",
      faq: [
        {
          q: "INTP 的 soulmate 是哪個類型？",
          a: "ENTJ 和 ENFJ 最常被提名：ENTJ 把 INTP 的點子落地，ENFJ 溫柔地把他拉出腦內宇宙，都能平衡 INTP 的內傾。",
        },
        {
          q: "INTP 的愛情語言（love language）是什麼？",
          a: "智識分享。把最有趣的想法第一個講給你聽、記住你隨口說的冷知識、熬夜研究你的問題——這就是 INTP 的「我愛你」。",
        },
        {
          q: "怎麼判斷 INTP 喜歡你？",
          a: "他會為你破例：主動開啟話題、分享稀奇古怪的發現、甚至願意出門見面。對 INTP 來說，把寶貴的獨處時間花在你身上就是告白。",
        },
      ],
    },
    en: {
      nickname: "The Logician",
      metaDesc: "INTP (The Logician) personality decoded: core traits, love style and love language, best matches (ENTJ, ENFJ, ENTP), and the careers that fit them best.",
      traits: [
        "A precision-built mind obsessed with theories and models",
        "Driven by curiosity — addicted to asking why",
        "Social battery runs low; solitude is how they recharge",
        "Overflowing with ideas, chronically short on follow-through",
      ],
      love: "For an INTP, love happens in the head first: curiosity, then analysis, then the belated realization that they've already fallen. They can't read a room, yet they care in their own meticulous way — remembering the obscure fact you mentioned once, researching your problem at 2am. Their love language is intellectual sharing: telling you their most interesting thought first is the INTP confession. They need a partner who gives them space and can follow conversational leaps from physics to philosophy. Spending their precious alone-time on you is their heaviest commitment.",
      matches: [
        { type: "ENTJ", why: "Supplies direction and execution to land the INTP's ideas" },
        { type: "ENFJ", why: "Warmly guides the INTP out of their inner universe" },
        { type: "ENTP", why: "Same-wavelength sparks — conversations that last till dawn" },
      ],
      careers: "Theoretical Research · Tech Breakthroughs · Data Analysis · Philosophy",
      faq: [
        {
          q: "Who is INTP's soulmate?",
          a: "ENTJ and ENFJ top the list: ENTJs turn INTP ideas into reality, while ENFJs gently pull them out of their inner world — both balance the INTP's inward drift.",
        },
        {
          q: "What is INTP's love language?",
          a: "Intellectual sharing. An INTP who sends you their most interesting thoughts first, remembers your random trivia, and researches your questions is saying \"I love you.\"",
        },
        {
          q: "How can you tell an INTP likes you?",
          a: "They break their own rules for you: initiating chats, sharing obscure finds, actually showing up in person. For an INTP, spending alone-time on you is a confession.",
        },
      ],
    },
  },

  ENTJ: {
    color: "#FF6B35",
    zh: {
      nickname: "指挥官",
      metaDesc: "ENTJ 指挥官人格全解析：核心特质、恋爱模式与爱情语言、最佳配对（INTP/INFP/INTJ）与适合的职业方向。",
      traits: [
        "天生领导者，目标感拉满",
        "决策快狠准，讨厌拖泥带水",
        "把效率当信仰，连休息都要优化",
        "气场强大，习惯掌控全局",
      ],
      love: "ENTJ 喜欢一个人会直接出手——追求过程像一场精心策划的战役。他们慕强，只会被同样优秀、有自己事业和想法的人吸引。恋爱中的 ENTJ 是「人生合伙人」模式：帮你规划职业、解决难题、带你升级。爱情语言是「投入时间与资源」：对时间极度吝啬的他们，愿意为你空出行程就是最大的浪漫。短板是不擅长安慰情绪，容易把「我在帮你解决问题」当成爱的全部。",
      matches: [
        { type: "INTP", why: "冷静的深度思考者，是 ENTJ 的最佳军师" },
        { type: "INFP", why: "用温柔与价值观，软化 ENTJ 的锋芒" },
        { type: "INTJ", why: "双强联手，目标一致效率翻倍" },
      ],
      careers: "企业管理 · 创业 · 投行 · 领导力岗位",
      faq: [
        {
          q: "ENTJ 的 soulmate 是哪个类型？",
          a: "INTP 是经典答案——冷静的军师与 ENTJ 的冲劲完美互补；INFP 也很合适，用真诚和价值观软化指挥官。",
        },
        {
          q: "ENTJ 的爱情语言（love language）是什么？",
          a: "投入时间与资源。ENTJ 对日程极度吝啬，为你空出晚上、规划共同未来、替你解决问题，就是他们的浪漫。",
        },
        {
          q: "和 ENTJ 恋爱需要什么？",
          a: "拥有自己的事业和想法，沟通直接不绕弯。用实力赢得他们的欣赏，别玩猜心游戏，偶尔也让他们做主。",
        },
      ],
    },
    tw: {
      nickname: "指揮官",
      metaDesc: "ENTJ 指揮官人格全解析：核心特質、戀愛模式與愛情語言、最佳配對（INTP/INFP/INTJ）與適合的職業方向。",
      traits: [
        "天生領導者，目標感拉滿",
        "決策快狠準，討厭拖泥帶水",
        "把效率當信仰，連休息都要優化",
        "氣場強大，習慣掌控全局",
      ],
      love: "ENTJ 喜歡一個人會直接出手——追求過程像一場精心策劃的戰役。他們慕強，只會被同樣優秀、有自己事業和想法的人吸引。戀愛中的 ENTJ 是「人生合夥人」模式：幫你規畫職涯、解決難題、帶你升級。愛情語言是「投入時間與資源」：對時間極度吝嗇的他們，願意為你空出行程就是最大的浪漫。短板是不擅長安慰情緒，容易把「我在幫你解決問題」當成愛的全部。",
      matches: [
        { type: "INTP", why: "冷靜的深度思考者，是 ENTJ 的最佳軍師" },
        { type: "INFP", why: "用溫柔與價值觀，軟化 ENTJ 的鋒芒" },
        { type: "INTJ", why: "雙強聯手，目標一致效率翻倍" },
      ],
      careers: "企業管理 · 創業 · 投行 · 領導力職位",
      faq: [
        {
          q: "ENTJ 的 soulmate 是哪個類型？",
          a: "INTP 是經典答案——冷靜的軍師與 ENTJ 的衝勁完美互補；INFP 也很合適，用真誠和價值觀軟化指揮官。",
        },
        {
          q: "ENTJ 的愛情語言（love language）是什麼？",
          a: "投入時間與資源。ENTJ 對日程極度吝嗇，為你空出晚上、規畫共同未來、替你解決問題，就是他們的浪漫。",
        },
        {
          q: "和 ENTJ 戀愛需要什麼？",
          a: "擁有自己的事業和想法，溝通直接不繞彎。用實力贏得他們的欣賞，別玩猜心遊戲，偶爾也讓他們做主。",
        },
      ],
    },
    en: {
      nickname: "The Commander",
      metaDesc: "ENTJ (The Commander) personality decoded: core traits, love style and love language, best matches (INTP, INFP, INTJ), and the careers that fit them best.",
      traits: [
        "A born leader with laser-focused goals",
        "Fast, decisive, and allergic to dithering",
        "Treats efficiency as a religion — even rest gets optimized",
        "Commanding presence, used to running the show",
      ],
      love: "When an ENTJ likes someone, they make a move — courtship is a well-planned campaign. Attracted to strength, they only fall for people with their own ambitions and opinions. In love, an ENTJ is a life-partner-in-chief: planning your career, solving your problems, upgrading your world. Their love language is investing time and resources — for people this stingy with their hours, clearing a schedule for you is peak romance. Their blind spot is comforting emotions; they confuse \"fixing it\" with love itself.",
      matches: [
        { type: "INTP", why: "A cool, deep thinker — the ENTJ's perfect strategist" },
        { type: "INFP", why: "Softens the ENTJ's edges with gentleness and values" },
        { type: "INTJ", why: "Two powerhouses aligned — double the efficiency" },
      ],
      careers: "Management · Entrepreneurship · Investment Banking · Leadership Roles",
      faq: [
        {
          q: "Who is ENTJ's soulmate?",
          a: "INTP is the classic match — a calm strategist who complements the ENTJ's drive. INFP also works, softening the commander with sincerity and values.",
        },
        {
          q: "What is ENTJ's love language?",
          a: "Investing time and resources. ENTJs guard their schedule fiercely, so cleared evenings, planned futures and problems solved on your behalf are their romance.",
        },
        {
          q: "What does an ENTJ need in a relationship?",
          a: "A partner with their own ambitions who communicates directly. Impress them with competence, skip the mind games, and let them lead — sometimes.",
        },
      ],
    },
  },

  ENTP: {
    color: "#FFA500",
    zh: {
      nickname: "辩论家",
      metaDesc: "ENTP 辩论家人格全解析：核心特质、恋爱模式与爱情语言、最佳配对（INTJ/INFJ/ENFP）与适合的职业方向。",
      traits: [
        "点子喷泉，脑内永远在开头脑风暴",
        "以辩论为乐，观点越怼越兴奋",
        "讨厌重复与琐碎，执行力看心情",
        "幽默机智，人群中的气氛发动机",
      ],
      love: "ENTP 的恋爱从一场好玩的对话开始——能接住他们的梗、敢跟他们抬杠的人，最容易让他们上头。热恋期创意满分、惊喜不断；难的是保鲜期过后，新鲜感消退容易让他们分心。爱情语言是「智识调情」：辩论、斗嘴、一起脑暴未来。成熟的 ENTP 会学会把激情沉淀为承诺。他们需要一个既聪明好玩、又能在他们飘走时轻轻拽回来的伴侣——对 ENTP 来说，无聊才是感情最大的敌人。",
      matches: [
        { type: "INTJ", why: "给混乱的灵感提供结构与深度" },
        { type: "INFJ", why: "一眼看穿 ENTP 的伪装，直抵内心" },
        { type: "ENFP", why: "双重创意 buff，生活永远不缺新玩法" },
      ],
      careers: "创业 · 产品 · 咨询顾问 · 营销创意",
      faq: [
        {
          q: "ENTP 的 soulmate 是哪个类型？",
          a: "INFJ 和 INTJ 是经典配对：两者的深度能锚定 ENTP 散乱的才华，而且都能在智力上压住他们——ENTP 嘴上不说，其实很吃这一套。",
        },
        {
          q: "ENTP 的爱情语言（love language）是什么？",
          a: "斗嘴与辩论。调侃、抬杠、一起脑暴未来，就是 ENTP 的调情方式——能当他们的「陪练」，就走进了他们的心。",
        },
        {
          q: "ENTP 怎么才能长久？",
          a: "让日子保持智力上的新鲜感。共同的新项目、有质量的对话，比例行公事的陪伴更重要——对 ENTP 来说，无聊比争吵更致命。",
        },
      ],
    },
    tw: {
      nickname: "辯論家",
      metaDesc: "ENTP 辯論家人格全解析：核心特質、戀愛模式與愛情語言、最佳配對（INTJ/INFJ/ENFP）與適合的職業方向。",
      traits: [
        "點子噴泉，腦內永遠在開腦力激盪",
        "以辯論為樂，觀點越懟越興奮",
        "討厭重複與瑣碎，執行力看心情",
        "幽默機智，人群中的氣氛發動機",
      ],
      love: "ENTP 的戀愛從一場好玩的對話開始——能接住他們的梗、敢跟他們抬槓的人，最容易讓他們上頭。熱戀期創意滿分、驚喜不斷；難的是保鮮期過後，新鮮感消退容易讓他們分心。愛情語言是「智識調情」：辯論、鬥嘴、一起腦暴未來。成熟的 ENTP 會學會把激情沉澱為承諾。他們需要一個既聰明好玩、又能在他們飄走時輕輕拽回來的伴侶——對 ENTP 來說，無聊才是感情最大的敵人。",
      matches: [
        { type: "INTJ", why: "給混亂的靈感提供結構與深度" },
        { type: "INFJ", why: "一眼看穿 ENTP 的偽裝，直抵內心" },
        { type: "ENFP", why: "雙重創意 buff，生活永遠不缺新玩法" },
      ],
      careers: "創業 · 產品 · 顧問諮詢 · 行銷創意",
      faq: [
        {
          q: "ENTP 的 soulmate 是哪個類型？",
          a: "INFJ 和 INTJ 是經典配對：兩者的深度能錨定 ENTP 散亂的才華，而且都能在智力上壓住他們——ENTP 嘴上不說，其實很吃這一套。",
        },
        {
          q: "ENTP 的愛情語言（love language）是什麼？",
          a: "鬥嘴與辯論。調侃、抬槓、一起腦暴未來，就是 ENTP 的調情方式——能當他們的「陪練」，就走進了他們的心。",
        },
        {
          q: "ENTP 怎麼才能長久？",
          a: "讓日子保持智力上的新鮮感。共同的新專案、有品質的對話，比例行公事的陪伴更重要——對 ENTP 來說，無聊比爭吵更致命。",
        },
      ],
    },
    en: {
      nickname: "The Debater",
      metaDesc: "ENTP (The Debater) personality decoded: core traits, love style and love language, best matches (INTJ, INFJ, ENFP), and the careers that fit them best.",
      traits: [
        "An idea fountain — the brainstorming never stops",
        "Debates for sport; the harder you push back, the better",
        "Bored by routine and details; execution depends on mood",
        "Witty and quick — the group's chaos engine",
      ],
      love: "An ENTP's romance starts with a great conversation — whoever catches their jokes and dares to argue back wins their heart. The honeymoon phase is creative fireworks; the challenge is what comes after, when novelty fades and attention wanders. Their love language is intellectual flirtation: debates, banter, brainstorming the future together. A mature ENTP learns to turn spark into commitment. They need a partner who is clever and playful, yet can gently reel them back when they drift — for an ENTP, boredom is the real enemy.",
      matches: [
        { type: "INTJ", why: "Gives structure and depth to their chaotic inspiration" },
        { type: "INFJ", why: "Sees straight through the ENTP's act to the real person" },
        { type: "ENFP", why: "Double creativity buff — life never runs out of new games" },
      ],
      careers: "Startups · Product · Consulting · Creative Marketing",
      faq: [
        {
          q: "Who is ENTP's soulmate?",
          a: "INFJ and INTJ are the classic pairings: both offer the depth that anchors the ENTP's scattered brilliance, and both can out-think them — which ENTPs secretly love.",
        },
        {
          q: "What is ENTP's love language?",
          a: "Banter and debate. Teasing, arguing ideas and brainstorming futures together is how an ENTP flirts — a sparring partner is a love interest.",
        },
        {
          q: "How does an ENTP stay committed?",
          a: "Keep life mentally stimulating. Novelty, shared projects and real conversation matter more to an ENTP than routine reassurance — boredom, not conflict, is the real threat.",
        },
      ],
    },
  },

  INFJ: {
    color: "#9B59B6",
    zh: {
      nickname: "提倡者",
      metaDesc: "INFJ 提倡者人格全解析：核心特质、恋爱模式与爱情语言、最佳配对（ENTP/ENFP/INTJ）与适合的职业方向。",
      traits: [
        "直觉惊人，一眼看穿人心",
        "理想主义，怀揣改变世界的执念",
        "外温内冷，熟人也难走进最深处",
        "共情过载，需要独处回血",
      ],
      love: "INFJ 慢热到近乎谨慎：他们要确认灵魂层面的契合，才敢交付真心。一旦认定，就是奔着一辈子去的——深情、专注、洞察力惊人，能听见你没说出口的话。爱情语言是「深度共鸣」：长谈、理解、精神支持。INFJ 的雷区是被误解和被敷衍；攒够失望后，他们会发动著名的 door slam，悄无声息地把人移出人生。他们需要一个真诚、有耐心、尊重其精神世界的伴侣。",
      matches: [
        { type: "ENTP", why: "用幽默与好奇，撬开 INFJ 的壳" },
        { type: "ENFP", why: "热情的理想主义者，价值观天然同频" },
        { type: "INTJ", why: "深度与忠诚兼具，安静而坚定的同行者" },
      ],
      careers: "心理咨询 · 教育 · 写作 · 公益",
      faq: [
        {
          q: "INFJ 的 soulmate 是哪个类型？",
          a: "ENTP 和 ENFP 是经典答案：他们的开放与好奇能把 INFJ 引出壳，而 INFJ 回馈以稀缺的深度与忠诚。",
        },
        {
          q: "INFJ 的爱情语言（love language）是什么？",
          a: "深度对话与理解。INFJ 表达爱的方式是真正听懂你——他们也需要一个能听懂自己未说出口情绪的伴侣。",
        },
        {
          q: "什么是 INFJ 的 door slam？",
          a: "在累积了太多失望之后，INFJ 会悄无声息地把一个人移出自己的人生——情感上彻底、通常不可逆。这是自我保护，不是报复。",
        },
      ],
    },
    tw: {
      nickname: "提倡者",
      metaDesc: "INFJ 提倡者人格全解析：核心特質、戀愛模式與愛情語言、最佳配對（ENTP/ENFP/INTJ）與適合的職業方向。",
      traits: [
        "直覺驚人，一眼看穿人心",
        "理想主義，懷揣改變世界的執念",
        "外溫內冷，熟人也難走進最深處",
        "共情過載，需要獨處回血",
      ],
      love: "INFJ 慢熱到近乎謹慎：他們要確認靈魂層面的契合，才敢交付真心。一旦認定，就是奔著一輩子去的——深情、專注、洞察力驚人，能聽見你沒說出口的話。愛情語言是「深度共鳴」：長談、理解、精神支持。INFJ 的雷區是被誤解和被敷衍；攢夠失望後，他們會發動著名的 door slam，悄無聲息地把人移出人生。他們需要一個真誠、有耐心、尊重其精神世界的伴侶。",
      matches: [
        { type: "ENTP", why: "用幽默與好奇，撬開 INFJ 的殼" },
        { type: "ENFP", why: "熱情的理想主義者，價值觀天然同頻" },
        { type: "INTJ", why: "深度與忠誠兼具，安靜而堅定的同行者" },
      ],
      careers: "心理諮商 · 教育 · 寫作 · 公益",
      faq: [
        {
          q: "INFJ 的 soulmate 是哪個類型？",
          a: "ENTP 和 ENFP 是經典答案：他們的開放與好奇能把 INFJ 引出殼，而 INFJ 回饋以稀缺的深度與忠誠。",
        },
        {
          q: "INFJ 的愛情語言（love language）是什麼？",
          a: "深度對話與理解。INFJ 表達愛的方式是真正聽懂你——他們也需要一個能聽懂自己未說出口情緒的伴侶。",
        },
        {
          q: "什麼是 INFJ 的 door slam？",
          a: "在累積了太多失望之後，INFJ 會悄無聲息地把一個人移出自己的人生——情感上徹底、通常不可逆。這是自我保護，不是報復。",
        },
      ],
    },
    en: {
      nickname: "The Advocate",
      metaDesc: "INFJ (The Advocate) personality decoded: core traits, love style and love language, best matches (ENTP, ENFP, INTJ), and the careers that fit them best.",
      traits: [
        "Startling intuition — reads people at a glance",
        "An idealist quietly set on changing the world",
        "Warm outside, guarded inside; few reach the core",
        "Absorbs everyone's emotions, then needs solitude to recover",
      ],
      love: "INFJs warm up slowly and carefully: they need to sense a soul-level fit before handing over their heart. Once they commit, it's for life — devoted, focused, uncannily perceptive, hearing the words you never said. Their love language is deep resonance: long talks, understanding, quiet emotional support. Their red lines are being misunderstood and being brushed off; collect enough disappointment and they deploy the infamous door slam, silently removing someone from their life. They need a partner who is sincere, patient, and respectful of their inner world.",
      matches: [
        { type: "ENTP", why: "Pries open the INFJ's shell with humor and curiosity" },
        { type: "ENFP", why: "A fellow warm idealist — values naturally aligned" },
        { type: "INTJ", why: "Depth plus loyalty: a quiet, steadfast companion" },
      ],
      careers: "Counseling · Education · Writing · Nonprofit Work",
      faq: [
        {
          q: "Who is INFJ's soulmate?",
          a: "ENTP and ENFP are the classic matches: their openness and curiosity coax the INFJ out of their shell, while the INFJ offers them rare depth and loyalty.",
        },
        {
          q: "What is INFJ's love language?",
          a: "Deep conversation and understanding. INFJs show love by truly hearing you — and they need a partner who can hear their unspoken feelings in return.",
        },
        {
          q: "What is the INFJ door slam?",
          a: "After too much hurt or disappointment, an INFJ quietly cuts someone out of their life — emotionally, completely, and usually permanently. It's self-protection, not cruelty.",
        },
      ],
    },
  },

  INFP: {
    color: "#5B8DD9",
    zh: {
      nickname: "调停者",
      metaDesc: "INFP 调停者人格全解析：核心特质、如何陷入爱情、最佳配对（ENFJ/ENTJ/INFJ）与适合的职业方向。",
      traits: [
        "内心戏宇宙，情感细腻到毫克级",
        "理想主义卫士，价值观不容妥协",
        "温柔共情，天生的治愈系",
        "现实感薄弱，容易逃避冲突",
      ],
      love: "INFP 是「先在脑内和你过完一生」的类型：暗恋期漫长，会在想象里把对方打磨成完美情人，因此现实相处初期常经历幻灭。可一旦遇到真正契合的人，他们的爱深沉、忠诚且充满诗意——写长信、记住细节、用行动默默守护。爱情语言是「被理解」：你读懂他们欲言又止的瞬间，胜过一百句情话。INFP 需要安全感十足的伴侣，能接住情绪、不嘲笑他们的理想主义。",
      matches: [
        { type: "ENFJ", why: "天生的照顾者，懂得呵护 INFP 的敏感" },
        { type: "ENTJ", why: "提供方向感与执行力，把 INFP 的梦托住" },
        { type: "INFJ", why: "两个理想主义者灵魂共振，无需解释" },
      ],
      careers: "艺术创作 · 文学 · 心理 · 公益",
      faq: [
        {
          q: "INFP 的 soulmate 是哪个类型？",
          a: "ENFJ 和 ENTJ 是经典答案：ENFJ 呵护 INFP 的敏感，ENTJ 则为他们的梦想提供方向与稳定。",
        },
        {
          q: "INFP 的爱情语言（love language）是什么？",
          a: "被理解。当伴侣能读懂他们没说出口的情绪、认真倾听、并郑重对待他们的内心世界时，INFP 会彻底绽放。",
        },
        {
          q: "INFP 是怎么爱上一个人的？",
          a: "很慢，而且先发生在想象里：他们会把对方理想化、远距离观察，确认价值观契合后才交付真心——然后爱得毫无保留。",
        },
      ],
    },
    tw: {
      nickname: "調停者",
      metaDesc: "INFP 調停者人格全解析：核心特質、如何陷入愛情、最佳配對（ENFJ/ENTJ/INFJ）與適合的職業方向。",
      traits: [
        "內心戲宇宙，情感細膩到毫克級",
        "理想主義衛士，價值觀不容妥協",
        "溫柔共情，天生的治癒系",
        "現實感薄弱，容易逃避衝突",
      ],
      love: "INFP 是「先在腦內和你過完一生」的類型：暗戀期漫長，會在想像裡把對方打磨成完美情人，因此現實相處初期常經歷幻滅。可一旦遇到真正契合的人，他們的愛深沉、忠誠且充滿詩意——寫長信、記住細節、用行動默默守護。愛情語言是「被理解」：你讀懂他們欲言又止的瞬間，勝過一百句情話。INFP 需要安全感十足的伴侶，能接住情緒、不嘲笑他們的理想主義。",
      matches: [
        { type: "ENFJ", why: "天生的照顧者，懂得呵護 INFP 的敏感" },
        { type: "ENTJ", why: "提供方向感與執行力，把 INFP 的夢托住" },
        { type: "INFJ", why: "兩個理想主義者靈魂共振，無需解釋" },
      ],
      careers: "藝術創作 · 文學 · 心理 · 公益",
      faq: [
        {
          q: "INFP 的 soulmate 是哪個類型？",
          a: "ENFJ 和 ENTJ 是經典答案：ENFJ 呵護 INFP 的敏感，ENTJ 則為他們的夢想提供方向與穩定。",
        },
        {
          q: "INFP 的愛情語言（love language）是什麼？",
          a: "被理解。當伴侶能讀懂他們沒說出口的情緒、認真傾聽、並鄭重對待他們的內心世界時，INFP 會徹底綻放。",
        },
        {
          q: "INFP 是怎麼愛上一個人的？",
          a: "很慢，而且先發生在想像裡：他們會把對方理想化、遠距離觀察，確認價值觀契合後才交付真心——然後愛得毫無保留。",
        },
      ],
    },
    en: {
      nickname: "The Mediator",
      metaDesc: "INFP (The Mediator) personality decoded: core traits, how they fall in love, best matches (ENFJ, ENTJ, INFJ), and the careers that fit them best.",
      traits: [
        "A rich inner universe with feelings measured in milligrams",
        "An idealist guard whose values are non-negotiable",
        "Gentle, empathic, a natural healer",
        "Thin grasp of practicality; avoids conflict",
      ],
      love: "An INFP lives a whole life with you in their head first: the crush phase is long, and they polish the other person into a perfect lover in their imagination — so early reality often brings disillusionment. But when they meet a truly compatible soul, their love is deep, loyal and poetic: long letters, remembered details, silent acts of devotion. Their love language is being understood: reading their unspoken moments beats a hundred sweet lines. They need a partner who offers real security, holds their emotions, and never mocks their idealism.",
      matches: [
        { type: "ENFJ", why: "A born caretaker who knows how to guard the INFP's sensitivity" },
        { type: "ENTJ", why: "Provides direction and drive to hold up the INFP's dreams" },
        { type: "INFJ", why: "Two idealists in soul resonance — no explanation needed" },
      ],
      careers: "Art · Literature · Psychology · Nonprofit Work",
      faq: [
        {
          q: "Who is INFP's soulmate?",
          a: "ENFJ and ENTJ are the classic matches: ENFJs nurture the INFP's sensitivity, while ENTJs provide the direction and stability their dreams need.",
        },
        {
          q: "What is INFP's love language?",
          a: "Being understood. An INFP blooms when a partner reads their unspoken moods, listens deeply, and takes their inner world seriously.",
        },
        {
          q: "How does an INFP fall in love?",
          a: "Slowly, in their imagination first. They idealize, observe from a safe distance, and only open their heart once values clearly align — then they love completely.",
        },
      ],
    },
  },

  ENFJ: {
    color: "#E74C3C",
    zh: {
      nickname: "主人公",
      metaDesc: "ENFJ 主人公人格全解析：核心特质、恋爱模式与爱情语言、最佳配对（INFP/ISFP/INFJ）与适合的职业方向。",
      traits: [
        "天生精神领袖，自带感染力",
        "共情雷达全开，他人的情绪优先",
        "利他主义，为别人的成长而快乐",
        "过度付出，常常忘了照顾自己",
      ],
      love: "ENFJ 爱起来是「全心全意托举型」：记住你的梦想、鼓励你的每一步、把你的需求排在自己前面。他们擅长经营关系，浪漫且长情，但隐患是过度付出后的隐形期待——「我为你做了这么多，你为什么不懂？」爱情语言是「肯定与回应」：他们需要爱与感激被明确说出口。适合 ENFJ 的伴侣，要珍惜他们的付出，也提醒他们留一点爱给自己。",
      matches: [
        { type: "INFP", why: "敏感细腻，能读懂 ENFJ 的付出并深情回应" },
        { type: "ISFP", why: "温柔随性，给 ENFJ 松弛的爱" },
        { type: "INFJ", why: "双利他的深度联结，精神高度契合" },
      ],
      careers: "教育 · 公关 · 人力资源 · NGO 领导",
      faq: [
        {
          q: "ENFJ 的 soulmate 是哪个类型？",
          a: "INFP 和 ISFP 是经典答案：温柔真诚的类型，能看见 ENFJ 源源不断的付出，并用安静而深情的方式回馈。",
        },
        {
          q: "ENFJ 的爱情语言（love language）是什么？",
          a: "肯定的话语。ENFJ 通过鼓励与照顾倾注爱意——他们也需要经常听到爱与感谢被说出口。",
        },
        {
          q: "和 ENFJ 恋爱要注意什么？",
          a: "隐形账本。ENFJ 容易过度付出，然后在被忽视时默默受伤。请明确表达感谢，并提醒他们也要照顾自己。",
        },
      ],
    },
    tw: {
      nickname: "主人公",
      metaDesc: "ENFJ 主人公人格全解析：核心特質、戀愛模式與愛情語言、最佳配對（INFP/ISFP/INFJ）與適合的職業方向。",
      traits: [
        "天生精神領袖，自帶感染力",
        "共情雷達全開，他人的情緒優先",
        "利他主義，為別人的成長而快樂",
        "過度付出，常常忘了照顧自己",
      ],
      love: "ENFJ 愛起來是「全心全意托舉型」：記住你的夢想、鼓勵你的每一步、把你的需求排在自己前面。他們擅長經營關係，浪漫且長情，但隱患是過度付出後的隱形期待——「我為你做了這麼多，你為什麼不懂？」愛情語言是「肯定與回應」：他們需要愛與感激被明確說出口。適合 ENFJ 的伴侶，要珍惜他們的付出，也提醒他們留一點愛給自己。",
      matches: [
        { type: "INFP", why: "敏感細膩，能讀懂 ENFJ 的付出並深情回應" },
        { type: "ISFP", why: "溫柔隨性，給 ENFJ 鬆弛的愛" },
        { type: "INFJ", why: "雙利他的深度聯結，精神高度契合" },
      ],
      careers: "教育 · 公關 · 人力資源 · NGO 領導",
      faq: [
        {
          q: "ENFJ 的 soulmate 是哪個類型？",
          a: "INFP 和 ISFP 是經典答案：溫柔真誠的類型，能看見 ENFJ 源源不斷的付出，並用安靜而深情的方式回饋。",
        },
        {
          q: "ENFJ 的愛情語言（love language）是什麼？",
          a: "肯定的話語。ENFJ 透過鼓勵與照顧傾注愛意——他們也需要經常聽到愛與感謝被說出口。",
        },
        {
          q: "和 ENFJ 戀愛要注意什麼？",
          a: "隱形帳本。ENFJ 容易過度付出，然後在被忽視時默默受傷。請明確表達感謝，並提醒他們也要照顧自己。",
        },
      ],
    },
    en: {
      nickname: "The Protagonist",
      metaDesc: "ENFJ (The Protagonist) personality decoded: core traits, love style and love language, best matches (INFP, ISFP, INFJ), and the careers that fit them best.",
      traits: [
        "A born inspirer with contagious energy",
        "Empathy radar always on — others' feelings come first",
        "Genuinely happy helping others grow",
        "Gives too much and forgets self-care",
      ],
      love: "An ENFJ loves by lifting you up: remembering your dreams, cheering every step, putting your needs ahead of their own. They are natural relationship-builders — romantic, devoted, attentive. The hidden risk is invisible scorekeeping after over-giving: \"after all I did, why don't you see it?\" Their love language is affirmation and response; they need love and gratitude said out loud. The right partner treasures their giving — and reminds them to keep some love for themselves.",
      matches: [
        { type: "INFP", why: "Reads the ENFJ's giving and responds with deep feeling" },
        { type: "ISFP", why: "Gentle and easygoing — offers the ENFJ relaxed love" },
        { type: "INFJ", why: "A deep bond between two givers, spiritually matched" },
      ],
      careers: "Education · PR · Human Resources · NGO Leadership",
      faq: [
        {
          q: "Who is ENFJ's soulmate?",
          a: "INFP and ISFP are the classic matches: gentle, sincere types who notice the ENFJ's endless giving and return it with genuine, quiet devotion.",
        },
        {
          q: "What is ENFJ's love language?",
          a: "Words of affirmation. ENFJs pour out love through encouragement and care — and they need to hear love and gratitude spoken back, often.",
        },
        {
          q: "What should you watch out for with an ENFJ partner?",
          a: "Invisible scorekeeping. ENFJs over-give, then hurt quietly when it goes unnoticed. Thank them explicitly and remind them to care for themselves too.",
        },
      ],
    },
  },

  ENFP: {
    color: "#E67E22",
    zh: {
      nickname: "竞选者",
      metaDesc: "ENFP 竞选者人格全解析：核心特质、恋爱模式与爱情语言、最佳配对（INTJ/INFJ/ENTP）与适合的职业方向。",
      traits: [
        "热情炸弹，对人与世界充满好奇",
        "创意喷泉，点子永远用不完",
        "情绪真诚外放，喜欢就会让你知道",
        "三分钟热度，执行与收尾是短板",
      ],
      love: "ENFP 恋爱像烟花：开场绚烂，全情投入，让对方感觉自己是宇宙中心。他们的爱真诚而炽热，但需要持续的新鲜感和精神共鸣来保鲜——平淡是 ENFP 爱情最大的敌人。爱情语言是「热情表达 + 深度交流」：既要一起玩闹，也要聊灵魂。成熟的 ENFP 学会在激情退潮后依然选择留下。能和他们一起探索世界、又能给予稳定锚点的伴侣最合适。",
      matches: [
        { type: "INTJ", why: "冷静深邃，是 ENFP 的最佳定海神针" },
        { type: "INFJ", why: "看穿热闹背后的敏感，给出深度理解" },
        { type: "ENTP", why: "双创意组合，把日子过成冒险" },
      ],
      careers: "创意营销 · 表演 · 自媒体 · 公益创业",
      faq: [
        {
          q: "ENFP 的 soulmate 是哪个类型？",
          a: "INTJ 和 INFJ 是经典答案：两者的沉静深邃能稳住 ENFP 的火花，是 MBTI 里最被津津乐道的组合之一。",
        },
        {
          q: "ENFP 的爱情语言（love language）是什么？",
          a: "热情表达加深度交流。玩闹的爱意和走心的对话缺一不可——只有热闹没有深度，ENFP 迟早会觉得空。",
        },
        {
          q: "ENFP 爱一个人的表现？",
          a: "大张旗鼓、全心全意：持续的关注、不断的惊喜、把你介绍给所有朋友。ENFP 爱你时，你就是他最爱讲的故事。",
        },
      ],
    },
    tw: {
      nickname: "競選者",
      metaDesc: "ENFP 競選者人格全解析：核心特質、戀愛模式與愛情語言、最佳配對（INTJ/INFJ/ENTP）與適合的職業方向。",
      traits: [
        "熱情炸彈，對人與世界充滿好奇",
        "創意噴泉，點子永遠用不完",
        "情緒真誠外放，喜歡就會讓你知道",
        "三分鐘熱度，執行與收尾是短板",
      ],
      love: "ENFP 戀愛像煙火：開場絢爛，全情投入，讓對方感覺自己是宇宙中心。他們的愛真誠而熾熱，但需要持續的新鮮感和精神共鳴來保鮮——平淡是 ENFP 愛情最大的敵人。愛情語言是「熱情表達 + 深度交流」：既要一起玩鬧，也要聊靈魂。成熟的 ENFP 學會在激情退潮後依然選擇留下。能和他們一起探索世界、又能給予穩定錨點的伴侶最合適。",
      matches: [
        { type: "INTJ", why: "冷靜深邃，是 ENFP 的最佳定海神針" },
        { type: "INFJ", why: "看穿熱鬧背後的敏感，給出深度理解" },
        { type: "ENTP", why: "雙創意組合，把日子過成冒險" },
      ],
      careers: "創意行銷 · 表演 · 自媒體 · 公益創業",
      faq: [
        {
          q: "ENFP 的 soulmate 是哪個類型？",
          a: "INTJ 和 INFJ 是經典答案：兩者的沉靜深邃能穩住 ENFP 的火花，是 MBTI 裡最被津津樂道的組合之一。",
        },
        {
          q: "ENFP 的愛情語言（love language）是什麼？",
          a: "熱情表達加深度交流。玩鬧的愛意和走心的對話缺一不可——只有熱鬧沒有深度，ENFP 遲早會覺得空。",
        },
        {
          q: "ENFP 愛一個人的表現？",
          a: "大張旗鼓、全心全意：持續的關注、不斷的驚喜、把你介紹給所有朋友。ENFP 愛你時，你就是他最愛講的故事。",
        },
      ],
    },
    en: {
      nickname: "The Campaigner",
      metaDesc: "ENFP (The Campaigner) personality decoded: core traits, love style and love language, best matches (INTJ, INFJ, ENTP), and the careers that fit them best.",
      traits: [
        "An enthusiasm bomb, endlessly curious about people",
        "A fountain of ideas that never runs dry",
        "Wears emotions openly — you'll know if they like you",
        "Notorious three-minute passion; weak at follow-through",
      ],
      love: "An ENFP loves like fireworks: a dazzling start, total immersion, making you feel like the center of the universe. Their love is genuine and fierce, but it needs novelty and mental connection to stay alive — routine is the enemy of ENFP romance. Their love language is enthusiastic expression plus deep conversation: play together, but also talk souls. A mature ENFP learns to keep choosing the relationship after the spark settles. A partner who explores the world with them while offering a stable anchor fits best.",
      matches: [
        { type: "INTJ", why: "Calm and deep — the ENFP's perfect anchor" },
        { type: "INFJ", why: "Sees the sensitivity behind the noise, offers real understanding" },
        { type: "ENTP", why: "A double-creative duo turning life into adventure" },
      ],
      careers: "Creative Marketing · Performance · Content Creation · Social Entrepreneurship",
      faq: [
        {
          q: "Who is ENFP's soulmate?",
          a: "INTJ and INFJ are the classic matches: both offer the calm depth that grounds the ENFP's spark, forming one of MBTI's most celebrated pairings.",
        },
        {
          q: "What is ENFP's love language?",
          a: "Enthusiastic expression plus deep talk. They need playful affection and real conversation in equal measure — fun without depth eventually feels empty to them.",
        },
        {
          q: "How does an ENFP show love?",
          a: "Loudly and wholeheartedly: constant attention, surprises, introducing you to everyone they know. When an ENFP loves you, you become their favorite story.",
        },
      ],
    },
  },

  ISTJ: {
    color: "#7F8C8D",
    zh: {
      nickname: "物流师",
      metaDesc: "ISTJ 物流师人格全解析：核心特质、恋爱模式与爱情语言、最佳配对（ESFP/ESTP/ISFJ）与适合的职业方向。",
      traits: [
        "说到做到，承诺就是合同",
        "尊重规则与传统，讨厌临时变卦",
        "用事实和数据说话，不吃画饼",
        "情绪稳定，是身边人的定海神针",
      ],
      love: "ISTJ 爱上一个人的过程很慢：先观察、再验证、最后才投入。他们不相信一见钟情，更相信日久见人心。一旦认定，忠诚度在 16 型里数一数二——只是表达方式很「务实」：记住你的日程、帮你处理琐事、把未来规划得井井有条。ISTJ 的爱情语言是「服务的行动」和「高质量陪伴」，而非甜言蜜语。他们需要一个能读懂沉默背后深情、并尊重其节奏与安全感的伴侣。",
      matches: [
        { type: "ESFP", why: "用热情融化 ISTJ 的克制，带他们体验当下" },
        { type: "ESTP", why: "活力与冒险精神，正好补上 ISTJ 缺的即兴" },
        { type: "ISFJ", why: "两个务实派互相懂得，安稳里见深情" },
      ],
      careers: "金融审计 · 法律 · 工程 · 行政管理",
      faq: [
        {
          q: "ISTJ 的 soulmate 是哪个类型？",
          a: "普遍认为是 ESFP 和 ESTP：外向实感型用热情和行动力打开 ISTJ 的世界，而 ISTJ 给对方稳定与方向，互补性极强。",
        },
        {
          q: "ISTJ 的爱情语言（love language）是什么？",
          a: "服务的行动加高质量时间。ISTJ 很少说情话，但会记得你随口提过的事，并用实际行动一一兑现。",
        },
        {
          q: "怎么判断 ISTJ 喜欢你？",
          a: "他们会把你纳入自己的计划和日常：主动帮你解决问题、记住你的习惯、为你打破原则——对 ISTJ 来说这就是告白。",
        },
      ],
    },
    tw: {
      nickname: "物流師",
      metaDesc: "ISTJ 物流師人格全解析：核心特質、戀愛模式與愛情語言、最佳配對（ESFP/ESTP/ISFJ）與適合的職業方向。",
      traits: [
        "說到做到，承諾就是合約",
        "尊重規則與傳統，討厭臨時變卦",
        "用事實和數據說話，不吃畫餅",
        "情緒穩定，是身邊人的定海神針",
      ],
      love: "ISTJ 愛上一個人的過程很慢：先觀察、再驗證、最後才投入。他們不相信一見鍾情，更相信日久見人心。一旦認定，忠誠度在 16 型裡數一數二——只是表達方式很「務實」：記住你的日程、幫你處理瑣事、把未來規畫得井井有條。ISTJ 的愛情語言是「服務的行動」和「高品質陪伴」，而非甜言蜜語。他們需要一個能讀懂沉默背後深情、並尊重其節奏與安全感的伴侶。",
      matches: [
        { type: "ESFP", why: "用熱情融化 ISTJ 的克制，帶他們體驗當下" },
        { type: "ESTP", why: "活力與冒險精神，正好補上 ISTJ 缺的即興" },
        { type: "ISFJ", why: "兩個務實派互相懂得，安穩裡見深情" },
      ],
      careers: "金融審計 · 法律 · 工程 · 行政管理",
      faq: [
        {
          q: "ISTJ 的 soulmate 是哪個類型？",
          a: "普遍認為是 ESFP 和 ESTP：外向實感型用熱情和行動力打開 ISTJ 的世界，而 ISTJ 給對方穩定與方向，互補性極強。",
        },
        {
          q: "ISTJ 的愛情語言（love language）是什麼？",
          a: "服務的行動加高品質時間。ISTJ 很少說情話，但會記得你隨口提過的事，並用實際行動一一兌現。",
        },
        {
          q: "怎麼判斷 ISTJ 喜歡你？",
          a: "他們會把你納入自己的計畫和日常：主動幫你解決問題、記住你的習慣、為你打破原則——對 ISTJ 來說這就是告白。",
        },
      ],
    },
    en: {
      nickname: "The Logistician",
      metaDesc: "ISTJ (The Logistician) personality decoded: core traits, love style and love language, best matches (ESFP, ESTP, ISFJ), and the careers that fit them best.",
      traits: [
        "Word is bond — a promise is a contract",
        "Respects rules and tradition; hates last-minute changes",
        "Argues with facts and data, not hype",
        "Emotionally steady — everyone's anchor",
      ],
      love: "An ISTJ falls in love slowly: observe first, verify second, commit last. They don't believe in love at first sight — they believe in character proven over time. Once committed, their loyalty is among the strongest of all 16 types, but their expression is deeply practical: remembering your schedule, handling your errands, quietly planning a stable future. The ISTJ love language is acts of service and quality time, not sweet talk. They need a partner who can read the devotion behind their silence and respect their need for routine, reliability and a steady pace.",
      matches: [
        { type: "ESFP", why: "Melts ISTJ reserve with warmth and teaches them the present moment" },
        { type: "ESTP", why: "Energy and adventure supply the spontaneity ISTJs lack" },
        { type: "ISFJ", why: "Two pragmatists who truly get each other — deep feeling in stability" },
      ],
      careers: "Finance & Audit · Law · Engineering · Administration",
      faq: [
        {
          q: "Who is ISTJ's soulmate?",
          a: "ESFP and ESTP are the classic matches: outgoing, spontaneous types who open up the ISTJ's world, while the ISTJ gives them stability and direction.",
        },
        {
          q: "What is ISTJ's love language?",
          a: "Acts of service and quality time. An ISTJ rarely says sweet things, but they remember what you mentioned in passing and quietly make it happen.",
        },
        {
          q: "How can you tell an ISTJ likes you?",
          a: "They fold you into their plans and routines: solving your problems, remembering your habits, bending their own rules for you — for an ISTJ, that's a confession.",
        },
      ],
    },
  },

  ISFJ: {
    color: "#27AE60",
    zh: {
      nickname: "守卫者",
      metaDesc: "ISFJ 守卫者人格全解析：核心特质、恋爱模式与爱情语言、最佳配对（ESFP/ESTP/ISTJ）与适合的职业方向。",
      traits: [
        "温暖可靠，默默付出的定心丸",
        "记忆力惊人，记得每个人的喜好",
        "责任心重，答应的事一定做到",
        "不善表达委屈，习惯把情绪咽回去",
      ],
      love: "ISFJ 的爱藏在细节里：你随口说想吃的东西，第二天就出现在桌上；你的日程、忌口、小习惯，他们全都记得。他们慢热而谨慎，确定关系后忠诚度极高，是典型的「过日子型」深情。爱情语言是「服务的行动 + 细水长流的陪伴」。ISFJ 最大的课题是学会表达自己的需求——他们太擅长照顾别人，以至于常被当成理所当然。适合懂得珍惜、并主动回馈温柔的伴侣。",
      matches: [
        { type: "ESFP", why: "用热情点亮 ISFJ 的安稳世界" },
        { type: "ESTP", why: "带动 ISFJ 走出舒适区，体验新鲜" },
        { type: "ISTJ", why: "两个务实者互相托底，安稳长久" },
      ],
      careers: "医护 · 社工 · 教育 · 行政支持",
      faq: [
        {
          q: "ISFJ 的 soulmate 是哪个类型？",
          a: "ESFP 和 ESTP 是经典答案：活泼随性的伴侣点亮 ISFJ 的安稳世界，而 ISFJ 给他们温暖与安心的港湾。",
        },
        {
          q: "ISFJ 的爱情语言（love language）是什么？",
          a: "服务的行动。ISFJ 的爱在细节里：你爱吃的菜、你的忌口、还没开口就被办好的事。看见这些，就是对他们最好的回应。",
        },
        {
          q: "ISFJ 在关系里最需要什么？",
          a: "被珍惜。ISFJ 不断付出却很少开口要，真诚的感谢和小小的回馈，能避免他们悄悄耗尽自己。",
        },
      ],
    },
    tw: {
      nickname: "守衛者",
      metaDesc: "ISFJ 守衛者人格全解析：核心特質、戀愛模式與愛情語言、最佳配對（ESFP/ESTP/ISTJ）與適合的職業方向。",
      traits: [
        "溫暖可靠，默默付出的定心丸",
        "記憶力驚人，記得每個人的喜好",
        "責任心重，答應的事一定做到",
        "不善表達委屈，習慣把情緒嚥回去",
      ],
      love: "ISFJ 的愛藏在細節裡：你隨口說想吃的東西，第二天就出現在桌上；你的日程、忌口、小習慣，他們全都記得。他們慢熱而謹慎，確定關係後忠誠度極高，是典型的「過日子型」深情。愛情語言是「服務的行動 + 細水長流的陪伴」。ISFJ 最大的課題是學會表達自己的需求——他們太擅長照顧別人，以至於常被當成理所當然。適合懂得珍惜、並主動回饋溫柔的伴侶。",
      matches: [
        { type: "ESFP", why: "用熱情點亮 ISFJ 的安穩世界" },
        { type: "ESTP", why: "帶動 ISFJ 走出舒適圈，體驗新鮮" },
        { type: "ISTJ", why: "兩個務實者互相托底，安穩長久" },
      ],
      careers: "醫護 · 社工 · 教育 · 行政支援",
      faq: [
        {
          q: "ISFJ 的 soulmate 是哪個類型？",
          a: "ESFP 和 ESTP 是經典答案：活潑隨性的伴侶點亮 ISFJ 的安穩世界，而 ISFJ 給他們溫暖與安心的港灣。",
        },
        {
          q: "ISFJ 的愛情語言（love language）是什麼？",
          a: "服務的行動。ISFJ 的愛在細節裡：你愛吃的菜、你的忌口、還沒開口就被辦好的事。看見這些，就是對他們最好的回應。",
        },
        {
          q: "ISFJ 在關係裡最需要什麼？",
          a: "被珍惜。ISFJ 不斷付出卻很少開口要，真誠的感謝和小小的回饋，能避免他們悄悄耗盡自己。",
        },
      ],
    },
    en: {
      nickname: "The Defender",
      metaDesc: "ISFJ (The Defender) personality decoded: core traits, love style and love language, best matches (ESFP, ESTP, ISTJ), and the careers that fit them best.",
      traits: [
        "Warm, dependable, quietly holding everyone together",
        "Photographic memory for what each person likes",
        "Strong sense of duty — commitments always kept",
        "Swallows their own hurt instead of speaking up",
      ],
      love: "An ISFJ's love hides in the details: the snack you mentioned once appears on the table the next day; your schedule, allergies and little habits are all quietly memorized. Slow to warm and cautious, they are fiercely loyal once committed — the classic \"build a life together\" devotion. Their love language is acts of service and steady, day-in-day-out companionship. Their biggest lesson is voicing their own needs: they care so well that they're often taken for granted. They suit a partner who notices, cherishes and returns their tenderness.",
      matches: [
        { type: "ESFP", why: "Lights up the ISFJ's steady world with enthusiasm" },
        { type: "ESTP", why: "Pulls the ISFJ out of the comfort zone into something new" },
        { type: "ISTJ", why: "Two practical souls holding each other up — safe and lasting" },
      ],
      careers: "Healthcare · Social Work · Education · Administrative Support",
      faq: [
        {
          q: "Who is ISFJ's soulmate?",
          a: "ESFP and ESTP are the classic matches: lively, spontaneous partners who brighten the ISFJ's steady world, while the ISFJ offers warmth and a safe home base.",
        },
        {
          q: "What is ISFJ's love language?",
          a: "Acts of service. ISFJs love through details — your favorite food, remembered allergies, quiet help before you ask. Noticing it is how you love them back.",
        },
        {
          q: "What does an ISFJ need in a relationship?",
          a: "Appreciation. ISFJs give constantly and rarely ask for anything, so sincere thanks and small returned kindnesses keep them from quietly burning out.",
        },
      ],
    },
  },

  ESTJ: {
    color: "#C9A84C",
    zh: {
      nickname: "总经理",
      metaDesc: "ESTJ 总经理人格全解析：核心特质、恋爱模式与爱情语言、最佳配对（ISFP/INFP/ISTJ）与适合的职业方向。",
      traits: [
        "秩序建筑师，规则与效率的化身",
        "执行力天花板，说到就做到",
        "责任感爆棚，天生的管理者",
        "直来直去，不太会绕弯子",
      ],
      love: "ESTJ 谈恋爱的方式很「实」：不搞暧昧，确认关系就直接进入「共同经营」模式——规划未来、分担责任、把你的事当成自己的事。他们的爱像一份可靠的长期合同：稳定、兑现、不玩消失。爱情语言是「行动与承诺」：说娶你就真的在看房。短板是不擅长处理细腻情绪，安慰人时容易讲道理。适合欣赏踏实、并能温柔提醒他们「先抱我，再讲道理」的伴侣。",
      matches: [
        { type: "ISFP", why: "用温柔感性，中和 ESTJ 的硬朗" },
        { type: "INFP", why: "提供情感深度，让 ESTJ 学会柔软" },
        { type: "ISTJ", why: "双务实联手，生活运转如精密仪器" },
      ],
      careers: "项目管理 · 行政 · 军警 · 运营",
      faq: [
        {
          q: "ESTJ 的 soulmate 是哪个类型？",
          a: "ISFP 和 INFP 是经典答案：温柔的感性派能软化 ESTJ 的棱角，而 ESTJ 回馈以安全感与方向。",
        },
        {
          q: "ESTJ 的爱情语言（love language）是什么？",
          a: "行动与承诺。ESTJ 表达爱的方式是「把事情办了」——账单、计划、难题——并且把承诺当作必须兑现的合同。",
        },
        {
          q: "怎么和 ESTJ 相处？",
          a: "直接、靠谱、懂得感谢。别玩猜心游戏，有问题就摊开说，他们反而会更尊重你。",
        },
      ],
    },
    tw: {
      nickname: "總經理",
      metaDesc: "ESTJ 總經理人格全解析：核心特質、戀愛模式與愛情語言、最佳配對（ISFP/INFP/ISTJ）與適合的職業方向。",
      traits: [
        "秩序建築師，規則與效率的化身",
        "執行力天花板，說到就做到",
        "責任感爆棚，天生的管理者",
        "直來直去，不太會繞彎子",
      ],
      love: "ESTJ 談戀愛的方式很「實」：不搞曖昧，確認關係就直接進入「共同經營」模式——規畫未來、分擔責任、把你的事當成自己的事。他們的愛像一份可靠的長期合約：穩定、兌現、不玩消失。愛情語言是「行動與承諾」：說娶你就真的在看房。短板是不擅長處理細膩情緒，安慰人時容易講道理。適合欣賞踏實、並能溫柔提醒他們「先抱我，再講道理」的伴侶。",
      matches: [
        { type: "ISFP", why: "用溫柔感性，中和 ESTJ 的硬朗" },
        { type: "INFP", why: "提供情感深度，讓 ESTJ 學會柔軟" },
        { type: "ISTJ", why: "雙務實聯手，生活運轉如精密儀器" },
      ],
      careers: "專案管理 · 行政 · 軍警 · 營運",
      faq: [
        {
          q: "ESTJ 的 soulmate 是哪個類型？",
          a: "ISFP 和 INFP 是經典答案：溫柔的感性派能軟化 ESTJ 的稜角，而 ESTJ 回饋以安全感與方向。",
        },
        {
          q: "ESTJ 的愛情語言（love language）是什麼？",
          a: "行動與承諾。ESTJ 表達愛的方式是「把事情辦了」——帳單、計畫、難題——並且把承諾當作必須兌現的合約。",
        },
        {
          q: "怎麼和 ESTJ 相處？",
          a: "直接、靠譜、懂得感謝。別玩猜心遊戲，有問題就攤開說，他們反而會更尊重你。",
        },
      ],
    },
    en: {
      nickname: "The Executive",
      metaDesc: "ESTJ (The Executive) personality decoded: core traits, love style and love language, best matches (ISFP, INFP, ISTJ), and the careers that fit them best.",
      traits: [
        "An architect of order — rules and efficiency embodied",
        "Top-tier execution: said means done",
        "Overflowing responsibility; a natural manager",
        "Direct and blunt, never beats around the bush",
      ],
      love: "An ESTJ dates practically: no games, and once it's official they switch straight into co-management mode — planning the future, sharing responsibilities, treating your problems as their own. Their love is a reliable long-term contract: stable, honored, never ghosting. Their love language is action and commitment: if they say forever, they're already checking apartments. Their weak spot is delicate emotions — they comfort with logic. They suit a partner who appreciates dependability and can gently remind them: hug first, lecture later.",
      matches: [
        { type: "ISFP", why: "Softens the ESTJ's hard edges with gentle feeling" },
        { type: "INFP", why: "Offers emotional depth that teaches the ESTJ tenderness" },
        { type: "ISTJ", why: "Two pragmatists — life runs like a precision instrument" },
      ],
      careers: "Project Management · Administration · Military & Police · Operations",
      faq: [
        {
          q: "Who is ESTJ's soulmate?",
          a: "ISFP and INFP are the classic matches: gentle, feeling types who soften the ESTJ's hard edges, while the ESTJ provides security and direction.",
        },
        {
          q: "What is ESTJ's love language?",
          a: "Action and commitment. An ESTJ shows love by handling things — bills, plans, problems — and by treating promises as binding contracts.",
        },
        {
          q: "How do you get along with an ESTJ?",
          a: "Be direct, be reliable, and appreciate what they do. Skip the guessing games; if there's an issue, say it plainly and they'll respect you more for it.",
        },
      ],
    },
  },

  ESFJ: {
    color: "#E91E8C",
    zh: {
      nickname: "执政官",
      metaDesc: "ESFJ 执政官人格全解析：核心特质、恋爱模式与爱情语言、最佳配对（ISFP/INFP/ISFJ）与适合的职业方向。",
      traits: [
        "人际润滑剂，天生的群体凝聚核",
        "热心肠，把照顾人当本能",
        "重视和谐与传统，仪式感拉满",
        "在意他人评价，容易想太多",
      ],
      love: "ESFJ 是「把恋爱过成日子」的高手：纪念日一个不落，双方亲友关系打理得妥妥帖帖。他们付出的爱浓烈而具体——做饭、张罗、嘘寒问暖。爱情语言是「被需要 + 被肯定」：他们倾尽所有，也需要对方频繁确认「你爱我、你需要我」。雷区是付出被无视——一句真诚的感谢能让他们满血复活。适合懂得感恩、愿意公开表达爱意的伴侣。",
      matches: [
        { type: "ISFP", why: "安静温柔，给 ESFJ 不吵不闹的港湾" },
        { type: "INFP", why: "真诚细腻，懂得珍惜 ESFJ 的付出" },
        { type: "ISFJ", why: "双倍温暖，把彼此照顾得无微不至" },
      ],
      careers: "公关 · 人力资源 · 服务业 · 活动策划",
      faq: [
        {
          q: "ESFJ 的 soulmate 是哪个类型？",
          a: "ISFP 和 INFP 是经典答案：安静真诚的类型，会珍惜 ESFJ 的付出，而不是把它当作理所当然。",
        },
        {
          q: "ESFJ 的爱情语言（love language）是什么？",
          a: "肯定的言辞和被需要感。ESFJ 倾尽所有，靠一句句明确的「我爱你」和真诚的「谢谢你」回血。",
        },
        {
          q: "ESFJ 的爱情雷区是什么？",
          a: "付出被无视。当他们的用心长期得不到回应，委屈会快速累积——而一句真诚的肯定就能瞬间满血复活。",
        },
      ],
    },
    tw: {
      nickname: "執政官",
      metaDesc: "ESFJ 執政官人格全解析：核心特質、戀愛模式與愛情語言、最佳配對（ISFP/INFP/ISFJ）與適合的職業方向。",
      traits: [
        "人際潤滑劑，天生的群體凝聚核",
        "熱心腸，把照顧人當本能",
        "重視和諧與傳統，儀式感拉滿",
        "在意他人評價，容易想太多",
      ],
      love: "ESFJ 是「把戀愛過成日子」的高手：紀念日一個不落，雙方親友關係打理得妥妥帖帖。他們付出的愛濃烈而具體——做飯、張羅、噓寒問暖。愛情語言是「被需要 + 被肯定」：他們傾盡所有，也需要對方頻繁確認「你愛我、你需要我」。雷區是付出被無視——一句真誠的感謝能讓他們滿血復活。適合懂得感恩、願意公開表達愛意的伴侶。",
      matches: [
        { type: "ISFP", why: "安靜溫柔，給 ESFJ 不吵不鬧的港灣" },
        { type: "INFP", why: "真誠細膩，懂得珍惜 ESFJ 的付出" },
        { type: "ISFJ", why: "雙倍溫暖，把彼此照顧得無微不至" },
      ],
      careers: "公關 · 人力資源 · 服務業 · 活動策劃",
      faq: [
        {
          q: "ESFJ 的 soulmate 是哪個類型？",
          a: "ISFP 和 INFP 是經典答案：安靜真誠的類型，會珍惜 ESFJ 的付出，而不是把它當作理所當然。",
        },
        {
          q: "ESFJ 的愛情語言（love language）是什麼？",
          a: "肯定的言辭和被需要感。ESFJ 傾盡所有，靠一句句明確的「我愛你」和真誠的「謝謝你」回血。",
        },
        {
          q: "ESFJ 的愛情雷區是什麼？",
          a: "付出被無視。當他們的用心長期得不到回應，委屈會快速累積——而一句真誠的肯定就能瞬間滿血復活。",
        },
      ],
    },
    en: {
      nickname: "The Consul",
      metaDesc: "ESFJ (The Consul) personality decoded: core traits, love style and love language, best matches (ISFP, INFP, ISFJ), and the careers that fit them best.",
      traits: [
        "Social glue who holds every group together",
        "Caring for others is their default setting",
        "Values harmony and tradition; big on rituals",
        "Cares deeply about others' opinions — overthinks",
      ],
      love: "An ESFJ is a master of turning romance into a shared life: no anniversary forgotten, both families' relationships smoothly managed. Their love is intense and concrete — cooking, organizing, checking in on you. Their love language is being needed and being appreciated: they give everything and need frequent confirmation that they're loved and valued. Their red line is invisible effort — one sincere thank-you recharges them completely. They suit a partner who is grateful and openly affectionate.",
      matches: [
        { type: "ISFP", why: "Quiet and gentle — a peaceful harbor for the ESFJ" },
        { type: "INFP", why: "Sincere and perceptive; truly treasures the ESFJ's giving" },
        { type: "ISFJ", why: "Double warmth — caring for each other down to the details" },
      ],
      careers: "PR · Human Resources · Service Industry · Event Planning",
      faq: [
        {
          q: "Who is ESFJ's soulmate?",
          a: "ISFP and INFP are the classic matches: calm, sincere types who cherish the ESFJ's devotion instead of taking it for granted.",
        },
        {
          q: "What is ESFJ's love language?",
          a: "Words of affirmation and being needed. ESFJs give everything and recharge on explicit \"I love you\"s and heartfelt thank-yous.",
        },
        {
          q: "What is an ESFJ's red line in love?",
          a: "Invisible effort. When their constant care goes unnoticed or unappreciated, resentment builds fast — one sincere acknowledgment resets everything.",
        },
      ],
    },
  },

  ISTP: {
    color: "#58D68D",
    zh: {
      nickname: "鉴赏家",
      metaDesc: "ISTP 鉴赏家人格全解析：核心特质、恋爱模式与爱情语言、最佳配对（ESFJ/ESTJ/ISFP）与适合的职业方向。",
      traits: [
        "冷静拆解大师，动手能力天花板",
        "危机处理专家，越乱越镇定",
        "沉默寡言，行动永远先于语言",
        "自由至上，讨厌被束缚",
      ],
      love: "ISTP 的爱不说，只做：你家的门锁坏了、车有异响，他默默修好，然后装作没事。他们保持独立的自我空间，恋爱里也一样——不粘人，也不希望被粘。爱情语言是「解决问题的行动」和「并肩做事的陪伴」。ISTP 深情但不善承诺未来，需要伴侣读懂「人在即心在」的安静忠诚。逼他们谈感受，只会收获沉默；给他们空间，他们反而走得更远。",
      matches: [
        { type: "ESFJ", why: "用温暖补上 ISTP 缺的情感表达" },
        { type: "ESTJ", why: "提供结构与方向，让生活有锚点" },
        { type: "ISFP", why: "两个安静实感派，并肩做事的默契" },
      ],
      careers: "工程技术 · 运动 · 侦查 · 机械",
      faq: [
        {
          q: "ISTP 的 soulmate 是哪个类型？",
          a: "ESFJ 和 ESTJ 是经典答案：温暖、有条理的类型，补上 ISTP 跳过的情感表达与生活结构，又不会挤占他们的空间。",
        },
        {
          q: "ISTP 的爱情语言（love language）是什么？",
          a: "动手解决问题和并肩做事。帮你修好车、装好书架、默默出现的 ISTP，说的是最流利的情话。",
        },
        {
          q: "怎么爱一个 ISTP？",
          a: "给空间，别逼他谈感受。尊重他的独立，陪他一起做事——他始终都在，就是最长情的回答。",
        },
      ],
    },
    tw: {
      nickname: "鑑賞家",
      metaDesc: "ISTP 鑑賞家人格全解析：核心特質、戀愛模式與愛情語言、最佳配對（ESFJ/ESTJ/ISFP）與適合的職業方向。",
      traits: [
        "冷靜拆解大師，動手能力天花板",
        "危機處理專家，越亂越鎮定",
        "沉默寡言，行動永遠先於語言",
        "自由至上，討厭被束縛",
      ],
      love: "ISTP 的愛不說，只做：你家的門鎖壞了、車有異響，他默默修好，然後裝作沒事。他們保持獨立的自我空間，戀愛裡也一樣——不黏人，也不希望被黏。愛情語言是「解決問題的行動」和「並肩做事的陪伴」。ISTP 深情但不善承諾未來，需要伴侶讀懂「人在即心在」的安靜忠誠。逼他們談感受，只會收穫沉默；給他們空間，他們反而走得更遠。",
      matches: [
        { type: "ESFJ", why: "用溫暖補上 ISTP 缺的情感表達" },
        { type: "ESTJ", why: "提供結構與方向，讓生活有錨點" },
        { type: "ISFP", why: "兩個安靜實感派，並肩做事的默契" },
      ],
      careers: "工程技術 · 運動 · 偵查 · 機械",
      faq: [
        {
          q: "ISTP 的 soulmate 是哪個類型？",
          a: "ESFJ 和 ESTJ 是經典答案：溫暖、有條理的類型，補上 ISTP 跳過的情感表達與生活結構，又不會擠佔他們的空間。",
        },
        {
          q: "ISTP 的愛情語言（love language）是什麼？",
          a: "動手解決問題和並肩做事。幫你修好車、裝好書架、默默出現的 ISTP，說的是最流利的情話。",
        },
        {
          q: "怎麼愛一個 ISTP？",
          a: "給空間，別逼他談感受。尊重他的獨立，陪他一起做事——他始終都在，就是最長情的回答。",
        },
      ],
    },
    en: {
      nickname: "The Virtuoso",
      metaDesc: "ISTP (The Virtuoso) personality decoded: core traits, love style and love language, best matches (ESFJ, ESTJ, ISFP), and the careers that fit them best.",
      traits: [
        "A cool-headed dismantler; hands-on skills off the charts",
        "Crisis specialist — calmer as things get worse",
        "Few words; action always precedes speech",
        "Freedom above all; hates being tied down",
      ],
      love: "An ISTP doesn't say love — they do it: your broken lock and strange engine noise get fixed quietly, then they act like nothing happened. They keep their independence in relationships too — never clingy, and they don't want to be clung to. Their love language is fixing your problems and side-by-side companionship. Deeply feeling but bad at promising the future, an ISTP needs a partner who can read the quiet loyalty of \"still here.\" Push them to talk feelings and you'll get silence; give them space and they go the distance.",
      matches: [
        { type: "ESFJ", why: "Supplies the emotional expression the ISTP lacks" },
        { type: "ESTJ", why: "Provides structure and direction — an anchor for daily life" },
        { type: "ISFP", why: "Two quiet doers with effortless side-by-side chemistry" },
      ],
      careers: "Engineering · Sports · Investigation · Mechanics",
      faq: [
        {
          q: "Who is ISTP's soulmate?",
          a: "ESFJ and ESTJ are the classic matches: warm, organized types who supply the emotional expression and structure the ISTP skips, without crowding them.",
        },
        {
          q: "What is ISTP's love language?",
          a: "Fixing things and shared activity. An ISTP who repairs your bike, builds your shelf or just quietly shows up is speaking fluent love.",
        },
        {
          q: "How do you love an ISTP?",
          a: "Give them space and don't force feelings-talk. Respect their independence, join them in doing things, and their steady presence will say the rest.",
        },
      ],
    },
  },

  ISFP: {
    color: "#AF7AC5",
    zh: {
      nickname: "探险家",
      metaDesc: "ISFP 探险家人格全解析：核心特质、恋爱模式与爱情语言、最佳配对（ENFJ/ESTJ/ESFP）与适合的职业方向。",
      traits: [
        "艺术灵魂，审美在线的安静派",
        "活在当下，温柔而随性",
        "敏感细腻，用行动代替语言表达",
        "讨厌冲突，遇压先撤退",
      ],
      love: "ISFP 的爱像一首即兴诗：不喧哗，却处处是心思——为你画的画、挑的歌、一次计划外的日落之旅。他们慢热，需要足够的安全感才会展露内心。爱情语言是「用心的陪伴与惊喜」：细节里的温柔胜过千言万语。ISFP 不喜冲突，有不满常憋在心里，攒够了会安静离开。适合耐心、温和、能主动引导他们说出感受的伴侣。",
      matches: [
        { type: "ENFJ", why: "温暖引导，让 ISFP 安心做自己" },
        { type: "ESTJ", why: "提供稳定与方向，托住 ISFP 的随性" },
        { type: "ESFP", why: "双倍当下主义，把日子过成艺术展" },
      ],
      careers: "设计 · 音乐 · 手工艺 · 摄影",
      faq: [
        {
          q: "ISFP 的 soulmate 是哪个类型？",
          a: "ENFJ 和 ESTJ 是经典答案：温暖稳定的伴侣能给 ISFP 足够的安全感敞开心扉，并温柔地托住他们的自由灵魂。",
        },
        {
          q: "ISFP 的爱情语言（love language）是什么？",
          a: "用心的细节与安静的陪伴：为你做的歌单、精心挑选的小礼物、一场说走就走的日落。",
        },
        {
          q: "ISFP 怎么处理矛盾？",
          a: "通常不处理——他们选择撤退。耐心的伴侣温和地邀请他们说出感受，才不会让小委屈攒成安静的离开。",
        },
      ],
    },
    tw: {
      nickname: "探險家",
      metaDesc: "ISFP 探險家人格全解析：核心特質、戀愛模式與愛情語言、最佳配對（ENFJ/ESTJ/ESFP）與適合的職業方向。",
      traits: [
        "藝術靈魂，審美在線的安靜派",
        "活在當下，溫柔而隨性",
        "敏感細膩，用行動代替語言表達",
        "討厭衝突，遇壓先撤退",
      ],
      love: "ISFP 的愛像一首即興詩：不喧嘩，卻處處是心思——為你畫的畫、挑的歌、一次計畫外的日落之旅。他們慢熱，需要足夠的安全感才會展露內心。愛情語言是「用心的陪伴與驚喜」：細節裡的溫柔勝過千言萬語。ISFP 不喜衝突，有不滿常憋在心裡，攢夠了會安靜離開。適合耐心、溫和、能主動引導他們說出感受的伴侶。",
      matches: [
        { type: "ENFJ", why: "溫暖引導，讓 ISFP 安心做自己" },
        { type: "ESTJ", why: "提供穩定與方向，托住 ISFP 的隨性" },
        { type: "ESFP", why: "雙倍當下主義，把日子過成藝術展" },
      ],
      careers: "設計 · 音樂 · 手工藝 · 攝影",
      faq: [
        {
          q: "ISFP 的 soulmate 是哪個類型？",
          a: "ENFJ 和 ESTJ 是經典答案：溫暖穩定的伴侶能給 ISFP 足夠的安全感敞開心扉，並溫柔地托住他們的自由靈魂。",
        },
        {
          q: "ISFP 的愛情語言（love language）是什麼？",
          a: "用心的細節與安靜的陪伴：為你做的歌單、精心挑選的小禮物、一場說走就走的日落。",
        },
        {
          q: "ISFP 怎麼處理矛盾？",
          a: "通常不處理——他們選擇撤退。耐心的伴侶溫和地邀請他們說出感受，才不會讓小委屈攢成安靜的離開。",
        },
      ],
    },
    en: {
      nickname: "The Adventurer",
      metaDesc: "ISFP (The Adventurer) personality decoded: core traits, love style and love language, best matches (ENFJ, ESTJ, ESFP), and the careers that fit them best.",
      traits: [
        "An artist's soul with quiet, impeccable taste",
        "Lives in the moment — gentle and easygoing",
        "Sensitive and perceptive; speaks through actions",
        "Hates conflict; retreats under pressure",
      ],
      love: "An ISFP's love is an improvised poem: quiet, but full of thought — a drawing made for you, a chosen song, an unplanned sunset trip. They warm up slowly and only reveal their inner world when they feel truly safe. Their love language is thoughtful companionship and small surprises: tenderness in details beats a thousand words. Conflict-averse, they bottle up grievances and may quietly leave when full. They suit a patient, gentle partner who can coax their feelings out instead of demanding them.",
      matches: [
        { type: "ENFJ", why: "Warm guidance lets the ISFP safely be themselves" },
        { type: "ESTJ", why: "Stability and direction that ground the ISFP's spontaneity" },
        { type: "ESFP", why: "Double live-in-the-moment energy — life as an art piece" },
      ],
      careers: "Design · Music · Craftsmanship · Photography",
      faq: [
        {
          q: "Who is ISFP's soulmate?",
          a: "ENFJ and ESTJ are the classic matches: warm, steady partners who give the ISFP safety to open up and gentle direction for their free spirit.",
        },
        {
          q: "What is ISFP's love language?",
          a: "Thoughtful gestures and quiet presence — a playlist made for you, a hand-picked gift, an unplanned trip to watch the sunset.",
        },
        {
          q: "How does an ISFP handle conflict?",
          a: "They usually don't — they withdraw. A patient partner who gently invites their feelings out, without pressure, keeps small hurts from becoming silent exits.",
        },
      ],
    },
  },

  ESTP: {
    color: "#E74C3C",
    zh: {
      nickname: "企业家",
      metaDesc: "ESTP 企业家人格全解析：核心特质、恋爱模式与爱情语言、最佳配对（ISFJ/ISTJ/ISTP）与适合的职业方向。",
      traits: [
        "行动优先，先做了再说",
        "刺激猎人，肾上腺素忠实用户",
        "现实敏锐，谈判与应变一流",
        "活在当下，长期规划是明天的烦恼",
      ],
      love: "ESTP 的恋爱热烈直接：看上了就追，约会永远有新意，跟他们在一起绝不会无聊。他们活在当下，爱的表达是即时的快乐——惊喜、冒险、肢体接触。爱情语言是「共享体验」：一起玩、一起疯、一起把每个周末过成大片。挑战在于承诺与平淡期：ESTP 需要学会在新鲜感退潮后深耕关系。适合能跟上节奏、又能在关键时刻稳住他们的伴侣。",
      matches: [
        { type: "ISFJ", why: "温柔稳定，是 ESTP 浪完之后的港湾" },
        { type: "ISTJ", why: "提供秩序与规划，补上 ESTP 的短板" },
        { type: "ISTP", why: "双实感行动派，玩到一起也扛事" },
      ],
      careers: "销售 · 创业 · 运动竞技 · 应急行业",
      faq: [
        {
          q: "ESTP 的 soulmate 是哪个类型？",
          a: "ISFJ 和 ISTJ 是经典答案：稳定温柔的类型能接住 ESTP 的不安分，并欣赏他们的活力而不是害怕它。",
        },
        {
          q: "ESTP 的爱情语言（love language）是什么？",
          a: "共享体验。冒险、惊喜、肢体接触——ESTP 的爱就是把和你在一起的日子过成高光集锦。",
        },
        {
          q: "ESTP 能长久专一吗？",
          a: "能——当他们发现深耕关系本身也是一种刺激。成熟的 ESTP 会把能量投入和伴侣一起建设，而不是追逐下一个兴奋点。",
        },
      ],
    },
    tw: {
      nickname: "企業家",
      metaDesc: "ESTP 企業家人格全解析：核心特質、戀愛模式與愛情語言、最佳配對（ISFJ/ISTJ/ISTP）與適合的職業方向。",
      traits: [
        "行動優先，先做了再說",
        "刺激獵人，腎上腺素忠實用戶",
        "現實敏銳，談判與應變一流",
        "活在當下，長期規畫是明天的煩惱",
      ],
      love: "ESTP 的戀愛熱烈直接：看上了就追，約會永遠有新意，跟他們在一起絕不會無聊。他們活在當下，愛的表達是即時的快樂——驚喜、冒險、肢體接觸。愛情語言是「共享體驗」：一起玩、一起瘋、一起把每個週末過成大片。挑戰在於承諾與平淡期：ESTP 需要學會在新鮮感退潮後深耕關係。適合能跟上節奏、又能在關鍵時刻穩住他們的伴侶。",
      matches: [
        { type: "ISFJ", why: "溫柔穩定，是 ESTP 浪完之後的港灣" },
        { type: "ISTJ", why: "提供秩序與規畫，補上 ESTP 的短板" },
        { type: "ISTP", why: "雙實感行動派，玩到一起也扛事" },
      ],
      careers: "銷售 · 創業 · 運動競技 · 應急行業",
      faq: [
        {
          q: "ESTP 的 soulmate 是哪個類型？",
          a: "ISFJ 和 ISTJ 是經典答案：穩定溫柔的類型能接住 ESTP 的不安分，並欣賞他們的活力而不是害怕它。",
        },
        {
          q: "ESTP 的愛情語言（love language）是什麼？",
          a: "共享體驗。冒險、驚喜、肢體接觸——ESTP 的愛就是把和你在一起的日子過成高光集錦。",
        },
        {
          q: "ESTP 能長久專一嗎？",
          a: "能——當他們發現深耕關係本身也是一種刺激。成熟的 ESTP 會把能量投入和伴侶一起建設，而不是追逐下一個興奮點。",
        },
      ],
    },
    en: {
      nickname: "The Entrepreneur",
      metaDesc: "ESTP (The Entrepreneur) personality decoded: core traits, love style and love language, best matches (ISFJ, ISTJ, ISTP), and the careers that fit them best.",
      traits: [
        "Action first, questions later",
        "A thrill hunter fueled by adrenaline",
        "Sharply perceptive; elite at negotiation and improvisation",
        "Lives in the now; long-term plans are tomorrow's problem",
      ],
      love: "An ESTP loves hot and direct: if they want you, they chase; dates are never boring, and life with them is one long adventure. Living in the moment, their affection is immediate — surprises, thrills, physical closeness. Their love language is shared experience: play hard, laugh loud, turn every weekend into a movie. The challenge is commitment and the boring middle: ESTPs must learn to deepen a relationship after the novelty fades. They suit a partner who can match their pace and steady them at key moments.",
      matches: [
        { type: "ISFJ", why: "Gentle and steady — the harbor an ESTP returns to" },
        { type: "ISTJ", why: "Order and planning to cover the ESTP's blind spots" },
        { type: "ISTP", why: "Two action-takers who play hard and handle business" },
      ],
      careers: "Sales · Entrepreneurship · Competitive Sports · Emergency Services",
      faq: [
        {
          q: "Who is ESTP's soulmate?",
          a: "ISFJ and ISTJ are the classic matches: steady, caring types who ground the ESTP's restlessness and appreciate their energy instead of fearing it.",
        },
        {
          q: "What is ESTP's love language?",
          a: "Shared experience. Adventures, surprises, physical affection — an ESTP loves by making life with you feel like a highlight reel.",
        },
        {
          q: "Can an ESTP commit long-term?",
          a: "Yes — when they learn that depth is its own thrill. Mature ESTPs channel their energy into building with a partner instead of chasing the next rush.",
        },
      ],
    },
  },

  ESFP: {
    color: "#FF69B4",
    zh: {
      nickname: "表演者",
      metaDesc: "ESFP 表演者人格全解析：核心特质、恋爱模式与爱情语言、最佳配对（ISTJ/ISFJ/ESTP）与适合的职业方向。",
      traits: [
        "派对灵魂，快乐制造机",
        "五感敏锐，生活美学实践者",
        "热情慷慨，对朋友两肋插刀",
        "讨厌严肃沉重，逃避负面话题",
      ],
      love: "ESFP 把恋爱变成一场永不落幕的派对：每天庆祝在一起，惊喜与仪式感不断。他们的爱直接、热烈、毫无保留，喜欢你时全世界都看得出来。爱情语言是「赞美与陪伴」：夸他们、陪他们玩、回应他们的热情，就是最大的爱。ESFP 回避沉重话题，遇到矛盾倾向用快乐掩盖，需要伴侣温柔地把对话引回正轨。适合欣赏他们的光、并能一起面对现实课题的人。",
      matches: [
        { type: "ISTJ", why: "稳定可靠，给 ESFP 安心的底座" },
        { type: "ISFJ", why: "细腻照顾，接住 ESFP 的热情" },
        { type: "ESTP", why: "双倍快乐，把生活过成狂欢节" },
      ],
      careers: "表演 · 活动策划 · 服务 · 直播",
      faq: [
        {
          q: "ESFP 的 soulmate 是哪个类型？",
          a: "ISTJ 和 ISFJ 是经典答案：踏实深情的类型给 ESFP 安心的底座，同时真心欣赏他们的光芒。",
        },
        {
          q: "ESFP 的爱情语言（love language）是什么？",
          a: "赞美与高质量陪伴。夸他们、陪他们玩、回应他们的热情——被宠爱的 ESFP 会加倍宠回来。",
        },
        {
          q: "和 ESFP 恋爱前要知道什么？",
          a: "他们回避沉重话题，习惯用快乐掩盖矛盾。爱他们的光，也要在关键时刻温柔地把对话拉回现实。",
        },
      ],
    },
    tw: {
      nickname: "表演者",
      metaDesc: "ESFP 表演者人格全解析：核心特質、戀愛模式與愛情語言、最佳配對（ISTJ/ISFJ/ESTP）與適合的職業方向。",
      traits: [
        "派對靈魂，快樂製造機",
        "五感敏銳，生活美學實踐者",
        "熱情慷慨，對朋友兩肋插刀",
        "討厭嚴肅沉重，逃避負面話題",
      ],
      love: "ESFP 把戀愛變成一場永不落幕的派對：每天慶祝在一起，驚喜與儀式感不斷。他們的愛直接、熱烈、毫無保留，喜歡你時全世界都看得出來。愛情語言是「讚美與陪伴」：誇他們、陪他們玩、回應他們的熱情，就是最大的愛。ESFP 迴避沉重話題，遇到矛盾傾向用快樂掩蓋，需要伴侶溫柔地把對話引回正軌。適合欣賞他們的光、並能一起面對現實課題的人。",
      matches: [
        { type: "ISTJ", why: "穩定可靠，給 ESFP 安心的底座" },
        { type: "ISFJ", why: "細膩照顧，接住 ESFP 的熱情" },
        { type: "ESTP", why: "雙倍快樂，把生活過成狂歡節" },
      ],
      careers: "表演 · 活動策劃 · 服務 · 直播",
      faq: [
        {
          q: "ESFP 的 soulmate 是哪個類型？",
          a: "ISTJ 和 ISFJ 是經典答案：踏實深情的類型給 ESFP 安心的底座，同時真心欣賞他們的光芒。",
        },
        {
          q: "ESFP 的愛情語言（love language）是什麼？",
          a: "讚美與高品質陪伴。誇他們、陪他們玩、回應他們的熱情——被寵愛的 ESFP 會加倍寵回來。",
        },
        {
          q: "和 ESFP 戀愛前要知道什麼？",
          a: "他們迴避沉重話題，習慣用快樂掩蓋矛盾。愛他們的光，也要在關鍵時刻溫柔地把對話拉回現實。",
        },
      ],
    },
    en: {
      nickname: "The Entertainer",
      metaDesc: "ESFP (The Entertainer) personality decoded: core traits, love style and love language, best matches (ISTJ, ISFJ, ESTP), and the careers that fit them best.",
      traits: [
        "The soul of every party — a joy generator",
        "All five senses tuned; a connoisseur of life's pleasures",
        "Warm and generous — rides hard for friends",
        "Avoids heavy topics; dodges negativity",
      ],
      love: "An ESFP turns love into a never-ending party: celebrating \"us\" daily, with constant surprises and little rituals. Their love is direct, warm and all-in — when they like you, the whole world can tell. Their love language is praise and presence: compliment them, play with them, answer their enthusiasm. ESFPs dodge heavy topics and tend to paper over conflict with fun; they need a partner who gently steers the conversation back when it matters. They suit someone who loves their light — and can face real life together.",
      matches: [
        { type: "ISTJ", why: "Stable and reliable — a base the ESFP can trust" },
        { type: "ISFJ", why: "Attentive care that catches all the ESFP's enthusiasm" },
        { type: "ESTP", why: "Double the fun — life as a nonstop carnival" },
      ],
      careers: "Performance · Event Planning · Service · Live Streaming",
      faq: [
        {
          q: "Who is ESFP's soulmate?",
          a: "ISTJ and ISFJ are the classic matches: grounded, devoted types who give the ESFP a safe base while genuinely enjoying their sparkle.",
        },
        {
          q: "What is ESFP's love language?",
          a: "Praise and quality time. Compliment them, join the fun, and answer their enthusiasm — an adored ESFP adores you back twice as hard.",
        },
        {
          q: "What should you know before dating an ESFP?",
          a: "They dodge heavy conversations and cover conflict with fun. Love their light, but gently pull them into real talk when it matters.",
        },
      ],
    },
  },
};
