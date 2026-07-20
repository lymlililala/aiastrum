// ===== 水晶抽石占卜引擎 =====

import { STONE_POOL, type PoolEntry } from "./crystals-data";

export type DrawMode = "single" | "three";

export interface CrystalDraw {
  mode: DrawMode;
  stones: PoolEntry[];
  drawTime: number;
}

/** 加密随机数 [0, max)，优先 crypto.getRandomValues，降级 Math.random（与 rune-engine 一致） */
function secureRandom(max: number): number {
  if (typeof window !== "undefined" && window.crypto) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return (arr[0]! / 0xffffffff) * max;
  }
  return Math.random() * max;
}

/**
 * 从 37 颗水晶池中抽 n 颗，同 id 的水晶（如多处出现的紫水晶）一局只出现一次。
 */
export function drawCrystals(mode: DrawMode): CrystalDraw {
  const n = mode === "single" ? 1 : 3;
  const copy = [...STONE_POOL];
  // Fisher-Yates 洗牌
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(secureRandom(i + 1));
    const temp = copy[i]!;
    copy[i] = copy[j]!;
    copy[j] = temp;
  }
  const picked: PoolEntry[] = [];
  const usedIds = new Set<string>();
  for (const entry of copy) {
    if (picked.length >= n) break;
    if (usedIds.has(entry.stone.id)) continue;
    usedIds.add(entry.stone.id);
    picked.push(entry);
  }
  return { mode, stones: picked, drawTime: Date.now() };
}


// ===== 八字选石：五行匹配 =====

import {
  STONE_ELEMENT,
  GENERATES,
  ELEMENT_CYCLE,
  type StoneElement,
} from "./crystals-data";

/**
 * 找出最弱元素；并列时按相生顺序（木→火→土→金→水）取先。
 */
export function getWeakestElement(scores: Record<string, number>): StoneElement {
  let weakest: StoneElement = "木";
  let min = Infinity;
  for (const el of ELEMENT_CYCLE) {
    const s = scores[el] ?? 0;
    if (s < min) {
      min = s;
      weakest = el;
    }
  }
  return weakest;
}

/** 五行分布是否「接近」（各行极差小于阈值，用于时辰未知时提示不确定性） */
export function scoresAreClose(scores: Record<string, number>): boolean {
  const vals = ELEMENT_CYCLE.map((el) => scores[el] ?? 0);
  return Math.max(...vals) - Math.min(...vals) < 1;
}

export interface BaziMatch {
  /** 需补元素的水晶（不足 4 颗时用「生我」母元素水晶补齐，意图匹配的排前） */
  primary: PoolEntry[];
  /** 兼顾诉求的选择（选了诉求时，该诉求下未进入 primary 的水晶） */
  secondary: PoolEntry[];
}

/** 按 stone.id 去重；intentionId 匹配的记录优先保留 */
function dedupPool(entries: PoolEntry[], intentionId?: string): PoolEntry[] {
  const map = new Map<string, PoolEntry>();
  for (const e of entries) {
    const existing = map.get(e.stone.id);
    if (!existing) {
      map.set(e.stone.id, e);
    } else if (intentionId && existing.intentionId !== intentionId && e.intentionId === intentionId) {
      map.set(e.stone.id, e);
    }
  }
  return [...map.values()];
}

/**
 * 八字选石推荐：
 * 1. 取归属需补元素的水晶（去重后），选了诉求的意图匹配排前；
 * 2. 不足 4 颗时用母元素（生我者，如补金配土——土生金）水晶补齐；
 * 3. 选了诉求时，secondary 给出该诉求下未入选的其他水晶。
 */
export function matchStonesByElement(
  element: StoneElement,
  intentionId?: string,
): BaziMatch {
  const unique = dedupPool(STONE_POOL, intentionId);
  const intentionFirst = (a: PoolEntry, b: PoolEntry) => {
    const am = intentionId && a.intentionId === intentionId ? 0 : 1;
    const bm = intentionId && b.intentionId === intentionId ? 0 : 1;
    return am - bm;
  };

  const primary = unique
    .filter((e) => STONE_ELEMENT[e.stone.id] === element)
    .sort(intentionFirst);

  // 母元素补齐（五行「生我」补益）
  if (primary.length < 4) {
    const mother = GENERATES[element];
    const used = new Set(primary.map((e) => e.stone.id));
    const supplements = unique
      .filter((e) => STONE_ELEMENT[e.stone.id] === mother && !used.has(e.stone.id))
      .sort(intentionFirst);
    for (const s of supplements) {
      if (primary.length >= 4) break;
      primary.push(s);
      used.add(s.stone.id);
    }
  }

  const primaryIds = new Set(primary.map((e) => e.stone.id));
  const secondary = intentionId
    ? STONE_POOL.filter((e) => e.intentionId === intentionId && !primaryIds.has(e.stone.id)).slice(0, 3)
    : [];

  return { primary: primary.slice(0, 6), secondary };
}
