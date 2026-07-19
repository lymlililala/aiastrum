// ===== 宠物灵语数据库 =====
//
// 数据多语言化：每个可翻译文本字段使用本地化结构 L。
// - L = { zh, en, tw } 单条字符串
// buildPetPsychicResult 在返回 PetPsychicResult 前，会按 lang 把这些结构解析成纯 string，
// 因此 PetPsychicResult 的字段类型保持不变（card 解析为 ResolvedPetCard，字段均为纯 string）。

export type Lang = "zh" | "en" | "tw";

/** 单条本地化字符串 */
export type L = { zh: string; en: string; tw: string };

/** 解析单条本地化字符串 */
function rs(v: L, lang: Lang): string {
  return v[lang];
}

/** 原始（未解析）塔罗牌：可翻译字段为 L，语言中立字段保持原样 */
interface RawPetCard {
  id: string;
  name: L;
  emoji: string;
  petVoice: L;
  petMood: L;
  petTip: L;
  moodColor: string;
}

/** 解析后的、面向组件的塔罗牌类型（文本字段为纯 string） */
export interface ResolvedPetCard {
  id: string;
  name: string;
  emoji: string;
  petVoice: string;
  petMood: string;
  petTip: string;
  moodColor: string;
}

const PET_TAROT_CARDS_RAW: RawPetCard[] = [
  {
    id: "星币侍从",
    name: { zh: "星币侍从", en: "Page of Pentacles", tw: "星幣侍從" },
    emoji: "🐾",
    petVoice: {
      zh: "今天的罐罐好像有点少哦！本猫/狗觉得需要补充一下能量～",
      en: "Today's treats seem a little short! I really think I need to top up my energy~",
      tw: "今天的罐罐好像有點少哦！本喵／汪覺得需要補充一下能量～",
    },
    petMood: {
      zh: "觅食模式已开启",
      en: "Foraging Mode: ON",
      tw: "覓食模式已開啟",
    },
    petTip: {
      zh: "今天多陪陪它，它在用行动告诉你它想要零食了！",
      en: "Spend more time with them today—their actions are telling you they want a snack!",
      tw: "今天多陪陪牠，牠正用行動告訴你牠想要零食了！",
    },
    moodColor: "#C9A84C",
  },
  {
    id: "圣杯侍从",
    name: { zh: "圣杯侍从", en: "Page of Cups", tw: "聖杯侍從" },
    emoji: "💕",
    petVoice: {
      zh: "我心里装满了对你的爱，但我不知道怎么说出来，所以我就…蹭你！",
      en: "My heart is full of love for you, but I don't know how to say it—so I'll just… rub up against you!",
      tw: "我心裡裝滿了對你的愛，但我不知道怎麼說出來，所以我就…蹭你！",
    },
    petMood: {
      zh: "爱的抱枕模式",
      en: "Cuddle Pillow Mode",
      tw: "愛的抱枕模式",
    },
    petTip: {
      zh: "它今天特别想撒娇，记得多摸摸它！",
      en: "They're feeling extra affectionate today—remember to give them lots of pets!",
      tw: "牠今天特別想撒嬌，記得多摸摸牠！",
    },
    moodColor: "#E91E8C",
  },
  {
    id: "权杖侍从",
    name: { zh: "权杖侍从", en: "Page of Wands", tw: "權杖侍從" },
    emoji: "🔥",
    petVoice: {
      zh: "本主子精力满满！今天要跑遍每个角落，探索未知领地！",
      en: "I'm bursting with energy! Today I'll race through every corner and explore uncharted territory!",
      tw: "本大爺精力滿滿！今天要跑遍每個角落，探索未知領地！",
    },
    petMood: {
      zh: "冒险家模式",
      en: "Adventurer Mode",
      tw: "冒險家模式",
    },
    petTip: {
      zh: "多带它出去运动，消耗一下旺盛的精力！",
      en: "Take them out for more exercise to burn off all that energy!",
      tw: "多帶牠出去運動，消耗一下旺盛的精力！",
    },
    moodColor: "#FF6B35",
  },
  {
    id: "宝剑侍从",
    name: { zh: "宝剑侍从", en: "Page of Swords", tw: "寶劍侍從" },
    emoji: "👀",
    petVoice: {
      zh: "我看穿了一切，但我选择沉默。（实际上在想：那只鸟怎么还没进来）",
      en: "I see through everything, but I choose to stay silent. (Actually thinking: why hasn't that bird come in yet?)",
      tw: "我看穿了一切，但我選擇沉默。（實際上在想：那隻鳥怎麼還沒進來）",
    },
    petMood: {
      zh: "侦探凝视模式",
      en: "Detective Stare Mode",
      tw: "偵探凝視模式",
    },
    petTip: {
      zh: "它今天格外敏感，请保持环境安静，避免吓到它。",
      en: "They're extra sensitive today—keep the environment quiet so you don't startle them.",
      tw: "牠今天格外敏感，請保持環境安靜，避免嚇到牠。",
    },
    moodColor: "#4A9ECA",
  },
  {
    id: "太阳",
    name: { zh: "太阳", en: "The Sun", tw: "太陽" },
    emoji: "☀️",
    petVoice: {
      zh: "今天心情超好！阳光真棒，主人真棒，一切都棒棒！快来陪我玩！",
      en: "I'm in such a great mood today! The sun is great, you're great, everything's great! Come play with me!",
      tw: "今天心情超好！陽光真棒，主人真棒，一切都棒棒！快來陪我玩！",
    },
    petMood: {
      zh: "开心炸弹模式",
      en: "Happy Bomb Mode",
      tw: "開心炸彈模式",
    },
    petTip: {
      zh: "它状态极佳，今天是带它拍照的最好时机！",
      en: "They're in top form—today is the perfect time for a photo session!",
      tw: "牠狀態極佳，今天是帶牠拍照的最好時機！",
    },
    moodColor: "#FFD700",
  },
  {
    id: "月亮",
    name: { zh: "月亮", en: "The Moon", tw: "月亮" },
    emoji: "🌙",
    petVoice: {
      zh: "夜里我做了一个梦，梦见了以前的记忆…也许那不只是梦。",
      en: "Last night I had a dream—I dreamed of old memories… maybe it was more than just a dream.",
      tw: "夜裡我做了一個夢，夢見了以前的記憶…也許那不只是夢。",
    },
    petMood: {
      zh: "神秘冥想模式",
      en: "Mystic Meditation Mode",
      tw: "神祕冥想模式",
    },
    petTip: {
      zh: "它今天有些敏感，需要一个安静的空间，不要强行打扰。",
      en: "They're a bit sensitive today and need a quiet space—don't force interaction.",
      tw: "牠今天有些敏感，需要一個安靜的空間，不要強行打擾。",
    },
    moodColor: "#9B59B6",
  },
  {
    id: "星星",
    name: { zh: "星星", en: "The Star", tw: "星星" },
    emoji: "⭐",
    petVoice: {
      zh: "你知道吗？我每晚都在向星星许愿，希望明天还有美味的食物和温暖的床。",
      en: "You know what? Every night I wish upon the stars, hoping for tasty food and a warm bed tomorrow.",
      tw: "你知道嗎？我每晚都在向星星許願，希望明天還有美味的食物和溫暖的床。",
    },
    petMood: {
      zh: "许愿小天使模式",
      en: "Wishing Angel Mode",
      tw: "許願小天使模式",
    },
    petTip: {
      zh: "今天的它特别治愈，多给它拍些照片留念吧！",
      en: "They're especially heart-warming today—snap some photos to remember it by!",
      tw: "今天的牠特別療癒，多給牠拍些照片留念吧！",
    },
    moodColor: "#58D68D",
  },
  {
    id: "恋人",
    name: { zh: "恋人", en: "The Lovers", tw: "戀人" },
    emoji: "💝",
    petVoice: {
      zh: "你就是我的全世界，虽然我表达方式是把你的拖鞋叼走，但这是爱！",
      en: "You are my whole world—I may show it by stealing your slippers, but this is love!",
      tw: "你就是我的全世界，雖然我表達方式是把你的拖鞋叼走，但這是愛！",
    },
    petMood: {
      zh: "深情宠粉模式",
      en: "Devoted Fan Mode",
      tw: "深情寵粉模式",
    },
    petTip: {
      zh: "它今天黏人指数爆表，记得腾出时间陪它！",
      en: "Their clinginess is off the charts today—be sure to make time for them!",
      tw: "牠今天黏人指數爆表，記得騰出時間陪牠！",
    },
    moodColor: "#E74C3C",
  },
  {
    id: "力量",
    name: { zh: "力量", en: "Strength", tw: "力量" },
    emoji: "💪",
    petVoice: {
      zh: "我虽小，但内心无比强大。今天什么都挡不住我！（尤其是那个新玩具）",
      en: "I may be small, but my heart is mighty. Nothing can stop me today! (Especially not that new toy.)",
      tw: "我雖小，但內心無比強大。今天什麼都擋不住我！（尤其是那個新玩具）",
    },
    petMood: {
      zh: "勇者无畏模式",
      en: "Fearless Hero Mode",
      tw: "勇者無畏模式",
    },
    petTip: {
      zh: "它今天精力旺盛，给它一些挑战性的玩具吧！",
      en: "They're full of energy today—give them some challenging toys!",
      tw: "牠今天精力旺盛，給牠一些挑戰性的玩具吧！",
    },
    moodColor: "#E67E22",
  },
  {
    id: "愚人",
    name: { zh: "愚人", en: "The Fool", tw: "愚人" },
    emoji: "🎪",
    petVoice: {
      zh: "今天想干嘛干嘛！管那么多做什么？先把这个球咬了再说！",
      en: "Today I'll do whatever I want! Why overthink it? Let me chomp this ball first!",
      tw: "今天想幹嘛幹嘛！管那麼多做什麼？先把這個球咬了再說！",
    },
    petMood: {
      zh: "自由混乱模式",
      en: "Free-Spirited Chaos Mode",
      tw: "自由混亂模式",
    },
    petTip: {
      zh: "今天它可能会做出一些意想不到的举动，请保持宽容和耐心！",
      en: "They might pull some unexpected stunts today—stay tolerant and patient!",
      tw: "今天牠可能會做出一些意想不到的舉動，請保持寬容和耐心！",
    },
    moodColor: "#AF7AC5",
  },
  {
    id: "皇帝",
    name: { zh: "皇帝", en: "The Emperor", tw: "皇帝" },
    emoji: "👑",
    petVoice: {
      zh: "朕今日心情尚佳，可以赏赐尔等铲屎的机会了。注意铲干净。",
      en: "His Majesty is in fine spirits today and shall grant you the honor of scooping the litter. Mind you do it thoroughly.",
      tw: "朕今日心情尚佳，可以賞賜爾等鏟屎的機會了。注意鏟乾淨。",
    },
    petMood: {
      zh: "帝王驾临模式",
      en: "Royal Arrival Mode",
      tw: "帝王駕臨模式",
    },
    petTip: {
      zh: "它今天霸气侧漏，记得及时清洁厕所，以示敬意！",
      en: "They're oozing majesty today—clean the litter box promptly to show your respect!",
      tw: "牠今天霸氣側漏，記得及時清潔廁所，以示敬意！",
    },
    moodColor: "#C9A84C",
  },
  {
    id: "女皇",
    name: { zh: "女皇", en: "The Empress", tw: "女皇" },
    emoji: "🌸",
    petVoice: {
      zh: "今天想要最舒适的位置，最温暖的阳光，还有你的全程陪伴！",
      en: "Today I want the comfiest spot, the warmest sunshine, and your company the whole time!",
      tw: "今天想要最舒適的位置，最溫暖的陽光，還有你的全程陪伴！",
    },
    petMood: {
      zh: "享乐女王模式",
      en: "Pleasure Queen Mode",
      tw: "享樂女王模式",
    },
    petTip: {
      zh: "为它布置一个舒适温暖的角落，它会非常满足！",
      en: "Set up a cozy, warm corner for them and they'll be utterly content!",
      tw: "為牠佈置一個舒適溫暖的角落，牠會非常滿足！",
    },
    moodColor: "#E91E8C",
  },
  {
    id: "隐士",
    name: { zh: "隐士", en: "The Hermit", tw: "隱士" },
    emoji: "🧘",
    petVoice: {
      zh: "今天我需要独处。请不要打扰正在冥想的我，我在思考宇宙本源。",
      en: "Today I need to be alone. Please don't disturb me while I meditate—I'm pondering the origins of the universe.",
      tw: "今天我需要獨處。請不要打擾正在冥想的我，我在思考宇宙本源。",
    },
    petMood: {
      zh: "独行侠冥想模式",
      en: "Lone Wolf Meditation Mode",
      tw: "獨行俠冥想模式",
    },
    petTip: {
      zh: "今天给它一些独处的空间，不必强求互动！",
      en: "Give them some space to themselves today—don't push for interaction!",
      tw: "今天給牠一些獨處的空間，不必強求互動！",
    },
    moodColor: "#7F8C8D",
  },
  {
    id: "世界",
    name: { zh: "世界", en: "The World", tw: "世界" },
    emoji: "🌍",
    petVoice: {
      zh: "今天感觉整个世界都是我的！每个角落都要巡逻一遍才安心！",
      en: "Today the whole world feels like mine! I won't rest until I've patrolled every corner!",
      tw: "今天感覺整個世界都是我的！每個角落都要巡邏一遍才安心！",
    },
    petMood: {
      zh: "领地巡逻模式",
      en: "Territory Patrol Mode",
      tw: "領地巡邏模式",
    },
    petTip: {
      zh: "让它自由探索家里的每个角落，满足它的好奇心！",
      en: "Let them freely explore every corner of the home to satisfy their curiosity!",
      tw: "讓牠自由探索家裡的每個角落，滿足牠的好奇心！",
    },
    moodColor: "#27AE60",
  },
  {
    id: "审判",
    name: { zh: "审判", en: "Judgement", tw: "審判" },
    emoji: "⚖️",
    petVoice: {
      zh: "我已经原谅你上次忘记喂我的事了。但下次…就不一定了。",
      en: "I've already forgiven you for forgetting to feed me last time. But next time… no promises.",
      tw: "我已經原諒你上次忘記餵我的事了。但下次…就不一定了。",
    },
    petMood: {
      zh: "严肃法官模式",
      en: "Stern Judge Mode",
      tw: "嚴肅法官模式",
    },
    petTip: {
      zh: "今天一定要按时喂食，不要让它等待！",
      en: "Be sure to feed them on time today—don't keep them waiting!",
      tw: "今天一定要按時餵食，不要讓牠等待！",
    },
    moodColor: "#FF6B35",
  },
];

export type PetType = "猫咪" | "狗狗" | "兔子" | "鸟类" | "仓鼠" | "其他";
export const PET_TYPES: PetType[] = ["猫咪", "狗狗", "兔子", "鸟类", "仓鼠", "其他"];

export const PET_TYPE_EMOJIS: Record<PetType, string> = {
  猫咪: "🐱", 狗狗: "🐶", 兔子: "🐰", 鸟类: "🐦", 仓鼠: "🐹", 其他: "🐾",
};

export interface PetPsychicResult {
  petName: string;
  petType: PetType;
  card: ResolvedPetCard;
  fullMessage: string;
  secretDesire: string;
  todayPlan: string;
  loveLevel: number;   // 0-100 对主人的爱
  moodLevel: number;   // 0-100 今日心情
  hungerLevel: number; // 0-100 饥饿指数
}

// 基于宠物名字+类型生成伪随机数
function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return () => {
    h = (Math.imul(h ^ (h >>> 16), 0x45d9f3b)) | 0;
    h = (Math.imul(h ^ (h >>> 16), 0x45d9f3b)) | 0;
    return ((h ^ (h >>> 16)) >>> 0) / 0xFFFFFFFF;
  };
}

const SECRET_DESIRES: L[] = [
  {
    zh: "想要一个更大更软的床垫",
    en: "Wants a bigger, softer mattress",
    tw: "想要一個更大更軟的床墊",
  },
  {
    zh: "希望今晚能抢到主人的枕头",
    en: "Hopes to claim your pillow tonight",
    tw: "希望今晚能搶到主人的枕頭",
  },
  {
    zh: "梦想有一天能打开那个神秘的抽屉",
    en: "Dreams of one day opening that mysterious drawer",
    tw: "夢想有一天能打開那個神祕的抽屜",
  },
  {
    zh: "想知道窗外那只鸟叫什么名字",
    en: "Wants to know the name of that bird outside the window",
    tw: "想知道窗外那隻鳥叫什麼名字",
  },
  {
    zh: "希望主人永远不要离开家",
    en: "Wishes you would never leave the house",
    tw: "希望主人永遠不要離開家",
  },
  {
    zh: "想要更多的零食，越多越好",
    en: "Wants more snacks—the more the better",
    tw: "想要更多的零食，越多越好",
  },
  {
    zh: "希望有更多的玩具，尤其是会响的那种",
    en: "Wishes for more toys, especially the squeaky kind",
    tw: "希望有更多的玩具，尤其是會響的那種",
  },
  {
    zh: "想趁主人睡着偷喝杯子里的水",
    en: "Wants to sneak a sip from your cup while you're asleep",
    tw: "想趁主人睡著偷喝杯子裡的水",
  },
  {
    zh: "希望被摸头的时间能再长一点",
    en: "Wishes head-pats would last just a little longer",
    tw: "希望被摸頭的時間能再長一點",
  },
  {
    zh: "想打开家里所有的柜子探索一番",
    en: "Wants to open every cabinet in the house and explore",
    tw: "想打開家裡所有的櫃子探索一番",
  },
];

const TODAY_PLANS: L[] = [
  {
    zh: "上午：睡觉。下午：睡觉。晚上：假装想玩一会儿然后继续睡觉。",
    en: "Morning: sleep. Afternoon: sleep. Evening: pretend to want to play, then go back to sleep.",
    tw: "上午：睡覺。下午：睡覺。晚上：假裝想玩一會兒然後繼續睡覺。",
  },
  {
    zh: "计划1：把所有玩具藏在沙发底下。计划2：假装不知道在哪里。",
    en: "Plan A: hide all the toys under the couch. Plan B: pretend not to know where they are.",
    tw: "計畫1：把所有玩具藏在沙發底下。計畫2：假裝不知道在哪裡。",
  },
  {
    zh: "巡逻全屋领土，标记重要区域，顺便踢翻一个水杯。",
    en: "Patrol the entire home territory, mark the important spots, and knock over a cup of water along the way.",
    tw: "巡邏全屋領土，標記重要區域，順便踢翻一個水杯。",
  },
  {
    zh: "守在主人旁边，确保他/她一刻也不能离开视线。",
    en: "Stay right by your side and make sure you're never out of sight for even a moment.",
    tw: "守在主人旁邊，確保他／她一刻也不能離開視線。",
  },
  {
    zh: "在最阳光的地方睡一整天，偶尔翻身换个角度。",
    en: "Sleep all day in the sunniest spot, occasionally rolling over for a new angle.",
    tw: "在最陽光的地方睡一整天，偶爾翻身換個角度。",
  },
  {
    zh: "翻遍所有角落寻找之前藏的零食，顺便找找之前丢失的玩具。",
    en: "Comb through every corner for previously hidden snacks, and search for long-lost toys along the way.",
    tw: "翻遍所有角落尋找之前藏的零食，順便找找之前丟失的玩具。",
  },
  {
    zh: "叫醒主人，让他知道现在是早上六点，我饿了。",
    en: "Wake you up to let you know it's six in the morning and I'm hungry.",
    tw: "叫醒主人，讓他知道現在是早上六點，我餓了。",
  },
  {
    zh: "进行今日大扫除：把主人叠好的衣服推倒，重新铺平（用爪子）。",
    en: "Do today's big clean: topple your neatly folded laundry and flatten it back out (with paws).",
    tw: "進行今日大掃除：把主人疊好的衣服推倒，重新鋪平（用爪子）。",
  },
  {
    zh: "观察窗外的世界，思考人生，偶尔叫两声表示存在感。",
    en: "Watch the world outside the window, ponder life, and let out a couple of calls to assert my presence.",
    tw: "觀察窗外的世界，思考人生，偶爾叫兩聲表示存在感。",
  },
  {
    zh: "模拟作战演练：追逐想象中的猎物，在家具间穿梭，最终击败沙发抱枕。",
    en: "Run a combat drill: chase imaginary prey, weave between the furniture, and finally defeat the couch cushion.",
    tw: "模擬作戰演練：追逐想像中的獵物，在家具間穿梭，最終擊敗沙發抱枕。",
  },
];

export function buildPetPsychicResult(
  petName: string,
  petType: PetType,
  lang: Lang = "zh",
): PetPsychicResult {
  const today = new Date().toDateString();
  const rand = seededRandom(petName + petType + today);

  const cardIndex = Math.floor(rand() * PET_TAROT_CARDS_RAW.length);
  const rawCard = PET_TAROT_CARDS_RAW[cardIndex]!;

  const loveLevel = Math.floor(rand() * 30) + 70;   // 70-100
  const moodLevel = Math.floor(rand() * 60) + 40;   // 40-100
  const hungerLevel = Math.floor(rand() * 80) + 20; // 20-100

  const secretDesire = rs(SECRET_DESIRES[Math.floor(rand() * SECRET_DESIRES.length)]!, lang);
  const todayPlan = rs(TODAY_PLANS[Math.floor(rand() * TODAY_PLANS.length)]!, lang);

  // 将选中的牌解析为纯字符串（面向组件）
  const card: ResolvedPetCard = {
    id: rawCard.id,
    name: rs(rawCard.name, lang),
    emoji: rawCard.emoji,
    petVoice: rs(rawCard.petVoice, lang),
    petMood: rs(rawCard.petMood, lang),
    petTip: rs(rawCard.petTip, lang),
    moodColor: rawCard.moodColor,
  };

  const fullMessage = buildFullMessage(petName, petType, rawCard, hungerLevel, lang);

  return {
    petName,
    petType,
    card,
    fullMessage,
    secretDesire,
    todayPlan,
    loveLevel,
    moodLevel,
    hungerLevel,
  };
}

// ── buildFullMessage 三语模板 ───────────────────────────────
const FULL_MESSAGE: Record<Lang, {
  typeWord: (petName: string, petType: PetType) => string;
  hungerNote: (typeWord: string) => string;
  compose: (petName: string, cardName: string, petVoice: string, hungerNote: string) => string;
}> = {
  zh: {
    typeWord: (petName, petType) =>
      petType === "猫咪" ? "本猫" : petType === "狗狗" ? "本狗" : `${petName}`,
    // 保持与原始 zh 输出完全一致：原代码使用双引号，${typeWord} 为字面量而非插值。
    hungerNote: () => "（PS：${typeWord}有点饿，主人你懂的）",
    compose: (petName, cardName, petVoice, hungerNote) =>
      `${petName}今天抽到了「${cardName}」——${petVoice}${hungerNote}`,
  },
  tw: {
    typeWord: (petName, petType) =>
      petType === "猫咪" ? "本喵" : petType === "狗狗" ? "本汪" : `${petName}`,
    hungerNote: (typeWord) => `（PS：${typeWord}有點餓，主人你懂的）`,
    compose: (petName, cardName, petVoice, hungerNote) =>
      `${petName}今天抽到了「${cardName}」——${petVoice}${hungerNote}`,
  },
  en: {
    typeWord: (petName, petType) =>
      petType === "猫咪" ? "this cat" : petType === "狗狗" ? "this dog" : `${petName}`,
    hungerNote: (typeWord) => ` (PS: ${typeWord} is a little hungry, you know the deal)`,
    compose: (petName, cardName, petVoice, hungerNote) =>
      `${petName} drew "${cardName}" today—${petVoice}${hungerNote}`,
  },
};

function buildFullMessage(
  petName: string,
  petType: PetType,
  rawCard: RawPetCard,
  hunger: number,
  lang: Lang,
): string {
  const tpl = FULL_MESSAGE[lang];
  const typeWord = tpl.typeWord(petName, petType);
  const hungerNote = hunger > 70 ? tpl.hungerNote(typeWord) : "";
  return tpl.compose(petName, rs(rawCard.name, lang), rs(rawCard.petVoice, lang), hungerNote);
}

// ── 新手引导 / SEO / FAQ 三语文案（页面底部内容区 + FAQPage JSON-LD 同源）──
export interface PetPsychicContent {
  howToTitle: string;
  howToSteps: string[];
  seoSections: { heading: string; body: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
}

export const PET_PSYCHIC_CONTENT: Record<Lang, PetPsychicContent> = {
  zh: {
    howToTitle: "怎么玩？",
    howToSteps: [
      "上传一张宠物照片，或只填写 TA 的名字（二选一）",
      "选择 TA 的类型：猫咪、狗狗、兔子、鸟类、仓鼠或其他",
      "点击「聆听TA的心声」，塔罗牌会为 TA 抽出今日的一张",
      "查看心声、状态指数、今日计划与小秘密，还可以生成心声卡保存分享",
    ],
    seoSections: [
      {
        heading: "宠物灵语是什么？",
        body: "一个轻松有趣的宠物占卜小工具：上传毛孩的照片或名字、选好类型，系统会为 TA 抽出一张塔罗牌，用第一人称「翻译」TA 今天的心里话，并给出爱主人、今日心情、饥饿感三项状态指数，还有 TA 的今日计划和一个小秘密。",
      },
      {
        heading: "塔罗牌如何「读懂」宠物？",
        body: "每张塔罗牌都对应一种宠物心境——比如「战车」是精力过剩的拆家冲动，「星星」是安静陪伴的温柔。抽牌结果由名字、类型和日期共同决定，同一只宠物同一天抽到的牌固定不变，像一份专属的「今日心情报告」，明天再来又是新的一页。",
      },
      {
        heading: "玩宠物灵语的小贴士",
        body: "结果纯属娱乐，但也可以当成和毛孩互动的小灵感：饥饿指数偏高，也许真的该开个罐头；心情指数偏低，不妨多陪 TA 玩一会儿。另外放心，照片只在你本地浏览器里读取，不会上传到任何服务器。",
      },
    ],
    faqTitle: "常见问题",
    faq: [
      { q: "我的宠物照片会被上传吗？", a: "不会。照片只在你自己的浏览器里读取并展示，不会上传到任何服务器，关掉页面即消失，可放心使用。" },
      { q: "不上传照片可以玩吗？", a: "可以。照片和名字二选一即可，只填名字同样能为 TA 抽牌解读；当然，配上照片的心声卡和海报会更可爱。" },
      { q: "同一只宠物每天的结果是固定的吗？", a: "是的。结果由名字、类型和日期共同决定，同一天重复占卜结果不变；明天再来，TA 会抽到新的牌、说出新的心声。" },
      { q: "解读结果是真的吗？", a: "这是娱乐性质的小工具，「心声」由塔罗牌与文案库生成，不代表宠物的真实想法——但如果它提醒了你多陪陪 TA，也未尝不是好事。" },
    ],
  },
  tw: {
    howToTitle: "怎麼玩？",
    howToSteps: [
      "上傳一張寵物照片，或只填寫 TA 的名字（二選一）",
      "選擇 TA 的類型：貓咪、狗狗、兔子、鳥類、倉鼠或其他",
      "點擊「聆聽TA的心聲」，塔羅牌會為 TA 抽出今日的一張",
      "查看心聲、狀態指數、今日計畫與小秘密，還可以生成心聲卡儲存分享",
    ],
    seoSections: [
      {
        heading: "寵物靈語是什麼？",
        body: "一個輕鬆有趣的寵物占卜小工具：上傳毛孩的照片或名字、選好類型，系統會為 TA 抽出一張塔羅牌，用第一人稱「翻譯」TA 今天的心裡話，並給出愛主人、今日心情、飢餓感三項狀態指數，還有 TA 的今日計畫和一個小秘密。",
      },
      {
        heading: "塔羅牌如何「讀懂」寵物？",
        body: "每張塔羅牌都對應一種寵物心境——比如「戰車」是精力過剩的拆家衝動，「星星」是安靜陪伴的溫柔。抽牌結果由名字、類型和日期共同決定，同一隻寵物同一天抽到的牌固定不變，像一份專屬的「今日心情報告」，明天再來又是新的一頁。",
      },
      {
        heading: "玩寵物靈語的小貼士",
        body: "結果純屬娛樂，但也可以當成和毛孩互動的小靈感：飢餓指數偏高，也許真的該開個罐頭；心情指數偏低，不妨多陪 TA 玩一會兒。另外放心，照片只在你本地瀏覽器裡讀取，不會上傳到任何伺服器。",
      },
    ],
    faqTitle: "常見問題",
    faq: [
      { q: "我的寵物照片會被上傳嗎？", a: "不會。照片只在你自己的瀏覽器裡讀取並展示，不會上傳到任何伺服器，關掉頁面即消失，可放心使用。" },
      { q: "不上傳照片可以玩嗎？", a: "可以。照片和名字二選一即可，只填名字同樣能為 TA 抽牌解讀；當然，配上照片的心聲卡和海報會更可愛。" },
      { q: "同一隻寵物每天的結果是固定的嗎？", a: "是的。結果由名字、類型和日期共同決定，同一天重複占卜結果不變；明天再來，TA 會抽到新的牌、說出新的心聲。" },
      { q: "解讀結果是真的嗎？", a: "這是娛樂性質的小工具，「心聲」由塔羅牌與文案庫生成，不代表寵物的真實想法——但如果它提醒了你多陪陪 TA，也未嘗不是好事。" },
    ],
  },
  en: {
    howToTitle: "How it works",
    howToSteps: [
      "Upload a photo of your pet — or just type their name (either works)",
      "Pick what they are: cat, dog, rabbit, bird, hamster, or other",
      "Tap \"Listen to their heart\" and a tarot card is drawn for them",
      "Read their inner voice, stats, plan for today and little secret — then save and share the heart card",
    ],
    seoSections: [
      {
        heading: "What is Pet Psychic?",
        body: "A lighthearted pet oracle: upload your fur baby's photo or name, pick their type, and the tool draws a tarot card that \"translates\" what's on their mind today — in first person. You also get three stats (loves you, mood, hunger), their plan for today, and one little secret.",
      },
      {
        heading: "How does a tarot card \"read\" a pet?",
        body: "Each card maps to a pet state of mind — the Chariot is zoomies-fueled chaos, the Star is quiet, gentle companionship. The draw is seeded by your pet's name, type, and the date, so the same pet gets the same card all day: a little daily mood report, with a fresh page tomorrow.",
      },
      {
        heading: "Tips for enjoying Pet Psychic",
        body: "It's for fun — but also a nudge to engage with your pet. Hunger stat running high? Maybe open a can. Mood stat low? Extra playtime won't hurt. And rest assured: photos are read locally in your browser and never uploaded anywhere.",
      },
    ],
    faqTitle: "FAQ",
    faq: [
      { q: "Is my pet's photo uploaded anywhere?", a: "No. The photo is read and displayed locally in your own browser — it never leaves your device and disappears when you close the page." },
      { q: "Can I play without uploading a photo?", a: "Yes. A photo or a name — either one is enough to draw a card. That said, the heart card and poster look much cuter with a photo." },
      { q: "Does the same pet get the same result every day?", a: "Yes. The result is seeded by name, type, and date, so re-reading on the same day gives the same card. Come back tomorrow for a brand-new message." },
      { q: "Is the reading real?", a: "It's an entertainment tool — the \"inner voice\" comes from tarot cards and a copy library, not actual animal telepathy. But if it reminds you to spend more time with them, that's a win." },
    ],
  },
};
