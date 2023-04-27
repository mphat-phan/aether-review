import { configureStore, Action } from '@reduxjs/toolkit'
import rootReducer, { RootState } from './root.reducer'
import thunk, { ThunkAction } from 'redux-thunk'
import logger from 'redux-logger'

const middleware = [thunk, logger]
const store = configureStore({
    reducer: rootReducer,
    middleware
})
export type AppDispatch = typeof store.dispatch<any>
export type AppThunk = ThunkAction<void, RootState, unknown, Action>

export default store
