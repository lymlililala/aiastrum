import type { ZodiacId, TimePeriod } from "./horoscope-data";

type T = Partial<Record<ZodiacId, Partial<Record<TimePeriod, string[][]>>>>;
type Ti = Partial<Record<ZodiacId, Partial<Record<TimePeriod, string[]>>>>;

export const EN_TEMPLATES_2: T = {
  gemini: {
    today: [
      [
        "Today your mind sparkles like a river of stars, with creative inspiration welling up one idea after another. It is a wonderful day for communication, negotiation, and creative work. Jot down today's good ideas, because the spark often appears when you least expect it.",
        "In love, your verbal charm is dazzling today, and the way you speak makes the other person feel truly valued. If you're single, lean into that gift of language today; sincere compliments and a fun conversation are the best keys to opening someone's heart.",
        "At work your thinking is crystal clear today, and sorting through complex information or handling cross-departmental communication comes easily. A problem that looked tricky reveals an obvious solution once you view it from another angle.",
        "Your finances are on an upward trend today, and an idea about a side gig or part-time work is worth a serious look; your versatility is your greatest source of wealth.",
        "You're full of energy, but be careful not to start too many things at once and scatter your focus. Concentrate on one or two of the most important matters today, and the result will far outshine dabbling in everything.",
      ],
      [
        "Today your dual nature reaches its most perfect balance, with reason and emotion weaving together into captivating colors. Your intuition about people is especially accurate, so trust this inner judgment.",
        "Love is full of surprises today, and a witty, lighthearted conversation could well become the catalyst that warms up a relationship. If you're attached, do something a little out of the ordinary together with your partner, and a fresh spark will reignite.",
        "At work you display outstanding teamwork today, navigating gracefully between different viewpoints to build consensus; this is a value others find hard to replace.",
        "There's a small pleasant surprise in your finances today, perhaps from a partnership split or platform earnings. With money matters, avoid acting on impulse and decide only after comparing your options.",
        "Your mind is running extremely fast today, but remember to give it some downtime; even just five minutes of zoning out does wonders for restoring your thinking.",
      ],
      [
        "For Gemini today is a light yet fulfilling day, with a sense of freshness lingering in the air. Any little thing could turn into a small joy worth remembering today.",
        "The mood in love is delightful today, and a lively kind of beauty is growing within the relationship. If you've been hesitating over whether to confess your feelings, today is a good moment.",
        "At work your efficiency is sky-high today, the morning especially so; schedule the tasks that need the most thinking for the morning hours.",
        "Your finances are steady with a small bright spot. You can spend a little time today researching an investment category you've long wanted to understand; building knowledge matters more than rushing to act.",
        "Your body is well suited to light exercise today; a walk or a bike ride are both good choices, and breathing fresh air will leave you feeling completely refreshed.",
      ],
    ],
    tomorrow: [
      [
        "Tomorrow Mercury infuses you with superb information-processing power; complex negotiations, contract reading, or data analysis all unfold with unusually clear thinking.",
        "Communication in love flows especially smoothly tomorrow. Find a good moment to say the words you've struggled to bring up, and the other person will be more receptive than usual.",
        "At work tomorrow there's an important collaboration or meeting; prepare your proposal thoroughly, and your lively thinking will leave a deep impression.",
        "Your finances are average tomorrow, so large purchases are unwise; focus your attention on projects already underway, as the returns are drawing closer.",
        "Avoid scrolling through heaps of information before bed tomorrow; give your brain a stretch of quiet from the noise, which helps deepen your sleep.",
      ],
      [
        "Tomorrow is a day to let your curiosity soar; learning something new or having a long chat with an interesting person will be tomorrow's best reward.",
        "Keep a relaxed pace in love tomorrow, putting no extra pressure on your partner or yourself; a Gemini in love is naturally the most dazzling presence.",
        "At work tomorrow your eye for detail is exceptional; this is the key moment for standing out from your peers.",
        "A small windfall may arrive tomorrow; keep an eye on your phone for unexpected rewards or discount notifications.",
        "You'll be physically energetic tomorrow and can schedule a slightly longer workout than usual; jump rope or aerobics suit you well.",
      ],
      [
        "Tomorrow's energy favors integrating and summarizing; organizing what you've recently learned or experienced into a system will bring unexpected sparks of inspiration.",
        "Love runs toward the reserved tomorrow, better suited to quiet companionship than a lively outing; a low-key surprise in the little details is the most touching gesture.",
        "When you hit difficulties at work tomorrow, there's no need to shoulder it alone; reach out to a seasoned mentor or colleague, as your luck with helpful people is strong.",
        "Your finances are steady tomorrow; check whether this month's spending is over budget, and a flexible Gemini will have no trouble making timely adjustments.",
        "You might try a new food combination tomorrow; once Gemini's appetite for culinary exploration is satisfied, your mood will brighten along with it.",
      ],
    ],
    week: [
      [
        "This week Gemini's fortune is light and lively, with a sharp rise in the flow of information across all areas. Around midweek there's a far-reaching conversation or meeting; take it seriously, as it may well be the starting point of an important opportunity.",
        "Romance is lively and fun this week, and Gemini's charm wins hearts best in a relaxed, cheerful atmosphere. If you're single, the odds of meeting someone fated during a spur-of-the-moment social outing are high this week.",
        "At work your mind is sharp and your efficiency explosive this week, especially suited to tasks requiring lots of research and coordination. A somewhat complex project will make major progress this week.",
        "Your finances are slightly above average this week, with the chance of a small extra income; your urge to spend is strong, so distinguish between wants and needs before buying.",
        "For health this week, watch out for the mental fatigue that follows overworking your brain; schedule quality unplugged time for your mind, and outdoor activity is the best choice.",
      ],
      [
        "This week Gemini enters a period of expanding relationships, with new social connections and reunions with old friends intertwining. In every meaningful exchange lies an opportunity that could change your trajectory.",
        "Love leans toward a mode of shared exploration this week; find something neither of you has tried and do it together. If you're single, draw someone in through shared topics of resonance, for an interesting soul is a more lasting attraction than looks.",
        "At work there's a slightly tricky task to handle this week, but your multithreaded thinking is precisely the best tool to crack it; break the problem apart and tackle it piece by piece.",
        "Your finances fluctuate moderately this week, so large investments are unwise; tidy up your recent financial records and find places you can optimize.",
        "Your health focus this week is sleep quality; five minutes of abdominal breathing before bed will bring a noticeable improvement.",
      ],
      [
        "This week is a prime time for Gemini to break through the boundaries of perception; curiosity drives you to actively learn and explore, and these inputs will soon produce value in unexpected forms.",
        "The romance line is full of vitality this week; sincerity is forever the secret to keeping love fresh, and Gemini's sincerity runs especially high this week.",
        "At work this week is a good time to boldly put forward your own ideas; your creative thinking will get a more positive response than usual this week.",
        "There's an unexpected small surprise in your finances this week, perhaps from a side gig you invested in earlier or an unexpected partnership invitation.",
        "This week, try doing something different from your routine: a new flavor of food, a new sport, or a place you've never been.",
      ],
    ],
    month: [
      [
        "This month Gemini enjoys a double bonus of information and opportunity, with Mercury's protection letting you handle any setting with ease. Early in the month is good for expanding new social circles or fields of knowledge; midmonth your fortune peaks, the golden window for advancing major plans; the month's end is for wrapping up and celebrating.",
        "Romance this month is like a gentle spring rain: take the initiative early in the month, deepen your emotional bond at midmonth, and solidify the relationship's foundation at month's end, with love climbing higher and higher.",
        "Your career blooms across the board this month; Gemini, so skilled at juggling multiple tasks, advances several projects in parallel this month. A presentation or negotiation opportunity at midmonth is the key moment for raising your professional value.",
        "Your finances are altogether pleasing this month, with several income streams firing at once. Be sure to seize the small investment window at midmonth, but your urge to spend also peaks then.",
        "The keyword for health this month is regularity; try to stick with one small healthy habit, and keeping it for 30 days will form a beneficial routine.",
      ],
      [
        "This month Gemini faces a rare chance for self-integration, as the universe nudges you from dabbling in everything toward deep, refined cultivation. Find the one thing most worth investing in this month, and concentrate your energy to break through it.",
        "In love this month, quality far outweighs quantity; investing your true heart and showing your authentic self is the best strategy this month for attracting and keeping the person you admire.",
        "At work this month your creative thinking and execution resonate in sync; seize the moment to shine at midmonth and present your best plan in the clearest possible way.",
        "The key to this month's finances is generating income; Gemini's versatility is a natural advantage for developing side income, and this month is good for monetizing one of your talents.",
        "This month's health risk lies in overworking your brain and unstable sleep; set aside at least 30 minutes of screen-free time each day to let your mind fully unwind.",
      ],
      [
        "This month Gemini enjoys a perfect duet of thinking and action, with eloquence, creativity, and execution all peaking at once. Ride this tailwind, and you'll see satisfying gains in both career and personal growth.",
        "Surprises come one after another in love this month, and your personal charm reaches its yearly peak. Take the initiative, for the matchmaker's thread is tied especially tight this month.",
        "Your career erupts on every front this month, and at month's end you may receive exciting good news that puts a perfect end to the month.",
        "Your money fortune is steady with a slight rise this month, and side income or an unexpected windfall may appear at midmonth.",
        "Your overall health is good this month; keep a regular routine and tend to your digestive system, avoiding overly greasy food.",
      ],
    ],
  },
  cancer: {
    today: [
      [
        "Today the Moon's energy nourishes your inner world, and your intuition is unusually keen. It suits work that calls for delicate perception, as well as deep talks with those close to you. The warmth of home feels especially precious today.",
        "In love your emotional charm is in full force today, and your thoughtfulness and tenderness deeply move the other person. If you're attached, take the initiative to prepare a surprise today; even a cup of hand-brewed milk tea is enough to warm up the relationship.",
        "At work today suits tasks that require empathy, such as client communication or maintaining team relationships. Your warm attitude will have a positive influence on the whole team.",
        "Your finances are steady today, and a small unexpected income may appear. Keep your spending restrained, though a purchase of household items is worth some consideration.",
        "Your emotions are rather sensitive today; release any unhappiness promptly, and chatting with a friend or keeping a journal are both good outlets.",
      ],
      [
        "Today the universe's gentle energy gathers entirely around you, giving off a warm aura that makes people want to draw near. Those around you will trust and rely on you especially.",
        "A small surprise awaits you in love today, perhaps a heartwarming message or an unexpected encounter. Open your heart and let the good happen.",
        "At work your coordinating ability is outstanding today; you play the role of glue within the team, dissolving potential conflicts and making cooperation flow more smoothly.",
        "Your finances favor spending on home and dining today, and such purchases are well worth the money. For investments, stick to your existing plans and don't be reckless.",
        "Your body favors stillness over motion today; gentle stretching or meditation suits you, giving your body a tender chance to recover.",
      ],
      [
        "Today your overall energy is reserved and profound, well suited to settling down and reflecting. Some problems that have long troubled you may suddenly become clear during quiet contemplation today.",
        "Love needs a little space to itself today; this doesn't mean distance, but rather giving the relationship room to breathe. If you're single, quietly enjoy your own life today, for the best attraction comes from inner fullness and contentment.",
        "At work today suits deep thinking and completing tasks independently; reduce distractions, and you'll find the satisfaction that focus brings is today's greatest reward.",
        "For finances today, favor financial planning over actual transactions; recording income and expenses and setting savings goals lay a solid foundation for your future self.",
        "Today suits going to bed early and rising early; a regular routine is Cancer's best health safeguard, and with enough sleep your intuition and state of mind will both improve.",
      ],
    ],
    tomorrow: [
      [
        "Tomorrow the shifting Moon phase brings you a new layer of perception, and your sensitivity to beautiful things is especially strong; consider arranging an artistic experience or cooking a new dish.",
        "Emotional expression flows smoothly in love tomorrow; find a gentle moment to say the words you've long wanted to but never did, and the other person's response will be far better than you expect.",
        "At work tomorrow there's a benefactor quietly helping you; when you run into difficulty, speak up and ask for advice, and you'll receive unexpected help and inspiration.",
        "Your finances are steady with a touch of joy tomorrow; watch for reminders about dividends or maturing fixed-term investments and reallocate promptly.",
        "Keeping a good mood is the best health management tomorrow; spend time with people who make you happy, and let laughter be your finest medicine.",
      ],
      [
        "Tomorrow your intuition guides you like a lighthouse; the judgment you make on first instinct is often closer to the truth than conclusions reached after endless deliberation.",
        "A subtle, mysterious chemistry is brewing in love tomorrow; stay open and curious, and let the feelings flow naturally.",
        "At work tomorrow you'll meet a challenge that calls for creativity; your imagination is your greatest weapon right now, so boldly voice the plans in your mind.",
        "Remember to double-check the numbers on bills or contracts tomorrow; being careful can help you avoid an unnecessary loss.",
        "Tomorrow suits light eating, a good chance to ease the burden on your stomach; go light on salt and oil, and eat plenty of vegetables and fruit.",
      ],
      [
        "Tomorrow is a good day for building up your emotional savings; do one thoughtful little thing for someone close to you, and the return will compound over the long term in the form of trust and connection.",
        "Interactions in love center on companionship tomorrow; no special ritual is needed, for quietly doing your own things side by side is the loveliest time for two.",
        "At work tomorrow you'll be highly efficient at handling documents, organizing files, or systematic summaries; make the most of this focused stretch of time.",
        "Your finances are flat tomorrow, and the fitting move is to hold steady; protecting the fruits you already have matters more than chasing higher returns.",
        "Meditate for 10 minutes before bed tomorrow, focusing on gratitude for three small things from the day; it helps calm your emotions and improve sleep quality.",
      ],
    ],
    week: [
      [
        "This week Cancer's emotional energy is abundant, and family and feelings will see warm progress. The start of the week suits tidying your home environment, midweek brings an important conversation, and the weekend is for a gathering with family or close friends to recharge your soul.",
        "Romance is as warm and gentle as fine jade this week; if you're attached, your bond grows steadier in the shared time of midweek; if you're single, your sincerity and thoughtfulness win you some intriguing affection at a weekend gathering or event.",
        "At work this week suits deep, careful cultivation; doing one important task to perfection is more valuable than casting a wide net. On Wednesday you may meet a chance to showcase your professional ability.",
        "Your finances are altogether steady this week, with the possibility of a small extra income; reasonable spending on home and food items is this week's lucky outlay.",
        "For health this week, mind your emotional management; emotional eating is a common health pitfall for Cancer, so when stress runs high, choose exercise rather than food to unwind.",
      ],
      [
        "This week Cancer enjoys a fine time of cultivating both inner and outer strength: showing warm charm to the world while building power and wisdom within. Energy is gradually released at midweek, and both love and career will see gratifying progress.",
        "There's an important soul connection in love this week; pass love along through love, for your tenderness is the finest language.",
        "At work this week, emphasize cooperation and sharing; your spirit of helping others will earn the team's heartfelt recognition this week.",
        "This week is a good time to organize your finances; making a list of recent bills and plans helps you see the whole picture clearly.",
        "The greatest blessing for health this week is reducing anxiety; write your worries on paper and then set them down, focusing on what you can do in the present.",
      ],
      [
        "For Cancer this week is a rich inner journey, with creativity and intuition peaking together. Turn the beauty you feel within into concrete action.",
        "The romance line is full of small sweet moments this week; the gentle, steady tenderness of a long-flowing stream is the love language Cancer does best.",
        "At work this week, draw on your empathy and delicacy; when handling client relationships or team issues, your perceptiveness is an asset others cannot replace.",
        "There's a small surprise in your finances this week; watch for income from an unexpected channel.",
        "Your physical condition is good this week, well suited to learning a new way of cooking; express love by tending to the meals of those around you.",
      ],
    ],
    month: [
      [
        "This month Cancer's overall fortune is gentle and steadily rising, with the universe nudging you toward a better state in a tender way. Early in the month, tidy your inner world and outer surroundings; at midmonth, love and career bloom in step; the month's end is a time for gratitude and deepening.",
        "Romance is abundant this month; a heartfelt expression early in the month sets the tone for the whole month's love; at midmonth singles get a clear boost in fated connections; the month's end is a good time to plan a future together.",
        "At work this month your magnetism and professional ability advance on two tracks; midmonth brings a stage to display your talent, so seize every chance to report and collaborate.",
        "Your finances are steady this month, with regular income to look forward to and a small peak in windfall luck at midmonth. Spending on home and dining is well worth the money this month.",
        "The keyword for health this month is nourishment; pay attention to the completeness of your nutrition, pairing regular aerobic exercise with ample sleep.",
      ],
      [
        "This month Cancer embarks on a profound journey of self-discovery; early in the month is the golden moment to set intentions; at midmonth your energy is abundant and your drive peaks; the month's end is full of rewards.",
        "Love this month yields rich gains in deep connection; a late-night heart-to-heart could become an important milestone in the relationship; singles will meet someone who truly touches their heart this month.",
        "At work this month your delicacy and insight win you important opportunities; let your sincerity and professionalism make others feel your one-of-a-kind value.",
        "The focus of your finances this month is building an emotional account; set aside part of your budget for investing in maintaining important relationships.",
        "What needs the most attention for health this month is the issue of emotional eating; when anxious or sad, find a way to relieve stress that doesn't rely on food.",
      ],
      [
        "The keyword for Cancer this month is blossoming, as all the energy that has long settled within finds its outlet this month. Early in the month, boldly take the first step; at midmonth, savor the fullness of giving it your all; at month's end, stand in the joy of the harvest.",
        "This month is the best one for romance, with love appearing in your life in its most beautiful form.",
        "At work this month a bold move will open up new possibilities; trust the professional foundation you've built.",
        "Your money fortune rises noticeably this month; keep an eye on the latest in financial management and investment, for one fitting decision will lay a solid financial foundation.",
        "You're full of energy this month, well suited to establishing a new health habit; sticking with it will benefit you for a lifetime.",
      ],
    ],
  },
};

export const TW_TEMPLATES_2: T = {
  gemini: {
    today: [
      [
        "今日雙子座思緒活躍如星河，創意靈感在腦海中不斷湧現。這是一個非常適合溝通、協商與創作的日子。把今天的好點子記下來，靈光往往就在不經意間出現。",
        "感情方面今日言辭魅力四射，你的說話方式能讓對方感受到被重視。單身者今日發揮語言魅力，真誠的讚美與有趣的對話是打開心扉的最佳鑰匙。",
        "工作上今日思路清晰，處理複雜的資訊梳理或跨部門溝通事項得心應手。有一個看似棘手的問題，換個角度審視後解法顯而易見。",
        "財運今日處於上升階段，一個關於副業或兼職的想法值得認真評估，你的多才多藝是最大的財富來源。",
        "精力充沛，但需注意不要同時開啟太多事情而分散精力，今日聚焦一至兩件最重要的事，效果遠勝於樣樣蜻蜓點水。",
      ],
      [
        "今日雙子座的雙重天性得到最完美的平衡，理性與感性交織出迷人的色彩。你對人的直覺特別準，信任這份內心的判斷。",
        "愛情今日充滿驚喜，一段機智風趣的對話很可能成為關係升溫的催化劑。已戀愛者和伴侶一起做一件稍微出格的小事，感情的新鮮感就此活化。",
        "職場上今日展現出色的團隊協作能力，你在不同立場之間游刃有餘地建立共識，這是別人難以取代的價值所在。",
        "財運方面今日有小驚喜，可能來自合作分成或平台收益。理財上避免一時衝動，多方比較後再做決定。",
        "今日大腦運轉極快，但記得給它一些空檔期，哪怕只是發五分鐘的呆，對思緒恢復都大有益處。",
      ],
      [
        "今日對雙子座而言是一個輕盈而充實的日子，新鮮感瀰漫在空氣中。任何一件小事都有可能在今天成為值得銘記的小確幸。",
        "感情今日氣氛愉悅，愛情中有一種活潑的美好正在生長。如果你一直在猶豫是否告白，今日是一個不錯的時機。",
        "工作上今日效率極高，上午時段尤為出色，把最需要思考的任務放在上午完成。",
        "財運平穩中有小亮點，今日可以花少量時間研究一個你早就想了解的投資品類，累積知識比急於行動更重要。",
        "今日的身體狀態適合輕運動，散步或騎車都是不錯的選擇，呼吸新鮮空氣會讓你整個人煥然一新。",
      ],
    ],
    tomorrow: [
      [
        "明日水星為你注入超強的資訊處理能力，複雜的談判、合約解讀或數據分析，處理起來思路格外清晰。",
        "明日感情上的溝通尤為順暢，一直難以開口的話，找一個好時機說出來，對方的接受度會高於平時。",
        "明日工作中有一次重要合作或會議，充分準備提案，你的思緒活躍度會讓對方印象深刻。",
        "明日財運一般，不宜大額消費；把注意力集中在正在進行中的專案上，收益正在向你靠近。",
        "明日睡前避免滑大量資訊，給大腦一段去除雜訊的時間，有助於提升睡眠深度。",
      ],
      [
        "明日是一個讓好奇心盡情飛翔的日子，學習一件新事物或者和一個有趣的人長聊，都會成為明日最好的收穫。",
        "明日在感情方面保持輕鬆的節奏，不給對方也不給自己太多壓力，戀愛中的雙子座本就是最耀眼的存在。",
        "明日職場上你對細節的洞察力超出尋常，這是你在同齡人中脫穎而出的關鍵時機。",
        "明日偶有小額財運降臨，留意手機訊息裡是否有意外的獎勵或優惠通知。",
        "明日體力充沛，可以安排比平時稍長的運動時間，跳繩、健身操都很適合。",
      ],
      [
        "明日的能量適合整合與總結，把最近學到的知識或經歷整理成體系，會帶來意想不到的靈感激發。",
        "明日感情運偏向內斂，適合安靜陪伴而非熱鬧出遊，低調地在細節上給對方一個驚喜最為動人。",
        "明日工作中遇到困難不必獨自硬撐，主動向經驗豐富的前輩或同事請教，貴人運旺。",
        "明日財運平穩，核查一下本月開支是否超出預算，靈活的雙子座在財務上補救及時不成問題。",
        "明日可嘗試一次新的飲食組合，雙子座對食物的探索欲滿足後，心情也會隨之愉悅。",
      ],
    ],
    week: [
      [
        "本週雙子座的運勢輕盈而活躍，各方面的資訊流通量大增。週中前後有一次影響深遠的談話或會面，認真對待，那很可能是一個重要機遇的起點。",
        "本週感情運活潑有趣，雙子座的魅力在輕鬆愉快的氛圍中最能打動人心。單身者本週在臨時起意的社交中遇到有緣人的機率很高。",
        "職場上本週思緒敏銳、效率爆棚，特別適合完成需要大量調研與溝通協調的工作。一個略顯複雜的專案在本週會取得重大進展。",
        "本週財運中等偏上，有小額額外收益的可能；消費欲望較強，購物前區分想要和需要。",
        "本週健康上注意用腦過度後的精神疲憊，給大腦安排有品質的斷電時間，戶外活動是最佳選擇。",
      ],
      [
        "本週雙子座迎來人際關係的擴張期，新的社交連結和舊友重逢相互交織。在每一次有意義的交流中，都藏著可能改變你軌跡的機會。",
        "本週感情運偏向共同探索模式，找一件你們都沒嘗試過的事一起做。單身者透過話題的共鳴去吸引另一半，比外表更長久的吸引力來自有趣的靈魂。",
        "本週職場有一個略感棘手的任務需要處理，但你的多執行緒思維恰好是破解它的最佳工具，把問題拆解後逐個擊破。",
        "本週財運波動適中，不宜大額投資；整理一下近期的財務記錄，找出可以最佳化的地方。",
        "本週健康重點在睡眠品質，睡前做五分鐘腹式呼吸練習會有顯著改善。",
      ],
      [
        "本週對雙子座而言是突破認知邊界的絕佳時機，好奇心驅動你主動學習與探索，而這些輸入將在不久後以意想不到的形式產出價值。",
        "本週感情線充滿生機，真誠永遠是感情保鮮的祕訣，雙子座本週的真誠度極高。",
        "本週職場適合大膽提出自己的想法，你的創意思維在這週會得到比平時更積極的回應。",
        "本週財運有一個令人意外的小驚喜，可能來自之前付出的某個副業或者意外的合作邀約。",
        "本週建議嘗試一件與日常不同的事情：新口味的食物、一個新運動、或者一個從未去過的地方。",
      ],
    ],
    month: [
      [
        "本月雙子座迎來資訊與機遇的雙重紅利期，水星的護佑讓你在各種場合都能應對自如。月初適合拓展新的社交圈或知識領域；月中運勢攀峰，是推進重大計畫的黃金窗口；月末收尾與慶祝。",
        "本月感情運勢如春風化雨，月初主動出擊、月中深化感情聯結、月末穩固關係基礎，感情運勢節節走高。",
        "本月職場運勢全面開花，尤其擅長多工並行的雙子座，本月在多個專案上同步推進。月中的一次展示或談判機會，是提升職場價值的關鍵節點。",
        "本月財運整體喜人，多個收入渠道同時發力。注意把握月中的投資小窗口，但消費欲望也在月中達到峰值。",
        "本月健康的關鍵詞是規律，本月嘗試堅持一件健康小事，持續30天就能形成有益的生活習慣。",
      ],
      [
        "本月雙子座面臨一個難得的自我整合機遇，宇宙推動你從樣樣涉獵邁向深耕精進。找到本月最值得投入的一件事，集中能量去突破它。",
        "本月感情方面品質遠勝數量，在感情上投入真心、展示真實的自我，是本月吸引和留住心儀之人的最佳策略。",
        "本月職場上創意思維與執行力同頻共振，把握月中的表現機會，把最好的方案以最清晰的方式展現出來。",
        "本月財運的關鍵是開源，雙子座的多才多藝是開拓副業收入的天然優勢，本月適合將某個專長變現。",
        "本月健康的隱患在於用腦過度和睡眠不穩定，建議每天至少安排30分鐘無螢幕時間，讓大腦徹底放空。",
      ],
      [
        "本月雙子座迎來思緒與行動的完美協奏，口才、創意、執行力三者同時達到高峰。把握這股順風能量，在事業和個人成長上都會有令你滿意的收穫。",
        "本月感情方面驚喜連連，你的個人魅力達到全年高峰。主動出擊，本月的月老繩牽得格外緊。",
        "本月職場運勢全方位爆發，月末可能收到一個令人振奮的好消息，為本月畫上圓滿句點。",
        "本月理財運勢穩中有升，副業收入或意外之財有望在月中出現。",
        "本月健康運勢整體良好，保持規律作息，注意消化系統的養護，避免過於油膩的飲食。",
      ],
    ],
  },
  cancer: {
    today: [
      [
        "今日月亮的能量滋養著你的內心世界，直覺力異常敏銳。適合處理需要細膩感知的工作，也適合與親近的人進行深談。家的溫暖在今日顯得格外珍貴。",
        "感情上今日感性魅力十足，你的體貼和溫柔令對方深深感動。已戀愛者今日主動準備一個驚喜，哪怕是一杯親手泡的奶茶，都足以讓愛情升溫。",
        "工作上今日適合處理需要同理心的任務，例如客戶溝通、團隊關係維護。你的溫暖態度將為團隊帶來積極正面的影響。",
        "財運今日平穩，有一筆小額預期外的收入可能出現。消費上保持克制，居家類物品的購買可以稍作考量。",
        "情緒今日比較敏感，遇到不順心的事情及時疏導，找朋友聊聊或寫日記都是很好的情緒出口。",
      ],
      [
        "今日宇宙的溫柔能量全部集中在你身上，讓你散發出讓人想靠近的溫暖氣場。身邊的人會對你格外信任和依賴。",
        "愛情今日有一個小小的驚喜在等著你，可能是一條暖心的訊息或一次意外的相遇。敞開心扉，讓美好發生。",
        "職場上今日協調能力尤為出眾，你在團隊中扮演黏合劑的角色，化解潛在矛盾，讓合作更順暢。",
        "財運今日有利於居家、餐飲類的投入，這些消費物超所值。投資方面維持現有計畫，不宜冒進。",
        "今日身體狀態宜靜不宜動，適合輕柔的伸展運動或冥想，給身體一個溫柔的修復機會。",
      ],
      [
        "今日整體能量內斂而深邃，適合沉澱與思考。一些長期困擾你的問題，今日可能在靜心思考中豁然開朗。",
        "感情今日需要一些獨處的空間，這不代表疏遠，而是給愛情留點呼吸感。單身者今日安靜享受自己的生活，最好的吸引力來自內心的充實與滿足。",
        "工作上今日適合深度思考和獨立完成任務，減少干擾，你會發現專注帶來的滿足感是今日最大的收穫。",
        "財運上今日宜做理財規劃而非實際操作，記錄收支、設立儲蓄目標，為未來的自己打好基礎。",
        "今日適合早睡早起，規律的作息是巨蟹座最好的健康保障，睡眠充足你的直覺和狀態都會更好。",
      ],
    ],
    tomorrow: [
      [
        "明日月相變化為你帶來新的感知層次，對美好事物的感知力特別強，不妨安排一次藝術類體驗或者烹飪新菜式。",
        "明日感情上情緒表達順暢，一直想說卻沒說出口的話，找一個溫柔的時機說出來，對方的反應會比你預期的好很多。",
        "明日工作中有貴人暗中助力，遇到困難時主動開口請教，會獲得意想不到的幫助和啟發。",
        "明日財運穩中帶喜，留意是否有分紅或定期理財到期的提示，及時進行重新配置。",
        "明日保持好心情是最好的健康管理，和讓你開心的人待在一起，讓笑聲成為最好的藥方。",
      ],
      [
        "明日直覺如燈塔般為你指引方向，相信第一感覺做出的判斷，往往比反覆權衡的結論更貼近真相。",
        "明日感情中有一絲神祕的化學反應在醞釀，保持開放和好奇，讓感情自然流動。",
        "明日工作上遇到需要創造力的挑戰，你的想像力是此刻最大的武器，大膽地把腦海中的方案說出來。",
        "明日記得核對帳單或合約中的數字，細心可以幫你避免一筆不必要的損失。",
        "明日適合清淡飲食，給腸胃一次輕負擔的好機會，少鹽少油，多蔬果。",
      ],
      [
        "明日是累積情感存款的好日子，為身邊的人做一件貼心的小事，回報將以信任和連結的形式長期複利。",
        "明日感情上的互動以陪伴為主旋律，不需要特別的儀式，安靜地在一起做各自的事，就是最美好的二人時光。",
        "明日職場上處理文件、檔案整理或系統性總結的工作效率極高，把握這段專注的時間段。",
        "明日財運平淡，適合的操作是按兵不動，保住現有的果實比追求更高的回報更重要。",
        "明日睡前冥想10分鐘，專注於感恩當天的三件小事，有助於平復情緒，提升睡眠品質。",
      ],
    ],
    week: [
      [
        "本週巨蟹座的情感能量豐沛，家庭與情感方面將有溫暖的進展。週初適合整理居家環境，週中有一次重要談話，週末安排一次和家人或摯友的聚會，心靈大充電。",
        "本週感情運勢溫潤如玉，已戀愛者在週中的共同時光中感情更加穩固；單身者在週末的聚會或活動中，因為真誠和體貼收穫了有意思的好感。",
        "職場上本週適合深耕細作，把一件重要的工作做到極致比廣撒網更有價值。週三可能遇到一個需要你展示專業能力的機會。",
        "本週財運整體平穩，有小額額外收益可能；居家類、食品類的合理消費是本週的幸運支出。",
        "本週健康關注情緒管理，情緒化進食是巨蟹座常見的健康隱患，壓力大時選擇運動而非美食來解壓。",
      ],
      [
        "本週巨蟹座迎來內外兼修的好時機，對外展現溫暖魅力，對內累積力量與智慧。週中能量逐漸釋放，感情和事業都會有令人欣喜的進展。",
        "本週感情中有一次重要的心靈連結，以愛傳遞愛，你的溫柔是最好的語言。",
        "本週職場上注重合作與分享，你的助人精神在本週會得到團隊的真心認可。",
        "本週是整理財務的好時機，把近期的帳單和計畫列一張清單，有助於看清全局。",
        "本週健康最大的福音是減少焦慮，把擔憂寫在紙上然後放下，專注當下能做到的事。",
      ],
      [
        "本週對巨蟹座而言是一段豐盈的內在旅程，創造力與直覺力共同達到高峰。把內心感受到的美好轉化為實際的行動。",
        "本週感情線上充滿了小小的甜蜜時刻，細水長流的溫柔是巨蟹座最擅長的愛情語言。",
        "本週工作中發揮你的同理心和細膩，在處理客戶關係或團隊問題時，你的感知力是他人無法取代的資產。",
        "本週財運有一個小驚喜，留意來自意想不到渠道的收益。",
        "本週身體狀態良好，適合學習一種新的烹飪方法，透過照料身邊人的飲食來表達愛。",
      ],
    ],
    month: [
      [
        "本月巨蟹座整體運勢溫和而持續上升，宇宙用一種溫柔的方式推動你走向更好的狀態。月初整理內心與外部環境；月中感情與事業同步開花；月末是感恩與深化的時刻。",
        "本月感情運勢豐盈，月初一次來自心底的表達將奠定整月感情基調；月中單身者有明顯的緣分加持；月末是規劃兩人未來的好時機。",
        "本月職場上你的感召力與專業能力雙線並進，月中迎來展示才能的舞台，把握每一次匯報和合作的機會。",
        "本月財運穩健，正財收入可期，偏財運在月中出現小高峰。居家、餐飲類的投入本月物超所值。",
        "本月健康運勢的關鍵詞是滋養，關注營養攝取的全面性，規律的有氧運動結合充足的睡眠。",
      ],
      [
        "本月巨蟹座迎來一段深刻的自我發現之旅，月初是設立意圖的黃金時刻；月中能量充沛，行動力達到高峰；月末收穫滿滿。",
        "本月感情在深度連結上收穫頗豐，一次深夜長談可能成為關係裡的重要里程碑；單身者本月會遇到一個真正打動你內心的人。",
        "本月職場上你的細膩和洞察力為你贏得了重要機會，用你的真誠和專業讓對方感受到你獨一無二的價值。",
        "本月理財重點在於建立情感帳戶，將一部分預算用於維繫重要關係的投入。",
        "本月健康最需要關注的是情緒進食的問題，在焦慮或難過時找一種不以食物為載體的舒壓方式。",
      ],
      [
        "本月巨蟹座的關鍵詞是綻放，所有沉澱已久的能量在本月找到了出口。月初大膽邁出第一步；月中享受全力以赴帶來的充實感；月末站在收穫的喜悅中。",
        "本月感情運勢最好的一個月，愛情以最美的方式出現在你的生活中。",
        "本月職場上一次大膽的行動將打開新的可能性，相信自己的專業累積。",
        "本月財運上升明顯，多留意理財和投資的最新動態，一個恰當的決策將奠定堅實的財務基礎。",
        "本月精力充沛，適合建立一項新的健康習慣，堅持下去將受益終身。",
      ],
    ],
  },
};

export const EN_TITLES_2: Ti = {
  gemini: {
    today: ["A Day Bursting with Inspiration", "The Stage of a Social Star", "A Light and Fulfilling Good Time"],
    tomorrow: ["A Day of Lively Thinking", "Creative Sparks Keep Coming", "Led by Curiosity"],
    week: ["Expanding Your Network This Week", "Inspiration and Drive Soar Together", "Breaking Through the Boundaries of Perception"],
    month: ["A Month of Information Dividends", "A Month of Advancing on Many Fronts", "A Month of Focused, Deep Cultivation"],
  },
  cancer: {
    today: ["Blessed with Gentle Energy", "Intuition Off the Charts", "A Day of Inner Abundance"],
    tomorrow: ["A Day of Heightened Sensitivity", "A Warm Moment Arrives", "Inner Strength Awakens"],
    week: ["Abundant Emotional Energy This Week", "A Week of Cultivating Inner and Outer Strength", "A Rich Inner Journey"],
    month: ["A Month of Gentle Rise", "A Month of Deep Connection", "A Month of Blossoming"],
  },
};

export const TW_TITLES_2: Ti = {
  gemini: {
    today: ["靈感迸發的一天", "社交達人的舞台", "輕盈充實的好時光"],
    tomorrow: ["思緒活躍的一天", "創意靈感不斷", "好奇心帶路"],
    week: ["本週人脈拓展", "靈感與行動力齊飛", "突破認知邊界"],
    month: ["本月資訊紅利期", "多線並進之月", "聚焦深耕的月份"],
  },
  cancer: {
    today: ["溫柔能量加持", "直覺力爆表", "內心豐盈的一天"],
    tomorrow: ["感受力超強的日子", "溫暖時刻到來", "內在力量覺醒"],
    week: ["本週情感能量豐沛", "內外兼修的一週", "豐盈的內在旅程"],
    month: ["本月溫柔崛起", "深度連結之月", "綻放的月份"],
  },
};
