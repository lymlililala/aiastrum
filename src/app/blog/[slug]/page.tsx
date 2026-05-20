import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchPostBySlug, fetchAllPosts, fetchAllSlugs, type DbBlogPost } from "~/lib/supabase";
import { getPostBySlug, BLOG_POSTS, CATEGORY_META } from "../blog-data";

export const revalidate = 60;

// ── 静态路由生成 ──────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  try {
    const slugs = await fetchAllSlugs();
    if (slugs.length > 0) return slugs.map(slug => ({ slug }));
  } catch { /* 降级 */ }
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

// ── 动态 Metadata ─────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  let title = "", description = "", keywords: string[] = [];
  try {
    const db = await fetchPostBySlug(params.slug);
    if (db) { title = db.title; description = db.description; keywords = db.keywords; }
  } catch { /* 降级 */ }

  if (!title) {
    const st = getPostBySlug(params.slug);
    if (st) { title = st.title; description = st.description; keywords = st.keywords; }
  }
  if (!title) return {};

  return {
    title: `${title} — MysticAI 神秘学知识库`,
    description,
    keywords,
    openGraph: { title, description, type: "article" },
    alternates: { canonical: `https://aiastrum.com/blog/${params.slug}` },
  };
}

// ── 页面数据结构（统一 DB / 静态）────────────────────────────────────────────
type PostDisplay = {
  slug: string;
  category: "tarot" | "dream" | "horoscope";
  title: string;
  description: string;
  publishedAt: string;
  readingTime: number;
  content: string;
  ctaHref: string;
  ctaLabel: string;
};

function fromDb(p: DbBlogPost): PostDisplay {
  return {
    slug: p.slug, category: p.category, title: p.title,
    description: p.description, publishedAt: p.published_at,
    readingTime: p.reading_time, content: p.content,
    ctaHref: p.cta_href, ctaLabel: p.cta_label,
  };
}

// ── 页面主体 ──────────────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // 优先读数据库，失败降级到静态
  let post: PostDisplay | null = null;
  try {
    const db = await fetchPostBySlug(params.slug);
    if (db) post = fromDb(db);
  } catch { /* 降级 */ }

  if (!post) {
    const st = getPostBySlug(params.slug);
    if (st) {
      post = {
        slug: st.slug, category: st.category, title: st.title,
        description: st.description, publishedAt: st.publishedAt,
        readingTime: st.readingTime, content: st.content,
        ctaHref: st.ctaHref, ctaLabel: st.ctaLabel,
      };
    }
  }

  if (!post) notFound();

  const meta = CATEGORY_META[post.category];

  // 相关文章
  let related: Array<{ slug: string; category: "tarot"|"dream"|"horoscope"; title: string; readingTime: number }> = [];
  try {
    const dbAll = await fetchAllPosts(post.category);
    related = dbAll
      .filter(p => p.slug !== post!.slug)
      .slice(0, 3)
      .map(p => ({ slug: p.slug, category: p.category, title: p.title, readingTime: p.reading_time }));
  } catch { /* 降级到静态 */ }

  if (related.length === 0) {
    related = BLOG_POSTS
      .filter(p => p.category === post!.category && p.slug !== post!.slug)
      .slice(0, 3)
      .map(p => ({ slug: p.slug, category: p.category, title: p.title, readingTime: p.readingTime }));
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
      <style>{`
        .blog-post-nav-back:hover { color: rgba(201,168,76,0.95) !important; }
        .blog-post-cta { transition: border-color 0.2s, box-shadow 0.2s; }
        .blog-post-cta:hover { border-color: rgba(201,168,76,0.45) !important; box-shadow: 0 6px 24px rgba(100,60,200,0.14) !important; }
        .blog-related-item { transition: border-color 0.2s; }
        .blog-related-item:hover { border-color: rgba(201,168,76,0.28) !important; }
        .blog-content h2 { font-family:serif; font-size:1.15rem; font-weight:700; color:#e8d5a3; margin:28px 0 12px; padding-bottom:6px; border-bottom:1px solid rgba(201,168,76,0.12); line-height:1.4; }
        .blog-content h3 { font-family:serif; font-size:0.96rem; font-weight:600; color:rgba(232,213,163,0.85); margin:20px 0 8px; line-height:1.4; }
        .blog-content p { font-size:0.9rem; color:rgba(200,175,140,0.78); line-height:1.8; margin-bottom:14px; }
        .blog-content ul,.blog-content ol { padding-left:20px; margin-bottom:16px; }
        .blog-content li { font-size:0.88rem; color:rgba(200,175,140,0.75); line-height:1.75; margin-bottom:6px; }
        .blog-content li strong,.blog-content strong { color:rgba(232,213,163,0.9); }
        .blog-content blockquote { border-left:2px solid rgba(201,168,76,0.45); padding:10px 16px; margin:20px 0; background:rgba(201,168,76,0.06); border-radius:0 8px 8px 0; }
        .blog-content blockquote p { color:rgba(232,213,163,0.7); font-style:italic; margin-bottom:0; }
        .blog-content table { width:100%; border-collapse:collapse; margin-bottom:18px; font-size:0.82rem; }
        .blog-content th { background:rgba(201,168,76,0.12); color:rgba(232,213,163,0.85); padding:8px 12px; text-align:left; font-weight:600; border-bottom:1px solid rgba(201,168,76,0.2); }
        .blog-content td { padding:8px 12px; color:rgba(200,175,140,0.72); border-bottom:1px solid rgba(201,168,76,0.08); }
        .blog-content tr:hover td { background:rgba(201,168,76,0.04); }
      `}</style>

      {/* Nav */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(10,6,28,0.92)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(201,168,76,0.12)", padding:"0 20px", height:52, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Link href="/blog" className="blog-post-nav-back" style={{ display:"flex", alignItems:"center", gap:6, textDecoration:"none", color:"rgba(201,168,76,0.7)", fontSize:"0.8rem", transition:"color 0.18s" }}>← 返回知识库</Link>
        <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:`${meta.color}18`, border:`1px solid ${meta.color}35`, borderRadius:8, padding:"3px 10px", fontSize:"0.66rem", color:meta.color, fontWeight:600 }}>
          <span>{meta.icon}</span>{meta.label}
        </div>
        <Link href="/" style={{ color:"rgba(201,168,76,0.45)", fontSize:"0.72rem", textDecoration:"none" }}>首页</Link>
      </nav>

      <div style={{ maxWidth:720, margin:"0 auto", padding:"40px 20px 80px" }}>

        {/* Header */}
        <header style={{ marginBottom:32 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:4, marginBottom:14, background:`${meta.color}18`, border:`1px solid ${meta.color}35`, borderRadius:8, padding:"3px 10px", fontSize:"0.66rem", color:meta.color }}>
            <span>{meta.icon}</span>{meta.label}
          </div>
          <h1 style={{ fontFamily:"serif", fontSize:"clamp(1.35rem,3.5vw,1.9rem)", fontWeight:700, color:"#e8d5a3", lineHeight:1.4, marginBottom:12 }}>{post.title}</h1>
          <p style={{ fontSize:"0.82rem", color:"rgba(200,175,140,0.6)", lineHeight:1.6, marginBottom:16 }}>{post.description}</p>
          <div style={{ display:"flex", alignItems:"center", gap:14, flexWrap:"wrap", fontSize:"0.66rem", color:"rgba(201,168,76,0.38)", paddingBottom:18, borderBottom:"1px solid rgba(201,168,76,0.1)" }}>
            <span>📅 {post.publishedAt}</span>
            <span>⏱ 约 {post.readingTime} 分钟阅读</span>
          </div>
        </header>

        <CTACard post={post} meta={meta} />

        <article className="blog-content" style={{ marginTop:32 }} dangerouslySetInnerHTML={{ __html: post.content }} />

        <div style={{ marginTop:48 }}>
          <CTACard post={post} meta={meta} large />
        </div>

        {related.length > 0 && (
          <section style={{ marginTop:48 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
              <span style={{ fontSize:13, opacity:0.6 }}>✦</span>
              <span style={{ fontSize:"0.7rem", fontFamily:"Cinzel,serif", color:"rgba(201,168,76,0.5)", letterSpacing:"0.1em", textTransform:"uppercase" }}>相关文章</span>
              <div style={{ flex:1, height:1, background:"linear-gradient(to right,rgba(201,168,76,0.15),transparent)" }} />
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {related.map(r => (
                <Link key={r.slug} href={`/blog/${r.slug}`} style={{ textDecoration:"none" }}>
                  <div className="blog-related-item" style={{ padding:"14px 16px", borderRadius:12, background:"rgba(16,10,38,0.7)", border:"1px solid rgba(201,168,76,0.12)", display:"flex", alignItems:"flex-start", gap:12 }}>
                    <span style={{ fontSize:20, flexShrink:0, marginTop:1 }}>{CATEGORY_META[r.category].icon}</span>
                    <div>
                      <div style={{ fontSize:"0.84rem", color:"#e8d5a3", fontWeight:600, marginBottom:4, lineHeight:1.35 }}>{r.title}</div>
                      <div style={{ fontSize:"0.68rem", color:"rgba(200,175,140,0.5)" }}>{r.readingTime} 分钟阅读</div>
                    </div>
                    <span style={{ marginLeft:"auto", color:"rgba(201,168,76,0.4)", fontSize:"0.9rem", flexShrink:0, marginTop:2 }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function CTACard({ post, meta, large = false }: { post: PostDisplay; meta: { color: string; icon: string }; large?: boolean }) {
  return (
    <Link href={post.ctaHref} style={{ textDecoration:"none", display:"block" }}>
      <div className="blog-post-cta" style={{ borderRadius:14, background:`linear-gradient(135deg,${meta.color}14 0%,rgba(100,60,200,0.12) 100%)`, border:`1px solid ${meta.color}30`, padding:large?"20px 20px":"14px 18px", display:"flex", alignItems:"center", gap:12, cursor:"pointer", boxShadow:`0 4px 20px ${meta.color}10` }}>
        <div style={{ width:large?44:36, height:large?44:36, borderRadius:10, background:`${meta.color}20`, border:`1px solid ${meta.color}35`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:large?20:16, flexShrink:0 }}>{meta.icon}</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:large?"0.88rem":"0.8rem", color:"rgba(232,213,163,0.88)", fontWeight:600, lineHeight:1.4 }}>{post.ctaLabel}</div>
          {large && <div style={{ fontSize:"0.68rem", color:"rgba(200,175,140,0.5)", marginTop:3 }}>免费使用 · AI 驱动 · 即时解读</div>}
        </div>
        <span style={{ color:meta.color, fontSize:"1.1rem", flexShrink:0, opacity:0.7 }}>→</span>
      </div>
    </Link>
  );
}
