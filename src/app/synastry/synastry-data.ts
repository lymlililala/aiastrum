// ===== 星盘合盘（Synastry）数据层 =====
// 合盘相位文案、关系类型解读、契合度数据

import type { ZodiacSign, Planet, AspectType } from "../astro/astro-data";
export type { ZodiacSign, Planet, AspectType };

// ===== 关系类型 =====
export type RelationType = "love" | "friendship" | "work";

export const RELATION_TYPES: Record<RelationType, {
  label: string;
  icon: string;
  desc: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
}> = {
  love: {
    label: "爱情 / 婚姻",
    icon: "💫",
    desc: "探索两人之间的浪漫吸引力、情感共鸣与灵魂契合",
    color: "#E91E8C",
    gradientFrom: "#7B2D8B",
    gradientTo: "#E91E8C",
  },
  friendship: {
    label: "友情 / 闺蜜",
    icon: "✨",
    desc: "了解两人之间的沟通默契、共同趣味与精神共鸣",
    color: "#4A9ECA",
    gradientFrom: "#1E5FA0",
    gradientTo: "#4A9ECA",
  },
  work: {
    label: "工作 / 合伙",
    icon: "⚡",
    desc: "分析两人之间的执行默契、目标一致性与互补优势",
    color: "#C9A84C",
    gradientFrom: "#8B6500",
    gradientTo: "#C9A84C",
  },
};

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
  shortTitle: string;    // 3-5字标题
  description: string;  // 2-3句大白话解读
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
      shortTitle: "灼热吸引",
      description: "你的金星与TA的火星产生了合相——这是占星中最直接的爱欲磁场。你身上有某种东西让TA无法抗拒，而TA的出现也让你感到血液加速。这份吸引力不仅是精神上的，更是那种想要靠近的本能冲动。",
      score: 20,
    },
    trine: {
      shortTitle: "自然流淌",
      description: "你们之间的浪漫感情是流淌出来的，不需要刻意维系。你的审美与TA的行动力高度兼容，TA知道怎样用行动让你感到被珍视，而你也让TA的激情有了绽放的舞台。这是一种让人身心舒展的吸引。",
      score: 18,
    },
    sextile: {
      shortTitle: "温柔默契",
      description: "你们之间有一种让人愉快的化学反应，虽然不是那种烈焰式的炙热，但有着难得的温柔默契。一起做很多事情都会感到轻松、有趣，浪漫在生活细节中自然萌发。",
      score: 13,
    },
    square: {
      shortTitle: "欲罢不能",
      description: "你们之间的吸引力是真实的，但也伴随着摩擦。TA的行事风格有时让你觉得过于粗糙或冲动，而你在TA眼中有时显得难以捉摸。但这种张力本身就是磁场，越挣扎越想靠近，是那种让人上瘾的感情。",
      score: -5,
    },
    opposition: {
      shortTitle: "两极相吸",
      description: "你们像磁铁的两极——截然不同，但无法不被对方吸引。你身上有TA缺少的东西，TA也填补了你内心的某个空缺。这种互补式的吸引力极具爆发力，只是需要学会接受彼此的差异。",
      score: 8,
    },
  },
  "Sun-Moon": {
    conjunction: {
      shortTitle: "灵魂合一",
      description: "TA的太阳（核心自我）与你的月亮（情感世界）完全重叠——这是占星中'前世夫妻'最典型的相位。TA的存在让你有一种被深度理解的安全感，而TA在你身边也感到异常放松，仿佛回到家一样。",
      score: 20,
    },
    trine: {
      shortTitle: "温暖照耀",
      description: "TA的阳光能量滋养着你的情绪世界，而你的感性回应也让TA觉得自己是被需要的、有价值的。你们在一起时，不需要表演，不需要迎合，只是'做自己'就已经是最好的礼物。",
      score: 19,
    },
    sextile: {
      shortTitle: "轻松相伴",
      description: "你们之间有种轻盈的适配感，相处不费力，也不会有太多误解。TA的个性风格和你的情感需求存在天然的友好区域，共同生活中自然会涌现出很多小小的温暖和默契时刻。",
      score: 13,
    },
    square: {
      shortTitle: "爱恨交织",
      description: "你的情感需求和TA的人生方向之间存在内在的张力。TA追求的某些东西可能会无意中让你感到不安全，而你的情绪起伏有时也让TA不知所措。但如果你们愿意深入沟通，这种张力往往能激发出最深刻的成长。",
      score: -6,
    },
    opposition: {
      shortTitle: "镜中自我",
      description: "TA像一面镜子，映照出你不曾看见的自己。TA的人生目标和你的情感模式形成了有趣的对照，有时会产生'TA怎么可以这样'的困惑，但深入了解后你会发现，TA恰好是你内心另一半的投影。",
      score: 7,
    },
  },
  "Moon-Moon": {
    conjunction: {
      shortTitle: "情绪共振",
      description: "你们的月亮重叠，意味着你们的情绪世界高度相似。同一件事可以让你们有相同的感受，难过时不用解释，快乐时不需要铺垫。这种无声的情感联结是最难得的，像是从同一片土壤里长出来的两棵树。",
      score: 18,
    },
    trine: {
      shortTitle: "情感滋养",
      description: "你们的情感表达方式高度兼容，能轻松读懂对方的情绪信号。TA的情绪状态不会让你觉得奇怪，你的感受TA也能自然接收。在一起的时候有种天然的安全感，不容易因为情绪误解而产生冲突。",
      score: 17,
    },
    sextile: {
      shortTitle: "温暖流通",
      description: "你们的情绪能量能够顺畅流动，相处时感觉放松不压抑。虽然不是那种'灵魂伴侣'式的深度共鸣，但有着令人愉悦的情感交流，一起度过的时光总是让人感到充电了一样。",
      score: 12,
    },
    square: {
      shortTitle: "情感误读",
      description: "你们的情绪模式之间存在一些内在的冲突——有时候TA正需要空间，你却想靠近；有时候你需要安慰，TA给出的方式又不对路。但这种'情感语言'的差异并非不可逾越，学会彼此的情绪密码是关键。",
      score: -8,
    },
    opposition: {
      shortTitle: "情感互补",
      description: "你们的情绪需求是互补的：一方需要主动给予，另一方更需要接受；一方习惯压抑，另一方更易释放。这种对比既可能产生紧张感，也可能形成完美的平衡——取决于你们是否愿意向对方靠拢半步。",
      score: 6,
    },
  },
  "Sun-Venus": {
    conjunction: {
      shortTitle: "迷人的爱",
      description: "TA的阳光特质完全符合你对美的感知，你们天然互相欣赏。在TA眼里，你是优雅的；在你眼里，TA是闪闪发光的。这种相互欣赏是感情里最美好的基础，让双方都觉得自己是被珍视的宝物。",
      score: 18,
    },
    trine: {
      shortTitle: "甜蜜欣赏",
      description: "你们有一种轻松愉快的相互欣赏，TA自然地展现出你认为美好的品质，而你也能让TA感受到被真心欣赏的满足感。这段感情的氛围总体是甜蜜的，拌嘴少，小幸福多。",
      score: 16,
    },
    sextile: {
      shortTitle: "欣赏与喜欢",
      description: "你们之间有着健康的喜爱与欣赏，能在对方身上找到真实的魅力点。不是那种惊天动地的爱，但是一种踏实的、持续的好感，让日子过起来有一种恬淡的甜。",
      score: 11,
    },
    square: {
      shortTitle: "爱中摩擦",
      description: "你可能觉得TA不懂欣赏你；TA有时也觉得你的某些价值观和TA不在一个频道。但这些分歧恰恰说明你们各自都有鲜明的个性，磨合的过程可能漫长，但最终会找到独特的相处方式。",
      score: -7,
    },
    opposition: {
      shortTitle: "不同魅力",
      description: "你和TA对'美'和'价值'的理解来自不同的方向，TA的闪光点不一定是你最初期待的类型，但会让你逐渐发现不同的美。这是一段能拓宽彼此视野的关系，带来新鲜感的同时也需要包容度。",
      score: 7,
    },
  },
  "Mars-Moon": {
    conjunction: {
      shortTitle: "保护与激情",
      description: "TA的行动力与你的情感需求紧密交织——TA想要为你做些什么，而你的存在本身就激发了TA的行动力和保护欲。这是一种充满温度的动态，有激情，有照顾，有一种'被人在乎着'的踏实感。",
      score: 17,
    },
    trine: {
      shortTitle: "温暖驱动",
      description: "你们之间有一种行动与情感的和谐流动。TA善于用行动来表达关心，而你的情感回应也让TA的付出得到了最好的接收。在一起的时候，既有激情，也有安全感。",
      score: 16,
    },
    sextile: {
      shortTitle: "温和激励",
      description: "你们之间有着温和而积极的互动，TA的行动力能给你带来安心感，而你的情绪反馈也是TA前进的小小动力。不是那种狂热的激情，但是踏实的温暖。",
      score: 11,
    },
    square: {
      shortTitle: "激与伤",
      description: "TA的行事方式有时会无意中触碰到你的情感痛点，TA可能太过直接，你可能太过敏感——但这不是谁的错，是能量模式的碰撞。如果愿意放慢脚步、好好沟通，这段关系可以深刻地让彼此成长。",
      score: -9,
    },
    opposition: {
      shortTitle: "行动与柔软",
      description: "一方更多用行动表达爱，另一方更多用情感接收爱；一方主动，一方被动。这种组合可以非常和谐，也可能让人感到疲惫——关键是双方是否愿意稍微走向对方的节奏。",
      score: 5,
    },
  },
};

// ===== 友情模式相位文案 =====
export const FRIENDSHIP_ASPECT_TEXTS: Record<string, Record<AspectType, SynastryAspectText>> = {
  "Mercury-Mercury": {
    conjunction: {
      shortTitle: "心有灵犀",
      description: "你们说话的频道是同一个——对方能懂你说的每一个梗，你也能接住对方抛出的每一个话头。这种思维上的高度契合让你们的聊天永远不会冷场，在一起既能说深刻的事，也能大笑最无聊的玩笑。",
      score: 20,
    },
    trine: {
      shortTitle: "聊不完的话",
      description: "你们的沟通方式天然兼容，信息在你们之间流动得毫无障碍。对方能用你最舒服的方式传递想法，你也能轻松听懂对方话里的弦外之音。是那种'话越说越多'的好朋友。",
      score: 18,
    },
    sextile: {
      shortTitle: "愉快交流",
      description: "你们的交流总是轻松愉快，不会有太多误解，也不需要反复解释。虽然不是那种'脑子装在一起'的默契，但每次聊天都会感到充实、有趣。",
      score: 13,
    },
    square: {
      shortTitle: "话不投机",
      description: "有时候你们的说话方式会产生碰撞——对方说的你觉得多余，你说的对方觉得没有必要。但这种思维上的摩擦往往是对彼此的激发，不同的角度可以拓宽视野，关键是双方是否愿意听对方的逻辑。",
      score: -7,
    },
    opposition: {
      shortTitle: "互补思维",
      description: "你们的思维模式形成有趣的互补：一方擅长细节，另一方看大局；一方感性，另一方理性。这种组合在解决问题时往往能产生1+1>2的效果，只是日常沟通需要多一点耐心。",
      score: 8,
    },
  },
  "Sun-Sun": {
    conjunction: {
      shortTitle: "同频共振",
      description: "你们的核心价值观和人生追求高度一致，在一起时不需要解释自己'为什么是这样的人'，对方天然能懂。这种惺惺相惜的感觉是深厚友情的最佳基础，一起做什么都有加成。",
      score: 17,
    },
    trine: {
      shortTitle: "和谐共鸣",
      description: "你们的个性和目标存在天然的和谐，在一起时不会有太多价值观上的冲突，反而会互相激励。TA的成功你真心为TA高兴，你的成就TA也真心支持——这是少见的无嫉妒友情。",
      score: 16,
    },
    sextile: {
      shortTitle: "良好共识",
      description: "你们在很多大方向上有共识，相处起来有种默契的轻松。不一定形影不离，但每次见面都能找到共同话题，是那种'没有一直联系，但关系永远在'的朋友。",
      score: 12,
    },
    square: {
      shortTitle: "碰撞激发",
      description: "你们的个性或人生方向有些摩擦，有时候TA的行事风格会让你觉得'这也太……'，但也正因如此，你们反而能相互刺激成长。是那种吵架之后关系反而更好的朋友类型。",
      score: -5,
    },
    opposition: {
      shortTitle: "互为参照",
      description: "你们是彼此的镜子——TA身上有你最缺少的那种特质，你们在一起时会互相帮对方看见自己的盲点。虽然有时候会不理解对方，但这种多元视角是让彼此成长最快的友谊类型。",
      score: 7,
    },
  },
  "Moon-Moon": {
    conjunction: {
      shortTitle: "情绪共鸣",
      description: "你们的情感世界高度共鸣——TA难过时你能感同身受，TA开心时你也会被感染。这种情绪上的无声同频是深厚友情的基础，不需要任何解释，只需要'我懂你'三个字。",
      score: 18,
    },
    trine: {
      shortTitle: "心安所在",
      description: "在TA身边你感到情绪稳定和放松，TA也把你当成了安全基地。你们不需要表演积极，可以做真实的自己，是那种'随时可以发牢骚，然后笑着继续生活'的朋友。",
      score: 16,
    },
    sextile: {
      shortTitle: "情感流通",
      description: "你们的情绪能量之间有良好的流通，不会相互消耗，反而会相互滋养。每次深聊之后都会觉得充了电，是一段对心理健康有益的友谊。",
      score: 12,
    },
    square: {
      shortTitle: "偶尔情绪摩擦",
      description: "你们的情绪模式有些不同步，有时候你的需求和TA提供的方式不在一个点上。但这不是不能克服的，只要建立起一些沟通习惯，这段友谊可以深入得出乎意料。",
      score: -6,
    },
    opposition: {
      shortTitle: "情绪互补",
      description: "你们在情感表达上形成互补：一方偏外向，另一方偏内敛；一方容易焦虑，另一方天然镇定。这种组合在彼此最脆弱的时候往往能给对方刚好需要的支撑。",
      score: 7,
    },
  },
};

// ===== 工作模式相位文案 =====
export const WORK_ASPECT_TEXTS: Record<string, Record<AspectType, SynastryAspectText>> = {
  "Sun-Saturn": {
    conjunction: {
      shortTitle: "目标与纪律",
      description: "TA的土星为你的太阳能量提供了稳定的结构——你的创意和驱动力遇到了TA的规划和执行力，是理想的分工组合。TA会帮你把想法落地，你会拓展TA的格局，是经典的'有梦想的人+能实现梦想的人'组合。",
      score: 18,
    },
    trine: {
      shortTitle: "高效配合",
      description: "你们的工作节奏天然兼容：你提供方向和动能，TA提供秩序和持续力。合作起来既不会失控，也不会僵化，有一种令人愉快的高效感。TA让你不容易脱轨，你让TA不容易固化。",
      score: 17,
    },
    sextile: {
      shortTitle: "稳定合作",
      description: "你们合作有着良好的基础稳定性，不会有大起大落，是那种能长期合作的类型。虽然不一定产出惊天动地的成果，但是可靠、踏实的伙伴关系。",
      score: 12,
    },
    square: {
      shortTitle: "磨合中成长",
      description: "你的行事风格和TA的规则感之间会产生摩擦——你可能觉得TA太死板，TA可能觉得你太随性。但如果能在这种张力中找到平衡，往往能迸发出比表面上看起来更强的合作成果。",
      score: -7,
    },
    opposition: {
      shortTitle: "方向互补",
      description: "你们代表了同一件事情的两个面向：一个在扩展，一个在稳固；一个在仰望星空，一个在脚踏实地。这种对立在同一个项目中反而是互补的——只需要找到各自尊重对方的边界。",
      score: 8,
    },
  },
  "Mars-Mars": {
    conjunction: {
      shortTitle: "强大执行力",
      description: "你们的行动力叠加在一起，能量相当强大。一旦对准了目标，可以以惊人的速度推进。需要注意的是，两股同频的火星能量也可能带来内部竞争——确保彼此的目标一致，而非内耗。",
      score: 16,
    },
    trine: {
      shortTitle: "行动默契",
      description: "你们做事的节奏高度一致，不需要过多协调就能步调相符。项目推进时你们会自动分工，不会踩踏对方的领域，是那种'默默配合就能把事做成'的最佳搭档。",
      score: 17,
    },
    sextile: {
      shortTitle: "节奏和谐",
      description: "你们的工作节奏互相兼容，合作时不会感到被拖累或被催促。各自有各自的行动风格，但放在一起是和谐的，能平稳地推进共同目标。",
      score: 12,
    },
    square: {
      shortTitle: "策略分歧",
      description: "你们在'如何行动'这件事上可能有截然不同的偏好——一方冲锋，另一方审慎；一方快，另一方慢。这种分歧容易带来摩擦，但也可能在充分磨合后形成互相补位的强大组合。",
      score: -8,
    },
    opposition: {
      shortTitle: "动力互补",
      description: "你们的行动能量方向相反，但可以形成有趣的拉力平衡。一方擅长开创，另一方擅长收尾；一方擅长攻城，另一方擅长守土。把两种能量整合在一起，可以大幅提升合作项目的完整性。",
      score: 7,
    },
  },
  "Mercury-Mercury": {
    conjunction: {
      shortTitle: "高效沟通",
      description: "你们的思维逻辑高度一致，合作时几乎不需要重复沟通——一句话，对方就能get到你的全部意图。这种沟通效率让合作成本大大降低，是项目团队最渴望拥有的'天然默契'。",
      score: 19,
    },
    trine: {
      shortTitle: "清晰协作",
      description: "你们的工作沟通流畅、清晰，误解少，执行准确。对方总能理解你的需求，你也能清楚地接收对方的信息。这种沟通上的高效是长期合作最宝贵的资产。",
      score: 17,
    },
    sextile: {
      shortTitle: "顺畅沟通",
      description: "你们的沟通方式彼此兼容，不会有太多信息损耗。合作时对话顺畅，能快速达成共识，是一段让人愉快的职业关系。",
      score: 12,
    },
    square: {
      shortTitle: "沟通磨合",
      description: "你们在沟通方式上有一些内在的摩擦——说话的逻辑不同，或者对重要性的判断有分歧。这需要在合作初期投入更多的沟通成本，但一旦建立起共同语言，之后的合作会顺畅许多。",
      score: -9,
    },
    opposition: {
      shortTitle: "思维互补",
      description: "你们的思维模式形成了有益的对比，一方偏分析，另一方偏直觉；一方看细节，另一方看全局。将两种思维模式整合，往往能产出比任何一方单独工作更全面、更深刻的成果。",
      score: 8,
    },
  },
  "Jupiter-Saturn": {
    conjunction: {
      shortTitle: "扩张与稳固",
      description: "木星与土星的结合是商业合作的绝佳配置：一方负责拓展视野、寻找机会，另一方负责落地执行、管控风险。这两种能量互相制约又互相需要，是经典的'创始人+COO'组合。",
      score: 18,
    },
    trine: {
      shortTitle: "增长均衡",
      description: "你们在扩张与控制之间有天然的平衡感，能在保持增长动力的同时避免失控。合作项目往往能实现稳定的、可持续的增长，而不是一阵爆发后迅速崩塌。",
      score: 17,
    },
    sextile: {
      shortTitle: "稳健发展",
      description: "你们的合作有着稳健踏实的基调，不激进，但也不保守。能在已有的基础上循序渐进地拓展，是长期商业合作中非常宝贵的品质。",
      score: 12,
    },
    square: {
      shortTitle: "路线之争",
      description: "你们对'事情该怎么做'可能存在根本性的分歧——一方觉得要大胆扩张，另一方觉得要谨慎稳健。这种分歧会带来决策上的反复，需要建立清晰的权责机制来解决。",
      score: -8,
    },
    opposition: {
      shortTitle: "动态平衡",
      description: "你们代表了增长与稳固两个永恒的商业极点。在合作中，你们经常会处于角力状态，但正是这种动态的张力，让双方都无法走向极端，从而产生一种令人惊讶的平衡结果。",
      score: 7,
    },
  },
};

// ===== 各维度得分说明 =====
export const DIMENSION_LABELS: Record<RelationType, {
  d1: { label: string; icon: string; desc: string };
  d2: { label: string; icon: string; desc: string };
  d3: { label: string; icon: string; desc: string };
}> = {
  love: {
    d1: { label: "情感共鸣", icon: "💝", desc: "两人情绪世界的契合程度，决定了在一起时是否感到被理解" },
    d2: { label: "浪漫吸引", icon: "🔥", desc: "两人之间的自然吸引力，包括感官层面和精神层面的吸引" },
    d3: { label: "灵魂契合", icon: "⭐", desc: "两人价值观、人生方向的一致程度，决定能否长期携手" },
  },
  friendship: {
    d1: { label: "沟通默契", icon: "💬", desc: "两人思维与表达方式的契合程度，决定聊天是否愉快" },
    d2: { label: "情感支持", icon: "🤝", desc: "两人在情感层面的互相支撑能力，是深厚友情的基础" },
    d3: { label: "共同成长", icon: "🌱", desc: "两人能否相互激励、共同进步，一起变成更好的人" },
  },
  work: {
    d1: { label: "沟通效率", icon: "⚡", desc: "合作中信息传递的顺畅程度，直接影响项目推进速度" },
    d2: { label: "执行默契", icon: "🎯", desc: "两人行动节奏和工作风格的兼容程度" },
    d3: { label: "目标一致", icon: "🏆", desc: "两人对目标和价值观的认同程度，决定长期合作稳定性" },
  },
};

// ===== 总分评级 =====
export const SCORE_TIERS: Array<{
  min: number;
  max: number;
  label: string;
  tagline: string;
  color: string;
  emoji: string;
}> = [
  { min: 90, max: 100, label: "命定之人", tagline: "宇宙级心动，千年一遇的灵魂共鸣", color: "#FFD700", emoji: "✨" },
  { min: 80, max: 89,  label: "灵魂共鸣", tagline: "深度契合，彼此的避风港与最佳观众", color: "#E91E8C", emoji: "💫" },
  { min: 70, max: 79,  label: "高度契合", tagline: "天然的吸引力与理解力兼而有之", color: "#9B59B6", emoji: "💜" },
  { min: 60, max: 69,  label: "缘分相投", tagline: "有缘相遇，磨合后会更加精彩", color: "#4A9ECA", emoji: "💙" },
  { min: 50, max: 59,  label: "互补成长", tagline: "差异是你们最大的资产，包容是关键", color: "#27AE60", emoji: "💚" },
  { min: 0,  max: 49,  label: "相遇成长", tagline: "星盘有挑战，但挑战往往是最深刻的课题", color: "#F39C12", emoji: "🌟" },
];

// 根据总分获取评级
export function getScoreTier(score: number) {
  return SCORE_TIERS.find(t => score >= t.min && score <= t.max) ?? SCORE_TIERS[SCORE_TIERS.length - 1]!;
}

// ===== 相位文案获取辅助函数 =====
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
