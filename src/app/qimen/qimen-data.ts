// ===== 奇门遁甲 · 数据层 =====
// 包含所有静态数据：符号、星神门、节气、宫位信息

// ===== 多语言 =====
// 译注：术语「数据键」（九星/八门/八神/宫名/天干地支等）一律保持中文不变，
// 仅在「展示」层用 *_NAME_EN / *_NAME_TW 查表得到本地化显示名。
// 解读性「文案」（格局 desc、商业/出行提示）用 L = {zh,en,tw}，引擎按 lang 解析为纯字符串。
export type Lang = "zh" | "en" | "tw";
/** 单条本地化字符串 */
export type L = { zh: string; en: string; tw: string };
/** 解析本地化字符串 */
export function rsL(v: L, lang: Lang): string {
  return v[lang];
}

// ===== 基础类型 =====
export type GanZhi = string; // 干支字符串
export type PanType = "zhuan" | "fei"; // 转盘 / 飞盘
export type JuType = "zhe" | "zhi" | "mao"; // 拆补 / 置闰 / 茅山
export type YinYang = "yang" | "yin"; // 阳遁 / 阴遁
export type QimenEvent = "business" | "travel" | "general"; // 占问事由

// ===== 十天干 =====
export const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"] as const;
export type TianGan = (typeof TIAN_GAN)[number];

// ===== 十二地支 =====
export const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"] as const;
export type DiZhi = (typeof DI_ZHI)[number];

// ===== 天干地支 显示名（zh 即键本身）=====
// 天干罗马音
export const GAN_NAME_EN: Record<string, string> = {
  "甲": "Jiǎ", "乙": "Yǐ", "丙": "Bǐng", "丁": "Dīng", "戊": "Wù",
  "己": "Jǐ", "庚": "Gēng", "辛": "Xīn", "壬": "Rén", "癸": "Guǐ",
};
// 地支罗马音
export const ZHI_NAME_EN: Record<string, string> = {
  "子": "Zǐ", "丑": "Chǒu", "寅": "Yín", "卯": "Mǎo", "辰": "Chén", "巳": "Sì",
  "午": "Wǔ", "未": "Wèi", "申": "Shēn", "酉": "Yǒu", "戌": "Xū", "亥": "Hài",
};

// ===== 八门 =====
export const BA_MEN = ["休门", "死门", "伤门", "杜门", "开门", "惊门", "生门", "景门"] as const;
export type BaMen = (typeof BA_MEN)[number];

// 八门显示名（en / tw）。zh 直接用键。
export const GATE_NAME_EN: Record<string, string> = {
  "休门": "Rest Gate", "死门": "Death Gate", "伤门": "Harm Gate", "杜门": "Block Gate",
  "开门": "Open Gate", "惊门": "Fright Gate", "生门": "Life Gate", "景门": "Scene Gate",
};
export const GATE_NAME_TW: Record<string, string> = {
  "休门": "休門", "死门": "死門", "伤门": "傷門", "杜门": "杜門",
  "开门": "開門", "惊门": "驚門", "生门": "生門", "景门": "景門",
};

// 八门固定宫位（地盘，坎1 从1起）
// 休门-坎1, 死门-坤2, 伤门-震3, 杜门-巽4, (中5无门), 开门-乾6, 惊门-兑7, 生门-艮8, 景门-离9
export const MEN_BASE_GONG: Record<BaMen, number> = {
  "休门": 1, "死门": 2, "伤门": 3, "杜门": 4,
  "开门": 6, "惊门": 7, "生门": 8, "景门": 9,
};

// 门的五行属性
export const MEN_WUXING: Record<BaMen, string> = {
  "休门": "水", "死门": "土", "伤门": "木", "杜门": "木",
  "开门": "金", "惊门": "金", "生门": "土", "景门": "火",
};

// 门的吉凶
export const MEN_JIXIONG: Record<BaMen, "大吉" | "吉" | "中平" | "凶" | "大凶"> = {
  "开门": "大吉", "生门": "大吉", "休门": "吉",
  "景门": "中平", "杜门": "中平", "伤门": "凶",
  "惊门": "凶", "死门": "大凶",
};

// ===== 九星 =====
export const JIU_XING = ["天蓬星", "天芮星", "天冲星", "天辅星", "天禽星", "天心星", "天柱星", "天任星", "天英星"] as const;
export type JiuXing = (typeof JIU_XING)[number];

// 九星显示名（en / tw）。zh 直接用键。
export const STAR_NAME_EN: Record<string, string> = {
  "天蓬星": "Tianpeng Star", "天芮星": "Tianrui Star", "天冲星": "Tianchong Star",
  "天辅星": "Tianfu Star", "天禽星": "Tianqin Star", "天心星": "Tianxin Star",
  "天柱星": "Tianzhu Star", "天任星": "Tianren Star", "天英星": "Tianying Star",
};
export const STAR_NAME_TW: Record<string, string> = {
  "天蓬星": "天蓬星", "天芮星": "天芮星", "天冲星": "天衝星", "天辅星": "天輔星",
  "天禽星": "天禽星", "天心星": "天心星", "天柱星": "天柱星", "天任星": "天任星", "天英星": "天英星",
};
// 九星简称显示名（去「天/星」后用于盘面格子，zh = "蓬"）
export const STAR_SHORT_EN: Record<string, string> = {
  "天蓬星": "Peng", "天芮星": "Rui", "天冲星": "Chong", "天辅星": "Fu", "天禽星": "Qin",
  "天心星": "Xin", "天柱星": "Zhu", "天任星": "Ren", "天英星": "Ying",
};

// 九星固定宫位（坎1）
export const XING_BASE_GONG: Record<JiuXing, number> = {
  "天蓬星": 1, "天芮星": 2, "天冲星": 3, "天辅星": 4, "天禽星": 5,
  "天心星": 6, "天柱星": 7, "天任星": 8, "天英星": 9,
};

// 九星五行
export const XING_WUXING: Record<JiuXing, string> = {
  "天蓬星": "水", "天芮星": "土", "天冲星": "木", "天辅星": "木",
  "天禽星": "土", "天心星": "金", "天柱星": "金", "天任星": "土", "天英星": "火",
};

// 九星吉凶
export const XING_JIXIONG: Record<JiuXing, "大吉" | "吉" | "中平" | "凶" | "大凶"> = {
  "天辅星": "大吉", "天任星": "大吉", "天心星": "吉",
  "天蓬星": "中平", "天英星": "中平", "天禽星": "中平",
  "天冲星": "凶", "天柱星": "凶", "天芮星": "大凶",
};

// ===== 八神 =====
export const BA_SHEN = ["值符", "腾蛇", "太阴", "六合", "勾陈", "朱雀", "九地", "九天", "白虎", "玄武"] as const;
// 实际八神（取前8个）
export const BA_SHEN_8 = ["值符", "腾蛇", "太阴", "六合", "白虎", "玄武", "九地", "九天"] as const;
export type BaShen = (typeof BA_SHEN_8)[number];

// 八神显示名（en / tw）。zh 直接用键。覆盖全部 10 神以防边缘引用。
export const GOD_NAME_EN: Record<string, string> = {
  "值符": "Chief", "腾蛇": "Serpent", "太阴": "Moon", "六合": "Harmony",
  "勾陈": "Hook", "朱雀": "Phoenix", "九地": "Earth", "九天": "Heaven",
  "白虎": "Tiger", "玄武": "Tortoise",
};
export const GOD_NAME_TW: Record<string, string> = {
  "值符": "值符", "腾蛇": "騰蛇", "太阴": "太陰", "六合": "六合",
  "勾陈": "勾陳", "朱雀": "朱雀", "九地": "九地", "九天": "九天",
  "白虎": "白虎", "玄武": "玄武",
};

// 八神固定值符宫（坎1）
// 阳遁：值符从戊出发依次顺布；阴遁：值符从戊出发逆布
export const SHEN_BASE_ORDER_YANG: BaShen[] = [
  "值符", "腾蛇", "太阴", "六合", "白虎", "玄武", "九地", "九天"
];
export const SHEN_BASE_ORDER_YIN: BaShen[] = [
  "值符", "腾蛇", "太阴", "六合", "白虎", "玄武", "九地", "九天"
];

// 八神吉凶
export const SHEN_JIXIONG: Record<BaShen, "大吉" | "吉" | "中平" | "凶" | "大凶"> = {
  "值符": "大吉", "九天": "大吉", "九地": "吉", "六合": "吉",
  "太阴": "中平", "腾蛇": "凶", "白虎": "凶", "玄武": "大凶",
};

// ===== 九宫 =====
export interface Gong {
  num: number;       // 宫位序号 1-9
  name: string;      // 宫名（如"坎宫"）
  bagua: string;     // 八卦
  wuxing: string;    // 五行
  fangwei: string;   // 方位
  color: string;     // 代表色
  tiangan: TianGan;  // 宫位本位天干（六仪三奇）
}

export const NINE_GONG: Gong[] = [
  { num: 1, name: "坎宫", bagua: "坎", wuxing: "水", fangwei: "北",  color: "#1a4a7a", tiangan: "戊" },
  { num: 2, name: "坤宫", bagua: "坤", wuxing: "土", fangwei: "西南", color: "#4a3000", tiangan: "己" },
  { num: 3, name: "震宫", bagua: "震", wuxing: "木", fangwei: "东",  color: "#1a4a1a", tiangan: "庚" },
  { num: 4, name: "巽宫", bagua: "巽", wuxing: "木", fangwei: "东南", color: "#1a3a1a", tiangan: "辛" },
  { num: 5, name: "中宫", bagua: "中", wuxing: "土", fangwei: "中",  color: "#3a2a10", tiangan: "戊" },
  { num: 6, name: "乾宫", bagua: "乾", wuxing: "金", fangwei: "西北", color: "#3a3a1a", tiangan: "壬" },
  { num: 7, name: "兑宫", bagua: "兑", wuxing: "金", fangwei: "西",  color: "#3a2a2a", tiangan: "癸" },
  { num: 8, name: "艮宫", bagua: "艮", wuxing: "土", fangwei: "东北", color: "#2a3a0a", tiangan: "丙" },
  { num: 9, name: "离宫", bagua: "离", wuxing: "火", fangwei: "南",  color: "#4a1a1a", tiangan: "丁" },
];

// 宫名显示名（en / tw）。zh 直接用键 name。
export const GONG_NAME_EN: Record<string, string> = {
  "坎宫": "Kan Palace", "坤宫": "Kun Palace", "震宫": "Zhen Palace", "巽宫": "Xun Palace",
  "中宫": "Center Palace", "乾宫": "Qian Palace", "兑宫": "Dui Palace", "艮宫": "Gen Palace", "离宫": "Li Palace",
};
export const GONG_NAME_TW: Record<string, string> = {
  "坎宫": "坎宮", "坤宫": "坤宮", "震宫": "震宮", "巽宫": "巽宮",
  "中宫": "中宮", "乾宫": "乾宮", "兑宫": "兌宮", "艮宫": "艮宮", "离宫": "離宮",
};
// 宫名去「宫」短名（盘面格子用，zh = "坎"）
export const GONG_SHORT_EN: Record<string, string> = {
  "坎宫": "Kan", "坤宫": "Kun", "震宫": "Zhen", "巽宫": "Xun",
  "中宫": "Center", "乾宫": "Qian", "兑宫": "Dui", "艮宫": "Gen", "离宫": "Li",
};
// 八卦显示名
export const BAGUA_NAME_EN: Record<string, string> = {
  "坎": "Kan", "坤": "Kun", "震": "Zhen", "巽": "Xun", "中": "Center",
  "乾": "Qian", "兑": "Dui", "艮": "Gen", "离": "Li",
};
export const BAGUA_NAME_TW: Record<string, string> = {
  "坎": "坎", "坤": "坤", "震": "震", "巽": "巽", "中": "中",
  "乾": "乾", "兑": "兌", "艮": "艮", "离": "離",
};
// 五行显示名
export const WUXING_NAME_EN: Record<string, string> = {
  "木": "Wood", "火": "Fire", "土": "Earth", "金": "Metal", "水": "Water",
};
// 方位显示名（en / tw）。zh 直接用键。
export const FANGWEI_NAME_EN: Record<string, string> = {
  "北": "N", "西南": "SW", "东": "E", "东南": "SE", "中": "C",
  "西北": "NW", "西": "W", "东北": "NE", "南": "S",
};
export const FANGWEI_NAME_TW: Record<string, string> = {
  "北": "北", "西南": "西南", "东": "東", "东南": "東南", "中": "中",
  "西北": "西北", "西": "西", "东北": "東北", "南": "南",
};

// 宫位序号到索引（宫序1-9，用于数组操作）
export function gongToIdx(gong: number): number {
  return gong - 1;
}

// ===== 显示名解析器（zh 返回键本身，en/tw 查表）=====
export function gateName(key: string, lang: Lang): string {
  if (lang === "en") return GATE_NAME_EN[key] ?? key;
  if (lang === "tw") return GATE_NAME_TW[key] ?? key;
  return key;
}
export function starName(key: string, lang: Lang): string {
  if (lang === "en") return STAR_NAME_EN[key] ?? key;
  if (lang === "tw") return STAR_NAME_TW[key] ?? key;
  return key;
}
/** 九星短名：去「天」字（盘面格子用） */
export function starShortName(key: string, lang: Lang): string {
  if (lang === "en") return STAR_SHORT_EN[key] ?? key.replace("天", "").replace("星", "");
  return key.replace("天", "");
}
export function godName(key: string, lang: Lang): string {
  if (lang === "en") return GOD_NAME_EN[key] ?? key;
  if (lang === "tw") return GOD_NAME_TW[key] ?? key;
  return key;
}
export function gongName(key: string, lang: Lang): string {
  if (lang === "en") return GONG_NAME_EN[key] ?? key;
  if (lang === "tw") return GONG_NAME_TW[key] ?? key;
  return key;
}
/** 宫名短名：去「宫」字（盘面格子用） */
export function gongShortName(key: string, lang: Lang): string {
  if (lang === "en") return GONG_SHORT_EN[key] ?? key.replace("宫", "");
  return key.replace("宫", "");
}
export function baguaName(key: string, lang: Lang): string {
  if (lang === "en") return BAGUA_NAME_EN[key] ?? key;
  if (lang === "tw") return BAGUA_NAME_TW[key] ?? key;
  return key;
}
export function wuxingName(key: string, lang: Lang): string {
  if (lang === "en") return WUXING_NAME_EN[key] ?? key;
  return key; // tw 与 zh 同字
}
export function fangweiName(key: string, lang: Lang): string {
  if (lang === "en") return FANGWEI_NAME_EN[key] ?? key;
  if (lang === "tw") return FANGWEI_NAME_TW[key] ?? key;
  return key;
}
export function ganName(key: string, lang: Lang): string {
  if (lang === "en") return GAN_NAME_EN[key] ?? key;
  return key; // tw 与 zh 同字
}
export function zhiName(key: string, lang: Lang): string {
  if (lang === "en") return ZHI_NAME_EN[key] ?? key;
  return key; // tw 与 zh 同字
}
/** 干支双字（如「甲子」）整体转显示名 */
export function ganZhiName(gz: string, lang: Lang): string {
  if (lang !== "en") return gz;
  const parts = [...gz];
  return parts.map((ch) => GAN_NAME_EN[ch] ?? ZHI_NAME_EN[ch] ?? ch).join("");
}

// 二十四节气显示名（en / tw）。zh 直接用键。
export const JIEQI_NAME_EN: Record<string, string> = {
  "立春": "Start of Spring", "雨水": "Rain Water", "惊蛰": "Awakening of Insects", "春分": "Spring Equinox",
  "清明": "Pure Brightness", "谷雨": "Grain Rain", "立夏": "Start of Summer", "小满": "Grain Buds",
  "芒种": "Grain in Ear", "夏至": "Summer Solstice", "小暑": "Minor Heat", "大暑": "Major Heat",
  "立秋": "Start of Autumn", "处暑": "End of Heat", "白露": "White Dew", "秋分": "Autumn Equinox",
  "寒露": "Cold Dew", "霜降": "Frost's Descent", "立冬": "Start of Winter", "小雪": "Minor Snow",
  "大雪": "Major Snow", "冬至": "Winter Solstice", "小寒": "Minor Cold", "大寒": "Major Cold",
};
export const JIEQI_NAME_TW: Record<string, string> = {
  "立春": "立春", "雨水": "雨水", "惊蛰": "驚蟄", "春分": "春分",
  "清明": "清明", "谷雨": "穀雨", "立夏": "立夏", "小满": "小滿",
  "芒种": "芒種", "夏至": "夏至", "小暑": "小暑", "大暑": "大暑",
  "立秋": "立秋", "处暑": "處暑", "白露": "白露", "秋分": "秋分",
  "寒露": "寒露", "霜降": "霜降", "立冬": "立冬", "小雪": "小雪",
  "大雪": "大雪", "冬至": "冬至", "小寒": "小寒", "大寒": "大寒",
};
export function jieqiName(key: string, lang: Lang): string {
  if (lang === "en") return JIEQI_NAME_EN[key] ?? key;
  if (lang === "tw") return JIEQI_NAME_TW[key] ?? key;
  return key;
}
/** 局数字符串本地化（输入为引擎产出的「阳遁X局」格式或阴阳标识）。 */
export function yinyangJuName(yy: "yang" | "yin", juNumber: number, lang: Lang): string {
  if (lang === "en") return `${yy === "yang" ? "Yang" : "Yin"} Dun · Ju ${juNumber}`;
  if (lang === "tw") return `${yy === "yang" ? "陽" : "陰"}遁${juNumber}局`;
  return `${yy === "yang" ? "阳" : "阴"}遁${juNumber}局`;
}

// 九宫洛书顺序（用于排布）
// 洛书：4,9,2 / 3,5,7 / 8,1,6（从左上到右下）
export const LUOSHU_LAYOUT = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

// ===== 六仪三奇 =====
// 六仪：戊己庚辛壬癸（六十甲子中每旬首，代表地盘天干）
// 三奇：乙丙丁（天干中的三奇）
export const LIU_YI = ["戊", "己", "庚", "辛", "壬", "癸"];
export const SAN_QI = ["乙", "丙", "丁"];
export const LIU_YI_SAN_QI = [...LIU_YI, ...SAN_QI]; // 地盘天干顺序（甲隐遁入戊）

// 六十甲子顺序
export const JIAZI_60: string[] = [];
const gan10 = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
const zhi12 = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
for (let i = 0; i < 60; i++) {
  JIAZI_60.push(gan10[i % 10]! + zhi12[i % 12]!);
}

// ===== 节气数据 =====
export interface JieQi {
  name: string;
  yinyangJu: YinYang; // 阴遁或阳遁
  juNumber: number;   // 1-9
  month: number;      // 大约月份（用于粗估）
}

// 二十四节气与局数对应表（拆补法）
// 阳遁：冬至后，从一局起，顺数到九；再从一局起
// 阴遁：夏至后，从九局起，逆数到一；再从九局起
export const JIEQI_LIST = [
  "小寒", "大寒", "立春", "雨水", "惊蛰", "春分",
  "清明", "谷雨", "立夏", "小满", "芒种", "夏至",
  "小暑", "大暑", "立秋", "处暑", "白露", "秋分",
  "寒露", "霜降", "立冬", "小雪", "大雪", "冬至",
];

// 节气对应阴阳遁与局数（标准拆补法，每个节气三个中元天）
// 格式：[节气名, 阴阳, 上元局, 中元局, 下元局]
export const JIEQI_JU_MAP: Array<[string, YinYang, number, number, number]> = [
  ["冬至",  "yang", 1, 7, 4],
  ["小寒",  "yang", 2, 8, 5],
  ["大寒",  "yang", 3, 9, 6],
  ["立春",  "yang", 8, 5, 2],
  ["雨水",  "yang", 9, 6, 3],
  ["惊蛰",  "yang", 1, 7, 4],
  ["春分",  "yang", 3, 9, 6],
  ["清明",  "yang", 4, 1, 7],
  ["谷雨",  "yang", 5, 2, 8],
  ["立夏",  "yang", 4, 1, 7],
  ["小满",  "yang", 5, 2, 8],
  ["芒种",  "yang", 6, 3, 9],
  ["夏至",  "yin",  9, 3, 6],
  ["小暑",  "yin",  8, 2, 5],
  ["大暑",  "yin",  7, 1, 4],
  ["立秋",  "yin",  2, 5, 8],
  ["处暑",  "yin",  1, 4, 7],
  ["白露",  "yin",  9, 3, 6],
  ["秋分",  "yin",  7, 1, 4],
  ["寒露",  "yin",  6, 9, 3],
  ["霜降",  "yin",  5, 8, 2],
  ["立冬",  "yin",  6, 9, 3],
  ["小雪",  "yin",  5, 8, 2],
  ["大雪",  "yin",  4, 7, 1],
];

// ===== 五行生克 =====
export const WUXING_SHENG: Record<string, string> = {
  "木": "火", "火": "土", "土": "金", "金": "水", "水": "木",
};
export const WUXING_KE: Record<string, string> = {
  "木": "土", "土": "水", "水": "火", "火": "金", "金": "木",
};

// 天干五行
export const GAN_WUXING: Record<string, string> = {
  "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土",
  "己": "土", "庚": "金", "辛": "金", "壬": "水", "癸": "水",
};

// 地支五行
export const ZHI_WUXING: Record<string, string> = {
  "子": "水", "丑": "土", "寅": "木", "卯": "木", "辰": "土", "巳": "火",
  "午": "火", "未": "土", "申": "金", "酉": "金", "戌": "土", "亥": "水",
};

// ===== 特殊格局定义 =====
export interface Geju {
  name: string;
  type: "大吉" | "吉" | "中平" | "凶" | "大凶";
  description: string;
  condition: string; // 触发条件说明
}

export const SPECIAL_GEJU: Geju[] = [
  // 吉格
  { name: "青龙返首", type: "大吉", description: "甲加乙，为首，大吉，诸事顺遂。", condition: "甲加乙" },
  { name: "飞鸟跌穴", type: "大吉", description: "丁加乙，奇入符穴，吉中最吉，谋事必成。", condition: "丁加乙" },
  { name: "三奇得使", type: "大吉", description: "乙丙丁三奇同宫或连续顺序排列，大吉。", condition: "三奇同宫/连续" },
  { name: "奇仪顺布", type: "吉", description: "天盘奇仪与地盘奇仪相生相合，利于出行。", condition: "天地盘相生" },
  // 凶格
  { name: "太白入荧", type: "大凶", description: "庚加丙，太白（庚金）入荧（丙火），损失钱财，防被骗。", condition: "庚加丙" },
  { name: "荧入太白", type: "大凶", description: "丙加庚，官非口舌，损丁破财。", condition: "丙加庚" },
  { name: "天乙伏宫", type: "凶", description: "甲加戊（天乙伏宫），万事迟滞，难以推进。", condition: "甲加戊" },
  { name: "天乙飞宫", type: "凶", description: "戊加甲（天乙飞宫），做事反复，宜守不宜动。", condition: "戊加甲" },
  { name: "白虎猖狂", type: "大凶", description: "白虎临死门或值兵门，防意外伤灾。", condition: "白虎+死门" },
  { name: "腾蛇妖娇", type: "凶", description: "腾蛇临惊门，防虚惊、谗言、诡计。", condition: "腾蛇+惊门" },
  { name: "墓门开", type: "凶", description: "死门临戌宫或丁旺，防官司、丧事。", condition: "死门+戌" },
  // 中性/条件格局
  { name: "伏吟", type: "中平", description: "天盘地盘相同，万事皆休，不宜出行动事。", condition: "天盘=地盘" },
  { name: "反吟", type: "凶", description: "天盘对宫地盘，主反覆、往返、烦恼。", condition: "天盘=对宫地盘" },
  { name: "门迫", type: "凶", description: "门与天干相克（地盘克天盘），谋事受阻。", condition: "天干克制门五行" },
  { name: "星奇相佐", type: "吉", description: "九星与三奇同宫相合，利于文事、智谋。", condition: "吉星+三奇" },
];

// ===== 旬首对应表 =====
// 六十甲子每10天为一旬，旬首天干遁入奇仪
export const XUN_SHOU: Record<string, TianGan> = {
  "甲子": "戊", "甲戌": "己", "甲申": "庚",
  "甲午": "辛", "甲辰": "壬", "甲寅": "癸",
};

// 旬空（六旬各有两个地支为空亡）
export const XUN_KONG: Record<string, [string, string]> = {
  "甲子": ["戌", "亥"], "甲戌": ["申", "酉"], "甲申": ["午", "未"],
  "甲午": ["辰", "巳"], "甲辰": ["寅", "卯"], "甲寅": ["子", "丑"],
};

// ===== 马星 =====
// 日支起马星：寅午戌马在申，申子辰马在寅，巳酉丑马在亥，亥卯未马在巳
export const MA_XING: Record<string, string> = {
  "寅": "申", "午": "申", "戌": "申",
  "申": "寅", "子": "寅", "辰": "寅",
  "巳": "亥", "酉": "亥", "丑": "亥",
  "亥": "巳", "卯": "巳", "未": "巳",
};

// ===== 格局文案提示库 =====
// 注：键为八门中文名（数据键，勿改）；值为本地化解读文案。
export const BUSINESS_TIPS: Record<string, L> = {
  "开门": {
    zh: "开门为第一吉门，利于谈判、签约、扩张。",
    en: "The Open Gate is the foremost auspicious gate — favorable for negotiation, signing and expansion.",
    tw: "開門為第一吉門，利於談判、簽約、擴張。",
  },
  "生门": {
    zh: "生门主生财旺财，为出行求财、启动新业务之首选。",
    en: "The Life Gate governs wealth and growth — the top choice for seeking profit and launching new ventures.",
    tw: "生門主生財旺財，為出行求財、啟動新業務之首選。",
  },
  "休门": {
    zh: "休门主休养调整，适合签合同、收款结账。",
    en: "The Rest Gate governs recovery and adjustment — suitable for signing contracts and settling accounts.",
    tw: "休門主休養調整，適合簽合同、收款結賬。",
  },
  "景门": {
    zh: "景门主文书、宣传，利于广告营销、媒体合作。",
    en: "The Scene Gate governs documents and publicity — favorable for advertising, marketing and media partnerships.",
    tw: "景門主文書、宣傳，利於廣告營銷、媒體合作。",
  },
  "杜门": {
    zh: "杜门主隐蔽，不利于主动出击，可用于谈判守势。",
    en: "The Block Gate governs concealment — unfavorable for initiative, but usable for a defensive negotiating stance.",
    tw: "杜門主隱蔽，不利於主動出擊，可用於談判守勢。",
  },
  "惊门": {
    zh: "惊门主口舌是非，防合同纠纷、竞争对手背刺。",
    en: "The Fright Gate governs disputes — beware of contract conflicts and being undercut by competitors.",
    tw: "驚門主口舌是非，防合同糾紛、競爭對手背刺。",
  },
  "伤门": {
    zh: "伤门主伤损，不利于合作签约，防资金受损。",
    en: "The Harm Gate governs damage — unfavorable for partnerships and signing; guard against financial loss.",
    tw: "傷門主傷損，不利於合作簽約，防資金受損。",
  },
  "死门": {
    zh: "死门大凶，不宜动，防项目夭折、合同撕毁。",
    en: "The Death Gate is highly inauspicious — do not act; beware of failed projects and torn contracts.",
    tw: "死門大凶，不宜動，防項目夭折、合同撕毀。",
  },
};

export const TRAVEL_TIPS: Record<string, string> = {
  "北（坎宫）": "坎宫休门临之，往北出行吉，利于远途奔波，有贵人。",
  "西南（坤宫）": "坤宫主迟缓，往西南出行需防延误。",
  "东（震宫）": "震宫主动，往东出行利于开创、拓展。",
  "东南（巽宫）": "巽宫主顺遂，往东南出行文事大吉。",
  "西北（乾宫）": "乾宫主贵人、领导，往西北利于求助权贵。",
  "西（兑宫）": "兑宫主口舌，往西出行防言语纠纷。",
  "东北（艮宫）": "艮宫生门主生财，往东北出行利于求财。",
  "南（离宫）": "离宫景门主文书，往南利于文化传媒类事宜。",
};

// ===== 宫位对应方位 =====
export const GONG_FANGWEI: Record<number, string> = {
  1: "北", 2: "西南", 3: "东", 4: "东南",
  5: "中", 6: "西北", 7: "西", 8: "东北", 9: "南",
};

// ===== 地名经度数据（主要城市，用于真太阳时计算）=====
export interface CityCoord {
  name: string;
  lng: number; // 经度（东经为正）
  lat: number; // 纬度（北纬为正）
}

export const MAJOR_CITIES: CityCoord[] = [
  { name: "北京", lng: 116.4, lat: 39.9 },
  { name: "上海", lng: 121.5, lat: 31.2 },
  { name: "广州", lng: 113.3, lat: 23.1 },
  { name: "深圳", lng: 114.1, lat: 22.5 },
  { name: "杭州", lng: 120.2, lat: 30.3 },
  { name: "南京", lng: 118.8, lat: 32.1 },
  { name: "成都", lng: 104.1, lat: 30.7 },
  { name: "武汉", lng: 114.3, lat: 30.6 },
  { name: "西安", lng: 108.9, lat: 34.3 },
  { name: "重庆", lng: 106.6, lat: 29.6 },
  { name: "天津", lng: 117.2, lat: 39.1 },
  { name: "郑州", lng: 113.6, lat: 34.8 },
  { name: "沈阳", lng: 123.4, lat: 41.8 },
  { name: "哈尔滨", lng: 126.7, lat: 45.8 },
  { name: "长春", lng: 125.3, lat: 43.9 },
  { name: "济南", lng: 117.0, lat: 36.7 },
  { name: "青岛", lng: 120.4, lat: 36.1 },
  { name: "福州", lng: 119.3, lat: 26.1 },
  { name: "厦门", lng: 118.1, lat: 24.5 },
  { name: "昆明", lng: 102.7, lat: 25.0 },
  { name: "贵阳", lng: 106.6, lat: 26.6 },
  { name: "长沙", lng: 113.0, lat: 28.2 },
  { name: "合肥", lng: 117.3, lat: 31.9 },
  { name: "南昌", lng: 115.9, lat: 28.7 },
  { name: "太原", lng: 112.5, lat: 37.9 },
  { name: "石家庄", lng: 114.5, lat: 38.0 },
  { name: "呼和浩特", lng: 111.8, lat: 40.8 },
  { name: "银川", lng: 106.3, lat: 38.5 },
  { name: "兰州", lng: 103.8, lat: 36.1 },
  { name: "西宁", lng: 101.8, lat: 36.6 },
  { name: "乌鲁木齐", lng: 87.6, lat: 43.8 },
  { name: "拉萨", lng: 91.1, lat: 29.7 },
  { name: "南宁", lng: 108.3, lat: 22.8 },
  { name: "海口", lng: 110.3, lat: 20.0 },
  { name: "香港", lng: 114.2, lat: 22.3 },
  { name: "澳门", lng: 113.5, lat: 22.2 },
  { name: "台北", lng: 121.5, lat: 25.0 },
];

// ===== 天干加临关系表 =====
// 用于格局判断（天盘干 + 地盘干）
export const GAN_JIALING_GEJU: Record<string, string> = {
  "甲乙": "青龙返首",
  "丁乙": "飞鸟跌穴",
  "庚丙": "太白入荧",
  "丙庚": "荧入太白",
  "甲戊": "天乙伏宫",
  "戊甲": "天乙飞宫",
  "庚甲": "庚甲相犯，岁君临元，不利出行",
  "甲庚": "甲庚相冲，主口舌是非",
  "壬甲": "干上奇，上奇下仪，吉",
  "癸甲": "干上奇，吉",
};

// ===== 日时干支 → 旬首计算 =====
export function getXunShou(ganzhi: string): string {
  // 从六十甲子中找旬首
  const idx = JIAZI_60.indexOf(ganzhi);
  if (idx === -1) return "甲子";
  const xunStart = Math.floor(idx / 10) * 10;
  return JIAZI_60[xunStart] ?? "甲子";
}

// ===== 旬空判断 =====
export function isKong(zhi: string, riGanZhi: string): boolean {
  const xun = getXunShou(riGanZhi);
  const kongPair = XUN_KONG[xun];
  if (!kongPair) return false;
  return kongPair.includes(zhi);
}
