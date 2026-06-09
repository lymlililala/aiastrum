// ─── 工具页底部「相关知识库文章」内链区（async server component）──────────────
// 从对应分类拉取文章，渲染指向 /blog/<slug> 的链接，把工具页权重导向文章。
// 自带容错：无文章或查询失败时返回 null，绝不影响工具页本身。
import Link from "next/link";
import { fetchAllPosts } from "~/lib/supabase";
import { CATEGORY_META, type BlogCategory } from "~/app/blog/blog-data";

type CatMeta = (typeof CATEGORY_META)[BlogCategory];
const FALLBACK_META: CatMeta = { label: "知识库", labelEn: "Knowledge Base", icon: "📚", color: "#c9a84c" };

export default async function ToolArticleLinks({
  category,
  limit = 6,
}: {
  category: string;
  limit?: number;
}) {
  let posts: Array<{ slug: string; title: string; readingTime: number }> = [];
  try {
    const data = await fetchAllPosts(category);
    posts = data
      .slice(0, limit)
      .map(p => ({ slug: p.slug, title: p.title, readingTime: p.reading_time }));
  } catch {
    return null;
  }
  if (posts.length === 0) return null;

  const meta = (CATEGORY_META as Record<string, CatMeta>)[category] ?? FALLBACK_META;

  return (
    <section style={{ maxWidth: 720, margin: "0 auto", padding: "8px 20px 64px", position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 14, opacity: 0.7 }}>{meta.icon}</span>
        <span style={{ fontSize: "0.7rem", fontFamily: "Cinzel,serif", color: "rgba(201,168,76,0.55)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          相关知识库文章
        </span>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,rgba(201,168,76,0.15),transparent)" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {posts.map(p => (
          <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: "none" }}>
            <div style={{ padding: "13px 16px", borderRadius: 12, background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.12)", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{meta.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "0.84rem", color: "#e8d5a3", fontWeight: 600, lineHeight: 1.35 }}>{p.title}</div>
                <div style={{ fontSize: "0.66rem", color: "rgba(200,175,140,0.5)", marginTop: 3 }}>{p.readingTime} 分钟阅读</div>
              </div>
              <span style={{ color: "rgba(201,168,76,0.4)", fontSize: "0.9rem", flexShrink: 0 }}>→</span>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href={`/blog?cat=${category}`}
        style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16, color: "rgba(201,168,76,0.7)", fontSize: "0.78rem", textDecoration: "none" }}
      >
        查看全部 {meta.label} 文章 →
      </Link>
    </section>
  );
}
