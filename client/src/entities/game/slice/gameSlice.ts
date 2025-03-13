import {
    setGameThunk,
    addGameThunk,
    updateGameThunk,
    deleteGameThunk,
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
          state.games = state.games.map((games) =>
            games.id === action.payload.data.id
              ? action.payload.data
              : games
          );
        })
        .addCase(updateGameThunk.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload!.error ?? "Unknown error";
          state.games = [];
        })
  
        .addCase(deleteGameThunk.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteGameThunk.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null;
          state.games = state.games.filter(
            (games) => games.id !== action.payload.data.id
          );
        })
        .addCase(deleteGameThunk.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload!.error ?? "Unknown error";
          state.games = [];
        })
    },
  });
  
  export const gamesReducer = gameSlice.reducer;
  