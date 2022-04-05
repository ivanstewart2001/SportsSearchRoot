import { NbaPlayerStatsParams, NbaPlayerHeadshotParams, NbaBoxScoreParams, NbaScheduleParams, NBAScheduleForCurrentWeekResponse } from './../types/redux/nba';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios"
import { NbaDraftParams } from '../types/redux/nba'
import { NbaDraftClassType } from '../types/nba/draftClass'

const PORT = '3001'
const IP_ADDRESS = '172.17.13.218'
const START_URL = `http://${IP_ADDRESS}:${PORT}`
const API_KEY:Readonly<string> = '201771a6cemshea6057f5378b9d3p1abed7jsn896b7d0a937d'

const initialState = {
    loading: false,
    data: {
        draftClass: [],
        playerStats: [],
        playerHeadshot: '',
        boxScore: {
            team1: [],
            team2: []
        },
        schedule: [],
        error: ''
    }
}

export const draftClassHandler = createAsyncThunk(
    "draftClassHandler",
    async ( params:NbaDraftParams , { rejectWithValue }) => {
        try {
            console.log(params)
            const url:string = START_URL + '/postToGetDraftClassHandler'
            const response = await axios.post(url, params)
            return { data: response.data }
        } catch(error) {
            return rejectWithValue('Error');
        } 
    }
)

export const playerStatsHandler = createAsyncThunk(
    "playerStatsHandler",
    async ( params:NbaPlayerStatsParams , { rejectWithValue }) => {
        try {
            console.log(params)
            const url:string = START_URL + '/postToGetPlayerStatsHandler'
            const response = await axios.post(url, params)
            return { data: response.data }
        } catch(error) {
            return rejectWithValue('Error');
        } 
    }
)

export const playerHeadshotHandler = createAsyncThunk(
    "playerHeadshotHandler",
    async ( params:NbaPlayerHeadshotParams , { rejectWithValue }) => {
        try {
            console.log(params)
            const url:string = START_URL + '/postToGetPlayerHeadshotHandler'
            const response = await axios.post(url, params)
            return { data: response.data }
        } catch(error) {
            return rejectWithValue('Error');
        } 
    }
)

export const boxScoreHandler = createAsyncThunk(
    "boxScoreHandler",
    async ( params:NbaBoxScoreParams , { rejectWithValue }) => {
        try {
            console.log(params)
            const url:string = START_URL + '/postToGetBoxScoresHandler'
            const response = await axios.post(url, params)
            return { team1: JSON.parse(response.data[0]), team2: JSON.parse(response.data[1])  }
        } catch(error) {
            return rejectWithValue('Error');
        } 
    }
)

export const scheduleHandler = createAsyncThunk(
    "scheduleHandler",
    async ( params:NbaScheduleParams , { rejectWithValue }) => {
        try {
            console.log(params)
            const options:AxiosRequestConfig = {
                method: 'GET',
                url: 'https://nba-schedule.p.rapidapi.com/schedule',
                params,
                headers: {
                  'X-RapidAPI-Host': 'nba-schedule.p.rapidapi.com',
                  'X-RapidAPI-Key': API_KEY
                }
            };
            const response = await axios.request(options)
            return { data: response.data }
        } catch(error:AxiosError|unknown) {
            return rejectWithValue('Error');
        } 
    }
)

export const nbaSlice = createSlice({
    name: 'nbaSlice',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(draftClassHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(draftClassHandler.fulfilled, (state, { payload }) => {
            state.data.draftClass = payload.data ? payload.data : []
            state.loading = false
        })
        builder.addCase(draftClassHandler.rejected, (state, { payload }) => {
            state.data.error = payload as string ? payload as string : ''
            state.loading = false
        })
        builder.addCase(playerStatsHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(playerStatsHandler.fulfilled, (state, { payload }) => {
            state.data.playerStats = payload.data ? payload.data : []
            state.loading = false
        })
        builder.addCase(playerStatsHandler.rejected, (state, { payload }) => {
            state.data.error = payload as string ? payload as string : ''
            state.loading = false
        })
        builder.addCase(playerHeadshotHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(playerHeadshotHandler.fulfilled, (state, { payload }) => {
            state.data.playerHeadshot = payload.data ? payload.data : ''
            state.loading = false
        })
        builder.addCase(playerHeadshotHandler.rejected, (state, { payload }) => {
            state.data.error = payload as string ? payload as string : ''
            state.loading = false
        })
        builder.addCase(boxScoreHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(boxScoreHandler.fulfilled, (state, { payload }) => {
            state.data.boxScore.team1 = payload.team1 ? payload.team1 : []
            state.data.boxScore.team2 = payload.team2 ? payload.team2 : []
            state.loading = false
        })
        builder.addCase(boxScoreHandler.rejected, (state, { payload }) => {
            state.data.error = payload as string ? payload as string : ''
            state.loading = false
        })
        builder.addCase(scheduleHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(scheduleHandler.fulfilled, (state, { payload }) => {
            state.data.schedule = payload.data ? payload.data : []
            state.loading = false
        })
        builder.addCase(scheduleHandler.rejected, (state, { payload }) => {
            state.data.error = payload as string ? payload as string : ''
            state.loading = false
        })
    }
})



export const nbaReducer =  nbaSlice.reducer
