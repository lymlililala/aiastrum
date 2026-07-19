import { type MetadataRoute } from "next";
import { fetchAllPosts, type DbBlogPost } from "~/lib/supabase";
import { CANONICAL_OVERRIDES } from "~/lib/canonical-overrides";
import { NOINDEX_SLUGS } from "~/lib/noindex-slugs";
import { LOCALES } from "~/lib/i18n";
import { CARD_BY_SLUG } from "~/app/tarot/card-slug";

// 已 301 到 /tarot/[card] 的博客文章（见 next.config.js redirects），sitemap 不再列出
const REDIRECTED_BLOG_SLUGS = new Set([
  "knight-of-swords-tarot-meaning",
  "page-of-cups-tarot-meaning",
  "page-of-wands-tarot-meaning",
  "the-star-tarot-reversed-meaning",
  "the-hermit-tarot-reversed-meaning",
  "the-empress-tarot-reversed-meaning",
  "the-emperor-tarot-reversed-meaning",
  "temperance-tarot-reversed-meaning",
  "the-world-tarot-reversed-meaning",
  "wheel-of-fortune-tarot-reversed-meaning",
  "the-chariot-tarot-reversed-meaning",
  // GSC 0719「已抓取-未编入索引」批次：同步 301 到牌意详情页
  "death-tarot-card-meaning",
  "hanged-man-tarot-meaning",
  "nine-of-pentacles-tarot-meaning",
]);

// ISR：缓存 1 小时，不用 force-dynamic。
// 经验（参考 aiskillnav）：force-dynamic 会让每次抓取都全量分页查 Supabase（慢，
// Googlebot 可能超时/降低抓取频率）。改 ISR 后 sitemap 走缓存、渲染轻量；
// nightly 发文后由 GitHub Actions 调 Vercel Deploy Hook 重新部署，可靠重建 sitemap
// （revalidatePath 对 sitemap.xml 无效，故用 Deploy Hook）。
export const revalidate = 3600;

const BASE_URL = "https://aiastrum.com";

// 网站实际上线日期（避免生成未来时间）；仅作 DB 不可达时的兜底
const SITE_LAUNCH = new Date("2025-01-01");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // 先取全量文章：除博客条目外，静态条目的 lastModified 也取「站点内容最后真实
  // 变更时间」（工具页含每日内容、整站 nightly 发文重建），不再用固定假日期——
  // Google 会忽略不可信的 lastmod。
  let posts: DbBlogPost[] = [];
  try {
    posts = await fetchAllPosts();
  } catch {
    // 数据库不可达时 sitemap 只包含静态页面
  }
  // 单篇文章的最后修改时间：max(published_at, updated_at)，未来日期以 now 封顶
  const postLastModified = (p: DbBlogPost): Date => {
    const pub = new Date(p.published_at).getTime();
    const upd = p.updated_at ? new Date(p.updated_at).getTime() : 0;
    return new Date(Math.min(Math.max(pub, upd), now.getTime()));
  };
  const siteLastMod = posts.length
    ? new Date(Math.max(...posts.map((p) => postLastModified(p).getTime())))
    : SITE_LAUNCH;

  // ── 1. 首页：生成三种语言版本（/zh /en /tw 是真实可访问路径）──────────────
  const homeEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/zh`,
      lastModified: siteLastMod,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          "zh-CN": `${BASE_URL}/zh`,
          "zh-TW": `${BASE_URL}/tw`,
          "en":    `${BASE_URL}/en`,
          "x-default": `${BASE_URL}/zh`,
        },
      },
    },
    {
      url: `${BASE_URL}/en`,
      lastModified: siteLastMod,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          "zh-CN": `${BASE_URL}/zh`,
          "zh-TW": `${BASE_URL}/tw`,
          "en":    `${BASE_URL}/en`,
          "x-default": `${BASE_URL}/zh`,
        },
      },
    },
    {
      url: `${BASE_URL}/tw`,
      lastModified: siteLastMod,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          "zh-CN": `${BASE_URL}/zh`,
          "zh-TW": `${BASE_URL}/tw`,
          "en":    `${BASE_URL}/en`,
          "x-default": `${BASE_URL}/zh`,
        },
      },
    },
  ];

  // ── 2. 工具页 / 信息页 / 博客列表：三语带前缀 URL + hreflang ────────────────
  // 每个基路径展开成 /zh /en /tw 三条，每条带 alternates.languages(zh-CN/zh-TW/en/x-default)
  const toolRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "/blog",          priority: 0.95, changeFrequency: "daily"   },
    { path: "/tarot",         priority: 0.9,  changeFrequency: "weekly"  },
    { path: "/horoscope",     priority: 0.9,  changeFrequency: "daily"   },
    { path: "/daily-fortune", priority: 0.9,  changeFrequency: "daily"   },
    { path: "/daily-card",    priority: 0.85, changeFrequency: "daily"   },
    { path: "/bazi",          priority: 0.85, changeFrequency: "weekly"  },
    { path: "/ziwei",         priority: 0.85, changeFrequency: "weekly"  },
    { path: "/astro",         priority: 0.85, changeFrequency: "weekly"  },
    { path: "/moon-sign-calculator", priority: 0.85, changeFrequency: "weekly"  },
    { path: "/rising-sign-calculator", priority: 0.85, changeFrequency: "weekly"  },
    { path: "/venus-sign-calculator", priority: 0.85, changeFrequency: "weekly"  },
    { path: "/life-path-calculator", priority: 0.85, changeFrequency: "weekly"  },
    { path: "/yes-no-tarot",      priority: 0.85, changeFrequency: "weekly"  },
    { path: "/free-rune-reading", priority: 0.85, changeFrequency: "weekly"  },
    { path: "/ai-mystic",     priority: 0.85, changeFrequency: "weekly"  },
    { path: "/synastry",      priority: 0.8,  changeFrequency: "weekly"  },
    { path: "/love",          priority: 0.8,  changeFrequency: "weekly"  },
    { path: "/naming",        priority: 0.8,  changeFrequency: "weekly"  },
    { path: "/numerology",    priority: 0.75, changeFrequency: "weekly"  },
    { path: "/mbti",          priority: 0.75, changeFrequency: "weekly"  },
    { path: "/dream",         priority: 0.75, changeFrequency: "weekly"  },
    { path: "/face-reading",  priority: 0.75, changeFrequency: "weekly"  },
    { path: "/meihua",        priority: 0.75, changeFrequency: "weekly"  },
    { path: "/qimen",         priority: 0.75, changeFrequency: "weekly"  },
    { path: "/wuge",          priority: 0.75, changeFrequency: "weekly"  },
    { path: "/rune",          priority: 0.75, changeFrequency: "weekly"  },
    { path: "/lingqian",      priority: 0.75, changeFrequency: "weekly"  },
    { path: "/almanac",       priority: 0.75, changeFrequency: "daily"   },
    { path: "/pet-psychic",   priority: 0.65, changeFrequency: "weekly"  },
    // ── 信息 / 法律页面 ──
    { path: "/about",         priority: 0.5,  changeFrequency: "monthly" },
    { path: "/contact",       priority: 0.5,  changeFrequency: "monthly" },
    { path: "/privacy",       priority: 0.3,  changeFrequency: "yearly"  },
    { path: "/terms",         priority: 0.3,  changeFrequency: "yearly"  },
  ];

  const langsFor = (path: string) => ({
    "zh-CN": `${BASE_URL}/zh${path}`,
    "zh-TW": `${BASE_URL}/tw${path}`,
    "en":    `${BASE_URL}/en${path}`,
    "x-default": `${BASE_URL}/zh${path}`,
  });

  const toolEntries: MetadataRoute.Sitemap = toolRoutes.flatMap(({ path, priority, changeFrequency }) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: siteLastMod,
      changeFrequency,
      priority,
      alternates: { languages: langsFor(path) },
    })),
  );

  // ── 2b. 主题 pillar 索引页 ────────────────────────────────────────────────
  const pillarEntries: MetadataRoute.Sitemap = [
    "dream-interpretation", "tarot-spreads", "rune-meanings", "crystal-healing",
    "numerology-life-path", "rising-signs", "angel-numbers",
  ].map(topic => ({
    url: `${BASE_URL}/blog/topic/${topic}`,
    lastModified: siteLastMod,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // ── 2c. 塔罗牌详情页（78 张，无前缀规范 URL，与博客详情同策略）──────────────
  const cardEntries: MetadataRoute.Sitemap = [...CARD_BY_SLUG.keys()].map((slug) => ({
    url: `${BASE_URL}/tarot/${slug}`,
    lastModified: siteLastMod,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ── 3. 博客文章页 ────────────────────────────────────────────────────────
  const blogEntries: MetadataRoute.Sitemap = posts
    // 排除被合并到主文章的次要重复 slug（canonical 已指向主文章，sitemap 不应再列出）、
    // noindex 薄文、已 301 到牌意详情页的旧文
    .filter(post => !CANONICAL_OVERRIDES[post.slug] && !NOINDEX_SLUGS.has(post.slug) && !REDIRECTED_BLOG_SLUGS.has(post.slug))
    .map(post => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: postLastModified(post),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }));

  return [...homeEntries, ...toolEntries, ...pillarEntries, ...cardEntries, ...blogEntries];
}
