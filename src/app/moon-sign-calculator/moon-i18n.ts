// ── 月亮星座计算器 · 三语 UI 文案 + SEO 内容 ─────────────────────
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
    pageTitle:         "Moon Sign Calculator",
    pageSubtitle1:     "MOON SIGN · Lunar Astrology",
    pageSubtitle2:     "Discover the hidden side of your emotional nature",
    // 如何使用
    howToTitle:        "How to use",
    howToSteps: [
      "Enter your birth date, and your birth time if you know it",
      "Search and select your birth city",
      "Get your moon sign, degree and a detailed reading",
    ],
    // 输入区
    inputTitle:        "Enter your birth details",
    inputSubtitle1:    "Your Moon sign is the zodiac sign the Moon was in",
    inputSubtitle2:    "at the exact moment you were born",
    labelYear:         "Year",
    labelMonth:        "Month",
    labelDay:          "Day",
    labelHour:         "Hour",
    labelMinute:       "Min",
    labelCity:         "Birth City",
    cityPlaceholder:   "Search city…",
    unknownTime:       "I don't know my birth time",
    unknownTimeNotice: "The Moon moves about 13° per day and may change signs on your birthday — we'll check the whole day and show both possibilities if it does.",
    calcBtn:           "Calculate My Moon Sign",
    inputNote:         "* Free moon sign calculator · Approximate astronomical calculation (~1° accuracy) · For exploration and entertainment",
    errCity:           "Please select your birth city from the list",
    // 结果区
    resultEyebrow:     "YOUR MOON SIGN",
    moonIn:            "Moon in",
    degreeLabel:       "Degree",
    elementLabel:      "Element",
    rulerLabel:        "Ruled by",
    interpLabel:       "What your Moon sign means",
    altSignNote:       (alt: string) =>
      `Because your birth time is unknown, note that the Moon may have moved into ${alt} on your birthday. If the reading above doesn't resonate, your Moon sign might be ${alt} — read both and trust your gut.`,
    readArticle:       (sign: string) => `Read the full guide: ${sign} Moon Sign Meaning →`,
    fullChartCta:      "Reveal your full birth chart (Sun, Moon, Rising & all planets) →",
    recalcBtn:         "Recalculate",
    // 元信息本地化
    elements:          { fire: "Fire", earth: "Earth", air: "Air", water: "Water" } as Record<string, string>,
    planets:           {
      Sun: "Sun", Moon: "Moon", Mercury: "Mercury", Venus: "Venus", Mars: "Mars",
      Jupiter: "Jupiter", Saturn: "Saturn", Uranus: "Uranus", Neptune: "Neptune", Pluto: "Pluto",
    } as Record<string, string>,
    // SEO 内容区
    faqTitle:          "Moon Sign Calculator FAQ",
    seo: [
      {
        heading: "What Is a Moon Sign?",
        paragraphs: [
          "Your Moon sign is the zodiac sign the Moon was passing through at the exact moment and place of your birth. While most people know their Sun sign — the one you read in horoscopes, determined by your birth date alone — your Moon sign describes something quieter and arguably more personal: your emotional inner world. It governs how you process feelings, what makes you feel safe, how you react under stress, and what you need to feel truly nurtured.",
          "Astrologers often say the Sun sign is who you are becoming, while the Moon sign is who you already are when nobody is watching. It shows up in your closest relationships, your private habits, your instinctive reactions, and the kind of comfort you crave after a hard day. Two people with the same Sun sign can feel completely different emotionally because their Moon signs sit in different elements — a fiery Aries Moon needs action to feel better, while a watery Cancer Moon needs closeness and reassurance.",
          "Because the Moon moves quickly — roughly 13 degrees per day, changing signs every two to two-and-a-half days — knowing your Moon sign requires your birth date, and ideally your birth time and city. That's exactly what this free moon sign calculator computes for you.",
        ],
      },
      {
        heading: "How This Moon Sign Calculator Works",
        paragraphs: [
          "This calculator uses real astronomical computation, not a simplified lookup table. When you enter your birth date, time, and city, we convert your local birth time to UTC using your city's time zone, then calculate the Moon's exact ecliptic longitude for that moment using a lunar ephemeris algorithm — the same engine that powers our full birth chart tool. The longitude is then mapped onto the twelve 30-degree slices of the zodiac to determine your Moon sign, along with the precise degree and minute within that sign.",
          "Accuracy matters because the Moon is the fastest-moving body in astrology. A difference of just a few hours can shift the Moon by several degrees, and on roughly one day in seven the Moon crosses from one sign into the next. If you were born on such a day and don't know your birth time, your Moon sign is genuinely ambiguous — which is why our calculator handles that case honestly instead of guessing.",
          "Don't know your birth time? Tick the \"I don't know my birth time\" option. We'll compute the Moon's position at the start and end of your birthday in your birth city. If the Moon stayed in one sign all day — which happens most days — you get a confident answer. If it changed signs, we show you the most likely sign (based on noon) plus the alternative, so you can read both and see which one actually sounds like you.",
        ],
      },
      {
        heading: "Moon Sign vs Sun Sign: What's the Difference?",
        paragraphs: [
          "Your Sun sign reflects your core identity, ego, and life direction — the traits you consciously express and grow into. It takes the Sun a full year to move through the zodiac, so everyone born within the same month shares a Sun sign. Your Moon sign, by contrast, reflects your emotional instincts: how you self-soothe, what you need in close relationships, your earliest conditioning, and your subconscious patterns.",
          "A simple way to frame it: the Sun is your \"what\" — your purpose and vitality — while the Moon is your \"how\" — the emotional style with which you pursue that purpose. In love compatibility (synastry), astrologers often weight Moon signs heavily, because long-term relationships live or die on emotional fit rather than surface personality. Someone whose Moon clashes with yours may feel exhausting over time even if your Sun signs are a textbook match.",
          "For a complete picture you also need your Rising sign (Ascendant), which describes the mask you wear and how others first perceive you. Together, Sun, Moon, and Rising form the \"Big Three\" of your natal chart. Once you know your Moon sign here, try our full birth chart calculator to see all three, plus the positions of every planet.",
        ],
      },
      {
        heading: "Why Your Moon Sign Is Worth Knowing",
        paragraphs: [
          "People who discover their Moon sign often describe a small shock of recognition — finally, an explanation for emotional patterns that never matched their Sun sign description. The confident Leo Sun who secretly needs constant reassurance (Pisces Moon). The easygoing Sagittarius Sun who is privately intense and possessive in love (Scorpio Moon). The serious Capricorn Sun with a goofy, restless inner life (Gemini Moon).",
          "Knowing your Moon sign has practical value too. It can help you understand your stress responses, choose self-care that actually works for your emotional type, communicate your needs more clearly in relationships, and make sense of why certain environments drain or restore you. Each Moon sign also has its own emotional language — explore yours in depth with our sign-by-sign Moon sign meaning guides, linked in your result.",
        ],
      },
    ] as SeoSection[],
    faq: [
      {
        q: "Is this moon sign calculator free?",
        a: "Yes, completely free — no sign-up, no email required. Enter your birth date, time, and city and get your Moon sign instantly. The full birth chart tool it links to is also free.",
      },
      {
        q: "What is my moon sign and why does it matter?",
        a: "Your Moon sign is the zodiac sign the Moon occupied when you were born. It describes your emotional nature: how you process feelings, what makes you feel secure, and how you behave in your closest relationships. Many astrologers consider it just as important as your Sun sign.",
      },
      {
        q: "Can I find my moon sign without a birth time?",
        a: "Usually yes. The Moon stays in one sign for about 2 to 2.5 days, so on most birthdays your Moon sign is the same all day. Our calculator checks the Moon's position at the start and end of your birth date; if it changed signs that day (roughly a 1-in-7 chance), we show you both possibilities.",
      },
      {
        q: "Why does the calculator ask for my birth city?",
        a: "Your birth city determines the time zone used to convert your local birth time to Universal Time, which the astronomical calculation requires. Two people born at the same clock time in different cities were born at different absolute moments, and the fast-moving Moon may sit in a different position.",
      },
      {
        q: "How accurate is this moon calculator?",
        a: "The lunar position is computed with an ephemeris-grade approximation accurate to about 1 degree — more than enough to determine the correct sign except when the Moon was within ~1° of a sign boundary at your birth. If your result shows 0° or 29°, treat the neighboring sign as a possibility.",
      },
    ] as FaqItem[],
  },

  zh: {
    back:              "返回",
    pageTitle:         "月亮星座计算器",
    pageSubtitle1:     "MOON SIGN · 月亮占星",
    pageSubtitle2:     "发现你情绪世界里隐藏的一面",
    howToTitle:        "如何使用",
    howToSteps: [
      "填写出生日期，如知道出生时间也一并填写",
      "搜索并选择你的出生城市",
      "获取你的月亮星座、度数和详细解读",
    ],
    inputTitle:        "输入你的出生信息",
    inputSubtitle1:    "月亮星座是你出生那一刻，",
    inputSubtitle2:    "月亮在黄道上所处的星座",
    labelYear:         "年",
    labelMonth:        "月",
    labelDay:          "日",
    labelHour:         "时",
    labelMinute:       "分",
    labelCity:         "出生城市",
    cityPlaceholder:   "搜索城市…",
    unknownTime:       "我不知道出生时间",
    unknownTimeNotice: "月亮每天移动约 13°，你生日当天可能跨星座——我们会检查全天范围，若跨座会给出两种可能。",
    calcBtn:           "计算我的月亮星座",
    inputNote:         "* 免费月亮星座计算 · 天文近似算法（精度约 1°）· 仅供探索与娱乐",
    errCity:           "请从列表中选择出生城市",
    resultEyebrow:     "你的月亮星座",
    moonIn:            "月亮落",
    degreeLabel:       "度数",
    elementLabel:      "元素",
    rulerLabel:        "守护星",
    interpLabel:       "你的月亮星座解读",
    altSignNote:       (alt: string) =>
      `由于出生时间未知，月亮在你生日当天可能已移入${alt}。如果上面的解读不太像你，你的月亮星座也可能是${alt}——两者都读一读，相信你的直觉。`,
    readArticle:       (sign: string) => `阅读完整指南：${sign}月亮星座详解 →`,
    fullChartCta:      "查看你的完整星盘（太阳、月亮、上升与全部行星）→",
    recalcBtn:         "重新计算",
    elements:          { fire: "火象", earth: "土象", air: "风象", water: "水象" } as Record<string, string>,
    planets:           {
      Sun: "太阳", Moon: "月亮", Mercury: "水星", Venus: "金星", Mars: "火星",
      Jupiter: "木星", Saturn: "土星", Uranus: "天王星", Neptune: "海王星", Pluto: "冥王星",
    } as Record<string, string>,
    faqTitle:          "月亮星座计算器常见问题",
    seo: [
      {
        heading: "什么是月亮星座？",
        paragraphs: [
          "月亮星座，是你出生的确切时刻与地点，月亮在黄道十二宫中所处的星座。大多数人都知道自己的太阳星座——只看生日、运势专栏里读的那个——而月亮星座描述的是更安静、也更私密的东西：你的情绪内在世界。它掌管你如何处理感受、什么让你感到安全、压力下的本能反应，以及什么样的滋养才能真正治愈你。",
          "占星师常说：太阳星座是你正在成为的人，月亮星座则是无人注视时本来的你。它体现在最亲密的关系、私下习惯和本能反应里。两个太阳星座相同的人，情绪模式可能完全不同——火象的白羊月亮需要行动来平复情绪，而水象的巨蟹月亮需要的是亲近与安慰。",
          "月亮移动很快——每天约 13°，每两到两天半换一次星座——所以算月亮星座需要出生日期，最好还有出生时间和城市。这正是这个免费月亮星座计算器为你做的事。",
        ],
      },
      {
        heading: "这个月亮星座计算器如何工作？",
        paragraphs: [
          "本计算器使用真实的天文计算，而非简化的查表法。输入出生日期、时间与城市后，我们会按城市时区把当地时间转换为 UTC，再用与完整星盘工具相同的月球历表算法，算出那一刻月亮的精确黄道经度，最后映射到黄道十二宫（每宫 30°），得出你的月亮星座及星座内的精确度数。",
          "精度很重要，因为月亮是占星中移动最快的天体。几个小时的误差就能让月亮移动好几度；大约每七天就有一天月亮会跨座。如果你恰好在跨座日出生又不知道出生时间，月亮星座是真的有歧义——我们的计算器会诚实地处理这种情况，而不是瞎猜。",
          "不知道出生时间？勾选「我不知道出生时间」。我们会计算你生日当天 00:00 与 23:59 两个端点的月亮位置。如果全天都在同一星座（大多数日子如此），你会得到确定答案；如果当天跨座，我们会给出最可能的星座（按正午）加上另一种可能，两个解读都看看，哪个更像你。",
        ],
      },
      {
        heading: "月亮星座 vs 太阳星座：有什么区别？",
        paragraphs: [
          "太阳星座反映你的核心身份、自我与人生方向——你有意识表达和成长的特质。太阳一年才走完黄道一圈，所以同月出生的人太阳星座都一样。月亮星座则反映你的情绪本能：如何自我安抚、亲密关系里需要什么、早期成长烙印与潜意识模式。",
          "一个简单框架：太阳是你的「是什么」——目标与生命力；月亮是你的「怎么做」——追求目标时的情绪风格。在合盘（感情配对）中，占星师往往特别看重月亮星座，因为长期关系拼的是情绪契合，而不是表面性格。",
          "完整画像还需要上升星座——你戴给世界的面具、别人对你的第一印象。太阳、月亮、上升合称星盘「三巨头」。在这里查到月亮星座后，不妨试试我们的完整星盘工具，一次看全三巨头和所有行星位置。",
        ],
      },
      {
        heading: "为什么值得了解你的月亮星座？",
        paragraphs: [
          "很多人查到自己的月亮星座后都有一种「被说中了」的恍然——终于解释了那些和太阳星座描述对不上的情绪模式。自信的狮子太阳却私下需要不断被肯定（双鱼月亮）；随和的射手太阳在爱情里却极度强烈（天蝎月亮）。",
          "了解月亮星座也有实用价值：理解自己的压力反应模式、选择真正适合你情绪类型的自我照顾方式、在关系中更清楚地表达需求。每个月亮星座都有自己的情绪语言——结果页里链接了我们逐星座的月亮星座详解，欢迎深入探索。",
        ],
      },
    ] as SeoSection[],
    faq: [
      {
        q: "这个月亮星座计算器是免费的吗？",
        a: "完全免费——无需注册、无需邮箱。输入出生日期、时间和城市，立即得到你的月亮星座。链接到的完整星盘工具同样免费。",
      },
      {
        q: "我的月亮星座是什么？为什么重要？",
        a: "月亮星座是你出生时月亮所在的黄道星座，描述你的情绪天性：如何处理感受、什么让你有安全感、亲密关系中的真实模样。很多占星师认为它与太阳星座同等重要。",
      },
      {
        q: "不知道出生时间也能查月亮星座吗？",
        a: "通常可以。月亮在同一星座停留约 2 到 2.5 天，所以大多数生日全天月亮星座不变。我们的计算器会检查你生日当天起始与结束时的月亮位置；如果当天跨座（约七分之一概率），会同时给出两种可能。",
      },
      {
        q: "为什么计算器要问我出生城市？",
        a: "出生城市决定时区，用于把你的本地出生时间转换为天文计算所需的世界时。不同时区同一钟表时间对应不同的绝对时刻，移动飞快的月亮位置可能不同。",
      },
      {
        q: "这个月亮计算器准吗？",
        a: "月亮位置采用历表级近似算法，精度约 1°——足以确定正确星座，除非你出生时月亮恰好在星座边界 1° 以内。如果结果显示 0° 或 29°，可以把相邻星座也作为可能。",
      },
    ] as FaqItem[],
  },

  tw: {
    back:              "返回",
    pageTitle:         "月亮星座計算器",
    pageSubtitle1:     "MOON SIGN · 月亮占星",
    pageSubtitle2:     "發現你情緒世界裡隱藏的一面",
    howToTitle:        "如何使用",
    howToSteps: [
      "填寫出生日期，如知道出生時間也一併填寫",
      "搜尋並選擇你的出生城市",
      "獲取你的月亮星座、度數和詳細解讀",
    ],
    inputTitle:        "輸入你的出生資訊",
    inputSubtitle1:    "月亮星座是你出生那一刻，",
    inputSubtitle2:    "月亮在黃道上所處的星座",
    labelYear:         "年",
    labelMonth:        "月",
    labelDay:          "日",
    labelHour:         "時",
    labelMinute:       "分",
    labelCity:         "出生城市",
    cityPlaceholder:   "搜尋城市…",
    unknownTime:       "我不知道出生時間",
    unknownTimeNotice: "月亮每天移動約 13°，你生日當天可能跨星座——我們會檢查全天範圍，若跨座會給出兩種可能。",
    calcBtn:           "計算我的月亮星座",
    inputNote:         "* 免費月亮星座計算 · 天文近似演算法（精度約 1°）· 僅供探索與娛樂",
    errCity:           "請從列表中選擇出生城市",
    resultEyebrow:     "你的月亮星座",
    moonIn:            "月亮落",
    degreeLabel:       "度數",
    elementLabel:      "元素",
    rulerLabel:        "守護星",
    interpLabel:       "你的月亮星座解讀",
    altSignNote:       (alt: string) =>
      `由於出生時間未知，月亮在你生日當天可能已移入${alt}。如果上面的解讀不太像你，你的月亮星座也可能是${alt}——兩者都讀一讀，相信你的直覺。`,
    readArticle:       (sign: string) => `閱讀完整指南：${sign}月亮星座詳解 →`,
    fullChartCta:      "查看你的完整星盤（太陽、月亮、上升與全部行星）→",
    recalcBtn:         "重新計算",
    elements:          { fire: "火象", earth: "土象", air: "風象", water: "水象" } as Record<string, string>,
    planets:           {
      Sun: "太陽", Moon: "月亮", Mercury: "水星", Venus: "金星", Mars: "火星",
      Jupiter: "木星", Saturn: "土星", Uranus: "天王星", Neptune: "海王星", Pluto: "冥王星",
    } as Record<string, string>,
    faqTitle:          "月亮星座計算器常見問題",
    seo: [
      {
        heading: "什麼是月亮星座？",
        paragraphs: [
          "月亮星座，是你出生的確切時刻與地點，月亮在黃道十二宮中所處的星座。大多數人都知道自已的太陽星座——只看生日、運勢專欄裡讀的那個——而月亮星座描述的是更安靜、也更私密的東西：你的情緒內在世界。它掌管你如何處理感受、什麼讓你感到安全、壓力下的本能反應，以及什麼樣的滋養才能真正治癒你。",
          "占星師常說：太陽星座是你正在成為的人，月亮星座則是無人注視時本來的你。它體現在最親密的關係、私下習慣和本能反應裡。兩個太陽星座相同的人，情緒模式可能完全不同——火象的白羊月亮需要行動來平復情緒，而水象的巨蟹月亮需要的是親近與安慰。",
          "月亮移動很快——每天約 13°，每兩到兩天半換一次星座——所以算月亮星座需要出生日期，最好還有出生時間和城市。這正是這個免費月亮星座計算器為你做的事。",
        ],
      },
      {
        heading: "這個月亮星座計算器如何運作？",
        paragraphs: [
          "本計算器使用真實的天文計算，而非簡化的查表法。輸入出生日期、時間與城市後，我們會按城市時區把當地時間轉換為 UTC，再用與完整星盤工具相同的月球曆表演算法，算出那一刻月亮的精確黃道經度，最後映射到黃道十二宮（每宮 30°），得出你的月亮星座及星座內的精確度數。",
          "精度很重要，因為月亮是占星中移動最快的天體。幾個小時的誤差就能讓月亮移動好幾度；大約每七天就有一天月亮會跨座。如果你恰好在跨座日出生又不知道出生時間，月亮星座是真的有歧義——我們的計算器會誠實地處理這種情況，而不是瞎猜。",
          "不知道出生時間？勾選「我不知道出生時間」。我們會計算你生日當天 00:00 與 23:59 兩個端點的月亮位置。如果全天都在同一星座（大多數日子如此），你會得到確定答案；如果當天跨座，我們會給出最可能的星座（按正午）加上另一種可能，兩個解讀都看看，哪個更像你。",
        ],
      },
      {
        heading: "月亮星座 vs 太陽星座：有什麼區別？",
        paragraphs: [
          "太陽星座反映你的核心身份、自我與人生方向——你有意識表達和成長的特質。太陽一年才走完黃道一圈，所以同月出生的人太陽星座都一樣。月亮星座則反映你的情緒本能：如何自我安撫、親密關係裡需要什麼、早期成長烙印與潛意識模式。",
          "一個簡單框架：太陽是你的「是什麼」——目標與生命力；月亮是你的「怎麼做」——追求目標時的情緒風格。在合盤（感情配對）中，占星師往往特別看重月亮星座，因為長期關係拼的是情緒契合，而不是表面性格。",
          "完整畫像還需要上升星座——你戴給世界的面具、別人對你的第一印象。太陽、月亮、上升合稱星盤「三巨頭」。在這裡查到月亮星座後，不妨試試我們的完整星盤工具，一次看全三巨頭和所有行星位置。",
        ],
      },
      {
        heading: "為什麼值得了解你的月亮星座？",
        paragraphs: [
          "很多人查到自己的月亮星座後都有一種「被說中了」的恍然——終於解釋了那些和太陽星座描述對不上的情緒模式。自信的獅子太陽卻私下需要不斷被肯定（雙魚月亮）；隨和的射手太陽在愛情裡卻極度強烈（天蠍月亮）。",
          "了解月亮星座也有實用價值：理解自己的壓力反應模式、選擇真正適合你情緒類型的自我照顧方式、在關係中更清楚地表達需求。每個月亮星座都有自己的情緒語言——結果頁裡連結了我們逐星座的月亮星座詳解，歡迎深入探索。",
        ],
      },
    ] as SeoSection[],
    faq: [
      {
        q: "這個月亮星座計算器是免費的嗎？",
        a: "完全免費——無需註冊、無需信箱。輸入出生日期、時間和城市，立即得到你的月亮星座。連結到的完整星盤工具同樣免費。",
      },
      {
        q: "我的月亮星座是什麼？為什麼重要？",
        a: "月亮星座是你出生時月亮所在的黃道星座，描述你的情緒天性：如何處理感受、什麼讓你有安全感、親密關係中的真實模樣。很多占星師認為它與太陽星座同等重要。",
      },
      {
        q: "不知道出生時間也能查月亮星座嗎？",
        a: "通常可以。月亮在同一星座停留約 2 到 2.5 天，所以大多數生日全天月亮星座不變。我們的計算器會檢查你生日當天起始與結束時的月亮位置；如果當天跨座（約七分之一機率），會同時給出兩種可能。",
      },
      {
        q: "為什麼計算器要問我出生城市？",
        a: "出生城市決定時區，用於把你的本地出生時間轉換為天文計算所需的世界時。不同時區同一鐘錶時間對應不同的絕對時刻，移動飛快的月亮位置可能不同。",
      },
      {
        q: "這個月亮計算器準嗎？",
        a: "月亮位置採用曆表級近似演算法，精度約 1°——足以確定正確星座，除非你出生時月亮恰好在星座邊界 1° 以內。如果結果顯示 0° 或 29°，可以把相鄰星座也作為可能。",
      },
    ] as FaqItem[],
  },
};

export type MoonT = (typeof T)["en"];
