import { configureStore, combineReducers, createStore } from '@reduxjs/toolkit'
import { authReducer } from './auth'
import { nbaReducer } from './nba';

const reducer = {
    auth: authReducer,
    nba: nbaReducer
}

export const store = configureStore({
    reducer
})

// store.subscribe(() => {
//     console.log('FROM STORE', store.getState());
// });
  
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch