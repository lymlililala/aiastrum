// ── 生命灵数 1-9 + 卓越数 11/22/33 · 三语速览数据 ─────────────────
// 供页面底部 SSR 速览卡片网格使用；articleSlug 均已确认在库
// （1-9: life-path-number-N-meaning-guide，卓越数: master-number-N-meaning）。
import type { Lang } from "./life-path-i18n";

export interface LifePathNumberInfo {
  n: number;
  name: string;
  keywords: string[];
  summary: string;
  articleSlug: string | null;
}

export const LIFE_PATH_NUMBERS: Record<Lang, LifePathNumberInfo[]> = {
  en: [
    {
      n: 1,
      name: "The Leader",
      keywords: ["independence", "ambition", "initiative", "courage"],
      summary:
        "Life Path 1 is the pioneer of numerology. You are here to lead, initiate and stand on your own two feet, with a strong will and an original mind. Your lesson is to temper self-reliance with patience — leading others without dominating them.",
      articleSlug: "life-path-number-1-meaning-guide",
    },
    {
      n: 2,
      name: "The Diplomat",
      keywords: ["cooperation", "sensitivity", "harmony", "intuition"],
      summary:
        "Life Path 2 is the peacemaker. You thrive in partnership, read emotions effortlessly, and bring calm wherever there is conflict. Your influence is quiet rather than forceful. The challenge is voicing your own needs instead of always keeping the peace at your own expense.",
      articleSlug: "life-path-number-2-meaning-guide",
    },
    {
      n: 3,
      name: "The Creative",
      keywords: ["expression", "joy", "creativity", "optimism"],
      summary:
        "Life Path 3 is the communicator and artist of the chart. You light up rooms with humor, ideas and creative energy, and you are here to express what others only feel. Scattered focus and self-doubt are the shadows — discipline turns your talent into lasting work.",
      articleSlug: "life-path-number-3-meaning-guide",
    },
    {
      n: 4,
      name: "The Builder",
      keywords: ["discipline", "stability", "hard work", "order"],
      summary:
        "Life Path 4 is the foundation-builder. Practical, honest and tireless, you turn plans into solid reality, and others lean on your reliability. Your path rewards patience and methodical effort. Beware rigidity — life will keep asking you to adapt without abandoning your principles.",
      articleSlug: "life-path-number-4-meaning-guide",
    },
    {
      n: 5,
      name: "The Freedom Seeker",
      keywords: ["freedom", "change", "adventure", "versatility"],
      summary:
        "Life Path 5 lives for movement, variety and experience. You learn through the senses, adapt faster than anyone, and suffocate in routine. Freedom is your compass, but commitment is your lesson: building a life flexible enough to keep growing without burning every bridge.",
      articleSlug: "life-path-number-5-meaning-guide",
    },
    {
      n: 6,
      name: "The Nurturer",
      keywords: ["responsibility", "family", "care", "devotion"],
      summary:
        "Life Path 6 is the caretaker of the chart. Home, community and service give you purpose, and people instinctively turn to you for support and fair judgment. Your challenge is boundaries — helping without controlling, and learning to receive care as readily as you give it.",
      articleSlug: "life-path-number-6-meaning-guide",
    },
    {
      n: 7,
      name: "The Seeker",
      keywords: ["analysis", "wisdom", "spirituality", "introspection"],
      summary:
        "Life Path 7 is the philosopher and analyst. You need solitude, depth and answers beneath the surface, whether through study, science or spiritual practice. Trust is your lesson: opening your inner world to others, and balancing sharp intellect with faith in what cannot be measured.",
      articleSlug: "life-path-number-7-meaning-guide",
    },
    {
      n: 8,
      name: "The Achiever",
      keywords: ["ambition", "power", "success", "authority"],
      summary:
        "Life Path 8 is built for the material world — business, leadership and large-scale achievement come naturally. You are here to master abundance and use power wisely. The recurring test is integrity: money and control amplify whatever you already are, so character is the real curriculum.",
      articleSlug: "life-path-number-8-meaning-guide",
    },
    {
      n: 9,
      name: "The Humanitarian",
      keywords: ["compassion", "idealism", "generosity", "completion"],
      summary:
        "Life Path 9 carries the wisdom of all the numbers before it. You think globally, feel deeply for strangers, and are drawn to art, healing or causes larger than yourself. Your lesson is letting go — of people, outcomes and old selves — so compassion stays free of attachment.",
      articleSlug: "life-path-number-9-meaning-guide",
    },
    {
      n: 11,
      name: "The Intuitive",
      keywords: ["intuition", "inspiration", "sensitivity", "vision"],
      summary:
        "Master Number 11 is the intuitive channel — a heightened, electric version of 2. You receive insights before you can explain them and often feel called to inspire or awaken others. The price is nervous intensity: grounding routines and self-trust turn raw sensitivity into genuine vision.",
      articleSlug: "master-number-11-meaning",
    },
    {
      n: 22,
      name: "The Master Builder",
      keywords: ["vision", "mastery", "ambition", "legacy"],
      summary:
        "Master Number 22 is the most powerful builder in numerology — 4's discipline scaled up to serve the world. You can turn impossible blueprints into institutions that outlive you. The shadow is crushing pressure and misused power: build big without losing your humility or your health.",
      articleSlug: "master-number-22-meaning",
    },
    {
      n: 33,
      name: "The Master Teacher",
      keywords: ["healing", "service", "compassion", "devotion"],
      summary:
        "Master Number 33, the rarest life path, elevates 6's care into selfless service. You are here to heal, teach and uplift, often carrying other people's pain as your own. The hardest lesson: you cannot pour from an empty cup, and boundaries are a form of love too.",
      articleSlug: "master-number-33-meaning",
    },
  ],

  zh: [
    {
      n: 1,
      name: "领导者",
      keywords: ["独立", "魄力", "进取", "开创"],
      summary:
        "灵数 1 是数字世界的开拓者。你天生为领导与开创而来，意志坚定、想法独到，习惯靠自己闯出一条路。你的课题是学会在坚持自我的同时保持耐心——带领他人，而不是支配他人。",
      articleSlug: "life-path-number-1-meaning-guide",
    },
    {
      n: 2,
      name: "外交家",
      keywords: ["合作", "敏感", "和谐", "直觉"],
      summary:
        "灵数 2 是天生的协调者。你在合作中最自在，能敏锐察觉他人的情绪，擅长在冲突中带来平静。你的力量不在于强势，而在于润物细无声。课题是学会说出自己的需求，而不是一味迁就。",
      articleSlug: "life-path-number-2-meaning-guide",
    },
    {
      n: 3,
      name: "创意表达者",
      keywords: ["表达", "创意", "乐观", "热情"],
      summary:
        "灵数 3 是命盘中的沟通者与艺术家。你点子多、有幽默感，能用言语与创作点亮身边的人，天生为表达而来。分心和自我怀疑是你的阴影——学会专注与自律，才华才能沉淀为长久的作品。",
      articleSlug: "life-path-number-3-meaning-guide",
    },
    {
      n: 4,
      name: "建造者",
      keywords: ["自律", "务实", "勤奋", "稳定"],
      summary:
        "灵数 4 是脚踏实地的建设者。你诚实可靠、执行力强，擅长把计划变成稳固的现实，是身边人最依赖的支柱。你的道路奖励耐心与积累。需要留意的是固执——生活会在不违背原则的前提下，反复教你变通。",
      articleSlug: "life-path-number-4-meaning-guide",
    },
    {
      n: 5,
      name: "冒险家",
      keywords: ["自由", "变化", "冒险", "多才"],
      summary:
        "灵数 5 为自由与体验而活。你适应力惊人，通过亲身经历学习，一成不变的环境会让你窒息。自由是你的罗盘，但承诺是你的课题：真正的冒险，是建立一种既能持续成长、又不必烧毁每座桥梁的生活。",
      articleSlug: "life-path-number-5-meaning-guide",
    },
    {
      n: 6,
      name: "养育者",
      keywords: ["责任", "家庭", "关怀", "奉献"],
      summary:
        "灵数 6 是命盘中的守护者。家庭、社群与服务给你意义，别人会本能地向你寻求支持与公正的判断。你的课题是边界感——学会帮助别人而不控制别人，也学会像付出一样坦然地接受关怀。",
      articleSlug: "life-path-number-6-meaning-guide",
    },
    {
      n: 7,
      name: "探索者",
      keywords: ["分析", "智慧", "内省", "灵性"],
      summary:
        "灵数 7 是哲学家与分析师。你需要独处与深度，无论通过研究、思考还是灵性修行，都要寻找表象之下的答案。信任是你的课题：向他人敞开内心世界，并在锐利的理智与无法量化的信念之间找到平衡。",
      articleSlug: "life-path-number-7-meaning-guide",
    },
    {
      n: 8,
      name: "实干家",
      keywords: ["野心", "成就", "权力", "魄力"],
      summary:
        "灵数 8 为物质世界而生——商业、领导与大格局的成就对你而言水到渠成。你来此是为了驾驭丰盛、善用权力。反复出现的考验是正直：金钱与掌控只会放大你本来的样子，品格才是真正的功课。",
      articleSlug: "life-path-number-8-meaning-guide",
    },
    {
      n: 9,
      name: "人道主义者",
      keywords: ["慈悲", "理想", "慷慨", "包容"],
      summary:
        "灵数 9 承载着前面所有数字的智慧。你心怀世界，会为陌生人的处境而动容，常被艺术、疗愈或更大的事业吸引。你的课题是放下——放下人、放下结果、放下旧的自己——让慈悲不夹杂执念。",
      articleSlug: "life-path-number-9-meaning-guide",
    },
    {
      n: 11,
      name: "直觉者 · 卓越数",
      keywords: ["直觉", "灵感", "敏感", "远见"],
      summary:
        "卓越数 11 是直觉的管道——数字 2 的高能强化版。你常在能解释之前就接收到灵感，并感到自己有唤醒或启发他人的使命。代价是神经高度紧绷：稳定的日常与自我信任，才能把敏锐炼成真正的远见。",
      articleSlug: "master-number-11-meaning",
    },
    {
      n: 22,
      name: "筑梦大师 · 卓越数",
      keywords: ["愿景", "格局", "执行力", "传承"],
      summary:
        "卓越数 22 是灵数中最强的建造者——把 4 的纪律放大到服务世界的尺度。你有能力把看似不可能的蓝图建成流传后世的事业。阴影是压垮人的压力与被误用的权力：你的功课是在做大事的同时守住谦逊与健康。",
      articleSlug: "master-number-22-meaning",
    },
    {
      n: 33,
      name: "大导师 · 卓越数",
      keywords: ["疗愈", "奉献", "慈悲", "服务"],
      summary:
        "卓越数 33 是最稀有的灵数，把 6 的关怀升华为无私的服务。你此生为疗愈、教导与提升他人而来，常常把别人的痛苦扛在自己肩上。最难的课题是：空杯子倒不出水，边界感本身也是一种爱。",
      articleSlug: "master-number-33-meaning",
    },
  ],

  tw: [
    {
      n: 1,
      name: "領導者",
      keywords: ["獨立", "魄力", "進取", "開創"],
      summary:
        "靈數 1 是數字世界的開拓者。你天生為領導與開創而來，意志堅定、想法獨到，習慣靠自己闖出一條路。你的課題是學會在堅持自我的同時保持耐心——帶領他人，而不是支配他人。",
      articleSlug: "life-path-number-1-meaning-guide",
    },
    {
      n: 2,
      name: "外交家",
      keywords: ["合作", "敏感", "和諧", "直覺"],
      summary:
        "靈數 2 是天生的協調者。你在合作中最自在，能敏銳察覺他人的情緒，擅長在衝突中帶來平靜。你的力量不在於強勢，而在於潤物細無聲。課題是學會說出自己的需求，而不是一味遷就。",
      articleSlug: "life-path-number-2-meaning-guide",
    },
    {
      n: 3,
      name: "創意表達者",
      keywords: ["表達", "創意", "樂觀", "熱情"],
      summary:
        "靈數 3 是命盤中的溝通者與藝術家。你點子多、有幽默感，能用言語與創作點亮身邊的人，天生為表達而來。分心和自我懷疑是你的陰影——學會專注與自律，才華才能沉澱為長久的作品。",
      articleSlug: "life-path-number-3-meaning-guide",
    },
    {
      n: 4,
      name: "建造者",
      keywords: ["自律", "務實", "勤奮", "穩定"],
      summary:
        "靈數 4 是腳踏實地的建設者。你誠實可靠、執行力強，擅長把計劃變成穩固的現實，是身邊人最依賴的支柱。你的道路獎勵耐心與積累。需要留意的是固執——生活會在不違背原則的前提下，反覆教你變通。",
      articleSlug: "life-path-number-4-meaning-guide",
    },
    {
      n: 5,
      name: "冒險家",
      keywords: ["自由", "變化", "冒險", "多才"],
      summary:
        "靈數 5 為自由與體驗而活。你適應力驚人，透過親身經歷學習，一成不變的環境會讓你窒息。自由是你的羅盤，但承諾是你的課題：真正的冒險，是建立一種既能持續成長、又不必燒毀每座橋梁的生活。",
      articleSlug: "life-path-number-5-meaning-guide",
    },
    {
      n: 6,
      name: "養育者",
      keywords: ["責任", "家庭", "關懷", "奉獻"],
      summary:
        "靈數 6 是命盤中的守護者。家庭、社群與服務給你意義，別人會本能地向你尋求支持與公正的判斷。你的課題是邊界感——學會幫助別人而不控制別人，也學會像付出一樣坦然地接受關懷。",
      articleSlug: "life-path-number-6-meaning-guide",
    },
    {
      n: 7,
      name: "探索者",
      keywords: ["分析", "智慧", "內省", "靈性"],
      summary:
        "靈數 7 是哲學家與分析師。你需要獨處與深度，無論透過研究、思考還是靈性修行，都要尋找表象之下的答案。信任是你的課題：向他人敞開內心世界，並在銳利的理智與無法量化的信念之間找到平衡。",
      articleSlug: "life-path-number-7-meaning-guide",
    },
    {
      n: 8,
      name: "實幹家",
      keywords: ["野心", "成就", "權力", "魄力"],
      summary:
        "靈數 8 為物質世界而生——商業、領導與大格局的成就對你而言水到渠成。你來此是為了駕馭豐盛、善用權力。反覆出現的考驗是正直：金錢與掌控只會放大你本來的樣子，品格才是真正的功課。",
      articleSlug: "life-path-number-8-meaning-guide",
    },
    {
      n: 9,
      name: "人道主義者",
      keywords: ["慈悲", "理想", "慷慨", "包容"],
      summary:
        "靈數 9 承載著前面所有數字的智慧。你心懷世界，會為陌生人的處境而動容，常被藝術、療癒或更大的事業吸引。你的課題是放下——放下人、放下結果、放下舊的自己——讓慈悲不夾雜執念。",
      articleSlug: "life-path-number-9-meaning-guide",
    },
    {
      n: 11,
      name: "直覺者 · 卓越數",
      keywords: ["直覺", "靈感", "敏感", "遠見"],
      summary:
        "卓越數 11 是直覺的管道——數字 2 的高能強化版。你常在能解釋之前就接收到靈感，並感到自己有喚醒或啟發他人的使命。代價是神經高度緊繃：穩定的日常與自我信任，才能把敏銳煉成真正的遠見。",
      articleSlug: "master-number-11-meaning",
    },
    {
      n: 22,
      name: "築夢大師 · 卓越數",
      keywords: ["願景", "格局", "執行力", "傳承"],
      summary:
        "卓越數 22 是靈數中最強的建造者——把 4 的紀律放大到服務世界的尺度。你有能力把看似不可能的藍圖建成流傳後世的事業。陰影是壓垮人的壓力與被誤用的權力：你的功課是在做大事的同時守住謙遜與健康。",
      articleSlug: "master-number-22-meaning",
    },
    {
      n: 33,
      name: "大導師 · 卓越數",
      keywords: ["療癒", "奉獻", "慈悲", "服務"],
      summary:
        "卓越數 33 是最稀有的靈數，把 6 的關懷昇華為無私的服務。你此生為療癒、教導與提升他人而來，常常把別人的痛苦扛在自己肩上。最難的課題是：空杯子倒不出水，邊界感本身也是一種愛。",
      articleSlug: "master-number-33-meaning",
    },
  ],
};
