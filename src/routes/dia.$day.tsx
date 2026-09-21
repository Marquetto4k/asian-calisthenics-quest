import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, Clock, Dumbbell, Pause, Play, RotateCcw, Trophy } from "lucide-react";
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
    const t = `Dia ${loaderData.day.day}: ${loaderData.day.title} — Desafio 28 Dias`;
    const d = `Treino de ${loaderData.day.focus.toLowerCase()} em ${loaderData.day.duration}.`;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
      ],
    };
  },
  component: WorkoutPage,
});

function WorkoutPage() {
  const { day } = Route.useLoaderData();
  const { completed, complete } = useProgress();
  const navigate = useNavigate();
  const [celebrate, setCelebrate] = useState(false);
  const done = completed.includes(day.day);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="bg-brand-deep px-5 pb-8 pt-6 text-primary-foreground sm:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/80"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-flame">
            Dia {day.day} de 28
          </p>
          <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">{day.title}</h1>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
            <Chip>{day.focus}</Chip>
            <Chip>
              <Clock className="mr-1 inline h-3 w-3" />
              {day.duration}
            </Chip>
            <Chip>{day.difficulty}</Chip>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-28 pt-6 sm:px-8">
        <div className="overflow-hidden rounded-3xl bg-brand-deep shadow-lg">
          <div className="relative w-full pt-[56.25%]">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={day.video}
              title={`Demonstração — ${day.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <Timer />

        <section className="mt-8">
          <h2 className="flex items-center gap-2 text-lg font-bold text-brand-deep">
            <Dumbbell className="h-5 w-5 text-flame" /> Exercícios
          </h2>
          <div className="mt-4 space-y-3">
            {day.exercises.map((ex, i) => (
              <article key={ex.name} className="rounded-2xl border border-border bg-card p-4">
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-brand-soft text-sm font-bold text-brand-deep">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold leading-snug text-foreground">{ex.name}</h3>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
                      <Pill>{ex.sets} séries</Pill>
                      <Pill>{ex.reps}</Pill>
                      <Pill>Descanso {ex.rest}</Pill>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{ex.tip}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-card/95 px-5 py-4 backdrop-blur sm:px-8">
        <div className="mx-auto max-w-3xl">
          {done ? (
            <div className="flex items-center justify-center gap-2 rounded-2xl bg-brand-soft py-4 text-sm font-bold text-brand-deep">
              <Check className="h-5 w-5" /> Treino do dia {day.day} concluído
            </div>
          ) : (
            <button
              onClick={() => {
                complete(day.day);
                setCelebrate(true);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-flame py-4 text-base font-bold text-accent-foreground transition-transform active:scale-[0.98]"
            >
              <Check className="h-5 w-5" /> Concluir Treino
            </button>
          )}
        </div>
      </div>

      {celebrate && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-brand-deep/70 px-6">
          <div className="w-full max-w-sm rounded-3xl bg-card p-6 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-flame-soft">
              <Trophy className="h-8 w-8 text-flame" />
            </div>
            <h2 className="mt-4 text-xl font-extrabold text-brand-deep">Treino concluído!</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Dia {day.day} finalizado. Seu progresso foi salvo neste dispositivo.
            </p>
            <div className="mt-6 space-y-2">
              {day.day < 28 && (
                <button
                  onClick={() => {
                    setCelebrate(false);
                    navigate({ to: "/dia/$day", params: { day: String(day.day + 1) } });
                  }}
                  className="w-full rounded-2xl bg-flame py-3 text-sm font-bold text-accent-foreground"
                >
                  Ver o dia {day.day + 1}
                </button>
              )}
              <button
                onClick={() => {
                  setCelebrate(false);
                  navigate({ to: "/" });
                }}
                className="w-full rounded-2xl border border-border py-3 text-sm font-semibold text-brand-deep"
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
    <span className="rounded-full bg-primary-foreground/10 px-3 py-1 text-primary-foreground">
      {children}
    </span>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-brand-soft px-2.5 py-1 text-brand-deep">{children}</span>
  );
}

function Timer() {
  const [ms, setMs] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    const started = Date.now() - ms;
    ref.current = window.setInterval(() => setMs(Date.now() - started), 100);
    return () => {
      if (ref.current) window.clearInterval(ref.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const total = Math.floor(ms / 1000);
  const mm = String(Math.floor(total / 60)).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");
  const cs = String(Math.floor((ms % 1000) / 100));

  return (
    <section className="mt-6 rounded-3xl bg-brand p-5 text-primary-foreground">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/70">
        Cronômetro
      </p>
      <p className="mt-2 text-center text-5xl font-extrabold tabular-nums sm:text-6xl">
        {mm}:{ss}
        <span className="text-2xl text-flame">.{cs}</span>
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          onClick={() => setRunning((r) => !r)}
          className="flex items-center justify-center gap-2 rounded-2xl bg-flame py-3 text-sm font-bold text-accent-foreground"
        >
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? "Pausar" : "Iniciar"}
        </button>
        <button
          onClick={() => {
            setRunning(false);
            setMs(0);
          }}
          className="flex items-center justify-center gap-2 rounded-2xl bg-primary-foreground/15 py-3 text-sm font-bold"
        >
          <RotateCcw className="h-4 w-4" /> Zerar
        </button>
      </div>
    </section>
  );
}
