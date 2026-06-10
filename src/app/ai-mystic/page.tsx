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

const TAROT_CARDS_MINI = [
  { name: "愚人", emoji: "🃏", msg: "新旅程正在开始，请勇敢踏出第一步，不必想太多" },
  { name: "恋人", emoji: "💕", msg: "心的选择比头脑的分析更重要，遵从你内心最真实的感受" },
  { name: "太阳", emoji: "☀️", msg: "阳光正在向你走来，乐观与喜悦是你最好的护身符" },
  { name: "星星", emoji: "⭐", msg: "希望之光从未熄灭，保持信念，宇宙正在为你铺路" },
  { name: "月亮", emoji: "🌙", msg: "潜意识在向你发送信号，冥想与梦境将告诉你答案" },
  { name: "力量", emoji: "🦁", msg: "你比自己以为的更强大，内在的勇气将帮你渡过难关" },
  { name: "命运之轮", emoji: "⚙️", msg: "转机即将来临，抓住时机，不要错过命运给你的礼物" },
  { name: "世界", emoji: "🌍", msg: "一个阶段圆满结束，新的世界正在向你敞开大门" },
  { name: "教皇", emoji: "🙏", msg: "寻求可靠的引导与智慧，传统中藏有你需要的答案" },
  { name: "高女祭司", emoji: "🔮", msg: "相信直觉，你内心深处已知道答案，只需静下来倾听" },
  { name: "倒吊人", emoji: "🙃", msg: "换一个角度看问题，有时候停下来反思才是最大的进步" },
  { name: "战车", emoji: "🏆", msg: "保持意志力与专注，胜利属于坚持到底的人" },
  { name: "隐士", emoji: "🧘", msg: "内省与独处是当下最好的礼物，答案就在你自己心中" },
  { name: "审判", emoji: "🔔", msg: "是时候做出重要决定了，不要再逃避，觉醒的时刻到来" },
  { name: "皇帝", emoji: "👑", msg: "建立稳固的基础与秩序，你有能力掌控自己的命运" },
];

// 兜底回复池（AI 无响应时使用）
const FALLBACK_REPLIES = [
  "宇宙的能量稍有涟漪，请稍后再试～ 🌙",
  "星盘正在对齐，请稍候片刻… ✨",
  "小云暂时感受不到信号，过一会儿再来倾诉吧 🔮",
  "天象有些波动，请稍后重试。你的问题我一定认真作答 💜",
  "灵感之光短暂隐没，请稍待片刻 🌟",
];

function getFallback(): string {
  return FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)]!;
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

function pickCard(content: string): typeof TAROT_CARDS_MINI[0] {
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
  prevCards: string[];       // 之前抽过的牌名
  topics: string[];          // 聊过的话题
  roundCount: number;        // 对话轮次（用户发言次数）
  lastUserMsgs: string[];    // 最近几条用户消息
  lastAiMsg: string;         // 上一条 AI 消息
}

function extractContext(history: Message[]): ConversationContext {
  const prevCards: string[] = [];
  const topics: string[] = [];
  const lastUserMsgs: string[] = [];
  let lastAiMsg = "";
  let roundCount = 0;

  for (const msg of history) {
    if (msg.role === "ai") {
      if (msg.cardRef) {
        // cardRef 格式: "emoji 牌名"，提取牌名
        const cardName = msg.cardRef.replace(/^[^\s]+\s/, "");
        if (!prevCards.includes(cardName)) prevCards.push(cardName);
      }
      lastAiMsg = msg.content;
      // 检测话题
      if (msg.content.includes("感情") || msg.content.includes("爱情")) topics.push("感情");
      if (msg.content.includes("工作") || msg.content.includes("职场")) topics.push("工作");
      if (msg.content.includes("钱") || msg.content.includes("财富")) topics.push("财富");
      if (msg.content.includes("焦虑") || msg.content.includes("压力") || msg.content.includes("睡")) topics.push("压力");
    } else {
      roundCount++;
      lastUserMsgs.push(msg.content);
      if (lastUserMsgs.length > 3) lastUserMsgs.shift();
      // 从用户消息也提取话题
      const lm = msg.content.toLowerCase();
      if ((lm.includes("感情") || lm.includes("爱情") || lm.includes("恋爱")) && !topics.includes("感情")) topics.push("感情");
      if ((lm.includes("工作") || lm.includes("事业") || lm.includes("跳槽")) && !topics.includes("工作")) topics.push("工作");
      if ((lm.includes("钱") || lm.includes("财")) && !topics.includes("财富")) topics.push("财富");
      if ((lm.includes("焦虑") || lm.includes("压力") || lm.includes("累") || lm.includes("睡")) && !topics.includes("压力")) topics.push("压力");
    }
  }

  return { prevCards, topics: [...new Set(topics)], roundCount, lastUserMsgs, lastAiMsg };
}

// AI 模拟回复（感知上下文，当前消息内容优先）
function buildAIReply(userMsg: string, card: typeof TAROT_CARDS_MINI[0], history: Message[]): string {
  const lowerMsg = userMsg.trim().toLowerCase();
  const ctx = extractContext(history);
  const { prevCards, topics, roundCount, lastAiMsg } = ctx;

  // ---- 辅助：上下文前缀（呼应 AI 上一个问题） ----
  function makePrefix(): string {
    if (lastAiMsg.includes("？") && roundCount > 1) {
      const echos = [
        "谢谢你告诉我这些。",
        "我明白了，这对你来说确实不容易。",
        "听到你说这些，我心里也有些感触。",
        "你能分享这些，真的很勇敢。",
        "我理解你的感受。",
      ];
      return echos[roundCount % echos.length]! + " ";
    }
    return "";
  }

  // ---- 辅助：是否在当前消息中明确提到某话题 ----
  const mentionsLove = lowerMsg.includes("感情") || lowerMsg.includes("爱情") || lowerMsg.includes("恋爱") || lowerMsg.includes("暗恋") || lowerMsg.includes("分手") || lowerMsg.includes("前任") || lowerMsg.includes("喜欢");
  const mentionsWork = lowerMsg.includes("工作") || lowerMsg.includes("职业") || lowerMsg.includes("跳槽") || lowerMsg.includes("事业") || lowerMsg.includes("老板") || lowerMsg.includes("升职") || lowerMsg.includes("裁员");
  const mentionsMoney = lowerMsg.includes("钱") || lowerMsg.includes("财") || lowerMsg.includes("投资") || lowerMsg.includes("赚") || lowerMsg.includes("负债") || lowerMsg.includes("存款");
  const mentionsStress = lowerMsg.includes("睡") || lowerMsg.includes("焦虑") || lowerMsg.includes("压力") || lowerMsg.includes("累") || lowerMsg.includes("身体") || lowerMsg.includes("抑郁") || lowerMsg.includes("迷茫");

  // ---- 辅助：塔罗牌名扩展别名（包含常见变体，如加"牌"字、别称等） ----
  const CARD_ALIASES: Record<string, string> = {
    "愚者": "愚人", "愚人牌": "愚人", "愚者牌": "愚人",
    "恋人牌": "恋人", "太阳牌": "太阳", "星星牌": "星星",
    "月亮牌": "月亮", "力量牌": "力量", "命运": "命运之轮",
    "命运之轮牌": "命运之轮", "世界牌": "世界", "教皇牌": "教皇",
    "高女祭司牌": "高女祭司", "祭司牌": "高女祭司", "倒吊人牌": "倒吊人",
    "战车牌": "战车", "隐士牌": "隐士", "审判牌": "审判", "皇帝牌": "皇帝",
  };

  // ---- 辅助：判断当前消息是否是"短回答" / 情绪词 / 塔罗牌名 ----
  // 先检测牌名（含别名），避免被情绪词误判
  const matchedCardName = (() => {
    const msg = userMsg.trim();
    // 直接匹配原始牌名
    const direct = TAROT_CARDS_MINI.find(c => msg.includes(c.name));
    if (direct) return direct.name;
    // 匹配别名
    const alias = Object.keys(CARD_ALIASES).find(a => msg.includes(a));
    if (alias) return CARD_ALIASES[alias]!;
    return null;
  })();
  const isCardName = matchedCardName !== null;

  const moodWords: Record<string, string> = {
    "开心": "喜悦", "高兴": "喜悦", "快乐": "喜悦",
    "难过": "悲伤", "伤心": "悲伤", "哭": "悲伤",
    "生气": "愤怒", "烦": "烦躁", "烦躁": "烦躁",
    "害怕": "恐惧", "担心": "忧虑", "担忧": "忧虑",
    "委屈": "委屈", "迷茫": "迷茫", "纠结": "纠结",
  };
  // 情绪词检测：仅在非牌名消息时生效
  const detectedMood = isCardName ? undefined : Object.keys(moodWords).find(k => lowerMsg.includes(k));
  const isShortAnswer = !isCardName && userMsg.trim().length <= 6;

  const prefix = makePrefix();
  // 历史话题（仅在当前消息匹配时作深化标记，不单独触发）
  const prevTopic = topics[0] ?? "";

  // ===== 优先级 1：用户说的是塔罗牌名 =====
  if (isCardName && matchedCardName) {
    const namedCard = TAROT_CARDS_MINI.find(c => c.name === matchedCardName) ?? TAROT_CARDS_MINI.find(c => userMsg.includes(c.name));
    if (namedCard) {
      const contextNote = prevCards.length > 0
        ? `上次我们聊到了「${prevCards[prevCards.length - 1]}」，`
        : "";
      return `${prefix}${contextNote}你提到了「${namedCard.name}」${namedCard.emoji}，这张牌的寓意是：${namedCard.msg}。\n\n今天宇宙再为你抽了「${card.name}」——${card.msg}。\n\n两张牌放在一起，我感觉有些有趣的呼应。你现在的状态，更像哪张牌描述的感受？`;
    }
  }

  // ===== 优先级 2：情绪词 / 短回答（直接响应当前内容） =====
  if (detectedMood || isShortAnswer) {
    const mood = detectedMood ? moodWords[detectedMood]! : "复杂";
    const topicHint = prevTopic ? `，结合我们聊到的${prevTopic}` : "";
    return `${prefix}我感受到你现在有些${mood}${topicHint}。\n\n宇宙为你传来「${card.name}」：${card.msg}。\n\n你愿意多说一点吗？是什么事让你有这种感觉？`;
  }

  // ===== 优先级 3：当前消息明确涉及某话题 =====
  if (mentionsLove) {
    const isDeepening = topics.includes("感情") && roundCount > 2;
    if (isDeepening) {
      const cardNote = prevCards.length > 0 ? `上次的「${prevCards[prevCards.length - 1]}」与今天的「${card.name}」遥相呼应。` : `今天宇宙为你送来「${card.name}」。`;
      return `${prefix}${cardNote}${card.msg}。\n\n我们已经聊了一段感情的事了，我想直接问你——你心里最难放下的，是那个人，还是那段经历带给你的感受？`;
    }
    return `${prefix}亲爱的，我听到你了。💜 感情的事总是最牵动心弦的。\n\n我为你抽了一张牌——「${card.name}」。${card.msg}。\n\n在感情里，最重要的是先爱自己。你愿意说说，是什么让你现在有些烦恼吗？`;
  }

  if (mentionsWork) {
    const isDeepening = topics.includes("工作") && roundCount > 2;
    if (isDeepening) {
      const cardNote = prevCards.length > 0 ? `「${prevCards[prevCards.length - 1]}」的能量与「${card.name}」的信息叠加，` : `「${card.name}」此刻出现：`;
      return `${prefix}${cardNote}${card.msg}。\n\n你之前提到的职场情况让我想多问——在这份工作里，最消耗你能量的是什么？是人际关系，还是工作本身的方向感？`;
    }
    return `${prefix}职场的压力我完全理解。✨ 你已经很努力了。\n\n宇宙为你传来「${card.name}」：${card.msg}。\n\n工作的困惑往往指向更深的问题——如果不考虑现实约束，你最想做的是什么？`;
  }

  if (mentionsMoney) {
    const isDeepening = topics.includes("财富") && roundCount > 2;
    if (isDeepening) {
      return `${prefix}关于财富的问题，我们已经聊了一些。🌟\n\n「${card.name}」今天出现：${card.msg}。\n\n我想问你——当你想象"财富自由"的状态，你第一个念头是什么？是安全感，是自由，还是能帮助家人？`;
    }
    return `${prefix}金钱能量是流动的，你的担忧很正常。🌟\n\n「${card.name}」的信息：${card.msg}。\n\n关于财富，塔罗告诉我们的不仅是数字，更多是你与"丰盛"的关系。你觉得自己"配得上"好的生活吗？`;
  }

  if (mentionsStress) {
    const isDeepening = topics.includes("压力") && roundCount > 2;
    if (isDeepening) {
      return `${prefix}你的身体一直在替你说话。🌙\n\n「${card.name}」的信息：${card.msg}。\n\n我想轻轻地问——最近有没有哪怕一件让你感到稍微轻松的小事？哪怕很小，比如一杯好喝的茶，或者某一刻的安静。`;
    }
    return `${prefix}我感受到你内心的疲惫了。🌙 请先深呼吸一下。\n\n宇宙送来「${card.name}」：${card.msg}。\n\n身体的信号往往是心灵在说话。最近有什么事情一直放不下吗？`;
  }

  // ===== 优先级 4：打招呼 =====
  if (lowerMsg.includes("你好") || lowerMsg.includes("嗨") || lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
    return `你好呀，我是小云——专属于你的塔罗解忧师。🔮\n\n我擅长倾听和洞察，也会用塔罗牌帮你看清当下的能量走向。\n\n不论是感情烦恼、职场迷茫还是说不清的焦虑，都可以告诉我。今天，你想聊什么？`;
  }

  // ===== 优先级 5：多轮通用——基于历史话题做总结收尾 =====
  if (roundCount > 3 && prevTopic) {
    const cardNote = prevCards.length > 0 ? `我们聊到了「${prevCards.join("」、「")}」，` : "";
    return `${prefix}${cardNote}你关于${prevTopic}的思考一直在我心里。💜\n\n今天再为你抽了「${card.name}」——${card.msg}。\n\n你现在感觉比最初聊的时候有没有稍微清晰一点点？有时候倾诉本身就是一种疗愈。`;
  }

  // ===== 兜底 =====
  return `${prefix}谢谢你愿意把心事告诉我。💜\n\n我为你抽了「${card.name}」——${card.msg}。\n\n你现在最困扰的，是什么感受？（比如：担忧、迷茫、委屈、期待…）`;
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
      reply = buildAIReply(text, card, historySnapshot);
    } catch {
      reply = getFallback();
    }

    const shouldShowCard = reply.includes(card.name);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "ai",
      content: reply,
      cardRef: shouldShowCard ? `${card.emoji} ${card.name}` : undefined,
      time: nowTime(),
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsTyping(false);
    incrementUsage();
  }, [input, isTyping, cooldown]);

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
