// ===== 每日开运指南引擎 =====
//
// 多语言化：所有用户可见的中文 VALUE 使用本地化结构 L / LArr。
// - L    = { zh, en, tw } 单条字符串
// - LArr = { zh[], en[], tw[] } 字符串数组
// buildDailyFortuneResult 接收 lang，在返回 DailyFortuneResult 前把这些结构
// 解析成纯 string / string[]，因此 DailyFortuneResult 的字段类型保持不变。

export type Lang = "zh" | "en" | "tw";

/** 单条本地化字符串 */
type L = { zh: string; en: string; tw: string };
/** 本地化字符串数组 */
type LArr = { zh: string[]; en: string[]; tw: string[] };

/** 解析单条本地化字符串 */
function rs(v: L, lang: Lang): string {
  return v[lang];
}
/** 解析本地化字符串数组 */
function ra(v: LArr, lang: Lang): string[] {
  return v[lang];
}

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

// 天干（日历术语，保持中文 token；tw 与 zh 同形）
const HEAVENLY_STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
// 地支
const EARTHLY_BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
// 天干五行
const STEM_ELEMENT: Record<string, string> = {
  甲: "木", 乙: "木", 丙: "火", 丁: "火", 戊: "土",
  己: "土", 庚: "金", 辛: "金", 壬: "水", 癸: "水",
};

// 五行名称本地化（key 为 zh 内部值，value 为展示文案）
const ELEMENT_NAME: Record<string, L> = {
  木: { zh: "木", en: "Wood", tw: "木" },
  火: { zh: "火", en: "Fire", tw: "火" },
  土: { zh: "土", en: "Earth", tw: "土" },
  金: { zh: "金", en: "Metal", tw: "金" },
  水: { zh: "水", en: "Water", tw: "水" },
};

// 五行对应数据（颜色名、方位、食物、配饰、避色均本地化）
const ELEMENT_DATA: Record<string, {
  colors: Array<{ name: L; hex: string; emoji: string }>;
  avoidColors: L[];
  directions: Array<{ name: L; emoji: string }>;
  foods: L[];
  accessories: L[];
  number: number[];
}> = {
  木: {
    colors: [
      { name: { zh: "翠绿", en: "Emerald Green", tw: "翠綠" }, hex: "#2D8A4E", emoji: "🟢" },
      { name: { zh: "碧色", en: "Jade Green", tw: "碧色" }, hex: "#3CB371", emoji: "💚" },
      { name: { zh: "青碧", en: "Aqua Green", tw: "青碧" }, hex: "#66CDAA", emoji: "🌿" },
    ],
    avoidColors: [
      { zh: "白色", en: "White", tw: "白色" },
      { zh: "米色", en: "Beige", tw: "米色" },
    ],
    directions: [
      { name: { zh: "东方", en: "East", tw: "東方" }, emoji: "🌅" },
      { name: { zh: "东南方", en: "Southeast", tw: "東南方" }, emoji: "🧭" },
    ],
    foods: [
      { zh: "韭菜", en: "leek", tw: "韭菜" },
      { zh: "芹菜", en: "celery", tw: "芹菜" },
      { zh: "菠菜", en: "spinach", tw: "菠菜" },
      { zh: "柠檬", en: "lemon", tw: "檸檬" },
      { zh: "青梅", en: "green plum", tw: "青梅" },
    ],
    accessories: [
      { zh: "翡翠饰品", en: "jade jewelry", tw: "翡翠飾品" },
      { zh: "绿植小摆件", en: "a small potted-plant ornament", tw: "綠植小擺件" },
      { zh: "木质手串", en: "a wooden bead bracelet", tw: "木質手串" },
    ],
    number: [3, 4, 8],
  },
  火: {
    colors: [
      { name: { zh: "热情红", en: "Passion Red", tw: "熱情紅" }, hex: "#E63946", emoji: "🔴" },
      { name: { zh: "橙光色", en: "Glowing Orange", tw: "橙光色" }, hex: "#FF6B35", emoji: "🟠" },
      { name: { zh: "暖粉色", en: "Warm Pink", tw: "暖粉色" }, hex: "#FF80AB", emoji: "💗" },
    ],
    avoidColors: [
      { zh: "黑色", en: "Black", tw: "黑色" },
      { zh: "深蓝", en: "Deep Blue", tw: "深藍" },
    ],
    directions: [
      { name: { zh: "南方", en: "South", tw: "南方" }, emoji: "☀️" },
      { name: { zh: "西南方", en: "Southwest", tw: "西南方" }, emoji: "🧭" },
    ],
    foods: [
      { zh: "红椒", en: "red pepper", tw: "紅椒" },
      { zh: "荔枝", en: "lychee", tw: "荔枝" },
      { zh: "红枣", en: "red dates", tw: "紅棗" },
      { zh: "草莓", en: "strawberry", tw: "草莓" },
      { zh: "番茄", en: "tomato", tw: "番茄" },
    ],
    accessories: [
      { zh: "红绳手链", en: "a red-string bracelet", tw: "紅繩手鍊" },
      { zh: "红宝石饰品", en: "ruby jewelry", tw: "紅寶石飾品" },
      { zh: "火焰纹样", en: "flame-pattern accents", tw: "火焰紋樣" },
    ],
    number: [2, 7, 9],
  },
  土: {
    colors: [
      { name: { zh: "暖黄", en: "Warm Yellow", tw: "暖黃" }, hex: "#F0A500", emoji: "🟡" },
      { name: { zh: "土棕", en: "Earthy Brown", tw: "土棕" }, hex: "#B5835A", emoji: "🟤" },
      { name: { zh: "米金", en: "Beige Gold", tw: "米金" }, hex: "#DEB887", emoji: "🌾" },
    ],
    avoidColors: [
      { zh: "绿色", en: "Green", tw: "綠色" },
      { zh: "蓝绿", en: "Teal", tw: "藍綠" },
    ],
    directions: [
      { name: { zh: "中央", en: "Center", tw: "中央" }, emoji: "⭐" },
      { name: { zh: "西南方", en: "Southwest", tw: "西南方" }, emoji: "🧭" },
    ],
    foods: [
      { zh: "南瓜", en: "pumpkin", tw: "南瓜" },
      { zh: "红薯", en: "sweet potato", tw: "地瓜" },
      { zh: "板栗", en: "chestnut", tw: "板栗" },
      { zh: "土豆", en: "potato", tw: "馬鈴薯" },
      { zh: "山药", en: "yam", tw: "山藥" },
    ],
    accessories: [
      { zh: "琥珀饰品", en: "amber jewelry", tw: "琥珀飾品" },
      { zh: "黄水晶", en: "citrine", tw: "黃水晶" },
      { zh: "陶瓷摆件", en: "a ceramic ornament", tw: "陶瓷擺件" },
    ],
    number: [5, 0, 8],
  },
  金: {
    colors: [
      { name: { zh: "月白", en: "Moon White", tw: "月白" }, hex: "#F5F5F5", emoji: "⚪" },
      { name: { zh: "银光", en: "Silver Shine", tw: "銀光" }, hex: "#C0C0C0", emoji: "🩶" },
      { name: { zh: "香槟金", en: "Champagne Gold", tw: "香檳金" }, hex: "#F5CBA7", emoji: "✨" },
    ],
    avoidColors: [
      { zh: "赤红", en: "Crimson", tw: "赤紅" },
      { zh: "粉红", en: "Pink", tw: "粉紅" },
    ],
    directions: [
      { name: { zh: "西方", en: "West", tw: "西方" }, emoji: "🌆" },
      { name: { zh: "西北方", en: "Northwest", tw: "西北方" }, emoji: "🧭" },
    ],
    foods: [
      { zh: "白萝卜", en: "white radish", tw: "白蘿蔔" },
      { zh: "梨子", en: "pear", tw: "梨子" },
      { zh: "银耳", en: "white fungus", tw: "白木耳" },
      { zh: "杏仁", en: "almond", tw: "杏仁" },
      { zh: "莲藕", en: "lotus root", tw: "蓮藕" },
    ],
    accessories: [
      { zh: "金属手表", en: "a metal watch", tw: "金屬手錶" },
      { zh: "银手链", en: "a silver bracelet", tw: "銀手鍊" },
      { zh: "白玉饰品", en: "white-jade jewelry", tw: "白玉飾品" },
    ],
    number: [4, 9, 6],
  },
  水: {
    colors: [
      { name: { zh: "深海蓝", en: "Deep Sea Blue", tw: "深海藍" }, hex: "#2C3E85", emoji: "🔵" },
      { name: { zh: "星空黑", en: "Starry Black", tw: "星空黑" }, hex: "#1A1A2E", emoji: "⚫" },
      { name: { zh: "薄荷蓝", en: "Mint Blue", tw: "薄荷藍" }, hex: "#A8D8EA", emoji: "💠" },
    ],
    avoidColors: [
      { zh: "黄色", en: "Yellow", tw: "黃色" },
      { zh: "橙色", en: "Orange", tw: "橙色" },
    ],
    directions: [
      { name: { zh: "北方", en: "North", tw: "北方" }, emoji: "❄️" },
      { name: { zh: "东北方", en: "Northeast", tw: "東北方" }, emoji: "🧭" },
    ],
    foods: [
      { zh: "黑豆", en: "black beans", tw: "黑豆" },
      { zh: "海带", en: "kelp", tw: "海帶" },
      { zh: "紫菜", en: "seaweed", tw: "紫菜" },
      { zh: "蓝莓", en: "blueberry", tw: "藍莓" },
      { zh: "黑芝麻", en: "black sesame", tw: "黑芝麻" },
    ],
    accessories: [
      { zh: "水晶饰品", en: "crystal jewelry", tw: "水晶飾品" },
      { zh: "海蓝宝石", en: "aquamarine", tw: "海藍寶石" },
      { zh: "珍珠项链", en: "a pearl necklace", tw: "珍珠項鍊" },
    ],
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

// 农历简化（仅做展示，不精确）。日历术语：zh/tw 用中文，en 用罗马化形式。
function getLunarDateStr(date: Date, lang: Lang): string {
  const months = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];
  const monthsTw = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "臘"];
  const days = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
    "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
    "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];
  // 近似农历：以2000年1月1日=农历丙辰年十一月廿六为参考
  const BASE = new Date(2000, 0, 1);
  const diffDays = Math.floor((date.getTime() - BASE.getTime()) / 86400000);
  const lunarDay = ((diffDays + 25) % 30 + 30) % 30;
  const lunarMonth = (Math.floor((diffDays + 25) / 30) % 12 + 12) % 12;
  if (lang === "en") {
    // 罗马化（短日历 token，低优先级）
    return `Lunar Month ${lunarMonth + 1}, Day ${lunarDay + 1}`;
  }
  if (lang === "tw") {
    return `農曆${monthsTw[lunarMonth]}月${days[lunarDay]}`;
  }
  return `农历${months[lunarMonth]}月${days[lunarDay]}`;
}

// 开运时辰（时辰名 + 时段）。en 罗马化时辰名 + 24h 时段。
const LUCKY_TIMES: L[] = [
  { zh: "子时(23-1)", en: "Zi hour (23:00-01:00)", tw: "子時(23-1)" },
  { zh: "丑时(1-3)", en: "Chou hour (01:00-03:00)", tw: "丑時(1-3)" },
  { zh: "寅时(3-5)", en: "Yin hour (03:00-05:00)", tw: "寅時(3-5)" },
  { zh: "卯时(5-7)", en: "Mao hour (05:00-07:00)", tw: "卯時(5-7)" },
  { zh: "辰时(7-9)", en: "Chen hour (07:00-09:00)", tw: "辰時(7-9)" },
  { zh: "巳时(9-11)", en: "Si hour (09:00-11:00)", tw: "巳時(9-11)" },
  { zh: "午时(11-13)", en: "Wu hour (11:00-13:00)", tw: "午時(11-13)" },
  { zh: "未时(13-15)", en: "Wei hour (13:00-15:00)", tw: "未時(13-15)" },
  { zh: "申时(15-17)", en: "Shen hour (15:00-17:00)", tw: "申時(15-17)" },
  { zh: "酉时(17-19)", en: "You hour (17:00-19:00)", tw: "酉時(17-19)" },
  { zh: "戌时(19-21)", en: "Xu hour (19:00-21:00)", tw: "戌時(19-21)" },
  { zh: "亥时(21-23)", en: "Hai hour (21:00-23:00)", tw: "亥時(21-23)" },
];

// 穿搭建议
const OUTFIT_TEMPLATES: Record<string, L[]> = {
  木: [
    {
      zh: "今天适合穿绿色或蓝绿系服装，自然感面料（棉麻）能增强木气，职场建议搭配植物纹样配件",
      en: "Today suits green or teal outfits; natural fabrics like cotton and linen boost your Wood energy, and botanical-print accessories work well at work.",
      tw: "今天適合穿綠色或藍綠系服裝，自然感面料（棉麻）能增強木氣，職場建議搭配植物紋樣配件",
    },
    {
      zh: "绿植系穿搭激活你的生长能量，宽松的自然风格让你灵感涌现",
      en: "A leafy-green look awakens your growth energy, and a loose, natural style keeps the inspiration flowing.",
      tw: "綠植系穿搭激活你的生長能量，寬鬆的自然風格讓你靈感湧現",
    },
    {
      zh: "青色或翠绿色上衣配米白色裤装，展现清新生机，木元素护你今日顺遂",
      en: "A teal or emerald top with off-white trousers radiates fresh vitality, letting the Wood element smooth your whole day.",
      tw: "青色或翠綠色上衣配米白色褲裝，展現清新生機，木元素護你今日順遂",
    },
  ],
  火: [
    {
      zh: "穿上红色或橙色单品，激活你的火焰能量！今日适合穿出自信，大胆撞色是吸引好运的关键",
      en: "Put on a red or orange piece to ignite your fire energy! Today is for dressing with confidence, and bold color contrasts are the key to attracting luck.",
      tw: "穿上紅色或橙色單品，激活你的火焰能量！今日適合穿出自信，大膽撞色是吸引好運的關鍵",
    },
    {
      zh: "暖色调穿搭让你热情四射，红绳或橙色配饰为你的魅力加持",
      en: "A warm-toned look makes you radiate passion, and a red-string or orange accessory adds to your charm.",
      tw: "暖色調穿搭讓你熱情四射，紅繩或橙色配飾為你的魅力加持",
    },
    {
      zh: "玫红或珊瑚色系今日大吉，搭配金属质感配件，职场气场全开",
      en: "Rose-red or coral tones are auspicious today; pair them with metallic accents for full presence at work.",
      tw: "玫紅或珊瑚色系今日大吉，搭配金屬質感配件，職場氣場全開",
    },
  ],
  土: [
    {
      zh: "今天穿黄色、土棕或米金色系，稳定踏实的气场助你赢得贵人信任",
      en: "Wear yellow, earthy brown, or beige-gold today; a grounded, steady aura helps you win the trust of benefactors.",
      tw: "今天穿黃色、土棕或米金色系，穩定踏實的氣場助你贏得貴人信任",
    },
    {
      zh: "暖色系大地色调今日护体，棉麻质感的服装搭配木质饰品，踏实开运",
      en: "Warm earth tones protect you today; cotton-linen clothing with wooden accessories grounds your good fortune.",
      tw: "暖色系大地色調今日護體，棉麻質感的服裝搭配木質飾品，踏實開運",
    },
    {
      zh: "焦糖色或卡其色穿搭今日吉祥，给人可靠稳重的印象，适合重要场合",
      en: "Caramel or khaki outfits are lucky today, giving a reliable and steady impression that suits important occasions.",
      tw: "焦糖色或卡其色穿搭今日吉祥，給人可靠穩重的印象，適合重要場合",
    },
  ],
  金: [
    {
      zh: "白色、银色或香槟金色系是你的幸运穿搭，金属质感饰品助你气场提升",
      en: "White, silver, or champagne-gold is your lucky look; metallic accessories elevate your presence.",
      tw: "白色、銀色或香檳金色系是你的幸運穿搭，金屬質感飾品助你氣場提升",
    },
    {
      zh: "白色干净利落的穿搭今日大吉，搭配银色或金色细节配件，精英感十足",
      en: "A crisp, clean white look is auspicious today; add silver or gold detail accessories for a polished, elite feel.",
      tw: "白色乾淨俐落的穿搭今日大吉，搭配銀色或金色細節配件，精英感十足",
    },
    {
      zh: "浅色系+金属配饰是今日开运公式，简约高级感让贵人主动靠近你",
      en: "Light tones plus metallic accessories are today's lucky formula; a minimal, refined feel draws benefactors toward you.",
      tw: "淺色系+金屬配飾是今日開運公式，簡約高級感讓貴人主動靠近你",
    },
  ],
  水: [
    {
      zh: "深蓝、黑色或深紫系服装今日护运，智慧与神秘感让你在人群中脱颖而出",
      en: "Deep blue, black, or deep purple guards your fortune today; wisdom and mystery help you stand out in the crowd.",
      tw: "深藍、黑色或深紫系服裝今日護運，智慧與神祕感讓你在人群中脫穎而出",
    },
    {
      zh: "午夜蓝或墨黑色系今日吉，低调内敛的搭配藏着最强气场",
      en: "Midnight blue or ink black is lucky today; an understated, restrained look hides your strongest aura.",
      tw: "午夜藍或墨黑色系今日吉，低調內斂的搭配藏著最強氣場",
    },
    {
      zh: "深色调穿搭搭配白色或银色点缀，展现你的内敛力量，贵人今日暗中相助",
      en: "Dark tones with white or silver accents reveal your quiet strength, and benefactors lend secret support today.",
      tw: "深色調穿搭搭配白色或銀色點綴，展現你的內斂力量，貴人今日暗中相助",
    },
  ],
};

const MORNING_RITUALS: Record<string, L> = {
  木: {
    zh: "早晨对着绿植深呼吸3次，感受自然能量灌入，开窗迎接东方第一缕阳光",
    en: "In the morning, take three deep breaths facing a green plant, feel nature's energy pour in, and open a window to greet the first eastern sunlight.",
    tw: "早晨對著綠植深呼吸3次，感受自然能量灌入，開窗迎接東方第一縷陽光",
  },
  火: {
    zh: "早晨点一根红色蜡烛或看窗外阳光10秒，口念「今日我心如火，热情迎接一切」",
    en: "In the morning, light a red candle or gaze at the sunlight for 10 seconds and say, \"Today my heart is like fire, embracing all with passion.\"",
    tw: "早晨點一根紅色蠟燭或看窗外陽光10秒，口念「今日我心如火，熱情迎接一切」",
  },
  土: {
    zh: "早晨摸一下土地（或花盆里的泥土），喝一杯温热蜂蜜水，脚踏实地开始新的一天",
    en: "In the morning, touch the earth (or the soil in a flowerpot), drink a cup of warm honey water, and start the new day grounded and steady.",
    tw: "早晨摸一下土地（或花盆裡的泥土），喝一杯溫熱蜂蜜水，腳踏實地開始新的一天",
  },
  金: {
    zh: "早晨洗把冷水脸，整理仪容仪表，深呼吸后对自己说「今日清明，所愿皆成」",
    en: "In the morning, splash cold water on your face, tidy your appearance, take a deep breath, and tell yourself, \"Today is clear, and all my wishes come true.\"",
    tw: "早晨洗把冷水臉，整理儀容儀表，深呼吸後對自己說「今日清明，所願皆成」",
  },
  水: {
    zh: "早晨冥想5分钟，想象自己是平静的水面，智慧如水，今日顺流而行",
    en: "In the morning, meditate for 5 minutes, picture yourself as a calm water surface, wise as water, flowing smoothly with the day.",
    tw: "早晨冥想5分鐘，想像自己是平靜的水面，智慧如水，今日順流而行",
  },
};

const DAILY_MANTRAS: L[] = [
  {
    zh: "今天是充满可能的一天，宇宙已在为你铺路。",
    en: "Today is a day full of possibility; the universe is already paving the way for you.",
    tw: "今天是充滿可能的一天，宇宙已在為你鋪路。",
  },
  {
    zh: "你比你想象的更有力量，今天是你闪耀的时候。",
    en: "You are stronger than you imagine, and today is your time to shine.",
    tw: "你比你想像的更有力量，今天是你閃耀的時候。",
  },
  {
    zh: "把每一个微笑当作开运咒语，好运会回应你的温柔。",
    en: "Treat every smile as a fortune-bringing mantra, and luck will answer your gentleness.",
    tw: "把每一個微笑當作開運咒語，好運會回應你的溫柔。",
  },
  {
    zh: "放下昨天的包袱，轻装上阵，今天有新的惊喜等着你。",
    en: "Set down yesterday's burdens and travel light; new surprises await you today.",
    tw: "放下昨天的包袱，輕裝上陣，今天有新的驚喜等著你。",
  },
  {
    zh: "内心平静，外在顺遂。今天的你，值得所有美好。",
    en: "Calm within, smooth without. Today, you deserve all that is good.",
    tw: "內心平靜，外在順遂。今天的你，值得所有美好。",
  },
  {
    zh: "相信直觉，它比你以为的更可靠。",
    en: "Trust your intuition; it is more reliable than you think.",
    tw: "相信直覺，它比你以為的更可靠。",
  },
  {
    zh: "今天做的每一个小决定，都在悄悄改变你的命运轨迹。",
    en: "Every small decision you make today is quietly reshaping the course of your destiny.",
    tw: "今天做的每一個小決定，都在悄悄改變你的命運軌跡。",
  },
  {
    zh: "感恩今天的阳光与空气，丰盛自会来到你身边。",
    en: "Be grateful for today's sunshine and air, and abundance will come to you on its own.",
    tw: "感恩今天的陽光與空氣，豐盛自會來到你身邊。",
  },
];

const AVOID_LISTS: Record<string, LArr[]> = {
  木: [
    {
      zh: ["避免与人争吵，今日宜静不宜动", "忌大量饮酒", "避免在西方向做重大决策"],
      en: ["Avoid arguments today; stay calm rather than restless", "Avoid drinking heavily", "Avoid making major decisions while facing west"],
      tw: ["避免與人爭吵，今日宜靜不宜動", "忌大量飲酒", "避免在西方向做重大決策"],
    },
    {
      zh: ["忌签署重要合同（先查日柱）", "避免熬夜消耗木气", "忌在阴暗潮湿处久坐"],
      en: ["Avoid signing important contracts (check the day pillar first)", "Avoid staying up late and draining your Wood energy", "Avoid sitting long in dark, damp places"],
      tw: ["忌簽署重要合同（先查日柱）", "避免熬夜消耗木氣", "忌在陰暗潮濕處久坐"],
    },
  ],
  火: [
    {
      zh: ["避免冲动消费", "忌与水象星座朋友正面冲突", "避免在北方向谈重要事"],
      en: ["Avoid impulse spending", "Avoid head-on conflict with Water-sign friends", "Avoid discussing important matters while facing north"],
      tw: ["避免衝動消費", "忌與水象星座朋友正面衝突", "避免在北方向談重要事"],
    },
    {
      zh: ["忌过度兴奋影响判断", "避免剧烈运动后立即吹冷风", "忌说气话"],
      en: ["Avoid letting over-excitement cloud your judgment", "Avoid cold drafts right after intense exercise", "Avoid speaking in anger"],
      tw: ["忌過度興奮影響判斷", "避免劇烈運動後立即吹冷風", "忌說氣話"],
    },
  ],
  土: [
    {
      zh: ["避免做高风险投资决策", "忌过度劳累", "避免与木旺之人发生摩擦"],
      en: ["Avoid high-risk investment decisions", "Avoid overexertion", "Avoid friction with people strong in Wood energy"],
      tw: ["避免做高風險投資決策", "忌過度勞累", "避免與木旺之人發生摩擦"],
    },
    {
      zh: ["忌食生冷食物伤脾胃", "避免轻信他人", "忌搬动大件物品"],
      en: ["Avoid raw or cold foods that harm the stomach", "Avoid trusting others too easily", "Avoid moving large heavy items"],
      tw: ["忌食生冷食物傷脾胃", "避免輕信他人", "忌搬動大件物品"],
    },
  ],
  金: [
    {
      zh: ["避免在东方向做重要决定", "忌口舌之争", "避免接触刀具等金属利器"],
      en: ["Avoid making important decisions while facing east", "Avoid quarrels and verbal disputes", "Avoid handling knives and other sharp metal tools"],
      tw: ["避免在東方向做重要決定", "忌口舌之爭", "避免接觸刀具等金屬利器"],
    },
    {
      zh: ["忌哭泣（今日忌水）", "避免情绪化表达", "忌冒险行事"],
      en: ["Avoid crying (Water is unfavorable today)", "Avoid emotional outbursts", "Avoid taking risky actions"],
      tw: ["忌哭泣（今日忌水）", "避免情緒化表達", "忌冒險行事"],
    },
  ],
  水: [
    {
      zh: ["避免大量出汗（精气外泄）", "忌在南方向签合同", "避免与火旺之人争执"],
      en: ["Avoid heavy sweating (it drains your vital energy)", "Avoid signing contracts while facing south", "Avoid arguing with people strong in Fire energy"],
      tw: ["避免大量出汗（精氣外洩）", "忌在南方向簽合同", "避免與火旺之人爭執"],
    },
    {
      zh: ["忌过多饮酒（乱水气）", "避免轻率决策", "忌夜晚单独在外"],
      en: ["Avoid drinking too much (it disturbs your Water energy)", "Avoid hasty decisions", "Avoid being out alone at night"],
      tw: ["忌過多飲酒（亂水氣）", "避免輕率決策", "忌夜晚單獨在外"],
    },
  ],
};

const BLESSING_WORDS: L[] = [
  {
    zh: "愿今日所愿皆成，所求皆满，好运如约而至 ✨",
    en: "May all your wishes come true today and your desires be fulfilled, with good fortune arriving right on time ✨",
    tw: "願今日所願皆成，所求皆滿，好運如約而至 ✨",
  },
  {
    zh: "天时地利人和，今日诸事顺遂，万事大吉 🌟",
    en: "Right timing, right place, right people — may everything go smoothly today and all be auspicious 🌟",
    tw: "天時地利人和，今日諸事順遂，萬事大吉 🌟",
  },
  {
    zh: "宇宙为你保驾护航，今天你是最特别的存在 💫",
    en: "The universe is watching over you; today you are the most special presence of all 💫",
    tw: "宇宙為你保駕護航，今天你是最特別的存在 💫",
  },
  {
    zh: "好运正在路上，请以最好的状态迎接它 🍀",
    en: "Good luck is on its way — greet it in your very best state 🍀",
    tw: "好運正在路上，請以最好的狀態迎接它 🍀",
  },
  {
    zh: "今日开运，福星高照，愿你笑颜如花 🌸",
    en: "Fortune favors you today under a lucky star; may your smile bloom like a flower 🌸",
    tw: "今日開運，福星高照，願你笑顏如花 🌸",
  },
];

// 五行 emoji（语言中立）
const ELEMENT_EMOJIS: Record<string, string> = {
  木: "🌿", 火: "🔥", 土: "🌾", 金: "✨", 水: "💧",
};

// 伪随机（基于日期和出生日）
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return ((s >>> 0) / 0xffffffff);
  };
}

export function buildDailyFortuneResult(
  input: DailyFortuneInput,
  lang: Lang = "zh",
): DailyFortuneResult {
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

  // 今日日期：按语言本地化
  const dateLocale = lang === "en" ? "en-US" : lang === "tw" ? "zh-TW" : "zh-CN";
  const avoidColorSep = lang === "en" ? ", " : "、";

  return {
    date: today.toLocaleDateString(dateLocale, { year: "numeric", month: "long", day: "numeric", weekday: "long" }),
    lunarDate: getLunarDateStr(today, lang),
    heavenlyStem: stem,
    earthlyBranch: branch,
    dayElement: rs(ELEMENT_NAME[dayElement]!, lang),
    luckyColor: rs(luckyColor.name, lang),
    luckyColorHex: luckyColor.hex,
    luckyColorEmoji: luckyColor.emoji,
    luckyNumber: luckyNum,
    luckyNumbers: numArr,
    luckyDirection: rs(luckyDir.name, lang),
    luckyDirectionEmoji: luckyDir.emoji,
    luckyFood: rs(eData.foods[foodIdx]!, lang),
    luckyTime: rs(LUCKY_TIMES[timeIdx]!, lang),
    outfit: rs(outfitArr[outfitIdx]!, lang),
    accessory: rs(eData.accessories[accIdx]!, lang),
    avoidColor: eData.avoidColors.map((c) => rs(c, lang)).join(avoidColorSep),
    dailyMantra: rs(DAILY_MANTRAS[mantrasIdx]!, lang),
    overallScore: clamp(baseScore + variance()),
    loveScore: clamp(baseScore + variance()),
    careerScore: clamp(baseScore + variance()),
    wealthScore: clamp(baseScore + variance()),
    healthScore: clamp(baseScore + variance()),
    morningRitual: rs(MORNING_RITUALS[birthElement]!, lang),
    avoidList: ra(avoidArr, lang),
    blessingWord: rs(BLESSING_WORDS[blessingIdx]!, lang),
    element: rs(ELEMENT_NAME[birthElement]!, lang),
    elementEmoji: ELEMENT_EMOJIS[birthElement]!,
  };
}
