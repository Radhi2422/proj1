import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userTheme: null
};

const themeSlice= createSlice({
    name:"theme",
    initialState,
    reducers:{
        setTheme:(state,action)=>{
            state.userTheme = action.payload;
        },
        logout:(state)=>{
            state.userTheme = null;
        }
    }
});

export const { setTheme, logout } = themeSlice.actions;

export default themeSlice.reducer;