import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);

const posts = [
  {
    slug: "jupiter-in-libra-meaning",
    title: "Jupiter in Libra — Harmonious Abundance, Partnership Fortune & Social Grace",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Libra — Harmonious Abundance, Partnership Fortune & Social Grace</h1>
<p>Jupiter in Libra channels the planet of expansion through Libra's themes of beauty, balance, justice, and partnership. This is one of the most socially gifted placements — luck arrives through collaboration, aesthetic sensibility, and the ability to create harmony wherever you go.</p>

<h2>Core Traits & Fortune</h2>
<ul>
<li><strong>Partnership luck</strong>: The right collaborator or life partner exponentially multiplies your success. Business partnerships and marriage are especially blessed.</li>
<li><strong>Diplomatic gifts</strong>: Natural talent for negotiation, mediation, and finding the win-win solution. Legal matters often resolve favorably.</li>
<li><strong>Aesthetic abundance</strong>: Success through beauty — art, design, fashion, interior decoration, and luxury markets.</li>
<li><strong>Social fortune</strong>: Charm and fairness open doors. Who you know matters enormously with this placement.</li>
</ul>

<h2>Jupiter in Libra in Career</h2>
<p>Excellent for: law, public relations, marriage counseling, interior design, fashion, diplomacy, event planning, luxury retail. Any career where social grace and aesthetic judgment are primary skills.</p>

<h2>Jupiter in Libra in Love</h2>
<p>This person thrives in committed partnerships and often achieves their greatest growth through relationship. They attract beautiful, socially accomplished partners. Marriage and official partnerships are particularly fortunate.</p>

<h2>Jupiter in Libra Transit (2028-2029)</h2>
<p>When Jupiter transits Libra, the world benefits from expanded diplomacy, beautiful art and design movements, and collective growth through cooperation rather than competition.</p>

<h2>Shadow</h2>
<p>Over-expansion through too many partnerships without depth. Indecision paralyzes opportunity. People-pleasing prevents the decisive action that growth requires. The trap is seeking approval rather than acting on clear values.</p>

<h2>Affirmation</h2>
<p><em>"My ability to create harmony and beauty is my greatest asset. The right partnerships multiply my abundance."</em></p>
</article>`
  },
  {
    slug: "jupiter-in-scorpio-meaning",
    title: "Jupiter in Scorpio — Transformative Fortune, Hidden Wealth & Intense Growth",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Scorpio — Transformative Fortune, Hidden Wealth & Intense Growth</h1>
<p>Jupiter in Scorpio takes the planet of abundance into the depths — this placement seeks growth through transformation, investigation, and the willingness to dive into what others avoid. Fortune comes through intensity, shared resources, and the ability to regenerate from endings.</p>

<h2>Core Traits & Fortune</h2>
<ul>
<li><strong>Hidden wealth</strong>: Often benefits from inheritance, shared finances, insurance, or other people's resources</li>
<li><strong>Investigative genius</strong>: Luck through research, psychology, occult knowledge, or following hidden information to its source</li>
<li><strong>Transformative power</strong>: Each major loss or ending contains seeds of greater abundance</li>
<li><strong>Sexual magnetism</strong>: Physical and psychological intensity creates powerful attractions and opportunities</li>
</ul>

<h2>Jupiter in Scorpio in Career</h2>
<p>Psychology, therapy, investigation, finance, taxes, insurance, surgery, research, occult services, crisis management, or any field requiring deep diving into hidden matters. These people often access information and resources others cannot.</p>

<h2>Jupiter in Scorpio in Love</h2>
<p>Intensity is the love language. They attract (and are attracted by) people with depth, mystery, and transformative potential. Relationships often involve shared finances, deep psychological bonding, or facing major challenges together that ultimately strengthen both people.</p>

<h2>Shadow</h2>
<p>Jupiter amplifies Scorpio's obsessive tendencies — control issues, jealousy, and using power over others for personal gain. The shadow is ruthless pursuit of expansion at the cost of others, or becoming consumed by one's own power.</p>

<h2>Affirmation</h2>
<p><em>"I embrace transformation as my greatest fortune. From every depth, I rise with greater wisdom and abundance."</em></p>
</article>`
  },
  {
    slug: "jupiter-in-sagittarius-meaning",
    title: "Jupiter in Sagittarius — Maximum Fortune, Philosophical Expansion & Freedom Luck",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Sagittarius — Maximum Fortune, Philosophical Expansion & Freedom Luck</h1>
<p>Jupiter in Sagittarius is one of the most powerful placements in astrology — Jupiter is the traditional ruler of Sagittarius, meaning it is in its own sign and operating at full strength. This placement brings the most expansive, optimistic, and fortunate expression of Jupiter's gifts.</p>

<h2>Why Jupiter is Powerful in Sagittarius</h2>
<p>Jupiter rules Sagittarius, giving it complete comfort and expression in this sign. The result is natural luck, wide-ranging opportunities, philosophical depth, and an infectious optimism that attracts success. These people seem to be protected by the universe in ways others don't quite understand.</p>

<h2>Core Traits & Fortune</h2>
<ul>
<li><strong>Natural luck</strong>: Things work out — often in dramatic, seemingly miraculous ways</li>
<li><strong>Adventure and travel</strong>: International connections, foreign cultures, and long journeys bring fortune</li>
<li><strong>Philosophical wisdom</strong>: Deep meaning-making ability; often becomes a teacher or mentor to many</li>
<li><strong>Academic and religious success</strong>: Higher education, publishing, and spiritual leadership are blessed</li>
<li><strong>Entrepreneurial boldness</strong>: Confident enough to take risks others won't — and it pays off</li>
</ul>

<h2>Jupiter in Sagittarius in Career</h2>
<p>Academia, travel industry, publishing, law, religion, philosophy, international business, coaching, motivational speaking. Any field involving expansion of ideas or physical horizons.</p>

<h2>Shadow</h2>
<p>Over-confidence and excess. The shadow is assuming luck will always rescue poor planning, over-promising what you can't deliver, or becoming preachy with philosophies that serve self rather than others.</p>

<h2>Jupiter in Sagittarius Transit</h2>
<p>When Jupiter transits its home sign Sagittarius (most recently 2018-2019), the world experiences a peak of optimism, international connection, and philosophical expansion.</p>

<h2>Affirmation</h2>
<p><em>"The universe conspires in my favor. My adventurous spirit and generous heart attract boundless opportunity."</em></p>
</article>`
  },
  {
    slug: "jupiter-in-capricorn-meaning",
    title: "Jupiter in Capricorn — Disciplined Abundance, Earned Fortune & Structural Growth",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Capricorn — Disciplined Abundance, Earned Fortune & Structural Growth</h1>
<p>Jupiter in Capricorn is a placement that requires patience — but rewards it extraordinarily. Unlike Jupiter in fire or air signs, luck here doesn't fall from the sky. It is earned systematically through discipline, responsibility, and building solid foundations. This is Jupiter in its most practical form.</p>

<h2>Jupiter Meets Saturn's Domain</h2>
<p>Capricorn is ruled by Saturn — the planet of structure, discipline, and earned rewards. Jupiter in this sign must work within Saturn's principles: patience, proven methods, step-by-step progress. The result is abundance that lasts — not windfalls, but built wealth that compounds over decades.</p>

<h2>Core Traits & Fortune</h2>
<ul>
<li><strong>Career advancement</strong>: Fortune comes through professional reputation, consistent performance, and climbing the right ladders deliberately</li>
<li><strong>Financial discipline</strong>: The ability to save, invest wisely, and compound small gains into large wealth over time</li>
<li><strong>Institutional success</strong>: Luck in large organizations, government, established structures, and long-standing institutions</li>
<li><strong>Leadership by example</strong>: Success through demonstrating competence and being the reliable cornerstone others build on</li>
</ul>

<h2>Jupiter in Capricorn in Career</h2>
<p>Corporate leadership, government, real estate, banking, law, project management, architecture. Any field where systematic execution and long-term reliability are rewarded. Often reaches peak success later in life after methodical building.</p>

<h2>Shadow</h2>
<p>Jupiter in Capricorn can become excessively achievement-focused, sacrificing relationships and joy for status. The shadow is working endlessly toward goals that never feel "enough," or using practical success as a substitute for emotional fulfillment.</p>

<h2>Jupiter in Capricorn Transit (2019-2020)</h2>
<p>The 2019-2020 transit asked the world to build sustainable structures rather than speculative bubbles — significant given the global events of that period that tested the strength of existing systems.</p>

<h2>Affirmation</h2>
<p><em>"Every disciplined action I take today builds the extraordinary abundance of my future. Steady progress is my power."</em></p>
</article>`
  },
  {
    slug: "jupiter-in-aquarius-meaning",
    title: "Jupiter in Aquarius — Collective Fortune, Innovation Luck & Humanitarian Expansion",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Aquarius — Collective Fortune, Innovation Luck & Humanitarian Expansion</h1>
<p>Jupiter in Aquarius is the futurist's placement — luck and growth come through embracing what's ahead, contributing to the collective good, and disrupting what no longer serves humanity's evolution. This is the placement of visionary leaders, technology pioneers, and those who grow by lifting others.</p>

<h2>Core Traits & Fortune</h2>
<ul>
<li><strong>Innovation luck</strong>: Fortune through technology, new ideas, and systems that don't yet exist but need to</li>
<li><strong>Network abundance</strong>: Growth comes through community, group endeavors, and collective movements</li>
<li><strong>Intellectual freedom</strong>: The ability to think differently from the crowd is a competitive advantage</li>
<li><strong>Humanitarian success</strong>: Those who align their fortune with improving conditions for others find the greatest expansion</li>
<li><strong>Social influence</strong>: Natural ability to rally groups around shared visions</li>
</ul>

<h2>Jupiter in Aquarius in Career</h2>
<p>Technology, social entrepreneurship, nonprofits, activism, politics, scientific research, astrology and metaphysics, media, community organizing. Any field that aims to improve society or leverage collective intelligence.</p>

<h2>Jupiter in Aquarius in Love</h2>
<p>Needs a mentally stimulating, progressive partner who shares their values. Love must include friendship, intellectual respect, and shared ideals. Traditional relationship structures may feel limiting — open minds and innovative arrangements can work well.</p>

<h2>Jupiter in Aquarius Transit (2020-2021)</h2>
<p>The 2020-2021 transit coincided with dramatic technological expansion, collective response to global challenges, and accelerated social movements — perfectly aligned with Aquarius themes.</p>

<h2>Shadow</h2>
<p>Detachment from personal relationships in favor of abstract ideals. Rebelliousness for its own sake. Spreading energy across too many collective causes without depth or follow-through.</p>

<h2>Affirmation</h2>
<p><em>"My visionary mind and commitment to the collective good are my greatest sources of abundance and impact."</em></p>
</article>`
  },
  {
    slug: "jupiter-in-pisces-meaning",
    title: "Jupiter in Pisces — Spiritual Fortune, Compassionate Abundance & Mystical Expansion",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Pisces — Spiritual Fortune, Compassionate Abundance & Mystical Expansion</h1>
<p>Jupiter in Pisces is another of its traditional rulerships (Jupiter ruled Pisces before Neptune was discovered). This gives the placement extraordinary spiritual gifts — fortune comes through compassion, creativity, healing, and the ability to tap into collective dreams and longings.</p>

<h2>Why Jupiter is Powerful in Pisces</h2>
<p>As traditional ruler, Jupiter operates with ease and depth in Pisces. The result is boundless compassion, profound spiritual insight, and an unusual capacity to help others heal and transcend their limitations. These people often touch many lives in ways they barely perceive.</p>

<h2>Core Traits & Fortune</h2>
<ul>
<li><strong>Spiritual gifts</strong>: Exceptional intuition, psychic sensitivity, and access to divine guidance</li>
<li><strong>Creative abundance</strong>: Music, poetry, film, and healing arts flow naturally and attract success</li>
<li><strong>Compassionate success</strong>: The more genuinely they help others, the more abundance flows back</li>
<li><strong>Faith rewards</strong>: Trusting in invisible support brings actual support in mysterious ways</li>
<li><strong>Universal connection</strong>: Ability to tap into collective consciousness for creativity and healing</li>
</ul>

<h2>Jupiter in Pisces in Career</h2>
<p>Healing arts, music, film, poetry, spiritual counseling, meditation teaching, charity work, oceanography, photography. Any field connecting to the invisible realms — the unconscious, the divine, the oceanic depths of human feeling.</p>

<h2>Jupiter in Pisces in Love</h2>
<p>Deeply romantic and spiritually connected partnerships. Love feels fated, almost mystical. They can give to partners unconditionally — but need to avoid martyrdom and loving ideals rather than real people.</p>

<h2>Jupiter in Pisces Transit (2021-2022)</h2>
<p>The 2021-2022 transit brought collective spiritual seeking, expanded art and music movements, and increasing interest in healing, mental health, and spiritual practices worldwide.</p>

<h2>Shadow</h2>
<p>Escapism and lack of boundaries. Jupiter amplifies Pisces' tendency to dissolve rather than build, to dream without acting, or to give so freely that there's nothing left for oneself. Addiction risks are heightened.</p>

<h2>Affirmation</h2>
<p><em>"My compassion is boundless, my creativity divine. The universe meets my spiritual generosity with infinite abundance."</em></p>
</article>`
  },
  {
    slug: "page-of-swords-tarot-meaning",
    title: "Page of Swords Tarot — Curious Intelligence, Watchful Observation & Mental Beginnings",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Page of Swords Tarot — Curious Intelligence, Watchful Observation & Mental Beginnings</h1>
<p>The Page of Swords stands on a windswept hill, sword raised and gaze alert — scanning the horizon with sharp-eyed vigilance. Unlike the confident Knight or commanding King, this Page is at the beginning of their mental journey: gathering information, questioning everything, and preparing to act once they understand the full picture.</p>

<h2>Card Description & Symbolism</h2>
<p>The Page's sword points upward, ready but not yet striking. He is turned slightly as if watching from multiple angles. The wind tosses the trees behind him — his mind never stops moving. Birds fly in the stormy sky, symbols of quick-moving thoughts and ideas.</p>
<ul>
<li><strong>Raised sword</strong>: readiness to defend truth and cut through deception</li>
<li><strong>Watchful stance</strong>: gathering intelligence before acting</li>
<li><strong>Windswept environment</strong>: a mind always in motion</li>
<li><strong>Young figure</strong>: a beginner in the realm of intellect and communication</li>
</ul>

<h2>Upright Page of Swords Meaning</h2>
<p>The Page of Swords upright represents the archetype of the curious student, the researcher, the gossip who watches everything, the young person with sharp wit and endless questions. He or she is intelligent, observant, and has a talent for seeing through pretense — but sometimes uses that gift to stir up trouble.</p>
<h3>Core Upright Qualities</h3>
<ul>
<li>Intellectual curiosity and eagerness to learn</li>
<li>Sharp observation and analytical thinking</li>
<li>Communication beginning — writing, speaking, new ideas forming</li>
<li>Youthful wit and clever humor</li>
<li>Tendency to gather information before committing</li>
</ul>

<h2>Love & Relationships — Upright</h2>
<p>In love readings, the Page of Swords often represents someone still figuring out what they want in relationships. They analyze rather than feel, might send mixed signals (all that watching and waiting), and need a partner who appreciates their intelligence without being threatened by endless questions.</p>

<h2>Career — Upright</h2>
<p>Beginning writers, students, researchers, analysts, journalists. This card often appears when starting a project that requires significant research and preparation before execution. A new idea is forming — trust the process of gathering information.</p>

<h2>Reversed Page of Swords</h2>
<p>Reversed: gossip, spreading rumors, using sharp tongue to wound, all talk with no action, overthinking preventing any actual progress. The mental energy turns against its owner or others.</p>

<h2>Yes or No?</h2>
<p><strong>Upright: Maybe</strong> — more information needed before a clear answer emerges.<br><strong>Reversed: No</strong> — the situation is murkier than it appears; deception or overthinking clouds the path.</p>

<h2>Affirmation</h2>
<p><em>"My curious mind is my greatest asset. I observe, learn, and prepare to act with precision."</em></p>
</article>`
  },
  {
    slug: "page-of-pentacles-tarot-meaning",
    title: "Page of Pentacles Tarot — Diligent Study, Practical Dreams & Material Beginnings",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Page of Pentacles Tarot — Diligent Study, Practical Dreams & Material Beginnings</h1>
<p>The Page of Pentacles stands in a lush meadow, holding a large golden pentacle before him with focused admiration. Unlike pages of other suits who are in motion, this Page is still — studying the pentacle with the absorbed attention of a student who wants to understand something deeply before proceeding.</p>

<h2>Card Description & Symbolism</h2>
<p>He stands amidst blooming flowers and fertile land, suggesting that material opportunities surround him. His gaze is fixed on the pentacle rather than the horizon — he is not yet ready to rush into action, but is preparing thoughtfully.</p>
<ul>
<li><strong>Pentacle held up</strong>: studying and learning about material opportunity</li>
<li><strong>Fertile landscape</strong>: abundance available to those who prepare properly</li>
<li><strong>Still, focused stance</strong>: patience and deliberate learning</li>
<li><strong>Green cap and robe</strong>: earth energy, growth, practical orientation</li>
</ul>

<h2>Upright Page of Pentacles Meaning</h2>
<p>The Page of Pentacles upright is the dedicated student, the careful learner, the person beginning their financial education or vocational training. He is diligent, patient, and willing to start at the bottom and work his way up. He takes material matters seriously and approaches new financial or career opportunities with respect and study rather than rushing in.</p>
<h3>Core Upright Qualities</h3>
<ul>
<li>Dedication to learning and skill development</li>
<li>Careful, patient approach to financial beginnings</li>
<li>Groundedness and practicality</li>
<li>Willingness to study, apprentice, and start from zero</li>
<li>Responsible with resources even at a young/beginner stage</li>
</ul>

<h2>Love & Relationships — Upright</h2>
<p>In love, the Page of Pentacles is a reliable, grounded energy — perhaps not the most exciting, but deeply dependable. They take relationships seriously, don't rush into things, and show love through consistent presence and practical acts of care.</p>

<h2>Career & Money — Upright</h2>
<p>New job, apprenticeship, going back to school, starting vocational training, or beginning a savings plan. This card appears at the genuine beginning of a financial or career journey — it's not instant, but it's real. The dedication you invest now builds lasting wealth.</p>

<h2>Reversed Page of Pentacles</h2>
<p>Reversed: laziness, procrastination, failure to apply practical skills, wasted opportunity, poor financial decisions made without adequate preparation. All potential, no follow-through.</p>

<h2>Yes or No?</h2>
<p><strong>Upright: Yes</strong> — begin the practical work; the foundation is being laid.<br><strong>Reversed: Not yet</strong> — more preparation or commitment is needed before proceeding.</p>

<h2>Affirmation</h2>
<p><em>"I learn diligently and build steadily. Every small, practical step I take today creates lasting abundance."</em></p>
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
