/**
 * 周公解梦 - 数据库
 * 传统吉凶解析 + 现代心理学关键词映射
 *
 * 本地化说明（参照 numerology 模式）：
 * - 可翻译的展示文本使用 L = { zh, en, tw } 结构，由下方 resolver 按 lang 解析为纯 string。
 * - 作为查询/匹配用途的 keyword/word 保持中文（解梦引擎按中文关键词匹配），仅本地化“展示标签”。
 * - 吉凶等级（level）的 zh 值仍作为 LEVEL_CONFIG 的 key，仅本地化展示用的 badge 文案（见 levelLabel）。
 */

export type Lang = "zh" | "en" | "tw";

/** 单条本地化字符串 */
export type L = { zh: string; en: string; tw: string };

/** 解析单条本地化字符串 */
export function rs(v: L, lang: Lang): string {
  return v[lang];
}

// ===== 热门搜索标签 =====
// keyword 保持中文（作为查询提交给引擎）；label 为本地化展示标签。
export const HOT_TAGS: { keyword: string; emoji: string; label: L }[] = [
  { keyword: "蛇", emoji: "🐍", label: { zh: "蛇", en: "Snake", tw: "蛇" } },
  { keyword: "水", emoji: "💧", label: { zh: "水", en: "Water", tw: "水" } },
  { keyword: "考试", emoji: "📝", label: { zh: "考试", en: "Exam", tw: "考試" } },
  { keyword: "前任", emoji: "💔", label: { zh: "前任", en: "Ex", tw: "前任" } },
  { keyword: "掉牙", emoji: "🦷", label: { zh: "掉牙", en: "Losing teeth", tw: "掉牙" } },
  { keyword: "飞翔", emoji: "🕊️", label: { zh: "飞翔", en: "Flying", tw: "飛翔" } },
  { keyword: "死亡", emoji: "💀", label: { zh: "死亡", en: "Death", tw: "死亡" } },
  { keyword: "钱", emoji: "💰", label: { zh: "钱", en: "Money", tw: "錢" } },
  { keyword: "结婚", emoji: "💍", label: { zh: "结婚", en: "Marriage", tw: "結婚" } },
  { keyword: "下坠", emoji: "🌊", label: { zh: "下坠", en: "Falling", tw: "下墜" } },
  { keyword: "火", emoji: "🔥", label: { zh: "火", en: "Fire", tw: "火" } },
  { keyword: "被追", emoji: "🏃", label: { zh: "被追", en: "Being chased", tw: "被追" } },
];

/** 解析热门标签为面向组件的纯字符串结构 */
export function getHotTags(lang: Lang): { keyword: string; emoji: string; label: string }[] {
  return HOT_TAGS.map((tag) => ({
    keyword: tag.keyword,
    emoji: tag.emoji,
    label: rs(tag.label, lang),
  }));
}

// ===== 每日推荐梦境（轮播展示） =====
// keyword 保持中文（作为查询提交给引擎）；title/traditional/psychology 为本地化展示文本。
export interface DailyDream {
  keyword: string;
  keywordLabel: L;
  title: L;
  traditional: L;
  psychology: L;
  level: DreamLevel;
}

export const DAILY_DREAMS: DailyDream[] = [
  {
    keyword: "飞翔",
    keywordLabel: { zh: "飞翔", en: "Flying", tw: "飛翔" },
    title: {
      zh: "梦见自己在天空飞翔",
      en: "Dreaming of flying through the sky",
      tw: "夢見自己在天空飛翔",
    },
    traditional: {
      zh: "飞翔之梦多主吉兆，预示事业腾飞、前途光明，心想事成。",
      en: "Dreams of flying are mostly auspicious, foretelling a soaring career, a bright future, and wishes coming true.",
      tw: "飛翔之夢多主吉兆，預示事業騰飛、前途光明，心想事成。",
    },
    psychology: {
      zh: "渴望自由与解脱，可能正在从某种限制中逐渐脱身，内心充满向往与突破欲。",
      en: "A yearning for freedom and release — you may be gradually breaking free from some constraint, filled with longing and a drive to break through.",
      tw: "渴望自由與解脫，可能正在從某種限制中逐漸脫身，內心充滿嚮往與突破欲。",
    },
    level: "吉",
  },
  {
    keyword: "掉牙",
    keywordLabel: { zh: "掉牙", en: "Losing teeth", tw: "掉牙" },
    title: {
      zh: "梦见牙齿脱落",
      en: "Dreaming of losing teeth",
      tw: "夢見牙齒脫落",
    },
    traditional: {
      zh: "掉牙之梦，传统认为与家人健康相关，需多关心长辈，亦主言多有失。",
      en: "Dreams of losing teeth are traditionally linked to family health — care more for your elders; they also warn that loose talk invites trouble.",
      tw: "掉牙之夢，傳統認為與家人健康相關，需多關心長輩，亦主言多有失。",
    },
    psychology: {
      zh: "通常象征失去掌控感或对某件事的焦虑，也可能反映对衰老、形象或能力的担忧。",
      en: "Often symbolizes a loss of control or anxiety over something, and may reflect worries about aging, self-image, or capability.",
      tw: "通常象徵失去掌控感或對某件事的焦慮，也可能反映對衰老、形象或能力的擔憂。",
    },
    level: "平",
  },
  {
    keyword: "考试",
    keywordLabel: { zh: "考试", en: "Exam", tw: "考試" },
    title: {
      zh: "梦见参加考试却没复习",
      en: "Dreaming of taking an exam unprepared",
      tw: "夢見參加考試卻沒複習",
    },
    traditional: {
      zh: "考试之梦，主近期会有考验降临，须提前准备，凡事多加谨慎。",
      en: "Dreams of exams foretell a coming test — prepare in advance and approach everything with extra caution.",
      tw: "考試之夢，主近期會有考驗降臨，須提前準備，凡事多加謹慎。",
    },
    psychology: {
      zh: "典型的焦虑梦境，反映现实中对某件事的准备不足或自我要求过高带来的心理压力。",
      en: "A classic anxiety dream, reflecting real-life under-preparation for something or the pressure of overly high self-expectations.",
      tw: "典型的焦慮夢境，反映現實中對某件事的準備不足或自我要求過高帶來的心理壓力。",
    },
    level: "平",
  },
  {
    keyword: "水",
    keywordLabel: { zh: "水", en: "Water", tw: "水" },
    title: {
      zh: "梦见清澈的流水",
      en: "Dreaming of clear flowing water",
      tw: "夢見清澈的流水",
    },
    traditional: {
      zh: "清水为吉，主财运亨通、贵人相助，万事顺遂，吉祥如意。",
      en: "Clear water is auspicious, foretelling flourishing wealth, helpful benefactors, and all things going smoothly and well.",
      tw: "清水為吉，主財運亨通、貴人相助，萬事順遂，吉祥如意。",
    },
    psychology: {
      zh: "清水代表潜意识的净化与流动，内心正处于较为平静清明的状态，情感疏导良好。",
      en: "Clear water represents the cleansing and flow of the subconscious — your inner state is fairly calm and lucid, with emotions well channeled.",
      tw: "清水代表潛意識的淨化與流動，內心正處於較為平靜清明的狀態，情感疏導良好。",
    },
    level: "吉",
  },
];

/** 解析每日推荐梦境为面向组件的纯字符串结构 */
export function getDailyDreams(lang: Lang): {
  keyword: string;
  keywordLabel: string;
  title: string;
  traditional: string;
  psychology: string;
  level: DreamLevel;
}[] {
  return DAILY_DREAMS.map((d) => ({
    keyword: d.keyword,
    keywordLabel: rs(d.keywordLabel, lang),
    title: rs(d.title, lang),
    traditional: rs(d.traditional, lang),
    psychology: rs(d.psychology, lang),
    level: d.level,
  }));
}

// ===== 吉凶等级配置 =====
export const LEVEL_CONFIG = {
  大吉: { color: "#f59e0b", bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.3)", icon: "✦", badge: "大吉" },
  吉: { color: "#34d399", bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.25)", icon: "◆", badge: "吉" },
  平: { color: "#818cf8", bg: "rgba(129,140,248,0.12)", border: "rgba(129,140,248,0.25)", icon: "◇", badge: "平" },
  凶: { color: "#f87171", bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.25)", icon: "▽", badge: "凶" },
  大凶: { color: "#ef4444", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.25)", icon: "▼", badge: "大凶" },
} as const;

export type DreamLevel = keyof typeof LEVEL_CONFIG;

// ===== 吉凶等级展示标签（三语） =====
// zh 值同时作为 LEVEL_CONFIG 的 key 与引擎匹配用途，这里仅本地化“展示文案”。
export const LEVEL_LABELS: Record<DreamLevel, L> = {
  大吉: { zh: "大吉", en: "Very Auspicious", tw: "大吉" },
  吉: { zh: "吉", en: "Auspicious", tw: "吉" },
  平: { zh: "平", en: "Neutral", tw: "平" },
  凶: { zh: "凶", en: "Inauspicious", tw: "凶" },
  大凶: { zh: "大凶", en: "Very Inauspicious", tw: "大凶" },
};

/**
 * 解析吉凶等级的展示标签。
 * 入参可能是 zh 等级 key，也可能是 AI 直接返回的等级文案（如 "Auspicious"）。
 * 若命中 LEVEL_LABELS 的某个 key（按 zh 或任一语言匹配）则返回本地化标签，否则原样返回。
 */
export function levelLabel(level: string, lang: Lang): string {
  // 直接是 zh key
  if (level in LEVEL_LABELS) {
    return rs(LEVEL_LABELS[level as DreamLevel], lang);
  }
  // AI 可能返回任意语言的等级文案，尝试反查到 zh key 再本地化
  for (const key of Object.keys(LEVEL_LABELS) as DreamLevel[]) {
    const variants = LEVEL_LABELS[key];
    if (variants.zh === level || variants.en === level || variants.tw === level) {
      return rs(variants, lang);
    }
  }
  return level;
}

/**
 * 将任意语言的等级文案归一化为 zh 等级 key（用于 LEVEL_CONFIG 取色/图标）。
 * 命中失败时回退到「平」。
 */
export function resolveLevelKey(level: string): DreamLevel {
  if (level in LEVEL_LABELS) return level as DreamLevel;
  for (const key of Object.keys(LEVEL_LABELS) as DreamLevel[]) {
    const variants = LEVEL_LABELS[key];
    if (variants.zh === level || variants.en === level || variants.tw === level) {
      return key;
    }
  }
  return "平";
}

/**
 * 判断一条宜忌建议是否为「宜」（do）。
 * advice 来自已按 lang 分支的 AI/mock 文案：zh/tw 以「宜」开头，en 以 "Do" 开头。
 * 仅用于决定展示哪个标签与样式，不改变文案本身。
 */
export function isYiAdvice(part: string): boolean {
  const trimmed = part.trimStart();
  return trimmed.startsWith("宜") || /^do\b/i.test(trimmed);
}

// ===== 传统周公解梦数据库 =====
export interface DreamEntry {
  keywords: string[];       // 匹配关键词
  title: string;            // 梦境标题
  level: DreamLevel;        // 吉凶
  omen: string;             // 吉凶预兆（传统解读）
  advice: string;           // 宜忌建议
  psychologyHint: string;   // 心理学提示（用于AI prompt）
}

export const DREAM_DATABASE: DreamEntry[] = [
  // ===== 动物篇 =====
  {
    keywords: ["蛇", "大蛇", "小蛇", "蟒蛇", "毒蛇"],
    title: "梦见蛇",
    level: "吉",
    omen: "梦见蛇是财富与智慧的象征。梦见蛇缠绕全身，主有大财入账；梦见蛇追自己，主近期有贵人相助；被蛇咬伤则需注意身边小人，凡事多加谨慎。",
    advice: "宜：把握近期投资机会，注意身边贵人的建议。忌：因小失大，轻信陌生人的钱财许诺。",
    psychologyHint: "蛇在荣格心理学中代表原始力量与转化，也象征潜意识中的欲望与恐惧的结合体。",
  },
  {
    keywords: ["狗", "小狗", "大狗", "狗咬", "被狗追"],
    title: "梦见狗",
    level: "吉",
    omen: "狗乃忠诚之象，梦见狗主感情顺遂，友谊长存。梦见被狗友好对待，主贵人相助；被狗追咬，提示近期人际关系需多加注意，防止朋友间的误会。",
    advice: "宜：主动维护重要的友情与感情关系。忌：对朋友缺乏信任，产生不必要的猜疑。",
    psychologyHint: "狗象征忠诚、陪伴与保护本能，梦见狗往往与安全感、友谊和人际信任有关。",
  },
  {
    keywords: ["猫", "小猫", "黑猫", "白猫", "猫抓"],
    title: "梦见猫",
    level: "平",
    omen: "猫主神秘与灵感，梦见白猫主运势平稳，有小幸运；黑猫出现，需防止小人谗言，谨慎行事；猫咪对你亲昵，感情生活将有惊喜。",
    advice: "宜：跟随直觉做决定，相信自己的判断力。忌：轻信谣言，被情绪左右重要决策。",
    psychologyHint: "猫象征独立、神秘与直觉力，梦见猫往往与内心的自主性、女性特质或未被满足的好奇心有关。",
  },
  {
    keywords: ["鱼", "鲤鱼", "金鱼", "钓鱼", "游鱼"],
    title: "梦见鱼",
    level: "大吉",
    omen: "鱼为吉祥富贵之兆。梦见鱼群游动，大吉，主财运旺盛，钱财滚滚而来；梦见钓到大鱼，主有重大机遇降临；活蹦乱跳的鱼，主事业顺遂，如鱼得水。",
    advice: "宜：抓住商业机遇，积极拓展人脉与资源。忌：因贪心错过眼前稳妥的收益。",
    psychologyHint: "鱼在潜意识中代表机遇、丰盛与精神滋养，梦见鱼往往与对成功和富足的渴望有关。",
  },
  {
    keywords: ["龙", "龙腾", "金龙", "盘龙", "飞龙"],
    title: "梦见龙",
    level: "大吉",
    omen: "龙为至尊祥瑞，梦见龙乃天降大吉之兆。梦见腾龙入云，主事业如日中天，仕途顺遂；梦见龙降临身边，主权贵相助，名利双收；梦见自己化龙，大吉中的大吉，前途无量。",
    advice: "宜：大胆追求更高目标，主动展现自身才华。忌：骄傲自满，错失难得的发展契机。",
    psychologyHint: "龙象征力量、成就与超自然的保护，在心理层面代表对掌控力、社会认可与自我实现的深层渴望。",
  },
  {
    keywords: ["鸟", "飞鸟", "鹰", "鸽子", "白鹤", "凤凰"],
    title: "梦见鸟",
    level: "吉",
    omen: "鸟为自由吉祥之象。梦见白鸽，主和平，近期事业与感情顺遂；梦见老鹰翱翔，主事业腾飞，野心终将成就；梦见凤凰涅槃，经历磨砺后将脱胎换骨，迎来人生转机。",
    advice: "宜：勇敢追逐梦想，不怕高远的目标。忌：因畏惧失败而裹足不前。",
    psychologyHint: "鸟象征精神自由与超越，梦见鸟往往反映内心对自由、突破局限或更高精神境界的向往。",
  },

  // ===== 自然现象篇 =====
  {
    keywords: ["水", "清水", "流水", "江河", "湖泊", "大海"],
    title: "梦见水",
    level: "吉",
    omen: "水为财运之象。梦见清澈之水，大吉，主财源滚滚，贵人相助；梦见流水潺潺，主生活顺遂、心情舒畅；梦见大海波涛，预示即将迎来人生重大机遇或转折。",
    advice: "宜：把握当前财运，适合投资或拓展新业务。忌：铺张浪费，忽视稳健理财的重要性。",
    psychologyHint: "水在荣格分析中是潜意识本身的象征，清水代表情感的流动与净化，内心处于平和清明的状态。",
  },
  {
    keywords: ["浑水", "污水", "洪水", "泥水"],
    title: "梦见浑水或洪水",
    level: "凶",
    omen: "浑水、污水为不吉之兆，主近期会有小人作乱，事业或财运受阻。洪水则预示将面临重大变故，需提前做好应对准备，稳住心态方可化险为夷。",
    advice: "宜：低调行事，谨慎处理人际关系，稳守现有成果。忌：轻举妄动，在动荡期作出重大决定。",
    psychologyHint: "浑水或洪水反映内心情绪的混乱状态，可能面临强烈的情绪压力或失控感，需要关注自我情绪调节。",
  },
  {
    keywords: ["火", "大火", "烈火", "火焰", "着火"],
    title: "梦见火",
    level: "吉",
    omen: "火为热情、能量之象，通常是吉兆。梦见火焰旺盛，主事业蒸蒸日上，充满激情；梦见篝火温暖，主家庭和睦，温馨幸福；若梦见自己被火焰围困，则需注意情绪管理，防止冲动行事。",
    advice: "宜：趁热打铁，在旺运期积极推进事业计划。忌：冲动行事，以激烈方式处理人际矛盾。",
    psychologyHint: "火象征激情、创造力与转化，梦见旺火往往代表强烈的进取心与生命力，也可能反映压抑已久的情绪需要释放。",
  },
  {
    keywords: ["月亮", "月光", "圆月", "月色", "明月"],
    title: "梦见月亮",
    level: "吉",
    omen: "月亮为阴柔、直觉与感情之象。梦见圆满月亮，主感情美满，家庭和睦；梦见月光照耀，主有贵人在背后默默支持；梦见残月，感情可能有些波折，宜多关心身边的人。",
    advice: "宜：关注情感关系，表达内心的爱意与关怀。忌：因过于理性而忽略了内心情感的需要。",
    psychologyHint: "月亮是潜意识、直觉与女性原则的象征，梦见月亮往往与情感需求、内在感受和周期性变化有关。",
  },
  {
    keywords: ["太阳", "阳光", "日出", "晴天"],
    title: "梦见太阳",
    level: "大吉",
    omen: "太阳为至阳之象，乃大吉大利的征兆。梦见旭日东升，主事业与人生即将迎来崭新的开始，前途一片光明；阳光普照，主健康、财富与声誉三者皆旺，是难得的好梦。",
    advice: "宜：主动出击，大展宏图，此时是开创新局面的最佳时机。忌：错失当前的好运时机，浪费良好的运势。",
    psychologyHint: "太阳是意识、自我与阳性力量的象征，梦见阳光往往代表对未来充满信心，心理状态积极乐观。",
  },

  // ===== 行为场景篇 =====
  {
    keywords: ["飞翔", "飞起来", "飞行", "飞上天", "腾空"],
    title: "梦见飞翔",
    level: "吉",
    omen: "飞翔是最常见的吉梦之一，主事业腾飞，心想事成。梦见自由飞翔于天际，预示近期会有突破性的进展，思路开阔，贵人相助；飞得越高，象征成就越大。",
    advice: "宜：大胆尝试新机会，扩展视野，打破既有格局。忌：安于现状，错过突破的关键窗口期。",
    psychologyHint: "飞翔之梦是对自由与超越的渴望，往往出现在感到受限或压抑时，代表对打破束缚、实现更高自我的深层向往。",
  },
  {
    keywords: ["下坠", "坠落", "掉下去", "跌落", "往下坠"],
    title: "梦见下坠",
    level: "平",
    omen: "下坠之梦虽令人惊醒，但其本意并非全然不吉，而是一种警示：提醒你在某件事上需要脚踏实地，勿好高骛远。现实中可能有某件事尚未完成，需要你认真收尾。",
    advice: "宜：重新审视当前进行中的事务，补充不足之处。忌：因恐惧而回避问题，让隐患扩大化。",
    psychologyHint: "坠落梦是焦虑情绪的典型投射，通常与失去掌控感、对某件事缺乏安全感或即将面对挑战的心理压力有关。",
  },
  {
    keywords: ["被追", "被追杀", "有人追", "逃跑", "逃命"],
    title: "梦见被追",
    level: "平",
    omen: "被追之梦，是生活压力的折射。传统上认为梦见被追是提示有小人暗中使坏，需谨慎言行；若成功逃脱，则吉，表示能化险为夷；若被追上，需防止近期遭遇挫折。",
    advice: "宜：主动处理当前回避的问题，勇于面对困境。忌：逃避现实，让问题积累成更大的麻烦。",
    psychologyHint: "被追是最常见的恐惧原型梦境，代表对某种现实压力、责任或自己阴暗面的回避，鼓励你去直面而非逃避内心的困境。",
  },
  {
    keywords: ["结婚", "婚礼", "嫁人", "娶妻", "新娘", "新郎"],
    title: "梦见结婚",
    level: "大吉",
    omen: "婚礼之梦大吉，主人生将迎来重大的美好变化。事业上可能有新的合作机遇；感情上已婚者感情更加深厚，未婚者桃花运旺盛，近期有望遇见良缘。",
    advice: "宜：敞开心扉，积极迎接新的人际关系与合作机会。忌：因患得患失而错失良缘或良机。",
    psychologyHint: "婚礼梦象征内心对结合、承诺与完整性的渴望，也代表人格中阴阳两方面力量的整合，是走向内心成熟的积极信号。",
  },
  {
    keywords: ["考试", "参加考试", "高考", "考不完", "答卷"],
    title: "梦见考试",
    level: "平",
    omen: "考试之梦主近期有考验降临，可能是工作上的绩效考核、感情中的试炼或人际关系上的考验。若梦中从容作答，表示你有能力应对；若慌乱失措，则提示需提前做好准备。",
    advice: "宜：对当前承担的责任提前做好规划与准备，不打无准备之仗。忌：临阵磨枪，对重要的事敷衍了事。",
    psychologyHint: "考试梦是现代人最常见的焦虑梦境，反映对评价与认可的敏感、自我要求过高的完美主义倾向，或对某件事准备不足的真实担忧。",
  },
  {
    keywords: ["掉牙", "牙齿脱落", "牙掉了", "牙齿"],
    title: "梦见掉牙",
    level: "平",
    omen: "掉牙之梦，传统认为与家中长辈健康有关，梦见掉牙后需多关怀父母或长辈。亦主近期言多有失，说话需三思而后行。若梦见长出新牙，则转为吉兆，主新的开始。",
    advice: "宜：多关心家人健康，注意言辞，谨慎承诺。忌：在未经深思熟虑的情况下轻易许诺。",
    psychologyHint: "掉牙是最普遍的焦虑梦境之一，通常象征对形象、自我表达能力或人际关系稳固性的焦虑，也与对衰老或失去吸引力的担忧有关。",
  },
  {
    keywords: ["死亡", "死去", "去世", "死人", "死了"],
    title: "梦见死亡",
    level: "吉",
    omen: "梦见死亡并非噩兆，反而多主吉祥。传统周公解梦认为，梦见自己或亲友死亡，主长寿吉祥，有喜事降临；梦见亲人去世，反而象征该亲人会健康长寿；这是一种【反义梦】。",
    advice: "宜：放下对变化的恐惧，接受人生的转变与新生。忌：将梦境与现实不吉之事强行联系，徒增烦恼。",
    psychologyHint: "死亡梦在心理学中象征转化、结束与新生，代表内心正在经历某种深刻的蜕变或某个人生阶段的告别，是成长与改变的积极信号。",
  },

  // ===== 人物篇 =====
  {
    keywords: ["父母", "爸爸", "妈妈", "父亲", "母亲"],
    title: "梦见父母",
    level: "吉",
    omen: "梦见父母是思念与祖先庇荫的象征。梦见父母面容慈祥，主家庭和睦，运势顺遂，近期事业或学业会有长辈贵人相助。梦见与父母交谈，则有重要的人生智慧需要领悟。",
    advice: "宜：多与家人沟通，传递关爱，处理久拖未决的家庭事务。忌：因工作繁忙而疏于与家人联系。",
    psychologyHint: "父母象征权威、保护与原始依附关系，梦见父母往往与内心对安全感、认可和归属感的需求有关。",
  },
  {
    keywords: ["前任", "前男友", "前女友", "初恋", "旧情人"],
    title: "梦见前任",
    level: "平",
    omen: "梦见前任并非意味着感情难以放下，传统上认为此类梦预示着过去某段经历的教训将在近期发挥作用，帮助你做出更好的决定。梦见与前任和好，主近期贵人相助。",
    advice: "宜：从过去的感情经历中汲取成长的力量，用于当前关系。忌：在现实中因旧情纠葛而影响当下的幸福。",
    psychologyHint: "梦见前任通常与未处理的情感议题有关，代表某段记忆或情感模式仍存于潜意识，是内心邀请你回顾、和解并整合的信号。",
  },
  {
    keywords: ["婴儿", "小孩", "孩子", "宝宝", "小婴儿"],
    title: "梦见婴儿",
    level: "大吉",
    omen: "婴儿象征新生、希望与纯真，是大吉之兆。梦见可爱的婴儿，主近期会有喜事降临，可能是事业上的新项目、家庭中的好消息，或是内心某个新愿景即将萌芽成真。",
    advice: "宜：以开放的心态迎接新事物，培育新的想法和计划。忌：因守旧而阻碍新事物的生长。",
    psychologyHint: "婴儿在心理学中象征内心的【新生自我】，代表崭新的开始与纯粹的潜能，梦见婴儿往往与创造欲、新想法萌发或某段关系的更新有关。",
  },

  // ===== 物品篇 =====
  {
    keywords: ["钱", "金钱", "钞票", "捡钱", "财富", "发财"],
    title: "梦见钱财",
    level: "吉",
    omen: "梦见金钱主财运旺盛，是好兆头。捡到钱，主意外之财或贵人相助；数钱，主近期会有稳定的财富积累；被人送钱，主事业上会得到重要人物的提携与帮助。",
    advice: "宜：抓住理财或投资的时机，善用当前财运旺盛的优势。忌：因贪心而做出高风险冒进的财务决定。",
    psychologyHint: "钱在梦中象征价值、能量与安全感，梦见金钱往往反映对自我价值的认可或对物质安全感的渴望。",
  },
  {
    keywords: ["棺材", "棺木", "出殡", "葬礼"],
    title: "梦见棺材",
    level: "大吉",
    omen: "棺材之梦，在传统周公解梦中是极好的大吉之兆！因「棺」与「官」同音，梦见棺材预示升官发财，有喜事将至，财运与官运双旺，是不可多得的好梦。",
    advice: "宜：积极争取晋升机会或商业合作，财运与官运正旺。忌：因对梦境的误解而白白错过吉兆。",
    psychologyHint: "棺材在心理上象征对某个人生阶段或旧我的放下，代表转化与更新，往往出现在人生重大转折时期。",
  },
  {
    keywords: ["血", "流血", "鲜血", "血液"],
    title: "梦见血",
    level: "吉",
    omen: "血为生命力与财富的象征，多主吉。梦见鲜血，主财运亨通，生命力旺盛；梦见伤口流血，主努力付出后将获得应有的回报；血流不止，需注意健康和过度消耗精力的问题。",
    advice: "宜：劳逸结合，在付出的同时注意保养身体。忌：透支体力与精神，忽视健康信号。",
    psychologyHint: "血象征生命力、激情与牺牲，梦见血可能与强烈的情感体验、对某件事的高度投入或潜在的身体疲惫感有关。",
  },
  {
    keywords: ["房子", "新房", "房屋", "别墅", "老房子"],
    title: "梦见房子",
    level: "吉",
    omen: "房子是安全感与自我的象征。梦见新房子，主生活将有重大改善，财运与家运双旺；梦见宽大明亮的房子，主事业蒸蒸日上；梦见破旧房子，则提示需要关注家庭关系或身体状况。",
    advice: "宜：关注居住环境与家庭关系，投资安居乐业。忌：因过于漂泊不定而忽视对家庭的经营。",
    psychologyHint: "房子在梦中代表自我或心灵本身，不同的房间象征心理的不同层面，梦见新房往往与自我更新或生活新阶段的开启有关。",
  },
];

// ===== 梦境分类库 =====
// word 保持中文（作为查询提交给引擎）；title 与 word 的展示标签使用 L 本地化。
export interface DreamCategoryKeyword {
  word: string;
  wordLabel: L;
  level: DreamLevel;
}

export interface DreamCategory {
  id: string;
  title: L;
  emoji: string;
  color: string;
  keywords: DreamCategoryKeyword[];
}

const K = (word: string, en: string, tw: string, level: DreamLevel): DreamCategoryKeyword => ({
  word,
  wordLabel: { zh: word, en, tw },
  level,
});

export const DREAM_CATEGORIES: DreamCategory[] = [
  {
    id: "people",
    title: { zh: "人物篇", en: "People", tw: "人物篇" },
    emoji: "👥",
    color: "rgba(167, 139, 250, 0.6)",
    keywords: [
      K("父母", "Parents", "父母", "吉"),
      K("死者", "The deceased", "死者", "吉"),
      K("前任", "Ex-partner", "前任", "平"),
      K("名人", "Celebrity", "名人", "平"),
      K("婴儿", "Baby", "嬰兒", "大吉"),
      K("陌生人", "Stranger", "陌生人", "平"),
      K("老人", "Elder", "老人", "吉"),
      K("朋友", "Friend", "朋友", "吉"),
    ],
  },
  {
    id: "animals",
    title: { zh: "动物篇", en: "Animals", tw: "動物篇" },
    emoji: "🐉",
    color: "rgba(52, 211, 153, 0.6)",
    keywords: [
      K("蛇", "Snake", "蛇", "吉"),
      K("龙", "Dragon", "龍", "大吉"),
      K("狗", "Dog", "狗", "吉"),
      K("猫", "Cat", "貓", "平"),
      K("鱼", "Fish", "魚", "大吉"),
      K("鸟", "Bird", "鳥", "吉"),
      K("老虎", "Tiger", "老虎", "吉"),
      K("马", "Horse", "馬", "大吉"),
    ],
  },
  {
    id: "things",
    title: { zh: "物品篇", en: "Objects", tw: "物品篇" },
    emoji: "💎",
    color: "rgba(251, 191, 36, 0.6)",
    keywords: [
      K("钱", "Money", "錢", "吉"),
      K("棺材", "Coffin", "棺材", "大吉"),
      K("血", "Blood", "血", "吉"),
      K("水", "Water", "水", "吉"),
      K("火", "Fire", "火", "吉"),
      K("房子", "House", "房子", "吉"),
      K("刀", "Knife", "刀", "平"),
      K("书", "Book", "書", "吉"),
    ],
  },
  {
    id: "actions",
    title: { zh: "行为篇", en: "Actions", tw: "行為篇" },
    emoji: "✨",
    color: "rgba(248, 113, 113, 0.6)",
    keywords: [
      K("飞翔", "Flying", "飛翔", "吉"),
      K("下坠", "Falling", "下墜", "平"),
      K("被追", "Being chased", "被追", "平"),
      K("结婚", "Marriage", "結婚", "大吉"),
      K("考试", "Exam", "考試", "平"),
      K("掉牙", "Losing teeth", "掉牙", "平"),
      K("死亡", "Death", "死亡", "吉"),
      K("迷路", "Getting lost", "迷路", "凶"),
    ],
  },
];

/** 解析梦境分类库为面向组件的纯字符串结构（word 保持中文用于查询） */
export function getDreamCategories(lang: Lang): {
  id: string;
  title: string;
  emoji: string;
  color: string;
  keywords: { word: string; wordLabel: string; level: DreamLevel }[];
}[] {
  return DREAM_CATEGORIES.map((cat) => ({
    id: cat.id,
    title: rs(cat.title, lang),
    emoji: cat.emoji,
    color: cat.color,
    keywords: cat.keywords.map((k) => ({
      word: k.word,
      wordLabel: rs(k.wordLabel, lang),
      level: k.level,
    })),
  }));
}

// ===== 分享海报金句 =====
// 注意：与海报渲染保持一致，POSTER_QUOTES 仅在 zh/tw 海报中作为随机金句使用，保持中文。
export const POSTER_QUOTES: string[] = [
  "梦是潜意识给你写的信，此刻，你读懂了它。",
  "每一个梦境，都是内心深处另一个自己的低语。",
  "周公引路，梦中问道，答案一直在你心中。",
  "你的梦，是宇宙写给你的私密情书。",
  "在意识休眠之时，灵魂的智慧才得以显现。",
  "梦境不是逃避，而是另一种形式的清醒。",
  "潜意识从不说谎，它只是用隐喻与你对话。",
];

// ===== 加载文案 =====
const LOADING_TEXTS_L: L[] = [
  { zh: "正在唤醒周公大人...", en: "Awakening the Dream Master...", tw: "正在喚醒周公大人..." },
  { zh: "翻阅千年解梦古籍...", en: "Leafing through millennia-old dream tomes...", tw: "翻閱千年解夢古籍..." },
  { zh: "分析梦境中的隐秘符号...", en: "Analyzing the hidden symbols in your dream...", tw: "分析夢境中的隱秘符號..." },
  { zh: "连接你的潜意识深处...", en: "Connecting to the depths of your subconscious...", tw: "連接你的潛意識深處..." },
  { zh: "荣格正在解析原型意象...", en: "Jung is decoding the archetypal imagery...", tw: "榮格正在解析原型意象..." },
  { zh: "整理吉凶宜忌建议...", en: "Compiling omens and guidance...", tw: "整理吉凶宜忌建議..." },
  { zh: "提取梦境的核心能量...", en: "Extracting the dream's core energy...", tw: "提取夢境的核心能量..." },
  { zh: "将神秘语言翻译为启示...", en: "Translating the mystic tongue into revelation...", tw: "將神秘語言翻譯為啟示..." },
];

/** 解析加载文案为面向组件的纯字符串数组 */
export function getLoadingTexts(lang: Lang): string[] {
  return LOADING_TEXTS_L.map((t) => rs(t, lang));
}
