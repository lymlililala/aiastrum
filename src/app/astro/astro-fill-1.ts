// ===== 星盘解析 · 翻译填充层 1（en + tw）=====
// key 严格使用 astro-data.ts 的英文 id / 宫位编号；不翻译 key。
// en = 标准英文占星术语 + 自然英文长文案；tw = 台湾繁体占星词汇。
// 覆盖 astro-data.ts 中文源里出现的全部 key（每张表各 12/10/5/12）。

import type { ZodiacSign, Planet, AspectType } from "./astro-data";

// ─── 星座名 ───────────────────────────────────────────────────
export const Z_NAME_EN: Partial<Record<ZodiacSign, string>> = {
  Aries: "Aries",
  Taurus: "Taurus",
  Gemini: "Gemini",
  Cancer: "Cancer",
  Leo: "Leo",
  Virgo: "Virgo",
  Libra: "Libra",
  Scorpio: "Scorpio",
  Sagittarius: "Sagittarius",
  Capricorn: "Capricorn",
  Aquarius: "Aquarius",
  Pisces: "Pisces",
};

export const Z_NAME_TW: Partial<Record<ZodiacSign, string>> = {
  Aries: "牡羊座",
  Taurus: "金牛座",
  Gemini: "雙子座",
  Cancer: "巨蟹座",
  Leo: "獅子座",
  Virgo: "處女座",
  Libra: "天秤座",
  Scorpio: "天蠍座",
  Sagittarius: "射手座",
  Capricorn: "摩羯座",
  Aquarius: "水瓶座",
  Pisces: "雙魚座",
};

// ─── 行星名 ───────────────────────────────────────────────────
export const P_NAME_EN: Partial<Record<Planet, string>> = {
  Sun: "Sun",
  Moon: "Moon",
  Mercury: "Mercury",
  Venus: "Venus",
  Mars: "Mars",
  Jupiter: "Jupiter",
  Saturn: "Saturn",
  Uranus: "Uranus",
  Neptune: "Neptune",
  Pluto: "Pluto",
};

export const P_NAME_TW: Partial<Record<Planet, string>> = {
  Sun: "太陽",
  Moon: "月亮",
  Mercury: "水星",
  Venus: "金星",
  Mars: "火星",
  Jupiter: "木星",
  Saturn: "土星",
  Uranus: "天王星",
  Neptune: "海王星",
  Pluto: "冥王星",
};

// ─── 行星「代表意义」 ────────────────────────────────────────
export const P_MEAN_EN: Partial<Record<Planet, string>> = {
  Sun: "Core self and life purpose; outward personality and life goals",
  Moon: "Inner emotions and sense of security; the subconscious and instinctive reactions",
  Mercury: "Mode of thinking and communication; learning and information-processing ability",
  Venus: "View of love and aesthetic taste; relationships and values",
  Mars: "Drive to act and the force of desire; competitive instinct and sexual energy",
  Jupiter: "Areas of expansion and luck; belief systems and philosophy of life",
  Saturn: "Lessons of challenge and growth; sense of responsibility and the boundaries of discipline",
  Uranus: "The urge to break through and innovate; independence and personal freedom",
  Neptune: "Dreams and spiritual longing; idealism and blurred boundaries",
  Pluto: "Deep transformation and issues of power; the force of death and rebirth",
};

export const P_MEAN_TW: Partial<Record<Planet, string>> = {
  Sun: "自我核心與人生追求，外在性格與生命目標",
  Moon: "內在情緒與安全感，潛意識與本能反應",
  Mercury: "思維方式與溝通模式，學習與資訊處理能力",
  Venus: "愛情觀與審美取向，人際關係與價值觀",
  Mars: "行動力與欲望驅動，競爭本能與性能量",
  Jupiter: "擴張與幸運領域，信念體系與哲學觀",
  Saturn: "挑戰與成長課題，責任感與紀律邊界",
  Uranus: "突破與革新衝動，獨立性與個人自由",
  Neptune: "夢境與靈性追求，理想主義與模糊邊界",
  Pluto: "深層轉化與權力議題，死亡與重生的力量",
};

// ─── 相位名 ───────────────────────────────────────────────────
export const A_NAME_EN: Partial<Record<AspectType, string>> = {
  conjunction: "Conjunction",
  sextile: "Sextile",
  square: "Square",
  trine: "Trine",
  opposition: "Opposition",
};

export const A_NAME_TW: Partial<Record<AspectType, string>> = {
  conjunction: "合相",
  sextile: "六分相",
  square: "四分相",
  trine: "三分相",
  opposition: "對分相",
};

// ─── 宫位「管辖领域」 ────────────────────────────────────────
export const HOUSE_EN: Partial<Record<number, string>> = {
  1: "Self & Appearance",
  2: "Wealth & Values",
  3: "Communication & Learning",
  4: "Home & Roots",
  5: "Creativity & Pleasure",
  6: "Work & Health",
  7: "Partnership & Cooperation",
  8: "Transformation & Shared Resources",
  9: "Philosophy & Long Journeys",
  10: "Career & Social Status",
  11: "Community & Ideals",
  12: "The Subconscious & Spirituality",
};

export const HOUSE_TW: Partial<Record<number, string>> = {
  1: "自我與外貌",
  2: "財富與價值觀",
  3: "溝通與學習",
  4: "家庭與根基",
  5: "創造與娛樂",
  6: "工作與健康",
  7: "伴侶與合作",
  8: "轉化與共有資產",
  9: "哲學與遠行",
  10: "事業與社會地位",
  11: "團體與理想",
  12: "潛意識與靈性",
};

// ─── 太阳星座解析 ────────────────────────────────────────────
export const SUN_EN: Partial<Record<ZodiacSign, string>> = {
  Aries:
    "You are a pioneer brimming with passion and courage. An Aries Sun gives you an innate drive to act—you tend to be the first to charge toward a goal, even when the path ahead is unknown. Your energy is like a flame that never goes out, inspiring everyone around you. Remember to find the balance between impulse and reflection; your resilience is more than enough to conquer any mountain.",
  Taurus:
    "You are a sensual pleasure-seeker rooted deep in the earth. A Taurus Sun gives you a natural appreciation for beautiful things, and your steadiness is a rock for those around you. You warm up slowly but stay loyal, and once you fix on a direction you cling to it stubbornly to the end. Your view of wealth is practical, yet you also know how to savor everything in life that brings delight.",
  Gemini:
    "You are a messenger of information, forever full of curiosity. A Gemini Sun gives you lightning-fast thinking and a gift for communication; your world is filled with endless possibilities. You live in several versions of yourself at once—flexible and ever-changing, but also easily distracted. Learn to focus, and your innate wit will carry you to something extraordinary.",
  Cancer:
    "You are a guardian who loves with all your heart. A Cancer Sun gives you keen intuition and deep empathy, along with a fierce urge to protect your family and the people you love. Your inner world is like the deep sea—rich and delicate in feeling. Learn to care for yourself even as you give to others; your tenderness is one of this world's most precious gifts.",
  Leo:
    "You are a born performer who shines on any stage. A Leo Sun gives you regal confidence and charisma; you long to be seen and recognized, and you turn that longing into genuine creativity. Generous and warm, you deserve to be loved. Remember that a true leader, while lighting the way for others, also allows their own light to be received.",
  Virgo:
    "You are a spirit of service in pursuit of perfection. A Virgo Sun gives you extraordinary analytical power and a sharp eye for detail; you always notice the problems others overlook. Your humility keeps you low-key, but your wisdom and capability are never absent. Learn to be gentle with yourself—you are already good enough, and you are getting better still.",
  Libra:
    "You are a born diplomat in pursuit of beauty and harmony. A Libra Sun gives you the art of turning conflict into cooperation, and the world through your eyes is full of beauty. You long for balance, for fair relationships, and to be liked by others. Learn to sometimes fight for yourself; your beautiful soul deserves to be taken seriously.",
  Scorpio:
    "You are an alchemist of the soul, unfathomably deep. A Scorpio Sun gives you the power to see through surfaces to the essence, with astonishing insight into the human heart. You have been through transformation and emerged stronger for it. Your feelings burn fierce and focused—learn to trust and to allow your vulnerability, for that is the deepest source of your power.",
  Sagittarius:
    "You are a life philosopher forever on the road. A Sagittarius Sun gives you an insatiable longing for freedom and truth, and your optimism is contagious to everyone around you. You love to explore—whether uncharted lands on the map or the boundless frontiers of thought. Remember to pause sometimes and put down deep roots.",
  Capricorn:
    "You are a strategist forever climbing toward the summit. A Capricorn Sun gives you formidable self-discipline and ambition, along with a clear-eyed plan for success and the resolve to execute it. Your achievements come from sweat, not luck. Remember to enjoy the scenery on the way up and allow yourself to be soft; the meaning of success is far more than the peak alone.",
  Aquarius:
    "You are an idealistic revolutionary walking ahead of your time. An Aquarius Sun gives you independent thought and a deep concern for the fate of humanity; you instinctively resist constraint and seek a fairer, freer world. Your uniqueness is your greatest gift. Learn to stay true to yourself within the crowd—changing the world begins with changing yourself.",
  Pisces:
    "You are a spiritual dreamer able to sense the subtle tremors of the universe. A Pisces Sun gives you boundless empathy and artistic inspiration, with the power to dissolve boundaries and feel everything. You are an artist, a healer, a watcher over the soul. Learn to set boundaries and protect that pure, sensitive heart—it is your most precious treasure.",
};

export const SUN_TW: Partial<Record<ZodiacSign, string>> = {
  Aries:
    "你是個充滿熱情與勇氣的開拓者。牡羊太陽賦予你天生的行動力，你習慣第一個衝向目標，哪怕前方未知。你的能量像一把永不熄滅的火焰，激勵著周圍的人。記得在衝動與思考之間尋找平衡，你的韌勁足以征服任何高山。",
  Taurus:
    "你是個深根於大地的感官享樂者。金牛太陽賦予你對美好事物天生的鑑賞力，你的穩定與踏實是周圍人的磐石。你慢熱卻忠誠，一旦認準了方向便會倔強地堅持到底。你的財富觀務實，卻也懂得欣賞生活中一切令人愉悅的事物。",
  Gemini:
    "你是一個永遠充滿好奇心的資訊使者。雙子太陽賦予你閃電般的思維與出色的溝通才華，你的世界充滿了無限可能性。你同時活在多個版本的自己之中，靈活多變卻也容易分心。學會專注，你天生的機智將成就你的非凡。",
  Cancer:
    "你是一個用情至深的守護者。巨蟹太陽賦予你高度的直覺力與共情能力，你對家庭與所愛之人有著濃厚的保護慾。你的內心如同深海，情感豐富而細膩。學會在付出的同時也好好照顧自己，你的溫柔是這個世界最珍貴的禮物。",
  Leo:
    "你是一個天生閃耀的舞台表演者。獅子太陽賦予你王者般的自信與感召力，你渴望被看見、被認可，並將這種渴望轉化為真實的創造力。你慷慨熱情，值得被愛。記住，真正的領袖在照亮別人的同時，也允許自己的光芒被接受。",
  Virgo:
    "你是一個追求完美的服務精靈。處女太陽賦予你超凡的分析能力與對細節的敏銳感知，你總能發現別人忽略的問題。你的謙遜讓你低調，但你的智慧與實力從不缺席。學會對自己溫柔，你已經足夠好，而且正在變得更好。",
  Libra:
    "你是一個追求美與和諧的天生外交家。天秤太陽賦予你將衝突轉化為合作的藝術，你眼中的世界充滿了美。你渴望平衡，渴望公平的關係，也渴望被他人喜愛。學會有時為自己而戰，你的美麗靈魂值得被認真對待。",
  Scorpio:
    "你是一個深不可測的靈魂煉金師。天蠍太陽賦予你穿透表象直達本質的能力，你對人心有著令人驚嘆的洞察。你經歷過蛻變，並因此變得更強大。你的情感熾烈而專注，學會信任，允許自己的脆弱，那是你最深的力量源泉。",
  Sagittarius:
    "你是一個永遠在路上的人生哲學家。射手太陽賦予你對自由與真理永不滿足的渴望，你的樂觀能感染身邊的每一個人。你熱愛探索，無論是地圖上未知的土地，還是思想領域的無疆邊際。記得有時停下腳步，深深扎根。",
  Capricorn:
    "你是一個不斷向山頂攀登的戰略家。摩羯太陽賦予你超強的自律與野心，你對成功有著清醒的規劃與堅定的執行力。你的成就來自汗水，而非運氣。記得在攀登的途中享受風景，允許自己柔軟，成功的意義遠不止於頂峰。",
  Aquarius:
    "你是一個走在時代前面的理想主義革命者。水瓶太陽賦予你獨立的思想與對人類命運的深刻關懷，你天生反抗束縛，追求更公平、更自由的世界。你的獨特性是你最大的禮物，學會在人群中保持本真，改變世界從改變你自己開始。",
  Pisces:
    "你是一個能感知宇宙微妙顫動的靈性夢想家。雙魚太陽賦予你無邊的同理心與藝術靈感，你擁有溶解邊界、感受一切的能力。你是藝術家、治癒者、心靈的守望者。學會設立邊界，保護好你那顆純淨敏感的心，那是你最珍貴的財富。",
};

// ─── 月亮星座解析 ────────────────────────────────────────────
export const MOON_EN: Partial<Record<ZodiacSign, string>> = {
  Aries:
    "Deep inside you lives a warrior ready to set out at any moment. An Aries Moon makes your emotions come fast and fade fast; you are not good at suppressing feelings and prefer to express them directly. Your inner security comes from action and a sense of control, and stagnation is your greatest source of emotional anxiety. You need to be allowed to be yourself, finding your own rhythm between independence and connection.",
  Taurus:
    "Your inner world is a calm and fertile field. A Taurus Moon makes you crave stability and sensory comfort—a good meal, a hug, a familiar melody can all settle your heart. Your moods shift slowly, but once touched they run deep. Material and environmental stability is the most important cornerstone of your sense of security.",
  Gemini:
    "Your inner world is always switching back and forth between two moods. A Gemini Moon makes you want to understand and process feelings through words; talking and exchanging ideas is your emotional outlet. You need mental stimulation to feel grounded, and monotony is your greatest emotional enemy. Learn to let a feeling linger in your heart for a moment rather than instantly turning it into words.",
  Cancer:
    "The Moon is your ruler, and you are naturally attuned to the world of emotion at the deepest level. Your feelings are fine as silk, and you are extremely sensitive to the emotional shifts of others. You long for deep emotional attachment and the warmth of home; your inner security comes from feeling needed and cared for. Learn to tell apart what is your own emotion and what is energy you have absorbed from your surroundings.",
  Leo:
    "Your heart needs the light of appreciation and love to shine on it. A Leo Moon makes you long to be seen and recognized; your expression needs a stage and your giving needs a response. When you feel overlooked, your emotions are wounded all the more. Remember, you already shine brilliantly on your own—you need not confirm your worth through the applause of others.",
  Virgo:
    "Your inner world is a precise instrument, orderly and forever self-examining. A Virgo Moon makes you feel your worth through serving others, and you are extremely sensitive to chaos and uncertainty. Anxiety often springs from variables you cannot control. Learn to offer more acceptance to yourself and to the world—perfection is not the only measure of security.",
  Libra:
    "Your heart longs for harmony and fears conflict and loneliness most of all. A Libra Moon makes you confirm your self-worth through important relationships, and your emotional state is closely tied to the quality of your intimate bonds. You are good at tending to others' feelings yet often suppress your own needs. Learn to write your own name onto the list of people you are willing to care for.",
  Scorpio:
    "Your inner world is a dark, bottomless sea. A Scorpio Moon makes your feelings extremely deep and intense—you feel more than anyone, and feel it more deeply than anyone. You long for soul-level connection and instinctively distrust surface relationships. Learn to open that door slowly; trust is the first step toward healing.",
  Sagittarius:
    "Your inner world is a vast plain forever yearning for the distance. A Sagittarius Moon nourishes your emotions through exploration and learning, and restriction and constraint are the greatest triggers of your moods. Your optimism and humor are natural gifts for regulating emotion. Allow yourself now and then to feel sadness and fragility—the feelings met on the road are part of the scenery too.",
  Capricorn:
    "Your inner world is a silent architect, self-controlled and disciplined. A Capricorn Moon makes you poor at expressing emotion, inclined to convert feelings into action and achievement. Your security comes from a sense of accomplishment and control over the future, and your emotional needs are often hidden very deep. Learn to allow yourself moments of fragility and a need to be cared for—that is not weakness, that is being human.",
  Aquarius:
    "Your inner world is a paradox that craves both freedom and understanding. An Aquarius Moon keeps you at a certain distance from emotion; you analyze feelings with reason, yet sometimes feel out of place. You long to find belonging within some unique group, yet fear losing yourself. Open the door to your feelings—your uniqueness itself is the bridge to deep connection with others.",
  Pisces:
    "Your heart is like a sponge, easily absorbing the emotions and energy of everyone around you. A Pisces Moon gives you profound compassion and spiritual perception; you find nourishment in art, music, and dreams. Your emotional boundaries are blurred and you are easily influenced by others. Please build yourself a small harbor—a private space that belongs to you alone, where you can recharge in quiet.",
};

export const MOON_TW: Partial<Record<ZodiacSign, string>> = {
  Aries:
    "你的內心深處住著一個隨時準備出發的勇士。牡羊月亮讓你的情緒來得快去得也快，你不善於壓抑感受，更傾向於直接表達。內在安全感來自行動與掌控感，停滯是你最大的情緒焦慮源。你需要被允許做自己，在獨立與連結之間找到屬於你的節奏。",
  Taurus:
    "你的內心是一片平靜而豐饒的田野。金牛月亮讓你渴望穩定與感官的慰藉，一頓美食、一個擁抱、一段熟悉的旋律，都能讓你內心平靜下來。你情緒變化緩慢，但一旦被觸動便十分深刻。物質與環境的穩定是你安全感最重要的基石。",
  Gemini:
    "你的內心世界總是在兩種情緒之間來回切換。雙子月亮讓你渴望用語言來理解和處理情感，傾訴與交流是你的情緒出口。你需要精神層面的刺激才能感到踏實，單調是你最大的情緒敵人。學會讓感受在心中停留片刻，而不是立刻將它轉化為文字。",
  Cancer:
    "月亮是你的守護星，你天生與情感世界深度契合。你的感受細膩如絲，對他人的情緒波動極為敏感。你渴望深度的情感依附與家庭的溫暖，內心安全感來自感覺被需要與被愛護。學會區分什麼是你自己的情緒，什麼是你吸收了周遭的能量。",
  Leo:
    "你的內心需要被欣賞與被愛的光照耀。獅子月亮讓你渴望被人看見與認可，你的表達需要一個舞台，你的付出需要一份回應。當你感到被忽視時，情緒會變得格外受傷。記住，你本身就已經光芒萬丈，不必透過他人的掌聲來確認自己的價值。",
  Virgo:
    "你的內心是一個井井有條、永遠在自我審視的精密儀器。處女月亮讓你通過服務他人來感受自己的價值，你對混亂與不確定極為敏感。焦慮常常源於那些無法控制的變量。學會對自己和這個世界多一些接納，完美並不是衡量安全感的唯一標準。",
  Libra:
    "你的內心渴望和諧，最害怕的是衝突與孤獨。天秤月亮讓你通過重要的關係來確認自我價值，你的情緒狀態與親密關係的質量息息相關。你善於照顧他人的感受，卻常常壓抑自己的需求。學會也把自己的名字寫進你願意照顧的人的名單裡。",
  Scorpio:
    "你的內心是一片深不見底的幽暗之海。天蠍月亮讓你的情感極度深沉而強烈，你感受到的比任何人都要多，也比任何人都要深。你渴望靈魂層面的深度聯結，對表面的關係有著本能的不信任。學會慢慢打開那扇門，信任是療癒的第一步。",
  Sagittarius:
    "你的內心是一片永遠嚮往遠方的廣闊原野。射手月亮讓你通過探索與學習獲得情感滋養，限制與束縛是你情緒的最大觸發點。你的樂觀與幽默感是你調節情緒的天然禮物。偶爾允許自己感受悲傷與脆弱，那些在路上的情緒也是風景的一部分。",
  Capricorn:
    "你的內心是一位克己自律的沉默建築師。摩羯月亮讓你不善表達情緒，傾向於將感受轉化為行動與成就。你的安全感來自成就感與對未來的掌控，情感上的需求往往被你藏得很深。學會允許自己也有脆弱和需要被照顧的時刻，那不是軟弱，那是人性。",
  Aquarius:
    "你的內心是一個渴望自由與被理解的矛盾體。水瓶月亮讓你對情感保持一定的距離感，你用理智分析情緒，卻有時感覺自己格格不入。你渴望在某個獨特的團體中找到歸屬，卻又害怕失去自我。讓自己打開感受的大門，你的獨特性本身就是你與他人深度聯結的橋樑。",
  Pisces:
    "你的內心如同海綿，能輕易吸收周圍所有人的情緒與能量。雙魚月亮賦予你深刻的同情心與靈性感知力，你在藝術、音樂與夢境中找到滋養。你的情緒邊界模糊，很容易被他人影響。請為自己建立一個小小的港灣，一個只屬於你自己、能安靜充電的私密空間。",
};

// ─── 上升星座解析 ────────────────────────────────────────────
export const RISE_EN: Partial<Record<ZodiacSign, string>> = {
  Aries:
    "The first impression you leave is full of energy, directness, and even a hint of edge. An Aries Rising makes you look forever in motion, full of passion and power. You are the kind of person who can instantly energize a room. People's first read of you is usually: straightforward, driven, and decisive.",
  Taurus:
    "Your first impression is reliable, composed, and comforting. A Taurus Rising lends your appearance a grounded kind of beauty, and your presence puts those around you at ease. You deal with people unhurried and calm, giving off a natural sense of taste and warmth.",
  Gemini:
    "Your first impression is clever, lively, curious, and highly approachable. A Gemini Rising keeps a spark of inquiry shining in your eyes; you are good at breaking the ice on first meeting and getting conversation flowing. People often find you young and full of vitality.",
  Cancer:
    "Your first impression is gentle, considerate, with a motherly warmth that embraces. A Cancer Rising gives your gaze a softness and depth, and you often make others feel accepted without even meaning to. There is a natural air of mystery about you, enchanting like moonlight.",
  Leo:
    "Your first impression is bright, confident, even dazzling. A Leo Rising gives you a born aura that draws the eye—wherever you appear, there is light. Your bearing carries a sense of nobility that makes people instinctively drawn to you, wanting to know you more.",
  Virgo:
    "Your first impression is tidy, proper, intelligent, and understated. A Virgo Rising lends your manner a refined restraint; you won't seize center stage, yet you are always the one people trust most. Your powers of observation let you see through details at a glance, which gives you a notable sense of depth.",
  Libra:
    "Your first impression is elegant, kind, lovely, and pleasing. A Libra Rising gives you natural diplomatic skill and a charming smile that makes others feel as if bathed in a spring breeze. You instinctively know how to make everyone feel valued, and your aesthetic taste often wins the admiration of those around you.",
  Scorpio:
    "Your first impression is deep, mysterious, with a magnetism impossible to ignore. A Scorpio Rising makes your gaze like a scanner, able to perceive others' true emotions in moments. People often regard you with both respect and wariness, yet cannot help being drawn to you. The energy you give off is a silent strength.",
  Sagittarius:
    "Your first impression is cheerful, sincere, with an exotic or adventurous air. A Sagittarius Rising gives you an easygoing sense that 'the whole world is my playground,' and your smile can light up a room. Your candor can sometimes surprise people, but your goodwill is always genuine and warm.",
  Capricorn:
    "Your first impression is mature, reliable, and weighty. A Capricorn Rising gives you a steadiness beyond your years—even when young you seem seasoned and composed. People look at you once and think: this person can be counted on. Your aura carries an unspoken sense of professionalism and authority.",
  Aquarius:
    "Your first impression is unique, avant-garde, even a little hard to pin down. An Aquarius Rising gives your manner a distinctive frequency; you always seem different—not by deliberate effort, but as your very nature. People find you smart and special, sometimes hard to fully draw close to.",
  Pisces:
    "Your first impression is dreamlike, carrying an indescribable spiritual quality. A Pisces Rising lends your manner the romance of an artist and the sensitivity of a medium; your gaze sometimes makes people feel you are looking into another world. People often find you gentle and mysterious, like a poem that can never be finished.",
};

export const RISE_TW: Partial<Record<ZodiacSign, string>> = {
  Aries:
    "你給人留下的第一印象充滿活力、直接、甚至帶著一絲鋒芒。牡羊上升讓你看起來永遠在行動，充滿熱情且充滿力量。你是那種能瞬間激活房間氛圍的人。人們對你的第一印象往往是：直率、有衝勁、有主見。",
  Taurus:
    "你給人的第一印象是可靠、沉穩而令人感到舒適。金牛上升為你的外表帶來一種踏實的美感，你的存在讓周圍的人感到安心。你待人接物不急不躁，散發出一種天然的品味與親切感。",
  Gemini:
    "你給人的第一印象是聰明、活潑、充滿好奇心且極具親和力。雙子上升讓你的眼神裡總是閃爍著求知的光芒，你善於在初見時打破冷場，讓對話流動起來。人們往往覺得你年輕而充滿活力。",
  Cancer:
    "你給人的第一印象是溫柔、體貼、帶著一種母性的包容感。巨蟹上升讓你的眼神柔軟而有深度，你往往在不經意間就讓對方感到被接納。你的氣質中帶著一絲天然的神秘感，如同月光一般令人著迷。",
  Leo:
    "你給人的第一印象明亮、自信，甚至有些奪目。獅子上升讓你天生擁有吸引目光的氣場，你出現在哪裡，哪裡便有光。你的儀態舉止自帶一種尊貴感，讓人不自覺地被你吸引，想要了解你更多。",
  Virgo:
    "你給人的第一印象是整潔、得體、聰明而低調。處女上升讓你的氣質中帶著一種精緻的克制感，你不會主動佔據舞台中央，卻總是最讓人信賴的那個人。你的觀察力讓你一眼看穿細節，這讓你顯得格外有深度。",
  Libra:
    "你給人的第一印象是優雅、和善、美好而令人愉悅。天秤上升賦予你天生的外交能力與迷人的笑容，你讓人感到如沐春風。你天然地懂得如何讓每個人都感到被重視，你的審美趣味往往令周圍人嘆服。",
  Scorpio:
    "你給人的第一印象深邃、神秘，帶著一股難以忽視的磁性。天蠍上升讓你的眼神如同掃描儀，能在短時間內洞察他人的真實情緒。人們對你往往又敬又怕，卻無法不被你吸引。你散發出的能量是無聲的強大。",
  Sagittarius:
    "你給人的第一印象開朗、真誠、充滿異域風情或冒險氣息。射手上升讓你總是帶著一種「整個世界都是我的操場」的豁達感，你笑起來能點亮房間。你的坦率有時令人意外，但你的善意總是真實而溫暖。",
  Capricorn:
    "你給人的第一印象是成熟、可靠、有分量。摩羯上升賦予你一種超越年齡的穩重氣質，即便在年輕時也顯得老成持重。人們第一眼看到你便覺得：這個人靠得住。你的氣場中帶著一種不言而喻的專業感與權威感。",
  Aquarius:
    "你給人的第一印象獨特、前衛，甚至有些難以捉摸。水瓶上升讓你的氣質中帶著一股獨特的頻率，你似乎總是與眾不同，這不是刻意為之，而是你本身的底色。人們覺得你聰明、特別，有時令人難以完全靠近。",
  Pisces:
    "你給人的第一印象如夢如幻，帶著一種難以言說的靈氣。雙魚上升讓你的氣質中帶著藝術家的浪漫與靈媒的敏感，你的眼神有時讓人感覺你正在看著另一個世界。人們常覺得你溫柔、神秘，像一首寫不完的詩。",
};
