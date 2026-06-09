import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchAllPosts, type DbBlogPost } from "~/lib/supabase";

export const revalidate = 3600;
export const dynamicParams = false; // 仅 4 个主题，构建时全量预渲染

const BASE_URL = "https://aiastrum.com";

interface Topic {
  h1: string;
  title: string;        // <title>（模板会追加 " | AiAstrum"）
  description: string;
  intro: string;        // SEO 正文 HTML
  match: (p: DbBlogPost) => boolean;
  ctaHref: string;
  ctaLabel: string;
}

const re = (p: DbBlogPost, rx: RegExp) => rx.test((p.slug + " " + p.title).toLowerCase());

// ── 4 个主题 pillar（依据 GSC：解梦/牌阵/符文/水晶 为已验证强需求）─────────────
const TOPICS: Record<string, Topic> = {
  "dream-interpretation": {
    h1: "解梦大全 · Dream Dictionary",
    title: "解梦大全：常见梦境含义完整索引 | Dream Dictionary",
    description: "周公解梦 × 荣格心理学双轨解析。梦见牙齿、蛇、水、坠落、死亡、名人、自然灾害……一站式查询常见梦境的象征意义与心理含义。",
    intro: `<p>你为什么会反复梦见同一个场景？梦见坠落、被追赶、牙齿脱落，到底是身体的信号还是潜意识在说话？这个解梦索引把站内所有「梦见 X」的解析汇总在一起，结合传统周公解梦与荣格心理学两个视角——既看象征寓意，也看情绪根源。点击任意主题查看完整解读。</p>
<p>提示：解梦没有「标准答案」。同一个梦，对不同处境的人意义不同。读的时候不妨先问自己：醒来时是什么情绪？最近生活里有哪件事让你有类似的感觉？</p>`,
    match: p => p.category === "dream" || p.category === "dreams" || re(p, /梦见|dream about|dreaming/),
    ctaHref: "/dream",
    ctaLabel: "👉 用 AI 解梦工具解读你的梦境",
  },
  "tarot-spreads": {
    h1: "塔罗牌阵大全 · Tarot Spreads",
    title: "塔罗牌阵大全：凯尔特十字等经典牌阵摆法与解读 | Tarot Spreads",
    description: "塔罗牌阵完整教程：凯尔特十字、三牌阵、关系阵、是非阵等经典牌阵的摆法、各位置含义与逐步解读方法，新手也能看懂。",
    intro: `<p>抽牌只是第一步，真正决定解读深度的是「牌阵」——每张牌落在哪个位置，就代表问题的哪个面向。这里汇总了站内所有牌阵教程，从最经典的凯尔特十字（10 张牌）到快速的三牌阵，每篇都讲清楚每个位置的含义和怎么把它们连起来读。</p>
<p>新手建议从三牌阵入手，熟悉之后再挑战凯尔特十字。下面按牌阵逐一展开。</p>`,
    match: p => p.category === "tarot" && re(p, /spread|牌阵|celtic|three[- ]card|horseshoe|cross/),
    ctaHref: "/tarot",
    ctaLabel: "👉 立即免费在线抽塔罗牌",
  },
  "rune-meanings": {
    h1: "卢恩符文大全 · Rune Meanings",
    title: "卢恩符文大全：24 个古弗萨克符文含义与逆位解读 | Rune Meanings",
    description: "古弗萨克（Elder Futhark）24 个卢恩符文的完整含义、正位与逆位解读、爱情与事业指引。北欧古老符文占卜一站式查询。",
    intro: `<p>卢恩符文是北欧最古老的占卜与书写系统，24 个古弗萨克符文各自承载一种原始能量——从代表财富的 Fehu 到象征胜利的 Tiwaz。这里把站内每个符文的解析汇总在一起，包含正位寓意、逆位警示，以及在爱情与事业上的具体指引。</p>
<p>无论你是抽到了某个符文想查含义，还是想系统了解整套符文，都可以从下面开始。</p>`,
    match: p => p.category === "rune" || re(p, /\brune\b|符文|futhark/),
    ctaHref: "/rune",
    ctaLabel: "👉 用 AI 抽一枚卢恩符文",
  },
  "crystal-healing": {
    h1: "水晶疗愈大全 · Crystal Healing",
    title: "水晶疗愈大全：各类水晶功效、用法与按需求选水晶 | Crystal Healing",
    description: "黑碧玺、白水晶、黑曜石、月光石……各类水晶的功效、净化方法与使用指南，以及「焦虑/睡眠/招财/护身/爱情」按需求选水晶。",
    intro: `<p>水晶不是迷信的摆件，而是一套关于「意图」与「专注」的练习工具。每种水晶都有它擅长的领域：黑碧玺护身、白水晶净化、月光石安抚情绪。这个索引汇总了站内所有水晶解析与脉轮主题，帮你按「水晶种类」或「想解决的问题」快速找到合适的那一颗。</p>
<p>第一次接触水晶？建议先看净化与使用方法，再根据自己当下的需求挑选。</p>`,
    match: p => p.category === "crystals" || p.category === "chakras" || re(p, /crystal|水晶|chakra|脉轮/),
    ctaHref: "/ai-mystic",
    ctaLabel: "👉 向 AI 神秘学顾问提问",
  },
};

export function generateStaticParams() {
  return Object.keys(TOPICS).map(topic => ({ topic }));
}

export async function generateMetadata({ params }: { params: { topic: string } }): Promise<Metadata> {
  const t = TOPICS[params.topic];
  if (!t) return {};
  const url = `${BASE_URL}/blog/topic/${params.topic}`;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: url },
    openGraph: { title: t.title, description: t.description, url, type: "website", siteName: "AiAstrum", images: [{ url: `${BASE_URL}/images/og-cover.png`, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: t.title, description: t.description, images: [`${BASE_URL}/images/og-cover.png`] },
  };
}

export default async function TopicPillarPage({ params }: { params: { topic: string } }) {
  const t = TOPICS[params.topic];
  if (!t) notFound();

  let posts: Array<{ slug: string; title: string; description: string; readingTime: number }> = [];
  try {
    const all = await fetchAllPosts();
    posts = all.filter(t.match)
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
      .map(p => ({ slug: p.slug, title: p.title, description: p.description ?? "", readingTime: p.reading_time }));
  } catch { /* 降级空 */ }

  const url = `${BASE_URL}/blog/topic/${params.topic}`;
  const itemList = {
    "@context": "https://schema.org", "@type": "ItemList",
    "name": t.h1, "url": url, "numberOfItems": posts.length,
    "itemListElement": posts.map((p, i) => ({ "@type": "ListItem", "position": i + 1, "url": `${BASE_URL}/blog/${p.slug}`, "name": p.title })),
  };
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "首页", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": "神秘学知识库", "item": `${BASE_URL}/blog` },
      { "@type": "ListItem", "position": 3, "name": t.h1, "item": url },
    ],
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <style>{`
        .pillar-card { transition: transform .2s, box-shadow .2s, border-color .2s; }
        .pillar-card:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(100,60,200,.18); border-color: rgba(201,168,76,.32); }
        .pillar-intro p { font-size:.92rem; color:rgba(200,175,140,.8); line-height:1.85; margin-bottom:14px; }
      `}</style>

      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(10,6,28,.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(201,168,76,.12)", padding: "0 20px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/blog" style={{ color: "rgba(201,168,76,.75)", fontSize: ".8rem", textDecoration: "none" }}>← 返回知识库</Link>
        <Link href="/" style={{ color: "rgba(201,168,76,.45)", fontSize: ".72rem", textDecoration: "none" }}>首页</Link>
      </nav>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 20px 80px" }}>
        <header style={{ marginBottom: 24 }}>
          <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: 700, color: "#e8d5a3", lineHeight: 1.3, marginBottom: 14 }}>{t.h1}</h1>
          <div className="pillar-intro" dangerouslySetInnerHTML={{ __html: t.intro }} />
          <p style={{ fontSize: ".72rem", color: "rgba(201,168,76,.45)", marginTop: 8 }}>共 {posts.length} 篇相关文章</p>
        </header>

        <Link href={t.ctaHref} style={{ textDecoration: "none", display: "block", marginBottom: 28 }}>
          <div style={{ borderRadius: 14, background: "linear-gradient(135deg,rgba(201,168,76,.12),rgba(100,60,200,.12))", border: "1px solid rgba(201,168,76,.3)", padding: "14px 18px", color: "rgba(232,213,163,.9)", fontWeight: 600, fontSize: ".88rem" }}>{t.ctaLabel} →</div>
        </Link>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,400px),1fr))", gap: 12 }}>
          {posts.map(p => (
            <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: "none" }}>
              <article className="pillar-card" style={{ borderRadius: 14, background: "rgba(16,10,38,.85)", border: "1px solid rgba(201,168,76,.15)", padding: "16px 18px", height: "100%" }}>
                <h2 style={{ fontSize: ".92rem", fontWeight: 700, color: "#e8d5a3", lineHeight: 1.4, marginBottom: 6, fontFamily: "serif" }}>{p.title}</h2>
                <p style={{ fontSize: ".74rem", color: "rgba(200,175,140,.58)", lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.description}</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
