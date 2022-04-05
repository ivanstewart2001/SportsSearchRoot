import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NbaDraftParams } from '../types/redux/nba'
import { NbaDraftClassType } from '../types/nba/draftClass'

const PORT = '3001'
const IP_ADDRESS = '172.17.13.218'
const START_URL = `http://${IP_ADDRESS}:${PORT}`

const initialState = {
    loading: false,
    data: {
        playerSearch: [],
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


export const nbaSlice = createSlice({
    name: 'nbaSlice',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(draftClassHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(draftClassHandler.fulfilled, (state, { payload }) => {
            state.data.playerSearch = payload.data ? payload.data : {}
            state.loading = false
        })
        builder.addCase(draftClassHandler.rejected, (state, { payload }) => {
            state.data.error = payload as string ? payload as string : ''
            state.loading = false
        })
    }
})



export const nbaReducer =  nbaSlice.reducer
