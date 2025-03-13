import { playersReducer } from "@/entities/player";
import { rolesReducer } from "@/entities/role";
import { userReducer } from "@/entities/user";
import { configureStore } from "@reduxjs/toolkit";
import { gamesReducer } from "@/entities/game";
import { alertsReducer } from "@/features/alerts";
const store = configureStore({
  reducer: {
    user: userReducer,
    players: playersReducer,
    roles: rolesReducer,
    games: gamesReducer,
    alerts: alertsReducer,
  },
}); 

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch