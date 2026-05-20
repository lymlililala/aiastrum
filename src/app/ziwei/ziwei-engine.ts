/**
 * 紫微斗数排盘引擎
 * 实现基础的十二宫排盘、主星安置、四化飞星
 *
 * 注：完整的紫微斗数算法极为复杂（历法转换、安星诀等）
 * MVP 阶段采用经验性简化算法，保证结果合理且有差异性
 * 生产阶段建议接入 iztro 等开源库
 */

import {
  MAIN_STARS,
  PALACES,
  TIANGAN_SIHUA,
  TIAN_GAN_10,
  DI_ZHI_12,
  MINGONG_FREE_READINGS,
  PERSONALITY_LABELS,
  PAYWALL_HINTS,
  STAR_COLORS,
  DAXIAN_TEXTS,
  LIUNIAN_TEXTS,
  type MainStar,
  type Palace,
} from "./ziwei-data";

// ===== 输入类型 =====
export interface ZiweiInput {
  name: string;
  gender: "female" | "male";
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthHour: number;  // 0-23, -1 表示不知道
  isLunar: boolean;   // 是否农历
  birthPlace?: string;
}

// ===== 宫位数据 =====
export interface PalaceData {
  palace: Palace;
  mainStars: string[];          // 主星名列表
  auxStars: string[];           // 辅星
  siHua: Array<"禄" | "权" | "科" | "忌">;
  daXian: { startAge: number; endAge: number };
  isBodyPalace: boolean;        // 是否身宫
  isMingPalace: boolean;        // 是否命宫
  // 三方四正
  sanFang: number[];            // 三方宫位索引
  highlighted?: boolean;
}

// ===== 完整排盘结果 =====
export interface ZiweiChart {
  // 基础信息
  name: string;
  gender: "female" | "male";
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthHour: number;
  // 天干地支
  yearGan: string;
  yearZhi: string;
  monthGan: string;
  monthZhi: string;
  dayGan: string;
  dayZhi: string;
  hourZhi: string;
  // 命盘信息
  mingGong: number;             // 命宫索引（0-11）
  shenGong: number;             // 身宫索引
  wuXingJu: string;             // 五行局
  startAge: number;             // 起运年龄
  // 十二宫数据
  palaces: PalaceData[];
  // 解读
  mingStarName: string;         // 命宫主星
  mingReading: string;          // 命宫解读（免费）
  personalityLabels: string[];  // 性格标签
  wealthReading: string;
  careerReading: string;
  loveReading: string;
  guirenReading: string;
  daxianReading: string;
  liunianReading: string;
  // AI 增强
  aiEnhanced?: string;
}

// ===== 辅助函数 =====
function seededRand(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function getYearGanzhi(year: number): { gan: string; zhi: string } {
  const ganIdx = ((year - 4) % 10 + 10) % 10;
  const zhiIdx = ((year - 4) % 12 + 12) % 12;
  return { gan: TIAN_GAN_10[ganIdx]!, zhi: DI_ZHI_12[zhiIdx]! };
}

function getMonthGanzhi(year: number, month: number): { gan: string; zhi: string } {
  // 简化：月支以寅月(index=2)为正月起始
  const zhiIdx = (month + 1) % 12;
  const ganBase = ((year - 4) % 10 + 10) % 10;
  const ganIdx = (ganBase * 2 + month - 1) % 10;
  return { gan: TIAN_GAN_10[ganIdx]!, zhi: DI_ZHI_12[zhiIdx]! };
}

function getDayGanzhi(year: number, month: number, day: number): { gan: string; zhi: string } {
  // 简化：用日期总天数计算
  const totalDays = year * 365 + Math.floor(year / 4) + month * 30 + day;
  const ganIdx = ((totalDays - 1) % 10 + 10) % 10;
  const zhiIdx = ((totalDays - 1) % 12 + 12) % 12;
  return { gan: TIAN_GAN_10[ganIdx]!, zhi: DI_ZHI_12[zhiIdx]! };
}

function getHourZhi(hour: number): string {
  if (hour < 0) return "未知";
  const index = Math.floor(((hour + 1) % 24) / 2);
  return DI_ZHI_12[index]!;
}

// 计算命宫（简化：基于出生月和时辰）
function calcMingGong(month: number, hourZhiIdx: number): number {
  // 正月起寅（index=2），顺数月份
  // 时辰从子时逆数
  if (hourZhiIdx < 0) {
    // 不知道时辰，以午时（index=6）代替
    hourZhiIdx = 6;
  }
  const base = (2 + month - 1) % 12; // 月支（从寅起）
  // 安命诀：月份起寅，时辰逆布
  const mingIdx = ((base - hourZhiIdx) % 12 + 12) % 12;
  return mingIdx;
}

// 计算身宫
function calcShenGong(month: number, hourZhiIdx: number): number {
  if (hourZhiIdx < 0) hourZhiIdx = 6;
  const shenIdx = (month + hourZhiIdx) % 12;
  return shenIdx;
}

// 安主星（简化的紫微安星法）
function placeMingStars(mingGong: number, dayNum: number, rand: () => number): Record<number, string[]> {
  const placement: Record<number, string[]> = {};
  for (let i = 0; i < 12; i++) placement[i] = [];

  const mainStarNames = Object.keys(MAIN_STARS);

  // 紫微系：紫微居命宫或其对宫（三合宫）
  const ziwei = (mingGong + dayNum % 3 * 4) % 12;
  placement[ziwei]!.push("紫微");

  // 天机在紫微逆一宫
  const tianji = (ziwei - 1 + 12) % 12;
  placement[tianji]!.push("天机");

  // 太阳在天机顺一宫
  const taiyang = (tianji - 1 + 12) % 12;
  placement[taiyang]!.push("太阳");

  // 武曲在太阳顺一宫
  const wuqu = (taiyang + 1) % 12;
  placement[wuqu]!.push("武曲");

  // 天同在武曲顺一宫
  const tiantong = (wuqu + 1) % 12;
  placement[tiantong]!.push("天同");

  // 廉贞在天同顺三宫
  const lianzhen = (tiantong + 3) % 12;
  placement[lianzhen]!.push("廉贞");

  // 天府系：天府在命宫三合宫
  const tianfu = (mingGong + 4) % 12;
  placement[tianfu]!.push("天府");

  // 太阴在天府逆一宫
  const taiyin = (tianfu - 1 + 12) % 12;
  placement[taiyin]!.push("太阴");

  // 贪狼在太阴逆一宫
  const tanlang = (taiyin - 1 + 12) % 12;
  placement[tanlang]!.push("贪狼");

  // 巨门在贪狼逆一宫
  const jumen = (tanlang - 1 + 12) % 12;
  placement[jumen]!.push("巨门");

  // 天相在巨门逆一宫
  const tianxiang = (jumen - 1 + 12) % 12;
  placement[tianxiang]!.push("天相");

  // 天梁在天相逆一宫
  const tianliang = (tianxiang - 1 + 12) % 12;
  placement[tianliang]!.push("天梁");

  // 七杀在天梁逆二宫
  const qisha = (tianliang - 2 + 12) % 12;
  placement[qisha]!.push("七杀");

  // 破军在七杀顺四宫
  const pojun = (qisha + 4) % 12;
  placement[pojun]!.push("破军");

  return placement;
}

// 安辅星（简化）
function placeAuxStars(mingGong: number, yearGanIdx: number, rand: () => number): Record<number, string[]> {
  const aux: Record<number, string[]> = {};
  for (let i = 0; i < 12; i++) aux[i] = [];

  // 文昌文曲
  const wenchang = (10 - yearGanIdx + 12) % 12;
  const wenqu    = (4  + yearGanIdx) % 12;
  aux[wenchang]!.push("文昌");
  aux[wenqu]!.push("文曲");

  // 左辅右弼（生月起）
  const zuofu   = (mingGong + Math.floor(rand() * 3)) % 12;
  const youbi   = (mingGong - 1 + 12) % 12;
  aux[zuofu]!.push("左辅");
  aux[youbi]!.push("右弼");

  // 天魁天钺
  const tiankui  = (mingGong + 2) % 12;
  const tianyue  = (mingGong - 2 + 12) % 12;
  aux[tiankui]!.push("天魁");
  aux[tianyue]!.push("天钺");

  // 禄存
  const lucun = (yearGanIdx * 1 + 3) % 12;
  aux[lucun]!.push("禄存");

  return aux;
}

// 四化飞布
function placeSiHua(yearGan: string): Record<number, Array<"禄"|"权"|"科"|"忌">> {
  const sihua: Record<number, Array<"禄"|"权"|"科"|"忌">> = {};
  for (let i = 0; i < 12; i++) sihua[i] = [];

  const mapping = TIANGAN_SIHUA[yearGan];
  if (!mapping) return sihua;

  const [lu, quan, ke, ji] = mapping;
  const mainStarNames = Object.keys(MAIN_STARS);

  // 根据四化星找到对应主星所在宫位（这里简化处理）
  // 在完整引擎中需要通过主星位置来确定四化飞入哪个宫
  // MVP 简化：随机分配到合理宫位
  const rand2 = seededRand(yearGan.charCodeAt(0) * 97);
  const luIdx   = Math.floor(rand2() * 12);
  const quanIdx = (luIdx + 4) % 12;
  const keIdx   = (luIdx + 8) % 12;
  const jiIdx   = (luIdx + 6) % 12;

  sihua[luIdx]!.push("禄");
  sihua[quanIdx]!.push("权");
  sihua[keIdx]!.push("科");
  sihua[jiIdx]!.push("忌");

  return sihua;
}

// 三方四正
function getSanFang(palaceIdx: number): number[] {
  // 三合宫（相差4、8）+ 对宫（相差6）
  return [
    (palaceIdx + 4) % 12,
    (palaceIdx + 8) % 12,
    (palaceIdx + 6) % 12,
  ];
}

// 五行局（根据命宫天干地支）
function calcWuXingJu(mingGan: string, mingZhi: string): { name: string; startAge: number } {
  // 简化：根据命宫天干确定五行局
  const ganIdx = TIAN_GAN_10.indexOf(mingGan as typeof TIAN_GAN_10[number]);
  const juMap: Record<number, { name: string; startAge: number }> = {
    0: { name: "水二局", startAge: 2 },
    1: { name: "木三局", startAge: 3 },
    2: { name: "金四局", startAge: 4 },
    3: { name: "土五局", startAge: 5 },
    4: { name: "火六局", startAge: 6 },
    5: { name: "水二局", startAge: 2 },
    6: { name: "木三局", startAge: 3 },
    7: { name: "金四局", startAge: 4 },
    8: { name: "土五局", startAge: 5 },
    9: { name: "火六局", startAge: 6 },
  };
  return juMap[ganIdx] ?? { name: "木三局", startAge: 3 };
}

// ===== 主引擎函数 =====
export function runZiweiEngine(input: ZiweiInput): ZiweiChart {
  const seed = input.birthYear * 100000 + input.birthMonth * 1000 + input.birthDay * 10
    + (input.gender === "female" ? 0 : 5000)
    + input.name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const rand = seededRand(seed);

  // 天干地支
  const { gan: yearGan, zhi: yearZhi } = getYearGanzhi(input.birthYear);
  const { gan: monthGan, zhi: monthZhi } = getMonthGanzhi(input.birthYear, input.birthMonth);
  const { gan: dayGan, zhi: dayZhi } = getDayGanzhi(input.birthYear, input.birthMonth, input.birthDay);
  const hourZhi = getHourZhi(input.birthHour);

  // 命宫计算
  const hourZhiIdx = input.birthHour >= 0
    ? Math.floor(((input.birthHour + 1) % 24) / 2)
    : 6;
  const mingGong = calcMingGong(input.birthMonth, hourZhiIdx);
  const shenGong = calcShenGong(input.birthMonth, hourZhiIdx);

  // 五行局
  const yearGanIdx = TIAN_GAN_10.indexOf(yearGan as typeof TIAN_GAN_10[number]);
  const mingGanIdx = (yearGanIdx + mingGong) % 10;
  const { name: wuXingJu, startAge } = calcWuXingJu(
    TIAN_GAN_10[mingGanIdx]!,
    DI_ZHI_12[mingGong]!
  );

  // 安主星
  const mainPlacement = placeMingStars(mingGong, input.birthDay, rand);
  // 安辅星
  const auxPlacement = placeAuxStars(mingGong, yearGanIdx, rand);
  // 四化
  const sihuaPlacement = placeSiHua(yearGan);

  // 组装十二宫数据
  const palaceDataList: PalaceData[] = PALACES.map((palace, i) => {
    const palaceIdx = (i + mingGong) % 12;
    const actualPalaceIdx = i; // 命宫固定在位置0，顺时针排列

    return {
      palace,
      mainStars: mainPlacement[i] ?? [],
      auxStars: auxPlacement[i] ?? [],
      siHua: sihuaPlacement[i] ?? [],
      daXian: {
        startAge: startAge + i * 10,
        endAge: startAge + i * 10 + 9,
      },
      isBodyPalace: i === shenGong,
      isMingPalace: i === 0,
      sanFang: getSanFang(i),
    };
  });

  // 命宫主星
  const mingStars = palaceDataList[0]?.mainStars ?? [];
  const mingStarName = mingStars.length > 0 ? mingStars[0]! : "紫微";
  const mingReading = MINGONG_FREE_READINGS[mingStarName] ?? MINGONG_FREE_READINGS["紫微"]!;
  const personalityLabels = PERSONALITY_LABELS[mingStarName]?.slice(0, 3) ?? ["命格独特", "天赋异禀", "格局超凡"];

    const wealthPalace = palaceDataList[4]!;
  const careerPalace = palaceDataList[8]!;
  const lovePalace   = palaceDataList[2]!;

  const mainStarData = MAIN_STARS[mingStarName];

  const wealthReading = generateWealthReading(wealthPalace, mingStarName, rand);
  const careerReading = generateCareerReading(careerPalace, mingStarName, rand);
  const loveReading   = generateLoveReading(lovePalace, input.gender, mingStarName, rand);
  const guirenReading = generateGuirenReading(mingGong, rand);

  // 大限流年
  const currentAge = new Date().getFullYear() - input.birthYear;
  const daxianReading = generateDaxianReading(currentAge, rand);
  const liunianReading = LIUNIAN_TEXTS[rand() > 0.5 ? "good" : rand() > 0.3 ? "average" : "caution"];

  return {
    name: input.name,
    gender: input.gender,
    birthYear: input.birthYear,
    birthMonth: input.birthMonth,
    birthDay: input.birthDay,
    birthHour: input.birthHour,
    yearGan, yearZhi,
    monthGan, monthZhi,
    dayGan, dayZhi,
    hourZhi,
    mingGong, shenGong,
    wuXingJu, startAge,
    palaces: palaceDataList,
    mingStarName, mingReading, personalityLabels,
    wealthReading, careerReading, loveReading,
    guirenReading, daxianReading, liunianReading,
  };
}

// ===== 解读生成辅助函数 =====
function generateWealthReading(palace: PalaceData, mingStarName: string, rand: () => number): string {
  const mainStarData = MAIN_STARS[mingStarName];
  const hasSihua = palace.siHua.length > 0;
  const base = mainStarData?.wealth_hint ?? "财运稳健，正财为主。";

  const extras = [
    "你的财帛宫格局显示，最适合通过专业技能积累财富，越到中年后期财运越旺。",
    "命盘显示你有一次明显的财富跃迁机会，关键在于抓住某个行业转型的时间节点。",
    "你的偏财运值得关注，在某个特定领域的投资或副业，可能给你带来超出预期的收益。",
    "你的财富密码藏在你的专业壁垒里，深耕一个领域后财运会有质的飞跃。",
  ];

  const sihuaBonus = palace.siHua.includes("禄") ? "财帛宫化禄，财运格局极旺，贵人财源不断。" :
                     palace.siHua.includes("忌") ? "财帛宫有化忌飞入，需谨防冲动消费和感情破财。" : "";

  return `${base}\n\n${extras[Math.floor(rand() * extras.length)]}${sihuaBonus ? "\n\n" + sihuaBonus : ""}`;
}

function generateCareerReading(palace: PalaceData, mingStarName: string, rand: () => number): string {
  const mainStarData = MAIN_STARS[mingStarName];
  const base = mainStarData?.career_hint ?? "事业格局稳健，适合专业型发展路径。";

  const extras = [
    "官禄宫的格局显示，你最大的突破往往发生在换赛道或行业转型的节点上，勇于改变是你的关键词。",
    "你有明显的独立创业格局，在某个时间节点选择自主创业，将是事业的重大转折点。",
    "你的事业贵人在意想不到的地方，保持开放的人际关系，命中自有贵人相助。",
    "你的官禄宫显示，舞台越大你越能发挥，需要主动寻找更大的平台和更高的目标。",
  ];

  return `${base}\n\n${extras[Math.floor(rand() * extras.length)]}`;
}

function generateLoveReading(palace: PalaceData, gender: string, mingStarName: string, rand: () => number): string {
  const mainStarData = MAIN_STARS[mingStarName];
  const base = mainStarData?.love_hint ?? "感情格局稳定，正缘有时会在意想不到的地方相遇。";

  const maleFeatures = [
    "你的正缘气质温柔知性，在某个与你有共同兴趣的场合相遇，缘分来临时你会有强烈的心动感。",
    "你的正缘事业心强，独立有主见，是那种不需要依附别人的女性，与你势均力敌。",
    "你的正缘有一双很有神韵的眼睛，第一次见面就能感受到她的与众不同。",
  ];

  const femaleFeatures = [
    "你的正缘稳重可靠，有担当，是那种用行动而非语言来表达爱意的类型。",
    "你的正缘才华出众，可能在艺术或技术领域有专业建树，与你有强烈的精神共鸣。",
    "你的正缘高颜值是一方面，但更重要的是他/她的内在成熟度与你高度匹配。",
  ];

  const features = gender === "female" ? femaleFeatures : maleFeatures;

  return `${base}\n\n${features[Math.floor(rand() * features.length)]}`;
}

function generateGuirenReading(mingGong: number, rand: () => number): string {
  const directions = ["东北方", "西南方", "正南方", "东南方", "西北方", "正东方"];
  const types = ["年长于你的长辈型贵人", "同辈中的意见领袖", "异性贵人", "行业大咖"];
  const scenes = ["工作场合", "某次偶然的社交场合", "朋友介绍的圈子里", "某个感兴趣的课程或活动中"];

  const dir = directions[Math.floor(rand() * directions.length)]!;
  const type = types[Math.floor(rand() * types.length)]!;
  const scene = scenes[Math.floor(rand() * scenes.length)]!;

  return `你的命盘显示贵人方位在${dir}，贵人类型倾向于${type}。\n\n最容易与贵人相遇的场景是${scene}。保持开放的社交心态，主动建立高质量人脉，贵人往往就在你的半径之内。\n\n今年有一个重要的贵人机遇窗口，保持敏感，勇于把握。`;
}

function generateDaxianReading(age: number, rand: () => number): string {
  if (age <= 20) return DAXIAN_TEXTS.early;
  if (age <= 30) return DAXIAN_TEXTS.youth;
  if (age <= 40) return DAXIAN_TEXTS.mature;
  return DAXIAN_TEXTS.prime;
}
