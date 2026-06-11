/**
 * 姻缘占卜 - 核心数据库
 * 星座、五行、巴纳姆效应文案、姻缘模板
 *
 * 本地化策略：
 * - 所有面向用户展示的文案均存为 { zh, en, tw } 三语对象。
 * - 引擎在构建报告时按 lang 解析为纯字符串，LoveReport 的字段类型保持 string / string[] 不变。
 * - 用于查表的「键」（星座五行 火/土/风/水、天干地支汉字）保持中文不变，仅本地化展示。
 */

// ===== 语言与本地化基础类型 =====
export type Lang = "zh" | "en" | "tw";

/** 单条三语字符串 */
export type L = { zh: string; en: string; tw: string };
/** 三语字符串数组 */
export type LArr = { zh: string[]; en: string[]; tw: string[] };

/** 解析单条三语字符串 */
export function rs(v: L, lang: Lang): string {
  return v[lang];
}
/** 解析三语字符串数组 */
export function ra(v: LArr, lang: Lang): string[] {
  return v[lang];
}

// ===== 星座数据 =====
/** 原始（含三语）星座数据 */
export interface RawZodiacSign {
  name: L;
  nameEn: string;
  symbol: string;
  element: "火" | "土" | "风" | "水"; // 查表用键，保持中文
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  ruling: L; // 主星
  traits: LArr; // 性格特质
  loveStyle: L; // 恋爱风格
}

/** 解析后的星座数据（面向组件，纯字符串） */
export interface ZodiacSign {
  name: string;
  nameEn: string;
  symbol: string;
  element: "火" | "土" | "风" | "水";
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  ruling: string;
  traits: string[];
  loveStyle: string;
}

export const ZODIAC_SIGNS: RawZodiacSign[] = [
  {
    name: { zh: "白羊座", en: "Aries", tw: "牡羊座" }, nameEn: "Aries", symbol: "♈",
    element: "火", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19,
    ruling: { zh: "火星", en: "Mars", tw: "火星" },
    traits: {
      zh: ["热情主动", "勇于表达", "直率真诚", "追求刺激"],
      en: ["Passionate & proactive", "Bold in expression", "Frank & sincere", "Thrill-seeking"],
      tw: ["熱情主動", "勇於表達", "直率真誠", "追求刺激"],
    },
    loveStyle: {
      zh: "你爱得直接且热烈，习惯主动出击，但也需要伴侣的正向回应来维持热情。",
      en: "You love directly and ardently, used to making the first move, yet you need your partner's positive response to keep the fire alive.",
      tw: "你愛得直接且熱烈，習慣主動出擊，但也需要伴侶的正向回應來維持熱情。",
    },
  },
  {
    name: { zh: "金牛座", en: "Taurus", tw: "金牛座" }, nameEn: "Taurus", symbol: "♉",
    element: "土", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20,
    ruling: { zh: "金星", en: "Venus", tw: "金星" },
    traits: {
      zh: ["忠诚专一", "踏实稳重", "感性细腻", "重视安全感"],
      en: ["Loyal & devoted", "Grounded & steady", "Tender & sensitive", "Values security"],
      tw: ["忠誠專一", "踏實穩重", "感性細膩", "重視安全感"],
    },
    loveStyle: {
      zh: "你爱得缓慢而深刻，一旦认定就全情投入，对于感情极度珍视，渴望长久稳定的关系。",
      en: "You love slowly but deeply; once you commit, you give your all. You cherish love dearly and long for a lasting, stable bond.",
      tw: "你愛得緩慢而深刻，一旦認定就全情投入，對於感情極度珍視，渴望長久穩定的關係。",
    },
  },
  {
    name: { zh: "双子座", en: "Gemini", tw: "雙子座" }, nameEn: "Gemini", symbol: "♊",
    element: "风", startMonth: 5, startDay: 21, endMonth: 6, endDay: 20,
    ruling: { zh: "水星", en: "Mercury", tw: "水星" },
    traits: {
      zh: ["聪慧机敏", "善于沟通", "多才多艺", "渴望新鲜"],
      en: ["Quick-witted", "Great communicator", "Versatile", "Craves novelty"],
      tw: ["聰慧機敏", "善於溝通", "多才多藝", "渴望新鮮"],
    },
    loveStyle: {
      zh: "你爱得充满好奇，需要在感情中保持智识上的刺激，伴侣要能与你的思维同频。",
      en: "You love with curiosity and need intellectual stimulation in a relationship — your partner must be on the same wavelength as your mind.",
      tw: "你愛得充滿好奇，需要在感情中保持智識上的刺激，伴侶要能與你的思維同頻。",
    },
  },
  {
    name: { zh: "巨蟹座", en: "Cancer", tw: "巨蟹座" }, nameEn: "Cancer", symbol: "♋",
    element: "水", startMonth: 6, startDay: 21, endMonth: 7, endDay: 22,
    ruling: { zh: "月亮", en: "the Moon", tw: "月亮" },
    traits: {
      zh: ["温柔体贴", "情感丰富", "保护欲强", "重视家庭"],
      en: ["Gentle & caring", "Emotionally rich", "Protective", "Family-oriented"],
      tw: ["溫柔體貼", "情感豐富", "保護欲強", "重視家庭"],
    },
    loveStyle: {
      zh: "你爱得深沉且包容，把爱人放在内心最柔软的地方，全力守护这份珍贵的缘分。",
      en: "You love deeply and tenderly, holding your beloved in the softest corner of your heart and guarding this precious bond with all you have.",
      tw: "你愛得深沉且包容，把愛人放在內心最柔軟的地方，全力守護這份珍貴的緣分。",
    },
  },
  {
    name: { zh: "狮子座", en: "Leo", tw: "獅子座" }, nameEn: "Leo", symbol: "♌",
    element: "火", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22,
    ruling: { zh: "太阳", en: "the Sun", tw: "太陽" },
    traits: {
      zh: ["自信热情", "慷慨大方", "忠诚护短", "渴望被爱"],
      en: ["Confident & warm", "Generous", "Loyal & protective", "Longs to be loved"],
      tw: ["自信熱情", "慷慨大方", "忠誠護短", "渴望被愛"],
    },
    loveStyle: {
      zh: "你爱得坦荡且高调，享受被伴侣宠爱与关注，同时也愿意将你的光芒毫无保留地给予对方。",
      en: "You love openly and proudly, savoring your partner's adoration and attention, while giving your radiance to them without reserve.",
      tw: "你愛得坦蕩且高調，享受被伴侶寵愛與關注，同時也願意將你的光芒毫無保留地給予對方。",
    },
  },
  {
    name: { zh: "处女座", en: "Virgo", tw: "處女座" }, nameEn: "Virgo", symbol: "♍",
    element: "土", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22,
    ruling: { zh: "水星", en: "Mercury", tw: "水星" },
    traits: {
      zh: ["细心体贴", "务实理性", "追求完美", "默默付出"],
      en: ["Attentive & caring", "Practical & rational", "Perfectionist", "Quietly devoted"],
      tw: ["細心體貼", "務實理性", "追求完美", "默默付出"],
    },
    loveStyle: {
      zh: "你爱得细腻而深刻，用行动而非语言表达爱意，总在不经意间为对方考虑到每一个细节。",
      en: "You love with subtlety and depth, expressing affection through actions rather than words, quietly attending to every detail for your partner.",
      tw: "你愛得細膩而深刻，用行動而非語言表達愛意，總在不經意間為對方考慮到每一個細節。",
    },
  },
  {
    name: { zh: "天秤座", en: "Libra", tw: "天秤座" }, nameEn: "Libra", symbol: "♎",
    element: "风", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22,
    ruling: { zh: "金星", en: "Venus", tw: "金星" },
    traits: {
      zh: ["优雅迷人", "善于平衡", "渴望和谐", "重视美感"],
      en: ["Elegant & charming", "Balancing", "Craves harmony", "Values beauty"],
      tw: ["優雅迷人", "善於平衡", "渴望和諧", "重視美感"],
    },
    loveStyle: {
      zh: "你爱得优雅且富有魅力，天生具有让人如沐春风的本领，在关系中追求平等与和谐。",
      en: "You love with grace and charm, with a natural gift for putting others at ease, seeking equality and harmony in a relationship.",
      tw: "你愛得優雅且富有魅力，天生具有讓人如沐春風的本領，在關係中追求平等與和諧。",
    },
  },
  {
    name: { zh: "天蝎座", en: "Scorpio", tw: "天蠍座" }, nameEn: "Scorpio", symbol: "♏",
    element: "水", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21,
    ruling: { zh: "冥王星", en: "Pluto", tw: "冥王星" },
    traits: {
      zh: ["深邃神秘", "专一执着", "洞察力强", "爱恨分明"],
      en: ["Deep & mysterious", "Devoted & intense", "Perceptive", "Clear in love & hate"],
      tw: ["深邃神秘", "專一執著", "洞察力強", "愛恨分明"],
    },
    loveStyle: {
      zh: "你爱得专一且深邃，一旦爱上便是灵魂的完全交付，渴望与伴侣建立不可动摇的深度连接。",
      en: "You love with devotion and depth; once you fall, you surrender your soul entirely, longing for an unshakable, profound bond with your partner.",
      tw: "你愛得專一且深邃，一旦愛上便是靈魂的完全交付，渴望與伴侶建立不可動搖的深度連接。",
    },
  },
  {
    name: { zh: "射手座", en: "Sagittarius", tw: "射手座" }, nameEn: "Sagittarius", symbol: "♐",
    element: "火", startMonth: 11, startDay: 22, endMonth: 12, endDay: 21,
    ruling: { zh: "木星", en: "Jupiter", tw: "木星" },
    traits: {
      zh: ["乐观开朗", "向往自由", "坦率直言", "博学多识"],
      en: ["Optimistic & sunny", "Freedom-loving", "Outspoken", "Well-read"],
      tw: ["樂觀開朗", "嚮往自由", "坦率直言", "博學多識"],
    },
    loveStyle: {
      zh: "你爱得自由且真诚，需要一个能与你共同探索世界、尊重彼此空间的灵魂伴侣。",
      en: "You love freely and sincerely, needing a soulmate who explores the world with you while respecting each other's space.",
      tw: "你愛得自由且真誠，需要一個能與你共同探索世界、尊重彼此空間的靈魂伴侶。",
    },
  },
  {
    name: { zh: "摩羯座", en: "Capricorn", tw: "摩羯座" }, nameEn: "Capricorn", symbol: "♑",
    element: "土", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19,
    ruling: { zh: "土星", en: "Saturn", tw: "土星" },
    traits: {
      zh: ["沉稳内敛", "责任心强", "踏实可靠", "目标明确"],
      en: ["Steady & reserved", "Responsible", "Dependable", "Goal-driven"],
      tw: ["沉穩內斂", "責任心強", "踏實可靠", "目標明確"],
    },
    loveStyle: {
      zh: "你爱得沉稳且有责任感，用实际行动证明你的心意，是那种会为爱情默默付出、始终如一的人。",
      en: "You love with steadiness and responsibility, proving your heart through deeds — the kind who gives to love quietly and stays constant.",
      tw: "你愛得沉穩且有責任感，用實際行動證明你的心意，是那種會為愛情默默付出、始終如一的人。",
    },
  },
  {
    name: { zh: "水瓶座", en: "Aquarius", tw: "水瓶座" }, nameEn: "Aquarius", symbol: "♒",
    element: "风", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18,
    ruling: { zh: "天王星", en: "Uranus", tw: "天王星" },
    traits: {
      zh: ["独立创新", "人道主义", "思维超前", "重视友谊"],
      en: ["Independent & inventive", "Humanitarian", "Forward-thinking", "Values friendship"],
      tw: ["獨立創新", "人道主義", "思維超前", "重視友誼"],
    },
    loveStyle: {
      zh: "你爱得独特且深刻，渴望与伴侣在精神层面高度契合，在爱情中保有独立自我而非失去自己。",
      en: "You love in a unique, profound way, longing for deep spiritual resonance with your partner while keeping your independent self rather than losing it.",
      tw: "你愛得獨特且深刻，渴望與伴侶在精神層面高度契合，在愛情中保有獨立自我而非失去自己。",
    },
  },
  {
    name: { zh: "双鱼座", en: "Pisces", tw: "雙魚座" }, nameEn: "Pisces", symbol: "♓",
    element: "水", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20,
    ruling: { zh: "海王星", en: "Neptune", tw: "海王星" },
    traits: {
      zh: ["浪漫感性", "富有同情心", "直觉敏锐", "梦想主义"],
      en: ["Romantic & sensitive", "Compassionate", "Intuitive", "Dreamy idealist"],
      tw: ["浪漫感性", "富有同情心", "直覺敏銳", "夢想主義"],
    },
    loveStyle: {
      zh: "你爱得纯粹且浪漫，拥有天生的共情能力，能感受到伴侣内心最细微的情绪波动。",
      en: "You love purely and romantically, with a natural gift for empathy, sensing even the subtlest ripples in your partner's heart.",
      tw: "你愛得純粹且浪漫，擁有天生的共情能力，能感受到伴侶內心最細微的情緒波動。",
    },
  },
];

/** 根据生日获取星座（原始三语数据） */
export function getZodiacSignRaw(month: number, day: number): RawZodiacSign {
  return (
    ZODIAC_SIGNS.find(z => {
      if (z.startMonth === z.endMonth) {
        return month === z.startMonth && day >= z.startDay && day <= z.endDay;
      }
      if (month === z.startMonth) return day >= z.startDay;
      if (month === z.endMonth) return day <= z.endDay;
      return false;
    }) ?? ZODIAC_SIGNS[11]!
  );
}

/** 将原始星座数据解析为纯字符串（按 lang） */
export function resolveZodiac(raw: RawZodiacSign, lang: Lang): ZodiacSign {
  return {
    name: rs(raw.name, lang),
    nameEn: raw.nameEn,
    symbol: raw.symbol,
    element: raw.element,
    startMonth: raw.startMonth,
    startDay: raw.startDay,
    endMonth: raw.endMonth,
    endDay: raw.endDay,
    ruling: rs(raw.ruling, lang),
    traits: ra(raw.traits, lang),
    loveStyle: rs(raw.loveStyle, lang),
  };
}

// ===== 天干地支 & 五行 =====
export const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"] as const;
export const DI_ZHI  = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"] as const;

export const GAN_WUXING: Record<string, string> = {
  甲: "木", 乙: "木", 丙: "火", 丁: "火", 戊: "土",
  己: "土", 庚: "金", 辛: "金", 壬: "水", 癸: "水",
};

export const ZHI_WUXING: Record<string, string> = {
  子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火",
  午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水",
};

// 天干地支拉丁化（en 显示用；zh/tw 仍用汉字）
const GAN_PINYIN: Record<string, string> = {
  甲: "Jiǎ", 乙: "Yǐ", 丙: "Bǐng", 丁: "Dīng", 戊: "Wù",
  己: "Jǐ", 庚: "Gēng", 辛: "Xīn", 壬: "Rén", 癸: "Guǐ",
};
const ZHI_PINYIN: Record<string, string> = {
  子: "Zǐ", 丑: "Chǒu", 寅: "Yín", 卯: "Mǎo", 辰: "Chén", 巳: "Sì",
  午: "Wǔ", 未: "Wèi", 申: "Shēn", 酉: "Yǒu", 戌: "Xū", 亥: "Hài",
};

export function getYearGanzhi(year: number): { gan: string; zhi: string } {
  const ganIdx = ((year - 4) % 10 + 10) % 10;
  const zhiIdx = ((year - 4) % 12 + 12) % 12;
  return { gan: TIAN_GAN[ganIdx]!, zhi: DI_ZHI[zhiIdx]! };
}

/** 解析天干地支显示（zh/tw 用汉字，en 用拼音） */
export function resolveGanzhiDisplay(
  gz: { gan: string; zhi: string },
  lang: Lang,
): { gan: string; zhi: string } {
  if (lang === "en") {
    return { gan: GAN_PINYIN[gz.gan] ?? gz.gan, zhi: ZHI_PINYIN[gz.zhi] ?? gz.zhi };
  }
  return { gan: gz.gan, zhi: gz.zhi };
}

// ===== 月份名称（三语） =====
export const MONTH_NAMES: Record<Lang, string[]> = {
  // 索引 0 占位，1-12 为各月
  zh: ["", "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  tw: ["", "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  en: ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

// ===== 季节文案（三语） =====
export const SEASON_TEXTS: LArr = {
  zh: ["春末夏初", "夏日", "秋高气爽", "岁末年初"],
  en: ["late spring to early summer", "summer", "the crisp days of autumn", "the turn of the year"],
  tw: ["春末夏初", "夏日", "秋高氣爽", "歲末年初"],
};

// ===== 加载文案（三语） =====
export const LOVE_LOADING_TEXTS: LArr = {
  zh: [
    "正在解析您的星盘相位…",
    "计算金星与火星的角度…",
    "寻找命中注定的磁场频率…",
    "分析您的姻缘宫位走向…",
    "解读紫微斗数桃花星…",
    "感应月亮对您情感的影响…",
    "匹配您的命定之人特征…",
    "报告即将生成，请稍候…",
  ],
  en: [
    "Reading your chart's aspects…",
    "Calculating the angle between Venus and Mars…",
    "Searching for your destined magnetic frequency…",
    "Analyzing the trend of your marriage palace…",
    "Decoding the romance stars of Zi Wei astrology…",
    "Sensing the Moon's influence on your emotions…",
    "Matching the traits of your destined one…",
    "Your report is almost ready, please wait…",
  ],
  tw: [
    "正在解析您的星盤相位…",
    "計算金星與火星的角度…",
    "尋找命中注定的磁場頻率…",
    "分析您的姻緣宮位走向…",
    "解讀紫微斗數桃花星…",
    "感應月亮對您情感的影響…",
    "匹配您的命定之人特徵…",
    "報告即將生成，請稍候…",
  ],
};

// ===== 信任背书滚动文案（三语） =====
export interface RawTrustReview { name: L; time: L; text: L; }
export interface TrustReview { name: string; time: string; text: string; }

export const TRUST_REVIEWS: RawTrustReview[] = [
  {
    name: { zh: "林**", en: "L**", tw: "林**" },
    time: { zh: "刚刚", en: "just now", tw: "剛剛" },
    text: {
      zh: "太准了！感觉说的就是我，连遇见的场景都描述得很像！",
      en: "So accurate! It felt like it was describing me — even the scene where I'd meet someone felt spot on!",
      tw: "太準了！感覺說的就是我，連遇見的場景都描述得很像！",
    },
  },
  {
    name: { zh: "张**", en: "Z**", tw: "張**" },
    time: { zh: "2分钟前", en: "2 min ago", tw: "2分鐘前" },
    text: {
      zh: "没想到这么细致，正缘画像真的让我心动了一下…",
      en: "I didn't expect such detail — the soulmate portrait genuinely made my heart skip a beat…",
      tw: "沒想到這麼細緻，正緣畫像真的讓我心動了一下…",
    },
  },
  {
    name: { zh: "陈**", en: "C**", tw: "陳**" },
    time: { zh: "5分钟前", en: "5 min ago", tw: "5分鐘前" },
    text: {
      zh: "一直觉得感情运不好，测完之后感觉开朗了很多，谢谢！",
      en: "I always felt unlucky in love, but after this reading I feel much lighter. Thank you!",
      tw: "一直覺得感情運不好，測完之後感覺開朗了很多，謝謝！",
    },
  },
  {
    name: { zh: "王**", en: "W**", tw: "王**" },
    time: { zh: "8分钟前", en: "8 min ago", tw: "8分鐘前" },
    text: {
      zh: "朋友推荐来的，确实比其他测试准多了，内容很有深度。",
      en: "A friend recommended it — it's far more accurate than other tests, and the content has real depth.",
      tw: "朋友推薦來的，確實比其他測試準多了，內容很有深度。",
    },
  },
  {
    name: { zh: "刘**", en: "Li**", tw: "劉**" },
    time: { zh: "12分钟前", en: "12 min ago", tw: "12分鐘前" },
    text: {
      zh: "报告里提到的相遇场景，和我最近的经历好像…仔细想想真的挺神奇的。",
      en: "The meeting scene in the report is so like something that just happened to me… the more I think about it, the more uncanny it feels.",
      tw: "報告裡提到的相遇場景，和我最近的經歷好像…仔細想想真的挺神奇的。",
    },
  },
  {
    name: { zh: "赵**", en: "Zh**", tw: "趙**" },
    time: { zh: "15分钟前", en: "15 min ago", tw: "15分鐘前" },
    text: {
      zh: "文笔很好，读起来有种被懂得的感觉，推荐！",
      en: "Beautifully written — reading it, I felt truly understood. Recommend!",
      tw: "文筆很好，讀起來有種被懂得的感覺，推薦！",
    },
  },
  {
    name: { zh: "孙**", en: "S**", tw: "孫**" },
    time: { zh: "20分钟前", en: "20 min ago", tw: "20分鐘前" },
    text: {
      zh: "花了9.9值回票价，分享给了我闺蜜，她也在测！",
      en: "Worth every penny — I shared it with my best friend and now she's doing it too!",
      tw: "花了9.9值回票價，分享給了我閨蜜，她也在測！",
    },
  },
  {
    name: { zh: "李**", en: "Lee**", tw: "李**" },
    time: { zh: "28分钟前", en: "28 min ago", tw: "28分鐘前" },
    text: {
      zh: "性格特质写的太像我了，分享到朋友圈大家都说准！",
      en: "The personality traits described me to a tee — I shared it and everyone said it was spot on!",
      tw: "性格特質寫的太像我了，分享到朋友圈大家都說準！",
    },
  },
];

/** 解析单条信任评论 */
export function resolveTrustReview(raw: RawTrustReview, lang: Lang): TrustReview {
  return { name: rs(raw.name, lang), time: rs(raw.time, lang), text: rs(raw.text, lang) };
}

// ===== 巴纳姆效应性格描述（通用但让人觉得精准），三语 =====
export const BARNUM_TRAITS: Record<string, LArr> = {
  female: {
    zh: [
      "你外表看起来平静温和，但内心世界其实比大多数人想象中更丰富、更敏感。你能感受到旁人感受不到的细腻情绪。",
      "你对感情有一种与生俱来的直觉，往往第一眼就能感受到某段关系是否值得深入，但有时你的理性又会压制这种直觉。",
      "你渴望一段真正的深度连接，而非表面的甜蜜。你不愿将就，但偶尔又会担心自己的标准是否太高。",
      "你在对的人面前会展现出意想不到的可爱与脆弱，但在不熟悉的人面前，你总是保持着一层隐形的距离。",
      "你对爱情有着属于自己的理解，既有少女般的浪漫幻想，也有成熟女性的清醒认知，两者在你身上共存着。",
    ],
    en: [
      "You appear calm and gentle on the surface, but your inner world is far richer and more sensitive than most people imagine. You feel subtle emotions others miss.",
      "You have an innate intuition about love, often sensing at first glance whether a relationship is worth pursuing — though sometimes your reason overrides that instinct.",
      "You long for a truly deep connection rather than surface-level sweetness. You refuse to settle, yet now and then you worry your standards may be too high.",
      "With the right person you reveal an unexpected tenderness and vulnerability, but with strangers you always keep an invisible distance.",
      "You hold your own understanding of love — a girlish romantic fantasy and a mature woman's clear-eyed awareness coexist within you.",
    ],
    tw: [
      "你外表看起來平靜溫和，但內心世界其實比大多數人想像中更豐富、更敏感。你能感受到旁人感受不到的細膩情緒。",
      "你對感情有一種與生俱來的直覺，往往第一眼就能感受到某段關係是否值得深入，但有時你的理性又會壓制這種直覺。",
      "你渴望一段真正的深度連接，而非表面的甜蜜。你不願將就，但偶爾又會擔心自己的標準是否太高。",
      "你在對的人面前會展現出意想不到的可愛與脆弱，但在不熟悉的人面前，你總是保持著一層隱形的距離。",
      "你對愛情有著屬於自己的理解，既有少女般的浪漫幻想，也有成熟女性的清醒認知，兩者在你身上共存著。",
    ],
  },
  male: {
    zh: [
      "你在感情中习惯用行动而非语言表达，外表冷静的你内心深处对感情其实比大多数人更在意。",
      "你在爱情方面有时会显得犹豫，这不是因为你不在乎，而是因为你非常清楚自己在选择什么，不愿草率。",
      "你渴望一段能给你内心安定感的关系，希望找到一个懂你沉默的人，无需太多解释便能被理解。",
      "你对感情忠诚而专一，一旦认定了便很难轻易改变，这是你的优点，有时也会让你承受更多。",
      "你内心藏着一些对爱情的期待，但你很少说出口，因为你觉得真正对的人会自然感受到。",
    ],
    en: [
      "In love you tend to express yourself through actions rather than words; calm on the outside, you actually care about relationships more deeply than most.",
      "You can seem hesitant in love — not because you don't care, but because you know exactly what you're choosing and refuse to be careless about it.",
      "You long for a relationship that brings you inner peace, hoping to find someone who understands your silences and needs no lengthy explanations.",
      "You are loyal and devoted in love; once you commit, you rarely waver. It's a strength, though at times it makes you bear more than your share.",
      "You hold quiet hopes about love, but you seldom voice them, believing the right person will naturally sense them.",
    ],
    tw: [
      "你在感情中習慣用行動而非語言表達，外表冷靜的你內心深處對感情其實比大多數人更在意。",
      "你在愛情方面有時會顯得猶豫，這不是因為你不在乎，而是因為你非常清楚自己在選擇什麼，不願草率。",
      "你渴望一段能給你內心安定感的關係，希望找到一個懂你沉默的人，無需太多解釋便能被理解。",
      "你對感情忠誠而專一，一旦認定了便很難輕易改變，這是你的優點，有時也會讓你承受更多。",
      "你內心藏著一些對愛情的期待，但你很少說出口，因為你覺得真正對的人會自然感受到。",
    ],
  },
};

// ===== 姻缘评分维度 =====
export interface LoveScore {
  overall: number;      // 综合姻缘指数 (0-100)
  peach:   number;      // 桃花指数 (0-5)
  timing:  number;      // 时机指数 (0-5)
  depth:   number;      // 深度缘分 (0-5)
  label:   string;      // 综合标签
  labelColor: string;
  shortComment: string; // 一句话短评（免费版展示）
}

// ===== 正缘画像 =====
export interface SoulmatePicture {
  appearance: string;   // 外貌特征
  personality: string;  // 性格倾向
  career: string;       // 可能职业
  meetScene: string;    // 相遇场景
  meetTiming: string;   // 相遇时机
}

// ===== 近期桃花运 =====
export interface PeachBlossomForecast {
  month1: string;  // 第1个月
  month2: string;  // 第2个月
  month3: string;  // 第3个月
  peak: string;    // 桃花旺盛期
  advice: string;  // 提升建议
}

// ===== 专属情感建议 =====
export interface LoveAdvice {
  strength: string;    // 感情优势
  weakness: string;    // 需要改善
  action: string;      // 行动建议
  affirmation: string; // 正向肯定语
}

// ===== 完整报告数据结构 =====
export interface LoveReport {
  // 用户信息
  name: string;
  gender: "female" | "male";
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  zodiac: ZodiacSign;
  yearGanzhi: { gan: string; zhi: string };
  // 评分（免费可见）
  score: LoveScore;
  // 性格特质（免费可见部分）
  personalityTrait: string;
  peachForecast: PeachBlossomForecast;
  soulmate: SoulmatePicture;
  loveAdvice: LoveAdvice;
  // AI 增强（可选）
  aiEnhanced?: string;
}

// ===== 评分标签配置（三语 label / comment） =====
export interface RawScoreLabel { min: number; label: L; color: string; comment: L; }

export const SCORE_LABELS: RawScoreLabel[] = [
  {
    min: 90, color: "#FF6B6B",
    label: { zh: "姻缘极旺", en: "Destiny Ablaze", tw: "姻緣極旺" },
    comment: {
      zh: "你的姻缘磁场正处于罕见的高峰期，命中正缘已在向你靠近的路上。",
      en: "Your love field is at a rare peak — your destined one is already on the way to you.",
      tw: "你的姻緣磁場正處於罕見的高峰期，命中正緣已在向你靠近的路上。",
    },
  },
  {
    min: 80, color: "#FF8E53",
    label: { zh: "桃花盛开", en: "Romance in Bloom", tw: "桃花盛開" },
    comment: {
      zh: "近期桃花运旺盛，有极大概率在意想不到的场合与命定之人相遇。",
      en: "Your romance luck is strong right now — there's a high chance you'll meet your destined one in an unexpected place.",
      tw: "近期桃花運旺盛，有極大概率在意想不到的場合與命定之人相遇。",
    },
  },
  {
    min: 70, color: "#C56BFF",
    label: { zh: "缘分涌动", en: "Fate Stirring", tw: "緣分湧動" },
    comment: {
      zh: "你的感情磁场已在微妙调整中，正缘的信号正在宇宙中集结。",
      en: "Your emotional field is subtly shifting, and the signals of true love are gathering across the cosmos.",
      tw: "你的感情磁場已在微妙調整中，正緣的信號正在宇宙中集結。",
    },
  },
  {
    min: 60, color: "#6B9DFF",
    label: { zh: "蓄势待发", en: "Quietly Building", tw: "蓄勢待發" },
    comment: {
      zh: "你的姻缘处于蓄积期，看似平静的水面下正酝酿着美好的相遇。",
      en: "Your love is in a gathering phase — beneath the calm surface, a beautiful encounter is brewing.",
      tw: "你的姻緣處於蓄積期，看似平靜的水面下正醞釀著美好的相遇。",
    },
  },
  {
    min: 0, color: "#8BC34A",
    label: { zh: "静待花开", en: "Awaiting Bloom", tw: "靜待花開" },
    comment: {
      zh: "此刻的你正在用沉淀来迎接更好的相遇，深根才能结出最美的果。",
      en: "Right now you are settling inward to welcome a better encounter — deep roots bear the loveliest fruit.",
      tw: "此刻的你正在用沉澱來迎接更好的相遇，深根才能結出最美的果。",
    },
  },
];

// ===== 正缘特征模板库（外貌，三语） =====
export const SOULMATE_APPEARANCE: Record<string, LArr> = {
  female_火: {
    zh: [
      "五官立体有轮廓感，目光炯炯有神，整体气质阳光且充满活力，笑起来特别有感染力。",
      "身材挺拔，眉宇间透着一股英气，脸上常带着自信的微笑，第一眼便让人印象深刻。",
    ],
    en: [
      "Defined, sculpted features and bright, spirited eyes; a sunny, energetic air overall, with an especially infectious smile.",
      "Tall and upright, with a dash of dashing spirit between the brows and a confident smile — striking at first glance.",
    ],
    tw: [
      "五官立體有輪廓感，目光炯炯有神，整體氣質陽光且充滿活力，笑起來特別有感染力。",
      "身材挺拔，眉宇間透著一股英氣，臉上常帶著自信的微笑，第一眼便讓人印象深刻。",
    ],
  },
  female_土: {
    zh: [
      "五官精致温润，眼神沉静而温柔，整体散发着成熟稳重的气质，让人感觉踏实可靠。",
      "相貌周正，身形稳健，眼神里有一种让人安心的力量，属于越看越耐看的类型。",
    ],
    en: [
      "Refined, gentle features and calm, tender eyes; a mature, steady air overall that feels dependable and reassuring.",
      "Well-proportioned looks and a sturdy build, with a reassuring strength in the eyes — the kind who grows on you the longer you look.",
    ],
    tw: [
      "五官精緻溫潤，眼神沉靜而溫柔，整體散發著成熟穩重的氣質，讓人感覺踏實可靠。",
      "相貌周正，身形穩健，眼神裡有一種讓人安心的力量，屬於越看越耐看的類型。",
    ],
  },
  female_风: {
    zh: [
      "五官清秀灵动，眼睛明亮有神，整体气质清爽俊逸，言谈举止间透着聪慧的光芒。",
      "外形修长利落，相貌清朗，笑容爽朗，属于让人如沐春风、越相处越有好感的类型。",
    ],
    en: [
      "Delicate, lively features and bright, clear eyes; a crisp, elegant air overall, with a glow of intelligence in every word and gesture.",
      "Slender and neat, with bright looks and a hearty smile — the kind who feels like a spring breeze and grows more likeable over time.",
    ],
    tw: [
      "五官清秀靈動，眼睛明亮有神，整體氣質清爽俊逸，言談舉止間透著聰慧的光芒。",
      "外形修長利落，相貌清朗，笑容爽朗，屬於讓人如沐春風、越相處越有好感的類型。",
    ],
  },
  female_水: {
    zh: [
      "五官柔和细腻，眼神深邃而温柔，整体散发着神秘而内敛的气质，让人忍不住想了解。",
      "气质沉静如水，外表温文尔雅，笑起来有一种安抚人心的力量，让你感到前所未有的安全感。",
    ],
    en: [
      "Soft, delicate features and deep, tender eyes; a mysterious, reserved air overall that makes you want to know them.",
      "Calm as still water, gentle and refined in appearance, with a soothing smile that gives you a sense of safety you've never felt before.",
    ],
    tw: [
      "五官柔和細膩，眼神深邃而溫柔，整體散發著神秘而內斂的氣質，讓人忍不住想了解。",
      "氣質沉靜如水，外表溫文爾雅，笑起來有一種安撫人心的力量，讓你感到前所未有的安全感。",
    ],
  },
  male_火: {
    zh: [
      "五官精致秀美，眼神清澈明亮，笑起来温柔甜美，整体气质清新而有亲和力。",
      "相貌甜美动人，眉眼间透着温柔，整体散发着令人心生好感的清甜气质。",
    ],
    en: [
      "Delicate, pretty features and clear, bright eyes; a gentle, sweet smile and a fresh, approachable air overall.",
      "Sweet, lovely looks with tenderness in the eyes and brows, radiating a fresh, endearing charm.",
    ],
    tw: [
      "五官精緻秀美，眼神清澈明亮，笑起來溫柔甜美，整體氣質清新而有親和力。",
      "相貌甜美動人，眉眼間透著溫柔，整體散發著令人心生好感的清甜氣質。",
    ],
  },
  male_土: {
    zh: [
      "五官端庄秀丽，气质知性沉稳，眼神温暖而有深度，属于越了解越有魅力的类型。",
      "外表温润大方，相貌耐看，举止从容优雅，散发着让人心生信赖的温柔力量。",
    ],
    en: [
      "Poised, graceful features and an intelligent, steady air; warm, deep eyes — the kind who grows more charming the better you know them.",
      "Gentle and gracious in appearance, with looks that wear well and composed, elegant manners radiating a trustworthy, tender strength.",
    ],
    tw: [
      "五官端莊秀麗，氣質知性沉穩，眼神溫暖而有深度，屬於越了解越有魅力的類型。",
      "外表溫潤大方，相貌耐看，舉止從容優雅，散發著讓人心生信賴的溫柔力量。",
    ],
  },
  male_风: {
    zh: [
      "五官灵动活泼，眼睛会说话，笑起来阳光明媚，整体气质活泼而有感染力。",
      "相貌清丽，性格开朗，言谈风趣，属于让人越相处越觉得快乐的暖心存在。",
    ],
    en: [
      "Lively, animated features and eyes that speak; a sunny, radiant smile and a vivacious, infectious air overall.",
      "Bright looks, a cheerful nature, and witty conversation — a warm presence who makes you happier the more time you spend together.",
    ],
    tw: [
      "五官靈動活潑，眼睛會說話，笑起來陽光明媚，整體氣質活潑而有感染力。",
      "相貌清麗，性格開朗，言談風趣，屬於讓人越相處越覺得快樂的暖心存在。",
    ],
  },
  male_水: {
    zh: [
      "五官秀气温柔，眼神如水般清澈，整体气质温婉细腻，有一种让人想靠近的柔和力量。",
      "外表清丽脱俗，气质安静内敛，笑容温婉，属于让你感到心灵被治愈的类型。",
    ],
    en: [
      "Fine, gentle features and eyes as clear as water; a soft, delicate air overall, with a tender pull that makes you want to draw close.",
      "Refined, ethereal looks and a quiet, reserved air, with a gentle smile — the kind who makes your soul feel healed.",
    ],
    tw: [
      "五官秀氣溫柔，眼神如水般清澈，整體氣質溫婉細膩，有一種讓人想靠近的柔和力量。",
      "外表清麗脫俗，氣質安靜內斂，笑容溫婉，屬於讓你感到心靈被治癒的類型。",
    ],
  },
};

export const SOULMATE_PERSONALITY: LArr = {
  zh: [
    "内心成熟稳定，情绪管理能力强，不会轻易将负面情绪带入关系中，相处起来让你感到轻松自在。",
    "有担当有责任感，会用实际行动表达爱意，而非仅仅停留在口头承诺，你在他/她身边会感到踏实。",
    "懂得欣赏你的独特性，不试图改变你，能在你低落时给予恰到好处的陪伴和支持。",
    "有自己的想法和生活重心，不会过度依赖，两个人保有独立的同时又能深度连接，这让你们的关系更健康。",
    "幽默感适中，能让日常生活充满轻松的笑声，又不失认真对待感情的一面。",
  ],
  en: [
    "Mature and emotionally stable, with strong self-regulation; they won't carry negativity into the relationship, making time together feel easy and relaxed.",
    "Accountable and responsible, expressing love through real actions rather than mere words — by their side you feel grounded.",
    "They appreciate your uniqueness without trying to change you, offering just the right companionship and support when you're low.",
    "They have their own ideas and life focus and won't be overly dependent; the two of you stay independent yet deeply connected, keeping the bond healthy.",
    "Their humor is well-judged, filling daily life with easy laughter while still taking the relationship seriously.",
  ],
  tw: [
    "內心成熟穩定，情緒管理能力強，不會輕易將負面情緒帶入關係中，相處起來讓你感到輕鬆自在。",
    "有擔當有責任感，會用實際行動表達愛意，而非僅僅停留在口頭承諾，你在他/她身邊會感到踏實。",
    "懂得欣賞你的獨特性，不試圖改變你，能在你低落時給予恰到好處的陪伴和支持。",
    "有自己的想法和生活重心，不會過度依賴，兩個人保有獨立的同時又能深度連接，這讓你們的關係更健康。",
    "幽默感適中，能讓日常生活充滿輕鬆的笑聲，又不失認真對待感情的一面。",
  ],
};

export const SOULMATE_CAREERS: LArr = {
  zh: [
    "文创/设计/艺术类", "教育/学术/研究类", "医疗/健康/公益类",
    "金融/商务/管理类", "技术/互联网/工程类", "传媒/公关/市场类",
    "法律/政府/咨询类", "旅游/文化/服务类",
  ],
  en: [
    "creative / design / arts", "education / academia / research", "healthcare / wellness / nonprofit",
    "finance / business / management", "tech / internet / engineering", "media / PR / marketing",
    "law / government / consulting", "travel / culture / hospitality",
  ],
  tw: [
    "文創/設計/藝術類", "教育/學術/研究類", "醫療/健康/公益類",
    "金融/商務/管理類", "技術/網路/工程類", "傳媒/公關/市場類",
    "法律/政府/諮詢類", "旅遊/文化/服務類",
  ],
};

/** 职业组合连接词（如「或」/"or"） */
export const CAREER_JOINER: Record<Lang, string> = { zh: "或", en: " or ", tw: "或" };

export const MEET_SCENES: LArr = {
  zh: [
    "在一个让你感到放松和开心的社交场合，可能是朋友聚会、兴趣小组或某个共同喜爱的活动现场。",
    "在你专注于某件自己热爱的事情时，对方恰好也在同一个空间，缘分就这样悄然而至。",
    "可能是通过共同朋友的引荐，在一次轻松愉快的饭局或聚会中初次相识，后来越走越近。",
    "在一个你意想不到的日常场景中——也许是书店、咖啡馆、运动场所或某个展览现场。",
    "在你旅行或尝试新事物的过程中，对方也恰好出现在那个特别的地方。",
  ],
  en: [
    "At a social occasion where you feel relaxed and happy — perhaps a friends' gathering, a hobby group, or an event you both love.",
    "While you're absorbed in something you're passionate about, they happen to be in the same space, and fate quietly arrives.",
    "Possibly through a mutual friend's introduction, first meeting at an easy, pleasant meal or party, then growing closer over time.",
    "In an everyday scene you'd never expect — maybe a bookshop, a café, a sports venue, or an exhibition.",
    "While you're traveling or trying something new, they happen to appear in that special place too.",
  ],
  tw: [
    "在一個讓你感到放鬆和開心的社交場合，可能是朋友聚會、興趣小組或某個共同喜愛的活動現場。",
    "在你專注於某件自己熱愛的事情時，對方恰好也在同一個空間，緣分就這樣悄然而至。",
    "可能是通過共同朋友的引薦，在一次輕鬆愉快的飯局或聚會中初次相識，後來越走越近。",
    "在一個你意想不到的日常場景中——也許是書店、咖啡館、運動場所或某個展覽現場。",
    "在你旅行或嘗試新事物的過程中，對方也恰好出現在那個特別的地方。",
  ],
};

// ===== 相遇时机模板（三语，含 {season}/{month} 占位） =====
export const MEET_TIMING_TEMPLATE: Record<Lang, (season: string, month: string) => string> = {
  zh: (season, month) =>
    `最有可能的相遇时机在${season}前后（约${month}前后），届时你的姻缘磁场将迎来一个小高峰，命运的安排往往就在这段时间悄然启动。`,
  tw: (season, month) =>
    `最有可能的相遇時機在${season}前後（約${month}前後），屆時你的姻緣磁場將迎來一個小高峰，命運的安排往往就在這段時間悄然啟動。`,
  en: (season, month) =>
    `The most likely time to meet is around ${season} (roughly ${month}), when your love field will reach a small peak — fate often sets things quietly in motion during this window.`,
};

// ===== 情感建议库（三语） =====
export const LOVE_STRENGTHS: LArr = {
  zh: [
    "你对感情真诚且投入，这是最难得的品质。真正适合你的人，一定会被你这份真诚深深打动。",
    "你拥有极强的共情能力，能感受到伴侣内心的需求，这让你在关系中成为那个让对方感到被懂得的人。",
    "你在感情中懂得付出，同时也在学习接受，这种平衡感正是维系长久关系的关键。",
  ],
  en: [
    "You are sincere and invested in love — the rarest of qualities. The person truly meant for you will be deeply moved by that sincerity.",
    "You have a powerful gift for empathy, sensing your partner's inner needs, which makes you the one who leaves them feeling truly understood.",
    "You know how to give in love while also learning to receive — and that balance is exactly what sustains a lasting relationship.",
  ],
  tw: [
    "你對感情真誠且投入，這是最難得的品質。真正適合你的人，一定會被你這份真誠深深打動。",
    "你擁有極強的共情能力，能感受到伴侶內心的需求，這讓你在關係中成為那個讓對方感到被懂得的人。",
    "你在感情中懂得付出，同時也在學習接受，這種平衡感正是維繫長久關係的關鍵。",
  ],
};

export const LOVE_WEAKNESSES: LArr = {
  zh: [
    "有时你对感情的期待过高，建议试着放下心中那个完美剧本，让真实的相遇以它本来的样子到来。",
    "你偶尔会因为害怕受伤而构筑起防线，真正的缘分需要你勇敢地打开心门，脆弱也是一种力量。",
    "你有时会在感情萌芽期想得太多，不妨放慢节奏，用心感受当下的每一次相处，而非急于定义关系。",
  ],
  en: [
    "Sometimes your expectations of love run too high; try setting aside the perfect script in your mind and letting a real encounter arrive as it is.",
    "Now and then you build walls out of fear of being hurt — but true connection asks you to open your heart bravely; vulnerability is its own kind of strength.",
    "At times you overthink in love's early days; slow down and truly feel each moment of being together rather than rushing to define the relationship.",
  ],
  tw: [
    "有時你對感情的期待過高，建議試著放下心中那個完美劇本，讓真實的相遇以它本來的樣子到來。",
    "你偶爾會因為害怕受傷而構築起防線，真正的緣分需要你勇敢地打開心門，脆弱也是一種力量。",
    "你有時會在感情萌芽期想得太多，不妨放慢節奏，用心感受當下的每一次相處，而非急於定義關係。",
  ],
};

export const LOVE_ACTIONS: LArr = {
  zh: [
    "接下来的两个月，尝试走进一个你平时不常涉足的社交圈，命中注定的相遇往往就隐藏在新的环境里。",
    "将注意力放在让自己快乐和充实的事情上——当你发光的时候，正确的人自然会被你吸引。",
    "试着对身边的一些可能性多一些开放的态度，有时候正缘并不是出现在戏剧性的瞬间，而是在不知不觉的相处中。",
  ],
  en: [
    "Over the next two months, step into a social circle you don't usually frequent — your destined encounter often hides in new surroundings.",
    "Put your focus on what makes you happy and fulfilled — when you shine, the right person is naturally drawn to you.",
    "Try staying a little more open to the possibilities around you; sometimes true love doesn't arrive in a dramatic instant but grows quietly through time spent together.",
  ],
  tw: [
    "接下來的兩個月，嘗試走進一個你平時不常涉足的社交圈，命中注定的相遇往往就隱藏在新的環境裡。",
    "將注意力放在讓自己快樂和充實的事情上——當你發光的時候，正確的人自然會被你吸引。",
    "試著對身邊的一些可能性多一些開放的態度，有時候正緣並不是出現在戲劇性的瞬間，而是在不知不覺的相處中。",
  ],
};

export const LOVE_AFFIRMATIONS: LArr = {
  zh: [
    "你值得被珍视，值得被深爱。你的正缘正在赶来的路上，而你此刻的等待，将在未来某天变成最美好的故事开端。",
    "宇宙正在为你安排最适合的相遇，时机未到不代表缘分未到。相信自己，相信爱，最美的风景永远在转角之后。",
    "你今天为自己做的每一个关于爱的功课，都是在向命定的相遇迈进一步。爱，正在向你奔赴。",
  ],
  en: [
    "You deserve to be cherished, to be deeply loved. Your true love is on the way, and the waiting you do now will one day become the opening of the most beautiful story.",
    "The universe is arranging the encounter most right for you; the moment not yet here doesn't mean the fate isn't. Trust yourself, trust love — the loveliest view is always just around the corner.",
    "Every lesson in love you do for yourself today is one step closer to your destined encounter. Love is rushing toward you.",
  ],
  tw: [
    "你值得被珍視，值得被深愛。你的正緣正在趕來的路上，而你此刻的等待，將在未來某天變成最美好的故事開端。",
    "宇宙正在為你安排最適合的相遇，時機未到不代表緣分未到。相信自己，相信愛，最美的風景永遠在轉角之後。",
    "你今天為自己做的每一個關於愛的功課，都是在向命定的相遇邁進一步。愛，正在向你奔赴。",
  ],
};

// ===== 桃花运提升建议模板（三语） =====
export const PEACH_ADVICE_TEMPLATES: LArr = {
  zh: [
    "多走进新的社交场合，尝试一个你从未去过的兴趣社群或活动，缘分往往在你打破舒适圈的那一刻出现。",
    "保持对生活的热情与好奇心，让自己的眼睛里常有光芒——那是最强的吸引力，正缘会被这道光所引导。",
    "适时更新自己的形象与状态，从内到外的焕新会给你的桃花运注入新的能量，让缘分的大门悄然开启。",
  ],
  en: [
    "Step into new social settings — try a hobby community or event you've never been to; love often appears the moment you break out of your comfort zone.",
    "Keep your passion and curiosity for life alive so there's always a spark in your eyes — that's the strongest attraction, and true love is guided by that light.",
    "Refresh your look and state of being now and then; a renewal from the inside out pours new energy into your romance luck and quietly opens the door to connection.",
  ],
  tw: [
    "多走進新的社交場合，嘗試一個你從未去過的興趣社群或活動，緣分往往在你打破舒適圈的那一刻出現。",
    "保持對生活的熱情與好奇心，讓自己的眼睛裡常有光芒——那是最強的吸引力，正緣會被這道光所引導。",
    "適時更新自己的形象與狀態，從內到外的煥新會給你的桃花運注入新的能量，讓緣分的大門悄然開啟。",
  ],
};

// ===== 月份桃花文案（三语） =====
export const PEACH_MONTHLY_TEXTS: Record<"high" | "medium" | "low", LArr> = {
  high: {
    zh: [
      "桃花能量极为旺盛，异性缘大幅提升，主动社交收获惊喜，有望遇见令你心动的人。",
      "感情运达到高峰，身边会有令你在意的人出现，把握主动接触的机会，缘分将水到渠成。",
      "磁场吸引力爆棚，你散发的气质将成为最强的桃花磁石，留意生活中某个突然频繁出现的身影。",
    ],
    en: [
      "Romance energy is at its peak and your appeal soars; reaching out socially brings happy surprises, and you may meet someone who makes your heart race.",
      "Your love luck hits a high — someone you'll care about appears nearby. Seize the chance to make the first move and the bond will fall into place naturally.",
      "Your magnetic pull is overflowing, and your presence becomes the strongest romance magnet — watch for a figure who suddenly starts showing up often.",
    ],
    tw: [
      "桃花能量極為旺盛，異性緣大幅提升，主動社交收穫驚喜，有望遇見令你心動的人。",
      "感情運達到高峰，身邊會有令你在意的人出現，把握主動接觸的機會，緣分將水到渠成。",
      "磁場吸引力爆棚，你散發的氣質將成為最強的桃花磁石，留意生活中某個突然頻繁出現的身影。",
    ],
  },
  medium: {
    zh: [
      "感情运稳步上升，保持好心态和积极社交，有机会在轻松愉快的氛围中邂逅合适的人。",
      "桃花处于积累期，虽不如旺盛期那般明显，但深层的缘分正在悄悄铺垫，耐心等待时机。",
      "感情上有新的可能性涌现，可能是一次有趣的对话打开了新的空间，保持轻松开放的心态。",
    ],
    en: [
      "Your love luck rises steadily; keep a good mindset and stay socially active, and you may meet a fitting person in a light, pleasant atmosphere.",
      "Romance is in a building phase — less obvious than a peak, but a deeper bond is quietly being laid. Wait patiently for the right moment.",
      "New possibilities surface in love, perhaps an interesting conversation opening a new space; keep a light and open heart.",
    ],
    tw: [
      "感情運穩步上升，保持好心態和積極社交，有機會在輕鬆愉快的氛圍中邂逅合適的人。",
      "桃花處於積累期，雖不如旺盛期那般明顯，但深層的緣分正在悄悄鋪墊，耐心等待時機。",
      "感情上有新的可能性湧現，可能是一次有趣的對話打開了新的空間，保持輕鬆開放的心態。",
    ],
  },
  low: {
    zh: [
      "感情运较为平稳，不必强求，将更多精力放在自我提升上，内在的充实是最好的桃花滋养。",
      "此月宜沉淀修炼，专注于让自己更好，向外散发的能量此刻需要重新校准和积累。",
      "感情上暂时平静，但平静不代表无缘。把这段时间用来整理内心，为下一段缘分做好准备。",
    ],
    en: [
      "Your love luck is fairly steady — no need to force things. Put more energy into self-growth; inner fullness is the best nourishment for romance.",
      "This month favors settling and self-cultivation; focus on becoming better, as the energy you radiate now needs to recalibrate and gather.",
      "Love is calm for now, but calm doesn't mean fateless. Use this time to tend your inner world and prepare for the next connection.",
    ],
    tw: [
      "感情運較為平穩，不必強求，將更多精力放在自我提升上，內在的充實是最好的桃花滋養。",
      "此月宜沉澱修煉，專注於讓自己更好，向外散發的能量此刻需要重新校準和積累。",
      "感情上暫時平靜，但平靜不代表無緣。把這段時間用來整理內心，為下一段緣分做好準備。",
    ],
  },
};

// 月份桃花文案：在 month 与文案间的连接（zh/tw 用「：」，en 用 "— "）
export const PEACH_MONTH_SEP: Record<Lang, string> = { zh: "：", en: " — ", tw: "：" };
