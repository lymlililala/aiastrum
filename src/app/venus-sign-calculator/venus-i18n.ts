// ── 金星星座计算器 · 三语 UI 文案 + SEO 内容 ─────────────────────
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
    pageTitle:         "Venus Sign Calculator",
    pageSubtitle1:     "VENUS SIGN · Love Astrology",
    pageSubtitle2:     "Discover how you love, attract, and connect",
    // 使用步骤
    howToTitle:        "How to use",
    howToSteps:        [
      "Enter your birth date — birth time is optional for Venus",
      "Optionally pick your birth city for extra precision",
      "Discover your Venus sign and your love style",
    ],
    // 输入区
    inputTitle:        "Enter your birth details",
    inputSubtitle1:    "Your Venus sign is the zodiac sign Venus was in",
    inputSubtitle2:    "on the day you were born",
    labelYear:         "Year",
    labelMonth:        "Month",
    labelDay:          "Day",
    labelHour:         "Hour",
    labelMinute:       "Min",
    labelCity:         "Birth City (optional)",
    cityPlaceholder:   "Search city… (optional)",
    timeNote:          "Optional — Venus moves only about 1° per day, so your exact birth time barely changes the result.",
    calcBtn:           "Calculate My Venus Sign",
    inputNote:         "* Free venus sign calculator · Approximate astronomical calculation (~1° accuracy) · For exploration and entertainment",
    // 结果区
    resultEyebrow:     "YOUR VENUS SIGN",
    venusIn:           "Venus in",
    degreeLabel:       "Degree",
    elementLabel:      "Element",
    rulerLabel:        "Ruled by",
    interpLabel:       "Your love style",
    altSignNote:       (alt: string) =>
      `Venus was very close to a sign boundary on your birthday, so it may have moved into ${alt} that day. If the reading above doesn't resonate, read the ${alt} interpretation too and trust your gut.`,
    readArticle:       (sign: string) => `Read the full guide: Venus in ${sign} Meaning →`,
    fullChartCta:      "Reveal your full birth chart (Sun, Moon, Rising & all planets) →",
    loveCta:           "Get a free love reading based on your chart →",
    recalcBtn:         "Recalculate",
    // 元信息本地化
    elements:          { fire: "Fire", earth: "Earth", air: "Air", water: "Water" } as Record<string, string>,
    planets:           {
      Sun: "Sun", Moon: "Moon", Mercury: "Mercury", Venus: "Venus", Mars: "Mars",
      Jupiter: "Jupiter", Saturn: "Saturn", Uranus: "Uranus", Neptune: "Neptune", Pluto: "Pluto",
    } as Record<string, string>,
    // SEO 内容区
    faqTitle:          "Venus Sign Calculator FAQ",
    seo: [
      {
        heading: "What Is a Venus Sign?",
        paragraphs: [
          "Your Venus sign is the zodiac sign the planet Venus was passing through on the day you were born. In astrology, Venus is the planet of love, beauty, attraction, and values — so your Venus sign describes how you give and receive love, what you find beautiful, the kind of partner you are drawn to, and what makes you feel valued in a relationship. If your Sun sign is your core identity, your Venus sign is your heart's native language.",
          "Most people know their Sun sign from their birth date alone, but far fewer know their Venus sign — and yet it often explains the things the Sun sign can't. Why a confident Leo falls apart in unrequited love, why an independent Aquarius becomes unexpectedly devoted, why two people with \"compatible\" Sun signs can want completely different things from a relationship. Astrologers reading for love and compatibility almost always look at Venus first.",
          "Venus moves through the zodiac much more slowly than the Moon — it spends roughly three to four weeks in each sign — which is good news: you only need your birth date to find your Venus sign, and your exact birth time rarely matters. That's exactly what this free venus sign calculator computes.",
        ],
      },
      {
        heading: "Venus Sign vs Sun Sign in Love: What's the Difference?",
        paragraphs: [
          "Your Sun sign describes who you are — your ego, vitality, and life direction. Your Venus sign describes how you love — your romantic style, your flirting language, what you need to feel cherished, and the qualities you find irresistible in others. The two can be the same sign, but they are often different, which is why someone can be a bold, self-assured Aries Sun yet a shy, sentimental Pisces in love.",
          "Think of it this way: the Sun is how you shine; Venus is how you bond. Sun-sign compatibility tells you whether two people's life directions mesh; Venus-sign compatibility tells you whether their ways of expressing affection mesh. Long-term relationships usually hinge far more on the latter. A couple with clashing Sun signs but harmonious Venus signs often thrives, while the reverse can feel like speaking different emotional dialects.",
          "For a complete romantic picture, astrologers also look at Mars (desire and pursuit style) and the Moon (emotional needs). But if you only learn one placement beyond your Sun sign for love, make it Venus. Once you know yours here, our full birth chart calculator shows you all of them together.",
        ],
      },
      {
        heading: "How to Find Your Venus Sign with This Calculator",
        paragraphs: [
          "This venus sign calculator uses real astronomical computation, not a simplified date table. When you enter your birth date, we calculate Venus's exact ecliptic longitude for that day using the same planetary ephemeris engine that powers our full birth chart tool, then map that longitude onto the twelve 30-degree slices of the zodiac. Your result shows the sign plus the precise degree and minute of Venus within it.",
          "Birth time and city are optional, and here's why: Venus moves only about one degree per day (compare that to the Moon's thirteen), so a few hours of uncertainty almost never changes the sign. If you do provide a time and city, we convert your local birth time to Universal Time using your city's time zone for maximum precision — useful if you were born on a day when Venus sat within a degree of a sign boundary.",
          "On those rare boundary days, our calculator checks Venus's position at the start and end of your birth date. If Venus changed signs that day, we tell you honestly and show both possibilities, so you can read both interpretations and see which one actually sounds like your love life.",
        ],
      },
      {
        heading: "Why Your Venus Sign Is Worth Knowing",
        paragraphs: [
          "Learning your Venus sign tends to produce a quiet click of recognition. It explains your patterns: the crushes that made no sense on paper, the love languages that leave you cold, the relationship dynamics you keep recreating. A Venus in Scorpio person experiences casual dating as almost physically uncomfortable; a Venus in Sagittarius person experiences clinginess the same way. Neither is wrong — they're just wired differently.",
          "There's practical value too. Knowing your Venus sign helps you articulate what you actually need from a partner, choose dates and gifts that genuinely land, understand why a relationship with a \"perfect on paper\" person fizzled, and read compatibility more intelligently. Each of the twelve Venus signs has its own romantic signature — explore yours in depth with our sign-by-sign Venus in each sign meaning guides, linked in your result.",
        ],
      },
    ] as SeoSection[],
    faq: [
      {
        q: "Is this venus sign calculator free?",
        a: "Yes, completely free — no sign-up, no email required. Enter your birth date and get your Venus sign, degree, and love-style reading instantly. The full birth chart tool it links to is also free.",
      },
      {
        q: "What is my venus sign and why does it matter?",
        a: "Your Venus sign is the zodiac sign Venus occupied when you were born. It describes your romantic style: how you flirt, what you find attractive, how you show affection, and what you need to feel loved. For questions of love and compatibility, many astrologers consider it more revealing than the Sun sign.",
      },
      {
        q: "Do I need my birth time to find my venus sign?",
        a: "No. Venus moves only about 1° per day and stays in each sign for three to four weeks, so your birth date alone determines your Venus sign on almost every day of the year. Birth time and city are optional refinements that only matter if Venus was within ~1° of a sign boundary on your birthday — and our calculator flags that case for you.",
      },
      {
        q: "What's the difference between my venus sign and my sun sign in love?",
        a: "Your Sun sign is your core identity; your Venus sign is your love style. Sun compatibility compares life directions, while Venus compatibility compares how two people express and receive affection — which is usually what makes or breaks a romantic relationship day to day.",
      },
      {
        q: "How accurate is this calculator?",
        a: "Venus's position is computed with an ephemeris-grade approximation accurate to about 1 degree — more than enough to determine the correct sign except when Venus was within ~1° of a sign boundary at your birth. If your result shows 0° or 29°, treat the neighboring sign as a possibility; our boundary-day check will usually tell you.",
      },
    ] as FaqItem[],
  },

  zh: {
    back:              "返回",
    pageTitle:         "金星星座计算器",
    pageSubtitle1:     "VENUS SIGN · 恋爱占星",
    pageSubtitle2:     "发现你爱与被爱的方式",
    // 使用步骤
    howToTitle:        "如何使用",
    howToSteps:        [
      "输入你的出生日期——金星对出生时间没有要求",
      "可选：选择出生城市，结果更精确",
      "查看你的金星星座与恋爱风格",
    ],
    inputTitle:        "输入你的出生信息",
    inputSubtitle1:    "金星星座是你出生那天，",
    inputSubtitle2:    "金星在黄道上所处的星座",
    labelYear:         "年",
    labelMonth:        "月",
    labelDay:          "日",
    labelHour:         "时",
    labelMinute:       "分",
    labelCity:         "出生城市（可选）",
    cityPlaceholder:   "搜索城市…（可选）",
    timeNote:          "可选——金星每天只移动约 1°，出生时间对结果几乎没有影响。",
    calcBtn:           "计算我的金星星座",
    inputNote:         "* 免费金星星座计算 · 天文近似算法（精度约 1°）· 仅供探索与娱乐",
    resultEyebrow:     "你的金星星座",
    venusIn:           "金星落",
    degreeLabel:       "度数",
    elementLabel:      "元素",
    rulerLabel:        "守护星",
    interpLabel:       "你的恋爱风格",
    altSignNote:       (alt: string) =>
      `你生日当天金星非常靠近星座边界，可能已在当天移入${alt}。如果上面的解读不太像你，也读一读${alt}的解读，相信你的直觉。`,
    readArticle:       (sign: string) => `阅读完整指南：金星${sign}的爱情含义 →`,
    fullChartCta:      "查看你的完整星盘（太阳、月亮、上升与全部行星）→",
    loveCta:           "基于你的星盘，获取免费爱情解读 →",
    recalcBtn:         "重新计算",
    elements:          { fire: "火象", earth: "土象", air: "风象", water: "水象" } as Record<string, string>,
    planets:           {
      Sun: "太阳", Moon: "月亮", Mercury: "水星", Venus: "金星", Mars: "火星",
      Jupiter: "木星", Saturn: "土星", Uranus: "天王星", Neptune: "海王星", Pluto: "冥王星",
    } as Record<string, string>,
    faqTitle:          "金星星座计算器常见问题",
    seo: [
      {
        heading: "什么是金星星座？",
        paragraphs: [
          "金星星座，是你出生那天金星在黄道十二宫中所处的星座。在占星学中，金星掌管爱情、美、吸引力与价值观——所以金星星座描述的是你付出与接受爱的方式、你的审美偏好、你容易被什么样的伴侣吸引，以及在关系中什么能让你感到被珍视。如果说太阳星座是你的核心自我，金星星座就是你内心的爱的母语。",
          "大多数人都知道自己的太阳星座，却很少有人知道金星星座——而它恰恰解释了太阳星座解释不了的事：为什么自信的狮子在单恋里溃不成军，为什么独立的水瓶一旦爱上就出乎意料地专一，为什么两个太阳星座「相配」的人在关系里想要的却完全不同。占星师看感情与配对时，几乎总是先看金星。",
          "金星走得很慢——每个星座停留约三到四周——这对你是个好消息：查金星星座只需要出生日期，出生时间几乎不影响结果。这正是这个免费金星星座计算器为你做的事。",
        ],
      },
      {
        heading: "金星星座 vs 太阳星座：在爱情里有什么区别？",
        paragraphs: [
          "太阳星座描述「你是谁」——自我、生命力与人生方向；金星星座描述「你怎么爱」——你的浪漫风格、调情语言、被宠爱的需求，以及你眼中无法抗拒的特质。两者可能同座，但往往不同，所以一个人可以是果敢自信的白羊太阳，在爱情里却是害羞多情的双鱼金星。",
          "可以这么理解：太阳是你如何发光，金星是你如何联结。太阳星座配对看的是两个人生方向是否合拍，金星星座配对看的是表达爱意的方式是否合拍——而长期关系往往取决于后者。太阳相冲但金星和谐的情侣常常过得很好，反过来则像说着两种不同的情感方言。",
          "完整的爱情画像还要看火星（欲望与追求方式）和月亮（情绪需求）。但如果除了太阳星座只学一个与爱情相关的落点，那就是金星。在这里查到你的金星星座后，我们的完整星盘工具可以把它们一次看全。",
        ],
      },
      {
        heading: "如何用这个计算器查询你的金星星座？",
        paragraphs: [
          "本金星星座计算器使用真实的天文计算，而非简化的日期对照表。输入出生日期后，我们用与完整星盘工具相同的行星历表引擎，算出当天金星的精确黄道经度，再映射到黄道十二宫（每宫 30°），给出星座以及金星在星座内的精确度数。",
          "出生时间和城市是可选的，原因在于：金星每天只移动约 1°（月亮是 13°），几个小时的不确定性几乎不会改变星座。如果你提供了时间和城市，我们会按城市时区把本地时间转换为世界时，获得最高精度——只有当你出生在金星距离星座边界 1° 以内的日子，这才真正有影响。",
          "在极少数的边界日，计算器会检查你生日当天 00:00 与 23:59 的金星位置。如果当天跨座，我们会如实告知并给出两种可能，两个解读都看看，哪个更像你的爱情模样。",
        ],
      },
      {
        heading: "为什么值得了解你的金星星座？",
        paragraphs: [
          "查到金星星座的那一刻，很多人会有一种「原来如此」的恍然。它解释了你的模式：那些条件上对不上却让你心动的人、那些让你无感的示爱方式、那些一再重演的关系剧本。金星天蝎的人对随意约会几乎生理性不适；金星射手的人对黏人也是如此——没有对错，只是构造不同。",
          "它也有实用价值：帮你更清楚地表达自己在关系里真正需要什么、送出真正打动对方的约会与礼物、看懂为什么一段「条件完美」的感情无疾而终、更聪明地看配对。十二个金星星座各有自己的浪漫签名——结果页里链接了我们逐星座的金星含义详解，欢迎深入探索。",
        ],
      },
    ] as SeoSection[],
    faq: [
      {
        q: "这个金星星座计算器是免费的吗？",
        a: "完全免费——无需注册、无需邮箱。输入出生日期，立即得到你的金星星座、度数与恋爱风格解读。链接到的完整星盘工具同样免费。",
      },
      {
        q: "我的金星星座是什么？为什么重要？",
        a: "金星星座是你出生时金星所在的黄道星座，描述你的恋爱风格：如何调情、被什么吸引、如何表达爱意、需要什么才能感到被爱。在爱情与配对问题上，很多占星师认为它比太阳星座更有说服力。",
      },
      {
        q: "查金星星座需要出生时间吗？",
        a: "不需要。金星每天只移动约 1°，每个星座停留三到四周，所以一年里几乎所有日子，仅凭出生日期就能确定金星星座。出生时间和城市只是可选的精化项，只有金星在星座边界 1° 以内时才有影响——这种情况计算器会主动提示你。",
      },
      {
        q: "金星星座和太阳星座在爱情里有什么区别？",
        a: "太阳星座是核心自我，金星星座是恋爱风格。太阳配对比较的是人生方向，金星配对比较的是两个人表达与接收爱意的方式——而后者通常才是日常感情成败的关键。",
      },
      {
        q: "这个计算器准吗？",
        a: "金星位置采用历表级近似算法，精度约 1°——足以确定正确星座，除非你出生时金星恰好在星座边界 1° 以内。如果结果显示 0° 或 29°，可以把相邻星座也作为可能；我们的边界日检查通常也会提示。",
      },
    ] as FaqItem[],
  },

  tw: {
    back:              "返回",
    pageTitle:         "金星星座計算器",
    pageSubtitle1:     "VENUS SIGN · 戀愛占星",
    pageSubtitle2:     "發現你愛與被愛的方式",
    // 使用步驟
    howToTitle:        "如何使用",
    howToSteps:        [
      "輸入你的出生日期——金星對出生時間沒有要求",
      "可選：選擇出生城市，結果更精確",
      "查看你的金星星座與戀愛風格",
    ],
    inputTitle:        "輸入你的出生資訊",
    inputSubtitle1:    "金星星座是你出生那天，",
    inputSubtitle2:    "金星在黃道上所處的星座",
    labelYear:         "年",
    labelMonth:        "月",
    labelDay:          "日",
    labelHour:         "時",
    labelMinute:       "分",
    labelCity:         "出生城市（可選）",
    cityPlaceholder:   "搜尋城市…（可選）",
    timeNote:          "可選——金星每天只移動約 1°，出生時間對結果幾乎沒有影響。",
    calcBtn:           "計算我的金星星座",
    inputNote:         "* 免費金星星座計算 · 天文近似演算法（精度約 1°）· 僅供探索與娛樂",
    resultEyebrow:     "你的金星星座",
    venusIn:           "金星落",
    degreeLabel:       "度數",
    elementLabel:      "元素",
    rulerLabel:        "守護星",
    interpLabel:       "你的戀愛風格",
    altSignNote:       (alt: string) =>
      `你生日當天金星非常靠近星座邊界，可能已在當天移入${alt}。如果上面的解讀不太像你，也讀一讀${alt}的解讀，相信你的直覺。`,
    readArticle:       (sign: string) => `閱讀完整指南：金星${sign}的愛情含義 →`,
    fullChartCta:      "查看你的完整星盤（太陽、月亮、上升與全部行星）→",
    loveCta:           "基於你的星盤，取得免費愛情解讀 →",
    recalcBtn:         "重新計算",
    elements:          { fire: "火象", earth: "土象", air: "風象", water: "水象" } as Record<string, string>,
    planets:           {
      Sun: "太陽", Moon: "月亮", Mercury: "水星", Venus: "金星", Mars: "火星",
      Jupiter: "木星", Saturn: "土星", Uranus: "天王星", Neptune: "海王星", Pluto: "冥王星",
    } as Record<string, string>,
    faqTitle:          "金星星座計算器常見問題",
    seo: [
      {
        heading: "什麼是金星星座？",
        paragraphs: [
          "金星星座，是你出生那天金星在黃道十二宮中所處的星座。在占星學中，金星掌管愛情、美、吸引力與價值觀——所以金星星座描述的是你付出與接受愛的方式、你的審美偏好、你容易被什麼樣的伴侶吸引，以及在關係中什麼能讓你感到被珍視。如果說太陽星座是你的核心自我，金星星座就是你內心的愛的母語。",
          "大多數人都知道自已的太陽星座，卻很少有人知道金星星座——而它恰恰解釋了太陽星座解釋不了的事：為什麼自信的獅子在單戀裡潰不成軍，為什麼獨立的水瓶一旦愛上就出乎意料地專一，為什麼兩個太陽星座「相配」的人在關係裡想要的卻完全不同。占星師看感情與配對時，幾乎總是先看金星。",
          "金星走得很慢——每個星座停留約三到四週——這對你是個好消息：查金星星座只需要出生日期，出生時間幾乎不影響結果。這正是這個免費金星星座計算器為你做的事。",
        ],
      },
      {
        heading: "金星星座 vs 太陽星座：在愛情裡有什麼區別？",
        paragraphs: [
          "太陽星座描述「你是誰」——自我、生命力與人生方向；金星星座描述「你怎麼愛」——你的浪漫風格、調情語言、被寵愛的需求，以及你眼中無法抗拒的特質。兩者可能同座，但往往不同，所以一個人可以是果敢自信的白羊太陽，在愛情裡卻是害羞多情的雙魚金星。",
          "可以這麼理解：太陽是你如何發光，金星是你如何連結。太陽星座配對看的是兩個人生方向是否合拍，金星星座配對看的是表達愛意的方式是否合拍——而長期關係往往取決於後者。太陽相沖但金星和諧的情侶常常過得很好，反過來則像說著兩種不同的情感方言。",
          "完整的愛情畫像還要看火星（慾望與追求方式）和月亮（情緒需求）。但如果除了太陽星座只學一個與愛情相關的落點，那就是金星。在這裡查到你的金星星座後，我們的完整星盤工具可以把它們一次看全。",
        ],
      },
      {
        heading: "如何用這個計算器查詢你的金星星座？",
        paragraphs: [
          "本金星星座計算器使用真實的天文計算，而非簡化的日期對照表。輸入出生日期後，我們用與完整星盤工具相同的行星曆表引擎，算出當天金星的精確黃道經度，再對應到黃道十二宮（每宮 30°），給出星座以及金星在星座內的精確度數。",
          "出生時間和城市是可選的，原因在於：金星每天只移動約 1°（月亮是 13°），幾個小時的不確定性幾乎不會改變星座。如果你提供了時間和城市，我們會按城市時區把當地時間轉換為世界時，取得最高精度——只有當你出生在金星距離星座邊界 1° 以內的日子，這才真正有影響。",
          "在極少數的邊界日，計算器會檢查你生日當天 00:00 與 23:59 的金星位置。如果當天跨座，我們會如實告知並給出兩種可能，兩個解讀都看看，哪個更像你的愛情模樣。",
        ],
      },
      {
        heading: "為什麼值得了解你的金星星座？",
        paragraphs: [
          "查到金星星座的那一刻，很多人會有一種「原來如此」的恍然。它解釋了你的模式：那些條件上對不上卻讓你心動的人、那些讓你無感的示愛方式、那些一再重演的關係劇本。金星天蠍的人對隨意約會幾乎生理性不適；金星射手的人對黏人也是如此——沒有對錯，只是構造不同。",
          "它也有實用價值：幫你更清楚地表達自己在關係裡真正需要什麼、送出真正打動對方的約會與禮物、看懂為什麼一段「條件完美」的感情無疾而終、更聰明地看配對。十二個金星星座各有自己的浪漫簽名——結果頁裡連結了我們逐星座的金星含義詳解，歡迎深入探索。",
        ],
      },
    ] as SeoSection[],
    faq: [
      {
        q: "這個金星星座計算器是免費的嗎？",
        a: "完全免費——無需註冊、無需信箱。輸入出生日期，立即得到你的金星星座、度數與戀愛風格解讀。連結到的完整星盤工具同樣免費。",
      },
      {
        q: "我的金星星座是什麼？為什麼重要？",
        a: "金星星座是你出生時金星所在的黃道星座，描述你的戀愛風格：如何調情、被什麼吸引、如何表達愛意、需要什麼才能感到被愛。在愛情與配對問題上，很多占星師認為它比太陽星座更有說服力。",
      },
      {
        q: "查金星星座需要出生時間嗎？",
        a: "不需要。金星每天只移動約 1°，每個星座停留三到四週，所以一年裡幾乎所有日子，僅憑出生日期就能確定金星星座。出生時間和城市只是可選的精化項，只有金星在星座邊界 1° 以內時才有影響——這種情況計算器會主動提示你。",
      },
      {
        q: "金星星座和太陽星座在愛情裡有什麼區別？",
        a: "太陽星座是核心自我，金星星座是戀愛風格。太陽配對比較的是人生方向，金星配對比較的是兩個人表達與接收愛意的方式——而後者通常才是日常感情成敗的關鍵。",
      },
      {
        q: "這個計算器準嗎？",
        a: "金星位置採用曆表級近似演算法，精度約 1°——足以確定正確星座，除非你出生時金星恰好在星座邊界 1° 以內。如果結果顯示 0° 或 29°，可以把相鄰星座也作為可能；我們的邊界日檢查通常也會提示。",
      },
    ] as FaqItem[],
  },
};

export type VenusT = (typeof T)["en"];
