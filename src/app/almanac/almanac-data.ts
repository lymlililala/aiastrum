/**
 * 老黄历核心数据库
 * 干支、节气、宜忌事项、神煞、时辰、生肖等
 */

// ===== 天干地支 =====
export const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"] as const;
export const DI_ZHI  = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"] as const;

// ===== 生肖 =====
export const SHENG_XIAO = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"] as const;
export type ShengXiao = typeof SHENG_XIAO[number];

// 生肖对应地支索引（子=鼠，丑=牛…）
export const SHENGXIAO_ZHI: Record<ShengXiao, number> = {
  鼠: 0, 牛: 1, 虎: 2, 兔: 3, 龙: 4, 蛇: 5,
  马: 6, 羊: 7, 猴: 8, 鸡: 9, 狗: 10, 猪: 11,
};

// 相冲对（差6位互冲）
export const CHONG_PAIRS: Record<ShengXiao, ShengXiao> = {
  鼠: "马", 牛: "羊", 虎: "猴", 兔: "鸡", 龙: "狗", 蛇: "猪",
  马: "鼠", 羊: "牛", 猴: "虎", 鸡: "兔", 狗: "龙", 猪: "蛇",
};

// 三合（三合局互相吉利）
export const SANHE_GROUPS: ShengXiao[][] = [
  ["鼠", "龙", "猴"],
  ["牛", "蛇", "鸡"],
  ["虎", "马", "狗"],
  ["兔", "羊", "猪"],
];

// 六合
export const LIUHE_PAIRS: Record<ShengXiao, ShengXiao> = {
  鼠: "牛", 牛: "鼠", 虎: "猪", 兔: "狗", 龙: "鸡", 蛇: "猴",
  马: "羊", 羊: "马", 猴: "蛇", 鸡: "龙", 狗: "兔", 猪: "虎",
};

// ===== 节气 =====
export interface SolarTerm {
  name: string;
  month: number; // 公历月份（约数）
  day: number;   // 公历日（约数）
  desc: string;
}

export const SOLAR_TERMS: SolarTerm[] = [
  { name: "小寒", month: 1,  day: 6,  desc: "天气渐寒，万物收藏" },
  { name: "大寒", month: 1,  day: 20, desc: "一年中最冷的时节" },
  { name: "立春", month: 2,  day: 4,  desc: "春季开始，万象更新" },
  { name: "雨水", month: 2,  day: 19, desc: "降雨增多，气温回升" },
  { name: "惊蛰", month: 3,  day: 6,  desc: "春雷始鸣，蛰虫复苏" },
  { name: "春分", month: 3,  day: 21, desc: "昼夜等长，阴阳平衡" },
  { name: "清明", month: 4,  day: 5,  desc: "天清地明，祭祖踏青" },
  { name: "谷雨", month: 4,  day: 20, desc: "雨生百谷，播种时节" },
  { name: "立夏", month: 5,  day: 6,  desc: "夏季开始，气温升高" },
  { name: "小满", month: 5,  day: 21, desc: "小麦灌浆，麦粒渐满" },
  { name: "芒种", month: 6,  day: 6,  desc: "麦类收割，播种忙碌" },
  { name: "夏至", month: 6,  day: 21, desc: "一年白昼最长" },
  { name: "小暑", month: 7,  day: 7,  desc: "天气渐热，尚未酷暑" },
  { name: "大暑", month: 7,  day: 23, desc: "一年最热的时节" },
  { name: "立秋", month: 8,  day: 7,  desc: "秋季开始，暑气渐消" },
  { name: "处暑", month: 8,  day: 23, desc: "暑气结束，天气转凉" },
  { name: "白露", month: 9,  day: 8,  desc: "露凝而白，天气转凉" },
  { name: "秋分", month: 9,  day: 23, desc: "昼夜等长，秋高气爽" },
  { name: "寒露", month: 10, day: 8,  desc: "露气寒冷，百草将枯" },
  { name: "霜降", month: 10, day: 23, desc: "露水凝成霜，天气渐寒" },
  { name: "立冬", month: 11, day: 7,  desc: "冬季开始，万物收藏" },
  { name: "小雪", month: 11, day: 22, desc: "天气寒冷，降雪渐多" },
  { name: "大雪", month: 12, day: 7,  desc: "降雪增多，天气严寒" },
  { name: "冬至", month: 12, day: 22, desc: "一年白昼最短，阴极阳生" },
];

// ===== 宜忌事项 =====
export interface AlmanacEvent {
  key: string;
  name: string;
  category: "婚嫁" | "出行" | "财务" | "建造" | "祭祀" | "日常" | "农事";
  desc: string;  // 白话文解释
  icon: string;
}

export const ALMANAC_EVENTS: AlmanacEvent[] = [
  // 婚嫁类
  { key: "嫁娶",   name: "嫁娶",   category: "婚嫁", icon: "💍", desc: "适合婚嫁、举办婚礼，择此日成婚有益于夫妻感情和谐、白头偕老。" },
  { key: "订婚",   name: "订婚",   category: "婚嫁", icon: "💒", desc: "适合下聘礼、订婚，此日确立婚约，缘分长久。" },
  { key: "合帐",   name: "合帐",   category: "婚嫁", icon: "🛏", desc: "新婚夫妇合房、铺设婚床，适合此日进行。" },
  // 出行类
  { key: "出行",   name: "出行",   category: "出行", icon: "✈️", desc: "适合外出旅行、长途出差，此日出门诸事顺遂，平安归来。" },
  { key: "移徙",   name: "搬家",   category: "出行", icon: "🏠", desc: "适合搬家、乔迁新居，此日入住新家有利于家宅安宁、人丁兴旺。" },
  { key: "入宅",   name: "入宅",   category: "出行", icon: "🔑", desc: "新居落成后正式入住，选此日入宅可安稳家业、纳福迎祥。" },
  // 财务类
  { key: "开市",   name: "开业",   category: "财务", icon: "🏪", desc: "适合商铺开业、公司开张，此日起营业财源广进、生意兴隆。" },
  { key: "交易",   name: "签约",   category: "财务", icon: "📝", desc: "适合签订合同、买卖交易，此日成交有利于双方获益、合作顺利。" },
  { key: "纳财",   name: "纳财",   category: "财务", icon: "💰", desc: "适合收账、投资理财，此日财运亨通，进财顺畅。" },
  // 建造类
  { key: "动土",   name: "动土",   category: "建造", icon: "🔨", desc: "适合破土施工、盖房挖掘，此日动土地基稳固，施工顺利。" },
  { key: "修造",   name: "装修",   category: "建造", icon: "🏗", desc: "适合翻修房屋、室内装修，此日开工有利于工程顺利、住宅平安。" },
  { key: "安门",   name: "安门窗", category: "建造", icon: "🚪", desc: "适合安装大门、门窗，此日安门可辟邪纳福，家宅平安。" },
  { key: "安床",   name: "安床",   category: "建造", icon: "🛏", desc: "适合放置、移动卧床，此日安床有利于睡眠安稳、身体健康。" },
  // 祭祀类
  { key: "祭祀",   name: "祭祀",   category: "祭祀", icon: "🙏", desc: "适合拜神、祭祖，此日进行祭祀活动可得神明庇佑，祈福驱邪。" },
  { key: "祈福",   name: "祈福",   category: "祭祀", icon: "🌟", desc: "适合向神明许愿祈求，此日祈福心诚则灵，心愿易成。" },
  { key: "斋醮",   name: "做法事", category: "祭祀", icon: "🕯", desc: "适合举行宗教法事、斋戒祭典，此日进行效果更为灵验。" },
  // 日常类
  { key: "沐浴",   name: "沐浴",   category: "日常", icon: "🛁", desc: "适合洗头洗澡，此日净身可洗去晦气，焕发新运。" },
  { key: "理发",   name: "理发",   category: "日常", icon: "✂️", desc: "适合剪发、理容，此日整理仪容可提升气场、改变运势。" },
  { key: "求医",   name: "就医",   category: "日常", icon: "🏥", desc: "适合求医问诊，此日就医可得良医妙药，病情好转。" },
  { key: "开光",   name: "开光",   category: "日常", icon: "💫", desc: "适合为物件、饰品进行开光，使其具有灵气与保护力。" },
  // 农事类
  { key: "播种",   name: "播种",   category: "农事", icon: "🌱", desc: "适合播种育苗，此日播下的种子成活率高，生长旺盛。" },
  { key: "栽种",   name: "种植",   category: "农事", icon: "🌿", desc: "适合移栽花木，此日种下的植物根深叶茂、生机勃勃。" },
  { key: "牧养",   name: "饲养",   category: "农事", icon: "🐄", desc: "适合购置牲畜、开始饲养，此日起养殖六畜兴旺。" },
  // 忌讳类
  { key: "作灶",   name: "安灶",   category: "日常", icon: "🍳", desc: "不宜移动、安置厨灶，此日作灶恐引起家宅不宁、饮食不安。" },
  { key: "治病",   name: "治病",   category: "日常", icon: "💊", desc: "不宜看诊吃药，此日用药恐有反效果，建议另择吉日就医。" },
  { key: "词讼",   name: "打官司", category: "日常", icon: "⚖️", desc: "不宜兴讼、诉诸法律，此日纠纷难解，理不直说不清。" },
  { key: "赴任",   name: "上任",   category: "日常", icon: "💼", desc: "不宜赴任就职，此日新官上任恐难顺利，宜另择吉日。" },
];

// ===== 择日事项（用于择日筛选）=====
export interface SelectEvent {
  key: string;
  name: string;
  icon: string;
  color: string;
  requiredYi: string[];   // 需要"宜"包含的项
  avoidJi: string[];      // 需要"忌"不包含的项
}

export const SELECT_EVENTS: SelectEvent[] = [
  {
    key: "marriage", name: "结婚/订婚", icon: "💍", color: "#E91E8C",
    requiredYi: ["嫁娶", "订婚"], avoidJi: ["嫁娶"],
  },
  {
    key: "moving", name: "搬家/入宅", icon: "🏠", color: "#2196F3",
    requiredYi: ["移徙", "入宅"], avoidJi: ["移徙"],
  },
  {
    key: "business", name: "开业/签约", icon: "🏪", color: "#FF9800",
    requiredYi: ["开市", "交易"], avoidJi: ["开市"],
  },
  {
    key: "renovation", name: "装修/动土", icon: "🔨", color: "#795548",
    requiredYi: ["动土", "修造"], avoidJi: ["动土"],
  },
  {
    key: "travel", name: "出行/旅游", icon: "✈️", color: "#00BCD4",
    requiredYi: ["出行"], avoidJi: ["出行"],
  },
  {
    key: "worship", name: "祭祀/祈福", icon: "🙏", color: "#9C27B0",
    requiredYi: ["祭祀", "祈福"], avoidJi: [],
  },
];

// ===== 时辰定义 =====
export interface HourPeriod {
  name: string;   // 时辰名
  zhi: string;    // 地支
  startHour: number;
  endHour: number;
  animal: ShengXiao;
}

export const HOUR_PERIODS: HourPeriod[] = [
  { name: "子时", zhi: "子", startHour: 23, endHour: 1,  animal: "鼠" },
  { name: "丑时", zhi: "丑", startHour: 1,  endHour: 3,  animal: "牛" },
  { name: "寅时", zhi: "寅", startHour: 3,  endHour: 5,  animal: "虎" },
  { name: "卯时", zhi: "卯", startHour: 5,  endHour: 7,  animal: "兔" },
  { name: "辰时", zhi: "辰", startHour: 7,  endHour: 9,  animal: "龙" },
  { name: "巳时", zhi: "巳", startHour: 9,  endHour: 11, animal: "蛇" },
  { name: "午时", zhi: "午", startHour: 11, endHour: 13, animal: "马" },
  { name: "未时", zhi: "未", startHour: 13, endHour: 15, animal: "羊" },
  { name: "申时", zhi: "申", startHour: 15, endHour: 17, animal: "猴" },
  { name: "酉时", zhi: "酉", startHour: 17, endHour: 19, animal: "鸡" },
  { name: "戌时", zhi: "戌", startHour: 19, endHour: 21, animal: "狗" },
  { name: "亥时", zhi: "亥", startHour: 21, endHour: 23, animal: "猪" },
];

// ===== 黄道吉日 =====
// 建除十二神：建、除、满、平、定、执、破、危、成、收、开、闭
export const JIAN_CHU_12 = ["建", "除", "满", "平", "定", "执", "破", "危", "成", "收", "开", "闭"] as const;

// 黄道：除、危、定、执、成、开（吉）
// 黑道：建、满、平、破、收、闭（凶）
export const HUANGDAO_JI = new Set(["除", "危", "定", "执", "成", "开"]);
export const HEIDAO_XIONG = new Set(["建", "满", "平", "破", "收", "闭"]);

// ===== 彭祖百忌（天干/地支各对应的禁忌）=====
export const PENGZU_TIANGAN: Record<string, string> = {
  甲: "甲不开仓，财物耗散",
  乙: "乙不栽植，千株不长",
  丙: "丙不修灶，必见灾殃",
  丁: "丁不剃头，头主不祥",
  戊: "戊不受田，田主不祥",
  己: "己不破券，二比并亡",
  庚: "庚不经络，织机虚张",
  辛: "辛不合酱，主人不尝",
  壬: "壬不泱水，更难提防",
  癸: "癸不词讼，理弱敌强",
};

export const PENGZU_DIZHI: Record<string, string> = {
  子: "子不问卜，自惹祸殃",
  丑: "丑不冠带，主不还乡",
  寅: "寅不祭祀，神鬼不尝",
  卯: "卯不穿井，水泉不香",
  辰: "辰不哭泣，必主重丧",
  巳: "巳不远行，财物伏藏",
  午: "午不苫盖，屋主更张",
  未: "未不服药，毒气入肠",
  申: "申不安床，鬼祟入房",
  酉: "酉不会客，醉坐颠狂",
  戌: "戌不吃犬，作怪上床",
  亥: "亥不嫁娶，不利新郎",
};

// ===== 吉神方位基础规则 =====
// 财神方位基于月令（简化：以月支推算）
export const CAISHEN_DIRECTION: Record<string, string> = {
  子: "正北", 丑: "东北", 寅: "正东", 卯: "东南",
  辰: "正南", 巳: "正南", 午: "正南", 未: "西南",
  申: "正西", 酉: "西北", 戌: "正北", 亥: "东北",
};

export const XISHEN_DIRECTION: Record<string, string> = {
  子: "东南", 丑: "正东", 寅: "东北", 卯: "正北",
  辰: "西北", 巳: "正西", 午: "西南", 未: "正南",
  申: "东南", 酉: "正东", 戌: "东北", 亥: "正北",
};

// ===== 宜忌组合规则（按建除十二神）=====
// 不同的建除值对应不同的基础宜忌
export const JIANSHEN_YIJI: Record<string, { yi: string[]; ji: string[] }> = {
  建: {
    yi: ["祭祀", "祈福", "出行", "开市", "交易", "求医"],
    ji: ["嫁娶", "动土", "移徙", "安床", "修造"],
  },
  除: {
    yi: ["沐浴", "理发", "祭祀", "求医", "出行", "嫁娶"],
    ji: ["作灶", "安门", "修造"],
  },
  满: {
    yi: ["嫁娶", "移徙", "开市", "纳财", "祈福", "栽种"],
    ji: ["词讼", "动土", "破土"],
  },
  平: {
    yi: ["出行", "交易", "纳财", "祭祀", "开市"],
    ji: ["嫁娶", "动土", "安床"],
  },
  定: {
    yi: ["嫁娶", "开市", "移徙", "动土", "祈福", "出行", "纳财"],
    ji: ["词讼", "安葬"],
  },
  执: {
    yi: ["祭祀", "祈福", "求医", "栽种", "牧养"],
    ji: ["嫁娶", "开市", "移徙", "出行"],
  },
  破: {
    yi: ["求医", "词讼"],
    ji: ["嫁娶", "动土", "移徙", "开市", "出行", "安床", "纳财"],
  },
  危: {
    yi: ["祭祀", "祈福", "动土", "开市", "交易"],
    ji: ["出行", "移徙"],
  },
  成: {
    yi: ["嫁娶", "开市", "移徙", "动土", "出行", "祈福", "纳财", "栽种"],
    ji: ["词讼", "治病"],
  },
  收: {
    yi: ["纳财", "栽种", "牧养", "理发"],
    ji: ["嫁娶", "出行", "移徙"],
  },
  开: {
    yi: ["嫁娶", "开市", "移徙", "出行", "纳财", "动土", "祭祀", "祈福"],
    ji: ["安葬", "作灶"],
  },
  闭: {
    yi: ["祭祀", "安门", "作灶"],
    ji: ["嫁娶", "出行", "移徙", "开市", "求医"],
  },
};

// ===== 传统节日 =====
export interface TraditionalFestival {
  lunarMonth: number;
  lunarDay: number;
  name: string;
  desc: string;
}

export const LUNAR_FESTIVALS: TraditionalFestival[] = [
  { lunarMonth: 1,  lunarDay: 1,  name: "春节", desc: "农历新年，最重要的传统节日" },
  { lunarMonth: 1,  lunarDay: 15, name: "元宵节", desc: "赏花灯猜灯谜，吃元宵" },
  { lunarMonth: 2,  lunarDay: 2,  name: "龙抬头", desc: "龙头节，剃头迎祥瑞" },
  { lunarMonth: 4,  lunarDay: 4,  name: "清明节", desc: "扫墓祭祖，踏青游春" },
  { lunarMonth: 5,  lunarDay: 5,  name: "端午节", desc: "赛龙舟、吃粽子，驱邪纳福" },
  { lunarMonth: 7,  lunarDay: 7,  name: "七夕节", desc: "牛郎织女相会，乞巧节" },
  { lunarMonth: 7,  lunarDay: 15, name: "中元节", desc: "鬼节，祭祖祀鬼" },
  { lunarMonth: 8,  lunarDay: 15, name: "中秋节", desc: "赏月团圆，吃月饼" },
  { lunarMonth: 9,  lunarDay: 9,  name: "重阳节", desc: "登高赏菊，敬老尊贤" },
  { lunarMonth: 12, lunarDay: 8,  name: "腊八节", desc: "喝腊八粥，祈福丰收" },
  { lunarMonth: 12, lunarDay: 23, name: "小年", desc: "祭灶神，扫尘迎新" },
  { lunarMonth: 12, lunarDay: 30, name: "除夕", desc: "守岁团圆，辞旧迎新" },
];

// ===== 星期 =====
export const WEEK_DAYS = ["日", "一", "二", "三", "四", "五", "六"] as const;

// ===== 综合评分权重 =====
export const SCORE_WEIGHTS = {
  huangdao: 2.0,    // 黄道吉日 +2
  heidao: -2.0,     // 黑道凶日 -2
  yiCount: 0.3,     // 每个宜事项 +0.3
  jiCount: -0.2,    // 每个忌事项 -0.2
  festival: 0.5,    // 传统节日 +0.5
  sanhe: 1.0,       // 三合生肖 +1
  liuhe: 0.5,       // 六合生肖 +0.5
  chong: -3.0,      // 相冲生肖 -3
};

// ===== 宜忌详情文字说明 =====
export const YI_TIPS: Record<string, string> = {
  嫁娶: "吉日良辰，此日嫁娶婚配最为相宜，夫妻恩爱，家道兴旺。",
  开市: "财星高照，此日开张营业必迎财源，生意兴隆通四海。",
  移徙: "此日迁居入新家，地气相合，家宅安宁，人丁旺盛。",
  动土: "土气得令，此日动土施工，地基稳固，工程顺利。",
  出行: "此日外出远行一路平安，逢凶化吉，顺风顺水。",
  祈福: "神明感应，此日斋心祈福，心诚则灵，愿望易成真。",
  祭祀: "此日祭祀神明先祖，礼仪完备，保佑平安顺遂。",
  纳财: "财运亨通，此日收账投资，进财顺畅，积累财富。",
  修造: "此日装修建造，五行得助，工事顺利，住宅平安。",
};

// ===== 分享文案 =====
export const SHARE_TITLES = [
  "我找到了一个超棒的吉日，分享给你看看！",
  "黄历推荐：这天天时地利，宜谋大事！",
  "为你找到了命中注定的好日子 ✨",
];
