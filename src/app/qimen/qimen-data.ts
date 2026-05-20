// ===== 奇门遁甲 · 数据层 =====
// 包含所有静态数据：符号、星神门、节气、宫位信息

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

// ===== 八门 =====
export const BA_MEN = ["休门", "死门", "伤门", "杜门", "开门", "惊门", "生门", "景门"] as const;
export type BaMen = (typeof BA_MEN)[number];

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

// 宫位序号到索引（宫序1-9，用于数组操作）
export function gongToIdx(gong: number): number {
  return gong - 1;
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
export const BUSINESS_TIPS: Record<string, string> = {
  "开门": "开门为第一吉门，利于谈判、签约、扩张。",
  "生门": "生门主生财旺财，为出行求财、启动新业务之首选。",
  "休门": "休门主休养调整，适合签合同、收款结账。",
  "景门": "景门主文书、宣传，利于广告营销、媒体合作。",
  "杜门": "杜门主隐蔽，不利于主动出击，可用于谈判守势。",
  "惊门": "惊门主口舌是非，防合同纠纷、竞争对手背刺。",
  "伤门": "伤门主伤损，不利于合作签约，防资金受损。",
  "死门": "死门大凶，不宜动，防项目夭折、合同撕毁。",
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
