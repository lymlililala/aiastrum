/**
 * 一次性种子脚本：在 Supabase 创建 mysticai_blog_posts 表并插入初始数据
 * 运行方式：node scripts/seed-blog.mjs
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tixgzezejjsyuzgdhcd.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// ── 建表 SQL（通过 Supabase SQL editor 也可手动执行）───────────────────────────
// 注意：Supabase JS 客户端无法直接执行 DDL，需用 REST /sql 接口或控制台
// 下面先尝试通过 rpc exec_sql（需在控制台创建该函数），不行则提示手动建表
const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS mysticai_blog_posts (
  id           BIGSERIAL PRIMARY KEY,
  slug         TEXT        NOT NULL UNIQUE,
  category     TEXT        NOT NULL CHECK (category IN ('tarot','dream','horoscope')),
  title        TEXT        NOT NULL,
  title_en     TEXT        NOT NULL DEFAULT '',
  description  TEXT        NOT NULL DEFAULT '',
  keywords     TEXT[]      NOT NULL DEFAULT '{}',
  published_at DATE        NOT NULL,
  reading_time INT         NOT NULL DEFAULT 5,
  content      TEXT        NOT NULL DEFAULT '',
  cta_href     TEXT        NOT NULL DEFAULT '/',
  cta_label    TEXT        NOT NULL DEFAULT '',
  cta_label_en TEXT        NOT NULL DEFAULT '',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 更新时自动刷新 updated_at
CREATE OR REPLACE FUNCTION mysticai_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS mysticai_blog_posts_updated_at ON mysticai_blog_posts;
CREATE TRIGGER mysticai_blog_posts_updated_at
  BEFORE UPDATE ON mysticai_blog_posts
  FOR EACH ROW EXECUTE FUNCTION mysticai_set_updated_at();

-- 开放匿名读取权限（anon 可以 SELECT）
ALTER TABLE mysticai_blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "mysticai_blog_public_read" ON mysticai_blog_posts;
CREATE POLICY "mysticai_blog_public_read"
  ON mysticai_blog_posts FOR SELECT
  USING (true);
`;

// ── 文章数据 ──────────────────────────────────────────────────────────────────
const posts = [
  {
    slug: "tarot-the-fool-meaning",
    category: "tarot",
    title: "塔罗牌愚者（The Fool）完整解析：正逆位 × 爱情 × 事业",
    title_en: "The Fool Tarot Card: Complete Guide to Upright & Reversed",
    description: "愚者是塔罗大阿尔卡纳第0张，代表全新的开始、纯真与无限可能。本文详解愚者正位与逆位在爱情、事业、财运中的寓意，帮你读懂这张最充满希望的牌。",
    keywords: ["塔罗牌愚者", "愚者正位", "愚者逆位", "愚者爱情", "The Fool tarot", "塔罗牌意"],
    published_at: "2026-05-10",
    reading_time: 6,
    cta_href: "/tarot",
    cta_label: "👉 立即抽取塔罗牌，AI 为你解读",
    cta_label_en: "Draw Tarot Cards — AI Reading",
    content: `
<h2>愚者是谁？</h2>
<p>愚者（The Fool）是塔罗大阿尔卡纳的第 0 号牌，也是整副牌中编号最特殊的存在——他既是起点，也是终点，象征着灵魂在无数次轮回中永恒的纯真与勇气。</p>
<p>牌面上，一位年轻的旅者身着华服，肩扛行囊，手持白玫瑰，站在悬崖边缘，眼神望向天空，毫无畏惧。他的脚步即将踏空，但面容却充满欢喜——他不是无知的鲁莽，而是信任宇宙的纯粹信念。</p>
<h2>愚者正位含义</h2>
<h3>核心寓意</h3>
<p>正位愚者代表：<strong>全新开始、冒险精神、天真烂漫、无限可能</strong>。这是一个充满希望与自由的信号。</p>
<ul>
  <li><strong>爱情</strong>：单身者即将迎来一段纯粹、令人心跳加速的新恋情；恋人间可能开启全新的相处模式，回归最初相爱的心动感觉。</li>
  <li><strong>事业</strong>：极佳的创业或转行时机。你内心已准备好跳出舒适区，宇宙也在为你铺路。</li>
  <li><strong>财运</strong>：可能有意外的财务机会出现。但愚者的天真也警示：投资前需仔细评估。</li>
</ul>
<h2>愚者逆位含义</h2>
<h3>核心寓意</h3>
<p>逆位愚者代表：<strong>鲁莽冲动、缺乏计划、逃避现实、错失良机</strong>。需要暂缓行动，重新思考。</p>
<ul>
  <li><strong>爱情</strong>：感情中可能存在不成熟的一面——对方或你自己在逃避承诺，或者因为冲动而做出日后后悔的决定。</li>
  <li><strong>事业</strong>：当前的冒险计划过于草率，缺乏充分准备。建议稳扎稳打。</li>
</ul>
<h2>愚者给你的人生启示</h2>
<blockquote><p>"每一次出发，都是你对生命最深情的告白。"</p></blockquote>
<p>当愚者出现，宇宙在提醒你：放下对"完美时机"的执念，勇敢迈出第一步。</p>`,
  },
  {
    slug: "tarot-the-high-priestess-meaning",
    category: "tarot",
    title: "女祭司（The High Priestess）塔罗牌解析：直觉、神秘与内在智慧",
    title_en: "The High Priestess Tarot: Intuition, Mystery & Inner Wisdom",
    description: "女祭司是塔罗大阿尔卡纳第2张，象征直觉、潜意识与神秘知识。详解女祭司正逆位在爱情（暗恋/秘密恋情）、事业、灵性层面的深层含义。",
    keywords: ["塔罗女祭司", "女祭司正位", "女祭司逆位", "女祭司爱情", "The High Priestess tarot"],
    published_at: "2026-05-12",
    reading_time: 5,
    cta_href: "/tarot",
    cta_label: "👉 AI 塔罗占卜，读懂内心深处的答案",
    cta_label_en: "AI Tarot — Unlock Your Inner Truth",
    content: `<h2>女祭司：沉默中隐藏的力量</h2><p>女祭司（The High Priestess）是大阿尔卡纳第2号牌，坐镇于所罗门神庙的两根圆柱之间，手捧象征律法与神秘的卷轴，月冠加身，脚踏新月。她是一切神秘学问的守门人，不轻易开口，却洞悉一切。</p><h2>女祭司正位</h2><ul><li><strong>爱情</strong>：感情中存在未挑明的心意——可能是暗恋、或是一段秘而不宣的情感。正位女祭司建议你倾听内心，而不是急于表白或追问答案。</li><li><strong>事业</strong>：此刻不宜高调行动，更适合观察、积累信息。信任你的直觉，比任何分析都重要。</li><li><strong>灵性</strong>：强烈暗示你正处于灵性成长的关键阶段，适合冥想、学习塔罗/占星等内在探索。</li></ul><h2>女祭司逆位</h2><ul><li><strong>爱情</strong>：隐瞒、欺骗或信息不对等。关系中有一方没有说实话。</li><li><strong>事业</strong>：你可能正在压抑自己的真实判断，迎合他人意见。</li></ul><h2>女祭司给你的提醒</h2><p><strong>你内心的直觉，比任何占卜师都更了解你的未来。</strong></p>`,
  },
  {
    slug: "tarot-the-tower-meaning",
    category: "tarot",
    title: "塔（The Tower）塔罗牌解析：突变、崩塌与重生的真相",
    title_en: "The Tower Tarot Card: Sudden Change, Collapse & Rebirth",
    description: "塔牌是塔罗中最令人恐惧的牌之一，却也是最具解放力量的存在。深度解析塔正逆位在感情、事业中的真实含义：不是末日，而是重建的开始。",
    keywords: ["塔罗牌塔", "塔正位", "塔逆位", "The Tower tarot", "塔罗牌最可怕的牌", "塔罗突变"],
    published_at: "2026-05-14",
    reading_time: 7,
    cta_href: "/tarot",
    cta_label: "👉 抽取塔罗牌，看看宇宙给你的真实信号",
    cta_label_en: "Draw Cards — What Does the Universe Say?",
    content: `<h2>为什么人们最怕抽到"塔"？</h2><p>塔（The Tower）是大阿尔卡纳第16号牌。牌面上，一座高塔被闪电劈中，燃起大火，两个人从塔中跌落——但真相是：<strong>塔牌代表的"崩塌"，往往是你人生中最需要的一次清除。</strong></p><h2>塔正位含义</h2><p>核心关键词：<strong>突变、震荡、揭露真相、旧结构崩塌、强制刷新</strong></p><ul><li><strong>爱情</strong>：关系中隐藏的矛盾将被迫揭开——可能是一次激烈的争吵、意外的分手，或是发现了不愿面对的真相。</li><li><strong>事业</strong>：公司、项目或合作关系可能发生剧变。虽然混乱，但往往是改变命运轨迹的转折点。</li></ul><h2>塔逆位含义</h2><p>逆位的塔并不代表危机消失——它在内部慢慢侵蚀，而非瞬间爆发。<strong>主动放手，好过被迫崩塌。</strong></p><blockquote><p>"那些从你生命中轰然倒塌的东西，不是你的损失——而是宇宙为你清除的障碍。"</p></blockquote>`,
  },
  {
    slug: "tarot-the-star-meaning",
    category: "tarot",
    title: "星星（The Star）塔罗牌：希望、疗愈与宇宙的允诺",
    title_en: "The Star Tarot Card: Hope, Healing & Cosmic Promise",
    description: "星星牌是塔罗大阿尔卡纳第17张，紧跟在塔牌之后，象征黑暗后的希望曙光。详解星星正逆位含义，尤其在失恋、复合、低谷期的深刻指引意义。",
    keywords: ["塔罗星星", "星星正位", "星星逆位", "塔罗希望", "The Star tarot", "失恋塔罗"],
    published_at: "2026-05-16",
    reading_time: 5,
    cta_href: "/tarot",
    cta_label: "👉 现在占卜，星星是否在为你闪烁？",
    cta_label_en: "Read Your Stars — AI Tarot Now",
    content: `<h2>黑暗之后的星光</h2><p>星星（The Star）是大阿尔卡纳第17号牌，紧随在"塔"牌之后出现。当一切轰然倒塌，是星星在夜空中为你点亮方向。</p><h2>星星正位</h2><ul><li><strong>爱情</strong>：低谷后的疗愈与希望。若你刚经历分手或感情挫折，星星告诉你：伤口正在愈合，更美好的人和事正在路上。</li><li><strong>事业</strong>：经历了一段困难期后，局面开始好转。你的付出将被看见，才华终将被认可。</li><li><strong>身心</strong>：极佳的疗愈信号。适合此时开始冥想、养生、或寻求心理疏导。</li></ul><h2>星星逆位</h2><p>逆位星星：<strong>失去希望、自我怀疑、愿景破灭</strong>。这时候，星星逆位不是宣判，而是在提醒你：你已经太久没有好好照顾自己的内心了。</p><blockquote><p>"你不需要假装没事，但请相信：黎明永远在黑暗的尽头等你。"</p></blockquote>`,
  },
  {
    slug: "dream-about-snake",
    category: "dream",
    title: "梦见蛇是什么预兆？周公解梦 × 心理学深度解析",
    title_en: "Dreaming of Snakes: Chinese Dream Interpretation & Psychology",
    description: "梦见蛇是最常见的梦境之一，但含义大相径庭。本文结合周公解梦传统与荣格心理学，全面解析梦见大蛇、被蛇咬、蛇缠身、蛇追人等20种常见情形的预兆与心理含义。",
    keywords: ["梦见蛇", "梦到蛇是什么意思", "梦见大蛇", "梦见被蛇咬", "蛇缠身什么预兆", "周公解梦蛇"],
    published_at: "2026-05-11",
    reading_time: 8,
    cta_href: "/dream",
    cta_label: "👉 AI 解析你的梦境，探索潜意识密码",
    cta_label_en: "AI Dream Decoder — Unlock Your Subconscious",
    content: `<h2>蛇梦：一个古老而复杂的符号</h2><p>在人类所有的梦境符号中，蛇或许是出现频率最高、含义最复杂的一个。</p><h2>周公解梦：蛇的传统解读</h2><h3>梦见大蛇/巨蟒</h3><p>大蛇往往与重大机遇或权贵人物相关。若大蛇温顺或向你靠近，暗示贵人将至，事业或财运有提升。</p><h3>梦见被蛇咬</h3><p>若咬后感到剧痛，传统认为是健康方面的警示信号。若咬而无痛，则可能象征一种"痛苦的觉醒"。</p><h3>梦见蛇缠身</h3><p>蛇缠身常被解读为感情上的纠缠——可能是一段剪不断理还乱的关系。</p><h3>梦见蛇蜕皮</h3><p>这是所有蛇梦中最正面的类型之一。蜕皮象征着蜕变、更新与重生。</p><h2>荣格心理学视角</h2><p>荣格认为，蛇是人类集体无意识中最原始的原型符号之一，代表<strong>本能力量、生命能量与阴影面</strong>。</p><h2>梦见蛇的颜色解析</h2><ul><li><strong>白蛇</strong>：纯洁、灵性显现，可能预示精神层面的提升。</li><li><strong>黑蛇</strong>：潜伏的威胁或内心深处的恐惧。</li><li><strong>金蛇</strong>：财富、权力与机遇的象征，往往是吉兆。</li></ul>`,
  },
  {
    slug: "dream-about-water",
    category: "dream",
    title: "梦见水是什么意思？洪水、大海、河流、下雨全解析",
    title_en: "Dreaming of Water: Flood, Ocean, River & Rain Meanings",
    description: "水是梦境中最常见的元素之一，象征情感、潜意识与生命力。详解梦见洪水、大海、下雨、清水、浑水、溺水等各种水梦的周公解梦释义与心理学含义。",
    keywords: ["梦见水", "梦见洪水", "梦见大海", "梦见下雨", "梦见溺水", "周公解梦水"],
    published_at: "2026-05-13",
    reading_time: 7,
    cta_href: "/dream",
    cta_label: "👉 用 AI 解析你昨晚的梦，探索潜意识",
    cta_label_en: "Decode Your Dream with AI Now",
    content: `<h2>水：梦境中情感的镜子</h2><p>在所有梦境元素中，水拥有最广泛的象征意义。荣格认为，水是潜意识最直接的象征——水的状态往往映射着你当前的情绪状态。</p><h2>梦见清澈的水</h2><p>清澈的水通常是吉兆。代表思路清晰、内心平静、事业或感情运势顺畅。</p><h2>梦见浑浊的水</h2><p>浑浊、污浊的水与当前的困惑、混乱状态相关联。可能暗示人际关系中存在是非，或某件事的真相尚不明朗。</p><h2>梦见洪水</h2><p>洪水是情绪即将"决堤"的强烈信号。你可能正处于巨大的压力之下，而那些被长期压抑的情感正在积累能量。</p><h2>梦见溺水</h2><p>溺水梦通常与被情绪淹没、感到失控或窒息有关，是潜意识在发出求救信号——你需要减压，需要寻求帮助。</p>`,
  },
  {
    slug: "dream-about-teeth-falling",
    category: "dream",
    title: "梦见牙齿掉了是什么预兆？最全解析",
    title_en: "Dreaming of Teeth Falling Out: The Definitive Guide",
    description: "梦见掉牙是全球最普遍的梦境之一，几乎每个人都做过。为什么会梦见牙齿脱落？代表死亡征兆吗？本文从周公解梦、西方心理学、现代研究三个角度给出完整答案。",
    keywords: ["梦见掉牙", "梦见牙齿掉了", "掉牙梦是什么意思", "梦见牙齿脱落", "周公解梦掉牙"],
    published_at: "2026-05-15",
    reading_time: 6,
    cta_href: "/dream",
    cta_label: "👉 AI 解读你的掉牙梦，看看潜意识在说什么",
    cta_label_en: "Decode Your Dream — AI Interpretation",
    content: `<h2>你不是一个人在做掉牙梦</h2><p>研究表明，梦见牙齿掉落是全人类最普遍的共同梦境之一，横跨不同文化、年龄和地域。</p><h2>传统周公解梦释义</h2><p>在中国传统梦境文化中，牙齿与家人（尤其是长辈）的健康状况有关联。但<strong>切勿过度焦虑，将梦境与现实直接挂钩。</strong></p><h2>西方心理学解读</h2><ul><li><strong>焦虑与压力</strong>：这是最主流的解释。掉牙梦的频率与现实生活压力水平显著相关。</li><li><strong>自我形象焦虑</strong>：担心在他人面前的形象受损，害怕出丑或被批评。</li><li><strong>沟通问题</strong>：梦中掉牙，可能暗示你有些话想说却没有说出来。</li></ul><h2>不同情境的掉牙梦</h2><ul><li><strong>掉牙后重新长出来</strong>：极佳的信号——经历失去后，新的机会与成长即将到来。</li><li><strong>掉牙不疼、平静接受</strong>：你正在以成熟的心态接受生命中某种改变的到来。</li></ul>`,
  },
  {
    slug: "2026-aquarius-horoscope",
    category: "horoscope",
    title: "2026年水瓶座下半年运势：事业、爱情、财运全解析",
    title_en: "Aquarius 2026 Second Half Horoscope: Career, Love & Finance",
    description: "2026年下半年水瓶座整体运势预测。土星继续驻留水瓶座带来的考验与机遇，木星在双子座为你加持的幸运领域，以及每月重点运势概览。",
    keywords: ["2026水瓶座运势", "水瓶座下半年运势", "水瓶座2026", "水瓶座爱情运", "Aquarius 2026 horoscope"],
    published_at: "2026-05-20",
    reading_time: 8,
    cta_href: "/horoscope",
    cta_label: "👉 查看水瓶座本周详细运势，五维指数解析",
    cta_label_en: "Check Your Aquarius Weekly Horoscope Now",
    content: `<h2>2026年水瓶座大背景：转型中的破局者</h2><p>对水瓶座来说，2026年是一个"被迫成长"的年份。土星在双鱼座运行，要求你在边界感、情感责任与灵性探索上交出答卷。</p><h2>2026年下半年整体运势概览</h2><h3>7月：整顿期</h3><p>7月初水星逆行结束后，被搁置的计划重新启动。职场上可能有意想不到的机会出现。</p><h3>8月：能量爆发月</h3><p>这是水瓶座2026年最重要的月份之一。人脉扩张的绝佳时机。单身水瓶有较大概率在这个月邂逅心动的人。</p><h3>12月：年末冲刺</h3><p>事业上的努力开始看到成果，感情关系也趋于稳定温暖。</p><h2>水瓶座2026年幸运指南</h2><ul><li>💫 <strong>幸运色</strong>：电光蓝、银灰</li><li>🔢 <strong>幸运数字</strong>：4、11、22</li><li>💎 <strong>幸运石</strong>：紫水晶、石榴石</li></ul>`,
  },
  {
    slug: "mercury-retrograde-2026",
    category: "horoscope",
    title: "2026年水星逆行时间表：哪些星座最受影响？如何应对？",
    title_en: "Mercury Retrograde 2026: Dates, Affected Signs & Survival Guide",
    description: "2026年水星逆行共发生3次，分别影响不同星座。本文提供完整时间表，详解每次逆行对十二星座的具体影响，以及实用的应对策略和禁忌事项。",
    keywords: ["2026水星逆行", "水星逆行时间", "水星逆行影响", "水逆怎么办", "Mercury retrograde 2026"],
    published_at: "2026-05-18",
    reading_time: 7,
    cta_href: "/horoscope",
    cta_label: "👉 查看你的星座在水逆期间的详细运势",
    cta_label_en: "Check Your Sign During Mercury Retrograde",
    content: `<h2>什么是水星逆行？</h2><p>水星逆行（Mercury Retrograde）是指从地球视角看，水星呈现出"向后移动"的视觉现象。在占星学中，水星掌管沟通、交通、技术、合同与短途旅行。</p><h2>2026年水星逆行完整时间表</h2><table><tr><th>逆行期间</th><th>所在星座</th><th>影响重点</th></tr><tr><td>1月14日 — 2月4日</td><td>摩羯座 → 射手座</td><td>职业规划、长期目标重新审视</td></tr><tr><td>5月22日 — 6月14日</td><td>双子座</td><td>沟通、社交媒体、短途出行</td></tr><tr><td>9月19日 — 10月11日</td><td>天秤座</td><td>关系、合约、美学决策</td></tr></table><h2>水星逆行期间的生存法则</h2><h3>绝对避免做的事</h3><ul><li>❌ 签署重要合同（尤其是首次合作）</li><li>❌ 购买电子产品（容易出现故障）</li></ul><h3>水逆期间反而适合做的事</h3><ul><li>✅ 重新联系旧友或前任（若关系有修复可能）</li><li>✅ 完成搁置的项目</li><li>✅ 反思与内省，整理思路</li></ul>`,
  },
  {
    slug: "rising-sign-meaning",
    category: "horoscope",
    title: "上升星座是什么？为什么它比太阳星座更重要？",
    title_en: "What Is Your Rising Sign & Why It Matters More Than Your Sun Sign",
    description: "上升星座（Ascendant）决定了你给人的第一印象和外在形象，被称为'灵魂的面具'。本文详解上升星座的含义、计算方式，以及12个上升星座的典型特征。",
    keywords: ["上升星座", "上升星座是什么", "上升星座怎么算", "上升星座意义", "Ascendant astrology"],
    published_at: "2026-05-17",
    reading_time: 7,
    cta_href: "/astro",
    cta_label: "👉 输入出生信息，立即计算你的上升星座",
    cta_label_en: "Calculate Your Rising Sign & Full Birth Chart",
    content: `<h2>为什么你不只是你的太阳星座？</h2><p>个人星盘由三个最核心的元素构成：<strong>太阳星座（内在自我）、月亮星座（情感与潜意识）、上升星座（外在形象）</strong>。上升星座，有时被称为"灵魂的面具"，决定了你给陌生人留下的第一印象。</p><h2>如何计算你的上升星座？</h2><p>上升星座由你的<strong>出生时间（精确到小时）和出生地点</strong>共同决定。由于地球自转，黄道12星座大约每2小时在东方地平线上升起一个。</p><h2>12个上升星座的典型特征</h2><ul><li><strong>上升白羊</strong>：充满活力、直接坦率，给人朝气蓬勃的印象。</li><li><strong>上升金牛</strong>：沉稳可靠、气质优雅，给人踏实安全感。</li><li><strong>上升双子</strong>：机智风趣、善于表达，给人活泼聪明的印象。</li><li><strong>上升狮子</strong>：自信耀眼、天生王者气场，给人印象深刻、不可忽视。</li><li><strong>上升天蝎</strong>：神秘深邃、眼神摄人，给人难以捉摸但极具吸引力的印象。</li><li><strong>上升双鱼</strong>：温柔梦幻、富有艺术气息，给人飘逸神秘的灵性感。</li></ul><h2>上升星座 vs 太阳星座</h2><p><strong>太阳星座是你的核心本质，上升星座是你展示给世界的方式。</strong></p>`,
  },
];

async function main() {
  console.log("🚀 开始初始化 Supabase 数据库...");
  console.log(`📡 连接到: ${SUPABASE_URL}`);

  // 1. 先检查表是否存在
  const { data: existCheck, error: checkError } = await supabase
    .from("mysticai_blog_posts")
    .select("id")
    .limit(1);

  if (checkError && checkError.code === "42P01") {
    console.log("⚠️  表 mysticai_blog_posts 不存在，请先在 Supabase 控制台 SQL Editor 执行建表 SQL");
    console.log("\n─── 请复制以下 SQL 在控制台执行 ───────────────────────────────────");
    console.log(CREATE_TABLE_SQL);
    console.log("─────────────────────────────────────────────────────────────────\n");
    console.log("执行完毕后请重新运行本脚本");
    process.exit(1);
  } else if (checkError) {
    console.log("⚠️  检查表时出错:", checkError.message);
    console.log("尝试直接插入数据...");
  } else {
    console.log("✅ 表 mysticai_blog_posts 已存在");
  }

  // 2. 插入/更新文章数据（upsert by slug）
  console.log(`\n📝 开始插入 ${posts.length} 篇文章...`);
  const { data, error } = await supabase
    .from("mysticai_blog_posts")
    .upsert(posts, { onConflict: "slug" })
    .select("slug, title");

  if (error) {
    console.error("❌ 插入失败:", error.message);
    console.error("详情:", JSON.stringify(error, null, 2));
    process.exit(1);
  }

  console.log(`✅ 成功插入/更新 ${data?.length ?? 0} 篇文章:`);
  data?.forEach(p => console.log(`   • ${p.slug}`));
  console.log("\n🎉 数据库初始化完成！");
}

main().catch(err => {
  console.error("未捕获的错误:", err);
  process.exit(1);
});
