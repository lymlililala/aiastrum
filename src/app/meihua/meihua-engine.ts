/**
 * 梅花心易 - 核心推算引擎
 * 实现三种起卦方式、互卦/变卦推算、体用五行生克断卦
 */

import {
  BA_GUA,
  GUA_MAP,
  CATEGORY_ADVICE,
  HOUR_TO_ZHI,
  analyzeTiYong,
  getGua64Data,
  type WuXing,
  type Gua64Info,
} from "./meihua-data";

// ===== 输入类型 =====
export type DivinationMethod = "time" | "number" | "random";

export interface MeihuaInput {
  method: DivinationMethod;
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
  upperName: string;
  lowerName: string;
  guaName: string;             // 完整卦名
  symbol: string;              // 上下卦符号组合
  wuxing: WuXing;              // 整卦五行（取上卦）
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
function buildGuaInfo(upper: number, lower: number): GuaInfo {
  const upperGua = BA_GUA[upper]!;
  const lowerGua = BA_GUA[lower]!;
  const key = `${upper}-${lower}`;
  const guaName = GUA_MAP[key] ?? `${upperGua.name}${lowerGua.name}卦`;
  return {
    upper, lower,
    upperName: upperGua.name,
    lowerName: lowerGua.name,
    guaName,
    symbol: upperGua.symbol + lowerGua.symbol,
    wuxing: upperGua.wuxing,
  };
}

/**
 * 计算互卦（本卦2、3、4爻为下互卦，3、4、5爻为上互卦）
 */
function calcHuGua(mainGua: GuaInfo): GuaInfo {
  // 爻序（从下到上 1-6）
  const lower = BA_GUA[mainGua.lower]!.lines; // 1,2,3爻
  const upper = BA_GUA[mainGua.upper]!.lines; // 4,5,6爻
  const allLines: (0|1)[] = [...lower, ...upper];

  // 互卦下：2,3,4爻；互卦上：3,4,5爻
  const huLowerLines: [0|1, 0|1, 0|1] = [allLines[1]!, allLines[2]!, allLines[3]!];
  const huUpperLines: [0|1, 0|1, 0|1] = [allLines[2]!, allLines[3]!, allLines[4]!];

  const huLowerNum = findBaGuaByLines(huLowerLines);
  const huUpperNum = findBaGuaByLines(huUpperLines);

  return buildGuaInfo(huUpperNum, huLowerNum);
}

/**
 * 计算变卦（将动爻的阴阳取反）
 */
function calcChangeGua(mainGua: GuaInfo, dongYao: number): GuaInfo {
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

  return buildGuaInfo(changeUpperNum, changeLowerNum);
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

export function runMeihuaEngine(input: MeihuaInput): MeihuaResult {
  const now = new Date();
  const divineTime = now.toLocaleString("zh-CN", {
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
      upperCalc: `${n1} ÷ 8 余 ${upperNum}`,
      lowerCalc: `${n2} ÷ 8 余 ${lowerNum}`,
      dongYaoCalc: `(${n1} + ${n2}) ÷ 6 余 ${dongYao}`,
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
      upperCalc: `(年支${yearZhiNum} + 月${lunarMonth} + 日${lunarDay}) ÷ 8 余 ${upperNum}`,
      lowerCalc: `(年支${yearZhiNum} + 月${lunarMonth} + 日${lunarDay} + 时支${hourInfo.num}) ÷ 8 余 ${lowerNum}`,
      dongYaoCalc: `(年支${yearZhiNum} + 月${lunarMonth} + 日${lunarDay} + 时支${hourInfo.num}) ÷ 6 余 ${dongYao}`,
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
      upperCalc: `随机数 ${r1} ÷ 8 余 ${upperNum}`,
      lowerCalc: `随机数 ${r2} ÷ 8 余 ${lowerNum}`,
      dongYaoCalc: `(${r1} + ${r2}) ÷ 6 余 ${dongYao}`,
    };
  }

  // 构建主卦
  const mainGua = buildGuaInfo(upperNum, lowerNum);
  // 互卦
  const huGua = calcHuGua(mainGua);
  // 变卦
  const changeGua = calcChangeGua(mainGua, dongYao);

  // 体用判断
  const { tiGua: tiPos, yongGua: yongPos } = determineTiYong(dongYao);
  const tiNum = tiPos === "upper" ? mainGua.upper : mainGua.lower;
  const yongNum = yongPos === "upper" ? mainGua.upper : mainGua.lower;
  const tiWuXing = BA_GUA[tiNum]!.wuxing;
  const yongWuXing = BA_GUA[yongNum]!.wuxing;

  // 五行生克断卦
  const relation = analyzeTiYong(tiWuXing, yongWuXing);

  // 分类建议
  const category = input.category ?? "general";
  const adviceMap = CATEGORY_ADVICE[relation.type] ?? CATEGORY_ADVICE["比和"]!;
  const categoryAdvice = adviceMap[category] ?? adviceMap["general"] ?? "";

  // 卦辞爻辞
  const guaCiInfo = getGua64Data(mainGua.guaName);
  const changeGuaCiInfo = getGua64Data(changeGua.guaName);

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
