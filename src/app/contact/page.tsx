import { type Metadata } from "next";
import { getServerLocale } from "~/lib/serverLocale";
import { toolMetadata } from "~/lib/seo";
import { type Locale } from "~/lib/i18n";
import { CONTACT_EMAIL } from "~/lib/site";
import { LegalPage } from "../components/LegalPage";

const META: Record<Locale, { title: string; description: string; keywords: string[] }> = {
  en: {
    title: "Contact Us",
    description: `Get in touch with the AiAstrum team. Email us at ${CONTACT_EMAIL} for feedback, support, business or privacy enquiries.`,
    keywords: ["contact AiAstrum", "AiAstrum support", "AiAstrum email", "feedback"],
  },
  zh: {
    title: "联系我们",
    description: `与 AiAstrum 团队取得联系。如有反馈、技术支持、商务合作或隐私相关问题，欢迎邮件至 ${CONTACT_EMAIL}。`,
    keywords: ["联系 AiAstrum", "AiAstrum 客服", "AiAstrum 邮箱", "意见反馈"],
  },
  tw: {
    title: "聯絡我們",
    description: `與 AiAstrum 團隊取得聯繫。如有回饋、技術支援、商務合作或隱私相關問題，歡迎來信 ${CONTACT_EMAIL}。`,
    keywords: ["聯絡 AiAstrum", "AiAstrum 客服", "AiAstrum 信箱", "意見回饋"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const m = META[locale];
  return toolMetadata({ path: "/contact", title: m.title, description: m.description, keywords: m.keywords });
}

export default async function ContactPage() {
  const locale = await getServerLocale();

  if (locale === "en") {
    return (
      <LegalPage
        locale={locale}
        title="Contact Us"
        subtitle="We&rsquo;d love to hear from you. The fastest way to reach us is by email — we read every message."
      >
        <div className="legal-contact-card">
          <span className="label">Email us</span>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>

        <h2>What to write about</h2>
        <ul>
          <li><strong>Feedback &amp; ideas</strong> — tell us what you love or what we could do better.</li>
          <li><strong>Technical issues</strong> — found a bug or something not working? Let us know what happened.</li>
          <li><strong>Business &amp; partnerships</strong> — collaborations, press and licensing enquiries.</li>
          <li><strong>Privacy requests</strong> — to access or delete your data, see our <a href="/privacy">Privacy Policy</a>.</li>
        </ul>

        <h2>Response time</h2>
        <p>
          We&rsquo;re a small team, so please allow a few business days for a reply. To help us respond
          faster, include as much detail as you can — and, for technical issues, the device and browser
          you were using.
        </p>

        <p>
          Looking for our policies instead? See the <a href="/privacy">Privacy Policy</a> and{" "}
          <a href="/terms">Terms of Service</a>.
        </p>
      </LegalPage>
    );
  }

  if (locale === "tw") {
    return (
      <LegalPage
        locale={locale}
        title="聯絡我們"
        subtitle="我們很樂意聽見你的聲音。最快的聯絡方式是電子郵件 —— 我們會閱讀每一封來信。"
      >
        <div className="legal-contact-card">
          <span className="label">來信聯絡</span>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>

        <h2>你可以聊些什麼</h2>
        <ul>
          <li><strong>意見與想法</strong> —— 告訴我們你喜歡的地方，或我們可以做得更好之處。</li>
          <li><strong>技術問題</strong> —— 發現錯誤或功能異常？請描述發生了什麼狀況。</li>
          <li><strong>商務與合作</strong> —— 合作、媒體採訪與授權洽詢。</li>
          <li><strong>隱私請求</strong> —— 如需查詢或刪除你的資料，請參閱<a href="/privacy">隱私政策</a>。</li>
        </ul>

        <h2>回覆時間</h2>
        <p>
          我們是一支小團隊，回覆可能需要數個工作天，敬請見諒。為了讓我們更快協助你，
          請盡量提供詳細資訊；若是技術問題，也請附上你使用的裝置與瀏覽器。
        </p>

        <p>
          想查看相關政策嗎？請參閱<a href="/privacy">隱私政策</a>與<a href="/terms">服務條款</a>。
        </p>
      </LegalPage>
    );
  }

  return (
    <LegalPage
      locale={locale}
      title="联系我们"
      subtitle="我们很乐意听见你的声音。最快的联系方式是电子邮件 —— 我们会阅读每一封来信。"
    >
      <div className="legal-contact-card">
        <span className="label">来信联系</span>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </div>

      <h2>你可以聊些什么</h2>
      <ul>
        <li><strong>意见与想法</strong> —— 告诉我们你喜欢的地方，或我们可以做得更好之处。</li>
        <li><strong>技术问题</strong> —— 发现错误或功能异常？请描述发生了什么状况。</li>
        <li><strong>商务与合作</strong> —— 合作、媒体采访与授权洽询。</li>
        <li><strong>隐私请求</strong> —— 如需查询或删除你的数据，请参阅<a href="/privacy">隐私政策</a>。</li>
      </ul>

      <h2>回复时间</h2>
      <p>
        我们是一支小团队，回复可能需要数个工作日，敬请见谅。为了让我们更快协助你，
        请尽量提供详细信息；若是技术问题，也请附上你使用的设备与浏览器。
      </p>

      <p>
        想查看相关政策吗？请参阅<a href="/privacy">隐私政策</a>与<a href="/terms">服务条款</a>。
      </p>
    </LegalPage>
  );
}
