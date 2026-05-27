/**
 * 批次R1：金星星座全12个（Venus Sign）+ 火星星座全12个（Mars Sign）
 * 这是出生盘解析中搜索量最高的两个行星位置之一
 */
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);

const venusData = [
  { sign: "Aries", love: "You fall fast, pursue directly, and need a relationship that feels exciting and alive. You're drawn to the chase and may lose interest once conquest is complete — learning to build passion after the initial rush is your growth edge.", beauty: "Bold, energetic style. You're drawn to statement pieces, athletic silhouettes, and the color red.", shadow: "Impatience in love; moving on before giving real depth a chance to develop." },
  { sign: "Taurus", love: "Sensual, loyal, and deeply invested once committed. You love slowly and deliberately — and you stay. Physical affection, comfort, and material security matter enormously in love.", beauty: "Luxurious textures, quality over quantity, natural beauty. You're drawn to genuinely beautiful things that last.", shadow: "Possessiveness; difficulty ending relationships that have clearly run their course." },
  { sign: "Gemini", love: "Witty, communicative, and perpetually curious about your partner. You need intellectual connection as much as emotional connection — boring conversations kill your attraction faster than anything.", beauty: "Eclectic, playful, trend-aware. You enjoy mixing styles and surprising people with unexpected aesthetic choices.", shadow: "Inconsistency in love; starting connections you don't fully develop; emotional unavailability disguised as lightness." },
  { sign: "Cancer", love: "Deeply nurturing, emotionally invested, and profoundly loyal. You love with your whole heart and create an almost maternal warmth in relationships. Home and family feel deeply connected to love for you.", beauty: "Soft, romantic, nostalgic aesthetics. Vintage pieces, comfortable elegance, things with sentimental value.", shadow: "Clinginess; emotional manipulation when insecure; difficulty letting go of people who've moved on." },
  { sign: "Leo", love: "Passionate, generous, and theatrical in love. You love to celebrate your partner — and you need to be celebrated in return. Love for you is a performance of mutual devotion and pride.", beauty: "Bold, luxurious, attention-commanding. Gold tones, statement jewelry, dramatic fashion choices.", shadow: "Ego in love; needing constant admiration; difficulty when the spotlight shifts away from you." },
  { sign: "Virgo", love: "Thoughtful, devoted, and expressive through acts of service. You may not be overtly romantic, but you show love through careful attention, practical help, and genuine dedication to your partner's wellbeing.", beauty: "Clean, precise, quietly elegant. Excellent quality basics; impeccable grooming; subtlety over flash.", shadow: "Over-critical of partners; difficulty relaxing into imperfection; love expressed so practically it doesn't land emotionally." },
  { sign: "Libra", love: "Romantic, harmonizing, and genuinely invested in creating a beautiful partnership. You're drawn to elegance, fairness, and the aesthetic experience of being in love. You're Venus's home sign — you do love exceptionally well.", beauty: "Balanced, harmonious, and classically beautiful. Symmetry, refined taste, effortless elegance.", shadow: "People-pleasing in love; suppressing your needs for harmony; indecision about partners when you feel someone new." },
  { sign: "Scorpio", love: "Intensely devoted, deeply loyal, and profoundly transformative in love. You don't do surface-level relationships. Once you commit, you give everything — and you expect the same depth in return.", beauty: "Dark, magnetic, powerfully sensual. Deep colors, understated intensity, pieces that feel charged.", shadow: "Jealousy and possessiveness; trust issues that test relationships; the line between intensity and control." },
  { sign: "Sagittarius", love: "Freedom-loving, adventurous, and drawn to partners who expand your world. You need space to be yourself in relationships and you love most deeply when you don't feel trapped.", beauty: "Bohemian, world-traveler aesthetic. Ethnic textiles, comfortable freedom, natural materials.", shadow: "Commitment-avoidance; brutal honesty without emotional sensitivity; being physically present but emotionally elsewhere." },
  { sign: "Capricorn", love: "Serious, loyal, and building toward something lasting. You're not casual about love — you invest carefully and then commit with quiet, steady devotion. You express love through provision and protection.", beauty: "Classic, structured, high quality. Investment pieces, traditional elegance, understated authority.", shadow: "Work taking priority over relationships; emotional guardedness that keeps genuine intimacy at a distance." },
  { sign: "Aquarius", love: "Unusual, intellectually electric, and fiercely independent in love. You need a partner who is also your intellectual equal and best friend. Conventional romantic expectations feel constraining to you.", beauty: "Avant-garde, unique, ahead of trends. You're drawn to unusual pieces that express your individuality.", shadow: "Emotional detachment disguised as independence; difficulty with the mundane dailiness of committed love." },
  { sign: "Pisces", love: "Dreamy, profoundly romantic, and emotionally boundaryless in love. You feel deeply and give without counting. The risk: projecting an idealized version of a partner onto a real, flawed human being.", beauty: "Ethereal, fluid, romantically soft. Flowing fabrics, dreamlike colors, vintage and mystical aesthetics.", shadow: "Romantic illusions; difficulty seeing people as they are; losing yourself in love." }
];

const marsData = [
  { sign: "Aries", drive: "Fastest, most direct Mars placement. You act immediately on desire and impulse, pursue with fearless directness, and at your best, have incredible pioneering energy.", anger: "Explosive but short-lived — you flare, you say it, and then it's over for you (though not always for others).", shadow: "Impulsiveness; starting without finishing; taking on more than one battle at a time." },
  { sign: "Taurus", drive: "Slow to start, but once in motion, nearly unstoppable. Your energy is patient, sustained, and deeply physical. You pursue what you want with quiet, immovable determination.", anger: "Extremely slow to anger — but when finally pushed to the limit, the reaction is seismic and long-remembered.", shadow: "Stubbornness that becomes stagnation; inertia disguised as steadiness." },
  { sign: "Gemini", drive: "Quick, curious, and multidirectional. You pursue multiple goals simultaneously and bring mental agility to everything you attempt. Your energy is scattered by design — a feature, not a bug, when channeled well.", anger: "Verbal, sharp, and argumentative. You win fights with words.", shadow: "Scattered energy; starting many projects without completing them; restlessness that prevents sustained effort." },
  { sign: "Cancer", drive: "Motivated by emotional connection and security. You work hardest for the people and things you care about. Your energy has strong defensive qualities — protection, not conquest.", anger: "Passive-aggressive or withdrawn. Rarely direct; sulking and emotional withdrawal are more likely than confrontation.", shadow: "Difficulty asserting directly; moodiness that affects energy levels; overly protective instincts." },
  { sign: "Leo", drive: "Bold, creative, and fired by recognition and pride. You perform brilliantly when appreciated and struggle when overlooked. Your energy is dramatic and generative.", anger: "Dramatic, proud, and tends toward wounded performance more than aggression. 'How could you do this to ME.'", shadow: "Needing an audience to perform; ego driving action rather than genuine purpose." },
  { sign: "Virgo", drive: "Precise, methodical, and driven by the desire to improve things. You work with extraordinary attention to detail and you're motivated by genuine competence and usefulness.", anger: "Critical and fault-finding — your anger tends to express through analysis of everything that's wrong.", shadow: "Perfectionism that paralyzes; criticism as the primary tool; anxious overwork." },
  { sign: "Libra", drive: "Motivated by collaboration, fairness, and aesthetic quality. You work best in partnership and you bring a diplomatic quality to getting things done. Mars is in its detriment here — action requires more effort.", anger: "Highly conflict-averse; passive-aggressive; tends to keep score rather than address directly.", shadow: "Difficulty with decisive, direct action; waiting for consensus when individual action is needed." },
  { sign: "Scorpio", drive: "Intensely focused, strategically patient, and pursuing goals with complete, even obsessive commitment. Mars is in its traditional home here. When you want something, you do not stop.", anger: "Cold, strategic, and long-memoried. You don't forget, and your response to betrayal can be devastating.", shadow: "Vindictiveness; power struggles; inability to release when letting go would serve you better." },
  { sign: "Sagittarius", drive: "Enthusiastic, expansive, and inspired by vision and meaning. You pursue big goals with infectious optimism. You need to believe in what you're doing to sustain effort.", anger: "Righteous, philosophical, and blunt. Your anger becomes a lecture on principle.", shadow: "Overextension; promising more than can be delivered; inconsistency in sustained effort." },
  { sign: "Capricorn", drive: "Mars is exalted here. Disciplined, strategic, and extraordinarily productive over long timeframes. You channel ambition into careful, sustained effort toward worthwhile goals.", anger: "Cold and controlled — you rarely lose it publicly. When you do, it's measured and precise.", shadow: "All work, no play; ambition that overrides relationships and rest; difficulty with impulsive joy." },
  { sign: "Aquarius", drive: "Motivated by ideas, reform, and collective progress. You work best when aligned with a cause or vision larger than personal gain. Unusual, inventive approaches to problems.", anger: "Detached, principled, and can turn ice-cold. Tends to debate rather than rage.", shadow: "Inconsistent personal follow-through; difficulty with physical or mundane sustained effort." },
  { sign: "Pisces", drive: "Empathic, imaginative, and creatively driven. You work best when emotionally and spiritually aligned with what you're doing. Enormous energy for art, healing, and spiritual practice.", anger: "Indirect, passive, and often dissolves into sadness or withdrawal rather than direct confrontation.", shadow: "Lack of decisive action; self-sacrifice that leads to resentment; difficulty with sustained physical energy." }
];

const posts = [
  ...venusData.map(v => ({
    slug: `venus-in-${v.sign.toLowerCase()}-meaning`,
    category: "astro",
    title: `Venus in ${v.sign}: Love Style, Beauty, and Relationship Patterns`,
    title_en: `Venus in ${v.sign}: Love Style, Beauty, and Relationship Patterns`,
    description: `Venus in ${v.sign} shapes how you love, what you find beautiful, and how you behave in relationships. This complete guide reveals your Venus sign's love language, aesthetic, and shadow patterns.`,
    keywords: [`venus in ${v.sign.toLowerCase()}`, `${v.sign.toLowerCase()} venus`, `venus ${v.sign.toLowerCase()} meaning`, `venus in ${v.sign.toLowerCase()} love`, `${v.sign.toLowerCase()} venus sign`],
    published_at: "2026-08-19",
    reading_time: 7,
    cta_href: "/birth-chart",
    cta_label: "🔮 Find Your Venus Sign — Free Birth Chart",
    cta_label_en: "Find Your Venus Sign — Free Birth Chart",
    content: `<h2>What Venus in ${v.sign} Means</h2>
<p>Venus is the planet of love, beauty, pleasure, and values. Where Venus falls in your birth chart reveals how you approach romantic relationships, what you find attractive, what aesthetic sensibility guides your choices, and what you most value in connection with others.</p>
<p>With <strong>Venus in ${v.sign}</strong>, your love nature carries the distinct qualities of ${v.sign} energy.</p>
<h2>Your Love Style</h2>
<p>${v.love}</p>
<h2>Your Aesthetic Sensibility</h2>
<p>${v.beauty}</p>
<h2>The Shadow Side</h2>
<p>${v.shadow}</p>
<h2>Venus in ${v.sign} in Relationships</h2>
<p>Understanding your Venus sign doesn't just tell you how you love — it tells you what you genuinely need from love. When a relationship isn't meeting those Venus-sign needs, the dissatisfaction can feel vague and hard to name. When it does meet them, you feel genuinely nourished.</p>
<p>Venus in ${v.sign} people often find the most natural compatibility with people whose personal planets (Sun, Moon, Rising, Mars) form harmonious angles to your Venus, or who share Venus's element (Fire, Earth, Air, or Water).</p>
<h2>How to Work With Your Venus in ${v.sign}</h2>
<p>The work of Venus is less about changing your love style and more about understanding it clearly enough to make conscious choices. Know what you actually need; know what your shadow patterns look like when you're insecure or unfulfilled; and bring that knowledge into how you choose partners and build relationships.</p>`
  })),
  ...marsData.map(m => ({
    slug: `mars-in-${m.sign.toLowerCase()}-meaning`,
    category: "astro",
    title: `Mars in ${m.sign}: Drive, Anger, and Action Style Explained`,
    title_en: `Mars in ${m.sign}: Drive, Anger, and Action Style Explained`,
    description: `Mars in ${m.sign} shapes how you take action, express anger, pursue desires, and sustain motivation. This complete guide to Mars in ${m.sign} reveals your action style, shadow, and how to work with your Mars energy.`,
    keywords: [`mars in ${m.sign.toLowerCase()}`, `${m.sign.toLowerCase()} mars`, `mars ${m.sign.toLowerCase()} meaning`, `mars in ${m.sign.toLowerCase()} personality`, `${m.sign.toLowerCase()} mars sign`],
    published_at: "2026-08-20",
    reading_time: 7,
    cta_href: "/birth-chart",
    cta_label: "🔮 Find Your Mars Sign — Free Birth Chart",
    cta_label_en: "Find Your Mars Sign — Free Birth Chart",
    content: `<h2>What Mars in ${m.sign} Means</h2>
<p>Mars is the planet of action, desire, drive, and how we handle conflict and anger. Where Mars falls in your birth chart reveals how you pursue what you want, what energizes or depletes you, how you express anger, and where your greatest sustained effort lives.</p>
<p>With <strong>Mars in ${m.sign}</strong>, your action energy carries the qualities of ${m.sign}.</p>
<h2>Your Drive and Motivation Style</h2>
<p>${m.drive}</p>
<h2>How You Handle Anger</h2>
<p>${m.anger}</p>
<h2>The Shadow Side</h2>
<p>${m.shadow}</p>
<h2>Mars in ${m.sign} at Work and in Goals</h2>
<p>Your Mars sign is one of the most practical pieces of birth chart information for understanding how you actually function — what sustains your energy, what depletes it, how you perform under pressure, and what kinds of work environments bring out your best rather than your worst.</p>
<p>Understanding your Mars sign can help you stop fighting your natural energy style and start working <em>with</em> it: designing your work, your goals, and your routines in ways that genuinely fit how you're built.</p>
<h2>Working With Your Mars in ${m.sign}</h2>
<p>Mars energy doesn't need to be managed so much as directed. The question isn't how to have less of it or suppress it — it's how to aim it at things worthy of its intensity, and how to recognize when it's operating through its shadow so you can course-correct.</p>`
  }))
];

async function main() {
  console.log(`📝 批次R1：写入 ${posts.length} 篇（金星x12 + 火星x12）...`);
  let success = 0, fail = 0;
  for (const post of posts) {
    const { error } = await supabase.from("mysticai_blog_posts").upsert(post, { onConflict: "slug" });
    if (error) { console.error(`  ❌ [${post.slug}]:`, error.message); fail++; }
    else { console.log(`  ✅ [${post.slug}]`); success++; }
  }
  console.log(`\n完成！成功: ${success}, 失败: ${fail}`);
}
main().catch(console.error);
