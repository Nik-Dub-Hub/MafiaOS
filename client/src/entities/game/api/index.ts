import { IServerResponse } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGameAddData, IGame, GameArrayType, IGameUpdateData} from "../model";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { AxiosError } from "axios";

export const GAME_ENDPOINT_PATH = "/game" as const;

enum GAME_THUNK_TYPES {
  SET_GAME = "game/set",
  ADD_GAME = "game/add",
  DELETE_GAME = "game/delete",
  UPDATE_GAME = "game/update",
}

export const setGameThunk = createAsyncThunk<
  IServerResponse<GameArrayType>,
  void,
  { rejectValue: IServerResponse }
>(GAME_THUNK_TYPES.SET_GAME, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(GAME_ENDPOINT_PATH);
    return data;
  } catch (error) {
    const err = error as AxiosError<IServerResponse>;
    return rejectWithValue(err.response!.data);
  }
});

export const addGameThunk = createAsyncThunk<
  IServerResponse<IGame>,
  IGameAddData,
  { rejectValue: IServerResponse }
>(
  GAME_THUNK_TYPES.ADD_GAME,
  async (IGameAddData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        GAME_ENDPOINT_PATH,
        IGameAddData
      );
      return data;
    } catch (error) {
      const err = error as AxiosError<IServerResponse>;
      return rejectWithValue(err.response!.data);
    }
  }
);
export const updateGameThunk = createAsyncThunk<
  IServerResponse<IGame>,
  { id: number; updateData: IGameUpdateData },
  { rejectValue: IServerResponse }
>(GAME_THUNK_TYPES.UPDATE_GAME, async ({id,updateData}, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.put(
      `${GAME_ENDPOINT_PATH}/${id}`,
      updateData
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IServerResponse>;
    return rejectWithValue(err.response!.data);
  }
});
export const deleteGameThunk = createAsyncThunk<
  IServerResponse<IGame>,
  number,
  { rejectValue: IServerResponse }
>(GAME_THUNK_TYPES.DELETE_GAME, async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete(
      `${GAME_ENDPOINT_PATH}/${id}`
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IServerResponse>;
    return rejectWithValue(err.response!.data);
  }
});

