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
};

export default config;
