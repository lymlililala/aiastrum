/**
 * 八字排盘计算引擎
 * 基于中国传统天干地支历法实现
 */

// ===== 基础数据 =====

export const HEAVENLY_STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"] as const;
export const EARTHLY_BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"] as const;

export type HeavenlyStem = (typeof HEAVENLY_STEMS)[number];
export type EarthlyBranch = (typeof EARTHLY_BRANCHES)[number];

// 天干五行
export const STEM_ELEMENT: Record<HeavenlyStem, string> = {
  甲: "木", 乙: "木",
  丙: "火", 丁: "火",
  戊: "土", 己: "土",
  庚: "金", 辛: "金",
  壬: "水", 癸: "水",
};

// 天干阴阳
export const STEM_YIN_YANG: Record<HeavenlyStem, string> = {
  甲: "阳", 乙: "阴",
  丙: "阳", 丁: "阴",
  戊: "阳", 己: "阴",
  庚: "阳", 辛: "阴",
  壬: "阳", 癸: "阴",
};

// 地支五行
export const BRANCH_ELEMENT: Record<EarthlyBranch, string> = {
  子: "水", 丑: "土", 寅: "木", 卯: "木",
  辰: "土", 巳: "火", 午: "火", 未: "土",
  申: "金", 酉: "金", 戌: "土", 亥: "水",
};

// 地支对应十二生肖
export const BRANCH_ZODIAC: Record<EarthlyBranch, string> = {
  子: "鼠", 丑: "牛", 寅: "虎", 卯: "兔",
  辰: "龙", 巳: "蛇", 午: "马", 未: "羊",
  申: "猴", 酉: "鸡", 戌: "狗", 亥: "猪",
};

// 地支对应时辰范围
export const BRANCH_HOUR: Record<EarthlyBranch, string> = {
  子: "23:00-01:00", 丑: "01:00-03:00", 寅: "03:00-05:00", 卯: "05:00-07:00",
  辰: "07:00-09:00", 巳: "09:00-11:00", 午: "11:00-13:00", 未: "13:00-15:00",
  申: "15:00-17:00", 酉: "17:00-19:00", 戌: "19:00-21:00", 亥: "21:00-23:00",
};

// 纳音五行（60甲子纳音）
const NAYIN_TABLE: Record<number, string> = {
  0: "海中金", 1: "海中金", 2: "炉中火", 3: "炉中火",
  4: "大林木", 5: "大林木", 6: "路旁土", 7: "路旁土",
  8: "剑锋金", 9: "剑锋金", 10: "山头火", 11: "山头火",
  12: "涧下水", 13: "涧下水", 14: "城头土", 15: "城头土",
  16: "白蜡金", 17: "白蜡金", 18: "杨柳木", 19: "杨柳木",
  20: "泉中水", 21: "泉中水", 22: "屋上土", 23: "屋上土",
  24: "霹雳火", 25: "霹雳火", 26: "松柏木", 27: "松柏木",
  28: "长流水", 29: "长流水", 30: "砂中金", 31: "砂中金",
  32: "山下火", 33: "山下火", 34: "平地木", 35: "平地木",
  36: "壁上土", 37: "壁上土", 38: "金箔金", 39: "金箔金",
  40: "覆灯火", 41: "覆灯火", 42: "天河水", 43: "天河水",
  44: "大驿土", 45: "大驿土", 46: "钗钏金", 47: "钗钏金",
  48: "桑柘木", 49: "桑柘木", 50: "大溪水", 51: "大溪水",
  52: "沙中土", 53: "沙中土", 54: "天上火", 55: "天上火",
  56: "石榴木", 57: "石榴木", 58: "大海水", 59: "大海水",
};

// ===== 排盘计算 =====

/**
 * 获取年柱（天干地支）
 * 基准：1984年为甲子年
 */
export function getYearPillar(year: number): { stem: HeavenlyStem; branch: EarthlyBranch } {
  // 天干从1984年甲子年计算
  const stemIndex = (year - 1984 + 60) % 10;
  const adjustedStemIndex = ((stemIndex % 10) + 10) % 10;
  const branchIndex = (year - 1984 + 60) % 12;
  const adjustedBranchIndex = ((branchIndex % 12) + 12) % 12;

  return {
    stem: HEAVENLY_STEMS[adjustedStemIndex]!,
    branch: EARTHLY_BRANCHES[adjustedBranchIndex]!,
  };
}

/**
 * 获取月柱
 * 月支固定：寅月(1月)开始，以节气为界
 * 月干由年干推算
 */
export function getMonthPillar(year: number, month: number): { stem: HeavenlyStem; branch: EarthlyBranch } {
  // 月支：寅(2月)对应index=2，按农历月推算
  // 简化处理：直接按公历月份 (寅月≈2月，需偏移2)
  const monthBranchIndex = (month + 1) % 12; // 1月=寅(index=2), 12月=丑(index=1)
  const adjustedBranchIndex = (monthBranchIndex + 12) % 12;
  const branch = EARTHLY_BRANCHES[adjustedBranchIndex]!;

  // 月干由年干决定：甲己年起丙寅，乙庚年起戊寅，丙辛年起庚寅，丁壬年起壬寅，戊癸年起甲寅
  const yearStemIndex = (year - 1984 + 60) % 10;
  const adjustedYearStemIndex = ((yearStemIndex % 10) + 10) % 10;
  // 甲己->2, 乙庚->4, 丙辛->6, 丁壬->8, 戊癸->0
  const monthStemBase = [2, 4, 6, 8, 0][Math.floor(adjustedYearStemIndex / 2) % 5]!;
  const monthStemIndex = (monthStemBase + (month - 1)) % 10;

  return {
    stem: HEAVENLY_STEMS[monthStemIndex]!,
    branch,
  };
}

/**
 * 获取日柱
 * 使用简化的朱氏日柱算法
 */
export function getDayPillar(year: number, month: number, day: number): { stem: HeavenlyStem; branch: EarthlyBranch } {
  // 将日期转为儒略日数，再映射到60甲子
  // 基准日：2000年1月1日 = 甲午日（天干=甲=0，地支=午=6）
  const date = new Date(year, month - 1, day);
  const baseDate = new Date(2000, 0, 1);
  const diffDays = Math.floor((date.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));

  // 2000年1月1日是甲午日
  // 甲=0, 午=6
  const stemIndex = ((diffDays % 10) + 10) % 10;
  const branchIndex = ((diffDays + 6) % 12 + 12) % 12;

  return {
    stem: HEAVENLY_STEMS[stemIndex]!,
    branch: EARTHLY_BRANCHES[branchIndex]!,
  };
}

/**
 * 根据小时获取时支
 */
export function getHourBranch(hour: number): EarthlyBranch {
  // 子时：23-1时，丑时：1-3时...
  if (hour === 23 || hour === 0) return "子";
  const branchIndex = Math.floor((hour + 1) / 2) % 12;
  return EARTHLY_BRANCHES[branchIndex]!;
}

/**
 * 获取时柱
 */
export function getHourPillar(dayStem: HeavenlyStem, hour: number): { stem: HeavenlyStem; branch: EarthlyBranch } {
  const branch = getHourBranch(hour);
  const branchIndex = EARTHLY_BRANCHES.indexOf(branch);

  // 时干由日干决定：甲己日起甲子时，乙庚日起丙子时，丙辛日起戊子时，丁壬日起庚子时，戊癸日起壬子时
  const dayStemIndex = HEAVENLY_STEMS.indexOf(dayStem);
  const hourStemBase = [0, 2, 4, 6, 8][Math.floor(dayStemIndex / 2) % 5]!;
  const stemIndex = (hourStemBase + branchIndex) % 10;

  return {
    stem: HEAVENLY_STEMS[stemIndex]!,
    branch,
  };
}

/**
 * 获取纳音
 */
export function getNayin(stem: HeavenlyStem, branch: EarthlyBranch): string {
  const stemIndex = HEAVENLY_STEMS.indexOf(stem);
  const branchIndex = EARTHLY_BRANCHES.indexOf(branch);
  const ganzhi60Index = Math.floor(stemIndex / 2) * 2 + (branchIndex % 2 === 0 ? 0 : 1);
  // 60甲子序号
  const index60 = (stemIndex * 6 + Math.floor(branchIndex / 2)) % 60;
  return NAYIN_TABLE[index60] ?? "未知";
}

/**
 * 计算五行得分（基于四柱八字）
 */
export function calculateElementScores(pillars: Array<{ stem: HeavenlyStem; branch: EarthlyBranch }>): Record<string, number> {
  const scores: Record<string, number> = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };

  for (const pillar of pillars) {
    const stemElement = STEM_ELEMENT[pillar.stem];
    const branchElement = BRANCH_ELEMENT[pillar.branch];
    scores[stemElement] = (scores[stemElement] ?? 0) + 1;
    scores[branchElement] = (scores[branchElement] ?? 0) + 0.5;
  }

  return scores;
}

/**
 * 主排盘函数
 */
export interface BaziInput {
  year: number;
  month: number;
  day: number;
  hour: number; // -1 表示未知时辰
  gender: "male" | "female";
}

export interface Pillar {
  stem: HeavenlyStem;
  branch: EarthlyBranch;
  nayin: string;
  stemElement: string;
  branchElement: string;
  zodiac?: string;
}

export interface BaziResult {
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  hourPillar: Pillar | null; // 未知时辰时为 null
  elementScores: Record<string, number>;
  zodiac: string;
  dayStem: HeavenlyStem;
  dayBranch: EarthlyBranch;
  nayin: string; // 年柱纳音（命格标签）
  // 2026年流年太岁关系
  liuNianRelation: string;
}

export function calculateBazi(input: BaziInput): BaziResult {
  const { year, month, day, hour, gender: _gender } = input;

  const yearRaw = getYearPillar(year);
  const monthRaw = getMonthPillar(year, month);
  const dayRaw = getDayPillar(year, month, day);

  const makePillar = (stem: HeavenlyStem, branch: EarthlyBranch): Pillar => ({
    stem,
    branch,
    nayin: getNayin(stem, branch),
    stemElement: STEM_ELEMENT[stem],
    branchElement: BRANCH_ELEMENT[branch],
    zodiac: BRANCH_ZODIAC[branch],
  });

  const yearPillar = makePillar(yearRaw.stem, yearRaw.branch);
  const monthPillar = makePillar(monthRaw.stem, monthRaw.branch);
  const dayPillar = makePillar(dayRaw.stem, dayRaw.branch);

  let hourPillar: Pillar | null = null;
  if (hour >= 0) {
    const hourRaw = getHourPillar(dayRaw.stem, hour);
    hourPillar = makePillar(hourRaw.stem, hourRaw.branch);
  }

  const pillarsForScore = [yearPillar, monthPillar, dayPillar];
  if (hourPillar) pillarsForScore.push(hourPillar);

  const elementScores = calculateElementScores(pillarsForScore);
  const zodiac = BRANCH_ZODIAC[yearRaw.branch];

  // 计算2026年（丙午年）与出生年支的太岁关系
  const liuNianRelation = getLiuNianRelation(yearRaw.branch);

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    elementScores,
    zodiac,
    dayStem: dayRaw.stem,
    dayBranch: dayRaw.branch,
    nayin: yearPillar.nayin,
    liuNianRelation,
  };
}

/**
 * 计算与2026年丙午年的流年太岁关系
 */
function getLiuNianRelation(yearBranch: EarthlyBranch): string {
  // 2026年为午年
  const relations: Partial<Record<EarthlyBranch, string>> = {
    午: "值太岁（本命年）",
    子: "冲太岁",
    丑: "刑太岁",
    卯: "害太岁",
    寅: "合太岁",
    戌: "合太岁（三合）",
    酉: "刑冲（岁破）",
    未: "刑太岁（三刑）",
  };

  return relations[yearBranch] ?? "平稳入岁";
}

/**
 * 获取五行缺失分析
 */
export function getMissingElements(scores: Record<string, number>): string[] {
  return Object.entries(scores)
    .filter(([_, score]) => score === 0)
    .map(([element]) => element);
}

/**
 * 获取最强五行
 */
export function getDominantElement(scores: Record<string, number>): string {
  return Object.entries(scores).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
}
