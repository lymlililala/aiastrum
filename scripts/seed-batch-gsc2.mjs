// ─── P1b：补全 Elder Futhark 缺失的 8 个符文（符文为单篇产出比最高主题）─────────
// 用法：SUPABASE_SECRET_KEY=sb_secret_xxx node scripts/seed-batch-gsc2.mjs
import { createClient } from "@supabase/supabase-js";
const SECRET = process.env.SUPABASE_SECRET_KEY;
if (!SECRET) { console.error("缺少 SUPABASE_SECRET_KEY"); process.exit(1); }
const supabase = createClient("https://tixgzezefjjsyuzgdhcd.supabase.co", SECRET);
const TODAY = "2026-06-09";

const cta = { cta_href: "/rune", cta_label: "👉 Draw a free rune reading now", cta_label_en: "Draw a free rune reading now" };

function art(slug, rune, symbol, title_en, desc, kw, body) {
  return {
    slug, category: "rune", title: title_en, title_en, description: desc, keywords: kw,
    published_at: TODAY, reading_time: 7, ...cta,
    content: `<article><h1>${title_en}</h1>${body}</article>`,
  };
}

const posts = [
  art("uruz-rune-meaning-strength-vitality", "Uruz", "ᚢ",
    "Uruz Rune Meaning: Wild Strength, Vitality & Untamed Power",
    "Uruz (ᚢ) is the rune of the wild ox — raw physical strength, vitality, and the untamed life force. Learn its upright and reversed meaning, plus love and career guidance.",
    ["uruz rune meaning", "uruz rune", "uruz reversed", "uruz rune love", "elder futhark uruz"],
    `<p>Uruz is the second rune of the Elder Futhark, and where Fehu was domesticated cattle, Uruz is the <strong>aurochs</strong> — the wild ox that once roamed Europe, enormous and impossible to tame. That image tells you everything. This is raw, untamed vitality: the kind of strength that doesn't ask permission.</p>
<h2>Core Meaning</h2>
<p>Uruz speaks to physical health, endurance, and the primal energy that pushes life forward. When it appears, something in you is ready to act on instinct rather than caution. It often shows up at the start of a demanding period — a new job, a health push, a creative sprint — when you'll need stamina more than strategy.</p>
<h2>Upright</h2>
<ul><li><strong>Strength &amp; health</strong>: a surge of physical or mental energy; recovery after illness</li><li><strong>Determination</strong>: the willpower to break through an obstacle by sheer persistence</li><li><strong>Wild potential</strong>: untapped power waiting to be channeled into something real</li></ul>
<h2>Reversed (Merkstave)</h2>
<p>Reversed Uruz warns of misused or scattered force — exhaustion, recklessness, or strength turned inward as self-sabotage. It can also mean weakness or missed opportunity: the power was there, but you hesitated. Rest, then redirect.</p>
<h2>In Love</h2>
<p>Uruz brings passion and physical attraction, but it asks for honesty about raw desire versus lasting connection. For couples, it can signal a renewal of energy. For singles, a magnetic but intense encounter.</p>
<h2>In Career</h2>
<p>A good omen for new ventures that demand grit — startups, physical work, anything where persistence beats polish. Don't overthink; build momentum.</p>
<h2>Frequently Asked Questions</h2>
<h3>Is Uruz a positive rune?</h3>
<p>Generally yes — it signals strength and vitality. The caution is channeling that power wisely rather than burning out.</p>
<h3>What does Uruz mean reversed?</h3>
<p>Reversed Uruz points to drained energy, recklessness, or hesitation that wasted an opportunity. It's a call to rest and refocus.</p>
<h3>What element is Uruz?</h3>
<p>Uruz is associated with Earth and primal life force, embodying physical form and raw vitality.</p>`),

  art("thurisaz-rune-meaning-protection-conflict", "Thurisaz", "ᚦ",
    "Thurisaz Rune Meaning: The Thorn, Protection & Reactive Force",
    "Thurisaz (ᚦ) is the rune of the thorn and the giant — a double-edged force of defense, conflict, and sudden change. Discover its upright, reversed, love and career meanings.",
    ["thurisaz rune meaning", "thurisaz rune", "thurisaz reversed", "thurisaz protection", "elder futhark thurisaz"],
    `<p>Thurisaz is one of the most charged runes in the Elder Futhark. Its name points two ways at once — the <strong>thorn</strong> that defends and wounds, and the <strong>giant</strong> (thurs) of Norse myth. It's also linked to Thor and his hammer. So it carries both danger and protection in a single stroke.</p>
<h2>Core Meaning</h2>
<p>Thurisaz is reactive force — energy that sits still until provoked, then strikes. When it appears, there's often a conflict brewing or a defensive boundary you need to hold. It rarely means peace; it means a catalyst.</p>
<h2>Upright</h2>
<ul><li><strong>Protection</strong>: a thorn hedge around what matters; defense against a real threat</li><li><strong>Catalyst</strong>: a sudden event that forces change you'd been avoiding</li><li><strong>Restraint before action</strong>: power held in reserve, waiting for the right moment</li></ul>
<h2>Reversed (Merkstave)</h2>
<p>Reversed Thurisaz warns of acting on impulse, defenselessness, or being on the receiving end of someone else's aggression. It can mark a decision made in anger that you'll regret. Pause before you strike.</p>
<h2>In Love</h2>
<p>Tension is the theme — a clash that either clears the air or cuts deep. For couples, address the friction directly but carefully. For singles, beware attraction to conflict itself.</p>
<h2>In Career</h2>
<p>Expect a confrontation or a hard decision. Used well, Thurisaz is the courage to defend your position; used poorly, it's burning a bridge you needed.</p>
<h2>Frequently Asked Questions</h2>
<h3>Is Thurisaz a bad rune?</h3>
<p>Not bad, but double-edged. It's protective when you're defending something real, and destructive when wielded carelessly.</p>
<h3>What does Thurisaz mean reversed?</h3>
<p>Reversed, it warns of impulsive aggression, vulnerability, or decisions made in the heat of anger.</p>
<h3>Is Thurisaz connected to Thor?</h3>
<p>Yes — it's associated with Thor and his hammer Mjölnir, symbolizing focused, protective force.</p>`),

  art("raidho-rune-meaning-journey-movement", "Raidho", "ᚱ",
    "Raidho Rune Meaning: The Journey, Right Action & Rhythm",
    "Raidho (ᚱ) is the rune of the journey and the wagon — travel, movement, rhythm, and doing the right thing at the right time. Explore its upright, reversed, love and career meanings.",
    ["raidho rune meaning", "raidho rune", "raidho reversed", "raidho rune travel", "elder futhark raidho"],
    `<p>Raidho means "riding" — the wagon, the road, the journey taken with purpose. But it's more than literal travel. Raidho is about <strong>right movement</strong>: being in the correct rhythm with life, doing the right thing at the right moment, taking the path rather than drifting.</p>
<h2>Core Meaning</h2>
<p>When Raidho appears, you're being asked to take control of your direction. It favors planned journeys over wandering, and it often marks progress that finally feels orderly after a chaotic stretch.</p>
<h2>Upright</h2>
<ul><li><strong>Journey</strong>: literal travel, or a meaningful life passage</li><li><strong>Right action</strong>: doing what is just and well-timed</li><li><strong>Rhythm</strong>: getting back in sync — with a routine, a relationship, or your own values</li></ul>
<h2>Reversed (Merkstave)</h2>
<p>Reversed Raidho signals disruption — delayed plans, a journey gone wrong, or a sense of being out of step. It can also mean rigidity: forcing a path that no longer fits. Re-check your route.</p>
<h2>In Love</h2>
<p>Relationships move forward, but only if both people travel in the same direction. For singles, love may arrive through travel or a change of scene.</p>
<h2>In Career</h2>
<p>Good for relocation, business travel, and projects that need steady, well-timed progress. Plan the route; don't improvise the whole trip.</p>
<h2>Frequently Asked Questions</h2>
<h3>Does Raidho mean literal travel?</h3>
<p>It can, but more often it means a meaningful journey or being in right alignment with your path.</p>
<h3>What does Raidho mean reversed?</h3>
<p>Delays, disrupted plans, or being out of rhythm — a sign to reassess your direction.</p>
<h3>Is Raidho a good rune for decisions?</h3>
<p>Yes — it emphasizes right action and good timing, making it supportive for well-considered choices.</p>`),

  art("kenaz-rune-meaning-knowledge-creativity", "Kenaz", "ᚲ",
    "Kenaz Rune Meaning: The Torch, Knowledge & Creative Fire",
    "Kenaz (ᚲ) is the rune of the torch — illumination, knowledge, craft, and creative breakthrough. Learn its upright, reversed, love and career meanings.",
    ["kenaz rune meaning", "kenaz rune", "kenaz reversed", "kenaz rune creativity", "elder futhark kenaz"],
    `<p>Kenaz is the controlled flame — the <strong>torch</strong> that lights the dark hall, not the wildfire. Where other fire symbols destroy, Kenaz reveals. It's the rune of knowledge gained, skill mastered, and the creative spark that turns raw material into something made.</p>
<h2>Core Meaning</h2>
<p>Kenaz appears when understanding is dawning — a problem about to be solved, a craft about to click, an insight that changes how you see. It rewards focused learning and hands-on creation over passive waiting.</p>
<h2>Upright</h2>
<ul><li><strong>Illumination</strong>: clarity after confusion; the "aha" moment</li><li><strong>Craft &amp; skill</strong>: mastery earned through practice</li><li><strong>Creative fire</strong>: inspiration that wants to be made real</li></ul>
<h2>Reversed (Merkstave)</h2>
<p>Reversed Kenaz means the torch gutters out — creative block, lost clarity, or knowledge withheld. It can mark the end of a project or relationship that has burned through its fuel. Rekindle, or let it go cleanly.</p>
<h2>In Love</h2>
<p>A relationship that brings genuine understanding and warmth. For singles, attraction sparked by shared ideas and creativity.</p>
<h2>In Career</h2>
<p>Excellent for artists, makers, teachers, and anyone whose work depends on insight. A skill you've practiced is about to pay off.</p>
<h2>Frequently Asked Questions</h2>
<h3>What does Kenaz symbolize?</h3>
<p>The torch — knowledge, illumination, craft, and the creative fire that makes things real.</p>
<h3>What does Kenaz mean reversed?</h3>
<p>Creative block, lost clarity, or the natural end of something that has run out of fuel.</p>
<h3>Is Kenaz good for creative projects?</h3>
<p>Very — it's one of the strongest runes for inspiration, craft, and breakthroughs.</p>`),

  art("gebo-rune-meaning-gift-partnership", "Gebo", "ᚷ",
    "Gebo Rune Meaning: The Gift, Partnership & Sacred Exchange",
    "Gebo (ᚷ) is the rune of the gift — generosity, partnership, balance between giving and receiving, and union. Discover its meaning in love, career, and why it has no reversed form.",
    ["gebo rune meaning", "gebo rune", "gebo rune love", "gebo partnership", "elder futhark gebo"],
    `<p>Gebo is shaped like an X, two lines crossing as equals — and that's the whole teaching. It means <strong>gift</strong>, but a gift implies a giver and a receiver, an exchange that binds two parties. Notably, Gebo has <strong>no reversed form</strong>; its symmetry can't be turned upside down, which fits a rune about balance.</p>
<h2>Core Meaning</h2>
<p>Gebo appears around partnership, generosity, and the flow between people. It reminds you that every gift creates a bond — and that healthy relationships need exchange moving in both directions.</p>
<h2>Upright (and only) Meaning</h2>
<ul><li><strong>Partnership</strong>: a union, alliance, or contract entered freely</li><li><strong>Generosity</strong>: giving without keeping score — yet trusting it returns</li><li><strong>Balance</strong>: the equilibrium between what you give and what you accept</li></ul>
<h2>When Balance Tips</h2>
<p>Though Gebo can't reverse, context can warn: a relationship where one person only gives and the other only takes breaks the rune's law. If you feel drained, the exchange has gone one-way.</p>
<h2>In Love</h2>
<p>One of the most favorable runes for relationships — true partnership, commitment, and mutual devotion. For singles, a meaningful connection built on equality.</p>
<h2>In Career</h2>
<p>Favors collaborations, contracts, and generous professional relationships. Give value first; trust the return.</p>
<h2>Frequently Asked Questions</h2>
<h3>Why does Gebo have no reversed meaning?</h3>
<p>Its X shape is symmetrical — it looks the same upside down — which mirrors its theme of balance and mutual exchange.</p>
<h3>Is Gebo a love rune?</h3>
<p>Yes, it's among the strongest for partnership, commitment, and equal, devoted relationships.</p>
<h3>What does Gebo teach about giving?</h3>
<p>That every gift creates a bond, and healthy exchange must flow both ways to stay in balance.</p>`),

  art("eihwaz-rune-meaning-transformation-endurance", "Eihwaz", "ᛇ",
    "Eihwaz Rune Meaning: The Yew, Death-Rebirth & Endurance",
    "Eihwaz (ᛇ) is the rune of the yew tree — transformation, the axis between worlds, endurance, and protection. Learn its upright, reversed, love and career meanings.",
    ["eihwaz rune meaning", "eihwaz rune", "eihwaz reversed", "eihwaz transformation", "elder futhark eihwaz"],
    `<p>Eihwaz is the <strong>yew tree</strong> — evergreen, long-lived, and poisonous, a tree the Norse planted in graveyards because it seemed to bridge life and death. As a rune, Eihwaz is the world axis (Yggdrasil itself was sometimes linked to the yew): the vertical line connecting the underworld, the earth, and the sky.</p>
<h2>Core Meaning</h2>
<p>Eihwaz is transformation through endurance. It marks the passage between one phase of life and the next — not a violent ending, but a deep, structural change you survive by standing firm. It also offers protection, like the yew's deep roots.</p>
<h2>Upright</h2>
<ul><li><strong>Death &amp; rebirth</strong>: an ending that makes space for renewal</li><li><strong>Endurance</strong>: the strength to hold steady through transition</li><li><strong>Protection</strong>: a defensive, grounding force during change</li></ul>
<h2>Reversed (Merkstave)</h2>
<p>Reversed Eihwaz suggests resistance to necessary change, fear of endings, or feeling stuck between two phases. The transformation is happening anyway — clinging only prolongs the discomfort.</p>
<h2>In Love</h2>
<p>A relationship undergoing deep transformation. For some, the end of one chapter; for committed couples, a profound deepening through a shared trial.</p>
<h2>In Career</h2>
<p>Marks a turning point — leaving an old role, surviving restructuring, or enduring a slow but meaningful shift. Stand firm; the new shape is forming.</p>
<h2>Frequently Asked Questions</h2>
<h3>Does Eihwaz mean death?</h3>
<p>Symbolically, yes — but as death-and-rebirth, transformation, not literal death. It's about endings that enable renewal.</p>
<h3>What does Eihwaz mean reversed?</h3>
<p>Resistance to change, fear of endings, or feeling trapped between phases.</p>
<h3>Is Eihwaz a protective rune?</h3>
<p>Yes — the yew's deep roots make it a grounding, defensive force during periods of transition.</p>`),

  art("berkano-rune-meaning-birth-growth", "Berkano", "ᛒ",
    "Berkano Rune Meaning: The Birch, New Beginnings & Growth",
    "Berkano (ᛒ) is the rune of the birch — birth, fertility, nurturing, and new beginnings. Discover its upright, reversed, love and career meanings.",
    ["berkano rune meaning", "berkano rune", "berkano reversed", "berkano fertility", "elder futhark berkano"],
    `<p>Berkano is the <strong>birch tree</strong> — the first tree to leaf after winter, the pioneer that colonizes bare ground. Its shape suggests a pregnant belly or breasts, and it's the great mother-rune of the Elder Futhark: birth, fertility, nurturing, and the quiet, protected growth of new things.</p>
<h2>Core Meaning</h2>
<p>Berkano appears at beginnings that need shelter — a new project, a pregnancy, a fragile idea, a healing process. Its energy is gentle and feminine, less about force than about tending. Growth here happens in the dark, like a seed, before it shows.</p>
<h2>Upright</h2>
<ul><li><strong>New beginnings</strong>: fresh starts that require care and patience</li><li><strong>Fertility &amp; birth</strong>: literal or creative; bringing something into being</li><li><strong>Nurturing</strong>: protection, healing, and the safe space to grow</li></ul>
<h2>Reversed (Merkstave)</h2>
<p>Reversed Berkano warns of stalled growth, family or domestic difficulty, or a new venture that isn't getting the care it needs. It can also signal anxiety around fertility or beginnings. Tend the roots before expecting blooms.</p>
<h2>In Love</h2>
<p>A nurturing, growing relationship — often a new one, or a new phase like moving in together or starting a family. Warmth and care are the keynotes.</p>
<h2>In Career</h2>
<p>Favors fresh ventures in their early, vulnerable stage. Protect the seedling: don't expose a new project to harsh judgment too soon.</p>
<h2>Frequently Asked Questions</h2>
<h3>Is Berkano a fertility rune?</h3>
<p>Yes — it's the primary rune of birth, fertility, and nurturing growth, both literal and creative.</p>
<h3>What does Berkano mean reversed?</h3>
<p>Stalled growth, domestic or family difficulty, or a new beginning that lacks the care it needs.</p>
<h3>What tree is Berkano?</h3>
<p>The birch — the first tree to leaf in spring, symbolizing renewal and pioneering new growth.</p>`),

  art("ehwaz-rune-meaning-partnership-trust", "Ehwaz", "ᛖ",
    "Ehwaz Rune Meaning: The Horse, Trust & Moving Forward Together",
    "Ehwaz (ᛖ) is the rune of the horse — partnership, trust, loyalty, and steady progress made together. Learn its upright, reversed, love and career meanings.",
    ["ehwaz rune meaning", "ehwaz rune", "ehwaz reversed", "ehwaz partnership", "elder futhark ehwaz"],
    `<p>Ehwaz means <strong>horse</strong> — specifically the bond between horse and rider, two beings moving as one. Where Raidho was the journey, Ehwaz is the trusted partnership that carries you through it. It's about loyalty, harmony, and the steady progress that only comes when two work in sync.</p>
<h2>Core Meaning</h2>
<p>Ehwaz appears around relationships built on trust — marriage, deep friendship, reliable business partners. It signals smooth, cooperative movement forward, and the security of knowing someone has your back.</p>
<h2>Upright</h2>
<ul><li><strong>Partnership</strong>: a trusted bond moving in the same direction</li><li><strong>Trust &amp; loyalty</strong>: dependable relationships you can lean on</li><li><strong>Steady progress</strong>: forward motion made safer by cooperation</li></ul>
<h2>Reversed (Merkstave)</h2>
<p>Reversed Ehwaz warns of a partnership out of sync — mistrust, a relationship stuck or pulling in two directions, or restlessness that disrupts steady progress. Rebuild trust, or accept the pace has changed.</p>
<h2>In Love</h2>
<p>One of the best relationship runes — deep trust, loyalty, and two people growing in harmony. For singles, a connection that feels stable and aligned.</p>
<h2>In Career</h2>
<p>Favors partnerships, teamwork, and gradual, reliable advancement. Choose collaborators you trust; progress comes from moving together.</p>
<h2>Frequently Asked Questions</h2>
<h3>How is Ehwaz different from Raidho?</h3>
<p>Raidho is the journey itself; Ehwaz is the trusted partnership (horse and rider) that carries you through it.</p>
<h3>What does Ehwaz mean reversed?</h3>
<p>A partnership out of sync — mistrust, restlessness, or a relationship pulling in two directions.</p>
<h3>Is Ehwaz a good rune for relationships?</h3>
<p>Yes — it's among the strongest for trust, loyalty, and harmonious partnership.</p>`),
];

async function run() {
  for (const p of posts) {
    const { error } = await supabase.from("mysticai_blog_posts").upsert(p, { onConflict: "slug" });
    console.log(error ? `❌ ${p.slug}: ${error.message}` : `✅ ${p.slug}`);
  }
}
run();
