# aiastrum 玄学/命理公众号内容流水线

把中文命理类公众号内容，洗成站内**原创中英双语 HTML 科普文**，upsert 进 Supabase 表 `mysticai_blog_posts`（驱动 `/blog`）。改编自 chinatravel 的 nightly 流水线。

## 凭证（`.env`，已 gitignore）
- `scripts/wechat/.env`：`DEEPSEEK_API_KEY` `PEXELS_API_KEY` `UNSPLASH_ACCESS_KEY`
- `scripts/wechat/cimidata/.env`：`CIMIDATA_APP_ID` `CIMIDATA_APP_SECRET`（次幂数据采集）
- 项目根 `.env`：`SUPABASE_SECRET_KEY`（发布写库 / 判重）

## 流程
| 步 | 脚本 | 作用 |
|----|------|------|
| 0a | `discover.mjs` | 命理关键词扫公众号候选 → `data/discovered-accounts.json`（人工筛） |
| 0b | `accounts.mjs` | 精选种子名单解析 wxid → `data/accounts.json` |
| 1 | `1-crawl.mjs` | 逐号采历史文章 + 正文，按 sn 去重增量 → `data/sources.json` |
| 2 | `2-cluster.mjs` | DeepSeek 聚类成常青玄学选题簇（带 `suggested_category`）→ `data/clusters.json` |
| 3 | `3-synthesize.mjs` | 逐簇合成中文 HTML + 英文本地化，合成前判重 → `data/drafts.json` |
| 4 | `4-publish.mjs` | 质量闸门 + AI 自评分 → 过线 upsert 中英双行进 `mysticai_blog_posts` |
| — | `add-images.mjs` | 给库内已有无图文章补 `<img>`（备份原文后 update） |
| — | `run-all.sh` | 串联试跑 |

## 常用
```bash
node scripts/wechat/1-crawl.mjs --today              # 日更只采当天
node scripts/wechat/2-cluster.mjs --days 14 --max-clusters 6
node scripts/wechat/3-synthesize.mjs --limit 1       # 试跑一簇（--zh-only 只产中文）
node scripts/wechat/4-publish.mjs --dry-run          # 预览判定不写库
node scripts/wechat/4-publish.mjs --threshold 82 --max-publish 1   # 实际入库
node scripts/wechat/add-images.mjs --all --limit 10 --dry-run
```

## 护栏
- 发布只 `upsert(onConflict:'slug')`，**绝不 delete**（避免既有 URL 404 伤 SEO）。
- slug 入库前查重唯一化；`--max-publish` 单次上限；过质量闸门 + AI 自评分阈值才入库。
- 公众号 mmbiz 原图有防盗链不可用 → 配图统一走 Pexels/Unsplash 搜图 + 玄学写死图池兜底。
- 源文持久层默认本地 JSON；要 Supabase 持久化设 `WX_SOURCES_DB=1`（先建表 `mysticai_wx_sources`，DDL 见 `lib/sources.mjs` 注释）。
- 内容中立科普，不做绝对吉凶断言 / 不诱导付费消灾（合规）。
