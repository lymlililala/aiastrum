"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";
import "./ai-mystic.css";

// ── 三语文案（UI chrome） ────────────────────────────
type Lang = "zh" | "en" | "tw";
const T = {
  zh: {
    back:          "← 返回",
    heroTag:       "AI Mystic · 解忧馆",
    heroTitle:     "AI 专属解忧馆",
    heroSub:       "向塔罗 AI 倾诉你的烦恼，获得洞察与指引",
    quickLabel:    "✦ 快速提问",
    quickQuestions: [
      "我最近感情运势怎么样？",
      "我该换工作吗？",
      "我最近总是睡不好，是什么信号？",
      "我的财运今年如何？",
      "我和某人的关系能有进展吗？",
    ],
    inputThinking: "小云正在思考…",
    inputPlaceholder: "说出你的烦恼…（Enter 发送，Shift+Enter 换行）",
    disclaimer:    "仅供娱乐与心理探索参考，请理性看待，切勿迷信",
    welcome:       "你好，我是小云，你的专属塔罗解忧师。🔮\n\n不论是感情困惑、职场迷茫，还是说不清楚的焦虑，都可以跟我说。我会认真倾听，并用塔罗牌为你指引方向。\n\n今天，你想聊什么？",
  },
  tw: {
    back:          "← 返回",
    heroTag:       "AI Mystic · 解憂館",
    heroTitle:     "AI 專屬解憂館",
    heroSub:       "向塔羅 AI 傾訴你的煩惱，獲得洞察與指引",
    quickLabel:    "✦ 快速提問",
    quickQuestions: [
      "我最近感情運勢怎麼樣？",
      "我該換工作嗎？",
      "我最近總是睡不好，是什麼信號？",
      "我今年的財運如何？",
      "我和某人的關係能有進展嗎？",
    ],
    inputThinking: "小雲正在思考…",
    inputPlaceholder: "說出你的煩惱…（Enter 發送，Shift+Enter 換行）",
    disclaimer:    "僅供娛樂與心理探索參考，請理性看待，切勿迷信",
    welcome:       "你好，我是小雲，你的專屬塔羅解憂師。🔮\n\n不論是感情困惑、職場迷茫，還是說不清楚的焦慮，都可以跟我說。我會認真傾聽，並用塔羅牌為你指引方向。\n\n今天，你想聊什麼？",
  },
  en: {
    back:          "← Back",
    heroTag:       "AI Mystic · Oracle Lounge",
    heroTitle:     "Your AI Oracle Lounge",
    heroSub:       "Share what's on your mind with the tarot AI, and receive insight and guidance",
    quickLabel:    "✦ Quick questions",
    quickQuestions: [
      "How does my love life look lately?",
      "Should I change jobs?",
      "I keep sleeping badly lately — what is it telling me?",
      "How is my fortune with money this year?",
      "Can things move forward with a certain someone?",
    ],
    inputThinking: "Cloudy is thinking…",
    inputPlaceholder: "Tell me what's troubling you… (Enter to send, Shift+Enter for a new line)",
    disclaimer:    "For entertainment and self-reflection only — take it lightly and don't be superstitious",
    welcome:       "Hi, I'm Cloudy, your personal tarot companion. 🔮\n\nWhether it's matters of the heart, career confusion, or an anxiety you can't quite name, you can tell me. I'll listen closely and use the tarot to point the way.\n\nWhat would you like to talk about today?",
  },
};
// ────────────────────────────────────────────────────

// ===== 数据定义 =====
// 冷却时间（ms）：两条消息之间的最短间隔，防止刷屏
const COOLDOWN_MS = 2000;
const STORAGE_KEY = "ai_mystic_usage";

type MessageRole = "ai" | "user";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  cardRef?: string;
  time: string;
}

// 每张牌的 name / msg 三语化（emoji 共用）
type LangText = Record<Lang, string>;
interface TarotCardMini {
  name: LangText;
  emoji: string;
  msg: LangText;
}

const TAROT_CARDS_MINI: TarotCardMini[] = [
  {
    name: { zh: "愚人", en: "The Fool", tw: "愚人" },
    emoji: "🃏",
    msg: {
      zh: "新旅程正在开始，请勇敢踏出第一步，不必想太多",
      en: "A new journey is beginning — take that first step bravely, without overthinking it",
      tw: "新旅程正在開始，請勇敢踏出第一步，不必想太多",
    },
  },
  {
    name: { zh: "恋人", en: "The Lovers", tw: "戀人" },
    emoji: "💕",
    msg: {
      zh: "心的选择比头脑的分析更重要，遵从你内心最真实的感受",
      en: "The heart's choice matters more than the mind's analysis — follow what you truly feel",
      tw: "心的選擇比頭腦的分析更重要，遵從你內心最真實的感受",
    },
  },
  {
    name: { zh: "太阳", en: "The Sun", tw: "太陽" },
    emoji: "☀️",
    msg: {
      zh: "阳光正在向你走来，乐观与喜悦是你最好的护身符",
      en: "Sunlight is making its way to you — optimism and joy are your best talismans",
      tw: "陽光正在向你走來，樂觀與喜悅是你最好的護身符",
    },
  },
  {
    name: { zh: "星星", en: "The Star", tw: "星星" },
    emoji: "⭐",
    msg: {
      zh: "希望之光从未熄灭，保持信念，宇宙正在为你铺路",
      en: "The light of hope has never gone out — keep faith, the universe is paving your way",
      tw: "希望之光從未熄滅，保持信念，宇宙正在為你鋪路",
    },
  },
  {
    name: { zh: "月亮", en: "The Moon", tw: "月亮" },
    emoji: "🌙",
    msg: {
      zh: "潜意识在向你发送信号，冥想与梦境将告诉你答案",
      en: "Your subconscious is sending signals — meditation and dreams will reveal the answer",
      tw: "潛意識在向你發送信號，冥想與夢境將告訴你答案",
    },
  },
  {
    name: { zh: "力量", en: "Strength", tw: "力量" },
    emoji: "🦁",
    msg: {
      zh: "你比自己以为的更强大，内在的勇气将帮你渡过难关",
      en: "You are stronger than you think — your inner courage will carry you through",
      tw: "你比自己以為的更強大，內在的勇氣將幫你渡過難關",
    },
  },
  {
    name: { zh: "命运之轮", en: "Wheel of Fortune", tw: "命運之輪" },
    emoji: "⚙️",
    msg: {
      zh: "转机即将来临，抓住时机，不要错过命运给你的礼物",
      en: "A turning point is near — seize the moment, don't miss the gift fate is offering",
      tw: "轉機即將來臨，抓住時機，不要錯過命運給你的禮物",
    },
  },
  {
    name: { zh: "世界", en: "The World", tw: "世界" },
    emoji: "🌍",
    msg: {
      zh: "一个阶段圆满结束，新的世界正在向你敞开大门",
      en: "One chapter closes beautifully — a whole new world is opening its doors to you",
      tw: "一個階段圓滿結束，新的世界正在向你敞開大門",
    },
  },
  {
    name: { zh: "教皇", en: "The Hierophant", tw: "教皇" },
    emoji: "🙏",
    msg: {
      zh: "寻求可靠的引导与智慧，传统中藏有你需要的答案",
      en: "Seek trustworthy guidance and wisdom — tradition holds the answer you need",
      tw: "尋求可靠的引導與智慧，傳統中藏有你需要的答案",
    },
  },
  {
    name: { zh: "高女祭司", en: "The High Priestess", tw: "高女祭司" },
    emoji: "🔮",
    msg: {
      zh: "相信直觉，你内心深处已知道答案，只需静下来倾听",
      en: "Trust your intuition — deep down you already know the answer, just grow still and listen",
      tw: "相信直覺，你內心深處已知道答案，只需靜下來傾聽",
    },
  },
  {
    name: { zh: "倒吊人", en: "The Hanged Man", tw: "倒吊人" },
    emoji: "🙃",
    msg: {
      zh: "换一个角度看问题，有时候停下来反思才是最大的进步",
      en: "Look at things from a new angle — sometimes pausing to reflect is the greatest progress",
      tw: "換一個角度看問題，有時候停下來反思才是最大的進步",
    },
  },
  {
    name: { zh: "战车", en: "The Chariot", tw: "戰車" },
    emoji: "🏆",
    msg: {
      zh: "保持意志力与专注，胜利属于坚持到底的人",
      en: "Hold on to willpower and focus — victory belongs to those who persevere",
      tw: "保持意志力與專注，勝利屬於堅持到底的人",
    },
  },
  {
    name: { zh: "隐士", en: "The Hermit", tw: "隱士" },
    emoji: "🧘",
    msg: {
      zh: "内省与独处是当下最好的礼物，答案就在你自己心中",
      en: "Introspection and solitude are the gift of this moment — the answer lies within you",
      tw: "內省與獨處是當下最好的禮物，答案就在你自己心中",
    },
  },
  {
    name: { zh: "审判", en: "Judgement", tw: "審判" },
    emoji: "🔔",
    msg: {
      zh: "是时候做出重要决定了，不要再逃避，觉醒的时刻到来",
      en: "It's time to make an important decision — stop avoiding it, the moment of awakening has come",
      tw: "是時候做出重要決定了，不要再逃避，覺醒的時刻到來",
    },
  },
  {
    name: { zh: "皇帝", en: "The Emperor", tw: "皇帝" },
    emoji: "👑",
    msg: {
      zh: "建立稳固的基础与秩序，你有能力掌控自己的命运",
      en: "Build a solid foundation and order — you have the power to command your own destiny",
      tw: "建立穩固的基礎與秩序，你有能力掌控自己的命運",
    },
  },
];

// 兜底回复池（AI 无响应时使用）—— 三语
const FALLBACK_REPLIES: Record<Lang, string[]> = {
  zh: [
    "宇宙的能量稍有涟漪，请稍后再试～ 🌙",
    "星盘正在对齐，请稍候片刻… ✨",
    "小云暂时感受不到信号，过一会儿再来倾诉吧 🔮",
    "天象有些波动，请稍后重试。你的问题我一定认真作答 💜",
    "灵感之光短暂隐没，请稍待片刻 🌟",
  ],
  en: [
    "The cosmic energy is rippling a little — please try again in a moment 🌙",
    "The star chart is realigning, just a moment… ✨",
    "Cloudy can't quite sense the signal right now — come share again in a little while 🔮",
    "The skies are a bit restless. Please try again — I promise to answer your question with care 💜",
    "The spark of inspiration has dimmed briefly — please wait just a moment 🌟",
  ],
  tw: [
    "宇宙的能量稍有漣漪，請稍後再試～ 🌙",
    "星盤正在對齊，請稍候片刻… ✨",
    "小雲暫時感受不到信號，過一會兒再來傾訴吧 🔮",
    "天象有些波動，請稍後重試。你的問題我一定認真作答 💜",
    "靈感之光短暫隱沒，請稍待片刻 🌟",
  ],
};

function getFallback(lang: Lang): string {
  const pool = FALLBACK_REPLIES[lang];
  return pool[Math.floor(Math.random() * pool.length)]!;
}

// 简单的伪随机种子
function seededRand(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  return () => {
    h = (Math.imul(h ^ (h >>> 16), 0x45d9f3b)) | 0;
    return ((h ^ (h >>> 16)) >>> 0) / 0xFFFFFFFF;
  };
}

function pickCard(content: string): TarotCardMini {
  const rand = seededRand(content + Date.now().toString());
  const idx = Math.floor(rand() * TAROT_CARDS_MINI.length);
  return TAROT_CARDS_MINI[idx]!;
}

// 仅记录使用量（不作限制）
function getTodayUsage(): number {
  if (typeof window === "undefined") return 0;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return 0;
  try {
    const { date, count } = JSON.parse(stored) as { date: string; count: number };
    if (date !== new Date().toDateString()) return 0;
    return count;
  } catch {
    return 0;
  }
}

function incrementUsage(): void {
  const current = getTodayUsage();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ date: new Date().toDateString(), count: current + 1 }),
  );
}

// 从历史消息中提取上下文信息
interface ConversationContext {
  prevCards: string[];       // 之前抽过的牌的「规范键」(zh 名)，用于去重 & 重新本地化显示
  topics: string[];          // 聊过的话题（规范键：感情/工作/财富/压力）
  roundCount: number;        // 对话轮次（用户发言次数）
  lastUserMsgs: string[];    // 最近几条用户消息
  lastAiMsg: string;         // 上一条 AI 消息
}

// 话题检测关键词（保留中文用于分类用户输入；同时含英文便于识别 en/tw 用户输入）
// 注意：这些只用于「分类」，不会原样输出到回复里。
const TOPIC_KEYWORDS: Record<string, string[]> = {
  感情: ["感情", "爱情", "恋爱", "暗恋", "分手", "前任", "喜欢", "love", "relationship", "crush", "breakup", "dating", "ex"],
  工作: ["工作", "职场", "职业", "事业", "跳槽", "老板", "升职", "裁员", "work", "job", "career", "boss", "promotion"],
  财富: ["钱", "财", "财富", "投资", "赚", "负债", "存款", "money", "wealth", "fortune", "invest", "debt", "saving"],
  压力: ["焦虑", "压力", "累", "睡", "身体", "抑郁", "迷茫", "anxious", "anxiety", "stress", "tired", "sleep", "exhaust", "depress", "lost"],
};

// 由任意语言的牌名/badge 文本反查规范键（zh 名）
function canonicalCardName(text: string): string | null {
  const stripped = text.replace(/^[^\s]+\s/, ""); // 去掉可能的 emoji 前缀
  for (const card of TAROT_CARDS_MINI) {
    if (
      stripped === card.name.zh || stripped === card.name.en || stripped === card.name.tw ||
      text.includes(card.name.zh) || text.includes(card.name.en) || text.includes(card.name.tw)
    ) {
      return card.name.zh;
    }
  }
  return null;
}

function extractContext(history: Message[]): ConversationContext {
  const prevCards: string[] = [];
  const topics: string[] = [];
  const lastUserMsgs: string[] = [];
  let lastAiMsg = "";
  let roundCount = 0;

  const detectTopics = (text: string) => {
    const lm = text.toLowerCase();
    for (const [topic, kws] of Object.entries(TOPIC_KEYWORDS)) {
      if (kws.some((k) => lm.includes(k.toLowerCase())) && !topics.includes(topic)) {
        topics.push(topic);
      }
    }
  };

  for (const msg of history) {
    if (msg.role === "ai") {
      if (msg.cardRef) {
        const canon = canonicalCardName(msg.cardRef);
        if (canon && !prevCards.includes(canon)) prevCards.push(canon);
      }
      lastAiMsg = msg.content;
      detectTopics(msg.content);
    } else {
      roundCount++;
      lastUserMsgs.push(msg.content);
      if (lastUserMsgs.length > 3) lastUserMsgs.shift();
      detectTopics(msg.content);
    }
  }

  return { prevCards, topics: [...new Set(topics)], roundCount, lastUserMsgs, lastAiMsg };
}

// 话题规范键 → 各语言显示名
const TOPIC_LABEL: Record<string, LangText> = {
  感情: { zh: "感情", en: "love", tw: "感情" },
  工作: { zh: "工作", en: "work", tw: "工作" },
  财富: { zh: "财富", en: "money", tw: "財富" },
  压力: { zh: "压力", en: "stress", tw: "壓力" },
};

// 情绪词检测（保留中/英文关键词用于分类用户输入）→ 规范情绪键
const MOOD_KEYWORDS: Record<string, string[]> = {
  喜悦: ["开心", "高兴", "快乐", "happy", "glad", "joy"],
  悲伤: ["难过", "伤心", "哭", "sad", "cry", "down"],
  愤怒: ["生气", "angry", "mad"],
  烦躁: ["烦", "烦躁", "annoy", "irritate"],
  恐惧: ["害怕", "afraid", "scared", "fear"],
  忧虑: ["担心", "担忧", "worry", "worried"],
  委屈: ["委屈", "wronged", "unfair"],
  迷茫: ["迷茫", "lost", "confused", "directionless"],
  纠结: ["纠结", "torn", "conflicted"],
};
// 情绪规范键 → 各语言显示名
const MOOD_LABEL: Record<string, LangText> = {
  喜悦: { zh: "喜悦", en: "joyful", tw: "喜悅" },
  悲伤: { zh: "悲伤", en: "sad", tw: "悲傷" },
  愤怒: { zh: "愤怒", en: "angry", tw: "憤怒" },
  烦躁: { zh: "烦躁", en: "restless", tw: "煩躁" },
  恐惧: { zh: "恐惧", en: "fearful", tw: "恐懼" },
  忧虑: { zh: "忧虑", en: "anxious", tw: "憂慮" },
  委屈: { zh: "委屈", en: "hurt", tw: "委屈" },
  迷茫: { zh: "迷茫", en: "lost", tw: "迷茫" },
  纠结: { zh: "纠结", en: "torn", tw: "糾結" },
  复杂: { zh: "复杂", en: "mixed", tw: "複雜" },
};

// AI 模拟回复（感知上下文，当前消息内容优先）—— lang 决定输出语言
function buildAIReply(userMsg: string, card: TarotCardMini, history: Message[], lang: Lang): string {
  const lowerMsg = userMsg.trim().toLowerCase();
  const ctx = extractContext(history);
  const { prevCards, topics, roundCount, lastAiMsg } = ctx;

  // 当前牌名 / 牌寓意（按当前语言取）
  const cardName = card.name[lang];
  const cardMsg = card.msg[lang];

  // ---- 辅助：上下文前缀（呼应 AI 上一个问题） ----
  function makePrefix(): string {
    const askedBefore = lastAiMsg.includes("？") || lastAiMsg.includes("?");
    if (askedBefore && roundCount > 1) {
      const echos: Record<Lang, string[]> = {
        zh: [
          "谢谢你告诉我这些。",
          "我明白了，这对你来说确实不容易。",
          "听到你说这些，我心里也有些感触。",
          "你能分享这些，真的很勇敢。",
          "我理解你的感受。",
        ],
        en: [
          "Thank you for telling me this.",
          "I see — this really isn't easy for you.",
          "Hearing you say this stirs something in me too.",
          "It's truly brave of you to share this.",
          "I understand how you feel.",
        ],
        tw: [
          "謝謝你告訴我這些。",
          "我明白了，這對你來說確實不容易。",
          "聽到你說這些，我心裡也有些感觸。",
          "你能分享這些，真的很勇敢。",
          "我理解你的感受。",
        ],
      };
      const pool = echos[lang];
      return pool[roundCount % pool.length]! + " ";
    }
    return "";
  }

  // ---- 辅助：当前消息是否明确提到某话题（跨语言关键词检测） ----
  const hasKw = (kws: string[]) => kws.some((k) => lowerMsg.includes(k.toLowerCase()));
  const mentionsLove = hasKw(TOPIC_KEYWORDS.感情!);
  const mentionsWork = hasKw(TOPIC_KEYWORDS.工作!);
  const mentionsMoney = hasKw(TOPIC_KEYWORDS.财富!);
  const mentionsStress = hasKw(TOPIC_KEYWORDS.压力!);

  // ---- 辅助：塔罗牌名扩展别名（中文常见变体） ----
  const CARD_ALIASES: Record<string, string> = {
    "愚者": "愚人", "愚人牌": "愚人", "愚者牌": "愚人",
    "恋人牌": "恋人", "太阳牌": "太阳", "星星牌": "星星",
    "月亮牌": "月亮", "力量牌": "力量", "命运": "命运之轮",
    "命运之轮牌": "命运之轮", "世界牌": "世界", "教皇牌": "教皇",
    "高女祭司牌": "高女祭司", "祭司牌": "高女祭司", "倒吊人牌": "倒吊人",
    "战车牌": "战车", "隐士牌": "隐士", "审判牌": "审判", "皇帝牌": "皇帝",
  };

  // ---- 辅助：当前消息是否是牌名（含别名 / 任一语言牌名） ----
  // 返回匹配到的牌（用于按当前语言显示），未匹配为 null
  const namedCard = (() => {
    const msg = userMsg.trim();
    const direct = TAROT_CARDS_MINI.find(
      (c) => msg.includes(c.name.zh) || msg.includes(c.name.tw) ||
             lowerMsg.includes(c.name.en.toLowerCase()),
    );
    if (direct) return direct;
    const alias = Object.keys(CARD_ALIASES).find((a) => msg.includes(a));
    if (alias) {
      const canon = CARD_ALIASES[alias]!;
      return TAROT_CARDS_MINI.find((c) => c.name.zh === canon) ?? null;
    }
    return null;
  })();
  const isCardName = namedCard !== null;

  // 情绪词检测：仅在非牌名消息时生效
  const detectedMood = isCardName
    ? undefined
    : Object.keys(MOOD_KEYWORDS).find((mood) => hasKw(MOOD_KEYWORDS[mood]!));
  const isShortAnswer = !isCardName && userMsg.trim().length <= 6;

  const prefix = makePrefix();
  // 历史话题（仅在当前消息匹配时作深化标记）
  const prevTopicKey = topics[0] ?? "";
  const prevTopic = prevTopicKey ? TOPIC_LABEL[prevTopicKey]?.[lang] ?? "" : "";
  // 上一张牌（按当前语言显示）
  const lastPrevCard = prevCards.length > 0
    ? (TAROT_CARDS_MINI.find((c) => c.name.zh === prevCards[prevCards.length - 1])?.name[lang]
        ?? prevCards[prevCards.length - 1]!)
    : "";
  // 全部历史牌（按当前语言显示）
  const allPrevCards = prevCards
    .map((zh) => TAROT_CARDS_MINI.find((c) => c.name.zh === zh)?.name[lang] ?? zh);

  // ===== 优先级 1：用户说的是塔罗牌名 =====
  if (isCardName && namedCard) {
    const namedName = namedCard.name[lang];
    const namedMsg = namedCard.msg[lang];
    if (lang === "en") {
      const contextNote = lastPrevCard
        ? `Last time we touched on "${lastPrevCard}". `
        : "";
      return `${prefix}${contextNote}You mentioned "${namedName}" ${namedCard.emoji} — the meaning of this card is: ${namedMsg}.\n\nToday the universe has drawn "${cardName}" for you too — ${cardMsg}.\n\nWith these two cards side by side, I sense an interesting echo. Right now, which card's feeling fits your state better?`;
    }
    if (lang === "tw") {
      const contextNote = lastPrevCard ? `上次我們聊到了「${lastPrevCard}」，` : "";
      return `${prefix}${contextNote}你提到了「${namedName}」${namedCard.emoji}，這張牌的寓意是：${namedMsg}。\n\n今天宇宙再為你抽了「${cardName}」——${cardMsg}。\n\n兩張牌放在一起，我感覺有些有趣的呼應。你現在的狀態，更像哪張牌描述的感受？`;
    }
    const contextNote = lastPrevCard ? `上次我们聊到了「${lastPrevCard}」，` : "";
    return `${prefix}${contextNote}你提到了「${namedName}」${namedCard.emoji}，这张牌的寓意是：${namedMsg}。\n\n今天宇宙再为你抽了「${cardName}」——${cardMsg}。\n\n两张牌放在一起，我感觉有些有趣的呼应。你现在的状态，更像哪张牌描述的感受？`;
  }

  // ===== 优先级 2：情绪词 / 短回答（直接响应当前内容） =====
  if (detectedMood || isShortAnswer) {
    const moodKey = detectedMood ?? "复杂";
    const moodLabel = MOOD_LABEL[moodKey]![lang];
    if (lang === "en") {
      const topicHint = prevTopic ? `, woven together with the ${prevTopic} we talked about` : "";
      return `${prefix}I can sense you're feeling a little ${moodLabel} right now${topicHint}.\n\nThe universe brings you "${cardName}": ${cardMsg}.\n\nWould you be willing to tell me a little more? What is it that's making you feel this way?`;
    }
    if (lang === "tw") {
      const topicHint = prevTopic ? `，結合我們聊到的${prevTopic}` : "";
      return `${prefix}我感受到你現在有些${moodLabel}${topicHint}。\n\n宇宙為你傳來「${cardName}」：${cardMsg}。\n\n你願意多說一點嗎？是什麼事讓你有這種感覺？`;
    }
    const topicHint = prevTopic ? `，结合我们聊到的${prevTopic}` : "";
    return `${prefix}我感受到你现在有些${moodLabel}${topicHint}。\n\n宇宙为你传来「${cardName}」：${cardMsg}。\n\n你愿意多说一点吗？是什么事让你有这种感觉？`;
  }

  // ===== 优先级 3：当前消息明确涉及某话题 =====
  if (mentionsLove) {
    const isDeepening = topics.includes("感情") && roundCount > 2;
    if (lang === "en") {
      if (isDeepening) {
        const cardNote = lastPrevCard
          ? `The "${lastPrevCard}" from before echoes with today's "${cardName}". `
          : `Today the universe sends you "${cardName}". `;
        return `${prefix}${cardNote}${cardMsg}.\n\nWe've been talking about matters of the heart for a while, so let me ask you directly — what's hardest for you to let go of: that person, or the feelings that experience left you with?`;
      }
      return `${prefix}My dear, I hear you. 💜 Matters of the heart always tug hardest at us.\n\nI've drawn a card for you — "${cardName}". ${cardMsg}.\n\nIn love, the most important thing is to love yourself first. Would you like to tell me what's troubling you right now?`;
    }
    if (lang === "tw") {
      if (isDeepening) {
        const cardNote = lastPrevCard ? `上次的「${lastPrevCard}」與今天的「${cardName}」遙相呼應。` : `今天宇宙為你送來「${cardName}」。`;
        return `${prefix}${cardNote}${cardMsg}。\n\n我們已經聊了一段感情的事了，我想直接問你——你心裡最難放下的，是那個人，還是那段經歷帶給你的感受？`;
      }
      return `${prefix}親愛的，我聽到你了。💜 感情的事總是最牽動心弦的。\n\n我為你抽了一張牌——「${cardName}」。${cardMsg}。\n\n在感情裡，最重要的是先愛自己。你願意說說，是什麼讓你現在有些煩惱嗎？`;
    }
    if (isDeepening) {
      const cardNote = lastPrevCard ? `上次的「${lastPrevCard}」与今天的「${cardName}」遥相呼应。` : `今天宇宙为你送来「${cardName}」。`;
      return `${prefix}${cardNote}${cardMsg}。\n\n我们已经聊了一段感情的事了，我想直接问你——你心里最难放下的，是那个人，还是那段经历带给你的感受？`;
    }
    return `${prefix}亲爱的，我听到你了。💜 感情的事总是最牵动心弦的。\n\n我为你抽了一张牌——「${cardName}」。${cardMsg}。\n\n在感情里，最重要的是先爱自己。你愿意说说，是什么让你现在有些烦恼吗？`;
  }

  if (mentionsWork) {
    const isDeepening = topics.includes("工作") && roundCount > 2;
    if (lang === "en") {
      if (isDeepening) {
        const cardNote = lastPrevCard
          ? `The energy of "${lastPrevCard}" layered with the message of "${cardName}" — `
          : `"${cardName}" appears now: `;
        return `${prefix}${cardNote}${cardMsg}.\n\nThe work situation you mentioned earlier makes me want to ask more — in this job, what drains your energy the most? Is it the relationships, or a lack of direction in the work itself?`;
      }
      return `${prefix}I completely understand the pressure at work. ✨ You've already been working so hard.\n\nThe universe brings you "${cardName}": ${cardMsg}.\n\nConfusion about work often points to something deeper — if reality placed no limits on you, what would you most want to do?`;
    }
    if (lang === "tw") {
      if (isDeepening) {
        const cardNote = lastPrevCard ? `「${lastPrevCard}」的能量與「${cardName}」的訊息疊加，` : `「${cardName}」此刻出現：`;
        return `${prefix}${cardNote}${cardMsg}。\n\n你之前提到的職場情況讓我想多問——在這份工作裡，最消耗你能量的是什麼？是人際關係，還是工作本身的方向感？`;
      }
      return `${prefix}職場的壓力我完全理解。✨ 你已經很努力了。\n\n宇宙為你傳來「${cardName}」：${cardMsg}。\n\n工作的困惑往往指向更深的問題——如果不考慮現實約束，你最想做的是什麼？`;
    }
    if (isDeepening) {
      const cardNote = lastPrevCard ? `「${lastPrevCard}」的能量与「${cardName}」的信息叠加，` : `「${cardName}」此刻出现：`;
      return `${prefix}${cardNote}${cardMsg}。\n\n你之前提到的职场情况让我想多问——在这份工作里，最消耗你能量的是什么？是人际关系，还是工作本身的方向感？`;
    }
    return `${prefix}职场的压力我完全理解。✨ 你已经很努力了。\n\n宇宙为你传来「${cardName}」：${cardMsg}。\n\n工作的困惑往往指向更深的问题——如果不考虑现实约束，你最想做的是什么？`;
  }

  if (mentionsMoney) {
    const isDeepening = topics.includes("财富") && roundCount > 2;
    if (lang === "en") {
      if (isDeepening) {
        return `${prefix}We've talked a bit about wealth already. 🌟\n\n"${cardName}" appears today: ${cardMsg}.\n\nLet me ask you — when you imagine "financial freedom", what's the very first thought that comes to mind? Security, freedom, or being able to help the people you love?`;
      }
      return `${prefix}Money energy is always flowing, and your worry is completely natural. 🌟\n\nThe message of "${cardName}": ${cardMsg}.\n\nWhen it comes to wealth, tarot speaks not just of numbers, but of your relationship with "abundance". Do you feel you're "worthy" of a good life?`;
    }
    if (lang === "tw") {
      if (isDeepening) {
        return `${prefix}關於財富的問題，我們已經聊了一些。🌟\n\n「${cardName}」今天出現：${cardMsg}。\n\n我想問你——當你想像「財富自由」的狀態，你第一個念頭是什麼？是安全感，是自由，還是能幫助家人？`;
      }
      return `${prefix}金錢能量是流動的，你的擔憂很正常。🌟\n\n「${cardName}」的訊息：${cardMsg}。\n\n關於財富，塔羅告訴我們的不僅是數字，更多是你與「豐盛」的關係。你覺得自己「配得上」好的生活嗎？`;
    }
    if (isDeepening) {
      return `${prefix}关于财富的问题，我们已经聊了一些。🌟\n\n「${cardName}」今天出现：${cardMsg}。\n\n我想问你——当你想象"财富自由"的状态，你第一个念头是什么？是安全感，是自由，还是能帮助家人？`;
    }
    return `${prefix}金钱能量是流动的，你的担忧很正常。🌟\n\n「${cardName}」的信息：${cardMsg}。\n\n关于财富，塔罗告诉我们的不仅是数字，更多是你与"丰盛"的关系。你觉得自己"配得上"好的生活吗？`;
  }

  if (mentionsStress) {
    const isDeepening = topics.includes("压力") && roundCount > 2;
    if (lang === "en") {
      if (isDeepening) {
        return `${prefix}Your body has been speaking up for you all along. 🌙\n\nThe message of "${cardName}": ${cardMsg}.\n\nLet me gently ask — was there even one small thing lately that made you feel a little lighter? However small, like a good cup of tea, or a quiet moment.`;
      }
      return `${prefix}I can feel the exhaustion inside you. 🌙 Take a deep breath first.\n\nThe universe sends "${cardName}": ${cardMsg}.\n\nThe body's signals are often the soul speaking. Is there something you haven't been able to put down lately?`;
    }
    if (lang === "tw") {
      if (isDeepening) {
        return `${prefix}你的身體一直在替你說話。🌙\n\n「${cardName}」的訊息：${cardMsg}。\n\n我想輕輕地問——最近有沒有哪怕一件讓你感到稍微輕鬆的小事？哪怕很小，比如一杯好喝的茶，或者某一刻的安靜。`;
      }
      return `${prefix}我感受到你內心的疲憊了。🌙 請先深呼吸一下。\n\n宇宙送來「${cardName}」：${cardMsg}。\n\n身體的信號往往是心靈在說話。最近有什麼事情一直放不下嗎？`;
    }
    if (isDeepening) {
      return `${prefix}你的身体一直在替你说话。🌙\n\n「${cardName}」的信息：${cardMsg}。\n\n我想轻轻地问——最近有没有哪怕一件让你感到稍微轻松的小事？哪怕很小，比如一杯好喝的茶，或者某一刻的安静。`;
    }
    return `${prefix}我感受到你内心的疲惫了。🌙 请先深呼吸一下。\n\n宇宙送来「${cardName}」：${cardMsg}。\n\n身体的信号往往是心灵在说话。最近有什么事情一直放不下吗？`;
  }

  // ===== 优先级 4：打招呼 =====
  if (lowerMsg.includes("你好") || lowerMsg.includes("嗨") || lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
    if (lang === "en") {
      return `Hi there, I'm Cloudy — your very own tarot companion. 🔮\n\nI'm good at listening and seeing clearly, and I'll use the tarot to help you read the energy of this moment.\n\nWhether it's love troubles, career confusion, or an anxiety you can't quite name, you can tell me. What would you like to talk about today?`;
    }
    if (lang === "tw") {
      return `你好呀，我是小雲——專屬於你的塔羅解憂師。🔮\n\n我擅長傾聽和洞察，也會用塔羅牌幫你看清當下的能量走向。\n\n不論是感情煩惱、職場迷茫還是說不清的焦慮，都可以告訴我。今天，你想聊什麼？`;
    }
    return `你好呀，我是小云——专属于你的塔罗解忧师。🔮\n\n我擅长倾听和洞察，也会用塔罗牌帮你看清当下的能量走向。\n\n不论是感情烦恼、职场迷茫还是说不清的焦虑，都可以告诉我。今天，你想聊什么？`;
  }

  // ===== 优先级 5：多轮通用——基于历史话题做总结收尾 =====
  if (roundCount > 3 && prevTopic) {
    if (lang === "en") {
      const cardNote = allPrevCards.length > 0 ? `We've touched on ${allPrevCards.map((c) => `"${c}"`).join(", ")}, and ` : "";
      return `${prefix}${cardNote}your reflections about ${prevTopic} have stayed with me. 💜\n\nToday I've drawn "${cardName}" for you again — ${cardMsg}.\n\nDo you feel even a little clearer now than when we first started talking? Sometimes simply speaking it out is a kind of healing.`;
    }
    if (lang === "tw") {
      const cardNote = allPrevCards.length > 0 ? `我們聊到了「${allPrevCards.join("」、「")}」，` : "";
      return `${prefix}${cardNote}你關於${prevTopic}的思考一直在我心裡。💜\n\n今天再為你抽了「${cardName}」——${cardMsg}。\n\n你現在感覺比最初聊的時候有沒有稍微清晰一點點？有時候傾訴本身就是一種療癒。`;
    }
    const cardNote = allPrevCards.length > 0 ? `我们聊到了「${allPrevCards.join("」、「")}」，` : "";
    return `${prefix}${cardNote}你关于${prevTopic}的思考一直在我心里。💜\n\n今天再为你抽了「${cardName}」——${cardMsg}。\n\n你现在感觉比最初聊的时候有没有稍微清晰一点点？有时候倾诉本身就是一种疗愈。`;
  }

  // ===== 兜底 =====
  if (lang === "en") {
    return `${prefix}Thank you for being willing to share what's on your heart. 💜\n\nI've drawn "${cardName}" for you — ${cardMsg}.\n\nWhat's troubling you most right now — what does it feel like? (for example: worry, feeling lost, hurt, hope…)`;
  }
  if (lang === "tw") {
    return `${prefix}謝謝你願意把心事告訴我。💜\n\n我為你抽了「${cardName}」——${cardMsg}。\n\n你現在最困擾的，是什麼感受？（比如：擔憂、迷茫、委屈、期待…）`;
  }
  return `${prefix}谢谢你愿意把心事告诉我。💜\n\n我为你抽了「${cardName}」——${cardMsg}。\n\n你现在最困扰的，是什么感受？（比如：担忧、迷茫、委屈、期待…）`;
}

function nowTime(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
}

export default function AIMysticPage() {
  const lang = useLocale() as Lang;
  const t = T[lang];

  const [messages, setMessages] = useState<Message[]>(() => [{
    id: "welcome",
    role: "ai",
    content: t.welcome,
    time: nowTime(),
  }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [cooldown, setCooldown] = useState(false); // 发送冷却保护
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cooldownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // 语言切换时，若仍处于初始欢迎语阶段（尚未开始对话），同步欢迎语文案
  useEffect(() => {
    setMessages((prev) =>
      prev.length === 1 && prev[0]?.id === "welcome"
        ? [{ ...prev[0], content: t.welcome }]
        : prev,
    );
  }, [t.welcome]);

  const handleSend = useCallback(async (msg?: string) => {
    const text = (msg ?? input).trim();
    if (!text || isTyping || cooldown) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      time: nowTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setCooldown(true);

    // 冷却计时器（防止发送按钮连点）
    cooldownTimer.current = setTimeout(() => setCooldown(false), COOLDOWN_MS);

    // 抽一张塔罗牌
    const card = pickCard(text);

    // 模拟 AI 思考延迟，带超时兜底
    const delay = 1200 + Math.random() * 1000;
    let reply: string;
    // 取快照（发送时的历史，不含刚加入的用户消息会在 state 更新后读取，直接用当前 messages）
    const historySnapshot = [...messages, { id: Date.now().toString(), role: "user" as const, content: text, time: nowTime() }];
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, delay));
      reply = buildAIReply(text, card, historySnapshot, lang);
    } catch {
      reply = getFallback(lang);
    }

    const localizedCardName = card.name[lang];
    const shouldShowCard = reply.includes(localizedCardName);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "ai",
      content: reply,
      cardRef: shouldShowCard ? `${card.emoji} ${localizedCardName}` : undefined,
      time: nowTime(),
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsTyping(false);
    incrementUsage();
  }, [input, isTyping, cooldown, lang]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  const isDisabled = isTyping || cooldown;

  return (
    <div className="mystic-page">
      {/* 返回首页 */}
      <a href="/" style={{
        position: "fixed", top: 16, left: 16, zIndex: 200,
        display: "flex", alignItems: "center", gap: 6,
        padding: "6px 14px", borderRadius: 20,
        background: "rgba(10,6,28,0.75)", backdropFilter: "blur(10px)",
        border: "1px solid rgba(201,168,76,0.25)",
        color: "rgba(201,168,76,0.85)", fontSize: "0.8rem",
        textDecoration: "none", letterSpacing: "0.06em",
        transition: "all 0.18s",
      }}>{t.back}</a>

      {/* 语言切换 */}
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 200 }}>
        <LangSwitcher />
      </div>

      {/* Hero */}
      <div className="mystic-hero">
        <div className="mystic-hero-bg" />
        <div className="mystic-hero-tag">{t.heroTag}</div>
        <h1 className="mystic-hero-title">
          <span className="mystic-crystal">🔮</span> {t.heroTitle}
        </h1>
        <p className="mystic-hero-sub">{t.heroSub}</p>
      </div>

      {/* 聊天消息 */}
      <div className="mystic-chat-area">
        {messages.map((msg) => (
          <div key={msg.id} className={`mystic-message ${msg.role}`}>
            <div className="mystic-avatar">
              {msg.role === "ai" ? "🔮" : "🙋"}
            </div>
            <div>
              <div className="mystic-bubble">
                {msg.content.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < msg.content.split("\n").length - 1 && <br />}
                  </span>
                ))}
                {msg.cardRef && (
                  <div>
                    <span className="mystic-card-ref">✦ {msg.cardRef} ✦</span>
                  </div>
                )}
              </div>
              <span className="mystic-bubble-time">{msg.time}</span>
            </div>
          </div>
        ))}

        {/* 正在输入指示 */}
        {isTyping && (
          <div className="mystic-message ai">
            <div className="mystic-avatar">🔮</div>
            <div className="mystic-bubble">
              <div className="mystic-typing">
                <div className="mystic-typing-dot" />
                <div className="mystic-typing-dot" />
                <div className="mystic-typing-dot" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* 快捷问题（仅在对话开始阶段显示） */}
      {messages.length <= 2 && (
        <div className="mystic-quick-questions">
          <div className="mystic-quick-label">{t.quickLabel}</div>
          <div className="mystic-quick-list">
            {t.quickQuestions.map((q) => (
              <button
                key={q}
                className="mystic-quick-btn"
                onClick={() => void handleSend(q)}
                disabled={isDisabled}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 输入区 */}
      <div className="mystic-input-area">
        <div className="mystic-input-wrap">
          <textarea
            ref={textareaRef}
            className="mystic-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isTyping ? t.inputThinking : t.inputPlaceholder}
            disabled={isDisabled}
            rows={1}
          />
          <button
            className="mystic-send-btn"
            onClick={() => void handleSend()}
            disabled={!input.trim() || isDisabled}
          >
            ✦
          </button>
        </div>
      </div>

      {/* 免责声明 */}
      <div className="mystic-disclaimer">
        {t.disclaimer}
      </div>
    </div>
  );
}
