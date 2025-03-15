import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Player {
  id: number;
  username: string;
  role: string | null; // "Mafia", "Civilian", "Doctor", "Lady"
  isAlive: boolean;
}

export interface GameState {
  phase: string; // Фазы игры: waiting, inProgressBeginning, inProgressNight, inProgressDay, inProgressDayVoting, inEnd
  players: Player[];
  gameKey: string | null; // Уникальный ключ игры
  results: {
    night: Player | null; // Кто был убит ночью
    day: Player | null; // Кто выброшен днем
  };
  winner: string | null; // "Mafia" или "Civilians"
  isTimerRunning: boolean; // Таймер активен или нет
}

const initialState: GameState = {
  phase: "waiting",
  players: [],
  gameKey: null,
  results: { night: null, day: null },
  winner: null,
  isTimerRunning: false,
};

// Создаем слайс
const gameLogicSlice = createSlice({
  name: "gameLogic",
  initialState,
  reducers: {
    startGame(state) {
      state.gameKey = Math.random().toString(36).slice(2, 8).toUpperCase(); // Генерируем уникальный ключ
      state.phase = "waiting"; // Переход в состояние ожидания
    },
    addPlayer(state, action: PayloadAction<{ id: number; username: string }>) {
      if (state.players.length < 5) {
        state.players.push({
          id: action.payload.id,
          username: action.payload.username,
          role: null,
          isAlive: true,
        });
      }
      if (state.players.length === 5) {
        state.phase = "inProgressBeginning"; // Достаточно игроков, начинаем игру
      }
    },
    assignRoles(state) {
      const roles = ["Mafia", "Civilian", "Civilian", "Doctor", "Lady"];
      // Перемешиваем роли
      roles.sort(() => Math.random() - 0.5);

      state.players = state.players.map((player, index) => ({
        ...player,
        role: roles[index],
      }));
    },
    startNightPhase(state) {
      state.phase = "inProgressNight"; // Переход в ночную фазу
    },
    submitNightVote(state, action: PayloadAction<number>) {
      const victim = state.players.find(
        (player) => player.id === action.payload && player.isAlive
      );
      if (victim) {
        victim.isAlive = false;
        state.results.night = victim;
        state.phase = "inProgressDay"; // Переход в фазу дня
      }
    },
    startDayVoting(state) {
      state.phase = "inProgressDayVoting"; // Начинаем голосование днем
    },
    submitDayVote(state, action: PayloadAction<number>) {
      const victim = state.players.find(
        (player) => player.id === action.payload && player.isAlive
      );
      if (victim) {
        victim.isAlive = false;
        state.results.day = victim;
        state.phase = "inProgressNight"; // Возвращаемся к ночи
      }
    },
    checkEndConditions(state) {
      const aliveMafia = state.players.filter(
        (player) => player.role === "Mafia" && player.isAlive
      );
      const aliveCivilians = state.players.filter(
        (player) => player.role !== "Mafia" && player.isAlive
      );

      if (aliveMafia.length === 0) {
        state.phase = "inEnd";
        state.winner = "Civilians"; // Победили мирные
      }
      if (aliveMafia.length >= aliveCivilians.length) {
        state.phase = "inEnd";
        state.winner = "Mafia"; // Победила мафия
      }
    },
  },
});

export const {
  startGame,
  addPlayer,
  assignRoles,
  startNightPhase,
  submitNightVote,
  startDayVoting,
  submitDayVote,
  checkEndConditions,
} = gameLogicSlice.actions;

export default gameLogicSlice.reducer;
