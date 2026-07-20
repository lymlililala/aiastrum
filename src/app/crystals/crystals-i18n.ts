// ===== 选水晶工具页面 UI 文案（三语） =====

import type { Locale } from "~/lib/i18n";

export interface CrystalsUI {
  back: string;
  /** 主标题（页面头部大字） */
  heading: string;
  /** 副标题 */
  subheading: string;
  /** 需求选择区提示 */
  pickPrompt: string;
  /** 石头卡片字段标签 */
  whyLabel: string;
  howToUseLabel: string;
  cleansingTitle: string;
  articlesTitle: string;
  /** SEO 内容区（SSR 输出） */
  seoSections: { heading: string; body: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  /** 页脚免责声明 */
  disclaimer: string;
}

export const CRYSTALS_UI: Record<Locale, CrystalsUI> = {
  zh: {
    back: "← 返回",
    heading: "选水晶",
    subheading: "按你的需求，找到适合你的水晶与用法",
    pickPrompt: "你现在最需要的是什么？",
    whyLabel: "为什么选它",
    howToUseLabel: "怎么用",
    cleansingTitle: "净化建议",
    articlesTitle: "延伸阅读",
    seoSections: [
      {
        heading: "怎么选适合自己的水晶？",
        body: "选水晶最简单可靠的入口不是颜色、不是价格，而是需求。先问自己：我最近最需要什么——防护避负、招财丰盛、安神助眠，还是缓解焦虑？确定意图后，再从对应的几颗石头里挑一颗「看着顺眼」的。眼缘在水晶文化里并不是玄学废话：你对某颗石头的天然偏好，往往对应着你当下真实的心理需要。选一颗开始就好，不必一次买齐。",
      },
      {
        heading: "守护石、招财水晶、助眠水晶：最常见的三类需求",
        body: "在所有水晶查询里，守护石、招财水晶和助眠水晶是被问得最多的三类。守护石（如黑碧玺、黑曜石）重在吸收与隔离负能量，适合放在门口或随身佩戴；招财水晶（如黄水晶、黄铁矿）对应行动力与机会，宜摆在财位或办公桌；助眠水晶（如紫水晶、锂云母）安抚神经系统，适合枕头下与床头柜。本工具把八类高频需求各自匹配了 4-6 颗经典石种，并给出具体的摆放与佩戴方法。",
      },
      {
        heading: "水晶需要净化吗？",
        body: "需要。水晶在使用中会吸附环境与情绪能量，定期净化是水晶养护的基本功。最常用的方法有：月光下过夜（满月最佳）、放在白水晶簇上消磁、鼠尾草或檀香烟熏，以及用流水快速冲洗（不适用于锂云母、萤石等质地较软或易溶的石种）。净化后握住水晶，重新默念你的意图，这个「设定意图」的动作，才是整个仪式的核心。",
      },
    ],
    faqTitle: "常见问题",
    faq: [
      {
        q: "怎么选适合自己的水晶？",
        a: "先定需求再选石头。在本页选择你当前最迫切的需求（防护、招财、助眠、抗焦虑等），然后从推荐的几颗里挑一颗最有眼缘的开始。一颗用熟，胜过一堆闲置。",
      },
      {
        q: "水晶多久净化一次？",
        a: "一般建议每 1-2 周一次；防护类和抗焦虑类因为吸收的负能量多，压力大的时候可以每周两次。月光、白水晶簇、烟熏都是安全的通用方法。",
      },
      {
        q: "可以同时佩戴或使用多种水晶吗？",
        a: "可以，但建议控制在 2-3 种以内，并且意图不要互相冲突（比如助眠的锂云母和提劲的红玉髓就不适合同时贴身用）。白水晶可以放大其他水晶，是百搭的组合石。",
      },
      {
        q: "水晶真的有功效吗？",
        a: "水晶的功效属于能量疗愈与民俗文化的范畴，没有被现代医学证实。更准确的理解是：它是一个帮你聚焦意图、安定情绪的「实体锚点」。身体不适或持续焦虑请优先就医和寻求专业帮助。",
      },
      {
        q: "新买的水晶第一步要做什么？",
        a: "先净化（月光或白水晶簇即可），然后双手握住它，清楚默念你买它的目的——比如「帮我睡个好觉」。这个设定意图的步骤做完，这颗石头才算真正「归你」。",
      },
    ],
    disclaimer: "* 水晶功效内容基于能量疗愈传统与民俗文化，仅供自我探索与娱乐参考，不构成医疗建议。",
  },
  tw: {
    back: "← 返回",
    heading: "選水晶",
    subheading: "按你的需求，找到適合你的水晶與用法",
    pickPrompt: "你現在最需要的是什麼？",
    whyLabel: "為什麼選它",
    howToUseLabel: "怎麼用",
    cleansingTitle: "淨化建議",
    articlesTitle: "延伸閱讀",
    seoSections: [
      {
        heading: "怎麼選適合自己的水晶？",
        body: "選水晶最簡單可靠的入口不是顏色、不是價格，而是需求。先問自己：我最近最需要什麼——防護避負、招財豐盛、安神助眠，還是緩解焦慮？確定意圖後，再從對應的幾顆石頭裡挑一顆「看著順眼」的。眼緣在水晶文化裡並不是玄學廢話：你對某顆石頭的天然偏好，往往對應著你當下真實的心理需要。選一顆開始就好，不必一次買齊。",
      },
      {
        heading: "守護石、招財水晶、助眠水晶：最常見的三類需求",
        body: "在所有水晶查詢裡，守護石、招財水晶和助眠水晶是被問得最多的三類。守護石（如黑碧璽、黑曜石）重在吸收與隔離負能量，適合放在門口或隨身佩戴；招財水晶（如黃水晶、黃鐵礦）對應行動力與機會，宜擺在財位或辦公桌；助眠水晶（如紫水晶、鋰雲母）安撫神經系統，適合枕頭下與床頭櫃。本工具把八類高頻需求各自匹配了 4-6 顆經典石種，並給出具體的擺放與佩戴方法。",
      },
      {
        heading: "水晶需要淨化嗎？",
        body: "需要。水晶在使用中會吸附環境與情緒能量，定期淨化是水晶養護的基本功。最常用的方法有：月光下過夜（滿月最佳）、放在白水晶簇上消磁、鼠尾草或檀香煙燻，以及用流水快速沖洗（不適用於鋰雲母、螢石等質地較軟或易溶的石種）。淨化後握住水晶，重新默念你的意圖，這個「設定意圖」的動作，才是整個儀式的核心。",
      },
    ],
    faqTitle: "常見問題",
    faq: [
      {
        q: "怎麼選適合自己的水晶？",
        a: "先定需求再選石頭。在本頁選擇你當前最迫切的需求（防護、招財、助眠、抗焦慮等），然後從推薦的幾顆裡挑一顆最有眼緣的開始。一顆用熟，勝過一堆閒置。",
      },
      {
        q: "水晶多久淨化一次？",
        a: "一般建議每 1-2 週一次；防護類和抗焦慮類因為吸收的負能量多，壓力大的時候可以每週兩次。月光、白水晶簇、煙燻都是安全的通用方法。",
      },
      {
        q: "可以同時佩戴或使用多種水晶嗎？",
        a: "可以，但建議控制在 2-3 種以內，並且意圖不要互相衝突（比如助眠的鋰雲母和提勁的紅玉髓就不適合同時貼身用）。白水晶可以放大其他水晶，是百搭的組合石。",
      },
      {
        q: "水晶真的有功效嗎？",
        a: "水晶的功效屬於能量療癒與民俗文化的範疇，沒有被現代醫學證實。更準確的理解是：它是一個幫你聚焦意圖、安定情緒的「實體錨點」。身體不適或持續焦慮請優先就醫和尋求專業幫助。",
      },
      {
        q: "新買的水晶第一步要做什麼？",
        a: "先淨化（月光或白水晶簇即可），然後雙手握住它，清楚默念你買它的目的——比如「幫我睡個好覺」。這個設定意圖的步驟做完，這顆石頭才算真正「歸你」。",
      },
    ],
    disclaimer: "* 水晶功效內容基於能量療癒傳統與民俗文化，僅供自我探索與娛樂參考，不構成醫療建議。",
  },
  en: {
    back: "← Back",
    heading: "Crystal Selector",
    subheading: "Find the right stone for your intention — and how to actually use it",
    pickPrompt: "What do you need most right now?",
    whyLabel: "Why this stone",
    howToUseLabel: "How to use it",
    cleansingTitle: "Cleansing Note",
    articlesTitle: "Further Reading",
    seoSections: [
      {
        heading: "How do I choose the right crystal?",
        body: "The most reliable entry point isn't color or price — it's intention. Ask yourself first: what do I need most right now? Protection from draining energy, support for money and career, better sleep, or relief from anxiety? Once the intention is clear, pick the one stone from the recommended set that catches your eye. In crystal culture, that pull isn't superstition: your instinctive preference often mirrors a real psychological need. Start with one stone and learn it well rather than buying a whole shelf.",
      },
      {
        heading: "Protection stones, stones that attract money, and sleep stones",
        body: "Among all crystal queries, three needs dominate: protection stones (like black tourmaline and obsidian), which absorb and deflect heavy energy — keep them by the front door or in your pocket; stones that attract money (like citrine and pyrite), which pair with action and opportunity — place them in your wealth corner or workspace; and sleep stones (like amethyst and lepidolite), which calm the nervous system — slip them under your pillow or onto the nightstand. This tool maps eight common intentions to 4-6 classic stones each, with concrete placement and wearing instructions. If you're looking for crystals for anxiety in particular, start with lepidolite and blue lace agate — they're the two most recommended for calming a racing mind.",
      },
      {
        heading: "Do crystals need cleansing?",
        body: "Yes. Crystals absorb environmental and emotional energy as you use them, so regular cleansing is basic crystal care. The safest universal methods are: overnight moonlight (a full moon is ideal), resting on a clear quartz cluster, sage or sandalwood smoke, and a quick rinse under running water (skip water for soft stones like lepidolite and fluorite). After cleansing, hold the stone and restate your intention — that moment of 'setting' is the real heart of the ritual.",
      },
    ],
    faqTitle: "FAQ",
    faq: [
      {
        q: "How do I choose the right crystal for me?",
        a: "Decide the intention first, then the stone. Pick the need that's most urgent for you on this page (protection, money, sleep, anxiety relief, etc.), then choose the one recommended stone you're most drawn to. One stone you actually use beats a drawer full of them.",
      },
      {
        q: "How often should I cleanse my crystals?",
        a: "Every 1-2 weeks as a baseline. Protection and calming stones absorb the heaviest load, so during stressful periods cleanse them twice a week. Moonlight, quartz clusters, and smoke are all safe universal methods.",
      },
      {
        q: "Can I wear or use several crystals at once?",
        a: "Yes, but keep it to 2-3 and make sure the intentions don't clash — a sleep stone like lepidolite and an energizer like carnelian shouldn't be worn together. Clear quartz amplifies other stones and pairs with everything.",
      },
      {
        q: "Do crystals really work?",
        a: "Crystal healing belongs to energy-work and folk tradition and isn't confirmed by modern medicine. A fairer framing: a crystal is a physical anchor that helps you focus intention and settle your emotions. For health issues or persistent anxiety, see a doctor or a licensed professional first.",
      },
      {
        q: "What should I do first with a new crystal?",
        a: "Cleanse it first (moonlight or a quartz cluster is fine), then hold it in both hands and state clearly why you brought it home — e.g. 'help me sleep better.' Once the intention is set, the stone is truly yours.",
      },
    ],
    disclaimer: "* Crystal meanings are based on energy-healing tradition and folklore. For self-exploration and entertainment only — not medical advice.",
  },
};
