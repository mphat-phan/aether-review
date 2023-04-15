import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { loginReducer, counterReducer, registerReducer } from "./reducers"

const reducers = combineReducers({
    counter: counterReducer,
    user: loginReducer,
    register: registerReducer
})

const userLocalStorage = localStorage.getItem("userInfo")

const initialState = {
    user: {
        isLogged: (!!userLocalStorage),
        userInfo: userLocalStorage ? JSON.parse(userLocalStorage) : null
    }
}

const middlewares = [thunk]
const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
