import { type CardMeaning } from "./types";
import { PART_1 } from "./part-1";
import { PART_2 } from "./part-2";
import { PART_3 } from "./part-3";
import { PART_4 } from "./part-4";
import { PART_5 } from "./part-5";
import { PART_6 } from "./part-6";
import { PART_7 } from "./part-7";
import { PART_8 } from "./part-8";
import { PART_9 } from "./part-9";
import { PART_10 } from "./part-10";
import { PART_11 } from "./part-11";

// 78 张塔罗牌详情内容（中英双语，繁体回退 zh），key = slug
export const CARD_MEANINGS: Record<string, CardMeaning> = Object.fromEntries(
  [
    ...PART_1, ...PART_2, ...PART_3, ...PART_4, ...PART_5, ...PART_6,
    ...PART_7, ...PART_8, ...PART_9, ...PART_10, ...PART_11,
  ].map((c) => [c.slug, c]),
);
