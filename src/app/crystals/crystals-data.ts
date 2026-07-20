// ===== 选水晶工具数据：8 个需求（intention）× 每个 4-6 颗水晶 =====

import type { Locale } from "~/lib/i18n";

/** 单颗水晶的三语文案 */
export interface Stone {
  id: string;
  emoji: string;
  /** 卡片强调色 */
  color: string;
  name: Record<Locale, string>;
  /** 一句话：为什么这颗石头适合这个需求 */
  why: Record<Locale, string>;
  /** 1-2 句：具体怎么用 */
  howToUse: Record<Locale, string>;
}

/** 关联知识库文章 */
export interface IntentionArticle {
  slug: string;
  title: Record<Locale, string>;
}

export interface Intention {
  id: string;
  emoji: string;
  label: Record<Locale, string>;
  /** 选中后展示的一句话引导 */
  tagline: Record<Locale, string>;
  /** 该需求下水晶的净化建议（共享） */
  cleansing: Record<Locale, string>;
  stones: Stone[];
  articles: IntentionArticle[];
}

export const INTENTIONS: Intention[] = [
  // ─── 1. 防护 ─────────────────────────────────────────────
  {
    id: "protection",
    emoji: "🛡️",
    label: { zh: "防护避负", tw: "防護避負", en: "Protection" },
    tagline: {
      zh: "感觉最近容易被负能量影响？这几颗经典守护石帮你稳住自己的能量场。",
      tw: "感覺最近容易被負能量影響？這幾顆經典守護石幫你穩住自己的能量場。",
      en: "Feeling drained or affected by negativity lately? These classic protection stones help you hold your own energy field.",
    },
    cleansing: {
      zh: "防护类水晶吸收的负能量最多，建议每周净化一次：放在月光下过夜、用白水晶簇消磁，或以鼠尾草烟熏。黑曜石与黑碧玺也可以用流水快速冲洗后擦干。",
      tw: "防護類水晶吸收的負能量最多，建議每週淨化一次：放在月光下過夜、用白水晶簇消磁，或以鼠尾草煙燻。黑曜石與黑碧璽也可以用流水快速沖洗後擦乾。",
      en: "Protection stones absorb the heaviest energy — cleanse them weekly: overnight in moonlight, on a clear quartz cluster, or with sage smoke. Obsidian and black tourmaline can also be rinsed briefly under running water and dried.",
    },
    stones: [
      {
        id: "black-tourmaline",
        emoji: "⚫",
        color: "#9a8c98",
        name: { zh: "黑碧玺", tw: "黑碧璽", en: "Black Tourmaline" },
        why: {
          zh: "公认的防护石之首，能吸收并落地负能量，在能量学里也常被用来隔绝「能量吸血鬼」与电子环境的干扰。",
          tw: "公認的防護石之首，能吸收並落地負能量，在能量學裡也常被用來隔絕「能量吸血鬼」與電子環境的干擾。",
          en: "The undisputed first choice among protection stones — it absorbs and grounds negative energy, and is traditionally used to shield against 'energy vampires' and heavy environments.",
        },
        howToUse: {
          zh: "放一块在家门口玄关处，或随身放在口袋里；做成手链佩戴时戴左手（接收侧）。",
          tw: "放一塊在家門口玄關處，或隨身放在口袋裡；做成手鍊佩戴時戴左手（接收側）。",
          en: "Keep a piece by your front door or carry one in your pocket; worn as a bracelet, place it on the left wrist (the receiving side).",
        },
      },
      {
        id: "obsidian",
        emoji: "🖤",
        color: "#8d99ae",
        name: { zh: "黑曜石", tw: "黑曜石", en: "Obsidian" },
        why: {
          zh: "火山玻璃形成的「真相之镜」，防护力极强，能帮你看清并切断消耗性的关系与幻象。",
          tw: "火山玻璃形成的「真相之鏡」，防護力極強，能幫你看清並切斷消耗性的關係與幻象。",
          en: "Volcanic glass known as a 'mirror of truth' — an intensely protective stone that helps you see through illusions and cut draining attachments.",
        },
        howToUse: {
          zh: "在办公桌上朝外摆放，或进入让你疲惫的场合时随身携带。",
          tw: "在辦公桌上朝外擺放，或進入讓你疲憊的場合時隨身攜帶。",
          en: "Place it facing outward on your desk, or carry it when entering environments that usually drain you.",
        },
      },
      {
        id: "smoky-quartz",
        emoji: "🟤",
        color: "#b08968",
        name: { zh: "茶晶", tw: "茶晶", en: "Smoky Quartz" },
        why: {
          zh: "把负能量转化为大地能量的「转化石」，防护的同时带来温和稳定的落地感，适合全天佩戴。",
          tw: "把負能量轉化為大地能量的「轉化石」，防護的同時帶來溫和穩定的落地感，適合全天佩戴。",
          en: "A transmuting stone that turns negativity into grounded earth energy — protective yet gentle enough for all-day wear.",
        },
        howToUse: {
          zh: "做成吊坠贴身佩戴，或在包里放一颗随形小石，随时握一握。",
          tw: "做成吊墜貼身佩戴，或在包裡放一顆隨形小石，隨時握一握。",
          en: "Wear it as a pendant close to the body, or keep a tumbled stone in your bag to hold whenever you feel scattered.",
        },
      },
      {
        id: "amethyst",
        emoji: "💜",
        color: "#b388eb",
        name: { zh: "紫水晶", tw: "紫水晶", en: "Amethyst" },
        why: {
          zh: "在灵性层面提供防护，净化气场，同时安抚过度紧绷的思绪，是「防护 + 静心」的双效石。",
          tw: "在靈性層面提供防護，淨化氣場，同時安撫過度緊繃的思緒，是「防護 + 靜心」的雙效石。",
          en: "Protects on the spiritual level by purifying the aura while calming an overwrought mind — a two-in-one stone for protection and peace.",
        },
        howToUse: {
          zh: "放在卧室床头或冥想角；冥想时握在手心，观想紫色光罩包裹全身。",
          tw: "放在臥室床頭或冥想角；冥想時握在手心，觀想紫色光罩包裹全身。",
          en: "Keep it on your nightstand or in your meditation corner; hold it during meditation and visualize a violet shield around you.",
        },
      },
      {
        id: "labradorite",
        emoji: "🌈",
        color: "#64dfdf",
        name: { zh: "拉长石", tw: "拉長石", en: "Labradorite" },
        why: {
          zh: "被称为「气场盾牌」，能防止自身能量外泄，特别适合容易被他人情绪带走的共感人。",
          tw: "被稱為「氣場盾牌」，能防止自身能量外洩，特別適合容易被他人情緒帶走的共感人。",
          en: "Known as the 'aura shield' — it prevents your own energy from leaking out, making it the classic stone for empaths who absorb others' emotions.",
        },
        howToUse: {
          zh: "去人多的场合或要见难相处的人之前佩戴；握住它深呼吸三次再进门。",
          tw: "去人多的場合或要見難相處的人之前佩戴；握住它深呼吸三次再進門。",
          en: "Wear it before crowds or difficult encounters; hold it and take three slow breaths before walking in.",
        },
      },
    ],
    articles: [
      {
        slug: "crystals-for-protection",
        title: {
          zh: "防护水晶完全指南：抵御负能量的石头",
          tw: "防護水晶完全指南：抵禦負能量的石頭",
          en: "Crystals for Protection: The Complete Guide",
        },
      },
      {
        slug: "black-tourmaline-meaning-and-healing-properties",
        title: {
          zh: "黑碧玺的含义与疗愈功效",
          tw: "黑碧璽的含義與療癒功效",
          en: "Black Tourmaline Meaning & Healing Properties",
        },
      },
    ],
  },

  // ─── 2. 招财 ─────────────────────────────────────────────
  {
    id: "money",
    emoji: "💰",
    label: { zh: "招财丰盛", tw: "招財豐盛", en: "Money & Abundance" },
    tagline: {
      zh: "想提升财运、吸引机会？这几颗「招财水晶」帮你把注意力与行动力对准丰盛。",
      tw: "想提升財運、吸引機會？這幾顆「招財水晶」幫你把注意力與行動力對準豐盛。",
      en: "Want to attract wealth and opportunity? These abundance stones help align your focus and action with prosperity.",
    },
    cleansing: {
      zh: "招财水晶常与金钱、环境频繁接触，建议每两周净化一次：清晨阳光晒 1-2 小时（黄水晶避免暴晒褪色，改用月光）、白水晶簇消磁或香薰烟熏。净化后重新设定你的财富意图。",
      tw: "招財水晶常與金錢、環境頻繁接觸，建議每兩週淨化一次：清晨陽光曬 1-2 小時（黃水晶避免曝曬褪色，改用月光）、白水晶簇消磁或香薰煙燻。淨化後重新設定你的財富意圖。",
      en: "Money stones touch cash and busy environments often — cleanse them every two weeks: 1-2 hours of gentle morning sun (use moonlight for citrine, which can fade), a clear quartz cluster, or incense smoke. Reset your abundance intention afterward.",
    },
    stones: [
      {
        id: "citrine",
        emoji: "💛",
        color: "#ffd166",
        name: { zh: "黄水晶", tw: "黃水晶", en: "Citrine" },
        why: {
          zh: "著名的「商人之石」，象征太阳般的丰盛能量，既招财也帮你守住财富、增强财务上的自信。",
          tw: "著名的「商人之石」，象徵太陽般的豐盛能量，既招財也幫你守住財富、增強財務上的自信。",
          en: "The famous 'merchant's stone' — it carries sunny abundance energy, traditionally used both to attract wealth and to hold onto it with confidence.",
        },
        howToUse: {
          zh: "放在家中或办公桌的财位（进门斜对角），或放一颗在钱包、收银处。",
          tw: "放在家中或辦公桌的財位（進門斜對角），或放一顆在錢包、收銀處。",
          en: "Place it in the wealth corner of your home or desk (the far corner from the door), or keep a small one in your wallet or cash drawer.",
        },
      },
      {
        id: "pyrite",
        emoji: "✨",
        color: "#e0aa3e",
        name: { zh: "黄铁矿", tw: "黃鐵礦", en: "Pyrite" },
        why: {
          zh: "「愚人金」其实是机会磁铁：它强化把想法变成行动的意志力，让财运不止停留在想象里。",
          tw: "「愚人金」其實是機會磁鐵：它強化把想法變成行動的意志力，讓財運不止停留在想像裡。",
          en: "'Fool's gold' is anything but foolish — it's an opportunity magnet that strengthens the willpower to turn ideas into income.",
        },
        howToUse: {
          zh: "摆在办公桌你处理财务、做方案的位置；谈合作前握一握它。",
          tw: "擺在辦公桌你處理財務、做方案的位置；談合作前握一握它。",
          en: "Keep it where you do financial planning or client work; hold it before negotiations or pitches.",
        },
      },
      {
        id: "green-aventurine",
        emoji: "💚",
        color: "#80ed99",
        name: { zh: "绿东陵石", tw: "綠東陵石", en: "Green Aventurine" },
        why: {
          zh: "「机会之石」，为求职、转行、新计划带来好运，是开启新财源时的首选。",
          tw: "「機會之石」，為求職、轉行、新計畫帶來好運，是開啟新財源時的首選。",
          en: "The 'stone of opportunity' — it brings luck to job hunts, career changes, and new ventures, making it ideal when opening new income streams.",
        },
        howToUse: {
          zh: "面试、投标、谈薪时随身带一颗；新项目启动时放在电脑旁。",
          tw: "面試、投標、談薪時隨身帶一顆；新專案啟動時放在電腦旁。",
          en: "Carry one to interviews, pitches, and salary talks; keep it beside your computer when launching a new project.",
        },
      },
      {
        id: "tigers-eye",
        emoji: "🟡",
        color: "#f4a261",
        name: { zh: "虎眼石", tw: "虎眼石", en: "Tiger's Eye" },
        why: {
          zh: "脚踏实地的财富石：提升务实判断力与胆识，帮你在金钱决策上不犹豫、不冲动。",
          tw: "腳踏實地的財富石：提升務實判斷力與膽識，幫你在金錢決策上不猶豫、不衝動。",
          en: "A grounded prosperity stone — it sharpens practical judgment and courage, helping you make money decisions without hesitation or impulsiveness.",
        },
        howToUse: {
          zh: "做重大财务决定（投资、签约、大额消费）时戴虎眼石手链在右手（行动侧）。",
          tw: "做重大財務決定（投資、簽約、大額消費）時戴虎眼石手鍊在右手（行動側）。",
          en: "Wear a tiger's eye bracelet on your right wrist (the action side) when making big financial decisions — investments, contracts, major purchases.",
        },
      },
      {
        id: "clear-quartz",
        emoji: "🔮",
        color: "#e0e1dd",
        name: { zh: "白水晶", tw: "白水晶", en: "Clear Quartz" },
        why: {
          zh: "「万能放大器」：能被设定任何意图，并放大周围其他招财水晶的能量。",
          tw: "「萬能放大器」：能被設定任何意圖，並放大周圍其他招財水晶的能量。",
          en: "The 'master amplifier' — it can be programmed with any intention and magnifies the energy of your other money stones.",
        },
        howToUse: {
          zh: "双手握住白水晶，清楚默念你的财富目标，然后把它和其他招财石摆在一起。",
          tw: "雙手握住白水晶，清楚默念你的財富目標，然後把它和其他招財石擺在一起。",
          en: "Hold it in both hands, state your wealth goal clearly, then place it together with your other abundance stones.",
        },
      },
    ],
    articles: [
      {
        slug: "crystals-for-abundance-and-money",
        title: {
          zh: "招财与丰盛水晶指南",
          tw: "招財與豐盛水晶指南",
          en: "Crystals for Abundance and Money",
        },
      },
    ],
  },

  // ─── 3. 助眠 ─────────────────────────────────────────────
  {
    id: "sleep",
    emoji: "😴",
    label: { zh: "安神助眠", tw: "安神助眠", en: "Better Sleep" },
    tagline: {
      zh: "躺下后脑子停不下来？这几颗助眠水晶陪你把夜晚调回安静模式。",
      tw: "躺下後腦子停不下來？這幾顆助眠水晶陪你把夜晚調回安靜模式。",
      en: "Mind won't switch off at night? These sleep stones help you ease back into quiet mode.",
    },
    cleansing: {
      zh: "助眠水晶每晚贴身工作，建议每周净化一次：月光下过夜是最温和合适的方式（月光石尤其喜欢满月），也可用白水晶簇。避免用盐水浸泡锂云母，它质地较软。",
      tw: "助眠水晶每晚貼身工作，建議每週淨化一次：月光下過夜是最溫和合適的方式（月光石尤其喜歡滿月），也可用白水晶簇。避免用鹽水浸泡鋰雲母，它質地較軟。",
      en: "Sleep stones work beside you every night — cleanse them weekly: overnight moonlight is the gentlest method (moonstone especially loves the full moon), or use a clear quartz cluster. Avoid soaking lepidolite in salt water; it's a soft stone.",
    },
    stones: [
      {
        id: "amethyst",
        emoji: "💜",
        color: "#b388eb",
        name: { zh: "紫水晶", tw: "紫水晶", en: "Amethyst" },
        why: {
          zh: "安抚神经系统的经典助眠石，缓解睡前的思绪反刍与轻度失眠。",
          tw: "安撫神經系統的經典助眠石，緩解睡前的思緒反芻與輕度失眠。",
          en: "The classic sleep stone — it soothes the nervous system and eases bedtime rumination and mild insomnia.",
        },
        howToUse: {
          zh: "放一颗在枕头下或床头柜上；睡前握在手里做十次缓慢深呼吸。",
          tw: "放一顆在枕頭下或床頭櫃上；睡前握在手裡做十次緩慢深呼吸。",
          en: "Place one under your pillow or on the nightstand; hold it for ten slow, deep breaths before lights out.",
        },
      },
      {
        id: "moonstone",
        emoji: "🌙",
        color: "#caf0f8",
        name: { zh: "月光石", tw: "月光石", en: "Moonstone" },
        why: {
          zh: "与月亮节律同频，抚平睡前翻涌的情绪，帮身体想起「该休息了」。",
          tw: "與月亮節律同頻，撫平睡前翻湧的情緒，幫身體想起「該休息了」。",
          en: "Attuned to lunar rhythms, it smooths out evening emotional turbulence and reminds the body it's time to rest.",
        },
        howToUse: {
          zh: "睡前仪式时握在手心，配合调暗灯光；满月之夜把它放窗台「充电」。",
          tw: "睡前儀式時握在手心，配合調暗燈光；滿月之夜把它放窗台「充電」。",
          en: "Hold it during your wind-down ritual as you dim the lights; recharge it on the windowsill on full-moon nights.",
        },
      },
      {
        id: "lepidolite",
        emoji: "🟣",
        color: "#c8b6ff",
        name: { zh: "锂云母", tw: "鋰雲母", en: "Lepidolite" },
        why: {
          zh: "天然含锂的「安定石」，是对付焦虑型失眠最常被推荐的水晶。",
          tw: "天然含鋰的「安定石」，是對付焦慮型失眠最常被推薦的水晶。",
          en: "A naturally lithium-bearing stone — the most-recommended crystal for anxiety-driven sleeplessness.",
        },
        howToUse: {
          zh: "直接放在床头柜上，让它的能量覆盖你的睡眠区；半夜醒来握住它重新入睡。",
          tw: "直接放在床頭櫃上，讓它的能量覆蓋你的睡眠區；半夜醒來握住它重新入睡。",
          en: "Keep it on your nightstand so it 'covers' your sleep zone; if you wake at night, hold it while you settle back down.",
        },
      },
      {
        id: "howlite",
        emoji: "⚪",
        color: "#e5e5e5",
        name: { zh: "白纹石", tw: "白紋石", en: "Howlite" },
        why: {
          zh: "专门对付「停不下来的脑内弹幕」，松开身体的紧绷感，是失眠人士的口袋石。",
          tw: "專門對付「停不下來的腦內彈幕」，鬆開身體的緊繃感，是失眠人士的口袋石。",
          en: "The go-to stone for a racing mind — it quiets mental chatter and releases physical tension that keeps you awake.",
        },
        howToUse: {
          zh: "放在枕头下，或躺在床上时握在手里，从脚到头逐部位放松。",
          tw: "放在枕頭下，或躺在床上時握在手裡，從腳到頭逐部位放鬆。",
          en: "Slip it under your pillow, or hold it in bed while relaxing your body part by part, from toes to head.",
        },
      },
    ],
    articles: [],
  },

  // ─── 4. 抗焦虑 ───────────────────────────────────────────
  {
    id: "anxiety",
    emoji: "🌿",
    label: { zh: "静心抗焦虑", tw: "靜心抗焦慮", en: "Calm & Anxiety Relief" },
    tagline: {
      zh: "焦虑上头时，手里握住一颗对的石头，配合呼吸，会比干熬好过很多。",
      tw: "焦慮上頭時，手裡握住一顆對的石頭，配合呼吸，會比乾熬好過很多。",
      en: "When anxiety spikes, holding the right stone while you breathe beats white-knuckling through it.",
    },
    cleansing: {
      zh: "抗焦虑水晶承载较多情绪能量，建议情绪低落的时期每周净化两次：月光、白水晶簇或檀香烟熏均可。净化时可以顺便做个深呼吸练习，把自己的状态也一起「重置」。",
      tw: "抗焦慮水晶承載較多情緒能量，建議情緒低落的時期每週淨化兩次：月光、白水晶簇或檀香煙燻均可。淨化時可以順便做個深呼吸練習，把自己的狀態也一起「重置」。",
      en: "Calming stones carry a lot of emotional load — cleanse them twice a week during heavy periods: moonlight, a quartz cluster, or sandalwood smoke. Use cleansing time for a few deep breaths to reset yourself too.",
    },
    stones: [
      {
        id: "lepidolite",
        emoji: "🟣",
        color: "#c8b6ff",
        name: { zh: "锂云母", tw: "鋰雲母", en: "Lepidolite" },
        why: {
          zh: "天然含锂，被称为水晶界的「安定剂」，在焦虑螺旋刚起时帮你踩刹车。",
          tw: "天然含鋰，被稱為水晶界的「安定劑」，在焦慮螺旋剛起時幫你踩剎車。",
          en: "Naturally lithium-bearing and often called the crystal world's 'chill pill' — it helps you brake early in an anxiety spiral.",
        },
        howToUse: {
          zh: "随身放在口袋或包里；感觉心慌时握在手心，做 4-7-8 呼吸（吸 4 秒、屏 7 秒、呼 8 秒）。",
          tw: "隨身放在口袋或包裡；感覺心慌時握在手心，做 4-7-8 呼吸（吸 4 秒、屏 7 秒、呼 8 秒）。",
          en: "Carry it in your pocket or bag; when your heart races, hold it and do 4-7-8 breathing (inhale 4s, hold 7s, exhale 8s).",
        },
      },
      {
        id: "blue-lace-agate",
        emoji: "🩵",
        color: "#90e0ef",
        name: { zh: "蓝纹玛瑙", tw: "藍紋瑪瑙", en: "Blue Lace Agate" },
        why: {
          zh: "柔和的浅蓝色对应喉轮，安抚紧绷的神经，特别适合「一紧张就说不出话」的社交焦虑。",
          tw: "柔和的淺藍色對應喉輪，安撫緊繃的神經，特別適合「一緊張就說不出話」的社交焦慮。",
          en: "Its soft blue resonates with the throat chakra — it calms frayed nerves, especially the social anxiety of freezing up when you need to speak.",
        },
        howToUse: {
          zh: "重要的谈话、汇报、电话前，佩戴蓝纹玛瑙吊坠或握在手里一分钟。",
          tw: "重要的談話、匯報、電話前，佩戴藍紋瑪瑙吊墜或握在手裡一分鐘。",
          en: "Wear it as a pendant or hold it for a minute before difficult conversations, presentations, or phone calls.",
        },
      },
      {
        id: "rose-quartz",
        emoji: "🩷",
        color: "#ffb3c6",
        name: { zh: "粉晶", tw: "粉晶", en: "Rose Quartz" },
        why: {
          zh: "很多焦虑来自对自己的苛责；粉晶的温柔能量软化内在批评声，帮你对自己好一点。",
          tw: "很多焦慮來自對自己的苛責；粉晶的溫柔能量軟化內在批評聲，幫你對自己好一點。",
          en: "Much anxiety comes from self-criticism — rose quartz softens the inner critic and helps you treat yourself with compassion.",
        },
        howToUse: {
          zh: "冥想或睡前把它放在心口，默念一句自我接纳的话；平时戴在心轮位置。",
          tw: "冥想或睡前把它放在心口，默念一句自我接納的話；平時戴在心輪位置。",
          en: "Rest it on your heart during meditation or before sleep, repeating one self-accepting phrase; wear it at heart level during the day.",
        },
      },
      {
        id: "amethyst",
        emoji: "💜",
        color: "#b388eb",
        name: { zh: "紫水晶", tw: "紫水晶", en: "Amethyst" },
        why: {
          zh: "让过热的头脑降温，稳定起伏的情绪，是冥想与日常定心的万用石。",
          tw: "讓過熱的頭腦降溫，穩定起伏的情緒，是冥想與日常定心的萬用石。",
          en: "Cools an overheated mind and steadies mood swings — an all-purpose stone for meditation and daily centering.",
        },
        howToUse: {
          zh: "作为冥想手握石使用；工作压力大时放一颗在显示器旁。",
          tw: "作為冥想手握石使用；工作壓力大時放一顆在顯示器旁。",
          en: "Use it as a palm stone in meditation; keep one beside your monitor on high-pressure workdays.",
        },
      },
      {
        id: "smoky-quartz",
        emoji: "🟤",
        color: "#b08968",
        name: { zh: "茶晶", tw: "茶晶", en: "Smoky Quartz" },
        why: {
          zh: "焦虑是飘在半空的能量，茶晶把它引回大地，帮你重新感觉「脚踩在地上」。",
          tw: "焦慮是飄在半空的能量，茶晶把它引回大地，幫你重新感覺「腳踩在地上」。",
          en: "Anxiety is energy floating untethered — smoky quartz grounds it back into the earth so you feel your feet on the floor again.",
        },
        howToUse: {
          zh: "赤脚站在地上，双手各握一颗茶晶，闭眼做一分钟接地呼吸。",
          tw: "赤腳站在地上，雙手各握一顆茶晶，閉眼做一分鐘接地呼吸。",
          en: "Stand barefoot, hold a smoky quartz in each hand, and do a minute of grounding breaths with your eyes closed.",
        },
      },
    ],
    articles: [
      {
        slug: "crystals-for-anxiety-and-stress",
        title: {
          zh: "缓解焦虑与压力的水晶指南",
          tw: "緩解焦慮與壓力的水晶指南",
          en: "Crystals for Anxiety and Stress",
        },
      },
    ],
  },

  // ─── 5. 爱情 ─────────────────────────────────────────────
  {
    id: "love",
    emoji: "💗",
    label: { zh: "爱情桃花", tw: "愛情桃花", en: "Love & Relationships" },
    tagline: {
      zh: "想吸引爱情、修复关系，或先学会爱自己？从这几颗心轮水晶开始。",
      tw: "想吸引愛情、修復關係，或先學會愛自己？從這幾顆心輪水晶開始。",
      en: "Attracting love, healing a relationship, or learning self-love first? Start with these heart-chakra stones.",
    },
    cleansing: {
      zh: "爱情类水晶多与心轮共振，建议每月满月时净化并重新设定意图：月光下过夜最佳，也可放在白水晶簇上。石榴石与蔷薇辉石可以用流水快速冲洗。",
      tw: "愛情類水晶多與心輪共振，建議每月滿月時淨化並重新設定意圖：月光下過夜最佳，也可放在白水晶簇上。石榴石與薔薇輝石可以用流水快速沖洗。",
      en: "Love stones resonate with the heart chakra — cleanse and re-set intentions at each full moon: overnight moonlight is ideal, or rest them on a quartz cluster. Garnet and rhodonite can be rinsed briefly under running water.",
    },
    stones: [
      {
        id: "rose-quartz",
        emoji: "🩷",
        color: "#ffb3c6",
        name: { zh: "粉晶", tw: "粉晶", en: "Rose Quartz" },
        why: {
          zh: "爱情之石本石：打开心轮，既吸引新的爱，也滋养已有的关系——包括你和自己。",
          tw: "愛情之石本石：打開心輪，既吸引新的愛，也滋養已有的關係——包括你和自己。",
          en: "The love stone itself — it opens the heart chakra, attracting new love and nourishing existing bonds, including the one with yourself.",
        },
        howToUse: {
          zh: "卧室床头成对摆放；日常佩戴在心口位置，招桃花也养心气。",
          tw: "臥室床頭成對擺放；日常佩戴在心口位置，招桃花也養心氣。",
          en: "Place a pair on your nightstand; wear it over your heart daily to attract romance and soften your own heart.",
        },
      },
      {
        id: "rhodonite",
        emoji: "🌸",
        color: "#f28482",
        name: { zh: "蔷薇辉石", tw: "薔薇輝石", en: "Rhodonite" },
        why: {
          zh: "「关系修复石」：疗愈旧情伤，化解怨恨，让心腾出位置给新的可能。",
          tw: "「關係修復石」：療癒舊情傷，化解怨恨，讓心騰出位置給新的可能。",
          en: "The 'relationship rescue stone' — it heals old heartbreaks and dissolves resentment, clearing space for something new.",
        },
        howToUse: {
          zh: "处理旧情绪时随身带着；写「放下清单」时握在手里，写完把石头净化一次。",
          tw: "處理舊情緒時隨身帶著；寫「放下清單」時握在手裡，寫完把石頭淨化一次。",
          en: "Carry it while processing old wounds; hold it while writing a 'letting-go list', then cleanse the stone afterward.",
        },
      },
      {
        id: "green-aventurine",
        emoji: "💚",
        color: "#80ed99",
        name: { zh: "绿东陵石", tw: "綠東陵石", en: "Green Aventurine" },
        why: {
          zh: "为心轮带来轻盈的好运，适合准备好迎接新恋情、想增加遇见机会的人。",
          tw: "為心輪帶來輕盈的好運，適合準備好迎接新戀情、想增加遇見機會的人。",
          en: "Brings lighthearted luck to the heart chakra — ideal if you're ready for a new relationship and want more chances to meet someone.",
        },
        howToUse: {
          zh: "约会、聚会、认识新朋友的场合随身佩戴，保持「好运体质」在线。",
          tw: "約會、聚會、認識新朋友的場合隨身佩戴，保持「好運體質」在線。",
          en: "Wear it to dates, parties, and anywhere you might meet someone new — it keeps your 'luck field' switched on.",
        },
      },
      {
        id: "moonstone",
        emoji: "🌙",
        color: "#caf0f8",
        name: { zh: "月光石", tw: "月光石", en: "Moonstone" },
        why: {
          zh: "提升情感的细腻度与直觉，帮伴侣之间更好地感知彼此的情绪变化。",
          tw: "提升情感的細膩度與直覺，幫伴侶之間更好地感知彼此的情緒變化。",
          en: "Heightens emotional attunement and intuition, helping partners sense each other's moods more accurately.",
        },
        howToUse: {
          zh: "作为情侣之间的互赠信物；或放在共同的卧室里，增进情感流动。",
          tw: "作為情侶之間的互贈信物；或放在共同的臥室裡，增進情感流動。",
          en: "Exchange it as a token between partners, or keep it in your shared bedroom to keep emotional currents flowing.",
        },
      },
      {
        id: "garnet",
        emoji: "❤️",
        color: "#e63946",
        name: { zh: "石榴石", tw: "石榴石", en: "Garnet" },
        why: {
          zh: "热情与承诺之石，为趋于平淡的关系重新点燃亲密与行动力。",
          tw: "熱情與承諾之石，為趨於平淡的關係重新點燃親密與行動力。",
          en: "The stone of passion and commitment — it rekindles intimacy and drive in relationships that have gone flat.",
        },
        howToUse: {
          zh: "贴身佩戴石榴石饰品；约会之夜戴上它，提醒自己主动表达。",
          tw: "貼身佩戴石榴石飾品；約會之夜戴上它，提醒自己主動表達。",
          en: "Wear garnet jewelry close to the skin; put it on for date night as a reminder to express yourself boldly.",
        },
      },
    ],
    articles: [],
  },

  // ─── 6. 专注事业 ─────────────────────────────────────────
  {
    id: "focus",
    emoji: "🎯",
    label: { zh: "事业专注", tw: "事業專注", en: "Focus & Career" },
    tagline: {
      zh: "效率低、容易分心、关键时刻不敢出手？这几颗石头帮你进入状态。",
      tw: "效率低、容易分心、關鍵時刻不敢出手？這幾顆石頭幫你進入狀態。",
      en: "Distracted, procrastinating, or hesitating at key moments? These stones help you lock in.",
    },
    cleansing: {
      zh: "办公场景的水晶接触人多事杂，建议每两周净化一次：清晨阳光 1 小时、白水晶簇或香薰烟熏。萤石硬度低，避免与硬物碰撞和水泡。",
      tw: "辦公場景的水晶接觸人多事雜，建議每兩週淨化一次：清晨陽光 1 小時、白水晶簇或香薰煙燻。螢石硬度低，避免與硬物碰撞和水泡。",
      en: "Desk stones deal with busy, crowded energy — cleanse every two weeks: an hour of morning sun, a quartz cluster, or incense smoke. Fluorite is soft; avoid knocks and soaking.",
    },
    stones: [
      {
        id: "fluorite",
        emoji: "🟢",
        color: "#95d5b2",
        name: { zh: "萤石", tw: "螢石", en: "Fluorite" },
        why: {
          zh: "「天才之石」：把混乱的思绪整理成清晰的结构，学习与深度工作的首选。",
          tw: "「天才之石」：把混亂的思緒整理成清晰的結構，學習與深度工作的首選。",
          en: "The 'genius stone' — it organizes mental clutter into clear structure, making it the top pick for study and deep work.",
        },
        howToUse: {
          zh: "摆在书桌左手边，学习或写方案时进入视线；番茄钟的 25 分钟里不让手机靠近它。",
          tw: "擺在書桌左手邊，學習或寫方案時進入視線；番茄鐘的 25 分鐘裡不讓手機靠近它。",
          en: "Keep it on the left side of your desk where it stays in view while you work; pair it with phone-free 25-minute focus sprints.",
        },
      },
      {
        id: "clear-quartz",
        emoji: "🔮",
        color: "#e0e1dd",
        name: { zh: "白水晶", tw: "白水晶", en: "Clear Quartz" },
        why: {
          zh: "放大专注力与目标感，把「想做的事」校准成「正在做的事」。",
          tw: "放大專注力與目標感，把「想做的事」校準成「正在做的事」。",
          en: "Amplifies focus and intention — it closes the gap between what you mean to do and what you're actually doing.",
        },
        howToUse: {
          zh: "用白水晶柱尖端朝向你的工作区；开工前握住它默念今天的三个重点。",
          tw: "用白水晶柱尖端朝向你的工作區；開工前握住它默念今天的三個重點。",
          en: "Point a quartz tower toward your workspace; hold it each morning and name your top three priorities for the day.",
        },
      },
      {
        id: "tigers-eye",
        emoji: "🟡",
        color: "#f4a261",
        name: { zh: "虎眼石", tw: "虎眼石", en: "Tiger's Eye" },
        why: {
          zh: "给你「出手」的魄力：关键时刻的决断力与执行力，适合汇报、谈判、上台。",
          tw: "給你「出手」的魄力：關鍵時刻的決斷力與執行力，適合匯報、談判、上台。",
          en: "Gives you the nerve to act — decisiveness and follow-through for presentations, negotiations, and big moments.",
        },
        howToUse: {
          zh: "重要会议或汇报戴虎眼石手链；会前握十秒，把要说的话在心里过一遍。",
          tw: "重要會議或匯報戴虎眼石手鍊；會前握十秒，把要說的話在心裡過一遍。",
          en: "Wear a tiger's eye bracelet to key meetings; hold it for ten seconds beforehand while rehearsing your main points.",
        },
      },
      {
        id: "lapis-lazuli",
        emoji: "🔵",
        color: "#4361ee",
        name: { zh: "青金石", tw: "青金石", en: "Lapis Lazuli" },
        why: {
          zh: "智慧与真实表达之石，帮你在公众表达、述职答辩时说得清楚、站得稳。",
          tw: "智慧與真實表達之石，幫你在公眾表達、述職答辯時說得清楚、站得穩。",
          en: "The stone of wisdom and truthful expression — it helps you speak clearly and stand your ground in reviews and public speaking.",
        },
        howToUse: {
          zh: "需要公开发言时佩戴在喉部位置（项链、领针），或提前一晚握在手里演练。",
          tw: "需要公開發言時佩戴在喉部位置（項鍊、領針），或提前一晚握在手裡演練。",
          en: "Wear it at the throat (necklace or lapel pin) when speaking publicly, or hold it while rehearsing the night before.",
        },
      },
    ],
    articles: [],
  },

  // ─── 7. 梦境直觉 ─────────────────────────────────────────
  {
    id: "dreams",
    emoji: "🌌",
    label: { zh: "梦境直觉", tw: "夢境直覺", en: "Dreams & Intuition" },
    tagline: {
      zh: "想记得更多梦、读懂梦的提示，或让直觉更敏锐？从枕边这几颗开始。",
      tw: "想記得更多夢、讀懂夢的提示，或讓直覺更敏銳？從枕邊這幾顆開始。",
      en: "Want richer dream recall, clearer dream messages, or sharper intuition? Start with these bedside stones.",
    },
    cleansing: {
      zh: "梦境类水晶在夜间持续工作，建议每周在月光下净化（满月最佳），也可放在白水晶簇上。青金石忌长时间泡水，用干布擦拭即可。",
      tw: "夢境類水晶在夜間持續工作，建議每週在月光下淨化（滿月最佳），也可放在白水晶簇上。青金石忌長時間泡水，用乾布擦拭即可。",
      en: "Dream stones work all night — cleanse them weekly in moonlight (full moon is best) or on a quartz cluster. Lapis lazuli dislikes long soaks; wipe it with a dry cloth instead.",
    },
    stones: [
      {
        id: "amethyst",
        emoji: "💜",
        color: "#b388eb",
        name: { zh: "紫水晶", tw: "紫水晶", en: "Amethyst" },
        why: {
          zh: "开启眉心轮的经典梦境石，让梦更清晰、醒来更容易记住细节。",
          tw: "開啟眉心輪的經典夢境石，讓夢更清晰、醒來更容易記住細節。",
          en: "The classic third-eye dream stone — it makes dreams more vivid and the details easier to remember on waking.",
        },
        howToUse: {
          zh: "放在枕头下，床头备一本梦境日记，醒来第一时间记录碎片。",
          tw: "放在枕頭下，床頭備一本夢境日記，醒來第一時間記錄碎片。",
          en: "Slip it under your pillow and keep a dream journal within reach — write down fragments the moment you wake.",
        },
      },
      {
        id: "labradorite",
        emoji: "🌈",
        color: "#64dfdf",
        name: { zh: "拉长石", tw: "拉長石", en: "Labradorite" },
        why: {
          zh: "「面纱后的石头」：唤醒直觉与灵感，让潜意识的信息更容易浮上来。",
          tw: "「面紗後的石頭」：喚醒直覺與靈感，讓潛意識的訊息更容易浮上來。",
          en: "The 'stone behind the veil' — it awakens intuition and lets subconscious messages surface more easily.",
        },
        howToUse: {
          zh: "睡前冥想时握住它，向潜意识提一个问题，然后带着问题入睡。",
          tw: "睡前冥想時握住它，向潛意識提一個問題，然後帶著問題入睡。",
          en: "Hold it in a pre-sleep meditation, ask your subconscious one question, then drift off with the question in mind.",
        },
      },
      {
        id: "moonstone",
        emoji: "🌙",
        color: "#caf0f8",
        name: { zh: "月光石", tw: "月光石", en: "Moonstone" },
        why: {
          zh: "增强梦境记忆与「第六感」，尤其帮你在梦与现实之间捕捉到提示。",
          tw: "增強夢境記憶與「第六感」，尤其幫你在夢與現實之間捕捉到提示。",
          en: "Boosts dream recall and the 'sixth sense' — it helps you catch the hints that pass between dreams and waking life.",
        },
        howToUse: {
          zh: "放在床头柜上；醒来先别动，躺着回忆梦境，再摸一摸月光石做「锚点」。",
          tw: "放在床頭櫃上；醒來先別動，躺著回憶夢境，再摸一摸月光石做「錨點」。",
          en: "Keep it on the nightstand; on waking, lie still and replay the dream first, then touch the moonstone as an anchor.",
        },
      },
      {
        id: "lapis-lazuli",
        emoji: "🔵",
        color: "#4361ee",
        name: { zh: "青金石", tw: "青金石", en: "Lapis Lazuli" },
        why: {
          zh: "古老的灵视之石，加深内省与自我诚实，让直觉判断更「敢说真话」。",
          tw: "古老的靈視之石，加深內省與自我誠實，讓直覺判斷更「敢說真話」。",
          en: "An ancient stone of inner vision — it deepens self-honesty so your intuition speaks more plainly.",
        },
        howToUse: {
          zh: "冥想时轻贴在眉心；做重要直觉判断前握在手里静坐三分钟。",
          tw: "冥想時輕貼在眉心；做重要直覺判斷前握在手裡靜坐三分鐘。",
          en: "Rest it on your brow during meditation; before a gut-level decision, hold it and sit quietly for three minutes.",
        },
      },
    ],
    articles: [],
  },

  // ─── 8. 活力健康 ─────────────────────────────────────────
  {
    id: "energy",
    emoji: "🔥",
    label: { zh: "活力健康", tw: "活力健康", en: "Energy & Vitality" },
    tagline: {
      zh: "总觉得累、提不起劲？这几颗「能量石」帮你把火重新点起来。",
      tw: "總覺得累、提不起勁？這幾顆「能量石」幫你把火重新點起來。",
      en: "Running on empty and low on drive? These energy stones help you relight the fire.",
    },
    cleansing: {
      zh: "活力类水晶多为红色系、与身体能量共振，建议每周净化：清晨阳光晒 1-2 小时最合适（红玉髓、石榴石喜欢阳光），或用白水晶簇。血石可用流水快速冲洗。",
      tw: "活力類水晶多為紅色系、與身體能量共振，建議每週淨化：清晨陽光曬 1-2 小時最合適（紅玉髓、石榴石喜歡陽光），或用白水晶簇。血石可用流水快速沖洗。",
      en: "Vitality stones are mostly red-toned and body-focused — cleanse weekly: 1-2 hours of morning sun suits them well (carnelian and garnet love sunlight), or use a quartz cluster. Bloodstone can be rinsed quickly under running water.",
    },
    stones: [
      {
        id: "carnelian",
        emoji: "🧡",
        color: "#ff9770",
        name: { zh: "红玉髓", tw: "紅玉髓", en: "Carnelian" },
        why: {
          zh: "脐轮之火：提振生命力与行动力，是「起床困难、拖延没劲」时的点火石。",
          tw: "臍輪之火：提振生命力與行動力，是「起床困難、拖延沒勁」時的點火石。",
          en: "Sacral-chakra fire — it stirs life force and motivation, the ignition stone for low-energy, procrastinating days.",
        },
        howToUse: {
          zh: "放在工作台显眼处；没状态的早晨握一分钟，定下今天最小的一个行动。",
          tw: "放在工作台顯眼處；沒狀態的早晨握一分鐘，定下今天最小的一個行動。",
          en: "Keep it visible on your desk; on sluggish mornings, hold it for a minute and commit to one small action for the day.",
        },
      },
      {
        id: "red-jasper",
        emoji: "🔴",
        color: "#e76f51",
        name: { zh: "红碧玉", tw: "紅碧玉", en: "Red Jasper" },
        why: {
          zh: "耐力之石：提供稳定持久的体力感，适合长期高压、需要「续航」的阶段。",
          tw: "耐力之石：提供穩定持久的體力感，適合長期高壓、需要「續航」的階段。",
          en: "The endurance stone — it provides steady, lasting stamina for stretches of sustained pressure when you need to keep going.",
        },
        howToUse: {
          zh: "长会议、出差、赶工期间放在口袋随身带；累了握一握做三次深呼吸。",
          tw: "長會議、出差、趕工期間放在口袋隨身帶；累了握一握做三次深呼吸。",
          en: "Carry it in your pocket through long meetings, travel, and crunch periods; hold it for three deep breaths when you flag.",
        },
      },
      {
        id: "bloodstone",
        emoji: "🟩",
        color: "#588157",
        name: { zh: "血石", tw: "血石", en: "Bloodstone" },
        why: {
          zh: "自古的「复苏石」：提振勇气与身体的恢复力，帮你扛过消耗期。",
          tw: "自古的「復甦石」：提振勇氣與身體的恢復力，幫你扛過消耗期。",
          en: "A classic revitalizer since ancient times — it bolsters courage and physical resilience through draining periods.",
        },
        howToUse: {
          zh: "恢复期或高强度阶段贴身携带；运动后握在手里做放松拉伸。",
          tw: "恢復期或高強度階段貼身攜帶；運動後握在手裡做放鬆拉伸。",
          en: "Carry it close to the body during recovery or intense phases; hold it while stretching after workouts.",
        },
      },
      {
        id: "garnet",
        emoji: "❤️",
        color: "#e63946",
        name: { zh: "石榴石", tw: "石榴石", en: "Garnet" },
        why: {
          zh: "让全身能量「流动起来」的活化石，重新点燃对生活的热情与驱动力。",
          tw: "讓全身能量「流動起來」的活化石，重新點燃對生活的熱情與驅動力。",
          en: "An energizing activator that gets your whole system moving again — it rekindles passion and drive for life.",
        },
        howToUse: {
          zh: "贴身佩戴石榴石饰品；搭配早晨的阳光净化，把「充电」变成固定仪式。",
          tw: "貼身佩戴石榴石飾品；搭配早晨的陽光淨化，把「充電」變成固定儀式。",
          en: "Wear garnet jewelry against the skin; pair it with a morning-sunlight cleansing ritual to make 'recharging' a habit.",
        },
      },
      {
        id: "clear-quartz",
        emoji: "🔮",
        color: "#e0e1dd",
        name: { zh: "白水晶", tw: "白水晶", en: "Clear Quartz" },
        why: {
          zh: "「疗愈大师」：整体提升能量水平，并放大同组其他能量石的作用。",
          tw: "「療癒大師」：整體提升能量水平，並放大同組其他能量石的作用。",
          en: "The 'master healer' — it lifts your overall energy and amplifies every other vitality stone you pair it with.",
        },
        howToUse: {
          zh: "和红玉髓或石榴石摆在一起组成「能量角」；每天开工前看一眼，提醒自己今天的主线。",
          tw: "和紅玉髓或石榴石擺在一起組成「能量角」；每天開工前看一眼，提醒自己今天的主線。",
          en: "Group it with carnelian or garnet as an 'energy corner'; glance at it before work to recall your main line for the day.",
        },
      },
    ],
    articles: [
      {
        slug: "root-chakra-meaning",
        title: {
          zh: "海底轮的含义：安全感和生命能量之源",
          tw: "海底輪的含義：安全感和生命能量之源",
          en: "Root Chakra Meaning: The Source of Security & Vitality",
        },
      },
    ],
  },
];


// ===== 占卜模式：每颗水晶的神谕讯息（key = "需求id:水晶id"） =====
// 占卜语境下的 1-2 句解读——「这颗石头为什么此刻选择了你」。

export const ORACLE_MESSAGES: Record<string, Record<Locale, string>> = {
  // ─── 防护 ───
  "protection:black-tourmaline": {
    zh: "黑碧玺在此刻来到你身边，是因为你的能量场正在向你求救。它提醒你：先立好边界，再谈付出——不是所有向你伸来的手都值得握住。",
    tw: "黑碧璽在此刻來到你身邊，是因為你的能量場正在向你求救。它提醒你：先立好邊界，再談付出——不是所有向你伸來的手都值得握住。",
    en: "Black Tourmaline comes to you now because your energy field has been asking for help. Its message: set your boundaries first, then give — not every hand reaching for you deserves to be held.",
  },
  "protection:obsidian": {
    zh: "黑曜石是一面不说谎的镜子。它出现在这里，是要你直视那个一直在回避的真相——看清的那一刻，消耗就开始停止。",
    tw: "黑曜石是一面不說謊的鏡子。它出現在這裡，是要你直視那個一直在迴避的真相——看清的那一刻，消耗就開始停止。",
    en: "Obsidian is a mirror that never lies. It appears here to ask you to face the truth you've been avoiding — the moment you see it clearly, the draining stops.",
  },
  "protection:smoky-quartz": {
    zh: "茶晶选择你，说明你背负的东西已经太沉了。它请求你把不属于你的重量交还给大地——轻装，才能走远。",
    tw: "茶晶選擇你，說明你背負的東西已經太沉了。它請求你把不屬於你的重量交還給大地——輕裝，才能走遠。",
    en: "Smoky Quartz chose you because you've been carrying too much. It asks you to hand the weight that isn't yours back to the earth — you travel farther when you travel light.",
  },
  "protection:amethyst": {
    zh: "紫水晶为你升起一层紫色的结界。它说：真正的防护不是对抗，而是让自己的频率高到负能量无法停留。",
    tw: "紫水晶為你升起一層紫色的結界。它說：真正的防護不是對抗，而是讓自己的頻率高到負能量無法停留。",
    en: "Amethyst raises a violet ward around you. It says: real protection isn't fighting back — it's raising your frequency until negativity can no longer stay.",
  },
  "protection:labradorite": {
    zh: "拉长石在提醒你这个共感人：别人的情绪是别人的。守好自己的光，你不必为每一阵路过的风雨负责。",
    tw: "拉長石在提醒你這個共感人：別人的情緒是別人的。守好自己的光，你不必為每一陣路過的風雨負責。",
    en: "Labradorite speaks to you, the empath: other people's emotions are theirs. Guard your own light — you are not responsible for every storm that passes by.",
  },

  // ─── 招财 ───
  "money:citrine": {
    zh: "黄水晶带着太阳的温度而来。它看到了你对丰盛「既渴望又不敢承认」的矛盾——它说：你值得，请先允许自己接受。",
    tw: "黃水晶帶著太陽的溫度而來。它看到了你對豐盛「既渴望又不敢承認」的矛盾——它說：你值得，請先允許自己接受。",
    en: "Citrine arrives with the warmth of the sun. It sees your contradiction — longing for abundance yet not daring to claim it — and says: you are worthy; allow yourself to receive.",
  },
  "money:pyrite": {
    zh: "黄铁矿在此刻出现，是因为机会已经敲门，而你还在犹豫要不要开。它带给你的是行动力：想好，就出手。",
    tw: "黃鐵礦在此刻出現，是因為機會已經敲門，而你還在猶豫要不要開。它帶給你的是行動力：想好，就出手。",
    en: "Pyrite shows up because opportunity has already knocked and you're still deciding whether to answer. What it brings you is action: decide, then move.",
  },
  "money:green-aventurine": {
    zh: "绿东陵石是机会的引路人。它告诉你：新的财源不在旧地图上——给那个你一直想去尝试的方向一次机会。",
    tw: "綠東陵石是機會的引路人。它告訴你：新的財源不在舊地圖上——給那個你一直想去嘗試的方向一次機會。",
    en: "Green Aventurine is a guide to opportunity. It tells you: new income is not on the old map — give that direction you've been wanting to try a real chance.",
  },
  "money:tigers-eye": {
    zh: "虎眼石选中你，是要你在金钱上少一点情绪、多一点判断。关键时刻，它给你虎一般的冷静与胆识。",
    tw: "虎眼石選中你，是要你在金錢上少一點情緒、多一點判斷。關鍵時刻，它給你虎一般的冷靜與膽識。",
    en: "Tiger's Eye picked you to bring less emotion and more judgment to money matters. At the decisive moment, it lends you the calm nerve of the tiger.",
  },
  "money:clear-quartz": {
    zh: "白水晶是意图的放大器。它出现在这里问你：你真的清楚自己要多少、为什么要吗？想清楚，它替你把愿望放大。",
    tw: "白水晶是意圖的放大器。它出現在這裡問你：你真的清楚自己要多少、為什麼要嗎？想清楚，它替你把願望放大。",
    en: "Clear Quartz is the amplifier of intention. It appears here to ask: do you truly know how much you want, and why? Get clear — and it will magnify the wish.",
  },

  // ─── 助眠 ───
  "sleep:amethyst": {
    zh: "紫水晶在夜深时来到，是因为你的头脑太久没有下班了。它轻声说：今天的事今天结束，剩下的交给明天。",
    tw: "紫水晶在夜深時來到，是因為你的頭腦太久沒有下班了。它輕聲說：今天的事今天結束，剩下的交給明天。",
    en: "Amethyst comes at nightfall because your mind hasn't clocked out in a long time. It whispers: today's business ends today; leave the rest to tomorrow.",
  },
  "sleep:moonstone": {
    zh: "月光石感应到你情绪的潮汐。它邀请你像月亮一样，允许自己有阴晴圆缺——不必每晚都圆满。",
    tw: "月光石感應到你情緒的潮汐。它邀請你像月亮一樣，允許自己有陰晴圓缺——不必每晚都圓滿。",
    en: "Moonstone senses the tides of your emotions. It invites you to be like the moon — allowed to wax and wane, not required to be full every night.",
  },
  "sleep:lepidolite": {
    zh: "锂云母带着天然的安定而来。它知道你躺在床上复盘人生的滋味，它说：那些念头，明早的你自会处理。",
    tw: "鋰雲母帶著天然的安定而來。它知道你躺在床上復盤人生的滋味，它說：那些念頭，明早的你自會處理。",
    en: "Lepidolite arrives with natural calm. It knows what it's like to lie in bed replaying your life, and says: those thoughts — tomorrow's you will handle them.",
  },
  "sleep:howlite": {
    zh: "白纹石出现在你的抽石里，是因为你的脑内弹幕需要一位关灯的人。把跑马灯般的思绪，一颗颗放到它手里。",
    tw: "白紋石出現在你的抽石裡，是因為你的腦內彈幕需要一位關燈的人。把跑馬燈般的思緒，一顆顆放到它手裡。",
    en: "Howlite appears in your draw because your mental chatter needs someone to switch off the lights. Place the racing thoughts into its hands, one by one.",
  },

  // ─── 抗焦虑 ───
  "anxiety:lepidolite": {
    zh: "锂云母是水晶界的深呼吸。它在此刻赶来，是要陪你把心里那根绷到发响的弦，慢慢松半拍。",
    tw: "鋰雲母是水晶界的深呼吸。它在此刻趕來，是要陪你把心裡那根繃到發響的弦，慢慢鬆半拍。",
    en: "Lepidolite is the crystal world's deep breath. It rushes to you now to help you loosen — by half a beat — the string inside you wound tight enough to hum.",
  },
  "anxiety:blue-lace-agate": {
    zh: "蓝纹玛瑙看到了你咽回去的话。它温柔地提醒你：被压抑的表达会变成焦虑，先对自己说真话。",
    tw: "藍紋瑪瑙看到了你嚥回去的話。它溫柔地提醒你：被壓抑的表達會變成焦慮，先對自己說真話。",
    en: "Blue Lace Agate sees the words you swallowed. It gently reminds you: unspoken truth turns into anxiety — start by being honest with yourself.",
  },
  "anxiety:rose-quartz": {
    zh: "粉晶来到你身边，是因为你对自己太苛刻了。它把最柔软的能量给你：像对待挚友那样，对待你自己。",
    tw: "粉晶來到你身邊，是因為你對自己太苛刻了。它把最柔軟的能量給你：像對待摯友那樣，對待你自己。",
    en: "Rose Quartz comes because you've been too hard on yourself. It offers its softest energy: treat yourself the way you would treat a dear friend.",
  },
  "anxiety:amethyst": {
    zh: "紫水晶为你的思绪按下静音键。它说：焦虑是未来的幻影，而呼吸只在当下——回到这里来。",
    tw: "紫水晶為你的思緒按下靜音鍵。它說：焦慮是未來的幻影，而呼吸只在當下——回到這裡來。",
    en: "Amethyst presses the mute button on your thoughts. It says: anxiety is a phantom of the future, but breath exists only now — come back here.",
  },
  "anxiety:smoky-quartz": {
    zh: "茶晶出现在这里，是因为你的焦虑飘得太高了。它把你轻轻拉回地面：脚踩实地，心才有处安放。",
    tw: "茶晶出現在這裡，是因為你的焦慮飄得太高了。它把你輕輕拉回地面：腳踩實地，心才有處安放。",
    en: "Smoky Quartz appears because your anxiety has floated too high. It draws you gently back to the ground: feet on solid earth, and the heart has somewhere to rest.",
  },

  // ─── 爱情 ───
  "love:rose-quartz": {
    zh: "粉晶是爱之石，它此刻为你打开心轮。它先说一个秘密：流向你的爱意，往往从你善待自己开始。",
    tw: "粉晶是愛之石，它此刻為你打開心輪。它先說一個秘密：流向你的愛意，往往從你善待自己開始。",
    en: "Rose Quartz, the stone of love, opens your heart chakra now. It shares a secret first: the love that flows toward you usually begins with how you treat yourself.",
  },
  "love:rhodonite": {
    zh: "蔷薇辉石为你而来，是因为心里还有一段没有好好告别的过去。疗愈它，新的爱才有位置住进来。",
    tw: "薔薇輝石為你而來，是因為心裡還有一段沒有好好告別的過去。療癒它，新的愛才有位置住進來。",
    en: "Rhodonite comes because there's a past in your heart that was never properly said goodbye to. Heal it, and new love will have a place to move in.",
  },
  "love:green-aventurine": {
    zh: "绿东陵石带着轻盈的好运出现。它鼓励你：去那个你一直想去的场合——缘分，喜欢出现在路上。",
    tw: "綠東陵石帶著輕盈的好運出現。它鼓勵你：去那個你一直想去的場合——緣分，喜歡出現在路上。",
    en: "Green Aventurine arrives with lighthearted luck. It nudges you: go to that place you've been meaning to go — fate likes to meet you on the road.",
  },
  "love:moonstone": {
    zh: "月光石感应到关系中未说出口的情绪。它提醒你：先听懂自己的感受，才读得懂对方的心。",
    tw: "月光石感應到關係中未說出口的情緒。它提醒你：先聽懂自己的感受，才讀得懂對方的心。",
    en: "Moonstone senses the unspoken emotions in a relationship. It reminds you: understand your own feelings first, and you'll be able to read the other heart.",
  },
  "love:garnet": {
    zh: "石榴石携火而来。它看到你对感情的热情被日常磨淡了——它要你重新做那个主动表达的人。",
    tw: "石榴石攜火而來。它看到你對感情的熱情被日常磨淡了——它要你重新做那個主動表達的人。",
    en: "Garnet arrives carrying fire. It sees your passion dulled by routine — and asks you to become, once again, the one who says it out loud.",
  },

  // ─── 专注事业 ───
  "focus:fluorite": {
    zh: "萤石在此刻出现，是因为你的才华被杂乱掩埋了。它帮你把千头万绪，理成一条清晰的主线。",
    tw: "螢石在此刻出現，是因為你的才華被雜亂掩埋了。它幫你把千頭萬緒，理成一條清晰的主線。",
    en: "Fluorite appears because your talent is buried under clutter. It helps you comb a thousand loose threads into one clear main line.",
  },
  "focus:clear-quartz": {
    zh: "白水晶为你校准焦点。它问：今天最重要的那一件事是什么？答上来，其余的自然会让路。",
    tw: "白水晶為你校準焦點。它問：今天最重要的那一件事是什麼？答上來，其餘的自然會讓路。",
    en: "Clear Quartz calibrates your focus. It asks: what is the single most important thing today? Answer that, and everything else steps aside.",
  },
  "focus:tigers-eye": {
    zh: "虎眼石选中你，是要你把「准备中」改成「进行中」。它给你关键时刻出手的魄力。",
    tw: "虎眼石選中你，是要你把「準備中」改成「進行中」。它給你關鍵時刻出手的魄力。",
    en: "Tiger's Eye chose you to switch your status from 'preparing' to 'in progress'. It gives you the nerve to act at the crucial moment.",
  },
  "focus:lapis-lazuli": {
    zh: "青金石为表达而来。它提醒你：你的想法值得被清楚地说出来——智慧若不开口，就等于不存在。",
    tw: "青金石為表達而來。它提醒你：你的想法值得被清楚地說出來——智慧若不開口，就等於不存在。",
    en: "Lapis Lazuli comes for expression. It reminds you: your ideas deserve to be spoken clearly — wisdom that never opens its mouth might as well not exist.",
  },

  // ─── 梦境直觉 ───
  "dreams:amethyst": {
    zh: "紫水晶开启你的眉心轮。它说：梦是潜意识写给你的信，而你最近一直没有拆封。",
    tw: "紫水晶開啟你的眉心輪。它說：夢是潛意識寫給你的信，而你最近一直沒有拆封。",
    en: "Amethyst opens your third eye. It says: dreams are letters from your subconscious — and lately you've left them unopened.",
  },
  "dreams:labradorite": {
    zh: "拉长石是帷幕之后的石头。它出现在这里，是因为你的直觉一直在说话，只是你太忙了，听不见。",
    tw: "拉長石是帷幕之後的石頭。它出現在這裡，是因為你的直覺一直在說話，只是你太忙了，聽不見。",
    en: "Labradorite is the stone behind the veil. It appears because your intuition has been speaking all along — you've just been too busy to hear it.",
  },
  "dreams:moonstone": {
    zh: "月光石为你调和梦与现实的边界。它邀请你开始记录梦境——答案，常常藏在醒来前最后一个画面里。",
    tw: "月光石為你調和夢與現實的邊界。它邀請你開始記錄夢境——答案，常常藏在醒來前最後一個畫面裡。",
    en: "Moonstone tunes the border between dreams and waking. It invites you to start a dream journal — answers often hide in the last image before you wake.",
  },
  "dreams:lapis-lazuli": {
    zh: "青金石带来古老的灵视之力。它要你诚实地问自己：那个你早已知道的答案，打算什么时候承认？",
    tw: "青金石帶來古老的靈視之力。它要你誠實地問自己：那個你早已知道的答案，打算什麼時候承認？",
    en: "Lapis Lazuli brings the ancient power of inner sight. It asks you honestly: that answer you've known all along — when do you plan to admit it?",
  },

  // ─── 活力健康 ───
  "energy:carnelian": {
    zh: "红玉髓带着脐轮之火赶来。它看到你把能量都给了别人，轮到自己时只剩灰烬——它来帮你重新点火。",
    tw: "紅玉髓帶著臍輪之火趕來。它看到你把能量都給了別人，輪到自己時只剩灰燼——它來幫你重新點火。",
    en: "Carnelian rushes in with sacral fire. It sees you've given your energy to everyone else and kept only ash for yourself — it's here to relight you.",
  },
  "energy:red-jasper": {
    zh: "红碧玉是耐力之石。它在此刻出现，是因为你要走的路还长——不求冲刺，它陪你稳稳走完全程。",
    tw: "紅碧玉是耐力之石。它在此刻出現，是因為你要走的路還長——不求衝刺，它陪你穩穩走完全程。",
    en: "Red Jasper is the stone of endurance. It appears because your road is still long — no sprinting needed; it will walk the whole way with you, steady.",
  },
  "energy:bloodstone": {
    zh: "血石自古为复苏而来。它知道你正在扛一段消耗期，它说：撑住，恢复比你想象的更近。",
    tw: "血石自古為復甦而來。它知道你正在扛一段消耗期，它說：撐住，恢復比你想像的更近。",
    en: "Bloodstone has come for revival since ancient times. It knows you're enduring a draining season, and says: hold on — recovery is closer than you think.",
  },
  "energy:garnet": {
    zh: "石榴石为你重启生命的流动。它问：上一次让你眼睛发亮的事是什么？去做它——那就是你的充电桩。",
    tw: "石榴石為你重啟生命的流動。它問：上一次讓你眼睛發亮的事是什麼？去做它——那就是你的充電樁。",
    en: "Garnet restarts the flow of life in you. It asks: when did something last make your eyes light up? Go do that — it is your charging station.",
  },
  "energy:clear-quartz": {
    zh: "白水晶是能量的大师。它出现在这里提醒你：精力不是省出来的，是校准出来的——先对准，再发力。",
    tw: "白水晶是能量的大師。它出現在這裡提醒你：精力不是省出來的，是校準出來的——先對準，再發力。",
    en: "Clear Quartz is the master of energy. It appears to remind you: energy isn't saved, it's aligned — aim first, then spend.",
  },
};

// ===== 占卜模式：全部 37 颗水晶的扁平池 =====

export interface PoolEntry {
  intentionId: string;
  intentionLabel: Record<Locale, string>;
  intentionEmoji: string;
  stone: Stone;
  oracle: Record<Locale, string>;
}

export const STONE_POOL: PoolEntry[] = INTENTIONS.flatMap((it) =>
  it.stones.map((stone) => ({
    intentionId: it.id,
    intentionLabel: it.label,
    intentionEmoji: it.emoji,
    stone,
    oracle: ORACLE_MESSAGES[`${it.id}:${stone.id}`]!,
  })),
);


// ===== 八字选石：水晶的五行归属（按 22 种矿石去重，key = stone.id） =====
// 归属原则：五行色 + 矿物 lore——
//   水：黑/蓝色系（黑碧玺、黑曜石、青金、蓝纹玛瑙、月光石）
//   木：绿色系 + 生发能量（绿东陵、萤石、血石、拉长石——青绿变彩、唤醒潜能）
//   火：红/粉/紫色系（红玉髓、石榴石、红碧玉、蔷薇辉石、粉晶、紫水晶——红紫属火）
//   土：黄/棕色系矿石（黄水晶、虎眼石、茶晶、黄铁矿——黄色归土，土生金）
//   金：白/透/金属光泽（白水晶、白纹石、锂云母——云母片有金属光泽，传统归金）

export type StoneElement = "木" | "火" | "土" | "金" | "水";

export const STONE_ELEMENT: Record<string, StoneElement> = {
  "black-tourmaline": "水",
  "obsidian": "水",
  "lapis-lazuli": "水",
  "blue-lace-agate": "水",
  "moonstone": "水",
  "green-aventurine": "木",
  "fluorite": "木",
  "bloodstone": "木",
  "labradorite": "木",
  "carnelian": "火",
  "garnet": "火",
  "red-jasper": "火",
  "rhodonite": "火",
  "rose-quartz": "火",
  "amethyst": "火",
  "citrine": "土",
  "tigers-eye": "土",
  "smoky-quartz": "土",
  "pyrite": "土",
  "clear-quartz": "金",
  "howlite": "金",
  "lepidolite": "金",
};

/** 五行相生顺序（用于并列时取弱、以及「生我」母元素补益） */
export const ELEMENT_CYCLE: StoneElement[] = ["木", "火", "土", "金", "水"];

/** 生我之母：补 X 也可用生 X 的元素（如补金可用土——土生金） */
export const GENERATES: Record<StoneElement, StoneElement> = {
  木: "水", // 水生木
  火: "木", // 木生火
  土: "火", // 火生土
  金: "土", // 土生金
  水: "金", // 金生水
};

export interface ElementInfo {
  /** 展示色（分布条、徽标） */
  color: string;
  label: Record<Locale, string>;
  /** 补这一行带来什么（三语一句话） */
  blurb: Record<Locale, string>;
}

export const ELEMENT_INFO: Record<StoneElement, ElementInfo> = {
  木: {
    color: "#7bc96f",
    label: { zh: "木", tw: "木", en: "Wood" },
    blurb: {
      zh: "补木带来生长、规划与重新出发的能量，适合需要突破僵局、开启新阶段的你。",
      tw: "補木帶來生長、規劃與重新出發的能量，適合需要突破僵局、開啟新階段的你。",
      en: "Supplementing Wood brings growth, planning, and fresh-start energy — for breaking deadlocks and opening a new chapter.",
    },
  },
  火: {
    color: "#e63946",
    label: { zh: "火", tw: "火", en: "Fire" },
    blurb: {
      zh: "补火带来热情、行动力与表达的勇气，帮你把想法说出口、把计划做出来。",
      tw: "補火帶來熱情、行動力與表達的勇氣，幫你把想法說出口、把計畫做出來。",
      en: "Supplementing Fire brings passion, drive, and the courage to express — turning ideas into words and plans into action.",
    },
  },
  土: {
    color: "#d4a24c",
    label: { zh: "土", tw: "土", en: "Earth" },
    blurb: {
      zh: "补土带来稳定、承载与积累的能量，让漂浮的计划落地，让信心有根。",
      tw: "補土帶來穩定、承載與積累的能量，讓漂浮的計畫落地，讓信心有根。",
      en: "Supplementing Earth brings stability, support, and accumulation — grounding floating plans and rooting your confidence.",
    },
  },
  金: {
    color: "#d8dee9",
    label: { zh: "金", tw: "金", en: "Metal" },
    blurb: {
      zh: "补金带来清明、决断与收束的能量，帮你断舍离、聚焦重点、守住成果。",
      tw: "補金帶來清明、決斷與收束的能量，幫你斷捨離、聚焦重點、守住成果。",
      en: "Supplementing Metal brings clarity, decisiveness, and consolidation — helping you cut the non-essential, focus, and keep what you've earned.",
    },
  },
  水: {
    color: "#5aa9e6",
    label: { zh: "水", tw: "水", en: "Water" },
    blurb: {
      zh: "补水带来冷静、直觉与流动的智慧，安抚焦虑，让情绪与机会重新流动起来。",
      tw: "補水帶來冷靜、直覺與流動的智慧，安撫焦慮，讓情緒與機會重新流動起來。",
      en: "Supplementing Water brings calm, intuition, and flowing wisdom — easing anxiety and getting emotions and opportunities moving again.",
    },
  },
};

/** 天干拼音（八字选石结果页展示日主用） */
export const STEM_PINYIN: Record<string, string> = {
  甲: "Jiǎ", 乙: "Yǐ", 丙: "Bǐng", 丁: "Dīng", 戊: "Wù",
  己: "Jǐ", 庚: "Gēng", 辛: "Xīn", 壬: "Rén", 癸: "Guǐ",
};
