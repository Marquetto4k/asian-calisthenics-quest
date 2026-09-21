import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Apple,
  ArrowLeft,
  Beef,
  Check,
  ChevronRight,
  Coffee,
  Droplets,
  Info,
  Leaf,
  Moon,
  Salad,
  Sandwich,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AppBottomNav } from "@/components/AppBottomNav";

const WATER_KEY = "pca-hidratacao";

export const Route = createFileRoute("/dieta")({
  head: () => ({
    meta: [
      { title: "Guia de alimentação — Protocolo Calistenia Asiática" },
      {
        name: "description",
        content: "Sugestões práticas de alimentação e hidratação para acompanhar o desafio.",
      },
    ],
  }),
  component: DietPage,
});

const meals = [
  {
    title: "Café da manhã",
    subtitle: "Energia para começar",
    icon: Coffee,
    color: "bg-amber-100 text-amber-700",
    options: [
      "Ovos mexidos + fruta + aveia",
      "Iogurte natural + banana + granola",
      "Pão integral + queijo branco + fruta",
    ],
  },
  {
    title: "Almoço",
    subtitle: "Prato simples e completo",
    icon: Sun,
    color: "bg-orange-100 text-orange-700",
    options: [
      "Arroz, feijão, frango e salada variada",
      "Batata, carne magra e legumes",
      "Macarrão, atum e vegetais refogados",
    ],
  },
  {
    title: "Lanche",
    subtitle: "Prático para a rotina",
    icon: Sandwich,
    color: "bg-sky-100 text-sky-700",
    options: [
      "Fruta + castanhas",
      "Sanduíche natural com proteína",
      "Iogurte ou vitamina de fruta",
    ],
  },
  {
    title: "Jantar",
    subtitle: "Recuperação sem complicação",
    icon: Moon,
    color: "bg-indigo-100 text-indigo-700",
    options: [
      "Omelete com legumes + arroz",
      "Frango ou peixe + batata + salada",
      "Sopa de legumes com proteína",
    ],
  },
];

function DietPage() {
  const [water, setWater] = useState(0);

  useEffect(() => {
    try {
      const stored = Number(window.localStorage.getItem(WATER_KEY));
      if (Number.isFinite(stored)) setWater(Math.min(Math.max(stored, 0), 8));
    } catch {
      /* Mantém o contador disponível mesmo sem armazenamento. */
    }
  }, []);

  function updateWater(next: number) {
    setWater(next);
    try {
      window.localStorage.setItem(WATER_KEY, String(next));
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="min-h-screen bg-background pb-28 font-sans text-foreground">
      <header className="hero-grid bg-brand-deep px-5 pb-16 pt-7 text-white sm:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/"
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/10 px-3 text-sm font-semibold text-white/85"
          >
            <ArrowLeft className="h-4 w-4" /> Painel
          </Link>
          <div className="mt-7 grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300">
            <Salad className="h-6 w-6" />
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-flame">
            Apoio ao protocolo
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Alimentação simples para os 28 dias
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
            Ideias acessíveis para montar refeições equilibradas sem transformar sua rotina em uma
            planilha complicada.
          </p>
        </div>
      </header>

      <main className="mx-auto -mt-9 max-w-3xl px-4 sm:px-8">
        <section className="rounded-[1.75rem] border border-white/70 bg-card p-5 shadow-[0_24px_55px_-30px_oklch(0.22_0.11_258/0.6)]">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-soft text-brand">
              <Leaf className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-flame">
                Regra visual
              </p>
              <h2 className="text-lg font-extrabold text-brand-deep">Monte seu prato</h2>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="col-span-2 rounded-2xl bg-emerald-100 p-4 text-emerald-800">
              <p className="text-2xl font-extrabold">½</p>
              <p className="text-sm font-bold">Legumes e verduras</p>
            </div>
            <PlatePart icon={Beef} fraction="¼" label="Proteína" />
            <PlatePart icon={Apple} fraction="¼" label="Carboidrato" />
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-border bg-card p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-600">
                <Droplets className="h-4 w-4" /> Hidratação de hoje
              </p>
              <h2 className="mt-2 text-xl font-extrabold text-brand-deep">{water} de 8 copos</h2>
            </div>
            <span className="rounded-full bg-sky-100 px-3 py-1.5 text-xs font-extrabold text-sky-700">
              {Math.round((water / 8) * 100)}%
            </span>
          </div>

          <div className="mt-4 grid grid-cols-8 gap-1.5">
            {Array.from({ length: 8 }, (_, index) => {
              const filled = index < water;
              return (
                <button
                  key={index}
                  type="button"
                  aria-label={`Registrar ${index + 1} copos de água`}
                  onClick={() => updateWater(index + 1 === water ? index : index + 1)}
                  className={[
                    "grid aspect-square place-items-center rounded-xl border transition active:scale-95",
                    filled
                      ? "border-sky-400 bg-sky-500 text-white"
                      : "border-sky-100 bg-sky-50 text-sky-300",
                  ].join(" ")}
                >
                  {filled ? <Check className="h-4 w-4" /> : <Droplets className="h-4 w-4" />}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
            Este contador é apenas um lembrete visual. Suas necessidades podem variar com clima,
            treino e orientação profissional.
          </p>
        </section>

        <section className="mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-flame">
            Ideias práticas
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-brand-deep">Escolha uma opção</h2>
          <div className="mt-4 space-y-3">
            {meals.map((meal) => {
              const Icon = meal.icon;
              return (
                <details
                  key={meal.title}
                  className="group rounded-3xl border border-border bg-card"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-3 p-4">
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${meal.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-extrabold text-brand-deep">{meal.title}</p>
                      <p className="text-xs text-muted-foreground">{meal.subtitle}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="border-t border-border px-4 pb-4 pt-3">
                    <ul className="space-y-2">
                      {meal.options.map((option) => (
                        <li
                          key={option}
                          className="flex gap-2 text-sm leading-relaxed text-foreground"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              );
            })}
          </div>
        </section>

        <section className="mt-7 grid gap-3 sm:grid-cols-2">
          <NutritionCard
            title="Antes do treino"
            text="Prefira algo leve, como fruta, pão, aveia ou iogurte, especialmente se for treinar logo depois."
          />
          <NutritionCard
            title="Depois do treino"
            text="Combine uma fonte de proteína com carboidrato e água para apoiar a recuperação."
          />
        </section>

        <aside className="mt-6 flex gap-3 rounded-3xl bg-muted p-4 text-muted-foreground">
          <Info className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-xs leading-relaxed">
            Conteúdo educativo e geral, não substitui avaliação individual. Se você possui doença,
            restrição alimentar ou objetivo clínico, procure nutricionista ou médico.
          </p>
        </aside>
      </main>

      <AppBottomNav />
    </div>
  );
}

function PlatePart({
  icon: Icon,
  fraction,
  label,
}: {
  icon: typeof Beef;
  fraction: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl bg-brand-soft p-4 text-brand-deep">
      <Icon className="h-5 w-5 text-flame" />
      <p className="mt-3 text-2xl font-extrabold">{fraction}</p>
      <p className="text-sm font-bold">{label}</p>
    </div>
  );
}

function NutritionCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <p className="text-sm font-extrabold text-brand-deep">{title}</p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}
