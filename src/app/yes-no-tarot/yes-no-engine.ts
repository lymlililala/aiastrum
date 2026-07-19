// ── 是与否塔罗判定引擎 ───────────────────────────────────────────
// 薄封装：抽牌复用 src/app/tarot-data.ts 的 drawCards（含 30% 逆位概率），
// 牌意文案复用 src/app/tarot/card-meanings（78 张牌中英双语详解）。
// 本页只负责 yes/no/maybe 判定规则：
//   正位 → 偏向 Yes；逆位 → 偏向 No；
//   少数内省/未定类牌（女祭司、倒吊人等）无论正逆位都读作 Maybe —— 通行惯例。
import { drawCards, type TarotCard } from "../tarot-data";
import { CARD_MEANINGS } from "../tarot/card-meanings";
import { cardSlug } from "../tarot/card-slug";
import type { Lang } from "./yes-no-i18n";

export type Verdict = "yes" | "no" | "maybe";

// 传统是非牌阵中读作「视情况而定 / 尚未定局」的牌
const MAYBE_SLUGS = new Set([
  "the-high-priestess",
  "the-hanged-man",
  "the-moon",
  "two-of-swords",
  "four-of-swords",
  "seven-of-cups",
]);

export interface YesNoCard {
  card: TarotCard;
  reversed: boolean;
  slug: string;
  verdict: Verdict;
  meaning: string; // 当前语言下该牌正/逆位的简述
}

export interface YesNoResult {
  verdict: Verdict;
  cards: YesNoCard[];
  question: string;
}

/** 单张牌的是非倾向 */
export function cardVerdict(slug: string, reversed: boolean): Verdict {
  if (MAYBE_SLUGS.has(slug)) return "maybe";
  return reversed ? "no" : "yes";
}

/** 取该牌在当前语言下正/逆位的综合解读首段（繁体回退简体，与牌意详情页一致） */
function cardMeaning(slug: string, reversed: boolean, lang: Lang): string {
  const m = CARD_MEANINGS[slug];
  if (!m) return "";
  const loc = lang === "en" ? m.en : m.zh;
  const arr = reversed ? loc.reversed.general : loc.upright.general;
  return arr[0] ?? "";
}

/**
 * 抽 1 或 3 张牌并给出整体判定。
 * - 单张：直接取该牌倾向。
 * - 三张：各牌表决，严格多数胜出；三方持平（1-1-1）则为 Maybe。
 */
export function drawYesNo(count: 1 | 3, question: string, lang: Lang): YesNoResult {
  const drawn = drawCards(count);
  const cards: YesNoCard[] = drawn.map(({ card, reversed }) => {
    const slug = cardSlug(card.name);
    return {
      card,
      reversed,
      slug,
      verdict: cardVerdict(slug, reversed),
      meaning: cardMeaning(slug, reversed, lang),
    };
  });

  let verdict: Verdict;
  if (cards.length === 1) {
    verdict = cards[0]!.verdict;
  } else {
    const score: Record<Verdict, number> = { yes: 0, no: 0, maybe: 0 };
    for (const c of cards) score[c.verdict]++;
    if (score.yes > score.no && score.yes > score.maybe) verdict = "yes";
    else if (score.no > score.yes && score.no > score.maybe) verdict = "no";
    else verdict = "maybe";
  }

  return { verdict, cards, question };
}
