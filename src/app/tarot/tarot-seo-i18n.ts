// ── 塔罗主页 SEO 内容 / 新手步骤 / FAQ（三语）──────────────
// 供 page.tsx（客户端渲染）与 layout.tsx（FAQPage JSON-LD）共用，保持同源。

export interface TarotSeoText {
  howToTitle: string;
  howToSteps: string[];
  seoSections: { heading: string; body: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
}

export const TAROT_SEO: Record<"zh" | "tw" | "en", TarotSeoText> = {
  zh: {
    howToTitle: "怎么玩？",
    howToSteps: [
      "点击「开启占卜」，心里默念一个你想探索的问题",
      "选择占卜领域：爱情、事业、财富或综合",
      "选择牌阵：每日一牌看今日指引，三牌阵看过去·现在·未来",
      "抽出卡牌，阅读 AI 塔罗师为你生成的专属解读",
    ],
    seoSections: [
      {
        heading: "什么是在线塔罗占卜？",
        body: "塔罗牌是一套 78 张的古老牌卡系统，由 22 张大阿尔克那与 56 张小阿尔克那组成，每张牌都承载着独特的象征意义。在线塔罗占卜把这套系统搬到了网页上：你凭直觉抽牌，AI 塔罗师结合牌意、正逆位与你选择的领域，生成一段完整的解读。",
      },
      {
        heading: "每日一牌和三牌阵怎么选？",
        body: "每日一牌适合快速获取今日指引——一张牌直指当下最需要注意的能量。三牌阵则用「过去、现在、未来」三个位置铺开问题的完整脉络，适合面对具体困惑时深入探索。不确定选哪个，先从每日一牌开始。",
      },
      {
        heading: "想深入了解每张牌？",
        body: "本站收录了完整的 78 张塔罗牌意库，每张牌都有独立的详情页，包含正位与逆位的含义解析。占卜之后不妨点开你抽到的牌，看看它在不同情境下的全部含义。",
      },
    ],
    faqTitle: "常见问题",
    faq: [
      { q: "在线塔罗占卜收费吗？", a: "完全免费，也不需要注册。选择领域和牌阵后即可抽牌，AI 解读会自动生成，占卜记录只保存在你自己的浏览器里。" },
      { q: "塔罗占卜的结果准吗？", a: "塔罗不是预言未来的工具，而是一面映照内心的镜子。牌面提供的是一个看待问题的角度，真正的答案始终在你自己手里。把它当作参考和启发，而不是绝对的指令。" },
      { q: "一天可以占卜几次？", a: "没有次数限制。不过塔罗的传统是：同一个问题不宜在短时间内反复占问。给每一次解读一点消化的时间，往往比连续抽牌更有收获。" },
      { q: "正位和逆位是什么意思？", a: "牌面朝上是正位，通常代表牌意的顺向表达；牌面倒置是逆位，往往暗示能量的阻滞、过度或向内转化。抽牌时系统会随机决定正逆位，AI 解读会一并考虑。" },
    ],
  },
  tw: {
    howToTitle: "怎麼玩？",
    howToSteps: [
      "點擊「開啟占卜」，心裡默念一個你想探索的問題",
      "選擇占卜領域：愛情、事業、財富或綜合",
      "選擇牌陣：每日一牌看今日指引，三牌陣看過去·現在·未來",
      "抽出卡牌，閱讀 AI 塔羅師為你生成的專屬解讀",
    ],
    seoSections: [
      {
        heading: "什麼是線上塔羅占卜？",
        body: "塔羅牌是一套 78 張的古老牌卡系統，由 22 張大阿爾克那與 56 張小阿爾克那組成，每張牌都承載著獨特的象徵意義。線上塔羅占卜把這套系統搬到了網頁上：你憑直覺抽牌，AI 塔羅師結合牌義、正逆位與你選擇的領域，生成一段完整的解讀。",
      },
      {
        heading: "每日一牌和三牌陣怎麼選？",
        body: "每日一牌適合快速獲取今日指引——一張牌直指當下最需要注意的能量。三牌陣則用「過去、現在、未來」三個位置鋪開問題的完整脈絡，適合面對具體困惑時深入探索。不確定選哪個，先從每日一牌開始。",
      },
      {
        heading: "想深入了解每張牌？",
        body: "本站收錄了完整的 78 張塔羅牌義庫，每張牌都有獨立的詳情頁，包含正位與逆位的含義解析。占卜之後不妨點開你抽到的牌，看看它在不同情境下的全部含義。",
      },
    ],
    faqTitle: "常見問題",
    faq: [
      { q: "線上塔羅占卜收費嗎？", a: "完全免費，也不需要註冊。選擇領域和牌陣後即可抽牌，AI 解讀會自動生成，占卜記錄只儲存在你自己的瀏覽器裡。" },
      { q: "塔羅占卜的結果準嗎？", a: "塔羅不是預言未來的工具，而是一面映照內心的鏡子。牌面提供的是一個看待問題的角度，真正的答案始終在你自己手裡。把它當作參考和啟發，而不是絕對的指令。" },
      { q: "一天可以占卜幾次？", a: "沒有次數限制。不過塔羅的傳統是：同一個問題不宜在短時間內反覆占問。給每一次解讀一點消化的時間，往往比連續抽牌更有收穫。" },
      { q: "正位和逆位是什麼意思？", a: "牌面朝上是正位，通常代表牌義的順向表達；牌面倒置是逆位，往往暗示能量的阻滯、過度或向內轉化。抽牌時系統會隨機決定正逆位，AI 解讀會一併考慮。" },
    ],
  },
  en: {
    howToTitle: "How it works",
    howToSteps: [
      "Tap “Begin Reading” and hold a question in mind",
      "Pick a domain: Love, Career, Wealth, or General",
      "Choose a spread — a single Daily Card or the Past·Present·Future three-card spread",
      "Draw your cards and read the AI tarot reader's interpretation",
    ],
    seoSections: [
      {
        heading: "What is online tarot reading?",
        body: "Tarot is an ancient 78-card system — 22 Major Arcana and 56 Minor Arcana — where every card carries its own symbolism. Online tarot brings this to your browser: you draw cards by intuition, and an AI tarot reader weaves card meanings, upright/reversed positions, and your chosen domain into a complete reading.",
      },
      {
        heading: "Daily Card or three-card spread?",
        body: "The Daily Card gives quick guidance — one card pointing at the energy that matters most right now. The three-card spread lays out Past, Present, and Future to trace the full arc of a question, ideal for deeper exploration. Not sure? Start with the Daily Card.",
      },
      {
        heading: "Want to go deeper into each card?",
        body: "This site hosts a complete library of all 78 tarot card meanings, each with its own page covering upright and reversed interpretations. After a reading, open the cards you drew to see every shade of their symbolism.",
      },
    ],
    faqTitle: "FAQ",
    faq: [
      { q: "Is the tarot reading free?", a: "Completely free, no sign-up required. Pick a domain and a spread, draw your cards, and the AI reading is generated instantly. Your reading history stays in your own browser." },
      { q: "Are tarot readings accurate?", a: "Tarot doesn't predict the future — it mirrors your inner landscape. The cards offer an angle on your question; the real answer is always yours. Treat a reading as inspiration, not instruction." },
      { q: "How many readings can I do per day?", a: "There's no hard limit. That said, tarot tradition advises against asking the same question repeatedly in a short span. Giving each reading time to sink in is usually more rewarding than drawing again and again." },
      { q: "What do upright and reversed mean?", a: "A card drawn face-up is upright, expressing its energy directly; a reversed card suggests blockage, excess, or an inward turn of that energy. The draw randomizes orientation, and the AI reading accounts for it." },
    ],
  },
};
