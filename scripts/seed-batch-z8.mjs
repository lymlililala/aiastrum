import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);
const posts = [
  {
    slug: "tarot-reading-after-breakup-healing",
    title: "Tarot After a Breakup — Cards That Reveal Your Healing Path",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>Tarot After a Breakup — Cards That Reveal Your Healing Path</h1>
<p>Heartbreak is one of the most painful human experiences. Tarot can't undo a breakup, but it can help you process the grief, understand what happened, and illuminate the path forward. Here's how to use tarot for post-breakup healing.</p>
<h2>The Best Spread for Breakup Healing</h2>
<p>Use a 5-card spread: 1) What happened / the lesson, 2) What I'm feeling now, 3) What I need to release, 4) What I need to embrace, 5) What comes next in my journey.</p>
<h2>Cards That Appear Most After Breakups</h2>
<h3>The Three of Swords</h3>
<p>The classic heartbreak card — three swords piercing a heart. When this appears, tarot is acknowledging your pain is real and valid. Don't rush past this feeling; it needs to be honored before it can heal.</p>
<h3>The Moon</h3>
<p>The Moon after a breakup signals confusion, illusions being shattered, and the need to face what you were avoiding. Something wasn't as it appeared. Trust your intuition about what the relationship truly was.</p>
<h3>The Hermit</h3>
<p>A powerful healing card — The Hermit calls you inward. Solitude is necessary. This is your time to reconnect with yourself, your values, and who you are outside of the relationship.</p>
<h3>Death (Major Arcana)</h3>
<p>Transformation, not literal death. This relationship or this version of you has ended. Death in tarot is a gateway, not a terminus. Something new is gestating even in the darkness.</p>
<h3>The Star</h3>
<p>Hope after devastation. When The Star appears, healing is underway, and a better path is illuminating. Hold on — the worst is passing.</p>
<h2>Questions to Ask Your Deck</h2>
<ul>
<li>"What lesson does this breakup hold for me?"</li>
<li>"What part of myself do I need to reclaim?"</li>
<li>"What am I moving toward?"</li>
</ul>
<h2>What Not to Ask</h2>
<p>Avoid: "Will we get back together?" in the immediate aftermath. Your energy is too raw for clarity, and this question keeps you stuck looking backward. Give yourself 30 days before consulting tarot on reconciliation.</p>
</article>`
  },
  {
    slug: "tarot-reading-secret-crush-does-he-like-me",
    title: "Tarot for Your Secret Crush — Does He (or She) Like You Back?",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>Tarot for Your Secret Crush — Does He (or She) Like You Back?</h1>
    <p>That fluttery nervous excitement of a secret crush is delightful and agonizing in equal measure. Tarot won't give you a definitive yes or no (free will is real!), but it can reveal the energy between you and give your intuition something solid to work with.</p>
<h2>The 3-Card Crush Spread</h2>
<p><strong>Card 1:</strong> How your crush currently feels about you<br>
<strong>Card 2:</strong> The energy or potential between you<br>
<strong>Card 3:</strong> What to do next</p>
<h2>Positive Signs — Cards That Suggest Mutual Interest</h2>
<h3>The Lovers</h3>
<p>The most obvious positive sign. A choice is being made here, and love (or at least strong attraction) is in the picture. This is a good omen for mutual feelings.</p>
<h3>Ace of Cups</h3>
<p>New emotional beginning — feelings are fresh and just beginning to bloom. This person may not have fully acknowledged their feelings yet, but the potential for love is very much present.</p>
<h3>Two of Cups</h3>
<p>The perfect partnership card. Two cups meeting implies mutual recognition — you see each other, and there's something real here worth exploring.</p>
<h3>Knight of Cups</h3>
<p>Someone coming toward you with romance on their mind. If this represents your crush, they are thinking about you romantically and may soon make a move.</p>
<h2>Cards That Suggest Caution</h2>
<h3>Seven of Cups</h3>
<p>Your crush may be confused, idealistic, or seeing what they want to see rather than what's real. Make sure you're also seeing them clearly.</p>
<h3>Page of Swords</h3>
<p>Watch and wait — gather more information before acting. The situation isn't clear yet.</p>
<h2>What to Do With This Reading</h2>
<p>Tarot reflects possibilities, not certainties. If the reading is positive, let it boost your confidence to be a bit more open or accessible to your crush. Connection requires vulnerability from both sides.</p>
</article>`
  },
  {
    slug: "tarot-reading-love-triangle-guidance",
    title: "Tarot for a Love Triangle — Cards That Help You Navigate Impossible Choices",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>Tarot for a Love Triangle — Cards That Help You Navigate Impossible Choices</h1>
<p>Love triangles are among the most emotionally complex situations a person can face. Whether you're the one caught between two people, or you're the person outside looking in, tarot can provide remarkable clarity on what each connection truly means.</p>
<h2>The Love Triangle Tarot Spread (5 Cards)</h2>
<p>Card 1: What Person A truly represents to you<br>
Card 2: What Person B truly represents to you<br>
Card 3: The core issue or lesson this situation holds<br>
Card 4: What your heart actually needs (separate from your mind)<br>
Card 5: The path that serves your highest good</p>
<h2>Key Cards in Love Triangle Readings</h2>
<h3>The Two of Swords</h3>
<p>Indecision personified. You are avoiding looking at what you already know. The blindfold needs to come off. This card often appears when someone already knows the answer but is afraid to choose.</p>
<h3>The Tower</h3>
<p>The situation is not sustainable. A revelation or disruption is coming regardless of what you do. The Tower encourages you to be the one who dismantles what isn't working rather than waiting for it to fall apart around you.</p>
<h3>The Seven of Swords</h3>
<p>Deception is present somewhere in this triangle — perhaps from one of the parties, perhaps in what you're telling yourself about the situation. Honesty, especially with yourself, is essential.</p>
<h3>The High Priestess</h3>
<p>Your deep intuition already knows the truth. This card asks you to stop seeking external guidance and trust what you've known all along. Sit quietly and listen to the answer within.</p>
<h2>Healing Guidance</h2>
<p>Love triangles often reveal something important about your unmet needs. Both connections may represent different parts of yourself seeking expression. True resolution requires self-knowledge, not just a choice between two people.</p>
</article>`
  },
  {
    slug: "tarot-long-distance-relationship-guidance",
    title: "Tarot for Long-Distance Relationships — Will the Distance End? Will Love Survive?",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>Tarot for Long-Distance Relationships — Will the Distance End? Will Love Survive?</h1>
<p>Long-distance relationships require extraordinary trust, communication, and faith. Tarot can help you check in on the health of your connection, identify areas needing attention, and gain hope when doubt creeps in.</p>
<h2>The LDR Check-In Spread (6 Cards)</h2>
<p>Card 1: Current state of your partner's feelings<br>
Card 2: Current state of your feelings<br>
Card 3: What is currently supporting the relationship<br>
Card 4: What is currently challenging the relationship<br>
Card 5: What the relationship most needs right now<br>
Card 6: The near-future energy around the distance ending</p>
<h2>Positive Cards for LDR Readings</h2>
<h3>The Star</h3>
<p>Faith and hope are sustained. The distance is temporary. Keep going — this card assures you the reunion is coming.</p>
<h3>Six of Cups</h3>
<p>Nostalgia and genuine emotional warmth. You share something deeply meaningful. The history and feeling between you is real and precious.</p>
<h3>Ten of Pentacles</h3>
<p>Long-term stability and permanence. This card in an LDR reading suggests the relationship has strong foundations for a shared future. A permanent reunion is in the energy.</p>
<h2>Challenging Cards to Watch</h2>
<h3>Eight of Cups</h3>
<p>Someone is emotionally withdrawing. This isn't necessarily the end, but there's an emotional drift that needs addressing before it widens into a permanent separation.</p>
<h3>Five of Cups</h3>
<p>Focus on loss rather than what remains. Resentment or grief about the situation is coloring the connection. Shift attention to what you still have.</p>
<h2>Communication Advice From Tarot</h2>
<p>Regular, honest, vulnerable communication is the lifeblood of long-distance relationships. If tarot reveals tension, use it as an invitation to have a real conversation — not as evidence the relationship is failing.</p>
</article>`
  },
  {
    slug: "tarot-marriage-timing-when-will-i-marry",
    title: "Tarot: When Will I Get Married? — Cards That Signal Marriage Timing",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>Tarot: When Will I Get Married? — Cards That Signal Marriage Timing</h1>
<p>"When will I get married?" is one of the most commonly asked tarot questions. While tarot cannot give you a precise calendar date, it can reveal the energetic timing, the conditions needed, and what might be in the way of marriage.</p>
<h2>Timing in Tarot — How Does It Work?</h2>
<p>Tarot timing is more energetic than chronological. Some readers use seasons (Wands = spring/summer, Cups = autumn, Swords = winter, Pentacles = year-round/slow). Others read speed from the cards themselves — court cards and aces often signal faster movement.</p>
<h2>Marriage-Energy Cards</h2>
<h3>Four of Wands</h3>
<p>The traditional marriage celebration card. When this appears in a timing spread, it often signals a commitment ceremony or celebration is in the relatively near future. This is the most direct "wedding energy" card in the deck.</p>
<h3>The Hierophant</h3>
<p>Formal commitment, tradition, and institution. Marriage as a formal, traditional bond is strongly suggested here.</p>
<h3>Ace of Cups</h3>
<p>A new emotional beginning — often signals a relationship entering a new phase. Could signal engagement energy more than the wedding itself.</p>
<h3>Ten of Cups</h3>
<p>The ultimate happy family card. This signals arrival at the dream — complete emotional fulfillment, often including a committed family structure. Marriage is very much in this energy.</p>
<h2>Cards That Suggest Delays</h2>
<h3>The Hanged Man</h3>
<p>A waiting period is necessary. Something needs to shift internally before marriage is possible. This is not a "no" — it's a "not yet, for good reason."</p>
<h3>Seven of Cups</h3>
<p>Confusion and idealization. You or your partner may not yet have clarity about what you truly want in a life partner.</p>
<h2>What to Focus On</h2>
<p>Rather than "when" — ask tarot "what do I need to address to be ready for marriage?" The quality of your inner readiness affects timing more than any external force.</p>
</article>`
  },
  {
    slug: "tarot-ex-coming-back-signs",
    title: "Tarot Signs Your Ex Is Coming Back — 7 Cards That Show Reconnection Energy",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>Tarot Signs Your Ex Is Coming Back — 7 Cards That Show Reconnection Energy</h1>
<p>One of the most common tarot questions is "will my ex come back?" While tarot reflects energy and possibility rather than certainty, certain cards do carry strong reconnection and return energy.</p>
<h2>Important Caveat First</h2>
<p>Before reading, ask yourself: should they come back? Sometimes the cards that suggest return energy are also asking you to examine whether reconciliation serves your highest good. Both questions matter.</p>
<h2>7 Cards That Signal Reconnection Energy</h2>
<h3>1. The Wheel of Fortune</h3>
<p>Cycles turning, what was separated coming back around. This card strongly suggests that a situation that ended is not permanently finished — the wheel turns and people return.</p>
<h3>2. Judgment</h3>
<p>A calling back, a second chance, a resurrection. Judgment often indicates that someone from the past will re-enter your life for a reason connected to soul growth.</p>
<h3>3. Six of Cups</h3>
<p>The nostalgia card — someone is reminiscing and feeling pulled back to the past. Your ex may be thinking of you with warmth and longing for what was shared.</p>
<h3>4. The Moon (Reversed)</h3>
<p>Clarity returning after confusion. Something hidden is revealed — your ex may finally see what they lost and feel ready to face what they've been avoiding.</p>
<h3>5. Ace of Cups</h3>
<p>A new emotional beginning with someone — this could mean a fresh start with your ex rather than a new person entirely.</p>
<h3>6. Two of Cups</h3>
<p>Mutual recognition and connection. If this appears when asking about an ex, there's genuine emotional resonance still present on both sides.</p>
<h3>7. Knight of Cups</h3>
<p>Someone coming toward you with a romantic proposal or emotional declaration. A direct approach is imminent.</p>
<h2>Cards That Suggest Moving Forward Instead</h2>
<p>Death (upright), Eight of Cups, Three of Swords (upright) — these suggest the ending is complete and your energy is better directed toward new beginnings.</p>
</article>`
  },
  {
    slug: "tarot-new-relationship-potential",
    title: "Tarot for New Relationships — Cards That Show if It's Worth Pursuing",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>Tarot for New Relationships — Cards That Show if It's Worth Pursuing</h1>
<p>The excitement and uncertainty of a new romantic connection can be both thrilling and overwhelming. Tarot can provide an energetic snapshot of the potential and the cautions in a new relationship.</p>
<h2>The New Relationship Assessment Spread (4 Cards)</h2>
<p>Card 1: The energy this person brings to your life<br>
Card 2: What this connection is here to teach you<br>
Card 3: A potential challenge or caution to be aware of<br>
Card 4: The overall potential of this connection</p>
<h2>Highly Auspicious Cards for New Relationships</h2>
<h3>Ace of Wands + Ace of Cups Together</h3>
<p>Fire meets water — passionate attraction with genuine emotional depth. This combination suggests a connection with both exciting chemistry and real emotional substance.</p>
<h3>The Sun</h3>
<p>Joy, warmth, and genuine happiness. This relationship brings light into your life and has positive, life-affirming energy.</p>
<h3>Six of Wands</h3>
<p>You feel celebrated and seen by this person. They recognize your worth and make you feel successful in love.</p>
<h2>Caution Cards Worth Noting</h2>
<h3>Five of Pentacles</h3>
<p>Someone may be coming from a place of lack or need. Is this connection based on genuine love or an attempt to fill a void?</p>
<h3>Nine of Swords</h3>
<p>Anxiety and mental anguish — this connection may be triggering something deep. Look at what fears are coming up and whether they're new or patterns being repeated.</p>
<h2>The Most Important Question</h2>
<p>"How do I feel in my body when I'm with this person?" Physical and energetic signals often tell you more than any tarot card. Use the cards to confirm or illuminate what your gut is already sensing.</p>
</article>`
  },
  {
    slug: "tarot-self-love-reading-guide",
    title: "Tarot for Self-Love — A Complete Reading Guide for Inner Healing",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>Tarot for Self-Love — A Complete Reading Guide for Inner Healing</h1>
<p>The most important relationship you'll ever have is the one with yourself. Tarot can be a powerful mirror for self-understanding, self-compassion, and building the foundation of genuine self-love.</p>
<h2>The Self-Love Tarot Spread (6 Cards)</h2>
<p>Card 1: How I currently see myself<br>
Card 2: How others truly see me (often more positive than we think)<br>
Card 3: My greatest strength that I might be overlooking<br>
Card 4: A block or wound that is limiting self-love<br>
Card 5: What I need to release to love myself more fully<br>
Card 6: A message from my highest self</p>
<h2>Self-Love Empowerment Cards</h2>
<h3>The High Priestess</h3>
<p>Deep inner knowing and trust in yourself. Your intuition is reliable — honor your inner authority rather than constantly seeking external validation.</p>
<h3>The Empress</h3>
<p>Abundance, fertility, and self-nurturing. The Empress asks you to care for your body, appreciate beauty, and treat yourself with the same tenderness you show others.</p>
<h3>Strength</h3>
<p>Gentle inner power. True strength isn't force but patient mastery of your inner world. You are stronger than you know.</p>
<h3>Queen of Cups</h3>
<p>Emotional intelligence and compassionate boundaries. This queen loves deeply while also honoring her own emotional needs — a model for healthy self-love.</p>
<h2>Working With Difficult Cards</h2>
<p>When challenging cards appear (Five of Pentacles, Nine of Swords), treat them as areas of the self asking for extra compassion rather than evidence of failure. All parts of you deserve love, especially the struggling parts.</p>
<h2>A Daily Self-Love Practice</h2>
<p>Pull one card each morning and ask: "How can I love myself better through this energy today?" Journal for 5 minutes on what comes up. This practice transforms your relationship with yourself over time.</p>
</article>`
  },
  {
    slug: "tarot-toxic-relationship-warning-cards",
    title: "7 Tarot Cards That Warn You About Toxic Relationships",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>7 Tarot Cards That Warn You About Toxic Relationships</h1>
<p>Sometimes the most loving thing tarot can do is warn you. These seven cards frequently appear when a relationship has toxic patterns that are harming your wellbeing — even when love is genuinely present.</p>
<h2>Why Tarot Warning Cards Are Gifts</h2>
<p>A challenging card in a love reading isn't tarot being cruel — it's your higher self showing you what needs attention before the situation causes deeper harm. These cards are invitations to course-correct, not verdicts of doom.</p>
<h2>The 7 Warning Cards</h2>
<h3>1. The Devil</h3>
<p>The definitive toxic relationship card. Chains, bondage, and compulsive attachment. The Devil asks: are you staying because you truly want to, or because you feel unable to leave? Codependency, addiction, and power imbalances live here.</p>
<h3>2. Three of Swords</h3>
<p>Heartbreak that is ongoing rather than healing. If this card keeps appearing in readings about the same relationship, the pain is chronic and the wound is not healing within the connection.</p>
<h3>3. Ten of Swords</h3>
<p>Complete defeat and painful ending. Dramatically positioned, but its message is clear: this situation has run its course and continuing is causing unnecessary suffering.</p>
<h3>4. Seven of Swords</h3>
<p>Deception, betrayal, and taking what isn't rightfully yours. Someone (possibly your partner, possibly you) is being dishonest in this relationship.</p>
<h3>5. Five of Pentacles</h3>
<p>Being left out in the cold — emotionally or materially neglected within the relationship. You deserve more than you're receiving.</p>
<h3>6. Page of Swords (Reversed)</h3>
<p>Manipulation through words, gaslighting, or using information against you. Watch what's being communicated and how.</p>
<h3>7. Moon (Upright, Repeatedly)</h3>
<p>Ongoing illusion — something fundamental about this relationship isn't as it appears. Fear and confusion are dominant energies. Clarity is being blocked.</p>
<h2>What to Do With These Readings</h2>
<p>Seek support — a counselor, trusted friend, or domestic violence resource if needed. Tarot reveals; healing requires action and human connection.</p>
</article>`
  },
  {
    slug: "tarot-soulmate-vs-karmic-connection",
    title: "Tarot: Soulmate vs Karmic Connection — How to Tell the Difference",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article><h1>Tarot: Soulmate vs Karmic Connection — How to Tell the Difference</h1>
<p>Not all intense relationships are soulmate connections. Some are karmic — powerful, transformative, and ultimately meant to teach and release rather than stay. Tarot can help you understand which type of connection you're in.</p>
<h2>Defining the Difference</h2>
<p><strong>Soulmate connections</strong> feel like coming home — comfortable, expansive, supportive. They challenge you to grow but from a place of fundamental safety and mutual support.</p>
<p><strong>Karmic connections</strong> feel magnetized and compulsive — you can't stay away even when it hurts. They're intense but often destabilizing, and they carry unfinished business from past lifetimes or earlier chapters of this one.</p>
<h2>Tarot Cards for Soulmate Energy</h2>
<h3>Two of Cups</h3>
<p>Mutual, balanced recognition. Two whole people choosing each other — not desperate need, but clear-eyed love.</p>
<h3>Ten of Cups</h3>
<p>Complete emotional fulfillment and lasting happiness. The fairytale that's actually real. Long-term soul resonance.</p>
<h3>The Star</h3>
<p>Faith, healing, and genuine hope. A soulmate connection often brings profound healing to both parties.</p>
<h2>Tarot Cards for Karmic Energy</h2>
<h3>The Tower</h3>
<p>Explosive revelation and necessary disruption. Karmic connections often blow up stable structures in your life to force growth.</p>
<h3>Eight of Cups</h3>
<p>Walking away from something emotionally significant. A karmic bond often ends with a conscious release — the lesson learned, the work complete.</p>
<h3>Judgment</h3>
<p>Soul-level reckoning and past-life resonance. Judgment often appears in readings about deeply karmic connections.</p>
<h2>The Key Question</h2>
<p>Ask your deck: "What is the true nature and purpose of this connection?" The answer will clarify whether you're being called to build together or to learn and ultimately release. Both serve your soul's growth.</p>
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
