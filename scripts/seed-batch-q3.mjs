/**
 * 批次Q3：占星进阶 — 上升星座全12个（英文，高搜索量长尾词）
 * rising sign in every zodiac = 高购买意图流量
 */
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);

const risingData = [
  {
    sign: "Aries", slug: "aries-rising-sign-meaning",
    title: "Aries Rising: Complete Guide to the Aries Ascendant Personality",
    desc: "Aries Rising gives you a bold, energetic first impression — you come across as direct, confident, and action-oriented before people even know your sun sign. Learn what Aries Ascendant truly means.",
    keywords: ["aries rising","aries ascendant","aries rising personality","aries rising appearance","aries rising meaning"],
    preview: `<h2>The First Impression You Make</h2>
<p>Your Ascendant — or Rising sign — is the zodiac sign that was rising on the eastern horizon at the exact moment of your birth. It governs how you appear to others, how you enter rooms, and the energy you lead with before people know you more deeply.</p>
<p>With <strong>Aries Rising</strong>, your first impression is unmistakable: you come across as <em>direct, energetic, and ready for action</em>. People sense your initiative before you say a word. There's a forwardness to your presence — a quality of "going first" that others find either inspiring or slightly intimidating.</p>
<h2>Key Personality Traits of Aries Rising</h2>
<ul>
<li><strong>Bold initiator:</strong> You rarely wait for permission to start something</li>
<li><strong>Fast and instinctive:</strong> You respond to situations quickly, often physically before mentally</li>
<li><strong>Independent:</strong> You have a strong resistance to being told what to do</li>
<li><strong>Competitive edge:</strong> Even when you don't mean to be, you bring intensity to interactions</li>
<li><strong>Honest to the point of bluntness:</strong> You say what you mean without much packaging</li>
</ul>
<h2>Aries Rising Appearance</h2>
<p>Aries Rising often gives an athletic or angular quality to the face — prominent brow, strong jawline, or simply a dynamic, animated quality in expression. You may have a quick-moving body language: fast gestures, direct eye contact, and a tendency to lean forward.</p>
<h2>Aries Rising in Love</h2>
<p>In relationships, you pursue directly and intensely — and you need a partner who can match your energy without capping it. You're attracted to people who challenge you, and you can grow bored quickly when things become too predictable. The challenge: learning that vulnerability isn't weakness.</p>
<h2>Mars as Aries Rising Ruler</h2>
<p>Your chart ruler is <strong>Mars</strong> — the planet of action, drive, and desire. The placement of Mars in your natal chart (by sign, house, and aspect) significantly shapes how your Aries energy actually expresses. Mars in a water sign, for instance, will soften and deepen the typical Aries urgency.</p>`
  },
  {
    sign: "Taurus", slug: "taurus-rising-sign-meaning",
    title: "Taurus Rising: Complete Guide to the Taurus Ascendant Personality",
    desc: "Taurus Rising gives you a calm, grounded presence and often striking physical magnetism. People sense stability and reliability from you immediately. Discover what Taurus Ascendant reveals about your outward self.",
    keywords: ["taurus rising","taurus ascendant","taurus rising personality","taurus rising appearance","taurus rising meaning"],
    preview: `<h2>The First Impression You Make</h2>
<p>With <strong>Taurus Rising</strong>, you project calm, steadiness, and a quiet kind of magnetism. People often find you physically attractive, or at least deeply pleasant to be around — there's a sensory quality to your presence, a sense that you're fully <em>in</em> your body and comfortable there.</p>
<p>You don't rush. You don't scatter. You arrive into situations with a measured pace and a quality of substance that makes people feel immediately at ease.</p>
<h2>Key Personality Traits of Taurus Rising</h2>
<ul>
<li><strong>Grounded and reliable:</strong> Others sense they can depend on you</li>
<li><strong>Sensually present:</strong> You notice beauty, comfort, taste, and physical environment acutely</li>
<li><strong>Patient but stubborn:</strong> You move slowly and deliberately — and once set in a direction, you're hard to redirect</li>
<li><strong>Natural physical grace:</strong> Movement tends to be deliberate and attractive</li>
<li><strong>Values-driven:</strong> What you appear to care about most: security, beauty, and genuine pleasure</li>
</ul>
<h2>Taurus Rising Appearance</h2>
<p>Taurus Rising often gives a strong, pleasant physical presence — beautiful eyes, a warm voice, and frequently a sense of natural elegance even when dressed simply. The neck and throat area may be particularly prominent or attractive.</p>
<h2>Taurus Rising in Love</h2>
<p>You're loyal, sensual, and genuinely committed once you've made a choice. You don't fall quickly, but when you do, it's usually deep and durable. You need physical affection, material security, and consistency in a partner. The challenge: releasing the grip when something isn't serving you anymore.</p>
<h2>Venus as Taurus Rising Ruler</h2>
<p>Your chart ruler is <strong>Venus</strong> — planet of beauty, love, and value. Venus's placement in your natal chart shapes how your Taurean grace and desire for beauty expresses. Venus in a fire sign, for example, brings more spontaneity to your otherwise steady Taurean presence.</p>`
  },
  {
    sign: "Gemini", slug: "gemini-rising-sign-meaning",
    title: "Gemini Rising: Complete Guide to the Gemini Ascendant Personality",
    desc: "Gemini Rising makes you witty, curious, and adaptable on first impression — people meet your mind before anything else. Explore what Gemini Ascendant means for your personality, appearance, and relationships.",
    keywords: ["gemini rising","gemini ascendant","gemini rising personality","gemini rising appearance","gemini rising meaning"],
    preview: `<h2>The First Impression You Make</h2>
<p>With <strong>Gemini Rising</strong>, people meet your mind first. You come across as quick, talkative, intellectually curious, and often funny. There's a youthful energy to your presence — a quality of perpetual interest in everything — that makes you easy to approach and engaging to talk to.</p>
<p>You're the one who asks questions, makes connections between unrelated things, and keeps a conversation moving in surprising directions.</p>
<h2>Key Personality Traits of Gemini Rising</h2>
<ul>
<li><strong>Quick, curious, witty:</strong> Your mind moves fast and it shows</li>
<li><strong>Adaptable:</strong> You can adjust your presentation to any audience</li>
<li><strong>Multi-interested:</strong> You appear to be engaged in many things simultaneously</li>
<li><strong>Socially fluid:</strong> Comfortable talking to almost anyone, in almost any context</li>
<li><strong>Younger-looking:</strong> Gemini Rising often keeps a youthful appearance well into later years</li>
</ul>
<h2>Gemini Rising Appearance</h2>
<p>Bright, animated eyes; expressive face; quick gestures; often slim or wiry build. More than physical features, what's most noticeable is your expressiveness — your face is constantly in motion.</p>
<h2>Mercury as Gemini Rising Ruler</h2>
<p>Your chart ruler is <strong>Mercury</strong> — planet of communication, thought, and information. Where Mercury sits in your chart reveals how you actually communicate: a Mercury in Scorpio, for instance, adds depth and investigation to your otherwise breezy surface presentation.</p>`
  },
  {
    sign: "Cancer", slug: "cancer-rising-sign-meaning",
    title: "Cancer Rising: Complete Guide to the Cancer Ascendant Personality",
    desc: "Cancer Rising gives you a nurturing, emotionally perceptive first impression — people sense warmth and empathy from you immediately. Learn what Cancer Ascendant means for your personality and relationships.",
    keywords: ["cancer rising","cancer ascendant","cancer rising personality","cancer rising appearance","cancer rising meaning"],
    preview: `<h2>The First Impression You Make</h2>
<p>With <strong>Cancer Rising</strong>, people immediately sense someone warm, caring, and deeply attuned to emotional undercurrents. You seem to notice how others feel — and respond to it — before the conversation has even properly started. There's a protective, nurturing quality to your presence.</p>
<p>You may also come across as somewhat private or indirect. Like the crab, you approach situations from an angle, taking time to gauge safety before moving forward.</p>
<h2>Key Personality Traits of Cancer Rising</h2>
<ul>
<li><strong>Emotionally perceptive:</strong> You read the room intuitively and accurately</li>
<li><strong>Nurturing:</strong> You naturally take care of others in your environment</li>
<li><strong>Protective shell:</strong> People may not immediately sense your true feelings — you reveal yourself gradually</li>
<li><strong>Strong memory and attachment to the past:</strong> History, family, and roots feel viscerally important</li>
<li><strong>Highly responsive to the environment:</strong> Your energy shifts noticeably based on who you're with</li>
</ul>
<h2>Cancer Rising Appearance</h2>
<p>Cancer Rising often gives a round, soft facial quality; large, expressive eyes; and a way of drawing people in through warmth rather than forcefulness. The body language is often protective — arms crossed, turning slightly inward when uncertain.</p>
<h2>The Moon as Cancer Rising Ruler</h2>
<p>Your chart ruler is <strong>the Moon</strong> — planet of emotion, instinct, and the inner world. The Moon's sign, house, and aspects in your chart reveal the full complexity of your emotional life beneath the nurturing surface.</p>`
  },
  {
    sign: "Leo", slug: "leo-rising-sign-meaning",
    title: "Leo Rising: Complete Guide to the Leo Ascendant Personality",
    desc: "Leo Rising makes you magnetic, warm, and naturally commanding on first impression. People notice you when you walk into a room. Discover everything about Leo Ascendant personality, appearance, and love life.",
    keywords: ["leo rising","leo ascendant","leo rising personality","leo rising appearance","leo rising meaning"],
    preview: `<h2>The First Impression You Make</h2>
<p>With <strong>Leo Rising</strong>, you make an entrance — whether you intend to or not. There's a warmth, a radiance, and a natural authority to your presence that draws eyes. People notice you when you arrive, and they usually feel good in your company because you bring generous energy into a room.</p>
<p>You lead with heart. Your first impression is one of confidence, generosity, and genuine interest in making others feel seen.</p>
<h2>Key Personality Traits of Leo Rising</h2>
<ul>
<li><strong>Naturally magnetic:</strong> People are drawn to your energy without you trying</li>
<li><strong>Warmhearted and generous:</strong> You give freely of your attention and warmth</li>
<li><strong>Strong personal style:</strong> You have a distinctive way of presenting yourself</li>
<li><strong>Pride and dignity:</strong> You carry yourself with a sense of self-respect that others can feel</li>
<li><strong>Responsive to appreciation:</strong> Recognition matters to you; criticism lands harder than you might let on</li>
</ul>
<h2>Leo Rising Appearance</h2>
<p>Leo Rising frequently gives a striking mane of hair (often voluminous, distinctive, or styled with intention), a regal bearing, and a naturally bright quality to the face. The overall effect is someone who commands visual attention effortlessly.</p>
<h2>The Sun as Leo Rising Ruler</h2>
<p>Your chart ruler is <strong>the Sun</strong> — the very center of the solar system. The Sun's sign and house placement in your chart reveals where your vital energy truly lives, and how the Leo warmth actually expresses in your life.</p>`
  },
  {
    sign: "Virgo", slug: "virgo-rising-sign-meaning",
    title: "Virgo Rising: Complete Guide to the Virgo Ascendant Personality",
    desc: "Virgo Rising gives you an observant, precise, and helpfully capable first impression. People sense your intelligence and attention to detail before you say a word. Learn what Virgo Ascendant means.",
    keywords: ["virgo rising","virgo ascendant","virgo rising personality","virgo rising appearance","virgo rising meaning"],
    preview: `<h2>The First Impression You Make</h2>
<p>With <strong>Virgo Rising</strong>, people immediately sense someone careful, competent, and genuinely attentive. You appear organized — even if your internal world doesn't feel that way. There's a quality of focused intelligence to your presence: you're clearly observing, processing, and filing things away.</p>
<p>You come across as helpful, precise, and slightly reserved — the person who's quietly noting what everyone else is missing.</p>
<h2>Key Personality Traits of Virgo Rising</h2>
<ul>
<li><strong>Analytical and observant:</strong> You notice details others walk right past</li>
<li><strong>Service-oriented:</strong> Your natural instinct is to make things better and more efficient</li>
<li><strong>Reserved at first:</strong> You reveal yourself gradually, once trust is established</li>
<li><strong>Clean, precise presentation:</strong> Your personal appearance tends to be well-considered and neat</li>
<li><strong>High standards:</strong> Both for yourself and, quietly, for others</li>
</ul>
<h2>Mercury as Virgo Rising Ruler</h2>
<p>Your chart ruler is <strong>Mercury</strong> — here functioning as the planet of analysis and discernment rather than quick communication. Mercury's placement in your chart shows how your Virgo intelligence actually operates: Mercury in Sagittarius, for instance, broadens the typically focused Virgo gaze into wide-angle curiosity.</p>`
  },
  {
    sign: "Libra", slug: "libra-rising-sign-meaning",
    title: "Libra Rising: Complete Guide to the Libra Ascendant Personality",
    desc: "Libra Rising gives you charm, elegance, and natural social grace on first impression. People find you pleasant, fair-minded, and attractive. Learn everything about Libra Ascendant personality and life.",
    keywords: ["libra rising","libra ascendant","libra rising personality","libra rising appearance","libra rising meaning"],
    preview: `<h2>The First Impression You Make</h2>
<p>With <strong>Libra Rising</strong>, you are immediately charming. There's a natural grace to your social presence — you put people at ease, you find common ground effortlessly, and you have an aesthetic sensibility that shows in how you dress, carry yourself, and arrange your surroundings.</p>
<p>You're the person others describe as "easy to be around" and "genuinely fair." People feel heard in your company because you actually try to understand multiple sides before forming a judgment.</p>
<h2>Key Personality Traits of Libra Rising</h2>
<ul>
<li><strong>Charming and socially intelligent:</strong> Natural diplomat in any room</li>
<li><strong>Aesthetically attuned:</strong> You notice and care about beauty, harmony, and balance</li>
<li><strong>Conflict-averse:</strong> You'll go a long way to avoid direct confrontation</li>
<li><strong>Fair-minded:</strong> You genuinely try to see all sides before deciding</li>
<li><strong>Relationship-oriented:</strong> You function best with a partner or collaborator</li>
</ul>
<h2>Venus as Libra Rising Ruler</h2>
<p>Your chart ruler is <strong>Venus</strong> — here expressing as the principle of harmony, partnership, and aesthetic refinement. Venus's sign and house placement reveals what you truly value and where you naturally create beauty in your life.</p>`
  },
  {
    sign: "Scorpio", slug: "scorpio-rising-sign-meaning",
    title: "Scorpio Rising: Complete Guide to the Scorpio Ascendant Personality",
    desc: "Scorpio Rising gives you an intense, magnetic, and deeply perceptive first impression. People sense your depth and mystery before you say a word. Discover everything about Scorpio Ascendant.",
    keywords: ["scorpio rising","scorpio ascendant","scorpio rising personality","scorpio rising appearance","scorpio rising meaning"],
    preview: `<h2>The First Impression You Make</h2>
<p>With <strong>Scorpio Rising</strong>, you have a presence that people feel. There's an intensity to your gaze, a depth to your silence, and a magnetic quality to your bearing that makes you difficult to ignore. Even when you're saying nothing, people sense that <em>a lot</em> is happening beneath the surface.</p>
<p>You don't reveal yourself easily. People can spend years with you and still feel they haven't fully gotten to the bottom of who you are — and somehow, that makes you more fascinating rather than less.</p>
<h2>Key Personality Traits of Scorpio Rising</h2>
<ul>
<li><strong>Intensely magnetic:</strong> There's a compelling quality to your presence that draws others in</li>
<li><strong>Perceptive to the point of psychic:</strong> You read people's subtext, intentions, and hidden emotions accurately</li>
<li><strong>Private and strategic:</strong> You share carefully and observe extensively</li>
<li><strong>Powerful resilience:</strong> You recover from difficulty with a quiet, determined force</li>
<li><strong>Deeply transformative:</strong> Your relationships and experiences rarely leave you unchanged</li>
</ul>
<h2>Scorpio Rising Appearance</h2>
<p>Often striking, penetrating eyes; a quality of stillness that reads as power; dark or striking coloring. The overall impression is someone who is <em>watching</em> — and not missing much.</p>
<h2>Pluto as Scorpio Rising Ruler</h2>
<p>Your chart rulers are <strong>Pluto</strong> (modern) and <strong>Mars</strong> (traditional). Both planets emphasize transformation, power, and depth. Their placements in your chart reveal where these forces operate most intensely in your life.</p>`
  },
  {
    sign: "Sagittarius", slug: "sagittarius-rising-sign-meaning",
    title: "Sagittarius Rising: Complete Guide to the Sagittarius Ascendant",
    desc: "Sagittarius Rising gives you an adventurous, enthusiastic, and philosophically curious first impression. People sense your optimism and love of freedom immediately. Learn all about Sagittarius Ascendant.",
    keywords: ["sagittarius rising","sagittarius ascendant","sagittarius rising personality","sagittarius rising appearance","sagittarius rising meaning"],
    preview: `<h2>The First Impression You Make</h2>
<p>With <strong>Sagittarius Rising</strong>, you come across as enthusiastic, open, and immediately engaging. There's a quality of genuine expansiveness to your presence — you seem interested in ideas, in people, in the world at large, and that enthusiasm is genuinely contagious.</p>
<p>People sense your optimism and your hunger for experience. You seem like someone who's <em>going somewhere</em> — and who might invite them along for the journey.</p>
<h2>Key Personality Traits of Sagittarius Rising</h2>
<ul>
<li><strong>Adventurous and freedom-loving:</strong> You visibly chafe against restrictions</li>
<li><strong>Philosophically curious:</strong> You're always looking for the bigger picture</li>
<li><strong>Honestly blunt:</strong> You don't soften things much — and people usually appreciate it</li>
<li><strong>Naturally optimistic:</strong> Your default assumption is that things will work out</li>
<li><strong>Athletic or outdoorsy energy:</strong> You're physically expressive and love movement</li>
</ul>
<h2>Jupiter as Sagittarius Rising Ruler</h2>
<p>Your chart ruler is <strong>Jupiter</strong> — planet of expansion, luck, wisdom, and abundance. Jupiter's placement shows where your natural luck and growth potential is concentrated, and how your Sagittarian optimism actually manifests.</p>`
  },
  {
    sign: "Capricorn", slug: "capricorn-rising-sign-meaning",
    title: "Capricorn Rising: Complete Guide to the Capricorn Ascendant Personality",
    desc: "Capricorn Rising gives you a serious, capable, and quietly authoritative first impression. People sense your ambition and competence before you demonstrate them. Learn all about Capricorn Ascendant.",
    keywords: ["capricorn rising","capricorn ascendant","capricorn rising personality","capricorn rising appearance","capricorn rising meaning"],
    preview: `<h2>The First Impression You Make</h2>
<p>With <strong>Capricorn Rising</strong>, you project competence, seriousness, and a quiet kind of authority. People sense almost immediately that you're someone who gets things done — not flashily, not loudly, but with steady, reliable capability.</p>
<p>You may come across as older or more serious than your actual age, especially when young. Capricorn Rising people often experience a reversal: serious and responsible in youth, more relaxed and playful as they get older.</p>
<h2>Key Personality Traits of Capricorn Rising</h2>
<ul>
<li><strong>Quietly authoritative:</strong> You lead through competence and demonstrated reliability</li>
<li><strong>Ambitious:</strong> Your eyes are always on long-term goals</li>
<li><strong>Reserved but not cold:</strong> Your warmth reveals itself slowly, once trust is built</li>
<li><strong>Excellent at structure:</strong> You naturally organize, plan, and build toward lasting things</li>
<li><strong>Dry humor that appears unexpectedly:</strong> Once people know you, they find this consistently charming</li>
</ul>
<h2>Saturn as Capricorn Rising Ruler</h2>
<p>Your chart ruler is <strong>Saturn</strong> — planet of structure, discipline, time, and mastery. Saturn's placement in your chart shows where your most important work of building and responsibility lies, and how your Capricornian discipline actually functions.</p>`
  },
  {
    sign: "Aquarius", slug: "aquarius-rising-sign-meaning",
    title: "Aquarius Rising: Complete Guide to the Aquarius Ascendant Personality",
    desc: "Aquarius Rising gives you an original, independent, and slightly otherworldly first impression. People sense your unique perspective and progressive thinking before you explain yourself. Learn about Aquarius Ascendant.",
    keywords: ["aquarius rising","aquarius ascendant","aquarius rising personality","aquarius rising appearance","aquarius rising meaning"],
    preview: `<h2>The First Impression You Make</h2>
<p>With <strong>Aquarius Rising</strong>, people immediately sense that you're someone who sees things differently. There's an originality to your presentation — in how you dress, how you speak, what you notice — that marks you as distinctly your own person, operating somewhat outside the standard social script.</p>
<p>You come across as friendly but slightly detached, progressive, and genuinely interested in ideas that most people haven't thought about yet.</p>
<h2>Key Personality Traits of Aquarius Rising</h2>
<ul>
<li><strong>Original and unconventional:</strong> Your personal style and worldview are distinctly your own</li>
<li><strong>Progressive and forward-thinking:</strong> You're naturally oriented toward what's coming, not what's established</li>
<li><strong>Friendly but emotionally reserved:</strong> You relate easily at the level of ideas, but intimacy takes longer</li>
<li><strong>Strong humanitarian instinct:</strong> You care deeply about systems, groups, and collective wellbeing</li>
<li><strong>Resistant to conformity:</strong> Even well-intentioned social pressure produces resistance in you</li>
</ul>
<h2>Uranus as Aquarius Rising Ruler</h2>
<p>Your chart ruler is <strong>Uranus</strong> — planet of revolution, innovation, and freedom. Uranus's placement shows where you most need to break from convention and where your most original contributions live.</p>`
  },
  {
    sign: "Pisces", slug: "pisces-rising-sign-meaning",
    title: "Pisces Rising: Complete Guide to the Pisces Ascendant Personality",
    desc: "Pisces Rising gives you a gentle, dreamy, and deeply empathic first impression. People sense your sensitivity and spiritual depth immediately. Discover everything about Pisces Ascendant personality and meaning.",
    keywords: ["pisces rising","pisces ascendant","pisces rising personality","pisces rising appearance","pisces rising meaning"],
    preview: `<h2>The First Impression You Make</h2>
<p>With <strong>Pisces Rising</strong>, people immediately sense something gentle, dreamy, and boundaryless about you. Your presence has a fluid, impressionistic quality — you seem to blend into environments and attune to others with an ease that can feel almost uncanny.</p>
<p>You project empathy before you say anything. People feel seen and understood in your company, often without knowing why.</p>
<h2>Key Personality Traits of Pisces Rising</h2>
<ul>
<li><strong>Deeply empathic:</strong> You absorb others' emotional states, sometimes without intending to</li>
<li><strong>Dreamy and imaginative:</strong> You move through the world with a quality of otherworldliness</li>
<li><strong>Fluid and adaptable:</strong> You shape yourself to environments with unusual ease</li>
<li><strong>Spiritually attuned:</strong> Unseen dimensions of reality feel more real to you than to most</li>
<li><strong>Porous boundaries:</strong> Both a gift (profound empathy) and a challenge (difficulty distinguishing your feelings from others')</li>
</ul>
<h2>Pisces Rising Appearance</h2>
<p>Often large, soft, luminous eyes; a gentle facial quality; and a quality of moving through space as if slightly buoyed by water rather than gravity. The overall impression is someone touched by something beyond the purely material.</p>
<h2>Neptune as Pisces Rising Ruler</h2>
<p>Your chart ruler is <strong>Neptune</strong> — planet of dreams, illusion, spirituality, and transcendence. Neptune's placement in your chart reveals where your imagination and spiritual sensitivity most powerfully operate.</p>`
  }
];

const posts = risingData.map(r => ({
  slug: r.slug,
  category: "astro",
  title: r.title,
  title_en: r.title,
  description: r.desc,
  keywords: r.keywords,
  published_at: "2026-08-11",
  reading_time: 8,
  cta_href: "/birth-chart",
  cta_label: `🔮 Discover Your ${r.sign} Rising — Free Birth Chart`,
  cta_label_en: `Discover Your ${r.sign} Rising — Free Birth Chart`,
  content: r.preview + `\n<h2>How to Work With Your ${r.sign} Rising</h2>\n<p>Your Rising sign is the beginning of your first house — the house of self, appearance, and how you enter the world. Understanding your Ascendant doesn't just tell you how others see you; it reveals the lens through which <em>you</em> experience the world, the instinctive approach you bring to new situations before your deeper personality has a chance to emerge.</p>\n<p>If you don't yet know your Rising sign, you'll need your exact birth time and location to calculate it accurately. Even a difference of a few minutes at birth can change the Rising sign entirely.</p>`
}));

async function main() {
  console.log(`📝 批次Q3：写入 ${posts.length} 篇上升星座指南...`);
  let success = 0, fail = 0;
  for (const post of posts) {
    const { error } = await supabase.from("mysticai_blog_posts").upsert(post, { onConflict: "slug" });
    if (error) { console.error(`  ❌ [${post.slug}]:`, error.message); fail++; }
    else { console.log(`  ✅ [${post.slug}]`); success++; }
  }
  console.log(`\n完成！成功: ${success}, 失败: ${fail}`);
}
main().catch(console.error);
