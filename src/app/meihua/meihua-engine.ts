/**
 * 梅花心易 - 核心推算引擎
 * 实现三种起卦方式、互卦/变卦推算、体用五行生克断卦
 */

import {
  BA_GUA,
  GUA_MAP,
  HOUR_TO_ZHI,
  analyzeTiYong,
  getGua64Data,
  guaNameLabel,
  resolveCategoryAdvice,
  type Lang,
  type WuXing,
  type Gua64Info,
} from "./meihua-data";

// ===== 输入类型 =====
export type DivinationMethod = "time" | "number" | "random";

export interface MeihuaInput {
  method: DivinationMethod;
  lang?: Lang;                 // 语言（默认 zh）
  question?: string;           // 占问事项（可选）
  category?: string;           // 事项分类
  // 数字起卦
  num1?: number;
  num2?: number;
  // 时间起卦（农历）
  lunarYear?: number;          // 农历年
  lunarMonth?: number;         // 农历月
  lunarDay?: number;           // 农历日
  hour?: number;               // 当前小时（0-23）
}

// ===== 输出类型 =====
export interface GuaInfo {
  upper: number;               // 上卦先天数
  lower: number;               // 下卦先天数
  upperName: string;           // 上卦名（本地化显示）
  lowerName: string;           // 下卦名（本地化显示）
  guaName: string;             // 完整卦名（中文 KEY，用于查表/分享/AI 取象）
  guaNameDisplay: string;      // 完整卦名（本地化显示）
  symbol: string;              // 上下卦符号组合
  wuxing: WuXing;              // 整卦五行（取上卦，中文 KEY）
}

export interface MeihuaResult {
  // 排盘信息
  mainGua: GuaInfo;            // 本卦（主卦）
  huGua: GuaInfo;              // 互卦（中间四爻）
  changeGua: GuaInfo;          // 变卦（动爻变化后）
  dongYao: number;             // 动爻（1-6）
  // 体用
  tiGua: "upper" | "lower";   // 体卦位置
  yongGua: "upper" | "lower"; // 用卦位置
  tiWuXing: WuXing;
  yongWuXing: WuXing;
  // 断卦结果
  relation: ReturnType<typeof analyzeTiYong>;
  categoryAdvice: string;      // 分类建议
  // 卦辞爻辞
  guaCiInfo: Gua64Info;
  changeGuaCiInfo: Gua64Info;
  // 起卦信息
  method: DivinationMethod;
  question: string;
  category: string;
  divineTime: string;          // 占卜时间
  // 计算过程（展示用）
  calcDetail: {
    yearZhiNum: number;
    monthNum: number;
    dayNum: number;
    hourZhiNum: number;
    upperCalc: string;
    lowerCalc: string;
    dongYaoCalc: string;
  };
}

// ===== 核心计算 =====

/**
 * 取余数（确保余数在 1-8 之间）
 */
function mod8(n: number): number {
  const r = n % 8;
  return r === 0 ? 8 : r < 0 ? ((r % 8) + 8) % 8 || 8 : r;
}

/**
 * 取余数（确保余数在 1-6 之间）
 */
function mod6(n: number): number {
  const r = n % 6;
  return r === 0 ? 6 : r < 0 ? ((r % 6) + 6) % 6 || 6 : r;
}

/**
 * 从上下卦先天数构建 GuaInfo
 */
function buildGuaInfo(upper: number, lower: number, lang: Lang): GuaInfo {
  const upperGua = BA_GUA[upper]!;
  const lowerGua = BA_GUA[lower]!;
  const key = `${upper}-${lower}`;
  // guaName 保持中文 KEY（查表/分享/AI 取象）；fallback 同样用中文 name KEY
  const guaName = GUA_MAP[key] ?? `${upperGua.name}${lowerGua.name}卦`;
  return {
    upper, lower,
    upperName: upperGua.nameLabel[lang],
    lowerName: lowerGua.nameLabel[lang],
    guaName,
    guaNameDisplay: GUA_MAP[key] ? guaNameLabel(guaName, lang) : `${upperGua.nameLabel[lang]} / ${lowerGua.nameLabel[lang]}`,
    symbol: upperGua.symbol + lowerGua.symbol,
    wuxing: upperGua.wuxing,
  };
}

/**
 * 计算互卦（本卦2、3、4爻为下互卦，3、4、5爻为上互卦）
 */
function calcHuGua(mainGua: GuaInfo, lang: Lang): GuaInfo {
  // 爻序（从下到上 1-6）
  const lower = BA_GUA[mainGua.lower]!.lines; // 1,2,3爻
  const upper = BA_GUA[mainGua.upper]!.lines; // 4,5,6爻
  const allLines: (0|1)[] = [...lower, ...upper];

  // 互卦下：2,3,4爻；互卦上：3,4,5爻
  const huLowerLines: [0|1, 0|1, 0|1] = [allLines[1]!, allLines[2]!, allLines[3]!];
  const huUpperLines: [0|1, 0|1, 0|1] = [allLines[2]!, allLines[3]!, allLines[4]!];

  const huLowerNum = findBaGuaByLines(huLowerLines);
  const huUpperNum = findBaGuaByLines(huUpperLines);

  return buildGuaInfo(huUpperNum, huLowerNum, lang);
}

/**
 * 计算变卦（将动爻的阴阳取反）
 */
function calcChangeGua(mainGua: GuaInfo, dongYao: number, lang: Lang): GuaInfo {
  const lower = [...BA_GUA[mainGua.lower]!.lines] as [0|1, 0|1, 0|1];
  const upper = [...BA_GUA[mainGua.upper]!.lines] as [0|1, 0|1, 0|1];
  const allLines: (0|1)[] = [...lower, ...upper];

  // 将动爻取反（爻序从1开始，index=爻序-1）
  const dynIdx = dongYao - 1;
  allLines[dynIdx] = allLines[dynIdx] === 1 ? 0 : 1;

  const changeLowerLines: [0|1, 0|1, 0|1] = [allLines[0]!, allLines[1]!, allLines[2]!];
  const changeUpperLines: [0|1, 0|1, 0|1] = [allLines[3]!, allLines[4]!, allLines[5]!];

  const changeLowerNum = findBaGuaByLines(changeLowerLines);
  const changeUpperNum = findBaGuaByLines(changeUpperLines);

  return buildGuaInfo(changeUpperNum, changeLowerNum, lang);
}

/**
 * 根据爻线找到先天数
 */
function findBaGuaByLines(lines: [0|1, 0|1, 0|1]): number {
  for (const [num, gua] of Object.entries(BA_GUA)) {
    if (
      gua.lines[0] === lines[0] &&
      gua.lines[1] === lines[1] &&
      gua.lines[2] === lines[2]
    ) {
      return Number(num);
    }
  }
  return 1; // fallback
}

/**
 * 判断体用（动爻所在的经卦为用卦，另一个为体卦）
 */
function determineTiYong(dongYao: number): { tiGua: "upper" | "lower"; yongGua: "upper" | "lower" } {
  // 动爻1-3在下卦，4-6在上卦
  if (dongYao >= 1 && dongYao <= 3) {
    return { yongGua: "lower", tiGua: "upper" };
  } else {
    return { yongGua: "upper", tiGua: "lower" };
  }
}

// ===== 起卦主函数 =====

// 起卦计算公式的本地化片段（年支/月/日/时支/随机数/÷8余/÷6余）
const CALC_LABELS: Record<Lang, {
  yearZhi: string; month: string; day: string; hourZhi: string;
  rand: string; div8: string; div6: string;
}> = {
  zh: { yearZhi: "年支", month: "月", day: "日", hourZhi: "时支", rand: "随机数", div8: "÷ 8 余", div6: "÷ 6 余" },
  tw: { yearZhi: "年支", month: "月", day: "日", hourZhi: "時支", rand: "隨機數", div8: "÷ 8 餘", div6: "÷ 6 餘" },
  en: { yearZhi: "year branch ", month: "month ", day: "day ", hourZhi: "hour branch ", rand: "random ", div8: "÷ 8 rem.", div6: "÷ 6 rem." },
};

export function runMeihuaEngine(input: MeihuaInput): MeihuaResult {
  const lang: Lang = input.lang ?? "zh";
  const cl = CALC_LABELS[lang];
  const localeTag = lang === "en" ? "en-US" : lang === "tw" ? "zh-TW" : "zh-CN";
  const now = new Date();
  const divineTime = now.toLocaleString(localeTag, {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });

  let upperNum: number;
  let lowerNum: number;
  let dongYao: number;
  let calcDetail: MeihuaResult["calcDetail"];

  if (input.method === "number") {
    // 数字起卦
    const n1 = Math.abs(Math.floor(input.num1 ?? 1));
    const n2 = Math.abs(Math.floor(input.num2 ?? 2));
    upperNum = mod8(n1);
    lowerNum = mod8(n2);
    dongYao = mod6(n1 + n2);

    calcDetail = {
      yearZhiNum: 0, monthNum: 0, dayNum: 0, hourZhiNum: 0,
      upperCalc: `${n1} ${cl.div8} ${upperNum}`,
      lowerCalc: `${n2} ${cl.div8} ${lowerNum}`,
      dongYaoCalc: `(${n1} + ${n2}) ${cl.div6} ${dongYao}`,
    };
  } else if (input.method === "time") {
    // 时间起卦（使用农历年月日时）
    const currentHour = input.hour ?? now.getHours();
    const hourInfo = HOUR_TO_ZHI[currentHour] ?? { zhi: "子", num: 1 };

    // 农历年支（简化：直接用传入的农历年计算，或用公历年估算）
    const lunarYear = input.lunarYear ?? now.getFullYear();
    const lunarMonth = input.lunarMonth ?? (now.getMonth() + 1);
    const lunarDay = input.lunarDay ?? now.getDate();

    // 年支数（地支序号，子=1...亥=12）
    const yearZhiNum = ((lunarYear - 3) % 12 + 12) % 12 || 12;
    const sum = yearZhiNum + lunarMonth + lunarDay;
    upperNum = mod8(sum);
    lowerNum = mod8(sum + hourInfo.num);
    dongYao = mod6(sum + hourInfo.num);

    calcDetail = {
      yearZhiNum,
      monthNum: lunarMonth,
      dayNum: lunarDay,
      hourZhiNum: hourInfo.num,
      upperCalc: `(${cl.yearZhi}${yearZhiNum} + ${cl.month}${lunarMonth} + ${cl.day}${lunarDay}) ${cl.div8} ${upperNum}`,
      lowerCalc: `(${cl.yearZhi}${yearZhiNum} + ${cl.month}${lunarMonth} + ${cl.day}${lunarDay} + ${cl.hourZhi}${hourInfo.num}) ${cl.div8} ${lowerNum}`,
      dongYaoCalc: `(${cl.yearZhi}${yearZhiNum} + ${cl.month}${lunarMonth} + ${cl.day}${lunarDay} + ${cl.hourZhi}${hourInfo.num}) ${cl.div6} ${dongYao}`,
    };
  } else {
    // 随机起卦（模拟心易）
    const r1 = Math.floor(Math.random() * 64) + 1;
    const r2 = Math.floor(Math.random() * 64) + 1;
    upperNum = mod8(r1);
    lowerNum = mod8(r2);
    dongYao = mod6(r1 + r2);

    calcDetail = {
      yearZhiNum: 0, monthNum: 0, dayNum: 0, hourZhiNum: 0,
      upperCalc: `${cl.rand}${r1} ${cl.div8} ${upperNum}`,
      lowerCalc: `${cl.rand}${r2} ${cl.div8} ${lowerNum}`,
      dongYaoCalc: `(${r1} + ${r2}) ${cl.div6} ${dongYao}`,
    };
  }

  // 构建主卦
  const mainGua = buildGuaInfo(upperNum, lowerNum, lang);
  // 互卦
  const huGua = calcHuGua(mainGua, lang);
  // 变卦
  const changeGua = calcChangeGua(mainGua, dongYao, lang);

  // 体用判断
  const { tiGua: tiPos, yongGua: yongPos } = determineTiYong(dongYao);
  const tiNum = tiPos === "upper" ? mainGua.upper : mainGua.lower;
  const yongNum = yongPos === "upper" ? mainGua.upper : mainGua.lower;
  const tiWuXing = BA_GUA[tiNum]!.wuxing;
  const yongWuXing = BA_GUA[yongNum]!.wuxing;

  // 五行生克断卦（按 lang 解析为本地化文案，type/level KEY 保持中文）
  const relation = analyzeTiYong(tiWuXing, yongWuXing, lang);

  // 分类建议（按 type KEY + category 解析为本地化纯字符串）
  const category = input.category ?? "general";
  const categoryAdvice = resolveCategoryAdvice(relation.type, category, lang);

  // 卦辞爻辞（按 lang 解析；guaName 为中文 KEY 用于查表）
  const guaCiInfo = getGua64Data(mainGua.guaName, lang);
  const changeGuaCiInfo = getGua64Data(changeGua.guaName, lang);

  return {
    mainGua,
    huGua,
    changeGua,
    dongYao,
    tiGua: tiPos,
    yongGua: yongPos,
    tiWuXing,
    yongWuXing,
    relation,
    categoryAdvice,
    guaCiInfo,
    changeGuaCiInfo,
    method: input.method,
    question: input.question ?? "",
    category,
    divineTime,
    calcDetail,
  };
}
