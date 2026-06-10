import type { ZodiacId, TimePeriod } from "./horoscope-data";

type T = Partial<Record<ZodiacId, Partial<Record<TimePeriod, string[][]>>>>;
type Ti = Partial<Record<ZodiacId, Partial<Record<TimePeriod, string[]>>>>;

export const EN_TEMPLATES_3: T = {
  leo: {
    today: [
      [
        "The Sun's energy blazes brilliantly today, and your innate regal presence as a Leo shines especially bright. Wherever you go, you become the focus, making this a great day to take the initiative and showcase your talents. An opportunity for a public speech or presentation will bring an unexpected delight.",
        "Love runs as hot as fire today, and the way you express affection is direct and powerful. Your partner will be deeply moved by your passion; for singles, taking that brave first step today carries a far higher chance of success than usual.",
        "Your leadership erupts at work today, and your decisiveness and presence boost the whole team's confidence. Seize the chance to take the lead on a project or meeting.",
        "Fortune leans in your favor today, and you may receive an unexpected windfall. Investments or spending related to entertainment and the arts can bring solid returns today.",
        "Your energy is abundant, making it a great time for high-intensity exercise. Remember to stay hydrated and avoid the discomfort of overheating.",
      ],
      [
        "Your presence today is too powerful to ignore, instantly lighting up any room you walk into. Channel this natural magnetism toward what matters most to you.",
        "Love is full of passion and romance today, and a spontaneous surprise gesture will become a sweet memory you both treasure. For singles, your personal charm peaks today.",
        "Today is the best time to compete for resources and showcase your abilities at work; your confidence and professionalism will leave decision-makers with a deep, positive impression.",
        "There is potential today for extra income tied to creativity, performance, or the arts; the time is ripe to turn your talents into earnings.",
        "Today suits upbeat music paired with aerobic exercise, letting both body and spirit burn at their highest frequency.",
      ],
      [
        "Today the Leo enters a brief recharging phase. This is not a fading of energy but the gathering of strength before the next eruption. It suits quiet planning and organizing your thoughts.",
        "Listening takes priority in love today. Making your partner feel your attention and respect strengthens the foundation of the relationship far more than any flowery words.",
        "Work today suits reviewing project progress, looking back at results, and finding areas to optimize.",
        "Today is good for taking stock of your investment portfolio and seeing whether any holdings need rebalancing. Today's fortune favors holding steady rather than pushing forward.",
        "Today suits relaxed physical activity like yoga or swimming, giving your body a chance to recover from a high-intensity state.",
      ],
    ],
    tomorrow: [
      [
        "Tomorrow a public presentation or sharing opportunity will bring better-than-expected positive feedback, and your unique perspective and style of expression will leave a deep impression on your audience.",
        "Tomorrow a surprise that delights you both awaits in love; keep a cheerful mood as you welcome its arrival.",
        "Tomorrow you will face a moment that calls for decision at work. Trust your judgment and act decisively. Hesitation will only erode your advantage.",
        "Tomorrow fortune rises slightly, and extra income born of your own talent is about to materialize.",
        "Tomorrow avoid intense exercise on an empty stomach, and arrange a sensible interval between meals and workouts.",
      ],
      [
        "Tomorrow your personal charm is amplified to its strongest, and whether in work negotiations or social gatherings, you are the undisputed center.",
        "Tomorrow your partner or someone you admire will cast an especially attentive gaze your way; cherish this recognition and appreciation in love.",
        "Tomorrow one of your bold ideas at work will receive unexpected support, so don't suppress your creativity out of worry over others' opinions.",
        "Tomorrow a small investment opportunity appears; combine it with your own professional judgment and try cautiously.",
        "Tomorrow you'll be full of energy, so it's a great day to take up a sport you've long wanted to try.",
      ],
      [
        "Tomorrow suits doing something kind for yourself, nourishing an inner sense of abundance.",
        "Tomorrow love calls for a little patience; your partner may be in a state that needs attention, and your understanding and companionship are what they need most.",
        "Tomorrow the value of focusing on completing one thing at work far outweighs starting several at once; done is better than perfect.",
        "Tomorrow the urge to spend runs strong; before buying, ask yourself: will this still satisfy me three months from now?",
        "Tomorrow give your brain a quiet transition before bed, avoiding stimulating content so your sleep runs deeper.",
      ],
    ],
    week: [
      [
        "This week the Leo's fortune is like the rising sun, growing ever brighter. A key presentation opportunity midweek will be an important turning point for your career development this month, even this quarter.",
        "This week your love line is full of sweetness and passion. Those in relationships should create a dedicated romantic moment midweek; for singles, the luck of romantic connection runs strong this week.",
        "Your leadership fully erupts at work this week, making it ideal to push forward projects that require multi-party coordination and decisive decision-making. An important meeting midweek is your stage to display your all-around abilities.",
        "Fortune is thriving this week, with the possibility of unexpected income or investment returns materializing. Seize this week's fortune and make a wise financial plan.",
        "Your energy is vigorous this week. Turn exercise into a social activity by inviting friends along; the fun multiplies and consistency comes more easily.",
      ],
      [
        "This week the Leo radiates dazzling brilliance in every area, with the universe's spotlight shining on you. Use your powerful personal presence midweek to advance your plans, and enjoy the abundant results over the weekend.",
        "This week brings an interaction in love that truly touches the heart; singles will meet someone who genuinely intrigues them, so don't rush to define it—first enjoy the mutual attraction.",
        "This week your creativity and execution at work earn recognition from senior leaders, potentially bringing extra resources your way or accelerating a promotion.",
        "Fortune clearly rises this week, with delightful returns from creativity-monetizing projects.",
        "This week take care not to over-expend your energy; reserve some for work and love, for full blossoming in every area is the most beautiful.",
      ],
      [
        "This week the Leo is in a state alternating between recharging and blossoming. The first half of the week suits consolidating existing resources, while the second half brings full energy and bold action.",
        "This week love moves at a relaxed, joyful pace; put the fun in the relationship first, laughing together and trying new things together.",
        "This week a task that has piled up for ages will come to a satisfying conclusion.",
        "This week, for finances, consider reading a book on investing or watching a financial-literacy video; building understanding matters more than acting blindly.",
        "This week treat daily health maintenance as a ritual; an exquisite breakfast and graceful exercise are the highest courtesy you can pay yourself.",
      ],
    ],
    month: [
      [
        "This month the Leo enters one of the most dazzling periods of the year, as the Sun's energy lets your personal charm and capability shine to their fullest. Dare to dream and act early in the month, charge ahead midmonth, and savor the fruits of victory at month's end.",
        "This month your love fortune soars all the way up. Take the initiative early in the month to create opportunities; the warmth of love peaks midmonth; and at month's end you carry abundant love and a sense of happiness.",
        "This month your career fortune is equally striking, and a key performance midmonth will become an important milestone in this year's career development.",
        "This month brings a fortune harvest, with multiple channels generating income at once. But windfall gains that come quickly and leave just as fast call for caution.",
        "This month you're brimming with energy, making it a great time to challenge your own limits. Draw up a fitness plan that suits you and stick with it.",
      ],
      [
        "This month the Leo's theme is actively creating your own destiny. The universe has given you abundant energy and superb opportunities; the key is whether you have the courage to reach out and take them.",
        "This month the keyword in love is authenticity. Show your true self and speak your true feelings; by exchanging sincerity for sincerity, the love you gain will be the firmest of cornerstones.",
        "This month your innate leadership is proven at work across various occasions, and you may take on greater responsibilities and roles.",
        "This month your fortune is blessed by the Sun, and the wealth paths you actively cultivate yield notable results.",
        "This month, for health, take care of your heart and back, and keeping a cheerful mood is the Leo's best health secret.",
      ],
      [
        "This month the Leo's charm index and achievement index both hit new highs, bringing substantial progress in both work and life.",
        "This month love is full of memories worth treasuring, and the chance for singles to meet someone special is extremely high this month.",
        "This month brings nonstop brilliance at work, with new progress every week; little by little it adds up, and looking back at month's end you'll realize how far you've come.",
        "This month fortune leans favorable overall; avoid excessively showy spending and channel surplus income into savings or low-risk investments.",
        "This month your health is good; keep up your exercise habit, especially aerobic exercise that benefits the heart and lungs.",
      ],
    ],
  },

  virgo: {
    today: [
      [
        "Today, blessed by Mercury's precise energy, your mind as a Virgo works like a precision instrument, finding the optimal solution to any problem. Save the toughest nut to crack for today.",
        "Love today calls for attention to detail; the little things you quietly do are in fact all noticed by the other person. A proactive show of care or a thoughtful gesture is worth more than a hundred sweet words.",
        "Work today suits tasks of deep focus; eliminate distractions and let your logical thinking unfold fully.",
        "Fortune today favors meticulous financial planning; reviewing bills and organizing spending records, your rigor will directly improve your financial health.",
        "Your physical condition is good; take care of your digestive system, as regular meals and chewing slowly are today's most effective health-management methods.",
      ],
      [
        "Today the Virgo's precision and diligence reach their peak; no matter how complex the task, you can handle it one step at a time in an orderly way.",
        "Love today is expressed through service and giving, and your attentive care makes the other person feel cherished. Doing carries more power than saying.",
        "At work today your analytical report or proposal will earn higher praise than expected; care and rigor are your irreplaceable value within the team.",
        "Fortune today favors organizing your financial products, comparing yields, and making a small optimizing adjustment.",
        "Today is a reminder to protect your cervical and lumbar spine; do neck-rotation exercises once every hour.",
      ],
      [
        "Today is a good time for the Virgo to recharge; it suits immersing yourself in something you love, not for any utilitarian purpose but purely for inner satisfaction.",
        "Love today calls for setting aside some perfectionist expectations; allowing both yourself and your partner to have imperfections actually makes the relationship more humane.",
        "Work today suits reflection and summary; organize what you've recently learned into a system, and these accumulations will play a major role in the future.",
        "Fortune today favors observation; study and research investment categories you're interested in, for building judgment is more valuable than rushing to act.",
        "Today pay attention to dietary variety to ensure balanced nutrition, and stay alert to the subtle signals your body sends.",
      ],
    ],
    tomorrow: [
      [
        "Tomorrow is a prime time for efficient output; schedule the tasks that most require care and precision for tomorrow, and their quality will far exceed an ordinary day.",
        "Tomorrow in love, go ahead and voice the praise you usually feel too shy to say; the merits you've noticed in the other person become a special gift when spoken aloud.",
        "Tomorrow your attention to one detail at work will avert a potential mistake; your rigor is not harshness but a rare professional value.",
        "Tomorrow suits drawing up a financial plan for the next three months; clear numerical goals will make your money management clearer and more effective.",
        "Tomorrow your diet is best centered on grains and vegetables, giving your digestive system a chance for a gentle reset.",
      ],
      [
        "Tomorrow your problem-solving ability peaks, and a difficulty that has bothered you for a while will be resolved in an unexpected way.",
        "Tomorrow in love, a sincere apology or thank-you will dissolve the small misunderstandings that have built up recently.",
        "Tomorrow at the work meeting your suggestions will be seriously considered; well-prepared and clearly expressed, your professionalism will be further established.",
        "Tomorrow fortune is steady; avoid being swayed by others' investment advice and stick to your habit of careful evaluation.",
        "Tomorrow is a good day for a health check; prevention is far better than treatment after the fact.",
      ],
      [
        "Tomorrow your mind runs clearly, making it suitable to advance research or writing work that requires sustained focus.",
        "Tomorrow in love, respond to your partner's emotions with companionship rather than solutions; sometimes the other person simply needs to be heard.",
        "Tomorrow at work, prepare your task list for the day and arrange it by priority, advancing things by the principle of minimum necessary action.",
        "Tomorrow you can systematically review your current spending structure and find the subscriptions or services you pay for but rarely use, then cancel them promptly.",
        "Tomorrow suits learning a new set of meditation or relaxation techniques to help you recover quickly after intense mental exertion.",
      ],
    ],
    week: [
      [
        "This week the Virgo's fortune is steadily improving, with everything developing in a better direction. This week is especially suited to completing an important task that has long piled up.",
        "This week your love fortune is warm and grounded; for singles, your appeal comes from your professional air and delicate thoughtfulness, and the kindred spirit you meet this week will be deeply drawn to these qualities.",
        "At work this week your energy and insight are both excellent, handling detail-heavy work with ease; the completion of an important analysis or report will win you high recognition.",
        "This week fortune favors steadiness over rushing; diligently carry out your existing financial plan, and this week's patience will bring considerable returns in the months ahead.",
        "This week, for health, pay special attention to keeping your abdomen warm and eating regularly, as the Virgo's digestive system is especially sensitive to stress.",
      ],
      [
        "This week the Virgo enters a virtuous cycle of fortune, where each day's accumulation is like a deposit into a savings account. Focus on doing every small thing well, and the big things will naturally fall into place.",
        "This week the degree of care in love determines the richness of the reward; the Virgo who tends a relationship earnestly will receive a response beyond expectation this week.",
        "This week your systematic thinking and execution stand out especially among colleagues at work, and a new collaboration opportunity may open up because of it.",
        "This week the key to money management is avoiding impulse; keep steadily following the plan you've made and don't be swayed by short-term fluctuations.",
        "This week your health is good; set your daily exercise goal a little lower so the sense of accomplishment from completing it can accumulate.",
      ],
      [
        "This week is a good time for the Virgo to cultivate both inner and outer growth—steadily advancing work and life externally while carefully refining your understanding and skills internally.",
        "This week your love line holds a chance for deep conversation, and the Virgo's thoughtful, considered expression will make the other person feel especially valued this week.",
        "This week at work, focus on maintaining relationships with colleagues; your consistently reliable image will deliver important networking value this week.",
        "This week your fortune brings a small reward that surprises you, perhaps from an event you joined earlier or a platform points redemption.",
        "This week put sleep first in your health priorities; before bed, organize the next day's task list so your brain can hand off the shift in advance.",
      ],
    ],
    month: [
      [
        "This month the Virgo enters a golden period of refining for perfection; early in the month organize your current situation and identify the core goal most worth focusing on; press the attack with full force midmonth; and reap the results at month's end.",
        "This month your love fortune is steady and warm, with affection deepening through everyday caring details. Month's end is a good time to express thanks and appreciation.",
        "This month your all-around abilities get a chance to be fully displayed at work; a report or proposal midmonth is the key node, so prepare it carefully.",
        "This month fortune rises steadily, and income in your professional field may see unexpected growth. Spending on health and learning is more than worth it.",
        "This month your health fortune is excellent, making it a great time to establish a systematic health-management plan.",
      ],
      [
        "This month the Virgo's keyword is precise breakthrough; use your innate analytical ability to find the highest-value point of leverage at the current stage and concentrate your resources to press the attack with full force.",
        "This month perfectionism is the biggest challenge in love; try to accept the imperfections in the relationship, and you'll find that once you let go of your standards, love instead reveals a truer, more moving form.",
        "This month at work suits making a deep investment in one core skill; that professional field you've always wanted to master—this month is the best time to break through.",
        "This month the highlight of your fortune is turning professional skills into extra income; your expertise is already enough to monetize.",
        "This month the most worthwhile investment in health is improving the quality of your diet—choose natural, fresh, minimally processed foods.",
      ],
      [
        "This month the Virgo's patience and persistence meet their richest reward period, as every seed planted in the past begins to bear fruit this month.",
        "This month your thoughtfulness and care touch every important person around you; remember to also accept being loved, not only to give love.",
        "This month brings plenty of career opportunities, and every one you seize is an accumulation; stay sensitive to opportunity while not putting too much pressure on yourself.",
        "This month your fortune trends favorable overall; maintain a balance between thrifty household management and active enterprise.",
        "This month your greatest health improvement comes from reducing self-criticism; be a little more lenient with yourself—you've already done very well.",
      ],
    ],
  },
};

export const TW_TEMPLATES_3: T = {
  leo: {
    today: [
      [
        "今日太陽能量璀璨，獅子座天生的王者風範格外耀眼。無論走到哪裡都是焦點，適合主動出擊、展現才華。一次公開發言或展示的機會將帶來意想不到的驚喜。",
        "感情今日熱情如火，你的愛意表達方式直接而有力。伴侶會被你的熱情深深打動；單身者今日勇敢邁出第一步，成功的機率遠超平時。",
        "工作上今日領導力爆發，你的決斷力和氣場讓團隊信心倍增。把握機會主導一個專案或會議。",
        "財運今日偏旺，可能收到一筆意外之財。在娛樂、藝術相關的投資或消費上，今日有不錯的回報。",
        "體力充沛，是高強度運動的好時機。注意補充水分，避免過熱引發的不適。",
      ],
      [
        "今日你的氣場強大到無法忽視，走進任何場合都能瞬間點亮氣氛。把這種天然的感召力用在最值得的地方。",
        "愛情今日充滿激情與浪漫，一個自發的驚喜舉動將成為雙方心中的甜蜜回憶。單身者今日的個人魅力達到峰值。",
        "職場今日是爭取資源和展現才能的最佳時機，你的自信和專業會讓決策者對你留下深刻的好印象。",
        "財運今日有一筆與創作、表演或藝術相關的額外收益潛力，把你的才華變現的時機已經成熟。",
        "今日適合動感音樂搭配有氧運動，讓身體和精神都在最高頻率上燃燒。",
      ],
      [
        "今日的獅子座進入短暫的蓄力狀態，這並不是能量消退，而是下一次爆發前的積蓄。適合靜心規劃、整理思路。",
        "感情今日以傾聽為主，讓伴侶感受到你的關注與尊重，比任何華麗的表達都更能加固感情的根基。",
        "工作上今日適合整理專案進度，回顧成果，找出可優化的環節。",
        "財運今日適合盤點理財組合，看是否有需要調倉的標的。今日的財運適合守成而非進取。",
        "今日適合輕鬆的體能活動，如瑜伽或游泳，為身體從高強度狀態中提供恢復的機會。",
      ],
    ],
    tomorrow: [
      [
        "明日一次公開展示或分享機會將帶來超預期的正面回饋，你的獨特視角和表達方式將讓聽眾印象深刻。",
        "明日感情上有一個令雙方都開心的驚喜在等著，保持愉快的心情迎接它的到來。",
        "明日工作中遇到需要決斷的時刻，相信你的判斷力，果斷行動。拖延只會消耗你的優勢。",
        "明日財運小幅上揚，一筆由自己的才能帶來的額外收益即將兌現。",
        "明日避免空腹進行劇烈運動，合理安排飲食與運動的時間間隔。",
      ],
      [
        "明日你的個人魅力加持到最強，無論是工作談判還是社交活動，你都是當之無愧的中心。",
        "明日伴侶或心儀對象對你投來格外關注的目光，珍惜這份感情上的認可與欣賞。",
        "明日職場上你的一個大膽想法將得到意外的支持，不要因為擔心他人眼光而壓制自己的創意。",
        "明日有小額投資機會出現，結合自己的專業判斷謹慎嘗試。",
        "明日精力充沛，推薦進行一項你一直想嘗試的運動。",
      ],
      [
        "明日適合做一件關愛自己的事，滋養內心的豐盛感。",
        "明日感情需要一點耐心，伴侶可能處於需要關注的狀態，你的理解和陪伴是他們最需要的。",
        "明日工作上專注完成一件事的價值遠大於同時開始多件事，完成比完美更重要。",
        "明日消費衝動較強，購物前問自己：這件東西三個月後還會讓我滿意嗎？",
        "明日睡前給大腦一段安靜的過渡時間，避免刺激性內容，讓睡眠更深沉。",
      ],
    ],
    week: [
      [
        "本週獅子座的運勢如太陽升起，越來越明亮。週中一次關鍵的展示機會，將是本月乃至本季職涯發展的重要轉捩點。",
        "本週感情線上充滿了甜蜜與熱情，已戀愛者在週中營造一次專屬的浪漫時光；單身者本週的緣分運旺盛。",
        "職場上本週領導力全面爆發，適合推進需要多方協調和果斷決策的專案。週中一次重要會議是你展現綜合能力的舞台。",
        "本週財運旺盛，有意外進帳或投資收益兌現的可能。把握好本週的財運，做出一個明智的理財規劃。",
        "本週體力旺盛，把運動變成一種社交活動，邀請朋友一起，樂趣倍增堅持更容易。",
      ],
      [
        "本週獅子座在各方面都展現出耀眼的光芒，宇宙的聚光燈打在你身上。週中借助強大的個人氣場推進計畫；週末享受豐盛的成果。",
        "本週感情中有一次真正觸動心弦的互動，單身者遇到一個讓你真心好奇的人，不要急於定義，先享受彼此的吸引。",
        "本週職場中你的創意與執行力獲得高層認可，可能帶來額外的資源傾斜或晉升加速。",
        "本週財運上升明顯，創意變現類專案有令人驚喜的收益。",
        "本週注意避免過度消耗體力，留一部分精力用於工作和感情，全面綻放才是最美的。",
      ],
      [
        "本週獅子座處於一個充電與綻放交替的狀態，前半週適合整合既有資源，後半週能量全開，大膽行動。",
        "本週感情節奏輕鬆愉快，把關係中的好玩放在第一位，一起大笑、一起嘗試新事物。",
        "本週工作上有一個積壓已久的任務會在本週以令人滿意的方式結束。",
        "本週理財建議看一本關於投資的書或看一集財商類影片，提升認知比盲目操作更重要。",
        "本週把日常健康維護當作一種儀式感來對待，精緻的早餐、優雅的運動，都是對自己的最高禮遇。",
      ],
    ],
    month: [
      [
        "本月獅子座迎來全年中最閃耀的時期之一，太陽能量使你的個人魅力和實力都得到最大程度的發揮。月初敢想敢做，月中高歌猛進，月末享受勝利果實。",
        "本月感情運勢一路飆升，月初主動出擊，創造機會；月中感情溫度達到頂峰；月末帶著滿滿的愛意和幸福感。",
        "本月職涯運勢同樣亮眼，月中的一次關鍵表現會成為本年度職涯發展的重要里程碑。",
        "本月財運豐收，多個管道同時帶來收益。但來得快去得也快的偏財需要謹慎對待。",
        "本月精力充沛，是挑戰自身極限的好時機。制定一個適合你的健身計畫並堅持下去。",
      ],
      [
        "本月獅子座的主題是主動創造命運，宇宙給了你充沛的能量和絕佳的機遇，關鍵在於你是否有勇氣伸手去拿。",
        "本月感情關鍵詞是真實，展現真實的自己，說真實的感受，用真心換真情，收穫的愛情將是最堅實的基石。",
        "本月職場上你天生的領導力在各種場合得到驗證，可能承擔更多的責任和角色。",
        "本月財運受太陽庇佑，主動經營的財富路徑效果顯著。",
        "本月健康方面要注意心臟和背部的保養，保持心情愉快是獅子座最好的健康祕訣。",
      ],
      [
        "本月獅子座的魅力指數與成就指數雙雙創下新高，無論是在職場還是生活中，都會有實質性的進展。",
        "本月感情上充滿了值得珍藏的回憶，單身者在本月遇到對象的機率極大。",
        "本月職場精彩不斷，每一週都有新的進展，積少成多，月末回望會發現自己走了好遠的路。",
        "本月財運整體偏旺，避免過度炫耀性消費，把多餘的收益轉入儲蓄或低風險理財。",
        "本月健康良好，保持運動習慣，尤其是有益心肺功能的有氧運動。",
      ],
    ],
  },

  virgo: {
    today: [
      [
        "今日水星的精準能量加持，處女座的你思維如同精密儀器，面對任何問題都能找到最優解。把最難啃的骨頭留到今天解決。",
        "感情今日注重細節，你默默做到的那些小事對方其實都看在眼裡。一次主動的關心或一個貼心的舉動，效果勝過百句情話。",
        "工作上今日適合進行深度專注的任務，規避干擾，讓你的邏輯思維完全展開。",
        "財運今日適合做細緻的財務規劃，核查帳單、整理消費記錄，你的嚴謹將直接提升財務健康度。",
        "身體狀態良好，注意消化系統的保養，規律飲食、細嚼慢嚥是今日最有效的健康管理方式。",
      ],
      [
        "今日處女座的精準與勤勉達到峰值，不論面對多繁雜的任務，你都能有條不紊地逐一處理。",
        "愛情今日以服務和付出的方式表達，你的細心照料令對方感到被珍視。做就比說更有力量。",
        "職場上今日你的分析報告或方案會得到高於預期的好評，細心和嚴謹是你在團隊中無可取代的價值所在。",
        "財運今日有利於整理理財產品，對比收益率，做出一次小的優化調整。",
        "今日提醒注意頸椎和腰椎的保護，每隔一小時做頸部旋轉運動。",
      ],
      [
        "今日是處女座充電的好時機，適合沉浸在一件自己熱愛的事情中，不為任何功利目的，只為內心的滿足。",
        "感情今日放下一些完美主義的期待，允許自己和伴侶都有不完美的地方，這反而讓感情更有人情味。",
        "工作上今日適合反思和總結，把近期學到的東西整理成系統，這些積累將在未來發揮大作用。",
        "財運今日以觀察為主，在感興趣的投資品類上多學習研究，積累判斷力比急於出手更有價值。",
        "今日注意飲食的多樣性，確保營養均衡，同時留意身體發出的細微訊號。",
      ],
    ],
    tomorrow: [
      [
        "明日是高效產出的絕佳時機，把最需要細心和精確的任務排在明日，品質遠超平日。",
        "明日在感情中不妨說出平時不好意思說的讚美，你發現的對方優點，說出來是一份特別的禮物。",
        "明日工作中的一個細節關注將避免一次潛在的失誤，你的嚴謹不是苛刻，而是不可多得的專業價值。",
        "明日適合整理一份未來三個月的財務計畫，明確的數字目標會讓你的理財行為更加清晰有效。",
        "明日飲食宜以穀物、蔬菜為主，給消化系統一次溫和的休整機會。",
      ],
      [
        "明日你的問題解決能力達到高峰，一個困擾了你一段時間的難題，將以出乎意料的方式得到解答。",
        "明日感情上一次真誠的道歉或感謝將化解近期積累的小誤解。",
        "明日工作會議上你的建議會被認真考慮，準備充分、表達清晰，你的專業性將進一步確立。",
        "明日財運平穩，避免受到他人的投資建議影響，堅持自己審慎評估的習慣。",
        "明日是進行健康檢查的好日子，做好預防遠勝於事後治療。",
      ],
      [
        "明日大腦運轉清晰，適合推進需要持續專注的研究或寫作類工作。",
        "明日感情上以陪伴而非解決方案來回應對方的情緒，有時候對方只是需要被傾聽。",
        "明日職場上做好明日的任務清單，按優先級排列，用最小必要行動原則推進。",
        "明日可以系統性地研究一下當前的消費結構，找出付了錢但很少用的訂閱或服務，及時取消。",
        "明日適合學習一套新的冥想或放鬆技巧，幫助你在高強度精神消耗後快速恢復。",
      ],
    ],
    week: [
      [
        "本週處女座的運勢在穩步提升中，一切都在朝著更好的方向發展。本週特別適合完成一個積壓已久的重要任務。",
        "本週感情運勢溫暖踏實，單身者的吸引力來自你的專業氣質和細膩體貼，本週遇到的有緣人會被這些品質深深吸引。",
        "職場上本週精力與洞察力俱佳，處理細節複雜的工作得心應手，一個重要分析或報告的完成將為你贏得高度認可。",
        "本週財運宜穩不宜衝，認真執行既有的理財計畫，本週的耐心將在未來數月帶來可觀的回報。",
        "本週健康方面特別注意腹部保暖和規律飲食，處女座的消化系統對壓力尤為敏感。",
      ],
      [
        "本週處女座進入一個良性循環的運勢軌道，每一天的積累都像存入儲蓄帳戶。專注做好每件小事，大事自然水到渠成。",
        "本週感情中的用心程度決定了回報的豐厚程度，認真經營感情的處女座在本週得到的回應會超出預期。",
        "本週工作中你的系統性思維和執行力在同事中格外突出，一個新的合作機會可能因此向你打開。",
        "本週理財的關鍵是不衝動，持續堅持已制定的計畫，不被短期波動影響。",
        "本週健康狀態良好，把每天的運動目標設定得略低一些，讓完成的成就感積累。",
      ],
      [
        "本週對處女座而言是一個內外兼修的好時機，外部穩步推進工作與生活，內部細細打磨自己的認知與技能。",
        "本週感情線上有一次深度交流的機會，處女座深思熟慮的表達在本週會讓對方感到格外受重視。",
        "本週職場上注重與同事的關係維護，你一貫的靠譜形象在這週會發揮出重要的人脈價值。",
        "本週財運有一個讓你意外的小獎勵，可能來自之前參與的某個活動或平台積分兌換。",
        "本週把睡眠排在健康優先級的第一位，睡前整理第二天的任務清單，讓大腦提前交班。",
      ],
    ],
    month: [
      [
        "本月處女座迎來一段精益求精的黃金時期，月初整理現狀，找出最值得聚焦的核心目標；月中全力攻堅；月末收穫成果。",
        "本月感情運勢穩健而溫暖，愛情在日常的關愛細節中不斷加深。月末是表達感謝與欣賞的好時機。",
        "本月職場上你的綜合能力得到全面施展的機會，月中的一次匯報或提案是關鍵節點，認真準備。",
        "本月財運穩健上行，專業領域的收入可能出現意外增長。健康、學習類支出物超所值。",
        "本月健康運勢極佳，是建立系統性健康管理方案的好時機。",
      ],
      [
        "本月處女座的關鍵詞是精準突破，用你天生的分析能力找到當前階段最高價值的著力點，集中資源全力攻堅。",
        "本月感情中完美主義是最大的挑戰，試著接受關係中的不完美，你會發現放下標準之後，愛情反而展現出更真實動人的模樣。",
        "本月職場上適合在一個核心技能上做深度投入，那個你一直想精進的專業領域，本月是最好的突破時機。",
        "本月財運的亮點在於把專業技能轉化為額外收益，你的專業度已經足夠變現。",
        "本月在健康上最值得投入的是飲食品質的提升，選擇天然、新鮮、低加工的食物。",
      ],
      [
        "本月處女座的耐心與堅持迎來了最豐厚的回報期，過去種下的每一顆種子都在本月開始結果。",
        "本月感情上你的體貼和用心感動了身邊的每一個重要的人，記得也接受被愛，而不只是付出愛。",
        "本月職場機遇頗多，每一次把握都是積累，保持對機遇的敏感，同時不要給自己太大壓力。",
        "本月財運整體向好，保持勤儉持家與積極進取的平衡。",
        "本月健康最大的提升來自減少自我批評，對自己寬容一點，你已經做得很好了。",
      ],
    ],
  },
};

export const EN_TITLES_3: Ti = {
  leo: {
    today: ["Regal Presence on Full Display", "Shining Under the Spotlight", "A Good Time to Gather Strength"],
    tomorrow: ["Charm Cranked to the Max", "Radiating Brilliance", "Caring for Yourself Matters Most"],
    week: ["The Sun Rises This Week", "A Dazzling Moment to Blossom", "Recharging and Blossoming in Turn"],
    month: ["The Month's Highlight Moment", "A Month to Actively Shape Your Destiny", "A Double Harvest of Charm and Achievement"],
  },
  virgo: {
    today: ["Precise Execution Goes Live", "A Day of Efficient Output", "A Good Time to Settle and Reflect"],
    tomorrow: ["Problem-Solving at Its Peak", "A Day of Deep Focus", "A Day to Recharge and Gather Strength"],
    week: ["Steady Improvement This Week", "A Week of Virtuous Cycles", "A Good Time to Cultivate Inner and Outer Growth"],
    month: ["A Month of Refining for Perfection", "A Month of Precise Breakthrough", "A Month of Patient Harvest"],
  },
};

export const TW_TITLES_3: Ti = {
  leo: {
    today: ["王者風範盡顯", "聚光燈下閃耀", "蓄力待發的好時機"],
    tomorrow: ["魅力值拉滿的一天", "光芒四射", "關愛自己最重要"],
    week: ["本週太陽升起", "耀眼的綻放時刻", "充電與綻放交替"],
    month: ["本月高光時刻", "主動創造命運之月", "魅力與成就雙豐收"],
  },
  virgo: {
    today: ["精準執行力上線", "高效產出的一天", "沉澱與思考的好時光"],
    tomorrow: ["問題解決能力巔峰", "深度專注的一天", "充電蓄力的日子"],
    week: ["本週穩步提升", "良性循環的一週", "內外兼修的好時機"],
    month: ["本月精益求精", "精準突破之月", "耐心收穫的月份"],
  },
};
