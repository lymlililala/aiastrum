// ── 上升星座计算 ─────────────────────────────────────────────────
// 薄封装：直接复用 src/app/astro/astro-engine.ts 的天文算法，不重写计算。
// 本页只取整张星盘中的上升点（Ascendant = 第 1 宫宫头）。
import { buildAstroChart, type CityData, type ZodiacSign } from "~/app/astro/astro-engine";
import { getRisingSignText } from "~/app/astro/astro-content-i18n";
import type { Lang } from "./rising-i18n";

export interface RisingSignResult {
  sign: ZodiacSign;        // 上升星座
  degree: number;          // 星座内度数 0-29
  minute: number;          // 分
  exactTime: boolean;      // 是否提供了准确出生时间（false = 正午估算）
  interpretation: string;  // 该上升星座的解读文案
  blogSlug: string;        // 对应 /blog/{slug} 解读文章
}

/**
 * 计算上升星座。
 * - 有准确时间：直接按该时刻计算上升点（chart.ascendant，即第 1 宫宫头经度）。
 * - 不知道时间：上升点 24 小时走完全部十二星座，无法像月亮那样
 *   做端点比较。按正午估算并标记 exactTime=false，结果页展示误差说明。
 */
export function calcRisingSign(opts: {
  birthDate: string;   // YYYY-MM-DD
  birthTime: string;   // HH:MM（unknownTime 时忽略）
  unknownTime: boolean;
  city: CityData;
  lang: Lang;
}): RisingSignResult {
  const { birthDate, birthTime, unknownTime, city, lang } = opts;
  const exactTime = !unknownTime && !!birthTime;
  // 未知时间时按正午估算（引擎 unknownTime=true 会用太阳近似上升，故此处
  // 始终传 unknownTime:false，让引擎走真实的恒星时上升计算）
  const time = exactTime ? birthTime : "12:00";

  const chart = buildAstroChart(
    { name: "", birthDate, birthTime: time, unknownTime: false, city },
    lang,
  );

  const lon = chart.ascendant;
  const cusp1 = chart.houses.find((h) => h.house === 1)!;
  const inSign = ((lon % 30) + 30) % 30;
  let degree = Math.floor(inSign);
  let minute = Math.round((inSign - degree) * 60);
  if (minute === 60) {
    degree += 1;
    minute = 0;
  }

  return {
    sign: cusp1.sign,
    degree,
    minute,
    exactTime,
    interpretation: getRisingSignText(cusp1.sign, lang),
    blogSlug: `${cusp1.sign.toLowerCase()}-rising-sign-meaning`,
  };
}

// ── 年/月/日/时/分下拉选项（与 numerology 页一致的交互） ──────────
export function getYearOptions(): number[] {
  const current = new Date().getFullYear();
  const years: number[] = [];
  for (let y = current; y >= 1920; y--) years.push(y);
  return years;
}

export function getMonthOptions(): Array<{ value: number; label: string }> {
  return Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: `${i + 1}` }));
}

export function getDayOptions(year: number, month: number): Array<{ value: number; label: string }> {
  const days = new Date(year, month, 0).getDate();
  return Array.from({ length: days }, (_, i) => ({ value: i + 1, label: `${i + 1}` }));
}

export function getHourOptions(): Array<{ value: number; label: string }> {
  return Array.from({ length: 24 }, (_, i) => ({ value: i, label: `${i}`.padStart(2, "0") }));
}

export function getMinuteOptions(): Array<{ value: number; label: string }> {
  return Array.from({ length: 60 }, (_, i) => ({ value: i, label: `${i}`.padStart(2, "0") }));
}
