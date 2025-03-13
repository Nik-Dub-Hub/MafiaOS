import { playersReducer } from "@/entities/player";
import { rolesReducer } from "@/entities/role";
import { userReducer } from "@/entities/user";
import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "@/entities/game";

const store = configureStore({
    reducer:{
        user: userReducer,
        players: playersReducer,
        roles: rolesReducer,
        game: gameReducer,

    }
}) 

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch