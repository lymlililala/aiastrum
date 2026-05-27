import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);
const posts = [
  {
    slug: "aries-rising-moon-combinations-guide",
    title: "Aries Rising With Each Moon Sign — How Your Rising & Moon Create Your Full Personality",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Aries Rising With Each Moon Sign — How Your Rising & Moon Create Your Full Personality</h1>
<p>Your rising sign (Ascendant) shapes how you appear to the world; your Moon sign reveals your emotional nature and inner needs. When Aries Rising meets each Moon sign, distinctly different personalities emerge.</p>
<h2>Aries Rising + Aries Moon</h2>
<p>Double fire, double directness. Impulsive, passionate, leads with feelings and actions simultaneously. Needs space for intense emotion without judgment. Can be overwhelming but magnetically authentic.</p>
<h2>Aries Rising + Taurus Moon</h2>
<p>Presents boldly but needs security beneath. The striking first impression conceals a deep need for stability and sensory comfort. More patient and grounded than the Aries energy suggests once you get past the surface.</p>
<h2>Aries Rising + Gemini Moon</h2>
<p>Fast, clever, and unpredictable. Quick first impressions that shift as their curious mind explores every angle. Needs mental stimulation to feel emotionally secure. Excellent communicator when the mind and heart align.</p>
<h2>Aries Rising + Cancer Moon</h2>
<p>Bold exterior protecting a sensitive interior. The toughest-looking combination often hides the most vulnerable heart. These people need safe people to be soft with — their strength is a shield over tenderness.</p>
<h2>Aries Rising + Leo Moon</h2>
<p>Double-fire confidence and warmth. Generous, dramatic, needs both adventure and recognition. When they love, they do it grandly. When they're hurt, they require acknowledgment before they'll move on.</p>
<h2>Aries Rising + Virgo Moon</h2>
<p>Interesting tension: bold presentation, anxious inner life. Appears confident while internally analyzing every detail. Needs order and precision to feel emotionally secure beneath the decisive exterior.</p>
<h2>Aries Rising + Libra Moon</h2>
<p>Opposite sign Moon creates constant inner negotiation between independence (Aries) and relatedness (Libra). Needs partnerships but rebels against control. Beautiful when balanced; anxious when the tension isn't integrated.</p>
<h2>Aries Rising + Scorpio Moon</h2>
<p>Intensity squared. Appears fierce, is even fiercer emotionally. Private about deep feelings despite the bold exterior. When they trust you with their inner world, it's profound. Betrayal is catastrophic.</p>
<h2>Aries Rising + Sagittarius Moon</h2>
<p>The freedom-lover's combination. Bold, adventurous, optimistic, and impossible to contain. Needs physical and philosophical freedom to feel emotionally whole. Best partner is a fellow explorer.</p>
<h2>Aries Rising + Capricorn Moon</h2>
<p>Ambitious in action and emotion. The bold Aries exterior is driven by deep Capricorn need for achievement and respect. Works incredibly hard. Needs to achieve concrete results to feel emotionally satisfied.</p>
<h2>Aries Rising + Aquarius Moon</h2>
<p>The revolutionary. Bold action in service of ideals. Needs intellectual freedom and genuine equality in relationships. Doesn't follow rules out of instinct or out of principle — needs to make the rules their own.</p>
<h2>Aries Rising + Pisces Moon</h2>
<p>The warrior-dreamer. Bold on the outside, boundlessly empathetic within. Often feels the tension between their fierce exterior and their deeply compassionate inner world. When integrated, this combination heals through courageous vulnerability.</p></article>`
  },
  {
    slug: "scorpio-rising-moon-combinations-guide",
    title: "Scorpio Rising With Each Moon Sign — Magnetic Depth & Inner Emotional Worlds",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Scorpio Rising With Each Moon Sign — Magnetic Depth & Inner Emotional Worlds</h1>
<p>Scorpio Rising creates an intense, magnetic, somewhat mysterious first impression — these people seem to see through you. Each Moon sign creates a very different emotional core beneath that Scorpionic exterior.</p>
<h2>Scorpio Rising + Aries Moon</h2>
<p>Magnetic presence with fiery inner impulses. The controlled Scorpio exterior conceals an impulsive, passionate emotional core. These people feel intensely but express in strategic, targeted ways. Powerful and potentially volatile when boundaries are crossed.</p>
<h2>Scorpio Rising + Taurus Moon</h2>
<p>Deeply sensual and stubborn. The Scorpio intensity combined with Taurus' love of physical pleasure creates extraordinary sensory awareness. Very difficult to budge once committed — to a person, position, or possession.</p>
<h2>Scorpio Rising + Gemini Moon</h2>
<p>A fascinating contradiction: deep Scorpio exterior with a quick, changeable inner emotional life. These people seem profound but their inner world is more fluid than their appearance suggests. Intellectually probing and emotionally adaptable.</p>
<h2>Scorpio Rising + Cancer Moon</h2>
<p>Double water — maximum empathy and emotional depth. Almost psychic emotional sensitivity. These people absorb others' feelings intensely. Need safe havens and chosen family. Incredibly loyal to those they consider truly close.</p>
<h2>Scorpio Rising + Leo Moon</h2>
<p>Power and pride. The Scorpio magnetism amplified by Leo's need for recognition creates natural leaders and performers. Needs both the privacy Scorpio demands and the acknowledgment Leo requires — a complex balance.</p>
<h2>Scorpio Rising + Virgo Moon</h2>
<p>Investigator and analyst. The Scorpio depth applied to Virgo's precision creates extraordinary research ability and diagnostic skill. Internally more anxious than the powerful exterior suggests; driven by the need to get everything exactly right.</p>
<h2>Scorpio Rising + Libra Moon</h2>
<p>Fascinating tension: Scorpio's intensity versus Libra's desire for harmony. These people feel intensely but often find peaceful, diplomatic ways to navigate that intensity. Need genuine partnership but are selective about who truly earns access.</p>
<h2>Scorpio Rising + Scorpio Moon</h2>
<p>Double Scorpio — extraordinary depth, intensity, and transformative power. One of the most powerful emotional combinations in the zodiac. These people experience life with volcanic intensity that most people cannot fully access or understand.</p>
<h2>Scorpio Rising + Sagittarius Moon</h2>
<p>Profound and free-spirited. The Scorpio depth is applied to Sagittarian quests for meaning and truth. These people investigate the big questions — philosophy, religion, consciousness. Need freedom within their depth explorations.</p>
<h2>Scorpio Rising + Capricorn Moon</h2>
<p>Strategic and ambitious. Perhaps the most controlled combination — the powerful exterior is driven by careful, disciplined emotional management. Achieves through psychological mastery and patient power accumulation.</p>
<h2>Scorpio Rising + Aquarius Moon</h2>
<p>Reformer with depth. The Scorpio intensity applied to Aquarian revolutionary ideals creates powerful social change agents. Emotionally needs freedom and intellectual respect, but brings Scorpionic commitment and follow-through to collective causes.</p>
<h2>Scorpio Rising + Pisces Moon</h2>
<p>The mystic. Both signs are water and both have deep connections to the invisible realms. Extraordinarily intuitive, empathic, and spiritually sensitive. Need significant solitude to process the depth of what they absorb from the world.</p></article>`
  },
  {
    slug: "gemini-rising-personality-complete",
    title: "Gemini Rising — Quick Wit, Social Brilliance & The Dual Personality Explained",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Gemini Rising — Quick Wit, Social Brilliance & The Dual Personality Explained</h1>
<p>Gemini Rising (Gemini Ascendant) gives its natives a quick, communicative, and intellectually agile first impression. These people process information rapidly, communicate with natural ease, and often appear younger and more energetic than their actual age.</p>
<h2>First Impressions: How Gemini Rising Appears</h2>
<ul><li>Quick-witted and verbally agile — always seems to have the right word</li><li>Curious and interested in you — makes excellent initial conversation</li><li>Youthful energy and often younger-looking appearance</li><li>Slightly restless, may seem to be processing multiple things at once</li><li>Friendly and approachable — creates instant social ease</li></ul>
<h2>The Gemini Rising Body & Movement</h2>
<p>Typically quick movements, expressive hands, and an animated face. The Gemini Rising body often reflects the quicksilver Mercury energy: light, mobile, and expressive. Hands are often notably expressive in conversation.</p>
<h2>Gemini Rising in Love</h2>
<p>Needs mental stimulation and communicative compatibility above all else. Falls for intelligence and wit. Can seem inconsistent or commitment-averse to partners who don't understand the Gemini need for freedom and variety — but once genuinely intellectually captivated, can be deeply engaged.</p>
<h2>Gemini Rising vs. Gemini Sun</h2>
<p>While both share intellectual agility, Gemini Rising specifically shapes the social persona and communication style. Even someone with a deeply introverted Sun sign can have a Gemini Rising that creates a light, approachable social mask.</p>
<h2>Career & Life Path</h2>
<p>Any career leveraging communication, information management, or intellectual agility. Writing, media, teaching, marketing, sales, technology, or any rapidly evolving field suits the Gemini Rising need for constant learning and variety.</p>
<h2>Shadow</h2>
<p>The Gemini Rising shadow is superficiality — engaging many things at the surface level without going deep. The development task is learning that depth is possible without losing the breadth and quick adaptability that are genuine gifts.</p></article>`
  },
  {
    slug: "cancer-rising-personality-complete",
    title: "Cancer Rising — Nurturing Presence, Protective Instinct & Emotional Intelligence",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Cancer Rising — Nurturing Presence, Protective Instinct & Emotional Intelligence</h1>
<p>Cancer Rising creates a warm, protective, and emotionally sensitive first impression. People with Cancer Rising seem immediately safe and approachable — others instinctively want to share their feelings and secrets with them.</p>
<h2>First Impressions</h2>
<ul><li>Warm, nurturing energy that makes people feel immediately cared for</li><li>Emotionally perceptive — seems to sense how you're feeling before you say it</li><li>Somewhat reserved until trust is established, then deeply warm</li><li>Often has a round, soft quality to the face and a protective physical presence</li><li>Makes excellent first impressions in personal contexts; can seem guarded in professional settings until trust develops</li></ul>
<h2>The Cancer Rising Shield</h2>
<p>Like the crab, Cancer Rising natives have a hard exterior protecting a soft interior. The initial impression can seem more reserved or guarded than their inner self — this is the protective shell. Once trust is established, extraordinary warmth and loyalty emerge.</p>
<h2>Cancer Rising in Love</h2>
<p>Needs emotional safety and consistent care before fully opening. Extremely loyal and nurturing partners who remember every significant emotional moment. Need a partner who appreciates depth of care without finding it suffocating.</p>
<h2>Cancer Rising & The Moon</h2>
<p>Because the Moon rules Cancer, Cancer Rising natives are especially sensitive to lunar cycles. Energy, mood, and social comfort often shift with the moon's phases. Many Cancer Rising individuals find they're more social around the new or full moon.</p>
<h2>Life Path</h2>
<p>Often drawn to caregiving, family creation, or any work that involves creating emotional safety for others. Real estate, hospitality, psychology, nursing, teaching young children — all Cancer Rising domains.</p></article>`
  },
  {
    slug: "virgo-rising-personality-complete",
    title: "Virgo Rising — Refined Presence, Analytical Mind & The Art of Graceful Precision",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Virgo Rising — Refined Presence, Analytical Mind & The Art of Graceful Precision</h1>
    <p>Virgo Rising creates a composed, thoughtful, and refined first impression. These individuals appear careful, well-put-together, and quietly intelligent — the person in the room who notices everything while saying little until they've processed thoroughly.</p>
<h2>First Impressions</h2>
<ul><li>Neat, refined appearance — details of dress and presentation are carefully attended to</li><li>Thoughtful and analytical communication — chooses words with precision</li><li>Humble demeanor that belies considerable intelligence and capability</li><li>Observant — they're noticing and cataloguing everything before speaking</li><li>Helpful and service-oriented from the first meeting</li></ul>
<h2>Virgo Rising Body Language</h2>
<p>Precise movements, clean and organized personal space, and often a quality of quiet, focused attention. Health consciousness often shows in how they carry themselves — good posture, awareness of the body.</p>
<h2>Virgo Rising in Love</h2>
<p>Shows love through acts of service and attention to the beloved's practical needs. Needs cleanliness, order, and clear communication in the relationship environment. May struggle with expressing emotion directly — but the care shown through action is profound.</p>
<h2>The Inner Critic</h2>
<p>Virgo Rising's greatest challenge is the internal perfectionist that finds fault before acknowledging excellence. Learning to extend to self the same precise care shown to others is the developmental task.</p>
<h2>Career Strengths</h2>
<p>Medicine, research, editing, data analysis, health and wellness industries, administrative excellence. Anywhere precision, reliability, and careful service create value.</p></article>`
  },
  {
    slug: "aquarius-rising-personality-complete",
    title: "Aquarius Rising — Unconventional Presence, Electric Intelligence & Visionary Aura",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Aquarius Rising — Unconventional Presence, Electric Intelligence & Visionary Aura</h1>
<p>Aquarius Rising creates an immediately distinctive, somewhat unusual first impression — these people stand out without trying. There's a quality of the future about them, as if they've arrived slightly ahead of everyone else's timeline.</p>
<h2>First Impressions</h2>
<ul><li>Unique, often unconventional in some aspect of appearance or manner</li><li>Intellectually stimulating from the first conversation</li><li>Friendly but somewhat detached — warm with everyone but intimate with few</li><li>Original thinker who doesn't follow conventional scripts</li><li>Often has unusual eyes with an electric, penetrating quality</li></ul>
<h2>Aquarius Rising Social Dynamic</h2>
<p>Paradoxically both social and detached: they can be the life of any gathering while maintaining inner emotional distance from virtually everyone. They care about humanity abstractly while sometimes struggling with intimacy individually.</p>
<h2>Aquarius Rising in Love</h2>
<p>Needs intellectual equality, freedom, and a partner who respects their individuality. Cannot be possessed, controlled, or made to conform. When they commit, it's because they've chosen freely — and that genuine choice makes them uniquely loyal within the freedom they need.</p>
<h2>Career Strengths</h2>
<p>Technology, social innovation, science, humanitarian work, community organizing, anything at the cutting edge of their field. They see what's possible before others do, and need careers that let them act on that vision.</p>
<h2>Shadow</h2>
<p>Emotional detachment that frustrates those who want deeper intimacy. Intellectual superiority that dismisses feeling. Rebellion as identity rather than purpose.</p></article>`
  },
  {
    slug: "pisces-rising-personality-complete",
    title: "Pisces Rising — Dreamy Presence, Psychic Sensitivity & Compassionate Mystery",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Pisces Rising — Dreamy Presence, Psychic Sensitivity & Compassionate Mystery</h1>
<p>Pisces Rising creates the most otherworldly first impression of all the rising signs — there's a quality of the ocean, the dream, or the sacred about these individuals. They seem not quite of this world, simultaneously present and somewhere else.</p>
<h2>First Impressions</h2>
<ul><li>Gentle, soft, and deeply compassionate — immediately creates a feeling of being understood</li><li>Somewhat ethereal or dreamy quality — eyes often have an unfocused, faraway quality</li><li>Highly receptive and permeable — absorbs the mood of the room</li><li>Difficult to pin down or define — seems to shift and change with the context</li><li>Psychically sensitive — often seems to know things without being told</li></ul>
<h2>The Pisces Rising Challenge</h2>
<p>Maintaining a clear sense of personal identity when the boundaries between self and world are naturally permeable. Pisces Rising must consciously develop containment — spiritual, emotional, and practical — or risks dissolving into whatever environment and people they encounter.</p>
<h2>Pisces Rising in Love</h2>
<p>Deeply romantic, almost mystically connected to partners. Loves with complete dissolution of self-interest. The challenge: loving real people rather than idealized projections. The gift: creating unions of extraordinary spiritual depth and beauty.</p>
<h2>Creative Gifts</h2>
<p>Often extraordinarily gifted in music, visual art, film, poetry, or any creative form that channels the invisible. The ability to translate formless feeling into form is among the greatest Pisces Rising gifts.</p>
<h2>Career Strengths</h2>
<p>Healing arts, music, film, spiritual counseling, psychology, social work, underwater photography — anything connecting to the invisible, the spiritual, or the creative depths.</p></article>`
  },
  {
    slug: "taurus-rising-personality-complete",
    title: "Taurus Rising — Stable Presence, Sensual Magnetism & Earthy Reliability",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Taurus Rising — Stable Presence, Sensual Magnetism & Earthy Reliability</h1>
<p>Taurus Rising creates a grounded, beautiful, and deeply reassuring first impression. These individuals seem reliable, aesthetically aware, and physically present in a way that makes others feel settled simply by being near them.</p>
<h2>First Impressions</h2>
<ul><li>Strong, stable physical presence that conveys reliability and calm</li><li>Often classically beautiful or physically attractive — Venus-ruled rising signs frequently are</li><li>Speaks slowly and deliberately — considers words before using them</li><li>Warm and welcoming, but takes time before fully engaging</li><li>A quality of physical ease and comfort with the material world</li></ul>
<h2>Taurus Rising Physical Appearance</h2>
<p>Often has strong, attractive features with a quality of physical solidity. Venus rulership frequently blesses the appearance. Strong neck, beautiful voice, or particularly attractive physical feature often noted.</p>
<h2>Taurus Rising in Love</h2>
<p>Deeply sensual, extremely loyal, and somewhat slow to commit — but once committed, extraordinarily reliable. Shows love through physical affection, practical support, and the creation of beautiful, comfortable shared environments.</p>
<h2>Career Strengths</h2>
<p>Finance, art, music, real estate, luxury markets, culinary arts, agriculture. Any field where Venusian aesthetics, material skills, or patient accumulation creates value.</p>
<h2>Shadow</h2>
<p>Extreme resistance to change. Stubbornness that outlasts reason. Possessiveness in relationships. The challenge: holding on to what is genuinely valuable while releasing what has outgrown its usefulness.</p></article>`
  },
  {
    slug: "leo-rising-sun-sign-combinations",
    title: "Leo Rising With Each Sun Sign — How Leo's Royal Mask Expresses Different Inner Selves",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Leo Rising With Each Sun Sign — How Leo's Royal Mask Expresses Different Inner Selves</h1>
    <p>Leo Rising creates a confident, warm, and magnetically charming first impression — but the inner self behind that royal presentation varies enormously depending on the Sun sign.</p>
<h2>Leo Rising + Aries Sun</h2>
<p>Double fire, double leader. The Leo Rising presentation is authentic — the Aries inner fire genuinely powers the grand exterior. Natural athlete and entrepreneur who inspires through bold action. The ego needs management or it overwhelms everything.</p>
<h2>Leo Rising + Taurus Sun</h2>
<p>The creative builder. Leo's dramatic presentation conceals Taurus's patient, pleasure-seeking soul. These people appear bold but build methodically. Excellent in luxury industries, arts, and building lasting beautiful things.</p>
<h2>Leo Rising + Gemini Sun</h2>
<p>The brilliant entertainer. Leo's stage presence combined with Gemini's wit creates exceptional performers and communicators. Needs variety within the spotlight. Charming, quick, and intellectually generous.</p>
<h2>Leo Rising + Cancer Sun</h2>
<p>Protective royalty. The Leo presentation protects the sensitive Cancer interior. These people create strong public personas that shield deeply tender inner worlds. Excellent caretakers who lead through emotional intelligence and warmth.</p>
<h2>Leo Rising + Virgo Sun</h2>
<p>The perfectionist with presence. Leo Rising provides confidence and impact; Virgo Sun provides analytical depth and service orientation. These people work harder than they appear to. Excellent as both leaders and detail-masters.</p>
<h2>Leo Rising + Libra Sun</h2>
<p>Social royalty. Both signs are oriented toward beauty, relationship, and social grace. These people move through social worlds with exceptional ease and warmth. Natural diplomats who are also naturally appreciated.</p>
<h2>Leo Rising + Scorpio Sun</h2>
<p>Magnetic power. The Leo exterior draws people in while the Scorpio interior evaluates everything intensely. Appears warm and open while being highly selective about genuine intimacy. Often extremely powerful individuals who use that power deliberately.</p>
<h2>Leo Rising + Sagittarius Sun</h2>
<p>The philosopher-king. Leo's regal presentation serves Sagittarius's need to share wisdom and inspire. Natural teachers, motivational leaders, and adventurous role models. The ego needs checking only when it gets in the way of genuine service.</p>
<h2>Leo Rising + Capricorn Sun</h2>
<p>Ambitious royalty. Leo Rising gives Capricorn's disciplined ambition a warm, impressive public face. These people climb deliberately and look good doing it. Achievement comes from combining Leo's visibility with Capricorn's strategic patience.</p>
<h2>Leo Rising + Aquarius Sun</h2>
<p>The revolutionary leader. Leo Rising provides the charisma and visibility; Aquarius Sun provides the progressive vision. These people inspire collective action through personal magnetism directed toward humanitarian goals.</p>
<h2>Leo Rising + Pisces Sun</h2>
<p>The compassionate performer. Leo's bold presentation serves Pisces' deep empathic gifts. These people have the performance skills to bring invisible emotional truths to visible, accessible form. Artists, healers, and spiritual leaders.</p></article>`
  },
  {
    slug: "libra-rising-personality-complete",
    title: "Libra Rising — Beautiful Presence, Diplomatic Grace & The Art of Perfect Balance",
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article><h1>Libra Rising — Beautiful Presence, Diplomatic Grace & The Art of Perfect Balance</h1>
<p>Libra Rising is considered one of the most elegant and socially gifted Rising signs. These individuals create an immediate impression of refinement, fairness, and beauty — they make everyone around them feel heard, appreciated, and comfortable.</p>
<h2>First Impressions</h2>
<ul><li>Physically attractive — Venus rulership often blesses appearance with symmetry and beauty</li><li>Exquisitely balanced social manner — makes everyone feel at ease</li><li>Charming, pleasant, and diplomatic in all first encounters</li><li>Stylish and aesthetically aware in self-presentation</li><li>Appears calm and balanced even when internally conflicted</li></ul>
<h2>Libra Rising in Love</h2>
<p>Love is where Libra Rising truly comes alive — partnership is their most natural domain. They create beautiful, balanced relationships when they have a partner worthy of their devotion. Struggle with ending relationships even when they should because disharmony feels like failure.</p>
<h2>The Indecision Paradox</h2>
<p>Libra Rising can appear confident while being profoundly indecisive internally. The effort to see every perspective simultaneously makes choosing one direction difficult. Development involves learning that imperfect decisive action creates more than perfect indecision.</p>
<h2>Career</h2>
<p>Diplomacy, law, design, public relations, event planning, arts. Any work requiring social grace, aesthetic judgment, and the ability to create harmony among competing interests.</p>
<h2>Shadow</h2>
<p>People-pleasing that erases genuine preferences. Conflict avoidance that allows problems to fester. The inner life of a Libra Rising can be far more turbulent than the serene exterior suggests.</p></article>`
  }
];
let success = 0, fail = 0;
for (const post of posts) {
  const { error } = await supabase.from("mysticai_blog_posts").upsert(post, { onConflict: "slug" });
  if (error) { console.error(`FAIL [${post.slug}]:`, error.message); fail++; }
  else { console.log(`OK   [${post.slug}]`); success++; }
}
console.log(`\nDone: ${success} success, ${fail} fail`);
