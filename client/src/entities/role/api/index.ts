import { axiosInstance } from "@/shared/lib/axiosInstance";
import { IRole, RoleArrayType } from "../model";
import { IServerResponse } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const ROLES_ENDPOINT = "/role" as const;

enum ROLE_THUNK_TYPES {
  GET_ALL = "role/getAll",
  GET_ROLE_BY_ID = "role/getById",
}

export const getAllRolesThunk = createAsyncThunk<
  IServerResponse<RoleArrayType>,
  void,
  { rejectValue: IServerResponse }
>(ROLE_THUNK_TYPES.GET_ALL, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(ROLES_ENDPOINT);
    return data;
  } catch (error) {
    const err = error as AxiosError<IServerResponse>;
    return rejectWithValue(err.response!.data);
  }
});

export const getRoleByIdThunk = createAsyncThunk<
  IServerResponse<IRole>,
  number,
  { rejectValue: IServerResponse }
>(ROLE_THUNK_TYPES.GET_ROLE_BY_ID, async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(`${ROLES_ENDPOINT}/${id}`);
    console.log("Или ТУТ", data);
    return data;
  } catch (error) {
    const err = error as AxiosError<IServerResponse>;
    return rejectWithValue(err.response!.data);
  }
});
