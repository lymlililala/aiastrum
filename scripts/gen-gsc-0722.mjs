// GSC 0722 批量文章优化生成器
// 用法：
//   node --env-file=.env scripts/gen-gsc-0722.mjs --batch=1              # 生成第1批草稿
//   node --env-file=.env scripts/gen-gsc-0722.mjs --batch=1 --publish    # 发布第1批
import { createClient } from "@supabase/supabase-js";
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { SPECS, LINK_POOL } from "./gsc-0722-specs.mjs";

const SUPABASE_URL = "https://tixgzezefjjsyuzgdhcd.supabase.co";
const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY;
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY;
const OUT_DIR = new URL("./out/gsc-0722/", import.meta.url).pathname;
const BATCH = Number((process.argv.find((a) => a.startsWith("--batch=")) || "--batch=1").split("=")[1]);
const PUBLISH = process.argv.includes("--publish");
const ONLY = (process.argv.find((a) => a.startsWith("--only=")) || "").split("=")[1] || null;
const TODAY = "2026-07-22";

if (!DEEPSEEK_KEY) { console.error("缺少 DEEPSEEK_API_KEY"); process.exit(1); }
if (!SUPABASE_KEY) { console.error("缺少 SUPABASE_SECRET_KEY"); process.exit(1); }
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const STYLE_EN = `
[Writing style — MOST IMPORTANT: must read like a human writer, not AI]
- Voice: a seasoned English-language writer on this topic (astrology / tarot / numerology / dreams / crystals). Warm, direct, conversational; talk to the reader as "you".
- STRICTLY BANNED phrases: "In conclusion", "In today's world", "It's important to note", "It is worth noting", "delve", "furthermore", "moreover", "firstly/secondly", "In summary", "Let's explore", "embark on", "navigate the", "tapestry", "cosmic dance", "unlock the", "journey of self-discovery awaits".
- Vary paragraph length: some one-sentence paragraphs, some three-four sentences. Never template every section the same way.
- Concrete specifics over vague adjectives: real-life situations (first dates, job interviews, 3am wake-ups), sensory details.
- Occasional rhetorical questions, short punchy lines, parenthetical asides are welcome.
- No fake statistics. No invented celebrity examples stated as fact. Frame folklore/tradition as tradition ("astrologers read this as...", "in the crystal tradition..."), never as medical/scientific fact. No medical or mental-health claims — suggest professional help where genuinely relevant.
- Never write "this article", "as an AI", or hint the text was generated.
- American English spelling.

[HTML format — hard requirements]
- Output an HTML fragment: opens with an intro <p> (2-4 sentences, NO heading before it); NEVER any <h1>.
- Sections <h2>, sub-points <h3>, lists <ul><li> with <strong> lead-ins.
- End with <h2>Frequently Asked Questions</h2> followed by 4-6 pairs of <h3>question</h3><p>answer (2-4 sentences)</p>.
- Escape apostrophes as &#39; in HTML text.
- Length: 1,600-2,300 words.
- Weave the target queries into the text naturally (especially the primary query — exact match once in the intro or an early h2 if it reads naturally; never stuff).
- Include 4-7 internal links from the provided list (format: <a href="/blog/SLUG" class="blog-inline-link">natural anchor</a>), spread across the body, one per section max.`;

const STYLE_ZH = `
【写作风格——最重要：读起来像真人专栏作者，不能像AI】
- 口吻：资深中文身心成长专栏作者，温和务实、有观点、偶尔口语化。
- 严禁AI腔：首先/其次/再者/最后（列举连词）、总而言之、综上所述、值得注意的是、总的来说、不难看出、让我们一起。
- 段落长短不齐；多用具体场景细节；允许设问句、短句、括号补充。
- 不夸大疗效，不写医疗承诺（冥想助眠等表述用"很多人反馈""研究提示"这类克制说法）。
- 不提"本文""作为AI"。
【HTML 硬性要求】
- 开头直接引言 <p>（2-4句），绝不出现 <h1>；小节 <h2>，子节 <h3>，列表 <ul><li>（重点词 <strong>）。
- 结尾 <h2>常见问题</h2> + 4-6 组 <h3>问题</h3><p>回答（2-4句）</p>。
- 全文 2000-3000 字；自然融入目标搜索词；内链 3-5 条（<a href="/blog/SLUG" class="blog-inline-link">自然锚文本</a>）。`;

function linkList(spec) {
  const items = spec.links.map((k) => {
    const v = LINK_POOL[k];
    if (!v) throw new Error(`未知链接键 ${k} (${spec.slug})`);
    return `- ${v[0]}  (锚文本参考: "${v[1]}")`;
  });
  return `可用内链（只用此列表里的 URL）：\n${items.join("\n")}\n规则：不得链接本文自身 slug /blog/${spec.slug}；锚文本要自然，不要"click here/点击这里"。`;
}

async function fetchExemplars() {
  const { data } = await sb
    .from("mysticai_blog_posts")
    .select("slug,content")
    .in("slug", ["aquarius-rising-sign-meaning", "susan-miller-2026-horoscope-analysis"]);
  const en = data?.find((d) => d.slug === "aquarius-rising-sign-meaning");
  const zh = data?.find((d) => d.slug === "susan-miller-2026-horoscope-analysis");
  return {
    en: en ? `--- 站内优质英文文章片段（参考排版语气，勿照抄）---\n${en.content.slice(0, 1500)}` : "",
    zh: zh ? `--- 站内优质中文文章片段（参考排版语气，勿照抄）---\n${zh.content.slice(0, 1500)}` : "",
  };
}

async function callDeepSeek(spec, exemplar) {
  const isZh = spec.lang === "zh";
  const style = isZh ? STYLE_ZH : STYLE_EN;
  const outlineText = spec.outline.map((s, i) => `${i + 1}. ${s}`).join("\n");
  const prompt = `${linkList(spec)}\n${style}\n${isZh ? exemplar.zh : exemplar.en}\n\n【任务】\n页面 slug：${spec.slug}\n目标搜索词（按优先级）：${spec.queries.join("、")}\n文章大纲（按此结构写，小节标题可润色但要点都要覆盖）：\n${outlineText}\n\n【输出】严格输出一个 JSON 对象（不要任何额外文字）：\n{\n  "reading_time": 数字（${isZh ? "中文按300字/分钟" : "英文按220词/分钟"}）,\n  "content": "完整HTML片段字符串"\n}`;

  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${DEEPSEEK_KEY}` },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: isZh ? "你是写了十年身心成长专栏的资深中文作者。只输出严格合法的 JSON。" : "You are a veteran writer with 15 years publishing on astrology, tarot and spiritual topics. You output strictly valid JSON only." },
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
  try { return JSON.parse(text); } catch {
    const m = text.match(/\{[\s\S]*\}/);
    if (!m) throw new Error("非 JSON 返回：" + text.slice(0, 200));
    return JSON.parse(m[0]);
  }
}

function validate(spec, art) {
  const problems = [];
  const c = art.content || "";
  const isZh = spec.lang === "zh";
  if (c.includes("<h1")) problems.push("含 h1");
  if ((c.match(/<h2/g) || []).length < 3) problems.push("h2 不足");
  if (!/frequently asked|常见问题/i.test(c)) problems.push("缺 FAQ");
  if (c.includes(`/blog/${spec.slug}"`)) problems.push("自链");
  const text = c.replace(/<[^>]+>/g, " ");
  if (isZh) {
    if (text.replace(/\s/g, "").length < 1600) problems.push("偏短");
    for (const b of ["首先", "总而言之", "综上所述", "值得注意的是"]) if (c.includes(b)) problems.push(`AI腔「${b}」`);
  } else {
    const words = text.split(/\s+/).filter(Boolean).length;
    if (words < 1100) problems.push(`偏短(${words}词)`);
    for (const b of ["in conclusion", "in today's world", "it's important to note", "delve", "furthermore", "moreover", "cosmic dance", "as an ai"])
      if (c.toLowerCase().includes(b)) problems.push(`AI腔「${b}」`);
    if (!text.toLowerCase().includes(spec.queries[0].toLowerCase().split(" ")[0])) problems.push("未含主词");
  }
  return problems;
}

async function generate() {
  mkdirSync(OUT_DIR, { recursive: true });
  const exemplar = await fetchExemplars();
  const specs = SPECS.filter((s) => s.batch === BATCH && (!ONLY || s.slug === ONLY));
  console.log(`批次 ${BATCH}：${specs.length} 篇`);
  for (const spec of specs) {
    process.stdout.write(`  生成 ${spec.slug} ... `);
    try {
      const art = await callDeepSeek(spec, exemplar);
      const problems = validate(spec, art);
      const draft = {
        slug: spec.slug,
        isNew: !!spec.isNew,
        meta: {
          ...(spec.title ? { title: spec.title } : {}),
          ...(spec.description ? { description: spec.description } : {}),
          ...(spec.keywords ? { keywords: spec.keywords } : {}),
          ...(spec.category ? { category: spec.category } : {}),
        },
        row: {
          reading_time: Math.max(5, Math.round(Number(art.reading_time) || 8)),
          cta_href: spec.cta[0],
          cta_label: spec.cta[1],
          cta_label_en: spec.cta[2],
          content: art.content,
        },
      };
      writeFileSync(join(OUT_DIR, `${spec.slug}.json`), JSON.stringify(draft, null, 2));
      const w = spec.lang === "zh" ? art.content.replace(/<[^>]+>/g, "").length + "字" : art.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length + "词";
      console.log(`✔ ${w}${problems.length ? "  ⚠ " + problems.join("；") : ""}`);
    } catch (e) {
      console.log(`✘ ${e.message}`);
    }
  }
  console.log(`批次 ${BATCH} 草稿完成 → ${OUT_DIR}`);
}

async function publish() {
  const specs = SPECS.filter((s) => s.batch === BATCH && (!ONLY || s.slug === ONLY));
  for (const spec of specs) {
    const file = join(OUT_DIR, `${spec.slug}.json`);
    if (!existsSync(file)) { console.log(`  跳过 ${spec.slug}（无草稿）`); continue; }
    const draft = JSON.parse(readFileSync(file, "utf8"));
    const patch = { ...draft.meta, ...draft.row, updated_at: new Date().toISOString() };
    let error;
    if (draft.isNew) {
      const { data: existing } = await sb.from("mysticai_blog_posts").select("slug").eq("slug", spec.slug).maybeSingle();
      const full = {
        slug: spec.slug, lang: spec.lang, published_at: TODAY,
        title: spec.title, description: spec.description, keywords: spec.keywords,
        category: spec.category || "astro", title_en: spec.title,
        ...patch,
      };
      ({ error } = await sb.from("mysticai_blog_posts").upsert(full, { onConflict: "slug" }));
    } else {
      ({ error } = await sb.from("mysticai_blog_posts").update(patch).eq("slug", spec.slug));
    }
    console.log(`  ${error ? "✘ " + spec.slug + ": " + error.message : "✔ " + spec.slug}`);
  }
}

PUBLISH ? await publish() : await generate();
