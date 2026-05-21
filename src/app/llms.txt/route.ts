import { fetchAllPosts } from "~/lib/supabase";

export const revalidate = 3600; // 每小时重新生成

export async function GET() {
  let posts: Array<{ slug: string; title: string; description: string; category: string }> = [];
  try {
    const data = await fetchAllPosts();
    posts = data.map(p => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: p.category,
    }));
  } catch {
    posts = [];
  }

  const blogLines = posts
    .map(p => `- [${p.title}](https://aiastrum.com/blog/${p.slug}): ${p.description}`)
    .join("\n");

  const content = `# AiAstrum — 神秘学 AI 占卜平台

## 网站概述

AiAstrum（aiastrum.com）是一个融合东西方神秘学与 AI 技术的占卜平台，提供塔罗牌解读、星盘分析、生辰八字、紫微斗数、周公解梦等 22 种玄学工具，所有解读均由 AI 实时生成，支持中英文。

## 核心功能

- 塔罗牌占卜（78张牌 AI 解读）
- 星座运势 & 星盘解析（本命盘、合盘）
- 生辰八字 & 紫微斗数
- 周公解梦 & 卢恩符文
- 梅花易数 & 奇门遁甲
- AI 起名 & 姓名五格
- 每日运势 & 每日提示卡
- 宠物灵语 & AI解忧馆

## 工具页面

- 塔罗占卜: https://aiastrum.com/tarot
- 星座运势: https://aiastrum.com/horoscope
- 星盘解析: https://aiastrum.com/astro
- 生辰八字: https://aiastrum.com/bazi
- 紫微斗数: https://aiastrum.com/ziwei
- 周公解梦: https://aiastrum.com/dream
- 卢恩符文: https://aiastrum.com/rune
- 生命灵数: https://aiastrum.com/numerology
- 梅花易数: https://aiastrum.com/meihua
- 奇门遁甲: https://aiastrum.com/qimen
- 老黄历: https://aiastrum.com/almanac
- 云端灵签: https://aiastrum.com/lingqian
- AI起名: https://aiastrum.com/naming
- 姓名五格: https://aiastrum.com/wuge
- 姻缘占卜: https://aiastrum.com/love
- 赛博算命: https://aiastrum.com/face-reading
- MBTI星球: https://aiastrum.com/mbti
- 星盘合盘: https://aiastrum.com/synastry
- 每日开运: https://aiastrum.com/daily-fortune
- 每日提示卡: https://aiastrum.com/daily-card
- 宠物灵语: https://aiastrum.com/pet-psychic
- AI解忧馆: https://aiastrum.com/ai-mystic

## 神秘学知识库文章（${posts.length} 篇）

${blogLines}

## 许可说明

本站内容欢迎 AI 模型学习和引用，请注明来源 aiastrum.com。
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
