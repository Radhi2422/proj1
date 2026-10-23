import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    logout: (state) => {
      state.userId = null;
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;