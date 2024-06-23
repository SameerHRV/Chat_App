import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
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
<<<<<<< HEAD:client/src/redux/reducers/auth.js
    userNotExists: (state) => {
      state.user = null;
=======
    isUserLoggedOut: (state) => {
      state.user = false;
>>>>>>> 1716198c2e82467d05208970b2228d4949c6576f:client/src/redux/redusers/auth.js
      state.loader = false;
    },
  },
});
<<<<<<< HEAD:client/src/redux/reducers/auth.js
export default authSlice;
export const { userExists, userNotExists } = authSlice.actions;
=======

export const { isUserLoggedIn, isUserLoggedOut } = authSlice.actions;

export default authSlice.reducer;
>>>>>>> 1716198c2e82467d05208970b2228d4949c6576f:client/src/redux/redusers/auth.js
