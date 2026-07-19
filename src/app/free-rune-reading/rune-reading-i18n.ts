// ── 免费卢恩符文占卜（/free-rune-reading）· 三语 UI 文案 + SEO 内容 ──
// 独立模块：Next.js 的 page.tsx 只允许导出 default / metadata 等特定成员，
// 不能导出 T / Lang，故抽到此文件供 page、layout 与各组件共享。
export type Lang = "zh" | "en" | "tw";

export interface FaqItem {
  q: string;
  a: string;
}

export interface SeoSection {
  heading: string;
  paragraphs: string[];
}

export const T = {
  en: {
    back:              "Back",
    pageTitle:         "Free Rune Reading",
    pageSubtitle1:     "RUNE CASTING · Elder Futhark Oracle",
    pageSubtitle2:     "Cast the ancient Norse runes and hear what the stones have to say",
    // 如何使用（步骤说明）
    howToTitle:        "How to use",
    howToSteps: [
      "Choose a spread — single rune guidance or three-rune past/present/future",
      "Cast the runes with one click",
      "Read each rune's meaning and the combined message",
    ],
    // 施法（输入）区
    modeLabel:         "— Choose your casting —",
    singleName:        "Single Rune Guidance",
    singleSubtitle:    "Odin's Eye",
    singleTags:        ["Daily guidance", "Yes/No clarity", "Quick insight"],
    threeName:         "Three-Rune Casting",
    threeSubtitle:     "Past · Present · Future",
    threeTags:         ["The Norns", "Root of the matter", "Where it leads"],
    singleDesc:        "One rune, one message — perfect for a daily draw or a focused question.",
    threeDesc:         "Three runes reveal the past root, the present state, and the future trend of your situation.",
    focusHint:         "Hold your question in mind, then cast the stones.",
    castBtn:           "Cast the Runes",
    castingText:       "Shuffling the rune stones…",
    inputNote:         "* Free rune reading online · No sign-up, no email · For guidance and entertainment",
    // 结果区（解读本体由复用的 RuneReading 组件渲染）
    resultEyebrow:     "YOUR CASTING",
    deepDiveTitle:     "Go deeper on your runes",
    readRuneArticle:   (name: string) => `Read the full guide: ${name} Rune Meaning →`,
    guideLink:         "New to runes? Start with the Elder Futhark Runes Guide →",
    fullAppCta:        "Try the full RuneWhisper ritual (meditation & shareable stone card) →",
    // SEO 内容区
    faqTitle:          "Free Rune Reading FAQ",
    seo: [
      {
        heading: "What Is a Rune Reading?",
        paragraphs: [
          "A rune reading is a form of divination that works with the Elder Futhark — the oldest runic alphabet, used by Germanic and Norse peoples roughly two thousand years ago. Its 24 symbols were carved into stone, wood, antler and bone, and each rune is far more than a letter: Fehu speaks of wealth and flow, Algiz of protection, Isa of stillness, Dagaz of breakthrough. In a rune reading, you bring a question or situation, the runes are shuffled, and the ones drawn are interpreted as a mirror for what is happening in your life right now.",
          "Runes carry a different flavor from tarot or oracle cards. They are stark, compact and direct — less storytelling, more verdict. According to Norse myth, Odin hung on the world tree Yggdrasil for nine nights, pierced by his own spear, to win knowledge of the runes. That origin story is why rune casting has always been treated as something weighty: a conversation with fate, not a party trick.",
          "A free rune reading online follows the same logic as casting physical stones. You focus on a question, the 24 runes are shuffled, and you draw one or three of them. What changes is only the medium — instead of a pouch of carved stones, the casting happens on your screen, instantly and privately.",
        ],
      },
      {
        heading: "How Online Rune Casting Works",
        paragraphs: [
          "This free rune reading tool uses the complete Elder Futhark set. When you tap \"Cast the Runes\", the stones are shuffled using cryptographically secure randomness — the digital equivalent of rattling a pouch and letting the stones tumble. In the three-rune casting, each rune is drawn without replacement, so no rune can appear twice in one spread, exactly as with a physical set.",
          "Each draw also determines orientation. Many runes can land upright or reversed (sometimes called merkstave). An upright rune expresses its energy freely — growth, movement, clarity. A reversed rune points to the same energy blocked, delayed, internalized or working against you. A few runes, like Isa or Gebo, look the same upside down and are always read upright, just as in traditional practice.",
          "Your result shows each rune's name, symbol, keywords, orientation, a plain-language interpretation and concrete advice. Below the casting you'll also find links to our in-depth guides: an Elder Futhark overview for beginners and a dedicated meaning article for each of the 24 runes, so a free rune reading online can be the start of real study rather than a one-off fortune cookie.",
        ],
      },
      {
        heading: "Single Rune vs Three-Rune Reading: Which Should You Choose?",
        paragraphs: [
          "The single rune casting — sometimes called Odin's Eye — draws one stone for one message. It is the best choice for a daily draw in the morning, for a quick check-in before a decision, or for a focused yes/no-flavored question. One rune forces clarity: there is nowhere for the answer to hide, and its keyword often lands with surprising precision.",
          "The three-rune casting draws three stones into the positions of Past, Present and Future, named after the Norns — the three fate-weavers of Norse mythology. The first rune shows the root of your situation: what formed it. The second shows where you stand now. The third shows the direction the energy is moving if nothing changes. Choose this spread when your question has a story behind it — a relationship, a career shift, a conflict that has been building.",
          "A simple rule of thumb: if you can phrase your question in one sentence, draw one rune. If your question has a past you can't ignore, cast three. And whatever you draw, read the synthesis carefully — in a three-rune reading online, the way the three stones talk to each other matters as much as each individual meaning.",
        ],
      },
      {
        heading: "How to Interpret Your Free Rune Reading",
        paragraphs: [
          "Start with the keywords. Each rune in your result comes with three or four core words — let them sit against your question before you read the full text. Often one keyword will hit immediately, and that is usually the thread to pull. Then read the interpretation and the advice line; the advice is deliberately practical, because runes were tools for decisions, not decoration.",
          "Don't panic at a reversed rune. Merkstave is not a curse — it is information. Reversed Hagalaz might say the disruption is already behind you; reversed Fehu might warn that money is leaking through carelessness. Treat reversals as a honest friend who says the uncomfortable thing early. Finally, write your casting down. A rune reading that seemed cryptic in the morning often reads completely differently a week later, and keeping a small journal is how casual casting turns into genuine skill with the runes.",
        ],
      },
    ] as SeoSection[],
    faq: [
      {
        q: "Is this rune reading really free?",
        a: "Yes. This is a completely free rune reading online — no sign-up, no email, no limits on how many times you cast. Both the single rune and three-rune spreads are free, and every linked meaning guide is free to read as well.",
      },
      {
        q: "How does an online rune reading compare to casting physical stones?",
        a: "The mechanics are the same: 24 Elder Futhark runes, shuffled and drawn at random, with orientation decided per draw. Our casting uses cryptographically secure randomness, which is at least as unbiased as a hand in a pouch. Most practitioners agree the meaning comes from the question you bring and the attention you pay — not from the material of the stones.",
      },
      {
        q: "What is the difference between the single rune and the three-rune casting?",
        a: "The single rune gives one focused message — ideal for daily guidance or a quick question. The three-rune casting lays runes into Past, Present and Future positions, showing the root of a situation, its current state and where it's heading. Use one rune for simple questions, three for situations with a history.",
      },
      {
        q: "Does a reversed rune mean something bad?",
        a: "Not necessarily. A reversed (merkstave) rune usually means the rune's energy is blocked, delayed, turned inward or working against your interest — a warning or a nuance rather than doom. Some runes are symmetrical and can never be reversed; those are always read upright.",
      },
      {
        q: "Can I cast the runes again if I don't like the answer?",
        a: "You can cast as often as you like, but re-casting the same question until you get an answer you prefer defeats the purpose. Runes reward honesty: take the first answer seriously, write it down, and come back with a new question or after the situation has genuinely moved.",
      },
    ] as FaqItem[],
  },

  zh: {
    back:              "返回",
    pageTitle:         "免费卢恩符文占卜",
    pageSubtitle1:     "RUNE CASTING · 老弗萨克神谕",
    pageSubtitle2:     "掷出古老的北欧符文，倾听石头的回答",
    howToTitle:        "如何使用",
    howToSteps: [
      "选择牌阵——单符文每日指引，或三符文「过去 / 现在 / 未来」",
      "一键掷出符文",
      "阅读每枚符文的含义与整体讯息",
    ],
    modeLabel:         "— 选择占卜方式 —",
    singleName:        "单符文指引",
    singleSubtitle:    "奥丁之眼",
    singleTags:        ["每日指引", "是/否疑问", "快速洞见"],
    threeName:         "三符文占卜",
    threeSubtitle:     "过去 · 现在 · 未来",
    threeTags:         ["诺伦三女神", "事情根源", "未来走向"],
    singleDesc:        "一枚符文，一条讯息——适合每日一抽或聚焦的问题。",
    threeDesc:         "三枚符文揭示事情的过去根源、当下状态与未来走向。",
    focusHint:         "在心中默念你的问题，然后掷出符文。",
    castBtn:           "掷出符文",
    castingText:       "符文石正在洗牌…",
    inputNote:         "* 免费在线卢恩符文占卜 · 无需注册邮箱 · 仅供指引与娱乐",
    resultEyebrow:     "你的占卜",
    deepDiveTitle:     "深入了解你抽到的符文",
    readRuneArticle:   (name: string) => `阅读完整指南：${name} 符文详解 →`,
    guideLink:         "初学符文？先读《老弗萨克符文指南》→",
    fullAppCta:        "体验完整 RuneWhisper 仪式（冥想注入 + 符文石卡片）→",
    faqTitle:          "免费卢恩符文占卜常见问题",
    seo: [
      {
        heading: "什么是卢恩符文占卜？",
        paragraphs: [
          "卢恩符文占卜是一种借助老弗萨克（Elder Futhark）符文的占卜方式。老弗萨克是约两千年前日耳曼与北欧民族使用的最古老如尼字母，24 个符号曾刻在石头、木头与兽骨上。每个符文都远不止是一个字母：费胡（Fehu）谈财富与流动，阿尔吉兹（Algiz）谈守护，伊萨（Isa）谈静止，达加兹（Dagaz）谈破晓与突破。占卜时，你带着一个问题或处境，将符文洗乱后抽取，抽到的符文就像一面镜子，照见你当下生活的真实状态。",
          "与塔罗或神谕卡相比，符文的气质截然不同：简洁、坚硬、直接——少一分叙事，多一分决断。北欧神话中，奥丁倒吊在世界树尤克特拉希尔上九夜，以矛刺身，才换来符文的知识。这个起源决定了符文占卜自古就被视为郑重之事：那是与命运的对话，而不是茶余饭后的把戏。",
          "免费在线符文占卜与掷实体石头遵循同一逻辑：心中默念问题，洗乱 24 枚符文，抽取一枚或三枚。改变的只是媒介——不再是布袋里的刻石，而是屏幕上的即时、私密的抽取。",
        ],
      },
      {
        heading: "在线符文抽取是如何运作的？",
        paragraphs: [
          "本工具使用完整的老弗萨克 24 符文。当你点击「掷出符文」，符文会经过加密级安全随机洗牌——相当于把布袋里的石头摇匀再倾倒。三符文占卜采用不放回抽取，同一个牌阵里不会出现重复的符文，与实体占卜完全一致。",
          "每次抽取还会决定方向。多数符文可能是正位或逆位（又称 merkstave）：正位代表能量顺畅表达——成长、行动、清明；逆位则指向同一能量被阻滞、延迟、内化或与你相逆。少数符文（如伊萨、吉博）颠倒后形状不变，永远按正位解读，这也符合传统做法。",
          "结果会展示每枚符文的名称、字形、关键词、正逆位、白话解读与具体建议。占卜结果下方还附有深入阅读的链接：一篇写给初学者的老弗萨克总览指南，以及 24 篇逐符文详解——让一次免费在线占卜成为真正学习的起点，而不是看过就忘的签文。",
        ],
      },
      {
        heading: "单符文 vs 三符文：该选哪一种？",
        paragraphs: [
          "单符文占卜——又称「奥丁之眼」——只抽一枚石头，给一条讯息。最适合早晨的每日一抽、做决定前的快速确认，或一个是/否式的聚焦问题。只有一枚符文时，答案无处可藏，关键词往往准得惊人。",
          "三符文占卜抽三枚石头，落入「过去、现在、未来」三个位置——以北欧神话中编织命运的三位诺伦女神命名。第一枚揭示事情的根源：它因何而起；第二枚呈现你当下的处境；第三枚指出若一切照旧，能量将流向何方。当问题背后有一段故事时——一段关系、一次职业变动、一场酝酿已久的冲突——选三符文。",
          "一个简单的判断标准：能用一句话说清的问题，抽一枚；有一段绕不开的过去，抽三枚。无论抽到什么，都请细读综合解读——在线三符文占卜里，三枚石头之间的呼应，往往比单枚的含义更重要。",
        ],
      },
      {
        heading: "如何解读你的免费符文占卜结果？",
        paragraphs: [
          "从关键词开始。结果中每枚符文都配有三四个核心词——先把它们对着你的问题品一品，再读全文。往往有一个词会瞬间击中你，那条线头就是答案所在。然后读解读与建议；建议刻意写得具体，因为符文本就是做决定的工具，不是装饰品。",
          "抽到逆位不必慌张。逆位不是诅咒，而是信息：逆位的哈加拉兹可能意味着动荡已经过去；逆位的费胡也许在提醒钱财正从疏忽中流失。把逆位当作一个敢早说难听话的老朋友。最后，把每次占卜记下来。早晨看似晦涩的结果，一周后重读常常豁然开朗——坚持记录，正是从随手一抽到真正掌握符文的桥梁。",
        ],
      },
    ] as SeoSection[],
    faq: [
      {
        q: "这个符文占卜真的是免费的吗？",
        a: "是的，完全免费的在线卢恩符文占卜——无需注册、无需邮箱、不限次数。单符文和三符文牌阵都免费，链接的每篇符文详解文章也都免费可读。",
      },
      {
        q: "在线占卜和掷实体符文石有区别吗？",
        a: "机制完全相同：24 枚老弗萨克符文随机洗乱后抽取，正逆位也按次随机决定。我们使用加密级安全随机数，公平性不输手在布袋里摸石。多数占卜者也认同：答案的分量来自你提出的问题与投入的专注，而非石头的材质。",
      },
      {
        q: "单符文和三符文占卜有什么区别？",
        a: "单符文给出一条聚焦讯息，适合每日指引或快速提问；三符文将石头落入过去、现在、未来三个位置，呈现事情的根源、现状与走向。简单的问题抽一枚，有来龙去脉的处境抽三枚。",
      },
      {
        q: "抽到逆位是不是代表坏事？",
        a: "不一定。逆位（merkstave）通常表示该符文的能量被阻滞、延迟、转向内在或与你的利益相逆——是提醒与细微差别，而非厄运。有些符文上下对称、永不逆位，永远按正位解读。",
      },
      {
        q: "对答案不满意可以重新占卜吗？",
        a: "次数没有限制，但为同一个问题反复抽取、直到出现满意答案，就失去了占卜的意义。符文偏爱诚实：认真对待第一个答案，把它记下来，等有了新的问题或事情真正有了进展再来。",
      },
    ] as FaqItem[],
  },

  tw: {
    back:              "返回",
    pageTitle:         "免費盧恩符文占卜",
    pageSubtitle1:     "RUNE CASTING · 老弗薩克神諭",
    pageSubtitle2:     "擲出古老的北歐符文，傾聽石頭的回答",
    howToTitle:        "如何使用",
    howToSteps: [
      "選擇牌陣——單符文每日指引，或三符文「過去 / 現在 / 未來」",
      "一鍵擲出符文",
      "閱讀每枚符文的含義與整體訊息",
    ],
    modeLabel:         "— 選擇占卜方式 —",
    singleName:        "單符文指引",
    singleSubtitle:    "奧丁之眼",
    singleTags:        ["每日指引", "是/否疑問", "快速洞見"],
    threeName:         "三符文占卜",
    threeSubtitle:     "過去 · 現在 · 未來",
    threeTags:         ["諾倫三女神", "事情根源", "未來走向"],
    singleDesc:        "一枚符文，一條訊息——適合每日一抽或聚焦的問題。",
    threeDesc:         "三枚符文揭示事情的過去根源、當下狀態與未來走向。",
    focusHint:         "在心中默念你的問題，然後擲出符文。",
    castBtn:           "擲出符文",
    castingText:       "符文石正在洗牌…",
    inputNote:         "* 免費線上盧恩符文占卜 · 無需註冊信箱 · 僅供指引與娛樂",
    resultEyebrow:     "你的占卜",
    deepDiveTitle:     "深入了解你抽到的符文",
    readRuneArticle:   (name: string) => `閱讀完整指南：${name} 符文詳解 →`,
    guideLink:         "初學符文？先讀《老弗薩克符文指南》→",
    fullAppCta:        "體驗完整 RuneWhisper 儀式（冥想注入 + 符文石卡片）→",
    faqTitle:          "免費盧恩符文占卜常見問題",
    seo: [
      {
        heading: "什麼是盧恩符文占卜？",
        paragraphs: [
          "盧恩符文占卜是一種藉助老弗薩克（Elder Futhark）符文的占卜方式。老弗薩克是約兩千年前日耳曼與北歐民族使用的最古老如尼字母，24 個符號曾刻在石頭、木頭與獸骨上。每個符文都遠不止是一個字母：費胡（Fehu）談財富與流動，阿爾吉茲（Algiz）談守護，伊薩（Isa）談靜止，達加茲（Dagaz）談破曉與突破。占卜時，你帶著一個問題或處境，將符文洗亂後抽取，抽到的符文就像一面鏡子，照見你當下生活的真實狀態。",
          "與塔羅或神諭卡相比，符文的氣質截然不同：簡潔、堅硬、直接——少一分敘事，多一分決斷。北歐神話中，奧丁倒吊在世界樹尤克特拉希爾上九夜，以矛刺身，才換來符文的知識。這個起源決定了符文占卜自古就被視為鄭重之事：那是與命運的對話，而不是茶餘飯後的把戲。",
          "免費線上符文占卜與擲實體石頭遵循同一邏輯：心中默念問題，洗亂 24 枚符文，抽取一枚或三枚。改變的只是媒介——不再是布袋裡的刻石，而是螢幕上的即時、私密的抽取。",
        ],
      },
      {
        heading: "線上符文抽取是如何運作的？",
        paragraphs: [
          "本工具使用完整的老弗薩克 24 符文。當你點擊「擲出符文」，符文會經過加密級安全隨機洗牌——相當於把布袋裡的石頭搖勻再傾倒。三符文占卜採用不放回抽取，同一個牌陣裡不會出現重複的符文，與實體占卜完全一致。",
          "每次抽取還會決定方向。多數符文可能是正位或逆位（又稱 merkstave）：正位代表能量順暢表達——成長、行動、清明；逆位則指向同一能量被阻滯、延遲、內化或與你相逆。少數符文（如伊薩、吉博）顛倒後形狀不變，永遠按正位解讀，這也符合傳統做法。",
          "結果會展示每枚符文的名稱、字形、關鍵詞、正逆位、白話解讀與具體建議。占卜結果下方還附有深入閱讀的連結：一篇寫給初學者的老弗薩克總覽指南，以及 24 篇逐符文詳解——讓一次免費線上占卜成為真正學習的起點，而不是看過就忘的籤文。",
        ],
      },
      {
        heading: "單符文 vs 三符文：該選哪一種？",
        paragraphs: [
          "單符文占卜——又稱「奧丁之眼」——只抽一枚石頭，給一條訊息。最適合早晨的每日一抽、做決定前的快速確認，或一個是/否式的聚焦問題。只有一枚符文時，答案無處可藏，關鍵詞往往準得驚人。",
          "三符文占卜抽三枚石頭，落入「過去、現在、未來」三個位置——以北歐神話中編織命運的三位諾倫女神命名。第一枚揭示事情的根源：它因何而起；第二枚呈現你當下的處境；第三枚指出若一切照舊，能量將流向何方。當問題背後有一段故事時——一段關係、一次職業變動、一場醞釀已久的衝突——選三符文。",
          "一個簡單的判斷標準：能用一句話說清的問題，抽一枚；有一段繞不開的過去，抽三枚。無論抽到什麼，都請細讀綜合解讀——線上三符文占卜裡，三枚石頭之間的呼應，往往比單枚的含義更重要。",
        ],
      },
      {
        heading: "如何解讀你的免費符文占卜結果？",
        paragraphs: [
          "從關鍵詞開始。結果中每枚符文都配有三四個核心詞——先把它們對著你的問題品一品，再讀全文。往往有一個詞會瞬間擊中你，那條線頭就是答案所在。然後讀解讀與建議；建議刻意寫得具體，因為符文本就是做決定的工具，不是裝飾品。",
          "抽到逆位不必慌張。逆位不是詛咒，而是資訊：逆位的哈加拉茲可能意味著動盪已經過去；逆位的費胡也許在提醒錢財正從疏忽中流失。把逆位當作一個敢早說難聽話的老朋友。最後，把每次占卜記下來。早晨看似晦澀的結果，一週後重讀常常豁然開朗——堅持記錄，正是從隨手一抽到真正掌握符文的橋樑。",
        ],
      },
    ] as SeoSection[],
    faq: [
      {
        q: "這個符文占卜真的是免費的嗎？",
        a: "是的，完全免費的線上盧恩符文占卜——無需註冊、無需信箱、不限次數。單符文和三符文牌陣都免費，連結的每篇符文詳解文章也都免費可讀。",
      },
      {
        q: "線上占卜和擲實體符文石有區別嗎？",
        a: "機制完全相同：24 枚老弗薩克符文隨機洗亂後抽取，正逆位也按次隨機決定。我們使用加密級安全隨機數，公平性不輸手在布袋裡摸石。多數占卜者也認同：答案的分量來自你提出的問題與投入的專注，而非石頭的材質。",
      },
      {
        q: "單符文和三符文占卜有什麼區別？",
        a: "單符文給出一條聚焦訊息，適合每日指引或快速提問；三符文將石頭落入過去、現在、未來三個位置，呈現事情的根源、現狀與走向。簡單的問題抽一枚，有來龍去脈的處境抽三枚。",
      },
      {
        q: "抽到逆位是不是代表壞事？",
        a: "不一定。逆位（merkstave）通常表示該符文的能量被阻滯、延遲、轉向內在或與你的利益相逆——是提醒與細微差別，而非厄運。有些符文上下對稱、永不逆位，永遠按正位解讀。",
      },
      {
        q: "對答案不滿意可以重新占卜嗎？",
        a: "次數沒有限制，但為同一個問題反覆抽取、直到出現滿意答案，就失去了占卜的意義。符文偏愛誠實：認真對待第一個答案，把它記下來，等有了新的問題或事情真正有了進展再來。",
      },
    ] as FaqItem[],
  },
};

export type RuneT = (typeof T)["en"];
