import { type Metadata } from "next";
import Link from "next/link";
import { fetchAllPosts, type DbBlogPost } from "~/lib/supabase";
import { withLocale } from "~/lib/i18n";
import { hreflangFor } from "~/lib/seo";
import { CATEGORY_META, type BlogCategory } from "./blog-data";
import { readBlogLocale, localeToLang, catLabel, fmtDate, BLOG_CHROME } from "./blog-i18n";

// pillar 专题入口标签（不在 BLOG_CHROME 内，单独三语映射）
const PILLAR_LABELS = {
  "/blog/topic/dream-interpretation": { zh: "解梦大全", tw: "解夢大全", en: "Dream Dictionary" },
  "/blog/topic/tarot-spreads":        { zh: "塔罗牌阵大全", tw: "塔羅牌陣大全", en: "Tarot Spreads" },
  "/blog/topic/rune-meanings":        { zh: "卢恩符文大全", tw: "盧恩符文大全", en: "Rune Meanings" },
  "/blog/topic/crystal-healing":      { zh: "水晶疗愈大全", tw: "水晶療癒大全", en: "Crystal Healing" },
  "/blog/topic/numerology-life-path": { zh: "生命灵数大全", tw: "生命靈數大全", en: "Life Path Numbers" },
  "/blog/topic/rising-signs":         { zh: "上升星座大全", tw: "上升星座大全", en: "Rising Signs" },
  "/blog/topic/angel-numbers":        { zh: "天使数字大全", tw: "天使數字大全", en: "Angel Numbers" },
} satisfies Record<string, { zh: string; tw: string; en: string }>;

const BASE_URL = "https://aiastrum.com";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await readBlogLocale();
  const t = BLOG_CHROME[locale];
  const alternates = hreflangFor("/blog", locale); // canonical 带语言前缀 + 三语 hreflang
  const canonicalUrl = alternates.canonical as string;
  return {
    title: t.metaTitle, // 模板自动追加 " | AiAstrum"
    description: t.metaDesc,
    alternates,
    openGraph: {
      title: `${t.metaTitle} | AiAstrum`,
      description: t.metaDesc,
      url: canonicalUrl,
      type: "website",
      siteName: "AiAstrum",
      images: [{ url: `${BASE_URL}/images/og-cover.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t.metaTitle} — AiAstrum`,
      description: t.metaDesc,
      images: [`${BASE_URL}/images/og-cover.png`],
    },
  };
}

// 强制每次请求都重新从数据库读（ISR 60s）
export const revalidate = 60;

const CATEGORIES: Array<{ key: BlogCategory | "all"; label: string; icon: string }> = [
  { key: "all",            label: "全部",     icon: "✦"  },
  { key: "tarot",          label: "塔罗牌意", icon: "🔮" },
  { key: "dream",          label: "周公解梦", icon: "💭" },
  { key: "horoscope",      label: "星座运势", icon: "🌌" },
  { key: "astro",          label: "星盘解析", icon: "✦"  },
  { key: "numerology",     label: "生命灵数", icon: "🔯" },
  { key: "rune",           label: "卢恩符文", icon: "ᚠ"  },
  { key: "bazi",           label: "生辰八字", icon: "☯"  },
  { key: "ziwei",          label: "紫微斗数", icon: "紫" },
  { key: "meihua",         label: "梅花易数", icon: "🌸" },
  { key: "qimen",          label: "奇门遁甲", icon: "⚔"  },
  { key: "almanac",        label: "老黄历",   icon: "📅" },
  { key: "lingqian",       label: "灵签",     icon: "🎋" },
  { key: "naming",         label: "AI起名",   icon: "✍"  },
  { key: "wuge",           label: "五格姓名学",icon: "🔯"},
  { key: "love",           label: "姻缘占卜", icon: "💞" },
  { key: "face-reading",   label: "赛博算命", icon: "👁"  },
  { key: "mbti",           label: "MBTI星球", icon: "🧩" },
  { key: "synastry",       label: "星盘合盘", icon: "💫" },
  { key: "daily-fortune",  label: "每日开运", icon: "☀️" },
  { key: "daily-card",     label: "每日提示卡",icon: "✦" },
  { key: "pet-psychic",    label: "宠物灵语", icon: "🐾" },
  { key: "ai-mystic",      label: "AI解忧馆", icon: "🔮" },
  { key: "风水",           label: "风水布局", icon: "🏯" },
  { key: "水晶",           label: "水晶疗愈", icon: "💎" },
  { key: "冥想",           label: "冥想灵修", icon: "🧘" },
];

// 将数据库格式转为展示格式
function toDisplayPost(p: DbBlogPost) {
  return {
    slug: p.slug,
    category: p.category as BlogCategory,
    title: p.title,
    description: p.description,
    publishedAt: p.published_at,
    readingTime: p.reading_time,
  };
}

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const cat = (searchParams.cat ?? "all") as BlogCategory | "all";

  const locale = await readBlogLocale();
  const lang = localeToLang(locale);
  const t = BLOG_CHROME[locale];

  // 从数据库读取文章
  let posts: ReturnType<typeof toDisplayPost>[] = [];
  try {
    const dbPosts = await fetchAllPosts(cat === "all" ? undefined : cat, lang);
    posts = dbPosts.map(toDisplayPost).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch {
    // 数据库不可达时返回空列表
    posts = [];
  }

  // ── ItemList 结构化数据 ──────────────────────────────────────────────────────
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": t.metaTitle,
    "description": t.metaDesc,
    "url": `https://aiastrum.com/${locale}/blog`,
    "numberOfItems": posts.length,
    "itemListElement": posts.map((post, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `https://aiastrum.com/blog/${post.slug}`,
      "name": post.title,
    })),
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
      {/* ItemList 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <style>{`
        .blog-nav-back:hover { color: rgba(201,168,76,0.95) !important; }
        .blog-cat-tab:hover { border-color: rgba(201,168,76,0.4) !important; color: rgba(240,210,120,0.85) !important; }
        .blog-card:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(100,60,200,0.18) !important; border-color: rgba(201,168,76,0.32) !important; }
        .blog-card { transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; }
      `}</style>

      {/* ── Nav ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(10,6,28,0.92)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(201,168,76,0.12)",
        padding: "0 20px", height: 52,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href={`/${locale}`} className="blog-nav-back" style={{
          display: "flex", alignItems: "center", gap: 8,
          textDecoration: "none", color: "rgba(201,168,76,0.75)", fontSize: "0.8rem",
          letterSpacing: "0.06em", transition: "color 0.18s",
        }}>
          <span>←</span><span>{t.backHome}</span>
        </Link>
        <div style={{
          fontFamily: "Cinzel, serif", fontSize: "0.85rem", fontWeight: 700,
          background: "linear-gradient(135deg,#e8d5a3,#c9a84c)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>{t.kbTitle}</div>
        <div style={{ width: 80 }} />
      </nav>

      {/* ── Hero ── */}
      <section style={{ textAlign: "center", padding: "48px 20px 32px", position: "relative" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 0%, rgba(100,60,200,0.18) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <p style={{ fontFamily: "Cinzel,serif", fontSize: "0.62rem", letterSpacing: "0.22em", color: "rgba(201,168,76,0.5)", marginBottom: 8, textTransform: "uppercase" }}>
          {t.kbTagline}
        </p>
        <h1 style={{
          fontFamily: "Cinzel,serif", fontSize: "clamp(1.6rem,5vw,2.6rem)", fontWeight: 700,
          background: "linear-gradient(135deg,#e8d5a3 0%,#c9a84c 50%,#f0e68c 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          marginBottom: 10, lineHeight: 1.25,
        }}>{t.kbTitle}</h1>
        <p style={{ fontSize: "0.88rem", color: "rgba(200,175,145,0.65)", maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.6 }}>
          {t.kbDesc}
        </p>
        <p style={{ fontSize: "0.72rem", color: "rgba(201,168,76,0.4)", marginTop: -16, marginBottom: 8 }}>
          {t.totalArticles(posts.length)}
        </p>
      </section>

      {/* ── Category Tabs ── */}
      <div style={{ display: "flex", gap: 8, padding: "0 20px 20px", justifyContent: "center", flexWrap: "wrap" }}>
        {CATEGORIES.map(c => {
          const active = cat === c.key;
          return (
            <Link
              key={c.key}
              href={c.key === "all" ? withLocale(locale, "/blog") : withLocale(locale, `/blog?cat=${c.key}`)}
              className="blog-cat-tab"
              style={{
                padding: "7px 18px", borderRadius: 22, textDecoration: "none",
                border: active ? "1px solid rgba(201,168,76,0.55)" : "1px solid rgba(201,168,76,0.14)",
                background: active ? "rgba(201,168,76,0.14)" : "transparent",
                color: active ? "rgba(240,210,120,0.95)" : "rgba(210,185,130,0.65)",
                fontSize: "0.78rem", display: "inline-flex", alignItems: "center", gap: 5,
                transition: "all 0.18s", whiteSpace: "nowrap",
              }}
            >
              <span>{c.icon}</span>{c.key === "all" ? t.catAll : catLabel(c.key, locale)}
            </Link>
          );
        })}
      </div>

      {/* ── 主题专题 pillar 入口 ── */}
      <div style={{ maxWidth: 960, margin: "0 auto 8px", padding: "0 16px" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { href: "/blog/topic/dream-interpretation", icon: "💭", label: PILLAR_LABELS["/blog/topic/dream-interpretation"][locale] },
            { href: "/blog/topic/tarot-spreads", icon: "🃏", label: PILLAR_LABELS["/blog/topic/tarot-spreads"][locale] },
            { href: "/blog/topic/rune-meanings", icon: "ᚠ", label: PILLAR_LABELS["/blog/topic/rune-meanings"][locale] },
            { href: "/blog/topic/crystal-healing", icon: "💎", label: PILLAR_LABELS["/blog/topic/crystal-healing"][locale] },
            { href: "/blog/topic/numerology-life-path", icon: "🔢", label: PILLAR_LABELS["/blog/topic/numerology-life-path"][locale] },
            { href: "/blog/topic/rising-signs", icon: "🌅", label: PILLAR_LABELS["/blog/topic/rising-signs"][locale] },
            { href: "/blog/topic/angel-numbers", icon: "😇", label: PILLAR_LABELS["/blog/topic/angel-numbers"][locale] },
          ].map(p => (
            <Link key={p.href} href={p.href} style={{
              display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none",
              padding: "8px 16px", borderRadius: 12,
              background: "linear-gradient(135deg,rgba(100,60,200,.14),rgba(201,168,76,.08))",
              border: "1px solid rgba(201,168,76,.22)", color: "rgba(232,213,163,.9)",
              fontSize: ".8rem", fontWeight: 600,
            }}>
              <span>{p.icon}</span>{p.label} →
            </Link>
          ))}
        </div>
      </div>

      {/* ── Article Grid ── */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 16px 80px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))",
          gap: 14,
        }}>
          {posts.map(post => {
            const meta = (CATEGORY_META as Record<string, typeof CATEGORY_META[BlogCategory]>)[post.category]
              ?? { label: "文章", labelEn: "Article", icon: "✦", color: "#c9a84c" };
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <article className="blog-card" style={{
                  borderRadius: 16,
                  background: "rgba(16,10,38,0.85)",
                  border: "1px solid rgba(201,168,76,0.15)",
                  padding: "20px 20px 18px",
                  cursor: "pointer",
                }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    background: `${meta.color}18`, border: `1px solid ${meta.color}35`,
                    borderRadius: 8, padding: "2px 9px", marginBottom: 10,
                    fontSize: "0.66rem", color: meta.color, fontWeight: 600,
                  }}>
                    <span>{meta.icon}</span>{catLabel(post.category, locale)}
                  </div>

                  <h2 style={{
                    fontSize: "0.96rem", fontWeight: 700, color: "#e8d5a3",
                    lineHeight: 1.45, marginBottom: 8, fontFamily: "serif",
                  }}>{post.title}</h2>

                  <p style={{
                    fontSize: "0.76rem", color: "rgba(200,175,140,0.58)", lineHeight: 1.55,
                    marginBottom: 14,
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}>{post.description}</p>

                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    fontSize: "0.66rem", color: "rgba(201,168,76,0.4)",
                  }}>
                    <span>📅 {fmtDate(post.publishedAt, locale)} · ⏱ {t.minRead(post.readingTime)}</span>
                    <span style={{ color: "rgba(201,168,76,0.6)" }}>{t.readFull}</span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {posts.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(200,175,145,0.4)", fontSize: "0.9rem" }}>
            {t.emptyCategory}
          </div>
        )}
      </div>
    </div>
  );
}
