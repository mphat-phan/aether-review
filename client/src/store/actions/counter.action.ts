import { increment, decrement, setLoading } from '../reducers/counter.reducer'
import { AppThunk } from '..'
export const incrementAction =
    (num: number): AppThunk =>
    async (dispatch, getState) => {
        const t = getState()
        dispatch(setLoading())
        dispatch(increment(num + 1))
    }

export const decrementAction =
    (num: number): AppThunk =>
    async (dispatch) => {
        dispatch(decrement(num - 1))
    }
