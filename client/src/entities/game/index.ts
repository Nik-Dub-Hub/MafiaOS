
export { gamesReducer } from "./slice/gameSlice";


export {
  setGameThunk,
  addGameThunk,
  updateGameThunk,
  deleteGameThunk,
  addVoteThunk, 
  clearVotingThunk, 
} from "./api";


export type {
  IGameAddData,
  IGame,
  GameArrayType,
  IGameUpdateData,
  IVoteData, 
  IVoteResponse, 
} from "./model";
