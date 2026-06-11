/**
 * 姓名五格剖象法计算引擎
 * 严格按照传统五格剖象法规则计算
 *
 * 结构化结果（标题/简述/详述/吉凶等级/三才/各维度解析/标签/评级）按 lang 解析为
 * 对应语言的纯字符串展示文案；笔画数、被分析的姓名汉字、以及作为颜色/图标查表
 * 依据的 level 原始中文键（levelKey）保持不变。
 */

import { getNameStrokes } from "./wuge-strokes";

export type Lang = "zh" | "en" | "tw";

/** 本地化字符串：三语对照 */
type L = Record<Lang, string>;
/** 本地化字符串数组：三语对照 */
type LArr = Record<Lang, string[]>;

/** 吉凶等级原始中文键（用于颜色/图标查表，保持稳定） */
export type LevelKey = "大吉" | "吉" | "半吉" | "凶" | "大凶";

/** 等级中文键 → 三语展示文案 */
const LEVEL_DISPLAY: Record<LevelKey, L> = {
  大吉: { zh: "大吉", tw: "大吉", en: "Great Fortune" },
  吉: { zh: "吉", tw: "吉", en: "Fortune" },
  半吉: { zh: "半吉", tw: "半吉", en: "Half-Fortune" },
  凶: { zh: "凶", tw: "凶", en: "Misfortune" },
  大凶: { zh: "大凶", tw: "大凶", en: "Great Misfortune" },
};

export interface WugeInput {
  name: string;
  gender: "male" | "female";
}

export interface WugeGe {
  strokes: number;       // 笔画数
  level: string;         // 吉凶等级展示文案（已按 lang 解析）
  levelKey: LevelKey;    // 吉凶等级原始中文键（颜色/图标查表用）
  score: number;         // 分值 0-100
  title: string;         // 运势标题（已按 lang 解析）
  shortDesc: string;     // 简短描述（已按 lang 解析）
  fullDesc: string;      // 完整描述（已按 lang 解析）
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
  scoreLevel: string;        // 综合评价（已按 lang 解析）
  sanCai: string;            // 三才配置（天地人，已按 lang 解析为对应五行名）
  sanCaiDesc: string;        // 三才解析（已按 lang 解析）
  personality: string;       // 性格特征（已按 lang 解析）
  career: string;            // 事业运势（已按 lang 解析）
  love: string;              // 感情婚姻（已按 lang 解析）
  health: string;            // 健康运势（已按 lang 解析）
  specialTags: string[];     // 特殊运势标签（已按 lang 解析）
}

// ===== 81数理吉凶基础数据 =====
// 每个数对应：[levelKey, score, title(三语), shortDesc(三语)]
type NumInfo = [LevelKey, number, L, L];
const NUM_INFO: Record<number, NumInfo> = {
  1:  ["大吉", 95, { zh: "太极数 · 开创", tw: "太極數 · 開創", en: "Taiji · Pioneer" }, { zh: "万物之始，独立奋斗，创业成功之数", tw: "萬物之始，獨立奮鬥，創業成功之數", en: "The origin of all things; independent striving and entrepreneurial success" }],
  2:  ["凶",   35, { zh: "两仪数 · 离散", tw: "兩儀數 · 離散", en: "Duality · Scattering" }, { zh: "动摇不安，孤独困苦，须防分离", tw: "動搖不安，孤獨困苦，須防分離", en: "Instability and solitude; guard against separation" }],
  3:  ["大吉", 88, { zh: "三才数 · 进取", tw: "三才數 · 進取", en: "Three Talents · Enterprise" }, { zh: "天地人合，学识兼具，前途光明", tw: "天地人合，學識兼具，前途光明", en: "Heaven, Earth and Human in harmony; learned and bright prospects" }],
  4:  ["凶",   30, { zh: "四象数 · 险难", tw: "四象數 · 險難", en: "Four Symbols · Peril" }, { zh: "辛苦奔波，多难之命，意志须坚", tw: "辛苦奔波，多難之命，意志須堅", en: "Toil and hardship; a fated trial requiring firm will" }],
  5:  ["大吉", 85, { zh: "五行数 · 福寿", tw: "五行數 · 福壽", en: "Five Elements · Blessing" }, { zh: "阴阳调和，健康长寿，福德兼备", tw: "陰陽調和，健康長壽，福德兼備", en: "Yin-yang in balance; health, longevity and virtue" }],
  6:  ["大吉", 90, { zh: "六合数 · 安泰", tw: "六合數 · 安泰", en: "Six Harmonies · Peace" }, { zh: "天地和合，吉星高照，家业昌隆", tw: "天地和合，吉星高照，家業昌隆", en: "Heaven and Earth in accord; lucky stars and a thriving household" }],
  7:  ["吉",   75, { zh: "七政数 · 精进", tw: "七政數 · 精進", en: "Seven Lights · Diligence" }, { zh: "刚毅勇猛，独立精进，稳健发展", tw: "剛毅勇猛，獨立精進，穩健發展", en: "Resolute and brave; independent diligence and steady growth" }],
  8:  ["吉",   78, { zh: "八卦数 · 坚毅", tw: "八卦數 · 堅毅", en: "Eight Trigrams · Fortitude" }, { zh: "意志坚强，努力不懈，后天得志", tw: "意志堅強，努力不懈，後天得志", en: "Strong will and tireless effort bring later success" }],
  9:  ["凶",   28, { zh: "九星数 · 窘困", tw: "九星數 · 窘困", en: "Nine Stars · Adversity" }, { zh: "献身精神强，但常感孤独，需防末路", tw: "獻身精神強，但常感孤獨，需防末路", en: "Devoted yet often lonely; beware a dead-end path" }],
  10: ["凶",   25, { zh: "零宿数 · 空虚", tw: "零宿數 · 空虛", en: "Void · Emptiness" }, { zh: "虚数，内心空虚，须慎防无所为", tw: "虛數，內心空虛，須慎防無所為", en: "A hollow number; inner emptiness, beware of drifting" }],
  11: ["大吉", 88, { zh: "进俊数 · 兴盛", tw: "進俊數 · 興盛", en: "Ascending · Flourishing" }, { zh: "刚柔兼备，进退自如，前途无量", tw: "剛柔兼備，進退自如，前途無量", en: "Firm yet flexible, free in advance and retreat; boundless prospects" }],
  12: ["凶",   32, { zh: "薄弱数 · 努力", tw: "薄弱數 · 努力", en: "Frailty · Striving" }, { zh: "薄弱之运，若非强志，易于依赖", tw: "薄弱之運，若非強志，易於依賴", en: "A frail fortune; without strong will, prone to dependence" }],
  13: ["大吉", 87, { zh: "博学数 · 才智", tw: "博學數 · 才智", en: "Erudition · Wit" }, { zh: "智慧聪颖，才华横溢，博学多识", tw: "智慧聰穎，才華橫溢，博學多識", en: "Bright and gifted, overflowing with talent and broad learning" }],
  14: ["凶",   30, { zh: "离散数 · 波折", tw: "離散數 · 波折", en: "Scattering · Setbacks" }, { zh: "浮沉多变，离散多端，勤勉可免", tw: "浮沉多變，離散多端，勤勉可免", en: "Ups and downs and partings; diligence can avert them" }],
  15: ["大吉", 92, { zh: "福寿数 · 圆满", tw: "福壽數 · 圓滿", en: "Blessing · Fulfillment" }, { zh: "君子之风，领导力强，福禄双全", tw: "君子之風，領導力強，福祿雙全", en: "Noble bearing and strong leadership; blessings and prosperity" }],
  16: ["大吉", 90, { zh: "贵人数 · 得助", tw: "貴人數 · 得助", en: "Benefactor · Support" }, { zh: "德望兼具，贵人相助，财运亨通", tw: "德望兼具，貴人相助，財運亨通", en: "Virtue and prestige; benefactors aid and wealth flows" }],
  17: ["吉",   76, { zh: "健强数 · 刚健", tw: "健強數 · 剛健", en: "Vigor · Strength" }, { zh: "意志坚定，勇于进取，自强不息", tw: "意志堅定，勇於進取，自強不息", en: "Firm of will, boldly enterprising and ever self-improving" }],
  18: ["吉",   80, { zh: "发展数 · 兴旺", tw: "發展數 · 興旺", en: "Growth · Prosperity" }, { zh: "积极向上，充满活力，成功发展", tw: "積極向上，充滿活力，成功發展", en: "Upward and full of vitality, developing toward success" }],
  19: ["凶",   30, { zh: "苦难数 · 辛苦", tw: "苦難數 · 辛苦", en: "Hardship · Toil" }, { zh: "志大才高，但命运坎坷，苦尽甘来", tw: "志大才高，但命運坎坷，苦盡甘來", en: "Great ambition and talent, but a rough fate; sweetness follows toil" }],
  20: ["凶",   28, { zh: "虚弱数 · 空名", tw: "虛弱數 · 空名", en: "Weakness · Empty Fame" }, { zh: "有名无实，空有其志，须防空想", tw: "有名無實，空有其志，須防空想", en: "Fame without substance; ambition unfulfilled, beware idle fancy" }],
  21: ["大吉", 90, { zh: "首领数 · 权威", tw: "首領數 · 權威", en: "Leader · Authority" }, { zh: "领导才能卓越，威信颇高，受众尊崇", tw: "領導才能卓越，威信頗高，受眾尊崇", en: "Outstanding leadership and high prestige, widely respected" }],
  22: ["凶",   22, { zh: "秋草数 · 蹇难", tw: "秋草數 · 蹇難", en: "Autumn Grass · Hardship" }, { zh: "中途蹇碍，苦难颇多，命运多磨", tw: "中途蹇礙，苦難頗多，命運多磨", en: "Obstacles midway and many trials; a fate of much grinding" }],
  23: ["大吉", 88, { zh: "壮丽数 · 权威", tw: "壯麗數 · 權威", en: "Magnificence · Authority" }, { zh: "权威显赫，事业昌旺，名利双收", tw: "權威顯赫，事業昌旺，名利雙收", en: "Eminent authority; a thriving career, fame and fortune both gained" }],
  24: ["大吉", 85, { zh: "恒顺数 · 积财", tw: "恆順數 · 積財", en: "Steady Flow · Wealth" }, { zh: "家业兴旺，财源广进，子孙绵绵", tw: "家業興旺，財源廣進，子孫綿綿", en: "A flourishing household, wide-flowing wealth and lasting lineage" }],
  25: ["吉",   72, { zh: "安稳数 · 英俊", tw: "安穩數 · 英俊", en: "Stability · Brilliance" }, { zh: "英雄豪气，处世安稳，有成功运", tw: "英雄豪氣，處世安穩，有成功運", en: "Heroic spirit, steady conduct and a fortune of success" }],
  26: ["凶",   32, { zh: "英雄数 · 变怪", tw: "英雄數 · 變怪", en: "Hero · Turbulence" }, { zh: "英勇而多障，变化无常，逢难须坚", tw: "英勇而多障，變化無常，逢難須堅", en: "Brave but beset by obstacles and changes; stay firm in hardship" }],
  27: ["吉",   70, { zh: "中吉数 · 增长", tw: "中吉數 · 增長", en: "Moderate Fortune · Growth" }, { zh: "秉性刚直，志虑深远，有成功运", tw: "秉性剛直，志慮深遠，有成功運", en: "Upright by nature, far-sighted, with a fortune of success" }],
  28: ["凶",   25, { zh: "波澜数 · 苦战", tw: "波瀾數 · 苦戰", en: "Turmoil · Struggle" }, { zh: "波澜多磨，苦战一生，需防孤独", tw: "波瀾多磨，苦戰一生，需防孤獨", en: "A life of waves and struggle; beware of loneliness" }],
  29: ["大吉", 87, { zh: "智谋数 · 成功", tw: "智謀數 · 成功", en: "Strategy · Success" }, { zh: "智慧超群，刚柔并济，晚年成功", tw: "智慧超群，剛柔並濟，晚年成功", en: "Exceptional wisdom, firm yet gentle; success in later years" }],
  30: ["半吉", 55, { zh: "浮沉数 · 不定", tw: "浮沉數 · 不定", en: "Flux · Uncertainty" }, { zh: "吉凶各半，浮沉不定，需靠自强", tw: "吉凶各半，浮沉不定，需靠自強", en: "Fortune and misfortune in equal measure; rely on self-reliance" }],
  31: ["大吉", 88, { zh: "兴旺数 · 德望", tw: "興旺數 · 德望", en: "Prosperity · Prestige" }, { zh: "德望兼备，经济繁荣，家族昌盛", tw: "德望兼備，經濟繁榮，家族昌盛", en: "Virtue and prestige, economic prosperity and a thriving family" }],
  32: ["大吉", 88, { zh: "侥幸数 · 奇遇", tw: "僥倖數 · 奇遇", en: "Fortuity · Serendipity" }, { zh: "意外好运，贵人频至，侥幸成功", tw: "意外好運，貴人頻至，僥倖成功", en: "Unexpected luck and frequent benefactors; fortuitous success" }],
  33: ["大吉", 85, { zh: "旺盛数 · 升腾", tw: "旺盛數 · 升騰", en: "Vigor · Rising" }, { zh: "名实兼具，旺盛有力，声名远播", tw: "名實兼具，旺盛有力，聲名遠播", en: "Name and substance both; vigorous and far-renowned" }],
  34: ["大凶", 10, { zh: "破灭数 · 险难", tw: "破滅數 · 險難", en: "Ruin · Peril" }, { zh: "破灭之象，多灾多难，需谨言慎行", tw: "破滅之象，多災多難，需謹言慎行", en: "An omen of ruin and many calamities; speak and act with care" }],
  35: ["吉",   73, { zh: "温和数 · 平安", tw: "溫和數 · 平安", en: "Gentleness · Peace" }, { zh: "温柔和顺，平安幸福，家庭美满", tw: "溫柔和順，平安幸福，家庭美滿", en: "Gentle and agreeable; peace, happiness and a harmonious home" }],
  36: ["凶",   30, { zh: "波澜数 · 英雄", tw: "波瀾數 · 英雄", en: "Turmoil · Hero" }, { zh: "义侠之心，但多波折，需防意外", tw: "義俠之心，但多波折，需防意外", en: "A chivalrous heart, yet many setbacks; guard against mishaps" }],
  37: ["大吉", 85, { zh: "精神数 · 品格", tw: "精神數 · 品格", en: "Spirit · Character" }, { zh: "品格高尚，精神出众，受人尊重", tw: "品格高尚，精神出眾，受人尊重", en: "Noble character and outstanding spirit, widely respected" }],
  38: ["吉",   68, { zh: "文艺数 · 艺能", tw: "文藝數 · 藝能", en: "Arts · Talent" }, { zh: "艺术才华，文采斐然，技艺超群", tw: "藝術才華，文采斐然，技藝超群", en: "Artistic gifts, literary flair and superb craft" }],
  39: ["大吉", 88, { zh: "长寿数 · 安泰", tw: "長壽數 · 安泰", en: "Longevity · Peace" }, { zh: "智谋双全，安稳长寿，德才兼备", tw: "智謀雙全，安穩長壽，德才兼備", en: "Wise and resourceful, steady and long-lived, of virtue and talent" }],
  40: ["凶",   28, { zh: "无常数 · 变幻", tw: "無常數 · 變幻", en: "Impermanence · Flux" }, { zh: "智慧虽高，运途多变，成败难料", tw: "智慧雖高，運途多變，成敗難料", en: "Though wise, the path is changeable; success and failure unclear" }],
  41: ["大吉", 90, { zh: "高明数 · 德望", tw: "高明數 · 德望", en: "Eminence · Prestige" }, { zh: "德高望重，才华出众，功成名就", tw: "德高望重，才華出眾，功成名就", en: "Of high virtue and prestige, outstanding talent and great achievement" }],
  42: ["半吉", 52, { zh: "两才数 · 努力", tw: "兩才數 · 努力", en: "Dual Talent · Striving" }, { zh: "多种才能，各有所长，需专一发展", tw: "多種才能，各有所長，需專一發展", en: "Many talents, each its own strength; focus brings development" }],
  43: ["凶",   28, { zh: "散漫数 · 逆境", tw: "散漫數 · 逆境", en: "Diffusion · Adversity" }, { zh: "散漫无力，逆境重重，需靠坚忍", tw: "散漫無力，逆境重重，需靠堅忍", en: "Scattered and weak amid heavy adversity; perseverance is key" }],
  44: ["凶",   25, { zh: "摧折数 · 苦难", tw: "摧折數 · 苦難", en: "Breaking · Hardship" }, { zh: "苦难频繁，逆境困顿，意志须强", tw: "苦難頻繁，逆境困頓，意志須強", en: "Frequent hardship and adversity; will must be strong" }],
  45: ["大吉", 85, { zh: "大智数 · 顺风", tw: "大智數 · 順風", en: "Great Wisdom · Fair Wind" }, { zh: "智慧超群，一帆风顺，晚年富贵", tw: "智慧超群，一帆風順，晚年富貴", en: "Exceptional wisdom and smooth sailing; wealth in later years" }],
  46: ["凶",   27, { zh: "逆难数 · 坎坷", tw: "逆難數 · 坎坷", en: "Adversity · Rough Road" }, { zh: "坎坷艰辛，磨难多端，晚年转好", tw: "坎坷艱辛，磨難多端，晚年轉好", en: "A rough and arduous road, but it turns better in later years" }],
  47: ["大吉", 83, { zh: "开花数 · 盛开", tw: "開花數 · 盛開", en: "Blossom · Bloom" }, { zh: "鲜花盛放，春风得意，前途光明", tw: "鮮花盛放，春風得意，前途光明", en: "Flowers in full bloom, spirits high, prospects bright" }],
  48: ["大吉", 82, { zh: "有德数 · 财富", tw: "有德數 · 財富", en: "Virtue · Wealth" }, { zh: "品德高尚，财富兴盛，德财兼备", tw: "品德高尚，財富興盛，德財兼備", en: "Noble in virtue and flourishing in wealth; both attained" }],
  49: ["半吉", 53, { zh: "隐变数 · 阴阳", tw: "隱變數 · 陰陽", en: "Hidden Change · Yin-Yang" }, { zh: "阴阳参半，运势起伏，需持中正", tw: "陰陽參半，運勢起伏，需持中正", en: "Half yin, half yang; fortunes rise and fall, hold to the mean" }],
  50: ["凶",   27, { zh: "泥中数 · 困境", tw: "泥中數 · 困境", en: "In the Mire · Predicament" }, { zh: "困境缠身，如陷泥中，需奋力突破", tw: "困境纏身，如陷泥中，需奮力突破", en: "Beset by predicament as if mired; break through with effort" }],
  51: ["半吉", 52, { zh: "阴阳数 · 起伏", tw: "陰陽數 · 起伏", en: "Yin-Yang · Fluctuation" }, { zh: "兴衰交替，有成有败，平心静气", tw: "興衰交替，有成有敗，平心靜氣", en: "Rise and fall alternate, success and failure; stay calm" }],
  52: ["大吉", 82, { zh: "慧明数 · 成功", tw: "慧明數 · 成功", en: "Insight · Success" }, { zh: "慧眼独具，前途无量，终获成功", tw: "慧眼獨具，前途無量，終獲成功", en: "Keen insight, boundless prospects, success in the end" }],
  53: ["半吉", 50, { zh: "进退数 · 起伏", tw: "進退數 · 起伏", en: "Advance-Retreat · Fluctuation" }, { zh: "进退两难，时运不稳，需守正道", tw: "進退兩難，時運不穩，需守正道", en: "Caught between advance and retreat; hold to the right path" }],
  54: ["凶",   22, { zh: "贫苦数 · 窘迫", tw: "貧苦數 · 窘迫", en: "Poverty · Distress" }, { zh: "穷困潦倒，一生辛苦，需防自怨", tw: "窮困潦倒，一生辛苦，需防自怨", en: "Poverty and a toilsome life; guard against self-pity" }],
  55: ["半吉", 54, { zh: "未来数 · 不安", tw: "未來數 · 不安", en: "Future · Unease" }, { zh: "未定之运，内心不安，须静待时机", tw: "未定之運，內心不安，須靜待時機", en: "An undetermined fortune and inner unease; await the right time" }],
  56: ["凶",   28, { zh: "蹇难数 · 波折", tw: "蹇難數 · 波折", en: "Hardship · Setbacks" }, { zh: "事多不遂，困难频出，须防失意", tw: "事多不遂，困難頻出，須防失意", en: "Affairs often thwarted, frequent difficulty; beware despondency" }],
  57: ["吉",   71, { zh: "好运数 · 积累", tw: "好運數 · 積累", en: "Good Luck · Accrual" }, { zh: "积累渐进，晚运兴旺，耐性可成", tw: "積累漸進，晚運興旺，耐性可成", en: "Gradual accrual and a thriving later fortune; patience wins" }],
  58: ["吉",   72, { zh: "后得数 · 晚发", tw: "後得數 · 晚發", en: "Late Gain · Late Bloom" }, { zh: "晚运亨通，脱胎换骨，终得圆满", tw: "晚運亨通，脫胎換骨，終得圓滿", en: "A prosperous later fortune and transformation; fulfillment at last" }],
  59: ["凶",   26, { zh: "暗淡数 · 失意", tw: "暗淡數 · 失意", en: "Dimness · Frustration" }, { zh: "运途暗淡，失意颇多，须防自弃", tw: "運途暗淡，失意頗多，須防自棄", en: "A dim path with much frustration; do not give up on yourself" }],
  60: ["凶",   24, { zh: "迷惑数 · 混沌", tw: "迷惑數 · 混沌", en: "Confusion · Chaos" }, { zh: "意志不定，前途迷茫，需寻明路", tw: "意志不定，前途迷茫，需尋明路", en: "Wavering will and a hazy path; seek a clear road" }],
  61: ["大吉", 83, { zh: "光明数 · 吉辉", tw: "光明數 · 吉輝", en: "Brightness · Radiance" }, { zh: "德惠广被，光辉灿烂，吉祥如意", tw: "德惠廣被，光輝燦爛，吉祥如意", en: "Virtue widely felt, radiant and auspicious" }],
  62: ["凶",   26, { zh: "衰弱数 · 困苦", tw: "衰弱數 · 困苦", en: "Decline · Hardship" }, { zh: "运势衰微，困苦重重，须防萎靡", tw: "運勢衰微，困苦重重，須防萎靡", en: "Declining fortune and heavy hardship; guard against listlessness" }],
  63: ["大吉", 85, { zh: "发展数 · 顺遂", tw: "發展數 · 順遂", en: "Growth · Smoothness" }, { zh: "万事顺遂，吉祥如意，阳光大道", tw: "萬事順遂，吉祥如意，陽光大道", en: "All goes smoothly and auspiciously; a sunlit road" }],
  64: ["凶",   22, { zh: "平地数 · 困难", tw: "平地數 · 困難", en: "Level Ground · Difficulty" }, { zh: "平地起风波，困难突袭，须谨慎", tw: "平地起風波，困難突襲，須謹慎", en: "Trouble arises on level ground; difficulty strikes, be cautious" }],
  65: ["大吉", 82, { zh: "兴隆数 · 光明", tw: "興隆數 · 光明", en: "Flourishing · Brightness" }, { zh: "光明大道，兴旺发达，福运绵绵", tw: "光明大道，興旺發達，福運綿綿", en: "A bright road, flourishing and prosperous, blessings unending" }],
  66: ["凶",   24, { zh: "衰退数 · 下坡", tw: "衰退數 · 下坡", en: "Recession · Decline" }, { zh: "运途下坡，渐趋衰退，须防颓废", tw: "運途下坡，漸趨衰退，須防頹廢", en: "A downhill path, gradually declining; guard against decay" }],
  67: ["大吉", 80, { zh: "好运数 · 成功", tw: "好運數 · 成功", en: "Good Luck · Success" }, { zh: "运势向好，事业有成，生活美满", tw: "運勢向好，事業有成，生活美滿", en: "Fortune turning favorable; career success and a fulfilling life" }],
  68: ["大吉", 82, { zh: "明智数 · 发达", tw: "明智數 · 發達", en: "Wisdom · Prosperity" }, { zh: "明智处世，兴旺发达，家庭幸福", tw: "明智處世，興旺發達，家庭幸福", en: "Wise conduct, flourishing fortune and a happy family" }],
  69: ["凶",   24, { zh: "终末数 · 暗淡", tw: "終末數 · 暗淡", en: "Ending · Dimness" }, { zh: "终末之运，多有遗憾，须早图谋", tw: "終末之運，多有遺憾，須早圖謀", en: "A fortune of endings with regrets; plan early" }],
  70: ["凶",   22, { zh: "空洞数 · 虚弱", tw: "空洞數 · 虛弱", en: "Hollow · Weakness" }, { zh: "精神空洞，缺乏活力，须积极进取", tw: "精神空洞，缺乏活力，須積極進取", en: "Hollow in spirit and lacking vigor; be actively enterprising" }],
  71: ["半吉", 52, { zh: "半吉数 · 各异", tw: "半吉數 · 各異", en: "Half-Fortune · Varied" }, { zh: "吉凶各占，因人而异，需自求多福", tw: "吉凶各占，因人而異，需自求多福", en: "Fortune and misfortune each present, varying by person; seek your own blessings" }],
  72: ["凶",   26, { zh: "上下数 · 倒悬", tw: "上下數 · 倒懸", en: "Up-Down · Inversion" }, { zh: "运势起伏，倒悬之苦，须修身养性", tw: "運勢起伏，倒懸之苦，須修身養性", en: "Fortune rises and falls, with hanging hardship; cultivate yourself" }],
  73: ["吉",   70, { zh: "平稳数 · 吉庆", tw: "平穩數 · 吉慶", en: "Stability · Auspice" }, { zh: "平稳顺遂，吉庆有余，生活安乐", tw: "平穩順遂，吉慶有餘，生活安樂", en: "Stable and smooth, abundant in auspice and a contented life" }],
  74: ["凶",   22, { zh: "失运数 · 暗淡", tw: "失運數 · 暗淡", en: "Lost Fortune · Dimness" }, { zh: "运势暗淡，多有失意，须重振精神", tw: "運勢暗淡，多有失意，須重振精神", en: "A dim fortune with much frustration; rally your spirits" }],
  75: ["半吉", 52, { zh: "迷途数 · 平淡", tw: "迷途數 · 平淡", en: "Strayed · Plainness" }, { zh: "运途平淡，偶有迷茫，需寻正路", tw: "運途平淡，偶有迷茫，需尋正路", en: "A plain path with occasional confusion; seek the right road" }],
  76: ["凶",   23, { zh: "破碎数 · 孤苦", tw: "破碎數 · 孤苦", en: "Fracture · Solitude" }, { zh: "破碎孤苦，离散之命，须寻精神支柱", tw: "破碎孤苦，離散之命，須尋精神支柱", en: "Fractured and lonely, a fate of parting; seek a spiritual anchor" }],
  77: ["半吉", 55, { zh: "阴阳数 · 不定", tw: "陰陽數 · 不定", en: "Yin-Yang · Uncertainty" }, { zh: "吉中带凶，运途不定，须持中正", tw: "吉中帶凶，運途不定，須持中正", en: "Fortune mixed with misfortune, an uncertain path; hold to the mean" }],
  78: ["半吉", 53, { zh: "有终数 · 清雅", tw: "有終數 · 清雅", en: "Conclusion · Elegance" }, { zh: "清雅之运，有始有终，平淡中知足", tw: "清雅之運，有始有終，平淡中知足", en: "An elegant fortune with beginning and end; content in plainness" }],
  79: ["凶",   24, { zh: "末路数 · 困窘", tw: "末路數 · 困窘", en: "Dead End · Distress" }, { zh: "末路艰辛，须防困境，重整旗鼓", tw: "末路艱辛，須防困境，重整旗鼓", en: "A hard dead-end road; guard against straits and regroup" }],
  80: ["凶",   22, { zh: "无功数 · 收缩", tw: "無功數 · 收縮", en: "Fruitless · Contraction" }, { zh: "有始无终，收缩之运，须重燃斗志", tw: "有始無終，收縮之運，須重燃鬥志", en: "Beginnings without ends, a contracting fortune; rekindle your drive" }],
  81: ["大吉", 92, { zh: "还本数 · 圆满", tw: "還本數 · 圓滿", en: "Return to Origin · Fulfillment" }, { zh: "还原归本，圆满之象，福禄双全", tw: "還原歸本，圓滿之象，福祿雙全", en: "Returning to the origin, an omen of fulfillment; blessings and prosperity" }],
};

const FALLBACK_INFO: { unknown: L; zero: L } = {
  unknown: { zh: "需综合分析", tw: "需綜合分析", en: "requires holistic analysis" },
  zero: { zh: "缺乏活力", tw: "缺乏活力", en: "lacking vitality" },
};

interface NumInfoResolved {
  levelKey: LevelKey;
  score: number;
  title: string;
  shortDesc: string;
  /** 原始数据，供 fullDesc 拼装时取对应语言 */
  raw: NumInfo;
}

/**
 * 获取数理信息（超过81则取尾数，但有特殊规则），并按 lang 解析
 */
function getNumInfo(n: number, lang: Lang): NumInfoResolved {
  let raw: NumInfo;
  if (n <= 0) {
    raw = ["凶", 20, { zh: "零数", tw: "零數", en: "Zero" }, FALLBACK_INFO.zero];
  } else if (n <= 81) {
    raw = NUM_INFO[n] ?? ["半吉", 50, { zh: "未知数", tw: "未知數", en: "Unknown" }, FALLBACK_INFO.unknown];
  } else {
    const rem = n % 81;
    raw = NUM_INFO[rem === 0 ? 81 : rem] ?? ["半吉", 50, { zh: "未知数", tw: "未知數", en: "Unknown" }, FALLBACK_INFO.unknown];
  }
  return {
    levelKey: raw[0],
    score: raw[1],
    title: raw[2][lang],
    shortDesc: raw[3][lang],
    raw,
  };
}

/** 取某数的 levelKey（用于条件判断，不涉及展示语言） */
function levelKeyOf(n: number): LevelKey {
  return getNumInfo(n, "zh").levelKey;
}

/** 取某数 shortDesc 的对应语言文案（fullDesc 拼装用） */
function shortDescOf(n: number, lang: Lang): string {
  const effectiveN = n <= 81 ? n : (n % 81 === 0 ? 81 : n % 81);
  const info = NUM_INFO[effectiveN];
  return info ? info[3][lang] : FALLBACK_INFO.unknown[lang];
}

function isAuspiciousKey(k: LevelKey): boolean {
  return k === "大吉" || k === "吉";
}

/**
 * 构建 WugeGe 对象
 */
function buildGe(strokes: number, lang: Lang, fullDescFn: (n: number, lang: Lang) => string): WugeGe {
  const effectiveN = strokes <= 81 ? strokes : (strokes % 81 === 0 ? 81 : strokes % 81);
  const info = getNumInfo(strokes, lang);

  return {
    strokes,
    level: LEVEL_DISPLAY[info.levelKey][lang],
    levelKey: info.levelKey,
    score: info.score,
    title: info.title,
    shortDesc: info.shortDesc,
    fullDesc: fullDescFn(effectiveN, lang),
  };
}

// ===== 五格完整描述（三语） =====

const TIAN_SPECIAL: Record<number, L> = {
  2: { zh: "天格2，祖上缘分薄，先天基础较弱，但凭自身努力可以改变命运。", tw: "天格2，祖上緣分薄，先天基礎較弱，但憑自身努力可以改變命運。", en: "Heaven Grid 2: thin ancestral affinity and a weaker innate foundation, yet your own effort can reshape your fate." },
  3: { zh: "天格3，先天根基稳固，家族有一定积累，少年时期受益良多。", tw: "天格3，先天根基穩固，家族有一定積累，少年時期受益良多。", en: "Heaven Grid 3: a solid innate foundation with some family accumulation; your youth benefits greatly." },
  4: { zh: "天格4，祖上缘薄，早年辛苦，但只要自强不息，后天可以弥补。", tw: "天格4，祖上緣薄，早年辛苦，但只要自強不息，後天可以彌補。", en: "Heaven Grid 4: thin ancestral affinity and a hard early life, but ceaseless self-improvement can make up for it." },
  5: { zh: "天格5，先天基础扎实，家族背景良好，可得祖上庇荫。", tw: "天格5，先天基礎扎實，家族背景良好，可得祖上庇蔭。", en: "Heaven Grid 5: a sturdy innate foundation and good family background; you receive ancestral protection." },
  6: { zh: "天格6，家族根基深厚，天时地利俱佳，是承前启后的好格局。", tw: "天格6，家族根基深厚，天時地利俱佳，是承前啟後的好格局。", en: "Heaven Grid 6: deep family roots with favorable timing and circumstance; a fine pattern bridging past and future." },
  7: { zh: "天格7，先天略带刚气，独立自主意识强，家族给予精神财富。", tw: "天格7，先天略帶剛氣，獨立自主意識強，家族給予精神財富。", en: "Heaven Grid 7: a touch of innate firmness and strong independence; the family imparts spiritual wealth." },
  8: { zh: "天格8，先天坚韧，家族背景中等，需靠个人努力开拓局面。", tw: "天格8，先天堅韌，家族背景中等，需靠個人努力開拓局面。", en: "Heaven Grid 8: innately resilient with a moderate family background; personal effort must open the way." },
};

function getTianFullDesc(n: number, lang: Lang): string {
  const special = TIAN_SPECIAL[n];
  if (special) return special[lang];
  const sd = shortDescOf(n, lang);
  if (lang === "en") {
    return `Heaven Grid ${n} strokes — ${sd}. The innate grid, sheltered by one's ancestors, forms the root of the overall fortune.`;
  }
  if (lang === "tw") {
    return `天格${n}畫，${sd}。先天之格，受祖先庇蔭，為整體運勢的根基。`;
  }
  return `天格${n}画，${sd}。先天之格，受祖先庇荫，为整体运势的根基。`;
}

const REN_SPECIAL: Record<number, L> = {
  5: { zh: "人格5，五行调和，品格端正，处世圆融，善于协调各方关系，中年运势平稳向好。", tw: "人格5，五行調和，品格端正，處世圓融，善於協調各方關係，中年運勢平穩向好。", en: "Personality Grid 5: the Five Elements in balance, upright in character and smooth in conduct, skilled at coordinating relationships; midlife fortune is steady and improving." },
  6: { zh: "人格6，仁义之心，贵人频至，人际关系优秀，中年事业多得助力，感情和谐。", tw: "人格6，仁義之心，貴人頻至，人際關係優秀，中年事業多得助力，感情和諧。", en: "Personality Grid 6: a benevolent heart, frequent benefactors and excellent relationships; midlife career gains much support and love is harmonious." },
  7: { zh: "人格7，意志刚健，自力更生，处事果断，中年凭实力稳步发展，财运逐渐旺盛。", tw: "人格7，意志剛健，自力更生，處事果斷，中年憑實力穩步發展，財運逐漸旺盛。", en: "Personality Grid 7: vigorous will and self-reliance, decisive in action; midlife develops steadily on merit and wealth grows ever stronger." },
  8: { zh: "人格8，坚忍卓绝，虽有挫折，但终能厚积薄发，中年事业稳固，财运中等偏上。", tw: "人格8，堅忍卓絕，雖有挫折，但終能厚積薄發，中年事業穩固，財運中等偏上。", en: "Personality Grid 8: extraordinary perseverance; though setbacks come, you ultimately rise from deep reserves; midlife career is solid and wealth above average." },
  11: { zh: "人格11，刚柔并济，进退有据，中年运势渐入佳境，事业稳步攀升。", tw: "人格11，剛柔並濟，進退有據，中年運勢漸入佳境，事業穩步攀升。", en: "Personality Grid 11: firm yet gentle, measured in advance and retreat; midlife fortune steadily improves and career climbs." },
  13: { zh: "人格13，才智出众，博学多识，处事精明，中年事业光辉，名声渐起。", tw: "人格13，才智出眾，博學多識，處事精明，中年事業光輝，名聲漸起。", en: "Personality Grid 13: outstanding wit and broad learning, shrewd in action; midlife career shines and reputation grows." },
  15: { zh: "人格15，仁德兼备，领导力强，广结善缘，中年运势大旺，财富与声誉双收。", tw: "人格15，仁德兼備，領導力強，廣結善緣，中年運勢大旺，財富與聲譽雙收。", en: "Personality Grid 15: benevolent and virtuous with strong leadership, forging many good ties; midlife fortune flourishes, gaining both wealth and renown." },
  16: { zh: "人格16，处世温和，得众人信赖，贵人如云，中年事业腾飞。", tw: "人格16，處世溫和，得眾人信賴，貴人如雲，中年事業騰飛。", en: "Personality Grid 16: gentle in conduct and widely trusted, with benefactors like clouds; midlife career takes off." },
  21: { zh: "人格21，首领之格，统御力强，中年后成就卓越，受人敬仰。", tw: "人格21，首領之格，統御力強，中年後成就卓越，受人敬仰。", en: "Personality Grid 21: a leader's pattern with strong command; after midlife your achievements are outstanding and admired." },
  23: { zh: "人格23，威权显赫，名利双收，中年大展宏图，事业如日中天。", tw: "人格23，威權顯赫，名利雙收，中年大展宏圖，事業如日中天。", en: "Personality Grid 23: eminent authority, fame and fortune both gained; midlife unfolds grand plans and the career is at its zenith." },
  24: { zh: "人格24，财源广进，家业兴旺，中年积累丰厚，生活富足。", tw: "人格24，財源廣進，家業興旺，中年積累豐厚，生活富足。", en: "Personality Grid 24: wide-flowing wealth and a thriving household; midlife accumulates richly and life is abundant." },
  31: { zh: "人格31，德才兼备，广受爱戴，中年事业蒸蒸日上，家族繁荣。", tw: "人格31，德才兼備，廣受愛戴，中年事業蒸蒸日上，家族繁榮。", en: "Personality Grid 31: of virtue and talent, widely beloved; midlife career rises ever higher and the family prospers." },
  32: { zh: "人格32，贵人频至，好运连连，中年多有意外惊喜，事业顺风顺水。", tw: "人格32，貴人頻至，好運連連，中年多有意外驚喜，事業順風順水。", en: "Personality Grid 32: frequent benefactors and continual luck; midlife brings pleasant surprises and a smooth-sailing career." },
  33: { zh: "人格33，名声显赫，气场强大，中年声誉远播，能量充沛。", tw: "人格33，名聲顯赫，氣場強大，中年聲譽遠播，能量充沛。", en: "Personality Grid 33: eminent fame and a powerful presence; in midlife your renown spreads far and energy abounds." },
  37: { zh: "人格37，人品出众，精神充沛，中年凭实力获得广泛尊重。", tw: "人格37，人品出眾，精神充沛，中年憑實力獲得廣泛尊重。", en: "Personality Grid 37: outstanding character and ample spirit; in midlife you earn broad respect on merit." },
  39: { zh: "人格39，智慧与健康兼备，中年安稳，晚年尤为顺遂。", tw: "人格39，智慧與健康兼備，中年安穩，晚年尤為順遂。", en: "Personality Grid 39: both wise and healthy; midlife is steady and later years especially smooth." },
  41: { zh: "人格41，德高望重，处世高明，中年事业达到顶峰。", tw: "人格41，德高望重，處世高明，中年事業達到頂峰。", en: "Personality Grid 41: of high virtue and prestige, masterful in conduct; midlife career reaches its peak." },
};

function getRenFullDesc(n: number, lang: Lang): string {
  const special = REN_SPECIAL[n];
  if (special) return special[lang];
  const sd = shortDescOf(n, lang);
  if (lang === "en") {
    return `Personality Grid ${n} strokes — ${sd}. The Personality Grid is the primary-fortune grid, determining core character and midlife career development; it is the most important of the Five Grids.`;
  }
  if (lang === "tw") {
    return `人格${n}畫，${sd}。人格為主運之格，決定核心性格與中年事業發展走向，是五格中最重要的一格。`;
  }
  return `人格${n}画，${sd}。人格为主运之格，决定核心性格与中年事业发展走向，是五格中最重要的一格。`;
}

function getDiFullDesc(n: number, lang: Lang): string {
  const sd = shortDescOf(n, lang);
  const good = isAuspiciousKey(levelKeyOf(n));
  if (lang === "en") {
    const tail = good
      ? "In adolescence fortune is favorable, family is harmonious and studies go smoothly, laying a solid foundation for later development."
      : "Early years may bring some setbacks, but these very trials let you grow through adversity and store up strength for midlife.";
    return `Earth Grid ${n} strokes — ${sd}. The Earth Grid governs the early fortune, representing the path of destiny before age 36, the family environment and childhood experiences. ${tail}`;
  }
  if (lang === "tw") {
    const tail = good
      ? "青少年時期運勢良好，家庭和睦，學業順利，為日後發展打下堅實基礎。"
      : "早年可能經歷一些波折，但正是這些磨礪讓你在逆境中成長，為中年積蓄力量。";
    return `地格${n}畫，${sd}。地格主前運，代表36歲前的命運走向、家庭環境和童年際遇。${tail}`;
  }
  const tail = good
    ? "青少年时期运势良好，家庭和睦，学业顺利，为日后发展打下坚实基础。"
    : "早年可能经历一些波折，但正是这些磨砺让你在逆境中成长，为中年积蓄力量。";
  return `地格${n}画，${sd}。地格主前运，代表36岁前的命运走向、家庭环境和童年际遇。${tail}`;
}

function getWaiFullDesc(n: number, lang: Lang): string {
  const sd = shortDescOf(n, lang);
  const good = isAuspiciousKey(levelKeyOf(n));
  if (lang === "en") {
    const tail = good
      ? "Excellent relationships and strong benefactor affinity; you shine in social settings and external support flows steadily."
      : "Social fortune is modest and benefactor affinity thin; most things rely on your own effort, so build your network proactively.";
    return `External Grid ${n} strokes — ${sd}. The External Grid governs the secondary fortune, representing social connections, benefactors and outside opportunities. ${tail}`;
  }
  if (lang === "tw") {
    const tail = good
      ? "人際關係出色，貴人緣極好，善於在社交場合展示自我，外部助力不斷。"
      : "社交運勢平平，貴人緣較薄，凡事多靠自身努力，需主動建立人脈圈。";
    return `外格${n}畫，${sd}。外格主副運，代表社交人脈、貴人相助和外部機緣。${tail}`;
  }
  const tail = good
    ? "人际关系出色，贵人缘极好，善于在社交场合展示自我，外部助力不断。"
    : "社交运势平平，贵人缘较薄，凡事多靠自身努力，需主动建立人脉圈。";
  return `外格${n}画，${sd}。外格主副运，代表社交人脉、贵人相助和外部机缘。${tail}`;
}

function getZongFullDesc(n: number, lang: Lang): string {
  const sd = shortDescOf(n, lang);
  const good = isAuspiciousKey(levelKeyOf(n));
  if (lang === "en") {
    const tail = good
      ? "Later years are thriving, with achievement in both career and wealth; you enjoy the fruits of life and a happy, harmonious family."
      : "In later years take care to consolidate, avoid rash advances, and handle affairs steadily so you may enjoy a peaceful old age.";
    return `Total Grid ${n} strokes — ${sd}. The Total Grid governs the later fortune, representing the overall destiny from age 36 onward into old age — the general climate of life's second half. ${tail}`;
  }
  if (lang === "tw") {
    const tail = good
      ? "晚年運勢旺盛，事業財富皆有所成，享受人生果實，家庭幸福美滿。"
      : "晚年需注意守成，減少冒進，以穩健態度處理事務，方可安享晚年。";
    return `總格${n}畫，${sd}。總格主後運，代表36歲後乃至晚年的整體命運走向，是人生下半場的總體氣象。${tail}`;
  }
  const tail = good
    ? "晚年运势旺盛，事业财富皆有所成，享受人生果实，家庭幸福美满。"
    : "晚年需注意守成，减少冒进，以稳健态度处理事务，方可安享晚年。";
  return `总格${n}画，${sd}。总格主后运，代表36岁后乃至晚年的整体命运走向，是人生下半场的总体气象。${tail}`;
}

// ===== 三才配置分析（天地人，三语） =====

/** 五行原始中文键 → 三语展示名 */
const ELEMENT_DISPLAY: Record<string, L> = {
  水: { zh: "水", tw: "水", en: "Water" },
  木: { zh: "木", tw: "木", en: "Wood" },
  火: { zh: "火", tw: "火", en: "Fire" },
  土: { zh: "土", tw: "土", en: "Earth" },
  金: { zh: "金", tw: "金", en: "Metal" },
};

function analyzeSanCai(
  tianStrokes: number,
  renStrokes: number,
  diStrokes: number,
  lang: Lang,
): { config: string; desc: string } {
  const t = tianStrokes % 5 === 0 ? 5 : tianStrokes % 5; // 1水2木3火4土5金
  const r = renStrokes % 5 === 0 ? 5 : renStrokes % 5;
  const d = diStrokes % 5 === 0 ? 5 : diStrokes % 5;

  const elementMap: Record<number, string> = { 1: "水", 2: "木", 3: "火", 4: "土", 5: "金" };
  const tEl = elementMap[t] ?? "土";
  const rEl = elementMap[r] ?? "土";
  const dEl = elementMap[d] ?? "土";

  // 判断仍用中文键拼接（稳定）
  const key = `${tEl}${rEl}${dEl}`;

  // 展示配置：英文用「Water-Wood-Fire」，中文用「水木火」
  const display = lang === "en"
    ? [tEl, rEl, dEl].map((e) => ELEMENT_DISPLAY[e]?.en ?? e).join("-")
    : `${ELEMENT_DISPLAY[tEl]?.[lang] ?? tEl}${ELEMENT_DISPLAY[rEl]?.[lang] ?? rEl}${ELEMENT_DISPLAY[dEl]?.[lang] ?? dEl}`;

  const goodCombos = ["水木火", "木火土", "火土金", "土金水", "金水木", "水水木", "木木火", "火火土"];
  const badCombos = ["木土木", "土水土", "火金火", "金木金", "水火水", "金火木"];

  let desc: string;
  if (goodCombos.includes(key)) {
    if (lang === "en") desc = `The Three Talents ${display} are mutually generating and supportive; fortune is smooth, and both career and family enjoy the favor of timing, circumstance and people.`;
    else if (lang === "tw") desc = `三才${display}，相生相扶，運勢順遂，事業與家庭皆得天時地利人和之助。`;
    else desc = `三才${display}，相生相扶，运势顺遂，事业与家庭皆得天时地利人和之助。`;
  } else if (badCombos.includes(key)) {
    if (lang === "en") desc = `The Three Talents ${display} contain conflicting elements, so fortune has some twists; yet through personal virtue and effort, the unfavorable can be resolved.`;
    else if (lang === "tw") desc = `三才${display}，存在相剋因素，運勢有些曲折，但憑藉個人德行與努力，可以化解不利。`;
    else desc = `三才${display}，存在相克因素，运势有些曲折，但凭借个人德行与努力，可以化解不利。`;
  } else {
    if (lang === "en") desc = `The Three Talents ${display} form a balanced, centered pattern; fortune is steady. Conduct affairs with moderation and hold to the right path while awaiting your time.`;
    else if (lang === "tw") desc = `三才${display}，格局中正，運勢平穩，凡事宜中庸處世，守正待時。`;
    else desc = `三才${display}，格局中正，运势平稳，凡事宜中庸处世，守正待时。`;
  }

  return { config: display, desc };
}

// ===== 特殊运势标签（三语） =====

const TAG_DISPLAY: Record<string, L> = {
  领袖运: { zh: "领袖运", tw: "領袖運", en: "Leadership" },
  智慧运: { zh: "智慧运", tw: "智慧運", en: "Wisdom" },
  财富运: { zh: "财富运", tw: "財富運", en: "Wealth" },
  福寿运: { zh: "福寿运", tw: "福壽運", en: "Blessing & Longevity" },
  事业运: { zh: "事业运", tw: "事業運", en: "Career" },
  艺能运: { zh: "艺能运", tw: "藝能運", en: "Artistic Talent" },
  贵人运: { zh: "贵人运", tw: "貴人運", en: "Benefactor" },
  家庭运: { zh: "家庭运", tw: "家庭運", en: "Family" },
  孤独运: { zh: "孤独运", tw: "孤獨運", en: "Solitude" },
  晚年吉: { zh: "晚年吉", tw: "晚年吉", en: "Auspicious Later Years" },
  青年顺: { zh: "青年顺", tw: "青年順", en: "Smooth Youth" },
};

function getSpecialTags(ren: number, zong: number, di: number, lang: Lang): string[] {
  const keys: string[] = [];

  if ([1, 21, 23, 33, 41, 45].includes(ren)) keys.push("领袖运");
  if ([13, 15, 21, 29, 41, 45, 52, 63].includes(ren)) keys.push("智慧运");
  if ([6, 15, 16, 24, 31, 32, 41, 52].includes(ren)) keys.push("财富运");
  if ([5, 6, 15, 35, 39, 45, 61, 63, 65].includes(ren)) keys.push("福寿运");
  if ([13, 17, 21, 23, 25, 33, 37, 41].includes(ren)) keys.push("事业运");
  if ([38, 39, 47, 48].includes(ren)) keys.push("艺能运");
  if ([15, 16, 32, 37, 41, 45, 47, 52].includes(ren)) keys.push("贵人运");
  if ([6, 11, 15, 16, 31, 32, 35, 39].includes(ren)) keys.push("家庭运");
  if ([2, 9, 10, 19, 20, 22, 28, 34].includes(ren)) keys.push("孤独运");
  if ([3, 5, 6, 15, 16, 21, 31, 32, 41].includes(zong)) keys.push("晚年吉");
  if ([6, 11, 13, 16, 24, 31, 32].includes(di)) keys.push("青年顺");

  return [...new Set(keys)].slice(0, 5).map((k) => TAG_DISPLAY[k]?.[lang] ?? k);
}

// ===== 各维度解析（三语） =====

function getPersonalityDesc(renStrokes: number, _gender: "male" | "female", lang: Lang): string {
  const n = renStrokes;

  if ([1, 21, 23, 33, 41].includes(n)) {
    if (lang === "en") return "You are a born leader — firm of will, independent and enterprising. You hold tenaciously to your goals, excel at planning and organizing, and naturally become the core of any team. You may seem somewhat domineering, but your heart is sincere and worthy of trust.";
    if (lang === "tw") return "你天生具有領袖氣質，意志堅定，獨立進取。對目標有強烈的執著，擅長統籌規劃，在團隊中自然成為核心。性格上可能略顯強勢，但內心真誠，值得信賴。";
    return "你天生具有领袖气质，意志坚定，独立进取。对目标有强烈的执着，擅长统筹规划，在团队中自然成为核心。性格上可能略显强势，但内心真诚，值得信赖。";
  }
  if ([6, 15, 16, 35, 39, 65].includes(n)) {
    if (lang === "en") return "You are gentle and benevolent, forging wide good ties and valuing loyalty. Smooth in conduct and skilled at resolving conflict, you are the steadying anchor among those around you. Tender in feeling and full of care for family and friends, you face life with an upbeat attitude.";
    if (lang === "tw") return "你為人溫和仁厚，廣結善緣，重情重義。處世圓融，善於化解矛盾，是身邊人眼中的「定海神針」。感情細膩，對家人朋友充滿關愛，生活態度積極向上。";
    return "你为人温和仁厚，广结善缘，重情重义。处世圆融，善于化解矛盾，是身边人眼中的“定海神针”。感情细腻，对家人朋友充满关爱，生活态度积极向上。";
  }
  if ([13, 24, 29, 32, 52, 63].includes(n)) {
    if (lang === "en") return "You are bright and adaptable, quick of thought and a powerful learner. Skilled at seizing opportunity, you have a natural edge in business and social life. At times you may overthink, but that is the mark of careful deliberation. You adapt quickly to change and turn challenges into opportunities.";
    if (lang === "tw") return "你聰慧靈活，思維敏捷，學習能力超強。善於抓住機遇，在商業和社交上有天然優勢。有時略顯多慮，但這也是深思熟慮的體現。能快速適應變化，化挑戰為機遇。";
    return "你聪慧灵活，思维敏捷，学习能力超强。善于抓住机遇，在商业和社交上有天然优势。有时略显多虑，但这也是深思熟虑的体现。能快速适应变化，化挑战为机遇。";
  }
  if ([7, 8, 17, 18, 25].includes(n)) {
    if (lang === "en") return "You are strong-willed, grounded and hardworking, never giving up. Conscientious and responsible, you pursue perfection with formidable execution. Not one for sweet talk, you prove your worth through action. Though you may seem stubborn, that very persistence is your code for success.";
    if (lang === "tw") return "你意志堅強，踏實刻苦，不折不撓。凡事認真負責，追求完美，執行力極強。不善花言巧語，以實際行動證明自己的價值。雖然有時顯得固執，但這份堅持正是成功的密碼。";
    return "你意志坚强，踏实刻苦，不折不挠。凡事认真负责，追求完美，执行力极强。不善花言巧语，以实际行动证明自己的价值。虽然有时显得固执，但这份坚持正是成功的密码。";
  }
  if ([38, 47, 48].includes(n)) {
    if (lang === "en") return "You are richly artistic, sensitive and creative, with a unique feel for beauty. Gifted in literature, art and music, your emotions run deep and fine, and you express yourself in distinctive ways.";
    if (lang === "tw") return "你富有藝術氣質，敏感而有創造力，對美有獨特的感受力。在文學、藝術、音樂方面有天賦，情感豐富細膩，擅長用獨特的方式表達自我。";
    return "你富有艺术气质，敏感而有创造力，对美有独特的感受力。在文学、艺术、音乐方面有天赋，情感丰富细腻，擅长用独特的方式表达自我。";
  }
  // 默认性格描述：按尾数
  const lastDigit = n % 10;
  if ([1, 2].includes(lastDigit)) {
    if (lang === "en") return "Your character leans toward the leadership type — independent, self-directed and decisive in the moment, though at times not flexible enough.";
    if (lang === "tw") return "你性格偏於領導型，獨立自主，有主見，遇事能快速決斷，但有時會顯得不夠靈活。";
    return "你性格偏于领导型，独立自主，有主见，遇事能快速决断，但有时会显得不够灵活。";
  }
  if ([3, 4].includes(lastDigit)) {
    if (lang === "en") return "You are lively in mind and socially adept, expressive and at ease in relationships, with a wide circle of friends.";
    if (lang === "tw") return "你思維活躍，社交能力強，善於表達，在人際關係方面遊刃有餘，朋友圈廣泛。";
    return "你思维活跃，社交能力强，善于表达，在人际关系方面游刃有余，朋友圈广泛。";
  }
  if ([5, 6].includes(lastDigit)) {
    if (lang === "en") return "You are even-tempered and down-to-earth, methodical in your work, a reliable partner with a strong sense of family who values harmony.";
    if (lang === "tw") return "你處世平和，腳踏實地，做事有條理，是可靠的合作夥伴，家庭觀念重，重視和諧。";
    return "你处世平和，脚踏实地，做事有条理，是可靠的合作伙伴，家庭观念重，重视和谐。";
  }
  if ([7, 8].includes(lastDigit)) {
    if (lang === "en") return "You are firm of will, diligent and unwilling to give up; through persistence and effort you often reap rich rewards in the mid-to-later stages.";
    if (lang === "tw") return "你意志剛毅，勤奮努力，不輕易放棄，憑藉堅持和努力，往往能在中後期獲得豐厚回報。";
    return "你意志刚毅，勤奋努力，不轻易放弃，凭借坚持和努力，往往能在中后期获得丰厚回报。";
  }
  if (lang === "en") return "You are rich within and clear of thought, flexible in your dealings, able to adjust strategy to place and time, with strong adaptability.";
  if (lang === "tw") return "你內心豐富，思路清晰，處事靈活，能因地制宜、因時制宜地調整策略，具有較強的適應能力。";
  return "你内心丰富，思路清晰，处事灵活，能因地制宜、因时制宜地调整策略，具有较强的适应能力。";
}

function getCareerDesc(renStrokes: number, zongStrokes: number, lang: Lang): string {
  const renGood = isAuspiciousKey(levelKeyOf(renStrokes));
  const zongGood = isAuspiciousKey(levelKeyOf(zongStrokes));

  if (renGood && zongGood) {
    if (lang === "en") return "Your career fortune is strong; it gathers momentum from midlife, letting you build reputation and standing in your field. You suit work calling for leadership or creativity, get along well with superiors and colleagues, and have many chances to be promoted. Later years bring brilliant achievement and the rich fruits of your effort.";
    if (lang === "tw") return "事業運勢強勁，中年開始逐漸發力，在所從事的領域內能夠建立聲譽與地位。適合從事需要領導力或創造力的工作，與上司及同事關係融洽，得到提攜的機會多。晚年事業成就斐然，可享受努力的豐厚果實。";
    return "事业运势强劲，中年开始逐渐发力，在所从事的领域内能够建立声誉与地位。适合从事需要领导力或创造力的工作，与上司及同事关系融洽，得到提携的机会多。晚年事业成就斐然，可享受努力的丰厚果实。";
  }
  if (renGood) {
    if (lang === "en") return "Your midlife career develops steadily; through personal talent and charisma you gain a firm footing in the workplace. Though later years call for consolidation, the resources and connections you built earlier are enough to support a stable life.";
    if (lang === "tw") return "中年事業穩步發展，憑藉個人才華和人格魅力，在職場中逐漸站穩腳跟。雖然晚年需要注意守成，但前期積累的資源和人脈足以支撐穩定的生活。";
    return "中年事业稳步发展，凭借个人才华和人格魅力，在职场中逐渐站稳脚跟。虽然晚年需要注意守成，但前期积累的资源和人脉足以支撑稳定的生活。";
  }
  if (zongGood) {
    if (lang === "en") return "Early years may hold some twists, but do not be discouraged — a thriving later fortune is a key trait of your life. After midlife, as experience and connections accumulate, your career markedly improves, and later years bring the high point of your life.";
    if (lang === "tw") return "早年可能有些曲折，但不要氣餒，因為晚運旺盛是你人生的重要特質。中年後隨著閱歷積累和人脈建立，事業會明顯好轉，晚年達到人生的高光時刻。";
    return "早年可能有些曲折，但不要气馁，因为晚运旺盛是你人生的重要特质。中年后随着阅历积累和人脉建立，事业会明显好转，晚年达到人生的高光时刻。";
  }
  if (lang === "en") return "Your career must be opened up through your own continual effort. There is no sign of sudden great wealth, but with a grounded, earnest attitude you can still achieve results in your post and earn the respect of those around you.";
  if (lang === "tw") return "事業需要靠自身持續努力來開拓，雖無大富大貴之象，但憑藉踏實認真的態度，也能在本職崗位上做出成績，贏得周圍人的尊重。";
  return "事业需要靠自身持续努力来开拓，虽无大富大贵之象，但凭借踏实认真的态度，也能在本职岗位上做出成绩，赢得周围人的尊重。";
}

function getLoveDesc(renStrokes: number, _diStrokes: number, _gender: "male" | "female", lang: Lang): string {
  const renGood = isAuspiciousKey(levelKeyOf(renStrokes));

  if (renGood) {
    if (lang === "en") return "Your romantic fortune is favorable; your natural charm easily draws fine partners. Married life is harmonious and happy, the home warm, and you and your partner understand and support one another. You have affinity with children, and family brings you great happiness.";
    if (lang === "tw") return "你感情運勢良好，魅力自然，容易吸引到優質的伴侶。婚姻生活和諧美滿，家庭氛圍溫馨，與伴侶能夠相互理解扶持。有子女緣，家庭會給你帶來極大的幸福感。";
    return "你感情运势良好，魅力自然，容易吸引到优质的伴侣。婚姻生活和谐美满，家庭氛围温馨，与伴侣能够相互理解扶持。有子女缘，家庭会给你带来极大的幸福感。";
  }
  if ([2, 9, 19, 22, 28, 34, 44].includes(renStrokes)) {
    if (lang === "en") return "Your path in love may hold some twists; partings or misunderstandings come more easily, so it calls for more tolerance and communication. Keep patience in relationships, be a little less idealistic and a little more practical, and treat others with sincerity to find a truly compatible partner.";
    if (lang === "tw") return "你感情路上可能有些波折，容易經歷分離或誤解，需要更多的包容與溝通。建議在感情中保持耐心，少一些理想化，多一些務實，真誠相待才能找到真正契合的伴侶。";
    return "你感情路上可能有些波折，容易经历分离或误解，需要更多的包容与沟通。建议在感情中保持耐心，少一些理想化，多一些务实，真诚相待才能找到真正契合的伴侣。";
  }
  if (lang === "en") return "Your love is steady, with marriage centered on stability — not fiery passion, but the lasting warmth of a gentle stream. Cherish the partner at your side and tend the relationship with care; family will become your most solid harbor.";
  if (lang === "tw") return "你感情平穩，婚姻以穩定為主，雖無轟轟烈烈，卻有細水長流的溫情。珍惜身邊的伴侶，用心經營感情，家庭會成為你最堅實的避風港。";
  return "你感情平稳，婚姻以稳定为主，虽无轰轰烈烈，却有细水长流的温情。珍惜身边的伴侣，用心经营感情，家庭会成为你最坚实的避风港。";
}

function getHealthDesc(_tianStrokes: number, renStrokes: number, lang: Lang): string {
  const renKey = levelKeyOf(renStrokes);

  if (renKey === "大吉") {
    if (lang === "en") return "Your health fortune is strong, your constitution good and energy abundant. Keep a regular routine and moderate exercise; during prosperous periods especially, balance work with rest and avoid overdrawing your strength. Overall, your health is satisfying.";
    if (lang === "tw") return "健康運勢旺盛，體質較好，精力充沛。注意保持規律的作息和適度的運動，在旺運期更要注意勞逸結合，避免透支體力。整體健康狀況令人滿意。";
    return "健康运势旺盛，体质较好，精力充沛。注意保持规律的作息和适度的运动，在旺运期更要注意劳逸结合，避免透支体力。整体健康状况令人满意。";
  }
  if (renKey === "凶" || renKey === "大凶") {
    if (lang === "en") return "You need to pay special attention to health; stress may affect your physical condition. Get regular check-ups, ensure ample sleep, and release tension through exercise. Take care of your digestive and nervous systems, and remember that managing your emotions is vital to your health.";
    if (lang === "tw") return "需要特別關注健康，壓力可能會影響身體狀況，建議定期體檢，保持充足睡眠，通過運動釋放壓力。注意消化系統、神經系統的保養，情緒管理對健康至關重要。";
    return "需要特别关注健康，压力可能会影响身体状况，建议定期体检，保持充足睡眠，通过运动释放压力。注意消化系统、神经系统的保养，情绪管理对健康至关重要。";
  }
  if (lang === "en") return "Your health is moderate. Mind a regular routine, eat in balance and avoid overwork. Suitable outdoor exercise and a positive frame of mind will greatly benefit your health.";
  if (lang === "tw") return "健康狀況中等，注意作息規律，飲食均衡，避免過度勞累。適當進行戶外運動，保持良好的心態，對健康大有裨益。";
  return "健康状况中等，注意作息规律，饮食均衡，避免过度劳累。适当进行户外运动，保持良好的心态，对健康大有裨益。";
}

// ===== 综合分数与评级 =====

function calcOverallScore(tian: WugeGe, ren: WugeGe, di: WugeGe, wai: WugeGe, zong: WugeGe): number {
  // 人格权重最高（40%），其次总格（25%），地格（15%），外格（10%），天格（10%）
  const weighted = ren.score * 0.4 + zong.score * 0.25 + di.score * 0.15 + wai.score * 0.1 + tian.score * 0.1;
  return Math.round(Math.min(99, Math.max(20, weighted)));
}

const SCORE_LEVELS: Array<{ min: number; text: L }> = [
  { min: 90, text: { zh: "极佳 · 运势昌隆", tw: "極佳 · 運勢昌隆", en: "Excellent · Flourishing Fortune" } },
  { min: 80, text: { zh: "优良 · 前程似锦", tw: "優良 · 前程似錦", en: "Very Good · Bright Prospects" } },
  { min: 70, text: { zh: "良好 · 稳步向上", tw: "良好 · 穩步向上", en: "Good · Steadily Rising" } },
  { min: 60, text: { zh: "中等 · 平稳发展", tw: "中等 · 平穩發展", en: "Moderate · Steady Development" } },
  { min: 50, text: { zh: "一般 · 需勤奋耕耘", tw: "一般 · 需勤奮耕耘", en: "Fair · Diligence Required" } },
  { min: 0,  text: { zh: "待改善 · 逆境淬炼", tw: "待改善 · 逆境淬煉", en: "Needs Improvement · Tempered by Adversity" } },
];

function getScoreLevel(score: number, lang: Lang): string {
  for (const lvl of SCORE_LEVELS) {
    if (score >= lvl.min) return lvl.text[lang];
  }
  return SCORE_LEVELS[SCORE_LEVELS.length - 1]!.text[lang];
}

/**
 * 主计算函数
 *
 * @param input 姓名与性别
 * @param lang  展示语言（默认 zh）。结构化结果文案按此解析；
 *              笔画、姓名汉字、levelKey 不随语言变化。
 */
export function calculateWuge(input: WugeInput, lang: Lang = "zh"): WugeResult {
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
  const tian = buildGe(tianStrokes, lang, getTianFullDesc);
  const ren = buildGe(renStrokes, lang, getRenFullDesc);
  const di = buildGe(diStrokes, lang, getDiFullDesc);
  const wai = buildGe(waiStrokes, lang, getWaiFullDesc);
  const zong = buildGe(zongStrokes, lang, getZongFullDesc);

  // 三才分析
  const { config: sanCai, desc: sanCaiDesc } = analyzeSanCai(tianStrokes, renStrokes, diStrokes, lang);

  // 综合分数
  const score = calcOverallScore(tian, ren, di, wai, zong);
  const scoreLevel = getScoreLevel(score, lang);

  // 特殊标签
  const specialTags = getSpecialTags(renStrokes, zongStrokes, diStrokes, lang);

  // 各维度描述
  const personality = getPersonalityDesc(renStrokes, gender, lang);
  const career = getCareerDesc(renStrokes, zongStrokes, lang);
  const love = getLoveDesc(renStrokes, diStrokes, gender, lang);
  const health = getHealthDesc(tianStrokes, renStrokes, lang);

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
