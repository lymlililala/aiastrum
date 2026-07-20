"use client";

import { useState } from "react";
import { INTENTIONS } from "./crystals-data";
import { CRYSTALS_UI } from "./crystals-i18n";
import { useLocale } from "~/lib/useLocale";
import { withLocale } from "~/lib/i18n";
import { LangSwitcher } from "~/app/components/LangSwitcher";

export default function CrystalsPage() {
  const locale = useLocale();
  const ui = CRYSTALS_UI[locale];

  const [selectedId, setSelectedId] = useState<string>(INTENTIONS[0]!.id);
  const intention = INTENTIONS.find((it) => it.id === selectedId) ?? INTENTIONS[0]!;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0d0a24 0%, #16102e 60%, #0d0a24 100%)",
      padding: "72px 16px 64px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      {/* SEO H1 — 视觉隐藏，搜索引擎可读 */}
      <h1 style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
        选水晶 — Crystal Selector
      </h1>

      {/* 返回首页 */}
      <a href={withLocale(locale, "/")} style={{
        position: "fixed", top: 16, left: 16, zIndex: 200,
        display: "flex", alignItems: "center", gap: 6,
        padding: "6px 14px", borderRadius: 20,
        background: "rgba(10,6,28,0.75)", backdropFilter: "blur(10px)",
        border: "1px solid rgba(201,168,76,0.25)",
        color: "rgba(201,168,76,0.85)", fontSize: "0.8rem",
        textDecoration: "none", letterSpacing: "0.06em",
      }}>{ui.back}</a>

      {/* 语言切换 */}
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 200 }}>
        <LangSwitcher />
      </div>

      {/* 页头 */}
      <div style={{ textAlign: "center", marginBottom: 28, maxWidth: 640 }}>
        <div style={{
          fontFamily: "var(--font-cinzel), serif", fontSize: "0.72rem",
          color: "rgba(201,168,76,0.6)", letterSpacing: "0.22em",
          textTransform: "uppercase", marginBottom: 10,
        }}>✦ Crystal Selector ✦</div>
        <div style={{
          fontFamily: "var(--font-cinzel), serif", fontSize: "2rem",
          color: "#e8d5a3", letterSpacing: "0.08em", marginBottom: 10,
        }}>{ui.heading}</div>
        <p style={{ fontSize: "0.9rem", color: "rgba(200,175,140,0.75)", lineHeight: 1.7, margin: 0 }}>
          {ui.subheading}
        </p>
      </div>

      {/* 需求选择 */}
      <div style={{ fontSize: "0.85rem", color: "rgba(232,213,163,0.85)", marginBottom: 14, letterSpacing: "0.05em" }}>
        {ui.pickPrompt}
      </div>
      <div style={{
        display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center",
        maxWidth: 720, marginBottom: 32,
      }}>
        {INTENTIONS.map((it) => {
          const active = it.id === selectedId;
          return (
            <button
              key={it.id}
              onClick={() => setSelectedId(it.id)}
              aria-pressed={active}
              style={{
                cursor: "pointer",
                padding: "9px 16px",
                borderRadius: 22,
                border: active
                  ? "1px solid rgba(201,168,76,0.75)"
                  : "1px solid rgba(201,168,76,0.22)",
                background: active
                  ? "linear-gradient(160deg, rgba(201,168,76,0.22), rgba(201,168,76,0.08))"
                  : "rgba(16,10,38,0.7)",
                color: active ? "#e8d5a3" : "rgba(200,175,140,0.75)",
                fontSize: "0.85rem",
                letterSpacing: "0.04em",
                boxShadow: active ? "0 0 18px rgba(201,168,76,0.18)" : "none",
                transition: "all 0.18s",
              }}
            >
              {it.emoji} {it.label[locale]}
            </button>
          );
        })}
      </div>

      {/* 选中需求的引导语 */}
      <p style={{
        maxWidth: 640, textAlign: "center",
        fontSize: "0.88rem", color: "rgba(220,205,175,0.8)",
        lineHeight: 1.8, margin: "0 0 24px",
      }}>
        {intention.tagline[locale]}
      </p>

      {/* 水晶卡片 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 14,
        width: "100%",
        maxWidth: 860,
      }}>
        {intention.stones.map((stone) => (
          <div
            key={stone.id}
            style={{
              background: "rgba(16,10,38,0.7)",
              border: `1px solid ${stone.color}44`,
              borderRadius: 14,
              padding: "18px 18px 16px",
              boxShadow: `0 0 24px ${stone.color}14`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 26 }}>{stone.emoji}</span>
              <span style={{
                fontFamily: "var(--font-cinzel), serif",
                fontSize: "1.02rem", color: stone.color, letterSpacing: "0.04em",
              }}>{stone.name[locale]}</span>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{
                fontSize: "0.68rem", color: "rgba(201,168,76,0.6)",
                letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4,
              }}>{ui.whyLabel}</div>
              <p style={{ fontSize: "0.84rem", color: "rgba(220,205,175,0.82)", lineHeight: 1.75, margin: 0 }}>
                {stone.why[locale]}
              </p>
            </div>
            <div style={{
              borderTop: `1px solid ${stone.color}22`, paddingTop: 10,
            }}>
              <div style={{
                fontSize: "0.68rem", color: "rgba(201,168,76,0.6)",
                letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4,
              }}>{ui.howToUseLabel}</div>
              <p style={{ fontSize: "0.84rem", color: "rgba(200,175,140,0.72)", lineHeight: 1.75, margin: 0 }}>
                {stone.howToUse[locale]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 净化建议 */}
      <div style={{
        marginTop: 20, maxWidth: 860, width: "100%",
        background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.22)",
        borderRadius: 14, padding: "16px 20px",
      }}>
        <div style={{
          fontFamily: "var(--font-cinzel), serif", fontSize: "0.9rem",
          color: "#e8d5a3", letterSpacing: "0.06em", marginBottom: 8,
        }}>🌙 {ui.cleansingTitle}</div>
        <p style={{ fontSize: "0.85rem", color: "rgba(200,175,140,0.75)", lineHeight: 1.8, margin: 0 }}>
          {intention.cleansing[locale]}
        </p>
      </div>

      {/* 延伸阅读（对应需求的博客文章） */}
      {intention.articles.length > 0 && (
        <div style={{ marginTop: 16, maxWidth: 860, width: "100%" }}>
          <div style={{
            fontSize: "0.7rem", fontFamily: "var(--font-cinzel), serif",
            color: "rgba(201,168,76,0.55)", letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: 10,
          }}>{ui.articlesTitle}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {intention.articles.map((a) => (
              <a
                key={a.slug}
                href={withLocale(locale, `/blog/${a.slug}`)}
                style={{
                  textDecoration: "none",
                  padding: "12px 16px", borderRadius: 12,
                  background: "rgba(16,10,38,0.7)",
                  border: "1px solid rgba(201,168,76,0.14)",
                  display: "flex", alignItems: "center", gap: 10,
                }}
              >
                <span style={{ fontSize: 15 }}>📖</span>
                <span style={{ flex: 1, fontSize: "0.84rem", color: "#e8d5a3", fontWeight: 600, lineHeight: 1.4 }}>
                  {a.title[locale]}
                </span>
                <span style={{ color: "rgba(201,168,76,0.4)", fontSize: "0.9rem" }}>→</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── SEO 内容区 + FAQ（SSR 输出，爬虫可读） ── */}
      <section style={{ maxWidth: 720, margin: "48px auto 0", padding: "0 4px", textAlign: "left", width: "100%" }}>
        {ui.seoSections.map((sec) => (
          <div key={sec.heading} style={{ marginBottom: 28 }}>
            <h2 style={{
              fontFamily: "var(--font-cinzel), serif", fontSize: "1.05rem",
              color: "#e8d5a3", letterSpacing: "0.04em", marginBottom: 10,
              borderLeft: "3px solid rgba(201,168,76,0.6)", paddingLeft: 12,
            }}>{sec.heading}</h2>
            <p style={{ fontSize: "0.88rem", color: "rgba(200,175,140,0.75)", lineHeight: 1.85, margin: 0 }}>{sec.body}</p>
          </div>
        ))}
        <h2 style={{
          fontFamily: "var(--font-cinzel), serif", fontSize: "1.05rem",
          color: "#e8d5a3", letterSpacing: "0.04em", marginBottom: 12,
          borderLeft: "3px solid rgba(201,168,76,0.6)", paddingLeft: 12,
        }}>{ui.faqTitle}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {ui.faq.map((f) => (
            <details key={f.q} style={{
              background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.18)",
              borderRadius: 12, padding: "12px 16px",
            }}>
              <summary style={{ cursor: "pointer", fontSize: "0.88rem", color: "rgba(232,213,163,0.9)", fontWeight: 600, lineHeight: 1.5 }}>{f.q}</summary>
              <p style={{ fontSize: "0.84rem", color: "rgba(200,175,140,0.72)", lineHeight: 1.8, margin: "10px 0 2px" }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 免责声明 */}
      <div style={{
        maxWidth: 720, marginTop: 36, textAlign: "center",
        fontSize: "0.72rem", color: "rgba(200,175,140,0.45)", lineHeight: 1.7,
      }}>
        {ui.disclaimer}
      </div>
    </div>
  );
}
