"use client";
import React, { useState, useEffect } from "react";
import { Deity } from "../lingqian-data";
import { JiaoResult, JIAO_CONFIGS } from "../lingqian-data";
import { performJiaoRitual } from "../lingqian-engine";
import { resolveJiaoDesc } from "../lingqian-content-i18n";
import type { LingT, Lang } from "../lingqian-i18n";

interface JiaoGuaProps {
  deity: Deity;
  onConfirmed: () => void;
  maxAttempts?: number;
  t: LingT;
  lang: Lang;
}

interface JiaoStep {
  result: JiaoResult;
  attempt: number;
}

export default function JiaoGua({ deity, onConfirmed, maxAttempts = 3, t, lang }: JiaoGuaProps) {
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
        <h2 className="lq-jiao-title">{t.jiaoTitle}</h2>
        <p className="lq-jiao-subtitle">{t.jiaoSubtitle}</p>
      </div>

      {/* 筊杯展示区 */}
      <div className="lq-jiao-arena">
        {!started && (
          <div className="lq-jiao-pre">
            <div className="lq-jiao-cups-idle">
              <div className="lq-cup lq-cup-left">🔴</div>
              <div className="lq-cup lq-cup-right">🔴</div>
            </div>
            <p className="lq-jiao-pre-text">{t.jiaoPreText}</p>
          </div>
        )}

        {started && (
          <div className="lq-jiao-steps">
            {steps.map((step, idx) => {
              const cfg = JIAO_CONFIGS[step.result];
              const isLast = idx === steps.length - 1;
              const jiaoName =
                step.result === "圣杯" ? t.jiaoRuleShengName
                : step.result === "笑杯" ? t.jiaoRuleXiaoName
                : t.jiaoRuleYinName;
              return (
                <div
                  key={idx}
                  className={`lq-jiao-step ${isLast ? "lq-jiao-step-active" : "lq-jiao-step-past"}`}
                  style={{ "--step-color": cfg.color } as React.CSSProperties}
                >
                  <div className="lq-jiao-step-num">{t.jiaoStepNum(step.attempt)}</div>
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
                  <div className="lq-jiao-step-name">{jiaoName}</div>
                  <div className="lq-jiao-step-desc">{resolveJiaoDesc(lang, step.result, cfg.desc)}</div>
                </div>
              );
            })}

            {throwing && (
              <div className="lq-jiao-throwing">
                <div className="lq-throwing-anim">
                  <span className="lq-cup lq-cup-spin">🔴</span>
                  <span className="lq-cup lq-cup-spin" style={{ animationDelay: "0.15s" }}>🔴</span>
                </div>
                <p>{t.jiaoThrowing}</p>
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
          {t.jiaoStartBtn}
        </button>
      )}

      {!throwing && currentResult === "圣杯" && !confirmed && started && (
        <div className="lq-jiao-confirm">
          <div className="lq-jiao-pass-badge">{t.jiaoPassBadge}</div>
          <p className="lq-jiao-pass-text">{t.jiaoPassText}</p>
          <button
            className="lq-jiao-confirm-btn"
            onClick={handleConfirm}
            style={{ "--deity-color": deity.color } as React.CSSProperties}
          >
            {t.jiaoConfirmBtn}
          </button>
        </div>
      )}

      {confirmed && (
        <div className="lq-jiao-confirmed">
          <div className="lq-confirmed-anim">{t.jiaoConfirmedAnim}</div>
        </div>
      )}

      {/* 掷筊知识 */}
      <div className="lq-jiao-knowledge">
        <h3>{t.jiaoKnowledgeTitle}</h3>
        <div className="lq-jiao-rules">
          <div className="lq-jiao-rule">
            <span className="lq-rule-cups">🔴🔵</span>
            <span className="lq-rule-name">{t.jiaoRuleShengName}</span>
            <span className="lq-rule-desc">{t.jiaoRuleShengDesc}</span>
          </div>
          <div className="lq-jiao-rule">
            <span className="lq-rule-cups">🔴🔴</span>
            <span className="lq-rule-name">{t.jiaoRuleXiaoName}</span>
            <span className="lq-rule-desc">{t.jiaoRuleXiaoDesc}</span>
          </div>
          <div className="lq-jiao-rule">
            <span className="lq-rule-cups">🔵🔵</span>
            <span className="lq-rule-name">{t.jiaoRuleYinName}</span>
            <span className="lq-rule-desc">{t.jiaoRuleYinDesc}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
