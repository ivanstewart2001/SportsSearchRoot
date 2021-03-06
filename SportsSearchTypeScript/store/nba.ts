import { 
    NbaPlayerStatsParams, 
    NbaPlayerHeadshotParams, 
    NbaBoxScoreParams, 
    NbaScheduleParams, 
    NBAScheduleForCurrentWeekResponse, 
    NbaComparePlayerParams, 
    NbaCompareHeadshotParams, 
    SavePlayerToFavoritesParams, 
    FavoritesPlayersReturnType, 
    EntireNbaInitialStateType,
    TeamRosterParams, 
    RemovePlayerFromFavoritesParams,
    NbaTeamStatsParams,
    NbaRosterStatsParams
} from './../types/redux/nba';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios"
import { NbaDraftParams } from '../types/redux/nba'
import { database } from '../firebase/firebase';
import { getAuth } from 'firebase/auth'
import { convertTeamStats } from '../util/nba/teamStats';

const PORT = '3001'
const IP_ADDRESS =  '172.17.13.218' // '10.55.140.183' //'10.55.140.183' // '10.26.142.45' //'172.17.13.218'
const START_URL = `http://${IP_ADDRESS}:${PORT}`
const API_KEY:Readonly<string> = '201771a6cemshea6057f5378b9d3p1abed7jsn896b7d0a937d'
const auth = getAuth()

const initialState:EntireNbaInitialStateType = {
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
        compare: {
            player1: {
                stats: [],
                headshot: ''
            },
            player2: {
                stats: [],
                headshot: ''
            }
        },
        news: [],
        favorites: [],
        roster: [],
        teamStats: [],
        rosterStats: [],
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

export const comparePlayerStatsHandler = createAsyncThunk(
    "comparePlayerStatsHandler",
    async ( params:NbaComparePlayerParams , { rejectWithValue }) => {
        try {
            console.log(params)
            const url:string = START_URL + '/postToGetPlayerStatsHandler'
            const response1 = await axios.post(url, params.player1)
            const response2 = await axios.post(url, params.player2)
            return { player1: response1.data, player2: response2.data }
        } catch(error) {
            return rejectWithValue('Error');
        } 
    }
)

export const comparePlayerHeadshotHandler = createAsyncThunk(
    "comparePlayerHeadshotHandler",
    async ( params:NbaCompareHeadshotParams , { rejectWithValue }) => {
        try {
            console.log(params)
            const url:string = START_URL + '/postToGetPlayerHeadshotHandler'
            const response1 = await axios.post(url, params.player1)
            const response2 = await axios.post(url, params.player2)
            return { player1: response1.data, player2: response2.data }
        } catch(error) {
            return rejectWithValue('Error');
        } 
    }
)

export const nbaArticlesHandler = createAsyncThunk(
    "nbaArticlesHandler",
    async ( _ , { rejectWithValue }) => {
        try {
            const options:AxiosRequestConfig = {
                method: 'GET',
                url: 'https://nba-latest-news.p.rapidapi.com/news',
                headers: {
                  'X-RapidAPI-Host': 'nba-latest-news.p.rapidapi.com',
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

export const nbaSourceArticlesHandler = createAsyncThunk(
    "nbaSourceArticlesHandler",
    async ( params:string , { rejectWithValue }) => {
        try {
            const options:AxiosRequestConfig = {
                method: 'GET',
                url: `https://nba-latest-news.p.rapidapi.com/news/source/${params}`,
                headers: {
                  'X-RapidAPI-Host': 'nba-latest-news.p.rapidapi.com',
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


export const nbaPlayerArticlesHandler = createAsyncThunk(
    "nbaPlayerArticlesHandler",
    async ( params:string , { rejectWithValue }) => {
        try {
            const formatPlayerName:string = params.toLowerCase().replace(/ /g, "-")

            const options:AxiosRequestConfig = {
                method: 'GET',
                url: `https://nba-latest-news.p.rapidapi.com/news/player/${formatPlayerName}`,
                headers: {
                  'X-RapidAPI-Host': 'nba-latest-news.p.rapidapi.com',
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

export const nbaTeamArticlesHandler = createAsyncThunk(
    "nbaTeamArticlesHandler",
    async ( params:string , { rejectWithValue }) => {
        try {
            const formatTeamName:string = params.toLowerCase()
            const options:AxiosRequestConfig = {
                method: 'GET',
                url: `https://nba-latest-news.p.rapidapi.com/news/team/${formatTeamName}`,
                headers: {
                  'X-RapidAPI-Host': 'nba-latest-news.p.rapidapi.com',
                  'X-RapidAPI-Key': API_KEY
                }
            }
            const response = await axios.request(options)
            return { data: response.data }
        } catch(error:AxiosError|unknown) {
            return rejectWithValue('Error');
        } 
    }
)

export const addPlayerToFavoritesHandler = createAsyncThunk(
    "addPlayerToFavoritesHandler",
    async ( params:SavePlayerToFavoritesParams , { rejectWithValue }) => {
        try {
            const returnObject:FavoritesPlayersReturnType = {
                id: '',
                playerHeadshot: params.playerHeadshot,
                playerStats: params.playerStats,
                playerName: params.playerName
            }

            const currentUserId = auth.currentUser?.uid
            await database.ref(`${currentUserId}/favoritePlayers`).push(params).then((ref) => {
                returnObject.id = ref.key
            })

            return { data: returnObject }
        } catch(error:AxiosError|unknown) {
            return rejectWithValue('Error');
        } 
    }
) 

export const setFavoritePlayersHandler = createAsyncThunk(
    "setFavoritePlayersHandler",
    async ( _ , { rejectWithValue }) => {
        try {
            const currentUserId = auth.currentUser?.uid
            const allFavoritePlayers:FavoritesPlayersReturnType[] = []

            await database.ref(`${currentUserId}/favoritePlayers`).once('value').then((snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    allFavoritePlayers.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    })
                })
            })
            return { data: allFavoritePlayers }
        } catch(error:AxiosError|unknown) {
            return rejectWithValue('Error');
        } 
    }
) 

export const removePlayerFromFavoritesHandler = createAsyncThunk(
    "removePlayerFromFavoritesHandler",
    async ( { id }:RemovePlayerFromFavoritesParams  , { rejectWithValue }) => {
        try {
            if (id === 'break') {
                return { data:id }
            }
            const currentUserId = auth.currentUser?.uid
            await database.ref(`${currentUserId}/favoritePlayers/${id}`).remove()
            return { data: id }
        } catch(error:AxiosError|unknown) {
            return rejectWithValue('Error');
        } 
    }
) 

export const teamRosterHandler = createAsyncThunk(
    "teamRosterHandler",
    async ( params:TeamRosterParams , { rejectWithValue }) => {
        try {
            console.log(params)
            const url:string = START_URL + '/postToGetRosterHandler'
            const response = await axios.post(url, params)
            return { data:response.data }
        } catch(error) {
            return rejectWithValue('Error');
        } 
    }
)

export const teamStatsHandler = createAsyncThunk(
    "teamStatsHandler",
    async ( params:NbaTeamStatsParams , { rejectWithValue }) => {
        try {
            console.log(params)
            const url:string = START_URL + '/postToGetTeamStatsHandler'
            const response = await axios.post(url, params)
            return { data: convertTeamStats(response.data) }
        } catch(error) {
            return rejectWithValue('Error');
        } 
    }
)

export const rosterStatsHandler = createAsyncThunk(
    "rosterStatsHandler",
    async ( params:NbaRosterStatsParams , { rejectWithValue }) => {
        try {
            console.log(params)
            const url:string = START_URL + '/postToGetRosterStatsHandler'
            const response = await axios.post(url, params)
            console.log(response.data)
            return { data: response.data }
        } catch(error) {
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


        builder.addCase(comparePlayerStatsHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(comparePlayerStatsHandler.fulfilled, (state, { payload }) => {
            state.data.compare.player1.stats = payload.player1 ? payload.player1 : []
            state.data.compare.player2.stats = payload.player2 ? payload.player2 : []
            state.loading = false
        })
        builder.addCase(comparePlayerStatsHandler.rejected, (state, { payload }) => {
            state.data.error = payload as string ? payload as string : ''
            state.loading = false
        })


        builder.addCase(comparePlayerHeadshotHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(comparePlayerHeadshotHandler.fulfilled, (state, { payload }) => {
            state.data.compare.player1.headshot = payload.player1 ? payload.player1 : ''
            state.data.compare.player2.headshot = payload.player2 ? payload.player2 : ''
            state.loading = false
        })
        builder.addCase(comparePlayerHeadshotHandler.rejected, (state, { payload }) => {
            state.data.error = payload as string ? payload as string : ''
            state.loading = false
        })


        builder.addCase(nbaArticlesHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(nbaArticlesHandler.fulfilled, (state, { payload }) => {
            state.data.news = payload.data ? payload.data : []
            state.loading = false
        })
        builder.addCase(nbaArticlesHandler.rejected, (state, { payload }) => {
            state.data.error = payload as string ? payload as string : ''
            state.loading = false
        })


        builder.addCase(nbaPlayerArticlesHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(nbaPlayerArticlesHandler.fulfilled, (state, { payload }) => {
            state.data.news = payload.data ? payload.data : []
            state.loading = false
        })
        builder.addCase(nbaPlayerArticlesHandler.rejected, (state, { payload }) => {
            state.data.error = payload as string ? payload as string : ''
            state.loading = false
        })


        builder.addCase(nbaSourceArticlesHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(nbaSourceArticlesHandler.fulfilled, (state, { payload }) => {
            state.data.news = payload.data ? payload.data : []
            state.loading = false
        })
        builder.addCase(nbaSourceArticlesHandler.rejected, (state, { payload }) => {
            state.data.error = payload as string ? payload as string : ''
            state.loading = false
        })


        builder.addCase(nbaTeamArticlesHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(nbaTeamArticlesHandler.fulfilled, (state, { payload }) => {
            state.data.news = payload.data ? payload.data : []
            state.loading = false
        })
        builder.addCase(nbaTeamArticlesHandler.rejected, (state, { payload }) => {
            state.data.error = payload as string ? payload as string : ''
            state.loading = false
        })


        builder.addCase(addPlayerToFavoritesHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addPlayerToFavoritesHandler.fulfilled, (state, { payload }) => {
            state.data.favorites.push(payload.data)
            state.loading = false
        })
        builder.addCase(addPlayerToFavoritesHandler.rejected, (state, { payload }) => {
            state.data.error = payload as string ? payload as string : ''
            state.loading = false
        })


        builder.addCase(setFavoritePlayersHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(setFavoritePlayersHandler.fulfilled, (state, { payload }) => {
            state.data.favorites = payload.data ? payload.data : []
            state.loading = false
        })
        builder.addCase(setFavoritePlayersHandler.rejected, (state, { payload }) => {
            state.data.error = payload as string ? payload as string : ''
            state.loading = false
        })


        builder.addCase(removePlayerFromFavoritesHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(removePlayerFromFavoritesHandler.fulfilled, (state, { payload }) => {
            state.data.favorites = state.data.favorites.filter((favorite) => favorite.id !== payload.data)
            state.loading = false
        })
        builder.addCase(removePlayerFromFavoritesHandler.rejected, (state, { payload }) => {
            state.data.error = payload as string ? payload as string : ''
            state.loading = false
        })

        builder.addCase(teamRosterHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(teamRosterHandler.fulfilled, (state, { payload }) => {
            state.data.roster = payload.data ? payload.data : []
            state.loading = false
        })
        builder.addCase(teamRosterHandler.rejected, (state, { payload }) => {
            state.data.error = payload as string ? payload as string : ''
            state.loading = false
        })

        builder.addCase(teamStatsHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(teamStatsHandler.fulfilled, (state, { payload }) => {
            state.data.teamStats = payload.data ? payload.data : []
            state.loading = false
        })
        builder.addCase(teamStatsHandler.rejected, (state, { payload }) => {
            state.data.error = payload as string ? payload as string : ''
            state.loading = false
        })


        builder.addCase(rosterStatsHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(rosterStatsHandler.fulfilled, (state, { payload }) => {
            state.data.rosterStats = payload.data ? payload.data : []
            state.loading = false
        })
        builder.addCase(rosterStatsHandler.rejected, (state, { payload }) => {
            state.data.error = payload as string ? payload as string : ''
            state.loading = false
        })
    }
})



export const nbaReducer =  nbaSlice.reducer
