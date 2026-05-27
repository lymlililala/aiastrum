import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);

const posts = [
  {
    slug: "pentacles-numbers-tarot-ace-to-ten-guide",
    title: "Pentacles Numbered Cards Tarot — Ace Through Ten: Complete Financial Meanings",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Pentacles Numbered Cards Tarot — Ace Through Ten: Complete Financial Meanings</h1>
<p>The Pentacles suit in tarot governs earth energy — money, work, material security, physical health, and the tangible rewards of effort. The numbered cards trace an arc from potential wealth (Ace) through complete material mastery (Ten). Here's a comprehensive guide to every Pentacles number card.</p>

<h2>Ace of Pentacles — The Seed of Abundance</h2>
<p>A divine hand offers a single golden coin from a cloud. This is the purest potential of material energy — a new financial opportunity, a business idea, a career seed ready to be planted.</p>
<ul>
<li><strong>Upright</strong>: New financial opportunity, investment seed, promising career start, manifestation beginning</li>
<li><strong>Reversed</strong>: Missed financial opportunity, poor planning, not being ready to receive abundance</li>
<li><strong>Key question</strong>: What new material venture are you being invited to begin?</li>
</ul>

<h2>Two of Pentacles — Juggling Priorities</h2>
<p>A figure dances while juggling two pentacles connected by an infinity symbol. Waves roll in the background. This card is the daily balancing act of finances and responsibilities.</p>
<ul>
<li><strong>Upright</strong>: Managing multiple financial streams, adapting to change, work-life balance, flexible handling of competing priorities</li>
<li><strong>Reversed</strong>: Financial overwhelm, unable to balance demands, dropping the ball on responsibilities</li>
</ul>

<h2>Three of Pentacles — Skilled Collaboration</h2>
<p>An artisan works on a cathedral pillar while two figures consult architectural plans. This is the card of mastery through teamwork — individual skill amplified by collective vision.</p>
<ul>
<li><strong>Upright</strong>: Skilled craftsmanship, collaborative success, learning your trade, initial mastery recognized</li>
<li><strong>Reversed</strong>: Lack of teamwork, poor quality work, not listening to expert advice</li>
</ul>

<h2>Four of Pentacles — The Miser's Grip</h2>
<p>A figure clutches one pentacle to his crown, seats on two, and hugs one to his chest. This is the card of material security — but also the shadow of hoarding and control.</p>
<ul>
<li><strong>Upright</strong>: Financial security, conservative saving, protecting what you've built — but possibly too tightly</li>
<li><strong>Reversed</strong>: Financial mismanagement, letting go of control (liberation), or deepening greed</li>
</ul>

<h2>Five of Pentacles — Scarcity & Hardship</h2>
<p>Two ragged figures walk through snow past a stained glass church window. Financial hardship, feeling left out in the cold — but the warmth of support is nearby, if they'd only look up.</p>
<ul>
<li><strong>Upright</strong>: Financial hardship, poverty mindset, feeling excluded, illness affecting work, isolation</li>
<li><strong>Reversed</strong>: Recovery from hardship, asking for help, finding community support, poverty mindset shifting</li>
</ul>

<h2>Six of Pentacles — Generosity & Receiving</h2>
<p>A wealthy figure weighs coins and distributes them to those kneeling before him. This is the dynamic of giving and receiving — sometimes you're the giver, sometimes the receiver, and the exchange itself matters.</p>
<ul>
<li><strong>Upright</strong>: Generosity, charity, fair exchange, mentorship, receiving help graciously</li>
<li><strong>Reversed</strong>: Strings-attached giving, one-sided relationships, debt, unequal power dynamics</li>
</ul>

<h2>Seven of Pentacles — The Long Game</h2>
<p>A farmer leans on his hoe, surveying the pentacles growing on a vine. He has worked hard and is now pausing to evaluate results. Is the harvest worth the effort?</p>
<ul>
<li><strong>Upright</strong>: Patient investment, long-term thinking, reviewing progress, sustainable growth</li>
<li><strong>Reversed</strong>: Impatience with results, poor investment return, not seeing your efforts bear fruit</li>
</ul>

<h2>Eight of Pentacles — The Apprentice</h2>
<p>A craftsman carves pentacles one by one, focused and dedicated. This is the card of mastery through practice — showing up every day to perfect your craft.</p>
<ul>
<li><strong>Upright</strong>: Diligent work, skill development, apprenticeship, mastery through repetition, high-quality output</li>
<li><strong>Reversed</strong>: Perfectionism blocking progress, mediocre effort, wrong vocation, working without direction</li>
</ul>

<h2>Nine of Pentacles — Abundant Solitude</h2>
<p>An elegantly dressed woman stands in her lush garden with a trained falcon on her wrist. She has achieved material independence through her own effort. This is the card of self-sufficiency and earned luxury.</p>
<ul>
<li><strong>Upright</strong>: Financial independence, self-reliance, luxury enjoyed alone, accomplished goals, grace</li>
<li><strong>Reversed</strong>: Living beyond means, dependence on others, over-working to compensate for emotional lack</li>
</ul>

<h2>Ten of Pentacles — Legacy & Complete Wealth</h2>
<p>An elder sits surrounded by family and dogs beneath an arch displaying all ten pentacles. Three generations share in abundant prosperity. This is wealth as legacy — not just personal, but generational.</p>
<ul>
<li><strong>Upright</strong>: Generational wealth, family prosperity, stable home, lasting success, inheritance, community</li>
<li><strong>Reversed</strong>: Family financial conflict, unstable foundations, wealth without meaning, disconnection from heritage</li>
</ul>

<h2>The Pentacles Arc in Readings</h2>
<p>Reading Pentacles numbers in sequence reveals the complete story of material mastery: beginning with promise (Ace), navigating the challenges of management (2-5), giving and receiving in community (6), patiently growing toward mastery (7-9), and finally achieving lasting legacy (10).</p>
</article>`
  },
  {
    slug: "swords-numbers-tarot-ace-to-ten-guide",
    title: "Swords Numbered Cards Tarot — Ace Through Ten: Truth, Conflict & Mental Clarity",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Swords Numbered Cards Tarot — Ace Through Ten: Truth, Conflict & Mental Clarity</h1>
<p>The Swords suit is the most challenging yet ultimately liberating in tarot. It governs the realm of mind, truth, conflict, communication, and the painful clarity that comes from facing reality. Here is the complete meaning of every numbered Swords card.</p>

<h2>Ace of Swords — The Breakthrough</h2>
<p>A hand emerges from clouds holding a crowned sword. This is pure mental force — a moment of absolute clarity, breakthrough insight, or decisive truth cutting through confusion.</p>
<ul>
<li><strong>Upright</strong>: Mental breakthrough, clarity after confusion, honest communication, decisive action, new perspective</li>
<li><strong>Reversed</strong>: Confusion, mental blockage, avoiding difficult truths, using intelligence destructively</li>
</ul>

<h2>Two of Swords — Stalemate & Difficult Choices</h2>
<p>A blindfolded figure holds two crossed swords before her chest. The sea behind her is still. She refuses to look at the truth before her — a classic depiction of an impossible decision or deliberate avoidance.</p>
<ul>
<li><strong>Upright</strong>: Difficult choice, stalemate, avoidance of truth, blocking painful information, impasse</li>
<li><strong>Reversed</strong>: Removing the blindfold, forced to decide, information overload, choosing the lesser of two evils</li>
</ul>

<h2>Three of Swords — Heartbreak & Grief</h2>
<p>Three swords pierce a red heart against a stormy sky. The most universally recognized pain card in tarot — heartbreak, betrayal, sorrow, grief. But storms pass.</p>
<ul>
<li><strong>Upright</strong>: Heartbreak, painful truth, grief, separation, betrayal — and the necessary process of feeling it</li>
<li><strong>Reversed</strong>: Recovery from grief, releasing pain, forgiving, moving forward after heartbreak</li>
</ul>

<h2>Four of Swords — Rest & Recovery</h2>
<p>A knight lies in effigy on a tomb, three swords on the wall above him, one beneath him. After battle, rest is not optional — it is required. This is the card of recovery, meditation, and strategic retreat.</p>
<ul>
<li><strong>Upright</strong>: Rest after conflict, meditation, recovery, strategic retreat, temporary withdrawal</li>
<li><strong>Reversed</strong>: Forced back into action, restlessness, refusing needed rest, awakening from stagnation</li>
</ul>

<h2>Five of Swords — Hollow Victory</h2>
<p>A smirking figure collects swords while defeated opponents walk away. He won the battle — but at what cost? The Five of Swords is about conflict where winning feels empty because the methods were dishonorable.</p>
<ul>
<li><strong>Upright</strong>: Conflict, win at any cost, humiliation, dishonest victory, defeat of others</li>
<li><strong>Reversed</strong>: Releasing conflict, accepting defeat gracefully, moving past humiliation</li>
</ul>

<h2>Six of Swords — Moving Forward</h2>
<p>A hooded figure and child cross a lake in a boat. The ferryman poles them away from turbulent waters toward calmer shores. This is transition — leaving behind difficulty for something calmer.</p>
<ul>
<li><strong>Upright</strong>: Moving forward, transition, leaving difficulty behind, travel, gradual healing</li>
<li><strong>Reversed</strong>: Resistance to moving on, unable to leave the past, transition delayed, returning to turbulence</li>
</ul>

<h2>Seven of Swords — Strategy & Deception</h2>
<p>A figure sneaks away from a military camp carrying five swords, leaving two behind. This is the trickster card — stealth, strategy, working around obstacles, or deception.</p>
<ul>
<li><strong>Upright</strong>: Strategy, cunning, working alone, avoiding confrontation, deception (yours or others')</li>
<li><strong>Reversed</strong>: Confession, coming clean, mental escapism, self-deception exposed</li>
</ul>

<h2>Eight of Swords — Mental Imprisonment</h2>
<p>A bound and blindfolded figure stands surrounded by eight swords — but the binding is loose, and there is a clear path out. The prison is in the mind. She could walk free if she removed the blindfold.</p>
<ul>
<li><strong>Upright</strong>: Self-imposed restriction, victim mentality, overthinking, fear preventing action — but freedom is possible</li>
<li><strong>Reversed</strong>: Breaking free from limiting beliefs, removing the blindfold, taking decisive liberating action</li>
</ul>

<h2>Nine of Swords — Nightmare & Anxiety</h2>
<p>A figure sits up in bed, face in hands, with nine swords on the wall. This is 3am anxiety — the mental torment of worst-case thinking, grief, and the inability to sleep when the mind won't stop.</p>
<ul>
<li><strong>Upright</strong>: Anxiety, sleeplessness, guilt, depression, fears that seem larger at night than in day</li>
<li><strong>Reversed</strong>: Releasing anxiety, seeking help for mental health, things less bad than feared</li>
</ul>

<h2>Ten of Swords — The End (and Rebirth)</h2>
<p>A figure lies face down with ten swords in his back. The sky is dark above but dawn breaks at the horizon. The absolute rock bottom — but from here, there is nowhere to go but up.</p>
<ul>
<li><strong>Upright</strong>: Painful ending, rock bottom, defeat, betrayal, the absolute end of a cycle — but dawn is coming</li>
<li><strong>Reversed</strong>: Recovery from the lowest point, refusing to stay down, transformation from defeat</li>
</ul>

<h2>Reading Swords Numbers in Sequence</h2>
<p>The Swords arc is a hero's journey through mental and emotional challenges: breakthrough (Ace), difficult choices (2), grief (3), recovery (4), hollow conflict (5), moving forward (6), strategy (7), mental imprisonment (8), dark night of the soul (9), and finally the absolute bottom that precedes dawn (10).</p>
</article>`
  },
  {
    slug: "tarot-major-arcana-complete-guide",
    title: "The 22 Major Arcana Tarot Cards — Complete Meanings, Archetypes & Life Lessons",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>The 22 Major Arcana Tarot Cards — Complete Meanings, Archetypes & Life Lessons</h1>
<p>The Major Arcana are the heart of the tarot deck — 22 archetypal cards that represent the great themes, forces, and turning points of human existence. Each card is a mirror, a teacher, and a map of the soul's journey.</p>

<h2>What Makes the Major Arcana Special</h2>
<p>Unlike the Minor Arcana (which deal with everyday events), the Major Arcana appear when significant life themes are at play — karmic lessons, major life changes, or deep psychological forces that shape your path. When Major Arcana dominate a reading, something important is happening beneath the surface.</p>

<h2>The Fool's Journey: The Major Arcana Arc</h2>
<p>The Major Arcana tells the story of the Fool (0) moving through life experiences until reaching The World (21). This is the Hero's Journey in tarot form:</p>

<h3>The First Triad: World of Consciousness (Cards 1-7)</h3>
<ul>
<li><strong>0 — The Fool</strong>: Pure potential, new beginnings, leaping into the unknown with innocent trust</li>
<li><strong>I — The Magician</strong>: Conscious will, "as above so below," using all available tools to manifest intention</li>
<li><strong>II — The High Priestess</strong>: Intuition, mystery, the subconscious, esoteric knowledge</li>
<li><strong>III — The Empress</strong>: Fertility, abundance, nature, creativity, sensual pleasure, the mother</li>
<li><strong>IV — The Emperor</strong>: Structure, authority, fatherly protection, systems and order</li>
<li><strong>V — The Hierophant</strong>: Tradition, spiritual institutions, conventional wisdom, teacher-student relationship</li>
<li><strong>VI — The Lovers</strong>: Choices, values, partnership, integration of opposites, alignment</li>
<li><strong>VII — The Chariot</strong>: Willpower, victory through determination, mastering opposing forces, forward motion</li>
</ul>

<h3>The Second Triad: Soul's Journey (Cards 8-14)</h3>
<ul>
<li><strong>VIII — Strength</strong>: Inner courage, compassionate mastery over primal force, patience over power</li>
<li><strong>IX — The Hermit</strong>: Solitude, inner wisdom, spiritual seeking, withdrawal for reflection</li>
<li><strong>X — Wheel of Fortune</strong>: Cycles, destiny, turning points, good luck, karmic shifts</li>
<li><strong>XI — Justice</strong>: Truth, karma, balance, fair judgment, accountability</li>
<li><strong>XII — The Hanged Man</strong>: Voluntary surrender, new perspective through pause, spiritual insight through sacrifice</li>
<li><strong>XIII — Death</strong>: Transformation, inevitable endings, rebirth, letting go of the old</li>
<li><strong>XIV — Temperance</strong>: Balance, patience, integration of opposites, divine timing</li>
</ul>

<h3>The Third Triad: Spirit's Mastery (Cards 15-21)</h3>
<ul>
<li><strong>XV — The Devil</strong>: Shadow, bondage, materialism, addiction, the illusion of powerlessness</li>
<li><strong>XVI — The Tower</strong>: Sudden revelation, breakdown of false structures, chaos preceding clarity</li>
<li><strong>XVII — The Star</strong>: Hope, renewal, spiritual nourishment, guidance after darkness</li>
<li><strong>XVIII — The Moon</strong>: Illusion, subconscious fears, the unknown, intuition navigating darkness</li>
<li><strong>XIX — The Sun</strong>: Joy, vitality, success, clarity, childlike wonder, everything illuminated</li>
<li><strong>XX — Judgement</strong>: Awakening, calling, resurrection, evaluation, absolution</li>
<li><strong>XXI — The World</strong>: Completion, wholeness, integration, the end of one cycle and beginning of another</li>
</ul>

<h2>How to Work with Major Arcana in Readings</h2>
<h3>Many Major Arcana in a Spread</h3>
<p>If a spread has 5+ Major Arcana, the situation is heavily karmic, fated, or deep. External circumstances may feel out of your control — forces larger than daily life are at work.</p>

<h3>Reversed Major Arcana</h3>
<p>Reversed Major Arcana typically indicate that the card's energy is: blocked, internalized, delayed in manifestation, or being expressed through shadow rather than light.</p>

<h2>Memorization Tips</h2>
<p>Rather than memorizing lists, connect with each card's archetype as a character. Ask: What would this person say? How would this person handle my situation? What is this force teaching me?</p>

<h2>The Major Arcana & Your Life Path</h2>
<p>Your birth date can reveal your personal Major Arcana "soul card" — a lifelong teacher archetype. Add all digits of your birthdate until you reach a number 1-22. This card holds your deepest lessons and gifts.</p>
</article>`
  },
  {
    slug: "tarot-reading-for-beginners-complete-starter-guide",
    title: "How to Read Tarot for Beginners — Complete Starter Guide (No Experience Needed)",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>How to Read Tarot for Beginners — Complete Starter Guide (No Experience Needed)</h1>
<p>Are you drawn to tarot but feel overwhelmed by 78 cards, reversed meanings, and complex spreads? This guide will take you from complete beginner to confident reader with a simple, step-by-step approach that actually works.</p>

<h2>Step 1: Choose Your First Tarot Deck</h2>
<p>The most popular beginner deck is the Rider-Waite-Smith deck, created in 1909 by Arthur Edward Waite and illustrator Pamela Colman Smith. It's the foundation for most modern decks — and here's why it's ideal for beginners:</p>
<ul>
<li>Every card has a detailed illustrated scene (not just symbols)</li>
<li>The imagery directly suggests the meaning</li>
<li>Thousands of books, guides, and courses are based on it</li>
<li>Most AI tarot tools use its symbolism</li>
</ul>

<h2>Step 2: Understand the Deck Structure</h2>
<p>Before memorizing cards, understand the system:</p>
<ul>
<li><strong>22 Major Arcana</strong>: Big life themes, archetypes, destiny (The Fool through The World)</li>
<li><strong>56 Minor Arcana</strong>: Everyday life divided into 4 suits:</li>
<ul>
<li>Wands (fire, passion, career, creativity)</li>
<li>Cups (water, emotions, relationships)</li>
<li>Swords (air, mind, truth, conflict)</li>
<li>Pentacles (earth, money, material world)</li>
</ul>
<li>Each suit has 14 cards: Ace through 10, plus 4 Court Cards (Page, Knight, Queen, King)</li>
</ul>

<h2>Step 3: Learn the 5 Foundation Cards First</h2>
<p>Don't try to memorize all 78 cards at once. Start with these five high-frequency cards:</p>
<ol>
<li><strong>The Fool</strong>: New beginnings, trust, step forward</li>
<li><strong>The World</strong>: Completion, success, achievement</li>
<li><strong>The Tower</strong>: Sudden change, disruption, breakthrough</li>
<li><strong>The Star</strong>: Hope, healing, guidance</li>
<li><strong>The Lovers</strong>: Choice, values, relationship</li>
</ol>

<h2>Step 4: Start with a Simple One-Card Daily Pull</h2>
<p>The most powerful beginner practice: every morning, shuffle your deck while asking "What energy should I embody today?" Pull one card. Write down:</p>
<ul>
<li>Your first intuitive impression</li>
<li>One action this card suggests</li>
<li>At end of day: how did this card show up?</li>
</ul>
<p>This practice builds genuine intuitive connection faster than memorizing keywords.</p>

<h2>Step 5: Try a Three-Card Spread</h2>
<p>Once comfortable with single cards, try the classic three-card spread:</p>
<ul>
<li><strong>Card 1 (left)</strong>: Past / Foundation / What's underneath</li>
<li><strong>Card 2 (center)</strong>: Present / The situation</li>
<li><strong>Card 3 (right)</strong>: Future / Advice / What's emerging</li>
</ul>

<h2>Step 6: Trust Your Intuition Over the Book</h2>
<p>The guidebook meaning is just the starting point. When you look at a card, ask yourself:</p>
<ul>
<li>What do I notice first about this image?</li>
<li>What feeling does it give me?</li>
<li>What story is happening in this scene?</li>
<li>What would this card say to me right now?</li>
</ul>
<p>Your intuitive hits will always be more specific than a generic keyword.</p>

<h2>Common Beginner Mistakes to Avoid</h2>
<ul>
<li>Trying to memorize all 78 cards before doing a reading</li>
<li>Only reading when something is wrong or you're anxious</li>
<li>Asking the same question multiple times when you don't like the answer</li>
<li>Thinking you need psychic ability to read tarot</li>
<li>Over-relying on reversed meanings before you're confident with upright meanings</li>
</ul>

<h2>Your First Month Practice Plan</h2>
<ul>
<li><strong>Week 1-2</strong>: Daily one-card pull, write in journal</li>
<li><strong>Week 3</strong>: Three-card spreads, start learning the suits</li>
<li><strong>Week 4</strong>: Practice with a friend, ask for feedback</li>
</ul>

<h2>The Secret No Beginner Is Told</h2>
<p>You don't "read" tarot — you have a conversation with it. The cards are mirrors reflecting what's already true in your life. The more honestly you engage with that reflection, the more useful and accurate your readings become. Trust the process, trust your gut, and let the cards speak.</p>
</article>`
  },
  {
    slug: "tarot-and-astrology-connection-guide",
    title: "Tarot & Astrology — How They Work Together (Complete Cross-Reference Guide)",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Tarot & Astrology — How They Work Together (Complete Cross-Reference Guide)</h1>
<p>Tarot and astrology are sister systems — both map the human experience through symbolic language, and together they create readings of extraordinary depth. Here's a complete guide to how tarot and astrology interconnect.</p>

<h2>The Four Suits and Four Elements</h2>
<p>The most fundamental connection:</p>
<ul>
<li><strong>Wands = Fire</strong> → Aries, Leo, Sagittarius</li>
<li><strong>Cups = Water</strong> → Cancer, Scorpio, Pisces</li>
<li><strong>Swords = Air</strong> → Gemini, Libra, Aquarius</li>
<li><strong>Pentacles = Earth</strong> → Taurus, Virgo, Capricorn</li>
</ul>

<h2>The Major Arcana & Planetary Rulers</h2>
<p>Each Major Arcana card is associated with a planet or zodiac sign:</p>
<ul>
<li><strong>The Fool</strong> — Uranus (in modern), Air</li>
<li><strong>The Magician</strong> — Mercury</li>
<li><strong>The High Priestess</strong> — Moon</li>
<li><strong>The Empress</strong> — Venus</li>
<li><strong>The Emperor</strong> — Aries</li>
<li><strong>The Hierophant</strong> — Taurus</li>
<li><strong>The Lovers</strong> — Gemini</li>
<li><strong>The Chariot</strong> — Cancer</li>
<li><strong>Strength</strong> — Leo</li>
<li><strong>The Hermit</strong> — Virgo</li>
<li><strong>Wheel of Fortune</strong> — Jupiter</li>
<li><strong>Justice</strong> — Libra</li>
<li><strong>The Hanged Man</strong> — Neptune (modern), Water</li>
<li><strong>Death</strong> — Scorpio</li>
<li><strong>Temperance</strong> — Sagittarius</li>
<li><strong>The Devil</strong> — Capricorn</li>
<li><strong>The Tower</strong> — Mars</li>
<li><strong>The Star</strong> — Aquarius</li>
<li><strong>The Moon</strong> — Pisces</li>
<li><strong>The Sun</strong> — Sun</li>
<li><strong>Judgement</strong> — Pluto (modern), Fire</li>
<li><strong>The World</strong> — Saturn</li>
</ul>

<h2>Zodiac Sign Tarot Cards</h2>
<p>Each of the 12 zodiac signs has a corresponding tarot card:</p>
<ul>
<li>Aries → The Emperor</li>
<li>Taurus → The Hierophant</li>
<li>Gemini → The Lovers</li>
<li>Cancer → The Chariot</li>
<li>Leo → Strength</li>
<li>Virgo → The Hermit</li>
<li>Libra → Justice</li>
<li>Scorpio → Death</li>
<li>Sagittarius → Temperance</li>
<li>Capricorn → The Devil</li>
<li>Aquarius → The Star</li>
<li>Pisces → The Moon</li>
</ul>

<h2>Reading Tarot With Your Birth Chart</h2>
<p>Advanced readers use their natal chart to deepen tarot interpretations:</p>
<ul>
<li>If you're an Aries Sun, The Emperor themes are prominent in your destiny</li>
<li>If you have a stellium in Scorpio, Death/transformation cards appear frequently in your spreads</li>
<li>A Venus in Pisces might resonate deeply with The Moon's watery intuition</li>
</ul>

<h2>Timing with Astrology & Tarot</h2>
<p>Astrology can help interpret timing in tarot readings:</p>
<ul>
<li><strong>Fire cards</strong> (Wands) = Fast timing, days to weeks</li>
<li><strong>Air cards</strong> (Swords) = Medium timing, weeks to months</li>
<li><strong>Water cards</strong> (Cups) = Emotional timing, when you're ready</li>
<li><strong>Earth cards</strong> (Pentacles) = Slow timing, months to years</li>
</ul>

<h2>Combining the Two Systems in Practice</h2>
<p>When you're reading tarot during an important astrological event (Mercury retrograde, full moon in your sign, Jupiter return), the cards become especially powerful tools for navigating that specific cosmic weather.</p>
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
