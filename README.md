# Calistenia 28 Challenge

Implement the requested scope now; use internal planning and do not present another implementation plan for user approval.

## User Request
Crie a base de um aplicativo web responsivo e mobile-first chamado “Protocolo Calistenia Asiática — Desafio 28 Dias”. Inclua uma tela inicial com os 28 dias, página de treino com vídeo, exercícios, séries, repetições, cronômetro e botão para concluir, salvando o progresso localmente. Use Poppins e uma identidade visual moderna em azul, branco e laranja. Sem backend por enquanto.

## Requirements & Scope
- **App Name**: Protocolo Calistenia Asiática — Desafio 28 Dias
- **Design & Layout**:
  - Mobile-first, responsive interface with a polished, athletic look
  - Visual identity: Modern palette with deep/vibrant blue, crisp white backgrounds and cards, energetic orange accents for highlights, timer, and primary CTAs
  - Typography: Poppins font
- **Home / Dashboard**:
  - Grid or list of all 28 days with progress indicator (% completed, completed days count, current streak)
  - Clear status for each day (completed with checkmark, current/next up, upcoming)
  - Ability to click into any day's workout
- **Workout Screen**:
  - Day overview (focus, estimated duration, difficulty)
  - Responsive video player or embed area for movement demos
  - Exercise breakdown cards with exercise name, sets, reps, rest intervals, and tips
  - Built-in interactive stopwatch / rest timer (cronômetro) with play, pause, and reset controls
  - "Concluir Treino" button with completion feedback / celebratory modal
- **Persistence**:
  - Store progress and completed days in localStorage so data persists without a backend

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d773246c-5466-4c9d-8c60-6752a3982974).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
