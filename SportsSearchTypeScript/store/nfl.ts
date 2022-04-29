import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig, AxiosError } from "axios"
import { database } from '../firebase/firebase';
import { getAuth } from 'firebase/auth'
import { EntireNflInitialStateType } from '../types/redux/nfl';
import { NflTeamWinsParams } from '../types/nfl/teamWins';

const PORT = '3001'
const IP_ADDRESS =  '172.17.13.218'
const START_URL = `http://${IP_ADDRESS}:${PORT}`
const API_KEY:Readonly<string> = '201771a6cemshea6057f5378b9d3p1abed7jsn896b7d0a937d'
const auth = getAuth()

const initialState:EntireNflInitialStateType = {
    loading: false,
    data: {
        teamWins: [],
        teamPassing: [],
        teamRushing: [],
        teamRecieving: [],
        error: ''
    }
}

export const nflTeamWinsHandler = createAsyncThunk(
    "nflTeamWinsHandler",
    async ( params:NflTeamWinsParams , { rejectWithValue }) => {
        try {
            console.log(params)
            const options:AxiosRequestConfig = {
                method: 'GET',
                url: `https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/win-stats/${params.year}`,
                headers: {
                  'X-RapidAPI-Host': 'nfl-team-stats.p.rapidapi.com',
                  'X-RapidAPI-Key': API_KEY
                }
            }
            const response = await axios.request(options)
            console.log(response.data)
            return { data: response.data }
        } catch(error) {
            console.log(error)
            return rejectWithValue('Error');
        } 
    }
)


export const nflSlice = createSlice({
    name: 'nflSlice',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(nflTeamWinsHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(nflTeamWinsHandler.fulfilled, (state, { payload }) => {
            state.data.teamWins = payload.data ? payload.data : []
            state.loading = false
        })
        builder.addCase(nflTeamWinsHandler.rejected, (state, { payload }) => {
            state.data.error = payload as string ? payload as string : ''
            state.loading = false
        })
    }
})



export const nflReducer =  nflSlice.reducer
