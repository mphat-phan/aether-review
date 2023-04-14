import { Dispatch } from 'redux';

export const increment = (num: number) => async (dispatch: Dispatch) => {
    dispatch({
        type: "increment",
        payload: {
            num: num + 1
        }
    })
}

export const decrement = (num: number) => async(dispatch: Dispatch) => {
    dispatch({
        type: "decrement",
        payload: {
            num: num - 1
        }
    })
}