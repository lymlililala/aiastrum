#!/usr/bin/env python3
"""
从对话记录中提取博客文章数据，直接生成 seed-blog.mjs
"""
import re
import json
import os

TRANSCRIPT = "/Users/lym/.catpaw/projects/ide-Users-lym-Documents-code-tarot/9fdfaad6-2dd7-4b3c-97ec-c0a95746d305/agent-transcripts/transcript.txt"
OUTPUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "seed-blog.mjs")

# 读取对话记录
print("Reading transcript...")
with open(TRANSCRIPT, "r", encoding="utf-8") as f:
    src = f.read()

print(f"Transcript size: {len(src):,} chars")

# 找到包含所有文章的 BLOG_POSTS 数组
# 寻找最长的一个（包含29篇文章的那个）
# 从对话记录中找到 "export const BLOG_POSTS: BlogPost[] = [" 
# 然后找到对应的完整数组

matches = []
search_str = "export const BLOG_POSTS: BlogPost[] = ["
pos = 0
while True:
    idx = src.find(search_str, pos)
    if idx == -1:
        break
    # 找到数组的 [ 位置
    eq_bracket = src.find("= [", idx)
    i = eq_bracket + 2  # 指向 [
    depth = 0
    for j in range(i, min(i + 2000000, len(src))):
        if src[j] == "[":
            depth += 1
        elif src[j] == "]":
            depth -= 1
            if depth == 0:
                array_end = j + 1
                break
    else:
        pos = idx + 1
        continue
    
    array_content = src[i:array_end]
    # 计算文章数量（粗略）
    count = array_content.count("slug:")
    matches.append((idx, array_content, count))
    print(f"  Found BLOG_POSTS at line ~{src[:idx].count(chr(10))}, ~{count} posts")
    pos = idx + 1

if not matches:
    print("ERROR: No BLOG_POSTS found!")
    exit(1)

# 选择文章数量最多的那个
best = max(matches, key=lambda x: x[2])
print(f"Using BLOG_POSTS with {best[2]} posts")
array_content = best[1]

# 提取每篇文章
posts_raw = []
depth = 0
current_start = None
for i, ch in enumerate(array_content):
    if ch == "{" and depth == 0:
        depth = 1
        current_start = i
    elif ch == "{":
        depth += 1
    elif ch == "}" and depth == 1:
        depth = 0
        post_str = array_content[current_start:i+1]
        posts_raw.append(post_str)
    elif ch == "}":
        depth -= 1

print(f"Found {len(posts_raw)} raw post objects")

# 解析字段
def extract_field(post_str, field):
    # 先尝试双引号
    pat = re.compile(rf'\b{field}:\s*"([^"]*)"', re.DOTALL)
    m = pat.search(post_str)
    if m:
        return m.group(1)
    return None

def extract_number(post_str, field):
    pat = re.compile(rf'\b{field}:\s*(\d+)', re.DOTALL)
    m = pat.search(post_str)
    if m:
        return int(m.group(1))
    return None

def extract_keywords(post_str):
    pat = re.compile(r'\bkeywords:\s*\[([^\]]*)\]', re.DOTALL)
    m = pat.search(post_str)
    if not m:
        return []
    items_str = m.group(1)
    items = re.findall(r'"([^"]*)"', items_str)
    return items

def extract_content(post_str):
    idx = post_str.find("content: `")
    if idx == -1:
        idx = post_str.find("content:`")
    if idx == -1:
        return ""
    tick_start = post_str.index("`", idx)
    i = tick_start + 1
    while i < len(post_str):
        if post_str[i] == "\\":
            i += 2
            continue
        if post_str[i] == "`":
            return post_str[tick_start+1:i]
        i += 1
    return ""

def js_string(s):
    s = s.replace("\\", "\\\\")
    s = s.replace("`", "\\`")
    s = s.replace("${", "\\${")
    return s

parsed = []
seen_slugs = set()
for p in posts_raw:
    slug = extract_field(p, "slug")
    if not slug or slug in seen_slugs or slug.startswith("__test"):
        continue
    seen_slugs.add(slug)
    
    category = extract_field(p, "category")
    title = extract_field(p, "title")
    title_en = extract_field(p, "titleEn") or extract_field(p, "title_en") or ""
    description = extract_field(p, "description")
    keywords = extract_keywords(p)
    published_at = extract_field(p, "publishedAt") or extract_field(p, "published_at")
    reading_time = extract_number(p, "readingTime") or extract_number(p, "reading_time") or 5
    cta_href = extract_field(p, "ctaHref") or extract_field(p, "cta_href") or "/"
    cta_label = extract_field(p, "ctaLabel") or extract_field(p, "cta_label") or ""
    cta_label_en = extract_field(p, "ctaLabelEn") or extract_field(p, "cta_label_en") or ""
    content = extract_content(p).strip()
    
    if not title or not category:
        continue
    
    parsed.append({
        "slug": slug,
        "category": category,
        "title": title,
        "title_en": title_en,
        "description": description or "",
        "keywords": keywords,
        "published_at": published_at or "2026-05-21",
        "reading_time": reading_time,
        "cta_href": cta_href,
        "cta_label": cta_label,
        "cta_label_en": cta_label_en,
        "content": content,
    })

print(f"Parsed {len(parsed)} unique posts")
for p in parsed:
    print(f"  - {p['slug']} ({p['category']})")

# 生成 seed-blog.mjs
header = r"""/**
 * 全量种子脚本：将所有博客文章写入 Supabase
 *
 * ─── 使用方式 ──────────────────────────────────────────────────────────────────
 *
 * 方式①：提供数据库密码（推荐，可自动移除 category CHECK 约束）
 *   SUPABASE_DB_PASSWORD="[DB密码]" node scripts/seed-blog.mjs
 *   DB密码获取：Supabase Dashboard → Settings → Database → Database password
 *
 * 方式②：提供完整 DATABASE_URL（含密码）
 *   DATABASE_URL="postgresql://postgres:[密码]@db.tixgzezefjjsyuzgdhcd.supabase.co:5432/postgres" \
 *   node scripts/seed-blog.mjs
 *
 * 方式③：不提供密码（只上传 tarot/dream/horoscope 分类，其余被约束拦截）
 *   node scripts/seed-blog.mjs
 *
 * 如果方式①②失败，也可先手动在 Supabase SQL Editor 执行：
 *   ALTER TABLE mysticai_blog_posts DROP CONSTRAINT IF EXISTS mysticai_blog_posts_category_check;
 * 然后用方式③重新运行。
 */

import { createClient } from "@supabase/supabase-js";
import { execSync } from "child_process";

const SUPABASE_URL = "https://tixgzezefjjsyuzgdhcd.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E";
const DB_HOST = "db.tixgzezefjjsyuzgdhcd.supabase.co";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// ─── Step 1: 移除 category CHECK 约束 ─────────────────────────────────────────
async function dropCategoryConstraint() {
  const DB_PASSWORD = process.env.SUPABASE_DB_PASSWORD;
  const DATABASE_URL = process.env.DATABASE_URL
    ?? (DB_PASSWORD ? `postgresql://postgres:${encodeURIComponent(DB_PASSWORD)}@${DB_HOST}:5432/postgres` : null);

  if (!DATABASE_URL) {
    console.log("ℹ️  未提供 SUPABASE_DB_PASSWORD，跳过约束移除（tarot/dream/horoscope 以外的文章可能上传失败）");
    return false;
  }

  console.log("🔧 尝试移除 category CHECK 约束...");

  // 方法1：尝试 supabase CLI (无需安装额外依赖)
  try {
    const hasCLI = (() => { try { execSync("which supabase", { stdio: "ignore" }); return true; } catch { return false; } })();
    if (hasCLI && DB_PASSWORD) {
      const sql = "ALTER TABLE mysticai_blog_posts DROP CONSTRAINT IF EXISTS mysticai_blog_posts_category_check;";
      const dbUrl = `postgresql://postgres@${DB_HOST}:5432/postgres`;
      execSync(
        `supabase --experimental db query "${sql}" --db-url "${dbUrl}"`,
        {
          env: { ...process.env, SUPABASE_DB_PASSWORD: DB_PASSWORD },
          stdio: "inherit",
        }
      );
      console.log("  ✅ 约束已通过 Supabase CLI 移除！");
      return true;
    }
  } catch (err) {
    console.log("  ⚠️  Supabase CLI 执行失败，尝试 pg 直连...");
  }

  // 方法2：pg 直连
  try {
    const { default: pkg } = await import("pg");
    const { Client } = pkg;
    const client = new Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });
    await client.connect();
    await client.query(
      "ALTER TABLE mysticai_blog_posts DROP CONSTRAINT IF EXISTS mysticai_blog_posts_category_check;"
    );
    await client.end();
    console.log("  ✅ 约束已通过 pg 直连移除！");
    return true;
  } catch (err) {
    console.error("  ❌ 移除约束失败:", err.message);
    console.log("  💡 请手动在 Supabase SQL Editor 执行：");
    console.log("     ALTER TABLE mysticai_blog_posts DROP CONSTRAINT IF EXISTS mysticai_blog_posts_category_check;");
    return false;
  }
}

// ─── Step 2: 全部文章数据 ─────────────────────────────────────────────────────
const posts = [
"""

post_strs = []
for p in parsed:
    kw_json = json.dumps(p["keywords"], ensure_ascii=False)
    content_escaped = js_string(p["content"])
    post_js = f'''  {{
    slug: {json.dumps(p["slug"], ensure_ascii=False)},
    category: {json.dumps(p["category"], ensure_ascii=False)},
    title: {json.dumps(p["title"], ensure_ascii=False)},
    title_en: {json.dumps(p["title_en"], ensure_ascii=False)},
    description: {json.dumps(p["description"], ensure_ascii=False)},
    keywords: {kw_json},
    published_at: {json.dumps(p["published_at"], ensure_ascii=False)},
    reading_time: {p["reading_time"]},
    cta_href: {json.dumps(p["cta_href"], ensure_ascii=False)},
    cta_label: {json.dumps(p["cta_label"], ensure_ascii=False)},
    cta_label_en: {json.dumps(p["cta_label_en"], ensure_ascii=False)},
    content: `{content_escaped}`,
  }}'''
    post_strs.append(post_js)

footer = r"""
];

// ─── Step 3: Upsert 所有文章 ──────────────────────────────────────────────────
async function seedPosts() {
  console.log(`\n📝 准备上传 ${posts.length} 篇文章...`);

  const rows = posts.map(p => ({
    slug: p.slug,
    category: p.category,
    title: p.title,
    title_en: p.title_en,
    description: p.description,
    keywords: p.keywords,
    published_at: p.published_at,
    reading_time: p.reading_time,
    content: p.content,
    cta_href: p.cta_href,
    cta_label: p.cta_label,
    cta_label_en: p.cta_label_en,
    updated_at: new Date().toISOString(),
  }));

  const BATCH = 5;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const { error } = await supabase
      .from("mysticai_blog_posts")
      .upsert(batch, { onConflict: "slug" });

    if (error) {
      console.error(`  ❌ Batch ${Math.floor(i / BATCH) + 1} 错误:`, error.message);
      if (error.message.includes("check constraint")) {
        console.log("  💡 提示：category CHECK 约束阻止了上传，请提供 SUPABASE_DB_PASSWORD 后重新运行");
      }
      errorCount += batch.length;
    } else {
      console.log(`  ✅ Batch ${Math.floor(i / BATCH) + 1}: 已上传 ${batch.length} 篇`);
      successCount += batch.length;
    }
  }

  console.log(`\n🎉 完成！${successCount} 篇上传成功，${errorCount} 篇失败。`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🚀 开始上传博客文章到 Supabase...\n");
  await dropCategoryConstraint();
  await seedPosts();
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
"""

with open(OUTPUT, "w", encoding="utf-8") as f:
    f.write(header)
    f.write(",\n".join(post_strs))
    f.write(footer)

print(f"\n✅ Generated {OUTPUT}")
print(f"   Posts: {len(parsed)}")
