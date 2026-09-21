import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Apple,
  ArrowLeft,
  Beef,
  Check,
  ChevronRight,
  Coffee,
  Droplets,
  Dumbbell,
  Info,
  Leaf,
  Moon,
  Salad,
  Sandwich,
  ShoppingBasket,
  Sun,
  WalletCards,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AppBottomNav } from "@/components/AppBottomNav";

const WATER_KEY = "pca-hidratacao";

export const Route = createFileRoute("/dieta")({
  head: () => ({
    meta: [
      { title: "Alimentação econômica 40+ — Protocolo Calistenia Asiática" },
      {
        name: "description",
        content:
          "Guia alimentar prático e econômico para homens acima de 40 anos que acompanham o desafio.",
      },
    ],
  }),
  component: DietPage,
});

const principles = [
  {
    title: "Comida de verdade",
    text: "Arroz, feijão, ovos, frango, sardinha, frutas e vegetais formam uma base simples.",
    icon: Leaf,
  },
  {
    title: "Proteína nas refeições",
    text: "Inclua uma fonte de proteína nas refeições principais para apoiar treino e recuperação.",
    icon: Dumbbell,
  },
  {
    title: "Rotina possível",
    text: "Repita combinações, prepare porções e escolha alimentos que realmente cabem no orçamento.",
    icon: WalletCards,
  },
];

const meals = [
  {
    title: "Café da manhã",
    subtitle: "Simples, barato e com saciedade",
    icon: Coffee,
    color: "bg-amber-100 text-amber-700",
    options: [
      "2 ovos mexidos + banana com aveia",
      "Pão comum ou integral + 2 ovos + uma fruta da estação",
      "Aveia preparada com leite + banana e canela",
    ],
  },
  {
    title: "Almoço",
    subtitle: "Use arroz e feijão como base",
    icon: Sun,
    color: "bg-orange-100 text-orange-700",
    options: [
      "Arroz + feijão + frango + salada ou legume da estação",
      "Arroz + feijão + 2 ovos + couve ou cenoura",
      "Batata + sardinha + feijão + vegetais refogados",
    ],
  },
  {
    title: "Lanche",
    subtitle: "Para não depender de produtos caros",
    icon: Sandwich,
    color: "bg-sky-100 text-sky-700",
    options: [
      "Banana + um pequeno punhado de amendoim sem sal",
      "Ovo cozido + fruta da estação",
      "Iogurte natural + aveia, quando estiver dentro do orçamento",
    ],
  },
  {
    title: "Jantar",
    subtitle: "Reaproveite a base do almoço",
    icon: Moon,
    color: "bg-indigo-100 text-indigo-700",
    options: [
      "Arroz + feijão + frango ou ovos + legumes",
      "Omelete com vegetais + arroz e feijão",
      "Sopa de feijão com legumes + ovo cozido",
    ],
  },
];

const shoppingGroups = [
  {
    title: "Base",
    items: "Arroz, feijão, aveia, batata e pão",
  },
  {
    title: "Proteínas",
    items: "Ovos, frango, sardinha e leite ou iogurte",
  },
  {
    title: "Complementos",
    items: "Banana, amendoim sem sal e vegetais da estação",
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
      /* Mantém o recurso utilizável quando o armazenamento estiver indisponível. */
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
            Guia prático • Homens 40+
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Alimentação econômica para acompanhar o treino
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
            Uma rotina simples, feita com alimentos acessíveis, para apoiar energia, força,
            recuperação e saciedade sem depender de suplementos ou receitas caras.
          </p>
        </div>
      </header>

      <main className="mx-auto -mt-9 max-w-3xl px-4 sm:px-8">
        <section className="rounded-[1.75rem] border border-white/70 bg-card p-5 shadow-[0_24px_55px_-30px_oklch(0.22_0.11_258/0.6)]">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-flame">
            O que importa depois dos 40
          </p>
          <h2 className="mt-1 text-xl font-extrabold text-brand-deep">
            Constância antes de complicação
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <div key={principle.title} className="rounded-2xl bg-muted p-4">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-brand shadow-sm">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-3 text-sm font-extrabold text-brand-deep">{principle.title}</h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    {principle.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-soft text-brand">
              <Leaf className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-flame">
                Regra visual
              </p>
              <h2 className="text-lg font-extrabold text-brand-deep">Monte um prato econômico</h2>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="col-span-2 rounded-2xl bg-emerald-100 p-4 text-emerald-800">
              <p className="text-2xl font-extrabold">½</p>
              <p className="text-sm font-bold">Legumes e verduras disponíveis</p>
              <p className="mt-1 text-[11px]">Prefira os da estação e varie quando puder.</p>
            </div>
            <PlatePart
              icon={Beef}
              fraction="¼"
              label="Proteína"
              helper="Ovos, frango ou sardinha"
            />
            <PlatePart
              icon={Apple}
              fraction="¼"
              label="Carboidrato"
              helper="Arroz, batata ou mandioca"
            />
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
            O feijão pode acompanhar o prato como fonte acessível de leguminosas. Ajuste a
            quantidade ao apetite, ao treino e às orientações do seu profissional de saúde.
          </p>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-border bg-card p-5">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-amber-100 text-amber-700">
              <ShoppingBasket className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-flame">
                Compra inteligente
              </p>
              <h2 className="text-lg font-extrabold text-brand-deep">Base barata da semana</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Compre primeiro os alimentos que entram em várias refeições.
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {shoppingGroups.map((group) => (
              <div key={group.title} className="rounded-2xl bg-muted px-4 py-3">
                <p className="text-xs font-extrabold text-brand-deep">{group.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {group.items}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-border bg-card p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-600">
                <Droplets className="h-4 w-4" /> Lembrete de água
              </p>
              <h2 className="mt-2 text-xl font-extrabold text-brand-deep">
                {water} de 8 marcações
              </h2>
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
                  aria-label={`Registrar marcação ${index + 1} de água`}
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
            Use as oito marcações apenas para acompanhar sua rotina. A necessidade de líquidos varia
            conforme corpo, clima, treino, medicamentos e condições de saúde.
          </p>
        </section>

        <section className="mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-flame">
            Cardápio sem frescura
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-brand-deep">
            Escolha uma opção por refeição
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Não é necessário consumir todas as opções. Escolha a combinação possível para o seu dia
            e repita sem culpa.
          </p>
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
            text="Se estiver com fome, escolha algo simples e leve: banana com aveia, pão com ovo ou uma porção pequena da refeição habitual."
          />
          <NutritionCard
            title="Depois do treino"
            text="Faça a próxima refeição com proteína, arroz ou batata, feijão, vegetais e água. Não é obrigatório comprar suplemento."
          />
        </section>

        <section className="mt-6 rounded-[1.75rem] bg-brand-deep p-5 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-flame">
            Economize de verdade
          </p>
          <h2 className="mt-1 text-xl font-extrabold">Três hábitos que reduzem o gasto</h2>
          <ul className="mt-4 space-y-3 text-xs leading-relaxed text-white/75">
            <li className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              Cozinhe arroz, feijão e frango em porções e armazene corretamente para outros dias.
            </li>
            <li className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              Compare o preço por quilo e prefira frutas, verduras e legumes da estação.
            </li>
            <li className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              Use primeiro o que já tem em casa; suplementos não são o ponto de partida deste guia.
            </li>
          </ul>
        </section>

        <aside className="mt-6 rounded-3xl bg-muted p-4 text-muted-foreground">
          <div className="flex gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-xs leading-relaxed">
              Este é um guia educativo geral, não uma prescrição individual. Homens com diabetes,
              hipertensão, doença renal, restrições alimentares, uso contínuo de medicamentos ou
              outro objetivo clínico devem conversar com médico ou nutricionista antes de mudar a
              alimentação.
            </p>
          </div>
          <div className="mt-3 border-t border-border pt-3 text-[10px] leading-relaxed">
            Referências:{" "}
            <a
              href="https://www.gov.br/saude/pt-br/assuntos/saude-brasil/eu-quero-me-alimentar-melhor/noticias/2021/in-natura-processados-ultraprocessados-conheca-os-tipos-de-alimento"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-brand underline underline-offset-2"
            >
              Ministério da Saúde
            </a>{" "}
            e{" "}
            <a
              href="https://www.paho.org/pt/topicos/alimentacao-saudavel"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-brand underline underline-offset-2"
            >
              OPAS/OMS
            </a>
            .
          </div>
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
  helper,
}: {
  icon: typeof Beef;
  fraction: string;
  label: string;
  helper: string;
}) {
  return (
    <div className="rounded-2xl bg-brand-soft p-4 text-brand-deep">
      <Icon className="h-5 w-5 text-flame" />
      <p className="mt-3 text-2xl font-extrabold">{fraction}</p>
      <p className="text-sm font-bold">{label}</p>
      <p className="mt-1 text-[10px] leading-relaxed opacity-70">{helper}</p>
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
