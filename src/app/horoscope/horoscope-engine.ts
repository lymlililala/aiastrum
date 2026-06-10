// ===== 星座运势随机引擎 =====
// 基于日期种子（Date Seed）从文案库中抽取运势
// 相同日期 + 相同星座 + 相同时间段 → 相同结果（确定性随机）
// 每日自动刷新，每周/每月也各有独立种子

import {
  ZODIAC_LIST,
  ZODIAC_MAP,
  FORTUNE_TEMPLATES,
  type ZodiacId,
  type TimePeriod,
  type FortuneScore,
  type LuckyInfo,
  type FortuneContent,
} from "./horoscope-data";
import {
  type Lang,
  luckyColorsFor,
  luckyDirectionsFor,
  luckyItemsFor,
  advicePoolFor,
  buildSummary,
  localizedFortuneSet,
  localizedTitle,
} from "./horoscope-content-i18n";

// ===== 日期种子哈希 =====

/**
 * 将字符串转为确定性数字种子
 * 使用 DJB2 哈希算法（简单高效，分布均匀）
 */
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0; // |0 保证32位整数
  }
  return Math.abs(hash);
}

/**
 * 简易伪随机数生成器（Mulberry32）
 * 给定种子，生成确定性的 [0, 1) 序列
 */
function mulberry32(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * 根据日期和时间段生成种子字符串
 * - today/tomorrow: "YYYY-MM-DD" + zodiacId + period
 * - week: "YYYY-Www" (ISO周) + zodiacId
 * - month: "YYYY-MM" + zodiacId
 */
function buildSeedString(zodiacId: ZodiacId, period: TimePeriod, date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  let dateStr: string;
  switch (period) {
    case "today":
      dateStr = `${y}-${m}-${d}`;
      break;
    case "tomorrow": {
      const tomorrow = new Date(date);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const ty = tomorrow.getFullYear();
      const tm = String(tomorrow.getMonth() + 1).padStart(2, "0");
      const td = String(tomorrow.getDate()).padStart(2, "0");
      dateStr = `${ty}-${tm}-${td}`;
      break;
    }
    case "week": {
      // ISO 周数
      const jan1 = new Date(y, 0, 1);
      const dayOfYear = Math.floor((date.getTime() - jan1.getTime()) / 86400000) + 1;
      const weekNum = Math.ceil((dayOfYear + jan1.getDay()) / 7);
      dateStr = `${y}-W${String(weekNum).padStart(2, "0")}`;
      break;
    }
    case "month":
      dateStr = `${y}-${m}`;
      break;
  }

  return `${dateStr}:${zodiacId}:${period}`;
}

// ===== 核心随机取值工具 =====

/** 在 [min, max] 范围内生成确定性整数 */
function randomInt(rng: () => number, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

/** 从数组中确定性选取一个元素 */
function pickOne<T>(rng: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)]!;
}

/** 从数组中确定性选取 n 个不重复元素 */
function pickN<T>(rng: () => number, arr: readonly T[], n: number): T[] {
  const shuffled = [...arr];
  // Fisher-Yates 部分洗牌
  for (let i = 0; i < Math.min(n, shuffled.length); i++) {
    const j = i + Math.floor(rng() * (shuffled.length - i));
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
  }
  return shuffled.slice(0, n);
}

/** 确定性选取一个索引（与 pickOne 同样消耗 1 次 rng，保证多语言结果一致） */
function pickOneIndex(rng: () => number, len: number): number {
  return Math.floor(rng() * len);
}

/** 确定性选取 n 个不重复索引（与 pickN 同样的 rng 消耗序列） */
function pickNIndices(rng: () => number, len: number, n: number): number[] {
  const idx = Array.from({ length: len }, (_, i) => i);
  for (let i = 0; i < Math.min(n, len); i++) {
    const j = i + Math.floor(rng() * (len - i));
    [idx[i], idx[j]] = [idx[j]!, idx[i]!];
  }
  return idx.slice(0, n);
}

// ===== 运势指数生成 =====

/** 生成各维度运势分数（1-5） */
function generateFortuneScores(rng: () => number, zodiacId: ZodiacId, period: TimePeriod): FortuneScore {
  // 根据星座元素偏移基础分，增加个性化
  const element = ZODIAC_MAP[zodiacId].element;
  const elementBonus: Record<string, Partial<FortuneScore>> = {
    fire: { overall: 0.3, career: 0.2 },
    earth: { overall: 0.1, wealth: 0.3 },
    air: { overall: 0.2, love: 0.1 },
    water: { overall: 0.1, love: 0.3, health: 0.2 },
  };
  const bonus = elementBonus[element] ?? {};

  // 月/周运势波动更小，日运波动更大
  const baseVariance = period === "month" ? 0.8 : period === "week" ? 1.0 : 1.2;

  const makeScore = (key: keyof FortuneScore): number => {
    const raw = 2.5 + (rng() - 0.4) * baseVariance * 2 + (bonus[key] ?? 0);
    return Math.max(1, Math.min(5, Math.round(raw)));
  };

  return {
    overall: makeScore("overall"),
    love: makeScore("love"),
    career: makeScore("career"),
    wealth: makeScore("wealth"),
    health: makeScore("health"),
  };
}

// ===== 幸运指南生成 =====

/** 幸运颜色库 */
const LUCKY_COLORS = [
  "红色", "橙色", "金色", "黄色", "绿色", "青色",
  "蓝色", "紫色", "粉色", "白色", "银色", "棕色",
  "酒红", "珊瑚色", "薄荷绿", "薰衣草紫", "蜜桃粉", "天空蓝",
];

/** 幸运方向库 */
const LUCKY_DIRECTIONS = [
  "东方", "南方", "西方", "北方",
  "东南方", "东北方", "西南方", "西北方",
];

/** 幸运物品库 */
const LUCKY_ITEMS = [
  "水晶手链", "四叶草挂件", "香薰蜡烛", "鲜花一束",
  "幸运硬币", "星座吊坠", "彩色丝巾", "天然石头",
  "小巧盆栽", "风铃", "许愿瓶", "手工书签",
  "精油", "音乐盒", "沙漏", "钥匙扣",
];

function generateLuckyInfo(rng: () => number, zodiacId: ZodiacId, lang: Lang): LuckyInfo {
  const zodiacList = ZODIAC_LIST;
  const zodiacIndex = zodiacList.findIndex((z) => z.id === zodiacId);

  // 好搭档：元素相合的星座
  const allyCandidates = zodiacList.filter(
    (z) => z.id !== zodiacId && z.element === ZODIAC_MAP[zodiacId].element
  );
  // 贵人：互补元素的星座
  const complementMap: Record<string, string> = { fire: "air", air: "fire", earth: "water", water: "earth" };
  const nobleCandidates = zodiacList.filter(
    (z) => z.id !== zodiacId && z.element === complementMap[ZODIAC_MAP[zodiacId].element]
  );
  // 小人：冲突元素
  const clashMap: Record<string, string> = { fire: "water", water: "fire", earth: "air", air: "earth" };
  const rivalCandidates = zodiacList.filter(
    (z) => z.id !== zodiacId && z.element === clashMap[ZODIAC_MAP[zodiacId].element]
  );

  // 颜色：按索引确定性选取（保证多语言取到同一组），再映射到当前语言数组
  const colorArr = luckyColorsFor(lang, LUCKY_COLORS);
  const colorIdx = pickNIndices(rng, LUCKY_COLORS.length, 3);
  const colors = colorIdx.map((i) => colorArr[i]!);
  const numbers = [
    randomInt(rng, 1, 9),
    randomInt(rng, 1, 9),
    randomInt(rng, 1, 9),
  ].sort((a, b) => a - b);

  const ally = allyCandidates.length > 0 ? pickOne(rng, allyCandidates).id : zodiacList[(zodiacIndex + 4) % 12]!.id;
  const noble = nobleCandidates.length > 0 ? pickOne(rng, nobleCandidates).id : zodiacList[(zodiacIndex + 6) % 12]!.id;
  const rival = rivalCandidates.length > 0 ? pickOne(rng, rivalCandidates).id : zodiacList[(zodiacIndex + 3) % 12]!.id;
  const direction = luckyDirectionsFor(lang, LUCKY_DIRECTIONS)[pickOneIndex(rng, LUCKY_DIRECTIONS.length)]!;
  const item = luckyItemsFor(lang, LUCKY_ITEMS)[pickOneIndex(rng, LUCKY_ITEMS.length)]!;

  return {
    color: colors[0]!,
    colors,
    number: numbers[0]!,
    numbers,
    ally,
    noble,
    rival,
    direction,
    item,
  };
}

// ===== 运势文案抽取 =====

/** 从 FORTUNE_TEMPLATES 中根据种子抽取一套完整文案 */
function extractFortuneTexts(
  rng: () => number,
  zodiacId: ZodiacId,
  period: TimePeriod,
  lang: Lang,
): {
  title: string;
  overall: string;
  love: string;
  career: string;
  wealth: string;
  health: string;
} {
  const templates = FORTUNE_TEMPLATES[zodiacId][period];
  // 每个时间段有3套文案，确定性选取一套
  const setIndex = Math.floor(rng() * templates.length);
  const set = localizedFortuneSet(lang, zodiacId, period, setIndex, templates[setIndex]!);

  return {
    title: "", // 标题由 FORTUNE_TITLES 单独生成
    overall: set[0]!,
    love: set[1]!,
    career: set[2]!,
    wealth: set[3]!,
    health: set[4]!,
  };
}

// ===== 建议生成 =====

const ADVICE_POOL: Record<TimePeriod, string[]> = {
  today: [
    "今天适合从小事做起，积少成多。",
    "保持微笑，好运会不期而至。",
    "给自己一杯好茶的时间，静心思考下一步。",
    "今天的关键词是「专注」，做好一件事胜过浅尝辄止。",
    "与其担心未来，不如把今天过得精彩。",
    "试着对身边的人多说一句温暖的话。",
    "今天的你值得被温柔以待，也要温柔待自己。",
    "如果感到迷茫，就先做最确定的那件事。",
  ],
  tomorrow: [
    "为明天做好规划，但不必执着于完美。",
    "今晚早点休息，以最佳状态迎接新的一天。",
    "明天是新的开始，昨天的遗憾就让它留在昨天。",
    "把重要的事安排在精力最充沛的时段。",
    "明天适合迈出第一步，哪怕步子小一点。",
    "相信自己的判断，你的直觉比想象中更准。",
    "明天不妨尝试一件从未做过的小事。",
    "给自己一个微笑，你已经做得很好了。",
  ],
  week: [
    "本周的节奏感很重要，不要前紧后松或前松后紧。",
    "周末前完成核心任务，给自己一个轻松的周末。",
    "这周是量变到质变的过程，坚持就是胜利。",
    "给自己留出「思考时间」，不要被事务推着走。",
    "本周的人际互动会带来意想不到的收获，多交流。",
    "把大目标拆分成每天的小任务，稳步推进。",
    "这周适合回顾与展望，调整方向再出发。",
    "保持弹性计划，允许美好意外发生。",
  ],
  month: [
    "本月的主题是「积累与突破」，前半程蓄力，后半程发力。",
    "给自己设一个本月的小目标，完成后的成就感会超乎想象。",
    "本月适合培养一个好习惯，21天刚好一个周期。",
    "月底回顾时，你会感谢月初做出改变的自己。",
    "这个月的关键是保持节奏，不被外界打乱自己的步调。",
    "本月适合清理——无论是物品、关系还是心态，轻装前行。",
    "把握月中的关键节点，很多重要转折往往发生在月中。",
    "本月给自己多一点的耐心，好事需要时间来酝酿。",
  ],
};

// ===== 公开 API =====

export interface HoroscopeResult {
  zodiac: ZodiacId;
  period: TimePeriod;
  date: string;          // 当前日期 YYYY-MM-DD
  title: string;         // 运势标题
  summary: string;       // 一句话概述
  scores: FortuneScore;  // 五维指数
  lucky: LuckyInfo;      // 幸运指南
  content: FortuneContent; // 详细文案
}

/** 运势标题模板（从 horoscope-data 导入） */
import { FORTUNE_TITLES } from "./horoscope-data";

/**
 * 生成指定星座、指定时间段的完整运势
 * 相同日期+星座+时间段 → 结果完全一致
 */
export function generateHoroscope(
  zodiacId: ZodiacId,
  period: TimePeriod = "today",
  referenceDate: Date = new Date(),
  lang: Lang = "zh",
): HoroscopeResult {
  // 1. 构建种子 & 初始化 RNG
  const seedStr = buildSeedString(zodiacId, period, referenceDate);
  const seed = hashString(seedStr);
  const rng = mulberry32(seed);

  // 2. 生成各维度数据
  const scores = generateFortuneScores(rng, zodiacId, period);
  const lucky = generateLuckyInfo(rng, zodiacId, lang);
  const texts = extractFortuneTexts(rng, zodiacId, period, lang);

  // 3. 选取标题（按索引取，多语言一致；缺译文回退中文）
  const titleCandidates = FORTUNE_TITLES[zodiacId][period];
  const titleIdx = pickOneIndex(rng, titleCandidates.length);
  const title = localizedTitle(lang, zodiacId, period, titleIdx, titleCandidates[titleIdx]!);

  // 4. 生成摘要（基于总分的一句话概述）
  const summary = buildSummary(lang, scores.overall, period, generateSummary);

  // 5. 选取建议
  const adviceIdx = pickOneIndex(rng, ADVICE_POOL[period].length);
  const advice = advicePoolFor(lang, period, ADVICE_POOL[period])[adviceIdx]!;

  // 6. 当前日期
  const y = referenceDate.getFullYear();
  const m = String(referenceDate.getMonth() + 1).padStart(2, "0");
  const d = String(referenceDate.getDate()).padStart(2, "0");
  const dateStr = `${y}-${m}-${d}`;

  // 7. 组装 FortuneContent
  const content: FortuneContent = {
    period,
    zodiac: zodiacId,
    title,
    summary,
    overall: texts.overall,
    love: texts.love,
    career: texts.career,
    wealth: texts.wealth,
    health: texts.health,
    advice,
  };

  return {
    zodiac: zodiacId,
    period,
    date: dateStr,
    title,
    summary,
    scores,
    lucky,
    content,
  };
}

/** 根据总分生成一句话概述 */
function generateSummary(overallScore: number, period: TimePeriod): string {
  const periodLabel: Record<TimePeriod, string> = {
    today: "今日",
    tomorrow: "明日",
    week: "本周",
    month: "本月",
  };
  const label = periodLabel[period];

  if (overallScore >= 5) return `${label}运势爆棚，万事皆宜！`;
  if (overallScore >= 4) return `${label}运势上佳，好好把握机遇。`;
  if (overallScore >= 3) return `${label}运势平稳，适合稳扎稳打。`;
  if (overallScore >= 2) return `${label}运势偏低，低调蓄力为宜。`;
  return `${label}需要多加注意，保持平和心态。`;
}

/**
 * 根据出生日期自动推断星座
 */
export function inferZodiacFromDate(month: number, day: number): ZodiacId {
  // 星座日期分界（每月起始日），按月份顺序排列
  // 格式: [星座ID, 起始月, 起始日]
  const zodiacStarts: [ZodiacId, number, number][] = [
    ["capricorn", 12, 22],  // 摩羯 12/22 - 1/19（跨年，需特殊处理）
    ["aquarius",  1,  20],  // 水瓶 1/20 - 2/18
    ["pisces",    2,  19],  // 双鱼 2/19 - 3/20
    ["aries",     3,  21],  // 白羊 3/21 - 4/19
    ["taurus",    4,  20],  // 金牛 4/20 - 5/20
    ["gemini",    5,  21],  // 双子 5/21 - 6/21
    ["cancer",    6,  22],  // 巨蟹 6/22 - 7/22
    ["leo",       7,  23],  // 狮子 7/23 - 8/22
    ["virgo",     8,  23],  // 处女 8/23 - 9/22
    ["libra",     9,  23],  // 天秤 9/23 - 10/23
    ["scorpio",  10,  24],  // 天蝎 10/24 - 11/22
    ["sagittarius", 11, 23], // 射手 11/23 - 12/21
  ];

  // 从后往前找第一个 "起始日 <= 当前日期" 的星座
  for (let i = zodiacStarts.length - 1; i >= 0; i--) {
    const [zodiac, startMonth, startDay] = zodiacStarts[i]!;
    if (month === startMonth && day >= startDay) return zodiac;
  }

  // 如果当月没有匹配，说明在当前月份的前一个星座区间
  // 例如 1月1日-1月19日属于摩羯座（起始12月22日）
  // 从前往后找第一个 "起始月 > 当前月" 的星座，返回它前面的那个
  for (let i = 0; i < zodiacStarts.length; i++) {
    const entry = zodiacStarts[i]!;
    if (entry[1] > month || (entry[1] === month && entry[2] > day)) {
      // 返回前一个星座（注意循环）
      const prevIdx = (i - 1 + zodiacStarts.length) % zodiacStarts.length;
      return zodiacStarts[prevIdx]![0];
    }
  }

  return "capricorn"; // 12月1日-12月21日属于射手座，fallback 摩羯
}

/**
 * 批量生成所有星座的运势（用于预加载 / SSG）
 */
export function generateAllHoroscopes(
  period: TimePeriod = "today",
  referenceDate: Date = new Date(),
  lang: Lang = "zh",
): Record<ZodiacId, HoroscopeResult> {
  const result: Partial<Record<ZodiacId, HoroscopeResult>> = {};
  for (const zodiac of ZODIAC_LIST) {
    result[zodiac.id] = generateHoroscope(zodiac.id, period, referenceDate, lang);
  }
  return result as Record<ZodiacId, HoroscopeResult>;
}

// ===== LocalStorage 持久化 =====

const STORAGE_KEY_ZODIAC = "horoscope_selected_zodiac";
const STORAGE_KEY_DATE = "horoscope_cache_date";

/**
 * 保存用户选择的星座到 LocalStorage
 */
export function saveSelectedZodiac(zodiacId: ZodiacId): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_ZODIAC, zodiacId);
  } catch {
    // localStorage 不可用时静默失败
  }
}

/**
 * 读取用户上次选择的星座
 */
export function loadSelectedZodiac(): ZodiacId | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_ZODIAC);
    if (saved && ZODIAC_MAP[saved as ZodiacId]) {
      return saved as ZodiacId;
    }
  } catch {
    // 静默失败
  }
  return null;
}

/**
 * 检查运势缓存是否需要刷新（基于日期）
 * 如果缓存日期与当前日期不同，则需要刷新
 */
export function isCacheStale(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const cachedDate = localStorage.getItem(STORAGE_KEY_DATE);
    if (!cachedDate) return true;
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    return cachedDate !== todayStr;
  } catch {
    return true;
  }
}

/**
 * 更新缓存日期
 */
export function updateCacheDate(): void {
  if (typeof window === "undefined") return;
  try {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    localStorage.setItem(STORAGE_KEY_DATE, todayStr);
  } catch {
    // 静默失败
  }
}

// ===== SEO 辅助 =====

/**
 * 生成 TDK（Title/Description/Keywords）用于 SEO
 */
export function generateTDK(zodiacId: ZodiacId, period: TimePeriod): {
  title: string;
  description: string;
  keywords: string;
} {
  const zodiac = ZODIAC_MAP[zodiacId];
  const periodLabel: Record<TimePeriod, string> = {
    today: "今日运势",
    tomorrow: "明日运势",
    week: "本周运势",
    month: "本月运势",
  };

  const title = `${zodiac.name}${periodLabel[period]} - ${zodiac.emoji} 每日星座运势查询`;
  const description = `${zodiac.name}${periodLabel[period]}详解：综合、爱情、事业、财运、健康五维指数全方位解析，还有幸运色、幸运数字等幸运指南。星座运势每日更新，助你趋吉避凶！`;
  const keywords = `${zodiac.name},${periodLabel[period]},星座运势,每日运势,${zodiac.element}象星座,幸运色,幸运数字`;

  return { title, description, keywords };
}
