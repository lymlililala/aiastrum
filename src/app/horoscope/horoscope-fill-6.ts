import type { ZodiacId, TimePeriod } from "./horoscope-data";

type T = Partial<Record<ZodiacId, Partial<Record<TimePeriod, string[][]>>>>;
type Ti = Partial<Record<ZodiacId, Partial<Record<TimePeriod, string[]>>>>;

export const EN_TEMPLATES_6: T = {
  aquarius: {
    today: [
      [
        "Today Uranus's transformative energy surges through you, and Aquarius's innovative thinking reaches its peak. An idea that breaks the mold could open up an entirely new chapter for you. Don't be afraid to be different—your unique perspective is your greatest advantage today. Trust your intuition; it comes from a higher dimension of wisdom.",
        "In love today, you need to balance independence with intimacy. Your need for space can leave your partner puzzled, but once your sincerity and deep affection show, they are utterly captivating. Singles may spark love today through a meeting of minds.",
        "At work today, creativity flows freely, making it ideal for brainstorming and innovative projects. That seemingly \"crazy\" idea you propose may be exactly the key to breaking through a bottleneck.",
        "Your finances bring a pleasant surprise today, possibly from returns on tech or innovation-related investments. Aquarius's instincts in emerging fields are always ahead of the curve.",
        "Today, take care of your calves and circulatory system. Avoid standing or sitting for too long, and move regularly to promote blood flow.",
      ],
      [
        "Today the universe brings you an opportunity tied to humanitarian or social causes, and Aquarius's idealism finds a practical outlet. By taking part, your unique contribution will bring real help to others while giving you deep inner fulfillment.",
        "In love today, your tolerance and unique charm draw like-minded people to you. There's no need to cater to mainstream tastes—being your most authentic self is your greatest appeal. Soulmates often appear when you are most relaxed.",
        "At work today, your forward-thinking mind lets you see trends and opportunities others overlook. Share your insights—they will bring tremendous value to your team.",
        "Your finances favor exploring new ways to manage money today. Cryptocurrency, green funds, or tech-innovation investments all fall within your lucky range.",
        "Today is a good day to try a cutting-edge form of exercise. VR fitness or aerial yoga are the kinds of choices that appeal to an Aquarius.",
      ],
      [
        "Today is a great time for Aquarius to recharge. In solitude, you can best hear the voice deep within. There's no need to follow the crowd—your own rhythm is the best rhythm. Give yourself some quiet creative time, and inspiration will arrive when you least expect it.",
        "In love today, stay open and curious. An unexpected conversation or encounter may give you a whole new understanding of someone. Aquarius's relationships often begin with a meeting of minds.",
        "At work today, it's a good time for future planning and trend analysis—your foresight is especially clear. Write your ideas down; they will prove very useful in the near future.",
        "Your finances are steady today, making it a good time to take stock of and organize your digital assets. Aquarius's sensitivity to the digital world is a unique financial advantage.",
        "Today is a good day to schedule a tech detox—step away from electronic devices and rediscover inner calm in nature.",
      ],
    ],
    tomorrow: [
      [
        "Tomorrow Uranus brings an opportunity that breaks from routine. An unexpected change may disrupt your plans, but what Aquarius does best is find order within chaos. Use your innovative thinking to rearrange the pieces, and you'll find that this change is actually a wonderful opportunity.",
        "Tomorrow's love fortune is full of surprises. An unconventional move may make your partner's eyes light up. Aquarius's love needs no tricks—sincerity and creativity are the best strategy.",
        "Tomorrow at work, a problem requiring an innovative solution arises, and this is your moment to shine. Don't take the usual route—your unconventional approach is often the most efficient.",
        "Tomorrow's finances fluctuate but lean upward, making it suitable for small trial investments in tech or innovation. Stay curious but avoid impulsiveness.",
        "Tomorrow, focus on relaxing your nervous system. Meditation or mindfulness practice helps calm an overactive mind.",
      ],
      [
        "Tomorrow is a good day for socializing and teamwork. Aquarius's sense of community and coordination skills bring their greatest value tomorrow. You can find wonderful connection points between different people and viewpoints, creating solutions that benefit everyone.",
        "Tomorrow in love, an interaction during a group activity may help you discover a new shared interest. Joining the same community or interest group together is a great way to deepen your bond.",
        "Tomorrow at work, your cross-disciplinary perspective solves a problem that has long troubled the team, and this unique value makes you irreplaceable in the organization.",
        "Tomorrow is suitable for crowdfunding or community investment—Aquarius's collective wisdom is equally effective in financial decisions.",
        "Tomorrow, stay well hydrated. When socially active, Aquarius tends to forget their body's basic needs.",
      ],
      [
        "Tomorrow is a good day to inject some fresh elements into your life and work. Doing everyday things a different way may bring unexpected efficiency and joy. Aquarius's creativity doesn't need a grand stage—small daily innovations are just as wonderful.",
        "Tomorrow in love, a sincere act of sharing—your thoughts, your dreams—will let your partner see a more three-dimensional you. This authenticity is more appealing than any perfect disguise.",
        "Tomorrow at work, use your knack for systematic thinking to optimize an inefficient process. Your improvement plan may be widely adopted, benefiting many more people.",
        "Tomorrow is suitable for clearing out subscriptions or digital assets you no longer use. Digital decluttering is also a form of money management for Aquarius.",
        "Tomorrow, listen to white noise or natural sounds before bed to help an overactive mind settle into rest.",
      ],
    ],
    week: [
      [
        "This week, Aquarius's fortune is full of innovation and breakthrough energy. Uranus brings you several flashes of inspiration—catch them in time and put them into action. Early in the week you may face a challenge that requires breaking with convention; midweek your innovative plan wins recognition; the weekend is good for reflection and integration. This week belongs to the pioneer who dares to be different.",
        "This week's love fortune is unique and interesting. Those in relationships discover new sides of each other while trying new things; singles have a very high chance of an encounter this week in unconventional social settings or online communities, and a resonance of ideas is the best way to begin a relationship.",
        "This week at work, your innovative thinking is your greatest weapon. An unconventional plan you propose proves to be the key to solving a problem midweek. Don't be afraid to voice differing opinions—the truth often lies with the minority.",
        "This week your finances get a special boost in tech and innovation, but impulse spending is also likely. Stick to the principle of \"research first, then act.\"",
        "This week, take care of your nervous system and avoid overworking your brain. Have at least one screen-free period each day to let your brain truly rest.",
      ],
      [
        "This week, Aquarius finds a wonderful balance between solitude and socializing. You discover that high-quality solitude gives your social life more depth, while effective socializing provides inspiration for your solitary creative time. This week is good for joining a new community or launching an interesting project.",
        "This week's love fortune is gentle and sweet—a like-minded person enters your life. You may resonate over a social issue you both care about, which is the most beautiful start to an Aquarius-style romance.",
        "This week at work, your systematic thinking and creativity produce results that amaze your team, and your irreplaceability is fully demonstrated this week.",
        "This week your finances have a unique advantage in the community economy and monetizing knowledge. The expertise and unique perspective you've accumulated are assets that can be turned into income.",
        "This week is a good time to try a new form of exercise or wellness practice. Aquarius's openness to new things means you can always find the most cutting-edge health solution.",
      ],
      [
        "This week, Aquarius enters an important period of cognitive upgrade. A chance reading or conversation may change the way you see a certain issue. Keep an open learning mindset—the new understanding you gain this week will have a far-reaching impact in the future.",
        "This week in love, you and your partner deepen your understanding and rapport while exploring a new field together. Learning a new skill or taking part in a new activity together is the best relationship investment this week.",
        "This week at work, your foresight and creativity make your leader realize that you're not just an executor but a strategic thinker. A task requiring forward-looking judgment may land in your hands.",
        "This week your finances have unique opportunities in emerging fields, but you need to research thoroughly before acting. Aquarius's curiosity is an advantage, but investing requires more rational analysis.",
        "This week, the focus of health management is mental relaxation. The Aquarius brain needs regular \"downtime\" to restore creativity. Schedule some unplanned free time.",
      ],
    ],
    month: [
      [
        "This month, Aquarius's overall fortune moves toward a high point through innovation and breakthrough. Uranus's transformative energy drives you to break through in multiple areas. Early in the month is good for organizing your thoughts and defining your direction for innovation; midmonth, push forward at full force as your unconventional plans shine; at month's end, reap your results and plan the next step. This month belongs to the disruptor who dares to transform.",
        "This month's love fortune is unique and profound. Early in the month a meeting of minds may open a promising relationship; midmonth, love warms through shared ideals; at month's end, your relationship transcends traditional models and establishes a unique way of being together that belongs to you both.",
        "This month, your career fortune enters a burst of innovation. Your avant-garde ideas and systematic thinking win recognition from an important figure in the middle of the month, and an innovative collaboration opportunity or project may appear at this time. Boldly show how you're different—this is exactly when you're most needed.",
        "This month your finances have a unique advantage in tech and innovation. Income from intellectual property or creative monetization may arrive this month. Month's end is good for a thorough digitization of your assets.",
        "This month, your health fortune is generally good, but pay attention to balance on the mental level. Aquarius tends to overspend brainpower in moments of excitement; learning to rest proactively at your peak is a more advanced form of creativity management.",
      ],
      [
        "This month, Aquarius experiences an important expansion of life's horizons. The field you focus on undergoes major changes this month, and your foresight lets you seize the initiative amid the change. Don't doubt your judgment—your vision is being verified by time, one piece at a time.",
        "This month in love, you form a deep connection with a unique and interesting person. Your relationship doesn't follow the usual path but is utterly real. Aquarius's happiness doesn't need others' understanding—only mutual resonance.",
        "This month, your career may present an opportunity to cross fields or pivot, and your diverse abilities show their greatest value at such moments. Don't be bound by past identity labels—the essence of Aquarius is to transcend definition.",
        "This month, the keyword for your finances is diversification. Spread your investments across different fields and asset types; Aquarius's breadth of thinking is a natural advantage in asset allocation.",
        "This month, mind the balance between socializing and solitude. Over-socializing drains your creativity, while excessive solitude may trap you in a whirlpool of thought. Find the golden ratio that's right for you.",
      ],
      [
        "This month, Aquarius finds the most touching balance point at the intersection of ideals and reality. You discover that true innovation isn't about detaching from reality but about responding to reality's needs in a better way. This realization will make all your actions this month more precise and powerful.",
        "This month in love, you and your partner build a deeper connection supported by shared ideals. You're not just lovers but comrades changing the world together. This soul-level partnership is the most enviable of all.",
        "This month at work, your innovative plan is adopted and begins to produce real results. The whole journey from concept to execution proves that your value lies not only in being able to think it up, but in being able to make it happen.",
        "This month is a good time to monetize a unique skill or piece of knowledge you have. The professional insight Aquarius has accumulated is an asset others are willing to pay for. Boldly take the first step into knowledge entrepreneurship.",
        "This month, health management calls for attention to your circulatory system and legs. Do exercises that promote blood flow regularly, keeping your body fluid and flexible.",
      ],
    ],
  },
  pisces: {
    today: [
      [
        "Today Neptune's dreamy energy envelops you, and Pisces's intuition and artistic perception reach their peak. Your soul is like a boundless ocean, embracing all the joys and sorrows of the world. Today is a good day to listen to your inner voice—it will guide you to the truest answers. Trust your feelings; they are closer to the truth than logic.",
        "In love today, you are full of tenderness and romance, and your empathy makes your partner feel deeply understood and accepted. Those in relationships should arrange a romantic time full of ritual today; for singles, your artistic aura is especially captivating, and an encounter at an art gallery or musical venue may begin a beautiful story.",
        "At work today, your creativity and sensitivity are your most powerful tools, especially for tasks that require aesthetics or human warmth. Your proposal may not be as data-rich as others', but its warmth and depth are irreplaceable.",
        "Your finances are steady with a small surprise today, possibly from artistic creation or spiritual pursuits. Pisces needs to show restraint with emotional spending—avoid over-shopping driven by mood today.",
        "Today, take care of your feet and lymphatic system. A foot soak or foot massage is the best way to relax. Use aromatherapy with essential oils before bed to help reach deep sleep.",
      ],
      [
        "Today Pisces is like a fish in water—anything related to water, art, or spirituality is your lucky domain. The universe especially favors your inner world today; a meditation, a piece of music, or a painting may all bring profound insight.",
        "In love today, your gentle power awakens, and a thoughtful gesture will deeply move those around you. Pisces's love is the most unconditional, and this purity is especially infectious today.",
        "At work today, it's a good time for creative output. Inspiration flows from you as naturally as spring water—seize this heaven-sent creative state.",
        "Your finances today favor attention to investments related to art, music, or charity—Pisces's intuition is especially accurate in these areas.",
        "Today, a walk by the water or a swim is the best exercise choice. The water element replenishes the energy Pisces needs most.",
      ],
      [
        "Today is a good time for Pisces to converse with your inner world. In the quiet, you will hear the whispers from the depths of your soul. There's no need to seek answers outside—you already know what to do in your heart. Give yourself uninterrupted time and space, and let your intuition flow freely.",
        "In love today, companionship is like a warm tide—no words are needed, for a hug or holding hands is enough to convey all your deep affection. Pisces's wordless love is the most touching language of all.",
        "At work today, it's suitable for tasks that require delicate sensitivity—your sensitivity is a gift rather than a burden today. Use this delicacy to perfect every detail of your work.",
        "Your finances today favor stillness over action—simply maintain your current money-management strategy. Today's intuition may be disturbed by emotions, so postpone major financial decisions.",
        "Today is a good day for a deep meditation or spiritual practice to help you find an anchor of inner calm amid a chaotic world.",
      ],
    ],
    tomorrow: [
      [
        "Tomorrow Neptune brings you a night flooded with inspiration, and your dreams may hold important information or ideas. Record your dreams the moment you wake in the morning—they may become the key clue to solving your problem.",
        "Tomorrow's love fortune is dreamlike, as a romantic encounter or a soul-connecting conversation warms your relationship. Pisces's love stories are often more wonderful than movies, because your sensitivity is the most genuine protagonist.",
        "Tomorrow at work, a task requiring creativity and empathy falls on your shoulders, and this is exactly the field where you shine. Complete it in your own way, and the result will exceed everyone's expectations.",
        "Tomorrow's finances favor spending and investing related to art or spirituality. The return on a painting, an instrument, or a spiritual course may go beyond the financial level.",
        "Tomorrow, make sure to get enough sleep. The inspiration and recovery Pisces gains in sleep are unmatched by other signs.",
      ],
      [
        "Tomorrow is a day full of gentle power. Your empathy is especially strong tomorrow, sensing the emotions and needs of those around you. Use this gift to warm others, but remember to warm yourself too. Pisces's greatest challenge is learning to find balance between giving and receiving.",
        "Tomorrow in love, a deep exchange brings your hearts closer together. Your listening and understanding are exactly the comfort your partner needs. Pisces is a born emotional healer.",
        "Tomorrow at work, your intuition helps you avoid a potential pitfall—while others are still completely unaware, you've quietly adjusted course. This keen sense is the most underrated ability of Pisces in the workplace.",
        "Tomorrow is suitable for making a spending decision that combines feeling with reason, satisfying your soul's needs while also considering practical value.",
        "Tomorrow favors water exercise—swimming or aqua yoga is the best way for Pisces to tune body and mind.",
      ],
      [
        "Tomorrow is a good day to schedule some \"purposeless\" time—wandering aimlessly, daydreaming, or doodling, letting your mind flow freely without pressure. Pisces's best ideas are often born in this relaxed state.",
        "Tomorrow in love, a small expression of affection—a song, a little painting, or a few handwritten words—will move your partner for a long time. Pisces's romance needs no lavish stage, only a sincere heart.",
        "Tomorrow at work, use your artistic sense to refine a report or presentation. The boost of visual and emotional appeal will make your professional content more persuasive.",
        "Tomorrow is suitable for organizing personal collections or digital assets. Pisces tends to hoard items driven by emotion, so regular decluttering is necessary.",
        "Tomorrow, play the sound of ocean waves or rain before bed—this kind of natural white noise noticeably improves Pisces's sleep quality.",
      ],
    ],
    week: [
      [
        "This week, Pisces's fortune is like a beautiful poem, as Neptune's dreamy energy gilds your life with a poetic glow. Early in the week, listen to your inner voice; midweek, creativity and inspiration burst forth; the weekend is good for returning to calm and digesting the week's insights. The core word this week is \"feel\"—let your heart lead you forward.",
        "This week's love fortune is romantic and profound. Those in relationships deepen their soul-level connection through shared wonderful experiences; singles have a great chance of an encounter this week in artistic or spiritual settings, where your tenderness and artistic aura are the most touching attraction.",
        "This week at work, your creativity and sensitivity produce results full of warmth and depth, and you may receive important recognition in the creative field midweek. Your plan may not be the most efficient, but it is sure to be the most heart-touching.",
        "This week your finances get a special boost in art and spirituality, but you're also prone to overspending from emotional purchases. Set an emotional-spending budget and feel freely within it.",
        "This week, take care of your feet and immune system. A foot soak and adequate sleep are the best daily care. Increase your intake of vitamin C and zinc.",
      ],
      [
        "This week, Pisces finds the most beautiful scenery at the intersection of dreams and reality. Your inspiration surges like a tide this week—catch it in time and record and express it in the way you love. This week is good for starting a creative project or artistic work; your sensitivity reaches a creative peak this week.",
        "This week's love fortune is like a tender love song, as you and your partner feel deep affection in the warm details of daily life. Cooking a meal, watching a sunset, or listening to a song together—these simple joys are the love Pisces longs for most.",
        "This week at work, your artistic sense and empathy bring irreplaceable value to the team. A project that needs warmth and depth is handed to you this week, and this is the field you're best at.",
        "This week your finances have opportunities in monetizing knowledge and creative income. Your writing, painting, or music may gain recognition and reward this week. Believe that your art has value.",
        "This week, the focus of health management is emotional regulation. Pisces's physical state is directly tied to emotions. Find an emotional outlet that suits you—journaling, painting, or talking with someone you trust.",
      ],
      [
        "This week, Pisces enters an important period of spiritual awakening. Your understanding of life and the universe reaches a new depth this week. A profound meditation experience, a heart-stirring book, or a deep conversation may all become the catalyst for awakening. This spiritual growth will profoundly influence your future choices and direction.",
        "This week in love, your soul-level connection with your partner grows deeper. You may share a heart-touching moment together—watching a moving performance or taking part in volunteer work. This resonance goes beyond words; it is the deepest love.",
        "This week at work, your intuition helps you make several precise judgments, and colleagues begin to realize that your \"sixth sense\" is a real workplace advantage. Support your intuition with more facts to make it even more persuasive.",
        "This week your finances are steady, making it suitable to save up for future art investments or spiritual learning. Pisces's financial growth may not be as rapid as other signs', but your investments are always the most warm and meaningful.",
        "This week is a good time to spend the weekend by the water or in nature. Nature is the best healer and source of inspiration for Pisces.",
      ],
    ],
    month: [
      [
        "This month, Pisces's overall fortune is as dreamlike as a poem and as moving as a song, for Neptune has woven you a month full of inspiration and love. Early in the month is good for immersing yourself in creation and feeling; midmonth, inspiration and opportunity burst forth at once—this is the high point of the month; at month's end, reap your results and return to inner calm. This month belongs to the dreamer with a free soul.",
        "This month's love fortune is tender and profound. Early in the month, a soul-level conversation makes you both more certain; midmonth, romance reaches its peak and may be the sweetest time of the month; at month's end, your relationship has transcended form and entered the purest companionship of souls. This month, Pisces is the one who understands love most among the twelve signs.",
        "This month, your career fortune shines in the creative and humanistic fields. In the middle of the month, a project or collaboration opportunity related to art, culture, or healing appears—this is exactly the field where you can best use your gifts. Create with your sensitivity, and the work will speak for itself.",
        "This month your finances have unique opportunities in art and spirituality. Your creative work or spiritual services may gain unexpected market recognition. Month's end is good for a soulful financial review, letting money serve your spiritual growth.",
        "This month, your health fortune needs special attention to mental health. Pisces has the most delicate and sensitive mind, so this month is good for starting a regular meditation or yoga practice to build a safe harbor for your soul. Don't neglect foot care either—a daily foot soak is the best ritual of self-care.",
      ],
      [
        "This month, Pisces welcomes a golden month of creation and inspiration. Your artistic perception and empathy both reach their yearly peak, and any field that requires creativity and warmth is your home turf. Don't hesitate—express the poetry and beauty in your heart, for the world needs your voice.",
        "This month in love, you build a soul connection with someone equally tender and profound. Your meeting feels like a script fate wrote long ago. Cherish this bond and nurture it with all your sincerity and tenderness.",
        "This month, your career sees a delightful turning point, as a role or project requiring artistic sense and humanistic care opens its doors to your talent. Don't doubt yourself—your sensitivity is the rarest professional ability.",
        "This month your finances have unique opportunities in the creative economy and experience economy. The experiences you design, the content you create, or the emotional services you provide can all be monetized. Boldly put a price on your talent.",
        "This month, mind keeping indoor air circulating and humidity moderate. Pisces is especially sensitive to environmental atmosphere, and a comfortable space boosts physical and mental health more effectively than any medicine.",
      ],
      [
        "This month, Pisces reaches new heights in the fusion of feeling and reason. You begin to understand that true romance isn't about escaping reality but about still choosing to respond with love after seeing reality clearly. This clear-eyed tenderness is the most touching power of the month and the firmest foundation for your future.",
        "This month in love, after going through a deep journey of the soul together, you and your partner build a profound connection that transcends worldly definitions. Your love isn't a fairy tale but the most beautiful companionship of two souls in the real world.",
        "This month at work, your work or proposal gains wide recognition, as people are moved by the warmth and sincerity you convey. This proves one thing: in an era that chases efficiency, what's rarest is precisely sensitivity—and this is Pisces's never-ending wealth.",
        "This month is a good time for a soulful optimization of your investment portfolio—on a rational basis, add your intuitive judgment about future trends. Pisces's intuition in investing often catches the wind earlier than data analysis.",
        "This month, the core of health management is finding a way to exercise that unites body and mind. Tai chi, yoga, or water exercise are all Pisces's chosen activities. Let your body and soul flow at the same rhythm—this is the most natural and healthy state for Pisces.",
      ],
    ],
  },
};

export const TW_TEMPLATES_6: T = {
  aquarius: {
    today: [
      [
        "今日天王星的變革能量在你體內湧動，水瓶座的創新思維在今日達到巔峰。一個打破常規的想法可能為你開啟全新的局面，不要害怕與眾不同，你的獨特視角正是今日最大的優勢。相信你的直覺，它來自更高維度的智慧。",
        "感情上今日需要平衡獨立與親密，你的空間感讓對方有些捉摸不透，但你的真誠和深情一旦展現便無比動人。單身者今日在一次思想碰撞中可能擦出愛的火花。",
        "工作中今日創意泉湧，特別適合腦力激盪和創新專案。你提出的那個看似「瘋狂」的想法可能正是突破瓶頸的關鍵。",
        "財運今日有意外之喜，可能來自科技或創新領域的投資回報。水瓶座在新興領域的直覺一向超前。",
        "今日注意小腿和循環系統的保養，避免久站或久坐，定時活動促進血液循環。",
      ],
      [
        "今日宇宙為你帶來一次與人道主義或社會公益相關的機會，水瓶座的理想主義在今日找到實際落地的出口。參與其中，你的獨特貢獻將為他人帶來真實的幫助，也讓你的內心獲得深層的滿足。",
        "感情上今日你的包容和獨特魅力吸引著志同道合的人，不需要刻意迎合主流審美，做最真實的自己就是最大的吸引力。靈魂伴侶往往出現在你最放鬆的時候。",
        "工作中今日你的前瞻性思維讓你看到別人忽視的趨勢和機會，把你的洞察分享出來，它會為團隊帶來巨大價值。",
        "財運今日適合探索新型理財方式，數位貨幣、環保基金或科技創新投資都在你的幸運範圍內。",
        "今日適合嘗試一種前衛的運動方式，VR健身或空中瑜伽都是水瓶座會感興趣的選擇。",
      ],
      [
        "今日是水瓶座為自己充電的好時機，在獨處中你最能聽到內心深處的聲音。不必隨波逐流，你的節奏就是最好的節奏。給自己一段安靜的創造時間，靈感會在不經意間降臨。",
        "感情上今日保持開放和好奇，一次意外的對話或相遇可能讓你對某人有全新的認識。水瓶座的感情往往始於思想的碰撞。",
        "工作中今日適合做未來規劃和趨勢分析，你的遠見在今日特別清晰。把你的想法記錄下來，它們在不久的將來會派上大用場。",
        "財運今日平穩，適合做一次數位資產的盤點和整理。水瓶座對數位世界的敏感度是理財的獨特優勢。",
        "今日適合給自己安排一段科技排毒時間，遠離電子設備，在自然中找回內心的寧靜。",
      ],
    ],
    tomorrow: [
      [
        "明日天王星帶來一次打破常規的機遇，一個出乎意料的變化可能打亂你的計畫，但水瓶座最擅長的就是在混亂中找到秩序。用你的創新思維重新排列組合，你會發現這個變化其實是一個絕佳的機會。",
        "明日感情運勢充滿驚喜，一次不按常理出牌的舉動可能讓對方眼前一亮。水瓶座的愛情不需要套路，真誠和創意就是最好的策略。",
        "明日工作中一個需要創新解決方案的問題出現，這正是你大展身手的時刻。不要走尋常路，你的非常規方案往往是最高效的。",
        "明日財運有波動但偏向上行，適合在科技或創新領域做小額投資嘗試。保持好奇但不要衝動。",
        "明日注意神經系統的放鬆，冥想或正念練習有助於緩解過度活躍的大腦。",
      ],
      [
        "明日是一個適合社交和團隊協作的日子，水瓶座的群體意識和協調能力在明日發揮最大價值。你能在不同的人和觀點之間找到奇妙的連接點，創造出讓所有人受益的解決方案。",
        "明日感情上一次群體活動中的互動可能讓你們發現新的共同興趣，一起加入同一個社群或興趣小組是增進感情的好方式。",
        "明日職場上你的跨領域視角為團隊解決了長期困擾的難題，這種獨特的價值讓你在組織中不可取代。",
        "明日適合參與群眾募資或社群投資，水瓶座的群體智慧在財務決策中同樣有效。",
        "明日保持充足的水分攝取，水瓶座在社交活躍時容易忘記照顧身體的基本需求。",
      ],
      [
        "明日適合給自己的生活和工作中注入一些新鮮元素，換一種方式做日常的事，可能帶來意想不到的效率和樂趣。水瓶座的創造力不需要大舞台，日常小創新同樣精彩。",
        "明日感情上一次真誠的分享——你的想法、你的夢想——會讓對方看到一個更立體的你，這種真實比完美的偽裝更有吸引力。",
        "明日工作中用你擅長的系統化思維優化一個低效的流程，你的改進方案可能被廣泛採納，讓更多人受益。",
        "明日適合清理不再使用的訂閱服務或數位資產，數位斷捨離對水瓶座來說也是一種理財。",
        "明日睡前聽一段白噪音或自然聲音，幫助過度活躍的大腦進入休息狀態。",
      ],
    ],
    week: [
      [
        "本週水瓶座運勢充滿創新與突破的能量，天王星為你帶來多次靈光閃現的時刻，及時捕捉並付諸行動。週初可能遇到一個需要打破常規的挑戰；週中你的創新方案獲得認可；週末適合反思和整合。本週屬於敢於不同的先行者。",
        "本週感情運勢獨特而有趣，已戀愛者與伴侶在嘗試新事物的過程中發現彼此新的一面；單身者本週在非傳統社交場合或線上社群有極高的邂逅機率，思想的共鳴是開啟感情的最佳方式。",
        "本週職場上你的創新思維是最大的武器，一個你提出的非常規方案在週中被證明是解決問題的關鍵。不要害怕提出不同意見，真理往往掌握在少數人手中。",
        "本週財運在科技和創新領域有特別加持，但也容易出現衝動消費。堅持「先研究再出手」的原則。",
        "本週注意神經系統的保養，避免過度用腦。每天至少有一段無螢幕時間，讓大腦真正休息。",
      ],
      [
        "本週水瓶座在獨處與社交之間找到奇妙的平衡，你發現高品質的獨處能讓社交更有深度，而有效的社交又能為獨處時的創造提供靈感。本週適合加入一個新的社群或發起一個有趣的專案。",
        "本週感情運勢溫和而甜蜜，一個與你志同道合的人在本週走入你的生活。你們可能在一個共同關心的社會議題上產生共鳴，這是水瓶座式愛情最美好的開端。",
        "本週工作中你的系統思維和創新能力產出了一份讓團隊驚豔的成果，你的不可取代性在本週得到充分體現。",
        "本週財運在社群經濟和知識變現方面有獨特優勢，你累積的專業知識和獨特視角都是可以轉化為收入的資產。",
        "本週適合嘗試一種新型的運動或養生方式，水瓶座對新事物的接受度讓你總能找到最前沿的健康方案。",
      ],
      [
        "本週水瓶座迎來認知升級的重要時期，一次偶然的閱讀或對話可能改變你看待某個問題的方式。保持開放的學習心態，本週獲得的新認知將在未來產生深遠影響。",
        "本週感情上你和伴侶在共同探索新領域的過程中增進了理解和默契，一起學習新技能或參加新活動是本週最佳感情投資。",
        "本週職場上你的遠見和創新能力讓主管意識到你不僅是執行者，更是策略思考者。一個需要前瞻性判斷的任務可能交到你手上。",
        "本週財運在新興領域有獨特機會，但需要你深入研究後再行動。水瓶座的好奇心是優勢，但投資需要更多理性分析。",
        "本週健康管理的重點是精神放鬆，水瓶座的大腦需要定期的「空檔」來恢復創造力。安排一段無計畫的自由時間。",
      ],
    ],
    month: [
      [
        "本月水瓶座整體運勢在創新與突破中走向高光，天王星的變革能量推動你在多個領域實現突破。月初適合梳理思路和確定創新方向；月中全力推進，你的非常規方案將大放異彩；月末收穫成果並規劃下一步。本月屬於敢於顛覆的變革者。",
        "本月感情運勢獨特而深刻，月初一次思想碰撞可能開啟一段令人期待的感情；月中感情在共同理想中升溫；月末你們的感情將超越傳統模式，建立起屬於你們自己的獨特相處方式。",
        "本月職場運勢迎來創新爆發期，你的前衛想法和系統思維在月中旬得到重要人物的認可，一個創新的合作機會或專案可能在此時出現。大膽展示你的與眾不同，這正是你最被需要的時刻。",
        "本月財運在科技和創新領域有獨特優勢，一份來自智慧財產權或創意變現的收入可能在本月到帳。月末適合做一次全面的資產數位化整理。",
        "本月健康運勢整體良好，但注意精神層面的平衡。水瓶座容易在興奮中過度消耗腦力，學會在高峰時主動休息是一種更高級的創造力管理。",
      ],
      [
        "本月水瓶座迎來人生格局的重要拓展，你所關注的領域在本月出現重大變化，而你的前瞻性讓你在變化中佔據先機。不要懷疑自己的判斷，你的遠見正在被時間逐一驗證。",
        "本月感情運勢上你與一個獨特而有趣的人產生了深層連接，你們的感情不走尋常路但無比真實。水瓶座的幸福不需要別人的理解，只需要彼此的共鳴。",
        "本月職業發展可能出現跨界或轉型的機會，你的多元能力在這種時刻最顯價值。不要被過去的身分標籤束縛，水瓶座的本質就是超越定義。",
        "本月財運的關鍵詞是多元化，把投資分散到不同領域和資產類型中，水瓶座的廣度思維在資產配置上是天然優勢。",
        "本月注意保持社交和獨處的平衡，過度社交會消耗你的創造力，過度獨處則可能讓你陷入思維漩渦。找到屬於你的黃金比例。",
      ],
      [
        "本月水瓶座在理想與現實的交匯處找到了最動人的平衡點，你發現真正的創新不是脫離現實，而是用更好的方式回應現實的需求。這種領悟將讓你在本月的所有行動中都更加精準和有力。",
        "本月感情運勢上你與伴侶在共同理想的支持下建立了更深層的連接，你們不僅是愛人，更是改變世界的戰友。這種靈魂級別的夥伴關係是最令人羨慕的。",
        "本月職場上你的創新方案被採納並開始產生實際效果，從理念到落地的全過程證明了你的價值不僅在於想得到，更在於做得到。",
        "本月適合把一項你的獨特技能或知識變現，水瓶座累積的專業洞察力是別人願意付費的資產。勇敢邁出知識創業的第一步。",
        "本月健康管理需要關注循環系統和腿部，定期進行促進血液循環的運動，保持身體的流動性和靈活性。",
      ],
    ],
  },
  pisces: {
    today: [
      [
        "今日海王星的夢幻能量籠罩著你，雙魚座的直覺力和藝術感知力在今日達到極致。你的心靈如同一片無垠的海洋，包容著世間的悲歡離合。今日適合傾聽內心的聲音，它將引導你找到最真實的答案。信任你的感受，它比邏輯更接近真相。",
        "感情上今日你充滿溫柔與浪漫，你的同理心讓對方感到被深深理解和接納。已戀愛者今日安排一段充滿儀式感的浪漫時光；單身者今日的藝術氣質格外動人，一次在美術館或音樂場合的邂逅可能開啟一段美麗的故事。",
        "工作中今日你的創意和感受力是最強大的工具，特別適合需要審美或人文關懷的任務。你的方案可能不如別人的數據詳實，但它的溫度和深度是無法被取代的。",
        "財運今日平穩中有小驚喜，可能來自藝術創作或靈性領域的收益。雙魚座在感性消費方面需要克制，今日避免因心情而過度購物。",
        "今日注意足部和淋巴系統的保養，泡腳或足部按摩是最好的放鬆方式。睡前用精油薰香幫助進入深度睡眠。",
      ],
      [
        "今日雙魚座如魚得水，一切與水、藝術、靈性相關的活動都是你的幸運領域。宇宙在今日特別眷顧你的心靈世界，一次冥想、一段音樂或一幅畫作都可能帶來深刻的領悟。",
        "感情上今日你的溫柔力量覺醒，一個善解人意的舉動將讓身邊的人感動不已。雙魚座的愛是最無條件的，這種純粹在今日特別有感染力。",
        "工作中今日適合做創意輸出，你的靈感如同泉水般自然湧出，抓住這份天賜的創作狀態。",
        "財運今日適合關注與藝術、音樂或慈善相關的投資，雙魚座的直覺在這些領域特別準確。",
        "今日在水邊散步或游泳是最佳的運動選擇，水元素能為雙魚座補充最需要的能量。",
      ],
      [
        "今日是雙魚座與內在世界對話的好時機，在安靜中你將聽到靈魂深處的低語。不必向外尋求答案，你心裡早就知道該怎麼做。給自己一段不受打擾的時間和空間，讓直覺自由流淌。",
        "感情上今日的陪伴如同溫暖的潮水，不需要言語，一個擁抱、一次牽手就足以傳達所有深情。雙魚座的無聲之愛是最動人的語言。",
        "工作中今日適合處理需要細膩感受的任務，你的敏感度在今日是一種天賦而非負擔。用這份細膩去完善工作中的每一個細節。",
        "財運今日宜靜不宜動，保持現有的理財策略即可。今日的直覺可能被情緒干擾，重大的財務決策暫緩。",
        "今日適合做一次深度冥想或靈性練習，幫助你在紛擾的世界中找到內心的寧靜錨點。",
      ],
    ],
    tomorrow: [
      [
        "明日海王星為你帶來一個靈感如潮的夜晚，你的夢境中可能蘊含重要的資訊或創意。明早醒來後第一時間記錄夢境，它可能成為你解決問題的關鍵線索。",
        "明日感情運勢如夢如幻，一次浪漫的邂逅或心靈相通的對話讓感情升溫。雙魚座的愛情故事往往比電影更精彩，因為你的感受力是最真實的主角。",
        "明日工作中一個需要創意和同理心的任務落在你肩上，這正是你最能發光的領域。用你的方式去完成它，結果會超出所有人的預期。",
        "明日財運有利於與藝術或靈性相關的消費和投資，一幅畫、一件樂器或一次靈性課程的投資回報可能超出財務層面。",
        "明日注意保持充足的睡眠，雙魚座在睡眠中獲得的靈感和恢復力是其他星座無法比擬的。",
      ],
      [
        "明日是一個充滿溫柔力量的日子，你的同理心在明日特別強大，能感受到身邊人的情緒和需求。用這份天賦去溫暖他人，同時記得也溫暖自己。雙魚座最大的挑戰是學會在給予和接受之間找到平衡。",
        "明日感情上一次深入的交流讓彼此的心更加貼近，你的傾聽和理解是對方最需要的安慰。雙魚座天生就是最優秀的情感療癒師。",
        "明日工作中你的直覺幫助你避開一個潛在的陷阱，在別人還渾然不覺的時候，你已經悄然調整了方向。這份敏銳是雙魚座在職場中最被低估的能力。",
        "明日適合做一次感性與理性結合的消費決定，在滿足心靈需求的同時也兼顧實際價值。",
        "明日適合水中運動，游泳或水中瑜伽是雙魚座最佳的身心調理方式。",
      ],
      [
        "明日適合給自己安排一段「無目的」的時光，漫無目的地散步、發呆或塗鴉，讓心靈在沒有壓力的狀態下自由流動。雙魚座最好的創意往往誕生於這種鬆弛的狀態中。",
        "明日感情上一次小小的心意表達——一首歌、一幅小畫或一段手寫的話——將讓對方感動許久。雙魚座的浪漫不需要華麗的舞台，只需要一顆真誠的心。",
        "明日工作中用你的藝術感去優化一份報告或簡報，視覺和情感的加持會讓你的專業內容更有說服力。",
        "明日適合整理個人收藏或數位資產，雙魚座容易在情感驅動下囤積物品，定期斷捨離是必要的。",
        "明日睡前播放一段海浪聲或雨聲，這種自然白噪音對雙魚座的睡眠品質有顯著的提升效果。",
      ],
    ],
    week: [
      [
        "本週雙魚座運勢如一首優美的詩篇，海王星的夢幻能量為你的生活鍍上了一層詩意的光芒。週初傾聽內心的聲音；週中創意與靈感爆發；週末適合回歸寧靜，消化本週的感悟。本週的核心詞是「感受」，讓心靈引領你前行。",
        "本週感情運勢浪漫而深刻，已戀愛者與伴侶在共同的美好體驗中加深了靈魂級別的連接；單身者本週在藝術或靈性場合有極大的邂逅機率，你的溫柔和藝術氣質是最動人的吸引力。",
        "本週職場上你的創意和感受力產出了一份充滿溫度和深度的成果，週中可能得到創意領域的重要認可。你的方案或許不是最高效的，但一定是最打動人心的。",
        "本週財運在藝術和靈性領域有特別加持，但也容易因情緒化消費而超支。設定情感消費預算，在預算內自由感受。",
        "本週注意足部和免疫系統的保養，泡腳和充足睡眠是最好的日常保養。多攝取維他命C和鋅。",
      ],
      [
        "本週雙魚座在夢境與現實的交匯處找到了最美麗的風景，你的靈感在本週如潮水般湧來，及時捕捉並用你喜歡的方式記錄和表達。本週適合開始一項創意專案或藝術創作，你的感受力在本週達到了創作高峰。",
        "本週感情運勢如一首溫柔的戀曲，你和伴侶在日常的溫馨細節中感受到深厚的愛意。一起做一頓飯、看一場日落、聽一首歌，這些簡單的美好就是雙魚座最嚮往的愛情。",
        "本週工作中你的藝術感和同理心為團隊帶來了不可取代的價值，一個需要溫度和深度的專案在本週交到你手上，這是你最擅長的領域。",
        "本週財運在知識變現和創意收入方面有機會，你的文字、繪畫或音樂作品可能在本週獲得認可和報酬。相信你的藝術是有價值的。",
        "本週健康管理重點是情緒調節，雙魚座的身體狀態與情緒直接相關。找到適合你的情緒出口——寫日記、繪畫或與信任的人交談。",
      ],
      [
        "本週雙魚座迎來靈性覺醒的重要時期，你對生命和宇宙的理解在本週達到了新的深度。一次深刻的冥想體驗、一本觸動人心的書或一段深入的對話都可能成為覺醒的契機。這份精神層面的成長將深刻影響你未來的選擇和方向。",
        "本週感情上你和伴侶在靈魂層面的連接更加深厚，你們可能共同經歷一次觸動心靈的時刻——一起觀看感人的演出或參與志願活動。這種共鳴超越了言語，是最深層的愛。",
        "本週職場上你的直覺力幫助你做出了幾個精準的判斷，同事們開始意識到你的「第六感」是真實存在的職場優勢。用更多的事實支撐你的直覺，讓它更具說服力。",
        "本週財運平穩，適合為未來的藝術投資或靈性學習做儲蓄準備。雙魚座的財務增長可能不如其他星座迅猛，但你的投資總是最有溫度和意義的。",
        "本週適合在水邊或自然環境中度過週末，大自然是雙魚座最好的療癒師和靈感來源。",
      ],
    ],
    month: [
      [
        "本月雙魚座整體運勢如夢似幻又如詩如歌，海王星為你編織了一個充滿靈感與愛的月份。月初適合沉浸在創作和感受中；月中靈感和機遇同時爆發，是本月的高光時段；月末收穫成果並回歸內心寧靜。本月屬於心靈自由的夢想家。",
        "本月感情運勢溫柔而深刻，月初一次靈魂級別的對話讓彼此更加確定；月中浪漫達到高峰，可能是本月最甜蜜的時光；月末你們的感情已經超越了形式，進入了最純粹的心靈相守。雙魚座本月是十二星座中最懂愛的存在。",
        "本月職場運勢在創意和人文領域大放異彩，月中旬一個與藝術、文化或療癒相關的專案或合作機會出現，這正是你最能發揮天賦的領域。用你的感受力去創造，作品會自己說話。",
        "本月財運在藝術和靈性領域有獨特機會，你的創意作品或靈性服務可能獲得意想不到的市場認可。月末適合做一次心靈的財務複盤，讓金錢服務於你的精神成長。",
        "本月健康運勢需要特別關注心理健康，雙魚座的心思最為細膩敏感，本月適合開始一項定期的冥想或瑜伽練習，為心靈建立安全的港灣。足部護理也不要忽略，每天泡腳是最好的自我關愛儀式。",
      ],
      [
        "本月雙魚座迎來創作和靈感的黃金月份，你的藝術感知力和同理心同時達到年度高峰，任何需要創意和溫度的領域都是你的主場。不要猶豫，把你心中的詩意和美好表達出來，世界需要你的聲音。",
        "本月感情運勢上你與一個同樣溫柔而深刻的人建立了靈魂連接，你們的相遇彷彿是命運早就寫好的劇本。珍惜這份緣分，用你全部的真誠和溫柔去呵護它。",
        "本月職業發展出現令人驚喜的轉機，一個需要藝術感和人文關懷的職位或專案向你的才華敞開了大門。不要自我懷疑，你的感受力就是最稀缺的專業能力。",
        "本月財運在創意經濟和體驗經濟領域有獨特機會，你設計的體驗、創作的內容或提供的情感服務都有變現的可能。勇敢為你的才華定價。",
        "本月注意保持室內空氣流通和濕度適中，雙魚座對環境氛圍特別敏感，一個舒適的空間對身心健康的加成比任何藥物都更有效。",
      ],
      [
        "本月雙魚座在感性與理性的融合中達到了新的高度，你開始理解真正的浪漫不是逃避現實，而是在看清現實後依然選擇用愛去回應。這份清醒的溫柔是本月最動人的力量，也是你未來最堅實的根基。",
        "本月感情運勢上你與伴侶在共同經歷了一段深度的心靈旅程後，建立了超越世俗定義的深厚連接。你們的愛情不是童話，而是兩個靈魂在真實世界中的最美同行。",
        "本月職場上你的作品或方案在本月獲得了廣泛認可，人們被你傳遞的溫度和真誠所打動。這證明了一件事：在一個追求效率的時代，最稀缺的恰恰是感受力，而這是雙魚座永不枯竭的財富。",
        "本月適合做一次投資組合的感性優化，在保持理性的基礎上，加入你對未來趨勢的直覺判斷。雙魚座的直覺在投資領域往往比數據分析更早捕捉到風向。",
        "本月健康管理的核心是找到身心合一的運動方式，太極、瑜伽或水中運動都是雙魚座的天選運動。讓身體和心靈在同一個節奏中流動，這才是雙魚座最自然、最健康的狀態。",
      ],
    ],
  },
};

export const EN_TITLES_6: Ti = {
  aquarius: {
    today: ["A Day of Innovative Inspiration", "Sparks of Independent Thought", "Balancing Socializing and Solitude"],
    tomorrow: ["Avant-Garde Ideas Win Recognition", "Humanitarian Spirit Shines", "Intuition Guides the Way"],
    week: ["Inspiration and Action Resonate This Week", "Rewards for Walking Your Own Path", "A Week of Innovative Breakthroughs"],
    month: ["A Month of Change and Breakthrough", "Ideals Become Reality", "A Month of Cashing In on Unique Value"],
  },
  pisces: {
    today: ["Inspiration Rushes in Like the Tide", "A Day of Extraordinary Intuition", "Where Dreams and Reality Meet"],
    tomorrow: ["Peak of Artistic Perception", "Gentle Power Awakens", "A Good Time to Recharge the Soul"],
    week: ["A Rich World of Feeling This Week", "Creativity and Healing Go Hand in Hand", "A Week of Endless Inspiration"],
    month: ["A Month of Bursting Inspiration", "A Month of Art and Love", "A Gentle Yet Powerful Harvest Season"],
  },
};

export const TW_TITLES_6: Ti = {
  aquarius: {
    today: ["創新靈感湧現", "獨立思考的閃光", "社交與獨處的平衡"],
    tomorrow: ["前衛想法獲認可", "人道主義精神發光", "直覺引導方向"],
    week: ["本週靈感與行動共振", "特立獨行的收穫", "創新突破的一週"],
    month: ["本月變革與突破", "理想照進現實", "獨特價值兌現之月"],
  },
  pisces: {
    today: ["靈感如潮水湧來", "直覺力超凡的一天", "夢境與現實的交匯"],
    tomorrow: ["藝術感知力巔峰", "溫柔力量覺醒", "心靈充電的好時光"],
    week: ["本週感性世界豐盈", "創意與治癒並行", "靈感不斷的一週"],
    month: ["本月靈感迸發", "藝術與愛之月", "溫柔而有力的收穫期"],
  },
};
