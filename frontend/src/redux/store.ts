import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import navbarSlice from "./navbarSlice";

const reducers = combineReducers({
  auth: authSlice,
  nav: navbarSlice,
});

const authStore = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof authStore.getState>;

export default authStore;
