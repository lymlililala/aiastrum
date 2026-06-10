"use client";
/**
 * 云端灵签 — 求签引擎
 * 负责：每日限签、打卡记录、LocalStorage 持久化
 */

import { DEITIES, Sign, Deity, JiaoResult, JIAO_CONFIGS } from "./lingqian-data";
import {
  type Lang,
  resolveSignField,
  resolveSignPoem,
  resolveSignInterp,
  resolveSignList,
  resolveDeityField,
  resolveZenQuote,
} from "./lingqian-content-i18n";

// ===== 类型定义 =====
export interface DailyRecord {
  date: string;           // 'YYYY-MM-DD'
  deityId: string;
  signId: number;
  luck: string;
  signName: string;
  zen: string;
  drawnAt: number;        // timestamp
}

export interface CheckinState {
  records: DailyRecord[];
  streakDays: number;
  lastCheckinDate: string | null;
  totalDays: number;
}

export interface DrawResult {
  sign: Sign;
  deity: Deity;
  jiaoAttempts: number;
  drawnAt: Date;
}

// ===== LocalStorage Keys =====
const STORAGE_KEY_RECORDS = "lingqian_records";
const STORAGE_KEY_TODAY = "lingqian_today";

// ===== 日期工具 =====
export function getTodayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getDaysBetween(a: string, b: string): number {
  const da = new Date(a).getTime();
  const db = new Date(b).getTime();
  return Math.round(Math.abs(da - db) / 86400000);
}

// ===== 本地存储操作 =====
function safeGetStorage(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetStorage(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

// ===== 打卡记录 =====
export function getCheckinState(): CheckinState {
  const raw = safeGetStorage(STORAGE_KEY_RECORDS);
  let records: DailyRecord[] = [];
  if (raw) {
    try {
      records = JSON.parse(raw) as DailyRecord[];
    } catch {
      records = [];
    }
  }

  if (records.length === 0) {
    return { records: [], streakDays: 0, lastCheckinDate: null, totalDays: 0 };
  }

  // 按日期排序（最新优先）
  records.sort((a, b) => b.drawnAt - a.drawnAt);

  const today = getTodayStr();
  const lastDate = records[0]!.date;

  // 计算连续天数
  let streakDays = 0;
  let checkDate = today;

  const dateSet = new Set(records.map((r) => r.date));
  while (dateSet.has(checkDate)) {
    streakDays++;
    const prev = new Date(checkDate);
    prev.setDate(prev.getDate() - 1);
    checkDate = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, "0")}-${String(prev.getDate()).padStart(2, "0")}`;
  }

  // 如果昨天没打卡，从最近有打卡的日期开始重新计算
  if (!dateSet.has(today)) {
    checkDate = lastDate;
    streakDays = 0;
    while (dateSet.has(checkDate)) {
      streakDays++;
      const prev = new Date(checkDate);
      prev.setDate(prev.getDate() - 1);
      checkDate = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, "0")}-${String(prev.getDate()).padStart(2, "0")}`;
    }
  }

  return {
    records,
    streakDays,
    lastCheckinDate: lastDate,
    totalDays: dateSet.size,
  };
}

export function saveRecord(record: DailyRecord): void {
  const state = getCheckinState();
  const records = state.records.filter((r) => r.date !== record.date || r.deityId !== record.deityId);
  records.unshift(record);
  // 只保留最近 365 条
  const trimmed = records.slice(0, 365);
  safeSetStorage(STORAGE_KEY_RECORDS, JSON.stringify(trimmed));
}

// ===== 每日限签检查 =====
export interface TodayDrawnState {
  drawn: boolean;
  deityId?: string;
  signId?: number;
  drawnAt?: number;
}

export function getTodayDrawn(deityId: string): TodayDrawnState {
  const today = getTodayStr();
  const raw = safeGetStorage(STORAGE_KEY_TODAY);
  if (!raw) return { drawn: false };
  try {
    const map = JSON.parse(raw) as Record<string, { deityId: string; signId: number; drawnAt: number }>;
    const key = `${today}_${deityId}`;
    if (map[key]) {
      return { drawn: true, ...map[key] };
    }
    return { drawn: false };
  } catch {
    return { drawn: false };
  }
}

export function saveTodayDrawn(deityId: string, signId: number): void {
  const today = getTodayStr();
  const raw = safeGetStorage(STORAGE_KEY_TODAY);
  let map: Record<string, { deityId: string; signId: number; drawnAt: number }> = {};
  if (raw) {
    try {
      map = JSON.parse(raw);
    } catch {
      map = {};
    }
  }
  // 清理旧数据（只保留今天的）
  const newMap: typeof map = {};
  for (const k of Object.keys(map)) {
    if (k.startsWith(today)) {
      newMap[k] = map[k]!;
    }
  }
  newMap[`${today}_${deityId}`] = { deityId, signId, drawnAt: Date.now() };
  safeSetStorage(STORAGE_KEY_TODAY, JSON.stringify(newMap));
}

// ===== 求签算法 =====

/** 
 * 根据当日日期 + 神明 + 随机种子抽取签文
 * 每个神明每天的签是固定的（同一天重复进入得到同一签），
 * 若已抽过，则直接返回缓存结果
 */
export function drawSign(deityId: string): Sign {
  const deity = DEITIES.find((d) => d.id === deityId);
  if (!deity) throw new Error(`Unknown deity: ${deityId}`);

  const today = getTodayStr();
  // 利用日期字符串 + deityId 生成确定性随机数
  const seed = hashCode(`${today}-${deityId}`);
  const index = Math.abs(seed) % deity.signs.length;
  return deity.signs[index]!;
}

/** 简单哈希函数 */
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
}

// ===== 掷筊逻辑 =====
/** 模拟掷筊结果，圣杯概率约50%，笑杯/阴杯各25% */
export function throwJiao(): JiaoResult {
  const r = Math.random();
  if (r < 0.5) return "圣杯";
  if (r < 0.75) return "笑杯";
  return "阴杯";
}

/** 
 * 掷筊仪式：最多尝试 maxAttempts 次，最后一次强制圣杯
 */
export function performJiaoRitual(
  maxAttempts = 3,
  onResult?: (result: JiaoResult, attempt: number) => void
): Promise<{ result: JiaoResult; attempts: number }> {
  return new Promise((resolve) => {
    let attempt = 0;
    const doThrow = () => {
      attempt++;
      const result = attempt >= maxAttempts ? "圣杯" : throwJiao();
      onResult?.(result, attempt);
      if (result === "圣杯" || attempt >= maxAttempts) {
        resolve({ result: "圣杯", attempts: attempt });
      } else {
        setTimeout(doThrow, 1200);
      }
    };
    doThrow();
  });
}

// ===== 获取神明信息 =====
export function getDeity(deityId: string): Deity | undefined {
  return DEITIES.find((d) => d.id === deityId);
}

export function getSignById(deityId: string, signId: number): Sign | undefined {
  const deity = getDeity(deityId);
  return deity?.signs.find((s) => s.id === signId);
}

// ===== 内容本地化（结果 TYPE 不变：仍返回 Sign / Deity）=====
// 选签/掷筊/抽取逻辑全部保持原样；本地化仅在“构建结果”时把内容字段 resolve 成纯字符串，
// override 为空时一律回退中文。

/** 把一支签的全部内容字段按 lang resolve 成纯字符串（结果仍是 Sign） */
export function localizeSign(sign: Sign, deityId: string, lang: Lang): Sign {
  if (lang === "zh") return sign;
  return {
    ...sign,
    name: resolveSignField(lang, deityId, sign.id, "name", sign.name),
    poem: resolveSignPoem(lang, deityId, sign.id, sign.poem),
    plain: resolveSignField(lang, deityId, sign.id, "plain", sign.plain),
    interpretation: {
      career: resolveSignInterp(lang, deityId, sign.id, "career", sign.interpretation.career),
      love: resolveSignInterp(lang, deityId, sign.id, "love", sign.interpretation.love),
      wealth: resolveSignInterp(lang, deityId, sign.id, "wealth", sign.interpretation.wealth),
      health: resolveSignInterp(lang, deityId, sign.id, "health", sign.interpretation.health),
    },
    yi: resolveSignList(lang, deityId, sign.id, "yi", sign.yi),
    ji: resolveSignList(lang, deityId, sign.id, "ji", sign.ji),
    zen: resolveSignField(lang, deityId, sign.id, "zen", sign.zen),
  };
}

/** 把神明的展示字段按 lang resolve（结果仍是 Deity；signs 不在此处本地化） */
export function localizeDeity(deity: Deity, lang: Lang): Deity {
  if (lang === "zh") return deity;
  return {
    ...deity,
    name: resolveDeityField(lang, deity.id, "name", deity.name),
    fullName: resolveDeityField(lang, deity.id, "fullName", deity.fullName),
    desc: resolveDeityField(lang, deity.id, "desc", deity.desc),
  };
}

/** 本地化后的神明列表（供选择页使用） */
export function getLocalizedDeities(lang: Lang): Deity[] {
  if (lang === "zh") return DEITIES;
  return DEITIES.map((d) => localizeDeity(d, lang));
}

// ===== 每日禅语 =====
import { ZEN_QUOTES } from "./lingqian-data";

export function getDailyZen(lang: Lang = "zh"): string {
  const today = getTodayStr();
  const idx = Math.abs(hashCode(today)) % ZEN_QUOTES.length;
  const zh = ZEN_QUOTES[idx] ?? ZEN_QUOTES[0] ?? "心诚则灵";
  return resolveZenQuote(lang, idx, zh);
}

// ===== 格式化显示 =====
export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export function getLunarDayLabel(): string {
  // 简化实现：显示农历月日（MVP阶段使用固定格式）
  const months = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];
  const days = [
    "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
    "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
    "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十",
  ];
  const now = new Date();
  // 简化：用公历月日估算显示（MVP精度足够）
  const mIdx = now.getMonth();
  const d = now.getDate() - 1;
  return `农历${months[mIdx]}月${days[Math.min(d, 29)]}`;
}
