/**
 * 第二批博客文章种子脚本（批次A：文章1-6）
 * 运行方式：node scripts/seed-blog-batch2.mjs
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tixgzezefjjsyuzgdhcd.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const posts = [
  {
    slug: "the-lovers-tarot-card-meaning",
    category: "tarot",
    title: "The Lovers Tarot Card Meaning: Choices, Connection & What It Really Signals",
    title_en: "The Lovers Tarot Card Meaning: Choices, Connection & What It Really Signals",
    description: "The Lovers card is about more than romance — it's about alignment, values, and the choices that define who you become. Discover the full upright and reversed meanings across love, career, and personal growth.",
    keywords: ["the lovers tarot","lovers card meaning","lovers tarot upright","lovers tarot reversed","lovers tarot love","tarot card meanings","major arcana"],
    published_at: "2026-06-18",
    reading_time: 11,
    cta_href: "/tarot",
    cta_label: "🔮 Draw Your Cards — AI Interprets the Reading",
    cta_label_en: "Draw Your Cards — AI Interprets the Reading",
    content: `<h2>What Is the Lovers Card?</h2>
<p>The Lovers is the sixth card of the Major Arcana (numbered VI), and it carries far more depth than its name suggests. Yes, it often appears in love readings. But at its core, the Lovers is about <strong>alignment between your inner values and your outer choices</strong> — it's the card of meaningful connection, authentic decisions, and the crossroads that shape your path.</p>
<p>In the Rider-Waite deck, the image shows a man and woman standing beneath an angel, with the sun blazing overhead. The man looks at the woman; the woman looks upward toward the divine. This triangular dynamic hints at the card's deeper message: true connection requires not just two people, but a third element — shared values, a higher purpose, or a guiding principle.</p>
<h2>The Lovers Upright: Core Meaning</h2>
<p>When the Lovers appears upright in a reading, it typically signals one of three things:</p>
<ul>
<li><strong>A significant relationship</strong> — new or deepening, that carries genuine emotional weight</li>
<li><strong>A values-aligned decision</strong> — you're being asked to choose based on what you truly believe, not convenience</li>
<li><strong>Union and harmony</strong> — two parts of yourself (or two people, or two paths) coming into balance</li>
</ul>
<p>This is not a casual card. When it shows up, something meaningful is being asked of you.</p>
<h2>The Lovers in Love Readings</h2>
<p>In a love context, the Lovers upright is genuinely promising — but the promise is conditional. It doesn't guarantee a perfect relationship. It signals that <em>the conditions for a deep, real connection are present</em>. Whether you act on them is another matter.</p>
<ul>
<li><strong>Single:</strong> Someone meaningful may be entering your life, or you may need to make a choice between two people or two versions of yourself in love.</li>
<li><strong>In a relationship:</strong> The relationship has real depth. This is a good time for honest conversations about where things are heading — this card supports deeper commitment.</li>
<li><strong>Separated / considering reconciliation:</strong> The Lovers asks whether the reconnection serves your values, not just your emotions. There's a decision to be made with clarity, not nostalgia.</li>
</ul>
<h2>The Lovers in Career Readings</h2>
<p>Career readings with the Lovers often point to a crossroads — a choice between two jobs, two projects, or two professional directions. The card is asking you to pick the path that aligns with your actual values, not just the one that pays more or looks better externally.</p>
<p>It can also indicate a strong professional partnership — a collaboration where your skills and another person's complement each other in a meaningful way.</p>
<h2>The Lovers Reversed: What It Means</h2>
<p>Reversed, the Lovers often points to:</p>
<ul>
<li><strong>Misalignment</strong> — staying in a situation (relationship, job, habit) that no longer reflects who you are</li>
<li><strong>Avoidance of a real choice</strong> — delaying a decision that needs to be made</li>
<li><strong>Communication breakdown</strong> — surface connection without real understanding</li>
<li><strong>Self-conflict</strong> — the "choice" isn't about two external things; it's about two parts of yourself that are in tension</li>
</ul>
<p>Reversed does not mean the relationship is doomed. It means something needs attention — probably a conversation that has been postponed.</p>
<h2>Key Combinations: The Lovers + Other Cards</h2>
<ul>
<li><strong>Lovers + The Tower:</strong> A sudden disruption forces a choice or reveals a misalignment that was already there</li>
<li><strong>Lovers + The Hierophant:</strong> A relationship that follows traditional or family-approved values; also formal commitment (engagement, marriage)</li>
<li><strong>Lovers + Two of Swords:</strong> Decision paralysis — you're avoiding the choice that needs to be made</li>
<li><strong>Lovers + The Chariot:</strong> Once the choice is made, you'll move forward with real momentum</li>
</ul>
<h2>The Lovers as a Yes/No Card</h2>
<p>In yes/no readings, the Lovers upright is generally a <strong>yes</strong> — particularly for questions about relationships, partnerships, or value-aligned decisions. Reversed, it tends toward <strong>not yet</strong> rather than a hard no, suggesting more clarity or communication is needed first.</p>
<h2>What the Lovers Is Really Asking You</h2>
<p>More than almost any other Major Arcana card, the Lovers requires you to know yourself. The choice it presents only becomes clear when you're honest about what you actually value — not what you think you should want, or what would be easiest, but what genuinely matters to you.</p>
<p>When this card appears, the right question to ask isn't "what does this person feel for me?" It's: <em>What do I actually want, and am I willing to choose it?</em></p>`
  },
  {
    slug: "the-chariot-tarot-card-meaning",
    category: "tarot",
    title: "The Chariot Tarot Card: Willpower, Victory & How to Use Its Energy",
    title_en: "The Chariot Tarot Card: Willpower, Victory & How to Use Its Energy",
    description: "The Chariot doesn't mean things will be easy — it means you have what it takes to win. Learn the full upright and reversed meanings of The Chariot in love, career, and personal growth, and what it's really asking of you.",
    keywords: ["the chariot tarot","chariot tarot card meaning","chariot tarot upright reversed","chariot tarot love","major arcana VII","tarot willpower"],
    published_at: "2026-06-19",
    reading_time: 10,
    cta_href: "/tarot",
    cta_label: "🔮 Draw Your Cards — Get an AI Reading Now",
    cta_label_en: "Draw Your Cards — Get an AI Reading Now",
    content: `<h2>The Chariot at a Glance</h2>
<p>The Chariot is the seventh Major Arcana card (numbered VII), and it's one of the most action-oriented cards in the entire deck. Where most tarot cards invite reflection, the Chariot demands movement. It's the card of <strong>controlled determination</strong> — the kind of drive that doesn't just want to win, but has the discipline to actually do it.</p>
<p>The classic Rider-Waite image shows a warrior in a chariot pulled by two sphinxes — one black, one white — representing opposing forces. The key detail: the warrior holds no reins. The sphinxes are controlled by sheer will and focus, not physical restraint. That's the Chariot's core lesson: <em>you direct your life through clarity of intention, not by controlling everything around you.</em></p>
<h2>Chariot Upright: Core Meaning</h2>
<p>Upright, the Chariot carries several overlapping meanings:</p>
<ul>
<li><strong>Victory through effort:</strong> Success is available — but it requires discipline, not luck</li>
<li><strong>Controlling opposing forces:</strong> You're managing two things in tension and moving forward anyway</li>
<li><strong>Travel and momentum:</strong> Literally or metaphorically, things are moving</li>
<li><strong>Self-mastery:</strong> You're operating from a place of inner strength, not reaction</li>
</ul>
<h2>The Chariot in Career Readings</h2>
<p>This is probably the Chariot's strongest suit. In career readings, it's one of the best cards you can pull. It signals:</p>
<ul>
<li>A project or role where you have genuine competitive advantage</li>
<li>A promotion, win, or recognition that's been earned — not given</li>
<li>The right time to push hard and make your case</li>
<li>A period where sustained effort pays off disproportionately</li>
</ul>
<p>If you've been wondering whether to go for something bigger — a new role, a pitch, a creative project — the Chariot upright is a strong signal that your drive and discipline are exactly what's needed right now.</p>
<h2>The Chariot in Love Readings</h2>
<p>In love, the Chariot is more nuanced. Its energy is assertive and goal-oriented — which can be great in the early stages of pursuit, but needs softening in an established relationship.</p>
<ul>
<li><strong>Single:</strong> If you want a relationship, this card says go after it actively. The person you're interested in responds to confidence and directness.</li>
<li><strong>In a relationship:</strong> You may be working hard to keep things moving — possibly too hard. Check whether you're directing a partnership or steamrolling one.</li>
</ul>
<h2>The Chariot Reversed</h2>
<p>Reversed, the Chariot's focused energy has scattered or been misdirected:</p>
<ul>
<li><strong>Aggression without direction:</strong> Pushing hard, but not toward anything coherent</li>
<li><strong>Control issues:</strong> Trying to force an outcome that isn't ready to be forced</li>
<li><strong>Blocked momentum:</strong> Something external (or internal) is stalling forward progress</li>
<li><strong>Overconfidence:</strong> Charging ahead without adequate preparation</li>
</ul>
<p>The reversed Chariot rarely means stop entirely. More often it means: <em>you're pushing in the wrong direction, or you need to consolidate before charging forward again.</em></p>
<h2>Key Combinations</h2>
<ul>
<li><strong>Chariot + Strength:</strong> A combination of outer determination and inner emotional courage</li>
<li><strong>Chariot + The Moon:</strong> Moving forward despite uncertainty or confusion</li>
<li><strong>Chariot + Ace of Wands:</strong> New beginning with real momentum — one of the strongest "launch" combinations</li>
</ul>
<h2>What the Chariot Asks of You</h2>
<p>The Chariot doesn't promise a smooth ride. It promises that if you know where you're going and maintain your focus under pressure, you will get there. The card asks three things: clarity of direction, discipline in execution, and the willingness to hold opposing forces in tension without letting either one take control.</p>
<p>When it shows up in your reading, the question is simple: <em>Are you willing to do what it takes — not just when it's easy, but especially when it isn't?</em></p>`
  },
  {
    slug: "the-world-tarot-card-meaning",
    category: "tarot",
    title: "The World Tarot Card: Completion, Achievement & What Comes After",
    title_en: "The World Tarot Card: Completion, Achievement & What Comes After",
    description: "The World is the final Major Arcana card — and it doesn't mean the end. It means you've completed something real. Explore its full upright and reversed meanings in love, career, and major life cycles.",
    keywords: ["the world tarot card","world tarot meaning","world tarot upright reversed","world tarot love career","major arcana XXI","tarot completion"],
    published_at: "2026-06-20",
    reading_time: 10,
    cta_href: "/tarot",
    cta_label: "🔮 Start Your AI Tarot Reading",
    cta_label_en: "Start Your AI Tarot Reading",
    content: `<h2>The World: The Major Arcana's Finale</h2>
<p>The World (XXI) is the last numbered card of the Major Arcana — but calling it "the end" misses the point entirely. The World represents <strong>completion of a full cycle</strong>: you began as the Fool (card 0) with nothing but potential, and you've arrived here having integrated every experience, every lesson, every challenge the journey brought. That's not an ending. That's a graduation.</p>
<p>In the Rider-Waite image, a dancer moves freely within a wreath, surrounded by four figures representing the fixed signs of the zodiac. She holds two wands — one in each hand — and her expression is one of freedom earned, not given. The wreath is circular: you've come full circle, and the next Fool's journey begins from a higher vantage point.</p>
<h2>The World Upright: What It Signals</h2>
<p>When the World appears upright, you're in (or approaching) one of the following:</p>
<ul>
<li><strong>A genuine completion:</strong> A chapter of your life has wrapped up in a way that feels whole and earned</li>
<li><strong>Recognition and achievement:</strong> Success that has come from sustained effort, not a lucky break</li>
<li><strong>Integration:</strong> You've absorbed a difficult lesson at a deep level and it's changed how you move through the world</li>
<li><strong>Expansion and travel:</strong> Literally, the world becomes bigger — new geography, new culture, new perspective</li>
<li><strong>Wholeness:</strong> A period of feeling fully yourself, without significant conflict between what you want and how you're living</li>
</ul>
<h2>The World in Career and Finances</h2>
<p>In career readings, the World is one of the best cards to receive. It often signals:</p>
<ul>
<li>Completing a major project with strong results</li>
<li>Reaching a career milestone (promotion, graduation, business launch succeeding)</li>
<li>Recognition from peers or leadership for sustained excellent work</li>
<li>A role or opportunity that brings you into a wider arena</li>
</ul>
<p>Financially, the World suggests stability achieved through effort — not windfall, but the solid ground that comes from sustained financial discipline finally paying off.</p>
<h2>The World in Love and Relationships</h2>
<p>The World in a love reading is a deeply positive card, but its meaning varies by context:</p>
<ul>
<li><strong>Long-term couple:</strong> The relationship has reached a milestone — possibly engagement, marriage, moving in together, or simply a new level of genuine partnership.</li>
<li><strong>Single:</strong> You're whole on your own — and that completeness is actually what makes you ready for a real relationship.</li>
<li><strong>After a breakup:</strong> The World after a separation signals genuine closure — you've processed this fully and you're ready to begin something new.</li>
</ul>
<h2>The World Reversed: Meaning and Nuance</h2>
<p>Reversed, the World's energy of completion becomes incomplete:</p>
<ul>
<li><strong>Delayed closure:</strong> A situation should be wrapping up, but something is preventing it</li>
<li><strong>Short-cutting:</strong> Declaring victory before the work is actually done</li>
<li><strong>Stagnation:</strong> The cycle wants to complete, but you're holding on to what no longer fits</li>
<li><strong>Feeling stuck in a loop:</strong> Repeating the same patterns without the breakthrough</li>
</ul>
<h2>Key Combinations with The World</h2>
<ul>
<li><strong>World + The Fool:</strong> Perfect cycle — completion and new beginning in the same reading</li>
<li><strong>World + Ten of Pentacles:</strong> Financial and family security achieved. Long-term legacy being established.</li>
<li><strong>World + Eight of Wands:</strong> Rapid completion — things are wrapping up faster than expected</li>
</ul>
<h2>What the World Is Really Asking</h2>
<p>The World makes an important distinction: <em>done</em> means stopped. <em>Complete</em> means whole. A relationship can end without being complete. A project can finish without you having absorbed what it taught you. The World appears when something has reached genuine wholeness.</p>
<p>When this card shows up, the question isn't "is this ending?" It's: <em>Have you actually finished what this cycle was here to teach you?</em></p>`
  },
  {
    slug: "dream-about-money-meaning",
    category: "dream",
    title: "梦见钱是什么预兆？捡钱、数钱、丢钱、收到钱梦境完整解析",
    title_en: "Dream About Money: What It Really Means to Find, Lose & Count Money in Dreams",
    description: "梦见钱是什么意思？从周公解梦到现代心理学，详解梦见捡钱、数钱、丢钱、钱多如山、纸币与硬币等20种常见金钱梦境的含义，以及梦境与现实财运的关系。",
    keywords: ["梦见钱","梦到捡钱","梦见数钱","梦见丢钱","梦见钱是什么意思","梦见很多钱","周公解梦钱","梦见纸币"],
    published_at: "2026-06-21",
    reading_time: 10,
    cta_href: "/dream",
    cta_label: "💭 AI 周公解梦 — 输入你的梦境，即刻解析",
    cta_label_en: "AI Dream Decoder — Interpret Your Dream Now",
    content: `<h2>钱为什么频繁出现在梦里？</h2>
<p>钱是现实生活中最具能量的符号之一。它代表安全感、选择的自由、个人价值，以及你与社会之间的交换关系。正因如此，当你在现实中对财务有焦虑、期待或重要决策时，钱往往就会出现在梦境里。</p>
<p>但梦境中的钱<strong>不一定是真实财运的预示</strong>。更多时候，它是你潜意识用"钱"这个符号来表达某种情感状态——自我价值感、对未来的控制欲，或某段关系中的付出与回报是否平衡。</p>
<h2>梦见捡到钱</h2>
<p>这是最令人愉快的金钱梦之一，通常意味着：</p>
<ul>
<li><strong>周公解梦传统解释：</strong>偏财运近。意外之财或机会可能在近期出现，但"捡"来的财不稳，需善加把握。</li>
<li><strong>心理学角度：</strong>发现了自己身上之前忽视的某种能力或资源。你正在"找回"属于你但曾被忽略的东西——可能是自信、才能，或某段人际关系。</li>
<li><strong>捡到大量钱：</strong>通常与强烈的机遇感或即将迎来的积极转变有关。</li>
<li><strong>捡到破旧纸币：</strong>机会虽有，但需要整理或修复，不是现成的好处。</li>
</ul>
<h2>梦见数钱</h2>
<p>数钱的动作在梦里通常具有仪式感，暗示：</p>
<ul>
<li><strong>清算与总结：</strong>你正在对某段经历、某段关系进行"结算"——付出了多少，得到了多少。</li>
<li><strong>数出很多：</strong>对现状感到满意，或对即将到来的收获有信心。</li>
<li><strong>越数越少：</strong>对某种损耗有隐忧——金钱、精力或感情的持续流失让你不安。</li>
</ul>
<h2>梦见丢钱</h2>
<ul>
<li><strong>传统解释：</strong>财运有起伏，可能有小额损失。也可能是"破财消灾"的信号。</li>
<li><strong>心理含义：</strong>对某种"失去控制"的恐惧。你可能感觉在某个领域失去掌控感。</li>
<li><strong>丢了找回来：</strong>一度失去的机会或资源会重新出现，需要主动寻找。</li>
</ul>
<h2>梦见很多钱、钱多如山</h2>
<ul>
<li><strong>若梦中感到喜悦自然：</strong>自我价值感高，对人生走向充满信心，或近期确有好机会。</li>
<li><strong>若梦中感到不安或负担：</strong>对"成功"有隐藏的恐惧，担心拥有太多会带来风险——这比财务焦虑更值得关注。</li>
</ul>
<h2>梦见收到别人给的钱</h2>
<ul>
<li><strong>陌生人给钱：</strong>意外的支持或帮助即将到来，也可能代表某种与外部资源的新联结。</li>
<li><strong>长辈或亲人给钱：</strong>传统上视为吉兆，象征庇护与祝福。</li>
<li><strong>伴侣或恋人给钱：</strong>这段关系中存在对等交换的意识，或你对对方有"付出-回报"的期待需要澄清。</li>
</ul>
<h2>梦见硬币 vs. 纸币</h2>
<ul>
<li><strong>硬币：</strong>小而实在的价值，稳定、积累。象征通过长期积累获得的稳定财富。</li>
<li><strong>纸币（大额）：</strong>流动性强，也可能代表某种表面繁荣但缺乏实质的状态。</li>
</ul>
<h2>梦见钱被偷</h2>
<p>这类梦的核心情绪通常是"被侵犯"而非"损失"：</p>
<ul>
<li>现实中感觉某人占了你的便宜，或你的付出没有得到应有的回报</li>
<li>对某段关系或合作中的信任感正在动摇</li>
<li>担心自己的努力成果被他人摘取</li>
</ul>
<h2>梦见钱和现实财运有关系吗？</h2>
<p>直接说：<strong>梦境不是财运的精确预测</strong>。周公解梦等传统体系中对应的"吉凶"是象征性的，代表的是一种能量方向，而非具体事件。</p>
<p>更有价值的做法是把梦境作为一面镜子，审视你当前与"钱"的关系。你是焦虑的？渴望的？觉得自己配得上财富的？这些深层信念，往往才是梦境真正想让你看到的。</p>
<h2>梦见钱后的建议</h2>
<ul>
<li>记录梦中的细节——是捡到、数到还是丢掉？你的感受是什么？</li>
<li>问问自己：最近在哪件事上有"值不值"、"够不够"的念头？</li>
<li>如果频繁梦见丢钱或钱被偷，可能是提醒你检视现实中某个边界是否需要加固。</li>
</ul>`
  },
  {
    slug: "dream-about-dead-person-meaning",
    category: "dream",
    title: "梦见死人是什么意思？梦到死去的亲人、跟死人说话，是凶兆吗？",
    title_en: "Dreaming of Dead People: What It Really Means When the Deceased Visit Your Dreams",
    description: "梦见死人——尤其是死去的亲人——几乎是所有人一生中都会经历的梦境。它是凶兆，还是一种情感联结？本文从周公解梦传统、荣格心理学、以及灵性解读三个角度，给出最完整的解析。",
    keywords: ["梦见死人","梦见死去的亲人","梦见死人说话","梦见去世的人","梦见死人是什么意思","周公解梦死人","梦见死去的父母"],
    published_at: "2026-06-22",
    reading_time: 10,
    cta_href: "/dream",
    cta_label: "💭 AI 解梦 — 告诉我你的梦，现在就解析",
    cta_label_en: "AI Dream Decoder — Analyze Your Dream",
    content: `<h2>梦见死人，是不吉利的征兆吗？</h2>
<p>在很多人的直觉里，梦到死人会让人觉得不安，甚至担心是某种预兆。但从各文化的解梦传统来看，答案远比这复杂——而且通常是令人安慰的。</p>
<p>梦见死去的人，在绝大多数情况下，<strong>不是凶兆，也不是诅咒</strong>。它更多是一种深层的情感处理机制——你的潜意识，或者你对逝去者的思念，在以梦境的形式进行着自己的工作。</p>
<h2>周公解梦：梦见死人的传统解读</h2>
<ul>
<li><strong>梦见死去的亲人来访：</strong>传统上视为先人庇护的信号，代表在冥冥中有人在为你祈福。</li>
<li><strong>梦见死人开口说话：</strong>如果话语清晰，传统上视为"托梦"——可能有未竟的嘱托。若话语模糊，则更多是潜意识的投射。</li>
<li><strong>梦见死人送东西给你：</strong>大多被解读为吉兆，象征即将得到某种礼物、机会或贵人帮助。</li>
<li><strong>梦见死人向你要东西：</strong>可能代表你在某件事上有情感上的亏欠，需要面对。</li>
<li><strong>梦见死人又活了：</strong>通常被解读为变化将至——旧的事物将以新的形式重现。</li>
</ul>
<h2>心理学视角：荣格的解读</h2>
<p>瑞士心理学家荣格认为，梦中出现的人物——不管是活着的还是死去的——<strong>通常代表做梦者内心的某一个面向</strong>，而非真实人物的灵魂显现。</p>
<ul>
<li><strong>梦见死去的父母：</strong>可能代表你内心的"权威"声音，或者你从父母那里继承的某种价值观，正在你的生命中发挥作用——或者需要被更新。</li>
<li><strong>梦见死去的祖父母：</strong>往往象征智慧、根基与传承。</li>
<li><strong>梦见死去的朋友或伴侣：</strong>通常与"未解决的情感"有关——遗憾、思念，或某句话从未说出口。</li>
</ul>
<h2>探访梦：为什么失去亲人后频繁梦到对方</h2>
<p>心理学研究发现，在亲人去世后的数月乃至数年内，做梦者频繁梦到逝者——这被称为<strong>"探访梦"（Visitation Dream）</strong>。</p>
<p>这类梦有几个共同特点：</p>
<ul>
<li>梦境感觉异常真实、清晰，不像普通梦境那样模糊</li>
<li>逝者通常看起来平和、健康，与生前病痛时不同</li>
<li>醒来后，做梦者通常感到某种平静或被安抚，而非恐惧</li>
</ul>
<p>无论你相信这是灵魂真实来访，还是大脑在哀伤中的自我疗愈，这类梦的功能是一样的：<strong>它帮助你处理失去，维系那份连接，并允许你慢慢接受现实。</strong></p>
<h2>反复梦见同一个死去的人</h2>
<p>如果你反复在梦中见到同一位逝者，通常意味着：</p>
<ul>
<li>你与这个人之间有某件事<strong>还没有被你内心处理完</strong>——可能是遗憾、愤怒、感谢，或某个从未说出口的"再见"</li>
<li>这个人代表的某种品质，<strong>此刻在你的生命中特别重要</strong></li>
</ul>
<h2>快速场景解读表</h2>
<table>
<thead><tr><th>梦境场景</th><th>常见含义</th></tr></thead>
<tbody>
<tr><td>梦见死去的父亲</td><td>权威、方向感、对"成就"的期望或压力</td></tr>
<tr><td>梦见死去的母亲</td><td>情感支持、安全感、对自我养育的渴望</td></tr>
<tr><td>梦见死去的祖父母</td><td>根基、智慧、传承的价值观</td></tr>
<tr><td>梦见死去的朋友</td><td>未了的情感、对某段关系阶段的怀念</td></tr>
<tr><td>梦见死人追你</td><td>逃避某个需要面对的情感或记忆</td></tr>
<tr><td>梦见死人微笑</td><td>通常是平和的信号，内心给自己的安慰</td></tr>
</tbody>
</table>
<h2>结语：梦是思念的另一种语言</h2>
<p>在所有类型的梦境中，梦见逝去的人往往是最有情感重量的一种。它提醒我们：那些我们深爱过的人，从未真正离开我们的内心。</p>
<p>不管你把它理解为心理机制、灵性访问还是巧合，能在梦中再见他们——哪怕短暂——本身就是一种礼物。</p>`
  },
  {
    slug: "2026-aries-annual-horoscope",
    category: "horoscope",
    title: "2026年白羊座全年运势：事业冲刺年，感情需慢热，财运稳中有升",
    title_en: "Aries 2026 Annual Horoscope: Career Surge, Steady Love, Rising Fortune",
    description: "2026年白羊座运势全面解析。木星于年中转入双子座，持续激活白羊的沟通与短途旅行领域；土星在双鱼为你构建精神基础。事业、爱情、财运、健康逐月重点一文掌握。",
    keywords: ["2026白羊座运势","白羊座2026全年","白羊座2026事业","白羊座2026爱情","白羊座2026财运","Aries 2026 horoscope","2026年白羊座"],
    published_at: "2026-06-23",
    reading_time: 12,
    cta_href: "/horoscope",
    cta_label: "🌌 查看本周白羊座详细运势",
    cta_label_en: "Check Your Weekly Aries Horoscope",
    content: `<h2>2026年白羊座总览</h2>
<p>2026年对白羊座而言，是一个<strong>有明确主轴的行动年</strong>。全年最重要的行星背景是：木星于5月结束在金牛的旅程，进入双子座，为白羊的第三宫（沟通、学习、短途旅行、兄弟姐妹关系）注入扩张能量；火星，白羊的守护星，在年中经历蓄力期后全面提速，带来行动力的全面复苏。</p>
<p>土星继续驻守双鱼座（白羊的第十二宫），这意味着2026年有一股不明显但极为重要的底层功课：在独处、灵性与内省上建立更稳固的基础。</p>
<h2>事业运势：下半年爆发期到来</h2>
<p>上半年（1-5月）白羊在职场上可能感到"蓄而不发"——你有想法，有冲劲，但项目推进总比预期慢半拍。把这段时间用在磨练技能、深耕关系网络上，这些积累会在下半年产生复利效应。</p>
<p>6月之后，局势开始加速。木星在双子激活你的第三宫，你的表达能力、沟通魅力和说服力都会大幅提升——这对销售、谈判、演讲、写作等任何需要传递信息的职业都是巨大利好。</p>
<ul>
<li><strong>最适合行动的月份：</strong>6月、9月、11月</li>
<li><strong>需要耐心等待的月份：</strong>1月、4月（水星逆行期间）</li>
<li><strong>职场贵人方向：</strong>与你不同行业但有互补资源的人</li>
</ul>
<h2>爱情运势：单身者惊喜，恋爱中的人需沟通</h2>
<ul>
<li><strong>单身白羊：</strong>4月金星进入白羊，到5月初是全年感情运最亮眼的窗口期。此时个人魅力处于高峰，主动出击比等待更有效。</li>
<li><strong>恋爱中的白羊：</strong>7-8月可能出现摩擦期，双方在某件事的优先级上产生分歧。关键在于是否能真正听到对方说的是什么。</li>
<li><strong>关于正缘：</strong>2026年白羊的正缘特征——对方往往比你沉稳，能帮你落地；同时又足够尊重你的独立性。</li>
</ul>
<h2>财运分析：主业为锚，开源要选好赛道</h2>
<ul>
<li>上半年以守为主，避免冲动型投资。</li>
<li>下半年随着职业机会扩展，收入来源可能增加——尤其是与表达、传播相关的副业有不错的起步机会。</li>
<li><strong>全年财运最佳月份：</strong>5月、10月。<strong>谨慎月份：</strong>2月（避免大额借贷）、8月（防范冲动消费）。</li>
</ul>
<h2>健康提示</h2>
<p>白羊守护身体部位是头部，2026年需要特别注意睡眠质量和减压。土星在第十二宫与健康和休息密切相关，全年都在提醒你：学会在充分休息后再高效行动，效果远好于硬撑。</p>
<h2>白羊座2026年关键词</h2>
<p><strong>积累 · 表达 · 聆听 · 策略性冲刺</strong></p>
<p>2026年的白羊，最强大的状态不是莽撞的冲锋，而是<em>有准备的爆发</em>。知道在哪里该快，在哪里该停，将是这一年决定成败的关键能力。</p>`
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
