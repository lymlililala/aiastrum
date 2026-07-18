// 生成「天蠍座運勢2026」繁體中文文章（參照 2026-second-half-zodiac-horoscope 的先例：繁體查詢配繁體專頁）
// 用法：
//   node --env-file=.env scripts/gen-scorpio-2026-tw.mjs            # 草稿到 scripts/out/scorpio-2026-tw/
//   node --env-file=.env scripts/gen-scorpio-2026-tw.mjs --publish  # 入库
import { createClient } from "@supabase/supabase-js";
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const SUPABASE_URL = "https://tixgzezefjjsyuzgdhcd.supabase.co";
const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY;
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY;
const OUT_DIR = new URL("./out/scorpio-2026-tw/", import.meta.url).pathname;
const PUBLISH = process.argv.includes("--publish");
const SLUG = "2026-scorpio-annual-horoscope-tw";
const TODAY = "2026-07-18";

if (!DEEPSEEK_KEY) { console.error("缺少 DEEPSEEK_API_KEY"); process.exit(1); }
if (!SUPABASE_KEY) { console.error("缺少 SUPABASE_SECRET_KEY"); process.exit(1); }
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const ASTRO_2026 = `
2026年真實星象（必須以此為準，不得編造其他行星座相；對天蠍座採用太陽星座宮位制）：
- 木星：上半年在巨蟹座（至6月30日，天蠍的太陽第九宮，與天蠍成三合吉相），6月30日進入獅子座（天蠍的太陽第十宮事業宮）。
- 土星：2月14日正式進入白羊座（天蠍的太陽第六宮：健康、工作日常），全年在白羊座。
- 海王星：1月26日正式進入白羊座（同為第六宮）。
- 天王星：4月26日正式進入雙子座（天蠍的太陽第八宮：共同財務、親密關係、保險稅務）。
- 冥王星：全年在水瓶座（天蠍的太陽第四宮：家庭、根基），冥王星是天蠍座的現代守護星。
- 日月食：2月17日水瓶座日食（第四宮）、3月3日處女座月食（第十一宮）、8月12日獅子座日食（第十宮）、8月28日雙魚座月食（第五宮：戀愛、創作、子女）。
- 水星逆行：2月26日-3月20日（雙魚座，第五宮）、6月29日-7月23日（巨蟹座，第九宮）、10月24日-11月13日（天蠍座，本命宮——對天蠍影響最直接的一次）。
- 金星逆行：10月3日-11月14日，從天蠍座逆回天秤座——天蠍座是本次金逆的重災區/主角，感情與金錢容易翻舊帳。
- 火星：2026年全年不逆行。
- 2026年為農曆丙午馬年（2026年2月17日起）。
`;

const LINKS = `
站內已有相關文章，正文中自然穿插 4-6 個內鏈（<a href="/blog/<slug>" class="blog-inline-link">錨文本</a>，錨文本自然，繁體書寫）：
- /blog/2026-second-half-zodiac-horoscope  《2026下半年運勢｜十二星座＋生肖流年》（繁體，提到下半年時優先鏈它）
- /blog/2026-scorpio-annual-horoscope  《2026年天蝎座全年运势》（簡體姊妹篇，可在文末自然提到「習慣看簡體的讀者」時鏈）
- /blog/2026-all-zodiac-signs-annual-horoscope  《2026年十二星座全年运势总览》（簡體）
- /blog/zodiac-monthly-fortune-2026-overview  《2026年十二星座月度运势概览》（簡體）
- /blog/scorpio-love-compatibility-guide-chinese  《天蝎座恋爱配对完全指南》（簡體，感情段落可鏈）
- /blog/mercury-retrograde-2026  《2026年水星逆行时间表》（簡體，講到10-11月天蠍水逆時可鏈）
`;

const STYLE_RULES = `
【寫作風格要求——最重要：讀起來要像台灣/香港資深星座專欄作家寫的，不能像AI】
- 全文使用繁體中文（台灣用語習慣，如「網路」「軟體」「品質」「透過」，避免大陸用語如「網絡」「視頻」「信息」）。
- 口吻：有觀點、有溫度、偶爾口語，像跟讀者聊天，不是寫報告。
- 嚴禁AI腔詞語：首先/其次/再者/最後（作列舉連詞）、總而言之、綜上所述、值得注意的是、總的來說、不難看出、讓我們一起。
- 段落長短不齊：有的一句話，有的三四句。不要每節都套用相同模板。
- 多用具體細節：具體日期（如「10月24日水逆進天蠍前後一週」）、具體場景（談加薪、簽約、見家長、搬家），少用空泛形容詞。
- 允許設問句、短句、括號補充。不要每段都以「天蠍座」開頭。
- 運勢判斷必須有星象依據（引用上面給的真實星象），語氣溫和務實，不恐嚇、不誇大。
- 不杜撰名人名言、不編統計數據、不提「本文」「作為AI」。

【HTML 格式硬性要求】
- 輸出是 HTML 片段：開頭直接是引言 <p>（2-4句，前面不要任何標題），絕不出現 <h1>。
- 小節用 <h2>，子節用 <h3>，列表用 <ul><li>（重點詞可用 <strong>）。
- 全文 2200-3200 字（繁體中文）。
- 結尾必須有 <h2>常見問題</h2>，下面 4-5 組 <h3>問題</h3><p>回答（2-4句）</p>，問題要是台灣讀者真的會搜的長尾問題（如「天蠍座2026年運勢如何」「天蠍座2026幾月最旺」「2026金星逆行對天蠍座的影響」）。
- 引號用繁體中文習慣「」，避免轉義問題。
`;

const BRIEF = `
【本次任務】
目標搜尋詞：「天蠍座運勢2026」（台灣用戶搜尋，繁體查詢）
標題必須以「天蠍座運勢2026」開頭或完整包含它，例如《天蠍座運勢2026完整解析：事業、愛情、財運全年重點與最旺月份》。
寫一篇天蠍座2026年全年運勢深度文章。搜尋者想看：今年整體如何、事業/感情/財運/健康分項、哪幾個月最旺、要注意什麼。
結構建議（可微調）：
1. 引言：2026對天蠍的基調——上半年木星在巨蟹（同為水象，三合加持）是舒服的擴張期，6月底木星進獅子進入事業宮，下半年轉為事業衝刺；而10-11月金星逆行＋水星逆行都落在天蠍本命宮，是全年最需要穩住的時段。
2. <h2>2026整體運勢：先甜後衝刺，年底練功</h2> 或類似，把全年主線講清楚。
3. <h2>事業運</h2>：6月30日木星進第十宮後曝光度大增，8月12日獅子座日食前後可能有職位變動；土星進第六宮意味工作日常變重，注意過勞。
4. <h2>愛情運</h2>：8月28日雙魚座月食點亮第五宮（戀愛宮），單身者夏秋有機會；10月3日-11月14日金星逆行從天蠍逆回天秤——舊情人回頭、翻舊帳的高峰期，給具體建議（這段時間不適合倉促復合或分手，等11月中順行後再決定）。
5. <h2>財運</h2>：天王星4月底進第八宮（共同財務），合夥、投資、保險、稅務可能有突發變化；不適合高槓桿操作。
6. <h2>健康運</h2>：土星海王星同進第六宮，慢性病、睡眠、免疫系統要留意；3月處女座月食前後適合安排體檢。
7. <h2>2026最旺與最要注意的月份</h2>（<ul>：最旺3-6月木星三合、8月日食後事業起飛；最需注意10-11月金逆水逆疊加、2-3月水逆在戀愛宮）
8. <h2>常見問題</h2>。

【輸出格式】嚴格輸出一個 JSON 物件（不要任何額外文字）：
{
  "title": "標題（28字以內，開頭或完整包含「天蠍座運勢2026」）",
  "description": "meta description，50-90字繁體，自然包含「天蠍座運勢2026」，像編輯寫的，不堆砌關鍵字",
  "reading_time": 數字（按300字/分鐘估）,
  "content": "完整HTML片段字串"
}`;

async function fetchExemplar() {
  const { data } = await sb
    .from("mysticai_blog_posts")
    .select("slug,content")
    .eq("slug", "2026-second-half-zodiac-horoscope")
    .single();
  return data ? `--- 站內繁體文章《${data.slug}》片段（參考排版與語氣，不要照抄）---\n${data.content.slice(0, 1800)}` : "";
}

async function callDeepSeek(exemplar) {
  const prompt = `${ASTRO_2026}\n${LINKS}\n${STYLE_RULES}\n${exemplar}\n\n${BRIEF}`;
  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${DEEPSEEK_KEY}` },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "你是一位在台灣寫了十年星座專欄的資深作家，也是專業占星師。你只輸出嚴格合法的 JSON，全部使用繁體中文。" },
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
    if (!m) throw new Error("DeepSeek 返回非 JSON：" + text.slice(0, 300));
    return JSON.parse(m[0]);
  }
}

function validate(art) {
  const problems = [];
  if (!art.title || !art.title.includes("天蠍")) problems.push("標題不含「天蠍」");
  if (art.title && !art.title.includes("2026")) problems.push("標題不含 2026");
  if (!art.description || art.description.length < 40) problems.push("description 缺失或過短");
  const c = art.content || "";
  if (c.includes("<h1")) problems.push("content 含 h1");
  if ((c.match(/<h2/g) || []).length < 4) problems.push("h2 小節不足");
  if (!/常見問題/.test(c)) problems.push("缺少常見問題部分");
  if (c.replace(/<[^>]+>/g, "").length < 1800) problems.push("正文偏短");
  if (/天蝎|运势|网络|视频|信息/.test(c)) problems.push("混入簡體字或大陸用語");
  for (const b of ["首先", "其次", "總而言之", "綜上所述", "值得注意的是", "作為AI"])
    if (c.includes(b)) problems.push(`含AI腔用語「${b}」`);
  return problems;
}

async function generate() {
  mkdirSync(OUT_DIR, { recursive: true });
  const exemplar = await fetchExemplar();
  console.log(`=== 生成 ${SLUG}（目標詞：天蠍座運勢2026）===`);
  const art = await callDeepSeek(exemplar);
  const problems = validate(art);
  if (problems.length) console.log("  ⚠ 校驗提示:", problems.join("；"));
  const row = {
    slug: SLUG,
    category: "horoscope",
    lang: "zh",
    title: art.title,
    title_en: "Scorpio Horoscope 2026: Career, Love & Money Forecast (Traditional Chinese)",
    description: art.description,
    keywords: ["天蠍座運勢2026", "天蠍座2026運勢", "2026天蠍座運勢", "天蠍座2026愛情", "天蠍座2026事業", "天蠍座2026財運", "天蠍座2026年下半年運勢", "天蝎座运势2026", "天蠍座運勢", "2026年天蠍座"],
    published_at: TODAY,
    reading_time: Math.max(6, Math.round(Number(art.reading_time) || 9)),
    cta_href: "/horoscope",
    cta_label: "🌌 查看你的天蠍座本週詳細運勢",
    cta_label_en: "Check Your Scorpio Weekly Horoscope",
    content: art.content,
  };
  writeFileSync(join(OUT_DIR, `${SLUG}.json`), JSON.stringify(row, null, 2));
  console.log(`  ✔ 草稿已寫入 scripts/out/scorpio-2026-tw/${SLUG}.json（正文 ${row.content.length} 字符）`);
}

async function publish() {
  const file = join(OUT_DIR, `${SLUG}.json`);
  if (!existsSync(file)) { console.error("缺少草稿，先運行生成。"); process.exit(1); }
  const row = JSON.parse(readFileSync(file, "utf8"));
  const { error } = await sb.from("mysticai_blog_posts").upsert(row, { onConflict: "slug" });
  if (error) { console.error(`  ✘ ${error.message}`); process.exit(1); }
  console.log(`  ✔ 已入庫 ${SLUG}  《${row.title}》`);

  // 简体姊妹篇末尾加一条互链（若尚无）
  const { data: simp } = await sb.from("mysticai_blog_posts").select("content").eq("slug", "2026-scorpio-annual-horoscope").single();
  if (simp && !simp.content.includes(SLUG)) {
    const add = `\n<p>習慣看繁體中文？這裡有繁體完整版：<a href="/blog/${SLUG}" class="blog-inline-link">天蠍座運勢2026完整解析</a>。</p>`;
    const { error: e2 } = await sb.from("mysticai_blog_posts")
      .update({ content: simp.content + add, updated_at: new Date().toISOString() })
      .eq("slug", "2026-scorpio-annual-horoscope");
    console.log(e2 ? `  ⚠ 簡體篇互鏈失敗: ${e2.message}` : "  ✔ 簡體篇已加繁體互鏈");
  } else {
    console.log("  - 簡體篇互鏈已存在，跳過");
  }
}

PUBLISH ? await publish() : await generate();
