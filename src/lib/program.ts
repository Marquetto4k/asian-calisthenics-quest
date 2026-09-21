export type Exercise = {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  tip: string;
};

export type Day = {
  day: number;
  title: string;
  focus: string;
  duration: string;
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
  video: string;
  exercises: Exercise[];
};

const focusCycle: {
  title: string;
  focus: string;
  difficulty: Day["difficulty"];
  exercises: Exercise[];
}[] = [
  {
    title: "Fundamentos de Empurrar",
    focus: "Peito, ombros e tríceps",
    difficulty: "Iniciante",
    exercises: [
      {
        name: "Flexão Asiática (mãos diamante parcial)",
        sets: 4,
        reps: "8-12",
        rest: "60s",
        tip: "Cotovelos próximos ao corpo, corpo em linha reta.",
      },
      {
        name: "Pike Push-up",
        sets: 3,
        reps: "6-10",
        rest: "75s",
        tip: "Quadril alto, cabeça desce entre as mãos.",
      },
      {
        name: "Prancha com toque no ombro",
        sets: 3,
        reps: "40s",
        rest: "45s",
        tip: "Evite rodar o quadril ao tocar o ombro.",
      },
    ],
  },
  {
    title: "Força de Puxar",
    focus: "Costas e bíceps",
    difficulty: "Intermediário",
    exercises: [
      {
        name: "Barra Australiana",
        sets: 4,
        reps: "10-14",
        rest: "60s",
        tip: "Escápulas retraídas antes de puxar.",
      },
      {
        name: "Barra Fixa (ou negativa)",
        sets: 4,
        reps: "4-8",
        rest: "90s",
        tip: "Desça em 3 segundos se ainda não faz a positiva.",
      },
      {
        name: "Superman Hold",
        sets: 3,
        reps: "30s",
        rest: "45s",
        tip: "Aperte glúteos e lombar sem forçar o pescoço.",
      },
    ],
  },
  {
    title: "Pernas e Explosão",
    focus: "Quadríceps, glúteos e panturrilhas",
    difficulty: "Intermediário",
    exercises: [
      {
        name: "Agachamento Profundo Asiático",
        sets: 4,
        reps: "15-20",
        rest: "60s",
        tip: "Calcanhares no chão, peito aberto.",
      },
      {
        name: "Afundo Búlgaro",
        sets: 3,
        reps: "10 por perna",
        rest: "75s",
        tip: "Joelho da frente alinhado com o pé.",
      },
      {
        name: "Salto Agachado",
        sets: 3,
        reps: "12",
        rest: "60s",
        tip: "Aterrisse suave, absorvendo com os joelhos.",
      },
    ],
  },
  {
    title: "Core de Aço",
    focus: "Abdômen e estabilidade",
    difficulty: "Intermediário",
    exercises: [
      {
        name: "Hollow Body Hold",
        sets: 4,
        reps: "30-45s",
        rest: "45s",
        tip: "Lombar colada no chão o tempo todo.",
      },
      {
        name: "Elevação de Pernas Suspenso",
        sets: 3,
        reps: "8-12",
        rest: "60s",
        tip: "Controle a descida, sem balanço.",
      },
      {
        name: "Prancha Lateral",
        sets: 3,
        reps: "40s por lado",
        rest: "45s",
        tip: "Quadril elevado, corpo alinhado.",
      },
    ],
  },
  {
    title: "Mobilidade e Recuperação Ativa",
    focus: "Alongamento e respiração",
    difficulty: "Iniciante",
    exercises: [
      {
        name: "Fluxo de Mobilidade de Quadril",
        sets: 3,
        reps: "60s",
        rest: "30s",
        tip: "Respire fundo em cada posição.",
      },
      {
        name: "Cat-Cow + Rotação Torácica",
        sets: 3,
        reps: "10 ciclos",
        rest: "30s",
        tip: "Movimento lento, vértebra por vértebra.",
      },
      {
        name: "Alongamento de Isquiotibiais",
        sets: 3,
        reps: "45s por perna",
        rest: "30s",
        tip: "Nunca force até a dor.",
      },
    ],
  },
  {
    title: "Skill Day — Handstand",
    focus: "Equilíbrio e ombros",
    difficulty: "Avançado",
    exercises: [
      {
        name: "Parada de Mão na Parede",
        sets: 5,
        reps: "30s",
        rest: "60s",
        tip: "Costelas fechadas, olhar entre as mãos.",
      },
      {
        name: "Wall Walk",
        sets: 3,
        reps: "4 subidas",
        rest: "75s",
        tip: "Aproxime os pés da parede aos poucos.",
      },
      {
        name: "Elevação Lateral Isométrica",
        sets: 3,
        reps: "30s",
        rest: "45s",
        tip: "Ombros longe das orelhas.",
      },
    ],
  },
  {
    title: "Circuito Full Body",
    focus: "Condicionamento geral",
    difficulty: "Avançado",
    exercises: [
      {
        name: "Burpee Calistênico",
        sets: 4,
        reps: "12",
        rest: "60s",
        tip: "Mantenha o ritmo constante do início ao fim.",
      },
      {
        name: "Flexão + Agachamento (complexo)",
        sets: 4,
        reps: "10+10",
        rest: "75s",
        tip: "Sem pausa entre os dois movimentos.",
      },
      {
        name: "Mountain Climbers",
        sets: 3,
        reps: "45s",
        rest: "45s",
        tip: "Quadril baixo, core ativo.",
      },
    ],
  },
];

const videos = [
  "https://www.youtube.com/embed/IODxDxX7oi4",
  "https://www.youtube.com/embed/eGo4IYlbE5g",
  "https://www.youtube.com/embed/aclHkVaku9U",
  "https://www.youtube.com/embed/ASdvN_XEl_c",
  "https://www.youtube.com/embed/4pKly2JojMw",
  "https://www.youtube.com/embed/tzrEkyCBnFo",
  "https://www.youtube.com/embed/ml6cT4AZdqI",
];

export const DAYS: Day[] = Array.from({ length: 28 }, (_, i) => {
  const base = focusCycle[i % focusCycle.length];
  const week = Math.floor(i / 7) + 1;
  return {
    day: i + 1,
    title: base.title,
    focus: base.focus,
    duration: `${25 + (week - 1) * 5} min`,
    difficulty: base.difficulty,
    video: videos[i % videos.length],
    exercises: base.exercises.map((e) => ({
      ...e,
      sets: week >= 3 ? e.sets + 1 : e.sets,
    })),
  };
});

export function getDay(n: number): Day | undefined {
  return DAYS.find((d) => d.day === n);
}
