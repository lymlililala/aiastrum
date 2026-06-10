import type { ZodiacId, TimePeriod } from "./horoscope-data";

type T = Partial<Record<ZodiacId, Partial<Record<TimePeriod, string[][]>>>>;
type Ti = Partial<Record<ZodiacId, Partial<Record<TimePeriod, string[]>>>>;

export const EN_TEMPLATES_4: T = {
  libra: {
    today: [
      [
        "Venus adds a finishing touch to your charm today, and Libra's innate elegance and sense of harmony shine especially bright. Beautiful things gravitate toward you like iron to a magnet.",
        "Love today is like a carefully composed oil painting, harmonious and lovely. Your partner's appreciation reaches new heights, while singles radiate an irresistibly captivating air.",
        "At work, your gift for mediation and coordination is exceptional today. A complex multi-party meeting flows smoothly under your chairmanship as your diplomatic talents are fully unleashed.",
        "Finances receive a special boost today from anything tied to art, aesthetics, or fashion. The balance of feeling and reason makes today's financial decisions especially wise.",
        "Your body is in balance today. Caring for your kidneys and skin matters most—drink plenty of water and go easy on stimulating foods.",
      ],
      [
        "Today Libra's usual indecision is replaced by a curious decisiveness, and you realize the answer has been within you all along. Trust that answer—the moment to act has ripened.",
        "Love today carries a heart-fluttering sense of balance, where giving and receiving are perfectly matched. Couples enjoy interactions of exceptionally high quality today.",
        "The workplace today suits negotiations, collaborations, or communications that call for balancing many sides. Your sense of fairness will leave every party feeling respected.",
        "Finances lean toward emotional investment today. An item or experience that brings you lasting joy, purchased now, will earn your repeated gratitude in the future.",
        "Today is perfect for a small luxurious treat—a refined meal or a soothing massage.",
      ],
      [
        "Today is a fine time for Libra to reflect and look inward. After weighing so much, give yourself a quiet stretch of time to hear the most honest voice within.",
        "Love today is well suited to sharing your deepest recent feelings with your partner. True intimacy begins with authentic self-expression.",
        "At work, today favors creative thinking and project planning. Your innate sense of beauty brings inspiration to how a project is presented.",
        "Finances today are a good time to review recent spending—figuring out which expenses truly brought a sense of value and which were just impulse.",
        "Your body reminds you today to care for your lower back. Do a simple set of back stretches to release the tension built up from sitting too long.",
      ],
    ],
    tomorrow: [
      [
        "Tomorrow your interpersonal luck is especially strong. Whether a business meeting, social gathering, or visit to old friends, tomorrow leaves a fine and lasting impression.",
        "Love tomorrow is gentle yet powerful. A clear declaration or gesture will move the relationship a big step forward.",
        "Tomorrow your command of aesthetics and quality at work earns recognition. Channel this innate taste into how a product or proposal is presented.",
        "Finances see slight fluctuation tomorrow—avoid large outlays, but small treat-yourself purchases will lift your happiness.",
        "Tomorrow keep warm, especially around the back and waist; Libra's kidney function needs extra care.",
      ],
      [
        "Tomorrow you are in a confident and composed state, meeting any situation with the utmost grace. This poise stirs admiration in those around you.",
        "Love tomorrow brings a deep conversation that satisfies both of you. Those feelings long bottled up have a chance to be expressed calmly tomorrow.",
        "At work tomorrow your proposal or idea draws high attention. Seize this moment in the spotlight to fully display the depth and breadth of your thinking.",
        "Tomorrow favors art collecting or high-quality purchases. Buying one truly beloved thing beats buying ten mediocre stand-ins.",
        "Tomorrow a calm mood is the best state of health. Meditation or savoring music helps preserve inner peace.",
      ],
      [
        "Tomorrow holds an important node linking past and future. Reconciling with an old memory or launching a long-term plan both enjoy the best energy tomorrow.",
        "Tomorrow your partner or a friend needs your company and support. Your very presence is a form of strength—just being there is enough.",
        "At work tomorrow there is no need to rush through everything. Find the single most important task and pour all your energy into it.",
        "Tomorrow let staying put be your financial strategy—observe rather than act, and make decisions only once market sentiment settles.",
        "Tomorrow spend a little while in nature. Even a short walk will effectively replenish your mental energy.",
      ],
    ],
    week: [
      [
        "This week Libra's fortunes shine especially in relationships and love. Plan your social calendar early in the week; midweek is the golden window when love and career blossom together.",
        "The love line this week is full of sweet moments worth remembering. Singles may meet someone truly captivating at one of this week's social events.",
        "At work this week your collaborative luck is exceptionally strong. A multi-party project advances smoothly under your coordination.",
        "Finances this week are blessed by Venus, with a boost to emotional spending—but keep your rational mind present too, making sure every outlay is worth it.",
        "Health this week focuses on skin and kidney care. Drink more water and keep a regular routine; beauty comes from the inside out.",
      ],
      [
        "This week Libra reaches a perfect expression of balance and harmony, as the scales within finally find their most comfortable point of rest. In this state, you resolve every challenge with the utmost grace.",
        "Love this week is like a soothing, heartfelt melody. This week is a wonderful time to deepen mutual understanding and trust.",
        "At work this week your taste and aesthetic sense earn you extra points. Weave your understanding of beauty into any occasion that calls for presentation.",
        "Finances climb steadily this week, favoring the acquisition of artworks, collectibles, or fine consumer goods.",
        "This week make enjoying beautiful things your daily energy refill—beauty is Libra's finest nourishment for the spirit.",
      ],
      [
        "This week Libra's aesthetic and humanistic flair dazzles on every occasion. Your artful handling of relationships leaves everyone in awe.",
        "Love this week moves at an elegant, composed pace. The genuine feeling that flows out naturally is the most touching of all.",
        "At work this week, cross-department or cross-team projects feel especially smooth. Your presence is the glue that holds the team together.",
        "Finances this week bring a small windfall. Watch for a return born of past goodwill.",
        "This week put elevating your overall lifestyle aesthetic on the agenda. A beautiful environment directly lifts your happiness and work efficiency.",
      ],
    ],
    month: [
      [
        "This month Libra reaches a full peak in love and relationships. Tend important bonds early on; midweek-style progress in both work and love arrives mid-month; and you close the month richly nourished by your connections.",
        "Love this month may be the best of the whole year, with every important relationship reaching a new height. Hold on to that sense of rightness and trust your inner judgment.",
        "At work this month your diplomatic talent and aesthetic taste become your greatest career assets. Mid-month an important collaboration opens a new dimension for your career.",
        "Finances this month are nourished through your connections. Gains from collaborations, introductions, or referrals will exceed expectations.",
        "Health this month most needs emotional balance. Guarding your inner calm is guarding your physical health.",
      ],
      [
        "This month Libra's theme is the courage to choose. Clarify your intentions early on, summon your courage mid-month, and by month's end savor the lightness and liberation that follow a decision made.",
        "Love this month calls for an honest conversation about the future. Standing in the same direction together will lift this month's romantic fortunes considerably.",
        "At work this month your knack for orchestration and your aesthetic taste work in tandem. Accept the challenge—you are more capable than you imagine.",
        "Finances this month turn on the keyword of value exchange. While focusing on growing your own worth, become skilled at turning that worth into reasonable income.",
        "Health this month emphasizes inner and outer balance. Ample hydration, regular exercise, and steady emotions—all three are indispensable.",
      ],
      [
        "This month Libra enters its loveliest stage of life amid elegance and composure. Every choice brims with wisdom, and every relationship carries a rare warmth.",
        "Love this month sees every heartfelt effort met with a genuine response. The texture of love rises to a new level this month.",
        "At work this month your shining moments come more than once. Let things unfold naturally, and the results are often the most satisfying.",
        "Finances this month are steady and improving overall. You find the perfect balance between prudent decisions and moderate enjoyment.",
        "This month make beautifying daily life part of your health management. A lovely environment has a marked positive effect on Libra's body and mind.",
      ],
    ],
  },

  scorpio: {
    today: [
      [
        "Today Scorpio's insight is like an X-ray, piercing the surface straight to the truth. This power helps you make precise judgments, avoid hidden traps, and spot opportunities others cannot see.",
        "Love today is full of depth and heat, and your allure springs from that mysterious, focused air. Couples find today's emotional exchange touching the soul; for singles, your penetrating gaze is your finest calling card.",
        "At work today you are suited to matters demanding deep analysis, investigation, or confidential negotiation. Your focus and insight are today's strongest professional weapons.",
        "Finances today come with unusually accurate intuition. Trust your inner judgment on investment decisions—today's financial instinct carries real energy behind it.",
        "Your body is full of energy today, well suited to high-intensity focused training. Sweat-inducing exercise helps expel the negative energy built up lately.",
      ],
      [
        "Today Pluto's transformative energy descends, placing Scorpio at an important node of metamorphosis. There is no need to resist the changes you feel within—you are growing into a stronger version of yourself.",
        "Love today has a powerful magnetic field, and between you and the other person lies a profound, wordless understanding. This tacit connection is the most precious gift in a relationship.",
        "At work today your eye is razor-sharp, spotting flaws and hidden risks in a project or plan at a glance. Voice your discoveries promptly.",
        "Finances today favor investigation-style investment research. Spend time digging deep into the fundamentals of one investment category.",
        "Today your body and mind are in a process of deep integration. Give yourself a quiet stretch of solitude.",
      ],
      [
        "Today is a sacred moment of inward exploration for Scorpio, well suited to meditation, journaling, or deep dialogue with yourself.",
        "Love today plays the theme of deep connection. A heart-to-heart, sincere conversation will become the most powerful moment in this relationship.",
        "At work today you are suited to independently completing tasks that demand intense focus, entering a state of flow.",
        "Finances today favor reexamining your long-term portfolio. A well-considered decision is far more valuable than frequent trading.",
        "Today remember to care for your body. After deep mental exertion, give your body enough nourishment and rest.",
      ],
    ],
    tomorrow: [
      [
        "Tomorrow is a fine time for truth to surface. A situation that has long puzzled you will come to light tomorrow in an unexpected way.",
        "Tomorrow love brings a profound, genuine connection. Say the most important words in your heart—the moment you have waited for has come.",
        "At work tomorrow a hidden opportunity awaits your active discovery. The very place others overlook holds the greatest value.",
        "Finances tomorrow favor research and assessment for long-term investing. Decisions made after deep investigation tend to be the steadiest.",
        "Tomorrow take care to protect your reproductive and urinary systems—drink more water and avoid overexertion.",
      ],
      [
        "Tomorrow your presence and influence reach a peak. Every word you say will be taken seriously, so seize this influence to do what matters most.",
        "Tomorrow a long-standing misunderstanding in love has a chance to be fully cleared up. Find the courage to face it, and the next stage of the relationship will be more solid.",
        "At work tomorrow a conversation with a key figure will have far-reaching impact. Prepare thoroughly and present your most authentic self.",
        "Tomorrow an investment category you have long watched shows a tempting signal. After careful assessment, a small test position is acceptable.",
        "Tomorrow you are full of energy, well suited to trying an exercise that leans toward willpower training.",
      ],
      [
        "Tomorrow is a fine time to store up energy. There is no need to rush to display or act—the power of deep, still waters is more awe-inspiring than a shallow rushing stream.",
        "Love tomorrow is best met with observation and feeling. Let the relationship develop naturally within safety; trust is the cornerstone of Scorpio's love.",
        "At work tomorrow a seemingly simple task hides important information. Handle it carefully and miss no detail.",
        "Finances tomorrow are uneventful. The fitting move is to draw up a list of financial goals for the next three to six months.",
        "Tomorrow is good for a deeply relaxing meditation or a hot soak, helping your body find true release from prolonged tension.",
      ],
    ],
    week: [
      [
        "This week Scorpio's fortunes are full of depth and power. Early in the week, sort out your inner self and set down old baggage; midweek your energy surges, with breakthroughs in both work and love; the weekend suits deep rest to store up strength for next week. The keyword this week is \"transformation\"—those who embrace change reap the greatest growth.",
        "Love this week is profound and moving. Couples deepen their trust through honest exchange; singles radiate a fatal allure this week, and one soul-deep conversation may open an unforgettable romance.",
        "At work this week your insight is a sharp blade, seeing through the surface straight to the core. Midweek brings a fine chance to display your professional strength—seize it, and you will earn the recognition you deserve.",
        "Finances this week run with hidden currents, holding chances for unseen income; meanwhile, take care not to make spending decisions driven by emotion. Tidy up your finances over the weekend and let the numbers serve you.",
        "This week tend to your lower back and pelvic area; if you sit long, get up and move every hour. Meditation and deep-breathing practice are especially good for Scorpio.",
      ],
      [
        "This week Scorpio brews a powerful transformative force in stillness. Your intuition is unusually keen this week, so any important decision can first listen to the voice deep within. Trust your judgment—it will not let you down.",
        "Love this week follows a low-then-high arc. The first half may bring inner struggle or doubt, but by the second half the clouds part, and you realize every twist was meant to make you both more certain.",
        "At work this week you may need to handle some thorny interpersonal issues. Scorpio is naturally skilled at finding the key thread in complex relationships. Stay calm and objective, and your approach will win respect.",
        "Finances this week favor steadiness; avoid high-risk financial decisions. There is a small return from a past investment—little by little it adds up.",
        "Health this week centers on sleep quality. Scorpio's recovery depends on deep rest, and creating a good sleep environment is more effective than any supplement.",
      ],
      [
        "This week Scorpio reaches a key period of deep clearing and fresh starts. Let go of relationships, habits, or beliefs that no longer serve you, making room for new energy. This courage will bring you unexpected freedom.",
        "Love this week may briefly tense the relationship as you set a necessary boundary, but in the long run this is the cornerstone of a healthy bond. Those who truly love you will respect your limits.",
        "At work this week, focus on the most central task. Scorpio's deep concentration delivers its greatest value now—one dive to the bottom beats ten shallow dips.",
        "This week is good for clearing financial drag: cancel unnecessary subscriptions and recover money you have lent out, making your cash flow clearer and more efficient.",
        "This week suits a detox or fasting plan. Scorpio's willpower is strong enough to sustain this deep cleanse, and the results will exceed expectations.",
      ],
    ],
    month: [
      [
        "This month Scorpio's overall fortunes are profound and powerful—the best month of the year for deep transformation and inner change. Early on, let go of old fixations; mid-month your energy erupts, suiting bold breakthroughs; by month's end you reach harvest and integration. Trust the process—you are undergoing a profound self-rebirth.",
        "Love this month moves through ups and downs toward a deeper connection. Early on, face your true feelings honestly; mid-month a deep exchange raises mutual understanding to a new height; by month's end love enters a stable, profound stage, and this soul-level connection is the most precious of all.",
        "At work this month your strategic vision and execution advance on parallel tracks. Around mid-month an important career opportunity surfaces—seize it with your customary deliberation and decisive action.",
        "Finances this month hold hidden depths: while steady income grows, a return from a past sound decision is about to materialize. Month's end suits a full financial review and next-quarter planning.",
        "Health this month centers on emotional management and endocrine balance, with regular exercise and ample sleep the best prescription. Starting a new exercise habit early in the month sets a good foundation for the whole month.",
      ],
      [
        "This month is a pivotal one for Scorpio to break from the cocoon, as the universe arranges a deep transformation from the inside out. Do not fear change—each layer of metamorphosis brings you closer to your truest, most powerful self.",
        "Love this month is dramatic yet sincere. A seemingly accidental encounter or conversation may completely change the course of your love life. Keep an open mind—fate's messages often hide in the most casual moments.",
        "Career development takes a major turn this month, as your professional ability and personal charisma peak at once. A key figure's recognition will open a new professional path.",
        "Finances this month turn on foreseeing the trend—position yourself early in fields others have not yet noticed, and you will see initial results in the latter half of the month.",
        "This month mind your nervous system. Meditation, tai chi, or any activity that quiets the mind is a fine remedy for Scorpio.",
      ],
      [
        "This month Scorpio has gathered enough strength in silence—it is time to release it. Your influence expands markedly this month; whether at work or in social settings, your presence cannot be ignored. Use this power well to advance what you truly care about.",
        "Love this month sees you move from confusion to certainty. Around mid-month a key emotional decision will make your romantic road ahead far clearer. Trust your intuition—it has never failed a Scorpio.",
        "At work this month your capacity for deep thought yields an impressive result, which may earn formal recognition by month's end. This is the best reward for your long focus and persistence.",
        "This month suits a strategic financial adjustment. Scorpio's keen sense of timing stands out especially in investing—seize the key window mid-month.",
        "This month you are full of energy but prone to overexertion. Set clear rest times for yourself; recovery is not unlimited, and those who rest well stay efficient over the long haul.",
      ],
    ],
  },
};

export const TW_TEMPLATES_4: T = {
  libra: {
    today: [
      [
        "今日金星為你的魅力錦上添花，天秤座天生的優雅與和諧感今日格外出眾。美好的事物如同磁鐵般向你聚攏。",
        "感情今日如同一幅精心構圖的油畫，和諧而美好。伴侶對你的欣賞達到新高度，單身者散發出令人著迷的氣質。",
        "工作上今日調解與協調能力超強，複雜的多方會議在你的主持下如魚得水，你的外交天賦今日全面釋放。",
        "財運今日與藝術、美學、時尚相關的投資或消費有特別的加持，感性與理性的平衡讓今日的財務決策格外明智。",
        "今日身體狀態均衡，腎臟和皮膚的保養尤為重要，多補充水分，少吃刺激性食物。",
      ],
      [
        "今日天秤座的優柔寡斷將被一種奇妙的決斷力所取代，你發現內心其實早已有了答案。相信這個答案，行動的時機已經成熟。",
        "愛情今日有一種令人心動的平衡感，給予與接受都恰到好處。已戀愛者今日的互動品質極高。",
        "職場今日適合處理需要多方平衡的談判、合作或溝通任務，你的公平感將讓各方都感到被尊重。",
        "財運今日偏向感性投資，一件能給你長期帶來愉悅感的物品或體驗，今日購入會讓你在未來多次感謝自己。",
        "今日適合一次輕奢的自我犒賞——一頓精緻的餐點、一次舒適的按摩。",
      ],
      [
        "今日是天秤座思考與內省的好時機，在權衡了太多之後，給自己一段安靜的時間，聽聽內心最真實的聲音。",
        "感情今日適合和伴侶分享近期內心深處的感受，真正的親密關係始於真實的自我表達。",
        "工作上今日適合創意思考和方案規劃，你天生的美感會為專案的呈現方式帶來靈感。",
        "財運今日適合回顧近期的消費，找出哪些花費真正帶來了價值感，哪些只是一時衝動。",
        "今日身體提醒你注意腰部保養，做一套簡單的腰部伸展操，釋放久坐累積的壓力。",
      ],
    ],
    tomorrow: [
      [
        "明日人際運勢特別好，無論是商務會面、社交聚會還是拜訪故友，明日都會留下良好而深刻的印象。",
        "明日感情運勢溫柔而有力，一個明確的表態或舉動會讓雙方關係向前邁進一大步。",
        "明日工作中對美學與品質的把握會得到認可，把這份天生的品味用在產品或方案呈現上。",
        "明日財運有輕微波動，避免大額支出，但小額的犒賞自己類消費會提升幸福指數。",
        "明日注意保暖，尤其是背腰部位，天秤座的腎功能需要格外照顧。",
      ],
      [
        "明日你處於一種自信而從容的狀態，面對任何局面都能以最優雅的方式應對，這種氣質讓身邊的人心生傾慕。",
        "明日感情上有一次令雙方都滿意的深度溝通，那些積壓在心底的感受，明日有機會以平和的方式表達出來。",
        "明日職場上你的提案或創意將得到高度關注，把握這次曝光機會，充分展示你思考的深度與廣度。",
        "明日有利於藝術類收藏或高品質消費，買一件真正喜歡的好東西，好過買十件將就的普通品。",
        "明日情緒的平靜是最好的健康狀態，冥想或欣賞音樂有助於保持內心安寧。",
      ],
      [
        "明日有一個連接過去與未來的重要節點，一段往事的和解或一個長期計畫的啟動，都在明日有最好的能量支持。",
        "明日伴侶或朋友需要你的陪伴和支持，你的存在本身就是一種力量，只要在就好。",
        "明日工作上不必急於完成所有事情，找出最重要的一項，把所有精力投入。",
        "明日理財動作上以按兵不動為策略，觀察為主，在市場情緒平穩後再做決策。",
        "明日多在自然環境中待一會兒，哪怕是一段短短的散步，都能有效補充你的精神能量。",
      ],
    ],
    week: [
      [
        "本週天秤座的運勢在人際與感情方面尤為亮眼。週初做好本週人際規劃，週中是感情和職場同步開花的黃金時段。",
        "本週感情線上充滿了值得銘記的甜蜜瞬間，單身者在本週的某一次社交活動中遇到真正心動的人。",
        "職場上本週合作運勢極強，一個多方合作的專案在你的協調下順利推進。",
        "本週財運受金星庇護，感性消費有加持，但理性大腦也要在場，確保每一筆支出都物有所值。",
        "本週健康關注皮膚和腎臟保養，多喝水、規律作息，美麗由內而外。",
      ],
      [
        "本週天秤座迎來平衡與和諧的完美體現，內心的那桿秤終於找到了最舒適的平衡點。在這種狀態下，你都能以最優雅的方式化解挑戰。",
        "本週感情運勢如一首舒緩而深情的樂曲，本週是加深感情理解和信任的絕佳時機。",
        "本週職場上你的品味和審美帶來了工作上的加分，在需要呈現的場合把你對美的理解融入其中。",
        "本週財運平穩上行，有利於進行藝術品、收藏品或優質消費品的添置。",
        "本週把享受美好事物作為日常能量補給，美是天秤座最好的精神食糧。",
      ],
      [
        "本週天秤座的美學與人文氣質在各個場合大放異彩，你處理人際關係的藝術感讓所有人讚歎。",
        "本週感情節奏優雅從容，自然流露的真情反而是最動人的。",
        "本週工作上處理跨部門或跨團隊的專案格外順手，你的存在是團隊的黏合劑。",
        "本週財運有一個小小的意外之財，留意來自過去善意的回饋。",
        "本週把整體生活美學的提升列入日程，環境的美好會直接提升你的幸福感和工作效率。",
      ],
    ],
    month: [
      [
        "本月天秤座迎來感情與人際運勢的全面高峰，月初整理重要關係；月中在工作和感情上同步出現令人振奮的進展；月末帶著豐盈的人際滋養。",
        "本月感情運勢堪稱全年之最，每一段重要的感情關係都在本月迎來昇華。把握住那種對了的感覺，相信你的內心判斷。",
        "本月職場上你的外交才能和審美品味成為最大的職業優勢，月中一個重要的合作機會將為你的職業發展打開新的維度。",
        "本月財運在人際連接中得到滋養，來自合作、介紹或推薦的收益將超出預期。",
        "本月健康上最需要關注的是情緒的平衡，維護好內心的平靜就是維護好身體的健康。",
      ],
      [
        "本月天秤座的主題是勇於選擇，月初清晰意圖，月中鼓起勇氣，月末享受決斷後的輕盈與解放。",
        "本月感情中需要有一次關於未來的坦誠對話，兩個人站在同一方向上會讓本月的感情運勢大幅上揚。",
        "本月職場上你的統籌協調能力和美學品味聯動發力，接受挑戰，你比自己想像的更有能力。",
        "本月財運的關鍵詞是價值交換，在專注自身價值提升的同時，也要善於把這份價值轉化為合理的收入。",
        "本月健康注重內外平衡，充足的水分攝取、規律的運動和穩定的情緒三者缺一不可。",
      ],
      [
        "本月天秤座在優雅與從容中迎來最美好的人生階段，每一次選擇都充滿了智慧，每一段關係都透著難得的溫暖。",
        "本月感情上每一次用心都得到了真實的回應，愛情的質感在本月提升到一個新的層次。",
        "本月職場的高光時刻不止一次，順其自然，結果往往最令人滿意。",
        "本月財運整體平穩向好，在審慎決策和適度享受之間找到完美平衡點。",
        "本月把日常生活的美化列為健康管理的一部分，環境美好對天秤座的身心健康有顯著正面影響。",
      ],
    ],
  },

  scorpio: {
    today: [
      [
        "今日天蠍座的洞察力如同X射線，穿透表象直抵真相。這種能力將幫助你做出精準判斷，避開潛在陷阱，發現別人看不到的機會。",
        "感情今日充滿深度與熱度，你的吸引力來自那種神祕而專注的氣質。已戀愛者今日的情感交流將觸及靈魂深處；單身者深邃的眼神就是你最好的名片。",
        "工作上今日適合處理需要深度分析、調查研究或保密談判的事務，你的專注和洞察是今日最強的工作武器。",
        "財運今日直覺特別準，在投資決策上相信內心的判斷，今日的財務直覺有真實的能量加持。",
        "今日身體能量充沛，適合高強度的專注型訓練，排汗運動有助於排出近期累積的負能量。",
      ],
      [
        "今日冥王星的轉化能量降臨，天蠍座處於一個重要的蛻變節點。感受到內心的變化不必抗拒，那是你在成長為更強大版本的自己。",
        "愛情今日磁場強烈，你和對方之間存在一種無需言語的深刻理解，這種默契感是感情中最珍貴的禮物。",
        "職場上今日眼光犀利，一下子就能看出專案或方案中的漏洞和隱患，把發現及時表達。",
        "財運今日有利於深度調查型的投資研究，花時間深挖一個投資品類的基本面。",
        "今日身心都處於深度整合的過程中，給自己一段安靜的獨處時間。",
      ],
      [
        "今日對天蠍座而言是一個向內探索的神聖時刻，適合冥想、寫日記或進行深度的自我對話。",
        "感情今日以深度連接為主旋律，一次掏心掏肺的真誠對話，將成為這段感情中最有力量的時刻。",
        "工作上今日適合獨立完成需要高度專注的任務，進入心流狀態。",
        "財運今日適合重新審視長期投資組合，深思熟慮的決策遠比頻繁操作更有價值。",
        "今日記得照顧自己的身體，在深度精神消耗之後，給身體提供足夠的營養和休息。",
      ],
    ],
    tomorrow: [
      [
        "明日是揭示真相的好時機，一個一直讓你困惑的情況，明日將以意想不到的方式水落石出。",
        "明日感情上有一次深刻而真實的連接，說出你心裡最重要的那句話，你等待的時機已經到來。",
        "明日工作中有一個隱藏的機會需要你主動發掘，別人視而不見的地方，恰恰藏著最大的價值。",
        "明日財運有利於長期投資的研究和評估，深度調查後的決策往往是最穩健的。",
        "明日注意保護生殖和泌尿系統，多喝水，避免過度勞累。",
      ],
      [
        "明日你的存在感和影響力達到峰值，你說的每一句話都會被認真對待，把握這份影響力做最重要的事。",
        "明日感情中一個長期的誤解有機會被徹底澄清，拿出勇氣直面它，關係的下一個階段將更加堅實。",
        "明日工作上與關鍵人物的一次對話將產生深遠的影響，充分準備，以最真實的自我呈現。",
        "明日一個長期關注的投資品類出現令人心動的訊號，仔細評估後可以小倉位試探。",
        "明日精力充沛，適合嘗試一種偏向意志力訓練的運動。",
      ],
      [
        "明日是蓄積能量的好時機，不必急於展示或行動，深水靜流的力量比淺灘急流更令人敬畏。",
        "明日感情上以觀察和感受為主，讓關係在安全中自然發展，信任感是天蠍座感情的基石。",
        "明日工作中一件看似簡單的任務背後隱藏著重要訊息，仔細處理，不要放過任何細節。",
        "明日財運平淡，適合的操作是整理一份未來三至六個月的財務目標清單。",
        "明日適合進行一次深度放鬆的冥想或熱水浸泡，幫助身體從長期的高度緊繃中獲得真正的放鬆。",
      ],
    ],
    week: [
      [
        "本週天蠍座的運勢充滿深度與力量，週初整理內心，放下舊包袱；週中能量湧現，在工作和感情上都有突破；週末適合深度休息，為下週蓄力。本週的核心詞是「蛻變」，擁抱變化的人將收穫最大的成長。",
        "本週感情運勢深邃而動人，已戀愛者與伴侶的感情在坦誠交流中走向更深層的信任；單身者本週散發致命吸引力，一次深入靈魂的對話可能開啟一段刻骨銘心的感情。",
        "本週職場上你的洞察力是一把利劍，能看穿表象直達核心。週中有一個展示專業實力的好機會，把握住，你將獲得應有的認可。",
        "本週財運暗流湧動，有隱性收入的機會，同時注意不要在情緒驅動下做消費決策。週末梳理財務，讓數字為你服務。",
        "本週注意腰部和骨盆區域的保養，久坐者每小時起身活動。冥想和深呼吸練習對天蠍座特別有益。",
      ],
      [
        "本週天蠍座在沉靜中醞釀著強大的蛻變力量，你的直覺在本週格外敏銳，任何重要決定都可以先聽一聽內心深處的聲音。信任自己的判斷力，它不會讓你失望。",
        "本週感情運勢呈現先抑後揚的走勢，前半週可能經歷一些內心的掙扎或懷疑，但後半週雲開霧散，你會發現所有的波折都是為了讓彼此更加確定。",
        "本週工作上可能需要處理一些棘手的人際問題，天蠍座天生擅長在複雜關係中找到關鍵線索。保持冷靜和客觀，你的處理方式將贏得尊重。",
        "本週財運以穩健為主，不宜做高風險的財務決策。有來自過去投資的小額回報，積少成多。",
        "本週健康重點在睡眠品質，天蠍座的恢復力依賴深度休息，創造良好的睡眠環境比任何保健品都更有效。",
      ],
      [
        "本週天蠍座迎來深度清理與重新出發的關鍵時期，放下不再服務於你的關係、習慣或信念，為新的能量騰出空間。這份勇氣將為你帶來意想不到的自由。",
        "本週感情上一次必要的界限設定可能讓關係短暫緊張，但長遠來看這是健康關係的基石。真正愛你的人會尊重你的邊界。",
        "本週工作中專注於最核心的任務，天蠍座的深度專注力在此時發揮最大價值，一次深入到底比十次淺嘗輒止更有效。",
        "本週適合清理財務上的拖累，取消不必要的訂閱，回收外借款項，讓資金流動更清晰高效。",
        "本週適合進行一次排毒或斷食計畫，天蠍座的意志力足以支撐這種深度清潔，效果將超出預期。",
      ],
    ],
    month: [
      [
        "本月天蠍座整體運勢深邃而有力，是全年中最適合進行深度蛻變和內在轉變的月份。月初適合放下舊有執念；月中能量爆發，適合大膽突破；月末迎來收穫與整合。信任這個過程，你正經歷一場深刻的自我重生。",
        "本月感情運勢起伏中走向更深層的連接。月初坦誠面對感情中的真實感受；月中一次深入的交流讓彼此的理解達到新高度；月末感情進入穩定而深刻的階段，這種靈魂級別的連接是最珍貴的。",
        "本月職場方面你的戰略眼光和執行力雙線並進，月中旬一個重要的職業機會浮出水面，用你一貫的深思熟慮和果斷行動去把握它。",
        "本月財運暗藏玄機，正財穩定增長的同時，有一筆來自過去正確決策的回報即將兌現。月末適合做一次全面的財務復盤和下季度規劃。",
        "本月健康重點在情緒管理和內分泌平衡，規律的運動和充足的睡眠是最好的處方。月初開始一項新的運動習慣將為全月奠定良好基礎。",
      ],
      [
        "本月對天蠍座而言是破繭成蝶的關鍵月份，宇宙為你安排了從內到外的深度變革。不要害怕改變，每一層蛻變都在讓你更接近最真實、最有力量的自己。",
        "本月感情運勢充滿戲劇性但不乏真誠，一次看似意外的相遇或對話可能徹底改變你的感情軌跡。保持開放的心態，命運的訊息往往藏在最不經意的瞬間。",
        "本月職業發展出現重大轉機，你的專業能力和人格魅力同時達到峰值，一個關鍵人物的認可將打開新的職業通道。",
        "本月財運的關鍵在於洞察先機，在別人還沒注意到的領域提前佈局，中下旬將看到初步成效。",
        "本月注意神經系統健康，冥想、太極或任何能讓大腦安靜的活動都是天蠍座的良藥。",
      ],
      [
        "本月天蠍座在沉默中積蓄了足夠的力量，是時候讓它釋放出來了。你的影響力在本月顯著擴大，無論是職場還是社交場合，你的存在感都不可忽視。善用這份力量，推動你真正在乎的事。",
        "本月感情運勢上你將經歷一段從迷茫到堅定的過程，月中前後一個關鍵的情感決定將讓未來的感情道路更加清晰。相信直覺，它從未辜負天蠍座。",
        "本月職場上你的深度思考能力產出了一份令人印象深刻的成果，可能在月末得到正式認可。這是對你長期專注和堅持的最好回報。",
        "本月適合做一次戰略性的財務調整，天蠍座對時機的敏銳判斷在投資領域尤為突出，把握好月中的關鍵窗口。",
        "本月精力旺盛但容易過度消耗，給自己設定明確的休息時間，恢復力不是無限的，善於休息的人才能持續高效。",
      ],
    ],
  },
};

export const EN_TITLES_4: Ti = {
  libra: {
    today: ["Charm on the Rise", "Decisiveness Meets Grace", "A Day of Reflection and Balance"],
    tomorrow: ["Relationships Flourish", "Confident and Composed", "Linking Past and Future"],
    week: ["A Week Rich in Both Bonds and Love", "A Perfect Picture of Balance and Harmony", "Aesthetic Flair Shines Bright"],
    month: ["A Month of Peak Romantic Fortune", "A Month of Bold Choices", "A Graceful, Composed Harvest"],
  },
  scorpio: {
    today: ["Insight Like an X-Ray", "A Moment of Transformation Arrives", "A Sacred Time to Look Within"],
    tomorrow: ["Truth About to Surface", "Influence at Its Peak", "Gathering the Power of Still Waters"],
    week: ["A Week of Depth and Power", "Intense Inner Awakening", "Both Focus and Depth Pay Off"],
    month: ["A Month of Profound Transformation", "Courage and Wisdom Side by Side", "Deep Power Perfectly Expressed"],
  },
};

export const TW_TITLES_4: Ti = {
  libra: {
    today: ["魅力值飆升", "果斷與優雅並存", "內省與平衡的一天"],
    tomorrow: ["人際運勢大好", "自信從容的狀態", "連接過去與未來"],
    week: ["本週人際與感情雙豐收", "平衡與和諧的完美體現", "美學氣質大放異彩"],
    month: ["本月感情運勢全面高峰", "勇於選擇之月", "優雅從容的收穫期"],
  },
  scorpio: {
    today: ["洞察力如X射線", "蛻變時刻降臨", "向內探索的神聖時刻"],
    tomorrow: ["真相即將揭曉", "影響力達到峰值", "蓄積深水靜流的力量"],
    week: ["本週深度與力量並存", "強烈內在覺醒", "專注與深度雙豐收"],
    month: ["本月深刻蛻變", "勇氣與智慧並駕", "深度力量完美展現"],
  },
};
