import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);
const posts = [
  {
    slug: "the-chariot-tarot-reversed-meaning",
    title: "The Chariot Reversed Tarot — Loss of Control, Scattered Direction & Inner Conflict",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>The Chariot Reversed Tarot — Loss of Control, Scattered Direction & Inner Conflict</h1>
<p>The Chariot upright is victory through willpower. Reversed, that powerful vehicle spins out — direction is lost, inner forces pull against each other, and the triumphant march forward stalls. Yet reversal also invites an inward journey: perhaps the real battle is within.</p>
<h2>Reversed Chariot Core Meanings</h2>
<ul><li><strong>Loss of direction</strong>: Unclear goals or competing priorities prevent forward movement</li><li><strong>Inner conflict</strong>: Opposing desires, values, or emotions pulling you in contradictory directions</li><li><strong>Lack of self-discipline</strong>: Impulses overriding intentional choices; difficulty staying the course</li><li><strong>External obstacles overwhelming</strong>: Feeling powerless against circumstances rather than mastering them</li><li><strong>Aggression turned inward</strong>: Force that should move you forward instead attacks your own confidence</li></ul>
<h2>Chariot Reversed in Love</h2>
<p>Relationship feels out of control — either too aggressive, too passive, or moving in circles. One partner may be forcing the direction while the other resists. Or both are pulling in opposite directions, making commitment impossible. This card calls for honest conversation about where you're actually going together.</p>
<h2>Chariot Reversed in Career</h2>
<p>Scattered efforts, starting projects without finishing, difficulty maintaining momentum, or feeling like external forces are blocking your path despite your efforts. The solution: strip back to one clear goal and move toward it with singular focus.</p>
<h2>The Hidden Gift of Chariot Reversed</h2>
<p>When the chariot stops, you're forced to look inward. What internal conflicts need resolving before you can move forward? Reversed, The Chariot asks you to master your inner landscape before attempting to conquer the outer one.</p>
<h2>Advice</h2>
<p>Clarify your direction. Resolve the inner conflict first. Discipline is built gradually — start with one small commitment you keep completely.</p></article>`
  },
  {
    slug: "strength-tarot-reversed-meaning",
    title: "Strength Reversed Tarot — Self-Doubt, Raw Instinct & Recovering Courage",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>Strength Reversed Tarot — Self-Doubt, Raw Instinct & Recovering Courage</h1>
<p>Strength upright is the quiet courage of compassionate mastery. Reversed, that inner power is temporarily inaccessible — blocked by self-doubt, overwhelmed by raw instinct, or depleted by circumstances that have demanded more than was available.</p>
<h2>Reversed Strength Core Meanings</h2>
<ul><li><strong>Self-doubt and insecurity</strong>: The inner lion feels more like a terrified kitten; confidence has temporarily collapsed</li><li><strong>Primal impulses taking over</strong>: Acting from fear, anger, or desire rather than from centered wisdom</li><li><strong>Exhausted inner resources</strong>: The sustained effort of compassionate mastery has depleted the reserves</li><li><strong>Weakness perceived as shame</strong>: Judging yourself harshly for not being "strong enough"</li><li><strong>Victimhood</strong>: Feeling controlled by circumstances rather than mastering your response to them</li></ul>
<h2>Strength Reversed in Love</h2>
<p>Insecurity driving relationship behavior — jealousy, possessiveness, or conversely, complete self-erasure to avoid conflict. May be in a relationship where you feel chronically weak or unable to set necessary limits.</p>
<h2>Strength Reversed in Career</h2>
<p>Imposter syndrome, inability to advocate for yourself, letting workplace dynamics push you around, or alternatively — allowing frustration to create aggressive behavior that undermines your position.</p>
<h2>The Path Back to Strength</h2>
<p>True strength is not the absence of vulnerability — it's the capacity to remain present and compassionate even when vulnerable. The reversal is an invitation to tend to yourself with the same gentleness you'd offer the lion. Rest. Recover. Then return.</p></article>`
  },
  {
    slug: "wheel-of-fortune-tarot-reversed-meaning",
    title: "Wheel of Fortune Reversed — Resisting Change, Bad Luck Cycles & Breaking Free",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>Wheel of Fortune Reversed — Resisting Change, Bad Luck Cycles & Breaking Free</h1>
<p>The Wheel of Fortune upright brings karmic shifts, cycles, and turns of luck. Reversed, the wheel seems stuck — bad luck persists, change is resisted, or the person feels trapped in repetitive negative patterns they can't escape.</p>
<h2>Reversed Wheel Core Meanings</h2>
<ul><li><strong>Stuck in a cycle</strong>: Repeating the same patterns, relationships, or situations that never improve</li><li><strong>Resisting necessary change</strong>: Clinging to what's familiar even when the wheel is clearly turning</li><li><strong>External bad luck</strong>: A period where circumstances seem to work against you despite your efforts</li><li><strong>Karmic debt coming due</strong>: Patterns from the past demanding resolution before forward movement is possible</li><li><strong>Victim of fate feeling</strong>: Feeling powerless against circumstances, as if the universe is against you</li></ul>
<h2>Wheel Reversed in Love</h2>
<p>Recurring relationship patterns — attracting the same type of partner repeatedly, relationship cycles that never resolve, or feeling fated to repeat painful dynamics. The card asks: what pattern are you choosing to continue?</p>
<h2>Breaking the Reversed Wheel</h2>
<p>The wheel turns by itself — but you choose your relationship to the turning. Reversed, the invitation is to stop fighting the cycle and instead examine what within you perpetuates it. Change the inner pattern, and the outer wheel shifts.</p>
<h2>Timing Note</h2>
<p>The Wheel reversed can also simply indicate a temporary period of contraction or difficulty that will naturally shift — not all bad luck periods require dramatic inner work; some just require endurance.</p></article>`
  },
  {
    slug: "justice-tarot-reversed-meaning",
    title: "Justice Reversed Tarot — Unfair Outcomes, Avoiding Accountability & Karmic Delay",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>Justice Reversed Tarot — Unfair Outcomes, Avoiding Accountability & Karmic Delay</h1>
<p>Justice upright brings fair outcomes, truth, and balance. Reversed, the scales are tipped — fairness is delayed or denied, accountability is avoided, or the person is living with the consequences of past imbalances not yet fully addressed.</p>
<h2>Reversed Justice Core Meanings</h2>
<ul><li><strong>Unfair outcomes</strong>: Legal, professional, or personal situations resolving unfairly despite deserving better</li><li><strong>Avoiding accountability</strong>: Refusing to take responsibility for past actions or their consequences</li><li><strong>Dishonesty in legal matters</strong>: Corruption, biased judgment, or information being hidden in legal situations</li><li><strong>Self-judgment distortion</strong>: Either excessive self-blame or complete self-exoneration from valid accountability</li><li><strong>Karmic balance delayed</strong>: What should be corrected hasn't been yet — patience and continued integrity are required</li></ul>
<h2>Justice Reversed in Love</h2>
<p>Relationship imbalance — one partner giving far more than the other, unresolved betrayals not properly addressed, or a relationship that has ended without fair closure. May also indicate dishonesty in the relationship that hasn't been surfaced yet.</p>
<h2>Justice Reversed in Legal/Professional Situations</h2>
<p>Unfavorable legal outcomes, biased workplace decisions, or processes that aren't proceeding fairly. This card recommends gathering more documentation and seeking additional legal or professional counsel rather than relying on the system to self-correct.</p>
<h2>The Path Forward</h2>
<p>You cannot force justice on the external world. But you can ensure your own conduct is impeccable, document everything, tell the truth consistently, and trust that genuine justice ultimately prevails — even when delayed.</p></article>`
  },
  {
    slug: "the-star-tarot-reversed-meaning",
    title: "The Star Reversed Tarot — Lost Hope, Disconnection & Restoring Inner Light",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>The Star Reversed Tarot — Lost Hope, Disconnection & Restoring Inner Light</h1>
<p>The Star upright is one of tarot's most beautiful cards — pure hope, healing, and spiritual nourishment after The Tower's destruction. Reversed, that light dims. Hope feels distant, spiritual connection has been lost, or the healing process is slower and harder than expected.</p>
<h2>Reversed Star Core Meanings</h2>
<ul><li><strong>Hopelessness or despair</strong>: Difficulty seeing any positive possibility in the current situation</li><li><strong>Spiritual disconnection</strong>: Feeling abandoned by something larger — universe, faith, purpose</li><li><strong>Healing blocked or delayed</strong>: Recovery from difficulty is slower than hoped; setbacks in the healing journey</li><li><strong>Negative self-image</strong>: Inability to see your own light, worth, or beauty</li><li><strong>Lack of inspiration</strong>: Creative or spiritual well running dry</li></ul>
<h2>Star Reversed in Love</h2>
<p>Difficulty believing in love's possibility — either because of past wounds not yet healed, or because current relationship has lost its spark and sense of possibility. The invitation is to reconnect with what originally drew you to love before the disappointments accumulated.</p>
<h2>Restoring the Star's Light</h2>
<p>The Star's medicine is always available — it just requires creating conditions for the light to return. Nature, creative expression, connection with authentic community, and small acts of self-care that honor your worth are the star's prescription.</p>
<h2>Hope as Practice</h2>
<p>When the Star reverses, hope becomes a practice rather than a feeling. Choose to act as if healing is possible, even before you feel it. The feeling will follow the action.</p></article>`
  },
  {
    slug: "the-world-tarot-reversed-meaning",
    title: "The World Reversed Tarot — Incompletion, Delay & Almost-There Lessons",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>The World Reversed Tarot — Incompletion, Delay & Almost-There Lessons</h1>
<p>The World upright is the ultimate completion card — the end of the Hero's Journey, wholeness achieved, full integration. Reversed, the World whispers "not quite yet." Something remains unfinished, a key lesson hasn't been learned, or completion is being delayed by attachment to the journey itself.</p>
<h2>Reversed World Core Meanings</h2>
<ul><li><strong>Incompletion</strong>: A major cycle that should be finishing is still dragging on; something is holding up the final completion</li><li><strong>Delayed achievement</strong>: Goals and completion that should have arrived by now are still pending</li><li><strong>Unlearned lessons</strong>: A key insight from this cycle hasn't been integrated — completion awaits that understanding</li><li><strong>Resistance to closure</strong>: Holding on to a situation, relationship, or chapter that is genuinely complete</li><li><strong>Short-changing yourself</strong>: Settling for almost-success rather than claiming the full achievement available</li></ul>
<h2>World Reversed in Love</h2>
<p>A relationship cycle that feels almost complete but hasn't fully resolved — either needs genuine closure and ending, or needs one more honest conversation to reach real completion and commitment.</p>
<h2>World Reversed in Career</h2>
<p>A project, degree, or professional goal that keeps getting deferred. The World reversed asks: what specific thing still needs to happen, and what is genuinely stopping it from happening?</p>
<h2>The Gift of Reversal</h2>
<p>The reversed World is "almost there" energy — closer to completion than it might feel. Identify the specific missing piece, address it directly, and the World will right itself.</p></article>`
  },
  {
    slug: "the-hermit-tarot-reversed-meaning",
    title: "The Hermit Reversed Tarot — Isolation, Returning to the World & End of Solitude",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>The Hermit Reversed Tarot — Isolation, Returning to the World & End of Solitude</h1>
<p>The Hermit upright is the wise elder who withdraws to seek inner truth, then returns to share the light. Reversed, the hermit either hides from necessary engagement with the world, or emerges from genuine solitude ready to reconnect. Context determines which.</p>
<h2>Reversed Hermit Core Meanings</h2>
<ul><li><strong>Unhealthy isolation</strong>: Withdrawing not for wisdom but from fear of connection, vulnerability, or engagement</li><li><strong>Loneliness rather than solitude</strong>: Involuntary aloneness that is not chosen and not nourishing</li><li><strong>Emerging from withdrawal</strong>: The period of inner work is complete — time to return to the world</li><li><strong>Rejecting guidance</strong>: Refusing to seek or accept wisdom, mentorship, or support from others</li><li><strong>Excessive self-reliance</strong>: Using independence to avoid the vulnerability of asking for help</li></ul>
<h2>Hermit Reversed in Love</h2>
<p>Fear of intimacy masquerading as "needing space." Chronic emotional unavailability. Or conversely — ready to emerge from a period of necessary healing and open to connection again after time alone.</p>
<h2>The Return of the Hermit</h2>
<p>If you've been in a genuine period of solitude and inner work, The Hermit reversed may simply signal it's time to re-engage. The light gathered in solitude is meant to be shared — keeping it only for yourself eventually dims it.</p>
<h2>Healthy vs. Unhealthy Withdrawal</h2>
<p>The key question: Is your solitude chosen and nourishing, or is it fear-driven and increasingly isolating? The former is The Hermit upright; the latter is its shadow reversed.</p></article>`
  },
  {
    slug: "the-emperor-tarot-reversed-meaning",
    title: "The Emperor Reversed Tarot — Tyranny, Rigidity & Reclaiming Personal Authority",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>The Emperor Reversed Tarot — Tyranny, Rigidity & Reclaiming Personal Authority</h1>
<p>The Emperor upright is structure, protection, and earned authority. Reversed, that authority becomes tyranny — imposed, rigid, and serving control rather than genuine protection. Or conversely, authority collapses entirely into chaos and irresponsibility.</p>
<h2>Reversed Emperor Core Meanings</h2>
<ul><li><strong>Abuse of authority</strong>: Using power to control rather than to protect and serve — domineering behavior in relationships or work</li><li><strong>Excessive rigidity</strong>: Rules, structures, and systems used to prevent growth rather than enable it</li><li><strong>Paternal wounds</strong>: Relationship with father or authority figures creating ongoing patterns of either submission or rebellion</li><li><strong>Lack of discipline</strong>: Authority and structure completely absent — chaos from refusal to establish necessary order</li><li><strong>Feeling controlled</strong>: Under the thumb of a domineering person, system, or internal critic</li></ul>
<h2>Emperor Reversed in Love</h2>
<p>One partner exerting domineering control — financial control, decision-making monopoly, emotional manipulation through authority. Or a relationship where all structure is absent and no one is taking responsible leadership. Either way, genuine equality and mutual respect are missing.</p>
<h2>Emperor Reversed in Career</h2>
<p>A controlling, micromanaging boss. Bureaucratic systems blocking real work. Or the complete absence of professional self-discipline creating career chaos. The antidote: claim your own authority within your sphere.</p>
<h2>Reclaiming Healthy Authority</h2>
<p>The Emperor reversed invites you to examine your relationship with authority — both in others and within yourself. Where are you giving your power away, and where are you using power inappropriately? Healthy authority serves those it governs.</p></article>`
  },
  {
    slug: "the-empress-tarot-reversed-meaning",
    title: "The Empress Reversed Tarot — Creative Block, Neglect & Reclaiming Abundance",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>The Empress Reversed Tarot — Creative Block, Neglect & Reclaiming Abundance</h1>
<p>The Empress upright is lush abundance, creative fertility, and nurturing love. Reversed, the garden is struggling — creative inspiration has dried up, nurturing has become smothering or neglect, or the connection to natural cycles and physical pleasure has been severed.</p>
<h2>Reversed Empress Core Meanings</h2>
<ul><li><strong>Creative block</strong>: The creative well feels empty; inspiration is inaccessible or constantly interrupted</li><li><strong>Neglect of self or others</strong>: The nurturing that sustains life — physical, emotional, creative — has been withdrawn</li><li><strong>Smothering control</strong>: Nurturing inverted into possessiveness — love that suffocates rather than nourishes</li><li><strong>Financial difficulties</strong>: Abundance blocked; money flow disrupted or resources depleted</li><li><strong>Body disconnection</strong>: Ignoring the body's needs — health neglected, sensory pleasure denied, physical wellbeing overlooked</li></ul>
<h2>Empress Reversed in Love</h2>
<p>Either codependent over-giving that depletes the giver, or withdrawal of affection creating emotional drought in the relationship. Mother wounds or overprotective dynamics playing out in romantic relationships. Difficulty creating a home or family life together.</p>
<h2>Restoring the Empress</h2>
<p>The Empress's medicine is nature, sensory pleasure, and creative engagement. Even small acts of reconnecting with the physical world — gardening, cooking, creating art, walking in nature — can begin to restore the creative and nurturing flow.</p>
<h2>Self-Nurturing First</h2>
<p>Before you can truly nurture others, you must nourish yourself. The reversed Empress asks: when did you last genuinely care for yourself with the attentiveness you give to others?</p></article>`
  },
  {
    slug: "temperance-tarot-reversed-meaning",
    title: "Temperance Reversed Tarot — Imbalance, Excess & Restoring Equilibrium",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>Temperance Reversed Tarot — Imbalance, Excess & Restoring Equilibrium</h1>
<p>Temperance upright is the art of divine balance — patient alchemy that blends opposing forces into something greater than either alone. Reversed, the delicate equilibrium is lost: excess in one area depletes another, impatience disrupts the alchemical process, or the attempt to force outcomes destroys their organic development.</p>
<h2>Reversed Temperance Core Meanings</h2>
<ul><li><strong>Excess and imbalance</strong>: Too much of something — work, indulgence, emotion, restriction — creating overall dysfunction</li><li><strong>Impatience destroying process</strong>: Forcing outcomes that require time; rushing a transformation that needs to unfold at its own pace</li><li><strong>Conflict between parts of yourself</strong>: Inner extremes fighting rather than being blended into integrated wisdom</li><li><strong>Addiction or compulsion</strong>: Unhealthy relationship with substances, behaviors, or experiences</li><li><strong>Lack of moderation</strong>: The "all or nothing" approach preventing the sustainable middle path</li></ul>
<h2>Temperance Reversed in Love</h2>
<p>Relationship swinging between extremes — passionate highs and terrible lows with no stable ground. Or one person giving all while the other gives nothing, with no sustainable middle. The relationship needs rebalancing, and possibly external support to achieve it.</p>
<h2>Temperance Reversed in Health</h2>
<p>This is one of the strongest health cards in tarot. Reversed, it warns of excess affecting the body — overwork, substance use, extreme dieting, or chronic lack of sleep. The body needs the same patient, balanced care that Temperance upright provides.</p>
<h2>Finding the Middle Path</h2>
<p>Identify the specific area of imbalance. Then make one small adjustment toward the middle — not a dramatic swing in the opposite direction, but a gentle, patient recalibration. Temperance is restored gradually, not all at once.</p></article>`
  }
];
let success = 0, fail = 0;
for (const post of posts) {
  const { error } = await supabase.from("mysticai_blog_posts").upsert(post, { onConflict: "slug" });
  if (error) { console.error(`FAIL [${post.slug}]:`, error.message); fail++; }
  else { console.log(`OK   [${post.slug}]`); success++; }
}
console.log(`\nDone: ${success} success, ${fail} fail`);
