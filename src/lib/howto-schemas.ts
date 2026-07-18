// ─── HowTo JSON-LD 结构化数据（按规范 slug 精确匹配）──────────────────────────
// 与 faq-schema.ts 的内容解析不同：HowTo 步骤需要与正文严格一致，
// 用 slug 显式登记比解析 HTML 更可靠。key = canonical slug（见 canonical-overrides.ts）。
export const HOWTO_SCHEMAS: Record<string, object> = {
  "celtic-cross-tarot-spread-complete-guide": {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Read the Celtic Cross Tarot Spread",
    "description":
      "The Celtic Cross is the classic 10-card tarot spread. Learn what each of the 10 positions means and how to read the spread as one story, step by step.",
    "totalTime": "PT20M",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Frame your question",
        "text": "Choose an open-ended question about a complex situation, not a yes/no question. For example: 'What do I need to know about my career path right now?'",
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Shuffle and lay out the 10 cards",
        "text": "Shuffle while holding your question in mind, then deal ten cards face down and place them in the Celtic Cross layout: positions 1-6 form the cross (present, challenge, foundation, recent past, crown, near future), positions 7-10 form the staff to the right (self, environment, hopes and fears, outcome).",
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Read the heart of the matter (positions 1-2)",
        "text": "Turn over card 1 (the present situation) and card 2 (the challenge crossing it). These two cards name what is actually going on and what is blocking it.",
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Read the timeline of the cross (positions 3-6)",
        "text": "Read position 3 (the foundation beneath the situation), position 4 (what is passing away), position 5 (the best possible outcome or conscious goal), and position 6 (what is approaching in the near future).",
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Read the staff (positions 7-10)",
        "text": "Read position 7 (your attitude and role), position 8 (the people and environment around the situation), position 9 (your hopes and fears), and position 10 (the likely outcome if things continue as they are).",
      },
      {
        "@type": "HowToStep",
        "position": 6,
        "name": "Weave the cards into one story",
        "text": "Look for patterns across the whole spread: repeated suits, the ratio of Major to Minor Arcana, and how the outcome card answers the challenge card. The spread is a narrative, not ten separate predictions.",
      },
    ],
  },
};
