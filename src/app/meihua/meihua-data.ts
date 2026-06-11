/**
 * 梅花心易 - 核心数据库
 * 先天八卦、六十四卦卦辞爻辞、五行属性
 */

// ===== 语言与本地化解析 =====
export type Lang = "zh" | "en" | "tw";

/** 本地化字符串：三语 */
export interface L {
  zh: string;
  en: string;
  tw: string;
}
/** 本地化字符串数组：三语 */
export interface LArr {
  zh: string[];
  en: string[];
  tw: string[];
}

/** 解析单条本地化字符串 */
export function rs(v: L, lang: Lang): string {
  return v[lang];
}
/** 解析本地化字符串数组 */
export function ra(v: LArr, lang: Lang): string[] {
  return v[lang];
}

// ===== 五行类型 =====
// 注意：五行 KEY 始终保持中文（金木水火土），用于生克查表与比较；
// 显示时通过 WUXING_LABEL 解析为本地化标签（Metal / Wood ...）。
export type WuXing = "金" | "木" | "水" | "火" | "土";

/** 五行显示标签（金木水火土 → 本地化） */
export const WUXING_LABEL: Record<WuXing, L> = {
  金: { zh: "金", tw: "金", en: "Metal" },
  木: { zh: "木", tw: "木", en: "Wood" },
  水: { zh: "水", tw: "水", en: "Water" },
  火: { zh: "火", tw: "火", en: "Fire" },
  土: { zh: "土", tw: "土", en: "Earth" },
};
export function wuxingLabel(wx: WuXing, lang: Lang): string {
  return WUXING_LABEL[wx][lang];
}

// ===== 先天八卦（邵雍数序） =====
export interface BaGua {
  name: string;     // 卦名（KEY，保持中文，用于查表/比较）
  nameLabel: L;     // 卦名显示（en 为 "Qian (Heaven)" 形式）
  symbol: string;   // 卦符（glyph，保持）
  number: number;   // 先天八卦数（乾1~坤8）
  wuxing: WuXing;   // 五行属性（KEY，保持中文）
  nature: L;        // 自然象（显示用，本地化）
  family: L;        // 人伦象（显示用，本地化）
  lines: [0|1, 0|1, 0|1]; // 爻象（从下到上）
  direction: L;     // 先天方位（显示用，本地化）
  desc: L;          // 简述（显示用，本地化）
}

export const BA_GUA: Record<number, BaGua> = {
  1: { name: "乾", nameLabel: { zh: "乾", tw: "乾", en: "Qian (Heaven)" }, symbol: "☰", number: 1, wuxing: "金", nature: { zh: "天", tw: "天", en: "Heaven" }, family: { zh: "父", tw: "父", en: "Father" },           lines: [1,1,1], direction: { zh: "南", tw: "南", en: "South" },     desc: { zh: "刚健中正，元亨利贞", tw: "剛健中正，元亨利貞", en: "Strong and upright; supreme success through perseverance." } },
  2: { name: "兑", nameLabel: { zh: "兑", tw: "兌", en: "Dui (Lake)" },    symbol: "☱", number: 2, wuxing: "金", nature: { zh: "泽", tw: "澤", en: "Lake" },   family: { zh: "少女", tw: "少女", en: "Youngest daughter" },     lines: [0,1,1], direction: { zh: "东南", tw: "東南", en: "Southeast" }, desc: { zh: "喜悦和说，柔和通达", tw: "喜悅和說，柔和通達", en: "Joy and openness; gentle and freely flowing." } },
  3: { name: "离", nameLabel: { zh: "离", tw: "離", en: "Li (Fire)" },     symbol: "☲", number: 3, wuxing: "火", nature: { zh: "火", tw: "火", en: "Fire" },   family: { zh: "中女", tw: "中女", en: "Middle daughter" },       lines: [1,0,1], direction: { zh: "东", tw: "東", en: "East" },      desc: { zh: "文明附丽，光明磊落", tw: "文明附麗，光明磊落", en: "Radiance and clinging brightness; open and upright." } },
  4: { name: "震", nameLabel: { zh: "震", tw: "震", en: "Zhen (Thunder)" },symbol: "☳", number: 4, wuxing: "木", nature: { zh: "雷", tw: "雷", en: "Thunder" },family: { zh: "长男", tw: "長男", en: "Eldest son" },           lines: [0,0,1], direction: { zh: "东北", tw: "東北", en: "Northeast" }, desc: { zh: "震动奋进，雷厉风行", tw: "震動奮進，雷厲風行", en: "Arousing and advancing; swift and decisive." } },
  5: { name: "巽", nameLabel: { zh: "巽", tw: "巽", en: "Xun (Wind)" },    symbol: "☴", number: 5, wuxing: "木", nature: { zh: "风", tw: "風", en: "Wind" },   family: { zh: "长女", tw: "長女", en: "Eldest daughter" },       lines: [1,1,0], direction: { zh: "西南", tw: "西南", en: "Southwest" }, desc: { zh: "顺从柔和，入而后顺", tw: "順從柔和，入而後順", en: "Gentle and yielding; entering, then following through." } },
  6: { name: "坎", nameLabel: { zh: "坎", tw: "坎", en: "Kan (Water)" },   symbol: "☵", number: 6, wuxing: "水", nature: { zh: "水", tw: "水", en: "Water" },  family: { zh: "中男", tw: "中男", en: "Middle son" },            lines: [0,1,0], direction: { zh: "西", tw: "西", en: "West" },      desc: { zh: "险陷流动，处险不惊", tw: "險陷流動，處險不驚", en: "Flowing through danger; unshaken amid peril." } },
  7: { name: "艮", nameLabel: { zh: "艮", tw: "艮", en: "Gen (Mountain)" },symbol: "☶", number: 7, wuxing: "土", nature: { zh: "山", tw: "山", en: "Mountain" },family: { zh: "少男", tw: "少男", en: "Youngest son" },         lines: [1,0,0], direction: { zh: "西北", tw: "西北", en: "Northwest" }, desc: { zh: "止静笃实，适时而止", tw: "止靜篤實，適時而止", en: "Stillness and steadfastness; stopping at the right time." } },
  8: { name: "坤", nameLabel: { zh: "坤", tw: "坤", en: "Kun (Earth)" },   symbol: "☷", number: 8, wuxing: "土", nature: { zh: "地", tw: "地", en: "Earth" },  family: { zh: "母", tw: "母", en: "Mother" },                   lines: [0,0,0], direction: { zh: "北", tw: "北", en: "North" },     desc: { zh: "厚德载物，顺承天道", tw: "厚德載物，順承天道", en: "Vast virtue bearing all things; yielding to the way of heaven." } },
};

// 按名称索引（以中文卦名 KEY 索引）
export const BA_GUA_BY_NAME: Record<string, BaGua> = Object.fromEntries(
  Object.values(BA_GUA).map(g => [g.name, g])
);

// ===== 五行生克 =====
export const WUXING_SHENG: Record<WuXing, WuXing> = {
  金: "水", 水: "木", 木: "火", 火: "土", 土: "金",
};
export const WUXING_KE: Record<WuXing, WuXing> = {
  金: "木", 木: "土", 土: "水", 水: "火", 火: "金",
};

// ===== 体用关系分析 =====
export type TiYongType = "用生体" | "体生用" | "体克用" | "用克体" | "比和";
export type TiYongLevel = "大吉" | "中吉" | "吉" | "平" | "泄气" | "凶";

// type/level 显示标签（KEY 保持中文，用于查表/比较）
export const TIYONG_TYPE_LABEL: Record<TiYongType, L> = {
  用生体: { zh: "用生体", tw: "用生體", en: "Guest generates Host" },
  体生用: { zh: "体生用", tw: "體生用", en: "Host generates Guest" },
  体克用: { zh: "体克用", tw: "體克用", en: "Host controls Guest" },
  用克体: { zh: "用克体", tw: "用克體", en: "Guest controls Host" },
  比和:   { zh: "比和", tw: "比和", en: "Host & Guest in harmony" },
};
export const TIYONG_LEVEL_LABEL: Record<TiYongLevel, L> = {
  大吉: { zh: "大吉", tw: "大吉", en: "Very auspicious" },
  中吉: { zh: "中吉", tw: "中吉", en: "Auspicious" },
  吉:   { zh: "吉", tw: "吉", en: "Favorable" },
  平:   { zh: "平", tw: "平", en: "Neutral" },
  泄气: { zh: "泄气", tw: "洩氣", en: "Draining" },
  凶:   { zh: "凶", tw: "凶", en: "Inauspicious" },
};

/** 原始（多语言）体用关系，type/level 为 KEY，附带本地化标签与文案 */
export interface RawTiYongRelation {
  type: TiYongType;
  level: TiYongLevel;
  summary: L;
  detail: L;
  advice: L;
}

/** 面向组件的体用关系（type/level 保持 KEY；附本地化显示标签与已解析文案） */
export interface TiYongRelation {
  type: TiYongType;       // KEY（保持中文，用于 CATEGORY_ADVICE 查表 / 组件比较）
  level: TiYongLevel;     // KEY（保持中文，用于颜色映射 / 组件比较）
  typeLabel: string;      // 本地化显示
  levelLabel: string;     // 本地化显示
  summary: string;
  detail: string;
  advice: string;
}

const TIYONG_TABLE: Record<TiYongType, RawTiYongRelation> = {
  比和: {
    type: "比和",
    level: "吉",
    summary: { zh: "体用比和，诸事平稳", tw: "體用比和，諸事平穩", en: "Host and Guest in harmony — all matters proceed steadily." },
    detail: {
      zh: "体卦与用卦五行相同，两者和谐共振，事情发展顺其自然，无大吉亦无大凶，平稳推进即可。",
      tw: "體卦與用卦五行相同，兩者和諧共振，事情發展順其自然，無大吉亦無大凶，平穩推進即可。",
      en: "Host and Guest share the same element and resonate in harmony. The matter unfolds naturally — neither greatly auspicious nor inauspicious; simply let it proceed steadily.",
    },
    advice: {
      zh: "顺其自然，不必强求，耐心等待时机成熟。",
      tw: "順其自然，不必強求，耐心等待時機成熟。",
      en: "Let things take their course, do not force them, and wait patiently for the moment to ripen.",
    },
  },
  用生体: {
    type: "用生体",
    level: "大吉",
    summary: { zh: "用生体，大吉！外有援助", tw: "用生體，大吉！外有援助", en: "Guest generates Host — very auspicious! Outside help is at hand." },
    detail: {
      zh: "用卦生扶体卦，代表外界环境、他人或所占之事对自己有利，有贵人相助，事情顺水推舟，结果佳。",
      tw: "用卦生扶體卦，代表外界環境、他人或所占之事對自己有利，有貴人相助，事情順水推舟，結果佳。",
      en: "The Guest trigram nourishes the Host, meaning the environment, other people, or the matter itself favors you. A benefactor lends a hand, things flow with the current, and the outcome is good.",
    },
    advice: {
      zh: "大胆行事，主动出击，贵人就在左右，善加利用外部资源。",
      tw: "大膽行事，主動出擊，貴人就在左右，善加利用外部資源。",
      en: "Act boldly and take the initiative — a benefactor is near; make good use of the resources around you.",
    },
  },
  体生用: {
    type: "体生用",
    level: "泄气",
    summary: { zh: "体生用，耗费精力", tw: "體生用，耗費精力", en: "Host generates Guest — your energy is being drained." },
    detail: {
      zh: "体卦生扶用卦，代表自身付出多而回报少，虽然事情可以推进，但主体方耗费精力，得不偿失。",
      tw: "體卦生扶用卦，代表自身付出多而回報少，雖然事情可以推進，但主體方耗費精力，得不償失。",
      en: "The Host trigram nourishes the Guest, meaning you give much and receive little. The matter can advance, but you spend yourself for too little in return.",
    },
    advice: {
      zh: "量力而行，适当收敛，避免过度付出，注意保存实力。",
      tw: "量力而行，適當收斂，避免過度付出，注意保存實力。",
      en: "Act within your means, hold back somewhat, avoid over-giving, and conserve your strength.",
    },
  },
  体克用: {
    type: "体克用",
    level: "中吉",
    summary: { zh: "体克用，需付努力可成", tw: "體克用，需付努力可成", en: "Host controls Guest — success comes with effort." },
    detail: {
      zh: "体卦克制用卦，代表自身力量可以驾驭所占之事，但需主动付出力量。事情可成，但需努力。",
      tw: "體卦克制用卦，代表自身力量可以駕馭所占之事，但需主動付出力量。事情可成，但需努力。",
      en: "The Host trigram controls the Guest, meaning your own strength can master the matter — but you must actively exert it. Success is possible, yet it takes effort.",
    },
    advice: {
      zh: "主动出击，掌握主动权，以己之力推动事情向好发展，切勿消极等待。",
      tw: "主動出擊，掌握主動權，以己之力推動事情向好發展，切勿消極等待。",
      en: "Take the initiative and hold the upper hand; drive the matter forward by your own power, and never wait passively.",
    },
  },
  用克体: {
    type: "用克体",
    level: "凶",
    summary: { zh: "用克体，阻力较大，需谨慎", tw: "用克體，阻力較大，需謹慎", en: "Guest controls Host — strong resistance; proceed with caution." },
    detail: {
      zh: "用卦克制体卦，代表外界环境、他人或所占之事对自身不利，阻力较大，行事需格外谨慎。",
      tw: "用卦克制體卦，代表外界環境、他人或所占之事對自身不利，阻力較大，行事需格外謹慎。",
      en: "The Guest trigram controls the Host, meaning the environment, others, or the matter works against you. Resistance is strong, and you must act with particular care.",
    },
    advice: {
      zh: "此时不宜强行推进，宜守不宜攻，静待时机转变，或从长计议换个方向。",
      tw: "此時不宜強行推進，宜守不宜攻，靜待時機轉變，或從長計議換個方向。",
      en: "This is no time to force matters — defend rather than attack, wait quietly for the tide to turn, or rethink and change direction.",
    },
  },
};

export function analyzeTiYong(ti: WuXing, yong: WuXing, lang: Lang = "zh"): TiYongRelation {
  let raw: RawTiYongRelation;
  if (ti === yong) {
    raw = TIYONG_TABLE["比和"];
  } else if (WUXING_SHENG[yong] === ti) {
    raw = TIYONG_TABLE["用生体"];
  } else if (WUXING_SHENG[ti] === yong) {
    raw = TIYONG_TABLE["体生用"];
  } else if (WUXING_KE[ti] === yong) {
    raw = TIYONG_TABLE["体克用"];
  } else {
    raw = TIYONG_TABLE["用克体"];
  }
  return {
    type: raw.type,
    level: raw.level,
    typeLabel: TIYONG_TYPE_LABEL[raw.type][lang],
    levelLabel: TIYONG_LEVEL_LABEL[raw.level][lang],
    summary: rs(raw.summary, lang),
    detail: rs(raw.detail, lang),
    advice: rs(raw.advice, lang),
  };
}

// ===== 六十四卦数据 =====
export interface GUA64 {
  name: string;           // 卦名
  upper: number;          // 上卦先天数
  lower: number;          // 下卦先天数
  symbol: string;         // 六爻符号（如 "110100"，从下到上）
  gua_ci: string;         // 卦辞
  gua_ci_baihua: string;  // 卦辞白话
  yao_ci: string[];       // 六爻爻辞（1-6爻）
  yao_ci_baihua: string[]; // 爻辞白话
  overall: string;        // 总体意象
}

// 64卦数据（上卦×下卦 → 卦名）— 中文卦名为 KEY，用于查表/比较
export const GUA_MAP: Record<string, string> = {
  "1-1": "乾为天",  "1-2": "天泽履",  "1-3": "天火同人", "1-4": "天雷无妄",
  "1-5": "天风姤",  "1-6": "天水讼",  "1-7": "天山遁",  "1-8": "天地否",
  "2-1": "泽天夬",  "2-2": "兑为泽",  "2-3": "泽火革",  "2-4": "泽雷随",
  "2-5": "泽风大过","2-6": "泽水困",  "2-7": "泽山咸",  "2-8": "泽地萃",
  "3-1": "火天大有","3-2": "火泽睽",  "3-3": "离为火",  "3-4": "火雷噬嗑",
  "3-5": "火风鼎",  "3-6": "火水未济","3-7": "火山旅",  "3-8": "火地晋",
  "4-1": "雷天大壮","4-2": "雷泽归妹","4-3": "雷火丰",  "4-4": "震为雷",
  "4-5": "雷风恒",  "4-6": "雷水解",  "4-7": "雷山小过","4-8": "雷地豫",
  "5-1": "风天小畜","5-2": "风泽中孚","5-3": "风火家人","5-4": "风雷益",
  "5-5": "巽为风",  "5-6": "风水涣",  "5-7": "风山渐",  "5-8": "风地观",
  "6-1": "水天需",  "6-2": "水泽节",  "6-3": "水火既济","6-4": "水雷屯",
  "6-5": "水风井",  "6-6": "坎为水",  "6-7": "水山蹇",  "6-8": "水地比",
  "7-1": "山天大畜","7-2": "山泽损",  "7-3": "山火贲",  "7-4": "山雷颐",
  "7-5": "山风蛊",  "7-6": "山水蒙",  "7-7": "艮为山",  "7-8": "山地剥",
  "8-1": "地天泰",  "8-2": "地泽临",  "8-3": "地火明夷","8-4": "地雷复",
  "8-5": "地风升",  "8-6": "地水师",  "8-7": "地山谦",  "8-8": "坤为地",
};

// 卦名显示标签（中文卦名 KEY → 本地化；en 为传统英文译名）
// 仅用于「显示」；查表/比较一律使用中文卦名 KEY。
const GUA_NAME_EN: Record<string, string> = {
  乾为天: "Qian — The Creative (Heaven)", 天泽履: "Lü — Treading", 天火同人: "Tong Ren — Fellowship", 天雷无妄: "Wu Wang — Innocence",
  天风姤: "Gou — Coming to Meet", 天水讼: "Song — Conflict", 天山遁: "Dun — Retreat", 天地否: "Pi — Standstill",
  泽天夬: "Guai — Breakthrough", 兑为泽: "Dui — The Joyous (Lake)", 泽火革: "Ge — Revolution", 泽雷随: "Sui — Following",
  泽风大过: "Da Guo — Great Excess", 泽水困: "Kun — Oppression", 泽山咸: "Xian — Influence", 泽地萃: "Cui — Gathering",
  火天大有: "Da You — Great Possession", 火泽睽: "Kui — Opposition", 离为火: "Li — The Clinging (Fire)", 火雷噬嗑: "Shi He — Biting Through",
  火风鼎: "Ding — The Cauldron", 火水未济: "Wei Ji — Before Completion", 火山旅: "Lü — The Wanderer", 火地晋: "Jin — Progress",
  雷天大壮: "Da Zhuang — Great Power", 雷泽归妹: "Gui Mei — The Marrying Maiden", 雷火丰: "Feng — Abundance", 震为雷: "Zhen — The Arousing (Thunder)",
  雷风恒: "Heng — Duration", 雷水解: "Jie — Deliverance", 雷山小过: "Xiao Guo — Small Excess", 雷地豫: "Yu — Enthusiasm",
  风天小畜: "Xiao Chu — Small Taming", 风泽中孚: "Zhong Fu — Inner Truth", 风火家人: "Jia Ren — The Family", 风雷益: "Yi — Increase",
  巽为风: "Xun — The Gentle (Wind)", 风水涣: "Huan — Dispersion", 风山渐: "Jian — Gradual Progress", 风地观: "Guan — Contemplation",
  水天需: "Xu — Waiting", 水泽节: "Jie — Limitation", 水火既济: "Ji Ji — After Completion", 水雷屯: "Zhun — Difficulty at the Beginning",
  水风井: "Jing — The Well", 坎为水: "Kan — The Abysmal (Water)", 水山蹇: "Jian — Obstruction", 水地比: "Bi — Holding Together",
  山天大畜: "Da Chu — Great Taming", 山泽损: "Sun — Decrease", 山火贲: "Bi — Grace", 山雷颐: "Yi — Nourishment",
  山风蛊: "Gu — Work on the Decayed", 山水蒙: "Meng — Youthful Folly", 艮为山: "Gen — Keeping Still (Mountain)", 山地剥: "Bo — Splitting Apart",
  地天泰: "Tai — Peace", 地泽临: "Lin — Approach", 地火明夷: "Ming Yi — Darkening of the Light", 地雷复: "Fu — Return",
  地风升: "Sheng — Pushing Upward", 地水师: "Shi — The Army", 地山谦: "Qian — Modesty", 坤为地: "Kun — The Receptive (Earth)",
};

/** 卦名显示：zh/tw 保持中文卦名（tw 自动繁体由上游处理），en 用传统英文译名（无则回退中文） */
export function guaNameLabel(guaName: string, lang: Lang): string {
  if (lang === "en") return GUA_NAME_EN[guaName] ?? guaName;
  return guaName;
}

// 卦辞数据库（精选常见卦）— 经典卦辞/爻辞：zh 简体 · tw 繁体 · en 忠实英译
interface RawGua64 {
  overall: L;
  gua_ci: L;
  gua_ci_baihua: L;
  yao_ci: LArr;
  yao_ci_baihua: LArr;
}

export const GUA64_DATA: Record<string, RawGua64> = {
  "乾为天": {
    overall: { zh: "刚健不息，元亨利贞", tw: "剛健不息，元亨利貞", en: "Ceaseless strength; supreme success through perseverance." },
    gua_ci: { zh: "元，亨，利，贞。", tw: "元，亨，利，貞。", en: "Sublime success; furthering through perseverance." },
    gua_ci_baihua: { zh: "大通顺利，有利于守持正固。刚健有为，自强不息。", tw: "大通順利，有利於守持正固。剛健有為，自強不息。", en: "Great and free progress, furthered by holding firm and upright; vigorous, capable, and tirelessly self-strengthening." },
    yao_ci: {
      zh: ["初九：潜龙，勿用。","九二：见龙在田，利见大人。","九三：君子终日乾乾，夕惕若厉，无咎。","九四：或跃在渊，无咎。","九五：飞龙在天，利见大人。","上九：亢龙，有悔。"],
      tw: ["初九：潛龍，勿用。","九二：見龍在田，利見大人。","九三：君子終日乾乾，夕惕若厲，無咎。","九四：或躍在淵，無咎。","九五：飛龍在天，利見大人。","上九：亢龍，有悔。"],
      en: ["Nine at the beginning: Hidden dragon. Do not act.","Nine in the second: Dragon appearing in the field. It furthers one to see the great man.","Nine in the third: The superior man is creatively active all day; at nightfall his mind is still beset with cares. Danger — but no blame.","Nine in the fourth: Wavering flight over the depths. No blame.","Nine in the fifth: Flying dragon in the heavens. It furthers one to see the great man.","Nine at the top: Arrogant dragon will have cause to repent."],
    },
    yao_ci_baihua: {
      zh: ["龙潜深渊，时机未到，暂且蛰伏，不宜轻动。","龙出现于田野，利于拜见有德行的大人。","君子整天努力进取，夜晚也小心警惕，如此虽处险境也无过失。","好像跃起又沉于深渊，前进后退都无咎害。","龙飞腾于天空，利于拜见有德行的大人，此为最佳时机。","龙飞得太高，必有悔恨，物极必反，应适可而止。"],
      tw: ["龍潛深淵，時機未到，暫且蟄伏，不宜輕動。","龍出現於田野，利於拜見有德行的大人。","君子整天努力進取，夜晚也小心警惕，如此雖處險境也無過失。","好像躍起又沉於深淵，前進後退都無咎害。","龍飛騰於天空，利於拜見有德行的大人，此為最佳時機。","龍飛得太高，必有悔恨，物極必反，應適可而止。"],
      en: ["The dragon hides in the deep; the time has not come — lie low for now and do not act rashly.","The dragon appears in the field; it is favorable to seek out a person of virtue and standing.","The superior man strives all day and stays watchful into the night; thus, even in peril, he is without fault.","As if leaping up, then sinking back into the depths — neither advance nor retreat brings harm.","The dragon flies in the heavens; it is favorable to seek the great man — this is the finest moment.","The dragon flies too high and must come to regret it; when things reach their peak they reverse, so know when to stop."],
    },
  },
  "坤为地": {
    overall: { zh: "厚德载物，顺承天道", tw: "厚德載物，順承天道", en: "Vast virtue bearing all; yielding in accord with heaven's way." },
    gua_ci: { zh: "元，亨，利牝马之贞。君子有攸往，先迷后得主，利。西南得朋，东北丧朋。安贞吉。", tw: "元，亨，利牝馬之貞。君子有攸往，先迷後得主，利。西南得朋，東北喪朋。安貞吉。", en: "Sublime success, furthering through the perseverance of a mare. The superior man has somewhere to go: first he goes astray, later he finds his lord. It is favorable to find friends in the west and south, to forgo friends in the east and north. Quiet perseverance brings good fortune." },
    gua_ci_baihua: { zh: "至为通顺，利于像母马一样柔顺地守持正道。君子出行，先迷失方向后得到归宿。西南方向有益于得友，东北方向则会失友。安静守正则吉祥。", tw: "至為通順，利於像母馬一樣柔順地守持正道。君子出行，先迷失方向後得到歸宿。西南方向有益於得友，東北方向則會失友。安靜守正則吉祥。", en: "Utterly smooth and open; it is good to hold to the right path with the yielding gentleness of a mare. The superior man sets out, loses his way at first, then finds his place. The southwest favors gaining friends, the northeast loses them. Quiet, upright steadiness brings good fortune." },
    yao_ci: {
      zh: ["初六：履霜，坚冰至。","六二：直，方，大，不习无不利。","六三：含章可贞，或从王事，无成有终。","六四：括囊，无咎，无誉。","六五：黄裳，元吉。","上六：龙战于野，其血玄黄。"],
      tw: ["初六：履霜，堅冰至。","六二：直，方，大，不習無不利。","六三：含章可貞，或從王事，無成有終。","六四：括囊，無咎，無譽。","六五：黃裳，元吉。","上六：龍戰於野，其血玄黃。"],
      en: ["Six at the beginning: When there is hoarfrost underfoot, solid ice is not far off.","Six in the second: Straight, square, great. Without purpose, yet nothing remains unfurthered.","Six in the third: Hidden lines. One is able to remain persevering. If by chance you follow the affairs of a king, seek not the work for yourself but bring it to completion.","Six in the fourth: A tied-up sack. No blame, no praise.","Six in the fifth: A yellow lower garment brings supreme good fortune.","Six at the top: Dragons fight in the meadow; their blood is black and yellow."],
    },
    yao_ci_baihua: {
      zh: ["踩到霜，坚冰即将到来，阴气渐盛应提前预防。","正直、端方、广大，无需特别学习，做什么都有利。","内有文采，守持正固，或者辅助王事，不贪功劳而有始有终。","束紧袋口，既无过错，也无称誉，明哲保身。","穿着黄色的下裳，大吉，中正之德显现。","阴阳相争于野外，血流玄黄，阴阳失调，凶险之兆。"],
      tw: ["踩到霜，堅冰即將到來，陰氣漸盛應提前預防。","正直、端方、廣大，無需特別學習，做什麼都有利。","內有文采，守持正固，或者輔助王事，不貪功勞而有始有終。","束緊袋口，既無過錯，也無稱譽，明哲保身。","穿著黃色的下裳，大吉，中正之德顯現。","陰陽相爭於野外，血流玄黃，陰陽失調，凶險之兆。"],
      en: ["Treading on frost: solid ice is coming. The yin force grows; guard against it early.","Upright, square, and great — without special effort, whatever you do is favorable.","Beauty held within: hold to what is right. If you serve a ruler's cause, claim no credit yet see it through to the end.","A drawn-tight sack: no fault and no praise — keep wisely to yourself.","A yellow lower garment: supreme good fortune; the virtue of balance and rectitude shines forth.","Dragons war in the wild, their blood dark and yellow — yin and yang in disorder, an omen of peril."],
    },
  },
  "水火既济": {
    overall: { zh: "既成之象，盛极而衰", tw: "既成之象，盛極而衰", en: "The image of completion; at its peak, decline begins." },
    gua_ci: { zh: "亨，小利贞，初吉终乱。", tw: "亨，小利貞，初吉終亂。", en: "Success in small matters. Perseverance furthers. At the beginning good fortune, at the end disorder." },
    gua_ci_baihua: { zh: "通顺，小事有利于守持正固，开始吉祥而最终会出现变乱。", tw: "通順，小事有利於守持正固，開始吉祥而最終會出現變亂。", en: "Smooth and open; in small matters it is good to hold firm and upright. Auspicious at the start, but disorder comes in the end." },
    yao_ci: {
      zh: ["初九：曳其轮，濡其尾，无咎。","六二：妇丧其茀，勿逐，七日得。","九三：高宗伐鬼方，三年克之，小人勿用。","六四：繻有衣袽，终日戒。","九五：东邻杀牛，不如西邻之禴祭，实受其福。","上六：濡其首，厉。"],
      tw: ["初九：曳其輪，濡其尾，無咎。","六二：婦喪其茀，勿逐，七日得。","九三：高宗伐鬼方，三年克之，小人勿用。","六四：繻有衣袽，終日戒。","九五：東鄰殺牛，不如西鄰之禴祭，實受其福。","上六：濡其首，厲。"],
      en: ["Nine at the beginning: He brakes his wheels and gets his tail wet. No blame.","Six in the second: The woman loses the curtain of her carriage. Do not run after it; on the seventh day you will get it.","Nine in the third: The Illustrious Ancestor disciplines the Devil's Country. After three years he conquers it. Inferior people must not be employed.","Six in the fourth: The finest clothes turn to rags. Be careful all day long.","Nine in the fifth: The neighbor in the east who slaughters an ox does not attain as much real happiness as the neighbor in the west with his small offering.","Six at the top: He gets his head in the water. Danger."],
    },
    yao_ci_baihua: {
      zh: ["拖住车轮，打湿尾巴，审慎前进无过失。","妇人丢失了头饰，不必去追寻，七天后自然会找到。","高宗征伐鬼方，三年才克服，不要任用小人。","衣服上有补丁，整日警戒谨慎。","东边邻居的盛大祭祀，不如西边邻居的简单祭祀来得真诚，真诚者实受福佑。","水没过头顶，危险。"],
      tw: ["拖住車輪，打濕尾巴，審慎前進無過失。","婦人丟失了頭飾，不必去追尋，七天後自然會找到。","高宗征伐鬼方，三年才克服，不要任用小人。","衣服上有補丁，整日警戒謹慎。","東邊鄰居的盛大祭祀，不如西邊鄰居的簡單祭祀來得真誠，真誠者實受福佑。","水沒過頭頂，危險。"],
      en: ["Braking the wheels and wetting the tail — advancing with care, there is no fault.","The woman loses her headdress; there is no need to chase after it — within seven days it returns of itself.","The Illustrious Ancestor campaigned against the Devil's Country and prevailed only after three years; do not employ petty people.","There are patches on the garments; stay watchful and careful all day long.","The eastern neighbor's grand sacrifice is less sincere than the western neighbor's simple one; the sincere truly receive blessing.","The water rises over his head — danger."],
    },
  },
  "火水未济": {
    overall: { zh: "未竟之象，继续努力", tw: "未竟之象，繼續努力", en: "The image of the unfinished; press on with effort." },
    gua_ci: { zh: "亨，小狐汔济，濡其尾，无攸利。", tw: "亨，小狐汔濟，濡其尾，無攸利。", en: "Success. But if the little fox, after nearly completing the crossing, gets its tail in the water, there is nothing that would further." },
    gua_ci_baihua: { zh: "通顺，小狐狸渡水快到对岸时，弄湿了尾巴，无所利益。", tw: "通順，小狐狸渡水快到對岸時，弄濕了尾巴，無所利益。", en: "Smooth and open; yet when the little fox, nearly across the water, wets its tail, nothing is gained." },
    yao_ci: {
      zh: ["初六：濡其尾，吝。","九二：曳其轮，贞吉。","六三：未济，征凶，利涉大川。","九四：贞吉，悔亡，震用伐鬼方，三年有赏于大国。","六五：贞吉，无悔，君子之光，有孚吉。","上九：有孚于饮酒，无咎，濡其首，有孚失是。"],
      tw: ["初六：濡其尾，吝。","九二：曳其輪，貞吉。","六三：未濟，征凶，利涉大川。","九四：貞吉，悔亡，震用伐鬼方，三年有賞於大國。","六五：貞吉，無悔，君子之光，有孚吉。","上九：有孚於飲酒，無咎，濡其首，有孚失是。"],
      en: ["Six at the beginning: He gets his tail in the water. Humiliating.","Nine in the second: He brakes his wheels. Perseverance brings good fortune.","Six in the third: Before completion, attack brings misfortune. It furthers one to cross the great water.","Nine in the fourth: Perseverance brings good fortune. Remorse disappears. Shake and discipline the Devil's Country; for three years, great rewards from a mighty kingdom.","Six in the fifth: Perseverance brings good fortune. No remorse. The light of the superior man is true. Good fortune.","Nine at the top: One drinks wine in good faith — no blame. But if he wets his head, he loses it, even in good faith."],
    },
    yao_ci_baihua: {
      zh: ["打湿了尾巴，有些不顺，前路艰难。","拖住车轮，守持正固则吉，稳步前进。","尚未完成，强行前进有凶险，但利于渡过大难关。","守持正固则吉，悔恨消除，奋力征讨，三年后获得嘉奖。","守持正固则吉，没有悔恨，君子的光辉，诚信则吉。","饮酒作乐有诚信无过错，但若沉湎其中弄湿了头，则失去诚信之道。"],
      tw: ["打濕了尾巴，有些不順，前路艱難。","拖住車輪，守持正固則吉，穩步前進。","尚未完成，強行前進有凶險，但利於渡過大難關。","守持正固則吉，悔恨消除，奮力征討，三年後獲得嘉獎。","守持正固則吉，沒有悔恨，君子的光輝，誠信則吉。","飲酒作樂有誠信無過錯，但若沉湎其中弄濕了頭，則失去誠信之道。"],
      en: ["Wetting the tail: things are somewhat awry, the road ahead is hard.","Braking the wheels: holding firm and upright brings good fortune — advance steadily.","Not yet across; forcing ahead brings peril, yet it is favorable to cross the great river.","Holding firm brings good fortune and dissolves regret; campaign with vigor, and after three years receive honors from a great state.","Holding firm brings good fortune without regret; the radiance of the superior man, sincerity brings good fortune.","Drinking in good faith brings no fault; but to wallow in it and wet one's head is to lose the way of sincerity."],
    },
  },
  "地天泰": {
    overall: { zh: "天地交泰，万物通顺", tw: "天地交泰，萬物通順", en: "Heaven and earth unite; all things flow freely." },
    gua_ci: { zh: "小往大来，吉，亨。", tw: "小往大來，吉，亨。", en: "The small departs, the great approaches. Good fortune. Success." },
    gua_ci_baihua: { zh: "小的离去，大的到来，吉祥，通顺。天地交感，万物生长茂盛。", tw: "小的離去，大的到來，吉祥，通順。天地交感，萬物生長茂盛。", en: "The small goes, the great comes — auspicious and smooth. Heaven and earth commune, and all things flourish." },
    yao_ci: {
      zh: ["初九：拔茅茹，以其汇，征吉。","九二：包荒，用冯河，不遐遗，朋亡，得尚于中行。","九三：无平不陂，无往不复，艰贞无咎。","六四：翩翩，不富以其邻，不戒以孚。","六五：帝乙归妹，以祉元吉。","上六：城复于隍，勿用师，自邑告命，贞吝。"],
      tw: ["初九：拔茅茹，以其彙，征吉。","九二：包荒，用馮河，不遐遺，朋亡，得尚於中行。","九三：無平不陂，無往不復，艱貞無咎。","六四：翩翩，不富以其鄰，不戒以孚。","六五：帝乙歸妹，以祉元吉。","上六：城復於隍，勿用師，自邑告命，貞吝。"],
      en: ["Nine at the beginning: When ribbon grass is pulled up, the sod comes with it. Each according to his kind. Undertakings bring good fortune.","Nine in the second: Bearing with the uncultured, crossing the river resolutely, not neglecting the distant, not regarding companions — thus one may manage to walk the middle path.","Nine in the third: No plain not followed by a slope, no going not followed by a return. He who remains persevering in danger is without blame.","Six in the fourth: He flutters down, not boasting of his wealth, together with his neighbor, guileless and sincere.","Six in the fifth: The sovereign Yi gives his daughter in marriage. This brings blessing and supreme good fortune.","Six at the top: The wall falls back into the moat. Use no army now. Make your commands known within your own town. Perseverance brings humiliation."],
    },
    yao_ci_baihua: {
      zh: ["拔茅草连根而起，同类一起行动，前进则吉。","包容荒远，徒步涉河，不遗漏远方，不需朋党，得与中道相称。","没有平地不变成山坡，没有前去不归来的，守持正固无过。","轻盈活泼，不独富而与邻居共享，以诚信而不需戒备。","帝乙嫁女，以幸福为目的，大吉大利。","城墙倒塌回填沟中，不宜兴兵，从自己的城邑告令，守持正固也有困难。"],
      tw: ["拔茅草連根而起，同類一起行動，前進則吉。","包容荒遠，徒步涉河，不遺漏遠方，不需朋黨，得與中道相稱。","沒有平地不變成山坡，沒有前去不歸來的，守持正固無過。","輕盈活潑，不獨富而與鄰居共享，以誠信而不需戒備。","帝乙嫁女，以幸福為目的，大吉大利。","城牆倒塌回填溝中，不宜興兵，從自己的城邑告令，守持正固也有困難。"],
      en: ["Pulling up grass by the roots — the like-minded move together; to advance is auspicious.","Embrace the wild and distant, ford the river on foot, overlook nothing far off, need no faction — thus you accord with the middle way.","No level ground that does not slope, no going that does not return; hold firm in hardship and stay free of fault.","Light and lively, not hoarding wealth but sharing with neighbors, sincere and needing no guard.","The sovereign Yi gives his daughter in marriage for the sake of happiness — greatly auspicious.","The wall crumbles back into the moat; do not raise an army. Issue commands within your own town; even holding firm brings difficulty."],
    },
  },
  "天地否": {
    overall: { zh: "天地不交，万物不通", tw: "天地不交，萬物不通", en: "Heaven and earth do not meet; all things are blocked." },
    gua_ci: { zh: "否之匪人，不利君子贞，大往小来。", tw: "否之匪人，不利君子貞，大往小來。", en: "Standstill. Evil people do not further the perseverance of the superior man. The great departs, the small approaches." },
    gua_ci_baihua: { zh: "否塞不是因为人的原因，不利于君子守持正固，大的离去，小的到来，天地隔阂。", tw: "否塞不是因為人的原因，不利於君子守持正固，大的離去，小的到來，天地隔閡。", en: "The standstill is not the fault of the worthy; it does not favor the superior man's perseverance. The great goes, the small comes; heaven and earth stand apart." },
    yao_ci: {
      zh: ["初六：拔茅茹，以其汇，贞吉，亨。","六二：包承，小人吉，大人否，亨。","六三：包羞。","九四：有命无咎，畴离祉。","九五：休否，大人吉，其亡其亡，系于苞桑。","上九：倾否，先否后喜。"],
      tw: ["初六：拔茅茹，以其彙，貞吉，亨。","六二：包承，小人吉，大人否，亨。","六三：包羞。","九四：有命無咎，疇離祉。","九五：休否，大人吉，其亡其亡，繫於苞桑。","上九：傾否，先否後喜。"],
      en: ["Six at the beginning: When ribbon grass is pulled up, the sod comes with it. Each according to his kind. Perseverance brings good fortune and success.","Six in the second: They bear and endure; this means good fortune for inferior people. The standstill serves to help the great man attain success.","Six in the third: They bear shame.","Nine in the fourth: He who acts at the command of the highest remains without blame. Those of like mind partake of the blessing.","Nine in the fifth: Standstill is giving way. Good fortune for the great man. \"What if it should fail, what if it should fail?\" In this way he ties it to a cluster of mulberry shoots.","Nine at the top: The standstill comes to an end. First standstill, then good fortune."],
    },
    yao_ci_baihua: {
      zh: ["拔茅草连根而起，同类谨守正道则吉，通顺。","小人顺承大德则吉，大人在否塞中仍处之泰然。","内心忍辱含羞。","奉行天命无过失，同类皆受福佑。","否塞终止，大人吉祥，危惧则安，如同系于丛生的桑树一样稳固。","倾覆否塞，先否塞后喜悦，物极必反。"],
      tw: ["拔茅草連根而起，同類謹守正道則吉，通順。","小人順承大德則吉，大人在否塞中仍處之泰然。","內心忍辱含羞。","奉行天命無過失，同類皆受福佑。","否塞終止，大人吉祥，危懼則安，如同繫於叢生的桑樹一樣穩固。","傾覆否塞，先否塞後喜悅，物極必反。"],
      en: ["Pulling up grass by the roots — when the like-minded keep to the right path, it is auspicious and smooth.","Inferior people who submit to virtue find good fortune; the great man stays composed within the standstill.","Inwardly enduring shame.","Acting on heaven's mandate brings no fault; those of like kind share the blessing.","The standstill ends; good fortune for the great man. In constant wariness he stays secure, as if bound to a cluster of mulberry shoots.","The standstill is overturned: first blockage, then joy — when things reach their limit, they reverse."],
    },
  },
  "水雷屯": {
    overall: { zh: "初始艰难，破土而生", tw: "初始艱難，破土而生", en: "Hard beginnings; sprouting through the soil." },
    gua_ci: { zh: "元亨，利贞，勿用有攸往，利建侯。", tw: "元亨，利貞，勿用有攸往，利建侯。", en: "Sublime success, furthering through perseverance. Undertake nothing now; it furthers one to appoint helpers." },
    gua_ci_baihua: { zh: "大通顺利，利于守持正固，不宜有所往，利于建立诸侯。初创之时，艰难中孕育生机。", tw: "大通順利，利於守持正固，不宜有所往，利於建立諸侯。初創之時，艱難中孕育生機。", en: "Great and free progress, furthered by holding firm; it is not the time to set out, but good to appoint helpers. At the founding moment, life stirs amid hardship." },
    yao_ci: {
      zh: ["初九：磐桓，利居贞，利建侯。","六二：屯如邅如，乘马班如，匪寇婚媾，女子贞不字，十年乃字。","六三：即鹿无虞，惟入于林中，君子几不如舍，往吝。","六四：乘马班如，求婚媾，往吉，无不利。","九五：屯其膏，小贞吉，大贞凶。","上六：乘马班如，泣血涟如。"],
      tw: ["初九：磐桓，利居貞，利建侯。","六二：屯如邅如，乘馬班如，匪寇婚媾，女子貞不字，十年乃字。","六三：即鹿無虞，惟入於林中，君子幾不如捨，往吝。","六四：乘馬班如，求婚媾，往吉，無不利。","九五：屯其膏，小貞吉，大貞凶。","上六：乘馬班如，泣血漣如。"],
      en: ["Nine at the beginning: Hesitation and hindrance. It furthers one to remain persevering. It furthers one to appoint helpers.","Six in the second: Difficulties pile up. Horse and wagon part. He is not a robber; he wants to woo when the time comes. The maiden is chaste, she does not pledge herself. Ten years — then she pledges.","Six in the third: Whoever hunts deer without the forester only loses his way in the forest. The superior man understands the signs and prefers to desist. To go on brings humiliation.","Six in the fourth: Horse and wagon part. Strive for union. To go brings good fortune; everything acts to further.","Nine in the fifth: Difficulties in blessing. A little perseverance brings good fortune. Great perseverance brings misfortune.","Six at the top: Horse and wagon part. Bloody tears flow."],
    },
    yao_ci_baihua: {
      zh: ["徘徊不进，利于守持正固，利于建立诸侯。","屯难中前进困难，骑马徘徊，并非盗贼而是求婚，女子守正不嫁，十年后才得嫁。","追鹿没有向导，只是进入树林中，君子几乎不如放弃，强行前往会有困难。","骑马徘徊，求婚则前往吉祥，没有不利。","积蓄财物，小事守正则吉，大事守正则凶，不可贪多求大。","骑马徘徊，泣血涟涟，处境艰难至极。"],
      tw: ["徘徊不進，利於守持正固，利於建立諸侯。","屯難中前進困難，騎馬徘徊，並非盜賊而是求婚，女子守正不嫁，十年後才得嫁。","追鹿沒有嚮導，只是進入樹林中，君子幾乎不如放棄，強行前往會有困難。","騎馬徘徊，求婚則前往吉祥，沒有不利。","積蓄財物，小事守正則吉，大事守正則凶，不可貪多求大。","騎馬徘徊，泣血漣漣，處境艱難至極。"],
      en: ["Hesitating, not advancing; it is good to hold firm and to appoint helpers.","Amid difficulty advance is hard; horse and rider waver. He is no robber but a suitor. The maiden stays chaste and does not wed; after ten years she marries.","Chasing deer without a guide, one only strays into the forest; the superior man would do better to give up, for to press on brings trouble.","Horse and rider waver; to seek union and go forward is auspicious, nothing is unfavorable.","Hoarding the bounty; in small matters firmness is auspicious, in great matters firmness brings misfortune — do not grasp for too much.","Horse and rider waver; weeping tears of blood — the situation is utterly desperate."],
    },
  },
  "山水蒙": {
    overall: { zh: "蒙昧初开，教学相长", tw: "蒙昧初開，教學相長", en: "Folly first dispelled; teacher and pupil grow together." },
    gua_ci: { zh: "亨，匪我求童蒙，童蒙求我。初筮告，再三渎，渎则不告，利贞。", tw: "亨，匪我求童蒙，童蒙求我。初筮告，再三瀆，瀆則不告，利貞。", en: "Success. It is not I who seek the young fool; the young fool seeks me. At the first oracle I inform him. If he asks two or three times, it is importunity. I do not inform the importunate. Perseverance furthers." },
    gua_ci_baihua: { zh: "通顺，不是我求童蒙来学，而是童蒙来求我教导。第一次占问告知，反复占问是亵渎，亵渎则不告。利于守持正固。", tw: "通順，不是我求童蒙來學，而是童蒙來求我教導。第一次占問告知，反覆占問是褻瀆，褻瀆則不告。利於守持正固。", en: "Smooth and open; it is not I who seek the youth, but the youth who seeks my guidance. The first inquiry is answered; repeated inquiry is irreverence, and irreverence goes unanswered. It is good to hold firm and upright." },
    yao_ci: {
      zh: ["初六：发蒙，利用刑人，用说桎梏，以往吝。","九二：包蒙，吉；纳妇，吉；子克家。","六三：勿用取女，见金夫，不有躬，无攸利。","六四：困蒙，吝。","六五：童蒙，吉。","上九：击蒙，不利为寇，利御寇。"],
      tw: ["初六：發蒙，利用刑人，用說桎梏，以往吝。","九二：包蒙，吉；納婦，吉；子克家。","六三：勿用取女，見金夫，不有躬，無攸利。","六四：困蒙，吝。","六五：童蒙，吉。","上九：擊蒙，不利為寇，利禦寇。"],
      en: ["Six at the beginning: To make a fool develop, it furthers one to apply discipline. Yet remove the shackles, for to go on that way brings humiliation.","Nine in the second: To bear with fools in kindliness brings good fortune. To know how to take women brings good fortune. The son is capable of managing the household.","Six in the third: Take not a maiden who, on seeing a man of bronze, loses possession of herself. Nothing furthers.","Six in the fourth: Entangled folly brings humiliation.","Six in the fifth: Childlike folly brings good fortune.","Nine at the top: In disciplining folly, it does not further one to commit transgressions. The only thing that furthers is to prevent transgressions."],
    },
    yao_ci_baihua: {
      zh: ["启发蒙昧，利于用刑法来警示，去除枷锁束缚，如此前往会有困难。","包容蒙昧则吉，娶妻则吉，儿子能持家。","不要娶这样的女子，她看见有钱的男人，就不能保持自身，毫无益处。","被蒙昧困住，难有作为。","童稚蒙昧，柔顺守正则吉。","打击蒙昧，不利于做强盗，利于抵御强盗，以正御邪。"],
      tw: ["啟發蒙昧，利於用刑法來警示，去除枷鎖束縛，如此前往會有困難。","包容蒙昧則吉，娶妻則吉，兒子能持家。","不要娶這樣的女子，她看見有錢的男人，就不能保持自身，毫無益處。","被蒙昧困住，難有作為。","童稚蒙昧，柔順守正則吉。","打擊蒙昧，不利於做強盜，利於抵禦強盜，以正禦邪。"],
      en: ["Awakening the ignorant: discipline may serve as warning, but loosen the shackles — to press on harshly brings trouble.","Bearing with folly is auspicious; taking a wife is auspicious; the son can keep the household.","Do not take such a maiden: seeing a man of wealth, she cannot keep herself — nothing is gained.","Trapped in folly: little can be done.","The childlike ignorant who stays gentle and upright finds good fortune.","Striking down folly: it does not serve to play the bandit, but to ward off bandits — meeting wrong with rectitude."],
    },
  },
  "火天大有": {
    overall: { zh: "大有所获，盛大光明", tw: "大有所獲，盛大光明", en: "Great possession; vast and shining brightness." },
    gua_ci: { zh: "元亨。", tw: "元亨。", en: "Supreme success." },
    gua_ci_baihua: { zh: "大通顺利。光明在上，刚健中正，应时而动，大有所获。", tw: "大通順利。光明在上，剛健中正，應時而動，大有所獲。", en: "Great and free progress. Brightness above, strong and balanced, acting in season — great is the harvest." },
    yao_ci: {
      zh: ["初九：无交害，匪咎，艰则无咎。","九二：大车以载，有攸往，无咎。","九三：公用亨于天子，小人弗克。","九四：匪其彭，无咎。","六五：厥孚交如，威如，吉。","上九：自天佑之，吉，无不利。"],
      tw: ["初九：無交害，匪咎，艱則無咎。","九二：大車以載，有攸往，無咎。","九三：公用亨於天子，小人弗克。","九四：匪其彭，無咎。","六五：厥孚交如，威如，吉。","上九：自天佑之，吉，無不利。"],
      en: ["Nine at the beginning: No relationship with what is harmful; there is no blame in this. If one remains conscious of difficulty, one stays without blame.","Nine in the second: A big wagon for loading. One may undertake something. No blame.","Nine in the third: A prince offers it to the Son of Heaven. A petty man cannot do this.","Nine in the fourth: He makes a difference between himself and his neighbor. No blame.","Six in the fifth: He whose truth is accessible, yet dignified, has good fortune.","Nine at the top: He is blessed by heaven. Good fortune. Nothing that does not further."],
    },
    yao_ci_baihua: {
      zh: ["没有往来的害处，无过失，处境艰难则无过失，应谦逊自处。","用大车载物，有所前往，无过失，实力雄厚可以承担大任。","公卿在天子面前宴享，小人不能担此重任。","不夸张自己的盛大，无过失，戒骄戒满。","以诚信与人交往，威严而吉祥，内外兼修。","上天保佑，吉祥，无所不利，天人合一的最高境界。"],
      tw: ["沒有往來的害處，無過失，處境艱難則無過失，應謙遜自處。","用大車載物，有所前往，無過失，實力雄厚可以承擔大任。","公卿在天子面前宴享，小人不能擔此重任。","不誇張自己的盛大，無過失，戒驕戒滿。","以誠信與人交往，威嚴而吉祥，內外兼修。","上天保佑，吉祥，無所不利，天人合一的最高境界。"],
      en: ["No harmful dealings, no fault; mindful of hardship, one stays faultless — bear yourself with humility.","A great wagon bears its load; there is somewhere to go, no fault — ample strength can carry great responsibility.","A noble feasts before the Son of Heaven; a petty man cannot bear such a charge.","He does not flaunt his abundance; no fault — guard against pride and excess.","Meeting others in sincerity, dignified and auspicious; cultivated within and without.","Blessed by heaven, auspicious, nothing unfavorable — the highest union of heaven and humankind."],
    },
  },
  "雷地豫": {
    overall: { zh: "和乐豫顺，奋发进取", tw: "和樂豫順，奮發進取", en: "Harmony and ease; rousing oneself to advance." },
    gua_ci: { zh: "利建侯行师。", tw: "利建侯行師。", en: "It furthers one to install helpers and to set armies marching." },
    gua_ci_baihua: { zh: "利于建立诸侯、兴兵征伐。顺应天时，和乐豫顺，人心归附。", tw: "利於建立諸侯、興兵征伐。順應天時，和樂豫順，人心歸附。", en: "It is favorable to appoint helpers and to march out armies. In accord with the times, harmonious and at ease, the people give their hearts." },
    yao_ci: {
      zh: ["初六：鸣豫，凶。","六二：介于石，不终日，贞吉。","六三：盱豫，悔，迟有悔。","九四：由豫，大有得，勿疑，朋盍簪。","六五：贞疾，恒不死。","上六：冥豫，成有渝，无咎。"],
      tw: ["初六：鳴豫，凶。","六二：介於石，不終日，貞吉。","六三：盱豫，悔，遲有悔。","九四：由豫，大有得，勿疑，朋盍簪。","六五：貞疾，恆不死。","上六：冥豫，成有渝，無咎。"],
      en: ["Six at the beginning: Enthusiasm that expresses itself brings misfortune.","Six in the second: Firm as a rock. Not a whole day. Perseverance brings good fortune.","Six in the third: Enthusiasm that looks upward creates remorse. Hesitation brings remorse.","Nine in the fourth: The source of enthusiasm. He achieves great things. Doubt not. You gather friends around you as a hair clasp gathers the hair.","Six in the fifth: Persistently ill, and still does not die.","Six at the top: Deluded enthusiasm. But if after completion one changes, there is no blame."],
    },
    yao_ci_baihua: {
      zh: ["高唱豫乐招摇炫耀，凶险。","安如磐石，不以终日为足，守持正固则吉，见机行事。","仰视而求豫乐，悔恨，犹豫迟疑则会有悔恨。","由他而得豫乐，大有所得，不要疑虑，朋友聚集如发簪束发。","守持正固虽有疾患，但不至于死亡，柔顺守正。","沉迷于豫乐之中，有所改变则无过失。"],
      tw: ["高唱豫樂招搖炫耀，凶險。","安如磐石，不以終日為足，守持正固則吉，見機行事。","仰視而求豫樂，悔恨，猶豫遲疑則會有悔恨。","由他而得豫樂，大有所得，不要疑慮，朋友聚集如髮簪束髮。","守持正固雖有疾患，但不至於死亡，柔順守正。","沉迷於豫樂之中，有所改變則無過失。"],
      en: ["Trumpeting one's delight to show off brings misfortune.","Steady as a rock, not waiting out the whole day; holding firm is auspicious — act on the moment.","Looking up and grasping at pleasure brings regret; hesitation breeds remorse.","Through him comes the delight, and great is the gain; do not doubt — friends gather as a clasp binds the hair.","Holding firm though ill, yet one does not die — gentle and steadfast.","Lost in indulgence, yet if one changes course in the end, there is no fault."],
    },
  },
  "风雷益": {
    overall: { zh: "损上益下，利涉大川", tw: "損上益下，利涉大川", en: "Decreasing the high to increase the low; it furthers crossing the great water." },
    gua_ci: { zh: "利有攸往，利涉大川。", tw: "利有攸往，利涉大川。", en: "It furthers one to undertake something. It furthers one to cross the great water." },
    gua_ci_baihua: { zh: "利于有所前往，利于渡过大河。损上以益下，民心所向，利于大事。", tw: "利於有所前往，利於渡過大河。損上以益下，民心所向，利於大事。", en: "It is good to set out and to cross the great river. Reducing those above to benefit those below wins the people's hearts and favors great undertakings." },
    yao_ci: {
      zh: ["初九：利用为大作，元吉，无咎。","六二：或益之，十朋之龟弗克违，永贞吉，王用享于帝，吉。","六三：益之用凶事，无咎，有孚中行，告公用圭。","六四：中行告公从，利用为依迁国。","九五：有孚惠心，勿问元吉，有孚惠我德。","上九：莫益之，或击之，立心勿恒，凶。"],
      tw: ["初九：利用為大作，元吉，無咎。","六二：或益之，十朋之龜弗克違，永貞吉，王用享於帝，吉。","六三：益之用凶事，無咎，有孚中行，告公用圭。","六四：中行告公從，利用為依遷國。","九五：有孚惠心，勿問元吉，有孚惠我德。","上九：莫益之，或擊之，立心勿恆，凶。"],
      en: ["Nine at the beginning: It furthers one to accomplish great deeds. Supreme good fortune. No blame.","Six in the second: Someone increases him; ten pairs of tortoises cannot oppose it. Constant perseverance brings good fortune. The king presents him before God. Good fortune.","Six in the third: One is enriched through unfortunate events. No blame, if you are sincere and walk in the middle, and report to the prince with a seal.","Six in the fourth: If you walk in the middle and report to the prince, he will follow. It furthers one to be used in moving the capital.","Nine in the fifth: If in truth you have a kind heart, ask not. Supreme good fortune. Truly, kindness will be recognized as your virtue.","Nine at the top: He brings increase to no one. Indeed, someone even strikes him. He does not keep his heart constant. Misfortune."],
    },
    yao_ci_baihua: {
      zh: ["利于大有所为，大吉，无过失，时机成熟大展身手。","或者增益他，价值连城的大龟也不能违背，长久守正则吉，王者祭天则吉。","以增益之道处理凶险之事，无过失，以诚信走中正之道，持圭禀告公侯。","走中正之道禀告公侯并获从许，利于依靠迁都安邦。","有诚信的仁惠之心，不必问卜大吉，诚信自会感化他人。","没有人增益他，或有人攻击他，心志不坚定，凶险。"],
      tw: ["利於大有所為，大吉，無過失，時機成熟大展身手。","或者增益他，價值連城的大龜也不能違背，長久守正則吉，王者祭天則吉。","以增益之道處理凶險之事，無過失，以誠信走中正之道，持圭稟告公侯。","走中正之道稟告公侯並獲從許，利於依靠遷都安邦。","有誠信的仁惠之心，不必問卜大吉，誠信自會感化他人。","沒有人增益他，或有人攻擊他，心志不堅定，凶險。"],
      en: ["Favorable for great undertakings — supremely auspicious, no fault; when the time ripens, give full play to your powers.","Someone enriches him; even a priceless tortoise cannot gainsay it. Lasting firmness is auspicious; the king's sacrifice to heaven is auspicious.","Meeting peril with the way of increase brings no fault; sincere and walking the middle path, report to the lords bearing the jade scepter.","Walking the middle path, report to the lords and gain their assent; favorable for relocating the capital to secure the realm.","With a sincere and benevolent heart, no need to divine — supremely auspicious; sincerity will move others of itself.","No one enriches him, and some even strike him; his resolve is not steadfast — misfortune."],
    },
  },
  "山雷颐": {
    overall: { zh: "颐养正道，自求口实", tw: "頤養正道，自求口實", en: "Nourishing by the right way; seeking your own sustenance." },
    gua_ci: { zh: "贞吉。观颐，自求口实。", tw: "貞吉。觀頤，自求口實。", en: "Perseverance brings good fortune. Pay heed to nourishment, and to what a man seeks to fill his own mouth with." },
    gua_ci_baihua: { zh: "守持正固则吉。观察颐养之道，自己寻求饮食。", tw: "守持正固則吉。觀察頤養之道，自己尋求飲食。", en: "Holding firm and upright is auspicious. Observe the way of nourishment, and seek your own food by your own means." },
    yao_ci: {
      zh: ["初九：舍尔灵龟，观我朵颐，凶。","六二：颠颐，拂经，于丘颐，征凶。","六三：拂颐，贞凶，十年勿用，无攸利。","六四：颠颐，吉，虎视眈眈，其欲逐逐，无咎。","六五：拂经，居贞吉，不可涉大川。","上九：由颐，厉吉，利涉大川。"],
      tw: ["初九：捨爾靈龜，觀我朵頤，凶。","六二：顛頤，拂經，於丘頤，征凶。","六三：拂頤，貞凶，十年勿用，無攸利。","六四：顛頤，吉，虎視眈眈，其欲逐逐，無咎。","六五：拂經，居貞吉，不可涉大川。","上九：由頤，厲吉，利涉大川。"],
      en: ["Nine at the beginning: You let your magic tortoise go, and look at me with the corners of your mouth drooping. Misfortune.","Six in the second: Turning to the summit for nourishment, deviating from the path to seek nourishment from the hill. Continuing to do this brings misfortune.","Six in the third: Turning away from nourishment. Perseverance brings misfortune. Do not act thus for ten years. Nothing serves to further.","Six in the fourth: Turning to the summit for provision of nourishment brings good fortune. Spying about with sharp eyes like a tiger with insatiable craving. No blame.","Six in the fifth: Turning away from the path. To remain persevering brings good fortune. One should not cross the great water.","Nine at the top: The source of nourishment. Awareness of danger brings good fortune. It furthers one to cross the great water."],
    },
    yao_ci_baihua: {
      zh: ["舍弃自己的神龟，来羡慕我的颐养，凶险。","颠倒颐养之道，违背常规，往山丘上求养，前往凶险。","违背颐养正道，守持正固也凶，十年不可行动，无所利益。","颠倒求养，虽凶但从强者处求养则吉，如虎视眈眈，欲望追逐，无过失。","违背常规，安居守正则吉，不可涉越大难关。","由他颐养天下，虽有危险但最终吉祥，利于涉越大难关。"],
      tw: ["捨棄自己的神龜，來羨慕我的頤養，凶險。","顛倒頤養之道，違背常規，往山丘上求養，前往凶險。","違背頤養正道，守持正固也凶，十年不可行動，無所利益。","顛倒求養，雖凶但從強者處求養則吉，如虎視眈眈，慾望追逐，無過失。","違背常規，安居守正則吉，不可涉越大難關。","由他頤養天下，雖有危險但最終吉祥，利於涉越大難關。"],
      en: ["Forsaking your own sacred tortoise to envy my nourishment — misfortune.","Inverting the way of nourishment, breaking with the norm, seeking sustenance on the hill — to go on is perilous.","Going against the right way of nourishment; even firmness is inauspicious. Do nothing for ten years; nothing is gained.","Inverting the search for nourishment is perilous, yet seeking it from the strong is auspicious — eyes fixed like a tiger, desire pressing on, no fault.","Breaking with custom; dwelling in steadfastness is auspicious, but one must not cross the great river.","Through him the world is nourished; though there is danger, the end is auspicious, and it is favorable to cross the great river."],
    },
  },
  "泽水困": {
    overall: { zh: "困境重重，守正待时", tw: "困境重重，守正待時", en: "Hemmed in on all sides; hold to what is right and bide your time." },
    gua_ci: { zh: "亨，贞大人吉，无咎，有言不信。", tw: "亨，貞大人吉，無咎，有言不信。", en: "Success. Perseverance. The great man brings about good fortune. No blame. When one has something to say, it is not believed." },
    gua_ci_baihua: { zh: "通顺，大人守持正固则吉，无过失，说话不被人相信。处困境中考验志节。", tw: "通順，大人守持正固則吉，無過失，說話不被人相信。處困境中考驗志節。", en: "Smooth in the end; the great man who holds firm finds good fortune and no fault, though his words go unbelieved. Adversity tests one's integrity." },
    yao_ci: {
      zh: ["初六：臀困于株木，入于幽谷，三岁不觌。","九二：困于酒食，朱绂方来，利用享祀，征凶，无咎。","六三：困于石，据于蒺藜，入于其宫，不见其妻，凶。","九四：来徐徐，困于金车，吝，有终。","九五：劓刖，困于赤绂，乃徐有说，利用祭祀。","上六：困于葛藟，于臲卼，曰动悔，有悔，征吉。"],
      tw: ["初六：臀困於株木，入於幽谷，三歲不覿。","九二：困於酒食，朱紱方來，利用享祀，征凶，無咎。","六三：困於石，據於蒺藜，入於其宮，不見其妻，凶。","九四：來徐徐，困於金車，吝，有終。","九五：劓刖，困於赤紱，乃徐有說，利用祭祀。","上六：困於葛藟，於臲卼，曰動悔，有悔，征吉。"],
      en: ["Six at the beginning: One sits oppressed under a bare tree and strays into a gloomy valley. For three years one sees nothing.","Nine in the second: One is oppressed while at meat and drink. The man with the scarlet knee bands is just coming. It furthers one to offer sacrifice. To set forth brings misfortune. No blame.","Six in the third: A man permits himself to be oppressed by stone, and leans on thorns and thistles. He enters his house and does not see his wife. Misfortune.","Nine in the fourth: He comes very quietly, oppressed in a golden carriage. Humiliation, but the end is reached.","Nine in the fifth: His nose and feet are cut off. Oppression at the hands of the man with the purple knee bands. Joy comes softly. It furthers one to make offerings and libations.","Six at the top: He is oppressed by creeping vines. He moves uncertainly and says, \"Movement brings remorse.\" If one feels remorse over this and makes a start, good fortune comes."],
    },
    yao_ci_baihua: {
      zh: ["臀部被树桩困住，进入幽暗的山谷，三年不能见人，处境艰难。","被酒食所困，有官贵到来，利于举行祭祀，前进则凶，无过失。","被石头困住，坐在蒺藜上，回到家中却不见妻子，凶险。","缓缓而来，被金质车辆所困，有些困难，但有始有终。","被割鼻截足，被红色蔽膝所困，慢慢地得到解脱，利于举行祭祀。","被葛藤所困，处于动荡不安之中，动则悔恨，有悔则前往吉祥。"],
      tw: ["臀部被樹樁困住，進入幽暗的山谷，三年不能見人，處境艱難。","被酒食所困，有官貴到來，利於舉行祭祀，前進則凶，無過失。","被石頭困住，坐在蒺藜上，回到家中卻不見妻子，凶險。","緩緩而來，被金質車輛所困，有些困難，但有始有終。","被割鼻截足，被紅色蔽膝所困，慢慢地得到解脫，利於舉行祭祀。","被葛藤所困，處於動盪不安之中，動則悔恨，有悔則前往吉祥。"],
      en: ["Hemmed in against a tree stump, straying into a dark valley, unseen for three years — a desperate plight.","Oppressed amid food and wine; a person of rank arrives; favorable to make offerings; to advance is perilous, yet there is no fault.","Trapped against stone, sitting on thorns; returning home he finds his wife gone — misfortune.","Coming slowly, hampered by a metal carriage; some difficulty, yet there is a proper end.","Nose and feet cut away, oppressed by the scarlet sash; release comes slowly; favorable to make offerings.","Bound by creeping vines, in unsteady turmoil; to move brings regret, yet through that regret, to go forward is auspicious."],
    },
  },
  "水风井": {
    overall: { zh: "养人不穷，改邑不改井", tw: "養人不窮，改邑不改井", en: "Nourishing without end; the town may change, but the well does not." },
    gua_ci: { zh: "改邑不改井，无丧无得，往来井井，汔至亦未绠井，羸其瓶，凶。", tw: "改邑不改井，無喪無得，往來井井，汔至亦未綆井，羸其瓶，凶。", en: "The town may be changed, but the well cannot be changed. It neither decreases nor increases. They come and go and draw from the well. If one gets down almost to the water and the rope does not go all the way, or the jug breaks, it brings misfortune." },
    gua_ci_baihua: { zh: "可以迁移城邑，不能改变水井，没有损失也没有收获，来往不断地在井边汲水，快到了还没到，损坏了汲水的绳和瓶，凶险。", tw: "可以遷移城邑，不能改變水井，沒有損失也沒有收穫，來往不斷地在井邊汲水，快到了還沒到，損壞了汲水的繩和瓶，凶險。", en: "A town may be moved, but the well cannot; it neither loses nor gains. People come and go drawing water; if one nearly reaches it yet falls short, and the rope or jug is broken, there is misfortune." },
    yao_ci: {
      zh: ["初六：井泥不食，旧井无禽。","九二：井谷射鲋，瓮敝漏。","九三：井渫不食，为我心恻，可用汲，王明并受其福。","六四：井甃，无咎。","九五：井冽，寒泉食。","上六：井收勿幕，有孚元吉。"],
      tw: ["初六：井泥不食，舊井無禽。","九二：井谷射鮒，甕敝漏。","九三：井渫不食，為我心惻，可用汲，王明並受其福。","六四：井甃，無咎。","九五：井冽，寒泉食。","上六：井收勿幕，有孚元吉。"],
      en: ["Six at the beginning: One does not drink the mud of the well. No animals come to an old well.","Nine in the second: At the wellhole one shoots fishes. The jug is broken and leaks.","Nine in the third: The well is cleaned, but no one drinks from it. This is my heart's sorrow, for one might draw from it. If the king were clear-minded, good fortune might be shared.","Six in the fourth: The well is being lined. No blame.","Nine in the fifth: In the well there is a clear, cold spring from which one can drink.","Six at the top: One draws from the well without hindrance. It is dependable. Supreme good fortune."],
    },
    yao_ci_baihua: {
      zh: ["井里满是泥沙不能饮用，旧井废弃连禽兽也不来，毫无用处。","井里只有小鱼，汲水的瓮也已破漏，才能无用之象。","井已经被淘清却没人来汲水，令我心中悲恻，可以用来汲水，明智的王能让人人受其恩惠。","修整井壁，无过失，积极修缮以备使用。","井水清冽，是寒泉可以饮用，才德充实终得发用。","打水不加盖子，诚信则大吉大利，泽被天下。"],
      tw: ["井裡滿是泥沙不能飲用，舊井廢棄連禽獸也不來，毫無用處。","井裡只有小魚，汲水的甕也已破漏，才能無用之象。","井已經被淘清卻沒人來汲水，令我心中悲惻，可以用來汲水，明智的王能讓人人受其恩惠。","修整井壁，無過失，積極修繕以備使用。","井水清冽，是寒泉可以飲用，才德充實終得發用。","打水不加蓋子，誠信則大吉大利，澤被天下。"],
      en: ["The well is choked with mud and undrinkable; the old well is abandoned, and even birds and beasts stay away — wholly useless.","The well holds only minnows, and the jug is cracked and leaking — an image of talent going to waste.","The well is cleaned yet no one draws from it, which grieves my heart; it could be drawn from, and a wise king would let all share its bounty.","Lining the well wall: no fault — diligently repair it for use.","The well water is clear and cold, a spring fit to drink — full talent and virtue at last find their use.","Drawing water without covering it: sincerity brings supreme good fortune, blessing all under heaven."],
    },
  },
};

export interface Gua64Info {
  gua_ci: string;
  gua_ci_baihua: string;
  overall: string;
  yao_ci: string[];
  yao_ci_baihua: string[];
}

// 为没有详细数据的卦提供默认模板（按 lang 解析为纯字符串，结果类型不变）
export function getGua64Data(guaName: string, lang: Lang = "zh"): Gua64Info {
  const data = GUA64_DATA[guaName];
  if (data) {
    return {
      overall: rs(data.overall, lang),
      gua_ci: rs(data.gua_ci, lang),
      gua_ci_baihua: rs(data.gua_ci_baihua, lang),
      yao_ci: ra(data.yao_ci, lang),
      yao_ci_baihua: ra(data.yao_ci_baihua, lang),
    };
  }

  // 根据卦名推断吉凶（以中文卦名 KEY 判断）
  const auspicious = ["泰", "益", "豫", "大有", "既济", "咸", "恒", "随", "临", "升", "晋"];
  const inauspicious = ["否", "困", "蹇", "剥", "未济", "讼", "屯"];
  const isAuspicious = auspicious.some(k => guaName.includes(k));
  const isInauspicious = inauspicious.some(k => guaName.includes(k));
  const displayName = guaNameLabel(guaName, lang);

  const fallbackOverall: L = isAuspicious
    ? { zh: "顺势而为，吉祥如意", tw: "順勢而為，吉祥如意", en: "Move with the current; fortune favors you." }
    : isInauspicious
      ? { zh: "谨慎行事，守正待时", tw: "謹慎行事，守正待時", en: "Act with care; hold to what is right and bide your time." }
      : { zh: "阴阳调和，顺其自然", tw: "陰陽調和，順其自然", en: "Yin and yang in balance; let things take their course." };

  const fallbackGuaCi: L = {
    zh: "《易》曰：此卦象之义，详参卦名与体用生克，综合研判。",
    tw: "《易》曰：此卦象之義，詳參卦名與體用生剋，綜合研判。",
    en: "As the Yi says: for the meaning of this hexagram, consider the hexagram name together with the Host-Guest generating-and-controlling cycle, and judge as a whole.",
  };

  const fallbackBaihua: L = isAuspicious
    ? { zh: "此卦象征通顺亨达，万事顺遂，宜积极进取，把握时机。", tw: "此卦象徵通順亨達，萬事順遂，宜積極進取，把握時機。", en: "This hexagram signifies smooth, open progress with all matters favorable; be enterprising and seize the moment." }
    : isInauspicious
      ? { zh: "此卦象征艰难险阻，宜守正待时，不宜轻动冒进，静待时机转化。", tw: "此卦象徵艱難險阻，宜守正待時，不宜輕動冒進，靜待時機轉化。", en: "This hexagram signifies hardship and obstruction; hold to what is right and bide your time, do not act rashly, and wait for the moment to turn." }
      : { zh: "此卦阴阳调和，象征平稳中正，宜顺其自然，勿强求勿懈怠。", tw: "此卦陰陽調和，象徵平穩中正，宜順其自然，勿強求勿懈怠。", en: "This hexagram is balanced in yin and yang, signifying steadiness and rectitude; let things take their course, neither forcing nor slackening." };

  const yaoZh = ["蓄势待发，时机未至", "崭露头角，稳步前行", "谨慎处事，守正勿躁", "适时变通，进退有据", "大展宏图，积极作为", "功成身退，见好就收"];
  const yaoTw = ["蓄勢待發，時機未至", "嶄露頭角，穩步前行", "謹慎處事，守正勿躁", "適時變通，進退有據", "大展宏圖，積極作為", "功成身退，見好就收"];
  const yaoEn = ["Gathering strength; the moment has not yet come.", "Coming to the fore; advance steadily.", "Act with care; stay upright and unhurried.", "Adapt in season; advance and retreat with measure.", "Unfold great plans; act with vigor.", "Withdraw once the work is done; stop while ahead."];

  const yaoCi: LArr = {
    zh: Array.from({ length: 6 }, (_, i) => `第${i + 1}爻：详参${displayName}卦爻辞，结合具体情境研判。`),
    tw: Array.from({ length: 6 }, (_, i) => `第${i + 1}爻：詳參${displayName}卦爻辭，結合具體情境研判。`),
    en: Array.from({ length: 6 }, (_, i) => `Line ${i + 1}: refer to the line statements of ${displayName} and judge in the light of your situation.`),
  };
  const yaoCiBaihua: LArr = {
    zh: Array.from({ length: 6 }, (_, i) => `第${i + 1}爻提示：${yaoZh[i] ?? "详参爻辞，结合实际"}`),
    tw: Array.from({ length: 6 }, (_, i) => `第${i + 1}爻提示：${yaoTw[i] ?? "詳參爻辭，結合實際"}`),
    en: Array.from({ length: 6 }, (_, i) => `Line ${i + 1}: ${yaoEn[i] ?? "refer to the line statement in light of the actual situation."}`),
  };

  return {
    overall: rs(fallbackOverall, lang),
    gua_ci: rs(fallbackGuaCi, lang),
    gua_ci_baihua: rs(fallbackBaihua, lang),
    yao_ci: ra(yaoCi, lang),
    yao_ci_baihua: ra(yaoCiBaihua, lang),
  };
}

// ===== 占问事项分类 =====
export const QUESTION_CATEGORIES = [
  { id: "general", label: "综合", icon: "☯" },
  { id: "love", label: "感情", icon: "❤" },
  { id: "career", label: "事业", icon: "⚡" },
  { id: "wealth", label: "财运", icon: "✦" },
  { id: "health", label: "健康", icon: "☘" },
  { id: "travel", label: "出行", icon: "→" },
  { id: "lost", label: "寻物", icon: "◎" },
  { id: "study", label: "学业", icon: "卷" },
] as const;

// 分类建议文案（体用生克 × 事项分类）— 体用 type 为中文 KEY，文案三语
export const CATEGORY_ADVICE: Record<string, Record<string, L>> = {
  用生体: {
    love: { zh: "感情顺遂，对方有情有意，主动表达心意，双方关系可进一步发展。", tw: "感情順遂，對方有情有意，主動表達心意，雙方關係可進一步發展。", en: "Love flows smoothly; the other has feelings for you. Express your heart openly, and the relationship can deepen further." },
    career: { zh: "事业有贵人相助，上司赏识，升职加薪有望，积极表现大有可为。", tw: "事業有貴人相助，上司賞識，升職加薪有望，積極表現大有可為。", en: "A benefactor aids your career and superiors value you; promotion and a raise are within reach — a strong showing will go far." },
    wealth: { zh: "财运亨通，有意外之财或稳定进账，可适当投资理财，收益良好。", tw: "財運亨通，有意外之財或穩定進帳，可適當投資理財，收益良好。", en: "Wealth flows freely, with windfalls or steady income; modest investing is favored, and returns look good." },
    health: { zh: "身体渐好，有良医相助，积极治疗，预后乐观。", tw: "身體漸好，有良醫相助，積極治療，預後樂觀。", en: "Health is improving, with skilled care at hand; treat actively, and the outlook is bright." },
    travel: { zh: "出行顺利，一路平安，所到之处有人帮助，行程如意。", tw: "出行順利，一路平安，所到之處有人幫助，行程如意。", en: "Travel goes smoothly and safely; help awaits wherever you go, and the journey unfolds as wished." },
    lost: { zh: "失物可寻，可向西北方或水边寻找，有人会主动告知下落。", tw: "失物可尋，可向西北方或水邊尋找，有人會主動告知下落。", en: "The lost item can be found — look to the northwest or near water; someone may come forward with its whereabouts." },
    study: { zh: "学业顺利，考试发挥良好，有良师辅助，成绩理想。", tw: "學業順利，考試發揮良好，有良師輔助，成績理想。", en: "Studies go well and exams favor you; a good teacher supports you, and results are pleasing." },
    general: { zh: "诸事顺遂，外有援助，把握时机积极行事，吉祥如意。", tw: "諸事順遂，外有援助，把握時機積極行事，吉祥如意。", en: "All matters proceed smoothly with outside help; seize the moment and act — fortune is with you." },
  },
  体生用: {
    love: { zh: "你对对方用情较深，但对方回应不足，付出与回报不对等，需重新评估关系。", tw: "你對對方用情較深，但對方回應不足，付出與回報不對等，需重新評估關係。", en: "You feel more deeply than the other returns; giving and receiving are unequal — reconsider where the relationship stands." },
    career: { zh: "工作中付出颇多，但短期回报有限，耗费心力，需量力而行，适时调整策略。", tw: "工作中付出頗多，但短期回報有限，耗費心力，需量力而行，適時調整策略。", en: "You give much at work but see little short-term return; it drains you — pace yourself and adjust your strategy in time." },
    wealth: { zh: "财运一般，付出多回报少，不宜大额投资，谨慎理财，避免不必要损耗。", tw: "財運一般，付出多回報少，不宜大額投資，謹慎理財，避免不必要損耗。", en: "Wealth is middling, with much spent for little gained; avoid large investments, manage money carefully, and prevent needless drain." },
    health: { zh: "体力消耗较大，注意休养生息，勿过度劳累，注重补充元气。", tw: "體力消耗較大，注意休養生息，勿過度勞累，注重補充元氣。", en: "Your energy is heavily spent; rest and recover, avoid overexertion, and focus on restoring your vitality." },
    travel: { zh: "出行有些耗费，路途辛劳，但能到达目的地，注意保留体力。", tw: "出行有些耗費，路途辛勞，但能到達目的地，注意保留體力。", en: "Travel costs some effort and the road is tiring, but you will reach your destination — conserve your strength." },
    lost: { zh: "失物可能被人所用，寻找需花费精力，向南方或有人迹处寻找，或有线索。", tw: "失物可能被人所用，尋找需花費精力，向南方或有人跡處尋找，或有線索。", en: "The lost item may be in someone's use and will take effort to find; search to the south or where people pass, and a clue may surface." },
    study: { zh: "学习需投入较多精力，基础有些薄弱，但努力付出终有收获，勿放弃。", tw: "學習需投入較多精力，基礎有些薄弱，但努力付出終有收穫，勿放棄。", en: "Study demands much energy and your base is somewhat weak, but sustained effort will pay off in the end — do not give up." },
    general: { zh: "诸事需量力而行，付出与收获不成正比，审时度势，不宜过度消耗自身。", tw: "諸事需量力而行，付出與收穫不成正比，審時度勢，不宜過度消耗自身。", en: "Act within your means in all things; effort and reward are out of proportion — read the situation and avoid overspending yourself." },
  },
  体克用: {
    love: { zh: "你掌握主动权，感情方面可以主动把握，但需照顾对方感受，刚柔并济为佳。", tw: "你掌握主動權，感情方面可以主動把握，但需照顧對方感受，剛柔並濟為佳。", en: "You hold the initiative and can lead in love, but mind the other's feelings — best to balance firmness with gentleness." },
    career: { zh: "工作中你处于优势地位，可以主导项目推进，能克服阻碍，但需防小人。", tw: "工作中你處於優勢地位，可以主導項目推進，能克服阻礙，但需防小人。", en: "You hold the advantage at work and can drive projects forward, overcoming obstacles — but beware of petty schemers." },
    wealth: { zh: "财运尚可，可以通过努力获取，适合主动开拓财源，积极进取有收获。", tw: "財運尚可，可以通過努力獲取，適合主動開拓財源，積極進取有收穫。", en: "Wealth is fair and can be earned through effort; actively open new sources of income, and initiative brings gains." },
    health: { zh: "身体状况良好，抵抗力强，积极配合治疗，预后良好，乐观面对。", tw: "身體狀況良好，抵抗力強，積極配合治療，預後良好，樂觀面對。", en: "Your health is sound and resistance strong; cooperate actively with treatment — the outlook is good, so stay positive." },
    travel: { zh: "出行顺利，你掌控行程，遇到小阻碍也能克服，目的地可达。", tw: "出行順利，你掌控行程，遇到小阻礙也能克服，目的地可達。", en: "Travel is smooth and you control the itinerary; minor obstacles can be overcome, and your destination is within reach." },
    lost: { zh: "失物有迹可循，你有能力找到，向东方或高处寻找，主动查找可得。", tw: "失物有跡可循，你有能力找到，向東方或高處尋找，主動查找可得。", en: "The lost item leaves a trail and you can find it; search to the east or in high places — active looking will turn it up." },
    study: { zh: "学业方面有把握，能够掌握知识，成绩不错，继续努力即可。", tw: "學業方面有把握，能夠掌握知識，成績不錯，繼續努力即可。", en: "You have a firm grip on your studies and can master the material; results are good — simply keep up the effort." },
    general: { zh: "你处于主动地位，诸事可凭实力推进，付出努力可以成事。", tw: "你處於主動地位，諸事可憑實力推進，付出努力可以成事。", en: "You hold the initiative; matters can be driven by your own strength, and effort will see them through." },
  },
  用克体: {
    love: { zh: "感情中阻力较大，对方态度冷淡或有第三者介入，宜暂时退让，静观其变。", tw: "感情中阻力較大，對方態度冷淡或有第三者介入，宜暫時退讓，靜觀其變。", en: "Love meets strong resistance — the other is cool, or a third party intrudes; yield for now and watch how things change." },
    career: { zh: "工作中遭遇阻力，上司或同事可能有所刁难，暂时蛰伏，等待时机转变。", tw: "工作中遭遇阻力，上司或同事可能有所刁難，暫時蟄伏，等待時機轉變。", en: "You meet resistance at work; a superior or colleague may obstruct you — lie low for now and wait for the tide to turn." },
    wealth: { zh: "财运不佳，有亏损风险，不宜大额投资或借贷，守好现有财富为要。", tw: "財運不佳，有虧損風險，不宜大額投資或借貸，守好現有財富為要。", en: "Wealth is poor with risk of loss; avoid large investments or loans, and above all safeguard what you already have." },
    health: { zh: "身体有些不适，外部环境不利健康，尽快就医，注意防护休养。", tw: "身體有些不適，外部環境不利健康，盡快就醫，注意防護休養。", en: "Some bodily discomfort, and the surroundings work against your health; see a doctor soon, and take care to protect and rest." },
    travel: { zh: "出行有障碍，可能遇到延误或意外，非必要暂缓出行，或做好充分准备。", tw: "出行有障礙，可能遇到延誤或意外，非必要暫緩出行，或做好充分準備。", en: "Travel is hindered, with possible delays or mishaps; postpone if not essential, or prepare thoroughly." },
    lost: { zh: "失物可能已被带走，寻回困难，向北方或水边找，但希望不大。", tw: "失物可能已被帶走，尋回困難，向北方或水邊找，但希望不大。", en: "The lost item may already be carried off and is hard to recover; look to the north or near water, though hope is slim." },
    study: { zh: "学业压力大，考试竞争激烈，需加倍努力，或调整策略，暂时避其锋芒。", tw: "學業壓力大，考試競爭激烈，需加倍努力，或調整策略，暫時避其鋒芒。", en: "Study pressure is high and exam competition fierce; redouble your effort or change tactics, sidestepping the strongest rivals for now." },
    general: { zh: "外部环境不利，诸事谨慎，守正待时，不宜强行推进，静待形势好转。", tw: "外部環境不利，諸事謹慎，守正待時，不宜強行推進，靜待形勢好轉。", en: "Conditions are unfavorable; be cautious in all things, hold to what is right and bide your time, do not force matters, and wait for things to improve." },
  },
  比和: {
    love: { zh: "感情平稳，双方心意相通，关系和谐，顺其自然发展，无需刻意强求。", tw: "感情平穩，雙方心意相通，關係和諧，順其自然發展，無需刻意強求。", en: "Love is steady, hearts in tune and the bond harmonious; let it grow naturally, with no need to force anything." },
    career: { zh: "工作运势平稳，与同事和谐相处，维持现状，守正稳进，无大起大落。", tw: "工作運勢平穩，與同事和諧相處，維持現狀，守正穩進，無大起大落。", en: "Career fortunes are steady and you get on well with colleagues; hold your ground and advance soundly, with no great ups or downs." },
    wealth: { zh: "财运平稳，收支均衡，适合稳健理财，不宜冒险，安稳即是福。", tw: "財運平穩，收支均衡，適合穩健理財，不宜冒險，安穩即是福。", en: "Wealth is steady and income balances spending; favor prudent money management over risk — security itself is a blessing." },
    health: { zh: "身体状况平稳，注意日常保养，无大碍，保持健康的生活习惯。", tw: "身體狀況平穩，注意日常保養，無大礙，保持健康的生活習慣。", en: "Health is steady and nothing serious is amiss; tend to daily care and keep up healthy habits." },
    travel: { zh: "出行平顺，无特别意外，按计划进行，顺利完成旅途。", tw: "出行平順，無特別意外，按計劃進行，順利完成旅途。", en: "Travel is smooth with no special mishaps; go by plan and complete the journey without trouble." },
    lost: { zh: "失物在附近，不远不近，耐心寻找，可能在熟悉的地方，近期可找到。", tw: "失物在附近，不遠不近，耐心尋找，可能在熟悉的地方，近期可找到。", en: "The lost item is nearby, neither far nor close; search patiently — it may be somewhere familiar and will turn up soon." },
    study: { zh: "学业平稳，按部就班，稳定进步，保持规律学习即可取得理想成绩。", tw: "學業平穩，按部就班，穩定進步，保持規律學習即可取得理想成績。", en: "Studies are steady; proceed step by step with steady progress — keep a regular routine and good results will follow." },
    general: { zh: "诸事平稳，顺其自然，不骄不躁，守正中行，平稳推进即可。", tw: "諸事平穩，順其自然，不驕不躁，守正中行，平穩推進即可。", en: "All matters are steady; let them take their course, stay free of pride and haste, keep to the upright middle way, and proceed steadily." },
  },
};

/** 解析分类建议为本地化纯字符串（type 为中文 KEY，category 为分类 id） */
export function resolveCategoryAdvice(type: string, category: string, lang: Lang): string {
  const map = CATEGORY_ADVICE[type] ?? CATEGORY_ADVICE["比和"]!;
  const cell = map[category] ?? map["general"];
  return cell ? rs(cell, lang) : "";
}

// ===== 加载文案 =====
export const MEIHUA_LOADING_TEXTS = [
  "观天时，察地利...",
  "取象于天地万物...",
  "推算先天八卦数...",
  "定上下二卦...",
  "寻动爻，辨体用...",
  "断五行生克...",
  "参《周易》卦辞...",
  "心动即机，卦象已成...",
];

// ===== 农历支持（简化版） =====
// 天干地支年支数
export const ZHI_TO_NUM: Record<string, number> = {
  子: 1, 丑: 2, 寅: 3, 卯: 4, 辰: 5, 巳: 6,
  午: 7, 未: 8, 申: 9, 酉: 10, 戌: 11, 亥: 12,
};

// 时辰支数
export const HOUR_TO_ZHI: Record<number, { zhi: string; num: number }> = {
  23: { zhi: "子", num: 1 }, 0:  { zhi: "子", num: 1 },
  1:  { zhi: "丑", num: 2 }, 2:  { zhi: "丑", num: 2 },
  3:  { zhi: "寅", num: 3 }, 4:  { zhi: "寅", num: 3 },
  5:  { zhi: "卯", num: 4 }, 6:  { zhi: "卯", num: 4 },
  7:  { zhi: "辰", num: 5 }, 8:  { zhi: "辰", num: 5 },
  9:  { zhi: "巳", num: 6 }, 10: { zhi: "巳", num: 6 },
  11: { zhi: "午", num: 7 }, 12: { zhi: "午", num: 7 },
  13: { zhi: "未", num: 8 }, 14: { zhi: "未", num: 8 },
  15: { zhi: "申", num: 9 }, 16: { zhi: "申", num: 9 },
  17: { zhi: "酉", num: 10 }, 18: { zhi: "酉", num: 10 },
  19: { zhi: "戌", num: 11 }, 20: { zhi: "戌", num: 11 },
  21: { zhi: "亥", num: 12 }, 22: { zhi: "亥", num: 12 },
};
