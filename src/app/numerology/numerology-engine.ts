// ===== 生命灵数计算引擎 =====

import {
  NUMEROLOGY_DATA,
  NUMBER_KEYWORDS,
  type LifeNumber,
  type NumerologyProfile,
} from "./numerology-data";

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
): CalculationStep[] {
  const steps: CalculationStep[] = [];

  // 步骤1：展示原始数据
  steps.push({
    label: "出生日期",
    value: `${year}年${month}月${day}日`,
  });

  // 步骤2：各部分数字相加
  const yearDigits = year.toString().split("").map(Number);
  const monthDigits = month.toString().split("").map(Number);
  const dayDigits = day.toString().split("").map(Number);

  const yearSum = yearDigits.reduce((a, b) => a + b, 0);
  const monthSum = monthDigits.reduce((a, b) => a + b, 0);
  const daySum = dayDigits.reduce((a, b) => a + b, 0);

  steps.push({
    label: "年份数字之和",
    digits: yearDigits,
    result: yearSum,
    value: `${yearDigits.join(" + ")} = ${yearSum}`,
  });

  steps.push({
    label: "月份数字之和",
    digits: monthDigits,
    result: monthSum,
    value: `${monthDigits.join(" + ")} = ${monthSum}`,
  });

  steps.push({
    label: "日期数字之和",
    digits: dayDigits,
    result: daySum,
    value: `${dayDigits.join(" + ")} = ${daySum}`,
  });

  // 步骤3：三者相加
  const total = yearSum + monthSum + daySum;
  steps.push({
    label: "三部分之和",
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
        label: "继续缩减",
        value: `${totalDigits.join(" + ")} = ${totalSum}`,
        result: totalSum,
      });
      if (totalSum !== finalResult) {
        const nextDigits = totalSum.toString().split("").map(Number);
        steps.push({
          label: "最终数字",
          value: `${nextDigits.join(" + ")} = ${finalResult}`,
          result: finalResult,
        });
      }
    } else {
      steps.push({
        label: "最终数字",
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
): NumerologyResult {
  const number = calculateLifeNumber(year, month, day);
  const profile = NUMEROLOGY_DATA[number];
  const keywords = NUMBER_KEYWORDS[number];
  const steps = getCalculationSteps(year, month, day);

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
 */
export function formatBirthdate(year: number, month: number, day: number): string {
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
 * SEO 标题描述生成
 */
export function generateNumerologyTDK(lifeNumber?: LifeNumber) {
  if (lifeNumber) {
    const profile = NUMEROLOGY_DATA[lifeNumber];
    return {
      title: `生命灵数 ${lifeNumber} · ${profile.name} - 命运密语`,
      description: `你的生命灵数是 ${lifeNumber}，被称为"${profile.name}"。${profile.tagline}。探索你的性格特质、潜能天赋与人生课题。`,
      keywords: `生命灵数,数字命理,灵数${lifeNumber},${profile.name},${NUMBER_KEYWORDS[lifeNumber].join(",")}`,
    };
  }
  return {
    title: "生命灵数 · 数字命理解析 - 命运密语",
    description: "输入你的生日，计算专属生命灵数（1-9、11、22、33），深度解析性格特质、潜能天赋与人生课题，生成专属灵数卡片。",
    keywords: "生命灵数,数字命理,Numerology,卓越数,11,22,33,命运解析,性格测试",
  };
}
