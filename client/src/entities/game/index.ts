export { gamesReducer } from "./slice/gameSlice";

export {
  setGameThunk,
  addGameThunk,
  updateGameThunk,
  deleteGameThunk,
} from "./api";

export type { IGameAddData, IGame, GameArrayType, IGameUpdateData} from "./model";
