/**
 * 批次Q1：小阿尔卡纳宝剑组全14张 + 钱币组全14张（英文）
 * 高搜索量：ace of swords, two of pentacles, king of swords 等
 */
import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = "https://tixgzezefjjsyuzgdhcd.supabase.co";
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E";
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const posts = [
  {
    slug: "swords-suit-tarot-complete-guide",
    category: "tarot",
    title: "The Suit of Swords: Complete Guide to All 14 Swords Cards",
    title_en: "The Suit of Swords: Complete Guide to All 14 Swords Cards",
    description: "The Suit of Swords governs thought, conflict, truth, and difficult clarity. This complete guide covers all 14 Swords cards — Ace through King — with upright and reversed meanings, and how to read a Swords-heavy spread without fear.",
    keywords: ["suit of swords tarot","swords tarot meaning","ace of swords","king of swords","minor arcana swords","swords tarot cards","two of swords","three of swords"],
    published_at: "2026-08-01",
    reading_time: 16,
    cta_href: "/tarot",
    cta_label: "🔮 Swords Reading — AI Cuts Through the Confusion",
    cta_label_en: "Swords Reading — AI Cuts Through the Confusion",
    content: `<h2>What Does the Suit of Swords Represent?</h2>
<p>The Suit of Swords corresponds to the element of <strong>Air</strong>. Its domain covers thought, communication, conflict, truth, decision-making, and the double-edged nature of the mind. Swords cards tend to be among the most challenging in the deck — not because they're inherently negative, but because truth and clarity are rarely comfortable. Air cuts through pretense and illusion.</p>
<p>A spread heavy with Swords indicates a situation primarily driven by mental dynamics: what's being thought, what's being said or not said, what conflict is present, and what clarity is both available and being avoided.</p>
<h2>Ace of Swords</h2>
<p><strong>Upright:</strong> A breakthrough moment — clarity arriving suddenly, cutting through confusion or pretense. The purest expression of truth in the deck. Mental breakthroughs, decisive new beginnings, the moment when you finally see something clearly.</p>
<p><strong>Reversed:</strong> Clarity being blocked or distorted; a decision that's being second-guessed into paralysis; using sharp intellect in a way that wounds rather than illuminates.</p>
<h2>Two of Swords</h2>
<p><strong>Upright:</strong> Deliberate avoidance of a decision — the blindfolded figure with two swords crossed over her heart is choosing not to see. This isn't always wrong: sometimes a pause is genuinely needed. But it can also indicate keeping yourself deliberately in the dark about something you'd rather not confront.</p>
<p><strong>Reversed:</strong> The blindfold coming off — you're being forced to see what you've been avoiding, whether you're ready or not. Also: information overload that makes decision-making even harder.</p>
<h2>Three of Swords</h2>
<p><strong>Upright:</strong> Heartbreak, grief, betrayal, painful truth. The iconic image of three swords piercing a heart in the rain doesn't soften its meaning: something genuinely hurts. The card's value is that it names the pain precisely and validates it — this is real, it matters, and it needs to be felt rather than bypassed.</p>
<p><strong>Reversed:</strong> Beginning to move through grief; releasing pain that has been held too long; or, less productively, suppressing pain by convincing yourself you're "over it" before you actually are.</p>
<h2>Four of Swords</h2>
<p><strong>Upright:</strong> Rest, recuperation, strategic withdrawal. The knight lying in effigy — one sword beneath him, three above — is not defeated. He's recovering. After conflict or strain, this card appears to say: stop pushing. Rest is not weakness; it's what makes the next movement possible.</p>
<p><strong>Reversed:</strong> Forced back into activity before recovery is complete; restlessness that prevents genuine rest; or emerging from a rest period and re-entering the world.</p>
<h2>Five of Swords</h2>
<p><strong>Upright:</strong> Hollow victory, conflict won at too high a cost, the aftermath of a battle where no one truly won. The figure gathering swords from defeated opponents looks satisfied, but the image has a bitter quality. You may have won the argument, the deal, or the battle — but what did it cost, and was it worth it?</p>
<p><strong>Reversed:</strong> Moving past a conflict; releasing the need to "win"; or a conflict that is escalating rather than resolving.</p>
<h2>Six of Swords</h2>
<p><strong>Upright:</strong> Transition, moving from turbulence toward calmer waters. The boat carries passengers away from rough water toward something smoother. This isn't triumph — there's still sadness in leaving. But it is genuine progress: you're moving through difficulty rather than staying stuck in it.</p>
<p><strong>Reversed:</strong> Delayed departure — unable to leave a difficult situation that needs to be left; or returning to turbulent waters after attempting to move on.</p>
<h2>Seven of Swords</h2>
<p><strong>Upright:</strong> Stealth, strategy, working around obstacles indirectly. The figure tiptoeing away with five swords suggests a situation that calls for subtlety rather than directness — or warns of deception at play. Context determines whether this is clever strategy or problematic avoidance.</p>
<p><strong>Reversed:</strong> Deception being uncovered; a sneaky plan backfiring; or choosing to come clean about something rather than continuing to manage it covertly.</p>
<h2>Eight of Swords</h2>
<p><strong>Upright:</strong> Feeling trapped, restricted, unable to see a way out — but the restriction is largely self-imposed. The bound figure is surrounded by swords, but they're loosely arranged; she could walk out if she could see clearly. This card almost always points to mental imprisonment: the story you're telling about why you can't move.</p>
<p><strong>Reversed:</strong> Removing the blindfold; beginning to recognize that you have more freedom than you've believed; or, in some cases, a situation that truly is constraining becoming even more so.</p>
<h2>Nine of Swords</h2>
<p><strong>Upright:</strong> Anxiety, nightmares, the 3am spiral. The figure sitting up in bed, head in hands, surrounded by nine swords represents the mind's capacity to generate suffering through worst-case thinking. The swords are mounted on the wall — not actively threatening, but very present to the frightened mind.</p>
<p><strong>Reversed:</strong> Beginning to find relief from anxiety; the worst-case scenario not materializing; or anxiety so extreme that it's now affecting daily functioning rather than just nights.</p>
<h2>Ten of Swords</h2>
<p><strong>Upright:</strong> A definitive end, usually painful and final. The figure facedown with ten swords in his back is dramatic, but notice: the sky behind him is clearing at the horizon. This is rock bottom — but it's also genuinely the bottom. The only direction from here is up. This card is painful, but it's also honest: something is truly over.</p>
<p><strong>Reversed:</strong> Beginning to rise after a painful ending; refusing to accept a necessary ending; or the pain of the Ten beginning to lessen as recovery slowly starts.</p>
<h2>Page of Swords</h2>
<p><strong>Upright:</strong> Sharp, curious, intellectually hungry energy. The Page is quick, perceptive, and interested in truth — but sometimes uses words and intelligence impulsively, without considering their impact. As a person: witty, observant, possibly a bit volatile. As an energy: bring your full mental attention to this.</p>
<p><strong>Reversed:</strong> Sharp words used without care; gossip; mental restlessness that scatters rather than focuses; or the brilliant mind not yet finding its discipline.</p>
<h2>Knight of Swords</h2>
<p><strong>Upright:</strong> Fast, decisive, intellectually bold — charging into action with conviction. The most direct and forceful of the Knights. As a person: brilliant, opinionated, possibly tactless. As an energy: move decisively, cut through hesitation, say what you mean.</p>
<p><strong>Reversed:</strong> Reckless aggression; charging without thinking; arguments for the sake of arguments; or that focused energy turning toward destruction rather than progress.</p>
<h2>Queen of Swords</h2>
<p><strong>Upright:</strong> Clear-eyed, independent, honest to a point that can feel cutting but always serves truth. The Queen of Swords has survived difficulty — there's a sorrow in her eyes — and what emerged is someone who sees clearly and speaks directly. As a person: perceptive, unsentimental, highly intelligent. As an energy: see this clearly, without self-deception.</p>
<p><strong>Reversed:</strong> Coldness without genuine clarity; bitterness masquerading as wisdom; using intellectual sharpness as a weapon rather than a tool.</p>
<h2>King of Swords</h2>
<p><strong>Upright:</strong> Authoritative, analytical, the master of intellect and principle. The King sits straight, sword upright — this is someone who has made their mind a disciplined instrument and leads with it. As a person: commanding, fair, possibly formidable. As an energy: think this through completely, lead with truth, hold to principle.</p>
<p><strong>Reversed:</strong> Tyranny of the intellect over everything else; using authority to suppress rather than clarify; or brilliant mind in service of cruelty or manipulation.</p>
<h2>Reading Swords-Heavy Spreads</h2>
<p>When a reading is dominated by Swords, it's easy to feel like you've drawn "bad cards." But Swords are honest, not malicious. They say: <em>something here requires your clearest thinking, your most honest assessment, and your willingness to accept uncomfortable truth.</em> The discomfort is the beginning of the clarity.</p>`
  },
  {
    slug: "pentacles-suit-tarot-complete-guide",
    category: "tarot",
    title: "The Suit of Pentacles: Complete Guide to All 14 Pentacles Cards",
    title_en: "The Suit of Pentacles: Complete Guide to All 14 Pentacles Cards",
    description: "The Suit of Pentacles governs money, work, body, and the material world. This complete guide covers all 14 Pentacles cards with upright and reversed meanings — the most grounding and practical suit in the tarot deck.",
    keywords: ["suit of pentacles tarot","pentacles tarot meaning","ace of pentacles","king of pentacles","minor arcana pentacles","pentacles tarot cards","two of pentacles","ten of pentacles"],
    published_at: "2026-08-02",
    reading_time: 16,
    cta_href: "/tarot",
    cta_label: "🔮 Pentacles Reading — AI Reads Your Material World",
    cta_label_en: "Pentacles Reading — AI Reads Your Material World",
    content: `<h2>What Does the Suit of Pentacles Represent?</h2>
<p>The Suit of Pentacles (sometimes called Coins or Discs) corresponds to the element of <strong>Earth</strong>. Its domain covers money, work, physical health, practical skills, material security, nature, and the tangible world. Where other suits deal with thought, feeling, or action, Pentacles deal with what actually exists — what you can touch, measure, build, and sustain.</p>
<p>Pentacles cards tend to be patient, reliable, and grounded. A reading heavy with Pentacles is pointing toward practical, material realities that need attention.</p>
<h2>Ace of Pentacles</h2>
<p><strong>Upright:</strong> A new, concrete material opportunity — a job offer, financial windfall, business idea with genuine viability, or investment that has real potential. This is the most tangible and promising ace in the deck. Unlike the Ace of Wands (which might remain a vision), the Ace of Pentacles is something you can pick up and work with.</p>
<p><strong>Reversed:</strong> An opportunity that looks solid on the surface but has a catch; financial opportunity squandered or arriving at the wrong time; greed or short-sightedness that prevents real stability from developing.</p>
<h2>Two of Pentacles</h2>
<p><strong>Upright:</strong> Juggling — multiple priorities, financial balancing acts, the dance of keeping various demands in equilibrium. The figure manages two pentacles connected in an infinity loop while ships navigate choppy waters behind him. This can be done, but it requires constant attention. The card asks: can you keep this up, and if not, what needs to drop?</p>
<p><strong>Reversed:</strong> The juggling has become unsustainable; things are beginning to drop; financial disorganization that needs addressing; or, sometimes, the burden lightening as some of the competing demands resolve.</p>
<h2>Three of Pentacles</h2>
<p><strong>Upright:</strong> Skilled work being recognized, collaboration, the early stages of building something meaningful together. The apprentice craftsman works on a cathedral while a monk and architect observe — the skill is real, the collaboration is working, and the structure is taking shape. One of the best career cards in the deck.</p>
<p><strong>Reversed:</strong> Collaboration that isn't functioning; poor teamwork; skills not being recognized or rewarded appropriately; doing good work that isn't being seen.</p>
<h2>Four of Pentacles</h2>
<p><strong>Upright:</strong> Security, stability, conservative management of resources — but at a cost. The miser figure clutching his coins suggests that holding on has become the primary mode. There's wisdom in protecting what you've built, but this card often appears when security has become hoarding, and the fear of loss is preventing genuine living.</p>
<p><strong>Reversed:</strong> Beginning to release excessive control over finances; generosity after a period of tightness; or the opposite — financial instability causing further defensive clutching.</p>
<h2>Five of Pentacles</h2>
<p><strong>Upright:</strong> Material hardship — financial loss, poverty, illness, exclusion. Two figures pass a warm, lit church window in the cold and dark, but they don't go in. The card names real material difficulty without romanticizing it. It also contains a subtle note: the help available to them is not being accessed. Where is the support you're not reaching for?</p>
<p><strong>Reversed:</strong> Recovery from financial difficulty; beginning to accept help; finding your way in from the cold — or, sometimes, the situation actually getting harder before it improves.</p>
<h2>Six of Pentacles</h2>
<p><strong>Upright:</strong> Generosity, the balanced exchange of material resources, giving and receiving in appropriate proportion. The merchant weighing out coins to those in need represents a moment of real material assistance. This card asks: are you the one giving, the one receiving, or both? And is the exchange genuinely balanced?</p>
<p><strong>Reversed:</strong> Charity given with strings attached; power imbalance in financial relationships; taking without giving, or giving without being able to receive when it's your turn.</p>
<h2>Seven of Pentacles</h2>
<p><strong>Upright:</strong> The pause at the point of harvest — stepping back to assess what your labor has produced before deciding the next step. The farmer leans on his hoe, looking at his crop. Is this what you wanted to grow? Is it worth the continued investment? A card of patient assessment and strategic patience.</p>
<p><strong>Reversed:</strong> Impatience with slow progress; effort that isn't producing the expected returns; wasted investment of time or money; or giving up too close to the harvest point.</p>
<h2>Eight of Pentacles</h2>
<p><strong>Upright:</strong> Mastery through sustained, focused work. The craftsman hammers pentacles one after another — not flashy, not looking for shortcuts. This is the card of apprenticeship, skill development, and the satisfaction of getting genuinely good at something through repetition and care. One of the most underrated positive cards in the deck.</p>
<p><strong>Reversed:</strong> Working hard without developing genuine skill; perfectionism that prevents completion; or expertise applied to the wrong domain — great skill, wrong direction.</p>
<h2>Nine of Pentacles</h2>
<p><strong>Upright:</strong> Self-sufficiency, elegant independence, the material abundance that comes from sustained personal effort. The elegantly dressed woman in her lush garden with a falcon on her wrist — everything here was created through her own work, and she knows it. A card of earned independence and refined solitude.</p>
<p><strong>Reversed:</strong> Financial dependence on others that is uncomfortable; self-sufficiency as isolation; wealth achieved but not enjoyed; or working so hard for material security that you've sacrificed the life the security was supposed to enable.</p>
<h2>Ten of Pentacles</h2>
<p><strong>Upright:</strong> Legacy, generational wealth, the fullness of material abundance in a family or community context. Three generations in a prosperous setting — this isn't individual wealth but the kind of stability that supports a whole life over time. One of the most auspicious cards for material matters.</p>
<p><strong>Reversed:</strong> Family conflict over money; inherited dysfunction alongside inherited wealth; the trappings of stability without the genuine security; or wealth that has been lost or is at risk.</p>
<h2>Page of Pentacles</h2>
<p><strong>Upright:</strong> A studious, grounded energy fascinated by the tangible world. The Page holds a pentacle as if really seeing it — curious, careful, full of potential. As a person: diligent, practical, learning with genuine care. As an energy: approach this practically, learn the basics thoroughly before moving on.</p>
<p><strong>Reversed:</strong> Procrastination masquerading as preparation; a practical talent that isn't being applied; or learning without ever bringing that learning into the real world.</p>
<h2>Knight of Pentacles</h2>
<p><strong>Upright:</strong> The most methodical of the Knights — reliable, hardworking, not flashy but genuinely dependable. While other Knights charge ahead, the Knight of Pentacles moves at a measured pace and does the work thoroughly. As a person: responsible, trustworthy, possibly boring to those who want drama. As an energy: do the work, step by step, without cutting corners.</p>
<p><strong>Reversed:</strong> Stubbornness, resistance to necessary change; perfectionism that has become an obstacle; or the reliable, steady pace turning into outright stagnation.</p>
<h2>Queen of Pentacles</h2>
<p><strong>Upright:</strong> Warm, nurturing, abundantly capable. The Queen of Pentacles creates a physical world that is genuinely good — her garden is lush, her home welcoming, her resources generous. She's practical and grounded without being cold. As a person: someone who takes care of others through doing, providing, and making. As an energy: take care of your physical world.</p>
<p><strong>Reversed:</strong> Neglect of the practical and physical; smothering in the name of nurturing; or someone whose care comes with the expectation of control.</p>
<h2>King of Pentacles</h2>
<p><strong>Upright:</strong> Mastery of the material world — wealth created through patience, discipline, and genuine competence. The King sits among abundance that he built. He's not flashy; his authority comes from what he's actually done. As a person: financially successful, reliable, possibly focused on material concerns to the exclusion of other dimensions. As an energy: approach this with long-term thinking and genuine competence.</p>
<p><strong>Reversed:</strong> Materialism that has become the entire identity; stubbornness about financial approach even when it's failing; or wealth used as a substitute for genuine emotional presence.</p>`
  }
];

async function main() {
  console.log(`📝 批次Q1：写入 ${posts.length} 篇宝剑/钱币小阿尔卡纳完整指南...`);
  let success = 0, fail = 0;
  for (const post of posts) {
    const { error } = await supabase.from("mysticai_blog_posts").upsert(post, { onConflict: "slug" });
    if (error) { console.error(`  ❌ [${post.slug}]:`, error.message); fail++; }
    else { console.log(`  ✅ [${post.slug}]`); success++; }
  }
  console.log(`\n完成！成功: ${success}, 失败: ${fail}`);
}
main().catch(console.error);
