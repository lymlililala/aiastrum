"use client";

import { useState, useRef, useEffect } from "react";
import "./daily-fortune.css";
import type { DailyFortuneInput, DailyFortuneResult } from "./daily-fortune-engine";
import { buildDailyFortuneResult } from "./daily-fortune-engine";

type Phase = "input" | "loading" | "result";

export default function DailyFortunePage() {
  const [phase, setPhase] = useState<Phase>("input");
  const [result, setResult] = useState<DailyFortuneResult | null>(null);
  const [showPoster, setShowPoster] = useState(false);
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("1995");
  const [birthMonth, setBirthMonth] = useState("8");
  const [birthDay, setBirthDay] = useState("15");

  // 从 localStorage 读取缓存
  useEffect(() => {
    const saved = localStorage.getItem("df_birth");
    if (saved) {
      try {
        const p = JSON.parse(saved) as DailyFortuneInput;
        setBirthYear(String(p.birthYear));
        setBirthMonth(String(p.birthMonth));
        setBirthDay(String(p.birthDay));
        setName(p.name ?? "");
      } catch { /* ignore */ }
    }
  }, []);

  const handleSubmit = () => {
    const y = parseInt(birthYear);
    const m = parseInt(birthMonth);
    const d = parseInt(birthDay);
    if (!y || !m || !d || y < 1900 || y > 2099 || m < 1 || m > 12 || d < 1 || d > 31) return;
    const input: DailyFortuneInput = { birthYear: y, birthMonth: m, birthDay: d, name: name.trim() || undefined };
    localStorage.setItem("df_birth", JSON.stringify(input));
    setPhase("loading");
    setTimeout(() => {
      setResult(buildDailyFortuneResult(input));
      setPhase("result");
    }, 2000);
  };

  return (
    <div className="df-page">
      {/* 返回首页 */}
      <a href="/" style={{
        position: "fixed", top: 16, left: 16, zIndex: 200,
        display: "flex", alignItems: "center", gap: 6,
        padding: "6px 14px", borderRadius: 20,
        background: "rgba(10,6,28,0.75)", backdropFilter: "blur(10px)",
        border: "1px solid rgba(201,168,76,0.25)",
        color: "rgba(201,168,76,0.85)", fontSize: "0.8rem",
        textDecoration: "none", letterSpacing: "0.06em",
        transition: "all 0.18s",
      }}>← 返回</a>

      <div className="df-hero">
        <div className="df-hero-bg" />
        <div className="df-hero-tag">Daily Fortune · 每日开运</div>
        <h1 className="df-hero-title">今日专属开运指南</h1>
        {result && (
          <>
            <p className="df-hero-date">{result.date}</p>
            <p className="df-hero-lunar">{result.lunarDate} · 日柱 {result.heavenlyStem}{result.earthlyBranch}</p>
          </>
        )}
      </div>

      <div className="df-content">
        {phase === "input" && (
          <div className="df-form df-fade-in">
            <p className="df-form-title">✨ 输入你的出生信息，获取今日专属开运建议</p>
            <div className="df-field df-field-full">
              <label className="df-label">你的昵称（选填）</label>
              <input
                className="df-input"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="如：小月"
                maxLength={10}
              />
            </div>
            <div className="df-form-grid">
              <div className="df-field">
                <label className="df-label">出生年</label>
                <input
                  className="df-input"
                  value={birthYear}
                  onChange={e => setBirthYear(e.target.value)}
                  placeholder="1995"
                  type="number"
                  min="1900"
                  max="2099"
                />
              </div>
              <div className="df-field">
                <label className="df-label">月</label>
                <input
                  className="df-input"
                  value={birthMonth}
                  onChange={e => setBirthMonth(e.target.value)}
                  placeholder="8"
                  type="number"
                  min="1"
                  max="12"
                />
              </div>
              <div className="df-field">
                <label className="df-label">日</label>
                <input
                  className="df-input"
                  value={birthDay}
                  onChange={e => setBirthDay(e.target.value)}
                  placeholder="15"
                  type="number"
                  min="1"
                  max="31"
                />
              </div>
            </div>
            <button className="df-submit-btn" onClick={handleSubmit}>
              🌟 生成我的今日开运指南
            </button>
          </div>
        )}

        {phase === "loading" && (
          <div className="df-loading df-fade-in">
            <div className="df-loading-spinner" />
            <p className="df-loading-text">正在推算今日五行能量…</p>
            <p style={{ fontSize: "0.8rem", color: "rgba(240,200,120,0.35)" }}>
              日柱天干 × 本命五行 × 今日运势
            </p>
          </div>
        )}

        {phase === "result" && result && (
          <FortuneResult
            result={result}
            onReset={() => { setPhase("input"); setResult(null); }}
            onShowPoster={() => setShowPoster(true)}
          />
        )}
      </div>

      {showPoster && result && (
        <FortunePoster result={result} onClose={() => setShowPoster(false)} />
      )}
    </div>
  );
}

// ===== 结果组件 =====
function FortuneResult({
  result,
  onReset,
  onShowPoster,
}: {
  result: DailyFortuneResult;
  onReset: () => void;
  onShowPoster: () => void;
}) {
  const scoreColor = (s: number) => s >= 80 ? "#FFD700" : s >= 60 ? "#C9A84C" : "#8090A8";

  return (
    <div className="df-result df-fade-in">
      {/* 总览卡 */}
      <div className="df-overview-card">
        <div className="df-overview-head">
          <div className="df-element-badge">
            <span>{result.elementEmoji}</span>
            <span className="df-element-label">{result.element}命</span>
          </div>
          <div className="df-overview-info">
            <div className="df-day-pillar">{result.heavenlyStem}{result.earthlyBranch}日</div>
            <div className="df-day-sub">今日五行：{result.dayElement} · {result.lunarDate}</div>
          </div>
          <div className="df-overall-score">
            <div className="df-score-num" style={{ color: scoreColor(result.overallScore) }}>
              {result.overallScore}
            </div>
            <div className="df-score-label">今日总运</div>
          </div>
        </div>

        <div className="df-scores-grid">
          {[
            { name: "💕 感情运", score: result.loveScore },
            { name: "💼 事业运", score: result.careerScore },
            { name: "💰 财运", score: result.wealthScore },
            { name: "🌿 健康运", score: result.healthScore },
          ].map(({ name, score }) => (
            <div className="df-score-item" key={name}>
              <div className="df-score-header">
                <span className="df-score-name">{name}</span>
                <span className="df-score-val" style={{ color: scoreColor(score) }}>{score}</span>
              </div>
              <div className="df-score-bar">
                <div className="df-score-fill" style={{ width: `${score}%`, background: `linear-gradient(90deg, ${scoreColor(score)}88, ${scoreColor(score)})` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 幸运要素 */}
      <div className="df-lucky-card">
        <div className="df-card-title">✨ 今日幸运要素</div>
        <div className="df-lucky-grid">
          <div className="df-lucky-item">
            <div className="df-lucky-emoji">{result.luckyColorEmoji}</div>
            <div className="df-lucky-label">幸运色</div>
            <div className="df-lucky-value">{result.luckyColor}</div>
          </div>
          <div className="df-lucky-item">
            <div className="df-lucky-emoji">🔢</div>
            <div className="df-lucky-label">幸运数字</div>
            <div className="df-lucky-value">{result.luckyNumbers.join(" · ")}</div>
          </div>
          <div className="df-lucky-item">
            <div className="df-lucky-emoji">{result.luckyDirectionEmoji}</div>
            <div className="df-lucky-label">幸运方位</div>
            <div className="df-lucky-value">{result.luckyDirection}</div>
          </div>
          <div className="df-lucky-item">
            <div className="df-lucky-emoji">🍽️</div>
            <div className="df-lucky-label">开运食物</div>
            <div className="df-lucky-value">{result.luckyFood}</div>
          </div>
          <div className="df-lucky-item">
            <div className="df-lucky-emoji">⏰</div>
            <div className="df-lucky-label">开运时辰</div>
            <div className="df-lucky-value" style={{ fontSize: "0.72rem" }}>{result.luckyTime}</div>
          </div>
          <div className="df-lucky-item">
            <div className="df-lucky-emoji">💎</div>
            <div className="df-lucky-label">开运配饰</div>
            <div className="df-lucky-value" style={{ fontSize: "0.72rem" }}>{result.accessory}</div>
          </div>
        </div>
      </div>

      {/* 穿搭建议 */}
      <div className="df-outfit-card">
        <div className="df-card-title">👗 今日开运穿搭</div>
        <div className="df-color-strip">
          <div
            className="df-color-dot"
            style={{ backgroundColor: result.luckyColorHex, ["--color" as string]: result.luckyColorHex }}
          />
          <div className="df-color-info">
            <div className="df-color-name">{result.luckyColor}</div>
            <div className="df-color-sub">今日幸运色</div>
          </div>
          <div className="df-avoid-color">避{result.avoidColor}</div>
        </div>
        <p className="df-outfit-text">{result.outfit}</p>
        <div className="df-accessory">💎 配饰加持：{result.accessory}</div>
      </div>

      {/* 晨间仪式 & 咒语 */}
      <div className="df-ritual-card">
        <div className="df-card-title">🌅 晨间开运仪式</div>
        <p className="df-ritual-text">{result.morningRitual}</p>
        <div className="df-mantra-box">&ldquo;{result.dailyMantra}&rdquo;</div>
      </div>

      {/* 今日禁忌 */}
      <div className="df-avoid-card">
        <div className="df-card-title">⚠️ 今日禁忌</div>
        <div className="df-avoid-list">
          {result.avoidList.map((item, i) => (
            <div className="df-avoid-item" key={i}>
              <div className="df-avoid-dot" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 祝福语 */}
      <div className="df-blessing-card">
        <p className="df-blessing-text">{result.blessingWord}</p>
      </div>

      {/* 操作 */}
      <div className="df-actions">
        <button className="df-poster-btn" onClick={onShowPoster}>
          🌟 生成今日开运海报
        </button>
        <button className="df-reset-btn" onClick={onReset}>
          ↺ 更换信息重新测算
        </button>
      </div>
    </div>
  );
}

// ===== 海报组件 =====
function FortunePoster({ result, onClose }: { result: DailyFortuneResult; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 360;
    const H = 640;
    canvas.width = W;
    canvas.height = H;

    // 背景
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#0a0518");
    bg.addColorStop(0.5, "#0d0920");
    bg.addColorStop(1, "#080614");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // 光晕
    const glow = ctx.createRadialGradient(W / 2, 60, 0, W / 2, 60, 180);
    glow.addColorStop(0, "rgba(240,165,0,0.15)");
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // 标题
    ctx.font = "bold 14px serif";
    ctx.fillStyle = "rgba(240,165,0,0.6)";
    ctx.textAlign = "center";
    ctx.fillText("✦  今日专属开运指南  ✦", W / 2, 48);

    ctx.font = "bold 28px serif";
    const titleGrad = ctx.createLinearGradient(0, 0, W, 0);
    titleGrad.addColorStop(0, "#FFD700");
    titleGrad.addColorStop(1, "#F0A500");
    ctx.fillStyle = titleGrad;
    ctx.fillText("五行开运日", W / 2, 88);

    // 日期
    ctx.font = "13px sans-serif";
    ctx.fillStyle = "rgba(240,200,120,0.55)";
    ctx.fillText(result.date, W / 2, 114);
    ctx.fillText(result.lunarDate + " · " + result.heavenlyStem + result.earthlyBranch + "日", W / 2, 132);

    // 分割线
    ctx.strokeStyle = "rgba(240,165,0,0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 148);
    ctx.lineTo(W - 40, 148);
    ctx.stroke();

    // 今日总运
    ctx.font = "bold 56px serif";
    const scoreColor = result.overallScore >= 80 ? "#FFD700" : result.overallScore >= 60 ? "#C9A84C" : "#8090A8";
    ctx.fillStyle = scoreColor;
    ctx.fillText(String(result.overallScore), W / 2, 218);
    ctx.font = "13px sans-serif";
    ctx.fillStyle = "rgba(240,200,120,0.5)";
    ctx.fillText("今日总运指数", W / 2, 240);

    // 四维运势
    const scores = [
      { name: "感情运", score: result.loveScore },
      { name: "事业运", score: result.careerScore },
      { name: "财运", score: result.wealthScore },
      { name: "健康运", score: result.healthScore },
    ];
    const barY = 260;
    scores.forEach((s, i) => {
      const x = 40 + (i % 2) * 145;
      const y = barY + Math.floor(i / 2) * 40;
      ctx.font = "11px sans-serif";
      ctx.fillStyle = "rgba(240,200,120,0.6)";
      ctx.textAlign = "left";
      ctx.fillText(s.name, x, y + 12);
      ctx.fillStyle = scoreColor;
      ctx.textAlign = "right";
      ctx.fillText(String(s.score), x + 130, y + 12);
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.beginPath();
      if (ctx.roundRect) { ctx.roundRect(x, y + 18, 130, 4, 2); } else { ctx.rect(x, y + 18, 130, 4); }
      ctx.fill();
      const barGrad = ctx.createLinearGradient(x, 0, x + s.score * 1.3, 0);
      barGrad.addColorStop(0, "rgba(201,168,76,0.8)");
      barGrad.addColorStop(1, "#FFD700");
      ctx.fillStyle = barGrad;
      ctx.fillRect(x, y + 18, s.score * 1.3, 4);
    });

    // 幸运要素区
    ctx.textAlign = "center";
    const elemY = 360;
    ctx.fillStyle = "rgba(240,165,0,0.08)";
    ctx.strokeStyle = "rgba(240,165,0,0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    if (ctx.roundRect) { ctx.roundRect(24, elemY, W - 48, 130, 14); } else { ctx.rect(24, elemY, W - 48, 130); }
    ctx.fill();
    ctx.stroke();

    ctx.font = "11px sans-serif";
    ctx.fillStyle = "rgba(240,165,0,0.7)";
    ctx.fillText("✨ 今日幸运要素", W / 2, elemY + 20);

    const items = [
      { label: "幸运色", value: result.luckyColor, emoji: result.luckyColorEmoji },
      { label: "幸运数字", value: result.luckyNumbers.join("·"), emoji: "🔢" },
      { label: "幸运方位", value: result.luckyDirection, emoji: result.luckyDirectionEmoji },
      { label: "开运食物", value: result.luckyFood, emoji: "🍽️" },
      { label: "开运时辰", value: result.luckyTime.split("(")[0] ?? "", emoji: "⏰" },
      { label: "开运配饰", value: result.accessory.split("、")[0] ?? result.accessory, emoji: "💎" },
    ];
    items.forEach((item, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const ix = 50 + col * 90;
      const iy = elemY + 44 + row * 50;
      ctx.font = "18px sans-serif";
      ctx.fillStyle = "#fff";
      ctx.fillText(item.emoji, ix, iy);
      ctx.font = "9px sans-serif";
      ctx.fillStyle = "rgba(240,200,120,0.45)";
      ctx.fillText(item.label, ix, iy + 14);
      ctx.font = "bold 11px serif";
      ctx.fillStyle = "#e8d5a3";
      ctx.fillText(item.value.slice(0, 5), ix, iy + 26);
    });

    // 咒语
    const mantY = 510;
    ctx.font = "13px serif";
    ctx.fillStyle = "rgba(255,215,0,0.8)";
    const mantraText = result.dailyMantra.length > 20 ? result.dailyMantra.slice(0, 20) + "…" : result.dailyMantra;
    ctx.fillText(`"${mantraText}"`, W / 2, mantY);

    // 底部
    ctx.font = "11px sans-serif";
    ctx.fillStyle = "rgba(240,200,120,0.3)";
    ctx.fillText("命运密语 · 每日开运指南", W / 2, H - 24);
  }, [result]);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `今日开运指南_${new Date().toLocaleDateString("zh-CN").replace(/\//g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="df-poster-overlay" onClick={onClose}>
      <div className="df-poster-wrap" onClick={e => e.stopPropagation()}>
        <canvas ref={canvasRef} className="df-poster-canvas" />
        <div className="df-poster-actions">
          <button className="df-poster-save" onClick={handleSave}>📥 保存海报</button>
          <button className="df-poster-close" onClick={onClose}>关闭</button>
        </div>
      </div>
    </div>
  );
}
