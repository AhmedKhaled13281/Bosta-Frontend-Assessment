import { configureStore } from "@reduxjs/toolkit"
import searchReducer from "./searchReducer"


export const store = configureStore({
    reducer: {
    searchReducer : searchReducer
}})