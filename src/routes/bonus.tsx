import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Gift,
  HeartPulse,
  MoonStar,
  Salad,
} from "lucide-react";
import { AppBottomNav } from "@/components/AppBottomNav";

const BONUS_DRIVE_URL =
  "https://drive.google.com/drive/folders/1brIKAxwrMoCwMnGcXkBWsXXkQb7UBbwy?usp=drive_link";

const bonuses = [
  {
    title: "Protocolo Anticortisol Noturno",
    description: "Uma rotina noturna simples para desacelerar o corpo e preparar uma noite melhor.",
    icon: MoonStar,
  },
  {
    title: "Cardápio Anti-inflamatório",
    description: "Receitas simples e acessíveis pensadas para a rotina do homem brasileiro.",
    icon: Salad,
  },
  {
    title: "Guia do Desempenho Sexual",
    description: "Hábitos práticos para apoiar disposição, confiança e bem-estar masculino.",
    icon: HeartPulse,
  },
];

export const Route = createFileRoute("/bonus")({
  head: () => ({
    meta: [
      { title: "Seus bônus — Protocolo Calistenia Asiática" },
      {
        name: "description",
        content: "Acesse os três materiais bônus do Protocolo Calistenia Asiática.",
      },
    ],
  }),
  component: BonusPage,
});

function BonusPage() {
  return (
    <div className="min-h-screen bg-background pb-28 font-sans text-foreground">
      <header className="hero-grid overflow-hidden bg-brand-deep px-5 pb-16 pt-7 text-white sm:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/"
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/10 px-3 text-sm font-semibold text-white/85"
          >
            <ArrowLeft className="h-4 w-4" /> Painel
          </Link>

          <div className="mt-7 grid h-12 w-12 place-items-center rounded-2xl bg-flame text-white shadow-lg shadow-flame/20">
            <Gift className="h-6 w-6" />
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-flame">
            Conteúdos complementares
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Seus bônus estão liberados
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
            Você recebe três materiais extras para complementar o Desafio de 28 Dias e consultar
            sempre que precisar.
          </p>
        </div>
      </header>

      <main className="mx-auto -mt-9 max-w-3xl px-4 sm:px-8">
        <section className="rounded-[1.75rem] border border-white/70 bg-card p-5 shadow-[0_24px_55px_-30px_oklch(0.22_0_0/0.38)] sm:p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-flame-soft text-flame">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-flame">
                Incluso no seu acesso
              </p>
              <h2 className="text-lg font-extrabold text-brand-deep">3 bônus especiais</h2>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {bonuses.map((bonus, index) => {
              const Icon = bonus.icon;

              return (
                <article
                  key={bonus.title}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-background p-4"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-deep text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-flame">
                      Bônus {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-0.5 text-sm font-extrabold text-brand-deep">{bonus.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {bonus.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <a
            href={BONUS_DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-flame px-5 py-4 text-center text-sm font-extrabold text-white shadow-[0_12px_28px_-14px_oklch(0.55_0.22_28/0.55)] transition hover:brightness-105 active:scale-[0.98] sm:text-base"
          >
            Acessar meus bônus
            <ArrowUpRight className="h-5 w-5" />
          </a>

          <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
            O botão abre a pasta com os materiais no Google Drive.
          </p>
        </section>

        <p className="mt-6 rounded-2xl bg-muted px-4 py-3 text-xs leading-relaxed text-muted-foreground">
          Os conteúdos são educativos e não substituem avaliação ou orientação individual de um
          profissional de saúde.
        </p>
      </main>

      <AppBottomNav />
    </div>
  );
}
