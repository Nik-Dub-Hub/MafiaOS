import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../model";
import { refreshTokensThunk, signInThunk, signOutThunk, signUpThunk, updateUserThunk } from "../api";
import { RootState } from "../../../app/store/store";


type UserState = {
  user: IUser | null;
  error: string | null;
  isLoading: boolean;
};

const initialState: UserState = {
  user: null,
  error: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //* refreshTokensThunk
      .addCase(refreshTokensThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshTokensThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.data.user;
      })
      .addCase(refreshTokensThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error ?? "Unknown error";
        state.user = null;
      })
      //* signInThunk
      .addCase(signInThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.data.user;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error ?? "Unknown error";
        state.user = null;
      })
      //* signUpThunk
      .addCase(signUpThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.data.user;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error ?? "Unknown error";
        state.user = null;
      })
      //* signOutThunk
      .addCase(signOutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.user = null;
      })
      .addCase(signOutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error ?? "Unknown error";
        state.user = null;
      })
      //* updateUserThunk
      .addCase(updateUserThunk.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(updateUserThunk.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.error = null
        state.user = {...state.user,...action.payload.data}
      })
      .addCase(updateUserThunk.rejected,(state,action)=>{
        state.isLoading = false;
        state.error = action.payload!.error ?? 'Unknown error'
      })
  },
});

export const userReducer = userSlice.reducer;
export const selectUser = (state: RootState) => state.user.user;