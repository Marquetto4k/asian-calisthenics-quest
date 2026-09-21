export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  tip: string;
  timerMinutes: 5 | 7;
  image: string;
  imageAlt: string;
};

export type Day = {
  day: number;
  week: number;
  phase: string;
  title: string;
  focus: string;
  duration: string;
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
  image: string;
  imageAlt: string;
  exercises: Exercise[];
};

type FocusDay = Omit<Day, "day" | "week" | "phase" | "duration">;

const images = {
  push: "/exercises/push.webp",
  pull: "/exercises/pull.webp",
  legs: "/exercises/legs.webp",
  core: "/exercises/core.webp",
  mobility: "/exercises/mobility.webp",
  handstand: "/exercises/handstand.webp",
  fullBody: "/exercises/full-body.webp",
};

const focusCycle: FocusDay[] = [
  {
    title: "Fundamentos de Empurrar",
    focus: "Peito, ombros e tríceps",
    difficulty: "Iniciante",
    image: images.push,
    imageAlt: "Atleta demonstrando uma flexão com alinhamento corporal correto",
    exercises: [
      {
        id: "flexao-controlada",
        name: "Flexão controlada",
        sets: 4,
        reps: "8 a 12 repetições",
        rest: "45 segundos",
        timerMinutes: 7,
        image: images.push,
        imageAlt: "Demonstração de flexão controlada em um tapete de exercícios",
        tip: "Mantenha os cotovelos próximos do corpo e forme uma linha reta dos ombros aos pés.",
      },
      {
        id: "pike-push-up",
        name: "Pike push-up",
        sets: 3,
        reps: "6 a 10 repetições",
        rest: "60 segundos",
        timerMinutes: 5,
        image: images.push,
        imageAlt: "Atleta em posição de exercício para ombros",
        tip: "Eleve o quadril e leve a cabeça na direção do espaço entre as mãos.",
      },
      {
        id: "prancha-toque-ombro",
        name: "Prancha com toque no ombro",
        sets: 3,
        reps: "30 segundos",
        rest: "40 segundos",
        timerMinutes: 5,
        image: images.core,
        imageAlt: "Atleta mantendo o corpo alinhado em posição de prancha",
        tip: "Contraia o abdômen e tente não girar o quadril durante os toques.",
      },
    ],
  },
  {
    title: "Força de Puxar",
    focus: "Costas e bíceps",
    difficulty: "Intermediário",
    image: images.pull,
    imageAlt: "Atleta demonstrando uma remada australiana em barra baixa",
    exercises: [
      {
        id: "barra-australiana",
        name: "Barra australiana",
        sets: 4,
        reps: "10 a 14 repetições",
        rest: "60 segundos",
        timerMinutes: 7,
        image: images.pull,
        imageAlt: "Demonstração de barra australiana com o corpo alinhado",
        tip: "Retraia as escápulas antes de puxar o peito na direção da barra.",
      },
      {
        id: "barra-negativa",
        name: "Barra fixa negativa",
        sets: 4,
        reps: "4 a 8 repetições",
        rest: "75 segundos",
        timerMinutes: 7,
        image: images.pull,
        imageAlt: "Atleta treinando o movimento de puxada em uma barra",
        tip: "Suba com apoio e controle a descida por aproximadamente três segundos.",
      },
      {
        id: "superman-hold",
        name: "Superman hold",
        sets: 3,
        reps: "30 segundos",
        rest: "40 segundos",
        timerMinutes: 5,
        image: images.core,
        imageAlt: "Atleta realizando exercício de estabilidade para o tronco",
        tip: "Ative glúteos e lombar sem levantar demais o queixo.",
      },
    ],
  },
  {
    title: "Pernas e Controle",
    focus: "Quadríceps, glúteos e panturrilhas",
    difficulty: "Intermediário",
    image: images.legs,
    imageAlt: "Atleta demonstrando um agachamento profundo com os braços à frente",
    exercises: [
      {
        id: "agachamento-profundo",
        name: "Agachamento profundo",
        sets: 4,
        reps: "12 a 18 repetições",
        rest: "45 segundos",
        timerMinutes: 7,
        image: images.legs,
        imageAlt: "Demonstração de agachamento profundo com os calcanhares apoiados",
        tip: "Mantenha os calcanhares apoiados e os joelhos acompanhando a direção dos pés.",
      },
      {
        id: "afundo-alternado",
        name: "Afundo alternado",
        sets: 3,
        reps: "10 por perna",
        rest: "60 segundos",
        timerMinutes: 7,
        image: images.legs,
        imageAlt: "Atleta em treino de pernas dentro de casa",
        tip: "Desça com controle e mantenha o joelho da frente alinhado com o pé.",
      },
      {
        id: "elevacao-panturrilha",
        name: "Elevação de panturrilha",
        sets: 3,
        reps: "18 repetições",
        rest: "35 segundos",
        timerMinutes: 5,
        image: images.legs,
        imageAlt: "Atleta demonstrando exercício de pernas sem equipamentos",
        tip: "Suba devagar, faça uma pausa no alto e retorne sem deixar o calcanhar despencar.",
      },
    ],
  },
  {
    title: "Core de Aço",
    focus: "Abdômen e estabilidade",
    difficulty: "Intermediário",
    image: images.core,
    imageAlt: "Atleta demonstrando uma prancha de antebraços com postura correta",
    exercises: [
      {
        id: "prancha-frontal",
        name: "Prancha frontal",
        sets: 4,
        reps: "30 a 45 segundos",
        rest: "40 segundos",
        timerMinutes: 7,
        image: images.core,
        imageAlt: "Demonstração de prancha frontal em um tapete",
        tip: "Alinhe ombros, quadril e calcanhares e mantenha o abdômen firme.",
      },
      {
        id: "elevacao-pernas",
        name: "Elevação de pernas",
        sets: 3,
        reps: "8 a 12 repetições",
        rest: "50 segundos",
        timerMinutes: 5,
        image: images.core,
        imageAlt: "Atleta realizando exercício controlado para o abdômen",
        tip: "Controle a descida e mantenha a lombar apoiada durante todo o movimento.",
      },
      {
        id: "prancha-lateral",
        name: "Prancha lateral",
        sets: 3,
        reps: "30 segundos por lado",
        rest: "40 segundos",
        timerMinutes: 5,
        image: images.core,
        imageAlt: "Atleta em exercício de estabilidade e controle corporal",
        tip: "Empurre o chão com o antebraço e mantenha o quadril elevado.",
      },
    ],
  },
  {
    title: "Mobilidade Essencial",
    focus: "Quadril, coluna e recuperação",
    difficulty: "Iniciante",
    image: images.mobility,
    imageAlt: "Atleta realizando alongamento de mobilidade do quadril na posição 90 por 90",
    exercises: [
      {
        id: "mobilidade-quadril",
        name: "Mobilidade 90/90",
        sets: 3,
        reps: "45 segundos por lado",
        rest: "30 segundos",
        timerMinutes: 5,
        image: images.mobility,
        imageAlt: "Demonstração do alongamento de quadril 90 por 90",
        tip: "Mantenha a coluna alta e avance apenas até sentir uma tensão confortável.",
      },
      {
        id: "cat-cow",
        name: "Cat-cow com rotação",
        sets: 3,
        reps: "10 ciclos",
        rest: "30 segundos",
        timerMinutes: 5,
        image: images.mobility,
        imageAlt: "Atleta em sessão leve de mobilidade dentro de casa",
        tip: "Faça movimentos lentos e sincronize cada fase com a respiração.",
      },
      {
        id: "alongamento-posterior",
        name: "Alongamento posterior",
        sets: 3,
        reps: "40 segundos por perna",
        rest: "30 segundos",
        timerMinutes: 5,
        image: images.mobility,
        imageAlt: "Atleta realizando alongamento leve em um tapete",
        tip: "Não force até a dor; respire e aumente a amplitude aos poucos.",
      },
    ],
  },
  {
    title: "Skill — Parada de Mão",
    focus: "Equilíbrio, ombros e confiança",
    difficulty: "Avançado",
    image: images.handstand,
    imageAlt: "Atleta praticando parada de mão com apoio seguro na parede",
    exercises: [
      {
        id: "handstand-parede",
        name: "Parada de mão na parede",
        sets: 5,
        reps: "20 a 30 segundos",
        rest: "60 segundos",
        timerMinutes: 7,
        image: images.handstand,
        imageAlt: "Demonstração de parada de mão com os pés apoiados na parede",
        tip: "Use uma parede livre, empurre o chão e interrompa se perder o controle.",
      },
      {
        id: "wall-walk",
        name: "Wall walk parcial",
        sets: 3,
        reps: "3 subidas",
        rest: "60 segundos",
        timerMinutes: 7,
        image: images.handstand,
        imageAlt: "Atleta em treino de equilíbrio com apoio da parede",
        tip: "Aproxime-se da parede apenas até o ponto em que mantém domínio do movimento.",
      },
      {
        id: "pike-isometrico",
        name: "Pike isométrico",
        sets: 3,
        reps: "30 segundos",
        rest: "40 segundos",
        timerMinutes: 5,
        image: images.push,
        imageAlt: "Atleta treinando estabilidade dos ombros no chão",
        tip: "Mantenha os ombros longe das orelhas e distribua o peso entre as mãos.",
      },
    ],
  },
  {
    title: "Circuito Corpo Inteiro",
    focus: "Condicionamento geral",
    difficulty: "Avançado",
    image: images.fullBody,
    imageAlt: "Atleta demonstrando mountain climber em um treino de corpo inteiro",
    exercises: [
      {
        id: "mountain-climber",
        name: "Mountain climber",
        sets: 4,
        reps: "35 segundos",
        rest: "40 segundos",
        timerMinutes: 7,
        image: images.fullBody,
        imageAlt: "Demonstração de mountain climber com as mãos apoiadas no tapete",
        tip: "Mantenha as mãos sob os ombros e leve um joelho de cada vez ao peito.",
      },
      {
        id: "flexao-agachamento",
        name: "Flexão + agachamento",
        sets: 4,
        reps: "8 + 12 repetições",
        rest: "60 segundos",
        timerMinutes: 7,
        image: images.fullBody,
        imageAlt: "Atleta realizando um circuito de calistenia dentro de casa",
        tip: "Faça os dois movimentos com controle antes de aumentar a velocidade.",
      },
      {
        id: "marcha-prancha",
        name: "Marcha na prancha",
        sets: 3,
        reps: "30 segundos",
        rest: "40 segundos",
        timerMinutes: 5,
        image: images.core,
        imageAlt: "Atleta realizando exercício de prancha para o corpo inteiro",
        tip: "Mantenha o quadril estável enquanto alterna os apoios.",
      },
    ],
  },
];

const phases = ["Base", "Controle", "Força", "Domínio"];

export const DAYS: Day[] = Array.from({ length: 28 }, (_, index) => {
  const base = focusCycle[index % focusCycle.length]!;
  const week = Math.floor(index / 7) + 1;
  const exercises = base.exercises.map((exercise) => ({
    ...exercise,
    sets: week >= 3 ? exercise.sets + 1 : exercise.sets,
  }));
  const totalMinutes = exercises.reduce((total, exercise) => total + exercise.timerMinutes, 0);

  return {
    ...base,
    day: index + 1,
    week,
    phase: phases[week - 1]!,
    duration: `${totalMinutes} min`,
    exercises,
  };
});

export function getDay(day: number): Day | undefined {
  return DAYS.find((item) => item.day === day);
}
