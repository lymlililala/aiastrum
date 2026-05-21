import { type MetadataRoute } from "next";
import { fetchAllPosts } from "~/lib/supabase";

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

  // ── 2. 工具页面：无语言前缀（真实可访问路径）──────────────────────────────
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
  ];

  const toolEntries: MetadataRoute.Sitemap = toolRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: SITE_LAUNCH,
    changeFrequency,
    priority,
  }));

  // ── 3. 博客文章页（动态获取，只有中文内容）──────────────────────────────
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await fetchAllPosts();
    blogEntries = posts.map(post => {
      // 确保 lastModified 不超过今天
      const pubDate = new Date(post.published_at);
      const now = new Date();
      return {
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: pubDate > now ? SITE_LAUNCH : pubDate,
        changeFrequency: "monthly" as const,
        priority: 0.85,
      };
    });
  } catch {
    // 数据库不可达时 sitemap 只包含静态页面
  }

  return [...homeEntries, ...toolEntries, ...blogEntries];
}
