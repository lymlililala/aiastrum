import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, BLOG_POSTS, CATEGORY_META } from "../blog-data";

// ── 静态路由生成（SSG，对 SEO 最友好）──────────────────────────────────────
export function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

// ── 动态 Metadata（每篇文章独立 TDK）─────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} — MysticAI 神秘学知识库`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
    },
    alternates: {
      canonical: `https://aiastrum.com/blog/${post.slug}`,
    },
  };
}

// ── 页面主体 ──────────────────────────────────────────────────────────────────
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const meta = CATEGORY_META[post.category];

  // 相关文章（同类别，排除自身，取3篇）
  const related = BLOG_POSTS
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>

      {/* ── Nav ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(10,6,28,0.92)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(201,168,76,0.12)",
        padding: "0 20px", height: 52,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/blog" style={{
          display: "flex", alignItems: "center", gap: 6,
          textDecoration: "none", color: "rgba(201,168,76,0.7)", fontSize: "0.8rem",
          letterSpacing: "0.04em",
        }}>← 返回知识库</Link>
        <div style={{
          display: "flex", alignItems: "center", gap: 5,
          background: `${meta.color}18`, border: `1px solid ${meta.color}35`,
          borderRadius: 8, padding: "3px 10px",
          fontSize: "0.66rem", color: meta.color, fontWeight: 600,
        }}>
          <span>{meta.icon}</span>{meta.label}
        </div>
        <Link href="/" style={{
          color: "rgba(201,168,76,0.45)", fontSize: "0.72rem",
          textDecoration: "none", letterSpacing: "0.04em",
        }}>首页</Link>
      </nav>

      {/* ── Article Layout ── */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px 80px" }}>

        {/* ── Article Header ── */}
        <header style={{ marginBottom: 32 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 14,
            background: `${meta.color}18`, border: `1px solid ${meta.color}35`,
            borderRadius: 8, padding: "3px 10px",
            fontSize: "0.66rem", color: meta.color,
          }}>
            <span>{meta.icon}</span>{meta.label}
          </div>

          {/* H1 — 核心 SEO 标题 */}
          <h1 style={{
            fontFamily: "serif", fontSize: "clamp(1.35rem,3.5vw,1.9rem)", fontWeight: 700,
            color: "#e8d5a3", lineHeight: 1.4, marginBottom: 12,
          }}>{post.title}</h1>

          <p style={{
            fontSize: "0.82rem", color: "rgba(200,175,140,0.6)", lineHeight: 1.6,
            marginBottom: 16,
          }}>{post.description}</p>

          <div style={{
            display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
            fontSize: "0.66rem", color: "rgba(201,168,76,0.38)",
            paddingBottom: 18,
            borderBottom: "1px solid rgba(201,168,76,0.1)",
          }}>
            <span>📅 {post.publishedAt}</span>
            <span>⏱ 约 {post.readingTime} 分钟阅读</span>
          </div>
        </header>

        {/* ── TOP CTA（文章顶部引流卡） ── */}
        <CTACard post={post} meta={meta} />

        {/* ── Article Body ── */}
        <article
          className="blog-content"
          style={{ marginTop: 32 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* ── BOTTOM CTA（文章底部转化） ── */}
        <div style={{ marginTop: 48 }}>
          <CTACard post={post} meta={meta} large />
        </div>

        {/* ── Related Articles ── */}
        {related.length > 0 && (
          <section style={{ marginTop: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 13, opacity: 0.6 }}>✦</span>
              <span style={{
                fontSize: "0.7rem", fontFamily: "Cinzel,serif",
                color: "rgba(201,168,76,0.5)", letterSpacing: "0.1em", textTransform: "uppercase",
              }}>相关文章</span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,rgba(201,168,76,0.15),transparent)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {related.map(r => (
                <Link key={r.slug} href={`/blog/${r.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    padding: "14px 16px", borderRadius: 12,
                    background: "rgba(16,10,38,0.7)",
                    border: "1px solid rgba(201,168,76,0.12)",
                    display: "flex", alignItems: "flex-start", gap: 12,
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.28)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.12)"}
                  >
                    <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{CATEGORY_META[r.category].icon}</span>
                    <div>
                      <div style={{ fontSize: "0.84rem", color: "#e8d5a3", fontWeight: 600, marginBottom: 4, lineHeight: 1.35 }}>
                        {r.title}
                      </div>
                      <div style={{ fontSize: "0.68rem", color: "rgba(200,175,140,0.5)" }}>
                        {r.readingTime} 分钟阅读
                      </div>
                    </div>
                    <span style={{ marginLeft: "auto", color: "rgba(201,168,76,0.4)", fontSize: "0.9rem", flexShrink: 0, marginTop: 2 }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* ── Article content styles ── */}
      <style>{`
        .blog-content h2 {
          font-family: serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #e8d5a3;
          margin: 28px 0 12px;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(201,168,76,0.12);
          line-height: 1.4;
        }
        .blog-content h3 {
          font-family: serif;
          font-size: 0.96rem;
          font-weight: 600;
          color: rgba(232,213,163,0.85);
          margin: 20px 0 8px;
          line-height: 1.4;
        }
        .blog-content p {
          font-size: 0.9rem;
          color: rgba(200,175,140,0.78);
          line-height: 1.8;
          margin-bottom: 14px;
        }
        .blog-content ul, .blog-content ol {
          padding-left: 20px;
          margin-bottom: 16px;
        }
        .blog-content li {
          font-size: 0.88rem;
          color: rgba(200,175,140,0.75);
          line-height: 1.75;
          margin-bottom: 6px;
        }
        .blog-content li strong {
          color: rgba(232,213,163,0.9);
        }
        .blog-content strong {
          color: rgba(232,213,163,0.9);
        }
        .blog-content blockquote {
          border-left: 2px solid rgba(201,168,76,0.45);
          padding: 10px 16px;
          margin: 20px 0;
          background: rgba(201,168,76,0.06);
          border-radius: 0 8px 8px 0;
        }
        .blog-content blockquote p {
          color: rgba(232,213,163,0.7);
          font-style: italic;
          margin-bottom: 0;
        }
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 18px;
          font-size: 0.82rem;
        }
        .blog-content th {
          background: rgba(201,168,76,0.12);
          color: rgba(232,213,163,0.85);
          padding: 8px 12px;
          text-align: left;
          font-weight: 600;
          border-bottom: 1px solid rgba(201,168,76,0.2);
        }
        .blog-content td {
          padding: 8px 12px;
          color: rgba(200,175,140,0.72);
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }
        .blog-content tr:hover td {
          background: rgba(201,168,76,0.04);
        }
      `}</style>
    </div>
  );
}

// ── CTA 卡片组件 ──────────────────────────────────────────────────────────────
function CTACard({
  post,
  meta,
  large = false,
}: {
  post: { ctaHref: string; ctaLabel: string };
  meta: { color: string; icon: string; label: string };
  large?: boolean;
}) {
  return (
    <Link href={post.ctaHref} style={{ textDecoration: "none", display: "block" }}>
      <div style={{
        borderRadius: 14,
        background: `linear-gradient(135deg, ${meta.color}14 0%, rgba(100,60,200,0.12) 100%)`,
        border: `1px solid ${meta.color}30`,
        padding: large ? "20px 20px" : "14px 18px",
        display: "flex", alignItems: "center",
        gap: 12, cursor: "pointer",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: `0 4px 20px ${meta.color}10`,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${meta.color}55`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 24px ${meta.color}22`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${meta.color}30`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${meta.color}10`;
      }}
      >
        <div style={{
          width: large ? 44 : 36, height: large ? 44 : 36, borderRadius: 10,
          background: `${meta.color}20`, border: `1px solid ${meta.color}35`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: large ? 20 : 16, flexShrink: 0,
        }}>{meta.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: large ? "0.88rem" : "0.8rem",
            color: "rgba(232,213,163,0.88)", fontWeight: 600, lineHeight: 1.4,
          }}>{post.ctaLabel}</div>
          {large && (
            <div style={{ fontSize: "0.68rem", color: "rgba(200,175,140,0.5)", marginTop: 3 }}>
              免费使用 · AI 驱动 · 即时解读
            </div>
          )}
        </div>
        <span style={{ color: meta.color, fontSize: "1.1rem", flexShrink: 0, opacity: 0.7 }}>→</span>
      </div>
    </Link>
  );
}
