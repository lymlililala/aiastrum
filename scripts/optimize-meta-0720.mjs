// ─── GSC 0720 文章 meta 精确匹配优化 ─────────────────────────────────────────
// 依据 gsc 查询词(曝光 1-2、排名 60-100)对既有文章做 title/description/keywords
// 精确匹配补强,只动 meta,不动正文。写入前自动拉取当前值对比,lang 不符则跳过。
// 用法:
//   DRY=1 node scripts/optimize-meta-0720.mjs          # 预览 before/after
//   node scripts/optimize-meta-0720.mjs                # 正式写库(需 .env 中 SUPABASE_SECRET_KEY)
import { createClient } from "@supabase/supabase-js";

const SECRET = process.env.SUPABASE_SECRET_KEY;
const DRY = process.env.DRY === "1";
if (!SECRET && !DRY) { console.error("缺少 SUPABASE_SECRET_KEY"); process.exit(1); }
const supabase = SECRET ? createClient("https://tixgzezefjjsyuzgdhcd.supabase.co", SECRET) : null;

// slug → 目标 meta。lang 用于安全校验,language 不匹配的行不更新。
const TARGETS = [
  // ── 水晶集群(protection / stress / abundance / root chakra)──
  {
    slug: "crystals-for-protection", lang: "en",
    title: "Protection Crystals: 8 Best Stones for Spiritual Protection",
    description: "The best protection crystals and stones for spiritual protection — black tourmaline, obsidian, amethyst and more: how these energy protection stones shield you and how to use them daily.",
    keywords: ["protection crystals", "protection stones", "stones for spiritual protection", "energy protection stones", "protection healing stones", "crystals for protection", "best protection crystals"],
  },
  {
    slug: "crystals-for-anxiety-and-stress", lang: "en",
    title: "Crystals for Stress Relief: 8 Calming Stones for Anxiety",
    description: "The best crystals for stress relief and anxiety — amethyst, lepidolite, blue lace agate and more: how calming crystals for stress work and simple ways to use them every day.",
    keywords: ["crystals for stress relief", "crystals for stress", "crystals for anxiety", "calming crystals", "best crystals for anxiety", "stress relief stones"],
  },
  {
    slug: "crystals-for-abundance-and-money", lang: "en",
    title: "Crystals for Abundance: 7 Gemstones for Luck and Money",
    description: "The best crystals for abundance and gemstones for luck and money — citrine, pyrite, green aventurine: meanings, how to use them, and simple prosperity rituals that work.",
    keywords: ["crystals for abundance", "gemstone for luck and money", "crystals for money", "crystals for prosperity", "abundance crystals", "money stones", "luck stones"],
  },
  {
    slug: "black-tourmaline-meaning-and-healing-properties", lang: "en",
    title: "Black Tourmaline Meaning & Protection Healing Properties",
    description: "Black tourmaline meaning and healing properties: why it tops the list of protection healing stones, how it blocks negative energy, and how to use, place and cleanse it.",
    keywords: ["black tourmaline meaning", "black tourmaline protection", "protection healing stones", "energy protection stones", "black tourmaline properties", "black tourmaline benefits"],
  },
  {
    slug: "root-chakra-meaning", lang: "en",
    title: "Root Chakra Meaning: Heal Blocked & Overactive Energy",
    description: "Root chakra (Muladhara) meaning, blocked vs overactive symptoms, and how to decrease root chakra activity or open it safely — with grounding stones, breathwork and daily habits.",
    keywords: ["root chakra meaning", "how to decrease activity root chakra", "overactive root chakra", "root chakra healing", "blocked root chakra", "root chakra balancing"],
  },

  // ── 生命灵数集群 ──
  {
    slug: "life-path-number-3-meaning-guide", lang: "en",
    title: "Life Path Number 3 Meaning: Personality, Love & Career",
    description: "Life path 3 meaning explained: the creative communicator's personality traits, love compatibility, best careers and life lessons — plus how your life path number 3 is calculated.",
    keywords: ["life path 3", "life path number 3", "life path 3 meaning", "3 life path", "life path 3 personality", "life path 3 compatibility", "life path 3 career"],
  },

  // ── 解梦集群 ──
  {
    slug: "dream-about-house-meaning", lang: "zh",
    // title 已精确命中「梦见房子」,仅补 description/keywords 的英文长尾
    description: "在梦境心理学中,房子是「自我」的经典象征。不同的房间、状态(破旧/豪华/陌生)传递不同的内心信息。House dreams interpreted: 房子梦的完整含义。",
    keywords: ["梦见房子", "梦到房子是什么意思", "梦见陌生的房子", "梦见豪宅", "梦见房子漏水", "梦见旧房子", "房子梦境解析", "dream about house", "house dream interpretation"],
  },

  // ── MBTI 集群 ──
  {
    slug: "mbti-istj-love-patterns-analysis", lang: "en",
    title: "ISTJ in Love: Personality Type in Relationships",
    description: "ISTJ love decoded: how the ISTJ personality type behaves in relationships — core needs, quiet devotion, compatibility, and what an ISTJ needs from a partner to commit.",
    keywords: ["istj love", "istj personality type in relationships", "istj in love", "istj relationships", "istj compatibility", "istj love patterns"],
  },
  {
    slug: "mbti-infp-love-patterns-analysis", lang: "en",
    title: "INFP in Love: Best Romantic Match & Relationships",
    description: "INFP love decoded: the INFP's best romantic match, how the idealist personality type behaves in relationships, core emotional needs, and compatibility with all 16 types.",
    keywords: ["infp best romantic match", "infp in love", "infp love", "infp relationships", "infp compatibility", "infp love patterns"],
  },

  // ── 年运集群 ──
  {
    slug: "leo-2026-yearly-horoscope", lang: "en",
    title: "Leo 2026 Yearly Horoscope: Love, Career & Money",
    description: "Leo 2026 yearly horoscope: Jupiter enters your sign from late June — month-by-month predictions for love, career, money and health, plus key dates every Leo should know.",
    keywords: ["leo 2026 yearly horoscope", "leo 2026 horoscope", "leo horoscope 2026", "leo 2026 predictions", "leo 2026 love", "leo 2026 career"],
  },
  {
    slug: "2026-second-half-zodiac-horoscope", lang: "zh",
    // title 已是高点击样式,仅补水瓶座长尾 keyword
    keywords: ["2026下半年運勢", "2026年下半年星座運勢", "下半年星座運勢", "2026下半年生肖運勢", "丙午年運勢", "2026下半年財運", "2026下半年感情運", "十二星座下半年運勢", "2026年7月星座運勢", "2026下半年開運", "水瓶座2026下半年", "狮子座2026下半年"],
  },

  // ── 占星/配对集群 ──
  {
    slug: "sun-in-8th-house-natal-chart", lang: "en",
    title: "Sun in 8th House Astrology: Transformation & Power",
    description: "Sun in 8th house astrology explained: what a natal 8th-house Sun means for identity, intimacy, shared money and transformation — traits, challenges and growth path.",
    keywords: ["sun in 8th house astrology", "sun in 8th house", "sun in the 8th house meaning", "8th house sun", "natal sun in 8th house"],
  },
  {
    slug: "aries-love-compatibility-guide-chinese", lang: "zh",
    title: "白羊座配对完全指南:最配与最不配的星座分析",
    description: "白羊座和什么星座最配?白羊与十二星座的爱情配对完整分析:最配、次配与需要磨合的组合,以及白羊在感情中的相处模式。Aries compatibility in love.",
    keywords: ["白羊座配对", "白羊座最配星座", "白羊座恋爱", "astrology signs compatibility aries", "aries compatibility", "aries love match"],
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
