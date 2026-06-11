"use client";

import React, { useState } from "react";
import { getDreamCategories, levelLabel, LEVEL_CONFIG, type DreamLevel, type Lang } from "../dream-data";
import type { DreamT } from "../dream-i18n";

interface DreamCategoryProps {
  t: DreamT;
  lang: Lang;
  onKeywordClick: (keyword: string) => void;
}

export default function DreamCategory({ t, lang, onKeywordClick }: DreamCategoryProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = getDreamCategories(lang);

  return (
    <div className="dream-category-container">
      <h2 className="dream-category-title">
        <span className="dream-category-icon">📚</span>
        {t.catTitle}
      </h2>
      <p className="dream-category-desc">
        {t.catDesc}
      </p>

      <div className="dream-category-grid">
        {categories.map((cat) => (
          <div key={cat.id} className="dream-category-card">
            {/* 分类标题 */}
            <button
              className={`dream-cat-header ${activeCategory === cat.id ? "dream-cat-active" : ""}`}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              style={{ borderColor: activeCategory === cat.id ? cat.color : "transparent" }}
            >
              <span className="dream-cat-emoji">{cat.emoji}</span>
              <span className="dream-cat-name" style={{ color: cat.color }}>{cat.title}</span>
              <span className={`dream-cat-arrow ${activeCategory === cat.id ? "dream-arrow-up" : ""}`}>
                ›
              </span>
            </button>

            {/* 关键词列表 */}
            {activeCategory === cat.id && (
              <div className="dream-cat-keywords">
                {cat.keywords.map((item) => {
                  const lvConf = LEVEL_CONFIG[item.level as DreamLevel];
                  return (
                    <button
                      key={item.word}
                      className="dream-cat-kw-btn"
                      onClick={() => onKeywordClick(item.word)}
                    >
                      <span className="dream-cat-kw-word">{item.wordLabel}</span>
                      <span
                        className="dream-cat-kw-level"
                        style={{ color: lvConf?.color, background: lvConf?.bg }}
                      >
                        {levelLabel(item.level, lang)}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
