import type { SignContentOverride } from "./lingqian-content-i18n";

// 云端灵签 · 内容覆盖第三批：观音签 21–30（英文 + 繁体）
// shape 严格对齐 SignContentOverride（poem 为 4 元组）。

export const LING_EN_3: Record<string, SignContentOverride> = {
  "guanyin:21": {
    name: "Chang'e Flies to the Moon",
    poem: [
      "Chang'e must regret stealing the elixir of life,",
      "Night after night, her heart aches under the jade sky and azure sea.",
      "Lonely on high, the moon palace is cold,",
      "The warmth of the mortal world knows true feeling best.",
    ],
    plain:
      "A neutral sign, like Chang'e flying to the moon where the heights cannot bear the cold. A choice that looks glorious now may bring loneliness and regret. Think thrice before acting, and cherish those beside you.",
    interpretation: {
      career:
        "No matter how high your position, cherish those around you; do not let loneliness be the price of success.",
      love:
        "Love needs to be tended with care; do not let distance breed estrangement. Spend more time together.",
      wealth:
        "Money is not everything; do not neglect important people and things in the pursuit of wealth.",
      health:
        "Mind the effect of loneliness on your psyche; interact more with family and friends.",
    },
    yi: ["Cherish the present", "Accompany family"],
    ji: ["Excessive chasing of fame and gain", "Neglecting kinship"],
    zen: "May we all be blessed with long life, sharing the same moon though a thousand miles apart.",
  },
  "guanyin:22": {
    name: "Lady White Snake and Xu Xian",
    poem: [
      "At the Broken Bridge of West Lake they met their destined hour,",
      "A thousand years of cultivation to share one pillow and mat.",
      "Deep love can hardly escape the worldly eye,",
      "So wait until the day Leifeng Pagoda falls.",
    ],
    plain:
      "Lesser auspice, like the timeless romance of the White Snake and Xu Xian. The road of love has its setbacks, and outside forces may obstruct, yet true feeling cannot be hidden in the end. Hold fast to love and await the right moment.",
    interpretation: {
      career:
        "Relationships at work are tangled; keep your simple original intent and do not be swayed by outside noise.",
      love:
        "Your love is deep and true, but obstacles abound; lovers need courage to weather hardship together.",
      wealth:
        "Average wealth luck; unexpected gains may surprise you, but guard against financial disputes.",
      health: "Mind how mood swings affect your body.",
    },
    yi: ["Confess true feelings", "Pursue boldly"],
    ji: ["Evasion", "Yielding to outside pressure"],
    zen: "What is love in this world, that it binds people to vow life and death together?",
  },
  "guanyin:23": {
    name: "Su Wu Tends the Sheep",
    poem: [
      "Tending sheep at the world's far edge is bitter toil,",
      "Yet he holds his envoy's staff, unchanged in love for Han.",
      "After nineteen years he returns to his homeland,",
      "His loyalty and honor named in history for a thousand ages.",
    ],
    plain:
      "A neutral sign, like Su Wu tending sheep nineteen years with unwavering loyalty. Your present situation is hard, but hold to your principles and never forget your original intent. Persevere, and you will at last keep your good name.",
    interpretation: {
      career:
        "Facing pressure at work, keep your original intent and uphold professional ethics; good results will come.",
      love:
        "Love may be tested by separation; wait for each other, and true feeling will last.",
      wealth: "Wealth luck is plain; let it flow steadily and spend frugally.",
      health: "Mind mental pressure; relax properly and avoid burning out.",
    },
    yi: ["Persevere", "Keep faith", "Loyalty"],
    ji: ["Betraying principles", "Craving comfort"],
    zen: "Wait for the clouds to part and the moon to shine; to persevere is to triumph.",
  },
  "guanyin:24": {
    name: "Yue Fei's Utmost Loyalty",
    poem: [
      "Utmost loyalty to serve the nation, a will firm as iron,",
      "Do not idly let a young man's hair turn white.",
      "Grand ambition soars, its spirit piercing the heavens,",
      "A hero's true nature composes a splendid song.",
    ],
    plain:
      "Greater auspice, like Yue Fei serving his nation with utmost loyalty. You hold a great ambition and your direction is right, but beware the obstruction of petty schemers. Do your utmost in all things and keep a clear conscience.",
    interpretation: {
      career:
        "Your passion for work runs high and your achievements stand out; mind workplace relations and guard against schemers.",
      love:
        "Your love is sincere and your partner is moved, but guard against a third party intruding.",
      wealth:
        "Honest income flourishes; seek wealth by upright means and you will reap rich rewards.",
      health: "Strong and robust; keep up your exercise routine.",
    },
    yi: ["Be loyal to your duty", "Strive hard"],
    ji: ["Acting on impulse", "Trusting schemers lightly"],
    zen: "Righteous spirit endures forever, vast and unyielding.",
  },
  "guanyin:25": {
    name: "Zhang Guolao Rides His Donkey Backwards",
    poem: [
      "Zhang Guolao rides his donkey backwards at ease,",
      "Looking back, he has seen through a thousand years of affairs.",
      "Acting with the flow brings true freedom,",
      "See through all things and joy knows no bounds.",
    ],
    plain:
      "Lesser auspice, like Zhang Guolao riding his donkey backwards, calm and free. Life sometimes calls for reverse thinking; look at the problem from another angle and you may find a wholly new path to a solution.",
    interpretation: {
      career:
        "Try reverse thinking; break the conventions, and an innovative way of working will bring pleasant surprises.",
      love:
        "Bring freshness to your love now and then, and the relationship grows more alive.",
      wealth:
        "Investing against the trend or operating in reverse brings unexpected gains.",
      health: "Change your lifestyle habits; try a different approach to health.",
    },
    yi: ["Think in reverse", "Switch perspective"],
    ji: ["Clinging to old methods", "Never changing"],
    zen: "Seen sideways it is a ridge, head-on a peak; far or near, high or low, each view differs.",
  },
  "guanyin:26": {
    name: "Nuwa Mends the Sky",
    poem: [
      "When the sky collapsed and earth caved in, Nuwa mended it,",
      "Smelting stone and fusing metal into a five-colored sky.",
      "Great selfless love upholds all living things,",
      "The spirit of devotion passes down a fair name.",
    ],
    plain:
      "Greater auspice, like Nuwa selflessly mending the sky. You carry a spirit of selfless devotion, and now is the very time to put your strengths to use. Help others and accumulate deep blessings.",
    interpretation: {
      career:
        "Actively help colleagues and show team spirit; your efforts will be recognized.",
      love:
        "Give more in love and care sincerely for your partner; the bond grows steady and deep.",
      wealth: "Joy in helping others brings good fortune, and honest income grows.",
      health: "Taking joy in helping others greatly benefits mental health.",
    },
    yi: ["Help others", "Devotion", "Teamwork"],
    ji: ["Thinking only of yourself", "Shirking responsibility"],
    zen: "Give a rose, and the fragrance lingers on your hand.",
  },
  "guanyin:27": {
    name: "Fan Li Sets Sail",
    poem: [
      "Having won merit and fame, he withdrew at the swift current,",
      "Boating across the five lakes, leisurely and content.",
      "Wisdom does not lie in power and rank,",
      "To roam free and at ease is the truest grace.",
    ],
    plain:
      "Greater auspice, like Fan Li retiring after success to boat across the five lakes. This sign reminds you to know when to advance and when to retreat; sometimes a timely step back is not failure but great wisdom.",
    interpretation: {
      career:
        "Adjust your work pace in time and know what to take and leave; in the long run your career will go more smoothly.",
      love:
        "Do not force love; let it run its course. When fate comes, you gather; when it goes, you part.",
      wealth: "Learn to diversify investments, preserve capital first, and guard against risk.",
      health:
        "Keep life in balance, blend work with rest; health of body and mind matters most.",
    },
    yi: ["Be content and happy", "Stop while you are ahead"],
    ji: ["Insatiable greed", "Forcing what cannot be held"],
    zen: "The content are ever joyful; those who can endure find their own peace.",
  },
  "guanyin:28": {
    name: "The Seven Fairies Descend to Earth",
    poem: [
      "From the fairy land of Yaochi they descend to the mortal dust,",
      "The red thread ties together those who are fated.",
      "Heaven and the mortal world are bound by feeling,",
      "Meeting on the Magpie Bridge, they share the same bright moon.",
    ],
    plain:
      "Greater auspice, like the heaven-sent bond of the Seven Fairies and Dong Yong. A beautiful fate is drawing near to you; whether in love or career, unexpected surprises await.",
    interpretation: {
      career:
        "A benefactor descends as if from heaven; an important opportunity nears, so keep an open mind.",
      love:
        "A match made in heaven arrives; the single may hope to find a fine partner.",
      wealth: "Unexpected wealth comes to your door, a windfall from heaven; seize it well.",
      health: "As if bathed in spring breeze, joyful in body and mind, in excellent health.",
    },
    yi: ["Actively form bonds", "Seize the chance"],
    ji: ["Missing a good match", "Closing yourself off"],
    zen: "With fate, two meet from a thousand miles; without it, they pass face to face unknown.",
  },
  "guanyin:29": {
    name: "Wen Tianxiang's Martyrdom",
    poem: [
      "Since ancient times, who among us escapes death?",
      "Let me leave a loyal heart to shine in the annals of history.",
      "Though heaven and earth change not, the hero's will endures,",
      "A thousand years of lofty integrity rests upon this.",
    ],
    plain:
      "A neutral sign, like Wen Tianxiang choosing death over surrender. Your situation is hard now, but justice and morality are your backbone; holding to your true heart takes more courage than ever.",
    interpretation: {
      career:
        "Facing a workplace predicament, stay upright and refuse to compromise with injustice; you will win respect in the end.",
      love: "Love faces a test; loyalty is the best answer.",
      wealth:
        "Wealth luck is blocked; guard your capital, hold to integrity, and take no shortcuts.",
      health: "Your mental state needs adjusting; relieve pressure appropriately.",
    },
    yi: ["Hold to principle", "Live with integrity"],
    ji: ["Submitting to pressure", "Selling out your conscience"],
    zen: "Might cannot bend him, poverty cannot sway him—such is a true man's resolve.",
  },
  "guanyin:30": {
    name: "Wang Zhaojun Leaves for the Frontier",
    poem: [
      "Beyond the frontier, the wind and sand stretch on a long, long road,",
      "Leaving home and homeland for the sake of peace.",
      "On the day her mission is fulfilled and she returns in glory,",
      "Apricot blossoms and spring rain will fill the land south of the river.",
    ],
    plain:
      "Lesser auspice, like Zhaojun leaving for the frontier. You may now need to make a sacrifice or compromise; a temporary grievance serves a greater goal. Hold to your true heart and you will see the clouds part at last.",
    interpretation: {
      career:
        "You may face a transfer or change; though uncomfortable, in the long run it is a good opportunity.",
      love:
        "One side may need to yield in love; with understanding and tolerance, the bond grows firmer.",
      wealth: "Some small setbacks in wealth lately; stay calm, the turning point is at hand.",
      health: "Mind adapting to changes in environment; guard against catching cold.",
    },
    yi: ["Put the bigger picture first", "Adapt to change"],
    ji: ["Self-pity", "Refusing to change"],
    zen: "Sacrifice the small self to fulfill a great love, and merit comes of itself.",
  },
};

export const LING_TW_3: Record<string, SignContentOverride> = {
  "guanyin:21": {
    name: "嫦娥奔月",
    poem: ["嫦娥應悔偷靈藥", "碧海青天夜夜心", "孤獨高處月宮冷", "人間溫暖最知情"],
    plain:
      "中平之籤，如嫦娥奔月高處不勝寒。眼前看似風光的選擇可能帶來孤獨與遺憾，三思而行，珍惜眼前人。",
    interpretation: {
      career: "職位再高也要珍惜身邊的人，別讓成功的代價是孤獨。",
      love: "感情需要用心維護，別讓距離產生隔閡，多陪伴。",
      wealth: "金錢不是一切，勿因追求財富忽略重要的人和事。",
      health: "注意孤獨對心理的影響，多與家人朋友互動。",
    },
    yi: ["珍惜當下", "陪伴家人"],
    ji: ["過分追名逐利", "忽視親情"],
    zen: "但願人長久，千里共嬋娟。",
  },
  "guanyin:22": {
    name: "白蛇許仙",
    poem: ["西湖斷橋逢佳期", "千年修得共枕席", "情深難逃世俗眼", "且待雷峰塔倒時"],
    plain:
      "中吉，如白蛇與許仙的曠世之戀。感情路上有波折，外界因素可能阻礙，但真情終究難掩，堅守愛情，靜待時機。",
    interpretation: {
      career: "工作中有複雜人際，保持單純的初心，不被外界雜音影響。",
      love: "感情深厚真實，但外界阻礙不少，有情人需要勇氣共克時艱。",
      wealth: "財運中等，意外財運可能有驚喜，但要防止財務糾紛。",
      health: "注意情緒波動對身體的影響。",
    },
    yi: ["真情告白", "勇於追求"],
    ji: ["逃避", "屈服於外界壓力"],
    zen: "問世間情為何物，直教人生死相許。",
  },
  "guanyin:23": {
    name: "蘇武牧羊",
    poem: ["萬里天涯牧羊苦", "持節不改漢家情", "十九年後歸故里", "忠義千秋史冊名"],
    plain:
      "中平之籤，如蘇武牧羊十九年忠貞不渝。當前處境艱難，但堅守原則，不忘初心，堅持下去，終將守得正名。",
    interpretation: {
      career: "工作中面臨壓力，保持初心，堅守職業道德，終有好結果。",
      love: "感情或有分離考驗，相互守候，真情長久。",
      wealth: "財運平平，細水長流，節儉用度。",
      health: "注意精神壓力，適當放鬆，避免積勞成疾。",
    },
    yi: ["堅持", "守節", "忠誠"],
    ji: ["背棄原則", "貪圖安逸"],
    zen: "守得雲開見月明，堅持就是勝利。",
  },
  "guanyin:24": {
    name: "岳飛精忠",
    poem: ["精忠報國志如鐵", "莫等閒白了少年頭", "壯志飛揚氣沖天", "英雄本色譜華章"],
    plain:
      "上吉，如岳飛精忠報國。你心中有大志，方向正確，但需注意小人阻撓。凡事盡力而為，問心無愧。",
    interpretation: {
      career: "工作熱情高漲，業績出色，注意職場人際，防小人。",
      love: "感情真誠，對方有所感動，但要防止第三者介入。",
      wealth: "正財旺盛，以正當手段求財，可得豐厚回報。",
      health: "體魄強健，保持鍛鍊習慣。",
    },
    yi: ["忠於職守", "努力拼搏"],
    ji: ["意氣用事", "輕信小人"],
    zen: "正氣長存，浩然不屈。",
  },
  "guanyin:25": {
    name: "張果老倒騎驢",
    poem: ["張果倒騎驢悠然", "回頭看盡千年事", "順勢而為真自在", "凡事看開樂無邊"],
    plain:
      "中吉，如張果老倒騎毛驢從容自在。人生有時需要逆向思考，換個角度看問題，也許會發現別有洞天的解決之道。",
    interpretation: {
      career: "嘗試逆向思維，打破常規，創新的工作方式帶來驚喜。",
      love: "偶爾給感情帶來新鮮感，關係更有活力。",
      wealth: "逆勢投資或反向操作，獲得意外收益。",
      health: "改變生活習慣，試試不同的健康方式。",
    },
    yi: ["逆向思考", "換個角度"],
    ji: ["固執舊法", "一成不變"],
    zen: "橫看成嶺側成峰，遠近高低各不同。",
  },
  "guanyin:26": {
    name: "女媧補天",
    poem: ["天塌地陷女媧補", "煉石熔金五彩天", "大愛無私撐萬物", "奉獻精神美名傳"],
    plain:
      "上吉，如女媧無私補天。你身上有無私的奉獻精神，此時正是發揮所長的時候。幫助他人，積累深厚的福報。",
    interpretation: {
      career: "積極協助同事，發揮團隊精神，付出將得到認可。",
      love: "愛情中多付出，真誠關懷對方，感情穩固深厚。",
      wealth: "助人為樂帶來好運，正財有增。",
      health: "助人為樂對心理健康大有裨益。",
    },
    yi: ["助人", "奉獻", "團隊合作"],
    ji: ["只顧自己", "推諉責任"],
    zen: "贈人玫瑰，手有餘香。",
  },
  "guanyin:27": {
    name: "范蠡泛舟",
    poem: ["功成名就急流退", "泛舟五湖樂悠悠", "智慧不在權勢中", "自在逍遙最風流"],
    plain:
      "上吉，如范蠡功成身退，泛舟五湖。此籤提示你該知進退，有時候適時退一步並非失敗，而是大智慧。",
    interpretation: {
      career: "適時調整工作節奏，懂得取捨，長遠來看反而事業更順。",
      love: "感情不必強求，順其自然，緣來則聚，緣去則散。",
      wealth: "學會分散投資，保本為先，防範風險。",
      health: "保持生活平衡，勞逸結合，身心健康最重要。",
    },
    yi: ["知足常樂", "適可而止"],
    ji: ["貪得無厭", "強求不放"],
    zen: "知足者常樂，能忍者自安。",
  },
  "guanyin:28": {
    name: "七仙女下凡",
    poem: ["瑤池仙境降凡塵", "紅線牽就有緣人", "天上人間情相牽", "鵲橋相會共月明"],
    plain:
      "上吉，如七仙女與董永的天仙緣分。有美好的緣分正在向你靠近，無論是感情還是事業，都有意想不到的驚喜等待著你。",
    interpretation: {
      career: "有貴人從天而降，重要機遇正在接近，保持開放的心態。",
      love: "天作之合的緣分來臨，單身者有望覓得良緣。",
      wealth: "意外財運臨門，天降橫財，好好把握。",
      health: "如沐春風，身心愉悅，健康狀態極佳。",
    },
    yi: ["主動結緣", "把握機會"],
    ji: ["錯過良緣", "自我封閉"],
    zen: "有緣千里來相會，無緣對面不相識。",
  },
  "guanyin:29": {
    name: "文天祥就義",
    poem: ["人生自古誰無死", "留取丹心照汗青", "乾坤未變英雄志", "千載高風此可憑"],
    plain:
      "中平之籤，如文天祥寧死不屈。當前處境艱難，但正義和道德是你的底氣，堅守本心比任何時候都更需要勇氣。",
    interpretation: {
      career: "遭遇職場困境，保持正直，不妥協於不公正，終將贏得尊重。",
      love: "感情面臨考驗，忠誠是最好的回答。",
      wealth: "財運遇阻，守住本金，以誠信為本，不可走捷徑。",
      health: "精神狀態需要調整，適當排解壓力。",
    },
    yi: ["堅守原則", "誠信處世"],
    ji: ["屈從壓力", "出賣良心"],
    zen: "威武不能屈，貧賤不能移，此丈夫之志。",
  },
  "guanyin:30": {
    name: "王昭君出塞",
    poem: ["塞外風沙路漫漫", "離鄉背井為和平", "他日功成榮歸處", "杏花春雨滿江南"],
    plain:
      "中吉，如昭君出塞。當前可能需要做出犧牲或妥協，暫時的委屈是為了更大的目標，堅守本心終會守得雲開。",
    interpretation: {
      career: "可能面臨調動或變化，雖有不適，但長遠來看是好機會。",
      love: "感情中可能需要一方作出讓步，理解包容，關係更加牢固。",
      wealth: "近期財運有小波折，保持冷靜，轉機即在眼前。",
      health: "注意適應環境變化，防止感冒。",
    },
    yi: ["以大局為重", "適應變化"],
    ji: ["自憐自艾", "拒絕改變"],
    zen: "犧牲小我，成就大愛，功德自來。",
  },
};
