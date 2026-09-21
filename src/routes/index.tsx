import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Flame,
  MessageCircle,
  Play,
  Salad,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AppBottomNav } from "@/components/AppBottomNav";
import { DAYS } from "@/lib/program";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { completed, exercises, percent, streak, currentDay, total, reset, hydrated } =
    useProgress();
  const [selectedWeek, setSelectedWeek] = useState(1);

  useEffect(() => {
    if (hydrated) setSelectedWeek(Math.min(Math.ceil(currentDay / 7), 4));
  }, [currentDay, hydrated]);

  const weekDays = DAYS.filter((day) => day.week === selectedWeek);
  const challengeDone = completed.length === total;

  return (
    <div className="min-h-screen bg-background pb-28 font-sans text-foreground">
      <header className="hero-grid overflow-hidden bg-brand-deep px-5 pb-20 pt-8 text-primary-foreground sm:px-8 sm:pb-24 sm:pt-12">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-flame">
            <Sparkles className="h-3.5 w-3.5" /> Protocolo exclusivo
          </div>
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground/70">
            Calistenia Asiática
          </p>
          <h1 className="mt-1 max-w-2xl text-[clamp(2.25rem,10vw,4.75rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
            Desafio <span className="text-flame">28 dias</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
            Treinos curtos, guiados e possíveis de fazer em casa. Abra o dia, siga o exercício e
            marque cada etapa concluída.
          </p>
        </div>
      </header>

      <main className="mx-auto -mt-12 max-w-4xl px-4 sm:px-8">
        <section className="rounded-[1.75rem] border border-white/70 bg-card p-5 shadow-[0_24px_55px_-30px_oklch(0.22_0.11_258/0.6)] sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Seu progresso</p>
              <p className="mt-1 text-4xl font-extrabold tracking-tight text-brand-deep">
                {percent}%
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-full bg-flame-soft px-3 py-2 text-flame">
              <Flame className="h-4 w-4" />
              <span className="text-xs font-bold">{streak} dias seguidos</span>
            </div>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-brand-soft">
            <div
              className="h-full rounded-full bg-gradient-to-r from-flame to-orange-400 transition-all duration-700"
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <Stat label="Concluídos" value={completed.length} />
            <Stat label="Restantes" value={total - completed.length} />
            <Stat label="Sequência" value={streak} suffix=" dias" />
          </div>

          <Link
            to="/dia/$day"
            params={{ day: String(challengeDone ? 28 : currentDay) }}
            className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-flame px-5 py-4 text-center text-sm font-extrabold text-accent-foreground shadow-[0_12px_28px_-14px_oklch(0.7_0.18_48/0.8)] transition active:scale-[0.98] sm:text-base"
          >
            {challengeDone ? <Trophy className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            {challengeDone
              ? "Revisitar o último treino"
              : completed.length === 0
                ? "Começar pelo Dia 1"
                : `Continuar no Dia ${currentDay}`}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <section className="mt-7 grid grid-cols-2 gap-3">
          <Link
            to="/dieta"
            className="group rounded-3xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Salad className="h-5 w-5" />
            </span>
            <p className="mt-4 text-sm font-extrabold text-brand-deep">Guia de alimentação</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Sugestões simples para acompanhar o desafio.
            </p>
            <ChevronRight className="mt-3 h-4 w-4 text-flame transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/chat"
            className="group rounded-3xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-soft text-brand">
              <MessageCircle className="h-5 w-5" />
            </span>
            <p className="mt-4 text-sm font-extrabold text-brand-deep">Assistente do protocolo</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Tire dúvidas rápidas durante o treino.
            </p>
            <ChevronRight className="mt-3 h-4 w-4 text-flame transition-transform group-hover:translate-x-1" />
          </Link>
        </section>

        <section className="mt-9">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-flame">
                Sua jornada
              </p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-brand-deep">
                Os 28 dias
              </h2>
            </div>
            <p className="text-xs font-semibold text-muted-foreground">
              {completed.length}/{total} completos
            </p>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2 rounded-2xl bg-brand-soft p-1.5">
            {[1, 2, 3, 4].map((week) => (
              <button
                key={week}
                type="button"
                onClick={() => setSelectedWeek(week)}
                className={[
                  "rounded-xl px-2 py-2.5 text-xs font-bold transition",
                  selectedWeek === week
                    ? "bg-card text-brand-deep shadow-sm"
                    : "text-muted-foreground",
                ].join(" ")}
              >
                Semana {week}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            {weekDays.map((day) => {
              const done = completed.includes(day.day);
              const isCurrent = hydrated && day.day === currentDay && !done;
              const checkedCount = exercises[String(day.day)]?.length ?? 0;

              return (
                <Link
                  key={day.day}
                  to="/dia/$day"
                  params={{ day: String(day.day) }}
                  className={[
                    "group grid grid-cols-[5.5rem_minmax(0,1fr)_auto] items-center gap-3 overflow-hidden rounded-3xl border bg-card p-2.5 transition active:scale-[0.99]",
                    done
                      ? "border-brand/30 bg-brand-soft/50"
                      : isCurrent
                        ? "border-flame/50 shadow-[0_12px_30px_-24px_oklch(0.7_0.18_48/0.8)]"
                        : "border-border hover:border-brand/30",
                  ].join(" ")}
                >
                  <div className="relative h-20 overflow-hidden rounded-2xl bg-muted">
                    <img
                      src={day.image}
                      alt=""
                      width={352}
                      height={264}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <span className="absolute left-2 top-2 rounded-full bg-brand-deep/90 px-2 py-1 text-[10px] font-extrabold text-white backdrop-blur">
                      DIA {day.day}
                    </span>
                  </div>

                  <div className="min-w-0 py-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-extrabold text-brand-deep">{day.title}</p>
                      {isCurrent && (
                        <span className="rounded-full bg-flame-soft px-2 py-0.5 text-[9px] font-extrabold uppercase text-flame">
                          Agora
                        </span>
                      )}
                    </div>
                    <p className="mt-1 truncate text-[11px] text-muted-foreground">
                      {day.duration} · {day.difficulty}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground">
                      {checkedCount === day.exercises.length ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand" />
                      ) : (
                        <Circle className="h-3.5 w-3.5" />
                      )}
                      {checkedCount}/{day.exercises.length} exercícios
                    </div>
                  </div>

                  <span
                    className={[
                      "grid h-9 w-9 place-items-center rounded-full",
                      done
                        ? "bg-brand text-white"
                        : isCurrent
                          ? "bg-flame text-white"
                          : "bg-muted text-muted-foreground",
                    ].join(" ")}
                  >
                    {done ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {challengeDone && (
          <div className="mt-8 flex items-center gap-3 rounded-3xl bg-flame-soft p-5 text-flame">
            <Trophy className="h-7 w-7 shrink-0" />
            <div>
              <p className="font-extrabold">Desafio completo!</p>
              <p className="mt-0.5 text-xs font-medium">Você concluiu os 28 dias do protocolo.</p>
            </div>
          </div>
        )}

        <p className="mt-8 rounded-2xl bg-muted px-4 py-3 text-xs leading-relaxed text-muted-foreground">
          Respeite seus limites. Interrompa o exercício em caso de dor, tontura ou mal-estar e
          procure orientação profissional quando necessário.
        </p>

        {completed.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Deseja apagar todo o progresso salvo neste dispositivo?"))
                reset();
            }}
            className="mt-5 w-full rounded-2xl border border-border py-3 text-xs font-semibold text-muted-foreground"
          >
            Reiniciar todo o progresso
          </button>
        )}
      </main>

      <AppBottomNav />
    </div>
  );
}

function Stat({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="rounded-2xl bg-brand-soft px-2 py-3">
      <p className="text-lg font-extrabold text-brand-deep">
        {value}
        <span className="text-[10px] font-semibold text-muted-foreground">{suffix}</span>
      </p>
      <p className="text-[10px] font-semibold text-muted-foreground">{label}</p>
    </div>
  );
}
