/**
 * 批次R4：占星专题长文 + 塔罗专题文章（英文）
 * - 土星回归完整指南
 * - 木星星座全12个（Jupiter in each sign）
 * - 北交点/南交点占星含义
 * - 塔罗五大专题问题指南
 */
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);

const posts = [
  {
    slug: "saturn-return-complete-guide",
    category: "astrology",
    title: "Saturn Return: Complete Guide to Your First, Second, and Third Saturn Return",
    title_en: "Saturn Return: Complete Guide to Your First, Second, and Third Saturn Return",
    description: "Saturn Return happens around ages 27-30, 57-60, and 87-90. It's the most significant astrological transit of your life — a complete reckoning with authenticity, structure, and commitment. This guide explains everything.",
    keywords: ["saturn return","saturn return meaning","saturn return age","saturn return astrology","first saturn return","saturn return 27","saturn return signs"],
    published_at: "2026-09-01",
    reading_time: 14,
    cta_href: "/birth-chart",
    cta_label: "🔮 When Is Your Saturn Return? — Check Your Birth Chart",
    cta_label_en: "When Is Your Saturn Return? — Check Your Birth Chart",
    content: `<h2>What Is a Saturn Return?</h2>
<p>Saturn takes approximately 29.5 years to complete one orbit of the Sun and return to the exact position it occupied at your birth. This moment — called a <strong>Saturn Return</strong> — is widely considered the most significant astrological transit in a human lifetime. It's not a single day but a period spanning roughly two to three years, during which Saturn's energy intensifies around the themes of your natal Saturn placement.</p>
<p>The Saturn Return is the universe's audit: a time when the structures you've built — your career, relationships, identity, values, habits — are evaluated for authenticity and long-term viability. What's real and solid gets reinforced. What was built on avoidance, fear, or someone else's expectations tends to crumble.</p>
<h2>The First Saturn Return: Ages 27-30</h2>
<p>This is the transit most people mean when they say "Saturn Return," and it's the most famously disruptive. You're being asked: <em>What kind of adult do you actually want to be?</em> The life you've been living — often shaped by family expectations, social defaults, and unconscious patterns — is now being called to account.</p>
<p>Common First Saturn Return experiences:</p>
<ul>
<li>Career crisis — realizing you're in the wrong field, or that you need to build more seriously in the right one</li>
<li>Relationship reckoning — marriages that weren't built on solid foundations tend to either strengthen significantly or dissolve</li>
<li>Health confrontations — the body beginning to ask for more serious attention and care</li>
<li>Identity clarity — finally knowing who you are beneath the personas you've been performing</li>
</ul>
<p>The gift of the First Saturn Return, when engaged consciously: the foundation of an authentic adult life, built by you, for you.</p>
<h2>The Second Saturn Return: Ages 57-60</h2>
<p>By the Second Saturn Return, you've lived a full adult life and you're now being asked: <em>What has mattered? What do you want the second half to be about?</em> This transit often brings retirement questions, health confrontations, relationship re-evaluation, and the beginning of legacy thinking.</p>
<p>Common Second Saturn Return themes:</p>
<ul>
<li>Career culmination or second-act pivot</li>
<li>Relationship deepening or final endings of partnerships that never truly fit</li>
<li>Confronting mortality more directly — and deciding how to live in light of that awareness</li>
<li>Wisdom consolidation — distilling what you've actually learned</li>
</ul>
<h2>The Third Saturn Return: Ages 87-90</h2>
<p>The rare few who reach this transit are encountering Saturn's final audit: <em>How fully did I live? What did I leave?</em> It's a transit of completion and preparation for whatever comes next.</p>
<h2>Saturn Return by Sign</h2>
<p>The sign Saturn occupied at your birth shapes the specific themes of your Saturn Return. Saturn in Scorpio returns differently than Saturn in Gemini. The house placement adds another layer — where exactly in your life is Saturn demanding this reckoning?</p>
<h2>How to Work With Your Saturn Return</h2>
<p>Saturn doesn't reward avoidance — it amplifies it. The most useful posture toward a Saturn Return is radical honesty: what's not working? What have you been building on a false foundation? What does authenticity require of you right now?</p>
<p>Saturn returns are painful when they catch you in denial. When you meet them with clear-eyed willingness to rebuild, they're among the most transformative and ultimately freeing transits in astrology.</p>`
  },
  {
    slug: "north-node-south-node-astrology-guide",
    category: "astrology",
    title: "North Node and South Node in Astrology: Complete Guide to Your Lunar Nodes",
    title_en: "North Node and South Node in Astrology: Complete Guide to Your Lunar Nodes",
    description: "Your North Node and South Node reveal your soul's direction in this lifetime — where you're growing toward and what karmic patterns you're releasing. This complete guide covers all 12 North Node signs and houses.",
    keywords: ["north node astrology","south node astrology","lunar nodes meaning","north node in signs","north node zodiac","karmic astrology nodes","true node astrology"],
    published_at: "2026-09-02",
    reading_time: 13,
    cta_href: "/birth-chart",
    cta_label: "🔮 Find Your North Node — Free Birth Chart",
    cta_label_en: "Find Your North Node — Free Birth Chart",
    content: `<h2>What Are the Lunar Nodes?</h2>
<p>The North Node (☊) and South Node (☋) are not planets but mathematical points where the Moon's orbital path intersects the ecliptic (the Sun's apparent path through the zodiac). They're always exactly opposite each other in the birth chart, creating an axis that many astrologers consider the most important indicator of <strong>soul purpose and karmic direction</strong>.</p>
<h2>The South Node: What You're Releasing</h2>
<p>The South Node represents where you've come from — the sign, house, and energetic patterns that feel instinctively natural and comfortable, often because they're deeply familiar from past experience (whether you interpret this as past lives, inherited family patterns, or simply early conditioning). South Node energy flows easily — perhaps <em>too</em> easily. It's where you default, where you retreat when stressed, where your comfort zone lives.</p>
<p>South Node comfort can become a trap. When you stay there too long, it stops nourishing and starts stagnating.</p>
<h2>The North Node: Where You're Growing</h2>
<p>The North Node points toward the qualities, behaviors, and experiences you're here to develop. It feels unfamiliar, even uncomfortable — because it genuinely is. Growth always feels awkward before it feels natural.</p>
<p>Working with your North Node doesn't mean abandoning your South Node entirely — it means integrating both, using the South Node's gifts while extending yourself toward the North Node's direction.</p>
<h2>North Node by Sign</h2>
<p><strong>North Node in Aries</strong> — Learning to assert yourself, act independently, and stop waiting for others' permission or validation. Moving away from Libra's people-pleasing.</p>
<p><strong>North Node in Taurus</strong> — Learning stability, embodiment, and material groundedness. Moving away from Scorpio's intensity, power dynamics, and transformation for its own sake.</p>
<p><strong>North Node in Gemini</strong> — Learning intellectual curiosity, local connection, and the value of small stories. Moving away from Sagittarius's need for grand meaning in every experience.</p>
<p><strong>North Node in Cancer</strong> — Learning emotional intelligence, nurturing, and vulnerability. Moving away from Capricorn's stoicism and achievement-as-identity.</p>
<p><strong>North Node in Leo</strong> — Learning self-expression, creative courage, and being seen. Moving away from Aquarius's detachment and group-over-individual identity.</p>
<p><strong>North Node in Virgo</strong> — Learning discernment, practical service, and presence in the details. Moving away from Pisces's dissolution and spiritual escape.</p>
<p><strong>North Node in Libra</strong> — Learning partnership, compromise, and fairness. Moving away from Aries's self-first, go-it-alone approach.</p>
<p><strong>North Node in Scorpio</strong> — Learning depth, intimacy, and transformation. Moving away from Taurus's attachment to comfort and material security.</p>
<p><strong>North Node in Sagittarius</strong> — Learning philosophical expansion, truth-seeking, and meaning-making. Moving away from Gemini's collection of information without integration.</p>
<p><strong>North Node in Capricorn</strong> — Learning structure, discipline, and earned authority. Moving away from Cancer's emotional reactivity and dependency on family approval.</p>
<p><strong>North Node in Aquarius</strong> — Learning community, progressive vision, and the collective good. Moving away from Leo's ego-centric creative identity.</p>
<p><strong>North Node in Pisces</strong> — Learning compassion, surrender, and spiritual connection. Moving away from Virgo's need for control and perfection.</p>
<h2>Working With Your Nodes</h2>
<p>The North Node isn't a destination to arrive at — it's a direction to keep moving toward. Each time you consciously choose the qualities of your North Node sign over the comfortable defaults of your South Node, you're working with your soul's stated intention for this lifetime. It's rarely comfortable. It's almost always worth it.</p>`
  },
  {
    slug: "tarot-for-health-wellness-guide",
    category: "tarot",
    title: "Tarot for Health and Wellness: How to Read Tarot Cards for Your Physical and Mental Wellbeing",
    title_en: "Tarot for Health and Wellness: How to Read Tarot Cards for Your Physical and Mental Wellbeing",
    description: "Tarot can offer surprisingly practical guidance for health and wellness questions — helping you understand stress patterns, identify what your body needs, and explore your relationship with self-care. Learn how to read tarot for health.",
    keywords: ["tarot for health","health tarot reading","tarot wellness","tarot cards for health","mental health tarot","tarot body","health tarot spread"],
    published_at: "2026-09-03",
    reading_time: 11,
    cta_href: "/tarot",
    cta_label: "🔮 Get Your Wellness Tarot Reading — AI",
    cta_label_en: "Get Your Wellness Tarot Reading — AI",
    content: `<h2>Can Tarot Actually Help with Health Questions?</h2>
<p>Tarot is not a medical tool and should never replace professional healthcare. That said, tarot is extraordinarily useful for the psychological, emotional, and behavioral dimensions of health — the relationship you have with your body, the stress patterns affecting your wellbeing, the areas of self-care you're neglecting, and the emotional undercurrents driving physical symptoms.</p>
<p>Approached this way, health tarot readings can be some of the most practically valuable readings available.</p>
<h2>Which Cards Signal Health Concerns</h2>
<p>Certain cards, in health-focused readings, consistently carry body-and-wellness associations:</p>
<ul>
<li><strong>The Emperor</strong> — Structure, discipline, physical vitality; also potential rigidity that creates stress-related issues</li>
<li><strong>The Star</strong> — Recovery, healing, hope; often appears after periods of illness as restoration begins</li>
<li><strong>The Tower</strong> — Sudden health revelations or disruptions; a wake-up call about the body</li>
<li><strong>Four of Swords</strong> — Rest is required; the body needs genuine recovery, not just pushing through</li>
<li><strong>Nine of Pentacles</strong> — Physical wellbeing through quality self-care; the body flourishing</li>
<li><strong>Five of Pentacles</strong> — Physical depletion, illness, or neglect of material/bodily needs</li>
<li><strong>The Hermit</strong> — Solitude as medicine; inner work as the primary healing required</li>
</ul>
<h2>A Three-Card Health and Wellness Spread</h2>
<p><strong>Position 1: What my body is trying to tell me</strong><br>This position often reveals what physical symptoms or energy patterns are communicating beneath the surface.</p>
<p><strong>Position 2: What I need more of for wellbeing</strong><br>The specific nourishment — physical, emotional, or spiritual — currently absent or insufficient.</p>
<p><strong>Position 3: What to release for greater health</strong><br>The pattern, habit, or belief that is actively working against your wellbeing.</p>
<h2>Reading Tarot for Mental Health</h2>
<p>Tarot is particularly well-suited to mental health exploration — not diagnosis, but understanding. Cards that frequently appear in mental health readings:</p>
<ul>
<li><strong>Eight of Swords</strong> — Mental imprisonment through thought patterns; anxiety creating its own cage</li>
<li><strong>Nine of Swords</strong> — Nighttime anxiety, intrusive thoughts, the mind's capacity to generate suffering</li>
<li><strong>The Moon</strong> — Confusion, anxiety, the shadowed and uncertain parts of the psyche</li>
<li><strong>The Sun</strong> — Joy, clarity, mental health at its most expansive and vital</li>
<li><strong>Temperance</strong> — Balance and integration; the card of sustainable mental wellbeing</li>
</ul>
<h2>Important Boundaries</h2>
<p>Tarot should support your healing journey, not replace your medical team. If cards consistently point toward significant health concerns — especially the Tower, Five of Pentacles reversed, or repeated Three of Swords in health positions — treat this as a prompt to seek professional support, not a diagnosis or prognosis.</p>`
  },
  {
    slug: "tarot-for-decision-making-guide",
    category: "tarot",
    title: "Tarot for Decision Making: How to Use Tarot Cards When You're Facing a Hard Choice",
    title_en: "Tarot for Decision Making: How to Use Tarot Cards When You're Facing a Hard Choice",
    description: "Tarot is one of the most powerful tools for navigating difficult decisions — not by predicting outcomes, but by illuminating what you already know and what you're not yet seeing clearly. Learn how to read tarot for decisions.",
    keywords: ["tarot for decisions","tarot decision making","tarot should i","decision tarot spread","tarot for choices","how to use tarot for decisions","should i tarot reading"],
    published_at: "2026-09-04",
    reading_time: 10,
    cta_href: "/tarot",
    cta_label: "🔮 Get Your Decision Tarot Reading — AI",
    cta_label_en: "Get Your Decision Tarot Reading — AI",
    content: `<h2>Why Tarot Works for Decisions</h2>
<p>Tarot doesn't make decisions for you — and that's exactly why it works. When you're facing a genuinely difficult choice, the problem usually isn't lack of information. It's that you have conflicting priorities, hidden fears, or unconscious preferences that are muddying your thinking. Tarot creates a structured space for those hidden dynamics to become visible.</p>
<p>The cards don't tell you what to do. They show you what you already know, what you're avoiding, and what you might be missing.</p>
<h2>Before You Read: Frame the Question Well</h2>
<p>The quality of a decision tarot reading depends enormously on the quality of the question. Avoid yes/no framings if possible — they limit what the cards can reveal.</p>
<p><strong>Instead of:</strong> "Should I take this job offer?"<br>
<strong>Try:</strong> "What do I most need to understand about this decision?" or "What would serve my highest good regarding this job opportunity?"</p>
<h2>A Six-Card Decision Spread</h2>
<p><strong>Card 1: The core of this decision</strong> — What is this choice fundamentally about?</p>
<p><strong>Card 2: What I know but am not fully admitting</strong> — Your unconscious clarity about this situation.</p>
<p><strong>Card 3: What I fear about Option A</strong></p>
<p><strong>Card 4: What I fear about Option B</strong></p>
<p><strong>Card 5: What choosing Option A would teach me</strong></p>
<p><strong>Card 6: What choosing Option B would teach me</strong></p>
<p>Notice: this spread doesn't tell you which option is "better" — it helps you understand what each path would require of you and what you're afraid of in each direction. Often, by the time you've read these six cards, the decision is obvious.</p>
<h2>Reading Your Reaction to the Cards</h2>
<p>One of the most powerful decision-making techniques in tarot: <em>before you interpret the cards, notice how you feel when you see them.</em> If you pull a card for "Option A's outcome" and feel relief, that relief is information. If you feel disappointment, that's even more information. Your gut response to what the cards show often reveals the preference you were afraid to acknowledge directly.</p>
<h2>When the Cards Seem to Contradict Each Other</h2>
<p>A reading that pulls in multiple directions isn't a failed reading — it's an accurate portrait of a genuinely complex decision. When cards contradict, ask: <em>which part of me does each card represent?</em> The internal conflict being played out in the spread is the decision you actually need to make — not between Option A and Option B, but between two parts of yourself with different priorities.</p>`
  },
  {
    slug: "jupiter-return-and-jupiter-transits-guide",
    category: "astrology",
    title: "Jupiter Return and Jupiter Transits: Complete Guide to Lucky Jupiter Years",
    title_en: "Jupiter Return and Jupiter Transits: Complete Guide to Lucky Jupiter Years",
    description: "Jupiter returns to its natal position every 12 years, bringing expansion, opportunity, and growth. Learn when your Jupiter Return happens, how Jupiter transits affect each sign, and how to maximize Jupiter's lucky windows.",
    keywords: ["jupiter return","jupiter transits","lucky years astrology","jupiter astrology","jupiter in signs 2026","jupiter return meaning","when is my jupiter return"],
    published_at: "2026-09-05",
    reading_time: 11,
    cta_href: "/birth-chart",
    cta_label: "🔮 Find Your Jupiter Return — Free Birth Chart",
    cta_label_en: "Find Your Jupiter Return — Free Birth Chart",
    content: `<h2>What Is a Jupiter Return?</h2>
<p>Jupiter, the largest planet in our solar system, takes approximately 12 years to complete one orbit of the Sun. Every 12 years — at roughly ages 12, 24, 36, 48, 60, 72 — Jupiter returns to the exact position it occupied at your birth. This <strong>Jupiter Return</strong> is considered one of the most fortunate transits in astrology: a year-long window of expansion, opportunity, and growth in the areas of life where your natal Jupiter lives.</p>
<p>While Saturn Returns are the universe's audit, Jupiter Returns are the universe's bonus cycle. They open doors. They expand what's possible. They bring luck, opportunity, and growth — if you're in a position to use them.</p>
<h2>The Jupiter Return Ages</h2>
<ul>
<li><strong>Age 12:</strong> First Jupiter Return — adolescent expansion, broadening worldview, a time of natural growth and new possibilities</li>
<li><strong>Age 24:</strong> Second Jupiter Return — often a major turning point in early adult life, new opportunities after the turbulence of the early 20s</li>
<li><strong>Age 36:</strong> Third Jupiter Return — often brings significant career expansion, major relationship development, or meaningful life broadening</li>
<li><strong>Age 48:</strong> Fourth Jupiter Return — midlife expansion and reinvention; philosophical and creative deepening</li>
<li><strong>Age 60:</strong> Fifth Jupiter Return — often aligns with the beginning of a new chapter, retirement pivot, or major life shift</li>
</ul>
<h2>How to Work With Your Jupiter Return</h2>
<p>Jupiter rewards expansiveness and risk. During your Jupiter Return, the universe creates openings — but you still have to walk through the door. Sitting passively expecting luck to arrive misses the point. Jupiter's gift is that when you make moves during this transit, they tend to land better than they would at other times.</p>
<p>Ask yourself during your Jupiter Return year: <em>Where have I been playing too small? What would I do if I actually believed the timing was good? What's the expansive version of the choice in front of me?</em></p>
<h2>Jupiter Transiting Each House</h2>
<p><strong>First House:</strong> A year of personal expansion — how you present yourself, your vitality, and your sense of possibility all expand. Often brings literal or metaphorical increase.</p>
<p><strong>Second House:</strong> Financial expansion opportunities; increased earning potential; growing your relationship with material resources and self-worth.</p>
<p><strong>Seventh House:</strong> Significant partnership opportunities; expanding your relationship world; potentially meeting important people.</p>
<p><strong>Tenth House:</strong> Career expansion; public recognition; reputation growing; career opportunities.</p>
<h2>Jupiter in Gemini 2025-2026</h2>
<p>From mid-2025 through mid-2026, Jupiter moves through Gemini — expanding communication, information, learning, and connection. This period benefits Gemini, Libra, and Aquarius (air signs) most directly, but everyone can tap into its energy by focusing on learning, broadening networks, and expanding through communication.</p>`
  }
];

async function main() {
  console.log(`📝 批次R4：写入 ${posts.length} 篇占星/塔罗专题文章...`);
  let success = 0, fail = 0;
  for (const post of posts) {
    const { error } = await supabase.from("mysticai_blog_posts").upsert(post, { onConflict: "slug" });
    if (error) { console.error(`  ❌ [${post.slug}]:`, error.message); fail++; }
    else { console.log(`  ✅ [${post.slug}]`); success++; }
  }
  console.log(`\n完成！成功: ${success}, 失败: ${fail}`);
}
main().catch(console.error);
