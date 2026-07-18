import { type MetadataRoute } from "next";
import { fetchAllPosts } from "~/lib/supabase";
import { CANONICAL_OVERRIDES } from "~/lib/canonical-overrides";
import { LOCALES } from "~/lib/i18n";

// ISR：缓存 1 小时，不用 force-dynamic。
// 经验（参考 aiskillnav）：force-dynamic 会让每次抓取都全量分页查 Supabase（慢，
// Googlebot 可能超时/降低抓取频率）。改 ISR 后 sitemap 走缓存、渲染轻量；
// nightly 发文后由 GitHub Actions 调 Vercel Deploy Hook 重新部署，可靠重建 sitemap
// （revalidatePath 对 sitemap.xml 无效，故用 Deploy Hook）。
export const revalidate = 3600;

const BASE_URL = "https://aiastrum.com";

// 网站实际上线日期（避免生成未来时间）
const SITE_LAUNCH = new Date("2025-01-01");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── 1. 首页：生成三种语言版本（/zh /en /tw 是真实可访问路径）──────────────
  const homeEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/zh`,
      lastModified: SITE_LAUNCH,
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
      lastModified: SITE_LAUNCH,
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
      lastModified: SITE_LAUNCH,
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
      lastModified: SITE_LAUNCH,
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
    lastModified: SITE_LAUNCH,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // ── 3. 博客文章页（动态获取）──────────────────────────────────────────
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await fetchAllPosts();
    const now = new Date();
    blogEntries = posts
      // 排除被合并到主文章的次要重复 slug（canonical 已指向主文章，sitemap 不应再列出）
      .filter(post => !CANONICAL_OVERRIDES[post.slug])
      .map(post => {
      const pubDate = new Date(post.published_at);
      // 未来日期文章：用今天作为 lastModified（表示"刚发布"，促进 Google 抓取）
      return {
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: pubDate > now ? now : pubDate,
        changeFrequency: "monthly" as const,
        priority: 0.85,
      };
    });
  } catch {
    // 数据库不可达时 sitemap 只包含静态页面
  }

  return [...homeEntries, ...toolEntries, ...pillarEntries, ...blogEntries];
}
