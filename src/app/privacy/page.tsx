import { type Metadata } from "next";
import { getServerLocale } from "~/lib/serverLocale";
import { toolMetadata } from "~/lib/seo";
import { type Locale } from "~/lib/i18n";
import { CONTACT_EMAIL, LEGAL_LAST_UPDATED } from "~/lib/site";
import { LegalPage } from "../components/LegalPage";

const META: Record<Locale, { title: string; description: string; keywords: string[] }> = {
  en: {
    title: "Privacy Policy",
    description:
      "How AiAstrum collects, uses and protects your information. Birth data is processed for your reading; we are GDPR & CCPA compliant.",
    keywords: ["AiAstrum privacy policy", "data protection", "GDPR", "CCPA", "cookies"],
  },
  zh: {
    title: "隐私政策",
    description:
      "AiAstrum 如何收集、使用并保护你的信息。出生数据仅用于生成解读，本站符合 GDPR 与 CCPA 合规要求。",
    keywords: ["AiAstrum 隐私政策", "数据保护", "GDPR", "CCPA", "Cookie"],
  },
  tw: {
    title: "隱私政策",
    description:
      "AiAstrum 如何收集、使用並保護你的資訊。出生資料僅用於生成解讀，本站符合 GDPR 與 CCPA 合規要求。",
    keywords: ["AiAstrum 隱私政策", "資料保護", "GDPR", "CCPA", "Cookie"],
  },
};

const UPDATED: Record<Locale, string> = {
  en: `Last updated: ${LEGAL_LAST_UPDATED}`,
  zh: `最后更新：${LEGAL_LAST_UPDATED}`,
  tw: `最後更新：${LEGAL_LAST_UPDATED}`,
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const m = META[locale];
  return toolMetadata({ path: "/privacy", title: m.title, description: m.description, keywords: m.keywords });
}

export default async function PrivacyPage() {
  const locale = await getServerLocale();

  if (locale === "en") {
    return (
      <LegalPage locale={locale} title="Privacy Policy" updated={UPDATED.en}>
        <p>
          This Privacy Policy explains how AiAstrum (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles
          information when you use our website and services. We&rsquo;ve tried to keep it plain and
          honest. By using AiAstrum, you agree to the practices described here.
        </p>

        <h2>1. Information we collect</h2>
        <ul>
          <li>
            <strong>Reading inputs you provide</strong> — such as your date, time and place of birth,
            name, questions, or uploaded images used to generate a reading. Wherever possible this
            data is processed in your browser and is not stored on our servers.
          </li>
          <li>
            <strong>Preferences</strong> — such as your chosen language, saved locally so the site
            remembers your settings.
          </li>
          <li>
            <strong>Usage &amp; device data</strong> — anonymous, aggregated analytics such as pages
            visited, approximate region, browser and device type, collected to understand and improve
            the service.
          </li>
        </ul>

        <h2>2. How we use your information</h2>
        <ul>
          <li>To generate and display your readings and personalized content.</li>
          <li>To remember your language and preferences.</li>
          <li>To operate, secure, analyze and improve the website.</li>
          <li>To respond to your messages and support requests.</li>
        </ul>
        <p>We do not sell your personal information.</p>

        <h2>3. Cookies &amp; local storage</h2>
        <p>
          We use cookies and browser local storage to remember your preferences (such as language),
          to keep the site running, and to support analytics and advertising. You can manage cookies
          through your browser settings.
        </p>
        <p>
          We may also work with third-party advertising partners, including Google, who use cookies and
          similar technologies to serve and measure ads based on your visits to this and other websites.
          You can opt out of personalized advertising through Google&rsquo;s Ads Settings
          (<a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>)
          or via <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">aboutads.info</a>.
        </p>

        <h2>4. Third-party services</h2>
        <p>
          We rely on trusted providers to run AiAstrum, and limited data may be processed by them on
          our behalf:
        </p>
        <ul>
          <li><strong>Hosting &amp; analytics</strong> — our platform provider hosts the site and supplies privacy-friendly, aggregated usage analytics.</li>
          <li><strong>AI providers</strong> — to generate interpretations, the text of your question may be sent to large-language-model providers. We ask only what is needed to produce your reading.</li>
          <li><strong>Content database</strong> — articles and related content are served from our database provider.</li>
          <li><strong>Advertising</strong> — we may use Google and other advertising partners to display ads; they may set cookies to personalize and measure advertising, as described above.</li>
        </ul>
        <p>These providers process data under their own privacy and security commitments.</p>

        <h2>5. Data retention</h2>
        <p>
          Reading inputs processed in your browser are not retained by us once you leave the page.
          Aggregated analytics are kept only as long as needed to understand trends. Emails you send us
          are kept so we can respond and maintain a record of the conversation.
        </p>

        <h2>6. Your rights (GDPR &amp; CCPA)</h2>
        <p>
          Depending on where you live, you may have the right to access, correct, delete, or restrict
          processing of your personal data, and to object to certain uses. To exercise these rights,
          contact us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will not discriminate
          against you for exercising them.
        </p>

        <h2>7. Children</h2>
        <p>
          AiAstrum is intended for general audiences and is not directed at children under 13 (or the
          minimum age required in your country). We do not knowingly collect personal data from
          children. If you believe a child has provided us data, please contact us and we will remove it.
        </p>

        <h2>8. Security</h2>
        <p>
          We take reasonable technical and organizational measures to protect information. No method of
          transmission or storage is perfectly secure, but we work to keep your data safe.
        </p>

        <h2>9. Changes to this policy</h2>
        <p>
          We may update this policy from time to time. When we do, we&rsquo;ll revise the &ldquo;last
          updated&rdquo; date above. Significant changes will be highlighted where appropriate.
        </p>

        <h2>10. Contact us</h2>
        <p>
          Questions about your privacy? Email us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalPage>
    );
  }

  if (locale === "tw") {
    return (
      <LegalPage locale={locale} title="隱私政策" updated={UPDATED.tw}>
        <p>
          本隱私政策說明 AiAstrum（以下稱「我們」）在你使用本網站與服務時，如何處理你的資訊。
          我們力求以坦誠、易懂的方式說明。使用 AiAstrum 即表示你同意本政策所述的做法。
        </p>

        <h2>1. 我們收集的資訊</h2>
        <ul>
          <li><strong>你提供的占卜輸入</strong> —— 例如出生年月日、出生時間與地點、姓名、提問，或用於生成解讀的上傳圖片。這些資料在可行情況下皆於你的瀏覽器中處理，不會儲存於我們的伺服器。</li>
          <li><strong>偏好設定</strong> —— 例如你選擇的語言，會儲存在本地，讓網站記住你的設定。</li>
          <li><strong>使用與裝置資料</strong> —— 匿名、彙總的分析資料，如造訪頁面、概略地區、瀏覽器與裝置類型，用於了解並改善服務。</li>
        </ul>

        <h2>2. 我們如何使用這些資訊</h2>
        <ul>
          <li>用於生成並顯示你的解讀與個人化內容。</li>
          <li>用於記住你的語言與偏好設定。</li>
          <li>用於營運、保護、分析與改善網站。</li>
          <li>用於回覆你的訊息與支援請求。</li>
        </ul>
        <p>我們不會出售你的個人資訊。</p>

        <h2>3. Cookie 與本地儲存</h2>
        <p>
          我們使用 Cookie 與瀏覽器本地儲存，以記住你的偏好（如語言）、維持網站正常運行，
          並支援分析與廣告。你可透過瀏覽器設定管理 Cookie。
        </p>
        <p>
          我們也可能與包括 Google 在內的第三方廣告合作夥伴合作，他們會使用 Cookie 及類似技術，
          依你在本站及其他網站的瀏覽記錄投放與衡量廣告。你可透過 Google 廣告設定
          （<a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>）
          或 <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">aboutads.info</a> 選擇退出個人化廣告。
        </p>

        <h2>4. 第三方服務</h2>
        <p>我們仰賴受信任的供應商來營運 AiAstrum，部分資料可能由他們代為處理：</p>
        <ul>
          <li><strong>主機與分析</strong> —— 我們的平台供應商負責網站託管，並提供注重隱私的彙總使用分析。</li>
          <li><strong>AI 供應商</strong> —— 為生成解讀，你的提問文字可能會傳送給大型語言模型供應商。我們僅傳送生成解讀所必需的內容。</li>
          <li><strong>內容資料庫</strong> —— 文章與相關內容由我們的資料庫供應商提供。</li>
          <li><strong>廣告</strong> —— 我們可能使用 Google 及其他廣告合作夥伴展示廣告；他們可能如上所述設置 Cookie 以個人化並衡量廣告效果。</li>
        </ul>
        <p>這些供應商會依其各自的隱私與安全承諾處理資料。</p>

        <h2>5. 資料保存</h2>
        <p>
          於瀏覽器中處理的占卜輸入，在你離開頁面後不會由我們保存。彙總分析資料僅在了解趨勢所需的期間內保留。
          你寄給我們的電子郵件會被保存，以便我們回覆並留存往來紀錄。
        </p>

        <h2>6. 你的權利（GDPR 與 CCPA）</h2>
        <p>
          視你所在地區而定，你可能有權查詢、更正、刪除或限制處理你的個人資料，並反對特定用途。
          如欲行使這些權利，請來信 <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>。
          我們不會因你行使權利而對你有差別待遇。
        </p>

        <h2>7. 兒童</h2>
        <p>
          AiAstrum 面向一般大眾，並非針對 13 歲以下（或你所在國家規定之最低年齡）的兒童設計。
          我們不會在知情的情況下蒐集兒童的個人資料。若你發現兒童向我們提供了資料，請聯絡我們，我們將予以刪除。
        </p>

        <h2>8. 安全</h2>
        <p>
          我們採取合理的技術與組織措施保護資訊。沒有任何傳輸或儲存方式是絕對安全的，但我們致力於保障你的資料安全。
        </p>

        <h2>9. 本政策的變更</h2>
        <p>
          我們可能不時更新本政策。更新時，我們會修改上方的「最後更新」日期；如有重大變更，將於適當處特別標示。
        </p>

        <h2>10. 聯絡我們</h2>
        <p>
          對隱私有任何疑問？請來信 <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>。
        </p>
      </LegalPage>
    );
  }

  return (
    <LegalPage locale={locale} title="隐私政策" updated={UPDATED.zh}>
      <p>
        本隐私政策说明 AiAstrum（以下称「我们」）在你使用本网站与服务时，如何处理你的信息。
        我们力求以坦诚、易懂的方式说明。使用 AiAstrum 即表示你同意本政策所述的做法。
      </p>

      <h2>1. 我们收集的信息</h2>
      <ul>
        <li><strong>你提供的占卜输入</strong> —— 例如出生年月日、出生时间与地点、姓名、提问，或用于生成解读的上传图片。这些数据在可行情况下均于你的浏览器中处理，不会存储于我们的服务器。</li>
        <li><strong>偏好设置</strong> —— 例如你选择的语言，会保存在本地，让网站记住你的设置。</li>
        <li><strong>使用与设备数据</strong> —— 匿名、汇总的分析数据，如访问页面、大致地区、浏览器与设备类型，用于了解并改善服务。</li>
      </ul>

      <h2>2. 我们如何使用这些信息</h2>
      <ul>
        <li>用于生成并显示你的解读与个性化内容。</li>
        <li>用于记住你的语言与偏好设置。</li>
        <li>用于运营、保护、分析与改善网站。</li>
        <li>用于回复你的消息与支持请求。</li>
      </ul>
      <p>我们不会出售你的个人信息。</p>

      <h2>3. Cookie 与本地存储</h2>
      <p>
        我们使用 Cookie 与浏览器本地存储，以记住你的偏好（如语言）、维持网站正常运行，
        并支持分析与广告。你可通过浏览器设置管理 Cookie。
      </p>
      <p>
        我们也可能与包括 Google 在内的第三方广告合作伙伴合作，他们会使用 Cookie 及类似技术，
        依你在本站及其他网站的浏览记录投放与衡量广告。你可通过 Google 广告设置
        （<a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>）
        或 <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">aboutads.info</a> 选择退出个性化广告。
      </p>

      <h2>4. 第三方服务</h2>
      <p>我们依赖受信任的供应商来运营 AiAstrum，部分数据可能由他们代为处理：</p>
      <ul>
        <li><strong>主机与分析</strong> —— 我们的平台供应商负责网站托管，并提供注重隐私的汇总使用分析。</li>
        <li><strong>AI 供应商</strong> —— 为生成解读，你的提问文字可能会发送给大型语言模型供应商。我们仅发送生成解读所必需的内容。</li>
        <li><strong>内容数据库</strong> —— 文章与相关内容由我们的数据库供应商提供。</li>
        <li><strong>广告</strong> —— 我们可能使用 Google 及其他广告合作伙伴展示广告；他们可能如上所述设置 Cookie 以个性化并衡量广告效果。</li>
      </ul>
      <p>这些供应商会依其各自的隐私与安全承诺处理数据。</p>

      <h2>5. 数据保存</h2>
      <p>
        于浏览器中处理的占卜输入，在你离开页面后不会由我们保存。汇总分析数据仅在了解趋势所需的期间内保留。
        你寄给我们的电子邮件会被保存，以便我们回复并留存往来记录。
      </p>

      <h2>6. 你的权利（GDPR 与 CCPA）</h2>
      <p>
        视你所在地区而定，你可能有权查询、更正、删除或限制处理你的个人数据，并反对特定用途。
        如欲行使这些权利，请来信 <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>。
        我们不会因你行使权利而对你有差别待遇。
      </p>

      <h2>7. 儿童</h2>
      <p>
        AiAstrum 面向一般大众，并非针对 13 岁以下（或你所在国家规定之最低年龄）的儿童设计。
        我们不会在知情的情况下收集儿童的个人数据。若你发现儿童向我们提供了数据，请联系我们，我们将予以删除。
      </p>

      <h2>8. 安全</h2>
      <p>
        我们采取合理的技术与组织措施保护信息。没有任何传输或存储方式是绝对安全的，但我们致力于保障你的数据安全。
      </p>

      <h2>9. 本政策的变更</h2>
      <p>
        我们可能不时更新本政策。更新时，我们会修改上方的「最后更新」日期；如有重大变更，将于适当处特别标示。
      </p>

      <h2>10. 联系我们</h2>
      <p>
        对隐私有任何疑问？请来信 <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>。
      </p>
    </LegalPage>
  );
}
