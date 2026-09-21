import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "pca-28-dias-progresso";

export type Progress = {
  completed: number[];
};

function read(): Progress {
  if (typeof window === "undefined") return { completed: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completed: [] };
    const parsed = JSON.parse(raw) as Progress;
    if (!Array.isArray(parsed.completed)) return { completed: [] };
    return { completed: parsed.completed.filter((n) => typeof n === "number") };
  } catch {
    return { completed: [] };
  }
}

export function useProgress() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCompleted(read().completed);
    setHydrated(true);
  }, []);

  const persist = useCallback((next: number[]) => {
    setCompleted(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed: next }));
    } catch {
      /* ignore */
    }
  }, []);

  const complete = useCallback(
    (day: number) => {
      persist(Array.from(new Set([...read().completed, day])).sort((a, b) => a - b));
    },
    [persist],
  );

  const undo = useCallback(
    (day: number) => {
      persist(read().completed.filter((d) => d !== day));
    },
    [persist],
  );

  const reset = useCallback(() => persist([]), [persist]);

  const total = 28;
  const percent = Math.round((completed.length / total) * 100);

  let streak = 0;
  for (let d = 1; d <= total; d++) {
    if (completed.includes(d)) streak++;
    else break;
  }
  const currentDay = Math.min(streak + 1, total);

  return { completed, hydrated, complete, undo, reset, percent, streak, currentDay, total };
}
