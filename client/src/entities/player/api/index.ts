import { IServerResponse } from "@/shared/types"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { IPlayer, IPlayerForUpdate, PlayerArrayType } from "../model"
import { AxiosError } from "axios"
import { axiosInstance } from "@/shared/lib/axiosInstance"


export const PLAYER_ENDPOINT_PATH = '/player' as const

enum PLAYER_THUNK_TYPES {
    GET_ALL = 'player/getAll',
    CREATE = 'player/create',
    UPDATE = 'player/update',
    DELETE = 'player/delete',
}

export const getAllPlayerThunk = createAsyncThunk<IServerResponse<PlayerArrayType>,void,{rejectValue:IServerResponse}>(PLAYER_THUNK_TYPES.GET_ALL,async(_,{rejectWithValue})=>{
    try {
        const {data} = await axiosInstance.get(PLAYER_ENDPOINT_PATH)
        return data
    } catch (error) {
           const err = error as AxiosError<IServerResponse>;
            return rejectWithValue(err.response!.data);
    }
})

export const createPlayerThunk = createAsyncThunk<IServerResponse<IPlayer>,{game_id:number},{rejectValue:IServerResponse}>(PLAYER_THUNK_TYPES.CREATE,async({game_id},{rejectWithValue})=>{
    try {
        const {data} = await axiosInstance.post(PLAYER_ENDPOINT_PATH,{game_id})
        return data
    } catch (error) {
        const err = error as AxiosError<IServerResponse>;
        return rejectWithValue(err.response!.data);
    }
})

export const updatePlayerThunk = createAsyncThunk<IServerResponse<IPlayer>,{id:number,updateData:IPlayerForUpdate},{rejectValue:IServerResponse}>(PLAYER_THUNK_TYPES.UPDATE,async({id,updateData},{rejectWithValue})=>{
    try {
        const {data} = await axiosInstance.put(`${PLAYER_ENDPOINT_PATH}/${id}`,{updateData})
        return data
    } catch (error) {
        const err = error as AxiosError<IServerResponse>;
        return rejectWithValue(err.response!.data);
    }
})

export const deletePlayerThunk = createAsyncThunk<IServerResponse<IPlayer>,{id:number},{rejectValue:IServerResponse}>(PLAYER_THUNK_TYPES.DELETE,async(id,{rejectWithValue})=>{
    try {
        const {data} = await axiosInstance.delete(`${PLAYER_ENDPOINT_PATH}/${id}`)
        return data
    } catch (error) {
        const err = error as AxiosError<IServerResponse>;
        return rejectWithValue(err.response!.data);
    }
})