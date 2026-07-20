// ─── GSC 0720 文章 meta 精确匹配优化 · 第二批(0713-0719 数据驱动)────────────
// 集群:MBTI 各型 love / 风水卧室爱情 / cancer+scorpio 2026 年运 / tarot 决策 / 莉莉丝
// 用法:DRY=1 预览;node scripts/optimize-meta-0720-b2.mjs 正式写库(需 .env 中 SUPABASE_SECRET_KEY)
import { createClient } from "@supabase/supabase-js";

const SECRET = process.env.SUPABASE_SECRET_KEY;
const DRY = process.env.DRY === "1";
if (!SECRET && !DRY) { console.error("缺少 SUPABASE_SECRET_KEY"); process.exit(1); }
const supabase = SECRET ? createClient("https://tixgzezefjjsyuzgdhcd.supabase.co", SECRET) : null;

const TARGETS = [
  // ── MBTI 各型 love 集群(enfp/estp/isfj 修复 slug 派生的废 keywords;istj/infp 补长尾)──
  {
    slug: "mbti-enfp-love-patterns-analysis", lang: "en",
    title: "ENFP in Love: Relationships, Crushes & Best Matches",
    description: "ENFP love decoded: how the enthusiastic idealist falls in love, relationship patterns, core needs, red flags, and ENFP compatibility with all 16 personality types.",
    keywords: ["enfp love", "enfp in love", "enfp relationships", "enfp compatibility", "enfp best match", "enfp love patterns"],
  },
  {
    slug: "mbti-estp-love-patterns-analysis", lang: "en",
    title: "ESTP in Love: Relationships & Best Matches",
    description: "ESTP love decoded: how the entrepreneur personality type behaves in relationships, commitment style, core needs, and ESTP compatibility with all 16 types.",
    keywords: ["estp love", "estp in love", "estp relationships", "estp compatibility", "estp best match", "estp love patterns"],
  },
  {
    slug: "mbti-isfj-love-patterns-analysis", lang: "en",
    title: "ISFJ in Love: Relationships & Compatibility",
    description: "ISFJ love decoded: how the nurturer personality type loves, relationship patterns, core needs, and ISFJ compatibility — who is the ISFJ's best match?",
    keywords: ["isfj love", "isfj in love", "mbti isfj compatibility", "isfj relationships", "isfj compatibility", "isfj best match"],
  },
  {
    slug: "mbti-istj-love-patterns-analysis", lang: "en",
    keywords: ["istj love", "istj personality type in relationships", "istj in love", "istj relationships", "istj compatibility", "istj love patterns", "istj love language", "istj soulmate", "istj best match", "istj best partner"],
  },
  {
    slug: "mbti-infp-love-patterns-analysis", lang: "en",
    keywords: ["infp best romantic match", "infp in love", "infp love", "infp relationships", "infp compatibility", "infp love patterns", "infp romance", "infp romantic", "how does infp fall in love", "infps in love"],
  },

  // ── 风水卧室/爱情集群 ──
  {
    slug: "feng-shui-bedroom-layout-guide", lang: "en",
    keywords: ["feng shui bedroom layout", "feng shui bedroom for love", "feng shui bedroom love", "feng shui love corner", "best direction for bed to face feng shui", "feng shui bedroom mirror", "feng shui bedroom colors"],
  },
  {
    slug: "feng-shui-bedroom-sleep-romance", lang: "zh",
    title: "卧室风水全攻略:改善睡眠、催旺爱情桃花",
    description: "卧室风水完整指南:床的方位、镜子禁忌、颜色选择,既改善睡眠质量,又催旺爱情桃花运。附单身招桃花与夫妻和睦的布局要点。",
    keywords: ["卧室风水", "卧室风水爱情", "卧室风水布局", "风水卧室桃花", "feng shui bedroom for love", "卧室风水睡眠"],
  },

  // ── 2026 年运集群(cancer / scorpio)──
  {
    slug: "cancer-2026-yearly-horoscope", lang: "en",
    title: "Cancer 2026 Yearly Horoscope: Love, Career & Money",
    description: "Cancer 2026 yearly horoscope: is 2026 lucky for Cancer? Month-by-month predictions for love, career, money and health, plus the key dates every Cancer should know.",
    keywords: ["cancer 2026 yearly horoscope", "cancer 2026 horoscope", "cancer horoscope 2026", "cancer 2026 predictions", "is 2026 lucky for cancer", "cancer zodiac 2026 predictions", "2026 for cancer zodiac", "cancer season 2026", "cancer horoscope second half of 2026"],
  },
  {
    slug: "scorpio-2026-yearly-horoscope", lang: "en",
    title: "Scorpio 2026 Yearly Horoscope: Love, Career & Money",
    description: "Scorpio 2026 yearly horoscope: month-by-month predictions for love, career, money and health — including what 2026 holds for Scorpio women and men, plus key dates.",
    keywords: ["scorpio 2026 yearly horoscope", "scorpio 2026 horoscope", "scorpio horoscope 2026", "scorpio 2026 predictions", "scorpio prediction 2026", "2026 horoscope for scorpio", "2026 for scorpio woman", "is 2026 a good year for scorpio"],
  },

  // ── 塔罗决策 / 莉莉丝 ──
  {
    slug: "tarot-for-decision-making-guide", lang: "en",
    keywords: ["tarot for decision making", "tarot reading for decision making", "tarot for decisions", "tarot should i", "decision tarot spread", "tarot yes or no decision"],
  },
  {
    slug: "lilith-black-moon-astrology-guide", lang: "zh",
    title: "莉莉丝星座查询:黑月莉莉丝落座完整解析",
    description: "莉莉丝(黑月)星座是什么?暗月莉莉丝落十二星座的含义完整解析:它揭示你命盘中被压抑的欲望与原始力量,附查询方法。",
    keywords: ["莉莉丝星座", "暗月莉莉丝查询", "黑月莉莉丝", "莉莉丝落座", "莉莉丝星座查询", "lilith astrology"],
  },
];

async function run() {
  const slugs = TARGETS.map(t => t.slug);
  let current = [];
  if (supabase) {
    const { data, error } = await supabase
      .from("mysticai_blog_posts")
      .select("slug,lang,title,description,keywords")
      .in("slug", slugs);
    if (error) { console.error("读取失败:", error.message); process.exit(1); }
    current = data;
  }
  const bySlug = new Map(current.map(r => [r.slug, r]));

  let updated = 0, skipped = 0;
  for (const t of TARGETS) {
    const cur = bySlug.get(t.slug);
    if (!cur && !DRY) { console.log(`✗ 未找到 ${t.slug},跳过`); skipped++; continue; }
    if (cur && cur.lang !== t.lang) { console.log(`✗ ${t.slug} lang=${cur.lang} 与目标 ${t.lang} 不符,跳过`); skipped++; continue; }

    const patch = {};
    if (t.title) patch.title = t.title;
    if (t.description) patch.description = t.description;
    if (t.keywords) patch.keywords = t.keywords;
    patch.updated_at = new Date().toISOString();

    console.log(`\n── ${t.slug}${DRY ? " (DRY)" : ""}`);
    if (cur) {
      if (t.title) console.log(`  title: ${cur.title}\n     → ${t.title}`);
      if (t.description) console.log(`  desc:  ${(cur.description || "").slice(0, 70)}…\n     → ${t.description.slice(0, 70)}…`);
      if (t.keywords) console.log(`  kw:    ${JSON.stringify(cur.keywords)}\n     → ${JSON.stringify(t.keywords)}`);
    } else {
      console.log("  patch:", JSON.stringify(patch, null, 2));
    }

    if (!DRY) {
      const { error } = await supabase
        .from("mysticai_blog_posts")
        .update(patch)
        .eq("slug", t.slug);
      if (error) { console.error(`  ✗ 更新失败: ${error.message}`); skipped++; continue; }
      updated++;
    }
  }
  console.log(`\n${DRY ? "DRY 预览完成" : `完成:更新 ${updated} 篇,跳过 ${skipped} 篇`}。`);
}

run();
