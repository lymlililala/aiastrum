import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);

const posts = [
  {
    slug: "the-hierophant-tarot-card-meaning",
    title: "The Hierophant Tarot Card Meaning — Tradition, Belief & Spiritual Authority",
    description: "The Hierophant (V Major Arcana) represents tradition, religion, and spiritual guidance. Learn upright and reversed meanings in love, career, and belief systems.",
    keywords: ["the hierophant tarot", "hierophant tarot meaning", "major arcana v", "hierophant tarot love", "hierophant tarot reversed"],
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>The Hierophant Tarot Card Meaning</h1>
<p>Card V of the Major Arcana, The Hierophant sits upon a throne between two pillars, wearing triple papal crown and robes. Two followers kneel before him, receiving his blessing. He bridges heaven and earth through established tradition.</p>
<h2>Upright Meaning</h2>
<ul>
<li><strong>Tradition:</strong> Following established beliefs, customs, and institutions</li>
<li><strong>Spiritual guidance:</strong> Seeking or offering wisdom within a structured path</li>
<li><strong>Education:</strong> Formal learning, mentorship, established knowledge</li>
<li><strong>Conformity:</strong> Working within systems and social norms</li>
<li><strong>Marriage:</strong> Commitment through established ceremony and social recognition</li>
</ul>
<h2>Reversed Meaning</h2>
<ul>
<li>Challenging dogma and questioning established authority</li>
<li>Unconventional relationships or spiritual paths</li>
<li>Breaking free from rigid tradition that no longer serves</li>
<li>Rebellion against institutional control</li>
</ul>
<h2>The Hierophant in Love</h2>
<p><strong>Upright:</strong> Traditional relationships — marriage, commitment, meeting through shared values. A relationship that has social blessing and cultural recognition. May indicate a marriage proposal or commitment ceremony.</p>
<p><strong>Reversed:</strong> Non-traditional relationships (open relationships, different cultural backgrounds), breaking away from family expectations, or choosing personal truth over social acceptance.</p>
<h2>The Hierophant in Career</h2>
<p>Upright: Thriving in established institutions — academia, government, large organizations, religious roles. A mentor figure appears, or you take on a teaching/guiding role. Reversed: Entrepreneurship outside the system, freelancing, or challenging workplace norms.</p>
<h2>Astrology Connection</h2>
<p>Associated with <strong>Taurus</strong> — stability, values, and the physical manifestation of belief systems.</p>
<h2>Quick Reference</h2>
<ul><li><strong>Yes or No:</strong> Yes — through traditional paths</li><li><strong>Element:</strong> Earth</li><li><strong>Zodiac:</strong> Taurus</li><li><strong>Key themes:</strong> Tradition, spirituality, education, conformity</li></ul>
</article>`
  },
  {
    slug: "the-chariot-tarot-reversed",
    title: "The Chariot Reversed — Loss of Control, Aggression & Directionless Drive",
    description: "What does The Chariot reversed mean? Explore reversed Chariot meanings in love, career, and life — including lack of direction, aggression, and overcoming self-defeat.",
    keywords: ["the chariot reversed", "chariot tarot reversed", "chariot reversed meaning", "chariot reversed love", "major arcana vii reversed"],
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>The Chariot Reversed Tarot Card Meaning</h1>
<p>The Chariot upright is a card of determined willpower and victory. Reversed, its fierce horses pull in opposite directions — the warrior's control slips, and forward momentum becomes chaotic force without direction.</p>
<h2>Core Reversed Meanings</h2>
<ul>
<li><strong>Loss of control:</strong> Forces in your life that cannot be harnessed; feeling pulled apart by competing demands</li>
<li><strong>Aggression without purpose:</strong> Drive that destroys rather than builds</li>
<li><strong>Directionlessness:</strong> Lots of energy with no clear destination</li>
<li><strong>Coasting:</strong> Letting circumstances carry you rather than steering your own course</li>
<li><strong>Road rage / impulsiveness:</strong> Reactive decision-making in the heat of the moment</li>
</ul>
<h2>In Love</h2>
<p>Power struggles in a relationship — both people wanting to drive, neither willing to yield. Or conversely, one person completely passive while the other steers. Reversed Chariot asks: <em>Are you fighting your partner, or with them?</em></p>
<h2>In Career</h2>
<p>A project or career path that has lost its direction. You may be working incredibly hard but getting nowhere, or making impulsive moves that undo previous progress. Pause and reassess where you truly want to go.</p>
<h2>The Hidden Gift</h2>
<p>The Chariot reversed can also represent the end of a relentless drive — a necessary surrender before finding a more aligned path. Sometimes losing control of one direction is how we discover the right one.</p>
<h2>Quick Reference</h2>
<ul><li><strong>Yes or No:</strong> No — not the right time or direction</li><li><strong>Element:</strong> Water</li><li><strong>Zodiac:</strong> Cancer</li><li><strong>Core reversed theme:</strong> Misdirected force, loss of control</li></ul>
</article>`
  },
  {
    slug: "knight-of-cups-tarot-meaning",
    title: "Knight of Cups Tarot — The Romantic Messenger of Heart and Vision",
    description: "The Knight of Cups is tarot's romantic idealist. Learn upright and reversed Knight of Cups meanings in love, career, and as a person in your reading.",
    keywords: ["knight of cups tarot", "knight of cups meaning", "knight of cups love", "knight of cups reversed", "cups court cards"],
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Knight of Cups Tarot Card Meaning</h1>
<p>The Knight of Cups rides a white horse at a gentle pace, holding a golden cup as an offering. Unlike the fiery Knights of Wands or the aggressive Knight of Swords, this Knight moves gracefully — he is the poet, the romantic, the bearer of heartfelt news.</p>
<h2>Upright Meaning</h2>
<ul>
<li><strong>Romance:</strong> A charming person sweeping you off your feet; declarations of love</li>
<li><strong>Creative vision:</strong> Following a dream with heart and artistry</li>
<li><strong>Emotional intelligence:</strong> Sensitive, intuitive, connected to feeling</li>
<li><strong>Invitation or offer:</strong> An opportunity that speaks to your heart</li>
<li><strong>Messenger:</strong> News of a romantic or creative nature is coming</li>
</ul>
<h2>Reversed Meaning</h2>
<ul>
<li>Moodiness, emotional volatility, or manipulation</li>
<li>Unrealistic romantic fantasies disconnected from reality</li>
<li>A charming person whose actions don't match their beautiful words</li>
<li>Creative blocks or retreat into imagination over action</li>
</ul>
<h2>As a Person</h2>
<p>The Knight of Cups represents a creative, romantic individual — often an artist, musician, or poet. They wear their heart on their sleeve and are genuinely moved by beauty. Watch for the gap between their idealized vision and their actual follow-through.</p>
<h2>In Love</h2>
<p><strong>Upright:</strong> A beautiful romantic gesture is coming; someone is about to express deep feelings. New love with genuine emotional depth.</p>
<p><strong>Reversed:</strong> A partner whose charm is real but whose commitment is uncertain. The "all talk, no action" energy in romance.</p>
<h2>Quick Reference</h2>
<ul><li><strong>Yes or No:</strong> Yes — emotionally</li><li><strong>Element:</strong> Water of Water</li><li><strong>Key themes:</strong> Romance, creativity, emotional offer</li></ul>
</article>`
  },
  {
    slug: "knight-of-wands-tarot-meaning",
    title: "Knight of Wands Tarot — Adventurous Energy, Passionate Action & Fiery Drive",
    description: "The Knight of Wands is tarot's bold adventurer. Learn upright and reversed meanings in love, career, and as a person — and what this fiery knight's appearance signals.",
    keywords: ["knight of wands tarot", "knight of wands meaning", "knight of wands love", "knight of wands reversed", "wands court cards"],
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Knight of Wands Tarot Card Meaning</h1>
<p>The Knight of Wands charges forward on a rearing horse, armored in fire salamander designs, wand held high. He is pure kinetic energy — courageous, charismatic, and completely in motion. The question is: where exactly is he going?</p>
<h2>Upright Meaning</h2>
<ul>
<li><strong>Action and adventure:</strong> Bold moves, travel, spontaneous decisions</li>
<li><strong>Passionate pursuit:</strong> Going after what you want with full intensity</li>
<li><strong>Leadership energy:</strong> Taking charge, inspiring others with enthusiasm</li>
<li><strong>Career momentum:</strong> Projects launching, fast-moving opportunities</li>
<li><strong>New experiences:</strong> Embracing the unknown with courage and excitement</li>
</ul>
<h2>Reversed Meaning</h2>
<ul>
<li>Recklessness without strategy — running before looking</li>
<li>Scattered energy, many starts and few completions</li>
<li>Haste making waste — impulsive moves creating avoidable problems</li>
<li>Frustration and impatience when results don't come immediately</li>
</ul>
<h2>As a Person</h2>
<p>The Knight of Wands is the exciting, magnetic person who sweeps into your life like a sudden wind — exhilarating and unpredictable. Charismatic, passionate, and always ready for the next adventure, but commitment and follow-through may be challenges.</p>
<h2>In Love</h2>
<p><strong>Upright:</strong> An exciting new romantic interest enters the scene. Passionate, spontaneous connection. Things move fast.</p>
<p><strong>Reversed:</strong> The hot pursuit that cools as quickly as it ignited. A lover more excited by the chase than the relationship itself.</p>
<h2>Quick Reference</h2>
<ul><li><strong>Yes or No:</strong> Yes — go for it!</li><li><strong>Element:</strong> Fire of Fire</li><li><strong>Key themes:</strong> Adventure, passion, action, charisma</li></ul>
</article>`
  },
  {
    slug: "knight-of-swords-tarot-meaning",
    title: "Knight of Swords Tarot — Swift Action, Mental Force & Cutting Truth",
    description: "The Knight of Swords charges forward with unstoppable mental force. Learn upright and reversed meanings in love, career, and life — including when speed becomes recklessness.",
    keywords: ["knight of swords tarot", "knight of swords meaning", "knight of swords love", "knight of swords reversed"],
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Knight of Swords Tarot Card Meaning</h1>
<p>The Knight of Swords charges at full gallop, sword extended, trees bending in his wake. He is the fastest moving card in the tarot — decisive, direct, and utterly committed to cutting through obstacles. He doesn't slow down to consider feelings.</p>
<h2>Upright Meaning</h2>
<ul>
<li><strong>Swift, decisive action:</strong> Moving quickly toward a goal with clarity and determination</li>
<li><strong>Mental agility:</strong> Sharp thinking, rapid problem-solving</li>
<li><strong>Courageous truth-telling:</strong> Saying what needs to be said, even if uncomfortable</li>
<li><strong>Defending what's right:</strong> Fighting for justice or a principle</li>
<li><strong>Change happening fast:</strong> Events moving at an almost uncontrollable pace</li>
</ul>
<h2>Reversed Meaning</h2>
<ul>
<li>Reckless aggression — charging in without thinking</li>
<li>Sharp words used as weapons, causing unnecessary damage</li>
<li>Burned bridges through impulsive speech or action</li>
<li>Mental burnout from too-fast thinking and over-analysis</li>
</ul>
<h2>In Love</h2>
<p><strong>Upright:</strong> Someone who pursues you with single-minded intensity. Direct communication, no games. Fast-moving relationship.</p>
<p><strong>Reversed:</strong> Verbal cruelty or emotional unavailability masked by intellectual dominance.</p>
<h2>Quick Reference</h2>
<ul><li><strong>Yes or No:</strong> Yes — but proceed with care</li><li><strong>Element:</strong> Air of Air</li><li><strong>Key themes:</strong> Speed, mental force, decisive action</li></ul>
</article>`
  },
  {
    slug: "knight-of-pentacles-tarot-meaning",
    title: "Knight of Pentacles Tarot — Steady Progress, Diligence & Reliable Effort",
    description: "The Knight of Pentacles is tarot's hardest worker. Learn upright and reversed meanings in career, finances, love, and as a reliable but slow-moving person.",
    keywords: ["knight of pentacles tarot", "knight of pentacles meaning", "knight of pentacles love", "knight of pentacles reversed"],
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Knight of Pentacles Tarot Card Meaning</h1>
<p>Unlike the charging Knights of other suits, the Knight of Pentacles sits still on his horse, examining a pentacle with calm intensity. He moves slowly — but everything he builds lasts. He is the most reliable of all the Knights, and the least flashy.</p>
<h2>Upright Meaning</h2>
<ul>
<li><strong>Diligent work:</strong> Consistent, methodical effort that compounds over time</li>
<li><strong>Reliability:</strong> Following through on every commitment</li>
<li><strong>Long-term thinking:</strong> Building for the future rather than immediate gratification</li>
<li><strong>Stability:</strong> Preferring proven methods over risky shortcuts</li>
<li><strong>Material progress:</strong> Steady financial or career advancement</li>
</ul>
<h2>Reversed Meaning</h2>
<ul>
<li>Stagnation and resistance to necessary change</li>
<li>Workaholism that neglects other areas of life</li>
<li>Stubborn refusal to adapt to new circumstances</li>
<li>Boredom and frustration with the slow pace of progress</li>
</ul>
<h2>As a Person</h2>
<p>The most dependable person you'll ever meet — the one who shows up every time, does the work, and never makes empty promises. May not be exciting, but their presence builds real security over time.</p>
<h2>In Love</h2>
<p><strong>Upright:</strong> A loyal, steady partner who proves love through consistent action. Slow to commit, but deeply trustworthy once they do.</p>
<p><strong>Reversed:</strong> Stuck in a rut; a relationship that has become routine without growth.</p>
<h2>Quick Reference</h2>
<ul><li><strong>Yes or No:</strong> Yes — slowly but surely</li><li><strong>Element:</strong> Earth of Earth</li><li><strong>Key themes:</strong> Diligence, reliability, steady progress</li></ul>
</article>`
  },
  {
    slug: "page-of-cups-tarot-meaning",
    title: "Page of Cups Tarot — Creative Sensitivity, Psychic Messages & Emotional Beginnings",
    description: "The Page of Cups brings imaginative, emotionally open energy. Learn upright and reversed meanings, including news, intuitive messages, and creative beginnings.",
    keywords: ["page of cups tarot", "page of cups meaning", "page of cups love", "page of cups reversed", "cups pages"],
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Page of Cups Tarot Card Meaning</h1>
<p>The Page of Cups stands by the water's edge, cup in hand, peering at a fish that pops up to greet him. He looks surprised but delighted — open to whatever unexpected messages emerge from the emotional depths. He represents the beginning of an emotional journey.</p>
<h2>Upright Meaning</h2>
<ul>
<li><strong>Creative intuition:</strong> Following imaginative impulses and psychic impressions</li>
<li><strong>New emotional beginning:</strong> Opening your heart to possibility</li>
<li><strong>Messages and news:</strong> Often signals news related to love, creativity, or emotional matters</li>
<li><strong>Childlike wonder:</strong> Approaching life with openness and magical thinking</li>
<li><strong>Psychic sensitivity:</strong> Heightened intuition, vivid dreams, subtle impressions</li>
</ul>
<h2>Reversed Meaning</h2>
<ul>
<li>Emotional immaturity or dramatic overreactions</li>
<li>Creative blocks from fear of being seen</li>
<li>Ignoring intuitive messages that are trying to get through</li>
<li>Escapism into fantasy rather than engaging with reality</li>
</ul>
<h2>In Love</h2>
<p><strong>Upright:</strong> New romantic feelings or a sweet, tender beginning. Someone expresses their feelings innocently and sincerely.</p>
<p><strong>Reversed:</strong> Emotional games or immaturity making a connection difficult to sustain.</p>
<h2>Quick Reference</h2>
<ul><li><strong>Yes or No:</strong> Yes — with openness</li><li><strong>Element:</strong> Earth of Water</li><li><strong>Key themes:</strong> Intuition, emotional beginnings, messages</li></ul>
</article>`
  },
  {
    slug: "page-of-wands-tarot-meaning",
    title: "Page of Wands Tarot — Enthusiastic Beginnings, Creative Spark & Free Spirit",
    description: "The Page of Wands brings fresh creative energy and boundless enthusiasm. Learn upright and reversed Page of Wands meanings in career, love, and self-expression.",
    keywords: ["page of wands tarot", "page of wands meaning", "page of wands love", "page of wands reversed"],
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Page of Wands Tarot Card Meaning</h1>
<p>The Page of Wands stands in a barren desert, gazing upward at the wand in his hands as if seeing it spark into flame. He is pure creative potential — enthusiastic, fearless, and fizzing with ideas that haven't yet found their form.</p>
<h2>Upright Meaning</h2>
<ul>
<li><strong>Creative spark:</strong> A new idea or passion project beginning to ignite</li>
<li><strong>Enthusiasm:</strong> Approaching new ventures with joy and openness</li>
<li><strong>Free spirit:</strong> Exploring without attachment to outcome</li>
<li><strong>News and messages:</strong> Good news related to creative or career matters</li>
<li><strong>Beginner's mind:</strong> Fresh perspective that sees possibilities others miss</li>
</ul>
<h2>Reversed Meaning</h2>
<ul>
<li>Too many ideas, none followed through</li>
<li>Impatience and frustration when excitement meets obstacles</li>
<li>Lack of direction — energy without purpose</li>
<li>Fear of failure preventing the spark from becoming flame</li>
</ul>
<h2>In Career</h2>
<p>A new creative project or business idea is emerging. This card encourages you to start before you feel ready — the learning comes from doing. Reversed: start small and build consistency before expanding.</p>
<h2>Quick Reference</h2>
<ul><li><strong>Yes or No:</strong> Yes — start now</li><li><strong>Element:</strong> Earth of Fire</li><li><strong>Key themes:</strong> Creative spark, enthusiasm, new beginnings</li></ul>
</article>`
  }
];

let success = 0, fail = 0;
for (const post of posts) {
  const { error } = await supabase.from("mysticai_blog_posts").upsert(post, { onConflict: "slug" });
  if (error) { console.error("FAIL", post.slug, error.message); fail++; }
  else { console.log("OK", post.slug); success++; }
}
console.log(`\nDone: ${success} ok, ${fail} fail`);
