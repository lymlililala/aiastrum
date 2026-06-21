import { type Locale } from "~/lib/i18n";
import { LangSwitcher } from "./LangSwitcher";
import "./legal.css";

const BACK_LABEL: Record<Locale, string> = {
  en: "← Home",
  zh: "← 返回首页",
  tw: "← 返回首頁",
};

interface LegalPageProps {
  locale: Locale;
  title: string;
  /** 标题下的简介（可选） */
  subtitle?: string;
  /** 「最后更新」整行文案（可选，如 "Last updated: 2026-06-14"） */
  updated?: string;
  children: React.ReactNode;
}

/**
 * LegalPage — 关于/联系/隐私/条款等信息页的统一外壳
 * 提供返回首页按钮、语言切换、居中容器与标题。正文由 children 传入。
 */
export function LegalPage({ locale, title, subtitle, updated, children }: LegalPageProps) {
  return (
    <div className="legal-wrap">
      <a href={`/${locale}`} className="legal-back">{BACK_LABEL[locale]}</a>
      <div className="legal-langswitch">
        <LangSwitcher />
      </div>

      <main className="legal-main">
        <h1 className="legal-title">{title}</h1>
        {subtitle && <p className="legal-sub">{subtitle}</p>}
        {updated && <p className="legal-updated">{updated}</p>}
        <div className="legal-divider" />
        <div className="legal-prose">{children}</div>
      </main>
    </div>
  );
}
