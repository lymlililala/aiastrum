// ===== 卢恩符文数据库 =====
// 老弗萨克符文 (Elder Futhark) - 24 个 + 1 个空白符文（怀尔德）
//
// 数据多语言化：每个可翻译文本字段使用本地化结构 L / LArr。
// - L    = { zh, en, tw } 单条字符串
// - LArr = { zh[], en[], tw[] } 字符串数组
// engine 在抽牌返回结果前，会按 lang 把这些结构解析成纯 string/string[]，
// 因此面向组件的 RuneData / RuneReading 字段类型保持不变（见 rune-engine.ts 的 resolveRune）。
// 语言中立字段（name=北欧符文专名、symbol=字形、phonetic、id、isReversible）保持原样。

/** 单条本地化字符串 */
export type L = { zh: string; en: string; tw: string };
/** 本地化字符串数组 */
export type LArr = { zh: string[]; en: string[]; tw: string[] };

// ===== 解析后（面向组件）的类型：字段为纯 string / string[] =====

export interface RuneReading {
  keywords: string[];
  meaning: string;
  advice: string;
}

export interface RuneData {
  id: number;
  name: string;          // 北欧符文专名（语言中立，保持原样）
  chineseName: string;   // 名称（已按 lang 解析）
  symbol: string;        // 符文字符（Unicode，语言中立）
  phonetic: string;      // 音标/读音（语言中立）
  element: string;       // 元素（已按 lang 解析）
  deity: string;         // 对应神祇（已按 lang 解析）
  isReversible: boolean; // 是否有逆位
  upright: RuneReading;
  reversed: RuneReading | null;
  mythology: string;     // 神话背景（已按 lang 解析）
}

// ===== 原始（未解析）的类型：可翻译字段为 L / LArr =====

export interface RawRuneReading {
  keywords: LArr;
  meaning: L;
  advice: L;
}

export interface RawRuneData {
  id: number;
  name: string;          // 语言中立
  chineseName: L;
  symbol: string;        // 语言中立
  phonetic: string;      // 语言中立
  element: L;
  deity: L;
  isReversible: boolean;
  upright: RawRuneReading;
  reversed: RawRuneReading | null;
  mythology: L;
}

export const RUNES: RawRuneData[] = [
  // ===== 第一氏族 (Freyr's Aett) =====
  {
    id: 1,
    name: "Fehu",
    chineseName: { zh: "费胡", en: "Fehu", tw: "費胡" },
    symbol: "ᚠ",
    phonetic: "F",
    element: { zh: "火", en: "Fire", tw: "火" },
    deity: { zh: "弗蕾雅", en: "Freyja", tw: "弗蕾雅" },
    isReversible: true,
    mythology: {
      zh: "费胡代表弗蕾雅的力量，原意为'牲畜'——在古北欧文化中，牛羊是财富的象征。奥丁将这一符文铭刻于石上，告诫众神财富是流动的，应当共享而非囤积。",
      en: "Fehu embodies the power of Freyja, originally meaning 'cattle'—in old Norse culture, livestock symbolized wealth. Odin carved this rune into stone to remind the gods that wealth flows and is meant to be shared, not hoarded.",
      tw: "費胡代表弗蕾雅的力量，原意為「牲畜」——在古北歐文化中，牛羊是財富的象徵。奧丁將這一符文銘刻於石上，告誡眾神財富是流動的，應當共享而非囤積。",
    },
    upright: {
      keywords: {
        zh: ["财富", "丰收", "新开始", "物质充裕"],
        en: ["Wealth", "Abundance", "New beginnings", "Prosperity"],
        tw: ["財富", "豐收", "新開始", "物質充裕"],
      },
      meaning: {
        zh: "你近期的努力将获得物质或精神上的回报。费胡的能量正在流向你，这是一个采取行动的吉兆。财运亨通，资源充足，是播种与投资的好时机。",
        en: "Your recent efforts are about to be rewarded, materially or spiritually. The energy of Fehu is flowing toward you—an auspicious sign to take action. Fortune is favorable and resources are plentiful; a good time to sow and invest.",
        tw: "你近期的努力將獲得物質或精神上的回報。費胡的能量正在流向你，這是一個採取行動的吉兆。財運亨通，資源充足，是播種與投資的好時機。",
      },
      advice: {
        zh: "把握眼前的机会，慷慨地分享你的成果，因为流动的财富会带来更多财富。",
        en: "Seize the opportunity before you and share your gains generously, for wealth that flows attracts more wealth.",
        tw: "把握眼前的機會，慷慨地分享你的成果，因為流動的財富會帶來更多財富。",
      },
    },
    reversed: {
      keywords: {
        zh: ["损失", "挫折", "贪婪", "资源短缺"],
        en: ["Loss", "Setback", "Greed", "Scarcity"],
        tw: ["損失", "挫折", "貪婪", "資源短缺"],
      },
      meaning: {
        zh: "可能面临财务上的小挫折，或计划推进受阻。费胡逆位提醒你检视自己是否过于执着于物质，忘记了真正重要的东西。",
        en: "You may face a minor financial setback or a stalled plan. Reversed Fehu asks you to examine whether you cling too tightly to material things and have forgotten what truly matters.",
        tw: "可能面臨財務上的小挫折，或計劃推進受阻。費胡逆位提醒你檢視自己是否過於執著於物質，忘記了真正重要的東西。",
      },
      advice: {
        zh: "审视财务状况，避免冲动消费或投资。此时宜守不宜攻，先稳固现有基础。",
        en: "Review your finances and avoid impulsive spending or investing. Now is a time to defend rather than advance—first secure the ground you already hold.",
        tw: "審視財務狀況，避免衝動消費或投資。此時宜守不宜攻，先穩固現有基礎。",
      },
    },
  },
  {
    id: 2,
    name: "Uruz",
    chineseName: { zh: "乌鲁兹", en: "Uruz", tw: "烏魯茲" },
    symbol: "ᚢ",
    phonetic: "U",
    element: { zh: "土", en: "Earth", tw: "土" },
    deity: { zh: "托尔", en: "Thor", tw: "托爾" },
    isReversible: true,
    mythology: {
      zh: "乌鲁兹代表原牛乌鲁斯——那头在冰河时代漫游北欧大地的巨大野牛。它的力量是原始的、不可驯服的，象征着自然界最纯粹的生命力。托尔以此符文赐予凡人抵抗黑暗的勇气。",
      en: "Uruz represents the aurochs—the great wild ox that roamed the Nordic lands in the Ice Age. Its power is primal and untamable, symbolizing the purest life force of nature. Through this rune, Thor grants mortals the courage to resist the dark.",
      tw: "烏魯茲代表原牛烏魯斯——那頭在冰河時代漫遊北歐大地的巨大野牛。它的力量是原始的、不可馴服的，象徵著自然界最純粹的生命力。托爾以此符文賜予凡人抵抗黑暗的勇氣。",
    },
    upright: {
      keywords: {
        zh: ["力量", "生命力", "健康", "意志"],
        en: ["Strength", "Vitality", "Health", "Willpower"],
        tw: ["力量", "生命力", "健康", "意志"],
      },
      meaning: {
        zh: "你正处于力量的巅峰，原始的生命能量在你体内流动。这是采取大胆行动的时机，你的意志力和体力都处于最佳状态。",
        en: "You stand at the peak of your strength, with primal life energy coursing through you. This is the moment for bold action—your willpower and vitality are both at their best.",
        tw: "你正處於力量的巔峰，原始的生命能量在你體內流動。這是採取大膽行動的時機，你的意志力和體力都處於最佳狀態。",
      },
      advice: {
        zh: "相信自己的力量，大胆面对挑战。你比自己想象的更加强大。",
        en: "Trust your own strength and face challenges boldly. You are stronger than you imagine.",
        tw: "相信自己的力量，大膽面對挑戰。你比自己想像的更加強大。",
      },
    },
    reversed: {
      keywords: {
        zh: ["虚弱", "机会错失", "优柔寡断", "健康隐患"],
        en: ["Weakness", "Missed chances", "Indecision", "Health concerns"],
        tw: ["虛弱", "機會錯失", "優柔寡斷", "健康隱患"],
      },
      meaning: {
        zh: "力量可能正在流失，或你错过了某个重要的机会。乌鲁兹逆位提醒你关注身体健康，不要让力量在犹豫中白白消耗。",
        en: "Your strength may be draining away, or you have missed an important opportunity. Reversed Uruz reminds you to mind your health and not waste your power in hesitation.",
        tw: "力量可能正在流失，或你錯過了某個重要的機會。烏魯茲逆位提醒你關注身體健康，不要讓力量在猶豫中白白消耗。",
      },
      advice: {
        zh: "好好休息，恢复精力。同时反思是什么让你失去了行动的勇气。",
        en: "Rest well and restore your energy. At the same time, reflect on what has robbed you of the courage to act.",
        tw: "好好休息，恢復精力。同時反思是什麼讓你失去了行動的勇氣。",
      },
    },
  },
  {
    id: 3,
    name: "Thurisaz",
    chineseName: { zh: "索里萨兹", en: "Thurisaz", tw: "索里薩茲" },
    symbol: "ᚦ",
    phonetic: "TH",
    element: { zh: "火", en: "Fire", tw: "火" },
    deity: { zh: "托尔", en: "Thor", tw: "托爾" },
    isReversible: true,
    mythology: {
      zh: "索里萨兹是托尔之锤的符文，代表雷电的力量，也象征着巨人族的混沌能量。它是一柄双刃剑——既是保护者的盾牌，也是毁灭者的武器。古北欧人将它刻在门楣上以驱逐邪灵。",
      en: "Thurisaz is the rune of Thor's hammer, representing the power of thunder and lightning, as well as the chaotic energy of the giants. It is a double-edged sword—both the protector's shield and the destroyer's weapon. The old Norse carved it on door lintels to ward off evil spirits.",
      tw: "索里薩茲是托爾之錘的符文，代表雷電的力量，也象徵著巨人族的混沌能量。它是一柄雙刃劍——既是保護者的盾牌，也是毀滅者的武器。古北歐人將它刻在門楣上以驅逐邪靈。",
    },
    upright: {
      keywords: {
        zh: ["保护", "突破", "考验", "变革之力"],
        en: ["Protection", "Breakthrough", "Trial", "Force of change"],
        tw: ["保護", "突破", "考驗", "變革之力"],
      },
      meaning: {
        zh: "一股强大的保护力量正在你身边。同时，你可能面临一个重大考验或突破口——就像闪电劈开黑暗，改变虽然剧烈，却是必要的。",
        en: "A powerful protective force stands beside you. At the same time, you may face a major trial or breakthrough—like lightning splitting the darkness, the change is violent yet necessary.",
        tw: "一股強大的保護力量正在你身邊。同時，你可能面臨一個重大考驗或突破口——就像閃電劈開黑暗，改變雖然劇烈，卻是必要的。",
      },
      advice: {
        zh: "不要逃避冲突，直面它，因为它正是你成长的催化剂。保持警惕，守护好你重视的一切。",
        en: "Do not flee from conflict—face it, for it is the very catalyst of your growth. Stay vigilant and guard everything you hold dear.",
        tw: "不要逃避衝突，直面它，因為它正是你成長的催化劑。保持警惕，守護好你重視的一切。",
      },
    },
    reversed: {
      keywords: {
        zh: ["危险", "冲动", "被动", "脆弱"],
        en: ["Danger", "Impulse", "Passivity", "Vulnerability"],
        tw: ["危險", "衝動", "被動", "脆弱"],
      },
      meaning: {
        zh: "此时莽撞行事可能带来伤害。索里萨兹逆位警告你，有些危险是你自己创造的——可能源于你的冲动或拒绝面对问题。",
        en: "Acting rashly now may bring harm. Reversed Thurisaz warns that some dangers are of your own making—born of impulse or a refusal to face the problem.",
        tw: "此時莽撞行事可能帶來傷害。索里薩茲逆位警告你，有些危險是你自己創造的——可能源於你的衝動或拒絕面對問題。",
      },
      advice: {
        zh: "三思而后行，不要因为一时冲动而做出让自己后悔的决定。退后一步，重新评估局势。",
        en: "Think thrice before acting; do not make a decision in the heat of impulse that you will regret. Step back and reassess the situation.",
        tw: "三思而後行，不要因為一時衝動而做出讓自己後悔的決定。退後一步，重新評估局勢。",
      },
    },
  },
  {
    id: 4,
    name: "Ansuz",
    chineseName: { zh: "安苏兹", en: "Ansuz", tw: "安蘇茲" },
    symbol: "ᚨ",
    phonetic: "A",
    element: { zh: "风", en: "Air", tw: "風" },
    deity: { zh: "奥丁", en: "Odin", tw: "奧丁" },
    isReversible: true,
    mythology: {
      zh: "安苏兹是奥丁的符文，代表神圣的声音与智慧的传递。据说奥丁倒挂在世界树上九天九夜，在痛苦与顿悟中接收了这一符文的秘密。它是语言、沟通与灵感的源泉。",
      en: "Ansuz is Odin's rune, representing the divine voice and the transmission of wisdom. It is said that Odin hung upside down on the World Tree for nine days and nights, receiving the secret of this rune through pain and revelation. It is the source of language, communication, and inspiration.",
      tw: "安蘇茲是奧丁的符文，代表神聖的聲音與智慧的傳遞。據說奧丁倒掛在世界樹上九天九夜，在痛苦與頓悟中接收了這一符文的秘密。它是語言、溝通與靈感的源泉。",
    },
    upright: {
      keywords: {
        zh: ["沟通", "智慧", "灵感", "真相"],
        en: ["Communication", "Wisdom", "Inspiration", "Truth"],
        tw: ["溝通", "智慧", "靈感", "真相"],
      },
      meaning: {
        zh: "奥丁的智慧正在向你倾注。这是接收信息、顿悟领悟和清晰表达的好时机。重要的消息将至，留意身边的信号与预兆。",
        en: "Odin's wisdom is pouring into you. This is a fine time to receive information, gain insight, and express yourself clearly. Important news is on its way—watch for the signs and omens around you.",
        tw: "奧丁的智慧正在向你傾注。這是接收信息、頓悟領悟和清晰表達的好時機。重要的消息將至，留意身邊的信號與預兆。",
      },
      advice: {
        zh: "倾听内心的声音，也倾听他人的智慧。诚实地表达自己，真相将为你打开新的道路。",
        en: "Listen to your inner voice, and to the wisdom of others. Express yourself honestly, and the truth will open new paths for you.",
        tw: "傾聽內心的聲音，也傾聽他人的智慧。誠實地表達自己，真相將為你打開新的道路。",
      },
    },
    reversed: {
      keywords: {
        zh: ["谎言", "误导", "沟通障碍", "思维混乱"],
        en: ["Deception", "Misguidance", "Miscommunication", "Confusion"],
        tw: ["謊言", "誤導", "溝通障礙", "思維混亂"],
      },
      meaning: {
        zh: "信息可能被扭曲，有人或有事物正在遮蔽你的判断。安苏兹逆位警告你——你听到的可能不是真相，或者你自己也在对自己撒谎。",
        en: "Information may be distorted; someone or something is clouding your judgment. Reversed Ansuz warns you—what you hear may not be the truth, or you may be lying to yourself.",
        tw: "信息可能被扭曲，有人或有事物正在遮蔽你的判斷。安蘇茲逆位警告你——你聽到的可能不是真相，或者你自己也在對自己撒謊。",
      },
      advice: {
        zh: "在做重要决定前核实信息。审视你的想法，哪些是真实的渴望，哪些是恐惧制造的幻象？",
        en: "Verify information before making important decisions. Examine your thoughts: which are genuine desires, and which are illusions spun by fear?",
        tw: "在做重要決定前核實信息。審視你的想法，哪些是真實的渴望，哪些是恐懼製造的幻象？",
      },
    },
  },
  {
    id: 5,
    name: "Raidho",
    chineseName: { zh: "拉伊多", en: "Raidho", tw: "拉伊多" },
    symbol: "ᚱ",
    phonetic: "R",
    element: { zh: "风", en: "Air", tw: "風" },
    deity: { zh: "因格维", en: "Yngvi", tw: "因格維" },
    isReversible: true,
    mythology: {
      zh: "拉伊多代表车轮与旅程，是北欧战士踏上征途时呼唤的符文。它不仅是物理上的旅行，更是灵魂向着命运目标前进的旅程。古代北欧萨满将其刻于坐骑的额头，祈愿旅途平安。",
      en: "Raidho represents the wheel and the journey—the rune Norse warriors called upon as they set out on campaign. It is not merely physical travel but the soul's journey toward its destined goal. Ancient Norse shamans carved it on the foreheads of their mounts to pray for a safe road.",
      tw: "拉伊多代表車輪與旅程，是北歐戰士踏上征途時呼喚的符文。它不僅是物理上的旅行，更是靈魂向著命運目標前進的旅程。古代北歐薩滿將其刻於坐騎的額頭，祈願旅途平安。",
    },
    upright: {
      keywords: {
        zh: ["旅程", "前进", "节奏", "正确方向"],
        en: ["Journey", "Progress", "Rhythm", "Right direction"],
        tw: ["旅程", "前進", "節奏", "正確方向"],
      },
      meaning: {
        zh: "你正走在正确的道路上，生命的旅程在顺畅推进。这也可能预示着一次实际的旅行、或是某个项目按部就班地向前推进。",
        en: "You are walking the right road, and life's journey is moving forward smoothly. This may also foretell an actual trip, or a project advancing steadily step by step.",
        tw: "你正走在正確的道路上，生命的旅程在順暢推進。這也可能預示著一次實際的旅行、或是某個項目按部就班地向前推進。",
      },
      advice: {
        zh: "信任这段旅程，保持节奏感。方向是对的，只需继续前行，享受过程本身。",
        en: "Trust this journey and keep your rhythm. The direction is right—simply keep moving forward and enjoy the process itself.",
        tw: "信任這段旅程，保持節奏感。方向是對的，只需繼續前行，享受過程本身。",
      },
    },
    reversed: {
      keywords: {
        zh: ["方向迷失", "计划受阻", "拖延", "错误选择"],
        en: ["Lost direction", "Stalled plans", "Delay", "Wrong choice"],
        tw: ["方向迷失", "計劃受阻", "拖延", "錯誤選擇"],
      },
      meaning: {
        zh: "你可能偏离了原本的方向，或者旅途遭遇了意外阻碍。此时需要重新审视自己走的路，是否还是心中真正想要的方向。",
        en: "You may have strayed from your original direction, or your journey has met an unexpected obstacle. Now is the time to re-examine the road you walk—is it still the one your heart truly wants?",
        tw: "你可能偏離了原本的方向，或者旅途遭遇了意外阻礙。此時需要重新審視自己走的路，是否還是心中真正想要的方向。",
      },
      advice: {
        zh: "停下来，重新审视方向。不要因为惯性而继续一条错误的路，调整方向永远不晚。",
        en: "Stop and re-examine your direction. Do not keep down a wrong road out of mere momentum—it is never too late to change course.",
        tw: "停下來，重新審視方向。不要因為慣性而繼續一條錯誤的路，調整方向永遠不晚。",
      },
    },
  },
  {
    id: 6,
    name: "Kenaz",
    chineseName: { zh: "肯纳兹", en: "Kenaz", tw: "肯納茲" },
    symbol: "ᚲ",
    phonetic: "K",
    element: { zh: "火", en: "Fire", tw: "火" },
    deity: { zh: "弗蕾雅", en: "Freyja", tw: "弗蕾雅" },
    isReversible: true,
    mythology: {
      zh: "肯纳兹是火炬之符文，代表北欧先民在漫漫极夜中燃起的灯火。弗蕾雅用这一符文传授人类铸造与手工艺的秘密。它是知识的光芒，照亮无知的黑暗。",
      en: "Kenaz is the rune of the torch, representing the light the Norse ancestors kindled through the long polar night. With this rune, Freyja taught humankind the secrets of forging and craft. It is the light of knowledge, illuminating the darkness of ignorance.",
      tw: "肯納茲是火炬之符文，代表北歐先民在漫漫極夜中燃起的燈火。弗蕾雅用這一符文傳授人類鑄造與手工藝的秘密。它是知識的光芒，照亮無知的黑暗。",
    },
    upright: {
      keywords: {
        zh: ["创造", "知识", "启示", "技艺"],
        en: ["Creation", "Knowledge", "Revelation", "Craft"],
        tw: ["創造", "知識", "啟示", "技藝"],
      },
      meaning: {
        zh: "一道灵感的火光正在你心中点燃。肯纳兹预示着创造力的爆发、新知识的获取、或某项技艺的精进。黑暗正在消退，答案正在变得清晰。",
        en: "A spark of inspiration is igniting within you. Kenaz foretells a burst of creativity, the gaining of new knowledge, or mastery of a craft. The darkness is receding, and the answer is growing clear.",
        tw: "一道靈感的火光正在你心中點燃。肯納茲預示著創造力的爆發、新知識的獲取、或某項技藝的精進。黑暗正在消退，答案正在變得清晰。",
      },
      advice: {
        zh: "行动起来，将你心中的灵感化为现实。这是学习新技能或开始创意项目的最佳时机。",
        en: "Take action and turn the inspiration in your heart into reality. This is the best time to learn a new skill or begin a creative project.",
        tw: "行動起來，將你心中的靈感化為現實。這是學習新技能或開始創意項目的最佳時機。",
      },
    },
    reversed: {
      keywords: {
        zh: ["灵感枯竭", "知识遮蔽", "迷失", "技艺滑坡"],
        en: ["Creative block", "Veiled knowledge", "Lost", "Declining skill"],
        tw: ["靈感枯竭", "知識遮蔽", "迷失", "技藝滑坡"],
      },
      meaning: {
        zh: "火炬熄灭，你可能感到创意枯竭或思维迷茫。也可能是你正在隐藏某个重要的真相，不管是对自己还是对他人。",
        en: "The torch has gone out; you may feel creatively drained or mentally lost. It may also be that you are concealing an important truth—from others or from yourself.",
        tw: "火炬熄滅，你可能感到創意枯竭或思維迷茫。也可能是你正在隱藏某個重要的真相，不管是對自己還是對他人。",
      },
      advice: {
        zh: "走出去，寻找新的刺激和灵感。真正的知识需要谦逊地去探求，别让骄傲或懒惰遮住了你的眼睛。",
        en: "Go out and seek fresh stimulation and inspiration. True knowledge must be sought with humility—do not let pride or laziness cloud your eyes.",
        tw: "走出去，尋找新的刺激和靈感。真正的知識需要謙遜地去探求，別讓驕傲或懶惰遮住了你的眼睛。",
      },
    },
  },
  {
    id: 7,
    name: "Gebo",
    chineseName: { zh: "盖博", en: "Gebo", tw: "蓋博" },
    symbol: "ᚷ",
    phonetic: "G",
    element: { zh: "风", en: "Air", tw: "風" },
    deity: { zh: "奥丁", en: "Odin", tw: "奧丁" },
    isReversible: false,
    mythology: {
      zh: "盖博是礼物的符文，形如X——代表两股力量的相互交汇与馈赠。奥丁以此符文提醒众神：真正的礼物需要平等的给予与接受。它也是盟约的象征，北欧战士在缔结誓约时会在掌心刻下这个标记。",
      en: "Gebo is the rune of the gift, shaped like an X—representing the meeting and exchange of two forces. With this rune, Odin reminds the gods that a true gift requires equal giving and receiving. It is also a symbol of covenant: Norse warriors would mark it on their palms when sealing an oath.",
      tw: "蓋博是禮物的符文，形如X——代表兩股力量的相互交匯與饋贈。奧丁以此符文提醒眾神：真正的禮物需要平等的給予與接受。它也是盟約的象徵，北歐戰士在締結誓約時會在掌心刻下這個標記。",
    },
    upright: {
      keywords: {
        zh: ["礼物", "伙伴关系", "平衡", "慷慨"],
        en: ["Gift", "Partnership", "Balance", "Generosity"],
        tw: ["禮物", "夥伴關係", "平衡", "慷慨"],
      },
      meaning: {
        zh: "一份真诚的礼物或合作关系正在出现。盖博提醒你，真正的连接来自平等的给予与接受——不论是友情、爱情还是商业合作，只要双方都能自由给予，关系就能长久。",
        en: "A sincere gift or partnership is emerging. Gebo reminds you that true connection comes from equal giving and receiving—whether in friendship, love, or business, a bond endures as long as both sides can give freely.",
        tw: "一份真誠的禮物或合作關係正在出現。蓋博提醒你，真正的連接來自平等的給予與接受——不論是友情、愛情還是商業合作，只要雙方都能自由給予，關係就能長久。",
      },
      advice: {
        zh: "慷慨给予，同时也坦然地接受他人的好意。在关系中寻找平衡，不要总是单方面付出或索取。",
        en: "Give generously, and also accept the kindness of others with grace. Seek balance in your relationships—do not always give or take one-sidedly.",
        tw: "慷慨給予，同時也坦然地接受他人的好意。在關係中尋找平衡，不要總是單方面付出或索取。",
      },
    },
    reversed: null,
  },
  {
    id: 8,
    name: "Wunjo",
    chineseName: { zh: "温佐", en: "Wunjo", tw: "溫佐" },
    symbol: "ᚹ",
    phonetic: "W",
    element: { zh: "土", en: "Earth", tw: "土" },
    deity: { zh: "奥丁", en: "Odin", tw: "奧丁" },
    isReversible: true,
    mythology: {
      zh: "温佐是喜悦的符文，代表部落的旗帜在和平时代迎风飘扬。北欧神话中，英灵殿的宴会厅里永远飘荡着温佐的能量——英雄们饮酒欢歌，等待着命运之战的来临。",
      en: "Wunjo is the rune of joy, representing the tribe's banner flying in the wind in times of peace. In Norse myth, the energy of Wunjo drifts forever through the feasting hall of Valhalla—where heroes drink and sing, awaiting the coming battle of fate.",
      tw: "溫佐是喜悅的符文，代表部落的旗幟在和平時代迎風飄揚。北歐神話中，英靈殿的宴會廳裡永遠飄蕩著溫佐的能量——英雄們飲酒歡歌，等待著命運之戰的來臨。",
    },
    upright: {
      keywords: {
        zh: ["喜悦", "幸福", "和谐", "成就"],
        en: ["Joy", "Happiness", "Harmony", "Achievement"],
        tw: ["喜悅", "幸福", "和諧", "成就"],
      },
      meaning: {
        zh: "一段快乐、和谐的时光正在或即将来临。你所渴望的事物开始成形，内心深处感到一种平静的满足感。这是收获的季节，享受此刻的美好。",
        en: "A time of happiness and harmony is here or near at hand. What you have longed for is taking shape, and a calm contentment settles deep within. This is the season of harvest—savor the beauty of this moment.",
        tw: "一段快樂、和諧的時光正在或即將來臨。你所渴望的事物開始成形，內心深處感到一種平靜的滿足感。這是收獲的季節，享受此刻的美好。",
      },
      advice: {
        zh: "允许自己感受喜悦，不要因为担心未来而无法活在当下。分享你的幸福，喜悦在传递中会倍增。",
        en: "Allow yourself to feel joy; do not let worry over the future keep you from living in the present. Share your happiness—joy multiplies as it is passed on.",
        tw: "允許自己感受喜悅，不要因為擔心未來而無法活在當下。分享你的幸福，喜悅在傳遞中會倍增。",
      },
    },
    reversed: {
      keywords: {
        zh: ["悲伤", "迷失", "疏离", "不满足"],
        en: ["Sorrow", "Lost", "Estrangement", "Discontent"],
        tw: ["悲傷", "迷失", "疏離", "不滿足"],
      },
      meaning: {
        zh: "你可能正处于一种茫然或不满足的状态，感受不到生活中本应有的喜悦。这可能源于你太执着于某个已经逝去的事物，或者你期待的东西并非你真正需要的。",
        en: "You may be in a state of bewilderment or discontent, unable to feel the joy life should hold. This may stem from clinging too tightly to something already gone, or from desiring what you do not truly need.",
        tw: "你可能正處於一種茫然或不滿足的狀態，感受不到生活中本應有的喜悅。這可能源於你太執著於某個已經逝去的事物，或者你期待的東西並非你真正需要的。",
      },
      advice: {
        zh: "寻找内心喜悦的真实来源，而不是执着于外在的满足。微小的喜悦往往就在日常生活里，不妨重新看见它们。",
        en: "Seek the true source of inner joy rather than clinging to outward satisfaction. Small joys often hide in everyday life—learn to see them anew.",
        tw: "尋找內心喜悅的真實來源，而不是執著於外在的滿足。微小的喜悅往往就在日常生活裡，不妨重新看見它們。",
      },
    },
  },

  // ===== 第二氏族 (Hagal's Aett) =====
  {
    id: 9,
    name: "Hagalaz",
    chineseName: { zh: "哈格拉兹", en: "Hagalaz", tw: "哈格拉茲" },
    symbol: "ᚺ",
    phonetic: "H",
    element: { zh: "冰", en: "Ice", tw: "冰" },
    deity: { zh: "赫尔", en: "Hel", tw: "赫爾" },
    isReversible: false,
    mythology: {
      zh: "哈格拉兹是冰雹的符文，代表凛冬的破坏力量。然而北欧先民相信，冰雹之后必有春天——毁灭本身孕育着更新的种子。赫尔，死亡之地的掌管者，将这枚符文挂在通往九界的边界。",
      en: "Hagalaz is the rune of hail, representing the destructive force of deep winter. Yet the Norse ancestors believed that after the hail comes spring—destruction itself carries the seed of renewal. Hel, ruler of the land of the dead, hung this rune at the boundary leading to the Nine Worlds.",
      tw: "哈格拉茲是冰雹的符文，代表凜冬的破壞力量。然而北歐先民相信，冰雹之後必有春天——毀滅本身孕育著更新的種子。赫爾，死亡之地的掌管者，將這枚符文掛在通往九界的邊界。",
    },
    upright: {
      keywords: {
        zh: ["变化", "中断", "考验", "必要的破坏"],
        en: ["Change", "Disruption", "Trial", "Necessary destruction"],
        tw: ["變化", "中斷", "考驗", "必要的破壞"],
      },
      meaning: {
        zh: "一场突如其来的变化或挑战正在降临，像冰雹一样打乱了你的计划。但请记住：哈格拉兹的破坏是为了清除阻碍你真正成长的旧事物。",
        en: "A sudden change or challenge is descending, scattering your plans like hail. But remember: the destruction of Hagalaz is meant to clear away the old things that block your true growth.",
        tw: "一場突如其來的變化或挑戰正在降臨，像冰雹一樣打亂了你的計劃。但請記住：哈格拉茲的破壞是為了清除阻礙你真正成長的舊事物。",
      },
      advice: {
        zh: "不要抵抗这场改变，接受它。在混乱中寻找它所携带的礼物——失去某些事物，往往是获得更好事物的前提。",
        en: "Do not resist this change—accept it. Look within the chaos for the gift it carries; losing some things is often the precondition for gaining better ones.",
        tw: "不要抵抗這場改變，接受它。在混亂中尋找它所攜帶的禮物——失去某些事物，往往是獲得更好事物的前提。",
      },
    },
    reversed: null,
  },
  {
    id: 10,
    name: "Nauthiz",
    chineseName: { zh: "诺提兹", en: "Nauthiz", tw: "諾提茲" },
    symbol: "ᚾ",
    phonetic: "N",
    element: { zh: "火", en: "Fire", tw: "火" },
    deity: { zh: "诺伦三女神", en: "The Norns", tw: "諾倫三女神" },
    isReversible: true,
    mythology: {
      zh: "诺提兹是命运之火的符文，源于古北欧人钻木取火时两根木棒相交的形状。它代表着在需求与匮乏中磨砺出的坚韧意志。诺伦三女神（命运三女神）以此符文编织凡人不可逃脱的必然。",
      en: "Nauthiz is the rune of fate's fire, taking its form from the two crossed sticks the old Norse used to kindle fire by friction. It represents the resilient will forged through need and scarcity. The three Norns (the Fates) weave with this rune the inescapable necessity of mortals.",
      tw: "諾提茲是命運之火的符文，源於古北歐人鑽木取火時兩根木棒相交的形狀。它代表著在需求與匱乏中磨礪出的堅韌意志。諾倫三女神（命運三女神）以此符文編織凡人不可逃脫的必然。",
    },
    upright: {
      keywords: {
        zh: ["需求", "忍耐", "限制", "内在力量"],
        en: ["Need", "Endurance", "Limitation", "Inner strength"],
        tw: ["需求", "忍耐", "限制", "內在力量"],
      },
      meaning: {
        zh: "你正在经历一段困难时期，资源或支持似乎都不足够。但诺提兹告诉你：正是这种匮乏，正在逼出你内心深处真正的力量。",
        en: "You are going through a difficult time, where resources or support never seem enough. But Nauthiz tells you: it is precisely this scarcity that is drawing out the true strength deep within you.",
        tw: "你正在經歷一段困難時期，資源或支持似乎都不足夠。但諾提茲告訴你：正是這種匱乏，正在逼出你內心深處真正的力量。",
      },
      advice: {
        zh: "在限制中找到创造力。此时不适合大规模扩张，而是精耕细作、耐心等待时机。你内心的力量比你想象的更强大。",
        en: "Find creativity within limitation. This is no time for large-scale expansion, but for careful cultivation and patient waiting for the right moment. Your inner strength is greater than you imagine.",
        tw: "在限制中找到創造力。此時不適合大規模擴張，而是精耕細作、耐心等待時機。你內心的力量比你想像的更強大。",
      },
    },
    reversed: {
      keywords: {
        zh: ["强迫", "错误需求", "冲动", "自我欺骗"],
        en: ["Compulsion", "False need", "Impulse", "Self-deception"],
        tw: ["強迫", "錯誤需求", "衝動", "自我欺騙"],
      },
      meaning: {
        zh: "你可能正在追求某些并非真正需要的东西，或者为了满足他人的期待而忽视了自己真实的需求。",
        en: "You may be pursuing things you do not truly need, or neglecting your own real needs in order to meet the expectations of others.",
        tw: "你可能正在追求某些並非真正需要的東西，或者為了滿足他人的期待而忽視了自己真實的需求。",
      },
      advice: {
        zh: "暂停下来，分清什么是真正的需要，什么只是欲望或外部压力。不要用满足他人来逃避自我审视。",
        en: "Pause and distinguish what you truly need from mere desire or outside pressure. Do not use pleasing others as a way to avoid examining yourself.",
        tw: "暫停下來，分清什麼是真正的需要，什麼只是慾望或外部壓力。不要用滿足他人來逃避自我審視。",
      },
    },
  },
  {
    id: 11,
    name: "Isa",
    chineseName: { zh: "伊萨", en: "Isa", tw: "伊薩" },
    symbol: "ᛁ",
    phonetic: "I",
    element: { zh: "冰", en: "Ice", tw: "冰" },
    deity: { zh: "尼弗尔海姆", en: "Niflheim", tw: "尼弗爾海姆" },
    isReversible: false,
    mythology: {
      zh: "伊萨是冰的符文，一条笔直的竖线，象征着凝固、静止与向内的收缩。在北欧神话中，冰与火的交汇创造了第一个生命——冰不是终结，而是一种等待状态。",
      en: "Isa is the rune of ice, a single straight vertical line, symbolizing freezing, stillness, and inward contraction. In Norse myth, the meeting of ice and fire created the first life—ice is not an ending, but a state of waiting.",
      tw: "伊薩是冰的符文，一條筆直的豎線，象徵著凝固、靜止與向內的收縮。在北歐神話中，冰與火的交匯創造了第一個生命——冰不是終結，而是一種等待狀態。",
    },
    upright: {
      keywords: {
        zh: ["静止", "等待", "自省", "冻结"],
        en: ["Stillness", "Waiting", "Introspection", "Frozen"],
        tw: ["靜止", "等待", "自省", "凍結"],
      },
      meaning: {
        zh: "现在不是行动的时候，一切都在暂停状态。伊萨并非坏兆头，它是宇宙在告诉你：沉下心来，在这段静默中向内看，你需要的答案就在那里。",
        en: "Now is not the time to act—everything is on pause. Isa is not an ill omen; it is the universe telling you to settle your mind and look inward in this silence, for the answer you need lies there.",
        tw: "現在不是行動的時候，一切都在暫停狀態。伊薩並非壞兆頭，它是宇宙在告訴你：沉下心來，在這段靜默中向內看，你需要的答案就在那裡。",
      },
      advice: {
        zh: "不要强行推进任何事情。利用这段安静的时间进行自我反思和准备。冰终将融化，春天总会到来。",
        en: "Do not force anything forward. Use this quiet time for self-reflection and preparation. The ice will melt at last, and spring will always come.",
        tw: "不要強行推進任何事情。利用這段安靜的時間進行自我反思和準備。冰終將融化，春天總會到來。",
      },
    },
    reversed: null,
  },
  {
    id: 12,
    name: "Jera",
    chineseName: { zh: "耶拉", en: "Jera", tw: "耶拉" },
    symbol: "ᛃ",
    phonetic: "J/Y",
    element: { zh: "土", en: "Earth", tw: "土" },
    deity: { zh: "因格维", en: "Yngvi", tw: "因格維" },
    isReversible: false,
    mythology: {
      zh: "耶拉是收获的符文，代表一年四季的完整循环。北欧农夫在秋收前会在谷仓门口刻下耶拉，感谢大地母亲的慷慨馈赠。它告诉我们：自然有其节律，耐心等待循环，收获必将到来。",
      en: "Jera is the rune of harvest, representing the complete cycle of the four seasons. Before the autumn harvest, Norse farmers would carve Jera on the barn door to thank the Earth Mother for her generous bounty. It tells us: nature has its rhythm; wait patiently for the cycle, and the harvest will surely come.",
      tw: "耶拉是收獲的符文，代表一年四季的完整循環。北歐農夫在秋收前會在穀倉門口刻下耶拉，感謝大地母親的慷慨饋贈。它告訴我們：自然有其節律，耐心等待循環，收獲必將到來。",
    },
    upright: {
      keywords: {
        zh: ["收获", "循环", "耐心", "回报"],
        en: ["Harvest", "Cycle", "Patience", "Reward"],
        tw: ["收獲", "循環", "耐心", "回報"],
      },
      meaning: {
        zh: "你所付出的努力即将得到应有的回报。耶拉提醒你，宇宙的节律是公平的——每一粒播下的种子都会在适当的时机结出果实。好事即将到来。",
        en: "The effort you have invested is about to receive its due reward. Jera reminds you that the rhythm of the universe is fair—every seed sown will bear fruit in its proper time. Good things are on their way.",
        tw: "你所付出的努力即將得到應有的回報。耶拉提醒你，宇宙的節律是公平的——每一粒播下的種子都會在適當的時機結出果實。好事即將到來。",
      },
      advice: {
        zh: "继续耐心等待，不要急于求成。同时也要确保你之前的付出是足够的——收获来自于真正的劳作，而非期盼。",
        en: "Keep waiting patiently and do not rush for results. At the same time, make sure your earlier efforts have been enough—harvest comes from real labor, not from mere hope.",
        tw: "繼續耐心等待，不要急於求成。同時也要確保你之前的付出是足夠的——收獲來自於真正的勞作，而非期盼。",
      },
    },
    reversed: null,
  },
  {
    id: 13,
    name: "Eihwaz",
    chineseName: { zh: "埃伊华兹", en: "Eihwaz", tw: "埃伊華茲" },
    symbol: "ᛇ",
    phonetic: "EI",
    element: { zh: "土", en: "Earth", tw: "土" },
    deity: { zh: "奥丁", en: "Odin", tw: "奧丁" },
    isReversible: false,
    mythology: {
      zh: "埃伊华兹是紫杉之符文，代表世界树的轴心。紫杉树在北欧文化中象征死亡与重生——它的浆果是剧毒，木材却是制作弓箭的最佳材料。奥丁将自己挂在世界树上以获取智慧，那树便是紫杉。",
      en: "Eihwaz is the rune of the yew, representing the axis of the World Tree. In Norse culture the yew symbolizes death and rebirth—its berries are deadly poison, yet its wood is the finest material for making bows. Odin hung himself upon the World Tree to gain wisdom, and that tree was the yew.",
      tw: "埃伊華茲是紫杉之符文，代表世界樹的軸心。紫杉樹在北歐文化中象徵死亡與重生——它的漿果是劇毒，木材卻是製作弓箭的最佳材料。奧丁將自己掛在世界樹上以獲取智慧，那樹便是紫杉。",
    },
    upright: {
      keywords: {
        zh: ["韧性", "耐久", "转化", "深度"],
        en: ["Resilience", "Endurance", "Transformation", "Depth"],
        tw: ["韌性", "耐久", "轉化", "深度"],
      },
      meaning: {
        zh: "你正在经历一段深刻的转化过程。就像紫杉树，你的力量来自根系的深处——那些过去的经历，不管是痛苦还是喜悦，都在滋养着你当下的成长。",
        en: "You are passing through a profound process of transformation. Like the yew, your strength rises from deep roots—those past experiences, whether painful or joyful, are nourishing your present growth.",
        tw: "你正在經歷一段深刻的轉化過程。就像紫杉樹，你的力量來自根系的深處——那些過去的經歷，不管是痛苦還是喜悅，都在滋養著你當下的成長。",
      },
      advice: {
        zh: "相信这个过程，即便它感觉漫长而艰难。你正在变得更加深沉而有力量。这不是终点，而是更深刻存在的开始。",
        en: "Trust this process, even when it feels long and hard. You are becoming deeper and more powerful. This is not the end, but the beginning of a more profound existence.",
        tw: "相信這個過程，即便它感覺漫長而艱難。你正在變得更加深沉而有力量。這不是終點，而是更深刻存在的開始。",
      },
    },
    reversed: null,
  },
  {
    id: 14,
    name: "Perthro",
    chineseName: { zh: "珀思罗", en: "Perthro", tw: "珀思羅" },
    symbol: "ᛈ",
    phonetic: "P",
    element: { zh: "水", en: "Water", tw: "水" },
    deity: { zh: "诺伦三女神", en: "The Norns", tw: "諾倫三女神" },
    isReversible: true,
    mythology: {
      zh: "珀思罗的确切含义至今是北欧神话学中最大的谜团之一。它的形状像一个装着命运骰子的杯子，指向命运的未知与偶然性。诺伦三女神在命运之井旁编织，珀思罗便是那装着命运骰子的容器。",
      en: "The exact meaning of Perthro remains one of the greatest mysteries in Norse mythological study. Its shape resembles a cup holding the dice of fate, pointing to the unknown and the element of chance in destiny. The Norns weave beside the Well of Fate, and Perthro is the vessel that holds the dice of fate.",
      tw: "珀思羅的確切含義至今是北歐神話學中最大的謎團之一。它的形狀像一個裝著命運骰子的杯子，指向命運的未知與偶然性。諾倫三女神在命運之井旁編織，珀思羅便是那裝著命運骰子的容器。",
    },
    upright: {
      keywords: {
        zh: ["命运", "奥秘", "隐藏的事物", "可能性"],
        en: ["Fate", "Mystery", "Hidden things", "Possibility"],
        tw: ["命運", "奧秘", "隱藏的事物", "可能性"],
      },
      meaning: {
        zh: "某些隐藏的事物即将揭晓，或者你正处于一个充满可能性的关键时刻。命运的骰子正在掷出，结果将超越你的预期，往往是令人惊喜的。",
        en: "Something hidden is about to be revealed, or you stand at a pivotal moment full of possibility. The dice of fate are being cast, and the outcome will exceed your expectations—often pleasantly so.",
        tw: "某些隱藏的事物即將揭曉，或者你正處於一個充滿可能性的關鍵時刻。命運的骰子正在擲出，結果將超越你的預期，往往是令人驚喜的。",
      },
      advice: {
        zh: "保持开放的心态，接受未知。不要试图控制结果，而是相信宇宙的安排。同时，此时有助于挖掘内心深处被压抑的渴望。",
        en: "Keep an open mind and embrace the unknown. Do not try to control the outcome—trust the arrangement of the universe. This is also a good time to unearth the suppressed desires deep within you.",
        tw: "保持開放的心態，接受未知。不要試圖控制結果，而是相信宇宙的安排。同時，此時有助於挖掘內心深處被壓抑的渴望。",
      },
    },
    reversed: {
      keywords: {
        zh: ["秘密", "受困", "执念", "看不见的障碍"],
        en: ["Secrets", "Stuck", "Obsession", "Unseen obstacles"],
        tw: ["秘密", "受困", "執念", "看不見的障礙"],
      },
      meaning: {
        zh: "有些事物被刻意隐藏，或者你自己也在逃避某个真相。珀思罗逆位提示你，有些障碍源于你不肯直视的内心恐惧。",
        en: "Some things are deliberately hidden, or you yourself are avoiding a certain truth. Reversed Perthro hints that some obstacles arise from inner fears you refuse to face.",
        tw: "有些事物被刻意隱藏，或者你自己也在逃避某個真相。珀思羅逆位提示你，有些障礙源於你不肯直視的內心恐懼。",
      },
      advice: {
        zh: "是时候正视那些你一直回避的事情了。秘密在黑暗中会越长越大，而一旦暴露于光中，往往也就失去了力量。",
        en: "It is time to face the things you have kept avoiding. Secrets grow ever larger in the dark, yet once brought into the light they often lose their power.",
        tw: "是時候正視那些你一直回避的事情了。秘密在黑暗中會越長越大，而一旦暴露於光中，往往也就失去了力量。",
      },
    },
  },
  {
    id: 15,
    name: "Algiz",
    chineseName: { zh: "阿尔吉兹", en: "Algiz", tw: "阿爾吉茲" },
    symbol: "ᛉ",
    phonetic: "Z",
    element: { zh: "风", en: "Air", tw: "風" },
    deity: { zh: "弗雷", en: "Freyr", tw: "弗雷" },
    isReversible: true,
    mythology: {
      zh: "阿尔吉兹的形状如同一只展翅的鹅或一个人举起双手，代表守护与神圣保护。北欧战士出征前会将此符文刺在盾牌内侧，祈求神明守护。它连接着人类领域与神圣领域的边界。",
      en: "Algiz is shaped like an elk in flight or a person raising both hands, representing guardianship and divine protection. Before battle, Norse warriors would inscribe this rune on the inside of their shields to pray for the gods' protection. It connects the boundary between the human realm and the divine.",
      tw: "阿爾吉茲的形狀如同一隻展翅的鵝或一個人舉起雙手，代表守護與神聖保護。北歐戰士出征前會將此符文刺在盾牌內側，祈求神明守護。它連接著人類領域與神聖領域的邊界。",
    },
    upright: {
      keywords: {
        zh: ["保护", "守卫", "本能", "神圣庇护"],
        en: ["Protection", "Guardianship", "Instinct", "Divine shelter"],
        tw: ["保護", "守衛", "本能", "神聖庇護"],
      },
      meaning: {
        zh: "一股保护性的力量正在守护着你。也许你正处于某种神圣联结的状态，你的直觉特别敏锐，能够感受到危险并加以规避。",
        en: "A protective force is watching over you. Perhaps you are in a state of sacred connection—your intuition is especially keen, able to sense danger and steer clear of it.",
        tw: "一股保護性的力量正在守護著你。也許你正處於某種神聖聯結的狀態，你的直覺特別敏銳，能夠感受到危險並加以規避。",
      },
      advice: {
        zh: "相信你的直觉，它现在就是你的盾牌。同时也可以主动为你爱的人提供庇护和支持——此时你有多余的力量可以给予。",
        en: "Trust your intuition—it is your shield right now. You may also actively offer shelter and support to those you love, for you have strength to spare at this time.",
        tw: "相信你的直覺，它現在就是你的盾牌。同時也可以主動為你愛的人提供庇護和支持——此時你有多餘的力量可以給予。",
      },
    },
    reversed: {
      keywords: {
        zh: ["脆弱", "警惕", "防御过度", "孤立"],
        en: ["Vulnerability", "Vigilance", "Over-defense", "Isolation"],
        tw: ["脆弱", "警惕", "防禦過度", "孤立"],
      },
      meaning: {
        zh: "你的防御可能已经下降，或者你正处于某种容易受到影响的状态。也可能是你的防御过度，反而将善意的帮助也拒于门外。",
        en: "Your defenses may have dropped, or you are in a state easily swayed by outside forces. It may also be that you are over-defended, shutting out even well-meaning help.",
        tw: "你的防禦可能已經下降，或者你正處於某種容易受到影響的狀態。也可能是你的防禦過度，反而將善意的幫助也拒於門外。",
      },
      advice: {
        zh: "检视自己的边界——是太弱还是太强？真正的保护来自内心的清醒与力量，而非外在的堡垒。",
        en: "Examine your boundaries—are they too weak, or too strong? True protection comes from inner clarity and strength, not from an outer fortress.",
        tw: "檢視自己的邊界——是太弱還是太強？真正的保護來自內心的清醒與力量，而非外在的堡壘。",
      },
    },
  },
  {
    id: 16,
    name: "Sowilo",
    chineseName: { zh: "索维洛", en: "Sowilo", tw: "索維洛" },
    symbol: "ᛊ",
    phonetic: "S",
    element: { zh: "火", en: "Fire", tw: "火" },
    deity: { zh: "太阳女神索尔", en: "Sól, the Sun Goddess", tw: "太陽女神索爾" },
    isReversible: false,
    mythology: {
      zh: "索维洛是太阳的符文，代表北欧极夜之后重新升起的太阳。北欧先民将此符文刻在山顶，以迎接漫长冬日之后的第一缕阳光。它也是战胜之符——维京战士将索维洛刻在胸前，象征必胜的信念。",
      en: "Sowilo is the rune of the sun, representing the sun rising anew after the Nordic polar night. The Norse ancestors carved this rune on mountaintops to greet the first ray of light after the long winter. It is also a rune of victory—Viking warriors carved Sowilo on their chests as a symbol of unshakable belief in triumph.",
      tw: "索維洛是太陽的符文，代表北歐極夜之後重新升起的太陽。北歐先民將此符文刻在山頂，以迎接漫長冬日之後的第一縷陽光。它也是戰勝之符——維京戰士將索維洛刻在胸前，象徵必勝的信念。",
    },
    upright: {
      keywords: {
        zh: ["胜利", "阳光", "荣耀", "指引"],
        en: ["Victory", "Sunlight", "Glory", "Guidance"],
        tw: ["勝利", "陽光", "榮耀", "指引"],
      },
      meaning: {
        zh: "胜利与荣耀的光芒正在照耀你！无论你正在面临什么困难，索维洛都预示着成功与突破。你的能量处于高峰，目标清晰，前进的道路被阳光照亮。",
        en: "The light of victory and glory is shining upon you! Whatever difficulty you face, Sowilo foretells success and breakthrough. Your energy is at its peak, your goal is clear, and the road ahead is lit by sunlight.",
        tw: "勝利與榮耀的光芒正在照耀你！無論你正在面臨什麼困難，索維洛都預示著成功與突破。你的能量處於高峰，目標清晰，前進的道路被陽光照亮。",
      },
      advice: {
        zh: "勇往直前，此时是你大展拳脚的时机。成功所需的一切条件已经汇聚，相信自己，迎接光明。",
        en: "Press boldly forward—this is your moment to shine. Every condition needed for success has come together; believe in yourself and step into the light.",
        tw: "勇往直前，此時是你大展拳腳的時機。成功所需的一切條件已經匯聚，相信自己，迎接光明。",
      },
    },
    reversed: null,
  },

  // ===== 第三氏族 (Tyr's Aett) =====
  {
    id: 17,
    name: "Tiwaz",
    chineseName: { zh: "提瓦兹", en: "Tiwaz", tw: "提瓦茲" },
    symbol: "ᛏ",
    phonetic: "T",
    element: { zh: "风", en: "Air", tw: "風" },
    deity: { zh: "提尔", en: "Tyr", tw: "提爾" },
    isReversible: true,
    mythology: {
      zh: "提瓦兹是战神提尔的符文，形如一枚向上的箭——纯粹、正直、直指目标。提尔为了拯救众神，自愿将手伸入怪狼芬里尔之口，失去了右手。提瓦兹代表以牺牲换取更大正义的精神。",
      en: "Tiwaz is the rune of Tyr, god of war, shaped like an upward arrow—pure, upright, pointing straight at its goal. To save the gods, Tyr willingly placed his hand in the jaws of the monstrous wolf Fenrir and lost his right hand. Tiwaz embodies the spirit of sacrifice in exchange for a greater justice.",
      tw: "提瓦茲是戰神提爾的符文，形如一枚向上的箭——純粹、正直、直指目標。提爾為了拯救眾神，自願將手伸入怪狼芬里爾之口，失去了右手。提瓦茲代表以犧牲換取更大正義的精神。",
    },
    upright: {
      keywords: {
        zh: ["正义", "领导力", "牺牲", "正直"],
        en: ["Justice", "Leadership", "Sacrifice", "Integrity"],
        tw: ["正義", "領導力", "犧牲", "正直"],
      },
      meaning: {
        zh: "提尔的精神与你同在。你正处于一个需要公平、正直和领导力的时刻。为了更大的善，也许需要做出某种个人牺牲——这种牺牲是高尚且值得的。",
        en: "The spirit of Tyr is with you. You are at a moment that calls for fairness, integrity, and leadership. For a greater good, some personal sacrifice may be required—and such a sacrifice is noble and worthwhile.",
        tw: "提爾的精神與你同在。你正處於一個需要公平、正直和領導力的時刻。為了更大的善，也許需要做出某種個人犧牲——這種犧牲是高尚且值得的。",
      },
      advice: {
        zh: "遵循你内心对正义的感知，即使这意味着要承担代价。真正的领导力来自服务，而非控制。",
        en: "Follow your inner sense of justice, even when it means bearing a cost. True leadership comes from service, not control.",
        tw: "遵循你內心對正義的感知，即使這意味著要承擔代價。真正的領導力來自服務，而非控制。",
      },
    },
    reversed: {
      keywords: {
        zh: ["不公正", "失败", "意志消沉", "无谓牺牲"],
        en: ["Injustice", "Failure", "Low morale", "Pointless sacrifice"],
        tw: ["不公正", "失敗", "意志消沉", "無謂犧牲"],
      },
      meaning: {
        zh: "正义可能被扭曲，或你的努力没有得到应有的回报。提瓦兹逆位提醒你审视自己的牺牲——它是出于真正的原则，还是只是懦弱或讨好他人？",
        en: "Justice may be distorted, or your efforts have not received their due reward. Reversed Tiwaz asks you to examine your sacrifice—is it born of true principle, or merely of cowardice or a wish to please others?",
        tw: "正義可能被扭曲，或你的努力沒有得到應有的回報。提瓦茲逆位提醒你審視自己的犧牲——它是出於真正的原則，還是只是懦弱或討好他人？",
      },
      advice: {
        zh: "不要为了虚假的期待而牺牲自己。先确认你的目标是否真正值得，再决定是否为之赴汤蹈火。",
        en: "Do not sacrifice yourself for false expectations. First confirm whether your goal is truly worthy, then decide whether to go through fire and water for it.",
        tw: "不要為了虛假的期待而犧牲自己。先確認你的目標是否真正值得，再決定是否為之赴湯蹈火。",
      },
    },
  },
  {
    id: 18,
    name: "Berkano",
    chineseName: { zh: "贝尔卡诺", en: "Berkano", tw: "貝爾卡諾" },
    symbol: "ᛒ",
    phonetic: "B",
    element: { zh: "土", en: "Earth", tw: "土" },
    deity: { zh: "赫尔塔（大地母亲）", en: "Hertha (the Earth Mother)", tw: "赫爾塔（大地母親）" },
    isReversible: true,
    mythology: {
      zh: "贝尔卡诺是白桦树的符文，形如女性的双乳，象征养育、诞生与大地母亲的怀抱。北欧人在春天庆典上将白桦枝条编成花环，以贝尔卡诺符文装饰，祈愿新生命与丰产。",
      en: "Berkano is the rune of the birch tree, shaped like a woman's breasts, symbolizing nurture, birth, and the embrace of the Earth Mother. At spring festivals, the Norse wove birch branches into wreaths adorned with the Berkano rune, praying for new life and fertility.",
      tw: "貝爾卡諾是白樺樹的符文，形如女性的雙乳，象徵養育、誕生與大地母親的懷抱。北歐人在春天慶典上將白樺枝條編成花環，以貝爾卡諾符文裝飾，祈願新生命與豐產。",
    },
    upright: {
      keywords: {
        zh: ["新生", "成长", "孕育", "重生"],
        en: ["New life", "Growth", "Nurture", "Rebirth"],
        tw: ["新生", "成長", "孕育", "重生"],
      },
      meaning: {
        zh: "一个新的开始正在诞生。贝尔卡诺代表所有形式的新生——一个想法、一段关系、一个项目，甚至是一个全新的自我，都在柔软而坚韧的力量中生长。",
        en: "A new beginning is being born. Berkano represents new life in every form—an idea, a relationship, a project, even a wholly new self—all growing through a soft yet resilient strength.",
        tw: "一個新的開始正在誕生。貝爾卡諾代表所有形式的新生——一個想法、一段關係、一個項目，甚至是一個全新的自我，都在柔軟而堅韌的力量中生長。",
      },
      advice: {
        zh: "好好照顾这颗新芽，给予它所需的养分和耐心。此时也是治愈过去创伤、释放旧有模式的好时机。",
        en: "Tend this new sprout well, giving it the nourishment and patience it needs. This is also a good time to heal old wounds and release outworn patterns.",
        tw: "好好照顧這顆新芽，給予它所需的養分和耐心。此時也是治癒過去創傷、釋放舊有模式的好時機。",
      },
    },
    reversed: {
      keywords: {
        zh: ["停滞", "无法放手", "家庭问题", "成长受阻"],
        en: ["Stagnation", "Unable to let go", "Family issues", "Stunted growth"],
        tw: ["停滯", "無法放手", "家庭問題", "成長受阻"],
      },
      meaning: {
        zh: "成长可能被某种恐惧或依恋阻挡。也许你紧握着某些早已该放手的事物，不让新生命诞生的空间出现。",
        en: "Growth may be blocked by some fear or attachment. Perhaps you are gripping things you should have let go of long ago, leaving no room for new life to be born.",
        tw: "成長可能被某種恐懼或依戀阻擋。也許你緊握著某些早已該放手的事物，不讓新生命誕生的空間出現。",
      },
      advice: {
        zh: "检视你生命中需要松手的地方。真正的爱是给予自由，真正的成长需要告别某些过去的自己。",
        en: "Examine where in your life you need to loosen your grip. True love grants freedom, and true growth requires bidding farewell to parts of your past self.",
        tw: "檢視你生命中需要鬆手的地方。真正的愛是給予自由，真正的成長需要告別某些過去的自己。",
      },
    },
  },
  {
    id: 19,
    name: "Ehwaz",
    chineseName: { zh: "埃华兹", en: "Ehwaz", tw: "埃華茲" },
    symbol: "ᛖ",
    phonetic: "E",
    element: { zh: "土", en: "Earth", tw: "土" },
    deity: { zh: "弗蕾雅与弗雷", en: "Freyja and Freyr", tw: "弗蕾雅與弗雷" },
    isReversible: true,
    mythology: {
      zh: "埃华兹是马的符文，代表骑手与坐骑之间的完美协作。在北欧神话中，奥丁的神驹斯莱普尼尔有八条腿，能在九界之间穿梭。马不仅是交通工具，更是灵魂旅行的伙伴。",
      en: "Ehwaz is the rune of the horse, representing the perfect cooperation between rider and mount. In Norse myth, Odin's steed Sleipnir has eight legs and can travel between the Nine Worlds. The horse is not merely transport but a companion for the soul's journey.",
      tw: "埃華茲是馬的符文，代表騎手與坐騎之間的完美協作。在北歐神話中，奧丁的神駒斯萊普尼爾有八條腿，能在九界之間穿梭。馬不僅是交通工具，更是靈魂旅行的夥伴。",
    },
    upright: {
      keywords: {
        zh: ["伙伴关系", "前进", "信任", "协作"],
        en: ["Partnership", "Progress", "Trust", "Cooperation"],
        tw: ["夥伴關係", "前進", "信任", "協作"],
      },
      meaning: {
        zh: "一段重要的合作关系正处于最佳状态。就像骑手与马的信任，埃华兹代表着默契的协作，无论是商业伙伴、亲密关系还是你与自己身体之间的和谐。",
        en: "An important partnership is at its best. Like the trust between rider and horse, Ehwaz represents seamless cooperation—whether between business partners, intimate companions, or yourself and your own body.",
        tw: "一段重要的合作關係正處於最佳狀態。就像騎手與馬的信任，埃華茲代表著默契的協作，無論是商業夥伴、親密關係還是你與自己身體之間的和諧。",
      },
      advice: {
        zh: "信任你的伙伴，放手前进。此时适合推进合作项目，也适合倾听身体的信号，与自我内外建立更好的协调。",
        en: "Trust your partner and move forward freely. Now is a good time to advance joint projects, and to listen to your body's signals, building better harmony within and without.",
        tw: "信任你的夥伴，放手前進。此時適合推進合作項目，也適合傾聽身體的信號，與自我內外建立更好的協調。",
      },
    },
    reversed: {
      keywords: {
        zh: ["不信任", "不协调", "受阻", "背叛"],
        en: ["Distrust", "Discord", "Blocked", "Betrayal"],
        tw: ["不信任", "不協調", "受阻", "背叛"],
      },
      meaning: {
        zh: "某段关系或合作中出现了裂痕，可能是不信任、误解或利益不一致。埃华兹逆位提醒你审视合作关系的基础是否还牢固。",
        en: "A crack has appeared in some relationship or partnership—perhaps distrust, misunderstanding, or misaligned interests. Reversed Ehwaz asks you to examine whether the foundation of the partnership is still solid.",
        tw: "某段關係或合作中出現了裂痕，可能是不信任、誤解或利益不一致。埃華茲逆位提醒你審視合作關係的基礎是否還牢固。",
      },
      advice: {
        zh: "坦诚地与你的合作者沟通。如果基础已经动摇，可能需要重新协商或考虑是否继续。不要将就一段不再有益的关系。",
        en: "Communicate honestly with your partner. If the foundation has been shaken, you may need to renegotiate or consider whether to continue. Do not settle for a relationship that no longer benefits you.",
        tw: "坦誠地與你的合作者溝通。如果基礎已經動搖，可能需要重新協商或考慮是否繼續。不要將就一段不再有益的關係。",
      },
    },
  },
  {
    id: 20,
    name: "Mannaz",
    chineseName: { zh: "曼纳兹", en: "Mannaz", tw: "曼納茲" },
    symbol: "ᛗ",
    phonetic: "M",
    element: { zh: "风", en: "Air", tw: "風" },
    deity: { zh: "奥丁与弗蕾雅", en: "Odin and Freyja", tw: "奧丁與弗蕾雅" },
    isReversible: true,
    mythology: {
      zh: "曼纳兹是人类的符文，象征我们与生俱来的理性、智识和内在神性。北欧神话中，奥丁和弗蕾雅一同创造了第一个人类——赋予了他们呼吸、灵魂和生命色彩。",
      en: "Mannaz is the rune of humankind, symbolizing our innate reason, intellect, and inner divinity. In Norse myth, Odin and Freyja together created the first humans—granting them breath, soul, and the color of life.",
      tw: "曼納茲是人類的符文，象徵我們與生俱來的理性、智識和內在神性。北歐神話中，奧丁和弗蕾雅一同創造了第一個人類——賦予了他們呼吸、靈魂和生命色彩。",
    },
    upright: {
      keywords: {
        zh: ["自我", "人性", "理性", "共同体"],
        en: ["Self", "Humanity", "Reason", "Community"],
        tw: ["自我", "人性", "理性", "共同體"],
      },
      meaning: {
        zh: "此符文将你的注意力引向自身——你的本质、你与他人的关系，以及你在更大群体中的角色。审视内心，你会发现通往解答的路就在自我认知之中。",
        en: "This rune turns your attention to yourself—your essence, your relationships with others, and your role within a larger group. Look within, and you will find that the path to the answer lies in self-knowledge.",
        tw: "此符文將你的注意力引向自身——你的本質、你與他人的關係，以及你在更大群體中的角色。審視內心，你會發現通往解答的路就在自我認知之中。",
      },
      advice: {
        zh: "进行深度的自我反思。同时也考虑你在社群中的角色，他人的视角往往能照亮你看不见的盲点。",
        en: "Engage in deep self-reflection. At the same time, consider your role within your community—the perspectives of others can often illuminate the blind spots you cannot see.",
        tw: "進行深度的自我反思。同時也考慮你在社群中的角色，他人的視角往往能照亮你看不見的盲點。",
      },
    },
    reversed: {
      keywords: {
        zh: ["自我欺骗", "偏见", "孤立", "自我怀疑"],
        en: ["Self-deception", "Prejudice", "Isolation", "Self-doubt"],
        tw: ["自我欺騙", "偏見", "孤立", "自我懷疑"],
      },
      meaning: {
        zh: "你可能正在经历某种程度的自我怀疑，或者因为偏见而无法清晰地看待情况。也可能是你与周围的人群产生了疏离感。",
        en: "You may be experiencing a degree of self-doubt, or unable to see a situation clearly because of prejudice. It may also be that a sense of estrangement has grown between you and those around you.",
        tw: "你可能正在經歷某種程度的自我懷疑，或者因為偏見而無法清晰地看待情況。也可能是你與周圍的人群產生了疏離感。",
      },
      advice: {
        zh: "寻求诚实的外部反馈，打破自己固有的思维定势。无法客观看待自己的时候，往往最需要他人的镜子。",
        en: "Seek honest outside feedback to break your own fixed patterns of thought. When you cannot see yourself objectively, that is often when you most need the mirror of others.",
        tw: "尋求誠實的外部反饋，打破自己固有的思維定勢。無法客觀看待自己的時候，往往最需要他人的鏡子。",
      },
    },
  },
  {
    id: 21,
    name: "Laguz",
    chineseName: { zh: "拉古兹", en: "Laguz", tw: "拉古茲" },
    symbol: "ᛚ",
    phonetic: "L",
    element: { zh: "水", en: "Water", tw: "水" },
    deity: { zh: "尼约德", en: "Njord", tw: "尼約德" },
    isReversible: true,
    mythology: {
      zh: "拉古兹是水的符文，代表大海、湖泊与潜意识的深处。北欧海神尼约德统治着海洋，而拉古兹是他在符文中的印记。它象征着无处不在的流动性——水可以是滋养的温柔，也可以是席卷一切的力量。",
      en: "Laguz is the rune of water, representing the sea, lakes, and the depths of the unconscious. The Norse sea god Njord rules the oceans, and Laguz is his mark among the runes. It symbolizes an all-pervading fluidity—water can be the gentleness that nourishes, or the force that sweeps all away.",
      tw: "拉古茲是水的符文，代表大海、湖泊與潛意識的深處。北歐海神尼約德統治著海洋，而拉古茲是他在符文中的印記。它象徵著無處不在的流動性——水可以是滋養的溫柔，也可以是席捲一切的力量。",
    },
    upright: {
      keywords: {
        zh: ["直觉", "潜意识", "流动", "情绪"],
        en: ["Intuition", "Unconscious", "Flow", "Emotion"],
        tw: ["直覺", "潛意識", "流動", "情緒"],
      },
      meaning: {
        zh: "水的能量正在流经你，你的直觉和情绪感知处于高峰。拉古兹邀请你潜入内心深处，那里有你一直在找的答案。也可能预示着情感上的深刻体验即将来临。",
        en: "The energy of water is flowing through you, and your intuition and emotional perception are at their peak. Laguz invites you to dive into your inner depths, where the answer you have been seeking awaits. It may also foretell a profound emotional experience to come.",
        tw: "水的能量正在流經你，你的直覺和情緒感知處於高峰。拉古茲邀請你潛入內心深處，那裡有你一直在找的答案。也可能預示著情感上的深刻體驗即將來臨。",
      },
      advice: {
        zh: "相信你的直觉，不要用理性压制它。允许情绪流动，不要试图控制一切。顺流而行，而非逆流而上。",
        en: "Trust your intuition and do not let reason suppress it. Allow your emotions to flow and do not try to control everything. Go with the current, not against it.",
        tw: "相信你的直覺，不要用理性壓制它。允許情緒流動，不要試圖控制一切。順流而行，而非逆流而上。",
      },
    },
    reversed: {
      keywords: {
        zh: ["情绪失控", "恐惧", "幻觉", "迷失方向"],
        en: ["Emotional overwhelm", "Fear", "Illusion", "Lost bearings"],
        tw: ["情緒失控", "恐懼", "幻覺", "迷失方向"],
      },
      meaning: {
        zh: "情绪的浪潮可能正在淹没你，或者你正在用幻觉逃避现实。拉古兹逆位警告你，深陷感情泥潭或恐惧之中，会让你失去判断力。",
        en: "The tides of emotion may be drowning you, or you are using illusion to escape reality. Reversed Laguz warns that sinking into an emotional mire or into fear will rob you of your judgment.",
        tw: "情緒的浪潮可能正在淹沒你，或者你正在用幻覺逃避現實。拉古茲逆位警告你，深陷感情泥潭或恐懼之中，會讓你失去判斷力。",
      },
      advice: {
        zh: "找到稳固的立足点，让自己暂时脱离情绪的漩涡。冥想、自然或身体运动可以帮助你重新找到平衡。",
        en: "Find solid footing and step out of the whirlpool of emotion for a while. Meditation, nature, or physical exercise can help you regain your balance.",
        tw: "找到穩固的立足點，讓自己暫時脫離情緒的漩渦。冥想、自然或身體運動可以幫助你重新找到平衡。",
      },
    },
  },
  {
    id: 22,
    name: "Ingwaz",
    chineseName: { zh: "英瓦兹", en: "Ingwaz", tw: "英瓦茲" },
    symbol: "ᛜ",
    phonetic: "NG",
    element: { zh: "土", en: "Earth", tw: "土" },
    deity: { zh: "因格维（弗雷）", en: "Yngvi (Freyr)", tw: "因格維（弗雷）" },
    isReversible: false,
    mythology: {
      zh: "英瓦兹是弗雷神的符文，代表生育、内在的种子能量与完整的循环。弗雷是丰产之神，他的符文象征着在地下积蓄力量的种子——沉默地等待，直到时机成熟破土而出。",
      en: "Ingwaz is the rune of the god Freyr, representing fertility, inner seed energy, and the complete cycle. Freyr is the god of fruitfulness, and his rune symbolizes the seed gathering strength underground—waiting in silence until the time is ripe to break through the soil.",
      tw: "英瓦茲是弗雷神的符文，代表生育、內在的種子能量與完整的循環。弗雷是豐產之神，他的符文象徵著在地下積蓄力量的種子——沉默地等待，直到時機成熟破土而出。",
    },
    upright: {
      keywords: {
        zh: ["完成", "种子", "内在力量", "孕育期"],
        en: ["Completion", "Seed", "Inner strength", "Gestation"],
        tw: ["完成", "種子", "內在力量", "孕育期"],
      },
      meaning: {
        zh: "一个重要的阶段已经完成，或正在趋于圆满。你已经积累了足够的内在力量，下一个伟大的开始正在孕育。这是一段宝贵的过渡期，充满潜能。",
        en: "An important phase has been completed, or is drawing toward fullness. You have gathered enough inner strength, and the next great beginning is in gestation. This is a precious transitional period, full of potential.",
        tw: "一個重要的階段已經完成，或正在趨於圓滿。你已經積累了足夠的內在力量，下一個偉大的開始正在孕育。這是一段寶貴的過渡期，充滿潛能。",
      },
      advice: {
        zh: "接受这个圆满的时刻，然后将注意力转向内在，为新的开始做好准备。种子已经种下，静待发芽。",
        en: "Accept this moment of completeness, then turn your attention inward to prepare for a new beginning. The seed has been planted—wait quietly for it to sprout.",
        tw: "接受這個圓滿的時刻，然後將注意力轉向內在，為新的開始做好準備。種子已經種下，靜待發芽。",
      },
    },
    reversed: null,
  },
  {
    id: 23,
    name: "Dagaz",
    chineseName: { zh: "达格兹", en: "Dagaz", tw: "達格茲" },
    symbol: "ᛞ",
    phonetic: "D",
    element: { zh: "火", en: "Fire", tw: "火" },
    deity: { zh: "黎明女神", en: "The Dawn Goddess", tw: "黎明女神" },
    isReversible: false,
    mythology: {
      zh: "达格兹是黎明的符文，形如两个三角形相交，代表黑暗与光明的临界点。它是北欧神话中最具积极力量的符文之一——每当太阳从地平线升起，达格兹的能量便弥漫在清晨的空气中。",
      en: "Dagaz is the rune of dawn, shaped like two intersecting triangles, representing the threshold between darkness and light. It is one of the most positive runes in Norse mythology—each time the sun rises over the horizon, the energy of Dagaz fills the morning air.",
      tw: "達格茲是黎明的符文，形如兩個三角形相交，代表黑暗與光明的臨界點。它是北歐神話中最具積極力量的符文之一——每當太陽從地平線升起，達格茲的能量便瀰漫在清晨的空氣中。",
    },
    upright: {
      keywords: {
        zh: ["突破", "黎明", "转化", "觉醒"],
        en: ["Breakthrough", "Dawn", "Transformation", "Awakening"],
        tw: ["突破", "黎明", "轉化", "覺醒"],
      },
      meaning: {
        zh: "一个重要的突破点就在眼前！如同黎明将黑暗一扫而空，你长期以来面对的困境或障碍，正迎来根本性的转化。这是一个令人充满希望的时刻。",
        en: "An important breakthrough is right before you! As dawn sweeps away the darkness, the difficulties or obstacles you have long faced are meeting a fundamental transformation. This is a moment full of hope.",
        tw: "一個重要的突破點就在眼前！如同黎明將黑暗一掃而空，你長期以來面對的困境或障礙，正迎來根本性的轉化。這是一個令人充滿希望的時刻。",
      },
      advice: {
        zh: "抓住这个觉醒的时机，大胆迈出那一步。黎明一旦出现，便没有任何黑暗能够阻挡它。行动的时机已到。",
        en: "Seize this moment of awakening and boldly take that step. Once dawn has come, no darkness can hold it back. The time to act has arrived.",
        tw: "抓住這個覺醒的時機，大膽邁出那一步。黎明一旦出現，便沒有任何黑暗能夠阻擋它。行動的時機已到。",
      },
    },
    reversed: null,
  },
  {
    id: 24,
    name: "Othala",
    chineseName: { zh: "奥萨拉", en: "Othala", tw: "奧薩拉" },
    symbol: "ᛟ",
    phonetic: "O",
    element: { zh: "土", en: "Earth", tw: "土" },
    deity: { zh: "奥丁", en: "Odin", tw: "奧丁" },
    isReversible: true,
    mythology: {
      zh: "奥萨拉是家园与遗产的符文，代表祖先传承下来的土地、智慧与血脉。在古北欧社会，家族的土地是神圣不可侵犯的。奥萨拉连接着我们与祖先的纽带，提醒我们自己的根基所在。",
      en: "Othala is the rune of homeland and heritage, representing the land, wisdom, and bloodline handed down from the ancestors. In old Norse society, the family's land was sacred and inviolable. Othala binds us to our ancestors, reminding us where our roots lie.",
      tw: "奧薩拉是家園與遺產的符文，代表祖先傳承下來的土地、智慧與血脈。在古北歐社會，家族的土地是神聖不可侵犯的。奧薩拉連接著我們與祖先的紐帶，提醒我們自己的根基所在。",
    },
    upright: {
      keywords: {
        zh: ["家园", "遗产", "传承", "根基"],
        en: ["Home", "Heritage", "Legacy", "Roots"],
        tw: ["家園", "遺產", "傳承", "根基"],
      },
      meaning: {
        zh: "你的根基是你力量的源泉。奥萨拉提醒你回归本源——你的家庭、文化传承、或者内心深处最本真的自我。有些珍贵的东西值得去保存和传递。",
        en: "Your roots are the source of your strength. Othala reminds you to return to your origins—your family, your cultural heritage, or your most authentic self deep within. Some precious things are worth preserving and passing on.",
        tw: "你的根基是你力量的源泉。奧薩拉提醒你回歸本源——你的家庭、文化傳承、或者內心深處最本真的自我。有些珍貴的東西值得去保存和傳遞。",
      },
      advice: {
        zh: "联结你的根基，从祖先的智慧与传统中汲取力量。同时也审视你将留给未来的是什么——你的遗产不仅是物质，更是精神与价值观。",
        en: "Connect with your roots and draw strength from the wisdom and traditions of your ancestors. At the same time, consider what you will leave to the future—your legacy is not only material, but spiritual and a matter of values.",
        tw: "聯結你的根基，從祖先的智慧與傳統中汲取力量。同時也審視你將留給未來的是什麼——你的遺產不僅是物質，更是精神與價值觀。",
      },
    },
    reversed: {
      keywords: {
        zh: ["流离失所", "传统束缚", "拒绝过去", "遗产纠纷"],
        en: ["Displacement", "Bound by tradition", "Rejecting the past", "Inheritance disputes"],
        tw: ["流離失所", "傳統束縛", "拒絕過去", "遺產糾紛"],
      },
      meaning: {
        zh: "你可能感到脱根、无所归依，或者反过来，被旧有的传统和家庭模式束缚，无法成长为真正的自己。",
        en: "You may feel uprooted and without belonging, or, conversely, bound by old traditions and family patterns, unable to grow into your true self.",
        tw: "你可能感到脫根、無所歸依，或者反過來，被舊有的傳統和家庭模式束縛，無法成長為真正的自己。",
      },
      advice: {
        zh: "找到与传统的平衡点——继承其精华，放下其糟粕。你的根不是枷锁，是让你枝繁叶茂的土壤。",
        en: "Find your balance with tradition—inherit its essence and let go of its dross. Your roots are not shackles; they are the soil that lets you flourish.",
        tw: "找到與傳統的平衡點——繼承其精華，放下其糟粕。你的根不是枷鎖，是讓你枝繁葉茂的土壤。",
      },
    },
  },
  // ===== 空白符文（可选）=====
  {
    id: 25,
    name: "Wyrd",
    chineseName: { zh: "怀尔德（空白）", en: "Wyrd (Blank)", tw: "懷爾德（空白）" },
    symbol: "☐",
    phonetic: "—",
    element: { zh: "所有", en: "All", tw: "所有" },
    deity: { zh: "诺伦三女神", en: "The Norns", tw: "諾倫三女神" },
    isReversible: false,
    mythology: {
      zh: "空白符文，也叫奥丁符文或命运符文。它不存在于古代典籍中，而是由现代占卜师创造——代表着尚未书写的命运、纯粹的可能性，以及宇宙正在为你安排的惊喜。",
      en: "The blank rune, also called Odin's rune or the rune of fate. It does not appear in ancient texts but was created by modern diviners—representing destiny not yet written, pure possibility, and the surprises the universe is arranging for you.",
      tw: "空白符文，也叫奧丁符文或命運符文。它不存在於古代典籍中，而是由現代占卜師創造——代表著尚未書寫的命運、純粹的可能性，以及宇宙正在為你安排的驚喜。",
    },
    upright: {
      keywords: {
        zh: ["命运", "未知", "可能性", "纯粹潜能"],
        en: ["Fate", "The unknown", "Possibility", "Pure potential"],
        tw: ["命運", "未知", "可能性", "純粹潛能"],
      },
      meaning: {
        zh: "宇宙正在为你书写一个全新的篇章。空白符文意味着所有的可能性都向你敞开——这既令人兴奋，也需要你保持最高的觉知。",
        en: "The universe is writing an entirely new chapter for you. The blank rune means all possibilities are open to you—this is exciting, and it also asks you to hold the highest awareness.",
        tw: "宇宙正在為你書寫一個全新的篇章。空白符文意味著所有的可能性都向你敞開——這既令人興奮，也需要你保持最高的覺知。",
      },
      advice: {
        zh: "此时最重要的，是完全活在当下，对一切可能性保持开放。不要执着于特定的结果，让命运展开它应有的样子。",
        en: "What matters most now is to live fully in the present and stay open to every possibility. Do not cling to a particular outcome—let fate unfold as it is meant to.",
        tw: "此時最重要的，是完全活在當下，對一切可能性保持開放。不要執著於特定的結果，讓命運展開它應有的樣子。",
      },
    },
    reversed: null,
  },
];

// 按可逆性分类（用于抽牌逻辑）
export const REVERSIBLE_RUNE_IDS = RUNES.filter((r) => r.isReversible).map((r) => r.id);
export const NON_REVERSIBLE_RUNE_IDS = RUNES.filter((r) => !r.isReversible).map((r) => r.id);

// 符文名称映射（按 lang 解析中文名 + 北欧专名）
export type Lang = "zh" | "en" | "tw";
export function getRuneNameMap(lang: Lang): Record<number, string> {
  return Object.fromEntries(
    RUNES.map((r) => [r.id, `${r.chineseName[lang]}（${r.name}）`]),
  );
}

// 三石阵位名称（本地化）
export interface ThreeStonePosition {
  key: "past" | "present" | "future";
  label: L;
  icon: string;
  description: L;
}

export const THREE_STONE_POSITIONS: ThreeStonePosition[] = [
  {
    key: "past",
    label: { zh: "过去 · 起因", en: "Past · Cause", tw: "過去 · 起因" },
    icon: "🌙",
    description: {
      zh: "过去发生了什么，是什么导致了现在的局面",
      en: "What happened in the past, and what led to the present situation",
      tw: "過去發生了什麼，是什麼導致了現在的局面",
    },
  },
  {
    key: "present",
    label: { zh: "现在 · 现状", en: "Present · State", tw: "現在 · 現狀" },
    icon: "☀️",
    description: {
      zh: "你当前所处的状态与面临的核心问题",
      en: "Your current state and the core issue you face",
      tw: "你當前所處的狀態與面臨的核心問題",
    },
  },
  {
    key: "future",
    label: { zh: "未来 · 趋势", en: "Future · Trend", tw: "未來 · 趨勢" },
    icon: "⭐",
    description: {
      zh: "若延续现有轨迹，事情会走向哪里",
      en: "Where things will lead if the current course continues",
      tw: "若延續現有軌跡，事情會走向哪裡",
    },
  },
];

// ===== 页面 SEO / 新手引导文案（三语，page.tsx 与 layout.tsx 共用）=====
export type RuneSeoLang = "zh" | "en" | "tw";

export interface RunePageSeo {
  howToTitle: string;
  howToSteps: string[];
  seoSections: { heading: string; body: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
}

export const RUNE_PAGE_SEO: Record<RuneSeoLang, RunePageSeo> = {
  zh: {
    howToTitle: "怎么占卜？",
    howToSteps: [
      "在「奥丁之眼」（单石）与「诺伦三女神」（三石）之间选择占卜方式",
      "心中默念你的问题，点击下方开始按钮进入冥想阶段",
      "长按石头 2 秒注入意念，或直接点击快速抽取符文",
      "查看符文正逆位解读，可保存并分享占卜海报",
    ],
    seoSections: [
      {
        heading: "什么是卢恩符文？",
        body: "卢恩符文源自古北欧的老弗萨克（Elder Futhark）字母，共 24 枚符文加一枚空白符文。每枚符文既是文字也是象征符号，承载着北欧先民对自然与命运的理解。几个世纪以来，人们以掷石占卜的方式向符文提问，寻求关于抉择与方向的启示。",
      },
      {
        heading: "单石与三石占卜的区别",
        body: "单石占卜「奥丁之眼」适合快速洞见：一个是/否问题或当日指引，一枚符文给出直接回应。三石占卜「诺伦三女神」以过去、现在、未来三个位置展开，适合梳理一件困扰之事的来龙去脉。符文可能以正位或逆位出现，逆位通常提示能量受阻或需要向内审视。",
      },
      {
        heading: "符文占卜小贴士",
        body: "占卜前先静心，把问题浓缩成一句具体的话——模糊的问题只会得到模糊的回应。同一个问题不建议一天内反复占问；抽到不喜欢的符文也不必沮丧，它指出的是需要留意的方向，而非注定的结局。解读仅供参考，选择权始终在你手中。",
      },
    ],
    faqTitle: "常见问题",
    faq: [
      {
        q: "占卜前需要做什么准备？",
        a: "找一个安静的时刻，深呼吸几次，把注意力集中在想问的事情上即可，不需要任何道具或仪式。默念问题后长按石头两秒，符文就会为你抽取。",
      },
      {
        q: "同一个问题可以反复占问吗？",
        a: "不建议。传统上认为反复占问同一个问题会稀释答案的清晰度。如果对结果感到困惑，不妨换个角度提问，或隔几天再来。",
      },
      {
        q: "逆位符文是什么意思？",
        a: "部分符文可能以逆位出现，通常表示该符文的能量受阻、延迟或转向内在。它并非「坏结果」，而是提醒你这股力量需要以另一种方式被看见。",
      },
      {
        q: "占卜结果会被保存吗？",
        a: "不会。每次占卜结果只展示在当前页面，刷新或离开后即消失；你可以主动把占卜海报保存到本地。我们不会记录你的问题与结果。",
      },
    ],
  },
  tw: {
    howToTitle: "怎麼占卜？",
    howToSteps: [
      "在「奧丁之眼」（單石）與「諾倫三女神」（三石）之間選擇占卜方式",
      "心中默念你的問題，點擊下方開始按鈕進入冥想階段",
      "長按石頭 2 秒注入意念，或直接點擊快速抽取符文",
      "查看符文正逆位解讀，可保存並分享占卜海報",
    ],
    seoSections: [
      {
        heading: "什麼是盧恩符文？",
        body: "盧恩符文源自古北歐的老弗薩克（Elder Futhark）字母，共 24 枚符文加一枚空白符文。每枚符文既是文字也是象徵符號，承載著北歐先民對自然與命運的理解。幾個世紀以來，人們以擲石占卜的方式向符文提問，尋求關於抉擇與方向的啟示。",
      },
      {
        heading: "單石與三石占卜的區別",
        body: "單石占卜「奧丁之眼」適合快速洞見：一個是/否問題或當日指引，一枚符文給出直接回應。三石占卜「諾倫三女神」以過去、現在、未來三個位置展開，適合梳理一件困擾之事的來龍去脈。符文可能以正位或逆位出現，逆位通常提示能量受阻或需要向內審視。",
      },
      {
        heading: "符文占卜小貼士",
        body: "占卜前先靜心，把問題濃縮成一句具體的話——模糊的問題只會得到模糊的回應。同一個問題不建議一天內反覆占問；抽到不喜歡的符文也不必沮喪，它指出的是需要留意的方向，而非註定的結局。解讀僅供參考，選擇權始終在你手中。",
      },
    ],
    faqTitle: "常見問題",
    faq: [
      {
        q: "占卜前需要做什麼準備？",
        a: "找一個安靜的時刻，深呼吸幾次，把注意力集中在想問的事情上即可，不需要任何道具或儀式。默念問題後長按石頭兩秒，符文就會為你抽取。",
      },
      {
        q: "同一個問題可以反覆占問嗎？",
        a: "不建議。傳統上認為反覆占問同一個問題會稀釋答案的清晰度。如果對結果感到困惑，不妨換個角度提問，或隔幾天再來。",
      },
      {
        q: "逆位符文是什麼意思？",
        a: "部分符文可能以逆位出現，通常表示該符文的能量受阻、延遲或轉向內在。它並非「壞結果」，而是提醒你這股力量需要以另一種方式被看見。",
      },
      {
        q: "占卜結果會被保存嗎？",
        a: "不會。每次占卜結果只展示在當前頁面，重新整理或離開後即消失；你可以主動把占卜海報保存到本地。我們不會記錄你的問題與結果。",
      },
    ],
  },
  en: {
    howToTitle: "How to cast the runes",
    howToSteps: [
      "Choose a reading: Odin's Eye (single rune) or The Three Norns (three runes)",
      "Hold your question in mind and tap the start button to enter the focus stage",
      "Press and hold the stone for 2 seconds to channel your intent — or tap to draw instantly",
      "Read the upright/reversed interpretation and save a poster of your reading",
    ],
    seoSections: [
      {
        heading: "What are runes?",
        body: "Runes come from the Elder Futhark, the ancient Norse alphabet of 24 symbols plus one blank rune. Each rune is both a letter and a symbol, carrying the Norse understanding of nature and fate. For centuries, people have cast rune stones to ask questions and seek guidance on choices and direction.",
      },
      {
        heading: "Single rune vs three-rune readings",
        body: "Odin's Eye, the single-rune draw, suits quick insight: a yes/no question or guidance for the day, answered by one rune. The Three Norns spread lays runes in past, present and future positions — ideal for untangling a troubling matter. Runes may appear upright or reversed; a reversed rune usually points to blocked energy or something that needs inner reflection.",
      },
      {
        heading: "Tips for a better reading",
        body: "Settle your mind first and condense your question into one specific sentence — vague questions get vague answers. Avoid asking the same question repeatedly in a single day, and don't be discouraged by a rune you dislike: it marks a direction to watch, not a fixed outcome. Readings are for reference only; the choice is always yours.",
      },
    ],
    faqTitle: "FAQ",
    faq: [
      {
        q: "Do I need to prepare anything before a reading?",
        a: "Just find a quiet moment, take a few deep breaths, and focus on what you want to ask — no tools or rituals needed. Hold your question in mind, press and hold the stone for two seconds, and the runes will be drawn for you.",
      },
      {
        q: "Can I ask the same question over and over?",
        a: "It's not recommended. Tradition holds that recasting the same question dilutes the clarity of the answer. If the result confuses you, try asking from a different angle, or come back in a few days.",
      },
      {
        q: "What does a reversed rune mean?",
        a: "Some runes can appear reversed, usually meaning their energy is blocked, delayed, or turned inward. It is not a “bad result” — it's a reminder that this force needs to be seen in a different way.",
      },
      {
        q: "Are my reading results saved?",
        a: "No. Each reading only lives on the current page and disappears when you refresh or leave; you can save the poster to your device if you want to keep it. We never record your questions or results.",
      },
    ],
  },
};
