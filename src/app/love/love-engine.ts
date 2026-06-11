/**
 * 姻缘占卜引擎
 * 生成姻缘评分、正缘画像、桃花运势报告
 *
 * 本地化：runLoveEngine 接收 lang，所有展示字段在此解析为纯字符串。
 * LoveReport 字段类型保持 string / string[] 不变。
 */

import {
  getZodiacSignRaw,
  resolveZodiac,
  getYearGanzhi,
  resolveGanzhiDisplay,
  BARNUM_TRAITS,
  SCORE_LABELS,
  SOULMATE_APPEARANCE,
  SOULMATE_PERSONALITY,
  SOULMATE_CAREERS,
  CAREER_JOINER,
  MEET_SCENES,
  MEET_TIMING_TEMPLATE,
  LOVE_STRENGTHS,
  LOVE_WEAKNESSES,
  LOVE_ACTIONS,
  LOVE_AFFIRMATIONS,
  PEACH_ADVICE_TEMPLATES,
  PEACH_MONTHLY_TEXTS,
  PEACH_MONTH_SEP,
  MONTH_NAMES,
  SEASON_TEXTS,
  rs,
  ra,
  type Lang,
  type LArr,
  type LoveReport,
  type LoveScore,
  type SoulmatePicture,
  type PeachBlossomForecast,
  type LoveAdvice,
} from "./love-data";

export type { Lang };

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

/** 从三语数组中按 lang 解析后选一条 */
function pickOneL(v: LArr, lang: Lang, rand: () => number): string {
  return pickOne(ra(v, lang), rand);
}

function pickN<T>(arr: T[], n: number, rand: () => number): T[] {
  const shuffled = [...arr].sort(() => rand() - 0.5);
  return shuffled.slice(0, n);
}

// ===== 计算姻缘评分 =====
function calcLoveScore(input: LoveInput, seed: number, lang: Lang): LoveScore {
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
    label: rs(labelConfig.label, lang),
    labelColor: labelConfig.color,
    shortComment: rs(labelConfig.comment, lang),
  };
}

// ===== 生成正缘画像 =====
function genSoulmate(
  input: LoveInput,
  zodiacElement: string,
  lang: Lang,
  rand: () => number,
): SoulmatePicture {
  const appearanceKey = `${input.gender}_${zodiacElement}` as keyof typeof SOULMATE_APPEARANCE;
  const appearanceArr = SOULMATE_APPEARANCE[appearanceKey] ?? SOULMATE_APPEARANCE["female_火"]!;

  return {
    appearance: pickOneL(appearanceArr, lang, rand),
    personality: pickOneL(SOULMATE_PERSONALITY, lang, rand),
    career: pickN(ra(SOULMATE_CAREERS, lang), 2, rand).join(CAREER_JOINER[lang]),
    meetScene: pickOneL(MEET_SCENES, lang, rand),
    meetTiming: genMeetTiming(lang, rand),
  };
}

function genMeetTiming(lang: Lang, rand: () => number): string {
  const now = new Date();
  const monthsAhead = 2 + Math.floor(rand() * 5); // 2-6个月后
  const targetMonth = ((now.getMonth() + monthsAhead) % 12) + 1;
  const monthNames = MONTH_NAMES[lang];
  const seasons = ra(SEASON_TEXTS, lang);
  const season = seasons[Math.floor(rand() * seasons.length)]!;

  return MEET_TIMING_TEMPLATE[lang](season, monthNames[targetMonth]!);
}

// ===== 生成桃花运势预测 =====
function genPeachForecast(lang: Lang, rand: () => number): PeachBlossomForecast {
  const levels: Array<"high" | "medium" | "low"> = ["high", "medium", "low"];
  const l1 = levels[Math.floor(rand() * levels.length)]!;
  const l2 = levels[Math.floor(rand() * levels.length)]!;
  const l3 = levels[Math.floor(rand() * levels.length)]!;

  const now = new Date();
  const m1 = ((now.getMonth()) % 12) + 1;
  const m2 = ((now.getMonth() + 1) % 12) + 1;
  const m3 = ((now.getMonth() + 2) % 12) + 1;
  const monthNames = MONTH_NAMES[lang];
  const sep = PEACH_MONTH_SEP[lang];

  return {
    month1: `${monthNames[m1]}${sep}${pickOneL(PEACH_MONTHLY_TEXTS[l1], lang, rand)}`,
    month2: `${monthNames[m2]}${sep}${pickOneL(PEACH_MONTHLY_TEXTS[l2], lang, rand)}`,
    month3: `${monthNames[m3]}${sep}${pickOneL(PEACH_MONTHLY_TEXTS[l3], lang, rand)}`,
    peak: l1 === "high" ? monthNames[m1]! : l2 === "high" ? monthNames[m2]! : monthNames[m3]!,
    advice: pickOneL(PEACH_ADVICE_TEMPLATES, lang, rand),
  };
}

// ===== 生成情感建议 =====
function genLoveAdvice(lang: Lang, rand: () => number): LoveAdvice {
  return {
    strength: pickOneL(LOVE_STRENGTHS, lang, rand),
    weakness: pickOneL(LOVE_WEAKNESSES, lang, rand),
    action: pickOneL(LOVE_ACTIONS, lang, rand),
    affirmation: pickOneL(LOVE_AFFIRMATIONS, lang, rand),
  };
}

// ===== 主引擎函数 =====
export function runLoveEngine(input: LoveInput, lang: Lang = "zh"): LoveReport {
  // 计算种子（确保同一用户每次结果相同）
  const seed = input.birthYear * 10000 + input.birthMonth * 100 + input.birthDay
    + (input.gender === "female" ? 0 : 5000)
    + input.name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);

  const rand = seededRandom(seed + 7);

  const zodiacRaw = getZodiacSignRaw(input.birthMonth, input.birthDay);
  const zodiac = resolveZodiac(zodiacRaw, lang);
  const yearGanzhi = resolveGanzhiDisplay(getYearGanzhi(input.birthYear), lang);

  const score = calcLoveScore(input, seed, lang);

  // 性格特质（巴纳姆效应）
  const traitArr = BARNUM_TRAITS[input.gender] ?? BARNUM_TRAITS["female"]!;
  const personalityTrait = pickOneL(traitArr, lang, rand);

  // 正缘画像基于星座五行键（保持中文 火/土/风/水），展示文案按 lang 解析
  const soulmate = genSoulmate(input, zodiacRaw.element, lang, seededRandom(seed + 13));
  const peachForecast = genPeachForecast(lang, seededRandom(seed + 17));
  const loveAdvice = genLoveAdvice(lang, seededRandom(seed + 23));

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
