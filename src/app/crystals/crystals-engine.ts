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
