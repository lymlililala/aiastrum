// ── 上升星座计算器 · 三语 UI 文案 + SEO 内容 ─────────────────────
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
    pageTitle:         "Rising Sign Calculator",
    pageSubtitle1:     "RISING SIGN · The Ascendant",
    pageSubtitle2:     "Discover the face you show the world",
    // 输入区
    inputTitle:        "Enter your birth details",
    inputSubtitle1:    "Your rising sign is the zodiac sign that was rising",
    inputSubtitle2:    "on the eastern horizon when you were born",
    labelYear:         "Year",
    labelMonth:        "Month",
    labelDay:          "Day",
    labelHour:         "Hour",
    labelMinute:       "Min",
    labelCity:         "Birth City",
    cityPlaceholder:   "Search city…",
    unknownTime:       "I don't know my birth time",
    unknownTimeNotice: "The Ascendant cycles through all 12 signs every 24 hours — changing signs roughly every 2 hours. Without a birth time it cannot be pinned down; we'll estimate with noon and explain the margin of error.",
    calcBtn:           "Calculate My Rising Sign",
    inputNote:         "* Free rising sign calculator · Approximate astronomical calculation · For exploration and entertainment",
    errCity:           "Please select your birth city from the list",
    // 如何使用
    howToTitle:        "How to use",
    howToSteps:        [
      "Enter your birth date and exact birth time (the ascendant changes every ~2 hours)",
      "Search and select your birth city",
      "Get your rising sign with degree and interpretation",
    ],
    // 结果区
    resultEyebrow:     "YOUR RISING SIGN",
    risingIn:          "Ascendant in",
    degreeLabel:       "Degree",
    elementLabel:      "Element",
    rulerLabel:        "Ruled by",
    interpLabel:       "What your Rising sign means",
    estimateNote:      "Because your birth time is unknown, this shows the Ascendant at noon on your birthday — a rough estimate only. The rising sign moves through the entire zodiac in a single day, so your real rising sign could be almost any sign. For an accurate answer, find your exact birth time (birth certificate or hospital record) and recalculate.",
    readArticle:       (sign: string) => `Read the full guide: ${sign} Rising Sign Meaning →`,
    fullChartCta:      "Reveal your full birth chart (Sun, Moon, Rising & all planets) →",
    recalcBtn:         "Recalculate",
    // 元信息本地化
    elements:          { fire: "Fire", earth: "Earth", air: "Air", water: "Water" } as Record<string, string>,
    planets:           {
      Sun: "Sun", Moon: "Moon", Mercury: "Mercury", Venus: "Venus", Mars: "Mars",
      Jupiter: "Jupiter", Saturn: "Saturn", Uranus: "Uranus", Neptune: "Neptune", Pluto: "Pluto",
    } as Record<string, string>,
    // SEO 内容区
    faqTitle:          "Rising Sign Calculator FAQ",
    seo: [
      {
        heading: "What Is a Rising Sign?",
        paragraphs: [
          "Your rising sign — also called the Ascendant — is the zodiac sign that was climbing over the eastern horizon at the exact moment and place of your birth. If your Sun sign is your core identity and your Moon sign is your emotional inner world, your rising sign is the doorway through which both meet the world: your outward style, your first impression, your physical mannerisms, and the instinctive way you approach new situations.",
          "Think of it as the mask you wear — not a fake one, but the natural filter through which people experience you before they know you. Someone with a gentle Pisces Sun and a bold Aries rising may come across as direct and energetic at first meeting, with the sensitivity only surfacing in close relationships. This is why people sometimes say \"you don't seem like a typical [Sun sign]\" — they're reading your rising sign, not your Sun.",
          "Because the Ascendant is defined by the horizon at your birth location, calculating it requires three things: your birth date, your exact birth time, and your birth city. That's precisely what this free rising sign calculator computes — your ascendant sign plus the exact degree within it.",
        ],
      },
      {
        heading: "Why Your Birth Time Matters So Much",
        paragraphs: [
          "No placement in astrology is as time-sensitive as the rising sign. The Earth completes a full rotation every 24 hours, which means the entire zodiac wheel sweeps across the eastern horizon in a single day. The Ascendant changes signs roughly every two hours on average — faster for some signs at high latitudes, slower for others. Two people born on the same day just three hours apart can have completely different rising signs.",
          "This is why \"what is my rising sign\" can't be answered from your birth date alone, the way a Sun sign can. A 15-minute error in birth time shifts the Ascendant by about 3 to 4 degrees — usually harmless, but near a sign boundary it can flip the result entirely. If you want a trustworthy answer, use the most accurate birth time you can find: birth certificates, hospital records, and baby books are the best sources.",
          "Truly don't know your birth time? Tick the \"I don't know my birth time\" option and we'll show the Ascendant at noon on your birthday. Treat it strictly as an estimate — statistically your real rising sign has roughly a 1-in-12 chance of matching it. Many people narrow it down by reading all twelve rising sign descriptions and noting which first impression friends say they give off, or by asking an astrologer about chart rectification.",
        ],
      },
      {
        heading: "Rising Sign vs Sun Sign: What's the Difference?",
        paragraphs: [
          "Your Sun sign is determined by birth date alone — the Sun moves about one degree per day and stays in each sign for roughly a month. It represents your ego, vitality, and life purpose: who you are at your core and who you're growing into. Your rising sign, by contrast, is determined by the precise moment and location of birth, and it represents how that core self gets expressed outwardly — your style, your instincts in new environments, the first impression strangers receive.",
          "A useful frame: the Sun sign is the actor, the rising sign is the costume and stage presence. In social situations, job interviews, and first dates, people mostly meet your rising sign. The deeper someone gets into your life, the more they encounter your Sun (purpose) and Moon (emotions). Astrologers call Sun, Moon, and Rising the \"Big Three\" — together they sketch the basic architecture of a personality.",
          "The rising sign also anchors your entire birth chart: it marks the cusp of the 1st house, and every other house falls into place from there. That's why astrologers ask for your birth time before anything else — without the Ascendant, the house system that maps planets to life areas (career, relationships, home) can't be drawn. Once you know your rising sign here, try our full birth chart calculator to see the whole picture.",
        ],
      },
      {
        heading: "How This Rising Sign Calculator Works",
        paragraphs: [
          "This ascendant calculator uses real astronomical computation, not a lookup table. When you enter your birth date, time, and city, we convert your local birth time to Universal Time using your city's time zone, compute the Local Sidereal Time from your city's longitude, and then derive the exact ecliptic degree that was intersecting the eastern horizon at your latitude — the textbook definition of the Ascendant. It's the same engine that powers our full birth chart tool.",
          "The result shows your rising sign along with the precise degree and minute within that sign. The degree matters more than most people realize: if your Ascendant falls in the last couple of degrees of a sign, a birth-time error of just a few minutes could place you in the next sign — worth double-checking if the description doesn't resonate.",
          "The calculation is an ephemeris-grade approximation, accurate enough to determine the correct sign in virtually all cases where the birth time is known within a few minutes. For exploration and self-understanding, that's more than sufficient — and completely free, with no sign-up required.",
        ],
      },
    ] as SeoSection[],
    faq: [
      {
        q: "Is this rising sign calculator free?",
        a: "Yes, completely free — no sign-up, no email required. Enter your birth date, time, and city and get your rising sign and degree instantly. The full birth chart tool it links to is also free.",
      },
      {
        q: "What is my rising sign and why does it matter?",
        a: "Your rising sign (Ascendant) is the zodiac sign that was rising on the eastern horizon when you were born. It shapes your outward personality, first impressions, and instinctive style, and it anchors the house system of your entire birth chart — which is why astrologers ask for your birth time first.",
      },
      {
        q: "Can I find my rising sign without a birth time?",
        a: "Not accurately. The Ascendant moves through all twelve signs every 24 hours, changing signs roughly every two hours, so a birth date alone can't determine it. Our calculator can show a noon estimate for exploration, but your real rising sign could be almost any sign — check your birth certificate or hospital record for the exact time.",
      },
      {
        q: "Why does the ascendant calculator need my birth city?",
        a: "Two reasons: your city sets the time zone used to convert your birth time to Universal Time, and its geographic coordinates (latitude and longitude) directly enter the horizon calculation. The same clock time in two different cities produces different Ascendants.",
      },
      {
        q: "How accurate is this rising sign calculator?",
        a: "The astronomical computation is accurate to well under a degree — far more precise than the ~3–4° the Ascendant moves in 15 minutes of birth time. In practice, the accuracy of your result depends almost entirely on how accurate your birth time is. If your result shows 0°–1° or 29°, treat the neighboring sign as a possibility.",
      },
    ] as FaqItem[],
  },

  zh: {
    back:              "返回",
    pageTitle:         "上升星座计算器",
    pageSubtitle1:     "RISING SIGN · 上升星座",
    pageSubtitle2:     "发现你呈现给世界的那张面孔",
    inputTitle:        "输入你的出生信息",
    inputSubtitle1:    "上升星座是你出生那一刻，",
    inputSubtitle2:    "正从东方地平线升起的星座",
    labelYear:         "年",
    labelMonth:        "月",
    labelDay:          "日",
    labelHour:         "时",
    labelMinute:       "分",
    labelCity:         "出生城市",
    cityPlaceholder:   "搜索城市…",
    unknownTime:       "我不知道出生时间",
    unknownTimeNotice: "上升点每 24 小时走完黄道十二宫，约每 2 小时换一次星座。没有出生时间无法准确计算——我们将用正午估算并说明误差。",
    calcBtn:           "计算我的上升星座",
    inputNote:         "* 免费上升星座计算 · 天文近似算法 · 仅供探索与娱乐",
    errCity:           "请从列表中选择出生城市",
    // 如何使用
    howToTitle:        "如何使用",
    howToSteps:        [
      "输入出生日期和准确的出生时间（上升点约每 2 小时换一次星座）",
      "搜索并选择你的出生城市",
      "获得你的上升星座、度数与解读",
    ],
    resultEyebrow:     "你的上升星座",
    risingIn:          "上升落",
    degreeLabel:       "度数",
    elementLabel:      "元素",
    rulerLabel:        "守护星",
    interpLabel:       "你的上升星座解读",
    estimateNote:      "由于出生时间未知，这里显示的是你生日当天正午的上升点——仅供参考。上升星座一天内会走完全部十二星座，你的真实上升星座几乎可能是任何一个。想要准确答案，请通过出生证明或医院记录找到准确出生时间后重新计算。",
    readArticle:       (sign: string) => `阅读完整指南：${sign}上升星座详解 →`,
    fullChartCta:      "查看你的完整星盘（太阳、月亮、上升与全部行星）→",
    recalcBtn:         "重新计算",
    elements:          { fire: "火象", earth: "土象", air: "风象", water: "水象" } as Record<string, string>,
    planets:           {
      Sun: "太阳", Moon: "月亮", Mercury: "水星", Venus: "金星", Mars: "火星",
      Jupiter: "木星", Saturn: "土星", Uranus: "天王星", Neptune: "海王星", Pluto: "冥王星",
    } as Record<string, string>,
    faqTitle:          "上升星座计算器常见问题",
    seo: [
      {
        heading: "什么是上升星座？",
        paragraphs: [
          "上升星座（Ascendant）是你出生的确切时刻与地点，正从东方地平线升起的那个黄道星座。如果说太阳星座是你的核心身份、月亮星座是你的情绪内在，那么上升星座就是二者与世界相遇的那扇门：你的外在风格、第一印象、举止气质，以及面对新环境时的本能姿态。",
          "可以把它理解为你戴的面具——不是伪装，而是别人在真正了解你之前，天然感受到你的那层滤镜。一个温柔的双鱼太阳配上果敢的白羊上升，初见时显得直接而有冲劲，敏感只在亲密关系里浮现。这就是为什么别人常说「你不像典型的某星座」——他们读到的是你的上升，不是太阳。",
          "上升点由出生地的地平线定义，所以计算它需要三样东西：出生日期、准确的出生时间、出生城市。这正是这个免费上升星座计算器为你做的事——算出你的上升星座及其精确度数。",
        ],
      },
      {
        heading: "为什么出生时间如此重要？",
        paragraphs: [
          "占星中没有哪个位置比上升星座对时间更敏感。地球每 24 小时自转一周，整个黄道带会在一天内扫过东方地平线——上升点平均每两小时左右换一次星座（高纬度地区有些星座更快、有些更慢）。同一天出生、仅差三小时的两个人，上升星座可能完全不同。",
          "这就是为什么「我的上升星座是什么」没法像太阳星座那样只看生日回答。出生时间误差 15 分钟，上升点就偏移约 3 到 4 度——通常无碍，但如果恰好在星座边界附近，结果可能整个翻转。想要可信的答案，请尽量找到最准确的出生时间：出生证明、医院记录、婴儿纪念册是最好的来源。",
          "确实不知道出生时间？勾选「我不知道出生时间」，我们会显示你生日正午的上升点。请严格把它当作估算——从统计上看，它与真实上升星座相符的概率只有约十二分之一。很多人通过通读十二个上升星座描述、对照朋友眼中的第一印象来缩小范围，或请占星师做生时校正。",
        ],
      },
      {
        heading: "上升星座 vs 太阳星座：有什么区别？",
        paragraphs: [
          "太阳星座只看生日——太阳每天移动约 1°，在每个星座停留约一个月。它代表你的自我、生命力与人生目标：你的内核，以及你正在成长为的人。上升星座则由出生的精确时刻与地点决定，代表这个内核如何向外表达——你的风格、新环境中的本能反应、陌生人接收到的第一印象。",
          "一个实用的框架：太阳星座是演员，上升星座是戏服与台风。社交场合、面试、初次约会里，别人主要遇见的是你的上升星座。关系越深，越会触碰到你的太阳（目标）与月亮（情绪）。占星师把太阳、月亮、上升合称「三巨头」，三者共同勾勒出人格的基本架构。",
          "上升星座还锚定整张星盘：它是第一宫的宫头，其余十一宫由此排开。这就是为什么占星师开口先问出生时间——没有上升点，把行星映射到人生各领域（事业、关系、家庭）的宫位系统就画不出来。在这里查到上升星座后，不妨试试我们的完整星盘工具，一览全貌。",
        ],
      },
      {
        heading: "这个上升星座计算器如何工作？",
        paragraphs: [
          "本计算器使用真实的天文计算，而非查表法。输入出生日期、时间与城市后，我们按城市时区把当地时间转换为世界时，由城市经度算出地方恒星时，进而推导出那一刻在你出生地纬度上与东方地平线相交的精确黄道度数——这正是上升点的教科书定义。它与我们的完整星盘工具使用同一引擎。",
          "结果会显示你的上升星座及星座内的精确度数与分。度数比多数人想象的更重要：如果上升点落在某星座的最后两三度，出生时间仅差几分钟就可能落入下一星座——如果解读不太像你，值得复核一下出生时间。",
          "计算采用历表级近似算法，只要出生时间误差在几分钟以内，足以确定正确星座。对于自我探索与理解而言，这已经绰绰有余——而且完全免费，无需注册。",
        ],
      },
    ] as SeoSection[],
    faq: [
      {
        q: "这个上升星座计算器是免费的吗？",
        a: "完全免费——无需注册、无需邮箱。输入出生日期、时间和城市，立即得到你的上升星座与度数。链接到的完整星盘工具同样免费。",
      },
      {
        q: "我的上升星座是什么？为什么重要？",
        a: "上升星座（Ascendant）是你出生时正从东方地平线升起的黄道星座。它塑造你的外在人格、第一印象与本能风格，还锚定整张星盘的宫位系统——这就是为什么占星师开口先问出生时间。",
      },
      {
        q: "不知道出生时间也能查上升星座吗？",
        a: "无法准确查询。上升点每 24 小时走完全部十二星座，约每两小时换一次，只看生日无法确定。我们的计算器可以提供正午估算供探索，但你的真实上升星座几乎可能是任何一个——请查出生证明或医院记录获取准确时间。",
      },
      {
        q: "为什么上升星座计算器需要出生城市？",
        a: "两个原因：城市决定时区，用于把出生时间转换为世界时；其地理坐标（经纬度）直接进入地平线计算。同一钟表时间在不同城市会算出不同的上升星座。",
      },
      {
        q: "这个上升星座计算器准吗？",
        a: "天文计算精度远高于 1°——而上升点 15 分钟才移动约 3-4°。实际上结果的准确度几乎完全取决于你出生时间的准确度。如果结果显示 0°-1° 或 29°，可以把相邻星座也作为可能。",
      },
    ] as FaqItem[],
  },

  tw: {
    back:              "返回",
    pageTitle:         "上升星座計算器",
    pageSubtitle1:     "RISING SIGN · 上升星座",
    pageSubtitle2:     "發現你呈現給世界的那張面孔",
    inputTitle:        "輸入你的出生資訊",
    inputSubtitle1:    "上升星座是你出生那一刻，",
    inputSubtitle2:    "正從東方地平線升起的星座",
    labelYear:         "年",
    labelMonth:        "月",
    labelDay:          "日",
    labelHour:         "時",
    labelMinute:       "分",
    labelCity:         "出生城市",
    cityPlaceholder:   "搜尋城市…",
    unknownTime:       "我不知道出生時間",
    unknownTimeNotice: "上升點每 24 小時走完黃道十二宮，約每 2 小時換一次星座。沒有出生時間無法準確計算——我們將用正午估算並說明誤差。",
    calcBtn:           "計算我的上升星座",
    inputNote:         "* 免費上升星座計算 · 天文近似演算法 · 僅供探索與娛樂",
    errCity:           "請從列表中選擇出生城市",
    // 如何使用
    howToTitle:        "如何使用",
    howToSteps:        [
      "輸入出生日期和準確的出生時間（上升點約每 2 小時換一次星座）",
      "搜尋並選擇你的出生城市",
      "獲得你的上升星座、度數與解讀",
    ],
    resultEyebrow:     "你的上升星座",
    risingIn:          "上升落",
    degreeLabel:       "度數",
    elementLabel:      "元素",
    rulerLabel:        "守護星",
    interpLabel:       "你的上升星座解讀",
    estimateNote:      "由於出生時間未知，這裡顯示的是你生日當天正午的上升點——僅供參考。上升星座一天內會走完全部十二星座，你的真實上升星座幾乎可能是任何一個。想要準確答案，請透過出生證明或醫院記錄找到準確出生時間後重新計算。",
    readArticle:       (sign: string) => `閱讀完整指南：${sign}上升星座詳解 →`,
    fullChartCta:      "查看你的完整星盤（太陽、月亮、上升與全部行星）→",
    recalcBtn:         "重新計算",
    elements:          { fire: "火象", earth: "土象", air: "風象", water: "水象" } as Record<string, string>,
    planets:           {
      Sun: "太陽", Moon: "月亮", Mercury: "水星", Venus: "金星", Mars: "火星",
      Jupiter: "木星", Saturn: "土星", Uranus: "天王星", Neptune: "海王星", Pluto: "冥王星",
    } as Record<string, string>,
    faqTitle:          "上升星座計算器常見問題",
    seo: [
      {
        heading: "什麼是上升星座？",
        paragraphs: [
          "上升星座（Ascendant）是你出生的確切時刻與地點，正從東方地平線升起的那個黃道星座。如果說太陽星座是你的核心身份、月亮星座是你的情緒內在，那麼上升星座就是二者與世界相遇的那扇門：你的外在風格、第一印象、舉止氣質，以及面對新環境時的本能姿態。",
          "可以把它理解為你戴的面具——不是偽裝，而是別人在真正瞭解你之前，天然感受到你的那層濾鏡。一個溫柔的雙魚太陽配上果敢的白羊上升，初見時顯得直接而有衝勁，敏感只在親密關係裡浮現。這就是為什麼別人常說「你不像典型的某星座」——他們讀到的是你的上升，不是太陽。",
          "上升點由出生地的地平線定義，所以計算它需要三樣東西：出生日期、準確的出生時間、出生城市。這正是這個免費上升星座計算器為你做的事——算出你的上升星座及其精確度數。",
        ],
      },
      {
        heading: "為什麼出生時間如此重要？",
        paragraphs: [
          "占星中沒有哪個位置比上升星座對時間更敏感。地球每 24 小時自轉一週，整個黃道帶會在一天內掃過東方地平線——上升點平均每兩小時左右換一次星座（高緯度地區有些星座更快、有些更慢）。同一天出生、僅差三小時的兩個人，上升星座可能完全不同。",
          "這就是為什麼「我的上升星座是什麼」沒法像太陽星座那樣只看生日回答。出生時間誤差 15 分鐘，上升點就偏移約 3 到 4 度——通常無礙，但如果恰好在星座邊界附近，結果可能整個翻轉。想要可信的答案，請盡量找到最準確的出生時間：出生證明、醫院記錄、嬰兒紀念冊是最好的來源。",
          "確實不知道出生時間？勾選「我不知道出生時間」，我們會顯示你生日正午的上升點。請嚴格把它當作估算——從統計上看，它與真實上升星座相符的機率只有約十二分之一。很多人透過通讀十二個上升星座描述、對照朋友眼中的第一印象來縮小範圍，或請占星師做生時校正。",
        ],
      },
      {
        heading: "上升星座 vs 太陽星座：有什麼區別？",
        paragraphs: [
          "太陽星座只看生日——太陽每天移動約 1°，在每個星座停留約一個月。它代表你的自我、生命力與人生目標：你的內核，以及你正在成長為的人。上升星座則由出生的精確時刻與地點決定，代表這個內核如何向外表達——你的風格、新環境中的本能反應、陌生人接收到的第一印象。",
          "一個實用的框架：太陽星座是演員，上升星座是戲服與颱風。社交場合、面試、初次約會裡，別人主要遇見的是你的上升星座。關係越深，越會觸碰到你的太陽（目標）與月亮（情緒）。占星師把太陽、月亮、上升合稱「三巨頭」，三者共同勾勒出人格的基本架構。",
          "上升星座還錨定整張星盤：它是第一宮的宮頭，其餘十一宮由此排開。這就是為什麼占星師開口先問出生時間——沒有上升點，把行星映射到人生各領域（事業、關係、家庭）的宮位系統就畫不出來。在這裡查到上升星座後，不妨試試我們的完整星盤工具，一覽全貌。",
        ],
      },
      {
        heading: "這個上升星座計算器如何運作？",
        paragraphs: [
          "本計算器使用真實的天文計算，而非查表法。輸入出生日期、時間與城市後，我們按城市時區把當地時間轉換為世界時，由城市經度算出地方恆星時，進而推導出那一刻在你出生地緯度上與東方地平線相交的精確黃道度數——這正是上升點的教科書定義。它與我們的完整星盤工具使用同一引擎。",
          "結果會顯示你的上升星座及星座內的精確度數與分。度數比多數人想像的更重要：如果上升點落在某星座的最後兩三度，出生時間僅差幾分鐘就可能落入下一星座——如果解讀不太像你，值得複核一下出生時間。",
          "計算採用曆表級近似演算法，只要出生時間誤差在幾分鐘以內，足以確定正確星座。對於自我探索與理解而言，這已經綽綽有餘——而且完全免費，無需註冊。",
        ],
      },
    ] as SeoSection[],
    faq: [
      {
        q: "這個上升星座計算器是免費的嗎？",
        a: "完全免費——無需註冊、無需信箱。輸入出生日期、時間和城市，立即得到你的上升星座與度數。連結到的完整星盤工具同樣免費。",
      },
      {
        q: "我的上升星座是什麼？為什麼重要？",
        a: "上升星座（Ascendant）是你出生時正從東方地平線升起的黃道星座。它塑造你的外在人格、第一印象與本能風格，還錨定整張星盤的宮位系統——這就是為什麼占星師開口先問出生時間。",
      },
      {
        q: "不知道出生時間也能查上升星座嗎？",
        a: "無法準確查詢。上升點每 24 小時走完全部十二星座，約每兩小時換一次，只看生日無法確定。我們的計算器可以提供正午估算供探索，但你的真實上升星座幾乎可能是任何一個——請查出生證明或醫院記錄獲取準確時間。",
      },
      {
        q: "為什麼上升星座計算器需要出生城市？",
        a: "兩個原因：城市決定時區，用於把出生時間轉換為世界時；其地理座標（經緯度）直接進入地平線計算。同一鐘錶時間在不同城市會算出不同的上升星座。",
      },
      {
        q: "這個上升星座計算器準嗎？",
        a: "天文計算精度遠高於 1°——而上升點 15 分鐘才移動約 3-4°。實際上結果的準確度幾乎完全取決於你出生時間的準確度。如果結果顯示 0°-1° 或 29°，可以把相鄰星座也作為可能。",
      },
    ] as FaqItem[],
  },
};

export type RisingT = (typeof T)["en"];
