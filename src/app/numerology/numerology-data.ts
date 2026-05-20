// ===== 生命灵数数据库 =====
// 涵盖 1-9 基础数 + 11、22、33 卓越数（Master Numbers）

export type LifeNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11 | 22 | 33;

export interface NumerologyProfile {
  number: LifeNumber;
  name: string;
  title: string;
  element: string;
  planet: string;
  color: string;
  colorHex: string;
  secondaryColorHex: string;
  symbol: string;
  emoji: string;
  isMaster: boolean;

  // 一句话总结
  tagline: string;

  // 性格特质
  traits: string[];

  // 正向特质描述
  positiveTraits: {
    title: string;
    description: string;
  }[];

  // 挑战面
  challenges: {
    title: string;
    description: string;
  }[];

  // 潜能天赋
  gifts: {
    title: string;
    description: string;
    icon: string;
  }[];

  // 人生课题
  lifeLessons: {
    title: string;
    description: string;
  }[];

  // 适合方向
  careerPaths: string[];

  // 感情观
  loveInsight: string;

  // 今年建议（通用）
  yearAdvice: string;

  // 幸运信息
  luckyNumber: number[];
  luckyColor: string;
  luckyDay: string;
  luckyGem: string;

  // 灵性洞见
  spiritualMessage: string;

  // 名人代表
  celebrities: string[];
}

export const NUMEROLOGY_DATA: Record<LifeNumber, NumerologyProfile> = {
  1: {
    number: 1,
    name: "领袖者",
    title: "命运数字 · 一",
    element: "火",
    planet: "太阳",
    color: "金红",
    colorHex: "#E85D04",
    secondaryColorHex: "#F48C06",
    symbol: "☀",
    emoji: "🔥",
    isMaster: false,
    tagline: "你天生是开拓者，第一个踏入未知领域的人",
    traits: ["独立", "领导力", "创造力", "自信", "先驱", "果断", "意志力"],
    positiveTraits: [
      {
        title: "天生领袖",
        description: "你具有强大的领导能量，能够在混沌中找到方向，带领他人走向目标。你的自信与魄力让人信服，天生适合站在最前面。",
      },
      {
        title: "创新先锋",
        description: "你不喜欢走别人走过的路，总是渴望开创新局面。独特的视角和大胆的想法是你最宝贵的财富。",
      },
      {
        title: "坚韧意志",
        description: "一旦认定目标，你会以惊人的专注和毅力去实现它。挫折对你来说不过是磨砺意志的试炼。",
      },
    ],
    challenges: [
      {
        title: "过于固执",
        description: "强烈的自主意识有时会让你听不进他人意见，容易走入孤军奋战的困境。学会倾听是你的成长关键。",
      },
      {
        title: "忽视协作",
        description: "你习惯单打独斗，但真正的成就往往需要团队的力量。练习信任他人，你的领域将无限延伸。",
      },
    ],
    gifts: [
      { title: "领导力", description: "天生的指挥官，能在关键时刻挺身而出", icon: "👑" },
      { title: "开创性思维", description: "突破常规，看见别人看不见的可能性", icon: "💡" },
      { title: "执行力", description: "想到就做，行动力超群，能把想法变为现实", icon: "⚡" },
    ],
    lifeLessons: [
      {
        title: "学会谦逊",
        description: "真正的强大不是凌驾于他人之上，而是在服务中体现领导价值。放下自我，才能吸引更大的能量。",
      },
      {
        title: "接纳脆弱",
        description: "你习惯表现强大，但允许自己偶尔示弱，才能建立更深厚的人际联结。",
      },
    ],
    careerPaths: ["企业家", "CEO", "政治家", "探险家", "发明家", "军事将领", "创意总监"],
    loveInsight: "你在爱情中同样渴望主导，需要一个能欣赏你的独立、同时给你空间的伴侣。学会在感情中适度退让，才能遇见真正的灵魂伴侣。",
    yearAdvice: "这是展现你才华的黄金时期。大胆追求你真正想要的，不要因为害怕失败而止步不前。你的独特性就是你最大的竞争力。",
    luckyNumber: [1, 10, 19],
    luckyColor: "金红色、橙色",
    luckyDay: "周日",
    luckyGem: "红宝石",
    spiritualMessage: "你是宇宙能量的起点。每一个伟大的故事，都从勇敢说'我来'那一刻开始。",
    celebrities: ["史蒂夫·乔布斯", "玛丽·居里", "马丁·路德·金"],
  },

  2: {
    number: 2,
    name: "调和者",
    title: "命运数字 · 二",
    element: "水",
    planet: "月亮",
    color: "银白",
    colorHex: "#4A90D9",
    secondaryColorHex: "#7EB8F7",
    symbol: "☽",
    emoji: "🌙",
    isMaster: false,
    tagline: "你是世界的桥梁，用爱与温柔让对立变为和谐",
    traits: ["敏感", "直觉", "协调", "温柔", "耐心", "外交", "合作"],
    positiveTraits: [
      {
        title: "高度共情",
        description: "你拥有超强的感知能力，能感受到他人内心深处的情绪，这让你成为天生的聆听者与治愈者。",
      },
      {
        title: "外交天才",
        description: "你善于找到双方的共同点，用柔软的方式化解矛盾。在你身边，紧张的关系会悄悄松弛。",
      },
      {
        title: "细腻直觉",
        description: "你的第六感异常准确，常常能在逻辑之前感知到真相。相信你的内心，它从不欺骗你。",
      },
    ],
    challenges: [
      {
        title: "过度付出",
        description: "你太善于照顾别人，以至于常常忘记照顾自己。学会设定边界，不是自私，而是自爱。",
      },
      {
        title: "优柔寡断",
        description: "总是顾虑他人感受，让你在做决定时容易犹豫。有时候，快速做出选择比完美选择更重要。",
      },
    ],
    gifts: [
      { title: "感知力", description: "能感受到言语之下的情绪，读懂未说出口的话", icon: "🌊" },
      { title: "调和力", description: "天生的和平使者，能让不同的人走向一致", icon: "☯️" },
      { title: "艺术感", description: "对美、韵律、和谐有天然的感受力", icon: "🎨" },
    ],
    lifeLessons: [
      {
        title: "建立自我价值感",
        description: "你的价值不依赖于他人的认可。学会独立地爱自己，你才能给出真正无条件的爱。",
      },
      {
        title: "学会说不",
        description: "拒绝不会破坏关系，真正尊重你的人不需要你委屈自己。",
      },
    ],
    careerPaths: ["心理咨询师", "外交官", "音乐家", "社会工作者", "护士", "人力资源", "调解人"],
    loveInsight: "你是天生的恋人，给予爱的方式深情而细腻。但要警惕在关系中失去自我——爱人的前提是先爱好自己。",
    yearAdvice: "深化重要的关系，放慢脚步倾听内心的声音。你不需要大声宣告，你的温柔力量自然会吸引对的人与事。",
    luckyNumber: [2, 11, 20],
    luckyColor: "银色、浅蓝色",
    luckyDay: "周一",
    luckyGem: "珍珠、月光石",
    spiritualMessage: "世界因你的温柔而变得更温暖。记住：你的敏感是天赋，不是弱点。",
    celebrities: ["比尔·盖茨", "奥巴马夫人米歇尔", "戴安娜王妃"],
  },

  3: {
    number: 3,
    name: "创造者",
    title: "命运数字 · 三",
    element: "风",
    planet: "木星",
    color: "明黄",
    colorHex: "#F59E0B",
    secondaryColorHex: "#FCD34D",
    symbol: "△",
    emoji: "✨",
    isMaster: false,
    tagline: "你是宇宙的艺术家，用创意与喜悦点亮每一个生命",
    traits: ["创意", "表达力", "乐观", "幽默", "社交", "艺术性", "灵感"],
    positiveTraits: [
      {
        title: "天赋表达者",
        description: "无论是语言、文字、音乐还是艺术，你都能找到独特的方式表达自我。你的创造力是永不枯竭的源泉。",
      },
      {
        title: "天生乐观",
        description: "你的笑容和积极态度具有感染力，能瞬间驱散阴霾。走到哪里，你都是最亮眼的那束光。",
      },
      {
        title: "社交达人",
        description: "你天生擅长与人连接，轻松建立关系，能在任何场合如鱼得水，让所有人感到轻松愉快。",
      },
    ],
    challenges: [
      {
        title: "注意力分散",
        description: "你的兴趣太广泛，常常半途而废。找到一个真正热爱的领域深耕，你的才华才能充分绽放。",
      },
      {
        title: "逃避现实",
        description: "面对压力时，你倾向于用玩笑或回避来掩盖内心的不安。学会正视情绪，是成熟的第一步。",
      },
    ],
    gifts: [
      { title: "创造力", description: "想象力丰富，能从零创造出令人惊叹的作品", icon: "🎭" },
      { title: "沟通力", description: "用词精准有趣，能让复杂的事情变得简单生动", icon: "💬" },
      { title: "感染力", description: "你的热情能点燃周围人的激情与动力", icon: "🌟" },
    ],
    lifeLessons: [
      {
        title: "深耕而非广撒",
        description: "把你无限的创意聚焦于一处，成就将远超你的想象。",
      },
      {
        title: "勇于展示真实自我",
        description: "在欢笑的面具之下，你也有脆弱与深刻。让真实的你被看见，才能遇到真正懂你的人。",
      },
    ],
    careerPaths: ["作家", "演员", "设计师", "喜剧人", "教师", "营销人员", "公关"],
    loveInsight: "你的爱情充满趣味和浪漫，但要警惕用表面的欢乐掩盖真实的感情需求。深度与趣味并存，才是你最美的爱情。",
    yearAdvice: "让你的创意自由流淌！这是表达自我、建立个人品牌的最佳时机。不要因为别人的眼光而收起你的光芒。",
    luckyNumber: [3, 12, 21],
    luckyColor: "黄色、橙色",
    luckyDay: "周四",
    luckyGem: "黄水晶",
    spiritualMessage: "你是宇宙的笑声，存在本身就是礼物。用你的创意，让这个世界多一点美好。",
    celebrities: ["查理·卓别林", "大卫·鲍伊", "宋慧乔"],
  },

  4: {
    number: 4,
    name: "建造者",
    title: "命运数字 · 四",
    element: "土",
    planet: "天王星",
    color: "大地棕",
    colorHex: "#6B5B45",
    secondaryColorHex: "#A0896B",
    symbol: "□",
    emoji: "🏛️",
    isMaster: false,
    tagline: "你是文明的基石，用双手与毅力将梦想化为坚实的现实",
    traits: ["踏实", "组织力", "忠诚", "实际", "耐心", "系统性", "责任感"],
    positiveTraits: [
      {
        title: "卓越执行力",
        description: "你是天生的建造者，能把混乱的想法变成有序的计划，并一步一步落地实现。成功对你来说是必然，只需时间。",
      },
      {
        title: "无比可靠",
        description: "你言出必行，是朋友和同事眼中最可靠的那个人。你的稳定和忠诚是稀缺的品质。",
      },
      {
        title: "系统化思维",
        description: "你擅长建立体系，优化流程。在你的管理下，任何混乱都会变得井井有条。",
      },
    ],
    challenges: [
      {
        title: "过于固执保守",
        description: "你对变化和风险有天然的抗拒，这可能让你错失新的机遇。适度拥抱不确定性，是你突破的关键。",
      },
      {
        title: "工作狂倾向",
        description: "你把工作和责任置于一切之上，容易忽略休息和娱乐。记住，人生不只有工作。",
      },
    ],
    gifts: [
      { title: "组织力", description: "将复杂事务化为清晰步骤，效率超群", icon: "📐" },
      { title: "耐力", description: "能够长期坚持，不达目标誓不罢休", icon: "⚙️" },
      { title: "专注力", description: "进入工作状态后，几乎无法被干扰", icon: "🎯" },
    ],
    lifeLessons: [
      {
        title: "学会灵活变通",
        description: "规则和计划是工具，不是枷锁。学会在必要时调整方向，是智慧的体现。",
      },
      {
        title: "允许自己享乐",
        description: "你工作了这么努力，值得好好犒赏自己。生命中除了责任，还有许多美好值得品味。",
      },
    ],
    careerPaths: ["工程师", "建筑师", "项目经理", "会计", "律师", "科学家", "程序员"],
    loveInsight: "你在爱情中稳定而忠实，但有时过于实际而缺少浪漫。试着在偶尔为伴侣制造一点惊喜——这会让感情更有温度。",
    yearAdvice: "你播下的种子即将结果。继续保持踏实努力，但也要让自己的付出被看见。不要总是默默承担，适时表达需求。",
    luckyNumber: [4, 13, 22],
    luckyColor: "绿色、棕色",
    luckyDay: "周六",
    luckyGem: "翡翠",
    spiritualMessage: "你是大地的力量。每一块基石的放置，都是对这个世界的贡献。",
    celebrities: ["比尔·盖茨", "阿诺德·施瓦辛格", "拿破仑"],
  },

  5: {
    number: 5,
    name: "自由者",
    title: "命运数字 · 五",
    element: "风",
    planet: "水星",
    color: "天空蓝",
    colorHex: "#0EA5E9",
    secondaryColorHex: "#38BDF8",
    symbol: "⚡",
    emoji: "🌪️",
    isMaster: false,
    tagline: "你是风的化身，自由、变化与探索是你永恒的主题",
    traits: ["自由", "冒险", "适应力", "多才多艺", "好奇心", "变通", "活力"],
    positiveTraits: [
      {
        title: "无限适应力",
        description: "变化对别人来说是威胁，对你来说是礼物。你能在任何环境中快速适应，找到新的可能性。",
      },
      {
        title: "天生探险家",
        description: "你对世界充满好奇，渴望体验不同的文化、思想和生活方式。你的人生故事永远比别人精彩。",
      },
      {
        title: "多面才华",
        description: "你学什么都快，兴趣广泛，能轻松驾驭多个领域。这种多才多艺是你独特的竞争优势。",
      },
    ],
    challenges: [
      {
        title: "缺乏持续性",
        description: "你很快对新事物厌倦，常在关键时刻放弃。找到真正点燃你热情的事，然后坚持下去。",
      },
      {
        title: "逃避承诺",
        description: "对自由的渴望有时让你对关系和责任产生恐惧。学会在自由与联结之间找到平衡。",
      },
    ],
    gifts: [
      { title: "适应力", description: "在任何环境中都能找到自己的位置", icon: "🌊" },
      { title: "沟通力", description: "善于与不同背景的人建立连接", icon: "🗣️" },
      { title: "创新思维", description: "不受传统束缚，能看到别人看不到的解决方案", icon: "🔭" },
    ],
    lifeLessons: [
      {
        title: "在自由中寻找深度",
        description: "真正的自由不是逃离，而是带着觉知去选择。深化某段关系或某个领域，反而会给你带来更深的自由感。",
      },
      {
        title: "学会负责任",
        description: "承担责任不会剥夺你的自由，反而会给你带来真正的尊重和信任。",
      },
    ],
    careerPaths: ["旅行作家", "记者", "销售", "演员", "外交官", "导游", "自由职业"],
    loveInsight: "你在爱情中需要充足的个人空间，找一个理解你天性的伴侣至关重要。当你真正遇到心灵契合的人，你会愿意为Ta放慢脚步。",
    yearAdvice: "这是扩展视野的最佳时机，去旅行，学新技能，认识新朋友！同时也是时候完成一件长期搁置的事情了。",
    luckyNumber: [5, 14, 23],
    luckyColor: "蓝色、青绿色",
    luckyDay: "周三",
    luckyGem: "绿松石",
    spiritualMessage: "你是生命中风的低语，提醒人们：改变，是通往新生的唯一之路。",
    celebrities: ["麦当娜", "文森特·梵高", "泰勒·斯威夫特"],
  },

  6: {
    number: 6,
    name: "养育者",
    title: "命运数字 · 六",
    element: "土",
    planet: "金星",
    color: "玫瑰粉",
    colorHex: "#EC4899",
    secondaryColorHex: "#F9A8D4",
    symbol: "♡",
    emoji: "🌹",
    isMaster: false,
    tagline: "你是爱与美的使者，用温暖与责任守护世间一切珍贵之物",
    traits: ["责任感", "爱心", "治愈", "美感", "和谐", "守护", "服务"],
    positiveTraits: [
      {
        title: "天生守护者",
        description: "你天生渴望照顾和保护他人，对家人和朋友的付出不计代价。你的爱是最无私、最真实的。",
      },
      {
        title: "和谐创造者",
        description: "你有极强的审美能力和对美的感知，能将身边的环境打造成和谐美好的样子。",
      },
      {
        title: "感情深厚",
        description: "你的感情世界极为丰富，爱得认真，也爱得深沉。在你身边的人，都能感受到被真心珍视的温暖。",
      },
    ],
    challenges: [
      {
        title: "过度干涉",
        description: "你的好意有时会演变成过度控制，给被你爱的人带来压力。学会放手，信任对方能照顾好自己。",
      },
      {
        title: "自我牺牲",
        description: "你把别人的需求永远放在自己之前，久而久之会产生怨气。记住，先爱好自己，才能更好地爱他人。",
      },
    ],
    gifts: [
      { title: "治愈力", description: "你的存在本身就能给人带来安慰与温暖", icon: "💗" },
      { title: "美学天赋", description: "对色彩、形式、和谐有超敏锐的感知", icon: "🎨" },
      { title: "责任心", description: "勇于承担，可以托付重任", icon: "🛡️" },
    ],
    lifeLessons: [
      {
        title: "爱自己是一切的根基",
        description: "你如此善于爱别人，但请把同等的爱给自己。你的需求同样重要。",
      },
      {
        title: "区分关爱与控制",
        description: "真正的爱是给对方自由选择的权利，而不是按照你理想的方式去爱他。",
      },
    ],
    careerPaths: ["医生", "护士", "教师", "心理治疗师", "室内设计师", "厨师", "社会工作者"],
    loveInsight: "你是最完美的伴侣，付出全部，但也需要被同等珍视。别害怕说出你的需求——你值得被好好爱着。",
    yearAdvice: "关注你最重要的关系，投入真心去维护。同时也是时候在美与创意方面发展副业了，你的品味是独一无二的财富。",
    luckyNumber: [6, 15, 24],
    luckyColor: "玫瑰红、粉色",
    luckyDay: "周五",
    luckyGem: "粉水晶",
    spiritualMessage: "爱是宇宙最强大的力量，而你是它在地球上最美丽的通道。",
    celebrities: ["特蕾莎修女", "约翰·列侬", "梅丽尔·斯特里普"],
  },

  7: {
    number: 7,
    name: "求知者",
    title: "命运数字 · 七",
    element: "水",
    planet: "海王星",
    color: "深紫",
    colorHex: "#7C3AED",
    secondaryColorHex: "#A78BFA",
    symbol: "☆",
    emoji: "🔮",
    isMaster: false,
    tagline: "你是宇宙的探索者，在神秘与智慧之间寻找生命的终极答案",
    traits: ["智慧", "直觉", "深度", "神秘", "内省", "分析力", "灵性"],
    positiveTraits: [
      {
        title: "深邃智者",
        description: "你对事物的理解总是超越表面，能看见别人看不见的层次。你的思维深度是你最珍贵的天赋。",
      },
      {
        title: "灵性感知",
        description: "你与宇宙的神秘力量有天然的连接，对灵性、哲学、形而上学有强烈的兴趣和直觉。",
      },
      {
        title: "独立思考",
        description: "你不随波逐流，善于独立研究，追求真相。你的分析能力让你总能找到被人忽视的真相。",
      },
    ],
    challenges: [
      {
        title: "过度孤立",
        description: "你享受独处，但有时会把自己封闭得太深，让他人难以接近。偶尔走出内心的城堡，与世界连接。",
      },
      {
        title: "过度分析",
        description: "你的分析能力有时会过度运转，陷入无休止的思考而无法行动。相信直觉，先行动再完善。",
      },
    ],
    gifts: [
      { title: "洞察力", description: "看穿表象，直达事物的本质", icon: "👁️" },
      { title: "研究力", description: "能长时间深入钻研一个课题", icon: "📚" },
      { title: "直觉", description: "感知超越感官，与更高维度的智慧相连", icon: "✨" },
    ],
    lifeLessons: [
      {
        title: "在独处与连接间取得平衡",
        description: "孤独滋养你，但关系也能让你成长。让他人进入你的世界，你会发现更多维度的自己。",
      },
      {
        title: "信任而非控制",
        description: "你对真相的渴望有时演变为对一切的质疑。学会在某些事上放手，接受生命的神秘本质。",
      },
    ],
    careerPaths: ["哲学家", "科学家", "心理分析师", "神秘学研究者", "作家", "侦探", "程序员"],
    loveInsight: "你在爱情中需要深度的精神连接，肤浅的关系无法满足你。遇到能和你一起探索宇宙奥秘的灵魂伴侣，才是你的真爱。",
    yearAdvice: "深化你的专业知识，写下你的洞见。你长期积累的智慧，在这个时期会得到意想不到的认可。",
    luckyNumber: [7, 16, 25],
    luckyColor: "紫色、靛蓝",
    luckyDay: "周一",
    luckyGem: "紫水晶",
    spiritualMessage: "宇宙选择了你作为真理的守护者。你的探寻，是对人类智慧最深刻的贡献。",
    celebrities: ["爱因斯坦", "尼古拉·特斯拉", "卡尔·荣格"],
  },

  8: {
    number: 8,
    name: "权力者",
    title: "命运数字 · 八",
    element: "土",
    planet: "土星",
    color: "帝王金",
    colorHex: "#B45309",
    secondaryColorHex: "#D97706",
    symbol: "∞",
    emoji: "💎",
    isMaster: false,
    tagline: "你天生与财富和权力共鸣，是驾驭物质世界的命运使者",
    traits: ["权力", "财富", "野心", "效率", "魄力", "策略", "自律"],
    positiveTraits: [
      {
        title: "天生商业头脑",
        description: "你对资源、权力和财富有天然的感知与驾驭能力，能在商业世界中游刃有余，创造价值。",
      },
      {
        title: "战略眼光",
        description: "你能从全局出发，制定长远规划。你不只是看眼前，而是看三步、五步之后的棋局。",
      },
      {
        title: "强大执行力",
        description: "目标一旦确定，你会以雷厉风行的方式推进。高效、自律、专注，是你的行动标签。",
      },
    ],
    challenges: [
      {
        title: "过于物质化",
        description: "对成功和财富的渴望有时会让你忽视精神和情感的需求。提醒自己，内心的富足同样重要。",
      },
      {
        title: "控制欲过强",
        description: "你习惯掌控一切，但没有人喜欢被控制。学会授权，你会发现更大的力量来自信任。",
      },
    ],
    gifts: [
      { title: "财富力", description: "天生具有积累和管理财富的才能", icon: "💰" },
      { title: "领导力", description: "强大的气场，自然聚集能量和资源", icon: "🏆" },
      { title: "战略力", description: "看清全局，能做出最优的决策", icon: "♟️" },
    ],
    lifeLessons: [
      {
        title: "权力服务于爱",
        description: "你被赋予影响力，是为了服务更大的善。把你的成功用来创造更多价值，而非彰显地位。",
      },
      {
        title: "放下对控制的执念",
        description: "有些事情的发展超出你的掌控，那并不是失败，而是宇宙的安排。",
      },
    ],
    careerPaths: ["企业家", "投资人", "CEO", "律师", "政治家", "银行家", "地产大亨"],
    loveInsight: "你在爱情中同样追求掌控感，但真正的亲密需要脆弱和平等。找一个能让你放下铠甲的人，才是真正的缘分。",
    yearAdvice: "你的努力即将带来丰厚的回报，继续保持专注。同时也要注意，不要让对成功的追求让你错过身边重要的人。",
    luckyNumber: [8, 17, 26],
    luckyColor: "金色、黑色",
    luckyDay: "周六",
    luckyGem: "黄金、钻石",
    spiritualMessage: "财富是流动的能量，你的使命是让它在世界中创造更多美好。",
    celebrities: ["罗伯特·德尼罗", "马云", "卡迪·B"],
  },

  9: {
    number: 9,
    name: "智慧者",
    title: "命运数字 · 九",
    element: "火",
    planet: "火星",
    color: "深红紫",
    colorHex: "#BE123C",
    secondaryColorHex: "#FB7185",
    symbol: "☿",
    emoji: "🌌",
    isMaster: false,
    tagline: "你是古老灵魂的归处，用大爱与智慧完成生命的终极圆满",
    traits: ["博爱", "智慧", "慈悲", "艺术性", "理想主义", "宽容", "超越"],
    positiveTraits: [
      {
        title: "大爱之心",
        description: "你的爱超越个人的边界，流向所有生命。你天生具有对人类处境的深切关怀，这是少数人才有的境界。",
      },
      {
        title: "古老智慧",
        description: "你的灵魂携带着许多世代积累的智慧，总能在关键时刻说出直击人心的话语，给予他人深刻的启示。",
      },
      {
        title: "超强包容力",
        description: "你能理解不同的价值观和生活方式，很少评判他人。这种宽容让你成为所有人都愿意倾诉的对象。",
      },
    ],
    challenges: [
      {
        title: "难以割舍",
        description: "你的人生课题之一就是学会放下。无论是关系、物品还是过去的执念，放手才能迎来新生。",
      },
      {
        title: "理想主义陷阱",
        description: "你对世界的期待过于完美，现实的落差常让你失望。接纳不完美，也是一种深刻的智慧。",
      },
    ],
    gifts: [
      { title: "慈悲心", description: "对一切生命都能感同身受，是天生的精神领袖", icon: "☯️" },
      { title: "艺术天赋", description: "深刻的灵魂创造深刻的艺术，你的作品能触动人心", icon: "🎭" },
      { title: "超越性思维", description: "能从更高的维度看问题，超越个人利益", icon: "🌟" },
    ],
    lifeLessons: [
      {
        title: "放下执着，迎接新生",
        description: "9 是数字循环的终点，也是新开始的前夕。学会完整地结束，才能完整地开始。",
      },
      {
        title: "在奉献中保护自己",
        description: "你为这个世界给予太多，但要确保你的付出来自内心的充盈，而非空耗自我。",
      },
    ],
    careerPaths: ["慈善家", "灵性导师", "艺术家", "哲学家", "医生", "教育家", "作家"],
    loveInsight: "你的爱广博而深沉，但你同样需要找到一个理解你宏大内心的人。不要把对世界的爱全部给出去，留一部分给自己和最亲近的人。",
    yearAdvice: "这是一个清理与完结的时期，结束不再服务于你的关系、工作或习惯。每一次清空，都是为了迎接更美好的新循环。",
    luckyNumber: [9, 18, 27],
    luckyColor: "深红色、紫色",
    luckyDay: "周二",
    luckyGem: "石榴石",
    spiritualMessage: "你是9个数字中最接近宇宙本源的灵魂。放下，是你给自己最大的礼物。",
    celebrities: ["甘地", "达·芬奇", "马丁·路德·金"],
  },

  11: {
    number: 11,
    name: "启示者",
    title: "卓越数字 · 十一",
    element: "风+火",
    planet: "月亮+太阳",
    color: "银光",
    colorHex: "#818CF8",
    secondaryColorHex: "#C7D2FE",
    symbol: "∥",
    emoji: "⚡",
    isMaster: true,
    tagline: "你是光的使者，携带高频振动降生，以直觉与灵感照亮世界",
    traits: ["直觉", "灵感", "灵性", "感知", "启示", "理想主义", "高敏感"],
    positiveTraits: [
      {
        title: "超凡直觉",
        description: "11 被称为'直觉大师'，你的感知能力超越普通人的范畴，常能在事情发生前就感知到。你的直觉就是你最精准的罗盘。",
      },
      {
        title: "灵性导师",
        description: "你来到这个世界是为了传递更高的智慧与灵感。你的话语、作品或仅仅是你的存在，都能深刻影响他人。",
      },
      {
        title: "梦想家",
        description: "你能看见他人难以想象的未来愿景，并有能力将其传递给世界，点燃集体的梦想。",
      },
    ],
    challenges: [
      {
        title: "过度紧张与焦虑",
        description: "11 的高频振动使你比常人更敏感，也更容易承受能量的冲击。学习接地气的方法，如冥想、自然接触，能帮助你稳定能量。",
      },
      {
        title: "完美主义",
        description: "你对自己和使命有极高的期待，稍有偏差就会严苛自责。记住：不完美的行动胜于完美的停滞。",
      },
    ],
    gifts: [
      { title: "直觉之光", description: "能接收到比理性更深层的宇宙信号", icon: "⚡" },
      { title: "灵感传递", description: "你的想法能点燃他人的激情，引发连锁的创造", icon: "💫" },
      { title: "超感能力", description: "对能量、情绪和振动有极其细腻的感知", icon: "🌟" },
    ],
    lifeLessons: [
      {
        title: "将灵感落地",
        description: "你的使命不只是感知，更是将高频的灵感转化为实际的贡献。找到你的表达方式，让光通过你照进世界。",
      },
      {
        title: "接纳自己的特殊性",
        description: "你和大多数人不一样，这不是负担，是礼物。停止试图'正常化'自己。",
      },
    ],
    careerPaths: ["灵性导师", "心理治疗师", "艺术家", "作家", "激励演讲家", "占星师", "音乐家"],
    loveInsight: "你在爱情中需要深度的灵魂共鸣，而非表面的吸引。找到一个能与你在精神层面对话的伴侣，你的爱情将无与伦比。",
    yearAdvice: "你的灵感和直觉正处于历史高峰，相信它。开始那个你一直在等待'完美时机'的项目——完美时机就是现在。",
    luckyNumber: [11, 2, 29],
    luckyColor: "银色、白色",
    luckyDay: "周一",
    luckyGem: "月光石",
    spiritualMessage: "你是两个世界之间的门户——物质与灵性在你身上相遇。这是最神圣的使命。",
    celebrities: ["莫扎特", "奥普拉·温弗瑞", "大卫·贝克汉姆"],
  },

  22: {
    number: 22,
    name: "建造大师",
    title: "卓越数字 · 二十二",
    element: "土+风",
    planet: "天王星",
    color: "帝王蓝",
    colorHex: "#1E40AF",
    secondaryColorHex: "#3B82F6",
    symbol: "⊞",
    emoji: "🏗️",
    isMaster: true,
    tagline: "你是宇宙最伟大的建造者，将梦想变为改变世界的现实",
    traits: ["宏大愿景", "实践力", "领导力", "耐心", "使命感", "系统性", "影响力"],
    positiveTraits: [
      {
        title: "宏大愿景与实践力",
        description: "22 被称为'大师建造者'，你同时拥有11的高远愿景和4的务实执行力。你能将那些别人认为不可能的梦想付诸实现。",
      },
      {
        title: "传奇级领导力",
        description: "你的领导力超越常规，能整合大规模的资源和人才，朝向一个宏大的目标前进，留下历史性的影响。",
      },
      {
        title: "超越时代的贡献",
        description: "你创造的东西不是为了一时，而是为了长久。你的作品、系统或影响，将在你离开后继续传承。",
      },
    ],
    challenges: [
      {
        title: "使命的重量",
        description: "22 的使命极为宏大，有时会感到压力窒息，甚至想逃回更'平凡'的22/4的轨道。记住，你有足够的能力承担这份使命。",
      },
      {
        title: "完美主义障碍",
        description: "对宏大目标的追求有时会让你陷入无休止的准备，而迟迟不开始。先做再完善，是22号的生存法则。",
      },
    ],
    gifts: [
      { title: "大师建造力", description: "将高维愿景转化为具体、可传承的现实", icon: "🏛️" },
      { title: "超级整合力", description: "能协调大量的人才、资源和系统朝向同一目标", icon: "🔧" },
      { title: "历史性影响力", description: "你的贡献跨越个人，影响集体乃至文明", icon: "🌍" },
    ],
    lifeLessons: [
      {
        title: "接受并驾驭使命",
        description: "停止缩小自己以融入普通。你被选择来做一件大事，接受它，然后开始。",
      },
      {
        title: "在宏大中不忘细小",
        description: "改变世界，从改变面前这一个人开始。不要因为追求宏大而忽视眼前的连接。",
      },
    ],
    careerPaths: ["政治家", "建筑大师", "社会运动领袖", "企业帝国创始人", "国际机构领导者"],
    loveInsight: "你的使命感有时让伴侣感到自己排在世界之后。在爱情中，提醒自己：亲密关系是你使命的一部分，而非障碍。",
    yearAdvice: "有一个大项目在等待你启动，不要继续推迟。你已经准备好了，宇宙也准备好了。行动起来，历史正在等待你书写。",
    luckyNumber: [22, 4, 13],
    luckyColor: "蓝色、金色",
    luckyDay: "周六",
    luckyGem: "蓝宝石",
    spiritualMessage: "你拥有建造乌托邦的蓝图，现在是时候拿起工具，开始建造了。",
    celebrities: ["达·芬奇", "比尔·盖茨", "圣雄甘地"],
  },

  33: {
    number: 33,
    name: "导师大师",
    title: "卓越数字 · 三十三",
    element: "火+水",
    planet: "金星+木星",
    color: "慈悲金",
    colorHex: "#D97706",
    secondaryColorHex: "#FCD34D",
    symbol: "✦",
    emoji: "🕊️",
    isMaster: true,
    tagline: "你是宇宙慈悲的化身，以无条件的爱治愈一切，照亮最深的黑暗",
    traits: ["无条件的爱", "治愈", "慈悲", "教导", "奉献", "灵性", "光明"],
    positiveTraits: [
      {
        title: "无条件的爱",
        description: "33 被称为'导师大师'，你的爱超越了所有条件和期待，流向所有人，而不求回报。这种爱是世间最稀缺也最珍贵的力量。",
      },
      {
        title: "终极治愈者",
        description: "你的存在本身就有治愈的力量，在你身边，受伤的灵魂会感到被接纳和爱护。你是世界的圣殿。",
      },
      {
        title: "智慧传承者",
        description: "你不仅有智慧，更有将智慧深入浅出地传递的天赋。你培育的人，会继续点燃更多的光。",
      },
    ],
    challenges: [
      {
        title: "背负超重使命",
        description: "33 的能量如此宏大，真正的33号灵魂在进化成熟之前，往往会经历巨大的痛苦与考验，那是灵魂的淬炼。",
      },
      {
        title: "被消耗殆尽",
        description: "给予太多而不懂照顾自己，是33号的致命弱点。记住：空了的杯子无法为他人倒水。",
      },
    ],
    gifts: [
      { title: "慈悲大爱", description: "无条件接纳所有生命，是地球上最接近神性之爱的存在", icon: "🕊️" },
      { title: "终极治愈力", description: "你的存在本身就是一种祝福，治愈者中的治愈者", icon: "💫" },
      { title: "智慧传灯", description: "将宇宙智慧以最温柔的方式传递给有缘之人", icon: "🕯️" },
    ],
    lifeLessons: [
      {
        title: "先爱自己",
        description: "你的使命是给予，但神性之爱来自内心的满盈。学会自我关爱，你才能成为真正取之不竭的光源。",
      },
      {
        title: "不要拯救，而要启发",
        description: "你强烈的治愈冲动有时会变成'救世主情结'。真正的帮助是激发他人自我治愈的力量，而非包办一切。",
      },
    ],
    careerPaths: ["灵性导师", "治疗师", "宗教领袖", "慈善家", "教育改革者", "社区建造者"],
    loveInsight: "你爱得太无私，以至于容易吸引需要被'拯救'的伴侣。真正配得上你的人，是那个能与你并肩前行、而非依赖你的灵魂。",
    yearAdvice: "你所经历的一切都是在为更伟大的使命做准备。此刻，专注于自我疗愈——一个治好了自己的人，才能真正治愈他人。",
    luckyNumber: [33, 6, 15],
    luckyColor: "金色、白色",
    luckyDay: "周五",
    luckyGem: "钻石",
    spiritualMessage: "地球等待你的慈悲已久。你不是来拯救世界的，你是来教世界如何爱的。",
    celebrities: ["特蕾莎修女", "达赖喇嘛", "圣方济各"],
  },
};

// 数字对应的简短标签（用于海报）
export const NUMBER_KEYWORDS: Record<LifeNumber, string[]> = {
  1: ["独立", "先驱", "领袖"],
  2: ["和谐", "直觉", "合作"],
  3: ["创意", "表达", "喜悦"],
  4: ["踏实", "建造", "稳定"],
  5: ["自由", "冒险", "变化"],
  6: ["爱心", "责任", "治愈"],
  7: ["智慧", "神秘", "深度"],
  8: ["权力", "财富", "成就"],
  9: ["博爱", "圆满", "超越"],
  11: ["启示", "直觉", "灵性"],
  22: ["宏愿", "建造", "传奇"],
  33: ["慈悲", "治愈", "光明"],
};
