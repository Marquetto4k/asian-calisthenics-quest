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
  instructions: [string, string, string];
  avoid: string;
  easier: string;
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

type ExerciseGuidance = Pick<Exercise, "instructions" | "avoid" | "easier">;
type FocusExercise = Omit<Exercise, keyof ExerciseGuidance>;
type FocusDay = Omit<Day, "day" | "week" | "phase" | "duration" | "exercises"> & {
  exercises: FocusExercise[];
};

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

const exerciseGuidance: Record<string, ExerciseGuidance> = {
  "flexao-controlada": {
    instructions: [
      "Apoie as mãos um pouco além da largura dos ombros e estenda as pernas, formando uma linha reta da cabeça aos calcanhares.",
      "Contraia abdômen e glúteos, inspire e desça o peito com os cotovelos apontando levemente para trás.",
      "Pare antes de perder o alinhamento, empurre o chão e expire até voltar à posição inicial.",
    ],
    avoid:
      "Deixar o quadril cair, abrir demais os cotovelos ou encurtar a descida para terminar mais rápido.",
    easier:
      "Faça com os joelhos apoiados ou com as mãos em uma mesa firme, mantendo o corpo alinhado.",
  },
  "pike-push-up": {
    instructions: [
      "Parta da prancha e caminhe com os pés em direção às mãos até formar um V invertido com o quadril elevado.",
      "Mantenha as mãos firmes, olhe para o chão e dobre os cotovelos para levar o topo da cabeça entre as mãos.",
      "Empurre o chão com controle, estenda os braços e preserve o peso distribuído nas duas mãos.",
    ],
    avoid:
      "Transformar o exercício em uma flexão comum, deixar os cotovelos abrirem ou comprimir o pescoço.",
    easier:
      "Reduza a inclinação do tronco ou apoie as mãos em um sofá firme para diminuir a carga nos ombros.",
  },
  "prancha-toque-ombro": {
    instructions: [
      "Entre na prancha alta com mãos sob os ombros e afaste um pouco os pés para criar uma base estável.",
      "Contraia o abdômen, retire uma mão do chão e toque o ombro oposto sem deslocar o tronco.",
      "Recoloque a mão devagar e alterne os lados, respirando sem perder o alinhamento.",
    ],
    avoid:
      "Balançar o quadril de um lado para o outro, prender a respiração ou acelerar antes de dominar o controle.",
    easier: "Apoie os joelhos no chão e mantenha a linha entre joelhos, quadril e ombros.",
  },
  "barra-australiana": {
    instructions: [
      "Segure uma barra baixa e firme com as mãos um pouco além dos ombros, mantendo os pés apoiados à frente.",
      "Enrijeça o corpo, afaste os ombros das orelhas e aproxime as escápulas antes de iniciar a puxada.",
      "Leve o peito à barra, pause por um instante e estenda os braços de maneira lenta e controlada.",
    ],
    avoid:
      "Puxar apenas com os braços, elevar os ombros ou deixar o quadril despencar durante a série.",
    easier: "Caminhe com os pés para mais perto da barra e deixe o corpo mais vertical.",
  },
  "barra-negativa": {
    instructions: [
      "Use um banco estável para começar com o queixo acima da barra, segurando-a com firmeza.",
      "Retire o apoio, contraia abdômen e glúteos e mantenha os ombros afastados das orelhas.",
      "Desça por cerca de três segundos até estender os braços e volte ao banco para reiniciar.",
    ],
    avoid:
      "Saltar para alcançar a barra, soltar o corpo de uma vez ou repetir com a pegada escorregando.",
    easier:
      "Faça descidas mais curtas ou mantenha um pé levemente apoiado no banco para controlar a carga.",
  },
  "superman-hold": {
    instructions: [
      "Deite de barriga para baixo, estenda braços e pernas e mantenha a testa apontada para o chão.",
      "Contraia glúteos e costas e eleve suavemente braços e pernas sem tentar ganhar altura excessiva.",
      "Sustente respirando normalmente e retorne devagar ao chão ao terminar o tempo.",
    ],
    avoid:
      "Jogar a cabeça para trás, prender a respiração ou forçar a lombar para subir mais alto.",
    easier: "Eleve apenas braços ou apenas pernas, ou alterne braço direito com perna esquerda.",
  },
  "agachamento-profundo": {
    instructions: [
      "Fique com os pés na largura confortável, pontas levemente abertas e peito erguido.",
      "Leve o quadril para trás e para baixo enquanto os joelhos acompanham a direção dos pés.",
      "Desça somente até manter os calcanhares no chão e suba pressionando o piso com os pés inteiros.",
    ],
    avoid:
      "Deixar os joelhos fecharem para dentro, tirar os calcanhares do chão ou curvar a lombar no fundo.",
    easier:
      "Agache até tocar levemente uma cadeira e volte, usando-a como referência de profundidade.",
  },
  "afundo-alternado": {
    instructions: [
      "Fique ereto, dê um passo confortável à frente e mantenha os pés em duas linhas paralelas.",
      "Desça o joelho de trás em direção ao chão enquanto o tronco permanece alto e estável.",
      "Empurre o chão com o pé da frente para retornar e então repita com a outra perna.",
    ],
    avoid:
      "Dar um passo estreito demais, inclinar o tronco ou deixar o joelho da frente cair para dentro.",
    easier: "Segure em uma cadeira ou parede e reduza a profundidade até ganhar equilíbrio.",
  },
  "elevacao-panturrilha": {
    instructions: [
      "Fique em pé com os pés paralelos e apoie uma mão na parede apenas para equilibrar.",
      "Pressione a parte da frente dos pés no chão e eleve os calcanhares o máximo que controlar.",
      "Pause no alto e desça lentamente até apoiar os calcanhares sem relaxar de uma vez.",
    ],
    avoid: "Balançar o corpo, girar os tornozelos para fora ou deixar os calcanhares despencarem.",
    easier: "Use as duas mãos na parede; para avançar, faça o movimento com uma perna de cada vez.",
  },
  "prancha-frontal": {
    instructions: [
      "Apoie antebraços e pontas dos pés, posicionando os cotovelos diretamente abaixo dos ombros.",
      "Contraia abdômen e glúteos e forme uma linha reta entre cabeça, quadril e calcanhares.",
      "Empurre os antebraços contra o chão e respire curto e contínuo durante todo o tempo.",
    ],
    avoid: "Elevar ou afundar o quadril, encolher os ombros ou segurar a respiração.",
    easier:
      "Apoie os joelhos mantendo o quadril alinhado ao tronco, sem sentar sobre os calcanhares.",
  },
  "elevacao-pernas": {
    instructions: [
      "Deite de costas, estenda as pernas e coloque as mãos ao lado do corpo ou sob o quadril.",
      "Pressione suavemente a lombar contra o chão e eleve as pernas sem usar impulso.",
      "Desça devagar somente até o ponto em que a lombar continue apoiada e então repita.",
    ],
    avoid: "Arquear a lombar, balançar as pernas ou acelerar a descida para completar repetições.",
    easier: "Dobre os joelhos e faça a mesma elevação com uma amplitude menor.",
  },
  "prancha-lateral": {
    instructions: [
      "Deite de lado e apoie o antebraço com o cotovelo abaixo do ombro; alinhe pernas e tronco.",
      "Pressione o antebraço no chão e eleve o quadril, mantendo peito e quadril voltados para a frente.",
      "Sustente respirando, desça com controle e repita pelo mesmo tempo do outro lado.",
    ],
    avoid: "Deixar o quadril cair, apoiar o cotovelo longe do ombro ou girar o peito para o chão.",
    easier: "Dobre o joelho de baixo e mantenha-o apoiado enquanto eleva o quadril.",
  },
  "mobilidade-quadril": {
    instructions: [
      "Sente com a perna da frente e a de trás dobradas, buscando ângulos próximos de 90 graus.",
      "Alongue a coluna e incline o tronco à frente a partir do quadril, sem arredondar as costas.",
      "Respire, sustente uma tensão confortável e troque os lados sem movimentos bruscos.",
    ],
    avoid:
      "Forçar os joelhos contra o chão, quicar na posição ou insistir quando houver dor articular.",
    easier:
      "Apoie as mãos atrás do corpo ou sente sobre uma almofada para reduzir a exigência do quadril.",
  },
  "cat-cow": {
    instructions: [
      "Fique em quatro apoios com mãos sob os ombros e joelhos sob o quadril.",
      "Ao inspirar, abra o peito e incline a pelve suavemente; ao expirar, arredonde a coluna.",
      "Acrescente uma rotação lenta, levando uma mão atrás da cabeça e abrindo o cotovelo para o lado.",
    ],
    avoid:
      "Fazer o movimento rápido, jogar o pescoço para trás ou concentrar toda a curva na lombar.",
    easier: "Faça apenas o cat-cow, sem a rotação, e reduza a amplitude.",
  },
  "alongamento-posterior": {
    instructions: [
      "Estenda uma perna à frente com o calcanhar apoiado e deixe o joelho levemente destravado.",
      "Mantenha a coluna longa e leve o quadril para trás até sentir a parte posterior da coxa.",
      "Respire lentamente, sustente sem quicar e troque de lado após o tempo indicado.",
    ],
    avoid: "Arredondar as costas para alcançar o pé, travar o joelho ou avançar até sentir dor.",
    easier: "Apoie as mãos na coxa e diminua a inclinação do tronco.",
  },
  "handstand-parede": {
    instructions: [
      "Escolha uma parede livre, retire objetos próximos e aqueça punhos e ombros antes de começar.",
      "Apoie as mãos na largura dos ombros e suba um pé de cada vez, usando a parede como apoio.",
      "Empurre o chão, mantenha abdômen firme e desça assim que perder alinhamento ou segurança.",
    ],
    avoid:
      "Praticar em piso escorregadio, lançar as pernas sem controle ou continuar com dor nos punhos e ombros.",
    easier:
      "Faça o pike isométrico com os pés no chão ou treine com supervisão até ganhar confiança.",
  },
  "wall-walk": {
    instructions: [
      "Comece em prancha com os pés encostados na parede e confirme que o espaço ao redor está livre.",
      "Caminhe com os pés para cima enquanto aproxima as mãos da parede em passos pequenos e firmes.",
      "Pare antes de perder o controle e retorne pelo mesmo caminho, sem saltar para sair da posição.",
    ],
    avoid:
      "Chegar perto demais da parede sem domínio, curvar excessivamente a lombar ou descer de uma vez.",
    easier: "Suba apenas um ou dois passos na parede e aumente a distância gradualmente.",
  },
  "pike-isometrico": {
    instructions: [
      "Apoie mãos e pés no chão e eleve o quadril até formar um V invertido.",
      "Pressione as mãos, gire levemente os cotovelos para trás e afaste os ombros das orelhas.",
      "Mantenha o abdômen ativo, distribua o peso com controle e respire durante a sustentação.",
    ],
    avoid: "Jogar todo o peso nos punhos, relaxar os ombros ou insistir se houver dor articular.",
    easier: "Apoie as mãos em uma superfície elevada e mantenha mais peso nos pés.",
  },
  "mountain-climber": {
    instructions: [
      "Entre na prancha alta com mãos sob os ombros, pés afastados e abdômen firme.",
      "Leve um joelho em direção ao peito sem arredondar demais as costas.",
      "Retorne o pé ao chão e alterne os lados primeiro com controle, depois aumente o ritmo.",
    ],
    avoid:
      "Saltar sem estabilidade, elevar demais o quadril ou apoiar as mãos muito à frente dos ombros.",
    easier: "Faça lentamente e apoie as mãos em uma mesa ou sofá firme.",
  },
  "flexao-agachamento": {
    instructions: [
      "Complete as flexões com corpo alinhado e pare a série antes que a técnica se desfaça.",
      "Levante com controle, ajuste os pés e execute os agachamentos com joelhos seguindo a direção dos pés.",
      "Respire, faça a transição sem pressa e repita o bloco apenas após recuperar a postura.",
    ],
    avoid:
      "Correr na troca de exercícios, sacrificar a amplitude ou continuar quando a lombar perder estabilidade.",
    easier: "Faça flexões inclinadas em uma mesa e agachamentos até uma cadeira.",
  },
  "marcha-prancha": {
    instructions: [
      "Comece na prancha alta com pés um pouco afastados e abdômen e glúteos contraídos.",
      "Baixe um antebraço de cada vez até a prancha baixa, mantendo o quadril voltado para o chão.",
      "Apoie novamente uma mão de cada vez para subir e alterne o braço que inicia cada repetição.",
    ],
    avoid: "Girar o quadril, aproximar demais os pés ou bater os cotovelos no chão.",
    easier: "Faça com os joelhos apoiados e mova os braços mais devagar.",
  },
};

const phases = ["Base", "Controle", "Força", "Domínio"];

export const DAYS: Day[] = Array.from({ length: 28 }, (_, index) => {
  const base = focusCycle[index % focusCycle.length]!;
  const week = Math.floor(index / 7) + 1;
  const exercises = base.exercises.map((exercise) => {
    const guidance = exerciseGuidance[exercise.id];

    if (!guidance) {
      throw new Error(`Orientação não encontrada para o exercício: ${exercise.id}`);
    }

    return {
      ...exercise,
      ...guidance,
      sets: week >= 3 ? exercise.sets + 1 : exercise.sets,
    };
  });
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
