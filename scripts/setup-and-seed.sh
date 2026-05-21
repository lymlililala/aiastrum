#!/bin/bash
# ─── 一键设置并上传博客文章到 Supabase ─────────────────────────────────────────
#
# 此脚本会：
# 1. 询问 Supabase 数据库密码
# 2. 删除 mysticai_blog_posts 表上的 category CHECK 约束
# 3. 上传全部 29 篇文章到 Supabase
#
# 获取数据库密码：
#   Supabase Dashboard → Settings → Database → Database password
#   (如果忘记密码可以在那里重置)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.."

echo "🔮 Supabase 博客文章上传工具"
echo "================================"
echo ""
echo "📖 请输入 Supabase 数据库密码："
echo "   (获取地址: Supabase Dashboard → Settings → Database)"
read -s -p "   密码: " DB_PASSWORD
echo ""

if [ -z "$DB_PASSWORD" ]; then
  echo "❌ 密码为空，退出"
  exit 1
fi

echo ""
echo "⏳ 开始上传..."
SUPABASE_DB_PASSWORD="$DB_PASSWORD" node scripts/seed-blog.mjs
