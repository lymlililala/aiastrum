// Supabase 客户端封装 —— 供采集落库（mysticai_wx_sources，可选）与发布写
// mysticai_blog_posts（生产博客表）共用。
// SUPABASE_SECRET_KEY 来自：① 已注入的 process.env（CI / Vercel）；否则 ② 项目根 .env。

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = process.env.SUPABASE_URL || 'https://tixgzezefjjsyuzgdhcd.supabase.co'

const __dir = dirname(fileURLToPath(import.meta.url))
// scripts/wechat/lib → 项目根
const ROOT_ENV = join(__dir, '..', '..', '..', '.env')

// 从根 .env 兜底读取（不覆盖已存在的 process.env）。
function loadRootEnv() {
  try {
    const txt = readFileSync(ROOT_ENV, 'utf8')
    for (const line of txt.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
      if (m && !(m[1] in process.env)) process.env[m[1]] = m[2]
    }
  } catch {
    // 根 .env 不存在（如 CI 用真实环境变量）则跳过
  }
}

/** 是否具备走 Supabase 的条件。 */
export function hasSupabase() {
  if (!process.env.SUPABASE_SECRET_KEY) loadRootEnv()
  return !!process.env.SUPABASE_SECRET_KEY && process.env.SUPABASE_SECRET_KEY !== 'MISSING_SUPABASE_SECRET_KEY'
}

let _client = null

/** 取（懒加载）Supabase 客户端；缺 key 抛错。 */
export function getSupabase() {
  if (_client) return _client
  if (!process.env.SUPABASE_SECRET_KEY) loadRootEnv()
  const key = process.env.SUPABASE_SECRET_KEY
  if (!key || key === 'MISSING_SUPABASE_SECRET_KEY') {
    throw new Error('缺少 SUPABASE_SECRET_KEY（CI 用 Secrets，本地写项目根 .env）')
  }
  _client = createClient(SUPABASE_URL, key)
  return _client
}
