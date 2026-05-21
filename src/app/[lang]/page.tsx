/**
 * [lang]/page.tsx
 * 处理 /zh  /en  /tw 三个语言路由，渲染与根路由相同的首页内容。
 * 语言状态通过 URL 路径（usePathname）由 page.tsx 内部读取。
 */
import { LOCALES, type Locale } from "~/lib/i18n";
import RootPage from "../page";

interface Props {
  params: { lang: string };
}

// 静态生成三个语言版本
export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

export default function LangPage({ params }: Props) {
  // 非法 locale 直接 fallback 渲染（middleware 已经过滤过了）
  const isValid = LOCALES.includes(params.lang as Locale);
  if (!isValid) return null;

  // 直接渲染根首页组件，组件内部通过 usePathname() 读取 /zh /en /tw 来决定语言
  return <RootPage />;
}
