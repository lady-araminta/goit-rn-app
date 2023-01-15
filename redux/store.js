import { configureStore } from "@reduxjs/toolkit";
import { authReduser } from "./auth/authSlice";

export const store = configureStore({
  reducer: authReduser,
});
