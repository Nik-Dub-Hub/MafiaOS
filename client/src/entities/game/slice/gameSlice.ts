import {
  setGameThunk,
  addGameThunk,
  updateGameThunk,
  deleteGameThunk,
  addVoteThunk,
  clearVotingThunk,
} from "../api";

import { createSlice } from "@reduxjs/toolkit";
import { GameArrayType } from "../model";

type GameState = {
  games: GameArrayType;
  error: string | null;
  isLoading: boolean;
};

const initialState: GameState = {
  games: [],
  error: null,
  isLoading: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(setGameThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setGameThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.games = action.payload.data;
      })
      .addCase(setGameThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error ?? "Unknown error";
        state.games = [];
      })

     
      .addCase(addGameThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addGameThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.games = [...state.games, action.payload.data];
      })
      .addCase(addGameThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error ?? "Unknown error";
        state.games = [];
      })

   
      .addCase(updateGameThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGameThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.games = state.games.map((game) =>
          game.id === action.payload.data.id ? action.payload.data : game
        );
      })
      .addCase(updateGameThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error ?? "Unknown error";
      })

    
      .addCase(deleteGameThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGameThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.games = state.games.filter(
          (game) => game.id !== action.payload.data.id
        );
      })
      .addCase(deleteGameThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error ?? "Unknown error";
        state.games = [];
      })

      
      .addCase(addVoteThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addVoteThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        
        const updatedGameId = action.payload.data.id; 
        const updatedVotingData = action.payload.data.voting; 

        state.games = state.games.map((game) =>
          game.id === updatedGameId
            ? { ...game, voting: updatedVotingData }
            : game
        );
      })
      .addCase(addVoteThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error ?? "Unknown error";
      })

    
      .addCase(clearVotingThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearVotingThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const clearedGameId = action.payload.data.id; 

        
        state.games = state.games.map((game) =>
          game.id === clearedGameId ? { ...game, voting: [] } : game
        );
      })
      .addCase(clearVotingThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error ?? "Unknown error";
      });
  },
});

export const gamesReducer = gameSlice.reducer;
