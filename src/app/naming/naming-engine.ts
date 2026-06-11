/**
 * 墨韵起名 - 核心引擎
 * 八字排盘 → 五行分析 → 喜用神 → 吉名推荐
 */

import {
  type WuXing,
  type Lang,
  AUSPICIOUS_CHARS,
  WUXING_GENERATE,
  WUXING_OVERCOME,
  getWuxingLabel,
  type NameSuggestion,
} from "./naming-data";

// ===== 天干地支 =====
const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"] as const;
const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"] as const;

// 天干五行
const GAN_WUXING: Record<string, WuXing> = {
  甲: "木", 乙: "木", 丙: "火", 丁: "火",
  戊: "土", 己: "土", 庚: "金", 辛: "金",
  壬: "水", 癸: "水",
};

// 地支五行
const ZHI_WUXING: Record<string, WuXing> = {
  子: "水", 丑: "土", 寅: "木", 卯: "木",
  辰: "土", 巳: "火", 午: "火", 未: "土",
  申: "金", 酉: "金", 戌: "土", 亥: "水",
};

// 地支藏干（主气）
const ZHI_CANG_GAN: Record<string, string[]> = {
  子: ["癸"], 丑: ["己", "癸", "辛"], 寅: ["甲", "丙", "戊"],
  卯: ["乙"], 辰: ["戊", "乙", "癸"], 巳: ["丙", "戊", "庚"],
  午: ["丁", "己"], 未: ["己", "丁", "乙"], 申: ["庚", "壬", "戊"],
  酉: ["辛"], 戌: ["戊", "辛", "丁"], 亥: ["壬", "甲"],
};

// 月支（月令）
const MONTH_ZHI = ["寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子", "丑"];

// 时辰地支
const HOUR_ZHI: Record<number, string> = {
  23: "子", 0: "子", 1: "丑", 2: "丑", 3: "寅", 4: "寅",
  5: "卯", 6: "卯", 7: "辰", 8: "辰", 9: "巳", 10: "巳",
  11: "午", 12: "午", 13: "未", 14: "未", 15: "申", 16: "申",
  17: "酉", 18: "酉", 19: "戌", 20: "戌", 21: "亥", 22: "亥",
};

// ===== 核心接口 =====
export interface BaziPillar {
  gan: string;    // 天干
  zhi: string;    // 地支
  ganWuxing: WuXing;
  zhiWuxing: WuXing;
  label: string;  // 年/月/日/时
}

export interface WuXingScore {
  金: number; 木: number; 水: number; 火: number; 土: number;
}

export interface BaziResult {
  pillars: BaziPillar[];      // 四柱
  wuxingScores: WuXingScore;  // 五行分数
  dominant: WuXing[];         // 旺盛五行
  weak: WuXing[];             // 虚弱五行
  xiyongshen: WuXing[];       // 喜用神（需要补充的五行）
  diagnosis: string;          // 命理诊断文案
  yearPillar: BaziPillar;
  monthPillar: BaziPillar;
  dayPillar: BaziPillar;
  hourPillar: BaziPillar;
}

export interface NamingInput {
  surname: string;
  gender: "male" | "female";
  year: number;
  month: number;
  day: number;
  hour: number;    // 24h制
}

export interface NamingResult {
  bazi: BaziResult;
  suggestions: NameSuggestion[];
freeSuggestions: NameSuggestion[];
premiumSuggestions: NameSuggestion[];
  surname: string;
  gender: "male" | "female";
}

// ===== 工具函数 =====
// 获取年柱天干
function getYearGan(year: number): string {
  return TIAN_GAN[((year - 4) % 10 + 10) % 10]!;
}

// 获取年柱地支
function getYearZhi(year: number): string {
  return DI_ZHI[((year - 4) % 12 + 12) % 12]!;
}

// 获取月柱（简化：以节气月份估算）
function getMonthGan(year: number, month: number): string {
  const yearGanIdx = ((year - 4) % 10 + 10) % 10;
  const baseMap: Record<number, number> = { 0: 2, 1: 4, 2: 6, 3: 8, 4: 0 };
  const base = baseMap[yearGanIdx % 5] ?? 2;
  return TIAN_GAN[(base + month - 1) % 10]!;
}

function getMonthZhi(month: number): string {
  return MONTH_ZHI[month - 1]!;
}

// 获取日柱（简化公式）
function getDayGan(year: number, month: number, day: number): string {
  const a = Math.floor((14 - month) / 12);
  const y = year - a;
  const m = month + 12 * a - 2;
  const dayCount = day + y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + Math.floor((31 * m) / 12);
  return TIAN_GAN[((dayCount % 10) + 10) % 10]!;
}

function getDayZhi(year: number, month: number, day: number): string {
  const a = Math.floor((14 - month) / 12);
  const y = year - a;
  const m = month + 12 * a - 2;
  const dayCount = day + y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + Math.floor((31 * m) / 12);
  return DI_ZHI[((dayCount % 12) + 12) % 12]!;
}

// 获取时柱
function getHourGan(dayGan: string, hour: number): string {
  const dayGanIdx = TIAN_GAN.indexOf(dayGan as typeof TIAN_GAN[number]);
  const hourZhi = HOUR_ZHI[hour] ?? "子";
  const hourZhiIdx = DI_ZHI.indexOf(hourZhi as typeof DI_ZHI[number]);
  return TIAN_GAN[((dayGanIdx % 5) * 2 + hourZhiIdx) % 10]!;
}

function getHourZhi(hour: number): string {
  return HOUR_ZHI[hour] ?? "子";
}

// ===== 核心函数：排四柱 =====
export function calculateBazi(input: NamingInput): BaziResult {
  const { year, month, day, hour } = input;

  const yearGan = getYearGan(year);
  const yearZhi = getYearZhi(year);
  const monthGan = getMonthGan(year, month);
  const monthZhi = getMonthZhi(month);
  const dayGan = getDayGan(year, month, day);
  const dayZhi = getDayZhi(year, month, day);
  const hourGan = getHourGan(dayGan, hour);
  const hourZhi = getHourZhi(hour);

  const makePillar = (gan: string, zhi: string, label: string): BaziPillar => ({
    gan,
    zhi,
    ganWuxing: GAN_WUXING[gan] ?? "土",
    zhiWuxing: ZHI_WUXING[zhi] ?? "土",
    label,
  });

  const yearPillar = makePillar(yearGan, yearZhi, "年柱");
  const monthPillar = makePillar(monthGan, monthZhi, "月柱");
  const dayPillar = makePillar(dayGan, dayZhi, "日柱");
  const hourPillar = makePillar(hourGan, hourZhi, "时柱");
  const pillars = [yearPillar, monthPillar, dayPillar, hourPillar];

  // ===== 计算五行分数 =====
  const scores: WuXingScore = { 金: 0, 木: 0, 水: 0, 火: 0, 土: 0 };

  for (const p of pillars) {
    scores[p.ganWuxing] += 2;
    scores[p.zhiWuxing] += 2;
    // 藏干加分
    const cangGan = ZHI_CANG_GAN[p.zhi] ?? [];
    for (const cg of cangGan) {
      const wx = GAN_WUXING[cg];
      if (wx) scores[wx] += 1;
    }
  }

  // 月令得分加倍（月令为命局之核心）
  const monthZhiWx = ZHI_WUXING[monthZhi] ?? "土";
  scores[monthZhiWx] += 3;

  // ===== 判断旺衰 =====
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const WUXING_LIST: WuXing[] = ["金", "木", "水", "火", "土"];
  const dominant = WUXING_LIST.filter(wx => scores[wx] / total > 0.22);
  const weak = WUXING_LIST.filter(wx => scores[wx] / total < 0.12);

  // ===== 喜用神推断（简化逻辑）=====
  // 喜用神 = 弱五行（需要补充），同时排除与旺五行相克的
  let xiyongshen = [...weak];

  // 若弱五行太多，取最弱的两个
  if (xiyongshen.length === 0) {
    xiyongshen = WUXING_LIST.sort((a, b) => scores[a] - scores[b]).slice(0, 2);
  } else if (xiyongshen.length > 2) {
    xiyongshen = xiyongshen.sort((a, b) => scores[a] - scores[b]).slice(0, 2);
  }

  // 喜用神也可以选相生的（最弱五行的生我之神也是喜用）
  const primaryWeak = xiyongshen[0];
  if (primaryWeak) {
    const generateMe = WUXING_LIST.find(wx => WUXING_GENERATE[wx] === primaryWeak);
    if (generateMe && !xiyongshen.includes(generateMe)) {
      xiyongshen.push(generateMe);
    }
  }

  // ===== 生成诊断文案 =====
  const diagnosis = buildDiagnosis(scores, total, dominant, weak, xiyongshen);

  return {
    pillars,
    wuxingScores: scores,
    dominant,
    weak,
    xiyongshen,
    diagnosis,
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
  };
}

function buildDiagnosis(
  scores: WuXingScore,
  _total: number,
  dominant: WuXing[],
  weak: WuXing[],
  xiyongshen: WuXing[],
): string {
  const dominantStr = dominant.length > 0 ? dominant.join("、") : "五行较均衡";
  const weakStr = weak.length > 0 ? weak.join("、") : "无明显偏弱";
  const xiStr = xiyongshen.join("、");

  if (dominant.length === 0 && weak.length === 0) {
    return `命局五行分布均衡，元气充足，属于难得的中和命局。专属喜用神为 **${xiStr}**，起名宜锦上添花，选择寓意美好的字。`;
  }

  return `命局中**${dominantStr}**旺盛有余，**${weakStr}**稍显不足。根据正宗命理，不可盲目"缺啥补啥"，应结合日主强弱综合研判。您的专属喜用神为 **${xiStr}**，起名宜选含此五行之字，以助运势提升。`;
}

// ===== 核心函数：生成名字推荐 =====
export function generateNames(input: NamingInput, bazi: BaziResult): NameSuggestion[] {
  const { surname, gender } = input;
  const { xiyongshen } = bazi;

  // 从字库中按喜用神筛选字
  const filteredChars = AUSPICIOUS_CHARS.filter(c => {
    // neutral 字适合所有性别；非 neutral 字只匹配同性别
    if (c.gender !== "neutral" && c.gender !== gender) return false;
    return xiyongshen.includes(c.wuxing) || xiyongshen.some(xi => WUXING_GENERATE[xi] === c.wuxing);
  });

  // 按喜用神排序（命中喜用神的优先）
  const priorityChars = filteredChars.filter(c => xiyongshen.includes(c.wuxing));
  const secondaryChars = filteredChars.filter(c => !xiyongshen.includes(c.wuxing));

  // 组合双字名
  const suggestions: NameSuggestion[] = [];
  const usedNames = new Set<string>();

  // 合并字池
  const combineChars = [...priorityChars, ...secondaryChars];

  // Fisher-Yates 洗牌（用日期信息作种子，保证每次可复现且多样）
  const seed = input.year * 10000 + input.month * 100 + input.day + (input.hour || 0) * 7;
  const shuffled = [...combineChars];
  for (let k = shuffled.length - 1; k > 0; k--) {
    const idx = Math.abs((seed * 1664525 + k * 1013904223) & 0x7fffffff) % (k + 1);
    [shuffled[k], shuffled[idx]] = [shuffled[idx]!, shuffled[k]!];
  }

  // 每个首字最多出现 MAX_PER_FIRST 次，强制首字多样
  const MAX_PER_FIRST = 2;
  const firstCharCount = new Map<string, number>();

  // 按首字轮换策略生成候选对：外层按首字轮换，内层随机选尾字
  // 先建立 首字→可用尾字列表 的映射
  const firstToSeconds = new Map<string, typeof shuffled>();
  for (let i = 0; i < shuffled.length; i++) {
    const c1 = shuffled[i]!;
    if (!firstToSeconds.has(c1.char)) {
      firstToSeconds.set(c1.char, []);
    }
    // 尾字不能与首字相同
    for (let j = 0; j < shuffled.length; j++) {
      if (i !== j && shuffled[j]!.char !== c1.char) {
        firstToSeconds.get(c1.char)!.push(shuffled[j]!);
      }
    }
  }

  // 尾字也限制出现次数，防止所有名字尾字相同
  const MAX_PER_LAST = 2;
  const lastCharCount = new Map<string, number>();

  // 轮换所有不同的首字，每个首字从不同偏移开始取尾字，保证首尾都多样
  const uniqueFirstChars = [...firstToSeconds.keys()];
  // 给每个首字分配一个不同的起始偏移，避免大家都取同一个尾字
  const firstCharOffset = new Map<string, number>();
  uniqueFirstChars.forEach((fc, idx) => {
    firstCharOffset.set(fc, idx); // 第 i 个首字从偏移 i 开始取
  });

  outer: while (suggestions.length < 20) {
    let anyAdded = false;
    for (const firstChar of uniqueFirstChars) {
      if (suggestions.length >= 20) break outer;
      const cnt = firstCharCount.get(firstChar) ?? 0;
      if (cnt >= MAX_PER_FIRST) continue;
      const seconds = firstToSeconds.get(firstChar) ?? [];
      // 从当前偏移开始，往后找一个尾字未超限且组合未用过的
      const offset = firstCharOffset.get(firstChar) ?? 0;
      let found = false;
      for (let attempt = 0; attempt < seconds.length; attempt++) {
        const c2 = seconds[(offset + attempt) % seconds.length]!;
        if ((lastCharCount.get(c2.char) ?? 0) >= MAX_PER_LAST) continue;
        const c1 = shuffled.find(c => c.char === firstChar)!;
        const name = c1.char + c2.char;

        if (usedNames.has(name)) continue;
        if (surname && name.includes(surname)) continue;
        if (c1.char === c2.char) continue;

        // 五行相克过滤
        const x1overcomex2 = WUXING_OVERCOME[c1.wuxing] === c2.wuxing;
        const x2overcomex1 = WUXING_OVERCOME[c2.wuxing] === c1.wuxing;
        if (x1overcomex2 && x2overcomex1) continue;
        if ((x1overcomex2 || x2overcomex1) && !xiyongshen.includes(c1.wuxing) && !xiyongshen.includes(c2.wuxing)) continue;

        usedNames.add(name);

        const generates12 = WUXING_GENERATE[c1.wuxing] === c2.wuxing;
        const generates21 = WUXING_GENERATE[c2.wuxing] === c1.wuxing;
        const sameWuxing = c1.wuxing === c2.wuxing;

        let synergy = "";
        if (generates12) synergy = `${c1.wuxing}生${c2.wuxing}，相生吉顺`;
        else if (generates21) synergy = `${c2.wuxing}生${c1.wuxing}，相生吉顺`;
        else if (sameWuxing) synergy = `双${c1.wuxing}比和，同气相求`;
        else synergy = "五行调和，相辅相成";

        let score = 60;
        if (xiyongshen.includes(c1.wuxing)) score += 15;
        if (xiyongshen.includes(c2.wuxing)) score += 15;
        if (generates12 || generates21) score += 10;
        if (sameWuxing) score += 5;
        if (c1.source ?? c2.source) score += 5;
        if (x1overcomex2 || x2overcomex1) score -= 10;

        const toneMap: Record<string, string> = {};
        const tone1 = toneMap[c1.pinyin] ?? (["ā","á","ē","é","ī","í","ō","ó","ū","ú"].some(v => c1.pinyin.includes(v)) ? "平" : "仄");
        const tone2 = toneMap[c2.pinyin] ?? (["ā","á","ē","é","ī","í","ō","ó","ū","ú"].some(v => c2.pinyin.includes(v)) ? "平" : "仄");

        const sourceChar = c1.source ? c1 : (c2.source ? c2 : null);

        suggestions.push({
          name,
          chars: [c1.char, c2.char],
          charDetails: [
            { char: c1.char, wuxing: c1.wuxing, meaning: c1.meaning, pinyin: c1.pinyin, strokes: c1.strokes },
            { char: c2.char, wuxing: c2.wuxing, meaning: c2.meaning, pinyin: c2.pinyin, strokes: c2.strokes },
          ],
          combinedWuxing: [c1.wuxing, c2.wuxing],
          synergy,
          overallMeaning: buildOverallMeaning(c1.meaning, c2.meaning, name),
          source: sourceChar?.source,
          sourceText: sourceChar?.sourceText,
          sourceExplain: sourceChar?.source ? `出自${sourceChar.source}，${sourceChar.sourceText}` : undefined,
          tonePattern: `${surname ? "—" : ""}${tone1}${tone2}`,
          gender: gender === "male" ? "male" : "female",
          score: Math.min(score, 99),
          isPremium: false,
          tags: [...new Set([...c1.tags, ...c2.tags])].slice(0, 4),
        });

        // 更新首字、尾字使用次数，并推进该首字的偏移
        firstCharCount.set(firstChar, (firstCharCount.get(firstChar) ?? 0) + 1);
        lastCharCount.set(c2.char, (lastCharCount.get(c2.char) ?? 0) + 1);
        firstCharOffset.set(firstChar, offset + attempt + 1);
        found = true;
        anyAdded = true;
        break; // 该首字本轮已取到一个名字，换下一个首字
      }
      if (!found) {
        // 该首字已无合适尾字，不阻塞继续
      }
    }
    // 若本轮一个名字都没加进去，说明所有组合已耗尽，退出
    if (!anyAdded) break;
  }

  // 按分数降序
  suggestions.sort((a, b) => b.score - a.score);

  // 全部免费，直接返回
  return suggestions;
}

// 寓意文案结尾模板池
const MEANING_ENDINGS = [
  "寄托父母最深的祝福与期许。",
  "愿此名如同护身符，伴随一生。",
  "蕴含家人对孩子的无限期望与爱。",
  "承载着对未来美好人生的深深祝愿。",
  "是父母心中最美好愿景的凝聚。",
  "愿孩子一生幸福，前程似锦。",
  "字字珠玑，寓意深远，是父母爱的信笺。",
  "愿孩子如其名，阳光通达，福泽绵长。",
  "诗意温润，寄予无限深情与期盼。",
  "取意高远，愿孩子一生风华正茂。",
];

// 生成综合寓意文案
function buildOverallMeaning(m1: string, m2: string, name: string): string {
  const m1Short = m1.split("，")[0] ?? m1;
  const m2Short = m2.split("，")[0] ?? m2;
  // 用名字字符编码做散列，为每个名字稳定选取不同的结尾
  const hash = name.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const ending = MEANING_ENDINGS[hash % MEANING_ENDINGS.length]!;
  return `${m1Short}，${m2Short}，${ending}`;
}

// ===== 主入口 =====
export function runNamingEngine(input: NamingInput): NamingResult {
  const bazi = calculateBazi(input);
  const suggestions = generateNames(input, bazi);

  return {
    bazi,
    suggestions,
    freeSuggestions: suggestions,
    premiumSuggestions: [],
    surname: input.surname,
    gender: input.gender,
  };
}

// ===== 渲染层多语言辅助函数 =====
// 引擎在 API route（无 lang 上下文）中运行并生成中文 diagnosis/synergy/label，
// 这里提供按 lang 复算的纯函数，供客户端组件用结构化字段重建本地化文案。
// 不改变 NamingResult / BaziResult 等结果类型。

const PILLAR_LABELS: Record<Lang, [string, string, string, string]> = {
  zh: ["年柱", "月柱", "日柱", "时柱"],
  tw: ["年柱", "月柱", "日柱", "時柱"],
  en: ["Year", "Month", "Day", "Hour"],
};

/** 四柱标签：按柱索引 (0=年,1=月,2=日,3=时) 返回本地化标签 */
export function getPillarLabel(index: number, lang: Lang): string {
  return PILLAR_LABELS[lang][index] ?? PILLAR_LABELS[lang][0];
}

/** 五行相生/比和搭配描述（对应引擎 generateNames 中的 synergy 文案） */
export function buildSynergy(a: WuXing, b: WuXing, lang: Lang): string {
  const la = getWuxingLabel(a, lang);
  const lb = getWuxingLabel(b, lang);
  const generatesAB = WUXING_GENERATE[a] === b;
  const generatesBA = WUXING_GENERATE[b] === a;
  const same = a === b;
  if (lang === "en") {
    if (generatesAB) return `${la} generates ${lb} — an auspicious, supportive cycle`;
    if (generatesBA) return `${lb} generates ${la} — an auspicious, supportive cycle`;
    if (same) return `Double ${la} in harmony — kindred energies reinforce each other`;
    return "The Five Elements are balanced and complement one another";
  }
  if (lang === "tw") {
    if (generatesAB) return `${la}生${lb}，相生吉順`;
    if (generatesBA) return `${lb}生${la}，相生吉順`;
    if (same) return `雙${la}比和，同氣相求`;
    return "五行調和，相輔相成";
  }
  if (generatesAB) return `${la}生${lb}，相生吉顺`;
  if (generatesBA) return `${lb}生${la}，相生吉顺`;
  if (same) return `双${la}比和，同气相求`;
  return "五行调和，相辅相成";
}

/** 命局诊断文案（对应引擎 buildDiagnosis），由结构化字段按 lang 重建 */
export function buildDiagnosisI18n(
  dominant: WuXing[],
  weak: WuXing[],
  xiyongshen: WuXing[],
  lang: Lang,
): string {
  const join = lang === "en" ? ", " : "、";
  const dl = dominant.map(w => getWuxingLabel(w, lang));
  const wl = weak.map(w => getWuxingLabel(w, lang));
  const xl = xiyongshen.map(w => getWuxingLabel(w, lang));
  const xiStr = xl.join(join);

  if (lang === "en") {
    const dominantStr = dominant.length > 0 ? dl.join(join) : "fairly balanced";
    const weakStr = weak.length > 0 ? wl.join(join) : "no clear deficiency";
    if (dominant.length === 0 && weak.length === 0) {
      return `The Five Elements are evenly distributed with abundant vitality — a rare and well-balanced chart. The favorable elements are **${xiStr}**; the name should add the finishing touch with auspicious, meaningful characters.`;
    }
    return `In this chart **${dominantStr}** is abundant while **${weakStr}** runs a little short. According to authentic metaphysics, one should not blindly "fill what is missing" but judge by the strength of the day master and the overall pattern. The favorable elements are **${xiStr}**; the name should favor characters of these elements to enhance fortune.`;
  }
  if (lang === "tw") {
    const dominantStr = dominant.length > 0 ? dl.join(join) : "五行較均衡";
    const weakStr = weak.length > 0 ? wl.join(join) : "無明顯偏弱";
    if (dominant.length === 0 && weak.length === 0) {
      return `命局五行分布均衡，元氣充足，屬於難得的中和命局。專屬喜用神為 **${xiStr}**，起名宜錦上添花，選擇寓意美好的字。`;
    }
    return `命局中**${dominantStr}**旺盛有餘，**${weakStr}**稍顯不足。根據正宗命理，不可盲目「缺啥補啥」，應結合日主強弱綜合研判。您的專屬喜用神為 **${xiStr}**，起名宜選含此五行之字，以助運勢提升。`;
  }
  const dominantStr = dominant.length > 0 ? dl.join(join) : "五行较均衡";
  const weakStr = weak.length > 0 ? wl.join(join) : "无明显偏弱";
  if (dominant.length === 0 && weak.length === 0) {
    return `命局五行分布均衡，元气充足，属于难得的中和命局。专属喜用神为 **${xiStr}**，起名宜锦上添花，选择寓意美好的字。`;
  }
  return `命局中**${dominantStr}**旺盛有余，**${weakStr}**稍显不足。根据正宗命理，不可盲目"缺啥补啥"，应结合日主强弱综合研判。您的专属喜用神为 **${xiStr}**，起名宜选含此五行之字，以助运势提升。`;
}
