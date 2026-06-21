import { type Locale } from "~/lib/i18n";

interface FooterText {
  brand: string;
  disclaimer: string;
  privacy: string;
  about: string;
  contact: string;
  privacyLink: string;
  terms: string;
  blog: string;
  rights: string;
}

const T: Record<Locale, FooterText> = {
  en: {
    brand: "Destiny Oracle",
    disclaimer: "For entertainment purposes only. All readings are for fun and personal reflection.",
    privacy: "We respect your privacy. Birth data is processed locally. GDPR & CCPA compliant.",
    about: "About",
    contact: "Contact",
    privacyLink: "Privacy",
    terms: "Terms",
    blog: "Blog",
    rights: "All rights reserved.",
  },
  zh: {
    brand: "命运密语",
    disclaimer: "本站内容仅供娱乐与心理探索参考，请理性看待，切勿迷信。",
    privacy: "我们尊重您的隐私。出生数据仅在本地处理，符合 GDPR 及 CCPA 合规要求。",
    about: "关于我们",
    contact: "联系我们",
    privacyLink: "隐私政策",
    terms: "服务条款",
    blog: "博客",
    rights: "保留所有权利。",
  },
  tw: {
    brand: "命運密語",
    disclaimer: "本站內容僅供娛樂與心理探索參考，請理性看待，切勿迷信。",
    privacy: "我們尊重您的隱私。出生資料僅在本地處理，符合 GDPR 及 CCPA 合規要求。",
    about: "關於我們",
    contact: "聯絡我們",
    privacyLink: "隱私政策",
    terms: "服務條款",
    blog: "部落格",
    rights: "保留所有權利。",
  },
};

const linkStyle: React.CSSProperties = {
  color: "rgba(201,168,76,0.78)",
  textDecoration: "none",
  fontSize: "0.74rem",
  letterSpacing: "0.04em",
  transition: "color 0.15s",
};

/**
 * SiteFooter — 全站统一页脚（服务端组件）
 * 在 layout 中渲染，出现在每个页面底部，包含信息页导航与版权声明。
 * locale 由 layout 从 x-locale 请求头解析后传入。
 */
export function SiteFooter({ locale, year }: { locale: Locale; year: number }) {
  const t = T[locale];

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid rgba(201,168,76,0.08)",
        padding: "28px 24px 36px",
        textAlign: "center",
        background: "rgba(6,3,18,0.8)",
      }}
    >
      <div
        style={{
          height: 1,
          background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.12),transparent)",
          marginBottom: 16,
        }}
      />
      <div
        style={{
          fontFamily: "Cinzel,serif",
          fontSize: "0.75rem",
          color: "rgba(201,168,76,0.6)",
          letterSpacing: "0.15em",
          marginBottom: 14,
        }}
      >
        ✦ AiAstrum · {t.brand} ✦
      </div>

      {/* 信息页导航 */}
      <nav
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px 6px",
          marginBottom: 16,
        }}
      >
        <a href={`/${locale}/about`} style={linkStyle}>{t.about}</a>
        <span style={{ color: "rgba(201,168,76,0.25)" }}>·</span>
        <a href={`/${locale}/contact`} style={linkStyle}>{t.contact}</a>
        <span style={{ color: "rgba(201,168,76,0.25)" }}>·</span>
        <a href={`/${locale}/privacy`} style={linkStyle}>{t.privacyLink}</a>
        <span style={{ color: "rgba(201,168,76,0.25)" }}>·</span>
        <a href={`/${locale}/terms`} style={linkStyle}>{t.terms}</a>
        <span style={{ color: "rgba(201,168,76,0.25)" }}>·</span>
        <a href={`/${locale}/blog`} style={linkStyle}>{t.blog}</a>
      </nav>

      <p style={{ fontSize: "0.68rem", color: "rgba(180,165,145,0.6)", lineHeight: 1.6, maxWidth: 340, margin: "0 auto 8px" }}>
        {t.disclaimer}
      </p>
      <p style={{ fontSize: "0.62rem", color: "rgba(170,155,135,0.5)", lineHeight: 1.5, maxWidth: 320, margin: "0 auto 12px" }}>
        {t.privacy}
      </p>
      <p style={{ fontSize: "0.62rem", color: "rgba(160,148,128,0.5)", letterSpacing: "0.04em" }}>
        © {year} AiAstrum. {t.rights}
      </p>
    </footer>
  );
}
