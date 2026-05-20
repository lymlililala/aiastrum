/**
 * 墨韵起名 - 核心数据库
 * 汉字五行属性、诗词出处、寓意标签
 */

// ===== 五行类型 =====
export type WuXing = "金" | "木" | "水" | "火" | "土";

// ===== 五行颜色配置 =====
export const WUXING_CONFIG = {
  金: { color: "#d4a017", bg: "rgba(212,160,23,0.12)", border: "rgba(212,160,23,0.3)", desc: "坚毅果决，刚强有力" },
  木: { color: "#4a7c59", bg: "rgba(74,124,89,0.12)", border: "rgba(74,124,89,0.3)", desc: "生机勃勃，仁慈宽厚" },
  水: { color: "#3b6fa0", bg: "rgba(59,111,160,0.12)", border: "rgba(59,111,160,0.3)", desc: "灵动智慧，随机应变" },
  火: { color: "#c0392b", bg: "rgba(192,57,43,0.12)", border: "rgba(192,57,43,0.3)", desc: "热情积极，光明磊落" },
  土: { color: "#8b6c42", bg: "rgba(139,108,66,0.12)", border: "rgba(139,108,66,0.3)", desc: "稳重踏实，厚德载物" },
} as const;

// ===== 五行相生相克 =====
export const WUXING_GENERATE: Record<WuXing, WuXing> = {
  金: "水", 木: "火", 水: "木", 火: "土", 土: "金",
};
export const WUXING_OVERCOME: Record<WuXing, WuXing> = {
  金: "木", 木: "土", 水: "火", 火: "金", 土: "水",
};

// ===== 吉祥字库（按五行分类）=====
export interface NameChar {
  char: string;          // 汉字
  wuxing: WuXing;        // 五行属性
  strokes: number;       // 笔画数
  pinyin: string;        // 拼音
  meaning: string;       // 基础寓意
  tags: string[];        // 寓意标签（如：诗意、美德、自然）
  source?: string;       // 国学出处（诗经/楚辞/古诗等）
  sourceText?: string;   // 出处原文
  gender: "male" | "female" | "neutral"; // 适用性别
  avoid?: string;        // 使用注意
}

export const AUSPICIOUS_CHARS: NameChar[] = [
  // ===== 金属字 =====
  { char: "锦", wuxing: "金", strokes: 16, pinyin: "jǐn", meaning: "锦绣前程，华美如织", tags: ["美德", "富贵"], source: "诗经·秦风", sourceText: "锦衾遮覆，金玉其相", gender: "female" },
  { char: "铭", wuxing: "金", strokes: 14, pinyin: "míng", meaning: "铭记于心，声名远播", tags: ["美德", "志向"], source: "刘禹锡·陋室铭", sourceText: "德馨足以养心", gender: "male" },
  { char: "钰", wuxing: "金", strokes: 13, pinyin: "yù", meaning: "珍贵如玉，坚硬纯净", tags: ["美德", "珍贵"], gender: "female" },
  { char: "昕", wuxing: "金", strokes: 8, pinyin: "xīn", meaning: "清晨的光，朝气蓬勃", tags: ["光明", "朝气"], gender: "neutral" },
  { char: "锐", wuxing: "金", strokes: 15, pinyin: "ruì", meaning: "聪慧锐利，勇于进取", tags: ["智慧", "进取"], gender: "male" },
  { char: "镇", wuxing: "金", strokes: 17, pinyin: "zhèn", meaning: "镇定自若，稳重大器", tags: ["稳重", "大气"], gender: "male" },
  { char: "铄", wuxing: "金", strokes: 13, pinyin: "shuò", meaning: "光耀明亮，闪耀夺目", tags: ["光明", "才华"], gender: "male" },

  // ===== 木属字 =====
  { char: "楠", wuxing: "木", strokes: 13, pinyin: "nán", meaning: "坚韧挺拔，栋梁之才", tags: ["坚强", "志向"], gender: "male" },
  { char: "梓", wuxing: "木", strokes: 11, pinyin: "zǐ", meaning: "梓里故乡，踏实生根", tags: ["家园", "踏实"], gender: "neutral" },
  { char: "桦", wuxing: "木", strokes: 10, pinyin: "huà", meaning: "白桦挺立，纯洁高雅", tags: ["纯洁", "高雅"], gender: "female" },
  { char: "柯", wuxing: "木", strokes: 9, pinyin: "kē", meaning: "枝繁叶茂，生机勃勃", tags: ["生机", "活力"], gender: "male" },
  { char: "蕊", wuxing: "木", strokes: 18, pinyin: "ruǐ", meaning: "花蕊初放，纤细柔美", tags: ["柔美", "诗意"], gender: "female" },
  { char: "楷", wuxing: "木", strokes: 13, pinyin: "kǎi", meaning: "楷模典范，正直为人", tags: ["美德", "榜样"], source: "庄子·达生", sourceText: "楷者，圣人之楷", gender: "male" },
  { char: "榕", wuxing: "木", strokes: 13, pinyin: "róng", meaning: "榕树庇荫，仁厚包容", tags: ["仁爱", "包容"], gender: "neutral" },
  { char: "桐", wuxing: "木", strokes: 10, pinyin: "tóng", meaning: "梧桐高洁，引凤来栖", tags: ["高洁", "才华"], source: "诗经·大雅", sourceText: "凤凰鸣矣，于彼高冈", gender: "neutral" },
  { char: "萱", wuxing: "木", strokes: 12, pinyin: "xuān", meaning: "忘忧草，快乐坚强，寄托母爱", tags: ["快乐", "坚强", "美好"], source: "诗经·卫风", sourceText: "焉得谖草，言树之背", gender: "female" },
  { char: "苑", wuxing: "木", strokes: 8, pinyin: "yuàn", meaning: "百花苑中，芬芳无限", tags: ["美丽", "诗意"], gender: "female" },
  { char: "茵", wuxing: "木", strokes: 9, pinyin: "yīn", meaning: "绿草茵茵，生机盎然", tags: ["自然", "生机"], gender: "female" },
  { char: "棠", wuxing: "木", strokes: 12, pinyin: "táng", meaning: "海棠春睡，温婉动人", tags: ["温婉", "美丽"], source: "诗经·召南", sourceText: "蔽芾甘棠，勿翦勿伐", gender: "female" },

  // ===== 水属字 =====
  { char: "淼", wuxing: "水", strokes: 12, pinyin: "miǎo", meaning: "水波淼淼，灵秀广博", tags: ["灵秀", "广博"], gender: "female" },
  { char: "霖", wuxing: "水", strokes: 16, pinyin: "lín", meaning: "久旱逢甘霖，泽被万物", tags: ["恩泽", "慷慨"], source: "诗经·小雅", sourceText: "天降甘霖，泽我苍生", gender: "male" },
  { char: "澜", wuxing: "水", strokes: 16, pinyin: "lán", meaning: "波澜壮阔，格局宏大", tags: ["大气", "志向"], gender: "male" },
  { char: "泓", wuxing: "水", strokes: 9, pinyin: "hóng", meaning: "清泓深邃，智慧如渊", tags: ["智慧", "深邃"], gender: "neutral" },
  { char: "溪", wuxing: "水", strokes: 13, pinyin: "xī", meaning: "小溪潺潺，活泼灵动", tags: ["活泼", "灵动"], gender: "female" },
  { char: "润", wuxing: "水", strokes: 10, pinyin: "rùn", meaning: "滋润万物，温润如玉", tags: ["温润", "美德"], source: "诗经·大雅", sourceText: "岂曰无衣，与子同泽", gender: "neutral" },
  { char: "漪", wuxing: "水", strokes: 14, pinyin: "yī", meaning: "涟漪轻荡，柔美灵秀", tags: ["柔美", "诗意"], source: "诗经·魏风", sourceText: "河水清且涟猗", gender: "female" },
  { char: "沐", wuxing: "水", strokes: 7, pinyin: "mù", meaning: "沐浴恩泽，感恩奉献", tags: ["感恩", "清洁"], gender: "male" },
  { char: "澈", wuxing: "水", strokes: 15, pinyin: "chè", meaning: "清澈见底，坦荡磊落", tags: ["纯洁", "光明"], gender: "neutral" },
  { char: "冰", wuxing: "水", strokes: 6, pinyin: "bīng", meaning: "冰清玉洁，高洁脱俗", tags: ["高洁", "纯洁"], source: "王昌龄·芙蓉楼", sourceText: "一片冰心在玉壶", gender: "female" },
  { char: "清", wuxing: "水", strokes: 11, pinyin: "qīng", meaning: "清廉高洁，宁静致远", tags: ["高洁", "宁静"], gender: "neutral" },

  // ===== 火属字 =====
  { char: "煜", wuxing: "火", strokes: 13, pinyin: "yù", meaning: "光辉灿烂，才华横溢", tags: ["才华", "光明"], gender: "male" },
  { char: "炜", wuxing: "火", strokes: 9, pinyin: "wěi", meaning: "火光灿烂，前途光明", tags: ["光明", "进取"], gender: "male" },
  { char: "烁", wuxing: "火", strokes: 13, pinyin: "shuò", meaning: "闪烁光芒，熠熠生辉", tags: ["才华", "光明"], gender: "male" },
  { char: "炎", wuxing: "火", strokes: 8, pinyin: "yán", meaning: "热情积极，朝气蓬勃", tags: ["热情", "活力"], gender: "male" },
  { char: "曦", wuxing: "火", strokes: 20, pinyin: "xī", meaning: "晨曦初照，朝气万丈", tags: ["朝气", "光明"], source: "陶渊明·归去来兮辞", sourceText: "时矫首而遐观", gender: "female" },
  { char: "灿", wuxing: "火", strokes: 7, pinyin: "càn", meaning: "灿烂辉煌，绽放光彩", tags: ["光明", "美丽"], gender: "neutral" },
  { char: "焱", wuxing: "火", strokes: 12, pinyin: "yàn", meaning: "三火腾升，光耀四方", tags: ["光明", "才华"], gender: "male" },
  { char: "晖", wuxing: "火", strokes: 12, pinyin: "huī", meaning: "阳光温暖，照耀万物", tags: ["温暖", "善良"], gender: "neutral" },
  { char: "旭", wuxing: "火", strokes: 6, pinyin: "xù", meaning: "旭日东升，充满活力", tags: ["朝气", "活力"], source: "诗经·邶风", sourceText: "日出而作，日入而息", gender: "male" },
  { char: "熙", wuxing: "火", strokes: 16, pinyin: "xī", meaning: "和熙光明，天下太平", tags: ["和乐", "光明"], gender: "neutral" },
  { char: "彤", wuxing: "火", strokes: 7, pinyin: "tóng", meaning: "彤云红霞，绚丽多彩", tags: ["美丽", "活力"], source: "诗经·邶风", sourceText: "彤管有炜，说怿女美", gender: "female" },

  // ===== 土属字 =====
  { char: "垚", wuxing: "土", strokes: 9, pinyin: "yáo", meaning: "山高地厚，稳重大器", tags: ["稳重", "大气"], gender: "male" },
  { char: "圻", wuxing: "土", strokes: 7, pinyin: "qí", meaning: "土地丰饶，胸怀广阔", tags: ["大气", "包容"], gender: "male" },
  { char: "壤", wuxing: "土", strokes: 17, pinyin: "rǎng", meaning: "土地肥沃，厚积薄发", tags: ["踏实", "积累"], gender: "male" },
  { char: "城", wuxing: "土", strokes: 9, pinyin: "chéng", meaning: "城郭坚固，安定繁荣", tags: ["稳重", "安定"], gender: "male" },
  { char: "坤", wuxing: "土", strokes: 8, pinyin: "kūn", meaning: "坤厚载物，温良恭俭", tags: ["美德", "稳重"], source: "易经·坤卦", sourceText: "地势坤，君子以厚德载物", gender: "female" },
  { char: "垚", wuxing: "土", strokes: 9, pinyin: "yáo", meaning: "三土叠加，根基深厚", tags: ["稳重", "大气"], gender: "male" },

  // ===== 通用美名字（综合属性）=====
  { char: "嘉", wuxing: "木", strokes: 14, pinyin: "jiā", meaning: "嘉言懿行，德才兼备", tags: ["美德", "才华"], source: "诗经·大雅", sourceText: "嘉乐君子，宪宪令德", gender: "neutral" },
  { char: "颖", wuxing: "木", strokes: 13, pinyin: "yǐng", meaning: "聪颖智慧，才思敏捷", tags: ["智慧", "才华"], gender: "female" },
  { char: "悦", wuxing: "火", strokes: 10, pinyin: "yuè", meaning: "喜悦快乐，怡然自得", tags: ["快乐", "美好"], gender: "female" },
  { char: "雅", wuxing: "金", strokes: 12, pinyin: "yǎ", meaning: "文雅大方，气质高贵", tags: ["高雅", "美德"], gender: "female" },
  { char: "逸", wuxing: "金", strokes: 11, pinyin: "yì", meaning: "超逸脱俗，飘然自在", tags: ["高雅", "自由"], source: "庄子·逍遥游", sourceText: "若夫乘天地之正，御六气之辩", gender: "male" },
  { char: "涵", wuxing: "水", strokes: 11, pinyin: "hán", meaning: "包容涵养，胸怀宽广", tags: ["包容", "美德"], gender: "female" },
  { char: "晨", wuxing: "火", strokes: 11, pinyin: "chén", meaning: "早晨朝气，积极向上", tags: ["朝气", "活力"], gender: "neutral" },
  { char: "轩", wuxing: "木", strokes: 10, pinyin: "xuān", meaning: "轩昂气宇，卓尔不凡", tags: ["大气", "进取"], gender: "male" },
  { char: "瑾", wuxing: "金", strokes: 15, pinyin: "jǐn", meaning: "瑾瑜美玉，温润典雅", tags: ["高雅", "美德"], source: "楚辞·离骚", sourceText: "怀瑾握瑜兮，穷不知所示", gender: "female" },
  { char: "昱", wuxing: "火", strokes: 9, pinyin: "yù", meaning: "日光辉耀，照亮四方", tags: ["光明", "才华"], gender: "male" },
  { char: "睿", wuxing: "水", strokes: 14, pinyin: "ruì", meaning: "睿智通达，洞察世事", tags: ["智慧", "通达"], gender: "male" },
  { char: "琳", wuxing: "金", strokes: 12, pinyin: "lín", meaning: "美玉琳琅，晶莹剔透", tags: ["珍贵", "美丽"], gender: "female" },
  { char: "昊", wuxing: "火", strokes: 8, pinyin: "hào", meaning: "苍天浩瀚，胸怀天下", tags: ["大气", "志向"], source: "诗经·王风", sourceText: "昊天罔极", gender: "male" },
  { char: "芷", wuxing: "木", strokes: 7, pinyin: "zhǐ", meaning: "白芷芬芳，品德纯洁", tags: ["纯洁", "诗意"], source: "楚辞·离骚", sourceText: "扈江离与辟芷兮，纫秋兰以为佩", gender: "female" },
  { char: "婷", wuxing: "火", strokes: 12, pinyin: "tíng", meaning: "婷婷玉立，姿态优美", tags: ["优美", "柔美"], gender: "female" },
  { char: "辰", wuxing: "土", strokes: 7, pinyin: "chén", meaning: "星辰璀璨，命运昌隆", tags: ["美好", "吉祥"], gender: "neutral" },
  { char: "泽", wuxing: "水", strokes: 9, pinyin: "zé", meaning: "润泽万物，胸怀宽广", tags: ["恩泽", "大气"], gender: "male" },
  { char: "恒", wuxing: "木", strokes: 9, pinyin: "héng", meaning: "持之以恒，坚定不移", tags: ["毅力", "美德"], gender: "male" },
  { char: "悠", wuxing: "木", strokes: 11, pinyin: "yōu", meaning: "悠然自得，从容淡雅", tags: ["从容", "诗意"], source: "陶渊明·饮酒", sourceText: "采菊东篱下，悠然见南山", gender: "neutral" },
  { char: "语", wuxing: "金", strokes: 14, pinyin: "yǔ", meaning: "谈吐优雅，才思横溢", tags: ["才华", "智慧"], gender: "female" },
  { char: "皓", wuxing: "金", strokes: 12, pinyin: "hào", meaning: "皓月当空，洁白无瑕", tags: ["纯洁", "光明"], source: "苏轼·水调歌头", sourceText: "明月几时有，把酒问青天", gender: "male" },
  { char: "宁", wuxing: "水", strokes: 5, pinyin: "níng", meaning: "宁静致远，心如止水", tags: ["宁静", "智慧"], gender: "female" },
  { char: "弘", wuxing: "水", strokes: 5, pinyin: "hóng", meaning: "弘扬正道，胸怀宽广", tags: ["大气", "美德"], gender: "male" },
  { char: "博", wuxing: "水", strokes: 12, pinyin: "bó", meaning: "博学多才，学富五车", tags: ["智慧", "才华"], gender: "male" },
  { char: "凌", wuxing: "水", strokes: 10, pinyin: "líng", meaning: "凌云壮志，豪气干云", tags: ["志向", "大气"], gender: "male" },
  { char: "书", wuxing: "木", strokes: 4, pinyin: "shū", meaning: "书香门第，学识渊博", tags: ["智慧", "书香"], gender: "neutral" },
  { char: "翰", wuxing: "木", strokes: 16, pinyin: "hàn", meaning: "翰墨飘香，文采斐然", tags: ["才华", "书香"], source: "王勃·滕王阁序", sourceText: "腾蛟起凤，孟学士之词宗", gender: "male" },
  { char: "诗", wuxing: "金", strokes: 13, pinyin: "shī", meaning: "诗情画意，文采飞扬", tags: ["诗意", "才华"], gender: "female" },
  { char: "雯", wuxing: "水", strokes: 12, pinyin: "wén", meaning: "彩云缤纷，文采华美", tags: ["美丽", "才华"], gender: "female" },
  { char: "绮", wuxing: "金", strokes: 12, pinyin: "qǐ", meaning: "绮罗生香，华美如织", tags: ["美丽", "诗意"], source: "张若虚·春江花月夜", sourceText: "江流宛转绕芳甸，月照花林皆似霰", gender: "female" },
  { char: "墨", wuxing: "水", strokes: 15, pinyin: "mò", meaning: "书墨飘香，文人雅士", tags: ["书香", "才华"], gender: "male" },
  { char: "研", wuxing: "金", strokes: 9, pinyin: "yán", meaning: "精研学问，治学严谨", tags: ["智慧", "毅力"], gender: "neutral" },
  { char: "锦", wuxing: "金", strokes: 16, pinyin: "jǐn", meaning: "锦绣前程，美好未来", tags: ["美好", "富贵"], source: "诗经·秦风", sourceText: "锦瑟无端五十弦", gender: "female" },
];

// ===== 吉名推荐数据（精选双字组合）=====
export interface NameSuggestion {
  name: string;             // 完整名字（不含姓）
  chars: string[];          // 名字各字
  charDetails: {
    char: string;
    wuxing: WuXing;
    meaning: string;
    pinyin: string;
    strokes: number;
  }[];
  combinedWuxing: WuXing[]; // 组合五行
  synergy: string;          // 五行相生描述
  overallMeaning: string;   // 综合寓意
  source?: string;          // 国学出处
  sourceText?: string;      // 出处原文
  sourceExplain?: string;   // 出处解释
  tonePattern: string;      // 平仄
  gender: "male" | "female" | "neutral";
  score: number;            // 综合评分 0-100
  isPremium: boolean;
  tags: string[];           // 特点标签
}

// ===== 加载文案 =====
export const NAMING_LOADING_TEXTS = [
  "正在推算生辰八字...",
  "分析五行旺衰格局...",
  "寻访诗词典籍...",
  "甄选吉祥好字...",
  "计算五格数理...",
  "过滤生僻字与冲克...",
  "组合最佳名字搭配...",
  "斟酌诗意与音律...",
];

// ===== 热门姓氏 =====
export const POPULAR_SURNAMES = [
  "王", "李", "张", "刘", "陈", "杨", "赵", "黄",
  "周", "吴", "徐", "孙", "朱", "马", "胡", "郭",
  "林", "何", "高", "梁", "郑", "罗", "宋", "谢",
  "唐", "韩", "曹", "邓", "萧", "冯", "曾", "程",
];

// ===== 时辰对应 =====
export const SHICHEN_LIST = [
  { label: "子时 (23:00-01:00)", value: "子", hour: 23 },
  { label: "丑时 (01:00-03:00)", value: "丑", hour: 1 },
  { label: "寅时 (03:00-05:00)", value: "寅", hour: 3 },
  { label: "卯时 (05:00-07:00)", value: "卯", hour: 5 },
  { label: "辰时 (07:00-09:00)", value: "辰", hour: 7 },
  { label: "巳时 (09:00-11:00)", value: "巳", hour: 9 },
  { label: "午时 (11:00-13:00)", value: "午", hour: 11 },
  { label: "未时 (13:00-15:00)", value: "未", hour: 13 },
  { label: "申时 (15:00-17:00)", value: "申", hour: 15 },
  { label: "酉时 (17:00-19:00)", value: "酉", hour: 17 },
  { label: "戌时 (19:00-21:00)", value: "戌", hour: 19 },
  { label: "亥时 (21:00-23:00)", value: "亥", hour: 21 },
] as const;

// ===== 五行口诀 =====
export const WUXING_TIPS = [
  "木生火：木燃而生火，生长滋养",
  "火生土：火灼而生土，热情孕育",
  "土生金：土凝而生金，厚积薄发",
  "金生水：金融而生水，精华流动",
  "水生木：水润而生木，滋养生机",
];

// ===== 五行喜用神分析模板 =====
export const XIYONGSHEN_TEMPLATES: Record<WuXing, {
  title: string;
  desc: string;
  nameTip: string;
  avoidTip: string;
}> = {
  木: {
    title: "喜用神·木",
    desc: "命局中木气不足，需以木气补益。木主仁慈生长，代表生命力与向上的精神。",
    nameTip: "宜选带木旁的字（如：桦、楠、梓）或字义含植物、成长的字（如：萱、芷、荣）",
    avoidTip: "忌用金旁字（金克木），如：锋、钢、锐等",
  },
  火: {
    title: "喜用神·火",
    desc: "命局中火气不足，需以火气补益。火主热情光明，代表才华与积极向上的精神。",
    nameTip: "宜选带火旁或日旁的字（如：煜、炎、旭）或字义含光热的字（如：曦、晖、晨）",
    avoidTip: "忌用水旁字（水克火），如：涛、澜、淼等",
  },
  土: {
    title: "喜用神·土",
    desc: "命局中土气不足，需以土气补益。土主稳重踏实，代表厚德载物的品格。",
    nameTip: "宜选带土旁的字（如：坤、垚、城）或字义含山地、稳固的字（如：岳、坚、厚）",
    avoidTip: "忌用木旁字（木克土），如：柯、棠、楠等",
  },
  金: {
    title: "喜用神·金",
    desc: "命局中金气不足，需以金气补益。金主刚强果决，代表精准高效的品格。",
    nameTip: "宜选带金旁的字（如：铭、钰、锦）或字义含精金美玉的字（如：琳、璇、瑾）",
    avoidTip: "忌用火旁字（火克金），如：炎、烁、焱等",
  },
  水: {
    title: "喜用神·水",
    desc: "命局中水气不足，需以水气补益。水主智慧灵动，代表广博包容的品格。",
    nameTip: "宜选带水旁的字（如：霖、澄、润）或字义含智慧、流动的字（如：博、睿、涵）",
    avoidTip: "忌用土旁字（土克水），如：垚、城、坤等",
  },
};
