import { createSlice } from "@reduxjs/toolkit";

export const idCounterSlice = createSlice({
    initialState: 0,
    name: "idCounter",
    reducers: {
        counter: (state) => state+1 
    }
});

export const {counter} = idCounterSlice.actions;
export default idCounterSlice.reducer;