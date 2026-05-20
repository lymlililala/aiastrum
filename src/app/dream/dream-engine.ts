/**
 * 周公解梦 - 解梦引擎
 * 关键词提取与多级匹配算法
 */

import { DREAM_DATABASE, type DreamEntry, type DreamLevel } from "./dream-data";

export interface DreamQueryResult {
  query: string;               // 用户原始输入
  keywords: string[];          // 提取到的关键词
  matched: DreamEntry[];       // 匹配到的解梦条目
  primaryEntry: DreamEntry;    // 主要解梦条目
  level: DreamLevel;           // 综合吉凶等级
  levelScore: number;          // 吉凶分数（用于AI）
  summary: string;             // 简短摘要
}

// 吉凶权重
const LEVEL_WEIGHT: Record<DreamLevel, number> = {
  大吉: 90,
  吉: 70,
  平: 50,
  凶: 25,
  大凶: 10,
};

/**
 * 从用户输入中提取关键词
 */
function extractKeywords(input: string): string[] {
  const cleaned = input.trim();
  const keywords: string[] = [];

  // 先把整句加入候选
  keywords.push(cleaned);

  // 对所有数据库关键词做包含检测
  for (const entry of DREAM_DATABASE) {
    for (const kw of entry.keywords) {
      if (cleaned.includes(kw) && !keywords.includes(kw)) {
        keywords.push(kw);
      }
    }
  }

  // 若没提取到数据库关键词，取输入前4个字作为关键词
  if (keywords.length === 1) {
    keywords.push(cleaned.slice(0, 4));
  }

  return keywords;
}

/**
 * 根据关键词匹配解梦条目（多级匹配，有优先级）
 */
function matchEntries(keywords: string[]): DreamEntry[] {
  const matched: DreamEntry[] = [];
  const usedIds = new Set<string>();

  // 第一轮：精确匹配（数据库关键词完全命中）
  for (const kw of keywords) {
    for (const entry of DREAM_DATABASE) {
      const id = entry.title;
      if (usedIds.has(id)) continue;
      if (entry.keywords.some((k) => k === kw || kw.includes(k) || k.includes(kw))) {
        matched.push(entry);
        usedIds.add(id);
        break;
      }
    }
  }

  // 第二轮：模糊匹配（整个输入包含条目关键词）
  if (matched.length < 2) {
    const query = keywords[0] ?? "";
    for (const entry of DREAM_DATABASE) {
      const id = entry.title;
      if (usedIds.has(id)) continue;
      if (entry.keywords.some((k) => query.includes(k))) {
        matched.push(entry);
        usedIds.add(id);
        if (matched.length >= 3) break;
      }
    }
  }

  return matched;
}

/**
 * 根据匹配条目计算综合吉凶等级
 */
function calcOverallLevel(entries: DreamEntry[]): DreamLevel {
  if (entries.length === 0) return "平";

  const scores = entries.map((e) => LEVEL_WEIGHT[e.level]);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

  if (avg >= 85) return "大吉";
  if (avg >= 65) return "吉";
  if (avg >= 40) return "平";
  if (avg >= 18) return "凶";
  return "大凶";
}

/**
 * 生成未匹配时的默认条目
 */
function buildDefaultEntry(query: string): DreamEntry {
  return {
    keywords: [query],
    title: `梦见${query.slice(0, 8)}`,
    level: "平",
    omen: `关于"${query}"，传统周公解梦认为此类梦境主人生将面临新的变化与考验。梦境本身是内心世界的投射，建议以平和心态看待近期发生的事情，凡事尽人事、听天命，保持稳健的心态可以化解一切不安。`,
    advice: "宜：以开放、平和的心态面对变化，踏实做好当下之事。忌：过度焦虑，因梦境影响现实判断。",
    psychologyHint: "此梦境属于个人化的潜意识表达，建议结合当前生活状态进行分析，关注内心真实的情感需求。",
  };
}

/**
 * 主解梦函数
 */
export function interpretDream(input: string): DreamQueryResult {
  const query = input.trim();
  const keywords = extractKeywords(query);
  const matched = matchEntries(keywords);

  // 如果没有匹配，生成默认条目
  const primaryEntry = matched[0] ?? buildDefaultEntry(query);
  const allEntries = matched.length > 0 ? matched : [primaryEntry];

  const level = calcOverallLevel(allEntries);
  const levelScore = LEVEL_WEIGHT[level];

  // 提取有效关键词（排除原始长输入）
  const effectiveKeywords = keywords.filter((k) => k !== query && k.length <= 6);

  return {
    query,
    keywords: effectiveKeywords.length > 0 ? effectiveKeywords : [query.slice(0, 6)],
    matched: allEntries,
    primaryEntry,
    level,
    levelScore,
    summary: primaryEntry.omen.slice(0, 40) + "...",
  };
}

/**
 * 搜索关键词建议（输入时的联想）
 */
export function suggestKeywords(input: string): string[] {
  if (!input || input.length < 1) return [];

  const suggestions: string[] = [];
  for (const entry of DREAM_DATABASE) {
    for (const kw of entry.keywords) {
      if (kw.includes(input) && !suggestions.includes(kw)) {
        suggestions.push(kw);
        if (suggestions.length >= 5) return suggestions;
      }
    }
  }
  return suggestions;
}
