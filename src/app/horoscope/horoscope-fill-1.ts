import type { ZodiacId, TimePeriod } from "./horoscope-data";
type T = Partial<Record<ZodiacId, Partial<Record<TimePeriod, string[][]>>>>;
type Ti = Partial<Record<ZodiacId, Partial<Record<TimePeriod, string[]>>>>;

export const EN_TEMPLATES_1: T = {
  aries: {
    today: [
      [
        "Mars energy runs high today, and your drive reaches its peak. You can swiftly find a way through any challenge, but be careful not to overlook details in your eagerness — moving fast while staying steady is today's best strategy.",
        "Romance is full of passion and vitality, and your enthusiasm is contagious. Singles enjoy strong attraction today, and taking the initiative may bring unexpected rewards; for those attached, a spontaneous romantic gesture will warm the relationship considerably.",
        "Your thinking is clear and your execution strong at work, making today ideal for pushing forward projects that demand boldness. Your superiors are impressed by your performance, but remember to stay in communication with your team.",
        "Your finances lean toward the favorable, making it a good time for small investment attempts in fields you know well. Unexpected income is possible, but protecting existing gains matters more than rushing ahead.",
        "Your energy is abundant, making it a great time for exercise. Be careful to avoid muscle strains from high-intensity workouts, and warm up thoroughly before exercising.",
      ],
      [
        "The cosmic energy resonates with you today, and your mind opens up like a blooming galaxy. When you hit a difficulty, looking at it from a different angle often reveals an unexpected way out, with inspiration especially strong in the afternoon.",
        "A subtle chemistry is brewing in love, and a casual meeting of eyes could open a new chapter. Those in relationships should listen to their partner's needs — tonight is the best time for a heart-to-heart talk.",
        "Your ideas win recognition at work, and the resistance to pushing your plans forward eases. Use today's good relations to expand your network; a new opportunity for collaboration is quietly emerging.",
        "Your financial awareness is heightened, making it a good day to sort out bills and plan spending. A small pleasant surprise may arrive — perhaps a refund, rebate, or little reward.",
        "You feel mentally refreshed; watch out for eye strain from overuse, and a few minutes of eye-relaxation exercises before bed will help you sleep well.",
      ],
      [
        "Today carries a mildly auspicious tone, with a well-balanced rhythm to life. Your investment in personal growth begins to show early results — when confusion arises, trust your intuition, and don't force matters forward before the time is right.",
        "Romance takes on a warm hue, where companionship outshines sweet talk. Singles should keep an open mind; affinity often arrives quietly once you let go of attachment.",
        "In your career, steadiness beats rushing forward — handling the tasks at hand well is more valuable than chasing quick results. A long-shelved task may see progress today.",
        "On finances, hold back rather than spend, and avoid impulsive purchases. Check whether any bills are due, and it's never too late to start the habit of tracking expenses today.",
        "Your physical condition is good and suits a light diet. Drink plenty of water, keep a regular schedule, and give your body ample time to recover.",
      ],
    ],
    tomorrow: [
      [
        "Jupiter's auspicious light shines on your destiny tomorrow — seize every opportunity to expand. Plan out tomorrow's priorities in advance, and meet new possibilities in your best state.",
        "Romantic fortune rises tomorrow, with affinity quietly drawing you together. Stay sincere and open; whether reuniting with old friends or meeting new people, surprises may come.",
        "An important decision point arrives at work tomorrow — prepare fully and weigh the pros and cons before acting, and your success rate will rise considerably.",
        "Finances fluctuate slightly tomorrow, making it suitable for steady financial planning and approaching higher-risk investments with caution.",
        "Tomorrow, take care of your neck and shoulders; if you sit for long stretches, remember to get up and move every hour.",
      ],
      [
        "Tomorrow is a good time to recharge and gather strength, ideal for organizing your thoughts and planning the next phase. A big-picture perspective will help you make the right call at the crucial moment.",
        "An opportunity to deepen a bond appears tomorrow — actively caring for those around you will earn sincere responses, and warmth quietly grows in the relationship.",
        "At work tomorrow, it's a good time to organize project progress and report results upward. Show your systematic thinking and execution to raise your standing in your leader's eyes.",
        "There are signs of small unexpected income tomorrow — perhaps a forgotten rebate or money repaid by a friend. Overall finances are steady, and keeping things as they are is best.",
        "Your energy is ample tomorrow, and outdoor activity will help release recently built-up stress — an evening walk or jog is recommended.",
      ],
      [
        "The Moon's transit brings delicate intuitive feelings tomorrow — trust the voice deep within. Rest early tonight to let your mind fully recharge.",
        "The quality of your interactions with your partner or family is high tomorrow; avoid bringing work emotions home. A dinner cooked together will bring you closer.",
        "Disagreements may arise at work tomorrow — stay calm and let the facts speak; your clear logic will resolve potential conflict.",
        "Spending impulses run strong tomorrow. Before buying, ask yourself: do I need it? Is it worth the price? Will I still be grateful for this purchase a month from now?",
        "Sleep quality is key tomorrow — avoid scrolling your phone before bed, and meditation or belly breathing will help you fall asleep quickly.",
      ],
    ],
    week: [
      [
        "Overall fortune is steady and improving this week, with an important turning point arriving midweek. Mars injects sustained drive into you, and any long-shelved plan is suited to being reactivated this week. The weekend is good for recharging and resting to gather strength for the next phase.",
        "Your love line rises and falls with rhythm this week; small misunderstandings in the first half may need timely communication to resolve, and romantic fortune warms after Thursday. Singles get a clear boost in affinity from weekend social activities.",
        "Career fortune trends upward overall — set your core goals for the week on Monday, and your execution efficiency will let you achieve twice the result with half the effort. Communication with superiors or clients flows especially smoothly on Wednesday.",
        "Finances are steady this week, with the possibility of small unexpected gains. Avoid large purchases on the weekend; set a budget ceiling before shopping to prevent impulse buys.",
        "Health is generally good this week, though you may feel slightly tired midweek — be careful not to stay up late. Schedule a soothing workout on the weekend to help your body relax deeply.",
      ],
      [
        "The cosmic energy this week helps restart things that have long been stalled, and interpersonal relationships flow especially smoothly. Seize the chance to prioritize and advance the most important matters this week.",
        "Romantic fortune clearly improves this week — those in relationships deepen their rapport with their partner, while singles have a far greater chance of meeting someone special through a friend's introduction or an interest-based community. Sincerity is the best sweet talk.",
        "Your popularity index is high at work this week — use this goodwill to advance collaborations or secure resources. A long-awaited piece of good news may arrive this week.",
        "Finances are blessed by Jupiter this week, your investment decisions are fairly clear, and it's suitable to assess your medium- to long-term portfolio. A return from past effort is about to land in your pocket.",
        "Your physical condition is excellent this week, making it the golden time to build an exercise habit. Even 15 minutes of activity a day will bring visible change.",
      ],
      [
        "This week is a period of both introspection and breakthrough for Aries. The first half suits organizing your thoughts and reviewing how your plans are being carried out; in the second half, your energy rises, suiting bold advancement. Stay patient — you're on the right path.",
        "Romantic fortune is gentle and stable this week; small frictions in an existing relationship dissolve after honest communication. Love needs to be nourished by small thoughtful gestures in daily life.",
        "Your work focus this week is on consolidating existing results — there's no need to rush into opening new fronts. Focus on delivering high-quality work, and your care will earn the recognition it deserves.",
        "Finances show steady growth this week — be careful to check for any overlooked fixed expenses and prepare a monthly budget. The principle is to experiment with spare money and never touch the principal.",
        "Keeping a regular routine and diet this week is more effective than any supplement; regular deep-breathing exercises will help ease tension.",
      ],
    ],
    month: [
      [
        "Aries' overall fortune trends upward all month, making it one of the most worthwhile high points of the year. Early in the month is good for clearing old burdens; an energy burst arrives around mid-month; and the month's end is a time for harvest and celebration. Those bold enough to forge ahead are sure to gain.",
        "Romantic fortune is sweeping this month. Early on, use good communication opportunities to defuse hidden troubles; mid-month, romantic fortune rises sharply, making it a prime time for singles to begin a new relationship; at month's end, it's good to make some long-term plans for the two of you.",
        "Your career improves through ups and downs this month. Early on, finish the unfinished business at hand; mid-month, seize the window to negotiate a promotion or raise; at month's end, review your gains and losses well to gather momentum for the next month.",
        "Wealth fortune trends upward overall this month, with both earned and windfall income advancing in tandem from mid-month to month's end. You may consider moderately increasing your investment proportion — but always put risk control first.",
        "Health is generally fine this month, but pay special attention to sleep quality early on. Your energy peaks mid-month, a good time to build a new fitness habit; at month's end, take in more vitamin C and fresh produce.",
      ],
      [
        "This month is full of opportunity and change for Aries. An important decision early in the month will set the tone for the whole month; the peak period mid-month is the best window to advance major plans; and month's end is good for taking stock of your gains and adjusting your state for the next month.",
        "Romantic fortune rises and falls but trends upward overall this month. Early on, singles have plenty of chances to take the initiative; mid-month is the key moment for warming feelings; at month's end, the relationship steadies, with mutual respect and tolerance being the best recipe for sustaining it.",
        "Your creativity and execution resonate in sync at work this month — seize the chance to perform mid-month and present your best plan in the clearest way for an extremely high success rate.",
        "The key to finances this month is seizing opportunities — while earned income grows steadily, windfall chances are also quietly brewing, so keep a sharp financial instinct.",
        "The health risk this month lies in mental overwork and unstable sleep. It's suggested you schedule at least 30 minutes of screen-free time each day to let your mind go completely blank.",
      ],
      [
        "Aries enjoys a perfect duet of thought and action this month, with eloquence, creativity, and execution all peaking at once. Ride this favorable wind, and you'll reap satisfying gains in both career and personal growth.",
        "Romance brings surprise after surprise this month — your personal charm reaches its yearly peak, drawing attention in all kinds of settings. Take the initiative; the matchmaker's thread is tied especially tight this month.",
        "Your career fortune erupts on all fronts this month, and you may receive an exciting piece of good news at month's end, bringing it to a perfect close.",
        "Financial fortune shows steady growth this month, and making good use of every gain is this month's test of your financial wisdom.",
        "Health fortune is generally good this month — keep a regular routine and pay attention to caring for your digestive system.",
      ],
    ],
  },

  taurus: {
    today: [
      [
        "Venus's gentle light envelops you today, and Taurus's innate aesthetic sense and taste shine brilliantly. Whether in work or life, your pursuit of beautiful things will bring tangible rewards today. Enjoy the present — this abundance within tranquility is the best blessing.",
        "Romance is full of warmth and sweetness today, and your thoughtfulness and patience make your partner feel utterly at ease. Those in relationships can arrange an exquisite dinner or quiet time together today; for singles, your steadiness and reliability are your greatest charm.",
        "Work moves forward steadily today, and your down-to-earth attitude and detail-oriented approach produce high-quality results. Don't rush or fret — go at your own pace.",
        "Finances hold a small surprise today, perhaps from an investment payout settling or a friend repaying a loan. Spending on fine food and beautiful things brings special satisfaction today.",
        "Today suits gentle exercise — yoga or a walk will restore your vitality in comfort. Take care of your throat and drink plenty of warm water.",
      ],
      [
        "Taurus is in a state of comfort and certainty today, with a grounded sense of conviction about the future deep within. Trust this feeling — it comes from the judgment you've built up over time. Today suits matters related to long-term planning.",
        "In love today, a sincere expression from the heart will move your partner deeply. Taurus isn't one for sweet talk, but every word you speak is well-considered and carries real weight.",
        "Your proposal or suggestion will be valued at work today, because you can always find the key detail others overlook — this rigor is your most precious professional asset.",
        "Finances today suit reviewing your long-term financial plan to ensure your asset allocation aligns with your long-term goals. Steady investments receive special support today.",
        "Schedule yourself a stretch of high-quality leisure today — soak in a comfortable hot bath and set the mood with essential oils or candles to reward your body and mind.",
      ],
      [
        "Today is a good time for Taurus to settle and feel — slow down and savor the beautiful details of life that get overlooked in the rush. A good cup of tea, a ray of sunlight, a piece of soft music — all are today's best sources of energy.",
        "Love today needs no deliberate effort; quiet companionship is the best language of love. Sharing a stretch of silence that needs no words actually brings two hearts closer.",
        "Work today suits organizing and optimizing — give your previous results a systematic archiving and review to lay a more solid foundation for the next phase.",
        "Finances today suit recording and planning income and expenses; clear numbers give Taurus a sense of control, and that very sense of control leads to better financial decisions.",
        "Pay attention to the quality of your food today — there's no need to chase the expensive, as simple cooking with fresh ingredients best satisfies Taurus's palate and physical needs.",
      ],
    ],
    tomorrow: [
      [
        "Venus brings an encounter related to beauty and love tomorrow — a person or thing that lights up your eyes will appear, so notice the presences around you that radiate warmth.",
        "A warm signal awaits you in love tomorrow, perhaps a caring word or a thoughtful gesture. Respond with your usual gentleness, and affection grows within that very interaction.",
        "A task requiring aesthetic judgment lands on your shoulders at work tomorrow — this is exactly Taurus's strongest domain, so show off your taste generously.",
        "Finances rise slightly tomorrow, and a delayed payment may arrive. On spending, tomorrow suits adding a quality item to your home environment.",
        "Take care of your neck and throat tomorrow and keep up adequate water intake — Taurus's voice needs extra care.",
      ],
      [
        "Your persistence and patience will earn better-than-expected rewards tomorrow — a long-invested project or relationship shows a delightful turn, and persistence never fails Taurus.",
        "The topic of \"security\" surfaces in love tomorrow — have a sincere conversation with your partner about future plans to clarify each other's expectations and commitments.",
        "Your professionalism and dependable style impress colleagues at work tomorrow, and a task requiring steady execution may be assigned to you — exactly your chance to shine.",
        "Finances tomorrow suit making a small adjustment to a regular investment; accumulating little by little is Taurus's most skilled wealth philosophy.",
        "Tomorrow suits recharging in a quiet natural setting — greenery, flowing water, and fresh air are Taurus's best energy stations.",
      ],
      [
        "Tomorrow suits doing something you've long wanted to do but found \"not practical enough\" — Taurus's pragmatism can sometimes make you miss pure joy, so allow yourself to indulge tomorrow.",
        "A small surprise in love tomorrow will make your partner feel especially happy — it needn't be grand; a single flower or a box of fine chocolate is enough.",
        "Slow your work pace moderately tomorrow; you needn't pursue perfection in everything, as finishing beats perfecting — leave some room for refinement later.",
        "Spend sensibly tomorrow and avoid impulsively buying things you don't really need during sales — Taurus's financial wisdom needs to come into play at moments like these.",
        "Play some soothing music before bed tomorrow to let body and mind relax at the same time — good sleep is the cornerstone of Taurus's good state.",
      ],
    ],
    week: [
      [
        "Taurus's fortune is steady and rising this week, and Venus's energy gilds both your life and your relationships with a warm golden glow. Make your plan early in the week, advance steadily through the middle days, and give yourself high-quality relaxation on the weekend. This week's most important gain may come from an unexpected recognition or reward.",
        "Romantic fortune is warm and sweet this week — those in relationships feel love deepen through everyday companionship; singles have a high chance of meeting someone on the same wavelength in a comfortable setting, so there's no need to socialize deliberately — just being your best self is enough.",
        "Your execution delivers steadily at work this week, and an important milestone result is completed. Your reliability and professionalism set your team and leader at ease — the most precious of workplace assets.",
        "Financial fortune keeps improving this week, with steady growth from earned income and small windfall surprises. Investing in a quality life is more than worth it this week — investing in yourself is the best finance.",
        "Health this week focuses on the throat and thyroid, and staying in good spirits is the best care. Taurus's response to stress tends to show in the throat, so learn to relax and express yourself.",
      ],
      [
        "Taurus arrives at a satisfying harvest period amid steadiness this week — every bit of past persistence and effort shows its value in a concrete way this week. Savor this grounded joy; it deserves to be taken seriously.",
        "There's a warm and grounded development in love this week — it needs no grand ceremony; a thoughtfully prepared dinner or a stretch of quality time together is this week's best emotional nourishment.",
        "Your patience and focus produce a high-quality work result this week, which may earn formal recognition or praise on Friday — enjoy this well-deserved honor.",
        "Finances are steady this week, suiting a steady investment or savings adjustment — allocate this week's gains wisely so they keep working for you in the future.",
        "Treat improving your living environment as an investment in health and mood this week — tidy a corner, add a potted plant, or switch to comfortable bedding. Beautifying your surroundings has an immediate positive effect on Taurus's body and mind.",
      ],
      [
        "Taurus has found the way forward that suits you best within a steady rhythm this week — there's no need to compare your speed with others, for your pace is the best pace. Every small step this week builds strength for a great leap in the future.",
        "Romantic fortune is stable and warm this week — both of you build deeper trust and rapport in daily life, and this happiness within calm is the most lasting kind.",
        "Focus on one core task at work this week and do it to perfection — this brings higher satisfaction and professional value than handling many tasks at once.",
        "This week suits reallocating idle funds to find that optimal balance between return and risk — Taurus's innate financial instinct will give you the right guidance at the crucial moment.",
        "The focus of health management this week is dietary quality — choose fresh, natural, lightly processed ingredients to raise your body's energy level from the source of your food.",
      ],
    ],
    month: [
      [
        "Taurus's overall fortune climbs steadily this month, and Venus's blessing draws all beautiful things toward you. Early in the month, tidy your home and inner space to make room for new energy; mid-month, love and finances rise together in a season of harvest; at month's end, set higher quality standards for the next month with a heart full of results and gratitude.",
        "Romantic fortune is as sweet as honey this month, with both the sweetness and depth of love rising in tandem. Early on, an honest conversation clears the last doubt in your heart; mid-month, the beautiful times shared become precious memories for you both; at month's end, your relationship enters its most comfortable and reassuring state.",
        "Your professional ability and grounded style win new recognition and opportunity at work this month. The arrival of an important project or collaboration mid-month is the natural result of the credibility you've long accumulated — take it seriously, and it will open new possibilities on your career path.",
        "Financial fortune is delightful this month — alongside steady growth in earned income, there's a surprising windfall. Month's end suits reviewing your overall financial situation and making a strategic adjustment to lay a solid foundation for the coming half-year.",
        "Health fortune is steady this month — be careful to keep your diet balanced and varied. Mid-month suits starting a new exercise habit; it needn't be intense, with persistence being key, for Taurus's greatest health advantage is the endurance to keep at it.",
      ],
      [
        "Taurus encounters the dual opportunity of expanding connections and self-breakthrough this month — the universe encourages you to take a small step beyond your comfortable boundaries, for the world outside is friendlier than imagined. Overall fortune trends upward all the way, growing more wonderful toward month's end.",
        "In love this month, initiative is the keyword — don't just think it in your heart; say your love out loud. A declaration early in the month will open the most beautiful chapter of the relationship; those attached greatly strengthen their bond this month by achieving a small goal together.",
        "An exciting turn appears in your career this month — the recognition, opportunity, or promotion you've quietly hoped for shows signs of substantial progress this month. Let your actions speak, complain less, and solve more problems.",
        "The keyword for finances this month is to increase income and cut expenses — increasing income means seizing the windfall chance mid-month; cutting expenses means checking whether you have long-running subscriptions you rarely use and letting go of these low-value costs.",
        "This is a month of especially stable health fortune for Taurus — simply keeping a regular routine and moderate exercise is the best gift you can give your body.",
      ],
      [
        "Taurus has unknowingly taken its steadiest step within a comfortable rhythm this month — every step counts, and every day draws you closer to your ideal self. Looking back at month's end, you'll feel genuinely proud of this groundedness and persistence.",
        "In love this month, your gentleness and reliability have laid the most solid foundation for this relationship — it needs no flashy romance, for sincere devotion in ordinary days is the most enduring declaration of love.",
        "At work this month, you've proven your worth in a way that is understated yet impossible to ignore — a small breakthrough mid-month will set off a chain reaction in the future.",
        "Financial fortune keeps improving this month — with rational spending plus steady investment, Taurus's finances enter a virtuous cycle this month.",
        "The secret to health this month is keeping a cheerful mood and ample sleep — a Taurus content in body and mind is the best Taurus.",
      ],
    ],
  },
};

export const TW_TEMPLATES_1: T = {
  aries: {
    today: [
      [
        "今日火星能量充沛，你的行動力達到巔峰狀態。面對任何挑戰都能迅速找到突破口，注意不要因為過於急切而忽視細節，穩中求快才是今日最佳策略。",
        "感情上充滿激情與活力，你的熱情極具感染力。單身者今日異性緣頗旺，主動出擊會有意外收穫；已有伴侶的你，一次自發的浪漫舉動將讓感情升溫不少。",
        "工作中思緒清晰、執行力強，今日適合推進需要魄力的專案。主管對你的表現印象深刻，但記得與團隊保持溝通。",
        "財運穩中偏旺，適合在自己擅長的領域進行小額投資嘗試。有意外進帳的可能，但守住既有成果比冒進更重要。",
        "體力充沛，是運動鍛鍊的好時機。注意避免高強度運動引發的肌肉拉傷，運動前充分熱身。",
      ],
      [
        "今日宇宙能量與你共鳴，思路開闊如同星河綻放。遇到困境時換個角度思考往往能發現意想不到的出路，下午時段靈感尤為突出。",
        "愛情方面有微妙的化學反應在醞釀，一次不經意的眼神交會可能開啟新故事。已戀愛者注意傾聽對方需求，今晚是深入交流的最佳時機。",
        "職場上你的想法得到認可，推進計畫的阻力減小。善用今日的好人緣拓展人脈，一個新的合作機會正悄然浮現。",
        "理財意識增強，適合整理帳單、規劃支出。有意外小驚喜，可能來自退款、回饋或小獎勵。",
        "精神飽滿，注意用眼過度帶來的疲勞，睡前做幾分鐘眼部放鬆操有助於好眠。",
      ],
      [
        "今日整體呈小吉態勢，生活節奏張弛有度。自我成長上的投入開始顯現初步效果，遇到迷茫時請相信直覺，不要強迫事態在時機未到時推進。",
        "感情呈現溫暖色調，陪伴勝過花言巧語。單身者保持開放心態，緣分往往在放下執念後悄然而至。",
        "事業方面宜穩不宜衝，做好手頭的任務比急於求成更有價值。一件擱置已久的任務今日有望取得進展。",
        "財務上宜收不宜支，避免衝動消費。查看是否有到期帳單需要處理，養成記帳習慣從今天開始也不遲。",
        "身體狀態良好，適合清淡飲食。多喝水，保持規律作息，給身體充足的修復時間。",
      ],
    ],
    tomorrow: [
      [
        "明日木星的吉祥光輝照耀你的命運領域，把握好每一個擴展機會。提前規劃好明日的優先事項，以最佳狀態迎接新的可能性。",
        "明日感情運勢上揚，有緣分在暗中牽引。保持真誠與開放，無論是老朋友重聚還是新認識的人，都可能帶來驚喜。",
        "明日工作中會迎來一個重要決策節點，充分準備、權衡利弊之後再出手，成功率將大幅提升。",
        "明日財運有小波動，適合做穩健型理財規劃，謹慎對待風險較高的投資品種。",
        "明日注意頸肩部位的保養，久坐工作者記得每小時起身活動一次。",
      ],
      [
        "明日是充電蓄力的好時機，適合整理思路、為下一階段做好規劃。大局觀會在關鍵時刻幫助你做出正確判斷。",
        "明日有助於增進感情的機會出現，主動關心身邊的人會收穫真誠回應，感情溫度悄然上升。",
        "職場上明日適合整理專案進展、向上彙報成果。展示你的系統思維與執行力，提升在主管心中的權重。",
        "明日有小額意外收入的跡象，可能是忘記的回款或朋友還錢。整體財運平穩，維持現狀為佳。",
        "明日體力充足，戶外活動能幫助排解近期積壓的壓力，推薦傍晚散步或慢跑。",
      ],
      [
        "明日月亮過境帶來細膩的直覺感受，相信內心深處的聲音。今晚早點休息，讓大腦充分充電。",
        "明日與伴侶或家人的互動品質高，避免將工作情緒帶回家。一頓共同烹飪的晚餐會讓彼此距離更近。",
        "明日工作中可能出現意見分歧，保持冷靜、以事實說話，你的邏輯清晰將化解潛在矛盾。",
        "明日消費衝動較強，購物前問自己：需要嗎？值這個價嗎？一個月後還會感激這筆消費嗎？",
        "明日睡眠品質關鍵，睡前避免滑手機，冥想或腹式呼吸有助於快速入眠。",
      ],
    ],
    week: [
      [
        "本週整體運勢穩健向好，尤其在週中會迎來一個重要轉折點。火星為你注入持續的行動力，任何擱置已久的計畫都適合在本週重新激活。週末適合充電休息，為下一階段蓄力。",
        "本週感情線起伏有致，前半週可能有些小誤會需要及時溝通化解，週四之後感情運回暖。單身者在週末的社交活動中有明顯的緣分加持。",
        "事業運整體上行，週一定好本週核心目標，執行效率會讓你事半功倍。與上級或客戶的溝通在週三特別順暢。",
        "本週財運平穩，有小額意外收益的可能。週末不宜大額消費，逛街前設定預算上限，避免衝動購物。",
        "本週健康整體良好，週中可能感到輕微疲倦，注意不要熬夜。週末安排一次舒緩運動，幫助身體深度放鬆。",
      ],
      [
        "本週宇宙能量有助於推動停滯已久的事情重新運轉，人際關係方面尤其順暢。把握機會，在本週把最重要的事情排在優先位置去推進。",
        "本週感情運勢有明顯提升，已戀愛者與伴侶的默契度加深，單身者透過朋友介紹或興趣社群結識意中人的機率大增。真誠才是最好的情話。",
        "職場上本週人氣指數高，善用這種好感度推進合作或爭取資源。有一個久等的好消息可能在本週收到。",
        "本週財運受木星庇佑，理財決策較為清晰，適合評估中長期的投資組合。有一筆來自過去努力的收益即將落袋。",
        "體能狀態本週優良，是建立運動習慣的黃金時機。哪怕每天15分鐘的活動也會帶來可見的改變。",
      ],
      [
        "本週對白羊座而言是內省與突破並存的時期。前半週適合整理思路、回顧計畫執行情況；後半週能量升高，適合大膽推進。保持耐心，你正走在正確的路上。",
        "本週感情運勢溫和而穩定，老關係中的小摩擦在坦誠溝通後煙消雲散。愛需要日常中的小心思來澆灌。",
        "工作重心本週在鞏固已有成果上，不必急於開拓新戰線。專注於交付高品質的成果，你的用心會得到該有的認可。",
        "本週財運呈現穩中有升，注意核查是否有遺漏的固定支出，做好月度預算。用閒錢嘗試、不動本金是原則。",
        "本週保持規律的作息和飲食比任何補品都更有效，定期做深呼吸練習，幫助舒緩緊繃感。",
      ],
    ],
    month: [
      [
        "本月白羊座整體運勢一路向好，是全年中最值得把握的高光時段之一。月初階段適合清理舊有負擔；月中前後迎來能量爆發；月末是收穫與慶祝的時刻。勇於開拓者必有所獲。",
        "本月感情運勢波瀾壯闊。月初借助良好的溝通機會化解隱患；月中感情運勢大幅上揚，是單身者開始新戀情的絕佳時機；月末適合為兩人的未來做一些長遠規劃。",
        "本月職場方面跌宕起伏中向好。月初完成手頭未竟之業；月中把握升職或加薪的談判窗口；月末好好總結得失，為下月蓄勢。",
        "本月財富運整體上行，尤其月中到月末階段正財運與偏財運雙線並進。可以考慮適度增加投資比例；但切記風險控制優先。",
        "本月健康整體無礙，但月初需要特別關注睡眠品質。月中體能達到峰值，是建立新健身習慣的好時機；月末多攝取維他命C和新鮮蔬果。",
      ],
      [
        "本月對白羊座來說是一個充滿機遇與變革的月份。月初的一次重要決定將決定整月走向；月中的峰值期是推進重大計畫的最佳窗口；月末適合盤點收穫、調整狀態迎接下月。",
        "本月感情運勢起起伏伏但整體向好。月初單身者主動出擊機會頗多；月中是感情升溫的關鍵節點；月末感情趨於穩定，相互尊重與包容是維繫感情的最佳配方。",
        "本月職場上創意思維與執行力同頻共振，把握月中的表現機會，把最好的方案以最清晰的方式展現出來，成功率極高。",
        "本月財運的關鍵是把握機遇，在正財穩健增長的同時，偏財機會也在暗中醞釀，保持敏銳的財務嗅覺。",
        "本月健康的隱患在於用腦過度和睡眠不穩定。建議每天至少安排30分鐘無螢幕時間，讓大腦徹底放空。",
      ],
      [
        "本月白羊座迎來思維與行動的完美協奏，口才、創意、執行力三者同時達到高峰。把握這股順風能量，在事業和個人成長上都會有令你滿意的收穫。",
        "本月感情方面驚喜連連，你的個人魅力達到全年高峰，各種場合都能吸引目光。主動出擊，本月的月老繩牽得格外緊。",
        "本月職場運勢全方位爆發，月末可能收到一個令人振奮的好消息，為本月畫上圓滿句點。",
        "本月理財運勢穩中有升，用好每一筆收益是本月的財商考驗。",
        "本月健康運勢整體良好，保持規律作息，注意消化系統的養護。",
      ],
    ],
  },

  taurus: {
    today: [
      [
        "今日金星的溫柔光輝籠罩著你，金牛座天生的審美與品味在今日大放異彩。無論工作還是生活，你對美好事物的追求都將在今日獲得實實在在的回報。享受當下，這份寧靜中的豐盛就是最好的福氣。",
        "感情今日充滿溫暖與甜蜜，你的體貼和耐心讓對方感到無比安心。已戀愛者今日安排一頓精緻的晚餐或一段安靜的兩人時光；單身者今日的穩重與可靠是最大的吸引力。",
        "工作上今日穩步推進，你的踏實態度和注重細節的工作方式在今日產出高品質成果。不急不躁，按自己的節奏來。",
        "財運今日有小驚喜，可能來自投資收益的結算或朋友歸還的借款。對美食和美物的消費今日有特別的滿足感。",
        "今日適合輕柔運動，瑜伽或散步讓身心在舒適中恢復活力。注意喉嚨部位的保養，多喝溫水。",
      ],
      [
        "今日金牛座處於一種舒適與篤定的狀態中，內心深處對未來有一種踏實的確定感。信任這種感覺，它來自你長期累積的判斷力。今日適合做與長遠規劃相關的事。",
        "感情上今日一份來自心底的真誠表達將讓對方感動不已，金牛座不善花言巧語，但你的每一句話都經過深思熟慮，份量十足。",
        "職場上今日你的方案或建議會得到重視，因為你總是能在細節中找到別人忽略的關鍵，這份嚴謹是你最寶貴的職業資產。",
        "財運今日適合審視長期理財計畫，確保你的資產配置與長期目標一致。穩健型投資在今日有特殊加持。",
        "今日給自己安排一段高品質的休閒時光，泡一個舒適的熱水澡，用精油或蠟燭營造氛圍，犒賞自己的身心。",
      ],
      [
        "今日是金牛座沉澱與感受的好時機，放慢腳步，認真品味生活中那些被匆忙忽略的美好細節。一杯好茶、一縷陽光、一段輕音樂，都是今日最好的能量來源。",
        "感情上今日不需要刻意經營，安靜地陪伴就是最好的愛情語言。共享一段無需多言的沉默時光，反而讓兩顆心更近。",
        "工作上今日適合整理和優化，把之前的工作成果做一次系統性的歸檔和複盤，為下一階段打下更堅實的基礎。",
        "財運今日宜做收支記錄和規劃，清晰的數字讓金牛座感到掌控感，這份掌控感本身就能帶來更好的財務決策。",
        "今日注意飲食的質感，不必追求昂貴，新鮮食材的簡單烹飪往往最能滿足金牛座的味蕾和身體需求。",
      ],
    ],
    tomorrow: [
      [
        "明日金星帶來一段與美和愛相關的際遇，一個讓你眼前一亮的人或事物將出現，留意身邊那些散發溫暖光芒的存在。",
        "明日感情上有一個溫暖的信號等著你，可能是一句關心的話或一個體貼的舉動。用你一貫的溫柔去回應，愛意就在這種互動中生長。",
        "明日職場上一個需要審美判斷的任務將落在你肩上，這正是金牛座最擅長的領域，大方展示你的品味。",
        "明日財運有小幅提升，一筆延遲的進帳可能在明日到帳。消費方面，明日適合為居家環境添置一件提升品質的好物。",
        "明日注意頸部和喉部保養，保持充足的水分攝取，金牛座的嗓子需要格外呵護。",
      ],
      [
        "明日你的堅持和耐心將獲得超預期的回報，一個長期投入的專案或關係在明日出現令人欣喜的轉機，堅持從來不會辜負金牛座。",
        "明日感情中的「安全感」話題浮出水面，和伴侶進行一次關於未來規劃的真誠對話，明確彼此的期待和承諾。",
        "明日工作中你的專業素養和靠譜作風讓同事印象深刻，可能有一個需要穩定執行力的任務指派給你，這正是你大顯身手的機會。",
        "明日理財方面適合做一次小額的定期投資調整，積少成多是金牛座最擅長的財富哲學。",
        "明日適合去一個安靜的自然環境中充電，綠植、流水和新鮮空氣是金牛座最好的能量補給站。",
      ],
      [
        "明日適合做一件一直想做但覺得「不夠實用」的事，金牛座的實用主義有時會讓你錯過純粹的快樂，明日允許自己享受一次。",
        "明日感情上一個小小的驚喜會讓對方倍感幸福，不需要大手筆，一朵花或一盒精緻的巧克力就足夠了。",
        "明日工作節奏適度放緩，不必什麼都追求完美，今日完成比完美更重要，留一些優化空間給之後。",
        "明日注意合理消費，避免在促銷活動中衝動購入不太需要的物品，金牛座的理財智慧需要在這種時刻發揮作用。",
        "明日睡前播放一段舒緩的音樂，讓身體和心靈同時進入放鬆狀態，好睡眠是金牛座好狀態的基石。",
      ],
    ],
    week: [
      [
        "本週金牛座運勢穩健向上，金星的能量為你的生活和感情都鍍上了一層溫暖的金色。週初做好本週計畫，中間幾天按部就班地推進，週末給自己一段高品質的放鬆時光。本週最重要的收穫可能來自一個意想不到的認可或獎勵。",
        "本週感情運勢溫暖甜蜜，已戀愛者在日常的陪伴中感受到愛意的加深；單身者本週在舒適的環境中遇到同頻之人的機率很高，不必刻意社交，做好自己就夠了。",
        "職場上本週執行力穩定輸出，一個重要的階段性成果在本週完成。你的可靠和專業讓團隊和主管都感到安心，這是最珍貴的職場資產。",
        "本週財運持續向好，有來自正財的穩定增長和偏財的小驚喜。對品質生活的投入本週物超所值，投資自己是最好的理財。",
        "本週健康關注喉嚨和甲狀腺，保持心情愉快是最好的保養方式。金牛座對壓力的反應容易體現在喉部，學會放鬆和表達。",
      ],
      [
        "本週金牛座在沉穩中迎來一個令人滿意的收穫期，過去的每一份堅持和努力都在本週以具體的方式向你展示了價值。享受這份篤定的喜悅，它值得被認真對待。",
        "本週感情中有一個溫馨而踏實的進展，不需要轟轟烈烈的儀式，一頓用心準備的晚餐或一段有品質的相處時光，就是本週最好的感情養分。",
        "本週職場上你的耐心和專注產出了一份高品質的工作成果，可能在週五得到正式的認可或表揚，享受這份應得的榮耀。",
        "本週財運穩健，適合做一次穩健型的投資或儲蓄調整，把本週的收益合理配置，讓它們在未來繼續為你工作。",
        "本週把改善居住環境作為健康和心情的投資，整理一個角落、添置一盆綠植或換一套舒適的床品，環境的美化對金牛座的身心有立竿見影的正面效果。",
      ],
      [
        "本週金牛座在安定的節奏中找到了最適合自己的前進方式，不必跟別人的速度比較，你的節奏就是最好的節奏。本週的每一小步都在為未來的大跨越累積力量。",
        "本週感情運勢穩定而溫馨，雙方在日常相處中建立了更深的信任和默契，這種平靜中的幸福感是最持久的。",
        "本週工作中專注於一件最核心的任務，把它做到極致，這比同時處理多項任務帶來更高的滿足感和職業價值。",
        "本週適合把閒置資金做一次重新分配，找到那個收益與風險的最佳平衡點，金牛座天生的財務直覺會在關鍵時刻給你正確的指引。",
        "本週健康管理的重點是飲食品質，選擇新鮮、天然、少加工的食材，從食物源頭提升身體的能量水平。",
      ],
    ],
    month: [
      [
        "本月金牛座整體運勢穩步攀升，金星的庇佑讓一切美好的事物都在向你靠近。月初整理居家與心靈空間，為新的能量騰出位置；月中感情和財運同步上升，是收穫的季節；月末帶著滿滿的成果和感恩，為下月設定更高的品質標準。",
        "本月感情運勢如蜜糖般甜美，愛情的甜度和深度在本月同步提升。月初一次坦誠的對話清除了心中最後的疑慮；月中一起經歷的美好時光將成為兩人的珍貴回憶；月末雙方的感情已經進入了最舒適、最安心的狀態。",
        "本月職場上你的專業能力和踏實作風贏得了新的認可和機遇。月中一個重要專案或合作機會的到來，是你長期以來累積信譽的自然結果，認真對待，它將為你的職業道路開拓新的可能。",
        "本月財運喜人，正財穩定增長的同時，有一筆令人驚喜的偏財收入。月末適合檢視整體財務狀況，做出一次戰略性調整，為接下來的半年打下堅實基礎。",
        "本月健康運勢平穩，注意保持飲食的均衡和多樣性。月中適合開始一項新的運動習慣，不必劇烈，貴在堅持，金牛座最大的健康優勢就是持之以恆的耐力。",
      ],
      [
        "本月金牛座迎來人際拓展與自我突破的雙重機遇，宇宙鼓勵你在舒適的邊界之外邁出小小的一步，外面的世界比想像的更友善。整體運勢一路向好，越到月末越精彩。",
        "本月感情上行動力是關鍵詞，不要只是在心裡想，要把愛大聲說出來。月初的一次表態將開啟感情上最美好的序章；已戀愛者本月透過共同實現一個小目標，感情牢固度大增。",
        "本月職業發展出現令人期待的轉機，那個你默默期待的認可、機會或晉升，在本月有實質性進展的跡象。用行動說話，少抱怨多解決問題。",
        "本月財務上的關鍵詞是開源節流，開源指抓住月中的偏財機會；節流指檢視是否有長期訂閱但很少使用的服務，斷捨離這些低價值支出。",
        "本月是金牛座健康運勢特別穩定的月份，只要保持規律作息和適度運動，就是對身體最好的饋贈。",
      ],
      [
        "本月金牛座在舒適的節奏中不知不覺走出了最穩健的一步，每一步都算數，每一天都在靠近理想中的自己。月末回望，你會為這份踏實與堅持感到由衷的自豪。",
        "本月感情上你的溫柔和可靠為這段關係打下了最堅實的基礎，不需要浮華的浪漫，平凡日子中的真心相待就是最長情的告白。",
        "本月職場上你以一種不張揚但無法忽視的方式證明了自己的價值，月中的一個小小的突破將在未來引發連鎖反應。",
        "本月財運持續向好，理性消費加上穩健投資，金牛座的財務狀況在本月進入了良性循環。",
        "本月健康的秘訣是保持愉快的心情和充足的睡眠，身心愉悅的金牛座，就是最好的金牛座。",
      ],
    ],
  },
};

export const EN_TITLES_1: Ti = {
  aries: {
    today: ["A Day Bursting with Energy", "Rewards Await the Brave", "Intuition Leads the Way"],
    tomorrow: ["Tomorrow Is Worth Looking Forward To", "Ready to Spring into Action", "Awaiting Good News Quietly"],
    week: ["Fortune Rises Steadily This Week", "Breakthrough and Reward Together", "A Week of Building to a Burst"],
    month: ["This Month's Shining Moment", "A Month of Transformation and Growth", "A Month Full of Harvest"],
  },
  taurus: {
    today: ["A Day of Steady Progress", "Time of Grounded Harvest", "A Day of Quality Living"],
    tomorrow: ["Good Fortune Is Drawing Near", "A Day Worth Looking Forward To", "Opportunity Hidden in Calm"],
    week: ["A Solid and Steady Week", "A Week Favored by Wealth", "Warm and Healing Times"],
    month: ["Building Up for a Breakthrough This Month", "A Month of Steady Progress", "A Month of Abundance in Sight"],
  },
};

export const TW_TITLES_1: Ti = {
  aries: {
    today: ["能量爆棚的一天", "勇敢者迎來回報", "直覺引領方向"],
    tomorrow: ["明天值得期待", "蓄勢待發", "靜候佳音"],
    week: ["本週運勢穩步上升", "突破與收穫並存", "蓄力爆發的一週"],
    month: ["本月高光時刻", "蛻變與成長之月", "收穫滿滿的月份"],
  },
  taurus: {
    today: ["穩中求進的一天", "踏實收穫的時光", "品質生活的日子"],
    tomorrow: ["好運正在靠近", "值得期待的一天", "平靜中暗藏機遇"],
    week: ["本週穩紮穩打", "財運眷顧的一週", "溫暖治癒的時光"],
    month: ["本月厚積薄發", "穩步前行之月", "豐盛在望的月份"],
  },
};
