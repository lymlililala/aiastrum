import { en } from "./en";
import { zh } from "./zh";
import { tw } from "./tw";
import type { Locale } from "~/lib/i18n";

export { en, zh, tw };
export type { EnDict } from "./en";
export type { ZhDict } from "./zh";
export type { TwDict } from "./tw";

// 使用宽松类型，避免 as const 字面量不兼容
export type Dict = {
  [K in keyof typeof zh]: typeof zh[K];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dictionaries: Record<Locale, Dict> = { en: en as any, zh, tw: tw as any };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}
