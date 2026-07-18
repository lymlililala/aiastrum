// 优化「aquarius rising」搜索词：
//   A) aquarius-rising-sign-meaning        —— 保留 slug/URL，正文全面扩写（主打 aquarius rising）
//   B) aquarius-rising-personality-complete —— 改打子查询 aquarius rising appearance / woman / man，避免自相竞争
// 用法：
//   node --env-file=.env scripts/gen-aquarius-rising-optimize.mjs            # 生成草稿到 scripts/out/aquarius-rising/
//   node --env-file=.env scripts/gen-aquarius-rising-optimize.mjs --publish  # 入库
import { createClient } from "@supabase/supabase-js";
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const SUPABASE_URL = "https://tixgzezefjjsyuzgdhcd.supabase.co";
const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY;
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY;
const OUT_DIR = new URL("./out/aquarius-rising/", import.meta.url).pathname;
const PUBLISH = process.argv.includes("--publish");

if (!DEEPSEEK_KEY) { console.error("缺少 DEEPSEEK_API_KEY"); process.exit(1); }
if (!SUPABASE_KEY) { console.error("缺少 SUPABASE_SECRET_KEY"); process.exit(1); }
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const LINKS = `
Internal links to weave in naturally (format: <a href="/blog/<slug>" class="blog-inline-link">natural anchor text</a>; never "click here"). Article A should use 5-7 of them, Article B 4-6 (B MUST link to A):
- /blog/what-is-my-rising-sign  "What Is My Rising Sign? How to Find & Understand Your Ascendant"
- /blog/sun-moon-rising-signs-explained  "Sun, Moon & Rising Signs: What They Mean in Your Chart"
- /blog/rising-sign-complete-guide  "Your Rising Sign (Ascendant): The Most Personal Point in Your Chart"
- /blog/aquarius-zodiac-sign-personality-traits  "Aquarius Zodiac Sign: Personality Traits, Love & Compatibility"
- /blog/aquarius-rising-sign-meaning  "Aquarius Rising: Complete Guide to the Aquarius Ascendant Personality" (this is article A — B must link to it, A must NOT link to itself)
- /blog/aquarius-rising-personality-complete  (this is article B — A should link to it once, in the appearance section, as the appearance deep-dive)
- /blog/uranus-in-gemini-2026-astrology  "Uranus in Gemini 2026" (relevant: Uranus is Aquarius rising's modern ruler)
- /blog/gemini-rising-sign-meaning  "Gemini Rising" (air-sign rising comparison / compatibility mentions)
- /blog/libra-rising-sign-meaning  "Libra Rising"
- /blog/leo-rising-sign-meaning  "Leo Rising" (Leo is the Aquarius-rising descendant sign)
`;

const STYLE_RULES = `
[Writing style — MOST IMPORTANT: it must read like a human astrology writer, not AI]
- Voice: a seasoned English-language astrology columnist. Opinionated, warm, conversational. Talk to the reader as "you".
- STRICTLY BANNED (AI tells): "In conclusion", "In today's world", "It's important to note", "It is worth noting", "delve", "furthermore", "moreover", "firstly/secondly", "In summary", "Let's explore", "embark on", "navigate the", "tapestry", "cosmic dance".
- Vary paragraph length: some one-sentence paragraphs, some three or four. Do NOT make every section follow the same template.
- Use concrete specifics: real-life situations (job interviews, first dates, group chats), specific examples, not vague adjectives.
- Occasional rhetorical questions, short punchy sentences, parenthetical asides are fine.
- No fake statistics, no invented celebrity examples stated as fact (you may say Aquarius rising is often described as having a certain look — frame it as astrological tradition, not science).
- Never mention "this article", "as an AI", or that content was generated.

[HTML format — hard requirements]
- Output is an HTML fragment: opens with an intro <p> (2-4 sentences, NO heading before it), and must NEVER contain <h1>.
- Sections: <h2>; sub-points: <h3>; lists: <ul><li> with <strong> for lead terms.
- Must end with an FAQ section: <h2>Frequently Asked Questions</h2> (or "FAQs About Aquarius Rising"), then 4-5 pairs of <h3>question</h3><p>answer (2-4 sentences each)</p>. Questions should be real long-tail queries people type into Google.
- Escape apostrophes as &#39; inside HTML text to keep the JS-safe style used across the site.
`;

const ARTICLES = [
  {
    slug: "aquarius-rising-sign-meaning",
    keepMeta: true, // 保留现有 title/description/keywords（已针对 aquarius rising 优化），只换正文
    brief: `
This is the site's PRIMARY page for the Google query "aquarius rising". Rewrite the body completely into a comprehensive, genuinely useful guide (1,800-2,300 words). The searcher wants to know: what does Aquarius rising mean, what are these people like, what do they look like, who are they compatible with.
Structure (you may adjust slightly):
1. Intro <p>: what the ascendant is in one breath, then what it means to have Aquarius on it. Mention that you need your birth time to know yours (natural spot to link "what is my rising sign").
2. <h2>What Does Aquarius Rising Mean?</h2> — ascendant = the sign on the eastern horizon at birth; Aquarius rising = the world meets your Uranus/Saturn side first. Contrast briefly with Aquarius SUN (link the sun-sign article).
3. <h2>Aquarius Rising Personality Traits</h2> — 5-6 traits as <h3> or <ul><li><strong>: original/independent thinker, friendly but emotionally detached, allergic to small talk and hierarchy, humanitarian streak, contrarian, quietly stubborn (fixed sign). Each with a concrete everyday example.
4. <h2>Aquarius Rising Appearance</h2> — one solid paragraph + a few bullets (astrological tradition: striking/unusual features, androgynous or eclectic style, intense eyes, taller leaner frame — framed as tradition, not fact), then link article B as the deep-dive.
5. <h2>Aquarius Rising in Love & Compatibility</h2> — descendant is Leo: drawn to warm, confident, expressive people; needs friendship first and lots of space; classically easy pairings with Gemini and Libra placements (link those rising guides); the Leo-rising attraction (link Leo rising guide).
6. <h2>Career & Life Path</h2> — tech/science, activism, anything unconventional; needs autonomy.
7. <h2>Uranus & Saturn: Your Chart Rulers</h2> — modern ruler Uranus (link the Uranus in Gemini article as what's activating it now), traditional ruler Saturn; where they sit modifies everything.
8. <h2>Frequently Asked Questions</h2> — include: "What does Aquarius rising mean?", "How do I know if I'm Aquarius rising?", "What is the difference between Aquarius sun and Aquarius rising?", "Who is Aquarius rising attracted to / compatible with?", "What does Aquarius rising look like?"
`,
    cta_href: "/birth-chart",
    cta_label: "🔮 Discover Your Aquarius Rising — Free Birth Chart",
    cta_label_en: "Discover Your Aquarius Rising — Free Birth Chart",
  },
  {
    slug: "aquarius-rising-personality-complete",
    keepMeta: false,
    newMeta: {
      title: "Aquarius Rising Appearance: The Aquarius Ascendant Look, Style & First Impression",
      title_en: "Aquarius Rising Appearance: The Aquarius Ascendant Look, Style & First Impression",
      description: "What does Aquarius rising look like? The Aquarius Ascendant appearance, style, and first impression — plus how Aquarius rising women and men differ. Astrological tradition explained.",
      keywords: ["aquarius rising appearance", "aquarius rising woman", "aquarius rising man", "aquarius rising physical appearance", "aquarius rising style", "aquarius ascendant appearance", "aquarius rising first impression"],
    },
    brief: `
Repurpose this page away from generic "aquarius rising personality" (article A owns that) to own the sub-queries "aquarius rising appearance", "aquarius rising woman" and "aquarius rising man" (1,400-1,900 words). Open by acknowledging: yes, astrologers really do associate the ascendant with physical presence and style — here is the tradition for Aquarius rising, taken with the appropriate grain of salt.
Structure:
1. Intro <p> — the ascendant as your "packaging"; for the full personality picture, point to article A early (link it).
2. <h2>The Aquarius Rising Look</h2> — astrological tradition: distinctive or unusual features, bright/intense "electric" eyes, androgynous touches, often tall or angular frame; the look that makes people say "there's something different about you". Frame as tradition with light humor.
3. <h2>Aquarius Rising Style</h2> — eclectic, ahead-of-trend, mixes vintage with techwear, hates dressing to fit in; hair experiments; one signature odd detail.
4. <h2>Aquarius Rising Woman</h2> — first impression she gives (approachable yet hard to read), style notes, in dating (needs mental spark, dislikes being chased hard), at work.
5. <h2>Aquarius Rising Man</h2> — first impression he gives (the friendly outsider), style notes, in dating (allergic to pressure and routine), at work.
6. <h2>Why You Might Not Match the Description</h2> — chart ruler placement (Uranus/Saturn), planets in the 1st house, and sun/moon all modify the "look"; link the sun/moon/rising explainer.
7. <h2>Frequently Asked Questions</h2> — include: "What does an Aquarius rising look like?", "Are Aquarius rising attractive?", "How can you tell if someone is Aquarius rising?", "What is an Aquarius rising woman like?", "Does your rising sign affect your appearance?"
`,
    cta_href: "/birth-chart",
    cta_label: "🔮 See Your Full Chart — Free Birth Chart Reading",
    cta_label_en: "See Your Full Chart — Free Birth Chart Reading",
  },
];

async function fetchExemplar() {
  const { data } = await sb
    .from("mysticai_blog_posts")
    .select("slug,content")
    .in("slug", ["scorpio-rising-personality-traits", "leo-rising-personality-complete-guide"]);
  return (data || [])
    .map((d) => `--- Excerpt from existing site article "${d.slug}" (reference layout & tone only, do not copy) ---\n${d.content.slice(0, 1800)}`)
    .join("\n\n");
}

async function callDeepSeek(spec, exemplar) {
  const prompt = `${LINKS}\n${STYLE_RULES}\n${exemplar}\n\n[TASK]\nTarget page slug: ${spec.slug}\n${spec.brief}\n\n[OUTPUT] Output exactly one JSON object (no prose around it):\n{\n  "reading_time": number (assume ~220 words/min),\n  "content": "the full HTML fragment as a string"\n}`;

  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${DEEPSEEK_KEY}` },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "You are a veteran English astrology columnist with 15 years of professional writing behind you. You output strictly valid JSON only." },
        { role: "user", content: prompt },
      ],
      temperature: 0.85,
      max_tokens: 8000,
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) throw new Error(`DeepSeek HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const json = await res.json();
  const text = json.choices?.[0]?.message?.content || "";
  try {
    return JSON.parse(text);
  } catch {
    const m = text.match(/\{[\s\S]*\}/);
    if (!m) throw new Error("DeepSeek 返回非 JSON：" + text.slice(0, 300));
    return JSON.parse(m[0]);
  }
}

function validate(spec, art) {
  const problems = [];
  const c = art.content || "";
  if (c.includes("<h1")) problems.push("content 含 h1");
  if ((c.match(/<h2/g) || []).length < 4) problems.push("h2 小节不足");
  if (!/frequently asked|faqs/i.test(c)) problems.push("缺少 FAQ 部分");
  if (c.length < 6000) problems.push(`content 偏短（${c.length} 字符）`);
  if (!/aquarius rising/i.test(c)) problems.push("正文未出现 aquarius rising");
  const banned = ["in conclusion", "in today's world", "it's important to note", "delve", "furthermore", "moreover", "cosmic dance", "as an ai"];
  for (const b of banned) if (c.toLowerCase().includes(b)) problems.push(`含AI腔用语「${b}」`);
  if (spec.slug === "aquarius-rising-sign-meaning" && c.includes('href="/blog/aquarius-rising-sign-meaning"')) problems.push("A 自链");
  if (spec.slug === "aquarius-rising-personality-complete" && !c.includes('href="/blog/aquarius-rising-sign-meaning"')) problems.push("B 未链接 A");
  return problems;
}

async function generate() {
  mkdirSync(OUT_DIR, { recursive: true });
  const exemplar = await fetchExemplar();
  for (const spec of ARTICLES) {
    console.log(`\n=== 生成 ${spec.slug} ===`);
    const art = await callDeepSeek(spec, exemplar);
    const problems = validate(spec, art);
    if (problems.length) console.log("  ⚠ 校验提示:", problems.join("；"));
    const patch = {
      reading_time: Math.max(5, Math.round(Number(art.reading_time) || 8)),
      cta_href: spec.cta_href,
      cta_label: spec.cta_label,
      cta_label_en: spec.cta_label_en,
      content: art.content,
      updated_at: new Date().toISOString(),
    };
    if (!spec.keepMeta) Object.assign(patch, spec.newMeta);
    writeFileSync(join(OUT_DIR, `${spec.slug}.json`), JSON.stringify({ slug: spec.slug, patch }, null, 2));
    const words = art.content.replace(/<[^>]+>/g, " ").split(/\s+/).length;
    console.log(`  ✔ 草稿已写入 scripts/out/aquarius-rising/${spec.slug}.json（约 ${words} 词，${patch.reading_time} 分钟）`);
  }
  console.log("\n草稿生成完毕，人工检查后用 --publish 入库。");
}

async function publish() {
  for (const spec of ARTICLES) {
    const file = join(OUT_DIR, `${spec.slug}.json`);
    if (!existsSync(file)) { console.error(`缺少草稿 ${file}，先运行生成。`); continue; }
    const { slug, patch } = JSON.parse(readFileSync(file, "utf8"));
    const { error } = await sb.from("mysticai_blog_posts").update(patch).eq("slug", slug);
    if (error) console.error(`  ✘ ${slug}: ${error.message}`);
    else console.log(`  ✔ 已更新 ${slug}`);
  }
}

PUBLISH ? await publish() : await generate();
