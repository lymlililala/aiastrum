// 2) 聚类：DeepSeek 对源文池语义聚类，产出适合写**常青玄学/命理科普**的主题簇（每簇 3-6 篇）。
// 数据源：sources 持久层（默认 data/sources.json，读最近 N 天）。
// 用法：node scripts/wechat/2-cluster.mjs --days 14 --max-clusters 8

import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { DeepSeek } from './deepseek.mjs'
import { DATA_DIR } from './lib/env.mjs'
import { fetchSources } from './lib/sources.mjs'
import { VALID_CATEGORIES, normalizeCategory } from './lib/categories.mjs'

function arg(name, def) {
  const i = process.argv.indexOf(name)
  return i === -1 ? def : process.argv[i + 1]
}
const MAX_CLUSTERS = Number(arg('--max-clusters', 8))
const MAX_PER_CAT = Number(arg('--max-per-category', 2))
const DAYS = Number(arg('--days', 14))

mkdirSync(DATA_DIR, { recursive: true })
const OUT = join(DATA_DIR, 'clusters.json')

const sources = await fetchSources({ sinceDays: DAYS, minBodyLen: 200 })
console.log(`读取源文最近 ${DAYS} 天：${sources.length} 篇`)
if (!sources.length) { console.error('没有可用源文，请先跑 1-crawl.mjs'); process.exit(1) }

// 给模型的精简清单（不含全文，省 token）
const list = sources.map((s, i) => ({ id: i, account: s.account, title: s.title, digest: (s.digest || '').slice(0, 80) }))

const ds = new DeepSeek()

const sys = `你是一个玄学/命理科普站（塔罗、星座占星、八字、紫微斗数、周公解梦、梅花易数、奇门遁甲、姓名学、风水、生命灵数等）的资深选题编辑。
下面是一批从中文命理类公众号抓取的文章（仅标题 + 摘要）。
任务：把它们按主题聚成可以各写成一篇**常青科普文**的选题簇。

要求：
1. 每簇挑 3-6 篇语义相关、能互补的源文（给出它们的 id）。
2. 排除：时效性资讯（某月运势/某日吉时）、广告、招生引流、加微信算命私单、纯卖课——这些没有常青价值，不要硬凑簇。
3. 优先常青角度：概念科普（如「塔罗大阿卡纳含义」「梅花易数怎么起卦」）、解读方法、符号/牌意/卦象/星象释义、入门指南、常见误区。
4. 每簇必须给一个 suggested_category，且**只能从这个集合里选**：${VALID_CATEGORIES.join(', ')}。
5. **品类要尽量均衡**：源文可能集中在某几类（如紫微/八字），但请优先覆盖更多不同 category，同一 category 最多 ${MAX_PER_CAT} 簇。
6. 最多 ${MAX_CLUSTERS} 簇。宁缺毋滥，质量优先。

只返回 JSON：
{"clusters":[{
  "topic":"简短中文主题名",
  "working_title":"建议的中文文章标题（吸引人、不标题党）",
  "working_title_en":"对应的英文标题",
  "angle":"这篇的独特角度/读者能得到什么（一句话）",
  "source_ids":[整数数组],
  "suggested_category":"必须是上面集合中的一个",
  "suggested_tags":["3-6个关键词，中英混合均可"]
}]}`

console.log(`对 ${list.length} 篇源文聚类（最多 ${MAX_CLUSTERS} 簇）…`)
const out = await ds.chatJSON(
  [{ role: 'system', content: sys }, { role: 'user', content: JSON.stringify(list) }],
  { maxTokens: 4000 }
)

const rawClusters = (out.clusters || []).filter(c => Array.isArray(c.source_ids) && c.source_ids.length >= 2)

// 硬性品类配额：同一 category 最多保留 MAX_PER_CAT 簇（防止全是紫微/八字）
const perCat = new Map()
const clusters = []
let droppedByCap = 0
for (const c of rawClusters) {
  const cat = normalizeCategory(c.suggested_category)
  const n = perCat.get(cat) || 0
  if (n >= MAX_PER_CAT) { droppedByCap++; continue }
  perCat.set(cat, n + 1)
  c.suggested_category = cat
  clusters.push(c)
}
for (const c of clusters) {
  c.sources = c.source_ids.map(id => sources[id]).filter(Boolean).map(s => ({ sn: s.sn, account: s.account, title: s.title }))
}

writeFileSync(OUT, JSON.stringify(clusters, null, 2))
console.log(`\n产出 ${clusters.length} 个主题簇（品类配额丢弃 ${droppedByCap}）→ ${OUT}`)
for (const c of clusters) console.log(`  · [${c.suggested_category}] ${c.working_title}  (${c.source_ids.length} 源文)`)
console.log('用量:', ds.costEstimate())
console.log('⚠️  审一遍 clusters.json 主题归并是否合理，再跑 3-synthesize.mjs')
