/**
 * 姻缘占卜 - 核心数据库
 * 星座、五行、巴纳姆效应文案、姻缘模板
 */

// ===== 星座数据 =====
export interface ZodiacSign {
  name: string;
  nameEn: string;
  symbol: string;
  element: "火" | "土" | "风" | "水";
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  ruling: string;      // 主星
  traits: string[];    // 性格特质
  loveStyle: string;   // 恋爱风格
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    name: "白羊座", nameEn: "Aries", symbol: "♈",
    element: "火", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19,
    ruling: "火星", traits: ["热情主动", "勇于表达", "直率真诚", "追求刺激"],
    loveStyle: "你爱得直接且热烈，习惯主动出击，但也需要伴侣的正向回应来维持热情。",
  },
  {
    name: "金牛座", nameEn: "Taurus", symbol: "♉",
    element: "土", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20,
    ruling: "金星", traits: ["忠诚专一", "踏实稳重", "感性细腻", "重视安全感"],
    loveStyle: "你爱得缓慢而深刻，一旦认定就全情投入，对于感情极度珍视，渴望长久稳定的关系。",
  },
  {
    name: "双子座", nameEn: "Gemini", symbol: "♊",
    element: "风", startMonth: 5, startDay: 21, endMonth: 6, endDay: 20,
    ruling: "水星", traits: ["聪慧机敏", "善于沟通", "多才多艺", "渴望新鲜"],
    loveStyle: "你爱得充满好奇，需要在感情中保持智识上的刺激，伴侣要能与你的思维同频。",
  },
  {
    name: "巨蟹座", nameEn: "Cancer", symbol: "♋",
    element: "水", startMonth: 6, startDay: 21, endMonth: 7, endDay: 22,
    ruling: "月亮", traits: ["温柔体贴", "情感丰富", "保护欲强", "重视家庭"],
    loveStyle: "你爱得深沉且包容，把爱人放在内心最柔软的地方，全力守护这份珍贵的缘分。",
  },
  {
    name: "狮子座", nameEn: "Leo", symbol: "♌",
    element: "火", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22,
    ruling: "太阳", traits: ["自信热情", "慷慨大方", "忠诚护短", "渴望被爱"],
    loveStyle: "你爱得坦荡且高调，享受被伴侣宠爱与关注，同时也愿意将你的光芒毫无保留地给予对方。",
  },
  {
    name: "处女座", nameEn: "Virgo", symbol: "♍",
    element: "土", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22,
    ruling: "水星", traits: ["细心体贴", "务实理性", "追求完美", "默默付出"],
    loveStyle: "你爱得细腻而深刻，用行动而非语言表达爱意，总在不经意间为对方考虑到每一个细节。",
  },
  {
    name: "天秤座", nameEn: "Libra", symbol: "♎",
    element: "风", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22,
    ruling: "金星", traits: ["优雅迷人", "善于平衡", "渴望和谐", "重视美感"],
    loveStyle: "你爱得优雅且富有魅力，天生具有让人如沐春风的本领，在关系中追求平等与和谐。",
  },
  {
    name: "天蝎座", nameEn: "Scorpio", symbol: "♏",
    element: "水", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21,
    ruling: "冥王星", traits: ["深邃神秘", "专一执着", "洞察力强", "爱恨分明"],
    loveStyle: "你爱得专一且深邃，一旦爱上便是灵魂的完全交付，渴望与伴侣建立不可动摇的深度连接。",
  },
  {
    name: "射手座", nameEn: "Sagittarius", symbol: "♐",
    element: "火", startMonth: 11, startDay: 22, endMonth: 12, endDay: 21,
    ruling: "木星", traits: ["乐观开朗", "向往自由", "坦率直言", "博学多识"],
    loveStyle: "你爱得自由且真诚，需要一个能与你共同探索世界、尊重彼此空间的灵魂伴侣。",
  },
  {
    name: "摩羯座", nameEn: "Capricorn", symbol: "♑",
    element: "土", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19,
    ruling: "土星", traits: ["沉稳内敛", "责任心强", "踏实可靠", "目标明确"],
    loveStyle: "你爱得沉稳且有责任感，用实际行动证明你的心意，是那种会为爱情默默付出、始终如一的人。",
  },
  {
    name: "水瓶座", nameEn: "Aquarius", symbol: "♒",
    element: "风", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18,
    ruling: "天王星", traits: ["独立创新", "人道主义", "思维超前", "重视友谊"],
    loveStyle: "你爱得独特且深刻，渴望与伴侣在精神层面高度契合，在爱情中保有独立自我而非失去自己。",
  },
  {
    name: "双鱼座", nameEn: "Pisces", symbol: "♓",
    element: "水", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20,
    ruling: "海王星", traits: ["浪漫感性", "富有同情心", "直觉敏锐", "梦想主义"],
    loveStyle: "你爱得纯粹且浪漫，拥有天生的共情能力，能感受到伴侣内心最细微的情绪波动。",
  },
];

// 根据生日获取星座
export function getZodiacSign(month: number, day: number): ZodiacSign {
  return (
    ZODIAC_SIGNS.find(z => {
      if (z.startMonth === z.endMonth) {
        return month === z.startMonth && day >= z.startDay && day <= z.endDay;
      }
      if (month === z.startMonth) return day >= z.startDay;
      if (month === z.endMonth) return day <= z.endDay;
      return false;
    }) ?? ZODIAC_SIGNS[11]!
  );
}

// ===== 天干地支 & 五行 =====
export const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"] as const;
export const DI_ZHI  = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"] as const;

export const GAN_WUXING: Record<string, string> = {
  甲: "木", 乙: "木", 丙: "火", 丁: "火", 戊: "土",
  己: "土", 庚: "金", 辛: "金", 壬: "水", 癸: "水",
};

export const ZHI_WUXING: Record<string, string> = {
  子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火",
  午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水",
};

export function getYearGanzhi(year: number): { gan: string; zhi: string } {
  const ganIdx = ((year - 4) % 10 + 10) % 10;
  const zhiIdx = ((year - 4) % 12 + 12) % 12;
  return { gan: TIAN_GAN[ganIdx]!, zhi: DI_ZHI[zhiIdx]! };
}

// ===== 加载文案 =====
export const LOVE_LOADING_TEXTS = [
  "正在解析您的星盘相位…",
  "计算金星与火星的角度…",
  "寻找命中注定的磁场频率…",
  "分析您的姻缘宫位走向…",
  "解读紫微斗数桃花星…",
  "感应月亮对您情感的影响…",
  "匹配您的命定之人特征…",
  "报告即将生成，请稍候…",
];

// ===== 信任背书滚动文案 =====
export const TRUST_REVIEWS = [
  { name: "林**", time: "刚刚", text: "太准了！感觉说的就是我，连遇见的场景都描述得很像！" },
  { name: "张**", time: "2分钟前", text: "没想到这么细致，正缘画像真的让我心动了一下…" },
  { name: "陈**", time: "5分钟前", text: "一直觉得感情运不好，测完之后感觉开朗了很多，谢谢！" },
  { name: "王**", time: "8分钟前", text: "朋友推荐来的，确实比其他测试准多了，内容很有深度。" },
  { name: "刘**", time: "12分钟前", text: "报告里提到的相遇场景，和我最近的经历好像…仔细想想真的挺神奇的。" },
  { name: "赵**", time: "15分钟前", text: "文笔很好，读起来有种被懂得的感觉，推荐！" },
  { name: "孙**", time: "20分钟前", text: "花了9.9值回票价，分享给了我闺蜜，她也在测！" },
  { name: "李**", time: "28分钟前", text: "性格特质写的太像我了，分享到朋友圈大家都说准！" },
];

// ===== 巴纳姆效应性格描述（通用但让人觉得精准） =====
export const BARNUM_TRAITS: Record<string, string[]> = {
  female: [
    "你外表看起来平静温和，但内心世界其实比大多数人想象中更丰富、更敏感。你能感受到旁人感受不到的细腻情绪。",
    "你对感情有一种与生俱来的直觉，往往第一眼就能感受到某段关系是否值得深入，但有时你的理性又会压制这种直觉。",
    "你渴望一段真正的深度连接，而非表面的甜蜜。你不愿将就，但偶尔又会担心自己的标准是否太高。",
    "你在对的人面前会展现出意想不到的可爱与脆弱，但在不熟悉的人面前，你总是保持着一层隐形的距离。",
    "你对爱情有着属于自己的理解，既有少女般的浪漫幻想，也有成熟女性的清醒认知，两者在你身上共存着。",
  ],
  male: [
    "你在感情中习惯用行动而非语言表达，外表冷静的你内心深处对感情其实比大多数人更在意。",
    "你在爱情方面有时会显得犹豫，这不是因为你不在乎，而是因为你非常清楚自己在选择什么，不愿草率。",
    "你渴望一段能给你内心安定感的关系，希望找到一个懂你沉默的人，无需太多解释便能被理解。",
    "你对感情忠诚而专一，一旦认定了便很难轻易改变，这是你的优点，有时也会让你承受更多。",
    "你内心藏着一些对爱情的期待，但你很少说出口，因为你觉得真正对的人会自然感受到。",
  ],
};

// ===== 姻缘评分维度 =====
export interface LoveScore {
  overall: number;      // 综合姻缘指数 (0-100)
  peach:   number;      // 桃花指数 (0-5)
  timing:  number;      // 时机指数 (0-5)
  depth:   number;      // 深度缘分 (0-5)
  label:   string;      // 综合标签
  labelColor: string;
  shortComment: string; // 一句话短评（免费版展示）
}

// ===== 正缘画像 =====
export interface SoulmatePicture {
  appearance: string;   // 外貌特征
  personality: string;  // 性格倾向
  career: string;       // 可能职业
  meetScene: string;    // 相遇场景
  meetTiming: string;   // 相遇时机
}

// ===== 近期桃花运 =====
export interface PeachBlossomForecast {
  month1: string;  // 第1个月
  month2: string;  // 第2个月
  month3: string;  // 第3个月
  peak: string;    // 桃花旺盛期
  advice: string;  // 提升建议
}

// ===== 专属情感建议 =====
export interface LoveAdvice {
  strength: string;    // 感情优势
  weakness: string;    // 需要改善
  action: string;      // 行动建议
  affirmation: string; // 正向肯定语
}

// ===== 完整报告数据结构 =====
export interface LoveReport {
  // 用户信息
  name: string;
  gender: "female" | "male";
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  zodiac: ZodiacSign;
  yearGanzhi: { gan: string; zhi: string };
  // 评分（免费可见）
  score: LoveScore;
  // 性格特质（免费可见部分）
  personalityTrait: string;
  peachForecast: PeachBlossomForecast;
  soulmate: SoulmatePicture;
  loveAdvice: LoveAdvice;
  // AI 增强（可选）
  aiEnhanced?: string;
}

// ===== 评分标签配置 =====
export const SCORE_LABELS = [
  { min: 90, label: "姻缘极旺", color: "#FF6B6B", comment: "你的姻缘磁场正处于罕见的高峰期，命中正缘已在向你靠近的路上。" },
  { min: 80, label: "桃花盛开", color: "#FF8E53", comment: "近期桃花运旺盛，有极大概率在意想不到的场合与命定之人相遇。" },
  { min: 70, label: "缘分涌动", color: "#C56BFF", comment: "你的感情磁场已在微妙调整中，正缘的信号正在宇宙中集结。" },
  { min: 60, label: "蓄势待发", color: "#6B9DFF", comment: "你的姻缘处于蓄积期，看似平静的水面下正酝酿着美好的相遇。" },
  { min: 0,  label: "静待花开", color: "#8BC34A", comment: "此刻的你正在用沉淀来迎接更好的相遇，深根才能结出最美的果。" },
];

// ===== 正缘特征模板库 =====
export const SOULMATE_APPEARANCE: Record<string, string[]> = {
  female_火: [
    "五官立体有轮廓感，目光炯炯有神，整体气质阳光且充满活力，笑起来特别有感染力。",
    "身材挺拔，眉宇间透着一股英气，脸上常带着自信的微笑，第一眼便让人印象深刻。",
  ],
  female_土: [
    "五官精致温润，眼神沉静而温柔，整体散发着成熟稳重的气质，让人感觉踏实可靠。",
    "相貌周正，身形稳健，眼神里有一种让人安心的力量，属于越看越耐看的类型。",
  ],
  female_风: [
    "五官清秀灵动，眼睛明亮有神，整体气质清爽俊逸，言谈举止间透着聪慧的光芒。",
    "外形修长利落，相貌清朗，笑容爽朗，属于让人如沐春风、越相处越有好感的类型。",
  ],
  female_水: [
    "五官柔和细腻，眼神深邃而温柔，整体散发着神秘而内敛的气质，让人忍不住想了解。",
    "气质沉静如水，外表温文尔雅，笑起来有一种安抚人心的力量，让你感到前所未有的安全感。",
  ],
  male_火: [
    "五官精致秀美，眼神清澈明亮，笑起来温柔甜美，整体气质清新而有亲和力。",
    "相貌甜美动人，眉眼间透着温柔，整体散发着令人心生好感的清甜气质。",
  ],
  male_土: [
    "五官端庄秀丽，气质知性沉稳，眼神温暖而有深度，属于越了解越有魅力的类型。",
    "外表温润大方，相貌耐看，举止从容优雅，散发着让人心生信赖的温柔力量。",
  ],
  male_风: [
    "五官灵动活泼，眼睛会说话，笑起来阳光明媚，整体气质活泼而有感染力。",
    "相貌清丽，性格开朗，言谈风趣，属于让人越相处越觉得快乐的暖心存在。",
  ],
  male_水: [
    "五官秀气温柔，眼神如水般清澈，整体气质温婉细腻，有一种让人想靠近的柔和力量。",
    "外表清丽脱俗，气质安静内敛，笑容温婉，属于让你感到心灵被治愈的类型。",
  ],
};

export const SOULMATE_PERSONALITY = [
  "内心成熟稳定，情绪管理能力强，不会轻易将负面情绪带入关系中，相处起来让你感到轻松自在。",
  "有担当有责任感，会用实际行动表达爱意，而非仅仅停留在口头承诺，你在他/她身边会感到踏实。",
  "懂得欣赏你的独特性，不试图改变你，能在你低落时给予恰到好处的陪伴和支持。",
  "有自己的想法和生活重心，不会过度依赖，两个人保有独立的同时又能深度连接，这让你们的关系更健康。",
  "幽默感适中，能让日常生活充满轻松的笑声，又不失认真对待感情的一面。",
];

export const SOULMATE_CAREERS = [
  "文创/设计/艺术类", "教育/学术/研究类", "医疗/健康/公益类",
  "金融/商务/管理类", "技术/互联网/工程类", "传媒/公关/市场类",
  "法律/政府/咨询类", "旅游/文化/服务类",
];

export const MEET_SCENES = [
  "在一个让你感到放松和开心的社交场合，可能是朋友聚会、兴趣小组或某个共同喜爱的活动现场。",
  "在你专注于某件自己热爱的事情时，对方恰好也在同一个空间，缘分就这样悄然而至。",
  "可能是通过共同朋友的引荐，在一次轻松愉快的饭局或聚会中初次相识，后来越走越近。",
  "在一个你意想不到的日常场景中——也许是书店、咖啡馆、运动场所或某个展览现场。",
  "在你旅行或尝试新事物的过程中，对方也恰好出现在那个特别的地方。",
];

// ===== 情感建议库 =====
export const LOVE_STRENGTHS = [
  "你对感情真诚且投入，这是最难得的品质。真正适合你的人，一定会被你这份真诚深深打动。",
  "你拥有极强的共情能力，能感受到伴侣内心的需求，这让你在关系中成为那个让对方感到被懂得的人。",
  "你在感情中懂得付出，同时也在学习接受，这种平衡感正是维系长久关系的关键。",
];

export const LOVE_WEAKNESSES = [
  "有时你对感情的期待过高，建议试着放下心中那个完美剧本，让真实的相遇以它本来的样子到来。",
  "你偶尔会因为害怕受伤而构筑起防线，真正的缘分需要你勇敢地打开心门，脆弱也是一种力量。",
  "你有时会在感情萌芽期想得太多，不妨放慢节奏，用心感受当下的每一次相处，而非急于定义关系。",
];

export const LOVE_ACTIONS = [
  "接下来的两个月，尝试走进一个你平时不常涉足的社交圈，命中注定的相遇往往就隐藏在新的环境里。",
  "将注意力放在让自己快乐和充实的事情上——当你发光的时候，正确的人自然会被你吸引。",
  "试着对身边的一些可能性多一些开放的态度，有时候正缘并不是出现在戏剧性的瞬间，而是在不知不觉的相处中。",
];

export const LOVE_AFFIRMATIONS = [
  "你值得被珍视，值得被深爱。你的正缘正在赶来的路上，而你此刻的等待，将在未来某天变成最美好的故事开端。",
  "宇宙正在为你安排最适合的相遇，时机未到不代表缘分未到。相信自己，相信爱，最美的风景永远在转角之后。",
  "你今天为自己做的每一个关于爱的功课，都是在向命定的相遇迈进一步。爱，正在向你奔赴。",
];

// ===== 月份桃花文案 =====
export const PEACH_MONTHLY_TEXTS = {
  high: [
    "桃花能量极为旺盛，异性缘大幅提升，主动社交收获惊喜，有望遇见令你心动的人。",
    "感情运达到高峰，身边会有令你在意的人出现，把握主动接触的机会，缘分将水到渠成。",
    "磁场吸引力爆棚，你散发的气质将成为最强的桃花磁石，留意生活中某个突然频繁出现的身影。",
  ],
  medium: [
    "感情运稳步上升，保持好心态和积极社交，有机会在轻松愉快的氛围中邂逅合适的人。",
    "桃花处于积累期，虽不如旺盛期那般明显，但深层的缘分正在悄悄铺垫，耐心等待时机。",
    "感情上有新的可能性涌现，可能是一次有趣的对话打开了新的空间，保持轻松开放的心态。",
  ],
  low: [
    "感情运较为平稳，不必强求，将更多精力放在自我提升上，内在的充实是最好的桃花滋养。",
    "此月宜沉淀修炼，专注于让自己更好，向外散发的能量此刻需要重新校准和积累。",
    "感情上暂时平静，但平静不代表无缘。把这段时间用来整理内心，为下一段缘分做好准备。",
  ],
};
