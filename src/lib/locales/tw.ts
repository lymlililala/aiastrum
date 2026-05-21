// 繁體中文語言包
export const tw = {
  // Hero
  heroSub:        "你的每日宇宙指南",
  heroTitle:      "命運密語",
  heroDesc:       "古老智慧與現代 AI 的交融，探索屬於你的命運密碼",
  heroCard1Label: "每日一籤",
  heroCard2Label: "AI 解憂館",
  heroCard3Label: "每日開運",

  // Tabs
  tabAll:         "全部",
  tabWestern:     "西方神秘",
  tabEastern:     "東方智慧",
  tabLifestyle:   "趣味生活",

  // Sections
  sectionFeatured:"精選推薦",
  sectionMore:    "更多功能",

  // Modules
  tarotTitle:        "塔羅占卜",
  tarotDesc:         "抽取塔羅牌，AI 解讀過去、現在與未來的隱秘低語",
  astroTitle:        "星盤解析",
  astroDesc:         "精準計算太陽、月亮、上升點，繪製專屬星盤，解讀命運密碼",
  mbtiTitle:         "MBTI 星球碰撞",
  mbtiDesc:          "MBTI × 星座，生成專屬梗文化人格檔案，極具傳播屬性",
  horoscopeTitle:    "星座運勢",
  horoscopeDesc:     "十二星座每日/週/月運勢，五維指數全方位解析",
  runeTitle:         "盧恩符文",
  runeDesc:          "古老北歐符文占卜，單石奧丁之眼或三石諾倫女神",
  numerologyTitle:   "生命靈數",
  numerologyDesc:    "輸入生日計算專屬靈數（1-9、11、22、33），解析性格天賦",
  namingTitle:       "墨韻起名",
  namingDesc:        "生辰八字推算喜用神，結合詩詞典籍甄選吉名",
  loveTitle:         "姻緣占卜",
  loveDesc:          "星盤×命理三維解析，揭秘命中正緣特徵與相遇時機",
  faceTitle:         "賽博算命",
  faceDesc:          "AI 神經網路掃描面相·手相，解碼隱藏天賦與命運密碼",
  baziTitle:         "生辰八字",
  baziDesc:          "天干地支排盤，揭示命格與流年運勢",
  ziweiTitle:        "紫微斗數",
  ziweiDesc:         "東方占星術之王，十四主星排布十二宮，四化飛星揭秘人生軌跡",
  meihuaTitle:       "梅花心易",
  meihuaDesc:        "北宋邵雍傳世之法，觀物取象，體用生剋斷吉凶",
  qimenTitle:        "奇門遁甲",
  qimenDesc:         "真太陽時校準，九宮格專業排盤，商業與出行吉凶精準提示",
  dreamTitle:        "周公解夢",
  dreamDesc:         "傳統周公解夢 × 榮格心理學，雙軌解析夢境與潛意識",
  almanacTitle:      "老黃曆",
  almanacDesc:       "每日宜忌一目了然，定製擇吉日，結婚搬家開業出行",
  lingqianTitle:     "雲端靈籤",
  lingqianDesc:      "觀音·黃大仙虔誠求籤，擲筊確認，白話解析四維運勢",
  wugeTitle:         "姓名五格",
  wugeDesc:          "康熙字典筆劃，五格剖象，81數理解析姓名與命運",
  dailyFortuneTitle: "每日開運指南",
  dailyFortuneDesc:  "基於生辰五行，每日生成專屬幸運色、數字、方位與穿搭建議",
  petTitle:          "寵物靈語",
  petDesc:           "上傳寵物照片+名字，結合塔羅單牌，解讀毛孩子今天的內心世界",
  aiMysticTitle:     "AI 解憂館",
  aiMysticDesc:      "向AI塔羅師傾訴煩惱，獲得溫柔共情與塔羅指引",
  synastryTitle:     "星盤合盤",
  synastryDesc:      "輸入雙方生日，分析跨盤行星相位，計算愛情/友情契合度",
  dailyCardTitle:    "每日宇宙提示卡",
  dailyCardFullDesc: "每日一籤盲盒，精美卡背翻轉動畫，直擊心靈的宇宙提示",

  // Nav
  navBack:        "← 返回",
  navHistory:     "📜 占卜記錄",
  navBlog:        "知識庫",
  navHome:        "首頁",

  // Language switcher
  langSwitcher:   "🌐",

  // Common
  readMore:       "閱讀全文 →",
  loading:        "解讀中...",
  error:          "出錯了，請重試",
  noArticles:     "該分類暫無文章，敬請期待",
  totalArticles:  (n: number) => `共 ${n} 篇文章`,

  // Blog
  blogTitle:      "神秘學知識庫",
  blogDesc:       "塔羅78張牌意逐一解析 · 周公解夢深度科普 · 星座運勢實時指南",
  blogBack:       "← 返回知識庫",

  // AI prompt lang instruction
  promptLangInstruction: "請以繁體中文輸出所有解讀內容。",
} as const;

export type TwDict = typeof tw;
