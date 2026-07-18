// 生成「相关搜索词」缺口文章（DeepSeek）：
//   1) 2026星座运势排行        -> 2026-zodiac-fortune-ranking
//   2) 苏珊2026年12星座运势分析 -> susan-miller-2026-horoscope-analysis
// 用法：
//   node --env-file=.env scripts/gen-related-search-2026.mjs            # 生成草稿到 scripts/out/related-search-2026/
//   node --env-file=.env scripts/gen-related-search-2026.mjs --publish  # 把草稿 upsert 到 mysticai_blog_posts
import { createClient } from "@supabase/supabase-js";
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const SUPABASE_URL = "https://tixgzezefjjsyuzgdhcd.supabase.co";
const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY;
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY;
const OUT_DIR = new URL("./out/related-search-2026/", import.meta.url).pathname;
const PUBLISH = process.argv.includes("--publish");
const TODAY = "2026-07-18";

if (!DEEPSEEK_KEY) { console.error("缺少 DEEPSEEK_API_KEY"); process.exit(1); }
if (!SUPABASE_KEY) { console.error("缺少 SUPABASE_SECRET_KEY"); process.exit(1); }
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

// 2026 年真实星象（写进 prompt，避免模型编错）
const ASTRO_2026 = `
2026年真实星象背景（必须以此为准，不得编造其它行星座相）：
- 木星：上半年在巨蟹座（至6月30日），6月30日进入狮子座，停留到2027年中。
- 土星：2月14日正式进入白羊座，全年在白羊座。
- 海王星：1月26日正式进入白羊座，全年在白羊座。
- 天王星：4月26日正式进入双子座，全年在双子座。
- 冥王星：全年在水瓶座。
- 日月食：2月17日水瓶座日食、3月3日处女座月食、8月12日狮子座日食、8月28日双鱼座月食。
- 水星逆行：2月26日-3月20日（双鱼座）、6月29日-7月23日（巨蟹座）、10月24日-11月13日（天蝎座）。
- 金星逆行：10月3日-11月14日（天蝎座逆行回天秤座）。
- 火星：2026年全年不逆行。
- 2026年为农历丙午马年（2026年2月17日起）。
`;

// 可内链的站内文章（cluster）
const LINKS = `
站内已有相关文章，正文中自然穿插 4-6 个内链（<a href="/blog/<slug>" class="blog-inline-link">锚文本</a>，锚文本要自然，不要都用"点击这里"）：
- /blog/2026-all-zodiac-signs-annual-horoscope  《2026年十二星座全年运势总览》
- /blog/2026-second-half-zodiac-horoscope  《2026下半年运势｜十二星座＋生肖流年》（繁体，适合提到下半年时链接）
- /blog/zodiac-monthly-fortune-2026-overview  《2026年十二星座月度运势概览》
- /blog/2026-monthly-forecast-all-signs  《2026年12星座月运完全指南》
- /blog/2026-cancer-annual-horoscope  《2026年巨蟹座全年运势》
- /blog/2026-aries-annual-horoscope  《2026年白羊座全年运势》
- /blog/libra-2026-horoscope  《天秤座2026年运势》
- /blog/virgo-2026-horoscope  《处女座2026年运势》
- /blog/mercury-retrograde-2026  《2026年水星逆行时间表》
`;

const STYLE_RULES = `
【写作风格要求——最重要，目标是读起来像真人专栏作者写的，不能像AI】
- 用资深中文星座专栏作者的口吻：有观点、有温度、偶尔口语化，像在跟读者聊天，而不是写报告。
- 严禁使用这些AI腔词语：首先/其次/再者/最后（作列举连词）、总而言之、综上所述、值得注意的是、总的来说、不难看出、让我们一起、在当今社会。
- 段落长短要参差不齐：有的段落一句话，有的三四句。不要用"总-分-总"模板套每一节。
- 多用具体细节：具体日期（如"3月3日处女座月食前后一周"）、具体场景（如"谈薪""搬家""见家长"），少用空泛形容词。
- 允许设问句、短句、偶尔的括号补充。不要每段都以星座名开头。
- 运势判断必须有星象依据（引用上面给的真实星象），语气温和务实，不恐吓、不夸大。
- 不要杜撰名人名言，不要编造统计数据。
- 正文中不要出现"作为AI""本文"等字眼。

【HTML 格式硬性要求】
- 输出是一个 HTML 片段：开头直接是一段引言 <p>（2-4句，不要任何标题），绝对不要出现 <h1>。
- 小节用 <h2>，子节用 <h3>，列表用 <ul><li>（重点词可用 <strong>）。
- 全文 2500-4000 字（中文）。
- 结尾必须有 FAQ 部分：<h2>常见问题</h2>（或含"常见问题"字样），下面 4-5 组 <h3>问题</h3><p>回答</p>，问题要是真实用户会搜的长尾问题，回答 2-4 句。
- 所有单引号、双引号在 HTML 中用中文引号「」或直接中文引号，避免转义问题。
`;

const ARTICLES = [
  {
    slug: "2026-zodiac-fortune-ranking",
    category: "horoscope",
    targetKeyword: "2026星座运势排行",
    titleHint: "标题必须包含「2026」和「星座运势排行」或「排名」，例如《2026星座运势排行：12星座年度总运排名，谁挤进前三？》",
    brief: `
写一篇「2026年12星座运势排行榜」文章，搜索者想看的就是：2026年哪个星座运势最好、自己排第几。
结构建议（可微调）：
1. 引言：说明排名依据（木星、土星、日月食等真实星象），别端着。
2. <h2>总运排行榜：按 1-12 名给出总运排名，每个星座一段点评（2-4句，点出旺在哪里、要注意什么）。排名要有明确依据：2026年木星上半年入巨蟹、下半年入狮子，土星海王星入白羊，天王星入双子，这些是排名的核心逻辑。
3. <h2>分项榜单：事业运前三、财运前三、爱情运前三（可用 <ul><li>，每项一句话点评）。
4. <h2>「排名靠后怎么办」一节：给排名后段的星座实在的应对建议，别让读者看完难受。
5. 常见问题 FAQ。
`,
    cta_href: "/horoscope",
    cta_label: "🌌 查看你的星座本周详细运势",
    cta_label_en: "Check Your Sign's Weekly Horoscope",
  },
  {
    slug: "susan-miller-2026-horoscope-analysis",
    category: "horoscope",
    targetKeyword: "苏珊2026年12星座运势分析",
    titleHint: "标题必须包含「苏珊」（可用「苏珊·米勒」或「苏珊米勒」）和「2026年12星座运势分析」，例如《苏珊米勒2026年12星座运势分析：重点星象与逐座年度解读》",
    brief: `
搜索「苏珊2026年12星座运势分析」的人，多半是想看苏珊·米勒（Susan Miller）式的年度星座深度分析。写一篇满足这个需求的文章，但必须诚实：
- 引言第一段就要自然说明：苏珊·米勒本人的官方运势发布在她的网站 Astrology Zone，本站不转载她的原文；这篇文章是我们占星团队参考同样「重点星象+逐座深读」的路子，为中文读者做的2026年12星座年度分析。语气自然，不要写成免责声明。
- 可以用一小节 <h2> 介绍苏珊·米勒的风格为什么受欢迎（月度长文、具体日期、温和务实），并说明本文借鉴这种写法。
- 主体：<h2>2026年三个最重要的星象（土星海王星入白羊、木星换座巨蟹→狮子、天王星入双子），每个写清影响；然后 <h2> 逐座分析，每个星座一个 <h3>（12个），每座 120-180 字：年度主题、最旺的月份（用真实星象推）、一个具体提醒。写法学习苏珊式：给具体月份、具体生活场景、语气温和直接。
- 常见问题 FAQ（可包含「苏珊米勒2026年运势在哪里看」这类问题，回答里说明官方渠道是 Astrology Zone 及她的 App）。
`,
    cta_href: "/horoscope",
    cta_label: "🌌 查看你的星座本周运势（免费）",
    cta_label_en: "Check Your Weekly Horoscope Free",
  },
];

async function fetchExemplar() {
  const { data } = await sb
    .from("mysticai_blog_posts")
    .select("slug,content")
    .in("slug", ["2026-cancer-annual-horoscope", "2026-all-zodiac-signs-annual-horoscope"]);
  return (data || [])
    .map((d) => `--- 站内文章《${d.slug}》片段（参考排版与语气，不要照抄内容）---\n${d.content.slice(0, 1600)}`)
    .join("\n\n");
}

async function callDeepSeek(spec, exemplar) {
  const prompt = `${ASTRO_2026}\n${LINKS}\n${STYLE_RULES}\n${exemplar}\n\n【本次任务】\n目标搜索词：「${spec.targetKeyword}」\n${spec.titleHint}\n${spec.brief}\n\n【输出格式】严格输出一个 JSON 对象（不要 markdown 代码块包裹以外的任何文字），字段：\n{\n  "title": "文章标题（25字以内，含目标关键词核心词）",\n  "title_en": "英文标题（用于SEO，自然即可）",\n  "description": "meta description，50-90字，含目标关键词，写得像编辑写的，不要罗列关键词",\n  "keywords": ["8-12个关键词的数组，第一个必须是目标关键词「${spec.targetKeyword}」"],\n  "reading_time": 数字（按300字/分钟估）,\n  "content": "完整HTML片段字符串"\n}`;

  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${DEEPSEEK_KEY}` },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "你是一位写了十年星座专栏的资深中文作者，也是专业占星师。你只输出严格合法的 JSON。" },
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
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    const m = text.match(/\{[\s\S]*\}/);
    if (!m) throw new Error("DeepSeek 返回非 JSON：" + text.slice(0, 300));
    parsed = JSON.parse(m[0]);
  }
  return parsed;
}

function validate(spec, art) {
  const problems = [];
  if (!art.title || art.title.length > 40) problems.push("title 缺失或过长");
  if (!art.title.includes("2026")) problems.push("title 不含 2026");
  if (!art.description || art.description.length < 40) problems.push("description 缺失或过短");
  if (!Array.isArray(art.keywords) || art.keywords.length < 5) problems.push("keywords 不足");
  const c = art.content || "";
  if (c.includes("<h1")) problems.push("content 含 h1");
  if ((c.match(/<h2/g) || []).length < 3) problems.push("h2 小节不足");
  if (!/常见问题|FAQ/i.test(c)) problems.push("缺少 FAQ 部分");
  if (c.length < 4000) problems.push(`content 偏短（${c.length} 字符）`);
  for (const banned of ["首先", "其次", "总而言之", "综上所述", "值得注意的是", "作为AI", "作为人工智能"])
    if (c.includes(banned)) problems.push(`含AI腔用语「${banned}」`);
  return problems;
}

async function generate() {
  mkdirSync(OUT_DIR, { recursive: true });
  const exemplar = await fetchExemplar();
  for (const spec of ARTICLES) {
    console.log(`\n=== 生成 ${spec.slug}（目标词：${spec.targetKeyword}）===`);
    const art = await callDeepSeek(spec, exemplar);
    const problems = validate(spec, art);
    if (problems.length) console.log("  ⚠ 校验提示:", problems.join("；"));
    const row = {
      slug: spec.slug,
      category: spec.category,
      lang: "zh",
      title: art.title,
      title_en: art.title_en || "",
      description: art.description,
      keywords: art.keywords,
      published_at: TODAY,
      reading_time: Math.max(6, Math.round(Number(art.reading_time) || 10)),
      cta_href: spec.cta_href,
      cta_label: spec.cta_label,
      cta_label_en: spec.cta_label_en,
      content: art.content,
    };
    writeFileSync(join(OUT_DIR, `${spec.slug}.json`), JSON.stringify(row, null, 2));
    console.log(`  ✔ 草稿已写入 scripts/out/related-search-2026/${spec.slug}.json（正文 ${row.content.length} 字符，约 ${row.reading_time} 分钟）`);
  }
  console.log("\n草稿生成完毕，人工检查后用 --publish 入库。");
}

async function publish() {
  for (const spec of ARTICLES) {
    const file = join(OUT_DIR, `${spec.slug}.json`);
    if (!existsSync(file)) { console.error(`缺少草稿 ${file}，先运行生成。`); continue; }
    const row = JSON.parse(readFileSync(file, "utf8"));
    const { error } = await sb.from("mysticai_blog_posts").upsert(row, { onConflict: "slug" });
    if (error) console.error(`  ✘ ${spec.slug}: ${error.message}`);
    else console.log(`  ✔ 已入库 ${spec.slug}  《${row.title}》`);
  }
}

PUBLISH ? await publish() : await generate();
