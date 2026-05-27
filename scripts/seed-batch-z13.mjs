import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);
const posts = [
  {
    slug: "mbti-infj-love-patterns-analysis",
    title: "INFJ in Love — Complete Relationship Patterns, Needs & Best Matches",
    category: "mbti",
    published_at: new Date().toISOString(),
    content: `<article><h1>INFJ in Love — Complete Relationship Patterns, Needs & Best Matches</h1>
<p>INFJ is the rarest of the 16 MBTI types and one of the most complex in relationships. Understanding how INFJs love, what they need, and where they struggle can transform both self-understanding and relationship quality.</p>
<h2>How INFJs Love</h2>
<p>INFJs love with their entire being — selectively but completely. They don't enter relationships casually; when they commit, they are fully present and deeply invested. They bring extraordinary emotional intelligence, intuitive understanding of their partner, and a quality of connection that feels unlike any other.</p>
<h2>What INFJs Need in Relationships</h2>
<ul>
<li><strong>Depth over breadth:</strong> Intellectual and emotional depth is non-negotiable. Surface-level interaction quickly drains them.</li>
<li><strong>Trust and authenticity:</strong> Must feel safe to express their true self, which they rarely show the world.</li>
<li><strong>Alone time:</strong> Regular solitude is not rejection — it's essential recharging.</li>
<li><strong>Shared values:</strong> Long-term compatibility requires alignment on the things that matter most.</li>
<li><strong>Growth orientation:</strong> Partners who stagnate frustrate INFJs' constant drive toward meaning and evolution.</li>
</ul>
<h2>The INFJ Door Slam</h2>
<p>INFJs are known for the "door slam" — a sudden, complete emotional withdrawal when they feel repeatedly violated, dismissed, or drained by a person. It appears sudden from the outside but is actually the culmination of many ignored warnings. Once the door is closed, it rarely reopens.</p>
<h2>Best MBTI Matches for INFJ</h2>
<p><strong>ENTP:</strong> The INFJ's most classic match — the Extraverted Intuitive Thinking Perceiver challenges INFJ's thinking while sharing the depth of intuitive connection. Dynamic, stimulating, and often deeply bonded.</p>
<p><strong>ENFP:</strong> Another intuitive match with warmth and creativity. ENFP's enthusiasm for life balances INFJ's tendency toward solemnity.</p>
<p><strong>INTJ:</strong> Deep intellectual and intuitive resonance. Both value privacy, depth, and long-term thinking. Can be intensely bonded or mutually withdrawn.</p>
<h2>Common Relationship Challenges for INFJs</h2>
<p>Over-giving until depleted, absorbing partner's emotional pain as their own, difficulty expressing their own needs clearly, and perfectionist expectations of what love "should" feel like.</p>
</article>`
  },
  {
    slug: "mbti-enfp-love-patterns-analysis",
    title: "ENFP in Love — The Enthusiastic Idealist's Relationship Guide",
    category: "mbti",
    published_at: new Date().toISOString(),
    content: `<article><h1>ENFP in Love — The Enthusiastic Idealist's Relationship Guide</h1>
<p>ENFPs in love are warm, passionate, and intensely devoted — they bring creativity, depth, and infectious enthusiasm to relationships. But they also face specific challenges that, if unaddressed, can derail the very connections they crave.</p>
<h2>How ENFPs Love</h2>
<p>ENFPs fall in love with possibility — the person as they are AND the person they could become. They love with their imagination as much as their heart, often seeing potential in partners that those partners haven't yet seen in themselves. Their love is demonstrative, enthusiastic, and deeply sincere.</p>
<h2>What ENFPs Need</h2>
<ul>
<li><strong>Freedom and spontaneity:</strong> Routine and rigid schedules suffocate ENFPs. They need space for improvisation and adventure.</li>
<li><strong>Emotional depth:</strong> Despite their extroversion, ENFPs crave genuine emotional intimacy.</li>
<li><strong>To be truly seen:</strong> ENFPs often feel misunderstood — a partner who genuinely sees their complexity is invaluable.</li>
<li><strong>Intellectual stimulation:</strong> Conversation that goes beyond the surface is vital.</li>
<li><strong>Independence within togetherness:</strong> They need to maintain their own identity, friendships, and projects even in deep partnership.</li>
</ul>
<h2>ENFP's Relationship Challenges</h2>
<p>Idealization of partners (then disillusionment when the ideal proves imperfect), difficulty with commitment before the right person arrives, scattered attention across many connections, and avoidance of conflict despite having strong feelings about it.</p>
<h2>Best MBTI Matches for ENFP</h2>
<p><strong>INTJ:</strong> The golden pair — INTJ's focused depth grounds ENFP's expansive vision while ENFP brings warmth and spontaneity to INTJ's structured world.<br>
<strong>INFJ:</strong> Shares deep values and intuitive connection with complementary function stacking.<br>
<strong>ENFJ:</strong> High energy match with shared warmth and idealism.</p>
</article>`
  },
  {
    slug: "mbti-intj-love-patterns-analysis",
    title: "INTJ in Love — The Architect's Complete Relationship Manual",
    category: "mbti",
    published_at: new Date().toISOString(),
    content: `<article><h1>INTJ in Love — The Architect's Complete Relationship Manual</h1>
<p>INTJs are among the most misunderstood types in relationships. Their deep capacity for love is real — but it operates in ways that look nothing like conventional romance. Understanding the INTJ's relationship world unlocks genuine connection with this rare, fascinating type.</p>
<h2>How INTJs Love</h2>
<p>INTJs don't fall in love easily or quickly. They are strategic and selective — choosing a partner the way they'd approach any significant life decision: with analysis, patience, and high standards. But once they've committed, their devotion is fierce and enduring. They will invest significant energy in a relationship they believe in.</p>
<h2>Signs an INTJ Is in Love</h2>
<ul>
<li>They make time for you (INTJs guard their time ruthlessly — time given is love expressed)</li>
<li>They share their actual opinions and inner world (rare — most people only see the surface)</li>
<li>They plan for a future with you</li>
<li>They become protective and quietly competitive about your attention</li>
<li>They'll study what makes you happy and implement it systematically</li>
</ul>
<h2>What INTJs Need in Relationships</h2>
<p>Intellectual respect (they cannot be with someone they don't deeply respect mentally), independence and autonomy, directness (games and manipulation create immediate distance), and genuine growth partnership.</p>
<h2>Best MBTI Matches for INTJ</h2>
<p><strong>ENFP:</strong> The most commonly cited golden pair. ENFP's warmth and intuitive playfulness awakens INTJ's heart while INTJ provides the depth and direction ENFP needs.<br>
<strong>ENTP:</strong> Similar cognitive function stack. Fierce intellectual connection and stimulating arguments that both find deeply bonding.<br>
<strong>INFJ:</strong> Deeply compatible intuitive and introverted pairing.</p>
</article>`
  },
  {
    slug: "mbti-entp-love-patterns-analysis",
    title: "ENTP in Love — How the Debater Loves and What They Need",
    category: "mbti",
    published_at: new Date().toISOString(),
    content: `<article><h1>ENTP in Love — How the Debater Loves and What They Need</h1>
    <p>ENTPs bring intellectual fireworks, unconventional perspectives, and deep curiosity to their relationships. They're not the easiest partners — but they're never boring, and their devotion, once earned, runs deep.</p>
<h2>How ENTPs Love</h2>
<p>ENTPs love through ideas, playful challenge, and genuine fascination with who their partner is at their core. They'll debate with you, brainstorm with you, build wild plans with you, and stretch your thinking in ways you didn't expect. Their love language is intellectual engagement — when they stop challenging you, they may have stopped caring.</p>
<h2>What ENTPs Need in Love</h2>
<ul>
<li><strong>Intellectual equal:</strong> Someone who can match them mentally and doesn't shrink under debate.</li>
<li><strong>Freedom of thought:</strong> They cannot be with someone dogmatic or close-minded.</li>
<li><strong>No stagnation:</strong> Relationships must evolve, grow, and keep offering new terrain to explore.</li>
<li><strong>Genuine emotional depth:</strong> Despite extroverted thinking dominance, ENTPs have deep Ni-Fe feeling that needs expression.</li>
</ul>
<h2>ENTP's Relationship Challenges</h2>
<p>Can argue for argument's sake and hurt feelings without realizing it. Commitment anxiety — analysis paralysis about whether this is truly "the one." Tendency to intellectualize emotion rather than feeling it. Follow-through deficits in the domestic/practical aspects of partnership.</p>
<h2>Best Matches for ENTP</h2>
<p><strong>INFJ:</strong> Classic ENTP goldilocks match. INFJ's depth and warmth reaches the ENTP's heart; ENTP's intellectual energy excites INFJ's Ni visions.<br>
<strong>INTJ:</strong> Powerhouse intellectual pairing. Fewer emotional fireworks but deep respect and fascinating discourse.<br>
<strong>ENFJ:</strong> ENTP's warmth function activated; ENFJ brings emotional intelligence to balance ENTP's logic-dominance.</p>
</article>`
  },
  {
    slug: "mbti-infp-love-patterns-analysis",
    title: "INFP in Love — The Romantic Idealist's Complete Relationship Guide",
    category: "mbti",
    published_at: new Date().toISOString(),
    content: `<article><h1>INFP in Love — The Romantic Idealist's Complete Relationship Guide</h1>
<p>INFPs may be the most romantically idealistic of all types. They carry within them a vision of love so beautiful and profound that real relationships sometimes struggle to match it — but when they find their match, the connection is extraordinary.</p>
<h2>How INFPs Love</h2>
<p>INFPs love with their entire soul. They search for the person who truly sees and accepts them — the full, complex, private inner world they share with almost no one. When an INFP lets you in, you receive a rare gift: complete, unconditional, poetic love.</p>
<h2>What INFPs Need in Relationships</h2>
<ul>
<li><strong>Authenticity:</strong> Anything performative or dishonest repels them deeply.</li>
<li><strong>Deep acceptance:</strong> They need to feel seen and loved in their fullest, most vulnerable self.</li>
<li><strong>Shared values:</strong> Without this foundation, no amount of chemistry sustains long-term.</li>
<li><strong>Space for their interior life:</strong> Creative expression, daydreaming, and inner journey time must be honored.</li>
<li><strong>Gentleness:</strong> INFPs bruise easily — harshness, even if loving, lands hard.</li>
</ul>
<h2>INFP's Relationship Challenges</h2>
<p>Excessive idealization followed by disappointment when reality doesn't match the vision. Difficulty expressing needs directly — assuming the right partner "should just know." Avoidance of necessary conflict in favor of peacekeeping until resentment builds.</p>
<h2>Best MBTI Matches for INFP</h2>
<p><strong>ENFJ:</strong> ENFJ's warmth, emotional attunement, and gentle affirmation meets INFP's deepest needs.<br>
<strong>ENTJ:</strong> Surprising but potent — ENTJ's direct strength creates safety for INFP's vulnerability when the ENTJ is emotionally mature.<br>
<strong>INFJ:</strong> Deep values alignment and shared introversion creates profound understanding.</p>
</article>`
  },
  {
    slug: "mbti-istj-love-patterns-analysis",
    title: "ISTJ in Love — The Reliable Partner's Complete Relationship Guide",
    category: "mbti",
    published_at: new Date().toISOString(),
    content: `<article><h1>ISTJ in Love — The Reliable Partner's Complete Relationship Guide</h1>
<p>ISTJs may not win awards for the most demonstrative romantic type, but they are arguably one of the most dependable and genuinely committed partners in the entire MBTI spectrum. Understanding how ISTJs love helps you value what they bring.</p>
<h2>How ISTJs Love</h2>
<p>ISTJs love through actions more than words. They show up consistently, fulfill commitments, provide stability, and build a life that works. Their love is built in the unglamorous moments — the bills paid, the promises kept, the quiet consistency that allows life to function and flourish.</p>
<h2>What ISTJs Need in Relationships</h2>
<ul>
<li><strong>Reliability:</strong> They give loyalty and need it returned; unpredictability is deeply unsettling.</li>
<li><strong>Respect for tradition:</strong> ISTJs honor established ways of doing things; partners must respect rather than constantly critique this.</li>
<li><strong>Clear communication:</strong> Hints and subtle emotional expressions confuse ISTJs — direct honesty serves them far better.</li>
<li><strong>Appreciation:</strong> Their service-based love language needs to be noticed and valued explicitly.</li>
</ul>
<h2>ISTJ in Conflict</h2>
<p>ISTJs avoid emotional confrontation and may bottle feelings until they explode. Learning to express concerns in real-time rather than accumulating them is important growth work.</p>
<h2>Best Matches for ISTJ</h2>
<p><strong>ESFP:</strong> ESFP brings warmth and spontaneity to ISTJ's structured life; ISTJ provides the stability ESFP craves beneath their free spirit.<br>
<strong>ESTP:</strong> Shared sensing focus with complementary thinking/feeling balance.<br>
<strong>ISFJ:</strong> Values alignment and shared commitment to duty and family.</p>
</article>`
  },
  {
    slug: "mbti-entj-love-patterns-analysis",
    title: "ENTJ in Love — The Commander's Relationship Guide and Love Language",
    category: "mbti",
    published_at: new Date().toISOString(),
    content: `<article><h1>ENTJ in Love — The Commander's Relationship Guide and Love Language</h1>
<p>ENTJs bring their full intensity, ambition, and capability to romantic relationships — making them powerful partners who inspire growth, but also challenging ones who must learn to prioritize the heart as well as the head.</p>
<h2>How ENTJs Love</h2>
<p>ENTJs are direct about love — if they're interested, they pursue with focus and determination. They love by creating an extraordinary life: planning the future, building success together, and positioning their partner for maximum growth and achievement. They're not subtle, and they're not passive.</p>
<h2>What ENTJs Need</h2>
<ul>
<li><strong>An equal partner:</strong> They need someone they genuinely respect — intellectually, professionally, personally. They cannot be with someone they see as beneath them.</li>
<li><strong>Space for leadership:</strong> While they can share power, they need their drive respected rather than diminished.</li>
<li><strong>Directness:</strong> Passive behavior frustrates ENTJs enormously. Say what you mean.</li>
<li><strong>Growth partnership:</strong> A partner who is complacent becomes a partner the ENTJ leaves behind.</li>
</ul>
<h2>ENTJ's Relationship Blindspots</h2>
<p>Bulldozing partner's emotions in pursuit of solutions. Treating emotional needs as problems to fix. Working so much that the relationship gets minimum viable attention. Learning to slow down for emotional presence is ENTJ's primary relationship growth edge.</p>
<h2>Best Matches for ENTJ</h2>
<p><strong>INFP:</strong> INFP's deep values and gentle emotional wisdom reaches what ENTJ's armor protects. Deeply complementary when both are mature.<br>
<strong>INTP:</strong> Intellectual powerhouse pairing. Mutual respect and stimulation.<br>
<strong>ENFP:</strong> ENFP's warmth and vision complements ENTJ's strategy and drive.</p>
</article>`
  },
  {
    slug: "mbti-isfj-love-patterns-analysis",
    title: "ISFJ in Love — The Nurturer's Complete Relationship Guide",
    category: "mbti",
    published_at: new Date().toISOString(),
    content: `<article><h1>ISFJ in Love — The Nurturer's Complete Relationship Guide</h1>
<p>ISFJs are among the most quietly devoted and caring partners in the MBTI spectrum. They love through service, memory, and attentive presence — and they need a partner who truly appreciates the extraordinary care they bring.</p>
<h2>How ISFJs Love</h2>
<p>ISFJs love by remembering — your favorite foods, your childhood stories, the anniversary of significant moments, what you need before you ask. Their love is detailed, attentive, and expressed through acts of care that accumulate into a profound and sustaining bond.</p>
<h2>What ISFJs Need in Relationships</h2>
<ul>
<li><strong>Appreciation and recognition:</strong> They give so much that invisibility wounds deeply. Explicit appreciation is essential.</li>
<li><strong>Stability and security:</strong> Unpredictable environments and partners create anxiety.</li>
<li><strong>Traditional expressions of love:</strong> Thoughtful gestures, remembering important dates, consistent check-ins.</li>
<li><strong>A partner who reciprocates care:</strong> ISFJs need to receive as well as give — learning to ask for this is key growth.</li>
</ul>
<h2>ISFJ's Relationship Challenges</h2>
<p>Martyr pattern — giving everything and expecting the partner to intuit the need for reciprocation, then resentment when it doesn't come. Conflict avoidance that allows problems to fester. Difficulty distinguishing what they genuinely want from what they think they "should" want.</p>
<h2>Best Matches for ISFJ</h2>
<p><strong>ESFP:</strong> ESFP's warmth and spontaneity brings ISFJ joy while ISFJ grounds ESFP with care and stability.<br>
<strong>ESTP:</strong> Complementary and energizing pairing.<br>
<strong>ISTJ:</strong> Deep values alignment and mutual commitment to responsibility and family.</p>
</article>`
  },
  {
    slug: "mbti-estp-love-patterns-analysis",
    title: "ESTP in Love — The Entrepreneur's Relationship Style and Best Matches",
    category: "mbti",
    published_at: new Date().toISOString(),
    content: `<article><h1>ESTP in Love — The Entrepreneur's Relationship Style and Best Matches</h1>
<p>ESTPs bring electricity to relationships — bold, spontaneous, physically present, and genuinely exciting. Understanding how ESTPs love and what they need helps build connections that can sustain beyond the initial thrilling energy.</p>
<h2>How ESTPs Love</h2>
<p>ESTPs love in the present moment — fully, physically, and with great intensity. They show up with action: planning adventures, being physically affectionate, solving problems immediately, and making the person they love feel completely alive. They don't talk about love as much as they demonstrate it through presence and action.</p>
<h2>What ESTPs Need</h2>
<ul>
<li><strong>Freedom and adventure:</strong> Constrained ESTPs are unhappy ESTPs. They need active lives.</li>
<li><strong>Physical connection:</strong> Touch, activity, and shared physical experiences are primary love languages.</li>
<li><strong>Respect for their practical wisdom:</strong> ESTPs are often underestimated intellectually; they bring keen situational intelligence.</li>
<li><strong>A partner who doesn't over-analyze:</strong> Excessive emotional processing or abstract debates exhaust them.</li>
</ul>
<h2>ESTP's Relationship Challenges</h2>
<p>Commitment anxiety — enjoying the excitement of new but struggling with long-term depth. Emotional avoidance (feelings can be processed through action, which misses the point). Missing the slow build of deep intimacy because they're always moving to the next experience.</p>
<h2>Best Matches for ESTP</h2>
<p><strong>ISFJ:</strong> ISFJ's warmth and stability grounds ESTP while ESTP brings adventure and spontaneity to ISFJ's life.<br>
<strong>ISTJ:</strong> Shared sensing with complementary thinking function.<br>
<strong>ESFJ:</strong> High social energy shared with emotional warmth from ESFJ balancing ESTP's logic.</p>
</article>`
  },
  {
    slug: "mbti-intp-love-patterns-analysis",
    title: "INTP in Love — How the Logician Loves and What They Truly Need",
    category: "mbti",
    published_at: new Date().toISOString(),
    content: `<article><h1>INTP in Love — How the Logician Loves and What They Truly Need</h1>
<p>INTPs in love are one of the most underappreciated romantic types. Their love is real, deep, and loyal — but it operates in a register that many people miss because it doesn't look like conventional romance. When you understand how an INTP loves, you discover something genuinely remarkable.</p>
<h2>How INTPs Love</h2>
<p>INTPs love through intellectual sharing and loyal presence. When an INTP is in love, they want to share every fascinating thought with you, understand how you think, and build an intellectual world together. They show love by thinking about you — working on problems in your life, crafting solutions, showing up when it counts even if their communication style is sparse.</p>
<h2>What INTPs Need</h2>
<ul>
<li><strong>Intellectual stimulation:</strong> This is non-negotiable. A partner who engages their mind is the most attractive thing possible.</li>
<li><strong>Space and autonomy:</strong> They need time alone with their thoughts; partnership cannot mean constant togetherness.</li>
<li><strong>Low-drama environment:</strong> Emotional explosions are deeply dysregulating for INTPs.</li>
<li><strong>Patience with communication:</strong> They are not naturally expressive emotionally and need partners who don't interpret this as absence of feeling.</li>
</ul>
<h2>INTP's Relationship Challenges</h2>
<p>Appearing cold when they are actually deeply engaged. Analysis paralysis about commitment. Forgetting that their partner needs emotional check-ins even when everything "seems fine." Being so in their head that they miss subtle relationship signals until they've accumulated.</p>
<h2>Best Matches for INTP</h2>
<p><strong>ENTJ:</strong> ENTJ's decisive action and directness complement INTP's thoughtful analysis; both prize intellectual excellence.<br>
<strong>ENFJ:</strong> ENFJ brings the emotional warmth and social grace that INTP genuinely needs but struggles to cultivate alone.<br>
<strong>INTJ:</strong> Deep intellectual alignment with mutual respect for autonomy.</p>
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
