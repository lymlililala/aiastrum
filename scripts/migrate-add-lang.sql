-- ============================================================================
-- 迁移：为 mysticai_blog_posts 增加 lang 列，区分中/英文文章
-- 用法：在 Supabase 控制台 → SQL Editor 粘贴执行（一次即可，幂等）
-- 背景：表原本每行只承载一种语言正文，但英文文章（gsc1/gsc2）混在中文行里，
--       无法按语言过滤。加 lang 列后，博客可按当前语言干净呈现。
-- ============================================================================

-- 1) 加列，默认 'zh'（存量全部视为中文）
ALTER TABLE mysticai_blog_posts
  ADD COLUMN IF NOT EXISTS lang text NOT NULL DEFAULT 'zh';

-- 2) 把已入库的英文文章标记为 'en'
--    （gsc2 的 8 个 Elder Futhark 符文 + gsc1 的 1 篇英文星座年运）
UPDATE mysticai_blog_posts SET lang = 'en' WHERE slug IN (
  'uruz-rune-meaning-strength-vitality',
  'thurisaz-rune-meaning-protection-conflict',
  'raidho-rune-meaning-journey-movement',
  'kenaz-rune-meaning-knowledge-creativity',
  'gebo-rune-meaning-gift-partnership',
  'eihwaz-rune-meaning-transformation-endurance',
  'berkano-rune-meaning-birth-growth',
  'ehwaz-rune-meaning-partnership-trust',
  '2026-second-half-zodiac-horoscope'
);

-- 注：gsc1 的两篇意大利语（sognare-*）与一篇日语（*-12-signs-jp）暂留 'zh'。
-- 博客目前只服务 zh/en；如需精细处理，可后续单独 UPDATE 为 'it'/'ja' 并扩展渲染。

-- 3) 加索引，加速「按语言+分类+时间」列表查询
CREATE INDEX IF NOT EXISTS idx_blog_lang_cat_date
  ON mysticai_blog_posts (lang, category, published_at DESC);

-- 4) 校验（可选，跑完看一眼分布）
-- SELECT lang, count(*) FROM mysticai_blog_posts GROUP BY lang ORDER BY lang;
