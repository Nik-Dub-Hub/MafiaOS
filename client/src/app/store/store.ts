import { rolesReducer } from "@/entities/role";
import { userReducer } from "@/entities/user";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer:{
        user: userReducer,
        roles: rolesReducer,
    }
}) 

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch