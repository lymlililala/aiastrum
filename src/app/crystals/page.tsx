"use client";

import { useState } from "react";
import "./crystals.css";
import { INTENTIONS, STONE_POOL, ELEMENT_INFO, ELEMENT_CYCLE, STONE_ELEMENT, STEM_PINYIN, type StoneElement } from "./crystals-data";
import { drawCrystals, getWeakestElement, matchStonesByElement, scoresAreClose, type CrystalDraw, type DrawMode, type BaziMatch } from "./crystals-engine";
import { CRYSTALS_UI, CRYSTALS_ORACLE_UI, CRYSTALS_BAZI_UI } from "./crystals-i18n";
import { calculateBazi, STEM_YIN_YANG, STEM_ELEMENT, type BaziResult } from "~/app/bazi/bazi-engine";
import { useLocale } from "~/lib/useLocale";
import { withLocale } from "~/lib/i18n";
import { LangSwitcher } from "~/app/components/LangSwitcher";

type Tab = "bazi" | "oracle" | "browse";
type Step = "input" | "casting" | "result";

/** 抽石洗牌动画用的 emoji 池 */
const POOL_EMOJIS = Array.from(new Set(STONE_POOL.map((e) => e.stone.emoji)));

/** 八字选石：年份上限取当前年 */
const CURRENT_YEAR = new Date().getFullYear();

/** 某年某月的实际天数（自动处理闰年；month 越界时回退 31） */
function daysInMonth(year: number, month: number): number {
  if (month < 1 || month > 12) return 31;
  return new Date(year, month, 0).getDate();
}

/** 只保留数字并限制长度（配合 inputMode="numeric" 防粘贴非数字） */
function digitsOnly(v: string, maxLen: number): string {
  return v.replace(/\D/g, "").slice(0, maxLen);
}

export default function CrystalsPage() {
  const locale = useLocale();
  const ui = CRYSTALS_UI[locale];
  const o = CRYSTALS_ORACLE_UI[locale];
  const b = CRYSTALS_BAZI_UI[locale];

  const [tab, setTab] = useState<Tab>("bazi");

  // ── 八字选石模式状态(默认填当天日期,用户改为自己生日即可) ──
  const [bYear, setBYear] = useState(() => String(new Date().getFullYear()));
  const [bMonth, setBMonth] = useState(() => String(new Date().getMonth() + 1));
  const [bDay, setBDay] = useState(() => String(new Date().getDate()));
  const [bHour, setBHour] = useState(""); // "" = 时辰未知
  const [bIntention, setBIntention] = useState<string | null>(null);
  const [bError, setBError] = useState("");
  const [bResult, setBResult] = useState<{
    chart: BaziResult;
    weakest: StoneElement;
    match: BaziMatch;
    hourUnknown: boolean;
    close: boolean;
  } | null>(null);

  // 失焦时才夹取范围，不在输入过程中和用户抢光标
  const clampDayToMonth = (y: number, m: number) => {
    if (!bDay) return;
    const maxDay = y && m ? daysInMonth(y, m) : 31;
    const d = Math.min(Math.max(Number(bDay) || 1, 1), maxDay);
    setBDay(String(d));
  };
  const handleYearBlur = () => {
    if (!bYear) return;
    const y = Math.min(Math.max(Number(bYear) || 1900, 1900), CURRENT_YEAR);
    setBYear(String(y));
    clampDayToMonth(y, Number(bMonth));
  };
  const handleMonthBlur = () => {
    if (!bMonth) return;
    const m = Math.min(Math.max(Number(bMonth) || 1, 1), 12);
    setBMonth(String(m));
    clampDayToMonth(Number(bYear), m);
  };
  const handleDayBlur = () => {
    if (!bDay) return;
    clampDayToMonth(Number(bYear), Number(bMonth));
  };

  // 三项齐全且在范围内才允许提交
  const bYearN = Number(bYear);
  const bMonthN = Number(bMonth);
  const bDayN = Number(bDay);
  const bDateValid =
    bYear !== "" && bMonth !== "" && bDay !== "" &&
    Number.isInteger(bYearN) && Number.isInteger(bMonthN) && Number.isInteger(bDayN) &&
    bYearN >= 1900 && bYearN <= CURRENT_YEAR &&
    bMonthN >= 1 && bMonthN <= 12 &&
    bDayN >= 1 && bDayN <= daysInMonth(bYearN || 2000, bMonthN || 1);

  const handleBaziCalc = () => {
    // 兜底校验：非法值绝不进入 calculateBazi
    if (!bDateValid) {
      setBError(b.invalidDate);
      return;
    }
    const year = bYearN;
    const month = bMonthN;
    const day = bDayN;
    setBError("");
    const hourUnknown = bHour === "";
    const chart = calculateBazi(
      { year, month, day, hour: hourUnknown ? -1 : Number(bHour), gender: "male" },
      locale,
    );
    const weakest = getWeakestElement(chart.elementScores);
    const match = matchStonesByElement(weakest, bIntention ?? undefined);
    setBResult({ chart, weakest, match, hourUnknown, close: scoresAreClose(chart.elementScores) });
  };

  // ── 占卜模式状态 ──
  const [step, setStep] = useState<Step>("input");
  const [spread, setSpread] = useState<DrawMode>("single");
  const [question, setQuestion] = useState("");
  const [draw, setDraw] = useState<CrystalDraw | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [castEmojis, setCastEmojis] = useState<string[]>(POOL_EMOJIS.slice(0, 4));

  const handleCast = () => {
    setStep("casting");
    setRevealed(false);
    setCopied(false);
    // 洗牌动画：水晶 emoji 随机闪烁（仪式感），然后执行真实抽取
    let count = 0;
    const interval = setInterval(() => {
      setCastEmojis(
        Array.from({ length: 4 }, () => POOL_EMOJIS[Math.floor(Math.random() * POOL_EMOJIS.length)]!),
      );
      count++;
      if (count >= 8) {
        clearInterval(interval);
        setDraw(drawCrystals(spread));
        setStep("result");
      }
    }, 120);
  };

  const handleAgain = () => {
    setStep("input");
    setDraw(null);
    setRevealed(false);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!draw) return;
    const lines: string[] = [];
    lines.push(draw.mode === "single" ? o.badgeSingle : o.badgeThree);
    if (question.trim()) lines.push(`${o.yourQuestion}：${question.trim()}`);
    draw.stones.forEach((entry, i) => {
      const pos = draw.mode === "three" ? o.positions[i] : null;
      const head = pos ? `${pos.icon} ${pos.label}` : `${entry.stone.emoji} ${entry.stone.name[locale]}`;
      lines.push("");
      lines.push(head);
      if (pos) lines.push(`${entry.stone.emoji} ${entry.stone.name[locale]}`);
      lines.push(`${o.domainLabel}：${entry.intentionEmoji} ${entry.intentionLabel[locale]}`);
      lines.push(`${o.oracleLabel}：${entry.oracle[locale]}`);
      lines.push(`${ui.howToUseLabel}：${entry.stone.howToUse[locale]}`);
    });
    lines.push("");
    lines.push("— AiAstrum 选水晶 / Crystal Selector");
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 剪贴板不可用时静默失败，不影响占卜流程
    }
  };

  // ── 按需求选石（浏览模式）状态 ──
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
      <div style={{ textAlign: "center", marginBottom: 22, maxWidth: 640 }}>
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

      {/* 模式切换：占卜抽石（默认） / 按需求选石 */}
      <div style={{
        display: "flex", gap: 4, padding: 4, borderRadius: 24, marginBottom: 28,
        background: "rgba(16,10,38,0.8)", border: "1px solid rgba(201,168,76,0.22)",
      }}>
        {([
          { key: "bazi" as Tab, label: `🀄 ${b.tabBazi}` },
          { key: "oracle" as Tab, label: `🔮 ${o.tabOracle}` },
          { key: "browse" as Tab, label: `💎 ${o.tabBrowse}` },
        ]).map((tb) => {
          const active = tab === tb.key;
          return (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              aria-pressed={active}
              style={{
                cursor: "pointer", padding: "8px 20px", borderRadius: 20, border: "none",
                background: active ? "linear-gradient(160deg, rgba(201,168,76,0.28), rgba(201,168,76,0.12))" : "transparent",
                color: active ? "#e8d5a3" : "rgba(200,175,140,0.6)",
                fontSize: "0.85rem", letterSpacing: "0.04em", transition: "all 0.18s",
                boxShadow: active ? "0 0 14px rgba(201,168,76,0.15)" : "none",
              }}
            >{tb.label}</button>
          );
        })}
      </div>

      {/* ══════════ 八字选石模式（默认） ══════════ */}
      {tab === "bazi" && (
        <div style={{ width: "100%", maxWidth: 860, display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* 输入表单 */}
          <div style={{
            maxWidth: 720, width: "100%", margin: "0 auto",
            borderRadius: 16, padding: "24px 22px",
            background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.22)",
            boxShadow: "0 0 40px rgba(201,168,76,0.06)",
          }}>
            <div style={{ textAlign: "center", marginBottom: 18 }}>
              <h2 style={{
                fontFamily: "var(--font-cinzel), serif", fontSize: "1rem", color: "#e8d5a3",
                letterSpacing: "0.08em", margin: "0 0 6px",
              }}>{b.formTitle}</h2>
              <p style={{ fontSize: "0.82rem", color: "rgba(200,175,140,0.65)", margin: 0 }}>{b.formHint}</p>
            </div>

            {/* 出生日期 */}
            <div style={{ marginBottom: 16 }}>
              <label style={{
                display: "block", fontSize: "0.72rem", color: "rgba(201,168,76,0.6)",
                letterSpacing: "0.1em", marginBottom: 6,
              }}>{b.birthDateLabel}</label>
              <div style={{ display: "flex", gap: 8 }}>
                {([
                  { v: bYear, set: setBYear, ph: b.yearPlaceholder, w: 1.4, len: 4, blur: handleYearBlur },
                  { v: bMonth, set: setBMonth, ph: b.monthPlaceholder, w: 1, len: 2, blur: handleMonthBlur },
                  { v: bDay, set: setBDay, ph: b.dayPlaceholder, w: 1, len: 2, blur: handleDayBlur },
                ]).map((f, i) => (
                  <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    maxLength={f.len}
                    value={f.v}
                    onChange={(e) => f.set(digitsOnly(e.target.value, f.len))}
                    onBlur={f.blur}
                    placeholder={f.ph}
                    style={{
                      flex: f.w, minWidth: 0,
                      padding: "11px 12px", borderRadius: 12,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      color: "#e8d5a3", fontSize: "0.88rem", outline: "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* 时辰（选填） */}
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="cr-bazi-hour" style={{
                display: "block", fontSize: "0.72rem", color: "rgba(201,168,76,0.6)",
                letterSpacing: "0.1em", marginBottom: 6,
              }}>{b.hourLabel}</label>
              <select
                id="cr-bazi-hour"
                value={bHour}
                onChange={(e) => setBHour(e.target.value)}
                style={{
                  width: "100%", padding: "11px 12px", borderRadius: 12,
                  background: "rgba(16,10,38,0.9)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  color: "#e8d5a3", fontSize: "0.88rem", outline: "none",
                }}
              >
                <option value="">{b.hourUnknown}</option>
                {Array.from({ length: 24 }, (_, h) => (
                  <option key={h} value={String(h)}>{`${String(h).padStart(2, "0")}:00`}</option>
                ))}
              </select>
            </div>

            {/* 诉求（选填） */}
            <div style={{ marginBottom: 20 }}>
              <div style={{
                fontSize: "0.72rem", color: "rgba(201,168,76,0.6)",
                letterSpacing: "0.1em", marginBottom: 8,
              }}>{b.intentionLabel}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setBIntention(null)}
                  aria-pressed={bIntention === null}
                  style={{
                    cursor: "pointer", padding: "7px 14px", borderRadius: 18, fontSize: "0.8rem",
                    border: bIntention === null ? "1px solid rgba(201,168,76,0.7)" : "1px solid rgba(201,168,76,0.2)",
                    background: bIntention === null ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.03)",
                    color: bIntention === null ? "#e8d5a3" : "rgba(200,175,140,0.7)",
                  }}
                >{b.intentionNone}</button>
                {INTENTIONS.map((it) => {
                  const active = bIntention === it.id;
                  return (
                    <button
                      type="button"
                      key={it.id}
                      onClick={() => setBIntention(active ? null : it.id)}
                      aria-pressed={active}
                      style={{
                        cursor: "pointer", padding: "7px 14px", borderRadius: 18, fontSize: "0.8rem",
                        border: active ? "1px solid rgba(201,168,76,0.7)" : "1px solid rgba(201,168,76,0.2)",
                        background: active ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.03)",
                        color: active ? "#e8d5a3" : "rgba(200,175,140,0.7)",
                      }}
                    >{it.emoji} {it.label[locale]}</button>
                  );
                })}
              </div>
            </div>

            {bError && (
              <p style={{ fontSize: "0.8rem", color: "#f0908d", margin: "0 0 12px", textAlign: "center" }}>{bError}</p>
            )}

            {/* 计算按钮（日期无效时禁用） */}
            <button
              onClick={handleBaziCalc}
              disabled={!bDateValid}
              style={{
                width: "100%", padding: "15px 24px", borderRadius: 16,
                cursor: bDateValid ? "pointer" : "not-allowed",
                background: "linear-gradient(135deg, rgba(201,168,76,0.3), rgba(201,168,76,0.12), rgba(201,168,76,0.3))",
                border: "1px solid rgba(201,168,76,0.5)",
                color: "#e8d5a3", fontSize: "1rem", fontWeight: 700,
                fontFamily: "var(--font-cinzel), serif", letterSpacing: "0.06em",
                opacity: bDateValid ? 1 : 0.45,
                transition: "opacity 0.18s",
              }}
            >
              <span style={{ marginRight: 8 }}>🀄</span>{b.calcBtn}
            </button>
          </div>

          {/* 结果 */}
          {bResult && (() => {
            const { chart, weakest, match } = bResult;
            const weakestInfo = ELEMENT_INFO[weakest];
            const dayElement = STEM_ELEMENT[chart.dayStem as keyof typeof STEM_ELEMENT] as StoneElement;
            const dayYY = STEM_YIN_YANG[chart.dayStem as keyof typeof STEM_YIN_YANG];
            const scores = chart.elementScores;
            const total = ELEMENT_CYCLE.reduce((s, el) => s + (scores[el] ?? 0), 0) || 1;
            const hasMother = match.primary.some((e) => STONE_ELEMENT[e.stone.id] !== weakest);
            const motherEl = ELEMENT_CYCLE.find((el) =>
              el !== weakest && match.primary.some((e) => STONE_ELEMENT[e.stone.id] === el));
            return (
              <div style={{ width: "100%", marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>

                {/* 日主 + 五行分布 */}
                <div style={{
                  background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.22)",
                  borderRadius: 14, padding: "18px 20px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, flexWrap: "wrap" }}>
                    <span style={{
                      fontSize: "2rem", color: "#e8d5a3", fontFamily: "serif",
                      textShadow: "0 0 16px rgba(201,168,76,0.5)",
                    }}>{chart.dayStem}</span>
                    <div>
                      <div style={{ fontSize: "0.68rem", color: "rgba(201,168,76,0.6)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                        {b.dayMasterLabel}
                      </div>
                      <div style={{ fontSize: "0.95rem", color: "rgba(232,213,163,0.9)", marginTop: 3 }}>
                        {locale === "en"
                          ? `${STEM_PINYIN[chart.dayStem] ?? chart.dayStem} · ${dayYY === "阳" ? b.yangLabel : b.yinLabel} ${ELEMENT_INFO[dayElement].label[locale]}`
                          : `${chart.dayStem}（${dayYY}${ELEMENT_INFO[dayElement].label[locale]}）`}
                      </div>
                    </div>
                  </div>

                  {/* 分布条 */}
                  <div style={{ fontSize: "0.68rem", color: "rgba(201,168,76,0.6)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
                    {b.barTitle}
                  </div>
                  <div style={{ display: "flex", height: 14, borderRadius: 8, overflow: "hidden", gap: 2 }}>
                    {ELEMENT_CYCLE.map((el) => {
                      const s = scores[el] ?? 0;
                      const pct = (s / total) * 100;
                      return (
                        <div
                          key={el}
                          title={`${ELEMENT_INFO[el].label[locale]} ${s}`}
                          style={{
                            width: `${Math.max(pct, 3)}%`,
                            background: ELEMENT_INFO[el].color,
                            opacity: el === weakest ? 1 : 0.55,
                            outline: el === weakest ? "2px solid rgba(232,213,163,0.8)" : "none",
                            outlineOffset: -2,
                            borderRadius: 3,
                          }}
                        />
                      );
                    })}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, flexWrap: "wrap", gap: 6 }}>
                    {ELEMENT_CYCLE.map((el) => (
                      <span key={el} style={{
                        fontSize: "0.72rem",
                        color: el === weakest ? "#e8d5a3" : "rgba(200,175,140,0.6)",
                        fontWeight: el === weakest ? 700 : 400,
                      }}>
                        {ELEMENT_INFO[el].label[locale]} {scores[el] ?? 0}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 需补元素 */}
                <div style={{
                  background: "rgba(16,10,38,0.7)",
                  border: `1px solid ${weakestInfo.color}55`,
                  borderRadius: 14, padding: "18px 20px",
                  boxShadow: `0 0 24px ${weakestInfo.color}18`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{
                      fontSize: "0.68rem", color: "rgba(201,168,76,0.6)",
                      letterSpacing: "0.12em", textTransform: "uppercase",
                    }}>{b.weakestTitle}</span>
                    <span style={{
                      padding: "3px 12px", borderRadius: 12, fontSize: "0.82rem", fontWeight: 700,
                      background: `${weakestInfo.color}22`, border: `1px solid ${weakestInfo.color}66`,
                      color: weakestInfo.color,
                    }}>{weakestInfo.label[locale]}</span>
                  </div>
                  <p style={{ fontSize: "0.86rem", color: "rgba(220,205,175,0.82)", lineHeight: 1.75, margin: "0 0 8px" }}>
                    {weakestInfo.blurb[locale]}
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "rgba(232,213,163,0.85)", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
                    {b.reasonLine(weakestInfo.label[locale])}
                  </p>
                  {bResult.hourUnknown && (
                    <p style={{ fontSize: "0.74rem", color: "rgba(200,175,140,0.55)", lineHeight: 1.7, margin: "10px 0 0" }}>
                      {bResult.close ? b.closeScoresNote : b.hourUnknownNote}
                    </p>
                  )}
                </div>

                {/* 推荐水晶 */}
                <div style={{
                  fontFamily: "var(--font-cinzel), serif", fontSize: "0.95rem",
                  color: "#e8d5a3", letterSpacing: "0.06em", marginTop: 6,
                }}>
                  {b.primaryTitle(weakestInfo.label[locale])}
                </div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: 14, width: "100%",
                }}>
                  {match.primary.map((entry, i) => (
                    <div
                      key={entry.stone.id}
                      className="cr-detail-card"
                      style={{
                        animationDelay: `${i * 0.12}s`,
                        background: "rgba(16,10,38,0.7)",
                        border: `1px solid ${entry.stone.color}44`,
                        borderRadius: 14, padding: "18px 18px 16px",
                        boxShadow: `0 0 24px ${entry.stone.color}14`,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
                        <span style={{ fontSize: 26 }}>{entry.stone.emoji}</span>
                        <span style={{
                          fontFamily: "var(--font-cinzel), serif",
                          fontSize: "1.02rem", color: entry.stone.color, letterSpacing: "0.04em",
                        }}>{entry.stone.name[locale]}</span>
                        <span style={{
                          fontSize: "0.66rem", padding: "2px 9px", borderRadius: 10,
                          background: `${ELEMENT_INFO[STONE_ELEMENT[entry.stone.id]!].color}1e`,
                          border: `1px solid ${ELEMENT_INFO[STONE_ELEMENT[entry.stone.id]!].color}55`,
                          color: ELEMENT_INFO[STONE_ELEMENT[entry.stone.id]!].color,
                        }}>{ELEMENT_INFO[STONE_ELEMENT[entry.stone.id]!].label[locale]}</span>
                        {bIntention && entry.intentionId === bIntention && (
                          <span style={{
                            fontSize: "0.66rem", padding: "2px 9px", borderRadius: 10,
                            background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)",
                            color: "rgba(232,213,163,0.85)",
                          }}>{entry.intentionEmoji} {entry.intentionLabel[locale]}</span>
                        )}
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <div style={{
                          fontSize: "0.68rem", color: "rgba(201,168,76,0.6)",
                          letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4,
                        }}>{ui.whyLabel}</div>
                        <p style={{ fontSize: "0.84rem", color: "rgba(220,205,175,0.82)", lineHeight: 1.75, margin: 0 }}>
                          {entry.stone.why[locale]}
                        </p>
                      </div>
                      <div style={{ borderTop: `1px solid ${entry.stone.color}22`, paddingTop: 10 }}>
                        <div style={{
                          fontSize: "0.68rem", color: "rgba(201,168,76,0.6)",
                          letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4,
                        }}>{ui.howToUseLabel}</div>
                        <p style={{ fontSize: "0.84rem", color: "rgba(200,175,140,0.72)", lineHeight: 1.75, margin: 0 }}>
                          {entry.stone.howToUse[locale]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {hasMother && motherEl && (
                  <p style={{ fontSize: "0.76rem", color: "rgba(200,175,140,0.55)", margin: 0 }}>
                    {b.motherNote(weakestInfo.label[locale], ELEMENT_INFO[motherEl].label[locale])}
                  </p>
                )}

                {/* 兼顾诉求 */}
                {match.secondary.length > 0 && (
                  <>
                    <div style={{
                      fontFamily: "var(--font-cinzel), serif", fontSize: "0.95rem",
                      color: "#e8d5a3", letterSpacing: "0.06em", marginTop: 6,
                    }}>
                      {b.secondaryTitle}
                    </div>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                      gap: 14, width: "100%",
                    }}>
                      {match.secondary.map((entry, i) => (
                        <div
                          key={entry.stone.id}
                          className="cr-detail-card"
                          style={{
                            animationDelay: `${i * 0.12}s`,
                            background: "rgba(16,10,38,0.7)",
                            border: `1px solid ${entry.stone.color}33`,
                            borderRadius: 14, padding: "16px 18px",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                            <span style={{ fontSize: 22 }}>{entry.stone.emoji}</span>
                            <span style={{
                              fontFamily: "var(--font-cinzel), serif",
                              fontSize: "0.98rem", color: entry.stone.color,
                            }}>{entry.stone.name[locale]}</span>
                          </div>
                          <p style={{ fontSize: "0.82rem", color: "rgba(220,205,175,0.78)", lineHeight: 1.7, margin: 0 }}>
                            {entry.stone.why[locale]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* CTA：完整八字排盘 */}
                <a
                  href={withLocale(locale, "/bazi")}
                  style={{
                    display: "block", marginTop: 8, padding: "13px 16px", borderRadius: 12,
                    background: "linear-gradient(135deg, rgba(201,168,76,0.18), rgba(201,168,76,0.08))",
                    border: "1px solid rgba(201,168,76,0.35)",
                    color: "#e8d5a3", fontSize: "0.84rem", fontWeight: 600,
                    textDecoration: "none", textAlign: "center",
                  }}
                >
                  ✦ {b.ctaBazi}
                </a>
              </div>
            );
          })()}
        </div>
      )}

      {/* ══════════ 占卜抽石模式 ══════════ */}
      {tab === "oracle" && (
        <div style={{ width: "100%", maxWidth: 860, display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* 步骤：输入（默念问题 + 选牌阵 + 抽石按钮） */}
          {step === "input" && (
            <>
              {/* 怎么玩 */}
              <div style={{
                maxWidth: 720, width: "100%", margin: "0 auto 24px",
                borderRadius: 14, padding: "18px 20px",
                background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.18)",
              }}>
                <h2 style={{
                  fontFamily: "var(--font-cinzel), serif", fontSize: "1.05rem", color: "#e8d5a3",
                  letterSpacing: "0.04em", marginBottom: 14,
                  borderLeft: "3px solid rgba(201,168,76,0.6)", paddingLeft: 12,
                }}>{o.howToTitle}</h2>
                <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {o.howToSteps.map((s, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{
                        flexShrink: 0, width: 22, height: 22, borderRadius: "50%",
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        border: "1px solid rgba(201,168,76,0.55)", color: "#c9a84c",
                        fontSize: "0.72rem", fontWeight: 600, marginTop: 1,
                      }}>{i + 1}</span>
                      <span style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "rgba(220,205,175,0.78)" }}>{s}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* 抽石卡片 */}
              <div style={{
                maxWidth: 720, width: "100%", margin: "0 auto",
                borderRadius: 16, padding: "24px 22px",
                background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.22)",
                boxShadow: "0 0 40px rgba(201,168,76,0.06)",
              }}>
                <div style={{ textAlign: "center", marginBottom: 18 }}>
                  <h2 style={{
                    fontFamily: "var(--font-cinzel), serif", fontSize: "1rem", color: "#e8d5a3",
                    letterSpacing: "0.08em", margin: "0 0 6px",
                  }}>{o.modeLabel}</h2>
                  <p style={{ fontSize: "0.82rem", color: "rgba(200,175,140,0.65)", margin: 0 }}>{o.focusHint}</p>
                </div>

                {/* 问题输入（选填） */}
                <div style={{ marginBottom: 18 }}>
                  <label htmlFor="cr-question" style={{
                    display: "block", fontSize: "0.72rem", color: "rgba(201,168,76,0.6)",
                    letterSpacing: "0.1em", marginBottom: 6,
                  }}>{o.questionLabel}</label>
                  <input
                    id="cr-question"
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder={o.questionPlaceholder}
                    maxLength={60}
                    style={{
                      width: "100%", boxSizing: "border-box",
                      padding: "11px 14px", borderRadius: 12,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      color: "#e8d5a3", fontSize: "0.88rem", outline: "none",
                    }}
                  />
                </div>

                {/* 牌阵选择 */}
                <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                  {([
                    { key: "single" as DrawMode, icon: "☽", name: o.singleName, sub: o.singleSub, desc: o.singleDesc },
                    { key: "three" as DrawMode, icon: "✦", name: o.threeName, sub: o.threeSub, desc: o.threeDesc },
                  ]).map((m) => {
                    const active = spread === m.key;
                    return (
                      <button
                        type="button"
                        key={m.key}
                        onClick={() => setSpread(m.key)}
                        aria-pressed={active}
                        style={{
                          flex: 1, padding: "14px 12px", borderRadius: 14, cursor: "pointer",
                          background: active ? "rgba(201,168,76,0.10)" : "rgba(255,255,255,0.03)",
                          border: `1px solid ${active ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.15)"}`,
                          color: "#e8d5a3", transition: "all 0.18s", textAlign: "center",
                        }}
                      >
                        <div style={{ fontSize: "1.4rem", lineHeight: 1 }}>{m.icon}</div>
                        <div style={{ fontSize: "0.86rem", fontWeight: 700, marginTop: 8 }}>{m.name}</div>
                        <div style={{ fontSize: "0.68rem", color: "rgba(201,168,76,0.6)", letterSpacing: "0.08em", marginTop: 3 }}>{m.sub}</div>
                        <div style={{ fontSize: "0.72rem", color: "rgba(200,175,140,0.55)", lineHeight: 1.6, marginTop: 8 }}>{m.desc}</div>
                      </button>
                    );
                  })}
                </div>

                {/* 抽石按钮 */}
                <button
                  onClick={handleCast}
                  style={{
                    width: "100%", padding: "15px 24px", borderRadius: 16, cursor: "pointer",
                    background: "linear-gradient(135deg, rgba(201,168,76,0.3), rgba(201,168,76,0.12), rgba(201,168,76,0.3))",
                    border: "1px solid rgba(201,168,76,0.5)",
                    color: "#e8d5a3", fontSize: "1rem", fontWeight: 700,
                    fontFamily: "var(--font-cinzel), serif", letterSpacing: "0.06em",
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{ marginRight: 8 }}>💎</span>{o.castBtn}
                </button>

                <p style={{
                  fontSize: "0.72rem", color: "rgba(200,175,140,0.45)",
                  textAlign: "center", margin: "14px 0 0", lineHeight: 1.7,
                }}>{ui.disclaimer}</p>
              </div>
            </>
          )}

          {/* 步骤：感应中（洗牌动画） */}
          {step === "casting" && (
            <div style={{
              maxWidth: 720, width: "100%", borderRadius: 16, padding: "48px 24px",
              background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.22)",
              textAlign: "center",
            }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 18, marginBottom: 18 }}>
                {castEmojis.map((s, i) => (
                  <span
                    key={i}
                    className="cr-cast-symbol"
                    style={{
                      fontSize: "2rem",
                      filter: "drop-shadow(0 0 12px rgba(201,168,76,0.7))",
                      animationDelay: `${i * 0.12}s`,
                    }}
                  >{s}</span>
                ))}
              </div>
              <p style={{ fontSize: "0.82rem", color: "rgba(220,205,175,0.7)", letterSpacing: "0.06em" }}>
                {o.castingText}
              </p>
            </div>
          )}

          {/* 步骤：结果（翻石揭晓） */}
          {step === "result" && draw && (
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* 模式徽标 + 问题回显 */}
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{
                  display: "inline-block", padding: "6px 18px", borderRadius: 20,
                  background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)",
                  fontFamily: "var(--font-cinzel), serif", fontSize: "0.85rem",
                  color: "#e8d5a3", letterSpacing: "0.06em",
                }}>{draw.mode === "single" ? o.badgeSingle : o.badgeThree}</div>
                {question.trim() && (
                  <p style={{ fontSize: "0.82rem", color: "rgba(200,175,140,0.65)", margin: "10px 0 0" }}>
                    {o.yourQuestion}：{question.trim()}
                  </p>
                )}
              </div>

              {/* 石面（翻开前为石背） */}
              <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
                {draw.stones.map((entry, i) => {
                  const pos = draw.mode === "three" ? o.positions[i] : null;
                  return (
                    <div key={`${entry.intentionId}:${entry.stone.id}`} className="cr-stone-wrapper" style={{ animationDelay: `${i * 0.15}s` }}>
                      {pos && (
                        <div className="cr-position-label">
                          <span>{pos.icon}</span>
                          <span>{pos.label}</span>
                        </div>
                      )}
                      <div
                        className={`cr-stone-scene ${revealed ? "cr-stone-flipped" : ""}`}
                        onClick={() => setRevealed(true)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setRevealed(true); }}
                        style={{ cursor: revealed ? "default" : "pointer" }}
                        aria-label={o.flipHint}
                      >
                        {/* 正面：水晶 */}
                        <div
                          className="cr-stone-face cr-stone-front cr-stone-glow"
                          style={{
                            ["--cr-color" as string]: `${entry.stone.color}88`,
                            ["--cr-color2" as string]: entry.stone.color,
                            borderColor: `${entry.stone.color}55`,
                            transitionDelay: revealed ? `${i * 0.35}s` : "0s",
                            animationDelay: `${i * 0.35 + 0.7}s`,
                          }}
                        >
                          <span style={{
                            fontSize: 44, lineHeight: 1,
                            filter: `drop-shadow(0 0 14px ${entry.stone.color})`,
                          }}>{entry.stone.emoji}</span>
                        </div>
                        {/* 背面：未知 */}
                        <div
                          className="cr-stone-face cr-stone-back"
                          style={{ transitionDelay: revealed ? `${i * 0.35}s` : "0s" }}
                        >
                          <div className="cr-back-ripple" />
                          <span className="cr-back-symbol">✦</span>
                          <span className="cr-back-hint">{o.flipHint}</span>
                        </div>
                      </div>
                      {/* 翻开后显示水晶名 */}
                      {revealed && (
                        <div style={{
                          marginTop: 12, textAlign: "center",
                          animation: "crFadeInUp 0.4s ease-out both",
                          animationDelay: `${i * 0.35 + 0.5}s`,
                        }}>
                          <div style={{
                            fontFamily: "var(--font-cinzel), serif",
                            fontSize: "1rem", fontWeight: 700, color: entry.stone.color,
                          }}>{entry.stone.name[locale]}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!revealed && (
                <p className="cr-reveal-hint">
                  {draw.mode === "single" ? o.revealHintSingle : o.revealHintThree}
                </p>
              )}

              {/* 揭晓后的解读卡 */}
              {revealed && (
                <div style={{
                  width: "100%", maxWidth: 720, marginTop: 28,
                  display: "flex", flexDirection: "column", gap: 14,
                }}>
                  {draw.stones.map((entry, i) => {
                    const pos = draw.mode === "three" ? o.positions[i] : null;
                    return (
                      <div
                        key={`${entry.intentionId}:${entry.stone.id}:detail`}
                        className="cr-detail-card"
                        style={{
                          animationDelay: `${i * 0.25}s`,
                          background: "rgba(16,10,38,0.7)",
                          border: `1px solid ${entry.stone.color}40`,
                          borderRadius: 14, padding: "18px 20px",
                          boxShadow: `0 0 24px ${entry.stone.color}12`,
                        }}
                      >
                        {/* 位置（三石阵） */}
                        {pos && (
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                            <span style={{ fontSize: "1.1rem" }}>{pos.icon}</span>
                            <div>
                              <div style={{
                                fontFamily: "var(--font-cinzel), serif", fontSize: "0.9rem",
                                color: "#e8d5a3", letterSpacing: "0.05em",
                              }}>{pos.label}</div>
                              <div style={{ fontSize: "0.72rem", color: "rgba(200,175,140,0.55)", marginTop: 2 }}>{pos.desc}</div>
                            </div>
                          </div>
                        )}
                        {/* 水晶名 + 所属领域 */}
                        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
                          <span style={{ fontSize: 24 }}>{entry.stone.emoji}</span>
                          <span style={{
                            fontFamily: "var(--font-cinzel), serif",
                            fontSize: "1.05rem", color: entry.stone.color, letterSpacing: "0.04em",
                          }}>{entry.stone.name[locale]}</span>
                          <span style={{
                            fontSize: "0.68rem", padding: "3px 10px", borderRadius: 12,
                            background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)",
                            color: "rgba(220,205,175,0.75)",
                          }}>{o.domainLabel} · {entry.intentionEmoji} {entry.intentionLabel[locale]}</span>
                        </div>
                        {/* 神谕讯息 */}
                        <div style={{ marginBottom: 12 }}>
                          <div style={{
                            fontSize: "0.68rem", color: "rgba(201,168,76,0.6)",
                            letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4,
                          }}>{o.oracleLabel}</div>
                          <p style={{
                            fontSize: "0.9rem", color: "rgba(232,213,163,0.9)", lineHeight: 1.8,
                            margin: 0, fontStyle: "italic",
                          }}>{entry.oracle[locale]}</p>
                        </div>
                        {/* 为什么选它 */}
                        <div style={{ marginBottom: 12 }}>
                          <div style={{
                            fontSize: "0.68rem", color: "rgba(201,168,76,0.6)",
                            letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4,
                          }}>{ui.whyLabel}</div>
                          <p style={{ fontSize: "0.84rem", color: "rgba(220,205,175,0.8)", lineHeight: 1.75, margin: 0 }}>
                            {entry.stone.why[locale]}
                          </p>
                        </div>
                        {/* 怎么用 */}
                        <div style={{ borderTop: `1px solid ${entry.stone.color}22`, paddingTop: 10 }}>
                          <div style={{
                            fontSize: "0.68rem", color: "rgba(201,168,76,0.6)",
                            letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4,
                          }}>{ui.howToUseLabel}</div>
                          <p style={{ fontSize: "0.84rem", color: "rgba(200,175,140,0.72)", lineHeight: 1.75, margin: 0 }}>
                            {entry.stone.howToUse[locale]}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  {/* 操作：复制结果 / 再抽一次 */}
                  <div style={{
                    display: "flex", flexDirection: "column", gap: 12,
                    marginTop: 10, maxWidth: 480, width: "100%", alignSelf: "center",
                  }}>
                    <button
                      onClick={handleCopy}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                        padding: "14px 24px", borderRadius: 16, cursor: "pointer",
                        background: "linear-gradient(135deg, rgba(201,168,76,0.28), rgba(201,168,76,0.1))",
                        border: "1px solid rgba(201,168,76,0.45)",
                        color: "#e8d5a3", fontSize: "0.95rem", fontWeight: 700,
                        fontFamily: "var(--font-cinzel), serif", letterSpacing: "0.04em",
                      }}
                    >{copied ? o.copied : o.copyResult}</button>
                    <button
                      onClick={handleAgain}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        padding: "13px 24px", borderRadius: 16, cursor: "pointer",
                        background: "rgba(12,10,30,0.7)",
                        border: "1px solid rgba(201,168,76,0.2)",
                        color: "rgba(201,168,76,0.7)", fontSize: "0.92rem",
                      }}
                    >{o.again}</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ══════════ 按需求选石（浏览模式） ══════════ */}
      {tab === "browse" && (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                <div style={{ borderTop: `1px solid ${stone.color}22`, paddingTop: 10 }}>
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

          {/* 延伸阅读 */}
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
