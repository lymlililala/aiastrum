import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);
const posts = [
  {
    slug: "life-path-number-1-meaning-guide",
    title: "Life Path Number 1 — The Leader's Complete Numerology Guide",
    category: "numerology",
    published_at: new Date().toISOString(),
    content: `<article><h1>Life Path Number 1 — The Leader's Complete Numerology Guide</h1>
<p>Life Path Number 1 is the number of the pioneer, the leader, and the independent thinker. If your birthdate reduces to 1, you are here to forge new paths and lead by example.</p>
<h2>Core Energy of Number 1</h2>
<p>Number 1 vibrates with the energy of new beginnings, self-reliance, and ambition. It is the first spark of creation, the original thought before anything else exists. People with this life path are original, driven, and highly independent.</p>
<h2>Key Personality Traits</h2>
<ul>
<li><strong>Natural leader:</strong> Others instinctively look to you for direction and decisions.</li>
<li><strong>Independent:</strong> You need the freedom to do things your own way.</li>
<li><strong>Ambitious:</strong> You have clear goals and the drive to achieve them.</li>
<li><strong>Original:</strong> You prefer creating new ideas rather than following established patterns.</li>
<li><strong>Determined:</strong> Obstacles motivate rather than discourage you.</li>
</ul>
<h2>Career Paths for Life Path 1</h2>
<p>Entrepreneurship, executive leadership, military, athletics, invention, and any role where you can set direction and be in charge. You thrive when you are your own boss or hold significant authority.</p>
<h2>Love and Relationships</h2>
<p>In relationships, Life Path 1 needs a partner who respects their independence and ambition. Compatible with Life Path 3 (brings joy and creativity) and Life Path 5 (matches your energy). Can clash with Life Path 2 if you become too domineering.</p>
<h2>Life Lessons and Challenges</h2>
<p>The shadow side of 1 is arrogance, stubbornness, and difficulty asking for help. Learning to collaborate and value others' input is the key growth journey for Life Path 1.</p>
<h2>Famous Life Path 1s</h2>
<p>Steve Jobs, Martin Luther King Jr., Lady Gaga, Scarlett Johansson — all pioneers who forged their own unique paths.</p>
<h2>2026 Forecast for Life Path 1</h2>
<p>2026 brings opportunities for major new beginnings. A new career venture, relationship, or personal project you launch this year has strong foundations. Trust your instincts and take bold action.</p>
</article>`
  },
  {
    slug: "life-path-number-2-meaning-guide",
    title: "Life Path Number 2 — The Peacemaker's Complete Numerology Guide",
    category: "numerology",
    published_at: new Date().toISOString(),
    content: `<article><h1>Life Path Number 2 — The Peacemaker's Complete Numerology Guide</h1>
<p>Life Path Number 2 is the number of harmony, partnership, and diplomacy. If your life path reduces to 2, you are a natural mediator gifted with sensitivity, empathy, and the ability to see all sides.</p>
<h2>Core Energy of Number 2</h2>
<p>Number 2 carries feminine, receptive energy — the principle of duality and cooperation. Where 1 acts alone, 2 thrives in partnership. Your gift is bringing people together and creating peace in conflict.</p>
<h2>Key Personality Traits</h2>
<ul>
<li><strong>Empathetic:</strong> You feel others' emotions deeply and naturally.</li>
<li><strong>Diplomatic:</strong> You excel at finding middle ground.</li>
<li><strong>Cooperative:</strong> You genuinely enjoy working as part of a team.</li>
<li><strong>Intuitive:</strong> Strong gut feelings that are usually accurate.</li>
<li><strong>Supportive:</strong> Natural nurturer and encourager.</li>
</ul>
<h2>Career Paths for Life Path 2</h2>
<p>Counseling, diplomacy, human resources, music, teaching, nursing, social work. Any role that involves helping others and maintaining harmony suits you perfectly.</p>
<h2>Love and Relationships</h2>
<p>Partnership is central to your happiness. You give deeply in relationships but need to avoid losing yourself. Compatible with Life Path 8 (provides security) and Life Path 9 (shares idealism). Your biggest lesson: receiving as gracefully as you give.</p>
<h2>Challenges</h2>
<p>Over-sensitivity, people-pleasing, and difficulty making decisions. Learning to set healthy boundaries while maintaining your warmth is your core life lesson.</p>
<h2>2026 Forecast</h2>
<p>2026 highlights partnerships — professional and romantic. A key relationship deepens or a new meaningful connection forms. Trust your intuition about who deserves your energy.</p>
</article>`
  },
  {
    slug: "life-path-number-3-meaning-guide",
    title: "Life Path Number 3 — The Creative Spirit's Complete Numerology Guide",
    category: "numerology",
    published_at: new Date().toISOString(),
    content: `<article><h1>Life Path Number 3 — The Creative Spirit's Complete Numerology Guide</h1>
<p>Life Path Number 3 radiates joy, creativity, and self-expression. If your birthdate reduces to 3, you are here to inspire, create, and bring light and laughter to the world.</p>
<h2>Core Energy of Number 3</h2>
<p>The Trinity — mind, body, spirit — converges in number 3. This number holds the energy of creation, communication, and optimism. 3s are the artists, performers, writers, and storytellers of the numerology spectrum.</p>
<h2>Key Personality Traits</h2>
<ul>
<li><strong>Creative:</strong> Ideas flow naturally and abundantly.</li>
<li><strong>Optimistic:</strong> You naturally see the bright side of situations.</li>
<li><strong>Communicative:</strong> Gifted with words, whether spoken or written.</li>
<li><strong>Charming:</strong> Magnetic personality that draws people in.</li>
<li><strong>Playful:</strong> You keep the joy and wonder of youth throughout life.</li>
</ul>
<h2>Career Paths</h2>
<p>Art, writing, acting, public speaking, teaching, social media, design, comedy. Any platform for self-expression is your natural domain.</p>
<h2>Love and Relationships</h2>
<p>You need a partner who appreciates your creativity and playfulness. Best matches: Life Path 1 (appreciates your talent), Life Path 5 (shares love of adventure). Watch for: scattered attention and difficulty with commitment.</p>
<h2>Challenges</h2>
<p>Scattered energy, avoiding difficult emotions through humor, and underusing your talents due to fear of criticism. Discipline and emotional depth are your growth areas.</p>
<h2>2026 Forecast</h2>
<p>A breakthrough year for creative projects. What you create in 2026 carries extra potency — put your authentic voice into it fully.</p>
</article>`
  },
  {
    slug: "life-path-number-4-meaning-guide",
    title: "Life Path Number 4 — The Builder's Complete Numerology Guide",
    category: "numerology",
    published_at: new Date().toISOString(),
    content: `<article><h1>Life Path Number 4 — The Builder's Complete Numerology Guide</h1>
<p>Life Path Number 4 is the number of foundation, structure, and hard work. If your life path is 4, you are here to build lasting things — careers, homes, systems, and legacies.</p>
<h2>Core Energy of Number 4</h2>
<p>Four represents stability: four seasons, four directions, four elements. This energy grounds and stabilizes. Number 4 people are the reliable backbone of any team or family structure.</p>
<h2>Key Personality Traits</h2>
<ul>
<li><strong>Reliable:</strong> Others know they can always count on you.</li>
<li><strong>Disciplined:</strong> Consistent effort even when it's challenging.</li>
<li><strong>Practical:</strong> Solutions-focused and grounded in reality.</li>
<li><strong>Organized:</strong> Systems and order help you feel secure.</li>
<li><strong>Loyal:</strong> Deeply committed to those you love.</li>
</ul>
<h2>Career Paths</h2>
<p>Engineering, architecture, project management, finance, law, military, construction. Anywhere that requires building something real and enduring.</p>
<h2>Love and Relationships</h2>
<p>You show love through acts of service and reliability. Best matches: Life Path 2 (appreciates your stability) and Life Path 8 (shares ambition). Challenge: loosening up and bringing spontaneity into relationships.</p>
<h2>Challenges</h2>
<p>Rigidity, resistance to change, and working so hard you neglect rest. Learning flexibility and self-care are essential lessons.</p>
<h2>2026 Forecast</h2>
<p>Long-term efforts finally yield visible results. A project or plan you've been building for years reaches a significant milestone. Keep going.</p>
</article>`
  },
  {
    slug: "life-path-number-5-meaning-guide",
    title: "Life Path Number 5 — The Freedom Seeker's Complete Numerology Guide",
    category: "numerology",
    published_at: new Date().toISOString(),
    content: `<article><h1>Life Path Number 5 — The Freedom Seeker's Complete Numerology Guide</h1>
<p>Life Path Number 5 is the number of freedom, adventure, and change. If your birthdate reduces to 5, you are here to experience life fully, embrace change, and expand boundaries.</p>
<h2>Core Energy of Number 5</h2>
<p>Five is the number of the senses and experience. Life Path 5 people are dynamic, curious, and restless — they need constant new input to feel alive. Change is not just accepted but craved.</p>
<h2>Key Personality Traits</h2>
<ul>
<li><strong>Adventurous:</strong> Travel, new experiences, and variety are essential.</li>
<li><strong>Adaptable:</strong> You handle change better than anyone.</li>
<li><strong>Charismatic:</strong> Magnetic energy that attracts people naturally.</li>
<li><strong>Versatile:</strong> Multiple talents and interests.</li>
<li><strong>Progressive:</strong> Always thinking ahead, embracing the new.</li>
</ul>
<h2>Career Paths</h2>
<p>Sales, travel, media, entertainment, marketing, freelancing, anything with variety and movement. You wilt in routines and thrive in dynamic environments.</p>
<h2>Love and Relationships</h2>
<p>Freedom within commitment is your ideal. Best matches: Life Path 1 (independent too) and Life Path 7 (intellectual companionship). Challenge: fear of being trapped leads to commitment avoidance.</p>
<h2>Challenges</h2>
<p>Restlessness, inconsistency, and substance excess as stimulation-seeking. Learning to commit and go deep rather than wide is the 5's growth journey.</p>
<h2>2026 Forecast</h2>
<p>Exciting changes and opportunities arrive unexpectedly. Travel or a major relocation is possible. Say yes to the unexpected — it leads somewhere wonderful.</p>
</article>`
  },
  {
    slug: "life-path-number-6-meaning-guide",
    title: "Life Path Number 6 — The Nurturer's Complete Numerology Guide",
    category: "numerology",
    published_at: new Date().toISOString(),
    content: `<article><h1>Life Path Number 6 — The Nurturer's Complete Numerology Guide</h1>
<p>Life Path Number 6 is the number of responsibility, care, and family. If your life path is 6, you are here to nurture, heal, and create beauty and harmony in the world.</p>
<h2>Core Energy of Number 6</h2>
<p>Six is associated with Venus — love, beauty, harmony, and service. Number 6 people are the natural caregivers of the numerology system, finding deep purpose in taking care of others.</p>
<h2>Key Personality Traits</h2>
<ul>
<li><strong>Nurturing:</strong> Instinctively caring for those around you.</li>
<li><strong>Responsible:</strong> You take your commitments extremely seriously.</li>
<li><strong>Aesthetic:</strong> Strong sense of beauty in all forms.</li>
<li><strong>Healing:</strong> Others feel better just being around you.</li>
<li><strong>Community-focused:</strong> Home and family are your greatest priorities.</li>
</ul>
<h2>Career Paths</h2>
<p>Healthcare, teaching, counseling, interior design, social work, parenting, culinary arts, hospitality. Anywhere you can care for and beautify.</p>
<h2>Love and Relationships</h2>
<p>Family is central to your identity. Best matches: Life Path 2 (similar nurturing values) and Life Path 9 (shares idealism). Warning: over-giving until you're depleted, then resentment builds.</p>
<h2>Challenges</h2>
<p>Martyrdom, perfectionism about the home, and meddling in others' affairs with the best intentions. Setting limits on how much you give is crucial.</p>
<h2>2026 Forecast</h2>
<p>Family matters take center stage — possibly a birth, marriage, or healing of old wounds. Your home environment transforms in meaningful ways.</p>
</article>`
  },
  {
    slug: "life-path-number-7-meaning-guide",
    title: "Life Path Number 7 — The Seeker's Complete Numerology Guide",
    category: "numerology",
    published_at: new Date().toISOString(),
    content: `<article><h1>Life Path Number 7 — The Seeker's Complete Numerology Guide</h1>
<p>Life Path Number 7 is the most spiritual and introspective of all life paths. If your birthdate reduces to 7, you are here to seek truth, develop wisdom, and understand the deeper mysteries of existence.</p>
<h2>Core Energy of Number 7</h2>
<p>Seven holds sacred significance across cultures — 7 days of the week, 7 chakras, 7 notes of the musical scale. It represents the bridge between the material and spiritual worlds. Life Path 7 people are the philosophers, mystics, and investigators of numerology.</p>
<h2>Key Personality Traits</h2>
<ul>
<li><strong>Analytical:</strong> Deep thinker who questions everything.</li>
<li><strong>Spiritual:</strong> Drawn to metaphysical and philosophical inquiry.</li>
<li><strong>Private:</strong> Selective about who you let into your inner world.</li>
<li><strong>Intuitive:</strong> Powerful inner knowing that guides decisions.</li>
<li><strong>Perfectionist:</strong> High standards for knowledge and truth.</li>
</ul>
<h2>Career Paths</h2>
<p>Research, academia, psychology, spirituality, writing, technology, investigation, philosophy. Solitary work that allows deep focused thinking suits you best.</p>
<h2>Love and Relationships</h2>
<p>You need intellectual and spiritual connection above all else. Best matches: Life Path 5 (respects your need for space) and Life Path 4 (provides grounding). Challenge: vulnerability and emotional openness don't come easily.</p>
<h2>Challenges</h2>
<p>Isolation, cynicism, and losing yourself in analysis paralysis. Learning to trust and open emotionally is the heart of the 7's journey.</p>
<h2>2026 Forecast</h2>
<p>A year of profound inner awakening. A spiritual practice, study, or retreat in 2026 changes your perspective fundamentally. Embrace the solitude — it's where your answers live.</p>
</article>`
  },
  {
    slug: "life-path-number-8-meaning-guide",
    title: "Life Path Number 8 — The Powerhouse's Complete Numerology Guide",
    category: "numerology",
    published_at: new Date().toISOString(),
    content: `<article><h1>Life Path Number 8 — The Powerhouse's Complete Numerology Guide</h1>
<p>Life Path Number 8 is the number of power, abundance, and material mastery. If your life path is 8, you are here to achieve great material success and learn the responsible use of power.</p>
<h2>Core Energy of Number 8</h2>
<p>The infinity symbol on its side — 8 represents endless cycles of giving and receiving. It is the number of karma and the law of cause and effect, especially in financial and power dynamics. What you put out returns to you, amplified.</p>
<h2>Key Personality Traits</h2>
<ul>
<li><strong>Ambitious:</strong> Big goals, big drive, big results.</li>
<li><strong>Authoritative:</strong> Natural executive presence.</li>
<li><strong>Strategic:</strong> Excellent at seeing the big picture and planning.</li>
<li><strong>Resilient:</strong> Setbacks are temporary; you always come back stronger.</li>
<li><strong>Generous:</strong> When successful, genuinely gives back.</li>
</ul>
<h2>Career Paths</h2>
<p>Business ownership, finance, law, real estate, corporate leadership, athletics, politics. Anywhere power and resources are managed at scale.</p>
<h2>Love and Relationships</h2>
<p>Work-life balance is your greatest relationship challenge. Best matches: Life Path 2 (balances your intensity) and Life Path 6 (shares home-building values). Need a partner who understands your ambition without feeling neglected.</p>
<h2>Challenges</h2>
<p>Workaholism, controlling behavior, and equating self-worth with financial success. Learning that love and connection matter as much as achievement is the 8's deepest lesson.</p>
<h2>2026 Forecast</h2>
<p>Major financial and career moves are supported. A business venture, investment, or leadership role advances significantly. Use your power with integrity for best results.</p>
</article>`
  },
  {
    slug: "life-path-number-9-meaning-guide",
    title: "Life Path Number 9 — The Humanitarian's Complete Numerology Guide",
    category: "numerology",
    published_at: new Date().toISOString(),
    content: `<article><h1>Life Path Number 9 — The Humanitarian's Complete Numerology Guide</h1>
<p>Life Path Number 9 is the number of completion, wisdom, and universal love. If your birthdate reduces to 9, you are an old soul here to serve humanity and complete a major spiritual cycle.</p>
<h2>Core Energy of Number 9</h2>
<p>Nine contains all other numbers within it mathematically (9×2=18, 1+8=9, etc.). It represents completion and the wisdom gained through all life experiences. Life Path 9 carries the accumulated knowledge of the human journey.</p>
<h2>Key Personality Traits</h2>
<ul>
<li><strong>Compassionate:</strong> Deep empathy for all living beings.</li>
<li><strong>Idealistic:</strong> Visionary belief in a better world.</li>
<li><strong>Wise:</strong> Old-soul perspective that sees the bigger picture.</li>
<li><strong>Creative:</strong> Often highly artistic or musically gifted.</li>
<li><strong>Generous:</strong> Giving to a fault — sometimes literally.</li>
</ul>
<h2>Career Paths</h2>
<p>Humanitarian work, arts, healing professions, teaching, environmental activism, religion, psychology. Any path that contributes to the greater good.</p>
<h2>Love and Relationships</h2>
<p>You love all of humanity but may struggle with intimate partnership. Best matches: Life Path 3 (creative and playful energy) and Life Path 6 (shares service values). Lesson: allow yourself to receive as well as give.</p>
<h2>Challenges</h2>
<p>Bitterness when the world doesn't match your ideals, difficulty with endings and letting go, and giving away resources until you're depleted. The shadow of 9 is disillusionment.</p>
<h2>2026 Forecast</h2>
<p>2026 brings powerful endings that make space for extraordinary new beginnings. Something you release this year frees you for your next level of growth. Surrender gracefully.</p>
</article>`
  },
  {
    slug: "life-path-master-numbers-11-22-33",
    title: "Master Numbers 11, 22, 33 in Numerology — The Most Powerful Life Paths",
    category: "numerology",
    published_at: new Date().toISOString(),
    content: `<article><h1>Master Numbers 11, 22, 33 in Numerology — The Most Powerful Life Paths</h1>
<p>Master numbers are special in numerology — they are not reduced to a single digit because they carry intensified spiritual energy. If your birthdate reduces to 11, 22, or 33, you carry an extraordinary soul mission.</p>
<h2>What Are Master Numbers?</h2>
<p>When calculating your life path number, if the result before final reduction is 11, 22, or 33, you have a master number life path. These numbers combine the practical challenges of their reduced form (2, 4, 6) with elevated spiritual purpose.</p>
<h2>Life Path 11 — The Inspired Visionary</h2>
<p>The most intuitive of all life paths, 11 carries the sensitivity of 2 amplified to psychic levels. You are a spiritual messenger, here to inspire others with your vision and heightened awareness. Famous 11s include Barack Obama, Bill Clinton, and Edgar Allan Poe.</p>
<p><strong>Gifts:</strong> Prophetic intuition, spiritual insight, ability to inspire masses.<br>
<strong>Challenges:</strong> Extreme sensitivity, anxiety, nervous system overwhelm, self-doubt.<br>
<strong>Purpose:</strong> Channel your heightened perception into art, leadership, or spiritual teaching.</p>
<h2>Life Path 22 — The Master Builder</h2>
<p>22 combines the visionary idealism of 11 with practical 4 energy, creating the most powerful builder in numerology. You can manifest big dreams into physical reality at a scale most can only imagine. Famous 22s include Bill Gates, Tina Turner.</p>
<p><strong>Gifts:</strong> Visionary thinking combined with extraordinary execution ability.<br>
<strong>Challenges:</strong> The weight of high potential can lead to avoidance or self-sabotage.<br>
<strong>Purpose:</strong> Build something that benefits humanity long after you're gone.</p>
<h2>Life Path 33 — The Master Teacher</h2>
<p>The rarest master number, 33 is called the Christ Consciousness number — it represents unconditional love and healing at the highest spiritual level. True 33s devote their lives to service. Famous 33s include Albert Einstein, Stephen King.</p>
<p><strong>Gifts:</strong> Pure compassionate love, ability to heal and uplift all those they encounter.<br>
<strong>Challenges:</strong> Sacrificing the self entirely, martyrdom, carrying others' burdens too heavily.<br>
<strong>Purpose:</strong> Embody love in its highest form and teach by example.</p>
<h2>How to Activate Master Number Energy</h2>
<p>Master numbers require conscious choice. You can operate at the lower vibration (11 as 2, 22 as 4, 33 as 6) or consciously step into the elevated mission. Spiritual practice, self-awareness, and devoted service help master number people fulfill their true potential.</p>
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
