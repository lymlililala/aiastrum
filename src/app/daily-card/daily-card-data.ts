// ===== 每日宇宙提示卡数据库 =====

import type { Locale } from "~/lib/i18n";

/** 单张卡片的可翻译文案 */
export interface DailyCardText {
  title: string;       // 卡片标题
  message: string;     // 主文案（直击心灵）
  subMessage: string;  // 副文案（补充与延伸）
  category: string;    // 分类
}

export interface DailyCard {
  id: number;
  emoji: string;       // 主图标
  bgFrom: string;      // 渐变起始色
  bgTo: string;        // 渐变结束色
  accentColor: string; // 强调色
  /** 各语言文案 */
  text: Record<Locale, DailyCardText>;
}

export const DAILY_CARDS: DailyCard[] = [
  {
    id: 1,
    emoji: "🌌",
    bgFrom: "#0a0518",
    bgTo: "#1a0a35",
    accentColor: "#9B59B6",
    text: {
      zh: {
        title: "宇宙提示",
        message: "今天不要急着做决定，让子弹飞一会儿。",
        subMessage: "有些事情需要时间发酵，不是拖延，而是尊重过程。",
        category: "智慧",
      },
      tw: {
        title: "宇宙提示",
        message: "今天不要急著做決定，讓子彈飛一會兒。",
        subMessage: "有些事情需要時間發酵，不是拖延，而是尊重過程。",
        category: "智慧",
      },
      en: {
        title: "Cosmic Whisper",
        message: "Don't rush into decisions today — let things settle for a while.",
        subMessage: "Some things need time to ferment. This isn't delay; it's respecting the process.",
        category: "Wisdom",
      },
    },
  },
  {
    id: 2,
    emoji: "✨",
    bgFrom: "#0a1a2e",
    bgTo: "#0a2a4e",
    accentColor: "#3498DB",
    text: {
      zh: {
        title: "今日能量",
        message: "你已经比昨天的自己进步了，哪怕只是一毫米。",
        subMessage: "成长不总是轰轰烈烈的，积土成山，每一步都算数。",
        category: "成长",
      },
      tw: {
        title: "今日能量",
        message: "你已經比昨天的自己進步了，哪怕只是一毫米。",
        subMessage: "成長不總是轟轟烈烈的，積土成山，每一步都算數。",
        category: "成長",
      },
      en: {
        title: "Today's Energy",
        message: "You're already further along than yesterday — even if only by a millimeter.",
        subMessage: "Growth isn't always dramatic; mountains are built grain by grain, and every step counts.",
        category: "Growth",
      },
    },
  },
  {
    id: 3,
    emoji: "💫",
    bgFrom: "#180a2e",
    bgTo: "#300a50",
    accentColor: "#E91E8C",
    text: {
      zh: {
        title: "星际密语",
        message: "那个让你辗转反侧的人，可能已经把你忘了。放下吧。",
        subMessage: "不是所有的故事都需要一个完美的结局，有些人出现是为了教你成长。",
        category: "情感",
      },
      tw: {
        title: "星際密語",
        message: "那個讓你輾轉反側的人，可能已經把你忘了。放下吧。",
        subMessage: "不是所有的故事都需要一個完美的結局，有些人出現是為了教你成長。",
        category: "情感",
      },
      en: {
        title: "Interstellar Murmur",
        message: "The person keeping you up at night has probably already forgotten you. Let it go.",
        subMessage: "Not every story needs a perfect ending; some people appear only to teach you how to grow.",
        category: "Emotions",
      },
    },
  },
  {
    id: 4,
    emoji: "🎁",
    bgFrom: "#1a1000",
    bgTo: "#352000",
    accentColor: "#FFB300",
    text: {
      zh: {
        title: "宇宙礼物",
        message: "今天会有一个小惊喜等着你，留意生活里的细节。",
        subMessage: "宇宙总是在恰当的时机送来惊喜，而那些人习惯性地错过了。",
        category: "好运",
      },
      tw: {
        title: "宇宙禮物",
        message: "今天會有一個小驚喜等著你，留意生活裡的細節。",
        subMessage: "宇宙總是在恰當的時機送來驚喜，而那些人習慣性地錯過了。",
        category: "好運",
      },
      en: {
        title: "Cosmic Gift",
        message: "A small surprise is waiting for you today — pay attention to the little details.",
        subMessage: "The universe always sends surprises at the right moment; most people habitually miss them.",
        category: "Luck",
      },
    },
  },
  {
    id: 5,
    emoji: "🌙",
    bgFrom: "#0d0a1a",
    bgTo: "#1a152e",
    accentColor: "#7C3AED",
    text: {
      zh: {
        title: "内在声音",
        message: "你的直觉一直都是对的，只是你不敢相信。",
        subMessage: "身体的感知比大脑的分析更诚实，学会聆听内心那个轻声细语。",
        category: "直觉",
      },
      tw: {
        title: "內在聲音",
        message: "你的直覺一直都是對的，只是你不敢相信。",
        subMessage: "身體的感知比大腦的分析更誠實，學會聆聽內心那個輕聲細語。",
        category: "直覺",
      },
      en: {
        title: "Inner Voice",
        message: "Your intuition has been right all along — you just didn't dare to trust it.",
        subMessage: "The body's senses are more honest than the mind's analysis; learn to listen to that quiet inner whisper.",
        category: "Intuition",
      },
    },
  },
  {
    id: 6,
    emoji: "🌿",
    bgFrom: "#0a1a0a",
    bgTo: "#0a2a15",
    accentColor: "#27AE60",
    text: {
      zh: {
        title: "能量提醒",
        message: "今天适合休息，不必证明什么，存在本身就有价值。",
        subMessage: "放下“应该”的重量，你不需要每天都成就非凡。",
        category: "疗愈",
      },
      tw: {
        title: "能量提醒",
        message: "今天適合休息，不必證明什麼，存在本身就有價值。",
        subMessage: "放下「應該」的重量，你不需要每天都成就非凡。",
        category: "療癒",
      },
      en: {
        title: "Energy Reminder",
        message: "Today is for resting. You don't need to prove anything — simply existing has value.",
        subMessage: "Put down the weight of “should.” You don't have to achieve something extraordinary every day.",
        category: "Healing",
      },
    },
  },
  {
    id: 7,
    emoji: "⚡",
    bgFrom: "#1a0e00",
    bgTo: "#3a1500",
    accentColor: "#FF6B35",
    text: {
      zh: {
        title: "宇宙提示",
        message: "那件你一直在拖延的事，今天就开始吧，开始了就成功了一半。",
        subMessage: "完美的时机永远不会来，唯有行动才能改变现状。",
        category: "行动",
      },
      tw: {
        title: "宇宙提示",
        message: "那件你一直在拖延的事，今天就開始吧，開始了就成功了一半。",
        subMessage: "完美的時機永遠不會來，唯有行動才能改變現狀。",
        category: "行動",
      },
      en: {
        title: "Cosmic Whisper",
        message: "That thing you keep putting off — start it today. Starting is half the victory.",
        subMessage: "The perfect moment never comes; only action can change your situation.",
        category: "Action",
      },
    },
  },
  {
    id: 8,
    emoji: "💎",
    bgFrom: "#1a0a18",
    bgTo: "#2e0a2a",
    accentColor: "#E91E8C",
    text: {
      zh: {
        title: "星光指引",
        message: "你值得被温柔对待，首先是来自你自己。",
        subMessage: "自我批判和自我苛责是最深的内耗，今天对自己好一点。",
        category: "自爱",
      },
      tw: {
        title: "星光指引",
        message: "你值得被溫柔對待，首先是來自你自己。",
        subMessage: "自我批判和自我苛責是最深的內耗，今天對自己好一點。",
        category: "自愛",
      },
      en: {
        title: "Starlight Guidance",
        message: "You deserve to be treated gently — starting with how you treat yourself.",
        subMessage: "Self-criticism and self-blame are the deepest forms of inner drain. Be kinder to yourself today.",
        category: "Self-Love",
      },
    },
  },
  {
    id: 9,
    emoji: "🌸",
    bgFrom: "#1a0808",
    bgTo: "#2e1010",
    accentColor: "#E74C3C",
    text: {
      zh: {
        title: "今日启示",
        message: "有些人的离开是命运在帮你腾出空间，迎接更好的。",
        subMessage: "告别有时候是祝福，让去的人去，让来的人来。",
        category: "放下",
      },
      tw: {
        title: "今日啟示",
        message: "有些人的離開是命運在幫你騰出空間，迎接更好的。",
        subMessage: "告別有時候是祝福，讓去的人去，讓來的人來。",
        category: "放下",
      },
      en: {
        title: "Today's Revelation",
        message: "Some people leave because fate is clearing space for something better.",
        subMessage: "A goodbye is sometimes a blessing — let those who go, go, and let those who come, come.",
        category: "Letting Go",
      },
    },
  },
  {
    id: 10,
    emoji: "🧘",
    bgFrom: "#0a0d1a",
    bgTo: "#0a1028",
    accentColor: "#4A9ECA",
    text: {
      zh: {
        title: "宇宙信号",
        message: "你的焦虑是因为你把“现在”活在了“未来”里，回来。",
        subMessage: "深呼吸，此刻你是安全的，你所担心的大多数事情不会发生。",
        category: "正念",
      },
      tw: {
        title: "宇宙信號",
        message: "你的焦慮是因為你把「現在」活在了「未來」裡，回來。",
        subMessage: "深呼吸，此刻你是安全的，你所擔心的大多數事情不會發生。",
        category: "正念",
      },
      en: {
        title: "Cosmic Signal",
        message: "Your anxiety comes from living “now” inside the “future.” Come back to the present.",
        subMessage: "Breathe deeply. In this moment you are safe, and most of what you fear will never happen.",
        category: "Mindfulness",
      },
    },
  },
  {
    id: 11,
    emoji: "💝",
    bgFrom: "#180a10",
    bgTo: "#2a0a1a",
    accentColor: "#E91E8C",
    text: {
      zh: {
        title: "能量共振",
        message: "你的善良是你的超能力，不要因为被误解就失去它。",
        subMessage: "世界需要更多温柔的人，而你就是其中之一。",
        category: "善良",
      },
      tw: {
        title: "能量共振",
        message: "你的善良是你的超能力，不要因為被誤解就失去它。",
        subMessage: "世界需要更多溫柔的人，而你就是其中之一。",
        category: "善良",
      },
      en: {
        title: "Energy Resonance",
        message: "Your kindness is your superpower — don't lose it just because you were misunderstood.",
        subMessage: "The world needs more gentle souls, and you are one of them.",
        category: "Kindness",
      },
    },
  },
  {
    id: 12,
    emoji: "🛡️",
    bgFrom: "#0d0d0d",
    bgTo: "#1a1a2a",
    accentColor: "#7F8C8D",
    text: {
      zh: {
        title: "星际传言",
        message: "今天不要跟不值得的人消耗能量，保护好你的频率。",
        subMessage: "你的注意力是稀缺资源，不要浪费在让你变差的人事物上。",
        category: "边界",
      },
      tw: {
        title: "星際傳言",
        message: "今天不要跟不值得的人消耗能量，保護好你的頻率。",
        subMessage: "你的注意力是稀缺資源，不要浪費在讓你變差的人事物上。",
        category: "邊界",
      },
      en: {
        title: "Interstellar Rumor",
        message: "Don't burn energy on people who aren't worth it today — protect your frequency.",
        subMessage: "Your attention is a scarce resource; don't waste it on people or things that make you worse.",
        category: "Boundaries",
      },
    },
  },
  {
    id: 13,
    emoji: "🌊",
    bgFrom: "#0a1218",
    bgTo: "#0a1e2e",
    accentColor: "#2E86C1",
    text: {
      zh: {
        title: "内心灯塔",
        message: "哭了也没关系，眼泪是情绪的出口，不是软弱的证明。",
        subMessage: "允许自己脆弱，才能真正强大；感受痛苦，才能真正愈合。",
        category: "疗愈",
      },
      tw: {
        title: "內心燈塔",
        message: "哭了也沒關係，眼淚是情緒的出口，不是軟弱的證明。",
        subMessage: "允許自己脆弱，才能真正強大；感受痛苦，才能真正癒合。",
        category: "療癒",
      },
      en: {
        title: "Inner Lighthouse",
        message: "It's okay to cry — tears are an outlet for emotion, not proof of weakness.",
        subMessage: "Only by allowing yourself to be vulnerable can you become truly strong; only by feeling pain can you truly heal.",
        category: "Healing",
      },
    },
  },
  {
    id: 14,
    emoji: "🌟",
    bgFrom: "#181000",
    bgTo: "#2e2000",
    accentColor: "#F0A500",
    text: {
      zh: {
        title: "宇宙礼物",
        message: "那个你觉得“还不够好”的自己，已经让很多人羡慕了。",
        subMessage: "停止和别人比较，开始欣赏自己拥有的一切，你比你以为的更丰盛。",
        category: "感恩",
      },
      tw: {
        title: "宇宙禮物",
        message: "那個你覺得「還不夠好」的自己，已經讓很多人羨慕了。",
        subMessage: "停止和別人比較，開始欣賞自己擁有的一切，你比你以為的更豐盛。",
        category: "感恩",
      },
      en: {
        title: "Cosmic Gift",
        message: "The self you think “isn't good enough” is already someone many others envy.",
        subMessage: "Stop comparing yourself to others and start appreciating all you have — you are more abundant than you realize.",
        category: "Gratitude",
      },
    },
  },
  {
    id: 15,
    emoji: "📱",
    bgFrom: "#180a18",
    bgTo: "#2a0a2a",
    accentColor: "#AF7AC5",
    text: {
      zh: {
        title: "今日能量",
        message: "喜欢的人迟迟不回复？先去做让自己开心的事。",
        subMessage: "你的快乐不应该被别人的回复时间决定，爱自己才是最重要的。",
        category: "情感",
      },
      tw: {
        title: "今日能量",
        message: "喜歡的人遲遲不回覆？先去做讓自己開心的事。",
        subMessage: "你的快樂不應該被別人的回覆時間決定，愛自己才是最重要的。",
        category: "情感",
      },
      en: {
        title: "Today's Energy",
        message: "Crush not texting back? Go do something that makes you happy first.",
        subMessage: "Your joy shouldn't be dictated by someone else's reply time — loving yourself matters most.",
        category: "Emotions",
      },
    },
  },
  {
    id: 16,
    emoji: "🌺",
    bgFrom: "#1a0a10",
    bgTo: "#2a0a18",
    accentColor: "#E91E8C",
    text: {
      zh: {
        title: "宇宙提示",
        message: "今天的你很美，就算你自己没注意到。",
        subMessage: "美是一种光，它从内心发出，照亮了你周围的每一个人。",
        category: "自爱",
      },
      tw: {
        title: "宇宙提示",
        message: "今天的你很美，就算你自己沒注意到。",
        subMessage: "美是一種光，它從內心發出，照亮了你周圍的每一個人。",
        category: "自愛",
      },
      en: {
        title: "Cosmic Whisper",
        message: "You look beautiful today, even if you didn't notice it yourself.",
        subMessage: "Beauty is a light that shines from within, illuminating everyone around you.",
        category: "Self-Love",
      },
    },
  },
  {
    id: 17,
    emoji: "💰",
    bgFrom: "#181200",
    bgTo: "#2a1e00",
    accentColor: "#C9A84C",
    text: {
      zh: {
        title: "星际密语",
        message: "钱是会来的，先把自己的状态调整好，财运跟着能量走。",
        subMessage: "匮乏感本身会阻塞丰盛，先感恩你已经拥有的，更多的才会来。",
        category: "财运",
      },
      tw: {
        title: "星際密語",
        message: "錢是會來的，先把自己的狀態調整好，財運跟著能量走。",
        subMessage: "匱乏感本身會阻塞豐盛，先感恩你已經擁有的，更多的才會來。",
        category: "財運",
      },
      en: {
        title: "Interstellar Murmur",
        message: "Money will come. Get your own state right first — wealth follows your energy.",
        subMessage: "Scarcity itself blocks abundance; be grateful for what you already have, and more will follow.",
        category: "Wealth",
      },
    },
  },
  {
    id: 18,
    emoji: "🌅",
    bgFrom: "#1a0800",
    bgTo: "#3a1500",
    accentColor: "#E74C3C",
    text: {
      zh: {
        title: "光明预言",
        message: "你以为的终点，其实是转折点。最坏的时候往往也是转机。",
        subMessage: "黎明之前是最黑暗的，但黑暗不是终点，它是光的前奏。",
        category: "希望",
      },
      tw: {
        title: "光明預言",
        message: "你以為的終點，其實是轉折點。最壞的時候往往也是轉機。",
        subMessage: "黎明之前是最黑暗的，但黑暗不是終點，它是光的前奏。",
        category: "希望",
      },
      en: {
        title: "Bright Prophecy",
        message: "What you think is the end is actually a turning point. The worst moments are often where things turn around.",
        subMessage: "The hour before dawn is darkest, but darkness isn't the end — it's the prelude to light.",
        category: "Hope",
      },
    },
  },
  {
    id: 19,
    emoji: "🗝️",
    bgFrom: "#0d0d1a",
    bgTo: "#1a1a2e",
    accentColor: "#5499C7",
    text: {
      zh: {
        title: "内在声音",
        message: "那个选择，你其实已经做决定了，只是需要勇气承认。",
        subMessage: "你的心已经知道答案，只需要给自己允许的力量。",
        category: "决策",
      },
      tw: {
        title: "內在聲音",
        message: "那個選擇，你其實已經做決定了，只是需要勇氣承認。",
        subMessage: "你的心已經知道答案，只需要給自己允許的力量。",
        category: "決策",
      },
      en: {
        title: "Inner Voice",
        message: "You've actually already made that choice — you just need the courage to admit it.",
        subMessage: "Your heart already knows the answer; you only need to give yourself permission.",
        category: "Decisions",
      },
    },
  },
  {
    id: 20,
    emoji: "🤝",
    bgFrom: "#0a180a",
    bgTo: "#102e15",
    accentColor: "#58D68D",
    text: {
      zh: {
        title: "宇宙信号",
        message: "今天遇到的那个有趣的人，或许不只是偶然。",
        subMessage: "宇宙在精心安排每一次相遇，带着好奇心去打开那扇门。",
        category: "缘分",
      },
      tw: {
        title: "宇宙信號",
        message: "今天遇到的那個有趣的人，或許不只是偶然。",
        subMessage: "宇宙在精心安排每一次相遇，帶著好奇心去打開那扇門。",
        category: "緣分",
      },
      en: {
        title: "Cosmic Signal",
        message: "That interesting person you meet today may be more than a coincidence.",
        subMessage: "The universe carefully arranges every encounter — open that door with curiosity.",
        category: "Serendipity",
      },
    },
  },
  {
    id: 21,
    emoji: "☁️",
    bgFrom: "#0d0d18",
    bgTo: "#181820",
    accentColor: "#85929E",
    text: {
      zh: {
        title: "今日启示",
        message: "有时候“不知道怎么办”本身就是答案：先别办。",
        subMessage: "不行动也是一种选择，给自己时间等待清晰，不必急于解决所有问题。",
        category: "智慧",
      },
      tw: {
        title: "今日啟示",
        message: "有時候「不知道怎麼辦」本身就是答案：先別辦。",
        subMessage: "不行動也是一種選擇，給自己時間等待清晰，不必急於解決所有問題。",
        category: "智慧",
      },
      en: {
        title: "Today's Revelation",
        message: "Sometimes “I don't know what to do” is itself the answer: don't do anything yet.",
        subMessage: "Inaction is also a choice — give yourself time to find clarity; you don't have to solve everything at once.",
        category: "Wisdom",
      },
    },
  },
  {
    id: 22,
    emoji: "🌙",
    bgFrom: "#08080f",
    bgTo: "#10101e",
    accentColor: "#6C7BFF",
    text: {
      zh: {
        title: "能量充电",
        message: "你需要的不是更多努力，而是更好的休息。",
        subMessage: "疲惫的时候，允许自己停下来。充满电的你才能走得更远。",
        category: "休息",
      },
      tw: {
        title: "能量充電",
        message: "你需要的不是更多努力，而是更好的休息。",
        subMessage: "疲憊的時候，允許自己停下來。充滿電的你才能走得更遠。",
        category: "休息",
      },
      en: {
        title: "Energy Recharge",
        message: "What you need isn't more effort — it's better rest.",
        subMessage: "When you're exhausted, let yourself stop. Only fully charged can you go further.",
        category: "Rest",
      },
    },
  },
  {
    id: 23,
    emoji: "🦋",
    bgFrom: "#0a0818",
    bgTo: "#150e28",
    accentColor: "#8E44AD",
    text: {
      zh: {
        title: "宇宙提示",
        message: "那件担心会失去的事，也许是宇宙在为更好的东西腾位置。",
        subMessage: "“失去”往往是“获得”的序言，放开紧握的手，才能接住更好的礼物。",
        category: "放下",
      },
      tw: {
        title: "宇宙提示",
        message: "那件擔心會失去的事，也許是宇宙在為更好的東西騰位置。",
        subMessage: "「失去」往往是「獲得」的序言，放開緊握的手，才能接住更好的禮物。",
        category: "放下",
      },
      en: {
        title: "Cosmic Whisper",
        message: "That thing you fear losing may be the universe making room for something better.",
        subMessage: "“Losing” is often the prelude to “gaining” — open your clenched hand to catch a better gift.",
        category: "Letting Go",
      },
    },
  },
  {
    id: 24,
    emoji: "⏰",
    bgFrom: "#1a0e00",
    bgTo: "#2a1800",
    accentColor: "#D35400",
    text: {
      zh: {
        title: "星光传信",
        message: "你说的“等以后”，从今天开始就是现在。",
        subMessage: "“以后”是个谎言，唯有此刻才是你真正能掌握的时间。",
        category: "当下",
      },
      tw: {
        title: "星光傳信",
        message: "你說的「等以後」，從今天開始就是現在。",
        subMessage: "「以後」是個謊言，唯有此刻才是你真正能掌握的時間。",
        category: "當下",
      },
      en: {
        title: "Starlight Message",
        message: "The “later” you keep talking about — starting today, it's now.",
        subMessage: "“Later” is a lie; this moment is the only time you can truly grasp.",
        category: "The Present",
      },
    },
  },
  {
    id: 25,
    emoji: "💌",
    bgFrom: "#1a0808",
    bgTo: "#2e1010",
    accentColor: "#E74C3C",
    text: {
      zh: {
        title: "今日能量",
        message: "今天是适合表白的日子，不管是对喜欢的人，还是对自己。",
        subMessage: "爱是需要说出口的，不要让“以为对方知道”成为遗憾的借口。",
        category: "情感",
      },
      tw: {
        title: "今日能量",
        message: "今天是適合告白的日子，不管是對喜歡的人，還是對自己。",
        subMessage: "愛是需要說出口的，不要讓「以為對方知道」成為遺憾的藉口。",
        category: "情感",
      },
      en: {
        title: "Today's Energy",
        message: "Today is a good day to confess your feelings — to someone you like, or to yourself.",
        subMessage: "Love needs to be spoken; don't let “I assumed they knew” become an excuse for regret.",
        category: "Emotions",
      },
    },
  },
  {
    id: 26,
    emoji: "🔢",
    bgFrom: "#060818",
    bgTo: "#0a0e28",
    accentColor: "#4A9ECA",
    text: {
      zh: {
        title: "宇宙密码",
        message: "注意今天出现在你生命里的数字，它可能是宇宙的暗号。",
        subMessage: "有意识地观察，有时候重复出现的数字、颜色或名字都是信号。",
        category: "神秘",
      },
      tw: {
        title: "宇宙密碼",
        message: "注意今天出現在你生命裡的數字，它可能是宇宙的暗號。",
        subMessage: "有意識地觀察，有時候重複出現的數字、顏色或名字都是信號。",
        category: "神秘",
      },
      en: {
        title: "Cosmic Code",
        message: "Notice the numbers that appear in your life today — they may be the universe's secret signal.",
        subMessage: "Observe consciously; sometimes recurring numbers, colors, or names are all signs.",
        category: "Mystery",
      },
    },
  },
  {
    id: 27,
    emoji: "🔥",
    bgFrom: "#1a0800",
    bgTo: "#2e1200",
    accentColor: "#E67E22",
    text: {
      zh: {
        title: "内在光",
        message: "你不需要任何人的许可，就可以成为你想成为的人。",
        subMessage: "你的价值不由他人评定，你的人生不需要任何人的认可才能开始。",
        category: "自主",
      },
      tw: {
        title: "內在光",
        message: "你不需要任何人的許可，就可以成為你想成為的人。",
        subMessage: "你的價值不由他人評定，你的人生不需要任何人的認可才能開始。",
        category: "自主",
      },
      en: {
        title: "Inner Light",
        message: "You don't need anyone's permission to become who you want to be.",
        subMessage: "Your worth isn't decided by others; your life doesn't need anyone's approval to begin.",
        category: "Autonomy",
      },
    },
  },
  {
    id: 28,
    emoji: "🎪",
    bgFrom: "#0e0a1a",
    bgTo: "#1a1028",
    accentColor: "#AF7AC5",
    text: {
      zh: {
        title: "宇宙提示",
        message: "今天适合一个人做一件取悦自己的小事。",
        subMessage: "给自己买一杯喜欢的饮料，看一部积压已久的电影，做一件平时“不值得”做的事。",
        category: "自爱",
      },
      tw: {
        title: "宇宙提示",
        message: "今天適合一個人做一件取悅自己的小事。",
        subMessage: "給自己買一杯喜歡的飲料，看一部積壓已久的電影，做一件平時「不值得」做的事。",
        category: "自愛",
      },
      en: {
        title: "Cosmic Whisper",
        message: "Today is perfect for doing one small thing, alone, just to please yourself.",
        subMessage: "Buy yourself a favorite drink, watch that movie you've been putting off, do something you'd usually deem “not worth it.”",
        category: "Self-Love",
      },
    },
  },
  {
    id: 29,
    emoji: "🗺️",
    bgFrom: "#0a100a",
    bgTo: "#0a1a0e",
    accentColor: "#27AE60",
    text: {
      zh: {
        title: "星际预言",
        message: "你以为最差的选择，往往会引领你到意想不到的美好。",
        subMessage: "生命不是非此即彼，每一条路都有它的风景，走错了也是经历。",
        category: "勇气",
      },
      tw: {
        title: "星際預言",
        message: "你以為最差的選擇，往往會引領你到意想不到的美好。",
        subMessage: "生命不是非此即彼，每一條路都有它的風景，走錯了也是經歷。",
        category: "勇氣",
      },
      en: {
        title: "Interstellar Prophecy",
        message: "The choice you think is the worst often leads you to unexpected beauty.",
        subMessage: "Life isn't either-or; every path has its own scenery, and even a wrong turn is an experience.",
        category: "Courage",
      },
    },
  },
  {
    id: 30,
    emoji: "💓",
    bgFrom: "#0a0812",
    bgTo: "#14101e",
    accentColor: "#C084FC",
    text: {
      zh: {
        title: "宇宙心跳",
        message: "今天，只需要深呼吸，感受活着的奇迹。",
        subMessage: "你存在着，你呼吸着，你感受着——这已经是奇迹了。",
        category: "正念",
      },
      tw: {
        title: "宇宙心跳",
        message: "今天，只需要深呼吸，感受活著的奇蹟。",
        subMessage: "你存在著，你呼吸著，你感受著——這已經是奇蹟了。",
        category: "正念",
      },
      en: {
        title: "Cosmic Heartbeat",
        message: "Today, all you need to do is breathe deeply and feel the miracle of being alive.",
        subMessage: "You exist, you breathe, you feel — that is already a miracle.",
        category: "Mindfulness",
      },
    },
  },
];

// ===== 页面 UI 文案（多语言） =====
export interface DailyCardUI {
  back: string;
  dateTag: string;
  backHint: string;
  frontTag: string;
  flipHint: string;
  saveCard: string;
  again: string;
  cardAria: string;
  posterTitle: string;
  posterFooter: string;
  posterSave: string;
  posterClose: string;
  fileName: string;
  tarotLink: string;
  howToTitle: string;
  howToSteps: string[];
  seoSections: { heading: string; body: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
}

export const DAILY_CARD_UI: Record<Locale, DailyCardUI> = {
  zh: {
    back: "← 返回",
    dateTag: "每日宇宙提示卡",
    backHint: "点击翻开今日提示",
    frontTag: "今日宇宙提示",
    flipHint: "轻触卡牌，聆听宇宙的声音",
    saveCard: "📸 保存今日宇宙卡片",
    again: "↺ 再看一眼卡背",
    cardAria: "点击翻开今日宇宙提示卡",
    posterTitle: "每日宇宙提示卡",
    posterFooter: "命运密语 · 每日宇宙提示",
    posterSave: "📥 保存卡片",
    posterClose: "关闭",
    fileName: "今日宇宙提示卡",
    tarotLink: "🔮 探索 78 张塔罗牌意",
    howToTitle: "怎么玩？",
    howToSteps: [
      "深呼吸，心里默念一个你正在思考的问题（也可以什么都不想）",
      "轻触卡背，翻开今天的宇宙提示",
      "把这句话当作今天的小提醒，喜欢就保存成图片分享给朋友",
      "每天只有一张，明天再来抽新的",
    ],
    seoSections: [
      {
        heading: "每日宇宙提示卡是什么？",
        body: "每天一张的免费日签。系统会根据日期选出属于今天的提示卡——一句简短的宇宙讯息和一段解读，帮你在忙碌的一天开始之前停下来，换一个角度看问题。它更像一个轻松的小仪式，而不是正式的占卜。",
      },
      {
        heading: "为什么每天只有一张？",
        body: "一张刚刚好。每天固定的一张卡，让你把注意力真正放在这句话上，而不是不停地重抽直到满意为止。卡片内容当天不变，零点过后会换成新的一天、新的提示。",
      },
      {
        heading: "提示卡和塔罗牌有什么不同？",
        body: "提示卡是我们设计的轻量日签，适合每天花一分钟看一眼；如果你想深入了解牌意或自己抽牌占卜，可以逛逛 78 张塔罗牌意库，或试试在线塔罗抽牌。",
      },
    ],
    faqTitle: "常见问题",
    faq: [
      { q: "每日一签需要注册或付费吗？", a: "完全免费，也不用注册。打开页面点一下卡背就能抽，今天的内容立刻揭晓。" },
      { q: "今天的卡可以重新抽吗？", a: "不可以。卡片是按日期确定的，同一天内容固定不变。这也是它的意义——接住今天的第一句话。明天零点会换一张新的。" },
      { q: "这些卡片是塔罗牌吗？", a: "不是严格意义上的塔罗牌，而是本站设计的宇宙提示卡。想研究塔罗牌意，可以去 78 张塔罗牌意库慢慢看。" },
      { q: "提示卡准吗？", a: "别把它当预言。它更像一面镜子：用一句话帮你换个角度看待今天正在发生的事。有共鸣就收下，没有就一笑而过。" },
    ],
  },
  tw: {
    back: "← 返回",
    dateTag: "每日宇宙提示卡",
    backHint: "點擊翻開今日提示",
    frontTag: "今日宇宙提示",
    flipHint: "輕觸卡牌，聆聽宇宙的聲音",
    saveCard: "📸 儲存今日宇宙卡片",
    again: "↺ 再看一眼卡背",
    cardAria: "點擊翻開今日宇宙提示卡",
    posterTitle: "每日宇宙提示卡",
    posterFooter: "命運密語 · 每日宇宙提示",
    posterSave: "📥 儲存卡片",
    posterClose: "關閉",
    fileName: "今日宇宙提示卡",
    tarotLink: "🔮 探索 78 張塔羅牌意",
    howToTitle: "怎麼玩？",
    howToSteps: [
      "深呼吸，心裡默念一個你正在思考的問題（也可以什麼都不想）",
      "輕觸卡背，翻開今天的宇宙提示",
      "把這句話當作今天的小提醒，喜歡就儲存成圖片分享給朋友",
      "每天只有一張，明天再來抽新的",
    ],
    seoSections: [
      {
        heading: "每日宇宙提示卡是什麼？",
        body: "每天一張的免費日籤。系統會根據日期選出屬於今天的提示卡——一句簡短的宇宙訊息和一段解讀，幫你在忙碌的一天開始之前停下來，換一個角度看問題。它更像一個輕鬆的小儀式，而不是正式的占卜。",
      },
      {
        heading: "為什麼每天只有一張？",
        body: "一張剛剛好。每天固定的一張卡，讓你把注意力真正放在這句話上，而不是不停地重抽直到滿意為止。卡片內容當天不變，零點過後會換成新的一天、新的提示。",
      },
      {
        heading: "提示卡和塔羅牌有什麼不同？",
        body: "提示卡是我們設計的輕量日籤，適合每天花一分鐘看一眼；如果你想深入了解牌意或自己抽牌占卜，可以逛逛 78 張塔羅牌意庫，或試試線上塔羅抽牌。",
      },
    ],
    faqTitle: "常見問題",
    faq: [
      { q: "每日一籤需要註冊或付費嗎？", a: "完全免費，也不用註冊。打開頁面點一下卡背就能抽，今天的內容立刻揭曉。" },
      { q: "今天的卡可以重新抽嗎？", a: "不可以。卡片是按日期確定的，同一天內容固定不變。這也是它的意義——接住今天的第一句話。明天零點會換一張新的。" },
      { q: "這些卡片是塔羅牌嗎？", a: "不是嚴格意義上的塔羅牌，而是本站設計的宇宙提示卡。想研究塔羅牌意，可以去 78 張塔羅牌意庫慢慢看。" },
      { q: "提示卡準嗎？", a: "別把它當預言。它更像一面鏡子：用一句話幫你換個角度看待今天正在發生的事。有共鳴就收下，沒有就一笑而過。" },
    ],
  },
  en: {
    back: "← Back",
    dateTag: "Daily Cosmic Card",
    backHint: "Tap to reveal today's message",
    frontTag: "Today's Cosmic Message",
    flipHint: "Tap the card and listen to the universe",
    saveCard: "📸 Save Today's Cosmic Card",
    again: "↺ View the card back again",
    cardAria: "Tap to reveal today's cosmic card",
    posterTitle: "Daily Cosmic Card",
    posterFooter: "AiAstrum · Daily Cosmic Card",
    posterSave: "📥 Save Card",
    posterClose: "Close",
    fileName: "Daily-Cosmic-Card",
    tarotLink: "🔮 Explore All 78 Tarot Card Meanings",
    howToTitle: "How it works",
    howToSteps: [
      "Take a breath and hold a question in mind (or nothing at all)",
      "Tap the card back to reveal today's message",
      "Read it as a small reminder for your day — save it as an image to share",
      "One card per day. Come back tomorrow for a new one",
    ],
    seoSections: [
      {
        heading: "What is the Daily Cosmic Card?",
        body: "A free daily card, one per day. The system picks a card for the date — a short cosmic message with a brief reading — giving you a moment to pause and look at your day from a different angle. It's a light daily ritual rather than a formal divination.",
      },
      {
        heading: "Why only one card a day?",
        body: "One is just enough. A fixed card for the day keeps your attention on the message instead of re-drawing until you like the answer. The card stays the same all day and refreshes at midnight with a new message.",
      },
      {
        heading: "How is this different from tarot?",
        body: "The cosmic card is a lightweight daily prompt designed by us, perfect for a one-minute pause. If you want to go deeper — study card meanings or do a full reading — explore our 78-card tarot library or try an online tarot draw.",
      },
    ],
    faqTitle: "FAQ",
    faq: [
      { q: "Is the daily card free? Do I need an account?", a: "Completely free, no sign-up needed. Open the page, tap the card back, and today's message is revealed instantly." },
      { q: "Can I draw again if I don't like today's card?", a: "No — the card is determined by the date and stays fixed all day. That's the point: take the first message the day offers you. A new card arrives at midnight." },
      { q: "Are these actual tarot cards?", a: "Not in the strict sense. They're cosmic prompt cards designed by us. To study real tarot meanings, browse our complete 78-card tarot library." },
      { q: "Is the card 'accurate'?", a: "Don't read it as a prediction. It's a mirror: one sentence that helps you see your day from another angle. Take it if it resonates, smile and move on if it doesn't." },
    ],
  },
};

/** Intl 日期 locale 标签 */
function dateTag(locale: Locale): string {
  return locale === "en" ? "en-US" : locale === "tw" ? "zh-TW" : "zh-CN";
}

// 根据日期获取当日卡片
export function getDailyCard(): DailyCard {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const index = dayOfYear % DAILY_CARDS.length;
  return DAILY_CARDS[index]!;
}

// 获取今日日期字符串（按语言本地化）
export function getTodayString(locale: Locale): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  return now.toLocaleDateString(dateTag(locale), options);
}

// 海报下载文件名用的短日期
export function getFileDateString(locale: Locale): string {
  return new Date().toLocaleDateString(dateTag(locale)).replace(/\//g, "-");
}
