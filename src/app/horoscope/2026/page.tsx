import { type Metadata } from "next";
import Link from "next/link";
import { getServerLocale } from "~/lib/serverLocale";
import { toolMetadataI18n, breadcrumbJsonLd, BASE_URL, HOME_NAME, type LocaleMeta } from "~/lib/seo";
import { withLocale, type Locale } from "~/lib/i18n";
import { ZODIAC_LIST, type ZodiacId } from "../horoscope-data";

// ── 已确认上线的 2026 文章（DB mysticai_blog_posts 实查）─────────────────────
const EN_ARTICLES: Partial<Record<ZodiacId, string>> = {
  leo: "/blog/leo-2026-yearly-horoscope",
  cancer: "/blog/cancer-2026-yearly-horoscope",
  scorpio: "/blog/scorpio-2026-yearly-horoscope",
};
const ZH_ARTICLES: Partial<Record<ZodiacId, string>> = {
  aries: "/blog/2026-aries-annual-horoscope",
  cancer: "/blog/2026-cancer-annual-horoscope",
  leo: "/blog/leo-2026-horoscope",
  virgo: "/blog/virgo-2026-horoscope",
  libra: "/blog/libra-2026-horoscope",
  scorpio: "/blog/2026-scorpio-annual-horoscope-tw",
};

const TW_NAME: Record<ZodiacId, string> = {
  aries: "白羊座", taurus: "金牛座", gemini: "雙子座", cancer: "巨蟹座",
  leo: "獅子座", virgo: "處女座", libra: "天秤座", scorpio: "天蠍座",
  sagittarius: "射手座", capricorn: "摩羯座", aquarius: "水瓶座", pisces: "雙魚座",
};

const META: Record<Locale, LocaleMeta> = {
  en: {
    title: "2026 Yearly Horoscope — All 12 Zodiac Signs Forecast",
    description:
      "2026 yearly horoscope for all 12 zodiac signs: love, career and money themes for the year ahead, plus the key transits — Jupiter into Leo, Saturn into Aries — and daily & monthly updates.",
    keywords: [
      "2026 horoscope", "2026 yearly horoscope", "zodiac signs 2026", "leo 2026 horoscope",
      "cancer 2026 horoscope", "scorpio 2026 horoscope", "astrology forecast 2026",
    ],
  },
  zh: {
    title: "2026年十二星座运势总览 — 全年运程完整预测",
    description:
      "2026年十二星座年度运势总览：爱情、事业、财运全年主题一次看懂，含丙午马年流年、木星入狮子、土星入白羊等重点星象，以及2026下半年运势与每日每月更新。",
    keywords: [
      "2026年运势", "2026星座运势", "十二星座2026", "2026下半年运势", "狮子座2026年运势",
      "巨蟹座2026年运势", "天蝎座2026年运势", "2026年运程",
    ],
  },
  tw: {
    title: "2026年十二星座運勢總覽 — 全年運程完整預測",
    description:
      "2026年十二星座年度運勢總覽：愛情、事業、財運全年主題一次看懂，含丙午馬年流年、木星入獅子、土星入白羊等重點星象，以及2026下半年運勢與每日每月更新。",
    keywords: [
      "2026年運勢", "2026星座運勢", "十二星座2026", "2026下半年運勢", "獅子座2026年運勢",
      "巨蟹座2026年運勢", "天蠍座運勢2026", "2026年運程",
    ],
  },
};

interface Copy {
  h1: string;
  subtitle: string;
  intro: string[];
  backTool: string;
  home: string;
  featuredTitle: string;
  featured: Array<{ href: string; label: string; note: string }>;
  themes: Record<ZodiacId, string>;
  readArticle: string;
  readTool: string;
  toolCta: string;
  faqTitle: string;
  faq: Array<{ q: string; a: string }>;
}

const T: Record<Locale, Copy> = {
  en: {
    h1: "2026 Yearly Horoscope: All 12 Zodiac Signs",
    subtitle: "Every sign's theme for the year ahead — love, career and money, mapped to the real transits of 2026.",
    intro: [
      "2026 is a year of shifting ground. Jupiter spends the first half in Cancer (until June 30) and then moves into Leo, Saturn and Neptune settle into Aries, Uranus begins a new seven-year cycle in Gemini, and four eclipses hit the Aquarius–Leo and Virgo–Pisces axes. Each of the twelve signs feels a different slice of that sky.",
      "Below is your sign's headline theme for 2026. Where we've published a full annual deep-dive, the card links straight to it; for the rest, our horoscope tool tracks your sign with daily, weekly and monthly updates all year long.",
    ],
    backTool: "← Horoscope tool",
    home: "Home",
    featuredTitle: "Featured 2026 forecasts",
    featured: [
      { href: "/blog/leo-2026-yearly-horoscope", label: "Leo 2026 Yearly Horoscope", note: "Jupiter enters your sign on June 30 — love, career & money" },
      { href: "/blog/cancer-2026-yearly-horoscope", label: "Cancer 2026 Yearly Horoscope", note: "Your luckiest first half in twelve years" },
      { href: "/blog/scorpio-2026-yearly-horoscope", label: "Scorpio 2026 Yearly Horoscope", note: "Venus retrograde in your sign this autumn" },
    ],
    themes: {
      aries: "Saturn and Neptune both enter your sign — the year you rebuild your identity from the ground up.",
      taurus: "Uranus finally leaves your sign in late April; after years of shake-ups, stability — and your savings — return.",
      gemini: "Uranus begins a brand-new cycle in your sign: expect reinvention, plot twists and liberation.",
      cancer: "Jupiter blesses your sign until June 30 — your luckiest first half in twelve years. Say yes to expansion.",
      leo: "Jupiter enters Leo on June 30 and the spotlight swings back to you; the second half is your stage.",
      virgo: "A lunar eclipse in your sign on March 3 clears what's stale — health, habits and work get an honest reset.",
      libra: "Partnerships deepen under Saturn's gaze; autumn's Venus retrograde asks what — and who — is truly worth it.",
      scorpio: "Venus retrogrades through your sign in October–November: love and money get a profound, overdue review.",
      sagittarius: "Uranus opposes you from Gemini — relationships reinvent themselves; stay loose and let the right ones in.",
      capricorn: "Jupiter grows your partnerships until mid-year, then turns shared resources into real gains.",
      aquarius: "Pluto settles into your sign and the February 17 eclipse seals it: you're becoming someone more powerful.",
      pisces: "Saturn and Neptune finally leave your sign; the fog lifts, and the August 28 eclipse closes an old chapter.",
    },
    readArticle: "Full 2026 forecast →",
    readTool: "Daily & monthly updates →",
    toolCta: "🌌 Open the daily / weekly / monthly horoscope tool",
    faqTitle: "2026 Horoscope FAQ",
    faq: [
      {
        q: "Which zodiac sign is luckiest in 2026?",
        a: "Cancer owns the first half — Jupiter, the planet of luck and expansion, sits in Cancer until June 30. Leo takes over for the second half, when Jupiter enters Leo on June 30 and stays into 2027. Fire signs in general (Aries, Leo, Sagittarius) also get a tailwind from Saturn and Neptune moving into Aries.",
      },
      {
        q: "What are the most important astrological events of 2026?",
        a: "Four stand out: Saturn and Neptune both settling into Aries (February), Uranus entering Gemini for a new seven-year cycle (April 26), Jupiter moving from Cancer into Leo (June 30), and the year's four eclipses — February 17 in Aquarius, March 3 in Virgo, August 12 in Leo and August 28 in Pisces.",
      },
      {
        q: "How many Mercury retrogrades are there in 2026?",
        a: "Three: February 26 – March 20 in Pisces, June 29 – July 23 in Cancer, and October 24 – November 13 in Scorpio. Venus also retrogrades from October 3 to November 14, moving back from Scorpio into Libra — a notable window for relationship and money reviews. Mars does not retrograde at all in 2026.",
      },
      {
        q: "Where can I get regular 2026 horoscope updates?",
        a: "Our free horoscope tool covers all 12 signs with daily, weekly and monthly forecasts across five dimensions — love, career, wealth, health and energy — updated continuously throughout 2026. Pick your sign from the grid above or open the tool directly.",
      },
    ],
  },
  zh: {
    h1: "2026 年度运势总览：十二星座全年预测",
    subtitle: "十二星座的年度主题一次看懂——爱情、事业、财运，对照 2026 真实星象逐一拆解。",
    intro: [
      "2026 是格局换挡的一年：上半年木星驻守巨蟹座（至 6 月 30 日），之后进入狮子座；土星与海王星双双正式进入白羊座；天王星 4 月 26 日进入双子座，开启新一轮七年周期；全年四次日月食落在水瓶—狮子与处女—双鱼两条轴线上。东方流年方面，2026 为农历丙午马年，天干地支皆火，行动、曝光与竞争都会被放大。",
      "下面是你星座的 2026 年度主题。已发布全年详解的星座，卡片直接链接到完整文章；其余星座，运势工具全年提供每日、每周、每月持续更新。",
    ],
    backTool: "← 运势工具",
    home: "首页",
    featuredTitle: "2026 精选运势长文",
    featured: [
      { href: "/blog/2026-all-zodiac-signs-annual-horoscope", label: "2026年十二星座全年运势总览", note: "事业、爱情、财运完整预测" },
      { href: "/blog/2026-second-half-zodiac-horoscope", label: "2026下半年运势｜十二星座＋生肖流年", note: "下半年重点星象与犯太岁生肖" },
      { href: "/blog/2026-zodiac-fortune-ranking", label: "2026星座运势排行", note: "12星座年度总运排名，谁挤进前三" },
    ],
    themes: {
      aries: "土星与海王星双双进入你的星座——这是推倒重建、重新定义自己的一年。",
      taurus: "天王星 4 月底终于离开你的星座，动荡多年之后，稳定和存款一起回来了。",
      gemini: "天王星在你的星座开启全新七年周期：身份、形象、人生方向都可能突然翻新。",
      cancer: "木星上半年驻守你的星座（至 6 月 30 日），十二年一遇的好运窗口，别浪费。",
      leo: "6 月 30 日木星进入狮子座，聚光灯回到你身上，下半年就是你的舞台。",
      virgo: "3 月 3 日月食落在你的星座，过时的习惯与工作模式被清空，换来一次诚实的重启。",
      libra: "关系在土星的注视下走向深入；秋天的金星逆行问你：哪些人、哪些事真正值得。",
      scorpio: "10–11 月金星在你的星座逆行，爱情与金钱迎来一次深刻而必要的复盘。",
      sagittarius: "天王星从对面的双子座照进来，合作关系重新洗牌，放轻松，让对的人进来。",
      capricorn: "上半年木星旺你的合作运，下半年共享资源开始变成真金白银。",
      aquarius: "冥王星在你的星座扎根，2 月 17 日日食盖章确认：你正在成为更强大的自己。",
      pisces: "土星与海王星终于离开双鱼座，雾气散去，8 月 28 日月食为旧篇章画上句号。",
    },
    readArticle: "全年详解 →",
    readTool: "每日 / 每月更新 →",
    toolCta: "🌌 打开每日 / 每周 / 每月运势工具",
    faqTitle: "2026 运势常见问题",
    faq: [
      {
        q: "2026年哪个星座运势最好？",
        a: "上半年最旺的是巨蟹座——木星（岁星）在巨蟹座停留到 6 月 30 日；下半年狮子座接棒，木星 6 月 30 日进入狮子座并一直停留到 2027 年中。加上 2026 为丙午马年，天干地支皆火，火象星座（白羊、狮子、射手）整体顺势，行动派受益最大。详细排名见站内《2026星座运势排行》。",
      },
      {
        q: "2026年是什么年份，对运势有什么影响？",
        a: "2026 年是农历丙午马年（自 2026 年 2 月 17 日起），天干丙火、地支午火，是火气极旺的一年：行动力、曝光机会与竞争都会加剧，但也要留心浮躁与口舌是非。生肖属马值太岁、属鼠冲太岁、属牛害太岁、属兔破太岁，这四个生肖宜稳不宜冲。",
      },
      {
        q: "2026年水星逆行有几次？分别是什么时候？",
        a: "三次：2 月 26 日–3 月 20 日（双鱼座）、6 月 29 日–7 月 23 日（巨蟹座）、10 月 24 日–11 月 13 日（天蝎座）。另外金星 10 月 3 日–11 月 14 日逆行，从天蝎座退回天秤座，是感情与金钱复盘的重要窗口；火星 2026 年全年不逆行。",
      },
      {
        q: "我的星座还没有2026年运文章，在哪里看更新？",
        a: "站内免费的星座运势工具覆盖十二星座，提供每日、每周、每月运势，包含爱情、事业、财运、健康、能量五个维度，2026 全年持续更新。从上方卡片进入，或直接打开运势工具选择你的星座。",
      },
    ],
  },
  tw: {
    h1: "2026 年度運勢總覽：十二星座全年預測",
    subtitle: "十二星座的年度主題一次看懂——愛情、事業、財運，對照 2026 真實星象逐一拆解。",
    intro: [
      "2026 是格局換擋的一年：上半年木星駐守巨蟹座（至 6 月 30 日），之後進入獅子座；土星與海王星雙雙正式進入白羊座；天王星 4 月 26 日進入雙子座，開啟新一輪七年週期；全年四次日月食落在水瓶—獅子與處女—雙魚兩條軸線上。東方流年方面，2026 為農曆丙午馬年，天干地支皆火，行動、曝光與競爭都會被放大。",
      "下面是你星座的 2026 年度主題。已發佈全年詳解的星座，卡片直接連結到完整文章；其餘星座，運勢工具全年提供每日、每週、每月持續更新。",
    ],
    backTool: "← 運勢工具",
    home: "首頁",
    featuredTitle: "2026 精選運勢長文",
    featured: [
      { href: "/blog/2026-second-half-zodiac-horoscope", label: "2026下半年運勢｜十二星座＋生肖流年", note: "事業、財運、感情完整解析" },
      { href: "/blog/2026-all-zodiac-signs-annual-horoscope", label: "2026年十二星座全年運勢總覽", note: "事業、愛情、財運完整預測" },
      { href: "/blog/2026-zodiac-fortune-ranking", label: "2026星座運勢排行", note: "12星座年度總運排名，誰擠進前三" },
    ],
    themes: {
      aries: "土星與海王星雙雙進入你的星座——這是推倒重建、重新定義自己的一年。",
      taurus: "天王星 4 月底終於離開你的星座，動盪多年之後，穩定和存款一起回來了。",
      gemini: "天王星在你的星座開啟全新七年週期：身份、形象、人生方向都可能突然翻新。",
      cancer: "木星上半年駐守你的星座（至 6 月 30 日），十二年一遇的好運窗口，別浪費。",
      leo: "6 月 30 日木星進入獅子座，聚光燈回到你身上，下半年就是你的舞台。",
      virgo: "3 月 3 日月食落在你的星座，過時的習慣與工作模式被清空，換來一次誠實的重啟。",
      libra: "關係在土星的注視下走向深入；秋天的金星逆行問你：哪些人、哪些事真正值得。",
      scorpio: "10–11 月金星在你的星座逆行，愛情與金錢迎來一次深刻而必要的復盤。",
      sagittarius: "天王星從對面的雙子座照進來，合作關係重新洗牌，放輕鬆，讓對的人進來。",
      capricorn: "上半年木星旺你的合作運，下半年共享資源開始變成真金白銀。",
      aquarius: "冥王星在你的星座扎根，2 月 17 日日食蓋章確認：你正在成為更強大的自己。",
      pisces: "土星與海王星終於離開雙魚座，霧氣散去，8 月 28 日月食為舊篇章畫上句號。",
    },
    readArticle: "全年詳解 →",
    readTool: "每日 / 每月更新 →",
    toolCta: "🌌 開啟每日 / 每週 / 每月運勢工具",
    faqTitle: "2026 運勢常見問題",
    faq: [
      {
        q: "2026年哪個星座運勢最好？",
        a: "上半年最旺的是巨蟹座——木星（歲星）在巨蟹座停留到 6 月 30 日；下半年獅子座接棒，木星 6 月 30 日進入獅子座並一直停留到 2027 年中。加上 2026 為丙午馬年，天干地支皆火，火象星座（白羊、獅子、射手）整體順勢，行動派受益最大。詳細排名見站內《2026星座運勢排行》。",
      },
      {
        q: "2026年是什麼年份，對運勢有什麼影響？",
        a: "2026 年是農曆丙午馬年（自 2026 年 2 月 17 日起），天干丙火、地支午火，是火氣極旺的一年：行動力、曝光機會與競爭都會加劇，但也要留心浮躁與口舌是非。生肖屬馬值太歲、屬鼠沖太歲、屬牛害太歲、屬兔破太歲，這四個生肖宜穩不宜衝。",
      },
      {
        q: "2026年水星逆行有幾次？分別是什麼時候？",
        a: "三次：2 月 26 日–3 月 20 日（雙魚座）、6 月 29 日–7 月 23 日（巨蟹座）、10 月 24 日–11 月 13 日（天蠍座）。另外金星 10 月 3 日–11 月 14 日逆行，從天蠍座退回天秤座，是感情與金錢復盤的重要窗口；火星 2026 年全年不逆行。",
      },
      {
        q: "我的星座還沒有2026年運文章，在哪裡看更新？",
        a: "站內免費的星座運勢工具覆蓋十二星座，提供每日、每週、每月運勢，包含愛情、事業、財運、健康、能量五個維度，2026 全年持續更新。從上方卡片進入，或直接開啟運勢工具選擇你的星座。",
      },
    ],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return toolMetadataI18n("/horoscope/2026", META, locale);
}

export default async function Horoscope2026Page() {
  const locale = await getServerLocale();
  const t = T[locale];
  const m = META[locale];
  const articles = locale === "en" ? EN_ARTICLES : ZH_ARTICLES;
  const signName = (id: ZodiacId, zhName: string, enName: string) =>
    locale === "en" ? enName : locale === "tw" ? TW_NAME[id] : zhName;

  const breadcrumb = breadcrumbJsonLd([
    { name: HOME_NAME[locale], url: `${BASE_URL}/${locale}` },
    { name: "Horoscope", url: `${BASE_URL}/${locale}/horoscope` },
    { name: "2026", url: `${BASE_URL}/${locale}/horoscope/2026` },
  ]);
  const collection = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": m.title,
    "description": m.description,
    "url": `${BASE_URL}/${locale}/horoscope/2026`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": ZODIAC_LIST.length,
      "itemListElement": ZODIAC_LIST.map((z, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": signName(z.id, z.name, z.enName),
        "url": `${BASE_URL}${articles[z.id] ?? `/${locale}/horoscope`}`,
      })),
    },
  });
  const faqLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": t.faq.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  });

  return (
    <div style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: collection }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />
      <style>{`
        .hz-card { transition: transform .2s, box-shadow .2s, border-color .2s; }
        .hz-card:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(100,60,200,.18); border-color: rgba(201,168,76,.32); }
      `}</style>

      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(10,6,28,.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(201,168,76,.12)", padding: "0 20px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href={withLocale(locale, "/horoscope")} style={{ color: "rgba(201,168,76,.75)", fontSize: ".8rem", textDecoration: "none" }}>{t.backTool}</Link>
        <Link href={`/${locale}`} style={{ color: "rgba(201,168,76,.45)", fontSize: ".72rem", textDecoration: "none" }}>{t.home}</Link>
      </nav>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 20px 80px" }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: "var(--font-cinzel),serif", fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: 700, color: "#e8d5a3", lineHeight: 1.3, marginBottom: 14 }}>{t.h1}</h1>
          <p style={{ fontSize: ".9rem", color: "rgba(232,213,163,.75)", marginBottom: 16 }}>{t.subtitle}</p>
          {t.intro.map((p, i) => (
            <p key={i} style={{ fontSize: ".86rem", color: "rgba(200,175,140,.8)", lineHeight: 1.85, marginBottom: 12 }}>{p}</p>
          ))}
        </header>

        {/* 精选长文 */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: "var(--font-cinzel),serif", fontSize: "1.05rem", fontWeight: 700, color: "#e8d5a3", marginBottom: 12 }}>{t.featuredTitle}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,280px),1fr))", gap: 12 }}>
            {t.featured.map((f) => (
              <Link key={f.href} href={f.href} style={{ textDecoration: "none" }}>
                <div className="hz-card" style={{ borderRadius: 14, background: "linear-gradient(135deg,rgba(201,168,76,.12),rgba(100,60,200,.12))", border: "1px solid rgba(201,168,76,.3)", padding: "14px 18px", height: "100%" }}>
                  <div style={{ color: "rgba(232,213,163,.95)", fontWeight: 600, fontSize: ".88rem", lineHeight: 1.5, marginBottom: 4 }}>{f.label}</div>
                  <div style={{ color: "rgba(200,175,140,.6)", fontSize: ".74rem" }}>{f.note} →</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 十二星座网格 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,280px),1fr))", gap: 12 }}>
          {ZODIAC_LIST.map((z) => {
            const article = articles[z.id];
            const href = article ?? withLocale(locale, "/horoscope");
            return (
              <Link key={z.id} href={href} style={{ textDecoration: "none" }}>
                <article className="hz-card" style={{ borderRadius: 14, background: "rgba(16,10,38,.85)", border: "1px solid rgba(201,168,76,.15)", padding: "16px 18px", height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: "1.5rem", color: "#c9a84c", lineHeight: 1 }}>{z.symbol}</span>
                    <div>
                      <h3 style={{ fontSize: ".95rem", fontWeight: 700, color: "#e8d5a3", fontFamily: "var(--font-cinzel),serif", lineHeight: 1.3 }}>
                        {signName(z.id, z.name, z.enName)}
                      </h3>
                      <div style={{ fontSize: ".68rem", color: "rgba(201,168,76,.5)" }}>{z.dateRange}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: ".78rem", color: "rgba(200,175,140,.75)", lineHeight: 1.65, marginBottom: 10 }}>{t.themes[z.id]}</p>
                  <div style={{ fontSize: ".72rem", color: article ? "#c9a84c" : "rgba(201,168,76,.6)", fontWeight: 600 }}>
                    {article ? t.readArticle : t.readTool}
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* 工具 CTA */}
        <Link href={withLocale(locale, "/horoscope")} style={{ textDecoration: "none", display: "block", marginTop: 28 }}>
          <div style={{ borderRadius: 14, background: "linear-gradient(135deg,rgba(201,168,76,.12),rgba(100,60,200,.12))", border: "1px solid rgba(201,168,76,.3)", padding: "14px 18px", color: "rgba(232,213,163,.9)", fontWeight: 600, fontSize: ".88rem", textAlign: "center" }}>{t.toolCta} →</div>
        </Link>

        {/* FAQ */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontFamily: "var(--font-cinzel),serif", fontSize: "1.05rem", fontWeight: 700, color: "#e8d5a3", marginBottom: 16 }}>{t.faqTitle}</h2>
          {t.faq.map((f, i) => (
            <div key={i} style={{ borderRadius: 14, background: "rgba(16,10,38,.85)", border: "1px solid rgba(201,168,76,.15)", padding: "16px 18px", marginBottom: 12 }}>
              <h3 style={{ fontSize: ".9rem", fontWeight: 700, color: "#e8d5a3", lineHeight: 1.5, marginBottom: 8 }}>{f.q}</h3>
              <p style={{ fontSize: ".8rem", color: "rgba(200,175,140,.75)", lineHeight: 1.8 }}>{f.a}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
