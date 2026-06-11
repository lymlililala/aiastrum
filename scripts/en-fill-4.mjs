// ─── EN fill batch 4：3 篇基础占星科普长文（horoscope / astro / synastry）─────────
// 用法：SUPABASE_SECRET_KEY=sb_secret_xxx node scripts/seed-batch-en-fill-4.mjs（如有独立 seeder）
// 本文件仅导出 POSTS_4，由统一 seeder 引入 upsert 到 mysticai_blog_posts。

export const POSTS_4 = [
  {
    slug: "zodiac-signs-explained",
    category: "horoscope",
    lang: "en",
    title: "The 12 Zodiac Signs Explained: Dates, Traits & Elements",
    title_en: "The 12 Zodiac Signs Explained: Dates, Traits & Elements",
    description:
      "A clear guide to the 12 zodiac signs — their dates, ruling elements, modalities, and key personality traits. Learn what makes each star sign unique.",
    keywords: [
      "zodiac signs",
      "zodiac signs explained",
      "star signs",
      "zodiac dates",
      "zodiac traits",
    ],
    published_at: "2026-06-11",
    reading_time: 8,
    cta_href: "/horoscope",
    cta_label: "Check your free horoscope",
    cta_label_en: "Check your free horoscope",
    content: `<article><h1>The 12 Zodiac Signs Explained: Dates, Traits &amp; Elements</h1>
<p>The zodiac is a band of twelve signs the Sun appears to travel through over the course of a year. Each sign covers roughly 30 days and carries its own personality, ruling planet, element, and modality. Your <strong>Sun sign</strong> — the one most people mean when they ask "what's your sign?" — is simply the sign the Sun occupied on the day you were born. Below is a clear, concise breakdown of all twelve, plus the elements and modalities that group them into a system.</p>

<h2>The 12 Signs at a Glance</h2>

<h3>Aries (March 21 – April 19)</h3>
<p><strong>Fire · Cardinal · Ruled by Mars.</strong> The first sign of the zodiac and a natural initiator. Aries is bold, competitive, and direct, with a pioneering drive to start things others only talk about. The shadow side: impatience and a short fuse.</p>

<h3>Taurus (April 20 – May 20)</h3>
<p><strong>Earth · Fixed · Ruled by Venus.</strong> Grounded, sensual, and steady, Taurus values comfort, security, and the good things in life. Famously loyal and patient — and famously stubborn when pushed.</p>

<h3>Gemini (May 21 – June 20)</h3>
<p><strong>Air · Mutable · Ruled by Mercury.</strong> Curious, quick-witted, and endlessly communicative, Gemini thrives on variety and ideas. The twins love to learn and connect, though they can scatter their focus across too many interests.</p>

<h3>Cancer (June 21 – July 22)</h3>
<p><strong>Water · Cardinal · Ruled by the Moon.</strong> Deeply emotional and protective, Cancer leads with feeling and a strong attachment to home and family. Nurturing and intuitive, but prone to retreating into its shell when hurt.</p>

<h3>Leo (July 23 – August 22)</h3>
<p><strong>Fire · Fixed · Ruled by the Sun.</strong> Warm, generous, and magnetic, Leo loves to shine and lift others up with them. Natural leaders and performers, they crave recognition — and can bruise when it's withheld.</p>

<h3>Virgo (August 23 – September 22)</h3>
<p><strong>Earth · Mutable · Ruled by Mercury.</strong> Practical, precise, and service-minded, Virgo notices the details everyone else misses. Hardworking and analytical, though self-criticism can tip into perfectionism.</p>

<h3>Libra (September 23 – October 22)</h3>
<p><strong>Air · Cardinal · Ruled by Venus.</strong> Charming, diplomatic, and relationship-focused, Libra seeks balance, beauty, and fairness. A gifted peacemaker who can struggle with indecision when every option has a point.</p>

<h3>Scorpio (October 23 – November 21)</h3>
<p><strong>Water · Fixed · Ruled by Mars and Pluto.</strong> Intense, perceptive, and emotionally deep, Scorpio is drawn to truth beneath the surface. Loyal and transformative, but its passion can edge into possessiveness.</p>

<h3>Sagittarius (November 22 – December 21)</h3>
<p><strong>Fire · Mutable · Ruled by Jupiter.</strong> Adventurous, optimistic, and freedom-loving, Sagittarius is the philosopher-traveler of the zodiac. Honest to a fault and always chasing the bigger picture.</p>

<h3>Capricorn (December 22 – January 19)</h3>
<p><strong>Earth · Cardinal · Ruled by Saturn.</strong> Disciplined, ambitious, and responsible, Capricorn climbs steadily toward long-term goals. Pragmatic and resilient, though it can be hard on itself and others.</p>

<h3>Aquarius (January 20 – February 18)</h3>
<p><strong>Air · Fixed · Ruled by Saturn and Uranus.</strong> Inventive, independent, and humanitarian, Aquarius thinks in systems and futures. Visionary and original, but can feel emotionally detached when lost in ideas.</p>

<h3>Pisces (February 19 – March 20)</h3>
<p><strong>Water · Mutable · Ruled by Jupiter and Neptune.</strong> Compassionate, imaginative, and intuitive, Pisces is the dreamer and empath of the zodiac. Deeply creative and sensitive, sometimes to the point of escapism.</p>

<h2>The 4 Elements</h2>
<p>Each sign belongs to one of four elements, which describe its basic temperament:</p>
<ul>
<li><strong>Fire (Aries, Leo, Sagittarius)</strong>: energetic, passionate, action-oriented and inspired.</li>
<li><strong>Earth (Taurus, Virgo, Capricorn)</strong>: grounded, practical, reliable and results-focused.</li>
<li><strong>Air (Gemini, Libra, Aquarius)</strong>: intellectual, social, communicative and idea-driven.</li>
<li><strong>Water (Cancer, Scorpio, Pisces)</strong>: emotional, intuitive, sensitive and deeply feeling.</li>
</ul>

<h2>The 3 Modalities</h2>
<p>The signs are also grouped by modality, which describes how each one moves through the world:</p>
<ul>
<li><strong>Cardinal (Aries, Cancer, Libra, Capricorn)</strong>: initiators who start seasons and projects.</li>
<li><strong>Fixed (Taurus, Leo, Scorpio, Aquarius)</strong>: stabilizers who sustain, build, and persist.</li>
<li><strong>Mutable (Gemini, Virgo, Sagittarius, Pisces)</strong>: adapters who flex, transition, and refine.</li>
</ul>
<p>Combine an element with a modality and you get a sign's signature: cardinal fire (Aries) launches; fixed water (Scorpio) holds depth; mutable air (Gemini) circulates ideas. This is why two fire signs can feel so different.</p>

<h2>Your Sun Sign Is Just the Start</h2>
<p>Your Sun sign captures your core identity and ego, but it's only one piece of a full birth chart. Your Moon sign shapes your emotions and your Rising sign shapes how you come across — together they explain why people of the same star sign can be so unalike. To go deeper than the headline, look at the whole chart.</p>

<h2>Frequently Asked Questions</h2>
<h3>What is the difference between a zodiac sign and a star sign?</h3>
<p>They mean the same thing — both refer to the sign the Sun was in at your birth. "Star sign" is just the more casual, everyday term for your zodiac Sun sign.</p>
<h3>What if I was born on the cusp between two signs?</h3>
<p>Sign dates shift slightly year to year because the Sun doesn't change signs on the exact same clock time annually. If you were born near a boundary, calculate your chart with your birth date, time, and place to confirm which sign the Sun was actually in.</p>
<h3>Which zodiac element am I most compatible with?</h3>
<p>As a rule of thumb, signs share easy chemistry with others of the same element, and with the complementary element (fire with air, earth with water). But true compatibility depends on the whole chart, not the Sun sign alone.</p>
</article>`,
  },

  {
    slug: "sun-moon-rising-signs-explained",
    category: "astro",
    lang: "en",
    title: "Sun, Moon & Rising Signs: What They Mean in Your Chart",
    title_en: "Sun, Moon & Rising Signs: What They Mean in Your Chart",
    description:
      "Your Sun, Moon, and Rising signs are the 'big three' of astrology. Learn what each one governs, how to find them, and how they combine to shape who you are.",
    keywords: [
      "sun moon rising",
      "big three astrology",
      "what is my moon sign",
      "rising sign meaning",
      "sun sign vs moon sign",
    ],
    published_at: "2026-06-11",
    reading_time: 8,
    cta_href: "/astro",
    cta_label: "Get your free birth chart",
    cta_label_en: "Get your free birth chart",
    content: `<article><h1>Sun, Moon &amp; Rising Signs: What They Mean in Your Chart</h1>
<p>If you've ever felt like your Sun sign doesn't quite capture you, you're right — it's only a third of the story. In astrology, your <strong>Sun, Moon, and Rising signs</strong> are known as the "big three," and together they form the foundation of your personality. The Sun is who you are at your core, the Moon is how you feel, and the Rising is how you meet the world. Understanding all three is the difference between a one-line horoscope and a portrait that actually resembles you.</p>

<h2>The Sun Sign: Your Core Identity</h2>
<p>Your Sun sign is the one you already know — the sign the Sun occupied on your birthday. It represents your essential self: your ego, your vitality, your sense of purpose, and the qualities you grow into over a lifetime. Think of it as the role you're here to play. A Leo Sun is wired to express, lead, and shine; a Capricorn Sun is wired to build, structure, and achieve.</p>
<p>The Sun changes signs roughly once a month, so anyone born within the same few weeks shares a Sun sign. That's why it's the broadest of the three — important, but not the whole picture.</p>

<h2>The Moon Sign: Your Inner Emotional World</h2>
<p>Your Moon sign reflects your emotional nature — your instincts, your needs, your private self, and what makes you feel safe. While the Sun is what you show, the Moon is what you feel when no one's watching. It governs your reactions, your comfort habits, and your relationship to home, family, and the past.</p>
<p>The Moon moves quickly, changing signs roughly every two and a half days, so even people born on the same date can have different Moon signs. A Cancer Moon needs closeness and nurturing to feel secure; an Aquarius Moon needs space and independence. If your Sun sign feels too "on display" to be real, your Moon sign often explains the version of you that close friends and partners actually know.</p>

<h2>The Rising Sign: Your Outer Mask</h2>
<p>Your Rising sign — also called the Ascendant — is the sign that was rising on the eastern horizon at the exact moment you were born. It's the lens others see you through first: your appearance, your demeanor, your instinctive style, and the "vibe" you give off before people get to know you. It also sets the entire structure of your birth chart, determining which houses your planets fall into.</p>
<p>Because the Ascendant changes roughly every two hours, you need an accurate <strong>birth time</strong> to know it. This is the one part of the big three you can't guess from your birthday alone. Two people with the same Sun and Moon can come across completely differently because of their Rising signs — one Scorpio Rising reads as intense and guarded, while a Libra Rising reads as warm and approachable. The Rising sign is often described as the doorway into the rest of your chart: it colors first impressions, but it also organizes where every planet's energy gets expressed in your life.</p>

<h2>How the Big Three Combine</h2>
<p>The magic is in the combination. Imagine an <strong>Aries Sun, Pisces Moon, and Virgo Rising</strong>: bold and driven at the core (Aries), but tender and dreamy underneath (Pisces), while presenting as careful and put-together (Virgo). That blend explains contradictions a single Sun sign never could — someone who charges ahead yet feels everything deeply and double-checks the details.</p>
<p>A helpful way to hold it:</p>
<ul>
<li><strong>Sun</strong> = what you're growing toward; your identity and purpose.</li>
<li><strong>Moon</strong> = what you need to feel secure; your emotional reality.</li>
<li><strong>Rising</strong> = how you show up; your first impression and approach.</li>
</ul>
<p>When all three align in element or tone, a person tends to feel internally consistent. When they pull in different directions, you get a richer, more complex character — and often the sense of being "more than your sign."</p>
<p>There's no "better" combination, only different ones. A chart where the big three all sit in water signs produces someone unmistakably sensitive and intuitive; a chart that mixes fire, earth, and air produces someone harder to pin down but adaptable across many situations. Learning your own blend is the first real step from casual horoscope reader to understanding your actual chart.</p>

<h2>How to Find Yours</h2>
<p>You can find your Sun sign from your birth date alone, but the Moon and especially the Rising require your <strong>date, exact time, and place of birth</strong>. With those three details, a birth chart calculation will place all three signs precisely — no guesswork. Once you know your big three, generic horoscopes start to make a lot more sense, because you can read for your Rising and Moon, not just your Sun.</p>

<h2>Frequently Asked Questions</h2>
<h3>What is my Moon sign and how do I find it?</h3>
<p>Your Moon sign is the sign the Moon was in when you were born, and it governs your emotional inner world. Because the Moon changes signs every couple of days, you find it by calculating your birth chart with your date, time, and place of birth.</p>
<h3>Do I need my birth time to know my big three?</h3>
<p>You need it for your Rising sign, which changes about every two hours, and ideally for your Moon sign if you were born on a day the Moon switched signs. Your Sun sign can be determined from your birth date alone.</p>
<h3>Which is more important, my Sun sign or my Moon sign?</h3>
<p>Neither outranks the other — they describe different things. The Sun is your core identity and purpose, while the Moon is your emotional needs and instincts. A complete reading considers both, along with your Rising sign.</p>
</article>`,
  },

  {
    slug: "zodiac-compatibility-guide",
    category: "synastry",
    lang: "en",
    title: "Zodiac Compatibility: Which Signs Are Most Compatible?",
    title_en: "Zodiac Compatibility: Which Signs Are Most Compatible?",
    description:
      "Which zodiac signs are most compatible? Explore element-based compatibility, strong and challenging pairings, and why true synastry goes deeper than Sun signs.",
    keywords: [
      "zodiac compatibility",
      "compatible zodiac signs",
      "zodiac love match",
      "astrology compatibility",
      "sign compatibility",
    ],
    published_at: "2026-06-11",
    reading_time: 8,
    cta_href: "/synastry",
    cta_label: "Check your compatibility free",
    cta_label_en: "Check your compatibility free",
    content: `<article><h1>Zodiac Compatibility: Which Signs Are Most Compatible?</h1>
<p>Few questions are asked of astrology more often than "are we compatible?" The Sun signs give a useful first sketch — some pairings naturally flow, others naturally spark friction. But real relationship astrology, called <strong>synastry</strong>, looks at two entire birth charts side by side. Here's how compatibility works, starting with the elements and ending with why your Sun sign is only the opening line.</p>

<h2>Element-Based Compatibility</h2>
<p>The fastest way to gauge chemistry is through the four elements. Signs of the <strong>same element</strong> tend to understand each other instinctively, while <strong>complementary elements</strong> balance each other out:</p>
<ul>
<li><strong>Fire (Aries, Leo, Sagittarius)</strong> pairs well with other fire signs and with air, which fuels its enthusiasm. Two fire signs share drive and passion but can compete for the spotlight.</li>
<li><strong>Earth (Taurus, Virgo, Capricorn)</strong> blends naturally with other earth signs and with water, which softens its practicality. Earth-water builds a stable, nurturing foundation.</li>
<li><strong>Air (Gemini, Libra, Aquarius)</strong> connects easily with other air signs and with fire, which warms its ideas into action. Air-air relationships are talkative and mentally alive.</li>
<li><strong>Water (Cancer, Scorpio, Pisces)</strong> flows with other water signs and with earth, which grounds its emotions. Water-water bonds run deep and intuitive.</li>
</ul>
<p>The classic friction points are fire-water (passion versus sensitivity) and earth-air (caution versus spontaneity) — though "challenging" never means "doomed." Difference is often what keeps a relationship interesting.</p>
<p>It also helps to consider <strong>modality</strong>. Two cardinal signs may both want to lead, two fixed signs may both refuse to budge, and two mutable signs may struggle to settle on a direction. Mixing modalities — a cardinal initiator with a fixed stabilizer, say — often creates a more workable balance than matching like with like.</p>

<h2>A Few Strong Pairings</h2>
<ul>
<li><strong>Taurus &amp; Cancer</strong>: earth and water, both home-loving and loyal — a tender, secure match.</li>
<li><strong>Leo &amp; Sagittarius</strong>: two fire signs full of warmth, adventure, and mutual admiration.</li>
<li><strong>Gemini &amp; Aquarius</strong>: air and air, intellectually electric and refreshingly unpossessive.</li>
<li><strong>Capricorn &amp; Virgo</strong>: grounded earth signs who build a life with shared discipline and respect.</li>
<li><strong>Scorpio &amp; Pisces</strong>: deep water signs who connect on an almost wordless emotional level.</li>
</ul>

<h2>A Few Challenging Pairings</h2>
<ul>
<li><strong>Aries &amp; Cancer</strong>: fire's bluntness can bruise water's sensitivity, requiring real patience.</li>
<li><strong>Taurus &amp; Aquarius</strong>: fixed earth craves stability while fixed air craves freedom — a tug of wills.</li>
<li><strong>Gemini &amp; Virgo</strong>: both Mercury-ruled, yet one scatters and the other refines, which can grate.</li>
<li><strong>Leo &amp; Scorpio</strong>: two strong, fixed signs whose intensity can turn into a power struggle.</li>
</ul>
<p>Remember: challenging pairings frequently make the most growth-oriented relationships. The tension is workable when both people understand it.</p>

<h2>Why Synastry Goes Deeper Than Sun Signs</h2>
<p>Sun-sign compatibility is a headline, not the article. Two people can have "incompatible" Sun signs and still fit together beautifully because of the rest of their charts. Synastry compares the full picture:</p>
<ul>
<li><strong>Moon signs</strong> reveal emotional compatibility — whether you feel safe with each other.</li>
<li><strong>Venus signs</strong> show how each person loves, flirts, and expresses affection.</li>
<li><strong>Mars signs</strong> describe drive, passion, and how conflict plays out.</li>
<li><strong>Mercury signs</strong> govern how you communicate and whether your minds click.</li>
<li><strong>Aspects between charts</strong> — the angles your planets make to each other — are where the real chemistry, harmony, and friction live.</li>
</ul>
<p>A couple with clashing Sun signs but a harmonious Moon-Venus connection can feel like home to each other. That's why an astrologer never judges a relationship on Sun signs alone. The Sun sign tells you the flavor; synastry tells you the recipe. The same logic explains why some "perfect on paper" matches fizzle while unlikely pairings endure — the chemistry was never really in the Sun signs.</p>

<h2>How to Read Your Match</h2>
<p>To move past the headline, compare both full birth charts — each person's date, time, and place of birth. That reveals your Moon, Venus, Mars, and the aspects between you, giving a far more accurate read on long-term compatibility than your Sun signs ever could. Pay special attention to where one person's planets land on the other's: a partner's Venus touching your Moon, for example, tends to feel deeply affectionate and safe, while harsh Mars contacts can signal heat that runs hot in both attraction and argument.</p>
<p>Ultimately, compatibility isn't a verdict — it's a map. It shows where two people flow easily and where they'll need to do conscious work. The healthiest relationships often aren't the ones with zero friction, but the ones where both partners understand their friction and choose each other anyway.</p>

<h2>Frequently Asked Questions</h2>
<h3>Which zodiac signs are the most compatible?</h3>
<p>Signs of the same element, and complementary elements (fire with air, earth with water), tend to share the easiest natural chemistry. But the most compatible match for you specifically depends on your whole chart, not just Sun signs.</p>
<h3>Can incompatible zodiac signs still work as a couple?</h3>
<p>Absolutely. "Incompatible" Sun signs often build strong relationships when their Moon, Venus, and Mars placements align. Synastry frequently shows deep compatibility that Sun signs alone would miss.</p>
<h3>What is synastry in astrology?</h3>
<p>Synastry is the comparison of two people's complete birth charts to assess relationship compatibility. It examines how each person's planets interact — especially the Moon, Venus, and Mars — for a far deeper read than Sun-sign matching.</p>
</article>`,
  },
];
