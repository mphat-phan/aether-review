import { combineReducers } from '@reduxjs/toolkit'
import countSlice from './reducers/counter.reducer'
const rootReducer = combineReducers({
    count: countSlice
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
