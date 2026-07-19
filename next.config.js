/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  eslint: {
    // 构建时忽略 ESLint 错误（不影响开发时的代码质量检查）
    ignoreDuringBuilds: true,
  },
  // 延长静态页面生成超时（默认60s，含数据库查询时保险起见设为120s）
  staticPageGenerationTimeout: 120,
  // 静态资源长缓存：图片/图标内容不变，交给 CDN 与浏览器缓存一年
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.{png,jpg,jpeg,webp,avif,ico,svg}",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  // 旧塔罗牌意博文 301 到新的牌意详情页（内容更全、结构更优）
  async redirects() {
    return [
      { source: "/blog/knight-of-swords-tarot-meaning", destination: "/tarot/knight-of-swords", permanent: true },
      { source: "/blog/page-of-cups-tarot-meaning", destination: "/tarot/page-of-cups", permanent: true },
      { source: "/blog/page-of-wands-tarot-meaning", destination: "/tarot/page-of-wands", permanent: true },
      // the-star 逆位专文：新牌意详情页已含完整正逆位×爱情/事业/财运解读，301 合并权重
      { source: "/blog/the-star-tarot-reversed-meaning", destination: "/tarot/the-star", permanent: true },
      { source: "/blog/the-hermit-tarot-reversed-meaning", destination: "/tarot/the-hermit", permanent: true },
      { source: "/blog/the-empress-tarot-reversed-meaning", destination: "/tarot/the-empress", permanent: true },
      { source: "/blog/the-emperor-tarot-reversed-meaning", destination: "/tarot/the-emperor", permanent: true },
      { source: "/blog/temperance-tarot-reversed-meaning", destination: "/tarot/temperance", permanent: true },
      { source: "/blog/the-world-tarot-reversed-meaning", destination: "/tarot/the-world", permanent: true },
      { source: "/blog/wheel-of-fortune-tarot-reversed-meaning", destination: "/tarot/wheel-of-fortune", permanent: true },
      { source: "/blog/the-chariot-tarot-reversed-meaning", destination: "/tarot/the-chariot", permanent: true },
      // GSC 0719「已抓取-未编入索引」中的 3 篇牌意旧文，同样 301 合并到牌意详情页
      { source: "/blog/death-tarot-card-meaning", destination: "/tarot/death", permanent: true },
      { source: "/blog/hanged-man-tarot-meaning", destination: "/tarot/the-hanged-man", permanent: true },
      { source: "/blog/nine-of-pentacles-tarot-meaning", destination: "/tarot/nine-of-pentacles", permanent: true },
    ];
  },
};

export default config;
