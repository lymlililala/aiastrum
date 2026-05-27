import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);
const posts = [
  {
    slug: "pluto-in-aquarius-meaning-generation",
    title: "Pluto in Aquarius (2023–2043) — The Revolutionary Generation's Complete Guide",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Pluto in Aquarius (2023–2043) — The Revolutionary Generation's Complete Guide</h1>
<p>Pluto entered Aquarius in 2023, beginning one of astrology's most anticipated generational shifts. The last time Pluto was in Aquarius was 1778–1798 — the era of the American and French Revolutions, the Industrial Revolution's dawn, and the birth of democracy as we know it. Now, history rhymes again.</p>
<h2>What Does Pluto in Aquarius Mean?</h2>
<p>Pluto transforms everything it touches at the deepest level. Aquarius governs technology, community, humanity, rebellion against authority, and the future. Pluto in Aquarius means: the transformation of technology, society, collective structures, and humanity's relationship with innovation will be absolute and irreversible.</p>
<h2>Major Themes of Pluto in Aquarius</h2>
<ul>
<li><strong>AI and technology revolution:</strong> The total restructuring of work, identity, and social connection through artificial intelligence.</li>
<li><strong>Power to the collective:</strong> Movements that distribute power away from centralized authorities toward communities.</li>
<li><strong>Radical social reorganization:</strong> Old social hierarchies dismantled, new structures emerging from the ground up.</li>
<li><strong>The question of humanity:</strong> What does it mean to be human when machines think? Pluto in Aquarius forces this reckoning.</li>
</ul>
<h2>Who Is the Pluto in Aquarius Generation?</h2>
<p>Children born between 2023–2043 carry Pluto in Aquarius in their natal charts. They will be the generation that rebuilds social systems, masters new technologies as second nature, and transforms collective consciousness in ways we can only begin to imagine.</p>
<h2>How to Work With Pluto in Aquarius Energy</h2>
<p>Align with community. Use technology consciously. Participate in collective transformation. Pluto in Aquarius rewards those who contribute to the greater good rather than hoarding power individually.</p>
</article>`
  },
  {
    slug: "pluto-in-capricorn-natal-chart",
    title: "Pluto in Capricorn in Your Natal Chart — Power, Ambition & Structural Transformation",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Pluto in Capricorn in Your Natal Chart — Power, Ambition & Structural Transformation</h1>
<p>If you were born between 2008–2023, your natal Pluto is in Capricorn. This generational placement shaped your relationship to power, authority, ambition, and the structures of society.</p>
<h2>The Pluto in Capricorn Generation</h2>
<p>Born during the 2008 financial crisis through 2023, this generation grew up witnessing the collapse and questioning of institutions: banking systems, governments, corporations, and traditional career paths. They carry deep skepticism of power structures combined with extraordinary ambition for building something more authentic.</p>
<h2>Collective Themes</h2>
<ul>
<li>Dismantling corrupt or outdated power structures</li>
<li>New models of leadership — authenticity over hierarchy</li>
<li>Deep relationship with work, purpose, and material achievement</li>
<li>Transformation through discipline, persistence, and confronting shadow in high places</li>
</ul>
<h2>Personal Chart Impact</h2>
<p>Which house does Pluto in Capricorn occupy in your natal chart? That house shows where you experience the most intense transformation of structure and power in your lifetime.</p>
<h2>Pluto in Capricorn Transit Legacy</h2>
<p>The 2008–2023 transit coincided with: the global financial crisis, the rise and fall of major corporations, political upheaval worldwide, and the beginning of the AI era. Capricorn structures that were rotten were exposed and dismantled.</p>
</article>`
  },
  {
    slug: "neptune-in-pisces-natal-generation",
    title: "Neptune in Pisces (2012–2025) — The Dreamer Generation's Spiritual Mission",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Neptune in Pisces (2012–2025) — The Dreamer Generation's Spiritual Mission</h1>
<p>Neptune rules Pisces, making its transit through Pisces (2012–2025) an exceptionally potent period. Neptune is at home here — compassion, spirituality, and the dissolution of boundaries are at maximum power. This generation is born with extraordinary sensitivity and a mission of healing.</p>
<h2>The Neptune in Pisces Generation</h2>
<p>Children born 2012–2025 carry Neptune in Pisces natally. They are arriving with thin boundaries between the material and spiritual, heightened empathy, creative imagination, and deep sensitivity to collective suffering. They are the generation of healers.</p>
<h2>Collective Themes During Neptune in Pisces</h2>
<ul>
<li>Rise of spirituality, meditation, and holistic healing</li>
<li>Dissolution of clear national and cultural boundaries</li>
<li>Global compassion movements and humanitarian crises</li>
<li>Confusion about reality (misinformation, deep fakes) — Neptune's shadow side</li>
<li>The opioid epidemic and escapism — also Neptune's shadow</li>
</ul>
<h2>Neptune in Pisces in Your Personal Chart</h2>
<p>Even if you weren't born with Neptune in Pisces, this transit activated a specific house in your chart for over a decade. That house underwent spiritual dissolution and eventual transcendence.</p>
<h2>The Coming Neptune in Aries (2025+)</h2>
<p>Neptune moves into Aries in 2025–2026, beginning a new era of spiritual pioneering. The soft Pisces dreaminess gives way to active, even aggressive, spiritual assertion.</p>
</article>`
  },
  {
    slug: "neptune-in-scorpio-natal-meaning",
    title: "Neptune in Scorpio in Your Natal Chart — The Mystical Intensity Generation",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Neptune in Scorpio in Your Natal Chart — The Mystical Intensity Generation</h1>
<p>Born between 1956–1970, you carry Neptune in Scorpio in your natal chart. This generation is defined by profound psychological depth, fascination with the occult and hidden realms, and a transformative approach to spirituality.</p>
<h2>Neptune in Scorpio: Key Themes</h2>
<p>Scorpio intensifies everything Neptune touches. In Scorpio, Neptune's spiritual quest goes deep — into psychology, sexuality, death and rebirth, mysticism, and the occult. This generation pioneered: depth psychology, the psychedelic exploration of consciousness, occult revival, and transformative approaches to spirituality.</p>
<h2>Collective Expressions</h2>
<ul>
<li>The 1960s spiritual revolution and psychedelic exploration</li>
<li>Jungian psychology going mainstream</li>
<li>The New Age movement's roots</li>
<li>Dark artistic expressions — the birth of rock, horror, and deeply psychological cinema</li>
</ul>
<h2>In Your Personal Chart</h2>
<p>Which house does Neptune in Scorpio fall in your natal chart? That house shows where you experience the deepest spiritual intensity, where you can see beyond the veil, and where fantasy and reality most easily blend.</p>
<h2>Gifts of This Placement</h2>
<p>Extraordinary intuition, capacity for deep transformation, ability to access the unconscious through art or spiritual practice, and resilience through profound loss and renewal.</p>
</article>`
  },
  {
    slug: "uranus-in-taurus-astrology-meaning",
    title: "Uranus in Taurus (2018–2026) — Financial Revolution and Earth Transformation",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Uranus in Taurus (2018–2026) — Financial Revolution and Earth Transformation</h1>
<p>Uranus, the planet of radical change and revolution, entered Taurus in 2018 and remains there through 2026. This transit is reshaping our relationship with money, land, technology's intersection with nature, and our very sense of material security.</p>
<h2>What Uranus in Taurus Means</h2>
<p>Taurus governs money, resources, land, food, and physical pleasure. Uranus disrupts, electrifies, and revolutionizes whatever it transits. The combination creates: radical financial innovation, disruption of traditional economies, technological transformation of agriculture and land use, and revolution in how we value what is tangible.</p>
<h2>Major Manifestations (2018–2026)</h2>
<ul>
<li><strong>Cryptocurrency and digital currency:</strong> The revolution in monetary systems and financial technology.</li>
<li><strong>Supply chain disruptions:</strong> COVID-era shocks to global resource distribution.</li>
<li><strong>Climate crisis and land:</strong> Urgent reckoning with how we treat the physical Earth.</li>
<li><strong>Food technology revolution:</strong> Lab-grown meat, vertical farming, radical agricultural innovation.</li>
</ul>
<h2>Personal Impact</h2>
<p>Uranus in Taurus affects you most strongly if you're a Taurus, Scorpio, Leo, or Aquarius sun, moon, or rising. Check which house Taurus rules in your natal chart — that's where you've experienced the most unexpected upheaval in material matters since 2018.</p>
<h2>What Comes Next: Uranus in Gemini (2026+)</h2>
<p>Uranus moves into Gemini in 2026, beginning a revolution in communication, information, and transportation that will completely transform how we think and connect.</p>
</article>`
  },
  {
    slug: "uranus-in-gemini-2026-astrology",
    title: "Uranus Entering Gemini in 2026 — What This Rare Shift Means for You",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Uranus Entering Gemini in 2026 — What This Rare Shift Means for You</h1>
<p>In 2026, Uranus moves from Taurus into Gemini — a major astrological transition that only occurs every 84 years. The last time Uranus was in Gemini was 1942–1949, the era of WWII, radar, the dawn of computing, and mass communication transformation. The next chapter begins now.</p>
<h2>What Uranus in Gemini Will Transform</h2>
<p>Gemini governs: communication, information, transportation, technology, the mind, and local connections. Uranus in Gemini means all of these areas undergo sudden, dramatic, irreversible revolution.</p>
<h2>Predicted Themes (2026–2033)</h2>
<ul>
<li><strong>Communication revolution:</strong> The way information is created, shared, and consumed transforms completely. Think beyond the internet as we know it.</li>
<li><strong>AI and language:</strong> The relationship between human language and artificial intelligence reaches new thresholds.</li>
<li><strong>Transportation breakthroughs:</strong> Flying vehicles, hyperloop, and new transportation paradigms enter mainstream.</li>
<li><strong>Educational disruption:</strong> How we learn transforms at its foundation.</li>
<li><strong>Mental health reckoning:</strong> Gemini rules the nervous system — revolutionary approaches to mental health emerge.</li>
</ul>
<h2>Who Is Most Affected?</h2>
<p>Gemini, Sagittarius, Virgo, and Pisces signs experience this most intensely. Anyone with significant planetary placements in mutable signs (Gemini, Virgo, Sagittarius, Pisces) should prepare for unexpected breakthroughs in the areas of life those placements rule.</p>
<h2>How to Prepare</h2>
<p>Embrace intellectual flexibility. Build learning adaptability. Develop multiple communication channels and skills. The most adaptable minds will thrive in the Uranus in Gemini era.</p>
</article>`
  },
  {
    slug: "uranus-in-scorpio-natal-meaning",
    title: "Uranus in Scorpio Natal Chart — Transformation, Taboo, and Breaking Sexual Rules",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Uranus in Scorpio Natal Chart — Transformation, Taboo, and Breaking Sexual Rules</h1>
<p>Born between 1974–1981, you carry Uranus in Scorpio natally. This placement shaped a generation with unusual relationship to power, sexuality, death, and the occult — and an instinct to revolutionize all of these realms.</p>
<h2>Uranus in Scorpio: Core Energy</h2>
<p>Uranus brings sudden illumination and rule-breaking to Scorpio's domain of power, sex, death, psychology, and shared resources. This generation broke taboos, pioneered conversations previously unspeakable, and transformed how society approached the darkest and most intimate aspects of human experience.</p>
<h2>Generational Manifestations</h2>
<ul>
<li>Sexual revolution reaching mainstream: AIDS crisis forcing open dialogue about sexuality and death</li>
<li>Psychological and therapeutic revolution</li>
<li>Cybersecurity and hacking culture — the "dark web" pioneers</li>
<li>Financial disruption: later in life, many in this generation shaped the 2008 financial crisis context</li>
</ul>
<h2>Personal Chart Meanings</h2>
<p>Which house holds Uranus in Scorpio in your chart? That's where you break rules, experience sudden transformations, and carry a generational mission to revolutionize how power and depth are handled.</p>
<h2>Gifts and Challenges</h2>
<p>Gifts: profound resilience, ability to navigate taboo, psychological depth, financial innovation.<br>
Challenges: tendency toward obsession, explosive intensity in power dynamics, potential for manipulation or being manipulated.</p>
</article>`
  },
  {
    slug: "neptune-in-capricorn-natal-generation",
    title: "Neptune in Capricorn Natal Chart — The Generation Dissolving Old Structures",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Neptune in Capricorn Natal Chart — The Generation Dissolving Old Structures</h1>
<p>Born between 1984–1998, your natal Neptune is in Capricorn. This generation carries a complex mission: to have spiritual ideals grounded in or in tension with practical reality, and to dissolve the illusions embedded in institutional authority.</p>
<h2>Neptune in Capricorn: The Essence</h2>
<p>Neptune dissolves. Capricorn rules institutions, authority, tradition, and career. Neptune in Capricorn dissolves the substance of those structures — revealing that what we thought was solid is actually built on sand. This generation grew up watching institutions (governments, corporations, religious organizations) fall apart or be exposed as fraudulent.</p>
<h2>Generational Signature</h2>
<ul>
<li>Deep disillusionment with traditional authority and institutions</li>
<li>Idealism embedded in career and ambition — the desire to do work that truly matters</li>
<li>Spiritual seeking through practical means: yoga culture, mindfulness in corporate settings</li>
<li>The dissolution of the work-as-life narrative, pioneering work-life balance</li>
</ul>
<h2>Personal Application</h2>
<p>In your personal chart, Neptune in Capricorn dissolves whatever house Capricorn rules for you — creating both confusion and transcendence in that life area over time.</p>
<h2>The Greatest Gift</h2>
<p>This generation has the extraordinary ability to see through the emperor's new clothes of authority and tradition — and to build something genuinely meaningful from those ruins.</p>
</article>`
  },
  {
    slug: "pluto-in-sagittarius-natal-generation",
    title: "Pluto in Sagittarius Natal Chart (1995–2008) — Truth, Belief & Global Transformation",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Pluto in Sagittarius Natal Chart (1995–2008) — Truth, Belief & Global Transformation</h1>
<p>Born between 1995–2008, your natal Pluto is in Sagittarius. This is the generation that grew up witnessing the globalization of everything, the religious conflicts of the early 21st century, and the birth of the internet as a truth-shattering tool. Their mission: to transform what humanity believes.</p>
<h2>Pluto in Sagittarius: The Core</h2>
<p>Pluto transforms at the deepest level. Sagittarius governs beliefs, religion, philosophy, higher education, truth, and cultural exchange. Pluto's transit through Sagittarius (1995–2008) meant: the total transformation of what we believe, how we access information, and how truth is determined.</p>
<h2>Generational Themes</h2>
<ul>
<li>Coming of age in the post-9/11 world, where religious extremism became a global paradigm</li>
<li>The explosion of the internet making all information (true and false) instantly accessible</li>
<li>Deep questioning of received dogma — religious, educational, political</li>
<li>Global cultural exchange at unprecedented scale</li>
</ul>
<h2>This Generation's Mission</h2>
<p>To find what is genuinely true beneath the noise of infinite competing narratives. To rebuild belief systems that can withstand radical scrutiny. To bridge cultures through direct human connection rather than inherited prejudice.</p>
<h2>Challenges</h2>
<p>Information overload, anxiety from the collapse of reliable authority, existential questioning without resolution. The work of this generation is rebuilding meaningful belief in a post-certainty world.</p>
</article>`
  },
  {
    slug: "outer-planets-birth-chart-guide",
    title: "Outer Planets in Your Birth Chart — Complete Guide to Pluto, Neptune & Uranus",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Outer Planets in Your Birth Chart — Complete Guide to Pluto, Neptune & Uranus</h1>
<p>Pluto, Neptune, and Uranus are the generational planets — they move so slowly that everyone born within several years shares the same sign placement. But the house position and aspects they make in your personal chart are uniquely yours, revealing your individual experience of collective transformation.</p>
<h2>Understanding Generational vs. Personal Influence</h2>
<p>The <strong>sign</strong> of an outer planet describes your entire generation's collective themes. The <strong>house</strong> shows where in your personal life these generational themes play out. The <strong>aspects</strong> to personal planets (Sun, Moon, Venus, Mars) show how intensely this generational energy operates in your individual personality.</p>
<h2>Uranus in Your Chart</h2>
<p>Uranus shows where you carry the urge to revolutionize, break free, innovate, and be authentically different. Close aspects to your Sun or Ascendant make you a notably rebellious, unconventional personality. Uranus in your 7th house makes partnerships full of unexpected changes.</p>
<h2>Neptune in Your Chart</h2>
<p>Neptune shows where you carry the capacity for spiritual transcendence, artistic inspiration, and also where confusion or illusion are greatest risks. Neptune conjunct your Moon creates deep psychic sensitivity. Neptune in your 2nd house blurs your relationship with money and material value.</p>
<h2>Pluto in Your Chart</h2>
<p>Pluto shows where you experience the most transformative, intense, and ultimately empowering experiences of your life. Pluto conjunct your Sun creates a personality driven by power, depth, and constant regeneration. Pluto in the 4th house means family and childhood were intense and transformative.</p>
<h2>How to Work With Outer Planet Transits</h2>
<p>When a transiting outer planet makes a hard aspect to one of your personal planets, expect significant life change in the area involved. These periods — though often challenging — are the times of greatest personal evolution. Work with them rather than against them for the best outcomes.</p>
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
