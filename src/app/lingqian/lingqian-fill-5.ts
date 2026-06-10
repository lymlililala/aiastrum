import type { SignContentOverride } from "./lingqian-content-i18n";

// ===== Huangdaxian signs 11–20 · English & Traditional Chinese overrides =====
// Keys: `huangdaxian:11` … `huangdaxian:20`. Shape matches SignContentOverride exactly
// (poem is a 4-tuple). Source: HUANGDAXIAN_SIGNS in lingqian-data.ts.

export const LING_EN_5: Record<string, SignContentOverride> = {
  "huangdaxian:11": {
    name: "Turning Misfortune into Blessing",
    poem: [
      "Amid peril a turning point appears",
      "Misfortune yields to blessing by divine aid",
      "Pressing on through danger meets no real harm",
      "Crisis becomes safety, fortune fills the hall",
    ],
    plain:
      "Middling-auspicious: misfortune turns to blessing. When you meet hardship and danger, do not panic—the divine has its arrangements. The turning point lies within, and the danger will become good fortune.",
    interpretation: {
      career: "A crisis arises at work; stay calm—within the crisis lies a turning point.",
      love: "The relationship hits a rough patch; do not despair—after the difficulty your bond grows firmer.",
      wealth: "Finances meet a small setback, but a benefactor helps you turn danger into safety.",
      health: "A minor health issue appears; seek care promptly and recovery goes smoothly.",
    },
    yi: ["Handle calmly", "Seek help"],
    ji: ["Panic", "React blindly"],
    zen: "Where the mountains end and rivers run out, the road seems lost—then willows and flowers reveal another village.",
  },
  "huangdaxian:12": {
    name: "Contentment Brings Lasting Joy",
    poem: [
      "The content are poor yet joyful",
      "The discontent are rich yet anxious",
      "A grateful heart is ever at ease",
      "In the ordinary lies true delight",
    ],
    plain:
      "Middling-even: contentment brings lasting joy. A reminder to learn to be satisfied and cherish all you have. Face life with a grateful heart, and happiness is already before you.",
    interpretation: {
      career: "Your current job is already good; no need for endless comparison—cherish what is at hand.",
      love: "The partner before you is worth cherishing; contentment is what makes love last.",
      wealth: "Your wealth is already enough; act within your means and stay content.",
      health: "A calm mind is best for the body; reduce desires and health follows naturally.",
    },
    yi: ["Gratitude", "Cherish the present"],
    ji: ["Insatiable greed", "Heavy envy"],
    zen: "The content are forever joyful; the greedy suffer much.",
  },
  "huangdaxian:13": {
    name: "Wealth Flowing in from All Sides",
    poem: [
      "Riches roll in like a gushing spring",
      "Gold pours in daily, fortune fills the gate",
      "Open wide the roads of wealth to noble guests",
      "Granaries full of silver, blessings run deep",
    ],
    plain:
      "Highly auspicious: wealth flows in from all sides. Every channel of income runs clear and sources multiply—an excellent time for financial planning and investment.",
    interpretation: {
      career: "Your career enters a breakout phase and income rises sharply—cause for celebration.",
      love: "A bountiful season for love; both material and emotional harvests are full and life is sweet.",
      wealth: "Many income channels open up; investing and managing money both bear fruit—superb wealth luck.",
      health: "Healthy and full of spirit, you are in fine shape to create wealth.",
    },
    yi: ["Invest", "Start a venture", "Manage finances"],
    ji: ["Miserly thinking", "Failing to use resources"],
    zen: "When wealth flows the heart flows; cast wide your good ties and riches come of themselves.",
  },
  "huangdaxian:14": {
    name: "Harmony Begets Wealth",
    poem: [
      "A harmonious home makes all things thrive",
      "Harmony begets wealth of its own accord",
      "Treat others with generosity—blessings are boundless",
      "A ready smile brings carefree joy",
    ],
    plain:
      "Middling-auspicious: harmony begets wealth. Keep your relationships harmonious and your household at peace, and all goes smoothly while fortune arrives. Greet others with a smile and good luck keeps coming.",
    interpretation: {
      career: "Workplace relations are harmonious and cooperation is pleasant—performance rises naturally.",
      love: "Love is harmonious and the family is happy—this is the greatest blessing of all.",
      wealth: "Harmony begets wealth; good relationships bring fortune your way.",
      health: "A cheerful mood and a ready smile are the best secret to good health.",
    },
    yi: ["Treat others kindly", "Keep family harmony"],
    ji: ["Quarrels", "Pettiness"],
    zen: "A harmonious home makes all things thrive; harmony itself begets wealth.",
  },
  "huangdaxian:15": {
    name: "A Splendid Future",
    poem: [
      "The road ahead is bright as brocade",
      "Ten-thousand-fathom rays light the path before you",
      "Step by step you rise without obstruction",
      "Flowers upon brocade—joy without end",
    ],
    plain:
      "Supremely auspicious: a splendid future! Your road ahead holds boundless possibility. Every step grows smoother and better—your prospects are as splendid as brocade, brilliant and limitless.",
    interpretation: {
      career: "Career prospects are excellent; you rise step by step to remarkable achievement.",
      love: "Love is beautiful, the future full of hope, and happiness lasting.",
      wealth: "Your wealth luck grows ever better, with a full harvest ahead.",
      health: "Your health keeps improving and you brim with vitality.",
    },
    yi: ["Strive actively", "Look to the future"],
    ji: ["Settle for the status quo", "Lack ambition"],
    zen: "Aim high and your future is splendid; stay grounded and you achieve greatness.",
  },
  "huangdaxian:16": {
    name: "All Things as You Wish",
    poem: [
      "Lucky stars shine high, blessings fill the hall",
      "All things go as you wish—joy without end",
      "Joy descends from heaven, fortune comes to you",
      "The god of luck is ever at your side",
    ],
    plain:
      "Supremely auspicious: all things as you wish! Huangdaxian bestows blessing and lucky stars shine high; every wish is fulfilled and happiness lies right before you.",
    interpretation: {
      career: "All goes smoothly at work; goals are reached with ease and fulfillment abounds.",
      love: "Love is sweet and all goes as you wish—happy and complete.",
      wealth: "Superb wealth luck; whatever you seek, you obtain—all as you wish.",
      health: "Body and mind both thrive; health is as you wish and all is well.",
    },
    yi: ["All that you seek", "Enjoy your happiness"],
    ji: ["Excessive worry"],
    zen: "Hold good intentions and all goes as you wish; be grateful for the present and happiness endures.",
  },
  "huangdaxian:17": {
    name: "Surviving Adversity",
    poem: [
      "Adversity tempers the will",
      "Hardship and obstacles forge the sinews",
      "The phoenix is reborn from the flames",
      "Breaking the cocoon, the butterfly soars free",
    ],
    plain:
      "Middling-even: surviving adversity. You are in a hard season now, and this is the whetstone that sharpens you. Pass through these trials and you will be remade, like a phoenix reborn.",
    interpretation: {
      career: "Work meets challenges; this is a tempering—pull through and you rise to a new level.",
      love: "Love has weathered storms; the bond grows firmer for it and is worth cherishing.",
      wealth: "Wealth luck is poor for now; in hard times, all the more must you build up strength.",
      health: "The body needs nurturing; keep healthy habits even in adversity.",
    },
    yi: ["Temper yourself", "Build up strength"],
    ji: ["Give up trying", "Abandon yourself"],
    zen: "The sword's edge comes from grinding; the plum blossom's fragrance from bitter cold.",
  },
  "huangdaxian:18": {
    name: "Forging Wide Good Ties",
    poem: [
      "Forge wide good ties and blessings come of themselves",
      "Be kind to others and the world grows wide",
      "Good bonds and good fruits all bring reward",
      "Deep virtue shines on, passed down through the ages",
    ],
    plain:
      "Highly auspicious: forge wide good ties. Do many good deeds and form many good bonds, and all your kindness will turn into blessings returned to you. Affinity is the finest gift.",
    interpretation: {
      career: "Widen your network and forge good ties; work opportunities multiply.",
      love: "Through your connections you meet someone you fancy—good ties bring love.",
      wealth: "Good ties bring wealth, and chances to cooperate increase.",
      health: "A kind heart full of positive energy keeps body and mind well.",
    },
    yi: ["Socialize", "Help others", "Cultivate virtue"],
    ji: ["Selfishness", "Pettiness"],
    zen: "Give a rose and your hand keeps its fragrance; forge wide good ties and blessings are boundless.",
  },
  "huangdaxian:19": {
    name: "Holding to Virtue, Awaiting the Time",
    poem: [
      "Hold to the right path and fortune comes of itself",
      "Keep your true heart and do not waver",
      "The time is not yet ripe—you must wait",
      "Wait and the flowers bloom, spring fills the hall",
    ],
    plain:
      "Middling-even: hold to virtue and await the time. This is not yet the best moment; you must keep to the right path and wait patiently. Once the time is ripe, all will surely go smoothly.",
    interpretation: {
      career: "The time is not yet ripe; keep building strength and wait for the best moment to act.",
      love: "The affinity for love has not yet come; keep your true heart, and when it arrives it blooms naturally.",
      wealth: "The time to invest has not come; first hold what you have and await a good chance.",
      health: "Keep a normal routine and guard your health's foundation while waiting to improve.",
    },
    yi: ["Await the right time", "Keep your true heart"],
    ji: ["Strike rashly", "Give up waiting"],
    zen: "Heaven and earth hold great beauty yet speak not; they hold a great Way yet force nothing.",
  },
  "huangdaxian:20": {
    name: "Name on the Golden Roll",
    poem: [
      "Your name on the golden roll, known to all the world",
      "First in the exam, you return home in glory",
      "Years of hard study by the cold window are repaid",
      "A splendid future unfolds your grand design",
    ],
    plain:
      "Highly auspicious: your name on the golden roll. Your long effort and accumulation are about to be recognized; all you have given will be repaid at this crucial moment—cause for celebration.",
    interpretation: {
      career: "Good news in exams, evaluations, or promotion; years of effort are recognized.",
      love: "Love comes to fruition; the relationship enters a new stage and happiness follows.",
      wealth: "Effort is exchanged for wealth, and honest income rises sharply.",
      health: "A cheerful mood, a healthy body, and excellent condition.",
    },
    yi: ["Take exams", "Apply for jobs", "Seek promotion"],
    ji: ["Slack off and quit", "Cram at the last minute"],
    zen: "Ten years of study by the cold window unnoticed—then one rise to fame known to all the world.",
  },
};

export const LING_TW_5: Record<string, SignContentOverride> = {
  "huangdaxian:11": {
    name: "逢凶化吉",
    poem: ["危難之中有轉機", "逢凶化吉神助力", "險中求進終無礙", "轉危為安福滿堂"],
    plain:
      "中吉，逢凶化吉。遇到困難和危險時不要驚慌，神明自有安排，轉機就在其中，危險將化為福氣。",
    interpretation: {
      career: "工作中遇到危機，保持冷靜，危機中有轉機。",
      love: "感情遇到波折，不要絕望，困難過後感情更加穩固。",
      wealth: "財運有小波折，有貴人相助，化險為夷。",
      health: "身體遇到小問題，及時就醫，康復順利。",
    },
    yi: ["冷靜處理", "尋求幫助"],
    ji: ["驚慌失措", "胡亂應對"],
    zen: "山窮水盡疑無路，柳暗花明又一村。",
  },
  "huangdaxian:12": {
    name: "知足常樂",
    poem: ["知足者貧而樂", "不知足者富而憂", "常懷感恩心自寬", "平凡之中見真樂"],
    plain:
      "中平之籤，知足常樂。提醒你學會滿足，珍惜現有的一切。以感恩之心面對生活，幸福其實就在眼前。",
    interpretation: {
      career: "現在的工作已經不錯，不必過度比較，珍惜眼前。",
      love: "眼前的伴侶值得珍惜，知足才能長久。",
      wealth: "財富已經夠用，量力而行，知足常樂。",
      health: "心態平和對身體最好，減少慾望，自然健康。",
    },
    yi: ["感恩", "珍惜當下"],
    ji: ["貪得無厭", "攀比心重"],
    zen: "知足者常樂，貪心者多苦。",
  },
  "huangdaxian:13": {
    name: "財源廣進",
    poem: ["財源滾滾如泉湧", "日進斗金福滿門", "廣開財路迎貴客", "金銀滿倉福澤深"],
    plain:
      "上吉，財源廣進。各種財路皆暢通，收入來源增多，是進行財務規劃和投資的好時機。",
    interpretation: {
      career: "事業進入爆發期，收入大幅提升，值得慶賀。",
      love: "感情豐收，物質與感情雙豐收，生活美滿。",
      wealth: "多方財路開通，投資理財都有好結果，財運絕佳。",
      health: "身體健康，精神充沛，有好狀態創造財富。",
    },
    yi: ["投資", "創業", "理財"],
    ji: ["守財奴思維", "不善利用"],
    zen: "財通則心通，廣結善緣財自來。",
  },
  "huangdaxian:14": {
    name: "和氣生財",
    poem: ["家和萬事興", "和氣生財自然來", "待人寬厚福無邊", "笑口常開樂逍遙"],
    plain:
      "中吉，和氣生財。保持和諧的人際關係，家庭和睦，則諸事順利，財運自來。笑臉迎人，好運連連。",
    interpretation: {
      career: "職場人際和諧，合作愉快，業績自然提升。",
      love: "感情和諧美滿，家庭幸福，是最大的福氣。",
      wealth: "和氣生財，透過好的人際關係帶來財運。",
      health: "心情愉悅，笑口常開，是最好的健康祕訣。",
    },
    yi: ["和氣待人", "家庭和睦"],
    ji: ["爭吵", "斤斤計較"],
    zen: "家和萬事興，和氣自生財。",
  },
  "huangdaxian:15": {
    name: "前程似錦",
    poem: ["前途光明似錦程", "萬丈光芒照前路", "步步高升無阻礙", "錦上添花樂無窮"],
    plain:
      "上上大吉，前程似錦！你的未來充滿無限可能，每一步都將越走越順，越來越好，前程似錦，光明無限。",
    interpretation: {
      career: "職業發展前景極佳，步步高升，成就非凡。",
      love: "愛情美好，未來充滿希望，幸福長久。",
      wealth: "財運越來越好，將來收穫滿滿。",
      health: "健康狀態越來越好，充滿活力。",
    },
    yi: ["積極進取", "放眼未來"],
    ji: ["安於現狀", "不思進取"],
    zen: "志存高遠，前程似錦；腳踏實地，終成大器。",
  },
  "huangdaxian:16": {
    name: "萬事如意",
    poem: ["吉星高照福滿堂", "萬事如意樂無邊", "喜從天降福從來", "幸運之神常相隨"],
    plain:
      "上上大吉，萬事如意！黃仙賜福，吉星高照，所有的心願都會得到滿足，幸福就在眼前。",
    interpretation: {
      career: "工作上萬事順利，目標輕鬆實現，成就感滿滿。",
      love: "愛情甜蜜，萬事如意，幸福美滿。",
      wealth: "財運絕佳，所求皆得，萬事如意。",
      health: "身心俱佳，健康如意，一切美好。",
    },
    yi: ["一切所求", "享受幸福"],
    ji: ["過度擔憂"],
    zen: "心存善意，萬事如意；感恩當下，幸福常在。",
  },
  "huangdaxian:17": {
    name: "逆境求存",
    poem: ["逆境之中磨意志", "艱難險阻練筋骨", "鳳凰涅槃火中生", "破繭成蝶自翱翔"],
    plain:
      "中平之籤，逆境求存。當前正處於艱難時期，這是鍛鍊你的磨刀石。經歷這些考驗，你將脫胎換骨，如鳳凰涅槃。",
    interpretation: {
      career: "工作遭遇挑戰，這是磨礪，撐過去就是質的提升。",
      love: "感情歷經風雨，感情因此更加堅固，值得珍惜。",
      wealth: "財運暫時不佳，艱難時刻更需要積累實力。",
      health: "身體需要調養，逆境中保持健康生活習慣。",
    },
    yi: ["磨礪自我", "積累實力"],
    ji: ["放棄努力", "自暴自棄"],
    zen: "寶劍鋒從磨礪出，梅花香自苦寒來。",
  },
  "huangdaxian:18": {
    name: "廣結善緣",
    poem: ["廣結善緣福自來", "與人為善天地寬", "良緣善果皆有報", "德厚流光萬古傳"],
    plain:
      "上吉，廣結善緣。多行善事，廣結良緣，所有的善意都將化為福報，回饋給你。緣分是最好的禮物。",
    interpretation: {
      career: "擴大人脈，廣結善緣，工作機遇因此增多。",
      love: "透過人脈結識心儀對象，善緣帶來愛情。",
      wealth: "善緣帶來財運，合作機會因此增多。",
      health: "內心善良，正能量滿滿，身心健康。",
    },
    yi: ["社交", "助人", "積德"],
    ji: ["自私自利", "斤斤計較"],
    zen: "與人玫瑰，手有餘香；廣結善緣，福報無邊。",
  },
  "huangdaxian:19": {
    name: "守正待時",
    poem: ["守正道中運自來", "持守本心莫彷徨", "時機未到須等待", "等得花開春滿堂"],
    plain:
      "中平之籤，守正待時。現在還不是最佳時機，需要守住正道，耐心等待。時機一旦成熟，必然一帆風順。",
    interpretation: {
      career: "時機尚未成熟，繼續積累實力，等待最佳時機出手。",
      love: "感情緣分還未到，守住本心，緣分到了自然開花。",
      wealth: "投資時機未到，先守住現有，靜待良機。",
      health: "保持正常作息，守住健康基礎，等待狀態轉好。",
    },
    yi: ["等待時機", "守住本心"],
    ji: ["貿然出擊", "放棄等待"],
    zen: "天地有大美而不言，有大道而不強求。",
  },
  "huangdaxian:20": {
    name: "金榜題名",
    poem: ["金榜題名天下知", "狀元及第榮歸里", "寒窗苦讀終有報", "錦繡前程展鴻圖"],
    plain:
      "上吉，金榜題名。你長期的努力與積累終於要得到認可，一切付出將在這個關鍵時刻得到回報，值得慶賀。",
    interpretation: {
      career: "考試、評優或晉升均有好消息，多年努力得到認可。",
      love: "感情修成正果，關係進入新階段，幸福相隨。",
      wealth: "透過努力換來財富，正當收入大幅提升。",
      health: "心情愉悅，身體健康，狀態極佳。",
    },
    yi: ["考試", "應聘", "晉升"],
    ji: ["懶散放棄", "臨時抱佛腳"],
    zen: "十年寒窗無人問，一舉成名天下知。",
  },
};
