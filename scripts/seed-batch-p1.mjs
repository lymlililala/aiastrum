/**
 * 批次P1：剩余大阿尔卡纳（力量/隐士/命运之轮/正义/倒吊人/节制/恶魔/审判）
 */
import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = "https://tixgzezefjjsyuzgdhcd.supabase.co";
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E";
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const posts = [
  {
    slug: "strength-tarot-card-meaning",
    category: "tarot",
    title: "Strength Tarot Card Meaning: Inner Power, Patience & the Lion You're Taming",
    title_en: "Strength Tarot Card Meaning: Inner Power, Patience & the Lion You're Taming",
    description: "Strength (VIII) isn't about physical force — it's about the kind of courage that stays gentle under pressure. Explore the full upright and reversed meanings of Strength in love, career, and personal growth, plus key card combinations.",
    keywords: ["strength tarot card","strength tarot meaning","strength tarot upright reversed","strength tarot love","major arcana VIII","inner strength tarot"],
    published_at: "2026-06-30",
    reading_time: 10,
    cta_href: "/tarot",
    cta_label: "🔮 Draw Your Cards — AI Reading",
    cta_label_en: "Draw Your Cards — AI Reading",
    content: `<h2>What Does the Strength Card Show?</h2>
<p>The Strength card (VIII in most decks) depicts a woman calmly closing — or gently opening — the mouth of a lion. Above her head floats the infinity symbol (lemniscate), the same symbol seen over the Magician. She wears white, suggesting purity of intention. The lion's mane is wreathed with flowers.</p>
<p>Notice what's absent: there are no chains, no weapons, no fear on her face. She's not defeating the lion. She's <em>working with it</em>. That's the entire message of this card in one image.</p>
<h2>Strength Upright: Core Meaning</h2>
<p>Strength upright represents:</p>
<ul>
<li><strong>Inner courage:</strong> The ability to face difficulty without hardening or shutting down</li>
<li><strong>Patience with yourself:</strong> Compassionate self-discipline rather than rigid self-control</li>
<li><strong>Taming, not suppressing:</strong> Working with your fears, impulses, and difficult emotions rather than trying to eliminate them</li>
<li><strong>Quiet persistence:</strong> The kind of fortitude that doesn't announce itself but simply keeps going</li>
</ul>
<p>When Strength appears, the situation calls for a soft but unwavering approach. Brute force, aggression, or rigid control will backfire. What works here is calm, consistent, compassionate firmness.</p>
<h2>Strength in Love Readings</h2>
<ul>
<li><strong>Single:</strong> You're being asked to approach love from a place of wholeness rather than need. The person worth waiting for will respond to your genuine self — not a performance of strength or an act of desperation.</li>
<li><strong>In a relationship:</strong> Strength here often signals a relationship that has been through difficulty and is stronger for it. It can also indicate a period where one partner is supporting the other through something challenging — the card validates that this kind of steady love matters enormously.</li>
<li><strong>Conflict or tension:</strong> Strength advises against escalation or control tactics. The approach that actually works is the one that stays grounded and open, even when provoked.</li>
</ul>
<h2>Strength in Career Readings</h2>
<p>In career contexts, Strength often appears when:</p>
<ul>
<li>You're dealing with a difficult colleague, manager, or workplace dynamic that requires patience rather than confrontation</li>
<li>A project is demanding sustained effort without obvious progress — the card validates that your consistent work is building something</li>
<li>You need to advocate for yourself firmly but without aggression — tone matters as much as content</li>
</ul>
<h2>Strength Reversed: What It Points To</h2>
<p>Reversed Strength suggests the inner resources are present but not being accessed correctly:</p>
<ul>
<li><strong>Self-doubt:</strong> Underestimating your own capacity to handle something difficult</li>
<li><strong>Suppression instead of integration:</strong> Pushing down fear or anger rather than processing it — which almost always makes it bigger</li>
<li><strong>Overcompensation:</strong> Trying to prove strength through aggression, control, or hardness — the opposite of what the card calls for</li>
<li><strong>Exhaustion:</strong> You've been the steady one for too long and your own reserves are depleted</li>
</ul>
<h2>Strength vs. The Chariot</h2>
<p>These two cards are often confused because both involve control and willpower. The distinction:</p>
<ul>
<li><strong>The Chariot</strong> controls external forces through focused determination and direction. It's outward-facing power.</li>
<li><strong>Strength</strong> works with internal forces — fear, impulse, desire, emotion — through compassion and patience. It's inward-facing power.</li>
</ul>
<p>Many situations require both, but they operate differently. When you see both in the same reading, you're being called to develop both dimensions.</p>
<h2>Key Combinations</h2>
<ul>
<li><strong>Strength + The Moon:</strong> Deep work with fears and the unconscious — what you're facing is real, and the path through it is patient self-examination, not avoidance</li>
<li><strong>Strength + The Empress:</strong> Nurturing strength — care that is both generous and boundaried</li>
<li><strong>Strength + Nine of Swords:</strong> Anxiety that's being managed rather than mastered — the lion is awake and loud, but you haven't given up</li>
<li><strong>Strength + The Devil:</strong> A significant pattern or addiction that is possible to break — but requires working with the desire rather than simply trying to white-knuckle your way out</li>
</ul>
<h2>The Number 8 and Infinity</h2>
<p>As the eighth Major Arcana, Strength carries the energy of 8 — associated with cycles, regeneration, and the ongoing nature of inner work. The infinity symbol above the woman's head reinforces this: this isn't a one-time victory. It's a practice. The lion doesn't disappear. You simply learn to be with it differently.</p>
<h2>What Strength Is Really Asking</h2>
<p>Strength asks a deceptively simple question: <em>Can you be powerful without being hard?</em></p>
<p>The card's deepest challenge is to stay soft in difficult circumstances — not because softness is weakness, but because it's the only thing that actually reaches another creature, another person, or the difficult part of yourself.</p>`
  },
  {
    slug: "the-hermit-tarot-card-meaning",
    category: "tarot",
    title: "The Hermit Tarot Card: Solitude, Inner Truth & When to Step Back",
    title_en: "The Hermit Tarot Card: Solitude, Inner Truth & When to Step Back",
    description: "The Hermit isn't about loneliness — it's about the kind of clarity that only comes from genuine solitude. Full upright and reversed meanings for love, career, and personal growth, plus when this card is a warning and when it's an invitation.",
    keywords: ["the hermit tarot","hermit tarot card meaning","hermit tarot upright reversed","hermit tarot love","major arcana IX","solitude tarot"],
    published_at: "2026-07-01",
    reading_time: 10,
    cta_href: "/tarot",
    cta_label: "🔮 Get Your AI Tarot Reading",
    cta_label_en: "Get Your AI Tarot Reading",
    content: `<h2>Who Is the Hermit?</h2>
<p>The Hermit (IX) stands on a mountain peak, robed in grey, holding a lantern in one hand and a staff in the other. The lantern contains a six-pointed star — the Seal of Solomon, a symbol of ancient wisdom. He isn't lost. He's arrived somewhere deliberately solitary in order to see clearly.</p>
<p>The mountain suggests achievement — he's climbed to this vantage point. The grey cloak suggests the dissolution of ego, of the need to perform or be seen. The staff keeps him grounded even as he looks upward. Everything about this image communicates <em>deliberate, purposeful withdrawal.</em></p>
<h2>The Hermit Upright: Core Meaning</h2>
<ul>
<li><strong>Deliberate solitude:</strong> Pulling back from noise, advice, and other people's perspectives to access your own</li>
<li><strong>Inner guidance:</strong> The answer you're looking for isn't outside you — it's in the quiet you've been avoiding</li>
<li><strong>Soul-searching:</strong> A period of genuine reflection on what you actually believe, want, and value — separate from what you've been told to want</li>
<li><strong>Mentorship:</strong> Either being mentored by someone older and wiser, or being in a position to guide others with hard-won experience</li>
</ul>
<h2>The Hermit in Love Readings</h2>
<p>The Hermit in love is often misread as a bad sign. It isn't — but it's honest.</p>
<ul>
<li><strong>Single:</strong> This isn't the right moment to seek a relationship from the outside. The card is asking you to develop a relationship with yourself first — your values, your patterns, what you actually want in a partner versus what you've settled for. Rushing into dating now will likely reproduce old patterns.</li>
<li><strong>In a relationship:</strong> One or both people needs space. This isn't rejection — it's the kind of individual time that actually sustains a long-term relationship. If you've been merged or enmeshed, the Hermit asks: who are you when you're not defined by this relationship?</li>
<li><strong>Is someone pulling away?</strong> The Hermit often explains a partner's withdrawal. They may need genuine solitude to process something — pushing for closeness right now will create more distance.</li>
</ul>
<h2>The Hermit in Career Readings</h2>
<p>In career contexts, the Hermit frequently signals:</p>
<ul>
<li>A period of independent work — research, writing, deep focus — that produces something of real value</li>
<li>The need to trust your own expertise rather than constantly seeking validation or consensus</li>
<li>A meaningful transition point: before the next major career move, something needs to be understood internally first</li>
</ul>
<h2>The Hermit Reversed</h2>
<p>Reversed, the Hermit's healthy withdrawal becomes problematic:</p>
<ul>
<li><strong>Isolation as avoidance:</strong> Pulling back not from wisdom but from fear — using solitude as a way not to deal with life</li>
<li><strong>Loneliness:</strong> The isolation has gone too far, or wasn't chosen, and it's become painful rather than productive</li>
<li><strong>Refusing help:</strong> Stubborn refusal to accept guidance, perspective, or connection that would genuinely help</li>
<li><strong>Rejecting the outside world:</strong> A cynicism or withdrawal that closes off possibility rather than creating clarity</li>
</ul>
<h2>Key Combinations</h2>
<ul>
<li><strong>Hermit + The High Priestess:</strong> Profound inner work — both cards indicate a deep inward turn, powerful for understanding unconscious patterns</li>
<li><strong>Hermit + Six of Cups:</strong> Looking back at the past — possibly idealization of what was, or genuinely useful reflection on roots and origins</li>
<li><strong>Hermit + Three of Pentacles:</strong> Tension between the need for solitary development and the necessity of collaboration — both have value here</li>
</ul>
<h2>What the Hermit Is Really Saying</h2>
<p>In a world optimized for stimulation, connection, and constant input, the Hermit is a radical card. It says: <em>the answer is in the quiet you keep running away from.</em></p>
<p>This isn't permanent exile. The Hermit carries a lantern precisely because he intends to find his way back down — and share what he discovered while he was alone. The solitude is purposeful, not permanent. The question is: what will you learn about yourself if you actually stop moving long enough to listen?</p>`
  },
  {
    slug: "wheel-of-fortune-tarot-card-meaning",
    category: "tarot",
    title: "Wheel of Fortune Tarot Card: Cycles, Fate & How to Work With Change",
    title_en: "Wheel of Fortune Tarot Card: Cycles, Fate & How to Work With Change",
    description: "The Wheel of Fortune (X) is the card of cycles, turning points, and the forces larger than yourself. Learn what it means upright and reversed in love, career, and timing questions — and what it's really asking you to accept.",
    keywords: ["wheel of fortune tarot","wheel of fortune tarot meaning","wheel of fortune upright reversed","wheel of fortune tarot love","major arcana X","tarot cycles fate"],
    published_at: "2026-07-02",
    reading_time: 10,
    cta_href: "/tarot",
    cta_label: "🔮 Try an AI Tarot Reading Now",
    cta_label_en: "Try an AI Tarot Reading Now",
    content: `<h2>What Is the Wheel of Fortune?</h2>
<p>The Wheel of Fortune (X) is one of the most visually complex cards in the Major Arcana. The central image is a great wheel, turning. Around its rim are the Hebrew letters TARO (or ROTA, depending on which direction you read), the alchemical symbols for mercury, sulfur, water, and salt. Four winged creatures occupy the corners — an angel (Aquarius), an eagle (Scorpio), a lion (Leo), and a bull (Taurus) — the four fixed signs of the zodiac, each reading from a book. They're stable even as everything around them turns.</p>
<p>At the top of the wheel sits a sphinx. A serpent descends on the left. On the right, Anubis rises. The message is ancient and universal: things change. They always have. They always will. The question is not whether you'll be caught in the turning — you will — but whether you understand the nature of cycles and can work with them rather than against them.</p>
<h2>Wheel of Fortune Upright: Core Meaning</h2>
<ul>
<li><strong>A turning point:</strong> Something significant is shifting — not gradually, but as a genuine pivot</li>
<li><strong>Favorable change:</strong> Upright, the Wheel typically indicates the turn is moving upward — things that have been stuck are beginning to move</li>
<li><strong>Fate and timing:</strong> Some things are simply arriving at their natural time — and fighting that timing is less effective than moving with it</li>
<li><strong>Cycles completing:</strong> What goes around comes around — both in the sense of karma and in the sense of patterns returning to be addressed</li>
</ul>
<h2>Wheel of Fortune in Love</h2>
<ul>
<li><strong>Single:</strong> The Wheel upright is an encouraging sign — a new chapter in your romantic life is beginning. Someone or something is on its way. Don't force it; let the wheel bring what it brings.</li>
<li><strong>In a relationship:</strong> The dynamic between you is shifting into a new phase. This is usually positive — a deepening, a recommitment, a movement toward something more stable after turbulence.</li>
<li><strong>Timing questions:</strong> The Wheel is one of the best cards for "when" questions. Upright, it suggests sooner rather than later — things are already in motion.</li>
</ul>
<h2>Wheel of Fortune in Career</h2>
<p>In career readings, the Wheel often signals:</p>
<ul>
<li>An opportunity arriving at what feels like perfect (or at least right) timing</li>
<li>The results of past efforts becoming visible — something you planted months ago is producing fruit now</li>
<li>A significant shift in circumstances — industry changes, org restructuring, unexpected opportunities — that reshapes what's possible</li>
</ul>
<h2>Wheel of Fortune Reversed</h2>
<p>Reversed, the Wheel's turning becomes a source of difficulty:</p>
<ul>
<li><strong>Bad luck cycle:</strong> Things that seemed to be going well are encountering obstacles; momentum has stalled or reversed</li>
<li><strong>Resistance to change:</strong> Clinging to how things were rather than accepting that the wheel has turned — this resistance creates more suffering than the change itself</li>
<li><strong>External forces dominating:</strong> Feeling powerless, at the mercy of circumstances, unable to influence your own trajectory</li>
<li><strong>Delays:</strong> Something that should be moving forward is stuck — timing is off and forcing it won't help</li>
</ul>
<h2>The Bigger Philosophical Point</h2>
<p>The four stable creatures in the corners — watching the wheel turn from their fixed positions — represent something important. Even within constant change, there are stable principles: integrity, wisdom, consistency of character. The Wheel will turn regardless. What you can control is the quality of who you are as it turns.</p>
<p>This is the card's deepest teaching: <em>you are not your circumstances. You are how you move through them.</em></p>
<h2>Key Combinations</h2>
<ul>
<li><strong>Wheel + The Sun:</strong> A major positive turning point — one of the strongest "good luck" combinations in the deck</li>
<li><strong>Wheel + The Tower:</strong> Sudden, dramatic change — the kind that shakes the foundation</li>
<li><strong>Wheel + Four of Pentacles:</strong> Resistance to necessary change — holding on will make the eventual turn harder, not softer</li>
</ul>`
  },
  {
    slug: "justice-tarot-card-meaning",
    category: "tarot",
    title: "Justice Tarot Card Meaning: Truth, Balance & What the Scales Are Weighing",
    title_en: "Justice Tarot Card Meaning: Truth, Balance & What the Scales Are Weighing",
    description: "Justice (XI) isn't about punishment — it's about truth and consequence. This guide covers the full upright and reversed meanings for love, legal matters, career, and karmic situations, plus what Justice really demands of you.",
    keywords: ["justice tarot card","justice tarot meaning","justice tarot upright reversed","justice tarot love","major arcana XI","tarot justice karma"],
    published_at: "2026-07-03",
    reading_time: 10,
    cta_href: "/tarot",
    cta_label: "🔮 Start Your AI Reading",
    cta_label_en: "Start Your AI Reading",
    content: `<h2>Justice: The Card of Truth and Consequence</h2>
<p>Justice (XI) shows a seated figure — often depicted as female — holding balanced scales in one hand and a double-edged sword raised in the other. She sits between two pillars, similar to the High Priestess but with a crucial difference: where the High Priestess guards mystery, Justice deals in clarity. Her sword is raised, not sheathed. Her scales are balanced, not tipping. Her gaze is direct.</p>
<p>The double-edged sword is significant: it cuts through confusion and pretense, but it also acknowledges that truth can be uncomfortable — it cuts in both directions. Justice doesn't protect anyone from the consequences of their own actions. It simply weighs them accurately.</p>
<h2>Justice Upright: Core Meaning</h2>
<ul>
<li><strong>Cause and effect:</strong> Actions have consequences; what has been set in motion is playing out as it must</li>
<li><strong>Fairness:</strong> An outcome that genuinely reflects what was contributed, done, or deserved</li>
<li><strong>Clarity and truth:</strong> A situation that has been murky or dishonest is becoming clear</li>
<li><strong>Legal and formal matters:</strong> Contracts, legal proceedings, official decisions — often going in favor of whoever has acted with integrity</li>
<li><strong>Accountability:</strong> Being asked (or asking yourself) to honestly account for your role in something</li>
</ul>
<h2>Justice in Love Readings</h2>
<ul>
<li><strong>Single:</strong> Justice in a love reading often signals that past relationship patterns — both your own behavior and others' — are being examined. You may be at a point of reckoning with what you've contributed to relationships that didn't work. This isn't punishment; it's the necessary clarity before something genuinely different can begin.</li>
<li><strong>In a relationship:</strong> An imbalance or unfairness in the dynamic is being addressed. This might be a conversation that finally happens, a mutual recognition of what each person has contributed, or a decision that needs to be made honestly rather than diplomatically.</li>
<li><strong>Separation or divorce:</strong> Justice in these contexts often indicates proceedings that, while difficult, will ultimately be fair. It's also a card that validates seeking an honest resolution over a convenient one.</li>
</ul>
<h2>Justice in Career and Legal Matters</h2>
<p>Justice is particularly strong in contexts involving:</p>
<ul>
<li>Legal disputes, contracts, and formal agreements</li>
<li>Performance reviews, promotions, or compensation decisions</li>
<li>Situations where honesty is being tested — or rewarded</li>
<li>Any circumstance where doing the right thing costs something in the short term</li>
</ul>
<p>Upright Justice tends to favor whoever has acted with integrity. It's a good card to see when you're on the right side of something, and an honest one when you're not.</p>
<h2>Justice Reversed</h2>
<ul>
<li><strong>Injustice:</strong> An outcome that isn't fair — circumstances where the process or the people involved are biased, corrupt, or simply wrong</li>
<li><strong>Accountability avoidance:</strong> Refusing to look honestly at your role in something; blame-shifting or rationalization</li>
<li><strong>Dishonesty:</strong> Either others being dishonest with you, or an invitation to examine where you're not being fully honest with yourself</li>
<li><strong>Delays in legal matters:</strong> Proceedings that are stalled, complicated, or going slower than they should</li>
</ul>
<h2>Justice vs. The Wheel of Fortune</h2>
<p>Both cards deal with consequences, but differently:</p>
<ul>
<li>The <strong>Wheel of Fortune</strong> represents impersonal fate — cycles that turn regardless of merit</li>
<li><strong>Justice</strong> represents earned consequence — what happens as a direct result of specific choices and actions</li>
</ul>
<p>When both appear in a reading, you're in a situation where both impersonal timing AND specific choices are shaping the outcome.</p>
<h2>What Justice Is Really Asking</h2>
<p>Justice asks one fundamental question: <em>Are you willing to be honest — about what happened, about your role in it, about what fairness actually requires?</em></p>
<p>The scales don't tip in your favor because you want them to. They tip based on what's actually true. The most powerful response to this card is always the same: act with integrity, tell the truth, and trust that accurate accounting — even when it's uncomfortable — is the only foundation for anything that lasts.</p>`
  },
  {
    slug: "the-hanged-man-tarot-card-meaning",
    category: "tarot",
    title: "The Hanged Man Tarot Card: Surrender, Perspective & What You're Refusing to See",
    title_en: "The Hanged Man Tarot Card: Surrender, Perspective & What You're Refusing to See",
    description: "The Hanged Man (XII) is the most misunderstood Major Arcana card. It isn't about suffering or punishment — it's about the radical shift in perspective that only comes from voluntary surrender. Full upright and reversed guide.",
    keywords: ["the hanged man tarot","hanged man tarot meaning","hanged man tarot upright reversed","hanged man tarot love","major arcana XII","surrender tarot"],
    published_at: "2026-07-04",
    reading_time: 10,
    cta_href: "/tarot",
    cta_label: "🔮 AI Tarot Reading — See Your Situation Differently",
    cta_label_en: "AI Tarot Reading — See Your Situation Differently",
    content: `<h2>The Most Misunderstood Card in the Deck</h2>
<p>When people first encounter the Hanged Man (XII), the image is jarring: a young man suspended upside down from a living tree by one foot. His other leg is bent, forming a figure-4 shape. His arms are behind his back. He is completely still.</p>
<p>What makes this card unusual isn't the position — it's the expression. He isn't grimacing, straining, or afraid. There's often a halo or light around his head, suggesting illumination. He chose this. This is the card of <em>voluntary suspension</em>, not passive victimhood. And the upside-down perspective is the entire point: you cannot see what he can see from where you're standing.</p>
<h2>The Hanged Man Upright: Core Meaning</h2>
<ul>
<li><strong>Voluntary pause:</strong> Stopping, not because you're forced to, but because continuing without a shift in perspective will lead nowhere</li>
<li><strong>Surrender:</strong> Releasing the need to control an outcome, to be right, or to force movement</li>
<li><strong>New perspective:</strong> What looks like a problem from your current vantage point may look like an opportunity from another angle</li>
<li><strong>Sacrifice for insight:</strong> Something must be given up — comfort, certainty, a fixed position — in order for genuine understanding to emerge</li>
<li><strong>Liminal time:</strong> You're between one thing and another; this in-between space is uncomfortable but necessary</li>
</ul>
<h2>The Hanged Man in Love</h2>
<ul>
<li><strong>Single:</strong> The Hanged Man asks you to stop trying to make love happen and examine why you keep looking for it in the same places or patterns. The insight you need about what's blocking real connection comes from stillness, not more effort.</li>
<li><strong>In a relationship:</strong> A pause in the usual dynamic — someone stepping back, a period of less intensity, or a moment of genuine suspension before a decision — is actually productive right now. The relationship may need this stillness to find its next shape.</li>
<li><strong>Is someone pulling away?</strong> The Hanged Man describes someone who is internally processing, not someone who has left. They are suspended — waiting for their own perspective to shift before they can move again.</li>
</ul>
<h2>The Hanged Man in Career</h2>
<p>In career readings, this card most often appears when:</p>
<ul>
<li>You've been pushing hard and making no progress — because the direction, not the effort, needs to change</li>
<li>A project or plan needs to be put on hold while something external resolves itself</li>
<li>A completely different way of approaching your work is available, but you can only see it if you stop doing what you've always done</li>
</ul>
<h2>The Hanged Man Reversed</h2>
<ul>
<li><strong>Resistance to necessary surrender:</strong> Refusing to give up control of a situation that requires letting go</li>
<li><strong>Stalling without purpose:</strong> Delay that isn't producing insight — just avoiding a decision that needs to be made</li>
<li><strong>Martyrdom:</strong> Performing sacrifice without genuine insight — suffering for show rather than for growth</li>
<li><strong>Missed perspective shift:</strong> The moment to see things differently was available, but it was passed over</li>
</ul>
<h2>The Deeper Meaning: What Is the Tree?</h2>
<p>The Hanged Man hangs from a <em>living</em> tree, not a dead branch. This detail matters enormously: he's connected to something alive, something that continues to grow. His suspension isn't the end. It's the pause that makes the next movement possible.</p>
<p>The card asks: what living thing — a relationship, a belief, a dream — are you willing to hang from, upside down, until you see it from an entirely different angle?</p>
<h2>Key Combinations</h2>
<ul>
<li><strong>Hanged Man + The Star:</strong> Surrender leading to genuine healing and hope — one of the most beautiful combinations for difficult periods</li>
<li><strong>Hanged Man + Four of Swords:</strong> Enforced rest or recovery — the body or mind demanding what the will keeps refusing to give it</li>
<li><strong>Hanged Man + Eight of Cups:</strong> Walking away from something without fully understanding why — the insight will come, but not from here</li>
</ul>`
  },
  {
    slug: "temperance-tarot-card-meaning",
    category: "tarot",
    title: "Temperance Tarot Card Meaning: Balance, Integration & the Middle Path",
    title_en: "Temperance Tarot Card Meaning: Balance, Integration & the Middle Path",
    description: "Temperance (XIV) is the card of integration — of combining opposites into something better than either extreme. Full upright and reversed meanings in love, career, health, and personal alchemy, plus what it means after the Death card.",
    keywords: ["temperance tarot card","temperance tarot meaning","temperance tarot upright reversed","temperance tarot love","major arcana XIV","balance tarot"],
    published_at: "2026-07-05",
    reading_time: 10,
    cta_href: "/tarot",
    cta_label: "🔮 Draw Cards — AI Reads Your Balance",
    cta_label_en: "Draw Cards — AI Reads Your Balance",
    content: `<h2>Temperance: The Alchemist's Card</h2>
<p>Temperance (XIV) shows a large, winged angelic figure — sometimes identified as Archangel Michael or Gabriel — standing with one foot on land and one in water. They pour liquid between two cups, the liquid forming an impossible diagonal stream that defies gravity. A sun rises in the background. There are irises by the water, associated with the rainbow goddess Iris, a messenger between worlds.</p>
<p>Every element of this card speaks to the same idea: combining things that seem incompatible into something new, something that works. The angel isn't doing something passive — they're performing alchemy. This is not easy balance. It's skillful, active integration.</p>
<h2>Temperance Upright: Core Meaning</h2>
<ul>
<li><strong>Integration:</strong> Bringing together two different aspects of yourself, a situation, or a relationship that seem at odds</li>
<li><strong>Patience:</strong> The middle path requires sustained attention — not a one-time decision but ongoing calibration</li>
<li><strong>Moderation:</strong> Not excess in any direction; not the denial of pleasure or desire, but their measured, conscious use</li>
<li><strong>Healing:</strong> Temperance frequently appears during or after a period of recovery — physical, emotional, or situational</li>
<li><strong>Purpose emerging:</strong> The background sun and path suggest that the integration work you're doing has a destination — you're going somewhere, even when movement feels slow</li>
</ul>
<h2>Temperance in Love</h2>
<ul>
<li><strong>Single:</strong> You're integrating past relationship lessons into a new understanding of what you actually need. This isn't the card of imminent romance — it's the card of genuine readiness being built. The next relationship will be different because you are.</li>
<li><strong>In a relationship:</strong> Two very different people (or two very different phases) are finding a way to coexist and complement each other. Temperance validates that the effort of combining your different needs, rhythms, or backgrounds is worth it.</li>
<li><strong>After a difficult period:</strong> A relationship that has been through the Death card (ending, transformation) and arrives at Temperance is in a genuinely new phase — not fixed, but genuinely remade.</li>
</ul>
<h2>Temperance in Career and Health</h2>
<p>In practical contexts, Temperance often signals:</p>
<ul>
<li>A work style or project approach that requires balancing competing priorities — not choosing one at the expense of the other, but genuinely integrating both</li>
<li>Health recovery — physical rehabilitation, mental health stabilization, or any process of returning to homeostasis</li>
<li>A pace that is sustainable rather than dramatic — steady progress beats burnout</li>
</ul>
<h2>Temperance Reversed</h2>
<ul>
<li><strong>Imbalance:</strong> Tipping too far in one direction — overworking/underworking, too much/too little of something important</li>
<li><strong>Excess:</strong> A specific area of your life where moderation has been abandoned</li>
<li><strong>Impatience:</strong> Refusing to allow the slow alchemy of integration to happen — wanting the result now, without the process</li>
<li><strong>Conflict between values:</strong> Two things you want or need that seem genuinely incompatible right now — and the tension is becoming unsustainable</li>
</ul>
<h2>Temperance and the Death Card</h2>
<p>In the Major Arcana sequence, Temperance follows Death (XIII). This placement is deliberate and meaningful: after the ending, dissolution, and transformation of the Death card, Temperance is the beginning of rebuilding — the careful, patient work of integrating what remains into something new.</p>
<p>When these two cards appear together, a major transformation is underway, and the integration work required to consolidate it is both real and worthwhile.</p>
<h2>What Temperance Is Really Asking</h2>
<p>Temperance asks: <em>Can you hold two seemingly opposing things at once — and pour them together until something better emerges?</em></p>
<p>This is the work of alchemy, of therapy, of any lasting change. Not the elimination of what's difficult, but its integration with what's strong. Not balance as a static state, but as an ongoing, active practice.</p>`
  },
  {
    slug: "the-devil-tarot-card-meaning",
    category: "tarot",
    title: "The Devil Tarot Card: Chains, Desire & What You're Refusing to Release",
    title_en: "The Devil Tarot Card: Chains, Desire & What You're Refusing to Release",
    description: "The Devil (XV) is one of the most feared cards in tarot — and one of the most misread. It rarely means evil. More often it means addiction, illusion, and the chains you're wearing by choice. Full upright and reversed guide.",
    keywords: ["the devil tarot card","devil tarot meaning","devil tarot upright reversed","devil tarot love","major arcana XV","addiction tarot","the devil tarot relationship"],
    published_at: "2026-07-06",
    reading_time: 11,
    cta_href: "/tarot",
    cta_label: "🔮 Pull Cards — AI Reads What's Holding You",
    cta_label_en: "Pull Cards — AI Reads What's Holding You",
    content: `<h2>The Most Misread Card in Tarot</h2>
<p>The Devil (XV) is the card that makes people nervous. In the Rider-Waite image, a horned, bat-winged figure sits on a pedestal. Chained to the pedestal below him stand a man and woman — their chains loose enough to remove, though they don't seem to notice. The chains around their necks are decorated with grapes and fire.</p>
<p>Look more closely: the chains <em>are loose</em>. The humans could remove them. They don't. That's the entire message of this card: most of what binds us does so with our implicit cooperation. The devil doesn't force you into captivity. He waits for you to walk in and forget where the door is.</p>
<h2>The Devil Upright: Core Meaning</h2>
<ul>
<li><strong>Bondage by choice:</strong> A pattern, habit, relationship, or belief system that you're maintaining despite its cost to you</li>
<li><strong>Addiction and compulsion:</strong> Not necessarily substances — the Devil covers any compulsive behavior: work, control, approval-seeking, toxic relationships</li>
<li><strong>Materialism:</strong> Defining yourself or your worth through what you own, achieve, or consume</li>
<li><strong>Shadow material:</strong> Aspects of yourself that you've denied or suppressed, which are now exerting disproportionate influence precisely because they're unconscious</li>
<li><strong>Illusion:</strong> Believing that you have less freedom than you actually do</li>
</ul>
<h2>The Devil in Love Readings</h2>
<p>The Devil in love is honest and sometimes confronting:</p>
<ul>
<li><strong>Toxic attraction:</strong> A relationship that pulls at you intensely but consistently makes you smaller, more anxious, or less like yourself — and that you return to despite knowing this</li>
<li><strong>Obsession:</strong> The consuming, intrusive quality of early infatuation that has crossed into something unhealthy</li>
<li><strong>Staying for the wrong reasons:</strong> Fear of loneliness, financial dependence, or the sunk-cost fallacy keeping you in something you know isn't right</li>
<li><strong>Sexual intensity without emotional depth:</strong> A connection that is powerful physically but lacks the other ingredients of genuine partnership</li>
</ul>
<p>The Devil in love doesn't say "leave immediately." It says: <em>look honestly at what you're getting and what it costs. Then decide — with open eyes.</em></p>
<h2>The Devil in Career</h2>
<ul>
<li>A workplace dynamic, pattern, or boss that you recognize as toxic but feel unable to leave</li>
<li>Overwork as a substitute for meaning — grinding as a way of avoiding the question of what you actually want</li>
<li>A deal, contract, or arrangement that serves you materially but compromises something important</li>
</ul>
<h2>The Devil Reversed</h2>
<p>Reversed, the Devil's energy is breaking up — for better or worse:</p>
<ul>
<li><strong>Breaking free:</strong> The chains are coming off. A pattern, addiction, or binding situation is ending — sometimes suddenly, sometimes after long effort</li>
<li><strong>Awakening:</strong> You're seeing clearly, possibly for the first time, what has been controlling you</li>
<li><strong>Detachment:</strong> Beginning to disengage from a compulsive pattern or relationship</li>
<li><strong>Warning:</strong> Sometimes reversed indicates that the bondage is getting worse before it gets better — that the illusion is tightening before the awakening comes</li>
</ul>
<h2>The Devil and The Lovers: A Mirror Pair</h2>
<p>The Devil is often described as a dark mirror of the Lovers (VI). Both show a man, a woman, and a figure above them — but the nature of the figure above is entirely different. The Lovers have an angel; the Devil has, well, the Devil. The Lovers are making a values-aligned choice; the figures in the Devil are avoiding the question of choice entirely.</p>
<p>When both cards appear in a reading, you're at a crossroads between genuine connection (which requires vulnerability and real choice) and the counterfeit of connection (which offers intensity without risk but also without depth).</p>
<h2>What the Devil Is Really Saying</h2>
<p>The Devil rarely means that something external has you trapped. More often, it's pointing at the story you're telling yourself about your own limitations — the belief that you <em>can't</em> leave, <em>can't</em> change, <em>can't</em> survive without this thing that's hurting you.</p>
<p>The loose chains are always there. The question is: <em>when will you notice them?</em></p>`
  },
  {
    slug: "judgement-tarot-card-meaning",
    category: "tarot",
    title: "Judgement Tarot Card Meaning: Awakening, Calling & the Decision That Changes Everything",
    title_en: "Judgement Tarot Card Meaning: Awakening, Calling & the Decision That Changes Everything",
    description: "Judgement (XX) isn't about being judged by an external force — it's about answering an inner call that you've been ignoring. Full upright and reversed meanings in love, career, and major life decisions.",
    keywords: ["judgement tarot card","judgement tarot meaning","judgement tarot upright reversed","judgement tarot love","major arcana XX","awakening tarot"],
    published_at: "2026-07-07",
    reading_time: 10,
    cta_href: "/tarot",
    cta_label: "🔮 Answer Your Call — AI Tarot Reading",
    cta_label_en: "Answer Your Call — AI Tarot Reading",
    content: `<h2>Judgement: The Card of the Inner Call</h2>
<p>The Judgement card (XX) depicts the archangel Gabriel blowing a trumpet above clouds. Below, figures rise from coffins or graves, arms raised, faces lifted toward the angel. The scene echoes the Christian concept of the Last Judgement — the final reckoning, the call that cannot be ignored. In astrology, Judgement corresponds to Pluto, the planet of profound transformation.</p>
<p>But in tarot, the focus isn't on external judgment. It's on the <em>call</em> — the moment when something in you stirs so deeply that continuing as you were becomes impossible. The people rising from their graves aren't being summoned by fear. They're rising because something has finally called them so clearly that not responding is no longer an option.</p>
<h2>Judgement Upright: Core Meaning</h2>
<ul>
<li><strong>Awakening:</strong> A profound realization — about yourself, your life, a relationship, or your path — that you cannot unknow</li>
<li><strong>A calling:</strong> Recognition of a purpose or direction that is genuinely yours, not what others expected or what was convenient</li>
<li><strong>Absolution:</strong> Release from guilt, old patterns, or a past self that no longer serves — you're no longer defined by what you've been through</li>
<li><strong>A major decision:</strong> One with real and lasting consequences, requiring full honesty about who you are and what you value</li>
<li><strong>Transition:</strong> The period just before a major life change — when the old has ended and the new is not yet begun, but the trumpet has sounded</li>
</ul>
<h2>Judgement in Love</h2>
<ul>
<li><strong>Single:</strong> Something about the way you've been approaching love is ending — not through loss, but through awakening. You're about to understand something about yourself in relationships that you couldn't see before. This understanding changes what you're looking for and why.</li>
<li><strong>In a relationship:</strong> Judgement can signal a pivotal moment — a proposal, a decision to commit fully, or a reckoning with whether this relationship truly serves both people. It's the moment of "all in or honestly reassess."</li>
<li><strong>Reconnection:</strong> Judgement sometimes appears when an old connection resurfaces with new meaning — not nostalgia, but genuine reconsideration from a wiser place.</li>
</ul>
<h2>Judgement in Career</h2>
<p>In career contexts, Judgement frequently represents:</p>
<ul>
<li>The moment when a calling — something you've been putting off or not taking seriously — becomes impossible to ignore any longer</li>
<li>A significant evaluation: performance review, board assessment, or public judgment of your work that requires honest reckoning</li>
<li>The transition point between one professional identity and another — not just a job change, but a fundamental shift in how you understand your work</li>
</ul>
<h2>Judgement Reversed</h2>
<ul>
<li><strong>Ignoring the call:</strong> Hearing what you're being summoned toward — and refusing, out of fear, habit, or comfort</li>
<li><strong>Self-doubt blocking action:</strong> Knowing what you need to do but second-guessing yourself into paralysis</li>
<li><strong>Harsh self-judgment:</strong> Using the framework of "reckoning" to punish yourself rather than to learn and move forward</li>
<li><strong>Prolonged transition:</strong> The trumpet has sounded but the rising hasn't happened — being stuck in the in-between</li>
</ul>
<h2>Judgement and The World</h2>
<p>Judgement (XX) is immediately followed by The World (XXI) in the Major Arcana sequence. This is meaningful: the awakening of Judgement, the answering of the call, is what makes the completion and wholeness of The World possible. You cannot arrive at The World without first answering the trumpet.</p>
<h2>What Judgement Is Really Asking</h2>
<p>The question Judgement poses is simple and enormous: <em>What are you being called toward that you keep not answering?</em></p>
<p>The figures in the card aren't rising because they've been forced to. They're rising because the call has finally reached a frequency they can no longer tune out. When this card appears, something in your life — a truth, a direction, a decision — has reached that frequency. The only question left is whether you answer it.</p>`
  }
];

async function main() {
  console.log(`📝 批次P1：写入 ${posts.length} 篇大阿尔卡纳文章...`);
  let success = 0, fail = 0;
  for (const post of posts) {
    const { error } = await supabase.from("mysticai_blog_posts").upsert(post, { onConflict: "slug" });
    if (error) { console.error(`  ❌ [${post.slug}]:`, error.message); fail++; }
    else { console.log(`  ✅ [${post.slug}]`); success++; }
  }
  console.log(`\n完成！成功: ${success}, 失败: ${fail}`);
}
main().catch(console.error);
