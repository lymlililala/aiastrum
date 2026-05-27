import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);
const posts = [
  {
    slug: "sun-in-1st-house-natal-chart",
    title: "Sun in the 1st House — Astrology's Most Radiant Placement",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Sun in the 1st House — Astrology's Most Radiant Placement</h1>
<p>When the Sun occupies the 1st house of your natal chart, your identity and life force shine with maximum brightness. This is one of astrology's most powerful placements — here, the ego and soul are fully visible to the world.</p>
<h2>What the 1st House Represents</h2>
<p>The 1st house is the house of self, appearance, and first impressions. It corresponds to Aries and Mars. Whatever planets sit here are projected outward naturally, shaping how others perceive you and how you meet the world.</p>
<h2>Sun in 1st House Personality</h2>
<ul>
<li><strong>Charismatic and attention-commanding:</strong> You walk into a room and people notice.</li>
<li><strong>Self-aware:</strong> Strong sense of identity and personal direction.</li>
<li><strong>Vitality-driven:</strong> High energy, loves physical vitality and self-expression.</li>
<li><strong>Leadership magnetism:</strong> Others naturally gravitate toward you as a leader.</li>
<li><strong>Identity-focused:</strong> The journey of self-definition is a lifelong priority.</li>
</ul>
<h2>Challenges</h2>
<p>Self-centeredness, difficulty sharing the spotlight, and ego sensitivity. When criticized, it feels like an attack on your very identity.</p>
<h2>Career and Life Path</h2>
<p>Excellent for visible roles — performance, leadership, entrepreneurship, brand-building. You need work that lets you shine as an individual.</p>
<h2>Love Compatibility</h2>
<p>Works best with partners who celebrate rather than compete with your shine. Partners with strong 7th house energy (Libra, Venus) can balance your self-focus with relationship awareness.</p>
</article>`
  },
  {
    slug: "sun-in-2nd-house-natal-chart",
    title: "Sun in the 2nd House — Wealth, Values, and Self-Worth in Astrology",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Sun in the 2nd House — Wealth, Values, and Self-Worth in Astrology</h1>
<p>When your Sun falls in the 2nd house, your identity is deeply connected to material security, personal values, and what you own. Your sense of self is built through what you create, earn, and value.</p>
<h2>The 2nd House: House of Possessions and Worth</h2>
<p>The 2nd house governs personal resources — money, possessions, talents, and above all, self-worth. Taurus and Venus rule this house. Here, the question is: what do you value and what do you produce?</p>
<h2>Sun in 2nd House Characteristics</h2>
<ul>
<li><strong>Financial focus:</strong> Building material security is a core life theme.</li>
<li><strong>Value-driven:</strong> You have a strong, stable personal value system.</li>
<li><strong>Sensory appreciation:</strong> Pleasure in quality, beauty, and physical comfort.</li>
<li><strong>Resourceful:</strong> Natural talent for building and accumulating.</li>
<li><strong>Self-worth tied to achievement:</strong> Learning to value yourself beyond what you produce is key growth.</li>
</ul>
<h2>Career Implications</h2>
<p>Finance, banking, real estate, luxury goods, food, art, and anything involving tangible resource creation.</p>
<h2>Lessons for Growth</h2>
<p>Detaching self-worth from net worth. Your value as a person is not measured by your bank account or possessions, though this house energy can make it feel that way.</p>
</article>`
  },
  {
    slug: "sun-in-3rd-house-natal-chart",
    title: "Sun in the 3rd House — Communication, Learning, and Sibling Bonds",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Sun in the 3rd House — Communication, Learning, and Sibling Bonds</h1>
<p>Sun in the 3rd house places your vitality and identity in the realm of communication, ideas, and local connections. Your mind is your superpower, and sharing your thoughts is how you shine.</p>
<h2>3rd House Themes</h2>
<p>Ruled by Gemini and Mercury, the 3rd house governs communication, learning, short travel, siblings, and the immediate environment. It's the house of ideas and information exchange.</p>
<h2>Personality Traits</h2>
<ul>
<li><strong>Intellectually curious:</strong> Never stop learning, always exploring new ideas.</li>
<li><strong>Communicative:</strong> Gifted writer, speaker, or teacher.</li>
<li><strong>Quick-minded:</strong> Fast thinker, fast talker, witty and sharp.</li>
<li><strong>Social:</strong> Active local social life, many acquaintances.</li>
<li><strong>Sibling bonds:</strong> Strong connection to brothers, sisters, cousins.</li>
</ul>
<h2>Career Paths</h2>
<p>Journalism, writing, teaching, public relations, sales, social media, podcasting. Any medium that lets you share ideas.</p>
<h2>Challenges</h2>
<p>Scattered thinking, anxiety from mental overload, and difficulty with depth when breadth is more tempting. Cultivating patience to go deep is your growth work.</p>
</article>`
  },
  {
    slug: "sun-in-4th-house-natal-chart",
    title: "Sun in the 4th House — Home, Family, and Inner Foundations in Astrology",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Sun in the 4th House — Home, Family, and Inner Foundations in Astrology</h1>
<p>When the Sun occupies the 4th house, home, family, and emotional foundations are central to your identity. You shine most brightly in private, and your legacy is often built within family structures.</p>
<h2>4th House Meaning</h2>
<p>The lowest point of the natal chart, the 4th house (IC) represents your roots, home, family of origin, and the foundation you stand on. Cancer and the Moon rule here.</p>
<h2>Key Traits</h2>
<ul>
<li><strong>Family-oriented:</strong> Deep connection to home and ancestry.</li>
<li><strong>Private nature:</strong> Most authentic self is reserved for intimate relationships.</li>
<li><strong>Emotionally deep:</strong> Rich inner emotional life that shapes all decisions.</li>
<li><strong>Nurturing:</strong> Natural caretaker energy for family members.</li>
<li><strong>Homeland attachment:</strong> Strong tie to birthplace or cultural roots.</li>
</ul>
<h2>Career and Ambition</h2>
<p>Often works from home, builds family businesses, or works in real estate, food, heritage, or caregiving fields. Success often comes in the second half of life.</p>
<h2>Lessons</h2>
<p>Learning to step into public visibility rather than hiding your light in domestic privacy. Balancing private fulfillment with broader contribution.</p>
</article>`
  },
  {
    slug: "sun-in-5th-house-natal-chart",
    title: "Sun in the 5th House — Creativity, Romance, and Joy in Astrology",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Sun in the 5th House — Creativity, Romance, and Joy in Astrology</h1>
<p>Sun in the 5th house is one of astrology's most joyful placements. Here, your vitality flows naturally through creativity, romance, play, and self-expression. Life is meant to be enjoyed.</p>
<h2>5th House Themes</h2>
<p>Ruled by Leo and the Sun itself, the 5th house is home territory for solar energy. It governs pleasure, creativity, children, romance, games, performance, and artistic expression.</p>
<h2>Core Traits</h2>
<ul>
<li><strong>Naturally creative:</strong> Artistic expression feels essential, not optional.</li>
<li><strong>Romantic:</strong> Love affairs are intense, dramatic, and meaningful.</li>
<li><strong>Playful:</strong> You never fully lose your childlike spark.</li>
<li><strong>Performative:</strong> Love of the spotlight — theatrical in the best sense.</li>
<li><strong>Child-connected:</strong> Strong bond with children, own or others'.</li>
</ul>
<h2>Career Paths</h2>
<p>Entertainment, arts, athletics, teaching children, creative entrepreneurship, gaming. Any field where creativity and joy intersect with work.</p>
<h2>Love Life</h2>
<p>Romantic experiences are central to personal growth. You learn the most about yourself through love affairs. Watch for dramatic relationship patterns.</p>
<h2>Challenges</h2>
<p>Over-indulgence in pleasure, risk-taking behavior, and difficulty with relationship depth when it stops being exciting.</p>
</article>`
  },
  {
    slug: "sun-in-7th-house-natal-chart",
    title: "Sun in the 7th House — Partnership, Marriage, and the Mirror Self",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Sun in the 7th House — Partnership, Marriage, and the Mirror Self</h1>
<p>Sun in the 7th house is a powerful relationship-oriented placement. Your sense of self is deeply shaped by partnerships — you find yourself through relating to others, and relationships are your primary arena for growth.</p>
<h2>7th House Meaning</h2>
<p>Ruled by Libra and Venus, the 7th house governs committed partnerships, marriage, business alliances, and open enemies. It's the house of "we" as opposed to the 1st house "I."</p>
<h2>Key Traits</h2>
<ul>
<li><strong>Relationship-centered:</strong> Partnerships are the primary context for self-expression.</li>
<li><strong>Balanced and fair:</strong> Strong sense of justice and equality.</li>
<li><strong>Attractive to others:</strong> Naturally draws partners and allies.</li>
<li><strong>Identity through others:</strong> Can over-identify with partner's needs.</li>
<li><strong>Business-savvy:</strong> Excellent at one-on-one professional relationships.</li>
</ul>
<h2>Relationship Patterns</h2>
<p>Often attracts strong, dominant partners because you project your Sun energy outward — you may marry someone who embodies the qualities you're still developing in yourself.</p>
<h2>Growth Lessons</h2>
<p>Developing a strong independent identity while also thriving in partnership. You need both — the "we" and the distinct "I."</p>
</article>`
  },
  {
    slug: "sun-in-8th-house-natal-chart",
    title: "Sun in the 8th House — Transformation, Power, and Depth in Astrology",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Sun in the 8th House — Transformation, Power, and Depth in Astrology</h1>
<p>Sun in the 8th house is one of astrology's most intense and transformative placements. Your identity is forged through profound experiences — death, rebirth, power, and the mysteries beneath the surface.</p>
<h2>8th House Themes</h2>
<p>Ruled by Scorpio and Pluto (and traditionally Mars), the 8th house governs death and rebirth, other people's resources, sexuality, power dynamics, psychology, and occult knowledge.</p>
<h2>Personality Profile</h2>
<ul>
<li><strong>Deeply psychological:</strong> Fascinated by motivation, the unconscious, and hidden truth.</li>
<li><strong>Magnetic:</strong> Powerful, mysterious personal presence.</li>
<li><strong>Transformative:</strong> Life involves multiple radical reinventions.</li>
<li><strong>Research-oriented:</strong> Natural detective who digs beneath the surface.</li>
<li><strong>Intense relationships:</strong> All relationships have depth and power dynamics.</li>
</ul>
<h2>Career Paths</h2>
<p>Psychology, investigation, research, finance (especially other people's money), surgery, occult sciences, crisis work. You excel where others fear to go.</p>
<h2>Life Themes</h2>
<p>Loss and regeneration are recurring themes. Each major ending leads to a powerful new beginning. Phoenix energy is central to your story.</p>
</article>`
  },
  {
    slug: "sun-in-9th-house-natal-chart",
    title: "Sun in the 9th House — Philosophy, Travel, and Higher Truth",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Sun in the 9th House — Philosophy, Travel, and Higher Truth</h1>
<p>Sun in the 9th house is the placement of the eternal seeker. Your identity is built through exploring — philosophies, cultures, religions, and the outer edges of human knowledge and geography.</p>
<h2>9th House Meaning</h2>
<p>Ruled by Sagittarius and Jupiter, the 9th house governs higher education, long-distance travel, philosophy, religion, publishing, law, and the expansion of consciousness.</p>
<h2>Core Characteristics</h2>
<ul>
<li><strong>Philosophical:</strong> Life's meaning and larger truths are central preoccupations.</li>
<li><strong>Adventurous:</strong> International travel and cross-cultural experiences are essential.</li>
<li><strong>Teacher and student:</strong> Both learning and sharing wisdom are life purposes.</li>
<li><strong>Optimistic:</strong> Natural faith in the goodness of the universe.</li>
<li><strong>Multi-cultural:</strong> Thrives in diverse environments, often lives abroad.</li>
</ul>
<h2>Career Paths</h2>
<p>Academia, publishing, law, religion, travel industry, international business, teaching. Your work often bridges cultures or involves knowledge dissemination.</p>
<h2>Challenges</h2>
<p>Dogmatism, overextension, and difficulty with the mundane details of daily life. Practice grounding your expansive vision in practical steps.</p>
</article>`
  },
  {
    slug: "sun-in-10th-house-natal-chart",
    title: "Sun in the 10th House — Career, Status, and Public Achievement",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Sun in the 10th House — Career, Status, and Public Achievement</h1>
<p>Sun in the 10th house is perhaps the most career-focused solar placement. Your identity is inseparable from your public role, achievements, and the legacy you build in the world.</p>
<h2>10th House (Midheaven) Meaning</h2>
<p>The highest point of the natal chart, the 10th house (MC) represents career, public reputation, achievement, authority, and how the world at large sees you. Capricorn and Saturn rule here.</p>
<h2>Personality and Ambitions</h2>
<ul>
<li><strong>Publicly driven:</strong> Your solar energy shines in professional and public contexts.</li>
<li><strong>Authority-oriented:</strong> Natural rise to positions of leadership and influence.</li>
<li><strong>Status-aware:</strong> Reputation and legacy matter deeply to you.</li>
<li><strong>Determined:</strong> Willing to work hard and long for recognition.</li>
<li><strong>Visible:</strong> Often ends up in public-facing or high-profile roles.</li>
</ul>
<h2>Career Best Suits</h2>
<p>Politics, executive leadership, public service, entertainment, medicine, law — anywhere with visible status and authority. Fame often comes naturally.</p>
<h2>Lessons</h2>
<p>The private self (4th house) needs nurturing too. Don't sacrifice home and family entirely on the altar of career achievement. True success includes personal fulfillment.</p>
</article>`
  },
  {
    slug: "sun-in-12th-house-natal-chart",
    title: "Sun in the 12th House — The Hidden Self, Spirituality, and Solitude",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Sun in the 12th House — The Hidden Self, Spirituality, and Solitude</h1>
<p>Sun in the 12th house is astrology's most enigmatic solar placement. Your core identity is hidden — from others and sometimes from yourself. This placement calls you toward spiritual depth, service, and the dissolution of ego.</p>
<h2>12th House Meaning</h2>
<p>Ruled by Pisces and Neptune (and traditionally Jupiter), the 12th house governs hidden matters, spirituality, isolation, institutions (hospitals, prisons), karma, and the unconscious. It is the house of what's invisible.</p>
<h2>The Hidden Sun</h2>
<ul>
<li><strong>Private and self-concealing:</strong> True self rarely shown publicly.</li>
<li><strong>Spiritually inclined:</strong> Deep draw to meditation, mysticism, solitary practices.</li>
<li><strong>Empathic sensitivity:</strong> Absorbs others' energies profoundly.</li>
<li><strong>Behind-the-scenes:</strong> Often works as the power behind the throne rather than in the spotlight.</li>
<li><strong>Karmic purpose:</strong> This lifetime carries strong spiritual mission.</li>
</ul>
<h2>Challenges</h2>
<p>Invisibility complex — feeling unseen even when recognized. Dissolving sense of self, difficulty with healthy ego development. Victim or escapism tendencies.</p>
<h2>Career Paths</h2>
<p>Healthcare, social work, spiritual counseling, writing, music, film, research. Behind-the-scenes creative and service work.</p>
<h2>Gifts of the 12th House Sun</h2>
<p>Access to profound spiritual insight, extraordinary empathy, creative inspiration from the unconscious, and the ability to work with the invisible realms. This is the placement of saints, mystics, and transcendent artists.</p>
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
