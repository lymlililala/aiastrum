import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://tixgzezefjjsyuzgdhcd.supabase.co";

// ⚠️ Supabase 已于 2026-06-08 停用 legacy anon/service_role key。
// 优先读取环境变量里的「新版」key（publishable / secret），未配置时回退到旧值。
// 修复生产：在 Vercel 配置 SUPABASE_SECRET_KEY=sb_secret_xxx 即可，无需改代码。
//   - SUPABASE_PUBLISHABLE_KEY: 新版公开 key（替代 anon），用于客户端/公开读取
//   - SUPABASE_SECRET_KEY:      新版私密 key（替代 service_role），仅服务端，绕过 RLS
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNDkzNzgsImV4cCI6MjA5MzcyNTM3OH0.Hpr0F_kgFc9OkOla-UGHBioR6y2OBB2jbI-0xKMU1M4";
const SUPABASE_SERVICE_KEY =
  process.env.SUPABASE_SECRET_KEY ??
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  // 未配置时用占位符（非空，避免 createClient 启动即抛错）→ 请求会 401 被优雅降级。
  // 生产请在 Vercel 配置 SUPABASE_SECRET_KEY，本地请写入 .env。
  "MISSING_SUPABASE_SECRET_KEY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// 服务端专用客户端：用于 generateStaticParams 和服务端渲染，绕过 RLS 行数限制
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ── 类型定义（对应 mysticai_blog_posts 表）──────────────────────────────────
export interface DbBlogPost {
  id: number;
  slug: string;
  category: string; // 支持所有分类：tarot | dream | horoscope | astro | ... 共22种
  title: string;
  title_en: string;
  description: string;
  keywords: string[];
  published_at: string;
  reading_time: number;
  content: string;
  cta_href: string;
  cta_label: string;
  cta_label_en: string;
  created_at: string;
  updated_at: string;
}

// ── 查询函数 ──────────────────────────────────────────────────────────────────

// Supabase 单次查询默认上限 1000 行；超过需分页 .range() 否则会被静默截断。
const PAGE_SIZE = 1000;

/**
 * 轻量重试包装：Supabase / 网络偶发抖动时重试，避免一次失败就让
 * sitemap / 博客列表「整组文章静默消失」（这会直接导致 Google「已发现/已抓取-未编入索引」）。
 */
async function withRetry<T>(fn: () => Promise<T>, retries = 2): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i < retries) await new Promise(r => setTimeout(r, 300 * (i + 1)));
    }
  }
  throw lastErr;
}

/** 获取所有文章（列表页用，不含 content 节省带宽）— 服务端用 admin 绕过 RLS */
async function fetchAllPostsRaw(category?: string): Promise<DbBlogPost[]> {
  return withRetry(async () => {
    const all: DbBlogPost[] = [];
    // 分页拉取，突破 1000 行上限，确保 sitemap 收录全部文章
    for (let from = 0; ; from += PAGE_SIZE) {
      let query = supabaseAdmin
        .from("mysticai_blog_posts")
        .select("id,slug,category,title,title_en,description,keywords,published_at,reading_time,cta_href,cta_label,cta_label_en")
        .order("published_at", { ascending: false })
        .range(from, from + PAGE_SIZE - 1);

      if (category && category !== "all") {
        query = query.eq("category", category);
      }

      const { data, error } = await query;
      if (error) throw error;
      const rows = (data ?? []) as DbBlogPost[];
      all.push(...rows);
      if (rows.length < PAGE_SIZE) break;
    }
    return all;
  });
}

// 跨请求缓存全量文章查询（1 小时）。force-dynamic 页面每请求都会调用它，
// 不缓存会导致每次抓取都全表扫描 + 内链注入，并发抓取时易超时；缓存后渲染变轻。
const fetchAllPostsCached = unstable_cache(
  (category?: string) => fetchAllPostsRaw(category),
  ["mysticai-all-posts"],
  { revalidate: 3600, tags: ["blog-posts"] },
);

export function fetchAllPosts(category?: string): Promise<DbBlogPost[]> {
  return fetchAllPostsCached(category);
}

/** 按 slug 获取单篇文章（含 content）— 服务端用 admin 绕过 RLS */
export async function fetchPostBySlug(slug: string): Promise<DbBlogPost | null> {
  return withRetry(async () => {
    const { data, error } = await supabaseAdmin
      .from("mysticai_blog_posts")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      if (error.code === "PGRST116") return null; // not found
      throw error;
    }
    return (data as DbBlogPost) ?? null;
  });
}

/** 获取所有 slug（用于 generateStaticParams）— 用 admin 绕过 RLS 确保全量返回 */
export async function fetchAllSlugs(): Promise<string[]> {
  return withRetry(async () => {
    const slugs: string[] = [];
    for (let from = 0; ; from += PAGE_SIZE) {
      const { data, error } = await supabaseAdmin
        .from("mysticai_blog_posts")
        .select("slug")
        .range(from, from + PAGE_SIZE - 1);
      if (error) throw error;
      const rows = (data ?? []) as { slug: string }[];
      slugs.push(...rows.map(r => r.slug));
      if (rows.length < PAGE_SIZE) break;
    }
    return slugs;
  });
}
