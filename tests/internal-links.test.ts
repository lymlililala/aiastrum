import { injectContextualLinks, type LinkCandidate } from "../src/lib/internal-links";

const candidates: LinkCandidate[] = [
  { slug: "black-tourmaline-protection-meaning", title: "Black Tourmaline Guide", keywords: ["black tourmaline protection", "black tourmaline"] },
  { slug: "feng-shui-bedroom-love-tips", title: "Feng Shui Bedroom", keywords: ["feng shui bedroom love"] },
  { slug: "mercury-retrograde-2026", title: "Mercury Retrograde 2026", keywords: ["mercury retrograde"] },
];

describe("injectContextualLinks", () => {
  it("注入纯文本段中的关键词", () => {
    const html = "<p>Learn about black tourmaline protection today.</p>";
    const out = injectContextualLinks(html, candidates, "other");
    expect(out).toContain('href="/blog/black-tourmaline-protection-meaning"');
    expect(out).toContain('class="blog-inline-link"');
  });

  it("保留原始锚文本大小写", () => {
    const html = "<p>About Mercury Retrograde in spring.</p>";
    const out = injectContextualLinks(html, candidates, "other");
    expect(out).toContain(">Mercury Retrograde</a>");
  });

  it("不在 <a> 标签内部注入", () => {
    const html = '<p><a href="/x">mercury retrograde</a></p>';
    const out = injectContextualLinks(html, candidates, "other");
    expect(out).toBe(html); // 不变
  });

  it("不在 <h2> 标题内部注入", () => {
    const html = "<h2>mercury retrograde</h2><p>some other text</p>";
    const out = injectContextualLinks(html, candidates, "other");
    expect(out).not.toContain("blog-inline-link");
  });

  it("排除自身 slug，不自链", () => {
    const html = "<p>mercury retrograde explained</p>";
    const out = injectContextualLinks(html, candidates, "mercury-retrograde-2026");
    expect(out).not.toContain("blog-inline-link");
  });

  it("遵守 maxLinks 上限", () => {
    const html = "<p>black tourmaline protection and feng shui bedroom love and mercury retrograde</p>";
    const out = injectContextualLinks(html, candidates, "other", { maxLinks: 1 });
    expect(out.match(/blog-inline-link/g)?.length).toBe(1);
  });

  it("同一目标 slug 不重复链接", () => {
    const html = "<p>black tourmaline protection ... black tourmaline again</p>";
    const out = injectContextualLinks(html, candidates, "other");
    // 仅一次链接到 black-tourmaline（term 与 slug 各限一次）
    const count = (out.match(/href="\/blog\/black-tourmaline-protection-meaning"/g) ?? []).length;
    expect(count).toBe(1);
  });

  it("过短/通用词不作为锚（stopword: love、短词）", () => {
    const html = "<p>love is universal and tarot too</p>";
    const out = injectContextualLinks(html, [{ slug: "x", title: "X", keywords: ["love", "tarot"] }], "other");
    expect(out).toBe(html);
  });

  it("不破坏 HTML 结构（标签数量不变）", () => {
    const html = "<p>black tourmaline protection</p><ul><li>feng shui bedroom love</li></ul>";
    const out = injectContextualLinks(html, candidates, "other");
    const tagsBefore = (html.match(/<[^>]+>/g) ?? []).length;
    const tagsAfter = (out.match(/<[^>]+>/g) ?? []).length;
    // 每个注入新增一对 <a></a> = 2 个标签
    expect(tagsAfter).toBeGreaterThan(tagsBefore);
    expect(out).toContain("</li></ul>");
    expect(out).toContain("<p>");
  });

  it("空输入或无候选时原样返回", () => {
    expect(injectContextualLinks("", candidates, "x")).toBe("");
    expect(injectContextualLinks("<p>hi</p>", [], "x")).toBe("<p>hi</p>");
  });
});
