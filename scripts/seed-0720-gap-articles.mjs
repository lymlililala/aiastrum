// ─── GSC 0720 缺口集群补缺文章(3 篇)────────────────────────────────────────
// 承接无落地页的关键词集群:
//   1. divination-methods-complete-guide   ← "divination methods" (pos 90.5)
//   2. ziwei-stars-guide-tianshou-yuede    ← "tianshou star" / "yue de star" (pos 2-8, 承接排名优势的星曜英文词)
//   3. numerology-lo-shu-grid-guide        ← "生命靈數九宮格線上" (pos 72)
// 用法:DRY=1 预览;node scripts/seed-0720-gap-articles.mjs 正式 upsert(需 .env 中 SUPABASE_SECRET_KEY)
import { createClient } from "@supabase/supabase-js";

const SECRET = process.env.SUPABASE_SECRET_KEY;
const DRY = process.env.DRY === "1";
if (!SECRET && !DRY) { console.error("缺少 SUPABASE_SECRET_KEY"); process.exit(1); }
const supabase = SECRET ? createClient("https://tixgzezefjjsyuzgdhcd.supabase.co", SECRET) : null;

const posts = [
  {
    slug: "divination-methods-complete-guide",
    category: "ai-mystic",
    lang: "en",
    title: "Divination Methods: A Complete Guide to 9 Systems",
    title_en: "Divination Methods: A Complete Guide to 9 Systems",
    description:
      "The major divination methods explained — tarot, runes, astrology, numerology, I Ching, bazi, zi wei dou shu, dream interpretation and more: how each works and which fits your question.",
    keywords: [
      "divination methods",
      "types of divination",
      "divination systems",
      "tarot vs runes",
      "chinese divination methods",
      "how to choose a divination method",
    ],
    published_at: "2026-07-20",
    reading_time: 12,
    cta_href: "/tarot",
    cta_label: "Try a free tarot reading",
    cta_label_en: "Try a free tarot reading",
    content: `<article><h1>Divination Methods: A Complete Guide to 9 Systems</h1>
<p>Divination is humanity's oldest decision-making technology: a structured way to step outside habitual thinking and look at a question from a symbolic angle. But "divination" is not one thing — it's a family of very different systems, each with its own logic, strengths, and ideal use cases. This guide compares the nine most widely practiced divination methods, explains how each one actually works, and helps you pick the right tool for your question.</p>
<h2>How Divination Methods Differ</h2>
<p>Every divination system answers questions through one of three mechanisms:</p>
<ul>
<li><strong>Random cast</strong> — shuffled cards, thrown coins, drawn runes. Chance produces a symbol set that you interpret against your question (tarot, runes, I Ching, oracle sticks).</li>
<li><strong>Time-based chart</strong> — your birth moment is converted into a fixed map that describes tendencies and cycles (astrology, bazi, zi wei dou shu, numerology).</li>
<li><strong>Symbol decoding</strong> — existing material (dreams, omens, signs) is translated through a symbol dictionary (dream interpretation, augury).</li>
</ul>
<p>Neither is "more accurate" — they answer different kinds of questions. Random casts excel at <em>this situation, right now</em>. Time-based charts excel at <em>who you are and what season you're in</em>. Symbol decoding excels at <em>what your subconscious is already telling you</em>.</p>
<h2>1. Tarot</h2>
<p>A 78-card deck split into 22 Major Arcana (life themes) and 56 Minor Arcana (daily situations). You shuffle with a question in mind, draw cards into a spread, and read positions against each other. Tarot's strength is narrative: a good spread reads like a story about your situation — past influences, present dynamics, likely direction. It's the most beginner-friendly random-cast system because every card carries rich, specific imagery.</p>
<p>Best for: relationship dynamics, decision forks, "what am I not seeing?" questions. Start with a <a href="/tarot">free three-card tarot reading</a> or look up any card in our <a href="/blog/topic/tarot-spreads">tarot spreads library</a>.</p>
<h2>2. Runes</h2>
<p>The Elder Futhark — 24 carved symbols from early Germanic Europe — works like tarot's austere cousin. You draw one or three stones; each rune is a compressed concept (Fehu = wealth-flow, Isa = stillness). Where tarot tells stories, runes give blunt, weather-report-style statements. Many readers keep both: tarot for nuance, runes for a second, terser opinion.</p>
<p>Best for: yes-leaning questions, quick daily pulls, situations where you want a direct answer. Try a <a href="/free-rune-reading">free rune reading</a> or browse all <a href="/blog/topic/rune-meanings">24 rune meanings</a>.</p>
<h2>3. Western Astrology</h2>
<p>Your birth date, time and city produce a natal chart: planetary positions mapped onto twelve signs and twelve houses. The chart is fixed for life; transits (current sky positions) moving across it describe your timing. Astrology is the most structurally complex time-based system — its learning curve is real, but so is its resolution.</p>
<p>Best for: personality architecture, timing of life chapters, relationship synastry. Generate your <a href="/astro">free birth chart</a> or find your <a href="/rising-sign-calculator">rising sign</a>.</p>
<h2>4. Numerology</h2>
<p>The lightest time-based system: your birth date reduces to a life path number (1–9, plus master numbers 11, 22, 33), and your name converts to expression and soul numbers. Numerology trades astrology's complexity for immediacy — one calculation, one archetype, instantly usable.</p>
<p>Best for: quick self-assessment, name questions, personal-year timing. Calculate your <a href="/life-path-calculator">life path number</a> or read the <a href="/blog/topic/numerology-life-path">complete life path guides</a>.</p>
<h2>5. I Ching (Yijing)</h2>
<p>China's oldest divination text: six coin tosses build a hexagram of broken and unbroken lines, which the 3,000-year-old commentary interprets. The I Ching's distinctive feature is moving lines — the hexagram you cast transforms into a second one, showing not just where you are but where the situation is heading. It reads less like fortune-telling and more like advice from a very old strategist.</p>
<p>Best for: strategic questions, "what's the wise move here?", understanding change in progress. Our <a href="/meihua">Plum Blossom Numerology (梅花易数)</a> tool offers a related, faster Chinese casting method.</p>
<h2>6. Bazi (Four Pillars of Destiny)</h2>
<p>Chinese astrology's workhorse: birth year, month, day and hour each produce a "pillar" of one heavenly stem and one earthly branch — eight characters (八字) total. The system reads the balance of five elements across your chart and tracks 10-year luck cycles. Where Western astrology asks "what sign are you," bazi asks "which elements do you have too much or too little of."</p>
<p>Best for: career timing, elemental balance, long-cycle planning. Get your <a href="/bazi">free bazi chart</a>.</p>
<h2>7. Zi Wei Dou Shu (Purple Star Astrology)</h2>
<p>The most elaborate Chinese system: over a hundred stars are placed into twelve "palaces" (life domains — career, spouse, wealth, health) based on your birth data. The 14 major stars act like characters; their palace placement and combinations describe both personality and life trajectory with unusual specificity. Historically it was the imperial court's preferred method.</p>
<p>Best for: detailed life-domain analysis, palace-by-palace breakdowns. Generate your <a href="/ziwei">free zi wei dou shu chart</a>.</p>
<h2>8. Dream Interpretation</h2>
<p>The oldest symbol-decoding method: dreams are read as messages from the subconscious, using either traditional symbol dictionaries (Zhou Gong's dream lore in China) or Jungian psychology (dreams as the psyche's self-regulation). Modern practice combines both — the symbol matters, but so does the emotion you woke up with.</p>
<p>Best for: recurring dreams, anxiety dreams, processing transitions. Try our <a href="/dream">AI dream interpretation</a> or browse the <a href="/blog/topic/dream-interpretation">dream dictionary</a>.</p>
<h2>9. Oracle Sticks, Pendulums and Other Cast Methods</h2>
<p>Beyond the big systems sit lighter cast methods: Kau Cim (观音灵签) sticks shaken from a bamboo tube, pendulum dowsing for yes/no questions, and single-card oracle pulls. They sacrifice depth for speed and ritual simplicity — a meaningful daily practice for many people. Our <a href="/lingqian">online oracle sticks (灵签)</a> and <a href="/yes-no-tarot">yes/no tarot</a> cover this niche.</p>
<h2>How to Choose: Match the Method to the Question</h2>
<table>
<tr><th>Your question type</th><th>Best-fit methods</th></tr>
<tr><td>What should I do about this situation?</td><td>Tarot, I Ching, runes</td></tr>
<tr><td>Who am I / who is this person?</td><td>Astrology, numerology, bazi, zi wei dou shu</td></tr>
<tr><td>When will things move?</td><td>Astrology transits, bazi luck cycles, personal years</td></tr>
<tr><td>What is my mind processing?</td><td>Dream interpretation</td></tr>
<tr><td>Quick daily guidance</td><td>Single rune, one-card pull, oracle sticks</td></tr>
</table>
<h2>A Practical Way to Combine Methods</h2>
<p>Experienced practitioners rarely marry one system. A common stack: a time-based chart (astrology or bazi) as the standing map of who you are, plus a random cast (tarot or runes) for live questions, plus dream journaling as the ongoing background signal. The systems don't compete — they triangulate. When your chart, your cards and your dreams all point the same direction, you can stop deliberating and act.</p>
<p>One honest caveat: divination is a mirror, not an oracle in the literal sense. Its real function is to surface what you already half-know and frame choices clearly. Use it for reflection and timing — and keep final decisions, especially medical, legal and financial ones, with qualified professionals.</p>
</article>`,
  },
];

posts.push(
  {
    slug: "ziwei-stars-guide-tianshou-yuede",
    category: "ziwei",
    lang: "en",
    title: "Zi Wei Dou Shu Stars Guide: Tianshou, Yue De & the Star System",
    title_en: "Zi Wei Dou Shu Stars Guide: Tianshou, Yue De & the Star System",
    description:
      "Zi Wei Dou Shu stars explained — the 14 major stars, auxiliary stars like Tianshou (Longevity) and Yue De (Moon Virtue), and how star placement in the 12 palaces shapes your chart.",
    keywords: [
      "tianshou star",
      "yue de star",
      "zi wei dou shu stars",
      "ziwei stars meaning",
      "purple star astrology stars",
      "tian shou star ziwei",
    ],
    published_at: "2026-07-20",
    reading_time: 11,
    cta_href: "/ziwei",
    cta_label: "Generate your free Zi Wei chart",
    cta_label_en: "Generate your free Zi Wei chart",
    content: `<article><h1>Zi Wei Dou Shu Stars Guide: Tianshou, Yue De &amp; the Star System</h1>
<p>Zi Wei Dou Shu (紫微斗数, Purple Star Astrology) maps over a hundred symbolic "stars" into twelve life palaces based on your birth data. Unlike Western planets, these stars are not astronomical bodies — they are archetypes whose palace placement, brightness, and combinations describe personality and life trajectory. This guide explains how the star system is organized, what the 14 major stars mean, and where minor stars like <strong>Tianshou (天寿星)</strong> and <strong>Yue De (月德星)</strong> fit in.</p>
<h2>How the Star System Is Organized</h2>
<p>The stars fall into tiers by influence:</p>
<ul>
<li><strong>14 Major Stars (主星)</strong> — the backbone of the chart. Led by Zi Wei (the Emperor Star), they split into the Zi Wei series (Zi Wei, Tian Ji, Tai Yang, Wu Qu, Tian Tong, Lian Zhen) and the Tian Fu series (Tian Fu, Tai Yin, Tan Lang, Ju Men, Tian Xiang, Tian Liang, Qi Sha, Po Jun). A palace with a major star takes its core character from that star.</li>
<li><strong>Auxiliary stars (辅星/煞星)</strong> — modifiers like Zuo Fu, You Bi, Wen Chang, Wen Qu (supportive) and Qing Yang, Tuo Luo, Huo Xing, Ling Xing (challenging). They tune how a major star expresses itself.</li>
<li><strong>Minor stars (丙级/丁级星)</strong> — dozens of fine-grained indicators, including Tianshou and Yue De. Individually subtle, collectively they add texture: timing, temperament, small recurring fortunes.</li>
</ul>
<p>Reading order matters: palace first (which life domain?), major star second (what core energy?), then auxiliary and minor stars (what colors the expression?).</p>
<h2>The 14 Major Stars at a Glance</h2>
<table>
<tr><th>Star</th><th>Chinese</th><th>Archetype</th><th>Core themes</th></tr>
<tr><td>Zi Wei</td><td>紫微</td><td>The Emperor</td><td>Leadership, dignity, high standards</td></tr>
<tr><td>Tian Ji</td><td>天机</td><td>The Strategist</td><td>Intelligence, planning, changeability</td></tr>
<tr><td>Tai Yang</td><td>太阳</td><td>The Sun</td><td>Openness, generosity, public life</td></tr>
<tr><td>Wu Qu</td><td>武曲</td><td>The General</td><td>Finance, decisiveness, discipline</td></tr>
<tr><td>Tian Tong</td><td>天同</td><td>The Child</td><td>Contentment, ease, enjoyment</td></tr>
<tr><td>Lian Zhen</td><td>廉贞</td><td>The Official</td><td>Duty, politics, intense attachment</td></tr>
<tr><td>Tian Fu</td><td>天府</td><td>The Treasurer</td><td>Stability, resources, pragmatism</td></tr>
<tr><td>Tai Yin</td><td>太阴</td><td>The Moon</td><td>Gentleness, aesthetics, inner wealth</td></tr>
<tr><td>Tan Lang</td><td>贪狼</td><td>The Desire Star</td><td>Ambition, charm, appetite for life</td></tr>
<tr><td>Ju Men</td><td>巨门</td><td>The Gate</td><td>Speech, analysis, skepticism</td></tr>
<tr><td>Tian Xiang</td><td>天相</td><td>The Minister</td><td>Service, fairness, mediation</td></tr>
<tr><td>Tian Liang</td><td>天梁</td><td>The Sage</td><td>Protection, principle, longevity</td></tr>
<tr><td>Qi Sha</td><td>七杀</td><td>The Warrior</td><td>Drive, risk, dramatic change</td></tr>
<tr><td>Po Jun</td><td>破军</td><td>The Breaker</td><td>Disruption, reinvention, pioneering</td></tr>
</table>
<h2>Tianshou Star (天寿星): The Longevity Marker</h2>
<p>Tianshou — literally "Heavenly Longevity" — is a minor star associated with <strong>lifespan, steadiness, and maturity arriving early</strong>. Traditional texts describe people with a prominent Tianshou as calm, reliable, and somewhat older than their years: the friend who was already sensible at twenty. Its practical readings:</p>
<ul>
<li><strong>In the Life Palace (命宫):</strong> a steady constitution and a temperament built for the long game; these natives rarely burn out because they pace themselves instinctively.</li>
<li><strong>In the Health Palace (疾厄宫):</strong> traditionally read as a protective marker for vitality and recovery capacity.</li>
<li><strong>With Tian Liang (天梁):</strong> the classic "double longevity" pairing — both stars carry protective, elder-energy themes, and together they emphasize endurance and the respect of seniors.</li>
</ul>
<p>Because Tianshou is a minor star, it refines rather than defines: it strengthens whatever major star shares its palace but cannot override it.</p>
<h2>Yue De Star (月德星): The Moon Virtue</h2>
<p>Yue De — "Moon Virtue" — belongs to the virtue stars (alongside Tian De, 天德). Its theme is <strong>gentle protection through kindness</strong>: where Dragon Virtue stars resolve crisis with force, Yue De softens it. Traditional readings associate it with:</p>
<ul>
<li><strong>Helpful people (贵人):</strong> support arriving quietly, often from women or through family networks.</li>
<li><strong>Tempered misfortune:</strong> when a challenging palace also holds Yue De, the difficulties tend to land more softly — delays instead of disasters.</li>
<li><strong>A conciliatory temperament:</strong> in the Life Palace, natives mediate instinctively and de-escalate conflict around them.</li>
</ul>
<p>Some charts pair Yue De with Tian De as the "two virtues," a combination classical texts treat as one of the most favorable background markers a chart can hold.</p>
<h2>How Star Brightness Changes Everything</h2>
<p>The same star reads differently depending on its <em>brightness level</em> (庙旺利陷 — from "flourishing" to "trapped") in each palace. Tai Yang at noon-position (Wu palace) is radiant leadership; Tai Yang at midnight-position is effort without spotlight. This is why two people with identical major stars can live very different lives, and why serious reading always checks brightness before interpretation.</p>
<h2>Stars in Combination: Why Pairs Matter More Than Singles</h2>
<p>Zi Wei Dou Shu is fundamentally combinatorial. "Zi Wei + Tian Fu" reads as stable authority; "Zi Wei + Po Jun" reads as reformist rule. The four transformation stars (四化 — Hua Lu, Hua Quan, Hua Ke, Hua Ji), assigned by birth year, add a final layer: they mark where energy flows easily (Lu), where you push (Quan), where you're recognized (Ke), and where you fixate (Ji).</p>
<h2>Reading Your Own Chart</h2>
<p>To go from theory to your actual stars: generate your chart, note the major star in your Life Palace, check its brightness, then look at which auxiliary and minor stars accompany it. Your <a href="/ziwei">free Zi Wei Dou Shu chart</a> places all major and minor stars — including Tianshou and Yue De — across the twelve palaces automatically. If you're new to Chinese astrology overall, our <a href="/blog/divination-methods-complete-guide">divination methods comparison</a> shows how Zi Wei Dou Shu differs from bazi and Western astrology.</p>
</article>`,
  },
  {
    slug: "numerology-lo-shu-grid-guide",
    category: "numerology",
    lang: "zh",
    title: "生命灵数九宫格详解:画法、空缺数字与八条连线",
    title_en: "Lo Shu Grid Numerology: Birth Chart Planes & Missing Numbers",
    description:
      "生命灵数九宫格(洛书九宫)完整教程:如何用生日画出你的数字九宫格,空缺数字的含义、八条能量连线解读,以及与生命道路数字的关系。",
    keywords: [
      "生命灵数九宫格",
      "生命靈數九宮格",
      "生命數字九宮格",
      "洛书九宫格",
      "灵数九宫格画法",
      "九宫格空缺数字",
      "生命数字连线",
    ],
    published_at: "2026-07-20",
    reading_time: 10,
    cta_href: "/life-path-calculator",
    cta_label: "免费计算你的生命灵数",
    cta_label_en: "Calculate your life path number",
    content: `<article><h1>生命灵数九宫格详解:画法、空缺数字与八条连线</h1>
<p>生命灵数九宫格(源自中国洛书的 3×3 数字阵)是数字命理中最直观的工具:把出生日期里的数字填入九个宫位,一眼看出哪些能量在你生命里反复出现、哪些完全缺席。如果说生命道路数字是你的「主题曲」,九宫格就是你的「完整乐器配置」。这篇教程讲清楚怎么画、怎么读。</p>
<h2>九宫格的布局:洛书九宫</h2>
<p>九个数字在格子里的位置是固定的,沿用洛书「戴九履一,左三右七,二四为肩,六八为足,五居中央」的排布:</p>
<table>
<tr><td><strong>3</strong>(木·东方)</td><td><strong>9</strong>(火·南方)</td><td><strong>2</strong>(土·西南)</td></tr>
<tr><td><strong>4</strong>(木·东南)</td><td><strong>5</strong>(土·中央)</td><td><strong>7</strong>(金·西方)</td></tr>
<tr><td><strong>8</strong>(土·东北)</td><td><strong>1</strong>(水·北方)</td><td><strong>6</strong>(金·西北)</td></tr>
</table>
<p>记忆口诀:横竖斜每条线相加都等于 15——这也是洛书被称为「幻方」的原因。</p>
<h2>第一步:把你的生日填进去</h2>
<p>以 1992 年 8 月 24 日出生为例:</p>
<ul>
<li>拆出所有数字:1、9、9、2、8、2、4</li>
<li>每个数字填入对应宫位;同一个数字出现几次就记几次(两个 9、两个 2)</li>
<li>生日里没有出现的数字(此例缺 3、5、6、7)就是「空缺数字」</li>
</ul>
<p>有些流派会额外把生命道路数字也加进格里(此例生命灵数为 1+9+9+2+8+2+4=35→3+5=8,再补一个 8)。两种画法都常见,关键是前后一致。还没算过自己的生命灵数?可以先用<a href="/life-path-calculator">生命灵数计算器</a>算出你的主数。</p>
<h2>第二步:读重复数字——你的天赋存量</h2>
<p>出现次数越多的数字,代表那股能量在你性格里越「满」:</p>
<ul>
<li><strong>数字 1 多:</strong>自我驱动力强,独立有主见;过多则固执</li>
<li><strong>数字 2 多:</strong>敏感细腻、善于配合;过多则情绪化</li>
<li><strong>数字 3 多:</strong>表达力与创意充沛;过多则散漫</li>
<li><strong>数字 4 多:</strong>踏实有条理;过多则僵化</li>
<li><strong>数字 5 多:</strong>自由、适应力强;过多则缺乏定性</li>
<li><strong>数字 6 多:</strong>责任感与照顾欲强;过多则操心过度</li>
<li><strong>数字 7 多:</strong>思考深、直觉准;过多则孤僻</li>
<li><strong>数字 8 多:</strong>执行力与物质运强;过多则控制欲重</li>
<li><strong>数字 9 多:</strong>理想主义、共情面广;过多则不切实际</li>
</ul>
<h2>第三步:读空缺数字——你的人生课题</h2>
<p>格里完全没有的数字,传统上被解读为「这辈子要刻意修习的功课」:</p>
<ul>
<li><strong>缺 1:</strong>容易随波逐流,需练习确立自我边界</li>
<li><strong>缺 2:</strong>不擅体察他人情绪,需练习倾听与配合</li>
<li><strong>缺 3:</strong>表达受阻,需练习说出真实想法</li>
<li><strong>缺 4:</strong>计划性弱,需建立秩序与耐心</li>
<li><strong>缺 5:</strong>抗拒变化,需练习灵活与冒险</li>
<li><strong>缺 6:</strong>回避责任,需学习承担与照顾</li>
<li><strong>缺 7:</strong>疏于内省,需培养独处与思考</li>
<li><strong>缺 8:</strong>对金钱事业钝感,需练习务实落地</li>
<li><strong>缺 9:</strong>格局易窄,需培养同理与远景</li>
</ul>
<p>注意:空缺不是「缺陷」,而是注意力分配图——缺的能量可以靠习惯、环境和有意识的练习补上。</p>
<h2>第四步:读连线——八条能量线</h2>
<p>当格子里某条线(横、竖、斜)上的三个数字全部出现时,就形成一条「连线」,代表一组成体系的能量:</p>
<table>
<tr><th>连线</th><th>名称</th><th>含义</th></tr>
<tr><td>3-9-2</td><td>心智线(顶行)</td><td>思考、理想、领悟力</td></tr>
<tr><td>4-5-6</td><td>情感线(中行)</td><td>感受力、平衡、意志</td></tr>
<tr><td>8-1-6</td><td>物质线(底行)</td><td>行动力、实践、物质成就</td></tr>
<tr><td>3-4-8</td><td>规划线(左列)</td><td>条理、组织、计划能力</td></tr>
<tr><td>9-5-1</td><td>决心线(中列)</td><td>毅力、目标感、贯彻到底</td></tr>
<tr><td>2-7-6</td><td>行动线(右列)</td><td>执行力、外在表现</td></tr>
<tr><td>3-5-7</td><td>灵性线(斜线)</td><td>直觉、精神追求</td></tr>
<tr><td>2-5-8</td><td>情绪线(斜线)</td><td>情感深度、同理心</td></tr>
</table>
<p>连线越多,能量越成体系;一条连线都没有也不代表不好——说明能量分散、可塑性强,属于「多点开花」型。</p>
<h2>九宫格与生命道路数字的关系</h2>
<p>两者回答的问题不同:生命道路数字(1-9 及卓越数)是你的核心命题,九宫格是你的能量分布图。常见用法是先算主数定方向,再看九宫格找短板。比如生命灵数 3 的人(表达与创意),如果格里偏偏缺 3,往往表现为「有想法但表达卡顿」——这恰好指明了练习方向。想深入了解每个数字的性格与配对,可以读<a href="/blog/topic/numerology-life-path">生命灵数完整解析</a>,或到<a href="/numerology">生命灵数</a>工具页做一次完整解读。</p>
<h2>一个诚实的提醒</h2>
<p>九宫格是一套自我觉察的框架,不是宿命判决书。它最有价值的用法是「对照验证」:读解读时留意哪些描述让你点头、哪些让你想反驳——那两种反应都在告诉你关于自己的信息。</p>
</article>`,
  }
);

// ─── upsert 执行 ───
if (DRY) {
  for (const p of posts) {
    console.log(`── ${p.slug} [${p.lang}/${p.category}] (DRY)`);
    console.log(`   title: ${p.title}`);
    console.log(`   desc:  ${p.description}`);
    console.log(`   kw:    ${JSON.stringify(p.keywords)}`);
    console.log(`   content: ${p.content.length} chars`);
  }
  console.log("\nDRY 预览完成,未写库。");
  process.exit(0);
}

let ok = 0, fail = 0;
for (const post of posts) {
  const { error } = await supabase
    .from("mysticai_blog_posts")
    .upsert(post, { onConflict: "slug" });
  if (error) { console.error("FAIL", post.slug, error.message); fail++; }
  else { console.log("OK  ", post.slug); ok++; }
}
console.log(`\nDone: ${ok} success, ${fail} fail`);
