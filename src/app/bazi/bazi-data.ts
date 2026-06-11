/**
 * 八字命理解读数据库
 * 包含五行性格、生肖运势、流年分析等预设文案
 *
 * 数据多语言化：每个可翻译文本字段使用本地化结构 L / LArr。
 * - L    = { zh, en, tw } 单条字符串
 * - LArr = { zh[], en[], tw[] } 字符串数组
 * 引擎/组件在使用前会按 lang 把这些结构解析成纯 string / string[]，
 * 因此对外暴露的解析结果类型保持不变（见各 resolve* 函数）。
 *
 * 注意：以下 Record 的 KEY 仍为中文核心符号（五行「木火土金水」、
 * 天干「甲乙丙…」、生肖「鼠牛虎…」），因为引擎产出的就是这些中文字形；
 * 仅 VALUE 文案做三语化。原始 BaZi 字形（天干地支）保持中文。
 */

export type Lang = "zh" | "en" | "tw";

/** 单条本地化字符串 */
export type L = { zh: string; en: string; tw: string };
/** 本地化字符串数组 */
export type LArr = { zh: string[]; en: string[]; tw: string[] };

/** 解析单条本地化字符串 */
export function rs(v: L, lang: Lang): string {
  return v[lang];
}
/** 解析本地化字符串数组 */
export function ra(v: LArr, lang: Lang): string[] {
  return v[lang];
}

// ===== 五行名称本地化（木火土金水 → Wood/Fire/Earth/Metal/Water） =====
export const ELEMENT_NAME: Record<string, L> = {
  木: { zh: "木", en: "Wood", tw: "木" },
  火: { zh: "火", en: "Fire", tw: "火" },
  土: { zh: "土", en: "Earth", tw: "土" },
  金: { zh: "金", en: "Metal", tw: "金" },
  水: { zh: "水", en: "Water", tw: "水" },
};

/** 解析五行名称（未知则回退原字形） */
export function resolveElement(el: string, lang: Lang): string {
  return ELEMENT_NAME[el] ? ELEMENT_NAME[el]![lang] : el;
}

// ===== 生肖名称本地化（鼠牛虎… → Rat/Ox/Tiger…） =====
export const ZODIAC_NAME: Record<string, L> = {
  鼠: { zh: "鼠", en: "Rat", tw: "鼠" },
  牛: { zh: "牛", en: "Ox", tw: "牛" },
  虎: { zh: "虎", en: "Tiger", tw: "虎" },
  兔: { zh: "兔", en: "Rabbit", tw: "兔" },
  龙: { zh: "龙", en: "Dragon", tw: "龍" },
  蛇: { zh: "蛇", en: "Snake", tw: "蛇" },
  马: { zh: "马", en: "Horse", tw: "馬" },
  羊: { zh: "羊", en: "Goat", tw: "羊" },
  猴: { zh: "猴", en: "Monkey", tw: "猴" },
  鸡: { zh: "鸡", en: "Rooster", tw: "雞" },
  狗: { zh: "狗", en: "Dog", tw: "狗" },
  猪: { zh: "猪", en: "Pig", tw: "豬" },
};

/** 解析生肖名称（未知则回退原字形） */
export function resolveZodiac(z: string, lang: Lang): string {
  return ZODIAC_NAME[z] ? ZODIAC_NAME[z]![lang] : z;
}

// ===== 纳音名称本地化（60 甲子纳音 → 英文译名） =====
export const NAYIN_NAME: Record<string, L> = {
  海中金: { zh: "海中金", en: "Sea Gold", tw: "海中金" },
  炉中火: { zh: "炉中火", en: "Furnace Fire", tw: "爐中火" },
  大林木: { zh: "大林木", en: "Forest Wood", tw: "大林木" },
  路旁土: { zh: "路旁土", en: "Roadside Earth", tw: "路旁土" },
  剑锋金: { zh: "剑锋金", en: "Sword-Edge Metal", tw: "劍鋒金" },
  山头火: { zh: "山头火", en: "Mountain Fire", tw: "山頭火" },
  涧下水: { zh: "涧下水", en: "Stream Water", tw: "澗下水" },
  城头土: { zh: "城头土", en: "City-Wall Earth", tw: "城頭土" },
  白蜡金: { zh: "白蜡金", en: "White-Wax Metal", tw: "白蠟金" },
  杨柳木: { zh: "杨柳木", en: "Willow Wood", tw: "楊柳木" },
  泉中水: { zh: "泉中水", en: "Spring Water", tw: "泉中水" },
  屋上土: { zh: "屋上土", en: "Rooftop Earth", tw: "屋上土" },
  霹雳火: { zh: "霹雳火", en: "Thunderbolt Fire", tw: "霹靂火" },
  松柏木: { zh: "松柏木", en: "Pine-Cypress Wood", tw: "松柏木" },
  长流水: { zh: "长流水", en: "Long-Flowing Water", tw: "長流水" },
  砂中金: { zh: "砂中金", en: "Sand Gold", tw: "砂中金" },
  山下火: { zh: "山下火", en: "Foothill Fire", tw: "山下火" },
  平地木: { zh: "平地木", en: "Plain Wood", tw: "平地木" },
  壁上土: { zh: "壁上土", en: "Wall Earth", tw: "壁上土" },
  金箔金: { zh: "金箔金", en: "Gold Foil Metal", tw: "金箔金" },
  覆灯火: { zh: "覆灯火", en: "Lamp Fire", tw: "覆燈火" },
  天河水: { zh: "天河水", en: "Heavenly River Water", tw: "天河水" },
  大驿土: { zh: "大驿土", en: "Highway Earth", tw: "大驛土" },
  钗钏金: { zh: "钗钏金", en: "Hairpin Metal", tw: "釵釧金" },
  桑柘木: { zh: "桑柘木", en: "Mulberry Wood", tw: "桑柘木" },
  大溪水: { zh: "大溪水", en: "Great-Brook Water", tw: "大溪水" },
  沙中土: { zh: "沙中土", en: "Sandy Earth", tw: "沙中土" },
  天上火: { zh: "天上火", en: "Sky Fire", tw: "天上火" },
  石榴木: { zh: "石榴木", en: "Pomegranate Wood", tw: "石榴木" },
  大海水: { zh: "大海水", en: "Ocean Water", tw: "大海水" },
  未知: { zh: "未知", en: "Unknown", tw: "未知" },
};

/** 解析纳音名称（未知则回退原字形） */
export function resolveNayin(n: string, lang: Lang): string {
  return NAYIN_NAME[n] ? NAYIN_NAME[n]![lang] : n;
}

// ===== 流年太岁关系本地化 =====
export const LIUNIAN_RELATION: Record<string, L> = {
  "值太岁（本命年）": { zh: "值太岁（本命年）", en: "Year of Fate (Birth-Sign Year)", tw: "值太歲（本命年）" },
  冲太岁: { zh: "冲太岁", en: "Clashing Tai Sui", tw: "沖太歲" },
  刑太岁: { zh: "刑太岁", en: "Punishing Tai Sui", tw: "刑太歲" },
  "刑太岁（三刑）": { zh: "刑太岁（三刑）", en: "Punishing Tai Sui (Triple Punishment)", tw: "刑太歲（三刑）" },
  害太岁: { zh: "害太岁", en: "Harming Tai Sui", tw: "害太歲" },
  合太岁: { zh: "合太岁", en: "Harmonizing Tai Sui", tw: "合太歲" },
  "合太岁（三合）": { zh: "合太岁（三合）", en: "Harmonizing Tai Sui (Triple Harmony)", tw: "合太歲（三合）" },
  "刑冲（岁破）": { zh: "刑冲（岁破）", en: "Punish-Clash (Year Breaker)", tw: "刑沖（歲破）" },
  平稳入岁: { zh: "平稳入岁", en: "Stable Year", tw: "平穩入歲" },
};

/** 解析流年太岁关系（未知则回退原文） */
export function resolveLiuNian(r: string, lang: Lang): string {
  return LIUNIAN_RELATION[r] ? LIUNIAN_RELATION[r]![lang] : r;
}

// ===== 五行性格解读 =====
export interface ElementPersonality {
  title: string;
  traits: string[];
  strengths: string[];
  weaknesses: string[];
}
interface RawElementPersonality {
  title: L;
  traits: LArr;
  strengths: LArr;
  weaknesses: LArr;
}

const ELEMENT_PERSONALITY_RAW: Record<string, RawElementPersonality> = {
  木: {
    title: { zh: "木命：仁者之心", en: "Wood Destiny: The Benevolent Heart", tw: "木命：仁者之心" },
    traits: {
      zh: ["富有人文关怀", "思维敏锐，善于规划", "充满生命力与生长力"],
      en: ["Rich in humane compassion", "Sharp-minded and skilled at planning", "Full of vitality and growth"],
      tw: ["富有人文關懷", "思維敏銳，善於規劃", "充滿生命力與生長力"],
    },
    strengths: {
      zh: ["慈悲善良，重情义", "有远见，能谋大局", "坚韧不拔，百折不挠"],
      en: ["Kind and loyal, values relationships", "Far-sighted, sees the big picture", "Tenacious and unyielding"],
      tw: ["慈悲善良，重情義", "有遠見，能謀大局", "堅韌不拔，百折不撓"],
    },
    weaknesses: {
      zh: ["有时过于理想化", "容易优柔寡断", "情绪易受外界影响"],
      en: ["Sometimes overly idealistic", "Prone to indecision", "Emotions easily swayed by surroundings"],
      tw: ["有時過於理想化", "容易優柔寡斷", "情緒易受外界影響"],
    },
  },
  火: {
    title: { zh: "火命：热情之魂", en: "Fire Destiny: The Passionate Soul", tw: "火命：熱情之魂" },
    traits: {
      zh: ["热情奔放，充满活力", "智慧灵动，思维跳跃", "富有感染力与表现欲"],
      en: ["Passionate and full of energy", "Bright, quick, leaping mind", "Charismatic and expressive"],
      tw: ["熱情奔放，充滿活力", "智慧靈動，思維跳躍", "富有感染力與表現欲"],
    },
    strengths: {
      zh: ["勇于进取，敢于开拓", "直觉敏锐，洞察力强", "乐观积极，能鼓舞他人"],
      en: ["Bold and pioneering", "Keen intuition and insight", "Optimistic and inspiring to others"],
      tw: ["勇於進取，敢於開拓", "直覺敏銳，洞察力強", "樂觀積極，能鼓舞他人"],
    },
    weaknesses: {
      zh: ["容易冲动，情绪化", "耐心不足，难以持久", "主观固执，不易听取建议"],
      en: ["Impulsive and emotional", "Lacking patience and persistence", "Subjective and stubborn, slow to take advice"],
      tw: ["容易衝動，情緒化", "耐心不足，難以持久", "主觀固執，不易聽取建議"],
    },
  },
  土: {
    title: { zh: "土命：厚德之基", en: "Earth Destiny: The Steadfast Foundation", tw: "土命：厚德之基" },
    traits: {
      zh: ["沉稳踏实，脚踏实地", "忠厚老实，诚信为本", "有强烈的责任心与使命感"],
      en: ["Steady and grounded", "Honest and trustworthy at heart", "Strong sense of duty and mission"],
      tw: ["沉穩踏實，腳踏實地", "忠厚老實，誠信為本", "有強烈的責任心與使命感"],
    },
    strengths: {
      zh: ["稳重可靠，值得信赖", "包容性强，善于调和", "务实勤恳，善始善终"],
      en: ["Reliable and dependable", "Tolerant and good at reconciling", "Practical, diligent, sees things through"],
      tw: ["穩重可靠，值得信賴", "包容性強，善於調和", "務實勤懇，善始善終"],
    },
    weaknesses: {
      zh: ["行动偏保守，变通不足", "有时过于固执己见", "情感表达较为内敛"],
      en: ["Conservative, slow to adapt", "Sometimes overly set in opinions", "Reserved in expressing emotions"],
      tw: ["行動偏保守，變通不足", "有時過於固執己見", "情感表達較為內斂"],
    },
  },
  金: {
    title: { zh: "金命：义者之刃", en: "Metal Destiny: The Righteous Blade", tw: "金命：義者之刃" },
    traits: {
      zh: ["刚正不阿，果敢决断", "原则性强，是非分明", "行事雷厉风行，效率极高"],
      en: ["Upright and decisive", "Principled, clear on right and wrong", "Acts swiftly with high efficiency"],
      tw: ["剛正不阿，果敢決斷", "原則性強，是非分明", "行事雷厲風行，效率極高"],
    },
    strengths: {
      zh: ["执行力强，雷厉风行", "坚持原则，不畏权势", "头脑清晰，逻辑严密"],
      en: ["Strong execution, acts decisively", "Holds to principles, unafraid of authority", "Clear-headed and rigorously logical"],
      tw: ["執行力強，雷厲風行", "堅持原則，不畏權勢", "頭腦清晰，邏輯嚴密"],
    },
    weaknesses: {
      zh: ["容易过于强硬", "缺乏柔韧性，难以妥协", "有时显得冷漠或强势"],
      en: ["Prone to being too hard-edged", "Inflexible, hard to compromise", "Can seem cold or domineering"],
      tw: ["容易過於強硬", "缺乏柔韌性，難以妥協", "有時顯得冷漠或強勢"],
    },
  },
  水: {
    title: { zh: "水命：智者之流", en: "Water Destiny: The Sage's Current", tw: "水命：智者之流" },
    traits: {
      zh: ["智慧如水，变化无穷", "感知敏锐，直觉超群", "思维深邃，洞若观火"],
      en: ["Wisdom like water, ever-changing", "Acutely perceptive, superb intuition", "Deep-thinking, sees through things clearly"],
      tw: ["智慧如水，變化無窮", "感知敏銳，直覺超群", "思維深邃，洞若觀火"],
    },
    strengths: {
      zh: ["聪明机智，学习力极强", "善于沟通，处世圆融", "适应力强，能屈能伸"],
      en: ["Clever and quick, a strong learner", "Communicates well, socially adept", "Highly adaptable, flexible under pressure"],
      tw: ["聰明機智，學習力極強", "善於溝通，處世圓融", "適應力強，能屈能伸"],
    },
    weaknesses: {
      zh: ["有时过于感性多疑", "意志力可能不够坚定", "容易随波逐流，缺乏主见"],
      en: ["Sometimes overly emotional and suspicious", "Willpower may not be firm enough", "Prone to drifting, lacking firm opinions"],
      tw: ["有時過於感性多疑", "意志力可能不夠堅定", "容易隨波逐流，缺乏主見"],
    },
  },
};

/** 解析五行性格（未知五行返回 undefined，与原 Record 行为一致） */
export function getElementPersonality(el: string, lang: Lang): ElementPersonality | undefined {
  const raw = ELEMENT_PERSONALITY_RAW[el];
  if (!raw) return undefined;
  return {
    title: rs(raw.title, lang),
    traits: ra(raw.traits, lang),
    strengths: ra(raw.strengths, lang),
    weaknesses: ra(raw.weaknesses, lang),
  };
}

// ===== 日主天干解读 =====
export interface DayStemReading {
  title: string;
  nature: string;
  career: string;
  relationship: string;
}
interface RawDayStemReading {
  title: L;
  nature: L;
  career: L;
  relationship: L;
}

const DAY_STEM_READING_RAW: Record<string, RawDayStemReading> = {
  甲: {
    title: { zh: "甲木日主：参天大树", en: "Jia Wood Day Master: The Towering Tree", tw: "甲木日主：參天大樹" },
    nature: {
      zh: "甲木为阳木，如参天大树，正直向上，有领袖气质。你天生具备强大的规划能力和组织才能，追求目标时锲而不舍。",
      en: "Jia is Yang Wood, like a towering tree — upright, aspiring, with a leader's bearing. You are born with strong planning and organizing talent, and pursue your goals tirelessly.",
      tw: "甲木為陽木，如參天大樹，正直向上，有領袖氣質。你天生具備強大的規劃能力和組織才能，追求目標時鍥而不捨。",
    },
    career: {
      zh: "适合管理、教育、政务等需要决策与领导力的领域。2026年食神透干，才华得以充分展现，创作与表达能力突出。",
      en: "Well suited to management, education, and public affairs — fields requiring decision-making and leadership. In 2026 the Eating God emerges in the stem, letting your talents shine, with standout creativity and expression.",
      tw: "適合管理、教育、政務等需要決策與領導力的領域。2026年食神透干，才華得以充分展現，創作與表達能力突出。",
    },
    relationship: {
      zh: "感情中真诚直接，但有时因过于坚持己见而产生摩擦。今年宜以柔克刚，多倾听伴侣心声。",
      en: "Sincere and direct in love, yet friction can arise from being too insistent on your own views. This year, soften your approach and listen more to your partner.",
      tw: "感情中真誠直接，但有時因過於堅持己見而產生摩擦。今年宜以柔克剛，多傾聽伴侶心聲。",
    },
  },
  乙: {
    title: { zh: "乙木日主：柔韧翠竹", en: "Yi Wood Day Master: The Supple Bamboo", tw: "乙木日主：柔韌翠竹" },
    nature: {
      zh: "乙木为阴木，如柔韧的藤蔓翠竹，善于借势生长。你灵活变通，善于观察环境，能在复杂局面中找到自己的位置。",
      en: "Yi is Yin Wood, like supple vines and green bamboo that grow by borrowing strength. You are flexible and observant, finding your place even in complex situations.",
      tw: "乙木為陰木，如柔韌的藤蔓翠竹，善於借勢生長。你靈活變通，善於觀察環境，能在複雜局面中找到自己的位置。",
    },
    career: {
      zh: "适合艺术、咨询、传媒等创意性工作。2026年机会隐藏在细节中，主动拓展人脉，贵人自然浮现。",
      en: "Well suited to art, consulting, and media — creative work. In 2026 opportunities hide in the details; actively expand your network and benefactors will naturally appear.",
      tw: "適合藝術、諮詢、傳媒等創意性工作。2026年機會隱藏在細節中，主動拓展人脈，貴人自然浮現。",
    },
    relationship: {
      zh: "感情细腻体贴，重视伴侣感受。今年有桃花运，单身者有望邂逅契合之人。",
      en: "Tender and considerate in love, attentive to your partner's feelings. This year brings romance luck — singles may well meet a compatible match.",
      tw: "感情細膩體貼，重視伴侶感受。今年有桃花運，單身者有望邂逅契合之人。",
    },
  },
  丙: {
    title: { zh: "丙火日主：烈日光芒", en: "Bing Fire Day Master: The Blazing Sun", tw: "丙火日主：烈日光芒" },
    nature: {
      zh: "丙火为阳火，如正午烈日，光明磊落，充满能量。你个性直爽热情，总能成为人群中的焦点，感召力极强。",
      en: "Bing is Yang Fire, like the noonday sun — bright, open, and full of energy. Frank and warm by nature, you become the focus of any crowd, with great power to inspire.",
      tw: "丙火為陽火，如正午烈日，光明磊落，充滿能量。你個性直爽熱情，總能成為人群中的焦點，感召力極強。",
    },
    career: {
      zh: "适合销售、演艺、管理等需要高能见度的领域。2026年比肩并立，竞争激烈，专注自身核心优势方能脱颖而出。",
      en: "Well suited to sales, performance, and management — high-visibility fields. In 2026 Peers stand alongside you and competition is fierce; focus on your core strengths to stand out.",
      tw: "適合銷售、演藝、管理等需要高能見度的領域。2026年比肩並立，競爭激烈，專注自身核心優勢方能脫穎而出。",
    },
    relationship: {
      zh: "感情热烈直接，容易陷入轰轰烈烈的爱情。今年感情需防第三者介入，已婚者需多花时间陪伴家人。",
      en: "Ardent and direct in love, easily swept into a passionate romance. This year, guard against a third party; the married should spend more time with family.",
      tw: "感情熱烈直接，容易陷入轟轟烈烈的愛情。今年感情需防第三者介入，已婚者需多花時間陪伴家人。",
    },
  },
  丁: {
    title: { zh: "丁火日主：温烛光芒", en: "Ding Fire Day Master: The Warm Candlelight", tw: "丁火日主：溫燭光芒" },
    nature: {
      zh: "丁火为阴火，如夜间的烛光，温暖持久，能给人带来光明与温暖。你情感细腻，具有强烈的同理心，善于理解他人。",
      en: "Ding is Yin Fire, like a candle in the night — warm and lasting, bringing others light and comfort. Emotionally subtle, deeply empathetic, you understand others well.",
      tw: "丁火為陰火，如夜間的燭光，溫暖持久，能給人帶來光明與溫暖。你情感細膩，具有強烈的同理心，善於理解他人。",
    },
    career: {
      zh: "适合医疗、心理咨询、艺术创作等温暖人心的领域。2026年刃逢食神，宜凭实力说话，创意表达是你的核心竞争力。",
      en: "Well suited to healthcare, counseling, and the arts — fields that warm the heart. In 2026 the Blade meets the Eating God; let your ability speak, with creative expression as your core edge.",
      tw: "適合醫療、心理諮詢、藝術創作等溫暖人心的領域。2026年刃逢食神，宜憑實力說話，創意表達是你的核心競爭力。",
    },
    relationship: {
      zh: "感情投入而深刻，倾向于长期稳定的关系。今年感情运势平稳，夫妻宫安稳，平淡中见真情。",
      en: "Devoted and profound in love, inclined toward long, stable bonds. This year love is steady and the marriage palace calm — true feeling shows in the quiet ordinary.",
      tw: "感情投入而深刻，傾向於長期穩定的關係。今年感情運勢平穩，夫妻宮安穩，平淡中見真情。",
    },
  },
  戊: {
    title: { zh: "戊土日主：巍峨高山", en: "Wu Earth Day Master: The Majestic Mountain", tw: "戊土日主：巍峨高山" },
    nature: {
      zh: "戊土为阳土，如巍峨高山，厚重稳健，包容万物。你是天生的协调者与守护者，沉稳踏实，大山一般的可靠。",
      en: "Wu is Yang Earth, like a majestic mountain — solid, steady, and all-embracing. A natural coordinator and protector, you are grounded and mountain-reliable.",
      tw: "戊土為陽土，如巍峨高山，厚重穩健，包容萬物。你是天生的協調者與守護者，沉穩踏實，大山一般的可靠。",
    },
    career: {
      zh: "适合房地产、金融、行政管理等稳健厚重的领域。2026年官星临照，晋升机会浮现，脚踏实地自有收获。",
      en: "Well suited to real estate, finance, and administration — solid, weighty fields. In 2026 the Officer Star shines on you; promotion appears, and steady effort brings its reward.",
      tw: "適合房地產、金融、行政管理等穩健厚重的領域。2026年官星臨照，晉升機會浮現，腳踏實地自有收穫。",
    },
    relationship: {
      zh: "感情中是可靠的依靠，但表达较为内敛。今年家庭和谐，感情稳中向好，适合考虑婚育大事。",
      en: "A reliable anchor in love, though reserved in expression. This year the home is harmonious and love steadily improves — a good time to consider marriage or children.",
      tw: "感情中是可靠的依靠，但表達較為內斂。今年家庭和諧，感情穩中向好，適合考慮婚育大事。",
    },
  },
  己: {
    title: { zh: "己土日主：肥沃田园", en: "Ji Earth Day Master: The Fertile Field", tw: "己土日主：肥沃田園" },
    nature: {
      zh: "己土为阴土，如肥沃的田园，滋养万物，无私奉献。你善于积累，有超强的耐力，能将细碎的资源整合成丰厚的成果。",
      en: "Ji is Yin Earth, like fertile fields that nourish all things and give selflessly. Skilled at accumulation, with great endurance, you turn scattered resources into rich results.",
      tw: "己土為陰土，如肥沃的田園，滋養萬物，無私奉獻。你善於積累，有超強的耐力，能將細碎的資源整合成豐厚的成果。",
    },
    career: {
      zh: "适合农业、教育、服务业等默默奉献的领域。2026年财星旺盛，理财投资有机会，但需防偏财损失。",
      en: "Well suited to agriculture, education, and service — fields of quiet dedication. In 2026 the Wealth Star is strong with investment opportunities, but guard against windfall losses.",
      tw: "適合農業、教育、服務業等默默奉獻的領域。2026年財星旺盛，理財投資有機會，但需防偏財損失。",
    },
    relationship: {
      zh: "感情中温柔体贴，奉献精神强。今年感情运有些起伏，需防患于未然，加强沟通是关键。",
      en: "Gentle and devoted in love, with a giving spirit. This year love has some ups and downs; prevent trouble early — better communication is key.",
      tw: "感情中溫柔體貼，奉獻精神強。今年感情運有些起伏，需防患於未然，加強溝通是關鍵。",
    },
  },
  庚: {
    title: { zh: "庚金日主：肃杀利刃", en: "Geng Metal Day Master: The Sharp Blade", tw: "庚金日主：肅殺利刃" },
    nature: {
      zh: "庚金为阳金，如铸就的宝剑，锋利而有力。你做事直接果断，有极强的执行力，是危机时刻的定海神针。",
      en: "Geng is Yang Metal, like a forged sword — sharp and forceful. Direct and decisive, with strong execution, you are the steadying force in a crisis.",
      tw: "庚金為陽金，如鑄就的寶劍，鋒利而有力。你做事直接果斷，有極強的執行力，是危機時刻的定海神針。",
    },
    career: {
      zh: "适合法律、军警、外科医学等需要决断力的领域。2026年食神制杀，智谋克胜蛮力，谋略比强势更有效。",
      en: "Well suited to law, military and police, and surgery — fields requiring resolve. In 2026 the Eating God controls the Seven Killings; wit beats brute force — strategy serves you better than aggression.",
      tw: "適合法律、軍警、外科醫學等需要決斷力的領域。2026年食神制殺，智謀克勝蠻力，謀略比強勢更有效。",
    },
    relationship: {
      zh: "感情直接，不善甜言蜜语，但忠诚专一。今年感情中可能有争吵，需学会温柔表达，少用命令式口吻。",
      en: "Direct in love and not one for sweet talk, but loyal and devoted. Quarrels may arise this year; learn to express gently and avoid a commanding tone.",
      tw: "感情直接，不善甜言蜜語，但忠誠專一。今年感情中可能有爭吵，需學會溫柔表達，少用命令式口吻。",
    },
  },
  辛: {
    title: { zh: "辛金日主：精美珠宝", en: "Xin Metal Day Master: The Fine Jewel", tw: "辛金日主：精美珠寶" },
    nature: {
      zh: "辛金为阴金，如精雕细琢的珠宝，美丽而珍贵。你品味高雅，追求完美，对生活质量有高标准，极为自爱自律。",
      en: "Xin is Yin Metal, like a finely cut jewel — beautiful and precious. Refined in taste and perfectionist, you hold high standards for quality of life and are highly self-disciplined.",
      tw: "辛金為陰金，如精雕細琢的珠寶，美麗而珍貴。你品味高雅，追求完美，對生活質量有高標準，極為自愛自律。",
    },
    career: {
      zh: "适合珠宝、时尚、精密科技等追求精致的领域。2026年偏印生助，学习力爆发，进修深造大有裨益。",
      en: "Well suited to jewelry, fashion, and precision tech — fields that prize refinement. In 2026 the Indirect Resource supports you; your learning power surges, and further study pays off greatly.",
      tw: "適合珠寶、時尚、精密科技等追求精緻的領域。2026年偏印生助，學習力爆發，進修深造大有裨益。",
    },
    relationship: {
      zh: "感情中追求高质量的精神共鸣，对伴侣有较高标准。今年感情有贵人撮合，单身者可能通过朋友介绍遇到理想对象。",
      en: "In love you seek high-quality spiritual resonance and hold partners to high standards. This year a benefactor plays matchmaker — singles may meet an ideal partner through friends.",
      tw: "感情中追求高質量的精神共鳴，對伴侶有較高標準。今年感情有貴人撮合，單身者可能通過朋友介紹遇到理想對象。",
    },
  },
  壬: {
    title: { zh: "壬水日主：浩瀚江河", en: "Ren Water Day Master: The Vast River", tw: "壬水日主：浩瀚江河" },
    nature: {
      zh: "壬水为阳水，如浩瀚江河，奔腾不息，志向远大。你思维广博，视野开阔，不拘一格，有强烈的探索精神。",
      en: "Ren is Yang Water, like a vast river — surging ceaselessly, with grand ambition. Broad in thought and wide in vision, unconventional, you carry a strong spirit of exploration.",
      tw: "壬水為陽水，如浩瀚江河，奔騰不息，志向遠大。你思維廣博，視野開闊，不拘一格，有強烈的探索精神。",
    },
    career: {
      zh: "适合科技、贸易、国际关系等需要开阔视野的领域。2026年官星临运，事业机会来袭，主动出击方能把握。",
      en: "Well suited to tech, trade, and international relations — fields needing a broad outlook. In 2026 the Officer Star enters your luck; career chances arrive, and only by taking the initiative will you seize them.",
      tw: "適合科技、貿易、國際關係等需要開闊視野的領域。2026年官星臨運，事業機會來襲，主動出擊方能把握。",
    },
    relationship: {
      zh: "感情中富有浪漫情怀，但容易见异思迁。今年感情宜专一深耕，切勿三心二意，成熟稳定的伴侣关系才是真正的财富。",
      en: "Romantic at heart in love, but prone to a wandering eye. This year, stay devoted and invest deeply; do not waver — a mature, stable partnership is the true wealth.",
      tw: "感情中富有浪漫情懷，但容易見異思遷。今年感情宜專一深耕，切勿三心二意，成熟穩定的伴侶關係才是真正的財富。",
    },
  },
  癸: {
    title: { zh: "癸水日主：滋润甘露", en: "Gui Water Day Master: The Nourishing Dew", tw: "癸水日主：滋潤甘露" },
    nature: {
      zh: "癸水为阴水，如天降甘露，润物无声。你内心世界丰富，直觉敏锐，善于洞察人心，具有强烈的悲悯情怀。",
      en: "Gui is Yin Water, like dew from heaven that nourishes silently. Rich in inner life and keen in intuition, you read hearts well and carry deep compassion.",
      tw: "癸水為陰水，如天降甘露，潤物無聲。你內心世界豐富，直覺敏銳，善於洞察人心，具有強烈的悲憫情懷。",
    },
    career: {
      zh: "适合研究、心理、写作等深度思考的领域。2026年印星守护，学业与资质得到认可，升学考证大吉。",
      en: "Well suited to research, psychology, and writing — fields of deep thought. In 2026 the Resource Star guards you; studies and credentials gain recognition — auspicious for exams and certifications.",
      tw: "適合研究、心理、寫作等深度思考的領域。2026年印星守護，學業與資質得到認可，升學考證大吉。",
    },
    relationship: {
      zh: "感情中敏感细腻，容易将对方的情绪变化尽收眼底。今年感情中宜多表达自我需求，勿总是委曲求全。",
      en: "Sensitive and subtle in love, you notice every shift in your partner's mood. This year, voice your own needs more and stop always yielding to keep the peace.",
      tw: "感情中敏感細膩，容易將對方的情緒變化盡收眼底。今年感情中宜多表達自我需求，勿總是委曲求全。",
    },
  },
};

/** 解析日主解读（未知天干返回 undefined） */
export function getDayStemReading(stem: string, lang: Lang): DayStemReading | undefined {
  const raw = DAY_STEM_READING_RAW[stem];
  if (!raw) return undefined;
  return {
    title: rs(raw.title, lang),
    nature: rs(raw.nature, lang),
    career: rs(raw.career, lang),
    relationship: rs(raw.relationship, lang),
  };
}

// ===== 生肖2026年流年运势 =====
export interface ZodiacFortune {
  overall: number;
  career: number;
  wealth: number;
  love: number;
  health: number;
  summary: string;
  careerDetail: string;
  wealthDetail: string;
  loveDetail: string;
  healthDetail: string;
  taishiRelation: string;
  luckyDirection: string;
  luckyColor: string;
  luckyNumber: number;
}
interface RawZodiacFortune {
  overall: number;
  career: number;
  wealth: number;
  love: number;
  health: number;
  summary: L;
  careerDetail: L;
  wealthDetail: L;
  loveDetail: L;
  healthDetail: L;
  taishiRelation: L;
  luckyDirection: L;
  luckyColor: L;
  luckyNumber: number;
}

const ZODIAC_2026_FORTUNE_RAW: Record<string, RawZodiacFortune> = {
  鼠: {
    overall: 3, career: 3, wealth: 3, love: 2, health: 3,
    taishiRelation: { zh: "冲太岁", en: "Clashing Tai Sui", tw: "沖太歲" },
    summary: {
      zh: "2026年子午相冲，属鼠的你正式【冲太岁】。生活各方面易有波动与变化，凡事宜保守谨慎，切忌大动干戈。这一年是蓄势待发的转型期，只要稳住心神，变动中往往隐藏着机遇。",
      en: "In 2026 Zi and Wu clash, so the Rat officially 'clashes with Tai Sui.' Many areas of life see fluctuation and change; stay conservative and cautious, and avoid drastic moves. This is a transitional year of building momentum — keep a steady mind, and opportunity often hides within the change.",
      tw: "2026年子午相沖，屬鼠的你正式【沖太歲】。生活各方面易有波動與變化，凡事宜保守謹慎，切忌大動干戈。這一年是蓄勢待發的轉型期，只要穩住心神，變動中往往隱藏著機遇。",
    },
    careerDetail: {
      zh: "职场上有变动之象，可能面临换工作、换岗位或业务调整。不宜主动跳槽，被动接受变化反而能发现新机遇。与同事关系需多维护，避免正面冲突。",
      en: "Signs of change at work — you may face a new job, a new role, or business restructuring. Avoid actively job-hopping; accepting change passively can reveal new opportunities. Tend to relationships with colleagues and avoid head-on conflict.",
      tw: "職場上有變動之象，可能面臨換工作、換崗位或業務調整。不宜主動跳槽，被動接受變化反而能發現新機遇。與同事關係需多維護，避免正面衝突。",
    },
    wealthDetail: {
      zh: "财运较为平淡，正财收入稳定但偏财难求。切记不要贸然投资，特别要警惕高风险理财项目。量入为出，开源节流是今年财运管理的核心原则。",
      en: "Wealth is rather flat — steady regular income but little windfall luck. Do not invest rashly, and beware high-risk products in particular. Living within your means and trimming spending are the core principles this year.",
      tw: "財運較為平淡，正財收入穩定但偏財難求。切記不要貿然投資，特別要警惕高風險理財項目。量入為出，開源節流是今年財運管理的核心原則。",
    },
    loveDetail: {
      zh: "感情方面有些起伏，单身者难有好缘分浮现，与其强求不如充实自身。已婚或恋爱中的人需多体谅伴侣，减少争吵，共同面对年内的变化。",
      en: "Love has its ups and downs; singles find good matches scarce — rather than forcing it, enrich yourself. Those married or attached should be more understanding, reduce quarrels, and face the year's changes together.",
      tw: "感情方面有些起伏，單身者難有好緣分浮現，與其強求不如充實自身。已婚或戀愛中的人需多體諒伴侶，減少爭吵，共同面對年內的變化。",
    },
    healthDetail: {
      zh: "身体需多加注意，尤其是心脑血管和腰腿方面。建议定期体检，保持规律作息，勿让压力积累成疾。",
      en: "Pay extra attention to health, especially the cardiovascular system and the lower back and legs. Get regular check-ups, keep a steady routine, and don't let stress build into illness.",
      tw: "身體需多加注意，尤其是心腦血管和腰腿方面。建議定期體檢，保持規律作息，勿讓壓力積累成疾。",
    },
    luckyDirection: { zh: "北方", en: "North", tw: "北方" },
    luckyColor: { zh: "黑色、蓝色", en: "Black, Blue", tw: "黑色、藍色" },
    luckyNumber: 6,
  },
  牛: {
    overall: 5, career: 5, wealth: 4, love: 4, health: 4,
    taishiRelation: { zh: "拱太岁（大吉）", en: "Supporting Tai Sui (Very Auspicious)", tw: "拱太歲（大吉）" },
    summary: {
      zh: "2026年属牛的你运势如日中天！丑午拱合，贵人贵气旺盛，一年中好事不断。无论是事业、财运还是感情，都会有明显的提升与突破。是你大展身手、乘势而上的黄金之年。",
      en: "In 2026 the Ox's fortune is at its peak! Chou and Wu form a supporting union, bringing strong benefactor luck and a steady stream of good things. Career, wealth, and love all see clear gains and breakthroughs — a golden year to show your full strength and ride the momentum.",
      tw: "2026年屬牛的你運勢如日中天！丑午拱合，貴人貴氣旺盛，一年中好事不斷。無論是事業、財運還是感情，都會有明顯的提升與突破。是你大展身手、乘勢而上的黃金之年。",
    },
    careerDetail: {
      zh: "事业运势极旺，努力付出将得到上级的充分认可，晋升加薪机会极大。有望承担更重要的职责，甚至开辟新业务。主动展示才华，机会已为你敞开。",
      en: "Career fortune is exceptionally strong; your effort wins full recognition from superiors, with great odds of promotion and a raise. You may take on heavier responsibility or even open new business lines. Show your talent — opportunity is already open to you.",
      tw: "事業運勢極旺，努力付出將得到上級的充分認可，晉升加薪機會極大。有望承擔更重要的職責，甚至開闢新業務。主動展示才華，機會已為你敞開。",
    },
    wealthDetail: {
      zh: "正财偏财双旺，是难得的财运丰收年。工作薪资可能有大幅提升，投资理财也有不错的回报。但需防乐极生悲，避免过度自信带来的冒险损失。",
      en: "Both regular and windfall wealth flourish — a rare bumper year for finances. Salary may rise sharply and investments can pay off well. Still, guard against overconfidence and the losses that rash bets can bring.",
      tw: "正財偏財雙旺，是難得的財運豐收年。工作薪資可能有大幅提升，投資理財也有不錯的回報。但需防樂極生悲，避免過度自信帶來的冒險損失。",
    },
    loveDetail: {
      zh: "感情运势旺盛，单身者有极大机会遇到真命天子/天女，缘分来得直接而明朗。已婚者感情升温，家庭幸福美满，适合考虑家庭大事。",
      en: "Love fortune is strong; singles have an excellent chance of meeting 'the one,' with romance arriving directly and clearly. The married find love warming and the home happy — a good time to consider major family matters.",
      tw: "感情運勢旺盛，單身者有極大機會遇到真命天子/天女，緣分來得直接而明朗。已婚者感情升溫，家庭幸福美滿，適合考慮家庭大事。",
    },
    healthDetail: {
      zh: "整体健康状况良好，精力充沛。只需注意劳逸结合，事业得意时也别忘了保养身体，保持适当运动和充足睡眠。",
      en: "Overall health is good and energy is abundant. Just balance work and rest; even when career thrives, don't neglect your body — keep up moderate exercise and adequate sleep.",
      tw: "整體健康狀況良好，精力充沛。只需注意勞逸結合，事業得意時也別忘了保養身體，保持適當運動和充足睡眠。",
    },
    luckyDirection: { zh: "南方", en: "South", tw: "南方" },
    luckyColor: { zh: "红色、金色", en: "Red, Gold", tw: "紅色、金色" },
    luckyNumber: 9,
  },
  虎: {
    overall: 3, career: 4, wealth: 3, love: 3, health: 3,
    taishiRelation: { zh: "合太岁（半合吉）", en: "Harmonizing Tai Sui (Half-Harmony, Auspicious)", tw: "合太歲（半合吉）" },
    summary: {
      zh: "2026年寅午半合，属虎的你与太岁属合，整体运势趋于平稳向好。有贵人在背后默默支持，虽无大富大贵，但做事顺遂，一步一个脚印地积累着实力。",
      en: "In 2026 Yin and Wu form a half-harmony, so the Tiger is in accord with Tai Sui and overall fortune trends steady and positive. Benefactors quietly support you from behind — no sudden riches, but things go smoothly as you build strength step by step.",
      tw: "2026年寅午半合，屬虎的你與太歲屬合，整體運勢趨於平穩向好。有貴人在背後默默支持，雖無大富大貴，但做事順遂，一步一個腳印地積累著實力。",
    },
    careerDetail: {
      zh: "职场上遇到贵人相助，上司欣赏，同事友好，合作项目顺利推进。今年适合稳步发展，打好基础，不宜操之过急，循序渐进自有收获。",
      en: "Benefactors help at work — superiors appreciate you, colleagues are friendly, and joint projects advance smoothly. This year favors steady growth and laying foundations; don't rush — progress in order brings its own reward.",
      tw: "職場上遇到貴人相助，上司欣賞，同事友好，合作項目順利推進。今年適合穩步發展，打好基礎，不宜操之過急，循序漸進自有收穫。",
    },
    wealthDetail: {
      zh: "财运平稳，正财收入有小幅增加。适合储蓄和做长期规划，投资宜保守，可关注低风险的稳健型产品。",
      en: "Wealth is stable, with a slight rise in regular income. Good for saving and long-term planning; keep investing conservative and look to low-risk, steady products.",
      tw: "財運平穩，正財收入有小幅增加。適合儲蓄和做長期規劃，投資宜保守，可關注低風險的穩健型產品。",
    },
    loveDetail: {
      zh: "感情方面平和稳定，缺乏激情，更多的是温水中的温情。单身者可主动出击，通过朋友圈拓展缘分；恋爱中的人宜多制造浪漫。",
      en: "Love is calm and stable — short on passion, more a gentle warmth. Singles can take the initiative and widen their circle for new ties; those dating should create more romance.",
      tw: "感情方面平和穩定，缺乏激情，更多的是溫水中的溫情。單身者可主動出擊，通過朋友圈拓展緣分；戀愛中的人宜多製造浪漫。",
    },
    healthDetail: {
      zh: "健康方面注意筋骨，避免运动损伤。保持好的生活习惯，定期进行户外活动，阳气充足则诸事顺遂。",
      en: "Mind your bones and joints and avoid sports injuries. Keep good habits and get regular outdoor activity; with ample vitality, all goes smoothly.",
      tw: "健康方面注意筋骨，避免運動損傷。保持好的生活習慣，定期進行戶外活動，陽氣充足則諸事順遂。",
    },
    luckyDirection: { zh: "东方", en: "East", tw: "東方" },
    luckyColor: { zh: "绿色、蓝色", en: "Green, Blue", tw: "綠色、藍色" },
    luckyNumber: 3,
  },
  兔: {
    overall: 2, career: 2, wealth: 3, love: 2, health: 3,
    taishiRelation: { zh: "害太岁", en: "Harming Tai Sui", tw: "害太歲" },
    summary: {
      zh: "2026年属兔的你与午年相害，事事容易有些小阻碍，如同走路总是磕磕绊绊。需要特别注意人际关系，防小人，谨言慎行，低调行事是今年的最佳策略。",
      en: "In 2026 the Rabbit is in a harming relation with the Wu year, so small obstacles crop up in everything, like stumbling as you walk. Mind your relationships, guard against petty people, watch your words, and stay low-key — that is the best strategy this year.",
      tw: "2026年屬兔的你與午年相害，事事容易有些小阻礙，如同走路總是磕磕絆絆。需要特別注意人際關係，防小人，謹言慎行，低調行事是今年的最佳策略。",
    },
    careerDetail: {
      zh: "职场上可能受到小人暗算或误解，需格外注意言行，避免无谓的争论。守好本职工作，不轻易参与办公室政治，明哲保身为上。",
      en: "At work you may face scheming or misunderstanding; watch your words and conduct and avoid pointless arguments. Keep to your own duties, stay out of office politics, and prudence is paramount.",
      tw: "職場上可能受到小人暗算或誤解，需格外注意言行，避免無謂的爭論。守好本職工作，不輕易參與辦公室政治，明哲保身為上。",
    },
    wealthDetail: {
      zh: "财运中等，意外支出较多，需特别防范被人欺骗或引诱做高风险投资。日常消费可能超支，建议建立严格的月度预算管理。",
      en: "Wealth is average with frequent unexpected expenses; guard against being deceived or lured into high-risk investments. Daily spending may overrun — set up strict monthly budgeting.",
      tw: "財運中等，意外支出較多，需特別防範被人欺騙或引誘做高風險投資。日常消費可能超支，建議建立嚴格的月度預算管理。",
    },
    loveDetail: {
      zh: "感情中容易有误解与摩擦，沟通不畅是主要问题。需要更多耐心和包容，避免因小事激化矛盾。单身者今年缘分平平，广交朋友比苦觅佳偶更重要。",
      en: "Love is prone to misunderstanding and friction, with poor communication the main issue. Bring more patience and tolerance, and don't let small things escalate. Singles see ordinary luck this year — making friends widely matters more than chasing a match.",
      tw: "感情中容易有誤解與摩擦，溝通不暢是主要問題。需要更多耐心和包容，避免因小事激化矛盾。單身者今年緣分平平，廣交朋友比苦覓佳偶更重要。",
    },
    healthDetail: {
      zh: "注意消化系统和肝脏健康，情绪波动大时尤要调节。适当通过运动或冥想释放压力，保持内心的平和。",
      en: "Mind your digestion and liver, and regulate yourself when moods swing. Release stress through exercise or meditation and keep inner calm.",
      tw: "注意消化系統和肝臟健康，情緒波動大時尤要調節。適當通過運動或冥想釋放壓力，保持內心的平和。",
    },
    luckyDirection: { zh: "西方", en: "West", tw: "西方" },
    luckyColor: { zh: "白色、米色", en: "White, Beige", tw: "白色、米色" },
    luckyNumber: 8,
  },
  龙: {
    overall: 4, career: 4, wealth: 4, love: 4, health: 4,
    taishiRelation: { zh: "平稳入岁", en: "Stable Year", tw: "平穩入歲" },
    summary: {
      zh: "2026年属龙的你整体运势较旺，精气神满满。午年火旺生土，龙的气场得到增强，做事容易得到他人支持，是扩大影响力、建立人脉的好时机。",
      en: "In 2026 the Dragon's overall fortune is fairly strong, brimming with vigor. The Wu year's strong Fire feeds Earth, boosting the Dragon's presence; your efforts easily win others' support — a good time to expand influence and build connections.",
      tw: "2026年屬龍的你整體運勢較旺，精氣神滿滿。午年火旺生土，龍的氣場得到增強，做事容易得到他人支持，是擴大影響力、建立人脈的好時機。",
    },
    careerDetail: {
      zh: "事业上机遇频出，有望在工作中承担更多责任，展现领导才能。与上级关系和谐，可主动表达抱负，争取晋升与发展机会。",
      en: "Career opportunities come thick and fast; you may take on more responsibility and show your leadership. Relations with superiors are harmonious — voice your ambitions and pursue promotion and growth.",
      tw: "事業上機遇頻出，有望在工作中承擔更多責任，展現領導才能。與上級關係和諧，可主動表達抱負，爭取晉升與發展機會。",
    },
    wealthDetail: {
      zh: "财运不错，正财稳步增加，偏财也有一定机会。可适当考虑多元化投资，但需在专业人士建议下进行，切勿孤注一掷。",
      en: "Wealth is good — regular income rises steadily and there's some windfall chance. You may consider diversified investment, but only on professional advice; never bet it all on one move.",
      tw: "財運不錯，正財穩步增加，偏財也有一定機會。可適當考慮多元化投資，但需在專業人士建議下進行，切勿孤注一擲。",
    },
    loveDetail: {
      zh: "感情方面有较强的吸引力，桃花运不错。单身的龙年朋友今年在社交场合颇受欢迎，缘分自来；已有伴侣者感情深厚，关系升温。",
      en: "You hold strong appeal in love, with good romance luck. Single Dragons are well-liked at social gatherings this year and ties come naturally; those attached find love deepening and warming.",
      tw: "感情方面有較強的吸引力，桃花運不錯。單身的龍年朋友今年在社交場合頗受歡迎，緣分自來；已有伴侶者感情深厚，關係升溫。",
    },
    healthDetail: {
      zh: "整体健康较好，但需注意血压与内分泌健康。生活节奏较快时，别忽视身体的休息信号。",
      en: "Overall health is good, but watch blood pressure and endocrine health. When the pace of life quickens, don't ignore your body's signals to rest.",
      tw: "整體健康較好，但需注意血壓與內分泌健康。生活節奏較快時，別忽視身體的休息信號。",
    },
    luckyDirection: { zh: "东南方", en: "Southeast", tw: "東南方" },
    luckyColor: { zh: "金色、黄色", en: "Gold, Yellow", tw: "金色、黃色" },
    luckyNumber: 5,
  },
  蛇: {
    overall: 3, career: 3, wealth: 3, love: 3, health: 3,
    taishiRelation: { zh: "平稳入岁", en: "Stable Year", tw: "平穩入歲" },
    summary: {
      zh: "2026年属蛇的你运势平稳，虽无大起伏，但做事踏实勤奋，积累的力量在这一年会有明显体现。保持低调务实的风格，韬光养晦，来年可期大展。",
      en: "In 2026 the Snake's fortune is steady; though without big swings, your solid, diligent work shows its accumulated strength clearly this year. Keep a low-key, practical style and bide your time — next year holds promise of greater things.",
      tw: "2026年屬蛇的你運勢平穩，雖無大起伏，但做事踏實勤奮，積累的力量在這一年會有明顯體現。保持低調務實的風格，韜光養晦，來年可期大展。",
    },
    careerDetail: {
      zh: "工作中注重细节和专业能力的提升，会带来稳定的认可。不宜追求冒进，专注眼前的工作质量，好的结果自然水到渠成。",
      en: "Focusing on detail and sharpening your professional skills brings steady recognition. Don't rush ahead; concentrate on the quality of the work at hand, and good results will follow naturally.",
      tw: "工作中注重細節和專業能力的提升，會帶來穩定的認可。不宜追求冒進，專注眼前的工作質量，好的結果自然水到渠成。",
    },
    wealthDetail: {
      zh: "财运中等，收入平稳。避免赌博和高风险投机，稳健储蓄是今年的财运密码。可以考虑参加理财培训，提升财商。",
      en: "Wealth is average with steady income. Avoid gambling and high-risk speculation — steady saving is this year's money code. Consider financial training to raise your money sense.",
      tw: "財運中等，收入平穩。避免賭博和高風險投機，穩健儲蓄是今年的財運密碼。可以考慮參加理財培訓，提升財商。",
    },
    loveDetail: {
      zh: "感情平淡而真实，需要主动创造浪漫。单身者建议扩大社交圈，参加兴趣社群活动，通过共同爱好结缘。",
      en: "Love is plain but genuine; you'll need to create romance yourself. Singles should widen their social circle and join interest groups, connecting through shared hobbies.",
      tw: "感情平淡而真實，需要主動創造浪漫。單身者建議擴大社交圈，參加興趣社群活動，通過共同愛好結緣。",
    },
    healthDetail: {
      zh: "注意消化系统健康，饮食规律，少吃辛辣刺激食物。适当补充营养，保证睡眠质量。",
      en: "Mind your digestion — eat on a regular schedule and cut back on spicy, irritating food. Supplement nutrition sensibly and ensure good sleep quality.",
      tw: "注意消化系統健康，飲食規律，少吃辛辣刺激食物。適當補充營養，保證睡眠質量。",
    },
    luckyDirection: { zh: "南方", en: "South", tw: "南方" },
    luckyColor: { zh: "红色、绿色", en: "Red, Green", tw: "紅色、綠色" },
    luckyNumber: 2,
  },
  马: {
    overall: 2, career: 2, wealth: 2, love: 3, health: 2,
    taishiRelation: { zh: "值太岁（本命年）", en: "Year of Fate (Birth-Sign Year)", tw: "值太歲（本命年）" },
    summary: {
      zh: "2026年为丙午年，属马的你正值本命年，传统观念认为本命年需要格外谨慎。生活中的变化会比往年多，处处需要多想一步。佩戴红色物品或红绳可作为心理庇护。",
      en: "2026 is the Bing-Wu year, and the Horse is in its birth-sign year — tradition holds that such a year calls for extra caution. Life brings more change than usual, and you should think a step ahead at every turn. Wearing red items or a red cord can serve as psychological comfort.",
      tw: "2026年為丙午年，屬馬的你正值本命年，傳統觀念認為本命年需要格外謹慎。生活中的變化會比往年多，處處需要多想一步。佩戴紅色物品或紅繩可作為心理庇護。",
    },
    careerDetail: {
      zh: "职场上变动较多，可能面临工作调整或新挑战。保持谦逊低调，不宜锋芒毕露。踏实完成手头工作，耐心等待时机。",
      en: "Work sees frequent change; you may face role adjustments or new challenges. Stay humble and low-key, don't show too much edge. Complete the work at hand solidly and wait patiently for the right moment.",
      tw: "職場上變動較多，可能面臨工作調整或新挑戰。保持謙遜低調，不宜鋒芒畢露。踏實完成手頭工作，耐心等待時機。",
    },
    wealthDetail: {
      zh: "财运有波折，收入可能不稳定。严格管控开支，避免不必要的投资，特别是合伙生意需谨慎。",
      en: "Wealth is bumpy and income may be unstable. Control spending strictly and avoid unnecessary investment — be especially careful with partnership ventures.",
      tw: "財運有波折，收入可能不穩定。嚴格管控開支，避免不必要的投資，特別是合夥生意需謹慎。",
    },
    loveDetail: {
      zh: "感情方面需要多体谅对方，自身情绪波动较大，容易引发争执。单身者不急于求成，充实自我才是正道。",
      en: "In love, be more understanding of your partner; your own moods swing easily and can spark disputes. Singles shouldn't rush — enriching yourself is the right path.",
      tw: "感情方面需要多體諒對方，自身情緒波動較大，容易引發爭執。單身者不急於求成，充實自我才是正道。",
    },
    healthDetail: {
      zh: "本命年需特别关注身体健康，不适要及时就医，避免小病拖大。注意安全，防意外伤害。",
      en: "In your birth-sign year, pay special attention to health; see a doctor promptly when unwell and don't let minor ailments grow. Mind your safety and guard against accidents.",
      tw: "本命年需特別關注身體健康，不適要及時就醫，避免小病拖大。注意安全，防意外傷害。",
    },
    luckyDirection: { zh: "北方", en: "North", tw: "北方" },
    luckyColor: { zh: "红色（辟本命年）、黄色", en: "Red (wards the birth-sign year), Yellow", tw: "紅色（辟本命年）、黃色" },
    luckyNumber: 1,
  },
  羊: {
    overall: 3, career: 3, wealth: 4, love: 3, health: 3,
    taishiRelation: { zh: "刑太岁", en: "Punishing Tai Sui", tw: "刑太歲" },
    summary: {
      zh: "2026年属羊与午年形成三刑，有些事情容易变得复杂，口舌是非相对较多。但未午合火，有利于财运。凡事多思考再行动，减少不必要的争论，即可化刑为用。",
      en: "In 2026 the Goat forms a triple punishment with the Wu year, so some matters grow complicated and gossip and disputes are relatively common. Yet Wei and Wu combine into Fire, which favors wealth. Think before you act and cut needless arguments, and you can turn the punishment to advantage.",
      tw: "2026年屬羊與午年形成三刑，有些事情容易變得複雜，口舌是非相對較多。但未午合火，有利於財運。凡事多思考再行動，減少不必要的爭論，即可化刑為用。",
    },
    careerDetail: {
      zh: "工作中可能遭遇挑战，人际摩擦增多，需谨言慎行。专注于提升专业技能，用实力打破质疑，逆境中磨砺更显成色。",
      en: "You may meet challenges at work with more interpersonal friction; watch your words and conduct. Focus on sharpening professional skills and let competence silence doubt — adversity tempers your true mettle.",
      tw: "工作中可能遭遇挑戰，人際摩擦增多，需謹言慎行。專注於提升專業技能，用實力打破質疑，逆境中磨礪更顯成色。",
    },
    wealthDetail: {
      zh: "财运相对不错，未午合局有利财星，投资理财可稳健参与。正财收入有增长空间，但需防小人从中作梗。",
      en: "Wealth is relatively good — the Wei-Wu union favors the Wealth Star, so you can take part in steady investing. Regular income has room to grow, but guard against petty people interfering.",
      tw: "財運相對不錯，未午合局有利財星，投資理財可穩健參與。正財收入有增長空間，但需防小人從中作梗。",
    },
    loveDetail: {
      zh: "感情有小波折，双方需更多理解与包容。避免将工作压力带回家，影响家庭和谐。",
      en: "Love sees minor ups and downs; both sides need more understanding and tolerance. Avoid bringing work stress home, which disturbs family harmony.",
      tw: "感情有小波折，雙方需更多理解與包容。避免將工作壓力帶回家，影響家庭和諧。",
    },
    healthDetail: {
      zh: "注意脾胃健康，饮食调理是关键。情绪管理要加强，避免压力导致内分泌紊乱。",
      en: "Mind your spleen and stomach — dietary care is key. Strengthen emotional management to avoid stress-induced endocrine imbalance.",
      tw: "注意脾胃健康，飲食調理是關鍵。情緒管理要加強，避免壓力導致內分泌紊亂。",
    },
    luckyDirection: { zh: "西南方", en: "Southwest", tw: "西南方" },
    luckyColor: { zh: "蓝色、黑色", en: "Blue, Black", tw: "藍色、黑色" },
    luckyNumber: 4,
  },
  猴: {
    overall: 4, career: 4, wealth: 3, love: 4, health: 4,
    taishiRelation: { zh: "平稳入岁", en: "Stable Year", tw: "平穩入歲" },
    summary: {
      zh: "2026年属猴的你整体运势向好，精力旺盛，行事灵活。午年火旺，猴子的机智与活跃得到更充分的发挥，是拓展人脉、打开局面的好时机。",
      en: "In 2026 the Monkey's overall fortune trends well — energetic and nimble in action. The Wu year's strong Fire lets the Monkey's wit and liveliness shine more fully — a good time to expand connections and open up new ground.",
      tw: "2026年屬猴的你整體運勢向好，精力旺盛，行事靈活。午年火旺，猴子的機智與活躍得到更充分的發揮，是拓展人脈、打開局面的好時機。",
    },
    careerDetail: {
      zh: "职场上机灵灵动，遇到机会要果断把握。今年适合尝试新领域或新项目，多与各类人建立联结，机会往往来自意想不到的地方。",
      en: "Quick and agile at work — seize opportunities decisively when they come. This year favors trying new fields or projects; build ties with all kinds of people, for chances often come from unexpected places.",
      tw: "職場上機靈靈動，遇到機會要果斷把握。今年適合嘗試新領域或新項目，多與各類人建立聯結，機會往往來自意想不到的地方。",
    },
    wealthDetail: {
      zh: "财运中等，正财稳定，有一定偏财机会。可以适度尝试一些副业或兼职，发挥多才多艺的优势增加收入。",
      en: "Wealth is average — regular income is stable with some windfall chances. You can try side gigs or part-time work in moderation, using your versatility to boost income.",
      tw: "財運中等，正財穩定，有一定偏財機會。可以適度嘗試一些副業或兼職，發揮多才多藝的優勢增加收入。",
    },
    loveDetail: {
      zh: "感情运势活跃，社交圈广，自然会有好缘分涌现。已有伴侣者感情活泼有趣，共同尝试新事物可增进感情。",
      en: "Love fortune is lively and your social circle is wide, so good matches naturally appear. Those attached enjoy playful, fun affection — trying new things together deepens the bond.",
      tw: "感情運勢活躍，社交圈廣，自然會有好緣分湧現。已有伴侶者感情活潑有趣，共同嘗試新事物可增進感情。",
    },
    healthDetail: {
      zh: "整体健康较好，但精力消耗较大，需注意不要过度劳累。保持规律运动，让充沛的精力有个良好的出口。",
      en: "Overall health is good, but with heavy energy expenditure — be careful not to overwork. Keep regular exercise to give your abundant energy a healthy outlet.",
      tw: "整體健康較好，但精力消耗較大，需注意不要過度勞累。保持規律運動，讓充沛的精力有個良好的出口。",
    },
    luckyDirection: { zh: "东北方", en: "Northeast", tw: "東北方" },
    luckyColor: { zh: "白色、金色", en: "White, Gold", tw: "白色、金色" },
    luckyNumber: 7,
  },
  鸡: {
    overall: 3, career: 3, wealth: 3, love: 3, health: 3,
    taishiRelation: { zh: "刑冲（岁破）", en: "Punish-Clash (Year Breaker)", tw: "刑沖（歲破）" },
    summary: {
      zh: "2026年属鸡与午年构成【火炼真金】格局，压力与机遇同时来临。这一年会有明显的考验，但考验也是淬炼的过程。有天乙贵人相助，只要保持定力，高压下反而能创造出不俗成绩。",
      en: "In 2026 the Rooster and the Wu year form a 'fire refining true gold' pattern, bringing pressure and opportunity together. The year holds clear tests, but testing is also tempering. With the Heavenly Noble benefactor's help, hold your composure and you can achieve remarkable results under pressure.",
      tw: "2026年屬雞與午年構成【火煉真金】格局，壓力與機遇同時來臨。這一年會有明顯的考驗，但考驗也是淬煉的過程。有天乙貴人相助，只要保持定力，高壓下反而能創造出不俗成績。",
    },
    careerDetail: {
      zh: "工作挑战增多，可能面临更高的业绩要求或人事变动。保持专业态度，把握贵人提携，逆境中磨砺出的实力才是真正属于自己的。",
      en: "Work challenges multiply; you may face higher targets or personnel changes. Stay professional and seize a benefactor's support — strength forged in adversity is what truly becomes your own.",
      tw: "工作挑戰增多，可能面臨更高的業績要求或人事變動。保持專業態度，把握貴人提攜，逆境中磨礪出的實力才是真正屬於自己的。",
    },
    wealthDetail: {
      zh: "财运有压力，开支增加，需加强财务管理。不宜大额投资，保持手头流动资金充足，以应对突发状况。",
      en: "Wealth is under pressure with rising expenses; tighten financial management. Avoid large investments and keep ample liquid funds on hand to handle the unexpected.",
      tw: "財運有壓力，開支增加，需加強財務管理。不宜大額投資，保持手頭流動資金充足，以應對突發狀況。",
    },
    loveDetail: {
      zh: "感情中需多些耐心，减少争吵。今年工作压力大，两人需相互扶持，理解彼此的不易。",
      en: "Love calls for more patience and fewer quarrels. With heavy work pressure this year, the two of you must support each other and appreciate each other's struggles.",
      tw: "感情中需多些耐心，減少爭吵。今年工作壓力大，兩人需相互扶持，理解彼此的不易。",
    },
    healthDetail: {
      zh: "警惕呼吸系统问题，季节交替时多注意保暖。工作压力大时务必注意休息，避免积劳成疾。",
      en: "Be alert to respiratory problems and keep warm during seasonal changes. When work pressure is high, be sure to rest and avoid letting fatigue build into illness.",
      tw: "警惕呼吸系統問題，季節交替時多注意保暖。工作壓力大時務必注意休息，避免積勞成疾。",
    },
    luckyDirection: { zh: "东方", en: "East", tw: "東方" },
    luckyColor: { zh: "黄色、土色", en: "Yellow, Earth Tones", tw: "黃色、土色" },
    luckyNumber: 5,
  },
  狗: {
    overall: 4, career: 5, wealth: 4, love: 4, health: 4,
    taishiRelation: { zh: "合太岁（三合吉）", en: "Harmonizing Tai Sui (Triple Harmony, Auspicious)", tw: "合太歲（三合吉）" },
    summary: {
      zh: "2026年寅午戌三合火局，属狗的你与太岁形成吉合之势，贵人如云，上司缘、长辈缘极好！是向上突破、长远布局的绝佳之年。把握贵人提携，勇于规划未来。",
      en: "In 2026 Yin, Wu, and Xu form a triple Fire harmony, so the Dog is in auspicious accord with Tai Sui — benefactors abound, and luck with superiors and elders is excellent! A superb year to break upward and plan for the long term. Seize benefactors' support and plan your future boldly.",
      tw: "2026年寅午戌三合火局，屬狗的你與太歲形成吉合之勢，貴人如雲，上司緣、長輩緣極好！是向上突破、長遠佈局的絕佳之年。把握貴人提攜，勇於規劃未來。",
    },
    careerDetail: {
      zh: "事业上贵人相助，有望获得上司或前辈的提携与推荐。适合主动提出晋升想法，展示长期规划能力，今年的努力会有超出预期的回报。",
      en: "Benefactors aid your career; you may gain a superior's or senior's backing and recommendation. A good time to propose promotion and show long-term planning ability — this year's effort brings reward beyond expectation.",
      tw: "事業上貴人相助，有望獲得上司或前輩的提攜與推薦。適合主動提出晉升想法，展示長期規劃能力，今年的努力會有超出預期的回報。",
    },
    wealthDetail: {
      zh: "财运旺盛，正财偏财双丰收。可在专业人士建议下进行中长期投资，有利于资产增值。谨防因财生祸，低调行事。",
      en: "Wealth is strong, with both regular and windfall income flourishing. On professional advice you can make medium- to long-term investments to grow assets. Guard against trouble born of money, and stay low-key.",
      tw: "財運旺盛，正財偏財雙豐收。可在專業人士建議下進行中長期投資，有利於資產增值。謹防因財生禍，低調行事。",
    },
    loveDetail: {
      zh: "感情方面贵人相助，单身者有机会通过长辈介绍或传统方式认识优质伴侣。已婚者家庭关系和谐，长辈给予诸多支持。",
      en: "Benefactors help in love; singles may meet a fine partner through an elder's introduction or traditional means. The married enjoy a harmonious home, with much support from elders.",
      tw: "感情方面貴人相助，單身者有機會通過長輩介紹或傳統方式認識優質伴侶。已婚者家庭關係和諧，長輩給予諸多支持。",
    },
    healthDetail: {
      zh: "健康状况良好，精力旺盛。适合在这一年保持高强度的工作和学习节奏，但也要有张有弛，防止透支。",
      en: "Health is good and energy is high. This year suits a high-intensity work and study pace, but keep a rhythm of effort and rest to avoid overdrawing yourself.",
      tw: "健康狀況良好，精力旺盛。適合在這一年保持高強度的工作和學習節奏，但也要有張有弛，防止透支。",
    },
    luckyDirection: { zh: "南方", en: "South", tw: "南方" },
    luckyColor: { zh: "红色、橙色", en: "Red, Orange", tw: "紅色、橙色" },
    luckyNumber: 9,
  },
  猪: {
    overall: 3, career: 3, wealth: 3, love: 4, health: 3,
    taishiRelation: { zh: "平稳入岁", en: "Stable Year", tw: "平穩入歲" },
    summary: {
      zh: "2026年属猪的你整体运势平稳，亥水遇午火，能量平衡，诸事中规中矩。本年是深耕积累的好时机，安心专注于自己的领域，岁末将有令人满意的收获。",
      en: "In 2026 the Pig's overall fortune is steady; Hai Water meets Wu Fire in a balanced energy, and matters stay measured and orderly. This is a good year for deep cultivation — focus calmly on your own field, and a satisfying harvest awaits at year's end.",
      tw: "2026年屬豬的你整體運勢平穩，亥水遇午火，能量平衡，諸事中規中矩。本年是深耕積累的好時機，安心專注於自己的領域，歲末將有令人滿意的收穫。",
    },
    careerDetail: {
      zh: "工作中踏踏实实，发挥猪的勤恳与专注，在本职岗位上积累更多经验，为未来的发展铺路。",
      en: "Work steadily, drawing on the Pig's diligence and focus; accumulate more experience in your own post to pave the way for future growth.",
      tw: "工作中踏踏實實，發揮豬的勤懇與專注，在本職崗位上積累更多經驗，為未來的發展鋪路。",
    },
    wealthDetail: {
      zh: "财运平稳，量入为出。可以考虑开始建立长期储蓄计划，为未来大额支出做好准备。",
      en: "Wealth is steady — live within your means. Consider starting a long-term savings plan to prepare for major future expenses.",
      tw: "財運平穩，量入為出。可以考慮開始建立長期儲蓄計劃，為未來大額支出做好準備。",
    },
    loveDetail: {
      zh: "感情运势较好，情感上有贵气护佑，单身者今年缘分不错，适合主动表达心意。已恋爱者感情稳中有进。",
      en: "Love fortune is fairly good, with noble blessings over your feelings; singles see decent luck this year and should express their feelings actively. Those dating find love steadily progressing.",
      tw: "感情運勢較好，情感上有貴氣護佑，單身者今年緣分不錯，適合主動表達心意。已戀愛者感情穩中有進。",
    },
    healthDetail: {
      zh: "注意日常保养，均衡饮食。今年肠胃可能有些不适，清淡规律饮食是关键。",
      en: "Mind daily upkeep and a balanced diet. The stomach may be a bit off this year — a light, regular diet is key.",
      tw: "注意日常保養，均衡飲食。今年腸胃可能有些不適，清淡規律飲食是關鍵。",
    },
    luckyDirection: { zh: "西北方", en: "Northwest", tw: "西北方" },
    luckyColor: { zh: "蓝色、灰色", en: "Blue, Gray", tw: "藍色、灰色" },
    luckyNumber: 6,
  },
};

/** 解析生肖流年运势（未知生肖返回 undefined），数值字段保持不变 */
export function getZodiacFortune(zodiac: string, lang: Lang): ZodiacFortune | undefined {
  const raw = ZODIAC_2026_FORTUNE_RAW[zodiac];
  if (!raw) return undefined;
  return {
    overall: raw.overall,
    career: raw.career,
    wealth: raw.wealth,
    love: raw.love,
    health: raw.health,
    summary: rs(raw.summary, lang),
    careerDetail: rs(raw.careerDetail, lang),
    wealthDetail: rs(raw.wealthDetail, lang),
    loveDetail: rs(raw.loveDetail, lang),
    healthDetail: rs(raw.healthDetail, lang),
    taishiRelation: rs(raw.taishiRelation, lang),
    luckyDirection: rs(raw.luckyDirection, lang),
    luckyColor: rs(raw.luckyColor, lang),
    luckyNumber: raw.luckyNumber,
  };
}

// ===== 年柱四大宫位解读 =====
export interface PillarReading {
  title: string;
  description: string;
}
type PillarKey = "year" | "month" | "day" | "hour";

const PILLAR_READINGS_RAW: Record<PillarKey, { title: L; description: L }> = {
  year: {
    title: { zh: "年柱 · 先天根基", en: "Year Pillar · Innate Roots", tw: "年柱 · 先天根基" },
    description: {
      zh: "代表你的家庭背景、童年印记与命运的根基，也反映了祖先留给你的基因遗传与家族业力。",
      en: "Represents your family background, the imprint of childhood, and the roots of your destiny — it also reflects the genetic inheritance and ancestral karma your forebears passed on.",
      tw: "代表你的家庭背景、童年印記與命運的根基，也反映了祖先留給你的基因遺傳與家族業力。",
    },
  },
  month: {
    title: { zh: "月柱 · 内在性格", en: "Month Pillar · Inner Character", tw: "月柱 · 內在性格" },
    description: {
      zh: "代表你的内心世界、性格特质与成长过程中形成的核心个性，也象征着父母对你的影响。",
      en: "Represents your inner world, your character traits, and the core personality formed in growing up — it also symbolizes your parents' influence on you.",
      tw: "代表你的內心世界、性格特質與成長過程中形成的核心個性，也象徵著父母對你的影響。",
    },
  },
  day: {
    title: { zh: "日柱 · 本我能力", en: "Day Pillar · Core Self", tw: "日柱 · 本我能力" },
    description: {
      zh: "日主天干代表【你】本人，最能体现你的核心人格、天赋才能与处世方式，也主宰感情缘分。",
      en: "The Day Master Heavenly Stem represents you yourself — it best expresses your core personality, natural talents, and way of engaging the world, and it governs your romantic affinity.",
      tw: "日主天干代表【你】本人，最能體現你的核心人格、天賦才能與處世方式，也主宰感情緣分。",
    },
  },
  hour: {
    title: { zh: "时柱 · 晚运机遇", en: "Hour Pillar · Later-Life Fortune", tw: "時柱 · 晚運機遇" },
    description: {
      zh: "代表你的晚年运势、子女缘分、职业机遇与内心最深处的渴望，以及你对未来的期许。",
      en: "Represents your later-life fortune, affinity with children, career opportunities, your deepest inner longings, and your hopes for the future.",
      tw: "代表你的晚年運勢、子女緣分、職業機遇與內心最深處的渴望，以及你對未來的期許。",
    },
  },
};

/** 解析单个宫位解读 */
export function getPillarReading(key: PillarKey, lang: Lang): PillarReading {
  const raw = PILLAR_READINGS_RAW[key];
  return { title: rs(raw.title, lang), description: rs(raw.description, lang) };
}

// ===== 五行相生相克关系（语言中立，仅五行字形） =====
export const ELEMENT_RELATIONS: Record<string, { generates: string; controls: string; generatedBy: string; controlledBy: string }> = {
  木: { generates: "火", controls: "土", generatedBy: "水", controlledBy: "金" },
  火: { generates: "土", controls: "金", generatedBy: "木", controlledBy: "水" },
  土: { generates: "金", controls: "水", generatedBy: "火", controlledBy: "木" },
  金: { generates: "水", controls: "木", generatedBy: "土", controlledBy: "火" },
  水: { generates: "木", controls: "火", generatedBy: "金", controlledBy: "土" },
};
