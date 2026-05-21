import { type Metadata } from "next";
import Link from "next/link";
import { fetchAllPosts, type DbBlogPost } from "~/lib/supabase";
import { CATEGORY_META, type BlogCategory } from "./blog-data";

export const metadata: Metadata = {
  title: "神秘学知识库 | 塔罗牌意 · 周公解梦 · 星座运势 — AiAstrum",
  description: "深度解析塔罗78张牌意、周公解梦大全、十二星座运势指南。结合AI工具，让古老智慧触手可及。",
  keywords: ["塔罗牌意大全", "周公解梦", "星座运势2026", "塔罗解析", "梦境含义", "占星科普"],
  alternates: { canonical: "https://aiastrum.com/blog" },
};

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

  // 从数据库读取文章
  let posts: ReturnType<typeof toDisplayPost>[] = [];
  try {
    const dbPosts = await fetchAllPosts(cat === "all" ? undefined : cat);
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
    "name": "神秘学知识库 — AiAstrum",
    "description": "深度解析塔罗78张牌意、周公解梦大全、十二星座运势指南",
    "url": "https://aiastrum.com/blog",
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
        <Link href="/" className="blog-nav-back" style={{
          display: "flex", alignItems: "center", gap: 8,
          textDecoration: "none", color: "rgba(201,168,76,0.75)", fontSize: "0.8rem",
          letterSpacing: "0.06em", transition: "color 0.18s",
        }}>
          <span>←</span><span>返回首页</span>
        </Link>
        <div style={{
          fontFamily: "Cinzel, serif", fontSize: "0.85rem", fontWeight: 700,
          background: "linear-gradient(135deg,#e8d5a3,#c9a84c)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>神秘学知识库</div>
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
          MYSTIC KNOWLEDGE BASE
        </p>
        <h1 style={{
          fontFamily: "Cinzel,serif", fontSize: "clamp(1.6rem,5vw,2.6rem)", fontWeight: 700,
          background: "linear-gradient(135deg,#e8d5a3 0%,#c9a84c 50%,#f0e68c 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          marginBottom: 10, lineHeight: 1.25,
        }}>神秘学知识库</h1>
        <p style={{ fontSize: "0.88rem", color: "rgba(200,175,145,0.65)", maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.6 }}>
          塔罗78张牌意逐一解析 · 周公解梦深度科普 · 星座运势实时指南
        </p>
        <p style={{ fontSize: "0.72rem", color: "rgba(201,168,76,0.4)", marginTop: -16, marginBottom: 8 }}>
          共 {posts.length} 篇文章
        </p>
      </section>

      {/* ── Category Tabs ── */}
      <div style={{ display: "flex", gap: 8, padding: "0 20px 20px", justifyContent: "center", flexWrap: "wrap" }}>
        {CATEGORIES.map(c => {
          const active = cat === c.key;
          return (
            <Link
              key={c.key}
              href={c.key === "all" ? "/blog" : `/blog?cat=${c.key}`}
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
              <span>{c.icon}</span>{c.label}
            </Link>
          );
        })}
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
                    <span>{meta.icon}</span>{meta.label}
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
                    <span>📅 {post.publishedAt} · ⏱ {post.readingTime} 分钟阅读</span>
                    <span style={{ color: "rgba(201,168,76,0.6)" }}>阅读全文 →</span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {posts.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(200,175,145,0.4)", fontSize: "0.9rem" }}>
            该分类暂无文章，敬请期待
          </div>
        )}
      </div>
    </div>
  );
}
