"use client";

import type { LoveReport } from "../love-data";

interface LoveFreeResultProps {
  report: LoveReport;
  onUnlock: () => void;
  onReset: () => void;
}

function StarRating({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="love-stars-row">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={`love-star-dot ${i < value ? "love-star-filled" : ""}`}>
          ✦
        </span>
      ))}
    </div>
  );
}

// 圆形评分仪表盘
function ScoreDial({ score, label, color }: { score: number; label: string; color: string }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (score / 100) * circumference;

  return (
    <div className="love-score-dial-wrap">
      <svg viewBox="0 0 128 128" className="love-score-dial-svg">
        {/* 背景轨道 */}
        <circle
          cx="64" cy="64" r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="10"
        />
        {/* 进度弧 */}
        <circle
          cx="64" cy="64" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${strokeDash} ${circumference - strokeDash}`}
          strokeDashoffset={circumference * 0.25}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="love-score-dial-text">
        <div className="love-score-number" style={{ color }}>{score}</div>
        <div className="love-score-unit">分</div>
      </div>
      <div className="love-score-label" style={{ color }}>{label}</div>
    </div>
  );
}

export default function LoveFreeResult({ report, onUnlock, onReset }: LoveFreeResultProps) {
  const { score, zodiac, personalityTrait, yearGanzhi } = report;

  return (
    <div className="love-result-page">
      {/* 顶部吉凶标题 */}
      <div className="love-result-header">
        <div className="love-result-header-bg" />
        <div className="love-result-header-content">
          <div className="love-result-badge" style={{ color: score.labelColor, borderColor: score.labelColor }}>
            ✦ {score.label}
          </div>
          <h1 className="love-result-title">
            {report.name} 的姻缘报告
          </h1>
          <p className="love-result-zodiac">
            {zodiac.symbol} {zodiac.name} · {yearGanzhi.gan}{yearGanzhi.zhi}年生
          </p>
        </div>
      </div>

      {/* 评分区域 */}
      <div className="love-score-section">
        <ScoreDial score={score.overall} label={score.label} color={score.labelColor} />

        <div className="love-score-detail-grid">
          {[
            { label: "桃花指数", value: score.peach },
            { label: "时机指数", value: score.timing },
            { label: "深度缘分", value: score.depth },
          ].map(item => (
            <div key={item.label} className="love-score-detail-item">
              <div className="love-score-detail-label">{item.label}</div>
              <StarRating value={item.value} />
            </div>
          ))}
        </div>
      </div>

      {/* 一句话短评 */}
      <div className="love-short-comment">
        <div className="love-short-comment-icon">✦</div>
        <p>{score.shortComment}</p>
      </div>

      {/* 性格特质（免费可见） */}
      <div className="love-free-section">
        <div className="love-section-title">
          <span className="love-section-icon">🌙</span>
          你的感情特质
        </div>
        <p className="love-personality-text">{personalityTrait}</p>
        <div className="love-trait-tags">
          {zodiac.traits.map(t => (
            <span key={t} className="love-trait-tag">{t}</span>
          ))}
        </div>
      </div>

      {/* 星座恋爱风格（免费可见） */}
      <div className="love-free-section">
        <div className="love-section-title">
          <span className="love-section-icon">{zodiac.symbol}</span>
          {zodiac.name}的爱情风格
        </div>
        <p className="love-love-style">{zodiac.loveStyle}</p>
      </div>

      {/* 模糊遮挡的付费内容预览 */}
      <div className="love-locked-preview">
        <div className="love-section-title">
          <span className="love-section-icon">🔮</span>
          命中正缘画像
        </div>
        <div className="love-blur-content">
          <div className="love-blur-line love-blur-line-long" />
          <div className="love-blur-line love-blur-line-mid" />
          <div className="love-blur-line love-blur-line-short" />
          <div className="love-blur-line love-blur-line-mid" />
        </div>

        <div className="love-section-title" style={{ marginTop: "1.5rem" }}>
          <span className="love-section-icon">🌸</span>
          近期3个月桃花运势
        </div>
        <div className="love-blur-content">
          <div className="love-blur-line love-blur-line-long" />
          <div className="love-blur-line love-blur-line-mid" />
          <div className="love-blur-line love-blur-line-long" />
        </div>

        {/* 遮罩层 */}
        <div className="love-lock-overlay">
          <div className="love-lock-icon">🔒</div>
          <p className="love-lock-title">完整深度报告已生成</p>
          <p className="love-lock-desc">
            解锁查看：正缘特征全貌 · 相遇时机 · 近3月桃花预报 · 专属情感建议
          </p>
        </div>
      </div>

      {/* 付费 CTA */}
      <div className="love-cta-section">
        <div className="love-cta-price-hint">
          <span className="love-cta-users">已有 <strong>10W+</strong> 人解锁完整报告</span>
        </div>

        <button onClick={onUnlock} className="love-cta-btn">
          <span className="love-cta-price">¥9.9</span>
          <span className="love-cta-text">解锁我的完整姻缘报告</span>
          <span className="love-cta-arrow">→</span>
        </button>

        <div className="love-cta-features">
          {[
            "✦ 命中正缘完整画像",
            "✦ 相遇场景与时机预测",
            "✦ 近3月桃花运详细预报",
            "✦ 专属情感提升建议",
          ].map(f => (
            <span key={f} className="love-cta-feature">{f}</span>
          ))}
        </div>

        <p className="love-cta-note">一次性解锁 · 无需注册 · 永久保存</p>
      </div>

      {/* 重测按钮 */}
      <button onClick={onReset} className="love-reset-btn">
        ← 重新测算
      </button>
    </div>
  );
}
