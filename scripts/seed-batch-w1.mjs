import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);

const posts = [
  {
    slug: "jupiter-in-libra-meaning",
    title: "Jupiter in Libra — Harmonious Abundance, Social Fortune & Relationship Luck",
    description: "Jupiter in Libra brings luck through fairness, beauty, and partnership. Learn how this air placement creates social opportunity, legal fortune, and relationship abundance.",
    keywords: ["jupiter in libra", "jupiter in libra meaning", "jupiter libra natal", "jupiter in libra luck"],
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Libra</h1>
<p>In Libra, Jupiter expands through connection, fairness, and aesthetic sensibility. Fortune arrives through partnerships, social grace, and the ability to create harmony wherever you go.</p>
<h2>Core Themes</h2>
<ul>
<li><strong>Luck through partnership:</strong> The right collaboration multiplies your impact exponentially</li>
<li><strong>Social abundance:</strong> Your charm and diplomatic skills open doors others can't</li>
<li><strong>Aesthetic gifts:</strong> Success in art, design, fashion, and beauty industries</li>
<li><strong>Legal fortune:</strong> Fortunate outcomes in negotiations, contracts, and legal matters</li>
</ul>
<h2>Gifts</h2>
<p>Natural diplomats, mediators, and peacemakers. Exceptional talent in relationship counseling, legal work, interior design, fashion, and public relations. The ability to see multiple perspectives simultaneously gives a significant advantage in negotiations and conflict resolution.</p>
<h2>Shadow</h2>
<ul>
<li>Over-expanding through too many partnerships without depth</li>
<li>Indecision preventing you from capitalizing on opportunities</li>
<li>People-pleasing that dilutes your authentic voice and vision</li>
</ul>
<h2>Quick Reference</h2>
<ul><li><strong>Lucky domains:</strong> Partnerships, law, art, beauty</li><li><strong>Luck trigger:</strong> Collaboration and creating harmony</li><li><strong>Element:</strong> Air</li></ul>
</article>`
  },
  {
    slug: "jupiter-in-scorpio-meaning",
    title: "Jupiter in Scorpio — Deep Transformation, Hidden Fortune & Intense Growth",
    description: "Jupiter in Scorpio brings expansive transformation through depth, research, and hidden resources. Learn how this intense water placement creates profound luck and power.",
    keywords: ["jupiter in scorpio", "jupiter in scorpio meaning", "jupiter scorpio natal", "jupiter in scorpio luck"],
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Scorpio</h1>
<p>Jupiter in Scorpio dives to the bottom of the ocean to find its treasure. Fortune here is not surface-level — it comes through investigating, transforming, and accessing what's hidden beneath the obvious.</p>
<h2>Core Themes</h2>
<ul>
<li><strong>Luck through research and investigation:</strong> What others overlook, you find valuable</li>
<li><strong>Transformative abundance:</strong> Profound life transformations that ultimately expand your capacity</li>
<li><strong>Hidden resources:</strong> Inheritance, joint finances, and other people's resources can be fortunate</li>
<li><strong>Psychological insight:</strong> Deep understanding of human nature becomes a professional asset</li>
</ul>
<h2>Gifts</h2>
<p>Natural investigators, psychologists, researchers, surgeons, and financial analysts. Exceptional at crisis management — these people thrive in situations that would overwhelm others. Strong instinct for where power and resources are concentrated, and how to access them ethically.</p>
<h2>Shadow</h2>
<ul>
<li>Obsessive expansion in taboo areas without healthy limits</li>
<li>Using intensity and power for manipulation rather than transformation</li>
<li>Difficulty with the light side of life after going so deep into shadow</li>
</ul>
<h2>Quick Reference</h2>
<ul><li><strong>Lucky domains:</strong> Research, psychology, finance, transformation</li><li><strong>Luck trigger:</strong> Going deep and transforming what's hidden</li><li><strong>Element:</strong> Water</li></ul>
</article>`
  },
  {
    slug: "jupiter-in-sagittarius-meaning",
    title: "Jupiter in Sagittarius — Maximum Expansion, Freedom Fortune & Philosophical Abundance",
    description: "Jupiter is in domicile in Sagittarius — its most powerful placement. Learn how this fire placement creates exceptional luck in travel, philosophy, education, and freedom.",
    keywords: ["jupiter in sagittarius", "jupiter in sagittarius meaning", "jupiter domicile sagittarius", "jupiter sagittarius natal"],
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Sagittarius</h1>
<p>Jupiter rules Sagittarius, making this the planet's most natural and powerful expression. Jupiter in Sagittarius produces the most classically "lucky" people — those for whom fortune seems to arrive on a white horse when they're already galloping toward the horizon.</p>
<h2>Core Themes</h2>
<ul>
<li><strong>Luck through adventure:</strong> The further you're willing to travel (literally or metaphorically), the more fortune finds you</li>
<li><strong>Philosophical abundance:</strong> A naturally expansive worldview that creates broad opportunity</li>
<li><strong>Teaching and publishing gifts:</strong> Sharing wisdom is both a gift and a fortune generator</li>
<li><strong>International opportunity:</strong> Foreign countries, cultures, and connections bring significant luck</li>
</ul>
<h2>The Domicile Gift</h2>
<p>Jupiter in Sagittarius natives carry an almost palpable aura of good fortune. They are genuinely optimistic in a way that becomes self-fulfilling — their belief in positive outcomes often creates those outcomes. Their generosity of spirit is legendary.</p>
<h2>Shadow</h2>
<ul>
<li>Overexpansion and overpromising beyond what can be delivered</li>
<li>Restlessness — difficulty committing to one path long enough to see it flourish</li>
<li>Dogmatic certainty that their worldview is the only valid one</li>
</ul>
<h2>Quick Reference</h2>
<ul><li><strong>Lucky domains:</strong> Travel, education, publishing, philosophy</li><li><strong>Luck trigger:</strong> Bold adventure and sharing wisdom</li><li><strong>Element:</strong> Fire</li></ul>
</article>`
  },
  {
    slug: "jupiter-in-capricorn-meaning",
    title: "Jupiter in Capricorn — Structured Abundance, Career Fortune & Earned Success",
    description: "Jupiter in Capricorn is in detriment but brings fortune through discipline, career, and long-term ambition. Learn how this placement creates lasting success through structure.",
    keywords: ["jupiter in capricorn", "jupiter in capricorn meaning", "jupiter capricorn natal", "jupiter in capricorn luck"],
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Capricorn</h1>
<p>Jupiter is in detriment in Capricorn (opposite Cancer), which means Jupiter's expansive nature must work through Capricorn's demanding structure. This doesn't reduce luck — it simply means fortune comes through effort, discipline, and time.</p>
<h2>Core Themes</h2>
<ul>
<li><strong>Earned abundance:</strong> Fortune is not random — it is the direct result of sustained effort and preparation</li>
<li><strong>Career excellence:</strong> Exceptional luck in institutional, governmental, or established business structures</li>
<li><strong>Authority and recognition:</strong> Fortune arrives through becoming genuinely respected in your field</li>
<li><strong>Long-term payoff:</strong> Investments of all kinds — financial, educational, relational — yield exceptional returns</li>
</ul>
<h2>Gifts</h2>
<p>Business leaders, government officials, executives, and institutional architects. The ability to build things that last. Often reach peak success in mid-to-late career — late bloomer energy that ultimately produces the most enduring achievements.</p>
<h2>Shadow</h2>
<ul>
<li>Equating worth with external achievement</li>
<li>Work becoming an all-consuming substitute for other forms of fulfillment</li>
<li>Rigidity blocking the adaptive creativity needed in rapidly changing environments</li>
</ul>
<h2>Quick Reference</h2>
<ul><li><strong>Lucky domains:</strong> Career, business, government, long-term investments</li><li><strong>Luck trigger:</strong> Disciplined, sustained effort</li><li><strong>Element:</strong> Earth</li></ul>
</article>`
  },
  {
    slug: "jupiter-in-aquarius-meaning",
    title: "Jupiter in Aquarius — Collective Fortune, Innovation Luck & Humanitarian Expansion",
    description: "Jupiter in Aquarius brings luck through innovation, community, and collective vision. Learn how this air placement creates fortune through technology, social change, and original thinking.",
    keywords: ["jupiter in aquarius", "jupiter in aquarius meaning", "jupiter aquarius natal", "jupiter aquarius 2021"],
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Aquarius</h1>
<p>In Aquarius, Jupiter expands through collective consciousness, technological innovation, and the radical reimagining of social structures. Fortune arrives when you think beyond yourself and act for the greater good.</p>
<h2>Core Themes</h2>
<ul>
<li><strong>Luck through community:</strong> Your network is your net worth — literally</li>
<li><strong>Innovation abundance:</strong> Original ideas that are ahead of their time eventually bring significant rewards</li>
<li><strong>Humanitarian fortune:</strong> Work that genuinely improves collective wellbeing generates unusual success</li>
<li><strong>Technology and future-thinking:</strong> Early adoption and innovative application of emerging technologies</li>
</ul>
<h2>Gifts</h2>
<p>Natural innovators, social entrepreneurs, community organizers, and technology visionaries. The ability to see societal needs before they become obvious to mainstream culture is a significant competitive advantage. Jupiter in Aquarius people often find their greatest luck when serving collective rather than personal interests.</p>
<h2>Note on 2021</h2>
<p>Jupiter transited Aquarius through most of 2021, bringing a collective expansion of technology adoption, community connection (despite physical separation), and forward-looking social innovation.</p>
<h2>Shadow</h2>
<ul>
<li>Detachment from personal relationships in favor of collective causes</li>
<li>Revolutionary thinking that's too far ahead to implement practically</li>
<li>Inconsistency as interests rapidly shift from one cause to the next</li>
</ul>
<h2>Quick Reference</h2>
<ul><li><strong>Lucky domains:</strong> Technology, community, social innovation, networks</li><li><strong>Luck trigger:</strong> Serving collective vision and embracing innovation</li><li><strong>Element:</strong> Air</li></ul>
</article>`
  },
  {
    slug: "jupiter-in-pisces-meaning",
    title: "Jupiter in Pisces — Spiritual Abundance, Compassionate Fortune & Mystical Expansion",
    description: "Jupiter is in domicile (co-ruler) of Pisces, bringing extraordinary spiritual and creative luck. Learn how this water placement creates boundless compassion, artistic gifts, and mystical fortune.",
    keywords: ["jupiter in pisces", "jupiter in pisces meaning", "jupiter pisces natal", "jupiter pisces luck 2022"],
    category: "astro",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Jupiter in Pisces</h1>
<p>Jupiter was the traditional ruler of Pisces before Neptune's discovery, making this another domicile placement alongside Sagittarius. Jupiter in Pisces expands through boundless compassion, spiritual depth, and the dissolution of boundaries between self and the infinite.</p>
<h2>Core Themes</h2>
<ul>
<li><strong>Spiritual abundance:</strong> Luck through spiritual practice, intuition, and following mystical guidance</li>
<li><strong>Creative fortune:</strong> Extraordinary artistic gifts — music, poetry, film, and visionary art</li>
<li><strong>Compassionate expansion:</strong> Healing, helping, and creating sanctuary brings remarkable abundance</li>
<li><strong>Psychic sensitivity:</strong> Heightened intuition and dreamwork as practical tools</li>
</ul>
<h2>The Second Domicile Gift</h2>
<p>Jupiter in Pisces produces some of the most gifted musicians, filmmakers, spiritual teachers, and healers. Their capacity to access the collective unconscious and translate it into form is extraordinary. Charitable and healing work brings genuine spiritual and sometimes material abundance.</p>
<h2>Note on 2022</h2>
<p>Jupiter spent much of 2022 in Pisces, bringing a collective expansion of spiritual interest, creative flourishing, and compassionate movements.</p>
<h2>Shadow</h2>
<ul>
<li>Expanding in all directions without grounding — diffusion rather than growth</li>
<li>Escapism and avoidance through spiritual bypassing</li>
<li>Over-sacrifice and martyrdom in the name of compassion</li>
</ul>
<h2>Quick Reference</h2>
<ul><li><strong>Lucky domains:</strong> Spirituality, healing, art, music, film</li><li><strong>Luck trigger:</strong> Compassion, intuition, and spiritual service</li><li><strong>Element:</strong> Water</li></ul>
</article>`
  },
  {
    slug: "page-of-swords-tarot-meaning",
    title: "Page of Swords Tarot — Curious Intelligence, Sharp Observation & Mental Beginnings",
    description: "The Page of Swords brings quick thinking, mental agility, and vigilant curiosity. Learn upright and reversed Page of Swords meanings in all areas of life.",
    keywords: ["page of swords tarot", "page of swords meaning", "page of swords love", "page of swords reversed"],
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Page of Swords Tarot Card Meaning</h1>
<p>The Page of Swords stands on a windy hilltop, sword raised and head turned watchfully. He sees in all directions simultaneously, alert to every shift in the wind. He is the sharp-eyed observer, the news-bringer, the perpetually curious mind.</p>
<h2>Upright Meaning</h2>
<ul>
<li><strong>Intellectual curiosity:</strong> A voracious appetite for information and ideas</li>
<li><strong>Sharp observation:</strong> Nothing escapes your notice; you see what others miss</li>
<li><strong>News and messages:</strong> Information is coming — often unexpected or requiring careful analysis</li>
<li><strong>Mental agility:</strong> Quick thinking that cuts through confusion</li>
<li><strong>Vigilance:</strong> Heightened awareness that protects from deception</li>
</ul>
<h2>Reversed Meaning</h2>
<ul>
<li>Gossip and spreading unverified information</li>
<li>Overly critical or cynical thinking</li>
<li>Mental restlessness without productive focus</li>
<li>Using intelligence to deflect rather than engage emotionally</li>
</ul>
<h2>In Love</h2>
<p><strong>Upright:</strong> Clear-headed observation of a relationship. May indicate news about a relationship or a partner who communicates sharply and directly. Good card for honest conversations.</p>
<p><strong>Reversed:</strong> Overthinking a relationship; using sarcasm or critical comments as emotional shields.</p>
<h2>Quick Reference</h2>
<ul><li><strong>Yes or No:</strong> Maybe — gather more information first</li><li><strong>Element:</strong> Earth of Air</li><li><strong>Key themes:</strong> Observation, curiosity, news, mental beginnings</li></ul>
</article>`
  },
  {
    slug: "page-of-pentacles-tarot-meaning",
    title: "Page of Pentacles Tarot — Diligent Study, New Beginnings in Finance & Practical Dreams",
    description: "The Page of Pentacles is the dedicated student of material reality. Learn upright and reversed meanings for career, finances, and the pursuit of practical skills.",
    keywords: ["page of pentacles tarot", "page of pentacles meaning", "page of pentacles love", "page of pentacles reversed"],
    category: "tarot",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>Page of Pentacles Tarot Card Meaning</h1>
<p>The Page of Pentacles stands in a green meadow, gazing intently at the golden pentacle floating in his hands. He is completely absorbed — this is the student, the apprentice, the person beginning their practical education in how the material world works.</p>
<h2>Upright Meaning</h2>
<ul>
<li><strong>New financial or career beginning:</strong> Starting a new job, course, or practical venture</li>
<li><strong>Diligent study:</strong> Committed to learning the practical skills for long-term success</li>
<li><strong>Manifestation mindset:</strong> Beginning to work with intention toward material goals</li>
<li><strong>Reliable effort:</strong> Consistent, patient work that will build into something substantial</li>
<li><strong>News about money or career:</strong> New opportunities in the practical realm</li>
</ul>
<h2>Reversed Meaning</h2>
<ul>
<li>Procrastination and failed follow-through on practical goals</li>
<li>Getting stuck in study mode without ever implementing</li>
<li>Financial immaturity or poor money management habits</li>
<li>Unfocused energy scattered across too many practical pursuits</li>
</ul>
<h2>In Career</h2>
<p>A new position, internship, or learning opportunity that, while modest now, has significant long-term potential. Put in the work — this Page becomes the King of Pentacles through dedicated practice.</p>
<h2>Quick Reference</h2>
<ul><li><strong>Yes or No:</strong> Yes — start with focused commitment</li><li><strong>Element:</strong> Earth of Earth</li><li><strong>Key themes:</strong> Study, new practical beginnings, patient effort</li></ul>
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
