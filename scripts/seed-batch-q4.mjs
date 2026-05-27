/**
 * 批次Q4：塔罗长尾词
 * - 月亮星座全12个（英文）
 * - 宫廷牌完整指南（Pages/Knights/Queens/Kings across all 4 suits）
 * - 逆位阅读技巧
 */
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);

const moonSigns = [
  { sign: "Aries", slug: "aries-moon-sign-meaning", keywords: ["aries moon","moon in aries","aries moon personality","aries moon meaning","moon sign aries"], desc: "Aries Moon people feel emotions intensely and immediately — your inner life is bold, reactive, and fiercely independent. Learn what Moon in Aries means for your emotional nature and relationships.", preview: "With an <strong>Aries Moon</strong>, your emotional life is immediate, passionate, and direct. You feel things fast and intensely — and you usually respond to those feelings quickly, sometimes before reflection has a chance to catch up. Your inner world is fiery: you need action, stimulation, and a sense of forward movement to feel emotionally healthy. Frustration, boredom, or feeling blocked produces real distress. You're emotionally brave — willing to name feelings, take emotional risks, and fight for what you care about. The challenge is building the capacity to pause, especially in conflict, and allowing others their slower emotional process." },
  { sign: "Taurus", slug: "taurus-moon-sign-meaning", keywords: ["taurus moon","moon in taurus","taurus moon personality","taurus moon meaning","moon sign taurus"], desc: "Taurus Moon people need comfort, stability, and sensory pleasure to feel emotionally secure. This is one of the most grounded Moon placements — learn what Moon in Taurus reveals about your inner world.", preview: "With a <strong>Taurus Moon</strong>, your emotional security is deeply tied to stability, comfort, and the physical world. You feel safest when your environment is pleasant, your routines are intact, and your material needs are met. This is one of the most grounded and resilient Moon placements — you don't spiral easily, and once you've processed a feeling, you tend to release it. The shadow: you can hold on too long to people, patterns, and situations that no longer serve you, simply because change feels genuinely threatening to your sense of safety." },
  { sign: "Gemini", slug: "gemini-moon-sign-meaning", keywords: ["gemini moon","moon in gemini","gemini moon personality","gemini moon meaning","moon sign gemini"], desc: "Gemini Moon people process emotions through communication and thought — your inner world is quick, curious, and multi-layered. Discover what Moon in Gemini means for your emotional nature.", preview: "With a <strong>Gemini Moon</strong>, you process feelings through words and thought. When something happens emotionally, your first instinct is to talk about it, analyze it, write about it — to understand through language what you're feeling. Your emotional world is quick-moving and multi-threaded: you can be feeling several things at once, and that complexity is real rather than confused. The challenge: learning that sometimes feelings don't need to be understood — they just need to be felt." },
  { sign: "Cancer", slug: "cancer-moon-sign-meaning", keywords: ["cancer moon","moon in cancer","cancer moon personality","cancer moon meaning","moon sign cancer"], desc: "Cancer Moon is the Moon in its home sign — deeply intuitive, nurturing, and emotionally receptive. Learn what this powerful Moon placement means for your emotional life and relationships.", preview: "With a <strong>Cancer Moon</strong> — the Moon in its own sign — your emotional world is extraordinarily rich, deep, and sensitive. You feel everything intensely, pick up on the emotional states of others as if by osmosis, and have an instinctive need to care for and protect those you love. Your emotional memory is long: experiences from the past continue to resonate in your present emotional body in ways that others might not fully understand. This is a powerful placement for empathy, intuition, and emotional intelligence — and a challenging one for establishing firm emotional boundaries." },
  { sign: "Leo", slug: "leo-moon-sign-meaning", keywords: ["leo moon","moon in leo","leo moon personality","leo moon meaning","moon sign leo"], desc: "Leo Moon people have a warm, expressive, and generous inner life — you need appreciation and creative expression to thrive emotionally. Learn what Moon in Leo means for you.", preview: "With a <strong>Leo Moon</strong>, your inner world is warm, dramatic, and generous. You feel emotions fully and expressively — joy is exuberant, hurt is deep, love is intense. You need to feel seen, appreciated, and valued at an emotional level; an environment of indifference or being consistently overlooked genuinely depletes you. Your emotional generosity is remarkable — you give warmth freely and genuinely. The shadow: a tendency to make situations about yourself when you're not receiving enough emotional recognition, and difficulty separating your emotional wellbeing from how others respond to you." },
  { sign: "Virgo", slug: "virgo-moon-sign-meaning", keywords: ["virgo moon","moon in virgo","virgo moon personality","virgo moon meaning","moon sign virgo"], desc: "Virgo Moon people process emotions through analysis and service — your inner critic is active, your care is expressed through helpfulness. Learn what Moon in Virgo means emotionally.", preview: "With a <strong>Virgo Moon</strong>, you process feelings through analysis. When something upsets you, your instinct is to understand it precisely — to identify the exact nature of the problem and find a practical solution. You feel most emotionally at ease when things are organized, clean, and running efficiently; disorder in your environment creates real internal unease. Your way of expressing care is through service — doing helpful, practical things for others. The profound challenge: learning to accept that you are enough without the constant effort to improve everything, including yourself." },
  { sign: "Libra", slug: "libra-moon-sign-meaning", keywords: ["libra moon","moon in libra","libra moon personality","libra moon meaning","moon sign libra"], desc: "Libra Moon people need harmony, partnership, and fairness to feel emotionally balanced. Learn what Moon in Libra means for your inner world, relationships, and emotional wellbeing.", preview: "With a <strong>Libra Moon</strong>, your emotional wellbeing is closely tied to the quality of your relationships and the harmony in your environment. Discord and conflict create genuine distress; beauty, balance, and fairness restore you. You feel best in partnership — having someone to process with, share beauty with, and make decisions alongside. The challenge: your strong desire for harmony can push you toward people-pleasing, difficulty naming your true feelings, and a tendency to swing between positions without settling into your own clear position." },
  { sign: "Scorpio", slug: "scorpio-moon-sign-meaning", keywords: ["scorpio moon","moon in scorpio","scorpio moon personality","scorpio moon meaning","moon sign scorpio"], desc: "Scorpio Moon is one of the most intense Moon placements — your emotional life runs deep, private, and powerfully transformative. Learn what Moon in Scorpio truly means.", preview: "With a <strong>Scorpio Moon</strong>, your emotional life runs at tremendous depth. You feel everything intensely, but you rarely show it — there's a private, controlled quality to your emotional expression that can make you appear calm on the surface while an ocean churns below. You're drawn to emotional truth, even when it's uncomfortable; you'd rather know the painful reality than live in comfortable illusion. Trust is earned slowly and completely: once broken, it's very difficult to rebuild. Your emotional resilience is remarkable — you can transform through experiences that would break others — but the process is rarely comfortable." },
  { sign: "Sagittarius", slug: "sagittarius-moon-sign-meaning", keywords: ["sagittarius moon","moon in sagittarius","sagittarius moon personality","sagittarius moon meaning","moon sign sagittarius"], desc: "Sagittarius Moon people need freedom, adventure, and philosophical meaning to feel emotionally alive. Learn what Moon in Sagittarius means for your emotional nature and relationships.", preview: "With a <strong>Sagittarius Moon</strong>, your emotional wellbeing is tied to freedom, expansion, and meaning. You feel most alive when you're learning something new, traveling somewhere unfamiliar, or engaging with ideas that expand your understanding. Feeling confined, bored, or forced into routine creates genuine emotional suffering. You process feelings by searching for their meaning — there's always a philosophical question underneath the emotional experience: <em>what is this teaching me? where does this fit in the larger story?</em> The challenge: developing the patience to stay present with difficult emotions rather than seeking escape into new horizons." },
  { sign: "Capricorn", slug: "capricorn-moon-sign-meaning", keywords: ["capricorn moon","moon in capricorn","capricorn moon personality","capricorn moon meaning","moon sign capricorn"], desc: "Capricorn Moon people manage emotions with discipline and reserve — your emotional life is deep but rarely displayed. Learn what Moon in Capricorn means for your inner world.", preview: "With a <strong>Capricorn Moon</strong>, your emotional world is managed with discipline and reserve. You don't easily show vulnerability; expressing feelings can feel dangerous or unnecessary — something to be handled internally rather than displayed publicly. You feel most emotionally secure when you're achieving something, building toward a meaningful goal, or when you can clearly see the practical structure of your life holding together. The shadow side of this placement: emotional suppression that, over time, creates real internal costs; and a difficulty receiving care and support because needing it feels like weakness." },
  { sign: "Aquarius", slug: "aquarius-moon-sign-meaning", keywords: ["aquarius moon","moon in aquarius","aquarius moon personality","aquarius moon meaning","moon sign aquarius"], desc: "Aquarius Moon people experience emotions through an intellectual filter — your inner world is progressive, independent, and somewhat detached. Learn what Moon in Aquarius truly means.", preview: "With an <strong>Aquarius Moon</strong>, you often observe your own feelings with a slight intellectual distance — as if watching them from just outside. You understand your emotions before you feel them, which can be useful and can also mean that you're in your head when your heart needs attention. You need emotional freedom: feeling controlled, emotionally smothered, or expected to conform to conventional relationship dynamics creates real distress. Your emotional world is deeply connected to ideals: fairness, freedom, community, and the wellbeing of people beyond your immediate circle move you in ways that more personal emotional appeals sometimes don't." },
  { sign: "Pisces", slug: "pisces-moon-sign-meaning", keywords: ["pisces moon","moon in pisces","pisces moon personality","pisces moon meaning","moon sign pisces"], desc: "Pisces Moon is one of the most deeply sensitive Moon placements — emotionally boundaryless, spiritually attuned, and profoundly empathic. Learn everything about Moon in Pisces.", preview: "With a <strong>Pisces Moon</strong>, your emotional world is vast, fluid, and largely invisible to others. You feel everything — your own feelings and the feelings of everyone around you — with very little natural separation. This makes you extraordinarily empathic, imaginative, and spiritually attuned; it also means that without conscious boundaries, you can easily lose yourself in others' emotional realities. Dreams, imagination, music, and spiritual practice are not optional extras for you — they're essential emotional nutrition. The challenge: distinguishing between your feelings and others', and learning to honor your sensitivity rather than treating it as a problem to be managed." }
];

const moonPosts = moonSigns.map(m => ({
  slug: m.slug,
  category: "astro",
  title: `${m.sign} Moon Sign: Complete Guide to Moon in ${m.sign} Personality`,
  title_en: `${m.sign} Moon Sign: Complete Guide to Moon in ${m.sign} Personality`,
  description: m.desc,
  keywords: m.keywords,
  published_at: "2026-08-12",
  reading_time: 7,
  cta_href: "/birth-chart",
  cta_label: `🌙 Discover Your Moon Sign — Free Birth Chart`,
  cta_label_en: `Discover Your Moon Sign — Free Birth Chart`,
  content: `<h2>What Is Your Moon Sign?</h2>
<p>Your Moon sign is determined by which zodiac sign the Moon occupied at the exact moment of your birth. While your Sun sign describes your conscious identity and ego, your <strong>Moon sign</strong> reveals your <em>emotional inner world</em> — what you need to feel safe and nourished, how you process feelings, and the parts of yourself that you rarely show the world.</p>
<p>The Moon moves quickly through the zodiac — about 2-3 days per sign — so you'll need your exact birth date, time, and location to determine your Moon sign accurately.</p>
<h2>Moon in ${m.sign}: Your Emotional World</h2>
<p>${m.preview}</p>
<h2>Moon in ${m.sign} in Relationships</h2>
<p>In close relationships, your ${m.sign} Moon shapes what you need at an emotional level, what makes you feel secure, and how you express (or don't express) your feelings. Understanding your Moon sign can transform how you understand your own emotional responses — and how much compassion you extend to yourself when those responses are difficult.</p>
<h2>Working With Your ${m.sign} Moon</h2>
<p>Rather than fighting your emotional nature, the work is to understand it clearly enough to channel it intentionally. Your Moon sign isn't destiny — but it is your emotional baseline, the ground from which your inner life grows.</p>`
}));

const courtPosts = [
  {
    slug: "tarot-court-cards-complete-guide",
    category: "tarot",
    title: "Tarot Court Cards: Complete Guide to All 16 Pages, Knights, Queens & Kings",
    title_en: "Tarot Court Cards: Complete Guide to All 16 Pages, Knights, Queens & Kings",
    description: "Court cards are the most misunderstood cards in the tarot deck. This complete guide covers all 16 court cards — Pages, Knights, Queens, and Kings across all four suits — with clear meanings as people, energies, and internal states.",
    keywords: ["tarot court cards","pages knights queens kings tarot","court cards tarot meaning","tarot court cards as people","how to read court cards tarot"],
    published_at: "2026-08-13",
    reading_time: 18,
    cta_href: "/tarot",
    cta_label: "🔮 Get Your Court Card Reading — AI Tarot",
    cta_label_en: "Get Your Court Card Reading — AI Tarot",
    content: `<h2>Why Court Cards Are Confusing — And How to Actually Read Them</h2>
<p>Court cards — the 16 Pages, Knights, Queens, and Kings of the Minor Arcana — are notoriously the cards that stump beginning tarot readers most. Unlike the Major Arcana (which deal in universal themes) or the numbered pip cards (which describe situations and feelings), court cards seem to hover between <em>being a person</em> and <em>being an energy</em> in ways that can feel unclear.</p>
<p>Here's the key: court cards can mean all three simultaneously. They can represent:</p>
<ul>
<li><strong>An actual person</strong> in the querent's life (or the querent themselves)</li>
<li><strong>An energy or approach</strong> that is present or needed in a situation</li>
<li><strong>An aspect of the querent's own personality</strong> that is active or needs activation</li>
</ul>
<p>Context — your spread, your question, your intuition — tells you which applies.</p>
<h2>The Four Ranks: What They Mean Across All Suits</h2>
<h3>Pages (across all suits)</h3>
<p>Pages represent <strong>beginnings, learning, messages, and youthful energy</strong>. They're the students of the tarot court — energetic, curious, willing to try things without needing to be expert yet. As people, Pages are often literally young, or young-in-spirit in a particular domain. As an energy: approach this with beginner's mind.</p>
<h3>Knights (across all suits)</h3>
<p>Knights are <strong>active, moving, pursuing</strong>. Each Knight embodies their element in motion — the suit's energy at its most dynamic and potentially its most extreme. As people: often young adults, or anyone in "seeking mode." As an energy: this is what action in this realm looks like right now.</p>
<h3>Queens (across all suits)</h3>
<p>Queens represent <strong>mastery through internalization and reception</strong>. They've developed deep, nuanced understanding of their element — not through conquest but through experience, wisdom, and the ability to hold complexity. As people: mature individuals (any gender) who embody this element's depth. As an energy: embody this quality from the inside out.</p>
<h3>Kings (across all suits)</h3>
<p>Kings represent <strong>mastery through authority, experience, and external expression</strong>. They command their element — directing it, shaping external reality with it. As people: authority figures, mature individuals who lead in their domain. As an energy: take command, lead with this quality.</p>
<h2>The Pages</h2>
<p><strong>Page of Wands</strong> — Enthusiastic, creative, adventurous. Full of ideas and passion, sometimes more ideas than follow-through. The spark that starts fires.</p>
<p><strong>Page of Cups</strong> — Dreamy, emotionally open, imaginative. Psychically receptive. Wears their heart openly, sometimes naively.</p>
<p><strong>Page of Swords</strong> — Quick, sharp, mentally agile. Curious to the point of restless. Can use words impulsively without considering their impact.</p>
<p><strong>Page of Pentacles</strong> — Studious, diligent, practically curious. Steady learner. Excellent at building skills from the ground up.</p>
<h2>The Knights</h2>
<p><strong>Knight of Wands</strong> — Fast, passionate, charging ahead with enthusiasm that may outrun planning. Exciting energy that can be scattered.</p>
<p><strong>Knight of Cups</strong> — The romantic hero; approaches life through feeling and creative vision. Idealistic, emotionally expressive, sometimes lost in fantasy.</p>
<p><strong>Knight of Swords</strong> — Fastest, most direct of the Knights. Brilliant and decisive, can be reckless or tactless in the charge.</p>
<p><strong>Knight of Pentacles</strong> — Methodical, reliable, unhurried. The most dependable Knight — will complete the task thoroughly, on his own timeline.</p>
<h2>The Queens</h2>
<p><strong>Queen of Wands</strong> — Magnetic, confident, fiercely creative and independent. Warmth with backbone. Commands through charisma.</p>
<p><strong>Queen of Cups</strong> — Deeply intuitive, emotionally profound, compassionate without losing herself. The great nurturer who remains sovereign.</p>
<p><strong>Queen of Swords</strong> — Sharp, clear, honest to a fault. Has seen difficulty; what emerged is someone who sees with unclouded perception and speaks precisely.</p>
<p><strong>Queen of Pentacles</strong> — Warm, practical, abundantly capable. Creates a physical world of genuine beauty and care. Nurtures through doing and providing.</p>
<h2>The Kings</h2>
<p><strong>King of Wands</strong> — Visionary, entrepreneurial, commands through inspiration and the magnetic force of his conviction.</p>
<p><strong>King of Cups</strong> — Emotionally mature authority: leads with emotional wisdom and genuine care. Holds space for others without being submerged by them.</p>
<p><strong>King of Swords</strong> — Analytical, principled, intellectually commanding. Leads through truth, logic, and the strength of his clarity.</p>
<p><strong>King of Pentacles</strong> — Master of the material world. Quietly authoritative through demonstrated wealth of experience and accumulated wisdom.</p>`
  },
  {
    slug: "tarot-reversals-how-to-read-guide",
    category: "tarot",
    title: "How to Read Reversed Tarot Cards: 5 Methods Every Reader Should Know",
    title_en: "How to Read Reversed Tarot Cards: 5 Methods Every Reader Should Know",
    description: "Should you read reversed tarot cards? And if so, how? This guide covers 5 proven methods for reading reversals — from blocked energy to shadow meaning — and helps you find the approach that fits your reading style.",
    keywords: ["reversed tarot cards","tarot reversals meaning","how to read reversed tarot","tarot upside down cards","tarot reversal methods","should i read reversals tarot"],
    published_at: "2026-08-14",
    reading_time: 10,
    cta_href: "/tarot",
    cta_label: "🔮 Try AI Tarot Reading — With or Without Reversals",
    cta_label_en: "Try AI Tarot Reading — With or Without Reversals",
    content: `<h2>Should You Read Reversed Tarot Cards?</h2>
<p>This is one of the most frequently debated questions in tarot. The short answer: there's no universally "correct" approach. Many highly skilled readers work exclusively with upright cards. Others find reversals add essential nuance and depth. The question is which approach serves you and your readings best.</p>
<p>Before committing to using reversals, it's worth understanding the various ways they can be interpreted — because "the reversed meaning is the opposite of the upright meaning" is a vast oversimplification that does more harm than good.</p>
<h2>Method 1: Blocked or Delayed Energy</h2>
<p>In this approach, a reversed card indicates that the energy of the upright card is present but somehow blocked, stalled, or delayed. The Ten of Pentacles reversed, for example, doesn't mean "family breakdown" — it suggests that the security and legacy energy of the card is being resisted or has not yet fully manifested.</p>
<p><strong>Best for:</strong> Timing questions, situation assessments, and when you want to honor the card's core energy while acknowledging that something is preventing its full expression.</p>
<h2>Method 2: Internalized or Hidden Energy</h2>
<p>A reversed card points inward rather than outward — the energy is present but operating internally, privately, or unconsciously rather than being externally visible. The reversed Strength card isn't weakness; it's inner courage that hasn't yet found external expression.</p>
<p><strong>Best for:</strong> Inner work spreads, psychological readings, and situations where the external and internal realities seem to be misaligned.</p>
<h2>Method 3: The Shadow or Challenging Expression</h2>
<p>Each card has a spectrum of expression, and reversed can indicate the less constructive end of that spectrum — not "evil" or "bad," but the manifestation of that energy in a way that's problematic or unintegrated. The reversed Lovers might indicate a choice being avoided, or a relationship where values are misaligned rather than harmonized.</p>
<p><strong>Best for:</strong> Exploring where an energy is operating harmfully or where shadow work is needed.</p>
<h2>Method 4: Diminished or Excess Energy</h2>
<p>Some readers use reversals to indicate either too little or too much of the card's core energy — with the direction of the imbalance determined by other factors in the reading. The reversed Empress could indicate either creative depletion or creative excess that has become hoarding or overconsumption.</p>
<p><strong>Best for:</strong> Nuanced readings about energy balance, particularly in health and lifestyle spreads.</p>
<h2>Method 5: Rejection or Resistance</h2>
<p>The reversal indicates active resistance to or rejection of the card's energy — either by the querent, by their environment, or by both. The reversed Hierophant might indicate someone actively rejecting traditional structures or refusing conventional wisdom.</p>
<p><strong>Best for:</strong> Readings where resistance to change or authority is a central theme.</p>
<h2>Practical Guidance: How to Choose Your Method</h2>
<p>Many experienced readers use a hybrid approach: choosing the reversal interpretation that fits the specific card, the question, and the position in the spread, rather than applying a single method uniformly. This requires practice and developed intuition, but it's ultimately the most flexible and insightful approach.</p>
<p>If you're new to reversals, start with one method (blocked energy is often the clearest beginning point) and apply it consistently until you develop a feel for how reversals speak in your readings before broadening your interpretive toolkit.</p>`
  }
];

const allPosts = [...moonPosts, ...courtPosts];

async function main() {
  console.log(`📝 批次Q4：写入 ${allPosts.length} 篇（月亮星座x12 + 宫廷牌+逆位指南）...`);
  let success = 0, fail = 0;
  for (const post of allPosts) {
    const { error } = await supabase.from("mysticai_blog_posts").upsert(post, { onConflict: "slug" });
    if (error) { console.error(`  ❌ [${post.slug}]:`, error.message); fail++; }
    else { console.log(`  ✅ [${post.slug}]`); success++; }
  }
  console.log(`\n完成！成功: ${success}, 失败: ${fail}`);
}
main().catch(console.error);
