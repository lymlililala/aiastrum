"use client";

import React from "react";
import type { RuneReadingResult } from "~/app/rune/rune-engine";
import { RuneReading } from "~/app/rune/components/RuneReading";
import { runeBlogSlug, RUNE_GUIDE_SLUG } from "../rune-links";
import type { RuneT, Lang } from "../rune-reading-i18n";

interface RuneCastResultProps {
  t: RuneT;
  lang: Lang;
  result: RuneReadingResult;
  onShare: () => void;
  onAgain: () => void;
}

export function RuneCastResult({ t, lang, result, onShare, onAgain }: RuneCastResultProps) {
  // 抽到的符文 → 对应详解文章（Wyrd 空白符文无文章，自动跳过）
  const articleLinks = result.stones
    .map((s) => ({ name: s.rune.name, slug: runeBlogSlug(s.rune.name) }))
    .filter((x): x is { name: string; slug: string } => x.slug !== null);

  return (
    <div className="num-result-container">
      {/* 解读本体：复用 /rune 页的翻牌解读组件（rune-* 样式由 page 引入） */}
      <RuneReading result={result} lang={lang} onShare={onShare} onAgain={onAgain} />

      {/* 深入阅读：单符文详解文章 */}
      {articleLinks.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div style={{
            fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase",
            color: "rgba(201,168,76,0.55)", marginBottom: 10,
            fontFamily: "var(--font-cinzel), serif",
          }}>
            {t.deepDiveTitle}
          </div>
          {articleLinks.map((a) => (
            <a
              key={a.slug}
              href={`/blog/${a.slug}`}
              style={{
                display: "block", marginBottom: 10, padding: "13px 16px", borderRadius: 12,
                background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.15)",
                color: "#e8d5a3", fontSize: "0.84rem", fontWeight: 600, textDecoration: "none",
              }}
            >
              📖 {t.readRuneArticle(a.name)}
            </a>
          ))}
          {/* 老弗萨克总览指南 */}
          <a
            href={`/blog/${RUNE_GUIDE_SLUG}`}
            style={{
              display: "block", marginBottom: 10, padding: "13px 16px", borderRadius: 12,
              background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.15)",
              color: "#e8d5a3", fontSize: "0.84rem", fontWeight: 600, textDecoration: "none",
            }}
          >
            ᚠ {t.guideLink}
          </a>
        </div>
      )}

      {/* CTA：完整 RuneWhisper 体验 */}
      <a
        href={`/${lang}/rune`}
        style={{
          display: "block", marginTop: 10, padding: "13px 16px", borderRadius: 12,
          background: "linear-gradient(135deg, rgba(201,168,76,0.18), rgba(201,168,76,0.08))",
          border: "1px solid rgba(201,168,76,0.35)",
          color: "#e8d5a3", fontSize: "0.84rem", fontWeight: 600, textDecoration: "none",
          textAlign: "center",
        }}
      >
        ✦ {t.fullAppCta}
      </a>
    </div>
  );
}
