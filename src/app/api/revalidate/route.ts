// ─── 按需刷新博客数据缓存 + sitemap ─────────────────────────────────────────
// 背景:sitemap/博客页数据走 unstable_cache(tag: "blog-posts", 1h),且 Vercel
// Data Cache 跨部署保留——手动写库(发文/meta 优化)后,线上 sitemap 最长滞后 1 小时,
// 期间新文章不被收录。nightly Deploy Hook 能兜底,但手动批次需要即时刷新手段。
//
// 用法(本地 seed/meta 脚本写库后执行):
//   curl -X POST https://aiastrum.com/api/revalidate \
//     -H "Authorization: Bearer $SUPABASE_SECRET_KEY"
// 鉴权复用 Vercel 已有的 SUPABASE_SECRET_KEY,无需新增环境变量。
import { revalidatePath, revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const secret = process.env.SUPABASE_SECRET_KEY;
  const auth = req.headers.get("authorization") ?? "";
  if (!secret || auth !== `Bearer ${secret}`) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  // 1. 博客列表/详情的数据缓存(fetchAllPosts / fetchPostBySlug,tag 见 src/lib/supabase.ts)
  revalidateTag("blog-posts");
  // 2. sitemap.xml 的 ISR 输出缓存(部分 Next 版本对 metadata 路由无效,无效时
  //    数据缓存已刷新,sitemap 会在其自然 ISR 周期内重建,最迟 1 小时)
  revalidatePath("/sitemap.xml");
  return Response.json({ ok: true, revalidated: ["blog-posts", "/sitemap.xml"], at: new Date().toISOString() });
}
