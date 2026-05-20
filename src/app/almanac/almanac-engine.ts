/**
 * 老黄历计算引擎
 * 实现公历/农历转换、干支推算、宜忌生成、时辰吉凶等核心逻辑
 */

import {
  TIAN_GAN, DI_ZHI, SHENG_XIAO, SHENGXIAO_ZHI, CHONG_PAIRS,
  SANHE_GROUPS, LIUHE_PAIRS, SOLAR_TERMS, JIAN_CHU_12, HUANGDAO_JI,
  JIANSHEN_YIJI, PENGZU_TIANGAN, PENGZU_DIZHI, CAISHEN_DIRECTION,
  XISHEN_DIRECTION, LUNAR_FESTIVALS, HOUR_PERIODS, SCORE_WEIGHTS,
  ALMANAC_EVENTS,
  type ShengXiao,
} from "./almanac-data";

// ===== 类型定义 =====
export interface LunarDate {
  year: number;
  month: number;
  day: number;
  isLeapMonth: boolean;
  monthName: string;  // 如"四月"
  dayName: string;    // 如"初三"
}

export interface DayInfo {
  // 公历
  solar: { year: number; month: number; day: number; weekDay: number };
  // 农历
  lunar: LunarDate;
  // 干支
  yearGan: string; yearZhi: string;
  monthGan: string; monthZhi: string;
  dayGan: string; dayZhi: string;
  // 建除
  jianShen: string;
  isHuangDao: boolean;  // 是否黄道吉日
  // 宜忌
  yi: string[];  // 宜事项
  ji: string[];  // 忌事项
  // 冲煞
  chongZhi: string;        // 冲的地支
  chongAnimal: ShengXiao;  // 冲的生肖
  shaDirection: string;    // 煞方
  // 神位
  caishenDir: string;
  xishenDir: string;
  fushenDir: string;
  // 彭祖百忌
  pengzuTiangan: string;
  pengzuDizhi: string;
  // 节气节日
  solarTerm?: string;
  festival?: string;
  // 评分（0-5）
  score: number;
  // 时辰吉凶
  hours: HourInfo[];
}

export interface HourInfo {
  period: typeof HOUR_PERIODS[number];
  luck: "吉" | "凶" | "平";
  color: string;
  desc: string;
}

export interface AlmanacSearchParams {
  event: string;              // 事项 key
  startDate: Date;
  endDate: Date;
  userShengxiao?: ShengXiao;
  partnerShengxiao?: ShengXiao;
  weekendOnly?: boolean;
  requiredYi?: string[];
}

// ===== 农历数据（简化版 - 1900-2100）=====
// 使用经典的寿星万年历算法（简化版）
// 每个月的天数：1=大月(30天) 0=小月(29天)，最高位为闰月月份
const LUNAR_INFO = [
  0x04AE53, 0x0A5748, 0x5526BD, 0x0D2650, 0x0D9544, 0x46AAB9, 0x056A4D,
  0x09AD42, 0x24AEB6, 0x04AE4A, 0x6A4DBE, 0x0A4D52, 0x0D2546, 0x5D52BA,
  0x0B544E, 0x0D6A43, 0x296D37, 0x095B4B, 0x749BC1, 0x049754, 0x0A4B48,
  0x5B25BC, 0x06A550, 0x06D445, 0x4ADAB8, 0x02B64D, 0x095742, 0x2497B7,
  0x04974A, 0x664B3E,
]; // 精简示意，完整数据更长

// ===== 核心推算函数 =====

/** 由年份推算天干 */
function getYearGan(year: number): string {
  return TIAN_GAN[((year - 4) % 10 + 10) % 10]!;
}

/** 由年份推算地支 */
function getYearZhi(year: number): string {
  return DI_ZHI[((year - 4) % 12 + 12) % 12]!;
}

/** 由年份推算生肖 */
export function getYearShengxiao(year: number): ShengXiao {
  return SHENG_XIAO[((year - 4) % 12 + 12) % 12]!;
}

/** 由出生年份推算生肖 */
export function getBirthShengxiao(birthYear: number): ShengXiao {
  return getYearShengxiao(birthYear);
}

/** 推算月柱天干 */
function getMonthGan(year: number, month: number): string {
  // 以寅月(1月)为月柱起点
  const ganBase = ((year - 4) % 5 + 5) % 5;
  const ganIdx = (ganBase * 2 + month + 1) % 10;
  return TIAN_GAN[ganIdx]!;
}

/** 推算月柱地支 */
function getMonthZhi(month: number): string {
  // 1月->寅(2), 2月->卯(3), ..., 12月->丑(1)
  return DI_ZHI[(month + 1) % 12]!;
}

/** 推算日柱（简化算法，基于儒略日数）*/
function getDayGanzhi(year: number, month: number, day: number): { gan: string; zhi: string; ganIdx: number; zhiIdx: number } {
  // 计算从1900-1-1到指定日期的天数（甲子日开始）
  const baseDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  const diffDays = Math.floor((targetDate.getTime() - baseDate.getTime()) / 86400000);
  // 1900-1-1 为甲戌日：甲(0) 戌(10)
  const ganIdx = ((diffDays + 0) % 10 + 10) % 10;
  const zhiIdx = ((diffDays + 10) % 12 + 12) % 12;
  return { gan: TIAN_GAN[ganIdx]!, zhi: DI_ZHI[zhiIdx]!, ganIdx, zhiIdx };
}

/** 推算建除十二神（基于月支和日支）*/
function getJianShen(monthZhi: string, dayZhi: string): string {
  const monthIdx = DI_ZHI.indexOf(monthZhi as typeof DI_ZHI[number]);
  const dayIdx   = DI_ZHI.indexOf(dayZhi   as typeof DI_ZHI[number]);
  const diff = ((dayIdx - monthIdx) % 12 + 12) % 12;
  return JIAN_CHU_12[diff]!;
}

/** 获取冲的地支和生肖 */
function getChong(dayZhi: string): { zhi: string; animal: ShengXiao; direction: string } {
  const zhiIdx = DI_ZHI.indexOf(dayZhi as typeof DI_ZHI[number]);
  const chongIdx = (zhiIdx + 6) % 12;
  const chongZhi = DI_ZHI[chongIdx]!;
  const animal = SHENG_XIAO[chongIdx]!;
  const directions = ["北", "东北", "东", "东南", "南", "西南", "西", "西北", "北", "西北", "西", "东北"];
  return { zhi: chongZhi, animal, direction: directions[chongIdx]! };
}

/** 简化农历转换（基于近似算法）*/
function solarToLunar(year: number, month: number, day: number): LunarDate {
  // 简化算法：使用修正值近似计算农历
  // 生产环境建议使用完整的农历算法库
  const solarDate = new Date(year, month - 1, day);
  const baseDate  = new Date(1900, 0, 31); // 1900-1-31 为农历正月初一
  let diffDays = Math.floor((solarDate.getTime() - baseDate.getTime()) / 86400000);

  // 农历月份天数（简化处理）
  const lunarMonthDays = [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30];
  let lunarYear = 1900;
  let lunarMonth = 1;
  let lunarDay = 0;
  let isLeap = false;

  // 简化推算
  const yearLength = 365.25;
  const lunarYearStart = 1900;
  lunarYear = year;
  
  // 基于固定偏差计算农历日期（简化版）
  const solarInYear = (month - 1) * 30 + day;
  const lunarOffset = getApproxLunarOffset(year);
  
  let lunarDayInYear = solarInYear - lunarOffset;
  if (lunarDayInYear <= 0) {
    lunarYear = year - 1;
    lunarDayInYear += 354;
  }

  lunarMonth = Math.ceil(lunarDayInYear / 29.5);
  lunarDay   = lunarDayInYear - Math.floor((lunarMonth - 1) * 29.5);
  lunarMonth = Math.max(1, Math.min(12, lunarMonth));
  lunarDay   = Math.max(1, Math.min(30, lunarDay));

  const LUNAR_MONTH_NAMES = ["", "正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "腊月"];
  const LUNAR_DAY_NAMES = [
    "", "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
    "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
    "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十",
  ];

  return {
    year: lunarYear,
    month: lunarMonth,
    day: lunarDay,
    isLeapMonth: false,
    monthName: LUNAR_MONTH_NAMES[lunarMonth] ?? `${lunarMonth}月`,
    dayName: LUNAR_DAY_NAMES[lunarDay]    ?? `${lunarDay}`,
  };
}

/** 获取近似农历偏移量（每年春节约在1月20日至2月20日之间）*/
function getApproxLunarOffset(year: number): number {
  // 春节约在公历的第几天
  const base = 22 + Math.floor(((year - 1900) * 0.2422 + 0.4) % 1 * 29);
  return Math.max(10, Math.min(50, base));
}

/** 获取节气名称 */
function getSolarTerm(month: number, day: number): string | undefined {
  const term = SOLAR_TERMS.find(t => t.month === month && Math.abs(t.day - day) <= 1);
  return term?.name;
}

/** 获取农历节日 */
function getLunarFestival(lunarMonth: number, lunarDay: number): string | undefined {
  const festival = LUNAR_FESTIVALS.find(f => f.lunarMonth === lunarMonth && f.lunarDay === lunarDay);
  return festival?.name;
}

/** 生成时辰吉凶（基于日支逐时冲克）*/
function generateHourInfos(dayZhiIdx: number): HourInfo[] {
  return HOUR_PERIODS.map((period, i) => {
    // 日支与时支关系：相冲为凶，三合六合为吉，其他为平
    const hourZhiIdx = DI_ZHI.indexOf(period.zhi as typeof DI_ZHI[number]);
    const diff = (hourZhiIdx - dayZhiIdx + 12) % 12;

    let luck: "吉" | "凶" | "平";
    let color: string;
    let desc: string;

    if (diff === 6) {
      // 相冲
      luck = "凶"; color = "#888";
      desc = `${period.name}与日支相冲，不宜启行、出门或动土`;
    } else if (diff === 0) {
      // 相同（旺）
      luck = "吉"; color = "#C0392B";
      desc = `${period.name}日支得令，精力旺盛，宜办重要事项`;
    } else if ([4, 8].includes(diff)) {
      // 三合
      luck = "吉"; color = "#E74C3C";
      desc = `${period.name}三合得助，办事顺遂，财运亨通`;
    } else if ([1, 11].includes(diff)) {
      // 六合
      luck = "吉"; color = "#E67E22";
      desc = `${period.name}六合相配，人和事顺，宜社交会谈`;
    } else if ([3, 9].includes(diff)) {
      // 刑
      luck = "凶"; color = "#7F8C8D";
      desc = `${period.name}遇刑，需谨慎言行，避免争执`;
    } else {
      luck = "平"; color = "#BDC3C7";
      desc = `${period.name}平常时辰，日常事务均可进行`;
    }

    return { period, luck, color, desc };
  });
}

/** 计算综合评分 */
function calcScore(
  isHuangDao: boolean,
  yi: string[],
  ji: string[],
  isFestival: boolean
): number {
  let score = 3.0; // 基础分
  if (isHuangDao) score += SCORE_WEIGHTS.huangdao;
  else score += SCORE_WEIGHTS.heidao;
  score += yi.length * SCORE_WEIGHTS.yiCount;
  score -= ji.length * SCORE_WEIGHTS.jiCount;
  if (isFestival) score += SCORE_WEIGHTS.festival;
  return Math.max(1, Math.min(5, Math.round(score * 10) / 10));
}

// ===== 主函数：获取某天的完整黄历信息 =====
export function getDayInfo(year: number, month: number, day: number): DayInfo {
  const date = new Date(year, month - 1, day);
  const weekDay = date.getDay();

  // 干支
  const yearGan  = getYearGan(year);
  const yearZhi  = getYearZhi(year);
  const monthGan = getMonthGan(year, month);
  const monthZhi = getMonthZhi(month);
  const { gan: dayGan, zhi: dayZhi, ganIdx: dayGanIdx, zhiIdx: dayZhiIdx } = getDayGanzhi(year, month, day);

  // 建除十二神
  const jianShen  = getJianShen(monthZhi, dayZhi);
  const isHuangDao = HUANGDAO_JI.has(jianShen);

  // 宜忌
  const baseYiJi = JIANSHEN_YIJI[jianShen] ?? { yi: [], ji: [] };
  
  // 基于彭祖百忌额外加入禁忌
  const extraJi: string[] = [];
  const penGanText = PENGZU_TIANGAN[dayGan] ?? "";
  const penZhiText = PENGZU_DIZHI[dayZhi] ?? "";
  // 从彭祖百忌文字里提取事项关键词
  if (penGanText.includes("开仓")) extraJi.push("纳财");
  if (penGanText.includes("修灶") || penZhiText.includes("修灶")) extraJi.push("作灶");
  if (penGanText.includes("嫁娶") || penZhiText.includes("嫁娶")) extraJi.push("嫁娶");
  if (penGanText.includes("词讼") || penZhiText.includes("词讼")) extraJi.push("词讼");

  const yi = [...new Set(baseYiJi.yi)];
  const ji = [...new Set([...baseYiJi.ji, ...extraJi])];

  // 冲煞
  const { zhi: chongZhi, animal: chongAnimal, direction: shaDirection } = getChong(dayZhi);

  // 农历
  const lunar = solarToLunar(year, month, day);

  // 节气节日
  const solarTerm = getSolarTerm(month, day);
  const festival  = getLunarFestival(lunar.month, lunar.day);

  // 方位
  const caishenDir = CAISHEN_DIRECTION[dayZhi] ?? "正南";
  const xishenDir  = XISHEN_DIRECTION[dayZhi]  ?? "东南";
  const fushenDir  = CAISHEN_DIRECTION[monthZhi] ?? "正北";

  // 彭祖百忌
  const pengzuTiangan = PENGZU_TIANGAN[dayGan] ?? "";
  const pengzuDizhi   = PENGZU_DIZHI[dayZhi]   ?? "";

  // 时辰吉凶
  const hours = generateHourInfos(dayZhiIdx);

  // 评分
  const score = calcScore(isHuangDao, yi, ji, !!(solarTerm || festival));

  return {
    solar: { year, month, day, weekDay },
    lunar,
    yearGan, yearZhi, monthGan, monthZhi, dayGan, dayZhi,
    jianShen, isHuangDao,
    yi, ji,
    chongZhi, chongAnimal, shaDirection,
    caishenDir, xishenDir, fushenDir,
    pengzuTiangan, pengzuDizhi,
    solarTerm, festival,
    score,
    hours,
  };
}

// ===== 择日筛选 =====
export interface LuckyDay extends DayInfo {
  matchReason: string[];     // 匹配理由
  shengxiaoTip?: string;     // 生肖相关提示
  overallScore: number;      // 综合评分（含生肖加成）
}

export function findLuckyDays(params: AlmanacSearchParams): LuckyDay[] {
  const results: LuckyDay[] = [];

  const current = new Date(params.startDate);
  const end     = new Date(params.endDate);

  // 获取事项的宜忌要求
  const { SELECT_EVENTS } = require("./almanac-data") as typeof import("./almanac-data");
  const selectEvent = SELECT_EVENTS.find(e => e.key === params.event);

  while (current <= end) {
    const y = current.getFullYear();
    const m = current.getMonth() + 1;
    const d = current.getDate();
    const wDay = current.getDay();

    // 周末过滤
    if (params.weekendOnly && wDay !== 0 && wDay !== 6) {
      current.setDate(current.getDate() + 1);
      continue;
    }

    const info = getDayInfo(y, m, d);

    // 检查事项匹配
    const matchReason: string[] = [];
    let qualified = true;

    if (selectEvent) {
      // 必须包含某个宜项
      const hasRequiredYi = selectEvent.requiredYi.some(req => info.yi.includes(req));
      if (!hasRequiredYi) {
        current.setDate(current.getDate() + 1);
        continue;
      }

      // 不能包含对应忌项
      const hasAvoidJi = selectEvent.avoidJi.some(av => info.ji.includes(av));
      if (hasAvoidJi) {
        current.setDate(current.getDate() + 1);
        continue;
      }

      matchReason.push(`宜${selectEvent.requiredYi.filter(r => info.yi.includes(r)).join("、")}`);
    }

    // 生肖避冲
    let shengxiaoTip = "";
    let shengxiaoBonus = 0;

    if (params.userShengxiao) {
      // 检查用户生肖是否与日干相冲
      const userZhiIdx = SHENGXIAO_ZHI[params.userShengxiao];
      const chongIdx   = DI_ZHI.indexOf(info.chongZhi as typeof DI_ZHI[number]);
      if (chongIdx === userZhiIdx) {
        // 相冲，跳过
        current.setDate(current.getDate() + 1);
        continue;
      }

      // 检查三合、六合加分
      const sanheGroup = SANHE_GROUPS.find(g => g.includes(params.userShengxiao!));
      const dayAnimalZhiIdx = DI_ZHI.indexOf(info.dayZhi as typeof DI_ZHI[number]);
      const dayAnimal = SHENG_XIAO[dayAnimalZhiIdx]!;

      if (sanheGroup?.includes(dayAnimal)) {
        shengxiaoBonus += SCORE_WEIGHTS.sanhe;
        shengxiaoTip = `此日与您的生肖（${params.userShengxiao}）三合，大吉大利！`;
        matchReason.push(`三合${params.userShengxiao}命`);
      } else if (LIUHE_PAIRS[params.userShengxiao] === dayAnimal) {
        shengxiaoBonus += SCORE_WEIGHTS.liuhe;
        shengxiaoTip = `此日与您的生肖（${params.userShengxiao}）六合，和谐顺遂。`;
        matchReason.push(`六合${params.userShengxiao}命`);
      }
    }

    // 伴侣生肖避冲
    if (params.partnerShengxiao) {
      const partnerZhiIdx = SHENGXIAO_ZHI[params.partnerShengxiao];
      const chongIdx = DI_ZHI.indexOf(info.chongZhi as typeof DI_ZHI[number]);
      if (chongIdx === partnerZhiIdx) {
        current.setDate(current.getDate() + 1);
        continue;
      }
    }

    // 黄道加成
    if (info.isHuangDao) matchReason.push("黄道吉日");

    // 传统节日加成
    if (info.festival) matchReason.push(info.festival);
    if (info.solarTerm) matchReason.push(info.solarTerm);

    const overallScore = Math.min(5, info.score + shengxiaoBonus);

    results.push({ ...info, matchReason, shengxiaoTip, overallScore });
    current.setDate(current.getDate() + 1);
  }

  // 按综合评分降序
  results.sort((a, b) => b.overallScore - a.overallScore);
  return results.slice(0, 30); // 最多返回30个
}

// ===== 获取指定月份的日历视图 =====
export interface CalendarDay {
  year: number; month: number; day: number;
  weekDay: number;
  lunarDay: string;
  isToday: boolean;
  score: number;
  isHuangDao: boolean;
  solarTerm?: string;
  festival?: string;
}

export function getMonthCalendar(year: number, month: number): CalendarDay[] {
  const days: CalendarDay[] = [];
  const today = new Date();
  const daysInMonth = new Date(year, month, 0).getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const info = getDayInfo(year, month, d);
    const isToday = today.getFullYear() === year && today.getMonth() + 1 === month && today.getDate() === d;

    days.push({
      year, month, day: d,
      weekDay: info.solar.weekDay,
      lunarDay: info.lunar.dayName,
      isToday,
      score: info.score,
      isHuangDao: info.isHuangDao,
      solarTerm: info.solarTerm,
      festival: info.festival ?? info.lunar.dayName,
    });
  }
  return days;
}
