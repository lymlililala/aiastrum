import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tixgzezefjjsyuzgdhcd.supabase.co";
// anon key — 用于客户端/公开读取
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNDkzNzgsImV4cCI6MjA5MzcyNTM3OH0.Hpr0F_kgFc9OkOla-UGHBioR6y2OBB2jbI-0xKMU1M4";
// service_role key — 仅用于服务端查询（绕过 RLS），不会暴露给客户端
const SUPABASE_SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E";

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

/** 获取所有文章（列表页用，不含 content 节省带宽）— 服务端用 admin 绕过 RLS */
export async function fetchAllPosts(category?: string): Promise<DbBlogPost[]> {
  let query = supabaseAdmin
    .from("mysticai_blog_posts")
    .select("id,slug,category,title,title_en,description,keywords,published_at,reading_time,cta_href,cta_label,cta_label_en")
    .order("published_at", { ascending: false });

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as DbBlogPost[];
}

/** 按 slug 获取单篇文章（含 content）— 服务端用 admin 绕过 RLS */
export async function fetchPostBySlug(slug: string): Promise<DbBlogPost | null> {
  const { data, error } = await supabaseAdmin
    .from("mysticai_blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // not found
    throw error;
  }
  return data as DbBlogPost;
}

/** 获取所有 slug（用于 generateStaticParams）— 用 admin 绕过 RLS 确保全量返回 */
export async function fetchAllSlugs(): Promise<string[]> {
  const { data, error } = await supabaseAdmin
    .from("mysticai_blog_posts")
    .select("slug");
  if (error) throw error;
  return (data ?? []).map((r: { slug: string }) => r.slug);
}
