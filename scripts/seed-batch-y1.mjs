import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);

const posts = [
  {
    slug: "venus-in-scorpio-love-guide",
    title: "Venus in Scorpio — Intense Love, Magnetic Attraction & Deep Emotional Truth",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Venus in Scorpio — Intense Love, Magnetic Attraction & Deep Emotional Truth</h1>
<p>Venus in Scorpio is one of the most magnetically powerful placements for love and attraction. Here, the planet of beauty and partnership plunges into Scorpio's depths — the result is love that is transformative, obsessive at times, and profoundly meaningful. These people don't do shallow relationships.</p>

<h2>How Venus in Scorpio Loves</h2>
<p>Love, for Venus in Scorpio, is all or nothing. They require complete intimacy — emotional, psychological, and physical. Surface-level connection feels like a waste of time. They want to know the person completely, including their shadows. And they offer the same depth in return.</p>
<ul>
<li><strong>Magnetic attraction</strong>: An almost uncanny ability to attract others through depth, mystery, and intensity</li>
<li><strong>Loyalty unto death</strong>: When committed, their loyalty is absolute — but betrayal cannot be forgiven</li>
<li><strong>Healing through love</strong>: Often becomes the catalyst for a partner's deepest transformation</li>
<li><strong>Sensual depth</strong>: Physical intimacy is both a gateway to emotional depth and an expression of complete trust</li>
</ul>

<h2>The Shadow</h2>
<p>The intensity that makes Venus in Scorpio remarkable also creates challenges: jealousy, possessiveness, power struggles, and difficulty letting go. The shadow is using love as a form of control, or staying in relationships that have ended because release feels like death.</p>

<h2>What Venus in Scorpio Needs in a Relationship</h2>
<ul>
<li>Complete honesty — they can sense deception immediately and it destroys trust</li>
<li>A partner willing to go deep and face their own shadows</li>
<li>Loyalty and exclusivity</li>
<li>The freedom to be intense without being asked to dial it down</li>
</ul>

<h2>Venus in Scorpio Compatibility</h2>
<p>Best matched with Venus in Pisces (shared depth), Venus in Cancer (emotional resonance), and sometimes Venus in Taurus (the opposition creates powerful magnetic attraction).</p>

<h2>Venus in Scorpio Transit</h2>
<p>When Venus transits Scorpio, relationships deepen or end. Hidden attractions surface. Financial matters related to shared resources or inheritance become focal. The collective desire for depth over surface beauty intensifies.</p>

<h2>Affirmation</h2>
<p><em>"I love with my whole soul. My intensity is my greatest gift — it transforms everything it touches."</em></p>
</article>`
  },
  {
    slug: "tarot-love-yes-no-specific-cards",
    title: "Tarot Love Yes or No — Every Card's Answer to Your Relationship Questions",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Tarot Love Yes or No — Every Card's Answer to Your Relationship Questions</h1>
<p>Need a quick answer about your love life? While tarot is ultimately about nuance, certain cards do lean strongly toward "yes" or "no" in love readings. Here's how to interpret each card when asking romantic questions.</p>

<h2>Strong "Yes" Cards in Love Readings</h2>
<ul>
<li><strong>The Lovers</strong>: The ultimate love yes — union, choice toward partnership, deep alignment</li>
<li><strong>Two of Cups</strong>: Mutual attraction, new romantic connection forming — yes to relationship</li>
<li><strong>The Star</strong>: Hope and healing — yes to new beginnings after heartbreak</li>
<li><strong>Ten of Cups</strong>: Emotional fulfillment and family happiness — yes to lasting love</li>
<li><strong>The Empress</strong>: Fertility, nurturing love, abundance — yes to flourishing relationship</li>
<li><strong>Four of Wands</strong>: Celebration, homecoming, commitment — yes to milestones</li>
<li><strong>Ace of Cups</strong>: New love, emotional beginnings — yes to opening your heart</li>
<li><strong>Nine of Cups</strong>: Wish fulfillment — yes, your romantic wish may be granted</li>
<li><strong>The Sun</strong>: Joy and clarity — yes, with warmth and certainty</li>
<li><strong>Six of Cups</strong>: Sweet reunion, childhood sweethearts, nostalgia-based connection — yes to rekindling</li>
</ul>

<h2>Strong "No" or "Not Yet" Cards in Love</h2>
<ul>
<li><strong>Three of Swords</strong>: Heartbreak, betrayal — no, this situation causes pain</li>
<li><strong>Five of Cups</strong>: Grief, loss — not the right time; wounds need healing first</li>
<li><strong>The Tower</strong>: Sudden disruption — no, something will shatter expectations</li>
<li><strong>Eight of Swords</strong>: Self-imposed prison — blocked by fears, not external circumstances</li>
<li><strong>Nine of Swords</strong>: Anxiety, nightmares — fears blocking clear perception; not a good time</li>
<li><strong>Five of Pentacles</strong>: Feeling left out in the cold — scarcity mindset is blocking love</li>
<li><strong>The Devil (reversed)</strong>: Unhealthy attachment — no to continuing this pattern</li>
<li><strong>Ten of Swords</strong>: The absolute ending — no, this chapter is definitively over</li>
</ul>

<h2>Complicated "Maybe" Cards in Love</h2>
<ul>
<li><strong>The Moon</strong>: Illusion and confusion — the situation is unclear; wait for more information</li>
<li><strong>The Hanged Man</strong>: Surrender needed — the answer reveals itself through patience, not action</li>
<li><strong>Seven of Cups</strong>: Fantasy vs. reality — clarify what you actually want before seeking an answer</li>
<li><strong>Two of Swords</strong>: Avoidance — you already know the answer but are refusing to face it</li>
<li><strong>The Wheel of Fortune</strong>: Change is coming — timing is shifting; answer depends on the moment</li>
<li><strong>Judgment</strong>: Awakening required — an important truth needs to be faced before the answer is clear</li>
</ul>

<h2>How to Use Love Yes/No Tarot Accurately</h2>
<ol>
<li>Ask clear, specific questions ("Is this relationship healthy for me?" not "Will I be happy?")</li>
<li>Look at the surrounding cards for context — a "yes" card surrounded by "no" cards tells a more complex story</li>
<li>Note whether the card is upright or reversed — reversed cards often flip or complicate the answer</li>
<li>Trust your first emotional reaction to the card before checking any guide</li>
</ol>

<h2>The Deepest Love Answer</h2>
<p>The tarot's most honest love answer is rarely a simple yes or no — it's a mirror of your own heart. The cards reflect what you already sense. The real question isn't "what will happen?" but "what do I truly want, and am I willing to act on it?"</p>
</article>`
  },
  {
    slug: "horoscope-aries-2026-annual-complete",
    title: "Aries 2026 Complete Annual Horoscope — Love, Career, Money & Major Transits",
    category: "horoscope",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Aries 2026 Complete Annual Horoscope — Love, Career, Money & Major Transits</h1>
<p>2026 is a year of significant movement for Aries. With major planetary shifts through the year, Rams will experience both exciting opportunities and important restructuring. Here's your complete guide to navigating the cosmic weather of 2026.</p>

<h2>Overview: Aries 2026</h2>
<p>The key themes for Aries in 2026 center on personal transformation, relationship evolution, and building foundations that serve your authentic ambitions. Saturn's influence asks you to work with discipline; Jupiter's position rewards bold, authentic action.</p>

<h2>Love & Relationships 2026</h2>
<h3>First Quarter (January-March)</h3>
<p>Venus activations early in the year bring romantic opportunities. Single Aries may find unexpected connections in professional settings. Partnership discussions become more serious — if you've been wondering about commitment, Q1 provides clarity.</p>

<h3>Second Quarter (April-June)</h3>
<p>Relationship communication deepens. Important conversations about the future of partnerships are supported by Mercury transits. Existing relationships have the opportunity to evolve into something more intentional and committed.</p>

<h3>Third Quarter (July-September)</h3>
<p>The year's most intense romantic period. Mars activations bring passion and directness to love affairs. New relationships begun now carry strong initial attraction. Existing relationships need honesty rather than convenience.</p>

<h3>Fourth Quarter (October-December)</h3>
<p>Relationship harvesting season — the seeds of what you've nurtured this year begin to show their true nature. By year's end, your relationship landscape should be clearer and more aligned with your genuine values.</p>

<h2>Career & Money 2026</h2>
<h3>Professional Highlights</h3>
<ul>
<li>Q1: Career ambitions receive fresh energy — new projects and initiatives get strong starts</li>
<li>Q2: Financial planning and resource building are favored; avoid impulsive large purchases</li>
<li>Q3: Leadership opportunities emerge — say yes to visibility, especially in your area of expertise</li>
<li>Q4: Year-end review shows progress on foundations laid throughout the year</li>
</ul>

<h2>Health & Wellbeing</h2>
<p>Physical vitality is strong for most of 2026. Focus on sustainable health practices rather than intense short-term regimens. Head, face, and adrenal health (classic Aries concerns) benefit from mindful management of stress and adequate rest.</p>

<h2>2026 Lucky Periods for Aries</h2>
<ul>
<li>Most fortunate: Late March, mid-July, November</li>
<li>Exercise patience: February, late September</li>
<li>Major opportunity: July-August (act decisively when doors open)</li>
</ul>

<h2>Aries Affirmation for 2026</h2>
<p><em>"I act boldly and build wisely. This year, my courage creates lasting foundations for everything I desire."</em></p>
</article>`
  },
  {
    slug: "horoscope-leo-2026-annual-complete",
    title: "Leo 2026 Complete Annual Horoscope — Radiant Success, Love & Creative Power",
    category: "horoscope",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Leo 2026 Complete Annual Horoscope — Radiant Success, Love & Creative Power</h1>
<p>2026 is a year of shining for Leo — if you're willing to put in the disciplined work that makes the shine genuine. The cosmic energies this year support authentic creative expression, meaningful relationships, and career achievements that reflect your true gifts.</p>

<h2>Overview: Leo 2026</h2>
<p>The overarching theme for Leo in 2026 is "authentic radiance." There's a difference between performing for approval and truly shining from your genuine self. 2026's cosmic weather repeatedly asks you to choose the latter.</p>

<h2>Love & Relationships 2026</h2>
<h3>For Single Leos</h3>
<p>The first half of 2026 brings intriguing romantic possibilities. Your natural magnetism is amplified by favorable Venus transits in Q1 and Q2. The key: don't just attract admirers — look for genuine equals who challenge and inspire you.</p>

<h3>For Leos in Relationships</h3>
<p>Mid-year brings an opportunity to either deepen existing commitments or acknowledge that some partnerships have reached their natural end. Honesty about your needs — even when it's uncomfortable — creates the relationships that actually sustain you.</p>

<h2>Career & Money 2026</h2>
<ul>
<li><strong>Creative breakthroughs</strong>: Q1 and Q3 are particularly powerful for creative projects gaining recognition</li>
<li><strong>Leadership consolidation</strong>: Any leadership role you're developing benefits from consistent, visible contribution</li>
<li><strong>Financial building</strong>: Saturn's influence rewards disciplined financial management; the foundations you build now pay dividends for years</li>
</ul>

<h2>Personal Growth Focus</h2>
<p>2026 asks Leo to develop the kind of confidence that doesn't require external validation. The most significant personal growth comes from creating things you're proud of — even when no one is watching — and from allowing yourself to receive support graciously.</p>

<h2>Lucky Periods for Leo 2026</h2>
<ul>
<li>Most fortunate: February, July-August, December</li>
<li>Exercise patience: May, October</li>
<li>Creative peak: Late summer (August-September)</li>
</ul>

<h2>Leo Affirmation for 2026</h2>
<p><em>"My authentic light attracts everything aligned with my highest good. I shine from genuine confidence, not the need for approval."</em></p>
</article>`
  },
  {
    slug: "horoscope-scorpio-2026-annual-complete",
    title: "Scorpio 2026 Complete Annual Horoscope — Deep Transformation & Power Shifts",
    category: "horoscope",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Scorpio 2026 Complete Annual Horoscope — Deep Transformation & Power Shifts</h1>
<p>2026 is a year of powerful reckoning and transformation for Scorpio. The cosmic weather this year accelerates processes of change that may have been building for some time — and Scorpio, with your resilience and depth, is uniquely equipped to navigate and emerge powerfully from these shifts.</p>

<h2>Overview: Scorpio 2026</h2>
<p>The central theme for Scorpio in 2026 is conscious transformation. Things will change — the question is whether you're actively shaping those changes or reacting to them. The Scorpios who thrive in 2026 are those who choose to transform deliberately rather than resist until forced.</p>

<h2>Love & Relationships 2026</h2>
<h3>Intimacy Evolution</h3>
<p>Existing relationships face deep honesty tests in the first half of 2026. Any pretenses, suppressed resentments, or unspoken truths come to the surface — this is not to destroy relationships but to create genuine intimacy. Relationships that survive this honesty emerge much stronger.</p>

<h3>For Single Scorpios</h3>
<p>The second half of 2026 brings significant romantic potential. Having spent the first half doing your own deep work, you become extraordinarily attractive to people of genuine depth. The connections possible in Q3-Q4 have real potential for meaningful partnership.</p>

<h2>Career & Money 2026</h2>
<ul>
<li>Hidden financial opportunities surface mid-year — trust your investigative instincts</li>
<li>Power shifts in your professional environment may create unexpected openings</li>
<li>Investments and shared financial matters need careful, strategic attention in Q2</li>
<li>Your ability to see what others miss becomes a significant professional asset in 2026</li>
</ul>

<h2>Health & Transformation</h2>
<p>2026 is an excellent year for deep healing work — therapy, shadow work, detox protocols, or addressing long-standing health patterns. The transformation available goes deeper than surface change; structural healing is possible.</p>

<h2>Lucky Periods for Scorpio 2026</h2>
<ul>
<li>Most fortunate: March, August, November</li>
<li>Major transformation windows: May-June, September-October</li>
<li>Exercise caution: January (assess carefully before major commitments)</li>
</ul>

<h2>Scorpio Affirmation for 2026</h2>
<p><em>"I transform with intention and emerge with greater power. My depth is my greatest gift."</em></p>
</article>`
  },
  {
    slug: "dream-about-spider-web-caught-meaning",
    title: "梦见蜘蛛网或被困梦境：深层含义与解脱的启示",
    category: "dream",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>梦见蜘蛛网或被困梦境：深层含义与解脱的启示</h1>
<p>梦见蜘蛛网，或梦见自己被什么东西缠住、困住，是心理状态的重要反映。这类梦境往往揭示内心深处对某种处境的真实感受。</p>

<h2>梦见蜘蛛网的含义</h2>
<p>蜘蛛网在梦境中有多重象征：</p>
<ul>
<li><strong>陷阱与约束</strong>：感觉被某段关系、工作或情况困住，难以脱身</li>
<li><strong>复杂的处境</strong>：生活中某个领域的情况错综复杂，像网一样难以理清</li>
<li><strong>创造与策略</strong>：蜘蛛织网是一种有意识的创造行为，梦中蛛网也可能代表你正在精心构建某件事</li>
<li><strong>等待的力量</strong>：蜘蛛在网中等待——这可能是提醒你需要耐心等待合适时机</li>
</ul>

<h2>梦见自己被蜘蛛网困住</h2>
<p>这是最常见的场景，通常意味着：</p>
<ul>
<li>在某段关系或处境中感到受限和无力</li>
<li>被某人的控制欲或操控行为束缚</li>
<li>自己内心的恐惧或犹豫不决正在限制你的行动</li>
</ul>
<p><strong>积极解读</strong>：蜘蛛网可以被打破。这个梦提醒你：约束并非永久，你有能力挣脱。</p>

<h2>梦见蜘蛛在织网</h2>
<p>看着蜘蛛认真织网，通常是积极的象征：</p>
<ul>
<li>你或某人正在系统地构建某件重要的事情</li>
<li>耐心和细致正在积累力量</li>
<li>某个长期计划正在稳步推进中</li>
</ul>

<h2>传统周公解梦视角</h2>
<ul>
<li>梦见蜘蛛网：近期事务可能变得复杂，需要谨慎处理</li>
<li>梦见扫除蜘蛛网：有摆脱困境的意愿和力量，困局将解</li>
<li>梦见蜘蛛在你身上织网：某人或某情况正在对你施加影响，需警惕</li>
</ul>

<h2>如何回应这类梦境</h2>
<ol>
<li>思考生活中哪些关系或处境让你感到"被网住"</li>
<li>这个约束是真实存在的，还是你内心恐惧的投影？</li>
<li>如果是真实的约束，你有什么具体的行动可以逐步挣脱？</li>
<li>如果是内心的恐惧，这个恐惧想要保护你免受什么伤害？</li>
</ol>

<h2>总结</h2>
<p>蜘蛛网梦境是潜意识在告诉你：你感到某种程度的受限。这个认知本身就是解脱的第一步。接下来的任务是辨认网的性质——是真实的外部约束，还是内心构建的限制，然后系统地找到走出去的路。</p>
</article>`
  },
  {
    slug: "dream-about-wolf-meaning",
    title: "梦见狼是什么意思？凶兆还是力量的象征？完整解析",
    category: "dream",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>梦见狼是什么意思？凶兆还是力量的象征？完整解析</h1>
<p>狼在人类文化中有着复杂而深刻的象征意义——既是凶险的威胁，也是群体的守护者，既是黑暗力量的象征，也代表着野性的自由和力量。梦见狼意味着什么？</p>

<h2>狼的双重象征</h2>
<p>理解狼梦的关键，在于识别梦中狼的状态和你对它的感受：</p>
<ul>
<li><strong>威胁的狼（攻击性、令你恐惧）</strong>：通常象征外部威胁或内心的攻击性能量</li>
<li><strong>和平的狼（注视、陪伴）</strong>：往往象征野性智慧、本能力量的觉醒</li>
<li><strong>狼群</strong>：群体关系、归属感、家族/社群动态</li>
</ul>

<h2>常见狼梦场景解析</h2>
<h3>梦见被狼追赶</h3>
<p>这是最常见的狼梦之一，通常反映：</p>
<ul>
<li>在逃避某种你害怕正视的本能冲动或欲望</li>
<li>现实中感到某种威胁或压力在追着你</li>
<li>逃避某种需要你正视的情绪</li>
</ul>

<h3>梦见狼咬你</h3>
<p>被狼咬可能意味着：</p>
<ul>
<li>在某段关系中受到了伤害或被信任的人背叛</li>
<li>某种野性的本能正在强迫你去正视它</li>
<li>需要为自己建立更清晰的界限</li>
</ul>

<h3>梦见与狼共处（不害怕）</h3>
<p>这是特别有力量感的梦境：</p>
<ul>
<li>你正在与自己的野性本能、原始力量达成和解</li>
<li>你在某个群体或关系中找到了真正的归属</li>
<li>内在力量正在觉醒，准备好面对更大的挑战</li>
</ul>

<h3>梦见喂食或救助狼</h3>
<p>对狼表现出善意，象征你正在与自己内心被压制的力量建立连接，也可能代表你在帮助某个外表强悍但内心脆弱的人。</p>

<h2>传统解梦视角</h2>
<ul>
<li>梦见狼：提防生活中的危险或背叛者，需谨慎交友</li>
<li>梦见杀死狼：能够克服困难，战胜敌人或对手</li>
<li>梦见狼群：可能涉及到与多人的复杂关系或竞争处境</li>
</ul>

<h2>荣格视角：狼作为阴影原型</h2>
<p>在荣格心理学中，狼往往代表"阴影"——那些被社会化进程压制的原始本能、愤怒、欲望和力量。梦见狼是邀请你去整合这些被压制的能量，而不是继续压制它们。</p>

<h2>总结</h2>
<p>狼梦最重要的信息是：你内心或周围有一种原始力量正在活跃。这股力量可以是威胁，也可以是礼物——取决于你如何与它建立关系。</p>
</article>`
  },
  {
    slug: "numerology-2026-personal-year-guide",
    title: "Numerology 2026 — Your Personal Year Number & What It Means for Love, Career & Growth",
    category: "numerology",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Numerology 2026 — Your Personal Year Number & What It Means for Love, Career & Growth</h1>
<p>In numerology, each year carries a specific vibration that shapes the overall theme of your personal journey. 2026 is a Universal Year 1 (2+0+2+6 = 10 = 1), marking a collective new beginning. But your Personal Year number creates the specific lens through which you'll experience this energy.</p>

<h2>How to Calculate Your Personal Year Number</h2>
<p>Add your birth month + birth day + the current year (2026), then reduce to a single digit.</p>
<p>Example: Born September 15 → 9 + 1 + 5 + 2 + 0 + 2 + 6 = 25 → 2 + 5 = <strong>7 Personal Year</strong></p>

<h2>Personal Year 1 (2026)</h2>
<p><strong>Theme: New Beginnings & Fresh Starts</strong></p>
<p>This is the beginning of a brand new 9-year cycle. Everything you plant now will grow over the next decade. Bold action, new ventures, and assertive self-expression are powerfully supported. Love: excellent time to begin new relationships or take existing ones to new levels. Career: launch projects, start businesses, seek new positions.</p>

<h2>Personal Year 2 (2026)</h2>
<p><strong>Theme: Partnership, Patience & Receptivity</strong></p>
<p>After last year's bold beginnings, 2026 asks you to be patient and cooperative. Relationships deepen and become more important. Key decisions benefit from collaboration. Love: committed relationships deepen; new relationships develop slowly but meaningfully. Career: teamwork and collaboration over solo effort.</p>

<h2>Personal Year 3 (2026)</h2>
<p><strong>Theme: Creative Expression & Social Expansion</strong></p>
<p>Creative energy is at its peak. Express yourself boldly — writing, art, performance, social media. Your social life expands and opportunities come through connections. Love: playful, light-hearted romance is favored; enjoy rather than over-commit. Career: creative fields, communication, and public presence all flourish.</p>

<h2>Personal Year 4 (2026)</h2>
<p><strong>Theme: Building Foundations & Disciplined Work</strong></p>
<p>This year is about laying solid groundwork. It's not glamorous, but the structures you build now last. Love: serious relationship decisions are made — what's solid will be formalized, what isn't will end. Career: consistent hard work pays off; discipline creates lasting results.</p>

<h2>Personal Year 5 (2026)</h2>
<p><strong>Theme: Change, Freedom & Unexpected Shifts</strong></p>
<p>Change is the constant this year. Expect the unexpected and embrace adaptability. Resist clinging to the familiar when life invites you to expand. Love: existing relationships may face freedom vs. commitment tensions; new relationships begin with excitement and unpredictability. Career: transitions, new opportunities, and lifestyle shifts are favored.</p>

<h2>Personal Year 6 (2026)</h2>
<p><strong>Theme: Home, Responsibility & Nurturing</strong></p>
<p>Family, home, and community take center stage. Taking responsibility for relationships brings profound rewards. Love: marriage, deepening commitments, and family decisions are 6 year hallmarks. Career: service-oriented work and helping professions flourish.</p>

<h2>Personal Year 7 (2026)</h2>
<p><strong>Theme: Introspection, Spiritual Depth & Inner Wisdom</strong></p>
<p>A year of turning inward. External achievement takes a back seat to inner development. Solitude, study, and spiritual seeking are highly productive. Love: relationships deepen through authenticity, or you recognize which relationships lack depth. Career: research, specialist work, and developing expertise.</p>

<h2>Personal Year 8 (2026)</h2>
<p><strong>Theme: Power, Achievement & Material Success</strong></p>
<p>The year of material results from years of work. Financial gains, career achievements, and personal power are all available to those who have been building foundations. Love: relationships may need to balance ambition with connection. Career: leadership, business success, and financial rewards.</p>

<h2>Personal Year 9 (2026)</h2>
<p><strong>Theme: Completion, Release & Transformation</strong></p>
<p>This is the final year of a 9-year cycle. Release what no longer serves you — relationships, habits, roles, places. Completion prepares the ground for Personal Year 1's new beginning. Love: relationships that have served their purpose may end; those meant to continue are purified and strengthened. Career: complete major projects, release stagnant situations.</p>
</article>`
  }
];

let success = 0, fail = 0;
for (const post of posts) {
  const { error } = await supabase
    .from("mysticai_blog_posts")
    .upsert(post, { onConflict: "slug" });
  if (error) {
    console.error(`FAIL [${post.slug}]:`, error.message);
    fail++;
  } else {
    console.log(`OK   [${post.slug}]`);
    success++;
  }
}
console.log(`\nDone: ${success} success, ${fail} fail`);
