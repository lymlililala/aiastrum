// ===== AI 面相/手相分析 数据层 =====
// MVP 采用"预设特征库 + AI文案生成"策略
// 免责声明：本分析仅供娱乐，不代表专业指导意见。

export type AnalysisMode = "face" | "palm";

// ===== 面相特征库 =====
export interface FaceFeature {
  id: string;
  category: string;
  name: string;
  traits: string[];
}

export const FACE_FEATURES: FaceFeature[] = [
  {
    id: "forehead",
    category: "额头",
    name: "天庭",
    traits: ["宽阔饱满", "高挺圆润", "稍显窄细", "天庭开阔"],
  },
  {
    id: "eyes",
    category: "眼睛",
    name: "眼神",
    traits: ["眼神明亮深邃", "眼角上扬有神", "眼珠清澈有光", "双眸灵动"],
  },
  {
    id: "nose",
    category: "鼻子",
    name: "中正山根",
    traits: ["鼻梁高挺", "鼻头圆润", "山根平直", "鼻翼适中"],
  },
  {
    id: "mouth",
    category: "嘴巴",
    name: "唇形",
    traits: ["嘴角微扬", "唇形丰润", "口齿整洁", "人中深长"],
  },
  {
    id: "ears",
    category: "耳朵",
    name: "福耳",
    traits: ["耳垂丰厚", "耳廓分明", "双耳对称", "耳色红润"],
  },
  {
    id: "face_shape",
    category: "脸型",
    name: "骨相",
    traits: ["骨骼清秀", "轮廓立体", "面相开阔", "气质出众"],
  },
];

// ===== 手相特征库 =====
export interface PalmFeature {
  id: string;
  lineName: string;
  description: string;
  interpretations: string[];
}

export const PALM_FEATURES: PalmFeature[] = [
  {
    id: "life_line",
    lineName: "生命线",
    description: "从拇指与食指之间延伸至手腕的曲线",
    interpretations: [
      "生命线清晰深长，预示体质强健、生命力旺盛",
      "生命线弧度饱满，身体能量充沛，适合挑战高强度事业",
      "生命线末端分叉，人生下半场将迎来重要转折与蜕变",
    ],
  },
  {
    id: "head_line",
    lineName: "智慧线",
    description: "横穿手掌中部的横纹",
    interpretations: [
      "智慧线绵长清晰，思维敏锐，逻辑能力出众，适合战略型工作",
      "智慧线向下弯曲，直觉力强，富有创造力与艺术天赋",
      "智慧线与生命线交叉点清晰，做事谨慎，善于计划",
    ],
  },
  {
    id: "heart_line",
    lineName: "感情线",
    description: "位于手指根部下方的横纹",
    interpretations: [
      "感情线深刻清晰，感情专一，一旦认定便全力付出",
      "感情线末端上翘，情感表达直接，感情生活活跃",
      "感情线有分叉，感情路上有波折，但终会遇见对的人",
    ],
  },
  {
    id: "fate_line",
    lineName: "命运线",
    description: "从手腕向中指方向延伸的纵纹",
    interpretations: [
      "命运线清晰笔直，人生目标明确，事业发展稳健",
      "命运线后天出现，大器晚成，三十岁后运势渐入佳境",
      "命运线有断点，人生充满变化，善于在转折中寻找机遇",
    ],
  },
  {
    id: "sun_line",
    lineName: "太阳线",
    description: "无名指下方的纵纹",
    interpretations: [
      "太阳线清晰，个人魅力出众，容易获得他人认可与支持",
      "太阳线与命运线并行，名利双收，事业与口碑俱佳",
    ],
  },
];

// ===== 五大天赋标签（社交货币）=====
export interface TalentLabel {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
  rarity: "普通" | "稀有" | "史诗" | "传说";
}

export const TALENT_LABELS: TalentLabel[] = [
  {
    id: "leader",
    name: "天生领袖",
    icon: "👑",
    color: "#FFD700",
    gradient: "linear-gradient(135deg, #FFD700, #FFA500)",
    description: "你的骨相与掌纹显示出极强的领导气场，天生具备统御众人的能量",
    rarity: "传说",
  },
  {
    id: "creative",
    name: "创意鬼才",
    icon: "🎨",
    color: "#FF6B9D",
    gradient: "linear-gradient(135deg, #FF6B9D, #C44BD8)",
    description: "灵感如泉涌，你的面相透露出超凡的艺术感知力与创意思维",
    rarity: "史诗",
  },
  {
    id: "empath",
    name: "情感天才",
    icon: "💫",
    color: "#7B68EE",
    gradient: "linear-gradient(135deg, #7B68EE, #4169E1)",
    description: "感情线深刻，你对他人情感的感知超越常人，是天生的情感智者",
    rarity: "史诗",
  },
  {
    id: "wise",
    name: "智慧导师",
    icon: "🔮",
    color: "#00CED1",
    gradient: "linear-gradient(135deg, #00CED1, #0080FF)",
    description: "智慧线绵长清晰，你的分析与洞察力令人信服，是天生的智囊型人才",
    rarity: "稀有",
  },
  {
    id: "lucky",
    name: "好运体质",
    icon: "✨",
    color: "#32CD32",
    gradient: "linear-gradient(135deg, #32CD32, #00A86B)",
    description: "面相中流露出旺盛的财运与贵人缘，人生往往逢凶化吉、遇难呈祥",
    rarity: "稀有",
  },
  {
    id: "charming",
    name: "魅力磁场",
    icon: "🌟",
    color: "#FF8C00",
    gradient: "linear-gradient(135deg, #FF8C00, #FF4500)",
    description: "你的五官与气质散发出独特的个人魅力，走到哪里都是焦点所在",
    rarity: "稀有",
  },
  {
    id: "entrepreneur",
    name: "商业天赋",
    icon: "💎",
    color: "#00BFFF",
    gradient: "linear-gradient(135deg, #00BFFF, #1E90FF)",
    description: "命运线与财运线的交汇点预示着你天生的商业嗅觉与财富积累潜力",
    rarity: "史诗",
  },
  {
    id: "healer",
    name: "治愈系人格",
    icon: "🌸",
    color: "#FF69B4",
    gradient: "linear-gradient(135deg, #FF69B4, #DA70D6)",
    description: "你的面相透露出温柔治愈的能量，具备天然的亲和力与安抚他人的力量",
    rarity: "普通",
  },
];

// ===== 各维度评分维度 =====
export interface DimensionScore {
  name: string;
  icon: string;
  score: number; // 0-100
  label: string;
  insight: string;
}

export const DIMENSION_TEMPLATES = {
  face: [
    { name: "事业运", icon: "💼" },
    { name: "财富运", icon: "💰" },
    { name: "感情运", icon: "❤️" },
    { name: "健康运", icon: "🌿" },
    { name: "贵人缘", icon: "🤝" },
  ],
  palm: [
    { name: "生命活力", icon: "⚡" },
    { name: "智慧潜能", icon: "🧠" },
    { name: "情感指数", icon: "💕" },
    { name: "命运走势", icon: "🌙" },
    { name: "财富磁场", icon: "✨" },
  ],
};

// ===== AI 报告结构 =====
export interface FaceReadingReport {
  mode: AnalysisMode;
  talentLabel: TalentLabel;
  overallScore: number; // 0-100
  dimensions: DimensionScore[];
  overview: string; // 总体解读（200字以内）
  strengths: string[]; // 三大优势
  opportunities: string[]; // 三大机遇
  lifeQuote: string; // 专属人生格言
  shareText: string; // 适合朋友圈的分享文案
  disclaimer: string;
}

// ===== Mock 报告生成（MVP阶段不依赖真实AI API）=====

// 基于输入的哈希种子，生成确定性随机数
function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash) / 2147483647;
}

// 基于种子从数组中选取元素
function pickFromArray<T>(arr: T[], seed: string, index = 0): T {
  const rng = seededRandom(seed + index);
  return arr[Math.floor(rng * arr.length)]!;
}

// 生成评分（70-98之间，让用户感觉好）
function generateScore(seed: string, dimension: string): number {
  const rng = seededRandom(seed + dimension);
  return Math.floor(70 + rng * 28); // 70-98
}

function getScoreLabel(score: number): string {
  if (score >= 95) return "神级";
  if (score >= 90) return "极强";
  if (score >= 85) return "很强";
  if (score >= 80) return "较强";
  if (score >= 75) return "良好";
  return "中等";
}

// ===== 面相洞察文案库 =====
const FACE_INSIGHTS = {
  "事业运": [
    "你额头宽阔，事业运势旺盛，上半年有重要晋升机遇",
    "眼神炯炯有神，领导气场强大，适合独立创业或带队管理",
    "鼻梁高挺端正，事业运稳步上升，坚持深耕必有所获",
    "面骨清秀、轮廓分明，凡事主动出击，贵人常伴左右",
  ],
  "财富运": [
    "耳垂丰厚圆润，财运亨通，今年有意外之财入账",
    "鼻头圆润饱满，偏财运强，投资理财方面有天然直觉",
    "人中清晰深长，守财能力极强，适合稳健型财富积累",
    "嘴角微微上扬，财运活跃，善于把握时机变现",
  ],
  "感情运": [
    "眼角上扬，桃花运旺，今年有不止一次的良缘机遇",
    "唇形丰润，情感表达真挚，感情生活甜蜜和谐",
    "面相温和，亲和力十足，是伴侣心中最安心的存在",
    "眉眼相配，感情线深刻，一旦认定便能白头偕老",
  ],
  "健康运": [
    "气色红润，精力充沛，身体状态正处于黄金时期",
    "眼神清亮，睡眠质量佳，内在能量储备充足",
    "面色平和，体质平衡，注重养生能让状态更上一层楼",
    "骨相健朗，体能强健，适合运动类爱好来释放能量",
  ],
  "贵人缘": [
    "额头圆满，贵人缘极旺，今年将遇到能改变命运的重要人物",
    "眉毛清秀，人际关系和谐，善于积累高质量人脉",
    "面相亲和，容易获得他人信任与帮助，贵人常不期而至",
    "双耳对称，善于倾听，口碑出众，贵人自然靠近",
  ],
};

const PALM_INSIGHTS = {
  "生命活力": [
    "生命线清晰深长，体质强健，生命力旺盛，身体是你最大的资本",
    "生命线弧度饱满，精力充沛，不容易疲惫，适合高强度工作",
    "生命线末端向外扩展，未来越活越精彩，人生下半场更精彩",
    "生命线与大鱼际相连，身体底子好，只要规律作息便能长保健康",
  ],
  "智慧潜能": [
    "智慧线绵长，思维极为敏锐，具备超强的分析能力与逻辑思维",
    "智慧线向下弯曲，直觉力与创造力兼备，是天生的创意思考者",
    "智慧线清晰无断点，思路清晰，做事有条不紊，是难得的执行型智者",
    "智慧线分叉，多线程思维，能在不同领域展现出色的适应与学习能力",
  ],
  "情感指数": [
    "感情线深而清晰，感情专一而深沉，爱情里全力以赴",
    "感情线末端上扬，情感表达活跃，爱情生活丰富而有趣",
    "感情线较长，感情路上有波折，但越经历越懂如何去爱",
    "感情线与智慧线相交，理性与感性并重，感情中的你既浪漫又成熟",
  ],
  "命运走势": [
    "命运线清晰笔直，人生方向明确，事业发展稳中有进",
    "命运线后段更清晰，大器晚成之相，三十五岁后进入人生黄金期",
    "命运线有轻微折线，人生充满变数，但每次转折都是新的机遇",
    "命运线与太阳线并行，名利双收，事业与社会认可同步提升",
  ],
  "财富磁场": [
    "财运线明显，财富积累能力强，善于把握投资时机",
    "大鱼际丰满，财富来源多元，正财偏财皆有斩获",
    "手掌厚实，财富积累稳健，属于越到后期越有钱的类型",
    "金星丘丰满，消费品味高，善于以钱生钱，财富观念超前",
  ],
};

// ===== 洞察文案选择 =====
type InsightLibrary = Record<string, string[]>;

function getInsight(
  dimension: string,
  seed: string,
  mode: AnalysisMode
): string {
  const library: InsightLibrary =
    mode === "face"
      ? (FACE_INSIGHTS as InsightLibrary)
      : (PALM_INSIGHTS as InsightLibrary);
  const pool = library[dimension] ?? ["此维度能量正在汇聚，未来可期"];
  return pickFromArray(pool, seed + dimension);
}

// ===== 人生格言库 =====
const LIFE_QUOTES = [
  "你生来就是要发光的，不要让任何人熄灭你的光芒。",
  "你的面相里藏着宇宙对你的偏爱，勇敢去接收这份礼物。",
  "每一条掌纹都是命运写给你的信，读懂它，活出它。",
  "你是独一无二的存在，这个世界需要你本来的样子。",
  "相由心生，你的善意与智慧已写在了每一个细节里。",
  "命运从不随机，你的每一次选择都在雕刻更好的自己。",
  "宇宙最偏爱有准备的人，而你，已经准备好了。",
  "你额头上写着一个故事，那是一个关于破茧成蝶的故事。",
  "你的手掌就是你的地图，每条纹路都指向更好的未来。",
  "AI 看见了你面相里的秘密：你比你想象的更有潜力。",
];

// ===== 分享文案库 =====
const SHARE_TEXTS = [
  "AI 扫描了我的{mode}，说我是【{talent}】！你也来测测看？",
  "震惊！AI 面相分析说我的{talent}排名前{percent}% 🤯 链接在评论",
  "刚测了 AI {mode}分析，给我贴了【{talent}】的标签，这也太准了吧…",
  "原来我面相里藏着【{talent}】的秘密，AI 说的，不是我吹 ✨",
  "AI 告诉我：你是人群中那{percent}%的{talent}体质，信了信了",
];

function generateShareText(
  mode: AnalysisMode,
  talent: string,
  seed: string
): string {
  const template = pickFromArray(SHARE_TEXTS, seed + "share");
  const percent = Math.floor(seededRandom(seed + "percent") * 15) + 3; // 3-18%
  const modeName = mode === "face" ? "面相" : "手相";
  return template
    .replace("{mode}", modeName)
    .replace("{talent}", talent)
    .replace("{percent}", String(percent));
}

// ===== 优势文案库 =====
const STRENGTH_POOL = [
  "直觉敏锐，能在第一时间感知机遇",
  "领导力天赋突出，善于凝聚团队力量",
  "情商极高，人际关系处理得当",
  "创造力爆棚，解决问题总有奇思妙想",
  "执行力强，承诺的事情必然落地",
  "学习能力超强，新技能上手极快",
  "财商出众，天生具备财富积累的嗅觉",
  "抗压能力极强，越挫越勇",
  "亲和力十足，走到哪里都能成为核心",
  "战略眼光独到，总能看到别人看不到的机会",
  "审美水准超高，生活与工作皆有品质",
  "记忆力惊人，善于在细节中发现价值",
];

// ===== 机遇文案库 =====
const OPPORTUNITY_POOL = [
  "今年下半年，有一次改变人生轨迹的重要机遇",
  "贵人将在意想不到的场合出现，把握每次社交机会",
  "副业转正的时机正在成熟，勇敢迈出那一步",
  "感情方面有新的进展，主动出击胜过被动等待",
  "投资眼光将在未来12个月内大放异彩",
  "跨界合作将带来意外之喜，不要局限在舒适圈内",
  "健康运势提升期到来，是制定健康计划的最佳时机",
  "学习深造将成为命运的转折点，知识是最好的投资",
  "国际化机遇悄然临近，开放视野方能把握未来",
  "创业时机渐趋成熟，天时地利人和皆在汇聚",
];

// ===== 生成完整报告 =====
export function generateMockReport(
  mode: AnalysisMode,
  seed: string
): FaceReadingReport {
  const talentLabel = pickFromArray(TALENT_LABELS, seed + "talent");
  const overallScore = generateScore(seed, "overall");
  const dimensions_template = DIMENSION_TEMPLATES[mode];

  const dimensions: DimensionScore[] = dimensions_template.map((dim) => {
    const score = generateScore(seed, dim.name);
    return {
      name: dim.name,
      icon: dim.icon,
      score,
      label: getScoreLabel(score),
      insight: getInsight(dim.name, seed, mode),
    };
  });

  const strengths = [
    pickFromArray(STRENGTH_POOL, seed + "str0", 0),
    pickFromArray(STRENGTH_POOL, seed + "str1", 1),
    pickFromArray(STRENGTH_POOL, seed + "str2", 2),
  ].filter((v, i, a) => a.indexOf(v) === i);

  const opportunities = [
    pickFromArray(OPPORTUNITY_POOL, seed + "opp0", 0),
    pickFromArray(OPPORTUNITY_POOL, seed + "opp1", 1),
    pickFromArray(OPPORTUNITY_POOL, seed + "opp2", 2),
  ].filter((v, i, a) => a.indexOf(v) === i);

  const lifeQuote = pickFromArray(LIFE_QUOTES, seed + "quote");
  const shareText = generateShareText(mode, talentLabel.name, seed);

  const modeName = mode === "face" ? "面相" : "手相";
  const overview =
    `AI 深度扫描你的${modeName}后发现：你的整体运势指数高达 ${overallScore} 分，` +
    `在${talentLabel.name}方面拥有超凡天赋。` +
    `你的骨相轮廓与掌纹特征共同呈现出一种独特的能量场，` +
    `这种能量场在人群中仅有极少数人具备。` +
    `未来12个月，你将迎来人生的重要节点，把握好这次窗口期，` +
    `你的命运将迎来质的飞跃。`;

  return {
    mode,
    talentLabel,
    overallScore,
    dimensions,
    overview,
    strengths,
    opportunities,
    lifeQuote,
    shareText,
    disclaimer: "⚠️ 本分析仅供娱乐参考，不代表专业指导意见。",
  };
}
