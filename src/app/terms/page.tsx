import { type Metadata } from "next";
import { getServerLocale } from "~/lib/serverLocale";
import { toolMetadata } from "~/lib/seo";
import { type Locale } from "~/lib/i18n";
import { CONTACT_EMAIL, LEGAL_LAST_UPDATED } from "~/lib/site";
import { LegalPage } from "../components/LegalPage";

const META: Record<Locale, { title: string; description: string; keywords: string[] }> = {
  en: {
    title: "Terms of Service",
    description:
      "The terms for using AiAstrum. Our readings are for entertainment and reflection only and are not professional advice.",
    keywords: ["AiAstrum terms of service", "terms of use", "entertainment disclaimer"],
  },
  zh: {
    title: "服务条款",
    description:
      "使用 AiAstrum 的相关条款。本站解读仅供娱乐与自我探索，不构成任何专业建议。",
    keywords: ["AiAstrum 服务条款", "使用条款", "娱乐免责声明"],
  },
  tw: {
    title: "服務條款",
    description:
      "使用 AiAstrum 的相關條款。本站解讀僅供娛樂與自我探索，不構成任何專業建議。",
    keywords: ["AiAstrum 服務條款", "使用條款", "娛樂免責聲明"],
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
  return toolMetadata({ path: "/terms", title: m.title, description: m.description, keywords: m.keywords });
}

export default async function TermsPage() {
  const locale = await getServerLocale();

  if (locale === "en") {
    return (
      <LegalPage locale={locale} title="Terms of Service" updated={UPDATED.en}>
        <p>
          Welcome to AiAstrum. By accessing or using our website and services, you agree to these Terms
          of Service. If you do not agree, please do not use the service.
        </p>

        <h2>1. For entertainment only</h2>
        <p>
          AiAstrum provides Tarot, astrology, Bazi, numerology, dream interpretation and similar
          content <strong>for entertainment, inspiration and personal reflection only</strong>. Our
          content does not constitute professional advice and must not be relied upon as a substitute
          for medical, legal, financial, psychological or other professional guidance. Always consult a
          qualified professional for important decisions. You are solely responsible for the choices you
          make.
        </p>

        <h2>2. Eligibility</h2>
        <p>
          You must be at least 13 years old (or the minimum age of digital consent in your country) to
          use AiAstrum. By using the service you confirm that you meet this requirement.
        </p>

        <h2>3. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the service for any unlawful, harmful or abusive purpose.</li>
          <li>Attempt to disrupt, overload, reverse-engineer or gain unauthorized access to the service.</li>
          <li>Scrape, copy or redistribute our content at scale without permission.</li>
          <li>Upload content you do not have the right to share, or that infringes others&rsquo; rights.</li>
        </ul>

        <h2>4. Intellectual property</h2>
        <p>
          The AiAstrum name, design, original text, software and other materials are owned by us or our
          licensors and are protected by applicable laws. You may use the service for your personal,
          non-commercial enjoyment. The personalized readings you generate are yours to keep and share.
        </p>

        <h2>5. Third-party services</h2>
        <p>
          The service relies on third-party providers (such as hosting, analytics and AI providers) and
          may link to external sites. We are not responsible for the content or practices of third
          parties. Your use of those services is subject to their own terms.
        </p>

        <h2>6. No warranty</h2>
        <p>
          The service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without warranties
          of any kind, whether express or implied. We do not warrant that the service will be
          uninterrupted, error-free, or that any reading is accurate, complete or fit for a particular
          purpose.
        </p>

        <h2>7. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, AiAstrum and its team will not be liable for any
          indirect, incidental, or consequential damages, or for any decisions you make based on
          content from the service.
        </p>

        <h2>8. Changes to the service and terms</h2>
        <p>
          We may modify or discontinue features at any time, and we may update these Terms. When we do,
          we&rsquo;ll revise the &ldquo;last updated&rdquo; date above. Continued use after changes means
          you accept the updated Terms.
        </p>

        <h2>9. Contact</h2>
        <p>
          Questions about these Terms? Email us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalPage>
    );
  }

  if (locale === "tw") {
    return (
      <LegalPage locale={locale} title="服務條款" updated={UPDATED.tw}>
        <p>
          歡迎使用 AiAstrum。當你存取或使用本網站與服務，即表示你同意本服務條款。若你不同意，請勿使用本服務。
        </p>

        <h2>1. 僅供娛樂</h2>
        <p>
          AiAstrum 所提供的塔羅、占星、八字、生命靈數、解夢等內容
          <strong>僅供娛樂、啟發與自我覺察之用</strong>。本站內容不構成專業建議，亦不得作為醫療、法律、財務、
          心理或其他專業指導的替代。重要決定請務必諮詢合格的專業人士。你需自行為自己的選擇負責。
        </p>

        <h2>2. 使用資格</h2>
        <p>
          你必須年滿 13 歲（或你所在國家規定之數位同意最低年齡）方可使用 AiAstrum。
          使用本服務即表示你確認符合此項要求。
        </p>

        <h2>3. 可接受的使用方式</h2>
        <p>你同意不從事下列行為：</p>
        <ul>
          <li>將本服務用於任何違法、有害或濫用之目的。</li>
          <li>試圖干擾、超載、逆向工程或未經授權存取本服務。</li>
          <li>未經許可大規模抓取、複製或散布本站內容。</li>
          <li>上傳你無權分享、或侵害他人權利的內容。</li>
        </ul>

        <h2>4. 智慧財產權</h2>
        <p>
          AiAstrum 的名稱、設計、原創文字、軟體及其他素材，均為我們或授權方所有，並受相關法律保護。
          你可將本服務用於個人、非商業性的娛樂用途。你所生成的個人化解讀，可由你自行保存與分享。
        </p>

        <h2>5. 第三方服務</h2>
        <p>
          本服務仰賴第三方供應商（如主機、分析與 AI 供應商），並可能連結至外部網站。
          我們不對第三方的內容或做法負責。你使用這些服務時，須遵循其各自的條款。
        </p>

        <h2>6. 不提供擔保</h2>
        <p>
          本服務以「現狀」與「現有」基礎提供，不提供任何明示或默示的擔保。
          我們不保證服務不中斷、無錯誤，亦不保證任何解讀之準確、完整或符合特定目的。
        </p>

        <h2>7. 責任限制</h2>
        <p>
          在法律允許的最大範圍內，AiAstrum 及其團隊對任何間接、附帶或衍生性損害，
          或你基於本服務內容所做的任何決定，均不負賠償責任。
        </p>

        <h2>8. 服務與條款的變更</h2>
        <p>
          我們可能隨時修改或終止功能，亦可能更新本條款。更新時，我們會修改上方的「最後更新」日期。
          變更後若你繼續使用，即視為你接受更新後的條款。
        </p>

        <h2>9. 聯絡我們</h2>
        <p>
          對本條款有任何疑問？請來信 <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>。
        </p>
      </LegalPage>
    );
  }

  return (
    <LegalPage locale={locale} title="服务条款" updated={UPDATED.zh}>
      <p>
        欢迎使用 AiAstrum。当你访问或使用本网站与服务，即表示你同意本服务条款。若你不同意，请勿使用本服务。
      </p>

      <h2>1. 仅供娱乐</h2>
      <p>
        AiAstrum 所提供的塔罗、占星、八字、生命数字、解梦等内容
        <strong>仅供娱乐、启发与自我探索之用</strong>。本站内容不构成专业建议，亦不得作为医疗、法律、财务、
        心理或其他专业指导的替代。重要决定请务必咨询合格的专业人士。你需自行为自己的选择负责。
      </p>

      <h2>2. 使用资格</h2>
      <p>
        你必须年满 13 岁（或你所在国家规定之数字同意最低年龄）方可使用 AiAstrum。
        使用本服务即表示你确认符合此项要求。
      </p>

      <h2>3. 可接受的使用方式</h2>
      <p>你同意不从事下列行为：</p>
      <ul>
        <li>将本服务用于任何违法、有害或滥用之目的。</li>
        <li>试图干扰、超载、逆向工程或未经授权访问本服务。</li>
        <li>未经许可大规模抓取、复制或散布本站内容。</li>
        <li>上传你无权分享、或侵害他人权利的内容。</li>
      </ul>

      <h2>4. 知识产权</h2>
      <p>
        AiAstrum 的名称、设计、原创文字、软件及其他素材，均为我们或授权方所有，并受相关法律保护。
        你可将本服务用于个人、非商业性的娱乐用途。你所生成的个性化解读，可由你自行保存与分享。
      </p>

      <h2>5. 第三方服务</h2>
      <p>
        本服务依赖第三方供应商（如主机、分析与 AI 供应商），并可能链接至外部网站。
        我们不对第三方的内容或做法负责。你使用这些服务时，须遵循其各自的条款。
      </p>

      <h2>6. 不提供担保</h2>
      <p>
        本服务以「现状」与「现有」基础提供，不提供任何明示或默示的担保。
        我们不保证服务不中断、无错误，亦不保证任何解读之准确、完整或符合特定目的。
      </p>

      <h2>7. 责任限制</h2>
      <p>
        在法律允许的最大范围内，AiAstrum 及其团队对任何间接、附带或衍生性损害，
        或你基于本服务内容所做的任何决定，均不负赔偿责任。
      </p>

      <h2>8. 服务与条款的变更</h2>
      <p>
        我们可能随时修改或终止功能，亦可能更新本条款。更新时，我们会修改上方的「最后更新」日期。
        变更后若你继续使用，即视为你接受更新后的条款。
      </p>

      <h2>9. 联系我们</h2>
      <p>
        对本条款有任何疑问？请来信 <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>。
      </p>
    </LegalPage>
  );
}
