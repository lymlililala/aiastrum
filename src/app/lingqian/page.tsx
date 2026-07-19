"use client";
import React, { useState, useEffect } from "react";
import { Deity, Sign } from "./lingqian-data";
import {
  drawSign,
  getDailyZen,
  getTodayDrawn,
  saveTodayDrawn,
  getCheckinState,
  localizeSign,
  localizeDeity,
} from "./lingqian-engine";
import DeitySelect from "./components/DeitySelect";
import ShakeSign from "./components/ShakeSign";
import JiaoGua from "./components/JiaoGua";
import SignResult from "./components/SignResult";
import SharePoster from "./components/SharePoster";
import CheckinRecord from "./components/CheckinRecord";
import { useLocale } from "~/lib/useLocale";
import { LangSwitcher } from "../components/LangSwitcher";
import { T, type Lang } from "./lingqian-i18n";

// 用户求签流程状态机
type FlowStep =
  | "select"      // 1. 选择神明
  | "shake"       // 2. 摇签
  | "jiao"        // 3. 掷筊确认
  | "result"      // 4. 查看签文
  | "poster";     // 5. 海报分享（覆盖层）

export default function LingQianPage() {
  const lang = useLocale() as Lang;
  const t = T[lang];

  const [step, setStep] = useState<FlowStep>("select");
  const [selectedDeity, setSelectedDeity] = useState<Deity | null>(null);
  const [currentSign, setCurrentSign] = useState<Sign | null>(null);
  const [dailyZen, setDailyZen] = useState("");
  const [showRecord, setShowRecord] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [streakDays, setStreakDays] = useState(0);

  useEffect(() => {
    setDailyZen(getDailyZen(lang));
    const state = getCheckinState();
    setStreakDays(state.streakDays);
  }, [lang]);

  // 处理神明选择（state 保存原始 zh 对象，渲染时再本地化）
  const handleDeitySelect = (deity: Deity) => {
    setSelectedDeity(deity);

    // 检查今天是否已经抽过这个神明的签
    const todayDrawn = getTodayDrawn(deity.id);
    if (todayDrawn.drawn && todayDrawn.signId != null) {
      const sign = deity.signs.find((s) => s.id === todayDrawn.signId);
      if (sign) {
        setCurrentSign(sign);
        setCheckedIn(true);
        setStep("result");
        return;
      }
    }
    setStep("shake");
  };

  // 摇签完成 -> 进入掷筊
  const handleShakeComplete = () => {
    if (!selectedDeity) return;
    const sign = drawSign(selectedDeity.id);
    setCurrentSign(sign);
    setStep("jiao");
  };

  // 掷筊确认 -> 进入结果页
  const handleJiaoConfirmed = () => {
    if (!selectedDeity || !currentSign) return;
    saveTodayDrawn(selectedDeity.id, currentSign.id);
    setStep("result");
  };

  // 签文页打卡回调
  const handleCheckin = () => {
    setCheckedIn(true);
    const state = getCheckinState();
    setStreakDays(state.streakDays);
  };

  // 重新选择神明
  const handleDrawAgain = () => {
    setSelectedDeity(null);
    setCurrentSign(null);
    setCheckedIn(false);
    setStep("select");
  };

  // 渲染期本地化（override 为空时回退中文；id 等数据键保持不变）
  const localizedDeity = selectedDeity ? localizeDeity(selectedDeity, lang) : null;
  const localizedSign =
    selectedDeity && currentSign ? localizeSign(currentSign, selectedDeity.id, lang) : null;

  return (
    <div className="lq-page">
      {/* SEO H1 — 视觉隐藏，搜索引擎可读 */}
      <h1 style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
        {t.seoTitle}
      </h1>
      {/* 顶部导航栏 */}
      <nav className="lq-nav">
        <div className="lq-nav-left">
          {step === "select" ? (
            <a href="/" style={{
              display: "flex", alignItems: "center", gap: 4,
              padding: "4px 10px", borderRadius: 16,
              background: "rgba(10,6,28,0.6)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(201,168,76,0.2)",
              color: "rgba(201,168,76,0.8)", fontSize: "0.78rem",
              textDecoration: "none",
            }}>{t.navBack}</a>
          ) : (
            <button
              className="lq-nav-back"
              onClick={() => {
                if (step === "shake") setStep("select");
                else if (step === "jiao") setStep("shake");
                else if (step === "result") setStep("select");
              }}
            >
              ←
            </button>
          )}
        </div>
        <div className="lq-nav-right" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* 连续打卡天数 */}
          {streakDays > 0 && (
            <div className="lq-nav-streak">
              <span className="lq-streak-fire">🔥</span>
              <span className="lq-streak-num">{streakDays}</span>
            </div>
          )}
          <button
            className="lq-nav-record-btn"
            onClick={() => setShowRecord(true)}
            title={t.navRecordTitle}
          >
            📅
          </button>
          <LangSwitcher />
        </div>
      </nav>

      {/* 步骤指示器（shake/jiao阶段显示） */}
      {(step === "shake" || step === "jiao") && (
        <div className="lq-steps-indicator">
          <div className={`lq-step-dot ${step === "shake" ? "lq-step-active" : "lq-step-done"}`}>
            <span>1</span>
          </div>
          <div className="lq-step-line" />
          <div className={`lq-step-dot ${step === "jiao" ? "lq-step-active" : ""}`}>
            <span>2</span>
          </div>
          <div className="lq-step-line" />
          <div className="lq-step-dot">
            <span>3</span>
          </div>
        </div>
      )}

      {/* 主内容区 */}
      <main className="lq-main">
        {step === "select" && (
          <DeitySelect onSelect={handleDeitySelect} dailyZen={dailyZen} t={t} lang={lang} />
        )}

        {step === "shake" && localizedDeity && (
          <ShakeSign
            deity={localizedDeity}
            onShakeComplete={handleShakeComplete}
            onBack={() => setStep("select")}
            t={t}
          />
        )}

        {step === "jiao" && localizedDeity && (
          <JiaoGua
            deity={localizedDeity}
            onConfirmed={handleJiaoConfirmed}
            maxAttempts={3}
            t={t}
            lang={lang}
          />
        )}

        {step === "result" && localizedDeity && localizedSign && (
          <SignResult
            sign={localizedSign}
            deity={localizedDeity}
            onShare={() => setStep("poster")}
            onCheckin={handleCheckin}
            onDrawAgain={handleDrawAgain}
            alreadyCheckedIn={checkedIn}
            t={t}
            lang={lang}
          />
        )}

        {step === "poster" && localizedDeity && localizedSign && (
          <>
            {/* 底层仍然显示结果页 */}
            <SignResult
              sign={localizedSign}
              deity={localizedDeity}
              onShare={() => setStep("poster")}
              onCheckin={handleCheckin}
              onDrawAgain={handleDrawAgain}
              alreadyCheckedIn={checkedIn}
              t={t}
              lang={lang}
            />
            {/* 海报弹窗覆盖 */}
            <SharePoster
              sign={localizedSign}
              deity={localizedDeity}
              onClose={() => setStep("result")}
              t={t}
              lang={lang}
            />
          </>
        )}
      </main>

      {/* ── 新手引导：怎么求签（仅在选神入口显示，首次进入也能看懂流程） ── */}
      {step === "select" && (
        <div style={{
          margin: "8px auto 0", maxWidth: 480, width: "calc(100% - 32px)",
          background: "rgba(16,10,38,0.7)", border: "1px solid rgba(201,168,76,0.22)",
          borderRadius: 14, padding: "18px 20px", textAlign: "left", boxSizing: "border-box",
        }}>
          <div style={{
            fontFamily: "var(--font-cinzel), serif", fontSize: "0.95rem",
            color: "#e8d5a3", letterSpacing: "0.06em", marginBottom: 12,
          }}>{t.howToTitle}</div>
          <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {t.howToSteps.map((s, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{
                  flexShrink: 0, width: 22, height: 22, borderRadius: "50%",
                  border: "1px solid rgba(201,168,76,0.55)", color: "#c9a84c",
                  fontSize: "0.72rem", display: "inline-flex", alignItems: "center", justifyContent: "center",
                  marginTop: 1,
                }}>{i + 1}</span>
                <span style={{ fontSize: "0.85rem", color: "rgba(220,205,175,0.8)", lineHeight: 1.7 }}>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* ── SEO 内容区 + FAQ（SSR 输出，爬虫可读） ── */}
      <section style={{ maxWidth: 720, margin: "40px auto 0", padding: "0 16px 32px", textAlign: "left", boxSizing: "border-box" }}>
        {t.seoSections.map((sec) => (
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
        }}>{t.faqTitle}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {t.faq.map((f) => (
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

      {/* 打卡记录弹窗 */}
      {showRecord && (
        <CheckinRecord onClose={() => setShowRecord(false)} t={t} lang={lang} />
      )}
    </div>
  );
}
