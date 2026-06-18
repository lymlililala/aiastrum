// 次幂 cimidata 出口 IP 可用性验证 —— 在 GitHub Actions 上点一下，确认当前
// appid 能否从云端 IP 正常采集（4102「appid无效或过期」常是按 IP 风控/未加白）。
// 用法：node scripts/wechat/verify-cimi.mjs

import { CimiClient } from './cimidata/client.mjs'

async function outboundIp() {
  for (const u of ['https://api.ipify.org?format=json', 'https://ifconfig.me/all.json']) {
    try {
      const r = await fetch(u, { signal: AbortSignal.timeout(8000) })
      const j = await r.json()
      return j.ip || j.ip_addr || JSON.stringify(j).slice(0, 80)
    } catch {}
  }
  return '(未取到)'
}

console.log('=== 次幂 cimidata 出口 IP 可用性验证 ===')
console.log('出口 IP:', await outboundIp())

const cimi = new CimiClient()
try {
  await cimi.authenticate()
  console.log('✅ 换 token 成功（凭证有效）')
} catch (e) {
  console.log('❌ 换 token 失败:', e.message)
  process.exit(2)
}
try {
  const accounts = await cimi.searchAccounts('塔罗')
  console.log(`✅ 数据接口成功：返回 ${accounts.length} 条，余额 ${cimi.balance}`)
  console.log('结论：该 IP 可正常采集 ✓')
} catch (e) {
  console.log('❌ 数据接口失败:', e.message, `(code=${e.code ?? '?'})`)
  console.log('结论：该 appid 在此 IP 被风控/未加白 —— 需联系次幂商务加白 GitHub IP，或改用本机/self-hosted 采集')
  process.exit(3)
}
