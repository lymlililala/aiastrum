// ── 月亮星座计算 ─────────────────────────────────────────────────
// 薄封装：直接复用 src/app/astro/astro-engine.ts 的天文算法，不重写计算。
// 本页只取整张星盘中的月亮位置（星座 + 度数）。
import { buildAstroChart, type CityData, type PlanetPosition, type ZodiacSign } from "~/app/astro/astro-engine";
import { getMoonSignText } from "~/app/astro/astro-content-i18n";
import type { Lang } from "./moon-i18n";

export interface MoonSignResult {
  sign: ZodiacSign;        // 月亮星座
  degree: number;          // 星座内度数 0-29
  minute: number;          // 分
  exactTime: boolean;      // 是否提供了准确出生时间
  altSign: ZodiacSign | null; // 未知时间且当天跨座时的另一可能星座
  interpretation: string;  // 该月亮星座的解读文案
  blogSlug: string;        // 对应 /blog/{slug} 解读文章
}

/** 取某一时刻的月亮位置（内部辅助） */
function moonPosAt(birthDate: string, birthTime: string, city: CityData, lang: Lang): PlanetPosition {
  const chart = buildAstroChart(
    { name: "", birthDate, birthTime, unknownTime: false, city },
    lang,
  );
  return chart.planets.find((p) => p.planet === "Moon")!;
}

/**
 * 计算月亮星座。
 * - 有准确时间：直接按该时刻计算。
 * - 不知道时间：月亮日行约 13°，当天可能跨座。比较当天 00:00 与 23:59
 *   两个端点的星座，不同则给出两种可能（主结果取正午位置）。
 */
export function calcMoonSign(opts: {
  birthDate: string;   // YYYY-MM-DD
  birthTime: string;   // HH:MM（unknownTime 时忽略）
  unknownTime: boolean;
  city: CityData;
  lang: Lang;
}): MoonSignResult {
  const { birthDate, birthTime, unknownTime, city, lang } = opts;

  if (!unknownTime && birthTime) {
    const pos = moonPosAt(birthDate, birthTime, city, lang);
    return {
      sign: pos.sign,
      degree: pos.degree,
      minute: pos.minute,
      exactTime: true,
      altSign: null,
      interpretation: getMoonSignText(pos.sign, lang),
      blogSlug: `${pos.sign.toLowerCase()}-moon-sign-meaning`,
    };
  }

  // 未知时间：取正午位置作主结果，端点比较判断是否跨座
  const noon = moonPosAt(birthDate, "12:00", city, lang);
  const dayStart = moonPosAt(birthDate, "00:00", city, lang);
  const dayEnd = moonPosAt(birthDate, "23:59", city, lang);
  const altSign =
    dayStart.sign === dayEnd.sign
      ? null
      : noon.sign === dayStart.sign
        ? dayEnd.sign
        : dayStart.sign;

  return {
    sign: noon.sign,
    degree: noon.degree,
    minute: noon.minute,
    exactTime: false,
    altSign,
    interpretation: getMoonSignText(noon.sign, lang),
    blogSlug: `${noon.sign.toLowerCase()}-moon-sign-meaning`,
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
