import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: false,
  isAdmin: false,
  loader: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isUserLoggedIn: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },
    isUserLoggedOut: (state) => {
      state.user = false;
      state.loader = false;
    },
  },
});

export const { isUserLoggedIn, isUserLoggedOut } = authSlice.actions;

export default authSlice.reducer;
