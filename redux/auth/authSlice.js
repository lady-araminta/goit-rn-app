import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout } from "./authOperations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    userName: null,
  },
  reducers: {
    register(state, action) {},
    login(state, action) {},
    logout(state, action) {},
  },
});

export const authReduser = authSlice.reducer;
