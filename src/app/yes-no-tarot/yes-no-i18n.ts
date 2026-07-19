// ── 是与否塔罗（Yes or No Tarot）· 三语 UI 文案 + SEO 内容 ──────
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
    pageTitle:         "Yes or No Tarot",
    pageSubtitle1:     "YES NO TAROT · Instant Answer",
    pageSubtitle2:     "One question, one draw — a clear yes, no, or maybe",
    // 提问区
    inputTitle:        "Ask your yes or no question",
    inputSubtitle1:    "Hold a clear, specific question in your mind —",
    inputSubtitle2:    "the cards will lean yes, no, or maybe",
    questionLabel:     "Your question (optional)",
    questionPlaceholder: "e.g. Should I accept the new job offer?",
    modeLabel:         "Choose your draw",
    modeSingle:        "1 Card",
    modeSingleDesc:    "Quick, direct answer",
    modeThree:         "3 Cards",
    modeThreeDesc:     "Majority vote + deeper context",
    drawBtn:           "Shuffle & Reveal My Answer",
    shuffling:         "Shuffling the deck…",
    inputNote:         "* Free yes no tarot reading · Upright leans Yes, reversed leans No · For reflection & entertainment",
    // 如何使用
    howToTitle:        "How to use",
    howToSteps:        [
      "Focus on a yes-or-no question — optionally type it in below",
      "Choose a single card or a three-card draw",
      "Receive a Yes, No or Maybe answer with the card's meaning",
    ] as string[],
    // 结果区
    resultEyebrow:     "THE CARDS SAY",
    verdict:           { yes: "YES", no: "NO", maybe: "MAYBE" } as Record<string, string>,
    verdictIcon:       { yes: "✦", no: "✧", maybe: "☽" } as Record<string, string>,
    yourQuestion:      "Your question",
    upright:           "Upright",
    reversed:          "Reversed",
    leans:             "leans",
    positions3:        ["Situation", "Hidden factor", "Likely outcome"] as string[],
    whyLabel:          "Why the cards answered this way",
    summary:           {
      yes:   "The energy around your question is supportive. The cards lean toward Yes — if you act with the card's advice in mind, conditions favor moving forward.",
      no:    "The cards lean toward No for now. This isn't a punishment — it's a signal that timing, preparation, or the approach itself may need to change before this can become a Yes.",
      maybe: "The cards sit on the fence: Maybe. Something about this question is still undecided — a missing piece of information, a choice you haven't made yet, or timing that isn't ripe. Clarify the question and ask again later.",
    } as Record<string, string>,
    disclaimerNote:    "How this works: upright cards lean Yes, reversed cards lean No, and a few contemplative cards (like The High Priestess or The Hanged Man) mean Maybe — the traditional yes/no tarot convention. Treat the answer as a mirror for your own intuition, not a command.",
    redrawBtn:         "Ask Another Question",
    ctaTarot:          "Get a full AI tarot reading — love, career, past · present · future →",
    articleQuick:      "Read: Quick Yes/No Tarot Methods That Actually Work →",
    articleEvery:      "Read: Yes or No? What Every Tarot Card Means →",
    // SEO 内容区
    faqTitle:          "Yes or No Tarot FAQ",
    seo: [
      {
        heading: "What Is Yes or No Tarot?",
        paragraphs: [
          "Yes or no tarot is the simplest form of tarot reading: instead of a complex spread, you ask one focused question that can be answered with yes, no, or maybe, then draw a card (or three) and read its orientation. It's the format people reach for when they don't want a full psychological profile — they want a nudge. Should I send the message? Is now the time to quit? Will this move work out? A yes no tarot reading strips the tarot down to its most decisive layer.",
          "The convention is straightforward. Every tarot card carries an upright and a reversed meaning. In yes/no readings, a card drawn upright is read as a lean toward Yes — its energy is flowing freely and supports action. A card drawn reversed (upside down) is read as a lean toward No — the energy is blocked, delayed, or distorted. A small group of contemplative cards, such as The High Priestess, The Hanged Man, The Moon, or the Two of Swords, are traditionally read as Maybe regardless of orientation, because their whole message is that the situation is not yet decided.",
          "Our free yes no tarot tool follows exactly this convention. You focus on your question, the deck of 78 Rider-Waite cards is shuffled, and your draw is evaluated by orientation: upright leans yes, reversed leans no, and the classic 'undecided' cards answer maybe. No sign-up, no email, no cost — just a fast, honest reflection tool.",
        ],
      },
      {
        heading: "How This Free Yes No Tarot Reading Works",
        paragraphs: [
          "You can choose between two draw styles. The one-card draw is the classic quick answer: a single card is pulled from the shuffled deck, and its orientation gives you a direct yes, no, or maybe. It's ideal for small, everyday decisions and for moments when you want the tarot's gut reaction without ceremony.",
          "The three-card draw adds nuance. Three cards are pulled and each one votes — yes, no, or maybe — and the majority becomes your answer. A 2-to-1 result is worth reading closely: it tells you the answer leans one way but carries a caveat, which is exactly what the disagreeing card describes. Many readers prefer the three-card yes no tarot reading precisely because it shows the tension inside the situation instead of flattening it.",
          "Is this yes no tarot accurate? Free tools like this one are best understood as a mirror, not an oracle. The cards don't predict a fixed future — they reflect the energy, fears, and hopes you bring to the question. A 'No' often names what you already suspected; a 'Yes' often confirms what you were afraid to want. Use the answer to clarify your own thinking, and read each card's short explanation to see why it leaned the way it did.",
        ],
      },
      {
        heading: "How to Ask Good Yes or No Tarot Questions",
        paragraphs: [
          "The quality of a yes/no answer depends almost entirely on the quality of the question. Good yes or no tarot questions are specific, actionable, and about one thing only. 'Should I accept the job offer in Berlin?' works. 'What about my career?' doesn't — the cards can't answer a topic, only a decision.",
          "Frame questions around your own agency rather than other people's thoughts. 'Should I reach out to him?' is answerable; 'Does he miss me?' invites projection. Adding a timeframe sharpens the reading further: 'Is this a good month to launch my shop?' gives the cards a defined window to speak into.",
          "A few practical rules: ask one question at a time, avoid stacking two questions with 'and', and don't re-ask the same question immediately because you disliked the first answer — that turns the reading into noise. If the answer surprises you, sit with it for a day. Often the emotional jolt you feel when the card lands is the real reading: it shows you what you were hoping for all along.",
        ],
      },
      {
        heading: "When to Use Yes/No Tarot — and When to Go Deeper",
        paragraphs: [
          "Yes or no tarot shines for quick, bounded decisions: sending the email, booking the trip, accepting the date, signing before Friday. It's fast, decisive, and easy to interpret. But some questions deserve more than a single verdict. Questions about love dynamics, career direction, or recurring life patterns are layered — a flat 'yes' or 'no' can hide the part that actually matters: the why.",
          "That's when a full spread serves you better. A three-card past-present-future reading or a domain-specific AI reading can show the forces behind the answer, the obstacle in the way, and the likely trajectory if you act. Think of yes/no tarot as the headline and a full tarot reading as the article.",
          "A healthy habit many experienced readers follow: use the yes/no draw to make the small call quickly, then journal about why the answer felt right or wrong. Over time this trains your intuition far better than any single reading can. And if you want to understand the deeper meaning of any card you drew — including its love, career, and finance meanings — every card links to a full guide in our tarot library.",
        ],
      },
    ] as SeoSection[],
    faq: [
      {
        q: "Is this yes no tarot reading really free?",
        a: "Yes — completely free, with no sign-up and no email required. Ask your question, shuffle, and get your yes, no, or maybe instantly. You can redraw for a new question as often as you like.",
      },
      {
        q: "How accurate is a yes or no tarot reading?",
        a: "Treat it as a reflection tool rather than a prophecy. The cards mirror the energy you bring to the question — a 'No' often names what you already suspected, and a 'Yes' confirms what you were afraid to want. It's accurate at clarifying your own intuition, which is what most people are actually looking for.",
      },
      {
        q: "How does the yes / no / maybe decision work?",
        a: "We follow the traditional convention: a card drawn upright leans Yes, a reversed card leans No, and a few contemplative cards — The High Priestess, The Hanged Man, The Moon, Two of Swords, Four of Swords, Seven of Cups — read as Maybe. In a three-card draw, the majority decides; a mixed result means the answer carries a caveat.",
      },
      {
        q: "What makes a good yes or no tarot question?",
        a: "Specific, actionable, and single-topic: 'Should I accept the Berlin job offer?' beats 'What about my career?'. Frame it around your own choices, add a timeframe when relevant, and avoid joining two questions with 'and'.",
      },
      {
        q: "Can I ask the same question again if I don't like the answer?",
        a: "You can, but you shouldn't — re-asking immediately turns the reading into noise. If an answer stings, that's information: it shows you what you were hoping for. Wait until the situation genuinely changes, then ask again.",
      },
    ] as FaqItem[],
  },

  zh: {
    back:              "返回",
    pageTitle:         "是与否塔罗",
    pageSubtitle1:     "YES NO TAROT · 即时答案",
    pageSubtitle2:     "一个问题，一次抽牌——清晰的是、否或待定",
    inputTitle:        "默念你的是否问题",
    inputSubtitle1:    "在心中默想一个清晰、具体的问题——",
    inputSubtitle2:    "塔罗牌将给出是、否或待定的倾向",
    questionLabel:     "你的问题（可选）",
    questionPlaceholder: "例如：我该接受这份新工作吗？",
    modeLabel:         "选择抽牌方式",
    modeSingle:        "单张牌",
    modeSingleDesc:    "快速直接的答案",
    modeThree:         "三张牌",
    modeThreeDesc:     "多数表决 + 更丰富的背景",
    drawBtn:           "洗牌并揭示我的答案",
    shuffling:         "正在洗牌…",
    inputNote:         "* 免费是非塔罗占卜 · 正位偏向「是」，逆位偏向「否」 · 仅供反思与娱乐",
    howToTitle:        "如何使用",
    howToSteps:        [
      "在心中默想一个是非问题——也可以在下方输入",
      "选择抽一张牌，或抽三张牌",
      "得到「是」「否」或「待定」的答案及牌面含义",
    ] as string[],
    resultEyebrow:     "塔罗牌的回答",
    verdict:           { yes: "是", no: "否", maybe: "待定" } as Record<string, string>,
    verdictIcon:       { yes: "✦", no: "✧", maybe: "☽" } as Record<string, string>,
    yourQuestion:      "你的问题",
    upright:           "正位",
    reversed:          "逆位",
    leans:             "偏向",
    positions3:        ["现状", "隐藏因素", "可能走向"] as string[],
    whyLabel:          "牌面为何这样回答",
    summary:           {
      yes:   "围绕这个问题的能量是支持的。牌面偏向「是」——带着牌的建议去行动，形势对你有利。",
      no:    "牌面暂时偏向「否」。这不是惩罚，而是提醒：时机、准备或方式可能需要调整，它才有机会变成「是」。",
      maybe: "牌面骑墙：待定。说明这件事还有未定的变量——缺失的信息、你还没做的选择、或尚未成熟的时机。澄清问题后，过段时间再问一次。",
    } as Record<string, string>,
    disclaimerNote:    "判定规则：正位偏向「是」，逆位偏向「否」，少数内省类牌（如女祭司、倒吊人）无论正逆位都读作「待定」——这是是非塔罗的通行惯例。请把答案当作照见自己直觉的镜子，而非命令。",
    redrawBtn:         "再问一个问题",
    ctaTarot:          "试试完整 AI 塔罗占卜——爱情、事业、过去·现在·未来 →",
    articleQuick:      "延伸阅读：真正好用的快速是非塔罗法 →",
    articleEvery:      "延伸阅读：每张塔罗牌的是与否含义 →",
    faqTitle:          "是与否塔罗常见问题",
    seo: [
      {
        heading: "什么是是与否塔罗（Yes or No Tarot）？",
        paragraphs: [
          "是与否塔罗是最简单的塔罗占卜形式：不做复杂牌阵，只问一个能用「是、否、待定」回答的聚焦问题，然后抽一张（或三张）牌，看牌的正逆位。当人们不想要一整套心理画像、只想要一个推动时，就会用它。该不该发那条消息？现在是辞职的时机吗？这次搬家会顺利吗？是非塔罗把塔罗压缩到最有决断力的一层。",
          "规则很直接：每张塔罗牌都有正位与逆位两种含义。是非占卜中，正位牌读作偏向「是」——能量顺畅流动，支持行动；逆位牌（倒置）读作偏向「否」——能量受阻、延迟或扭曲。还有一小组内省类牌，如女祭司、倒吊人、月亮、宝剑二，无论正逆位传统上都读作「待定」，因为它们的核心讯息就是：事情尚未定局。",
          "我们的免费是非塔罗工具严格遵循这套惯例：默想你的问题，78 张韦特塔罗牌洗匀后抽出，按正逆位判定——正位偏是、逆位偏否、经典的「未定」牌答待定。无需注册、无需邮箱、完全免费，只是一个快速而诚实的反思工具。",
        ],
      },
      {
        heading: "这个免费是非塔罗占卜如何运作？",
        paragraphs: [
          "你可以选择两种抽牌方式。单张牌是经典的快速答案：从洗好的牌堆抽一张，按正逆位直接给出是、否或待定，适合日常小决定和想要塔罗「直觉反应」的时刻。",
          "三张牌则更有层次：抽三张牌各自表决——是、否或待定——多数派即为答案。2 比 1 的结果值得细读：它说明答案虽有倾向但带有保留，而保留的内容正是那张「反对票」所描述的。很多占卜师偏爱三张是非牌阵，正是因为它能呈现局势内部的张力，而不是把它压平。",
          "这个是非塔罗准吗？这类免费工具最好被理解为一面镜子，而非神谕。牌并不预测固定的未来——它映照的是你带到问题里的能量、恐惧与期待。「否」往往说出了你早已怀疑的事；「是」往往确认了你不敢承认的渴望。用答案来澄清自己的思路，并读一读每张牌的简短解读，看看它为何这样倾斜。",
        ],
      },
      {
        heading: "如何问出好的是非塔罗问题？",
        paragraphs: [
          "是非答案的质量几乎完全取决于问题的质量。好的是非问题要具体、可行动、只谈一件事。「我该接受柏林那份工作吗？」可以；「我的事业会怎样？」不行——牌无法回答一个话题，只能回答一个决定。",
          "尽量围绕自己的行动提问，而不是揣测别人的想法。「我该主动联系他吗？」是可回答的；「他有没有想我？」只会引发投射。加上时间范围会让占卜更清晰：「这个月适合开店吗？」给了牌一个明确的窗口。",
          "几个实用原则：一次只问一个问题；不要用「和」把两个问题叠在一起；不要因为不喜欢第一个答案就立刻重问——那会把占卜变成噪音。如果答案让你意外，放一天再消化。牌落下时你心头那一震，往往才是真正的答案：它让你看清自己一直想要什么。",
        ],
      },
      {
        heading: "什么时候用是非塔罗，什么时候该深入？",
        paragraphs: [
          "是非塔罗适合快速、边界清晰的决定：发不发邮件、订不订机票、赴不赴约、周五前签不签。它快速、果断、好解读。但有些问题值得比一个判定更多——关于感情走向、职业方向或反复出现的人生模式，一个扁平的「是」或「否」可能恰好遮住了最重要的部分：为什么。",
          "这时完整牌阵更有帮助。过去-现在-未来三张牌或特定领域的 AI 解读，能呈现答案背后的力量、挡路的障碍，以及行动后的可能轨迹。可以把是非塔罗看作标题，完整塔罗解读才是正文。",
          "很多资深占卜师的习惯是：用是非抽牌快速做小决定，然后写下为什么这个答案让你安心或不安。长期这样练习，对直觉的训练胜过任何单次占卜。如果你想深入了解抽到的任何一张牌——包括它在爱情、事业、财运上的含义——每张牌都链接着我们塔罗牌库里的完整指南。",
        ],
      },
    ] as SeoSection[],
    faq: [
      {
        q: "这个是非塔罗占卜真的免费吗？",
        a: "完全免费——无需注册、无需邮箱。默念问题、洗牌，立刻得到是、否或待定的答案。换新问题想抽多少次都可以。",
      },
      {
        q: "是与否塔罗占卜准吗？",
        a: "把它当作反思工具而非预言。牌映照的是你带到问题中的能量——「否」往往说出你早已怀疑的事，「是」往往确认你不敢承认的渴望。它擅长澄清你的直觉，而这正是大多数人真正想要的。",
      },
      {
        q: "是 / 否 / 待定是怎么判定的？",
        a: "遵循通行惯例：正位偏「是」，逆位偏「否」，少数内省类牌——女祭司、倒吊人、月亮、宝剑二、宝剑四、圣杯七——读作「待定」。三张牌时多数表决；结果不一致说明答案带有保留。",
      },
      {
        q: "什么样的问题是好的是非塔罗问题？",
        a: "具体、可行动、只谈一件事：「我该接受柏林那份工作吗？」胜过「我的事业会怎样？」。围绕自己的选择提问，相关时加上时间范围，不要用「和」叠两个问题。",
      },
      {
        q: "不喜欢答案可以重新问同一个问题吗？",
        a: "可以，但不建议——立刻重问会把占卜变成噪音。如果某个答案让你难受，那本身就是信息：它让你看清自己期待什么。等局势真正变化后再问。",
      },
    ] as FaqItem[],
  },

  tw: {
    back:              "返回",
    pageTitle:         "是與否塔羅",
    pageSubtitle1:     "YES NO TAROT · 即時答案",
    pageSubtitle2:     "一個問題，一次抽牌——清晰的是、否或待定",
    inputTitle:        "默念你的是非問題",
    inputSubtitle1:    "在心中默想一個清晰、具體的問題——",
    inputSubtitle2:    "塔羅牌將給出是、否或待定的傾向",
    questionLabel:     "你的問題（可選）",
    questionPlaceholder: "例如：我該接受這份新工作嗎？",
    modeLabel:         "選擇抽牌方式",
    modeSingle:        "單張牌",
    modeSingleDesc:    "快速直接的答案",
    modeThree:         "三張牌",
    modeThreeDesc:     "多數表決 + 更豐富的背景",
    drawBtn:           "洗牌並揭示我的答案",
    shuffling:         "正在洗牌…",
    inputNote:         "* 免費是非塔羅占卜 · 正位偏向「是」，逆位偏向「否」 · 僅供反思與娛樂",
    howToTitle:        "如何使用",
    howToSteps:        [
      "在心中默想一個是非問題——也可以在下方輸入",
      "選擇抽一張牌，或抽三張牌",
      "得到「是」「否」或「待定」的答案及牌面含義",
    ] as string[],
    resultEyebrow:     "塔羅牌的回答",
    verdict:           { yes: "是", no: "否", maybe: "待定" } as Record<string, string>,
    verdictIcon:       { yes: "✦", no: "✧", maybe: "☽" } as Record<string, string>,
    yourQuestion:      "你的問題",
    upright:           "正位",
    reversed:          "逆位",
    leans:             "偏向",
    positions3:        ["現狀", "隱藏因素", "可能走向"] as string[],
    whyLabel:          "牌面為何這樣回答",
    summary:           {
      yes:   "圍繞這個問題的能量是支持的。牌面偏向「是」——帶著牌的建議去行動，形勢對你有利。",
      no:    "牌面暫時偏向「否」。這不是懲罰，而是提醒：時機、準備或方式可能需要調整，它才有機會變成「是」。",
      maybe: "牌面騎牆：待定。說明這件事還有未定的變數——缺失的資訊、你還沒做的選擇、或尚未成熟的時機。澄清問題後，過段時間再問一次。",
    } as Record<string, string>,
    disclaimerNote:    "判定規則：正位偏向「是」，逆位偏向「否」，少數內省類牌（如女祭司、倒吊人）無論正逆位都讀作「待定」——這是是非塔羅的通行慣例。請把答案當作照見自己直覺的鏡子，而非命令。",
    redrawBtn:         "再問一個問題",
    ctaTarot:          "試試完整 AI 塔羅占卜——愛情、事業、過去·現在·未來 →",
    articleQuick:      "延伸閱讀：真正好用的快速是非塔羅法 →",
    articleEvery:      "延伸閱讀：每張塔羅牌的是與否含義 →",
    faqTitle:          "是與否塔羅常見問題",
    seo: [
      {
        heading: "什麼是是與否塔羅（Yes or No Tarot）？",
        paragraphs: [
          "是與否塔羅是最簡單的塔羅占卜形式：不做複雜牌陣，只問一個能用「是、否、待定」回答的聚焦問題，然後抽一張（或三張）牌，看牌的正逆位。當人們不想要一整套心理畫像、只想要一個推動時，就會用它。該不該發那則訊息？現在是辭職的時機嗎？這次搬家會順利嗎？是非塔羅把塔羅壓縮到最有決斷力的一層。",
          "規則很直接：每張塔羅牌都有正位與逆位兩種含義。是非占卜中，正位牌讀作偏向「是」——能量順暢流動，支持行動；逆位牌（倒置）讀作偏向「否」——能量受阻、延遲或扭曲。還有一小組內省類牌，如女祭司、倒吊人、月亮、寶劍二，無論正逆位傳統上都讀作「待定」，因為它們的核心訊息就是：事情尚未定局。",
          "我們的免費是非塔羅工具嚴格遵循這套慣例：默想你的問題，78 張偉特塔羅牌洗勻後抽出，按正逆位判定——正位偏是、逆位偏否、經典的「未定」牌答待定。無需註冊、無需信箱、完全免費，只是一個快速而誠實的反思工具。",
        ],
      },
      {
        heading: "這個免費是非塔羅占卜如何運作？",
        paragraphs: [
          "你可以選擇兩種抽牌方式。單張牌是經典的快速答案：從洗好的牌堆抽一張，按正逆位直接給出是、否或待定，適合日常小決定和想要塔羅「直覺反應」的時刻。",
          "三張牌則更有層次：抽三張牌各自表決——是、否或待定——多數派即為答案。2 比 1 的結果值得細讀：它說明答案雖有傾向但帶有保留，而保留的內容正是那張「反對票」所描述的。很多占卜師偏愛三張是非牌陣，正是因為它能呈現局勢內部的張力，而不是把它壓平。",
          "這個是非塔羅準嗎？這類免費工具最好被理解為一面鏡子，而非神諭。牌並不預測固定的未來——它映照的是你帶到問題裡的能量、恐懼與期待。「否」往往說出了你早已懷疑的事；「是」往往確認了你不敢承認的渴望。用答案來澄清自己的思路，並讀一讀每張牌的簡短解讀，看看它為何這樣傾斜。",
        ],
      },
      {
        heading: "如何問出好的是非塔羅問題？",
        paragraphs: [
          "是非答案的品質幾乎完全取決於問題的品質。好的是非問題要具體、可行動、只談一件事。「我該接受柏林那份工作嗎？」可以；「我的事業會怎樣？」不行——牌無法回答一個話題，只能回答一個決定。",
          "盡量圍繞自己的行動提問，而不是揣測別人的想法。「我該主動聯絡他嗎？」是可回答的；「他有沒有想我？」只會引發投射。加上時間範圍會讓占卜更清晰：「這個月適合開店嗎？」給了牌一個明確的窗口。",
          "幾個實用原則：一次只問一個問題；不要用「和」把兩個問題疊在一起；不要因為不喜歡第一個答案就立刻重問——那會把占卜變成噪音。如果答案讓你意外，放一天再消化。牌落下時你心頭那一震，往往才是真正的答案：它讓你看清自己一直想要什麼。",
        ],
      },
      {
        heading: "什麼時候用是非塔羅，什麼時候該深入？",
        paragraphs: [
          "是非塔羅適合快速、邊界清晰的決定：發不發郵件、訂不訂機票、赴不赴約、週五前簽不簽。它快速、果斷、好解讀。但有些問題值得比一個判定更多——關於感情走向、職業方向或反覆出現的人生模式，一個扁平的「是」或「否」可能恰好遮住了最重要的部分：為什麼。",
          "這時完整牌陣更有幫助。過去-現在-未來三張牌或特定領域的 AI 解讀，能呈現答案背後的力量、擋路的障礙，以及行動後的可能軌跡。可以把是非塔羅看作標題，完整塔羅解讀才是正文。",
          "很多資深占卜師的習慣是：用是非抽牌快速做小決定，然後寫下為什麼這個答案讓你安心或不安。長期這樣練習，對直覺的訓練勝過任何單次占卜。如果你想深入了解抽到的任何一張牌——包括它在愛情、事業、財運上的含義——每張牌都連結著我們塔羅牌庫裡的完整指南。",
        ],
      },
    ] as SeoSection[],
    faq: [
      {
        q: "這個是非塔羅占卜真的免費嗎？",
        a: "完全免費——無需註冊、無需信箱。默念問題、洗牌，立刻得到是、否或待定的答案。換新問題想抽多少次都可以。",
      },
      {
        q: "是與否塔羅占卜準嗎？",
        a: "把它當作反思工具而非預言。牌映照的是你帶到問題中的能量——「否」往往說出你早已懷疑的事，「是」往往確認你不敢承認的渴望。它擅長澄清你的直覺，而這正是大多數人真正想要的。",
      },
      {
        q: "是 / 否 / 待定是怎麼判定的？",
        a: "遵循通行慣例：正位偏「是」，逆位偏「否」，少數內省類牌——女祭司、倒吊人、月亮、寶劍二、寶劍四、聖杯七——讀作「待定」。三張牌時多數表決；結果不一致說明答案帶有保留。",
      },
      {
        q: "什麼樣的問題是好的是非塔羅問題？",
        a: "具體、可行動、只談一件事：「我該接受柏林那份工作嗎？」勝過「我的事業會怎樣？」。圍繞自己的選擇提問，相關時加上時間範圍，不要用「和」疊兩個問題。",
      },
      {
        q: "不喜歡答案可以重新問同一個問題嗎？",
        a: "可以，但不建議——立刻重問會把占卜變成噪音。如果某個答案讓你難受，那本身就是資訊：它讓你看清自己期待什麼。等局勢真正變化後再問。",
      },
    ] as FaqItem[],
  },
};

export type YesNoT = (typeof T)["en"];
