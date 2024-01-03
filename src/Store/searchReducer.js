import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue : '',
}

const searchReducer = createSlice({
    name : 'searchReducer',
    initialState : initialState,
    reducers : {
        setSearchInput (state , action) {
            state.searchValue = action.payload
        },
    }
})

export const searchSliceAction = searchReducer.actions

export default searchReducer.reducer