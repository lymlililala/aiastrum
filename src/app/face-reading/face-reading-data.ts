// ===== AI 面相/手相分析 数据层 =====
// MVP 采用"预设特征库 + AI文案生成"策略
// 免责声明：本分析仅供娱乐，不代表专业指导意见。

export type AnalysisMode = "face" | "palm";
export type Lang = "zh" | "en" | "tw";

// 本地化字符串 / 字符串数组
type L = Record<Lang, string>;
type LArr = Record<Lang, string[]>;

function rs(v: L, lang: Lang): string {
  return v[lang];
}

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
// rarity 保留中文 KEY（"普通"|"稀有"|"史诗"|"传说"）：
// 组件按该 KEY 选取徽章配色/图标与本地化显示文案（见 FaceReport/FacePoster + i18n），
// 故 rarity 不翻译，仅 name/description 本地化。
export type Rarity = "普通" | "稀有" | "史诗" | "传说";

export interface TalentLabel {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
  rarity: Rarity;
}

interface RawTalentLabel {
  id: string;
  name: L;
  icon: string;
  color: string;
  gradient: string;
  description: L;
  rarity: Rarity;
}

const RAW_TALENT_LABELS: RawTalentLabel[] = [
  {
    id: "leader",
    name: { zh: "天生领袖", tw: "天生領袖", en: "Born Leader" },
    icon: "👑",
    color: "#FFD700",
    gradient: "linear-gradient(135deg, #FFD700, #FFA500)",
    description: {
      zh: "你的骨相与掌纹显示出极强的领导气场，天生具备统御众人的能量",
      tw: "你的骨相與掌紋顯示出極強的領導氣場，天生具備統御眾人的能量",
      en: "Your bone structure and palm lines reveal a powerful leadership aura — you are born with the energy to command and unite others.",
    },
    rarity: "传说",
  },
  {
    id: "creative",
    name: { zh: "创意鬼才", tw: "創意鬼才", en: "Creative Genius" },
    icon: "🎨",
    color: "#FF6B9D",
    gradient: "linear-gradient(135deg, #FF6B9D, #C44BD8)",
    description: {
      zh: "灵感如泉涌，你的面相透露出超凡的艺术感知力与创意思维",
      tw: "靈感如泉湧，你的面相透露出超凡的藝術感知力與創意思維",
      en: "Inspiration flows endlessly — your features reveal extraordinary artistic perception and creative thinking.",
    },
    rarity: "史诗",
  },
  {
    id: "empath",
    name: { zh: "情感天才", tw: "情感天才", en: "Emotional Genius" },
    icon: "💫",
    color: "#7B68EE",
    gradient: "linear-gradient(135deg, #7B68EE, #4169E1)",
    description: {
      zh: "感情线深刻，你对他人情感的感知超越常人，是天生的情感智者",
      tw: "感情線深刻，你對他人情感的感知超越常人，是天生的情感智者",
      en: "With a deep heart line, your sensitivity to others' emotions surpasses the ordinary — you are a born emotional sage.",
    },
    rarity: "史诗",
  },
  {
    id: "wise",
    name: { zh: "智慧导师", tw: "智慧導師", en: "Wisdom Mentor" },
    icon: "🔮",
    color: "#00CED1",
    gradient: "linear-gradient(135deg, #00CED1, #0080FF)",
    description: {
      zh: "智慧线绵长清晰，你的分析与洞察力令人信服，是天生的智囊型人才",
      tw: "智慧線綿長清晰，你的分析與洞察力令人信服，是天生的智囊型人才",
      en: "Your long, clear head line marks convincing analysis and insight — a born strategic mind and trusted advisor.",
    },
    rarity: "稀有",
  },
  {
    id: "lucky",
    name: { zh: "好运体质", tw: "好運體質", en: "Lucky Aura" },
    icon: "✨",
    color: "#32CD32",
    gradient: "linear-gradient(135deg, #32CD32, #00A86B)",
    description: {
      zh: "面相中流露出旺盛的财运与贵人缘，人生往往逢凶化吉、遇难呈祥",
      tw: "面相中流露出旺盛的財運與貴人緣，人生往往逢凶化吉、遇難呈祥",
      en: "Your features radiate strong fortune and a knack for meeting helpful people — luck tends to turn misfortune into blessing for you.",
    },
    rarity: "稀有",
  },
  {
    id: "charming",
    name: { zh: "魅力磁场", tw: "魅力磁場", en: "Magnetic Charm" },
    icon: "🌟",
    color: "#FF8C00",
    gradient: "linear-gradient(135deg, #FF8C00, #FF4500)",
    description: {
      zh: "你的五官与气质散发出独特的个人魅力，走到哪里都是焦点所在",
      tw: "你的五官與氣質散發出獨特的個人魅力，走到哪裡都是焦點所在",
      en: "Your features and presence give off a one-of-a-kind charm — you become the center of attention wherever you go.",
    },
    rarity: "稀有",
  },
  {
    id: "entrepreneur",
    name: { zh: "商业天赋", tw: "商業天賦", en: "Business Talent" },
    icon: "💎",
    color: "#00BFFF",
    gradient: "linear-gradient(135deg, #00BFFF, #1E90FF)",
    description: {
      zh: "命运线与财运线的交汇点预示着你天生的商业嗅觉与财富积累潜力",
      tw: "命運線與財運線的交匯點預示著你天生的商業嗅覺與財富積累潛力",
      en: "Where your fate line meets your wealth line lies a born instinct for business and the potential to build real fortune.",
    },
    rarity: "史诗",
  },
  {
    id: "healer",
    name: { zh: "治愈系人格", tw: "治癒系人格", en: "Healing Soul" },
    icon: "🌸",
    color: "#FF69B4",
    gradient: "linear-gradient(135deg, #FF69B4, #DA70D6)",
    description: {
      zh: "你的面相透露出温柔治愈的能量，具备天然的亲和力与安抚他人的力量",
      tw: "你的面相透露出溫柔治癒的能量，具備天然的親和力與安撫他人的力量",
      en: "Your features carry a gentle, healing energy — a natural warmth and the power to soothe those around you.",
    },
    rarity: "普通",
  },
];

// 解析为面向组件的纯字符串天赋标签（rarity 维持 KEY 不变）
function resolveTalentLabel(raw: RawTalentLabel, lang: Lang): TalentLabel {
  return {
    id: raw.id,
    name: rs(raw.name, lang),
    icon: raw.icon,
    color: raw.color,
    gradient: raw.gradient,
    description: rs(raw.description, lang),
    rarity: raw.rarity,
  };
}

// 兼容旧引用：默认中文标签列表
export const TALENT_LABELS: TalentLabel[] = RAW_TALENT_LABELS.map((t) =>
  resolveTalentLabel(t, "zh"),
);

// ===== 各维度评分维度 =====
export interface DimensionScore {
  name: string;
  icon: string;
  score: number; // 0-100
  label: string;
  insight: string;
}

// 维度模板：key 作为稳定 ID（用于洞察文案查找），name 三语显示
interface DimensionTemplate {
  key: string;
  name: L;
  icon: string;
}

const DIMENSION_TEMPLATES: Record<AnalysisMode, DimensionTemplate[]> = {
  face: [
    { key: "career", name: { zh: "事业运", tw: "事業運", en: "Career" }, icon: "💼" },
    { key: "wealth", name: { zh: "财富运", tw: "財富運", en: "Wealth" }, icon: "💰" },
    { key: "love", name: { zh: "感情运", tw: "感情運", en: "Love" }, icon: "❤️" },
    { key: "health", name: { zh: "健康运", tw: "健康運", en: "Health" }, icon: "🌿" },
    { key: "connections", name: { zh: "贵人缘", tw: "貴人緣", en: "Connections" }, icon: "🤝" },
  ],
  palm: [
    { key: "vitality", name: { zh: "生命活力", tw: "生命活力", en: "Vitality" }, icon: "⚡" },
    { key: "wisdom", name: { zh: "智慧潜能", tw: "智慧潛能", en: "Wisdom" }, icon: "🧠" },
    { key: "emotion", name: { zh: "情感指数", tw: "情感指數", en: "Emotion" }, icon: "💕" },
    { key: "destiny", name: { zh: "命运走势", tw: "命運走勢", en: "Destiny" }, icon: "🌙" },
    { key: "fortune", name: { zh: "财富磁场", tw: "財富磁場", en: "Fortune" }, icon: "✨" },
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

const SCORE_LABELS: { min: number; label: L }[] = [
  { min: 95, label: { zh: "神级", tw: "神級", en: "Divine" } },
  { min: 90, label: { zh: "极强", tw: "極強", en: "Elite" } },
  { min: 85, label: { zh: "很强", tw: "很強", en: "Strong" } },
  { min: 80, label: { zh: "较强", tw: "較強", en: "Above Average" } },
  { min: 75, label: { zh: "良好", tw: "良好", en: "Good" } },
  { min: 0, label: { zh: "中等", tw: "中等", en: "Average" } },
];

function getScoreLabel(score: number, lang: Lang): string {
  const entry = SCORE_LABELS.find((e) => score >= e.min)!;
  return entry.label[lang];
}

// ===== 面相洞察文案库（按维度 key）=====
const FACE_INSIGHTS: Record<string, LArr> = {
  career: {
    zh: [
      "你额头宽阔，事业运势旺盛，上半年有重要晋升机遇",
      "眼神炯炯有神，领导气场强大，适合独立创业或带队管理",
      "鼻梁高挺端正，事业运稳步上升，坚持深耕必有所获",
      "面骨清秀、轮廓分明，凡事主动出击，贵人常伴左右",
    ],
    tw: [
      "你額頭寬闊，事業運勢旺盛，上半年有重要晉升機遇",
      "眼神炯炯有神，領導氣場強大，適合獨立創業或帶隊管理",
      "鼻梁高挺端正，事業運穩步上升，堅持深耕必有所獲",
      "面骨清秀、輪廓分明，凡事主動出擊，貴人常伴左右",
    ],
    en: [
      "Your broad forehead signals a thriving career, with a key promotion opportunity in the first half of the year.",
      "Your bright, piercing eyes carry strong leadership energy — ideal for founding a venture or leading a team.",
      "Your high, straight nose marks steady career growth; persistence and depth will surely pay off.",
      "Your refined bone structure and defined contours favor taking initiative, with mentors often by your side.",
    ],
  },
  wealth: {
    zh: [
      "耳垂丰厚圆润，财运亨通，今年有意外之财入账",
      "鼻头圆润饱满，偏财运强，投资理财方面有天然直觉",
      "人中清晰深长，守财能力极强，适合稳健型财富积累",
      "嘴角微微上扬，财运活跃，善于把握时机变现",
    ],
    tw: [
      "耳垂豐厚圓潤，財運亨通，今年有意外之財入帳",
      "鼻頭圓潤飽滿，偏財運強，投資理財方面有天然直覺",
      "人中清晰深長，守財能力極強，適合穩健型財富積累",
      "嘴角微微上揚，財運活躍，善於把握時機變現",
    ],
    en: [
      "Your full, rounded earlobes signal flowing fortune — an unexpected windfall may arrive this year.",
      "Your plump nose tip marks strong luck with side income and a natural instinct for investing.",
      "Your clear, deep philtrum shows strong wealth-keeping ability, suited to steady accumulation.",
      "Your slightly upturned mouth corners mean active fortune and a knack for cashing in at the right moment.",
    ],
  },
  love: {
    zh: [
      "眼角上扬，桃花运旺，今年有不止一次的良缘机遇",
      "唇形丰润，情感表达真挚，感情生活甜蜜和谐",
      "面相温和，亲和力十足，是伴侣心中最安心的存在",
      "眉眼相配，感情线深刻，一旦认定便能白头偕老",
    ],
    tw: [
      "眼角上揚，桃花運旺，今年有不止一次的良緣機遇",
      "唇形豐潤，情感表達真摯，感情生活甜蜜和諧",
      "面相溫和，親和力十足，是伴侶心中最安心的存在",
      "眉眼相配，感情線深刻，一旦認定便能白頭偕老",
    ],
    en: [
      "Your upturned eye corners signal strong romantic luck — more than one good match awaits this year.",
      "Your full lips reflect sincere emotional expression and a sweet, harmonious love life.",
      "Your gentle features and warmth make you the most reassuring presence to a partner.",
      "Your matching brows and eyes and deep heart line mean that once you commit, you stay for life.",
    ],
  },
  health: {
    zh: [
      "气色红润，精力充沛，身体状态正处于黄金时期",
      "眼神清亮，睡眠质量佳，内在能量储备充足",
      "面色平和，体质平衡，注重养生能让状态更上一层楼",
      "骨相健朗，体能强健，适合运动类爱好来释放能量",
    ],
    tw: [
      "氣色紅潤，精力充沛，身體狀態正處於黃金時期",
      "眼神清亮，睡眠品質佳，內在能量儲備充足",
      "面色平和，體質平衡，注重養生能讓狀態更上一層樓",
      "骨相健朗，體能強健，適合運動類愛好來釋放能量",
    ],
    en: [
      "Your rosy complexion and abundant energy show your body is in its prime.",
      "Your clear eyes reflect good sleep quality and ample inner energy reserves.",
      "Your calm complexion and balanced constitution will rise even higher with mindful wellness habits.",
      "Your sturdy frame and strong stamina suit active hobbies that release your energy.",
    ],
  },
  connections: {
    zh: [
      "额头圆满，贵人缘极旺，今年将遇到能改变命运的重要人物",
      "眉毛清秀，人际关系和谐，善于积累高质量人脉",
      "面相亲和，容易获得他人信任与帮助，贵人常不期而至",
      "双耳对称，善于倾听，口碑出众，贵人自然靠近",
    ],
    tw: [
      "額頭圓滿，貴人緣極旺，今年將遇到能改變命運的重要人物",
      "眉毛清秀，人際關係和諧，善於積累高品質人脈",
      "面相親和，容易獲得他人信任與幫助，貴人常不期而至",
      "雙耳對稱，善於傾聽，口碑出眾，貴人自然靠近",
    ],
    en: [
      "Your full forehead signals strong support from others — a life-changing person may cross your path this year.",
      "Your refined brows reflect harmonious relationships and a talent for building high-quality connections.",
      "Your approachable features earn trust and help easily, with mentors often appearing unexpectedly.",
      "Your symmetrical ears mark a good listener with a strong reputation, drawing supporters naturally.",
    ],
  },
};

const PALM_INSIGHTS: Record<string, LArr> = {
  vitality: {
    zh: [
      "生命线清晰深长，体质强健，生命力旺盛，身体是你最大的资本",
      "生命线弧度饱满，精力充沛，不容易疲惫，适合高强度工作",
      "生命线末端向外扩展，未来越活越精彩，人生下半场更精彩",
      "生命线与大鱼际相连，身体底子好，只要规律作息便能长保健康",
    ],
    tw: [
      "生命線清晰深長，體質強健，生命力旺盛，身體是你最大的資本",
      "生命線弧度飽滿，精力充沛，不容易疲憊，適合高強度工作",
      "生命線末端向外擴展，未來越活越精彩，人生下半場更精彩",
      "生命線與大魚際相連，身體底子好，只要規律作息便能長保健康",
    ],
    en: [
      "Your clear, deep life line marks a robust constitution and strong vitality — your body is your greatest asset.",
      "Your full life-line curve shows abundant energy that rarely tires, suited to high-intensity work.",
      "Your outward-reaching life line means life only gets richer — the second half of your life shines brighter.",
      "Your life line linked to the thenar shows a strong foundation; regular habits keep you healthy for years.",
    ],
  },
  wisdom: {
    zh: [
      "智慧线绵长，思维极为敏锐，具备超强的分析能力与逻辑思维",
      "智慧线向下弯曲，直觉力与创造力兼备，是天生的创意思考者",
      "智慧线清晰无断点，思路清晰，做事有条不紊，是难得的执行型智者",
      "智慧线分叉，多线程思维，能在不同领域展现出色的适应与学习能力",
    ],
    tw: [
      "智慧線綿長，思維極為敏銳，具備超強的分析能力與邏輯思維",
      "智慧線向下彎曲，直覺力與創造力兼備，是天生的創意思考者",
      "智慧線清晰無斷點，思路清晰，做事有條不紊，是難得的執行型智者",
      "智慧線分叉，多線程思維，能在不同領域展現出色的適應與學習能力",
    ],
    en: [
      "Your long head line marks an exceptionally sharp mind with powerful analytical and logical thinking.",
      "Your downward-curving head line blends intuition and creativity — a born creative thinker.",
      "Your clear, unbroken head line shows orderly thinking and execution — a rare doer-sage.",
      "Your forked head line reveals multi-track thinking, adapting and learning across many fields.",
    ],
  },
  emotion: {
    zh: [
      "感情线深而清晰，感情专一而深沉，爱情里全力以赴",
      "感情线末端上扬，情感表达活跃，爱情生活丰富而有趣",
      "感情线较长，感情路上有波折，但越经历越懂如何去爱",
      "感情线与智慧线相交，理性与感性并重，感情中的你既浪漫又成熟",
    ],
    tw: [
      "感情線深而清晰，感情專一而深沉，愛情裡全力以赴",
      "感情線末端上揚，情感表達活躍，愛情生活豐富而有趣",
      "感情線較長，感情路上有波折，但越經歷越懂如何去愛",
      "感情線與智慧線相交，理性與感性並重，感情中的你既浪漫又成熟",
    ],
    en: [
      "Your deep, clear heart line shows devoted, profound feelings — you give your all in love.",
      "Your upturned heart-line end means lively emotional expression and a rich, fun love life.",
      "Your long heart line brings ups and downs, but each experience teaches you how to love better.",
      "Your heart line crossing the head line balances reason and feeling — romantic yet mature in love.",
    ],
  },
  destiny: {
    zh: [
      "命运线清晰笔直，人生方向明确，事业发展稳中有进",
      "命运线后段更清晰，大器晚成之相，三十五岁后进入人生黄金期",
      "命运线有轻微折线，人生充满变数，但每次转折都是新的机遇",
      "命运线与太阳线并行，名利双收，事业与社会认可同步提升",
    ],
    tw: [
      "命運線清晰筆直，人生方向明確，事業發展穩中有進",
      "命運線後段更清晰，大器晚成之相，三十五歲後進入人生黃金期",
      "命運線有輕微折線，人生充滿變數，但每次轉折都是新的機遇",
      "命運線與太陽線並行，名利雙收，事業與社會認可同步提升",
    ],
    en: [
      "Your clear, straight fate line marks a defined direction and steady, progressing career.",
      "Your fate line growing clearer later signals a late bloomer — your golden era begins after 35.",
      "Your slightly broken fate line means a life full of change, yet every turn is a fresh opportunity.",
      "Your fate line running alongside the sun line brings both fame and fortune as recognition rises.",
    ],
  },
  fortune: {
    zh: [
      "财运线明显，财富积累能力强，善于把握投资时机",
      "大鱼际丰满，财富来源多元，正财偏财皆有斩获",
      "手掌厚实，财富积累稳健，属于越到后期越有钱的类型",
      "金星丘丰满，消费品味高，善于以钱生钱，财富观念超前",
    ],
    tw: [
      "財運線明顯，財富積累能力強，善於把握投資時機",
      "大魚際豐滿，財富來源多元，正財偏財皆有斬獲",
      "手掌厚實，財富積累穩健，屬於越到後期越有錢的類型",
      "金星丘豐滿，消費品味高，善於以錢生錢，財富觀念超前",
    ],
    en: [
      "Your prominent wealth line shows strong accumulation ability and a sense for investment timing.",
      "Your full thenar mount means diverse income sources, gaining from both regular and windfall money.",
      "Your thick palm marks steady wealth-building — the type who grows richer over time.",
      "Your full Venus mount shows fine taste and a forward wealth mindset, skilled at making money grow.",
    ],
  },
};

// ===== 洞察文案选择 =====
function getInsight(
  dimKey: string,
  seed: string,
  mode: AnalysisMode,
  lang: Lang,
): string {
  const library = mode === "face" ? FACE_INSIGHTS : PALM_INSIGHTS;
  const entry = library[dimKey];
  const fallback: L = {
    zh: "此维度能量正在汇聚，未来可期",
    tw: "此維度能量正在匯聚，未來可期",
    en: "Energy is gathering in this dimension — the future looks promising.",
  };
  const pool = entry ? entry[lang] : [fallback[lang]];
  return pickFromArray(pool, seed + dimKey);
}

// ===== 人生格言库 =====
const LIFE_QUOTES: LArr = {
  zh: [
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
  ],
  tw: [
    "你生來就是要發光的，不要讓任何人熄滅你的光芒。",
    "你的面相裡藏著宇宙對你的偏愛，勇敢去接收這份禮物。",
    "每一條掌紋都是命運寫給你的信，讀懂它，活出它。",
    "你是獨一無二的存在，這個世界需要你本來的樣子。",
    "相由心生，你的善意與智慧已寫在了每一個細節裡。",
    "命運從不隨機，你的每一次選擇都在雕刻更好的自己。",
    "宇宙最偏愛有準備的人，而你，已經準備好了。",
    "你額頭上寫著一個故事，那是一個關於破繭成蝶的故事。",
    "你的手掌就是你的地圖，每條紋路都指向更好的未來。",
    "AI 看見了你面相裡的祕密：你比你想像的更有潛力。",
  ],
  en: [
    "You were born to shine — never let anyone dim your light.",
    "Your face holds the universe's favor for you; be brave enough to receive this gift.",
    "Every palm line is a letter destiny wrote to you — read it, and live it.",
    "You are one of a kind, and the world needs you exactly as you are.",
    "Character shapes the face; your kindness and wisdom are written in every detail.",
    "Destiny is never random — every choice you make carves a better you.",
    "The universe favors those who are ready, and you already are.",
    "There's a story written on your forehead — one of breaking free and taking flight.",
    "Your palm is your map, and every line points toward a brighter future.",
    "AI has seen the secret in your face: you have far more potential than you imagine.",
  ],
};

// ===== 分享文案库 =====
const SHARE_TEXTS: LArr = {
  zh: [
    "AI 扫描了我的{mode}，说我是【{talent}】！你也来测测看？",
    "震惊！AI 面相分析说我的{talent}排名前{percent}% 🤯 链接在评论",
    "刚测了 AI {mode}分析，给我贴了【{talent}】的标签，这也太准了吧…",
    "原来我面相里藏着【{talent}】的秘密，AI 说的，不是我吹 ✨",
    "AI 告诉我：你是人群中那{percent}%的{talent}体质，信了信了",
  ],
  tw: [
    "AI 掃描了我的{mode}，說我是【{talent}】！你也來測測看？",
    "震驚！AI 面相分析說我的{talent}排名前{percent}% 🤯 連結在留言",
    "剛測了 AI {mode}分析，給我貼了【{talent}】的標籤，這也太準了吧…",
    "原來我面相裡藏著【{talent}】的祕密，AI 說的，不是我吹 ✨",
    "AI 告訴我：你是人群中那{percent}%的{talent}體質，信了信了",
  ],
  en: [
    "AI scanned my {mode} and said I'm a 【{talent}】! Wanna try it too?",
    "Whoa — AI face reading says my {talent} ranks in the top {percent}% 🤯 link in comments",
    "Just did an AI {mode} reading and it labeled me 【{talent}】 — this is way too accurate…",
    "Turns out there's a 【{talent}】 secret hidden in my face — AI said it, not me ✨",
    "AI told me: I'm in the {percent}% of people with a 【{talent}】 aura. I'm convinced.",
  ],
};

const MODE_NAME: Record<AnalysisMode, L> = {
  face: { zh: "面相", tw: "面相", en: "face reading" },
  palm: { zh: "手相", tw: "手相", en: "palm reading" },
};

function generateShareText(
  mode: AnalysisMode,
  talent: string,
  seed: string,
  lang: Lang,
): string {
  const template = pickFromArray(SHARE_TEXTS[lang], seed + "share");
  const percent = Math.floor(seededRandom(seed + "percent") * 15) + 3; // 3-18%
  const modeName = MODE_NAME[mode][lang];
  return template
    .replace("{mode}", modeName)
    .replace("{talent}", talent)
    .replace("{percent}", String(percent));
}

// ===== 优势文案库 =====
const STRENGTH_POOL: LArr = {
  zh: [
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
  ],
  tw: [
    "直覺敏銳，能在第一時間感知機遇",
    "領導力天賦突出，善於凝聚團隊力量",
    "情商極高，人際關係處理得當",
    "創造力爆棚，解決問題總有奇思妙想",
    "執行力強，承諾的事情必然落地",
    "學習能力超強，新技能上手極快",
    "財商出眾，天生具備財富積累的嗅覺",
    "抗壓能力極強，越挫越勇",
    "親和力十足，走到哪裡都能成為核心",
    "戰略眼光獨到，總能看到別人看不到的機會",
    "審美水準超高，生活與工作皆有品質",
    "記憶力驚人，善於在細節中發現價值",
  ],
  en: [
    "Sharp intuition — you sense opportunities before anyone else.",
    "Standout leadership, with a gift for rallying a team.",
    "High emotional intelligence and graceful with relationships.",
    "Bursting with creativity, always finding ingenious solutions.",
    "Strong execution — what you promise, you deliver.",
    "Exceptional learner who picks up new skills remarkably fast.",
    "Outstanding financial sense, a born instinct for building wealth.",
    "Remarkable resilience — the harder it gets, the stronger you grow.",
    "Effortless warmth that makes you the core wherever you go.",
    "Unique strategic vision, spotting chances others can't see.",
    "Refined taste that brings quality to both life and work.",
    "An astonishing memory, finding value in the smallest details.",
  ],
};

// ===== 机遇文案库 =====
const OPPORTUNITY_POOL: LArr = {
  zh: [
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
  ],
  tw: [
    "今年下半年，有一次改變人生軌跡的重要機遇",
    "貴人將在意想不到的場合出現，把握每次社交機會",
    "副業轉正的時機正在成熟，勇敢邁出那一步",
    "感情方面有新的進展，主動出擊勝過被動等待",
    "投資眼光將在未來12個月內大放異彩",
    "跨界合作將帶來意外之喜，不要侷限在舒適圈內",
    "健康運勢提升期到來，是制定健康計劃的最佳時機",
    "學習深造將成為命運的轉折點，知識是最好的投資",
    "國際化機遇悄然臨近，開放視野方能把握未來",
    "創業時機漸趨成熟，天時地利人和皆在匯聚",
  ],
  en: [
    "In the second half of this year, a key opportunity will reshape your life's path.",
    "A mentor will appear in an unexpected setting — seize every chance to connect.",
    "The moment to turn your side hustle full-time is ripening; take the bold step.",
    "New progress awaits in love — taking initiative beats waiting passively.",
    "Your eye for investment will shine over the next 12 months.",
    "Cross-field collaboration brings pleasant surprises — don't stay in your comfort zone.",
    "A health upswing is arriving — the best time to set a wellness plan.",
    "Further study could be a turning point in your destiny; knowledge is the best investment.",
    "A global opportunity quietly nears — an open mind will help you seize the future.",
    "The timing for entrepreneurship is ripening, with everything aligning in your favor.",
  ],
};

// ===== 总体解读模板 =====
const OVERVIEW_TEMPLATE: Record<Lang, (score: number, talent: string, modeName: string) => string> = {
  zh: (score, talent, modeName) =>
    `AI 深度扫描你的${modeName}后发现：你的整体运势指数高达 ${score} 分，` +
    `在${talent}方面拥有超凡天赋。` +
    `你的骨相轮廓与掌纹特征共同呈现出一种独特的能量场，` +
    `这种能量场在人群中仅有极少数人具备。` +
    `未来12个月，你将迎来人生的重要节点，把握好这次窗口期，` +
    `你的命运将迎来质的飞跃。`,
  tw: (score, talent, modeName) =>
    `AI 深度掃描你的${modeName}後發現：你的整體運勢指數高達 ${score} 分，` +
    `在${talent}方面擁有超凡天賦。` +
    `你的骨相輪廓與掌紋特徵共同呈現出一種獨特的能量場，` +
    `這種能量場在人群中僅有極少數人具備。` +
    `未來12個月，你將迎來人生的重要節點，把握好這次窗口期，` +
    `你的命運將迎來質的飛躍。`,
  en: (score, talent, modeName) =>
    `After a deep AI scan of your ${modeName}, here's what surfaced: your overall fortune index reaches ${score}, ` +
    `with extraordinary talent in ${talent}. ` +
    `Your bone structure and palm features together project a unique energy field — ` +
    `one that only a rare few in any crowd possess. ` +
    `Over the next 12 months you'll reach a pivotal moment in life; seize this window, ` +
    `and your destiny will take a quantum leap.`,
};

const DISCLAIMER: L = {
  zh: "⚠️ 本分析仅供娱乐参考，不代表专业指导意见。",
  tw: "⚠️ 本分析僅供娛樂參考，不代表專業指導意見。",
  en: "⚠️ This analysis is for entertainment only and is not professional advice.",
};

// ===== 生成完整报告 =====
export function generateMockReport(
  mode: AnalysisMode,
  seed: string,
  lang: Lang = "zh",
): FaceReadingReport {
  const rawTalent = pickFromArray(RAW_TALENT_LABELS, seed + "talent");
  const talentLabel = resolveTalentLabel(rawTalent, lang);
  const overallScore = generateScore(seed, "overall");
  const dimensionsTemplate = DIMENSION_TEMPLATES[mode];

  const dimensions: DimensionScore[] = dimensionsTemplate.map((dim) => {
    const score = generateScore(seed, dim.key);
    return {
      name: dim.name[lang],
      icon: dim.icon,
      score,
      label: getScoreLabel(score, lang),
      insight: getInsight(dim.key, seed, mode, lang),
    };
  });

  const strengthPool = STRENGTH_POOL[lang];
  const strengths = [
    pickFromArray(strengthPool, seed + "str0", 0),
    pickFromArray(strengthPool, seed + "str1", 1),
    pickFromArray(strengthPool, seed + "str2", 2),
  ].filter((v, i, a) => a.indexOf(v) === i);

  const opportunityPool = OPPORTUNITY_POOL[lang];
  const opportunities = [
    pickFromArray(opportunityPool, seed + "opp0", 0),
    pickFromArray(opportunityPool, seed + "opp1", 1),
    pickFromArray(opportunityPool, seed + "opp2", 2),
  ].filter((v, i, a) => a.indexOf(v) === i);

  const lifeQuote = pickFromArray(LIFE_QUOTES[lang], seed + "quote");
  const shareText = generateShareText(mode, talentLabel.name, seed, lang);

  const modeName = MODE_NAME[mode][lang];
  const overview = OVERVIEW_TEMPLATE[lang](overallScore, talentLabel.name, modeName);

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
    disclaimer: DISCLAIMER[lang],
  };
}
