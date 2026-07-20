// ===== 选水晶工具页面 UI 文案（三语） =====

import type { Locale } from "~/lib/i18n";

export interface CrystalsUI {
  back: string;
  /** 主标题（页面头部大字） */
  heading: string;
  /** 副标题 */
  subheading: string;
  /** 需求选择区提示 */
  pickPrompt: string;
  /** 石头卡片字段标签 */
  whyLabel: string;
  howToUseLabel: string;
  cleansingTitle: string;
  articlesTitle: string;
  /** SEO 内容区（SSR 输出） */
  seoSections: { heading: string; body: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  /** 页脚免责声明 */
  disclaimer: string;
}

export const CRYSTALS_UI: Record<Locale, CrystalsUI> = {
  zh: {
    back: "← 返回",
    heading: "选水晶",
    subheading: "按你的需求，找到适合你的水晶与用法",
    pickPrompt: "你现在最需要的是什么？",
    whyLabel: "为什么选它",
    howToUseLabel: "怎么用",
    cleansingTitle: "净化建议",
    articlesTitle: "延伸阅读",
    seoSections: [
      {
        heading: "怎么选适合自己的水晶？",
        body: "选水晶最简单可靠的入口不是颜色、不是价格，而是需求。先问自己：我最近最需要什么——防护避负、招财丰盛、安神助眠，还是缓解焦虑？确定意图后，再从对应的几颗石头里挑一颗「看着顺眼」的。眼缘在水晶文化里并不是玄学废话：你对某颗石头的天然偏好，往往对应着你当下真实的心理需要。选一颗开始就好，不必一次买齐。",
      },
      {
        heading: "守护石、招财水晶、助眠水晶：最常见的三类需求",
        body: "在所有水晶查询里，守护石、招财水晶和助眠水晶是被问得最多的三类。守护石（如黑碧玺、黑曜石）重在吸收与隔离负能量，适合放在门口或随身佩戴；招财水晶（如黄水晶、黄铁矿）对应行动力与机会，宜摆在财位或办公桌；助眠水晶（如紫水晶、锂云母）安抚神经系统，适合枕头下与床头柜。本工具把八类高频需求各自匹配了 4-6 颗经典石种，并给出具体的摆放与佩戴方法。",
      },
      {
        heading: "水晶需要净化吗？",
        body: "需要。水晶在使用中会吸附环境与情绪能量，定期净化是水晶养护的基本功。最常用的方法有：月光下过夜（满月最佳）、放在白水晶簇上消磁、鼠尾草或檀香烟熏，以及用流水快速冲洗（不适用于锂云母、萤石等质地较软或易溶的石种）。净化后握住水晶，重新默念你的意图，这个「设定意图」的动作，才是整个仪式的核心。",
      },
      {
        heading: "八字选水晶：五行与水晶的对应",
        body: "除了按需求选石，你还可以用自己的生日做八字选水晶。八字把出生年月日时换算成天干地支，统计金木水火土五行的强弱分布：最弱的一行是需要补益的元素，而每种水晶都有五行属性——黑蓝色系属水、绿色系属木、红紫色系属火、黄色系属土、白色透明属金。输入生日（时辰选填），工具会自动算出你的五行分布与需补元素，推荐对应的五行水晶，还能叠加你当下的诉求做双重筛选。",
      },
    ],
    faqTitle: "常见问题",
    faq: [
      {
        q: "水晶抽石占卜怎么玩？",
        a: "先在心里默想一个问题（选填），选择单石指引或三石阵，点击「开始感应抽石」。单石直指你当下最需要的一颗水晶；三石阵分别对应「当下能量、需要接纳、行动建议」三个位置。点击石面翻开后，可以看到这颗水晶的讯息、所属领域和具体用法。结果仅供自我探索与娱乐。",
      },
      {
        q: "八字选水晶是什么原理？",
        a: "八字排盘把出生的年月日时换算成四柱天干地支，每个干支都对应金木水火土之一。统计全局后最弱的一行就是你的「需补元素」；而每种水晶也有五行属性——黑蓝色系属水、绿色系属木、红紫色系属火、黄色系属土、白色透明属金。本工具把两者对应：先算你的五行分布，再推荐补益最弱一行的水晶，还可叠加你的诉求筛选。仅供自我探索与娱乐。",
      },
      {
        q: "怎么选适合自己的水晶？",
        a: "先定需求再选石头。在本页选择你当前最迫切的需求（防护、招财、助眠、抗焦虑等），然后从推荐的几颗里挑一颗最有眼缘的开始。一颗用熟，胜过一堆闲置。",
      },
      {
        q: "水晶多久净化一次？",
        a: "一般建议每 1-2 周一次；防护类和抗焦虑类因为吸收的负能量多，压力大的时候可以每周两次。月光、白水晶簇、烟熏都是安全的通用方法。",
      },
      {
        q: "可以同时佩戴或使用多种水晶吗？",
        a: "可以，但建议控制在 2-3 种以内，并且意图不要互相冲突（比如助眠的锂云母和提劲的红玉髓就不适合同时贴身用）。白水晶可以放大其他水晶，是百搭的组合石。",
      },
      {
        q: "水晶真的有功效吗？",
        a: "水晶的功效属于能量疗愈与民俗文化的范畴，没有被现代医学证实。更准确的理解是：它是一个帮你聚焦意图、安定情绪的「实体锚点」。身体不适或持续焦虑请优先就医和寻求专业帮助。",
      },
      {
        q: "新买的水晶第一步要做什么？",
        a: "先净化（月光或白水晶簇即可），然后双手握住它，清楚默念你买它的目的——比如「帮我睡个好觉」。这个设定意图的步骤做完，这颗石头才算真正「归你」。",
      },
    ],
    disclaimer: "* 水晶功效内容基于能量疗愈传统与民俗文化，仅供自我探索与娱乐参考，不构成医疗建议。",
  },
  tw: {
    back: "← 返回",
    heading: "選水晶",
    subheading: "按你的需求，找到適合你的水晶與用法",
    pickPrompt: "你現在最需要的是什麼？",
    whyLabel: "為什麼選它",
    howToUseLabel: "怎麼用",
    cleansingTitle: "淨化建議",
    articlesTitle: "延伸閱讀",
    seoSections: [
      {
        heading: "怎麼選適合自己的水晶？",
        body: "選水晶最簡單可靠的入口不是顏色、不是價格，而是需求。先問自己：我最近最需要什麼——防護避負、招財豐盛、安神助眠，還是緩解焦慮？確定意圖後，再從對應的幾顆石頭裡挑一顆「看著順眼」的。眼緣在水晶文化裡並不是玄學廢話：你對某顆石頭的天然偏好，往往對應著你當下真實的心理需要。選一顆開始就好，不必一次買齊。",
      },
      {
        heading: "守護石、招財水晶、助眠水晶：最常見的三類需求",
        body: "在所有水晶查詢裡，守護石、招財水晶和助眠水晶是被問得最多的三類。守護石（如黑碧璽、黑曜石）重在吸收與隔離負能量，適合放在門口或隨身佩戴；招財水晶（如黃水晶、黃鐵礦）對應行動力與機會，宜擺在財位或辦公桌；助眠水晶（如紫水晶、鋰雲母）安撫神經系統，適合枕頭下與床頭櫃。本工具把八類高頻需求各自匹配了 4-6 顆經典石種，並給出具體的擺放與佩戴方法。",
      },
      {
        heading: "水晶需要淨化嗎？",
        body: "需要。水晶在使用中會吸附環境與情緒能量，定期淨化是水晶養護的基本功。最常用的方法有：月光下過夜（滿月最佳）、放在白水晶簇上消磁、鼠尾草或檀香煙燻，以及用流水快速沖洗（不適用於鋰雲母、螢石等質地較軟或易溶的石種）。淨化後握住水晶，重新默念你的意圖，這個「設定意圖」的動作，才是整個儀式的核心。",
      },
      {
        heading: "八字選水晶：五行與水晶的對應",
        body: "除了按需求選石，你還可以用自己的生日做八字選水晶。八字把出生年月日時換算成天干地支，統計金木水火土五行的強弱分布：最弱的一行是需要補益的元素，而每種水晶都有五行屬性——黑藍色系屬水、綠色系屬木、紅紫色系屬火、黃色系屬土、白色透明屬金。輸入生日（時辰選填），工具會自動算出你的五行分布與需補元素，推薦對應的五行水晶，還能疊加你當下的訴求做雙重篩選。",
      },
    ],
    faqTitle: "常見問題",
    faq: [
      {
        q: "水晶抽石占卜怎麼玩？",
        a: "先在心裡默想一個問題（選填），選擇單石指引或三石陣，點擊「開始感應抽石」。單石直指你當下最需要的一顆水晶；三石陣分別對應「當下能量、需要接納、行動建議」三個位置。點擊石面翻開後，可以看到這顆水晶的訊息、所屬領域和具體用法。結果僅供自我探索與娛樂。",
      },
      {
        q: "八字選水晶是什麼原理？",
        a: "八字排盤把出生的年月日時換算成四柱天干地支，每個干支都對應金木水火土之一。統計全局後最弱的一行就是你的「需補元素」；而每種水晶也有五行屬性——黑藍色系屬水、綠色系屬木、紅紫色系屬火、黃色系屬土、白色透明屬金。本工具把兩者對應：先算你的五行分布，再推薦補益最弱一行的水晶，還可疊加你的訴求篩選。僅供自我探索與娛樂。",
      },
      {
        q: "怎麼選適合自己的水晶？",
        a: "先定需求再選石頭。在本頁選擇你當前最迫切的需求（防護、招財、助眠、抗焦慮等），然後從推薦的幾顆裡挑一顆最有眼緣的開始。一顆用熟，勝過一堆閒置。",
      },
      {
        q: "水晶多久淨化一次？",
        a: "一般建議每 1-2 週一次；防護類和抗焦慮類因為吸收的負能量多，壓力大的時候可以每週兩次。月光、白水晶簇、煙燻都是安全的通用方法。",
      },
      {
        q: "可以同時佩戴或使用多種水晶嗎？",
        a: "可以，但建議控制在 2-3 種以內，並且意圖不要互相衝突（比如助眠的鋰雲母和提勁的紅玉髓就不適合同時貼身用）。白水晶可以放大其他水晶，是百搭的組合石。",
      },
      {
        q: "水晶真的有功效嗎？",
        a: "水晶的功效屬於能量療癒與民俗文化的範疇，沒有被現代醫學證實。更準確的理解是：它是一個幫你聚焦意圖、安定情緒的「實體錨點」。身體不適或持續焦慮請優先就醫和尋求專業幫助。",
      },
      {
        q: "新買的水晶第一步要做什麼？",
        a: "先淨化（月光或白水晶簇即可），然後雙手握住它，清楚默念你買它的目的——比如「幫我睡個好覺」。這個設定意圖的步驟做完，這顆石頭才算真正「歸你」。",
      },
    ],
    disclaimer: "* 水晶功效內容基於能量療癒傳統與民俗文化，僅供自我探索與娛樂參考，不構成醫療建議。",
  },
  en: {
    back: "← Back",
    heading: "Crystal Selector",
    subheading: "Find the right stone for your intention — and how to actually use it",
    pickPrompt: "What do you need most right now?",
    whyLabel: "Why this stone",
    howToUseLabel: "How to use it",
    cleansingTitle: "Cleansing Note",
    articlesTitle: "Further Reading",
    seoSections: [
      {
        heading: "How do I choose the right crystal?",
        body: "The most reliable entry point isn't color or price — it's intention. Ask yourself first: what do I need most right now? Protection from draining energy, support for money and career, better sleep, or relief from anxiety? Once the intention is clear, pick the one stone from the recommended set that catches your eye. In crystal culture, that pull isn't superstition: your instinctive preference often mirrors a real psychological need. Start with one stone and learn it well rather than buying a whole shelf.",
      },
      {
        heading: "Protection stones, stones that attract money, and sleep stones",
        body: "Among all crystal queries, three needs dominate: protection stones (like black tourmaline and obsidian), which absorb and deflect heavy energy — keep them by the front door or in your pocket; stones that attract money (like citrine and pyrite), which pair with action and opportunity — place them in your wealth corner or workspace; and sleep stones (like amethyst and lepidolite), which calm the nervous system — slip them under your pillow or onto the nightstand. This tool maps eight common intentions to 4-6 classic stones each, with concrete placement and wearing instructions. If you're looking for crystals for anxiety in particular, start with lepidolite and blue lace agate — they're the two most recommended for calming a racing mind.",
      },
      {
        heading: "Do crystals need cleansing?",
        body: "Yes. Crystals absorb environmental and emotional energy as you use them, so regular cleansing is basic crystal care. The safest universal methods are: overnight moonlight (a full moon is ideal), resting on a clear quartz cluster, sage or sandalwood smoke, and a quick rinse under running water (skip water for soft stones like lepidolite and fluorite). After cleansing, hold the stone and restate your intention — that moment of 'setting' is the real heart of the ritual.",
      },
      {
        heading: "Crystals by Bazi: Matching Stones to Your Five Elements",
        body: "Beyond browsing by intention, you can pick a crystal by bazi five elements. A bazi chart converts your birth date and time into four pillars and tallies the strength of wood, fire, earth, metal, and water — the weakest element is the one to supplement. Every crystal carries an element too: black and blue stones are Water, green stones are Wood, red and purple are Fire, yellow and brown are Earth, white and clear are Metal. Enter your birthday (birth hour optional) and the tool computes your five-element balance, highlights your weakest element, and recommends matching stones — optionally filtered by your current intention for a double layer of personalization.",
      },
    ],
    faqTitle: "FAQ",
    faq: [
      {
        q: "How does the crystal draw work?",
        a: "Hold a question in mind (optional), pick Single Stone Guidance or the Three-Stone Spread, then tap 'Attune & Draw'. A single stone points to the crystal you need most right now; the three positions read as Current Energy, What to Embrace, and Action Advice. Tap a stone face to reveal the crystal's message, its domain, and how to use it. For self-exploration and entertainment only.",
      },
      {
        q: "How does bazi-based crystal matching work?",
        a: "A bazi chart converts your birth date and time into four pillars of heavenly stems and earthly branches, each mapped to one of the five elements (wood, fire, earth, metal, water). The weakest element in your chart is the one to supplement — and every crystal carries an element too: black/blue stones are Water, green is Wood, red/purple is Fire, yellow/brown is Earth, white/clear is Metal. This tool connects the two: it computes your five-element balance, then recommends stones of the element you lack, optionally filtered by your intention. For self-exploration and entertainment only.",
      },
      {
        q: "How do I choose the right crystal for me?",
        a: "Decide the intention first, then the stone. Pick the need that's most urgent for you on this page (protection, money, sleep, anxiety relief, etc.), then choose the one recommended stone you're most drawn to. One stone you actually use beats a drawer full of them.",
      },
      {
        q: "How often should I cleanse my crystals?",
        a: "Every 1-2 weeks as a baseline. Protection and calming stones absorb the heaviest load, so during stressful periods cleanse them twice a week. Moonlight, quartz clusters, and smoke are all safe universal methods.",
      },
      {
        q: "Can I wear or use several crystals at once?",
        a: "Yes, but keep it to 2-3 and make sure the intentions don't clash — a sleep stone like lepidolite and an energizer like carnelian shouldn't be worn together. Clear quartz amplifies other stones and pairs with everything.",
      },
      {
        q: "Do crystals really work?",
        a: "Crystal healing belongs to energy-work and folk tradition and isn't confirmed by modern medicine. A fairer framing: a crystal is a physical anchor that helps you focus intention and settle your emotions. For health issues or persistent anxiety, see a doctor or a licensed professional first.",
      },
      {
        q: "What should I do first with a new crystal?",
        a: "Cleanse it first (moonlight or a quartz cluster is fine), then hold it in both hands and state clearly why you brought it home — e.g. 'help me sleep better.' Once the intention is set, the stone is truly yours.",
      },
    ],
    disclaimer: "* Crystal meanings are based on energy-healing tradition and folklore. For self-exploration and entertainment only — not medical advice.",
  },
};


// ===== 占卜抽石模式 UI 文案（三语） =====

export interface OraclePosition {
  icon: string;
  label: string;
  desc: string;
}

export interface OracleUI {
  tabOracle: string;
  tabBrowse: string;
  howToTitle: string;
  howToSteps: string[];
  questionLabel: string;
  questionPlaceholder: string;
  modeLabel: string;
  focusHint: string;
  singleName: string;
  singleSub: string;
  singleDesc: string;
  threeName: string;
  threeSub: string;
  threeDesc: string;
  castBtn: string;
  castingText: string;
  flipHint: string;
  badgeSingle: string;
  badgeThree: string;
  revealHintSingle: string;
  revealHintThree: string;
  yourQuestion: string;
  domainLabel: string;
  oracleLabel: string;
  positions: OraclePosition[];
  again: string;
  copyResult: string;
  copied: string;
}

export const CRYSTALS_ORACLE_UI: Record<Locale, OracleUI> = {
  zh: {
    tabOracle: "水晶占卜",
    tabBrowse: "按需求选石",
    howToTitle: "怎么玩？",
    howToSteps: [
      "深呼吸三次，在心里默念一个你想问的问题（也可以写下来，或不写）",
      "选择单石指引或三石阵，点击「开始感应抽石」",
      "轻触石面翻开水晶，接收它此刻带给你的讯息",
      "把抽到的水晶用进生活：佩戴、摆放，或握着它冥想",
    ],
    questionLabel: "你的问题（选填）",
    questionPlaceholder: "例如：我最近最需要注意什么？",
    modeLabel: "— 选择抽石方式 —",
    focusHint: "默念你的问题，然后让直觉替你做决定。",
    singleName: "单石指引",
    singleSub: "One Stone",
    singleDesc: "一颗水晶，直指你当下最需要的讯息",
    threeName: "三石阵",
    threeSub: "Three Stones",
    threeDesc: "当下能量 · 需要接纳 · 行动建议",
    castBtn: "开始感应抽石",
    castingText: "水晶正在感应你的能量…",
    flipHint: "点击翻开",
    badgeSingle: "☽ 单石指引",
    badgeThree: "✦ 三石阵",
    revealHintSingle: "☽ 心存所问，轻触石面，揭晓你的水晶",
    revealHintThree: "✦ 心存所问，轻触任意石面，三段讯息将为你展开",
    yourQuestion: "你的问题",
    domainLabel: "所属领域",
    oracleLabel: "水晶的讯息",
    positions: [
      { icon: "☀️", label: "当下能量", desc: "你此刻所处的能量状态" },
      { icon: "🌊", label: "需要接纳", desc: "需要你允许与接纳的部分" },
      { icon: "🔥", label: "行动建议", desc: "接下来可以采取的具体行动" },
    ],
    again: "↺ 再抽一次",
    copyResult: "📋 复制占卜结果",
    copied: "✓ 已复制",
  },
  tw: {
    tabOracle: "水晶占卜",
    tabBrowse: "按需求選石",
    howToTitle: "怎麼玩？",
    howToSteps: [
      "深呼吸三次，在心裡默念一個你想問的問題（也可以寫下來，或不寫）",
      "選擇單石指引或三石陣，點擊「開始感應抽石」",
      "輕觸石面翻開水晶，接收它此刻帶給你的訊息",
      "把抽到的水晶用進生活：佩戴、擺放，或握著它冥想",
    ],
    questionLabel: "你的問題（選填）",
    questionPlaceholder: "例如：我最近最需要注意什麼？",
    modeLabel: "— 選擇抽石方式 —",
    focusHint: "默念你的問題，然後讓直覺替你做決定。",
    singleName: "單石指引",
    singleSub: "One Stone",
    singleDesc: "一顆水晶，直指你當下最需要的訊息",
    threeName: "三石陣",
    threeSub: "Three Stones",
    threeDesc: "當下能量 · 需要接納 · 行動建議",
    castBtn: "開始感應抽石",
    castingText: "水晶正在感應你的能量…",
    flipHint: "點擊翻開",
    badgeSingle: "☽ 單石指引",
    badgeThree: "✦ 三石陣",
    revealHintSingle: "☽ 心存所問，輕觸石面，揭曉你的水晶",
    revealHintThree: "✦ 心存所問，輕觸任意石面，三段訊息將為你展開",
    yourQuestion: "你的問題",
    domainLabel: "所屬領域",
    oracleLabel: "水晶的訊息",
    positions: [
      { icon: "☀️", label: "當下能量", desc: "你此刻所處的能量狀態" },
      { icon: "🌊", label: "需要接納", desc: "需要你允許與接納的部分" },
      { icon: "🔥", label: "行動建議", desc: "接下來可以採取的具體行動" },
    ],
    again: "↺ 再抽一次",
    copyResult: "📋 複製占卜結果",
    copied: "✓ 已複製",
  },
  en: {
    tabOracle: "Crystal Oracle",
    tabBrowse: "Browse by Intention",
    howToTitle: "How it works",
    howToSteps: [
      "Take three deep breaths and hold a question in mind (write it down, or don't)",
      "Choose Single Stone or the Three-Stone Spread, then tap 'Attune & Draw'",
      "Tap the stone face to flip your crystal and receive its message",
      "Put the drawn crystal to use: wear it, place it, or meditate with it",
    ],
    questionLabel: "Your question (optional)",
    questionPlaceholder: "e.g. What should I pay attention to right now?",
    modeLabel: "— Choose your draw —",
    focusHint: "Hold your question in mind, then let intuition decide.",
    singleName: "Single Stone Guidance",
    singleSub: "One Stone",
    singleDesc: "One crystal, pointing straight at the message you need now",
    threeName: "Three-Stone Spread",
    threeSub: "Three Stones",
    threeDesc: "Current energy · What to embrace · Action advice",
    castBtn: "Attune & Draw",
    castingText: "The crystals are attuning to your energy…",
    flipHint: "Tap to reveal",
    badgeSingle: "☽ Single Stone Guidance",
    badgeThree: "✦ Three-Stone Spread",
    revealHintSingle: "☽ Hold your question close, tap the stone to reveal your crystal",
    revealHintThree: "✦ Hold your question close, tap any stone, and three messages will unfold",
    yourQuestion: "Your question",
    domainLabel: "Domain",
    oracleLabel: "The crystal's message",
    positions: [
      { icon: "☀️", label: "Current Energy", desc: "The energy state you're in right now" },
      { icon: "🌊", label: "What to Embrace", desc: "The part you need to allow and accept" },
      { icon: "🔥", label: "Action Advice", desc: "The concrete step you can take next" },
    ],
    again: "↺ Draw Again",
    copyResult: "📋 Copy Reading",
    copied: "✓ Copied",
  },
};


// ===== 八字选石模式 UI 文案（三语） =====

export interface BaziUI {
  tabBazi: string;
  formTitle: string;
  formHint: string;
  birthDateLabel: string;
  yearPlaceholder: string;
  monthPlaceholder: string;
  dayPlaceholder: string;
  genderLabel: string;
  genderMale: string;
  genderFemale: string;
  hourLabel: string;
  hourUnknown: string;
  intentionLabel: string;
  intentionNone: string;
  calcBtn: string;
  invalidDate: string;
  dayMasterLabel: string;
  yangLabel: string;
  yinLabel: string;
  barTitle: string;
  weakestTitle: string;
  reasonLine: (el: string) => string;
  motherNote: (el: string, mother: string) => string;
  hourUnknownNote: string;
  closeScoresNote: string;
  primaryTitle: (el: string) => string;
  secondaryTitle: string;
  ctaBazi: string;
}

export const CRYSTALS_BAZI_UI: Record<Locale, BaziUI> = {
  zh: {
    tabBazi: "八字选石",
    formTitle: "输入你的生日",
    formHint: "排出四柱八字，统计你的五行强弱，找到需要补益的水晶",
    birthDateLabel: "出生日期（公历）",
    yearPlaceholder: "年",
    monthPlaceholder: "月",
    dayPlaceholder: "日",
    genderLabel: "性别（用于大运排向）",
    genderMale: "男",
    genderFemale: "女",
    hourLabel: "出生时辰（选填）",
    hourUnknown: "不知道时辰",
    intentionLabel: "想兼顾的诉求（选填）",
    intentionNone: "暂不选择",
    calcBtn: "生成我的五行水晶",
    invalidDate: "请填写完整的出生年月日",
    dayMasterLabel: "你的日主",
    yangLabel: "阳",
    yinLabel: "阴",
    barTitle: "五行分布",
    weakestTitle: "需补元素",
    reasonLine: (el) => `你的八字「${el}」行最弱，${el}行水晶帮你补益。`,
    motherNote: (el, mother) => `其中含 ${mother} 行水晶：${mother}生${el}，同样为你所用。`,
    hourUnknownNote: "未填时辰：按三柱计算，精度略低。",
    closeScoresNote: "各行分数接近，且时辰未知——需补元素仅供参考，补上时辰会更准。",
    primaryTitle: (el) => `为你补「${el}」的水晶`,
    secondaryTitle: "兼顾诉求的选择",
    ctaBazi: "查看完整八字排盘 →",
  },
  tw: {
    tabBazi: "八字選石",
    formTitle: "輸入你的生日",
    formHint: "排出四柱八字，統計你的五行強弱，找到需要補益的水晶",
    birthDateLabel: "出生日期（公曆）",
    yearPlaceholder: "年",
    monthPlaceholder: "月",
    dayPlaceholder: "日",
    genderLabel: "性別（用於大運排向）",
    genderMale: "男",
    genderFemale: "女",
    hourLabel: "出生時辰（選填）",
    hourUnknown: "不知道時辰",
    intentionLabel: "想兼顧的訴求（選填）",
    intentionNone: "暫不選擇",
    calcBtn: "生成我的五行水晶",
    invalidDate: "請填寫完整的出生年月日",
    dayMasterLabel: "你的日主",
    yangLabel: "陽",
    yinLabel: "陰",
    barTitle: "五行分布",
    weakestTitle: "需補元素",
    reasonLine: (el) => `你的八字「${el}」行最弱，${el}行水晶幫你補益。`,
    motherNote: (el, mother) => `其中含 ${mother} 行水晶：${mother}生${el}，同樣為你所用。`,
    hourUnknownNote: "未填時辰：按三柱計算，精度略低。",
    closeScoresNote: "各行分數接近，且時辰未知——需補元素僅供參考，補上時辰會更準。",
    primaryTitle: (el) => `為你補「${el}」的水晶`,
    secondaryTitle: "兼顧訴求的選擇",
    ctaBazi: "查看完整八字排盤 →",
  },
  en: {
    tabBazi: "Bazi Crystal Match",
    formTitle: "Enter your birth date",
    formHint: "Cast your four pillars, tally your five-element balance, and find the stones that supplement it",
    birthDateLabel: "Birth date (Gregorian)",
    yearPlaceholder: "YYYY",
    monthPlaceholder: "MM",
    dayPlaceholder: "DD",
    genderLabel: "Gender (for luck-cycle direction)",
    genderMale: "Male",
    genderFemale: "Female",
    hourLabel: "Birth hour (optional)",
    hourUnknown: "I don't know",
    intentionLabel: "Intention to combine (optional)",
    intentionNone: "Skip",
    calcBtn: "Reveal My Five-Element Crystals",
    invalidDate: "Please fill in a complete birth date (year, month, day)",
    dayMasterLabel: "Your Day Master",
    yangLabel: "Yang",
    yinLabel: "Yin",
    barTitle: "Five-Element Balance",
    weakestTitle: "Element to Supplement",
    reasonLine: (el) => `${el} is the weakest element in your chart — ${el} stones help replenish it.`,
    motherNote: (el, mother) => `Includes ${mother} stones: ${mother} generates ${el}, which also nourishes it.`,
    hourUnknownNote: "No birth hour: calculated from three pillars, so precision is slightly lower.",
    closeScoresNote: "The element scores are close and the birth hour is unknown — treat the result as indicative; adding the hour refines it.",
    primaryTitle: (el) => `Stones to supplement your ${el}`,
    secondaryTitle: "Also matching your intention",
    ctaBazi: "View your full bazi chart →",
  },
};
