import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://tixgzezefjjsyuzgdhcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGd6ZXplZmpqc3l1emdkaGNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE0OTM3OCwiZXhwIjoyMDkzNzI1Mzc4fQ.CBarLrHnr-tr5ZPaGs2JvW3NJE6O5O1Hw7oTWsHuI-E"
);

const posts = [
  {
    slug: "mbti-love-compatibility-guide",
    title: "MBTI恋爱配对完全指南——16型人格的爱情匹配与禁忌",
    description: "16型MBTI人格在爱情中的完全配对指南：INFJ与谁最配？ENTP和谁最相克？最全的MBTI爱情兼容性分析。",
    keywords: ["MBTI恋爱配对", "16型人格爱情", "MBTI爱情匹配", "INFJ配对", "MBTI感情分析"],
    category: "mbti",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>MBTI恋爱配对完全指南</h1>
<p>MBTI的16种人格类型在爱情中展现出截然不同的需求和行为模式。了解人格类型的配对，不是为了给感情设限，而是帮助我们更好地理解自己和伴侣。</p>
<h2>分析框架</h2>
<p>MBTI配对通常从以下维度分析：</p>
<ul>
<li><strong>感知功能（S/N）：</strong>同为直觉（N）或感觉（S）的配对，在世界观和沟通方式上更易共鸣</li>
<li><strong>决策功能（T/F）：</strong>互补（T和F）配对往往能提供对方所缺乏的平衡视角</li>
<li><strong>能量方向（I/E）：</strong>E/E配对活跃外向；I/I配对安静深沉；I/E配对需要更多相互理解</li>
<li><strong>生活方式（J/P）：</strong>J/J配对有序稳定；P/P配对灵活多变；J/P配对需要妥协</li>
</ul>
<h2>各类型黄金配对与挑战配对</h2>

<h3>INFJ（提倡者）</h3>
<p><strong>天作之合：</strong>ENTP、ENFP——充满智识火花和对彼此内心世界的深度探索</p>
<p><strong>挑战配对：</strong>ESTP——思维模式和表达方式差异极大，需要大量的相互调适</p>
<p><strong>爱情风格：</strong>INFJ爱得深沉而专一，寻找的是灵魂层面的连接。他们给出的爱是全身心的，也需要被完全地看见和接纳。</p>

<h3>ENFP（竞选者）</h3>
<p><strong>天作之合：</strong>INFJ、INTJ——ENFP的热情与深思熟虑者的深度形成完美互补</p>
<p><strong>挑战配对：</strong>ISTJ——ENFP的随性自由与ISTJ的严谨结构容易产生摩擦</p>
<p><strong>爱情风格：</strong>热情、理想化、需要真正的情感连接。最怕感情变得例行公事，需要持续的新鲜感和意义感。</p>

<h3>INTJ（建筑师）</h3>
<p><strong>天作之合：</strong>ENFP、ENTP——外向直觉型为内向直觉型带来活力和广度</p>
<p><strong>挑战配对：</strong>ESFP——价值观和生活节奏的巨大差异</p>
<p><strong>爱情风格：</strong>理性务实，不轻易承诺，但一旦付出便深刻而稳固。需要智识上的尊重和充足的独处空间。</p>

<h3>ENTP（辩论家）</h3>
<p><strong>天作之合：</strong>INFJ、INTJ——深度思想者之间的智识碰撞</p>
<p><strong>挑战配对：</strong>ISFJ——细腻的守护者与爱挑战一切的辩论家容易产生价值观冲突</p>
<p><strong>爱情风格：</strong>需要能跟上他们思维速度的伴侣，享受辩论和思想挑战。对平淡的承诺式生活感到窒息。</p>

<h3>ISFJ（守卫者）</h3>
<p><strong>天作之合：</strong>ESFP、ESTP——外向感觉型为守卫者带来活力，守卫者为他们提供稳定的港湾</p>
<p><strong>挑战配对：</strong>ENTP、ENTJ——快节奏的辩论式交流令ISFJ疲惫</p>
<p><strong>爱情风格：</strong>用行动表达爱，关注细节和照顾。需要被感激和看见，而非被视为理所当然。</p>

<h3>ESFP（表演者）</h3>
<p><strong>天作之合：</strong>ISFJ、ISTJ——互补型配对，感觉型的共同语言</p>
<p><strong>挑战配对：</strong>INTJ——世界观和沟通方式差异极大</p>
<p><strong>爱情风格：</strong>热情、直接、活在当下。需要充满活力的伴侣和丰富的共同体验。</p>

<h2>通用配对参考表</h2>
<table>
<tr><th>类型</th><th>最佳配对</th><th>互补配对</th></tr>
<tr><td>INFP</td><td>ENFJ</td><td>INTJ, ENTJ</td></tr>
<tr><td>INTP</td><td>ENTJ, ESTJ</td><td>ENTP, INTJ</td></tr>
<tr><td>ENFJ</td><td>INFP, ISFP</td><td>INTJ, ENTJ</td></tr>
<tr><td>ISTJ</td><td>ESFP, ESTP</td><td>ENFP, ENTP</td></tr>
<tr><td>ESTJ</td><td>ISFP, ISTP</td><td>INTP, INFP</td></tr>
<tr><td>ISTP</td><td>ESTJ, ESFJ</td><td>ENTJ, ENFJ</td></tr>
</table>

<h2>MBTI配对的真相</h2>
<p>最重要的提醒：MBTI类型只是了解自己和伴侣的一个框架，不是命运。现实中"理论上不配"的类型走向幸福的不计其数，而"完美配对"也会因沟通不善而破裂。最好的关系建立在：真实的相互了解、持续的沟通、以及双方愿意为对方成长的意愿之上。</p>
</article>`
  },
  {
    slug: "wuxing-queshui-butu-guide",
    title: "五行缺什么怎么补？缺水缺木缺金缺火缺土补救完全指南",
    description: "五行缺水怎么补？缺金缺木缺火缺土各有不同的补救方法：从颜色、方位、饮食、职业到生活方式全方位调整指南。",
    keywords: ["五行缺水怎么补", "五行缺木补救", "五行缺金", "五行缺火", "五行缺土补救方法"],
    category: "bazi",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>五行缺什么怎么补——完全补救指南</h1>
<p>八字命理中，五行平衡是健康、顺遂人生的基础。当某种五行严重缺失时，对应领域可能出现障碍。以下是各五行缺失的表现和补救方法。</p>

<h2>如何判断五行缺失</h2>
<p>查看你的八字命盘（年月日时四柱），统计金木水火土五行的数量和力量。如果某一行在八字中完全没有出现，或仅出现一次且力量微弱，则可能构成"缺"。</p>

<h2>缺水——补水方法</h2>
<p><strong>缺水表现：</strong>智慧不足、处事缺乏灵活性、肾脏或泌尿系统易出问题、财运（尤其是聪明才智带来的财运）较弱。</p>
<h3>补水方法</h3>
<ul>
<li><strong>颜色：</strong>多穿黑色、深蓝色、深紫色</li>
<li><strong>方位：</strong>居室或办公桌朝向北方；北方位置放置流水摆件</li>
<li><strong>饰品：</strong>佩戴黑曜石、海蓝宝、月光石、黑色玛瑙</li>
<li><strong>数字：</strong>与1、6有关的数字（一楼、六层等）</li>
<li><strong>饮食：</strong>多食黑色食物（黑豆、黑芝麻、黑木耳、海鲜）</li>
<li><strong>职业方向：</strong>与水相关行业（海洋、饮品、游泳、会计、物流）</li>
<li><strong>生活习惯：</strong>保持充足饮水，多接触自然水体</li>
</ul>

<h2>缺木——补木方法</h2>
<p><strong>缺木表现：</strong>进取心不足、肝脏易出问题、缺乏仁慈心、难以成长突破。</p>
<h3>补木方法</h3>
<ul>
<li><strong>颜色：</strong>多穿绿色、青色</li>
<li><strong>方位：</strong>居所朝向东方；在东方位置种植绿色植物</li>
<li><strong>饰品：</strong>翡翠、绿玉髓、橄榄石、木质饰品</li>
<li><strong>数字：</strong>3、8</li>
<li><strong>饮食：</strong>多吃绿色蔬菜（菠菜、西兰花、绿豆）、酸味食物</li>
<li><strong>职业方向：</strong>与木相关（文化教育、医疗、农业、园艺、纺织）</li>
<li><strong>生活：</strong>多亲近自然和森林</li>
</ul>

<h2>缺金——补金方法</h2>
<p><strong>缺金表现：</strong>执行力弱、肺部易出问题、人际关系中缺乏公正感、财运波动。</p>
<h3>补金方法</h3>
<ul>
<li><strong>颜色：</strong>多穿白色、金色、银色</li>
<li><strong>方位：</strong>在西方或西北方放置金属或白色物品</li>
<li><strong>饰品：</strong>黄金、白银、钻石、白水晶、金发晶</li>
<li><strong>数字：</strong>4、9</li>
<li><strong>饮食：</strong>白色食物（白萝卜、百合、银耳、梨）</li>
<li><strong>职业方向：</strong>金融、法律、军警、金属行业</li>
<li><strong>生活：</strong>保持生活有规律，增强意志力训练</li>
</ul>

<h2>缺火——补火方法</h2>
<p><strong>缺火表现：</strong>缺乏热情和自信、心脏易出问题、在社交场合难以发光发热。</p>
<h3>补火方法</h3>
<ul>
<li><strong>颜色：</strong>多穿红色、橙色、紫色</li>
<li><strong>方位：</strong>在南方位置放置红色物品或明亮光源</li>
<li><strong>饰品：</strong>红珊瑚、石榴石、红玛瑙、太阳石</li>
<li><strong>数字：</strong>2、7</li>
<li><strong>饮食：</strong>辣味食物（辣椒、生姜）、红色食物（红豆、番茄）</li>
<li><strong>职业方向：</strong>娱乐、餐饮、能源、电子、美容</li>
<li><strong>生活：</strong>增加户外运动，提升阳气；多晒太阳</li>
</ul>

<h2>缺土——补土方法</h2>
<p><strong>缺土表现：</strong>缺乏稳定感和安全感、脾胃功能弱、难以建立稳固的人际和财务基础。</p>
<h3>补土方法</h3>
<ul>
<li><strong>颜色：</strong>多穿黄色、土黄色、咖啡色</li>
<li><strong>方位：</strong>在中央或东北方放置陶瓷、岩石等土性物品</li>
<li><strong>饰品：</strong>黄水晶、虎眼石、琥珀、黄金（土生金）</li>
<li><strong>数字：</strong>5、0</li>
<li><strong>饮食：</strong>甘甜食物（南瓜、山药、玉米、蜂蜜）</li>
<li><strong>职业方向：</strong>地产、农业、食品、建筑、中介</li>
<li><strong>生活：</strong>建立规律的生活节奏，增加稳定感</li>
</ul>

<h2>补五行的注意事项</h2>
<ol>
<li>补五行不是越多越好——过多反而成"旺"，需要专业命理师判断"缺"的程度</li>
<li>调整是渐进的，不能期待立竿见影的效果</li>
<li>心态调整比物质补充更重要——内在的转变才是真正的"补"</li>
<li>建议结合个人完整八字命盘进行精准判断</li>
</ol>
</article>`
  },
  {
    slug: "fengshui-wealth-love-tips",
    title: "风水催财催桃花实用指南——家居布局提升财运和感情运",
    description: "风水布局如何催财？如何用风水提升桃花运？从家居方位、颜色、植物到饰品，全面的催财催桃花风水实操指南。",
    keywords: ["风水催财", "风水催桃花", "家居风水布局", "风水提升财运", "风水感情运"],
    category: "daily-fortune",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>风水催财催桃花实用指南</h1>
<p>风水是通过调整居住环境的能量流动来影响生活运势的古老智慧。以下是经过实践检验的催财和催桃花方法，既传统又实用。</p>

<h2>第一部分：催财风水</h2>

<h3>财位的确定</h3>
<p>风水中最常用的财位有两种：</p>
<ul>
<li><strong>明财位：</strong>进门后斜对角45度处，是传统风水中最重要的财位</li>
<li><strong>暗财位：</strong>根据流派不同，常见于厨房、书房的特定角落</li>
</ul>

<h3>财位布置方法</h3>
<ol>
<li><strong>保持整洁：</strong>财位不可堆放杂物——杂乱的财位意味着财运混乱</li>
<li><strong>摆放催财植物：</strong>发财树、金钱草、招财竹（高度不超过50cm）</li>
<li><strong>放置流水摆件：</strong>向屋内流的水代表财水归家；水要保持清澈流动</li>
<li><strong>放置黄水晶或金色饰品：</strong>增强财位的金土能量</li>
<li><strong>避免：</strong>财位不可有厕所门或杂物间门</li>
</ol>

<h3>厨房催财</h3>
<p>厨房代表家庭的"财库"：</p>
<ul>
<li>保持炉灶整洁，代表财源不断</li>
<li>炉灶不可正对门或窗（财气散失）</li>
<li>冰箱常备充足食物，象征丰盛</li>
</ul>

<h3>招财颜色和摆件</h3>
<table>
<tr><th>颜色/物品</th><th>效果</th><th>摆放位置</th></tr>
<tr><td>黄色/金色</td><td>增强财运、土生金</td><td>客厅、财位</td></tr>
<tr><td>流水摆件</td><td>财水归堂</td><td>财位、玄关</td></tr>
<tr><td>貔貅</td><td>只进不出，聚财避邪</td><td>面向门口</td></tr>
<tr><td>金蟾（三脚蟾）</td><td>招财进宝</td><td>面朝屋内，非对门</td></tr>
<tr><td>黄水晶</td><td>吸引财富能量</td><td>财位或书桌</td></tr>
</table>

<h2>第二部分：催桃花风水</h2>

<h3>桃花位的确定</h3>
<p>桃花位因年份不同而变化。传统方法：</p>
<ul>
<li>根据出生年支确定个人桃花位：子午卯酉年生者桃花在酉（西方）；寅午戌年生者桃花在午（南方）；申子辰年生者桃花在子（北方）；亥卯未年生者桃花在卯（东方）</li>
</ul>

<h3>催桃花的布置</h3>
<ol>
<li><strong>在桃花位摆放粉色或红色鲜花：</strong>玫瑰、桃花、牡丹——活生生的花效果最好</li>
<li><strong>粉水晶：</strong>粉晶是最强的催桃花石，放于桃花位或卧室西南角</li>
<li><strong>双数摆件：</strong>代表双人成对，单数和空置不利感情</li>
<li><strong>床头挂画：</strong>选择温馨的双人或花卉图案，避免单人或荒凉场景</li>
</ol>

<h3>卧室感情风水</h3>
<ul>
<li>床的两侧要有对称的床头柜（象征两人平等）</li>
<li>避免床尾直对门（不利感情稳定）</li>
<li>保持卧室整洁温馨，多用暖色调</li>
<li>清除前任的物品——旧能量会阻碍新缘分</li>
<li>避免在卧室放置太多仙人掌或有刺植物（阻隔爱情能量）</li>
</ul>

<h3>注意事项</h3>
<ul>
<li>催桃花同时也可能招来烂桃花，需结合自身情况谨慎操作</li>
<li>已婚者慎用过于强烈的桃花布局，可能引起第三者介入</li>
<li>风水调整是辅助工具，真正的好感情来自真实的相遇和真心的付出</li>
</ul>

<h2>简单有效的日常风水习惯</h2>
<ol>
<li>每天早晨开窗换气，让新鲜能量进入</li>
<li>保持玄关（入户门区域）整洁明亮——这是家的"气口"</li>
<li>及时修缮家中损坏的水龙头和设施</li>
<li>定期清洁打扫，包括角落和储藏空间</li>
<li>与家人保持和谐关系——家庭和气才是最好的风水</li>
</ol>
</article>`
  },
  {
    slug: "astrology-houses-complete-guide",
    title: "占星十二宫完全指南——每个宫位的含义与解读",
    description: "占星盘的12个宫位各司其职：第一宫代表自我，第七宫代表伴侣，第十宫代表事业。完整的十二宫位解读指南。",
    keywords: ["占星十二宫", "星盘宫位解读", "第一宫含义", "占星宫位", "星盘宫位"],
    category: "astrology",
    published_at: new Date().toISOString(),
    content: `<article>
<h1>占星十二宫完全指南</h1>
<p>在出生星盘中，十二个宫位就像舞台上的十二个区域，行星在其中扮演角色。每个宫位代表人生的特定领域，行星在哪个宫位，就在那个领域发挥其影响。</p>
<h2>十二宫位速查</h2>
<table>
<tr><th>宫位</th><th>名称</th><th>代表领域</th><th>对应星座</th></tr>
<tr><td>第一宫</td><td>上升宫/外貌宫</td><td>自我形象、第一印象、身体</td><td>白羊座</td></tr>
<tr><td>第二宫</td><td>金钱宫</td><td>财富、价值观、物质拥有</td><td>金牛座</td></tr>
<tr><td>第三宫</td><td>沟通宫</td><td>思维、兄弟姐妹、短途旅行</td><td>双子座</td></tr>
<tr><td>第四宫</td><td>家庭宫</td><td>家庭、根基、内心世界</td><td>巨蟹座</td></tr>
<tr><td>第五宫</td><td>创意宫</td><td>创造力、爱情、子女、娱乐</td><td>狮子座</td></tr>
<tr><td>第六宫</td><td>工作宫</td><td>日常工作、健康、服务</td><td>处女座</td></tr>
<tr><td>第七宫</td><td>伴侣宫</td><td>婚姻、伴侣、合作</td><td>天秤座</td></tr>
<tr><td>第八宫</td><td>转化宫</td><td>深层转变、遗产、性、秘密</td><td>天蝎座</td></tr>
<tr><td>第九宫</td><td>哲学宫</td><td>高等教育、旅行、信仰</td><td>射手座</td></tr>
<tr><td>第十宫</td><td>事业宫</td><td>职业、社会地位、公众形象</td><td>摩羯座</td></tr>
<tr><td>第十一宫</td><td>友谊宫</td><td>朋友、社群、理想、人脉</td><td>水瓶座</td></tr>
<tr><td>第十二宫</td><td>隐居宫</td><td>无意识、秘密、业力、灵性</td><td>双鱼座</td></tr>
</table>

<h2>重点宫位深度解析</h2>

<h3>第一宫——上升星座</h3>
<p>第一宫的起点就是上升星座（Ascendant），是你出生时东方地平线上升起的星座。它代表你的外在表现、第一印象，以及你如何开始新事物。上升星座往往比太阳星座更能反映一个人的外在性格。</p>

<h3>第七宫——伴侣宫</h3>
<p>第七宫是婚姻和长期伴侣关系的宫位。第七宫宫头星座（Descendant）和其中的行星揭示你被什么类型的人吸引，以及你的理想伴侣模式。同时，第七宫也代表公开的对手和商业伙伴。</p>

<h3>第十宫——事业宫（中天）</h3>
<p>第十宫的顶点是中天（Midheaven/MC），代表你的职业方向、社会成就和公众形象。这是星盘中最能指示"你会成为什么"的位置之一。</p>

<h3>第八宫——深层转化</h3>
<p>第八宫是星盘中最神秘的宫位，涵盖：死亡与重生、他人的资源（遗产、共同财富）、性与深层亲密、秘密和隐藏的事物、以及心理转化。行星在第八宫的人往往经历过深刻的人生蜕变。</p>

<h3>第十二宫——隐居宫</h3>
<p>第十二宫代表隐藏、孤独和灵性。这是与神秘、冥想、无意识内容相关的宫位。行星在第十二宫有时被描述为"隐藏的能量"——潜力很大但不容易被外界看见。</p>

<h2>如何解读宫位中的行星</h2>
<p>将行星（"谁"）、星座（"如何"）和宫位（"在哪里"）组合来解读：</p>
<p><strong>例如：</strong>火星（行动）在天蝎座（深度、强度）在第七宫（伴侣关系）= 你在伴侣关系中展现出强烈的激情和深度，可能吸引或成为具有强烈意志的伴侣，感情关系中有强烈的竞争或权力动态。</p>
<h2>空宫不等于缺失</h2>
<p>星盘中某个宫位没有行星（空宫）并不代表这个生命领域没有活动。空宫由其守护星（该宫位宫头星座的统治星）的位置和状态来解读。例如，第七宫空宫，查找天秤座（第七宫自然对应星座）的守护星——金星的位置来理解伴侣关系的特质。</p>
</article>`
  }
];

let success = 0, fail = 0;
for (const post of posts) {
  const { error } = await supabase.from("mysticai_blog_posts").upsert(post, { onConflict: "slug" });
  if (error) { console.error("FAIL", post.slug, error.message); fail++; }
  else { console.log("OK", post.slug); success++; }
}
console.log(`\nDone: ${success} ok, ${fail} fail`);
