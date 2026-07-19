// ── 生命灵数计算器 · 三语 UI 文案 + SEO 内容 ─────────────────────
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
    pageTitle:         "Life Path Number Calculator",
    pageSubtitle1:     "NUMEROLOGY · Life Path Number",
    pageSubtitle2:     "The most important number in your numerology chart",
    // 如何使用
    howToTitle:        "How to use",
    howToSteps: [
      "Enter your full date of birth",
      "We reduce month, day and year digit by digit — shown step by step",
      "Read your life path number meaning (master numbers 11/22/33 kept)",
    ],
    // 输入区
    inputTitle:        "Enter your date of birth",
    inputSubtitle1:    "Your Life Path Number is calculated from your full birth date —",
    inputSubtitle2:    "and we show you every step of the math",
    labelYear:         "Year",
    labelMonth:        "Month",
    labelDay:          "Day",
    monthNames:        ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    calcBtn:           "Calculate My Life Path Number",
    inputNote:         "* Free numerology calculator · Shows the full step-by-step calculation · For exploration and entertainment",
    // 结果区
    resultEyebrow:     "YOUR LIFE PATH NUMBER",
    masterBadge:       "⚡ Master Number",
    calcTitle:         "How your number was calculated",
    calcNote:          "Transparency matters: here is the exact math behind your result, digit by digit. Master numbers 11, 22 and 33 are never reduced further.",
    calcResultLabel:   "Life Path Number =",
    interpLabel:       "What your Life Path Number means",
    traitsLabel:       "Core strengths",
    challengesLabel:   "Growth challenges",
    loveLabel:         "In love & relationships",
    readArticle:       (n: number) => `Read the full guide: Life Path Number ${n} Meaning →`,
    readMasterArticle: (n: number) => `Read the full guide: Master Number ${n} Meaning →`,
    masterNote:        "Master Numbers carry intensified energy — both a higher calling and a heavier lesson. Yours is read at its full vibration, not reduced to a single digit.",
    fullReadingCta:    "Get your full numerology reading (traits, gifts, lessons & lucky guide) →",
    recalcBtn:         "Recalculate",
    // SEO 内容区
    faqTitle:          "Life Path Number Calculator FAQ",
    seo: [
      {
        heading: "What Is a Life Path Number?",
        paragraphs: [
          "Your Life Path Number is the single most important number in numerology — the one every numerologist calculates first. Derived from your full date of birth, it is often compared to your Sun sign in astrology: it describes the core theme of your life, the traits you were born with, the lessons you are here to learn, and the direction in which you naturally grow. If you have ever asked \"what is my life path number?\", this free life path number calculator gives you the answer in seconds.",
          "Unlike horoscopes, which shift with the planets, your Life Path Number never changes. It is fixed at birth and stays with you for life, which is why numerologists treat it as the backbone of any reading. Every other number in your chart — Expression, Soul Urge, Birthday number — adds nuance, but the Life Path sets the stage.",
          "Life Path Numbers run from 1 to 9, plus three special Master Numbers: 11, 22 and 33. Each carries its own personality profile, strengths, blind spots and relationship style. Once you know yours, you can read our in-depth meaning guide for your exact number — linked directly from your result.",
        ],
      },
      {
        heading: "How to Calculate Your Life Path Number (Step by Step)",
        paragraphs: [
          "The math behind a life path calculator is simple enough to do with pen and paper — and we believe you should see it. Many tools spit out a number with no explanation; this numerology calculator shows every step of the calculation, so you can verify the result yourself.",
          "Here is the standard method. Take your full birth date and reduce each part — month, day and year — by adding its digits together. For example, if you were born on October 25, 1985: the month reduces to 1 + 0 = 1, the day to 2 + 5 = 7, and the year to 1 + 9 + 8 + 5 = 23, then 2 + 3 = 5. Finally, add the three reduced parts: 1 + 7 + 5 = 13, and reduce once more: 1 + 3 = 4. Life Path Number 4.",
          "The one rule that trips people up: Master Numbers are never reduced. If any stage of the addition lands on 11, 22 or 33, you stop there — someone born on a date whose digits sum to 22 is a Master Number 22, not a 4. Our calculator applies this rule at every step and highlights the Master Number when it appears.",
        ],
      },
      {
        heading: "Master Numbers 11, 22 and 33",
        paragraphs: [
          "In numerology, 11, 22 and 33 are called Master Numbers — double-digit vibrations with intensified potential and intensified challenges. They are sometimes described as \"higher octaves\" of their root digits: 11 amplifies the intuition of 2, 22 builds the dreams of 4 on a grand scale, and 33 elevates the nurturing of 6 into selfless service.",
          "Master Number 11 is the Intuitive — highly sensitive, spiritually attuned, often visionary, but prone to nervous tension and self-doubt. Master Number 22 is the Master Builder — capable of turning ambitious ideas into lasting institutions, with the risk of burnout or misused power. Master Number 33 is the Master Teacher — the rarest of the three, devoted to healing and uplifting others, sometimes at the cost of its own needs.",
          "If this life path calculator returns 11, 22 or 33, treat it as significant rather than unusual. Your result links to a dedicated Master Number meaning guide, and the full numerology reading interprets your number at its master vibration instead of flattening it to a single digit.",
        ],
      },
      {
        heading: "Life Path Number Meanings at a Glance",
        paragraphs: [
          "Each Life Path Number has a distinct archetype. 1 is the independent leader and pioneer. 2 is the diplomat who thrives on cooperation and harmony. 3 is the creative communicator. 4 is the builder who values discipline and structure. 5 is the freedom-seeker and adventurer. 6 is the nurturer devoted to family and responsibility. 7 is the analyst and spiritual seeker. 8 is the achiever focused on ambition and material mastery. 9 is the humanitarian with a global heart.",
          "Of course, a single number is a starting point, not a verdict. Two people sharing Life Path 7 can live it very differently depending on the rest of their chart and their choices. Think of your number as a compass heading rather than a fixed route: it shows the terrain where you do your best work, not a script you must follow.",
          "Ready to go deeper? Calculate your number above, then open your number's full meaning guide for career paths, relationship compatibility and famous people who share your Life Path. For a complete picture — including your Expression and Soul Urge numbers — try our full numerology reading tool.",
        ],
      },
    ] as SeoSection[],
    faq: [
      {
        q: "Is this life path number calculator free?",
        a: "Yes, completely free — no sign-up, no email, no hidden paywall. Enter your birth date and get your Life Path Number instantly, with the full step-by-step calculation and a meaning reading.",
      },
      {
        q: "What is my life path number and how do I find it?",
        a: "Your Life Path Number is derived from your full date of birth by adding the digits of the month, day and year, then reducing the total to a single digit — unless the total is 11, 22 or 33, which are Master Numbers kept as-is. Select your birth date above and the calculator does the math for you, showing every step.",
      },
      {
        q: "Should Master Numbers 11, 22 and 33 be reduced?",
        a: "No. In standard numerology, Master Numbers are never reduced to a single digit. A sum of 11 stays 11 (not 2), 22 stays 22 (not 4), and 33 stays 33 (not 6). They carry a distinct, intensified meaning — our calculator preserves them automatically at every stage of the calculation.",
      },
      {
        q: "Can my life path number change over time?",
        a: "No. Because it is calculated from your date of birth, your Life Path Number is fixed for life — unlike a horoscope, which shifts with planetary movements. What changes is how consciously you express its strengths and work through its lessons.",
      },
      {
        q: "Is a life path number the same as a zodiac sign?",
        a: "They are different systems. A zodiac (Sun) sign comes from astrology and is based on the Sun's position on your birthday; a Life Path Number comes from numerology and is pure birth-date arithmetic. Many people find the two complement each other — the Life Path describes your direction, the Sun sign your style.",
      },
    ] as FaqItem[],
  },

  zh: {
    back:              "返回",
    pageTitle:         "生命灵数计算器",
    pageSubtitle1:     "NUMEROLOGY · 生命道路数字",
    pageSubtitle2:     "你的数字命盘中最核心的一个数字",
    howToTitle:        "如何使用",
    howToSteps: [
      "输入你的完整出生日期",
      "我们将月、日、年逐位相加缩减——每一步都完整展示",
      "查看你的生命灵数解读（卓越数 11/22/33 保留不缩减）",
    ],
    inputTitle:        "输入你的出生日期",
    inputSubtitle1:    "生命灵数由你的完整出生日期算出——",
    inputSubtitle2:    "我们展示每一步计算过程",
    labelYear:         "年",
    labelMonth:        "月",
    labelDay:          "日",
    monthNames:        ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    calcBtn:           "计算我的生命灵数",
    inputNote:         "* 免费数字命理计算器 · 展示完整计算步骤 · 仅供探索与娱乐",
    resultEyebrow:     "你的生命灵数",
    masterBadge:       "⚡ 卓越数字 · Master Number",
    calcTitle:         "你的数字是如何算出来的",
    calcNote:          "透明最重要：这里是你结果的完整计算过程，逐位相加。卓越数 11、22、33 不再继续缩减。",
    calcResultLabel:   "生命灵数 =",
    interpLabel:       "你的生命灵数解读",
    traitsLabel:       "核心优势",
    challengesLabel:   "成长课题",
    loveLabel:         "爱情与关系",
    readArticle:       (n: number) => `阅读完整指南：生命灵数 ${n} 详解 →`,
    readMasterArticle: (n: number) => `阅读完整指南：卓越数 ${n} 详解 →`,
    masterNote:        "卓越数携带更强的能量——既代表更高的使命，也意味着更重的课题。你的数字按完整振动解读，不缩减为个位数。",
    fullReadingCta:    "获取完整灵数解读（特质、天赋、课题与幸运指南）→",
    recalcBtn:         "重新计算",
    faqTitle:          "生命灵数计算器常见问题",
    seo: [
      {
        heading: "什么是生命灵数？",
        paragraphs: [
          "生命灵数（Life Path Number）是数字命理学中最重要的一个数字——任何一次灵数解读都从它开始。它由你的完整出生日期推导而来，常被拿来和占星中的太阳星座类比：它描述你人生的核心主题、与生俱来的特质、此生要学习的课题，以及你自然成长的方向。",
          "与随行星运转变化的运势不同，生命灵数一生不变。它在出生那一刻就已确定，因此命理师把它视为解读的骨架——命盘中的其他数字（表现数、灵魂数、生日数）只是补充细节，生命灵数才是舞台本身。",
          "生命灵数从 1 到 9，外加三个特殊的卓越数：11、22、33。每个数字都有自己的性格画像、优势、盲点和感情模式。算出你的数字后，可以直接从结果页进入该数字的完整详解文章。",
        ],
      },
      {
        heading: "生命灵数怎么算？（逐步教学）",
        paragraphs: [
          "生命灵数的算法简单到用纸笔就能完成——而且我们认为你应该看到它。很多工具只丢给你一个数字、不做任何解释；这个计算器展示完整的逐步计算过程，让你可以自己验证结果。",
          "标准方法如下：取你的完整出生日期，把月、日、年三部分分别按位相加缩减。例如 1985 年 10 月 25 日出生：月份 1 + 0 = 1，日期 2 + 5 = 7，年份 1 + 9 + 8 + 5 = 23，再 2 + 3 = 5。最后把三部分相加：1 + 7 + 5 = 13，再缩减：1 + 3 = 4。生命灵数 4。",
          "最容易出错的一条规则：卓越数绝不继续缩减。只要任何一步相加的结果是 11、22 或 33，就停在那里——数字之和为 22 的人是卓越数 22，而不是 4。我们的计算器在每一步都应用这条规则，并在出现卓越数时特别标注。",
        ],
      },
      {
        heading: "卓越数 11、22、33",
        paragraphs: [
          "在数字命理学中，11、22 和 33 被称为卓越数（Master Number）——双位振动，潜力与挑战同时被放大。它们常被描述为对应个位数的「高八度」：11 放大 2 的直觉，22 把 4 的梦想建成宏大现实，33 把 6 的关怀升华为无私服务。",
          "卓越数 11 是「直觉者」——敏感、通灵、富有远见，但容易神经紧张和自我怀疑。卓越数 22 是「筑梦大师」——能把宏大构想变成持久的事业，风险是过劳或误用权力。卓越数 33 是「导师」——三者中最稀有，致力于疗愈与提升他人，有时以牺牲自我为代价。",
          "如果计算器算出 11、22 或 33，请把它看作重要的信号而非巧合。结果页会链接对应的卓越数详解文章，完整灵数解读也会按卓越振动来解释你的数字，而不是把它压平成个位数。",
        ],
      },
      {
        heading: "各生命灵数速览",
        paragraphs: [
          "每个生命灵数都有独特的原型。1 是独立的开拓者与领导者；2 是擅长合作与调和的外交家；3 是创意表达者；4 是重视纪律与结构的建造者；5 是追求自由的冒险家；6 是奉献家庭与责任的养育者；7 是分析师与灵性探索者；8 是专注野心与物质成就的实干家；9 是胸怀世界的人道主义者。",
          "当然，一个数字只是起点，不是判决。两个同为灵数 7 的人，可能因命盘其余部分和自身选择而活出完全不同的样子。把数字当作罗盘指向，而不是固定剧本：它告诉你最适合耕耘的地形，而不是必须照走的路线。",
          "想深入了解？先在上方算出你的数字，再打开对应数字的完整详解，看看职业方向、感情配对和与你同数字的名人。想要完整画像——包括表现数与灵魂数——试试我们的完整灵数解读工具。",
        ],
      },
    ] as SeoSection[],
    faq: [
      {
        q: "这个生命灵数计算器是免费的吗？",
        a: "完全免费——无需注册、无需邮箱、没有隐藏付费墙。输入出生日期，立即得到你的生命灵数，附完整逐步计算过程和含义解读。",
      },
      {
        q: "我的生命灵数是什么？怎么算？",
        a: "生命灵数由你的完整出生日期推导：把月、日、年的各位数字相加，再把总和缩减为个位数——除非总和是 11、22 或 33，这三个卓越数保持不变。在上方选择出生日期，计算器会自动完成运算并展示每一步。",
      },
      {
        q: "卓越数 11、22、33 要缩减吗？",
        a: "不要。标准数字命理学中，卓越数绝不缩减为个位数：11 保持 11（不是 2），22 保持 22（不是 4），33 保持 33（不是 6）。它们有独特而强烈的含义——我们的计算器在计算的每个阶段都会自动保留。",
      },
      {
        q: "生命灵数会随时间改变吗？",
        a: "不会。因为它由出生日期算出，所以终生固定——这一点不同于随行星运转变化的运势。会改变的是你如何有意识地发挥它的优势、修完它的课题。",
      },
      {
        q: "生命灵数和星座是一回事吗？",
        a: "属于不同体系。太阳星座来自占星学，取决于你生日时太阳的位置；生命灵数来自数字命理学，纯粹是出生日期的算术。很多人发现两者互补——生命灵数描述你的方向，太阳星座描述你的风格。",
      },
    ] as FaqItem[],
  },

  tw: {
    back:              "返回",
    pageTitle:         "生命靈數計算器",
    pageSubtitle1:     "NUMEROLOGY · 生命道路數字",
    pageSubtitle2:     "你的數字命盤中最核心的一個數字",
    howToTitle:        "如何使用",
    howToSteps: [
      "輸入你的完整出生日期",
      "我們將月、日、年逐位相加縮減——每一步都完整展示",
      "查看你的生命靈數解讀（卓越數 11/22/33 保留不縮減）",
    ],
    inputTitle:        "輸入你的出生日期",
    inputSubtitle1:    "生命靈數由你的完整出生日期算出——",
    inputSubtitle2:    "我們展示每一步計算過程",
    labelYear:         "年",
    labelMonth:        "月",
    labelDay:          "日",
    monthNames:        ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    calcBtn:           "計算我的生命靈數",
    inputNote:         "* 免費數字命理計算器 · 展示完整計算步驟 · 僅供探索與娛樂",
    resultEyebrow:     "你的生命靈數",
    masterBadge:       "⚡ 卓越數字 · Master Number",
    calcTitle:         "你的數字是如何算出來的",
    calcNote:          "透明最重要：這裡是你結果的完整計算過程，逐位相加。卓越數 11、22、33 不再繼續縮減。",
    calcResultLabel:   "生命靈數 =",
    interpLabel:       "你的生命靈數解讀",
    traitsLabel:       "核心優勢",
    challengesLabel:   "成長課題",
    loveLabel:         "愛情與關係",
    readArticle:       (n: number) => `閱讀完整指南：生命靈數 ${n} 詳解 →`,
    readMasterArticle: (n: number) => `閱讀完整指南：卓越數 ${n} 詳解 →`,
    masterNote:        "卓越數攜帶更強的能量——既代表更高的使命，也意味著更重的課題。你的數字按完整振動解讀，不縮減為個位數。",
    fullReadingCta:    "獲取完整靈數解讀（特質、天賦、課題與幸運指南）→",
    recalcBtn:         "重新計算",
    faqTitle:          "生命靈數計算器常見問題",
    seo: [
      {
        heading: "什麼是生命靈數？",
        paragraphs: [
          "生命靈數（Life Path Number）是數字命理學中最重要的一個數字——任何一次靈數解讀都從它開始。它由你的完整出生日期推導而來，常被拿來和占星中的太陽星座類比：它描述你人生的核心主題、與生俱來的特質、此生要學習的課題，以及你自然成長的方向。",
          "與隨行星運轉變化的運勢不同，生命靈數一生不變。它在出生那一刻就已確定，因此命理師把它視為解讀的骨架——命盤中的其他數字（表現數、靈魂數、生日數）只是補充細節，生命靈數才是舞台本身。",
          "生命靈數從 1 到 9，外加三個特殊的卓越數：11、22、33。每個數字都有自己的性格畫像、優勢、盲點和感情模式。算出你的數字後，可以直接從結果頁進入該數字的完整詳解文章。",
        ],
      },
      {
        heading: "生命靈數怎麼算？（逐步教學）",
        paragraphs: [
          "生命靈數的算法簡單到用紙筆就能完成——而且我們認為你應該看到它。很多工具只丟給你一個數字、不做任何解釋；這個計算器展示完整的逐步計算過程，讓你可以自己驗證結果。",
          "標準方法如下：取你的完整出生日期，把月、日、年三部分分別按位相加縮減。例如 1985 年 10 月 25 日出生：月份 1 + 0 = 1，日期 2 + 5 = 7，年份 1 + 9 + 8 + 5 = 23，再 2 + 3 = 5。最後把三部分相加：1 + 7 + 5 = 13，再縮減：1 + 3 = 4。生命靈數 4。",
          "最容易出錯的一條規則：卓越數絕不繼續縮減。只要任何一步相加的結果是 11、22 或 33，就停在那裡——數字之和為 22 的人是卓越數 22，而不是 4。我們的計算器在每一步都應用這條規則，並在出現卓越數時特別標註。",
        ],
      },
      {
        heading: "卓越數 11、22、33",
        paragraphs: [
          "在數字命理學中，11、22 和 33 被稱為卓越數（Master Number）——雙位振動，潛力與挑戰同時被放大。它們常被描述為對應個位數的「高八度」：11 放大 2 的直覺，22 把 4 的夢想建成宏大現實，33 把 6 的關懷昇華為無私服務。",
          "卓越數 11 是「直覺者」——敏感、通靈、富有遠見，但容易神經緊張和自我懷疑。卓越數 22 是「築夢大師」——能把宏大構想變成持久的事業，風險是過勞或誤用權力。卓越數 33 是「導師」——三者中最稀有，致力於療癒與提升他人，有時以犧牲自我為代價。",
          "如果計算器算出 11、22 或 33，請把它看作重要的訊號而非巧合。結果頁會連結對應的卓越數詳解文章，完整靈數解讀也會按卓越振動來解釋你的數字，而不是把它壓平成個位數。",
        ],
      },
      {
        heading: "各生命靈數速覽",
        paragraphs: [
          "每個生命靈數都有獨特的原型。1 是獨立的開拓者與領導者；2 是擅長合作與調和的外交家；3 是創意表達者；4 是重視紀律與結構的建造者；5 是追求自由的冒險家；6 是奉獻家庭與責任的養育者；7 是分析師與靈性探索者；8 是專注野心與物質成就的實幹家；9 是胸懷世界的人道主義者。",
          "當然，一個數字只是起點，不是判決。兩個同為靈數 7 的人，可能因命盤其餘部分和自身選擇而活出完全不同的樣子。把數字當作羅盤指向，而不是固定劇本：它告訴你最適合耕耘的地形，而不是必須照走的路線。",
          "想深入了解？先在上方算出你的數字，再打開對應數字的完整詳解，看看職業方向、感情配對和與你同數字的名人。想要完整畫像——包括表現數與靈魂數——試試我們的完整靈數解讀工具。",
        ],
      },
    ] as SeoSection[],
    faq: [
      {
        q: "這個生命靈數計算器是免費的嗎？",
        a: "完全免費——無需註冊、無需信箱、沒有隱藏付費牆。輸入出生日期，立即得到你的生命靈數，附完整逐步計算過程和含義解讀。",
      },
      {
        q: "我的生命靈數是什麼？怎麼算？",
        a: "生命靈數由你的完整出生日期推導：把月、日、年的各位數字相加，再把總和縮減為個位數——除非總和是 11、22 或 33，這三個卓越數保持不變。在上方選擇出生日期，計算器會自動完成運算並展示每一步。",
      },
      {
        q: "卓越數 11、22、33 要縮減嗎？",
        a: "不要。標準數字命理學中，卓越數絕不縮減為個位數：11 保持 11（不是 2），22 保持 22（不是 4），33 保持 33（不是 6）。它們有獨特而強烈的含義——我們的計算器在計算的每個階段都會自動保留。",
      },
      {
        q: "生命靈數會隨時間改變嗎？",
        a: "不會。因為它由出生日期算出，所以終生固定——這一點不同於隨行星運轉變化的運勢。會改變的是你如何有意識地發揮它的優勢、修完它的課題。",
      },
      {
        q: "生命靈數和星座是一回事嗎？",
        a: "屬於不同體系。太陽星座來自占星學，取決於你生日時太陽的位置；生命靈數來自數字命理學，純粹是出生日期的算術。很多人發現兩者互補——生命靈數描述你的方向，太陽星座描述你的風格。",
      },
    ] as FaqItem[],
  },
};

export type LpT = (typeof T)["en"];
