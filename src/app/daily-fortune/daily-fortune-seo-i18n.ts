// ── 每日开运页 SEO 内容 / 新手步骤 / FAQ（三语）──────────────
// 供 page.tsx（客户端渲染）与 layout.tsx（FAQPage JSON-LD）共用，保持同源。

export interface DailyFortuneSeoText {
  howToTitle: string;
  howToSteps: string[];
  seoSections: { heading: string; body: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
}

export const DAILY_FORTUNE_SEO: Record<"zh" | "tw" | "en", DailyFortuneSeoText> = {
  zh: {
    howToTitle: "怎么玩？",
    howToSteps: [
      "输入你的出生年月日（昵称选填，仅用于页面展示）",
      "点击「生成我的今日开运指南」，等待五行能量推算",
      "查看今日总运与感情、事业、财运、健康四维分数",
      "参考幸运色、幸运数字、开运穿搭与晨间仪式，可生成海报保存分享",
    ],
    seoSections: [
      {
        heading: "什么是每日开运指南？",
        body: "每日开运指南是一份基于五行能量的个人化日运报告。系统根据你的出生日期推算本命五行，再结合当天的日柱干支，生成今日总运评分和感情、事业、财运、健康四个维度的运势指数，每天内容随日期更新。",
      },
      {
        heading: "幸运色、幸运数字是怎么来的？",
        body: "幸运要素由你的本命五行与当日五行的生克关系推导而来：今日幸运色、幸运数字、吉利方位、开运食物、开运时辰和开运配饰，都是围绕「补强今日能量」这一原则挑选的，可直接用在穿搭和日常安排里。",
      },
      {
        heading: "怎么把开运建议用起来？",
        body: "从最小的事开始：穿一件今日幸运色的衣服，按晨间仪式给一天开个头，避开「今日禁忌」里列出的事项。想提醒自己或分享给朋友，可以一键生成今日开运海报保存到手机。",
      },
    ],
    faqTitle: "常见问题",
    faq: [
      { q: "每日开运指南收费吗？", a: "完全免费，也不用注册。输入出生日期即可生成，你的出生信息只保存在你自己的浏览器里，不会上传到服务器。" },
      { q: "为什么要输入出生日期？", a: "开运指南的核心是「本命五行 × 今日五行」的匹配。出生日期用来推算你的本命五行属性，出生日期不同，同一天的开运建议也会不同。" },
      { q: "每天的结果会变化吗？", a: "会。日柱干支每天轮换，今日五行随之变化，因此总运评分、四维指数和幸运要素每天都会更新。同一天内结果保持稳定，明天再来就是新的一天。" },
      { q: "开运指南准吗？", a: "把它当作一份轻松的生活参考就好。五行开运是传统民俗文化的玩法，适合用来给日常添一点仪式感和好心情，不必当作严肃的人生指导。" },
    ],
  },
  tw: {
    howToTitle: "怎麼玩？",
    howToSteps: [
      "輸入你的出生年月日（暱稱選填，僅用於頁面展示）",
      "點擊「生成我的今日開運指南」，等待五行能量推算",
      "查看今日總運與感情、事業、財運、健康四維分數",
      "參考幸運色、幸運數字、開運穿搭與晨間儀式，可生成海報儲存分享",
    ],
    seoSections: [
      {
        heading: "什麼是每日開運指南？",
        body: "每日開運指南是一份基於五行能量的個人化日運報告。系統根據你的出生日期推算本命五行，再結合當天的日柱干支，生成今日總運評分和感情、事業、財運、健康四個維度的運勢指數，每天內容隨日期更新。",
      },
      {
        heading: "幸運色、幸運數字是怎麼來的？",
        body: "幸運要素由你的本命五行與當日五行的生剋關係推導而來：今日幸運色、幸運數字、吉利方位、開運食物、開運時辰和開運配飾，都是圍繞「補強今日能量」這一原則挑選的，可直接用在穿搭和日常安排裡。",
      },
      {
        heading: "怎麼把開運建議用起來？",
        body: "從最小的事開始：穿一件今日幸運色的衣服，按晨間儀式給一天開個頭，避開「今日禁忌」裡列出的事項。想提醒自己或分享給朋友，可以一鍵生成今日開運海報儲存到手機。",
      },
    ],
    faqTitle: "常見問題",
    faq: [
      { q: "每日開運指南收費嗎？", a: "完全免費，也不用註冊。輸入出生日期即可生成，你的出生資訊只儲存在你自己的瀏覽器裡，不會上傳到伺服器。" },
      { q: "為什麼要輸入出生日期？", a: "開運指南的核心是「本命五行 × 今日五行」的匹配。出生日期用來推算你的本命五行屬性，出生日期不同，同一天的開運建議也會不同。" },
      { q: "每天的結果會變化嗎？", a: "會。日柱干支每天輪換，今日五行隨之變化，因此總運評分、四維指數和幸運要素每天都會更新。同一天內結果保持穩定，明天再來就是新的一天。" },
      { q: "開運指南準嗎？", a: "把它當作一份輕鬆的生活參考就好。五行開運是傳統民俗文化的玩法，適合用來給日常添一點儀式感和好心情，不必當作嚴肅的人生指導。" },
    ],
  },
  en: {
    howToTitle: "How it works",
    howToSteps: [
      "Enter your birth year, month, and day (nickname optional, display only)",
      "Tap “Generate my daily fortune” and let the Five Elements calculation run",
      "Read your overall score plus love, career, wealth, and health indexes",
      "Follow the lucky color, lucky numbers, outfit tips, and morning ritual — save a poster to share",
    ],
    seoSections: [
      {
        heading: "What is the Daily Fortune Guide?",
        body: "A personalized daily luck report built on Five Elements (Wu Xing) energy. The system derives your natal element from your birth date, combines it with the day's heavenly stem and earthly branch, and produces an overall score plus four fortune indexes — love, career, wealth, and health — refreshed every day.",
      },
      {
        heading: "Where do the lucky color and numbers come from?",
        body: "Every lucky element is derived from the generating-and-controlling cycle between your natal element and the element of the day. Lucky color, lucky numbers, auspicious direction, lucky food, lucky hour, and accessory are all chosen to reinforce today's energy — ready to use in your outfit and schedule.",
      },
      {
        heading: "How to put the suggestions to use",
        body: "Start small: wear something in today's lucky color, kick off the morning with the suggested ritual, and steer clear of the listed taboos. Want a reminder or something to share? Generate your daily fortune poster in one tap and save it to your phone.",
      },
    ],
    faqTitle: "FAQ",
    faq: [
      { q: "Is the Daily Fortune Guide free?", a: "Completely free, no sign-up. Enter your birth date and your guide is generated instantly. Your birth details stay in your own browser and are never uploaded." },
      { q: "Why do you need my birth date?", a: "The guide works by matching your natal element against today's element. Your birth date determines that natal element — different birthdays get different suggestions for the same day." },
      { q: "Does the result change every day?", a: "Yes. The day's stem and branch rotate daily, shifting today's element, so the overall score, the four indexes, and all lucky elements update each day. Within a single day your result stays stable." },
      { q: "Is the fortune guide accurate?", a: "Treat it as a lighthearted daily reference. Five Elements fortune-telling is a piece of folk tradition — great for adding ritual and fun to your day, not a substitute for serious life advice." },
    ],
  },
};
