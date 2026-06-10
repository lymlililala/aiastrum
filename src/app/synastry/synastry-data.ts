// ===== 星盘合盘（Synastry）数据层 =====
// 合盘相位文案、关系类型解读、契合度数据

import type { ZodiacSign, Planet, AspectType } from "../astro/astro-data";
export type { ZodiacSign, Planet, AspectType };

// ===== 多语言本地化结构 =====
// 数据层可翻译文本统一使用 L = { zh, en, tw }。
// engine 在构建 SynastryResult 前会按 lang 把这些结构解析为纯 string，
// 因此 SynastryResult 的字段类型保持 string 不变。
export type Lang = "zh" | "en" | "tw";
/** 单条本地化字符串 */
export type L = { zh: string; en: string; tw: string };
/** 解析单条本地化字符串 */
export function rs(v: L, lang: Lang): string {
  return v[lang];
}

// ===== 关系类型 =====
export type RelationType = "love" | "friendship" | "work";

export const RELATION_TYPES: Record<RelationType, {
  label: L;
  icon: string;
  desc: L;
  color: string;
  gradientFrom: string;
  gradientTo: string;
}> = {
  love: {
    label: { zh: "爱情 / 婚姻", en: "Love / Marriage", tw: "愛情 / 婚姻" },
    icon: "💫",
    desc: {
      zh: "探索两人之间的浪漫吸引力、情感共鸣与灵魂契合",
      en: "Explore the romantic attraction, emotional resonance, and soul connection between you two",
      tw: "探索兩人之間的浪漫吸引力、情感共鳴與靈魂契合",
    },
    color: "#E91E8C",
    gradientFrom: "#7B2D8B",
    gradientTo: "#E91E8C",
  },
  friendship: {
    label: { zh: "友情 / 闺蜜", en: "Friendship", tw: "友情 / 閨蜜" },
    icon: "✨",
    desc: {
      zh: "了解两人之间的沟通默契、共同趣味与精神共鸣",
      en: "Discover the rapport, shared interests, and mental resonance between you two",
      tw: "了解兩人之間的溝通默契、共同趣味與精神共鳴",
    },
    color: "#4A9ECA",
    gradientFrom: "#1E5FA0",
    gradientTo: "#4A9ECA",
  },
  work: {
    label: { zh: "工作 / 合伙", en: "Work / Partnership", tw: "工作 / 合夥" },
    icon: "⚡",
    desc: {
      zh: "分析两人之间的执行默契、目标一致性与互补优势",
      en: "Analyze the execution chemistry, goal alignment, and complementary strengths between you two",
      tw: "分析兩人之間的執行默契、目標一致性與互補優勢",
    },
    color: "#C9A84C",
    gradientFrom: "#8B6500",
    gradientTo: "#C9A84C",
  },
};

/** 解析关系类型为面向组件的纯字符串结构（label/desc 已按 lang 解析） */
export function getRelationType(type: RelationType, lang: Lang) {
  const r = RELATION_TYPES[type];
  return {
    label: rs(r.label, lang),
    icon: r.icon,
    desc: rs(r.desc, lang),
    color: r.color,
    gradientFrom: r.gradientFrom,
    gradientTo: r.gradientTo,
  };
}

// ===== 合盘重点行星配置 =====
// 不同关系类型关注不同的行星对
export const RELATION_KEY_PLANETS: Record<RelationType, Array<{ p1: Planet; p2: Planet; weight: number; label: string }>> = {
  love: [
    { p1: "Venus", p2: "Mars",   weight: 3.0, label: "金星-火星（浪漫吸引）" },
    { p1: "Sun",   p2: "Moon",   weight: 2.5, label: "太阳-月亮（灵魂共鸣）" },
    { p1: "Moon",  p2: "Moon",   weight: 2.0, label: "月亮-月亮（情感共振）" },
    { p1: "Venus", p2: "Venus",  weight: 1.5, label: "金星-金星（审美契合）" },
    { p1: "Sun",   p2: "Venus",  weight: 2.0, label: "太阳-金星（温柔爱意）" },
    { p1: "Sun",   p2: "Sun",    weight: 1.5, label: "太阳-太阳（人生方向）" },
    { p1: "Moon",  p2: "Venus",  weight: 2.0, label: "月亮-金星（情感滋养）" },
    { p1: "Mars",  p2: "Moon",   weight: 1.8, label: "火星-月亮（激情照顾）" },
  ],
  friendship: [
    { p1: "Mercury", p2: "Mercury", weight: 3.0, label: "水星-水星（思维共鸣）" },
    { p1: "Sun",     p2: "Sun",     weight: 2.5, label: "太阳-太阳（核心共鸣）" },
    { p1: "Jupiter", p2: "Sun",     weight: 2.0, label: "木星-太阳（相互激励）" },
    { p1: "Mercury", p2: "Moon",    weight: 2.0, label: "水星-月亮（深层理解）" },
    { p1: "Venus",   p2: "Jupiter", weight: 1.8, label: "金星-木星（共同乐趣）" },
    { p1: "Moon",    p2: "Moon",    weight: 2.5, label: "月亮-月亮（情感共振）" },
    { p1: "Sun",     p2: "Jupiter", weight: 1.5, label: "太阳-木星（共同成长）" },
  ],
  work: [
    { p1: "Sun",     p2: "Saturn",  weight: 3.0, label: "太阳-土星（目标-纪律）" },
    { p1: "Mars",    p2: "Mars",    weight: 2.5, label: "火星-火星（执行力）" },
    { p1: "Sun",     p2: "Mars",    weight: 2.0, label: "太阳-火星（行动驱动）" },
    { p1: "Mercury", p2: "Saturn",  weight: 2.0, label: "水星-土星（沟通-结构）" },
    { p1: "Mercury", p2: "Mercury", weight: 1.8, label: "水星-水星（思路一致）" },
    { p1: "Jupiter", p2: "Saturn",  weight: 2.5, label: "木星-土星（扩张-稳固）" },
    { p1: "Sun",     p2: "Sun",     weight: 1.5, label: "太阳-太阳（使命共鸣）" },
  ],
};

// ===== 合盘相位文案 =====
// 按关系类型 × 行星对 × 相位类型生成大白话解读
export interface SynastryAspectText {
  shortTitle: L;        // 3-5字标题（多语言）
  description: L;       // 2-3句大白话解读（多语言）
  score: number;        // 该相位对契合度的影响分（-20 ~ +20）
}

// 相位基础特性
export const ASPECT_BASE_SCORE: Record<AspectType, number> = {
  conjunction: 15,  // 合相：最强，可正可负
  trine: 18,        // 三分相：和谐流畅
  sextile: 12,      // 六分相：友好机会
  square: -8,       // 四分相：张力摩擦
  opposition: 5,    // 对分相：互补吸引，也有张力
};

// ===== 核心相位文案库（爱情模式）=====
export const LOVE_ASPECT_TEXTS: Record<string, Record<AspectType, SynastryAspectText>> = {
  "Venus-Mars": {
    conjunction: {
      shortTitle: { zh: "灼热吸引", en: "Burning Attraction", tw: "灼熱吸引" },
      description: {
        zh: "你的金星与TA的火星产生了合相——这是占星中最直接的爱欲磁场。你身上有某种东西让TA无法抗拒，而TA的出现也让你感到血液加速。这份吸引力不仅是精神上的，更是那种想要靠近的本能冲动。",
        en: "Your Venus conjuncts their Mars — the most direct field of desire in astrology. There is something about you they simply cannot resist, and their presence makes your blood run faster. This pull is not just spiritual; it's a raw, instinctive urge to be close.",
        tw: "你的金星與TA的火星產生了合相——這是占星中最直接的愛慾磁場。你身上有某種東西讓TA無法抗拒，而TA的出現也讓你感到血液加速。這份吸引力不僅是精神上的，更是那種想要靠近的本能衝動。",
      },
      score: 20,
    },
    trine: {
      shortTitle: { zh: "自然流淌", en: "Effortless Flow", tw: "自然流淌" },
      description: {
        zh: "你们之间的浪漫感情是流淌出来的，不需要刻意维系。你的审美与TA的行动力高度兼容，TA知道怎样用行动让你感到被珍视，而你也让TA的激情有了绽放的舞台。这是一种让人身心舒展的吸引。",
        en: "Romance flows naturally between you, with no effort required to sustain it. Your sense of beauty and their drive are highly compatible — they know how to make you feel cherished through action, and you give their passion a stage to bloom. This is an attraction that lets body and soul relax.",
        tw: "你們之間的浪漫感情是流淌出來的，不需要刻意維繫。你的審美與TA的行動力高度兼容，TA知道怎樣用行動讓你感到被珍視，而你也讓TA的激情有了綻放的舞台。這是一種讓人身心舒展的吸引。",
      },
      score: 18,
    },
    sextile: {
      shortTitle: { zh: "温柔默契", en: "Gentle Rapport", tw: "溫柔默契" },
      description: {
        zh: "你们之间有一种让人愉快的化学反应，虽然不是那种烈焰式的炙热，但有着难得的温柔默契。一起做很多事情都会感到轻松、有趣，浪漫在生活细节中自然萌发。",
        en: "There's a pleasant chemistry between you — not a blazing fire, but a rare and tender rapport. Doing things together feels easy and fun, and romance buds naturally in the small details of daily life.",
        tw: "你們之間有一種讓人愉快的化學反應，雖然不是那種烈焰式的熾熱，但有著難得的溫柔默契。一起做很多事情都會感到輕鬆、有趣，浪漫在生活細節中自然萌發。",
      },
      score: 13,
    },
    square: {
      shortTitle: { zh: "欲罢不能", en: "Can't Let Go", tw: "慾罷不能" },
      description: {
        zh: "你们之间的吸引力是真实的，但也伴随着摩擦。TA的行事风格有时让你觉得过于粗糙或冲动，而你在TA眼中有时显得难以捉摸。但这种张力本身就是磁场，越挣扎越想靠近，是那种让人上瘾的感情。",
        en: "The attraction between you is real, but it comes with friction. Their style can feel too rough or impulsive to you, while you may seem hard to read in their eyes. Yet this tension is itself the magnetism — the more you resist, the closer you want to be. It's the kind of love that becomes addictive.",
        tw: "你們之間的吸引力是真實的，但也伴隨著摩擦。TA的行事風格有時讓你覺得過於粗糙或衝動，而你在TA眼中有時顯得難以捉摸。但這種張力本身就是磁場，越掙扎越想靠近，是那種讓人上癮的感情。",
      },
      score: -5,
    },
    opposition: {
      shortTitle: { zh: "两极相吸", en: "Opposites Attract", tw: "兩極相吸" },
      description: {
        zh: "你们像磁铁的两极——截然不同，但无法不被对方吸引。你身上有TA缺少的东西，TA也填补了你内心的某个空缺。这种互补式的吸引力极具爆发力，只是需要学会接受彼此的差异。",
        en: "You're like two poles of a magnet — utterly different, yet unable not to be drawn to each other. You hold what they lack, and they fill a void inside you. This complementary attraction is explosive; you only need to learn to accept your differences.",
        tw: "你們像磁鐵的兩極——截然不同，但無法不被對方吸引。你身上有TA缺少的東西，TA也填補了你內心的某個空缺。這種互補式的吸引力極具爆發力，只是需要學會接受彼此的差異。",
      },
      score: 8,
    },
  },
  "Sun-Moon": {
    conjunction: {
      shortTitle: { zh: "灵魂合一", en: "Souls as One", tw: "靈魂合一" },
      description: {
        zh: "TA的太阳（核心自我）与你的月亮（情感世界）完全重叠——这是占星中'前世夫妻'最典型的相位。TA的存在让你有一种被深度理解的安全感，而TA在你身边也感到异常放松，仿佛回到家一样。",
        en: "Their Sun (core self) overlaps completely with your Moon (emotional world) — the classic 'soulmate' aspect in astrology. Their presence gives you a deep sense of being understood and safe, and by your side they feel unusually relaxed, as if coming home.",
        tw: "TA的太陽（核心自我）與你的月亮（情感世界）完全重疊——這是占星中「前世夫妻」最典型的相位。TA的存在讓你有一種被深度理解的安全感，而TA在你身邊也感到異常放鬆，彷彿回到家一樣。",
      },
      score: 20,
    },
    trine: {
      shortTitle: { zh: "温暖照耀", en: "Warm Radiance", tw: "溫暖照耀" },
      description: {
        zh: "TA的阳光能量滋养着你的情绪世界，而你的感性回应也让TA觉得自己是被需要的、有价值的。你们在一起时，不需要表演，不需要迎合，只是'做自己'就已经是最好的礼物。",
        en: "Their sunny energy nourishes your emotional world, and your sensitive response makes them feel needed and valued. Together you don't need to perform or please — simply 'being yourselves' is already the best gift.",
        tw: "TA的陽光能量滋養著你的情緒世界，而你的感性回應也讓TA覺得自己是被需要的、有價值的。你們在一起時，不需要表演，不需要迎合，只是「做自己」就已經是最好的禮物。",
      },
      score: 19,
    },
    sextile: {
      shortTitle: { zh: "轻松相伴", en: "Easy Companionship", tw: "輕鬆相伴" },
      description: {
        zh: "你们之间有种轻盈的适配感，相处不费力，也不会有太多误解。TA的个性风格和你的情感需求存在天然的友好区域，共同生活中自然会涌现出很多小小的温暖和默契时刻。",
        en: "There's a light sense of fit between you — being together takes little effort and brings few misunderstandings. Their personality and your emotional needs share a naturally friendly zone, and daily life brings out many small moments of warmth and rapport.",
        tw: "你們之間有種輕盈的適配感，相處不費力，也不會有太多誤解。TA的個性風格和你的情感需求存在天然的友好區域，共同生活中自然會湧現出很多小小的溫暖和默契時刻。",
      },
      score: 13,
    },
    square: {
      shortTitle: { zh: "爱恨交织", en: "Love and Friction", tw: "愛恨交織" },
      description: {
        zh: "你的情感需求和TA的人生方向之间存在内在的张力。TA追求的某些东西可能会无意中让你感到不安全，而你的情绪起伏有时也让TA不知所措。但如果你们愿意深入沟通，这种张力往往能激发出最深刻的成长。",
        en: "There's an inner tension between your emotional needs and their life direction. Some of what they pursue may unintentionally make you feel insecure, while your emotional ups and downs can leave them at a loss. Yet if you're willing to communicate deeply, this tension often sparks the most profound growth.",
        tw: "你的情感需求和TA的人生方向之間存在內在的張力。TA追求的某些東西可能會無意中讓你感到不安全，而你的情緒起伏有時也讓TA不知所措。但如果你們願意深入溝通，這種張力往往能激發出最深刻的成長。",
      },
      score: -6,
    },
    opposition: {
      shortTitle: { zh: "镜中自我", en: "Mirror of Self", tw: "鏡中自我" },
      description: {
        zh: "TA像一面镜子，映照出你不曾看见的自己。TA的人生目标和你的情感模式形成了有趣的对照，有时会产生'TA怎么可以这样'的困惑，但深入了解后你会发现，TA恰好是你内心另一半的投影。",
        en: "They're like a mirror, reflecting a self you've never seen. Their life goals and your emotional patterns form an intriguing contrast, sometimes leaving you puzzled — 'how can they be like that?' — but on deeper understanding you'll find they are exactly the projection of your inner other half.",
        tw: "TA像一面鏡子，映照出你不曾看見的自己。TA的人生目標和你的情感模式形成了有趣的對照，有時會產生「TA怎麼可以這樣」的困惑，但深入了解後你會發現，TA恰好是你內心另一半的投影。",
      },
      score: 7,
    },
  },
  "Moon-Moon": {
    conjunction: {
      shortTitle: { zh: "情绪共振", en: "Emotional Resonance", tw: "情緒共振" },
      description: {
        zh: "你们的月亮重叠，意味着你们的情绪世界高度相似。同一件事可以让你们有相同的感受，难过时不用解释，快乐时不需要铺垫。这种无声的情感联结是最难得的，像是从同一片土壤里长出来的两棵树。",
        en: "Your Moons overlap, meaning your emotional worlds are remarkably alike. The same event evokes the same feeling in you both — no need to explain when sad, no need to set up when happy. This wordless emotional bond is rare, like two trees grown from the same soil.",
        tw: "你們的月亮重疊，意味著你們的情緒世界高度相似。同一件事可以讓你們有相同的感受，難過時不用解釋，快樂時不需要鋪墊。這種無聲的情感聯結是最難得的，像是從同一片土壤裡長出來的兩棵樹。",
      },
      score: 18,
    },
    trine: {
      shortTitle: { zh: "情感滋养", en: "Emotional Nourishment", tw: "情感滋養" },
      description: {
        zh: "你们的情感表达方式高度兼容，能轻松读懂对方的情绪信号。TA的情绪状态不会让你觉得奇怪，你的感受TA也能自然接收。在一起的时候有种天然的安全感，不容易因为情绪误解而产生冲突。",
        en: "Your ways of expressing emotion are highly compatible, and you read each other's signals with ease. Their moods never seem strange to you, and your feelings reach them naturally. Together there's an innate sense of safety, and conflict rarely arises from emotional misreading.",
        tw: "你們的情感表達方式高度兼容，能輕鬆讀懂對方的情緒信號。TA的情緒狀態不會讓你覺得奇怪，你的感受TA也能自然接收。在一起的時候有種天然的安全感，不容易因為情緒誤解而產生衝突。",
      },
      score: 17,
    },
    sextile: {
      shortTitle: { zh: "温暖流通", en: "Warm Exchange", tw: "溫暖流通" },
      description: {
        zh: "你们的情绪能量能够顺畅流动，相处时感觉放松不压抑。虽然不是那种'灵魂伴侣'式的深度共鸣，但有着令人愉悦的情感交流，一起度过的时光总是让人感到充电了一样。",
        en: "Your emotional energies flow smoothly, and being together feels relaxed and unburdened. It may not be that deep 'soulmate' resonance, but there's a delightful emotional exchange, and time spent together always feels recharging.",
        tw: "你們的情緒能量能夠順暢流動，相處時感覺放鬆不壓抑。雖然不是那種「靈魂伴侶」式的深度共鳴，但有著令人愉悅的情感交流，一起度過的時光總是讓人感到充電了一樣。",
      },
      score: 12,
    },
    square: {
      shortTitle: { zh: "情感误读", en: "Misreading Feelings", tw: "情感誤讀" },
      description: {
        zh: "你们的情绪模式之间存在一些内在的冲突——有时候TA正需要空间，你却想靠近；有时候你需要安慰，TA给出的方式又不对路。但这种'情感语言'的差异并非不可逾越，学会彼此的情绪密码是关键。",
        en: "There's some inner conflict between your emotional patterns — sometimes they need space while you want to come closer; sometimes you need comfort but their way of giving it misses the mark. Yet this difference in 'emotional language' isn't insurmountable; learning each other's emotional code is key.",
        tw: "你們的情緒模式之間存在一些內在的衝突——有時候TA正需要空間，你卻想靠近；有時候你需要安慰，TA給出的方式又不對路。但這種「情感語言」的差異並非不可逾越，學會彼此的情緒密碼是關鍵。",
      },
      score: -8,
    },
    opposition: {
      shortTitle: { zh: "情感互补", en: "Emotional Complement", tw: "情感互補" },
      description: {
        zh: "你们的情绪需求是互补的：一方需要主动给予，另一方更需要接受；一方习惯压抑，另一方更易释放。这种对比既可能产生紧张感，也可能形成完美的平衡——取决于你们是否愿意向对方靠拢半步。",
        en: "Your emotional needs are complementary: one needs to give actively, the other to receive; one tends to hold back, the other to release more easily. This contrast can create tension or form a perfect balance — depending on whether you're willing to take half a step toward each other.",
        tw: "你們的情緒需求是互補的：一方需要主動給予，另一方更需要接受；一方習慣壓抑，另一方更易釋放。這種對比既可能產生緊張感，也可能形成完美的平衡——取決於你們是否願意向對方靠攏半步。",
      },
      score: 6,
    },
  },
  "Sun-Venus": {
    conjunction: {
      shortTitle: { zh: "迷人的爱", en: "Enchanting Love", tw: "迷人的愛" },
      description: {
        zh: "TA的阳光特质完全符合你对美的感知，你们天然互相欣赏。在TA眼里，你是优雅的；在你眼里，TA是闪闪发光的。这种相互欣赏是感情里最美好的基础，让双方都觉得自己是被珍视的宝物。",
        en: "Their sunny qualities perfectly match your sense of beauty, and you naturally admire each other. In their eyes you're elegant; in yours they shine. This mutual appreciation is the loveliest foundation of a relationship, making each of you feel like a treasured gem.",
        tw: "TA的陽光特質完全符合你對美的感知，你們天然互相欣賞。在TA眼裡，你是優雅的；在你眼裡，TA是閃閃發光的。這種相互欣賞是感情裡最美好的基礎，讓雙方都覺得自己是被珍視的寶物。",
      },
      score: 18,
    },
    trine: {
      shortTitle: { zh: "甜蜜欣赏", en: "Sweet Admiration", tw: "甜蜜欣賞" },
      description: {
        zh: "你们有一种轻松愉快的相互欣赏，TA自然地展现出你认为美好的品质，而你也能让TA感受到被真心欣赏的满足感。这段感情的氛围总体是甜蜜的，拌嘴少，小幸福多。",
        en: "You share an easy, joyful mutual admiration — they naturally display the qualities you find beautiful, and you make them feel the satisfaction of being genuinely appreciated. The overall mood of this bond is sweet: few squabbles, many small joys.",
        tw: "你們有一種輕鬆愉快的相互欣賞，TA自然地展現出你認為美好的品質，而你也能讓TA感受到被真心欣賞的滿足感。這段感情的氛圍總體是甜蜜的，拌嘴少，小幸福多。",
      },
      score: 16,
    },
    sextile: {
      shortTitle: { zh: "欣赏与喜欢", en: "Liking and Esteem", tw: "欣賞與喜歡" },
      description: {
        zh: "你们之间有着健康的喜爱与欣赏，能在对方身上找到真实的魅力点。不是那种惊天动地的爱，但是一种踏实的、持续的好感，让日子过起来有一种恬淡的甜。",
        en: "There's a healthy fondness and esteem between you, and you find real charm in each other. It's not an earth-shaking love, but a grounded, steady affection that lends daily life a quiet sweetness.",
        tw: "你們之間有著健康的喜愛與欣賞，能在對方身上找到真實的魅力點。不是那種驚天動地的愛，但是一種踏實的、持續的好感，讓日子過起來有一種恬淡的甜。",
      },
      score: 11,
    },
    square: {
      shortTitle: { zh: "爱中摩擦", en: "Friction in Love", tw: "愛中摩擦" },
      description: {
        zh: "你可能觉得TA不懂欣赏你；TA有时也觉得你的某些价值观和TA不在一个频道。但这些分歧恰恰说明你们各自都有鲜明的个性，磨合的过程可能漫长，但最终会找到独特的相处方式。",
        en: "You may feel they don't appreciate you; they may feel some of your values aren't on their wavelength. But these differences are exactly what shows you each have a distinct personality. The adjusting may take a while, but you'll eventually find your own unique way of being together.",
        tw: "你可能覺得TA不懂欣賞你；TA有時也覺得你的某些價值觀和TA不在一個頻道。但這些分歧恰恰說明你們各自都有鮮明的個性，磨合的過程可能漫長，但最終會找到獨特的相處方式。",
      },
      score: -7,
    },
    opposition: {
      shortTitle: { zh: "不同魅力", en: "Different Charms", tw: "不同魅力" },
      description: {
        zh: "你和TA对'美'和'价值'的理解来自不同的方向，TA的闪光点不一定是你最初期待的类型，但会让你逐渐发现不同的美。这是一段能拓宽彼此视野的关系，带来新鲜感的同时也需要包容度。",
        en: "You and they understand 'beauty' and 'value' from different directions. Their highlights may not be the type you first expected, but they'll lead you to discover a different kind of beauty. This is a relationship that broadens each other's horizons — bringing freshness while also asking for tolerance.",
        tw: "你和TA對「美」和「價值」的理解來自不同的方向，TA的閃光點不一定是你最初期待的類型，但會讓你逐漸發現不同的美。這是一段能拓寬彼此視野的關係，帶來新鮮感的同時也需要包容度。",
      },
      score: 7,
    },
  },
  "Mars-Moon": {
    conjunction: {
      shortTitle: { zh: "保护与激情", en: "Protection and Passion", tw: "保護與激情" },
      description: {
        zh: "TA的行动力与你的情感需求紧密交织——TA想要为你做些什么，而你的存在本身就激发了TA的行动力和保护欲。这是一种充满温度的动态，有激情，有照顾，有一种'被人在乎着'的踏实感。",
        en: "Their drive intertwines tightly with your emotional needs — they want to do things for you, and your very presence sparks their initiative and protectiveness. It's a warm dynamic, full of passion and care, with a grounded sense of 'being cared for.'",
        tw: "TA的行動力與你的情感需求緊密交織——TA想要為你做些什麼，而你的存在本身就激發了TA的行動力和保護慾。這是一種充滿溫度的動態，有激情，有照顧，有一種「被人在乎著」的踏實感。",
      },
      score: 17,
    },
    trine: {
      shortTitle: { zh: "温暖驱动", en: "Warm Drive", tw: "溫暖驅動" },
      description: {
        zh: "你们之间有一种行动与情感的和谐流动。TA善于用行动来表达关心，而你的情感回应也让TA的付出得到了最好的接收。在一起的时候，既有激情，也有安全感。",
        en: "There's a harmonious flow between action and feeling. They express care well through action, and your emotional response lets their efforts land in the best way. Together there's both passion and a sense of safety.",
        tw: "你們之間有一種行動與情感的和諧流動。TA善於用行動來表達關心，而你的情感回應也讓TA的付出得到了最好的接收。在一起的時候，既有激情，也有安全感。",
      },
      score: 16,
    },
    sextile: {
      shortTitle: { zh: "温和激励", en: "Gentle Encouragement", tw: "溫和激勵" },
      description: {
        zh: "你们之间有着温和而积极的互动，TA的行动力能给你带来安心感，而你的情绪反馈也是TA前进的小小动力。不是那种狂热的激情，但是踏实的温暖。",
        en: "Your interaction is gentle and positive — their drive brings you reassurance, and your emotional feedback is a small motivation for them to keep going. Not fervent passion, but a grounded warmth.",
        tw: "你們之間有著溫和而積極的互動，TA的行動力能給你帶來安心感，而你的情緒反饋也是TA前進的小小動力。不是那種狂熱的激情，但是踏實的溫暖。",
      },
      score: 11,
    },
    square: {
      shortTitle: { zh: "激与伤", en: "Spark and Sting", tw: "激與傷" },
      description: {
        zh: "TA的行事方式有时会无意中触碰到你的情感痛点，TA可能太过直接，你可能太过敏感——但这不是谁的错，是能量模式的碰撞。如果愿意放慢脚步、好好沟通，这段关系可以深刻地让彼此成长。",
        en: "Their way of doing things can unintentionally touch your emotional sore spots — they may be too direct, you may be too sensitive — but it's no one's fault, just a clash of energy patterns. If you're willing to slow down and communicate well, this relationship can make you both grow profoundly.",
        tw: "TA的行事方式有時會無意中觸碰到你的情感痛點，TA可能太過直接，你可能太過敏感——但這不是誰的錯，是能量模式的碰撞。如果願意放慢腳步、好好溝通，這段關係可以深刻地讓彼此成長。",
      },
      score: -9,
    },
    opposition: {
      shortTitle: { zh: "行动与柔软", en: "Action and Tenderness", tw: "行動與柔軟" },
      description: {
        zh: "一方更多用行动表达爱，另一方更多用情感接收爱；一方主动，一方被动。这种组合可以非常和谐，也可能让人感到疲惫——关键是双方是否愿意稍微走向对方的节奏。",
        en: "One expresses love more through action, the other receives love more through feeling; one is active, one passive. This pairing can be very harmonious, or it can become tiring — the key is whether both are willing to move slightly toward the other's rhythm.",
        tw: "一方更多用行動表達愛，另一方更多用情感接收愛；一方主動，一方被動。這種組合可以非常和諧，也可能讓人感到疲憊——關鍵是雙方是否願意稍微走向對方的節奏。",
      },
      score: 5,
    },
  },
};

// ===== 友情模式相位文案 =====
export const FRIENDSHIP_ASPECT_TEXTS: Record<string, Record<AspectType, SynastryAspectText>> = {
  "Mercury-Mercury": {
    conjunction: {
      shortTitle: { zh: "心有灵犀", en: "Meeting of Minds", tw: "心有靈犀" },
      description: {
        zh: "你们说话的频道是同一个——对方能懂你说的每一个梗，你也能接住对方抛出的每一个话头。这种思维上的高度契合让你们的聊天永远不会冷场，在一起既能说深刻的事，也能大笑最无聊的玩笑。",
        en: "You speak on the same channel — they get every joke you make, and you catch every thread they throw out. This high mental match means your conversations never run dry; together you can discuss the profound and laugh at the silliest jokes.",
        tw: "你們說話的頻道是同一個——對方能懂你說的每一個梗，你也能接住對方拋出的每一個話頭。這種思維上的高度契合讓你們的聊天永遠不會冷場，在一起既能說深刻的事，也能大笑最無聊的玩笑。",
      },
      score: 20,
    },
    trine: {
      shortTitle: { zh: "聊不完的话", en: "Endless Conversation", tw: "聊不完的話" },
      description: {
        zh: "你们的沟通方式天然兼容，信息在你们之间流动得毫无障碍。对方能用你最舒服的方式传递想法，你也能轻松听懂对方话里的弦外之音。是那种'话越说越多'的好朋友。",
        en: "Your communication styles are naturally compatible, and ideas flow between you without obstacle. They convey thoughts in the way that's most comfortable for you, and you easily catch the subtext in their words. The kind of friends who talk more the longer they talk.",
        tw: "你們的溝通方式天然兼容，資訊在你們之間流動得毫無障礙。對方能用你最舒服的方式傳遞想法，你也能輕鬆聽懂對方話裡的弦外之音。是那種「話越說越多」的好朋友。",
      },
      score: 18,
    },
    sextile: {
      shortTitle: { zh: "愉快交流", en: "Pleasant Exchange", tw: "愉快交流" },
      description: {
        zh: "你们的交流总是轻松愉快，不会有太多误解，也不需要反复解释。虽然不是那种'脑子装在一起'的默契，但每次聊天都会感到充实、有趣。",
        en: "Your exchanges are always light and pleasant, with few misunderstandings and little need to repeat yourselves. It may not be that 'sharing one brain' rapport, but every chat feels rich and fun.",
        tw: "你們的交流總是輕鬆愉快，不會有太多誤解，也不需要反覆解釋。雖然不是那種「腦子裝在一起」的默契，但每次聊天都會感到充實、有趣。",
      },
      score: 13,
    },
    square: {
      shortTitle: { zh: "话不投机", en: "Talking Past", tw: "話不投機" },
      description: {
        zh: "有时候你们的说话方式会产生碰撞——对方说的你觉得多余，你说的对方觉得没有必要。但这种思维上的摩擦往往是对彼此的激发，不同的角度可以拓宽视野，关键是双方是否愿意听对方的逻辑。",
        en: "Sometimes your ways of speaking collide — you find what they say redundant, they find what you say unnecessary. But this mental friction often stimulates you both; different angles broaden the view. The key is whether you're willing to hear each other's logic.",
        tw: "有時候你們的說話方式會產生碰撞——對方說的你覺得多餘，你說的對方覺得沒有必要。但這種思維上的摩擦往往是對彼此的激發，不同的角度可以拓寬視野，關鍵是雙方是否願意聽對方的邏輯。",
      },
      score: -7,
    },
    opposition: {
      shortTitle: { zh: "互补思维", en: "Complementary Minds", tw: "互補思維" },
      description: {
        zh: "你们的思维模式形成有趣的互补：一方擅长细节，另一方看大局；一方感性，另一方理性。这种组合在解决问题时往往能产生1+1>2的效果，只是日常沟通需要多一点耐心。",
        en: "Your thinking styles form an intriguing complement: one is good with details, the other sees the big picture; one is emotional, the other rational. This pairing often produces a 1+1>2 effect when solving problems — daily communication just needs a bit more patience.",
        tw: "你們的思維模式形成有趣的互補：一方擅長細節，另一方看大局；一方感性，另一方理性。這種組合在解決問題時往往能產生1+1>2的效果，只是日常溝通需要多一點耐心。",
      },
      score: 8,
    },
  },
  "Sun-Sun": {
    conjunction: {
      shortTitle: { zh: "同频共振", en: "Same Wavelength", tw: "同頻共振" },
      description: {
        zh: "你们的核心价值观和人生追求高度一致，在一起时不需要解释自己'为什么是这样的人'，对方天然能懂。这种惺惺相惜的感觉是深厚友情的最佳基础，一起做什么都有加成。",
        en: "Your core values and life pursuits are highly aligned — together you don't need to explain 'why you are this kind of person'; they just get it. This sense of kindred recognition is the best foundation for deep friendship, and whatever you do together gets a boost.",
        tw: "你們的核心價值觀和人生追求高度一致，在一起時不需要解釋自己「為什麼是這樣的人」，對方天然能懂。這種惺惺相惜的感覺是深厚友情的最佳基礎，一起做什麼都有加成。",
      },
      score: 17,
    },
    trine: {
      shortTitle: { zh: "和谐共鸣", en: "Harmonious Resonance", tw: "和諧共鳴" },
      description: {
        zh: "你们的个性和目标存在天然的和谐，在一起时不会有太多价值观上的冲突，反而会互相激励。TA的成功你真心为TA高兴，你的成就TA也真心支持——这是少见的无嫉妒友情。",
        en: "Your personalities and goals are naturally harmonious — together there's little clash of values, and you spur each other on instead. You're genuinely glad for their successes, and they truly support your achievements. This is a rare, envy-free friendship.",
        tw: "你們的個性和目標存在天然的和諧，在一起時不會有太多價值觀上的衝突，反而會互相激勵。TA的成功你真心為TA高興，你的成就TA也真心支持——這是少見的無嫉妒友情。",
      },
      score: 16,
    },
    sextile: {
      shortTitle: { zh: "良好共识", en: "Easy Consensus", tw: "良好共識" },
      description: {
        zh: "你们在很多大方向上有共识，相处起来有种默契的轻松。不一定形影不离，但每次见面都能找到共同话题，是那种'没有一直联系，但关系永远在'的朋友。",
        en: "You agree on many big directions, and being together has an easy rapport. You're not inseparable, but you always find common topics whenever you meet — the kind of friends who 'don't stay in constant touch, yet the bond is always there.'",
        tw: "你們在很多大方向上有共識，相處起來有種默契的輕鬆。不一定形影不離，但每次見面都能找到共同話題，是那種「沒有一直聯繫，但關係永遠在」的朋友。",
      },
      score: 12,
    },
    square: {
      shortTitle: { zh: "碰撞激发", en: "Sparks from Clash", tw: "碰撞激發" },
      description: {
        zh: "你们的个性或人生方向有些摩擦，有时候TA的行事风格会让你觉得'这也太……'，但也正因如此，你们反而能相互刺激成长。是那种吵架之后关系反而更好的朋友类型。",
        en: "Your personalities or life directions have some friction — sometimes their style makes you think 'that's a bit much…' — but precisely because of this, you stimulate each other's growth. The type of friends whose bond grows stronger after a quarrel.",
        tw: "你們的個性或人生方向有些摩擦，有時候TA的行事風格會讓你覺得「這也太……」，但也正因如此，你們反而能相互刺激成長。是那種吵架之後關係反而更好的朋友類型。",
      },
      score: -5,
    },
    opposition: {
      shortTitle: { zh: "互为参照", en: "Mutual Reference", tw: "互為參照" },
      description: {
        zh: "你们是彼此的镜子——TA身上有你最缺少的那种特质，你们在一起时会互相帮对方看见自己的盲点。虽然有时候会不理解对方，但这种多元视角是让彼此成长最快的友谊类型。",
        en: "You're mirrors for each other — they have the very trait you most lack, and together you help each other see your blind spots. Though you sometimes don't understand each other, this diversity of perspective makes this the kind of friendship that grows you both the fastest.",
        tw: "你們是彼此的鏡子——TA身上有你最缺少的那種特質，你們在一起時會互相幫對方看見自己的盲點。雖然有時候會不理解對方，但這種多元視角是讓彼此成長最快的友誼類型。",
      },
      score: 7,
    },
  },
  "Moon-Moon": {
    conjunction: {
      shortTitle: { zh: "情绪共鸣", en: "Emotional Resonance", tw: "情緒共鳴" },
      description: {
        zh: "你们的情感世界高度共鸣——TA难过时你能感同身受，TA开心时你也会被感染。这种情绪上的无声同频是深厚友情的基础，不需要任何解释，只需要'我懂你'三个字。",
        en: "Your emotional worlds resonate strongly — when they're sad you feel it too, when they're happy you catch it. This silent emotional attunement is the foundation of deep friendship; it needs no explanation, only the words 'I understand you.'",
        tw: "你們的情感世界高度共鳴——TA難過時你能感同身受，TA開心時你也會被感染。這種情緒上的無聲同頻是深厚友情的基礎，不需要任何解釋，只需要「我懂你」三個字。",
      },
      score: 18,
    },
    trine: {
      shortTitle: { zh: "心安所在", en: "A Place of Calm", tw: "心安所在" },
      description: {
        zh: "在TA身边你感到情绪稳定和放松，TA也把你当成了安全基地。你们不需要表演积极，可以做真实的自己，是那种'随时可以发牢骚，然后笑着继续生活'的朋友。",
        en: "By their side you feel emotionally steady and relaxed, and they treat you as a safe base too. You don't need to perform positivity; you can be your real selves — the kind of friends who 'can vent anytime, then laugh and carry on with life.'",
        tw: "在TA身邊你感到情緒穩定和放鬆，TA也把你當成了安全基地。你們不需要表演積極，可以做真實的自己，是那種「隨時可以發牢騷，然後笑著繼續生活」的朋友。",
      },
      score: 16,
    },
    sextile: {
      shortTitle: { zh: "情感流通", en: "Flowing Feelings", tw: "情感流通" },
      description: {
        zh: "你们的情绪能量之间有良好的流通，不会相互消耗，反而会相互滋养。每次深聊之后都会觉得充了电，是一段对心理健康有益的友谊。",
        en: "Your emotional energies flow well between you — instead of draining each other, you nourish each other. After every deep talk you feel recharged. It's a friendship that's good for your mental health.",
        tw: "你們的情緒能量之間有良好的流通，不會相互消耗，反而會相互滋養。每次深聊之後都會覺得充了電，是一段對心理健康有益的友誼。",
      },
      score: 12,
    },
    square: {
      shortTitle: { zh: "偶尔情绪摩擦", en: "Occasional Friction", tw: "偶爾情緒摩擦" },
      description: {
        zh: "你们的情绪模式有些不同步，有时候你的需求和TA提供的方式不在一个点上。但这不是不能克服的，只要建立起一些沟通习惯，这段友谊可以深入得出乎意料。",
        en: "Your emotional patterns are a little out of sync — sometimes your needs and the way they offer support don't quite match. But this isn't insurmountable; once you build a few communication habits, this friendship can deepen beyond expectation.",
        tw: "你們的情緒模式有些不同步，有時候你的需求和TA提供的方式不在一個點上。但這不是不能克服的，只要建立起一些溝通習慣，這段友誼可以深入得出乎意料。",
      },
      score: -6,
    },
    opposition: {
      shortTitle: { zh: "情绪互补", en: "Emotional Complement", tw: "情緒互補" },
      description: {
        zh: "你们在情感表达上形成互补：一方偏外向，另一方偏内敛；一方容易焦虑，另一方天然镇定。这种组合在彼此最脆弱的时候往往能给对方刚好需要的支撑。",
        en: "You complement each other in emotional expression: one is more outgoing, the other more reserved; one is prone to anxiety, the other naturally calm. This pairing often gives each other exactly the support needed in their most vulnerable moments.",
        tw: "你們在情感表達上形成互補：一方偏外向，另一方偏內斂；一方容易焦慮，另一方天然鎮定。這種組合在彼此最脆弱的時候往往能給對方剛好需要的支撐。",
      },
      score: 7,
    },
  },
};

// ===== 工作模式相位文案 =====
export const WORK_ASPECT_TEXTS: Record<string, Record<AspectType, SynastryAspectText>> = {
  "Sun-Saturn": {
    conjunction: {
      shortTitle: { zh: "目标与纪律", en: "Goals and Discipline", tw: "目標與紀律" },
      description: {
        zh: "TA的土星为你的太阳能量提供了稳定的结构——你的创意和驱动力遇到了TA的规划和执行力，是理想的分工组合。TA会帮你把想法落地，你会拓展TA的格局，是经典的'有梦想的人+能实现梦想的人'组合。",
        en: "Their Saturn gives your Sun energy a stable structure — your creativity and drive meet their planning and execution, an ideal division of labor. They help you bring ideas to ground, you expand their vision. A classic 'dreamer + doer' pairing.",
        tw: "TA的土星為你的太陽能量提供了穩定的結構——你的創意和驅動力遇到了TA的規劃和執行力，是理想的分工組合。TA會幫你把想法落地，你會拓展TA的格局，是經典的「有夢想的人＋能實現夢想的人」組合。",
      },
      score: 18,
    },
    trine: {
      shortTitle: { zh: "高效配合", en: "Efficient Teamwork", tw: "高效配合" },
      description: {
        zh: "你们的工作节奏天然兼容：你提供方向和动能，TA提供秩序和持续力。合作起来既不会失控，也不会僵化，有一种令人愉快的高效感。TA让你不容易脱轨，你让TA不容易固化。",
        en: "Your work rhythms are naturally compatible: you provide direction and momentum, they provide order and staying power. Collaboration neither spins out of control nor goes rigid — there's a pleasant sense of efficiency. They keep you on track, you keep them from ossifying.",
        tw: "你們的工作節奏天然兼容：你提供方向和動能，TA提供秩序和持續力。合作起來既不會失控，也不會僵化，有一種令人愉快的高效感。TA讓你不容易脫軌，你讓TA不容易固化。",
      },
      score: 17,
    },
    sextile: {
      shortTitle: { zh: "稳定合作", en: "Steady Cooperation", tw: "穩定合作" },
      description: {
        zh: "你们合作有着良好的基础稳定性，不会有大起大落，是那种能长期合作的类型。虽然不一定产出惊天动地的成果，但是可靠、踏实的伙伴关系。",
        en: "Your collaboration has good baseline stability, with no wild swings — the kind that can last long term. It may not produce earth-shaking results, but it's a reliable, grounded partnership.",
        tw: "你們合作有著良好的基礎穩定性，不會有大起大落，是那種能長期合作的類型。雖然不一定產出驚天動地的成果，但是可靠、踏實的夥伴關係。",
      },
      score: 12,
    },
    square: {
      shortTitle: { zh: "磨合中成长", en: "Growth Through Friction", tw: "磨合中成長" },
      description: {
        zh: "你的行事风格和TA的规则感之间会产生摩擦——你可能觉得TA太死板，TA可能觉得你太随性。但如果能在这种张力中找到平衡，往往能迸发出比表面上看起来更强的合作成果。",
        en: "Your style and their sense of rules create friction — you may find them too rigid, they may find you too casual. But if you can find balance within this tension, it often produces collaboration stronger than it appears on the surface.",
        tw: "你的行事風格和TA的規則感之間會產生摩擦——你可能覺得TA太死板，TA可能覺得你太隨性。但如果能在這種張力中找到平衡，往往能迸發出比表面上看起來更強的合作成果。",
      },
      score: -7,
    },
    opposition: {
      shortTitle: { zh: "方向互补", en: "Complementary Directions", tw: "方向互補" },
      description: {
        zh: "你们代表了同一件事情的两个面向：一个在扩展，一个在稳固；一个在仰望星空，一个在脚踏实地。这种对立在同一个项目中反而是互补的——只需要找到各自尊重对方的边界。",
        en: "You represent two sides of the same thing: one expanding, one consolidating; one gazing at the stars, one keeping feet on the ground. Within the same project this opposition is actually complementary — you just need to find the boundaries where you each respect the other.",
        tw: "你們代表了同一件事情的兩個面向：一個在擴展，一個在穩固；一個在仰望星空，一個在腳踏實地。這種對立在同一個項目中反而是互補的——只需要找到各自尊重對方的邊界。",
      },
      score: 8,
    },
  },
  "Mars-Mars": {
    conjunction: {
      shortTitle: { zh: "强大执行力", en: "Powerful Execution", tw: "強大執行力" },
      description: {
        zh: "你们的行动力叠加在一起，能量相当强大。一旦对准了目标，可以以惊人的速度推进。需要注意的是，两股同频的火星能量也可能带来内部竞争——确保彼此的目标一致，而非内耗。",
        en: "Your drives stack together into formidable energy. Once aimed at a target, you can push forward at astonishing speed. Note that two same-frequency Mars energies can also breed internal competition — make sure your goals align rather than drain each other.",
        tw: "你們的行動力疊加在一起，能量相當強大。一旦對準了目標，可以以驚人的速度推進。需要注意的是，兩股同頻的火星能量也可能帶來內部競爭——確保彼此的目標一致，而非內耗。",
      },
      score: 16,
    },
    trine: {
      shortTitle: { zh: "行动默契", en: "Action Rapport", tw: "行動默契" },
      description: {
        zh: "你们做事的节奏高度一致，不需要过多协调就能步调相符。项目推进时你们会自动分工，不会踩踏对方的领域，是那种'默默配合就能把事做成'的最佳搭档。",
        en: "Your pace of getting things done is highly aligned, and you fall into step without much coordination. When a project advances you divide labor automatically without stepping on each other's turf — the kind of partners who 'get it done through quiet cooperation.'",
        tw: "你們做事的節奏高度一致，不需要過多協調就能步調相符。項目推進時你們會自動分工，不會踩踏對方的領域，是那種「默默配合就能把事做成」的最佳搭檔。",
      },
      score: 17,
    },
    sextile: {
      shortTitle: { zh: "节奏和谐", en: "Harmonious Pace", tw: "節奏和諧" },
      description: {
        zh: "你们的工作节奏互相兼容，合作时不会感到被拖累或被催促。各自有各自的行动风格，但放在一起是和谐的，能平稳地推进共同目标。",
        en: "Your work rhythms are compatible, and in collaboration neither feels held back nor rushed. You each have your own style of action, yet together it's harmonious, advancing shared goals steadily.",
        tw: "你們的工作節奏互相兼容，合作時不會感到被拖累或被催促。各自有各自的行動風格，但放在一起是和諧的，能平穩地推進共同目標。",
      },
      score: 12,
    },
    square: {
      shortTitle: { zh: "策略分歧", en: "Strategy Clash", tw: "策略分歧" },
      description: {
        zh: "你们在'如何行动'这件事上可能有截然不同的偏好——一方冲锋，另一方审慎；一方快，另一方慢。这种分歧容易带来摩擦，但也可能在充分磨合后形成互相补位的强大组合。",
        en: "You may have sharply different preferences on 'how to act' — one charges ahead, the other is cautious; one is fast, the other slow. This divergence easily brings friction, but after enough adjustment it can form a powerful, mutually covering combination.",
        tw: "你們在「如何行動」這件事上可能有截然不同的偏好——一方衝鋒，另一方審慎；一方快，另一方慢。這種分歧容易帶來摩擦，但也可能在充分磨合後形成互相補位的強大組合。",
      },
      score: -8,
    },
    opposition: {
      shortTitle: { zh: "动力互补", en: "Complementary Drive", tw: "動力互補" },
      description: {
        zh: "你们的行动能量方向相反，但可以形成有趣的拉力平衡。一方擅长开创，另一方擅长收尾；一方擅长攻城，另一方擅长守土。把两种能量整合在一起，可以大幅提升合作项目的完整性。",
        en: "Your action energies point in opposite directions, yet can form an intriguing balance of pull. One excels at pioneering, the other at finishing; one at taking ground, the other at holding it. Integrating both energies greatly improves the completeness of a joint project.",
        tw: "你們的行動能量方向相反，但可以形成有趣的拉力平衡。一方擅長開創，另一方擅長收尾；一方擅長攻城，另一方擅長守土。把兩種能量整合在一起，可以大幅提升合作項目的完整性。",
      },
      score: 7,
    },
  },
  "Mercury-Mercury": {
    conjunction: {
      shortTitle: { zh: "高效沟通", en: "Efficient Communication", tw: "高效溝通" },
      description: {
        zh: "你们的思维逻辑高度一致，合作时几乎不需要重复沟通——一句话，对方就能get到你的全部意图。这种沟通效率让合作成本大大降低，是项目团队最渴望拥有的'天然默契'。",
        en: "Your thinking logic is highly aligned, so in collaboration you rarely need to repeat yourselves — one sentence and they grasp your full intent. This communication efficiency greatly lowers the cost of working together, the 'natural rapport' every project team craves.",
        tw: "你們的思維邏輯高度一致，合作時幾乎不需要重複溝通——一句話，對方就能get到你的全部意圖。這種溝通效率讓合作成本大大降低，是項目團隊最渴望擁有的「天然默契」。",
      },
      score: 19,
    },
    trine: {
      shortTitle: { zh: "清晰协作", en: "Clear Collaboration", tw: "清晰協作" },
      description: {
        zh: "你们的工作沟通流畅、清晰，误解少，执行准确。对方总能理解你的需求，你也能清楚地接收对方的信息。这种沟通上的高效是长期合作最宝贵的资产。",
        en: "Your work communication is smooth and clear, with few misunderstandings and accurate execution. They always understand your needs, and you receive their information clearly. This communication efficiency is the most valuable asset of long-term collaboration.",
        tw: "你們的工作溝通流暢、清晰，誤解少，執行準確。對方總能理解你的需求，你也能清楚地接收對方的資訊。這種溝通上的高效是長期合作最寶貴的資產。",
      },
      score: 17,
    },
    sextile: {
      shortTitle: { zh: "顺畅沟通", en: "Smooth Dialogue", tw: "順暢溝通" },
      description: {
        zh: "你们的沟通方式彼此兼容，不会有太多信息损耗。合作时对话顺畅，能快速达成共识，是一段让人愉快的职业关系。",
        en: "Your communication styles are mutually compatible, with little information loss. Dialogue flows in collaboration and consensus comes quickly — a pleasant professional relationship.",
        tw: "你們的溝通方式彼此兼容，不會有太多資訊損耗。合作時對話順暢，能快速達成共識，是一段讓人愉快的職業關係。",
      },
      score: 12,
    },
    square: {
      shortTitle: { zh: "沟通磨合", en: "Communication Friction", tw: "溝通磨合" },
      description: {
        zh: "你们在沟通方式上有一些内在的摩擦——说话的逻辑不同，或者对重要性的判断有分歧。这需要在合作初期投入更多的沟通成本，但一旦建立起共同语言，之后的合作会顺畅许多。",
        en: "There's some inner friction in your communication styles — different logic in how you speak, or disagreement on what matters most. This calls for more communication investment early on, but once you build a shared language, later collaboration becomes much smoother.",
        tw: "你們在溝通方式上有一些內在的摩擦——說話的邏輯不同，或者對重要性的判斷有分歧。這需要在合作初期投入更多的溝通成本，但一旦建立起共同語言，之後的合作會順暢許多。",
      },
      score: -9,
    },
    opposition: {
      shortTitle: { zh: "思维互补", en: "Complementary Thinking", tw: "思維互補" },
      description: {
        zh: "你们的思维模式形成了有益的对比，一方偏分析，另一方偏直觉；一方看细节，另一方看全局。将两种思维模式整合，往往能产出比任何一方单独工作更全面、更深刻的成果。",
        en: "Your thinking styles form a beneficial contrast: one leans analytical, the other intuitive; one sees details, the other the whole. Integrating both often yields results more comprehensive and profound than either working alone.",
        tw: "你們的思維模式形成了有益的對比，一方偏分析，另一方偏直覺；一方看細節，另一方看全局。將兩種思維模式整合，往往能產出比任何一方單獨工作更全面、更深刻的成果。",
      },
      score: 8,
    },
  },
  "Jupiter-Saturn": {
    conjunction: {
      shortTitle: { zh: "扩张与稳固", en: "Expansion and Stability", tw: "擴張與穩固" },
      description: {
        zh: "木星与土星的结合是商业合作的绝佳配置：一方负责拓展视野、寻找机会，另一方负责落地执行、管控风险。这两种能量互相制约又互相需要，是经典的'创始人+COO'组合。",
        en: "The Jupiter-Saturn combination is an excellent setup for business: one expands the vision and finds opportunities, the other executes on the ground and manages risk. These two energies check and need each other — a classic 'founder + COO' pairing.",
        tw: "木星與土星的結合是商業合作的絕佳配置：一方負責拓展視野、尋找機會，另一方負責落地執行、管控風險。這兩種能量互相制約又互相需要，是經典的「創始人＋COO」組合。",
      },
      score: 18,
    },
    trine: {
      shortTitle: { zh: "增长均衡", en: "Balanced Growth", tw: "增長均衡" },
      description: {
        zh: "你们在扩张与控制之间有天然的平衡感，能在保持增长动力的同时避免失控。合作项目往往能实现稳定的、可持续的增长，而不是一阵爆发后迅速崩塌。",
        en: "You have a natural sense of balance between expansion and control, keeping growth momentum while avoiding losing the reins. Joint projects tend to achieve steady, sustainable growth rather than a burst followed by a rapid collapse.",
        tw: "你們在擴張與控制之間有天然的平衡感，能在保持增長動力的同時避免失控。合作項目往往能實現穩定的、可持續的增長，而不是一陣爆發後迅速崩塌。",
      },
      score: 17,
    },
    sextile: {
      shortTitle: { zh: "稳健发展", en: "Steady Development", tw: "穩健發展" },
      description: {
        zh: "你们的合作有着稳健踏实的基调，不激进，但也不保守。能在已有的基础上循序渐进地拓展，是长期商业合作中非常宝贵的品质。",
        en: "Your collaboration has a steady, grounded tone — neither aggressive nor overly conservative. You expand step by step on existing foundations, a very valuable quality in long-term business partnership.",
        tw: "你們的合作有著穩健踏實的基調，不激進，但也不保守。能在已有的基礎上循序漸進地拓展，是長期商業合作中非常寶貴的品質。",
      },
      score: 12,
    },
    square: {
      shortTitle: { zh: "路线之争", en: "Clash of Routes", tw: "路線之爭" },
      description: {
        zh: "你们对'事情该怎么做'可能存在根本性的分歧——一方觉得要大胆扩张，另一方觉得要谨慎稳健。这种分歧会带来决策上的反复，需要建立清晰的权责机制来解决。",
        en: "You may differ fundamentally on 'how things should be done' — one believes in bold expansion, the other in cautious prudence. This divergence brings back-and-forth in decisions and requires a clear mechanism of authority and responsibility to resolve.",
        tw: "你們對「事情該怎麼做」可能存在根本性的分歧——一方覺得要大膽擴張，另一方覺得要謹慎穩健。這種分歧會帶來決策上的反覆，需要建立清晰的權責機制來解決。",
      },
      score: -8,
    },
    opposition: {
      shortTitle: { zh: "动态平衡", en: "Dynamic Balance", tw: "動態平衡" },
      description: {
        zh: "你们代表了增长与稳固两个永恒的商业极点。在合作中，你们经常会处于角力状态，但正是这种动态的张力，让双方都无法走向极端，从而产生一种令人惊讶的平衡结果。",
        en: "You represent the two eternal business poles of growth and stability. In collaboration you're often in a tug of war, but it's precisely this dynamic tension that keeps both from going to extremes, producing a surprisingly balanced result.",
        tw: "你們代表了增長與穩固兩個永恆的商業極點。在合作中，你們經常會處於角力狀態，但正是這種動態的張力，讓雙方都無法走向極端，從而產生一種令人驚訝的平衡結果。",
      },
      score: 7,
    },
  },
};

// ===== 各维度得分说明 =====
// d1/d2/d3 为语言无关的稳定 key，组件/引擎可据此分支判断（不依赖已翻译的 label）。
export type DimensionKey = "d1" | "d2" | "d3";
export const DIMENSION_LABELS: Record<RelationType, {
  d1: { label: L; icon: string; desc: L };
  d2: { label: L; icon: string; desc: L };
  d3: { label: L; icon: string; desc: L };
}> = {
  love: {
    d1: {
      label: { zh: "情感共鸣", en: "Emotional Resonance", tw: "情感共鳴" },
      icon: "💝",
      desc: {
        zh: "两人情绪世界的契合程度，决定了在一起时是否感到被理解",
        en: "How well your emotional worlds align — it determines whether you feel understood together",
        tw: "兩人情緒世界的契合程度，決定了在一起時是否感到被理解",
      },
    },
    d2: {
      label: { zh: "浪漫吸引", en: "Romantic Attraction", tw: "浪漫吸引" },
      icon: "🔥",
      desc: {
        zh: "两人之间的自然吸引力，包括感官层面和精神层面的吸引",
        en: "The natural attraction between you, on both the sensual and the mental level",
        tw: "兩人之間的自然吸引力，包括感官層面和精神層面的吸引",
      },
    },
    d3: {
      label: { zh: "灵魂契合", en: "Soul Connection", tw: "靈魂契合" },
      icon: "⭐",
      desc: {
        zh: "两人价值观、人生方向的一致程度，决定能否长期携手",
        en: "How aligned your values and life directions are — it determines whether you can walk together long term",
        tw: "兩人價值觀、人生方向的一致程度，決定能否長期攜手",
      },
    },
  },
  friendship: {
    d1: {
      label: { zh: "沟通默契", en: "Communication Rapport", tw: "溝通默契" },
      icon: "💬",
      desc: {
        zh: "两人思维与表达方式的契合程度，决定聊天是否愉快",
        en: "How well your thinking and ways of expression match — it determines how enjoyable your conversations are",
        tw: "兩人思維與表達方式的契合程度，決定聊天是否愉快",
      },
    },
    d2: {
      label: { zh: "情感支持", en: "Emotional Support", tw: "情感支持" },
      icon: "🤝",
      desc: {
        zh: "两人在情感层面的互相支撑能力，是深厚友情的基础",
        en: "Your capacity to support each other emotionally — the foundation of a deep friendship",
        tw: "兩人在情感層面的互相支撐能力，是深厚友情的基礎",
      },
    },
    d3: {
      label: { zh: "共同成长", en: "Mutual Growth", tw: "共同成長" },
      icon: "🌱",
      desc: {
        zh: "两人能否相互激励、共同进步，一起变成更好的人",
        en: "Whether you can inspire each other and progress together, becoming better people side by side",
        tw: "兩人能否相互激勵、共同進步，一起變成更好的人",
      },
    },
  },
  work: {
    d1: {
      label: { zh: "沟通效率", en: "Communication Efficiency", tw: "溝通效率" },
      icon: "⚡",
      desc: {
        zh: "合作中信息传递的顺畅程度，直接影响项目推进速度",
        en: "How smoothly information flows in collaboration — it directly affects how fast projects move",
        tw: "合作中資訊傳遞的順暢程度，直接影響項目推進速度",
      },
    },
    d2: {
      label: { zh: "执行默契", en: "Execution Chemistry", tw: "執行默契" },
      icon: "🎯",
      desc: {
        zh: "两人行动节奏和工作风格的兼容程度",
        en: "How compatible your pace of action and work styles are",
        tw: "兩人行動節奏和工作風格的兼容程度",
      },
    },
    d3: {
      label: { zh: "目标一致", en: "Goal Alignment", tw: "目標一致" },
      icon: "🏆",
      desc: {
        zh: "两人对目标和价值观的认同程度，决定长期合作稳定性",
        en: "How much you agree on goals and values — it determines the stability of a long-term partnership",
        tw: "兩人對目標和價值觀的認同程度，決定長期合作穩定性",
      },
    },
  },
};

// ===== 总分评级 =====
export const SCORE_TIERS: Array<{
  min: number;
  max: number;
  label: L;
  tagline: L;
  color: string;
  emoji: string;
}> = [
  {
    min: 90, max: 100,
    label: { zh: "命定之人", en: "Destined Match", tw: "命定之人" },
    tagline: {
      zh: "宇宙级心动，千年一遇的灵魂共鸣",
      en: "A cosmic spark — a once-in-a-millennium soul resonance",
      tw: "宇宙級心動，千年一遇的靈魂共鳴",
    },
    color: "#FFD700", emoji: "✨",
  },
  {
    min: 80, max: 89,
    label: { zh: "灵魂共鸣", en: "Soul Resonance", tw: "靈魂共鳴" },
    tagline: {
      zh: "深度契合，彼此的避风港与最佳观众",
      en: "Deeply attuned — each other's safe harbor and biggest fan",
      tw: "深度契合，彼此的避風港與最佳觀眾",
    },
    color: "#E91E8C", emoji: "💫",
  },
  {
    min: 70, max: 79,
    label: { zh: "高度契合", en: "Highly Compatible", tw: "高度契合" },
    tagline: {
      zh: "天然的吸引力与理解力兼而有之",
      en: "Natural attraction and understanding, both at once",
      tw: "天然的吸引力與理解力兼而有之",
    },
    color: "#9B59B6", emoji: "💜",
  },
  {
    min: 60, max: 69,
    label: { zh: "缘分相投", en: "Kindred Bond", tw: "緣分相投" },
    tagline: {
      zh: "有缘相遇，磨合后会更加精彩",
      en: "Fated to meet — even better once you find your rhythm",
      tw: "有緣相遇，磨合後會更加精彩",
    },
    color: "#4A9ECA", emoji: "💙",
  },
  {
    min: 50, max: 59,
    label: { zh: "互补成长", en: "Complementary Growth", tw: "互補成長" },
    tagline: {
      zh: "差异是你们最大的资产，包容是关键",
      en: "Your differences are your greatest asset — tolerance is the key",
      tw: "差異是你們最大的資產，包容是關鍵",
    },
    color: "#27AE60", emoji: "💚",
  },
  {
    min: 0, max: 49,
    label: { zh: "相遇成长", en: "Growth Through Meeting", tw: "相遇成長" },
    tagline: {
      zh: "星盘有挑战，但挑战往往是最深刻的课题",
      en: "The chart holds challenges — and challenges are often the most profound lessons",
      tw: "星盤有挑戰，但挑戰往往是最深刻的課題",
    },
    color: "#F39C12", emoji: "🌟",
  },
];

/** 已解析为纯字符串的评级（label/tagline 已按 lang 解析） */
export interface ResolvedTier {
  min: number;
  max: number;
  label: string;
  tagline: string;
  color: string;
  emoji: string;
}

// 根据总分获取评级，并按 lang 解析 label/tagline 为纯字符串
export function getScoreTier(score: number, lang: Lang = "zh"): ResolvedTier {
  const t = SCORE_TIERS.find(t => score >= t.min && score <= t.max) ?? SCORE_TIERS[SCORE_TIERS.length - 1]!;
  return {
    min: t.min,
    max: t.max,
    label: rs(t.label, lang),
    tagline: rs(t.tagline, lang),
    color: t.color,
    emoji: t.emoji,
  };
}

// ===== 相位文案获取辅助函数 =====
// 返回原始（多语言 L）文案，由 engine 按 lang 解析。
export function getAspectText(
  p1: Planet, p2: Planet, aspectType: AspectType, relationType: RelationType
): SynastryAspectText | null {
  const key1 = `${p1}-${p2}`;
  const key2 = `${p2}-${p1}`;

  let textMap: Record<string, Record<AspectType, SynastryAspectText>>;
  if (relationType === "love") textMap = LOVE_ASPECT_TEXTS;
  else if (relationType === "friendship") textMap = FRIENDSHIP_ASPECT_TEXTS;
  else textMap = WORK_ASPECT_TEXTS;

  const aspectTexts = textMap[key1] ?? textMap[key2];
  if (!aspectTexts) return null;
  return aspectTexts[aspectType] ?? null;
}

// ===== 城市数据（复用 astro 模块） =====
export type { CityData } from "../astro/astro-data";
