import { playersReducer } from "@/entities/player";
import { userReducer } from "@/entities/user";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer:{
        user: userReducer,

        players: playersReducer,
    }
}) 

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch