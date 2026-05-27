import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);
const posts = [
  {
    slug: "celtic-cross-tarot-spread-complete-guide",
    title: "The Celtic Cross Tarot Spread — Complete Position-by-Position Guide",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>The Celtic Cross Tarot Spread — Complete Position-by-Position Guide</h1>
<p>The Celtic Cross is tarot's most iconic and comprehensive spread. Used for over a century, this 10-card spread offers a complete picture of any situation — its context, challenges, underlying influences, and likely outcome. Mastering it unlocks a new level of tarot reading.</p>
<h2>The Celtic Cross Layout</h2>
<p>Cards 1-6 form a cross (the core), cards 7-10 form a staff (the timeline and context).</p>
<h2>Card Positions and Meanings</h2>
<h3>Position 1: The Present Situation</h3>
<p>The card at the center of the cross. This is the core of what's happening right now — the central energy of the situation being asked about.</p>
<h3>Position 2: The Crossing Factor (Challenge)</h3>
<p>Placed horizontally across card 1. This represents the main challenge, obstacle, or opposing force in the situation. This card crosses — it doesn't necessarily oppose. It crosses meaning it intersects with and complicates the present situation.</p>
<h3>Position 3: The Foundation (Root Cause)</h3>
<p>Below the center. The underlying foundation or root cause — what has brought this situation into being. Often subconscious or historical.</p>
<h3>Position 4: The Recent Past</h3>
<p>To the left of center. Events and energies that are just passing — recently influential but now transitioning out.</p>
<h3>Position 5: The Best Possible Outcome (Crown)</h3>
<p>Above the center. The highest possible outcome if things go well; what is possible but not guaranteed.</p>
<h3>Position 6: The Near Future</h3>
<p>To the right of center. What is coming in the immediate future based on current trajectory.</p>
<h3>Position 7: Your Influence (Self)</h3>
<p>Bottom of the staff. Your position in the situation — your attitude, fears, or approach that you bring to the issue.</p>
<h3>Position 8: External Influences (Environment)</h3>
<p>Second from bottom in the staff. People, social forces, or external circumstances influencing the situation.</p>
<h3>Position 9: Hopes and Fears</h3>
<p>Third in the staff. What you hope for and simultaneously fear — often the same thing, revealing deep ambivalence about the outcome.</p>
<h3>Position 10: The Final Outcome</h3>
<p>Top of the staff. Where the situation is heading if the current energies continue. The likely ultimate result.</p>
<h2>Tips for Celtic Cross Reading</h2>
<p>Always read card 5 and card 10 together. The crown shows potential, and the outcome shows likely reality — the gap between them reveals what needs to change. Also look at whether cards 7-9 (your inner world) support or undermine the potential positive outcome in card 5.</p>
</article>`
  },
  {
    slug: "horseshoe-tarot-spread-guide",
    title: "The Horseshoe Tarot Spread — A 7-Card Deep-Dive Reading Guide",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>The Horseshoe Tarot Spread — A 7-Card Deep-Dive Reading Guide</h1>
<p>The Horseshoe spread is one of tarot's classic comprehensive spreads — 7 cards arranged in a horseshoe (U-shape), providing a complete picture of a situation's past, present, future, and the key factors influencing it.</p>
<h2>The Horseshoe Layout</h2>
<p>Seven cards placed in a curved line from left to right, like a horseshoe or arch.</p>
<h2>Position Meanings</h2>
<h3>Position 1 (Far Left): The Distant Past</h3>
<p>Foundation events — what happened long ago that created the current situation. Often ancestral patterns or formative early experiences relevant to the question.</p>
<h3>Position 2: The Recent Past</h3>
<p>What has been happening in the recent weeks or months. Events that are still influencing the present moment.</p>
<h3>Position 3: The Present</h3>
<p>The center-left card. Current state of affairs — where things stand right now.</p>
<h3>Position 4 (Bottom/Center): The Key Factor</h3>
<p>The heart of the horseshoe — the most important factor, the pivotal element, or the key to unlocking the situation. Often the most revealing card in the spread.</p>
<h3>Position 5: How Others Perceive the Situation</h3>
<p>Center-right. How external people or forces view the situation. Useful for interpersonal situations — reveals how the other party experiences what's happening.</p>
<h3>Position 6: What Should Be Done</h3>
<p>The guidance card — recommended action, approach, or perspective shift.</p>
<h3>Position 7 (Far Right): The Probable Outcome</h3>
<p>Where things are headed if the current path continues and the guidance in position 6 is followed.</p>
<h2>When to Use the Horseshoe Spread</h2>
<p>This spread works beautifully for relationship questions (seeing both your and the other's perspective), career decisions, and any situation where understanding past-present-future flow is important. Less overwhelming than the Celtic Cross, but still comprehensive.</p>
</article>`
  },
  {
    slug: "tarot-yes-no-quick-methods",
    title: "3 Best Tarot Methods for Yes/No Questions — Quick and Accurate",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>3 Best Tarot Methods for Yes/No Questions — Quick and Accurate</h1>
<p>Sometimes you have a specific yes/no question and need a clear answer rather than a nuanced reading. Tarot wasn't originally designed for binary answers, but several effective methods have been developed for exactly this purpose.</p>
<h2>Method 1: The Upright/Reversed Method</h2>
<p>The simplest approach. Shuffle the deck, focusing on your yes/no question. Pull one card:</p>
<ul>
<li><strong>Upright:</strong> Yes</li>
<li><strong>Reversed:</strong> No or Maybe</li>
</ul>
<p>To add nuance, pull two more cards. If all three are upright: strong yes. If all three are reversed: strong no. Mixed: maybe, with factors still in flux.</p>
<h2>Method 2: The Pip System</h2>
<p>Assign yes/no to suits: Wands (yes), Cups (yes), Swords (no), Pentacles (yes).</p>
<p>Pull 3 cards and see which suits dominate. Major Arcana cards are interpreted by their traditional association with positive or challenging energy. The Fool, Star, Sun, World, Lovers = Yes. Tower, Moon, Five of Swords, Ten of Swords = No.</p>
<h2>Method 3: The Fan Method</h2>
<p>Spread the entire deck face-down in a fan. Run your non-dominant hand slowly above the cards until you feel heat, tingling, or magnetic pull (trust your intuition). Pull that card and interpret it as a complete answer.</p>
<p>This method works best for those with developed intuitive sensitivity and regular tarot practice.</p>
<h2>Important Caveat for All Yes/No Methods</h2>
<p>Yes/no tarot is most accurate when the question is specific, timely, and emotionally neutral enough to read clearly. Questions driven by desperation or fear tend to read the fear rather than the situation. Ground yourself before pulling.</p>
<h2>Questions Better Suited to Full Spreads Than Yes/No</h2>
<p>"Should I quit my job?" (complex, multi-factor), "Will I find love this year?" (timing and conditions involved), "Is my partner loyal?" (requires context and nuance). For these, use a 3+ card spread instead.</p>
</article>`
  },
  {
    slug: "tarot-reading-daily-practice-guide",
    title: "How to Build a Daily Tarot Practice — The Complete Beginner's Guide",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>How to Build a Daily Tarot Practice — The Complete Beginner's Guide</h1>
<p>A daily tarot practice transforms cards from occasional fortune-telling tools into a genuine spiritual practice for self-awareness, decision-making, and inner growth. This guide shows you exactly how to start and sustain it.</p>
<h2>Why Daily Tarot Practice Works</h2>
<p>Reading a single card daily accelerates your learning, builds intuitive connection with the deck, and creates a powerful reflective ritual. After 3-6 months of daily one-card pulls, most readers notice significantly enhanced intuition and symbol fluency.</p>
<h2>The One-Card Morning Pull</h2>
<p>The foundation of any daily practice:</p>
<ol>
<li>Before checking your phone, take your deck in both hands.</li>
<li>Take three deep breaths and set the question: "What does today ask of me?" or "What energy should I bring today?"</li>
<li>Shuffle until it feels right, then pull one card.</li>
<li>Spend 2-3 minutes with the card — note your first impression before checking any guidebook meaning.</li>
<li>Journal one sentence about how it might apply to today.</li>
<li>At day's end, revisit the card: how did its energy actually manifest?</li>
</ol>
<h2>Journaling for Maximum Growth</h2>
<p>Keep a tarot journal with: the date, card pulled, your initial interpretation, and end-of-day reflection. After 90 days, patterns emerge. Certain cards appear repeatedly during specific emotional states. You begin to understand your own personal card language.</p>
<h2>Caring for Your Deck</h2>
<p>Keep your deck in a cloth bag or wooden box. Cleanse periodically (full moon under moonlight, or smudge with palo santo). Some readers don't let others handle their personal reading deck — this is entirely personal preference.</p>
<h2>When to Move From One-Card to Multi-Card Daily Pulls</h2>
<p>After 60-90 days of consistent one-card pulls, introduce a 3-card pull for specific questions. The daily one-card practice can continue indefinitely — its simplicity is a feature, not a limitation.</p>
</article>`
  },
  {
    slug: "tarot-reversals-complete-guide",
    title: "Tarot Reversals — Should You Read Reversed Cards? Complete Guide",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>Tarot Reversals — Should You Read Reversed Cards? Complete Guide</h1>
<p>One of the most common questions for developing tarot readers: should I read reversed cards? What do they mean? The answer depends on your reading style, but understanding reversals can significantly deepen your readings.</p>
<h2>What Are Reversed Cards?</h2>
<p>A reversed (or inverted) tarot card is one that appears upside-down when you flip it face-up. Many readers shuffle their decks in ways that naturally create a mix of upright and reversed cards.</p>
<h2>To Read Reversals or Not?</h2>
<p>Both approaches are valid. Some respected readers never use reversals, finding they already access sufficient nuance through upright interpretations. Others find reversals indispensable for accessing a card's full range of meaning. Try both approaches and use what resonates with you.</p>
<h2>Five Ways to Interpret a Reversed Card</h2>
<h3>1. Blocked or Internalized Energy</h3>
<p>The card's energy is present but blocked, internalized, or not yet expressed outwardly. A reversed Three of Cups could mean the celebration is internal, private, or pending rather than manifested.</p>
<h3>2. Weakened or Diminished</h3>
<p>The card's positive qualities are present but less potent. A reversed Star still holds hope, but it's dimmer, requiring more active effort to access.</p>
<h3>3. Shadow Side or Excess</h3>
<p>The card's energy has turned toward its shadow expression. Reversed Strength might indicate aggression or force rather than gentle mastery.</p>
<h3>4. Resistance</h3>
<p>The querent or situation is resisting or delaying the card's energy — consciously or unconsciously avoiding what the card represents.</p>
<h3>5. Recheck, Delay, or Not Yet</h3>
<p>Timing interpretation: not now, reconsider, or check again at a later date.</p>
<h2>Practical Advice</h2>
<p>Let intuition guide which reversal interpretation applies. Your first impression about a specific reversed card in a specific position is usually the most accurate. Don't force a predetermined meaning when your gut is pointing to something else.</p>
</article>`
  },
  {
    slug: "tarot-cards-strongest-meanings",
    title: "The 10 Most Powerful Tarot Cards and Their Deep Meanings",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>The 10 Most Powerful Tarot Cards and Their Deep Meanings</h1>
<p>Not all tarot cards carry equal weight. Some cards, when they appear in a reading, signal that something fundamental, transformative, or deeply significant is at play. These are the 10 most powerful cards and what their presence signals.</p>
<h2>1. The Tower</h2>
<p>Sudden, unavoidable disruption that dismantles structures built on faulty foundations. Not gentle, not optional — but ultimately clearing the way for what is true and real.</p>
<h2>2. The World</h2>
<p>Completion, integration, and the achievement of a major life cycle. Full arrival — not just the end but the celebration of mastery. Extremely auspicious.</p>
<h2>3. The Wheel of Fortune</h2>
<p>Destiny, cycles, and the turning of fate. When this appears, major external forces are in motion — beyond any individual's control. Surrender to the turn.</p>
<h2>4. Judgement</h2>
<p>A soul-level call to account — reckoning, resurrection, and second chances. Major life transitions and karmic completion are signaled here.</p>
<h2>5. The Hermit</h2>
<p>Necessary withdrawal for the purpose of inner illumination. A period of sacred solitude that ultimately brings wisdom others cannot offer.</p>
<h2>6. The High Priestess</h2>
<p>The deepest intuitive knowing beyond rational explanation. She represents the mystery that can only be accessed by going within. Trust what you know without proof.</p>
<h2>7. Death</h2>
<p>Transformation through complete ending. What is dying must die — resistance only prolongs suffering. The new cannot begin until the old is fully released.</p>
<h2>8. The Moon</h2>
<p>Illusion, the unconscious, and the realm of what is hidden. Something is not as it appears. Trust your night vision when daylight logic fails.</p>
<h2>9. The Sun</h2>
<p>Pure joy, vitality, and radiant success. The universe's clearest "yes." When The Sun appears, whatever you're asking about has a brilliant energy behind it.</p>
<h2>10. The Fool</h2>
<p>Despite being card zero, The Fool represents one of the most powerful beginnings possible — pure potential, perfect readiness, and the leap of faith that starts every great journey. Appearing in a reading: something entirely new begins NOW.</p>
</article>`
  },
  {
    slug: "tarot-career-reading-spread",
    title: "Tarot for Career Decisions — 3 Spreads That Actually Help",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>Tarot for Career Decisions — 3 Spreads That Actually Help</h1>
<p>Career questions are among the most common and most challenging areas for tarot reading. The multi-factor complexity of career decisions — money, passion, timing, relationships, practical constraints — makes tarot an ideal complement to rational analysis.</p>
<h2>Spread 1: The "Should I Take This Job?" Spread (5 Cards)</h2>
<p>Card 1: What this opportunity truly represents for my growth<br>
Card 2: Hidden factors or challenges I'm not seeing<br>
Card 3: How this aligns with my long-term path<br>
Card 4: What I would be leaving behind (and whether that's good)<br>
Card 5: The energy of this decision — yes, no, or wait?</p>
<h2>Spread 2: The Career Crossroads Spread (6 Cards)</h2>
<p>Card 1: Current career energy / where I stand<br>
Card 2: Option A — its energy and what it offers<br>
Card 3: Option B — its energy and what it offers<br>
Card 4: What my soul actually wants in work (often different from what the mind wants)<br>
Card 5: The lesson in this choice regardless of what I decide<br>
Card 6: What guides me toward my right path</p>
<h2>Spread 3: The Monthly Career Check-In (3 Cards)</h2>
<p>Card 1: The current energy at work / the dominant theme this month<br>
Card 2: The opportunity or lesson available this month<br>
Card 3: What to focus on or the recommended action</p>
<h2>Most Revealing Career Question for Tarot</h2>
<p>"What does my authentic self need from work?" This question bypasses the practical and financial noise and goes straight to what will bring sustainable fulfillment. The answer often surprises people — and it's usually accurate.</p>
<h2>Career Cards to Watch For</h2>
<p>Positive signs: Ace of Pentacles (new financial beginning), Three of Pentacles (collaboration and skill), Six of Wands (recognition), The Emperor (authority and structure), Ten of Pentacles (long-term success).<br>
Caution signals: Five of Pentacles (financial instability), Eight of Swords (feeling trapped), The Tower in career position (major disruption ahead).</p>
</article>`
  },
  {
    slug: "tarot-moon-phases-reading-guide",
    title: "Tarot and the Moon Phases — How to Align Your Readings With Lunar Energy",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>Tarot and the Moon Phases — How to Align Your Readings With Lunar Energy</h1>
<p>The Moon and tarot are natural companions — both work with cycles, intuition, and the hidden world beneath the visible surface. Aligning your tarot practice with lunar phases amplifies the accuracy and depth of your readings.</p>
<h2>New Moon Readings</h2>
<p>The New Moon is for planting intentions. The darkness makes the inner world more visible. Questions to ask:<br>
"What new beginning is available to me this lunar cycle?"<br>
"What seed do I want to plant?"<br>
Use a 3-card spread: Intention | Action | Support</p>
<h2>Waxing Moon Readings</h2>
<p>As the Moon grows, so does our ability to build and expand. Questions:<br>
"What can I do to support what I'm growing?"<br>
"Where is momentum building?"<br>
This is an excellent time for career and project readings.</p>
<h2>Full Moon Readings</h2>
<p>The Full Moon illuminates what was hidden. It's the peak of visibility and emotional intensity. Questions:<br>
"What is being revealed to me now?"<br>
"What truth have I been avoiding?"<br>
Full Moon readings are often the most powerful — emotions run high and the veil is thin.</p>
<p>Excellent Full Moon spread: 5 cards — Current reality revealed | What you've been ignoring | What to release | What to celebrate | What the next cycle holds</p>
<h2>Waning Moon Readings</h2>
<p>As the Moon decreases, this is time to release. Questions:<br>
"What no longer serves me?"<br>
"What am I ready to let go?"<br>
Waning moon readings support ending relationships, habits, or situations that have run their course.</p>
<h2>Dark Moon (Day Before New Moon)</h2>
<p>The most liminal space in the lunar cycle — a day of rest, integration, and preparation. Light a candle, pull one card and ask: "What is the lesson of this cycle ending?"</p>
</article>`
  },
  {
    slug: "tarot-intuition-vs-book-meaning",
    title: "Tarot Intuition vs Book Meanings — When to Trust Your Gut",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>Tarot Intuition vs Book Meanings — When to Trust Your Gut</h1>
<p>Every tarot reader eventually faces the fundamental question: when my intuitive response to a card contradicts the guidebook meaning, which one do I follow? The answer evolves as your practice deepens.</p>
<h2>The Case for Book Meanings</h2>
<p>Traditional meanings are the accumulated wisdom of generations of readers. They work because they've been tested across thousands of readings and reflect deep symbolic patterns. For beginners, learning the traditional meanings first provides a reliable foundation before improvising.</p>
<h2>The Case for Intuition</h2>
<p>Tarot works primarily through your unconscious mind's ability to recognize patterns and project relevant meaning. The specific visual elements that leap out to you, the emotional response a card triggers, the story it tells — these are your unconscious processing the question's answer.</p>
<h2>The Integration: Both, in Sequence</h2>
<p>Experienced readers typically follow this process:</p>
<ol>
<li>Note first intuitive impression BEFORE intellectualizing</li>
<li>Consider the traditional meaning</li>
<li>Notice how the traditional meaning and your intuition relate</li>
<li>Trust wherever they converge — that's the signal</li>
<li>When they diverge, ask: what does this specific deviation reveal?</li>
</ol>
<h2>Signs Your Intuition Is Reliable</h2>
<p>Your tarot intuition is reliable when: your gut interpretation is later confirmed by events, you receive specific (not generic) impressions that turn out accurate, and you're reading in a calm, grounded state rather than an anxious, desperate one.</p>
<h2>Signs You Need More Book Study</h2>
<p>You're guessing rather than sensing; readings feel random and inconsistent; you can't distinguish between the Queen of Cups and the High Priestess in terms of what each actually means at a deep level. Book study at this point builds the language your intuition then speaks through.</p>
</article>`
  },
  {
    slug: "tarot-reading-shadow-work",
    title: "Tarot for Shadow Work — How to Use Cards for Deep Inner Healing",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>Tarot for Shadow Work — How to Use Cards for Deep Inner Healing</h1>
<p>Shadow work — the Jungian practice of exploring and integrating the unconscious parts of yourself — and tarot are extraordinarily compatible partners. Tarot's visual symbolic language makes it one of the most effective tools for safely accessing and working with the shadow.</p>
<h2>What Is the Shadow?</h2>
<p>The shadow, as defined by Carl Jung, is the part of the psyche containing traits, impulses, and memories that have been repressed, denied, or deemed unacceptable. These are not inherently negative — they are simply parts of the self that haven't been integrated into conscious identity.</p>
<h2>Why Tarot Works for Shadow</h2>
<p>Tarot bypasses the ego's defenses through symbol and metaphor. You can look at the Devil or the Five of Swords and examine what they mean in your life with some emotional distance — then gradually bring that awareness into direct personal application. The projection that tarot uses as a "feature" makes shadow work safer.</p>
<h2>The Shadow Work Tarot Spread (4 Cards)</h2>
<p>Card 1: A shadow quality I'm currently carrying (what I reject in others reflects what I deny in myself)<br>
Card 2: The root or origin of this shadow pattern<br>
Card 3: The gift hidden within this shadow<br>
Card 4: How to begin integrating this quality into wholeness</p>
<h2>Cards That Often Appear in Shadow Work</h2>
<ul>
<li><strong>The Devil:</strong> Addiction, shadow compulsion, what chains you</li>
<li><strong>The Tower:</strong> What needs to collapse to allow growth</li>
<li><strong>The Moon:</strong> What you fear to see clearly</li>
<li><strong>Five of Cups:</strong> Grief and loss you haven't allowed yourself to feel</li>
<li><strong>Seven of Swords:</strong> Where you deceive yourself or others</li>
</ul>
<h2>Important Guidance</h2>
<p>Shadow work can surface intense material. If you're working through significant trauma, supplement tarot shadow work with professional support. Tarot is a powerful tool but not a substitute for therapy when the material is severe.</p>
</article>`
  }
];

let ok = 0, fail = 0;
for (const post of posts) {
  const { error } = await supabase
    .from("mysticai_blog_posts")
    .upsert(post, { onConflict: "slug" });
  if (error) {
    console.error("FAIL", post.slug, error.message);
    fail++;
  } else {
    console.log("OK  ", `[${post.slug}]`);
    ok++;
  }
}
console.log(`\nDone: ${ok} success, ${fail} fail`);
