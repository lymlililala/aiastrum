import type { SignContentOverride } from "./lingqian-content-i18n";

// 云端灵签 · 观音灵签 1–10 内容覆盖（英文 / 繁体）
// key = `guanyin:${id}`；shape 严格匹配 SignContentOverride。

export const LING_EN_1: Record<string, SignContentOverride> = {
  "guanyin:1": {
    name: "Zhongli Attains the Tao",
    poem: [
      "Riding the dragon, astride the tiger — extraordinary deeds,",
      "Fame and fortune run straight through your destiny,",
      "Golden seals and purple sashes draw the envy of all,",
      "Blessings and rank both complete — the greatest of good fortune.",
    ],
    plain:
      "The most auspicious of signs. Like Zhongli Han who attained immortality and the Tao, fame and fortune can all be won as you wish. Whatever you seek now will go smoothly — this is the very moment to unfold your grand ambitions.",
    interpretation: {
      career: "Great fortune is at its height. Promotions and raises come naturally; benefactors lend their aid, and you can spread your wings wide.",
      love: "The bond is destined by Heaven; lovers will be wed. Marriage is favored, and affection is sweet.",
      wealth: "Wealth flourishes — both windfall and steady income arrive. Investments are favorable; you may stake boldly.",
      health: "Body healthy and full of vigor. Mind the balance of work and rest, and keep an optimistic heart.",
    },
    yi: ["Plan ventures", "Travel", "Marriage", "Seek wealth"],
    ji: ["Litigation", "Reckless spending"],
    zen: "Where the heart is sincere, even metal and stone give way.",
  },
  "guanyin:2": {
    name: "Patriarch Lü Cultivates the Way",
    poem: [
      "Bearing the envoy's staff southward, fortune is not yet open,",
      "Know that within bitterness lies the seed of peace,",
      "Wait until after the peach blossoms unfold,",
      "And bright moon, clear wind will turn naturally fair.",
    ],
    plain:
      "An auspicious sign. Like Lü Dongbin who endured every hardship in cultivation before attaining the fruit of the Way. Though difficulty is present now, a turning point is hidden within. Hold firm to your resolve, and when the time ripens, all will go smoothly of its own accord.",
    interpretation: {
      career: "There are slight obstacles for now. You must patiently await the right moment; steady, solid effort will bring achievement in the end.",
      love: "The relationship needs time to nurture; the bond is not yet ripe. Keep your patience.",
      wealth: "Fortune rises steadily. Haste invites loss — preserving what you have is best.",
      health: "Mind your rest, adjust your routine, and health will recover on its own.",
    },
    yi: ["Still the mind", "Study", "Lay plans"],
    ji: ["Rushing for results", "Acting rashly"],
    zen: "Stillness cultivates the self; frugality nurtures virtue.",
  },
  "guanyin:3": {
    name: "Han Xin Marshals His Troops",
    poem: [
      "Clouds part to reveal the sun — a fine season at last,",
      "Ten thousand miles of road, every path now open,",
      "In all things, if a benefactor lends a hand,",
      "Success and renown rise high in joyful air.",
    ],
    plain:
      "Auspicious. Like Han Xin leading his army to break the enemy, the situation is altogether favorable. With a benefactor's aid, what once seemed a deadlock will resolve itself. Simply seize the opportunity — your prospects are boundless.",
    interpretation: {
      career: "A benefactor lifts you up; work troubles dissolve, and a chance for promotion lies right before you.",
      love: "Romance arrives. The single may hope to meet a fine match, and lovers grow warmer.",
      wealth: "Many paths of wealth open; both regular and windfall income flow in. Seize the chance at hand.",
      health: "Good physical condition. Maintain a positive frame of mind.",
    },
    yi: ["Seek work", "Confess feelings", "Sign contracts", "Travel"],
    ji: ["Clinging stubbornly to your view", "Refusing help"],
    zen: "Opportunity always favors the prepared.",
  },
  "guanyin:4": {
    name: "Mencius's Mother Moves Thrice",
    poem: [
      "Though the dwelling moves, the heart stays at peace,",
      "Hold to this fragrant season and make it fair,",
      "Wait until autumn comes and the harvest is gathered,",
      "And amid the sweet-olive's scent your face will break into joy.",
    ],
    plain:
      "An auspicious sign. Like Mencius's mother who moved three times to raise her son. Though what you seek meets twists and turns, adjust your direction and persevere — when autumn comes, there will surely be a harvest.",
    interpretation: {
      career: "Your work direction may be adjusted as fitting. Gather experience; the road ahead remains bright.",
      love: "The relationship needs both sides to tend it together. Communicate and understand more, and affection deepens day by day.",
      wealth: "Fortune rises steadily. Avoid risk and speculation; prudent management is the wisest course.",
      health: "Mind your diet and routine, adjust your living environment, and the body will feel at ease.",
    },
    yi: ["Adjust plans", "Study and enrich yourself", "Act prudently"],
    ji: ["Risky speculation", "Going your own way alone"],
    zen: "Accumulate richly, release sparingly — without small steps, one cannot reach a thousand miles.",
  },
  "guanyin:5": {
    name: "Bo Ya Smashes His Zither",
    poem: [
      "A true friend is rare and hard to find in this world,",
      "Clear wind and bright moon linger close together,",
      "Say not that high mountains and flowing streams lie far,",
      "On another day they meet, then each returns his own way.",
    ],
    plain:
      "A middling sign. Like Bo Ya grieving the loss of Ziqi. What you seek now may fall short — a kindred spirit hard to meet, or plans obstructed. Only a calm heart will let you see the rainbow.",
    interpretation: {
      career: "You may meet misunderstanding at work; more patience and communication are needed.",
      love: "There may be barriers to communication; both sides must treat each other with candor.",
      wealth: "Fortune is ordinary. For now, holding steady is best — await the right moment.",
      health: "Your mood is prone to low spells. Mind your emotions and keep body and mind healthy.",
    },
    yi: ["Settle and reflect", "Listen to others"],
    ji: ["Forcing matters", "Quarreling", "Large expenditures"],
    zen: "Contentment is lasting joy; be at ease wherever you find yourself.",
  },
  "guanyin:6": {
    name: "The Sixth Patriarch Awakens to the Way",
    poem: [
      "Bodhi is fundamentally without a tree,",
      "The bright mirror is also no stand,",
      "From the first there is not a single thing,",
      "Where, then, could dust alight?",
    ],
    plain:
      "The most auspicious of signs — the verse of Huineng, the Sixth Patriarch, at his sudden awakening. If the heart is pure, all things are empty; see through appearances, and wisdom comes of itself. Let go of attachment, and all becomes clear.",
    interpretation: {
      career: "Set aside the mind bent on gain; meet matters with a peaceful heart, and great works are achieved instead.",
      love: "Release possessiveness; give each other space, and the bond grows steadier on its own.",
      wealth: "With a peaceful heart, wealth comes of itself. Avoid greed at all costs.",
      health: "A calm heart brings calm breath. Stay serene and optimistic, and the body is naturally well.",
    },
    yi: ["Meditate", "Cultivate the heart", "Charity"],
    ji: ["Greed", "Contention and rivalry"],
    zen: "If the heart is like bodhi, what is there to fear in wind and rain?",
  },
  "guanyin:7": {
    name: "Liu Bei's Three Visits",
    poem: [
      "Three visits to the thatched hut, seeking the worthy with resolve,",
      "Sincerity moves the Crouching Dragon to emerge,",
      "Meeting a sage who points the way through confusion,",
      "A ten-thousand-mile roc's flight begins from this moment.",
    ],
    plain:
      "Auspicious. Like Liu Bei who paid three visits to the thatched cottage and finally won Zhuge Liang. Treat others with sincerity and persevere unceasingly — you will at last meet a benefactor, and your endeavors will soar from here.",
    interpretation: {
      career: "Persevere in seeking a breakthrough; a benefactor is not far off. Keep your integrity.",
      love: "Sincere devotion moves the other; the relationship may advance a step further.",
      wealth: "In seeking wealth, take sincerity as the root; deal honestly, and fortune gradually opens.",
      health: "Actively seek professional advice; your condition turns for the better.",
    },
    yi: ["Seek the worthy", "Negotiate", "Start a venture"],
    ji: ["False sentiment", "Giving up halfway"],
    zen: "What is sincere within takes form without; a sincere heart moves Heaven and Earth.",
  },
  "guanyin:8": {
    name: "Sleeping on Brushwood, Tasting Gall",
    poem: [
      "A time to bear humiliation and shoulder the burden,",
      "Sleeping on brushwood, tasting gall — resolve unmoved,",
      "Wait for the day of rising again from the east,",
      "Three thousand men of Yue will swallow the troops of Wu.",
    ],
    plain:
      "Auspicious. Like King Goujian of Yue who slept on brushwood and tasted gall, finally restoring his kingdom. Though hardship is at hand, this is the very time to temper your will. Hold firm to your faith, bear it patiently and bide your time — at last you will turn the tide and realize your aim.",
    interpretation: {
      career: "A dormant phase now. Conceal your brilliance, build your strength, and await the day of rising again.",
      love: "The relationship undergoes trial; hardship reveals true feeling, and the bond grows firmer.",
      wealth: "Short-term gains are slim, but the long-term outlook is broad.",
      health: "The body needs recuperation; exercise step by step in gradual order.",
    },
    yi: ["Accumulate", "Endure", "Study", "Plan"],
    ji: ["Craving quick gains", "Reckless action"],
    zen: "After bitterness comes sweetness; accumulate richly to release with force.",
  },
  "guanyin:9": {
    name: "The Oath in the Peach Garden",
    poem: [
      "The peach-garden oath, a bond of sworn brotherhood,",
      "One in heart and virtue, sharing glory and disgrace,",
      "Brothers of one mind, their strength can cut through metal,",
      "Their righteousness towering to the clouds, passed down through the ages.",
    ],
    plain:
      "Auspicious. Like Liu, Guan, and Zhang who swore brotherhood in the peach garden. In cooperating and working with others, take loyalty and righteousness as the root; with the team's combined strength, you achieve twice the result with half the effort.",
    interpretation: {
      career: "Joint projects go smoothly; with united effort, you create fine achievements together.",
      love: "Love that is loyal and devoted; the two support each other, a bond firmer than gold.",
      wealth: "Partnership ventures or joint investments are favorable; sources of wealth flow wide.",
      health: "With the support of friends and family, body and mind are healthy.",
    },
    yi: ["Cooperate", "Make friends", "Teamwork"],
    ji: ["Going back on your word", "Betraying trust"],
    zen: "Righteousness is fitness for what is right; the way of the gentleman lies in trust and honor.",
  },
  "guanyin:10": {
    name: "Li Bai, the Immortal of Poetry",
    poem: [
      "Raising my cup, I invite the bright moon,",
      "With my shadow we become three,",
      "Heaven gave me talent that must find its use,",
      "A thousand pieces of gold, once spent, will come again.",
    ],
    plain:
      "The most auspicious of signs. Like Li Bai, the Immortal of Poetry, brimming with heroic spirit. You possess a singular talent, and this is the very time to shine. Believe in yourself, and good fortune will come knocking of its own accord.",
    interpretation: {
      career: "Talent overflows; spread your wings and achieve the extraordinary.",
      love: "Romance arrives; your love life is brilliant and rich.",
      wealth: "Wealth comes and goes like flowing water, yet in the end you will reap a full harvest.",
      health: "Excellent condition. Keep an optimistic heart, and health is no concern.",
    },
    yi: ["Create", "Express", "Savor the present"],
    ji: ["Overspending yourself", "Indulging in pleasure"],
    zen: "Heaven gave me talent that must find its use; a thousand pieces of gold, once spent, will come again.",
  },
};

export const LING_TW_1: Record<string, SignContentOverride> = {
  "guanyin:1": {
    name: "鍾離成道",
    poem: ["騎龍跨虎事非常", "功名富貴貫穿匡", "金章紫綬人稱羨", "福祿雙全大吉祥"],
    plain:
      "上上大吉，如鍾離漢成仙得道，功名富貴皆能如願。此時一切所求皆能順遂，大展宏圖正當時。",
    interpretation: {
      career: "鴻運當頭，升職加薪水到渠成，貴人相助，大展宏圖。",
      love: "緣分天定，有情人終成眷屬，婚嫁皆宜，感情甜蜜。",
      wealth: "財運旺盛，偏財正財雙收，投資有利，可放手一搏。",
      health: "身體健康，精力充沛，注意勞逸結合，保持樂觀。",
    },
    yi: ["謀事", "出行", "婚嫁", "求財"],
    ji: ["爭訟", "破財"],
    zen: "心誠所至，金石為開。",
  },
  "guanyin:2": {
    name: "呂祖修煉",
    poem: ["持節南行運未亨", "須知苦處是安平", "待得桃花開後看", "明月清風自然晴"],
    plain:
      "上吉之籤，如呂洞賓修煉歷盡艱辛終得正果。當前雖有困難，暗含轉機，堅持心志，待到時機成熟，自然萬事順遂。",
    interpretation: {
      career: "當前略有阻礙，需耐心等待時機，穩紮穩打終有成就。",
      love: "感情需要時間經營，緣分尚未成熟，保持耐心。",
      wealth: "財運平穩上升，急於求成恐有失，守成為上。",
      health: "注意休養，調節作息，健康自會好轉。",
    },
    yi: ["靜心", "學習", "謀劃"],
    ji: ["急於求成", "貿然出擊"],
    zen: "靜以修身，儉以養德。",
  },
  "guanyin:3": {
    name: "韓信點兵",
    poem: ["撥雲見日好時光", "萬里長途路路通", "凡事若逢貴人助", "功成名就喜氣揚"],
    plain:
      "上吉，如韓信帶兵破敵，形勢一片大好。有貴人相助，原本困境將迎刃而解，只須把握機遇，前程無量。",
    interpretation: {
      career: "有貴人提攜，工作難題迎刃而解，晉升機會就在眼前。",
      love: "桃花運來臨，單身者有望遇見良緣，戀人感情升溫。",
      wealth: "財路廣開，正財偏財均有進帳，把握眼前機會。",
      health: "身體狀況良好，保持積極心態。",
    },
    yi: ["求職", "表白", "簽約", "出行"],
    ji: ["固執己見", "拒絕幫助"],
    zen: "機遇總是偏愛有準備的人。",
  },
  "guanyin:4": {
    name: "孟母三遷",
    poem: ["室雖遷動心自安", "且守芳時作好看", "待得秋來收成後", "桂花香裡樂開顏"],
    plain:
      "中吉之籤，如孟母三遷成就孟子。所謀之事雖有波折，只要調整方向，堅持努力，秋來必有收穫。",
    interpretation: {
      career: "工作方向可適當調整，累積經驗，前途仍然光明。",
      love: "感情需要雙方共同經營，多溝通理解，感情日益深厚。",
      wealth: "財運穩中有升，切忌冒險投機，穩健理財方為上策。",
      health: "注意飲食作息，調整生活環境，身體方能舒暢。",
    },
    yi: ["調整計劃", "學習充實", "穩健行事"],
    ji: ["冒險投機", "一意孤行"],
    zen: "厚積而薄發，不積跬步無以至千里。",
  },
  "guanyin:5": {
    name: "伯牙摔琴",
    poem: ["知音難覓世間稀", "清風明月共依依", "莫道高山流水遠", "他日相逢各自歸"],
    plain:
      "中平之籤，如伯牙痛失子期。當前所求可能有所欠缺，或知音難遇，或計劃受阻。平靜心態，方能見彩虹。",
    interpretation: {
      career: "工作中可能遭遇誤解，需要更多耐心與溝通。",
      love: "感情上可能有溝通障礙，雙方需坦誠以待。",
      wealth: "財運一般，暫時守成為宜，等待時機。",
      health: "心情容易低落，注意情緒管理，保持身心健康。",
    },
    yi: ["沉澱自我", "傾聽他人"],
    ji: ["強求", "爭執", "大額支出"],
    zen: "知足常樂，隨遇而安。",
  },
  "guanyin:6": {
    name: "六祖悟道",
    poem: ["菩提本無樹", "明鏡亦非台", "本來無一物", "何處惹塵埃"],
    plain:
      "上上大吉，是六祖慧能頓悟之偈。心若純淨，萬物皆空，看透表象，智慧自來。放下執念，豁然開朗。",
    interpretation: {
      career: "放下功利之心，以平和心態處事，反而能成就大業。",
      love: "感情中放下佔有欲，給彼此空間，感情自然更穩固。",
      wealth: "心態平和，反而財運自來，切忌貪念。",
      health: "心平則氣和，保持平靜樂觀，身體自然安康。",
    },
    yi: ["冥想", "修心", "慈善"],
    ji: ["貪念", "爭強好勝"],
    zen: "心若菩提，風雨何懼。",
  },
  "guanyin:7": {
    name: "劉備三顧",
    poem: ["三顧茅廬求賢志", "誠心感動臥龍出", "得遇高人指迷津", "萬里鵬程此時始"],
    plain:
      "上吉，如劉備三顧茅廬終得諸葛亮。以誠待人，堅持不懈，終能遇見貴人，事業從此騰飛。",
    interpretation: {
      career: "堅持努力尋求突破，貴人就在不遠處，保持誠信。",
      love: "真誠付出感動對方，感情有望更進一步。",
      wealth: "求財需以誠為本，合法經營，財運漸開。",
      health: "積極尋求專業建議，身體狀況向好。",
    },
    yi: ["求賢", "談判", "創業"],
    ji: ["虛情假意", "半途而廢"],
    zen: "誠於內者，形於外；誠心感天地。",
  },
  "guanyin:8": {
    name: "臥薪嘗膽",
    poem: ["暫時忍辱負重時", "臥薪嘗膽志不移", "待到東山再起日", "三千越甲吞吳兵"],
    plain:
      "中吉，如越王勾踐臥薪嘗膽終復國。眼下雖有困境，正是磨礪意志之時。堅定信念，隱忍待時，終能翻身得志。",
    interpretation: {
      career: "當前蟄伏期，韜光養晦，累積實力，等待東山再起。",
      love: "感情經歷考驗，患難見真情，關係更加堅固。",
      wealth: "短期收益不多，但長期前景廣闊。",
      health: "身體需要調養，循序漸進地鍛鍊。",
    },
    yi: ["累積", "忍耐", "學習", "規劃"],
    ji: ["急功近利", "魯莽行事"],
    zen: "苦盡甘來，厚積薄發。",
  },
  "guanyin:9": {
    name: "桃園三結義",
    poem: ["桃園結義金蘭契", "同心同德共榮辱", "兄弟齊心力斷金", "義薄雲天萬古傳"],
    plain:
      "上吉，如劉關張桃園結義。與人合作共事，忠義為本，團隊合力之下，事半功倍。",
    interpretation: {
      career: "合作項目順利，同心協力，共創佳績。",
      love: "感情忠誠專一，兩人相互扶持，情比金堅。",
      wealth: "合夥創業或合作投資有利，財源廣進。",
      health: "有朋友和家人支持，身心健康。",
    },
    yi: ["合作", "交友", "團隊協作"],
    ji: ["出爾反爾", "背信棄義"],
    zen: "義者，宜也。君子之道在於信義。",
  },
  "guanyin:10": {
    name: "李白詩仙",
    poem: ["舉杯邀明月", "對影成三人", "天生我材必有用", "千金散盡還復來"],
    plain:
      "上上大吉，如詩仙李白豪情萬丈。你擁有獨特才華，正是大放異彩之時。相信自己，好運自然來敲門。",
    interpretation: {
      career: "才華橫溢，大展宏圖，成就非凡。",
      love: "浪漫來臨，感情生活精彩紛呈。",
      wealth: "財來財去如流水，終將豐收。",
      health: "狀態極佳，保持樂觀心態，健康不是問題。",
    },
    yi: ["創作", "表達", "享受當下"],
    ji: ["過度消耗", "沉迷享樂"],
    zen: "天生我材必有用，千金散盡還復來。",
  },
};
