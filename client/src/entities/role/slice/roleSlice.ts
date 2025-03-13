import { getAllRolesThunk } from "../api";
import { IRole } from "../model";
import { createSlice } from "@reduxjs/toolkit";

type RoleState = {
  roles: IRole[];
  error: string | null;
  isLoading: boolean;
};

const initialState: RoleState = {
  roles: [],
  error: null,
  isLoading: false,
};

const rolesSLice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRolesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRolesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.roles = action.payload.data;
      })
      .addCase(getAllRolesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error ?? "Unknown error";
      })

      // .addCase(getRoleByIdThunk.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getRoleByIdThunk.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.error = null;
      //   state.roles = action.payload.data; // перепроверить
      // })
      // .addCase(getRoleByIdThunk.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload!.error ?? "Unknown error";
      //   state.roles = [];
      // });
  },
});

export const rolesReducer = rolesSLice.reducer;
