/**
 * 批次Q5：中文GEO高搜索量内容
 * - 生肖2026年运全12个
 * - 紫微斗数入门（补充）
 * - 塔罗牌逆位含义（中文）
 * - 八字合婚完整指南
 * - 每日一卡抽牌引导
 */
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);

const zodiacData = [
  { animal: "鼠", en: "Rat", year: [1948,1960,1972,1984,1996,2008,2020], luck2026: "驿马流年，变动中藏机遇", love: "单身鼠人有望遇见心动对象，已婚需加强沟通", career: "适合主动出击，变换跑道的好时机", wealth: "偏财运活跃，但需防冲动投资" },
  { animal: "牛", en: "Ox", year: [1949,1961,1973,1985,1997,2009,2021], luck2026: "太岁同临，稳中求变是关键", love: "感情稳固，有望迈入婚姻的一年", career: "贵人运旺，适合借力发力", wealth: "财运平稳，偏向理财与储蓄" },
  { animal: "虎", en: "Tiger", year: [1950,1962,1974,1986,1998,2010,2022], luck2026: "事业运强劲，冲劲十足", love: "桃花旺盛，恋爱机会多", career: "有大展拳脚的空间，注意锋芒太露", wealth: "正财运强，主动出击有收获" },
  { animal: "兔", en: "Rabbit", year: [1951,1963,1975,1987,1999,2011,2023], luck2026: "贵人扶持，低调行事最佳", love: "感情甜蜜，适合深化感情或步入婚姻", career: "适合幕后操作，避免高调", wealth: "有意外之财，但需提防漏财" },
  { animal: "龙", en: "Dragon", year: [1952,1964,1976,1988,2000,2012,2024], luck2026: "太岁值年后首年，全面开花之势", love: "桃花强劲，感情线活跃", career: "大展宏图的理想之年，把握机遇", wealth: "财运旺盛，投资时机好" },
  { animal: "蛇", en: "Snake", year: [1953,1965,1977,1989,2001,2013,2025], luck2026: "太岁刚过，休养生息中积累实力", love: "感情需要更多耐心与经营", career: "稳定发展，不宜冒进", wealth: "稳健为主，不适合高风险投资" },
  { animal: "马", en: "Horse", year: [1954,1966,1978,1990,2002,2014,2026], luck2026: "本命年到来，吉星高照！戴红绳保平安", love: "感情运有起伏，需主动化解误会", career: "事业有突破性进展的可能", wealth: "正财偏财均旺，但本命年需注意守财" },
  { animal: "羊", en: "Goat", year: [1955,1967,1979,1991,2003,2015,2027], luck2026: "贵人运上升，团队合作有成效", love: "旧情人回归或遇见老朋友转化的缘分", career: "适合合作项目，单打独斗效果有限", wealth: "财运中规中矩，需量入为出" },
  { animal: "猴", en: "Monkey", year: [1956,1968,1980,1992,2004,2016,2028], luck2026: "灵活应变是最大优势，变局中求胜", love: "感情生活精彩，需防花心或多角关系", career: "创新思维受到认可，适合跨界发展", wealth: "偏财运旺，创业投资均有机会" },
  { animal: "鸡", en: "Rooster", year: [1957,1969,1981,1993,2005,2017,2029], luck2026: "运势稳步提升，努力必见回报", love: "缘分水到渠成，不需过分强求", career: "专业能力被看见，升职加薪有望", wealth: "正财运踏实，储蓄计划有成效" },
  { animal: "狗", en: "Dog", year: [1958,1970,1982,1994,2006,2018,2030], luck2026: "运势回暖，多方面都有好消息", love: "感情稳定，家庭关系融洽", career: "坚持与踏实带来突破", wealth: "财运稳中有升，适合长期规划" },
  { animal: "猪", en: "Pig", year: [1959,1971,1983,1995,2007,2019,2031], luck2026: "贵人运极旺，贵人从四面八方而来", love: "感情甜蜜，有喜事临门之兆", career: "合作运极佳，贵人提携", wealth: "财运丰收，正财偏财双旺" }
];

const zodiacPosts = zodiacData.map(z => ({
  slug: `${z.en.toLowerCase()}-zodiac-2026-fortune`,
  category: "horoscope",
  title: `属${z.animal}2026年运势完整解析：事业财运感情全指南`,
  title_en: `Chinese Zodiac ${z.en} 2026 Annual Fortune: Career, Love & Wealth`,
  description: `属${z.animal}的朋友，2026年整体运势如何？事业、财运、感情、健康全面解析，附开运建议。`,
  keywords: [`属${z.animal}2026年运势`, `属${z.animal}运势`, `2026属${z.animal}`, `${z.en.toLowerCase()} zodiac 2026`, `生肖${z.animal}2026运程`],
  published_at: "2026-08-15",
  reading_time: 8,
  cta_href: "/bazi",
  cta_label: `🐾 免费AI八字测属${z.animal}2026运程`,
  cta_label_en: `Free AI Fortune Reading for ${z.en} 2026`,
  content: `<h2>属${z.animal}2026年总体运势</h2>
<p>出生年份：${z.year.join('、')}（以及更早/更晚的对应年份）</p>
<p><strong>2026年整体格局：</strong>${z.luck2026}</p>
<p>2026年（丙午年）马年到来，对属${z.animal}的朋友而言，这是一个充满变化与机遇交织的年份。了解自己在这一年的能量走向，能帮助你趋吉避凶、做出更明智的选择。</p>
<h2>事业运势</h2>
<p>${z.career}</p>
<p>建议在上半年（尤其1-3月）集中精力推进重要项目，下半年注重稳固成果。与他人合作时，清晰沟通是避免摩擦的关键。</p>
<h2>财富运势</h2>
<p>${z.wealth}</p>
<p>建议制定清晰的财务计划，区分"需要"与"想要"，在财运旺盛时注意储蓄，而不仅仅是消费。</p>
<h2>感情运势</h2>
<p>${z.love}</p>
<p>无论感情处于何种状态，2026年最重要的是真实表达——不要把话藏在心里，等待对方猜测你的需求。主动创造美好的约会或相处时光，感情会因此升温。</p>
<h2>健康与生活</h2>
<p>注意休息与工作的平衡，特别是在事业冲刺阶段，不要忽视身体发出的疲惫信号。肠胃和神经系统在压力较大时容易出现问题，保持规律的运动习惯会有显著帮助。</p>
<h2>开运建议</h2>
<ul>
<li>幸运颜色：参考个人出生年的五行属性选择</li>
<li>定期清理家居能量，保持生活空间整洁通透</li>
<li>多与积极进取的人为伍，能量互相提升</li>
<li>每月农历初一、十五适合做祈福和感恩冥想</li>
</ul>`
}));

const extraPosts = [
  {
    slug: "bazi-marriage-compatibility-guide",
    category: "bazi",
    title: "八字合婚完整指南：如何用生辰八字判断两人感情相合度",
    title_en: "BaZi Marriage Compatibility: How to Read the Four Pillars for Love Matches",
    description: "八字合婚是中国传统最精准的婚配方法之一。了解如何通过生辰八字分析两人的五行相生相克，判断感情基础和婚姻稳定性。",
    keywords: ["八字合婚","八字配对","八字合婚怎么看","八字婚配","生辰八字婚配","bazi marriage compatibility"],
    published_at: "2026-08-16",
    reading_time: 12,
    cta_href: "/bazi",
    cta_label: "🔮 免费AI八字合婚测算",
    cta_label_en: "Free AI BaZi Marriage Compatibility Reading",
    content: `<h2>什么是八字合婚？</h2>
<p>八字合婚，又称"四柱配对"，是中国传统命理学中最重要的婚配分析方法之一。它通过分析两个人各自的出生年、月、日、时（即"四柱八字"）所代表的五行力量，判断两人在能量上是否相互协调、互补相生，还是存在冲突与相克。</p>
<p>与西方星座配对不同，八字合婚关注的不仅是表面性格的契合，而是<strong>深层命理结构的能量关系</strong>——两人的日主（日柱天干，代表本人）是否相生、是否相克，各自的用神是否能在对方命局中得到支持。</p>
<h2>八字合婚的核心分析要素</h2>
<h3>1. 日主五行相合分析</h3>
<p>两人的日主天干之间的关系是合婚最基础的判断标准：</p>
<ul>
<li><strong>天干相合</strong>（如甲己合、乙庚合）：两人有天然的磁场吸引，容易产生好感</li>
<li><strong>五行相生</strong>（如甲木生丁火）：一方能滋养另一方，关系中有良性互动</li>
<li><strong>五行相克</strong>（如甲木克戊土）：不一定代表坏，关键看克的程度和命局能否承受</li>
</ul>
<h3>2. 用神与忌神的互动</h3>
<p>每个人的八字都有"用神"（命局最需要的五行）和"忌神"（命局最不需要的五行）。如果一方的日主五行恰好是另一方的用神，这段关系会令双方都感到舒适和滋养——这是非常吉利的合婚信号。</p>
<h3>3. 夫妻宫（日支）分析</h3>
<p>日柱的地支（日支）被称为"夫妻宫"，是判断婚姻状态最直接的宫位。两人夫妻宫之间是否刑冲克害，直接影响婚后的相处模式。</p>
<h3>4. 大运与流年的叠加</h3>
<p>两人当前所处的大运和流年，也会影响感情的时机——即使八字本身相合，如果当前大运流年对婚事不利，也可能遭遇波折。</p>
<h2>常见误解：相克就是不合婚？</h2>
<p>很多人看到八字有"克"就担心，但其实<strong>有克并不等于不能在一起</strong>。命理中有"夫妻相克但能制衡"的说法——关键在于克的力量是否均衡，是否在两人的命局中能形成良性制约而不是单方面损耗。</p>
<h2>AI八字合婚：现代应用</h2>
<p>传统八字合婚需要命理师根据两人完整四柱进行综合分析，耗时且门槛高。现代AI命理工具能够快速计算两人八字中的五行力量、用神互动和夫妻宫关系，给出初步的合婚参考——不能替代完整的命理咨询，但可以作为了解两人能量关系的有效起点。</p>`
  },
  {
    slug: "tarot-daily-one-card-how-to",
    category: "tarot",
    title: "每日一张塔罗牌：如何建立每日抽牌仪式与解读方法",
    title_en: "Daily One-Card Tarot: How to Build a Daily Drawing Practice",
    description: "每日一张塔罗牌是最简单也最有力的塔罗冥想方式。了解如何设置每日抽牌仪式、如何解读、如何记录，让塔罗成为你每天的精神指南。",
    keywords: ["每日一张塔罗","每日塔罗牌","塔罗每日一牌","每天抽一张塔罗","每日塔罗解读","daily tarot card","daily tarot reading"],
    published_at: "2026-08-17",
    reading_time: 8,
    cta_href: "/tarot",
    cta_label: "🃏 立即抽今日一张塔罗牌",
    cta_label_en: "Draw Your Daily Tarot Card Now",
    content: `<h2>为什么每日一张塔罗牌如此有效？</h2>
<p>在所有塔罗实践中，"每日一张牌"可能是最被低估却最具变革力的方法。它不需要复杂的牌阵，不需要精通所有78张牌的含义——你只需要每天早晨安静片刻，抽出一张牌，与它共处一整天。</p>
<p>这种实践的力量来自<strong>累积</strong>：一周的每日一牌告诉你这周的主题；一个月的记录揭示你生命中反复出现的模式；一年的每日一牌，是一部你的意识成长日志。</p>
<h2>建立每日抽牌仪式：七步法</h2>
<h3>第一步：选择固定时间</h3>
<p>早晨是大多数人的最佳选择——在新的一天开始前抽牌，设置意图。但如果你是夜猫子，睡前回顾当天并抽出明天的牌同样有效。关键是<strong>一致性</strong>。</p>
<h3>第二步：创造一个小仪式</h3>
<p>不需要繁琐。深呼吸三次，让心安静下来；也可以点一支蜡烛，或把牌放在手心感受片刻。仪式的价值在于告诉你的大脑："现在是内省时间。"</p>
<h3>第三步：用心洗牌，带着开放的问题</h3>
<p>在洗牌时，你可以在心里默问：<em>"今天我需要注意什么？"</em>或<em>"今天的能量主题是什么？"</em>——保持开放，而不是期待特定的答案。</p>
<h3>第四步：抽出一张，第一印象最重要</h3>
<p>把牌翻开后，先不查书——注意你的<strong>第一反应</strong>：这张牌让你感到什么？图像上什么最先吸引你的目光？这个第一印象往往是你潜意识最直接的回应。</p>
<h3>第五步：带着这张牌度过这一天</h3>
<p>你可以把牌放在桌上，或者拍下来作为手机壁纸。在一天中，观察：这张牌的主题在哪里出现了？是一次对话、一个决定、还是一种情绪？</p>
<h3>第六步：晚上简短记录</h3>
<p>花三到五分钟写下：今天抽到的牌、当时的第一印象、一天中这张牌如何在生活中显现。不需要写长篇大论，关键词式的记录已经足够。</p>
<h3>第七步：每周回顾一次</h3>
<p>周末花十分钟看一下这周出现的七张牌：有没有某个花色反复出现？某张特定的牌出现了多次？这些规律往往揭示你当前生命阶段最核心的主题。</p>
<h2>每日一牌：常见问题解答</h2>
<p><strong>每天都抽到同一张牌，是什么意思？</strong><br>这张牌代表的能量或议题，正在你的生命中非常活跃，等待你的关注。仔细看这张牌，认真思考它在你生活中指向的那个未被解决的主题。</p>
<p><strong>抽到"不好"的牌怎么办？</strong><br>没有"不好"的牌——只有需要注意的信息。死神牌出现在每日一牌中，不是预示死亡，而是提醒今天可能有某种"结束与转化"的主题值得关注。</p>
<p><strong>我可以为别人抽每日一牌吗？</strong><br>可以。如果你为家人或朋友抽牌，同样保持开放的意图——抽出的牌代表他们今天需要关注的能量，可以作为小小的礼物分享给他们。</p>`
  },
  {
    slug: "chinese-zodiac-compatibility-guide",
    category: "bazi",
    title: "中国生肖配对相合度完整指南：12生肖两两相合与相冲表",
    title_en: "Chinese Zodiac Compatibility: Complete Guide to 12 Animal Sign Matches",
    description: "十二生肖中哪些相合、哪些相冲？本文提供完整的生肖配对相合度指南，包括三合局、六合、六冲的详细解析，帮助你理解生肖关系的深层含义。",
    keywords: ["生肖配对","生肖相合","12生肖配对表","生肖相冲","生肖合不合","生肖配对相合度","chinese zodiac compatibility"],
    published_at: "2026-08-18",
    reading_time: 10,
    cta_href: "/bazi",
    cta_label: "🐉 测你与TA的生肖相合度",
    cta_label_en: "Check Your Zodiac Compatibility",
    content: `<h2>生肖配对：不只是属相喜不喜欢</h2>
<p>民间常说"属相合不合"决定两人缘分，但真正的生肖配对分析远比简单的"合/不合"复杂得多。在中国传统命理中，生肖（地支）之间的关系包括：三合局、六合、六冲、六害、六刑等多种形式，每种都有不同的能量含义。</p>
<h2>三合局：最强的相合关系</h2>
<p>三合局代表三个生肖在能量上形成完美的互补循环，是生肖关系中最和谐稳固的组合：</p>
<ul>
<li><strong>申子辰三合水局</strong>：猴+鼠+龙 — 智慧流动，思维活跃，互相激发</li>
<li><strong>亥卯未三合木局</strong>：猪+兔+羊 — 温柔包容，情感细腻，家庭和谐</li>
<li><strong>寅午戌三合火局</strong>：虎+马+狗 — 热情奔放，行动力强，事业互助</li>
<li><strong>巳酉丑三合金局</strong>：蛇+鸡+牛 — 细致严谨，实力互补，物质稳固</li>
</ul>
<h2>六合：缘分天注定的组合</h2>
<p>六合关系代表两个生肖之间有天然的磁场吸引和情感亲和力：</p>
<ul>
<li>鼠 + 牛（子丑合）</li>
<li>虎 + 猪（寅亥合）</li>
<li>兔 + 狗（卯戌合）</li>
<li>龙 + 鸡（辰酉合）</li>
<li>蛇 + 猴（巳申合）</li>
<li>马 + 羊（午未合）</li>
</ul>
<h2>六冲：最需注意的对立关系</h2>
<p>相冲不等于"绝对不能在一起"，但代表两人能量存在明显的对冲，需要更多的理解与包容：</p>
<ul>
<li>鼠 ↔ 马（子午冲）</li>
<li>牛 ↔ 羊（丑未冲）</li>
<li>虎 ↔ 猴（寅申冲）</li>
<li>兔 ↔ 鸡（卯酉冲）</li>
<li>龙 ↔ 狗（辰戌冲）</li>
<li>蛇 ↔ 猪（巳亥冲）</li>
</ul>
<h2>如何正确看待生肖配对</h2>
<p>生肖配对只是命理分析的入门参考，它仅考虑了出生年份（年柱地支），而一个人完整的八字由年、月、日、时四柱共同构成。两个生肖相冲的人，如果月柱或日柱相合，往往感情反而更深。</p>
<p>更重要的是：任何关系的成功，都依赖两个人的<strong>共同努力、相互理解和成长意愿</strong>，而不仅仅是出生年份。生肖配对是了解双方能量特质的起点，而不是终点。</p>`
  }
];

const allPosts = [...zodiacPosts, ...extraPosts];

async function main() {
  console.log(`📝 批次Q5：写入 ${allPosts.length} 篇中文GEO内容（生肖年运x12 + 八字合婚 + 每日一牌 + 生肖配对）...`);
  let success = 0, fail = 0;
  for (const post of allPosts) {
    const { error } = await supabase.from("mysticai_blog_posts").upsert(post, { onConflict: "slug" });
    if (error) { console.error(`  ❌ [${post.slug}]:`, error.message); fail++; }
    else { console.log(`  ✅ [${post.slug}]`); success++; }
  }
  console.log(`\n完成！成功: ${success}, 失败: ${fail}`);
}
main().catch(console.error);
