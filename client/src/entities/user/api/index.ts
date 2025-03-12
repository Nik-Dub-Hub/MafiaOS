import { axiosInstance, setAccessToken } from "@/shared/lib/axiosInstance";
import { IServerResponse } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IAuthResponseData,
  IUser,
  IUserSignInData,
  IUserSignUpData,
  IUserUpdateData,
} from "../model";
import { AxiosError } from "axios";

export const USER_ENDPOINT_PATH = "/user" as const;

enum USER_API_ENDPOINTS {
  SIGN_IN = "/auth/signIn",
  SIGN_UP = "/auth/signUp",
  SIGN_OUT = "/auth/signOut",
  REFRESH = "/auth/refreshTokens",
}

enum USER_THUNK_TYPES {
  SIGN_IN = "user/signIn",
  SIGN_UP = "user/signUp",
  REFRESH = "user/refreshTokens",
  SIGN_OUT = "user/signOut",
  UPDATE = "user/update",
}

export const refreshTokensThunk = createAsyncThunk<
  IServerResponse<IAuthResponseData>,
  void,
  { rejectValue: IServerResponse }
>(USER_THUNK_TYPES.REFRESH, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(USER_API_ENDPOINTS.REFRESH);
    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    const err = error as AxiosError<IServerResponse>;
    return rejectWithValue(err.response!.data);
  }
});

export const signInThunk = createAsyncThunk<
  IServerResponse<IAuthResponseData>,
  IUserSignInData,
  { rejectValue: IServerResponse }
>(USER_THUNK_TYPES.SIGN_IN, async (userSignInData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post(
      USER_API_ENDPOINTS.SIGN_IN,
      userSignInData
    );
    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    const err = error as AxiosError<IServerResponse>;
    return rejectWithValue(err.response!.data);
  }
});

export const signUpThunk = createAsyncThunk<
  IServerResponse<IAuthResponseData>,
  IUserSignUpData,
  { rejectValue: IServerResponse }
>(USER_THUNK_TYPES.SIGN_UP, async (userSignUpData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post(
      USER_API_ENDPOINTS.SIGN_UP,
      userSignUpData
    );
    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    const err = error as AxiosError<IServerResponse>;
    return rejectWithValue(err.response!.data);
  }
});

export const signOutThunk = createAsyncThunk<
  IServerResponse,
  void,
  { rejectValue: IServerResponse }
>(USER_THUNK_TYPES.SIGN_OUT, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(USER_API_ENDPOINTS.SIGN_OUT);
    setAccessToken("");
    return data;
  } catch (error) {
    const err = error as AxiosError<IServerResponse>;
    return rejectWithValue(err.response!.data);
  }
});

export const updateUserThunk = createAsyncThunk<
  IServerResponse<IUser>,
  { id: number; updateData: IUserUpdateData },
  { rejectValue: IServerResponse }
>(USER_THUNK_TYPES.UPDATE, async ({ id, updateData }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.put(
      `${USER_ENDPOINT_PATH}/${id}`,
      updateData
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IServerResponse>;
    return rejectWithValue(err.response!.data);
  }
});
