import { IRole } from "@/entities/role";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Player {
  id: number;
  username: string;
  user_id:number
  role: number;
  game_id:number
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
    startGame(state, action) {
      state.phase = "inProgressBeginning"; // Переход в состояние ожидания
      state.gameKey = action.payload;
    },
    addPlayer(state, action: PayloadAction<{ id: number; username: string ;user_id:number,game_id:number}>) {
      if (state.players.length < 5) {
        state.players.push({
          id: action.payload.id,
          username: action.payload.username,
          user_id:action.payload.user_id,
          game_id:action.payload.game_id,
          role: 1,
          isAlive: true,
        });
      }
    },
    assignRoles(state, action) {
      const roles = action.payload.filter(
        (role: IRole) => role.id !== 1 
      ).map((role:IRole) => role.id)
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
        (player) => player.role === 3 && player.isAlive
      );
      const aliveCivilians = state.players.filter(
        (player) => player.role !== 3 && player.isAlive
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
