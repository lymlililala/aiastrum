"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Deity } from "../lingqian-data";
import type { LingT } from "../lingqian-i18n";

interface ShakeSignProps {
  deity: Deity;
  onShakeComplete: () => void;
  onBack: () => void;
  t: LingT;
}

type AnimState = "idle" | "shaking" | "flying" | "done";

export default function ShakeSign({ deity, onShakeComplete, onBack, t }: ShakeSignProps) {
  const [animState, setAnimState] = useState<AnimState>("idle");
  const [shakeCount, setShakeCount] = useState(0);
  const [hint, setHint] = useState(t.shakeHintIdle);
  const lastShakeTime = useRef(0);
  const motionListenerRef = useRef<((e: DeviceMotionEvent) => void) | null>(null);

  // 摇一摇检测（移动端陀螺仪）
  const setupMotionListener = useCallback(() => {
    const threshold = 15;
    const handler = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      const magnitude = Math.sqrt(
        (acc.x || 0) ** 2 + (acc.y || 0) ** 2 + (acc.z || 0) ** 2
      );
      const now = Date.now();
      if (magnitude > threshold && now - lastShakeTime.current > 800) {
        lastShakeTime.current = now;
        triggerShake();
      }
    };
    motionListenerRef.current = handler;
    window.addEventListener("devicemotion", handler);
  }, []); // eslint-disable-line

  const removeMotionListener = useCallback(() => {
    if (motionListenerRef.current) {
      window.removeEventListener("devicemotion", motionListenerRef.current);
      motionListenerRef.current = null;
    }
  }, []);

  useEffect(() => {
    // 请求设备运动权限（iOS 13+）
    const requestMotion = async () => {
      if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof (DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === "function"
      ) {
        try {
          const perm = await (DeviceMotionEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission();
          if (perm === "granted") setupMotionListener();
        } catch {
          // ignore
        }
      } else {
        setupMotionListener();
      }
    };
    requestMotion();
    return () => removeMotionListener();
  }, [setupMotionListener, removeMotionListener]);

  const triggerShake = useCallback(() => {
    if (animState !== "idle") return;
    setAnimState("shaking");
    setHint(t.shakeHintShaking);

    // 模拟签筒摇晃动画
    setShakeCount((c) => c + 1);

    setTimeout(() => {
      setAnimState("flying");
      setHint(t.shakeHintFlying);
      setTimeout(() => {
        setAnimState("done");
        setTimeout(() => {
          onShakeComplete();
        }, 600);
      }, 800);
    }, 1800);
  }, [animState, onShakeComplete, t]);

  return (
    <div className="lq-shake-page">
      {/* 返回按钮 */}
      <button className="lq-back-btn" onClick={onBack}>
        {t.navBack}
      </button>

      {/* 神明信息 */}
      <div className="lq-shake-deity-bar" style={{ "--deity-color": deity.color } as React.CSSProperties}>
        <span className="lq-shake-deity-icon">{deity.icon}</span>
        <span className="lq-shake-deity-name">{deity.name}</span>
      </div>

      {/* 签筒动画区 */}
      <div className="lq-shake-arena">
        {/* 背景装饰 */}
        <div className="lq-smoke lq-smoke-1" />
        <div className="lq-smoke lq-smoke-2" />
        <div className="lq-smoke lq-smoke-3" />

        {/* 签筒主体 */}
        <button
          className={`lq-tube-wrap ${animState === "shaking" ? "lq-tube-shaking" : ""} ${animState === "idle" ? "lq-tube-pulse" : ""}`}
          onClick={triggerShake}
          disabled={animState !== "idle"}
          aria-label={t.shakeAria}
        >
          <div className="lq-tube">
            <div className="lq-tube-top" />
            <div className="lq-tube-body">
              <div className="lq-tube-pattern">{t.shakeTubeChar}</div>
            </div>
            <div className="lq-tube-bottom" />
          </div>

          {/* 签竹 */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`lq-stick lq-stick-${i} ${animState === "shaking" ? "lq-stick-anim" : ""} ${animState === "flying" && i === 2 ? "lq-stick-fly" : ""}`}
            />
          ))}
        </button>

        {/* 飞出的签 */}
        {animState === "flying" && (
          <div className="lq-flying-stick">
            <div className="lq-flying-stick-body" style={{ "--deity-color": deity.color } as React.CSSProperties} />
          </div>
        )}
      </div>

      {/* 提示文字 */}
      <div className="lq-shake-hint">
        <p className="lq-hint-text">{hint}</p>
        {animState === "idle" && (
          <p className="lq-hint-sub">{t.shakeHintSub}</p>
        )}
      </div>

      {/* 仪式说明 */}
      {animState === "idle" && (
        <div className="lq-ritual-tips">
          <div className="lq-tip-item">
            <span className="lq-tip-icon">📱</span>
            <span>{t.shakeTipMobile}</span>
          </div>
          <div className="lq-tip-item">
            <span className="lq-tip-icon">🖱️</span>
            <span>{t.shakeTipPc}</span>
          </div>
        </div>
      )}
    </div>
  );
}
