/**
 * 第三批博客文章种子脚本（批次B：文章7-12）
 * 运行方式：node scripts/seed-blog-batch3.mjs
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tixgzezefjjsyuzgdhcd.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const posts = [
  {
    slug: "2026-cancer-annual-horoscope",
    category: "horoscope",
    title: "2026年巨蟹座全年运势：木星入驻，人生转折年，事业爱情双线开花",
    title_en: "Cancer 2026 Annual Horoscope: Jupiter Enters Your Sign — A Year of Real Transformation",
    description: "2026年是巨蟹座的木星年。5月木星正式入驻巨蟹，这是12年一遇的扩展机遇。本文详解木星年对巨蟹事业、爱情、财运的具体影响，以及如何最大化利用这一千载难逢的窗口期。",
    keywords: ["2026巨蟹座运势","巨蟹座2026全年","巨蟹座木星2026","巨蟹座2026事业爱情","Cancer 2026 horoscope","木星巨蟹座","2026年巨蟹座"],
    published_at: "2026-06-24",
    reading_time: 13,
    cta_href: "/horoscope",
    cta_label: "🌌 查看巨蟹座本周详细运势",
    cta_label_en: "Check Your Cancer Weekly Horoscope",
    content: `<h2>2026年巨蟹座：最重要的一年</h2>
<p>如果你是巨蟹座，2026年是你近几年中最值得认真对待的一年——不是因为一切都会突然变好，而是因为宇宙给了你一扇少见的大门。</p>
<p>核心天象：<strong>木星于2026年5月进入巨蟹座</strong>，这是木星12年才造访一次的机会。木星代表扩张、幸运、成长与祝福，当它进入你的本命星座，它会在你生命中最重要的领域——自我表达、个人发展、整体运势——点燃一股扩张能量，持续至2027年中。</p>
<h2>木星年意味着什么？</h2>
<p>木星年不是"躺赢年"，它是<strong>机会密度最高的年份</strong>：</p>
<ul>
<li>你的个人魅力和吸引力处于峰值，人际关系质量会提升</li>
<li>你在2025年甚至更早种下的种子，有更大概率在这一年结果</li>
<li>新的机会会来，但需要你主动配合——木星只是放大，不会凭空创造</li>
<li>你对自己的信心会增强，这种内在确定感本身就会吸引更好的现实</li>
</ul>
<h2>事业运势：5月后全面提速</h2>
<p>1-4月（木星尚在金牛座，你的第十一宫），事业运的重点在于人脉与团队。这段时间特别适合扩展社交圈、参与行业活动、强化与团队成员的协作关系。</p>
<p>5月木星入巨蟹后，局势骤变。你的存在感提升，领导力变得自然而然，晋升、重要项目的主导权、新合作可能同时出现。</p>
<ul>
<li><strong>最适合主动争取机会的时段：</strong>5月下旬、7月、10月</li>
<li><strong>适合做战略规划的时段：</strong>1-4月、9月</li>
<li><strong>职场贵人特征：</strong>比你年长、有实际资源的人；或通过教育、出版、海外业务认识的人</li>
</ul>
<h2>爱情运势：单身者好消息，伴侣们需要深度对话</h2>
<p>木星年对感情的影响是双刃的：它既放大爱的美好，也放大关系中原本存在的问题。</p>
<ul>
<li><strong>单身巨蟹：</strong>2026年相遇的对象可能比以往更符合你真正想要的类型。5月到年底是全年感情运最旺的时段，不要因为过度谨慎而错过主动表达的时机。</li>
<li><strong>恋爱中的巨蟹：</strong>建议在年中（6-8月）与伴侣进行一次认真的"关系校准"对话。</li>
<li><strong>考虑结婚的巨蟹：</strong>2026年下半年（尤其是9-11月）是做这个决定的好时机。</li>
</ul>
<h2>财运分析：增收机会多，但需防膨胀</h2>
<ul>
<li><strong>收入端：</strong>主业有涨薪或晋升的可能，副业或第二收入来源值得认真发展</li>
<li><strong>消费端：</strong>木星带来"生活要变好"的心理，容易在住房、体验、自我提升上大幅增加开支——量力而行</li>
<li><strong>投资端：</strong>不建议激进操作，木星年容易过度乐观，稳健配置优于追高</li>
</ul>
<h2>健康提示</h2>
<p>巨蟹守护消化系统和情绪健康。2026年高强度的发展节奏下，情绪积压容易以身体症状显现。全年最重要的健康习惯是：<strong>给自己留足情绪消化的空间</strong>——通过倾诉、写作、运动或冥想。</p>
<h2>巨蟹座2026年关键词</h2>
<p><strong>扩张 · 吸引 · 真实 · 把握窗口</strong></p>
<p>木星年来一次，要12年才会再来。2026年，做那件你一直说"等时机成熟"的事情——时机已经来了。</p>`
  },
  {
    slug: "2026-scorpio-annual-horoscope",
    category: "horoscope",
    title: "2026年天蝎座全年运势：蜕变完成，深度收获，感情终于开窍",
    title_en: "Scorpio 2026 Annual Horoscope: After the Transformation, Now Comes the Reward",
    description: "2026年天蝎座将经历蜕变收尾期。过去几年持续的深度重建已接近完成，2026年是收获期。事业上迎来新阶段，感情终于解冻，财运实质性改善。全年逐月重点完整解析。",
    keywords: ["2026天蝎座运势","天蝎座2026全年","天蝎座2026事业爱情","Scorpio 2026 horoscope","2026年天蝎座","天蝎座2026财运"],
    published_at: "2026-06-25",
    reading_time: 12,
    cta_href: "/horoscope",
    cta_label: "🌌 查看天蝎座本周详细运势",
    cta_label_en: "Check Your Scorpio Weekly Horoscope",
    content: `<h2>2026年天蝎座：收获蜕变成果的一年</h2>
<p>天蝎座天生与深度转化有关——你不是那种在表面滑行的星座，你活在更深的水层里。过去几年（尤其是2023-2025年），你可能经历了某种程度的内部重建：对关系、身份认同、职业方向或某段创伤的深度处理。</p>
<p>2026年，那些曾经让你痛苦但不得不面对的事情，终于开始显现出它们的价值。这是一个<strong>蜕变完成后的收获年</strong>——不是无中生有的好运，而是你已经付出的代价终于被宇宙认账。</p>
<p>关键天象：土星在双鱼（天蝎的第五宫）给感情、创意与自我表达带来"可以认真了"的成熟信号；木星在金牛（天蝎对面的星座，第七宫），直接激活合作、关系与公开承诺的领域。</p>
<h2>事业运势：合作与承认，是今年的主旋律</h2>
<p>木星在你的第七宫（合作与伙伴关系），意味着2026年最大的事业机遇往往来自<strong>他人</strong>——合作伙伴、客户、导师、团队——而非单打独斗。</p>
<ul>
<li>与他人的合作项目今年特别有潜力，不要拒绝共同开发的机会</li>
<li>你的专业声誉开始扩散，外部认可与口碑式增长是今年的特点</li>
<li>如果你一直在某个领域深耕，2026年可能迎来重要的"被看见"时刻</li>
</ul>
<ul>
<li><strong>最佳行动月份：</strong>3月、6月、10月</li>
<li><strong>需要特别谨慎的月份：</strong>4月（冲动决策）、8月（合同与协议要仔细审读）</li>
</ul>
<h2>爱情运势：感情的"解冻"年</h2>
<p>如果你过去几年在感情上有所封闭——无论是主动的还是被迫的——2026年可能是一个自然解冻的时机。</p>
<ul>
<li><strong>单身天蝎：</strong>木星在第七宫是感情运极为活跃的信号。今年相遇的人，深度与你匹配的可能性远高于往年。不要在还没了解一个人之前就先筑起防御。</li>
<li><strong>恋爱中的天蝎：</strong>土星在第五宫要求感情走向更真实的深度。那些表面看似稳定但缺乏真正连接的关系，今年会遭遇考验。而真正有基础的感情，会在今年变得更加笃定。</li>
<li><strong>分手/离婚后的天蝎：</strong>2026年是真正走出的时机——不是假装走出，而是你内心的某个部分终于准备好了。</li>
</ul>
<h2>财运分析：深层资产的浮现</h2>
<p>天蝎与第八宫（深层资产、遗产、投资、合并）天然相关。2026年财运的特点是<strong>非常规收入的出现</strong>——可能是分红、遗产、共同资产的重新分配、投资回报，或来自合作的收益。</p>
<ul>
<li>主业收入相对平稳，重大惊喜来自非主业渠道</li>
<li>今年是清理不必要财务负担（债务、无效订阅、过时投资）的好时机</li>
<li>8-10月财务运势最旺，适合进行重要的财务决策</li>
</ul>
<h2>健康提示</h2>
<p>天蝎守护生殖系统和深层排毒机制。2026年特别适合进行一次全面的身体检查，以及处理长期被压抑的情绪——两者对天蝎来说往往是同一回事。</p>
<h2>天蝎座2026年关键词</h2>
<p><strong>收获 · 联结 · 承认 · 深度扎根</strong></p>
<p>你所有的深水功课，在2026年终于开始显现它的意义。不要急着定义这一年会带来什么——让它展开，你会惊讶于宇宙的记账之准。</p>`
  },
  {
    slug: "what-is-a-birth-chart-explained",
    category: "astro",
    title: "What Is a Birth Chart? A Beginner's Plain-English Guide to Your Natal Chart",
    title_en: "What Is a Birth Chart? A Beginner's Plain-English Guide to Your Natal Chart",
    description: "A birth chart is a snapshot of the sky at the exact moment you were born. This guide explains what it is, how to read it, what the houses mean, and why your Sun sign is just the beginning of what astrology can tell you.",
    keywords: ["what is a birth chart","birth chart explained","natal chart meaning","how to read a birth chart","birth chart houses","astrology birth chart","natal chart beginner"],
    published_at: "2026-06-26",
    reading_time: 12,
    cta_href: "/astro",
    cta_label: "✦ Generate Your Free Birth Chart Now",
    cta_label_en: "Generate Your Free Birth Chart Now",
    content: `<h2>What Is a Birth Chart, Exactly?</h2>
<p>A birth chart — also called a natal chart — is a circular map of the sky at the exact moment and location you were born. It shows where every planet in our solar system was positioned relative to Earth, and which constellation (zodiac sign) each planet occupied at that precise moment.</p>
<p>Think of it as a cosmic photograph taken the instant you entered the world. Astrologers believe that this snapshot reflects a kind of blueprint — not a fixed destiny, but a set of tendencies, strengths, challenges, and patterns that characterize how you experience life.</p>
<p>Your Sun sign (the one you look up in horoscopes) is just one of many elements in this chart. Most people find that understanding their full birth chart feels significantly more accurate and nuanced than Sun sign astrology alone.</p>
<h2>What You Need to Generate Your Birth Chart</h2>
<p>To calculate an accurate birth chart, you need three pieces of information:</p>
<ul>
<li><strong>Date of birth</strong> — day, month, and year</li>
<li><strong>Time of birth</strong> — as precise as possible (found on your birth certificate)</li>
<li><strong>Place of birth</strong> — city and country</li>
</ul>
<p>The time of birth matters significantly. It determines your Rising sign (Ascendant) and which houses the planets fall in — both of which are major factors in interpretation. If you don't know your birth time, you can still generate a partial chart, but certain elements will be uncertain.</p>
<h2>The Three Most Important Points in Any Birth Chart</h2>
<h3>1. Your Sun Sign</h3>
<p>The Sun represents your core identity — who you are at your most essential. It describes the self you're consciously developing throughout your life. Sun sign horoscopes capture only this one layer, which is why they can feel generic: everyone born in a 30-day window shares the same Sun sign, but almost everything else in their charts will differ.</p>
<h3>2. Your Moon Sign</h3>
<p>The Moon represents your emotional nature — how you feel, what you need for security, and who you are when your guard is down. Many people find their Moon sign describes their inner world more accurately than their Sun sign. Your Moon sign changes roughly every 2.5 days, making it far more individualized than your Sun sign.</p>
<h3>3. Your Rising Sign (Ascendant)</h3>
<p>The Rising sign is the zodiac sign that was rising on the eastern horizon at the moment of your birth. It describes your outer manner — the first impression you give, how others perceive you, and the lens through which you approach new experiences. It changes approximately every two hours, which is why birth time accuracy matters so much.</p>
<h2>The 12 Houses: Your Life's Stage</h2>
<p>The birth chart is divided into 12 sections called houses, each governing a different area of life. The sign on the cusp (beginning edge) of each house, and any planets inside it, describe how that life area plays out for you.</p>
<table>
<thead><tr><th>House</th><th>Life Area</th></tr></thead>
<tbody>
<tr><td>1st House</td><td>Self, appearance, first impressions</td></tr>
<tr><td>2nd House</td><td>Money, values, possessions</td></tr>
<tr><td>3rd House</td><td>Communication, siblings, short travel</td></tr>
<tr><td>4th House</td><td>Home, family, roots, private life</td></tr>
<tr><td>5th House</td><td>Creativity, romance, children, play</td></tr>
<tr><td>6th House</td><td>Daily routines, health, work habits</td></tr>
<tr><td>7th House</td><td>Partnerships, marriage, open enemies</td></tr>
<tr><td>8th House</td><td>Transformation, shared resources, depth</td></tr>
<tr><td>9th House</td><td>Philosophy, higher education, travel</td></tr>
<tr><td>10th House</td><td>Career, public reputation, achievement</td></tr>
<tr><td>11th House</td><td>Friends, groups, hopes, social causes</td></tr>
<tr><td>12th House</td><td>Hidden patterns, spirituality, solitude</td></tr>
</tbody>
</table>
<h2>Planets and What They Represent</h2>
<p>Each planet in astrology governs a specific part of life and psychological function:</p>
<ul>
<li><strong>Sun</strong> — Identity, ego, life purpose</li>
<li><strong>Moon</strong> — Emotions, instincts, needs</li>
<li><strong>Mercury</strong> — Thinking, communication, learning</li>
<li><strong>Venus</strong> — Love, beauty, values, attraction</li>
<li><strong>Mars</strong> — Drive, desire, anger, action</li>
<li><strong>Jupiter</strong> — Growth, luck, expansion, beliefs</li>
<li><strong>Saturn</strong> — Discipline, limits, lessons, maturity</li>
<li><strong>Uranus</strong> — Change, rebellion, innovation</li>
<li><strong>Neptune</strong> — Dreams, spirituality, illusion</li>
<li><strong>Pluto</strong> — Transformation, power, the unconscious</li>
</ul>
<h2>Aspects: How the Planets Talk to Each Other</h2>
<p>Beyond knowing where each planet is, astrologers look at the angles (aspects) between planets. These describe how the energies of different planets interact in your chart:</p>
<ul>
<li><strong>Conjunction (0°):</strong> Planets merge their energies — intensifying each other</li>
<li><strong>Trine (120°):</strong> Harmonious, easy flow between planetary energies</li>
<li><strong>Square (90°):</strong> Tension that creates growth through challenge</li>
<li><strong>Opposition (180°):</strong> Polarizing energies that need to be balanced</li>
<li><strong>Sextile (60°):</strong> Opportunity and collaboration between energies</li>
</ul>
<h2>Why Your Birth Chart Is Unique</h2>
<p>Even twins born minutes apart can have meaningfully different charts — because the rising sign changes every two hours and the house positions shift constantly. The specific combination of 10 planetary placements across 12 signs and 12 houses, plus the aspects between them, means your birth chart is effectively a one-of-a-kind configuration.</p>
<h2>How to Start Reading Your Own Chart</h2>
<p>A good approach for beginners:</p>
<ol>
<li>Generate your chart and identify your Sun, Moon, and Rising signs first</li>
<li>Note which houses hold multiple planets — those life areas tend to be more active or complex</li>
<li>Look at any stelliums (3+ planets in one sign or house) — these represent major themes</li>
<li>Read about your Moon sign and Rising sign alongside your Sun sign — many people find these more resonant</li>
</ol>
<p>Astrology is a language. Like any language, fluency takes time. But even basic literacy in your own chart gives you a remarkably useful framework for understanding yourself and your patterns.</p>`
  },
  {
    slug: "mercury-retrograde-survival-guide",
    category: "horoscope",
    title: "Mercury Retrograde Survival Guide: What to Avoid, What to Use It For",
    title_en: "Mercury Retrograde Survival Guide: What to Avoid, What to Use It For",
    description: "Mercury retrograde gets blamed for everything — but most of what people fear isn't quite right. This guide explains what actually happens during Mercury retrograde, what to genuinely avoid, and how to use this period constructively.",
    keywords: ["mercury retrograde","how to survive mercury retrograde","mercury retrograde what to avoid","mercury retrograde meaning","mercury retrograde 2026","what not to do mercury retrograde"],
    published_at: "2026-06-27",
    reading_time: 11,
    cta_href: "/horoscope",
    cta_label: "🌌 Check Current Planetary Positions",
    cta_label_en: "Check Current Planetary Positions",
    content: `<h2>What Is Mercury Retrograde, Actually?</h2>
<p>Mercury retrograde is one of the most talked-about astrological events — and one of the most misunderstood. Here's what's physically happening: Mercury isn't actually moving backward. No planet does. What "retrograde" describes is an optical illusion: from Earth's vantage point, Mercury appears to reverse direction in the sky because of the relative speeds and positions of Earth and Mercury in their orbits around the Sun.</p>
<p>Astronomically, it's the same phenomenon you experience when you're on a faster train passing a slower one — the slower train appears to move backward, even though it isn't.</p>
<p>In astrology, Mercury governs communication, technology, transportation, contracts, and the mind. When Mercury goes retrograde — approximately three times per year, for about three weeks each — these areas of life tend to become more prone to misunderstandings, delays, and the resurfacing of old situations.</p>
<h2>Mercury Retrograde 2026: Key Dates</h2>
<ul>
<li><strong>January 15 – February 4, 2026</strong> — Retrograde in Aquarius → Capricorn</li>
<li><strong>May 10 – June 3, 2026</strong> — Retrograde in Gemini → Taurus</li>
<li><strong>September 9 – October 1, 2026</strong> — Retrograde in Libra → Virgo</li>
</ul>
<p>Note: The "shadow period" — when Mercury slows down before and after the official retrograde — extends this influence by about two weeks on each end. Astrologers typically recommend caution during the shadow periods too.</p>
<h2>What Actually Goes Wrong During Mercury Retrograde</h2>
<p>Here's a more honest accounting of what tends to happen (vs. what gets blamed on Mercury retrograde unfairly):</p>
<p><strong>What genuinely increases in difficulty:</strong></p>
<ul>
<li>Contracts and agreements — details get missed, terms are misunderstood, parties have different recollections of what was agreed</li>
<li>Technology — software updates, device purchases, and major tech decisions tend to have more complications when initiated during this period</li>
<li>Travel — especially bookings, itineraries, and transportation connections</li>
<li>Communication — messages get misinterpreted more easily; important conversations feel harder to complete</li>
</ul>
<p><strong>What gets blamed on Mercury retrograde but often has other causes:</strong></p>
<ul>
<li>Relationship problems (usually pre-existing issues becoming more visible)</li>
<li>Career setbacks (timing and preparation matter more than Mercury)</li>
<li>General bad luck (confirmation bias is real)</li>
</ul>
<h2>What NOT to Do During Mercury Retrograde</h2>
<p>These aren't superstitions — they're practical advice based on where retrograde energy creates actual friction:</p>
<ul>
<li><strong>Sign important contracts</strong> — If possible, wait until after the retrograde. If you can't, read every line twice and have another person review it.</li>
<li><strong>Make major technology purchases</strong> — Laptops, phones, and cars bought during retrograde periods tend to have problems that emerge shortly after. This isn't magic; it's that you're more likely to rush or overlook details.</li>
<li><strong>Launch new projects or businesses</strong> — Mercury retrograde is a "re-" period (review, revise, research). Launches that begin now often require significant do-overs.</li>
<li><strong>Send important emails without careful re-reading</strong> — Autocorrect errors, wrong recipients, and ambiguous phrasing all seem to increase.</li>
<li><strong>Have crucial first conversations about relationship status</strong> — "What are we?" conversations during retrograde rarely resolve clearly. Wait if you can.</li>
</ul>
<h2>What Mercury Retrograde Is Actually Good For</h2>
<p>This is where most Mercury retrograde advice falls short: it's not only a period of warning. The "re-" energy of retrograde makes it genuinely excellent for:</p>
<ul>
<li><strong>Reconnecting</strong> — Old friends, former colleagues, ex-partners who resurface during retrograde often have something meaningful to offer this time</li>
<li><strong>Reviewing and revising</strong> — Go back to that project you paused, that manuscript you left unfinished, that plan you set aside</li>
<li><strong>Research and analysis</strong> — Deep reading, investigating, thinking through complex problems — Mercury retrograde supports inward mental work</li>
<li><strong>Renegotiating</strong> — Existing contracts and arrangements can actually be improved if you initiate with the explicit intent of revision</li>
<li><strong>Reflection</strong> — Journaling, therapy, looking back at patterns — this period naturally supports self-examination</li>
</ul>
<h2>How Each Zodiac Sign Experiences Mercury Retrograde</h2>
<p>The zodiac signs most directly affected depend on where the retrograde falls in their natal chart. As a general guide:</p>
<ul>
<li><strong>Gemini and Virgo</strong> (Mercury-ruled signs) tend to feel retrograde most acutely — communication glitches, mental scattered-ness, plans requiring revision</li>
<li><strong>Air signs (Gemini, Libra, Aquarius)</strong> experience stronger disruptions to social and intellectual life</li>
<li><strong>Mutable signs (Gemini, Virgo, Sagittarius, Pisces)</strong> often find the mental/communicative chaos more unsettling than fixed or cardinal signs</li>
</ul>
<h2>A Practical Mercury Retrograde Checklist</h2>
<ul>
<li>Back up important files and data before the retrograde begins</li>
<li>Confirm all travel plans and appointments — don't assume they're still as scheduled</li>
<li>Before sending important messages, reread them from the recipient's perspective</li>
<li>Add buffer time to all deadlines and meetings</li>
<li>Treat unexpected reconnections as potentially meaningful</li>
<li>If something needs to be signed, ask: can this wait three weeks?</li>
</ul>
<h2>The Bigger Picture</h2>
<p>Mercury retrograde is not a curse. It's a natural rhythm — a pause built into the cosmic calendar that invites reflection over forward momentum. Three weeks, three times a year: that's actually a reasonable amount of time to review, reassess, and reconnect before charging ahead again.</p>
<p>The people who navigate it best are not the ones who avoid all action, but the ones who know <em>which kind of action to take</em> — and which to wait on.</p>`
  },
  {
    slug: "tarot-yes-or-no-guide",
    category: "tarot",
    title: "Tarot Yes or No: The Most Reliable Method (With Full Card List)",
    title_en: "Tarot Yes or No: The Most Reliable Method (With Full Card List)",
    description: "Yes or no tarot readings can be useful or misleading depending on how you do them. This guide covers the most reliable method for yes/no tarot questions, plus a complete reference list of all 78 cards and their yes/no orientations.",
    keywords: ["tarot yes or no","yes or no tarot reading","tarot yes no cards","which tarot cards mean yes","tarot yes or no list","one card tarot reading"],
    published_at: "2026-06-28",
    reading_time: 12,
    cta_href: "/tarot",
    cta_label: "🔮 Try a One-Card AI Tarot Reading",
    cta_label_en: "Try a One-Card AI Tarot Reading",
    content: `<h2>Does Tarot Actually Work for Yes or No Questions?</h2>
<p>Yes and no readings are among the most popular uses of tarot — and among the most misused. Done well, a yes/no draw gives you a clear directional signal and often reveals the <em>reason</em> behind that direction. Done poorly, it becomes a way of asking the same question repeatedly until you get the answer you wanted.</p>
<p>The most important thing to understand about yes/no tarot: the cards don't give binary answers to complex situations. What they do is indicate the current energy around a question — which way the momentum is flowing, what underlying forces are active, and whether movement or stillness is called for right now.</p>
<h2>The Most Reliable Yes/No Method</h2>
<p>The simplest and most consistent approach:</p>
<ol>
<li><strong>Formulate your question carefully.</strong> "Should I do X?" works better than "Will X happen?" The cards reflect energy and direction, not predetermined outcomes.</li>
<li><strong>Shuffle while focusing on the question.</strong> Don't rush. Let the question sit in your mind clearly before drawing.</li>
<li><strong>Draw one card.</strong> For yes/no questions, one card is almost always sufficient. Multiple cards tend to complicate rather than clarify a simple directional query.</li>
<li><strong>Note whether the card is upright or reversed.</strong> Reversed cards typically shift a "yes" card toward "not yet" or "with conditions," and a "no" card toward "the situation is more nuanced than a simple no."</li>
<li><strong>Consider the card's energy, not just its label.</strong> A technically "yes" card that carries heavy warning imagery is a qualified yes at best.</li>
</ol>
<h2>Complete Yes/No Card Reference List</h2>
<h3>Major Arcana</h3>
<table>
<thead><tr><th>Card</th><th>Upright</th><th>Reversed</th></tr></thead>
<tbody>
<tr><td>The Fool</td><td>Yes</td><td>Not yet</td></tr>
<tr><td>The Magician</td><td>Yes</td><td>No (manipulation/self-deception)</td></tr>
<tr><td>The High Priestess</td><td>Maybe (trust your intuition)</td><td>No</td></tr>
<tr><td>The Empress</td><td>Yes</td><td>Maybe</td></tr>
<tr><td>The Emperor</td><td>Yes</td><td>Maybe</td></tr>
<tr><td>The Hierophant</td><td>Yes</td><td>Maybe</td></tr>
<tr><td>The Lovers</td><td>Yes</td><td>Not yet</td></tr>
<tr><td>The Chariot</td><td>Yes</td><td>No</td></tr>
<tr><td>Strength</td><td>Yes</td><td>Maybe</td></tr>
<tr><td>The Hermit</td><td>No (not the right time)</td><td>Maybe</td></tr>
<tr><td>Wheel of Fortune</td><td>Yes</td><td>No</td></tr>
<tr><td>Justice</td><td>Yes (if fair)</td><td>No</td></tr>
<tr><td>The Hanged Man</td><td>No (pause needed)</td><td>Maybe</td></tr>
<tr><td>Death</td><td>Yes (transformation required)</td><td>No</td></tr>
<tr><td>Temperance</td><td>Yes</td><td>No</td></tr>
<tr><td>The Devil</td><td>No</td><td>Maybe</td></tr>
<tr><td>The Tower</td><td>No</td><td>Maybe</td></tr>
<tr><td>The Star</td><td>Yes</td><td>Maybe</td></tr>
<tr><td>The Moon</td><td>No (things aren't clear yet)</td><td>Maybe</td></tr>
<tr><td>The Sun</td><td>Yes (strong yes)</td><td>Yes</td></tr>
<tr><td>Judgement</td><td>Yes</td><td>No</td></tr>
<tr><td>The World</td><td>Yes</td><td>Not yet</td></tr>
</tbody>
</table>
<h3>Minor Arcana Summary by Suit</h3>
<p><strong>Wands (Fire — action, creativity, ambition):</strong></p>
<ul>
<li>Ace through 6 of Wands upright: generally Yes</li>
<li>7-10 of Wands upright: qualified Yes (with struggle or delay)</li>
<li>Court cards: tend toward Yes but depend heavily on context</li>
</ul>
<p><strong>Cups (Water — emotions, relationships, intuition):</strong></p>
<ul>
<li>Ace through 6 of Cups upright: generally Yes for relationship questions</li>
<li>7 of Cups: No (confusion, illusion)</li>
<li>8 of Cups: No (walking away)</li>
<li>9-10 of Cups: strong Yes</li>
</ul>
<p><strong>Swords (Air — intellect, conflict, truth):</strong></p>
<ul>
<li>Ace of Swords: Yes (clarity cuts through)</li>
<li>2-3 of Swords: No</li>
<li>4 of Swords: Not yet (rest first)</li>
<li>5-9 of Swords: generally No or qualified</li>
<li>10 of Swords: No (ending)</li>
</ul>
<p><strong>Pentacles (Earth — material, practical, long-term):</strong></p>
<ul>
<li>Ace through 6 of Pentacles upright: generally Yes</li>
<li>7 of Pentacles: Maybe (patience required)</li>
<li>8-10 of Pentacles: Yes</li>
</ul>
<h2>Common Mistakes in Yes/No Tarot</h2>
<ul>
<li><strong>Re-drawing until you get a yes:</strong> This undermines the reading entirely. Draw once, accept the answer, then reflect on what it means — not how to get around it.</li>
<li><strong>Asking the same question in different words:</strong> "Will he text me?" and "Does he miss me?" are the same question. One draw is enough.</li>
<li><strong>Using yes/no for complex life decisions:</strong> "Should I take this job offer?" deserves a full spread, not a single card pull. Yes/no questions work best for specific, contained scenarios.</li>
<li><strong>Ignoring context:</strong> A "yes" card in a heavily negative surrounding energy (if you've pulled multiple cards) deserves more nuance than a flat yes.</li>
</ul>
<h2>When to Trust a Tarot Yes/No Answer</h2>
<p>The reading is most trustworthy when:</p>
<ul>
<li>You asked a genuine question you're genuinely open to either answer on</li>
<li>The card feels resonant, not random</li>
<li>The card's imagery connects meaningfully to your specific situation</li>
<li>You weren't hoping for a particular outcome before you drew</li>
</ul>
<p>Tarot isn't a vending machine for desired answers. Used honestly, yes/no readings can clarify your actual instincts — which often already knew the answer, and just needed the card as a mirror to reflect it back.</p>`
  },
  {
    slug: "dream-about-flying-meaning",
    category: "dream",
    title: "梦见自己飞起来是什么意思？周公解梦 × 弗洛伊德深度解析",
    title_en: "Dream About Flying: What It Really Means When You Fly in Your Dreams",
    description: "梦见飞翔是人类最普遍、最令人兴奋的梦境之一。本文从周公解梦传统、弗洛伊德心理学、荣格原型三个角度，深度解析梦见飞翔、飞高摔落、飞过建筑物等多种飞翔梦的含义，以及它和清醒梦的关系。",
    keywords: ["梦见飞翔","梦见自己会飞","飞翔梦解析","梦见飞起来","梦见飞高又摔下来","周公解梦飞翔","梦见在空中飞"],
    published_at: "2026-06-29",
    reading_time: 10,
    cta_href: "/dream",
    cta_label: "💭 AI 解梦 — 分析你的飞翔梦",
    cta_label_en: "AI Dream Decoder — Analyze Your Flying Dream",
    content: `<h2>为什么我们会梦见飞翔？</h2>
<p>梦见飞翔几乎是人类共通的体验——研究表明，超过70%的人在一生中至少经历过一次飞翔梦。这不是偶然。飞翔梦之所以如此普遍，是因为它触及了人类心理中最深层的渴望之一：<strong>超越限制的自由</strong>。</p>
<p>但飞翔梦的含义并不是一成不变的。你怎么飞、飞到哪里、飞行时的感受，以及是否平稳降落——这些细节都会改变这个梦的解读方向。</p>
<h2>周公解梦：飞翔梦的传统解读</h2>
<p>在中国传统解梦体系中，飞翔通常被视为积极的象征：</p>
<ul>
<li><strong>梦见自由自在地飞翔：</strong>事业运上升，前途光明。有突破当前处境、迎来新机遇的预兆。</li>
<li><strong>梦见飞得很高：</strong>野心与抱负将得到回报，可能迎来晋升、名声或社会地位的提升。</li>
<li><strong>梦见飞过城市或建筑物：</strong>将在事业或社交圈中获得更广的视野与影响力。</li>
<li><strong>梦见飞翔中遇到障碍（飞不起来、被树枝挂住）：</strong>预示在进取过程中会遇到阻力，需要耐心应对。</li>
<li><strong>梦见飞高后摔落：</strong>警示不要过于冒进，或某项计划存在风险，需重新评估。</li>
</ul>
<h2>弗洛伊德的解读：被压抑的渴望</h2>
<p>西格蒙德·弗洛伊德在《梦的解析》中提出，飞翔梦往往与<strong>性冲动或被压抑的身体愉悦感</strong>有关——这是弗洛伊德式的解释，在当代已被认为过于简化。</p>
<p>但弗洛伊德的另一个观点更有普遍价值：飞翔梦可能反映了做梦者在现实生活中感受到的某种<strong>对自由的渴望或对约束的抗拒</strong>——一种"如果没有这些限制，我能到达哪里"的潜意识愿景。</p>
<h2>荣格的解读：超越自我的原型渴望</h2>
<p>荣格把飞翔梦放在人类原型心理学的框架中来理解。在他的视角里，飞翔象征着：</p>
<ul>
<li><strong>超越自我局限的渴望：</strong>不只是现实生活的限制，而是自我认知的局限——想成为更大的自己</li>
<li><strong>灵性上升：</strong>在灵性传统中，飞翔往往与意识的提升、直觉的增强，以及对更高层次现实的感知有关</li>
<li><strong>个体化进程：</strong>飞翔梦频繁出现时，往往是个体在人生关键节点，开始超越旧有身份认同的信号</li>
</ul>
<h2>不同飞翔场景的具体解读</h2>
<h3>平稳、自由地飞翔</h3>
<p>这是最常见的正面飞翔梦。通常意味着：</p>
<ul>
<li>你正处于某种自信、自主或开悟的状态</li>
<li>对当前的生活走向感到满意，有掌控感</li>
<li>创造力和直觉处于活跃状态</li>
</ul>
<h3>飞得很高，感到恐惧或眩晕</h3>
<p>高处的不安感通常反映了：</p>
<ul>
<li>你正处于某个比以往更高的位置（职位、社会认可度），但尚未完全适应</li>
<li>对"如果失败了怎么办"的深层焦虑</li>
<li>野心与安全感之间的张力</li>
</ul>
<h3>飞高后摔落</h3>
<p>这类梦很常见，不要过度惊慌。它通常不是预示真实灾难，而是在说：</p>
<ul>
<li>你在某件事上走得太快，超出了现有准备的范围</li>
<li>需要重新评估某个计划的可行性</li>
<li>潜意识在提醒你"落地"——回到务实的层面</li>
</ul>
<h3>想飞但飞不起来</h3>
<p>这类梦往往与挫败感、受阻感相关：</p>
<ul>
<li>你有明确的目标或渴望，但现实条件或内在恐惧正在阻碍你</li>
<li>可能是对某个领域感到"使不上劲"的直接映射</li>
<li>有时也与睡眠的质量有关（进入深度睡眠时的身体感知）</li>
</ul>
<h3>在水上或云层中飞翔</h3>
<ul>
<li><strong>水面上飞翔：</strong>在情感的上方保持某种超然视角——这可能是健康的情感距离，也可能是在回避深层感受</li>
<li><strong>在云层中穿行：</strong>处于过渡期、情况尚未明朗、但方向感仍在</li>
</ul>
<h2>飞翔梦与清醒梦（Lucid Dream）</h2>
<p>飞翔是清醒梦中最常被体验到的场景之一。所谓清醒梦，是指做梦时你意识到自己在做梦，并能在一定程度上控制梦境的进行。</p>
<p>很多人的第一个清醒梦就发生在飞翔时——也许正是因为飞翔的不寻常感触发了"这不像现实"的意识。如果你频繁梦见飞翔并且想尝试清醒梦，飞翔梦是一个很好的切入点：记录梦境、做现实检验（Reality Check），飞翔场景往往就是你进入清醒状态的触发器。</p>
<h2>飞翔梦出现频率的含义</h2>
<ul>
<li><strong>偶尔出现：</strong>通常反映短暂的高度兴奋感或成就感</li>
<li><strong>人生关键节点频繁出现：</strong>往往对应你正在经历（或即将经历）某种重要的身份转变或人生突破</li>
<li><strong>长期持续出现：</strong>可能是在提示你，某种深层的渴望（自由、成就、超越）在现实中长期未被满足</li>
</ul>
<h2>结语</h2>
<p>梦见飞翔，无论形式如何，都在告诉你你的心还想去更高的地方。听它说的话，不一定要按字面理解，而是感受那个方向：你的生命在召唤你，去哪里？</p>`
  }
];

async function main() {
  console.log(`📝 准备写入 ${posts.length} 篇文章...`);
  let successCount = 0;
  let errorCount = 0;

  for (const post of posts) {
    const { error } = await supabase
      .from("mysticai_blog_posts")
      .upsert(post, { onConflict: "slug" });

    if (error) {
      console.error(`  ❌ 失败 [${post.slug}]:`, error.message);
      errorCount++;
    } else {
      console.log(`  ✅ 成功 [${post.slug}]`);
      successCount++;
    }
  }

  console.log(`\n🎉 完成！成功: ${successCount}, 失败: ${errorCount}`);
}

main().catch(console.error);
