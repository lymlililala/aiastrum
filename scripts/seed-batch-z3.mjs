import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);
const posts = [
  {
    slug: "dream-about-flying-high-meaning",
    title: "Dream About Flying High vs Low — What Your Flying Dream Altitude Reveals",
    category: "dream",
    published_at: new Date().toISOString(),
    content: `<article><h1>Dream About Flying High vs Low — What Your Flying Dream Altitude Reveals</h1>
<p>Flying dreams are among the most exhilarating human experiences. But the details matter enormously — are you soaring effortlessly, struggling to stay aloft, or flying low close to the ground? Each variation carries distinct meaning.</p>
<h2>Flying High and Effortlessly</h2>
<p>This is the classic euphoric flying dream — complete freedom, joy, and transcendence. It typically represents:</p>
<ul><li>A current period of genuine freedom, confidence, and possibility in waking life</li><li>Accessing a higher perspective on your life situation</li><li>Spiritual expansion or elevated consciousness</li><li>Strong sense of personal power and capability</li></ul>
<h2>Struggling to Fly or Stay Aloft</h2>
<p>When flying requires enormous effort, or you keep descending against your will:</p>
<ul><li>You're reaching toward goals but encountering resistance</li><li>Anxiety about maintaining achievements already gained</li><li>Something in your life is "weighing you down" — a commitment, relationship, or belief</li></ul>
<h2>Flying Low, Close to the Ground</h2>
<p>Low-altitude flying suggests:</p>
<ul><li>Cautious optimism — you're gaining freedom but staying connected to earth</li><li>Practical creativity — using your gifts in grounded, real-world ways</li><li>Not yet ready to fully commit to the heights available to you</li></ul>
<h2>Being Afraid to Fly</h2>
<p>Fear during a flying dream represents fear of success, heights of ambition, or the vulnerability that comes with standing out. The dream offers a safe space to practice the fear.</p>
<h2>Traditional Interpretation</h2>
<p>In many traditions, flying dreams are considered auspicious — symbols of the soul's freedom and the dreamer's potential for transcendence. In Chinese dream interpretation, flying high often portends positive changes and expansion in life circumstances.</p></article>`
  },
  {
    slug: "dream-about-water-flooding-house",
    title: "Dream About Water Flooding Your House — Emotional Overwhelm & Hidden Meaning",
    category: "dream",
    published_at: new Date().toISOString(),
    content: `<article><h1>Dream About Water Flooding Your House — Emotional Overwhelm & Hidden Meaning</h1>
<p>Water flooding a house in dreams is one of the most psychologically rich scenarios the unconscious creates. The house represents your psyche/self; water represents emotions, the unconscious, or life circumstances. When they combine in flooding, the meaning deepens considerably.</p>
<h2>What Water Flooding Symbolizes</h2>
<ul><li><strong>Emotional overwhelm</strong>: Feelings that have outgrown their containers and are flooding into spaces where you thought you had control</li><li><strong>Unconscious material breaking through</strong>: Repressed memories, emotions, or truths breaking into conscious awareness</li><li><strong>Life circumstances out of control</strong>: Situations that were manageable becoming uncontainable</li><li><strong>Purification and clearing</strong>: In positive interpretations, flood waters clean and clear what no longer serves</li></ul>
<h2>Details That Change the Meaning</h2>
<h3>Clear vs. Murky Water</h3>
<p>Clear flooding suggests emotional clarity even amid overwhelm — you know what's happening. Murky, dirty water indicates confusion, hidden fears, or unconscious material that hasn't been identified yet.</p>
<h3>Rising Slowly vs. Sudden Flood</h3>
<p>Gradual rising water signals a situation that has been building over time. Sudden flooding suggests unexpected developments that came without warning.</p>
<h3>Your Response in the Dream</h3>
<p>Calmly navigating the flood vs. panicking says much about your current emotional resources. Rescuing others suggests feeling responsible for others' emotional states.</p>
<h2>Practical Meaning</h2>
<p>If you're dreaming of flooded houses repeatedly, examine: what emotions have you been containing that are now demanding expression? What life area has exceeded your management capacity? What needs to be released before it causes damage?</p></article>`
  },
  {
    slug: "dream-about-teeth-falling-not-painful",
    title: "Dream Teeth Falling Out But Not Painful — Why It's Different & What It Means",
    category: "dream",
    published_at: new Date().toISOString(),
    content: `<article><h1>Dream Teeth Falling Out But Not Painful — Why It's Different & What It Means</h1>
<p>The classic teeth-falling dream is disturbing — but what about the version where teeth fall out and you feel no pain? This variation carries distinctly different energy and meaning than the painful version.</p>
<h2>Why Painless Tooth Loss Matters</h2>
<p>Pain in dreams often represents the emotional weight of what's being symbolized. Painless tooth loss suggests:</p>
<ul><li><strong>Emotional detachment</strong>: You're aware something is being lost or changing, but you've already processed the grief or aren't yet feeling its impact</li><li><strong>Natural release</strong>: Like baby teeth falling out to make room for adult teeth — change that is natural and developmental rather than traumatic</li><li><strong>Unrecognized loss</strong>: Something is slipping away that you haven't yet noticed matters</li><li><strong>Acceptance</strong>: A transition being processed smoothly because you've already arrived at acceptance</li></ul>
<h2>Psychological Interpretation</h2>
<p>Teeth represent our ability to process (food, information, life experience), communicate, and defend ourselves. Painless loss suggests you're in a period of shedding old ways of engaging with life — letting go of communication patterns, defenses, or capabilities that no longer fit who you're becoming.</p>
<h2>If You Wake Feeling Peaceful</h2>
<p>A painless teeth dream that leaves you feeling calm or even relieved usually signifies genuine release — something that needed to go is going, and part of you knows this is right.</p>
<h2>If You Wake Feeling Uneasy</h2>
<p>The contrast between physical painlessness and emotional unease suggests you're intellectually accepting a change while emotionally still processing the impact.</p></article>`
  },
  {
    slug: "dream-about-being-naked-in-public",
    title: "Dream About Being Naked in Public — Vulnerability, Truth & Exposure Anxiety",
    category: "dream",
    published_at: new Date().toISOString(),
    content: `<article><h1>Dream About Being Naked in Public — Vulnerability, Truth & Exposure Anxiety</h1>
<p>One of the most universally reported dream experiences: suddenly realizing you're naked in a public setting — a school, workplace, or crowded street. The range of emotional responses in these dreams (shame, defiance, no one noticing) reveals as much as the scenario itself.</p>
<h2>Core Symbolism of Nakedness in Dreams</h2>
<ul><li><strong>Vulnerability exposed</strong>: Your authentic self — without the protection of social roles, professional masks, or performative identity</li><li><strong>Truth coming out</strong>: The exposure of something you've been keeping hidden or private</li><li><strong>Authenticity anxiety</strong>: Fear that if people see the "real you," you'll be rejected or judged</li><li><strong>Preparation inadequacy</strong>: Classic anxiety dream about being unprepared for a high-stakes situation</li></ul>
<h2>Key Variations</h2>
<h3>No One Notices You're Naked</h3>
<p>The most liberating variation. It suggests that your fear of exposure may be greater than the actual judgment that would occur. Others are focused on their own concerns — your vulnerability may matter less to them than to you.</p>
<h3>People Are Laughing or Judging</h3>
<p>Internalized fear of social judgment coming to life. Usually reflects a specific situation where you feel exposed and expect criticism — look at current waking life for the source.</p>
<h3>You Feel Proud or Unashamed</h3>
<p>A powerful positive dream — your authentic self feels worthy of being seen. Growing self-acceptance and comfort with genuine vulnerability.</p>
<h2>Context Questions</h2>
<p>Where are you naked in the dream? The location often identifies the life area where you feel most exposed — workplace nakedness relates to professional vulnerabilities; school nakedness often relates to intellectual insecurities.</p></article>`
  },
  {
    slug: "dream-about-dead-relative-visiting",
    title: "Dream About Dead Relatives Visiting — Spiritual Messages, Grief & Connection",
    category: "dream",
    published_at: new Date().toISOString(),
    content: `<article><h1>Dream About Dead Relatives Visiting — Spiritual Messages, Grief & Connection</h1>
<p>Dreams featuring deceased relatives are among the most emotionally significant and spiritually charged dreams people experience. Whether you interpret them as genuine visitations or psychological processing, they deserve careful attention.</p>
<h2>Two Major Frameworks for Understanding These Dreams</h2>
<h3>Spiritual/Visitation Framework</h3>
<p>Many spiritual traditions hold that deceased loved ones can genuinely contact the living through dreams. Characteristics of authentic visitation dreams typically include:</p>
<ul><li>The dream feels remarkably vivid and "real" — qualitatively different from ordinary dreams</li><li>The deceased appears healthy, at peace, and often younger or at their best</li><li>There's a specific message, reassurance, or gesture of farewell</li><li>You wake feeling comforted, peaceful, or with a sense of genuine contact</li></ul>
<h3>Psychological Processing Framework</h3>
<p>From a grief psychology perspective, these dreams help us:</p>
<ul><li>Continue the relationship in a healthy way after loss</li><li>Process unfinished emotional business with the deceased</li><li>Integrate their wisdom, values, or qualities into ourselves</li><li>Mark milestones (graduations, marriages) where we wish they were present</li></ul>
<h2>What the Deceased Says Matters</h2>
<p>Pay close attention to any words spoken in these dreams. Messages of reassurance ("I'm okay"), forgiveness, or guidance often carry significant psychological or spiritual meaning.</p>
<h2>When Deceased Relatives Appear Troubled</h2>
<p>If the deceased appears distressed or in difficulty, this often reflects unresolved grief, guilt, or unfinished emotional business in the dreamer — not necessarily the actual state of the deceased.</p></article>`
  },
  {
    slug: "dream-about-old-house-childhood-home",
    title: "Dream About Your Childhood Home — Past Self, Foundation & What It's Calling You To",
    category: "dream",
    published_at: new Date().toISOString(),
    content: `<article><h1>Dream About Your Childhood Home — Past Self, Foundation & What It's Calling You To</h1>
<p>Recurring dreams of childhood homes are among the most psychologically significant dreams we can have. The childhood home represents your foundational self — the place where your earliest patterns, beliefs, and ways of relating to the world were formed.</p>
<h2>Why We Return to Childhood Homes in Dreams</h2>
<ul><li><strong>Pattern recognition</strong>: Current life situations are activating patterns formed in that environment</li><li><strong>Unresolved material</strong>: Experiences, dynamics, or emotions from that time that haven't been fully integrated</li><li><strong>Accessing early wisdom</strong>: Your early self knew things your adult self has forgotten</li><li><strong>Identity review</strong>: Major life transitions often trigger this dream as the psyche reassesses foundational identity</li></ul>
<h2>State of the House</h2>
<h3>House in Good Condition</h3>
<p>Solid foundations, positive early experiences to draw from. May suggest it's time to reconnect with core values or gifts that were present in your earliest self.</p>
<h3>House Decaying or Damaged</h3>
<p>Foundational wounds or painful early experiences that still affect current patterns. The psyche is ready to address this material.</p>
<h3>Discovering Unknown Rooms</h3>
<p>One of the most powerful house dream variations — finding rooms you didn't know existed suggests undiscovered aspects of your own psychology, abilities, or history that are ready to be integrated.</p>
<h2>What to Do With This Dream</h2>
<p>Ask yourself: what was happening in that home that is happening again now in different form? What does your childhood self know that your current self has forgotten? What did you need then that you can provide for yourself now?</p></article>`
  },
  {
    slug: "dream-about-missing-flight-train",
    title: "Dream About Missing a Flight or Train — Opportunity, Timing & Transition Anxiety",
    category: "dream",
    published_at: new Date().toISOString(),
    content: `<article><h1>Dream About Missing a Flight or Train — Opportunity, Timing & Transition Anxiety</h1>
<p>The panic of rushing to catch transport you're about to miss is one of the most classically anxious dream scenarios. Understanding why this dream recurs can reveal important information about how you relate to opportunity, timing, and life transitions.</p>
<h2>What Missed Transport Symbolizes</h2>
<ul><li><strong>Fear of missed opportunities</strong>: Anxiety that a window of opportunity has closed or is closing in waking life</li><li><strong>Transition anxiety</strong>: Life changes (new job, relationship, moving) triggering underlying fear of not being ready</li><li><strong>Feeling behind schedule</strong>: Cultural/internal pressure that you're not where you "should" be at this life stage</li><li><strong>Poor time management creating stress</strong>: Sometimes quite literally reflecting real-life scheduling overwhelm</li></ul>
<h2>Key Variations</h2>
<h3>You Miss It But Another Comes</h3>
<p>Reassuring message: this particular opportunity may not have been right, and another aligned one is coming. Trust the timing.</p>
<h3>You Make It Just in Time</h3>
<p>Despite the anxiety of the journey, you arrive. This often reflects that while current life feels chaotic and rushed, you are in fact meeting your commitments and reaching your goals.</p>
<h3>You Can't Find the Platform/Gate</h3>
<p>Direction confusion — not clear about where you're going or how to get there. May indicate a need to clarify your actual goals before focusing on speed.</p>
<h2>The Deeper Question</h2>
<p>Recurring missed-transport dreams often reflect a deeper relationship with time, timing, and worthiness of opportunity. Ask: do you genuinely believe you deserve to catch the train, or is part of you ensuring you always arrive too late?</p></article>`
  },
  {
    slug: "dream-about-being-late-exam-unprepared",
    title: "Dream About Being Late for an Exam Unprepared — Performance Anxiety & Hidden Meaning",
    category: "dream",
    published_at: new Date().toISOString(),
    content: `<article><h1>Dream About Being Late for an Exam Unprepared — Performance Anxiety & Hidden Meaning</h1>
<p>The exam dream is one of the most universal anxiety dreams in human experience — remarkably, people dream about exams for their school subjects years and decades after they've left school. Understanding this dream illuminates important patterns around performance, judgment, and adequacy.</p>
<h2>Why Exam Dreams Persist After School</h2>
<p>The exam is a symbol, not a literal memory. It represents:</p>
<ul><li><strong>Any situation of being evaluated or judged</strong>: Job performance reviews, relationship milestones, social situations where you feel scrutinized</li><li><strong>Self-imposed standards of adequacy</strong>: The internal examiner who is always testing whether you're "good enough"</li><li><strong>A specific challenge you feel unprepared for</strong>: Current waking life has a "test" you don't feel ready to face</li></ul>
<h2>Common Variations</h2>
<h3>Can't Find the Exam Room</h3>
<p>Feeling lost in a high-pressure situation; unsure of where to direct your efforts.</p>
<h3>Forgot to Study</h3>
<p>Impostor syndrome — fear that your qualifications or preparation don't match what's expected of you.</p>
<h3>Pencil Won't Write / Can't Read Questions</h3>
<p>Communication breakdown anxiety — fear of not being able to express yourself clearly when it matters most.</p>
<h3>You Pass Despite Everything</h3>
<p>Reassuring message: even when feeling most unprepared, you're more capable than your anxiety suggests.</p>
<h2>Who Gets These Dreams?</h2>
<p>High achievers, perfectionists, and people in times of major life evaluation (career changes, relationship milestones) are most prone to exam anxiety dreams. The dream reflects the inner examiner — not external reality.</p>
<h2>Transforming Exam Anxiety</h2>
<p>Ask: what is currently "testing" you? And what would it mean to you to fail vs. pass? The answers reveal the actual source of the recurring dream.</p></article>`
  },
  {
    slug: "dream-about-pregnancy-not-pregnant",
    title: "Dreaming of Pregnancy When Not Pregnant — New Beginnings, Creative Birth & Growth",
    category: "dream",
    published_at: new Date().toISOString(),
    content: `<article><h1>Dreaming of Pregnancy When Not Pregnant — New Beginnings, Creative Birth & Growth</h1>
<p>Dreams of pregnancy when you're not pregnant (and possibly not planning to be) are extremely common across genders. The symbolism of pregnancy in dreams is rich and rarely literal — it almost always speaks to something being gestated in the psyche or life.</p>
<h2>What Pregnancy Symbolizes in Dreams</h2>
<ul><li><strong>Creative projects in development</strong>: Something new is growing within you — an idea, project, or direction that isn't yet ready to be born</li><li><strong>Personal transformation</strong>: A new version of yourself is developing, requiring the same patience and care as a pregnancy</li><li><strong>Potential waiting to be realized</strong>: Gifts, abilities, or possibilities that exist but haven't yet manifested</li><li><strong>New relationship or phase</strong>: A major relationship or life chapter that's in its early "growing" stage</li></ul>
<h2>Emotional Tone Matters</h2>
<h3>Joyful Pregnancy Dream</h3>
<p>Welcoming what's growing — excitement about a new direction, creative project, or personal evolution. Positive energy around what's developing.</p>
<h3>Anxious or Unwanted Pregnancy Dream</h3>
<p>Ambivalence or resistance about something new that's demanding your attention. A change or development that feels overwhelming or ill-timed.</p>
<h3>Surprise Discovery of Pregnancy</h3>
<p>Becoming aware of something that's been growing without your conscious attention. Often signals that a project, relationship, or personal quality has developed further than you realized.</p>
<h2>For Men</h2>
<p>Pregnancy dreams are just as common and meaningful for men — representing creative projects, major life initiatives, or the development of a new aspect of their identity.</p>
<h2>What's Gestating in Your Life Right Now?</h2>
<p>This is the central question the dream invites: what is being created, what needs patient tending, and what is not yet ready to be born into the world?</p></article>`
  },
  {
    slug: "dream-about-someone-trying-to-kill-you",
    title: "Dream About Someone Trying to Kill You — Threat, Change & Shadow Integration",
    category: "dream",
    published_at: new Date().toISOString(),
    content: `<article><h1>Dream About Someone Trying to Kill You — Threat, Change & Shadow Integration</h1>
<p>Being chased or attacked with intent to kill is one of the most frightening dream scenarios. Yet these dreams almost never predict literal danger — they are the psyche's dramatic way of signaling something important about your internal landscape or life situation.</p>
<h2>Who Is Trying to Kill You?</h2>
<p>The identity of the pursuer significantly changes the meaning:</p>
<h3>A Stranger</h3>
<p>Often represents an unknown aspect of yourself — the "shadow" in Jungian terms. The parts of your personality you've suppressed are demanding acknowledgment. Running from an unknown attacker means running from yourself.</p>
<h3>Someone You Know</h3>
<p>Usually doesn't mean that person wishes you harm. More likely represents qualities of that person you resist in yourself, unresolved tension in that relationship, or a quality they embody that feels threatening to your current self-concept.</p>
<h3>Faceless or Shapeshifting</h3>
<p>Anxiety in its purest form — a diffuse threat that hasn't been identified. The dream may be reflecting general life stress that hasn't been given a specific source.</p>
<h2>Why "Killing" Specifically</h2>
<p>In dreams, death often symbolizes transformation. The part of you that "needs to die" is an old identity, belief, pattern, or phase of life that is ending. The pursuer may be the agent of necessary change.</p>
<h2>What If You Fight Back?</h2>
<p>Dreaming of successfully defending yourself or fighting back is considered a positive sign — your psyche has the resources to deal with whatever challenge or internal material is being signaled.</p>
<h2>Recurring Attack Dreams</h2>
<p>If this dream repeats, take it seriously as a signal of persistent stress, unacknowledged threat, or significant shadow material that needs conscious attention.</p></article>`
  }
];
let success = 0, fail = 0;
for (const post of posts) {
  const { error } = await supabase.from("mysticai_blog_posts").upsert(post, { onConflict: "slug" });
  if (error) { console.error(`FAIL [${post.slug}]:`, error.message); fail++; }
  else { console.log(`OK   [${post.slug}]`); success++; }
}
console.log(`\nDone: ${success} success, ${fail} fail`);
