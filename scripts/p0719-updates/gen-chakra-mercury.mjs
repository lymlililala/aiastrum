// ─── GROUP=chakra-mercury：7 篇脉轮 + 1 篇水逆文章增强 ────────────────────────
// 重复规避说明（已逐篇核对原文 h2/h3）：
//  - 7 篇脉轮原文均已有 "Signs of a Blocked ... Chakra" 小节 → 跳过任务规格中的
//    "Blocked {Chakra} Symptoms"（主题重复）。
//  - 7 篇脉轮原文均已有 affirmations 列表（root/sacral 内嵌于 How to Balance，
//    其余 5 篇为 H3 "Affirmations"）→ 跳过 "{Chakra} Affirmations"（主题重复）。
//  - "Signs Your {Chakra} Is Opening" 7 篇均无 → 全部新增。
//  - mercury 篇已有 "Mercury Retrograde 2026: Notes for Every Sign"（12 星座 ul）
//    → 跳过 "How Mercury Retrograde 2026 Affects Each Zodiac Sign"（主题重复）。
//  - mercury 篇已有 "The Three Phases of Every Retrograde" 解释 shadow 概念，但无
//    2026 具体阴影期日期表 → 新增 "Mercury Retrograde 2026 Shadow Periods Explained"，
//    以日期表为主，不重复概念解释。
//  - addKeywords 按任务规格完整给出：被跳过的小节主题原文已覆盖，关键词仍然属实。
import { writeFileSync } from "fs";

const arr = [
  {
    slug: "root-chakra-meaning",
    sectionsHtml: `<h2>Signs Your Root Chakra Is Opening</h2>
<p>Root chakra opening rarely arrives as a single dramatic moment. Because this center responds to consistency more than intensity, it tends to open the way a tense muscle releases — gradually, as your body gathers enough evidence that it is safe. The signs are often quiet ones, easy to miss precisely because they feel like things finally working the way they should.</p>
<ul>
<li><strong>You feel at home in your body.</strong> The vague sense of being floaty or disconnected fades; you notice your feet on the floor, your weight in the chair, and it feels good rather than foreign.</li>
<li><strong>Survival worries lose their grip.</strong> Money, housing, and health concerns stop running as background panic. You still handle them — you just handle them calmly instead of from dread.</li>
<li><strong>Routines become nourishing.</strong> Regular meals, steady sleep, and small daily rituals start to feel like support rather than boredom or restriction.</li>
<li><strong>You recover from stress faster.</strong> A startle, a bill, a hard conversation still registers, but you settle back to baseline in minutes or hours instead of days.</li>
<li><strong>Your body relaxes at a deeper level.</strong> Sleep comes more easily, your legs and lower back hold less tension, and rest actually feels restful.</li>
<li><strong>Your default assumption shifts to "I'll be okay."</strong> Trust replaces scanning for danger — a quiet, steady confidence that your needs will be met and that you belong here.</li>
</ul>
<p>If several of these sound familiar, your root work is taking hold. Keep going with whatever grounding practice got you here; the root chakra deepens with repetition, not novelty.</p>`,
    faqHtml: `<h3>How long does it take to open the root chakra?</h3>
<p>There is no fixed timeline, because the root chakra opens in proportion to how safe your body feels, and that builds through repetition. Most people notice small shifts — better sleep, less background anxiety — within a few weeks of consistent grounding practice, with deeper steadiness developing over months. Progress is rarely linear, so judge it by your overall trend rather than any single day.</p>
<h3>What does it feel like when the root chakra opens?</h3>
<p>Mostly, it feels like relief: a heavy, pleasant relaxation in the legs and lower body, a quieter mind around money and security, and a settled sense of belonging in your own life. Many people describe it simply as "finally exhaling." It is usually subtle rather than dramatic — the absence of constant low-grade fear more than a rush of energy.</p>`,
    addKeywords: ["root chakra blocked symptoms", "root chakra opening symptoms", "root chakra affirmations"],
  },
  {
    slug: "sacral-chakra-meaning",
    sectionsHtml: `<h2>Signs Your Sacral Chakra Is Opening</h2>
<p>The sacral chakra opens the way frozen water thaws — first a trickle, then a current. Because this center governs flow, its opening rarely feels like effort paying off; it feels like life getting easier to enjoy. You may not notice the shift until you catch yourself laughing more easily or finishing a creative session that used to feel like pulling teeth.</p>
<ul>
<li><strong>Creative ideas show up uninvited.</strong> You start projects without over-planning them, and the blank page stops being intimidating.</li>
<li><strong>Emotions move through you instead of sticking.</strong> You can feel sad, angry, or joyful fully, and then let the feeling pass without either numbing it or drowning in it.</li>
<li><strong>Pleasure stops triggering guilt.</strong> Rest, good food, touch, and fun start to feel like things you are allowed to have, not things you must earn.</li>
<li><strong>Playfulness returns.</strong> Spontaneity — dancing in the kitchen, saying yes to something unplanned — feels natural again rather than frivolous.</li>
<li><strong>Intimacy feels safer.</strong> You can be close to people, physically and emotionally, without either shutting down or losing yourself in them.</li>
<li><strong>Change excites you more than it scares you.</strong> Like water finding its way around a rock, you adapt to new circumstances with curiosity instead of bracing against them.</li>
</ul>
<p>Sacral opening often comes in waves, with fluid days and stuck days alternating. That rhythm is normal for a water chakra — the goal is not permanent flow but an ever-easier return to it.</p>`,
    faqHtml: `<h3>What does it feel like when the sacral chakra opens?</h3>
<p>People often describe a warm, loose feeling in the lower belly and hips, along with a noticeable lift in mood and creative energy. Emotions that used to feel stuck begin to move — sometimes you cry or laugh more easily for a while as old feelings finally release. The overall signature is enjoyment: life starts to feel pleasurable again rather than flat.</p>
<h3>How long does sacral chakra healing take?</h3>
<p>It depends on how long the flow has been blocked and how regularly you practice. Gentle, consistent work — hip-opening yoga, creative play, allowing pleasure without guilt — usually brings noticeable softening within a few weeks, with deeper changes unfolding over months. Because the sacral is a water chakra, expect progress to come in waves rather than a straight line; that ebb and flow is part of the healing, not a failure of it.</p>`,
    addKeywords: ["sacral chakra blocked symptoms", "sacral chakra opening symptoms", "sacral chakra affirmations"],
  },
  {
    slug: "solar-plexus-chakra-meaning",
    sectionsHtml: `<h2>Signs Your Solar Plexus Chakra Is Opening</h2>
<p>Manipura opens the way a fire catches — not all at once, but in a series of small ignitions that eventually sustain themselves. Because this chakra governs will and self-trust, its opening shows up less as a feeling and more as a change in how you act: you simply start doing the things self-doubt used to talk you out of.</p>
<ul>
<li><strong>Decisions come faster.</strong> You weigh options, choose, and move on — the endless second-guessing and polling everyone you know quietly falls away.</li>
<li><strong>Boundaries feel natural.</strong> Saying "no" stops requiring a rehearsed speech. You state your limits plainly and without the old wave of guilt.</li>
<li><strong>Your inner talk turns encouraging.</strong> The harsh critic gets quieter, replaced by a steadier voice that expects you to handle things.</li>
<li><strong>Motivation returns as warmth, not pressure.</strong> You feel a genuine "I want to" rather than a driven "I have to prove myself."</li>
<li><strong>You take up space comfortably.</strong> Speaking first, applying for the role, sharing your opinion in a group — visibility stops feeling dangerous.</li>
<li><strong>You finish what you start.</strong> Follow-through, the signature of healthy fire, becomes your default rather than your struggle.</li>
</ul>
<p>One reliable marker: people around you may comment that you seem different — calmer, more decisive — before you fully notice it yourself. That is Manipura settling into balance from the inside out.</p>`,
    faqHtml: `<h3>What happens when the solar plexus chakra opens?</h3>
<p>Confidence stops depending on external validation. You make decisions more easily, hold boundaries without over-explaining, and feel a steady warmth of motivation in place of anxiety or the need to control. Physically, many people notice easier digestion and less tension in the upper abdomen, the seat of this chakra. The overall effect is quiet capability rather than loud bravado.</p>
<h3>How long does it take to balance the solar plexus chakra?</h3>
<p>Because Manipura is built through repeated acts of self-trust, think in terms of months of small, consistent practice rather than a single breakthrough. Each time you make a decision and stand by it, hold a boundary, or finish something you started, you feed the fire. Most people notice meaningful change within a few months of combining these real-world actions with practices like core-focused yoga, breathwork, and confidence affirmations.</p>`,
    addKeywords: ["solar plexus chakra blocked symptoms", "solar plexus chakra opening symptoms", "solar plexus chakra affirmations"],
  },
  {
    slug: "heart-chakra-meaning",
    sectionsHtml: `<h2>Signs Your Heart Chakra Is Opening</h2>
<p>Anahata opens gently, and often unevenly — a softening here, a release there. Because the heart protects itself after hurt, its opening can feel tender before it feels good; old grief sometimes moves through on its way out. That tenderness is not a step backward. It is the feeling of a guarded place learning it can relax.</p>
<ul>
<li><strong>Old resentments loosen.</strong> Grudges you carried for years start to feel heavy rather than satisfying, and setting them down feels like relief rather than defeat.</li>
<li><strong>Grief surfaces and then moves.</strong> You may cry more easily for a stretch — at films, at memories, at kindness. This is stored emotion releasing, not new damage.</li>
<li><strong>Warmth extends beyond your inner circle.</strong> You notice spontaneous goodwill toward strangers, acquaintances, even people who once annoyed you.</li>
<li><strong>Self-compassion replaces self-criticism.</strong> When you make a mistake, your first response is understanding rather than an attack.</li>
<li><strong>Your chest literally feels more open.</strong> Breathing deepens, shoulders drop back, and the armored posture of a guarded heart softens.</li>
<li><strong>Gratitude shows up unforced.</strong> Appreciation arrives on its own — for small kindnesses, for ordinary days — without you having to practice it.</li>
</ul>
<p>Heart opening tends to come in layers, and each layer can stir feeling before it settles. Move at the pace of kindness toward yourself; the heart opens to safety, not to pressure.</p>`,
    faqHtml: `<h3>What does it feel like when the heart chakra opens?</h3>
<p>It often begins as tenderness — feeling more moved, more touched, sometimes tearful without a clear reason — followed by a growing warmth and spaciousness in the chest. Connection starts to feel easier: you forgive faster, judge less, and feel genuinely glad about other people's happiness. Many describe the end state as feeling "lighter," as if a weight they had stopped noticing was finally set down.</p>
<h3>Can opening the heart chakra bring up sadness?</h3>
<p>Yes, and it is more common than most guides admit. A heart that has been guarded often holds stored grief, and as the defenses relax, that grief can surface before the warmth does. Treat it as release rather than regression: rest, breathe deeply, and be as gentle with yourself as you would be with a friend. If the sadness feels overwhelming or persistent, working with a therapist alongside your spiritual practice is a wise combination, not a contradiction.</p>`,
    addKeywords: ["heart chakra blocked symptoms", "heart chakra opening symptoms", "heart chakra affirmations"],
  },
  {
    slug: "throat-chakra-meaning",
    sectionsHtml: `<h2>Signs Your Throat Chakra Is Opening</h2>
<p>Vishuddha opens through use — every honest sentence clears the channel a little further. Because this chakra bridges inner truth and outer expression, its opening is most visible in the gap between the two: as it closes, what you say starts matching what you actually feel, often before you have consciously decided to be braver.</p>
<ul>
<li><strong>You speak up without over-rehearsing.</strong> The mental drafting and re-drafting of what you "should" say gives way to simply saying the true thing.</li>
<li><strong>"No" comes out clean.</strong> Refusals stop arriving wrapped in three excuses and an apology; a simple, kind no feels complete on its own.</li>
<li><strong>You listen as well as you speak.</strong> A balanced throat chakra is a two-way channel — you find yourself actually hearing people instead of waiting for your turn.</li>
<li><strong>Your words match your insides.</strong> The exhausting gap between "I'm fine" and how you really are begins to close, at least with the people who matter.</li>
<li><strong>Creative expression flows.</strong> Writing, singing, or any form of voice finds you again; you feel the pull to make and share rather than to hide.</li>
<li><strong>Physical tension eases.</strong> The tight jaw, the cleared throat, the neck stiffness that flared before difficult conversations begin to quiet down.</li>
</ul>
<p>Expect some wobble at first — a conversation where you speak honestly and your voice shakes. That shaking is not failure; it is a channel clearing after long disuse. It steadies with practice.</p>`,
    faqHtml: `<h3>What happens when the throat chakra opens?</h3>
<p>Communication stops feeling like a performance. You express thoughts and feelings directly and kindly, say no without elaborate justification, and listen more fully because you are no longer bracing for your turn to defend yourself. Many people also notice a surge of creative expression — writing, singing, or speaking up in groups starts to feel natural rather than risky. Physically, chronic tension in the throat, jaw, and neck often eases.</p>
<h3>Why do I feel a lump in my throat during chakra work?</h3>
<p>A lump or tightness in the throat during meditation, chanting, or emotional conversations usually signals held-back expression — words or feelings that were swallowed instead of spoken, now loosening as the chakra opens. Humming, gentle neck rolls, and slow exhales help it move. One practical note: if a physical lump or throat discomfort persists outside of practice, have a doctor look at it; chakra work complements medical care rather than replacing it.</p>`,
    addKeywords: ["throat chakra blocked symptoms", "throat chakra opening symptoms", "throat chakra affirmations"],
  },
  {
    slug: "third-eye-chakra-meaning",
    sectionsHtml: `<h2>Signs Your Third Eye Chakra Is Opening</h2>
<p>Ajna opens quietly. Despite its mystical reputation, third eye opening rarely looks like visions or fireworks — far more often it looks like a fog lifting. Perception sharpens, intuition gets easier to hear, and the constant mental static that drowned out subtler knowing begins to settle.</p>
<ul>
<li><strong>Gut feelings arrive clear and calm.</strong> Intuitive hits stop feeling like anxiety in disguise; they come with a quiet steadiness you learn to recognize and trust.</li>
<li><strong>Your dreams turn vivid and meaningful.</strong> You remember more of them, and they start to feel like information rather than noise — worth writing down.</li>
<li><strong>Decisions come from a deeper place.</strong> Instead of pure pros-and-cons analysis, you sense which option is right, and the analysis confirms it afterward.</li>
<li><strong>You see patterns and the bigger picture.</strong> Situations that used to feel random start revealing their shape; you grasp the whole before the parts.</li>
<li><strong>Imagination returns.</strong> Visualization gets easier, daydreams get richer, and the creative spark that felt dulled by cynicism rekindles.</li>
<li><strong>Mental fog thins.</strong> Concentration improves, indecision eases, and the feeling of being "stuck" gives way to a sense of direction.</li>
</ul>
<p>The healthiest sign of all is balance: intuition and logic working together rather than competing. An opening third eye does not ask you to abandon reason — it gives reason a wiser partner.</p>`,
    faqHtml: `<h3>What happens when the third eye chakra opens?</h3>
<p>Perception sharpens on two levels at once: intuition becomes clearer and easier to trust, while ordinary thinking gets less foggy and more decisive. Many people report more vivid dreams, a stronger sense of direction, and the ability to grasp the bigger picture of a situation quickly. Contrary to the dramatic portrayals, a healthy opening mostly feels like clarity — the mental equivalent of a cleaned window.</p>
<h3>Can the third eye open too quickly?</h3>
<p>It can feel that way if you push intensive meditation or visualization practices without staying grounded — signs include spaciness, trouble focusing on daily tasks, headaches around the brow, or feeling overstimulated by your own imagination. The remedy is not to stop but to balance: spend more time on grounding practices like walking, eating well, and root-chakra work, so insight has a stable base to land on. Intuition serves you best when the rest of you is steady.</p>`,
    addKeywords: ["third eye chakra blocked symptoms", "third eye chakra opening symptoms", "third eye chakra affirmations"],
  },
  {
    slug: "crown-chakra-meaning",
    sectionsHtml: `<h2>Signs Your Crown Chakra Is Opening</h2>
<p>Sahasrara opens from the top down, and its signs are the subtlest of all the chakras — easy to overlook precisely because they feel like nothing special is happening. There is usually no lightning bolt. Instead, a quiet shift in orientation: life stops feeling like something happening to you alone and starts feeling like something you are part of.</p>
<ul>
<li><strong>Moments of uncaused peace.</strong> A stillness or contentment arrives for no particular reason — washing dishes, watching the sky — and it does not need anything to change.</li>
<li><strong>A felt connection to something larger.</strong> Whether you call it spirit, nature, or simply life, the sense of being part of it becomes an experience rather than an idea.</li>
<li><strong>Synchronicities catch your attention.</strong> Meaningful coincidences register less as random noise and more as a conversation worth noticing.</li>
<li><strong>Uncertainty frightens you less.</strong> Not knowing what comes next starts to feel like openness rather than danger; trust replaces the need for guarantees.</li>
<li><strong>Gratitude and compassion widen.</strong> Appreciation extends past your own life toward people you will never meet and things you did not earn.</li>
<li><strong>Stillness comes easier in meditation.</strong> The mental chatter settles faster, and simply being — without doing or achieving — stops feeling like wasted time.</li>
</ul>
<p>One grounding note: the crown opens most sustainably on top of stable lower chakras. If your crown practice is flourishing but daily life feels neglected, tend the roots — the view from the top is clearest when the base is solid.</p>`,
    faqHtml: `<h3>What does it feel like when the crown chakra opens?</h3>
<p>Most often it feels like quiet: a deep, uncomplicated peace, a sense of connection to something larger than yourself, and trust in life that does not depend on circumstances going your way. Some people experience it as gentle awe or a feeling of light and spaciousness above the head. It is typically subtle rather than ecstatic — less a peak experience than a new, calmer baseline.</p>
<h3>Can you focus too much on the crown chakra?</h3>
<p>Yes. Chasing higher-consciousness experiences while neglecting the body, relationships, or daily responsibilities is sometimes called spiritual bypassing, and it is a sign of imbalance rather than progress. The crown is meant to crown a stable system: grounding practices, good sleep, honest work, and human connection are what let its openness integrate into a life instead of floating above one.</p>`,
    addKeywords: ["crown chakra blocked symptoms", "crown chakra opening symptoms", "crown chakra affirmations"],
  },
  {
    slug: "mercury-retrograde-2026-dates-effects",
    sectionsHtml: `<h2>Mercury Retrograde 2026 Shadow Periods Explained</h2>
<p>The official retrograde lasts about three weeks, but astrologers work with a longer arc: the pre-shadow begins roughly two weeks before Mercury stations retrograde (when it first crosses the degree it will later backtrack to), and the post-shadow runs about two weeks after it stations direct (while it retraces those same degrees). Treat the full six-to-seven-week window as the active zone, with the official retrograde as its peak. Here is how that arc maps onto 2026's three retrogrades:</p>
<table>
<tr><th>Retrograde</th><th>Sign</th><th>Pre-shadow begins (approx.)</th><th>Retrograde proper</th><th>Post-shadow ends (approx.)</th></tr>
<tr><td>First</td><td>Pisces</td><td>Around February 12</td><td>Feb 26 – Mar 20</td><td>Around April 3</td></tr>
<tr><td>Second</td><td>Cancer</td><td>Around June 15</td><td>Jun 29 – Jul 23</td><td>Around August 6</td></tr>
<tr><td>Third</td><td>Scorpio</td><td>Around October 10</td><td>Oct 24 – Nov 13</td><td>Around November 27</td></tr>
</table>
<p>Shadow dates are approximations for the same reason station dates are: exact degrees and timing shift slightly with the ephemeris and time zone, so confirm against the current year's astrological calendar for anything critical.</p>
<p>Practically, the two shadows call for different handling. The <strong>pre-shadow</strong> is your early-warning window: the themes of the coming retrograde start surfacing in small ways, so it is the right time to back up devices, confirm bookings, and hold off on signings you can postpone — the issues that will dominate the retrograde usually announce themselves here first. The <strong>post-shadow</strong> is the resolution window: stalled matters move again, often with new information that changes the picture. The classic rule of thumb is to wait until the post-shadow ends before treating any retrograde-era decision, purchase, or agreement as final.</p>`,
    faqHtml: `<h3>Which Mercury retrograde of 2026 will feel the strongest?</h3>
<p>Astrologically, the one that touches your own chart — generally the retrograde falling in your sun or rising sign, plus the two signs it squares and opposes. Gemini and Virgo tend to notice all three because Mercury is their ruling planet. Of the three 2026 rounds, many astrologers expect the Scorpio retrograde in autumn to dig the deepest emotionally, since Scorpio rules shared money, trust, and intimacy — but "strongest" is ultimately personal, not universal.</p>
<h3>Should I avoid traveling during Mercury retrograde 2026?</h3>
<p>No — avoiding life for three weeks is neither practical nor what the tradition advises. Travel during retrograde simply rewards extra margin: confirm reservations the day before, leave buffer time between connections, double-check dates and terminal details, and keep plans flexible enough to absorb a delay. Many people travel during every retrograde without incident; the ones who struggle are usually those who booked a tight, zero-slack itinerary.</p>`,
    addKeywords: ["mercury retrograde 2026 shadow period", "mercury retrograde 2026 zodiac effects"],
  },
];

writeFileSync(new URL("./chakra-mercury.json", import.meta.url), JSON.stringify(arr, null, 1));
console.log(`wrote ${arr.length} records`);
