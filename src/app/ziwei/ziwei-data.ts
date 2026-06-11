/**
 * 紫微斗数 - 核心数据库
 * 主星、辅星、宫位、四化、解读文案
 *
 * 本地化说明（与 bazi-data.ts 同模式）：
 * - 可翻译字段统一为 { zh, en, tw } 结构（类型 L），由 resolve* 函数按 lang 解析为纯字符串。
 * - 数据查找 KEY 一律保留中文（如 MAIN_STARS["紫微"]、TIANGAN_SIHUA["甲"]）。
 * - 命盘格内的星曜 / 天干地支 / 四化字形（紫微、禄权科忌…）刻意保留中文字形，
 *   作为东方命理术语展示；散文 / 标签处则通过 display / resolve* 输出本地化文本。
 */

export type Lang = "zh" | "en" | "tw";
/** 本地化字符串 */
export type L = { zh: string; en: string; tw: string };
/** 本地化字符串数组 */
export type LArr = { zh: string[]; en: string[]; tw: string[] };

/** 解析单条本地化字符串 */
export function rs(v: L, lang: Lang): string {
  return v[lang];
}
/** 解析本地化字符串数组 */
export function ra(v: LArr, lang: Lang): string[] {
  return v[lang];
}

// ===== 主星本地化显示名（散文 / 标签处使用；命盘格内仍用中文字形）=====
export const STAR_DISPLAY: Record<string, L> = {
  紫微: { zh: "紫微", en: "Zi Wei", tw: "紫微" },
  天机: { zh: "天机", en: "Tian Ji", tw: "天機" },
  太阳: { zh: "太阳", en: "Tai Yang", tw: "太陽" },
  武曲: { zh: "武曲", en: "Wu Qu", tw: "武曲" },
  天同: { zh: "天同", en: "Tian Tong", tw: "天同" },
  廉贞: { zh: "廉贞", en: "Lian Zhen", tw: "廉貞" },
  天府: { zh: "天府", en: "Tian Fu", tw: "天府" },
  太阴: { zh: "太阴", en: "Tai Yin", tw: "太陰" },
  贪狼: { zh: "贪狼", en: "Tan Lang", tw: "貪狼" },
  巨门: { zh: "巨门", en: "Ju Men", tw: "巨門" },
  天相: { zh: "天相", en: "Tian Xiang", tw: "天相" },
  天梁: { zh: "天梁", en: "Tian Liang", tw: "天梁" },
  七杀: { zh: "七杀", en: "Qi Sha", tw: "七殺" },
  破军: { zh: "破军", en: "Po Jun", tw: "破軍" },
  // 辅星（散文中偶尔出现）
  文昌: { zh: "文昌", en: "Wen Chang", tw: "文昌" },
  文曲: { zh: "文曲", en: "Wen Qu", tw: "文曲" },
  左辅: { zh: "左辅", en: "Zuo Fu", tw: "左輔" },
  右弼: { zh: "右弼", en: "You Bi", tw: "右弼" },
  天魁: { zh: "天魁", en: "Tian Kui", tw: "天魁" },
  天钺: { zh: "天钺", en: "Tian Yue", tw: "天鉞" },
  禄存: { zh: "禄存", en: "Lu Cun", tw: "祿存" },
};

/** 主星本地化显示名（散文用）。未知 key 原样返回。 */
export function resolveStarDisplay(starKey: string, lang: Lang): string {
  return STAR_DISPLAY[starKey]?.[lang] ?? starKey;
}

// ===== 主星定义 =====
export interface MainStar {
  name: string;          // 中文字形（命盘格内展示，保留中文）
  element: "木" | "火" | "土" | "金" | "水";
  yin_yang: "阴" | "阳";
  category: L;           // 星曜类别（散文/标签）
  personality: L;        // 性格描述
  label: L;              // 现代标签（小白模式）
  career_hint: L;        // 事业提示
  wealth_hint: L;        // 财富提示
  love_hint: L;          // 感情提示
}

export const MAIN_STARS: Record<string, MainStar> = {
  紫微: {
    name: "紫微", element: "土", yin_yang: "阴",
    category: { zh: "帝星", en: "Emperor Star", tw: "帝星" },
    personality: {
      zh: "帝王之星，天生领袖气质，自尊心极强，思虑周全，有王者风范",
      en: "The emperor star: a born leader with a commanding presence, intense pride, thorough judgment, and regal bearing.",
      tw: "帝王之星，天生領袖氣質，自尊心極強，思慮周全，有王者風範",
    },
    label: { zh: "天生领袖 · 帝王气质", en: "Born Leader · Regal Presence", tw: "天生領袖 · 帝王氣質" },
    career_hint: {
      zh: "适合管理、领导岗位，创业格局大，不宜屈居人下",
      en: "Suited to management and leadership roles, with a grand entrepreneurial scope; not one to settle beneath others.",
      tw: "適合管理、領導崗位，創業格局大，不宜屈居人下",
    },
    wealth_hint: {
      zh: "正财格局稳固，贵人相助，适合坐享其成而非劳碌奔波",
      en: "A solid regular-wealth pattern with benefactors' support; better at reaping rewards than toiling endlessly.",
      tw: "正財格局穩固，貴人相助，適合坐享其成而非勞碌奔波",
    },
    love_hint: {
      zh: "择偶标准高，伴侣须配得上自己，感情中惯于主导",
      en: "High standards in a partner who must measure up to you; you tend to lead in relationships.",
      tw: "擇偶標準高，伴侶須配得上自己，感情中慣於主導",
    },
  },
  天机: {
    name: "天机", element: "木", yin_yang: "阴",
    category: { zh: "善星", en: "Benevolent Star", tw: "善星" },
    personality: {
      zh: "机变之星，聪慧机敏，思维活跃，精于谋略，善于分析",
      en: "The star of wit and change: clever and quick, mentally agile, masterful at strategy and analysis.",
      tw: "機變之星，聰慧機敏，思維活躍，精於謀略，善於分析",
    },
    label: { zh: "智慧谋略 · 多才多艺", en: "Wisdom & Strategy · Versatile", tw: "智慧謀略 · 多才多藝" },
    career_hint: {
      zh: "适合策划、咨询、技术型工作，变动频繁但收获颇丰",
      en: "Suited to planning, consulting, and technical work; frequent changes yet rich rewards.",
      tw: "適合策劃、諮詢、技術型工作，變動頻繁但收穫頗豐",
    },
    wealth_hint: {
      zh: "聪明理财，善于把握机遇，但需防过于算计而错失良机",
      en: "Smart with money and good at seizing opportunities, but beware over-calculating and missing the moment.",
      tw: "聰明理財，善於把握機遇，但需防過於算計而錯失良機",
    },
    love_hint: {
      zh: "感情细腻，善解人意，但多情多变，需找到情感上的稳定锚点",
      en: "Tender and understanding in love, yet changeable; you need a steady emotional anchor.",
      tw: "感情細膩，善解人意，但多情多變，需找到情感上的穩定錨點",
    },
  },
  太阳: {
    name: "太阳", element: "火", yin_yang: "阳",
    category: { zh: "权星", en: "Authority Star", tw: "權星" },
    personality: {
      zh: "光明之星，慷慨热情，博爱大度，重名誉，有贵气",
      en: "The star of light: generous and warm, broadly loving and magnanimous, honor-driven, with a noble air.",
      tw: "光明之星，慷慨熱情，博愛大度，重名譽，有貴氣",
    },
    label: { zh: "光芒四射 · 博爱慷慨", en: "Radiant · Generous Heart", tw: "光芒四射 · 博愛慷慨" },
    career_hint: {
      zh: "适合公众人物、公职、教育，主舞台型事业，贵人缘极佳",
      en: "Suited to public figures, public office, and education — a spotlight career with excellent benefactor luck.",
      tw: "適合公眾人物、公職、教育，主舞台型事業，貴人緣極佳",
    },
    wealth_hint: {
      zh: "财运与名声挂钩，付出越多得到越多，慷慨反得回报",
      en: "Wealth is tied to reputation; the more you give the more you gain, and generosity returns rewards.",
      tw: "財運與名聲掛鉤，付出越多得到越多，慷慨反得回報",
    },
    love_hint: {
      zh: "真诚热烈，但事业心强可能影响感情，需在事业与家庭间找平衡",
      en: "Sincere and passionate, but a strong career drive may strain love; seek balance between work and home.",
      tw: "真誠熱烈，但事業心強可能影響感情，需在事業與家庭間找平衡",
    },
  },
  武曲: {
    name: "武曲", element: "金", yin_yang: "阴",
    category: { zh: "权星", en: "Authority Star", tw: "權星" },
    personality: {
      zh: "财帛之星，刚毅果断，重义气，行事雷厉风行，金融天赋",
      en: "The wealth star: resolute and decisive, loyal, swift in action, with a gift for finance.",
      tw: "財帛之星，剛毅果斷，重義氣，行事雷厲風行，金融天賦",
    },
    label: { zh: "财富磁铁 · 执行力爆棚", en: "Wealth Magnet · Powerhouse Execution", tw: "財富磁鐵 · 執行力爆棚" },
    career_hint: {
      zh: "适合金融、军事、工程、实体经济，行动力超强",
      en: "Suited to finance, the military, engineering, and the real economy, with formidable drive.",
      tw: "適合金融、軍事、工程、實體經濟，行動力超強",
    },
    wealth_hint: {
      zh: "正财运极旺，白手起家能力强，但需防孤克六亲",
      en: "Very strong regular-wealth luck and a knack for self-made success, but beware isolation from kin.",
      tw: "正財運極旺，白手起家能力強，但需防孤剋六親",
    },
    love_hint: {
      zh: "感情表达直接，不善温柔，需要包容型伴侣，晚婚更吉",
      en: "Direct in expressing love and not naturally tender; you need a tolerant partner, and late marriage is more auspicious.",
      tw: "感情表達直接，不善溫柔，需要包容型伴侶，晚婚更吉",
    },
  },
  天同: {
    name: "天同", element: "水", yin_yang: "阳",
    category: { zh: "善星", en: "Benevolent Star", tw: "善星" },
    personality: {
      zh: "福德之星，温和善良，享受生活，情感丰富，人缘极佳",
      en: "The star of fortune and virtue: gentle and kind, life-loving, emotionally rich, and well-liked.",
      tw: "福德之星，溫和善良，享受生活，情感豐富，人緣極佳",
    },
    label: { zh: "治愈系人格 · 享乐主义", en: "Healing Personality · Pleasure-Loving", tw: "治癒系人格 · 享樂主義" },
    career_hint: {
      zh: "适合艺术、服务业、娱乐、福利事业，注重工作体验",
      en: "Suited to the arts, services, entertainment, and welfare work, valuing the experience of work.",
      tw: "適合藝術、服務業、娛樂、福利事業，注重工作體驗",
    },
    wealth_hint: {
      zh: "钱财随缘，不过分追逐，但生活品质要求高，需量入为出",
      en: "Takes money as it comes without chasing it, yet demands high quality of life — live within your means.",
      tw: "錢財隨緣，不過分追逐，但生活品質要求高，需量入為出",
    },
    love_hint: {
      zh: "感情甜蜜，温柔体贴，是理想恋人，但有时过于依赖感情",
      en: "Sweet, tender, and considerate — an ideal partner, though sometimes overly dependent on the relationship.",
      tw: "感情甜蜜，溫柔體貼，是理想戀人，但有時過於依賴感情",
    },
  },
  廉贞: {
    name: "廉贞", element: "火", yin_yang: "阴",
    category: { zh: "次桃花", en: "Secondary Romance Star", tw: "次桃花" },
    personality: {
      zh: "囚星，个性复杂多变，爱恨分明，有艺术才华，争议性强",
      en: "The prisoner star: complex and changeable, sharply loving and hating, artistically gifted, and controversial.",
      tw: "囚星，個性複雜多變，愛恨分明，有藝術才華，爭議性強",
    },
    label: { zh: "个性鲜明 · 爱恨分明", en: "Distinct Character · Sharp Loves & Hates", tw: "個性鮮明 · 愛恨分明" },
    career_hint: {
      zh: "适合艺术、法律、军警、政治，需要一个展现个性的舞台",
      en: "Suited to the arts, law, the military/police, and politics — you need a stage to express your individuality.",
      tw: "適合藝術、法律、軍警、政治，需要一個展現個性的舞台",
    },
    wealth_hint: {
      zh: "财运起伏大，冒险精神强，偏财运好但正财需谨慎",
      en: "Wealth swings widely with a strong appetite for risk; good windfall luck but caution with regular income.",
      tw: "財運起伏大，冒險精神強，偏財運好但正財需謹慎",
    },
    love_hint: {
      zh: "感情炙热，占有欲强，容易有轰轰烈烈的感情故事",
      en: "Fiery in love and possessive, prone to passionate, dramatic romances.",
      tw: "感情熾熱，佔有欲強，容易有轟轟烈烈的感情故事",
    },
  },
  天府: {
    name: "天府", element: "土", yin_yang: "阳",
    category: { zh: "后星", en: "Empress Star", tw: "后星" },
    personality: {
      zh: "财库之星，稳重大方，重收藏，保守型理财天才",
      en: "The treasury star: steady and gracious, fond of collecting — a conservative financial genius.",
      tw: "財庫之星，穩重大方，重收藏，保守型理財天才",
    },
    label: { zh: "财库守护 · 稳健富贵", en: "Treasury Guardian · Steady Prosperity", tw: "財庫守護 · 穩健富貴" },
    career_hint: {
      zh: "适合行政、财务、地产、银行，守成有余，创业需搭配进攻型伙伴",
      en: "Suited to administration, finance, real estate, and banking; great at consolidation, but pair with an aggressive partner to start a venture.",
      tw: "適合行政、財務、地產、銀行，守成有餘，創業需搭配進攻型夥伴",
    },
    wealth_hint: {
      zh: "天生财库，善于积累，不善投机，财运稳健厚实",
      en: "A born treasury, skilled at accumulating rather than speculating, with steady and substantial wealth.",
      tw: "天生財庫，善於積累，不善投機，財運穩健厚實",
    },
    love_hint: {
      zh: "感情稳定，重承诺，是可托付终身的类型，但有时过于保守",
      en: "Stable and committed in love — someone to entrust your life to, though sometimes overly conservative.",
      tw: "感情穩定，重承諾，是可託付終身的類型，但有時過於保守",
    },
  },
  太阴: {
    name: "太阴", element: "水", yin_yang: "阴",
    category: { zh: "桃花星", en: "Romance Star", tw: "桃花星" },
    personality: {
      zh: "月亮之星，温柔细腻，直觉敏锐，审美高，内心世界丰富",
      en: "The moon star: gentle and delicate, keenly intuitive, with refined taste and a rich inner world.",
      tw: "月亮之星，溫柔細膩，直覺敏銳，審美高，內心世界豐富",
    },
    label: { zh: "月光女神 · 细腻敏感", en: "Moonlight Muse · Delicate & Sensitive", tw: "月光女神 · 細膩敏感" },
    career_hint: {
      zh: "适合艺术、文学、设计、心理咨询，夜间工作运势更佳",
      en: "Suited to the arts, literature, design, and counseling; fortune is stronger with nighttime work.",
      tw: "適合藝術、文學、設計、心理諮詢，夜間工作運勢更佳",
    },
    wealth_hint: {
      zh: "阴财格局，地产、股票类偏阴之财运佳，需防钱财外漏",
      en: "A yin-wealth pattern: good luck with real estate and stocks, but guard against money leaking away.",
      tw: "陰財格局，地產、股票類偏陰之財運佳，需防錢財外漏",
    },
    love_hint: {
      zh: "感情细腻浪漫，梦幻型恋人，但容易陷入感情而忽视现实",
      en: "Delicate and romantic — a dreamy lover, but apt to sink into feelings and overlook reality.",
      tw: "感情細膩浪漫，夢幻型戀人，但容易陷入感情而忽視現實",
    },
  },
  贪狼: {
    name: "贪狼", element: "木", yin_yang: "阳",
    category: { zh: "桃花星", en: "Romance Star", tw: "桃花星" },
    personality: {
      zh: "欲望之星，多才多艺，桃花旺盛，进取心强，人缘极好",
      en: "The star of desire: versatile, magnetic in romance, ambitious, and very well-liked.",
      tw: "欲望之星，多才多藝，桃花旺盛，進取心強，人緣極好",
    },
    label: { zh: "魅力全开 · 多才多艺", en: "Full Charm · Versatile", tw: "魅力全開 · 多才多藝" },
    career_hint: {
      zh: "适合娱乐、公关、销售、艺术，人缘是最大资本",
      en: "Suited to entertainment, PR, sales, and the arts — popularity is your greatest asset.",
      tw: "適合娛樂、公關、銷售、藝術，人緣是最大資本",
    },
    wealth_hint: {
      zh: "偏财运极旺，意外之财多，但也容易在声色中破财",
      en: "Very strong windfall luck and many unexpected gains, but money is easily lost to indulgence.",
      tw: "偏財運極旺，意外之財多，但也容易在聲色中破財",
    },
    love_hint: {
      zh: "桃花运极旺，感情丰富多彩，但专一度需加强，晚婚更利",
      en: "Very strong romance luck and a colorful love life, but work on faithfulness; late marriage is more favorable.",
      tw: "桃花運極旺，感情豐富多彩，但專一度需加強，晚婚更利",
    },
  },
  巨门: {
    name: "巨门", element: "水", yin_yang: "阴",
    category: { zh: "凶星", en: "Malefic Star", tw: "凶星" },
    personality: {
      zh: "暗曜之星，善于言辞，思辩能力强，是非口舌多，疑心较重",
      en: "The dark star: eloquent and sharp in reasoning, but prone to disputes and rather suspicious.",
      tw: "暗曜之星，善於言辭，思辨能力強，是非口舌多，疑心較重",
    },
    label: { zh: "口才毒舌 · 思辩达人", en: "Sharp Tongue · Master Debater", tw: "口才毒舌 · 思辨達人" },
    career_hint: {
      zh: "适合法律、媒体、教育、辩论，口才是核心竞争力",
      en: "Suited to law, media, education, and debate — eloquence is your core competitiveness.",
      tw: "適合法律、媒體、教育、辯論，口才是核心競爭力",
    },
    wealth_hint: {
      zh: "财运通过口才和专业知识来，脑力换财，是非财需谨慎",
      en: "Wealth comes through eloquence and expertise — brains for money — but beware income mired in disputes.",
      tw: "財運通過口才和專業知識來，腦力換財，是非財需謹慎",
    },
    love_hint: {
      zh: "感情多是非，需防口舌伤感情，多包容少争辩",
      en: "Love sees its share of friction; guard against words wounding feelings — be tolerant and argue less.",
      tw: "感情多是非，需防口舌傷感情，多包容少爭辯",
    },
  },
  天相: {
    name: "天相", element: "水", yin_yang: "阳",
    category: { zh: "善星", en: "Benevolent Star", tw: "善星" },
    personality: {
      zh: "印星，稳重诚信，处事公正，善于调和，天生助人格",
      en: "The seal star: steady and trustworthy, fair-minded, good at mediation — a born helper.",
      tw: "印星，穩重誠信，處事公正，善於調和，天生助人格",
    },
    label: { zh: "诚信担当 · 天生助人", en: "Trustworthy & Reliable · Born Helper", tw: "誠信擔當 · 天生助人" },
    career_hint: {
      zh: "适合行政、辅佐型岗位、外交、顾问，辅佐型角色大放异彩",
      en: "Suited to administration, supporting roles, diplomacy, and consulting — you shine in a supporting capacity.",
      tw: "適合行政、輔佐型崗位、外交、顧問，輔佐型角色大放異彩",
    },
    wealth_hint: {
      zh: "财运稳中有升，不强求横财，正统财路为主",
      en: "Wealth rises steadily; you don't chase windfalls, relying mainly on legitimate income.",
      tw: "財運穩中有升，不強求橫財，正統財路為主",
    },
    love_hint: {
      zh: "感情忠诚，重诺守信，是值得信赖的伴侣",
      en: "Faithful in love and true to your word — a trustworthy partner.",
      tw: "感情忠誠，重諾守信，是值得信賴的伴侶",
    },
  },
  天梁: {
    name: "天梁", element: "土", yin_yang: "阳",
    category: { zh: "善星", en: "Benevolent Star", tw: "善星" },
    personality: {
      zh: "荫星，德高望重，有慈悲心，贵人缘极好，化解危机能力强",
      en: "The shelter star: esteemed and virtuous, compassionate, with excellent benefactor luck and a knack for defusing crises.",
      tw: "蔭星，德高望重，有慈悲心，貴人緣極好，化解危機能力強",
    },
    label: { zh: "人生贵人 · 德高望重", en: "Life Benefactor · Esteemed & Virtuous", tw: "人生貴人 · 德高望重" },
    career_hint: {
      zh: "适合医疗、法律、宗教、慈善，天生有救人助人的使命感",
      en: "Suited to medicine, law, religion, and charity, with an innate sense of mission to help and rescue others.",
      tw: "適合醫療、法律、宗教、慈善，天生有救人助人的使命感",
    },
    wealth_hint: {
      zh: "贵人财运佳，遇险化吉，钱财常在危机中得到转机",
      en: "Good benefactor wealth: danger turns to safety, and money often finds a turning point amid crisis.",
      tw: "貴人財運佳，遇險化吉，錢財常在危機中得到轉機",
    },
    love_hint: {
      zh: "感情中常扮演保护者角色，需防感情年龄差距较大",
      en: "Often the protector in relationships; mind the potential for a large age gap.",
      tw: "感情中常扮演保護者角色，需防感情年齡差距較大",
    },
  },
  七杀: {
    name: "七杀", element: "金", yin_yang: "阴",
    category: { zh: "权星", en: "Authority Star", tw: "權星" },
    personality: {
      zh: "将星，刚强果决，不屈不挠，逢凶化吉，开创力极强",
      en: "The general star: strong and decisive, unyielding, turning peril into safety, with powerful pioneering drive.",
      tw: "將星，剛強果決，不屈不撓，逢凶化吉，開創力極強",
    },
    label: { zh: "破局先锋 · 天生战士", en: "Trailblazer · Born Warrior", tw: "破局先鋒 · 天生戰士" },
    career_hint: {
      zh: "适合军政、开拓型职位、创业先锋，越是逆境越能爆发",
      en: "Suited to the military/government, pioneering roles, and entrepreneurship — the harder the adversity, the greater your surge.",
      tw: "適合軍政、開拓型職位、創業先鋒，越是逆境越能爆發",
    },
    wealth_hint: {
      zh: "白手起家型，初期艰辛但后期丰厚，偏向劳力得财",
      en: "Self-made: tough at first but bountiful later, earning chiefly through effort.",
      tw: "白手起家型，初期艱辛但後期豐厚，偏向勞力得財",
    },
    love_hint: {
      zh: "感情独立，不依附，需要势均力敌的伴侣，晚婚更吉",
      en: "Independent in love and non-clinging; you need an evenly matched partner, and late marriage is more auspicious.",
      tw: "感情獨立，不依附，需要勢均力敵的伴侶，晚婚更吉",
    },
  },
  破军: {
    name: "破军", element: "水", yin_yang: "阴",
    category: { zh: "凶星", en: "Malefic Star", tw: "凶星" },
    personality: {
      zh: "耗星，打破旧格局，个性前卫，革新能力强，变动是常态",
      en: "The destroyer star: breaks old molds, avant-garde in character, strongly innovative — change is the norm.",
      tw: "耗星，打破舊格局，個性前衛，革新能力強，變動是常態",
    },
    label: { zh: "破旧立新 · 革新先驱", en: "Out with the Old · Pioneer of Renewal", tw: "破舊立新 · 革新先驅" },
    career_hint: {
      zh: "适合新兴行业、创业、改革型岗位，不适合守旧，变动才有出路",
      en: "Suited to emerging industries, startups, and reform-oriented roles; not for the conservative — change is your way forward.",
      tw: "適合新興行業、創業、改革型崗位，不適合守舊，變動才有出路",
    },
    wealth_hint: {
      zh: "财运大起大落，敢赌敢拼，需防一次冒险毁掉前期积累",
      en: "Wealth rises and falls dramatically; bold and willing to gamble, but one risk could wipe out earlier gains.",
      tw: "財運大起大落，敢賭敢拼，需防一次冒險毀掉前期積累",
    },
    love_hint: {
      zh: "感情多波折，分分合合，需找能接受其不稳定性的伴侣",
      en: "Love is turbulent, with breakups and reunions; find a partner who can accept that instability.",
      tw: "感情多波折，分分合合，需找能接受其不穩定性的伴侶",
    },
  },
};

// ===== 宫位定义 =====
export interface Palace {
  id: number;
  name: L;            // 宫位名（命盘格内中文，散文本地化）
  modernName: L;      // 小白模式现代名称
  description: L;      // 宫位含义
  modernDesc: L;       // 现代描述
  lifeArea: L;         // 对应人生领域
}

export const PALACES: Palace[] = [
  { id: 0,
    name: { zh: "命宫", en: "Life Palace", tw: "命宮" },
    modernName: { zh: "核心人格", en: "Core Self", tw: "核心人格" },
    description: { zh: "主命主星，决定先天性格与一生格局", en: "Governs the destiny stars, shaping your innate character and lifelong pattern.", tw: "主命主星，決定先天性格與一生格局" },
    modernDesc: { zh: "你是谁？你的天赋与人格底色", en: "Who you are — your gifts and the baseline of your personality.", tw: "你是誰？你的天賦與人格底色" },
    lifeArea: { zh: "性格", en: "Character", tw: "性格" } },
  { id: 1,
    name: { zh: "兄弟宫", en: "Siblings Palace", tw: "兄弟宮" },
    modernName: { zh: "手足情缘", en: "Sibling Bonds", tw: "手足情緣" },
    description: { zh: "主兄弟姐妹及朋辈关系", en: "Governs siblings and peer relationships.", tw: "主兄弟姐妹及朋輩關係" },
    modernDesc: { zh: "兄弟姐妹与平辈友人的缘分", en: "Your bonds with siblings and peers.", tw: "兄弟姐妹與平輩友人的緣分" },
    lifeArea: { zh: "六亲", en: "Family", tw: "六親" } },
  { id: 2,
    name: { zh: "夫妻宫", en: "Spouse Palace", tw: "夫妻宮" },
    modernName: { zh: "理想伴侣", en: "Ideal Partner", tw: "理想伴侶" },
    description: { zh: "主配偶特质、婚姻运势", en: "Governs your spouse's traits and marital fortune.", tw: "主配偶特質、婚姻運勢" },
    modernDesc: { zh: "命中注定的那个人是什么样", en: "What the one destined for you is like.", tw: "命中注定的那個人是什麼樣" },
    lifeArea: { zh: "感情", en: "Love", tw: "感情" } },
  { id: 3,
    name: { zh: "子女宫", en: "Children Palace", tw: "子女宮" },
    modernName: { zh: "子嗣创造力", en: "Children & Creativity", tw: "子嗣創造力" },
    description: { zh: "主子女缘分及个人创造力", en: "Governs your bond with children and personal creativity.", tw: "主子女緣分及個人創造力" },
    modernDesc: { zh: "与子女的缘分及创造天赋", en: "Your bond with children and your creative gifts.", tw: "與子女的緣分及創造天賦" },
    lifeArea: { zh: "六亲", en: "Family", tw: "六親" } },
  { id: 4,
    name: { zh: "财帛宫", en: "Wealth Palace", tw: "財帛宮" },
    modernName: { zh: "财富基因", en: "Wealth DNA", tw: "財富基因" },
    description: { zh: "主财运格局、赚钱方式", en: "Governs your wealth pattern and how you make money.", tw: "主財運格局、賺錢方式" },
    modernDesc: { zh: "你天生的财富密码与赚钱方式", en: "Your innate wealth code and the way you earn.", tw: "你天生的財富密碼與賺錢方式" },
    lifeArea: { zh: "财富", en: "Wealth", tw: "財富" } },
  { id: 5,
    name: { zh: "疾厄宫", en: "Health Palace", tw: "疾厄宮" },
    modernName: { zh: "身心健康", en: "Body & Mind", tw: "身心健康" },
    description: { zh: "主疾病、身体状况及心理健康", en: "Governs illness, physical condition, and mental health.", tw: "主疾病、身體狀況及心理健康" },
    modernDesc: { zh: "你需要关注的健康信号", en: "The health signals you should watch.", tw: "你需要關注的健康信號" },
    lifeArea: { zh: "健康", en: "Health", tw: "健康" } },
  { id: 6,
    name: { zh: "迁移宫", en: "Travel Palace", tw: "遷移宮" },
    modernName: { zh: "外部机遇", en: "Outer Opportunities", tw: "外部機遇" },
    description: { zh: "主出行、贵人、外在机遇", en: "Governs travel, benefactors, and external opportunities.", tw: "主出行、貴人、外在機遇" },
    modernDesc: { zh: "在外发展与贵人缘分", en: "Growth away from home and benefactor connections.", tw: "在外發展與貴人緣分" },
    lifeArea: { zh: "机遇", en: "Opportunity", tw: "機遇" } },
  { id: 7,
    name: { zh: "交友宫", en: "Friends Palace", tw: "交友宮" },
    modernName: { zh: "人脉密码", en: "Network Code", tw: "人脈密碼" },
    description: { zh: "主朋友、同事、下属关系", en: "Governs friends, colleagues, and subordinates.", tw: "主朋友、同事、下屬關係" },
    modernDesc: { zh: "你的人脉质量与社交能量", en: "The quality of your network and your social energy.", tw: "你的人脈質量與社交能量" },
    lifeArea: { zh: "人际", en: "Social", tw: "人際" } },
  { id: 8,
    name: { zh: "官禄宫", en: "Career Palace", tw: "官祿宮" },
    modernName: { zh: "事业赛道", en: "Career Track", tw: "事業賽道" },
    description: { zh: "主事业格局、职业方向", en: "Governs your career pattern and professional direction.", tw: "主事業格局、職業方向" },
    modernDesc: { zh: "你最适合的事业赛道与成就上限", en: "The career track that suits you best and your ceiling of achievement.", tw: "你最適合的事業賽道與成就上限" },
    lifeArea: { zh: "事业", en: "Career", tw: "事業" } },
  { id: 9,
    name: { zh: "田宅宫", en: "Property Palace", tw: "田宅宮" },
    modernName: { zh: "资产根基", en: "Asset Foundation", tw: "資產根基" },
    description: { zh: "主房产、祖业、家庭环境", en: "Governs property, family inheritance, and home environment.", tw: "主房產、祖業、家庭環境" },
    modernDesc: { zh: "物质基础与家庭能量场", en: "Your material foundation and the energy field of your home.", tw: "物質基礎與家庭能量場" },
    lifeArea: { zh: "资产", en: "Assets", tw: "資產" } },
  { id: 10,
    name: { zh: "福德宫", en: "Wellbeing Palace", tw: "福德宮" },
    modernName: { zh: "内心宇宙", en: "Inner Universe", tw: "內心宇宙" },
    description: { zh: "主精神世界、享福能力、前世业力", en: "Governs your spiritual world, capacity for enjoyment, and karmic legacy.", tw: "主精神世界、享福能力、前世業力" },
    modernDesc: { zh: "你的精神世界与享乐能力", en: "Your spiritual world and your capacity for enjoyment.", tw: "你的精神世界與享樂能力" },
    lifeArea: { zh: "福气", en: "Fortune", tw: "福氣" } },
  { id: 11,
    name: { zh: "父母宫", en: "Parents Palace", tw: "父母宮" },
    modernName: { zh: "原生密码", en: "Origin Code", tw: "原生密碼" },
    description: { zh: "主父母缘分、长辈关系、学业", en: "Governs your bond with parents, relations with elders, and studies.", tw: "主父母緣分、長輩關係、學業" },
    modernDesc: { zh: "原生家庭能量与长辈贵人", en: "The energy of your family of origin and elder benefactors.", tw: "原生家庭能量與長輩貴人" },
    lifeArea: { zh: "六亲", en: "Family", tw: "六親" } },
];

/** 解析宫位名（散文用）。chartCell=true 时返回中文字形（命盘格内）。 */
export function resolvePalaceName(p: Palace, lang: Lang): string {
  return p.name[lang];
}

// ===== 四化定义 =====
export interface SiHua {
  type: "禄" | "权" | "科" | "忌";   // 中文字形（命盘格内保留）
  color: string;
  meaning: L;
  shortMeaning: L;
}

export const SI_HUA: Record<string, SiHua> = {
  禄: { type: "禄", color: "#FFD700",
    meaning: { zh: "财禄、贵人、助力", en: "Wealth, benefactors, support", tw: "財祿、貴人、助力" },
    shortMeaning: { zh: "得财", en: "Gains wealth", tw: "得財" } },
  权: { type: "权", color: "#FF6B35",
    meaning: { zh: "权力、掌控、主动出击", en: "Power, control, taking the initiative", tw: "權力、掌控、主動出擊" },
    shortMeaning: { zh: "得权", en: "Gains power", tw: "得權" } },
  科: { type: "科", color: "#4FC3F7",
    meaning: { zh: "名声、学识、贵人提携", en: "Fame, learning, benefactor support", tw: "名聲、學識、貴人提攜" },
    shortMeaning: { zh: "得名", en: "Gains fame", tw: "得名" } },
  忌: { type: "忌", color: "#EF5350",
    meaning: { zh: "阻碍、耗损、需谨慎之处", en: "Obstruction, depletion, areas needing caution", tw: "阻礙、耗損、需謹慎之處" },
    shortMeaning: { zh: "受阻", en: "Obstructed", tw: "受阻" } },
};

// ===== 天干与四化的对应 =====
// 每个天干对应：[禄, 权, 科, 忌]
export const TIANGAN_SIHUA: Record<string, [string, string, string, string]> = {
  甲: ["廉贞", "破军", "武曲", "太阳"],
  乙: ["天机", "天梁", "紫微", "太阴"],
  丙: ["天同", "天机", "文昌", "廉贞"],
  丁: ["太阴", "天同", "天机", "巨门"],
  戊: ["贪狼", "太阴", "右弼", "天机"],
  己: ["武曲", "贪狼", "天梁", "文曲"],
  庚: ["太阳", "武曲", "太阴", "天同"],
  辛: ["巨门", "太阳", "文曲", "文昌"],
  壬: ["天梁", "紫微", "左辅", "武曲"],
  癸: ["破军", "巨门", "太阴", "贪狼"],
};

// ===== 地支对应 =====
export const DI_ZHI_12 = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"] as const;
export const TIAN_GAN_10 = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"] as const;

// ===== 五行局 =====
export interface WuXingJu {
  name: L;
  startAge: number; // 起运年龄
  element: string;
  description: L;
}

export const WU_XING_JU: WuXingJu[] = [
  { name: { zh: "水二局", en: "Water-2 Phase", tw: "水二局" }, startAge: 2, element: "水",
    description: { zh: "水局起运，2岁起大限，每限10年", en: "Water phase begins; major periods start at age 2, each lasting 10 years.", tw: "水局起運，2歲起大限，每限10年" } },
  { name: { zh: "木三局", en: "Wood-3 Phase", tw: "木三局" }, startAge: 3, element: "木",
    description: { zh: "木局起运，3岁起大限", en: "Wood phase begins; major periods start at age 3.", tw: "木局起運，3歲起大限" } },
  { name: { zh: "金四局", en: "Metal-4 Phase", tw: "金四局" }, startAge: 4, element: "金",
    description: { zh: "金局起运，4岁起大限", en: "Metal phase begins; major periods start at age 4.", tw: "金局起運，4歲起大限" } },
  { name: { zh: "土五局", en: "Earth-5 Phase", tw: "土五局" }, startAge: 5, element: "土",
    description: { zh: "土局起运，5岁起大限", en: "Earth phase begins; major periods start at age 5.", tw: "土局起運，5歲起大限" } },
  { name: { zh: "火六局", en: "Fire-6 Phase", tw: "火六局" }, startAge: 6, element: "火",
    description: { zh: "火局起运，6岁起大限", en: "Fire phase begins; major periods start at age 6.", tw: "火局起運，6歲起大限" } },
];

/** 五行局名本地化：传入中文局名 key（如 "木三局"），按 lang 返回。 */
export const WU_XING_JU_NAME: Record<string, L> = {
  水二局: { zh: "水二局", en: "Water-2 Phase", tw: "水二局" },
  木三局: { zh: "木三局", en: "Wood-3 Phase", tw: "木三局" },
  金四局: { zh: "金四局", en: "Metal-4 Phase", tw: "金四局" },
  土五局: { zh: "土五局", en: "Earth-5 Phase", tw: "土五局" },
  火六局: { zh: "火六局", en: "Fire-6 Phase", tw: "火六局" },
};
export function resolveWuXingJu(juKey: string, lang: Lang): string {
  return WU_XING_JU_NAME[juKey]?.[lang] ?? juKey;
}

// ===== 五行（元素）本地化 =====
export const ELEMENT_DISPLAY: Record<string, L> = {
  木: { zh: "木", en: "Wood", tw: "木" },
  火: { zh: "火", en: "Fire", tw: "火" },
  土: { zh: "土", en: "Earth", tw: "土" },
  金: { zh: "金", en: "Metal", tw: "金" },
  水: { zh: "水", en: "Water", tw: "水" },
};
export function resolveElement(el: string, lang: Lang): string {
  return ELEMENT_DISPLAY[el]?.[lang] ?? el;
}

// ===== 阴阳本地化 =====
export const YINYANG_DISPLAY: Record<string, L> = {
  阴: { zh: "阴", en: "Yin", tw: "陰" },
  阳: { zh: "阳", en: "Yang", tw: "陽" },
};
export function resolveYinYang(yy: string, lang: Lang): string {
  return YINYANG_DISPLAY[yy]?.[lang] ?? yy;
}

// ===== 辅星 =====
export const AUX_STARS = [
  "左辅", "右弼", "文昌", "文曲", "天魁", "天钺",
  "禄存", "天马", "擎羊", "陀罗", "火星", "铃星",
  "天空", "地劫", "化禄", "化权", "化科", "化忌",
] as const;

// ===== 性格标签（主星+宫位组合）=====
export const PERSONALITY_LABELS: Record<string, LArr> = {
  紫微: { zh: ["帝王命格", "天生领袖", "格局超凡", "贵气逼人"], en: ["Imperial Destiny", "Born Leader", "Extraordinary Pattern", "Radiant Nobility"], tw: ["帝王命格", "天生領袖", "格局超凡", "貴氣逼人"] },
  天机: { zh: ["智慧型人格", "谋略大师", "思维活跃", "变化是常态"], en: ["Intellectual Type", "Master Strategist", "Agile Mind", "Change Is Constant"], tw: ["智慧型人格", "謀略大師", "思維活躍", "變化是常態"] },
  太阳: { zh: ["光芒体质", "博爱之人", "事业型领袖", "舞台中央的人"], en: ["Radiant Nature", "Loving Soul", "Career Leader", "Center Stage"], tw: ["光芒體質", "博愛之人", "事業型領袖", "舞台中央的人"] },
  武曲: { zh: ["财富体质", "执行力满分", "金融天才", "行动派代表"], en: ["Wealth-Drawn", "Peak Execution", "Finance Genius", "Action-First"], tw: ["財富體質", "執行力滿分", "金融天才", "行動派代表"] },
  天同: { zh: ["治愈系人格", "生活家", "感性主义者", "人间富贵花"], en: ["Healing Type", "Life Connoisseur", "Sentimentalist", "Blessed & Lush"], tw: ["治癒系人格", "生活家", "感性主義者", "人間富貴花"] },
  廉贞: { zh: ["个性爆表", "爱恨分明", "艺术才子", "命运传奇"], en: ["Bold Character", "Sharp Loves & Hates", "Artistic Talent", "Legendary Fate"], tw: ["個性爆表", "愛恨分明", "藝術才子", "命運傳奇"] },
  天府: { zh: ["财库体质", "稳健富贵", "藏富于身", "大器晚成"], en: ["Treasury Nature", "Steady Prosperity", "Quiet Wealth", "Late Bloomer"], tw: ["財庫體質", "穩健富貴", "藏富於身", "大器晚成"] },
  太阴: { zh: ["月光女神", "细腻如诗", "审美大师", "内心宇宙丰富"], en: ["Moonlight Muse", "Poetic & Delicate", "Aesthete", "Rich Inner World"], tw: ["月光女神", "細膩如詩", "審美大師", "內心宇宙豐富"] },
  贪狼: { zh: ["魅力全开", "多才多艺", "桃花旺盛", "欲望成就人生"], en: ["Full Charm", "Versatile", "Magnetic Romance", "Driven by Desire"], tw: ["魅力全開", "多才多藝", "桃花旺盛", "欲望成就人生"] },
  巨门: { zh: ["口才型人格", "思辩达人", "真话直说", "智识驱动者"], en: ["Eloquent Type", "Master Debater", "Blunt Truth-Teller", "Intellect-Driven"], tw: ["口才型人格", "思辨達人", "真話直說", "智識驅動者"] },
  天相: { zh: ["诚信担当", "调和高手", "天生顾问", "贵人体质"], en: ["Trustworthy & Reliable", "Master Mediator", "Born Advisor", "Benefactor-Drawn"], tw: ["誠信擔當", "調和高手", "天生顧問", "貴人體質"] },
  天梁: { zh: ["福德深厚", "人生贵人", "化险为夷", "德高望重"], en: ["Deep Fortune", "Life Benefactor", "Turns Peril to Safety", "Esteemed & Virtuous"], tw: ["福德深厚", "人生貴人", "化險為夷", "德高望重"] },
  七杀: { zh: ["破局先锋", "天生战士", "逆境爆发", "不服就干"], en: ["Trailblazer", "Born Warrior", "Surges in Adversity", "Never Backs Down"], tw: ["破局先鋒", "天生戰士", "逆境爆發", "不服就幹"] },
  破军: { zh: ["破旧立新", "革新先驱", "敢为人先", "变动成就"], en: ["Out with the Old", "Pioneer of Renewal", "First to Dare", "Driven by Change"], tw: ["破舊立新", "革新先驅", "敢為人先", "變動成就"] },
};

/** 解析某主星的性格标签（散文/标签）。 */
export function resolvePersonalityLabels(starKey: string, lang: Lang): string[] {
  const v = PERSONALITY_LABELS[starKey];
  if (!v) {
    return lang === "en"
      ? ["Unique Destiny", "Gifted by Nature", "Extraordinary Pattern"]
      : lang === "tw"
        ? ["命格獨特", "天賦異稟", "格局超凡"]
        : ["命格独特", "天赋异禀", "格局超凡"];
  }
  return v[lang];
}

// ===== 命宫主星解读（免费版）=====
export const MINGONG_FREE_READINGS: Record<string, L> = {
  紫微: {
    zh: "紫微坐命，帝王格局。你天生具有领袖气质，自带主角光环，进入任何群体都容易成为核心人物。你对自己的要求极高，有时甚至完美主义，但也正是这种标准让你不断超越平凡。你的一生，注定不是普通的人生。",
    en: "With Zi Wei in the Life Palace, you carry an imperial pattern. You are a born leader with a main-character aura, easily becoming the core of any group. You hold yourself to exacting standards, sometimes to the point of perfectionism — yet it is precisely that standard that keeps you rising above the ordinary. Your life is destined to be anything but average.",
    tw: "紫微坐命，帝王格局。你天生具有領袖氣質，自帶主角光環，進入任何群體都容易成為核心人物。你對自己的要求極高，有時甚至完美主義，但也正是這種標準讓你不斷超越平凡。你的一生，注定不是普通的人生。",
  },
  天机: {
    zh: "天机坐命，智慧聪颖。你拥有超强的分析能力和机变思维，是天生的策略家。你的大脑永远在转动，总能在别人想不到的地方找到出路。变化不是你的障碍，而是你的舞台。",
    en: "With Tian Ji in the Life Palace, you are sharp and clever. You possess powerful analytical skill and an agile, adaptive mind — a born strategist. Your mind never stops turning, and you find a way out where others see none. Change is not your obstacle but your stage.",
    tw: "天機坐命，智慧聰穎。你擁有超強的分析能力和機變思維，是天生的策略家。你的大腦永遠在轉動，總能在別人想不到的地方找到出路。變化不是你的障礙，而是你的舞台。",
  },
  太阳: {
    zh: "太阳坐命，光明磊落。你是人群中最耀眼的那道光，慷慨大度，重情重义。你的名声与事业紧密相连，越付出越有回报。你天生适合出现在公众视野中，舞台会给你最好的回馈。",
    en: "With Tai Yang in the Life Palace, you are bright and upright. You are the most dazzling light in any crowd — generous, magnanimous, and deeply loyal. Your reputation and career are tightly linked; the more you give, the more you receive. You were made for the public eye, and the stage rewards you best.",
    tw: "太陽坐命，光明磊落。你是人群中最耀眼的那道光，慷慨大度，重情重義。你的名聲與事業緊密相連，越付出越有回報。你天生適合出現在公眾視野中，舞台會給你最好的回饋。",
  },
  武曲: {
    zh: "武曲坐命，财星高照。你是天生的实干派，行动力极强，白手起家的能力让旁人叹服。你的人生哲学是：少说多做，用结果说话。金融、实体、工程，都是你大展拳脚的领域。",
    en: "With Wu Qu in the Life Palace, the wealth star shines on you. You are a born doer with formidable drive, and your self-made ability astonishes others. Your philosophy: say less, do more, let results speak. Finance, the real economy, and engineering are arenas where you thrive.",
    tw: "武曲坐命，財星高照。你是天生的實幹派，行動力極強，白手起家的能力讓旁人嘆服。你的人生哲學是：少說多做，用結果說話。金融、實體、工程，都是你大展拳腳的領域。",
  },
  天同: {
    zh: "天同坐命，福德深厚。你是人间最懂享受的人，温和善良，人缘极好。你的幸福感来自内心，而非外界的成就。你的生命主题是：活得开心，活得有意义，活得被人温暖。",
    en: "With Tian Tong in the Life Palace, your fortune runs deep. You are someone who truly knows how to enjoy life — gentle, kind, and well-liked. Your happiness springs from within rather than from outward achievement. Your life's theme: to live joyfully, meaningfully, and warmed by others.",
    tw: "天同坐命，福德深厚。你是人間最懂享受的人，溫和善良，人緣極好。你的幸福感來自內心，而非外界的成就。你的生命主題是：活得開心，活得有意義，活得被人溫暖。",
  },
  廉贞: {
    zh: "廉贞坐命，个性鲜明。你是命盘中最复杂也最有魅力的一颗星，爱恨分明，艺术才华横溢。你的人生充满戏剧性，但也因此比普通人活得更浓烈、更精彩。",
    en: "With Lian Zhen in the Life Palace, your character is vivid. You are the most complex and most magnetic star in the chart — sharp in your loves and hates, brimming with artistic talent. Your life is full of drama, and because of it you live more intensely and more vividly than most.",
    tw: "廉貞坐命，個性鮮明。你是命盤中最複雜也最有魅力的一顆星，愛恨分明，藝術才華橫溢。你的人生充滿戲劇性，但也因此比普通人活得更濃烈、更精彩。",
  },
  天府: {
    zh: "天府坐命，财库深厚。你是天生的守富高手，稳重大方，善于积累。你不喜欢冒险，但你的财富会随着年岁的增长而厚积薄发。中年之后，你的财富格局将真正显现。",
    en: "With Tian Fu in the Life Palace, your treasury runs deep. You are a born keeper of wealth — steady, gracious, and skilled at accumulating. You dislike risk, yet your wealth builds and unfolds with the years. After midlife, your true wealth pattern emerges.",
    tw: "天府坐命，財庫深厚。你是天生的守富高手，穩重大方，善於積累。你不喜歡冒險，但你的財富會隨著年歲的增長而厚積薄發。中年之後，你的財富格局將真正顯現。",
  },
  太阴: {
    zh: "太阴坐命，月华如水。你是最感性细腻的存在，内心世界极为丰富，审美品位极高。你的直觉常常让你比旁人更早看到事物的本质。月光照耀的地方，都是你的福地。",
    en: "With Tai Yin in the Life Palace, you are like moonlight on water. You are the most sensitive and delicate of beings, with a remarkably rich inner world and exquisite taste. Your intuition often lets you see the essence of things sooner than others. Wherever the moonlight falls is your fortunate ground.",
    tw: "太陰坐命，月華如水。你是最感性細膩的存在，內心世界極為豐富，審美品味極高。你的直覺常常讓你比旁人更早看到事物的本質。月光照耀的地方，都是你的福地。",
  },
  贪狼: {
    zh: "贪狼坐命，魅力无穷。你是人群中桃花运最旺的那一个，多才多艺，进取心强。你的人生精彩在于：欲望给了你动力，才华给了你方向。只要你想，几乎没有什么是你得不到的。",
    en: "With Tan Lang in the Life Palace, your charm is boundless. You have the strongest romance luck in any crowd — versatile and ambitious. The brilliance of your life lies in this: desire gives you drive, and talent gives you direction. When you set your mind to it, there is almost nothing beyond your reach.",
    tw: "貪狼坐命，魅力無窮。你是人群中桃花運最旺的那一個，多才多藝，進取心強。你的人生精彩在於：欲望給了你動力，才華給了你方向。只要你想，幾乎沒有什麼是你得不到的。",
  },
  巨门: {
    zh: "巨门坐命，言辞犀利。你的口才和思辩能力是你最大的武器，但也容易因言得祸。你的人生需要一个表达的舞台——法庭、讲台、媒体，都是属于你的场所。",
    en: "With Ju Men in the Life Palace, your words are incisive. Your eloquence and reasoning are your greatest weapons, though speech can also bring trouble. Your life needs a stage for expression — the courtroom, the lectern, the media are all places that belong to you.",
    tw: "巨門坐命，言辭犀利。你的口才和思辨能力是你最大的武器，但也容易因言得禍。你的人生需要一個表達的舞台——法庭、講台、媒體，都是屬於你的場所。",
  },
  天相: {
    zh: "天相坐命，诚信为本。你是最值得信赖的人，处事公正，善于调和矛盾。贵人缘极好，常常在关键时刻得到贵人相助。你是许多人生命中的重要支柱。",
    en: "With Tian Xiang in the Life Palace, integrity is your foundation. You are among the most trustworthy of people — fair in your dealings and skilled at reconciling conflict. Your benefactor luck is excellent, and help often arrives at crucial moments. You are a vital pillar in many lives.",
    tw: "天相坐命，誠信為本。你是最值得信賴的人，處事公正，善於調和矛盾。貴人緣極好，常常在關鍵時刻得到貴人相助。你是許多人生命中的重要支柱。",
  },
  天梁: {
    zh: "天梁坐命，德高望重。你天生有化解危机的能力，贵人缘极好，越是逆境越能逢凶化吉。你的一生仿佛有神明庇佑，大难不死，必有后福。",
    en: "With Tian Liang in the Life Palace, you are esteemed and virtuous. You have an innate gift for defusing crises and excellent benefactor luck; the deeper the adversity, the more peril turns to safety. Your life seems watched over by the divine — surviving great trials, greater fortune awaits.",
    tw: "天梁坐命，德高望重。你天生有化解危機的能力，貴人緣極好，越是逆境越能逢凶化吉。你的一生彷彿有神明庇佑，大難不死，必有後福。",
  },
  七杀: {
    zh: "七杀坐命，铁血意志。你是天生的战士，越挫越勇，在逆境中才能真正展现你的价值。开拓、创业、破局——这些词是为你量身定制的。不服就干，是你的人生态度。",
    en: "With Qi Sha in the Life Palace, your will is iron. You are a born warrior, growing braver under setbacks, and you prove your true worth in adversity. Pioneering, founding ventures, breaking deadlocks — these words were made for you. Never backing down is your way of life.",
    tw: "七殺坐命，鐵血意志。你是天生的戰士，越挫越勇，在逆境中才能真正展現你的價值。開拓、創業、破局——這些詞是為你量身定制的。不服就幹，是你的人生態度。",
  },
  破军: {
    zh: "破军坐命，破旧立新。你是时代的先驱者，不安于现状，永远在打破旧格局。你的人生主旋律是变化，而每一次变化都是向上攀升的台阶。在新兴领域，你将大放异彩。",
    en: "With Po Jun in the Life Palace, you break the old to build the new. You are a pioneer of your era, restless with the status quo, forever shattering old molds. The leitmotif of your life is change, and each change is a step upward. In emerging fields, you will shine brilliantly.",
    tw: "破軍坐命，破舊立新。你是時代的先驅者，不安於現狀，永遠在打破舊格局。你的人生主旋律是變化，而每一次變化都是向上攀升的台階。在新興領域，你將大放異彩。",
  },
};

/** 解析命宫主星免费解读，未知 key 回退紫微。 */
export function resolveMingReading(starKey: string, lang: Lang): string {
  return (MINGONG_FREE_READINGS[starKey] ?? MINGONG_FREE_READINGS["紫微"]!)[lang];
}

// ===== 悬念标题 =====
export interface PaywallHint { tag: L; title: L; teaser: L; }

export const PAYWALL_HINTS: Record<string, PaywallHint> = {
  财富: {
    tag: { zh: "财富", en: "Wealth", tw: "財富" },
    title: { zh: "你的财帛宫隐藏秘密", en: "Your Wealth Palace hides a secret", tw: "你的財帛宮隱藏秘密" },
    teaser: {
      zh: "你的财富密码与大多数人截然不同，有一个关键时间节点决定你的人生财富走向…",
      en: "Your wealth code differs sharply from most people's, and one key moment in time decides the course of your lifelong fortune…",
      tw: "你的財富密碼與大多數人截然不同，有一個關鍵時間節點決定你的人生財富走向…",
    },
  },
  事业: {
    tag: { zh: "事业", en: "Career", tw: "事業" },
    title: { zh: "你的官禄宫揭示了什么", en: "What your Career Palace reveals", tw: "你的官祿宮揭示了什麼" },
    teaser: {
      zh: "你的事业赛道与你想象中的可能完全不同，有一个行业将会是你的人生跃迁入口…",
      en: "Your career track may be entirely different from what you imagine, and one industry could be the gateway to your life's leap forward…",
      tw: "你的事業賽道與你想像中的可能完全不同，有一個行業將會是你的人生躍遷入口…",
    },
  },
  婚姻: {
    tag: { zh: "婚姻", en: "Marriage", tw: "婚姻" },
    title: { zh: "你的夫妻宫里住着谁", en: "Who lives in your Spouse Palace", tw: "你的夫妻宮裡住著誰" },
    teaser: {
      zh: "你命中注定的伴侣有极为具体的特征，他/她现在可能就在你生活的半径之内…",
      en: "The partner destined for you has remarkably specific traits, and they may already be within the radius of your daily life…",
      tw: "你命中注定的伴侶有極為具體的特徵，他/她現在可能就在你生活的半徑之內…",
    },
  },
  贵人: {
    tag: { zh: "贵人", en: "Benefactor", tw: "貴人" },
    title: { zh: "你的贵人在哪里", en: "Where your benefactors are", tw: "你的貴人在哪裡" },
    teaser: {
      zh: "你的命盘中有一个隐藏的贵人符号，解读后你将知道该向哪个方向走才能逢凶化吉…",
      en: "Your chart holds a hidden benefactor sign; once decoded, you'll know which direction to turn so peril becomes safety…",
      tw: "你的命盤中有一個隱藏的貴人符號，解讀後你將知道該向哪個方向走才能逢凶化吉…",
    },
  },
};

/** 解析付费墙提示（返回 tag/title/teaser 三段本地化文本）。 */
export function resolvePaywallHints(lang: Lang): Array<{ key: string; tag: string; title: string; teaser: string }> {
  return Object.entries(PAYWALL_HINTS).map(([key, hint]) => ({
    key,
    tag: hint.tag[lang],
    title: hint.title[lang],
    teaser: hint.teaser[lang],
  }));
}

// ===== 加载文案 =====
export const ZIWEI_LOADING_TEXTS: LArr = {
  zh: [
    "正在安置紫微星位置…",
    "排列十四主星于十二宫…",
    "飞布四化禄权科忌…",
    "推算大限流年运势…",
    "解析三方四正格局…",
    "融合东方星盘数据…",
    "你的命盘即将呈现…",
    "紫微斗数·精准排盘中…",
  ],
  en: [
    "Placing the Zi Wei star…",
    "Arranging the 14 major stars across the 12 palaces…",
    "Spreading the Four Transformations (Lu, Quan, Ke, Ji)…",
    "Calculating major-period and annual fortune…",
    "Analyzing the triad and opposite palaces…",
    "Merging Eastern star-chart data…",
    "Your chart is about to appear…",
    "Zi Wei Dou Shu · precise charting in progress…",
  ],
  tw: [
    "正在安置紫微星位置…",
    "排列十四主星於十二宮…",
    "飛布四化祿權科忌…",
    "推算大限流年運勢…",
    "解析三方四正格局…",
    "融合東方星盤數據…",
    "你的命盤即將呈現…",
    "紫微斗數·精準排盤中…",
  ],
};

// ===== 星曜颜色 =====
export const STAR_COLORS: Record<string, string> = {
  紫微: "#C77DFF",  天机: "#48CAE4",  太阳: "#FFB703",
  武曲: "#E9C46A",  天同: "#90E0EF",  廉贞: "#E76F51",
  天府: "#74C69D",  太阴: "#B8D8F8",  贪狼: "#FF99C8",
  巨门: "#9E9E9E",  天相: "#81B29A",  天梁: "#F4A261",
  七杀: "#E63946",  破军: "#457B9D",
};

// ===== 信任背书 =====
export const ZIWEI_REVIEWS = [
  { name: "周**", text: "财帛宫的分析太准了，说我适合金融行业，我现在真的在做基金！" },
  { name: "陈**", text: "命宫是七杀，说我越挫越勇，今年创业失败后确实又站起来了。" },
  { name: "林**", text: "夫妻宫的描述和我老公的特征几乎一模一样，太神奇了。" },
  { name: "张**", text: "比起西方星盘，紫微斗数对我性格的描述更精准，层次更深。" },
  { name: "王**", text: "大限流年的分析让我对今年的事业变动有了心理准备，非常有帮助。" },
];

// ===== 年龄段大限文案 =====
export const DAXIAN_TEXTS: Record<"early" | "youth" | "mature" | "prime", L> = {
  early: {
    zh: "1-20岁大限：命运的奠基期，性格与天赋在这段时间基本定型，原生家庭的能量影响深远。",
    en: "Ages 1–20 major period: the foundation of destiny. Character and talents largely take shape in these years, and the energy of your family of origin runs deep.",
    tw: "1-20歲大限：命運的奠基期，性格與天賦在這段時間基本定型，原生家庭的能量影響深遠。",
  },
  youth: {
    zh: "21-30岁大限：人生的上升期，事业起点、感情初遇、人生方向的关键抉择都在此时。",
    en: "Ages 21–30 major period: a rising phase. Your career's start, first encounters in love, and key choices of direction all fall in this time.",
    tw: "21-30歲大限：人生的上升期，事業起點、感情初遇、人生方向的關鍵抉擇都在此時。",
  },
  mature: {
    zh: "31-40岁大限：财富积累的黄金期，格局打开，贵人相助，是人生最重要的十年。",
    en: "Ages 31–40 major period: the golden phase of wealth accumulation. Your pattern opens up, benefactors aid you — the most important decade of your life.",
    tw: "31-40歲大限：財富積累的黃金期，格局打開，貴人相助，是人生最重要的十年。",
  },
  prime: {
    zh: "41-50岁大限：事业巅峰期，此时的你将真正进入属于自己的天地，收获丰盛。",
    en: "Ages 41–50 major period: the peak of your career. Now you truly come into your own domain and reap a bountiful harvest.",
    tw: "41-50歲大限：事業巔峰期，此時的你將真正進入屬於自己的天地，收穫豐盛。",
  },
};

// ===== 流年运势文案 =====
export const LIUNIAN_TEXTS: Record<"good" | "average" | "caution", L> = {
  good: {
    zh: "流年吉星汇聚，是冲锋陷阵的好时机，主动出击，好运自然来。",
    en: "Auspicious stars gather this year — a fine time to charge ahead. Take the initiative, and good fortune will follow.",
    tw: "流年吉星匯聚，是衝鋒陷陣的好時機，主動出擊，好運自然來。",
  },
  average: {
    zh: "流年平稳过渡，守成为主，积蓄能量，为下一个上升期做准备。",
    en: "A steady, transitional year — focus on consolidation. Store up energy and prepare for the next rising phase.",
    tw: "流年平穩過渡，守成為主，積蓄能量，為下一個上升期做準備。",
  },
  caution: {
    zh: "流年有化忌飞入，需谨慎行事，避免冲动决策，以守待攻为宜。",
    en: "A Hua-Ji transformation enters this year, so act with care. Avoid impulsive decisions and hold steady before advancing.",
    tw: "流年有化忌飛入，需謹慎行事，避免衝動決策，以守待攻為宜。",
  },
};
