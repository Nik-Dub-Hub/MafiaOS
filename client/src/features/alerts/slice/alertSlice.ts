import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertType } from "../model";

type AlertsState = {
  alerts: AlertType[];
};

const initialState: AlertsState = {
  alerts: [],
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    showAlert: (
      state,
      action: PayloadAction<{
        message: string;
        status: "success" | "error" | "message";
      }>
    ) => {
      const newAlert = {
        id: Date.now().toString(),
        message: action.payload.message,
        status: action.payload.status,
      };
      state.alerts.push(newAlert);
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(
        (alert) => alert.id !== action.payload
      );
    },
  },
});

export const {showAlert,removeAlert} = alertsSlice.actions
export const alertsReducer = alertsSlice.reducer
