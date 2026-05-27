// ─── 博客文章数据层 ───────────────────────────────────────────────────────────
// 文章内容已迁移至 Supabase 数据库，此文件只保留类型定义和分类元数据
// 专栏：tarot | dream | horoscope | astro | numerology | rune | bazi | ziwei
//        naming | wuge | meihua | qimen | almanac | lingqian | love | face-reading
//        mbti | synastry | daily-fortune | daily-card | pet-psychic | ai-mystic
//        风水 | 水晶 | 冥想

export type BlogCategory =
  | "tarot"
  | "dream"
  | "horoscope"
  | "astro"
  | "numerology"
  | "rune"
  | "bazi"
  | "ziwei"
  | "naming"
  | "wuge"
  | "meihua"
  | "qimen"
  | "almanac"
  | "lingqian"
  | "love"
  | "face-reading"
  | "mbti"
  | "synastry"
  | "daily-fortune"
  | "daily-card"
  | "pet-psychic"
  | "ai-mystic"
  | "风水"
  | "水晶"
  | "冥想";

export interface BlogPost {
  slug: string;
  category: BlogCategory;
  title: string;
  titleEn: string;
  description: string;
  keywords: string[];
  publishedAt: string; // ISO date
  readingTime: number; // minutes
  content: string; // HTML string (可用 dangerouslySetInnerHTML)
  // 文章底部关联工具的 CTA
  ctaHref: string;
  ctaLabel: string;
  ctaLabelEn: string;
}

export const CATEGORY_META: Record<BlogCategory, { label: string; labelEn: string; icon: string; color: string }> = {
  tarot:         { label: "塔罗牌意",   labelEn: "Tarot Guide",          icon: "🔮", color: "#c9a84c" },
  dream:         { label: "周公解梦",   labelEn: "Dream Meanings",        icon: "💭", color: "#9b59ff" },
  horoscope:     { label: "星座运势",   labelEn: "Horoscope",             icon: "🌌", color: "#FF9800" },
  astro:         { label: "星盘解析",   labelEn: "Birth Chart",           icon: "✦",  color: "#6495ED" },
  numerology:    { label: "生命灵数",   labelEn: "Numerology",            icon: "🔯", color: "#7C3AED" },
  rune:          { label: "卢恩符文",   labelEn: "Rune Oracle",           icon: "ᚠ",  color: "#4a9eca" },
  bazi:          { label: "生辰八字",   labelEn: "Bazi",                  icon: "☯",  color: "#d4832a" },
  ziwei:         { label: "紫微斗数",   labelEn: "Purple Star",           icon: "紫", color: "#C77DFF" },
  naming:        { label: "墨韵起名",   labelEn: "Name Oracle",           icon: "🖌", color: "#c9a84c" },
  wuge:          { label: "姓名五格",   labelEn: "Name Numerology",       icon: "𝕎", color: "#5a9a5a" },
  meihua:        { label: "梅花心易",   labelEn: "I Ching Oracle",        icon: "🌸", color: "#C04851" },
  qimen:         { label: "奇门遁甲",   labelEn: "Qi Men Dun Jia",        icon: "奇", color: "#C9A84C" },
  almanac:       { label: "老黄历",     labelEn: "Feng Shui Calendar",    icon: "⏰", color: "#C0392B" },
  lingqian:      { label: "云端灵签",   labelEn: "Divine Oracle",         icon: "🪬", color: "#8B5CF6" },
  love:          { label: "姻缘占卜",   labelEn: "Love Oracle",           icon: "💞", color: "#b06aff" },
  "face-reading":{ label: "赛博算命",   labelEn: "Cyber Fortune",         icon: "👁", color: "#00F5FF" },
  mbti:          { label: "MBTI星球",   labelEn: "MBTI × Zodiac",         icon: "🧩", color: "#A78BFA" },
  synastry:      { label: "星盘合盘",   labelEn: "Synastry",              icon: "💫", color: "#E91E8C" },
  "daily-fortune":{ label: "每日开运",  labelEn: "Daily Fortune",         icon: "☀️", color: "#f0a500" },
  "daily-card":  { label: "每日提示卡", labelEn: "Daily Cosmic Card",     icon: "✦",  color: "#a78bfa" },
  "pet-psychic": { label: "宠物灵语",   labelEn: "Pet Psychic",           icon: "🐾", color: "#5dc885" },
  "ai-mystic":   { label: "AI解忧馆",   labelEn: "AI Mystic",             icon: "🔮", color: "#c084fc" },
  "风水":         { label: "风水布局",   labelEn: "Feng Shui",             icon: "🏯", color: "#22c55e" },
  "水晶":         { label: "水晶疗愈",   labelEn: "Crystal Healing",       icon: "💎", color: "#67e8f9" },
  "冥想":         { label: "冥想灵修",   labelEn: "Meditation",            icon: "🧘", color: "#a78bfa" },
};
