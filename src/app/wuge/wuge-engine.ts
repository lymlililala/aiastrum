/**
 * 姓名五格剖象法计算引擎
 * 严格按照传统五格剖象法规则计算
 */

import { getKangxiStrokes, getNameStrokes } from "./wuge-strokes";

export interface WugeInput {
  name: string;
  gender: "male" | "female";
}

export interface WugeGe {
  strokes: number;       // 笔画数
  level: "大吉" | "吉" | "半吉" | "凶" | "大凶"; // 吉凶等级
  score: number;         // 分值 0-100
  title: string;         // 运势标题（如"首领运"）
  shortDesc: string;     // 简短描述
  fullDesc: string;      // 完整描述
}

export interface WugeResult {
  name: string;
  gender: "male" | "female";
  chars: string[];           // 姓名各字
  strokes: number[];         // 各字笔画
  isSingleSurname: boolean;  // 是否单姓
  isSingleName: boolean;     // 是否单名
  tian: WugeGe;  // 天格
  ren: WugeGe;   // 人格（主运）
  di: WugeGe;    // 地格（前运）
  wai: WugeGe;   // 外格（副运）
  zong: WugeGe;  // 总格（后运）
  score: number;             // 综合分数
  scoreLevel: string;        // 综合评价
  sanCai: string;            // 三才配置（天地人）
  sanCaiDesc: string;        // 三才解析
  personality: string;       // 性格特征
  career: string;            // 事业运势
  love: string;              // 感情婚姻
  health: string;            // 健康运势
  specialTags: string[];     // 特殊运势标签
}

// ===== 81数理吉凶基础数据 =====
// 每个数对应：[level, score, title, shortDesc]
type NumInfo = [string, number, string, string];
const NUM_INFO: Record<number, NumInfo> = {
  1:  ["大吉", 95, "太极数 · 开创", "万物之始，独立奋斗，创业成功之数"],
  2:  ["凶",   35, "两仪数 · 离散", "动摇不安，孤独困苦，须防分离"],
  3:  ["大吉", 88, "三才数 · 进取", "天地人合，学识兼具，前途光明"],
  4:  ["凶",   30, "四象数 · 险难", "辛苦奔波，多难之命，意志须坚"],
  5:  ["大吉", 85, "五行数 · 福寿", "阴阳调和，健康长寿，福德兼备"],
  6:  ["大吉", 90, "六合数 · 安泰", "天地和合，吉星高照，家业昌隆"],
  7:  ["吉",   75, "七政数 · 精进", "刚毅勇猛，独立精进，稳健发展"],
  8:  ["吉",   78, "八卦数 · 坚毅", "意志坚强，努力不懈，后天得志"],
  9:  ["凶",   28, "九星数 · 窘困", "献身精神强，但常感孤独，需防末路"],
  10: ["凶",   25, "零宿数 · 空虚", "虚数，内心空虚，须慎防无所为"],
  11: ["大吉", 88, "进俊数 · 兴盛", "刚柔兼备，进退自如，前途无量"],
  12: ["凶",   32, "薄弱数 · 努力", "薄弱之运，若非强志，易于依赖"],
  13: ["大吉", 87, "博学数 · 才智", "智慧聪颖，才华横溢，博学多识"],
  14: ["凶",   30, "离散数 · 波折", "浮沉多变，离散多端，勤勉可免"],
  15: ["大吉", 92, "福寿数 · 圆满", "君子之风，领导力强，福禄双全"],
  16: ["大吉", 90, "贵人数 · 得助", "德望兼具，贵人相助，财运亨通"],
  17: ["吉",   76, "健强数 · 刚健", "意志坚定，勇于进取，自强不息"],
  18: ["吉",   80, "发展数 · 兴旺", "积极向上，充满活力，成功发展"],
  19: ["凶",   30, "苦难数 · 辛苦", "志大才高，但命运坎坷，苦尽甘来"],
  20: ["凶",   28, "虚弱数 · 空名", "有名无实，空有其志，须防空想"],
  21: ["大吉", 90, "首领数 · 权威", "领导才能卓越，威信颇高，受众尊崇"],
  22: ["凶",   22, "秋草数 · 蹇难", "中途蹇碍，苦难颇多，命运多磨"],
  23: ["大吉", 88, "壮丽数 · 权威", "权威显赫，事业昌旺，名利双收"],
  24: ["大吉", 85, "恒顺数 · 积财", "家业兴旺，财源广进，子孙绵绵"],
  25: ["吉",   72, "安稳数 · 英俊", "英雄豪气，处世安稳，有成功运"],
  26: ["凶",   32, "英雄数 · 变怪", "英勇而多障，变化无常，逢难须坚"],
  27: ["吉",   70, "中吉数 · 增长", "秉性刚直，志虑深远，有成功运"],
  28: ["凶",   25, "波澜数 · 苦战", "波澜多磨，苦战一生，需防孤独"],
  29: ["大吉", 87, "智谋数 · 成功", "智慧超群，刚柔并济，晚年成功"],
  30: ["半吉", 55, "浮沉数 · 不定", "吉凶各半，浮沉不定，需靠自强"],
  31: ["大吉", 88, "兴旺数 · 德望", "德望兼备，经济繁荣，家族昌盛"],
  32: ["大吉", 88, "侥幸数 · 奇遇", "意外好运，贵人频至，侥幸成功"],
  33: ["大吉", 85, "旺盛数 · 升腾", "名实兼具，旺盛有力，声名远播"],
  34: ["大凶", 10, "破灭数 · 险难", "破灭之象，多灾多难，需谨言慎行"],
  35: ["吉",   73, "温和数 · 平安", "温柔和顺，平安幸福，家庭美满"],
  36: ["凶",   30, "波澜数 · 英雄", "义侠之心，但多波折，需防意外"],
  37: ["大吉", 85, "精神数 · 品格", "品格高尚，精神出众，受人尊重"],
  38: ["吉",   68, "文艺数 · 艺能", "艺术才华，文采斐然，技艺超群"],
  39: ["大吉", 88, "长寿数 · 安泰", "智谋双全，安稳长寿，德才兼备"],
  40: ["凶",   28, "无常数 · 变幻", "智慧虽高，运途多变，成败难料"],
  41: ["大吉", 90, "高明数 · 德望", "德高望重，才华出众，功成名就"],
  42: ["半吉", 52, "两才数 · 努力", "多种才能，各有所长，需专一发展"],
  43: ["凶",   28, "散漫数 · 逆境", "散漫无力，逆境重重，需靠坚忍"],
  44: ["凶",   25, "摧折数 · 苦难", "苦难频繁，逆境困顿，意志须强"],
  45: ["大吉", 85, "大智数 · 顺风", "智慧超群，一帆风顺，晚年富贵"],
  46: ["凶",   27, "逆难数 · 坎坷", "坎坷艰辛，磨难多端，晚年转好"],
  47: ["大吉", 83, "开花数 · 盛开", "鲜花盛放，春风得意，前途光明"],
  48: ["大吉", 82, "有德数 · 财富", "品德高尚，财富兴盛，德财兼备"],
  49: ["半吉", 53, "隐变数 · 阴阳", "阴阳参半，运势起伏，需持中正"],
  50: ["凶",   27, "泥中数 · 困境", "困境缠身，如陷泥中，需奋力突破"],
  51: ["半吉", 52, "阴阳数 · 起伏", "兴衰交替，有成有败，平心静气"],
  52: ["大吉", 82, "慧明数 · 成功", "慧眼独具，前途无量，终获成功"],
  53: ["半吉", 50, "进退数 · 起伏", "进退两难，时运不稳，需守正道"],
  54: ["凶",   22, "贫苦数 · 窘迫", "穷困潦倒，一生辛苦，需防自怨"],
  55: ["半吉", 54, "未来数 · 不安", "未定之运，内心不安，须静待时机"],
  56: ["凶",   28, "蹇难数 · 波折", "事多不遂，困难频出，须防失意"],
  57: ["吉",   71, "好运数 · 积累", "积累渐进，晚运兴旺，耐性可成"],
  58: ["吉",   72, "后得数 · 晚发", "晚运亨通，脱胎换骨，终得圆满"],
  59: ["凶",   26, "暗淡数 · 失意", "运途暗淡，失意颇多，须防自弃"],
  60: ["凶",   24, "迷惑数 · 混沌", "意志不定，前途迷茫，需寻明路"],
  61: ["大吉", 83, "光明数 · 吉辉", "德惠广被，光辉灿烂，吉祥如意"],
  62: ["凶",   26, "衰弱数 · 困苦", "运势衰微，困苦重重，须防萎靡"],
  63: ["大吉", 85, "发展数 · 顺遂", "万事顺遂，吉祥如意，阳光大道"],
  64: ["凶",   22, "平地数 · 困难", "平地起风波，困难突袭，须谨慎"],
  65: ["大吉", 82, "兴隆数 · 光明", "光明大道，兴旺发达，福运绵绵"],
  66: ["凶",   24, "衰退数 · 下坡", "运途下坡，渐趋衰退，须防颓废"],
  67: ["大吉", 80, "好运数 · 成功", "运势向好，事业有成，生活美满"],
  68: ["大吉", 82, "明智数 · 发达", "明智处世，兴旺发达，家庭幸福"],
  69: ["凶",   24, "终末数 · 暗淡", "终末之运，多有遗憾，须早图谋"],
  70: ["凶",   22, "空洞数 · 虚弱", "精神空洞，缺乏活力，须积极进取"],
  71: ["半吉", 52, "半吉数 · 各异", "吉凶各占，因人而异，需自求多福"],
  72: ["凶",   26, "上下数 · 倒悬", "运势起伏，倒悬之苦，须修身养性"],
  73: ["吉",   70, "平稳数 · 吉庆", "平稳顺遂，吉庆有余，生活安乐"],
  74: ["凶",   22, "失运数 · 暗淡", "运势暗淡，多有失意，须重振精神"],
  75: ["半吉", 52, "迷途数 · 平淡", "运途平淡，偶有迷茫，需寻正路"],
  76: ["凶",   23, "破碎数 · 孤苦", "破碎孤苦，离散之命，须寻精神支柱"],
  77: ["半吉", 55, "阴阳数 · 不定", "吉中带凶，运途不定，须持中正"],
  78: ["半吉", 53, "有终数 · 清雅", "清雅之运，有始有终，平淡中知足"],
  79: ["凶",   24, "末路数 · 困窘", "末路艰辛，须防困境，重整旗鼓"],
  80: ["凶",   22, "无功数 · 收缩", "有始无终，收缩之运，须重燃斗志"],
  81: ["大吉", 92, "还本数 · 圆满", "还原归本，圆满之象，福禄双全"],
};

/**
 * 获取数理信息（超过81则取尾数，但有特殊规则）
 */
function getNumInfo(n: number): NumInfo {
  if (n <= 0) return ["凶", 20, "零数", "缺乏活力"];
  if (n <= 81) return NUM_INFO[n] ?? ["半吉", 50, "未知数", "需综合分析"];
  // 超过81，取81的余数（循环使用）
  const rem = n % 81;
  return NUM_INFO[rem === 0 ? 81 : rem] ?? ["半吉", 50, "未知数", "需综合分析"];
}

/**
 * 构建 WugeGe 对象
 */
function buildGe(strokes: number, fullDescFn: (n: number) => string): WugeGe {
  const effectiveN = strokes <= 81 ? strokes : (strokes % 81 === 0 ? 81 : strokes % 81);
  const [levelStr, score, title, shortDesc] = getNumInfo(strokes);
  const level = levelStr as WugeGe["level"];

  return {
    strokes,
    level,
    score,
    title,
    shortDesc,
    fullDesc: fullDescFn(effectiveN),
  };
}

/**
 * 获取五格的完整描述
 */
function getTianFullDesc(n: number): string {
  const infos: Record<number, string> = {
    2: "天格2，祖上缘分薄，先天基础较弱，但凭自身努力可以改变命运。",
    3: "天格3，先天根基稳固，家族有一定积累，少年时期受益良多。",
    4: "天格4，祖上缘薄，早年辛苦，但只要自强不息，后天可以弥补。",
    5: "天格5，先天基础扎实，家族背景良好，可得祖上庇荫。",
    6: "天格6，家族根基深厚，天时地利俱佳，是承前启后的好格局。",
    7: "天格7，先天略带刚气，独立自主意识强，家族给予精神财富。",
    8: "天格8，先天坚韧，家族背景中等，需靠个人努力开拓局面。",
  };
  return infos[n] ?? `天格${n}画，${NUM_INFO[n]?.[3] ?? "综合运势"}。先天之格，受祖先庇荫，为整体运势的根基。`;
}

function getRenFullDesc(n: number): string {
  const infos: Record<number, string> = {
    5: "人格5，五行调和，品格端正，处世圆融，善于协调各方关系，中年运势平稳向好。",
    6: "人格6，仁义之心，贵人频至，人际关系优秀，中年事业多得助力，感情和谐。",
    7: "人格7，意志刚健，自力更生，处事果断，中年凭实力稳步发展，财运逐渐旺盛。",
    8: "人格8，坚忍卓绝，虽有挫折，但终能厚积薄发，中年事业稳固，财运中等偏上。",
    11: "人格11，刚柔并济，进退有据，中年运势渐入佳境，事业稳步攀升。",
    13: "人格13，才智出众，博学多识，处事精明，中年事业光辉，名声渐起。",
    15: "人格15，仁德兼备，领导力强，广结善缘，中年运势大旺，财富与声誉双收。",
    16: "人格16，处世温和，得众人信赖，贵人如云，中年事业腾飞。",
    21: "人格21，首领之格，统御力强，中年后成就卓越，受人敬仰。",
    23: "人格23，威权显赫，名利双收，中年大展宏图，事业如日中天。",
    24: "人格24，财源广进，家业兴旺，中年积累丰厚，生活富足。",
    31: "人格31，德才兼备，广受爱戴，中年事业蒸蒸日上，家族繁荣。",
    32: "人格32，贵人频至，好运连连，中年多有意外惊喜，事业顺风顺水。",
    33: "人格33，名声显赫，气场强大，中年声誉远播，能量充沛。",
    37: "人格37，人品出众，精神充沛，中年凭实力获得广泛尊重。",
    39: "人格39，智慧与健康兼备，中年安稳，晚年尤为顺遂。",
    41: "人格41，德高望重，处世高明，中年事业达到顶峰。",
  };
  return infos[n] ?? `人格${n}画，${NUM_INFO[n]?.[3] ?? "综合运势"}。人格为主运之格，决定核心性格与中年事业发展走向，是五格中最重要的一格。`;
}

function getDiFullDesc(n: number): string {
  return `地格${n}画，${NUM_INFO[n]?.[3] ?? "综合运势"}。地格主前运，代表36岁前的命运走向、家庭环境和童年际遇。${
    (NUM_INFO[n]?.[0] === "大吉" || NUM_INFO[n]?.[0] === "吉") 
      ? "青少年时期运势良好，家庭和睦，学业顺利，为日后发展打下坚实基础。"
      : "早年可能经历一些波折，但正是这些磨砺让你在逆境中成长，为中年积蓄力量。"
  }`;
}

function getWaiFullDesc(n: number): string {
  return `外格${n}画，${NUM_INFO[n]?.[3] ?? "综合运势"}。外格主副运，代表社交人脉、贵人相助和外部机缘。${
    (NUM_INFO[n]?.[0] === "大吉" || NUM_INFO[n]?.[0] === "吉")
      ? "人际关系出色，贵人缘极好，善于在社交场合展示自我，外部助力不断。"
      : "社交运势平平，贵人缘较薄，凡事多靠自身努力，需主动建立人脉圈。"
  }`;
}

function getZongFullDesc(n: number): string {
  return `总格${n}画，${NUM_INFO[n]?.[3] ?? "综合运势"}。总格主后运，代表36岁后乃至晚年的整体命运走向，是人生下半场的总体气象。${
    (NUM_INFO[n]?.[0] === "大吉" || NUM_INFO[n]?.[0] === "吉")
      ? "晚年运势旺盛，事业财富皆有所成，享受人生果实，家庭幸福美满。"
      : "晚年需注意守成，减少冒进，以稳健态度处理事务，方可安享晚年。"
  }`;
}

/**
 * 三才配置分析（天地人）
 */
function analyzeSanCai(tianStrokes: number, renStrokes: number, diStrokes: number): { config: string; desc: string } {
  const t = tianStrokes % 5 === 0 ? 5 : tianStrokes % 5; // 1水2木3火4土5金
  const r = renStrokes % 5 === 0 ? 5 : renStrokes % 5;
  const d = diStrokes % 5 === 0 ? 5 : diStrokes % 5;

  const elementMap: Record<number, string> = { 1: "水", 2: "木", 3: "火", 4: "土", 5: "金" };
  const tEl = elementMap[t] ?? "土";
  const rEl = elementMap[r] ?? "土";
  const dEl = elementMap[d] ?? "土";

  const config = `${tEl}${rEl}${dEl}`;

  // 简化三才判断
  const goodCombos = ["水木火", "木火土", "火土金", "土金水", "金水木", "水水木", "木木火", "火火土"];
  const badCombos = ["木土木", "土水土", "火金火", "金木金", "水火水", "金火木"];

  let desc = "";
  if (goodCombos.includes(config)) {
    desc = `三才${config}，相生相扶，运势顺遂，事业与家庭皆得天时地利人和之助。`;
  } else if (badCombos.includes(config)) {
    desc = `三才${config}，存在相克因素，运势有些曲折，但凭借个人德行与努力，可以化解不利。`;
  } else {
    desc = `三才${config}，格局中正，运势平稳，凡事宜中庸处世，守正待时。`;
  }

  return { config, desc };
}

/**
 * 获取特殊运势标签
 */
function getSpecialTags(ren: number, zong: number, di: number): string[] {
  const tags: string[] = [];

  // 基于人格数理的特殊标签
  if ([1, 21, 23, 33, 41, 45].includes(ren)) tags.push("领袖运");
  if ([13, 15, 21, 29, 41, 45, 52, 63].includes(ren)) tags.push("智慧运");
  if ([6, 15, 16, 24, 31, 32, 41, 52].includes(ren)) tags.push("财富运");
  if ([5, 6, 15, 35, 39, 45, 61, 63, 65].includes(ren)) tags.push("福寿运");
  if ([13, 17, 21, 23, 25, 33, 37, 41].includes(ren)) tags.push("事业运");
  if ([38, 39, 47, 48].includes(ren)) tags.push("艺能运");
  if ([15, 16, 32, 37, 41, 45, 47, 52].includes(ren)) tags.push("贵人运");
  if ([6, 11, 15, 16, 31, 32, 35, 39].includes(ren)) tags.push("家庭运");
  if ([2, 9, 10, 19, 20, 22, 28, 34].includes(ren)) tags.push("孤独运");
  if ([3, 5, 6, 15, 16, 21, 31, 32, 41].includes(zong)) tags.push("晚年吉");
  if ([6, 11, 13, 16, 24, 31, 32].includes(di)) tags.push("青年顺");

  return [...new Set(tags)].slice(0, 5);
}

/**
 * 基于人格数计算性格特征
 */
function getPersonalityDesc(renStrokes: number, gender: "male" | "female"): string {
  const n = renStrokes;
  const gStr = gender === "male" ? "你" : "你";

  if ([1, 21, 23, 33, 41].includes(n)) {
    return `${gStr}天生具有领袖气质，意志坚定，独立进取。对目标有强烈的执着，擅长统筹规划，在团队中自然成为核心。性格上可能略显强势，但内心真诚，值得信赖。`;
  }
  if ([6, 15, 16, 35, 39, 65].includes(n)) {
    return `${gStr}为人温和仁厚，广结善缘，重情重义。处世圆融，善于化解矛盾，是身边人眼中的"定海神针"。感情细腻，对家人朋友充满关爱，生活态度积极向上。`;
  }
  if ([13, 24, 29, 32, 52, 63].includes(n)) {
    return `${gStr}聪慧灵活，思维敏捷，学习能力超强。善于抓住机遇，在商业和社交上有天然优势。有时略显多虑，但这也是深思熟虑的体现。能快速适应变化，化挑战为机遇。`;
  }
  if ([7, 8, 17, 18, 25].includes(n)) {
    return `${gStr}意志坚强，踏实刻苦，不折不挠。凡事认真负责，追求完美，执行力极强。不善花言巧语，以实际行动证明自己的价值。虽然有时显得固执，但这份坚持正是成功的密码。`;
  }
  if ([38, 47, 48].includes(n)) {
    return `${gStr}富有艺术气质，敏感而有创造力，对美有独特的感受力。在文学、艺术、音乐方面有天赋，情感丰富细腻，擅长用独特的方式表达自我。`;
  }
  // 默认性格描述
  const lastDigit = n % 10;
  if ([1, 2].includes(lastDigit)) return `${gStr}性格偏于领导型，独立自主，有主见，遇事能快速决断，但有时会显得不够灵活。`;
  if ([3, 4].includes(lastDigit)) return `${gStr}思维活跃，社交能力强，善于表达，在人际关系方面游刃有余，朋友圈广泛。`;
  if ([5, 6].includes(lastDigit)) return `${gStr}处世平和，脚踏实地，做事有条理，是可靠的合作伙伴，家庭观念重，重视和谐。`;
  if ([7, 8].includes(lastDigit)) return `${gStr}意志刚毅，勤奋努力，不轻易放弃，凭借坚持和努力，往往能在中后期获得丰厚回报。`;
  return `${gStr}内心丰富，思路清晰，处事灵活，能因地制宜、因时制宜地调整策略，具有较强的适应能力。`;
}

function getCareerDesc(renStrokes: number, zongStrokes: number): string {
  const ren = renStrokes;
  const zong = zongStrokes;

  const renLevel = getNumInfo(ren)[0];
  const zongLevel = getNumInfo(zong)[0];

  if ((renLevel === "大吉" || renLevel === "吉") && (zongLevel === "大吉" || zongLevel === "吉")) {
    return "事业运势强劲，中年开始逐渐发力，在所从事的领域内能够建立声誉与地位。适合从事需要领导力或创造力的工作，与上司及同事关系融洽，得到提携的机会多。晚年事业成就斐然，可享受努力的丰厚果实。";
  }
  if (renLevel === "大吉" || renLevel === "吉") {
    return "中年事业稳步发展，凭借个人才华和人格魅力，在职场中逐渐站稳脚跟。虽然晚年需要注意守成，但前期积累的资源和人脉足以支撑稳定的生活。";
  }
  if (zongLevel === "大吉" || zongLevel === "吉") {
    return "早年可能有些曲折，但不要气馁，因为晚运旺盛是你人生的重要特质。中年后随着阅历积累和人脉建立，事业会明显好转，晚年达到人生的高光时刻。";
  }
  return "事业需要靠自身持续努力来开拓，虽无大富大贵之象，但凭借踏实认真的态度，也能在本职岗位上做出成绩，赢得周围人的尊重。";
}

function getLoveDesc(renStrokes: number, diStrokes: number, gender: "male" | "female"): string {
  const ren = renStrokes;
  const di = diStrokes;
  const renLevel = getNumInfo(ren)[0];
  const gStr = gender === "male" ? "你" : "你";

  if (renLevel === "大吉" || renLevel === "吉") {
    return `${gStr}感情运势良好，魅力自然，容易吸引到优质的伴侣。婚姻生活和谐美满，家庭氛围温馨，与伴侣能够相互理解扶持。有子女缘，家庭会给你带来极大的幸福感。`;
  }
  if ([2, 9, 19, 22, 28, 34, 44].includes(ren)) {
    return `${gStr}感情路上可能有些波折，容易经历分离或误解，需要更多的包容与沟通。建议在感情中保持耐心，少一些理想化，多一些务实，真诚相待才能找到真正契合的伴侣。`;
  }
  return `${gStr}感情平稳，婚姻以稳定为主，虽无轰轰烈烈，却有细水长流的温情。珍惜身边的伴侣，用心经营感情，家庭会成为你最坚实的避风港。`;
}

function getHealthDesc(tianStrokes: number, renStrokes: number): string {
  const ren = renStrokes;
  const renLevel = getNumInfo(ren)[0];

  if (renLevel === "大吉") {
    return "健康运势旺盛，体质较好，精力充沛。注意保持规律的作息和适度的运动，在旺运期更要注意劳逸结合，避免透支体力。整体健康状况令人满意。";
  }
  if (renLevel === "凶" || renLevel === "大凶") {
    return "需要特别关注健康，压力可能会影响身体状况，建议定期体检，保持充足睡眠，通过运动释放压力。注意消化系统、神经系统的保养，情绪管理对健康至关重要。";
  }
  return "健康状况中等，注意作息规律，饮食均衡，避免过度劳累。适当进行户外运动，保持良好的心态，对健康大有裨益。";
}

/**
 * 计算综合分数
 */
function calcOverallScore(tian: WugeGe, ren: WugeGe, di: WugeGe, wai: WugeGe, zong: WugeGe): number {
  // 人格权重最高（40%），其次总格（25%），地格（15%），外格（10%），天格（10%）
  const weighted = ren.score * 0.4 + zong.score * 0.25 + di.score * 0.15 + wai.score * 0.1 + tian.score * 0.1;
  return Math.round(Math.min(99, Math.max(20, weighted)));
}

function getScoreLevel(score: number): string {
  if (score >= 90) return "极佳 · 运势昌隆";
  if (score >= 80) return "优良 · 前程似锦";
  if (score >= 70) return "良好 · 稳步向上";
  if (score >= 60) return "中等 · 平稳发展";
  if (score >= 50) return "一般 · 需勤奋耕耘";
  return "待改善 · 逆境淬炼";
}

/**
 * 主计算函数
 */
export function calculateWuge(input: WugeInput): WugeResult {
  const { name, gender } = input;
  const chars = Array.from(name);
  const strokes = getNameStrokes(name);

  if (chars.length < 2) {
    throw new Error("姓名至少需要2个字");
  }

  // 判断是否复姓（常见复姓列表）
  const COMPOUND_SURNAMES = [
    "欧阳", "太史", "端木", "上官", "司马", "东方", "独孤", "南宫", "万俟",
    "闻人", "夏侯", "诸葛", "尉迟", "公羊", "赫连", "澹台", "皇甫", "宗政",
    "濮阳", "公冶", "太叔", "申屠", "公孙", "慕容", "仲孙", "钟离", "长孙",
    "宇文", "司徒", "鲜于", "司空", "闾丘", "子车", "亓官", "司寇", "巫马",
    "公西", "颛孙", "壤驷", "公良", "漆雕", "乐正", "宰父", "谷梁", "拓跋",
    "夹谷", "轩辕", "令狐", "段干", "百里", "呼延", "东郭", "南门", "羊舌",
    "微生", "左丘", "东宫", "西门", "南野", "第五", "公仪", "公乘",
  ];

  const firstTwo = chars.slice(0, 2).join("");
  const isSingleSurname = !COMPOUND_SURNAMES.includes(firstTwo);
  const isSingleName = isSingleSurname ? chars.length === 2 : chars.length === 3;

  // ===== 五格计算 =====
  let tianStrokes: number;
  let renStrokes: number;
  let diStrokes: number;
  let zongStrokes: number;
  let waiStrokes: number;

  if (isSingleSurname) {
    const surname = strokes[0]!;
    const nameChars = strokes.slice(1);

    // 天格：单姓 + 1
    tianStrokes = surname + 1;

    // 人格：姓 + 名第一字
    renStrokes = surname + (nameChars[0] ?? 1);

    // 地格：名字笔画相加；单名则名字 + 1
    if (isSingleName) {
      diStrokes = (nameChars[0] ?? 1) + 1;
    } else {
      diStrokes = nameChars.reduce((sum, s) => sum + s, 0);
    }
  } else {
    // 复姓
    const surname1 = strokes[0]!;
    const surname2 = strokes[1]!;
    const nameChars = strokes.slice(2);

    // 天格：复姓两字笔画相加
    tianStrokes = surname1 + surname2;

    // 人格：姓氏最下字 + 名第一字
    renStrokes = surname2 + (nameChars[0] ?? 1);

    // 地格：名字笔画相加；单名则名字 + 1
    if (nameChars.length <= 1) {
      diStrokes = (nameChars[0] ?? 1) + 1;
    } else {
      diStrokes = nameChars.reduce((sum, s) => sum + s, 0);
    }
  }

  // 总格：所有字笔画相加
  zongStrokes = strokes.reduce((sum, s) => sum + s, 0);

  // 外格：总格 - 人格 + 1（传统算法：外格 = 总格笔画 - 人格笔画，若为单字则+1）
  waiStrokes = zongStrokes - renStrokes + 1;
  if (waiStrokes <= 0) waiStrokes = 1;

  // 构建五格对象
  const tian = buildGe(tianStrokes, getTianFullDesc);
  const ren = buildGe(renStrokes, getRenFullDesc);
  const di = buildGe(diStrokes, getDiFullDesc);
  const wai = buildGe(waiStrokes, getWaiFullDesc);
  const zong = buildGe(zongStrokes, getZongFullDesc);

  // 三才分析
  const { config: sanCai, desc: sanCaiDesc } = analyzeSanCai(tianStrokes, renStrokes, diStrokes);

  // 综合分数
  const score = calcOverallScore(tian, ren, di, wai, zong);
  const scoreLevel = getScoreLevel(score);

  // 特殊标签
  const specialTags = getSpecialTags(renStrokes, zongStrokes, diStrokes);

  // 各维度描述
  const personality = getPersonalityDesc(renStrokes, gender);
  const career = getCareerDesc(renStrokes, zongStrokes);
  const love = getLoveDesc(renStrokes, diStrokes, gender);
  const health = getHealthDesc(tianStrokes, renStrokes);

  return {
    name,
    gender,
    chars,
    strokes,
    isSingleSurname,
    isSingleName,
    tian,
    ren,
    di,
    wai,
    zong,
    score,
    scoreLevel,
    sanCai,
    sanCaiDesc,
    personality,
    career,
    love,
    health,
    specialTags,
  };
}
