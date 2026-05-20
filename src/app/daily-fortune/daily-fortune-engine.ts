// ===== 每日开运指南引擎 =====

export interface DailyFortuneInput {
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  name?: string;
}

export interface DailyFortuneResult {
  date: string;           // 今日日期
  lunarDate: string;      // 农历
  heavenlyStem: string;   // 日柱天干
  earthlyBranch: string;  // 日柱地支
  dayElement: string;     // 今日五行
  luckyColor: string;     // 幸运色
  luckyColorHex: string;  // 幸运色hex
  luckyColorEmoji: string;
  luckyNumber: number;    // 幸运数字
  luckyNumbers: number[]; // 幸运数字组
  luckyDirection: string; // 幸运方位
  luckyDirectionEmoji: string;
  luckyFood: string;      // 幸运食物
  luckyTime: string;      // 开运时辰
  outfit: string;         // 穿搭建议
  accessory: string;      // 配饰建议
  avoidColor: string;     // 今日避色
  dailyMantra: string;    // 今日咒语/打气话
  overallScore: number;   // 今日总运 0-100
  loveScore: number;      // 感情运
  careerScore: number;    // 事业运
  wealthScore: number;    // 财运
  healthScore: number;    // 健康运
  morningRitual: string;  // 早上开运行为
  avoidList: string[];    // 今日禁忌
  blessingWord: string;   // 祝福语
  element: string;        // 本命五行
  elementEmoji: string;
}

// 天干
const HEAVENLY_STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
// 地支
const EARTHLY_BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
// 天干五行
const STEM_ELEMENT: Record<string, string> = {
  甲: "木", 乙: "木", 丙: "火", 丁: "火", 戊: "土",
  己: "土", 庚: "金", 辛: "金", 壬: "水", 癸: "水",
};

// 五行对应数据
const ELEMENT_DATA: Record<string, {
  colors: Array<{ name: string; hex: string; emoji: string }>;
  avoidColors: string[];
  directions: Array<{ name: string; emoji: string }>;
  foods: string[];
  accessories: string[];
  number: number[];
}> = {
  木: {
    colors: [
      { name: "翠绿", hex: "#2D8A4E", emoji: "🟢" },
      { name: "碧色", hex: "#3CB371", emoji: "💚" },
      { name: "青碧", hex: "#66CDAA", emoji: "🌿" },
    ],
    avoidColors: ["白色", "米色"],
    directions: [{ name: "东方", emoji: "🌅" }, { name: "东南方", emoji: "🧭" }],
    foods: ["韭菜", "芹菜", "菠菜", "柠檬", "青梅"],
    accessories: ["翡翠饰品", "绿植小摆件", "木质手串"],
    number: [3, 4, 8],
  },
  火: {
    colors: [
      { name: "热情红", hex: "#E63946", emoji: "🔴" },
      { name: "橙光色", hex: "#FF6B35", emoji: "🟠" },
      { name: "暖粉色", hex: "#FF80AB", emoji: "💗" },
    ],
    avoidColors: ["黑色", "深蓝"],
    directions: [{ name: "南方", emoji: "☀️" }, { name: "西南方", emoji: "🧭" }],
    foods: ["红椒", "荔枝", "红枣", "草莓", "番茄"],
    accessories: ["红绳手链", "红宝石饰品", "火焰纹样"],
    number: [2, 7, 9],
  },
  土: {
    colors: [
      { name: "暖黄", hex: "#F0A500", emoji: "🟡" },
      { name: "土棕", hex: "#B5835A", emoji: "🟤" },
      { name: "米金", hex: "#DEB887", emoji: "🌾" },
    ],
    avoidColors: ["绿色", "蓝绿"],
    directions: [{ name: "中央", emoji: "⭐" }, { name: "西南方", emoji: "🧭" }],
    foods: ["南瓜", "红薯", "板栗", "土豆", "山药"],
    accessories: ["琥珀饰品", "黄水晶", "陶瓷摆件"],
    number: [5, 0, 8],
  },
  金: {
    colors: [
      { name: "月白", hex: "#F5F5F5", emoji: "⚪" },
      { name: "银光", hex: "#C0C0C0", emoji: "🩶" },
      { name: "香槟金", hex: "#F5CBA7", emoji: "✨" },
    ],
    avoidColors: ["赤红", "粉红"],
    directions: [{ name: "西方", emoji: "🌆" }, { name: "西北方", emoji: "🧭" }],
    foods: ["白萝卜", "梨子", "银耳", "杏仁", "莲藕"],
    accessories: ["金属手表", "银手链", "白玉饰品"],
    number: [4, 9, 6],
  },
  水: {
    colors: [
      { name: "深海蓝", hex: "#2C3E85", emoji: "🔵" },
      { name: "星空黑", hex: "#1A1A2E", emoji: "⚫" },
      { name: "薄荷蓝", hex: "#A8D8EA", emoji: "💠" },
    ],
    avoidColors: ["黄色", "橙色"],
    directions: [{ name: "北方", emoji: "❄️" }, { name: "东北方", emoji: "🧭" }],
    foods: ["黑豆", "海带", "紫菜", "蓝莓", "黑芝麻"],
    accessories: ["水晶饰品", "海蓝宝石", "珍珠项链"],
    number: [1, 6, 7],
  },
};

// 生肖对应本命五行（简化版，按年支）
function getBirthElement(year: number): string {
  const branch = EARTHLY_BRANCHES[(year - 4) % 12]!;
  const branchElement: Record<string, string> = {
    子: "水", 丑: "土", 寅: "木", 卯: "木",
    辰: "土", 巳: "火", 午: "火", 未: "土",
    申: "金", 酉: "金", 戌: "土", 亥: "水",
  };
  return branchElement[branch] ?? "土";
}

// 获取日柱天干地支
function getDayStemBranch(date: Date): { stem: string; branch: string } {
  // 以2024-01-01为基准：甲子日（序号0）
  const BASE = new Date(2024, 0, 1);
  const diff = Math.floor((date.getTime() - BASE.getTime()) / 86400000);
  const stemIdx = ((diff % 10) + 10) % 10;
  const branchIdx = ((diff % 12) + 12) % 12;
  return {
    stem: HEAVENLY_STEMS[stemIdx]!,
    branch: EARTHLY_BRANCHES[branchIdx]!,
  };
}

// 农历简化（仅做展示，不精确）
function getLunarDateStr(date: Date): string {
  const months = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];
  const days = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
    "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
    "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];
  // 近似农历：以2000年1月1日=农历丙辰年十一月廿六为参考
  const BASE = new Date(2000, 0, 1);
  const diffDays = Math.floor((date.getTime() - BASE.getTime()) / 86400000);
  const lunarDay = ((diffDays + 25) % 30 + 30) % 30;
  const lunarMonth = (Math.floor((diffDays + 25) / 30) % 12 + 12) % 12;
  return `农历${months[lunarMonth]}月${days[lunarDay]}`;
}

// 开运时辰
const LUCKY_TIMES = ["子时(23-1)", "丑时(1-3)", "寅时(3-5)", "卯时(5-7)",
  "辰时(7-9)", "巳时(9-11)", "午时(11-13)", "未时(13-15)",
  "申时(15-17)", "酉时(17-19)", "戌时(19-21)", "亥时(21-23)"];

// 穿搭建议
const OUTFIT_TEMPLATES: Record<string, string[]> = {
  木: [
    "今天适合穿绿色或蓝绿系服装，自然感面料（棉麻）能增强木气，职场建议搭配植物纹样配件",
    "绿植系穿搭激活你的生长能量，宽松的自然风格让你灵感涌现",
    "青色或翠绿色上衣配米白色裤装，展现清新生机，木元素护你今日顺遂",
  ],
  火: [
    "穿上红色或橙色单品，激活你的火焰能量！今日适合穿出自信，大胆撞色是吸引好运的关键",
    "暖色调穿搭让你热情四射，红绳或橙色配饰为你的魅力加持",
    "玫红或珊瑚色系今日大吉，搭配金属质感配件，职场气场全开",
  ],
  土: [
    "今天穿黄色、土棕或米金色系，稳定踏实的气场助你赢得贵人信任",
    "暖色系大地色调今日护体，棉麻质感的服装搭配木质饰品，踏实开运",
    "焦糖色或卡其色穿搭今日吉祥，给人可靠稳重的印象，适合重要场合",
  ],
  金: [
    "白色、银色或香槟金色系是你的幸运穿搭，金属质感饰品助你气场提升",
    "白色干净利落的穿搭今日大吉，搭配银色或金色细节配件，精英感十足",
    "浅色系+金属配饰是今日开运公式，简约高级感让贵人主动靠近你",
  ],
  水: [
    "深蓝、黑色或深紫系服装今日护运，智慧与神秘感让你在人群中脱颖而出",
    "午夜蓝或墨黑色系今日吉，低调内敛的搭配藏着最强气场",
    "深色调穿搭搭配白色或银色点缀，展现你的内敛力量，贵人今日暗中相助",
  ],
};

const MORNING_RITUALS: Record<string, string> = {
  木: "早晨对着绿植深呼吸3次，感受自然能量灌入，开窗迎接东方第一缕阳光",
  火: "早晨点一根红色蜡烛或看窗外阳光10秒，口念「今日我心如火，热情迎接一切」",
  土: "早晨摸一下土地（或花盆里的泥土），喝一杯温热蜂蜜水，脚踏实地开始新的一天",
  金: "早晨洗把冷水脸，整理仪容仪表，深呼吸后对自己说「今日清明，所愿皆成」",
  水: "早晨冥想5分钟，想象自己是平静的水面，智慧如水，今日顺流而行",
};

const DAILY_MANTRAS = [
  "今天是充满可能的一天，宇宙已在为你铺路。",
  "你比你想象的更有力量，今天是你闪耀的时候。",
  "把每一个微笑当作开运咒语，好运会回应你的温柔。",
  "放下昨天的包袱，轻装上阵，今天有新的惊喜等着你。",
  "内心平静，外在顺遂。今天的你，值得所有美好。",
  "相信直觉，它比你以为的更可靠。",
  "今天做的每一个小决定，都在悄悄改变你的命运轨迹。",
  "感恩今天的阳光与空气，丰盛自会来到你身边。",
];

const AVOID_LISTS: Record<string, string[][]> = {
  木: [
    ["避免与人争吵，今日宜静不宜动", "忌大量饮酒", "避免在西方向做重大决策"],
    ["忌签署重要合同（先查日柱）", "避免熬夜消耗木气", "忌在阴暗潮湿处久坐"],
  ],
  火: [
    ["避免冲动消费", "忌与水象星座朋友正面冲突", "避免在北方向谈重要事"],
    ["忌过度兴奋影响判断", "避免剧烈运动后立即吹冷风", "忌说气话"],
  ],
  土: [
    ["避免做高风险投资决策", "忌过度劳累", "避免与木旺之人发生摩擦"],
    ["忌食生冷食物伤脾胃", "避免轻信他人", "忌搬动大件物品"],
  ],
  金: [
    ["避免在东方向做重要决定", "忌口舌之争", "避免接触刀具等金属利器"],
    ["忌哭泣（今日忌水）", "避免情绪化表达", "忌冒险行事"],
  ],
  水: [
    ["避免大量出汗（精气外泄）", "忌在南方向签合同", "避免与火旺之人争执"],
    ["忌过多饮酒（乱水气）", "避免轻率决策", "忌夜晚单独在外"],
  ],
};

const BLESSING_WORDS = [
  "愿今日所愿皆成，所求皆满，好运如约而至 ✨",
  "天时地利人和，今日诸事顺遂，万事大吉 🌟",
  "宇宙为你保驾护航，今天你是最特别的存在 💫",
  "好运正在路上，请以最好的状态迎接它 🍀",
  "今日开运，福星高照，愿你笑颜如花 🌸",
];

// 伪随机（基于日期和出生日）
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return ((s >>> 0) / 0xffffffff);
  };
}

export function buildDailyFortuneResult(input: DailyFortuneInput): DailyFortuneResult {
  const today = new Date();
  const dateKey = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const birthKey = input.birthYear * 10000 + input.birthMonth * 100 + input.birthDay;
  const seed = (dateKey ^ birthKey) + input.birthDay * 31 + input.birthMonth * 97;
  const rand = seededRandom(seed);

  const birthElement = getBirthElement(input.birthYear);
  const { stem, branch } = getDayStemBranch(today);
  const dayElement = STEM_ELEMENT[stem] ?? "土";

  // 本命五行与日柱五行的相生相克影响今日运势基础分
  const RELATION: Record<string, Record<string, number>> = {
    木: { 木: 70, 火: 85, 水: 75, 土: 55, 金: 45 },
    火: { 火: 70, 土: 85, 木: 80, 金: 55, 水: 40 },
    土: { 土: 70, 金: 85, 火: 80, 水: 55, 木: 45 },
    金: { 金: 70, 水: 85, 土: 80, 木: 55, 火: 40 },
    水: { 水: 70, 木: 85, 金: 80, 火: 55, 土: 40 },
  };
  const baseScore = RELATION[birthElement]?.[dayElement] ?? 65;

  const eData = ELEMENT_DATA[birthElement]!;
  const colorIdx = Math.floor(rand() * eData.colors.length);
  const luckyColor = eData.colors[colorIdx]!;
  const dirIdx = Math.floor(rand() * eData.directions.length);
  const luckyDir = eData.directions[dirIdx]!;
  const foodIdx = Math.floor(rand() * eData.foods.length);
  const accIdx = Math.floor(rand() * eData.accessories.length);
  const timeIdx = Math.floor(rand() * LUCKY_TIMES.length);
  const outfitArr = OUTFIT_TEMPLATES[birthElement]!;
  const outfitIdx = Math.floor(rand() * outfitArr.length);
  const mantrasIdx = Math.floor(rand() * DAILY_MANTRAS.length);
  const avoidArr = AVOID_LISTS[birthElement]![Math.floor(rand() * 2)]!;
  const blessingIdx = Math.floor(rand() * BLESSING_WORDS.length);
  const numArr = eData.number;
  const luckyNum = numArr[Math.floor(rand() * numArr.length)]!;

  // 分项运势（在基础分±15浮动）
  const variance = () => Math.floor((rand() - 0.5) * 30);
  const clamp = (v: number) => Math.max(30, Math.min(99, v));

  const ELEMENT_EMOJIS: Record<string, string> = {
    木: "🌿", 火: "🔥", 土: "🌾", 金: "✨", 水: "💧",
  };

  return {
    date: today.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric", weekday: "long" }),
    lunarDate: getLunarDateStr(today),
    heavenlyStem: stem,
    earthlyBranch: branch,
    dayElement,
    luckyColor: luckyColor.name,
    luckyColorHex: luckyColor.hex,
    luckyColorEmoji: luckyColor.emoji,
    luckyNumber: luckyNum,
    luckyNumbers: numArr,
    luckyDirection: luckyDir.name,
    luckyDirectionEmoji: luckyDir.emoji,
    luckyFood: eData.foods[foodIdx]!,
    luckyTime: LUCKY_TIMES[timeIdx]!,
    outfit: outfitArr[outfitIdx]!,
    accessory: eData.accessories[accIdx]!,
    avoidColor: eData.avoidColors.join("、"),
    dailyMantra: DAILY_MANTRAS[mantrasIdx]!,
    overallScore: clamp(baseScore + variance()),
    loveScore: clamp(baseScore + variance()),
    careerScore: clamp(baseScore + variance()),
    wealthScore: clamp(baseScore + variance()),
    healthScore: clamp(baseScore + variance()),
    morningRitual: MORNING_RITUALS[birthElement]!,
    avoidList: avoidArr,
    blessingWord: BLESSING_WORDS[blessingIdx]!,
    element: birthElement,
    elementEmoji: ELEMENT_EMOJIS[birthElement]!,
  };
}
