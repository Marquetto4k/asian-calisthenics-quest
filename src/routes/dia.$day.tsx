import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  Dumbbell,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { ExerciseCard } from "@/components/ExerciseCard";
import { getDay } from "@/lib/program";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/dia/$day")({
  loader: ({ params }) => {
    const day = getDay(Number(params.day));
    if (!day) throw notFound();
    return { day };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Treino não encontrado" }, { name: "robots", content: "noindex" }] };
    }

    const title = `Dia ${loaderData.day.day}: ${loaderData.day.title} — Desafio 28 Dias`;
    const description = `Treino guiado de ${loaderData.day.focus.toLowerCase()} com checklist e timers rápidos.`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: WorkoutPage,
});

function WorkoutPage() {
  const { day } = Route.useLoaderData();
  const { completed, exercises, complete, undo, toggleExercise } = useProgress();
  const navigate = useNavigate();
  const [celebrate, setCelebrate] = useState(false);
  const done = completed.includes(day.day);
  const checkedExercises = exercises[String(day.day)] ?? [];
  const allChecked = day.exercises.every((exercise) => checkedExercises.includes(exercise.id));
  const checkedPercent = Math.round((checkedExercises.length / day.exercises.length) * 100);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="hero-grid overflow-hidden bg-brand-deep px-5 pb-8 pt-6 text-primary-foreground sm:px-8 sm:pb-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-3">
            <Link
              to="/"
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/10 px-3 text-sm font-semibold text-white/85 transition hover:bg-white/15"
            >
              <ArrowLeft className="h-4 w-4" /> Painel
            </Link>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-flame">
              Semana {day.week} · {day.phase}
            </span>
          </div>

          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.22em] text-flame">
            Dia {day.day} de 28
          </p>
          <h1 className="mt-2 max-w-xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {day.title}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">{day.focus}</p>

          <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-bold">
            <Chip>
              <Clock3 className="h-3.5 w-3.5" /> {day.duration}
            </Chip>
            <Chip>
              <Dumbbell className="h-3.5 w-3.5" /> {day.exercises.length} exercícios
            </Chip>
            <Chip>{day.difficulty}</Chip>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-40 pt-5 sm:px-8">
        <section className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-[0_18px_44px_-32px_oklch(0.22_0.12_255/0.6)]">
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={day.image}
              alt={day.imageAlt}
              width={960}
              height={540}
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-flame">
                Treino de hoje
              </p>
              <p className="mt-1 text-sm font-semibold">Siga os movimentos no seu ritmo.</p>
            </div>
          </div>
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-muted-foreground">Checklist do dia</p>
                <p className="mt-0.5 text-lg font-extrabold text-brand-deep">
                  {checkedExercises.length} de {day.exercises.length} concluídos
                </p>
              </div>
              <span className="text-2xl font-extrabold text-flame">{checkedPercent}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-brand-soft">
              <div
                className="h-full rounded-full bg-flame transition-all duration-500"
                style={{ width: `${checkedPercent}%` }}
              />
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-flame-soft text-flame">
              <Dumbbell className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-flame">
                Passo a passo
              </p>
              <h2 className="text-xl font-extrabold text-brand-deep">Exercícios de hoje</h2>
            </div>
          </div>

          <div className="mt-5 space-y-5">
            {day.exercises.map((exercise, index) => (
              <ExerciseCard
                key={`${day.day}-${exercise.id}`}
                exercise={exercise}
                index={index}
                checked={checkedExercises.includes(exercise.id)}
                onToggle={() => toggleExercise(day.day, exercise.id)}
              />
            ))}
          </div>
        </section>

        <aside className="mt-6 flex gap-3 rounded-3xl border border-brand/15 bg-brand-soft/65 p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          <div>
            <p className="text-sm font-extrabold text-brand-deep">Treine com segurança</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Faça um aquecimento leve, mantenha água por perto e interrompa o exercício em caso de
              dor, tontura ou mal-estar.
            </p>
          </div>
        </aside>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {day.day > 1 ? (
            <Link
              to="/dia/$day"
              params={{ day: String(day.day - 1) }}
              className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-card text-xs font-bold text-brand-deep"
            >
              <ChevronLeft className="h-4 w-4" /> Dia anterior
            </Link>
          ) : (
            <span />
          )}
          {day.day < 28 && (
            <Link
              to="/dia/$day"
              params={{ day: String(day.day + 1) }}
              className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-card text-xs font-bold text-brand-deep"
            >
              Próximo dia <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-14px_35px_-25px_oklch(0.22_0.1_255/0.5)] backdrop-blur-xl sm:px-8">
        <div className="mx-auto max-w-3xl">
          {done ? (
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-emerald-100 px-3 text-sm font-extrabold text-emerald-700">
                <CheckCircle2 className="h-5 w-5" /> Dia {day.day} concluído
              </div>
              <button
                type="button"
                onClick={() => undo(day.day)}
                className="min-h-14 rounded-2xl border border-border px-4 text-xs font-bold text-muted-foreground"
              >
                Desfazer
              </button>
            </div>
          ) : (
            <button
              type="button"
              disabled={!allChecked}
              onClick={() => {
                complete(day.day);
                setCelebrate(true);
              }}
              className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-flame px-4 text-center text-sm font-extrabold text-white shadow-[0_12px_28px_-14px_oklch(0.7_0.18_48/0.8)] transition active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
            >
              <Check className="h-5 w-5" />
              {allChecked
                ? "Concluir treino de hoje"
                : `Marque os exercícios (${checkedExercises.length}/${day.exercises.length})`}
            </button>
          )}
        </div>
      </div>

      {celebrate && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-brand-deep/80 px-5 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[2rem] bg-card p-6 text-center shadow-2xl">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-flame-soft">
              <Trophy className="h-10 w-10 text-flame" />
            </div>
            <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-flame">
              <Sparkles className="h-3.5 w-3.5" /> Progresso salvo
            </div>
            <h2 className="mt-2 text-2xl font-extrabold text-brand-deep">Treino concluído!</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Você finalizou o dia {day.day}. Continue assim para construir sua sequência.
            </p>
            <div className="mt-6 space-y-2">
              {day.day < 28 && (
                <button
                  type="button"
                  onClick={() => {
                    setCelebrate(false);
                    navigate({ to: "/dia/$day", params: { day: String(day.day + 1) } });
                  }}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-flame px-4 text-sm font-extrabold text-white"
                >
                  Ver o dia {day.day + 1} <ArrowRight className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setCelebrate(false);
                  navigate({ to: "/" });
                }}
                className="min-h-12 w-full rounded-2xl border border-border text-sm font-bold text-brand-deep"
              >
                Voltar ao painel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-white">
      {children}
    </span>
  );
}
