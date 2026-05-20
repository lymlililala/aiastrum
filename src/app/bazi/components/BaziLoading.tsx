"use client";

import React, { useEffect, useState } from "react";

const LOADING_STEPS = [
  "正在推算年柱天干地支...",
  "正在排定月柱与节气...",
  "正在演算日主命格...",
  "正在分析五行生克...",
  "正在查勘2026年流年太岁...",
  "AI 命理师正在解读命盘...",
];

const BAGUA_SYMBOLS = ["☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷"];
const TIANGAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const DIZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

export function BaziLoading() {
  const [currentStep, setCurrentStep] = useState(0);
  const [flashChars, setFlashChars] = useState<string[]>([]);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < LOADING_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 1800);

    return () => clearInterval(stepInterval);
  }, []);

  useEffect(() => {
    const chars = [...TIANGAN, ...DIZHI];
    const flashInterval = setInterval(() => {
      const newFlash = Array.from({ length: 6 }, () =>
        chars[Math.floor(Math.random() * chars.length)]!
      );
      setFlashChars(newFlash);
    }, 200);
    return () => clearInterval(flashInterval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        {/* 罗盘动画 */}
        <div className="relative mx-auto mb-10" style={{ width: 200, height: 200 }}>
          {/* 外圈旋转 */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: "2px solid rgba(180, 60, 30, 0.3)",
              animation: "bazi-spin 8s linear infinite",
            }}
          >
            {BAGUA_SYMBOLS.map((sym, i) => {
              const angle = (i / 8) * 360;
              const rad = (angle * Math.PI) / 180;
              const x = 50 + 44 * Math.sin(rad);
              const y = 50 - 44 * Math.cos(rad);
              return (
                <span
                  key={sym}
                  className="absolute text-sm font-bold"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                    color: "var(--vermillion)",
                    opacity: 0.8,
                  }}
                >
                  {sym}
                </span>
              );
            })}
          </div>

          {/* 内圈反向旋转 */}
          <div
            className="absolute rounded-full"
            style={{
              inset: "24px",
              border: "1px solid rgba(200, 160, 80, 0.3)",
              animation: "bazi-spin-reverse 5s linear infinite",
            }}
          >
            {DIZHI.slice(0, 8).map((dz, i) => {
              const angle = (i / 8) * 360;
              const rad = (angle * Math.PI) / 180;
              const x = 50 + 42 * Math.sin(rad);
              const y = 50 - 42 * Math.cos(rad);
              return (
                <span
                  key={dz}
                  className="absolute text-xs"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                    color: "var(--ink-gold)",
                    opacity: 0.7,
                  }}
                >
                  {dz}
                </span>
              );
            })}
          </div>

          {/* 中心 */}
          <div
            className="absolute"
            style={{
              inset: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <div
              className="w-full h-full rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle, rgba(180,60,30,0.2) 0%, transparent 70%)",
              }}
            >
              {/* 闪烁天干地支 */}
              <div className="grid grid-cols-3 gap-0.5">
                {flashChars.map((char, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold text-center"
                    style={{
                      color: i % 2 === 0 ? "var(--vermillion)" : "var(--ink-gold)",
                      opacity: 0.9,
                      lineHeight: 1.2,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 四角装饰 */}
          {["年", "月", "日", "时"].map((label, i) => {
            const positions = [
              { top: "-8px", left: "50%", transform: "translateX(-50%)" },
              { right: "-8px", top: "50%", transform: "translateY(-50%)" },
              { bottom: "-8px", left: "50%", transform: "translateX(-50%)" },
              { left: "-8px", top: "50%", transform: "translateY(-50%)" },
            ];
            return (
              <div
                key={label}
                className="absolute w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  ...positions[i],
                  background: "rgba(180, 60, 30, 0.8)",
                  color: "#fff8f0",
                  fontSize: "10px",
                  boxShadow: "0 0 8px rgba(180, 60, 30, 0.5)",
                }}
              >
                {label}
              </div>
            );
          })}
        </div>

        {/* 加载步骤文字 */}
        <div
          className="mb-8 h-6"
          style={{ color: "var(--ink-light)" }}
        >
          <p
            key={currentStep}
            className="text-sm"
            style={{ animation: "bazi-fade-in 0.5s ease-out" }}
          >
            {LOADING_STEPS[currentStep]}
          </p>
        </div>

        {/* 进度点 */}
        <div className="flex justify-center gap-2">
          {LOADING_STEPS.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === currentStep ? "24px" : "6px",
                height: "6px",
                background: i <= currentStep ? "var(--vermillion)" : "rgba(200,150,100,0.2)",
              }}
            />
          ))}
        </div>

        <p
          className="mt-8 text-xs"
          style={{ color: "rgba(200,180,150,0.4)" }}
        >
          天地玄黄，宇宙洪荒…
        </p>
      </div>
    </div>
  );
}
