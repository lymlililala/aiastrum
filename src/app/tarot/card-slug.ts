import { TAROT_CARDS, type TarotCard } from "../tarot-data";

/** 英文牌名 → URL slug（与 card-meanings 数据 key 一致），如 "Wheel of Fortune" → "wheel-of-fortune" */
export function cardSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
}

/** slug → 基础牌数据（牌名/图片/关键词） */
export const CARD_BY_SLUG = new Map<string, TarotCard>(
  TAROT_CARDS.map((c) => [cardSlug(c.name), c]),
);
