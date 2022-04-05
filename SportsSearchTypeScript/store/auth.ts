import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth } from '../firebase/firebase'
import { Auth } from '../types/root/auth'
import { firebase } from '../firebase/firebase'

const initialState = {
    loading: false,
    authData: {
        email: '',
        userId: '',
        code: ''
    }
}

export const signUpHandler = createAsyncThunk(
    "sigmUpHandler",
    async ( { email, password }:Auth , { rejectWithValue }) => {
        try {
            const promise = await auth.createUserWithEmailAndPassword(email, password)
            return { email: promise.user?.email, userId: promise.user?.uid}
        } catch(error) {
            let authError = error as firebase.default.auth.Error
            let errorCode = authError.code
            return rejectWithValue(errorCode);
        } 
    }
)

export const loginHandler = createAsyncThunk(
    "loginHandler",
    async ( { email, password }:Auth , { rejectWithValue }) => {
        try {
            const promise = await auth.signInWithEmailAndPassword(email, password)
            return { email: promise.user?.email, userId: promise.user?.uid}
        } catch(error) {
            let authError = error as firebase.default.auth.Error
            let errorCode = authError.code
            return rejectWithValue(errorCode);
        } 
    }
)

export const logoutHandler = createAsyncThunk(
    "logoutHandler",
    async ( _ , { rejectWithValue }) => {
        try {
            const promise = await auth.signOut()
            return promise
        } catch(error) {
            let authError = error as firebase.default.auth.Error
            let errorCode = authError.code
            return rejectWithValue(errorCode);
        } 
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(signUpHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(signUpHandler.fulfilled, (state, { payload }) => {
            state.authData.userId = payload.userId ? payload.userId : ''
            state.authData.email = payload.email ? payload.email : ''
            state.loading = false
        })
        builder.addCase(signUpHandler.rejected, (state, { payload }) => {
            state.authData.code = payload as string ? payload as string : ''
            state.loading = false
        })
        builder.addCase(loginHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(loginHandler.fulfilled, (state, { payload }) => {
            state.authData.userId = payload.userId ? payload.userId : ''
            state.authData.email = payload.email ? payload.email : ''
            state.loading = false
        })
        builder.addCase(loginHandler.rejected, (state, { payload }) => {
            state.authData.code = payload as string ? payload as string : ''
            state.loading = false
        })
        builder.addCase(logoutHandler.pending, (state) => {
            state.loading = true
        })
        builder.addCase(logoutHandler.fulfilled, (state) => {
            state.authData.userId = ''
            state.authData.email = ''
            state.loading = false
        })
        builder.addCase(logoutHandler.rejected, (state, { payload }) => {
            state.authData.code = payload as string ? payload as string : ''
            state.loading = false
        })
    }
})



export const authReducer =  authSlice.reducer
