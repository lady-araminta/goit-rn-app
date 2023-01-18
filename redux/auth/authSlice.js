import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    login: null,
    stateChange: false,
  },
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    // authSignOut: () => ({ userId: null, login: null, stateChange: false }),
    authSignOut: () => state,
  },
});

export const { updateUserProfile, authStateChange, authSignOut } =
  authSlice.actions;

export const authReduser = authSlice.reducer;
