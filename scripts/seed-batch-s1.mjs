/**
 * 批次S1：英文长尾词
 * - 12星座对应塔罗牌
 * - 塔罗与占星完整匹配指南
 * - 如何做年度塔罗展开
 */
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);

const posts = [
  {
    slug: "zodiac-sign-tarot-card-correspondences",
    category: "tarot",
    title: "Every Zodiac Sign's Tarot Card: The Complete Astrology-Tarot Correspondence Guide",
    title_en: "Every Zodiac Sign's Tarot Card: The Complete Astrology-Tarot Correspondence Guide",
    description: "Every zodiac sign has corresponding tarot cards in both the Major and Minor Arcana. This complete guide reveals which tarot cards match your sign — and what those connections reveal about your deeper nature.",
    keywords: ["zodiac tarot cards","astrology tarot correspondences","aries tarot card","scorpio tarot card","tarot and astrology","zodiac sign tarot meaning","which tarot card is my sign"],
    published_at: "2026-09-10",
    reading_time: 13,
    cta_href: "/tarot",
    cta_label: "🔮 Get Your Zodiac Tarot Reading — AI",
    cta_label_en: "Get Your Zodiac Tarot Reading — AI",
    content: `<h2>The Astrology-Tarot Connection</h2>
<p>Astrology and tarot developed in parallel streams of Western esoteric tradition, and their symbolic systems are deeply interwoven. Every Major Arcana card has a planetary or zodiacal correspondence; the Minor Arcana suits correspond to the four elements; and the court cards carry elemental sub-assignments. Understanding these correspondences enriches both systems and reveals layers of meaning that neither offers alone.</p>
<h2>Major Arcana: Zodiac Sign Correspondences</h2>
<p><strong>Aries → The Emperor</strong><br>
The Emperor embodies Aries' natural leadership, commanding presence, and the drive to establish structure and authority. Both the card and the sign deal with the assertion of will and the founding of order.</p>
<p><strong>Taurus → The Hierophant</strong><br>
The Hierophant governs established values, tradition, and the wisdom that comes from sustained, embodied experience — all deeply Taurean qualities. Both speak to what endures and what we build on over time.</p>
<p><strong>Gemini → The Lovers</strong><br>
Not primarily a romance card, The Lovers governs choice and duality — perfectly resonant with Gemini's double nature, the perpetual negotiation between options, and Mercury's domain of communication and connection.</p>
<p><strong>Cancer → The Chariot</strong><br>
The Chariot's combination of emotional intelligence and fierce will, the protective shell of the chariot, and the drive toward home and victory through feeling — all align with Cancer's archetype.</p>
<p><strong>Leo → Strength</strong><br>
Strength — particularly the Rider-Waite image of a woman gently taming a lion — perfectly captures Leo's relationship between ego and inner power, and the courage that comes from love rather than force.</p>
<p><strong>Virgo → The Hermit</strong><br>
The Hermit's patient solitude, its inner light, and its service to wisdom and discernment — deeply Virgoan qualities, as is the card's willingness to leave the crowd and walk one's own examined path.</p>
<p><strong>Libra → Justice</strong><br>
Justice governs balance, fairness, law, and the careful weighing of all sides — the defining qualities of Libra's archetype.</p>
<p><strong>Scorpio → Death</strong><br>
Death — the card of transformation, endings, and profound transition — couldn't more perfectly capture Scorpio's territory: the underworld, the willingness to die and be reborn, and the transformative power of complete release.</p>
<p><strong>Sagittarius → Temperance</strong><br>
Temperance governs the alchemy of integration — the combination of opposing forces into something transcendent. Sagittarius seeks truth, expansion, and the philosophical synthesis that Temperance represents.</p>
<p><strong>Capricorn → The Devil</strong><br>
The Devil's domain of material bondage, attachment, and shadow — and the recognition that the chains are within our power to release — speaks to Capricorn's shadow potential when achievement becomes its own trap.</p>
<p><strong>Aquarius → The Star</strong><br>
The Star's quiet revolutionary hope, its vision of a better future, and its authentic service to collective healing — these are Aquarian qualities at their highest expression.</p>
<p><strong>Pisces → The Moon</strong><br>
The Moon's dreamworld, its emotional tides, its connection to the unconscious and the mystical — perfectly resonant with Pisces' archetype of boundarylessness, spiritual depth, and the dissolution of ordinary reality.</p>
<h2>Planetary Correspondences in Major Arcana</h2>
<p><strong>The Sun</strong> → The Sun card (obviously), and also the core vitality cards: Strength (Leo), The Emperor (Aries ruled by Mars/Sun)</p>
<p><strong>The Moon</strong> → The High Priestess (lunar mysteries), The Moon card</p>
<p><strong>Mercury</strong> → The Magician (Mercury as the mind and communication principle)</p>
<p><strong>Venus</strong> → The Empress (Venus as creative abundance, beauty, and love)</p>
<p><strong>Mars</strong> → The Tower (Martian sudden force), The Emperor (as co-ruler)</p>
<p><strong>Jupiter</strong> → The Wheel of Fortune (Jupiterian expansion and luck)</p>
<p><strong>Saturn</strong> → The World (Saturn as completion and mastery), The Hermit (Virgo/Mercury but Saturn's quality)</p>
<p><strong>Uranus</strong> → The Fool (Uranian radical freedom and new beginnings)</p>
<p><strong>Neptune</strong> → The Hanged Man (Neptunian surrender and dissolution)</p>
<p><strong>Pluto</strong> → Judgement (Plutonian transformation and resurrection)</p>
<h2>How to Use These Correspondences in Readings</h2>
<p>When you know a querent's birth chart and the zodiacal/planetary correspondences of the cards they draw, readings become remarkably specific. Drawing the Death card for a Scorpio Sun person carries different resonance than drawing it for a Gemini. Drawing Strength for someone with Leo Rising confirms something about their public energy. These correspondences aren't rigid rules — they're additional layers of information that deepen interpretation when relevant.</p>`
  },
  {
    slug: "annual-year-ahead-tarot-spread-guide",
    category: "tarot",
    title: "Year Ahead Tarot Spread: How to Do a 12-Month Annual Reading",
    title_en: "Year Ahead Tarot Spread: How to Do a 12-Month Annual Reading",
    description: "The 12-month tarot spread is one of the most powerful annual practices you can adopt. This complete guide shows you exactly how to lay out, interpret, and work with your year-ahead tarot reading.",
    keywords: ["year ahead tarot spread","12 month tarot spread","annual tarot reading","tarot spread for the year","new year tarot spread","yearly tarot reading","2026 tarot spread"],
    published_at: "2026-09-11",
    reading_time: 11,
    cta_href: "/tarot",
    cta_label: "🔮 Get Your Year Ahead Reading — AI Tarot",
    cta_label_en: "Get Your Year Ahead Reading — AI Tarot",
    content: `<h2>Why an Annual Tarot Reading Is Different</h2>
<p>A year-ahead tarot reading is unlike any single-question spread. You're not asking about one situation — you're requesting an overview of an entire year's energetic landscape. This practice is most powerful when done at natural transition points: the new year, your birthday (a solar return), the autumn equinox, or any time you feel called to take a broad view of what's coming.</p>
<h2>What You Need Before Beginning</h2>
<p>Take fifteen minutes before you begin to genuinely quiet your mind. This reading deserves more preparation than a quick three-card pull. Light a candle, take several deep breaths, and if it resonates with you, set a clear intention: <em>I want to see clearly what energy and themes will be most relevant to my growth and wellbeing in the year ahead.</em></p>
<p>Use your full 78-card deck. Shuffle thoroughly and with full intention.</p>
<h2>The 12-Month Spread Layout</h2>
<p>Lay twelve cards in a circle, starting at roughly the 12 o'clock position and moving clockwise. If you're doing this at a new year, Card 1 represents January. If you're doing it at your birthday, Card 1 represents your birthday month.</p>
<p>You can add a 13th card in the center of the circle: <strong>the overarching theme of the entire year</strong>.</p>
<h2>How to Read Each Monthly Card</h2>
<p>Each card doesn't predict specific events — it reveals the energetic quality, theme, or lesson likely to be most prominent during that month. The Five of Cups in March doesn't mean something bad will happen in March; it suggests you may be processing grief or loss during that month, or that release and acceptance will be the primary emotional work.</p>
<p>Read each card asking: <em>What energy will be dominant here? What will this month be asking of me? What's the primary lesson or opportunity?</em></p>
<h2>Working With Challenging Cards</h2>
<p>When difficult cards appear — The Tower, Five of Swords, Ten of Swords — resist the urge to re-read or replace them. These cards are valuable precisely because they prepare you. A Tower month is a month when you can go in with eyes open, knowing that disruption is likely and that your job is to stay grounded rather than be caught off guard.</p>
<h2>The Central Card: Your Year's Theme</h2>
<p>The 13th card, placed at the center, is often the most important card in the spread. It speaks to the overarching lesson, opportunity, or energy that the entire year is organized around. If this card is one you don't understand immediately, sit with it. It will reveal its meaning over time — usually by about the third or fourth month of the year.</p>
<h2>Recording and Revisiting</h2>
<p>The full power of an annual reading comes from returning to it month by month. Take a photo of your spread and review each card at the beginning of its month. Note where the reading was accurate, where it surprised you, and where your interpretation needs refinement. Over several years of annual readings, you'll develop a remarkably accurate personal lexicon for what each card means in your specific life.</p>`
  },
  {
    slug: "tarot-spreads-for-love-complete-guide",
    category: "tarot",
    title: "Tarot Spreads for Love: 7 Spreads for Every Stage of a Relationship",
    title_en: "Tarot Spreads for Love: 7 Spreads for Every Stage of a Relationship",
    description: "From 'Will I find love?' to 'Should I stay or go?' — this guide covers 7 complete tarot spreads for every stage and question in your love life, with card positions and interpretation guidance.",
    keywords: ["love tarot spread","tarot spreads for relationships","tarot spread for love","relationship tarot spread","soulmate tarot spread","should i break up tarot","tarot spread for ex"],
    published_at: "2026-09-12",
    reading_time: 13,
    cta_href: "/tarot",
    cta_label: "🔮 Love Tarot Reading — AI",
    cta_label_en: "Love Tarot Reading — AI",
    content: `<h2>Why Love Questions Are Among the Most Powerful Tarot Queries</h2>
<p>Love readings are the most common tarot queries — and often the most emotionally charged. When you're asking about love, you're rarely just asking about logistics; you're asking about your deepest needs, your fears of abandonment and connection, your patterns in relationships, and sometimes your willingness to be honest with yourself about what's actually happening.</p>
<p>The cards excel at this kind of multi-layered inquiry. Here are seven spreads for different relationship stages and questions.</p>
<h2>Spread 1: Am I Ready for Love? (3 cards)</h2>
<p><strong>Card 1:</strong> Where my heart is right now<br>
<strong>Card 2:</strong> What I need to heal or release before opening to love<br>
<strong>Card 3:</strong> What I'm ready to receive</p>
<h2>Spread 2: What Does This Person Feel? (4 cards)</h2>
<p><strong>Card 1:</strong> How they see me<br>
<strong>Card 2:</strong> What they feel when they're with me<br>
<strong>Card 3:</strong> What they want from this situation<br>
<strong>Card 4:</strong> What's holding them back (if anything)</p>
<h2>Spread 3: The Relationship Dynamic (6 cards)</h2>
<p><strong>Card 1:</strong> You in this relationship<br>
<strong>Card 2:</strong> Them in this relationship<br>
<strong>Card 3:</strong> The relationship itself — its nature<br>
<strong>Card 4:</strong> The strength/foundation between you<br>
<strong>Card 5:</strong> The challenge or shadow in this connection<br>
<strong>Card 6:</strong> Where this is heading</p>
<h2>Spread 4: The Breakup Decision (5 cards)</h2>
<p><strong>Card 1:</strong> The core issue in this relationship<br>
<strong>Card 2:</strong> What staying would mean<br>
<strong>Card 3:</strong> What leaving would mean<br>
<strong>Card 4:</strong> What you know but aren't fully admitting<br>
<strong>Card 5:</strong> What your highest self needs</p>
<h2>Spread 5: The Ex Reading (4 cards)</h2>
<p><strong>Card 1:</strong> Why this relationship ended — the real reason<br>
<strong>Card 2:</strong> What this person still means to you<br>
<strong>Card 3:</strong> What reconciliation would actually look like<br>
<strong>Card 4:</strong> What your energy needs now regarding this person</p>
<h2>Spread 6: Attracting the Right Partner (5 cards)</h2>
<p><strong>Card 1:</strong> What energy you're currently projecting<br>
<strong>Card 2:</strong> What you're unconsciously attracting<br>
<strong>Card 3:</strong> What you actually need in a partner<br>
<strong>Card 4:</strong> What to release that's blocking love<br>
<strong>Card 5:</strong> The energy to cultivate to attract what you want</p>
<h2>Spread 7: The Soulmate Spread (7 cards)</h2>
<p><strong>Card 1:</strong> Your soul's current readiness for deep connection<br>
<strong>Card 2:</strong> What a soulmate connection looks like for you<br>
<strong>Card 3:</strong> What you bring to a soul-level partnership<br>
<strong>Card 4:</strong> What your soulmate brings<br>
<strong>Card 5:</strong> The lesson this connection is designed to teach<br>
<strong>Card 6:</strong> What needs to happen on your end for this connection to manifest<br>
<strong>Card 7:</strong> The broader spiritual context of this search</p>
<h2>A Note on Love Readings</h2>
<p>The best love readings don't predict who you'll end up with — they illuminate what's happening inside you in relation to love right now. The most valuable card in any love reading is usually the one that tells you something true about yourself that you've been avoiding: your real needs, your patterns, your fears. That's where the actual work — and the actual transformation — happens.</p>`
  },
  {
    slug: "tarot-for-career-money-complete-guide",
    category: "tarot",
    title: "Tarot for Career and Money: Complete Guide to Reading Tarot for Work and Finances",
    title_en: "Tarot for Career and Money: Complete Guide to Reading Tarot for Work and Finances",
    description: "Tarot is exceptionally useful for career and money questions — from job offer decisions to business strategy to financial patterns. This complete guide covers the best cards, spreads, and techniques for career readings.",
    keywords: ["tarot for career","career tarot reading","money tarot reading","tarot for finances","job tarot reading","business tarot spread","should i change jobs tarot","career tarot spread"],
    published_at: "2026-09-13",
    reading_time: 12,
    cta_href: "/tarot",
    cta_label: "🔮 Career Tarot Reading — AI",
    cta_label_en: "Career Tarot Reading — AI",
    content: `<h2>Why Tarot Works for Career and Financial Questions</h2>
<p>Career and money decisions are among the most practically significant choices in a life, and they're often also the most emotionally complex. Tarot doesn't predict stock prices or guarantee job outcomes — but it consistently illuminates the psychological and energetic dynamics affecting career and financial situations: hidden motivations, blind spots, blocks to abundance, and the timing and approach most likely to succeed.</p>
<h2>Career-Significant Cards to Know</h2>
<p><strong>Major Arcana for Career:</strong></p>
<ul>
<li><strong>The Emperor</strong> — Authority, leadership, establishing structure; also can indicate working with/for authority figures</li>
<li><strong>The Chariot</strong> — Drive, determination, moving forward powerfully; ambition being channeled effectively</li>
<li><strong>The Wheel of Fortune</strong> — Cycles, luck, timing; a turning point in career circumstances</li>
<li><strong>The World</strong> — Completion, achievement, a major career goal fulfilled</li>
<li><strong>The Hierophant</strong> — Traditional institutions, established organizations, mentorship</li>
<li><strong>The Magician</strong> — Your skills fully activated; everything needed is available; confidence in your toolkit</li>
</ul>
<p><strong>Minor Arcana for Career:</strong></p>
<ul>
<li><strong>Three of Pentacles</strong> — Collaboration, recognized skill, building something of value</li>
<li><strong>Eight of Pentacles</strong> — Focused skill development, mastery through work, a productive period</li>
<li><strong>King of Pentacles</strong> — Financial mastery, business authority, long-term wealth building</li>
<li><strong>Ace of Pentacles</strong> — New financial opportunity, a viable new venture or offer</li>
<li><strong>Seven of Pentacles</strong> — Assessment point, evaluating returns on investment of time and effort</li>
<li><strong>Knight of Wands</strong> — Moving fast in career; entrepreneurial energy; passionate pursuit</li>
</ul>
<h2>Career Change Spread (5 Cards)</h2>
<p><strong>Card 1:</strong> Where I am now in my career<br>
<strong>Card 2:</strong> What I'm actually looking for (beneath the surface desire for change)<br>
<strong>Card 3:</strong> What I'd gain by making this change<br>
<strong>Card 4:</strong> What I'd lose or what the challenge would be<br>
<strong>Card 5:</strong> What my highest path forward looks like</p>
<h2>Money and Abundance Spread (6 Cards)</h2>
<p><strong>Card 1:</strong> My current relationship with money<br>
<strong>Card 2:</strong> The core belief about money I'm operating from<br>
<strong>Card 3:</strong> What's blocking greater financial flow<br>
<strong>Card 4:</strong> What I need to do differently<br>
<strong>Card 5:</strong> My strongest financial asset right now<br>
<strong>Card 6:</strong> The energy and approach to cultivate for financial growth</p>
<h2>Reading Pentacles in Career Readings</h2>
<p>A reading dominated by Pentacles is pointing directly at material, practical, and financial realities. This isn't a spiritually flat reading — it's one where the practical dimension is genuinely what most needs attention. Don't try to make a Pentacles-heavy career reading more mystical than it is: sometimes the message is simply practical, and that's valuable.</p>`
  }
];

async function main() {
  console.log(`📝 批次S1：写入 ${posts.length} 篇英文塔罗/占星专题...`);
  let success = 0, fail = 0;
  for (const post of posts) {
    const { error } = await supabase.from("mysticai_blog_posts").upsert(post, { onConflict: "slug" });
    if (error) { console.error(`  ❌ [${post.slug}]:`, error.message); fail++; }
    else { console.log(`  ✅ [${post.slug}]`); success++; }
  }
  console.log(`\n完成！成功: ${success}, 失败: ${fail}`);
}
main().catch(console.error);
