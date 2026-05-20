"use client";
import React, { useState, useEffect } from "react";
import { Deity } from "../lingqian-data";
import { JiaoResult, JIAO_CONFIGS } from "../lingqian-data";
import { performJiaoRitual } from "../lingqian-engine";

interface JiaoGuaProps {
  deity: Deity;
  onConfirmed: () => void;
  maxAttempts?: number;
}

interface JiaoStep {
  result: JiaoResult;
  attempt: number;
}

export default function JiaoGua({ deity, onConfirmed, maxAttempts = 3 }: JiaoGuaProps) {
  const [started, setStarted] = useState(false);
  const [throwing, setThrowing] = useState(false);
  const [steps, setSteps] = useState<JiaoStep[]>([]);
  const [currentResult, setCurrentResult] = useState<JiaoResult | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const startRitual = () => {
    setStarted(true);
    setSteps([]);
    setThrowing(true);

    performJiaoRitual(maxAttempts, (result, attempt) => {
      setCurrentResult(result);
      setSteps((prev) => [...prev, { result, attempt }]);
    }).then(() => {
      setThrowing(false);
      setCurrentResult("圣杯");
    });
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(onConfirmed, 800);
  };

  return (
    <div className="lq-jiao-page">
      <div className="lq-jiao-header">
        <span className="lq-jiao-deity-icon">{deity.icon}</span>
        <h2 className="lq-jiao-title">掷筊确认</h2>
        <p className="lq-jiao-subtitle">请求神明确认，赐下圣杯方可解签</p>
      </div>

      {/* 筊杯展示区 */}
      <div className="lq-jiao-arena">
        {!started && (
          <div className="lq-jiao-pre">
            <div className="lq-jiao-cups-idle">
              <div className="lq-cup lq-cup-left">🔴</div>
              <div className="lq-cup lq-cup-right">🔴</div>
            </div>
            <p className="lq-jiao-pre-text">两枚筊杯，一面为阳（红），一面为阴（蓝）</p>
          </div>
        )}

        {started && (
          <div className="lq-jiao-steps">
            {steps.map((step, idx) => {
              const cfg = JIAO_CONFIGS[step.result];
              const isLast = idx === steps.length - 1;
              return (
                <div
                  key={idx}
                  className={`lq-jiao-step ${isLast ? "lq-jiao-step-active" : "lq-jiao-step-past"}`}
                  style={{ "--step-color": cfg.color } as React.CSSProperties}
                >
                  <div className="lq-jiao-step-num">第 {step.attempt} 掷</div>
                  <div className="lq-jiao-cups-result">
                    {step.result === "圣杯" && (
                      <>
                        <div className="lq-cup lq-cup-yang">🔴</div>
                        <div className="lq-cup lq-cup-yin">🔵</div>
                      </>
                    )}
                    {step.result === "笑杯" && (
                      <>
                        <div className="lq-cup lq-cup-yang">🔴</div>
                        <div className="lq-cup lq-cup-yang">🔴</div>
                      </>
                    )}
                    {step.result === "阴杯" && (
                      <>
                        <div className="lq-cup lq-cup-yin">🔵</div>
                        <div className="lq-cup lq-cup-yin">🔵</div>
                      </>
                    )}
                  </div>
                  <div className="lq-jiao-step-name">{step.result}</div>
                  <div className="lq-jiao-step-desc">{cfg.desc}</div>
                </div>
              );
            })}

            {throwing && (
              <div className="lq-jiao-throwing">
                <div className="lq-throwing-anim">
                  <span className="lq-cup lq-cup-spin">🔴</span>
                  <span className="lq-cup lq-cup-spin" style={{ animationDelay: "0.15s" }}>🔴</span>
                </div>
                <p>掷出中...</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 操作按钮 */}
      {!started && (
        <button
          className="lq-jiao-btn"
          onClick={startRitual}
          style={{ "--deity-color": deity.color } as React.CSSProperties}
        >
          🙏 开始掷筊
        </button>
      )}

      {!throwing && currentResult === "圣杯" && !confirmed && started && (
        <div className="lq-jiao-confirm">
          <div className="lq-jiao-pass-badge">✨ 圣杯降临</div>
          <p className="lq-jiao-pass-text">神明已允诺，签文应验！</p>
          <button
            className="lq-jiao-confirm-btn"
            onClick={handleConfirm}
            style={{ "--deity-color": deity.color } as React.CSSProperties}
          >
            查看签文解析 →
          </button>
        </div>
      )}

      {confirmed && (
        <div className="lq-jiao-confirmed">
          <div className="lq-confirmed-anim">✦ 正在解签... ✦</div>
        </div>
      )}

      {/* 掷筊知识 */}
      <div className="lq-jiao-knowledge">
        <h3>掷筊须知</h3>
        <div className="lq-jiao-rules">
          <div className="lq-jiao-rule">
            <span className="lq-rule-cups">🔴🔵</span>
            <span className="lq-rule-name">圣杯</span>
            <span className="lq-rule-desc">一正一反，神明允诺</span>
          </div>
          <div className="lq-jiao-rule">
            <span className="lq-rule-cups">🔴🔴</span>
            <span className="lq-rule-name">笑杯</span>
            <span className="lq-rule-desc">两面朝上，神明微笑，再问</span>
          </div>
          <div className="lq-jiao-rule">
            <span className="lq-rule-cups">🔵🔵</span>
            <span className="lq-rule-name">阴杯</span>
            <span className="lq-rule-desc">两面朝下，神明沉默，再问</span>
          </div>
        </div>
      </div>
    </div>
  );
}
