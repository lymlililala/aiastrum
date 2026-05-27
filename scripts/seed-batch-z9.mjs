import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);
const posts = [
  {
    slug: "virgo-2026-yearly-horoscope",
    title: "Virgo 2026 Complete Yearly Horoscope — Work, Love, Health & Finance",
    category: "horoscope",
    published_at: new Date().toISOString(),
    content: `<article><h1>Virgo 2026 Complete Yearly Horoscope — Work, Love, Health & Finance</h1>
<p>Virgo, 2026 is your year to step out of the background and own your expertise. With Saturn moving through fellow earth sign Taurus forming supportive trines to your sign, your disciplined efforts are finally receiving the recognition they deserve. This is a year of productive harvest after years of careful tending.</p>
<h2>2026 Overview for Virgo</h2>
<p>The North Node in Pisces activates your relationship axis, making partnerships — both romantic and professional — central themes. You're learning to receive as graciously as you give, and to recognize that vulnerability is a strength, not a weakness.</p>
<h2>Career and Finance 2026</h2>
<p>Jupiter expands your income sector in the first half of 2026, creating opportunities for raises, new clients, or profitable freelance work. Your analytical skills are in high demand — don't undersell your expertise. The second half brings focus to collaborative ventures. A partnership in Q3 could significantly multiply your resources.</p>
<h2>Love and Relationships 2026</h2>
<p>Single Virgos: The Nodes activate your 1st/7th house axis, making this a fated year for meeting someone significant. A connection formed between March and July carries extra karmic weight — pay attention to unusual encounters. Partnered Virgos: Deepen vulnerability. Your partner needs your emotional softness, not just your capable competence.</p>
<h2>Health and Wellness 2026</h2>
<p>Chiron in Aries highlights your 8th house — deep healing of old wounds is available. Consider therapy, shadow work, or healing modalities that address emotional patterns. Physically, digestive health (your ruling area) benefits from dietary mindfulness. Reduce stress through regular nature walks.</p>
<h2>Virgo Monthly Highlights 2026</h2>
<ul>
<li><strong>January–February:</strong> Career momentum builds, a recognition moment arrives.</li>
<li><strong>March–May:</strong> Relationship developments, possible new love connection.</li>
<li><strong>June–August:</strong> Financial peak, explore investment or income expansion.</li>
<li><strong>September–October:</strong> Inner work and transformation.</li>
<li><strong>November–December:</strong> Expansion and completion — end the year knowing more about yourself than you started with.</li>
</ul>
<h2>Virgo 2026 Affirmation</h2>
<p>"I honor both my excellence and my humanity. I am worthy of love and recognition exactly as I am."</p>
</article>`
  },
  {
    slug: "gemini-2026-yearly-horoscope",
    title: "Gemini 2026 Complete Yearly Horoscope — Adventure, Communication & Growth",
    category: "horoscope",
    published_at: new Date().toISOString(),
    content: `<article><h1>Gemini 2026 Complete Yearly Horoscope — Adventure, Communication & Growth</h1>
<p>Gemini, 2026 is a year of expansion and intellectual adventure. With Jupiter touring your 9th house in the first half, your curiosity is rewarded on the grandest scale — travel, education, publishing, and philosophical growth are all highlighted.</p>
<h2>2026 Overview for Gemini</h2>
<p>This is the year you stop playing small with your ideas. The cosmic invitation is to share your perspective with a wider audience, travel further than your usual routes, and explore belief systems that challenge and expand your mind. You thrive when stimulated — 2026 delivers stimulation in abundance.</p>
<h2>Career and Finance 2026</h2>
<p>Communication-based work, media, teaching, and publishing are all supercharged this year. A speaking or writing opportunity in the first quarter could open unexpected doors. Financially, multiple income streams serve you better than one — your Gemini adaptability is your economic superpower in 2026.</p>
<h2>Love and Relationships 2026</h2>
<p>Single Geminis: International connections or relationships forming through education, travel, or online platforms are highlighted. Your intellectual equals are your romantic targets — look where minds gather. Partnered Geminis: Create shared adventures and learning experiences. Stagnation is the enemy of your love life; novelty is the sustainer.</p>
<h2>Health and Wellness 2026</h2>
<p>Nervous system and lung health (Gemini's body correlates) need attention. Practice breathwork, meditation for mental overload, and reduce overstimulation. Physical activity should be varied and interesting — monotonous workouts don't hold your attention for long.</p>
<h2>Monthly Highlights 2026</h2>
<ul>
<li><strong>January–March:</strong> Educational or travel opportunities emerge.</li>
<li><strong>April–June:</strong> Career breakthrough through communication or publishing.</li>
<li><strong>July–September:</strong> Relationship developments; deepen existing connections.</li>
<li><strong>October–December:</strong> Financial planning and expansion opportunities.</li>
</ul>
<h2>Gemini 2026 Affirmation</h2>
<p>"My curiosity is a compass that leads me exactly where I'm meant to go. I share my voice with courage and joy."</p>
</article>`
  },
  {
    slug: "taurus-2026-yearly-horoscope",
    title: "Taurus 2026 Complete Yearly Horoscope — Stability, Abundance & Transformation",
    category: "horoscope",
    published_at: new Date().toISOString(),
    content: `<article><h1>Taurus 2026 Complete Yearly Horoscope — Stability, Abundance & Transformation</h1>
<p>Taurus, 2026 is a landmark year for you. Saturn continues its transit through your sign, asking you to build your masterwork — the structures and foundations that will define the next 29 years of your life. This is serious, important work, and you're equal to it.</p>
<h2>2026 Overview for Taurus</h2>
<p>Uranus has been disrupting your sign for several years, bringing unexpected change to your sense of identity and values. In 2026, you begin integrating these changes rather than resisting them. Your deepest values are being refined — what truly matters to you, stripped of what society told you should matter.</p>
<h2>Career and Finance 2026</h2>
<p>Your earning power is highlighted positively. A significant financial upgrade is possible this year — whether through a salary increase, a successful business venture, or a real estate move. Taurus energy at its best creates lasting tangible wealth. Trust your instincts about value and timing.</p>
<h2>Love and Relationships 2026</h2>
<p>Single Taureans: Venus, your ruling planet, activates romantic possibilities in late spring and autumn. A stable, trustworthy connection is more appealing than ever — you're not interested in drama. Partnered Taureans: This is a year to discuss long-term future plans — where you'll live, financial goals, family. These conversations strengthen rather than threaten your bond.</p>
<h2>Health and Wellness 2026</h2>
<p>Thyroid, neck, and throat health (Taurus body area) deserve monitoring. Regular vocal care, neck exercises, and thyroid-supporting nutrition are beneficial. Physical activity outdoors in nature — especially gardens and parks — feeds your Taurus soul deeply.</p>
<h2>Monthly Highlights 2026</h2>
<ul>
<li><strong>January–March:</strong> Solid progress on financial goals.</li>
<li><strong>April–June:</strong> Relationship developments and beauty-centered pleasures.</li>
<li><strong>July–August:</strong> Major career or business development opportunity.</li>
<li><strong>September–November:</strong> Personal transformation and deep value clarification.</li>
<li><strong>December:</strong> Quiet restoration and planning for the year ahead.</li>
</ul>
<h2>Taurus 2026 Affirmation</h2>
<p>"I build steadily, I trust abundance, and I know my worth. My patience creates the life I truly want."</p>
</article>`
  },
  {
    slug: "libra-2026-yearly-horoscope",
    title: "Libra 2026 Complete Yearly Horoscope — Balance, Relationships & New Beginnings",
    category: "horoscope",
    published_at: new Date().toISOString(),
    content: `<article><h1>Libra 2026 Complete Yearly Horoscope — Balance, Relationships & New Beginnings</h1>
<p>Libra, 2026 marks a significant transition. The Lunar Nodes move out of your sign's axis, completing a major two-year chapter of karmic relationship lessons. You emerge with clarity about who you are in partnership and what you truly need — wisdom that wasn't available to you before.</p>
<h2>2026 Overview for Libra</h2>
<p>Venus, your ruling planet, makes a beautiful long-stay transit that blesses your social life and romantic possibilities throughout the year. Your natural charm and diplomatic gifts are amplified, drawing positive people and opportunities to you effortlessly.</p>
<h2>Career and Finance 2026</h2>
<p>Creative industries, beauty, design, law, and partnership-based businesses are all highlighted for career growth. A collaborative venture or business partnership proposed in the second quarter deserves serious consideration. Financial stability improves as the year progresses — you're moving from managing scarcity to building genuine surplus.</p>
<h2>Love and Relationships 2026</h2>
<p>Single Librans: Post-Node-exit, you're finally clear on what you need rather than what you think you should want. A connection forming in 2026 meets you as your authentic self — much more sustainable than past relationships where you shapeshifted to please. Partnered Librans: Time to ask for what you genuinely need, even when it feels uncomfortable. Your partnership can handle it.</p>
<h2>Health and Wellness 2026</h2>
<p>Kidney health (Libra's body correlation) and hormonal balance benefit from focus. Sugar reduction, adequate hydration, and regular movement support both. Balance work and rest more consistently — Libra tendency toward overcommitment then crash needs addressing.</p>
<h2>Libra 2026 Affirmation</h2>
<p>"I choose from my authentic self. I deserve balanced, beautiful, and honest love."</p>
</article>`
  },
  {
    slug: "sagittarius-2026-yearly-horoscope",
    title: "Sagittarius 2026 Complete Yearly Horoscope — Freedom, Truth & Expansion",
    category: "horoscope",
    published_at: new Date().toISOString(),
    content: `<article><h1>Sagittarius 2026 Complete Yearly Horoscope — Freedom, Truth & Expansion</h1>
<p>Sagittarius, 2026 is calling you to your greatest adventure yet — but the adventure might be inward as much as outward. Jupiter in your 8th house for part of the year asks you to explore the depths of your psychology, finances, and intimate connections rather than escaping into the wide horizon.</p>
<h2>2026 Overview for Sagittarius</h2>
<p>The biggest lesson of 2026: depth over breadth. Your natural gift is expansion and exploration, but genuine wisdom comes from going deeper into what matters most. The travel you're being called to take in 2026 includes inner journeys that reveal truth you've been too busy to discover.</p>
<h2>Career and Finance 2026</h2>
<p>Teaching, publishing, media, travel, international work, philosophy, and coaching are all potent career avenues. A creative or educational project receives significant recognition in the second half of 2026. Financial expansion is available — the key is strategic focus rather than scattered enthusiasm.</p>
<h2>Love and Relationships 2026</h2>
<p>Single Sagittarians: Someone who matches your intellectual fire and shares your appetite for life is entering your world. They won't be someone who wants to cage you — they'll want to explore alongside you. Partnered Sagittarians: Share your true philosophical views, even the ones that feel risky. Authentic conversation deepens love.</p>
<h2>Monthly Highlights 2026</h2>
<ul>
<li><strong>Q1:</strong> Educational opportunities, possible enrollment in advanced study.</li>
<li><strong>Q2:</strong> Financial and psychological transformation work.</li>
<li><strong>Q3:</strong> Career recognition, international connections.</li>
<li><strong>Q4:</strong> Relationship deepening, end-of-year celebration and reflection.</li>
</ul>
<h2>Sagittarius 2026 Affirmation</h2>
<p>"Truth is my north star. I explore with wisdom, love with authenticity, and live with full presence."</p>
</article>`
  },
  {
    slug: "aquarius-2026-yearly-horoscope",
    title: "Aquarius 2026 Complete Yearly Horoscope — Innovation, Friendship & Social Impact",
    category: "horoscope",
    published_at: new Date().toISOString(),
    content: `<article><h1>Aquarius 2026 Complete Yearly Horoscope — Innovation, Friendship & Social Impact</h1>
<p>Aquarius, 2026 puts your revolutionary ideas into structures that can actually change the world. Pluto continues its long journey through your sign, fundamentally transforming who you are at your core — and this year you begin to harness that transformative power outward.</p>
<h2>2026 Overview for Aquarius</h2>
<p>Your humanitarian impulses combine with practical strategy this year. The gap between your vision and your ability to manifest it narrows significantly. Technology, social movements, community organizing, and innovation of all kinds are your domains in 2026.</p>
<h2>Career and Finance 2026</h2>
<p>Tech, social entrepreneurship, scientific research, community organizing, and humanitarian work are all elevated. A project that combines your unique perspective with practical application gains real traction. Financially, unexpected windfalls and innovative income streams are highlighted — Aquarius often profits from ideas others haven't thought of yet.</p>
<h2>Love and Relationships 2026</h2>
<p>Single Aquarians: You're attracted to people who challenge conventional thinking. Look within your communities and intellectual circles — a friend-to-lover transition is highly possible in 2026. Partnered Aquarians: Create shared projects that excite both of you. Working toward meaningful goals together is deeply bonding for your sign.</p>
<h2>Health and Wellness 2026</h2>
<p>Circulatory health and the nervous system (Aquarius body correlations) benefit from regular cardiovascular exercise and stress reduction. Community-based activities double as both social nourishment and physical health support.</p>
<h2>Aquarius 2026 Affirmation</h2>
<p>"I am a bridge between vision and reality. My uniqueness is my gift to the world."</p>
</article>`
  },
  {
    slug: "pisces-2026-yearly-horoscope",
    title: "Pisces 2026 Complete Yearly Horoscope — Dreams, Spirituality & Creative Emergence",
    category: "horoscope",
    published_at: new Date().toISOString(),
    content: `<article><h1>Pisces 2026 Complete Yearly Horoscope — Dreams, Spirituality & Creative Emergence</h1>
<p>Pisces, 2026 is a year of profound spiritual flowering and creative emergence. With the North Node now in your sign, the universe is spotlighting your unique gifts and calling you toward your soul's true north. This is your moment to be seen, to create, and to lead with your vision.</p>
<h2>2026 Overview for Pisces</h2>
<p>The North Node in Pisces means destiny is literally calling your name. What you begin in 2026 carries extraordinary karmic support. Your intuition, creativity, compassion, and spiritual sensitivity are not just personal gifts — they're needed in the world right now. Answer the call.</p>
<h2>Career and Finance 2026</h2>
<p>Creative arts, spiritual guidance, healing professions, film, music, poetry, and water-related work are all amplified. A creative project you've been incubating finally has the energetic support to launch successfully. Financially, trust your intuition about opportunities — your Pisces sense is remarkably accurate in 2026.</p>
<h2>Love and Relationships 2026</h2>
<p>Single Pisceans: A fated connection is possible this year — someone who sees the real you beneath your many layers. An artistic or spiritual community is a potent meeting ground. Partnered Pisceans: Deepen your spiritual and creative partnership. Create together, pray or meditate together, dream together.</p>
<h2>Monthly Highlights 2026</h2>
<ul>
<li><strong>Q1:</strong> Identity crystallization; who are you really?</li>
<li><strong>Q2:</strong> Creative and romantic peak.</li>
<li><strong>Q3:</strong> Professional recognition of your unique gifts.</li>
<li><strong>Q4:</strong> Spiritual integration and completion of a long cycle.</li>
</ul>
<h2>Pisces 2026 Affirmation</h2>
<p>"My sensitivity is my superpower. I bring healing and beauty wherever I flow."</p>
</article>`
  },
  {
    slug: "leo-2026-yearly-horoscope",
    title: "Leo 2026 Complete Yearly Horoscope — Shine, Lead & Transform",
    category: "horoscope",
    published_at: new Date().toISOString(),
    content: `<article><h1>Leo 2026 Complete Yearly Horoscope — Shine, Lead & Transform</h1>
    <p>Leo, 2026 challenges you to redefine what it means to shine — not through external performance but through the authenticity that comes from genuine self-knowledge. The cosmos is asking for a more interior form of royalty this year.</p>
<h2>2026 Overview for Leo</h2>
<p>With Saturn in Taurus creating a square tension to your sign, structures and authority figures may present resistance to your plans. This isn't punishment — it's refinement. What survives the pressure is what's truly worthy of your legacy.</p>
<h2>Career and Finance 2026</h2>
<p>Leadership roles, creative direction, performance arts, and any work where your personal vision drives results are highlighted. A creative or entrepreneurial project launched in the second half of 2026 has strong long-term foundations. Avoid impulsive financial decisions — plan with your characteristic royal precision instead.</p>
<h2>Love and Relationships 2026</h2>
<p>Single Leos: Someone who admires your courage rather than being intimidated by it is your match. Look in leadership communities and creative spaces. Partnered Leos: Balance receiving adoration with genuinely celebrating your partner's light. Love is a mutual stage, not a solo performance.</p>
<h2>Monthly Highlights 2026</h2>
<ul>
<li><strong>February–April:</strong> Creative breakthrough, possible recognition.</li>
<li><strong>May–July:</strong> Relationship evolution; authentic connection deepens.</li>
<li><strong>August (Solar Return):</strong> Your birthday season activates new intentions powerfully.</li>
<li><strong>September–December:</strong> Financial and professional consolidation.</li>
</ul>
<h2>Leo 2026 Affirmation</h2>
<p>"My authentic light needs no stage to be radiant. I lead through love, courage, and genuine self-expression."</p>
</article>`
  },
  {
    slug: "scorpio-2026-yearly-horoscope",
    title: "Scorpio 2026 Complete Yearly Horoscope — Power, Rebirth & Deep Transformation",
    category: "horoscope",
    published_at: new Date().toISOString(),
    content: `<article><h1>Scorpio 2026 Complete Yearly Horoscope — Power, Rebirth & Deep Transformation</h1>
<p>Scorpio, 2026 is another year of profound metamorphosis. As Pluto, your ruling planet, settles into Aquarius, you're experiencing a kind of second puberty — a total reinvention of how you express power, intimacy, and transformation in your life.</p>
<h2>2026 Overview for Scorpio</h2>
<p>You've done the deep inner work in recent years. 2026 asks you to bring those transformed insights into the light of your daily life. The power you've excavated from your shadow is meant to be used — not hidden. Step into the version of yourself you've been becoming.</p>
<h2>Career and Finance 2026</h2>
<p>Psychology, research, investigation, surgery, finance, occult sciences, and any work involving profound transformation of others are all potent career avenues. A significant financial transformation is possible this year — possibly through inheritance, investments, or a partner's resources. Trust your instincts about where to put your energy.</p>
<h2>Love and Relationships 2026</h2>
<p>Single Scorpios: You're no longer willing to settle for surface-level connections. Someone of equal depth and integrity enters your life when you stop masking your authentic intensity. Partnered Scorpios: This is the year for the deepest conversation you've been avoiding. Truth-telling, even when it's uncomfortable, is what your relationship needs most.</p>
<h2>Scorpio 2026 Affirmation</h2>
<p>"I transform consciously. I use my power with wisdom and my depth as my greatest strength."</p>
</article>`
  },
  {
    slug: "cancer-2026-yearly-horoscope",
    title: "Cancer 2026 Complete Yearly Horoscope — Home, Nurturing & Emotional Growth",
    category: "horoscope",
    published_at: new Date().toISOString(),
    content: `<article><h1>Cancer 2026 Complete Yearly Horoscope — Home, Nurturing & Emotional Growth</h1>
<p>Cancer, 2026 is a year of emotional maturation and home transformation. With Jupiter activating your 4th house (home, roots, and family) mid-year, blessings arrive through your domestic sphere — possibly a home upgrade, family expansion, or healing of ancestral patterns.</p>
<h2>2026 Overview for Cancer</h2>
<p>The Moon, your ruling celestial body, has four powerful eclipse seasons activating your relationship and home axes. Significant beginnings and endings in both family and partnership domains create the shape of a dramatically evolved life by year's end.</p>
<h2>Career and Finance 2026</h2>
<p>Work-from-home enterprises, real estate, food, caregiving, hospitality, and ancestral or heritage-based projects are all highlighted. A career move in the middle of the year involves more financial reward and more alignment with your authentic values. Trust your gut — Cancer intuition about opportunity is legendary.</p>
<h2>Love and Relationships 2026</h2>
<p>Single Cancers: You're attracting emotionally mature partners now — the chaotic or unavailable types are no longer fitting through your newly-refined filter. Someone who wants to build a real home (literal and emotional) with you arrives. Partnered Cancers: Moving in together, marriage, or a major domestic upgrade transforms your partnership foundation.</p>
<h2>Health and Wellness 2026</h2>
<p>Stomach, chest, and emotional-body health deserve focus. Somatic healing practices that connect emotional processing with physical release (yoga, dance, breathwork) are particularly beneficial.</p>
<h2>Cancer 2026 Affirmation</h2>
<p>"My sensitivity is a gift. I create a home that nourishes my soul and the souls of everyone I love."</p>
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
