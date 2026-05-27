import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);
const posts = [
  {
    slug: "sun-in-aries-complete-profile",
    title: "Sun in Aries — The Complete Astrology Profile for the Ram",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Sun in Aries — The Complete Astrology Profile for the Ram</h1>
<p>Born between March 21 and April 19, Sun in Aries people are the zodiac's pioneers — first in everything, driven by the pure fire of new beginnings. Understanding your Aries Sun in depth reveals not just your personality, but your soul's purpose in this lifetime.</p>
<h2>The Essence of Aries Sun</h2>
<p>Aries is the first sign of the zodiac, ruled by Mars and associated with the Spring Equinox. It carries the archetype of the Warrior, the Initiator, the Trailblazer. Your core motivation: to be first, to be independent, to take action before others even see the opportunity.</p>
<h2>Core Personality Traits</h2>
<ul>
<li><strong>Initiative and boldness:</strong> You act first, then think — sometimes brilliantly, sometimes impulsively.</li>
<li><strong>Passionate intensity:</strong> Everything you do, you do with full fire. Half-measures feel like defeat.</li>
<li><strong>Competitive spirit:</strong> You need challenge to feel alive. Routine suffocates the Aries soul.</li>
<li><strong>Directness:</strong> What you think, you say. Subtlety and games bore you deeply.</li>
<li><strong>Independence:</strong> You would rather go it alone and fail than succeed with a leash around your neck.</li>
</ul>
<h2>Love and Relationships</h2>
<p>In love, Aries chases enthusiastically and needs a partner who doesn't make it too easy. The thrill of pursuit is important. Once committed, Aries is loyal but needs excitement and independence within the relationship. Best matches: Sagittarius (fire compatibility), Leo (equal spark), Libra (complementary opposite).</p>
<h2>Career and Life Purpose</h2>
<p>Athletics, entrepreneurship, military, surgery, emergency services, any pioneering field. You need to be first, and you need challenges worthy of your fire.</p>
<h2>Aries Shadow Work</h2>
<p>Impulsivity that burns relationships, inability to finish what was boldly started, aggression masking vulnerability. Learning patience and follow-through without losing the fire is the Aries lifetime challenge.</p>
</article>`
  },
  {
    slug: "sun-in-taurus-complete-profile",
    title: "Sun in Taurus — The Complete Astrology Profile for the Bull",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Sun in Taurus — The Complete Astrology Profile for the Bull</h1>
<p>Born between April 20 and May 20, Sun in Taurus people are the zodiac's builders — patient, sensual, reliable, and deeply connected to the material world. Understanding your Taurus Sun reveals a soul here to create enduring beauty and value.</p>
<h2>The Essence of Taurus Sun</h2>
<p>Taurus is ruled by Venus and associated with the full bloom of spring. It carries the archetype of the Builder, the Artisan, the Provider. Your core energy: creating what is beautiful, durable, and genuinely valuable through patient, persistent effort.</p>
<h2>Core Personality Traits</h2>
<ul>
<li><strong>Sensory richness:</strong> You experience the world through taste, touch, beauty, and physical comfort.</li>
<li><strong>Unwavering patience:</strong> You're willing to work for years toward a goal most would abandon in months.</li>
<li><strong>Reliability:</strong> When you give your word, you keep it. This is your most powerful social currency.</li>
<li><strong>Aesthetic sensitivity:</strong> You notice beauty and ugliness more acutely than most signs.</li>
<li><strong>Resistance to change:</strong> Security and stability are oxygen to Taurus — disruption is deeply uncomfortable.</li>
</ul>
<h2>Love and Relationships</h2>
<p>Taurus is one of the most devoted partners in the zodiac — once committed, their loyalty is rock solid. They need physical affection, sensory experiences, and reliable emotional security. Best matches: Virgo (earth harmony), Capricorn (shared values), Scorpio (magnetic opposite).</p>
<h2>Career and Wealth</h2>
<p>Finance, real estate, food, art, music, luxury goods, horticulture. Taurus builds wealth steadily and reliably — they're rarely overnight successes, but their foundation never crumbles.</p>
<h2>Taurus Shadow Work</h2>
<p>Stubbornness that prevents necessary evolution, possessiveness in relationships, over-attachment to material security. Learning to hold things lightly while building soundly is the Taurus paradox to master.</p>
</article>`
  },
  {
    slug: "sun-in-gemini-complete-profile",
    title: "Sun in Gemini — The Complete Astrology Profile for the Twins",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Sun in Gemini — The Complete Astrology Profile for the Twins</h1>
<p>Born between May 21 and June 20, Sun in Gemini people are the zodiac's communicators — quicksilver minds, natural storytellers, and social chameleons who can talk to anyone about anything. Understanding your Gemini Sun reveals the brilliant duality at the heart of your nature.</p>
<h2>The Essence of Gemini Sun</h2>
<p>Gemini is ruled by Mercury and associated with the height of late spring. It carries the archetype of the Communicator, the Messenger, the Twin. Your core energy: gathering information, connecting ideas, and sharing knowledge in ways that illuminate and entertain.</p>
<h2>Core Personality Traits</h2>
<ul>
<li><strong>Mental agility:</strong> You process information faster than almost any other sign. Your mind is always running several thoughts simultaneously.</li>
<li><strong>Versatility:</strong> Multiple interests, multiple skills, multiple friends, multiple projects — you live broadly.</li>
<li><strong>Wit and humor:</strong> You see the funny angle that others miss and can make anyone laugh.</li>
<li><strong>Curiosity:</strong> You need constant new information. Boredom is your kryptonite.</li>
<li><strong>Adaptability:</strong> You can fit into almost any social context and speak almost any social language.</li>
</ul>
<h2>Love and Relationships</h2>
<p>Gemini needs a partner who can keep up mentally and doesn't get upset at their need for variety and social engagement. Intellectual chemistry must precede romantic chemistry. Best matches: Libra (air harmony), Aquarius (shared vision), Sagittarius (complementary opposition).</p>
<h2>Gemini Shadow Work</h2>
<p>Superficiality when depth is needed, inconsistency perceived as unreliability, using wit to avoid emotional vulnerability. Going deep in at least one relationship and one field of expertise is Gemini's growth challenge.</p>
</article>`
  },
  {
    slug: "sun-in-cancer-complete-profile",
    title: "Sun in Cancer — The Complete Astrology Profile for the Crab",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Sun in Cancer — The Complete Astrology Profile for the Crab</h1>
<p>Born between June 21 and July 22, Sun in Cancer people are the zodiac's nurturers — emotionally profound, deeply intuitive, and fundamentally oriented around home, family, and emotional connection. Understanding your Cancer Sun reveals the extraordinary gift of your emotional world.</p>
<h2>The Essence of Cancer Sun</h2>
<p>Cancer is ruled by the Moon and associated with the summer solstice — the peak of light before the turning. It carries the archetype of the Great Mother, the Carer, the Protector. Your core energy: creating safety, nourishing growth, and preserving what is precious.</p>
<h2>Core Personality Traits</h2>
<ul>
<li><strong>Emotional depth:</strong> You feel everything, including what others don't express. Your emotional intelligence is exceptional.</li>
<li><strong>Nurturing instinct:</strong> You instinctively care for those you love with a thoroughness most find remarkable.</li>
<li><strong>Intuition:</strong> Your gut feelings are unusually accurate. Trust them.</li>
<li><strong>Memory:</strong> You remember everything — especially emotional details others forget.</li>
<li><strong>Home-centeredness:</strong> Home is not just where you live; it's how you live. Environment deeply affects your wellbeing.</li>
</ul>
<h2>Love and Relationships</h2>
<p>Cancer loves with their whole heart and needs emotional security in return. They're incredibly devoted partners but need reciprocal care and sensitivity. Best matches: Scorpio (emotional depth resonance), Pisces (water compatibility), Capricorn (complementary grounding).</p>
<h2>Cancer Shadow Work</h2>
<p>Over-protection that becomes control, using moodiness to manipulate, remaining in the shell of the past rather than risking the present. Learning to nurture without smothering and to receive care as gracefully as you give it.</p>
</article>`
  },
  {
    slug: "sun-in-leo-complete-profile",
    title: "Sun in Leo — The Complete Astrology Profile for the Lion",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Sun in Leo — The Complete Astrology Profile for the Lion</h1>
<p>Born between July 23 and August 22, Sun in Leo people are the zodiac's royalty — creative, charismatic, generous-hearted, and radiating with the warmth of the Sun itself. Understanding your Leo Sun reveals a soul whose purpose is to shine, inspire, and lead with love.</p>
<h2>The Essence of Leo Sun</h2>
<p>Leo is ruled by the Sun — the only sign ruled directly by the star at the center of our solar system. It carries the archetype of the King/Queen, the Artist, the Heart. Your core energy: self-expression at its most brilliant, generous, and full.</p>
<h2>Core Personality Traits</h2>
<ul>
<li><strong>Natural charisma:</strong> You walk into a room and people notice. This isn't performance — it's your natural frequency.</li>
<li><strong>Generous spirit:</strong> When you love, you give lavishly — your time, attention, resources, creativity.</li>
<li><strong>Creative expression:</strong> You need creative outlets the way others need food. Without self-expression, you dim.</li>
<li><strong>Loyalty:</strong> Your people are your people forever. Leo loyalty is fierce and lifelong.</li>
<li><strong>Pride:</strong> You have dignity and expect to be treated accordingly. Being dismissed or disrespected wounds deeply.</li>
</ul>
<h2>Love and Relationships</h2>
<p>Leo loves grandly and romantically. They need a partner who celebrates rather than competes with their shine. Best matches: Aries (fire passion), Sagittarius (fire adventure), Aquarius (opposite attraction).</p>
<h2>Leo Shadow Work</h2>
<p>Need for constant admiration, dramatic reactions to perceived slights, difficulty sharing the spotlight. Learning that real royalty uplifts others rather than requiring constant homage is Leo's deepest growth.</p>
</article>`
  },
  {
    slug: "sun-in-virgo-complete-profile",
    title: "Sun in Virgo — The Complete Astrology Profile for the Maiden",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Sun in Virgo — The Complete Astrology Profile for the Maiden</h1>
<p>Born between August 23 and September 22, Sun in Virgo people are the zodiac's perfectionists — analytical, service-oriented, deeply intelligent, and gifted with an eye for detail that approaches genius. Understanding your Virgo Sun reveals a soul here to refine, heal, and serve.</p>
<h2>The Essence of Virgo Sun</h2>
<p>Virgo is ruled by Mercury and associated with the harvest season — the time of careful assessment and refinement. It carries the archetype of the Craftsperson, the Healer, the Servant. Your core energy: bringing order from chaos and making everything work more perfectly.</p>
<h2>Core Personality Traits</h2>
<ul>
<li><strong>Analytical precision:</strong> You see what others miss — the error in the detail, the way to improve the system.</li>
<li><strong>Service orientation:</strong> You derive genuine satisfaction from being useful and helping others function better.</li>
<li><strong>Modesty:</strong> Despite remarkable capabilities, Virgos often undersell themselves.</li>
<li><strong>Discrimination:</strong> You select carefully — friends, environments, words. Quality over quantity always.</li>
<li><strong>Health consciousness:</strong> Mind-body connection is strong; you're keenly aware of how habits affect wellbeing.</li>
</ul>
<h2>Love and Relationships</h2>
<p>Virgo shows love through acts of service and thoughtful attention to detail. They need a partner who appreciates their care without being overwhelmed by their standards. Best matches: Taurus (earth harmony), Capricorn (practical alignment), Pisces (complementary healing).</p>
<h2>Virgo Shadow Work</h2>
<p>Perfectionism that prevents starting, criticism of self and others that damages connection, using helpfulness as a way to avoid authentic vulnerability. Learning to accept imperfection — in self and others — is Virgo's central growth lesson.</p>
</article>`
  },
  {
    slug: "sun-in-libra-complete-profile",
    title: "Sun in Libra — The Complete Astrology Profile for the Scales",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Sun in Libra — The Complete Astrology Profile for the Scales</h1>
<p>Born between September 23 and October 22, Sun in Libra people are the zodiac's diplomats — beautiful-minded, relentlessly fair, gifted with social grace, and fundamentally oriented toward harmony, partnership, and justice. Understanding your Libra Sun reveals a soul here to create balance and beauty in the world.</p>
<h2>The Essence of Libra Sun</h2>
<p>Libra is ruled by Venus and associated with the autumn equinox — the moment of perfect balance between light and dark. It carries the archetype of the Judge, the Artist, the Partner. Your core energy: seeing all perspectives, mediating between them, and creating equilibrium.</p>
<h2>Core Personality Traits</h2>
<ul>
<li><strong>Natural diplomacy:</strong> You instinctively find the middle ground and express it in ways others can accept.</li>
<li><strong>Aesthetic sensibility:</strong> Beauty is not optional for Libra — it's a fundamental need and talent.</li>
<li><strong>Fairness:</strong> Injustice of any kind disturbs you at a cellular level.</li>
<li><strong>Charm:</strong> You're naturally pleasant, well-mannered, and people feel comfortable around you.</li>
<li><strong>Indecisiveness:</strong> Seeing all sides of every question makes choosing sides genuinely difficult.</li>
</ul>
<h2>Love and Relationships</h2>
<p>Partnership is Libra's domain. They thrive in relationships and feel incomplete alone (the gift and the shadow of this placement). Best matches: Gemini (intellectual connection), Aquarius (shared idealism), Aries (dynamic opposite).</p>
<h2>Libra Shadow Work</h2>
<p>People-pleasing to the point of losing self, passive aggression (feeling the injustice but not voicing it directly), indecisiveness causing missed opportunities. Learning to take clear positions, even when it creates temporary disharmony, is Libra's essential growth edge.</p>
</article>`
  },
  {
    slug: "sun-in-scorpio-complete-profile",
    title: "Sun in Scorpio — The Complete Astrology Profile for the Scorpion",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Sun in Scorpio — The Complete Astrology Profile for the Scorpion</h1>
<p>Born between October 23 and November 21, Sun in Scorpio people are the zodiac's transformers — magnetic, psychologically penetrating, intensely emotional, and fundamentally oriented toward the deeper mysteries of life. Understanding your Scorpio Sun reveals a soul of extraordinary depth and power.</p>
<h2>The Essence of Scorpio Sun</h2>
<p>Scorpio is co-ruled by Mars and Pluto, associated with late autumn when the veil between worlds thins. It carries the archetype of the Phoenix, the Shaman, the Detective. Your core energy: going to the depths of what is real, transforming through total immersion in experience.</p>
<h2>Core Personality Traits</h2>
<ul>
<li><strong>Psychological penetration:</strong> You see through facades immediately. Pretense is both visible and repellent to you.</li>
<li><strong>Intensity:</strong> You do nothing halfway. Half-commitment is no commitment at all.</li>
<li><strong>Magnetism:</strong> Your presence is palpable. People either find you magnetic or unsettling — often both.</li>
<li><strong>Loyalty:</strong> To those who earn your trust, you're the most devoted and protective ally imaginable.</li>
<li><strong>Transformation:</strong> You've been through multiple deaths and rebirths in this lifetime already.</li>
</ul>
<h2>Love and Relationships</h2>
<p>Scorpio loves completely or not at all. They need depth, loyalty, and the courage to go to honest dark places together. Best matches: Cancer (emotional depth), Pisces (water resonance), Taurus (magnetic opposite).</p>
<h2>Scorpio Shadow Work</h2>
<p>Jealousy and possessiveness, using vulnerability as a weapon once trusted, holding grudges that eventually poison the self. Learning that releasing control is the most powerful act of transformation available.</p>
</article>`
  },
  {
    slug: "sun-in-sagittarius-complete-profile",
    title: "Sun in Sagittarius — The Complete Astrology Profile for the Archer",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Sun in Sagittarius — The Complete Astrology Profile for the Archer</h1>
<p>Born between November 22 and December 21, Sun in Sagittarius people are the zodiac's philosophers — optimistic, freedom-loving, adventurous, and fundamentally in pursuit of the highest truth available. Understanding your Sagittarius Sun reveals a soul driven by the search for meaning.</p>
<h2>The Essence of Sagittarius Sun</h2>
<p>Sagittarius is ruled by Jupiter and associated with the first days of winter — nature stripped bare, revealing its essential structure. It carries the archetype of the Sage, the Explorer, the Archer. Your core energy: aiming at the highest truth and pursuing it without ceasing.</p>
<h2>Core Personality Traits</h2>
<ul>
<li><strong>Optimism:</strong> Your baseline assumption is that things will work out — and they usually do, partly because of this expectation.</li>
<li><strong>Freedom imperative:</strong> Restrictions — physical, intellectual, social — feel like cages. You require the horizon.</li>
<li><strong>Philosophical mind:</strong> You're always asking why, seeking the meaning beneath the facts.</li>
<li><strong>Directness:</strong> You value truth over comfort. This can be brilliantly refreshing or bluntly hurtful depending on delivery.</li>
<li><strong>Adventure hunger:</strong> New places, new ideas, new perspectives — this is the Sagittarian oxygen.</li>
</ul>
<h2>Love and Relationships</h2>
<p>Sagittarius needs a partner who is also a companion on the adventure — someone who grows alongside them rather than trying to hold them still. Best matches: Aries (fire adventurousness), Leo (fire vision), Gemini (mutable intellectual compatibility).</p>
<h2>Sagittarius Shadow Work</h2>
<p>Commitment avoidance disguised as freedom-seeking, tactless truth-telling that wounds, starting more than finishing, and mistaking movement for growth. Learning that depth in one place sometimes reveals more truth than breadth across a hundred.</p>
</article>`
  },
  {
    slug: "sun-in-capricorn-complete-profile",
    title: "Sun in Capricorn — The Complete Astrology Profile for the Sea Goat",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Sun in Capricorn — The Complete Astrology Profile for the Sea Goat</h1>
<p>Born between December 22 and January 19, Sun in Capricorn people are the zodiac's executives — disciplined, ambitious, responsible, and oriented toward building lasting achievement. Understanding your Capricorn Sun reveals a soul here to master the material world through patient, principled effort.</p>
<h2>The Essence of Capricorn Sun</h2>
<p>Capricorn is ruled by Saturn and associated with the winter solstice — the year's darkest point before the light returns. It carries the archetype of the Elder, the Executive, the Master. Your core energy: building structures that endure and earning authority through demonstrated competence.</p>
<h2>Core Personality Traits</h2>
<ul>
<li><strong>Ambition:</strong> You set serious long-term goals and keep working toward them even when the progress is invisible.</li>
<li><strong>Discipline:</strong> Self-mastery is your gift. You can deny short-term pleasure for long-term gain.</li>
<li><strong>Responsibility:</strong> You take obligations seriously to a degree that others find remarkable.</li>
<li><strong>Practical wisdom:</strong> You're not interested in theory without application. Results are what matter.</li>
<li><strong>Dry wit:</strong> The Capricorn sense of humor is dark, deadpan, and brilliant.</li>
</ul>
<h2>Love and Relationships</h2>
<p>Capricorn shows love through loyalty, material provision, and supporting their partner's ambitions. They need a partner who respects their work and doesn't demand constant emotional performance. Best matches: Taurus (earth solidarity), Virgo (practical harmony), Cancer (complementary nurturing).</p>
<h2>Capricorn Shadow Work</h2>
<p>Emotionally unavailable workaholism, equating worth with achievement, harsh self-judgment and consequent judgment of others. Learning to rest without guilt and love without condition is the Sea Goat's essential inner journey.</p>
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
