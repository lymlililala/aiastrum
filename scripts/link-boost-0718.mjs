// GSC 0718 内链补强：一次性脚本（幂等，可重复运行）
// 1) 两篇世界杯爆款文末尾加「延伸阅读」导出权重
// 2) 生命灵数 / 上升星座 / 天使数字三个集群互链导航块
// 3) crystals-for-protection 补上漏掉的集群链接
// 用法：node --env-file=.env scripts/link-boost-0718.mjs
import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  process.env.SUPABASE_URL ?? "https://tixgzezefjjsyuzgdhcd.supabase.co",
  process.env.SUPABASE_SECRET_KEY
);

const A = (slug, anchor) => `<a href="/blog/${slug}" class="blog-inline-link">${anchor}</a>`;

// ── 1) 世界杯爆款 → 目标集群 ────────────────────────────────────────────────
const WC_SECTIONS = {
  "zodiac-world-cup-team-personalities": {
    marker: "wc-keep-reading",
    html:
      `<h2>Keep Exploring Your Sign</h2><ul>` +
      `<li>${A("taurus-personality-traits-complete-guide", "Taurus personality traits, strengths and shadow side")} — the deepest Taurus guide on the site</li>` +
      `<li>${A("sun-moon-rising-signs-explained", "What your sun, moon and rising signs actually mean")} — why one sign never tells the whole story</li>` +
      `<li>${A("what-is-my-rising-sign", "How to find your rising sign")} — the placement behind first impressions</li>` +
      `<li>${A("2026-all-zodiac-signs-annual-horoscope", "Your sign's 2026 annual horoscope")} — what the rest of the year holds</li>` +
      `</ul>`,
  },
  "mbti-world-cup-fan-types": {
    marker: "wc-keep-reading",
    html:
      `<h2>Keep Exploring Your Type</h2><ul>` +
      `<li>${A("mbti-zodiac-personality-guide", "How your MBTI type maps onto your zodiac sign")} — two systems, one personality</li>` +
      `<li>${A("mbti-love-compatibility-guide", "MBTI love compatibility")} — which types clash and which click</li>` +
      `<li>${A("mbti-infj-love-patterns-analysis", "How INFJs love")} — a deep dive into one type's relationship patterns</li>` +
      `</ul>`,
  },
};

// ── 2) 集群导航块 ────────────────────────────────────────────────────────────
const SIGNS = ["aries","taurus","gemini","cancer","leo","virgo","libra","scorpio","sagittarius","capricorn","aquarius","pisces"];
const cap = s => s[0].toUpperCase() + s.slice(1);

const CLUSTERS = [
  {
    marker: "lp-cluster-nav",
    slugs: [1,2,3,4,5,6,7,8,9].map(n => `life-path-number-${n}-meaning-guide`),
    heading: "Explore Every Life Path Number",
    items: self =>
      [1,2,3,4,5,6,7,8,9]
        .filter(n => `life-path-number-${n}-meaning-guide` !== self)
        .map(n => `<li>${A(`life-path-number-${n}-meaning-guide`, `Life Path Number ${n}`)}</li>`)
        .join("") +
      `<li>${A("life-path-number-complete-guide", "The complete guide to all life path numbers")}</li>`,
  },
  {
    marker: "rising-cluster-nav",
    slugs: SIGNS.map(s => `${s}-rising-sign-meaning`),
    heading: "Explore Every Rising Sign",
    items: self =>
      SIGNS.filter(s => `${s}-rising-sign-meaning` !== self)
        .map(s => `<li>${A(`${s}-rising-sign-meaning`, `${cap(s)} rising`)}</li>`)
        .join("") +
      `<li>${A("rising-sign-complete-guide", "The complete rising sign guide")}</li>`,
  },
  {
    marker: "angel-cluster-nav",
    slugs: ["111","222","333","444","555","777","888","999","1111"].map(n => `${n}-angel-number-meaning`),
    heading: "Explore Every Angel Number",
    items: self =>
      ["111","222","333","444","555","777","888","999","1111"]
        .filter(n => `${n}-angel-number-meaning` !== self)
        .map(n => `<li>${A(`${n}-angel-number-meaning`, `Angel number ${n}`)}</li>`)
        .join("") +
      `<li>${A("angel-numbers-meaning", "What angel numbers mean, in general")}</li>`,
  },
];

// ── 3) 单点补链 ──────────────────────────────────────────────────────────────
const EXTRA = {
  "crystals-for-protection": {
    marker: "crystal-extra-links",
    html:
      `<p>Once your energetic bases are covered, you might also want to explore ` +
      `${A("crystals-for-abundance-and-money", "crystals for abundance and money")} or match stones to your energy centers with the ` +
      `${A("chakra-crystals-complete-guide", "chakra crystals guide")}.</p>`,
  },
};

const FAQ_H2 = /<h2[^>]*>\s*Frequently Asked Questions\s*<\/h2>/i;

async function patch(slug, marker, html, mode) {
  const { data, error } = await sb.from("mysticai_blog_posts").select("content").eq("slug", marker === "wc-keep-reading" ? slug : slug).maybeSingle();
  if (error || !data) { console.log(`  ✘ ${slug}: ${error?.message ?? "不存在"}`); return; }
  if (data.content.includes(marker)) { console.log(`  – ${slug}（已存在，跳过）`); return; }
  let content = data.content;
  if (mode === "appendEnd") {
    // 插到 </article> 前或文末
    content = content.includes("</article>")
      ? content.replace("</article>", html + "</article>")
      : content + "\n" + html;
  } else {
    // 优先插到 FAQ 之前，否则文末
    const m = FAQ_H2.exec(content);
    content = m ? content.slice(0, m.index) + html + "\n" + content.slice(m.index) : content + "\n" + html;
  }
  const { error: upErr } = await sb.from("mysticai_blog_posts").update({ content, updated_at: new Date().toISOString() }).eq("slug", slug);
  console.log(`  ${upErr ? "✘ " + upErr.message : "✔"} ${slug}`);
}

console.log("① 世界杯爆款导出链接");
for (const [slug, s] of Object.entries(WC_SECTIONS)) await patch(slug, s.marker, `<div id="${s.marker}">${s.html}</div>`, "appendEnd");

console.log("② 集群导航");
for (const c of CLUSTERS) {
  for (const slug of c.slugs) {
    const nav = `<div id="${c.marker}"><h2>${c.heading}</h2><ul>${c.items(slug)}</ul></div>`;
    await patch(slug, c.marker, nav, "beforeFaq");
  }
}

console.log("③ 单点补链");
for (const [slug, s] of Object.entries(EXTRA)) await patch(slug, s.marker, `<div id="${s.marker}">${s.html}</div>`, "beforeFaq");
