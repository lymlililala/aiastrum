import { type Metadata } from "next";
import { getServerLocale } from "~/lib/serverLocale";
import { toolMetadata } from "~/lib/seo";
import { type Locale } from "~/lib/i18n";
import { CONTACT_EMAIL } from "~/lib/site";
import { LegalPage } from "../components/LegalPage";

const META: Record<Locale, { title: string; description: string; keywords: string[] }> = {
  en: {
    title: "About Us",
    description:
      "AiAstrum blends ancient divination — Tarot, astrology, Bazi and the I Ching — with modern AI to offer a daily moment of reflection and cosmic guidance.",
    keywords: ["about AiAstrum", "AI divination", "tarot astrology platform", "cosmic guidance"],
  },
  zh: {
    title: "关于我们",
    description:
      "AiAstrum 将塔罗、占星、八字、易经等古老智慧与现代 AI 相结合，为你带来每日的自我觉察与宇宙指引。",
    keywords: ["关于 AiAstrum", "AI 占卜", "塔罗占星平台", "命运指引"],
  },
  tw: {
    title: "關於我們",
    description:
      "AiAstrum 將塔羅、占星、八字、易經等古老智慧與現代 AI 相結合，為你帶來每日的自我覺察與宇宙指引。",
    keywords: ["關於 AiAstrum", "AI 占卜", "塔羅占星平台", "命運指引"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const m = META[locale];
  return toolMetadata({ path: "/about", title: m.title, description: m.description, keywords: m.keywords });
}

export default async function AboutPage() {
  const locale = await getServerLocale();

  if (locale === "en") {
    return (
      <LegalPage
        locale={locale}
        title="About AiAstrum"
        subtitle="Ancient wisdom, reimagined with AI — a daily moment to pause, reflect, and look at your life from a new angle."
      >
        <h2>Our mission</h2>
        <p>
          AiAstrum exists to make the world&rsquo;s oldest tools for self-reflection — Tarot, astrology,
          Bazi, numerology and the I Ching — feel approachable, beautiful, and genuinely useful for
          modern life. We believe these traditions endure not because they predict the future, but
          because they give us a language to think about ourselves more honestly.
        </p>

        <h2>What we offer</h2>
        <p>
          Across one platform you&rsquo;ll find AI-assisted Tarot readings, Western birth charts,
          Chinese Bazi and Zi Wei Dou Shu, daily horoscopes, dream interpretation, numerology, MBTI ×
          zodiac insights, and an ever-growing library of articles. Every reading is generated to be
          personal, thoughtful, and easy to understand.
        </p>

        <h2>Ancient wisdom meets modern AI</h2>
        <p>
          We pair carefully structured traditional knowledge with large language models so that each
          interpretation is both faithful to its source and tailored to your question. AI helps us turn
          dense symbolism into clear, warm guidance — without losing the depth that makes these systems
          worth studying.
        </p>

        <h2>For reflection, not prediction</h2>
        <p>
          AiAstrum is intended for entertainment, inspiration and personal reflection. Our content is
          not a substitute for professional medical, legal, financial or psychological advice. You are
          always the author of your own decisions — we simply offer a mirror and a moment of pause.
        </p>

        <h2>Say hello</h2>
        <p>
          We&rsquo;re a small team and we read every message. Questions, ideas or feedback are always
          welcome at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalPage>
    );
  }

  if (locale === "tw") {
    return (
      <LegalPage
        locale={locale}
        title="關於 AiAstrum"
        subtitle="以 AI 重新詮釋的古老智慧 —— 每日為你留一個停下來、自我覺察、換個角度看待人生的片刻。"
      >
        <h2>我們的使命</h2>
        <p>
          AiAstrum 希望讓世界上最古老的自我覺察工具 —— 塔羅、占星、八字、生命靈數與易經 ——
          變得親切、美好，並真正貼合現代生活。這些傳統之所以流傳千年，並非因為它能預言未來，
          而是因為它給了我們一套更誠實地認識自己的語言。
        </p>

        <h2>我們提供什麼</h2>
        <p>
          在同一個平台上，你可以體驗 AI 輔助的塔羅占卜、西方星盤、八字與紫微斗數、每日運勢、
          解夢、生命靈數、MBTI × 星座解析，以及不斷擴充的文章專欄。每一次解讀都力求個人化、
          有溫度，並且易於理解。
        </p>

        <h2>古老智慧 × 現代 AI</h2>
        <p>
          我們將嚴謹梳理的傳統知識與大型語言模型結合，讓每一則解讀既忠於原典，又能回應你的提問。
          AI 幫助我們把繁複的象徵語言轉化為清晰、溫暖的指引，同時不失這些體系值得鑽研的深度。
        </p>

        <h2>為了覺察，而非預言</h2>
        <p>
          AiAstrum 旨在提供娛樂、啟發與自我覺察的參考，內容不能取代專業的醫療、法律、財務或心理諮詢。
          你始終是自己人生的作者 —— 我們只是遞上一面鏡子，與一個停頓的片刻。
        </p>

        <h2>與我們聯繫</h2>
        <p>
          我們是一支小團隊，會閱讀每一封來信。任何疑問、想法或回饋，都歡迎寄至
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>。
        </p>
      </LegalPage>
    );
  }

  return (
    <LegalPage
      locale={locale}
      title="关于 AiAstrum"
      subtitle="以 AI 重新诠释的古老智慧 —— 每日为你留一个停下来、自我觉察、换个角度看待人生的片刻。"
    >
      <h2>我们的使命</h2>
      <p>
        AiAstrum 希望让世界上最古老的自我觉察工具 —— 塔罗、占星、八字、生命数字与易经 ——
        变得亲切、美好，并真正贴合现代生活。这些传统之所以流传千年，并非因为它能预言未来，
        而是因为它给了我们一套更诚实地认识自己的语言。
      </p>

      <h2>我们提供什么</h2>
      <p>
        在同一个平台上，你可以体验 AI 辅助的塔罗占卜、西方星盘、八字与紫微斗数、每日运势、
        解梦、生命数字、MBTI × 星座解析，以及不断扩充的文章专栏。每一次解读都力求个人化、
        有温度，并且易于理解。
      </p>

      <h2>古老智慧 × 现代 AI</h2>
      <p>
        我们将严谨梳理的传统知识与大型语言模型结合，让每一则解读既忠于原典，又能回应你的提问。
        AI 帮助我们把繁复的象征语言转化为清晰、温暖的指引，同时不失这些体系值得钻研的深度。
      </p>

      <h2>为了觉察，而非预言</h2>
      <p>
        AiAstrum 旨在提供娱乐、启发与自我探索的参考，内容不能取代专业的医疗、法律、财务或心理咨询。
        你始终是自己人生的作者 —— 我们只是递上一面镜子，与一个停顿的片刻。
      </p>

      <h2>与我们联系</h2>
      <p>
        我们是一支小团队，会阅读每一封来信。任何疑问、想法或反馈，都欢迎寄至
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>。
      </p>
    </LegalPage>
  );
}
