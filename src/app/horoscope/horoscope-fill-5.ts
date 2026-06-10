import type { ZodiacId, TimePeriod } from "./horoscope-data";

type T = Partial<Record<ZodiacId, Partial<Record<TimePeriod, string[][]>>>>;
type Ti = Partial<Record<ZodiacId, Partial<Record<TimePeriod, string[]>>>>;

export const EN_TEMPLATES_5: T = {
  sagittarius: {
    today: [
      [
        "Jupiter's lucky energy fills you today, and your natural Sagittarian optimism is rewarded twofold. Whatever situation you face, hold on to your innate open-mindedness and curiosity, for new possibilities are beckoning. Seize today's urge for adventure, and it may lead you to discover a brand-new world.",
        "Love is full of laughter today, and your sense of humor and adventurous spirit are your most charming traits. Singles may encounter a connection while traveling or in a learning setting; for those already partnered, a spontaneous little adventure will breathe fresh life into the relationship.",
        "Inspiration bursts forth at work today, making it especially suited to tasks that call for creativity and vision. Your big-picture perspective stands out, letting you spot opportunities others overlook.",
        "Your finances lean strong today, with a chance of an unexpected windfall. Still, today's luck shouldn't be squandered—set half aside for a future adventure fund.",
        "You're full of energy today, perfect for outdoor activities. Hiking, cycling, or anything that connects you with nature is the ideal choice.",
      ],
      [
        "The universe opens a door to a new world for you today; a message from afar, a learning opportunity, or a travel invitation could all broaden your horizons. Stay open—a pleasant surprise is on its way.",
        "Today's romance comes from a meeting of minds, as someone who shares your philosophy or interests sets your heart racing. An intellectual attraction is sometimes more lasting than mere appearances.",
        "Work today favors expanding your network and seeking opportunities to collaborate, and your social charm is especially prominent. An informal conversation may hold a major opportunity.",
        "Today is a good day to study personal finance or attend an investment talk; with knowledge on its side, Jupiter-ruled Sagittarius enjoys even better fortune.",
        "Take care of your legs and hips today, and do some proper stretching after long travel or prolonged sitting.",
      ],
      [
        "Today is a great time for Sagittarius to let your spirit soar and follow your inner calling. Don't be bound by rules and conventions—your free soul needs room to breathe. Finding direction within freedom is far more meaningful than getting lost within constraints.",
        "In love, giving your partner enough space and trust today actually brings you closer. The Sagittarian philosophy of love is this: love is not possession, but growing together.",
        "Work today suits long-range planning and strategic thinking, and your Sagittarian foresight is especially clear. Get the big direction sorted out, and the details can be filled in later.",
        "Finances are steady today, ideal for setting up a savings plan for a large future expense. Sagittarius spends as fast as it earns, so moderate restraint is today's keyword for money.",
        "Today is great for trying a new sport or outdoor experience; Sagittarius finds the vitality of life in fresh experiences.",
      ],
    ],
    tomorrow: [
      [
        "Jupiter keeps bringing you luck tomorrow, and good news related to learning, travel, or law may arrive. Keep your adventurous spirit, for the universe is paving a wonderful road for you.",
        "Love is lively tomorrow, and an encounter at a social event may spark something. Sagittarius's natural candor and humor are the best catalysts for romance.",
        "A chance for cross-department or cross-field collaboration emerges at work tomorrow—precisely the arena Sagittarius excels in: connecting different worlds.",
        "Finances are blessed by Jupiter tomorrow, and a delayed income may land. Once it arrives, save half first—that's the financial discipline Sagittarius needs most.",
        "You'll be full of vitality tomorrow, perfect for scheduling a challenging workout to release your excess energy.",
      ],
      [
        "Tomorrow is a day suited to broadening your horizons. Whether reading a new book, watching a documentary, or chatting with people from different backgrounds, all will open a new dimension in your thinking.",
        "In love tomorrow, a deep conversation about philosophy or life outlook may lift your relationship to a new level; spiritual resonance is the romantic element Sagittarius treasures most.",
        "Your creativity and vision are appreciated at work tomorrow, and a task requiring pioneering thinking is assigned to you—this is your moment to shine.",
        "Tomorrow is a good time to assess overseas investments or finance opportunities tied to international trade; Sagittarius's global perspective is just as much an asset in money matters.",
        "Take care of your liver tomorrow, avoid excessive drinking, and eat more foods rich in B vitamins.",
      ],
      [
        "Tomorrow is great for arranging a spur-of-the-moment short trip; the Sagittarian soul needs fresh scenery to nourish it. Even just visiting a neighborhood you've never been to can bring you inspiration.",
        "In love tomorrow, keep your interactions light and cheerful—no need to be overly serious or heavy, for Sagittarian love needs laughter to flourish.",
        "You can ease the pace at work tomorrow, doing some tidying and organizing to prepare for the sprint ahead.",
        "Curb impulse spending tomorrow; for anything you want to buy, add it to the cart and wait 24 hours—many impulses vanish once you've cooled down.",
        "Tomorrow is great for dining or working outdoors; sunshine and fresh air are the best energy boost for Sagittarius.",
      ],
    ],
    week: [
      [
        "This week Sagittarius's fortune flies straight at its target like an arrow, and Jupiter's blessing makes you unstoppable on the path to your ideals. Set your most important goal early in the week; mid-week your drive peaks, ideal for pushing hard; the weekend is for summing up and celebrating. This week's keyword is \"aim at one bullseye.\"",
        "Love is lively and fun this week. Those in relationships will make their fondest memory of the week through shared adventures; singles have a strong chance of an encounter during outdoor activities or learning settings, where your cheerfulness and humor are the best romantic calling card.",
        "Your foresight and execution are both online at work this week, and Monday through Wednesday is the best window for advancing key projects. A conversation with a superior may open new possibilities for your career.",
        "Finances lean strong this week, especially favorable for investments related to education, travel, or international trade. Avoid overspending at social gatherings on the weekend.",
        "You're full of energy this week but prone to overexertion; protect your legs and lower back, and warm up thoroughly before exercise.",
      ],
      [
        "This week Sagittarius finds the perfect balance between freedom and responsibility. You discover that taking on an important role doesn't restrict your freedom but instead makes your adventures more meaningful and valuable. This week is good for accepting a new role that seems challenging yet brimming with growth.",
        "Love is warm and fulfilling this week. Learning alongside your partner deepens your understanding, and taking a class or visiting an exhibition together is the best date this week. Singles have a high chance of meeting a soulmate at knowledge-sharing occasions.",
        "Your international perspective and cross-disciplinary thinking are valued at work this week, and a project requiring you to integrate resources from many sides may land in your hands—an excellent chance to show your all-round strength.",
        "Finances hide a surprise within their steadiness this week, and income from monetizing your knowledge may arrive. Investing in your own learning is always the safest, most profitable choice.",
        "This week's health focus is your respiratory system; exercise in fresh-air environments and avoid prolonged outdoor activity in heavily polluted areas.",
      ],
      [
        "This week Sagittarius enters a key period of upgrading your thinking and broadening your horizons; a chance insight may change your fundamental view on some issue. Keep an open learning mindset, for the new understanding you gain this week will shape your direction for a long time to come.",
        "In love this week, a deep exchange about values or life outlook brings you closer; spiritual compatibility is the foundation of Sagittarian romance.",
        "Your communication skills peak from Wednesday to Friday at work this week, ideal for an important proposal or presentation. Use your passion and vision to win over your audience—Sagittarius is a born communicator.",
        "Finances call for restraint in spending this week, as social and travel expenses may exceed expectations. Set a spending cap and enjoy your freedom within budget.",
        "This week is great for trying meditation or mindfulness practice; the Sagittarian mind is too active and sometimes needs deliberate practice at the ability to be still.",
      ],
    ],
    month: [
      [
        "This month Sagittarius's overall fortune is unstoppable, like an arrow loosed from the bow. Jupiter opens a door to a wider world, and whether in study, travel, or career, an important breakthrough awaits. Clarify your goal at the start; push with full force mid-month; harvest results and plan your next stop at month's end. This month belongs to the visionary adventurer.",
        "Love is full of romantic adventure this month. An encounter during travel or study early in the month may begin a heart-stirring romance; mid-month love heats up, with spiritual resonance the strongest attraction; at month's end it's good to plan a future journey together with your partner.",
        "Career fortune is favorable across the board this month, with your vision and drive both peaking. Around mid-month an important career opportunity appears—it may involve international or cross-disciplinary collaboration, so seize it boldly.",
        "While your regular income grows steadily this month, on the windfall side an investment opportunity tied to overseas or education appears, well worth researching and evaluating in depth.",
        "Health is good this month, but be careful not to neglect rest because your schedule is too packed. This month is good for establishing a regular outdoor exercise habit to keep body and mind in top form.",
      ],
      [
        "This month Sagittarius experiences a major upgrade in horizons and perspective; the people, events, and things you encounter all push you to view problems from a higher dimension. Don't resist this expansion—it is the very growth you've always craved. Every day this month makes you a better version of yourself.",
        "In love this month, a deep exchange of values will determine the direction of the relationship. Sagittarius needs a partner to gaze at the stars with, not shackles that bind one another. Stay sincere, and the right person will be drawn to your radiance.",
        "An unexpected turn may appear in your career this month, as an opportunity from afar or another field opens entirely new possibilities. Don't miss destiny's invitation out of fear of change.",
        "This month's financial keyword is investing in education; whether investing in your own learning or in the education industry, it's the wisest financial decision of the month.",
        "Be sure to stay well hydrated this month; Sagittarius easily forgets to drink water amid busyness. Set phone reminders to drink water every hour.",
      ],
      [
        "This month Sagittarius's life philosophy undergoes an important evolution. You begin to understand that true freedom is not the absence of constraints, but running freely once your mission is clear. This realization will infuse all your actions this month with deeper meaning and more lasting power.",
        "Love moves from exploration toward certainty this month, and around mid-month you'll reach a clear decision about the relationship. Once Sagittarius is sure of a direction, your drive is the strongest. Trust the courage of this certainty.",
        "Your personal-brand influence rises markedly at work this month, with your views and ideas recognized and shared by more people. Seize this window to expand your influence.",
        "This month is good for a comprehensive review of your asset allocation, turning the wisdom you've accumulated into a rational investment strategy; a long-term layout beats short-term gambling.",
        "This month's health focus is balancing exercise and rest. Sagittarius tends to overexert in excitement, and learning to slow down voluntarily at the peak is a higher form of freedom.",
      ],
    ],
  },
  capricorn: {
    today: [
      [
        "Saturn's steady energy surrounds you today, and Capricorn's innate discipline and resilience are especially prominent. Every step you take is solid and powerful, and even facing difficulty you can resolve it with calm and strategy. Today's efforts all lay the foundation for a future peak—trust that you are on the right path.",
        "Love today is won through steadiness and commitment, and your reliability gives your partner deep peace of mind. Those in relationships will move their partner more with action than sweet words today; for singles, your mature charm is your greatest draw.",
        "Your execution is exceptionally strong at work today, with your planning ability and follow-through combining perfectly. An important project in progress is likely to reach a milestone today.",
        "Finances are steady today, suitable for handling matters related to taxes, insurance, or long-term investments. Capricorn's financial intuition is especially sharp today.",
        "Take care of your knees and joints today, avoiding excessive loads or prolonged kneeling. Supplement calcium and vitamin D in moderation.",
      ],
      [
        "Today Capricorn is in a state of strategic thinking, making thorough preparations for your next important move. Neither rushed nor anxious, Capricorn's sense of timing is the key to success. Today is good for reviewing past lessons and refining your strategy for future action.",
        "In love today, it's good to discuss long-term plans with your partner; your sense of purpose and follow-through give them confidence in your shared future. A joint plan is more persuasive than any sweet talk.",
        "Your professional ability and reliable character draw attention at work today, and an important responsibility may fall on your shoulders—exactly the chance to prove yourself you've long awaited.",
        "Today is good for long-term investment planning; Capricorn is naturally skilled at delayed gratification, and that quality is the greatest advantage in investing.",
        "Today suits strength training or planned workouts; Capricorn realizes its potential best through structured exercise.",
      ],
      [
        "Today is a good time for Capricorn to shore up your foundations. Put your attention on the most basic yet most important things, for your solid groundwork is especially valuable today. A great tree towers into the sky precisely because its roots run deep enough.",
        "In love today, companionship is the warmest form of love; it needn't be dramatic, for a dependable shoulder is the best support. Give your partner a reassuring hug.",
        "Work today suits refining details and processes, and your rigorous attitude makes every step withstand scrutiny. This sense of reliability is the most precious professional credibility.",
        "Finances favor defense over offense today; checking whether your existing portfolio is healthy matters more than chasing new opportunities.",
        "Today is good for a massage or hot spring, giving your long-hardworking body a deep relaxation.",
      ],
    ],
    tomorrow: [
      [
        "Saturn brings an important test or opportunity tomorrow, and Capricorn's natural ability to withstand pressure peaks. The more pressure you're under, the better you perform—a trait that will be fully borne out tomorrow.",
        "Love is steady and improving tomorrow, and an important conversation about the future may take place. Your mature attitude assures your partner that a secure future awaits with you.",
        "A key evaluation or review may take place at work tomorrow; you've prepared thoroughly for it, and with your strength, passing is only a matter of time.",
        "Finances favor handling matters related to property or long-term assets tomorrow; Capricorn's instincts about real estate have always been accurate.",
        "Take care of your bones and teeth tomorrow, and don't put off regular check-ups—Capricorn's health also needs routine maintenance.",
      ],
      [
        "Tomorrow is a day suited to setting long-term goals, and your strategic thinking is especially clear. Take time to write down plans for the next one or even three years; once Capricorn's blueprint is drawn, realizing it is just a matter of execution.",
        "In love tomorrow, you and your partner align on a shared goal, and this \"fighting side by side\" rapport is the most solid cornerstone of Capricorn-style love.",
        "A leadership opportunity appears at work tomorrow; whether a formal promotion or informal team leadership, it deserves serious consideration.",
        "Tomorrow is good for opening a long-term regular-investment account, turning Capricorn's patience into the real returns of compounding growth.",
        "Tomorrow is good for an early night, giving your brain ample time to recover and preparing you for an efficient workday ahead.",
      ],
      [
        "Tomorrow is good for slowing down and giving yourself a quiet time to reflect. Capricorn often presses ahead with head down, overlooking the scenery along the way; allow yourself to pause occasionally tomorrow, for looking back at your achievements will give you more strength to continue.",
        "In love tomorrow, express your gratitude; saying thank you to your partner for their long-standing support and understanding moves them more than any material gift.",
        "Don't force a breakthrough at work tomorrow; do some maintenance and organizing work to provide logistical support for the next stage's sprint.",
        "Finances tomorrow suit tidying up bills and receipts; clear financial records are the basic skill of Capricorn money management.",
        "Make yourself a good cup of tea or coffee tomorrow and enjoy a quiet bit of solitude; Capricorn's way of recharging needn't be complicated.",
      ],
    ],
    week: [
      [
        "This week Capricorn's fortune reaches a key breakthrough amid steady progress; while Saturn tests you, it also paves the way for you. Plan your week and set priorities early; an important recognition or opportunity appears mid-week; the weekend suits review and rest. Your perseverance is being seen, and this week is the proof.",
        "Love is steady and warm this week. Those in relationships feel the deep emotional foundation through mutual support in everyday life; singles may meet a quality match at work or formal social occasions, where your mature steadiness is the most attractive trait.",
        "Your professional ability and dedication win recognition from important people at work this week, and a long-awaited opportunity may appear on Wednesday or Thursday. Prove with action that you're ready.",
        "Regular income improves this week—perhaps overtime pay, a bonus, or a project share. On the windfall side, don't be reckless; favor steady moves.",
        "Take care of your knees and joints this week, and wear proper shoes when exercising. Keeping a regular schedule helps your work efficiency more than working overtime.",
      ],
      [
        "This week Capricorn shows your strongest self under pressure; you find that the more challenging the task, the more it ignites your potential. This week is good for taking on a high-difficulty challenge—once done, you'll stand at a new height.",
        "In love this week, you and your partner may need to face a practical problem together, and your seamless teamwork will resolve it readily. A relationship that weathers storms together is the most solid.",
        "Your leadership talent draws attention at work this week, and there may be a chance to lead a team temporarily—don't hesitate, for Capricorn is a born leader.",
        "Finances favor steadiness this week, suiting minor portfolio adjustments rather than big moves. A delayed income is likely to arrive this week.",
        "This week's health focus is your digestive system; keep regular mealtimes and avoid skipping proper meals when work is busy.",
      ],
      [
        "This week Capricorn has accumulated breakthrough energy within your steadiness, and your patience and perseverance begin to produce visible returns. This week's keyword is \"build up to break through\"; every past effort comes into play at this moment.",
        "In love this week, an earnest commitment or important decision moves the relationship into a more solid stage; love that Capricorn expresses through action is the most convincing.",
        "Your long-termist strategy begins to bear fruit at work this week, and a project you've kept following makes major progress—proof that Capricorn's perseverance is worthwhile.",
        "This week is good for a medium-to-long-term financial plan, allocating this week's gains reasonably among savings, investment, and spending so every cent works in the right place.",
        "This week is good for trying yoga or Pilates; these exercises emphasizing core strength and stability best suit Capricorn's physical characteristics.",
      ],
    ],
    month: [
      [
        "This month Capricorn's overall fortune moves toward glory through resilience; Saturn's tests are over, and every effort from here on will earn tangible rewards. Finish unfinished business at the start; welcome a major breakthrough or recognition mid-month; harvest and plan next month at month's end. This month belongs to the persistent climber.",
        "Love is steady and deeply affectionate this month. A heart-to-heart early in the month makes you both more certain the other is worth spending a lifetime with; completing an important task together mid-month makes the bond firmer; at month's end it's good to look back and ahead together, sketching a new blueprint for the relationship.",
        "Career fortune reaches an important turning point this month, and around mid-month a long-awaited promotion, recognition, or major collaboration finally arrives. This is the inevitable result of your long perseverance and accumulation—accept this well-deserved honor with composure.",
        "While regular income rises steadily this month, a return from past investment or effort lands. Month's end suits a comprehensive financial plan to set the layout for the coming half-year.",
        "Health is good overall this month; keep a regular schedule and diet. Start a long-term fitness plan early in the month, and Capricorn's perseverance will let you see notable results this very month.",
      ],
      [
        "This month Capricorn experiences a major lift in strategic perspective; you begin to examine your career and life from a higher vantage point, and this big-picture view makes every decision you make more precise and powerful. This month is good for setting a three- or five-year long-term goal.",
        "Love heats up within stability this month, and you and your partner build deeper trust and reliance through facing challenges together. Adversity reveals true feelings, and a relationship that withstands testing is the most precious.",
        "An important opportunity appears in your career this month, possibly involving a management role or independently leading a project. Meet the challenge with your strength and accountability; Capricorn is all the more composed on a bigger stage.",
        "This month's financial key is compounding thinking; whether investing or saving, choose ways that let time work for you, for long-termism is likewise Capricorn's winning formula in finance.",
        "Mind your mental health this month; Capricorn's toughness can sometimes make you ignore your inner needs. Confiding in someone you trust or keeping a journal are both effective ways to manage your emotions.",
      ],
      [
        "This month Capricorn quietly completes an important transformation; the outside world may not yet have noticed the change, but you yourself know—you are no longer the person you were last month. This inner upgrade will gradually reveal itself in the days ahead, and this month is just the beginning of a wonderful story.",
        "In love this month, your reliability and depth are your most attractive traits; there's no need to put on a show, for simply being your true self draws the right person. Around mid-month you may meet someone who likewise values commitment and growth.",
        "Your systematic thinking shines in handling complex problems at work this month, and a challenge that long troubled the team is elegantly solved in your hands—your value is confirmed once again.",
        "This month is good for an asset restructuring, consolidating scattered funds into the most valuable investments; Capricorn's efficiency in a focused strategy is the highest.",
        "This month's health focus is establishing a sustainable life rhythm—not short-term strictness, but long-term gentle persistence. Find the lifestyle you can happily maintain for more than ten years.",
      ],
    ],
  },
};

export const TW_TEMPLATES_5: T = {
  sagittarius: {
    today: [
      [
        "今日木星的幸運能量充盈著你，射手座的樂觀精神在今日得到加倍回報。無論面對何種情境，保持你天生的豁達和好奇心，新的可能性正在向你招手。把握今日的冒險衝動，它可能帶你發現一片新天地。",
        "感情上今日充滿歡聲笑語，你的幽默感和冒險精神是最迷人的魅力。單身者今日在旅途中或學習場合有邂逅緣分的可能；已有伴侶的你，一次即興的小冒險將為感情注入新鮮活力。",
        "工作中今日靈感迸發，特別適合需要創意和遠見的任務。你的全局觀在今日尤為突出，能發現別人忽略的機會。",
        "財運今日偏旺，有一筆意想不到的進帳可能。不過今日的幸運不宜過度揮霍，留一半給未來的冒險基金。",
        "今日精力充沛，適合戶外活動。遠足、騎行或任何讓你接觸大自然的活動都是最佳選擇。",
      ],
      [
        "今日宇宙為你打開了一扇通往新世界的大門，一封來自遠方的訊息、一個學習機會或一次旅行邀約都可能改變你的視野。保持開放，驚喜正在路上。",
        "感情上今日的桃花運來自精神層面的共鳴，一個與你有共同哲學或興趣的人將讓你怦然心動。思想上的吸引力有時比外表更持久。",
        "工作中今日適合拓展人脈和尋找合作機會，你的社交魅力在今日格外突出。一次非正式的交談可能蘊含重大機遇。",
        "財運今日適合學習理財知識或參加投資講座，木星守護的射手座在知識的加持下財運更佳。",
        "今日注意腿部和髖部的保養，長時間旅行或久坐後做適當的伸展運動。",
      ],
      [
        "今日是射手座放飛自我、追尋內心呼喚的好時機，不必被條條框框束縛，你的自由靈魂需要呼吸的空間。在自由中找到方向，比在約束中迷失更有意義。",
        "感情上今日給予對方足夠的空間和信任，反而能讓關係更緊密。射手座的愛情哲學是：愛不是占有，是共同成長。",
        "工作中今日適合做長遠規劃和策略思考，射手座的遠見在今日特別清晰。把大方向想清楚，細節可以之後再填充。",
        "財運今日平穩，適合為未來的大額支出做儲蓄計畫。射手座的花錢速度和賺錢速度一樣驚人，適度節制是今日的理財關鍵詞。",
        "今日適合嘗試一種新的運動或戶外體驗，射手座在新鮮的體驗中找到生命的活力。",
      ],
    ],
    tomorrow: [
      [
        "明日木星繼續為你帶來好運，一個與學習、旅行或法律相關的好消息可能在明日到來。保持你的冒險精神，宇宙正在為你鋪設一條精彩的道路。",
        "明日感情運勢活躍，一次社交活動中的相遇可能擦出火花。射手座天生的坦率和幽默是最好的感情催化劑。",
        "明日工作中一次跨部門或跨領域的合作機會浮現，這正是射手座最擅長的領域——連接不同的世界。",
        "明日財運受木星眷顧，有一筆延遲的收入可能在明日入帳。收到錢後先存一半，這是射手座最需要的財務紀律。",
        "明日活力充沛，適合安排一項有挑戰性的運動，釋放過剩的精力。",
      ],
      [
        "明日是一個適合拓展視野的日子，無論是閱讀一本新書、觀看一部紀錄片還是與不同背景的人交流，都將為你的思維打開新的維度。",
        "明日感情上一次深入的哲學或人生觀對話可能讓你們的關係提升到新的層次，精神上的共鳴是射手座最珍視的愛情要素。",
        "明日職場上你的創意和遠見得到賞識，一個需要開創性思維的任務指派給你，這正是你大展身手的時刻。",
        "明日適合評估海外投資或與國際貿易相關的理財機會，射手座的國際視野在財務領域同樣是優勢。",
        "明日注意肝臟保養，避免過度飲酒，多攝取富含維生素B的食物。",
      ],
      [
        "明日適合安排一次說走就走的短途旅行，射手座的靈魂需要新鮮的風景來滋養。哪怕只是去一個從未到過的街區，也能為你帶來靈感。",
        "明日感情上保持輕鬆愉快的互動方式，不必過於嚴肅或沉重，射手座的愛情需要笑聲來灌溉。",
        "明日工作節奏可以適當放慢，做一些整理和歸納的工作，為接下來的衝刺做好準備。",
        "明日消費方面控制衝動，想買的東西先加入購物車等24小時，很多衝動會在冷靜後消失。",
        "明日適合在戶外用餐或工作，陽光和新鮮空氣是射手座最好的能量補給。",
      ],
    ],
    week: [
      [
        "本週射手座運勢如一支箭般直指目標，木星的庇佑讓你在追求理想的道路上勢不可擋。週初確定本週最重要的目標；週中行動力達到峰值，適合大力推進；週末適合總結和慶祝。本週的關鍵詞是「專注射向一個靶心」。",
        "本週感情運勢活躍而有趣，已戀愛者與伴侶的共同冒險經歷將成為本週最美好的回憶；單身者本週在戶外活動或學習場合有極大的邂逅緣分機率，你的開朗和幽默是最好的愛情名片。",
        "本週職場上你的遠見和執行力同時在線，週一至週三是推進重要專案的最佳時段。一次與上級的溝通可能為你的職涯發展打開新的可能性。",
        "本週財運偏旺，特別有利於與教育、旅行或國際貿易相關的投資。週末避免在社交場合過度消費。",
        "本週精力充沛但容易過度消耗，注意腿部和腰部的保護，運動前充分熱身。",
      ],
      [
        "本週射手座在自由與責任之間找到完美的平衡點，你發現承擔重要角色並不會束縛你的自由，反而讓你的冒險更有意義和價值。本週適合接受一個看似挑戰但充滿成長機會的新角色。",
        "本週感情運勢溫馨而充實，與伴侶在共同學習中加深了解，一起去上課或看展是本週最佳約會方式。單身者本週在知識分享的場合遇到靈魂伴侶的機率很高。",
        "本週工作中你的國際化視野和跨領域思維受到重視，一個需要整合多方面資源的專案可能交到你手上，這是展示綜合實力的絕佳機會。",
        "本週財運在穩健中暗藏驚喜，一筆來自知識變現的收入可能在本週入帳。投資自己的學習永遠是最穩賺不賠的理財。",
        "本週健康管理重點是呼吸系統，在空氣清新的環境中運動，避免在汙染嚴重的戶外長時間活動。",
      ],
      [
        "本週射手座迎來思維升級和視野拓展的關鍵時期，一次偶然的啟發可能改變你對某個問題的根本看法。保持開放的學習心態，本週獲得的新認知將影響你未來很長一段時間的方向。",
        "本週感情上一次關於價值觀或人生觀的深度交流讓彼此更加了解，精神層面的契合度是射手座感情的根基。",
        "本週職場上你的表達能力在週三至週五達到巔峰，適合做重要的提案或演講。用你的熱情和遠見去感染聽眾，射手座天生就是優秀的傳播者。",
        "本週財運在消費方面需要克制，社交和旅行方面的支出可能超預期。設定消費上限，在預算內享受自由。",
        "本週適合嘗試冥想或正念練習，射手座的思維太過活躍，有時候需要刻意練習安靜下來的能力。",
      ],
    ],
    month: [
      [
        "本月射手座整體運勢如脫弦之箭，勢不可擋。木星為你打開了通往更廣闊世界的大門，無論在學習、旅行還是事業上，本月都將迎來重要突破。月初明確目標；月中全力推進；月末收穫成果並規劃下一站。本月屬於有遠見的冒險者。",
        "本月感情運勢充滿浪漫冒險的色彩，月初一次旅行或學習中的邂逅可能開啟一段令人心動的感情；月中感情升溫，精神共鳴是最強的吸引力；月末適合與伴侶共同規劃一段未來的旅程。",
        "本月職場運勢全面向好，你的遠見和行動力同時達到高峰。月中旬一個重要的職涯機會出現，它可能涉及國際化或跨領域合作，大膽去把握。",
        "本月財運在正財方面穩步增長的同時，偏財方面有與海外或教育相關的投資機會出現，值得深入研究和評估。",
        "本月健康運勢良好，但注意不要因為行程太滿而忽略休息。本月適合建立一項規律的戶外運動習慣，讓身心在運動中保持最佳狀態。",
      ],
      [
        "本月射手座迎來視野和格局的重大升級，你所接觸的人、事、物都在推動你以更高的維度來看待問題。不要抗拒這種拓展，它正是你一直渴望的成長。本月的每一天都在讓你成為更好的自己。",
        "本月感情運勢上一次深入的價值觀交流將決定感情的發展方向，射手座需要的是能一起仰望星空的伴侶，而不是互相束縛的枷鎖。保持真誠，對的人會被你的光芒吸引。",
        "本月職涯發展可能出現意想不到的轉折，一個來自遠方或跨領域的機會讓你的職涯有了全新的可能。不要因為害怕改變而錯過命運的邀約。",
        "本月財運的關鍵詞是教育投資，無論是投資自己的學習還是投資教育產業，都是本月最明智的財務決策。",
        "本月注意保持充足的水分攝取，射手座容易在忙碌中忘記喝水。設定手機提醒，每小時提醒自己補充水分。",
      ],
      [
        "本月射手座的人生哲學將經歷一次重要的進化，你開始理解真正的自由不是沒有約束，而是在明確使命後的盡情奔跑。這種領悟將為本月的所有行動注入更深層的意義和更持久的力量。",
        "本月感情運勢在探索中走向確定，月中前後你將對感情有一份清晰的決定。射手座一旦認定了方向，行動力是最強的。相信這份確定的勇氣。",
        "本月職場上你的個人品牌影響力在本月顯著提升，你的觀點和創意被更多人認可和傳播。把握這個擴大影響力的窗口期。",
        "本月適合做一次全面的資產配置調整，把你累積的智慧轉化為理性的投資策略，長遠佈局勝過短期搏殺。",
        "本月健康管理的核心是保持運動和休息的平衡，射手座容易在興奮中過度消耗，學會在高峰時主動減速是一種更高級的自由。",
      ],
    ],
  },
  capricorn: {
    today: [
      [
        "今日土星的沉穩能量籠罩著你，摩羯座天生的自律和堅韌在今日格外凸顯。你的每一步都走得踏實而有力，即使面對困難也能以冷靜和策略化解。今日的付出都在為未來的高峰奠基，相信自己正走在正確的路上。",
        "感情上今日以穩重和承諾取勝，你的可靠讓對方感到深深的安心。已戀愛者今日用實際行動表達愛意比甜言蜜語更打動人；單身者今日你的成熟魅力是最大的吸引力。",
        "工作中今日執行力超強，你的規劃能力和執行力在今日完美結合。推進中的重要專案在今日有望取得階段性成果。",
        "財運今日穩健，適合處理與稅務、保險或長期投資相關的事務。摩羯座的財務直覺在今日特別敏銳。",
        "今日注意膝蓋和關節的保養，避免過度負重或長時間跪姿。適度補充鈣質和維生素D。",
      ],
      [
        "今日摩羯座處於一種策略性的思考狀態中，你在為下一步的重要行動做充分準備。不急不躁，摩羯座的節奏感是成功的關鍵。今日適合復盤過去的經驗教訓，為未來的行動優化策略。",
        "感情上今日適合與伴侶討論長遠規劃，你的目標感和執行力讓對方對兩人的未來充滿信心。一份共同的計畫書比任何情話都更有說服力。",
        "職場上今日你的專業能力和可靠品質受到關注，一個重要的責任可能落在你肩上，這正是你期待已久的證明機會。",
        "財運今日適合做長期投資規劃，摩羯座天生擅長延遲滿足，這份品質在投資領域是最大的優勢。",
        "今日適合進行肌力訓練或有計畫的健身，摩羯座在結構化的運動中最能發揮潛力。",
      ],
      [
        "今日是摩羯座鞏固根基的好時機，把注意力放在最基礎但最重要的事情上，你的扎實功力在今日特別有價值。大樹之所以能高聳入雲，是因為根扎得足夠深。",
        "感情上今日的陪伴是最溫暖的愛，不需要轟轟烈烈，一個可靠的肩膀就是最好的依靠。給對方一個安心的擁抱。",
        "工作中今日適合完善細節和流程，你的嚴謹態度讓每一個環節都經得起檢驗。這份可靠感是最珍貴的職場信譽。",
        "財運今日宜守不宜攻，檢查現有的投資組合是否健康，比追逐新機會更重要。",
        "今日適合按摩或溫泉，給長期辛勤工作的身體一次深度放鬆。",
      ],
    ],
    tomorrow: [
      [
        "明日土星帶來一次重要的考驗或機會，摩羯座天生的抗壓能力在明日達到巔峰。你越是在壓力下越能展現出色的表現，這個特點在明日將得到充分驗證。",
        "明日感情運勢穩中向好，一個關於未來的重要對話可能在明日發生。你的成熟態度讓對方確信，與你在一起未來是有保障的。",
        "明日工作中一個關鍵的評估或審查可能在明日進行，你已經為此做了充分準備，以你的實力，通過只是時間問題。",
        "明日財運有利於處理與房產或長期資產相關的事務，摩羯座在不動產方面的直覺一向準確。",
        "明日注意骨骼和牙齒健康，定期檢查不要拖延，摩羯座的健康也需要定期維護。",
      ],
      [
        "明日是一個適合制定長期目標的日子，你的策略思維在明日特別清晰。花時間寫下未來一年甚至三年的規劃，摩羯座的藍圖一旦畫好，實現只是執行問題。",
        "明日感情上你與伴侶在共同目標上達成一致，這種「並肩作戰」的默契是摩羯座式愛情最堅固的基石。",
        "明日職場上一個領導力的機會出現，無論是正式的晉升還是非正式的團隊領導，都值得認真對待。",
        "明日適合開設一個長期定期定額帳戶，把摩羯座的耐心優勢轉化為複利增長的實際收益。",
        "明日適合早睡，給大腦充足的修復時間，為接下來的高效工作日做好準備。",
      ],
      [
        "明日適合放慢節奏，給自己一段安靜的反思時間。摩羯座往往只顧埋頭趕路而忽略了欣賞沿途風景，明日允許自己偶爾停下來，回望來路的成就會讓你更有力量繼續前行。",
        "明日感情上表達你的感激之情，對伴侶長久以來的支持和理解說一聲感謝，這比任何物質禮物都更讓對方感動。",
        "明日工作中不必強求突破，做一些維護性和整理性的工作，為下一階段的衝刺做好後勤保障。",
        "明日財務上適合整理帳單和收據，清晰的財務記錄是摩羯座理財的基本功。",
        "明日給自己泡一杯好茶或咖啡，享受一段安靜的獨處時光，摩羯座的充電方式不需要複雜。",
      ],
    ],
    week: [
      [
        "本週摩羯座運勢在穩步中迎來關鍵突破，土星考驗你的同時也在為你鋪路。週初做好本週規劃和優先級排序；週中一個重要的認可或機會出現；週末適合復盤和休息。你的堅持正在被看見，本週就是證明。",
        "本週感情運勢穩健而溫暖，已戀愛者與伴侶在日常的相互扶持中感受到深厚的感情基礎；單身者本週在職場或正式社交場合有遇到優質對象的可能，你的成熟穩重是最具吸引力的特質。",
        "本週職場上你的專業能力和敬業精神獲得重要人物的認可，一個期待已久的機會可能在週三或週四出現。用行動證明你已經準備好了。",
        "本週財運在正財方面有提升，可能是加班費、獎金或專案分紅。偏財方面不宜冒進，穩健操作為主。",
        "本週注意膝蓋和關節的保護，運動時穿合適的鞋子。保持規律作息比加班更有助於提升工作效率。",
      ],
      [
        "本週摩羯座在壓力中展現最強大的自我，你發現越是挑戰性的任務越能激發你的潛力。本週適合接受一個高難度的挑戰，完成後你將站在新的高度上。",
        "本週感情運勢中你和伴侶可能需要共同面對一個實際問題，你們的默契配合將讓問題迎刃而解。共同經歷風雨的感情最牢固。",
        "本週工作中你的領導才能受到關注，可能有一個臨時帶團隊的機會，不要猶豫，摩羯座天生就是領導者。",
        "本週財運以穩健為主，適合做資產配置的微調而不是大動作。一筆延遲的進帳本週有望入帳。",
        "本週健康管理重點是消化系統，保持規律的用餐時間，避免在工作繁忙時跳過正餐。",
      ],
      [
        "本週摩羯座在沉穩中積累了突破的能量，你的耐心和堅持在本週開始產生可見的回報。本週的關鍵詞是「厚積薄發」，過去的每一份付出都在此刻發揮作用。",
        "本週感情上一次認真的承諾或重要決定讓關係進入更穩固的階段，摩羯座用行動詮釋的愛情是最令人信服的。",
        "本週職場上你的長期主義策略開始產生效果，一個你持續跟進的專案在本週取得重大進展，這證明了摩羯座的堅持是有價值的。",
        "本週適合做一次中長期的財務規劃，把本週的收益合理分配到儲蓄、投資和消費中，讓每一分錢都在正確的位置發揮作用。",
        "本週適合嘗試瑜伽或皮拉提斯，這些強調核心力量和穩定性的運動最適合摩羯座的身體特點。",
      ],
    ],
    month: [
      [
        "本月摩羯座整體運勢在堅韌中走向輝煌，土星的考驗已經過去，接下來的每一份付出都將獲得實實在在的回報。月初完成手頭未竟之事；月中迎來重大突破或認可；月末是收穫與規劃下月的時刻。本月屬於堅持不懈的攀登者。",
        "本月感情運勢穩重而深情，月初一次深入的交流讓彼此更加確信對方就是值得共度一生的人；月中共同完成一件重要的事情讓感情更加牢固；月末適合一起回顧過去展望未來，為感情描繪新的藍圖。",
        "本月職場運勢迎來重要轉折，月中旬一個期待已久的晉升、認可或重要合作機會終於到來。這是你長期堅持和積累的必然結果，坦然接受這份應得的榮耀。",
        "本月財運在正財方面穩步提升的同時，有一筆來自過去投資或努力的回報入帳。月末適合做一次全面的財務規劃，為接下來的半年做好佈局。",
        "本月健康運勢整體良好，注意保持規律的作息和飲食。月初開始一項長期的健身計畫，摩羯座的堅持力能讓你在本月就看到顯著效果。",
      ],
      [
        "本月摩羯座迎來戰略格局的重大提升，你開始以更高的視角審視自己的事業和生活，這份全局觀讓你做出的每一個決定都更加精準和有力。本月適合設定一個三年或五年的長期目標。",
        "本月感情運勢在穩定中升溫，你和伴侶在共同面對挑戰的過程中建立了更深的信任和依賴。患難見真情，這份經得起考驗的感情是最珍貴的。",
        "本月職涯發展出現重要機遇，可能涉及管理職位或獨立負責專案的機會。用你的實力和擔當去迎接挑戰，摩羯座在更大的舞台上反而更加從容。",
        "本月財運的關鍵是複利思維，無論是投資還是儲蓄，選擇能讓時間為你工作的方式，長期主義在財務領域同樣是摩羯座的制勝法寶。",
        "本月注意心理健康，摩羯座的堅強有時會讓自己忽略內心的需求。找一個信任的人傾訴或寫日記，都是有效的情緒管理方式。",
      ],
      [
        "本月摩羯座在不動聲色中完成了一次重要的蛻變，外界可能還沒察覺到變化，但你自己清楚——你已經不是上個月的自己了。這種內在的升級將在未來的日子裡逐漸展現出來，本月只是精彩故事的開始。",
        "本月感情運勢上你的可靠和深度是最具吸引力的特質，不需要刻意表現，做真實的自己就能吸引到對的人。中旬可能遇到一個同樣重視承諾和成長的人。",
        "本月職場上你的系統性思維在處理複雜問題時大放異彩，一個困擾團隊許久的難題在你手中被優雅地解決，你的價值再次得到確認。",
        "本月適合做一次資產重組，把分散的資金集中到最有價值的投資標的上，摩羯座在聚焦策略上的效率是最高的。",
        "本月健康管理的重點是建立可持續的生活節奏，不是短期的嚴格要求，而是長期的溫和堅持。找到那個你能愉快維持十年以上的生活方式。",
      ],
    ],
  },
};

export const EN_TITLES_5: Ti = {
  sagittarius: {
    today: ["A Day Brimming with Jupiter's Energy", "Philosophical Thinking Shines", "A Great Time for Deep Reflection"],
    tomorrow: ["A Day to Set Sail", "Full Marks for Verbal Charm", "Intuition Especially Reliable"],
    week: ["Vitality Runs High This Week", "A Week of Soaring Freely", "A Fulfilling and Meaningful Journey"],
    month: ["Jupiter Blesses You All Month", "Adventure and Reflection Together", "A Harvest of Freedom and Authenticity"],
  },
  capricorn: {
    today: ["Discipline and Efficiency Soar", "A Professional Image Draws Attention", "A Day to Settle and Look Back"],
    tomorrow: ["A Pivotal Moment for Your Career", "Persistence Earns Its Reward", "Quietly Gathering Strength"],
    week: ["Steady and Upward This Week", "Quantitative Change Sparks a Qualitative Leap", "A Week of Solid Harvest"],
    month: ["Building Up to Break Through This Month", "A Month of Deep Cultivation and Breakthrough", "A Month of Steady Harvest"],
  },
};

export const TW_TITLES_5: Ti = {
  sagittarius: {
    today: ["木星能量充盈", "哲學思維閃耀", "深度思考的好時機"],
    tomorrow: ["揚帆起航的日子", "語言魅力滿分", "直覺格外可靠"],
    week: ["本週生命力旺盛", "自由飛翔的一週", "充實而有意義的旅程"],
    month: ["本月木星全面庇佑", "探險與思考並行", "自由真實的收穫期"],
  },
  capricorn: {
    today: ["紀律與效率齊飛", "專業形象受關注", "沉澱與回顧的一天"],
    tomorrow: ["職涯發展關鍵節點", "堅持迎來回報", "安靜中積蓄力量"],
    week: ["本週穩健向上", "量變引發質變", "踏實收穫的一週"],
    month: ["本月厚積薄發", "深耕突破之月", "穩健收穫的月份"],
  },
};
