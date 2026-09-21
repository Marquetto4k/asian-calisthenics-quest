import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Clock3,
  HeartPulse,
  MessageCircle,
  RotateCcw,
  Salad,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { AppBottomNav } from "@/components/AppBottomNav";

type Message = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

const suggestions = [
  { label: "Não consigo fazer", icon: RotateCcw },
  { label: "Perdi um dia", icon: Clock3 },
  { label: "Senti dor", icon: HeartPulse },
  { label: "O que comer?", icon: Salad },
];

const welcome: Message = {
  id: 1,
  role: "assistant",
  text: "Olá! Sou o assistente do Protocolo. Posso ajudar com adaptações, rotina, timer e dúvidas básicas do desafio.",
};

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Assistente — Protocolo Calistenia Asiática" },
      {
        name: "description",
        content: "Respostas rápidas para acompanhar os treinos do desafio de 28 dias.",
      },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function ask(question: string) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || typing) return;

    const userMessage: Message = { id: Date.now(), role: "user", text: cleanQuestion };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setTyping(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: Date.now() + 1, role: "assistant", text: getAnswer(cleanQuestion) },
      ]);
      setTyping(false);
    }, 550);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(input);
  }

  return (
    <div className="min-h-screen bg-background pb-28 font-sans text-foreground">
      <header className="border-b border-border bg-card px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <Link
            to="/"
            aria-label="Voltar ao painel"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-muted text-brand-deep"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-deep text-white">
            <Bot className="h-5 w-5" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-emerald-500" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-extrabold text-brand-deep">Assistente do Protocolo</p>
            <p className="text-[11px] font-semibold text-emerald-600">
              Respostas rápidas disponíveis
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-11rem)] max-w-3xl flex-col px-4 py-5 sm:px-8">
        <section className="rounded-3xl bg-brand-soft/70 p-4">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.15em] text-brand">
            <Sparkles className="h-4 w-4 text-flame" /> Ajuda rápida
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Este chat funciona no próprio aplicativo e orienta sobre o uso do protocolo. Ele não
            substitui avaliação médica ou acompanhamento profissional.
          </p>
        </section>

        <div className="mt-5 flex-1 space-y-4" aria-live="polite">
          {messages.map((message) => (
            <div
              key={message.id}
              className={[
                "flex items-end gap-2",
                message.role === "user" ? "justify-end" : "justify-start",
              ].join(" ")}
            >
              {message.role === "assistant" && (
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-brand-deep text-white">
                  <Bot className="h-4 w-4" />
                </span>
              )}
              <div
                className={[
                  "max-w-[82%] rounded-3xl px-4 py-3 text-sm leading-relaxed",
                  message.role === "user"
                    ? "rounded-br-lg bg-flame text-white"
                    : "rounded-bl-lg border border-border bg-card text-foreground shadow-sm",
                ].join(" ")}
              >
                {message.text}
              </div>
              {message.role === "user" && (
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-flame-soft text-flame">
                  <UserRound className="h-4 w-4" />
                </span>
              )}
            </div>
          ))}

          {typing && (
            <div className="flex items-end gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-deep text-white">
                <Bot className="h-4 w-4" />
              </span>
              <div className="flex gap-1 rounded-3xl rounded-bl-lg border border-border bg-card px-4 py-4">
                <span className="typing-dot" />
                <span className="typing-dot [animation-delay:150ms]" />
                <span className="typing-dot [animation-delay:300ms]" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <section className="mt-6">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
            Perguntas rápidas
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {suggestions.map((suggestion) => {
              const Icon = suggestion.icon;
              return (
                <button
                  key={suggestion.label}
                  type="button"
                  onClick={() => ask(suggestion.label)}
                  className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-xs font-bold text-brand-deep shadow-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-flame" /> {suggestion.label}
                </button>
              );
            })}
          </div>
        </section>

        <form
          onSubmit={submit}
          className="mt-3 flex gap-2 rounded-3xl border border-border bg-card p-2 shadow-sm"
        >
          <label htmlFor="chat-question" className="sr-only">
            Digite sua dúvida
          </label>
          <input
            id="chat-question"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Digite sua dúvida..."
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={!input.trim() || typing}
            aria-label="Enviar pergunta"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-flame text-white transition active:scale-95 disabled:bg-muted disabled:text-muted-foreground"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

        <Link
          to="/"
          className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-brand"
        >
          <CheckCircle2 className="h-4 w-4" /> Voltar para o treino de hoje
        </Link>
      </main>

      <AppBottomNav />
    </div>
  );
}

function getAnswer(question: string): string {
  const normalized = question.toLocaleLowerCase("pt-BR");

  if (normalized.includes("dor") || normalized.includes("machu") || normalized.includes("tont")) {
    return "Pare o exercício agora. Dor forte, tontura, falta de ar incomum ou mal-estar não devem ser ignorados. Descanse e procure avaliação profissional se o sintoma persistir ou for intenso.";
  }

  if (
    normalized.includes("perdi") ||
    normalized.includes("faltei") ||
    normalized.includes("pulei")
  ) {
    return "Sem problema. Não tente fazer dois treinos intensos no mesmo dia para compensar. Retome pelo próximo dia pendente e siga sua sequência normalmente.";
  }

  if (
    normalized.includes("não consigo") ||
    normalized.includes("nao consigo") ||
    normalized.includes("difícil") ||
    normalized.includes("dificil") ||
    normalized.includes("adapt")
  ) {
    return "Reduza as repetições, aumente o descanso e use uma versão mais simples do movimento. Na flexão, por exemplo, apoie os joelhos ou faça com as mãos em uma superfície elevada. O importante é manter controle e boa forma.";
  }

  if (
    normalized.includes("comer") ||
    normalized.includes("aliment") ||
    normalized.includes("dieta")
  ) {
    return "Antes do treino, escolha algo leve e fácil de digerir. Depois, combine proteína, carboidrato e água. A área Dieta possui opções simples para cada refeição.";
  }

  if (
    normalized.includes("timer") ||
    normalized.includes("tempo") ||
    normalized.includes("minuto")
  ) {
    return "Cada exercício possui seu próprio bloco de 5 ou 7 minutos. Toque em iniciar, faça as séries no seu ritmo usando as pausas indicadas e, quando terminar, marque o exercício como feito.";
  }

  if (normalized.includes("descanso") || normalized.includes("cansado")) {
    return "Respeite o descanso indicado no card. Se ainda estiver muito ofegante ou sem controle do movimento, descanse um pouco mais antes de continuar.";
  }

  return "Para avançar com segurança, reduza a intensidade quando necessário, siga a dica exibida no card e marque o exercício somente depois de terminar. Você também pode perguntar sobre adaptação, descanso, timer ou alimentação.";
}
