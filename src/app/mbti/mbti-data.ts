// ===== MBTI x 星座碰撞数据库 =====

export const MBTI_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
] as const;

export type MBTIType = (typeof MBTI_TYPES)[number];

export const ZODIAC_SIGNS = [
  "白羊座", "金牛座", "双子座", "巨蟹座",
  "狮子座", "处女座", "天秤座", "天蝎座",
  "射手座", "摩羯座", "水瓶座", "双鱼座",
] as const;

export type ZodiacSign = (typeof ZODIAC_SIGNS)[number];

export interface MBTIZodiacProfile {
  title: string;          // 3-5字组合名称
  tagline: string;        // 一句梗文案（最具传播力）
  summary: string;        // 2-3句性格总结
  superpower: string;     // 超能力（最大优势）
  weakness: string;       // 致命弱点
  career: string;         // 事业关键词
  love: string;           // 爱情模式
  friendStyle: string;    // 社交/朋友风格
  lifeVibe: string;       // 人生气场
  icon: string;           // 代表emoji组合
  color: string;          // 主色
  gradient: { from: string; to: string };
  compatibleWith: string; // 最配的MBTI
  celebs: string[];       // 代表人物（可以是虚构角色）
  dailyMood: string;      // 每日OS（内心独白）
  dangerMode: string;     // 触发危险模式的条件
}

// MBTI 特征描述
const MBTI_TRAITS: Record<MBTIType, { core: string; shadow: string }> = {
  INTJ: { core: "战略大脑+孤狼执行者", shadow: "高冷到让人误以为在生气" },
  INTP: { core: "宇宙级思维系统+行动力断档", shadow: "想了100步，动了0步" },
  ENTJ: { core: "天生CEO+霸道总裁本总", shadow: "忘了问别人愿不愿意" },
  ENTP: { core: "辩论机器+搅局专家", shadow: "把辩赢当成人生目标" },
  INFJ: { core: "预言家+人间清醒", shadow: "把自己的标准当成宇宙定律" },
  INFP: { core: "内心戏宇宙+理想主义卫士", shadow: "活在自己的平行宇宙里" },
  ENFJ: { core: "精神领袖+道德护法", shadow: "感动自己感动得停不下来" },
  ENFP: { core: "热情炸弹+创意喷泉", shadow: "从点子到实现需要一个世纪" },
  ISTJ: { core: "可靠磐石+规则守护者", shadow: "对'变化'过敏" },
  ISFJ: { core: "温暖后盾+默默付出机器", shadow: "擅长把委屈咽回去" },
  ESTJ: { core: "效率机器+秩序建筑师", shadow: "认为自己的方法是唯一正解" },
  ESFJ: { core: "人际润滑剂+群体凝聚核", shadow: "他人评价是命门" },
  ISTP: { core: "冷静拆解大师+危机处理专家", shadow: "情感表达=无响应" },
  ISFP: { core: "艺术灵魂+当下主义者", shadow: "长期规划是什么？能吃吗？" },
  ESTP: { core: "行动优先+刺激猎人", shadow: "后果是留给明天的烦恼" },
  ESFP: { core: "派对灵魂+快乐制造机", shadow: "严肃话题是派对杀手" },
};

// 星座特征
const ZODIAC_TRAITS: Record<ZodiacSign, { core: string; drama: string; vibe: string }> = {
  白羊座: { core: "冲就完了", drama: "0.5秒失去耐心", vibe: "着火的能量球" },
  金牛座: { core: "稳如老狗直到逼急了", drama: "拖延到最后一秒爆发", vibe: "人间烟火守护者" },
  双子座: { core: "两个灵魂住一个身体", drama: "刚夸完你就说你坏话", vibe: "永动的话痨精灵" },
  巨蟹座: { core: "表面坚硬内心蟹蟹", drama: "把往事记得比本人还清楚", vibe: "移动的情感安全屋" },
  狮子座: { core: "天生自带舞台灯", drama: "没人关注就自己给自己鼓掌", vibe: "永远的主角光环" },
  处女座: { core: "细节狂魔+完美主义受害者", drama: "把别人的问题分析到量子层面", vibe: "高精密度的焦虑" },
  天秤座: { core: "选择困难星际冠军", drama: "用1小时决定吃什么", vibe: "优雅的纠结艺术" },
  天蝎座: { core: "冷静外表下藏着海底火山", drama: "表面无所谓，心里记小本本", vibe: "暗夜中的权力游戏" },
  射手座: { core: "自由是最高信仰", drama: "说走就走，回来也不解释", vibe: "宇宙级乐天派" },
  摩羯座: { core: "上班是最好的精神稳定剂", drama: "凌晨三点还在担心五年后的规划", vibe: "穿西装的山羊攀登者" },
  水瓶座: { core: "人类观察者+独立思想钉子户", drama: "觉得自己跟大家不一样，然后确实不一样", vibe: "来自未来的信号接收者" },
  双鱼座: { core: "共情宇宙+梦境居民", drama: "把别人随口一说记成深情告白", vibe: "漂浮在现实边缘的诗" },
};

// 生成组合档案
function buildProfile(mbti: MBTIType, zodiac: ZodiacSign): MBTIZodiacProfile {
  const m = MBTI_TRAITS[mbti];
  const z = ZODIAC_TRAITS[zodiac];

  // 颜色映射
  const colorMap: Record<MBTIType, { from: string; to: string; main: string }> = {
    INTJ: { from: "#1a1a2e", to: "#4a4e8c", main: "#6C7BFF" },
    INTP: { from: "#0d2137", to: "#1a6a8c", main: "#4A9ECA" },
    ENTJ: { from: "#2d0a00", to: "#8B2500", main: "#FF6B35" },
    ENTP: { from: "#1a0d00", to: "#8B5E00", main: "#FFA500" },
    INFJ: { from: "#1a0a2e", to: "#6B2D8B", main: "#9B59B6" },
    INFP: { from: "#0a1a2e", to: "#1a5a8c", main: "#5B8DD9" },
    ENFJ: { from: "#2e0a0a", to: "#8B2020", main: "#E74C3C" },
    ENFP: { from: "#2e1a00", to: "#8B5A00", main: "#E67E22" },
    ISTJ: { from: "#0a0a1a", to: "#2a2a4a", main: "#7F8C8D" },
    ISFJ: { from: "#0a1a0a", to: "#2a5a2a", main: "#27AE60" },
    ESTJ: { from: "#1a0a00", to: "#5a3000", main: "#C9A84C" },
    ESFJ: { from: "#2e0a18", to: "#8B1a4a", main: "#E91E8C" },
    ISTP: { from: "#0a0d0a", to: "#2a4a2a", main: "#58D68D" },
    ISFP: { from: "#1a0a18", to: "#5a2a5a", main: "#AF7AC5" },
    ESTP: { from: "#1a0800", to: "#6a2a00", main: "#E74C3C" },
    ESFP: { from: "#2a0a10", to: "#8a0a3a", main: "#FF69B4" },
  };

  const colors = colorMap[mbti];
  const zodiacEmojis: Record<ZodiacSign, string> = {
    白羊座: "♈", 金牛座: "♉", 双子座: "♊", 巨蟹座: "♋",
    狮子座: "♌", 处女座: "♍", 天秤座: "♎", 天蝎座: "♏",
    射手座: "♐", 摩羯座: "♑", 水瓶座: "♒", 双鱼座: "♓",
  };

  // 预设精选组合文案（特别有趣的组合有专属文案）
  const SPECIAL_COMBOS: Partial<Record<string, Partial<MBTIZodiacProfile>>> = {
    "INFP+天蝎座": {
      tagline: "表面冷酷杀手，内心戏多到能演甄嬛传的内耗王者",
      title: "宇宙内耗王",
      dailyMood: "没人理解我，但是我自己也不太理解我自己",
      dangerMode: "被人误解的那一秒，内心已经排演了三集复仇剧",
    },
    "ENFP+双子座": {
      tagline: "人间永动机，灵感多到充不完电但计划完成度感人",
      title: "混乱中二神",
      dailyMood: "我今天又有了一个绝世好想法！（上个绝世好想法在哪儿？不知道）",
    },
    "INTJ+摩羯座": {
      tagline: "人间冷面机器，但内心深处有一个精密的世界征服计划",
      title: "冷峻征服者",
      dailyMood: "效率就是一切，情绪是奢侈品",
    },
    "INFJ+双鱼座": {
      tagline: "你以为他在发呆，其实他已经看穿了你的三代命运",
      title: "神秘预言家",
      dailyMood: "感觉一切都有联系，但我说不清楚",
    },
    "ESTP+白羊座": {
      tagline: "活在0.1秒决策里，后果是什么留给明天的你处理",
      title: "肾上腺素狂人",
      dailyMood: "想做就做，想完再说！",
    },
    "ISFJ+巨蟹座": {
      tagline: "全人类的情感支柱，唯独忘了给自己充电",
      title: "温柔的情绪海",
      dailyMood: "我没事，你呢？你还好吗？",
    },
    "ENTP+水瓶座": {
      tagline: "在大家还没看懂规则时他已经开始改写规则了",
      title: "规则颠覆者",
      dailyMood: "这个世界运行逻辑不对，让我来修一修",
    },
    "ESFP+狮子座": {
      tagline: "全场焦点，永远发光，如果没人看着就自己找个舞台",
      title: "宇宙发光体",
      dailyMood: "哇今天的我也太好看了吧！！",
    },
  };

  const comboKey = `${mbti}+${zodiac}`;
  const special = SPECIAL_COMBOS[comboKey] ?? {};

  // 动态生成文案
  const title = special.title ?? `${zodiac.replace("座", "")}${mbti.slice(0, 2)}人`;
  const tagline = special.tagline ?? `${z.core}遇上${m.core}，结果是${z.vibe}穿越进了${m.shadow}`;

  const summaryTemplates = [
    `${mbti}的${m.core}，加上${zodiac}的${z.core}，形成了一种独特的气质：表面${z.vibe}，内里${m.core}。`,
    `从${mbti}那里继承了${m.core}，从${zodiac}那里学到了${z.core}，然后两者还会在某个时刻神奇地合并成一个爆点。`,
  ];

  return {
    title,
    tagline,
    summary: summaryTemplates[0]!,
    superpower: `${m.core.split("+")[0] ?? m.core} × ${z.core.split("，")[0] ?? z.core}`,
    weakness: `${m.shadow}，同时${z.drama}`,
    career: buildCareer(mbti, zodiac),
    love: buildLove(mbti, zodiac),
    friendStyle: buildFriendStyle(mbti, zodiac),
    lifeVibe: `${z.vibe} × ${m.core.split("+")[1] ?? m.core}`,
    icon: `${zodiacEmojis[zodiac]}✨`,
    color: colors.main,
    gradient: { from: colors.from, to: colors.to },
    compatibleWith: getCompatible(mbti),
    celebs: getCelebs(mbti, zodiac),
    dailyMood: special.dailyMood ?? `今天也是${z.core}，同时在内心上演了${m.shadow}`,
    dangerMode: special.dangerMode ?? `触发条件：${z.drama}+${m.shadow}同时激活`,
  };
}

function buildCareer(mbti: MBTIType, zodiac: ZodiacSign): string {
  const mbtiCareer: Record<MBTIType, string> = {
    INTJ: "战略规划·架构设计·研究", INTP: "理论研究·技术突破·哲学",
    ENTJ: "企业管理·创业·领导力", ENTP: "创业·产品·咨询顾问",
    INFJ: "心理咨询·教育·创作", INFP: "艺术创作·文学·公益",
    ENFJ: "教育·公关·NGO领导", ENFP: "创意营销·表演·公益创业",
    ISTJ: "金融审计·法律·工程", ISFJ: "医护·社工·行政支持",
    ESTJ: "项目管理·行政·军警", ESFJ: "公关·人力资源·服务业",
    ISTP: "工程技术·运动·侦查", ISFP: "设计·音乐·手工艺",
    ESTP: "销售·创业·运动竞技", ESFP: "表演·活动策划·服务",
  };
  const zodiacBonus: Record<ZodiacSign, string> = {
    白羊座: "创业·运动", 金牛座: "金融·美食", 双子座: "媒体·销售",
    巨蟹座: "家居·餐饮", 狮子座: "娱乐·管理", 处女座: "分析·医疗",
    天秤座: "法律·设计", 天蝎座: "侦查·心理", 射手座: "旅游·教育",
    摩羯座: "金融·政务", 水瓶座: "科技·公益", 双鱼座: "艺术·医护",
  };
  return `${mbtiCareer[mbti]} + ${zodiacBonus[zodiac]}`;
}

function buildLove(mbti: MBTIType, zodiac: ZodiacSign): string {
  const loveMap: Record<MBTIType, string> = {
    INTJ: "需要大量独处时间充电，爱得深但表达方式像发邮件",
    INTP: "陷入爱情但会分析爱情本身是不是合理的",
    ENTJ: "主动追求但要对方配得上他的眼光",
    ENTP: "用辩论调情，喜欢智识对等的伴侣",
    INFJ: "慢热深情，一旦确认就是走一辈子那种",
    INFP: "在脑内把对方构建成完美情人，现实容易让他们失望",
    ENFJ: "全力付出型，但偶尔忘了自己也需要被照顾",
    ENFP: "热情地爱上一个人，然后热情地爱上下一种可能",
    ISTJ: "忠诚稳定，但不擅长浪漫表达，爱你的方式是帮你报税",
    ISFJ: "照顾对方无微不至，委屈了才会默默哭",
    ESTJ: "用行动表爱，会给你计划好人生路线图",
    ESFJ: "为爱倾尽所有，但需要对方频繁确认爱你",
    ISTP: "爱你的时候会修好你家的门，但说不出我爱你",
    ISFP: "感性而随性，爱你的方式像一首即兴诗",
    ESTP: "激情派，活在当下，不确定明天还会不会在",
    ESFP: "把爱变成派对，每天都要庆祝一下两个人在一起",
  };
  const zodiacLove: Record<ZodiacSign, string> = {
    白羊座: "爱得直接，不爱也直接，速燃速灭",
    金牛座: "慢热但一旦爱了就是你的小金库加安全感",
    双子座: "两种面目的爱，你爱的那个随时可能换频道",
    巨蟹座: "依赖到极致，记仇也到极致",
    狮子座: "需要被崇拜，给你全世界但你要给他舞台",
    处女座: "把挑剔当做在乎，完美主义爱人",
    天秤座: "优雅地纠结，爱得像一场美学展览",
    天蝎座: "爱得深不见底，嫉妒心是衡量爱的单位",
    射手座: "爱你但也爱自由，两者都不想放弃",
    摩羯座: "用成就证明爱，带你走向更好生活",
    水瓶座: "爱你但拒绝被定义，最好的友人+伴侣",
    双鱼座: "活在情感的海洋里，把你当成世界中心",
  };
  return `${loveMap[mbti]}。${zodiacLove[zodiac]}`;
}

function buildFriendStyle(mbti: MBTIType, _zodiac: ZodiacSign): string {
  const friendMap: Record<MBTIType, string> = {
    INTJ: "深度玩家，朋友不多但个个是真朋友",
    INTP: "跟你讨论宇宙本质，但忘了回你消息",
    ENTJ: "你的人脉网络管理员+职业顾问",
    ENTP: "把友情变成辩论俱乐部，让你的脑子永远在线",
    INFJ: "你的灵魂伴侣，能听见你没说出口的话",
    INFP: "在内心深处把你当成很重要的人，但说不出口",
    ENFJ: "朋友圈的精神领袖，随时准备开导你",
    ENFP: "永远是派对里最亮的那个，带你去认识世界",
    ISTJ: "可靠到无聊，但关键时刻从不缺席",
    ISFJ: "默默记住你喜欢什么，在你需要时出现",
    ESTJ: "朋友圈的时间管理大师，帮你把生活变高效",
    ESFJ: "群聊的热心班长，每个人的生日都记得",
    ISTP: "不废话，但遇到事他帮你搞定了再告诉你",
    ISFP: "温柔地在你身边，不评判，只陪伴",
    ESTP: "带你玩你没玩过的，让人生没有遗憾",
    ESFP: "快乐制造机，跟他在一起你没办法不开心",
  };
  return friendMap[mbti]!;
}

function getCompatible(mbti: MBTIType): string {
  const compatMap: Record<MBTIType, string> = {
    INTJ: "ENFP / ENTP", INTP: "ENTJ / ENFJ",
    ENTJ: "INTP / INFP", ENTP: "INTJ / INFJ",
    INFJ: "ENTP / ENFP", INFP: "ENTJ / ENFJ",
    ENFJ: "INFP / ISFP", ENFP: "INTJ / INFJ",
    ISTJ: "ESFP / ESTP", ISFJ: "ESFP / ESTP",
    ESTJ: "ISFP / INFP", ESFJ: "ISFP / INFP",
    ISTP: "ESFJ / ESTJ", ISFP: "ENFJ / ESTJ",
    ESTP: "ISFJ / ISTJ", ESFP: "ISTJ / ISFJ",
  };
  return compatMap[mbti];
}

function getCelebs(mbti: MBTIType, zodiac: ZodiacSign): string[] {
  const mbtiCelebs: Record<MBTIType, string[]> = {
    INTJ: ["蝙蝠侠", "赫敏·格兰杰", "马斯克"],
    INTP: ["爱因斯坦", "比尔·盖茨", "L（Death Note）"],
    ENTJ: ["张无忌（反向）", "乔布斯", "纳粹（反向）"],
    ENTP: ["托尼·斯塔克", "小罗伯特·唐尼", "马克·吐温"],
    INFJ: ["甘地", "阿尔弗雷德（蝙蝠侠）", "艾丽丝·门罗"],
    INFP: ["村上春树", "莎士比亚", "弗罗多·巴金斯"],
    ENFJ: ["奥巴马", "邓布利多", "弗兰克林·罗斯福"],
    ENFP: ["宫崎骏", "安·弗兰克", "阿拉丁"],
    ISTJ: ["维多利亚女王", "赫敏的父母", "斯波克"],
    ISFJ: ["特蕾莎修女", "约翰·华生", "金帅"],
    ESTJ: ["普鲁士腓特烈大帝", "张朝阳", "山本五十六"],
    ESFJ: ["泰勒·斯威夫特", "詹妮弗·洛佩兹"],
    ISTP: ["克林特·伊斯特伍德", "克拉图斯", "布鲁斯·李"],
    ISFP: ["奥黛丽·赫本", "拉迪，法国浪漫主义"],
    ESTP: ["詹姆斯·邦德", "杰克·斯派罗船长"],
    ESFP: ["玛丽莲·梦露", "贾斯汀·汀布莱克"],
  };
  const zodiacCelebs: Record<ZodiacSign, string[]> = {
    白羊座: ["成龙", "Lady Gaga"], 金牛座: ["吴亦凡（别学）", "释迦牟尼"],
    双子座: ["卡尼耶·韦斯特", "梦露"], 巨蟹座: ["黛安娜王妃", "梅西"],
    狮子座: ["拿破仑", "奥巴马"], 处女座: ["迈克尔·杰克逊", "孔子"],
    天秤座: ["甘地", "基努·里维斯"], 天蝎座: ["比尔·盖茨", "希特勒（别学）"],
    射手座: ["布拉德·彼特", "斯威夫特"], 摩羯座: ["毛泽东", "贝索斯"],
    水瓶座: ["爱迪生", "达尔文"], 双鱼座: ["爱因斯坦", "乔布斯（本命）"],
  };
  return [...(mbtiCelebs[mbti].slice(0, 1)), ...(zodiacCelebs[zodiac].slice(0, 1))];
}

export function getMBTIZodiacProfile(mbti: MBTIType, zodiac: ZodiacSign): MBTIZodiacProfile {
  return buildProfile(mbti, zodiac);
}
