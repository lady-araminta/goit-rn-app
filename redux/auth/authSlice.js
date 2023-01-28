import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  name: null,
  email: null,
  avatar: null,
  stateChange: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      email: payload.email,
      name: payload.name,
      avatar: payload.avatar,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
    authError: (state, { payload }) => ({
      ...state,
      error: payload.error,
    }),
  },
});
