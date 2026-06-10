// ===== 生命灵数计算引擎 =====

import {
  NUMEROLOGY_DATA,
  NUMBER_KEYWORDS,
  type LifeNumber,
  type NumerologyProfile,
  type RawNumerologyProfile,
  type L,
  type LArr,
} from "./numerology-data";

// ===== 语言解析 =====

export type Lang = "zh" | "en" | "tw";

/** 解析单条本地化字符串 */
function rs(v: L, lang: Lang): string {
  return v[lang];
}

/** 解析本地化字符串数组 */
function ra(v: LArr, lang: Lang): string[] {
  return v[lang];
}

/**
 * 将原始（多语言）档案解析为面向组件的纯字符串档案。
 * NumerologyResult 的字段类型保持 string / string[] 不变。
 */
function resolveProfile(
  raw: RawNumerologyProfile,
  lang: Lang,
): NumerologyProfile {
  return {
    number: raw.number,
    name: rs(raw.name, lang),
    title: rs(raw.title, lang),
    element: rs(raw.element, lang),
    planet: rs(raw.planet, lang),
    color: rs(raw.color, lang),
    colorHex: raw.colorHex,
    secondaryColorHex: raw.secondaryColorHex,
    symbol: raw.symbol,
    emoji: raw.emoji,
    isMaster: raw.isMaster,
    tagline: rs(raw.tagline, lang),
    traits: ra(raw.traits, lang),
    positiveTraits: raw.positiveTraits.map((t) => ({
      title: rs(t.title, lang),
      description: rs(t.description, lang),
    })),
    challenges: raw.challenges.map((c) => ({
      title: rs(c.title, lang),
      description: rs(c.description, lang),
    })),
    gifts: raw.gifts.map((g) => ({
      title: rs(g.title, lang),
      description: rs(g.description, lang),
      icon: g.icon,
    })),
    lifeLessons: raw.lifeLessons.map((l) => ({
      title: rs(l.title, lang),
      description: rs(l.description, lang),
    })),
    careerPaths: ra(raw.careerPaths, lang),
    loveInsight: rs(raw.loveInsight, lang),
    yearAdvice: rs(raw.yearAdvice, lang),
    luckyNumber: raw.luckyNumber,
    luckyColor: rs(raw.luckyColor, lang),
    luckyDay: rs(raw.luckyDay, lang),
    luckyGem: rs(raw.luckyGem, lang),
    spiritualMessage: rs(raw.spiritualMessage, lang),
    celebrities: ra(raw.celebrities, lang),
  };
}

// ===== 计算步骤标签文案（三语） =====

const STEP_LABELS: Record<Lang, {
  birthdate: string;
  yearSum: string;
  monthSum: string;
  daySum: string;
  totalSum: string;
  reduce: string;
  finalNumber: string;
}> = {
  zh: {
    birthdate: "出生日期",
    yearSum: "年份数字之和",
    monthSum: "月份数字之和",
    daySum: "日期数字之和",
    totalSum: "三部分之和",
    reduce: "继续缩减",
    finalNumber: "最终数字",
  },
  tw: {
    birthdate: "出生日期",
    yearSum: "年份數字之和",
    monthSum: "月份數字之和",
    daySum: "日期數字之和",
    totalSum: "三部分之和",
    reduce: "繼續縮減",
    finalNumber: "最終數字",
  },
  en: {
    birthdate: "Birth Date",
    yearSum: "Sum of Year Digits",
    monthSum: "Sum of Month Digits",
    daySum: "Sum of Day Digits",
    totalSum: "Sum of All Three Parts",
    reduce: "Reduce Further",
    finalNumber: "Final Number",
  },
};

// ===== 核心计算算法 =====

/**
 * 将一个数字的各位数字相加，循环直到得到个位数
 * 特殊处理卓越数 11、22、33（在最终结果为这些数时不再继续相加）
 */
function reduceNumber(n: number): number {
  // 如果是卓越数，直接返回
  if (n === 11 || n === 22 || n === 33) return n;
  // 如果是个位数，直接返回
  if (n <= 9) return n;

  // 将各位数字相加
  let sum = 0;
  const digits = n.toString();
  for (const ch of digits) {
    sum += parseInt(ch, 10);
  }

  return reduceNumber(sum);
}

/**
 * 计算生命灵数
 * 算法：年 + 月 + 日，各位数字全部相加，
 * 每一步相加后检查是否为卓越数（11、22、33）
 *
 * @param year 出生年份
 * @param month 出生月份（1-12）
 * @param day 出生日期（1-31）
 * @returns 生命灵数
 */
export function calculateLifeNumber(
  year: number,
  month: number,
  day: number,
): LifeNumber {
  // 先将月份和日期各自缩减，检查是否为卓越数
  const reducedMonth = reduceNumber(month);
  const reducedDay = reduceNumber(day);
  const reducedYear = reduceYear(year);

  // 将三者相加
  const total = reducedMonth + reducedDay + reducedYear;

  // 对总和进行缩减，但在每步检查卓越数
  const result = reduceFinal(total);

  return result as LifeNumber;
}

/**
 * 缩减年份：将年份的所有数字相加到两位数或以下
 * 在每步检查卓越数
 */
function reduceYear(year: number): number {
  const digits = year.toString();
  let sum = 0;
  for (const ch of digits) {
    sum += parseInt(ch, 10);
  }

  // 检查是否为卓越数
  if (sum === 11 || sum === 22 || sum === 33) return sum;
  // 继续缩减
  if (sum > 9) {
    return reduceNumber(sum);
  }
  return sum;
}

/**
 * 对最终总和进行缩减，保留卓越数
 */
function reduceFinal(total: number): number {
  if (total === 11 || total === 22 || total === 33) return total;
  if (total <= 9) return total;

  let sum = 0;
  const digits = total.toString();
  for (const ch of digits) {
    sum += parseInt(ch, 10);
  }

  // 再次检查
  if (sum === 11 || sum === 22 || sum === 33) return sum;
  if (sum > 9) return reduceFinal(sum);
  return sum;
}

// ===== 计算过程可视化 =====

export interface CalculationStep {
  label: string;
  value: number | string;
  digits?: number[];
  result?: number;
}

/**
 * 生成计算步骤（用于展示算法过程）
 */
export function getCalculationSteps(
  year: number,
  month: number,
  day: number,
  lang: Lang = "zh",
): CalculationStep[] {
  const steps: CalculationStep[] = [];
  const labels = STEP_LABELS[lang];

  // 步骤1：展示原始数据
  steps.push({
    label: labels.birthdate,
    value: formatBirthdate(year, month, day, lang),
  });

  // 步骤2：各部分数字相加
  const yearDigits = year.toString().split("").map(Number);
  const monthDigits = month.toString().split("").map(Number);
  const dayDigits = day.toString().split("").map(Number);

  const yearSum = yearDigits.reduce((a, b) => a + b, 0);
  const monthSum = monthDigits.reduce((a, b) => a + b, 0);
  const daySum = dayDigits.reduce((a, b) => a + b, 0);

  steps.push({
    label: labels.yearSum,
    digits: yearDigits,
    result: yearSum,
    value: `${yearDigits.join(" + ")} = ${yearSum}`,
  });

  steps.push({
    label: labels.monthSum,
    digits: monthDigits,
    result: monthSum,
    value: `${monthDigits.join(" + ")} = ${monthSum}`,
  });

  steps.push({
    label: labels.daySum,
    digits: dayDigits,
    result: daySum,
    value: `${dayDigits.join(" + ")} = ${daySum}`,
  });

  // 步骤3：三者相加
  const total = yearSum + monthSum + daySum;
  steps.push({
    label: labels.totalSum,
    value: `${yearSum} + ${monthSum} + ${daySum} = ${total}`,
    result: total,
  });

  // 步骤4：最终缩减
  const finalResult = calculateLifeNumber(year, month, day);
  if (total !== finalResult) {
    // 如果需要继续缩减
    const totalDigits = total.toString().split("").map(Number);
    const totalSum = totalDigits.reduce((a, b) => a + b, 0);
    if (totalSum !== finalResult && totalSum > 9) {
      steps.push({
        label: labels.reduce,
        value: `${totalDigits.join(" + ")} = ${totalSum}`,
        result: totalSum,
      });
      if (totalSum !== finalResult) {
        const nextDigits = totalSum.toString().split("").map(Number);
        steps.push({
          label: labels.finalNumber,
          value: `${nextDigits.join(" + ")} = ${finalResult}`,
          result: finalResult,
        });
      }
    } else {
      steps.push({
        label: labels.finalNumber,
        value: `${totalDigits.join(" + ")} = ${finalResult}`,
        result: finalResult,
      });
    }
  }

  return steps;
}

// ===== 灵数解读 =====

export interface NumerologyResult {
  number: LifeNumber;
  profile: NumerologyProfile;
  keywords: string[];
  birthdate: {
    year: number;
    month: number;
    day: number;
  };
  calculationSteps: CalculationStep[];
  isMaster: boolean;
}

/**
 * 计算并返回完整的生命灵数解读
 */
export function getNumerologyReading(
  year: number,
  month: number,
  day: number,
  lang: Lang = "zh",
): NumerologyResult {
  const number = calculateLifeNumber(year, month, day);
  const profile = resolveProfile(NUMEROLOGY_DATA[number], lang);
  const keywords = NUMBER_KEYWORDS[number][lang];
  const steps = getCalculationSteps(year, month, day, lang);

  return {
    number,
    profile,
    keywords,
    birthdate: { year, month, day },
    calculationSteps: steps,
    isMaster: number === 11 || number === 22 || number === 33,
  };
}

// ===== 辅助函数 =====

/**
 * 格式化日期显示
 * en 使用 en-US 风格（如 Jan 05, 1990），zh/tw 使用中文「年月日」。
 */
export function formatBirthdate(
  year: number,
  month: number,
  day: number,
  lang: Lang = "zh",
): string {
  if (lang === "en") {
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return `${year}年${month.toString().padStart(2, "0")}月${day.toString().padStart(2, "0")}日`;
}

/**
 * 获取年份列表（用于选择器）
 */
export function getYearOptions(): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let y = currentYear - 10; y >= 1924; y--) {
    years.push(y);
  }
  return years;
}

/**
 * 获取月份列表
 */
export function getMonthOptions(): Array<{ value: number; label: string }> {
  return Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}月`,
  }));
}

/**
 * 获取某月的天数列表
 */
export function getDayOptions(
  year: number,
  month: number,
): Array<{ value: number; label: string }> {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}日`,
  }));
}

/**
 * 验证日期有效性
 */
export function isValidDate(year: number, month: number, day: number): boolean {
  if (year < 1924 || year > new Date().getFullYear() - 10) return false;
  if (month < 1 || month > 12) return false;
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) return false;
  return true;
}

/**
 * SEO 标题描述生成（三语）
 */
const TDK_TEXT: Record<Lang, {
  brand: string;
  numLabel: (n: number) => string;
  describe: (n: number, name: string, tagline: string) => string;
  fallbackTitle: string;
  fallbackDesc: string;
  fallbackKeywords: string;
  keywordBase: string;
}> = {
  zh: {
    brand: "命运密语",
    numLabel: (n) => `生命灵数 ${n}`,
    describe: (n, name, tagline) =>
      `你的生命灵数是 ${n}，被称为"${name}"。${tagline}。探索你的性格特质、潜能天赋与人生课题。`,
    fallbackTitle: "生命灵数 · 数字命理解析 - 命运密语",
    fallbackDesc: "输入你的生日，计算专属生命灵数（1-9、11、22、33），深度解析性格特质、潜能天赋与人生课题，生成专属灵数卡片。",
    fallbackKeywords: "生命灵数,数字命理,Numerology,卓越数,11,22,33,命运解析,性格测试",
    keywordBase: "生命灵数,数字命理,灵数",
  },
  tw: {
    brand: "命運密語",
    numLabel: (n) => `生命靈數 ${n}`,
    describe: (n, name, tagline) =>
      `你的生命靈數是 ${n}，被稱為「${name}」。${tagline}。探索你的性格特質、潛能天賦與人生課題。`,
    fallbackTitle: "生命靈數 · 數字命理解析 - 命運密語",
    fallbackDesc: "輸入你的生日，計算專屬生命靈數（1-9、11、22、33），深度解析性格特質、潛能天賦與人生課題，生成專屬靈數卡片。",
    fallbackKeywords: "生命靈數,數字命理,Numerology,卓越數,11,22,33,命運解析,性格測試",
    keywordBase: "生命靈數,數字命理,靈數",
  },
  en: {
    brand: "Mystic Whispers",
    numLabel: (n) => `Life Path Number ${n}`,
    describe: (n, name, tagline) =>
      `Your Life Path Number is ${n}, known as "${name}". ${tagline}. Explore your personality traits, hidden gifts, and life lessons.`,
    fallbackTitle: "Life Path Number · Numerology Reading - Mystic Whispers",
    fallbackDesc: "Enter your birthday to calculate your Life Path Number (1-9, 11, 22, 33), with an in-depth reading of your traits, gifts, and life lessons, plus a personal number card.",
    fallbackKeywords: "Life Path Number,Numerology,Master Number,11,22,33,personality,destiny reading",
    keywordBase: "Life Path Number,Numerology",
  },
};

export function generateNumerologyTDK(lifeNumber?: LifeNumber, lang: Lang = "zh") {
  const txt = TDK_TEXT[lang];
  if (lifeNumber) {
    const raw = NUMEROLOGY_DATA[lifeNumber];
    const name = raw.name[lang];
    const tagline = raw.tagline[lang];
    const keywords = NUMBER_KEYWORDS[lifeNumber][lang];
    return {
      title: `${txt.numLabel(lifeNumber)} · ${name} - ${txt.brand}`,
      description: txt.describe(lifeNumber, name, tagline),
      keywords: `${txt.keywordBase},${name},${keywords.join(",")}`,
    };
  }
  return {
    title: txt.fallbackTitle,
    description: txt.fallbackDesc,
    keywords: txt.fallbackKeywords,
  };
}
