#!/usr/bin/env bash
# 玄学/命理公众号内容流水线一键串跑（小批量试跑）。各步也可单独跑，见 README.md。
# 用法：bash scripts/wechat/run-all.sh
set -euo pipefail
cd "$(dirname "$0")/../.."   # 切到项目根

echo "==> 0) 解析公众号 wxid（accounts.json 已有会增量跳过）"
node scripts/wechat/accounts.mjs

echo "==> 1) 采集（试跑：每号 1 页）"
node scripts/wechat/1-crawl.mjs --max-pages 1

echo "==> 2) 聚类（最多 4 簇）"
node scripts/wechat/2-cluster.mjs --max-clusters 4

echo "==> 3) 合成（试跑：前 1 簇，中英双发）"
node scripts/wechat/3-synthesize.mjs --limit 1

echo "==> 4) 发布判定（dry-run，不写库）"
node scripts/wechat/4-publish.mjs --dry-run

echo
echo "试跑完成。抽查 data/drafts.json 质量后，去掉 --dry-run 实际入库（小批量）："
echo "  node scripts/wechat/4-publish.mjs --threshold 82 --max-publish 1"
echo "到 Supabase / /blog 验证 zh+en 两篇可见、CTA/分类/配图正确。"
