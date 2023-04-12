import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

// import { itemListReducer } from "features/item/reducers/item.reducer"
// import { itemCategoryReducer } from "features/item/reducers/itemCategory.reducer"
const reducers = combineReducers({
    // itemLists: itemListReducer,
    // itemCategories: itemCategoryReducer
})

const initialState = {}

const middlewares = [thunk]
const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export default store
