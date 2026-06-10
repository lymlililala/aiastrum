// ===== 云端灵签 · MISC 内容填充（en + tw）=====
// 填充：神明描述（DEITY）、吉凶等级（LUCK_LEVEL）、等级 label（LUCK_LABEL）、
//      掷筊结果（JIAO_DESC）、每日禅语（ZEN_QUOTES）。
// 键集严格对齐 lingqian-data.ts 的源数据 / 中文键，类型来自脚手架 lingqian-content-i18n.ts。

import type { DeityContentOverride } from "./lingqian-content-i18n";

// ─── 神明描述：key = deity.id ───
export const DEITY_EN: Record<string, DeityContentOverride> = {
  guanyin: {
    name: "Guanyin Bodhisattva",
    fullName: "Namo Bodhisattva Avalokiteshvara of Great Mercy and Compassion",
    desc: "Compassionate at heart, she delivers all beings, watches over the faithful for peace and fulfillment, and answers every sincere prayer.",
  },
  huangdaxian: {
    name: "Wong Tai Sin",
    fullName: "Master Wong Tai Sin of Red Pine",
    desc: "Answering every prayer, he protects the devout, brings wide relief to the people, lights the way through confusion, and grants boundless blessing.",
  },
};

export const DEITY_TW: Record<string, DeityContentOverride> = {
  guanyin: {
    name: "觀音菩薩",
    fullName: "南無大慈大悲觀世音菩薩",
    desc: "慈悲為懷，普度眾生，保佑信眾平安如意，有求必應。",
  },
  huangdaxian: {
    name: "黃大仙",
    fullName: "赤松黃大仙師",
    desc: "有求必應，保佑善信，廣濟蒼生，指點迷津，福澤無邊。",
  },
};

// ─── 吉凶等級顯示文本：key = LuckLevel（中文）───
export const LUCK_LEVEL_EN: Record<string, string> = {
  上上: "Great Fortune",
  上吉: "Auspicious",
  中吉: "Good Fortune",
  中平: "Neutral",
  下下: "Caution",
};

export const LUCK_LEVEL_TW: Record<string, string> = {
  上上: "上上",
  上吉: "上吉",
  中吉: "中吉",
  中平: "中平",
  下下: "下下",
};

// ─── 等級 label：key = LuckLevel（中文），值對應 LUCK_COLORS.label ───
export const LUCK_LABEL_EN: Record<string, string> = {
  上上: "Highly Auspicious",
  上吉: "Blessed",
  中吉: "Smooth",
  中平: "Steady",
  下下: "Be Cautious",
};

export const LUCK_LABEL_TW: Record<string, string> = {
  上上: "大吉",
  上吉: "吉祥",
  中吉: "平順",
  中平: "平穩",
  下下: "謹慎",
};

// ─── 掷筊结果描述：key = JiaoResult（中文）───
export const JIAO_DESC_EN: Record<string, string> = {
  圣杯: "Sacred cup (yin-yang)! The deity grants your request — the sign holds true.",
  笑杯: "Laughing cup (both yang) — the deity smiles; cast once more.",
  阴杯: "Yin cup (both yin) — the deity stays silent; try again.",
};

export const JIAO_DESC_TW: Record<string, string> = {
  圣杯: "聖杯！神明允諾，籤文應驗！",
  笑杯: "笑杯，神明在微笑，再擲一次。",
  阴杯: "陰杯，神明沉默，再試一次。",
};

// ─── 每日禅语（按相同索引；与 ZEN_QUOTES 同序、同长度 = 12）───
export const ZEN_QUOTES_EN: string[] = [
  "Seek not without; everything lies within the heart.",
  "Let go of attachment, and you can embrace far more.",
  "Every encounter is written in destiny.",
  "When the heart turns to the sun, no place is left cold.",
  "Let all things take their natural course — the best arrangement will come.",
  "This very moment is the finest of times.",
  "Release a single thought, and a thousand freedoms open.",
  "Life is impermanent; only the present is real.",
  "Cultivating the heart is itself the practice — a lotus blooms with every step.",
  "A calm heart cools the heat; a broad heart widens the world.",
  "Treat yourself well, and only then can you treat others well.",
  "Each day is a fresh beginning; each moment, a new opportunity.",
];

export const ZEN_QUOTES_TW: string[] = [
  "莫向外求，一切皆在內心。",
  "放下執念，才能擁抱更多。",
  "每一次相遇，都是命中注定。",
  "心若向陽，無處不溫暖。",
  "凡事順其自然，終有最好安排。",
  "當下即是最好的時光。",
  "一念放下，萬般自在。",
  "人生無常，唯有當下是真實。",
  "修心如修行，一步一蓮花。",
  "心靜自然涼，心寬天地廣。",
  "善待自己，方能善待他人。",
  "每天都是新的開始，每刻都是新的機緣。",
];
