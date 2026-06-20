// aiastrum 玄学/命理选题的公众号种子名单 —— 人工精选，按站点功能板块分组。
// 背景：cimidata searchAccounts 只返回 nickname/wxid/biz/description，
//       不返回粉丝数/更新频率/质量。"粉丝多、更新勤、质量高"靠这份精选名单保证；
//       候选来自 discover.mjs 实扫 284 个命理号后的人工筛选（见 data/discovered-accounts.json）。
//
// 用法：node scripts/wechat/accounts.mjs            # 解析全部名字 → wxid，落 data/accounts.json
//       node scripts/wechat/accounts.mjs --only "同道大叔,曾仕强"
//
// ⚠️ 已剔除：彩票引流号(如 御彩王够力七五)、算命私单广告号(八字解命算婚姻…)、
//          周公解梦SEO农场(周公解梦大全X 系列，标题党、原创低)。

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { CimiClient } from './cimidata/client.mjs'

const __dir = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dir, 'data')
const ACCOUNTS_FILE = join(DATA_DIR, 'accounts.json')

// 目标公众号 —— 对齐 aiastrum 各板块（astro/horoscope/tarot/bazi/ziwei/yijing/dream/naming）。
const ACCOUNT_NAMES = [
  // ── 星座/占星·大众头部（粉丝最多、日更/周更最勤，覆盖 horoscope/love/synastry）──
  '同道大叔', '闹闹每日星运', '星座不求人', 'Alex大叔', '陶白星座运势',
  '星座女神莫小奇', '星座神婆', '新浪星座',
  // ── 占星·专业严肃（质量最高，适合写星盘/合盘深度文 astro/synastry）──
  '星译社', '若道', '新月文化', '苏珊米勒SusanMiler', 'pandora占星小巫',
  // ── 塔罗（tarot）──
  '塔羅星座艾菲爾老師', '塔罗蛙', '星月塔罗社', '预见塔塔',
  // ── 八字/命理工具·头部（bazi，粉丝大、更新勤）──
  '测测APP', '四柱八字命理学',
  // ── 紫微斗数（ziwei）──
  '文墨天机文化', '紫微斗数研究中心',
  // ── 周易/易经/风水·文化深度（meihua/qimen/almanac，质量高、更新勤）──
  '曾仕强', '易经天下', '易经四柱五行', '五行穿衣每日指南',
  // ── 姓名学/国学工具（naming/wuge）──
  '卯山国学',
  // ── 补充薄弱品类（dream/face-reading/qimen/meihua/ziwei/numerology），2026-06 精选 ──
  '周公来解梦',          // 解梦：传统智慧+科学洞察，原创心理向（非「周公解梦大全」SEO 农场）
  '相术天地',            // 面相：通俗理性、反迷信科普向
  '奇门遁甲术',          // 奇门：思谋星生认证，正文可正常采集（原「三易奇门遁甲」多为视频课程截图，正文拉不到）
  '梅花易数骨灰级玩家',  // 梅花：原创学习心得，非排盘工具号
  '生命灵数解读',        // 生命灵数：站点 /numerology 缺源，原创身心灵内容
  // ── 横向扩号（多源聚类，2026-06，均验证正文可采）──
  '随心面像',            // 面相补强(→2)：传统相学解说
  '塔罗牌卜卦',          // 塔罗补强：含塔罗历史/文化科普
  '子平术',              // 八字补强(→3)：十神/意象专业八字
  '八字命理知识汇'       // 八字补强(→4)：五行取用专业内容
]

const onlyArg = process.argv.find(a => a.startsWith('--only'))
const only = onlyArg
  ? (process.argv[process.argv.indexOf(onlyArg) + 1] || '').split(',').map(s => s.trim()).filter(Boolean)
  : null
const names = only && only.length ? ACCOUNT_NAMES.filter(n => only.includes(n)) : ACCOUNT_NAMES

mkdirSync(DATA_DIR, { recursive: true })
const existing = existsSync(ACCOUNTS_FILE) ? JSON.parse(readFileSync(ACCOUNTS_FILE, 'utf8')) : []
const byName = new Map(existing.map(a => [a.name, a]))

const cimi = new CimiClient({ minIntervalMs: 2500 })
const sleep = ms => new Promise(r => setTimeout(r, ms))

// 同名首次常报 1002「稍后再试」，需预热重试。
async function searchWithRetry(name, tries = 4) {
  let lastErr
  for (let i = 0; i < tries; i++) {
    try {
      const r = await cimi.searchAccounts(name)
      if (r.length) return r
    } catch (e) {
      lastErr = e
      if (e.code !== 1002) throw e
    }
    await sleep(6000)
  }
  if (lastErr) throw lastErr
  return []
}

console.log(`解析 ${names.length} 个命理公众号 wxid（含重试，较慢）…\n`)
for (const name of names) {
  try {
    const accounts = await searchWithRetry(name)
    const exact = accounts.find(a => a.nickname === name) || accounts[0]
    if (!exact) { console.log(`  ✗ ${name}: 无结果`); continue }
    byName.set(name, {
      name,
      nickname: exact.nickname,
      wxid: exact.wxid,
      biz: exact.biz,
      description: exact.description,
      candidates: accounts.filter(a => a.wxid !== exact.wxid).map(a => ({ nickname: a.nickname, wxid: a.wxid }))
    })
    console.log(`  ✓ ${name} → ${exact.wxid}${exact.nickname !== name ? ` (匹配到「${exact.nickname}」需人工核对)` : ''}`)
  } catch (e) {
    console.log(`  ✗ ${name}: ${e.message}`)
  }
}

writeFileSync(ACCOUNTS_FILE, JSON.stringify([...byName.values()], null, 2))
console.log(`\n落盘 ${byName.size} 个 → ${ACCOUNTS_FILE}，余额 ${cimi.balance}`)
console.log('⚠️  请人工核对 candidates 里的同名号，确认 wxid 后再用于抓取。')
