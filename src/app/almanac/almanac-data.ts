/**
 * 老黄历核心数据库
 * 干支、节气、宜忌事项、神煞、时辰、生肖等
 */

// ===== 本地化字符串类型 =====
// 可读内容字段统一用三语对象表示；引擎按 lang 解析为纯字符串后再返回。
export type L = { zh: string; en: string; tw: string };

// ===== 天干地支 =====
export const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"] as const;
export const DI_ZHI  = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"] as const;

// ===== 生肖 =====
export const SHENG_XIAO = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"] as const;
export type ShengXiao = typeof SHENG_XIAO[number];

// 生肖名称（用于展示）。zh/tw 保留传统字符，en 用英文动物名。
export const SHENGXIAO_L: Record<ShengXiao, L> = {
  鼠: { zh: "鼠", tw: "鼠", en: "Rat" },
  牛: { zh: "牛", tw: "牛", en: "Ox" },
  虎: { zh: "虎", tw: "虎", en: "Tiger" },
  兔: { zh: "兔", tw: "兔", en: "Rabbit" },
  龙: { zh: "龙", tw: "龍", en: "Dragon" },
  蛇: { zh: "蛇", tw: "蛇", en: "Snake" },
  马: { zh: "马", tw: "馬", en: "Horse" },
  羊: { zh: "羊", tw: "羊", en: "Goat" },
  猴: { zh: "猴", tw: "猴", en: "Monkey" },
  鸡: { zh: "鸡", tw: "雞", en: "Rooster" },
  狗: { zh: "狗", tw: "狗", en: "Dog" },
  猪: { zh: "猪", tw: "豬", en: "Pig" },
};

// 生肖对应地支索引（子=鼠，丑=牛…）
export const SHENGXIAO_ZHI: Record<ShengXiao, number> = {
  鼠: 0, 牛: 1, 虎: 2, 兔: 3, 龙: 4, 蛇: 5,
  马: 6, 羊: 7, 猴: 8, 鸡: 9, 狗: 10, 猪: 11,
};

// 相冲对（差6位互冲）
export const CHONG_PAIRS: Record<ShengXiao, ShengXiao> = {
  鼠: "马", 牛: "羊", 虎: "猴", 兔: "鸡", 龙: "狗", 蛇: "猪",
  马: "鼠", 羊: "牛", 猴: "虎", 鸡: "兔", 狗: "龙", 猪: "蛇",
};

// 三合（三合局互相吉利）
export const SANHE_GROUPS: ShengXiao[][] = [
  ["鼠", "龙", "猴"],
  ["牛", "蛇", "鸡"],
  ["虎", "马", "狗"],
  ["兔", "羊", "猪"],
];

// 六合
export const LIUHE_PAIRS: Record<ShengXiao, ShengXiao> = {
  鼠: "牛", 牛: "鼠", 虎: "猪", 兔: "狗", 龙: "鸡", 蛇: "猴",
  马: "羊", 羊: "马", 猴: "蛇", 鸡: "龙", 狗: "兔", 猪: "虎",
};

// ===== 方位本地化 =====
// 八方位（含正向）的三语表示。引擎方位数据保留中文 key，按 lang 解析展示。
export const DIRECTION_L: Record<string, L> = {
  正北: { zh: "正北", tw: "正北", en: "Due North" },
  东北: { zh: "东北", tw: "東北", en: "Northeast" },
  正东: { zh: "正东", tw: "正東", en: "Due East" },
  东南: { zh: "东南", tw: "東南", en: "Southeast" },
  正南: { zh: "正南", tw: "正南", en: "Due South" },
  西南: { zh: "西南", tw: "西南", en: "Southwest" },
  正西: { zh: "正西", tw: "正西", en: "Due West" },
  西北: { zh: "西北", tw: "西北", en: "Northwest" },
  // getChong 使用的简写方位
  北:   { zh: "北",   tw: "北",   en: "North" },
  东:   { zh: "东",   tw: "東",   en: "East" },
  南:   { zh: "南",   tw: "南",   en: "South" },
  西:   { zh: "西",   tw: "西",   en: "West" },
};

// ===== 节气 =====
export interface SolarTerm {
  name: L;
  month: number; // 公历月份（约数）
  day: number;   // 公历日（约数）
  desc: L;
}

export const SOLAR_TERMS: SolarTerm[] = [
  { name: { zh: "小寒", tw: "小寒", en: "Minor Cold (Xiaohan)" },  month: 1,  day: 6,  desc: { zh: "天气渐寒，万物收藏", tw: "天氣漸寒，萬物收藏", en: "Growing cold; all things turn inward" } },
  { name: { zh: "大寒", tw: "大寒", en: "Major Cold (Dahan)" },    month: 1,  day: 20, desc: { zh: "一年中最冷的时节", tw: "一年中最冷的時節", en: "The coldest season of the year" } },
  { name: { zh: "立春", tw: "立春", en: "Start of Spring (Lichun)" }, month: 2,  day: 4,  desc: { zh: "春季开始，万象更新", tw: "春季開始，萬象更新", en: "Spring begins; everything renews" } },
  { name: { zh: "雨水", tw: "雨水", en: "Rain Water (Yushui)" },    month: 2,  day: 19, desc: { zh: "降雨增多，气温回升", tw: "降雨增多，氣溫回升", en: "Rains increase; temperatures rise" } },
  { name: { zh: "惊蛰", tw: "驚蟄", en: "Awakening of Insects (Jingzhe)" }, month: 3,  day: 6,  desc: { zh: "春雷始鸣，蛰虫复苏", tw: "春雷始鳴，蟄蟲復甦", en: "Spring thunder wakes hibernating creatures" } },
  { name: { zh: "春分", tw: "春分", en: "Spring Equinox (Chunfen)" }, month: 3,  day: 21, desc: { zh: "昼夜等长，阴阳平衡", tw: "晝夜等長，陰陽平衡", en: "Equal day and night; yin and yang balance" } },
  { name: { zh: "清明", tw: "清明", en: "Pure Brightness (Qingming)" }, month: 4,  day: 5,  desc: { zh: "天清地明，祭祖踏青", tw: "天清地明，祭祖踏青", en: "Clear and bright; tomb-sweeping and outings" } },
  { name: { zh: "谷雨", tw: "穀雨", en: "Grain Rain (Guyu)" },      month: 4,  day: 20, desc: { zh: "雨生百谷，播种时节", tw: "雨生百穀，播種時節", en: "Rain nurtures the grains; sowing season" } },
  { name: { zh: "立夏", tw: "立夏", en: "Start of Summer (Lixia)" }, month: 5,  day: 6,  desc: { zh: "夏季开始，气温升高", tw: "夏季開始，氣溫升高", en: "Summer begins; temperatures climb" } },
  { name: { zh: "小满", tw: "小滿", en: "Grain Buds (Xiaoman)" },   month: 5,  day: 21, desc: { zh: "小麦灌浆，麦粒渐满", tw: "小麥灌漿，麥粒漸滿", en: "Wheat fills out; grains slowly plump" } },
  { name: { zh: "芒种", tw: "芒種", en: "Grain in Ear (Mangzhong)" }, month: 6,  day: 6,  desc: { zh: "麦类收割，播种忙碌", tw: "麥類收割，播種忙碌", en: "Wheat harvest; a busy time for sowing" } },
  { name: { zh: "夏至", tw: "夏至", en: "Summer Solstice (Xiazhi)" }, month: 6,  day: 21, desc: { zh: "一年白昼最长", tw: "一年白晝最長", en: "The longest daylight of the year" } },
  { name: { zh: "小暑", tw: "小暑", en: "Minor Heat (Xiaoshu)" },   month: 7,  day: 7,  desc: { zh: "天气渐热，尚未酷暑", tw: "天氣漸熱，尚未酷暑", en: "Growing hot, but not yet sweltering" } },
  { name: { zh: "大暑", tw: "大暑", en: "Major Heat (Dashu)" },     month: 7,  day: 23, desc: { zh: "一年最热的时节", tw: "一年最熱的時節", en: "The hottest season of the year" } },
  { name: { zh: "立秋", tw: "立秋", en: "Start of Autumn (Liqiu)" }, month: 8,  day: 7,  desc: { zh: "秋季开始，暑气渐消", tw: "秋季開始，暑氣漸消", en: "Autumn begins; the heat recedes" } },
  { name: { zh: "处暑", tw: "處暑", en: "End of Heat (Chushu)" },   month: 8,  day: 23, desc: { zh: "暑气结束，天气转凉", tw: "暑氣結束，天氣轉涼", en: "Heat ends; the weather turns cool" } },
  { name: { zh: "白露", tw: "白露", en: "White Dew (Bailu)" },      month: 9,  day: 8,  desc: { zh: "露凝而白，天气转凉", tw: "露凝而白，天氣轉涼", en: "Dew turns white; the weather cools" } },
  { name: { zh: "秋分", tw: "秋分", en: "Autumn Equinox (Qiufen)" }, month: 9,  day: 23, desc: { zh: "昼夜等长，秋高气爽", tw: "晝夜等長，秋高氣爽", en: "Equal day and night; crisp autumn air" } },
  { name: { zh: "寒露", tw: "寒露", en: "Cold Dew (Hanlu)" },       month: 10, day: 8,  desc: { zh: "露气寒冷，百草将枯", tw: "露氣寒冷，百草將枯", en: "Dew turns cold; grasses begin to wither" } },
  { name: { zh: "霜降", tw: "霜降", en: "Frost's Descent (Shuangjiang)" }, month: 10, day: 23, desc: { zh: "露水凝成霜，天气渐寒", tw: "露水凝成霜，天氣漸寒", en: "Dew freezes into frost; growing cold" } },
  { name: { zh: "立冬", tw: "立冬", en: "Start of Winter (Lidong)" }, month: 11, day: 7,  desc: { zh: "冬季开始，万物收藏", tw: "冬季開始，萬物收藏", en: "Winter begins; all things are stored away" } },
  { name: { zh: "小雪", tw: "小雪", en: "Minor Snow (Xiaoxue)" },   month: 11, day: 22, desc: { zh: "天气寒冷，降雪渐多", tw: "天氣寒冷，降雪漸多", en: "Cold weather; snowfall increases" } },
  { name: { zh: "大雪", tw: "大雪", en: "Major Snow (Daxue)" },     month: 12, day: 7,  desc: { zh: "降雪增多，天气严寒", tw: "降雪增多，天氣嚴寒", en: "Heavy snow; bitterly cold" } },
  { name: { zh: "冬至", tw: "冬至", en: "Winter Solstice (Dongzhi)" }, month: 12, day: 22, desc: { zh: "一年白昼最短，阴极阳生", tw: "一年白晝最短，陰極陽生", en: "Shortest daylight; yang reborn from peak yin" } },
];

// ===== 宜忌事项 =====
export interface AlmanacEvent {
  key: string;   // 中文 key（用于匹配、宜忌数组取值，不翻译）
  name: L;
  category: "婚嫁" | "出行" | "财务" | "建造" | "祭祀" | "日常" | "农事";
  desc: L;  // 白话文解释
  icon: string;
}

export const ALMANAC_EVENTS: AlmanacEvent[] = [
  // 婚嫁类
  { key: "嫁娶", name: { zh: "嫁娶", tw: "嫁娶", en: "Marriage" }, category: "婚嫁", icon: "💍", desc: { zh: "适合婚嫁、举办婚礼，择此日成婚有益于夫妻感情和谐、白头偕老。", tw: "適合婚嫁、舉辦婚禮，擇此日成婚有益於夫妻感情和諧、白頭偕老。", en: "Good for weddings and marriage; choosing this day fosters harmony and a lasting union." } },
  { key: "订婚", name: { zh: "订婚", tw: "訂婚", en: "Engagement" }, category: "婚嫁", icon: "💒", desc: { zh: "适合下聘礼、订婚，此日确立婚约，缘分长久。", tw: "適合下聘禮、訂婚，此日確立婚約，緣分長久。", en: "Good for betrothal gifts and engagement; a bond sealed today endures." } },
  { key: "合帐", name: { zh: "合帐", tw: "合帳", en: "Setting Up the Bridal Chamber" }, category: "婚嫁", icon: "🛏", desc: { zh: "新婚夫妇合房、铺设婚床，适合此日进行。", tw: "新婚夫婦合房、鋪設婚床，適合此日進行。", en: "Good for newlyweds to share a room and prepare the bridal bed." } },
  // 出行类
  { key: "出行", name: { zh: "出行", tw: "出行", en: "Travel" }, category: "出行", icon: "✈️", desc: { zh: "适合外出旅行、长途出差，此日出门诸事顺遂，平安归来。", tw: "適合外出旅行、長途出差，此日出門諸事順遂，平安歸來。", en: "Good for trips and long journeys; setting out today goes smoothly and you return safely." } },
  { key: "移徙", name: { zh: "搬家", tw: "搬家", en: "Moving House" }, category: "出行", icon: "🏠", desc: { zh: "适合搬家、乔迁新居，此日入住新家有利于家宅安宁、人丁兴旺。", tw: "適合搬家、喬遷新居，此日入住新家有利於家宅安寧、人丁興旺。", en: "Good for moving and relocating; settling into a new home today brings peace and a thriving household." } },
  { key: "入宅", name: { zh: "入宅", tw: "入宅", en: "Housewarming" }, category: "出行", icon: "🔑", desc: { zh: "新居落成后正式入住，选此日入宅可安稳家业、纳福迎祥。", tw: "新居落成後正式入住，選此日入宅可安穩家業、納福迎祥。", en: "Formally moving into a finished home; doing so today steadies the household and invites blessings." } },
  // 财务类
  { key: "开市", name: { zh: "开业", tw: "開業", en: "Business Opening" }, category: "财务", icon: "🏪", desc: { zh: "适合商铺开业、公司开张，此日起营业财源广进、生意兴隆。", tw: "適合商鋪開業、公司開張，此日起營業財源廣進、生意興隆。", en: "Good for opening a shop or launching a company; business begun today prospers and draws wealth." } },
  { key: "交易", name: { zh: "签约", tw: "簽約", en: "Signing Contracts" }, category: "财务", icon: "📝", desc: { zh: "适合签订合同、买卖交易，此日成交有利于双方获益、合作顺利。", tw: "適合簽訂合同、買賣交易，此日成交有利於雙方獲益、合作順利。", en: "Good for signing contracts and trading; deals closed today benefit both sides." } },
  { key: "纳财", name: { zh: "纳财", tw: "納財", en: "Receiving Wealth" }, category: "财务", icon: "💰", desc: { zh: "适合收账、投资理财，此日财运亨通，进财顺畅。", tw: "適合收帳、投資理財，此日財運亨通，進財順暢。", en: "Good for collecting payments and investing; fortune flows freely today." } },
  // 建造类
  { key: "动土", name: { zh: "动土", tw: "動土", en: "Breaking Ground" }, category: "建造", icon: "🔨", desc: { zh: "适合破土施工、盖房挖掘，此日动土地基稳固，施工顺利。", tw: "適合破土施工、蓋房挖掘，此日動土地基穩固，施工順利。", en: "Good for breaking ground and construction; foundations laid today stand firm." } },
  { key: "修造", name: { zh: "装修", tw: "裝修", en: "Renovation" }, category: "建造", icon: "🏗", desc: { zh: "适合翻修房屋、室内装修，此日开工有利于工程顺利、住宅平安。", tw: "適合翻修房屋、室內裝修，此日開工有利於工程順利、住宅平安。", en: "Good for remodeling and interior work; starting today keeps the project smooth and the home safe." } },
  { key: "安门", name: { zh: "安门窗", tw: "安門窗", en: "Installing Doors & Windows" }, category: "建造", icon: "🚪", desc: { zh: "适合安装大门、门窗，此日安门可辟邪纳福，家宅平安。", tw: "適合安裝大門、門窗，此日安門可辟邪納福，家宅平安。", en: "Good for fitting doors and windows; doing so today wards off ill and invites blessings." } },
  { key: "安床", name: { zh: "安床", tw: "安床", en: "Positioning the Bed" }, category: "建造", icon: "🛏", desc: { zh: "适合放置、移动卧床，此日安床有利于睡眠安稳、身体健康。", tw: "適合放置、移動臥床，此日安床有利於睡眠安穩、身體健康。", en: "Good for placing or moving a bed; doing so today aids restful sleep and health." } },
  // 祭祀类
  { key: "祭祀", name: { zh: "祭祀", tw: "祭祀", en: "Offering Sacrifice" }, category: "祭祀", icon: "🙏", desc: { zh: "适合拜神、祭祖，此日进行祭祀活动可得神明庇佑，祈福驱邪。", tw: "適合拜神、祭祖，此日進行祭祀活動可得神明庇佑，祈福驅邪。", en: "Good for worshiping deities and ancestors; rites today earn divine protection and ward off harm." } },
  { key: "祈福", name: { zh: "祈福", tw: "祈福", en: "Praying for Blessings" }, category: "祭祀", icon: "🌟", desc: { zh: "适合向神明许愿祈求，此日祈福心诚则灵，心愿易成。", tw: "適合向神明許願祈求，此日祈福心誠則靈，心願易成。", en: "Good for making wishes to the divine; sincere prayers today are readily fulfilled." } },
  { key: "斋醮", name: { zh: "做法事", tw: "做法事", en: "Holding Religious Rites" }, category: "祭祀", icon: "🕯", desc: { zh: "适合举行宗教法事、斋戒祭典，此日进行效果更为灵验。", tw: "適合舉行宗教法事、齋戒祭典，此日進行效果更為靈驗。", en: "Good for religious ceremonies and fasting rites; they are most efficacious today." } },
  // 日常类
  { key: "沐浴", name: { zh: "沐浴", tw: "沐浴", en: "Bathing" }, category: "日常", icon: "🛁", desc: { zh: "适合洗头洗澡，此日净身可洗去晦气，焕发新运。", tw: "適合洗頭洗澡，此日淨身可洗去晦氣，煥發新運。", en: "Good for washing and bathing; cleansing today rinses away bad luck and renews fortune." } },
  { key: "理发", name: { zh: "理发", tw: "理髮", en: "Haircut" }, category: "日常", icon: "✂️", desc: { zh: "适合剪发、理容，此日整理仪容可提升气场、改变运势。", tw: "適合剪髮、理容，此日整理儀容可提升氣場、改變運勢。", en: "Good for cutting hair and grooming; tidying your appearance today lifts your aura and luck." } },
  { key: "求医", name: { zh: "就医", tw: "就醫", en: "Seeking Medical Care" }, category: "日常", icon: "🏥", desc: { zh: "适合求医问诊，此日就医可得良医妙药，病情好转。", tw: "適合求醫問診，此日就醫可得良醫妙藥，病情好轉。", en: "Good for seeing a doctor; care sought today finds good physicians and recovery." } },
  { key: "开光", name: { zh: "开光", tw: "開光", en: "Consecration" }, category: "日常", icon: "💫", desc: { zh: "适合为物件、饰品进行开光，使其具有灵气与保护力。", tw: "適合為物件、飾品進行開光，使其具有靈氣與保護力。", en: "Good for consecrating objects and charms, imbuing them with spiritual power." } },
  // 农事类
  { key: "播种", name: { zh: "播种", tw: "播種", en: "Sowing Seeds" }, category: "农事", icon: "🌱", desc: { zh: "适合播种育苗，此日播下的种子成活率高，生长旺盛。", tw: "適合播種育苗，此日播下的種子成活率高，生長旺盛。", en: "Good for sowing and raising seedlings; seeds planted today take root and thrive." } },
  { key: "栽种", name: { zh: "种植", tw: "種植", en: "Planting" }, category: "农事", icon: "🌿", desc: { zh: "适合移栽花木，此日种下的植物根深叶茂、生机勃勃。", tw: "適合移栽花木，此日種下的植物根深葉茂、生機勃勃。", en: "Good for transplanting flowers and trees; plants set today grow deep-rooted and lush." } },
  { key: "牧养", name: { zh: "饲养", tw: "飼養", en: "Raising Livestock" }, category: "农事", icon: "🐄", desc: { zh: "适合购置牲畜、开始饲养，此日起养殖六畜兴旺。", tw: "適合購置牲畜、開始飼養，此日起養殖六畜興旺。", en: "Good for acquiring livestock and starting to raise them; herds begun today flourish." } },
  // 忌讳类
  { key: "作灶", name: { zh: "安灶", tw: "安灶", en: "Setting the Stove" }, category: "日常", icon: "🍳", desc: { zh: "不宜移动、安置厨灶，此日作灶恐引起家宅不宁、饮食不安。", tw: "不宜移動、安置廚灶，此日作灶恐引起家宅不寧、飲食不安。", en: "Avoid moving or setting the kitchen stove; doing so today may unsettle the home and meals." } },
  { key: "治病", name: { zh: "治病", tw: "治病", en: "Medical Treatment" }, category: "日常", icon: "💊", desc: { zh: "不宜看诊吃药，此日用药恐有反效果，建议另择吉日就医。", tw: "不宜看診吃藥，此日用藥恐有反效果，建議另擇吉日就醫。", en: "Avoid consultations and medication; treatment today may backfire — choose another day." } },
  { key: "词讼", name: { zh: "打官司", tw: "打官司", en: "Litigation" }, category: "日常", icon: "⚖️", desc: { zh: "不宜兴讼、诉诸法律，此日纠纷难解，理不直说不清。", tw: "不宜興訟、訴諸法律，此日糾紛難解，理不直說不清。", en: "Avoid lawsuits and legal action; disputes today are hard to resolve and arguments unclear." } },
  { key: "赴任", name: { zh: "上任", tw: "上任", en: "Taking Office" }, category: "日常", icon: "💼", desc: { zh: "不宜赴任就职，此日新官上任恐难顺利，宜另择吉日。", tw: "不宜赴任就職，此日新官上任恐難順利，宜另擇吉日。", en: "Avoid taking up a new post; assuming office today may not go smoothly — pick another day." } },
];

// ===== 择日事项（用于择日筛选）=====
export interface SelectEvent {
  key: string;
  name: L;
  icon: string;
  color: string;
  requiredYi: string[];   // 需要"宜"包含的项
  avoidJi: string[];      // 需要"忌"不包含的项
}

export const SELECT_EVENTS: SelectEvent[] = [
  {
    key: "marriage", name: { zh: "结婚/订婚", tw: "結婚/訂婚", en: "Marriage / Engagement" }, icon: "💍", color: "#E91E8C",
    requiredYi: ["嫁娶", "订婚"], avoidJi: ["嫁娶"],
  },
  {
    key: "moving", name: { zh: "搬家/入宅", tw: "搬家/入宅", en: "Moving / Housewarming" }, icon: "🏠", color: "#2196F3",
    requiredYi: ["移徙", "入宅"], avoidJi: ["移徙"],
  },
  {
    key: "business", name: { zh: "开业/签约", tw: "開業/簽約", en: "Opening / Signing" }, icon: "🏪", color: "#FF9800",
    requiredYi: ["开市", "交易"], avoidJi: ["开市"],
  },
  {
    key: "renovation", name: { zh: "装修/动土", tw: "裝修/動土", en: "Renovation / Groundbreaking" }, icon: "🔨", color: "#795548",
    requiredYi: ["动土", "修造"], avoidJi: ["动土"],
  },
  {
    key: "travel", name: { zh: "出行/旅游", tw: "出行/旅遊", en: "Travel / Tourism" }, icon: "✈️", color: "#00BCD4",
    requiredYi: ["出行"], avoidJi: ["出行"],
  },
  {
    key: "worship", name: { zh: "祭祀/祈福", tw: "祭祀/祈福", en: "Worship / Blessings" }, icon: "🙏", color: "#9C27B0",
    requiredYi: ["祭祀", "祈福"], avoidJi: [],
  },
];

// ===== 时辰定义 =====
export interface HourPeriod {
  name: L;        // 时辰名（如 子时）
  zhi: string;    // 地支
  startHour: number;
  endHour: number;
  animal: ShengXiao;
}

export const HOUR_PERIODS: HourPeriod[] = [
  { name: { zh: "子时", tw: "子時", en: "Zi (23:00–01:00)" }, zhi: "子", startHour: 23, endHour: 1,  animal: "鼠" },
  { name: { zh: "丑时", tw: "丑時", en: "Chou (01:00–03:00)" }, zhi: "丑", startHour: 1,  endHour: 3,  animal: "牛" },
  { name: { zh: "寅时", tw: "寅時", en: "Yin (03:00–05:00)" }, zhi: "寅", startHour: 3,  endHour: 5,  animal: "虎" },
  { name: { zh: "卯时", tw: "卯時", en: "Mao (05:00–07:00)" }, zhi: "卯", startHour: 5,  endHour: 7,  animal: "兔" },
  { name: { zh: "辰时", tw: "辰時", en: "Chen (07:00–09:00)" }, zhi: "辰", startHour: 7,  endHour: 9,  animal: "龙" },
  { name: { zh: "巳时", tw: "巳時", en: "Si (09:00–11:00)" }, zhi: "巳", startHour: 9,  endHour: 11, animal: "蛇" },
  { name: { zh: "午时", tw: "午時", en: "Wu (11:00–13:00)" }, zhi: "午", startHour: 11, endHour: 13, animal: "马" },
  { name: { zh: "未时", tw: "未時", en: "Wei (13:00–15:00)" }, zhi: "未", startHour: 13, endHour: 15, animal: "羊" },
  { name: { zh: "申时", tw: "申時", en: "Shen (15:00–17:00)" }, zhi: "申", startHour: 15, endHour: 17, animal: "猴" },
  { name: { zh: "酉时", tw: "酉時", en: "You (17:00–19:00)" }, zhi: "酉", startHour: 17, endHour: 19, animal: "鸡" },
  { name: { zh: "戌时", tw: "戌時", en: "Xu (19:00–21:00)" }, zhi: "戌", startHour: 19, endHour: 21, animal: "狗" },
  { name: { zh: "亥时", tw: "亥時", en: "Hai (21:00–23:00)" }, zhi: "亥", startHour: 21, endHour: 23, animal: "猪" },
];

// ===== 黄道吉日 =====
// 建除十二神：建、除、满、平、定、执、破、危、成、收、开、闭
export const JIAN_CHU_12 = ["建", "除", "满", "平", "定", "执", "破", "危", "成", "收", "开", "闭"] as const;

// 建除十二神名称本地化（短传统术语：tw=繁体，en=拼音）
export const JIANSHEN_L: Record<string, L> = {
  建: { zh: "建", tw: "建", en: "Jian" },
  除: { zh: "除", tw: "除", en: "Chu" },
  满: { zh: "满", tw: "滿", en: "Man" },
  平: { zh: "平", tw: "平", en: "Ping" },
  定: { zh: "定", tw: "定", en: "Ding" },
  执: { zh: "执", tw: "執", en: "Zhi" },
  破: { zh: "破", tw: "破", en: "Po" },
  危: { zh: "危", tw: "危", en: "Wei" },
  成: { zh: "成", tw: "成", en: "Cheng" },
  收: { zh: "收", tw: "收", en: "Shou" },
  开: { zh: "开", tw: "開", en: "Kai" },
  闭: { zh: "闭", tw: "閉", en: "Bi" },
};

// 黄道：除、危、定、执、成、开（吉）
// 黑道：建、满、平、破、收、闭（凶）
export const HUANGDAO_JI = new Set(["除", "危", "定", "执", "成", "开"]);
export const HEIDAO_XIONG = new Set(["建", "满", "平", "破", "收", "闭"]);

// ===== 彭祖百忌（天干/地支各对应的禁忌）=====
export const PENGZU_TIANGAN: Record<string, L> = {
  甲: { zh: "甲不开仓，财物耗散", tw: "甲不開倉，財物耗散", en: "On Jia days, do not open the granary, lest wealth scatter." },
  乙: { zh: "乙不栽植，千株不长", tw: "乙不栽植，千株不長", en: "On Yi days, do not plant, lest nothing takes root." },
  丙: { zh: "丙不修灶，必见灾殃", tw: "丙不修灶，必見災殃", en: "On Bing days, do not repair the stove, lest misfortune follow." },
  丁: { zh: "丁不剃头，头主不祥", tw: "丁不剃頭，頭主不祥", en: "On Ding days, do not cut hair, lest ill befall the head of the house." },
  戊: { zh: "戊不受田，田主不祥", tw: "戊不受田，田主不祥", en: "On Wu days, do not take on land, lest harm come to the landowner." },
  己: { zh: "己不破券，二比并亡", tw: "己不破券，二比並亡", en: "On Ji days, do not tear up contracts, lest both parties suffer loss." },
  庚: { zh: "庚不经络，织机虚张", tw: "庚不經絡，織機虛張", en: "On Geng days, do not warp the loom, lest the work come to nothing." },
  辛: { zh: "辛不合酱，主人不尝", tw: "辛不合醬，主人不嘗", en: "On Xin days, do not make sauces, lest the master never taste them." },
  壬: { zh: "壬不泱水，更难提防", tw: "壬不汰水，更難提防", en: "On Ren days, do not dam water, lest danger become hard to guard against." },
  癸: { zh: "癸不词讼，理弱敌强", tw: "癸不詞訟，理弱敵強", en: "On Gui days, do not litigate, lest your case prove weak against a strong foe." },
};

export const PENGZU_DIZHI: Record<string, L> = {
  子: { zh: "子不问卜，自惹祸殃", tw: "子不問卜，自惹禍殃", en: "On Zi days, do not seek divination, lest you invite misfortune." },
  丑: { zh: "丑不冠带，主不还乡", tw: "丑不冠帶，主不還鄉", en: "On Chou days, do not don ceremonial dress, lest the master never return home." },
  寅: { zh: "寅不祭祀，神鬼不尝", tw: "寅不祭祀，神鬼不嘗", en: "On Yin days, do not offer sacrifice, lest gods and spirits decline it." },
  卯: { zh: "卯不穿井，水泉不香", tw: "卯不穿井，水泉不香", en: "On Mao days, do not dig a well, lest the spring water be foul." },
  辰: { zh: "辰不哭泣，必主重丧", tw: "辰不哭泣，必主重喪", en: "On Chen days, do not weep, lest a grave loss follow." },
  巳: { zh: "巳不远行，财物伏藏", tw: "巳不遠行，財物伏藏", en: "On Si days, do not travel far, lest your wealth be hidden away." },
  午: { zh: "午不苫盖，屋主更张", tw: "午不苫蓋，屋主更張", en: "On Wu days, do not thatch a roof, lest the household be upended." },
  未: { zh: "未不服药，毒气入肠", tw: "未不服藥，毒氣入腸", en: "On Wei days, do not take medicine, lest poison enter the body." },
  申: { zh: "申不安床，鬼祟入房", tw: "申不安床，鬼祟入房", en: "On Shen days, do not set the bed, lest spirits enter the room." },
  酉: { zh: "酉不会客，醉坐颠狂", tw: "酉不會客，醉坐顛狂", en: "On You days, do not receive guests, lest drink lead to wild conduct." },
  戌: { zh: "戌不吃犬，作怪上床", tw: "戌不吃犬，作怪上床", en: "On Xu days, do not eat dog meat, lest strange things disturb your sleep." },
  亥: { zh: "亥不嫁娶，不利新郎", tw: "亥不嫁娶，不利新郎", en: "On Hai days, do not marry, lest it bode ill for the groom." },
};

// ===== 吉神方位基础规则 =====
// 财神方位基于月令（简化：以月支推算）
export const CAISHEN_DIRECTION: Record<string, string> = {
  子: "正北", 丑: "东北", 寅: "正东", 卯: "东南",
  辰: "正南", 巳: "正南", 午: "正南", 未: "西南",
  申: "正西", 酉: "西北", 戌: "正北", 亥: "东北",
};

export const XISHEN_DIRECTION: Record<string, string> = {
  子: "东南", 丑: "正东", 寅: "东北", 卯: "正北",
  辰: "西北", 巳: "正西", 午: "西南", 未: "正南",
  申: "东南", 酉: "正东", 戌: "东北", 亥: "正北",
};

// ===== 宜忌组合规则（按建除十二神）=====
// 不同的建除值对应不同的基础宜忌（值为中文 key，与 ALMANAC_EVENTS.key 对应）
export const JIANSHEN_YIJI: Record<string, { yi: string[]; ji: string[] }> = {
  建: {
    yi: ["祭祀", "祈福", "出行", "开市", "交易", "求医"],
    ji: ["嫁娶", "动土", "移徙", "安床", "修造"],
  },
  除: {
    yi: ["沐浴", "理发", "祭祀", "求医", "出行", "嫁娶"],
    ji: ["作灶", "安门", "修造"],
  },
  满: {
    yi: ["嫁娶", "移徙", "开市", "纳财", "祈福", "栽种"],
    ji: ["词讼", "动土", "破土"],
  },
  平: {
    yi: ["出行", "交易", "纳财", "祭祀", "开市"],
    ji: ["嫁娶", "动土", "安床"],
  },
  定: {
    yi: ["嫁娶", "开市", "移徙", "动土", "祈福", "出行", "纳财"],
    ji: ["词讼", "安葬"],
  },
  执: {
    yi: ["祭祀", "祈福", "求医", "栽种", "牧养"],
    ji: ["嫁娶", "开市", "移徙", "出行"],
  },
  破: {
    yi: ["求医", "词讼"],
    ji: ["嫁娶", "动土", "移徙", "开市", "出行", "安床", "纳财"],
  },
  危: {
    yi: ["祭祀", "祈福", "动土", "开市", "交易"],
    ji: ["出行", "移徙"],
  },
  成: {
    yi: ["嫁娶", "开市", "移徙", "动土", "出行", "祈福", "纳财", "栽种"],
    ji: ["词讼", "治病"],
  },
  收: {
    yi: ["纳财", "栽种", "牧养", "理发"],
    ji: ["嫁娶", "出行", "移徙"],
  },
  开: {
    yi: ["嫁娶", "开市", "移徙", "出行", "纳财", "动土", "祭祀", "祈福"],
    ji: ["安葬", "作灶"],
  },
  闭: {
    yi: ["祭祀", "安门", "作灶"],
    ji: ["嫁娶", "出行", "移徙", "开市", "求医"],
  },
};

// ===== 传统节日 =====
export interface TraditionalFestival {
  lunarMonth: number;
  lunarDay: number;
  name: L;
  desc: L;
}

export const LUNAR_FESTIVALS: TraditionalFestival[] = [
  { lunarMonth: 1,  lunarDay: 1,  name: { zh: "春节", tw: "春節", en: "Spring Festival" }, desc: { zh: "农历新年，最重要的传统节日", tw: "農曆新年，最重要的傳統節日", en: "Lunar New Year, the most important traditional festival" } },
  { lunarMonth: 1,  lunarDay: 15, name: { zh: "元宵节", tw: "元宵節", en: "Lantern Festival" }, desc: { zh: "赏花灯猜灯谜，吃元宵", tw: "賞花燈猜燈謎，吃元宵", en: "Admiring lanterns, solving riddles, eating sweet dumplings" } },
  { lunarMonth: 2,  lunarDay: 2,  name: { zh: "龙抬头", tw: "龍抬頭", en: "Dragon Head-Raising Day" }, desc: { zh: "龙头节，剃头迎祥瑞", tw: "龍頭節，剃頭迎祥瑞", en: "The Dragon Head festival; haircuts to welcome good fortune" } },
  { lunarMonth: 4,  lunarDay: 4,  name: { zh: "清明节", tw: "清明節", en: "Qingming Festival" }, desc: { zh: "扫墓祭祖，踏青游春", tw: "掃墓祭祖，踏青遊春", en: "Tomb-sweeping for ancestors and spring outings" } },
  { lunarMonth: 5,  lunarDay: 5,  name: { zh: "端午节", tw: "端午節", en: "Dragon Boat Festival" }, desc: { zh: "赛龙舟、吃粽子，驱邪纳福", tw: "賽龍舟、吃粽子，驅邪納福", en: "Dragon boat races and rice dumplings to ward off evil" } },
  { lunarMonth: 7,  lunarDay: 7,  name: { zh: "七夕节", tw: "七夕節", en: "Qixi Festival" }, desc: { zh: "牛郎织女相会，乞巧节", tw: "牛郎織女相會，乞巧節", en: "The Cowherd and Weaver Girl reunite; the festival of skills" } },
  { lunarMonth: 7,  lunarDay: 15, name: { zh: "中元节", tw: "中元節", en: "Ghost Festival" }, desc: { zh: "鬼节，祭祖祀鬼", tw: "鬼節，祭祖祀鬼", en: "The Ghost Festival; honoring ancestors and spirits" } },
  { lunarMonth: 8,  lunarDay: 15, name: { zh: "中秋节", tw: "中秋節", en: "Mid-Autumn Festival" }, desc: { zh: "赏月团圆，吃月饼", tw: "賞月團圓，吃月餅", en: "Moon-gazing reunions and mooncakes" } },
  { lunarMonth: 9,  lunarDay: 9,  name: { zh: "重阳节", tw: "重陽節", en: "Double Ninth Festival" }, desc: { zh: "登高赏菊，敬老尊贤", tw: "登高賞菊，敬老尊賢", en: "Climbing heights, admiring chrysanthemums, honoring elders" } },
  { lunarMonth: 12, lunarDay: 8,  name: { zh: "腊八节", tw: "臘八節", en: "Laba Festival" }, desc: { zh: "喝腊八粥，祈福丰收", tw: "喝臘八粥，祈福豐收", en: "Laba porridge and prayers for a good harvest" } },
  { lunarMonth: 12, lunarDay: 23, name: { zh: "小年", tw: "小年", en: "Little New Year" }, desc: { zh: "祭灶神，扫尘迎新", tw: "祭灶神，掃塵迎新", en: "Honoring the Kitchen God and cleaning for the new year" } },
  { lunarMonth: 12, lunarDay: 30, name: { zh: "除夕", tw: "除夕", en: "New Year's Eve" }, desc: { zh: "守岁团圆，辞旧迎新", tw: "守歲團圓，辭舊迎新", en: "A reunion vigil to see out the old year and welcome the new" } },
];

// ===== 星期 =====
export const WEEK_DAYS = ["日", "一", "二", "三", "四", "五", "六"] as const;

// ===== 综合评分权重 =====
export const SCORE_WEIGHTS = {
  huangdao: 2.0,    // 黄道吉日 +2
  heidao: -2.0,     // 黑道凶日 -2
  yiCount: 0.3,     // 每个宜事项 +0.3
  jiCount: -0.2,    // 每个忌事项 -0.2
  festival: 0.5,    // 传统节日 +0.5
  sanhe: 1.0,       // 三合生肖 +1
  liuhe: 0.5,       // 六合生肖 +0.5
  chong: -3.0,      // 相冲生肖 -3
};

// ===== 宜忌详情文字说明 =====
export const YI_TIPS: Record<string, L> = {
  嫁娶: { zh: "吉日良辰，此日嫁娶婚配最为相宜，夫妻恩爱，家道兴旺。", tw: "吉日良辰，此日嫁娶婚配最為相宜，夫妻恩愛，家道興旺。", en: "An auspicious day, most fitting for marriage; love deepens and the household prospers." },
  开市: { zh: "财星高照，此日开张营业必迎财源，生意兴隆通四海。", tw: "財星高照，此日開張營業必迎財源，生意興隆通四海。", en: "The wealth star shines; opening for business today draws fortune and far-reaching success." },
  移徙: { zh: "此日迁居入新家，地气相合，家宅安宁，人丁旺盛。", tw: "此日遷居入新家，地氣相合，家宅安寧，人丁旺盛。", en: "Moving into a new home today aligns the earth's energy, bringing peace and a thriving family." },
  动土: { zh: "土气得令，此日动土施工，地基稳固，工程顺利。", tw: "土氣得令，此日動土施工，地基穩固，工程順利。", en: "Earth energy prevails; breaking ground today sets firm foundations and smooth construction." },
  出行: { zh: "此日外出远行一路平安，逢凶化吉，顺风顺水。", tw: "此日外出遠行一路平安，逢凶化吉，順風順水。", en: "Travel today is safe all the way; ill turns to good and the journey goes smoothly." },
  祈福: { zh: "神明感应，此日斋心祈福，心诚则灵，愿望易成真。", tw: "神明感應，此日齋心祈福，心誠則靈，願望易成真。", en: "The divine responds; sincere prayer today is answered and wishes readily come true." },
  祭祀: { zh: "此日祭祀神明先祖，礼仪完备，保佑平安顺遂。", tw: "此日祭祀神明先祖，禮儀完備，保佑平安順遂。", en: "Offerings to gods and ancestors today are duly observed, bringing peace and protection." },
  纳财: { zh: "财运亨通，此日收账投资，进财顺畅，积累财富。", tw: "財運亨通，此日收帳投資，進財順暢，積累財富。", en: "Fortune flows; collecting and investing today brings steady income and growing wealth." },
  修造: { zh: "此日装修建造，五行得助，工事顺利，住宅平安。", tw: "此日裝修建造，五行得助，工事順利，住宅平安。", en: "Building and renovating today is aided by the five elements; work goes well and the home stays safe." },
};

// ===== 分享文案 =====
export const SHARE_TITLES = [
  "我找到了一个超棒的吉日，分享给你看看！",
  "黄历推荐：这天天时地利，宜谋大事！",
  "为你找到了命中注定的好日子 ✨",
];
