import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Flame, Lock, Play, Trophy } from "lucide-react";
import { DAYS } from "@/lib/program";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { completed, percent, streak, currentDay, total, reset, hydrated } = useProgress();

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="bg-brand-deep px-5 pb-16 pt-10 text-primary-foreground sm:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-flame">
            Protocolo Calistenia Asiática
          </p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
            Desafio 28 Dias
          </h1>
          <p className="mt-3 max-w-md text-sm text-primary-foreground/75">
            Treinos diários de calistenia com foco em força, mobilidade e controle corporal.
          </p>
        </div>
      </header>

      <main className="mx-auto -mt-10 max-w-3xl px-5 pb-16 sm:px-8">
        <section className="rounded-3xl bg-card p-5 shadow-[0_18px_40px_-24px_oklch(0.34_0.14_262/0.6)]">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-muted-foreground">Seu progresso</p>
              <p className="text-3xl font-extrabold text-brand-deep">{percent}%</p>
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-full bg-flame-soft px-3 py-2 text-flame">
              <Flame className="h-4 w-4 shrink-0" />
              <span className="text-sm font-bold">{streak} dias seguidos</span>
            </div>
          </div>

          <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-brand-soft">
            <div
              className="h-full rounded-full bg-flame transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <Stat label="Concluídos" value={`${completed.length}`} />
            <Stat label="Restantes" value={`${total - completed.length}`} />
            <Stat label="Dia atual" value={`${currentDay}`} />
          </div>

          <Link
            to="/dia/$day"
            params={{ day: String(currentDay) }}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-flame px-5 py-4 text-base font-bold text-accent-foreground transition-transform active:scale-[0.98]"
          >
            <Play className="h-5 w-5" />
            {completed.length === 0 ? "Começar o desafio" : `Continuar — Dia ${currentDay}`}
          </Link>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-bold text-brand-deep">Os 28 dias</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {DAYS.map((d) => {
              const done = completed.includes(d.day);
              const isCurrent = hydrated && d.day === currentDay && !done;
              const upcoming = !done && !isCurrent;
              return (
                <Link
                  key={d.day}
                  to="/dia/$day"
                  params={{ day: String(d.day) }}
                  className={[
                    "flex flex-col rounded-2xl border p-3 transition-colors",
                    done
                      ? "border-transparent bg-brand text-primary-foreground"
                      : isCurrent
                        ? "border-flame bg-flame-soft"
                        : "border-border bg-card hover:border-brand",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={[
                        "text-xs font-bold uppercase tracking-wide",
                        done ? "text-primary-foreground/80" : "text-muted-foreground",
                      ].join(" ")}
                    >
                      Dia {d.day}
                    </span>
                    {done ? (
                      <Check className="h-4 w-4" />
                    ) : isCurrent ? (
                      <Play className="h-4 w-4 text-flame" />
                    ) : (
                      <Lock className="h-3.5 w-3.5 text-muted-foreground/60" />
                    )}
                  </div>
                  <p
                    className={[
                      "mt-2 text-sm font-semibold leading-snug",
                      done ? "" : upcoming ? "text-foreground" : "text-brand-deep",
                    ].join(" ")}
                  >
                    {d.title}
                  </p>
                  <p
                    className={[
                      "mt-1 text-[11px]",
                      done ? "text-primary-foreground/70" : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {d.duration} · {d.difficulty}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {completed.length === total && (
          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-flame-soft p-4 text-flame">
            <Trophy className="h-6 w-6 shrink-0" />
            <p className="text-sm font-bold">
              Desafio completo! Você concluiu os 28 dias do protocolo.
            </p>
          </div>
        )}

        {completed.length > 0 && (
          <button
            onClick={() => {
              if (confirm("Zerar todo o progresso salvo?")) reset();
            }}
            className="mt-8 w-full rounded-2xl border border-border py-3 text-sm font-semibold text-muted-foreground"
          >
            Reiniciar progresso
          </button>
        )}
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-brand-soft px-2 py-3">
      <p className="text-xl font-extrabold text-brand-deep">{value}</p>
      <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
    </div>
  );
}
