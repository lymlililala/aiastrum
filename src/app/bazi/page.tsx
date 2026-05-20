"use client";

import React, { useState, useCallback } from "react";
import { BaziInputForm } from "./components/BaziInput";
import { BaziLoading } from "./components/BaziLoading";
import { BaziReport } from "./components/BaziReport";
import type { BaziInput, BaziResult } from "./bazi-engine";
import Link from "next/link";

type Phase = "landing" | "input" | "loading" | "result";

interface BaziResultState {
  baziResult: BaziResult;
  report: string;
  birthInfo: BaziInput;
}

export default function BaziPage() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [resultState, setResultState] = useState<BaziResultState | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const handleSubmit = useCallback(async (input: BaziInput) => {
    setPhase("loading");

    try {
      const response = await fetch("/api/bazi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("请求失败");
      }

      const data = (await response.json()) as { report: string; baziResult: BaziResult };
      setResultState({ baziResult: data.baziResult, report: data.report, birthInfo: input });
      setPhase("result");
    } catch (error) {
      console.warn("Bazi request error:", error);
      setErrMsg("排盘失败，请稍后重试");
      setPhase("input");
    }
  }, []);

  const handleRestart = useCallback(() => {
    setPhase("landing");
    setResultState(null);
    setErrMsg(null);
  }, []);

  return (
    <div className="bazi-theme min-h-screen relative" style={{ zIndex: 1 }}>
      {/* 国风背景 */}
      <div className="bazi-bg" />
      <InkParticles />

      {/* 顶部导航 */}
      {phase !== "loading" && (
        <nav
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
          style={{
            background: "linear-gradient(to bottom, rgba(20, 5, 0, 0.8), transparent)",
          }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
          >
            <span className="text-xl">←</span>
            <span
              className="text-sm tracking-widest hidden sm:block"
              style={{ color: "var(--ink-gold)", fontFamily: "serif" }}
            >
              返回首页
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-2xl">☯</span>
            <span
              className="text-sm font-bold tracking-widest hidden sm:block"
              style={{ color: "var(--ink-gold)", fontFamily: "serif" }}
            >
              生辰八字
            </span>
          </div>

          {phase === "result" && (
            <button
              onClick={handleRestart}
              className="text-xs px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(180, 60, 30, 0.2)",
                border: "1px solid rgba(180, 60, 30, 0.4)",
                color: "var(--ink-light)",
              }}
            >
              重新测算
            </button>
          )}
          {phase !== "result" && <div className="w-16" />}
        </nav>
      )}

      {/* Landing Page */}
      {phase === "landing" && (
        <BaziLandingPage onStart={() => setPhase("input")} />
      )}

      {/* 输入表单 */}
      {phase === "input" && (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-24">
          {errMsg && (
            <div style={{
              position: "fixed", top: 72, left: "50%", transform: "translateX(-50%)",
              zIndex: 300, padding: "10px 20px", borderRadius: 10,
              background: "rgba(160,40,20,0.92)", backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,100,60,0.35)",
              color: "rgba(255,210,190,0.95)", fontSize: "0.82rem",
              display: "flex", alignItems: "center", gap: 10,
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              maxWidth: "calc(100vw - 48px)",
            }}>
              <span>⚠ {errMsg}</span>
              <button onClick={() => setErrMsg(null)} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: "1.1rem", padding: 0 }}>×</button>
            </div>
          )}
          <div
            className="w-full max-w-lg"
            style={{ animation: "bazi-fade-in 0.6s ease-out" }}
          >
            <div className="text-center mb-8">
              <p
                className="text-xs tracking-widest mb-3"
                style={{ color: "rgba(200,150,80,0.6)", fontFamily: "serif" }}
              >
                请填写出生信息
              </p>
              <h2
                className="text-2xl font-bold mb-2"
                style={{
                  background: "linear-gradient(135deg, #e8d5a3, #d4832a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "serif",
                }}
              >
                生辰八字测算
              </h2>
              <p className="text-sm" style={{ color: "rgba(200,180,150,0.6)" }}>
                天干地支排盘 · AI 命理深度解读
              </p>
            </div>
            <BaziInputForm onSubmit={handleSubmit} />
          </div>
        </div>
      )}

      {/* 加载动画 */}
      {phase === "loading" && <BaziLoading />}

      {/* 报告展示 */}
      {phase === "result" && resultState && (
        <BaziReport
          baziResult={resultState.baziResult}
          report={resultState.report}
          birthInfo={resultState.birthInfo}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

// ===== Landing Page =====
function BaziLandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
      {/* 顶部装饰 */}
      <div className="mb-10 relative">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ animation: "bazi-spin 12s linear infinite" }}
        >
          <div
            className="rounded-full"
            style={{
              width: 180,
              height: 180,
              border: "1px solid rgba(180, 100, 50, 0.25)",
            }}
          />
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ animation: "bazi-spin-reverse 8s linear infinite" }}
        >
          <div
            className="rounded-full"
            style={{
              width: 140,
              height: 140,
              border: "1px dashed rgba(200, 150, 60, 0.2)",
            }}
          />
        </div>
        <div className="relative z-10 flex items-center justify-center" style={{ width: 180, height: 180 }}>
          <span className="text-7xl" style={{ filter: "drop-shadow(0 0 20px rgba(180,80,30,0.5))" }}>
            ☯
          </span>
        </div>
      </div>

      {/* 标题 */}
      <h1
        className="text-center mb-3"
        style={{
          fontSize: "clamp(1.8rem, 5vw, 3rem)",
          fontFamily: "serif",
          background: "linear-gradient(135deg, #e8d5a3, #d4832a, #c9a84c)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "0.15em",
          animation: "bazi-fade-in 0.8s ease-out",
        }}
      >
        生辰八字
      </h1>
      <p
        className="text-sm tracking-widest mb-3"
        style={{
          color: "rgba(200,150,80,0.6)",
          fontFamily: "serif",
          animation: "bazi-fade-in 0.8s 0.1s ease-out both",
        }}
      >
        BAZI · CHINESE ASTROLOGY
      </p>

      <p
        className="text-center max-w-md leading-relaxed mb-10"
        style={{
          color: "rgba(200,180,150,0.7)",
          animation: "bazi-fade-in 0.8s 0.2s ease-out both",
          lineHeight: 1.8,
          fontSize: "1rem",
        }}
      >
        以出生时间为密钥，
        <br />
        解读天干地支间隐藏的命运密码。
        <br />
        <span style={{ color: "rgba(200,150,80,0.6)", fontSize: "0.9rem" }}>
          五行性格 · 流年运势 · AI 深度解读
        </span>
      </p>

      {/* 分隔装饰 */}
      <div
        className="flex items-center gap-4 mb-10 w-64"
        style={{ animation: "bazi-fade-in 0.8s 0.3s ease-out both" }}
      >
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(180,100,50,0.4))" }} />
        <span style={{ color: "var(--vermillion)", fontSize: "18px" }}>☯</span>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(180,100,50,0.4))" }} />
      </div>

      {/* 功能特点 */}
      <div
        className="grid grid-cols-3 gap-6 mb-10 max-w-sm w-full"
        style={{ animation: "bazi-fade-in 0.8s 0.4s ease-out both" }}
      >
        {[
          { icon: "⊞", text: "四柱排盘" },
          { icon: "☵", text: "五行分析" },
          { icon: "✦", text: "AI解读" },
        ].map((f) => (
          <div key={f.text} className="text-center">
            <div className="text-2xl mb-1" style={{ color: "var(--vermillion)", fontFamily: "serif" }}>
              {f.icon}
            </div>
            <div className="text-xs tracking-wide" style={{ color: "rgba(200,180,150,0.6)" }}>
              {f.text}
            </div>
          </div>
        ))}
      </div>

      {/* 开始按钮 */}
      <button
        onClick={onStart}
        className="btn-vermillion px-12 py-4 rounded-full text-base font-bold tracking-widest"
        style={{
          fontFamily: "serif",
          animation: "bazi-fade-in 0.8s 0.5s ease-out both",
        }}
      >
        ✦ 开始测算
      </button>

      <p
        className="mt-6 text-xs text-center"
        style={{
          color: "rgba(200,180,150,0.3)",
          animation: "bazi-fade-in 0.8s 0.6s ease-out both",
        }}
      >
        ✦ 天干地支排盘 · 仅供娱乐参考 ✦
      </p>

      {/* 底部装饰天干地支 */}
      <div
        className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 opacity-20"
        style={{ animation: "bazi-fade-in 1s 0.8s ease-out both" }}
      >
        {["子", "丑", "寅", "卯", "辰", "巳"].map((dz, i) => (
          <span
            key={dz}
            className="text-lg"
            style={{
              color: "var(--ink-gold)",
              fontFamily: "serif",
              animation: `bazi-pulse ${2 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
            }}
          >
            {dz}
          </span>
        ))}
      </div>
    </div>
  );
}

// 水墨粒子装饰
function InkParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() < 0.7 ? 1 : Math.random() < 0.9 ? 2 : 3,
    delay: `${Math.random() * 5}s`,
    duration: `${3 + Math.random() * 4}s`,
  }));

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: "rgba(180, 100, 50, 0.4)",
            animationDelay: p.delay,
            animationDuration: p.duration,
            animation: `bazi-pulse ${p.duration} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
