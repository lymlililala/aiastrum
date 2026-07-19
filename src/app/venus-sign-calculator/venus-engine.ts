// ── 金星星座计算 ─────────────────────────────────────────────────
// 薄封装：直接复用 src/app/astro/astro-engine.ts 的天文算法，不重写计算。
// 本页只取整张星盘中的金星位置（星座 + 度数）。
import { buildAstroChart, type CityData, type PlanetPosition, type ZodiacSign } from "~/app/astro/astro-engine";
import { getPlanetInSignKeyword } from "~/app/astro/astro-content-i18n";
import { canonicalSlug } from "~/lib/canonical-overrides";
import type { Lang } from "./venus-i18n";

export interface VenusSignResult {
  sign: ZodiacSign;        // 金星星座
  degree: number;          // 星座内度数 0-29
  minute: number;          // 分
  altSign: ZodiacSign | null; // 生日当天跨座时的另一可能星座（罕见）
  interpretation: string;  // 该金星星座的恋爱风格解读
  blogSlug: string;        // 对应 /blog/{slug} 解读文章
}

/** 未选城市时的兜底城市：金星日行约 1°，时区差异几乎不影响结果 */
export const DEFAULT_CITY: CityData = {
  name: "伦敦",
  nameEn: "London",
  lat: 51.5074,
  lng: -0.1278,
  timezone: "Europe/London",
  country: "英国",
};

/** 取某一时刻的金星位置（内部辅助） */
function venusPosAt(birthDate: string, birthTime: string, city: CityData, lang: Lang): PlanetPosition {
  const chart = buildAstroChart(
    { name: "", birthDate, birthTime, unknownTime: false, city },
    lang,
  );
  return chart.planets.find((p) => p.planet === "Venus")!;
}

/**
 * 计算金星星座。
 * 金星约 23 天走一个星座、日行约 1°，出生时间对结果几乎无影响；
 * 未提供时间时按正午计算，并比较当天 00:00 / 23:59 端点，
 * 极少数跨座日给出另一种可能。
 */
export function calcVenusSign(opts: {
  birthDate: string;   // YYYY-MM-DD
  birthTime: string;   // HH:MM（空字符串按正午）
  city: CityData;      // 未选城市时调用方传 DEFAULT_CITY
  lang: Lang;
}): VenusSignResult {
  const { birthDate, city, lang } = opts;
  const birthTime = opts.birthTime || "12:00";

  const pos = venusPosAt(birthDate, birthTime, city, lang);

  // 端点比较：金星靠近星座边界时，当天可能跨座（概率远低于月亮）
  const dayStart = venusPosAt(birthDate, "00:00", city, lang);
  const dayEnd = venusPosAt(birthDate, "23:59", city, lang);
  const altSign =
    dayStart.sign === dayEnd.sign
      ? null
      : pos.sign === dayStart.sign
        ? dayEnd.sign
        : dayStart.sign;

  return {
    sign: pos.sign,
    degree: pos.degree,
    minute: pos.minute,
    altSign,
    interpretation: getPlanetInSignKeyword("Venus", pos.sign, lang) ?? "",
    blogSlug: canonicalSlug(`venus-in-${pos.sign.toLowerCase()}-meaning`),
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
