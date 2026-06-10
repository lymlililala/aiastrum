// ===== 云端灵签 · 内容三语覆盖层（脚手架）=====
// 设计：附加式覆盖 + 中文兜底（模式参考 horoscope-content-i18n.ts）。
// - 引擎按 lang 查这里的译文；查不到就回退原中文 → 翻一半也能正常运行、永不破坏构建。
// - 当前 override 表全部留空（{ en: {}, tw: {} }）：英文/繁体一律回退中文。后续分批填充。
// - 解析后结果 TYPE 不变（仍为 string / string[]）；resolve 发生在 lingqian-engine.ts。
//
// 数据键约定（保持中文，勿翻译）：
// - 神明用 deity.id（"guanyin" / "huangdaxian"）做 override key。
// - 签文用 `${deityId}:${signId}` 做 override key（signId 在两个神明各自从 1 开始）。
// - 吉凶等级 LuckLevel（"上上"…）、掷筊 JiaoResult（"圣杯"…）保持中文键，仅本地化显示文本。

import type { LuckLevel } from "./lingqian-data";
import { LING_EN_1, LING_TW_1 } from "./lingqian-fill-1";
import { LING_EN_2, LING_TW_2 } from "./lingqian-fill-2";
import { LING_EN_3, LING_TW_3 } from "./lingqian-fill-3";
import { LING_EN_4, LING_TW_4 } from "./lingqian-fill-4";
import { LING_EN_5, LING_TW_5 } from "./lingqian-fill-5";
import {
  DEITY_EN, DEITY_TW,
  LUCK_LEVEL_EN, LUCK_LEVEL_TW,
  LUCK_LABEL_EN, LUCK_LABEL_TW,
  JIAO_DESC_EN, JIAO_DESC_TW,
  ZEN_QUOTES_EN, ZEN_QUOTES_TW,
} from "./lingqian-fill-6";

export type Lang = "zh" | "en" | "tw";
export type ContentLang = "en" | "tw";

// 单签可覆盖的内容字段（全部可选；缺失字段自动回退中文）
export interface SignContentOverride {
  name?: string;
  poem?: [string, string, string, string];
  plain?: string;
  interpretation?: {
    career?: string;
    love?: string;
    wealth?: string;
    health?: string;
  };
  yi?: string[];
  ji?: string[];
  zen?: string;
}

// ─── 签文覆盖表：key = `${deityId}:${signId}` ───
// 例：{ en: { "guanyin:1": { name: "...", poem: [...], ... } }, tw: {...} }
export const SIGN_CONTENT_I18N: Record<ContentLang, Record<string, SignContentOverride>> = {
  en: { ...LING_EN_1, ...LING_EN_2, ...LING_EN_3, ...LING_EN_4, ...LING_EN_5 },
  tw: { ...LING_TW_1, ...LING_TW_2, ...LING_TW_3, ...LING_TW_4, ...LING_TW_5 },
};

// ─── 神明描述覆盖表：key = deity.id ───
// 仅覆盖 desc（name/fullName 暂保持中文，如需可后续扩展）。
export interface DeityContentOverride {
  name?: string;
  fullName?: string;
  desc?: string;
}
export const DEITY_CONTENT_I18N: Record<ContentLang, Record<string, DeityContentOverride>> = {
  en: DEITY_EN,
  tw: DEITY_TW,
};

// ─── 吉凶等级显示文本覆盖表：key = LuckLevel（中文）───
// LUCK_COLORS 的 label（"大吉"/"吉祥"…）的本地化显示。等级本身（"上上"…）也可本地化显示。
export const LUCK_LEVEL_I18N: Record<ContentLang, Partial<Record<LuckLevel, string>>> = {
  en: LUCK_LEVEL_EN,
  tw: LUCK_LEVEL_TW,
};
export const LUCK_LABEL_I18N: Record<ContentLang, Partial<Record<LuckLevel, string>>> = {
  en: LUCK_LABEL_EN,
  tw: LUCK_LABEL_TW,
};

// ─── 掷筊结果描述覆盖表：key = JiaoResult（中文）───
export const JIAO_DESC_I18N: Record<ContentLang, Record<string, string>> = {
  en: JIAO_DESC_EN,
  tw: JIAO_DESC_TW,
};

// ─── 每日禅语覆盖表（按相同索引；缺失回退中文）───
export const ZEN_QUOTES_I18N: Record<ContentLang, readonly string[]> = {
  en: ZEN_QUOTES_EN,
  tw: ZEN_QUOTES_TW,
};

// ===== 解析助手（resolver）=====
// 约定：lang === "zh" 直接返回中文兜底；否则查 override，缺失回退中文。

function signKey(deityId: string, signId: number): string {
  return `${deityId}:${signId}`;
}

/** 单签某个标量字段（plain / zen / name） */
export function resolveSignField(
  lang: Lang,
  deityId: string,
  signId: number,
  field: "name" | "plain" | "zen",
  zh: string,
): string {
  if (lang === "zh") return zh;
  const o = SIGN_CONTENT_I18N[lang]?.[signKey(deityId, signId)];
  return o?.[field] ?? zh;
}

/** 签诗（4 句）；缺失整体回退中文 */
export function resolveSignPoem(
  lang: Lang,
  deityId: string,
  signId: number,
  zh: [string, string, string, string],
): [string, string, string, string] {
  if (lang === "zh") return zh;
  const o = SIGN_CONTENT_I18N[lang]?.[signKey(deityId, signId)];
  return o?.poem ?? zh;
}

/** 单维度解析（career/love/wealth/health） */
export function resolveSignInterp(
  lang: Lang,
  deityId: string,
  signId: number,
  field: "career" | "love" | "wealth" | "health",
  zh: string,
): string {
  if (lang === "zh") return zh;
  const o = SIGN_CONTENT_I18N[lang]?.[signKey(deityId, signId)];
  return o?.interpretation?.[field] ?? zh;
}

/** 宜 / 忌 标签数组；缺失整体回退中文 */
export function resolveSignList(
  lang: Lang,
  deityId: string,
  signId: number,
  field: "yi" | "ji",
  zh: string[],
): string[] {
  if (lang === "zh") return zh;
  const o = SIGN_CONTENT_I18N[lang]?.[signKey(deityId, signId)];
  return o?.[field] ?? zh;
}

/** 神明描述 */
export function resolveDeityField(
  lang: Lang,
  deityId: string,
  field: "name" | "fullName" | "desc",
  zh: string,
): string {
  if (lang === "zh") return zh;
  return DEITY_CONTENT_I18N[lang]?.[deityId]?.[field] ?? zh;
}

/** 吉凶等级显示（"上上"…）；缺失回退中文等级文本 */
export function resolveLuckLevel(lang: Lang, level: LuckLevel): string {
  if (lang === "zh") return level;
  return LUCK_LEVEL_I18N[lang]?.[level] ?? level;
}

/** 吉凶等级 label（"大吉"…） */
export function resolveLuckLabel(lang: Lang, level: LuckLevel, zhLabel: string): string {
  if (lang === "zh") return zhLabel;
  return LUCK_LABEL_I18N[lang]?.[level] ?? zhLabel;
}

/** 掷筊结果描述（key 为中文 JiaoResult） */
export function resolveJiaoDesc(lang: Lang, jiaoResult: string, zh: string): string {
  if (lang === "zh") return zh;
  return JIAO_DESC_I18N[lang]?.[jiaoResult] ?? zh;
}

/** 每日禅语（按索引；缺失回退中文） */
export function resolveZenQuote(lang: Lang, idx: number, zh: string): string {
  if (lang === "zh") return zh;
  return ZEN_QUOTES_I18N[lang]?.[idx] ?? zh;
}
