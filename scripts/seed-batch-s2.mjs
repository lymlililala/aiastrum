/**
 * 批次S2：中文重点内容
 * - 属龙完整解析（最热门生肖之一）
 * - 十二生肖月份运势2026（高频搜索）
 * - 周易卦象入门
 * - 塔罗配对：哪张牌代表爱人
 */
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);

const posts = [
  {
    slug: "dragon-zodiac-personality-complete-guide",
    category: "bazi",
    title: "属龙的人性格特点完整解析：属龙最佳配对与2026运势",
    title_en: "Dragon Zodiac Personality: Complete Guide to Dragon Character and 2026 Fortune",
    description: "属龙是十二生肖中最受瞩目的一个。了解属龙人的性格特点、感情配对、事业特质以及2026年马年的详细运程。",
    keywords: ["属龙性格","属龙配对","属龙人性格特点","属龙最佳配对","属龙2026","属龙运势","dragon zodiac personality","dragon chinese zodiac"],
    published_at: "2026-09-14",
    reading_time: 12,
    cta_href: "/bazi",
    cta_label: "🐉 AI测算你的完整龙命运程",
    cta_label_en: "AI Dragon Fortune Reading",
    content: `<h2>属龙：天生的领袖与梦想家</h2>
<p>在十二生肖中，龙是唯一一个神话中的生物——也是唯一被普遍视为祥瑞和权力象征的生肖。属龙的年份（1952、1964、1976、1988、2000、2012、2024……）出生的人，被认为天生带有特殊的命运能量。</p>
<p>这不是迷信，而是一种文化认同——属龙的人往往从小就感受到某种"被期待成就大事"的隐形压力，这既是动力，也是负担。</p>
<h2>属龙的核心性格特质</h2>
<h3>优势特质</h3>
<ul>
<li><strong>雄心壮志</strong>：属龙的人有着罕见的大志向，不愿满足于平庸，天生渴望在某个领域留下印记</li>
<li><strong>领导气场</strong>：自然散发出一种权威感和感召力，容易成为群体中的核心人物</li>
<li><strong>创造力强</strong>：思维活跃，擅长产生创新想法，特别在艺术、商业或思想领域</li>
<li><strong>慷慨大方</strong>：对所爱之人毫不吝啬，是真诚的给予者</li>
<li><strong>勇气十足</strong>：面对挑战不退缩，甚至会主动寻找挑战来证明自己</li>
</ul>
<h3>需要注意的特质</h3>
<ul>
<li><strong>骄傲</strong>：高自尊有时会变成傲慢，难以接受批评或失败</li>
<li><strong>不耐烦</strong>：期望快速见到结果，对慢速进展容易失去耐心</li>
<li><strong>过度理想主义</strong>：对自己和他人的期望过高，现实落差时容易失望</li>
<li><strong>独断</strong>：习惯按自己的方式做事，有时难以真正倾听他人意见</li>
</ul>
<h2>属龙的感情与配对</h2>
<h3>最佳配对</h3>
<p><strong>属鼠</strong>（子辰申三合水局的一环）：鼠的机智与龙的魄力形成完美互补，相互欣赏</p>
<p><strong>属猴</strong>：同样聪慧敏锐，能跟上龙的思维速度，彼此都觉得对方有趣</p>
<p><strong>属鸡</strong>（辰酉合）：细腻的鸡能帮助龙落地，龙的宏观视野补足鸡的细节思维</p>
<h3>需要更多理解的配对</h3>
<p><strong>属狗</strong>（辰戌冲）：两者都有强烈的自我主张，容易产生碰撞——但也可能因此激发出彼此的最佳状态</p>
<h2>属龙的事业特质</h2>
<p>属龙的人最适合需要领导力、创造力和大格局思维的职业：企业家/创始人、艺术创作者、政治家、演员、高层管理者。他们不适合纯粹执行性、缺乏空间展现自我的工作。</p>
<h2>属龙2026年（丙午马年）运势</h2>
<p>2024年是龙年（属龙本命年），经历了太岁同临的磨砺。2025年蛇年过渡期后，2026年马年对属龙来说是<strong>真正的开花结果之年</strong>——2024年播下的种子开始全面发芽。</p>
<p><strong>事业</strong>：马年与龙的能量高度共振，事业上有望实现重要突破，贵人运极旺。此前受阻的项目可能在这一年打通关键节点。</p>
<p><strong>财运</strong>：偏财和正财双旺，是适合投资和扩张的年份，但注意不要因过于自信而忽视细节。</p>
<p><strong>感情</strong>：单身属龙有桃花高峰期，已婚属龙感情稳固升温。</p>
<p><strong>健康</strong>：注意不要在高光时期过度消耗体力，保持规律休息。</p>`
  },
  {
    slug: "iching-hexagrams-beginners-guide",
    category: "qimen",
    title: "周易卦象入门：64卦的起源、解读与日常应用",
    title_en: "I Ching Hexagrams Beginners Guide: 64 Hexagrams Explained for Modern Life",
    description: "周易（I Ching）是世界上最古老的占卜系统之一，也是中国哲学的根基。了解64卦的构成原理、如何起卦以及如何将卦象智慧应用于现代生活。",
    keywords: ["周易入门","周易64卦","周易怎么算","周易占卜","I Ching hexagrams","周易卦象解读","如何用周易","易经入门"],
    published_at: "2026-09-15",
    reading_time: 12,
    cta_href: "/qimen",
    cta_label: "🎋 AI周易起卦 — 获得你的卦象",
    cta_label_en: "AI I Ching Reading",
    content: `<h2>什么是周易？</h2>
<p>周易（《易经》，I Ching）是中国文化中最核心的典籍之一，成书于3000年前，对中国哲学、文化和思维方式产生了深远影响。孔子说"五十以学易，可以无大过"——足见其地位之高。</p>
<p>从占卜角度来说，周易是通过<strong>卦象</strong>来描述宇宙中能量运动规律的系统。它不"预测命运"，而是描述一个情境在当前时刻的能量状态，以及这种能量状态自然演化的方向——给你看清楚你在哪里、向哪里走。</p>
<h2>周易的基础：阴爻与阳爻</h2>
<p>周易的一切都建立在两个最基本的符号上：</p>
<ul>
<li><strong>阳爻（—）</strong>：一条完整的横线，代表阳、刚、主动、显现</li>
<li><strong>阴爻（- -）</strong>：一条中断的横线，代表阴、柔、被动、潜藏</li>
</ul>
<p>三条爻组成一个"卦"（三爻卦/八卦）：乾、坤、震、巽、坎、离、艮、兑——代表天、地、雷、风、水、火、山、泽八种基本力量。</p>
<p>两个三爻卦叠加，形成六爻卦（六画卦），共有 2⁶ = 64 种组合，即<strong>64卦</strong>。</p>
<h2>最重要的几个卦象</h2>
<p><strong>乾卦（☰☰）——第1卦</strong><br>六爻皆阳，纯阳之气，象征创造力、领导力和开辟新天地的力量。"天行健，君子以自强不息。"</p>
<p><strong>坤卦（☷☷）——第2卦</strong><br>六爻皆阴，纯阴之气，象征包容、滋养和成就他者的力量。"地势坤，君子以厚德载物。"</p>
<p><strong>既济卦（水火既济）——第63卦</strong><br>象征事已完成、平衡达到——但也暗示警惕，因为平衡需要不断维持。</p>
<p><strong>未济卦（火水未济）——第64卦</strong><br>象征尚未完成——不是失败，而是一个新的循环即将开始的前一刻。这也是《易经》最后一卦，意味着变化永无止境。</p>
<h2>如何起卦（简化版三种方法）</h2>
<h3>1. 蓍草法（传统）</h3>
<p>使用50根蓍草，经过复杂的分组计数来确定每条爻的阴阳。这是最传统的方法，时间长，仪式感强。</p>
<h3>2. 铜钱法（最普及）</h3>
<p>取三枚铜钱（或任意硬币），抛掷六次，根据正反面的组合确定每条爻（三正=老阳，三反=老阴，两正一反=少阳，两反一正=少阴）。得到六爻，从下到上排列，得到本卦。有变爻时，老阳变阴、老阴变阳，得到之卦。</p>
<h3>3. AI起卦（现代）</h3>
<p>通过AI工具以意图驱动的方式生成卦象，适合快速获取日常指引。</p>
<h2>如何解读一个卦象</h2>
<ol>
<li>确认上下卦（两个三爻卦）分别代表什么力量</li>
<li>阅读整体卦辞和六条爻辞</li>
<li>重点关注"变爻"——那是最直接回应你问题的部分</li>
<li>结合你提问的具体情境来理解卦象的含义，不要脱离语境做抽象解读</li>
</ol>
<h2>周易与现代生活</h2>
<p>周易最有价值的不是"算出答案"，而是它提供的思维框架：一切都在变化，当前的状态包含着它自然演化的种子，理解"时"和"位"（你在什么时机、处于什么位置）比强求某个结果更智慧。</p>`
  },
  {
    slug: "tarot-card-represents-your-partner-guide",
    category: "tarot",
    title: "塔罗牌中代表爱人的牌：哪张牌描述了你理想中的伴侣？",
    title_en: "Which Tarot Card Represents Your Ideal Partner? Love Archetype Guide",
    description: "在塔罗牌中，不同的宫廷牌和大阿尔卡纳代表不同类型的伴侣原型。了解哪些牌描述了不同性格的爱人，以及这对你的感情读牌有什么意义。",
    keywords: ["塔罗代表爱人的牌","塔罗牌爱情配对","塔罗牌中的伴侣","宫廷牌爱人","塔罗感情牌意","tarot partner card","tarot love archetype"],
    published_at: "2026-09-16",
    reading_time: 10,
    cta_href: "/tarot",
    cta_label: "🔮 塔罗爱情读牌 — AI塔罗",
    cta_label_en: "Love Tarot Reading — AI",
    content: `<h2>塔罗牌中的"爱人原型"</h2>
<p>在塔罗感情读牌中，宫廷牌（圣杯、权杖、宝剑、钱币的页、骑士、皇后、国王）和部分大阿尔卡纳经常被用来描述一段感情中的人物。理解这些"爱人原型"，能帮你更精准地解读感情牌阵。</p>
<h2>宫廷牌代表的爱人类型</h2>
<h3>圣杯国王（King of Cups）</h3>
<p>情感成熟、有担当、能够以稳定的情感力量支撑你。他们不会被情绪淹没，也不会压制自己的感受——他们已经学会了情绪的艺术。如果你感情牌中出现圣杯国王，代表对方（或你渴望的对象）是一个情感上可以依靠的人。</p>
<h3>圣杯皇后（Queen of Cups）</h3>
<p>深度共情、直觉极强、用细腻的关怀滋养关系。她能感受到你没有说出口的需求。代表一段充满情感深度和直觉连接的关系，或者这种品质正是你需要的。</p>
<h3>权杖国王（King of Wands）</h3>
<p>充满魅力、有愿景、激励型的伴侣。这样的人会让你感到自己的生命被点燃，充满可能性。但他们需要足够的空间和冒险。</p>
<h3>权杖骑士（Knight of Wands）</h3>
<p>激情四射、追求强烈，但可能持久度不稳定。感情中的火焰烈，也可能消退快。代表激情阶段，不一定代表长期稳定。</p>
<h3>宝剑皇后（Queen of Swords）</h3>
<p>独立、智慧、直接。她不会用甜言蜜语，但她给你的是真相。这类伴侣需要精神层面的平等，不能被束缚。</p>
<h3>钱币国王（King of Pentacles）</h3>
<p>稳定可靠、有能力提供物质安全感，用实际行动表达爱。不擅长甜蜜的表白，但他在那里，一直在那里。</p>
<h2>大阿尔卡纳中的爱人形象</h2>
<p><strong>皇帝</strong>：权威型的伴侣，给你安全感和结构，但可能控制感强<br>
<strong>恋人</strong>：灵魂层面的连接，心灵相通，面临重要共同选择<br>
<strong>教皇</strong>：传统、忠诚、以某种精神或传统价值观为基础的关系<br>
<strong>月亮</strong>：神秘、难以完全了解、感情中有未被说清的东西<br>
<strong>太阳</strong>：充满活力、明朗开心、带给你阳光的伴侣</p>
<h2>如何在感情牌阵中识别"他/她"</h2>
<p>在塔罗感情读牌中，代表对方的通常是：出现在"对方能量"或"对方感受"位置的宫廷牌；或者整体牌阵中最突出、出现在最关键位置的牌。记住：任何宫廷牌都可以代表任何性别的人——重要的是那张牌的性格能量，而不是字面性别。</p>`
  },
  {
    slug: "zodiac-monthly-fortune-2026-overview",
    category: "horoscope",
    title: "2026年十二星座月度运势概览：每个星座哪几个月最旺？",
    title_en: "2026 Monthly Horoscope Overview: Best Months for Every Zodiac Sign",
    description: "2026年，不同星座的运势高峰期各不相同。这份月度运势概览帮你提前锁定事业财运感情的最佳时机，做好全年规划。",
    keywords: ["2026星座运势","2026月度星座","2026每月运势","星座2026什么时候运气好","2026星座运程月份","zodiac monthly horoscope 2026"],
    published_at: "2026-09-17",
    reading_time: 10,
    cta_href: "/birth-chart",
    cta_label: "🔮 查询你的2026月度运势 — 免费星盘",
    cta_label_en: "Get Your 2026 Monthly Horoscope — Free Birth Chart",
    content: `<h2>2026年主要天象背景</h2>
<p>2026年的天象格局对整体运势影响最大的是：<strong>木星在双子座（6月前）→ 进入巨蟹座（7月起）</strong>、土星在白羊座的持续影响，以及年内几次重要的水星逆行和金星逆行。理解这些背景，能帮助你更好地解读自己星座的运势高低。</p>
<h2>各星座2026年最旺月份速览</h2>
<h3>白羊座（Aries）</h3>
<p><strong>运势高峰：3-4月，10-11月</strong><br>土星在白羊座持续带来责任与机遇并存的格局。3-4月事业有突破机遇；10-11月在感情和个人成长上收获丰厚。</p>
<h3>金牛座（Taurus）</h3>
<p><strong>运势高峰：5-6月，9-10月</strong><br>木星在上半年的扩张效应让金牛在5-6月财运显著提升；秋季则适合深化重要关系。</p>
<h3>双子座（Gemini）</h3>
<p><strong>运势高峰：1-6月</strong><br>木星在双子整个上半年，双子迎来难得的全面开花期——这是约每12年才有一次的木星归位。</p>
<h3>巨蟹座（Cancer）</h3>
<p><strong>运势高峰：7-12月</strong><br>木星7月进入巨蟹，下半年整体运势大幅上升，特别在家庭、感情和创业方面。</p>
<h3>狮子座（Leo）</h3>
<p><strong>运势高峰：3-4月，8-9月</strong><br>火星在3-4月激活狮子的事业能量；8-9月在个人表达和社交上迎来高光时刻。</p>
<h3>处女座（Virgo）</h3>
<p><strong>运势高峰：2-3月，8-9月</strong><br>上半年有水星顺行期特别有利于处女的工作规划；8-9月学业和技能提升效果显著。</p>
<h3>天秤座（Libra）</h3>
<p><strong>运势高峰：4-5月，10-11月</strong><br>金星运行带来感情和合作的高峰；10-11月是天秤一年中最有魅力、社交最活跃的时段。</p>
<h3>天蝎座（Scorpio）</h3>
<p><strong>运势高峰：10-12月</strong><br>秋冬季是天蝎最强势的时段，深度合作、资源整合和感情深化都有良好势头。</p>
<h3>射手座（Sagittarius）</h3>
<p><strong>运势高峰：1-2月，11-12月</strong><br>年初和年末都是射手的运势高峰，远行、学习和精神探索在这两段时期收获最大。</p>
<h3>摩羯座（Capricorn）</h3>
<p><strong>运势高峰：6-8月</strong><br>年中时段摩羯的事业运稳步向好，特别适合推进长期项目和争取晋升机会。</p>
<h3>水瓶座（Aquarius）</h3>
<p><strong>运势高峰：1-3月，7-8月</strong><br>年初有强烈的新开始能量；7-8月创新项目和团队协作效果最佳。</p>
<h3>双鱼座（Pisces）</h3>
<p><strong>运势高峰：2-4月，9-10月</strong><br>春季是双鱼创意和感情的最佳时段；秋季则适合整理内在、深化精神探索。</p>
<h2>如何利用这份概览</h2>
<p>把重要计划（求职、表白、投资、开业）安排在你的运势高峰月份，并在低谷期（通常是你高峰对面约6个月）放慢步伐、蓄积力量。这不是迷信，而是顺势而为的生活智慧。</p>`
  }
];

async function main() {
  console.log(`📝 批次S2：写入 ${posts.length} 篇中文重点内容...`);
  let success = 0, fail = 0;
  for (const post of posts) {
    const { error } = await supabase.from("mysticai_blog_posts").upsert(post, { onConflict: "slug" });
    if (error) { console.error(`  ❌ [${post.slug}]:`, error.message); fail++; }
    else { console.log(`  ✅ [${post.slug}]`); success++; }
  }
  console.log(`\n完成！成功: ${success}, 失败: ${fail}`);
}
main().catch(console.error);
