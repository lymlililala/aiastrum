/**
 * 批次P4：塔罗实用指南（三牌阵/凯尔特十字/每日占卜/感情牌阵/职场牌阵）
 */
import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = "https://tixgzezefjjsyuzgdhcd.supabase.co";
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E";
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const posts = [
  {
    slug: "three-card-tarot-spread-guide",
    category: "tarot",
    title: "Three-Card Tarot Spread: The Complete Guide to Past, Present, Future Readings",
    title_en: "Three-Card Tarot Spread: The Complete Guide to Past, Present, Future Readings",
    description: "The three-card spread is the most versatile layout in tarot. This complete guide covers 8 different three-card spread variations, how to read card interactions, and how to handle contradictory cards — perfect for beginners and experienced readers alike.",
    keywords: ["three card tarot spread","three card spread","past present future tarot","tarot spread for beginners","3 card tarot reading","tarot spread guide"],
    published_at: "2026-07-22",
    reading_time: 12,
    cta_href: "/tarot",
    cta_label: "🔮 Try a Three-Card AI Reading Now",
    cta_label_en: "Try a Three-Card AI Reading Now",
    content: `<h2>Why the Three-Card Spread?</h2>
<p>If you could only learn one tarot layout, the three-card spread would be the right choice. It's flexible enough to address virtually any question, simple enough to complete in a few minutes, and structured enough to provide genuine direction. Professional tarot readers use it constantly — not because they haven't learned more complex spreads, but because three cards, properly understood, can answer almost anything.</p>
<h2>How to Set Up a Three-Card Reading</h2>
<ol>
<li><strong>Choose your question.</strong> The more specific the question, the more useful the reading. "What should I do about my relationship?" is too broad. "What's the most important thing I'm not seeing clearly in my relationship right now?" is much more workable.</li>
<li><strong>Shuffle while holding the question.</strong> There's no single "correct" shuffling method — what matters is that you're mentally present with the question while you shuffle.</li>
<li><strong>Draw three cards.</strong> Place them left to right, face down, then flip them together or one at a time (different readers prefer different approaches).</li>
<li><strong>Read the cards in relation to each other.</strong> A single card means less than three cards in conversation.</li>
</ol>
<h2>8 Three-Card Spread Variations</h2>
<h3>1. Past — Present — Future</h3>
<p>The classic. Each position answers exactly what it says:</p>
<ul>
<li><strong>Card 1 (Past):</strong> What has led to this situation; the context you're coming from</li>
<li><strong>Card 2 (Present):</strong> Where you actually are right now; the current energy</li>
<li><strong>Card 3 (Future):</strong> Where things are heading if the current energy continues</li>
</ul>
<p>Important note: The "future" card is not fixed fate. It shows probable direction based on current trajectory — you can change it.</p>
<h3>2. Situation — Action — Outcome</h3>
<p>More practical than past/present/future:</p>
<ul>
<li><strong>Card 1:</strong> The honest state of the situation (not how you wish it were)</li>
<li><strong>Card 2:</strong> The action or approach most likely to serve you well</li>
<li><strong>Card 3:</strong> The probable outcome if you take that action</li>
</ul>
<h3>3. Mind — Body — Spirit</h3>
<p>Excellent for personal well-being readings:</p>
<ul>
<li><strong>Card 1 (Mind):</strong> Mental state, thoughts, beliefs affecting the situation</li>
<li><strong>Card 2 (Body):</strong> Physical reality, practical circumstances, material factors</li>
<li><strong>Card 3 (Spirit):</strong> Deeper purpose, soul-level guidance, what genuinely serves your growth</li>
</ul>
<h3>4. What to Embrace — What to Release — What to Learn</h3>
<p>Particularly useful during transitions:</p>
<ul>
<li><strong>Card 1:</strong> What is genuinely serving you and worth leaning into</li>
<li><strong>Card 2:</strong> What is holding you back and needs to be consciously let go</li>
<li><strong>Card 3:</strong> The core lesson or insight this situation is trying to teach you</li>
</ul>
<h3>5. Option A — Option B — What You Need to Know</h3>
<p>When you're genuinely torn between two paths:</p>
<ul>
<li><strong>Card 1:</strong> The energy of the first option</li>
<li><strong>Card 2:</strong> The energy of the second option</li>
<li><strong>Card 3:</strong> The key factor or perspective you're missing that would clarify the decision</li>
</ul>
<h3>6. You — The Other Person — The Relationship</h3>
<p>Classic love spread structure:</p>
<ul>
<li><strong>Card 1:</strong> Your energy, state, or role in this dynamic</li>
<li><strong>Card 2:</strong> The other person's energy, state, or perspective</li>
<li><strong>Card 3:</strong> The relationship as an entity — its overall quality or direction</li>
</ul>
<h3>7. What I Know — What I Don't Know — What I Need to Know</h3>
<p>A self-awareness spread particularly suited to complex situations:</p>
<ul>
<li><strong>Card 1:</strong> What you're already conscious of and understand</li>
<li><strong>Card 2:</strong> What's happening in the blind spots — unconscious dynamics</li>
<li><strong>Card 3:</strong> The most important insight for moving forward</li>
</ul>
<h3>8. The Problem — The Root — The Solution</h3>
<p>Good for persistent issues that seem to recur:</p>
<ul>
<li><strong>Card 1:</strong> The issue as it presents on the surface</li>
<li><strong>Card 2:</strong> The underlying cause — why this keeps happening</li>
<li><strong>Card 3:</strong> The genuinely useful response (often different from what you've been trying)</li>
</ul>
<h2>Reading Card Interactions</h2>
<p>The most important skill in three-card readings isn't knowing individual card meanings — it's reading how the cards talk to each other:</p>
<ul>
<li><strong>All same suit:</strong> The reading has a dominant theme (all Cups = emotional; all Pentacles = practical)</li>
<li><strong>All Major Arcana:</strong> This is a significant, potentially life-changing situation — the forces at work are larger than the immediate details</li>
<li><strong>Contradictory cards:</strong> The tension IS the message. Two opposing cards in a reading often point to an internal conflict you haven't fully acknowledged</li>
<li><strong>Reversed cards:</strong> Their energy is present but operating differently — blocked, internalized, or requiring more attention before it can flow properly</li>
</ul>
<h2>Common Mistakes in Three-Card Readings</h2>
<ul>
<li><strong>Reading each card in isolation:</strong> All three cards are part of one story — let them inform each other</li>
<li><strong>Re-shuffling because you don't like the cards:</strong> The point is to understand what's actually present, not what you want to see</li>
<li><strong>Over-literal interpretation:</strong> The Death card doesn't mean death; the Tower doesn't mean a literal tower is falling. Use the cards as a language, not a literal prediction</li>
</ul>`
  },
  {
    slug: "celtic-cross-tarot-spread-guide",
    category: "tarot",
    title: "Celtic Cross Tarot Spread: A Complete Position-by-Position Guide",
    title_en: "Celtic Cross Tarot Spread: A Complete Position-by-Position Guide",
    description: "The Celtic Cross is the most famous and misunderstood tarot spread. This guide breaks down all 10 positions, explains the two most confusing spots (the crossing card and the hopes/fears position), and shows how to synthesize the full reading.",
    keywords: ["celtic cross tarot","celtic cross spread","celtic cross tarot positions","10 card tarot spread","celtic cross reading","tarot spread guide advanced"],
    published_at: "2026-07-23",
    reading_time: 14,
    cta_href: "/tarot",
    cta_label: "🔮 Get a Full Celtic Cross AI Reading",
    cta_label_en: "Get a Full Celtic Cross AI Reading",
    content: `<h2>Why Learn the Celtic Cross?</h2>
<p>The Celtic Cross has been the standard "full reading" tarot spread for well over a century. Its endurance isn't arbitrary — the layout captures a situation from multiple angles simultaneously: the present state, the underlying energy, the past, the possible future, the querent's inner state, external influences, hopes and fears, and the most probable outcome. Done well, a Celtic Cross reading provides a genuinely three-dimensional view of a situation.</p>
<p>Its reputation for being confusing is largely due to vague or inconsistent position descriptions. This guide gives you the clearest, most actionable interpretation for each position.</p>
<h2>The Classic Celtic Cross Layout</h2>
<p>Cards are placed in this order:</p>
<ol>
<li>The central card (the present situation)</li>
<li>The crossing card (what crosses/complicates it)</li>
<li>The foundation (distant past / root)</li>
<li>Recent past</li>
<li>Best possible outcome (if things go well)</li>
<li>Immediate future (next few weeks)</li>
<li>Your approach / how you're showing up</li>
<li>External influences / other people</li>
<li>Hopes and fears</li>
<li>The likely outcome</li>
</ol>
<h2>Position-by-Position Breakdown</h2>
<h3>Position 1: The Heart of the Matter</h3>
<p>This is the central issue, the current state, the core of what the reading is about. It should be read as the most accurate description of the situation as it actually is — not as you wish it were. A challenging card here is informative, not a threat.</p>
<h3>Position 2: What Crosses You</h3>
<p>This is one of the most misunderstood positions. The crossing card represents the primary complicating factor — the energy that's in tension with position 1. It can be an obstacle, a challenge, or simply a secondary force that's operating at the same time. <strong>Crucially: the crossing card is read in its upright meaning whether or not it's reversed in the physical layout.</strong></p>
<h3>Position 3: The Foundation / Root Cause</h3>
<p>The distant past — what created the conditions you're now in. This is often where unconscious patterns or long-standing dynamics that feed the current situation are visible. It's not necessarily negative; it may show strengths you've developed over time that are relevant now.</p>
<h3>Position 4: The Recent Past</h3>
<p>What has happened in the more immediate past — within weeks or a few months. This context is relevant to understanding how the current situation developed, but it's also already behind you. The energy here is departing rather than arriving.</p>
<h3>Position 5: The Best Possible Outcome / What Could Be</h3>
<p>This position shows the highest possible outcome — what could manifest if things go well and the best choices are made. It's aspirational, not guaranteed. If this is a challenging card, it may indicate that the "best" outcome still involves significant work or loss of something that no longer serves you.</p>
<h3>Position 6: The Immediate Future</h3>
<p>What's coming in the near term — typically interpreted as within a few weeks to a couple of months. This is the direction things are moving based on current momentum. Unlike position 10 (the outcome), this is more immediate and more easily influenced by present choices.</p>
<h3>Position 7: Your Attitude and Approach</h3>
<p>How you're showing up in the situation — your mindset, your stance, how you're handling things. This is the position of greatest self-honesty: it may reveal that you're approaching something in a way that isn't serving you, even if your intentions are good.</p>
<h3>Position 8: External Influences</h3>
<p>What's happening in the environment around you — other people's actions, social or workplace dynamics, material circumstances that you don't fully control. This helps contextualize what's "weather" versus what's within your sphere of influence.</p>
<h3>Position 9: Hopes and Fears</h3>
<p>This is the other frequently misunderstood position. It represents both — the hope and the fear are often the same thing. What you most want is also what you're most afraid of, or vice versa. Read this card as revealing the emotional stakes of the situation: what matters enough to both be desired and feared.</p>
<h3>Position 10: The Likely Outcome</h3>
<p>The most probable outcome if things continue on their current trajectory. This is not fixed fate — it's the direction the river is flowing. Significant action or choices can alter it. If this card is challenging, it's an invitation to change course. If it's positive, it's a validation of the current direction.</p>
<h2>How to Synthesize the Full Reading</h2>
<p>Don't just read each position in isolation. Look for:</p>
<ul>
<li><strong>The story from positions 3→4→1→6→10:</strong> past → recent past → present → near future → outcome. Does this narrative make sense?</li>
<li><strong>Tension between 7 (inner) and 8 (outer):</strong> Is what you're projecting different from what's actually happening around you?</li>
<li><strong>Position 9 and 10 in dialogue:</strong> Does the likely outcome address your hopes and fears, or sidestep them entirely?</li>
</ul>`
  },
  {
    slug: "daily-tarot-reading-guide",
    category: "tarot",
    title: "How to Do a Daily Tarot Reading: A Simple Routine That Actually Works",
    title_en: "How to Do a Daily Tarot Reading: A Simple Routine That Actually Works",
    description: "Daily tarot is one of the most effective tools for developing intuition and self-awareness — if done consistently. This guide covers the one-card daily practice, how to journal your readings, and why your daily card on Tuesday might be the same as last Tuesday for a reason.",
    keywords: ["daily tarot reading","one card tarot reading","daily tarot practice","tarot for beginners daily","tarot journal","how to read tarot daily"],
    published_at: "2026-07-24",
    reading_time: 10,
    cta_href: "/tarot",
    cta_label: "🔮 Pull Your Daily Card — AI Insight",
    cta_label_en: "Pull Your Daily Card — AI Insight",
    content: `<h2>The Case for Daily Tarot</h2>
<p>Learning tarot from a book is useful. Doing daily tarot actually changes how you think. There's a significant difference between knowing that the Five of Cups represents loss and disappointment, and pulling it on a morning when you're already feeling the specific weight of something you're grieving — and having the card give that feeling a precise name and a constructive question.</p>
<p>Daily tarot develops intuition not through mystical transmission but through something mundane and powerful: repeated practice of noticing patterns, naming inner states, and checking your interpretations against real outcomes.</p>
<h2>The One-Card Daily Practice</h2>
<p>The simplest and most sustainable form of daily tarot is a single card. Here's the exact practice:</p>
<ol>
<li><strong>Set a consistent time.</strong> Morning is most popular because it sets the day's frame of mind, but evening works well for reflection. The consistency matters more than the timing.</li>
<li><strong>Take 30 seconds before drawing.</strong> Check in with yourself: What's on your mind? What are you heading into today? You don't need a formal question, but some presence helps.</li>
<li><strong>Draw one card.</strong> Look at it. Before reaching for a book or an app, notice your first reaction: Does this feel right? Surprising? Uncomfortable?</li>
<li><strong>Write three lines.</strong> Just three: What is the card? What does it mean to me today, specifically? What will I notice or try because of this card?</li>
<li><strong>Return to it in the evening.</strong> This is the step most people skip, and it's the most valuable. Did the card's energy show up? How? Where were you wrong about what it meant?</li>
</ol>
<h2>Common Questions About Daily Tarot</h2>
<h3>What if I get the same card repeatedly?</h3>
<p>This happens, and it's worth taking seriously. A card that appears multiple times within a short period is almost always pointing at something you're not fully seeing or acknowledging. Don't dismiss it as random. Ask: What does this card represent that I'm avoiding?</p>
<h3>Do I need to use reversals?</h3>
<p>For daily practice, many readers find it cleaner to work upright-only at first. You can always add reversals once you're fluent with the basic meanings. If you do use reversals, treat them as "the same energy, operating differently" rather than the opposite meaning.</p>
<h3>What if the card doesn't seem to apply to my day?</h3>
<p>Two possibilities: either the card is pointing to something operating beneath the surface (which will make sense later), or your reading of the card's meaning is too narrow. The cards tend to be right more often than they initially seem.</p>
<h2>Building a Tarot Journal</h2>
<p>The practice becomes substantially more powerful with a journal. The format:</p>
<ul>
<li><strong>Date and card drawn</strong></li>
<li><strong>Initial interpretation:</strong> What you think it means before the day</li>
<li><strong>Evening reflection:</strong> How the energy manifested; where you were right and wrong</li>
<li><strong>Pattern notes:</strong> After a few weeks, look for recurring cards, recurring themes, or specific life situations that consistently attract specific types of cards</li>
</ul>
<p>After 90 days of consistent journaling, most people notice significant patterns in how the cards interact with their specific life circumstances — patterns that are more instructive than any book meaning.</p>
<h2>What Daily Tarot Actually Develops</h2>
<p>Over time, a consistent daily practice builds:</p>
<ul>
<li>Fluency with the 78-card system without rote memorization</li>
<li>A more developed capacity to name emotional states accurately</li>
<li>Pattern recognition — both in the cards and in your own behavioral tendencies</li>
<li>The ability to zoom out from the immediate problem and see the larger context</li>
</ul>
<p>These are cognitive and emotional skills that show up in every area of life, not just in tarot readings.</p>`
  },
  {
    slug: "tarot-for-love-and-relationships-guide",
    category: "tarot",
    title: "Tarot for Love & Relationships: The Best Spreads and What to Actually Ask",
    title_en: "Tarot for Love & Relationships: The Best Spreads and What to Actually Ask",
    description: "Love readings are the most common tarot requests — and the most mishandled. This guide covers the best spreads for relationship questions, how to ask questions that produce useful answers, and the most important cards to understand in love readings.",
    keywords: ["tarot for love","love tarot reading","relationship tarot spread","tarot for couples","tarot love question","best tarot spread for relationships","tarot and love"],
    published_at: "2026-07-25",
    reading_time: 12,
    cta_href: "/tarot",
    cta_label: "🔮 Love Tarot Reading — AI Relationship Insights",
    cta_label_en: "Love Tarot Reading — AI Relationship Insights",
    content: `<h2>The Most Common Mistake in Love Tarot</h2>
<p>The single most common error in love tarot readings is asking the wrong question. Questions like "Will he come back?" or "Does she love me?" put all the interpretive weight on someone else's unknowable inner state, and the cards can't (and shouldn't try to) give you a reliable answer to those. You end up either getting generic information or seeing what you want to see.</p>
<p>The questions that actually produce useful tarot information are about what's <em>within your sphere of understanding and influence</em>:</p>
<ul>
<li>"What is the actual energy of this connection right now?"</li>
<li>"What's the most important thing I'm not seeing in this dynamic?"</li>
<li>"What would genuinely serve me in approaching this situation?"</li>
<li>"What is this relationship trying to teach me?"</li>
</ul>
<h2>The Best Spreads for Relationship Questions</h2>
<h3>1. The Relationship Overview (5 Cards)</h3>
<ul>
<li><strong>Card 1: You</strong> — your energy, needs, and role in this dynamic</li>
<li><strong>Card 2: Them</strong> — their energy and perspective (as best the cards can reflect it)</li>
<li><strong>Card 3: The Connection</strong> — the quality and nature of what exists between you</li>
<li><strong>Card 4: The Challenge</strong> — what's creating friction or distance</li>
<li><strong>Card 5: The Path Forward</strong> — what serves the connection's growth</li>
</ul>
<h3>2. The Single-Card Love Check-In</h3>
<p>One card, one question: "What's the most honest thing I need to know about this relationship right now?" This is more effective than it sounds. One card pulled with a precisely formed question can cut to the center of a complex dynamic more efficiently than five cards pulled with a vague one.</p>
<h3>3. The "Before I Reach Out" Spread (3 Cards)</h3>
<ul>
<li><strong>Card 1:</strong> My honest motivation for reaching out</li>
<li><strong>Card 2:</strong> The most likely response or outcome</li>
<li><strong>Card 3:</strong> What actually serves me and the connection</li>
</ul>
<p>This spread is particularly useful before taking a significant action — texting, confronting, confessing — when you want to check your motivations and likely consequences honestly.</p>
<h2>The Most Important Cards in Love Readings</h2>
<h3>Positive Indicators</h3>
<ul>
<li><strong>The Lovers:</strong> Genuine choice and value alignment — real connection, not just attraction</li>
<li><strong>Two of Cups:</strong> Mutual recognition and emotional reciprocity — the clearest "connection" card in the deck</li>
<li><strong>Ace of Cups:</strong> New emotional beginning; genuine emotional availability</li>
<li><strong>Ten of Pentacles:</strong> Long-term stability and genuine commitment building</li>
<li><strong>The Star:</strong> Hope, healing, and authentic connection after difficulty</li>
</ul>
<h3>Cards That Deserve Attention (Not Fear)</h3>
<ul>
<li><strong>The Tower:</strong> Something needs to shift dramatically; resisting it will make things worse</li>
<li><strong>Five of Cups:</strong> Loss or disappointment needs to be processed honestly before moving forward</li>
<li><strong>The Devil:</strong> A pattern or dynamic that is compelling but not actually healthy — worth examining honestly</li>
<li><strong>Three of Swords:</strong> Heartache that is real and needs to be acknowledged, not bypassed</li>
<li><strong>Eight of Cups:</strong> The honest answer might be that it's time to walk away from something that no longer sustains you</li>
</ul>
<h2>Reading for Others vs. Reading for Yourself</h2>
<p>Love readings about your own situation carry an inherent bias risk — you <em>want</em> a particular answer, which can distort how you interpret ambiguous cards. Two useful correctives:</p>
<ol>
<li><strong>Read the spread as if it's about a close friend.</strong> What would you tell them about these cards? That perspective is usually more honest than what you tell yourself.</li>
<li><strong>Note your reaction to the cards before interpreting them.</strong> If you feel relief or disappointment at what you drew, that emotional response is itself informative — it tells you what you were hoping for, which tells you something about where you actually are.</li>
</ol>`
  },
  {
    slug: "tarot-for-career-and-work-guide",
    category: "tarot",
    title: "Tarot for Career & Work: Spreads, Questions, and Key Cards for Professional Decisions",
    title_en: "Tarot for Career & Work: Spreads, Questions, and Key Cards for Professional Decisions",
    description: "Tarot is one of the most underused tools for career clarity. This guide covers the best spreads for job decisions, the questions worth asking, and the specific cards that most often signal career shifts, burnout, opportunity, and hidden obstacles.",
    keywords: ["tarot for career","career tarot reading","tarot work reading","tarot for job decisions","career tarot spread","work tarot","tarot job change"],
    published_at: "2026-07-26",
    reading_time: 12,
    cta_href: "/tarot",
    cta_label: "🔮 Career Tarot Reading — AI Professional Insight",
    cta_label_en: "Career Tarot Reading — AI Professional Insight",
    content: `<h2>Why Tarot Works for Career Questions</h2>
<p>People expect tarot to be useful for love and personal growth. Fewer realize it's one of the sharpest tools available for professional clarity — particularly in situations where the factors aren't purely analytical. Many of the hardest career decisions involve competing values, unclear motivations, or dynamics that rational analysis alone can't fully address: Is this opportunity actually good for me, or am I taking it because I'm afraid of the alternative? Am I staying in this job because it genuinely suits me, or because leaving feels too uncertain?</p>
<p>These are exactly the kinds of questions tarot is designed to illuminate.</p>
<h2>Questions That Work vs. Questions That Don't</h2>
<p><strong>Less effective:</strong></p>
<ul>
<li>"Will I get the job?" (outcome-dependent, binary, luck-based)</li>
<li>"Should I quit?" (too broad, avoids specifics)</li>
</ul>
<p><strong>More effective:</strong></p>
<ul>
<li>"What's the most honest assessment of my current professional situation?"</li>
<li>"What's the primary thing holding me back from moving forward?"</li>
<li>"What does taking this opportunity actually mean for my development?"</li>
<li>"What am I not seeing clearly about this workplace dynamic?"</li>
</ul>
<h2>The Best Career Tarot Spreads</h2>
<h3>1. The Career Clarity Spread (4 Cards)</h3>
<ul>
<li><strong>Card 1:</strong> Where I actually am in my career right now (not where I wish I were)</li>
<li><strong>Card 2:</strong> What's serving my professional growth</li>
<li><strong>Card 3:</strong> What's blocking or draining my professional energy</li>
<li><strong>Card 4:</strong> The most useful next step</li>
</ul>
<h3>2. Job Decision Spread (3 Cards)</h3>
<p>When you're choosing between staying and going:</p>
<ul>
<li><strong>Card 1:</strong> The honest energy of staying in your current role</li>
<li><strong>Card 2:</strong> The honest energy of the opportunity or change</li>
<li><strong>Card 3:</strong> What you need to understand that you're currently not seeing</li>
</ul>
<h3>3. The New Job/New Role Spread (5 Cards)</h3>
<ul>
<li><strong>Card 1:</strong> What this role actually requires of you</li>
<li><strong>Card 2:</strong> What you bring to it</li>
<li><strong>Card 3:</strong> The key challenge you'll face</li>
<li><strong>Card 4:</strong> The hidden opportunity</li>
<li><strong>Card 5:</strong> What success in this role looks like</li>
</ul>
<h2>Key Cards in Career Readings</h2>
<h3>Cards That Signal Opportunity and Progress</h3>
<ul>
<li><strong>The Wheel of Fortune:</strong> A favorable turn; timing is working in your favor</li>
<li><strong>Ace of Pentacles:</strong> A new and genuinely viable financial or professional opportunity</li>
<li><strong>Three of Pentacles:</strong> Collaboration, skill recognition, and the reward of expertise</li>
<li><strong>Eight of Pentacles:</strong> Mastery through deliberate practice — focused work is producing real results</li>
<li><strong>The Sun:</strong> Clarity, success, and recognition; things becoming visible and valued</li>
</ul>
<h3>Cards That Signal Caution or Need for Attention</h3>
<ul>
<li><strong>Five of Pentacles:</strong> Financial precarity or exclusion — real material concerns need addressing</li>
<li><strong>The Hermit:</strong> A period of independent work or reflection before the next move</li>
<li><strong>Ten of Wands:</strong> Overwhelm, overcommitment; you're carrying more than you should be</li>
<li><strong>The Devil:</strong> A job or situation that is binding in an unhealthy way — you may have more choice than you think</li>
<li><strong>Four of Cups:</strong> Disengagement or missing an opportunity due to apathy or closed focus</li>
</ul>
<h2>Reading Career Reversals</h2>
<p>Reversed career cards often point to inner obstacles rather than external ones:</p>
<ul>
<li>A reversed Eight of Pentacles suggests the issue isn't lack of opportunity but inconsistent application of your skills</li>
<li>A reversed Ace of Pentacles suggests an opportunity that looks good on paper but has a catch worth examining</li>
<li>A reversed Wheel of Fortune suggests the timing isn't right yet — or that you're resisting a change that's already in motion</li>
</ul>
<h2>The Honest Use of Career Tarot</h2>
<p>Career tarot is most useful not as a decision-maker — it shouldn't replace due diligence, financial planning, or direct conversations with relevant people — but as a perspective-clarifier. The value is in the questions it raises and the internal honesty it invites, not in treating the cards as a cosmic HR department. Used this way, a single well-executed career spread can clarify more than hours of circular analysis.</p>`
  }
];

async function main() {
  console.log(`📝 批次P4：写入 ${posts.length} 篇塔罗实用指南...`);
  let success = 0, fail = 0;
  for (const post of posts) {
    const { error } = await supabase.from("mysticai_blog_posts").upsert(post, { onConflict: "slug" });
    if (error) { console.error(`  ❌ [${post.slug}]:`, error.message); fail++; }
    else { console.log(`  ✅ [${post.slug}]`); success++; }
  }
  console.log(`\n完成！成功: ${success}, 失败: ${fail}`);
}
main().catch(console.error);
