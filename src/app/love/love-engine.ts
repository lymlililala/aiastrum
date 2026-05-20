/**
 * 姻缘占卜引擎
 * 生成姻缘评分、正缘画像、桃花运势报告
 */

import {
  getZodiacSign,
  getYearGanzhi,
  BARNUM_TRAITS,
  SCORE_LABELS,
  SOULMATE_APPEARANCE,
  SOULMATE_PERSONALITY,
  SOULMATE_CAREERS,
  MEET_SCENES,
  LOVE_STRENGTHS,
  LOVE_WEAKNESSES,
  LOVE_ACTIONS,
  LOVE_AFFIRMATIONS,
  PEACH_MONTHLY_TEXTS,
  type LoveReport,
  type LoveScore,
  type SoulmatePicture,
  type PeachBlossomForecast,
  type LoveAdvice,
} from "./love-data";

// ===== 输入类型 =====
export interface LoveInput {
  name: string;
  gender: "female" | "male";
  birthYear: number;
  birthMonth: number;
  birthDay: number;
}

// ===== 辅助：伪随机（基于输入确定性生成，同一个人每次结果相同）=====
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function pickOne<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)]!;
}

function pickN<T>(arr: T[], n: number, rand: () => number): T[] {
  const shuffled = [...arr].sort(() => rand() - 0.5);
  return shuffled.slice(0, n);
}

// ===== 计算姻缘评分 =====
function calcLoveScore(input: LoveInput, seed: number): LoveScore {
  const rand = seededRandom(seed + 1);

  // 基础分（基于出生月日，产生差异化但在60-95之间）
  const base = 60 + Math.floor(
    ((input.birthMonth * 31 + input.birthDay + input.birthYear % 100) % 36)
  );
  const overall = Math.min(95, Math.max(60, base));

  // 桃花指数（3-5星）
  const peach = 3 + Math.floor(rand() * 3);
  // 时机指数（3-5星）
  const timing = 3 + Math.floor(rand() * 3);
  // 深度缘分（3-5星）
  const depth = 3 + Math.floor(rand() * 3);

  const labelConfig = SCORE_LABELS.find(l => overall >= l.min) ?? SCORE_LABELS[SCORE_LABELS.length - 1]!;

  return {
    overall,
    peach,
    timing,
    depth,
    label: labelConfig.label,
    labelColor: labelConfig.color,
    shortComment: labelConfig.comment,
  };
}

// ===== 生成正缘画像 =====
function genSoulmate(input: LoveInput, zodiacElement: string, rand: () => number): SoulmatePicture {
  // 正缘的五行元素（对方星座元素）
  const oppositeGender = input.gender === "female" ? "male" : "female";
  const appearanceKey = `${input.gender}_${zodiacElement}` as keyof typeof SOULMATE_APPEARANCE;
  const appearanceArr = SOULMATE_APPEARANCE[appearanceKey] ?? SOULMATE_APPEARANCE["female_火"]!;

  return {
    appearance: pickOne(appearanceArr, rand),
    personality: pickOne(SOULMATE_PERSONALITY, rand),
    career: pickN(SOULMATE_CAREERS, 2, rand).join("或"),
    meetScene: pickOne(MEET_SCENES, rand),
    meetTiming: genMeetTiming(input, rand),
  };
}

function genMeetTiming(input: LoveInput, rand: () => number): string {
  const now = new Date();
  const monthsAhead = 2 + Math.floor(rand() * 5); // 2-6个月后
  const targetMonth = ((now.getMonth() + monthsAhead) % 12) + 1;
  const monthNames = ["", "一月", "二月", "三月", "四月", "五月", "六月",
    "七月", "八月", "九月", "十月", "十一月", "十二月"];
  const seasons = ["春末夏初", "夏日", "秋高气爽", "岁末年初"];
  const season = seasons[Math.floor(rand() * seasons.length)]!;

  return `最有可能的相遇时机在${season}前后（约${monthNames[targetMonth]}前后），届时你的姻缘磁场将迎来一个小高峰，命运的安排往往就在这段时间悄然启动。`;
}

// ===== 生成桃花运势预测 =====
function genPeachForecast(input: LoveInput, rand: () => number): PeachBlossomForecast {
  const levels: Array<"high" | "medium" | "low"> = ["high", "medium", "low"];
  const l1 = levels[Math.floor(rand() * levels.length)]!;
  const l2 = levels[Math.floor(rand() * levels.length)]!;
  const l3 = levels[Math.floor(rand() * levels.length)]!;

  const now = new Date();
  const m1 = ((now.getMonth()) % 12) + 1;
  const m2 = ((now.getMonth() + 1) % 12) + 1;
  const m3 = ((now.getMonth() + 2) % 12) + 1;
  const monthNames = ["", "一月", "二月", "三月", "四月", "五月", "六月",
    "七月", "八月", "九月", "十月", "十一月", "十二月"];

  const adviceTemplates = [
    "多走进新的社交场合，尝试一个你从未去过的兴趣社群或活动，缘分往往在你打破舒适圈的那一刻出现。",
    "保持对生活的热情与好奇心，让自己的眼睛里常有光芒——那是最强的吸引力，正缘会被这道光所引导。",
    "适时更新自己的形象与状态，从内到外的焕新会给你的桃花运注入新的能量，让缘分的大门悄然开启。",
  ];

  return {
    month1: `${monthNames[m1]}：${pickOne(PEACH_MONTHLY_TEXTS[l1], rand)}`,
    month2: `${monthNames[m2]}：${pickOne(PEACH_MONTHLY_TEXTS[l2], rand)}`,
    month3: `${monthNames[m3]}：${pickOne(PEACH_MONTHLY_TEXTS[l3], rand)}`,
    peak: l1 === "high" ? monthNames[m1]! : l2 === "high" ? monthNames[m2]! : monthNames[m3]!,
    advice: pickOne(adviceTemplates, rand),
  };
}

// ===== 生成情感建议 =====
function genLoveAdvice(rand: () => number): LoveAdvice {
  return {
    strength: pickOne(LOVE_STRENGTHS, rand),
    weakness: pickOne(LOVE_WEAKNESSES, rand),
    action: pickOne(LOVE_ACTIONS, rand),
    affirmation: pickOne(LOVE_AFFIRMATIONS, rand),
  };
}

// ===== 主引擎函数 =====
export function runLoveEngine(input: LoveInput): LoveReport {
  // 计算种子（确保同一用户每次结果相同）
  const seed = input.birthYear * 10000 + input.birthMonth * 100 + input.birthDay
    + (input.gender === "female" ? 0 : 5000)
    + input.name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);

  const rand = seededRandom(seed + 7);

  const zodiac = getZodiacSign(input.birthMonth, input.birthDay);
  const yearGanzhi = getYearGanzhi(input.birthYear);

  const score = calcLoveScore(input, seed);

  // 性格特质（巴纳姆效应）
  const traitArr = BARNUM_TRAITS[input.gender] ?? BARNUM_TRAITS["female"]!;
  const personalityTrait = pickOne(traitArr, rand);

  const soulmate = genSoulmate(input, zodiac.element, seededRandom(seed + 13));
  const peachForecast = genPeachForecast(input, seededRandom(seed + 17));
  const loveAdvice = genLoveAdvice(seededRandom(seed + 23));

  return {
    name: input.name,
    gender: input.gender,
    birthYear: input.birthYear,
    birthMonth: input.birthMonth,
    birthDay: input.birthDay,
    zodiac,
    yearGanzhi,
    score,
    personalityTrait,
    peachForecast,
    soulmate,
    loveAdvice,
  };
}
