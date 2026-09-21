import {
  Check,
  CircleAlert,
  Clock3,
  Footprints,
  Lightbulb,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Exercise } from "@/lib/program";

type ExerciseCardProps = {
  exercise: Exercise;
  index: number;
  checked: boolean;
  onToggle: () => void;
};

export function ExerciseCard({ exercise, index, checked, onToggle }: ExerciseCardProps) {
  const initialSeconds = exercise.timerMinutes * 60;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const interval = window.setInterval(() => {
      setSeconds((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [running]);

  useEffect(() => {
    if (seconds === 0) setRunning(false);
  }, [seconds]);

  const formattedTime = useMemo(() => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const remainingSeconds = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  }, [seconds]);

  const elapsedPercent = Math.round(((initialSeconds - seconds) / initialSeconds) * 100);
  const finished = seconds === 0;

  function resetTimer() {
    setRunning(false);
    setSeconds(initialSeconds);
  }

  return (
    <article
      className={[
        "overflow-hidden rounded-[1.75rem] border bg-card shadow-[0_14px_38px_-30px_oklch(0.2_0_0/0.35)] transition",
        checked ? "border-neutral-900" : "border-border",
      ].join(" ")}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <img
          src={exercise.image}
          alt={exercise.imageAlt}
          width={640}
          height={360}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-brand-deep/80 to-transparent" />
        <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-xl bg-white/95 text-sm font-extrabold text-brand-deep shadow-sm">
          {index + 1}
        </span>
        <button
          type="button"
          aria-pressed={checked}
          aria-label={checked ? `Desmarcar ${exercise.name}` : `Marcar ${exercise.name} como feito`}
          onClick={onToggle}
          className={[
            "absolute right-3 top-3 flex min-h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-extrabold shadow-sm transition active:scale-95",
            checked ? "bg-flame text-white" : "bg-white/95 text-brand-deep",
          ].join(" ")}
        >
          <Check className="h-4 w-4" /> {checked ? "Feito" : "Marcar"}
        </button>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-lg font-extrabold leading-tight text-brand-deep">{exercise.name}</h3>
        <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-bold">
          <Pill>{exercise.sets} séries</Pill>
          <Pill>{exercise.reps}</Pill>
          <Pill>Descanso: {exercise.rest}</Pill>
        </div>

        <div className="mt-4 flex gap-2 rounded-2xl bg-brand-soft/75 p-3 text-xs leading-relaxed text-brand-deep">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-flame" />
          <p>
            <strong className="font-extrabold">Ponto-chave:</strong> {exercise.tip}
          </p>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-background/70 p-4">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand">
            Como executar
          </p>
          <ol className="mt-3 space-y-3">
            {exercise.instructions.map((instruction, step) => (
              <li key={instruction} className="flex gap-3 text-xs leading-relaxed text-foreground">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-deep text-[10px] font-extrabold text-white">
                  {step + 1}
                </span>
                <span className="pt-0.5">{instruction}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="flex gap-2 rounded-2xl bg-neutral-100 p-3 text-xs leading-relaxed text-neutral-950">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600" />
            <p>
              <strong className="font-extrabold">Evite:</strong> {exercise.avoid}
            </p>
          </div>
          <div className="flex gap-2 rounded-2xl bg-neutral-200 p-3 text-xs leading-relaxed text-neutral-950">
            <Footprints className="mt-0.5 h-4 w-4 shrink-0 text-neutral-700" />
            <p>
              <strong className="font-extrabold">Adaptação:</strong> {exercise.easier}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-brand-deep p-4 text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
                <Clock3 className="h-3.5 w-3.5" /> Timer do exercício
              </p>
              <p className="mt-1 text-3xl font-extrabold tabular-nums tracking-tight">
                {formattedTime}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (finished) {
                    setSeconds(initialSeconds);
                    setRunning(true);
                    return;
                  }
                  setRunning((current) => !current);
                }}
                className="grid h-12 w-12 place-items-center rounded-2xl bg-flame text-white shadow-lg transition active:scale-95"
                aria-label={running ? "Pausar timer" : "Iniciar timer"}
              >
                {running ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              <button
                type="button"
                onClick={resetTimer}
                className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-white transition active:scale-95"
                aria-label="Reiniciar timer"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-flame transition-all duration-500"
              style={{ width: `${elapsedPercent}%` }}
            />
          </div>
          <p className="mt-2 text-[10px] font-semibold text-white/55">
            {finished
              ? "Tempo finalizado. Respire e marque o exercício como feito."
              : `Bloco rápido de ${exercise.timerMinutes} minutos.`}
          </p>
        </div>
      </div>
    </article>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-muted px-2.5 py-1.5 text-muted-foreground">{children}</span>
  );
}
