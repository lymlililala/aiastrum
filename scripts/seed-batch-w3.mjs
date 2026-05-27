import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);

const posts = [
  {
    slug: "jupiter-in-aries-meaning",
    title: "Jupiter in Aries — Bold Fortune, Pioneer Luck & Fearless Expansion",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Aries — Bold Fortune, Pioneer Luck & Fearless Expansion</h1>
<p>When Jupiter, the planet of abundance and opportunity, lands in Aries — the sign of the bold pioneer — you get an explosive combination of optimism and initiative. This placement rewards courage, first movers, and those willing to take inspired risks.</p>

<h2>Jupiter in Aries Personality Traits</h2>
<p>People born with Jupiter in Aries carry an irrepressible enthusiasm for life. They believe in going first — in business, adventure, and self-development. Their confidence attracts opportunities because they don't wait for permission.</p>
<ul>
<li><strong>Natural entrepreneur</strong>: luck comes through bold initiation</li>
<li><strong>Physical vitality</strong>: health and energy are fortunate</li>
<li><strong>Leadership luck</strong>: being first or leading a charge brings rewards</li>
<li><strong>Impatient growth</strong>: wants expansion immediately, not gradually</li>
</ul>

<h2>Where Jupiter in Aries Brings Luck</h2>
<h3>Career & Business</h3>
<p>Starting new ventures, taking independent leadership roles, entering competitive fields first, and pioneering new territory in their industry. The first-mover advantage is real for this placement.</p>
<h3>Personal Growth</h3>
<p>Physical challenges, new experiences, travel to unfamiliar places, and pushing beyond comfort zones activate the full potential of this placement.</p>
<h3>Relationships</h3>
<p>Direct, bold pursuit of romantic interests. Luck comes to those who ask first and act from authentic desire.</p>

<h2>Jupiter in Aries Transits</h2>
<p>When Jupiter transits Aries (as it did in 2022-2023), the whole world receives this energy: bold action is rewarded, new beginnings are favored, and collective optimism around independence rises.</p>

<h2>Shadow Side</h2>
<p>Jupiter amplifies Aries' tendency toward impulsivity. The shadow is overconfidence, starting too many projects, burning bridges by acting without thinking, or taking risks without adequate preparation.</p>

<h2>Famous Jupiter in Aries</h2>
<p>Many trailblazing entrepreneurs and athletes have this placement — people who changed industries by simply being first and most passionate about what they do.</p>

<h2>Affirmation</h2>
<p><em>"My boldness attracts abundance. I leap and the universe builds the bridge."</em></p>
</article>`
  },
  {
    slug: "jupiter-in-taurus-meaning",
    title: "Jupiter in Taurus — Steady Wealth, Material Abundance & Sensual Fortune",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Taurus — Steady Wealth, Material Abundance & Sensual Fortune</h1>
<p>Jupiter in Taurus combines the planet of expansion with the sign of earthly abundance. This is one of the most naturally fortunate financial placements — wealth grows steadily, sensory pleasures are gifted generously, and the material world responds to patient, persistent effort.</p>

<h2>Core Traits</h2>
<ul>
<li><strong>Patient accumulation</strong>: wealth builds slowly but permanently</li>
<li><strong>Talent for value</strong>: natural eye for what appreciates over time</li>
<li><strong>Sensory gifts</strong>: blessed with beautiful voice, artistic taste, or physical grace</li>
<li><strong>Financial luck</strong>: real estate, tangible assets, and conservative investments favor this placement</li>
</ul>

<h2>Fortune Areas</h2>
<h3>Money & Finances</h3>
<p>Jupiter in Taurus people often accumulate genuine wealth over time. Their conservative approach to money — save, invest wisely, avoid speculation — actually pays off. Real estate, farmland, art, and stable businesses are especially lucky.</p>
<h3>Physical World</h3>
<p>Everything from health to beauty to sensory pleasures is amplified. They may have abundant physical stamina, exceptional cooking talents, or natural skill in all things aesthetic.</p>

<h2>Jupiter in Taurus Transit (2023-2024)</h2>
<p>The 2023-2024 Jupiter in Taurus transit benefited all earth signs and brought collective focus on financial stability, sustainable abundance, and reconnecting with nature's rhythms.</p>

<h2>Shadow</h2>
<p>Jupiter in Taurus can manifest as excessive materialism, hoarding, stubbornness about growth, or over-indulgence in physical pleasures. When abundance becomes possession, it loses its expansive quality.</p>

<h2>Affirmation</h2>
<p><em>"Abundance flows to me steadily and naturally. I build lasting wealth with patience."</em></p>
</article>`
  },
  {
    slug: "jupiter-in-gemini-meaning",
    title: "Jupiter in Gemini — Intellectual Fortune, Communication Luck & Curious Expansion",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Gemini — Intellectual Fortune, Communication Luck & Curious Expansion</h1>
<p>Jupiter in Gemini brings expansion through ideas, words, and connections. This is the placement of the blessed communicator — luck arrives through what you know, who you know, and how well you can translate information into opportunity.</p>

<h2>Core Traits</h2>
<ul>
<li><strong>Intellectual abundance</strong>: endless curiosity that opens doors</li>
<li><strong>Communication gifts</strong>: natural talent for writing, speaking, teaching, selling</li>
<li><strong>Network luck</strong>: the right person at the right time</li>
<li><strong>Multiple streams</strong>: often succeeds through several simultaneous ventures</li>
</ul>

<h2>Fortune Areas</h2>
<h3>Career</h3>
<p>Writing, journalism, media, technology, education, sales, marketing, public speaking. Any work that requires rapid information exchange and the ability to connect with diverse audiences.</p>
<h3>Learning</h3>
<p>Jupiter in Gemini expands through education. Higher learning, language study, certifications — each new piece of knowledge opens a new door of opportunity.</p>

<h2>Jupiter in Gemini Transit (2024-2025)</h2>
<p>The 2024-2025 transit activated collective expansion in AI, communication technology, short-form media, and knowledge economies. Quick pivots and adaptability were rewarded.</p>

<h2>Shadow</h2>
<p>Scattered energy is the main pitfall. Jupiter amplifies Gemini's tendency to start without finishing, to skim many topics without deep mastery, or to use communication skills without substance behind them.</p>

<h2>Affirmation</h2>
<p><em>"Every conversation, idea, and connection carries the seeds of my greatest expansion."</em></p>
</article>`
  },
  {
    slug: "jupiter-in-cancer-meaning",
    title: "Jupiter in Cancer — Emotional Abundance, Family Fortune & Nurturing Luck",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Cancer — Emotional Abundance, Family Fortune & Nurturing Luck</h1>
<p>Jupiter in Cancer is considered an exaltation — one of its most powerful placements. Here, the planet of abundance merges with Cancer's themes of home, family, emotions, and nurturance, creating extraordinary fortune in domestic life, emotional intelligence, and the capacity to care for and uplift others.</p>

<h2>Why Jupiter is Exalted in Cancer</h2>
<p>In traditional astrology, Jupiter reaches its highest expression in Cancer because the nurturing impulse of Cancer perfectly aligns with Jupiter's generosity. Both want to give abundantly and create safety for others. Together, they produce natural leaders in caregiving, education, hospitality, and family creation.</p>

<h2>Core Traits</h2>
<ul>
<li><strong>Family luck</strong>: deeply fortunate family life, often inherits wealth or wisdom from ancestors</li>
<li><strong>Emotional intelligence</strong>: extraordinary capacity for empathy that creates success</li>
<li><strong>Home & real estate</strong>: natural luck with property, home-based businesses, or domestic endeavors</li>
<li><strong>Nurturing success</strong>: thrives in careers caring for others</li>
</ul>

<h2>Fortune Areas</h2>
<h3>Home & Family</h3>
<p>Jupiter in Cancer brings extraordinary blessings around home life — beautiful homes, strong family bonds, ancestral support, and the ability to create nurturing environments that others are drawn to.</p>
<h3>Career</h3>
<p>Healthcare, education, cooking, hospitality, childcare, social work, psychology — any field where emotional attunement is the primary gift. Also real estate and property investment.</p>

<h2>Shadow</h2>
<p>Jupiter in Cancer can over-expand the need for security and emotional comfort — manifesting as excessive caution, clinging to the past, inability to leave comfortable situations that have outgrown their use, or smothering others with too much care.</p>

<h2>Affirmation</h2>
<p><em>"My heart is my greatest fortune. The more I care, the more abundance flows to me."</em></p>
</article>`
  },
  {
    slug: "mars-in-taurus-meaning",
    title: "Mars in Taurus — Steadfast Drive, Sensual Power & Patient Determination",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Mars in Taurus — Steadfast Drive, Sensual Power & Patient Determination</h1>
<p>Mars in Taurus is like a bulldozer on a steady course — slow to start, but nearly impossible to stop once in motion. This placement channels Aries' warrior energy through Taurus' patient, stubborn, earth-moving force. The result is tremendous endurance and the ability to build lasting achievements.</p>

<h2>Core Traits</h2>
<ul>
<li><strong>Unstoppable endurance</strong>: works steadily without burning out</li>
<li><strong>Sensual drive</strong>: pleasure, beauty, and physical comfort motivate action</li>
<li><strong>Financial ambition</strong>: strong drive to accumulate wealth and security</li>
<li><strong>Stubborn persistence</strong>: rarely gives up, even when they should</li>
</ul>

<h2>In Love & Sexuality</h2>
<p>Mars in Taurus is deeply sensual. They pursue love slowly but with complete dedication once committed. Physical touch, sensory pleasure, and consistency are their love language in action. As a partner, they are incredibly loyal but slow to forgive if trust is broken.</p>

<h2>In Career & Money</h2>
<p>Excellent for any work requiring sustained effort, physical skill, or financial acumen. This placement often builds lasting wealth through consistent work. Real estate, agriculture, craftsmanship, finance — anywhere patience compounds into success.</p>

<h2>Shadow Side</h2>
<p>Inflexibility. Mars in Taurus can continue pursuing a failed strategy long past the point of reason simply because they hate changing course. The shadow is stubborn attachment to approach even when it's not working.</p>

<h2>Affirmation</h2>
<p><em>"My steady, patient action builds real and lasting results."</em></p>
</article>`
  },
  {
    slug: "mars-in-gemini-meaning",
    title: "Mars in Gemini — Quick Wit, Mental Agility & Multi-Directional Drive",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Mars in Gemini — Quick Wit, Mental Agility & Multi-Directional Drive</h1>
<p>Mars in Gemini directs its warrior energy through the mind. This is the placement of the sharp debater, the rapid learner, the person who wins through intelligence and adaptability rather than brute force. Energy is mental, scattered, and incredibly fast.</p>

<h2>Core Traits</h2>
<ul>
<li><strong>Mental combat</strong>: wins arguments with wit, logic, and quick thinking</li>
<li><strong>Multitasking energy</strong>: drives multiple projects simultaneously</li>
<li><strong>Communication drive</strong>: motivated to write, speak, teach, debate</li>
<li><strong>Restless action</strong>: needs constant mental stimulation or becomes frustrated</li>
</ul>

<h2>In Love & Relationships</h2>
<p>This placement creates a flirtatious, intellectually stimulating partner who pursues through conversation and wit. They need mental chemistry first — boredom is the relationship killer. They may struggle with commitment if their curiosity is pulling in multiple directions.</p>

<h2>In Career</h2>
<p>Sales, media, communications, technology, journalism, debate, education, or any fast-paced field requiring rapid adaptation. Mars in Gemini succeeds through speed and cleverness, not endurance.</p>

<h2>Shadow</h2>
<p>Scattered action — starting many projects and finishing few. Argument for argument's sake. Using mental agility to avoid emotional vulnerability. Inconsistency that frustrates others.</p>

<h2>Affirmation</h2>
<p><em>"My mind is my greatest tool. I act with intelligence, speed, and adaptability."</em></p>
</article>`
  },
  {
    slug: "mars-in-aquarius-meaning",
    title: "Mars in Aquarius — Revolutionary Drive, Collective Action & Innovative Force",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Mars in Aquarius — Revolutionary Drive, Collective Action & Innovative Force</h1>
<p>Mars in Aquarius fights for ideals, not personal gain. This placement channels warrior energy into collective causes, innovative breakthroughs, and the disruption of outdated systems. It is the activist, the inventor, the rebel with a cause.</p>

<h2>Core Traits</h2>
<ul>
<li><strong>Ideological drive</strong>: fights for principles and collective good</li>
<li><strong>Revolutionary energy</strong>: compelled to change systems, not just navigate them</li>
<li><strong>Intellectual independence</strong>: refuses to be told what to do</li>
<li><strong>Detached action</strong>: can pursue causes without personal attachment</li>
</ul>

<h2>In Love & Relationships</h2>
<p>Mars in Aquarius approaches romance with intellectual distance. They need freedom, equality, and mental stimulation. They can seem emotionally detached but are deeply committed to their values, which include loyalty to their partner as part of their ethical code.</p>

<h2>In Career & Social Impact</h2>
<p>Technology, social change, activism, science, humanitarian work, or any field disrupting the status quo. They thrive in team environments but need intellectual autonomy. Group leadership toward a shared progressive vision brings out their best.</p>

<h2>Shadow</h2>
<p>Detachment that becomes coldness. Rebelliousness for its own sake. Commitment to abstract ideals at the expense of real human connection. The inability to compromise even when compromise would serve the collective goal.</p>

<h2>Affirmation</h2>
<p><em>"I act with purpose and vision. My drive creates positive change for all."</em></p>
</article>`
  },
  {
    slug: "mars-in-pisces-meaning",
    title: "Mars in Pisces — Intuitive Action, Spiritual Drive & Compassionate Force",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Mars in Pisces — Intuitive Action, Spiritual Drive & Compassionate Force</h1>
<p>Mars in Pisces is the most fluid of all Mars placements — action guided by intuition, emotion, and spiritual impulse rather than concrete strategy. This placement can seem elusive or passive, but when aligned with higher purpose, it achieves through inspired surrender and flowing around obstacles.</p>

<h2>Core Traits</h2>
<ul>
<li><strong>Intuitive action</strong>: follows inner knowing rather than external logic</li>
<li><strong>Spiritual motivation</strong>: driven by meaning, healing, and transcendence</li>
<li><strong>Compassionate drive</strong>: acts from love and empathy</li>
<li><strong>Evasive approach</strong>: wins through flexibility and indirect action</li>
</ul>

<h2>In Love</h2>
<p>Deeply romantic, idealistic, and sacrificially loving. Mars in Pisces can give everything to a partner. The shadow is loving an ideal rather than a real person, and staying in unhealthy situations out of compassion or escapism.</p>

<h2>In Career</h2>
<p>Art, music, healing, spiritual work, film, poetry, psychology. Anything that connects to the invisible — emotions, the unconscious, the divine. These people can also be powerfully chameleon-like in careers, adapting to whatever is needed.</p>

<h2>Shadow</h2>
<p>Lack of direction, chronic escapism, acting from confusion or self-deception. The energy leaks when there's no higher purpose channel. Passivity can look like patience, but it's really avoidance of necessary conflict.</p>

<h2>Affirmation</h2>
<p><em>"I flow with inspired purpose. My compassionate action transforms the world."</em></p>
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
