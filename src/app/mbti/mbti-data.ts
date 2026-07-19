// ===== MBTI x 星座碰撞数据库 =====
//
// 多语言化：所有可翻译文案以本地化结构 L / LArr 存储（{ zh, en, tw }）。
// 档案在 buildProfile 内部按 lang 解析为纯 string / string[]，
// 因此对外的 MBTIZodiacProfile 字段类型保持 string / string[] 不变。
//
// 语言中立字段（MBTI 4 字母码、星座数据 KEY、颜色 hex、emoji）保持原样。

export const MBTI_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
] as const;

export type MBTIType = (typeof MBTI_TYPES)[number];

export const ZODIAC_SIGNS = [
  "白羊座", "金牛座", "双子座", "巨蟹座",
  "狮子座", "处女座", "天秤座", "天蝎座",
  "射手座", "摩羯座", "水瓶座", "双鱼座",
] as const;

export type ZodiacSign = (typeof ZODIAC_SIGNS)[number];

export type Lang = "zh" | "en" | "tw";

/** 单条本地化字符串 */
export type L = { zh: string; en: string; tw: string };
/** 本地化字符串数组 */
export type LArr = { zh: string[]; en: string[]; tw: string[] };

/** 解析单条本地化字符串 */
function rs(v: L, lang: Lang): string {
  return v[lang];
}

/** 解析后的、面向组件的档案类型（字段为纯 string / string[]，对外不变） */
export interface MBTIZodiacProfile {
  title: string;          // 3-5字组合名称
  tagline: string;        // 一句梗文案（最具传播力）
  summary: string;        // 2-3句性格总结
  superpower: string;     // 超能力（最大优势）
  weakness: string;       // 致命弱点
  career: string;         // 事业关键词
  love: string;           // 爱情模式
  friendStyle: string;    // 社交/朋友风格
  lifeVibe: string;       // 人生气场
  icon: string;           // 代表emoji组合
  color: string;          // 主色
  gradient: { from: string; to: string };
  compatibleWith: string; // 最配的MBTI
  celebs: string[];       // 代表人物（可以是虚构角色）
  dailyMood: string;      // 每日OS（内心独白）
  dangerMode: string;     // 触发危险模式的条件
}

// 星座本地化显示名（用于生成文案中的星座称呼；en 用英文星座名，zh 保留全称、tw 用台译）
const ZODIAC_NAME: Record<ZodiacSign, L> = {
  白羊座: { zh: "白羊座", en: "Aries", tw: "牡羊座" },
  金牛座: { zh: "金牛座", en: "Taurus", tw: "金牛座" },
  双子座: { zh: "双子座", en: "Gemini", tw: "雙子座" },
  巨蟹座: { zh: "巨蟹座", en: "Cancer", tw: "巨蟹座" },
  狮子座: { zh: "狮子座", en: "Leo", tw: "獅子座" },
  处女座: { zh: "处女座", en: "Virgo", tw: "處女座" },
  天秤座: { zh: "天秤座", en: "Libra", tw: "天秤座" },
  天蝎座: { zh: "天蝎座", en: "Scorpio", tw: "天蠍座" },
  射手座: { zh: "射手座", en: "Sagittarius", tw: "射手座" },
  摩羯座: { zh: "摩羯座", en: "Capricorn", tw: "摩羯座" },
  水瓶座: { zh: "水瓶座", en: "Aquarius", tw: "水瓶座" },
  双鱼座: { zh: "双鱼座", en: "Pisces", tw: "雙魚座" },
};

// MBTI 特征描述
const MBTI_TRAITS: Record<MBTIType, { core: L; shadow: L }> = {
  INTJ: {
    core: { zh: "战略大脑+孤狼执行者", en: "Strategic mastermind + lone-wolf executor", tw: "戰略大腦+孤狼執行者" },
    shadow: { zh: "高冷到让人误以为在生气", en: "So aloof people think you're angry", tw: "高冷到讓人誤以為在生氣" },
  },
  INTP: {
    core: { zh: "宇宙级思维系统+行动力断档", en: "Cosmic-grade mind + zero follow-through", tw: "宇宙級思維系統+行動力斷檔" },
    shadow: { zh: "想了100步，动了0步", en: "Planned 100 steps, took 0", tw: "想了100步，動了0步" },
  },
  ENTJ: {
    core: { zh: "天生CEO+霸道总裁本总", en: "Born CEO + take-charge boss energy", tw: "天生CEO+霸道總裁本人" },
    shadow: { zh: "忘了问别人愿不愿意", en: "Forgets to ask if anyone else agrees", tw: "忘了問別人願不願意" },
  },
  ENTP: {
    core: { zh: "辩论机器+搅局专家", en: "Debate machine + chaos instigator", tw: "辯論機器+攪局專家" },
    shadow: { zh: "把辩赢当成人生目标", en: "Treats winning arguments as a life goal", tw: "把辯贏當成人生目標" },
  },
  INFJ: {
    core: { zh: "预言家+人间清醒", en: "Oracle + the one who sees it all clearly", tw: "預言家+人間清醒" },
    shadow: { zh: "把自己的标准当成宇宙定律", en: "Treats personal standards as cosmic law", tw: "把自己的標準當成宇宙定律" },
  },
  INFP: {
    core: { zh: "内心戏宇宙+理想主义卫士", en: "Inner-world universe + idealist guardian", tw: "內心戲宇宙+理想主義衛士" },
    shadow: { zh: "活在自己的平行宇宙里", en: "Lives in a private parallel universe", tw: "活在自己的平行宇宙裡" },
  },
  ENFJ: {
    core: { zh: "精神领袖+道德护法", en: "Spiritual leader + moral guardian", tw: "精神領袖+道德護法" },
    shadow: { zh: "感动自己感动得停不下来", en: "Can't stop being moved by their own kindness", tw: "感動自己感動得停不下來" },
  },
  ENFP: {
    core: { zh: "热情炸弹+创意喷泉", en: "Enthusiasm bomb + idea fountain", tw: "熱情炸彈+創意噴泉" },
    shadow: { zh: "从点子到实现需要一个世纪", en: "Idea to execution takes a century", tw: "從點子到實現需要一個世紀" },
  },
  ISTJ: {
    core: { zh: "可靠磐石+规则守护者", en: "Reliable rock + rule keeper", tw: "可靠磐石+規則守護者" },
    shadow: { zh: "对'变化'过敏", en: "Allergic to 'change'", tw: "對『變化』過敏" },
  },
  ISFJ: {
    core: { zh: "温暖后盾+默默付出机器", en: "Warm backbone + silent giving machine", tw: "溫暖後盾+默默付出機器" },
    shadow: { zh: "擅长把委屈咽回去", en: "Expert at swallowing their own hurt", tw: "擅長把委屈嚥回去" },
  },
  ESTJ: {
    core: { zh: "效率机器+秩序建筑师", en: "Efficiency machine + order architect", tw: "效率機器+秩序建築師" },
    shadow: { zh: "认为自己的方法是唯一正解", en: "Believes their way is the only right answer", tw: "認為自己的方法是唯一正解" },
  },
  ESFJ: {
    core: { zh: "人际润滑剂+群体凝聚核", en: "Social lubricant + group glue", tw: "人際潤滑劑+群體凝聚核" },
    shadow: { zh: "他人评价是命门", en: "Other people's opinions are the kill switch", tw: "他人評價是命門" },
  },
  ISTP: {
    core: { zh: "冷静拆解大师+危机处理专家", en: "Cool-headed problem-dismantler + crisis handler", tw: "冷靜拆解大師+危機處理專家" },
    shadow: { zh: "情感表达=无响应", en: "Emotional expression = no response", tw: "情感表達=無響應" },
  },
  ISFP: {
    core: { zh: "艺术灵魂+当下主义者", en: "Artist soul + live-in-the-moment type", tw: "藝術靈魂+當下主義者" },
    shadow: { zh: "长期规划是什么？能吃吗？", en: "Long-term planning? Is that edible?", tw: "長期規劃是什麼？能吃嗎？" },
  },
  ESTP: {
    core: { zh: "行动优先+刺激猎人", en: "Action-first + thrill hunter", tw: "行動優先+刺激獵人" },
    shadow: { zh: "后果是留给明天的烦恼", en: "Consequences are tomorrow's problem", tw: "後果是留給明天的煩惱" },
  },
  ESFP: {
    core: { zh: "派对灵魂+快乐制造机", en: "Party soul + joy generator", tw: "派對靈魂+快樂製造機" },
    shadow: { zh: "严肃话题是派对杀手", en: "Serious topics are party killers", tw: "嚴肅話題是派對殺手" },
  },
};

// 星座特征
const ZODIAC_TRAITS: Record<ZodiacSign, { core: L; drama: L; vibe: L }> = {
  白羊座: {
    core: { zh: "冲就完了", en: "Just charge ahead", tw: "衝就對了" },
    drama: { zh: "0.5秒失去耐心", en: "Loses patience in 0.5 seconds", tw: "0.5秒失去耐心" },
    vibe: { zh: "着火的能量球", en: "A ball of energy on fire", tw: "著火的能量球" },
  },
  金牛座: {
    core: { zh: "稳如老狗直到逼急了", en: "Rock-steady until pushed too far", tw: "穩如老狗直到逼急了" },
    drama: { zh: "拖延到最后一秒爆发", en: "Stalls until the last second, then erupts", tw: "拖延到最後一秒爆發" },
    vibe: { zh: "人间烟火守护者", en: "Guardian of life's simple comforts", tw: "人間煙火守護者" },
  },
  双子座: {
    core: { zh: "两个灵魂住一个身体", en: "Two souls in one body", tw: "兩個靈魂住一個身體" },
    drama: { zh: "刚夸完你就说你坏话", en: "Praises you, then trash-talks you a minute later", tw: "剛誇完你就說你壞話" },
    vibe: { zh: "永动的话痨精灵", en: "A perpetual-motion chatterbox sprite", tw: "永動的話癆精靈" },
  },
  巨蟹座: {
    core: { zh: "表面坚硬内心蟹蟹", en: "Hard shell, soft gooey center", tw: "表面堅硬內心蟹蟹" },
    drama: { zh: "把往事记得比本人还清楚", en: "Remembers the past better than you do", tw: "把往事記得比本人還清楚" },
    vibe: { zh: "移动的情感安全屋", en: "A walking emotional safe house", tw: "移動的情感安全屋" },
  },
  狮子座: {
    core: { zh: "天生自带舞台灯", en: "Born with a built-in spotlight", tw: "天生自帶舞台燈" },
    drama: { zh: "没人关注就自己给自己鼓掌", en: "Applauds themselves when no one else does", tw: "沒人關注就自己給自己鼓掌" },
    vibe: { zh: "永远的主角光环", en: "Eternal main-character energy", tw: "永遠的主角光環" },
  },
  处女座: {
    core: { zh: "细节狂魔+完美主义受害者", en: "Detail fiend + perfectionism's own victim", tw: "細節狂魔+完美主義受害者" },
    drama: { zh: "把别人的问题分析到量子层面", en: "Analyzes your problems down to the quantum level", tw: "把別人的問題分析到量子層面" },
    vibe: { zh: "高精密度的焦虑", en: "High-precision anxiety", tw: "高精密度的焦慮" },
  },
  天秤座: {
    core: { zh: "选择困难星际冠军", en: "Intergalactic champion of indecision", tw: "選擇困難星際冠軍" },
    drama: { zh: "用1小时决定吃什么", en: "Takes an hour to decide what to eat", tw: "用1小時決定吃什麼" },
    vibe: { zh: "优雅的纠结艺术", en: "The elegant art of dithering", tw: "優雅的糾結藝術" },
  },
  天蝎座: {
    core: { zh: "冷静外表下藏着海底火山", en: "An undersea volcano beneath a calm surface", tw: "冷靜外表下藏著海底火山" },
    drama: { zh: "表面无所谓，心里记小本本", en: "Acts unbothered, keeps a secret little ledger", tw: "表面無所謂，心裡記小本本" },
    vibe: { zh: "暗夜中的权力游戏", en: "A game of thrones in the dark", tw: "暗夜中的權力遊戲" },
  },
  射手座: {
    core: { zh: "自由是最高信仰", en: "Freedom is the highest faith", tw: "自由是最高信仰" },
    drama: { zh: "说走就走，回来也不解释", en: "Leaves on a whim, returns without explanation", tw: "說走就走，回來也不解釋" },
    vibe: { zh: "宇宙级乐天派", en: "A cosmic-level optimist", tw: "宇宙級樂天派" },
  },
  摩羯座: {
    core: { zh: "上班是最好的精神稳定剂", en: "Work is the best mood stabilizer", tw: "上班是最好的精神穩定劑" },
    drama: { zh: "凌晨三点还在担心五年后的规划", en: "Awake at 3am worrying about the five-year plan", tw: "凌晨三點還在擔心五年後的規劃" },
    vibe: { zh: "穿西装的山羊攀登者", en: "A mountain-climbing goat in a suit", tw: "穿西裝的山羊攀登者" },
  },
  水瓶座: {
    core: { zh: "人类观察者+独立思想钉子户", en: "Human observer + holdout free-thinker", tw: "人類觀察者+獨立思想釘子戶" },
    drama: { zh: "觉得自己跟大家不一样，然后确实不一样", en: "Thinks they're different from everyone — and they are", tw: "覺得自己跟大家不一樣，然後確實不一樣" },
    vibe: { zh: "来自未来的信号接收者", en: "A signal receiver from the future", tw: "來自未來的信號接收者" },
  },
  双鱼座: {
    core: { zh: "共情宇宙+梦境居民", en: "Empathy universe + dream-realm resident", tw: "共情宇宙+夢境居民" },
    drama: { zh: "把别人随口一说记成深情告白", en: "Takes a passing comment as a heartfelt confession", tw: "把別人隨口一說記成深情告白" },
    vibe: { zh: "漂浮在现实边缘的诗", en: "A poem floating at the edge of reality", tw: "漂浮在現實邊緣的詩" },
  },
};

// 生成组合档案
function buildProfile(mbti: MBTIType, zodiac: ZodiacSign, lang: Lang): MBTIZodiacProfile {
  const m = MBTI_TRAITS[mbti];
  const z = ZODIAC_TRAITS[zodiac];
  const mCore = rs(m.core, lang);
  const mShadow = rs(m.shadow, lang);
  const zCore = rs(z.core, lang);
  const zDrama = rs(z.drama, lang);
  const zVibe = rs(z.vibe, lang);
  const zName = rs(ZODIAC_NAME[zodiac], lang);

  // 颜色映射
  const colorMap: Record<MBTIType, { from: string; to: string; main: string }> = {
    INTJ: { from: "#1a1a2e", to: "#4a4e8c", main: "#6C7BFF" },
    INTP: { from: "#0d2137", to: "#1a6a8c", main: "#4A9ECA" },
    ENTJ: { from: "#2d0a00", to: "#8B2500", main: "#FF6B35" },
    ENTP: { from: "#1a0d00", to: "#8B5E00", main: "#FFA500" },
    INFJ: { from: "#1a0a2e", to: "#6B2D8B", main: "#9B59B6" },
    INFP: { from: "#0a1a2e", to: "#1a5a8c", main: "#5B8DD9" },
    ENFJ: { from: "#2e0a0a", to: "#8B2020", main: "#E74C3C" },
    ENFP: { from: "#2e1a00", to: "#8B5A00", main: "#E67E22" },
    ISTJ: { from: "#0a0a1a", to: "#2a2a4a", main: "#7F8C8D" },
    ISFJ: { from: "#0a1a0a", to: "#2a5a2a", main: "#27AE60" },
    ESTJ: { from: "#1a0a00", to: "#5a3000", main: "#C9A84C" },
    ESFJ: { from: "#2e0a18", to: "#8B1a4a", main: "#E91E8C" },
    ISTP: { from: "#0a0d0a", to: "#2a4a2a", main: "#58D68D" },
    ISFP: { from: "#1a0a18", to: "#5a2a5a", main: "#AF7AC5" },
    ESTP: { from: "#1a0800", to: "#6a2a00", main: "#E74C3C" },
    ESFP: { from: "#2a0a10", to: "#8a0a3a", main: "#FF69B4" },
  };

  const colors = colorMap[mbti];
  const zodiacEmojis: Record<ZodiacSign, string> = {
    白羊座: "♈", 金牛座: "♉", 双子座: "♊", 巨蟹座: "♋",
    狮子座: "♌", 处女座: "♍", 天秤座: "♎", 天蝎座: "♏",
    射手座: "♐", 摩羯座: "♑", 水瓶座: "♒", 双鱼座: "♓",
  };

  // 预设精选组合文案（特别有趣的组合有专属文案）
  const SPECIAL_COMBOS: Partial<Record<string, Partial<Record<"tagline" | "title" | "dailyMood" | "dangerMode", L>>>> = {
    "INFP+天蝎座": {
      tagline: {
        zh: "表面冷酷杀手，内心戏多到能演甄嬛传的内耗王者",
        en: "Cold-blooded killer on the outside, an inner drama so rich it could fill a whole soap opera — king of self-torment",
        tw: "表面冷酷殺手，內心戲多到能演甄嬛傳的內耗王者",
      },
      title: { zh: "宇宙内耗王", en: "Cosmic Overthinker", tw: "宇宙內耗王" },
      dailyMood: {
        zh: "没人理解我，但是我自己也不太理解我自己",
        en: "Nobody understands me — and honestly, I don't quite understand myself either",
        tw: "沒人理解我，但是我自己也不太理解我自己",
      },
      dangerMode: {
        zh: "被人误解的那一秒，内心已经排演了三集复仇剧",
        en: "The instant they're misunderstood, three episodes of a revenge drama are already staged in their head",
        tw: "被人誤解的那一秒，內心已經排演了三集復仇劇",
      },
    },
    "ENFP+双子座": {
      tagline: {
        zh: "人间永动机，灵感多到充不完电但计划完成度感人",
        en: "A human perpetual-motion machine — endless inspiration, but a heartbreakingly low completion rate",
        tw: "人間永動機，靈感多到充不完電但計畫完成度感人",
      },
      title: { zh: "混乱中二神", en: "Chaos Goblin Deity", tw: "混亂中二神" },
      dailyMood: {
        zh: "我今天又有了一个绝世好想法！（上个绝世好想法在哪儿？不知道）",
        en: "I had another genius idea today! (Where's the last genius idea? No clue.)",
        tw: "我今天又有了一個絕世好想法！（上個絕世好想法在哪兒？不知道）",
      },
    },
    "INTJ+摩羯座": {
      tagline: {
        zh: "人间冷面机器，但内心深处有一个精密的世界征服计划",
        en: "A stone-faced machine on the surface, with a meticulous plan for world domination deep inside",
        tw: "人間冷面機器，但內心深處有一個精密的世界征服計畫",
      },
      title: { zh: "冷峻征服者", en: "Cold Conqueror", tw: "冷峻征服者" },
      dailyMood: {
        zh: "效率就是一切，情绪是奢侈品",
        en: "Efficiency is everything; emotions are a luxury",
        tw: "效率就是一切，情緒是奢侈品",
      },
    },
    "INFJ+双鱼座": {
      tagline: {
        zh: "你以为他在发呆，其实他已经看穿了你的三代命运",
        en: "You think they're zoning out — actually they've already read three generations of your fate",
        tw: "你以為他在發呆，其實他已經看穿了你的三代命運",
      },
      title: { zh: "神秘预言家", en: "Mystic Oracle", tw: "神秘預言家" },
      dailyMood: {
        zh: "感觉一切都有联系，但我说不清楚",
        en: "I feel like everything is connected, but I can't quite put it into words",
        tw: "感覺一切都有聯繫，但我說不清楚",
      },
    },
    "ESTP+白羊座": {
      tagline: {
        zh: "活在0.1秒决策里，后果是什么留给明天的你处理",
        en: "Lives in 0.1-second decisions — consequences are tomorrow-you's problem",
        tw: "活在0.1秒決策裡，後果是什麼留給明天的你處理",
      },
      title: { zh: "肾上腺素狂人", en: "Adrenaline Junkie", tw: "腎上腺素狂人" },
      dailyMood: {
        zh: "想做就做，想完再说！",
        en: "Do it now, think about it later!",
        tw: "想做就做，想完再說！",
      },
    },
    "ISFJ+巨蟹座": {
      tagline: {
        zh: "全人类的情感支柱，唯独忘了给自己充电",
        en: "The emotional pillar for all of humanity — who forgets to recharge themselves",
        tw: "全人類的情感支柱，唯獨忘了給自己充電",
      },
      title: { zh: "温柔的情绪海", en: "Gentle Sea of Feelings", tw: "溫柔的情緒海" },
      dailyMood: {
        zh: "我没事，你呢？你还好吗？",
        en: "I'm fine — what about you? Are you okay?",
        tw: "我沒事，你呢？你還好嗎？",
      },
    },
    "ENTP+水瓶座": {
      tagline: {
        zh: "在大家还没看懂规则时他已经开始改写规则了",
        en: "Already rewriting the rules before everyone else has finished reading them",
        tw: "在大家還沒看懂規則時他已經開始改寫規則了",
      },
      title: { zh: "规则颠覆者", en: "Rule Disruptor", tw: "規則顛覆者" },
      dailyMood: {
        zh: "这个世界运行逻辑不对，让我来修一修",
        en: "The world's operating logic is wrong — let me go fix it",
        tw: "這個世界運行邏輯不對，讓我來修一修",
      },
    },
    "ESFP+狮子座": {
      tagline: {
        zh: "全场焦点，永远发光，如果没人看着就自己找个舞台",
        en: "Center of attention, always glowing — and if no one's watching, they'll find their own stage",
        tw: "全場焦點，永遠發光，如果沒人看著就自己找個舞台",
      },
      title: { zh: "宇宙发光体", en: "Cosmic Glow-Getter", tw: "宇宙發光體" },
      dailyMood: {
        zh: "哇今天的我也太好看了吧！！",
        en: "Wow, I look way too good today!!",
        tw: "哇今天的我也太好看了吧！！",
      },
    },
  };

  const comboKey = `${mbti}+${zodiac}`;
  const special = SPECIAL_COMBOS[comboKey] ?? {};

  // 动态生成文案（按语言组装）
  const mbtiPrefix = mbti.slice(0, 2);
  const defaultTitle =
    lang === "en"
      ? `${zName} ${mbtiPrefix}`
      : lang === "tw"
        ? `${zName.replace("座", "")}${mbtiPrefix}人`
        : `${zName.replace("座", "")}${mbtiPrefix}人`;
  const title = special.title ? rs(special.title, lang) : defaultTitle;

  const defaultTagline =
    lang === "en"
      ? `When ${zCore} meets ${mCore}, the result is ${zVibe} teleported into ${mShadow}`
      : lang === "tw"
        ? `${zCore}遇上${mCore}，結果是${zVibe}穿越進了${mShadow}`
        : `${zCore}遇上${mCore}，结果是${zVibe}穿越进了${mShadow}`;
  const tagline = special.tagline ? rs(special.tagline, lang) : defaultTagline;

  const summary =
    lang === "en"
      ? `An ${mbti}'s ${mCore}, plus ${zName}'s ${zCore}, creates a one-of-a-kind aura: ${zVibe} on the surface, ${mCore} underneath.`
      : lang === "tw"
        ? `${mbti}的${mCore}，加上${zName}的${zCore}，形成了一種獨特的氣質：表面${zVibe}，內裡${mCore}。`
        : `${mbti}的${mCore}，加上${zName}的${zCore}，形成了一种独特的气质：表面${zVibe}，内里${mCore}。`;

  const mCoreFirst = mCore.split("+")[0] ?? mCore;
  const mCoreSecond = mCore.split("+")[1] ?? mCore;
  const zCoreFirst = lang === "en" ? zCore : (zCore.split("，")[0] ?? zCore);

  const superpower = `${mCoreFirst} × ${zCoreFirst}`;
  const weakness =
    lang === "en"
      ? `${mShadow}, while also ${zDrama}`
      : lang === "tw"
        ? `${mShadow}，同時${zDrama}`
        : `${mShadow}，同时${zDrama}`;
  const lifeVibe = `${zVibe} × ${mCoreSecond}`;

  const dailyMood = special.dailyMood
    ? rs(special.dailyMood, lang)
    : lang === "en"
      ? `Today, once again, ${zCore} — while privately staging ${mShadow}`
      : lang === "tw"
        ? `今天也是${zCore}，同時在內心上演了${mShadow}`
        : `今天也是${zCore}，同时在内心上演了${mShadow}`;

  const dangerMode = special.dangerMode
    ? rs(special.dangerMode, lang)
    : lang === "en"
      ? `Trigger: ${zDrama} + ${mShadow} activate at the same time`
      : lang === "tw"
        ? `觸發條件：${zDrama}+${mShadow}同時激活`
        : `触发条件：${zDrama}+${mShadow}同时激活`;

  return {
    title,
    tagline,
    summary,
    superpower,
    weakness,
    career: buildCareer(mbti, zodiac, lang),
    love: buildLove(mbti, zodiac, lang),
    friendStyle: buildFriendStyle(mbti, lang),
    lifeVibe,
    icon: `${zodiacEmojis[zodiac]}✨`,
    color: colors.main,
    gradient: { from: colors.from, to: colors.to },
    compatibleWith: getCompatible(mbti),
    celebs: getCelebs(mbti, zodiac, lang),
    dailyMood,
    dangerMode,
  };
}

function buildCareer(mbti: MBTIType, zodiac: ZodiacSign, lang: Lang): string {
  const mbtiCareer: Record<MBTIType, L> = {
    INTJ: { zh: "战略规划·架构设计·研究", en: "Strategy · Systems Architecture · Research", tw: "戰略規劃·架構設計·研究" },
    INTP: { zh: "理论研究·技术突破·哲学", en: "Theoretical Research · Tech Breakthroughs · Philosophy", tw: "理論研究·技術突破·哲學" },
    ENTJ: { zh: "企业管理·创业·领导力", en: "Management · Entrepreneurship · Leadership", tw: "企業管理·創業·領導力" },
    ENTP: { zh: "创业·产品·咨询顾问", en: "Startups · Product · Consulting", tw: "創業·產品·顧問諮詢" },
    INFJ: { zh: "心理咨询·教育·创作", en: "Counseling · Education · Creative Writing", tw: "心理諮商·教育·創作" },
    INFP: { zh: "艺术创作·文学·公益", en: "Art · Literature · Nonprofit Work", tw: "藝術創作·文學·公益" },
    ENFJ: { zh: "教育·公关·NGO领导", en: "Education · PR · NGO Leadership", tw: "教育·公關·NGO領導" },
    ENFP: { zh: "创意营销·表演·公益创业", en: "Creative Marketing · Performance · Social Entrepreneurship", tw: "創意行銷·表演·公益創業" },
    ISTJ: { zh: "金融审计·法律·工程", en: "Finance & Audit · Law · Engineering", tw: "金融審計·法律·工程" },
    ISFJ: { zh: "医护·社工·行政支持", en: "Healthcare · Social Work · Administrative Support", tw: "醫護·社工·行政支援" },
    ESTJ: { zh: "项目管理·行政·军警", en: "Project Management · Administration · Military & Police", tw: "專案管理·行政·軍警" },
    ESFJ: { zh: "公关·人力资源·服务业", en: "PR · Human Resources · Service Industry", tw: "公關·人力資源·服務業" },
    ISTP: { zh: "工程技术·运动·侦查", en: "Engineering · Sports · Investigation", tw: "工程技術·運動·偵查" },
    ISFP: { zh: "设计·音乐·手工艺", en: "Design · Music · Craftsmanship", tw: "設計·音樂·手工藝" },
    ESTP: { zh: "销售·创业·运动竞技", en: "Sales · Entrepreneurship · Competitive Sports", tw: "銷售·創業·運動競技" },
    ESFP: { zh: "表演·活动策划·服务", en: "Performance · Event Planning · Service", tw: "表演·活動策劃·服務" },
  };
  const zodiacBonus: Record<ZodiacSign, L> = {
    白羊座: { zh: "创业·运动", en: "Entrepreneurship · Sports", tw: "創業·運動" },
    金牛座: { zh: "金融·美食", en: "Finance · Culinary", tw: "金融·美食" },
    双子座: { zh: "媒体·销售", en: "Media · Sales", tw: "媒體·銷售" },
    巨蟹座: { zh: "家居·餐饮", en: "Home · Food & Beverage", tw: "家居·餐飲" },
    狮子座: { zh: "娱乐·管理", en: "Entertainment · Management", tw: "娛樂·管理" },
    处女座: { zh: "分析·医疗", en: "Analytics · Healthcare", tw: "分析·醫療" },
    天秤座: { zh: "法律·设计", en: "Law · Design", tw: "法律·設計" },
    天蝎座: { zh: "侦查·心理", en: "Investigation · Psychology", tw: "偵查·心理" },
    射手座: { zh: "旅游·教育", en: "Travel · Education", tw: "旅遊·教育" },
    摩羯座: { zh: "金融·政务", en: "Finance · Public Affairs", tw: "金融·政務" },
    水瓶座: { zh: "科技·公益", en: "Technology · Nonprofit", tw: "科技·公益" },
    双鱼座: { zh: "艺术·医护", en: "Art · Healthcare", tw: "藝術·醫護" },
  };
  return `${rs(mbtiCareer[mbti], lang)} + ${rs(zodiacBonus[zodiac], lang)}`;
}

function buildLove(mbti: MBTIType, zodiac: ZodiacSign, lang: Lang): string {
  const loveMap: Record<MBTIType, L> = {
    INTJ: {
      zh: "需要大量独处时间充电，爱得深但表达方式像发邮件",
      en: "Needs lots of alone time to recharge; loves deeply but expresses it like sending an email",
      tw: "需要大量獨處時間充電，愛得深但表達方式像發郵件",
    },
    INTP: {
      zh: "陷入爱情但会分析爱情本身是不是合理的",
      en: "Falls in love, then analyzes whether love itself is even logical",
      tw: "陷入愛情但會分析愛情本身是不是合理的",
    },
    ENTJ: {
      zh: "主动追求但要对方配得上他的眼光",
      en: "Pursues actively, but the other person has to live up to their standards",
      tw: "主動追求但要對方配得上他的眼光",
    },
    ENTP: {
      zh: "用辩论调情，喜欢智识对等的伴侣",
      en: "Flirts through debate; wants an intellectually equal partner",
      tw: "用辯論調情，喜歡智識對等的伴侶",
    },
    INFJ: {
      zh: "慢热深情，一旦确认就是走一辈子那种",
      en: "Slow to warm but deeply devoted — once committed, it's for life",
      tw: "慢熱深情，一旦確認就是走一輩子那種",
    },
    INFP: {
      zh: "在脑内把对方构建成完美情人，现实容易让他们失望",
      en: "Builds an idealized lover in their head; reality often disappoints them",
      tw: "在腦內把對方建構成完美情人，現實容易讓他們失望",
    },
    ENFJ: {
      zh: "全力付出型，但偶尔忘了自己也需要被照顾",
      en: "Gives their all, but sometimes forgets they need care too",
      tw: "全力付出型，但偶爾忘了自己也需要被照顧",
    },
    ENFP: {
      zh: "热情地爱上一个人，然后热情地爱上下一种可能",
      en: "Falls passionately for one person, then passionately for the next possibility",
      tw: "熱情地愛上一個人，然後熱情地愛上下一種可能",
    },
    ISTJ: {
      zh: "忠诚稳定，但不擅长浪漫表达，爱你的方式是帮你报税",
      en: "Loyal and steady but not romantic — shows love by doing your taxes",
      tw: "忠誠穩定，但不擅長浪漫表達，愛你的方式是幫你報稅",
    },
    ISFJ: {
      zh: "照顾对方无微不至，委屈了才会默默哭",
      en: "Cares for you down to every detail, and only cries quietly when hurt",
      tw: "照顧對方無微不至，委屈了才會默默哭",
    },
    ESTJ: {
      zh: "用行动表爱，会给你计划好人生路线图",
      en: "Shows love through action — maps out a whole life plan for you",
      tw: "用行動表愛，會給你計畫好人生路線圖",
    },
    ESFJ: {
      zh: "为爱倾尽所有，但需要对方频繁确认爱你",
      en: "Pours everything into love, but needs frequent reassurance in return",
      tw: "為愛傾盡所有，但需要對方頻繁確認愛你",
    },
    ISTP: {
      zh: "爱你的时候会修好你家的门，但说不出我爱你",
      en: "Fixes your broken door when they love you, but can't say 'I love you'",
      tw: "愛你的時候會修好你家的門，但說不出我愛你",
    },
    ISFP: {
      zh: "感性而随性，爱你的方式像一首即兴诗",
      en: "Sensitive and spontaneous; loves you like an improvised poem",
      tw: "感性而隨性，愛你的方式像一首即興詩",
    },
    ESTP: {
      zh: "激情派，活在当下，不确定明天还会不会在",
      en: "Passionate and in-the-moment; not sure they'll still be here tomorrow",
      tw: "激情派，活在當下，不確定明天還會不會在",
    },
    ESFP: {
      zh: "把爱变成派对，每天都要庆祝一下两个人在一起",
      en: "Turns love into a party, celebrating being together every single day",
      tw: "把愛變成派對，每天都要慶祝一下兩個人在一起",
    },
  };
  const zodiacLove: Record<ZodiacSign, L> = {
    白羊座: {
      zh: "爱得直接，不爱也直接，速燃速灭",
      en: "Loves directly and falls out of love just as directly — fast to ignite, fast to fade",
      tw: "愛得直接，不愛也直接，速燃速滅",
    },
    金牛座: {
      zh: "慢热但一旦爱了就是你的小金库加安全感",
      en: "Slow to warm, but once in love they're your little vault of security",
      tw: "慢熱但一旦愛了就是你的小金庫加安全感",
    },
    双子座: {
      zh: "两种面目的爱，你爱的那个随时可能换频道",
      en: "A two-faced kind of love — the one you fell for might switch channels anytime",
      tw: "兩種面目的愛，你愛的那個隨時可能換頻道",
    },
    巨蟹座: {
      zh: "依赖到极致，记仇也到极致",
      en: "Clingy to the extreme, and holds grudges to the extreme too",
      tw: "依賴到極致，記仇也到極致",
    },
    狮子座: {
      zh: "需要被崇拜，给你全世界但你要给他舞台",
      en: "Needs to be adored — gives you the world, but you must give them the stage",
      tw: "需要被崇拜，給你全世界但你要給他舞台",
    },
    处女座: {
      zh: "把挑剔当做在乎，完美主义爱人",
      en: "Shows they care by nitpicking — a perfectionist lover",
      tw: "把挑剔當做在乎，完美主義愛人",
    },
    天秤座: {
      zh: "优雅地纠结，爱得像一场美学展览",
      en: "Dithers elegantly; loves like curating an aesthetic exhibition",
      tw: "優雅地糾結，愛得像一場美學展覽",
    },
    天蝎座: {
      zh: "爱得深不见底，嫉妒心是衡量爱的单位",
      en: "Loves bottomlessly; jealousy is their unit of measure for love",
      tw: "愛得深不見底，嫉妒心是衡量愛的單位",
    },
    射手座: {
      zh: "爱你但也爱自由，两者都不想放弃",
      en: "Loves you but also loves freedom, and won't give up either",
      tw: "愛你但也愛自由，兩者都不想放棄",
    },
    摩羯座: {
      zh: "用成就证明爱，带你走向更好生活",
      en: "Proves love through achievement, leading you toward a better life",
      tw: "用成就證明愛，帶你走向更好生活",
    },
    水瓶座: {
      zh: "爱你但拒绝被定义，最好的友人+伴侣",
      en: "Loves you but refuses to be defined — the best friend-and-partner combo",
      tw: "愛你但拒絕被定義，最好的友人+伴侶",
    },
    双鱼座: {
      zh: "活在情感的海洋里，把你当成世界中心",
      en: "Lives in an ocean of feeling, and makes you the center of their world",
      tw: "活在情感的海洋裡，把你當成世界中心",
    },
  };
  const sep = lang === "en" ? ". " : "。";
  return `${rs(loveMap[mbti], lang)}${sep}${rs(zodiacLove[zodiac], lang)}`;
}

function buildFriendStyle(mbti: MBTIType, lang: Lang): string {
  const friendMap: Record<MBTIType, L> = {
    INTJ: {
      zh: "深度玩家，朋友不多但个个是真朋友",
      en: "A deep-dive type — few friends, but every one of them is the real deal",
      tw: "深度玩家，朋友不多但個個是真朋友",
    },
    INTP: {
      zh: "跟你讨论宇宙本质，但忘了回你消息",
      en: "Debates the nature of the universe with you, but forgets to text back",
      tw: "跟你討論宇宙本質，但忘了回你訊息",
    },
    ENTJ: {
      zh: "你的人脉网络管理员+职业顾问",
      en: "Your personal network manager and career advisor",
      tw: "你的人脈網絡管理員+職業顧問",
    },
    ENTP: {
      zh: "把友情变成辩论俱乐部，让你的脑子永远在线",
      en: "Turns friendship into a debate club, keeping your brain permanently online",
      tw: "把友情變成辯論俱樂部，讓你的腦子永遠在線",
    },
    INFJ: {
      zh: "你的灵魂伴侣，能听见你没说出口的话",
      en: "Your soulmate friend who hears the words you never said out loud",
      tw: "你的靈魂伴侶，能聽見你沒說出口的話",
    },
    INFP: {
      zh: "在内心深处把你当成很重要的人，但说不出口",
      en: "Treasures you deeply inside, but can never quite say it",
      tw: "在內心深處把你當成很重要的人，但說不出口",
    },
    ENFJ: {
      zh: "朋友圈的精神领袖，随时准备开导你",
      en: "The spiritual leader of the friend group, always ready to counsel you",
      tw: "朋友圈的精神領袖，隨時準備開導你",
    },
    ENFP: {
      zh: "永远是派对里最亮的那个，带你去认识世界",
      en: "Always the brightest one at the party, dragging you out to meet the world",
      tw: "永遠是派對裡最亮的那個，帶你去認識世界",
    },
    ISTJ: {
      zh: "可靠到无聊，但关键时刻从不缺席",
      en: "Reliable to the point of boring, but never absent when it matters",
      tw: "可靠到無聊，但關鍵時刻從不缺席",
    },
    ISFJ: {
      zh: "默默记住你喜欢什么，在你需要时出现",
      en: "Quietly remembers what you like and shows up when you need them",
      tw: "默默記住你喜歡什麼，在你需要時出現",
    },
    ESTJ: {
      zh: "朋友圈的时间管理大师，帮你把生活变高效",
      en: "The friend group's time-management guru who makes your life efficient",
      tw: "朋友圈的時間管理大師，幫你把生活變高效",
    },
    ESFJ: {
      zh: "群聊的热心班长，每个人的生日都记得",
      en: "The warm-hearted class rep of the group chat who remembers everyone's birthday",
      tw: "群聊的熱心班長，每個人的生日都記得",
    },
    ISTP: {
      zh: "不废话，但遇到事他帮你搞定了再告诉你",
      en: "No small talk — but when trouble hits, they fix it first and tell you after",
      tw: "不廢話，但遇到事他幫你搞定了再告訴你",
    },
    ISFP: {
      zh: "温柔地在你身边，不评判，只陪伴",
      en: "Gently by your side — no judgment, just company",
      tw: "溫柔地在你身邊，不評判，只陪伴",
    },
    ESTP: {
      zh: "带你玩你没玩过的，让人生没有遗憾",
      en: "Takes you to try things you never have, so life has no regrets",
      tw: "帶你玩你沒玩過的，讓人生沒有遺憾",
    },
    ESFP: {
      zh: "快乐制造机，跟他在一起你没办法不开心",
      en: "A joy-making machine — it's impossible to be unhappy around them",
      tw: "快樂製造機，跟他在一起你沒辦法不開心",
    },
  };
  return rs(friendMap[mbti], lang);
}

function getCompatible(mbti: MBTIType): string {
  const compatMap: Record<MBTIType, string> = {
    INTJ: "ENFP / ENTP", INTP: "ENTJ / ENFJ",
    ENTJ: "INTP / INFP", ENTP: "INTJ / INFJ",
    INFJ: "ENTP / ENFP", INFP: "ENTJ / ENFJ",
    ENFJ: "INFP / ISFP", ENFP: "INTJ / INFJ",
    ISTJ: "ESFP / ESTP", ISFJ: "ESFP / ESTP",
    ESTJ: "ISFP / INFP", ESFJ: "ISFP / INFP",
    ISTP: "ESFJ / ESTJ", ISFP: "ENFJ / ESTJ",
    ESTP: "ISFJ / ISTJ", ESFP: "ISTJ / ISFJ",
  };
  return compatMap[mbti];
}

function getCelebs(mbti: MBTIType, zodiac: ZodiacSign, lang: Lang): string[] {
  const mbtiCelebs: Record<MBTIType, LArr> = {
    INTJ: {
      zh: ["蝙蝠侠", "赫敏·格兰杰", "马斯克"],
      en: ["Batman", "Hermione Granger", "Elon Musk"],
      tw: ["蝙蝠俠", "妙麗·格蘭傑", "馬斯克"],
    },
    INTP: {
      zh: ["爱因斯坦", "比尔·盖茨", "L（Death Note）"],
      en: ["Einstein", "Bill Gates", "L (Death Note)"],
      tw: ["愛因斯坦", "比爾·蓋茲", "L（死亡筆記本）"],
    },
    ENTJ: {
      zh: ["张无忌（反向）", "乔布斯", "纳粹（反向）"],
      en: ["Steve Jobs", "Miranda Priestly", "Margaret Thatcher"],
      tw: ["賈伯斯", "米蘭達（穿著Prada的惡魔）", "柴契爾夫人"],
    },
    ENTP: {
      zh: ["托尼·斯塔克", "小罗伯特·唐尼", "马克·吐温"],
      en: ["Tony Stark", "Robert Downey Jr.", "Mark Twain"],
      tw: ["東尼·史塔克", "小勞勃·道尼", "馬克·吐溫"],
    },
    INFJ: {
      zh: ["甘地", "阿尔弗雷德（蝙蝠侠）", "艾丽丝·门罗"],
      en: ["Gandhi", "Alfred (Batman)", "Alice Munro"],
      tw: ["甘地", "阿福（蝙蝠俠）", "艾莉絲·孟若"],
    },
    INFP: {
      zh: ["村上春树", "莎士比亚", "弗罗多·巴金斯"],
      en: ["Haruki Murakami", "Shakespeare", "Frodo Baggins"],
      tw: ["村上春樹", "莎士比亞", "佛羅多·巴金斯"],
    },
    ENFJ: {
      zh: ["奥巴马", "邓布利多", "弗兰克林·罗斯福"],
      en: ["Obama", "Dumbledore", "Franklin Roosevelt"],
      tw: ["歐巴馬", "鄧不利多", "富蘭克林·羅斯福"],
    },
    ENFP: {
      zh: ["宫崎骏", "安·弗兰克", "阿拉丁"],
      en: ["Hayao Miyazaki", "Anne Frank", "Aladdin"],
      tw: ["宮崎駿", "安妮·法蘭克", "阿拉丁"],
    },
    ISTJ: {
      zh: ["维多利亚女王", "赫敏的父母", "斯波克"],
      en: ["Queen Victoria", "George Washington", "Spock"],
      tw: ["維多利亞女王", "喬治·華盛頓", "史巴克"],
    },
    ISFJ: {
      zh: ["特蕾莎修女", "约翰·华生", "金帅"],
      en: ["Mother Teresa", "John Watson", "Captain America"],
      tw: ["德蕾莎修女", "約翰·華生", "美國隊長"],
    },
    ESTJ: {
      zh: ["普鲁士腓特烈大帝", "张朝阳", "山本五十六"],
      en: ["Frederick the Great", "Hermione's father figure", "Judge Judy"],
      tw: ["腓特烈大帝", "茱蒂法官", "山本五十六"],
    },
    ESFJ: {
      zh: ["泰勒·斯威夫特", "詹妮弗·洛佩兹"],
      en: ["Taylor Swift", "Jennifer Lopez"],
      tw: ["泰勒絲", "珍妮佛·洛佩茲"],
    },
    ISTP: {
      zh: ["克林特·伊斯特伍德", "克拉图斯", "布鲁斯·李"],
      en: ["Clint Eastwood", "Kratos", "Bruce Lee"],
      tw: ["克林·伊斯威特", "克雷多斯", "李小龍"],
    },
    ISFP: {
      zh: ["奥黛丽·赫本", "拉迪，法国浪漫主义"],
      en: ["Audrey Hepburn", "Frida Kahlo"],
      tw: ["奧黛麗·赫本", "芙烈達·卡蘿"],
    },
    ESTP: {
      zh: ["詹姆斯·邦德", "杰克·斯派罗船长"],
      en: ["James Bond", "Captain Jack Sparrow"],
      tw: ["詹姆士·龐德", "傑克·史派羅船長"],
    },
    ESFP: {
      zh: ["玛丽莲·梦露", "贾斯汀·汀布莱克"],
      en: ["Marilyn Monroe", "Justin Timberlake"],
      tw: ["瑪麗蓮·夢露", "賈斯汀·提姆布萊克"],
    },
  };
  const zodiacCelebs: Record<ZodiacSign, LArr> = {
    白羊座: { zh: ["成龙", "Lady Gaga"], en: ["Jackie Chan", "Lady Gaga"], tw: ["成龍", "女神卡卡"] },
    金牛座: { zh: ["吴亦凡（别学）", "释迦牟尼"], en: ["Adele", "The Buddha"], tw: ["愛黛兒", "釋迦牟尼"] },
    双子座: { zh: ["卡尼耶·韦斯特", "梦露"], en: ["Kanye West", "Marilyn Monroe"], tw: ["肯伊·威斯特", "夢露"] },
    巨蟹座: { zh: ["黛安娜王妃", "梅西"], en: ["Princess Diana", "Lionel Messi"], tw: ["黛安娜王妃", "梅西"] },
    狮子座: { zh: ["拿破仑", "奥巴马"], en: ["Napoleon", "Obama"], tw: ["拿破崙", "歐巴馬"] },
    处女座: { zh: ["迈克尔·杰克逊", "孔子"], en: ["Michael Jackson", "Confucius"], tw: ["麥可·傑克森", "孔子"] },
    天秤座: { zh: ["甘地", "基努·里维斯"], en: ["Gandhi", "Keanu Reeves"], tw: ["甘地", "基努·李維"] },
    天蝎座: { zh: ["比尔·盖茨", "希特勒（别学）"], en: ["Bill Gates", "Marie Curie"], tw: ["比爾·蓋茲", "瑪麗·居禮"] },
    射手座: { zh: ["布拉德·彼特", "斯威夫特"], en: ["Brad Pitt", "Taylor Swift"], tw: ["布萊德·彼特", "泰勒絲"] },
    摩羯座: { zh: ["毛泽东", "贝索斯"], en: ["Martin Luther King Jr.", "Jeff Bezos"], tw: ["馬丁·路德·金恩", "貝佐斯"] },
    水瓶座: { zh: ["爱迪生", "达尔文"], en: ["Edison", "Darwin"], tw: ["愛迪生", "達爾文"] },
    双鱼座: { zh: ["爱因斯坦", "乔布斯（本命）"], en: ["Einstein", "Steve Jobs"], tw: ["愛因斯坦", "賈伯斯"] },
  };
  const mList = mbtiCelebs[mbti][lang];
  const zList = zodiacCelebs[zodiac][lang];
  return [...mList.slice(0, 1), ...zList.slice(0, 1)];
}

export function getMBTIZodiacProfile(
  mbti: MBTIType,
  zodiac: ZodiacSign,
  lang: Lang = "zh",
): MBTIZodiacProfile {
  return buildProfile(mbti, zodiac, lang);
}

// ===== 新手步骤卡 / SEO 内容 / FAQ（三语，page 与 layout 的 FAQPage JSON-LD 共用） =====
export interface MbtiSeoContent {
  howToTitle: string;
  howToSteps: string[];
  seoSections: { heading: string; body: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
}

export const MBTI_SEO: Record<Lang, MbtiSeoContent> = {
  zh: {
    howToTitle: "怎么玩？",
    howToSteps: [
      "在第一栏点选你的 MBTI 人格类型（16 型之一）",
      "在第二栏点选你的星座",
      "点击「解锁我的宇宙档案」，查看人格特质、内心 OS 与危险模式",
      "生成专属宇宙海报，保存图片分享给朋友",
    ],
    seoSections: [
      {
        heading: "MBTI × 星座碰撞是什么？",
        body: "把 16 型 MBTI 人格与 12 星座两两组合，生成一份带梗的人格档案：超能力、致命弱点、事业方向、爱情模式、今日内心 OS 一应俱全。16 × 12 = 192 种组合，每一种都是「宇宙限定款」，都有专属的标题、标语与解读文案。",
      },
      {
        heading: "不知道自己的 MBTI 怎么办？",
        body: "可以凭直觉先选一个最像你的类型玩起来，也可以去做一份标准 MBTI 测试后再回来对号入座。星座则按公历生日确定，比如 3 月 21 日到 4 月 19 日出生是白羊座，换语言后星座名会自动切换为当地叫法。",
      },
      {
        heading: "这份档案能怎么用？",
        body: "它最适合当社交货币：生成海报发给朋友、配上「本人实测」发动态，或者看看你和 crush 的组合配不配。档案里还附了最配类型与同类代表人物，方便你顺手玩梗。",
      },
    ],
    faqTitle: "常见问题",
    faq: [
      { q: "这个测试是免费的吗？", a: "完全免费，无需注册。点选你的 MBTI 类型和星座，就能立刻生成完整人格档案。" },
      { q: "MBTI × 星座有科学依据吗？", a: "没有，这是娱乐向的人格玩梗工具，不是心理测评。看得开心、有共鸣，就是它全部的使命。" },
      { q: "一共有多少种组合？", a: "16 种 MBTI × 12 星座 = 192 种组合，每种组合都有专属的标题、标语和完整解读。" },
      { q: "可以换一个组合重新测吗？", a: "可以。点击结果页底部的「换一个组合」即可返回重新选择，不限次数。" },
    ],
  },
  tw: {
    howToTitle: "怎麼玩？",
    howToSteps: [
      "在第一欄點選你的 MBTI 人格類型（16 型之一）",
      "在第二欄點選你的星座",
      "點擊「解鎖我的宇宙檔案」，查看人格特質、內心 OS 與危險模式",
      "生成專屬宇宙海報，儲存圖片分享給朋友",
    ],
    seoSections: [
      {
        heading: "MBTI × 星座碰撞是什麼？",
        body: "把 16 型 MBTI 人格與 12 星座兩兩組合，生成一份帶梗的人格檔案：超能力、致命弱點、事業方向、愛情模式、今日內心 OS 一應俱全。16 × 12 = 192 種組合，每一種都是「宇宙限定款」，都有專屬的標題、標語與解讀文案。",
      },
      {
        heading: "不知道自己的 MBTI 怎麼辦？",
        body: "可以憑直覺先選一個最像你的類型玩起來，也可以去做一份標準 MBTI 測試後再回來對號入座。星座則按國曆生日確定，比如 3 月 21 日到 4 月 19 日出生是牡羊座，切換語言後星座名會自動切換為當地叫法。",
      },
      {
        heading: "這份檔案能怎麼用？",
        body: "它最適合當社交貨幣：生成海報發給朋友、配上「本人實測」發動態，或者看看你和 crush 的組合配不配。檔案裡還附了最配類型與同類代表人物，方便你順手玩梗。",
      },
    ],
    faqTitle: "常見問題",
    faq: [
      { q: "這個測試是免費的嗎？", a: "完全免費，無需註冊。點選你的 MBTI 類型和星座，就能立刻生成完整人格檔案。" },
      { q: "MBTI × 星座有科學依據嗎？", a: "沒有，這是娛樂向的人格玩梗工具，不是心理測評。看得開心、有共鳴，就是它全部的使命。" },
      { q: "一共有多少種組合？", a: "16 種 MBTI × 12 星座 = 192 種組合，每種組合都有專屬的標題、標語和完整解讀。" },
      { q: "可以換一個組合重新測嗎？", a: "可以。點擊結果頁底部的「換一個組合」即可返回重新選擇，不限次數。" },
    ],
  },
  en: {
    howToTitle: "How it works",
    howToSteps: [
      "Pick your MBTI personality type in the first grid (one of 16)",
      "Pick your zodiac sign in the second grid",
      "Tap \"Unlock my cosmic profile\" to see your traits, inner OS and danger mode",
      "Generate your cosmic poster and save the image to share",
    ],
    seoSections: [
      {
        heading: "What is MBTI × Zodiac Planet Collision?",
        body: "It pairs the 16 MBTI personality types with the 12 zodiac signs to generate a meme-flavored personality profile: superpower, fatal flaw, career path, love style and today's inner monologue. With 16 × 12 = 192 combos, every pairing is a cosmic limited edition with its own title, tagline and full reading.",
      },
      {
        heading: "Don't know your MBTI type?",
        body: "Go with your gut and pick the type that sounds most like you, or take a standard MBTI assessment first and come back. Your zodiac sign is set by your Gregorian birthday — for example, March 21 to April 19 is Aries — and sign names localize automatically when you switch languages.",
      },
      {
        heading: "What can you do with your profile?",
        body: "It's built as social currency: generate the poster and send it to friends, post it with a \"can confirm\" caption, or check the pairing between you and your crush. Each profile also lists your best match and famous people of the same combo — perfect meme material.",
      },
    ],
    faqTitle: "FAQ",
    faq: [
      { q: "Is this test free?", a: "Completely free, no sign-up needed. Pick your MBTI type and zodiac sign to instantly generate the full profile." },
      { q: "Is MBTI × Zodiac scientific?", a: "No — it's an entertainment tool for personality memes, not a psychological assessment. If it makes you laugh or feel seen, it has done its job." },
      { q: "How many combinations are there?", a: "16 MBTI types × 12 zodiac signs = 192 combos, each with its own title, tagline and complete reading." },
      { q: "Can I try another combination?", a: "Yes. Tap \"Try another combo\" at the bottom of the result page to go back and pick again — as many times as you like." },
    ],
  },
};
