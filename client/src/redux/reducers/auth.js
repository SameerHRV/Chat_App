import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAdmin: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },

    userNotExists: (state) => {
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { userExists, userNotExists } = authSlice.actions;
export default authSlice;
