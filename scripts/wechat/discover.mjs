// 关键词发现玄学/命理类公众号候选 —— 复用 chinatravel 的 cimidata 客户端（凭证在其 .env）。
// searchAccounts 只返回 nickname/wxid/biz/description，不返回粉丝数/更新频率，
// 命中关键词数越多越可能是核心命理号，按此排序供人工筛选。
// 用法：node scripts/wechat/discover.mjs
//       node scripts/wechat/discover.mjs --keywords "塔罗,八字,星盘"

import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { CimiClient } from './cimidata/client.mjs'

const __dir = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dir, 'data')

function arg(name, def) {
  const i = process.argv.indexOf(name)
  return i === -1 ? def : process.argv[i + 1]
}

// 覆盖 aiastrum 各功能：星座/命理/塔罗/八字/紫微/奇门/梅花/解梦/灵签/风水/姓名/面相/符文/运势
const DEFAULT_KEYWORDS = [
  '星座', '星座运势', '占星', '星盘', '命理', '玄学', '塔罗',
  '八字', '紫微斗数', '周易', '易经', '风水', '占卜', '周公解梦',
  '奇门遁甲', '黄历', '姓名学', '面相手相', '运势', '灵签求签'
]
const kwArg = arg('--keywords', null)
const KEYWORDS = kwArg ? kwArg.split(',').map(s => s.trim()).filter(Boolean) : DEFAULT_KEYWORDS

mkdirSync(DATA_DIR, { recursive: true })
const OUT = join(DATA_DIR, 'discovered-accounts.json')

const cimi = new CimiClient({ minIntervalMs: 2500 })
const sleep = ms => new Promise(r => setTimeout(r, ms))
const byWxid = new Map()

console.log(`扫 ${KEYWORDS.length} 个命理/玄学关键词发现公众号候选…\n`)

for (const kw of KEYWORDS) {
  let accounts = []
  for (let i = 0; i < 3; i++) {
    try {
      accounts = await cimi.searchAccounts(kw)
      if (accounts.length) break
    } catch (e) {
      if (e.code !== 1002) { console.log(`  ✗ ${kw}: ${e.message}`); break }
    }
    await sleep(6000)
  }
  let added = 0
  for (const a of accounts) {
    if (!a.wxid) continue
    const prev = byWxid.get(a.wxid)
    if (prev) prev.keywords.add(kw)
    else {
      byWxid.set(a.wxid, {
        nickname: a.nickname, wxid: a.wxid, biz: a.biz,
        description: a.description, keywords: new Set([kw])
      })
      added++
    }
  }
  console.log(`  ${kw}: ${accounts.length} 条，新增 ${added} 个`)
}

const result = [...byWxid.values()]
  .map(a => ({ ...a, keywords: [...a.keywords] }))
  .sort((a, b) => b.keywords.length - a.keywords.length)

writeFileSync(OUT, JSON.stringify(result, null, 2))
console.log(`\n发现 ${result.length} 个去重候选 → ${OUT}，余额 ${cimi.balance}`)
