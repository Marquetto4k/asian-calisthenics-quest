import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "pca-28-dias-progresso";

export type Progress = {
  completed: number[];
  exercises: Record<string, string[]>;
};

const emptyProgress = (): Progress => ({ completed: [], exercises: {} });

function read(): Progress {
  if (typeof window === "undefined") return emptyProgress();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();

    const parsed = JSON.parse(raw) as Partial<Progress>;
    const completed = Array.isArray(parsed.completed)
      ? parsed.completed.filter((day): day is number => typeof day === "number")
      : [];
    const exercises =
      parsed.exercises && typeof parsed.exercises === "object" ? parsed.exercises : {};

    return { completed, exercises };
  } catch {
    return emptyProgress();
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(read());
    setHydrated(true);
  }, []);

  const persist = useCallback((next: Progress) => {
    setProgress(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* O aplicativo continua funcionando mesmo se o armazenamento estiver indisponível. */
    }
  }, []);

  const complete = useCallback(
    (day: number) => {
      const latest = read();
      persist({
        ...latest,
        completed: Array.from(new Set([...latest.completed, day])).sort((a, b) => a - b),
      });
    },
    [persist],
  );

  const undo = useCallback(
    (day: number) => {
      const latest = read();
      persist({
        ...latest,
        completed: latest.completed.filter((completedDay) => completedDay !== day),
      });
    },
    [persist],
  );

  const toggleExercise = useCallback(
    (day: number, exerciseId: string) => {
      const latest = read();
      const key = String(day);
      const current = latest.exercises[key] ?? [];
      const next = current.includes(exerciseId)
        ? current.filter((id) => id !== exerciseId)
        : [...current, exerciseId];

      persist({
        ...latest,
        exercises: { ...latest.exercises, [key]: next },
      });
    },
    [persist],
  );

  const reset = useCallback(() => persist(emptyProgress()), [persist]);

  const completed = progress.completed;
  const total = 28;
  const percent = Math.round((completed.length / total) * 100);

  let streak = 0;
  for (let day = 1; day <= total; day++) {
    if (completed.includes(day)) streak++;
    else break;
  }

  const currentDay = Math.min(streak + 1, total);

  return {
    completed,
    exercises: progress.exercises,
    hydrated,
    complete,
    undo,
    toggleExercise,
    reset,
    percent,
    streak,
    currentDay,
    total,
  };
}
