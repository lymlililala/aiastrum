// ===== 卢恩符文占卜引擎 =====

import { RUNES, THREE_STONE_POSITIONS, type RuneData } from "./rune-data";

// ===== 类型定义 =====

export type SpreadType = "single" | "three";

export interface DrawnRune {
  rune: RuneData;
  isReversed: boolean;
  position?: string; // 三石阵时的位置标签
  positionIcon?: string;
  positionDescription?: string;
}

export interface RuneReadingResult {
  spread: SpreadType;
  stones: DrawnRune[];
  drawTime: number;
}

// ===== 抽牌核心算法 =====

/**
 * 生成加密随机数 [0, max)
 * 优先使用 crypto.getRandomValues，降级到 Math.random
 */
function secureRandom(max: number): number {
  if (typeof window !== "undefined" && window.crypto) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return (arr[0]! / 0xffffffff) * max;
  }
  return Math.random() * max;
}

/**
 * 从数组中随机选取不重复的 n 个元素（Fisher-Yates 洗牌）
 */
function sampleWithoutReplacement<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(secureRandom(i + 1));
    const temp = copy[i]!;
    copy[i] = copy[j]!;
    copy[j] = temp;
  }
  return copy.slice(0, n);
}

/**
 * 单次抽取符文
 * @param excludeIds 排除的符文 ID（防止三石阵重复）
 */
function drawOneRune(excludeIds: number[] = []): DrawnRune {
  const available = RUNES.filter((r) => !excludeIds.includes(r.id));
  const picked = sampleWithoutReplacement(available, 1)[0]!;
  // 决定正/逆位：不可逆的符文永远正位
  const isReversed = picked.isReversible ? Math.random() > 0.5 : false;
  return { rune: picked, isReversed };
}

// ===== 公开 API =====

/**
 * 单石占卜（奥丁之眼）
 */
export function drawSingleRune(): RuneReadingResult {
  const drawn = drawOneRune();
  return {
    spread: "single",
    stones: [drawn],
    drawTime: Date.now(),
  };
}

/**
 * 三石占卜（诺伦三女神：过去·现在·未来）
 */
export function drawThreeRunes(): RuneReadingResult {
  const usedIds: number[] = [];
  const stones: DrawnRune[] = THREE_STONE_POSITIONS.map((pos) => {
    const drawn = drawOneRune(usedIds);
    usedIds.push(drawn.rune.id);
    return {
      ...drawn,
      position: pos.label,
      positionIcon: pos.icon,
      positionDescription: pos.description,
    };
  });

  return {
    spread: "three",
    stones,
    drawTime: Date.now(),
  };
}

/**
 * 根据类型执行抽牌
 */
export function drawRunes(type: SpreadType): RuneReadingResult {
  return type === "single" ? drawSingleRune() : drawThreeRunes();
}

// ===== 辅助函数 =====

/**
 * 获取符文当前的解读（正/逆位）
 */
export function getActiveReading(stone: DrawnRune) {
  const { rune, isReversed } = stone;
  if (isReversed && rune.reversed) {
    return { ...rune.reversed, orientation: "逆位" as const };
  }
  return { ...rune.upright, orientation: "正位" as const };
}

/**
 * 格式化占卜时间
 */
export function formatDrawTime(timestamp: number): string {
  const d = new Date(timestamp);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

// ===== SEO =====

export function generateRuneTDK(result?: RuneReadingResult) {
  if (result?.stones[0]) {
    const main = result.stones[0];
    const reading = getActiveReading(main);
    const spreadName = result.spread === "single" ? "单石占卜" : "三石占卜";
    return {
      title: `${main.rune.chineseName} · ${reading.orientation} — 卢恩符文${spreadName} | 命运密语`,
      description: `你抽到了【${main.rune.chineseName}（${main.rune.name}）】${reading.orientation}。${reading.keywords.join("·")}。${reading.meaning.slice(0, 60)}`,
      keywords: `卢恩符文,${main.rune.name},${main.rune.chineseName},${reading.keywords.join(",")},北欧占卜,符文占卜`,
    };
  }
  return {
    title: "卢恩符文占卜 · RuneWhisper — 命运密语",
    description: "古老北欧符文占卜。单石·奥丁之眼，三石·诺伦三女神。倾听古老石头的低语，洞悉当下的抉择。",
    keywords: "卢恩符文,Runes,北欧占卜,符文占卜,老弗萨克,奥丁,维京,神秘学",
  };
}

// ===== 颜色映射（元素 → 主题色） =====

export const ELEMENT_COLORS: Record<string, { primary: string; secondary: string }> = {
  火: { primary: "#E85D04", secondary: "#F48C06" },
  土: { primary: "#6B5B45", secondary: "#A0896B" },
  风: { primary: "#4A9ECA", secondary: "#7EC8E3" },
  水: { primary: "#1E6B9E", secondary: "#4A90D9" },
  冰: { primary: "#7EC8E3", secondary: "#B0E0F5" },
  所有: { primary: "#C9A84C", secondary: "#E8D5A3" },
};

export function getElementColor(element: string) {
  return ELEMENT_COLORS[element] ?? { primary: "#4A9ECA", secondary: "#7EC8E3" };
}
