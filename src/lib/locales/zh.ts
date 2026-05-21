// 简体中文语言包
export const zh = {
  // Hero
  heroSub:        "你的每日宇宙指南",
  heroTitle:      "命运密语",
  heroDesc:       "古老智慧与现代 AI 的交融，探索属于你的命运密码",
  heroCard1Label: "每日一签",
  heroCard2Label: "AI 解忧馆",
  heroCard3Label: "每日开运",

  // Tabs
  tabAll:         "全部",
  tabWestern:     "西方神秘",
  tabEastern:     "东方智慧",
  tabLifestyle:   "趣味生活",

  // Sections
  sectionFeatured:"精选推荐",
  sectionMore:    "更多功能",

  // Modules
  tarotTitle:        "塔罗占卜",
  tarotDesc:         "抽取塔罗牌，AI 解读过去、现在与未来的隐秘低语",
  astroTitle:        "星盘解析",
  astroDesc:         "精准计算太阳、月亮、上升点，绘制专属星盘，解读命运密码",
  mbtiTitle:         "MBTI 星球碰撞",
  mbtiDesc:          "MBTI × 星座，生成专属梗文化人格档案，极具传播属性",
  horoscopeTitle:    "星座运势",
  horoscopeDesc:     "十二星座每日/周/月运势，五维指数全方位解析",
  runeTitle:         "卢恩符文",
  runeDesc:          "古老北欧符文占卜，单石奥丁之眼或三石诺伦女神",
  numerologyTitle:   "生命灵数",
  numerologyDesc:    "输入生日计算专属灵数（1-9、11、22、33），解析性格天赋",
  namingTitle:       "墨韵起名",
  namingDesc:        "生辰八字推算喜用神，结合诗词典籍甄选吉名",
  loveTitle:         "姻缘占卜",
  loveDesc:          "星盘×命理三维解析，揭秘命中正缘特征与相遇时机",
  faceTitle:         "赛博算命",
  faceDesc:          "AI 神经网络扫描面相·手相，解码隐藏天赋与命运密码",
  baziTitle:         "生辰八字",
  baziDesc:          "天干地支排盘，揭示命格与流年运势",
  ziweiTitle:        "紫微斗数",
  ziweiDesc:         "东方占星术之王，十四主星排布十二宫，四化飞星揭秘人生轨迹",
  meihuaTitle:       "梅花心易",
  meihuaDesc:        "北宋邵雍传世之法，观物取象，体用生克断吉凶",
  qimenTitle:        "奇门遁甲",
  qimenDesc:         "真太阳时校准，九宫格专业排盘，商业与出行吉凶精准提示",
  dreamTitle:        "周公解梦",
  dreamDesc:         "传统周公解梦 × 荣格心理学，双轨解析梦境与潜意识",
  almanacTitle:      "老黄历",
  almanacDesc:       "每日宜忌一目了然，定制择吉日，结婚搬家开业出行",
  lingqianTitle:     "云端灵签",
  lingqianDesc:      "观音·黄大仙虔诚求签，掷筊确认，白话解析四维运势",
  wugeTitle:         "姓名五格",
  wugeDesc:          "康熙字典笔画，五格剖象，81数理解析姓名与命运",
  dailyFortuneTitle: "每日开运指南",
  dailyFortuneDesc:  "基于生辰五行，每日生成专属幸运色、数字、方位与穿搭建议",
  petTitle:          "宠物灵语",
  petDesc:           "上传宠物照片+名字，结合塔罗单牌，解读毛孩子今天的内心世界",
  aiMysticTitle:     "AI 解忧馆",
  aiMysticDesc:      "向AI塔罗师倾诉烦恼，获得温柔共情与塔罗指引",
  synastryTitle:     "星盘合盘",
  synastryDesc:      "输入双方生日，分析跨盘行星相位，计算爱情/友情契合度",
  dailyCardTitle:    "每日宇宙提示卡",
  dailyCardFullDesc: "每日一签盲盒，精美卡背翻转动画，直击心灵的宇宙提示",

  // Nav
  navBack:        "← 返回",
  navHistory:     "📜 占卜记录",
  navBlog:        "知识库",
  navHome:        "首页",

  // Language switcher
  langSwitcher:   "🌐",

  // Common
  readMore:       "阅读全文 →",
  loading:        "解读中...",
  error:          "出错了，请重试",
  noArticles:     "该分类暂无文章，敬请期待",
  totalArticles:  (n: number) => `共 ${n} 篇文章`,

  // Blog
  blogTitle:      "神秘学知识库",
  blogDesc:       "塔罗78张牌意逐一解析 · 周公解梦深度科普 · 星座运势实时指南",
  blogBack:       "← 返回知识库",

  // AI prompt lang instruction
  promptLangInstruction: "请使用简体中文输出所有解读内容。",
} as const;

export type ZhDict = typeof zh;
