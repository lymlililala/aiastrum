// ===== 奇门遁甲 · 排盘引擎 =====
// 实现：真太阳时校正、节气判断、超神接气、九宫布局、格局检测

import {
  JIAZI_60, TIAN_GAN, DI_ZHI,
  BA_MEN as _BA_MEN, JIU_XING as _JIU_XING, BA_SHEN_8 as _BA_SHEN_8,
  MEN_BASE_GONG as _MEN_BASE_GONG, XING_BASE_GONG as _XING_BASE_GONG,
  SHEN_BASE_ORDER_YANG,
  LIU_YI_SAN_QI as _LIU_YI_SAN_QI, GAN_WUXING as _GAN_WUXING,
  JIEQI_JU_MAP, XUN_KONG, XUN_SHOU as _XUN_SHOU, MA_XING,
  NINE_GONG, GONG_FANGWEI,
  MAJOR_CITIES, MEN_JIXIONG, XING_JIXIONG, SHEN_JIXIONG,
  MEN_WUXING as MEN_WUXING_MAP,
  BUSINESS_TIPS, GAN_JIALING_GEJU as _GAN_JIALING_GEJU,
  WUXING_KE, WUXING_SHENG as _WUXING_SHENG,
  SPECIAL_GEJU as _SPECIAL_GEJU,
  rsL, gateName, godName, gongName as gongDisplayName, fangweiName, wuxingName,
  type Lang, type L,
  type YinYang, type PanType, type JuType, type QimenEvent,
  type BaMen, type JiuXing, type BaShen, type TianGan,
} from "./qimen-data";

// 重新导出供外部组件使用
export type { QimenEvent, PanType, JuType, YinYang, Lang } from "./qimen-data";

// ===== 输入参数 =====
export interface QimenInput {
  year: number;
  month: number;    // 1-12
  day: number;
  hour: number;     // 0-23
  minute: number;   // 0-59
  city: string;     // 城市名
  lng?: number;     // 经度（可选，若提供则直接使用）
  lat?: number;
  panType: PanType;
  juType: JuType;
  event: QimenEvent;
}

// ===== 宫位数据 =====
export interface GongData {
  gongNum: number;      // 宫位序号 1-9
  gongName: string;     // 宫名
  bagua: string;        // 八卦
  wuxing: string;       // 五行
  fangwei: string;      // 方位
  tiDiTianGan: TianGan; // 地盘天干（六仪三奇）
  tianTianGan: TianGan; // 天盘天干
  men: BaMen | null;    // 八门（中宫无门）
  xing: JiuXing;        // 九星
  shen: BaShen;         // 八神
  isKong: boolean;      // 是否旬空
  isMa: boolean;        // 是否马星
  geju: string[];       // 宫内特殊格局
}

// ===== 完整排盘结果 =====
export interface QimenChart {
  input: QimenInput;
  // 基础信息
  solarTime: string;        // 真太阳时（字符串描述）
  lunarStr: string;         // 农历描述
  ganZhiYear: string;       // 干支年
  ganZhiMonth: string;      // 干支月
  ganZhiDay: string;        // 干支日
  ganZhiHour: string;       // 干支时
  jieQiName: string;        // 所处节气
  yinyangJu: string;        // 阳遁X局
  juNumber: number;         // 局数
  xunKong: [string, string];// 旬空
  maXing: string;           // 马星
  // 九宫
  gongs: GongData[];        // 9个宫位数据（index 0=宫1, ..., 8=宫9）
  // 格局分析
  globalGeju: Array<{ name: string; type: string; desc: string; gongNums: number[] }>;
  businessAnalysis: string[];
  travelAnalysis: string[];
}

// ===== 真太阳时校正 =====
export function calcTrueSolarTime(
  date: Date,
  lngDeg: number
): Date {
  // 1. 经度差引起的时差（每度4分钟）
  const stdLng = 120; // 北京时间标准经度
  const lngDiff = (lngDeg - stdLng) * 4; // 分钟

  // 2. 均时差（Equation of Time，精简版）
  const dayOfYear = getDayOfYear(date);
  const B = (2 * Math.PI * (dayOfYear - 1)) / 365;
  const eot =
    -7.655 * Math.sin(B) +
    9.873 * Math.sin(2 * B + 3.588) +
    0.439 * Math.sin(4 * B + 0.072); // 分钟

  const totalOffset = lngDiff + eot; // 分钟
  return new Date(date.getTime() + totalOffset * 60 * 1000);
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// ===== 获取城市经纬度 =====
export function getCityCoord(cityName: string): { lng: number; lat: number } {
  const city = MAJOR_CITIES.find(
    (c) => c.name === cityName || cityName.includes(c.name)
  );
  return city ? { lng: city.lng, lat: city.lat } : { lng: 116.4, lat: 39.9 }; // 默认北京
}

// ===== 干支历换算 =====
// 年柱（以立春为界）
function calcGanZhiYear(year: number, month: number, day: number): string {
  // 简化：以2月4日（大约立春）为界
  let y = year - 4;
  if (month < 2 || (month === 2 && day < 4)) y--;
  const ganIdx = ((y % 10) + 10) % 10;
  const zhiIdx = ((y % 12) + 12) % 12;
  return (TIAN_GAN[ganIdx] ?? "甲") + (DI_ZHI[zhiIdx] ?? "子");
}

// 月柱
function calcGanZhiMonth(year: number, month: number, day: number): string {
  // 月支：寅月=1月（约2月），每月固定
  // 简化月支对应（以节气交接时刻精确计算需要历法库，MVP用近似值）
  const zhiMap = ["寅","卯","辰","巳","午","未","申","酉","戌","亥","子","丑"];
  // 月支从寅月（2月）开始
  const mzhi = zhiMap[(month - 2 + 12) % 12] ?? "寅";
  // 月干：年干起月干公式
  const yearGanIdx = TIAN_GAN.indexOf(calcGanZhiYear(year, month, day)[0] as TianGan);
  // 甲己年从丙寅起，乙庚从戊寅起，丙辛从庚寅起，丁壬从壬寅起，戊癸从甲寅起
  const monthGanStart = [2, 4, 6, 8, 0][yearGanIdx % 5] ?? 2; // 对应天干起始索引
  const monthZhiIdx = ((month - 2) + 12) % 12;
  const mgan = TIAN_GAN[(monthGanStart + monthZhiIdx) % 10] ?? "甲";
  return mgan + mzhi;
}

// 日柱（简化算法）
function calcGanZhiDay(year: number, month: number, day: number): string {
  // 基于儒略日计算
  const a = Math.floor((14 - month) / 12);
  const y = year - a;
  const m = month + 12 * a - 2;
  const jd = day + Math.floor((153 * m + 2) / 5) + 365 * y +
    Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  const ganIdx = ((jd - 11) % 10 + 10) % 10;
  const zhiIdx = ((jd - 11) % 12 + 12) % 12;
  return (TIAN_GAN[ganIdx] ?? "甲") + (DI_ZHI[zhiIdx] ?? "子");
}

// 时柱
function calcGanZhiHour(dayGanZhi: string, hour: number): string {
  // 时支：23-1子，1-3丑，...
  const zhiIdx = Math.floor((hour + 1) / 2) % 12;
  const hzhi = DI_ZHI[zhiIdx] ?? "子";
  // 时干：日干起时干公式（子时起）
  const dayGanIdx = TIAN_GAN.indexOf(dayGanZhi[0] as TianGan);
  const hourGanStart = [0, 2, 4, 6, 8][dayGanIdx % 5] ?? 0;
  const hgan = TIAN_GAN[(hourGanStart + zhiIdx) % 10] ?? "甲";
  return hgan + hzhi;
}

// ===== 旬首与旬空 =====
function getXunShou(ganZhi: string): string {
  const idx = JIAZI_60.indexOf(ganZhi);
  if (idx === -1) return "甲子";
  const xunStart = Math.floor(idx / 10) * 10;
  return JIAZI_60[xunStart] ?? "甲子";
}

function getXunKong(riGanZhi: string): [string, string] {
  const xun = getXunShou(riGanZhi);
  return XUN_KONG[xun] ?? ["戌", "亥"];
}

// ===== 节气与局数判断 =====
// 根据公历月日，粗略判断最近节气和局数
// MVP使用近似算法（精确节气需要天文历法库）
function getApproxJieQi(month: number, day: number): string {
  // 各月节气大约日期（上旬节，下旬中气）
  const jieqiByMonth: Record<number, [string, string]> = {
    1:  ["小寒", "大寒"],
    2:  ["立春", "雨水"],
    3:  ["惊蛰", "春分"],
    4:  ["清明", "谷雨"],
    5:  ["立夏", "小满"],
    6:  ["芒种", "夏至"],
    7:  ["小暑", "大暑"],
    8:  ["立秋", "处暑"],
    9:  ["白露", "秋分"],
    10: ["寒露", "霜降"],
    11: ["立冬", "小雪"],
    12: ["大雪", "冬至"],
  };
  const pair = jieqiByMonth[month] ?? ["冬至", "小寒"];
  // 上旬约5-8日节交，下旬约20-23日中气
  return day < 21 ? pair[0] : pair[1];
}

function getJuFromJieQi(jieqiName: string, shiZhi: string): { yinyangJu: YinYang; juNumber: number } {
  const entry = JIEQI_JU_MAP.find(([name]) => name === jieqiName);
  if (!entry) return { yinyangJu: "yang", juNumber: 1 };
  const [, yy, shang, zhong, xia] = entry;
  // 根据时支判断上中下元
  // 子午卯酉→上元，寅申巳亥→中元，辰戌丑未→下元（简化）
  const shangZhi = ["子", "午", "卯", "酉"];
  const zhongZhi = ["寅", "申", "巳", "亥"];
  let juNum: number;
  if (shangZhi.includes(shiZhi)) juNum = shang;
  else if (zhongZhi.includes(shiZhi)) juNum = zhong;
  else juNum = xia;
  return { yinyangJu: yy, juNumber: juNum };
}

// ===== 核心排盘函数 =====

// 按阳遁/阴遁确定值符宫（戊加临的宫位）
// 值符宫 = 时干对应的地盘六仪旬首所在宫
function getZiFuGong(juNumber: number, yinyangJu: YinYang): number {
  // 阳遁：值符从坎1宫顺布（1→2→3→...→9→1...）
  // 值符在1局从1宫起，2局从2宫...
  if (yinyangJu === "yang") {
    return ((juNumber - 1) % 9) + 1;
  } else {
    // 阴遁：值符从离9宫逆布（9→8→7→...→1→9...）
    return 9 - ((juNumber - 1) % 9);
  }
}

// 宫位旋转（阳遁顺，阴遁逆）
function rotatGong(baseGong: number, steps: number, yinyangJu: YinYang): number {
  if (yinyangJu === "yang") {
    return ((baseGong - 1 + steps) % 9) + 1;
  } else {
    return ((baseGong - 1 - steps + 9 * 100) % 9) + 1;
  }
}

// 地盘布局（固定，六仪三奇顺/逆布八宫）
function buildDiPan(juNumber: number, yinyangJu: YinYang): Record<number, TianGan> {
  // 地盘：以戊为旬首，六仪三奇按阳顺阴逆布入八宫（中宫除外）
  // 戊从值符宫起，后续按顺序（阳顺阴逆）布入其他宫
  // 六仪三奇的固定顺序：戊己庚辛壬癸乙丙丁
  const orderYang = ["戊", "己", "庚", "辛", "壬", "癸", "乙", "丙", "丁"] as TianGan[];
  // 阴遁逆序
  const orderYin = [...orderYang].reverse();
  const order = yinyangJu === "yang" ? orderYang : orderYin;

  const startGong = juNumber; // 戊从局数对应宫开始

  const diPan: Record<number, TianGan> = {};
  const gongSeq = yinyangJu === "yang"
    ? [1, 2, 3, 4, 5, 6, 7, 8, 9]
    : [9, 8, 7, 6, 5, 4, 3, 2, 1];

  // 从起始宫开始布局
  const seqIdx = gongSeq.indexOf(startGong);
  for (let i = 0; i < 9; i++) {
    const gong = gongSeq[(seqIdx + i) % 9];
    if (gong !== undefined) {
      diPan[gong] = order[i] ?? "戊";
    }
  }
  return diPan;
}

// 天盘布局（值符飞宫：时干加临值符宫，其余随之旋转）
function buildTianPan(
  diPan: Record<number, TianGan>,
  shiGanZhi: string,
  juNumber: number,
  yinyangJu: YinYang
): Record<number, TianGan> {
  // 时干在地盘中的位置
  const shiGan = shiGanZhi[0] as TianGan;
  // 找到时干（旬首遁甲后的干，即旬首六仪）在地盘的宫位
  const shiGanGong = Object.entries(diPan).find(([, gan]) => gan === shiGan)?.[0];
  const shiGongi = shiGanGong ? parseInt(shiGanGong) : juNumber;

  // 值符宫 = 时干在地盘的宫位
  const zifuGong = shiGongi;

  // 天盘以值符宫起，将地盘整体旋转
  // 旋转步数 = 值符宫 - 1（阳遁）
  const tianPan: Record<number, TianGan> = {};

  // 天盘中，值符所在宫的天干 = 时干
  // 地盘戊（旬首）所在宫与天盘时干关系确定旋转
  const wuGong = Object.entries(diPan).find(([, g]) => g === "戊")?.[0];
  const wuGongi = wuGong ? parseInt(wuGong) : 1;

  // 天盘旋转量：让时干落在值符宫（时干在地盘的宫）
  // 旋转差 = zifuGong - wuGong
  let steps = zifuGong - wuGongi;
  if (yinyangJu === "yin") steps = -steps;

  for (let gong = 1; gong <= 9; gong++) {
    const src = rotatGong(gong, -steps, yinyangJu);
    tianPan[gong] = diPan[src] ?? "戊";
  }
  return tianPan;
}

// 八门布局
function buildMenPan(
  shiGanZhi: string,
  diPan: Record<number, TianGan>,
  juNumber: number,
  yinyangJu: YinYang
): Record<number, BaMen | null> {
  // 八门固定在地盘宫位，随地盘旋转
  // 时干在地盘的宫 = 值使宫（开门从此飞）
  const shiGan = shiGanZhi[0] as TianGan;
  const shiGongi = Object.entries(diPan).find(([, g]) => g === shiGan)
    ? parseInt(Object.entries(diPan).find(([, g]) => g === shiGan)![0])
    : juNumber;

  // 开门固定在艮8宫，随局数旋转后，再按时干宫位旋转
  const menPan: Record<number, BaMen | null> = {};
  menPan[5] = null; // 中宫无门

  // 地盘八门基础宫位旋转到当前局
  const BA_MEN_LIST: BaMen[] = ["休门", "死门", "伤门", "杜门", "开门", "惊门", "生门", "景门"];
  const MEN_FIXED_GONG: number[] = [1, 2, 3, 4, 6, 7, 8, 9]; // 无5

  // 按局数平移（阳顺阴逆）
  const steps = yinyangJu === "yang" ? juNumber - 1 : -(juNumber - 1);

  // 再按时干宫位平移（门随时干宫飞）
  // 时干飞门：开门（8宫）随时干飞到时干宫位
  const openMenBaseGong = 8; // 开门地盘在艮8
  const openMenCurGong = rotatGong(openMenBaseGong, steps, yinyangJu);
  const menOffset = shiGongi - openMenCurGong;

  for (let i = 0; i < 8; i++) {
    const baseGong = MEN_FIXED_GONG[i]!;
    const rotatedGong = rotatGong(baseGong, steps, yinyangJu);
    const finalGong = rotatGong(rotatedGong, menOffset, yinyangJu);
    if (finalGong !== 5) {
      menPan[finalGong] = BA_MEN_LIST[i] ?? null;
    }
  }
  // 补全剩余宫（未被分配的宫暂时为null）
  for (let g = 1; g <= 9; g++) {
    if (!(g in menPan)) menPan[g] = null;
  }
  return menPan;
}

// 九星布局
function buildXingPan(
  shiGanZhi: string,
  diPan: Record<number, TianGan>,
  juNumber: number,
  yinyangJu: YinYang
): Record<number, JiuXing> {
  // 九星随值符飞宫
  const shiGan = shiGanZhi[0] as TianGan;
  const shiGongi = Object.entries(diPan).find(([, g]) => g === shiGan)
    ? parseInt(Object.entries(diPan).find(([, g]) => g === shiGan)![0])
    : juNumber;

  // 天蓬星固定坎1，随局数旋转后飞到值符宫
  const XING_LIST: JiuXing[] = [
    "天蓬星", "天芮星", "天冲星", "天辅星", "天禽星",
    "天心星", "天柱星", "天任星", "天英星"
  ];

  // 局数旋转
  const stepsJu = yinyangJu === "yang" ? juNumber - 1 : -(juNumber - 1);
  // 值符宫旋转（天蓬→值符宫）
  const pengBaseGong = 1;
  const pengCurGong = rotatGong(pengBaseGong, stepsJu, yinyangJu);
  const xingOffset = shiGongi - pengCurGong;

  const xingPan: Record<number, JiuXing> = {};
  for (let i = 0; i < 9; i++) {
    const baseGong = i + 1;
    const rotated = rotatGong(baseGong, stepsJu, yinyangJu);
    const final = rotatGong(rotated, xingOffset, yinyangJu);
    xingPan[final] = XING_LIST[i] ?? "天蓬星";
  }
  return xingPan;
}

// 八神布局
function buildShenPan(
  shiGanZhi: string,
  diPan: Record<number, TianGan>,
  juNumber: number,
  yinyangJu: YinYang
): Record<number, BaShen> {
  const shiGan = shiGanZhi[0] as TianGan;
  const shiGongi = Object.entries(diPan).find(([, g]) => g === shiGan)
    ? parseInt(Object.entries(diPan).find(([, g]) => g === shiGan)![0])
    : juNumber;

  // 值符从值符宫起，按阳顺阴逆布入八宫
  const shenOrder = SHEN_BASE_ORDER_YANG;
  const gongSeq = yinyangJu === "yang"
    ? [1, 2, 3, 4, 6, 7, 8, 9] // 无中宫
    : [9, 8, 7, 6, 4, 3, 2, 1];

  const shenPan: Record<number, BaShen> = {};
  const startIdx = gongSeq.indexOf(shiGongi);
  const adjustedStart = startIdx === -1 ? 0 : startIdx;

  for (let i = 0; i < 8; i++) {
    const gong = gongSeq[(adjustedStart + i) % 8];
    if (gong !== undefined) {
      shenPan[gong] = shenOrder[i] ?? "值符";
    }
  }
  // 中宫默认值符
  shenPan[5] = "值符";
  return shenPan;
}

// ===== 格局检测 =====
interface GejuResult {
  name: string;
  type: string;
  desc: string;
  gongNums: number[];
}

function detectGeju(
  gongs: GongData[],
  _yinyangJu: YinYang,
  lang: Lang
): GejuResult[] {
  const results: GejuResult[] = [];

  // 1. 伏吟：天盘=地盘
  const fuyin: number[] = [];
  for (const g of gongs) {
    if (g.tiDiTianGan === g.tianTianGan) fuyin.push(g.gongNum);
  }
  if (fuyin.length >= 3) {
    results.push({
      name: rsL({ zh: "伏吟", en: "Fuyin (Stagnation)", tw: "伏吟" }, lang),
      type: "中平",
      desc: rsL({
        zh: "天地盘多宫相同，万事皆休，不宜出行动事。",
        en: "Heaven and Earth plates coincide across palaces — all matters stall; avoid travel and new action.",
        tw: "天地盤多宮相同，萬事皆休，不宜出行動事。",
      }, lang),
      gongNums: fuyin,
    });
  }

  // 2. 天盘/地盘干加临格局
  for (const g of gongs) {
    if (g.tianTianGan === "庚" && g.tiDiTianGan === "丙") {
      results.push({
        name: rsL({ zh: "太白入荧", en: "Metal Enters Fire (Taibai Ru Ying)", tw: "太白入熒" }, lang),
        type: "大凶",
        desc: rsL({
          zh: "庚加丙，防资金被盗或合作方反水，不利投资。",
          en: "Geng over Bing — guard against theft of funds or a partner turning hostile; unfavorable for investment.",
          tw: "庚加丙，防資金被盜或合作方反水，不利投資。",
        }, lang),
        gongNums: [g.gongNum],
      });
    }
    if (g.tianTianGan === "丙" && g.tiDiTianGan === "庚") {
      results.push({
        name: rsL({ zh: "荧入太白", en: "Fire Enters Metal (Ying Ru Taibai)", tw: "熒入太白" }, lang),
        type: "大凶",
        desc: rsL({
          zh: "丙加庚，官非口舌，损丁破财，防官司。",
          en: "Bing over Geng — lawsuits and quarrels, loss of people and wealth; beware litigation.",
          tw: "丙加庚，官非口舌，損丁破財，防官司。",
        }, lang),
        gongNums: [g.gongNum],
      });
    }
    if (g.tianTianGan === "甲" && g.tiDiTianGan === "乙") {
      results.push({
        name: rsL({ zh: "青龙返首", en: "Azure Dragon Returns (Qinglong Fanshou)", tw: "青龍返首" }, lang),
        type: "大吉",
        desc: rsL({
          zh: "甲加乙，青龙返首，大吉，诸事顺遂，求谋必成。",
          en: "Jia over Yi, the Azure Dragon Returns — highly auspicious; all matters go smoothly and plans succeed.",
          tw: "甲加乙，青龍返首，大吉，諸事順遂，求謀必成。",
        }, lang),
        gongNums: [g.gongNum],
      });
    }
    if (g.tianTianGan === "丁" && g.tiDiTianGan === "乙") {
      results.push({
        name: rsL({ zh: "飞鸟跌穴", en: "Bird Falls into Nest (Feiniao Diexue)", tw: "飛鳥跌穴" }, lang),
        type: "大吉",
        desc: rsL({
          zh: "丁加乙，飞鸟跌穴，奇格最吉，谋事必成，财利双收。",
          en: "Ding over Yi, Bird Falls into Nest — the most auspicious special pattern; plans succeed and profit doubles.",
          tw: "丁加乙，飛鳥跌穴，奇格最吉，謀事必成，財利雙收。",
        }, lang),
        gongNums: [g.gongNum],
      });
    }
    if (g.tianTianGan === "甲" && g.tiDiTianGan === "戊") {
      results.push({
        name: rsL({ zh: "天乙伏宫", en: "Tianyi Hidden (Tianyi Fugong)", tw: "天乙伏宮" }, lang),
        type: "凶",
        desc: rsL({
          zh: "甲加戊，天乙伏宫，万事迟滞，难以推进，宜守不宜攻。",
          en: "Jia over Wu, Tianyi Hidden — everything stalls and is hard to advance; hold rather than push.",
          tw: "甲加戊，天乙伏宮，萬事遲滯，難以推進，宜守不宜攻。",
        }, lang),
        gongNums: [g.gongNum],
      });
    }
    if (g.tianTianGan === "戊" && g.tiDiTianGan === "甲") {
      results.push({
        name: rsL({ zh: "天乙飞宫", en: "Tianyi Flying (Tianyi Feigong)", tw: "天乙飛宮" }, lang),
        type: "凶",
        desc: rsL({
          zh: "戊加甲，天乙飞宫，做事反复，变化无常。",
          en: "Wu over Jia, Tianyi Flying — actions repeat and reverse; conditions are unstable.",
          tw: "戊加甲，天乙飛宮，做事反復，變化無常。",
        }, lang),
        gongNums: [g.gongNum],
      });
    }
  }

  // 3. 白虎猖狂：白虎+死门同宫
  for (const g of gongs) {
    if (g.shen === "白虎" && g.men === "死门") {
      results.push({
        name: rsL({ zh: "白虎猖狂", en: "Rampant White Tiger (Baihu Changkuang)", tw: "白虎猖狂" }, lang),
        type: "大凶",
        desc: rsL({
          zh: "白虎临死门，防意外伤灾、血光之事。",
          en: "White Tiger meets the Death Gate — guard against accidents, injury and bloodshed.",
          tw: "白虎臨死門，防意外傷災、血光之事。",
        }, lang),
        gongNums: [g.gongNum],
      });
    }
    if (g.shen === "腾蛇" && g.men === "惊门") {
      results.push({
        name: rsL({ zh: "腾蛇妖娇", en: "Bewitching Serpent (Tengshe Yaojiao)", tw: "騰蛇妖嬌" }, lang),
        type: "凶",
        desc: rsL({
          zh: "腾蛇临惊门，防虚惊、谗言、诡计、小人作祟。",
          en: "Serpent meets the Fright Gate — beware false alarms, slander, schemes and petty saboteurs.",
          tw: "騰蛇臨驚門，防虛驚、讒言、詭計、小人作祟。",
        }, lang),
        gongNums: [g.gongNum],
      });
    }
  }

  // 4. 三奇得使：乙丙丁三宫
  const sanQiGongs = gongs.filter(g =>
    ["乙", "丙", "丁"].includes(g.tiDiTianGan) || ["乙", "丙", "丁"].includes(g.tianTianGan)
  );
  if (sanQiGongs.length >= 3) {
    results.push({
      name: rsL({ zh: "三奇得使", en: "Three Marvels Aligned (Sanqi Deshi)", tw: "三奇得使" }, lang),
      type: "大吉",
      desc: rsL({
        zh: "三奇（乙丙丁）俱现，大吉之兆，利于出行、创业、求财。",
        en: "The Three Marvels (Yi, Bing, Ding) all appear — a highly auspicious sign; favorable for travel, ventures and seeking wealth.",
        tw: "三奇（乙丙丁）俱現，大吉之兆，利於出行、創業、求財。",
      }, lang),
      gongNums: sanQiGongs.map(g => g.gongNum),
    });
  }

  // 5. 门迫：宫位五行克制门五行
  for (const g of gongs) {
    if (!g.men) continue;
    const gongWx = NINE_GONG.find(ng => ng.num === g.gongNum)?.wuxing ?? "";
    const menWx = MEN_WUXING_MAP[g.men] ?? "";
    if (gongWx && menWx && WUXING_KE[gongWx] === menWx) {
      const gWx = wuxingName(gongWx, lang);
      const mWx = wuxingName(menWx, lang);
      const menDisp = gateName(g.men, lang);
      results.push({
        name: rsL({ zh: "门迫", en: "Gate Oppressed (Menpo)", tw: "門迫" }, lang),
        type: "凶",
        desc: lang === "en"
          ? `Palace ${g.gongNum} (${gWx}) overcomes the ${menDisp} (${mWx}) — plans are obstructed and the gate is suppressed.`
          : (lang === "tw"
            ? `${g.gongNum}宮（${gWx}）克制${menDisp}（${mWx}），謀事受阻，門被迫壓。`
            : `${g.gongNum}宫（${gWx}）克制${menDisp}（${mWx}），谋事受阻，门被迫压。`),
        gongNums: [g.gongNum],
      });
    }
  }

  return results;
}

// ===== 商业与出行分析 =====
function analyzeForBusiness(gongs: GongData[], lang: Lang): string[] {
  const tips: string[] = [];

  // 找生门、开门所在宫
  for (const g of gongs) {
    if (g.men === "生门" || g.men === "开门" || g.men === "休门") {
      const tipObj = BUSINESS_TIPS[g.men];
      const tipBase = tipObj ? rsL(tipObj, lang) : "";
      const menDisp = gateName(g.men, lang);
      const gongDisp = gongDisplayName(g.gongName, lang);
      const fwDisp = fangweiName(g.fangwei, lang);
      const isKongNote = g.isKong
        ? (lang === "en" ? " (Note: this palace is void — the matter may fall through or be delayed.)"
          : lang === "tw" ? "（注意：該宮旬空，事情可能落空或延期）"
            : "（注意：该宫旬空，事情可能落空或延期）")
        : "";
      const shenNote = g.shen === "值符"
        ? (lang === "en" ? ", with the Chief Spirit — endorsement and trust from the decision-maker; favorable."
          : lang === "tw" ? "，臨值符，主事人信任背書，有利。"
            : "，临值符，主事人信任背书，有利。")
        : g.shen === "玄武"
          ? (lang === "en" ? ", with the Tortoise Spirit — beware deceit and false information."
            : lang === "tw" ? "，臨玄武，防欺詐、信息不實。"
              : "，临玄武，防欺诈、信息不实。")
          : g.shen === "白虎"
            ? (lang === "en" ? ", with the White Tiger — beware broken partnerships and litigation."
              : lang === "tw" ? "，臨白虎，防合作破裂、官司糾紛。"
                : "，临白虎，防合作破裂、官司纠纷。")
            : "";
      const fwLabel = lang === "en" ? `${fwDisp} sector` : `${fwDisp}方`;
      const dash = lang === "en" ? " — " : "— ";
      tips.push(`【${menDisp}】${lang === "en" ? "falls in " : "落"}${gongDisp}（${fwLabel}）${dash}${tipBase}${shenNote}${isKongNote}`);
    }
    if (g.men === "死门") {
      const menDisp = gateName(g.men, lang);
      const gongDisp = gongDisplayName(g.gongName, lang);
      const fwDisp = fangweiName(g.fangwei, lang);
      const fwLabel = lang === "en" ? `${fwDisp} sector` : `${fwDisp}方`;
      tips.push(
        lang === "en"
          ? `【${menDisp}】falls in ${gongDisp}（${fwLabel}） — highly inauspicious; this direction is unfavorable for business now; risk of total loss on investment.`
          : lang === "tw"
            ? `【${menDisp}】落${gongDisp}（${fwLabel}）— 大凶，此方位本時段不利商業活動，防投資血本無歸。`
            : `【${menDisp}】落${gongDisp}（${fwLabel}）— 大凶，此方位本时段不利商业活动，防投资血本无归。`
      );
    }
  }

  // 戊宫分析（甲遁戊，时干落宫）
  const wuGong = gongs.find(g => g.tiDiTianGan === "戊");
  if (wuGong) {
    const gongDisp = gongDisplayName(wuGong.gongName, lang);
    const fwDisp = fangweiName(wuGong.fangwei, lang);
    const fwLabel = lang === "en" ? `${fwDisp} sector` : `${fwDisp}方`;
    tips.push(
      lang === "en"
        ? `【Duty Gate Palace】in ${gongDisp}（${fwLabel}） — the dominant palace of the hour; focus on opportunities in this direction.`
        : lang === "tw"
          ? `【值使宮】在${gongDisp}（${fwLabel}）— 時局主導，重點關注此方向的商機。`
          : `【值使宫】在${gongDisp}（${fwLabel}）— 时局主导，重点关注此方向的商机。`
    );
  }

  if (tips.length === 0) {
    tips.push(
      lang === "en"
        ? "No notable special patterns in this chart — matters proceed smoothly; act conservatively and steadily."
        : lang === "tw"
          ? "當前時局無明顯特殊格局，諸事平順，宜保守穩健行事。"
          : "当前时局无明显特殊格局，诸事平顺，宜保守稳健行事。"
    );
  }
  return tips;
}

function analyzeForTravel(gongs: GongData[], lang: Lang): string[] {
  const tips: string[] = [];

  const jimen: BaMen[] = ["开门", "生门", "休门"];
  for (const g of gongs) {
    if (g.men && jimen.includes(g.men)) {
      const menDisp = gateName(g.men, lang);
      const gongDisp = gongDisplayName(g.gongName, lang);
      const fwDisp = fangweiName(g.fangwei, lang);
      const fwLabel = lang === "en" ? `${fwDisp} sector` : `${fwDisp}方`;
      const jxDisp = jixiongText(MEN_JIXIONG[g.men], lang);
      const maNote = g.isMa
        ? (lang === "en" ? " (Horse Star here — favorable for travel and swift results.)"
          : lang === "tw" ? "（馬星臨此，利於出行，快速達成）"
            : "（马星临此，利于出行，快速达成）")
        : "";
      const isKongNote = g.isKong
        ? (lang === "en" ? " (Void — the matter falls through; do not go.)"
          : lang === "tw" ? "（旬空，主事情落空，不宜前往）"
            : "（旬空，主事情落空，不宜前往）")
        : "";
      tips.push(
        lang === "en"
          ? `【${menDisp}】in ${gongDisp}（${fwLabel}） — ${jxDisp}; travel toward ${fwDisp} is favorable.${maNote}${isKongNote}`
          : `【${menDisp}】在${gongDisp}（${fwLabel}）— ${jxDisp}，往${fwDisp}方出行吉。${maNote}${isKongNote}`
      );
    }
    if (g.men === "死门" || g.men === "伤门") {
      const menDisp = gateName(g.men, lang);
      const gongDisp = gongDisplayName(g.gongName, lang);
      const fwDisp = fangweiName(g.fangwei, lang);
      const fwLabel = lang === "en" ? `${fwDisp} sector` : `${fwDisp}方`;
      tips.push(
        lang === "en"
          ? `【${menDisp}】in ${gongDisp}（${fwLabel}） — inauspicious; avoid traveling toward ${fwDisp}; risk of obstruction and mishap.`
          : lang === "tw"
            ? `【${menDisp}】在${gongDisp}（${fwLabel}）— 凶，不宜前往${fwDisp}方，防意外受阻。`
            : `【${menDisp}】在${gongDisp}（${fwLabel}）— 凶，不宜前往${fwDisp}方，防意外受阻。`
      );
    }
  }

  // 马星宫
  const maGong = gongs.find(g => g.isMa);
  if (maGong) {
    const gongDisp = gongDisplayName(maGong.gongName, lang);
    const fwDisp = fangweiName(maGong.fangwei, lang);
    const fwLabel = lang === "en" ? `${fwDisp} sector` : `${fwDisp}方`;
    tips.push(
      lang === "en"
        ? `【Horse Star】falls in ${gongDisp}（${fwLabel}） — matters move fast; travel promptly.`
        : lang === "tw"
          ? `【馬星】落${gongDisp}（${fwLabel}）— 行事迅速，出行從速。`
          : `【马星】落${gongDisp}（${fwLabel}）— 行事迅速，出行从速。`
    );
  }

  if (tips.length === 0) {
    tips.push(
      lang === "en"
        ? "No especially auspicious travel direction in this chart — consider delaying or canceling travel."
        : lang === "tw"
          ? "當前時局出行無特別吉方，建議延遲或取消出行。"
          : "当前时局出行无特别吉方，建议延迟或取消出行。"
    );
  }
  return tips;
}

// 吉凶枚举 → 解读文案（用于分析提示句中嵌入）
function jixiongText(jx: string | undefined, lang: Lang): string {
  const map: Record<string, L> = {
    "大吉": { zh: "大吉", en: "very auspicious", tw: "大吉" },
    "吉": { zh: "吉", en: "auspicious", tw: "吉" },
    "中平": { zh: "中平", en: "neutral", tw: "中平" },
    "凶": { zh: "凶", en: "inauspicious", tw: "凶" },
    "大凶": { zh: "大凶", en: "very inauspicious", tw: "大凶" },
  };
  const e = jx ? map[jx] : undefined;
  return e ? rsL(e, lang) : (jx ?? "");
}

// ===== 马星计算 =====
function getMaXing(riGanZhi: string): string {
  const riZhi = riGanZhi[1] ?? "子";
  return MA_XING[riZhi] ?? "申";
}

// ===== 主排盘函数 =====
export function buildQimenChart(input: QimenInput, lang: Lang = "zh"): QimenChart {
  // 1. 获取城市经度
  const coord = input.lng
    ? { lng: input.lng, lat: input.lat ?? 30 }
    : getCityCoord(input.city);

  // 2. 计算真太阳时
  const localDate = new Date(
    input.year, input.month - 1, input.day,
    input.hour, input.minute
  );
  const trueSolarDate = calcTrueSolarTime(localDate, coord.lng);
  const tsh = trueSolarDate.getHours();
  const tsm = trueSolarDate.getMinutes();
  const solarSuffix = lang === "en" ? " (true solar time)" : lang === "tw" ? " (真太陽時)" : " (真太阳时)";
  const solarTimeStr = `${String(tsh).padStart(2, "0")}:${String(tsm).padStart(2, "0")}${solarSuffix}`;

  // 3. 干支推算（用真太阳时的时辰）
  const tzYear = trueSolarDate.getFullYear();
  const tzMonth = trueSolarDate.getMonth() + 1;
  const tzDay = trueSolarDate.getDate();
  const ganZhiYear = calcGanZhiYear(tzYear, tzMonth, tzDay);
  const ganZhiMonth = calcGanZhiMonth(tzYear, tzMonth, tzDay);
  const ganZhiDay = calcGanZhiDay(tzYear, tzMonth, tzDay);
  const ganZhiHour = calcGanZhiHour(ganZhiDay, tsh);

  // 4. 节气与局数
  const jieqiName = getApproxJieQi(tzMonth, tzDay);
  const { yinyangJu, juNumber } = getJuFromJieQi(jieqiName, ganZhiHour[1] ?? "子");

  // 5. 旬空与马星
  const xunKong = getXunKong(ganZhiDay);
  const maXingZhi = getMaXing(ganZhiDay);

  // 6. 地盘
  const diPan = buildDiPan(juNumber, yinyangJu);

  // 7. 天盘
  const tianPan = buildTianPan(diPan, ganZhiHour, juNumber, yinyangJu);

  // 8. 八门
  const menPan = buildMenPan(ganZhiHour, diPan, juNumber, yinyangJu);

  // 9. 九星
  const xingPan = buildXingPan(ganZhiHour, diPan, juNumber, yinyangJu);

  // 10. 八神
  const shenPan = buildShenPan(ganZhiHour, diPan, juNumber, yinyangJu);

  // 11. 组装宫位数据
  const gongs: GongData[] = NINE_GONG.map((ng) => {
    const diGan = diPan[ng.num] ?? "戊";
    const tianGan = tianPan[ng.num] ?? "戊";
    const men = menPan[ng.num] ?? null;
    const xing = xingPan[ng.num] ?? "天蓬星";
    const shen = shenPan[ng.num] ?? "值符";
    const isKong = xunKong.includes(ng.bagua === "坎" ? "子" : ng.bagua === "离" ? "午" : "");
    const isMa = ng.bagua !== "中" && DI_ZHI.includes(maXingZhi as typeof DI_ZHI[number])
      && ng.fangwei.includes(maXingZhi === "申" ? "西" : maXingZhi === "寅" ? "东" : maXingZhi === "亥" ? "北" : "南");

    return {
      gongNum: ng.num,
      gongName: ng.name,
      bagua: ng.bagua,
      wuxing: ng.wuxing,
      fangwei: GONG_FANGWEI[ng.num] ?? "",
      tiDiTianGan: diGan,
      tianTianGan: tianGan,
      men: men,
      xing: xing,
      shen: shen,
      isKong,
      isMa,
      geju: [],
    };
  });

  // 12. 格局检测
  const globalGeju = detectGeju(gongs, yinyangJu, lang);

  // 13. 商业/出行分析
  const businessAnalysis = analyzeForBusiness(gongs, lang);
  const travelAnalysis = analyzeForTravel(gongs, lang);

  // 14. 农历描述（简化）
  const lunarStr = `${ganZhiYear}年 ${ganZhiMonth}月 ${ganZhiDay}日 ${ganZhiHour}时`;

  return {
    input,
    solarTime: solarTimeStr,
    lunarStr,
    ganZhiYear,
    ganZhiMonth,
    ganZhiDay,
    ganZhiHour,
    jieQiName: jieqiName,
    yinyangJu: `${yinyangJu === "yang" ? "阳" : "阴"}遁${juNumber}局`,
    juNumber,
    xunKong,
    maXing: maXingZhi,
    gongs,
    globalGeju,
    businessAnalysis,
    travelAnalysis,
  };
}

// ===== LocalStorage 历史记录 =====
const HISTORY_KEY = "qimen_history";

export interface QimenHistoryItem {
  id: string;
  date: string;
  city: string;
  ju: string;
  event: QimenEvent;
}

export function saveQimenHistory(chart: QimenChart): void {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const history: QimenHistoryItem[] = raw ? (JSON.parse(raw) as QimenHistoryItem[]) : [];
    history.unshift({
      id: Date.now().toString(),
      date: `${chart.input.year}-${chart.input.month}-${chart.input.day} ${chart.input.hour}:${String(chart.input.minute).padStart(2, "0")}`,
      city: chart.input.city,
      ju: chart.yinyangJu,
      event: chart.input.event,
    });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 5)));
  } catch { /* ignore */ }
}

export function getQimenHistory(): QimenHistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as QimenHistoryItem[]) : [];
  } catch {
    return [];
  }
}
