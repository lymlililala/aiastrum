// ===== 卢恩符文占卜引擎 =====

import {
  RUNES,
  THREE_STONE_POSITIONS,
  type RawRuneData,
  type RawRuneReading,
  type RuneData,
  type RuneReading,
  type L,
  type LArr,
} from "./rune-data";

// ===== 语言解析 =====

export type Lang = "zh" | "en" | "tw";

/** 解析单条本地化字符串 */
function rs(v: L, lang: Lang): string {
  return v[lang];
}

/** 解析本地化字符串数组 */
function ra(v: LArr, lang: Lang): string[] {
  return v[lang];
}

/** 将原始（多语言）符文解读解析为纯字符串 */
function resolveReading(raw: RawRuneReading, lang: Lang): RuneReading {
  return {
    keywords: ra(raw.keywords, lang),
    meaning: rs(raw.meaning, lang),
    advice: rs(raw.advice, lang),
  };
}

/**
 * 将原始（多语言）符文解析为面向组件的纯字符串符文。
 * RuneData 的字段类型保持 string / string[] 不变。
 */
function resolveRune(raw: RawRuneData, lang: Lang): RuneData {
  return {
    id: raw.id,
    name: raw.name,           // 北欧专名，语言中立
    chineseName: rs(raw.chineseName, lang),
    symbol: raw.symbol,       // 字形，语言中立
    phonetic: raw.phonetic,   // 语言中立
    element: rs(raw.element, lang),
    deity: rs(raw.deity, lang),
    isReversible: raw.isReversible,
    upright: resolveReading(raw.upright, lang),
    reversed: raw.reversed ? resolveReading(raw.reversed, lang) : null,
    mythology: rs(raw.mythology, lang),
  };
}

// ===== 正/逆位标签（三语） =====

const ORIENTATION_LABELS: Record<Lang, { upright: string; reversed: string }> = {
  zh: { upright: "正位", reversed: "逆位" },
  tw: { upright: "正位", reversed: "逆位" },
  en: { upright: "Upright", reversed: "Reversed" },
};

// ===== 类型定义 =====

export type SpreadType = "single" | "three";

export interface DrawnRune {
  rune: RuneData;          // 已按 lang 解析为纯字符串
  isReversed: boolean;
  position?: string;       // 三石阵时的位置标签（已解析）
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
 * 单次抽取符文（在原始数据上选择，随后按 lang 解析）
 * @param excludeIds 排除的符文 ID（防止三石阵重复）
 */
function drawOneRune(lang: Lang, excludeIds: number[] = []): DrawnRune {
  const available = RUNES.filter((r) => !excludeIds.includes(r.id));
  const picked = sampleWithoutReplacement(available, 1)[0]!;
  // 决定正/逆位：不可逆的符文永远正位
  const isReversed = picked.isReversible ? Math.random() > 0.5 : false;
  return { rune: resolveRune(picked, lang), isReversed };
}

// ===== 公开 API =====

/**
 * 单石占卜（奥丁之眼）
 */
export function drawSingleRune(lang: Lang = "zh"): RuneReadingResult {
  const drawn = drawOneRune(lang);
  return {
    spread: "single",
    stones: [drawn],
    drawTime: Date.now(),
  };
}

/**
 * 三石占卜（诺伦三女神：过去·现在·未来）
 */
export function drawThreeRunes(lang: Lang = "zh"): RuneReadingResult {
  const usedIds: number[] = [];
  const stones: DrawnRune[] = THREE_STONE_POSITIONS.map((pos) => {
    const drawn = drawOneRune(lang, usedIds);
    usedIds.push(drawn.rune.id);
    return {
      ...drawn,
      position: rs(pos.label, lang),
      positionIcon: pos.icon,
      positionDescription: rs(pos.description, lang),
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
export function drawRunes(type: SpreadType, lang: Lang = "zh"): RuneReadingResult {
  return type === "single" ? drawSingleRune(lang) : drawThreeRunes(lang);
}

// ===== 辅助函数 =====

/**
 * 获取符文当前的解读（正/逆位）。
 * stone.rune 已是解析后的纯字符串，orientation 按 lang 解析。
 */
export function getActiveReading(stone: DrawnRune, lang: Lang = "zh") {
  const { rune, isReversed } = stone;
  const labels = ORIENTATION_LABELS[lang];
  if (isReversed && rune.reversed) {
    return { ...rune.reversed, orientation: labels.reversed };
  }
  return { ...rune.upright, orientation: labels.upright };
}

// ===== 三石综合解读生成（三语） =====

const SYNTHESIS_TEXT: Record<Lang, (
  pastName: string, pastKw: string,
  presentName: string, presentKw: string,
  futureName: string, futureKw: string,
  futureAdvice: string,
) => string> = {
  zh: (pn, pk, prn, prk, fn, fk, fa) =>
    `【${pn}】在过去的位置揭示了「${pk}」的根源，`
    + `与当前【${prn}】所呈现的「${prk}」状态相呼应。`
    + `若顺应此能量流动，未来【${fn}】将带来「${fk}」的趋势。`
    + `三石提示你：${fa}`,
  tw: (pn, pk, prn, prk, fn, fk, fa) =>
    `【${pn}】在過去的位置揭示了「${pk}」的根源，`
    + `與當前【${prn}】所呈現的「${prk}」狀態相呼應。`
    + `若順應此能量流動，未來【${fn}】將帶來「${fk}」的趨勢。`
    + `三石提示你：${fa}`,
  en: (pn, pk, prn, prk, fn, fk, fa) =>
    `In the past position, ${pn} reveals the root of "${pk}", `
    + `which echoes the state of "${prk}" shown by ${prn} in the present. `
    + `If you flow with this energy, the future ${fn} will bring a trend toward "${fk}". `
    + `The three stones advise you: ${fa}`,
};

/**
 * 三石综合解读：解析为纯字符串后拼接。
 */
export function buildSynthesis(result: RuneReadingResult, lang: Lang = "zh"): string {
  const [past, present, future] = result.stones;
  if (!past || !present || !future) return "";

  const pastR = getActiveReading(past, lang);
  const presentR = getActiveReading(present, lang);
  const futureR = getActiveReading(future, lang);

  return SYNTHESIS_TEXT[lang](
    past.rune.chineseName, pastR.keywords[0] ?? "",
    present.rune.chineseName, presentR.keywords[0] ?? "",
    future.rune.chineseName, futureR.keywords[0] ?? "",
    futureR.advice,
  );
}

/**
 * 格式化占卜时间。
 * en → en-US 日期；zh/tw → 中文「年月日」。
 */
export function formatDrawTime(timestamp: number, lang: Lang = "zh"): string {
  const d = new Date(timestamp);
  if (lang === "en") {
    const datePart = d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const timePart = `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
    return `${datePart} ${timePart}`;
  }
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

// ===== SEO =====

const TDK_TEXT: Record<Lang, {
  spreadSingle: string;
  spreadThree: string;
  resultTitle: (name: string, orientation: string, spread: string) => string;
  resultDesc: (name: string, runeName: string, orientation: string, kw: string, meaning: string) => string;
  resultKeywords: (runeName: string, name: string, kw: string) => string;
  fallbackTitle: string;
  fallbackDesc: string;
  fallbackKeywords: string;
}> = {
  zh: {
    spreadSingle: "单石占卜",
    spreadThree: "三石占卜",
    resultTitle: (name, orientation, spread) => `${name} · ${orientation} — 卢恩符文${spread} | 命运密语`,
    resultDesc: (name, runeName, orientation, kw, meaning) =>
      `你抽到了【${name}（${runeName}）】${orientation}。${kw}。${meaning.slice(0, 60)}`,
    resultKeywords: (runeName, name, kw) =>
      `卢恩符文,${runeName},${name},${kw},北欧占卜,符文占卜`,
    fallbackTitle: "卢恩符文占卜 · RuneWhisper — 命运密语",
    fallbackDesc: "古老北欧符文占卜。单石·奥丁之眼，三石·诺伦三女神。倾听古老石头的低语，洞悉当下的抉择。",
    fallbackKeywords: "卢恩符文,Runes,北欧占卜,符文占卜,老弗萨克,奥丁,维京,神秘学",
  },
  tw: {
    spreadSingle: "單石占卜",
    spreadThree: "三石占卜",
    resultTitle: (name, orientation, spread) => `${name} · ${orientation} — 盧恩符文${spread} | 命運密語`,
    resultDesc: (name, runeName, orientation, kw, meaning) =>
      `你抽到了【${name}（${runeName}）】${orientation}。${kw}。${meaning.slice(0, 60)}`,
    resultKeywords: (runeName, name, kw) =>
      `盧恩符文,${runeName},${name},${kw},北歐占卜,符文占卜`,
    fallbackTitle: "盧恩符文占卜 · RuneWhisper — 命運密語",
    fallbackDesc: "古老北歐符文占卜。單石·奧丁之眼，三石·諾倫三女神。傾聽古老石頭的低語，洞悉當下的抉擇。",
    fallbackKeywords: "盧恩符文,Runes,北歐占卜,符文占卜,老弗薩克,奧丁,維京,神秘學",
  },
  en: {
    spreadSingle: "Single Rune",
    spreadThree: "Three Runes",
    resultTitle: (name, orientation, spread) => `${name} · ${orientation} — Rune ${spread} | Mystic Whispers`,
    resultDesc: (name, runeName, orientation, kw, meaning) =>
      `You drew ${name} (${runeName}), ${orientation}. ${kw}. ${meaning.slice(0, 80)}`,
    resultKeywords: (runeName, name, kw) =>
      `runes,${runeName},${name},${kw},Norse divination,rune reading`,
    fallbackTitle: "Rune Oracle · RuneWhisper — Mystic Whispers",
    fallbackDesc: "Ancient Norse rune divination. Single stone for Odin's Eye, three stones for the Norns. Listen to the whispers of ancient stones and see the choice before you.",
    fallbackKeywords: "runes,Runes,Norse divination,rune reading,Elder Futhark,Odin,Viking,mysticism",
  },
};

export function generateRuneTDK(result?: RuneReadingResult, lang: Lang = "zh") {
  const txt = TDK_TEXT[lang];
  if (result?.stones[0]) {
    const main = result.stones[0];
    const reading = getActiveReading(main, lang);
    const spreadName = result.spread === "single" ? txt.spreadSingle : txt.spreadThree;
    return {
      title: txt.resultTitle(main.rune.chineseName, reading.orientation, spreadName),
      description: txt.resultDesc(
        main.rune.chineseName,
        main.rune.name,
        reading.orientation,
        reading.keywords.join("·"),
        reading.meaning,
      ),
      keywords: txt.resultKeywords(main.rune.name, main.rune.chineseName, reading.keywords.join(",")),
    };
  }
  return {
    title: txt.fallbackTitle,
    description: txt.fallbackDesc,
    keywords: txt.fallbackKeywords,
  };
}

// ===== 颜色映射（元素 → 主题色） =====
// 注意：键现在按 lang 解析，需覆盖三语元素名。

export const ELEMENT_COLORS: Record<string, { primary: string; secondary: string }> = {
  // 火 / Fire
  火: { primary: "#E85D04", secondary: "#F48C06" },
  Fire: { primary: "#E85D04", secondary: "#F48C06" },
  // 土 / Earth
  土: { primary: "#6B5B45", secondary: "#A0896B" },
  Earth: { primary: "#6B5B45", secondary: "#A0896B" },
  // 风 / Air
  风: { primary: "#4A9ECA", secondary: "#7EC8E3" },
  風: { primary: "#4A9ECA", secondary: "#7EC8E3" },
  Air: { primary: "#4A9ECA", secondary: "#7EC8E3" },
  // 水 / Water
  水: { primary: "#1E6B9E", secondary: "#4A90D9" },
  Water: { primary: "#1E6B9E", secondary: "#4A90D9" },
  // 冰 / Ice
  冰: { primary: "#7EC8E3", secondary: "#B0E0F5" },
  Ice: { primary: "#7EC8E3", secondary: "#B0E0F5" },
  // 所有 / All
  所有: { primary: "#C9A84C", secondary: "#E8D5A3" },
  All: { primary: "#C9A84C", secondary: "#E8D5A3" },
};

export function getElementColor(element: string) {
  return ELEMENT_COLORS[element] ?? { primary: "#4A9ECA", secondary: "#7EC8E3" };
}
