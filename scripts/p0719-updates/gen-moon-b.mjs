// ─── GROUP=moon-b：6 篇月亮星座英文文章内容增强 ────────────────────────────
// 规格：3 个 H2 小节（Woman vs Man / in Love and Relationships / Compatibility），
// 原文已有则跳过；scorpio 额外加 "The Dark Side of a Scorpio Moon"。
// 原文结构核查结果（dump-post 2026-07-19）：
//  - libra / scorpio / sagittarius / capricorn / pisces：均已有 "{Sign} Moon in Love
//    and Relationships" → 跳过 in-love 节，补 Woman vs Man + Compatibility 两节。
//  - aquarius：原文已有 "Aquarius Moon in Relationships"（内含 Woman/Man 两个 h3）
//    和 "Aquarius Moon Compatibility" → 三节全有，本节为空，只补 FAQ + keywords。
// addKeywords 已按原文 keywords 去重（原文均已有 "{sign} moon in love"；
// aquarius 原文已有 woman/man/compatibility 三个词，只补 in love）。
import { writeFileSync } from "fs";

const arr = [
  {
    slug: "libra-moon-sign-meaning",
    sectionsHtml: `<h2>Libra Moon Woman vs. Libra Moon Man</h2>
<p>The Libra Moon woman is often the social glue of every room she enters — the one who senses tension before anyone names it and quietly steers things back to pleasant ground. Underneath that grace, though, she can lose track of her own preferences, answering "whatever you want" so often that she forgets what she actually wants. In love she is romantic, attentive, and drawn to charm, courtesy, and good conversation; what wounds her most is a partner who enjoys arguing for sport or treats her diplomacy as weakness.</p>
<p>The Libra Moon man is typically charming, considerate, and unusually skilled at making a partner feel heard — he notices what you like and remembers it. His challenge is conflict: raised voices genuinely dysregulate him, so he may deflect tension with humor, change the subject, or agree on the surface while privately resenting it. He thrives with someone who invites his honest opinion without punishing it, because once a Libra Moon man learns that honesty won't cost him the relationship, he becomes a remarkably devoted and even-handed partner.</p>
<h2>Libra Moon Compatibility</h2>
<p>Because the Moon governs emotional needs, Libra Moon compatibility is less about grand passion and more about whose daily emotional weather feels easy to live inside. In general:</p>
<ul>
<li><strong>Most natural fits — fellow air moons (Gemini, Aquarius):</strong> conversation flows, social needs match, and nobody panics when feelings get discussed rather than dramatized. Gemini keeps things light and curious; Aquarius shares the fairness-first worldview.</li>
<li><strong>Warm and encouraging — fire moons (Leo, Sagittarius):</strong> fire brings the enthusiasm and decisiveness Libra Moon secretly appreciates, and Libra offers the admiration and refinement fire loves. Leo and Libra Moons especially tend to build beautiful lives together.</li>
<li><strong>Magnetic but demanding — Aries Moon:</strong> the opposite-sign pairing. Aries is direct where Libra is diplomatic; the attraction is real, but it works only when Aries softens delivery and Libra stops keeping score.</li>
<li><strong>Growth pairings — water moons (Cancer, Scorpio, Pisces):</strong> their depth can feel heavy to conflict-averse Libra, and Libra's rationalizing can feel evasive to them. Rewarding if both learn each other's language.</li>
<li><strong>Steady but dry — earth moons (Taurus, Virgo, Capricorn):</strong> reliable and calm, though they may grow impatient with Libra's deliberations while Libra finds them emotionally sparse.</li>
</ul>
<p>Remember that Moon sign compatibility is one layer of the picture — Venus, Mars, and the full chart often explain the couples who "shouldn't" work but do.</p>`,
    faqHtml: `<h3>What is a Libra Moon woman attracted to?</h3>
<p>Charm with substance behind it. A Libra Moon woman notices manners, taste, and how someone treats waiters and strangers — courtesy is genuinely attractive to her, not a nicety. She falls for people who can hold a real conversation, make her laugh without cruelty, and create beauty around her, whether that's a well-set table or a well-told story. Loud aggression and public scenes are the fastest way to lose her interest.</p>
<h3>What is a Libra Moon man like in love?</h3>
<p>Attentive, romantic, and conflict-shy. A Libra Moon man in love is a thoughtful partner who plans dates, remembers details, and genuinely wants his person to be happy — his own mood rises and falls with the state of the relationship. The shadow side is avoidance: he may say what keeps the peace instead of what he truly thinks. He does best with a partner who asks directly and responds calmly, which teaches him that honesty is safe.</p>
<h3>Do Libra Moons fall in love easily?</h3>
<p>They fall in love with connection easily — the spark of good chemistry, the pleasure of being understood — but committing fully takes longer, because a Libra Moon weighs the decision from every angle and fears choosing wrong. Once the scales tip, though, they are steadfast partners whose emotional wellbeing is genuinely built around the relationship. The indecision isn't a lack of feeling; it's how seriously they take the choice.</p>`,
    addKeywords: ["libra moon woman", "libra moon man", "libra moon compatibility"],
  },
  {
    slug: "scorpio-moon-sign-meaning",
    sectionsHtml: `<h2>Scorpio Moon Woman vs. Scorpio Moon Man</h2>
<p>The Scorpio Moon woman reads people the way others read headlines — quickly, deeply, and usually accurately. She knows within minutes whether someone is genuine, and she rarely forgets a kindness or a slight. In love she is fiercely loyal and expects the same totality in return; casual arrangements leave her cold. When hurt, she tends to go quiet before she goes angry, and the silence is the warning. Her partners often describe her as intense but worth it — the woman who will defend you ferociously once you've earned her trust.</p>
<p>The Scorpio Moon man often grew up in a world that handed him few acceptable outlets for deep feeling, so his intensity goes underground: he appears calm, even detached, while running emotional currents strong enough to surprise him. He shows love through protection, presence, and acts of loyalty rather than declarations, and he struggles more openly with jealousy than he would ever admit. The right partner for him is someone patient enough to earn access to his private world — and honest enough never to betray it once inside.</p>
<h2>Scorpio Moon Compatibility</h2>
<p>A Scorpio Moon needs a partner whose emotional depth can match its own — or whose steadiness can hold it. The general pattern:</p>
<ul>
<li><strong>Most natural fits — fellow water moons (Cancer, Pisces):</strong> feeling is the shared native language. Cancer offers the nurturing loyalty Scorpio craves; Pisces brings unconditional softness that disarms Scorpio's defenses.</li>
<li><strong>Grounding and true — earth moons (Virgo, Capricorn):</strong> they prove loyalty through actions over time, which is exactly the evidence a Scorpio Moon trusts. Capricorn's reserve and Scorpio's privacy usually suit each other well.</li>
<li><strong>Magnetic standoffs — Taurus Moon and Leo Moon:</strong> Taurus, the opposite sign, is sensual and devoted but as stubborn as Scorpio — standoffs can last for years. Leo pairs pride with pride; the passion is enormous and so are the power struggles.</li>
<li><strong>Growth pairings — air moons (Gemini, Libra, Aquarius):</strong> their lighter, more detached processing can read as superficial or untrustworthy to Scorpio, while Scorpio's intensity can feel like pressure to them. Workable when the air moon learns to go deeper and Scorpio learns to lighten up.</li>
<li><strong>Volatile mix — fire moons (Aries, Sagittarius):</strong> Aries fights openly, which Scorpio secretly respects, but Sagittarius's blunt honesty and need for freedom can trigger Scorpio's worst suspicions.</li>
</ul>
<p>Whatever the pairing, the real compatibility question for a Scorpio Moon is simple: does this person tell the truth, consistently, even when it's uncomfortable? That matters more than any element.</p>
<h2>The Dark Side of a Scorpio Moon</h2>
<p>Every Moon sign has a shadow, and Scorpio's is famous: jealousy that monitors instead of asks, tests of loyalty that partners don't know they're taking, grudges curated for years, and the scorched-earth ending — the sudden, total severance of a bond that once meant everything. Under stress, a Scorpio Moon can turn its emotional X-ray vision into a weapon, finding the one sentence that will hurt most and delivering it.</p>
<p>It's worth understanding where this comes from. The dark side of a Scorpio Moon is not cruelty for its own sake; it's a security system built by a psyche that feels betrayal as an existential threat. Testing, withdrawing, and striking first are all strategies for never being blindsided again. The tragedy is that these strategies often create the very abandonment they guard against.</p>
<p>Growth for this Moon is learning to trust without testing — to say "I felt jealous" instead of engineering a confrontation, and to let one real, imperfect, honest bond matter more than the armor. Scorpio Moons who do this work become the most loyal, healing presence in the zodiac.</p>`,
    faqHtml: `<h3>What is the dark side of a Scorpio Moon?</h3>
<p>At its hardest, a Scorpio Moon's shadow looks like jealousy, emotional testing, secrecy, and a long memory for wounds. Because this placement feels betrayal so intensely, it can become pre-emptively controlling — checking, probing, withdrawing affection to see if the other person notices. The same depth that makes Scorpio Moons extraordinarily loyal partners can curdle into suspicion when they feel unsafe. The antidote is directness: naming the fear instead of acting it out.</p>
<h3>How does a Scorpio Moon show love?</h3>
<p>Through loyalty, protection, and total presence — not casual affection. A Scorpio Moon in love wants to know everything about you and will remember it all; they defend you fiercely in your absence, show up in crises when others scatter, and offer a depth of attention most people have never experienced. They may not say "I love you" lightly, but when a Scorpio Moon lets you past the defenses, the commitment is about as complete as the zodiac offers.</p>
<h3>Why do Scorpio Moons test their partners?</h3>
<p>Because trust, for this Moon, is too important to give on faith alone. A Scorpio Moon has usually been burned early — a confidence betrayed, a vulnerability used against them — and learned that words are cheap. So they run quiet experiments: sharing a small secret to see if it travels, withdrawing to see if you pursue, watching how you treat people who can do nothing for you. It's exhausting for partners, but it comes from self-protection, not gamesmanship. Consistent honesty over time is the only thing that ends the tests.</p>`,
    addKeywords: ["scorpio moon woman", "scorpio moon man", "scorpio moon compatibility"],
  },
  {
    slug: "sagittarius-moon-sign-meaning",
    sectionsHtml: `<h2>Sagittarius Moon Woman vs. Sagittarius Moon Man</h2>
<p>The Sagittarius Moon woman is easy to spot: she's the one laughing loudest, planning the next trip, and saying the true thing everyone else was politely avoiding. She cannot tolerate being managed — jealousy, curfews, and guilt trips send her toward the exit faster than any actual problem would. In love she is generous, honest, and surprisingly devoted, but the devotion has to be freely given; the moment a partner tries to hold on tighter, she feels the cage. Her ideal relationship looks less like settling down and more like two people running in the same direction.</p>
<p>The Sagittarius Moon man copes with life through optimism and humor — he is genuinely hard to keep down, and genuinely uncomfortable with heavy emotional processing that has no forward motion. He shows love by inclusion: bringing you into his plans, his friends, his next adventure. What he struggles with is the quiet, stationary work of intimacy — long talks about the relationship, a partner's recurring sadness that can't be fixed with a joke or a weekend away. He grows most with someone who lets him keep his freedom while gently teaching him that staying is also an adventure.</p>
<h2>Sagittarius Moon Compatibility</h2>
<p>Sagittarius Moon compatibility comes down to one core question: can this person give me room to breathe without making me pay for it? In general:</p>
<ul>
<li><strong>Most natural fits — fellow fire moons (Aries, Leo):</strong> shared enthusiasm, directness, and appetite for life. Aries matches the pace and forgives quickly; Leo brings warmth and drama in the fun sense, not the draining one.</li>
<li><strong>Light and liberating — air moons (Gemini, Libra, Aquarius):</strong> air feeds fire. Gemini, the opposite sign, is the classic can't-stop-talking pairing; Aquarius guards freedom as fiercely as Sagittarius does; Libra adds ease and social sparkle.</li>
<li><strong>Stabilizing but slow — earth moons (Taurus, Virgo, Capricorn):</strong> they offer grounding the Sagittarius Moon secretly needs, but may read its restlessness as unreliability while Sagittarius reads their caution as a wet blanket.</li>
<li><strong>Growth pairings — water moons (Cancer, Scorpio, Pisces):</strong> water needs more reassurance, closeness, and emotional processing than Sagittarius naturally provides, and Sagittarian bluntness can bruise water's soft center. These pairs work when Sagittarius learns gentleness and water learns not to take the honesty personally.</li>
</ul>
<p>The Sagittarius Moon's best matches share one trait: they treat love as an expansion of life, not a reduction of it.</p>`,
    faqHtml: `<h3>What is a Sagittarius Moon woman like in love?</h3>
<p>Honest, adventurous, and allergic to control. A Sagittarius Moon woman loves openly and expects the same candor back — she'd rather hear a hard truth than a comfortable lie. She needs a partner who has their own full life and joins hers as an equal, not a keeper. Ironically, she is far more likely to commit deeply to someone who never pressures her to commit; freedom is what makes her want to stay.</p>
<h3>How does a Sagittarius Moon man handle emotions?</h3>
<p>By moving — toward humor, toward plans, toward the horizon. A Sagittarius Moon man's first response to pain is usually to reframe it, joke about it, or outrun it with a new project or trip. This isn't shallowness; it's a genuine philosophy that forward motion heals. The trouble comes when a partner needs him to sit still inside a feeling. His growth edge is learning that some emotions don't need solving, only company.</p>
<h3>What signs clash with a Sagittarius Moon?</h3>
<p>The most friction tends to come from Moon signs whose emotional needs run opposite to Sagittarius's freedom-first wiring. Cancer Moon's need for daily reassurance and nesting can feel smothering to Sagittarius, while Sagittarian bluntness can wound Cancer's tender shell. Virgo Moon's careful critique reads as nitpicking to Sagittarius, whose grand plans Virgo finds reckless. Scorpio Moon's intensity and jealousy trigger the Sagittarian flight response. None of these are doomed — but they require both people to stretch.</p>`,
    addKeywords: ["sagittarius moon woman", "sagittarius moon man", "sagittarius moon compatibility"],
  },
  {
    slug: "capricorn-moon-sign-meaning",
    sectionsHtml: `<h2>Capricorn Moon Woman vs. Capricorn Moon Man</h2>
<p>The Capricorn Moon woman is self-contained in a way people often misread. She has high standards — for herself first, for partners second — and she shows love through reliability: she remembers the appointment, handles the crisis, shows up early. Trust comes slowly and is built from evidence over time, which means her soft center tends to reveal itself across years rather than weeks. Partners who stay long enough discover a dry wit, deep devotion, and a private tenderness she shows almost no one else.</p>
<p>The Capricorn Moon man often carries an old assignment: be the provider, be the rock, don't need anything. He expresses care through responsibility — fixing, planning, earning, protecting — and can quietly equate his worth with his usefulness. Asking for comfort feels foreign to him, so he may go stoic exactly when he most needs support. The partner who changes his life is the one who notices the tiredness behind the competence and makes it safe for him to be the one who falls apart for once.</p>
<h2>Capricorn Moon Compatibility</h2>
<p>For a Capricorn Moon, emotional compatibility is proven in behavior — words are pleasant, but reliability is love. The broad pattern:</p>
<ul>
<li><strong>Most natural fits — fellow earth moons (Taurus, Virgo):</strong> shared pragmatism and patience. Taurus adds sensual warmth that thaws Capricorn's reserve; Virgo speaks the same language of acts of service and quiet improvement.</li>
<li><strong>Deep and devoted — water moons (Scorpio, Pisces, Cancer):</strong> Scorpio's loyalty-through-fire impresses Capricorn, and both are private signs that take commitment seriously. Pisces softens Capricorn's hard edges. Cancer, the opposite sign, offers the nurturance Capricorn never learned to ask for — a classic complement when both respect the difference.</li>
<li><strong>Growth pairings — fire moons (Aries, Leo, Sagittarius):</strong> fire's impulsiveness can read as recklessness to Capricorn, while Capricorn's caution reads as pessimism to fire. Aries especially will want everything faster than this Moon moves.</li>
<li><strong>Interesting but unstable — air moons (Gemini, Libra, Aquarius):</strong> air's changeability and talk-first processing can feel unserious to a Moon that trusts only track records, though Aquarius's Saturn connection sometimes bridges the gap.</li>
</ul>
<p>Whatever the element, the Capricorn Moon's real question is always the same: will you still be here, doing what you said, five years from now?</p>`,
    faqHtml: `<h3>How does a Capricorn Moon show love?</h3>
<p>Through commitment made visible: showing up on time, remembering responsibilities, building something durable with you. A Capricorn Moon rarely gushes, but they will work overtime to afford the trip, fix the thing before you ask, and quietly organize their five-year plan around you. If a Capricorn Moon has started treating your problems as their projects, that is the love language — pay attention to what they do, not how often they say it.</p>
<h3>Why are Capricorn Moons so hard on themselves?</h3>
<p>Because somewhere early on, a Capricorn Moon absorbed the message that love and safety had to be earned through competence. Many grew up fast — handed responsibility young, or raised where feelings were a luxury. The inner critic that results is relentless: rest feels like laziness, mistakes feel like character flaws, and needing help feels like failure. Much of this Moon's lifelong work is learning that their worth isn't a performance metric.</p>
<h3>What is a Capricorn Moon woman looking for in a partner?</h3>
<p>Substance over sparkle. She is drawn to people with direction — not necessarily wealth or status, but demonstrable follow-through, self-respect, and a life they take seriously. Flashy charm without reliability bores her quickly. Most of all, she wants a partner patient enough to earn her trust and perceptive enough to notice that beneath the composed exterior is someone who deeply wants to be cared for — she just needs it proven safe first.</p>`,
    addKeywords: ["capricorn moon woman", "capricorn moon man", "capricorn moon compatibility"],
  },
  {
    slug: "aquarius-moon-sign-meaning",
    faqHtml: `<h3>Why do Aquarius moons seem detached?</h3>
<p>Because they process feelings through the mind first. When something hurts, an Aquarius moon's reflex is to step back and analyze it — to understand the pattern before sitting in the pain. From the outside this can look like indifference, especially to more demonstrative signs, but the feeling is there; it's just running through a mental filter before it reaches the surface. The detachment is a processing style, not an absence of care.</p>
<h3>Are Aquarius moons loyal in relationships?</h3>
<p>Yes — often more loyal than they're given credit for. The confusion comes from their independence: an Aquarius moon can go days without checking in and still consider the relationship solid, which more reassurance-hungry signs misread as waning interest. In reality, once an Aquarius moon chooses someone, the commitment tends to be steady and principled. They don't stay out of habit or fear of being alone; they stay because they genuinely decided to, which is its own kind of devotion.</p>
<h3>How do Aquarius moons handle conflict?</h3>
<p>By trying to make it logical. In a disagreement, an Aquarius moon reaches for fairness, principles, and solutions — they'd rather fix the problem than marinate in the feelings around it. This is a real strength when the issue is practical, but it can frustrate partners who first need their emotions acknowledged. The growth move for an Aquarius moon is simple: before offering the fix, say "I hear that you're hurt" — and mean it.</p>`,
    addKeywords: ["aquarius moon in love"],
  },
  {
    slug: "pisces-moon-sign-meaning",
    sectionsHtml: `<h2>Pisces Moon Woman vs. Pisces Moon Man</h2>
<p>The Pisces Moon woman often feels like she was born without the emotional skin everyone else has — she absorbs the mood of a room, a partner, a stranger on the train, and it can take her hours to notice the feeling isn't hers. In love she is romantic, selfless, and prone to idealizing; she falls for potential as much as for the person in front of her. Her great need is a partner who treats her sensitivity as a gift rather than a problem to manage — and who gently helps her keep one foot in reality when the fantasy gets sweeter than the truth.</p>
<p>The Pisces Moon man frequently learned young that softness was not safe to show, so his oceanic inner life hides behind an easygoing, go-with-the-flow surface. He processes through immersion — music, games, art, long drives, solitude — and may seem fine right up until he quietly disappears into one of those refuges. He loves with rare tenderness and intuition, often knowing what his partner needs before they say it, but he needs someone who makes vulnerability feel safe, because he will not risk it twice with a person who mishandled it once.</p>
<h2>Pisces Moon Compatibility</h2>
<p>A Pisces Moon bonds through feeling, so compatibility hinges on who can meet it in the deep water without either drowning it or mocking the swim. In general:</p>
<ul>
<li><strong>Most natural fits — fellow water moons (Cancer, Scorpio):</strong> emotional attunement without translation. Cancer offers the nurturing home Pisces dreams of; Scorpio brings protective intensity that makes Pisces feel safe enough to open fully.</li>
<li><strong>Gentle anchors — earth moons (Taurus, Capricorn):</strong> earth gives the Pisces Moon the container it needs. Taurus is patient, sensual, and calm; Capricorn provides structure that holds Pisces's chaos kindly. Virgo, the opposite sign, can be a beautiful balance — or a critic whose precision bruises Pisces, depending on the delivery.</li>
<li><strong>Growth pairings — air moons (Gemini, Libra, Aquarius):</strong> air processes verbally and rationally, which can leave Pisces feeling unseen and air feeling confused by moods that have no bullet points. Works when air learns to simply sit with feeling.</li>
<li><strong>Handle with care — fire moons (Aries, Leo, Sagittarius):</strong> fire's warmth is intoxicating to Pisces, but its bluntness can wound, and its pace can leave the Pisces Moon quietly overwhelmed. Sagittarius honesty especially needs softening here.</li>
</ul>
<p>More than any element, a Pisces Moon needs a partner with kind handling — someone who understands that this Moon's sensitivity is the source of its devotion, not an obstacle to it.</p>`,
    faqHtml: `<h3>How does a Pisces Moon show love?</h3>
<p>Through empathy, sacrifice, and imagination. A Pisces Moon in love tunes into your moods before you've named them, remembers your small dreams, and expresses care in poetic, personal ways — a playlist, a drawing, a meal made to match a memory. They give freely, sometimes to the point of losing themselves, which is why the clearest sign a Pisces Moon loves you is also the one to watch: they'll merge their life into yours unless someone gently protects their boundaries too.</p>
<h3>What hurts a Pisces Moon the most?</h3>
<p>Coldness disguised as honesty — blunt criticism delivered without care, being told they're "too sensitive," or having their inner world dismissed as unrealistic. Because a Pisces Moon bonds by opening their whole heart, indifference and mockery cut far deeper than arguments do. Betrayal of a shared confidence is especially devastating. They rarely retaliate; they simply retreat into fantasy or quietly drift away, often before the other person realizes anything was wrong.</p>
<h3>What is a Pisces Moon man like in a relationship?</h3>
<p>Tender, intuitive, and quietly romantic — though you may have to get past the laid-back exterior first. A Pisces Moon man often hides how deeply he feels, having learned that visible softness invites teasing. In a safe relationship he is extraordinarily attentive: he senses shifts in your mood, shows love through small imaginative gestures, and craves a bond that feels soulful rather than merely practical. His main pitfalls are avoidance — escaping into hobbies or fantasy when conflict appears — and absorbing a partner's unhappiness as his own.</p>`,
    addKeywords: ["pisces moon woman", "pisces moon man", "pisces moon compatibility"],
  },
];

writeFileSync(new URL("./moon-b.json", import.meta.url), JSON.stringify(arr, null, 1));
console.log("wrote", arr.length, "records to moon-b.json");
