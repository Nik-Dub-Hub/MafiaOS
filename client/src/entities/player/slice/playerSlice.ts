import { createSlice } from "@reduxjs/toolkit";
import {
  createPlayerThunk,
  deletePlayerThunk,
  getAllPlayerThunk,
  updatePlayerThunk,
} from "../api";
import { PlayerArrayType } from "../model";

type PlayerState = {
  players: PlayerArrayType;
  error: string | null;
  isLoading: boolean;
};

const initialState: PlayerState = {
  players: [],
  error: null,
  isLoading: false,
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //* getAllPlayerThunk
      .addCase(getAllPlayerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPlayerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.players = action.payload.data;
      })
      .addCase(getAllPlayerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error ?? "Unknown error";
      })
      //* createPlayerThunk
      .addCase(createPlayerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPlayerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.players.push(action.payload.data);
      })
      .addCase(createPlayerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error ?? "Unknown error";
      })
      //* updatePlayerThunk
      .addCase(updatePlayerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePlayerThunk.fulfilled, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.players = state.players.map((player) =>
          player.id === action.payload.data.id ? action.payload.data : player
        );
      })
      .addCase(updatePlayerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error ?? "Unknown error";
      })
      //* deletePlayerThunk
      .addCase(deletePlayerThunk.pending,(state)=>{
          state.isLoading = true
        })
        .addCase(deletePlayerThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            state.error = null
            state.players = state.players.filter((player)=> player.id !== action.payload.data.id)
        })
        .addCase(deletePlayerThunk.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload!.error ?? "Unknown error";
        })
  },
});

export const playersReducer = playersSlice.reducer;
