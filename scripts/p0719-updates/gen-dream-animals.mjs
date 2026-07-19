// ─── GROUP=dream-animals：5 篇动物梦境文章 FAQ 增强 ─────────────────────────
// 只加 faqHtml（h3+p 对）与 addKeywords，不加 sectionsHtml。
// 重复规避说明：
//  - snake：原文 FAQ 已有 black snake 问题 → 跳过，只加 green/white + warning
//  - cat：原文 FAQ 已有 black cat 问题 → 跳过，只加 white cat + cat bite
//  - spider-dream-meaning：原文 FAQ 已有 spider web 问题 → 跳过 web，聚焦 red + giant
//  - dream-about-spider-meaning：原文无 FAQ h2，apply 脚本无法插入 → 只加 keywords，
//    建议的 FAQ 放在 faqHtmlSuggested 字段（apply 会忽略该字段），由主代理决定如何处理
import { writeFileSync } from "fs";

const arr = [
  {
    slug: "snake-dream-meaning",
    faqHtml: `<h3>What about a green or white snake in a dream?</h3>
<p>Green snakes usually lean positive — growth, healing, and new beginnings, since green is the color of living things and renewal. A white snake tends to signal purity, clarity, or a transformation happening on a spiritual level; some read it as a sign that a feared change will turn out benign. As always, the feeling matters most: a calm green snake confirms growth, while a threatening one can point to jealousy or a fresh situation turning sour.</p>
<h3>Is a snake dream a warning?</h3>
<p>Sometimes, but not automatically. A snake that strikes, chases, or hides can work like an alarm bell — flagging a toxic person, a situation you're underestimating, or a truth you've been avoiding. Yet plenty of snake dreams are about healing and renewal rather than danger. Treat it as a prompt, not a prophecy: ask what in your waking life feels threatening or overdue for change, and let that honest answer guide you.</p>`,
    addKeywords: ["black snake dream meaning", "green snake dream meaning", "white snake dream meaning"],
  },
  {
    slug: "dog-dream-meaning",
    faqHtml: `<h3>What does a black dog mean in a dream?</h3>
<p>A black dog often carries the shadow side of the dog's usual loyalty — hidden fear, low mood, grief, or a part of yourself you'd rather not look at. Some traditions cast the black dog as a dark omen, but psychologically it more often points to a heavy emotion asking for attention. If the black dog felt calm or protective, it can instead signal a loyal, grounding force watching over you through a difficult stretch.</p>
<h3>What does an aggressive or growling dog mean in a dream?</h3>
<p>A growling, snarling dog usually signals tension held just short of open conflict — a strained friendship, a boundary being tested, or instincts you feel are about to slip their leash. Unlike a full attack, the growl is a warning stage: something in your waking life is grumbling before it bites. Notice who or what the dog was guarding, since that often reveals exactly where the pressure is building.</p>
<h3>What does a dog bite in a dream mean?</h3>
<p>A dog bite often reflects a breach of trust — hurt coming from someone or something you expected to be loyal, whether a friend, a partner, or your own instincts turning on you. Where the bite lands can add nuance: a bitten hand can point to help or generosity being punished. Painful as it is, the dream is usually pushing you to address the wound rather than pretend it didn't happen.</p>`,
    addKeywords: ["black dog dream meaning", "aggressive dog dream meaning", "dog bite dream meaning"],
  },
  {
    slug: "cat-dream-meaning",
    faqHtml: `<h3>What does a white cat mean in a dream?</h3>
<p>A white cat usually blends the cat's intuition with the color's associations of purity and clarity — a clean, quiet signal from your instincts. Many dreamers read it as guidance arriving in a gentle form, or a reminder to trust a gut feeling you've been second-guessing. If the white cat felt aloof or hard to reach, it can instead suggest clarity you sense but haven't quite grasped yet.</p>
<h3>What does a cat bite in a dream mean?</h3>
<p>A cat bite often stings in proportion to its size: a small shock from a direction you didn't expect. It commonly points to your intuition snapping at you for being ignored, an independent streak in you pushing back against control, or a seemingly harmless relationship showing its claws. The dream is less a warning of betrayal than a nudge to respect boundaries — yours and other people's — before the scratch becomes a wound.</p>`,
    addKeywords: ["white cat dream meaning", "black cat dream meaning", "cat bite dream meaning"],
  },
  {
    slug: "spider-dream-meaning",
    faqHtml: `<h3>What does a red spider in a dream mean?</h3>
<p>Red adds intensity to the spider's usual symbolism — passion, anger, urgency, or danger, depending on the dream's tone. A red spider can flag a situation heating up: a volatile relationship, a strong emotion you're trying to ignore, or a warning that something small could turn painful. If the red spider felt vivid but not threatening, it may instead point to powerful creative energy demanding an outlet.</p>
<h3>What does a giant spider in a dream mean?</h3>
<p>Size in dreams usually mirrors how big something feels in waking life. A giant spider often represents a fear, obligation, or controlling influence that has grown out of proportion in your mind — looming larger than it really is. Facing the giant spider rather than fleeing can be the dream's real message: the thing feels enormous precisely because you haven't looked at it directly yet.</p>`,
    addKeywords: ["red spider dream meaning", "giant spider dream meaning"],
  },
  {
    slug: "dream-about-spider-meaning",
    faqHtmlSuggested: `<h3>What does a spider web mean in a dream?</h3>
<p>A web is the spider's creation, so it swings between two readings. Spun neatly, it reflects patient, skillful work — a project or plan coming together thread by thread. Sticky and blocking your path, it mirrors entanglement: obligations, a relationship, or a tangle of worries you keep brushing against. Notice whether you were admiring the web or struggling in it — that difference is the interpretation.</p>
<h3>What does it mean to dream about being caught in a spider web?</h3>
<p>Being wrapped or stuck in a web almost always reflects feeling trapped in waking life — caught in a dynamic you didn't spin yourself. The useful question the dream poses is who the weaver is: a manipulative person, a demanding situation, or your own anxious thinking looping back on you. Breaking free in the dream often signals readiness to cut those threads; staying stuck suggests the entanglement still needs naming before it can be escaped.</p>`,
    addKeywords: ["spider web dream meaning", "dream about spider web caught"],
  },
];

writeFileSync(new URL("./dream-animals.json", import.meta.url), JSON.stringify(arr, null, 1));
console.log(`已生成 dream-animals.json，共 ${arr.length} 条`);
