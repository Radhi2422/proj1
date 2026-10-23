import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedProblem: null
};

const problemSlice = createSlice({
    name: "problem",
    initialState,
    reducers: {
        setSelectedProblem: (state, action) => {
            state.selectedProblem = action.payload;
        },
        clearSelectedProblem: (state) => {
            state.selectedProblem = null;
        }
    }
});

export const { setSelectedProblem, clearSelectedProblem } = problemSlice.actions;

export default problemSlice.reducer;