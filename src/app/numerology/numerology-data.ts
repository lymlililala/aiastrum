// ===== 生命灵数数据库 =====
// 涵盖 1-9 基础数 + 11、22、33 卓越数（Master Numbers）
//
// 数据多语言化：每个可翻译文本字段使用本地化结构 L / LArr。
// - L    = { zh, en, tw } 单条字符串
// - LArr = { zh[], en[], tw[] } 字符串数组
// engine 在返回 NumerologyResult 前，会按 lang 把这些结构解析成纯 string/string[]，
// 因此 NumerologyResult 的字段类型保持不变（见 numerology-engine.ts 的 resolveProfile）。

export type LifeNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11 | 22 | 33;

/** 单条本地化字符串 */
export type L = { zh: string; en: string; tw: string };
/** 本地化字符串数组 */
export type LArr = { zh: string[]; en: string[]; tw: string[] };

/** 解析后的、面向组件的档案类型（字段为纯 string / string[]） */
export interface NumerologyProfile {
  number: LifeNumber;
  name: string;
  title: string;
  element: string;
  planet: string;
  color: string;
  colorHex: string;
  secondaryColorHex: string;
  symbol: string;
  emoji: string;
  isMaster: boolean;
  tagline: string;
  traits: string[];
  positiveTraits: { title: string; description: string }[];
  challenges: { title: string; description: string }[];
  gifts: { title: string; description: string; icon: string }[];
  lifeLessons: { title: string; description: string }[];
  careerPaths: string[];
  loveInsight: string;
  yearAdvice: string;
  luckyNumber: number[];
  luckyColor: string;
  luckyDay: string;
  luckyGem: string;
  spiritualMessage: string;
  celebrities: string[];
}

/** 原始（未解析）档案类型：可翻译字段为 L / LArr，语言中立字段保持原样 */
export interface RawNumerologyProfile {
  number: LifeNumber;
  name: L;
  title: L;
  element: L;
  planet: L;
  color: L;
  colorHex: string;
  secondaryColorHex: string;
  symbol: string;
  emoji: string;
  isMaster: boolean;
  tagline: L;
  traits: LArr;
  positiveTraits: { title: L; description: L }[];
  challenges: { title: L; description: L }[];
  gifts: { title: L; description: L; icon: string }[];
  lifeLessons: { title: L; description: L }[];
  careerPaths: LArr;
  loveInsight: L;
  yearAdvice: L;
  luckyNumber: number[];
  luckyColor: L;
  luckyDay: L;
  luckyGem: L;
  spiritualMessage: L;
  celebrities: LArr;
}

export const NUMEROLOGY_DATA: Record<LifeNumber, RawNumerologyProfile> = {
  1: {
    number: 1,
    name: { zh: "领袖者", en: "The Leader", tw: "領袖者" },
    title: { zh: "命运数字 · 一", en: "Destiny Number · One", tw: "命運數字 · 一" },
    element: { zh: "火", en: "Fire", tw: "火" },
    planet: { zh: "太阳", en: "Sun", tw: "太陽" },
    color: { zh: "金红", en: "Golden Red", tw: "金紅" },
    colorHex: "#E85D04",
    secondaryColorHex: "#F48C06",
    symbol: "☀",
    emoji: "🔥",
    isMaster: false,
    tagline: {
      zh: "你天生是开拓者，第一个踏入未知领域的人",
      en: "You are a born pioneer — the first to step into the unknown.",
      tw: "你天生是開拓者，第一個踏入未知領域的人",
    },
    traits: {
      zh: ["独立", "领导力", "创造力", "自信", "先驱", "果断", "意志力"],
      en: ["Independent", "Leadership", "Creative", "Confident", "Pioneering", "Decisive", "Willpower"],
      tw: ["獨立", "領導力", "創造力", "自信", "先驅", "果斷", "意志力"],
    },
    positiveTraits: [
      {
        title: { zh: "天生领袖", en: "Born Leader", tw: "天生領袖" },
        description: {
          zh: "你具有强大的领导能量，能够在混沌中找到方向，带领他人走向目标。你的自信与魄力让人信服，天生适合站在最前面。",
          en: "You carry powerful leadership energy, finding direction amid chaos and guiding others toward the goal. Your confidence and boldness inspire trust — you are made to stand at the front.",
          tw: "你具有強大的領導能量，能夠在混沌中找到方向，帶領他人走向目標。你的自信與魄力讓人信服，天生適合站在最前面。",
        },
      },
      {
        title: { zh: "创新先锋", en: "Innovative Pioneer", tw: "創新先鋒" },
        description: {
          zh: "你不喜欢走别人走过的路，总是渴望开创新局面。独特的视角和大胆的想法是你最宝贵的财富。",
          en: "You dislike walking paths others have worn down, always longing to open new ground. Your unique perspective and bold ideas are your most precious assets.",
          tw: "你不喜歡走別人走過的路，總是渴望開創新局面。獨特的視角和大膽的想法是你最寶貴的財富。",
        },
      },
      {
        title: { zh: "坚韧意志", en: "Unbreakable Will", tw: "堅韌意志" },
        description: {
          zh: "一旦认定目标，你会以惊人的专注和毅力去实现它。挫折对你来说不过是磨砺意志的试炼。",
          en: "Once you set a goal, you pursue it with remarkable focus and perseverance. To you, setbacks are merely trials that sharpen your will.",
          tw: "一旦認定目標，你會以驚人的專注和毅力去實現它。挫折對你來說不過是磨礪意志的試煉。",
        },
      },
    ],
    challenges: [
      {
        title: { zh: "过于固执", en: "Too Stubborn", tw: "過於固執" },
        description: {
          zh: "强烈的自主意识有时会让你听不进他人意见，容易走入孤军奋战的困境。学会倾听是你的成长关键。",
          en: "A strong sense of autonomy can sometimes make you deaf to others' opinions, leaving you fighting alone. Learning to listen is key to your growth.",
          tw: "強烈的自主意識有時會讓你聽不進他人意見，容易走入孤軍奮戰的困境。學會傾聽是你的成長關鍵。",
        },
      },
      {
        title: { zh: "忽视协作", en: "Neglecting Collaboration", tw: "忽視協作" },
        description: {
          zh: "你习惯单打独斗，但真正的成就往往需要团队的力量。练习信任他人，你的领域将无限延伸。",
          en: "You are used to going it alone, but real achievement often requires the strength of a team. Practice trusting others, and your reach will expand without limit.",
          tw: "你習慣單打獨鬥，但真正的成就往往需要團隊的力量。練習信任他人，你的領域將無限延伸。",
        },
      },
    ],
    gifts: [
      {
        title: { zh: "领导力", en: "Leadership", tw: "領導力" },
        description: {
          zh: "天生的指挥官，能在关键时刻挺身而出",
          en: "A natural commander who steps forward at the crucial moment",
          tw: "天生的指揮官，能在關鍵時刻挺身而出",
        },
        icon: "👑",
      },
      {
        title: { zh: "开创性思维", en: "Pioneering Mind", tw: "開創性思維" },
        description: {
          zh: "突破常规，看见别人看不见的可能性",
          en: "Breaking convention and seeing possibilities others miss",
          tw: "突破常規，看見別人看不見的可能性",
        },
        icon: "💡",
      },
      {
        title: { zh: "执行力", en: "Drive to Execute", tw: "執行力" },
        description: {
          zh: "想到就做，行动力超群，能把想法变为现实",
          en: "Acting the moment you decide, turning ideas into reality with exceptional drive",
          tw: "想到就做，行動力超群，能把想法變為現實",
        },
        icon: "⚡",
      },
    ],
    lifeLessons: [
      {
        title: { zh: "学会谦逊", en: "Learn Humility", tw: "學會謙遜" },
        description: {
          zh: "真正的强大不是凌驾于他人之上，而是在服务中体现领导价值。放下自我，才能吸引更大的能量。",
          en: "True strength is not towering over others but expressing leadership through service. Let go of ego, and you will attract far greater energy.",
          tw: "真正的強大不是凌駕於他人之上，而是在服務中體現領導價值。放下自我，才能吸引更大的能量。",
        },
      },
      {
        title: { zh: "接纳脆弱", en: "Embrace Vulnerability", tw: "接納脆弱" },
        description: {
          zh: "你习惯表现强大，但允许自己偶尔示弱，才能建立更深厚的人际联结。",
          en: "You are used to projecting strength, but allowing yourself to be vulnerable now and then builds deeper connections.",
          tw: "你習慣表現強大，但允許自己偶爾示弱，才能建立更深厚的人際聯結。",
        },
      },
    ],
    careerPaths: {
      zh: ["企业家", "CEO", "政治家", "探险家", "发明家", "军事将领", "创意总监"],
      en: ["Entrepreneur", "CEO", "Politician", "Explorer", "Inventor", "Military Commander", "Creative Director"],
      tw: ["企業家", "CEO", "政治家", "探險家", "發明家", "軍事將領", "創意總監"],
    },
    loveInsight: {
      zh: "你在爱情中同样渴望主导，需要一个能欣赏你的独立、同时给你空间的伴侣。学会在感情中适度退让，才能遇见真正的灵魂伴侣。",
      en: "In love you also crave the lead, needing a partner who admires your independence while giving you space. Learning to yield a little is how you meet your true soulmate.",
      tw: "你在愛情中同樣渴望主導，需要一個能欣賞你的獨立、同時給你空間的伴侶。學會在感情中適度退讓，才能遇見真正的靈魂伴侶。",
    },
    yearAdvice: {
      zh: "这是展现你才华的黄金时期。大胆追求你真正想要的，不要因为害怕失败而止步不前。你的独特性就是你最大的竞争力。",
      en: "This is a golden time to showcase your talent. Boldly pursue what you truly want and don't let fear of failure hold you back. Your uniqueness is your greatest edge.",
      tw: "這是展現你才華的黃金時期。大膽追求你真正想要的，不要因為害怕失敗而止步不前。你的獨特性就是你最大的競爭力。",
    },
    luckyNumber: [1, 10, 19],
    luckyColor: { zh: "金红色、橙色", en: "Golden Red, Orange", tw: "金紅色、橙色" },
    luckyDay: { zh: "周日", en: "Sunday", tw: "週日" },
    luckyGem: { zh: "红宝石", en: "Ruby", tw: "紅寶石" },
    spiritualMessage: {
      zh: "你是宇宙能量的起点。每一个伟大的故事，都从勇敢说'我来'那一刻开始。",
      en: "You are the starting point of cosmic energy. Every great story begins the moment someone bravely says 'I'll go first.'",
      tw: "你是宇宙能量的起點。每一個偉大的故事，都從勇敢說「我來」那一刻開始。",
    },
    celebrities: {
      zh: ["史蒂夫·乔布斯", "玛丽·居里", "马丁·路德·金"],
      en: ["Steve Jobs", "Marie Curie", "Martin Luther King Jr."],
      tw: ["史蒂夫·賈伯斯", "瑪麗·居禮", "馬丁·路德·金恩"],
    },
  },

  2: {
    number: 2,
    name: { zh: "调和者", en: "The Peacemaker", tw: "調和者" },
    title: { zh: "命运数字 · 二", en: "Destiny Number · Two", tw: "命運數字 · 二" },
    element: { zh: "水", en: "Water", tw: "水" },
    planet: { zh: "月亮", en: "Moon", tw: "月亮" },
    color: { zh: "银白", en: "Silver White", tw: "銀白" },
    colorHex: "#4A90D9",
    secondaryColorHex: "#7EB8F7",
    symbol: "☽",
    emoji: "🌙",
    isMaster: false,
    tagline: {
      zh: "你是世界的桥梁，用爱与温柔让对立变为和谐",
      en: "You are the world's bridge, turning conflict into harmony through love and gentleness.",
      tw: "你是世界的橋梁，用愛與溫柔讓對立變為和諧",
    },
    traits: {
      zh: ["敏感", "直觉", "协调", "温柔", "耐心", "外交", "合作"],
      en: ["Sensitive", "Intuitive", "Harmonizing", "Gentle", "Patient", "Diplomatic", "Cooperative"],
      tw: ["敏感", "直覺", "協調", "溫柔", "耐心", "外交", "合作"],
    },
    positiveTraits: [
      {
        title: { zh: "高度共情", en: "Deep Empathy", tw: "高度共情" },
        description: {
          zh: "你拥有超强的感知能力，能感受到他人内心深处的情绪，这让你成为天生的聆听者与治愈者。",
          en: "You have an extraordinary capacity to sense the emotions buried deep within others, making you a natural listener and healer.",
          tw: "你擁有超強的感知能力，能感受到他人內心深處的情緒，這讓你成為天生的聆聽者與療癒者。",
        },
      },
      {
        title: { zh: "外交天才", en: "Diplomatic Genius", tw: "外交天才" },
        description: {
          zh: "你善于找到双方的共同点，用柔软的方式化解矛盾。在你身边，紧张的关系会悄悄松弛。",
          en: "You excel at finding common ground and dissolving conflict gently. Around you, tense relationships quietly ease.",
          tw: "你善於找到雙方的共同點，用柔軟的方式化解矛盾。在你身邊，緊張的關係會悄悄鬆弛。",
        },
      },
      {
        title: { zh: "细腻直觉", en: "Subtle Intuition", tw: "細膩直覺" },
        description: {
          zh: "你的第六感异常准确，常常能在逻辑之前感知到真相。相信你的内心，它从不欺骗你。",
          en: "Your sixth sense is uncannily accurate, often grasping the truth before logic catches up. Trust your inner voice — it never lies to you.",
          tw: "你的第六感異常準確，常常能在邏輯之前感知到真相。相信你的內心，它從不欺騙你。",
        },
      },
    ],
    challenges: [
      {
        title: { zh: "过度付出", en: "Over-Giving", tw: "過度付出" },
        description: {
          zh: "你太善于照顾别人，以至于常常忘记照顾自己。学会设定边界，不是自私，而是自爱。",
          en: "You are so good at caring for others that you often forget to care for yourself. Setting boundaries isn't selfish — it's self-love.",
          tw: "你太善於照顧別人，以至於常常忘記照顧自己。學會設定界線，不是自私，而是自愛。",
        },
      },
      {
        title: { zh: "优柔寡断", en: "Indecisiveness", tw: "優柔寡斷" },
        description: {
          zh: "总是顾虑他人感受，让你在做决定时容易犹豫。有时候，快速做出选择比完美选择更重要。",
          en: "Always weighing others' feelings can make you hesitate when deciding. Sometimes a quick choice matters more than a perfect one.",
          tw: "總是顧慮他人感受，讓你在做決定時容易猶豫。有時候，快速做出選擇比完美選擇更重要。",
        },
      },
    ],
    gifts: [
      {
        title: { zh: "感知力", en: "Perceptiveness", tw: "感知力" },
        description: {
          zh: "能感受到言语之下的情绪，读懂未说出口的话",
          en: "Sensing the emotion beneath words and reading what goes unsaid",
          tw: "能感受到言語之下的情緒，讀懂未說出口的話",
        },
        icon: "🌊",
      },
      {
        title: { zh: "调和力", en: "Harmonizing", tw: "調和力" },
        description: {
          zh: "天生的和平使者，能让不同的人走向一致",
          en: "A natural peacemaker who brings differing people into accord",
          tw: "天生的和平使者，能讓不同的人走向一致",
        },
        icon: "☯️",
      },
      {
        title: { zh: "艺术感", en: "Artistic Sense", tw: "藝術感" },
        description: {
          zh: "对美、韵律、和谐有天然的感受力",
          en: "A natural feel for beauty, rhythm, and harmony",
          tw: "對美、韻律、和諧有天然的感受力",
        },
        icon: "🎨",
      },
    ],
    lifeLessons: [
      {
        title: { zh: "建立自我价值感", en: "Build Self-Worth", tw: "建立自我價值感" },
        description: {
          zh: "你的价值不依赖于他人的认可。学会独立地爱自己，你才能给出真正无条件的爱。",
          en: "Your worth does not depend on others' approval. Learn to love yourself independently, and only then can you give truly unconditional love.",
          tw: "你的價值不依賴於他人的認可。學會獨立地愛自己，你才能給出真正無條件的愛。",
        },
      },
      {
        title: { zh: "学会说不", en: "Learn to Say No", tw: "學會說不" },
        description: {
          zh: "拒绝不会破坏关系，真正尊重你的人不需要你委屈自己。",
          en: "Saying no won't ruin a relationship; those who truly respect you don't need you to shortchange yourself.",
          tw: "拒絕不會破壞關係，真正尊重你的人不需要你委屈自己。",
        },
      },
    ],
    careerPaths: {
      zh: ["心理咨询师", "外交官", "音乐家", "社会工作者", "护士", "人力资源", "调解人"],
      en: ["Counselor", "Diplomat", "Musician", "Social Worker", "Nurse", "Human Resources", "Mediator"],
      tw: ["心理諮商師", "外交官", "音樂家", "社會工作者", "護理師", "人力資源", "調解人"],
    },
    loveInsight: {
      zh: "你是天生的恋人，给予爱的方式深情而细腻。但要警惕在关系中失去自我——爱人的前提是先爱好自己。",
      en: "You are a born romantic who loves deeply and tenderly. But beware of losing yourself in a relationship — loving another begins with loving yourself.",
      tw: "你是天生的戀人，給予愛的方式深情而細膩。但要警惕在關係中失去自我——愛人的前提是先愛好自己。",
    },
    yearAdvice: {
      zh: "深化重要的关系，放慢脚步倾听内心的声音。你不需要大声宣告，你的温柔力量自然会吸引对的人与事。",
      en: "Deepen the relationships that matter and slow down to listen within. You needn't announce yourself loudly — your gentle strength naturally draws the right people and opportunities.",
      tw: "深化重要的關係，放慢腳步傾聽內心的聲音。你不需要大聲宣告，你的溫柔力量自然會吸引對的人與事。",
    },
    luckyNumber: [2, 11, 20],
    luckyColor: { zh: "银色、浅蓝色", en: "Silver, Light Blue", tw: "銀色、淺藍色" },
    luckyDay: { zh: "周一", en: "Monday", tw: "週一" },
    luckyGem: { zh: "珍珠、月光石", en: "Pearl, Moonstone", tw: "珍珠、月光石" },
    spiritualMessage: {
      zh: "世界因你的温柔而变得更温暖。记住：你的敏感是天赋，不是弱点。",
      en: "The world grows warmer for your gentleness. Remember: your sensitivity is a gift, not a weakness.",
      tw: "世界因你的溫柔而變得更溫暖。記住：你的敏感是天賦，不是弱點。",
    },
    celebrities: {
      zh: ["比尔·盖茨", "奥巴马夫人米歇尔", "戴安娜王妃"],
      en: ["Bill Gates", "Michelle Obama", "Princess Diana"],
      tw: ["比爾·蓋茲", "蜜雪兒·歐巴馬", "黛安娜王妃"],
    },
  },

  3: {
    number: 3,
    name: { zh: "创造者", en: "The Creator", tw: "創造者" },
    title: { zh: "命运数字 · 三", en: "Destiny Number · Three", tw: "命運數字 · 三" },
    element: { zh: "风", en: "Air", tw: "風" },
    planet: { zh: "木星", en: "Jupiter", tw: "木星" },
    color: { zh: "明黄", en: "Bright Yellow", tw: "明黃" },
    colorHex: "#F59E0B",
    secondaryColorHex: "#FCD34D",
    symbol: "△",
    emoji: "✨",
    isMaster: false,
    tagline: {
      zh: "你是宇宙的艺术家，用创意与喜悦点亮每一个生命",
      en: "You are the cosmos's artist, lighting up every life with creativity and joy.",
      tw: "你是宇宙的藝術家，用創意與喜悅點亮每一個生命",
    },
    traits: {
      zh: ["创意", "表达力", "乐观", "幽默", "社交", "艺术性", "灵感"],
      en: ["Creative", "Expressive", "Optimistic", "Humorous", "Social", "Artistic", "Inspired"],
      tw: ["創意", "表達力", "樂觀", "幽默", "社交", "藝術性", "靈感"],
    },
    positiveTraits: [
      {
        title: { zh: "天赋表达者", en: "Gifted Communicator", tw: "天賦表達者" },
        description: {
          zh: "无论是语言、文字、音乐还是艺术，你都能找到独特的方式表达自我。你的创造力是永不枯竭的源泉。",
          en: "Whether through speech, writing, music, or art, you find a unique way to express yourself. Your creativity is a never-drying spring.",
          tw: "無論是語言、文字、音樂還是藝術，你都能找到獨特的方式表達自我。你的創造力是永不枯竭的源泉。",
        },
      },
      {
        title: { zh: "天生乐观", en: "Natural Optimist", tw: "天生樂觀" },
        description: {
          zh: "你的笑容和积极态度具有感染力，能瞬间驱散阴霾。走到哪里，你都是最亮眼的那束光。",
          en: "Your smile and positivity are contagious, instantly dispelling gloom. Wherever you go, you are the brightest light in the room.",
          tw: "你的笑容和積極態度具有感染力，能瞬間驅散陰霾。走到哪裡，你都是最亮眼的那束光。",
        },
      },
      {
        title: { zh: "社交达人", en: "Social Star", tw: "社交達人" },
        description: {
          zh: "你天生擅长与人连接，轻松建立关系，能在任何场合如鱼得水，让所有人感到轻松愉快。",
          en: "You are a natural at connecting with people, building rapport effortlessly and putting everyone at ease in any setting.",
          tw: "你天生擅長與人連接，輕鬆建立關係，能在任何場合如魚得水，讓所有人感到輕鬆愉快。",
        },
      },
    ],
    challenges: [
      {
        title: { zh: "注意力分散", en: "Scattered Focus", tw: "注意力分散" },
        description: {
          zh: "你的兴趣太广泛，常常半途而废。找到一个真正热爱的领域深耕，你的才华才能充分绽放。",
          en: "Your interests are so wide that you often leave things half-finished. Find one field you truly love and dig deep, and your talent will fully bloom.",
          tw: "你的興趣太廣泛，常常半途而廢。找到一個真正熱愛的領域深耕，你的才華才能充分綻放。",
        },
      },
      {
        title: { zh: "逃避现实", en: "Escaping Reality", tw: "逃避現實" },
        description: {
          zh: "面对压力时，你倾向于用玩笑或回避来掩盖内心的不安。学会正视情绪，是成熟的第一步。",
          en: "Under pressure you tend to mask inner unease with jokes or avoidance. Facing your emotions head-on is the first step to maturity.",
          tw: "面對壓力時，你傾向於用玩笑或迴避來掩蓋內心的不安。學會正視情緒，是成熟的第一步。",
        },
      },
    ],
    gifts: [
      {
        title: { zh: "创造力", en: "Creativity", tw: "創造力" },
        description: {
          zh: "想象力丰富，能从零创造出令人惊叹的作品",
          en: "A rich imagination that creates astonishing work from nothing",
          tw: "想像力豐富，能從零創造出令人驚嘆的作品",
        },
        icon: "🎭",
      },
      {
        title: { zh: "沟通力", en: "Communication", tw: "溝通力" },
        description: {
          zh: "用词精准有趣，能让复杂的事情变得简单生动",
          en: "Precise, playful wording that makes complex things simple and vivid",
          tw: "用詞精準有趣，能讓複雜的事情變得簡單生動",
        },
        icon: "💬",
      },
      {
        title: { zh: "感染力", en: "Contagious Energy", tw: "感染力" },
        description: {
          zh: "你的热情能点燃周围人的激情与动力",
          en: "Your enthusiasm ignites passion and drive in those around you",
          tw: "你的熱情能點燃周圍人的激情與動力",
        },
        icon: "🌟",
      },
    ],
    lifeLessons: [
      {
        title: { zh: "深耕而非广撒", en: "Go Deep, Not Wide", tw: "深耕而非廣撒" },
        description: {
          zh: "把你无限的创意聚焦于一处，成就将远超你的想象。",
          en: "Focus your boundless creativity in one place, and your achievements will far exceed what you imagine.",
          tw: "把你無限的創意聚焦於一處，成就將遠超你的想像。",
        },
      },
      {
        title: { zh: "勇于展示真实自我", en: "Dare to Show Your True Self", tw: "勇於展示真實自我" },
        description: {
          zh: "在欢笑的面具之下，你也有脆弱与深刻。让真实的你被看见，才能遇到真正懂你的人。",
          en: "Beneath the laughing mask you too carry vulnerability and depth. Let your real self be seen, and you'll meet those who truly understand you.",
          tw: "在歡笑的面具之下，你也有脆弱與深刻。讓真實的你被看見，才能遇到真正懂你的人。",
        },
      },
    ],
    careerPaths: {
      zh: ["作家", "演员", "设计师", "喜剧人", "教师", "营销人员", "公关"],
      en: ["Writer", "Actor", "Designer", "Comedian", "Teacher", "Marketer", "Public Relations"],
      tw: ["作家", "演員", "設計師", "喜劇演員", "教師", "行銷人員", "公關"],
    },
    loveInsight: {
      zh: "你的爱情充满趣味和浪漫，但要警惕用表面的欢乐掩盖真实的感情需求。深度与趣味并存，才是你最美的爱情。",
      en: "Your love life is full of fun and romance, but beware of using surface cheer to mask real emotional needs. Love that holds both depth and delight is your most beautiful kind.",
      tw: "你的愛情充滿趣味和浪漫，但要警惕用表面的歡樂掩蓋真實的感情需求。深度與趣味並存，才是你最美的愛情。",
    },
    yearAdvice: {
      zh: "让你的创意自由流淌！这是表达自我、建立个人品牌的最佳时机。不要因为别人的眼光而收起你的光芒。",
      en: "Let your creativity flow freely! This is the perfect time to express yourself and build your personal brand. Don't dim your light for others' opinions.",
      tw: "讓你的創意自由流淌！這是表達自我、建立個人品牌的最佳時機。不要因為別人的眼光而收起你的光芒。",
    },
    luckyNumber: [3, 12, 21],
    luckyColor: { zh: "黄色、橙色", en: "Yellow, Orange", tw: "黃色、橙色" },
    luckyDay: { zh: "周四", en: "Thursday", tw: "週四" },
    luckyGem: { zh: "黄水晶", en: "Citrine", tw: "黃水晶" },
    spiritualMessage: {
      zh: "你是宇宙的笑声，存在本身就是礼物。用你的创意，让这个世界多一点美好。",
      en: "You are the laughter of the universe; your very existence is a gift. Use your creativity to add a little more beauty to this world.",
      tw: "你是宇宙的笑聲，存在本身就是禮物。用你的創意，讓這個世界多一點美好。",
    },
    celebrities: {
      zh: ["查理·卓别林", "大卫·鲍伊", "宋慧乔"],
      en: ["Charlie Chaplin", "David Bowie", "Song Hye-kyo"],
      tw: ["查理·卓別林", "大衛·鮑伊", "宋慧喬"],
    },
  },

  4: {
    number: 4,
    name: { zh: "建造者", en: "The Builder", tw: "建造者" },
    title: { zh: "命运数字 · 四", en: "Destiny Number · Four", tw: "命運數字 · 四" },
    element: { zh: "土", en: "Earth", tw: "土" },
    planet: { zh: "天王星", en: "Uranus", tw: "天王星" },
    color: { zh: "大地棕", en: "Earth Brown", tw: "大地棕" },
    colorHex: "#6B5B45",
    secondaryColorHex: "#A0896B",
    symbol: "□",
    emoji: "🏛️",
    isMaster: false,
    tagline: {
      zh: "你是文明的基石，用双手与毅力将梦想化为坚实的现实",
      en: "You are the cornerstone of civilization, turning dreams into solid reality with your hands and perseverance.",
      tw: "你是文明的基石，用雙手與毅力將夢想化為堅實的現實",
    },
    traits: {
      zh: ["踏实", "组织力", "忠诚", "实际", "耐心", "系统性", "责任感"],
      en: ["Grounded", "Organized", "Loyal", "Practical", "Patient", "Systematic", "Responsible"],
      tw: ["踏實", "組織力", "忠誠", "實際", "耐心", "系統性", "責任感"],
    },
    positiveTraits: [
      {
        title: { zh: "卓越执行力", en: "Outstanding Execution", tw: "卓越執行力" },
        description: {
          zh: "你是天生的建造者，能把混乱的想法变成有序的计划，并一步一步落地实现。成功对你来说是必然，只需时间。",
          en: "You are a born builder who turns messy ideas into orderly plans and brings them to life step by step. Success is inevitable for you — it only takes time.",
          tw: "你是天生的建造者，能把混亂的想法變成有序的計畫，並一步一步落地實現。成功對你來說是必然，只需時間。",
        },
      },
      {
        title: { zh: "无比可靠", en: "Utterly Reliable", tw: "無比可靠" },
        description: {
          zh: "你言出必行，是朋友和同事眼中最可靠的那个人。你的稳定和忠诚是稀缺的品质。",
          en: "You keep your word and are the most dependable person to friends and colleagues alike. Your steadiness and loyalty are rare qualities.",
          tw: "你言出必行，是朋友和同事眼中最可靠的那個人。你的穩定和忠誠是稀缺的品質。",
        },
      },
      {
        title: { zh: "系统化思维", en: "Systematic Thinking", tw: "系統化思維" },
        description: {
          zh: "你擅长建立体系，优化流程。在你的管理下，任何混乱都会变得井井有条。",
          en: "You excel at building systems and refining processes. Under your management, any chaos becomes perfectly ordered.",
          tw: "你擅長建立體系，優化流程。在你的管理下，任何混亂都會變得井井有條。",
        },
      },
    ],
    challenges: [
      {
        title: { zh: "过于固执保守", en: "Overly Rigid", tw: "過於固執保守" },
        description: {
          zh: "你对变化和风险有天然的抗拒，这可能让你错失新的机遇。适度拥抱不确定性，是你突破的关键。",
          en: "You have a natural resistance to change and risk, which can cost you new opportunities. Embracing uncertainty in measure is key to your breakthrough.",
          tw: "你對變化和風險有天然的抗拒，這可能讓你錯失新的機遇。適度擁抱不確定性，是你突破的關鍵。",
        },
      },
      {
        title: { zh: "工作狂倾向", en: "Workaholic Tendency", tw: "工作狂傾向" },
        description: {
          zh: "你把工作和责任置于一切之上，容易忽略休息和娱乐。记住，人生不只有工作。",
          en: "You place work and duty above all else and easily neglect rest and play. Remember, there is more to life than work.",
          tw: "你把工作和責任置於一切之上，容易忽略休息和娛樂。記住，人生不只有工作。",
        },
      },
    ],
    gifts: [
      {
        title: { zh: "组织力", en: "Organization", tw: "組織力" },
        description: {
          zh: "将复杂事务化为清晰步骤，效率超群",
          en: "Turning complex tasks into clear steps with exceptional efficiency",
          tw: "將複雜事務化為清晰步驟，效率超群",
        },
        icon: "📐",
      },
      {
        title: { zh: "耐力", en: "Endurance", tw: "耐力" },
        description: {
          zh: "能够长期坚持，不达目标誓不罢休",
          en: "Sustaining effort over the long haul, never quitting until the goal is reached",
          tw: "能夠長期堅持，不達目標誓不罷休",
        },
        icon: "⚙️",
      },
      {
        title: { zh: "专注力", en: "Focus", tw: "專注力" },
        description: {
          zh: "进入工作状态后，几乎无法被干扰",
          en: "Once in the zone, you are almost impossible to distract",
          tw: "進入工作狀態後，幾乎無法被干擾",
        },
        icon: "🎯",
      },
    ],
    lifeLessons: [
      {
        title: { zh: "学会灵活变通", en: "Learn Flexibility", tw: "學會靈活變通" },
        description: {
          zh: "规则和计划是工具，不是枷锁。学会在必要时调整方向，是智慧的体现。",
          en: "Rules and plans are tools, not shackles. Knowing when to adjust course is a mark of wisdom.",
          tw: "規則和計畫是工具，不是枷鎖。學會在必要時調整方向，是智慧的體現。",
        },
      },
      {
        title: { zh: "允许自己享乐", en: "Allow Yourself Pleasure", tw: "允許自己享樂" },
        description: {
          zh: "你工作了这么努力，值得好好犒赏自己。生命中除了责任，还有许多美好值得品味。",
          en: "You've worked so hard — you deserve to reward yourself. Beyond duty, life holds much beauty worth savoring.",
          tw: "你工作了這麼努力，值得好好犒賞自己。生命中除了責任，還有許多美好值得品味。",
        },
      },
    ],
    careerPaths: {
      zh: ["工程师", "建筑师", "项目经理", "会计", "律师", "科学家", "程序员"],
      en: ["Engineer", "Architect", "Project Manager", "Accountant", "Lawyer", "Scientist", "Programmer"],
      tw: ["工程師", "建築師", "專案經理", "會計師", "律師", "科學家", "程式設計師"],
    },
    loveInsight: {
      zh: "你在爱情中稳定而忠实，但有时过于实际而缺少浪漫。试着在偶尔为伴侣制造一点惊喜——这会让感情更有温度。",
      en: "In love you are steady and faithful, but sometimes too practical and short on romance. Try surprising your partner now and then — it warms the relationship.",
      tw: "你在愛情中穩定而忠實，但有時過於實際而缺少浪漫。試著在偶爾為伴侶製造一點驚喜——這會讓感情更有溫度。",
    },
    yearAdvice: {
      zh: "你播下的种子即将结果。继续保持踏实努力，但也要让自己的付出被看见。不要总是默默承担，适时表达需求。",
      en: "The seeds you planted are about to bear fruit. Keep working diligently, but also let your contributions be seen. Don't always shoulder things silently — voice your needs when the time is right.",
      tw: "你播下的種子即將結果。繼續保持踏實努力，但也要讓自己的付出被看見。不要總是默默承擔，適時表達需求。",
    },
    luckyNumber: [4, 13, 22],
    luckyColor: { zh: "绿色、棕色", en: "Green, Brown", tw: "綠色、棕色" },
    luckyDay: { zh: "周六", en: "Saturday", tw: "週六" },
    luckyGem: { zh: "翡翠", en: "Jade", tw: "翡翠" },
    spiritualMessage: {
      zh: "你是大地的力量。每一块基石的放置，都是对这个世界的贡献。",
      en: "You are the strength of the earth. Every cornerstone you lay is a contribution to this world.",
      tw: "你是大地的力量。每一塊基石的放置，都是對這個世界的貢獻。",
    },
    celebrities: {
      zh: ["比尔·盖茨", "阿诺德·施瓦辛格", "拿破仑"],
      en: ["Bill Gates", "Arnold Schwarzenegger", "Napoleon"],
      tw: ["比爾·蓋茲", "阿諾·史瓦辛格", "拿破崙"],
    },
  },

  5: {
    number: 5,
    name: { zh: "自由者", en: "The Free Spirit", tw: "自由者" },
    title: { zh: "命运数字 · 五", en: "Destiny Number · Five", tw: "命運數字 · 五" },
    element: { zh: "风", en: "Air", tw: "風" },
    planet: { zh: "水星", en: "Mercury", tw: "水星" },
    color: { zh: "天空蓝", en: "Sky Blue", tw: "天空藍" },
    colorHex: "#0EA5E9",
    secondaryColorHex: "#38BDF8",
    symbol: "⚡",
    emoji: "🌪️",
    isMaster: false,
    tagline: {
      zh: "你是风的化身，自由、变化与探索是你永恒的主题",
      en: "You are the embodiment of the wind — freedom, change, and exploration are your eternal themes.",
      tw: "你是風的化身，自由、變化與探索是你永恆的主題",
    },
    traits: {
      zh: ["自由", "冒险", "适应力", "多才多艺", "好奇心", "变通", "活力"],
      en: ["Free", "Adventurous", "Adaptable", "Versatile", "Curious", "Flexible", "Energetic"],
      tw: ["自由", "冒險", "適應力", "多才多藝", "好奇心", "變通", "活力"],
    },
    positiveTraits: [
      {
        title: { zh: "无限适应力", en: "Boundless Adaptability", tw: "無限適應力" },
        description: {
          zh: "变化对别人来说是威胁，对你来说是礼物。你能在任何环境中快速适应，找到新的可能性。",
          en: "What feels like a threat to others is a gift to you. You adapt quickly to any environment and find new possibilities.",
          tw: "變化對別人來說是威脅，對你來說是禮物。你能在任何環境中快速適應，找到新的可能性。",
        },
      },
      {
        title: { zh: "天生探险家", en: "Born Explorer", tw: "天生探險家" },
        description: {
          zh: "你对世界充满好奇，渴望体验不同的文化、思想和生活方式。你的人生故事永远比别人精彩。",
          en: "You are full of curiosity, longing to experience different cultures, ideas, and ways of living. Your life story is always more colorful than others'.",
          tw: "你對世界充滿好奇，渴望體驗不同的文化、思想和生活方式。你的人生故事永遠比別人精彩。",
        },
      },
      {
        title: { zh: "多面才华", en: "Many Talents", tw: "多面才華" },
        description: {
          zh: "你学什么都快，兴趣广泛，能轻松驾驭多个领域。这种多才多艺是你独特的竞争优势。",
          en: "You learn anything fast, have wide interests, and handle many fields with ease. This versatility is your distinct competitive edge.",
          tw: "你學什麼都快，興趣廣泛，能輕鬆駕馭多個領域。這種多才多藝是你獨特的競爭優勢。",
        },
      },
    ],
    challenges: [
      {
        title: { zh: "缺乏持续性", en: "Lack of Consistency", tw: "缺乏持續性" },
        description: {
          zh: "你很快对新事物厌倦，常在关键时刻放弃。找到真正点燃你热情的事，然后坚持下去。",
          en: "You tire of new things quickly and often quit at the crucial moment. Find what truly ignites your passion, then stay with it.",
          tw: "你很快對新事物厭倦，常在關鍵時刻放棄。找到真正點燃你熱情的事，然後堅持下去。",
        },
      },
      {
        title: { zh: "逃避承诺", en: "Avoiding Commitment", tw: "逃避承諾" },
        description: {
          zh: "对自由的渴望有时让你对关系和责任产生恐惧。学会在自由与联结之间找到平衡。",
          en: "Your craving for freedom can make you fear relationships and responsibility. Learn to find balance between freedom and connection.",
          tw: "對自由的渴望有時讓你對關係和責任產生恐懼。學會在自由與聯結之間找到平衡。",
        },
      },
    ],
    gifts: [
      {
        title: { zh: "适应力", en: "Adaptability", tw: "適應力" },
        description: {
          zh: "在任何环境中都能找到自己的位置",
          en: "Finding your place in any environment",
          tw: "在任何環境中都能找到自己的位置",
        },
        icon: "🌊",
      },
      {
        title: { zh: "沟通力", en: "Communication", tw: "溝通力" },
        description: {
          zh: "善于与不同背景的人建立连接",
          en: "Skilled at connecting with people from all backgrounds",
          tw: "善於與不同背景的人建立連接",
        },
        icon: "🗣️",
      },
      {
        title: { zh: "创新思维", en: "Innovative Thinking", tw: "創新思維" },
        description: {
          zh: "不受传统束缚，能看到别人看不到的解决方案",
          en: "Unbound by tradition, seeing solutions others can't",
          tw: "不受傳統束縛，能看到別人看不到的解決方案",
        },
        icon: "🔭",
      },
    ],
    lifeLessons: [
      {
        title: { zh: "在自由中寻找深度", en: "Find Depth Within Freedom", tw: "在自由中尋找深度" },
        description: {
          zh: "真正的自由不是逃离，而是带着觉知去选择。深化某段关系或某个领域，反而会给你带来更深的自由感。",
          en: "True freedom isn't escape but choosing with awareness. Deepening a relationship or a field will actually give you a greater sense of freedom.",
          tw: "真正的自由不是逃離，而是帶著覺知去選擇。深化某段關係或某個領域，反而會給你帶來更深的自由感。",
        },
      },
      {
        title: { zh: "学会负责任", en: "Learn Responsibility", tw: "學會負責任" },
        description: {
          zh: "承担责任不会剥夺你的自由，反而会给你带来真正的尊重和信任。",
          en: "Taking responsibility won't rob you of freedom — it earns you genuine respect and trust.",
          tw: "承擔責任不會剝奪你的自由，反而會給你帶來真正的尊重和信任。",
        },
      },
    ],
    careerPaths: {
      zh: ["旅行作家", "记者", "销售", "演员", "外交官", "导游", "自由职业"],
      en: ["Travel Writer", "Journalist", "Sales", "Actor", "Diplomat", "Tour Guide", "Freelancer"],
      tw: ["旅行作家", "記者", "業務", "演員", "外交官", "導遊", "自由工作者"],
    },
    loveInsight: {
      zh: "你在爱情中需要充足的个人空间，找一个理解你天性的伴侣至关重要。当你真正遇到心灵契合的人，你会愿意为Ta放慢脚步。",
      en: "In love you need ample personal space, so finding a partner who understands your nature is vital. When you meet a true kindred spirit, you'll gladly slow down for them.",
      tw: "你在愛情中需要充足的個人空間，找一個理解你天性的伴侶至關重要。當你真正遇到心靈契合的人，你會願意為對方放慢腳步。",
    },
    yearAdvice: {
      zh: "这是扩展视野的最佳时机，去旅行，学新技能，认识新朋友！同时也是时候完成一件长期搁置的事情了。",
      en: "This is the best time to broaden your horizons — travel, learn new skills, meet new people! It's also time to finish something long left undone.",
      tw: "這是擴展視野的最佳時機，去旅行，學新技能，認識新朋友！同時也是時候完成一件長期擱置的事情了。",
    },
    luckyNumber: [5, 14, 23],
    luckyColor: { zh: "蓝色、青绿色", en: "Blue, Teal", tw: "藍色、青綠色" },
    luckyDay: { zh: "周三", en: "Wednesday", tw: "週三" },
    luckyGem: { zh: "绿松石", en: "Turquoise", tw: "綠松石" },
    spiritualMessage: {
      zh: "你是生命中风的低语，提醒人们：改变，是通往新生的唯一之路。",
      en: "You are the whisper of the wind in life, reminding people that change is the only path to renewal.",
      tw: "你是生命中風的低語，提醒人們：改變，是通往新生的唯一之路。",
    },
    celebrities: {
      zh: ["麦当娜", "文森特·梵高", "泰勒·斯威夫特"],
      en: ["Madonna", "Vincent van Gogh", "Taylor Swift"],
      tw: ["瑪丹娜", "文森·梵谷", "泰勒絲"],
    },
  },

  6: {
    number: 6,
    name: { zh: "养育者", en: "The Nurturer", tw: "養育者" },
    title: { zh: "命运数字 · 六", en: "Destiny Number · Six", tw: "命運數字 · 六" },
    element: { zh: "土", en: "Earth", tw: "土" },
    planet: { zh: "金星", en: "Venus", tw: "金星" },
    color: { zh: "玫瑰粉", en: "Rose Pink", tw: "玫瑰粉" },
    colorHex: "#EC4899",
    secondaryColorHex: "#F9A8D4",
    symbol: "♡",
    emoji: "🌹",
    isMaster: false,
    tagline: {
      zh: "你是爱与美的使者，用温暖与责任守护世间一切珍贵之物",
      en: "You are an envoy of love and beauty, guarding all that is precious with warmth and responsibility.",
      tw: "你是愛與美的使者，用溫暖與責任守護世間一切珍貴之物",
    },
    traits: {
      zh: ["责任感", "爱心", "治愈", "美感", "和谐", "守护", "服务"],
      en: ["Responsible", "Loving", "Healing", "Aesthetic", "Harmonious", "Protective", "Service-minded"],
      tw: ["責任感", "愛心", "療癒", "美感", "和諧", "守護", "服務"],
    },
    positiveTraits: [
      {
        title: { zh: "天生守护者", en: "Born Protector", tw: "天生守護者" },
        description: {
          zh: "你天生渴望照顾和保护他人，对家人和朋友的付出不计代价。你的爱是最无私、最真实的。",
          en: "You are born to care for and protect others, giving to family and friends without counting the cost. Your love is the most selfless and genuine.",
          tw: "你天生渴望照顧和保護他人，對家人和朋友的付出不計代價。你的愛是最無私、最真實的。",
        },
      },
      {
        title: { zh: "和谐创造者", en: "Harmony Maker", tw: "和諧創造者" },
        description: {
          zh: "你有极强的审美能力和对美的感知，能将身边的环境打造成和谐美好的样子。",
          en: "You have a strong aesthetic sense and feel for beauty, shaping your surroundings into something harmonious and lovely.",
          tw: "你有極強的審美能力和對美的感知，能將身邊的環境打造成和諧美好的樣子。",
        },
      },
      {
        title: { zh: "感情深厚", en: "Deeply Devoted", tw: "感情深厚" },
        description: {
          zh: "你的感情世界极为丰富，爱得认真，也爱得深沉。在你身边的人，都能感受到被真心珍视的温暖。",
          en: "Your emotional world is rich; you love earnestly and deeply. Those around you feel the warmth of being truly cherished.",
          tw: "你的感情世界極為豐富，愛得認真，也愛得深沉。在你身邊的人，都能感受到被真心珍視的溫暖。",
        },
      },
    ],
    challenges: [
      {
        title: { zh: "过度干涉", en: "Over-Involvement", tw: "過度干涉" },
        description: {
          zh: "你的好意有时会演变成过度控制，给被你爱的人带来压力。学会放手，信任对方能照顾好自己。",
          en: "Your good intentions can turn into over-control, pressuring those you love. Learn to let go and trust they can take care of themselves.",
          tw: "你的好意有時會演變成過度控制，給被你愛的人帶來壓力。學會放手，信任對方能照顧好自己。",
        },
      },
      {
        title: { zh: "自我牺牲", en: "Self-Sacrifice", tw: "自我犧牲" },
        description: {
          zh: "你把别人的需求永远放在自己之前，久而久之会产生怨气。记住，先爱好自己，才能更好地爱他人。",
          en: "You always put others' needs before your own, and resentment builds over time. Remember: love yourself first to love others better.",
          tw: "你把別人的需求永遠放在自己之前，久而久之會產生怨氣。記住，先愛好自己，才能更好地愛他人。",
        },
      },
    ],
    gifts: [
      {
        title: { zh: "治愈力", en: "Healing Presence", tw: "療癒力" },
        description: {
          zh: "你的存在本身就能给人带来安慰与温暖",
          en: "Your very presence brings comfort and warmth to others",
          tw: "你的存在本身就能給人帶來安慰與溫暖",
        },
        icon: "💗",
      },
      {
        title: { zh: "美学天赋", en: "Aesthetic Gift", tw: "美學天賦" },
        description: {
          zh: "对色彩、形式、和谐有超敏锐的感知",
          en: "An exceptionally keen sense of color, form, and harmony",
          tw: "對色彩、形式、和諧有超敏銳的感知",
        },
        icon: "🎨",
      },
      {
        title: { zh: "责任心", en: "Sense of Duty", tw: "責任心" },
        description: {
          zh: "勇于承担，可以托付重任",
          en: "Willing to take responsibility and worthy of important trust",
          tw: "勇於承擔，可以託付重任",
        },
        icon: "🛡️",
      },
    ],
    lifeLessons: [
      {
        title: { zh: "爱自己是一切的根基", en: "Self-Love Is the Foundation", tw: "愛自己是一切的根基" },
        description: {
          zh: "你如此善于爱别人，但请把同等的爱给自己。你的需求同样重要。",
          en: "You are so good at loving others — give yourself that same love. Your needs matter just as much.",
          tw: "你如此善於愛別人，但請把同等的愛給自己。你的需求同樣重要。",
        },
      },
      {
        title: { zh: "区分关爱与控制", en: "Distinguish Care From Control", tw: "區分關愛與控制" },
        description: {
          zh: "真正的爱是给对方自由选择的权利，而不是按照你理想的方式去爱他。",
          en: "True love grants the other the freedom to choose, rather than loving them only in your ideal way.",
          tw: "真正的愛是給對方自由選擇的權利，而不是按照你理想的方式去愛他。",
        },
      },
    ],
    careerPaths: {
      zh: ["医生", "护士", "教师", "心理治疗师", "室内设计师", "厨师", "社会工作者"],
      en: ["Doctor", "Nurse", "Teacher", "Psychotherapist", "Interior Designer", "Chef", "Social Worker"],
      tw: ["醫師", "護理師", "教師", "心理治療師", "室內設計師", "廚師", "社會工作者"],
    },
    loveInsight: {
      zh: "你是最完美的伴侣，付出全部，但也需要被同等珍视。别害怕说出你的需求——你值得被好好爱着。",
      en: "You are the most devoted partner, giving everything, yet you also need to be cherished in return. Don't be afraid to voice your needs — you deserve to be loved well.",
      tw: "你是最完美的伴侶，付出全部，但也需要被同等珍視。別害怕說出你的需求——你值得被好好愛著。",
    },
    yearAdvice: {
      zh: "关注你最重要的关系，投入真心去维护。同时也是时候在美与创意方面发展副业了，你的品味是独一无二的财富。",
      en: "Tend to your most important relationships with genuine care. It's also time to develop a side pursuit in beauty or creativity — your taste is a one-of-a-kind asset.",
      tw: "關注你最重要的關係，投入真心去維護。同時也是時候在美與創意方面發展副業了，你的品味是獨一無二的財富。",
    },
    luckyNumber: [6, 15, 24],
    luckyColor: { zh: "玫瑰红、粉色", en: "Rose Red, Pink", tw: "玫瑰紅、粉色" },
    luckyDay: { zh: "周五", en: "Friday", tw: "週五" },
    luckyGem: { zh: "粉水晶", en: "Rose Quartz", tw: "粉晶" },
    spiritualMessage: {
      zh: "爱是宇宙最强大的力量，而你是它在地球上最美丽的通道。",
      en: "Love is the most powerful force in the universe, and you are its most beautiful channel on earth.",
      tw: "愛是宇宙最強大的力量，而你是它在地球上最美麗的通道。",
    },
    celebrities: {
      zh: ["特蕾莎修女", "约翰·列侬", "梅丽尔·斯特里普"],
      en: ["Mother Teresa", "John Lennon", "Meryl Streep"],
      tw: ["德蕾莎修女", "約翰·藍儂", "梅莉·史翠普"],
    },
  },

  7: {
    number: 7,
    name: { zh: "求知者", en: "The Seeker", tw: "求知者" },
    title: { zh: "命运数字 · 七", en: "Destiny Number · Seven", tw: "命運數字 · 七" },
    element: { zh: "水", en: "Water", tw: "水" },
    planet: { zh: "海王星", en: "Neptune", tw: "海王星" },
    color: { zh: "深紫", en: "Deep Purple", tw: "深紫" },
    colorHex: "#7C3AED",
    secondaryColorHex: "#A78BFA",
    symbol: "☆",
    emoji: "🔮",
    isMaster: false,
    tagline: {
      zh: "你是宇宙的探索者，在神秘与智慧之间寻找生命的终极答案",
      en: "You are the cosmos's seeker, searching between mystery and wisdom for life's ultimate answers.",
      tw: "你是宇宙的探索者，在神祕與智慧之間尋找生命的終極答案",
    },
    traits: {
      zh: ["智慧", "直觉", "深度", "神秘", "内省", "分析力", "灵性"],
      en: ["Wise", "Intuitive", "Profound", "Mysterious", "Introspective", "Analytical", "Spiritual"],
      tw: ["智慧", "直覺", "深度", "神祕", "內省", "分析力", "靈性"],
    },
    positiveTraits: [
      {
        title: { zh: "深邃智者", en: "Profound Thinker", tw: "深邃智者" },
        description: {
          zh: "你对事物的理解总是超越表面，能看见别人看不见的层次。你的思维深度是你最珍贵的天赋。",
          en: "Your understanding always goes beyond the surface, perceiving layers others cannot see. The depth of your thinking is your most precious gift.",
          tw: "你對事物的理解總是超越表面，能看見別人看不見的層次。你的思維深度是你最珍貴的天賦。",
        },
      },
      {
        title: { zh: "灵性感知", en: "Spiritual Perception", tw: "靈性感知" },
        description: {
          zh: "你与宇宙的神秘力量有天然的连接，对灵性、哲学、形而上学有强烈的兴趣和直觉。",
          en: "You have a natural connection to the mysterious forces of the universe, with strong interest and intuition for spirituality, philosophy, and metaphysics.",
          tw: "你與宇宙的神祕力量有天然的連接，對靈性、哲學、形而上學有強烈的興趣和直覺。",
        },
      },
      {
        title: { zh: "独立思考", en: "Independent Thought", tw: "獨立思考" },
        description: {
          zh: "你不随波逐流，善于独立研究，追求真相。你的分析能力让你总能找到被人忽视的真相。",
          en: "You don't follow the crowd; you research independently and pursue the truth. Your analytical power always uncovers truths others overlook.",
          tw: "你不隨波逐流，善於獨立研究，追求真相。你的分析能力讓你總能找到被人忽視的真相。",
        },
      },
    ],
    challenges: [
      {
        title: { zh: "过度孤立", en: "Excessive Isolation", tw: "過度孤立" },
        description: {
          zh: "你享受独处，但有时会把自己封闭得太深，让他人难以接近。偶尔走出内心的城堡，与世界连接。",
          en: "You enjoy solitude, but sometimes seal yourself off so deeply that others can't reach you. Step out of your inner fortress now and then to connect with the world.",
          tw: "你享受獨處，但有時會把自己封閉得太深，讓他人難以接近。偶爾走出內心的城堡，與世界連接。",
        },
      },
      {
        title: { zh: "过度分析", en: "Over-Analysis", tw: "過度分析" },
        description: {
          zh: "你的分析能力有时会过度运转，陷入无休止的思考而无法行动。相信直觉，先行动再完善。",
          en: "Your analytical mind sometimes runs in overdrive, trapping you in endless thought without action. Trust your intuition — act first, refine later.",
          tw: "你的分析能力有時會過度運轉，陷入無休止的思考而無法行動。相信直覺，先行動再完善。",
        },
      },
    ],
    gifts: [
      {
        title: { zh: "洞察力", en: "Insight", tw: "洞察力" },
        description: {
          zh: "看穿表象，直达事物的本质",
          en: "Seeing through appearances straight to the essence of things",
          tw: "看穿表象，直達事物的本質",
        },
        icon: "👁️",
      },
      {
        title: { zh: "研究力", en: "Research Power", tw: "研究力" },
        description: {
          zh: "能长时间深入钻研一个课题",
          en: "Able to study a single subject deeply over a long period",
          tw: "能長時間深入鑽研一個課題",
        },
        icon: "📚",
      },
      {
        title: { zh: "直觉", en: "Intuition", tw: "直覺" },
        description: {
          zh: "感知超越感官，与更高维度的智慧相连",
          en: "Perception beyond the senses, connected to higher-dimensional wisdom",
          tw: "感知超越感官，與更高維度的智慧相連",
        },
        icon: "✨",
      },
    ],
    lifeLessons: [
      {
        title: { zh: "在独处与连接间取得平衡", en: "Balance Solitude and Connection", tw: "在獨處與連接間取得平衡" },
        description: {
          zh: "孤独滋养你，但关系也能让你成长。让他人进入你的世界，你会发现更多维度的自己。",
          en: "Solitude nourishes you, but relationships help you grow too. Let others into your world and you'll discover more dimensions of yourself.",
          tw: "孤獨滋養你，但關係也能讓你成長。讓他人進入你的世界，你會發現更多維度的自己。",
        },
      },
      {
        title: { zh: "信任而非控制", en: "Trust Rather Than Control", tw: "信任而非控制" },
        description: {
          zh: "你对真相的渴望有时演变为对一切的质疑。学会在某些事上放手，接受生命的神秘本质。",
          en: "Your hunger for truth can turn into doubting everything. Learn to let go of some things and accept the mysterious nature of life.",
          tw: "你對真相的渴望有時演變為對一切的質疑。學會在某些事上放手，接受生命的神祕本質。",
        },
      },
    ],
    careerPaths: {
      zh: ["哲学家", "科学家", "心理分析师", "神秘学研究者", "作家", "侦探", "程序员"],
      en: ["Philosopher", "Scientist", "Psychoanalyst", "Esoteric Researcher", "Writer", "Detective", "Programmer"],
      tw: ["哲學家", "科學家", "心理分析師", "神祕學研究者", "作家", "偵探", "程式設計師"],
    },
    loveInsight: {
      zh: "你在爱情中需要深度的精神连接，肤浅的关系无法满足你。遇到能和你一起探索宇宙奥秘的灵魂伴侣，才是你的真爱。",
      en: "In love you need deep spiritual connection; shallow relationships can't satisfy you. Your true love is a soulmate who explores the mysteries of the universe alongside you.",
      tw: "你在愛情中需要深度的精神連接，膚淺的關係無法滿足你。遇到能和你一起探索宇宙奧祕的靈魂伴侶，才是你的真愛。",
    },
    yearAdvice: {
      zh: "深化你的专业知识，写下你的洞见。你长期积累的智慧，在这个时期会得到意想不到的认可。",
      en: "Deepen your expertise and write down your insights. The wisdom you've accumulated over the years will win unexpected recognition during this period.",
      tw: "深化你的專業知識，寫下你的洞見。你長期積累的智慧，在這個時期會得到意想不到的認可。",
    },
    luckyNumber: [7, 16, 25],
    luckyColor: { zh: "紫色、靛蓝", en: "Purple, Indigo", tw: "紫色、靛藍" },
    luckyDay: { zh: "周一", en: "Monday", tw: "週一" },
    luckyGem: { zh: "紫水晶", en: "Amethyst", tw: "紫水晶" },
    spiritualMessage: {
      zh: "宇宙选择了你作为真理的守护者。你的探寻，是对人类智慧最深刻的贡献。",
      en: "The universe has chosen you as a guardian of truth. Your seeking is among the most profound contributions to human wisdom.",
      tw: "宇宙選擇了你作為真理的守護者。你的探尋，是對人類智慧最深刻的貢獻。",
    },
    celebrities: {
      zh: ["爱因斯坦", "尼古拉·特斯拉", "卡尔·荣格"],
      en: ["Albert Einstein", "Nikola Tesla", "Carl Jung"],
      tw: ["愛因斯坦", "尼古拉·特斯拉", "卡爾·榮格"],
    },
  },

  8: {
    number: 8,
    name: { zh: "权力者", en: "The Powerhouse", tw: "權力者" },
    title: { zh: "命运数字 · 八", en: "Destiny Number · Eight", tw: "命運數字 · 八" },
    element: { zh: "土", en: "Earth", tw: "土" },
    planet: { zh: "土星", en: "Saturn", tw: "土星" },
    color: { zh: "帝王金", en: "Imperial Gold", tw: "帝王金" },
    colorHex: "#B45309",
    secondaryColorHex: "#D97706",
    symbol: "∞",
    emoji: "💎",
    isMaster: false,
    tagline: {
      zh: "你天生与财富和权力共鸣，是驾驭物质世界的命运使者",
      en: "You resonate naturally with wealth and power — a destined master of the material world.",
      tw: "你天生與財富和權力共鳴，是駕馭物質世界的命運使者",
    },
    traits: {
      zh: ["权力", "财富", "野心", "效率", "魄力", "策略", "自律"],
      en: ["Power", "Wealth", "Ambition", "Efficiency", "Boldness", "Strategy", "Discipline"],
      tw: ["權力", "財富", "野心", "效率", "魄力", "策略", "自律"],
    },
    positiveTraits: [
      {
        title: { zh: "天生商业头脑", en: "Born for Business", tw: "天生商業頭腦" },
        description: {
          zh: "你对资源、权力和财富有天然的感知与驾驭能力，能在商业世界中游刃有余，创造价值。",
          en: "You have a natural feel for resources, power, and wealth, moving with ease through the business world and creating value.",
          tw: "你對資源、權力和財富有天然的感知與駕馭能力，能在商業世界中游刃有餘，創造價值。",
        },
      },
      {
        title: { zh: "战略眼光", en: "Strategic Vision", tw: "戰略眼光" },
        description: {
          zh: "你能从全局出发，制定长远规划。你不只是看眼前，而是看三步、五步之后的棋局。",
          en: "You think from the big picture and craft long-range plans. You don't just see the present — you see three, five moves ahead.",
          tw: "你能從全局出發，制定長遠規劃。你不只是看眼前，而是看三步、五步之後的棋局。",
        },
      },
      {
        title: { zh: "强大执行力", en: "Powerful Execution", tw: "強大執行力" },
        description: {
          zh: "目标一旦确定，你会以雷厉风行的方式推进。高效、自律、专注，是你的行动标签。",
          en: "Once a goal is set, you drive forward with decisive force. Efficient, disciplined, and focused — these are your hallmarks in action.",
          tw: "目標一旦確定，你會以雷厲風行的方式推進。高效、自律、專注，是你的行動標籤。",
        },
      },
    ],
    challenges: [
      {
        title: { zh: "过于物质化", en: "Too Materialistic", tw: "過於物質化" },
        description: {
          zh: "对成功和财富的渴望有时会让你忽视精神和情感的需求。提醒自己，内心的富足同样重要。",
          en: "Your hunger for success and wealth can make you neglect spiritual and emotional needs. Remind yourself that inner abundance matters just as much.",
          tw: "對成功和財富的渴望有時會讓你忽視精神和情感的需求。提醒自己，內心的富足同樣重要。",
        },
      },
      {
        title: { zh: "控制欲过强", en: "Excessive Need for Control", tw: "控制欲過強" },
        description: {
          zh: "你习惯掌控一切，但没有人喜欢被控制。学会授权，你会发现更大的力量来自信任。",
          en: "You are used to controlling everything, but no one likes being controlled. Learn to delegate, and you'll find greater power comes from trust.",
          tw: "你習慣掌控一切，但沒有人喜歡被控制。學會授權，你會發現更大的力量來自信任。",
        },
      },
    ],
    gifts: [
      {
        title: { zh: "财富力", en: "Wealth Magnetism", tw: "財富力" },
        description: {
          zh: "天生具有积累和管理财富的才能",
          en: "A natural talent for building and managing wealth",
          tw: "天生具有積累和管理財富的才能",
        },
        icon: "💰",
      },
      {
        title: { zh: "领导力", en: "Leadership", tw: "領導力" },
        description: {
          zh: "强大的气场，自然聚集能量和资源",
          en: "A commanding presence that naturally gathers energy and resources",
          tw: "強大的氣場，自然聚集能量和資源",
        },
        icon: "🏆",
      },
      {
        title: { zh: "战略力", en: "Strategy", tw: "戰略力" },
        description: {
          zh: "看清全局，能做出最优的决策",
          en: "Seeing the whole board and making the optimal decision",
          tw: "看清全局，能做出最優的決策",
        },
        icon: "♟️",
      },
    ],
    lifeLessons: [
      {
        title: { zh: "权力服务于爱", en: "Power in Service of Love", tw: "權力服務於愛" },
        description: {
          zh: "你被赋予影响力，是为了服务更大的善。把你的成功用来创造更多价值，而非彰显地位。",
          en: "You were given influence to serve a greater good. Use your success to create more value, not to flaunt status.",
          tw: "你被賦予影響力，是為了服務更大的善。把你的成功用來創造更多價值，而非彰顯地位。",
        },
      },
      {
        title: { zh: "放下对控制的执念", en: "Release the Grip of Control", tw: "放下對控制的執念" },
        description: {
          zh: "有些事情的发展超出你的掌控，那并不是失败，而是宇宙的安排。",
          en: "Some things unfold beyond your control — that isn't failure, but the arrangement of the universe.",
          tw: "有些事情的發展超出你的掌控，那並不是失敗，而是宇宙的安排。",
        },
      },
    ],
    careerPaths: {
      zh: ["企业家", "投资人", "CEO", "律师", "政治家", "银行家", "地产大亨"],
      en: ["Entrepreneur", "Investor", "CEO", "Lawyer", "Politician", "Banker", "Real Estate Magnate"],
      tw: ["企業家", "投資人", "CEO", "律師", "政治家", "銀行家", "地產大亨"],
    },
    loveInsight: {
      zh: "你在爱情中同样追求掌控感，但真正的亲密需要脆弱和平等。找一个能让你放下铠甲的人，才是真正的缘分。",
      en: "In love you also seek a sense of control, but true intimacy requires vulnerability and equality. Real destiny is finding someone before whom you can lay down your armor.",
      tw: "你在愛情中同樣追求掌控感，但真正的親密需要脆弱和平等。找一個能讓你放下鎧甲的人，才是真正的緣分。",
    },
    yearAdvice: {
      zh: "你的努力即将带来丰厚的回报，继续保持专注。同时也要注意，不要让对成功的追求让你错过身边重要的人。",
      en: "Your efforts are about to bring rich rewards — stay focused. At the same time, be careful not to let the pursuit of success cost you the important people around you.",
      tw: "你的努力即將帶來豐厚的回報，繼續保持專注。同時也要注意，不要讓對成功的追求讓你錯過身邊重要的人。",
    },
    luckyNumber: [8, 17, 26],
    luckyColor: { zh: "金色、黑色", en: "Gold, Black", tw: "金色、黑色" },
    luckyDay: { zh: "周六", en: "Saturday", tw: "週六" },
    luckyGem: { zh: "黄金、钻石", en: "Gold, Diamond", tw: "黃金、鑽石" },
    spiritualMessage: {
      zh: "财富是流动的能量，你的使命是让它在世界中创造更多美好。",
      en: "Wealth is flowing energy, and your mission is to let it create more good in the world.",
      tw: "財富是流動的能量，你的使命是讓它在世界中創造更多美好。",
    },
    celebrities: {
      zh: ["罗伯特·德尼罗", "马云", "卡迪·B"],
      en: ["Robert De Niro", "Jack Ma", "Cardi B"],
      tw: ["勞勃·狄尼洛", "馬雲", "卡迪·B"],
    },
  },

  9: {
    number: 9,
    name: { zh: "智慧者", en: "The Sage", tw: "智慧者" },
    title: { zh: "命运数字 · 九", en: "Destiny Number · Nine", tw: "命運數字 · 九" },
    element: { zh: "火", en: "Fire", tw: "火" },
    planet: { zh: "火星", en: "Mars", tw: "火星" },
    color: { zh: "深红紫", en: "Deep Crimson", tw: "深紅紫" },
    colorHex: "#BE123C",
    secondaryColorHex: "#FB7185",
    symbol: "☿",
    emoji: "🌌",
    isMaster: false,
    tagline: {
      zh: "你是古老灵魂的归处，用大爱与智慧完成生命的终极圆满",
      en: "You are the home of an ancient soul, fulfilling life's ultimate completion through great love and wisdom.",
      tw: "你是古老靈魂的歸處，用大愛與智慧完成生命的終極圓滿",
    },
    traits: {
      zh: ["博爱", "智慧", "慈悲", "艺术性", "理想主义", "宽容", "超越"],
      en: ["Universal Love", "Wisdom", "Compassion", "Artistic", "Idealistic", "Tolerant", "Transcendent"],
      tw: ["博愛", "智慧", "慈悲", "藝術性", "理想主義", "寬容", "超越"],
    },
    positiveTraits: [
      {
        title: { zh: "大爱之心", en: "A Heart of Universal Love", tw: "大愛之心" },
        description: {
          zh: "你的爱超越个人的边界，流向所有生命。你天生具有对人类处境的深切关怀，这是少数人才有的境界。",
          en: "Your love transcends personal boundaries and flows to all living beings. You carry a deep concern for the human condition — a rare state of being.",
          tw: "你的愛超越個人的邊界，流向所有生命。你天生具有對人類處境的深切關懷，這是少數人才有的境界。",
        },
      },
      {
        title: { zh: "古老智慧", en: "Ancient Wisdom", tw: "古老智慧" },
        description: {
          zh: "你的灵魂携带着许多世代积累的智慧，总能在关键时刻说出直击人心的话语，给予他人深刻的启示。",
          en: "Your soul carries wisdom gathered across many lifetimes, always speaking words that strike the heart at crucial moments and offering profound insight to others.",
          tw: "你的靈魂攜帶著許多世代積累的智慧，總能在關鍵時刻說出直擊人心的話語，給予他人深刻的啟示。",
        },
      },
      {
        title: { zh: "超强包容力", en: "Boundless Tolerance", tw: "超強包容力" },
        description: {
          zh: "你能理解不同的价值观和生活方式，很少评判他人。这种宽容让你成为所有人都愿意倾诉的对象。",
          en: "You understand differing values and ways of life and rarely judge others. This tolerance makes you the one everyone wants to confide in.",
          tw: "你能理解不同的價值觀和生活方式，很少評判他人。這種寬容讓你成為所有人都願意傾訴的對象。",
        },
      },
    ],
    challenges: [
      {
        title: { zh: "难以割舍", en: "Difficulty Letting Go", tw: "難以割捨" },
        description: {
          zh: "你的人生课题之一就是学会放下。无论是关系、物品还是过去的执念，放手才能迎来新生。",
          en: "One of your life lessons is learning to let go. Whether relationships, possessions, or old attachments, only by releasing them can you welcome renewal.",
          tw: "你的人生課題之一就是學會放下。無論是關係、物品還是過去的執念，放手才能迎來新生。",
        },
      },
      {
        title: { zh: "理想主义陷阱", en: "The Idealist's Trap", tw: "理想主義陷阱" },
        description: {
          zh: "你对世界的期待过于完美，现实的落差常让你失望。接纳不完美，也是一种深刻的智慧。",
          en: "Your expectations of the world are too perfect, and the gap with reality often disappoints you. Accepting imperfection is its own profound wisdom.",
          tw: "你對世界的期待過於完美，現實的落差常讓你失望。接納不完美，也是一種深刻的智慧。",
        },
      },
    ],
    gifts: [
      {
        title: { zh: "慈悲心", en: "Compassion", tw: "慈悲心" },
        description: {
          zh: "对一切生命都能感同身受，是天生的精神领袖",
          en: "Empathizing with all life — a natural spiritual leader",
          tw: "對一切生命都能感同身受，是天生的精神領袖",
        },
        icon: "☯️",
      },
      {
        title: { zh: "艺术天赋", en: "Artistic Gift", tw: "藝術天賦" },
        description: {
          zh: "深刻的灵魂创造深刻的艺术，你的作品能触动人心",
          en: "A deep soul creates deep art; your work moves the heart",
          tw: "深刻的靈魂創造深刻的藝術，你的作品能觸動人心",
        },
        icon: "🎭",
      },
      {
        title: { zh: "超越性思维", en: "Transcendent Thinking", tw: "超越性思維" },
        description: {
          zh: "能从更高的维度看问题，超越个人利益",
          en: "Seeing issues from a higher dimension, beyond personal interest",
          tw: "能從更高的維度看問題，超越個人利益",
        },
        icon: "🌟",
      },
    ],
    lifeLessons: [
      {
        title: { zh: "放下执着，迎接新生", en: "Let Go and Welcome Rebirth", tw: "放下執著，迎接新生" },
        description: {
          zh: "9 是数字循环的终点，也是新开始的前夕。学会完整地结束，才能完整地开始。",
          en: "Nine is the end of the numeric cycle and the eve of a new beginning. Only by ending fully can you begin fully.",
          tw: "9 是數字循環的終點，也是新開始的前夕。學會完整地結束，才能完整地開始。",
        },
      },
      {
        title: { zh: "在奉献中保护自己", en: "Protect Yourself While Giving", tw: "在奉獻中保護自己" },
        description: {
          zh: "你为这个世界给予太多，但要确保你的付出来自内心的充盈，而非空耗自我。",
          en: "You give so much to the world, but make sure your giving springs from inner fullness rather than depleting yourself.",
          tw: "你為這個世界給予太多，但要確保你的付出來自內心的充盈，而非空耗自我。",
        },
      },
    ],
    careerPaths: {
      zh: ["慈善家", "灵性导师", "艺术家", "哲学家", "医生", "教育家", "作家"],
      en: ["Philanthropist", "Spiritual Teacher", "Artist", "Philosopher", "Doctor", "Educator", "Writer"],
      tw: ["慈善家", "靈性導師", "藝術家", "哲學家", "醫師", "教育家", "作家"],
    },
    loveInsight: {
      zh: "你的爱广博而深沉，但你同样需要找到一个理解你宏大内心的人。不要把对世界的爱全部给出去，留一部分给自己和最亲近的人。",
      en: "Your love is broad and deep, but you also need someone who understands your vast inner world. Don't give all your love away to the world — keep some for yourself and those closest to you.",
      tw: "你的愛廣博而深沉，但你同樣需要找到一個理解你宏大內心的人。不要把對世界的愛全部給出去，留一部分給自己和最親近的人。",
    },
    yearAdvice: {
      zh: "这是一个清理与完结的时期，结束不再服务于你的关系、工作或习惯。每一次清空，都是为了迎接更美好的新循环。",
      en: "This is a time of clearing and completion — end the relationships, work, or habits that no longer serve you. Every emptying makes room for a better new cycle.",
      tw: "這是一個清理與完結的時期，結束不再服務於你的關係、工作或習慣。每一次清空，都是為了迎接更美好的新循環。",
    },
    luckyNumber: [9, 18, 27],
    luckyColor: { zh: "深红色、紫色", en: "Deep Red, Purple", tw: "深紅色、紫色" },
    luckyDay: { zh: "周二", en: "Tuesday", tw: "週二" },
    luckyGem: { zh: "石榴石", en: "Garnet", tw: "石榴石" },
    spiritualMessage: {
      zh: "你是9个数字中最接近宇宙本源的灵魂。放下，是你给自己最大的礼物。",
      en: "Among the nine numbers, you are the soul closest to the source of the universe. Letting go is the greatest gift you can give yourself.",
      tw: "你是9個數字中最接近宇宙本源的靈魂。放下，是你給自己最大的禮物。",
    },
    celebrities: {
      zh: ["甘地", "达·芬奇", "马丁·路德·金"],
      en: ["Mahatma Gandhi", "Leonardo da Vinci", "Martin Luther King Jr."],
      tw: ["甘地", "達文西", "馬丁·路德·金恩"],
    },
  },

  11: {
    number: 11,
    name: { zh: "启示者", en: "The Illuminator", tw: "啟示者" },
    title: { zh: "卓越数字 · 十一", en: "Master Number · Eleven", tw: "卓越數字 · 十一" },
    element: { zh: "风+火", en: "Air + Fire", tw: "風+火" },
    planet: { zh: "月亮+太阳", en: "Moon + Sun", tw: "月亮+太陽" },
    color: { zh: "银光", en: "Silver Light", tw: "銀光" },
    colorHex: "#818CF8",
    secondaryColorHex: "#C7D2FE",
    symbol: "∥",
    emoji: "⚡",
    isMaster: true,
    tagline: {
      zh: "你是光的使者，携带高频振动降生，以直觉与灵感照亮世界",
      en: "You are a messenger of light, born carrying a high-frequency vibration, illuminating the world with intuition and inspiration.",
      tw: "你是光的使者，攜帶高頻振動降生，以直覺與靈感照亮世界",
    },
    traits: {
      zh: ["直觉", "灵感", "灵性", "感知", "启示", "理想主义", "高敏感"],
      en: ["Intuitive", "Inspired", "Spiritual", "Perceptive", "Revelatory", "Idealistic", "Highly Sensitive"],
      tw: ["直覺", "靈感", "靈性", "感知", "啟示", "理想主義", "高敏感"],
    },
    positiveTraits: [
      {
        title: { zh: "超凡直觉", en: "Extraordinary Intuition", tw: "超凡直覺" },
        description: {
          zh: "11 被称为'直觉大师'，你的感知能力超越普通人的范畴，常能在事情发生前就感知到。你的直觉就是你最精准的罗盘。",
          en: "Eleven is called the 'master of intuition.' Your perception goes beyond the ordinary, often sensing things before they happen. Your intuition is your most precise compass.",
          tw: "11 被稱為「直覺大師」，你的感知能力超越普通人的範疇，常能在事情發生前就感知到。你的直覺就是你最精準的羅盤。",
        },
      },
      {
        title: { zh: "灵性导师", en: "Spiritual Guide", tw: "靈性導師" },
        description: {
          zh: "你来到这个世界是为了传递更高的智慧与灵感。你的话语、作品或仅仅是你的存在，都能深刻影响他人。",
          en: "You came into this world to transmit higher wisdom and inspiration. Your words, your work, or simply your presence can profoundly influence others.",
          tw: "你來到這個世界是為了傳遞更高的智慧與靈感。你的話語、作品或僅僅是你的存在，都能深刻影響他人。",
        },
      },
      {
        title: { zh: "梦想家", en: "Visionary Dreamer", tw: "夢想家" },
        description: {
          zh: "你能看见他人难以想象的未来愿景，并有能力将其传递给世界，点燃集体的梦想。",
          en: "You see visions of the future others can scarcely imagine, and you have the power to share them with the world, igniting a collective dream.",
          tw: "你能看見他人難以想像的未來願景，並有能力將其傳遞給世界，點燃集體的夢想。",
        },
      },
    ],
    challenges: [
      {
        title: { zh: "过度紧张与焦虑", en: "Tension and Anxiety", tw: "過度緊張與焦慮" },
        description: {
          zh: "11 的高频振动使你比常人更敏感，也更容易承受能量的冲击。学习接地气的方法，如冥想、自然接触，能帮助你稳定能量。",
          en: "Eleven's high-frequency vibration makes you more sensitive than most and more prone to energetic overload. Grounding practices like meditation and time in nature help you stabilize your energy.",
          tw: "11 的高頻振動使你比常人更敏感，也更容易承受能量的衝擊。學習接地氣的方法，如冥想、自然接觸，能幫助你穩定能量。",
        },
      },
      {
        title: { zh: "完美主义", en: "Perfectionism", tw: "完美主義" },
        description: {
          zh: "你对自己和使命有极高的期待，稍有偏差就会严苛自责。记住：不完美的行动胜于完美的停滞。",
          en: "You hold yourself and your mission to exacting standards, harshly blaming yourself for the slightest deviation. Remember: imperfect action beats perfect paralysis.",
          tw: "你對自己和使命有極高的期待，稍有偏差就會嚴苛自責。記住：不完美的行動勝於完美的停滯。",
        },
      },
    ],
    gifts: [
      {
        title: { zh: "直觉之光", en: "Light of Intuition", tw: "直覺之光" },
        description: {
          zh: "能接收到比理性更深层的宇宙信号",
          en: "Receiving cosmic signals deeper than reason can reach",
          tw: "能接收到比理性更深層的宇宙信號",
        },
        icon: "⚡",
      },
      {
        title: { zh: "灵感传递", en: "Inspiring Others", tw: "靈感傳遞" },
        description: {
          zh: "你的想法能点燃他人的激情，引发连锁的创造",
          en: "Your ideas ignite others' passion, sparking a chain of creation",
          tw: "你的想法能點燃他人的激情，引發連鎖的創造",
        },
        icon: "💫",
      },
      {
        title: { zh: "超感能力", en: "Heightened Sensing", tw: "超感能力" },
        description: {
          zh: "对能量、情绪和振动有极其细腻的感知",
          en: "An exquisitely fine perception of energy, emotion, and vibration",
          tw: "對能量、情緒和振動有極其細膩的感知",
        },
        icon: "🌟",
      },
    ],
    lifeLessons: [
      {
        title: { zh: "将灵感落地", en: "Ground Your Inspiration", tw: "將靈感落地" },
        description: {
          zh: "你的使命不只是感知，更是将高频的灵感转化为实际的贡献。找到你的表达方式，让光通过你照进世界。",
          en: "Your mission is not only to perceive but to turn high-frequency inspiration into tangible contribution. Find your means of expression and let the light shine into the world through you.",
          tw: "你的使命不只是感知，更是將高頻的靈感轉化為實際的貢獻。找到你的表達方式，讓光通過你照進世界。",
        },
      },
      {
        title: { zh: "接纳自己的特殊性", en: "Accept Your Uniqueness", tw: "接納自己的特殊性" },
        description: {
          zh: "你和大多数人不一样，这不是负担，是礼物。停止试图'正常化'自己。",
          en: "You are different from most people — that's not a burden but a gift. Stop trying to 'normalize' yourself.",
          tw: "你和大多數人不一樣，這不是負擔，是禮物。停止試圖「正常化」自己。",
        },
      },
    ],
    careerPaths: {
      zh: ["灵性导师", "心理治疗师", "艺术家", "作家", "激励演讲家", "占星师", "音乐家"],
      en: ["Spiritual Teacher", "Psychotherapist", "Artist", "Writer", "Motivational Speaker", "Astrologer", "Musician"],
      tw: ["靈性導師", "心理治療師", "藝術家", "作家", "激勵演講家", "占星師", "音樂家"],
    },
    loveInsight: {
      zh: "你在爱情中需要深度的灵魂共鸣，而非表面的吸引。找到一个能与你在精神层面对话的伴侣，你的爱情将无与伦比。",
      en: "In love you need deep soul resonance, not surface attraction. Find a partner who can converse with you on a spiritual level, and your love will be incomparable.",
      tw: "你在愛情中需要深度的靈魂共鳴，而非表面的吸引。找到一個能與你在精神層面對話的伴侶，你的愛情將無與倫比。",
    },
    yearAdvice: {
      zh: "你的灵感和直觉正处于历史高峰，相信它。开始那个你一直在等待'完美时机'的项目——完美时机就是现在。",
      en: "Your inspiration and intuition are at an all-time high — trust them. Start the project you've been waiting for the 'perfect moment' to begin — the perfect moment is now.",
      tw: "你的靈感和直覺正處於歷史高峰，相信它。開始那個你一直在等待「完美時機」的專案——完美時機就是現在。",
    },
    luckyNumber: [11, 2, 29],
    luckyColor: { zh: "银色、白色", en: "Silver, White", tw: "銀色、白色" },
    luckyDay: { zh: "周一", en: "Monday", tw: "週一" },
    luckyGem: { zh: "月光石", en: "Moonstone", tw: "月光石" },
    spiritualMessage: {
      zh: "你是两个世界之间的门户——物质与灵性在你身上相遇。这是最神圣的使命。",
      en: "You are a doorway between two worlds — matter and spirit meet within you. This is the most sacred of missions.",
      tw: "你是兩個世界之間的門戶——物質與靈性在你身上相遇。這是最神聖的使命。",
    },
    celebrities: {
      zh: ["莫扎特", "奥普拉·温弗瑞", "大卫·贝克汉姆"],
      en: ["Mozart", "Oprah Winfrey", "David Beckham"],
      tw: ["莫札特", "歐普拉·溫弗蕾", "大衛·貝克漢"],
    },
  },

  22: {
    number: 22,
    name: { zh: "建造大师", en: "The Master Builder", tw: "建造大師" },
    title: { zh: "卓越数字 · 二十二", en: "Master Number · Twenty-Two", tw: "卓越數字 · 二十二" },
    element: { zh: "土+风", en: "Earth + Air", tw: "土+風" },
    planet: { zh: "天王星", en: "Uranus", tw: "天王星" },
    color: { zh: "帝王蓝", en: "Royal Blue", tw: "帝王藍" },
    colorHex: "#1E40AF",
    secondaryColorHex: "#3B82F6",
    symbol: "⊞",
    emoji: "🏗️",
    isMaster: true,
    tagline: {
      zh: "你是宇宙最伟大的建造者，将梦想变为改变世界的现实",
      en: "You are the universe's greatest builder, turning dreams into world-changing reality.",
      tw: "你是宇宙最偉大的建造者，將夢想變為改變世界的現實",
    },
    traits: {
      zh: ["宏大愿景", "实践力", "领导力", "耐心", "使命感", "系统性", "影响力"],
      en: ["Grand Vision", "Practical Power", "Leadership", "Patience", "Sense of Mission", "Systematic", "Influence"],
      tw: ["宏大願景", "實踐力", "領導力", "耐心", "使命感", "系統性", "影響力"],
    },
    positiveTraits: [
      {
        title: { zh: "宏大愿景与实践力", en: "Grand Vision and Execution", tw: "宏大願景與實踐力" },
        description: {
          zh: "22 被称为'大师建造者'，你同时拥有11的高远愿景和4的务实执行力。你能将那些别人认为不可能的梦想付诸实现。",
          en: "Twenty-two is called the 'master builder.' You possess both the lofty vision of 11 and the practical execution of 4. You can realize dreams others deem impossible.",
          tw: "22 被稱為「大師建造者」，你同時擁有11的高遠願景和4的務實執行力。你能將那些別人認為不可能的夢想付諸實現。",
        },
      },
      {
        title: { zh: "传奇级领导力", en: "Legendary Leadership", tw: "傳奇級領導力" },
        description: {
          zh: "你的领导力超越常规，能整合大规模的资源和人才，朝向一个宏大的目标前进，留下历史性的影响。",
          en: "Your leadership transcends the ordinary, integrating large-scale resources and talent toward a grand goal and leaving a historic impact.",
          tw: "你的領導力超越常規，能整合大規模的資源和人才，朝向一個宏大的目標前進，留下歷史性的影響。",
        },
      },
      {
        title: { zh: "超越时代的贡献", en: "Contributions Beyond Your Time", tw: "超越時代的貢獻" },
        description: {
          zh: "你创造的东西不是为了一时，而是为了长久。你的作品、系统或影响，将在你离开后继续传承。",
          en: "What you create is not for a moment but for the long run. Your work, systems, or influence will carry on long after you are gone.",
          tw: "你創造的東西不是為了一時，而是為了長久。你的作品、系統或影響，將在你離開後繼續傳承。",
        },
      },
    ],
    challenges: [
      {
        title: { zh: "使命的重量", en: "The Weight of the Mission", tw: "使命的重量" },
        description: {
          zh: "22 的使命极为宏大，有时会感到压力窒息，甚至想逃回更'平凡'的22/4的轨道。记住，你有足够的能力承担这份使命。",
          en: "Twenty-two's mission is immense, and at times the pressure can feel suffocating, tempting you to retreat to a more 'ordinary' 22/4 path. Remember, you have the capacity to carry this calling.",
          tw: "22 的使命極為宏大，有時會感到壓力窒息，甚至想逃回更「平凡」的22/4的軌道。記住，你有足夠的能力承擔這份使命。",
        },
      },
      {
        title: { zh: "完美主义障碍", en: "The Perfectionism Block", tw: "完美主義障礙" },
        description: {
          zh: "对宏大目标的追求有时会让你陷入无休止的准备，而迟迟不开始。先做再完善，是22号的生存法则。",
          en: "Chasing grand goals can trap you in endless preparation that never begins. Act first, refine later — that is the survival rule for the 22.",
          tw: "對宏大目標的追求有時會讓你陷入無休止的準備，而遲遲不開始。先做再完善，是22號的生存法則。",
        },
      },
    ],
    gifts: [
      {
        title: { zh: "大师建造力", en: "Master Building", tw: "大師建造力" },
        description: {
          zh: "将高维愿景转化为具体、可传承的现实",
          en: "Turning higher-dimensional vision into concrete, enduring reality",
          tw: "將高維願景轉化為具體、可傳承的現實",
        },
        icon: "🏛️",
      },
      {
        title: { zh: "超级整合力", en: "Super Integration", tw: "超級整合力" },
        description: {
          zh: "能协调大量的人才、资源和系统朝向同一目标",
          en: "Coordinating vast talent, resources, and systems toward one goal",
          tw: "能協調大量的人才、資源和系統朝向同一目標",
        },
        icon: "🔧",
      },
      {
        title: { zh: "历史性影响力", en: "Historic Influence", tw: "歷史性影響力" },
        description: {
          zh: "你的贡献跨越个人，影响集体乃至文明",
          en: "Your contribution reaches beyond the individual to the collective and even civilization",
          tw: "你的貢獻跨越個人，影響集體乃至文明",
        },
        icon: "🌍",
      },
    ],
    lifeLessons: [
      {
        title: { zh: "接受并驾驭使命", en: "Accept and Command Your Mission", tw: "接受並駕馭使命" },
        description: {
          zh: "停止缩小自己以融入普通。你被选择来做一件大事，接受它，然后开始。",
          en: "Stop shrinking yourself to fit in with the ordinary. You were chosen to do something great — accept it, then begin.",
          tw: "停止縮小自己以融入普通。你被選擇來做一件大事，接受它，然後開始。",
        },
      },
      {
        title: { zh: "在宏大中不忘细小", en: "Don't Forget the Small Amid the Grand", tw: "在宏大中不忘細小" },
        description: {
          zh: "改变世界，从改变面前这一个人开始。不要因为追求宏大而忽视眼前的连接。",
          en: "Changing the world begins with changing the one person in front of you. Don't neglect the connection at hand in pursuit of the grand.",
          tw: "改變世界，從改變面前這一個人開始。不要因為追求宏大而忽視眼前的連接。",
        },
      },
    ],
    careerPaths: {
      zh: ["政治家", "建筑大师", "社会运动领袖", "企业帝国创始人", "国际机构领导者"],
      en: ["Statesman", "Master Architect", "Social Movement Leader", "Business Empire Founder", "International Institution Leader"],
      tw: ["政治家", "建築大師", "社會運動領袖", "企業帝國創始人", "國際機構領導者"],
    },
    loveInsight: {
      zh: "你的使命感有时让伴侣感到自己排在世界之后。在爱情中，提醒自己：亲密关系是你使命的一部分，而非障碍。",
      en: "Your sense of mission can make a partner feel they come after the world. In love, remind yourself: intimacy is part of your mission, not an obstacle to it.",
      tw: "你的使命感有時讓伴侶感到自己排在世界之後。在愛情中，提醒自己：親密關係是你使命的一部分，而非障礙。",
    },
    yearAdvice: {
      zh: "有一个大项目在等待你启动，不要继续推迟。你已经准备好了，宇宙也准备好了。行动起来，历史正在等待你书写。",
      en: "A big project awaits your launch — don't keep putting it off. You are ready, and so is the universe. Take action; history is waiting for you to write it.",
      tw: "有一個大專案在等待你啟動，不要繼續推遲。你已經準備好了，宇宙也準備好了。行動起來，歷史正在等待你書寫。",
    },
    luckyNumber: [22, 4, 13],
    luckyColor: { zh: "蓝色、金色", en: "Blue, Gold", tw: "藍色、金色" },
    luckyDay: { zh: "周六", en: "Saturday", tw: "週六" },
    luckyGem: { zh: "蓝宝石", en: "Sapphire", tw: "藍寶石" },
    spiritualMessage: {
      zh: "你拥有建造乌托邦的蓝图，现在是时候拿起工具，开始建造了。",
      en: "You hold the blueprint to build a utopia. Now is the time to pick up your tools and start building.",
      tw: "你擁有建造烏托邦的藍圖，現在是時候拿起工具，開始建造了。",
    },
    celebrities: {
      zh: ["达·芬奇", "比尔·盖茨", "圣雄甘地"],
      en: ["Leonardo da Vinci", "Bill Gates", "Mahatma Gandhi"],
      tw: ["達文西", "比爾·蓋茲", "聖雄甘地"],
    },
  },

  33: {
    number: 33,
    name: { zh: "导师大师", en: "The Master Teacher", tw: "導師大師" },
    title: { zh: "卓越数字 · 三十三", en: "Master Number · Thirty-Three", tw: "卓越數字 · 三十三" },
    element: { zh: "火+水", en: "Fire + Water", tw: "火+水" },
    planet: { zh: "金星+木星", en: "Venus + Jupiter", tw: "金星+木星" },
    color: { zh: "慈悲金", en: "Compassion Gold", tw: "慈悲金" },
    colorHex: "#D97706",
    secondaryColorHex: "#FCD34D",
    symbol: "✦",
    emoji: "🕊️",
    isMaster: true,
    tagline: {
      zh: "你是宇宙慈悲的化身，以无条件的爱治愈一切，照亮最深的黑暗",
      en: "You are the embodiment of cosmic compassion, healing all with unconditional love and lighting up the deepest darkness.",
      tw: "你是宇宙慈悲的化身，以無條件的愛治癒一切，照亮最深的黑暗",
    },
    traits: {
      zh: ["无条件的爱", "治愈", "慈悲", "教导", "奉献", "灵性", "光明"],
      en: ["Unconditional Love", "Healing", "Compassion", "Teaching", "Devotion", "Spirituality", "Radiance"],
      tw: ["無條件的愛", "療癒", "慈悲", "教導", "奉獻", "靈性", "光明"],
    },
    positiveTraits: [
      {
        title: { zh: "无条件的爱", en: "Unconditional Love", tw: "無條件的愛" },
        description: {
          zh: "33 被称为'导师大师'，你的爱超越了所有条件和期待，流向所有人，而不求回报。这种爱是世间最稀缺也最珍贵的力量。",
          en: "Thirty-three is called the 'master teacher.' Your love transcends all conditions and expectations, flowing to everyone without seeking return. Such love is the rarest and most precious force in the world.",
          tw: "33 被稱為「導師大師」，你的愛超越了所有條件和期待，流向所有人，而不求回報。這種愛是世間最稀缺也最珍貴的力量。",
        },
      },
      {
        title: { zh: "终极治愈者", en: "Ultimate Healer", tw: "終極療癒者" },
        description: {
          zh: "你的存在本身就有治愈的力量，在你身边，受伤的灵魂会感到被接纳和爱护。你是世界的圣殿。",
          en: "Your very presence holds the power to heal; beside you, wounded souls feel accepted and cared for. You are a sanctuary to the world.",
          tw: "你的存在本身就有療癒的力量，在你身邊，受傷的靈魂會感到被接納和愛護。你是世界的聖殿。",
        },
      },
      {
        title: { zh: "智慧传承者", en: "Keeper of Wisdom", tw: "智慧傳承者" },
        description: {
          zh: "你不仅有智慧，更有将智慧深入浅出地传递的天赋。你培育的人，会继续点燃更多的光。",
          en: "You not only have wisdom but the gift of conveying it simply and clearly. Those you nurture go on to kindle even more light.",
          tw: "你不僅有智慧，更有將智慧深入淺出地傳遞的天賦。你培育的人，會繼續點燃更多的光。",
        },
      },
    ],
    challenges: [
      {
        title: { zh: "背负超重使命", en: "Carrying an Overwhelming Mission", tw: "背負超重使命" },
        description: {
          zh: "33 的能量如此宏大，真正的33号灵魂在进化成熟之前，往往会经历巨大的痛苦与考验，那是灵魂的淬炼。",
          en: "Thirty-three's energy is so immense that a true 33 soul often endures great pain and trials before maturing — these are the soul's refining fires.",
          tw: "33 的能量如此宏大，真正的33號靈魂在進化成熟之前，往往會經歷巨大的痛苦與考驗，那是靈魂的淬煉。",
        },
      },
      {
        title: { zh: "被消耗殆尽", en: "Burning Yourself Out", tw: "被消耗殆盡" },
        description: {
          zh: "给予太多而不懂照顾自己，是33号的致命弱点。记住：空了的杯子无法为他人倒水。",
          en: "Giving too much without caring for yourself is the 33's fatal weakness. Remember: an empty cup cannot pour water for others.",
          tw: "給予太多而不懂照顧自己，是33號的致命弱點。記住：空了的杯子無法為他人倒水。",
        },
      },
    ],
    gifts: [
      {
        title: { zh: "慈悲大爱", en: "Great Compassion", tw: "慈悲大愛" },
        description: {
          zh: "无条件接纳所有生命，是地球上最接近神性之爱的存在",
          en: "Accepting all life unconditionally — the being on earth closest to divine love",
          tw: "無條件接納所有生命，是地球上最接近神性之愛的存在",
        },
        icon: "🕊️",
      },
      {
        title: { zh: "终极治愈力", en: "Ultimate Healing", tw: "終極療癒力" },
        description: {
          zh: "你的存在本身就是一种祝福，治愈者中的治愈者",
          en: "Your presence itself is a blessing — a healer among healers",
          tw: "你的存在本身就是一種祝福，療癒者中的療癒者",
        },
        icon: "💫",
      },
      {
        title: { zh: "智慧传灯", en: "Passing the Torch of Wisdom", tw: "智慧傳燈" },
        description: {
          zh: "将宇宙智慧以最温柔的方式传递给有缘之人",
          en: "Passing cosmic wisdom to kindred spirits in the gentlest way",
          tw: "將宇宙智慧以最溫柔的方式傳遞給有緣之人",
        },
        icon: "🕯️",
      },
    ],
    lifeLessons: [
      {
        title: { zh: "先爱自己", en: "Love Yourself First", tw: "先愛自己" },
        description: {
          zh: "你的使命是给予，但神性之爱来自内心的满盈。学会自我关爱，你才能成为真正取之不竭的光源。",
          en: "Your mission is to give, but divine love springs from inner fullness. Learn self-care, and only then can you become a truly inexhaustible source of light.",
          tw: "你的使命是給予，但神性之愛來自內心的滿盈。學會自我關愛，你才能成為真正取之不竭的光源。",
        },
      },
      {
        title: { zh: "不要拯救，而要启发", en: "Don't Rescue — Inspire", tw: "不要拯救，而要啟發" },
        description: {
          zh: "你强烈的治愈冲动有时会变成'救世主情结'。真正的帮助是激发他人自我治愈的力量，而非包办一切。",
          en: "Your strong healing impulse can sometimes become a 'savior complex.' True help awakens others' power to heal themselves rather than doing everything for them.",
          tw: "你強烈的療癒衝動有時會變成「救世主情結」。真正的幫助是激發他人自我療癒的力量，而非包辦一切。",
        },
      },
    ],
    careerPaths: {
      zh: ["灵性导师", "治疗师", "宗教领袖", "慈善家", "教育改革者", "社区建造者"],
      en: ["Spiritual Teacher", "Therapist", "Religious Leader", "Philanthropist", "Education Reformer", "Community Builder"],
      tw: ["靈性導師", "治療師", "宗教領袖", "慈善家", "教育改革者", "社區建造者"],
    },
    loveInsight: {
      zh: "你爱得太无私，以至于容易吸引需要被'拯救'的伴侣。真正配得上你的人，是那个能与你并肩前行、而非依赖你的灵魂。",
      en: "You love so selflessly that you easily attract partners who need 'rescuing.' The one truly worthy of you is a soul who walks beside you rather than depending on you.",
      tw: "你愛得太無私，以至於容易吸引需要被「拯救」的伴侶。真正配得上你的人，是那個能與你並肩前行、而非依賴你的靈魂。",
    },
    yearAdvice: {
      zh: "你所经历的一切都是在为更伟大的使命做准备。此刻，专注于自我疗愈——一个治好了自己的人，才能真正治愈他人。",
      en: "Everything you've been through is preparation for a greater mission. For now, focus on healing yourself — only one who has healed themselves can truly heal others.",
      tw: "你所經歷的一切都是在為更偉大的使命做準備。此刻，專注於自我療癒——一個治好了自己的人，才能真正治癒他人。",
    },
    luckyNumber: [33, 6, 15],
    luckyColor: { zh: "金色、白色", en: "Gold, White", tw: "金色、白色" },
    luckyDay: { zh: "周五", en: "Friday", tw: "週五" },
    luckyGem: { zh: "钻石", en: "Diamond", tw: "鑽石" },
    spiritualMessage: {
      zh: "地球等待你的慈悲已久。你不是来拯救世界的，你是来教世界如何爱的。",
      en: "The earth has long awaited your compassion. You did not come to save the world — you came to teach the world how to love.",
      tw: "地球等待你的慈悲已久。你不是來拯救世界的，你是來教世界如何愛的。",
    },
    celebrities: {
      zh: ["特蕾莎修女", "达赖喇嘛", "圣方济各"],
      en: ["Mother Teresa", "the Dalai Lama", "Saint Francis of Assisi"],
      tw: ["德蕾莎修女", "達賴喇嘛", "聖方濟各"],
    },
  },
};

// 数字对应的简短标签（用于海报）— 本地化
export const NUMBER_KEYWORDS: Record<LifeNumber, LArr> = {
  1: { zh: ["独立", "先驱", "领袖"], en: ["Independent", "Pioneer", "Leader"], tw: ["獨立", "先驅", "領袖"] },
  2: { zh: ["和谐", "直觉", "合作"], en: ["Harmony", "Intuition", "Cooperation"], tw: ["和諧", "直覺", "合作"] },
  3: { zh: ["创意", "表达", "喜悦"], en: ["Creativity", "Expression", "Joy"], tw: ["創意", "表達", "喜悅"] },
  4: { zh: ["踏实", "建造", "稳定"], en: ["Grounded", "Building", "Stability"], tw: ["踏實", "建造", "穩定"] },
  5: { zh: ["自由", "冒险", "变化"], en: ["Freedom", "Adventure", "Change"], tw: ["自由", "冒險", "變化"] },
  6: { zh: ["爱心", "责任", "治愈"], en: ["Love", "Responsibility", "Healing"], tw: ["愛心", "責任", "療癒"] },
  7: { zh: ["智慧", "神秘", "深度"], en: ["Wisdom", "Mystery", "Depth"], tw: ["智慧", "神祕", "深度"] },
  8: { zh: ["权力", "财富", "成就"], en: ["Power", "Wealth", "Achievement"], tw: ["權力", "財富", "成就"] },
  9: { zh: ["博爱", "圆满", "超越"], en: ["Universal Love", "Completion", "Transcendence"], tw: ["博愛", "圓滿", "超越"] },
  11: { zh: ["启示", "直觉", "灵性"], en: ["Revelation", "Intuition", "Spirituality"], tw: ["啟示", "直覺", "靈性"] },
  22: { zh: ["宏愿", "建造", "传奇"], en: ["Grand Vision", "Building", "Legacy"], tw: ["宏願", "建造", "傳奇"] },
  33: { zh: ["慈悲", "治愈", "光明"], en: ["Compassion", "Healing", "Radiance"], tw: ["慈悲", "療癒", "光明"] },
};
