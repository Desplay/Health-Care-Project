import { createSlice } from "@reduxjs/toolkit";

const countStore = createSlice({
    name: "count",
    initialState: 0,
    reducers: {
        congMot: (state) => state + 1,
        truSo: (state, action) => state - action.payload,
    }
})

export const { congMot, truSo } = countStore.actions;
export default countStore.reducer;