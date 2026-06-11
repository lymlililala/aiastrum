// ─── 工具页底部「相关知识库文章」内链区（async server component）──────────────
// 从对应分类拉取文章，渲染指向 /blog/<slug> 的链接，把工具页权重导向文章。
// 自带容错：无文章或查询失败时返回 null，绝不影响工具页本身。
import Link from "next/link";
import { cookies } from "next/headers";
import { fetchAllPosts } from "~/lib/supabase";
import { CATEGORY_META, type BlogCategory } from "~/app/blog/blog-data";
import { LOCALES, type Locale } from "~/lib/i18n";

type CatMeta = (typeof CATEGORY_META)[BlogCategory];
const FALLBACK_META: CatMeta = { label: "知识库", labelEn: "Knowledge Base", icon: "📚", color: "#c9a84c" };

// 区块 chrome 三语文案
const UI: Record<Locale, { related: string; readMin: (n: number) => string; viewAll: (label: string) => string }> = {
  zh: { related: "相关知识库文章", readMin: (n) => `${n} 分钟阅读`, viewAll: (l) => `查看全部 ${l} 文章 →` },
  tw: { related: "相關知識庫文章", readMin: (n) => `${n} 分鐘閱讀`, viewAll: (l) => `查看全部 ${l} 文章 →` },
  en: { related: "Related Articles", readMin: (n) => `${n} min read`, viewAll: (l) => `View all ${l} articles →` },
};

async function readLocale(): Promise<Locale> {
  try {
    const v = (await cookies()).get("mystic_locale")?.value;
    if (v && LOCALES.includes(v as Locale)) return v as Locale;
  } catch { /* ignore */ }
  return "zh";
}

export default async function ToolArticleLinks({
  category,
  limit = 6,
}: {
  category: string;
  limit?: number;
}) {
  let posts: Array<{ slug: string; title: string; titleEn: string; readingTime: number }> = [];
  try {
    const data = await fetchAllPosts(category);
    posts = data
      .slice(0, limit)
      .map(p => ({ slug: p.slug, title: p.title, titleEn: p.title_en, readingTime: p.reading_time }));
  } catch {
    return null;
  }
  if (posts.length === 0) return null;

  const meta = (CATEGORY_META as Record<string, CatMeta>)[category] ?? FALLBACK_META;
  const locale = await readLocale();
  const t = UI[locale];
  const catLabel = locale === "en" ? meta.labelEn : meta.label;
  // 英文模式优先用 title_en（缺失则回退中文标题）；繁体暂无 title_tw，回退中文
  const titleOf = (p: { title: string; titleEn: string }) =>
    locale === "en" && p.titleEn ? p.titleEn : p.title;

  return (
    <section style={{ maxWidth: 720, margin: "0 auto", padding: "8px 20px 64px", position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 14, opacity: 0.7 }}>{meta.icon}</span>
        <span style={{ fontSize: "0.7rem", fontFamily: "Cinzel,serif", color: "rgba(201,168,76,0.55)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {t.related}
        </span>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,rgba(201,168,76,0.15),transparent)" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {posts.map(p => (
          <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: "none" }}>
            <div style={{ padding: "13px 16px", borderRadius: 12, background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.12)", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{meta.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "0.84rem", color: "#e8d5a3", fontWeight: 600, lineHeight: 1.35 }}>{titleOf(p)}</div>
                <div style={{ fontSize: "0.66rem", color: "rgba(200,175,140,0.5)", marginTop: 3 }}>{t.readMin(p.readingTime)}</div>
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
        {t.viewAll(catLabel)}
      </Link>
    </section>
  );
}
