
export const counterReducer = (state = { num: 0 }, action: any) => {
    switch (action.type) {
        case 'increment': 
            return action.payload
        case 'decrement': 
            return action.payload
        default:
            return state
    }
}