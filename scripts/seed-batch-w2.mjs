import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);

const posts = [
  {
    slug: "king-of-cups-tarot-meaning",
    title: "King of Cups Tarot — Emotional Mastery, Compassionate Authority & Inner Wisdom",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>King of Cups Tarot — Emotional Mastery, Compassionate Authority & Inner Wisdom</h1>
<p>The King of Cups sits upon his throne amidst turbulent waters, yet remains calm and composed — a symbol of emotional mastery and mature wisdom. He holds a golden cup in one hand and a scepter in the other, demonstrating his ability to balance feeling with authority.</p>

<h2>Card Description & Symbolism</h2>
<p>Unlike other kings who sit on land, the King of Cups floats above the sea, suggesting complete command over the emotional realm. A fish (symbol of the unconscious) leaps beside him. His blue robe speaks of water's depth while his golden crown indicates regal authority.</p>
<ul>
<li><strong>Turbulent sea</strong>: emotional challenges that no longer destabilize him</li>
<li><strong>Golden cup</strong>: mastery of feelings, not suppression but integration</li>
<li><strong>Fish necklace</strong>: connection to the unconscious and intuitive wisdom</li>
<li><strong>Stable throne on water</strong>: equanimity amid emotional flux</li>
</ul>

<h2>Upright King of Cups Meaning</h2>
<p>The King of Cups upright represents a person (or quality within you) who has reached emotional maturity. He feels deeply but does not drown in those feelings. He leads with empathy, counsels with patience, and loves without losing himself.</p>
<h3>Core Upright Qualities</h3>
<ul>
<li>Emotional intelligence and regulation</li>
<li>Compassionate leadership and mentorship</li>
<li>Diplomatic and fair in relationships</li>
<li>Artistic or healing vocation</li>
<li>Balancing head and heart effectively</li>
</ul>

<h2>Love & Relationships — Upright</h2>
<p>In love readings, the King of Cups is one of the best cards to receive. He represents a deeply loving, emotionally available partner who nurtures without smothering. This person listens, understands, and creates a safe space for vulnerability.</p>
<p>If you're asking about a partner: they are genuinely caring, mature, and committed. If about yourself: you're entering a phase of emotional wisdom in love, able to give and receive deeply.</p>

<h2>Career & Money — Upright</h2>
<p>Professionally, this card points toward roles in counseling, medicine, arts, education, or mentorship. You may find success in careers that require emotional intelligence — therapist, teacher, artist, or leader who inspires through empathy rather than force.</p>

<h2>Reversed King of Cups Meaning</h2>
<p>Reversed, the King of Cups can indicate emotional manipulation, suppressed feelings exploding unexpectedly, or using charm for selfish ends. It warns against someone who appears warm but has hidden agendas, or your own tendency to avoid processing difficult emotions.</p>
<h3>Reversed Warnings</h3>
<ul>
<li>Emotional volatility beneath a calm surface</li>
<li>Using empathy to manipulate others</li>
<li>Alcoholism or addictive escapism from feelings</li>
<li>Playing the victim to gain sympathy</li>
<li>Suppressing emotions until they explode</li>
</ul>

<h2>Yes or No?</h2>
<p><strong>Upright: Yes</strong> — with emotional wisdom and compassion guiding the situation.<br><strong>Reversed: Unclear</strong> — emotional undercurrents may complicate the outcome.</p>

<h2>Numerology & Astrology</h2>
<p>The King of Cups is associated with <strong>Scorpio, Cancer, and Pisces</strong> — water signs known for deep emotional capacity. Numerologically, court cards reflect mastery (14 in some systems), suggesting complete integration of the suit's qualities.</p>

<h2>Affirmation</h2>
<p><em>"I feel deeply and wisely. My emotions are my strength, not my weakness."</em></p>
</article>`
  },
  {
    slug: "king-of-wands-tarot-meaning",
    title: "King of Wands Tarot — Visionary Leadership, Bold Passion & Creative Mastery",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>King of Wands Tarot — Visionary Leadership, Bold Passion & Creative Mastery</h1>
<p>The King of Wands is fire in its most commanding form — a natural-born leader who inspires through vision, charisma, and unshakeable confidence. His throne is decorated with lions and salamanders, symbols of fire's enduring spirit.</p>

<h2>Card Description & Symbolism</h2>
<p>The King sits forward on his throne, as if ready to leap into action. His wand blooms with leaves, showing that his energy is alive and creative. A salamander at his feet completes a circle — symbol of transformation through fire.</p>
<ul>
<li><strong>Blooming wand</strong>: creative fire that generates real-world growth</li>
<li><strong>Lion symbol</strong>: courage, authority, and solar power</li>
<li><strong>Salamander</strong>: transformation through passion, endurance in fire</li>
<li><strong>Orange robe</strong>: enthusiasm, creativity, warmth</li>
</ul>

<h2>Upright King of Wands Meaning</h2>
<p>Upright, the King of Wands is a powerhouse of ambition and inspiration. He doesn't just dream — he acts. He sets bold visions and rallies others to achieve them. Think entrepreneur, CEO, charismatic teacher, or creative director.</p>
<h3>Core Upright Qualities</h3>
<ul>
<li>Bold, decisive leadership</li>
<li>Entrepreneurial spirit and risk-taking</li>
<li>Magnetic charisma and natural authority</li>
<li>Long-range vision paired with action</li>
<li>Generosity and mentorship of others</li>
</ul>

<h2>Love & Relationships — Upright</h2>
<p>In romance, the King of Wands is passionate, generous, and exciting. He pursues with confidence and loves with intensity. However, he can be self-focused — he needs a partner who matches his energy and supports his ambitions.</p>
<p>If this represents your partner: expect passionate pursuit and grand gestures. If it represents you: step into your power and lead your love life with confidence.</p>

<h2>Career & Money — Upright</h2>
<p>This is one of the strongest career cards in the deck. The King of Wands in a career reading signals entrepreneurial success, leadership promotions, or breakthrough creative projects. You have what it takes to lead — trust your vision and act boldly.</p>

<h2>Reversed King of Wands</h2>
<p>Reversed, this king becomes domineering, impulsive, or arrogant. He may bully others to achieve his goals, or conversely, become all vision with no execution. His fire burns out of control or extinguishes from lack of direction.</p>
<h3>Reversed Warnings</h3>
<ul>
<li>Autocratic leadership that silences others</li>
<li>Impulsive decisions without considering consequences</li>
<li>Unrealistic grandiosity or ego inflation</li>
<li>Burning out from too many projects at once</li>
</ul>

<h2>Yes or No?</h2>
<p><strong>Upright: Strong Yes</strong> — bold action leads to success.<br><strong>Reversed: Caution</strong> — check your approach before proceeding.</p>

<h2>Astrology Connection</h2>
<p>The King of Wands corresponds to <strong>Aries and Sagittarius</strong> energy — the fire signs of leadership and expansion. He embodies the Sun's yang power at full expression.</p>

<h2>Affirmation</h2>
<p><em>"I lead with passion and vision. My fire lights the way for myself and others."</em></p>
</article>`
  },
  {
    slug: "king-of-swords-tarot-meaning",
    title: "King of Swords Tarot — Intellectual Authority, Clear Truth & Just Judgment",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>King of Swords Tarot — Intellectual Authority, Clear Truth & Just Judgment</h1>
<p>The King of Swords is the embodiment of intellectual mastery and impartial authority. He sits upright on his throne, sword pointing skyward — a symbol of clear thinking cutting through illusion and ambiguity.</p>

<h2>Card Description & Symbolism</h2>
<p>Unlike the emotional King of Cups or the passionate King of Wands, the King of Swords rules through reason, logic, and justice. Butterflies adorn his throne representing transformation through thought. Storm clouds behind him indicate he has faced turbulence and emerged clear.</p>
<ul>
<li><strong>Upright sword</strong>: truth, justice, clear judgment</li>
<li><strong>Butterflies</strong>: transformation of thought</li>
<li><strong>Blue robe</strong>: intellectual clarity, communication</li>
<li><strong>Storm clouds</strong>: challenges navigated through reason</li>
</ul>

<h2>Upright King of Swords Meaning</h2>
<p>The King of Swords upright represents the highest expression of mental clarity — the judge, lawyer, strategist, scientist, or leader who cuts through emotion to find objective truth. He is ethical, fair, and can be counted on for honest counsel.</p>
<h3>Core Qualities</h3>
<ul>
<li>Intellectual authority and analytical mastery</li>
<li>Commitment to truth and justice</li>
<li>Strategic thinking and planning</li>
<li>Objective, unbiased decision-making</li>
<li>High ethical standards and integrity</li>
</ul>

<h2>Love & Relationships — Upright</h2>
<p>In love readings, the King of Swords can feel cool or detached — but that's because he values honesty over sentimentality. He's a reliable partner who communicates clearly and keeps commitments. He may struggle with emotional expression but shows love through loyalty and practical support.</p>

<h2>Career & Money — Upright</h2>
<p>Excellent in fields requiring sharp analysis: law, medicine, academia, finance, engineering, or management consulting. The King of Swords in a career spread indicates you have the clarity and authority to make decisive, correct choices. Trust your analysis.</p>

<h2>Reversed King of Swords</h2>
<p>Reversed, the King of Swords becomes tyrannical, cold, or manipulative with words. He may use his intellectual gifts to dominate, gaslight, or cut others down. This reversal warns of a harsh critic, a manipulative debater, or your own tendency toward cold detachment.</p>

<h2>Yes or No?</h2>
<p><strong>Upright: Yes</strong> — the situation requires clear-eyed decision making, which is available to you.<br><strong>Reversed: No or caution</strong> — someone may be manipulating the truth.</p>

<h2>Affirmation</h2>
<p><em>"My mind is sharp and fair. I speak truth with clarity and act with integrity."</em></p>
</article>`
  },
  {
    slug: "king-of-pentacles-tarot-meaning",
    title: "King of Pentacles Tarot — Material Mastery, Reliable Wealth & Abundant Success",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>King of Pentacles Tarot — Material Mastery, Reliable Wealth & Abundant Success</h1>
<p>The King of Pentacles sits on a throne covered with carvings of bulls and vines, wearing a robe embroidered with grapes — the ultimate image of earthly abundance mastered. He holds a golden pentacle in one hand, representing wealth wisely cultivated over time.</p>

<h2>Card Description & Symbolism</h2>
<p>Gardens surround him, his castle visible in the background — he has built lasting success through patience and practical wisdom. Unlike the brash King of Wands, this king achieved wealth slowly, sustainably, and ethically.</p>
<ul>
<li><strong>Bull imagery</strong>: Taurus energy — patience, reliability, material focus</li>
<li><strong>Vines and grapes</strong>: abundance that has grown organically over time</li>
<li><strong>Golden pentacle</strong>: mastery of the material world</li>
<li><strong>Castle in background</strong>: lasting achievement and security built over time</li>
</ul>

<h2>Upright King of Pentacles Meaning</h2>
<p>The King of Pentacles upright is the self-made person who built wealth through discipline, practicality, and consistent effort. He is generous with his abundance, reliable as a partner, and grounded in reality. He represents financial success, business acumen, and the rewards of hard work.</p>
<h3>Core Qualities</h3>
<ul>
<li>Financial mastery and abundance mindset</li>
<li>Reliable, stable, and dependable</li>
<li>Generous provider and protector</li>
<li>Business success through practical wisdom</li>
<li>Enjoying the fruits of patient labor</li>
</ul>

<h2>Love & Relationships — Upright</h2>
<p>In love, the King of Pentacles is a reliable, generous partner who provides security and stability. He may not be the most romantic, but his love is expressed through consistent acts of service, financial provision, and unwavering presence. A committed, trustworthy partner for the long term.</p>

<h2>Career & Money — Upright</h2>
<p>This is one of the best financial cards in tarot. The King of Pentacles in a career or money reading signals success, prosperity, and the ability to manage resources masterfully. You're either becoming this person or attracting this energy. Business ventures are favored. Investments pay off.</p>

<h2>Reversed King of Pentacles</h2>
<p>Reversed, this king may become obsessed with wealth at the expense of relationships, or conversely, mismanage finances and become unreliable. He can be stubborn, materialistic, or use money as a tool for control.</p>

<h2>Yes or No?</h2>
<p><strong>Upright: Yes</strong> — especially for financial, business, and long-term security questions.<br><strong>Reversed: Caution</strong> — check your relationship with money and material values.</p>

<h2>Affirmation</h2>
<p><em>"I build lasting abundance through patience, discipline, and practical wisdom."</em></p>
</article>`
  },
  {
    slug: "queen-of-cups-tarot-meaning",
    title: "Queen of Cups Tarot — Intuitive Empathy, Emotional Depth & Compassionate Wisdom",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Queen of Cups Tarot — Intuitive Empathy, Emotional Depth & Compassionate Wisdom</h1>
<p>The Queen of Cups sits on her throne at the edge of the water, holding an ornate, covered cup — suggesting that her emotional wisdom comes from the depths of the unconscious. She gazes at her cup with deep introspection, a compassionate dreamer who feels everything.</p>

<h2>Card Description & Symbolism</h2>
<p>Unlike other cups court cards whose cups are open, the Queen's cup is closed — her emotional knowing is private, intuitive, not easily explained. Her throne is decorated with sea creatures and water nymphs, rooting her in the fluid realm of feeling and vision.</p>
<ul>
<li><strong>Closed ornate cup</strong>: hidden emotional depths, private intuition</li>
<li><strong>Water at her feet</strong>: intimate connection to the emotional world</li>
<li><strong>Sea creatures on throne</strong>: rule over the unconscious realm</li>
<li><strong>Blue dress</strong>: emotional wisdom, spiritual sensitivity</li>
</ul>

<h2>Upright Queen of Cups Meaning</h2>
<p>The Queen of Cups upright represents extraordinary emotional intelligence, deep empathy, and nurturing wisdom. She doesn't just sympathize — she truly understands the emotional experience of others. She is intuitive, often psychically sensitive, and provides a safe harbor for those in emotional need.</p>
<h3>Core Qualities</h3>
<ul>
<li>Deep empathy and compassionate listening</li>
<li>Highly intuitive, often psychically gifted</li>
<li>Nurturing, caring, emotionally supportive</li>
<li>Creative and imaginative</li>
<li>Ability to reflect back others' true feelings</li>
</ul>

<h2>Love & Relationships — Upright</h2>
<p>In love readings, the Queen of Cups is a deeply devoted, emotionally attuned partner. She loves wholeheartedly and creates deep emotional bonds. She brings warmth, understanding, and psychic sensitivity to relationships. However, she must guard against absorbing others' emotional pain as her own.</p>

<h2>Career & Money — Upright</h2>
<p>This queen thrives in healing, counseling, spiritual work, art, poetry, or any vocation that requires emotional sensitivity. She succeeds by listening deeply and offering what others truly need emotionally. Trust your intuition in professional matters.</p>

<h2>Reversed Queen of Cups</h2>
<p>Reversed, the Queen of Cups can become overly emotional, manipulative through guilt, or drowned in her own feelings. She may be codependent, unable to separate her emotions from others', or use emotional sensitivity to avoid responsibility.</p>

<h2>Yes or No?</h2>
<p><strong>Upright: Yes</strong> — follow your heart and intuition.<br><strong>Reversed: Unclear</strong> — emotional confusion may be clouding judgment.</p>

<h2>Affirmation</h2>
<p><em>"My empathy is my superpower. I feel deeply and love unconditionally."</em></p>
</article>`
  },
  {
    slug: "queen-of-wands-tarot-meaning",
    title: "Queen of Wands Tarot — Fierce Confidence, Magnetic Charisma & Creative Power",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Queen of Wands Tarot — Fierce Confidence, Magnetic Charisma & Creative Power</h1>
<p>The Queen of Wands sits on her throne holding a blooming wand in one hand and a sunflower in the other — symbols of life force and solar confidence. A black cat sits at her feet, hinting at her connection to the intuitive and the mystical. She radiates warmth, authority, and irresistible energy.</p>

<h2>Card Description & Symbolism</h2>
<p>Unlike the Queen of Cups who looks inward, the Queen of Wands faces forward with an open, inviting gaze. She is outward-directed fire — social, passionate, and magnetic. She doesn't just have power; she shares it generously.</p>
<ul>
<li><strong>Sunflower</strong>: solar energy, joy, confidence, warmth</li>
<li><strong>Blooming wand</strong>: living creative force</li>
<li><strong>Black cat</strong>: intuition, independence, mystical awareness</li>
<li><strong>Lion throne</strong>: Leo energy — queen of her own domain</li>
</ul>

<h2>Upright Queen of Wands Meaning</h2>
<p>The Queen of Wands upright is confidence personified. She knows who she is, what she wants, and moves toward it with passionate certainty. She is naturally magnetic — people are drawn to her energy, enthusiasm, and generosity. She succeeds through authenticity and bold self-expression.</p>
<h3>Core Qualities</h3>
<ul>
<li>Radiant confidence and self-assurance</li>
<li>Magnetic charisma and social warmth</li>
<li>Creative fire and artistic passion</li>
<li>Entrepreneurial energy and independence</li>
<li>Fierce loyalty and protective love</li>
</ul>

<h2>Love & Relationships — Upright</h2>
<p>In love, the Queen of Wands is passionate, exciting, and deeply loyal. She loves with her whole self and inspires her partner to be their best. She won't tolerate being dimmed — she needs a partner who celebrates her fire rather than fearing it.</p>

<h2>Career & Money — Upright</h2>
<p>Any career that lets her shine: performer, entrepreneur, leader, coach, marketer, artist. The Queen of Wands in a career reading signals you're ready to step into the spotlight. Own your talents. Lead with enthusiasm. Your confidence will attract opportunities.</p>

<h2>Reversed Queen of Wands</h2>
<p>Reversed, the Queen's fire turns inward — insecurity, jealousy, or demanding behavior. She may become controlling or temperamental when her needs aren't met, or retreat into self-doubt despite her outward fire.</p>

<h2>Yes or No?</h2>
<p><strong>Upright: Strong Yes</strong> — confidence and action lead to success.<br><strong>Reversed: Uncertain</strong> — check insecurities before moving forward.</p>

<h2>Affirmation</h2>
<p><em>"I am magnetic, powerful, and worthy of everything I desire. My fire lights the world."</em></p>
</article>`
  },
  {
    slug: "queen-of-swords-tarot-meaning",
    title: "Queen of Swords Tarot — Sharp Intelligence, Honest Truth & Independent Clarity",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Queen of Swords Tarot — Sharp Intelligence, Honest Truth & Independent Clarity</h1>
<p>The Queen of Swords sits high on her throne, sword raised with one hand while the other beckons. She gazes ahead with piercing clarity — she has seen through illusion and emerged on the other side with crystalline wisdom. Storm clouds part around her; her mind has weathered every storm.</p>

<h2>Card Description & Symbolism</h2>
<p>She sits alone — not from loneliness but by choice. The Queen of Swords has learned to rely on her own clear judgment. A butterfly on her crown symbolizes transformation through suffering; she has transmuted pain into wisdom.</p>
<ul>
<li><strong>Raised sword</strong>: commitment to truth, mental precision</li>
<li><strong>Beckoning hand</strong>: openness to those who can handle truth</li>
<li><strong>Butterfly crown</strong>: transformation through experience</li>
<li><strong>Stormy sky</strong>: has navigated emotional turbulence into clarity</li>
</ul>

<h2>Upright Queen of Swords Meaning</h2>
<p>The Queen of Swords upright is the embodiment of honest, clear, independent thinking. She does not suffer fools or tolerate deception. Her wisdom often comes from having endured difficulty — loss, betrayal, hardship — and emerging stronger and clearer. She is the woman who tells the truth kindly but without flinching.</p>
<h3>Core Qualities</h3>
<ul>
<li>Sharp, clear, analytical intelligence</li>
<li>Commitment to honesty and truth</li>
<li>Independence and self-sufficiency</li>
<li>Wisdom hard-won through experience</li>
<li>Ability to perceive others' true motives</li>
</ul>

<h2>Love & Relationships — Upright</h2>
<p>The Queen of Swords in love values honesty above all. She won't play games or tolerate ambiguity. Her standards are high because she knows her worth. Though she may seem cool, she loves deeply — she simply expresses it through loyalty, honesty, and intellectual connection.</p>

<h2>Career — Upright</h2>
<p>Excels in law, journalism, research, writing, analysis, or any field requiring clear thinking and strong communication. Her directness is an asset in professional environments that value results over politics.</p>

<h2>Reversed Queen of Swords</h2>
<p>Reversed: bitter, cold, or using intelligence to wound. She may become a sharp-tongued critic who cuts others down, or a closed-off loner who has decided all warmth leads to pain. Watch for cynicism masquerading as wisdom.</p>

<h2>Yes or No?</h2>
<p><strong>Upright: Yes</strong> — clear thinking and honest assessment point the way.<br><strong>Reversed: No</strong> — emotional wounds or cynicism may be distorting judgment.</p>

<h2>Affirmation</h2>
<p><em>"My mind is my sanctuary. I see clearly, speak honestly, and trust my own wisdom."</em></p>
</article>`
  },
  {
    slug: "queen-of-pentacles-tarot-meaning",
    title: "Queen of Pentacles Tarot — Nurturing Abundance, Practical Magic & Earthy Wisdom",
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Queen of Pentacles Tarot — Nurturing Abundance, Practical Magic & Earthy Wisdom</h1>
<p>The Queen of Pentacles sits in a blooming garden, cradling a golden pentacle in her lap with tender attention. Roses arch overhead; a rabbit leaps at her feet. She is the nurturing earth mother — abundant, practical, and deeply connected to the physical world.</p>

<h2>Card Description & Symbolism</h2>
<p>Unlike the King of Pentacles who built wealth in the world, this Queen cultivates it within the domestic and natural sphere. Her magic is in making every space she inhabits thrive — gardens, homes, families, businesses.</p>
<ul>
<li><strong>Golden pentacle in lap</strong>: material abundance tended with care</li>
<li><strong>Blooming garden</strong>: everything she touches grows and flourishes</li>
<li><strong>Rabbit</strong>: fertility, abundance, the natural cycle</li>
<li><strong>Rose arch</strong>: beauty cultivated with intention and patience</li>
</ul>

<h2>Upright Queen of Pentacles Meaning</h2>
<p>She is the ultimate earth goddess — practical, nurturing, resourceful, and abundantly generous. She knows how to create comfort and beauty from what's available. She is a talented homemaker, businesswoman, or community builder who grounds big dreams in practical reality.</p>
<h3>Core Qualities</h3>
<ul>
<li>Practical wisdom and resourcefulness</li>
<li>Nurturing, generous, and warmly hospitable</li>
<li>Financial savvy — she makes money grow</li>
<li>Deeply connected to nature and body</li>
<li>Creates beauty and abundance in daily life</li>
</ul>

<h2>Love & Relationships — Upright</h2>
<p>In love, this queen shows affection through acts of service — cooking, creating a beautiful home, physical touch, thoughtful gifts. She is loyal, sensual, and deeply devoted. She needs a partner who appreciates her practical magic and earthy sensuality.</p>

<h2>Career & Money — Upright</h2>
<p>Excellent for real estate, finance, homemaking businesses, cooking, wellness, gardening, or any work creating tangible value. Money flows when she applies her natural talent for making things grow. Her investments are wise and patient.</p>

<h2>Reversed Queen of Pentacles</h2>
<p>Reversed: neglect of practical responsibilities, financial mismanagement, or using material means to control others. She may become a workaholic who neglects relationships, or conversely, an insecure person who hoards resources out of fear of scarcity.</p>

<h2>Yes or No?</h2>
<p><strong>Upright: Yes</strong> — nurture your resources and practical steps lead to abundance.<br><strong>Reversed: Caution</strong> — check your relationship with money and security.</p>

<h2>Affirmation</h2>
<p><em>"I am abundant, resourceful, and my practical wisdom creates lasting prosperity."</em></p>
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
