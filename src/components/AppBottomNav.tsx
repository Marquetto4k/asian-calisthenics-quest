import { Link, useRouterState } from "@tanstack/react-router";
import { Dumbbell, Gift, House, MessageCircle, Salad } from "lucide-react";

const items = [
  { to: "/", label: "Desafio", icon: House },
  { to: "/dieta", label: "Dieta", icon: Salad },
  { to: "/bonus", label: "Bônus", icon: Gift },
  { to: "/chat", label: "Ryuh", icon: MessageCircle },
] as const;

export function AppBottomNav() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-card/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_30px_-22px_oklch(0.2_0_0/0.32)] backdrop-blur-xl"
    >
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1 sm:gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);

          return (
            <Link
              key={item.to}
              to={item.to}
              className={[
                "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-2xl px-3 text-[11px] font-bold transition-colors",
                active ? "bg-brand-soft text-brand-deep" : "text-muted-foreground hover:bg-muted",
              ].join(" ")}
            >
              <Icon className={active ? "h-5 w-5 text-flame" : "h-5 w-5"} />
              {item.label}
            </Link>
          );
        })}
      </div>
      <span className="sr-only">
        <Dumbbell /> Protocolo Calistenia Asiática
      </span>
    </nav>
  );
}
