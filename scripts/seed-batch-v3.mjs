import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);

const posts = [
  {
    slug: "jupiter-in-aries-meaning",
    title: "Jupiter in Aries — Bold Expansion, Pioneering Fortune & Fearless Growth",
    description: "Jupiter in Aries in your birth chart amplifies courage, leadership, and the urge to pioneer. Learn how this expansive fire placement shapes luck, philosophy, and opportunity.",
    keywords: ["jupiter in aries", "jupiter in aries meaning", "jupiter aries natal", "jupiter in aries luck"],
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Aries</h1>
<p>Jupiter is the planet of expansion, luck, wisdom, and abundance. In Aries — the trailblazer of the zodiac — Jupiter's gifts come through <em>bold, first-mover action</em>. Fortune favors the brave here.</p>
<h2>Core Themes</h2>
<ul>
<li><strong>Luck through leadership:</strong> Opportunities arise when you step forward first and take initiative</li>
<li><strong>Philosophical independence:</strong> Your wisdom comes from direct experience, not second-hand knowledge</li>
<li><strong>Competitive advantage:</strong> You thrive when there's a challenge to overcome or a new territory to conquer</li>
<li><strong>Generous courage:</strong> Inspire others through your willingness to take risks they won't</li>
</ul>
<h2>Gifts</h2>
<p>Natural entrepreneurial energy. Luck often arrives quickly — opportunities don't build slowly; they appear suddenly when you leap. Athletic ability, physical vitality, and the drive to start projects that others complete. Enthusiasm that's genuinely contagious.</p>
<h2>Shadow</h2>
<ul>
<li>Overconfidence leading to reckless expansion</li>
<li>Starting too many things; difficulty with sustained effort after the exciting beginning</li>
<li>Impatience with slower-moving opportunities</li>
</ul>
<h2>How to Work With This Energy</h2>
<p>Trust your instinct to move first. The window closes faster for you than for other Jupiter placements. When opportunity knocks, hesitation is your greatest enemy. Build strategic partnerships with people who bring the follow-through energy you sometimes lack.</p>
<h2>Quick Reference</h2>
<ul><li><strong>Lucky domains:</strong> Sports, entrepreneurship, leadership</li><li><strong>Luck trigger:</strong> Taking the initiative</li><li><strong>Element:</strong> Fire</li></ul>
</article>`
  },
  {
    slug: "jupiter-in-taurus-meaning",
    title: "Jupiter in Taurus — Abundant Prosperity, Sensory Pleasure & Patient Wealth",
    description: "Jupiter in Taurus brings slow-built but lasting abundance. Learn how this earth placement shapes financial luck, pleasure, and the path to genuine prosperity.",
    keywords: ["jupiter in taurus", "jupiter in taurus meaning", "jupiter taurus natal", "jupiter in taurus wealth"],
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Taurus</h1>
<p>In Taurus, Jupiter's expansive energy settles into the earth and grows like a great tree — slowly, steadily, and with extraordinary yield over time. This is one of the most materially fortunate Jupiter placements.</p>
<h2>Core Themes</h2>
<ul>
<li><strong>Gradual, lasting wealth:</strong> Fortune builds through patience and consistent effort</li>
<li><strong>Sensory abundance:</strong> Luck through beauty, food, art, nature, and physical pleasure</li>
<li><strong>Financial wisdom:</strong> A natural understanding of how to grow and preserve resources</li>
<li><strong>Value creation:</strong> Ability to identify what is truly worth investing in</li>
</ul>
<h2>Gifts</h2>
<p>Exceptional talent for real estate, finance, art, food, and luxury sectors. Natural magnetism for financial stability — money tends to stick. Generous hosts who create environments of beauty and comfort. Strong aesthetic sense that can become a professional asset.</p>
<h2>Shadow</h2>
<ul>
<li>Over-attachment to security blocking necessary risk-taking</li>
<li>Overindulgence in food, pleasure, or luxury</li>
<li>Slow to recognize when enough is enough</li>
</ul>
<h2>Quick Reference</h2>
<ul><li><strong>Lucky domains:</strong> Finance, real estate, luxury, food</li><li><strong>Luck trigger:</strong> Patient cultivation and quality focus</li><li><strong>Element:</strong> Earth</li></ul>
</article>`
  },
  {
    slug: "jupiter-in-gemini-meaning",
    title: "Jupiter in Gemini — Intellectual Expansion, Curious Fortune & Communication Gifts",
    description: "Jupiter in Gemini expands through learning, communication, and connection. Discover how this Mercury-ruled placement brings luck through information and versatility.",
    keywords: ["jupiter in gemini", "jupiter in gemini meaning", "jupiter gemini natal", "jupiter gemini 2024 2025"],
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Gemini</h1>
<p>Jupiter in Gemini is the placement of the perpetually curious mind. Expansion happens through ideas, conversations, learning, and the accumulation of knowledge from diverse sources.</p>
<h2>Core Themes</h2>
<ul>
<li><strong>Luck through learning:</strong> Education, courses, and intellectual exploration open doors</li>
<li><strong>Communication as currency:</strong> Writing, speaking, teaching, and networking generate opportunity</li>
<li><strong>Versatile intelligence:</strong> Ability to see connections between disparate fields</li>
<li><strong>Social mobility:</strong> The right conversation at the right time can change everything</li>
</ul>
<h2>Gifts</h2>
<p>Exceptional communicators — writers, journalists, teachers, comedians, and storytellers. Multiple income streams from diverse talents. The ability to synthesize information from many sources into something valuable. Luck in short-distance travel and local connections.</p>
<h2>Note for 2024-2025</h2>
<p>Jupiter entered Gemini in May 2024 and remains through June 2025, making this one of the most intellectually and communicatively abundant periods. Those born with Jupiter in Gemini experience their Jupiter Return during this window.</p>
<h2>Quick Reference</h2>
<ul><li><strong>Lucky domains:</strong> Writing, teaching, media, local travel</li><li><strong>Luck trigger:</strong> Learning and sharing knowledge</li><li><strong>Element:</strong> Air</li></ul>
</article>`
  },
  {
    slug: "jupiter-in-cancer-meaning",
    title: "Jupiter in Cancer — Emotional Abundance, Home Fortune & Nurturing Generosity",
    description: "Jupiter is exalted in Cancer — its most powerful expression. Learn how this placement creates extraordinary emotional intelligence, family luck, and nurturing abundance.",
    keywords: ["jupiter in cancer", "jupiter in cancer meaning", "jupiter exalted cancer", "jupiter cancer natal"],
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Cancer</h1>
<p>Jupiter is exalted in Cancer — traditionally considered the most powerful position for the planet of abundance. Here, Jupiter's expansion flows through emotional intelligence, family, home, and the universal human need for belonging and nourishment.</p>
<h2>Core Themes</h2>
<ul>
<li><strong>Family fortune:</strong> Inheritance, family support, and ancestral blessings are strong</li>
<li><strong>Home as abundance:</strong> Real estate, creating beautiful homes, hospitality sector</li>
<li><strong>Emotional wisdom:</strong> Profound empathy that translates into healing gifts</li>
<li><strong>Nurturing luck:</strong> Fortune through taking care of others</li>
</ul>
<h2>The Exaltation Gift</h2>
<p>Jupiter exalted in Cancer produces some of the most genuinely generous people — not just materially, but emotionally. They create spaces where others feel safe, seen, and nourished. This generosity returns multiplied.</p>
<h2>Gifts</h2>
<p>Exceptional in hospitality, childcare, real estate, food service, psychology, and healing arts. Strong psychic impressions and intuitive knowing. Family relationships tend to be a source of genuine support rather than burden.</p>
<h2>Quick Reference</h2>
<ul><li><strong>Lucky domains:</strong> Home, family, real estate, food, healing</li><li><strong>Luck trigger:</strong> Nurturing others and creating safety</li><li><strong>Element:</strong> Water</li></ul>
</article>`
  },
  {
    slug: "jupiter-in-leo-meaning",
    title: "Jupiter in Leo — Generous Leadership, Creative Fortune & Radiant Expansion",
    description: "Jupiter in Leo expands through creativity, performance, and generous self-expression. Learn how this fiery placement creates leadership luck and artistic abundance.",
    keywords: ["jupiter in leo", "jupiter in leo meaning", "jupiter leo natal", "jupiter in leo luck"],
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Leo</h1>
<p>In Leo, Jupiter becomes the great benefactor of the stage — expanding through creativity, generosity of spirit, and the magnetic power of authentic self-expression. Fortune follows those who shine.</p>
<h2>Core Themes</h2>
<ul>
<li><strong>Luck through self-expression:</strong> Being seen, performing, and sharing your authentic self opens doors</li>
<li><strong>Creative abundance:</strong> Artistic gifts magnified; entertainment and performance sectors favored</li>
<li><strong>Generous leadership:</strong> Inspiring others through grand gestures and wholehearted support</li>
<li><strong>Romantic expansion:</strong> Love relationships that are deeply fulfilling and ego-enhancing</li>
</ul>
<h2>Gifts</h2>
<p>Natural entertainers, performers, politicians, celebrities, and CEOs. Exceptional children — kids with this placement often shine extraordinarily bright. Philanthropic instincts — great joy in grand giving. The ability to command a room and turn attention into opportunity.</p>
<h2>Shadow</h2>
<ul>
<li>Pride that blocks receiving help gracefully</li>
<li>Over-the-top spending or generosity that depletes resources</li>
<li>Need for applause can become a need for constant validation</li>
</ul>
<h2>Quick Reference</h2>
<ul><li><strong>Lucky domains:</strong> Entertainment, leadership, romance, children</li><li><strong>Luck trigger:</strong> Authentic self-expression and generous giving</li><li><strong>Element:</strong> Fire</li></ul>
</article>`
  },
  {
    slug: "jupiter-in-virgo-meaning",
    title: "Jupiter in Virgo — Practical Abundance, Service Luck & Mastery of Detail",
    description: "Jupiter in Virgo creates luck through precision, service, and practical mastery. Learn how this earth placement builds abundance through skill, health, and attention to detail.",
    keywords: ["jupiter in virgo", "jupiter in virgo meaning", "jupiter virgo natal", "jupiter in virgo luck"],
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Virgo</h1>
<p>In Virgo, Jupiter is in detriment (opposite its ruling sign Pisces) — which doesn't mean bad luck, but means expansion comes through a very different path: precision, service, health, and mastery rather than grand sweeping gestures.</p>
<h2>Core Themes</h2>
<ul>
<li><strong>Luck through service:</strong> The more genuinely helpful you are, the more fortune returns</li>
<li><strong>Health as wealth:</strong> Exceptional luck in health-related fields; your own wellbeing is a prerequisite for abundance</li>
<li><strong>Practical mastery:</strong> Fortune through becoming extraordinarily skilled at something specific</li>
<li><strong>Analytical abundance:</strong> Seeing what's broken and knowing how to fix it is a financial superpower</li>
</ul>
<h2>Gifts</h2>
<p>Outstanding in healthcare, analytics, editing, research, and systems work. The ability to improve any process. Often modest about their considerable talents — learning to claim their expertise is part of their abundance journey. Luck in work environments with clear structures and measurable outcomes.</p>
<h2>Shadow</h2>
<ul>
<li>Perfectionism blocking the completion and release of work</li>
<li>Overthinking opportunities until they've passed</li>
<li>Undervaluing their expertise and charging too little</li>
</ul>
<h2>Quick Reference</h2>
<ul><li><strong>Lucky domains:</strong> Healthcare, analytics, service industries, editing</li><li><strong>Luck trigger:</strong> Mastery, service, attention to detail</li><li><strong>Element:</strong> Earth</li></ul>
</article>`
  },
  {
    slug: "venus-in-marriage-astrology",
    title: "Venus in Your Birth Chart — What It Reveals About Your Love Life & Marriage",
    description: "Venus in astrology governs how you love and what you find attractive. Learn what Venus sign reveals about your relationship style, ideal partner, and marriage prospects.",
    keywords: ["venus in birth chart", "venus astrology marriage", "venus sign love", "venus placement relationships", "venus love style"],
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Venus in Your Birth Chart — Love & Marriage</h1>
<p>In astrology, Venus governs love, beauty, pleasure, and values. Your natal Venus sign reveals how you love, what you find attractive, how you behave in relationships, and what kind of partner brings you lasting fulfillment.</p>
<h2>Venus Through the Signs in Love</h2>
<h3>Venus in Aries</h3>
<p>Love is passionate and immediate. You fall quickly, pursue boldly, and need a partner who matches your fire. Independent in love — you need space and stimulation.</p>
<h3>Venus in Taurus</h3>
<p>Love is sensual, loyal, and long-lasting. You need physical affection, stability, and beauty in your relationship. Possessive but extraordinarily devoted.</p>
<h3>Venus in Gemini</h3>
<p>Love is intellectual and playful. You need a partner who stimulates your mind, keeps you guessing, and matches your social energy. Boredom is the greatest relationship threat.</p>
<h3>Venus in Cancer</h3>
<p>Love is deep, protective, and emotionally rich. You need a partner who makes you feel emotionally safe. You give with extraordinary care — and need that care reciprocated.</p>
<h3>Venus in Leo</h3>
<p>Love is grand, romantic, and generous. You love to love — and to be adored. A partner who appreciates your warmth and returns it with genuine appreciation.</p>
<h3>Venus in Virgo</h3>
<p>Love is expressed through acts of service and practical care. You show love by improving your partner's life. You need a partner who notices and appreciates your quiet devotion.</p>
<h3>Venus in Libra</h3>
<p>Love is balanced, harmonious, and aesthetically beautiful. Partnership is your native environment — you thrive with someone who values fairness and beauty as much as you do.</p>
<h3>Venus in Scorpio</h3>
<p>Love is intense, transformative, and all-consuming. You don't do surface relationships — you want complete soul union. Loyalty and depth are non-negotiable.</p>
<h3>Venus in Sagittarius</h3>
<p>Love is adventurous and philosophical. You need a partner who expands your world — intellectually, spiritually, or physically. Freedom within commitment is essential.</p>
<h3>Venus in Capricorn</h3>
<p>Love is serious, long-term, and built on genuine compatibility. You take commitment very seriously and prefer a partner with ambition and reliability.</p>
<h3>Venus in Aquarius</h3>
<p>Love is unconventional, intellectually stimulating, and requires space. Your ideal partner is also your best friend — someone who respects your individuality completely.</p>
<h3>Venus in Pisces</h3>
<p>Love is dreamy, selfless, and spiritually transcendent. Venus is exalted in Pisces — you give love with extraordinary compassion. Watch for idealizing partners beyond reality.</p>
<h2>Venus Aspects and Marriage Timing</h2>
<ul>
<li><strong>Venus trine Jupiter:</strong> Exceptionally fortunate for love; easy abundance in relationships</li>
<li><strong>Venus conjunct Saturn:</strong> Serious, delayed, or tested relationships that ultimately build real permanence</li>
<li><strong>Venus square Mars:</strong> Passionate but conflict-prone; intense attraction mixed with friction</li>
</ul>
<h2>Venus Transits and Love Timing</h2>
<p>When transiting Venus touches your natal Venus, Sun, or 7th house, romantic opportunities increase significantly. Venus retrograde periods (every 18 months) are times when relationships from the past may resurface.</p>
</article>`
  }
];

let success = 0, fail = 0;
for (const post of posts) {
  const { error } = await supabase.from("mysticai_blog_posts").upsert(post, { onConflict: "slug" });
  if (error) { console.error("FAIL", post.slug, error.message); fail++; }
  else { console.log("OK", post.slug); success++; }
}
console.log(`\nDone: ${success} ok, ${fail} fail`);
