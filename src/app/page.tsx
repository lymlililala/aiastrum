"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { DOMAINS, SPREADS } from "./tarot-data";
import { DrawingPhase } from "./components/DrawingPhase";
import { ResultPhase } from "./components/ResultPhase";
import { HistoryPanel } from "./components/HistoryPanel";
import { useReadingHistory, useDailyLimit } from "./hooks";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "./components/LangSwitcher";
import type { TarotCard } from "./tarot-data";

type Phase = "home" | "tarot-landing" | "select-domain" | "select-spread" | "drawing" | "result";

export interface ReadingState {
  domain: string;
  spreadType: "single" | "three";
  cards: Array<{ card: TarotCard; reversed: boolean }>;
  reading: string;
}

export default function HomePage() {
  const lang = useLocale();
  const [phase, setPhase] = useState<Phase>("home");
  const [readingState, setReadingState] = useState<ReadingState | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [selectedSpread, setSelectedSpread] = useState<"single" | "three">("single");
  const [showHistory, setShowHistory] = useState(false);

  const { history, saveReading } = useReadingHistory();
  const { recordUsage } = useDailyLimit();

  const handleSelectDomain = useCallback((domainId: string) => {
    setSelectedDomain(domainId);
    setPhase("select-spread");
  }, []);

  const handleSelectSpread = useCallback(
    (spreadId: "single" | "three") => {
      setSelectedSpread(spreadId);
      setPhase("drawing");
    },
    [],
  );

  const handleReadingComplete = useCallback(
    (result: ReadingState) => {
      setReadingState(result);
      recordUsage(result.spreadType);
      saveReading({
        date: new Date().toLocaleDateString(lang === "en" ? "en-US" : lang === "tw" ? "zh-TW" : "zh-CN"),
        spreadType: result.spreadType,
        domain: result.domain,
        cards: result.cards,
        reading: result.reading,
      });
      setPhase("result");
    },
    [recordUsage, saveReading],
  );

  const handleRestart = useCallback(() => {
    setPhase("home");
    setReadingState(null);
    setSelectedDomain("");
  }, []);

  if (phase === "home") {
    return <ModuleSelectPage />;
  }

  return (
    <main className="relative min-h-screen" style={{ zIndex: 1 }}>
      {showHistory && (
        <HistoryPanel history={history} lang={lang} onClose={() => setShowHistory(false)} />
      )}

      {phase !== "drawing" && (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            {/* 返回首页 */}
            <a
              href="/"
              className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
              style={{
                padding: "5px 12px", borderRadius: 20,
                background: "rgba(10,6,28,0.6)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(201,168,76,0.2)",
                color: "rgba(201,168,76,0.85)", fontSize: "0.8rem",
                textDecoration: "none", letterSpacing: "0.06em",
              }}
            >← 返回</a>
            {/* 品牌 logo — 点击回塔罗 landing */}
            <button
              onClick={() => setPhase("tarot-landing")}
              className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity hidden sm:flex"
            >
              <span className="text-xl">🌙</span>
              <span className="font-cinzel text-gold text-sm tracking-wider">TAROT ORACLE</span>
            </button>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="glass-card px-3 py-1.5 rounded-full text-gold-light text-sm hover:border-gold transition-all"
          >
            📜 占卜记录
          </button>
        </nav>
      )}

      {phase === "tarot-landing" && <TarotLandingPage onStart={() => setPhase("select-domain")} />}
      {phase === "select-domain" && <DomainSelectPage onSelect={handleSelectDomain} />}
      {phase === "select-spread" && (
        <SpreadSelectPage
          domain={selectedDomain}
          onSelect={handleSelectSpread}
          onBack={() => setPhase("select-domain")}
        />
      )}
      {phase === "drawing" && (
        <DrawingPhase domain={selectedDomain} spreadType={selectedSpread} lang={lang} onComplete={handleReadingComplete} />
      )}
      {phase === "result" && readingState && (
        <ResultPhase readingState={readingState} lang={lang} onRestart={handleRestart} onNewReading={() => setPhase("select-domain")} />
      )}
    </main>
  );
}

// ───────────────────────────────────────────
// i18n 文案（需在 MODULES 类型定义之前）
// ───────────────────────────────────────────

// 繁体中文文案（tw）
const TW = {
  heroSub:        "你的每日宇宙指南",
  heroTitle:      "命運密語",
  heroDesc:       "古老智慧與現代 AI 的交融，探索屬於你的命運密碼",
  heroCard1Label: "每日一籤",
  heroCard2Label: "AI 解憂館",
  heroCard3Label: "每日開運",
  tabAll:         "全部",
  tabWestern:     "西方神秘",
  tabEastern:     "東方智慧",
  tabLifestyle:   "趣味生活",
  sectionFeatured:"精選推薦",
  sectionMore:    "更多功能",
  tarotTitle:        "塔羅占卜",
  tarotDesc:         "抽取塔羅牌，AI 解讀過去、現在與未來的隱秘低語",
  astroTitle:        "星盤解析",
  astroDesc:         "精準計算太陽、月亮、上升點，繪製專屬星盤，解讀命運密碼",
  mbtiTitle:         "MBTI 星球碰撞",
  mbtiDesc:          "MBTI × 星座，生成專屬梗文化人格檔案，極具傳播屬性",
  horoscopeTitle:    "星座運勢",
  horoscopeDesc:     "十二星座每日/週/月運勢，五維指數全方位解析",
  runeTitle:         "盧恩符文",
  runeDesc:          "古老北歐符文占卜，單石奧丁之眼或三石諾倫女神",
  numerologyTitle:   "生命靈數",
  numerologyDesc:    "輸入生日計算專屬靈數（1-9、11、22、33），解析性格天賦",
  namingTitle:       "墨韻起名",
  namingDesc:        "生辰八字推算喜用神，結合詩詞典籍甄選吉名",
  loveTitle:         "姻緣占卜",
  loveDesc:          "星盤×命理三維解析，揭秘命中正緣特徵與相遇時機",
  faceTitle:         "賽博算命",
  faceDesc:          "AI 神經網路掃描面相·手相，解碼隱藏天賦與命運密碼",
  baziTitle:         "生辰八字",
  baziDesc:          "天干地支排盤，揭示命格與流年運勢",
  ziweiTitle:        "紫微斗數",
  ziweiDesc:         "東方占星術之王，十四主星排布十二宮，四化飛星揭秘人生軌跡",
  meihuaTitle:       "梅花心易",
  meihuaDesc:        "北宋邵雍傳世之法，觀物取象，體用生剋斷吉凶",
  qimenTitle:        "奇門遁甲",
  qimenDesc:         "真太陽時校準，九宮格專業排盤，商業與出行吉凶精準提示",
  dreamTitle:        "周公解夢",
  dreamDesc:         "傳統周公解夢 × 榮格心理學，雙軌解析夢境與潛意識",
  almanacTitle:      "老黃曆",
  almanacDesc:       "每日宜忌一目了然，定製擇吉日，結婚搬家開業出行",
  lingqianTitle:     "雲端靈籤",
  lingqianDesc:      "觀音·黃大仙虔誠求籤，擲筊確認，白話解析四維運勢",
  wugeTitle:         "姓名五格",
  wugeDesc:          "康熙字典筆劃，五格剖象，81數理解析姓名與命運",
  dailyFortuneTitle: "每日開運指南",
  dailyFortuneDesc:  "基於生辰五行，每日生成專屬幸運色、數字、方位與穿搭建議",
  petTitle:          "寵物靈語",
  petDesc:           "上傳寵物照片+名字，結合塔羅單牌，解讀毛孩子今天的內心世界",
  aiMysticTitle:     "AI 解憂館",
  aiMysticDesc:      "向AI塔羅師傾訴煩惱，獲得溫柔共情與塔羅指引",
  synastryTitle:     "星盤合盤",
  synastryDesc:      "輸入雙方生日，分析跨盤行星相位，計算愛情/友情契合度",
  dailyCardTitle:    "每日宇宙提示卡",
  dailyCardFullDesc: "每日一籤盲盒，精美卡背翻轉動畫，直擊心靈的宇宙提示",
};

const ZH = {
  heroSub:        "你的每日宇宙指南",
  heroTitle:      "命运密语",
  heroDesc:       "古老智慧与现代 AI 的交融，探索属于你的命运密码",
  heroCard1Label: "每日一签",
  heroCard2Label: "AI 解忧馆",
  heroCard3Label: "每日开运",
  tabAll:         "全部",
  tabWestern:     "西方神秘",
  tabEastern:     "东方智慧",
  tabLifestyle:   "趣味生活",
  sectionFeatured:"精选推荐",
  sectionMore:    "更多功能",
  tarotTitle:        "塔罗占卜",
  tarotDesc:         "抽取塔罗牌，AI 解读过去、现在与未来的隐秘低语",
  astroTitle:        "星盘解析",
  astroDesc:         "精准计算太阳、月亮、上升点，绘制专属星盘，解读命运密码",
  mbtiTitle:         "MBTI 星球碰撞",
  mbtiDesc:          "MBTI × 星座，生成专属梗文化人格档案，极具传播属性",
  horoscopeTitle:    "星座运势",
  horoscopeDesc:     "十二星座每日/周/月运势，五维指数全方位解析",
  runeTitle:         "卢恩符文",
  runeDesc:          "古老北欧符文占卜，单石奥丁之眼或三石诺伦女神",
  numerologyTitle:   "生命灵数",
  numerologyDesc:    "输入生日计算专属灵数（1-9、11、22、33），解析性格天赋",
  namingTitle:       "墨韵起名",
  namingDesc:        "生辰八字推算喜用神，结合诗词典籍甄选吉名",
  loveTitle:         "姻缘占卜",
  loveDesc:          "星盘×命理三维解析，揭秘命中正缘特征与相遇时机",
  faceTitle:         "赛博算命",
  faceDesc:          "AI 神经网络扫描面相·手相，解码隐藏天赋与命运密码",
  baziTitle:         "生辰八字",
  baziDesc:          "天干地支排盘，揭示命格与流年运势",
  ziweiTitle:        "紫微斗数",
  ziweiDesc:         "东方占星术之王，十四主星排布十二宫，四化飞星揭秘人生轨迹",
  meihuaTitle:       "梅花心易",
  meihuaDesc:        "北宋邵雍传世之法，观物取象，体用生克断吉凶",
  qimenTitle:        "奇门遁甲",
  qimenDesc:         "真太阳时校准，九宫格专业排盘，商业与出行吉凶精准提示",
  dreamTitle:        "周公解梦",
  dreamDesc:         "传统周公解梦 × 荣格心理学，双轨解析梦境与潜意识",
  almanacTitle:      "老黄历",
  almanacDesc:       "每日宜忌一目了然，定制择吉日，结婚搬家开业出行",
  lingqianTitle:     "云端灵签",
  lingqianDesc:      "观音·黄大仙虔诚求签，掷筊确认，白话解析四维运势",
  wugeTitle:         "姓名五格",
  wugeDesc:          "康熙字典笔画，五格剖象，81数理解析姓名与命运",
  dailyFortuneTitle: "每日开运指南",
  dailyFortuneDesc:  "基于生辰五行，每日生成专属幸运色、数字、方位与穿搭建议",
  petTitle:          "宠物灵语",
  petDesc:           "上传宠物照片+名字，结合塔罗单牌，解读毛孩子今天的内心世界",
  aiMysticTitle:     "AI 解忧馆",
  aiMysticDesc:      "向AI塔罗师倾诉烦恼，获得温柔共情与塔罗指引",
  synastryTitle:     "星盘合盘",
  synastryDesc:      "输入双方生日，分析跨盘行星相位，计算爱情/友情契合度",
  dailyCardTitle:    "每日宇宙提示卡",
  dailyCardFullDesc: "每日一签盲盒，精美卡背翻转动画，直击心灵的宇宙提示",
};

const EN = {
  heroSub:        "Your Daily Cosmic Guide",
  heroTitle:      "AiAstrum",
  heroDesc:       "Ancient wisdom meets modern AI — explore your destiny code",
  heroCard1Label: "Daily Card",
  heroCard2Label: "AI Mystic",
  heroCard3Label: "Daily Fortune",
  tabAll:         "All",
  tabWestern:     "Western",
  tabEastern:     "Eastern",
  tabLifestyle:   "Lifestyle",
  sectionFeatured:"Featured",
  sectionMore:    "More Tools",
  tarotTitle:        "Tarot Reading",
  tarotDesc:         "Draw tarot cards — AI interprets past, present & future whispers",
  astroTitle:        "Birth Chart",
  astroDesc:         "Discover your Sun, Moon & Rising — decode personality & destiny",
  mbtiTitle:         "MBTI × Zodiac",
  mbtiDesc:          "Combine MBTI & zodiac for a viral personality report",
  horoscopeTitle:    "Horoscope",
  horoscopeDesc:     "Daily / weekly / monthly for all 12 signs with 5-dimension analysis",
  runeTitle:         "Rune Oracle",
  runeDesc:          "Ancient Nordic runes — single-stone or 3-stone Norns spread",
  numerologyTitle:   "Numerology",
  numerologyDesc:    "Calculate your Life Path number (1-9, 11, 22, 33) — reveal hidden talents",
  namingTitle:       "Name Oracle",
  namingDesc:        "Chinese name analysis using Five Elements & classic poetry",
  loveTitle:         "Love Oracle",
  loveDesc:          "Astrology × destiny — decode soulmate traits & meeting timing",
  faceTitle:         "Cyber Fortune",
  faceDesc:          "AI scans face & palm lines to decode hidden talents & destiny",
  baziTitle:         "Bazi Destiny Code",
  baziDesc:          "Read your life map written in the stars — Four Pillars of Destiny",
  ziweiTitle:        "Emperor's Star Chart",
  ziweiDesc:         "King of Eastern Astrology — 14 stars, 12 houses, life trajectory",
  meihuaTitle:       "I Ching Oracle",
  meihuaDesc:        "Ancient coins guidance — body/use interaction divination",
  qimenTitle:        "Cosmic Strategy",
  qimenDesc:         "Nine-palace grid with true solar time — precise auspicious timing",
  dreamTitle:        "Dream Decoder",
  dreamDesc:         "Eastern wisdom × Jungian psychology — decode your subconscious",
  almanacTitle:      "Feng Shui Calendar",
  almanacDesc:       "Daily auspicious & inauspicious activities — find your perfect timing",
  lingqianTitle:     "Divine Oracle",
  lingqianDesc:      "Temple fortune sticks — Guanyin & Wong Tai Sin guidance",
  wugeTitle:         "Name Numerology",
  wugeDesc:          "Chinese name stroke analysis using 81 number theory",
  dailyFortuneTitle: "Daily Fortune Guide",
  dailyFortuneDesc:  "Birth elements → today's lucky color, number, direction & style tips",
  petTitle:          "Pet Psychic",
  petDesc:           "Upload your pet's photo + name — tarot reveals what your furball thinks",
  aiMysticTitle:     "AI Mystic",
  aiMysticDesc:      "Chat with the AI oracle — empathetic tarot guidance & cosmic insights",
  synastryTitle:     "Love Compatibility",
  synastryDesc:      "Enter both birthdays — planetary aspects & compatibility score",
  dailyCardTitle:    "Daily Cosmic Card",
  dailyCardFullDesc: "Daily blind-box flip animation — a soul-touching message from the universe",
};

// ───────────────────────────────────────────
// 模块数据
// ───────────────────────────────────────────
type ModuleItem = {
  icon: string;
  href: string;
  titleKey: keyof typeof ZH;
  descKey: keyof typeof ZH;
  accentColor: string;
  bgColor: string;
  badge?: string;
  category: "western" | "eastern" | "lifestyle";
  featured?: boolean;
};

// 统一玻璃态底色（Glassmorphism）— 颜色只通过图标光晕体现
const GLASS_BG = "rgba(255,255,255,0.04)";

const MODULES: ModuleItem[] = [
  // 西方神秘学
  { icon: "🔮", href: "/tarot",        titleKey: "tarotTitle",       descKey: "tarotDesc",         accentColor: "#c9a84c", bgColor: GLASS_BG, category: "western",   featured: true },
  { icon: "🧩", href: "/mbti",         titleKey: "mbtiTitle",        descKey: "mbtiDesc",          accentColor: "#A78BFA", bgColor: GLASS_BG, badge: "🔥", category: "western",   featured: true },
  { icon: "✦",  href: "/astro",        titleKey: "astroTitle",       descKey: "astroDesc",         accentColor: "#6495ED", bgColor: GLASS_BG, category: "western" },
  { icon: "🌌", href: "/horoscope",    titleKey: "horoscopeTitle",   descKey: "horoscopeDesc",     accentColor: "#FF9800", bgColor: GLASS_BG, category: "western" },
  { icon: "ᚠ",  href: "/rune",         titleKey: "runeTitle",        descKey: "runeDesc",          accentColor: "#4a9eca", bgColor: GLASS_BG, category: "western" },
  { icon: "🔯", href: "/numerology",   titleKey: "numerologyTitle",  descKey: "numerologyDesc",    accentColor: "#7C3AED", bgColor: GLASS_BG, category: "western" },
  { icon: "💫", href: "/synastry",     titleKey: "synastryTitle",    descKey: "synastryDesc",      accentColor: "#E91E8C", bgColor: GLASS_BG, category: "western" },
  { icon: "👁", href: "/face-reading", titleKey: "faceTitle",        descKey: "faceDesc",          accentColor: "#00F5FF", bgColor: GLASS_BG, badge: "HOT", category: "western" },
  // 东方智慧
  { icon: "☯",  href: "/bazi",         titleKey: "baziTitle",        descKey: "baziDesc",          accentColor: "#d4832a", bgColor: GLASS_BG, category: "eastern",   featured: true },
  { icon: "紫", href: "/ziwei",        titleKey: "ziweiTitle",       descKey: "ziweiDesc",         accentColor: "#C77DFF", bgColor: GLASS_BG, category: "eastern",   featured: true },
  { icon: "🌸", href: "/meihua",       titleKey: "meihuaTitle",      descKey: "meihuaDesc",        accentColor: "#C04851", bgColor: GLASS_BG, category: "eastern" },
  { icon: "奇", href: "/qimen",        titleKey: "qimenTitle",       descKey: "qimenDesc",         accentColor: "#C9A84C", bgColor: GLASS_BG, category: "eastern" },
  { icon: "💭", href: "/dream",        titleKey: "dreamTitle",       descKey: "dreamDesc",         accentColor: "#9b59ff", bgColor: GLASS_BG, category: "eastern" },
  { icon: "⏰", href: "/almanac",      titleKey: "almanacTitle",     descKey: "almanacDesc",       accentColor: "#C0392B", bgColor: GLASS_BG, category: "eastern" },
  { icon: "🪬", href: "/lingqian",     titleKey: "lingqianTitle",    descKey: "lingqianDesc",      accentColor: "#8B5CF6", bgColor: GLASS_BG, category: "eastern" },
  { icon: "🖌", href: "/naming",       titleKey: "namingTitle",      descKey: "namingDesc",        accentColor: "#c9a84c", bgColor: GLASS_BG, category: "eastern" },
  { icon: "𝕎", href: "/wuge",         titleKey: "wugeTitle",        descKey: "wugeDesc",          accentColor: "#5a9a5a", bgColor: GLASS_BG, category: "eastern" },
  // 趣味生活
  { icon: "✦",  href: "/daily-card",   titleKey: "dailyCardTitle",   descKey: "dailyCardFullDesc", accentColor: "#a78bfa", bgColor: GLASS_BG, badge: "Daily", category: "lifestyle", featured: true },
  { icon: "☀️", href: "/daily-fortune",titleKey: "dailyFortuneTitle",descKey: "dailyFortuneDesc",  accentColor: "#f0a500", bgColor: GLASS_BG, badge: "NEW",  category: "lifestyle", featured: true },
  { icon: "🐾", href: "/pet-psychic",  titleKey: "petTitle",         descKey: "petDesc",           accentColor: "#5dc885", bgColor: GLASS_BG, category: "lifestyle" },
  { icon: "🔮", href: "/ai-mystic",    titleKey: "aiMysticTitle",    descKey: "aiMysticDesc",      accentColor: "#c084fc", bgColor: GLASS_BG, badge: "AI",   category: "lifestyle" },
  { icon: "💞", href: "/love",         titleKey: "loveTitle",        descKey: "loveDesc",          accentColor: "#b06aff", bgColor: GLASS_BG, category: "lifestyle" },
];

// ───────────────────────────────────────────
// 首页主组件
// ───────────────────────────────────────────
function ModuleSelectPage() {
  const lang = useLocale();
  const [moonPhase, setMoonPhase] = useState({ emoji: "🌙", label: "" });
  const [activeTab, setActiveTab] = useState<"all" | "western" | "eastern" | "lifestyle">("all");

  const t = lang === "en" ? EN : lang === "tw" ? TW : ZH;

  useEffect(() => {
    const now = new Date();
    const knownNewMoon = new Date(2024, 0, 11);
    const daysSince = (now.getTime() - knownNewMoon.getTime()) / 86400000;
    const phase = ((daysSince % 29.53) + 29.53) % 29.53;
    let emoji = "🌑";
    let label = lang === "zh" ? "新月" : "New Moon";
    const isZh = lang === "zh"; const isTw = lang === "tw";
    if      (phase < 1.85)  { emoji = "🌑"; label = lang === "en" ? "New Moon"        : isZh ? "新月"   : "新月"; }
    else if (phase < 7.38)  { emoji = "🌒"; label = lang === "en" ? "Waxing Crescent" : isZh ? "娥眉月" : "娥眉月"; }
    else if (phase < 9.22)  { emoji = "🌓"; label = lang === "en" ? "First Quarter"   : isZh ? "上弦月" : "上弦月"; }
    else if (phase < 14.77) { emoji = "🌔"; label = lang === "en" ? "Waxing Gibbous"  : isZh ? "盈凸月" : "盈凸月"; }
    else if (phase < 16.61) { emoji = "🌕"; label = lang === "en" ? "Full Moon"       : isZh ? "满月"   : "滿月"; }
    else if (phase < 22.15) { emoji = "🌖"; label = lang === "en" ? "Waning Gibbous"  : isZh ? "亏凸月" : "虧凸月"; }
    else if (phase < 23.99) { emoji = "🌗"; label = lang === "en" ? "Last Quarter"    : isZh ? "下弦月" : "下弦月"; }
    else                    { emoji = "🌘"; label = lang === "en" ? "Waning Crescent"  : isZh ? "残月"   : "殘月"; }
    void isTw; // suppress unused warning
    setMoonPhase({ emoji, label });
  }, [lang]);

  const TABS = [
    { key: "all",       label: t.tabAll,       icon: "✦" },
    { key: "western",   label: t.tabWestern,   icon: "🔮" },
    { key: "eastern",   label: t.tabEastern,   icon: "☯️" },
    { key: "lifestyle", label: t.tabLifestyle, icon: "🐾" },
  ] as const;

  const filtered = activeTab === "all" ? MODULES : MODULES.filter(m => m.category === activeTab);
  const featured = filtered.filter(m => m.featured);
  const normal   = filtered.filter(m => !m.featured);

  return (
    <div className="min-h-screen flex flex-col" style={{ position: "relative", zIndex: 1 }}>

      {/* ── HEADER ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(21,18,29,0.90)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "0 20px",
        height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <span style={{ fontSize: 22 }}>✦</span>
          <div>
            <div style={{
              fontFamily: "Cinzel, serif", fontSize: "0.95rem", fontWeight: 700,
              background: "linear-gradient(135deg,#e8d5a3,#c9a84c)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              lineHeight: 1.1,
            }}>AiAstrum</div>
            <div style={{ fontSize: "0.6rem", color: "rgba(201,168,76,0.45)", letterSpacing: "0.12em", lineHeight: 1 }}>
              {lang === "en" ? "DESTINY ORACLE" : lang === "tw" ? "命運密語" : "命运密语"}
            </div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: 5, fontSize: "0.72rem", color: "rgba(201,168,76,0.5)", letterSpacing: "0.06em" }}>
          <span style={{ fontSize: 15 }}>{moonPhase.emoji}</span>
          <span>{moonPhase.label}</span>
        </div>

        <LangSwitcher />
      </header>

      {/* ── HERO ── */}
      <section style={{ textAlign: "center", padding: "20px 20px 0", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 0%, rgba(100,60,200,0.22) 0%, transparent 68%)",
          pointerEvents: "none",
        }} />
        {/* 副标题 & 主标题紧凑成组 */}
        <p style={{
          fontFamily: "Cinzel, serif", fontSize: "0.68rem", letterSpacing: "0.22em",
          color: "rgba(201,168,76,0.6)", marginBottom: 8, textTransform: "uppercase",
        }}>{t.heroSub}</p>
        <h1 style={{
          fontFamily: "Cinzel, serif", fontSize: "clamp(1.9rem, 6vw, 3.2rem)", fontWeight: 700,
          background: "linear-gradient(135deg, #e8d5a3 0%, #c9a84c 50%, #f0e68c 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          lineHeight: 1.2, marginBottom: 8, letterSpacing: "0.04em",
        }}>{t.heroTitle}</h1>
        {/* ▲ 提亮副描述：从 0.5 → 0.75 */}
        <p style={{ fontSize: "0.88rem", color: "rgba(200,175,145,0.75)", marginBottom: 24, lineHeight: 1.55 }}>
          {t.heroDesc}
        </p>

        {/* ── 三功能卡片（更高、左图标右文字、更强卡片感） ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, maxWidth: 440, margin: "0 auto" }}>
          {([
            {
              icon: "✦",
              href: "/daily-card",
              labelKey: "heroCard1Label" as keyof typeof ZH,
              subLabel: lang === "zh" ? "盲盒翻转" : "Flip & Reveal",
              color: "#a78bfa",
              bg: "rgba(80,50,140,0.22)",
              glow: "rgba(130,80,220,0.18)",
              border: "rgba(150,100,255,0.30)",
            },
            {
              icon: "🔮",
              href: "/ai-mystic",
              labelKey: "heroCard2Label" as keyof typeof ZH,
              subLabel: lang === "zh" ? "AI 对话" : "AI Chat",
              color: "#c084fc",
              bg: "rgba(100,40,180,0.22)",
              glow: "rgba(180,60,240,0.15)",
              border: "rgba(170,80,255,0.28)",
            },
            {
              icon: "☀️",
              href: "/daily-fortune",
              labelKey: "heroCard3Label" as keyof typeof ZH,
              subLabel: lang === "zh" ? "今日幸运色" : "Lucky Color",
              color: "#f0a500",
              bg: "rgba(180,110,0,0.18)",
              glow: "rgba(240,160,0,0.12)",
              border: "rgba(220,150,0,0.28)",
            },
          ] as const).map(item => (
            <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
              <div style={{
                borderRadius: 18,
                padding: "18px 10px 16px",
                background: item.bg,
                border: `1px solid ${item.border}`,
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
                transition: "transform 0.18s, box-shadow 0.18s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px ${item.glow}`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
              >
                {/* 底部光晕 */}
                <div style={{
                  position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
                  width: "80%", height: 40,
                  background: `radial-gradient(ellipse, ${item.glow} 0%, transparent 70%)`,
                  pointerEvents: "none",
                }} />
                {/* 大图标 */}
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: `${item.color}1A`,
                  border: `1px solid ${item.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, marginBottom: 10,
                }}>{item.icon}</div>
                {/* 主标签 */}
                <span style={{
                  fontSize: "0.78rem", fontWeight: 700,
                  color: item.color,
                  lineHeight: 1.3, textAlign: "center", marginBottom: 4,
                }}>
                  {t[item.labelKey] as string}
                </span>
                {/* 副标签（说明文字） */}
                <span style={{
                  fontSize: "0.62rem",
                  color: `${item.color}80`,
                  lineHeight: 1.2, textAlign: "center",
                }}>{item.subLabel}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Hero 底部间距，与 Tab 栏形成物理隔离 */}
        <div style={{ height: 16 }} />
      </section>

      {/* Hero 与 Tab 之间的装饰分割线 */}
      <div style={{ margin: "0 20px 0", height: 1, background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)" }} />

      {/* ── TAB BAR ── */}
      <div style={{
        position: "sticky", top: 56, zIndex: 90,
        background: "rgba(21,18,29,0.96)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "12px 16px", overflowX: "auto",
        display: "flex", gap: 8, scrollbarWidth: "none",
      }}>
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flexShrink: 0, padding: "7px 16px", borderRadius: 22,
              border: activeTab === tab.key ? "1px solid rgba(201,168,76,0.55)" : "1px solid rgba(201,168,76,0.12)",
              background: activeTab === tab.key ? "rgba(201,168,76,0.14)" : "transparent",
              color: activeTab === tab.key ? "rgba(240,210,120,0.95)" : "rgba(210,185,130,0.7)",
              fontSize: "0.78rem", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 5,
              transition: "all 0.18s", fontFamily: "sans-serif", whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: 13 }}>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* ── 模块卡片 ── */}
      {/* PC 端最大宽度 960，精选推荐双列 + 更多功能最多4列 */}
      <div style={{ maxWidth: 960, margin: "0 auto", width: "100%", padding: "24px 16px 100px" }}>

        {featured.length > 0 && (
          <>
            <SectionLabel icon="⭐" label={t.sectionFeatured} />
            {/* 精选推荐：< 560px 单列，≥ 560px 双列 */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))", gap: 12, marginBottom: 0 }}>
              {featured.map(mod => (
                <FeaturedCard key={mod.href} mod={mod} t={t} />
              ))}
            </div>
          </>
        )}

        {normal.length > 0 && (
          <>
            {/* 两个 Section 之间加大垂直间距 */}
            <div style={{ height: featured.length > 0 ? 56 : 0 }} />
            {featured.length > 0 && <SectionLabel icon="✦" label={t.sectionMore} />}
            {/*
              更多功能网格：
              - 手机竖屏 (< 480px)   → ~2列 (minmax 160px)
              - 平板 (480–719px)    → ~3列
              - PC 小屏 (720–959px) → ~4列
              - PC 大屏 (≥ 960px)   → 精确4列（容器最大960px，每列约220px）
              通过 minmax(200px, 1fr) 实现，最多4列
            */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 12,
            }}>
              {normal.map(mod => (
                <GridCard key={mod.href} mod={mod} t={t} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── 知识库推广横幅 ── */}
      <div style={{ maxWidth: 960, margin: "0 auto 16px", padding: "0 16px" }}>
        <Link href="/blog" style={{ textDecoration: "none", display: "block" }}>
          <div style={{
            borderRadius: 16,
            background: "linear-gradient(135deg, rgba(100,60,200,0.15) 0%, rgba(201,168,76,0.08) 100%)",
            border: "1px solid rgba(201,168,76,0.2)",
            padding: "16px 20px",
            display: "flex", alignItems: "center", gap: 14,
            cursor: "pointer",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.38)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(100,60,200,0.15)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.2)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
          >
            <div style={{
              width: 42, height: 42, borderRadius: 11, flexShrink: 0,
              background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
            }}>📚</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#e8d5a3", marginBottom: 3 }}>
                {lang === "zh" ? "神秘学知识库" : "Mystic Knowledge Base"}
              </div>
              <div style={{ fontSize: "0.7rem", color: "rgba(200,175,140,0.55)", lineHeight: 1.4 }}>
                {lang === "zh"
                  ? "塔罗78张牌意 · 周公解梦大全 · 星座运势指南"
                  : "78 Tarot card meanings · Dream guides · Horoscope articles"}
              </div>
            </div>
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0,
            }}>
              <span style={{
                fontSize: "0.58rem", padding: "2px 8px", borderRadius: 6,
                background: "linear-gradient(135deg,#7c3aed,#c084fc)", color: "#fff",
                fontWeight: 600, letterSpacing: "0.04em",
              }}>SEO</span>
              <span style={{ fontSize: "0.75rem", color: "rgba(201,168,76,0.55)" }}>→</span>
            </div>
          </div>
        </Link>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid rgba(201,168,76,0.08)",
        padding: "28px 24px 36px",
        textAlign: "center", background: "rgba(6,3,18,0.8)",
      }}>
        <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.12),transparent)", marginBottom: 16 }} />
        <div style={{ fontFamily: "Cinzel,serif", fontSize: "0.75rem", color: "rgba(201,168,76,0.6)", letterSpacing: "0.15em", marginBottom: 8 }}>
          ✦ AiAstrum · {lang === "zh" ? "命运密语" : lang === "tw" ? "命運密語" : "Destiny Oracle"} ✦
        </div>
        {/* 版权声明文字提亮至可读水平 (#888) */}
        <p style={{ fontSize: "0.68rem", color: "rgba(180,165,145,0.6)", lineHeight: 1.6, maxWidth: 320, margin: "0 auto 8px" }}>
          {lang === "en"
            ? "For entertainment purposes only. All readings are for fun and personal reflection."
            : "本站内容仅供娱乐与心理探索参考，请理性看待，切勿迷信。"}
        </p>
        <p style={{ fontSize: "0.62rem", color: "rgba(170,155,135,0.5)", lineHeight: 1.5, maxWidth: 300, margin: "0 auto" }}>
          {lang === "en"
            ? "We respect your privacy. Birth data is processed locally. GDPR & CCPA compliant."
            : "我们尊重您的隐私。出生数据仅在本地处理，符合 GDPR 及 CCPA 合规要求。"}
        </p>
      </footer>
    </div>
  );
}

// ───────────────────────────────────────────
// 子组件
// ───────────────────────────────────────────
function SectionLabel({ icon, label }: { icon: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
      <span style={{ fontSize: 13, opacity: 0.65 }}>{icon}</span>
      <span style={{
        fontSize: "0.7rem", fontFamily: "Cinzel, serif",
        color: "rgba(201,168,76,0.5)", letterSpacing: "0.1em", textTransform: "uppercase",
      }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,rgba(201,168,76,0.15),transparent)" }} />
    </div>
  );
}

const RUNE_ICONS = new Set(["ᚠ", "紫", "奇", "☯"]);

// 统一的标签样式生成函数
function getBadgeStyle(badge: string | undefined): React.CSSProperties {
  if (!badge) return {};
  const map: Record<string, React.CSSProperties> = {
    "AI":    { background: "linear-gradient(135deg,#7c3aed,#c084fc)", color: "#fff", boxShadow: "0 2px 8px rgba(124,58,237,0.5)" },
    "HOT":   { background: "linear-gradient(135deg,#00C8FF,#7B2FFF)", color: "#fff", boxShadow: "0 2px 8px rgba(0,200,255,0.4)" },
    "🔥":    { background: "linear-gradient(135deg,#7C3AED,#E91E8C)", color: "#fff", boxShadow: "0 2px 8px rgba(233,30,140,0.4)" },
    "NEW":   { background: "linear-gradient(135deg,#f0a500,#ff6b00)",  color: "#fff", boxShadow: "0 2px 8px rgba(240,165,0,0.45)" },
    "Daily": { background: "rgba(80,50,140,0.85)", color: "rgba(200,160,255,0.95)", border: "1px solid rgba(150,100,255,0.35)", boxShadow: "0 2px 8px rgba(100,60,200,0.35)" },
  };
  return map[badge] ?? { background: "linear-gradient(135deg,#c9a84c,#f0a500)", color: "#fff" };
}

function FeaturedCard({ mod, t }: { mod: ModuleItem; t: typeof ZH }) {
  const [hovered, setHovered] = useState(false);
  const title = t[mod.titleKey] as string;
  const desc  = t[mod.descKey]  as string;
  const isRune = RUNE_ICONS.has(mod.icon);

  return (
    <Link href={mod.href} style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 18, padding: "18px 16px",
          background: mod.bgColor,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${hovered ? mod.accentColor + "50" : "rgba(255,255,255,0.08)"}`,
          cursor: "pointer", position: "relative", overflow: "visible",
          transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          boxShadow: hovered ? `0 8px 28px ${mod.accentColor}28` : "none",
        }}
      >
        {/* 背景光晕 */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 18,
          background: hovered
            ? `radial-gradient(ellipse at 30% 50%,${mod.accentColor}20 0%,transparent 65%)`
            : `radial-gradient(ellipse at 30% 50%,${mod.accentColor}12 0%,transparent 65%)`,
          pointerEvents: "none",
          transition: "background 0.2s",
        }} />

        {/* 标签：突破右上角边缘 */}
        {mod.badge && (
          <div style={{
            position: "absolute", top: -8, right: 12,
            fontSize: "0.58rem", padding: "2px 9px", borderRadius: 8,
            letterSpacing: "0.06em", fontWeight: 600,
            zIndex: 2,
            ...getBadgeStyle(mod.badge),
          }}>{mod.badge}</div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative", zIndex: 1 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: `${mod.accentColor}18`, border: `1px solid ${mod.accentColor}35`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            fontSize: isRune ? "1.3rem" : "1.6rem",
            fontFamily: isRune ? "serif" : "inherit",
            color: isRune ? mod.accentColor : "inherit",
            fontWeight: isRune ? 700 : "normal",
            transition: "transform 0.2s, box-shadow 0.2s",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            boxShadow: hovered ? `0 4px 14px ${mod.accentColor}30` : "none",
          }}>{mod.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{
              fontSize: "0.95rem", fontWeight: 700, color: "#e8d5a3",
              marginBottom: 4, fontFamily: "serif", lineHeight: 1.2,
            }}>{title}</h3>
            <p style={{
              fontSize: "0.76rem", color: "rgba(210,195,170,0.78)", lineHeight: 1.45,
              display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
            }}>{desc}</p>
          </div>
          {/* 箭头：垂直居中对齐（由父级 alignItems:center 保证），hover 右移+提亮 */}
          <span style={{
            fontSize: "1.2rem", color: mod.accentColor, flexShrink: 0,
            opacity: hovered ? 0.9 : 0.35,
            transform: hovered ? "translateX(5px)" : "translateX(0)",
            transition: "transform 0.2s, opacity 0.2s",
            marginRight: 2,
          }}>→</span>
        </div>
      </div>
    </Link>
  );
}

function GridCard({ mod, t }: { mod: ModuleItem; t: typeof ZH }) {
  const [hovered, setHovered] = useState(false);
  const title = t[mod.titleKey] as string;
  const desc  = t[mod.descKey]  as string;
  const isRune = RUNE_ICONS.has(mod.icon);

  return (
    <Link href={mod.href} style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 16, padding: "18px 14px 16px",
          background: mod.bgColor,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${hovered ? mod.accentColor + "50" : "rgba(255,255,255,0.08)"}`,
          cursor: "pointer", position: "relative", overflow: "visible",
          minHeight: 130,
          transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          boxShadow: hovered ? `0 6px 20px ${mod.accentColor}28` : "none",
          /* 居中排版 */
          display: "flex", flexDirection: "column", alignItems: "center",
        }}
      >
        {/* 顶部高光渐变 */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 16,
          background: hovered
            ? `radial-gradient(ellipse at 50% 20%,${mod.accentColor}1A 0%,transparent 65%)`
            : `radial-gradient(ellipse at 50% 20%,${mod.accentColor}0E 0%,transparent 65%)`,
          pointerEvents: "none",
          transition: "background 0.2s",
        }} />

        {/* 标签：统一绝对定位右上角，半突出边框 */}
        {mod.badge && (
          <div style={{
            position: "absolute", top: -9, right: 10,
            fontSize: "0.52rem", padding: "2px 8px", borderRadius: 8,
            letterSpacing: "0.06em", fontWeight: 700,
            zIndex: 2, lineHeight: 1.6,
            ...getBadgeStyle(mod.badge),
          }}>{mod.badge}</div>
        )}

        {/* 图标容器居中 */}
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: `${mod.accentColor}14`,
          border: `1px solid ${mod.accentColor}28`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 10, flexShrink: 0,
          transition: "transform 0.2s, box-shadow 0.2s",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          boxShadow: hovered ? `0 4px 12px ${mod.accentColor}28` : "none",
          fontSize: isRune ? "1.3rem" : "1.6rem",
          fontFamily: isRune ? "serif" : "inherit",
          color: isRune ? mod.accentColor : "inherit",
          fontWeight: isRune ? 700 : "normal",
        }}>{mod.icon}</div>

        <div style={{ position: "relative", zIndex: 1, width: "100%", textAlign: "center" }}>
          <h3 style={{
            fontSize: "0.82rem", fontWeight: 700, color: "#e8d5a3",
            marginBottom: 5, fontFamily: "serif", lineHeight: 1.2,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>{title}</h3>
          {/* 描述居中，严格1行截断保证高度一致 */}
          <p style={{
            fontSize: "0.66rem", color: "rgba(210,195,170,0.72)", lineHeight: 1.4,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            margin: 0,
          }}>{desc}</p>
        </div>
      </div>
    </Link>
  );
}

// ───────────────────────────────────────────
// 塔罗牌旧流程页面（保持不变）
// ───────────────────────────────────────────
function TarotLandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
      <div className="mb-8 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mystic-circle spin-slow" style={{ width: 160, height: 160, opacity: 0.15 }} />
        </div>
        <div className="text-7xl animate-float relative z-10">🔮</div>
      </div>

      <h1
        className="font-cinzel text-center mb-3 animate-fade-in-up"
        style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          background: "linear-gradient(135deg, #e8d5a3, #c9a84c, #f0e68c)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          letterSpacing: "0.1em",
        }}
      >塔罗启示录</h1>
      <p className="font-cinzel text-gold/60 text-sm tracking-widest mb-2 animate-fade-in-up animate-delay-100">TAROT ORACLE</p>

      <p className="text-center text-gold-light/70 max-w-md leading-relaxed mb-12 animate-fade-in-up animate-delay-200" style={{ fontSize: "1.1rem" }}>
        用古老的智慧，解读当下的困惑。<br />让 AI 塔罗师为你揭示命运的低语。
      </p>

      <div className="mystic-divider w-64 mb-12 animate-fade-in-up animate-delay-200" />

      <div className="grid grid-cols-3 gap-6 mb-12 max-w-sm w-full animate-fade-in-up animate-delay-300">
        {[{ icon: "✨", text: "每日一牌" }, { icon: "🌟", text: "三牌阵" }, { icon: "🤖", text: "AI 解析" }].map(f => (
          <div key={f.text} className="text-center">
            <div className="text-2xl mb-1">{f.icon}</div>
            <div className="text-gold/70 text-xs tracking-wide">{f.text}</div>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="btn-mystical font-cinzel text-deep-purple px-10 py-4 rounded-full text-lg font-semibold tracking-widest animate-fade-in-up animate-delay-400"
        style={{ color: "#0f0a1e" }}
      >开启占卜</button>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6 opacity-30">
        {["♈", "♉", "♊", "♋", "♌", "♍"].map((sign, i) => (
          <span key={sign} className="text-gold text-lg" style={{ animation: `twinkle ${2 + i * 0.3}s ease-in-out ${i * 0.2}s infinite` }}>
            {sign}
          </span>
        ))}
      </div>
    </div>
  );
}

function DomainSelectPage({ onSelect }: { onSelect: (domain: string) => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-24">
      <div className="w-full max-w-lg animate-fade-in-up">
        <div className="text-center mb-10">
          <p className="text-gold/50 text-sm tracking-widest font-cinzel mb-2">STEP 1</p>
          <h2 className="text-3xl font-cinzel mb-3" style={{
            background: "linear-gradient(135deg, #e8d5a3, #c9a84c)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>选择占卜领域</h2>
          <p className="text-gold-light/60 text-sm">你今天想探索哪个方向？</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {DOMAINS.map((domain, i) => (
            <button
              key={domain.id}
              onClick={() => onSelect(domain.id)}
              className="glass-card rounded-2xl p-6 text-center hover:border-gold transition-all hover:scale-105 group"
              style={{ animationDelay: `${i * 0.1}s`, animation: "fade-in-up 0.6s ease-out forwards" }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{domain.icon}</div>
              <div className="text-gold font-cinzel text-lg tracking-wide">{domain.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpreadSelectPage({
  domain, onSelect, onBack,
}: {
  domain: string;
  onSelect: (spread: "single" | "three") => void;
  onBack: () => void;
}) {
  const domainInfo = DOMAINS.find(d => d.id === domain);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-24">
      <div className="w-full max-w-lg animate-fade-in-up">
        <div className="text-center mb-10">
          <p className="text-gold/50 text-sm tracking-widest font-cinzel mb-2">STEP 2</p>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">{domainInfo?.icon}</span>
            <h2 className="text-3xl font-cinzel" style={{
              background: "linear-gradient(135deg, #e8d5a3, #c9a84c)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>{domainInfo?.name}</h2>
          </div>
          <p className="text-gold-light/60 text-sm">选择你的占卜方式</p>
        </div>
        <div className="flex flex-col gap-4">
          {SPREADS.map((spread, i) => (
            <button
              key={spread.id}
              onClick={() => onSelect(spread.id as "single" | "three")}
              className="glass-card rounded-2xl p-6 text-left hover:border-gold transition-all group relative overflow-hidden hover:scale-102 cursor-pointer"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{spread.icon}</span>
                  <div>
                    <div className="text-gold font-cinzel text-xl mb-1">{spread.name}</div>
                    <div className="text-gold-light/60 text-sm">{spread.description}</div>
                    <div className="flex gap-2 mt-2">
                      {spread.positions.map(pos => (
                        <span key={pos} className="text-xs px-2 py-0.5 rounded-full" style={{
                          background: "rgba(201,168,76,0.15)", color: "rgba(201,168,76,0.8)", border: "1px solid rgba(201,168,76,0.2)",
                        }}>{pos}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-xs px-2 py-0.5 rounded-full font-cinzel" style={{
                    background: "rgba(74,222,128,0.2)", color: "#4ade80",
                  }}>免费</span>
                </div>
              </div>
            </button>
          ))}
        </div>
        <button onClick={onBack} className="mt-6 w-full text-center text-gold/50 text-sm hover:text-gold transition-colors">
          ← 返回选择领域
        </button>
      </div>
    </div>
  );
}
