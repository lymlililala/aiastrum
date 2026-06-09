// ─── GSC 净新缺口补充批次（gsc1）────────────────────────────────────────────
// 依据 GSC Performance 2026-06-09 的热门曝光 query，只补「站内无重复、有真实曝光」的缺口：
//   1. 繁中  2026 下半年星座運勢（全12星座）   2. 意语 梦见自然灾害   3. 意语 梦见名人   4. 日语 2026 全体運
// 使用新版 secret key（legacy 已停用）；upsert(onConflict: slug) 防重复键 & 防换 slug。
import { createClient } from "@supabase/supabase-js";

// 运行前需设置环境变量：SUPABASE_SECRET_KEY=sb_secret_xxx node scripts/seed-batch-gsc1.mjs
const SECRET = process.env.SUPABASE_SECRET_KEY;
if (!SECRET) { console.error("缺少环境变量 SUPABASE_SECRET_KEY"); process.exit(1); }
const supabase = createClient("https://tixgzezefjjsyuzgdhcd.supabase.co", SECRET);

const TODAY = "2026-06-09";

const posts = [
  // ───────────────────────── 1. 繁中：2026 下半年星座運勢 ─────────────────────────
  {
    slug: "2026-second-half-zodiac-horoscope",
    category: "horoscope",
    title: "2026年下半年星座運勢：全12星座7至12月事業、愛情、財運完整解析",
    title_en: "2026 Second Half Horoscope: All 12 Zodiac Signs (July–December)",
    description: "2026年下半年（7至12月）十二星座運勢總覽。土星續行牡羊、木星轉入獅子、冥王星深耕水瓶——本文逐一解析每個星座下半年的事業節奏、感情走向與財運重點，並標出該留意的關鍵月份。",
    keywords: ["2026年下半年星座運勢", "2026下半年運勢", "下半年星座運勢", "2026年7月星座運勢", "十二星座下半年運勢"],
    published_at: TODAY,
    reading_time: 11,
    cta_href: "/horoscope",
    cta_label: "👉 查看你的星座 2026 下半年每月詳細運勢",
    cta_label_en: "See Your Sign's Monthly 2026 Forecast",
    content: `<article>
<h1>2026年下半年星座運勢：全12星座7至12月完整解析</h1>
<p>上半年走得跌跌撞撞的人，下半年大概最想知道一件事——什麼時候能喘口氣。2026年7月到12月，天上的幾顆大行星各自換了節奏：土星仍在牡羊座推著大家「先做再說」，木星從巨蟹座移往獅子座，把好運的焦點從「家」轉向「舞台」，而冥王星在水瓶座繼續它那場安靜卻徹底的權力重組。這半年不是平均分配的，有些星座從7月就起飛，有些得熬到10月之後才看見光。下面按星座一個個說清楚。</p>

<h2>下半年的三條主線</h2>
<ul>
<li><strong>木星入獅子（約8月起）</strong>：創作、戀愛、子女、自我表現的議題被放大，火象與風象星座感受最明顯。</li>
<li><strong>土星續行牡羊</strong>：開創類的事務需要扛責任、補功課，急不得。</li>
<li><strong>下半年水逆</strong>：年底前還有一次水星逆行，溝通、合約、3C 產品容易出狀況，簽約與下單前多看兩眼。</li>
</ul>

<h2>火象星座</h2>
<h3>牡羊座</h3>
<p>土星壓在你頭上一整年，下半年你大概已經習慣了那種「凡事得自己擔」的重量。好消息是8月之後木星進獅子，戀愛運和創作運明顯回暖，悶了半年的熱情有地方放了。事業上11月是個轉折點，先前鋪的路開始有回音。財運穩，但別在水逆期間衝動換車換手機。</p>
<h3>獅子座</h3>
<p>這是你的主場半年。木星回到你的星座，是十二年一次的能量加持——能見度、機會、貴人會一起來。下半年最適合啟動拖了很久的個人計畫、換工作、或乾脆把自己推到台前。唯一要提醒的是別把好運當理所當然，10月前後容易因為太衝而得罪人。</p>
<h3>射手座</h3>
<p>下半年你的關鍵字是「擴張」。學習、出國、出版、遠距合作的機會變多，木星在同屬火象的獅子座替你撐腰。感情上容易遇到談得來、價值觀相近的對象。財務則建議把擴張的步子放在9月之後，上半年若有負債，先還一輪再衝。</p>

<h2>土象星座</h2>
<h3>金牛座</h3>
<p>土星雖然不在你這，但天王星仍在替金牛鬆動舊結構，下半年你會持續感覺到「不能再用老方法過日子」。好在你天生耐磨，10月後事業的穩定感回來。感情講求踏實，能陪你慢慢走的人才留得住。財運靠累積，別碰來路不明的快錢。</p>
<h3>處女座</h3>
<p>下半年前段你可能還在收拾上半年留下的爛攤子，9月生日季一過，狀態整個換檔。木星雖然不直接照顧你，但工作效率與健康管理會帶來實際的成就感。感情上你容易想太多，年底水逆別翻舊帳。財運平穩偏上，適合做預算規劃。</p>
<h3>摩羯座</h3>
<p>冥王星離開你的星座之後，那種「全世界都壓在肩上」的時期算是過去了。下半年你會慢慢嘗到前幾年苦熬的果實，職位、收入、話語權都可能上一個台階。感情上你變得比較願意放鬆，11、12月有不錯的相處時光。</p>

<h2>風象星座</h2>
<h3>雙子座</h3>
<p>天王星進入你的星座，下半年你整個人像被重新開機——想法多、變化快、坐不住。這是改變人生方向的好時機，但別三分鐘熱度。木星在獅子座替你的表達與戀愛加溫，8月之後桃花與曝光一起來。年底水逆對你影響偏大，重要訊息存檔備份。</p>
<h3>天秤座</h3>
<p>土星在你的對宮（牡羊），下半年「關係」是你的主課題——無論是合夥、婚姻還是合約，都在逼你學會設界線、把話講清楚。木星在獅子座替你帶來人脈與社交紅利，10月後事業有貴人。財運看合作，單打獨鬥不如找對夥伴。</p>
<h3>水瓶座</h3>
<p>冥王星駐紮在你的星座，這是屬於水瓶的時代正式展開的階段。下半年你會感覺自己正在「換一個版本」——舊的身份、舊的圈子慢慢退場。過程不見得舒服，但回頭看會發現值得。感情上吸引你的人通常和過去類型完全不同。</p>

<h2>水象星座</h2>
<h3>巨蟹座</h3>
<p>上半年木星在你的星座，把好運堆得滿滿；下半年木星離開，重點從「擁有」轉成「守住並運用」。7月生日季能量仍強，適合趁勢做決定。8月之後步調放慢，把上半年得到的資源好好整理。感情穩定者進入深耕期，單身者下半年前段機會較多。</p>
<h3>天蝎座</h3>
<p>下半年你的蛻變仍在進行，但比前兩年溫和。事業上你擅長的「深度」會被看見，適合接需要專注與專業的案子。木星在獅子座照亮你的事業宮，10月前後有升遷或被委以重任的機會。感情濃烈，但別用控制代替信任。</p>
<h3>雙魚座</h3>
<p>海王星正逐步離開你的星座，那層霧慢慢散了，你開始看清楚一些以前不願面對的事。下半年務實感回歸，適合把夢想落地成計畫。財運需要謹慎，別因為心軟借錢或亂投資。感情上你會更清楚自己真正要的是什麼。</p>

<h2>下半年開運提醒</h2>
<p>不管哪個星座，這半年有兩個共通建議：第一，木星入獅子之後，敢於「被看見」的人收穫最大，別躲在幕後；第二，年底水逆期間，凡是簽字、付款、買電子產品都多確認一次。運勢是趨勢，不是劇本，真正決定走向的還是你怎麼接招。</p>

<h2>常見問題</h2>
<h3>2026年下半年哪個星座運勢最好？</h3>
<p>整體來看，獅子座因為木星回歸，下半年的機會與能見度最突出；射手座、天秤座也因木星在獅子座而受惠明顯。</p>
<h3>2026下半年水星逆行在什麼時候？</h3>
<p>2026年下半年仍有一次水逆落在年底前後，期間建議避免衝動簽約、購買3C產品，重要資料記得備份。確切日期可參考站內「水星逆行2026完整時間表」。</p>
<h3>下半年運勢看太陽星座還是上升星座？</h3>
<p>兩個都看。太陽星座反映核心走向，上升星座更貼近你實際遇到的事件與外在環境，合起來看會更準。</p>
</article>`,
  },

  // ───────────────────────── 2. 意语：Sognare catastrofi naturali ─────────────────────────
  {
    slug: "sognare-catastrofi-naturali-significato",
    category: "dream",
    title: "Sognare catastrofi naturali: significato di terremoti, tsunami, tornado e alluvioni",
    title_en: "Dreaming of Natural Disasters: Meaning of Earthquakes, Tsunamis and Storms",
    description: "Cosa significa sognare catastrofi naturali? Terremoto, tsunami, tornado, alluvione ed eruzione hanno interpretazioni diverse. Guida al significato psicologico e simbolico di questi sogni, scenario per scenario, con la prospettiva junghiana.",
    keywords: ["sognare catastrofi naturali", "sognare una catastrofe naturale", "significato sogni catastrofi", "sognare terremoto significato", "sognare tsunami"],
    published_at: TODAY,
    reading_time: 9,
    cta_href: "/dream",
    cta_label: "👉 Scopri il significato del tuo sogno con l'interprete AI",
    cta_label_en: "Decode Your Dream with the AI Interpreter",
    content: `<article>
<h1>Sognare catastrofi naturali: cosa significa davvero</h1>
<p>Ci si sveglia di soprassalto, il cuore che batte forte, con l'immagine di un'onda gigantesca o della terra che si apre. Sognare una catastrofe naturale è una delle esperienze oniriche più intense che esistano — ed è anche una delle più fraintese. Quasi mai questi sogni annunciano un disastro reale. Parlano, piuttosto, di qualcosa che dentro di noi è già in movimento: un'emozione che non riusciamo più a contenere, un cambiamento che incombe, una situazione che sentiamo sfuggirci di mano.</p>

<h2>Il significato generale</h2>
<p>Le catastrofi naturali nei sogni rappresentano forze più grandi di noi. A differenza di un litigio o di un esame — situazioni in cui sappiamo, almeno in teoria, come comportarci — il terremoto o l'alluvione tolgono ogni controllo. Ed è proprio questo il punto. Il sogno mette in scena la sensazione di <strong>non avere più le redini</strong>: di un rapporto, del lavoro, della propria vita emotiva.</p>
<p>C'è però un secondo livello, più costruttivo. In molte tradizioni il disastro è anche distruzione che precede la rinascita: ciò che crolla libera spazio. Non sempre il sogno è un allarme; a volte è il segnale che una vecchia struttura sta finendo per lasciare posto a qualcosa di nuovo.</p>

<h2>Significato per tipo di catastrofe</h2>
<h3>Sognare un terremoto</h3>
<p>Il terremoto colpisce le fondamenta. Se sogni la terra che trema, chiediti cosa, nella tua vita, hai sempre dato per scontato e oggi vacilla: una certezza familiare, la sicurezza economica, una convinzione su te stesso. È il sogno tipico dei periodi in cui "tutto si sta rimettendo in discussione".</p>
<h3>Sognare uno tsunami o un'onda enorme</h3>
<p>L'acqua, nei sogni, è quasi sempre emozione. Un'onda che ti travolge racconta sentimenti accumulati e mai espressi — dolore, rabbia, ansia — che ora minacciano di sommergerti. Vedere l'onda arrivare da lontano, senza riuscire a fuggire, indica spesso uno stress che senti crescere e che eviti di affrontare.</p>
<h3>Sognare un tornado</h3>
<p>Il tornado è il caos che arriva all'improvviso e gira vorticosamente. Compare spesso quando una persona o un conflitto stanno destabilizzando la tua quotidianità, o quando dentro di te convivono emozioni contrastanti che non trovano pace. È il sogno della "tempesta emotiva".</p>
<h3>Sognare un'alluvione</h3>
<p>L'alluvione è più lenta del terremoto ma altrettanto travolgente: l'acqua sale, poco a poco, finché non c'è più terra asciutta. Simboleggia responsabilità o emozioni che si accumulano fino a sopraffarti. Spesso riguarda situazioni che "lasciamo crescere" senza intervenire.</p>
<h3>Sognare un'eruzione vulcanica</h3>
<p>Il vulcano è la rabbia repressa per eccellenza. Qualcosa che ribolle sotto la superficie da tempo e che prima o poi esplode. Se sogni la lava, vale la pena domandarsi quale emozione stai tenendo a forza sotto pressione.</p>

<h2>Cosa cambia in base a come ti senti nel sogno</h2>
<p>Lo stesso scenario assume significati opposti a seconda del tuo stato d'animo onirico. Se nel sogno provi <strong>terrore e impotenza</strong>, il sogno riflette un'ansia attuale non elaborata. Se invece osservi la catastrofe con <strong>calma</strong>, o addirittura ti metti in salvo, è un segnale incoraggiante: una parte di te sa già come attraversare il cambiamento.</p>

<h2>Domande da farti al risveglio</h2>
<ul>
<li>Quale area della mia vita sento "fuori controllo" in questo periodo?</li>
<li>C'è un'emozione che sto trattenendo da troppo tempo?</li>
<li>Sta finendo qualcosa che, in fondo, era già da chiudere?</li>
</ul>

<h2>Domande frequenti</h2>
<h3>Sognare una catastrofe naturale è un presagio?</h3>
<p>No. Nella stragrande maggioranza dei casi questi sogni sono simbolici e riguardano il tuo mondo interiore, non eventi futuri reali.</p>
<h3>Perché sogno catastrofi quando sono stressato?</h3>
<p>Perché il cervello, durante il sonno, rielabora le emozioni della veglia. Lo stress intenso si traduce spesso in immagini di forze incontrollabili come terremoti o onde.</p>
<h3>Sognare di salvarsi da un disastro è positivo?</h3>
<p>Sì. Mettersi in salvo o aiutare gli altri indica che possiedi le risorse per affrontare il periodo difficile che stai attraversando.</p>
</article>`,
  },

  // ───────────────────────── 3. 意语：Sognare personaggi famosi ─────────────────────────
  {
    slug: "sognare-personaggi-famosi-significato",
    category: "dream",
    title: "Sognare personaggi famosi: cosa significa sognare celebrità e VIP",
    title_en: "Dreaming of Celebrities: What It Means to Dream of Famous People",
    description: "Cosa significa sognare personaggi famosi, celebrità o VIP? Parlare con una star, esserne amici o innamorarsi: ogni scenario ha un significato psicologico preciso. Guida all'interpretazione secondo la psicologia junghiana e simbolica.",
    keywords: ["sognare personaggi famosi", "sognare celebrità", "sognare un personaggio famoso", "significato sognare vip", "sognare una star"],
    published_at: TODAY,
    reading_time: 8,
    cta_href: "/dream",
    cta_label: "👉 Interpreta il tuo sogno con l'oracolo AI",
    cta_label_en: "Decode Your Dream with the AI Oracle",
    content: `<article>
<h1>Sognare personaggi famosi: il significato nascosto</h1>
<p>Ti svegli e pensi: "Ma perché ho sognato proprio lui? Non ci penso neanche durante il giorno." Sognare una celebrità è più comune di quanto si creda, e quasi mai ha a che fare con la persona reale. Il famoso che appare nel sogno è un simbolo: rappresenta una qualità, un desiderio o una parte di te che la tua mente ha "vestito" con un volto noto.</p>

<h2>Perché sogniamo proprio le celebrità</h2>
<p>I personaggi famosi sono immagini condivise: tutti sappiamo cosa rappresentano. Quando sogni un grande attore, un campione sportivo o una cantante, la mente non sta pensando a loro, ma alla qualità che incarnano — talento, sicurezza, potere, libertà, bellezza. È un linguaggio simbolico molto efficiente. Lo psicologo Carl Jung lo collegherebbe alla <em>proiezione</em>: vediamo all'esterno, su una figura idealizzata, ciò che non riconosciamo ancora dentro di noi.</p>

<h2>Il significato scenario per scenario</h2>
<h3>Parlare con una celebrità</h3>
<p>Se nel sogno chiacchieri tranquillamente con una star, spesso significa che desideri essere ascoltato e riconosciuto. Può indicare anche che stai integrando dentro di te la qualità che quella persona rappresenta.</p>
<h3>Essere amico o amica di un VIP</h3>
<p>L'amicizia con un personaggio famoso riflette il bisogno di sentirsi importanti, accettati in un cerchio "speciale". A volte segnala una crescita dell'autostima: una parte di te comincia a credere di meritare di più.</p>
<h3>Una relazione romantica con una celebrità</h3>
<p>È uno dei sogni più frequenti. Raramente parla di amore reale: di solito indica attrazione verso le <strong>qualità</strong> di quella persona (carisma, successo, sensibilità) che vorresti coltivare anche in te. Può emergere nei periodi in cui la vita sentimentale è insoddisfacente o monotona.</p>
<h3>Essere tu la persona famosa</h3>
<p>Sognarsi celebri tocca il desiderio di riconoscimento e la paura, o il bisogno, di essere visti. Può rivelare ambizione sana, ma anche il timore del giudizio degli altri.</p>
<h3>Una celebrità che muore o sta male</h3>
<p>Spesso simboleggia la fine di un'aspirazione o il ridimensionamento di un ideale: una fase in cui smetti di idealizzare qualcosa e torni con i piedi per terra.</p>

<h2>La domanda che conta davvero</h2>
<p>Quando interpreti questo tipo di sogno, non chiederti "cosa significa quella persona", ma <strong>"quale qualità rappresenta per me"</strong>. La stessa celebrità può simboleggiare cose diverse per persone diverse: per qualcuno è il successo, per un altro la ribellione, per un altro ancora la tenerezza. La risposta giusta è sempre personale.</p>

<h2>Domande frequenti</h2>
<h3>Sognare una celebrità significa che penso troppo a lei?</h3>
<p>Non necessariamente. Spesso il personaggio è solo un simbolo scelto dalla mente per rappresentare una qualità, anche se non ci pensi durante il giorno.</p>
<h3>Sognare di baciare una star cosa vuol dire?</h3>
<p>Di solito indica il desiderio di avvicinarti a una caratteristica che ammiri in quella persona — non un reale interesse sentimentale.</p>
<h3>È normale sognare spesso personaggi famosi?</h3>
<p>Sì, soprattutto se consumi molti contenuti mediatici. Il cervello usa volti familiari per costruire le scene oniriche.</p>
</article>`,
  },

  // ───────────────────────── 4. 日语：2026年の全体運 ─────────────────────────
  {
    slug: "2026-overall-fortune-12-signs-jp",
    category: "horoscope",
    title: "2026年の運勢・全体運：12星座の総合運を徹底解説（仕事・恋愛・金運）",
    title_en: "2026 Overall Fortune: All 12 Zodiac Signs (Japan)",
    description: "2026年の全体運を12星座別に解説。土星牡羊座、木星の獅子座入り、冥王星水瓶座という大きな星の動きをふまえ、各星座の仕事運・恋愛運・金運の流れと、運を上げるポイントをまとめました。",
    keywords: ["2026年 運勢 全体運", "2026年 全体運", "2026年 星座 運勢", "12星座 2026 運勢", "2026 占い"],
    published_at: TODAY,
    reading_time: 10,
    cta_href: "/horoscope",
    cta_label: "👉 あなたの星座の2026年詳細運勢をチェック",
    cta_label_en: "Check Your Sign's Full 2026 Forecast",
    content: `<article>
<h1>2026年の運勢・全体運：12星座まるごと解説</h1>
<p>2026年は「土台を作り直す年」です。土星が牡羊座に腰を据えて新しい挑戦に責任を求め、木星は夏ごろに獅子座へ移って自己表現や恋愛にスポットライトを当てます。さらに冥王星は水瓶座でゆっくりと社会の仕組みを書き換え続けます。派手さよりも、地に足のついた変化が問われる一年。ここでは12星座それぞれの全体運を、仕事・恋愛・金運の視点で見ていきます。</p>

<h2>2026年を動かす3つの星</h2>
<ul>
<li><strong>土星（牡羊座）</strong>：始めることに責任が伴う。近道は通用せず、コツコツ積む人が報われる。</li>
<li><strong>木星（獅子座へ）</strong>：夏以降、創造・恋愛・自己アピールの運が拡大。火・風の星座に追い風。</li>
<li><strong>冥王星（水瓶座）</strong>：価値観や立場の地殻変動。古い自分が静かに終わっていく。</li>
</ul>

<h2>火の星座</h2>
<h3>牡羊座</h3>
<p>土星が自分の星座にあり、責任と試練の年。ただ逃げずに取り組めば、後半は確かな手応えに変わります。夏以降は恋愛運が回復。金運は堅実第一で。</p>
<h3>獅子座</h3>
<p>木星が巡ってくる主役の年。チャンス・注目・人脈が一気に集まります。長年あたためてきた計画を動かすなら今。勢い余って強引にならないことだけ注意。</p>
<h3>射手座</h3>
<p>学び・旅・発信が広がる拡大の年。同じ火の獅子座の木星が後押しします。価値観の合う相手との出会いも。投資や拡大は秋以降が安全。</p>

<h2>地の星座</h2>
<h3>牡牛座</h3>
<p>天王星の影響で「古いやり方」が通じにくい年。変化は不安でも、得意の粘り強さで秋には安定が戻ります。恋愛は誠実さ、金運は積み立て型で。</p>
<h3>乙女座</h3>
<p>前半は片づけ、誕生日シーズンの秋から本調子へ。仕事の効率と健康管理が実りをもたらします。考えすぎを手放すのが恋愛のカギ。</p>
<h3>山羊座</h3>
<p>冥王星が抜け、長い重圧の時期がようやく一段落。これまでの努力が地位や収入として返ってくる年。年末は心がほどけ、良い時間が訪れます。</p>

<h2>風の星座</h2>
<h3>双子座</h3>
<p>天王星が入り、人生の方向を変えるのに絶好の年。アイデアは豊富ですが飽きっぽさに注意。夏以降は恋愛と注目度がアップ。年末の水星逆行ではデータの保存を忘れずに。</p>
<h3>天秤座</h3>
<p>土星が対岸（牡羊座）にあり、「関係」が一年のテーマ。境界線を引き、言葉で伝える練習の年です。木星のおかげで人脈の恩恵あり。秋に協力者が現れます。</p>
<h3>水瓶座</h3>
<p>冥王星が自分の星座に。あなたの時代が本格的に始動する局面で、古い肩書きや人間関係が静かに入れ替わります。惹かれる相手のタイプも変化。</p>

<h2>水の星座</h2>
<h3>蟹座</h3>
<p>前半まで木星の恩恵が残り、誕生日シーズンは追い風。夏以降は得たものを整理し、活かす段階へ。安定志向の恋愛が深まります。</p>
<h3>蠍座</h3>
<p>変容は続くものの今年は穏やか。得意の「深さ」が評価され、専門性で勝負できる年。秋に昇進や重要な役割を任される可能性。恋は信頼を大切に。</p>
<h3>魚座</h3>
<p>海王星が離れ、霧が晴れていく年。現実感が戻り、夢を計画に落とし込めます。人の良さから来る貸し借りには慎重に。自分の本心が見えてきます。</p>

<h2>2026年・運気アップのヒント</h2>
<p>共通して言えるのは2つ。木星が獅子座に入ったら「見られること」を恐れない人がいちばん得をします。そして年末の水星逆行中は、契約・支払い・電子機器の購入を一度見直すこと。運勢は流れであって台本ではありません。最後に道を決めるのは、あなたの選択です。</p>

<h2>よくある質問</h2>
<h3>2026年に全体運が良い星座は？</h3>
<p>木星が巡る獅子座が筆頭です。同じ火の射手座、木星の恩恵を受ける天秤座も好調です。</p>
<h3>全体運は太陽星座と上昇星座どちらで見る？</h3>
<p>両方です。太陽星座は基本的な流れ、上昇星座は実際に起きる出来事や環境を表します。合わせて読むとより正確です。</p>
<h3>2026年の水星逆行はいつ？</h3>
<p>2026年は年末前後にも水星逆行があります。期間中は契約や電子機器の購入は慎重に。詳しい日程はサイト内の「水星逆行2026」をご覧ください。</p>
</article>`,
  },
];

async function run() {
  for (const p of posts) {
    const { error } = await supabase
      .from("mysticai_blog_posts")
      .upsert(p, { onConflict: "slug" });
    console.log(error ? `❌ ${p.slug}: ${error.message}` : `✅ ${p.slug}`);
  }
}
run();
