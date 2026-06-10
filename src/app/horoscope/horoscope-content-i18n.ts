// ===== 星座运势 · 内容三语覆盖层 =====
// 设计：附加式覆盖 + 中文兜底。
// - 引擎按 lang 查这里的译文；查不到就回退原中文 → 翻一半也能正常运行、永不破坏构建。
// - 短内容（幸运色/方位/物品、建议、摘要）在此全量翻译。
// - 长运势文案（FORTUNE_TEMPLATES_I18N）与标题（FORTUNE_TITLES_I18N）为覆盖表，
//   结构镜像 horoscope-data.ts，按相同索引取用；可分批填充，未填部分自动回退中文。

import type { ZodiacId, TimePeriod } from "./horoscope-data";
import { EN_TEMPLATES_1, TW_TEMPLATES_1, EN_TITLES_1, TW_TITLES_1 } from "./horoscope-fill-1";
import { EN_TEMPLATES_2, TW_TEMPLATES_2, EN_TITLES_2, TW_TITLES_2 } from "./horoscope-fill-2";
import { EN_TEMPLATES_3, TW_TEMPLATES_3, EN_TITLES_3, TW_TITLES_3 } from "./horoscope-fill-3";
import { EN_TEMPLATES_4, TW_TEMPLATES_4, EN_TITLES_4, TW_TITLES_4 } from "./horoscope-fill-4";
import { EN_TEMPLATES_5, TW_TEMPLATES_5, EN_TITLES_5, TW_TITLES_5 } from "./horoscope-fill-5";
import { EN_TEMPLATES_6, TW_TEMPLATES_6, EN_TITLES_6, TW_TITLES_6 } from "./horoscope-fill-6";

export type Lang = "zh" | "en" | "tw";
export type ContentLang = "en" | "tw";

// ─── 幸运色（与引擎 LUCKY_COLORS 同序，18 项）───
export const LUCKY_COLORS_I18N: Record<ContentLang, readonly string[]> = {
  en: [
    "Red", "Orange", "Gold", "Yellow", "Green", "Cyan",
    "Blue", "Purple", "Pink", "White", "Silver", "Brown",
    "Wine Red", "Coral", "Mint Green", "Lavender", "Peach Pink", "Sky Blue",
  ],
  tw: [
    "紅色", "橙色", "金色", "黃色", "綠色", "青色",
    "藍色", "紫色", "粉色", "白色", "銀色", "棕色",
    "酒紅", "珊瑚色", "薄荷綠", "薰衣草紫", "蜜桃粉", "天空藍",
  ],
};

// ─── 幸运方向（与引擎 LUCKY_DIRECTIONS 同序，8 项）───
export const LUCKY_DIRECTIONS_I18N: Record<ContentLang, readonly string[]> = {
  en: [
    "East", "South", "West", "North",
    "Southeast", "Northeast", "Southwest", "Northwest",
  ],
  tw: [
    "東方", "南方", "西方", "北方",
    "東南方", "東北方", "西南方", "西北方",
  ],
};

// ─── 幸运物品（与引擎 LUCKY_ITEMS 同序，16 项）───
export const LUCKY_ITEMS_I18N: Record<ContentLang, readonly string[]> = {
  en: [
    "Crystal bracelet", "Four-leaf clover charm", "Scented candle", "A bouquet of flowers",
    "Lucky coin", "Zodiac pendant", "Colorful silk scarf", "Natural stone",
    "Small potted plant", "Wind chime", "Wishing bottle", "Handmade bookmark",
    "Essential oil", "Music box", "Hourglass", "Keychain",
  ],
  tw: [
    "水晶手鍊", "四葉草掛件", "香氛蠟燭", "鮮花一束",
    "幸運硬幣", "星座吊墜", "彩色絲巾", "天然石頭",
    "小巧盆栽", "風鈴", "許願瓶", "手工書籤",
    "精油", "音樂盒", "沙漏", "鑰匙圈",
  ],
};

// ─── 建议库（与引擎 ADVICE_POOL 同序，每时段 8 项）───
export const ADVICE_POOL_I18N: Record<ContentLang, Record<TimePeriod, readonly string[]>> = {
  en: {
    today: [
      "Today is a good day to start small — little by little adds up.",
      "Keep smiling, and good luck will find you when you least expect it.",
      "Give yourself the time for a good cup of tea, and calmly think about your next step.",
      "Today's keyword is \"focus\" — doing one thing well beats dabbling in many.",
      "Rather than worrying about the future, make today wonderful.",
      "Try to say one extra warm word to the people around you.",
      "You deserve to be treated gently today — and to be gentle with yourself too.",
      "If you feel lost, start with the one thing you're most certain about.",
    ],
    tomorrow: [
      "Plan ahead for tomorrow, but don't obsess over making it perfect.",
      "Rest early tonight so you can greet the new day at your best.",
      "Tomorrow is a fresh start — let yesterday's regrets stay in yesterday.",
      "Schedule the important things for when your energy is at its peak.",
      "Tomorrow is good for taking the first step, even a small one.",
      "Trust your judgment — your intuition is sharper than you think.",
      "Try one small thing tomorrow that you've never done before.",
      "Give yourself a smile — you've already done very well.",
    ],
    week: [
      "Pacing matters this week — avoid front-loading or back-loading your effort.",
      "Finish your core tasks before the weekend, and give yourself a relaxing break.",
      "This week is a process of quantity becoming quality — persistence is victory.",
      "Leave yourself some \"thinking time\" — don't let tasks push you around.",
      "Social interactions this week may bring unexpected rewards — connect more.",
      "Break big goals into small daily tasks and advance steadily.",
      "This week suits reflection and planning — adjust your direction, then set off again.",
      "Keep your plans flexible, and let pleasant surprises happen.",
    ],
    month: [
      "This month's theme is \"accumulate and break through\" — build up first, then push.",
      "Set a small goal for the month; the sense of achievement will surprise you.",
      "This month is good for building a habit — 21 days is just one cycle.",
      "When you look back at month's end, you'll thank the self who chose to change early on.",
      "The key this month is keeping your rhythm and not letting the outside world disrupt your pace.",
      "This month suits decluttering — objects, relationships, or mindset — travel light.",
      "Seize the key turning points mid-month; many important shifts happen then.",
      "Give yourself a little more patience this month — good things take time to brew.",
    ],
  },
  tw: {
    today: [
      "今天適合從小事做起，積少成多。",
      "保持微笑，好運會不期而至。",
      "給自己一杯好茶的時間，靜心思考下一步。",
      "今天的關鍵詞是「專注」，做好一件事勝過淺嚐輒止。",
      "與其擔心未來，不如把今天過得精彩。",
      "試著對身邊的人多說一句溫暖的話。",
      "今天的你值得被溫柔以待，也要溫柔待自己。",
      "如果感到迷茫，就先做最確定的那件事。",
    ],
    tomorrow: [
      "為明天做好規劃，但不必執著於完美。",
      "今晚早點休息，以最佳狀態迎接新的一天。",
      "明天是新的開始，昨天的遺憾就讓它留在昨天。",
      "把重要的事安排在精力最充沛的時段。",
      "明天適合邁出第一步，哪怕步子小一點。",
      "相信自己的判斷，你的直覺比想像中更準。",
      "明天不妨嘗試一件從未做過的小事。",
      "給自己一個微笑，你已經做得很好了。",
    ],
    week: [
      "本週的節奏感很重要，不要前緊後鬆或前鬆後緊。",
      "週末前完成核心任務，給自己一個輕鬆的週末。",
      "這週是量變到質變的過程，堅持就是勝利。",
      "給自己留出「思考時間」，不要被事務推著走。",
      "本週的人際互動會帶來意想不到的收穫，多交流。",
      "把大目標拆分成每天的小任務，穩步推進。",
      "這週適合回顧與展望，調整方向再出發。",
      "保持彈性計畫，允許美好意外發生。",
    ],
    month: [
      "本月的主題是「積累與突破」，前半程蓄力，後半程發力。",
      "給自己設一個本月的小目標，完成後的成就感會超乎想像。",
      "本月適合培養一個好習慣，21 天剛好一個週期。",
      "月底回顧時，你會感謝月初做出改變的自己。",
      "這個月的關鍵是保持節奏，不被外界打亂自己的步調。",
      "本月適合清理——無論是物品、關係還是心態，輕裝前行。",
      "把握月中的關鍵節點，很多重要轉折往往發生在月中。",
      "本月給自己多一點的耐心，好事需要時間來醞釀。",
    ],
  },
};

// ─── 摘要（period 标签 + 5 档总分短语）───
export const SUMMARY_I18N: Record<ContentLang, { periodLabel: Record<TimePeriod, string>; tiers: [string, string, string, string, string] }> = {
  // tiers 顺序对应总分 >=5 / >=4 / >=3 / >=2 / 其它，{label} 处插入 periodLabel
  en: {
    periodLabel: { today: "Today", tomorrow: "Tomorrow", week: "This week", month: "This month" },
    tiers: [
      "{label}'s fortune is off the charts — everything is favorable!",
      "{label}'s fortune is excellent — make the most of the opportunities.",
      "{label}'s fortune is steady — a good time to play it solid.",
      "{label}'s fortune is on the lower side — stay low-key and gather strength.",
      "{label} calls for extra care — keep a calm and steady mind.",
    ],
  },
  tw: {
    periodLabel: { today: "今日", tomorrow: "明日", week: "本週", month: "本月" },
    tiers: [
      "{label}運勢爆棚，萬事皆宜！",
      "{label}運勢上佳，好好把握機遇。",
      "{label}運勢平穩，適合穩紮穩打。",
      "{label}運勢偏低，低調蓄力為宜。",
      "{label}需要多加注意，保持平和心態。",
    ],
  },
};

// ─── 长运势文案覆盖表（镜像 FORTUNE_TEMPLATES[sign][period] = string[][]）───
// 每个 set = [overall, love, career, wealth, health]，与中文同序、同套数。
// 分批填充；未填的 sign/period/set 自动回退中文。
export const FORTUNE_TEMPLATES_I18N: Partial<Record<ContentLang, Partial<Record<ZodiacId, Partial<Record<TimePeriod, string[][]>>>>>> = {
  en: { ...EN_TEMPLATES_1, ...EN_TEMPLATES_2, ...EN_TEMPLATES_3, ...EN_TEMPLATES_4, ...EN_TEMPLATES_5, ...EN_TEMPLATES_6 },
  tw: { ...TW_TEMPLATES_1, ...TW_TEMPLATES_2, ...TW_TEMPLATES_3, ...TW_TEMPLATES_4, ...TW_TEMPLATES_5, ...TW_TEMPLATES_6 },
};

// ─── 标题覆盖表（镜像 FORTUNE_TITLES[sign][period] = string[]）───
export const FORTUNE_TITLES_I18N: Partial<Record<ContentLang, Partial<Record<ZodiacId, Partial<Record<TimePeriod, string[]>>>>>> = {
  en: { ...EN_TITLES_1, ...EN_TITLES_2, ...EN_TITLES_3, ...EN_TITLES_4, ...EN_TITLES_5, ...EN_TITLES_6 },
  tw: { ...TW_TITLES_1, ...TW_TITLES_2, ...TW_TITLES_3, ...TW_TITLES_4, ...TW_TITLES_5, ...TW_TITLES_6 },
};

// ===== 解析助手 =====

/** 取本地化幸运色数组（zh 由引擎传入兜底） */
export function luckyColorsFor(lang: Lang, zh: readonly string[]): readonly string[] {
  return lang === "zh" ? zh : LUCKY_COLORS_I18N[lang];
}
export function luckyDirectionsFor(lang: Lang, zh: readonly string[]): readonly string[] {
  return lang === "zh" ? zh : LUCKY_DIRECTIONS_I18N[lang];
}
export function luckyItemsFor(lang: Lang, zh: readonly string[]): readonly string[] {
  return lang === "zh" ? zh : LUCKY_ITEMS_I18N[lang];
}
export function advicePoolFor(lang: Lang, period: TimePeriod, zh: readonly string[]): readonly string[] {
  return lang === "zh" ? zh : ADVICE_POOL_I18N[lang][period];
}

/** 一句话摘要 */
export function buildSummary(lang: Lang, overallScore: number, period: TimePeriod, zhBuilder: (s: number, p: TimePeriod) => string): string {
  if (lang === "zh") return zhBuilder(overallScore, period);
  const conf = SUMMARY_I18N[lang];
  const label = conf.periodLabel[period];
  const tierIdx = overallScore >= 5 ? 0 : overallScore >= 4 ? 1 : overallScore >= 3 ? 2 : overallScore >= 2 ? 3 : 4;
  return conf.tiers[tierIdx]!.replace("{label}", label);
}

/** 取本地化运势文案 set（按相同索引；缺失回退中文 set） */
export function localizedFortuneSet(lang: Lang, zid: ZodiacId, period: TimePeriod, setIndex: number, zhSet: string[]): string[] {
  if (lang === "zh") return zhSet;
  const o = FORTUNE_TEMPLATES_I18N[lang]?.[zid]?.[period]?.[setIndex];
  return o ?? zhSet;
}

/** 取本地化标题（按相同索引；缺失回退中文标题） */
export function localizedTitle(lang: Lang, zid: ZodiacId, period: TimePeriod, idx: number, zhTitle: string): string {
  if (lang === "zh") return zhTitle;
  return FORTUNE_TITLES_I18N[lang]?.[zid]?.[period]?.[idx] ?? zhTitle;
}
