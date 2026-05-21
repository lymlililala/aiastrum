// English locale
export const en = {
  // Hero
  heroSub:        "Your Daily Cosmic Guide",
  heroTitle:      "AiAstrum",
  heroDesc:       "Ancient wisdom meets modern AI — explore your destiny code",
  heroCard1Label: "Daily Card",
  heroCard2Label: "AI Mystic",
  heroCard3Label: "Daily Fortune",

  // Tabs
  tabAll:         "All",
  tabWestern:     "Western",
  tabEastern:     "Eastern",
  tabLifestyle:   "Lifestyle",

  // Sections
  sectionFeatured:"Featured",
  sectionMore:    "More Tools",

  // Modules
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
  baziTitle:         "Bazi Destiny",
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

  // Nav
  navBack:        "← Back",
  navHistory:     "📜 History",
  navBlog:        "Blog",
  navHome:        "Home",

  // Language switcher
  langSwitcher:   "🌐",

  // Common
  readMore:       "Read More →",
  loading:        "Reading...",
  error:          "Something went wrong, please try again",
  noArticles:     "No articles in this category yet, stay tuned",
  totalArticles:  (n: number) => `${n} articles`,

  // Blog
  blogTitle:      "Mystic Knowledge Base",
  blogDesc:       "Tarot card meanings · Dream interpretation · Horoscope guides",
  blogBack:       "← Back to Blog",

  // AI prompt lang instruction
  promptLangInstruction: "Please output all divination content strictly in English.",
} as const;

export type EnDict = typeof en;
