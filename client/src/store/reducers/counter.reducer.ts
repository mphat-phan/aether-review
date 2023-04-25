import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TCount = {
    loading: string
    num: number
}

const initialState: TCount = {
    loading: 'idle',
    num: 0
}
const countSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction){
            state.loading = 'loading'
        },
        increment(state, action: PayloadAction<number>) {
            const num = action.payload
            state.num = num
        },
        decrement(state, action: PayloadAction<number>) {
            const num = action.payload
            state.num = num
        }
    }
})

export const { decrement, increment, setLoading } = countSlice.actions

export default countSlice.reducer
