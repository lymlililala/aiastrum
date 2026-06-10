// ===== 星盘解析 · 内容三语覆盖层 =====
// 设计：附加式覆盖 + 中文兜底（镜像 horoscope-content-i18n.ts 的模式）。
// - 解析器按 lang 查这里的覆盖表；查不到就回退 astro-data.ts 的原中文 → 翻一半也能正常运行、永不破坏构建。
// - 当前所有覆盖表为空（{en:{}, tw:{}}），故全部回退中文。后续按 key 分批填充即可，无需改动调用方。
// - 解析器返回纯字符串/原结构，引擎与组件在 return 前完成解析，结果类型保持不变。

import type {
  ZodiacSign,
  Planet,
  AspectType,
} from "./astro-data";

import {
  ZODIAC_MAP,
  PLANET_MAP,
  ASPECT_MAP,
  HOUSE_MAP,
  SUN_SIGN_INTERPRETATIONS,
  MOON_SIGN_INTERPRETATIONS,
  RISING_SIGN_INTERPRETATIONS,
  PLANET_IN_SIGN_KEYWORDS,
  PLANET_IN_HOUSE_INTERPRETATIONS,
  ASPECT_INTERPRETATIONS,
} from "./astro-data";

export type Lang = "zh" | "en" | "tw";
export type ContentLang = "en" | "tw";

// ─── 名称覆盖表 ───────────────────────────────────────────────
// 形状：Record<ContentLang, Partial<Record<key, string>>>。空 = 全部回退中文。

/** 星座中文名覆盖（key = ZodiacSign id，如 "Aries"） */
export const ZODIAC_NAME_I18N: Record<ContentLang, Partial<Record<ZodiacSign, string>>> = {
  en: {},
  tw: {},
};

/** 行星中文名覆盖（key = Planet id，如 "Sun"） */
export const PLANET_NAME_I18N: Record<ContentLang, Partial<Record<Planet, string>>> = {
  en: {},
  tw: {},
};

/** 相位中文名覆盖（key = AspectType id，如 "conjunction"） */
export const ASPECT_NAME_I18N: Record<ContentLang, Partial<Record<AspectType, string>>> = {
  en: {},
  tw: {},
};

/** 行星「代表意义」覆盖（key = Planet id） */
export const PLANET_MEANING_I18N: Record<ContentLang, Partial<Record<Planet, string>>> = {
  en: {},
  tw: {},
};

/** 宫位「管辖领域」覆盖（key = 宫位编号 1-12） */
export const HOUSE_DOMAIN_I18N: Record<ContentLang, Partial<Record<number, string>>> = {
  en: {},
  tw: {},
};

// ─── Big3 长文案覆盖表 ────────────────────────────────────────
// 形状：Record<ContentLang, Partial<Record<ZodiacSign, string>>>。空 = 回退中文。

/** 太阳星座解析覆盖（key = ZodiacSign） */
export const SUN_SIGN_I18N: Record<ContentLang, Partial<Record<ZodiacSign, string>>> = {
  en: {},
  tw: {},
};

/** 月亮星座解析覆盖（key = ZodiacSign） */
export const MOON_SIGN_I18N: Record<ContentLang, Partial<Record<ZodiacSign, string>>> = {
  en: {},
  tw: {},
};

/** 上升星座解析覆盖（key = ZodiacSign） */
export const RISING_SIGN_I18N: Record<ContentLang, Partial<Record<ZodiacSign, string>>> = {
  en: {},
  tw: {},
};

// ─── 行星落星座关键短句覆盖表 ─────────────────────────────────
// 形状：Record<ContentLang, Partial<Record<Planet, Partial<Record<ZodiacSign, string>>>>>。
export const PLANET_IN_SIGN_I18N: Record<ContentLang, Partial<Record<Planet, Partial<Record<ZodiacSign, string>>>>> = {
  en: {},
  tw: {},
};

// ─── 行星落宫位解析覆盖表 ─────────────────────────────────────
// 形状：Record<ContentLang, Partial<Record<Planet, Partial<Record<number, string>>>>>。
export const PLANET_IN_HOUSE_I18N: Record<ContentLang, Partial<Record<Planet, Partial<Record<number, string>>>>> = {
  en: {},
  tw: {},
};

// ─── 核心相位解析覆盖表 ───────────────────────────────────────
// 形状：Record<ContentLang, Partial<Record<Planet, Partial<Record<Planet, Partial<Record<AspectType, string>>>>>>>。
export const ASPECT_INTERPRETATION_I18N: Record<ContentLang, Partial<Record<Planet, Partial<Record<Planet, Partial<Record<AspectType, string>>>>>>> = {
  en: {},
  tw: {},
};

// ===== 解析助手（override 优先，否则回退 astro-data 中文）=====

/** 星座名（中文兜底） */
export function getZodiacName(id: ZodiacSign, lang: Lang): string {
  const zh = ZODIAC_MAP[id]?.name ?? id;
  if (lang === "zh") return zh;
  return ZODIAC_NAME_I18N[lang][id] ?? zh;
}

/** 行星名（中文兜底） */
export function getPlanetName(key: Planet, lang: Lang): string {
  const zh = PLANET_MAP[key]?.name ?? key;
  if (lang === "zh") return zh;
  return PLANET_NAME_I18N[lang][key] ?? zh;
}

/** 相位名（中文兜底） */
export function getAspectName(key: AspectType, lang: Lang): string {
  const zh = ASPECT_MAP[key]?.name ?? key;
  if (lang === "zh") return zh;
  return ASPECT_NAME_I18N[lang][key] ?? zh;
}

/** 行星「代表意义」（中文兜底） */
export function getPlanetMeaning(key: Planet, lang: Lang): string {
  const zh = PLANET_MAP[key]?.meaning ?? "";
  if (lang === "zh") return zh;
  return PLANET_MEANING_I18N[lang][key] ?? zh;
}

/** 宫位「管辖领域」（中文兜底） */
export function getHouseDomain(num: number, lang: Lang): string {
  const zh = HOUSE_MAP[num]?.domain ?? "";
  if (lang === "zh") return zh;
  return HOUSE_DOMAIN_I18N[lang][num] ?? zh;
}

/** 太阳星座解析（中文兜底） */
export function getSunSignText(sign: ZodiacSign, lang: Lang): string {
  const zh = SUN_SIGN_INTERPRETATIONS[sign];
  if (lang === "zh") return zh;
  return SUN_SIGN_I18N[lang][sign] ?? zh;
}

/** 月亮星座解析（中文兜底） */
export function getMoonSignText(sign: ZodiacSign, lang: Lang): string {
  const zh = MOON_SIGN_INTERPRETATIONS[sign];
  if (lang === "zh") return zh;
  return MOON_SIGN_I18N[lang][sign] ?? zh;
}

/** 上升星座解析（中文兜底） */
export function getRisingSignText(sign: ZodiacSign, lang: Lang): string {
  const zh = RISING_SIGN_INTERPRETATIONS[sign];
  if (lang === "zh") return zh;
  return RISING_SIGN_I18N[lang][sign] ?? zh;
}

/** 行星落星座关键短句（无则 undefined，与 astro-data 同步可空） */
export function getPlanetInSignKeyword(planet: Planet, sign: ZodiacSign, lang: Lang): string | undefined {
  const zh = PLANET_IN_SIGN_KEYWORDS[planet]?.[sign];
  if (lang === "zh") return zh;
  return PLANET_IN_SIGN_I18N[lang][planet]?.[sign] ?? zh;
}

/** 行星落宫位解析（无则 undefined） */
export function getPlanetInHouseText(planet: Planet, house: number, lang: Lang): string | undefined {
  const zh = PLANET_IN_HOUSE_INTERPRETATIONS[planet]?.[house];
  if (lang === "zh") return zh;
  return PLANET_IN_HOUSE_I18N[lang][planet]?.[house] ?? zh;
}

/** 核心相位解析（无则 undefined；调用方自行兜底默认句） */
export function getAspectInterpretation(p1: Planet, p2: Planet, type: AspectType, lang: Lang): string | undefined {
  const zh = ASPECT_INTERPRETATIONS[p1]?.[p2]?.[type] ?? ASPECT_INTERPRETATIONS[p2]?.[p1]?.[type];
  if (lang === "zh") return zh;
  const o = ASPECT_INTERPRETATION_I18N[lang][p1]?.[p2]?.[type] ?? ASPECT_INTERPRETATION_I18N[lang][p2]?.[p1]?.[type];
  return o ?? zh;
}
