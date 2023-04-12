import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { counterReducer } from "./reducers/counter.reducer"
// import { itemListReducer } from "features/item/reducers/item.reducer"
// import { itemCategoryReducer } from "features/item/reducers/itemCategory.reducer"
const reducers = combineReducers({
    counter: counterReducer,
    // itemCategories: itemCategoryReducer
})

const initialState = {}

const middlewares = [thunk]
const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store