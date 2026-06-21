import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchPostBySlug, fetchAllPosts, type DbBlogPost } from "~/lib/supabase";
import { injectContextualLinks, type LinkCandidate } from "~/lib/internal-links";
import { canonicalSlug } from "~/lib/canonical-overrides";
import { buildFaqSchema } from "~/lib/faq-schema";
import { CATEGORY_META } from "../blog-data";
import { BLOG_CHROME, catLabel, fmtDate } from "../blog-i18n";
import { type Locale, withLocale } from "~/lib/i18n";
import SyncHtmlLang from "./SyncHtmlLang";

// 根 layout 使用 headers()（读取 locale），整站本质为动态渲染。
// 故本路由显式 force-dynamic：按需服务端渲染，避免与 ISR(revalidate) 冲突导致
// DYNAMIC_SERVER_USAGE 500；同时不在构建时预渲染近千页，保持构建快速。
export const dynamic = "force-dynamic";
export const dynamicParams = true;

// ── 静态路由生成 ──────────────────────────────────────────────────────────────
// 不在构建时预渲染任何文章：返回空数组，配合 dynamicParams=true + revalidate
// 走按需 ISR（首次访问渲染并缓存 1 小时）。避免近千篇文章在构建时逐页全量查库+
// 内链注入导致构建时间随文章数线性膨胀（此前 >10 分钟）。
export async function generateStaticParams() {
  return [];
}

// ── 动态 Metadata ─────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const db = await fetchPostBySlug(params.slug);
    if (db) {
      const BASE_URL = "https://aiastrum.com";
      // 重复文章：canonical 指向主文章，集中排名信号
      const canonicalUrl = `${BASE_URL}/blog/${canonicalSlug(params.slug)}`;
      return {
        title: db.title, // 根 layout 模板会自动追加 " | AiAstrum"，此处不再重复品牌名
        description: db.description,
        keywords: db.keywords,
        alternates: { canonical: canonicalUrl },
        openGraph: {
          title: db.title,
          description: db.description,
          type: "article",
          url: canonicalUrl,
          siteName: "AiAstrum",
          images: [{ url: `${BASE_URL}/images/og-cover.png`, width: 1200, height: 630 }],
        },
        twitter: {
          card: "summary_large_image",
          title: db.title,
          description: db.description,
          images: [`${BASE_URL}/images/og-cover.png`],
        },
      };
    }
  } catch { /* 降级 */ }
  return {};
}

// ── 页面数据结构 ──────────────────────────────────────────────────────────────
type PostDisplay = {
  slug: string;
  category: string; // 支持所有 22 个分类
  lang: string;     // 文章语言：'zh' | 'en'，决定 chrome 语言
  title: string;
  description: string;
  keywords: string[];
  publishedAt: string;
  readingTime: number;
  content: string;
  ctaHref: string;
  ctaLabel: string;
  ctaLabelEn: string;
};

function fromDb(p: DbBlogPost): PostDisplay {
  return {
    slug: p.slug, category: p.category as string, lang: p.lang, title: p.title,
    description: p.description, keywords: p.keywords ?? [],
    publishedAt: p.published_at,
    readingTime: p.reading_time, content: p.content,
    ctaHref: p.cta_href, ctaLabel: p.cta_label, ctaLabelEn: p.cta_label_en,
  };
}

// ── 页面主体 ──────────────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // 从数据库读取文章
  let post: PostDisplay | null = null;
  try {
    const db = await fetchPostBySlug(params.slug);
    if (db) post = fromDb(db);
  } catch { /* 降级 */ }

  if (!post) notFound();

  // chrome 语言 = 文章自身 lang（对无 cookie 的爬虫友好），非 cookie
  const locale: Locale = post.lang === "en" ? "en" : "zh";
  const t = BLOG_CHROME[locale];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meta = (CATEGORY_META as any)[post.category] ?? { label: "文章", labelEn: "Article", icon: "✦", color: "#c9a84c" };

  // ── 结构化数据 ──────────────────────────────────────────────────────────────
  const pageUrl = `https://aiastrum.com/blog/${canonicalSlug(post.slug)}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "url": pageUrl,
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": { "@type": "Organization", "name": "AiAstrum", "url": "https://aiastrum.com" },
    "publisher": {
      "@type": "Organization",
      "name": "AiAstrum · 命运密语",
      "url": "https://aiastrum.com",
      "logo": { "@type": "ImageObject", "url": "https://aiastrum.com/favicon.ico" },
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": pageUrl },
    "articleSection": meta.label,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://aiastrum.com" },
      { "@type": "ListItem", "position": 2, "name": "神秘学知识库", "item": "https://aiastrum.com/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": pageUrl },
    ],
  };

  // FAQPage 结构化数据（仅当正文含明确 FAQ 段时输出）——富媒体结果 + AI 摘要
  const faqSchema = buildFaqSchema(post.content);

  // 相关文章（按关键词相关度排序）+ 正文上下文内链：共用同一次全量查询
  let related: Array<{ slug: string; category: string; title: string; readingTime: number }> = [];
  let linkedContent = post.content;
  try {
    const pool = await fetchAllPosts(undefined, post.lang); // 仅元数据、无 content，同语言文章池
    const others = pool.filter(p => p.slug !== post!.slug);

    // ── 正文自动内链：优先同类文章作为锚词来源 ──────────────────────────────
    const candidates: LinkCandidate[] = [
      ...others.filter(p => p.category === post!.category),
      ...others.filter(p => p.category !== post!.category),
    ].map(p => ({ slug: p.slug, title: p.title, keywords: p.keywords }));
    linkedContent = injectContextualLinks(post.content, candidates, post.slug, { maxLinks: 8 });

    // ── 相关文章：与当前文章关键词重合数打分，同分按发布时间新→旧 ──────────
    const myKw = new Set((post.keywords ?? []).map(k => k.toLowerCase()));
    const score = (p: DbBlogPost) =>
      (p.keywords ?? []).reduce((n, k) => n + (myKw.has(k.toLowerCase()) ? 1 : 0), 0)
      + (p.category === post!.category ? 0.5 : 0); // 同类轻微加权
    related = others
      .slice()
      .sort((a, b) => {
        const d = score(b) - score(a);
        if (d !== 0) return d;
        return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
      })
      .slice(0, 6)
      .map(p => ({ slug: p.slug, category: p.category as string, title: p.title, readingTime: p.reading_time }));
  } catch { /* 忽略 */ }

  return (
    <div style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
      {/* 客户端校正 <html lang> 为文章实际语言 */}
      <SyncHtmlLang lang={post.lang} />
      {/* Article 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* BreadcrumbList 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
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
        .blog-inline-link { color:#e8c96a; text-decoration:underline; text-decoration-color:rgba(201,168,76,0.4); text-underline-offset:2px; transition:color 0.15s; }
        .blog-inline-link:hover { color:#f0d98a; text-decoration-color:rgba(201,168,76,0.8); }
      `}</style>

      {/* Nav */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(10,6,28,0.92)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(201,168,76,0.12)", padding:"0 20px", height:52, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Link href={withLocale(locale, "/blog")} className="blog-post-nav-back" style={{ display:"flex", alignItems:"center", gap:6, textDecoration:"none", color:"rgba(201,168,76,0.7)", fontSize:"0.8rem", transition:"color 0.18s" }}>{t.backKB}</Link>
        <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:`${meta.color}18`, border:`1px solid ${meta.color}35`, borderRadius:8, padding:"3px 10px", fontSize:"0.66rem", color:meta.color, fontWeight:600 }}>
          <span>{meta.icon}</span>{catLabel(post.category, locale)}
        </div>
        <Link href={`/${locale}`} style={{ color:"rgba(201,168,76,0.45)", fontSize:"0.72rem", textDecoration:"none" }}>{t.home}</Link>
      </nav>

      <div style={{ maxWidth:720, margin:"0 auto", padding:"40px 20px 80px" }}>

        {/* Header */}
        <header style={{ marginBottom:32 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:4, marginBottom:14, background:`${meta.color}18`, border:`1px solid ${meta.color}35`, borderRadius:8, padding:"3px 10px", fontSize:"0.66rem", color:meta.color }}>
            <span>{meta.icon}</span>{catLabel(post.category, locale)}
          </div>
          <h1 style={{ fontFamily:"serif", fontSize:"clamp(1.35rem,3.5vw,1.9rem)", fontWeight:700, color:"#e8d5a3", lineHeight:1.4, marginBottom:12 }}>{post.title}</h1>
          <p style={{ fontSize:"0.82rem", color:"rgba(200,175,140,0.6)", lineHeight:1.6, marginBottom:16 }}>{post.description}</p>
          <div style={{ display:"flex", alignItems:"center", gap:14, flexWrap:"wrap", fontSize:"0.66rem", color:"rgba(201,168,76,0.38)", paddingBottom:18, borderBottom:"1px solid rgba(201,168,76,0.1)" }}>
            <span>📅 {fmtDate(post.publishedAt, locale)}</span>
            <span>⏱ {t.aboutMinRead(post.readingTime)}</span>
          </div>
        </header>

        <CTACard post={post} meta={meta} locale={locale} />

        <article className="blog-content" style={{ marginTop:32 }} dangerouslySetInnerHTML={{ __html: linkedContent }} />

        <div style={{ marginTop:48 }}>
          <CTACard post={post} meta={meta} locale={locale} large />
        </div>

        {related.length > 0 && (
          <section style={{ marginTop:48 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
              <span style={{ fontSize:13, opacity:0.6 }}>✦</span>
              <span style={{ fontSize:"0.7rem", fontFamily:"Cinzel,serif", color:"rgba(201,168,76,0.5)", letterSpacing:"0.1em", textTransform:"uppercase" }}>{t.relatedArticles}</span>
              <div style={{ flex:1, height:1, background:"linear-gradient(to right,rgba(201,168,76,0.15),transparent)" }} />
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {related.map(r => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const relMeta = (CATEGORY_META as any)[r.category] ?? { icon: "✦", color: "#c9a84c" };
                return (
                  <Link key={r.slug} href={`/blog/${r.slug}`} style={{ textDecoration:"none" }}>
                    <div className="blog-related-item" style={{ padding:"14px 16px", borderRadius:12, background:"rgba(16,10,38,0.7)", border:"1px solid rgba(201,168,76,0.12)", display:"flex", alignItems:"flex-start", gap:12 }}>
                      <span style={{ fontSize:20, flexShrink:0, marginTop:1 }}>{relMeta.icon}</span>
                      <div>
                        <div style={{ fontSize:"0.84rem", color:"#e8d5a3", fontWeight:600, marginBottom:4, lineHeight:1.35 }}>{r.title}</div>
                        <div style={{ fontSize:"0.68rem", color:"rgba(200,175,140,0.5)" }}>{t.minRead(r.readingTime)}</div>
                      </div>
                      <span style={{ marginLeft:"auto", color:"rgba(201,168,76,0.4)", fontSize:"0.9rem", flexShrink:0, marginTop:2 }}>→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <Link
              href={withLocale(locale, `/blog?cat=${post.category}`)}
              className="blog-post-nav-back"
              style={{ display:"inline-flex", alignItems:"center", gap:6, marginTop:16, color:"rgba(201,168,76,0.7)", fontSize:"0.78rem", textDecoration:"none" }}
            >{t.viewAllCat(catLabel(post.category, locale))}</Link>
          </section>
        )}
      </div>
    </div>
  );
}

function CTACard({ post, meta, locale, large = false }: { post: PostDisplay; meta: { color: string; icon: string }; locale: Locale; large?: boolean }) {
  // en：优先用 cta_label_en，为空时回退中文 cta_label
  const ctaLabel = locale === "en" ? (post.ctaLabelEn || post.ctaLabel) : post.ctaLabel;
  return (
    <Link href={withLocale(locale, post.ctaHref)} style={{ textDecoration:"none", display:"block" }}>
      <div className="blog-post-cta" style={{ borderRadius:14, background:`linear-gradient(135deg,${meta.color}14 0%,rgba(100,60,200,0.12) 100%)`, border:`1px solid ${meta.color}30`, padding:large?"20px 20px":"14px 18px", display:"flex", alignItems:"center", gap:12, cursor:"pointer", boxShadow:`0 4px 20px ${meta.color}10` }}>
        <div style={{ width:large?44:36, height:large?44:36, borderRadius:10, background:`${meta.color}20`, border:`1px solid ${meta.color}35`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:large?20:16, flexShrink:0 }}>{meta.icon}</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:large?"0.88rem":"0.8rem", color:"rgba(232,213,163,0.88)", fontWeight:600, lineHeight:1.4 }}>{ctaLabel}</div>
          {large && <div style={{ fontSize:"0.68rem", color:"rgba(200,175,140,0.5)", marginTop:3 }}>免费使用 · AI 驱动 · 即时解读</div>}
        </div>
        <span style={{ color:meta.color, fontSize:"1.1rem", flexShrink:0, opacity:0.7 }}>→</span>
      </div>
    </Link>
  );
}
