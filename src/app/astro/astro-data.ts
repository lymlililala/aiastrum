// ===== 星盘解析 数据层 =====
// 星座、行星、宫位、相位及解析文案库

// ===== 类型定义 =====
export type ZodiacSign =
  | "Aries" | "Taurus" | "Gemini" | "Cancer"
  | "Leo" | "Virgo" | "Libra" | "Scorpio"
  | "Sagittarius" | "Capricorn" | "Aquarius" | "Pisces";

export type Planet =
  | "Sun" | "Moon" | "Mercury" | "Venus" | "Mars"
  | "Jupiter" | "Saturn" | "Uranus" | "Neptune" | "Pluto";

export type AspectType = "conjunction" | "sextile" | "square" | "trine" | "opposition";

export type HouseSystem = "Placidus";

// ===== 十二星座 =====
export interface ZodiacData {
  id: ZodiacSign;
  name: string;        // 中文名
  nameEn: string;      // 英文名
  symbol: string;      // 符号
  element: "fire" | "earth" | "air" | "water";
  modality: "cardinal" | "fixed" | "mutable";
  ruler: Planet;       // 守护星
  startDeg: number;    // 起始黄道度数（0=白羊0°）
  color: string;       // 代表色
  keywords: string[];  // 关键词
  description: string; // 简介
}

export const ZODIAC_LIST: ZodiacData[] = [
  {
    id: "Aries", name: "白羊座", nameEn: "Aries", symbol: "♈",
    element: "fire", modality: "cardinal", ruler: "Mars",
    startDeg: 0, color: "#E74C3C",
    keywords: ["勇敢", "冲动", "开拓", "热情", "直接"],
    description: "白羊座充满活力与勇气，是黄道十二宫的先锋，天生具备开拓精神与行动力。",
  },
  {
    id: "Taurus", name: "金牛座", nameEn: "Taurus", symbol: "♉",
    element: "earth", modality: "fixed", ruler: "Venus",
    startDeg: 30, color: "#27AE60",
    keywords: ["稳定", "感官", "执着", "务实", "享受"],
    description: "金牛座踏实可靠，热爱美食与美物，对感官享受有着高度的敏感与追求。",
  },
  {
    id: "Gemini", name: "双子座", nameEn: "Gemini", symbol: "♊",
    element: "air", modality: "mutable", ruler: "Mercury",
    startDeg: 60, color: "#F1C40F",
    keywords: ["灵活", "沟通", "好奇", "变化", "双面"],
    description: "双子座思维敏捷，极具好奇心，善于沟通，拥抱变化，是天生的信息传递者。",
  },
  {
    id: "Cancer", name: "巨蟹座", nameEn: "Cancer", symbol: "♋",
    element: "water", modality: "cardinal", ruler: "Moon",
    startDeg: 90, color: "#3498DB",
    keywords: ["敏感", "母性", "保护", "情感", "家庭"],
    description: "巨蟹座情感丰富、极具同理心，对家庭与亲情有深刻的依恋，如同月亮般感性。",
  },
  {
    id: "Leo", name: "狮子座", nameEn: "Leo", symbol: "♌",
    element: "fire", modality: "fixed", ruler: "Sun",
    startDeg: 120, color: "#F39C12",
    keywords: ["自信", "创造", "表现", "领导", "荣耀"],
    description: "狮子座热情洋溢，天生散发王者气质，渴望舞台与认可，具有强烈的创造力。",
  },
  {
    id: "Virgo", name: "处女座", nameEn: "Virgo", symbol: "♍",
    element: "earth", modality: "mutable", ruler: "Mercury",
    startDeg: 150, color: "#8E44AD",
    keywords: ["分析", "完美", "服务", "细节", "实用"],
    description: "处女座追求完美，善于分析与批判，具有强烈的服务精神和精益求精的工作态度。",
  },
  {
    id: "Libra", name: "天秤座", nameEn: "Libra", symbol: "♎",
    element: "air", modality: "cardinal", ruler: "Venus",
    startDeg: 180, color: "#E91E63",
    keywords: ["平衡", "关系", "公平", "美学", "外交"],
    description: "天秤座崇尚和谐与美，善于权衡利弊，天生的外交家，渴望公平与平衡的人际关系。",
  },
  {
    id: "Scorpio", name: "天蝎座", nameEn: "Scorpio", symbol: "♏",
    element: "water", modality: "fixed", ruler: "Pluto",
    startDeg: 210, color: "#C0392B",
    keywords: ["深邃", "神秘", "转化", "权力", "直觉"],
    description: "天蝎座深邃神秘，具有强大的直觉与洞察力，渴望深度的情感联结与生命的转化。",
  },
  {
    id: "Sagittarius", name: "射手座", nameEn: "Sagittarius", symbol: "♐",
    element: "fire", modality: "mutable", ruler: "Jupiter",
    startDeg: 240, color: "#9B59B6",
    keywords: ["自由", "探索", "哲学", "乐观", "冒险"],
    description: "射手座热爱自由与冒险，是永远的旅行者与哲学家，追求真理与人生的宏大意义。",
  },
  {
    id: "Capricorn", name: "摩羯座", nameEn: "Capricorn", symbol: "♑",
    element: "earth", modality: "cardinal", ruler: "Saturn",
    startDeg: 270, color: "#7F8C8D",
    keywords: ["目标", "责任", "野心", "纪律", "传统"],
    description: "摩羯座务实勤奋，具有强烈的责任感与上进心，善于制定长远目标并坚定前行。",
  },
  {
    id: "Aquarius", name: "水瓶座", nameEn: "Aquarius", symbol: "♒",
    element: "air", modality: "fixed", ruler: "Uranus",
    startDeg: 300, color: "#00BCD4",
    keywords: ["独立", "创新", "人文", "前卫", "理性"],
    description: "水瓶座独立前卫，具有人道主义精神，是思想的革新者，渴望打破旧有的束缚。",
  },
  {
    id: "Pisces", name: "双鱼座", nameEn: "Pisces", symbol: "♓",
    element: "water", modality: "mutable", ruler: "Neptune",
    startDeg: 330, color: "#5DADE2",
    keywords: ["梦幻", "灵性", "共情", "牺牲", "艺术"],
    description: "双鱼座如梦如幻，极具同情心与艺术气质，是灵性的探索者，渴望与宇宙合而为一。",
  },
];

export const ZODIAC_MAP = Object.fromEntries(ZODIAC_LIST.map((z) => [z.id, z])) as Record<ZodiacSign, ZodiacData>;

// ===== 十大行星 =====
export interface PlanetData {
  id: Planet;
  name: string;       // 中文名
  nameEn: string;     // 英文名
  symbol: string;     // 符号
  color: string;      // 颜色
  meaning: string;    // 代表意义
  keywords: string[]; // 关键词
  orbits: number;     // 相位容许度（度）
}

export const PLANET_LIST: PlanetData[] = [
  {
    id: "Sun", name: "太阳", nameEn: "Sun", symbol: "☉",
    color: "#F39C12", meaning: "自我核心与人生追求，外在性格与生命目标",
    keywords: ["自我", "意志", "活力", "创造", "父性"],
    orbits: 8,
  },
  {
    id: "Moon", name: "月亮", nameEn: "Moon", symbol: "☽",
    color: "#BDC3C7", meaning: "内在情绪与安全感，潜意识与本能反应",
    keywords: ["情绪", "本能", "母性", "记忆", "家庭"],
    orbits: 8,
  },
  {
    id: "Mercury", name: "水星", nameEn: "Mercury", symbol: "☿",
    color: "#95A5A6", meaning: "思维方式与沟通模式，学习与信息处理能力",
    keywords: ["思维", "沟通", "逻辑", "学习", "旅行"],
    orbits: 6,
  },
  {
    id: "Venus", name: "金星", nameEn: "Venus", symbol: "♀",
    color: "#E91E63", meaning: "爱情观与审美取向，人际关系与价值观",
    keywords: ["爱情", "美学", "关系", "享受", "价值"],
    orbits: 6,
  },
  {
    id: "Mars", name: "火星", nameEn: "Mars", symbol: "♂",
    color: "#E74C3C", meaning: "行动力与欲望驱动，竞争本能与性能量",
    keywords: ["行动", "欲望", "战斗", "激情", "能量"],
    orbits: 6,
  },
  {
    id: "Jupiter", name: "木星", nameEn: "Jupiter", symbol: "♃",
    color: "#E67E22", meaning: "扩张与幸运领域，信念体系与哲学观",
    keywords: ["幸运", "扩张", "信仰", "哲学", "慷慨"],
    orbits: 6,
  },
  {
    id: "Saturn", name: "土星", nameEn: "Saturn", symbol: "♄",
    color: "#D4AC0D", meaning: "挑战与成长课题，责任感与纪律边界",
    keywords: ["限制", "责任", "纪律", "成熟", "考验"],
    orbits: 6,
  },
  {
    id: "Uranus", name: "天王星", nameEn: "Uranus", symbol: "♅",
    color: "#00BCD4", meaning: "突破与革新冲动，独立性与个人自由",
    keywords: ["革新", "独立", "突变", "前卫", "解放"],
    orbits: 4,
  },
  {
    id: "Neptune", name: "海王星", nameEn: "Neptune", symbol: "♆",
    color: "#5DADE2", meaning: "梦境与灵性追求，理想主义与模糊边界",
    keywords: ["梦想", "灵性", "幻觉", "慈悲", "艺术"],
    orbits: 4,
  },
  {
    id: "Pluto", name: "冥王星", nameEn: "Pluto", symbol: "♇",
    color: "#8E44AD", meaning: "深层转化与权力议题，死亡与重生的力量",
    keywords: ["转化", "权力", "死亡", "重生", "深渊"],
    orbits: 4,
  },
];

export const PLANET_MAP = Object.fromEntries(PLANET_LIST.map((p) => [p.id, p])) as Record<Planet, PlanetData>;

// 行星在太阳系中的顺序（用于排盘中的内外行星区分）
export const INNER_PLANETS: Planet[] = ["Sun", "Moon", "Mercury", "Venus", "Mars"];
export const OUTER_PLANETS: Planet[] = ["Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];

// ===== 十二宫位 =====
export interface HouseData {
  num: number;        // 宫位编号 1-12
  name: string;       // 宫位名称
  nameEn: string;     // 英文名
  domain: string;     // 管辖领域
  keywords: string[]; // 关键词
  naturalSign: ZodiacSign; // 自然对应星座
  description: string;     // 详细描述
}

export const HOUSE_LIST: HouseData[] = [
  {
    num: 1, name: "第一宫", nameEn: "First House", naturalSign: "Aries",
    domain: "自我与外貌",
    keywords: ["外表", "个性", "第一印象", "身体", "出发点"],
    description: "第一宫是上升点所在的宫位，代表你展现给世界的外在形象、第一印象及身体特质。",
  },
  {
    num: 2, name: "第二宫", nameEn: "Second House", naturalSign: "Taurus",
    domain: "财富与价值观",
    keywords: ["金钱", "物质", "价值观", "才能", "安全感"],
    description: "第二宫掌管你如何获取与运用财富，以及你对事物价值的认知与物质安全感的来源。",
  },
  {
    num: 3, name: "第三宫", nameEn: "Third House", naturalSign: "Gemini",
    domain: "沟通与学习",
    keywords: ["沟通", "兄弟姐妹", "学习", "短途旅行", "思维"],
    description: "第三宫代表你的沟通方式、日常学习能力、与兄弟姐妹的关系及短途旅行的模式。",
  },
  {
    num: 4, name: "第四宫", nameEn: "Fourth House", naturalSign: "Cancer",
    domain: "家庭与根基",
    keywords: ["家庭", "童年", "原生家庭", "情感根基", "归属感"],
    description: "第四宫是星盘的最底点（IC），代表家庭根基、童年成长环境及内心深处的安全感。",
  },
  {
    num: 5, name: "第五宫", nameEn: "Fifth House", naturalSign: "Leo",
    domain: "创造与娱乐",
    keywords: ["创造力", "恋爱", "孩子", "娱乐", "自我表达"],
    description: "第五宫代表你的创造力、恋爱方式、对孩子的态度及通过艺术娱乐表达自我的方式。",
  },
  {
    num: 6, name: "第六宫", nameEn: "Sixth House", naturalSign: "Virgo",
    domain: "工作与健康",
    keywords: ["日常工作", "健康", "服务", "习惯", "效率"],
    description: "第六宫掌管日常工作职责、健康与身体保养，以及为他人服务与建立日常规律的方式。",
  },
  {
    num: 7, name: "第七宫", nameEn: "Seventh House", naturalSign: "Libra",
    domain: "伴侣与合作",
    keywords: ["婚姻", "伴侣", "合作关系", "公开对手", "契约"],
    description: "第七宫（对宫）代表一对一的重要关系，包括婚姻、商业伙伴及公开的竞争对手。",
  },
  {
    num: 8, name: "第八宫", nameEn: "Eighth House", naturalSign: "Scorpio",
    domain: "转化与共有资产",
    keywords: ["转化", "死亡", "遗产", "共有财富", "深层心理"],
    description: "第八宫代表深层的转化力量、共有资产、遗产、深层心理及对生死议题的探索。",
  },
  {
    num: 9, name: "第九宫", nameEn: "Ninth House", naturalSign: "Sagittarius",
    domain: "哲学与远行",
    keywords: ["高等教育", "哲学", "宗教", "长途旅行", "信仰"],
    description: "第九宫代表你对人生意义的追求，包括高等教育、哲学信仰体系、宗教及远行探索。",
  },
  {
    num: 10, name: "第十宫", nameEn: "Tenth House", naturalSign: "Capricorn",
    domain: "事业与社会地位",
    keywords: ["事业", "社会地位", "成就", "权威", "公众形象"],
    description: "第十宫（MC天顶）代表你的社会抱负、职业方向、公众形象及追求社会成就的方式。",
  },
  {
    num: 11, name: "第十一宫", nameEn: "Eleventh House", naturalSign: "Aquarius",
    domain: "团体与理想",
    keywords: ["友谊", "团体", "社会理想", "愿望", "人脉"],
    description: "第十一宫代表你在社群与团体中的角色、人脉关系、社会理想及对未来的集体愿景。",
  },
  {
    num: 12, name: "第十二宫", nameEn: "Twelfth House", naturalSign: "Pisces",
    domain: "潜意识与灵性",
    keywords: ["潜意识", "孤独", "灵性", "隐藏力量", "业力"],
    description: "第十二宫是最神秘的宫位，代表潜意识深处、灵性修行、隐藏的力量及需要超越的业力。",
  },
];

export const HOUSE_MAP = Object.fromEntries(HOUSE_LIST.map((h) => [h.num, h])) as Record<number, HouseData>;

// ===== 五大相位 =====
export interface AspectData {
  id: AspectType;
  name: string;       // 中文名
  nameEn: string;     // 英文名
  symbol: string;     // 符号
  degrees: number;    // 相位角度
  orb: number;        // 默认容许度
  nature: "harmonious" | "challenging" | "neutral";
  color: string;      // 线条颜色
  description: string;
}

export const ASPECT_LIST: AspectData[] = [
  {
    id: "conjunction", name: "合相", nameEn: "Conjunction", symbol: "☌",
    degrees: 0, orb: 8, nature: "neutral",
    color: "#F1C40F",
    description: "两星能量融合为一，彼此增强。效果视行星性质而定，可吉可凶。",
  },
  {
    id: "sextile", name: "六分相", nameEn: "Sextile", symbol: "⚹",
    degrees: 60, orb: 6, nature: "harmonious",
    color: "#2ECC71",
    description: "和谐流动的能量，带来机遇与天赋。两星相互支持，轻松合作。",
  },
  {
    id: "square", name: "四分相", nameEn: "Square", symbol: "□",
    degrees: 90, orb: 8, nature: "challenging",
    color: "#E74C3C",
    description: "摩擦与张力，带来挑战与行动力。是推动成长的压力，也可能是障碍。",
  },
  {
    id: "trine", name: "三分相", nameEn: "Trine", symbol: "△",
    degrees: 120, orb: 8, nature: "harmonious",
    color: "#3498DB",
    description: "最强的和谐相位，能量自然流动，带来才华、好运与轻松的成功。",
  },
  {
    id: "opposition", name: "对分相", nameEn: "Opposition", symbol: "☍",
    degrees: 180, orb: 8, nature: "challenging",
    color: "#9B59B6",
    description: "两极对立的张力，代表内外的冲突与需要整合的矛盾，也是领悟的契机。",
  },
];

export const ASPECT_MAP = Object.fromEntries(ASPECT_LIST.map((a) => [a.id, a])) as Record<AspectType, AspectData>;

// ===== 解析文案库 =====

// 太阳星座解析
export const SUN_SIGN_INTERPRETATIONS: Record<ZodiacSign, string> = {
  Aries: "你是个充满热情与勇气的开拓者。白羊太阳赋予你天生的行动力，你习惯第一个冲向目标，哪怕前方未知。你的能量像一把永不熄灭的火焰，激励着周围的人。记得在冲动与思考之间寻找平衡，你的韧劲足以征服任何高山。",
  Taurus: "你是个深根于大地的感官享乐者。金牛太阳赋予你对美好事物天生的鉴赏力，你的稳定与踏实是周围人的磐石。你慢热却忠诚，一旦认准了方向便会倔强地坚持到底。你的财富观务实，却也懂得欣赏生活中一切令人愉悦的事物。",
  Gemini: "你是一个永远充满好奇心的信息使者。双子太阳赋予你闪电般的思维与出色的沟通才华，你的世界充满了无限可能性。你同时活在多个版本的自己之中，灵活多变却也容易分心。学会专注，你天生的机智将成就你的非凡。",
  Cancer: "你是一个用情至深的守护者。巨蟹太阳赋予你高度的直觉力与共情能力，你对家庭与所爱之人有着浓厚的保护欲。你的内心如同深海，情感丰富而细腻。学会在付出的同时也好好照顾自己，你的温柔是这个世界最珍贵的礼物。",
  Leo: "你是一个天生闪耀的舞台表演者。狮子太阳赋予你王者般的自信与感召力，你渴望被看见、被认可，并将这种渴望转化为真实的创造力。你慷慨热情，值得被爱。记住，真正的领袖在照亮别人的同时，也允许自己的光芒被接受。",
  Virgo: "你是一个追求完美的服务精灵。处女太阳赋予你超凡的分析能力与对细节的敏锐感知，你总能发现别人忽略的问题。你的谦逊让你低调，但你的智慧与实力从不缺席。学会对自己温柔，你已经足够好，而且正在变得更好。",
  Libra: "你是一个追求美与和谐的天生外交家。天秤太阳赋予你将冲突转化为合作的艺术，你眼中的世界充满了美。你渴望平衡，渴望公平的关系，也渴望被他人喜爱。学会有时为自己而战，你的美丽灵魂值得被认真对待。",
  Scorpio: "你是一个深不可测的灵魂炼金师。天蝎太阳赋予你穿透表象直达本质的能力，你对人心有着令人惊叹的洞察。你经历过蜕变，并因此变得更强大。你的情感炽烈而专注，学会信任，允许自己的脆弱，那是你最深的力量源泉。",
  Sagittarius: "你是一个永远在路上的人生哲学家。射手太阳赋予你对自由与真理永不满足的渴望，你的乐观能感染身边的每一个人。你热爱探索，无论是地图上未知的土地，还是思想领域的无疆边际。记得有时停下脚步，深深扎根。",
  Capricorn: "你是一个不断向山顶攀登的战略家。摩羯太阳赋予你超强的自律与野心，你对成功有着清醒的规划与坚定的执行力。你的成就来自汗水，而非运气。记得在攀登的途中享受风景，允许自己柔软，成功的意义远不止于顶峰。",
  Aquarius: "你是一个走在时代前面的理想主义革命者。水瓶太阳赋予你独立的思想与对人类命运的深刻关怀，你天生反抗束缚，追求更公平、更自由的世界。你的独特性是你最大的礼物，学会在人群中保持本真，改变世界从改变你自己开始。",
  Pisces: "你是一个能感知宇宙微妙颤动的灵性梦想家。双鱼太阳赋予你无边的同理心与艺术灵感，你拥有溶解边界、感受一切的能力。你是艺术家、治愈者、心灵的守望者。学会设立边界，保护好你那颗纯净敏感的心，那是你最珍贵的财富。",
};

// 月亮星座解析
export const MOON_SIGN_INTERPRETATIONS: Record<ZodiacSign, string> = {
  Aries: "你的内心深处住着一个随时准备出发的勇士。白羊月亮让你的情绪来得快去得也快，你不善于压抑感受，更倾向于直接表达。内在安全感来自行动与掌控感，停滞是你最大的情绪焦虑源。你需要被允许做自己，在独立与连结之间找到属于你的节奏。",
  Taurus: "你的内心是一片平静而丰饶的田野。金牛月亮让你渴望稳定与感官的慰藉，一顿美食、一个拥抱、一段熟悉的旋律，都能让你内心平静下来。你情绪变化缓慢，但一旦被触动便十分深刻。物质与环境的稳定是你安全感最重要的基石。",
  Gemini: "你的内心世界总是在两种情绪之间来回切换。双子月亮让你渴望用语言来理解和处理情感，倾诉与交流是你的情绪出口。你需要精神层面的刺激才能感到踏实，单调是你最大的情绪敌人。学会让感受在心中停留片刻，而不是立刻将它转化为文字。",
  Cancer: "月亮是你的守护星，你天生与情感世界深度契合。你的感受细腻如丝，对他人的情绪波动极为敏感。你渴望深度的情感依附与家庭的温暖，内心安全感来自感觉被需要与被爱护。学会区分什么是你自己的情绪，什么是你吸收了周遭的能量。",
  Leo: "你的内心需要被欣赏与被爱的光照耀。狮子月亮让你渴望被人看见与认可，你的表达需要一个舞台，你的付出需要一份回应。当你感到被忽视时，情绪会变得格外受伤。记住，你本身就已经光芒万丈，不必透过他人的掌声来确认自己的价值。",
  Virgo: "你的内心是一个井井有条、永远在自我审视的精密仪器。处女月亮让你通过服务他人来感受自己的价值，你对混乱与不确定极为敏感。焦虑常常源于那些无法控制的变量。学会对自己和这个世界多一些接纳，完美并不是衡量安全感的唯一标准。",
  Libra: "你的内心渴望和谐，最害怕的是冲突与孤独。天秤月亮让你通过重要的关系来确认自我价值，你的情绪状态与亲密关系的质量息息相关。你善于照顾他人的感受，却常常压抑自己的需求。学会也把自己的名字写进你愿意照顾的人的名单里。",
  Scorpio: "你的内心是一片深不见底的幽暗之海。天蝎月亮让你的情感极度深沉而强烈，你感受到的比任何人都要多，也比任何人都要深。你渴望灵魂层面的深度联结，对表面的关系有着本能的不信任。学会慢慢打开那扇门，信任是疗愈的第一步。",
  Sagittarius: "你的内心是一片永远向往远方的广阔原野。射手月亮让你通过探索与学习获得情感滋养，限制与束缚是你情绪的最大触发点。你的乐观与幽默感是你调节情绪的天然礼物。偶尔允许自己感受悲伤与脆弱，那些在路上的情绪也是风景的一部分。",
  Capricorn: "你的内心是一位克己自律的沉默建筑师。摩羯月亮让你不善表达情绪，倾向于将感受转化为行动与成就。你的安全感来自成就感与对未来的掌控，情感上的需求往往被你藏得很深。学会允许自己也有脆弱和需要被照顾的时刻，那不是软弱，那是人性。",
  Aquarius: "你的内心是一个渴望自由与被理解的矛盾体。水瓶月亮让你对情感保持一定的距离感，你用理智分析情绪，却有时感觉自己格格不入。你渴望在某个独特的团体中找到归属，却又害怕失去自我。让自己打开感受的大门，你的独特性本身就是你与他人深度联结的桥梁。",
  Pisces: "你的内心如同海绵，能轻易吸收周围所有人的情绪与能量。双鱼月亮赋予你深刻的同情心与灵性感知力，你在艺术、音乐与梦境中找到滋养。你的情绪边界模糊，很容易被他人影响。请为自己建立一个小小的港湾，一个只属于你自己、能安静充电的私密空间。",
};

// 上升星座解析
export const RISING_SIGN_INTERPRETATIONS: Record<ZodiacSign, string> = {
  Aries: "你给人留下的第一印象充满活力、直接、甚至带着一丝锋芒。白羊上升让你看起来永远在行动，充满热情且充满力量。你是那种能瞬间激活房间氛围的人。人们对你的第一印象往往是：直率、有冲劲、有主见。",
  Taurus: "你给人的第一印象是可靠、沉稳而令人感到舒适。金牛上升为你的外表带来一种踏实的美感，你的存在让周围的人感到安心。你待人接物不急不躁，散发出一种天然的品位与亲切感。",
  Gemini: "你给人的第一印象是聪明、活泼、充满好奇心且极具亲和力。双子上升让你的眼神里总是闪烁着求知的光芒，你善于在初见时打破冷场，让对话流动起来。人们往往觉得你年轻而充满活力。",
  Cancer: "你给人的第一印象是温柔、体贴、带着一种母性的包容感。巨蟹上升让你的眼神柔软而有深度，你往往在不经意间就让对方感到被接纳。你的气质中带着一丝天然的神秘感，如同月光一般令人着迷。",
  Leo: "你给人的第一印象明亮、自信，甚至有些夺目。狮子上升让你天生拥有吸引目光的气场，你出现在哪里，哪里便有光。你的仪态举止自带一种尊贵感，让人不自觉地被你吸引，想要了解你更多。",
  Virgo: "你给人的第一印象是整洁、得体、聪明而低调。处女上升让你的气质中带着一种精致的克制感，你不会主动占据舞台中央，却总是最让人信赖的那个人。你的观察力让你一眼看穿细节，这让你显得格外有深度。",
  Libra: "你给人的第一印象是优雅、和善、美好而令人愉悦。天秤上升赋予你天生的外交能力与迷人的笑容，你让人感到如沐春风。你天然地懂得如何让每个人都感到被重视，你的审美趣味往往令周围人叹服。",
  Scorpio: "你给人的第一印象深邃、神秘，带着一股难以忽视的磁性。天蝎上升让你的眼神如同扫描仪，能在短时间内洞察他人的真实情绪。人们对你往往又敬又怕，却无法不被你吸引。你散发出的能量是无声的强大。",
  Sagittarius: "你给人的第一印象开朗、真诚、充满异域风情或冒险气息。射手上升让你总是带着一种'整个世界都是我的操场'的豁达感，你笑起来能点亮房间。你的坦率有时令人意外，但你的善意总是真实而温暖。",
  Capricorn: "你给人的第一印象是成熟、可靠、有分量。摩羯上升赋予你一种超越年龄的稳重气质，即便在年轻时也显得老成持重。人们第一眼看到你便觉得：这个人靠得住。你的气场中带着一种不言而喻的专业感与权威感。",
  Aquarius: "你给人的第一印象独特、前卫，甚至有些难以捉摸。水瓶上升让你的气质中带着一股独特的频率，你似乎总是与众不同，这不是刻意为之，而是你本身的底色。人们觉得你聪明、特别，有时令人难以完全靠近。",
  Pisces: "你给人的第一印象如梦如幻，带着一种难以言说的灵气。双鱼上升让你的气质中带着艺术家的浪漫与灵媒的敏感，你的眼神有时让人感觉你正在看着另一个世界。人们常觉得你温柔、神秘，像一首写不完的诗。",
};

// 行星落入星座的关键词解析（仅存关键短句）
export const PLANET_IN_SIGN_KEYWORDS: Partial<Record<Planet, Partial<Record<ZodiacSign, string>>>> = {
  Mercury: {
    Aries: "思维直接犀利，说话直截了当，反应迅速",
    Taurus: "思考稳健务实，说话有条有理，善于落地",
    Gemini: "思维极度灵活，好奇心旺盛，语言天赋出众",
    Cancer: "思维感性直觉强，善于感知言外之意",
    Leo: "表达自信有感染力，擅长戏剧性叙事",
    Virgo: "分析精准细致，逻辑严密，注重实用",
    Libra: "思维公允，善于权衡，表达优雅有艺术感",
    Scorpio: "洞察力极强，擅长发现隐藏信息，不轻易表态",
    Sagittarius: "思维宏观，善于归纳，充满哲学意味",
    Capricorn: "思维有条理，实际，善于长期规划",
    Aquarius: "思想创新前卫，善于跳脱思维定式",
    Pisces: "直觉丰富，想象力旺盛，思维有时不拘逻辑",
  },
  Venus: {
    Aries: "爱情热烈主动，追求刺激，渴望成为伴侣眼中的英雄",
    Taurus: "感情稳定忠诚，注重感官享受，视物质稳定为爱的基础",
    Gemini: "爱情需要智识上的交流，喜欢轻盈有趣的浪漫",
    Cancer: "感情深厚细腻，爱用照顾来表达爱，渴望情感上的安全感",
    Leo: "爱情浓烈戏剧化，渴望被崇拜，爱的方式大方慷慨",
    Virgo: "通过细节与服务表达爱，爱情中注重品质与实际",
    Libra: "渴望完美的和谐伴侣，美丽与公平是爱情的首要条件",
    Scorpio: "爱得深沉、专一甚至占有，渴望灵魂深处的融合",
    Sagittarius: "爱情自由洒脱，渴望与伴侣一起探索世界",
    Capricorn: "爱情务实谨慎，重视伴侣的社会地位与稳定性",
    Aquarius: "爱情需要友谊为基础，渴望精神上的独立与平等",
    Pisces: "爱情如诗如幻，具有牺牲精神，容易在爱中迷失",
  },
  Mars: {
    Aries: "行动力极强，直接冲向目标，充满竞争意识",
    Taurus: "行动缓慢而有力，一旦决定便坚持到底",
    Gemini: "行动多线并进，善于言辞出击，灵活多变",
    Cancer: "以情感驱动行动，保护欲强，行事谨慎",
    Leo: "充满激情与戏剧感，争强好胜，渴望成为领袖",
    Virgo: "行动精准有效率，擅于在细节中发力",
    Libra: "通过关系与合作实现目标，倾向于迂回策略",
    Scorpio: "意志极强，行动深沉有力，擅于在暗处布局",
    Sagittarius: "充满激情与理想主义，行动直接大胆",
    Capricorn: "行动有纪律有目标，善于长期积累实力",
    Aquarius: "以创新方式行动，具有集体意识与前瞻视野",
    Pisces: "行动易受直觉引导，能量时强时弱",
  },
};

// 行星落入宫位的解析短句
export const PLANET_IN_HOUSE_INTERPRETATIONS: Partial<Record<Planet, Partial<Record<number, string>>>> = {
  Sun: {
    1: "你的人生核心是建立自我认同，外在形象与个人魅力是你的力量源泉。",
    2: "你的自尊与价值感与物质成就和财富积累紧密相连。",
    3: "你的生命力通过表达、沟通与学习来彰显，写作或演讲可能是你的天赋。",
    4: "家庭与根基是你内心力量的来源，你渴望建立一个充满安全感的家。",
    5: "你的光芒在创造与自我表达中最为耀眼，艺术、恋爱与孩子是你的人生主题。",
    6: "你的自我价值通过服务与精进工作来实现，健康与效率是你的人生课题。",
    7: "重要的伴侣关系是你人生舞台的核心，他人如同镜子，照见你的真实面目。",
    8: "你的人生被深层的转化所塑造，危机与重生是你最熟悉的生命主题。",
    9: "你在哲学、信仰与远方探索中找到人生意义，旅行与高等教育对你至关重要。",
    10: "事业成就与社会认可是你人生的核心驱动，公众形象对你意义重大。",
    11: "你在志同道合的团体与友谊中找到自我，实现社会理想是你的人生使命。",
    12: "你的力量隐藏在潜意识深处，灵性修行与自我超越是你人生的终极课题。",
  },
  Venus: {
    1: "你的外貌与气质散发着自然的魅力，人际关系对你的自我形象影响深远。",
    2: "你通过物质与感官享受来体验爱，对美丽事物的投资让你感到愉悦。",
    3: "你的魅力体现在沟通与表达中，善于用文字或言语建立美好的连结。",
    4: "家庭与家居美化是你的情感滋养，你对家庭关系有着深厚的感情。",
    5: "爱情、艺术与创造是你人生中最美丽的风景，浪漫情调是你的天赋。",
    6: "你在工作中表现出优雅与合作精神，对工作环境的美感有较高的要求。",
    7: "婚姻与伴侣是你人生中最重要的主题，你为重要关系愿意付出一切。",
    8: "你被神秘、深度的关系所吸引，共有资产与伴侣的资源是你的财富来源。",
    9: "你的爱情理想崇高而浪漫，渴望与伴侣一起探索世界与精神的边界。",
    10: "你的事业与社会形象可能与艺术、美或公共关系相关，魅力是你的职业资本。",
    11: "友谊对你极为重要，你可能在社群活动中遇见重要的伴侣或合作伙伴。",
    12: "你的爱情模式受潜意识影响较深，隐秘的恋情或灵性的联结吸引着你。",
  },
  Mars: {
    1: "你给人留下活力充沛、行动力强的第一印象，竞争意识是你的本能。",
    2: "你的行动力源于对财富安全感的追求，为了物质目标能爆发强烈的驱动力。",
    3: "你的思维敏捷、语言有力，善于在争论中取胜，文字是你的武器。",
    4: "家庭内部可能存在竞争与摩擦，你有强烈的保护家人的本能。",
    5: "你在创作、恋爱与竞技中释放能量，你的热情与激情令人印象深刻。",
    6: "你是一个高效的工作者，在日常职责中充满干劲，但需注意别对自己太苛刻。",
    7: "你的重要关系充满张力与激情，你被强势有主见的伴侣所吸引。",
    8: "你的意志力深沉而强大，擅于在危机中发力，对未知领域有强烈的探索欲。",
    9: "你的行动力通过信念与理想来驱动，你愿意为自己的哲学观而战。",
    10: "你的事业野心强烈，你渴望在职业领域中争得一席之地，领导欲旺盛。",
    11: "你在团体中常常是行动的发起者，为共同的理想而战令你热血沸腾。",
    12: "你的行动往往在幕后低调进行，内心深处有着强大的隐藏力量。",
  },
};

// 核心相位解析
export const ASPECT_INTERPRETATIONS: Partial<Record<Planet, Partial<Record<Planet, Partial<Record<AspectType, string>>>>>> = {
  Sun: {
    Moon: {
      conjunction: "日月合相：你的意志与情感高度融合，内外一致，行动力强，但有时过于主观。",
      opposition: "日月对相：意识与潜意识的拉锯战，在自我主张与情感需求之间寻找平衡是你的人生功课。",
      square: "日月刑相：内心的理性渴望与情感需求相互制约，成长来自整合这两股力量。",
      trine: "日月三分：意志与情感和谐共振，你的内外世界相互支持，心情稳定，行动有力。",
      sextile: "日月六分：理性与感性能相互配合，你有着良好的情绪智慧与自我调节能力。",
    },
    Jupiter: {
      conjunction: "日木合相：你天生乐观，充满扩张的能量，有幸运与机遇的加持，但需防过度乐观。",
      trine: "日木三分：幸运之星，你的人生中常有贵人相助，扩展与成长是你的人生底色。",
      square: "日木刑相：过度扩张或自信可能导致判断失误，需在野心与现实之间寻找平衡。",
      opposition: "日木对相：你渴望远方，但可能在过度承诺与收缩退后之间摇摆。",
      sextile: "日木六分：机遇常伴，你有着受人欢迎的乐观气质，社交能力为你带来发展。",
    },
    Saturn: {
      conjunction: "日土合相：你的人生主题是通过努力与承担责任来建立自我，早年可能感到压抑但终将厚积薄发。",
      trine: "日土三分：你拥有将热情转化为持续努力的天赋，纪律是你内化的能力而非外在束缚。",
      square: "日土刑相：自我价值的建立路途坎坷，需克服内外的限制与批判，但越战越勇。",
      opposition: "日土对相：关系中的权威议题与自我限制是你的成长课题，需学会在负责任的同时也尊重自己。",
      sextile: "日土六分：你有良好的自律能力，能在自由与结构之间取得平衡。",
    },
    Pluto: {
      conjunction: "日冥合相：你的生命充满了深度转化的能量，权力议题与重生是你的人生主旋律。",
      trine: "日冥三分：你拥有深沉的意志力与改变现状的能量，转化对你而言是自然流动的过程。",
      square: "日冥刑相：生命中的权力斗争与激烈转化推动你不断破旧立新，是痛苦中开出的花。",
      opposition: "日冥对相：你在关系与外界力量的碰撞中体验权力的议题，学习在转化中保持自我。",
      sextile: "日冥六分：你有着超越表象的洞察力，转化的能量为你所用，深刻而持久。",
    },
    Mars: {
      conjunction: "日火合相：你充满爆发性的能量与行动意志，领袖气质天然，但需学会控制冲动。",
      trine: "日火三分：意志与行动力完美配合，你充满阳刚的生命力，能有效实现目标。",
      square: "日火刑相：内在的冲动与意志相互摩擦，需学会以智慧引导能量，避免莽撞。",
      opposition: "日火对相：你的能量可能在外部关系中引发冲突，学会在坚持自我与灵活配合之间平衡。",
      sextile: "日火六分：行动力与目标感相互支持，你是一个能将想法付诸实践的人。",
    },
  },
  Moon: {
    Venus: {
      conjunction: "月金合相：你情感细腻，渴望美丽与和谐，对人充满温情，很容易赢得他人的喜爱。",
      trine: "月金三分：情感与爱的能量流动顺畅，你天生有着让关系变得美好的能力。",
      square: "月金刑相：情感需求与关系期待之间存在摩擦，学会接受爱的同时也接受不完美。",
      opposition: "月金对相：你在情感安全感与关系付出之间寻找平衡，需要在依恋与独立之间找到节点。",
      sextile: "月金六分：你的情感温暖而有魅力，善于创造舒适的人际关系氛围。",
    },
    Saturn: {
      conjunction: "月土合相：情感与安全感的建立道路较为艰辛，你学会了用坚强替代脆弱，内心深处渴望被完全接纳。",
      trine: "月土三分：你有着成熟、负责任的情感态度，能在关系中给予稳定的支持。",
      square: "月土刑相：情感上的限制与压抑是你需要疗愈的核心主题，允许自己脆弱是成长的第一步。",
      opposition: "月土对相：你在情感需求与现实责任之间长期拉锯，学会两者都是真实且值得被尊重的。",
      sextile: "月土六分：你有着情感上的成熟度，能在维持稳定的同时适度表达需求。",
    },
    Pluto: {
      conjunction: "月冥合相：你的情感世界深沉而强烈，情绪可能如火山一般，经历过情感上的蜕变与重生。",
      trine: "月冥三分：你拥有情感洞察力与深层治愈的能力，能理解他人内心最隐秘的角落。",
      square: "月冥刑相：情感上的控制议题与极端体验是你的成长课题，在放手与掌控之间学会自由。",
      opposition: "月冥对相：你的亲密关系中充满了深度转化的力量，爱的深度是考验也是礼物。",
      sextile: "月冥六分：你的直觉敏锐而深刻，善于洞察他人深层的情感需求。",
    },
  },
};

// 城市经纬度数据库（常用城市）
export interface CityData {
  name: string;
  nameEn: string;
  lat: number;
  lng: number;
  timezone: string; // IANA 时区名称
  country: string;
}

// 国家中文名 → 英文名（城市下拉英文模式用）
export const COUNTRY_EN: Record<string, string> = {
  "中国": "China",
  "美国": "United States",
  "日本": "Japan",
  "印度": "India",
  "英国": "United Kingdom",
  "法国": "France",
  "德国": "Germany",
  "俄罗斯": "Russia",
  "加拿大": "Canada",
  "澳大利亚": "Australia",
  "韩国": "South Korea",
  "泰国": "Thailand",
  "新加坡": "Singapore",
  "马来西亚": "Malaysia",
  "印度尼西亚": "Indonesia",
};

// 国家简体 → 繁体（仅列不同者）
export const COUNTRY_TW: Record<string, string> = {
  "中国": "中國",
  "美国": "美國",
  "英国": "英國",
  "法国": "法國",
  "德国": "德國",
  "俄罗斯": "俄羅斯",
  "澳大利亚": "澳大利亞",
  "韩国": "韓國",
  "泰国": "泰國",
  "马来西亚": "馬來西亞",
  "印度尼西亚": "印度尼西亞",
};

// 城市简体 → 繁体（仅列与简体不同者；其余回退简体 name）
export const CITY_TW: Record<string, string> = {
  "广州": "廣州", "重庆": "重慶", "武汉": "武漢", "苏州": "蘇州", "长沙": "長沙",
  "郑州": "鄭州", "青岛": "青島", "大连": "大連", "厦门": "廈門", "哈尔滨": "哈爾濱",
  "沈阳": "瀋陽", "南宁": "南寧", "长春": "長春", "石家庄": "石家莊", "济南": "濟南",
  "贵阳": "貴陽", "兰州": "蘭州", "乌鲁木齐": "烏魯木齊", "拉萨": "拉薩", "银川": "銀川",
  "西宁": "西寧", "澳门": "澳門", "东京": "東京", "首尔": "首爾", "雅加达": "雅加達",
  "孟买": "孟買", "伦敦": "倫敦", "纽约": "紐約", "洛杉矶": "洛杉磯", "旧金山": "舊金山",
  "多伦多": "多倫多",
};

/** 城市显示名：en→nameEn；tw→繁体（缺失回退简体）；zh→简体 name */
export function cityLabel(city: CityData, lang: "zh" | "en" | "tw"): string {
  if (lang === "en") return city.nameEn;
  if (lang === "tw") return CITY_TW[city.name] ?? city.name;
  return city.name;
}

/** 国家显示名：en→英文映射；tw→繁体映射；缺失回退原值 */
export function countryLabel(country: string, lang: "zh" | "en" | "tw"): string {
  if (lang === "en") return COUNTRY_EN[country] ?? country;
  if (lang === "tw") return COUNTRY_TW[country] ?? country;
  return country;
}

export const CITY_DATABASE: CityData[] = [
  // 中国主要城市
  { name: "北京", nameEn: "Beijing", lat: 39.9042, lng: 116.4074, timezone: "Asia/Shanghai", country: "中国" },
  { name: "上海", nameEn: "Shanghai", lat: 31.2304, lng: 121.4737, timezone: "Asia/Shanghai", country: "中国" },
  { name: "广州", nameEn: "Guangzhou", lat: 23.1291, lng: 113.2644, timezone: "Asia/Shanghai", country: "中国" },
  { name: "深圳", nameEn: "Shenzhen", lat: 22.5431, lng: 114.0579, timezone: "Asia/Shanghai", country: "中国" },
  { name: "成都", nameEn: "Chengdu", lat: 30.5728, lng: 104.0668, timezone: "Asia/Shanghai", country: "中国" },
  { name: "重庆", nameEn: "Chongqing", lat: 29.4316, lng: 106.9123, timezone: "Asia/Shanghai", country: "中国" },
  { name: "杭州", nameEn: "Hangzhou", lat: 30.2741, lng: 120.1551, timezone: "Asia/Shanghai", country: "中国" },
  { name: "武汉", nameEn: "Wuhan", lat: 30.5928, lng: 114.3055, timezone: "Asia/Shanghai", country: "中国" },
  { name: "南京", nameEn: "Nanjing", lat: 32.0603, lng: 118.7969, timezone: "Asia/Shanghai", country: "中国" },
  { name: "西安", nameEn: "Xi'an", lat: 34.3416, lng: 108.9398, timezone: "Asia/Shanghai", country: "中国" },
  { name: "天津", nameEn: "Tianjin", lat: 39.3434, lng: 117.3616, timezone: "Asia/Shanghai", country: "中国" },
  { name: "苏州", nameEn: "Suzhou", lat: 31.2990, lng: 120.5853, timezone: "Asia/Shanghai", country: "中国" },
  { name: "长沙", nameEn: "Changsha", lat: 28.2278, lng: 112.9388, timezone: "Asia/Shanghai", country: "中国" },
  { name: "郑州", nameEn: "Zhengzhou", lat: 34.7466, lng: 113.6254, timezone: "Asia/Shanghai", country: "中国" },
  { name: "青岛", nameEn: "Qingdao", lat: 36.0671, lng: 120.3826, timezone: "Asia/Shanghai", country: "中国" },
  { name: "大连", nameEn: "Dalian", lat: 38.9140, lng: 121.6147, timezone: "Asia/Shanghai", country: "中国" },
  { name: "厦门", nameEn: "Xiamen", lat: 24.4798, lng: 118.0894, timezone: "Asia/Shanghai", country: "中国" },
  { name: "哈尔滨", nameEn: "Harbin", lat: 45.8038, lng: 126.5349, timezone: "Asia/Shanghai", country: "中国" },
  { name: "沈阳", nameEn: "Shenyang", lat: 41.8057, lng: 123.4315, timezone: "Asia/Shanghai", country: "中国" },
  { name: "昆明", nameEn: "Kunming", lat: 25.0389, lng: 102.7183, timezone: "Asia/Shanghai", country: "中国" },
  { name: "南宁", nameEn: "Nanning", lat: 22.8170, lng: 108.3665, timezone: "Asia/Shanghai", country: "中国" },
  { name: "合肥", nameEn: "Hefei", lat: 31.8206, lng: 117.2272, timezone: "Asia/Shanghai", country: "中国" },
  { name: "长春", nameEn: "Changchun", lat: 43.8171, lng: 125.3235, timezone: "Asia/Shanghai", country: "中国" },
  { name: "福州", nameEn: "Fuzhou", lat: 26.0745, lng: 119.2965, timezone: "Asia/Shanghai", country: "中国" },
  { name: "石家庄", nameEn: "Shijiazhuang", lat: 38.0428, lng: 114.5149, timezone: "Asia/Shanghai", country: "中国" },
  { name: "济南", nameEn: "Jinan", lat: 36.6512, lng: 117.1201, timezone: "Asia/Shanghai", country: "中国" },
  { name: "贵阳", nameEn: "Guiyang", lat: 26.6470, lng: 106.6302, timezone: "Asia/Shanghai", country: "中国" },
  { name: "兰州", nameEn: "Lanzhou", lat: 36.0611, lng: 103.8343, timezone: "Asia/Shanghai", country: "中国" },
  { name: "南昌", nameEn: "Nanchang", lat: 28.6820, lng: 115.8579, timezone: "Asia/Shanghai", country: "中国" },
  { name: "太原", nameEn: "Taiyuan", lat: 37.8706, lng: 112.5489, timezone: "Asia/Shanghai", country: "中国" },
  { name: "乌鲁木齐", nameEn: "Urumqi", lat: 43.8256, lng: 87.6168, timezone: "Asia/Urumqi", country: "中国" },
  { name: "拉萨", nameEn: "Lhasa", lat: 29.6520, lng: 91.1721, timezone: "Asia/Urumqi", country: "中国" },
  { name: "呼和浩特", nameEn: "Hohhot", lat: 40.8426, lng: 111.7497, timezone: "Asia/Shanghai", country: "中国" },
  { name: "银川", nameEn: "Yinchuan", lat: 38.4872, lng: 106.2309, timezone: "Asia/Shanghai", country: "中国" },
  { name: "西宁", nameEn: "Xining", lat: 36.6171, lng: 101.7782, timezone: "Asia/Shanghai", country: "中国" },
  { name: "香港", nameEn: "Hong Kong", lat: 22.3193, lng: 114.1694, timezone: "Asia/Hong_Kong", country: "中国" },
  { name: "澳门", nameEn: "Macau", lat: 22.1987, lng: 113.5439, timezone: "Asia/Macau", country: "中国" },
  { name: "台北", nameEn: "Taipei", lat: 25.0330, lng: 121.5654, timezone: "Asia/Taipei", country: "中国" },
  // 亚洲其他主要城市
  { name: "东京", nameEn: "Tokyo", lat: 35.6762, lng: 139.6503, timezone: "Asia/Tokyo", country: "日本" },
  { name: "大阪", nameEn: "Osaka", lat: 34.6937, lng: 135.5023, timezone: "Asia/Tokyo", country: "日本" },
  { name: "首尔", nameEn: "Seoul", lat: 37.5665, lng: 126.9780, timezone: "Asia/Seoul", country: "韩国" },
  { name: "新加坡", nameEn: "Singapore", lat: 1.3521, lng: 103.8198, timezone: "Asia/Singapore", country: "新加坡" },
  { name: "吉隆坡", nameEn: "Kuala Lumpur", lat: 3.1390, lng: 101.6869, timezone: "Asia/Kuala_Lumpur", country: "马来西亚" },
  { name: "曼谷", nameEn: "Bangkok", lat: 13.7563, lng: 100.5018, timezone: "Asia/Bangkok", country: "泰国" },
  { name: "雅加达", nameEn: "Jakarta", lat: -6.2088, lng: 106.8456, timezone: "Asia/Jakarta", country: "印度尼西亚" },
  { name: "孟买", nameEn: "Mumbai", lat: 19.0760, lng: 72.8777, timezone: "Asia/Kolkata", country: "印度" },
  { name: "德里", nameEn: "Delhi", lat: 28.6139, lng: 77.2090, timezone: "Asia/Kolkata", country: "印度" },
  // 欧美主要城市
  { name: "伦敦", nameEn: "London", lat: 51.5074, lng: -0.1278, timezone: "Europe/London", country: "英国" },
  { name: "巴黎", nameEn: "Paris", lat: 48.8566, lng: 2.3522, timezone: "Europe/Paris", country: "法国" },
  { name: "柏林", nameEn: "Berlin", lat: 52.5200, lng: 13.4050, timezone: "Europe/Berlin", country: "德国" },
  { name: "莫斯科", nameEn: "Moscow", lat: 55.7558, lng: 37.6173, timezone: "Europe/Moscow", country: "俄罗斯" },
  { name: "纽约", nameEn: "New York", lat: 40.7128, lng: -74.0060, timezone: "America/New_York", country: "美国" },
  { name: "洛杉矶", nameEn: "Los Angeles", lat: 34.0522, lng: -118.2437, timezone: "America/Los_Angeles", country: "美国" },
  { name: "旧金山", nameEn: "San Francisco", lat: 37.7749, lng: -122.4194, timezone: "America/Los_Angeles", country: "美国" },
  { name: "多伦多", nameEn: "Toronto", lat: 43.6532, lng: -79.3832, timezone: "America/Toronto", country: "加拿大" },
  { name: "悉尼", nameEn: "Sydney", lat: -33.8688, lng: 151.2093, timezone: "Australia/Sydney", country: "澳大利亚" },
];

// 搜索城市（模糊匹配）
export function searchCities(query: string): CityData[] {
  if (!query || query.length < 1) return CITY_DATABASE.slice(0, 10);
  const q = query.toLowerCase();
  return CITY_DATABASE.filter(
    (c) =>
      c.name.includes(query) ||
      c.nameEn.toLowerCase().includes(q) ||
      c.country.includes(query) ||
      (CITY_TW[c.name] ?? "").includes(query) ||
      (COUNTRY_TW[c.country] ?? "").includes(query),
  ).slice(0, 10);
}

// 将 Date 转换为 UTC 时间戳（考虑时区偏移）
export function getTimezoneOffset(timezone: string, date: Date): number {
  try {
    const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
    const localDate = new Date(date.toLocaleString("en-US", { timeZone: timezone }));
    return (localDate.getTime() - utcDate.getTime()) / 60000; // 返回分钟数
  } catch {
    return 480; // 默认 UTC+8 (中国标准时)
  }
}