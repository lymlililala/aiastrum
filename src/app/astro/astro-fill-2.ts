import type { ZodiacSign, Planet, AspectType } from "./astro-data";

// ============================================================
// PLANET_IN_SIGN_KEYWORDS — English
// ============================================================
export const PIS_EN: Partial<Record<Planet, Partial<Record<ZodiacSign, string>>>> = {
  Mercury: {
    Aries: "Direct and sharp-minded; speaks bluntly and thinks on their feet.",
    Taurus: "Steady, practical thinking; speaks methodically and grounds ideas in reality.",
    Gemini: "Extremely agile mind, boundless curiosity, and a natural gift for language.",
    Cancer: "Intuitive, feeling-led thinking; senses what is left unsaid.",
    Leo: "Confident, magnetic expression with a flair for dramatic storytelling.",
    Virgo: "Precise, meticulous analysis; rigorous logic and a focus on the practical.",
    Libra: "Fair-minded and balanced; expresses ideas with elegance and an artistic touch.",
    Scorpio: "Penetrating insight; uncovers hidden information and rarely shows their hand.",
    Sagittarius: "Big-picture thinking; gifted at synthesis and rich in philosophical flavor.",
    Capricorn: "Orderly, practical thinking; skilled at long-term planning.",
    Aquarius: "Innovative, forward-looking ideas; breaks free of conventional thinking.",
    Pisces: "Rich intuition and vivid imagination; thinking that sometimes defies logic.",
  },
  Venus: {
    Aries: "Loves passionately and proactively; craves excitement and longs to be the hero in a partner's eyes.",
    Taurus: "Stable and loyal in love; treasures sensual pleasure and sees material security as love's foundation.",
    Gemini: "Needs intellectual exchange in love; enjoys light, playful romance.",
    Cancer: "Deep, tender affection; expresses love through caretaking and longs for emotional security.",
    Leo: "Loves intensely and dramatically; craves adoration and loves with grand generosity.",
    Virgo: "Expresses love through details and acts of service; values quality and practicality in relationships.",
    Libra: "Longs for a perfectly harmonious partner; beauty and fairness are love's first conditions.",
    Scorpio: "Loves deeply, exclusively, even possessively; yearns for a soul-deep merging.",
    Sagittarius: "Free-spirited and easygoing in love; longs to explore the world alongside a partner.",
    Capricorn: "Practical and cautious in love; values a partner's social standing and stability.",
    Aquarius: "Needs friendship as love's foundation; craves intellectual independence and equality.",
    Pisces: "Loves as if in a dream, with a self-sacrificing spirit; easily loses themselves in love.",
  },
  Mars: {
    Aries: "Exceptionally driven; charges straight at goals, full of competitive spirit.",
    Taurus: "Acts slowly but powerfully; once decided, sees things through to the end.",
    Gemini: "Acts on many fronts at once; strikes with words and adapts with ease.",
    Cancer: "Driven by emotion; strongly protective and cautious in action.",
    Leo: "Full of passion and drama; competitive and longs to lead.",
    Virgo: "Acts with precision and efficiency; channels energy through the details.",
    Libra: "Achieves goals through relationships and cooperation; favors indirect strategy.",
    Scorpio: "Iron-willed; acts with deep, quiet force and excels at maneuvering behind the scenes.",
    Sagittarius: "Full of passion and idealism; acts directly and boldly.",
    Capricorn: "Acts with discipline and purpose; skilled at building strength over the long haul.",
    Aquarius: "Acts in innovative ways, with collective awareness and a forward-looking vision.",
    Pisces: "Action easily guided by intuition; energy waxes and wanes.",
  },
};

// ============================================================
// PLANET_IN_SIGN_KEYWORDS — Traditional Chinese
// ============================================================
export const PIS_TW: Partial<Record<Planet, Partial<Record<ZodiacSign, string>>>> = {
  Mercury: {
    Aries: "思維直接犀利，說話直截了當，反應迅速",
    Taurus: "思考穩健務實，說話有條有理，善於落地",
    Gemini: "思維極度靈活，好奇心旺盛，語言天賦出眾",
    Cancer: "思維感性直覺強，善於感知言外之意",
    Leo: "表達自信有感染力，擅長戲劇性敘事",
    Virgo: "分析精準細緻，邏輯嚴密，注重實用",
    Libra: "思維公允，善於權衡，表達優雅有藝術感",
    Scorpio: "洞察力極強，擅長發現隱藏訊息，不輕易表態",
    Sagittarius: "思維宏觀，善於歸納，充滿哲學意味",
    Capricorn: "思維有條理，實際，善於長期規劃",
    Aquarius: "思想創新前衛，善於跳脫思維定式",
    Pisces: "直覺豐富，想像力旺盛，思維有時不拘邏輯",
  },
  Venus: {
    Aries: "愛情熱烈主動，追求刺激，渴望成為伴侶眼中的英雄",
    Taurus: "感情穩定忠誠，注重感官享受，視物質穩定為愛的基礎",
    Gemini: "愛情需要智識上的交流，喜歡輕盈有趣的浪漫",
    Cancer: "感情深厚細膩，愛用照顧來表達愛，渴望情感上的安全感",
    Leo: "愛情濃烈戲劇化，渴望被崇拜，愛的方式大方慷慨",
    Virgo: "透過細節與服務表達愛，愛情中注重品質與實際",
    Libra: "渴望完美的和諧伴侶，美麗與公平是愛情的首要條件",
    Scorpio: "愛得深沉、專一甚至佔有，渴望靈魂深處的融合",
    Sagittarius: "愛情自由灑脫，渴望與伴侶一起探索世界",
    Capricorn: "愛情務實謹慎，重視伴侶的社會地位與穩定性",
    Aquarius: "愛情需要友誼為基礎，渴望精神上的獨立與平等",
    Pisces: "愛情如詩如幻，具有犧牲精神，容易在愛中迷失",
  },
  Mars: {
    Aries: "行動力極強，直接衝向目標，充滿競爭意識",
    Taurus: "行動緩慢而有力，一旦決定便堅持到底",
    Gemini: "行動多線並進，善於言辭出擊，靈活多變",
    Cancer: "以情感驅動行動，保護慾強，行事謹慎",
    Leo: "充滿激情與戲劇感，爭強好勝，渴望成為領袖",
    Virgo: "行動精準有效率，擅於在細節中發力",
    Libra: "透過關係與合作實現目標，傾向於迂迴策略",
    Scorpio: "意志極強，行動深沉有力，擅於在暗處布局",
    Sagittarius: "充滿激情與理想主義，行動直接大膽",
    Capricorn: "行動有紀律有目標，善於長期累積實力",
    Aquarius: "以創新方式行動，具有集體意識與前瞻視野",
    Pisces: "行動易受直覺引導，能量時強時弱",
  },
};

// ============================================================
// PLANET_IN_HOUSE_INTERPRETATIONS — English
// ============================================================
export const PIH_EN: Partial<Record<Planet, Partial<Record<number, string>>>> = {
  Sun: {
    1: "Your life's core is forging your own identity; your outward image and personal magnetism are the source of your strength.",
    2: "Your self-worth and sense of value are closely tied to material achievement and the accumulation of wealth.",
    3: "Your vitality shines through expression, communication, and learning; writing or speaking may be your gift.",
    4: "Home and roots are the source of your inner strength; you long to build a household full of security.",
    5: "Your light shines brightest in creation and self-expression; art, romance, and children are your life's themes.",
    6: "Your sense of worth is realized through service and the refinement of your work; health and efficiency are your life lessons.",
    7: "Significant partnerships are the heart of your life's stage; others act as mirrors that reveal your true self.",
    8: "Your life is shaped by profound transformation; crisis and rebirth are your most familiar themes.",
    9: "You find life's meaning in philosophy, faith, and far-flung exploration; travel and higher education are vital to you.",
    10: "Career achievement and social recognition are the core drivers of your life; your public image carries great weight.",
    11: "You find yourself among like-minded groups and friendships; realizing social ideals is your life's mission.",
    12: "Your power lies hidden deep in the subconscious; spiritual practice and self-transcendence are your life's ultimate lessons.",
  },
  Venus: {
    1: "Your appearance and presence radiate natural charm; relationships profoundly shape your self-image.",
    2: "You experience love through material and sensual pleasure; investing in beautiful things brings you joy.",
    3: "Your charm shows in communication and expression; you forge lovely connections through words.",
    4: "Family and a beautified home nourish you emotionally; you hold deep feelings for your domestic ties.",
    5: "Love, art, and creation are the most beautiful scenery in your life; a romantic flair is your gift.",
    6: "You bring grace and a cooperative spirit to your work, with a keen eye for beauty in your environment.",
    7: "Marriage and partnership are the most important themes of your life; you would give everything for a meaningful bond.",
    8: "You are drawn to mysterious, deep relationships; shared assets and a partner's resources are a source of wealth.",
    9: "Your ideal of love is lofty and romantic; you long to explore the world and the frontiers of the spirit with a partner.",
    10: "Your career and public image may relate to art, beauty, or public relations; charm is your professional capital.",
    11: "Friendship matters enormously to you; you may meet a key partner or ally through community activities.",
    12: "Your patterns in love run deep through the subconscious; secret romances or spiritual connections draw you in.",
  },
  Mars: {
    1: "You make a first impression of energy and drive; a competitive instinct is second nature to you.",
    2: "Your drive springs from the pursuit of financial security; material goals can unleash powerful motivation.",
    3: "Your mind is quick and your words forceful; you excel at winning arguments, and language is your weapon.",
    4: "There may be competition and friction within the home; you have a strong instinct to protect your family.",
    5: "You release your energy in creation, romance, and competition; your passion and ardor leave a strong impression.",
    6: "You are a highly efficient worker, full of drive in your daily duties—just be careful not to be too hard on yourself.",
    7: "Your key relationships brim with tension and passion; you are drawn to strong, opinionated partners.",
    8: "Your willpower runs deep and strong; you thrive in crisis and have a fierce urge to explore the unknown.",
    9: "Your drive is fueled by belief and ideals; you are willing to fight for your philosophy of life.",
    10: "Your career ambition is fierce; you long to claim your place in your field, with a strong drive to lead.",
    11: "In groups you are often the one who initiates action; fighting for a shared ideal sets your blood racing.",
    12: "Your actions often unfold quietly behind the scenes; deep within lies a powerful, hidden strength.",
  },
};

// ============================================================
// PLANET_IN_HOUSE_INTERPRETATIONS — Traditional Chinese
// ============================================================
export const PIH_TW: Partial<Record<Planet, Partial<Record<number, string>>>> = {
  Sun: {
    1: "你的人生核心是建立自我認同，外在形象與個人魅力是你的力量源泉。",
    2: "你的自尊與價值感與物質成就和財富累積緊密相連。",
    3: "你的生命力透過表達、溝通與學習來彰顯，寫作或演講可能是你的天賦。",
    4: "家庭與根基是你內心力量的來源，你渴望建立一個充滿安全感的家。",
    5: "你的光芒在創造與自我表達中最為耀眼，藝術、戀愛與孩子是你的人生主題。",
    6: "你的自我價值透過服務與精進工作來實現，健康與效率是你的人生課題。",
    7: "重要的伴侶關係是你人生舞台的核心，他人如同鏡子，照見你的真實面目。",
    8: "你的人生被深層的轉化所塑造，危機與重生是你最熟悉的生命主題。",
    9: "你在哲學、信仰與遠方探索中找到人生意義，旅行與高等教育對你至關重要。",
    10: "事業成就與社會認可是你人生的核心驅動，公眾形象對你意義重大。",
    11: "你在志同道合的團體與友誼中找到自我，實現社會理想是你的人生使命。",
    12: "你的力量隱藏在潛意識深處，靈性修行與自我超越是你人生的終極課題。",
  },
  Venus: {
    1: "你的外貌與氣質散發著自然的魅力，人際關係對你的自我形象影響深遠。",
    2: "你透過物質與感官享受來體驗愛，對美麗事物的投資讓你感到愉悅。",
    3: "你的魅力體現在溝通與表達中，善於用文字或言語建立美好的連結。",
    4: "家庭與家居美化是你的情感滋養，你對家庭關係有著深厚的感情。",
    5: "愛情、藝術與創造是你人生中最美麗的風景，浪漫情調是你的天賦。",
    6: "你在工作中表現出優雅與合作精神，對工作環境的美感有較高的要求。",
    7: "婚姻與伴侶是你人生中最重要的主題，你為重要關係願意付出一切。",
    8: "你被神秘、深度的關係所吸引，共有資產與伴侶的資源是你的財富來源。",
    9: "你的愛情理想崇高而浪漫，渴望與伴侶一起探索世界與精神的邊界。",
    10: "你的事業與社會形象可能與藝術、美或公共關係相關，魅力是你的職業資本。",
    11: "友誼對你極為重要，你可能在社群活動中遇見重要的伴侶或合作夥伴。",
    12: "你的愛情模式受潛意識影響較深，隱秘的戀情或靈性的聯結吸引著你。",
  },
  Mars: {
    1: "你給人留下活力充沛、行動力強的第一印象，競爭意識是你的本能。",
    2: "你的行動力源於對財富安全感的追求，為了物質目標能爆發強烈的驅動力。",
    3: "你的思維敏捷、語言有力，善於在爭論中取勝，文字是你的武器。",
    4: "家庭內部可能存在競爭與摩擦，你有強烈的保護家人的本能。",
    5: "你在創作、戀愛與競技中釋放能量，你的熱情與激情令人印象深刻。",
    6: "你是一個高效的工作者，在日常職責中充滿幹勁，但需注意別對自己太苛刻。",
    7: "你的重要關係充滿張力與激情，你被強勢有主見的伴侶所吸引。",
    8: "你的意志力深沉而強大，擅於在危機中發力，對未知領域有強烈的探索慾。",
    9: "你的行動力透過信念與理想來驅動，你願意為自己的哲學觀而戰。",
    10: "你的事業野心強烈，你渴望在職業領域中爭得一席之地，領導慾旺盛。",
    11: "你在團體中常常是行動的發起者，為共同的理想而戰令你熱血沸騰。",
    12: "你的行動往往在幕後低調進行，內心深處有著強大的隱藏力量。",
  },
};

// ============================================================
// ASPECT_INTERPRETATIONS — English
// ============================================================
export const ASP_EN: Partial<Record<Planet, Partial<Record<Planet, Partial<Record<AspectType, string>>>>>> = {
  Sun: {
    Moon: {
      conjunction: "Sun conjunct Moon: Your will and emotions are deeply fused—inwardly and outwardly aligned, with strong drive, though at times overly subjective.",
      opposition: "Sun opposite Moon: A tug-of-war between conscious and unconscious; your life's work is finding balance between self-assertion and emotional needs.",
      square: "Sun square Moon: Your rational desires and emotional needs constrain one another; growth comes from integrating these two forces.",
      trine: "Sun trine Moon: Will and emotion resonate in harmony; your inner and outer worlds support each other, your mood is steady and your actions strong.",
      sextile: "Sun sextile Moon: Reason and feeling work well together; you possess sound emotional intelligence and self-regulation.",
    },
    Jupiter: {
      conjunction: "Sun conjunct Jupiter: You are naturally optimistic, full of expansive energy and blessed with luck and opportunity—just guard against overconfidence.",
      trine: "Sun trine Jupiter: A star of good fortune; helpful people often appear in your life, and expansion and growth are your life's keynote.",
      square: "Sun square Jupiter: Overexpansion or overconfidence can lead to misjudgment; you must balance ambition with reality.",
      opposition: "Sun opposite Jupiter: You long for distant horizons but may swing between overcommitting and pulling back.",
      sextile: "Sun sextile Jupiter: Opportunity follows you; your likable, optimistic temperament and social skill open doors to growth.",
    },
    Saturn: {
      conjunction: "Sun conjunct Saturn: Your life's theme is building your self through effort and responsibility; early years may feel constrained, but you build strength that pays off in time.",
      trine: "Sun trine Saturn: You have a gift for turning passion into sustained effort; discipline is an internalized ability, not an external constraint.",
      square: "Sun square Saturn: The road to self-worth is rocky, demanding you overcome inner and outer limits and criticism—yet you grow braver with each battle.",
      opposition: "Sun opposite Saturn: Authority issues and self-limitation within relationships are your growth lessons; learn to be responsible while still honoring yourself.",
      sextile: "Sun sextile Saturn: You have sound self-discipline and can strike a balance between freedom and structure.",
    },
    Pluto: {
      conjunction: "Sun conjunct Pluto: Your life is charged with the energy of deep transformation; power and rebirth are the main themes of your existence.",
      trine: "Sun trine Pluto: You possess profound willpower and the energy to change the status quo; transformation flows naturally for you.",
      square: "Sun square Pluto: Power struggles and intense transformation push you to constantly break down the old and build anew—a flower that blooms through pain.",
      opposition: "Sun opposite Pluto: You experience issues of power through clashes with relationships and outer forces, learning to hold onto yourself amid transformation.",
      sextile: "Sun sextile Pluto: You have insight that pierces appearances; the energy of transformation serves you, profound and enduring.",
    },
    Mars: {
      conjunction: "Sun conjunct Mars: You brim with explosive energy and force of will, a natural leader—yet you must learn to rein in impulsiveness.",
      trine: "Sun trine Mars: Will and drive work in perfect concert; you are full of vigorous life force and can achieve goals effectively.",
      square: "Sun square Mars: Inner impulses and will rub against each other; learn to guide your energy with wisdom and avoid recklessness.",
      opposition: "Sun opposite Mars: Your energy may spark conflict in outer relationships; learn to balance asserting yourself with flexible cooperation.",
      sextile: "Sun sextile Mars: Drive and a sense of purpose reinforce each other; you are someone who turns ideas into action.",
    },
  },
  Moon: {
    Venus: {
      conjunction: "Moon conjunct Venus: You are emotionally tender, longing for beauty and harmony; warm toward others, you easily win their affection.",
      trine: "Moon trine Venus: The energies of feeling and love flow smoothly; you have a natural gift for making relationships beautiful.",
      square: "Moon square Venus: Friction exists between your emotional needs and relationship expectations; learn to accept love along with imperfection.",
      opposition: "Moon opposite Venus: You seek balance between emotional security and giving in relationships, finding the point between attachment and independence.",
      sextile: "Moon sextile Venus: Your feelings are warm and charming; you have a knack for creating a comfortable interpersonal atmosphere.",
    },
    Saturn: {
      conjunction: "Moon conjunct Saturn: Building emotional security has been a hard road; you learned to replace fragility with strength, while deep down longing to be fully accepted.",
      trine: "Moon trine Saturn: You have a mature, responsible emotional attitude and can offer steady support within relationships.",
      square: "Moon square Saturn: Emotional restriction and repression are the core themes you need to heal; allowing yourself to be vulnerable is the first step of growth.",
      opposition: "Moon opposite Saturn: You endure a long tug-of-war between emotional needs and real-world duties; learn that both are real and deserve respect.",
      sextile: "Moon sextile Saturn: You possess emotional maturity, able to express your needs in measure while maintaining stability.",
    },
    Pluto: {
      conjunction: "Moon conjunct Pluto: Your emotional world is deep and intense, your feelings volcanic; you have lived through emotional metamorphosis and rebirth.",
      trine: "Moon trine Pluto: You possess emotional insight and a capacity for deep healing, able to understand the most hidden corners of another's heart.",
      square: "Moon square Pluto: Issues of emotional control and extreme experiences are your growth lessons; learn freedom in the space between letting go and holding on.",
      opposition: "Moon opposite Pluto: Your intimate relationships are charged with the power of deep transformation; the depth of love is both a test and a gift.",
      sextile: "Moon sextile Pluto: Your intuition is keen and profound; you have a gift for perceiving others' deepest emotional needs.",
    },
  },
};

// ============================================================
// ASPECT_INTERPRETATIONS — Traditional Chinese
// ============================================================
export const ASP_TW: Partial<Record<Planet, Partial<Record<Planet, Partial<Record<AspectType, string>>>>>> = {
  Sun: {
    Moon: {
      conjunction: "日月合相：你的意志與情感高度融合，內外一致，行動力強，但有時過於主觀。",
      opposition: "日月對相：意識與潛意識的拉鋸戰，在自我主張與情感需求之間尋找平衡是你的人生功課。",
      square: "日月刑相：內心的理性渴望與情感需求相互制約，成長來自整合這兩股力量。",
      trine: "日月三分：意志與情感和諧共振，你的內外世界相互支持，心情穩定，行動有力。",
      sextile: "日月六分：理性與感性能相互配合，你有著良好的情緒智慧與自我調節能力。",
    },
    Jupiter: {
      conjunction: "日木合相：你天生樂觀，充滿擴張的能量，有幸運與機遇的加持，但需防過度樂觀。",
      trine: "日木三分：幸運之星，你的人生中常有貴人相助，擴展與成長是你的人生底色。",
      square: "日木刑相：過度擴張或自信可能導致判斷失誤，需在野心與現實之間尋找平衡。",
      opposition: "日木對相：你渴望遠方，但可能在過度承諾與收縮退後之間搖擺。",
      sextile: "日木六分：機遇常伴，你有著受人歡迎的樂觀氣質，社交能力為你帶來發展。",
    },
    Saturn: {
      conjunction: "日土合相：你的人生主題是透過努力與承擔責任來建立自我，早年可能感到壓抑但終將厚積薄發。",
      trine: "日土三分：你擁有將熱情轉化為持續努力的天賦，紀律是你內化的能力而非外在束縛。",
      square: "日土刑相：自我價值的建立路途坎坷，需克服內外的限制與批判，但越戰越勇。",
      opposition: "日土對相：關係中的權威議題與自我限制是你的成長課題，需學會在負責任的同時也尊重自己。",
      sextile: "日土六分：你有良好的自律能力，能在自由與結構之間取得平衡。",
    },
    Pluto: {
      conjunction: "日冥合相：你的生命充滿了深度轉化的能量，權力議題與重生是你的人生主旋律。",
      trine: "日冥三分：你擁有深沉的意志力與改變現狀的能量，轉化對你而言是自然流動的過程。",
      square: "日冥刑相：生命中的權力鬥爭與激烈轉化推動你不斷破舊立新，是痛苦中開出的花。",
      opposition: "日冥對相：你在關係與外界力量的碰撞中體驗權力的議題，學習在轉化中保持自我。",
      sextile: "日冥六分：你有著超越表象的洞察力，轉化的能量為你所用，深刻而持久。",
    },
    Mars: {
      conjunction: "日火合相：你充滿爆發性的能量與行動意志，領袖氣質天然，但需學會控制衝動。",
      trine: "日火三分：意志與行動力完美配合，你充滿陽剛的生命力，能有效實現目標。",
      square: "日火刑相：內在的衝動與意志相互摩擦，需學會以智慧引導能量，避免莽撞。",
      opposition: "日火對相：你的能量可能在外部關係中引發衝突，學會在堅持自我與靈活配合之間平衡。",
      sextile: "日火六分：行動力與目標感相互支持，你是一個能將想法付諸實踐的人。",
    },
  },
  Moon: {
    Venus: {
      conjunction: "月金合相：你情感細膩，渴望美麗與和諧，對人充滿溫情，很容易贏得他人的喜愛。",
      trine: "月金三分：情感與愛的能量流動順暢，你天生有著讓關係變得美好的能力。",
      square: "月金刑相：情感需求與關係期待之間存在摩擦，學會接受愛的同時也接受不完美。",
      opposition: "月金對相：你在情感安全感與關係付出之間尋找平衡，需要在依戀與獨立之間找到節點。",
      sextile: "月金六分：你的情感溫暖而有魅力，善於創造舒適的人際關係氛圍。",
    },
    Saturn: {
      conjunction: "月土合相：情感與安全感的建立道路較為艱辛，你學會了用堅強替代脆弱，內心深處渴望被完全接納。",
      trine: "月土三分：你有著成熟、負責任的情感態度，能在關係中給予穩定的支持。",
      square: "月土刑相：情感上的限制與壓抑是你需要療癒的核心主題，允許自己脆弱是成長的第一步。",
      opposition: "月土對相：你在情感需求與現實責任之間長期拉鋸，學會兩者都是真實且值得被尊重的。",
      sextile: "月土六分：你有著情感上的成熟度，能在維持穩定的同時適度表達需求。",
    },
    Pluto: {
      conjunction: "月冥合相：你的情感世界深沉而強烈，情緒可能如火山一般，經歷過情感上的蛻變與重生。",
      trine: "月冥三分：你擁有情感洞察力與深層治癒的能力，能理解他人內心最隱秘的角落。",
      square: "月冥刑相：情感上的控制議題與極端體驗是你的成長課題，在放手與掌控之間學會自由。",
      opposition: "月冥對相：你的親密關係中充滿了深度轉化的力量，愛的深度是考驗也是禮物。",
      sextile: "月冥六分：你的直覺敏銳而深刻，善於洞察他人深層的情感需求。",
    },
  },
};
