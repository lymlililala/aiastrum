"use client";

import { useState, useEffect, useCallback } from "react";
import type { TarotCard } from "./tarot-data";

export interface ReadingRecord {
  id: string;
  date: string;
  spreadType: "single" | "three";
  domain: string;
  cards: Array<{ card: TarotCard; reversed: boolean }>;
  reading: string;
  timestamp: number;
}

const STORAGE_KEY = "tarot_readings";
const DAILY_LIMIT_KEY = "tarot_daily_limit";

// 获取今日日期字符串
function getTodayKey(): string {
  return new Date().toISOString().split("T")[0]!;
}

// 使用历史记录
export function useReadingHistory() {
  const [history, setHistory] = useState<ReadingRecord[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ReadingRecord[];
        setHistory(parsed);
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const saveReading = useCallback((record: Omit<ReadingRecord, "id" | "timestamp">) => {
    const newRecord: ReadingRecord = {
      ...record,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    setHistory((prev) => {
      const updated = [newRecord, ...prev].slice(0, 20); // 最多保留20条
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    return newRecord;
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { history, saveReading, clearHistory };
}

// 使用记录 hook（仅记录使用量，不作限制）
export function useDailyLimit() {
  const [todayUsage, setTodayUsage] = useState<{ single: number; three: number }>({
    single: 0,
    three: 0,
  });

  useEffect(() => {
    const today = getTodayKey();
    const stored = localStorage.getItem(DAILY_LIMIT_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { date: string; single: number; three: number };
        if (parsed.date === today) {
          setTodayUsage({ single: parsed.single, three: parsed.three });
        } else {
          localStorage.removeItem(DAILY_LIMIT_KEY);
        }
      } catch {
        localStorage.removeItem(DAILY_LIMIT_KEY);
      }
    }
  }, []);

  const canUse = useCallback((_spreadType: "single" | "three"): boolean => true, []);

  const recordUsage = useCallback((spreadType: "single" | "three") => {
    const today = getTodayKey();
    setTodayUsage((prev) => {
      const updated = { ...prev, [spreadType]: prev[spreadType] + 1 };
      localStorage.setItem(DAILY_LIMIT_KEY, JSON.stringify({ date: today, ...updated }));
      return updated;
    });
  }, []);

  return { todayUsage, canUse, recordUsage };
}
