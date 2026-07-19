// 塔罗牌详情页内容类型（78 张牌，中英双语；繁体回退用 zh）
export interface CardFaq {
  q: string;
  a: string;
}

/** 正位/逆位的分领域解读 */
export interface CardAspects {
  general: string[]; // 1–2 段综合解读
  love: string;      // 爱情
  career: string;    // 事业
  finance: string;   // 财运
}

export interface CardMeaningLocale {
  metaTitle: string;  // 60 字符以内，含核心关键词
  metaDesc: string;   // 150 字符以内
  overview: string[]; // 2 段概述（牌面意象 + 核心能量）
  upright: CardAspects;
  reversed: CardAspects;
  advice: string;     // 牌给你的建议（1 段）
  faq: CardFaq[];     // 3 条
}

export interface CardMeaning {
  slug: string; // 与 src/app/tarot-data.ts 中英文名派生一致，如 "the-fool"
  zh: CardMeaningLocale;
  en: CardMeaningLocale;
}
